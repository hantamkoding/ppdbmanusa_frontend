<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="12">
        <!-- <v-btn @click="getData"></v-btn> -->
        <v-card>
          <v-card-title>
            Riwayat Pendaftaran Peserta
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
          <v-card-text style="height: 350px">
            <v-chart autoresize :options="chart"/>
          </v-card-text>
          <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th v-for="(jur, i) in data.riwayat.jurusan" v-bind:key="i">{{ jur }}</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th nowrap="nowrap">
                        Pilihan Jurusan Ke 1
                      </th>
                      <td class="text-center" v-for="(jur, i) in data.riwayat.data_jurusan" v-bind:key="i">{{ jur }}</td>
                      <td class="text-center font-weight-black">{{ data.riwayat.data_jurusan.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" v-if="data.riwayat">
        <v-card>
          <v-data-table
            :headers="table.headers"
            :items="data.riwayat.riwayat"
          >

            <template v-slot:item.tgl_daftar="{ item }">
              {{ $moment(item.created_at).format('dddd, DD MMM. YYYY HH:mm') }}
            </template>

          </v-data-table>

        </v-card> 
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
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  export  default {
    components: {
      'v-chart': ECharts
    },
    data () {
      return {
        menus: {
          tgl: false,
        },
        table: {
          headers: [
            { text: 'No. Pendaftaran', value: 'no_pendaftaran', width: '200' },
            { text: 'Nama', value: 'nama', width: '200' },
            { text: 'Jurusan', value: 'jurusan_1' },
            { text: 'Tgl. & Waktu Daftar', value: 'tgl_daftar',  width: '200'},
         ],
        },
        data: {
          tgl: [this.$moment().format('YYYY-MM-DD'),this.$moment().format('YYYY-MM-DD')],
          riwayat: null
        },
      }
    },
    computed: {
      chart: function () {
        // let vm
        return {
          legend: {},
          tooltip: {},
          xAxis: {
              type: 'category',
              data: this.data.riwayat.jurusan
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: this.data.riwayat.data_jurusan,
              type: 'bar',
              name: 'Pilihan Jurusan ke 1'
          }],
        }
      }
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
        this.axios.get('riwayat/pendaftaran/'+ this.data.tgl).then((d) => {
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