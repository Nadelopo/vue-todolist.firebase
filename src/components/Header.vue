<script setup lang="ts">
import 'firebase/auth'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import Settings from '@/components/Settings.vue'
import { ref, inject } from 'vue'
import { firebaseApp } from '@/firebase'
import { setOpenKey } from '../symbols'

const router = useRouter()

const logout = () => {
  firebaseApp
    .auth()
    .signOut()
    .then(
      () => {
        router.push({ name: 'Auth' })
        Swal.fire('Вы вышли с аккаунта', '', 'success')
      },
      (err: Error) => {
        console.log(err)
      }
    )
}

const setOpen = inject(setOpenKey, () => null)

const openSettings = ref(false)
const openSettingsHandler = (): void => {
  openSettings.value = true
  setOpen(false)
}

const setOpenSettings = (): void => {
  openSettings.value = false
}
</script>

<template>
  <div class="mb-8 pt-10" v-if="$route.name !== 'Auth'">
    <div class="container">
      <div class="header">
        <div>
          <button class="cbtn" @click="logout">выйти</button>
        </div>
        <div>
          <router-link :to="{ name: 'Profile' }">
            <button class="cbtn">профиль</button>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'Home' }">
            <button class="cbtn">задачи</button>
          </router-link>
        </div>
        <svg
          @click="openSettingsHandler"
          xmlns="http://www.w3.org/2000/svg"
          class="bi bi-gear-fill settings"
          viewBox="0 0 16 16"
        >
          <path
            d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
          />
        </svg>
      </div>
    </div>
  </div>
  <transition name="settings">
    <Settings v-if="openSettings" :set-open-settings="setOpenSettings" />
  </transition>
</template>

<style scoped lang="sass">
.theme, .settings
  margin-left: auto
  cursor: pointer
  height: 22px
  width: 20px
  transition: .3s
  fill: var(--color)
  &:hover
    transform: rotate(180deg) scale(1.1)

.header
  display: flex
  gap: 10px


.settings-enter-active,
.settings-leave-active
  transition: opacity 0.4s ease


.settings-enter-from,
.settings-leave-to
  opacity: 0
</style>
