<template>
  <v-app> 
    <v-container fluid>
      <v-row>
        <v-col
          md="5"
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
      <v-row>
        <v-col
          md="3"        
        >
          <v-card  v-for="(item, index) in fast_buttons" v-bind:key="index" :color="item.color" :to="{name: item.to }" replace dark>
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
    </v-container>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        fast_buttons: [
          {
            to: 'PesertaListsPendaftaran',
            color: 'blue-grey lighten-2',
            icon: 'mdi-account-group',
            title: 'Peserta',
            pesan: 'Tambah, Kelola Peserta Pendaftaran'
          }
        ]
      }
    }
  }
</script>