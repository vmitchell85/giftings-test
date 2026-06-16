<script setup lang="ts">
import { useAssessment } from '../composables/useAssessment'
import { GIFTS } from '../data/gifts'

const { scores, retakeTest } = useAssessment()
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col gap-12">
    <div class="flex flex-col gap-4">
      <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-balance text-zinc-900 dark:text-zinc-100">Your Spiritual Gifts</h1>
      <blockquote class="border-l-2 border-sky-400 dark:border-sky-600 pl-4">
        <p class="text-zinc-500 dark:text-zinc-400 italic text-pretty">"Each of you should use whatever gift you have received to serve others."</p>
        <footer class="text-xs text-zinc-400 dark:text-zinc-500 mt-1">— 1 Peter 4:10</footer>
      </blockquote>
    </div>
    <ol role="list" class="flex flex-col gap-0">
      <li v-for="item in scores" :key="item.giftIndex" class="flex flex-col gap-2 py-8 border-t border-zinc-100 dark:border-white/8 first:border-t-0 first:pt-0">
        <div class="flex items-start justify-between gap-6">
          <div class="flex flex-col gap-1">
            <span class="text-xs tabular-nums font-semibold text-zinc-300 dark:text-zinc-600">{{ String(item.rank).padStart(2, '0') }}</span>
            <h2 class="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{{ GIFTS[item.giftIndex].name }}</h2>
          </div>
          <span class="shrink-0 tabular-nums text-2xl font-semibold text-zinc-300 dark:text-zinc-600 pt-5">{{ item.score }}</span>
        </div>
        <div class="h-px bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div class="h-full" :class="item.rank <= 3 ? 'bg-sky-500' : 'bg-zinc-300 dark:bg-zinc-600'" :style="{ width: Math.round((item.score / 21) * 100) + '%' }"></div>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400 text-pretty pt-1">{{ GIFTS[item.giftIndex].description }}</p>
        <p v-if="GIFTS[item.giftIndex].scripture" class="text-xs text-zinc-400 dark:text-zinc-500">{{ GIFTS[item.giftIndex].scripture }}</p>
      </li>
    </ol>
    <div class="pt-4 pb-4">
      <button type="button" @click="retakeTest" class="px-6 py-3 rounded-lg font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">Retake Assessment</button>
    </div>
    <p class="text-xs text-zinc-400 dark:text-zinc-500 text-pretty pb-8">Taken from <em>Network Participant's Guide</em> by Don Cousins, Bill Hybels, and Bruce Bugbee. Copyright 1994 by Willow Creek Community Church. Used by permission of Zondervan. <a href="https://www.zondervan.com" class="underline underline-offset-2 hover:text-zinc-600 dark:hover:text-zinc-400">www.zondervan.com</a></p>
  </div>
</template>
