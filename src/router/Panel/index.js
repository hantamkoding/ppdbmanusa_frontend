import User from './User'
import Pendaftaran from './Pendaftaran'
import Peserta from './Peserta'
import Pengumuman from './Pengumuman'
import _auth from '@/plugins/auth'
export default {
    path: '/panel',
    name: 'Panel',
    component: () => import('@/layouts/Admin'),
    beforeEnter: (to, from, next) => {
      if (_auth && _auth.status) {
        next(true);
      }  else {
        next({
          replace: true,
          name: 'Login'
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
        component: () => import('@/views/Panel/Dashboard'),
        meta: {
          title: 'Halaman Beranda'
        }
      },
      ...User,
      ...Pendaftaran,
      ...Peserta,
      ...Pengumuman,
    ]
}