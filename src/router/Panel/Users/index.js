import { _roles } from '@/plugins/permissions'
export default [
  {
    path: 'users',
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
        path: '',
        name: 'Users',
        component: () => import('@/views/Panel/Users'),
        meta: {
          title: 'Daftar Pengguna'
        }
      },
      {
        path: 'add',
        name: 'addUsers',
        component: () => import('@/views/Panel/Users/Kelola'),
        meta: {
          title: 'Tambah Pengguna'
        }
      },
      {
        path: ':user_id/edit',
        name: 'editUsers',
        component: () => import('@/views/Panel/Users/Kelola'),
        meta: {
          title: 'Ubah Pengguna'
        }
      },
    ]
  }
]