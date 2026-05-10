// composables/useLocalStorageState.js
import { ref, watch } from 'vue'

export function useLocalStorageState(key, defaultValue) {
  const stored = process.client ? localStorage.getItem(key) : null
  const parsed = stored ? JSON.parse(stored) : defaultValue
  const state = ref(parsed)

  if (process.client) {
    watch(state, (val) => {
      localStorage.setItem(key, JSON.stringify(val))
    }, { deep: true })
  }

  return state
}