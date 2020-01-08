import Vue from 'vue'
import VueRouter from 'vue-router'
import _auth from '@/plugins/auth'
import Panel from './Panel'
// import Store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    beforeEnter: (to, from, next) => {
      if (_auth.status) {
        next({
          replace: true,
          name: 'Dashboard'
        })
      }  else {
        next(true);
      }
    },

    meta: {
      title: 'Halaman Masuk'
    }

  },
  Panel, 
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
