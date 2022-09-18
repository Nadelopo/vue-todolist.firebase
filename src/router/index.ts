import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/app'
import '@/firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { auth: true },
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/components/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => !record.meta.auth)
  //@ts-ignore
  if (requireAuth && !(await firebase.getCurrentUser())) {
    next('/auth')
  } else {
    next()
  }
})

export default router
