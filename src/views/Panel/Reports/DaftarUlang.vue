<template>
  <v-app>
    <v-skeleton-loader
      v-if="!data"
      type="card"
    ></v-skeleton-loader>
    <v-row v-else>
      <v-col cols="12" md="12" v-for="item in data" v-bind:key="item.id">
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>{{ item.nama }}</v-card-title>
              <v-card-subtitle>Jurusan Pendaftaran</v-card-subtitle>
              <v-card-text style="min-height: 300px">
                <v-chart autoresize :options="item.chart_pendaftaran"/>
              </v-card-text>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th v-for="(jur) in item.jurusan" v-bind:key="jur">{{ jur }}</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th nowrap="nowrap">
                        Pilihan Jurusan Ke 1
                      </th>
                      <td class="text-center" v-for="(jur) in item.pilihan_1" v-bind:key="jur">{{ jur }}</td>
                      <td class="text-center">{{ item.pilihan_1.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>
                    </tr>
                    <tr>
                      <th nowrap="nowrap">
                        Pilihan Jurusan Ke 2
                      </th>
                      <td class="text-center" v-for="(jur) in item.pilihan_2" v-bind:key="jur">{{ jur }}</td>
                      <td class="text-center">{{ item.pilihan_2.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>

                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              
            </v-card>

          </v-col>

          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>{{ item.nama }}</v-card-title>
              <v-card-subtitle>Peserta Diterima</v-card-subtitle>
              <v-card-text style="min-height: 300px">
                <v-chart autoresize :options="item.chart_pengumuman"/>
              </v-card-text>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th v-for="(jur) in item.jurusan" v-bind:key="jur">{{ jur }}</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th nowrap="nowrap">
                        Diterima
                      </th>
                      <td class="text-center" v-for="(jur) in item.diterima" v-bind:key="jur">{{ jur }}</td>
                      <td class="text-center">{{ item.diterima.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>
                    </tr>
                    <tr>
                      <th nowrap="nowrap">
                        Tidak Diterima / Belum ada data
                      </th>
                      <td class="text-center" v-for="(jur) in item.tidak_diterima" v-bind:key="jur">{{ jur }}</td>
                      <td class="text-center text-weight-bold">{{ item.tidak_diterima.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>

                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

            </v-card>

          </v-col>
        </v-row>
      </v-col>      
    </v-row>
  </v-app>
</template>
<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
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
        data: null,
        chart:[],
      }
    },
    methods: {
      getData: function () {

        this.axios.get('reports/daftar_ulang').then(d => {
          window.console.log(d.data);

          this.data = d.data;
          d.data.forEach((item, index) => {
            // start of chart pendaftaran
            this.data[index].chart_pendaftaran = {
              legend: {},
              tooltip: {},
              xAxis: {
                  type: 'category',
                  data: item.jurusan
              },
              yAxis: {
                  type: 'value'
              },
              series: [{
                  data: item.pilihan_1,
                  type: 'bar',
                  name: 'Pilihan Jurusan ke 1'
              },{
                  data: item.pilihan_2,
                  type: 'bar',
                  name: 'Pilihan Jurusan ke 2'
              }],
              animationDuration: 2000
            };

            // end of chart pendaftaram

            // start of chart pengumuman

            this.data[index].chart_pengumuman = {
              legend: {},
              tooltip: {},
              xAxis: {
                  type: 'category',
                  data: item.jurusan
              },
              yAxis: {
                  type: 'value'
              },
              series: [{
                  data: item.diterima,
                  type: 'bar',
                  name: 'Diterima'
              },{
                  data: item.tidak_diterima,
                  type: 'bar',
                  name: 'Tidak diterima / Tidak ada data'
              }],
              animationDuration: 2000
            };
          });
        })
      }
    },
    created () {
      this.getData();
    }
  }
</script>