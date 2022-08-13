<template>
  <div class="flex flex-column relative">
    <div class="popup" :class="{ active: isOpen }">
      <button class="cbtn" @click="deleteHandler(id)">удалить</button>
      <button class="cbtn" @click="change(item)" v-if="change">изменить</button>
    </div>
    <div class="dots__wrapper">
      <div
        class="flex flex-col gap-y-0.5 items-center w-4 cursor-pointer"
        @click="isOpen = !isOpen"
        ref="popupRef"
      >
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isOpen = ref(false)
const popupRef = ref(null)

defineProps(['deleteHandler', 'id', 'change', 'item'])

onClickOutside(popupRef, () => (isOpen.value = false))
</script>

<style scoped lang="sass">
.popup
  position: absolute
  border: 2px solid var(--back-main)
  border-radius: 8px
  background: var(--back-second)
  right: 20px
  top: 0
  visibility: hidden
  opacity: 0
  transition: .2s
  &.active
    opacity: 1
    visibility: visible

.dot
  border: 2px solid var(--color)
  color: black
  border-radius: 50px

.dots__wrapper
  display: flex
  align-items: center
  border-radius: 4px
  transition: .4s
  &:hover
    background: var(--back-second)
</style>
