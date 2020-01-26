<template>
  <v-app> 
    <v-container fluid>
      <v-row>
          <v-col
            v-for="(item, index) in fast_buttons" v-bind:key="index"
            cols="12"
            md="3"
          >
            <v-card  :color="item.color" :to="{name: item.to }" dark>
              <v-card-title>
                <v-icon left>{{ item.icon }}</v-icon>
                <span class="title font-weight-light">{{ item.title }}</span>
              </v-card-title>
              <v-card-subtitle>
                  {{ item.pesan }}
              </v-card-subtitle>
            </v-card>
          </v-col>
      </v-row>
      <v-row>
        <v-col
          md="6"
          cols="12"
        >
          <v-card color="blue-grey darken-1" dark>
            <v-card-title>
              <v-icon>mdi-home</v-icon>
              <span class="title font-weight-light">Beranda</span>
            </v-card-title>
            <v-card-text align="center">
              <div>
                <v-avatar size="80">
                  <v-img :src="$config.base_url + $user.data.img"></v-img>
                </v-avatar>
              </div>
              <div class="mt-2">
                <strong>Hai {{ $user.data.name }}</strong>
              </div>
            </v-card-text>
            <v-card-text>
              Selamat datang di Halaman Beranda, tarik dari kiri layar ke kanan atau tekan logo <v-btn class="success" icon><v-icon small>mdi-menu</v-icon></v-btn> atau gunakan fitur cepat untuk memulai aktivtas anda
            </v-card-text>
            <v-card-text align="center">
              <span class="font-weight-light">&copy; 2020 {{ $config.school }}</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    },
    computed: {
      fast_buttons: function () {
        let data = [];
        if (this.$roles.has('ppdb')) {
          data.push({
            role: 'ppdb',
            to: 'PesertaListsPendaftaran',
            color: 'blue-grey lighten-2',
            icon: 'mdi-account-group',
            title: 'Peserta',
            pesan: 'Tambah, Kelola Peserta Pendaftaran'
          });
        }  

        if (this.$roles.has('du')) {
          data.push({
            role: 'du',
            to: 'PembayaranDaftarUlang',
            color: 'indigo lighten-1',
            icon: 'mdi-account-cash-outline',
            title: 'Pembayaran',
            pesan: 'Kelola Pembayaran Daftar Ulang'
          });
        }
        
        if (this.$roles.has('ppdb')) {
          data.push({
            role: 'ppdb',
            to: 'ReportsPendaftaran',
            color: 'blue lighten-1',
            icon: 'mdi-chart-bar',
            title: 'Informasi PPDB',
            pesan: 'Lihat Informasi Akhir Pendaftaran'
          });
        }

        if (this.$roles.has('du')) {
          data.push({
            role: 'du',
            to: 'ReportsDaftarUlang',
            color: 'green lighten-1',
            icon: 'mdi-chart-bar',
            title: 'Informasi DU',
            pesan: 'Lihat Informasi Akhir Daftar Ulang'
          });
        }

        if (this.$roles.has('ppdb')) {
          data.push({
            role: 'ppdb',
            to: 'RiwayatPendaftaran',
            color: 'deep-purple lighten-1',
            icon: 'mdi-timeline-text-outline',
            title: 'Riwayat PPDB',
            pesan: 'Lihat Riwayat Pendaftaran Peserta'
          });
        }

        if (this.$roles.has('du')) {
          data.push({
            role: 'du',
            to: 'RiwayatPembayaran',
            color: 'teal lighten-1',
            icon: 'mdi-timeline-text-outline',
            title: 'Riwayat DU',
            pesan: 'Lihat Riwayat Pembayaran Daftar Ulang'
          });
        }

        if (this.$roles.has('ppdb')) {
          data.push({
            role: 'ppdb',
            to: 'ExportPendaftaran',
            color: 'deep-purple lighten-1',
            icon: 'mdi-cloud-download',
            title: 'Export Data PPDB',
            pesan: 'Download Database Peserta PPDB'
          });
        }

        if (this.$roles.has('du')) {
          data.push({
            role: 'du',
            to: 'ExportPembayaran',
            color: 'teal lighten-1',
            icon: 'mdi-cloud-download',
            title: 'Export Data DU',
            pesan: 'Download Database Daftar Ulang'
          });
        }

        return data; 
      }
    }
  }
</script>