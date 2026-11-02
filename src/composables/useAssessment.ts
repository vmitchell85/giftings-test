import { ref, computed } from 'vue'

const STORAGE_KEY = 'spiritual-gifts-answers'
const RESULTS_KEY = 'spiritual-gifts-results-v1'

export const TOTAL_QUESTIONS = 133
export const QUESTIONS_PER_PAGE = 5
export const TOTAL_PAGES = Math.ceil(TOTAL_QUESTIONS / QUESTIONS_PER_PAGE)

export const ANSWER_LABELS = ['Not at all', 'Seldom', 'Sometimes', 'Consistently']

const screen = ref<'welcome' | 'test' | 'results'>('welcome')
const page = ref(0)
const answers = ref<(number | null)[]>(Array(133).fill(null))
const showWarning = ref(false)
const unansweredOnPage = ref<number[]>([])
const scores = ref<{ giftIndex: number; score: number; rank: number }[]>([])

// Load saved results on module init
;(function loadSavedResults() {
  try {
    const s = localStorage.getItem(RESULTS_KEY)
    if (s) {
      const parsed = JSON.parse(s)
      if (Array.isArray(parsed) && parsed.length === 19) {
        scores.value = parsed
      }
    }
  } catch { /* ignore */ }
})()

// localStorage isn't reactive, so track whether stored answers exist in a ref
// that is kept in sync whenever storage is written or cleared.
const hasStoredAnswers = ref((() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return false
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) && parsed.some((v: unknown) => v !== null)
  } catch { return false }
})())

const hasSavedResults = computed(() => scores.value.length === 19)

const answeredCount = computed(() => answers.value.filter(v => v !== null).length)
const progressPercent = computed(() => Math.round((answeredCount.value / 133) * 100))

const currentPageQuestions = computed(() => {
  const start = page.value * QUESTIONS_PER_PAGE
  const end = Math.min(start + QUESTIONS_PER_PAGE, TOTAL_QUESTIONS)
  return Array.from({ length: end - start }, (_, i) => ({
    globalIndex: start + i,
  }))
})

const tierStrong = computed(() => scores.value.filter(s => s.score >= 15))
const tierGrowing = computed(() => scores.value.filter(s => s.score >= 8 && s.score < 15))
const tierLatent = computed(() => scores.value.filter(s => s.score < 8))

function saveToStorage() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(answers.value)) } catch { /* ignore */ }
  hasStoredAnswers.value = answers.value.some(v => v !== null)
}

function loadFromStorage(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length === 133) {
        answers.value = parsed
        return true
      }
    }
  } catch { /* ignore */ }
  return false
}

function beginAssessment() {
  answers.value = Array(133).fill(null)
  page.value = 0
  screen.value = 'test'
}

function restoreAnswers() {
  if (loadFromStorage()) {
    page.value = 0
    screen.value = 'test'
  }
}

function viewResults() {
  screen.value = 'results'
}

function setAnswer(index: number, value: number) {
  answers.value[index] = value
  saveToStorage()
  const idx = unansweredOnPage.value.indexOf(index)
  if (idx !== -1) unansweredOnPage.value.splice(idx, 1)
  if (unansweredOnPage.value.length === 0) showWarning.value = false
}

function prevPage() {
  if (page.value > 0) {
    page.value--
    showWarning.value = false
    unansweredOnPage.value = []
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function nextPage() {
  const start = page.value * QUESTIONS_PER_PAGE
  const end = Math.min(start + QUESTIONS_PER_PAGE, TOTAL_QUESTIONS)
  const missing: number[] = []
  for (let i = start; i < end; i++) {
    if (answers.value[i] === null) missing.push(i)
  }
  if (missing.length > 0) {
    unansweredOnPage.value = missing
    showWarning.value = true
    const firstMissing = document.getElementById('q-' + missing[0])
    if (firstMissing) firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  showWarning.value = false
  unansweredOnPage.value = []
  if (page.value < TOTAL_PAGES - 1) {
    page.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    submitTest()
  }
}

function submitTest() {
  const s: { giftIndex: number; score: number; rank: number }[] = []
  for (let i = 0; i < 19; i++) {
    let total = 0
    for (let round = 0; round < 7; round++) {
      const val = answers.value[i + round * 19]
      total += val !== null ? val : 0
    }
    s.push({ giftIndex: i, score: total, rank: 0 })
  }
  s.sort((a, b) => b.score - a.score)
  scores.value = s.map((item, rank) => ({ ...item, rank: rank + 1 }))
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(scores.value)) } catch { /* ignore */ }
  screen.value = 'results'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function retakeTest() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(RESULTS_KEY)
  } catch { /* ignore */ }
  answers.value = Array(133).fill(null)
  page.value = 0
  scores.value = []
  hasStoredAnswers.value = false
  showWarning.value = false
  unansweredOnPage.value = []
  screen.value = 'welcome'
}

export function useAssessment() {
  return {
    screen,
    page,
    answers,
    showWarning,
    unansweredOnPage,
    hasStoredAnswers,
    hasSavedResults,
    answeredCount,
    progressPercent,
    currentPageQuestions,
    scores,
    tierStrong,
    tierGrowing,
    tierLatent,
    ANSWER_LABELS,
    TOTAL_PAGES,
    beginAssessment,
    restoreAnswers,
    viewResults,
    setAnswer,
    prevPage,
    nextPage,
    retakeTest,
  }
}
