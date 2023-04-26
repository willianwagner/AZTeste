import { createRouter, createWebHistory } from 'vue-router'


import AuthLayout from '@/layouts/auth/AuthLayout'
import GuestLayout from '@/layouts/guest/GuestLayout'
import LoginForm from '@/views/LoginForm'
import NotFound from '@/views/NotFound'
import AboutAuth from '@/views/auth/AboutAuth.vue'

import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'painel',
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('@/views/auth/HomeAuth.vue')
      },
      {
        path: 'about',
        component: AboutAuth
      }

    ]

  },

  {
    path: '/login',
    name: 'login',
    meta: { guest: true },
    component: GuestLayout,
    children: [
      {
        path: '',
        component: LoginForm,
      },
    

    ]
  },

  {    
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]




const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (store.getters.isAuth ) {
      next()
      return
    }

    next('/login')
  } else if (to.matched.some(record => record.meta.guest)) {
    if (store.getters.isAuth ) {
      next('/')
      return
    }
    next()
  }else {
    next()
  }
})