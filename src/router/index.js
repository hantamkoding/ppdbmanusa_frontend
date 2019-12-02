import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import '@/plugins/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    meta: {
      title: 'Halaman Masuk'
    }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('@/layouts/Admin'),
    beforeEnter: (to, from, next) => {
      if (Vue.$auth.status) {
        next(true);
      }  else {
        next({
          replace: true,
          name: 'login'
        })
      }
    },
    meta: {
      title: 'AdminPanel'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/404'),
        meta: {
          title: 'Halaman Beranda'
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
    meta: {
      title: 'Yang anda cari tidak ditemukan'
    }
  },
  
]



const router = new VueRouter({
  routes
})

export default router
