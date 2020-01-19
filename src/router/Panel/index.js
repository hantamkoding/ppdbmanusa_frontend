import User from './User'
import Users from './Users'
import Permissions from './Permissions'
import Pendaftaran from './Pendaftaran'
import Peserta from './Peserta'
import Pengumuman from './Pengumuman'
import Nilai from './Nilai'
import Du from './Du'
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
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/views/Print'),
        meta: {
          title: 'Cetak / Download Document'
        }
      },
      ...User,
      ...Users,
      ...Permissions,
      ...Pendaftaran,
      ...Peserta,
      ...Pengumuman,
      ...Nilai,
      ...Du,
    ]
}