export default [
  {
    path: 'pengumuman',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: '/input/kode',
        name: 'PengumumanInputKode',
        component: () => import('@/views/Panel/Pengumuman/InputKode'),
        meta: {
          title: 'Masukan No. Pendaftaran'
        }
      },
    ]
  }
]