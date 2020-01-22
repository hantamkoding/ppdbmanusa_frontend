import { _roles } from '@/plugins/permissions'
export default [
  {
    path: 'pendaftaran',
    component: () => import('@/layouts/BlankRouter'),
    beforeEnter: (to, from, next) => {
      if (_roles.has('root')) {
        next(true);
      }  else {
        next({
          replace: true,
          name: 'Dashboard'
        })
      }
    },

    children: [
      {
        path: '/',
        name: 'Pendaftaran',
        component: () => import('@/views/Panel/Pendaftaran/Index'),
        meta: {
          title: 'Daftar Pendaftaran'
        }
      },
      {
        path: 'add',
        name: 'PendaftaranAdd',
        component: () => import('@/views/Panel/Pendaftaran/Kelola'),
        meta: {
          title: 'Tambah Pendaftaran'
        }
      },
      {
        path: 'edit/:id',
        name: 'PendaftaranEdit',
        component: () => import('@/views/Panel/Pendaftaran/Kelola'),
        meta: {
          title: 'Ubah Pendaftaran'
        }
      },
    ]
  }
]