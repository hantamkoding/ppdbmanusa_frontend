import { _roles } from '@/plugins/permissions'
export default [
  {
    path: 'pengumuman',
    component: () => import('@/layouts/BlankRouter'),
    beforeEnter: (to, from, next) => {
      if (_roles.has('ppdb')) {
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
        path: 'pendaftaran',
        name: 'PengumumanListsPendaftaran',
        component: () => import('@/views/Panel/Pengumuman/Pendaftaran'),
        meta: {
          title: 'Lihat Daftar Pengumuman'
        }
      },
      {
        path: 'lists/:pendaftaran_id',
        name: 'PengumumanLists',
        component: () => import('@/views/Panel/Pengumuman/Lists'),
        meta: {
          title: 'Lihat Daftar Pengumuman'
        }
      },

      {
        path: 'input/kode',
        name: 'PengumumanInputKode',
        component: () => import('@/views/Panel/Pengumuman/InputKode'),
        meta: {
          title: 'Masukan No. Pendaftaran'
        }
      },

      {
        path: 'print/:id',
        name: 'PengumumanPrint',
        component: () => import('@/views/Panel/Pengumuman/Print'),
        meta: {
          title: 'Print Hasil Seleksi'
        }
      },
    ]
  }
]