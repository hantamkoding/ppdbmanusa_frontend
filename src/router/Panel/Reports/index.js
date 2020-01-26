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
  },
  {
    path: 'riwayat',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: 'pendaftaran',
        name: 'RiwayatPendaftaran',
        component: () => import('@/views/Panel/Reports/RiwayatPendaftaran'),
        meta: {
          title: 'Riwayat Pendaftaran Peserta'
        }
      },
      {
        path: 'pembayaran',
        name: 'RiwayatPembayaran',
        component: () => import('@/views/Panel/Reports/RiwayatPembayaran'),
        meta: {
          title: 'Riwayat Pembayaran Daftar Ulang'
        }
      },
    ]
  },
  {
    path: 'export',
    component: () => import('@/layouts/BlankRouter'),
    children: [
      {
        path: 'pendaftaran',
        name: 'ExportPendaftaran',
        component: () => import('@/views/Panel/Reports/ExportPendaftaran'),
        meta: {
          title: 'Export  / Download Data Pendaftaran'
        }
      },
      {
        path: 'pembayaran',
        name: 'ExportPembayaran',
        component: () => import('@/views/Panel/Reports/ExportPembayaran'),
        meta: {
          title: 'Export  / Download Data Pembayaran'
        }
      },
    ]
  }
]