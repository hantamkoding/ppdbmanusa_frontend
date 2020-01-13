export default [
  {
    path: 'user',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: 'edit',
        name: 'userEdit',
        component: () => import('@/views/Panel/User/Edit'),
        meta: {
          title: 'Ubah profile'
        }
      },
      {
        path: 'photo',
        name: 'userPhoto',
        component: () => import('@/views/Panel/User/Photo'),
        meta: {
          title: 'Ubah Foto profile'
        }
      },
      {
        path: 'password',
        name: 'userPassword',
        component: () => import('@/views/Panel/User/Password'),
        meta: {
          title: 'Ubah Password'
        }
      },
    ]
  }
]