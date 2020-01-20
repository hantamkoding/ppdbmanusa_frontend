export default [
  {
    path: 'reports',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: 'pendaftaran',
        name: 'ReportsPendaftaran',
        component: () => import('@/views/Panel/Reports/Pendaftaran'),
        meta: {
          title: 'Informasi PPDB'
        }
      },
      {
        path: 'du',
        name: 'ReportsDaftarUlang',
        component: () => import('@/views/Panel/Reports/DaftarUlang'),
        meta: {
          title: 'Informasi Daftar Ulang'
        }
      },
    ]
  }
]