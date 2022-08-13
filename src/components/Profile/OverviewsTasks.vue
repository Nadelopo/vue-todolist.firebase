<template>
  <div>
    <div class="font-medium text-lg mb-4">Обзор задач</div>
    <div class="flex gap-2">
      <div class="task__wrapper">
        <div>{{ completedTasks }}</div>
        <div class="text-center">Завершенные задачи</div>
      </div>
      <div class="task__wrapper">
        <div>{{ notCompleted }}</div>
        <div class="text-center">Не завершенные задачи</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLoadUsers } from '@/store/Users'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useLoadUsers())

const completedTasks = computed(
  () => user.value?.tasks.filter((t) => t.status).length
)

const notCompleted = computed(
  () => user.value?.tasks.filter((t) => !t.status).length
)
</script>

<style scoped lang="sass">

.task__wrapper
  flex-direction: column
  // gap: 6px
  padding: 15px
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  border-radius: 8px
  background: var(--back-second)
  min-height: 90px
</style>
