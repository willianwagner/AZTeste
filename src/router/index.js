import { createRouter, createWebHistory } from 'vue-router'

import LoginForm from '@/components/LoginForm'
import NotFound from '@/components/NotFound'
import store from '@/store/index'



const routes = [
  
  {
    path: '/',
    name: 'login',
    component: LoginForm
  },


  {
    path: '/home',
    name: 'home',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    // Rota curinga - deve estar no final do array de rotas
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
})