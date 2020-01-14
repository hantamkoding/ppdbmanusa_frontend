<template>
  <v-app>
    <v-card v-if="pendaftaran">
      <v-card-title>
        Daftar Pengumuman Peserta
        <div class="flex-grow-1"></div>
        <v-btn color="primary" outlined rounded @click="getPeserta">
          <v-icon left>mdi-refresh</v-icon> refresh
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" sm="12" md="3">
            <v-select
              v-model="filter.jurusan"
              :items="db.jurusan"
              item-text="nama"
              item-value="kode"
              label="Jurusan"
              single-line
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filter.search"
              append-icon="mdi-magnify"
              label="Pencarian"
              single-line
              hide-details
            ></v-text-field>

          </v-col>
        </v-row>
      </v-card-text>
      <v-data-table
        :headers="table.headers"
        :items="peserta"
        :search="filter.search"
      >
        <template v-slot:item.action="{ item }">

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="action(item.id, true)" class="ml-1" rounded outlined v-on="on" color="success">
                <v-icon small>mdi-check</v-icon>
              </v-btn> 
            </template>
            <span>Terima Peserta</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="action(item.id, false)" class="ml-1" rounded outlined v-on="on" color="red">
                <v-icon small>mdi-close</v-icon>
              </v-btn> 
            </template>
            <span>Tolak Peserta</span>
          </v-tooltip>


          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="ml-1" rounded outlined v-on="on" :to="{name: 'PengumumanPrint', params: {
                id: item.id
              }}" color="primary">
                <v-icon small>mdi-printer</v-icon>
              </v-btn> 
            </template>
            <span>Print Pengumuman</span>
          </v-tooltip>

        </template>

        <template v-slot:item.pengumuman="{ item }">
          <v-chip v-if="item.hasil == null" color="red" dark>Belum ada data</v-chip>
          <v-chip v-else-if="item.hasil == true" color="success" dark>Diterima</v-chip>
          <v-chip v-else-if="item.hasil == false" color="red" dark>Tidak diterima</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        pendaftaran_id: this.$route.params.pendaftaran_id,
        pendaftaran: null,
        filter: {
          search: '',
          jurusan: null,
        },
        db: {
          jurusan: []
        },
        table: {
          headers: [
            { text: 'No. Pendaftaran', value: 'no_pendaftaran' },
            { text: 'Nama', value: 'nama' },
            { text: 'Jurusan', value: 'jurusan_1' },
            { text: 'Status', value: 'pengumuman' },
            // { text: 'Tgl.Start', value: 'tgl_start' },
            { text: 'Aksi', value: 'action' },
          ],
          items: [],
        },
      }
    },
    computed: {
      peserta: function (){
        let vm = this;
        return this.table.items.filter(function (item) {
          return item.jurusan_1 == vm.filter.jurusan;
        });
      }
    },
    methods: {
      getPendaftaran: function () {
        return this.axios.get('pendaftaran/show/'+this.pendaftaran_id).then((d) => {
          this.pendaftaran = d.data
         })

      },

      getJurusan: function () {
        return this.axios.get('master/jurusan').then((d) => {
          this.db.jurusan = d.data;
          this.filter.jurusan = d.data[0].kode;
         })
      },
      getPeserta: function () {
         this.axios.get(`pengumuman/${this.pendaftaran_id}`).then((d) => {
          this.table.items = d.data;
         })
      },
      action: function (id, status) {
         this.axios.post(`pengumuman/action`, {
          id: id,
          status: status
         }).then((d) => {
          if (d.data.status) {
            this.getPeserta();
          }
          this.$pesan.pesan(d.data.status, d.data.pesan);
         })
      },
    },

    created () {
      this.getPendaftaran();
      this.getJurusan();
      this.getPeserta();
    }

  }
</script>