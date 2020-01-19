<template>
  <v-app>
    <v-skeleton-loader
      v-if="!table.items"
      type="card"
    ></v-skeleton-loader>

    <v-card v-else>
      <v-card-title>
        Lihat Pengumuman Peserta Pendaftaran
        <div class="flex-grow-1"></div>
      </v-card-title>
      <v-data-table
        :headers="table.headers"
        :items="table.items"
      >
        <template v-slot:item.action="{ item }">
          <v-btn class="mr-1" small :to="{name: 'PengumumanLists', params: {
            pendaftaran_id: item.id
          }}" color="primary" outlined rounded>
            <v-icon small left>mdi-account-group</v-icon> Lihat
          </v-btn>  

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