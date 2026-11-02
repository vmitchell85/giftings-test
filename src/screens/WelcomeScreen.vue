<script setup lang="ts">
import { useAssessment } from '../composables/useAssessment'
import { joinGiftNames, parseShareSlug } from '../data/share'

// Visitors arriving from a shared results link land here as /?shared=<slug>.
const sharedGifts = parseShareSlug(new URLSearchParams(location.search).get('shared') ?? '')

const { hasStoredAnswers, hasSavedResults, beginAssessment, restoreAnswers, viewResults, TOTAL_PAGES } = useAssessment()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-dvh py-16 sm:py-24 px-4">
    <div class="max-w-2xl mx-auto text-center flex flex-col gap-8">
      <div class="flex flex-col gap-3">
        <div class="inline-flex items-center justify-center size-16 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-2xl mx-auto">✦</div>
        <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-balance text-zinc-900 dark:text-zinc-100">Discover Your Spiritual Gifts</h1>
        <p class="text-lg text-zinc-600 dark:text-zinc-400 text-pretty">A 133-question assessment helping you understand the unique gifts God has placed in your life.</p>
      </div>
      <p v-if="sharedGifts" class="mx-auto max-w-md px-4 py-3 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/60 text-sm text-sky-900 dark:text-sky-200 text-pretty">
        Someone shared their top gifts with you: <strong class="font-semibold">{{ joinGiftNames(sharedGifts) }}</strong>. Take the assessment to discover yours.
      </p>
      <blockquote class="border-l-2 border-sky-400 dark:border-sky-600 pl-4 text-left mx-auto max-w-md">
        <p class="text-zinc-700 dark:text-zinc-300 italic text-pretty">"Each of you should use whatever gift you have received to serve others."</p>
        <footer class="text-sm text-zinc-500 dark:text-zinc-500 mt-1">— 1 Peter 4:10</footer>
      </blockquote>
      <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <button
          type="button"
          @click="beginAssessment"
          class="bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 hover:bg-sky-700 w-full sm:w-auto"
        >Begin Assessment</button>
        <button
          v-if="hasStoredAnswers"
          type="button"
          @click="restoreAnswers"
          class="px-6 py-3 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 w-full sm:w-auto"
        >Restore Previous Answers</button>
        <button
          v-if="hasSavedResults"
          type="button"
          @click="viewResults"
          class="px-6 py-3 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 w-full sm:w-auto"
        >View Previous Results</button>
      </div>
      <p class="text-sm text-zinc-400 dark:text-zinc-500">19 spiritual gifts · {{ TOTAL_PAGES }} pages · takes about 15–20 minutes</p>
    </div>
  </div>
</template>
