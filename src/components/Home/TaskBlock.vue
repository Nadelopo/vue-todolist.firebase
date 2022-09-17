<script setup lang="ts">
import { useLoadUsers } from '@/store/Users'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { categoryStore } from '@/store/Category'
import { updateTask, getUser } from '@/firebase'
import Popup from '../UI/Popup.vue'
import { Ttask } from '@/types/tasks'

const { user, userId } = storeToRefs(useLoadUsers())
const { currentCategory } = storeToRefs(categoryStore())

const filterTasks = computed(() => {
  const filter = [...user.value.tasks].filter(
    (t) =>
      t.category == (currentCategory.value ? currentCategory.value : t.category)
  )
  const sortByDate = filter
    .sort((a, b) => a.date.seconds - b.date.seconds)
    .reverse()
  return sortByDate
})

const edit = async (task: Ttask) => {
  const editTasks = [...user.value.tasks].map((t) =>
    t.id === task.id ? { ...task, status: !task.status } : t
  )
  updateTask(userId.value, editTasks)
  user.value.tasks = editTasks
}

const deleteTask = async (taskId: number): Promise<void> => {
  updateTask(
    userId.value,
    user.value.tasks.filter((e: Ttask) => e.id != taskId)
  )
  user.value.tasks = user.value.tasks.filter((e: Ttask) => e.id != taskId)
}

const visibleInput = ref(false)
const currentChangedTask = ref<Ttask>({
  category: 0,
  date: {
    seconds: 0,
    nanoseconds: 0,
  },
  id: 1,
  status: true,
  title: '',
})

const change = (task: Ttask): void => {
  currentChangedTask.value = { ...task }
  visibleInput.value = true
}

const saveChanges = async () => {
  updateTask(
    userId.value,
    user.value.tasks.map((e: Ttask) =>
      e.id === currentChangedTask.value.id ? { ...currentChangedTask.value } : e
    )
  )
  visibleInput.value = false
  user.value = await getUser(userId.value)
}

const calculate = (date: string): void => {
  date.split('.').slice(0, -1).join('.')
}
</script>

<template>
  <div>
    <div class="wrapper" v-if="user">
      <template v-for="task in filterTasks" :key="task.id">
        <div class="task__wrapper">
          <div
            :class="{ text__crossed: task.status }"
            class="overflow-hidden flex justify-between w-full"
          >
            <div class="mr-4 overflow-hidden whitespace-nowrap text-ellipsis">
              {{ task.title }}
            </div>

            <div class="mr-2">
              {{
                calculate(
                  new Date(task.date.seconds * 1000).toLocaleDateString()
                )
              }}
            </div>
          </div>
          <div class="flex items-center w-14 justify-between">
            <div
              :class="{
                check__off: task.status == false,
                check__on: task.status == true,
              }"
              @click="edit(task)"
            ></div>
            <Popup
              :deleteHandler="deleteTask"
              :id="task.id"
              :change="change"
              :item="task"
            />
          </div>
        </div>
      </template>
      <div v-if="visibleInput" class="mt-6">
        <input type="text" v-model="currentChangedTask.title" />
        <button class="mbtn mt-4" @click="saveChanges">сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.check__off
  transition: .3s
  &:hover
    box-shadow: var(--shadow-focus)
  cursor: pointer
  border-radius: 100px
  width: 30px
  height: 30px
  background: var(--back-main)
  border: 2px solid var(--color)


.check__on
  transition: .3s
  cursor: pointer
  border-radius: 100px
  width: 30px
  height: 30px
  background: var(--color)
  border: 2px solid var(--back-main)
  &::after
    content: '✓'
    color: var(--back-main)
    display: flex
    justify-content: center
    align-items: center
  &:hover
    box-shadow: var(--shadow-focus)


.text__crossed
  text-decoration: line-through

hr
  margin-bottom: 10px
  margin-top: 6px
  color: var(--color)

.task__wrapper
  display: flex
  justify-content: space-between
  margin-bottom: 8px
  // background: var(--back-main)
  // border-radius: 8px
  // padding: 4px 6px
</style>
