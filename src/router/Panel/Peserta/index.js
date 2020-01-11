export default [
  {
    path: 'peserta',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: '/',
        name: 'PesertaListsPendaftaran',
        component: () => import('@/views/Panel/Peserta/Pendaftaran'),
        meta: {
          title: 'Pilih Daftar Pendaftarans'
        }
      },
      {
        path: '/',
        name: 'PesertaLists',
        component: () => import('@/views/Panel/Peserta/Pendaftaran'),
        meta: {
          title: 'Pilih Daftar Pendaftarans'
        }
      },
      {
        path: ':id/add',
        name: 'PesertaAdd',
        component: () => import('@/views/Panel/Peserta/Kelola'),
        meta: {
          title: 'Pilih Daftar Pendaftarans'
        }
      },
      {
        path: ':id/register',
        name: 'PesertaRegister',
        component: () => import('@/views/Panel/Peserta/Register'),
        meta: {
          title: 'Formulir Pendaftaran'
        }
      },
    ]
  }
]