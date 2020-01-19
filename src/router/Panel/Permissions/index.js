export default [
  {
    path: 'permissions',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: '',
        name: 'Permissions',
        component: () => import('@/views/Panel/User/Edit'),
        meta: {
          title: 'Ubah profile'
        }
      },
    ]
  }
]