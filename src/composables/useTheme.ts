import { ref } from 'vue'

const THEME_KEY = 'color-scheme'

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'system', label: 'System' },
  { value: 'dark', label: 'Dark' },
]

const themeChoice = ref(localStorage.getItem(THEME_KEY) || 'system')
const isDark = ref(document.documentElement.classList.contains('dark'))
const themeMenuOpen = ref(false)

function setDark(on: boolean) {
  isDark.value = on
  document.documentElement.classList.toggle('dark', on)
}

function applyTheme(choice: string) {
  themeChoice.value = choice
  themeMenuOpen.value = false
  if (choice === 'system') {
    localStorage.removeItem(THEME_KEY)
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
  } else {
    localStorage.setItem(THEME_KEY, choice)
    setDark(choice === 'dark')
  }
}

function initTheme() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) setDark(e.matches)
  })
}

export function useTheme() {
  return { themeChoice, isDark, themeMenuOpen, applyTheme, initTheme, THEME_OPTIONS }
}
