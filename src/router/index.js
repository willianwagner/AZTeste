import { createRouter, createWebHistory } from 'vue-router'


import AuthLayout from '@/layouts/auth/AuthLayout'

import NotFound from '@/views/NotFound'

import store from '@/store/index'

const routes = [
  {
    path: '/',
    name: 'Bem Vindo',
    component: AuthLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        component: () => import('@/views/auth/HomeAuth.vue')
      },
      {
        path: 'candidatos',
        name:'Listagem de Candidatos',
        component: () => import('@/views/auth/candidatos/IndexCandidatos.vue')
      }

    ]

  },

  

  {
    path: '/login',
    name: 'login',
    meta: { guest: true },
    component: () => import('@/views/LoginForm.vue')
    
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