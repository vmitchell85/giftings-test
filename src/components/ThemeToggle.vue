<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { isDark, themeChoice, themeMenuOpen, applyTheme, THEME_OPTIONS } = useTheme()
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col items-end gap-1">
    <button
      type="button"
      @click="themeMenuOpen = !themeMenuOpen"
      class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 shadow-sm"
      aria-label="Switch theme"
    >
      <!-- Sun icon -->
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4 shrink-0">
        <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2ZM10 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 15ZM10 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM15.657 5.404a.75.75 0 1 0-1.06-1.06l-1.061 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM6.464 14.596a.75.75 0 1 0-1.06-1.06l-1.06 1.06a.75.75 0 0 0 1.06 1.06l1.06-1.06ZM18 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 18 10ZM5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 5 10ZM14.596 15.657a.75.75 0 0 0 1.06-1.06l-1.06-1.061a.75.75 0 1 0-1.06 1.06l1.06 1.06ZM5.404 6.464a.75.75 0 0 0 1.06-1.06L5.404 4.343a.75.75 0 0 0-1.06 1.06l1.06 1.061Z"/>
      </svg>
      <!-- Moon icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-4 shrink-0">
        <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77 7 7 0 0 0 9.958 7.967.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-3 shrink-0 text-zinc-400 dark:text-zinc-500">
        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"/>
      </svg>
    </button>

    <!-- Dropdown -->
    <div v-if="themeMenuOpen" class="flex flex-col overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800 shadow-lg">
      <button
        v-for="opt in THEME_OPTIONS"
        :key="opt.value"
        type="button"
        @click="applyTheme(opt.value)"
        class="flex items-center justify-between gap-4 px-4 py-2.5 text-sm text-left hover:bg-zinc-50 dark:hover:bg-zinc-700 focus-visible:outline-none"
        :class="themeChoice === opt.value ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-zinc-700 dark:text-zinc-300'"
      >
        {{ opt.label }}
        <svg v-if="themeChoice === opt.value" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 shrink-0 text-sky-500">
          <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd"/>
        </svg>
        <span v-else class="size-4 shrink-0"></span>
      </button>
    </div>
  </div>
</template>
