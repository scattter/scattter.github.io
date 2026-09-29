<script setup lang="ts">
import { useMoments } from './useMoments'

const {
  user, moments, draft, draftPublic, authLoading, authBusy, loading, publishing, exporting, updatingId,
  hasMore, loadError, actionError, notice, isOwner, contentLength, canPublish,
  isConfigured, contentLimit, loadMore, signIn, signOut, publish, toggleVisibility, downloadBackup,
} = useMoments()

const dateFormat = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false,
})
</script>

<template>
  <section class="moments" aria-labelledby="moments-title">
    <header class="moments-header">
      <div>
        <h1 id="moments-title">碎碎念</h1>
        <p class="subtitle">随手记下日常、想法和生活里的小事。</p>
      </div>
      <div v-if="isConfigured" class="actions">
        <span v-if="authLoading" class="muted" role="status">正在确认登录…</span>
        <template v-else-if="user">
          <button v-if="isOwner" type="button" :disabled="exporting" @click="downloadBackup">
            {{ exporting ? '正在导出…' : '导出备份' }}
          </button>
          <button type="button" :disabled="authBusy || publishing || !!updatingId" @click="signOut">退出登录</button>
        </template>
        <button v-else type="button" :disabled="authBusy" @click="signIn">
          {{ authBusy ? '正在登录…' : '博主登录' }}
        </button>
      </div>
    </header>

    <form v-if="isOwner" class="composer" :aria-busy="publishing" @submit.prevent="publish">
      <label for="moment-content">写点什么</label>
      <textarea
        id="moment-content"
        v-model="draft"
        rows="5"
        :disabled="publishing"
        :aria-invalid="contentLength > contentLimit"
        aria-describedby="moment-count"
        placeholder="今天有什么想记录的？"
      />
      <div class="composer-footer">
        <span id="moment-count" :class="['muted', { error: contentLength > contentLimit }]">
          {{ contentLength }} / {{ contentLimit }} 字
        </span>
        <div class="actions">
          <label for="moment-visibility" class="visibility-label">可见范围</label>
          <select id="moment-visibility" v-model="draftPublic" :disabled="publishing">
            <option :value="false">私密</option>
            <option :value="true">公开</option>
          </select>
          <button type="submit" class="primary" :disabled="!canPublish">
            {{ publishing ? '正在发布…' : '发布' }}
          </button>
        </div>
      </div>
    </form>
    <p v-else-if="user && !authLoading" class="muted">此账号没有发布权限，可以继续浏览记录。</p>
    <p v-if="actionError" class="error" role="alert">{{ actionError }}</p>
    <p v-if="notice" class="muted" role="status">{{ notice }}</p>

    <p v-if="!isConfigured" class="empty">碎碎念暂未开放。</p>
    <template v-else>
      <ol v-if="moments.length" class="moment-list" aria-label="碎碎念列表">
        <li v-for="moment in moments" :key="moment.id">
          <article>
            <div class="moment-header">
              <time :datetime="moment.created_at">{{ dateFormat.format(new Date(moment.created_at)) }}</time>
              <div v-if="isOwner" class="actions">
                <span class="muted">{{ moment.is_public ? '公开' : '私密' }}</span>
                <button
                  type="button"
                  :disabled="authBusy || !!updatingId"
                  @click="toggleVisibility(moment)"
                >
                  {{ updatingId === moment.id ? '正在保存…' : moment.is_public ? '设为私密' : '设为公开' }}
                </button>
              </div>
            </div>
            <p class="content">{{ moment.content }}</p>
          </article>
        </li>
      </ol>
      <p v-else-if="!authLoading && !loading && !loadError" class="empty">还没有记录，等一个想说点什么的时刻。</p>
      <div class="feed-footer" :aria-busy="loading">
        <p v-if="loading" class="muted" role="status">正在加载…</p>
        <template v-else-if="loadError">
          <p class="error" role="alert">{{ loadError }}</p>
          <button type="button" @click="loadMore">重新加载</button>
        </template>
        <button v-else-if="hasMore" type="button" @click="loadMore">更早的记录</button>
        <p v-else-if="moments.length" class="muted">已经看到最早的记录了。</p>
      </div>
    </template>
  </section>
</template>

<style scoped>
.moments { margin: 8px 0 32px; }
.moments-header, .actions, .composer-footer, .moment-header { display: flex; align-items: center; gap: 12px; }
.moments-header { align-items: flex-start; justify-content: space-between; flex-wrap: wrap; margin-bottom: 28px; }
.moments h1 { margin: 0; }
.moments .subtitle { margin: 12px 0 0; color: var(--vp-c-text-2); }
.actions { flex-wrap: wrap; }
.moments button, .moments select {
  min-height: 44px;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}
.moments button:hover:not(:disabled) { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.moments button:disabled { opacity: 0.55; cursor: not-allowed; }
.moments button.primary { background: var(--vp-c-brand-1); border-color: var(--vp-c-brand-1); color: white; }
.moments button.primary:hover:not(:disabled) { background: var(--vp-c-brand-2); color: white; }
.moments button:focus-visible, .moments select:focus-visible, .composer textarea:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.composer { padding: 20px; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg-soft); }
.composer label { display: block; margin-bottom: 12px; font-weight: 600; }
.composer .visibility-label { margin-bottom: 0; font-size: 14px; font-weight: normal; }
.composer textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  line-height: 1.8;
  resize: vertical;
}
.composer textarea::placeholder { color: var(--vp-c-text-3); }
.composer-footer { justify-content: space-between; flex-wrap: wrap; margin-top: 12px; }
.moment-header { justify-content: space-between; flex-wrap: wrap; }
.muted, .moments time { font-size: 14px; color: var(--vp-c-text-2); }
.error { color: var(--vp-c-danger-1); }
.moments .moment-list { margin: 24px 0 0; padding: 0; list-style: none; }
.moments .moment-list > li { margin: 0; padding: 24px 0; border-bottom: 1px solid var(--vp-c-divider); }
.moments .content { margin: 10px 0 0; white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.9; }
.empty { padding: 48px 0; text-align: center; color: var(--vp-c-text-2); }
.feed-footer { margin-top: 24px; text-align: center; }
@media (max-width: 640px) {
  .composer { padding: 16px; }
  .moments-header { gap: 20px; }
}
</style>
