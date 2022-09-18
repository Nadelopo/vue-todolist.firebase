import { defineStore } from 'pinia'
import firebase from 'firebase/app'
import { ref } from 'vue'
import { getUser } from '@/firebase'

export const useLoadUsers = defineStore('users', {
  state: () => {
    const userId = ref()
    const user = ref()
    firebase.auth().onAuthStateChanged(async function (use) {
      if (use) {
        userId.value = use.uid
        user.value = await getUser(use.uid)
      } else {
        userId.value = null
        user.value = null
      }
    })

    return { userId, user }
  },
  actions: {
    async getCurrentUserId() {
      //@ts-ignore
      const user = await firebase.getCurrentUser()
      return user.uid
    },
    async updateUserData() {
      //@ts-ignores
      this.user = await getUser((await firebase.getCurrentUser()).uid)
    },
  },
})
