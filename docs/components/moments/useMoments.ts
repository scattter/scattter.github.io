import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { User } from '@supabase/supabase-js'
import {
  contentLimit, exportMoments, getSupabase, isConfigured, listMoments,
  ownerId, publishMoment, setMomentVisibility, type Moment,
} from '../../utils/moments'

export function useMoments() {
  const user = ref<User | null>(null)
  const moments = ref<Moment[]>([])
  const draft = ref('')
  const draftPublic = ref(false)
  const authLoading = ref(isConfigured)
  const authBusy = ref(false)
  const loading = ref(false)
  const publishing = ref(false)
  const exporting = ref(false)
  const updatingId = ref<string | null>(null)
  const hasMore = ref(true)
  const loadError = ref('')
  const actionError = ref('')
  const notice = ref('')
  const isOwner = computed(() => Boolean(ownerId && user.value?.id === ownerId))
  const contentLength = computed(() => Array.from(draft.value.trim()).length)
  const canPublish = computed(() => isOwner.value && !authBusy.value && !publishing.value
    && contentLength.value > 0 && contentLength.value <= contentLimit)
  let cursor: Moment | undefined
  let pendingPost: { id: string; content: string } | undefined
  let unsubscribe: (() => void) | undefined
  let disposed = false
  let sessionVersion = 0

  watch(() => user.value?.id, () => {
    // 身份变化后重读列表，并丢弃旧请求，避免退出后重新显示私密内容。
    sessionVersion++
    moments.value = []
    cursor = undefined
    hasMore.value = true
    loading.value = false
    loadError.value = ''
    notice.value = ''
    if (!isOwner.value) {
      draft.value = ''
      draftPublic.value = false
      pendingPost = undefined
    }
    if (!authLoading.value) void loadMore()
  })

  async function loadMore() {
    if (!isConfigured || authLoading.value || loading.value || !hasMore.value) return
    const version = sessionVersion
    loading.value = true
    loadError.value = ''
    try {
      const page = await listMoments(cursor)
      if (disposed || version !== sessionVersion) return
      const existing = new Set(moments.value.map(item => item.id))
      moments.value.push(...page.items.filter(item => !existing.has(item.id)))
      cursor = page.items[page.items.length - 1] ?? cursor
      hasMore.value = page.hasMore
    } catch {
      if (!disposed && version === sessionVersion) loadError.value = '暂时无法加载记录，请稍后重试。'
    } finally {
      if (!disposed && version === sessionVersion) loading.value = false
    }
  }

  async function initAuth() {
    const callback = new URL(window.location.href)
    const code = callback.searchParams.get('code')
    const hash = new URLSearchParams(callback.hash.slice(1))
    const callbackError = callback.searchParams.has('error') || hash.has('error')
    try {
      const auth = getSupabase().auth
      const { data } = auth.onAuthStateChange((_event, session) => {
        if (disposed) return
        user.value = session?.user ?? null
        if (!session) {
          draft.value = ''
          draftPublic.value = false
          pendingPost = undefined
        }
      })
      unsubscribe = () => data.subscription.unsubscribe()
      if (callbackError) throw new Error('OAuth callback failed')
      const result = code ? await auth.exchangeCodeForSession(code) : await auth.getSession()
      if (result.error) throw result.error
      if (!disposed) user.value = result.data.session?.user ?? null
    } catch {
      if (!disposed) actionError.value = '登录未完成，请重新尝试。'
    } finally {
      if (!disposed && (code || callbackError)) {
        for (const key of ['code', 'error', 'error_code', 'error_description']) {
          callback.searchParams.delete(key)
        }
        if (hash.has('error')) callback.hash = ''
        window.history.replaceState(window.history.state, '', callback.pathname + callback.search + callback.hash)
      }
      if (!disposed) authLoading.value = false
    }
  }

  async function signIn() {
    if (authBusy.value) return
    authBusy.value = true
    actionError.value = ''
    try {
      const { error } = await getSupabase().auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: `${window.location.origin}/moments` },
      })
      if (error) throw error
    } catch {
      actionError.value = '暂时无法登录，请稍后重试。'
    } finally {
      authBusy.value = false
    }
  }

  async function signOut() {
    if (authBusy.value) return
    authBusy.value = true
    actionError.value = ''
    notice.value = ''
    try {
      const { error } = await getSupabase().auth.signOut({ scope: 'local' })
      if (error) throw error
    } catch {
      actionError.value = '退出未完成，请稍后重试。'
    } finally {
      authBusy.value = false
    }
  }

  async function publish() {
    if (!canPublish.value) return
    const version = sessionVersion
    publishing.value = true
    actionError.value = ''
    notice.value = ''
    const content = draft.value.trim()
    try {
      if (pendingPost?.content !== content) pendingPost = { id: crypto.randomUUID(), content }
      const saved = await publishMoment(pendingPost.id, content, draftPublic.value)
      if (disposed || version !== sessionVersion) return
      moments.value = [saved, ...moments.value.filter(item => item.id !== saved.id)]
      draft.value = ''
      draftPublic.value = false
      pendingPost = undefined
      notice.value = '已发布。'
    } catch {
      if (!disposed && version === sessionVersion) actionError.value = '发布未完成，内容已保留，请重试。'
    } finally {
      if (!disposed) publishing.value = false
    }
  }

  async function toggleVisibility(moment: Moment) {
    if (!isOwner.value || authBusy.value || updatingId.value) return
    const version = sessionVersion
    updatingId.value = moment.id
    actionError.value = ''
    notice.value = ''
    try {
      const saved = await setMomentVisibility(moment.id, !moment.is_public)
      if (disposed || version !== sessionVersion) return
      moments.value = moments.value.map(item => item.id === saved.id ? saved : item)
      notice.value = saved.is_public ? '已设为公开。' : '已设为私密。'
    } catch {
      if (!disposed && version === sessionVersion) actionError.value = '状态保存未完成，请重试。'
    } finally {
      if (!disposed) updatingId.value = null
    }
  }

  async function downloadBackup() {
    if (!isOwner.value || authBusy.value || exporting.value) return
    const version = sessionVersion
    exporting.value = true
    actionError.value = ''
    notice.value = ''
    try {
      const items = await exportMoments()
      if (disposed || version !== sessionVersion) return
      const exportedAt = new Date().toISOString()
      const blob = new Blob([JSON.stringify({ version: 1, exportedAt, moments: items }, null, 2)], {
        type: 'application/json;charset=utf-8',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `moments-${exportedAt.slice(0, 10)}.json`
      document.body.append(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 0)
      notice.value = `已导出 ${items.length} 条记录。`
    } catch {
      if (!disposed && version === sessionVersion) actionError.value = '备份导出失败，请稍后重试。'
    } finally {
      if (!disposed) exporting.value = false
    }
  }

  onMounted(async () => {
    if (!isConfigured) return
    await initAuth()
    if (disposed) return
    void loadMore()
  })
  onUnmounted(() => {
    disposed = true
    unsubscribe?.()
  })

  return {
    user, moments, draft, draftPublic, authLoading, authBusy, loading, publishing, exporting, updatingId,
    hasMore, loadError, actionError, notice, isOwner, contentLength, canPublish,
    isConfigured, contentLimit, loadMore, signIn, signOut, publish, toggleVisibility, downloadBackup,
  }
}
