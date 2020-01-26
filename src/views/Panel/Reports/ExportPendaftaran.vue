<template>
  <v-app>
    <v-skeleton-loader
      v-if="!table.items"
      type="card"
    ></v-skeleton-loader>

    <v-card v-else>
      <v-card-title>
        Download Data Peserta Pendaftaran
        <div class="flex-grow-1"></div>
      </v-card-title>
      <v-data-table
        :headers="table.headers"
        :items="table.items"
      >
        <template v-slot:item.action="{ item }">
          <div>
            
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn small :href="$config.base_url + `peserta/export_excel/${item.id}/all`" target="_blank" class="ml-1" rounded outlined v-on="on" color="primary">
                  <v-icon small>mdi-cloud-download</v-icon>
                </v-btn> 
              </template>
              <span>Semua Peserta</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn small :href="$config.base_url + `peserta/export_excel/${item.id}/lolos`" target="_blank" class="ml-1" rounded outlined v-on="on" color="success">
                  <v-icon small>mdi-cloud-download</v-icon>
                </v-btn> 
              </template>
              <span>Lolos Seleksi dan Daftar Ulang</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn small :href="$config.base_url + `peserta/export_excel/${item.id}/mundur`" target="_blank" class="ml-1" rounded outlined v-on="on" color="red">
                  <v-icon small>mdi-cloud-download</v-icon>
                </v-btn> 
              </template>
              <span>Mengundurkan Diri dan Tidak Lolos Seleksi</span>
            </v-tooltip>

          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        table: {
          headers: [
            { text: 'Nama', value: 'nama' },
            { text: 'Jenis', value: 'jalur' },
            // { text: 'Tgl.Start', value: 'tgl_start' },
            // { text: 'Tgl.Start', value: 'tgl_start' },
            { text: 'Aksi', value: 'action' },
          ],
          items: null,
        },
      }
    },

    methods: {
      getPendaftaran: function () {
       return this.axios.get('pendaftaran').then((d) => {
          this.table.items = d.data;
       })
      },
      // async getData: function () {
        
      // }
    },

    created () {
      this.getPendaftaran();
    }

  }
</script>