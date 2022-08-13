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
    // watchEffect(() => {
    //   console.log(2)
    //   currentCategory.value = route.query.category
    // })

    return { currentCategory }
  },
})
