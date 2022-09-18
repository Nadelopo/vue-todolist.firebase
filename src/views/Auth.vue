<script setup lang="ts">
import { ref, onMounted } from 'vue'
import firebase from 'firebase/app'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
//@ts-ignore
import { db } from '@/firebase'

const email = ref('')
const password = ref('')
const change = ref(true)
const router = useRouter()

const choiceAuth = () => (change.value ? login() : reg())

const reg = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((user) => {
      db.collection('users').doc(user?.user?.uid).set({
        totalTasskFinished: 0,
        totalTasks: 0,
        avgTimeCosts: 0,
        category: [],
        tasks: [],
      }),
        router.push({ name: 'Home' })
    })
    .catch((err) => {
      if (err.code == 'auth/weak-password') {
        Swal.fire({
          icon: 'warning',
          title: 'Пароль должен состоять не менее чем из 6 символов',
        })
      } else if (err.code == 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'warning',
          title: 'Адрес электронной почты уже используется',
        })
      }
    })
}

const login = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      router.push({ name: 'Home' })
    })
    .catch(() => {
      Swal.fire('Неверное имя пользователя или пароль', '', 'error')
    })
  console.log('success')
}

const loginRef = ref<HTMLInputElement>()
onMounted(() => loginRef.value?.focus())
</script>

<template>
  <div class="main">
    <div class="login__wrapper">
      <div class="flex justify-between">
        <div>
          <button class="mbtn mb-6" @click="change = true">войти</button>
        </div>
        <div>
          <button class="mbtn" @click="change = false">
            зарегестрироваться
          </button>
        </div>
      </div>
      <form @submit.prevent="choiceAuth">
        <div class="mb-4">
          <input
            type="email"
            class=""
            ref="loginRef"
            placeholder="почта"
            v-model="email"
            required
          />
        </div>
        <div class="mb-6">
          <input
            type="password"
            class=""
            placeholder="пароль"
            v-model="password"
            required
          />
        </div>
        <div>
          <button class="mbtn">
            {{ change ? 'войти' : 'зарегестрироваться' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="sass">

.main
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

.login__wrapper
  width: 100%
  max-width: 280px
  background: var(--back-second)
  border-radius: 8px
  padding: 20px 20px
</style>
