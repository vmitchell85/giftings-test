<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'
import { useAssessment } from './composables/useAssessment'
import ThemeToggle from './components/ThemeToggle.vue'
import WelcomeScreen from './screens/WelcomeScreen.vue'
import TestScreen from './screens/TestScreen.vue'
import ResultsScreen from './screens/ResultsScreen.vue'

const { initTheme, themeMenuOpen } = useTheme()
const { screen } = useAssessment()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <ThemeToggle />
  <div v-if="themeMenuOpen" class="fixed inset-0 z-40" @click="themeMenuOpen = false"></div>
  <WelcomeScreen v-if="screen === 'welcome'" />
  <TestScreen v-else-if="screen === 'test'" />
  <ResultsScreen v-else-if="screen === 'results'" />
</template>
