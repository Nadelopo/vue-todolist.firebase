import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase'
import '@/firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home'),
  },
  {
    path: '/auth',
    name: 'Auth',
    meta: { auth: true },
    component: () => import('../views/Auth'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/components/404'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => !record.meta.auth)
  if (requireAuth && !(await firebase.getCurrentUser())) {
    next('/auth')
  } else {
    next()
  }
})

export default router
