<template>
  <v-app>
    <v-card>
      <v-card-title>
        Daftar Pendaftaran
        <div class="flex-grow-1"></div>
        <v-btn rounded :to="{name: 'PendaftaranAdd'}" replace color="success"><v-icon left>mdi-plus</v-icon> Tambah Pendaftaran</v-btn>
      </v-card-title>
      <v-data-table
        :headers="table.headers"
        :items="table.items"
      >
        <template v-slot:item.action="{ item }">
          <v-btn :to="{name: 'PendaftaranEdit', params: {
            id: item.id
          }}" color="primary" outlined rounded>
            <v-icon small left>mdi-calendar-edit</v-icon> Edit
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
          items: [],
        },
      }
    },

    methods: {
      getData: function () {
         this.axios.get('pendaftaran').then((d) => {
          this.table.items = d.data;
         })
      }
    },

    created () {
      this.getData();
    }

  }
</script>