export default [
  {
    path: 'nilai',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: 'pendaftaran',
        name: 'NilaiListsPendaftaran',
        component: () => import('@/views/Panel/Nilai/Pendaftaran'),
        meta: {
          title: 'Lihat Daftar Nilai'
        }
      },
      {
        path: 'lists/:pendaftaran_id',
        name: 'NilaiLists',
        component: () => import('@/views/Panel/Nilai/Lists'),
        meta: {
          title: 'Lihat Daftar Nilai'
        }
      },
      {
        path: ':id/edit',
        name: 'NilaiEdit',
        component: () => import('@/views/Panel/Nilai/Kelola'),
        meta: {
          title: 'Ubah Nilai Peserta'
        }
      },

    ]
  }
]