<template>
  <v-app>
    <v-card v-if="pendaftaran">
      <v-card-title>
        Daftar Peserta Pendaftaran
        <div class="flex-grow-1"></div>
        <v-btn small color="primary" outlined rounded @click="getPeserta">
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
              <v-btn small rounded outlined v-on="on" :to="{name: 'PesertaPrintPendaftaran', params: {
                id: item.id
              }}" color="primary">
                <v-icon small>mdi-printer</v-icon>
              </v-btn> 
            </template>
            <span>Print No. Pendaftaran</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small class="ml-1" rounded outlined v-on="on" :to="{name: 'PesertaEdit', params: {
                id: item.id
              }}" color="primary">
                <v-icon small>mdi-account-edit-outline</v-icon>
              </v-btn> 
            </template>
            <span>Ubah Biodata Peserta</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn small class="ml-1" rounded outlined v-on="on" :to="{name: 'PesertaPindahJurusan', params: {
                id: item.id
              }}" color="primary">
                <v-icon small>mdi-account-convert</v-icon>
              </v-btn> 
            </template>
            <span>Peserta Pindah Jurusan</span>
          </v-tooltip>

        </template>

        <template v-slot:item.tgl_daftar="{ item }">
          {{ $moment(item.created_at).format('dddd, DD MMM. YYYY HH:mm') }}
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
            { text: 'Tgl. & Waktu Daftar', value: 'tgl_daftar' },
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
          window.console.log(d);
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
         this.axios.get(`peserta/${this.pendaftaran_id}`).then((d) => {
          this.table.items = d.data;
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