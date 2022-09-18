<script setup lang="ts">
import { ref, inject } from 'vue'
//@ts-ignore
import { updateTask } from '@/firebase'
//@ts-ignore
import { useLoadUsers } from '@/store/Users'
import { storeToRefs } from 'pinia'
import { onClickOutside } from '@vueuse/core'
import Swal from 'sweetalert2'
import TaskBlock from '@/components/Home/TaskBlock.vue'
import firebase from 'firebase/app'
import { setOpenKey, openKey } from '@/symbols'
import { Ttask, TCategory } from '@/types/tasks'

const { userId, user } = storeToRefs(useLoadUsers())

const open = inject(openKey)
const setOpen = inject(setOpenKey, () => null)

const list = ref('')
const currentCategory = ref<TCategory>({
  id: null,
  title: '',
})
const fromWarning = ref(false)
const addTask = async (): Promise<void> => {
  if (!currentCategory.value || !list.value) {
    fromWarning.value = true
    Swal.fire('Заполните поля', '', 'warning')
    setTimeout(() => (fromWarning.value = false), 2000)
  } else if (currentCategory.value.id) {
    const tasks: Ttask[] = [...user.value.tasks]
    tasks.push({
      id: user.value.tasks.length,
      category: currentCategory.value.id,
      title: list.value,
      status: false,
      date: firebase.firestore.Timestamp.now(),
    })
    updateTask(userId.value, tasks)
    user.value.tasks = tasks
    list.value = ''
  }
}

const activeSelect = ref(false)
const wrapRef = ref(null)

const openSelect = () => {
  activeSelect.value = !activeSelect.value
}

onClickOutside(wrapRef, () => {
  activeSelect.value = false
})
</script>

<template>
  <div class="container">
    <div class="mb-4 mx-auto">
      <button class="cbtn" @click="setOpen(!open)">
        <Transition name="fade" mode="out-in">
          <div v-if="open">закрыть</div>
          <div v-else>создать</div>
        </Transition>
      </button>
    </div>
    <div>
      <transition-group name="flip">
        <div v-if="open" class="wrapper" :key="0">
          <div class="mb-4">
            <input
              type="text"
              placeholder="название задачи"
              :class="{ form__warning: fromWarning }"
              v-model="list"
              required
            />
          </div>
          <div class="mb-4 relative">
            <div
              class="select"
              @click="openSelect"
              :class="{ active: activeSelect, form__warning: fromWarning }"
              ref="wrapRef"
            >
              <div>
                {{
                  currentCategory.title
                    ? currentCategory.title
                    : 'Выберите категорию'
                }}
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.67861 1.8337L5.77064 5.68539C5.34503 6.10487 4.65497 6.10487 4.22936 5.68539L0.321394 1.8337C-0.365172 1.15702 0.121082 -8.36609e-08 1.09203 0L8.90797 6.7345e-07C9.87892 7.57111e-07 10.3652 1.15702 9.67861 1.8337Z"
                  />
                </svg>
              </div>
            </div>
            <div style="user-select: none">.</div>
            <div class="list" v-if="user" :class="{ active: activeSelect }">
              <div
                class="li"
                v-for="category in user.category"
                :key="category"
                @click="currentCategory = category"
              >
                {{ category.title }}
              </div>
            </div>
          </div>
          <div>
            <button class="mbtn mt-3" @click="addTask">добавить</button>
          </div>
        </div>
        <TaskBlock :key="1" />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="sass">

.plus, .minus
  margin-bottom: 10px
  cursor: pointer
  border-radius: 100px
  width: 30px
  height: 30px
  background: #1c1c1c
  border: 2px solid #1c1c1c
  display: flex
  justify-content: center
  align-items: center
  transition: .4s
  &::after
    content: '+'
    color: #fff
    font-size: 36px
    height: 16px
    display: flex
    justify-content: center
    align-items: center
    transition: .4s
  &:hover
    background: #fff
    &::after
      color: #1c1c1c

.minus
  &::after
    content: '-'

.select
  position: absolute
  z-index: 100
  position: absolute
  width: 100%
  background: var(--back-main)
  border-radius: 8px
  display: flex
  padding: 4px 10px
  transition: .3s
  cursor: pointer
  align-items: center
  justify-content: space-between
  svg
    width: 10px
    height: 8px
    fill: var(--color)
  &.active
     border-radius: 8px 10px 0 0

.list
  position: absolute
  z-index: 100
  width: 100%
  cursor: pointer
  background: var(--back-main)
  padding: 4px
  border-radius: 0 0 8px 8px
  visibility: hidden
  opacity: 0
  transition: .2s
  .li
    cursor: pointer
    padding: 2px 6px
    border-radius: 8px
    &:hover
      background: var(--back-second)
  &.active
    visibility: visible
    transition: .3s
    opacity: 1

.form__warning
  box-shadow: 0 0 8px 2px #fff
  transition: .3s


.flip-leave-active
  position: absolute
  max-width: 534px
  width: 95%
  opacity: 0
  transition: .4s ease

.flip-enter-active,
.flip-move
  transition: .4s ease

.flip-enter-from,
.flip-leave-to
  opacity: 0
  transition: .3s ease
  transform: scale(0.2)

.fade-enter-active,
.fade-leave-active
  transition: 0.3s ease


.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
