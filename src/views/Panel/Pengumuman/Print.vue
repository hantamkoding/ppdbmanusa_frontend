<template>
  <print-layout>
    <template slot="printBody">
        <div v-if="peserta">
          <section>
            <img style="width: 100%" :src="$config.base_url + 'assets/imgs/kop.png'" />
            <small class="pull-right">Tgl. & Waktu: {{ $moment().format('dddd DD MMMM YYYY') }} </small>
            <center>
              <h4 class="page-heade">
                <i class="mdi mdi-icons"></i> Hasil Seleksi {{ peserta.pendaftaran.nama }}
              </h4>
            </center>
            
            <table class="main_table">
              <tr>
                <td style=" vertical-align: top;padding: 5px 10px;">Menimbang</td>
                <td  style=" vertical-align: top;padding: 5px 10px;">:</td>
                <td  style=" vertical-align: top;padding: 5px 10px;">Keputusan Kepala SMK Ma'arif NU 1 Ajibarang tentang proyeksi daya tampung sekolah Tahun Pelajaran 2020/2021</td>
              </tr>
              <tr>
                <td  style=" vertical-align: top;padding: 5px 10px;">Mengingat</td>
                <td style=" vertical-align: top;padding: 5px 10px;">:</td>
                <td style=" vertical-align: top;padding: 5px 10px;">Hasil seleksi Administrasi, Nilai Raport Mapel UN, Tes Wawancara dan Kesehatan serta Prestasi PPD SMK Ma'arif NU 1 Ajibarang Tahun Pelajaran 2020/2021</td>
              </tr>
              <tr>
                <td style=" vertical-align: top;padding: 5px 10px;">
                  Menetapkan 
                </td>
                <td style=" vertical-align: top;padding: 5px 10px;">:</td>
                <td style=" vertical-align: top;padding: 5px 10px;">
                  <ol style="padding: 5px; margin: 0;">
                    <li>
                        <table>
                          <tbody>
                          <tr>
                            <td>Nama</td>
                            <td style="width: 70%">: {{ peserta.nama }}</td>
                          </tr>
                          <tr>
                            <td>No. Pendaftran</td>
                            <td>: {{ peserta.no_pendaftaran }}</td>
                          </tr>
                          <tr>
                            <td>Jurusan</td>
                            <td>: ({{ peserta.jurusan.kode }}) {{ peserta.jurusan.nama }}</td>
                          </tr>
                          <tr>
                            <td>Dinyatakan</td>
                            <td>: </td>
                          </tr>
                          </tbody>
                        </table>
                         <div>
                              <table border="1" style="width: 70%;">
                                  <tr>
                                  <td style="padding:5px  20px; text-align: left;">
                                    <h1 style="margin: 2px;text-align: center;">
                                      <span v-if="peserta.hasil" style='color:green'><b>DITERIMA</b></span>
                                      <span v-else style='color:red'><b>TIDAK DITERIMA</b></span>
                                   </h1>
                                 </td>
                                </tr>
                              </table>
                         </div>
                    </li>
                    <li>
                      Bagi calon peserta didik yang dinyatakan <b>Diterima</b>, wajib mendaftar ulang dengan jangka waktu 10 hari setelah pengumuman dengan ketentuan pembayaran sebagaimana terlampir.
                    </li>
                    <li>
                      Seluruh calon peserta didik yang sudah mendaftar ulang wajib hadir di SMK Ma'arif NU 1 Ajibarang pada hari <b>Sabtu,</b> Tanggal <b>11 Juli 2020</b> Pukul 08.00 WIB dengan memakai seragam OSIS SMP/MTs.
                    </li>
                    <li>
                      Bagi peserta didik yang <b>TIDAK MENDAFTAR ULANG dan tidak ada keterangan</b> maka surat keputusan ini ditunda mengacu pada kouta yang tersedia.
                    </li>
                    <li>Jika dikemudian hari terdapat kekeliruan dalam keputusan ini akan segera ditinjau kembali untuk diadakan pembetulan sebagaimana mestinya.</li>
                    <li>
                      <table style="width: auto">
                        <tr>
                          <td style="padding: 10px 0;">Informasi Panitia :
                          </td>
                          <td style="padding: 0 10px"><b>Safienti RA, S. Pd</b></td>
                          <td><b>0812 2777 3429</b></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td style="padding: 0 10px"><b>Qorry Debby Ismayati, S. Pd</b></td>
                          <td><b>0853 2705 2525</b></td>
                        </tr>
                      </table>
                    </li>
                  </ol>
                </td>
              </tr>
            </table>
            <table style="padding: 0;margin: 0">
              <tr>
                <td style="width: 50%;"></td>
                <td style="width: 50%;">
                  <table style="width: 100%">
                    <tr>
                      <td>Ditetapkan di</td>
                      <td style="width: 70%">: Ajibarang</td>
                    </tr>
                    <tr>
                      <td>Pada Hari & tanggal </td>
                      <td>: {{ $moment().format('dddd DD MMMM YYYY') }}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="width: 50%; text-align: center;">
                  Mengetahui<br>Kepala SMK Ma'arif NU 1 Ajibarang
                </td>
                <td style="width: 50%; text-align: center;">Ketua  Panitia PPD</td>
              </tr>
              <tr>
                <td style="text-align: center;">
                  <img :src="$config.base_url + 'assets/imgs/ttd_kepsek.png'" style="width: 150px;">
                </td>
                <td style="text-align: center;">
                  <img :src="$config.base_url + 'assets/imgs/ttd_panitia.png'" style="width: 150px;">
                </td>
              </tr>
              <tr>
                <td style="text-align: center;"><b>Zaenudin, SPd., M.Si</b></td>
                <td style="text-align: center;"><b>Mugi Heriyadi, S.Pd</b></td>
              </tr>
            </table>
              
          </section>
        </div>
    </template>
  </print-layout>
</template>
<script>
  import PrintLayout from '@/layouts/Print'
  export default {
    components: {
      PrintLayout
    },
    data () {
      return {
        peserta_id: this.$route.params.id,
        peserta: null,
      }
    },
    methods: {
      getPeserta: function () {
        this.axios.get('pengumuman/show/' + this.peserta_id).then((d) => {
          window.console.log(d);
          this.peserta = d.data;
        });
      }
    },
    created () {
      this.getPeserta();
    }
  }
</script>
<style>
  .print {
    
  }
</style>