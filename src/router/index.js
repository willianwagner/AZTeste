import { createRouter, createWebHistory } from 'vue-router'


//import store from '@/store/index'

import AuthLayout from '@/layouts/auth/AuthLayout'
import GuestLayout from '@/layouts/guest/GuestLayout'
import LoginForm from '@/components/LoginForm'
import AboutAuth from '@/views/auth/AboutAuth.vue'
import HomeAuth from '@/views/auth/HomeAuth.vue'


// Lets create default route, to default layout
const defaultRoute = [
  {
    path: '/painel',
    name: 'painel',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: HomeAuth,
      },
      {
        path: 'about',
        component: AboutAuth
      }

    ]

  },

  {
    path: '/',
    name: 'login',
    component: GuestLayout,
    children: [
      {
        path: '',
        component: LoginForm,
      },
    

    ]
  },
]

console.log(defaultRoute);
const routes = defaultRoute

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router

/* 

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.getters.isAuth ) {
    
      next({
        path: '/',
       
      })
    } else {
      next()
    }
  } else {
    next()
  }
}) */