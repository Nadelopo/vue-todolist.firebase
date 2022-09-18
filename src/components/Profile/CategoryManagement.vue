<script setup lang="ts">
import { useLoadUsers } from '@/store/Users'
import { ref, watch, nextTick } from 'vue'
import Popup from '../UI/Popup.vue'
import { updateCategory, getUser } from '@/firebase'
import Swal from 'sweetalert2'
import { TCategory } from '@/types/tasks'

const { getCurrentUserId, updateUserData } = useLoadUsers()

const userId = ref('')
const user = ref()
const changeCategories = ref<TCategory[]>(user.value?.category || [])

//
const isLoad = ref(false)
;(async () => {
  userId.value = await getCurrentUserId()
  user.value = await getUser(userId.value)
  changeCategories.value = user.value.category
  isLoad.value = true
})()

//
const inputsRef = ref<HTMLInputElement[]>([])
watch(
  () => inputsRef.value,
  () => {
    inputsRef.value[0].focus()
  }
)

//
const openInput = ref(false)
const newCategory = ref('')
const editCategory = async () => {
  if (!openInput.value) {
    Swal.fire('Данные изменены', '', 'success')
    updateCategory(userId.value, changeCategories.value)
    user.value = await getUser(userId.value)
    updateUserData()
  } else {
    if (!newCategory.value) {
      Swal.fire('Заполните данные', '', 'warning')
    } else {
      updateCategory(userId.value, [
        ...changeCategories.value,
        ...[{ id: changeCategories.value.length, title: newCategory.value }],
      ])
      user.value = await getUser(userId.value)
      changeCategories.value = user.value.category
      newCategory.value = ''
      openInput.value = false
      updateUserData()
    }
  }
}

//
const deleteCategory = async (categoryId: number) => {
  updateCategory(
    userId.value,
    changeCategories.value.filter((e) => e.id != categoryId)
  )
  user.value = await getUser(userId.value)
  changeCategories.value = user.value.category
}
</script>

<template>
  <div>
    <div class="font-medium text-lg mb-4">Управление категориями</div>
    <div class="wrapper">
      <div class="flex flex-col gap-y-4" v-if="isLoad">
        <div
          v-for="(category, index) in user.category"
          :key="category.id"
          class="category"
        >
          <input
            type="text"
            ref="inputsRef"
            class="shadow__none"
            v-model="changeCategories[index].title"
          />
          <Popup :delete-handler="deleteCategory" :id="category.id" />
        </div>
      </div>
      <div v-if="openInput">
        <input type="text" class="mt-6" v-model="newCategory" />
      </div>

      <button class="mbtn mt-6" @click="openInput = true">
        добавить категорию
      </button>
      <button class="mbtn mt-6" @click="editCategory">сохранить</button>
    </div>
  </div>
</template>

<style scoped lang="sass">

.category
  background: var(--back-main)
  border-radius: 8px
  padding: 2px 8px
  display: flex
  justify-content: space-between

.shadow__none
  &:focus, &:hover
    box-shadow: none
</style>
