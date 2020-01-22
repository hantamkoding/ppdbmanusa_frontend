import { _roles } from '@/plugins/permissions'
export default [
  {
    path: 'rincian_du',
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
        path: 'list',
        name: 'RincianDaftarUlangLists',
        component: () => import('@/views/Panel/DaftarUlang'),
        meta: {
          title: 'Daftar Biaya / rincian daftar ulang'
        },
      },
      {
        path: 'add',
        name: 'RincianDaftarUlangAdd',
        component: () => import('@/views/Panel/DaftarUlang/Kelola'),
        meta: {
          title: 'Tambah Biaya / rincian daftar ulang'
        }
      },
      {
        path: ':id/edit',
        name: 'RincianDaftarUlangEdit',
        component: () => import('@/views/Panel/DaftarUlang/Kelola'),
        meta: {
          title: 'Ubah Biaya / rincian daftar ulang'
        }
      },
    ]
  },
  {
    path: 'pembayaran_du',
    component: () => import('@/layouts/BlankRouter'),

    beforeEnter: (to, from, next) => {
      if (_roles.has('du')) {
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
        name: 'PembayaranDaftarUlang',
        component: () => import('@/views/Panel/Pembayaran/InputKode'),
        meta: {
          title: 'Masukan No. Pendaftaran Peserta'
        }
      },
      {
        path: 'kelola/:peserta_id',
        name: 'PembayaranDaftarUlangKelola',
        component: () => import('@/views/Panel/Pembayaran/Kelola'),
        meta: {
          title: 'Kelola Pembayaran daftar ulang'
        }
      },
    ]
  }
]