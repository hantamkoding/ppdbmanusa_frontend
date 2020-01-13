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
        path: 'lists/:pendaftaran_id',
        name: 'PesertaLists',
        component: () => import('@/views/Panel/Peserta/Lists'),
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
        path: 'register/:pendaftaran_id',
        name: 'PesertaRegister',
        component: () => import('@/views/Panel/Peserta/Register'),
        meta: {
          title: 'Formulir Pendaftaran'
        }
      },
      {
        path: ':id/detail',
        name: 'PesertaDetail',
        component: () => import('@/views/Panel/Peserta/Register'),
        meta: {
          title: 'Formulir Pendaftaran'
        }
      },
      {
        path: ':id/print/pendaftaran',
        name: 'PesertaPrintPendaftaran',
        component: () => import('@/views/Panel/Peserta/Print/Pendaftaran'),
        meta: {
          title: 'Print Pendaftaran'
        }
      },
      {
        path: ':id/pindah',
        name: 'PesertaPindahJurusan',
        component: () => import('@/views/Panel/Peserta/PindahJurusan'),
        meta: {
          title: 'Pindah Jurusan'
        }
      },
    ]
  }
]