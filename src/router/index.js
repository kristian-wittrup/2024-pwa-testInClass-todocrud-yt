import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
 
    {
      path: '/todos',
      name: 'todos',
      component: () => import(/* webpackChunkName: "about" */ '../views/TodosView.vue'),
    },
    {
      path: '/todo/:id',
      name: 'todo single',
      component: () => import(/* webpackChunkName: "about" */ '../views/TodoDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { 
        requiresAuth: true 
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  console.log("is auth", isAuthenticated)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log("requires auth", requiresAuth)
  if(!isAuthenticated && requiresAuth)
  {
    next('/')
  }
  else
  {
    next()
  }
})

export default router