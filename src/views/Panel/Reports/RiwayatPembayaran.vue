<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="12">
        <v-btn @click="getData"></v-btn>
        <v-card>
          <v-card-title>
            Riwayat Pembayaran Daftar Ulang
          </v-card-title>
          <v-card-subtitle>
            Lihat Riwayat pendaftaran peserta di rentang tanggal tertentu
          </v-card-subtitle>
          <v-card-text>
            <v-menu
              v-model="menus.tgl"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="data.tgl"
                  label="Tanggal Lahir"
                  :rules="[$formRules.required]"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker range locale="id"  v-model="data.tgl"></v-date-picker>
            </v-menu>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" v-if="data.riwayat">
        <v-card>
          <v-data-table
            :headers="table.headers"
            :items="data.riwayat.riwayat"
          >

            <template v-slot:item.tgl_bayar="{ item }">
              {{ $moment(item.created_at).format('dddd, DD MMM. YYYY HH:mm') }}
            </template>

            <template v-slot:item.jumlah_rupiah="{ item }">
              {{ item.jumlah | currency }}
            </template>

          </v-data-table>

        </v-card> 
      </v-col>
      <v-col cols="12" md="6" v-if="data.riwayat">
        <v-card v-if="data.riwayat.data_penerimaan">
          <v-card-title>Jumlah Penerimaan Panitia</v-card-title>
          <v-card-text>
            Total: <span class="font-weight-bold">{{ data.riwayat.total_uang | currency }}</span>
          </v-card-text>
        </v-card>
        <v-timeline dense>
          <v-slide-x-reverse-transition
            group
            hide-on-leave
          >
            <v-timeline-item
              v-for="(item, i) in data.riwayat.data_penerimaan"
              :key="i"
              small
              fill-dot
            >
              <v-card>
                <v-card-text>
                  <div><span class="font-weight-bold">{{ item.jumlah | currency }}</span></div>
                  <div>{{ item.nama }}</div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-col>
    </v-row>
  </v-app>
</template>
<style>
  .echarts {
    width: 100%;
    height: 100%;
  }

</style>
<script>
  export  default {
    data () {
      return {
        menus: {
          tgl: false,
        },
        table: {
          headers: [
            { text: 'No. Pendaftaran', value: 'peserta.no_pendaftaran', width: '200' },
            { text: 'Nama', value: 'peserta.nama', width: '250' },
            { text: 'Jurusan', value: 'peserta.jurusan_1', width: '100' },
            { text: 'Atas Nama', value: 'atas_nama', width: '200'  },
            { text: 'Jumlah', value: 'jumlah_rupiah',align: 'right', width: '200'  },
            { text: 'Penerima', value: 'user.name', width: '200'  },
            { text: 'Tgl. & Waktu Pembayaran', value: 'tgl_bayar',  width: '200'},
         ],
        },
        data: {
          tgl: [this.$moment().format('YYYY-MM-DD'),this.$moment().format('YYYY-MM-DD')],
          riwayat: null
        },
      }
    },
    computed: {
    },
    watch: {
      'data.tgl': function () {
        // window.console.log('asdasdad');
        this.data.riwayat = null;
        this.getData();
      }
    },
    methods: {
      getData: function () {
        this.axios.get('riwayat/pembayaran/'+ this.data.tgl).then((d) => {
          window.console.log(d.data);
          this.data.riwayat = d.data;
        })
      }
    },
    created () {
      this.getData();
    }
  }
</script>