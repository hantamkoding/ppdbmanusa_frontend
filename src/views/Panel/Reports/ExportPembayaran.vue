<template>
  <v-app>
    <v-tabs
      v-model="tab"
      centered
      dark
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        href="#tab-all"
      >
        Semua Database
      </v-tab>

      <v-tab
        href="#tab-date"
      >
        Rekap Pembayaran Harian
      </v-tab>

      <v-tab-item
        value="tab-all"
      >
        <v-skeleton-loader
          v-if="!table.items"
          type="card"
        ></v-skeleton-loader>

        <v-card v-else>
          <v-card-title>
            Download Database Rekap Semua Pembayaran Peserta
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
                    <v-btn small :href="$config.base_url + `pembayaran/export_excel/all/${item.id}`" target="_blank" class="ml-1" rounded outlined v-on="on" color="primary">
                      <v-icon small>mdi-cloud-download</v-icon>
                    </v-btn> 
                  </template>
                  <span>Semua Peserta</span>
                </v-tooltip>

              </div>
            </template>
          </v-data-table>
        </v-card>

      </v-tab-item>
      <v-tab-item
        value="tab-date"
      >
          <v-card>
            <v-card-title>
              Download Rekap Pembayaran
            </v-card-title>
            <v-card-subtitle>
              Download Database Rekap Riwayat Pembayaran pada rentang tanggal Tertentu
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
                    label="Tanggal"
                    :rules="[$formRules.required]"
                    append-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker range locale="id"  v-model="data.tgl"></v-date-picker>
              </v-menu>
            </v-card-text>
            <v-card-actions>
              <v-btn target="_blank" :href="$config.base_url + `pembayaran/export_excel/date/${data.tgl}`" color="success" rounded outlined><v-icon left>mdi-cloud-download</v-icon> Download Rekap Pembayaran</v-btn>
            </v-card-actions>
          </v-card>


      </v-tab-item>

    </v-tabs>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        tab: null,
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

        menus: {
          tgl: false,
        },

        data: {
          tgl: [this.$moment().format('YYYY-MM-DD')],
          riwayat: null
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