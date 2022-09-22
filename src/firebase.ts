import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'
import { ref, onUnmounted } from 'vue'
import { TCategory, Ttask } from './types/tasks'

const config = {
  apiKey: 'AIzaSyDXEcmeruwzWBnoBO9OG5GyzjRIAfFYcgs',
  authDomain: 'todolist-da179.firebaseapp.com',
  projectId: 'todolist-da179',
  storageBucket: 'todolist-da179.appspot.com',
  messagingSenderId: '423116382110',
  appId: '1:423116382110:web:aa47462beee44de3fd408f',
  measurementId: 'G-20BRHWJQ5L',
}
//@ts-ignore
firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}

export const firebaseApp = firebase.initializeApp(config)
export const analytics = firebase.analytics(firebaseApp)

export const db = firebaseApp.firestore()

export const usersCollection = db.collection('users')

export const getUser = async (id: string) => {
  const User = await usersCollection.doc(id).get()
  return User.exists ? User.data() : null
}

export const updateTask = (id: string, task: Ttask[]) => {
  return usersCollection.doc(id).update({ tasks: task })
}

export const updateCategory = (id: string, updateCategory: TCategory[]) => {
  return usersCollection.doc(id).update({ category: updateCategory })
}
