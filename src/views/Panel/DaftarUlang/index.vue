<template>
  <v-app>
    <v-card>
      <v-card-title>
        Kelola Biaya Daftar Ulang
        <div class="flex-grow-1"></div>
        <v-btn :to="{
          name: 'RincianDaftarUlangAdd'
        }" replace small color="primary" outlined rounded>
          Tambah
        </v-btn>
      </v-card-title>
      <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th>Jurusan</th>
                <th>Jenis Kelamin</th>
                <th>aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" v-bind:key="index">
                <td>{{ item.jurusan.join(', ') }}</td>
                <td>{{ item.sex.join(', ') }}</td>
                <td>
                  <v-btn :to="{
                    name: 'RincianDaftarUlangEdit',
                    params: {
                      id: item.id
                    }
                  }" color="primary" small rounded outlined>
                    <v-icon small left>mdi-clipboard-flow</v-icon> Edit
                  </v-btn>
                  <v-btn class="ml-1" small color="red" @click="removeRincian(item.id)" rounded outlined>
                    <v-icon left>mdi-delete-outline</v-icon> Hapus
                  </v-btn>

                  <v-btn class="ml-1" small color="primary" :to="{
                    name: 'Print',
                    query: {
                      url: $config.api_url + 'daftar_ulang/rincian/print/'+ item.id
                    }
                  }" rounded outlined>
                    <v-icon left>mdi-printer</v-icon> Print
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
      </v-simple-table>
    </v-card>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        filter: {
          search: '',
          jurusan: null,
        },
        db: {
          jurusan: []
        },
        items: [],
      }
    },
    computed: {
    },
    methods: {
      getRincians: function () {
        return this.axios.get('daftar_ulang/rincian/lists').then((d) => {
          window.console.log(d);
          this.items = d.data
         })

      },

      removeRincian: function (id) {
        return this.axios.delete('daftar_ulang/rincian/delete/' + id).then((d) => {
          this.$pesan.pesan(d.data.status, d.data.pesan);
          this.getRincians();          
         })
      },

    },

    created () {
      this.getRincians();
    }

  }
</script>