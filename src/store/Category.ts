import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export const categoryStore = defineStore('category', {
  state: () => {
    const route = useRoute()
    const currentCategory = ref(route.query.category || null)

    watch(
      () => route.query.category,
      (currentValue) => {
        currentCategory.value = currentValue
      },
      { deep: true }
    )
    return { currentCategory }
  },
})
