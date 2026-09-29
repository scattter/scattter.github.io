import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type Moment = {
  id: string
  content: string
  created_at: string
}

type Database = {
  public: {
    Tables: {
      moments: {
        Row: Moment
        Insert: Pick<Moment, 'id' | 'content'>
        Update: never
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()
export const ownerId = import.meta.env.VITE_SUPABASE_OWNER_ID?.trim()
export const isConfigured = Boolean(url && key)
export const contentLimit = 2000
const columns = 'id, content, created_at'
let client: SupabaseClient<Database> | undefined

export function getSupabase() {
  if (!url || !key) throw new Error('Supabase 尚未配置')

  client ??= createClient<Database>(url, key, {
    auth: {
      flowType: 'pkce',
      // 在页面中处理回调，才能显示失败状态并清理地址里的授权参数。
      detectSessionInUrl: false,
    },
  })
  return client
}

export async function listMoments(cursor?: Moment, limit = 20) {
  let query = getSupabase()
    .from('moments')
    .select(columns)
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .limit(limit + 1)

  if (cursor) {
    // 使用时间和 ID 翻页，发布新内容不会让后续分页重复或漏掉旧记录。
    query = query.or(
      `created_at.lt.${cursor.created_at},and(created_at.eq.${cursor.created_at},id.lt.${cursor.id})`,
    )
  }

  const { data, error } = await query
  if (error) throw error
  return { items: data.slice(0, limit), hasMore: data.length > limit }
}

export async function publishMoment(id: string, content: string) {
  const { data, error } = await getSupabase()
    .from('moments')
    .insert({ id, content })
    .select(columns)
    .single()

  if (!error) return data
  if (error.code !== '23505') throw error

  // 网络中断后重试同一次发布，取回已经写入的记录，避免重复发帖。
  const saved = await getSupabase().from('moments').select(columns).eq('id', id).single()
  if (saved.error) throw saved.error
  return saved.data
}

export async function exportMoments() {
  const items: Moment[] = []
  let cursor: Moment | undefined
  while (true) {
    const page = await listMoments(cursor, 100)
    items.push(...page.items)
    if (!page.hasMore) return items
    cursor = page.items[page.items.length - 1]
  }
}
