import firebase from 'firebase/app'
import 'firebase/analytics'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: 'AIzaSyCc7NQEjl3GtdyYqq11Us0QQuiki4KkDUQ',
  authDomain: 'todolist-da179.firebaseapp.com',
  projectId: 'todolist-da179',
  storageBucket: 'todolist-da179.appspot.com',
  messagingSenderId: '423116382110',
  appId: '1:423116382110:web:85ab6dedd67941befd408f',
  measurementId: 'G-ZD5TS1HVG9',
}

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
const tasks = db.collection('tasks')

export const getTask = async (id) => {
  const products = await tasks.doc(id).get()
  return products.exists ? { id: id, ...products.data() } : null
}

export const deleteTask = (id) => {
  return tasks.doc(id).delete()
}

export const useLoadProducts = () => {
  const prod = ref([])
  const close = tasks.onSnapshot((snapshot) => {
    prod.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return prod
}

export const usersCollection = db.collection('users')

export const getUser = async (id) => {
  const User = await usersCollection.doc(id).get()
  return User.exists ? User.data() : null
}

export const updateTask = (id, task) => {
  return usersCollection.doc(id).update({ tasks: task })
}

export const updateCategory = (id, updateCategory) => {
  return usersCollection.doc(id).update({ category: updateCategory })
}
