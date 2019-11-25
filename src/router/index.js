import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Halaman Beranda'
    },
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
