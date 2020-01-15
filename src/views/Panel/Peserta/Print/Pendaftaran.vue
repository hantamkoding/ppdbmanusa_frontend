<template>
  <print-layout>
    <template slot="printBody">
        <div v-if="peserta">
          <table class="print">
            <tr>
              <td>Nama</td>
              <td>: <b>{{ peserta.nama }}</b></td>
            </tr>
            <tr>
              <td>No. ID Pendaftaran</td>
              <td>: <b>{{ peserta.no_pendaftaran }}</b></td>
            </tr>
            <tr>
              <td>Asal Sekolah</td>
              <td>: {{ peserta.asal_sekolah.nama }}</td>
            </tr>
            <tr>
              <td>Pilihan Jurusan</td>
              <td>: ({{ peserta.jurusan.kode }}) {{ peserta.jurusan.nama }}</td>
            </tr>
          </table>
          <center>
              <h4 style="text-transform: uppercase;">Bukti Kelengkapan Berkas </h4>
          </center>
          <table border="1" class="berkas" width="100%">
            <thead>
              <tr>
                <th rowspan="2" >No.</th>
                <th rowspan="2" >Berkas</th>
                <th rowspan="2" >Jumlah</th>
                <th colspan="2">Keterangan</th>
              </tr>
              <tr>
                <th>Ada</th>
                <th>Tidak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2"><b>Jalur Peminatan</b></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>1</td>
                <td>FC Ijazah SD</td>
                <td align="center">1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Piagam / Sertifikat (Jika ada)</td>
                <td align="center"></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <table style="width: 100%">
            <tr>
              <td></td>
              <td align="center">Ajibarang, {{ $moment().format('dddd DD MMMM YYYY') }}</td>
            </tr>
            <tr>
              <td align="center" width="50%"  style="vertical-align: top;">
                Petugas Pemeriksa
                <br><br>
                <br><br>
                (........................)
              </td>
              <td align="center" width="50%" style="vertical-align: top;">
                {{ peserta.nama }}
              </td>
            </tr>
          </table>
          <hr style="border: 1px dashed #000;">
          <section>
            <img style="width: 100%" :src="$config.base_url + 'assets/imgs/kop.png'" />
            <small class="pull-right">Tgl. & Waktu: {{ $moment().format('dddd DD MMMM YYYY') }} </small>
            <center>
              <h4 class="page-heade">
                <i class="mdi mdi-icons"></i> BUKTI PENDAFTARAN {{ peserta.pendaftaran.nama }}
              </h4>
            </center>
            
            <p>
              Selamat {{ peserta.nama }}, kamu telah berhasil melakukan registrasi pendaftaran peserta didik online {{ $config.school }}.
            </p>
            <div class="row">
              <div class="col-xs-8">
                <table class="berkas">
                  <tbody>
                      <tr>
                        <td>Nama</td>
                        <td>: <b>{{ peserta.nama }}</b></td>
                      </tr>
                      <tr>
                        <td>No. ID Pendaftaran</td>
                        <td>: <b>{{ peserta.no_pendaftaran }}</b></td>
                      </tr>
                      <tr>
                        <td>NISN</td>
                        <td>: {{ peserta.nisn }}</td>
                      </tr>
                      <tr>
                        <td>Asal Sekolah</td>
                        <td>: {{ peserta.asal_sekolah.nama }}</td>
                      </tr>
                      <tr>
                        <td>TTL</td>
                        <td>: {{ peserta.ttl.tempat }}, {{ $moment(peserta.ttl.tgl).format('DD MMMM YYYY') }}</td>
                      </tr>
                      <tr>
                        <td>Pilihan Jurusan</td>
                        <td>: ({{ peserta.jurusan.kode }}) {{ peserta.jurusan.nama }}</td>
                      </tr>
                    </tbody>
              </table>
            </div>
              <!-- /.col -->
              
              <!-- /.col -->
           </div>
             <p>Segera lakukan <b>pelengkapan berkas pendaftaran  dan mengikuti tahapan seleksi wawancara </b>dengan datang langsung ke <b>{{ $config.school }}.</b><br></p>
            <div class="pull-right" style="">
              <small>Copyright &copy; {{ $moment().format('YYYY') }} PPDB {{ $config.school }}</small>
            </div>       
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
        this.axios.get('peserta/show/' + this.peserta_id).then((d) => {
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