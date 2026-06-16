<script setup lang="ts">
import { useAssessment } from '../composables/useAssessment'
import { QUESTIONS } from '../data/questions'

const {
  page,
  answers,
  showWarning,
  unansweredOnPage,
  answeredCount,
  progressPercent,
  currentPageQuestions,
  ANSWER_LABELS,
  setAnswer,
  prevPage,
  nextPage,
} = useAssessment()
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
    <!-- Progress header -->
    <div class="flex flex-col gap-3 pt-4">
      <div class="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
        <span>Page {{ page + 1 }} of 7</span>
        <span class="tabular-nums">{{ answeredCount }}/133 answered</span>
      </div>
      <div class="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
        <div class="h-full bg-sky-500 rounded-full transition-all duration-300" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <p class="text-xs text-zinc-400 dark:text-zinc-500 text-right tabular-nums">{{ progressPercent }}% complete</p>
    </div>

    <!-- Unanswered warning -->
    <div v-if="showWarning" class="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-400 text-sm">
      <span class="shrink-0 mt-0.5">⚠</span>
      <span>Please answer all questions on this page before continuing. {{ unansweredOnPage.length }} question{{ unansweredOnPage.length > 1 ? 's' : '' }} remaining.</span>
    </div>

    <!-- Questions -->
    <ol role="list" class="flex flex-col gap-8">
      <li
        v-for="q in currentPageQuestions"
        :key="q.globalIndex"
        :id="'q-' + q.globalIndex"
        class="flex flex-col gap-3"
      >
        <div class="flex gap-3 items-start">
          <span class="shrink-0 tabular-nums text-sm font-semibold text-zinc-400 dark:text-zinc-500 w-7 pt-0.5 text-right">{{ q.globalIndex + 1 }}.</span>
          <p
            class="text-base text-pretty"
            :class="unansweredOnPage.includes(q.globalIndex) ? 'text-red-700 dark:text-red-400 font-semibold' : 'text-zinc-900 dark:text-zinc-100'"
          >{{ QUESTIONS[q.globalIndex] }}</p>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pl-10">
          <label
            v-for="(label, val) in ANSWER_LABELS"
            :key="val"
            class="radio-card cursor-pointer"
          >
            <input
              type="radio"
              :name="'q' + q.globalIndex"
              :value="val"
              :checked="answers[q.globalIndex] === val"
              @change="setAnswer(q.globalIndex, val)"
            />
            <span
              class="radio-label flex flex-col items-center justify-center text-center px-2 py-3 rounded-lg border text-sm select-none"
              :class="answers[q.globalIndex] === val
                ? 'ring-2 ring-sky-500 bg-sky-50 dark:bg-sky-950 border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-200'
                : unansweredOnPage.includes(q.globalIndex)
                  ? 'border-red-200 dark:border-red-800/50 bg-red-50/30 dark:bg-red-950/20 text-zinc-700 dark:text-zinc-300 ring-1 ring-black/5 dark:ring-white/5'
                  : 'border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 ring-1 ring-black/5 dark:ring-white/5 hover:border-zinc-300 dark:hover:border-white/20'"
            >
              <span class="font-semibold text-xs tabular-nums mb-1"
                :class="answers[q.globalIndex] === val ? 'text-sky-600 dark:text-sky-400' : 'text-zinc-400 dark:text-zinc-500'"
              >{{ val }}</span>
              {{ label }}
            </span>
          </label>
        </div>
      </li>
    </ol>

    <!-- Navigation -->
    <div class="flex items-center justify-between pt-4 pb-8 border-t border-zinc-100 dark:border-white/8">
      <button
        type="button"
        @click="prevPage"
        :disabled="page === 0"
        class="px-4 py-2 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:opacity-30 disabled:cursor-not-allowed"
      >← Previous</button>
      <button
        type="button"
        @click="nextPage"
        class="bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 hover:bg-sky-700"
      >{{ page === 6 ? 'Submit Assessment' : 'Next →' }}</button>
    </div>
  </div>
</template>
