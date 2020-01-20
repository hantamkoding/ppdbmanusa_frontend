<template>
  <v-app>
    <!-- <v-btn color="success" @click="getData">refresh</v-btn> -->
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
              <v-card-subtitle>Total Peserta Daftar Ulang</v-card-subtitle>
              <v-card-text style="height: 350px">
                <v-chart autoresize :options="item.chart_total_peserta_du"/>
              </v-card-text>

              <v-card-text>

                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th v-for="(jur,i ) in item.jurusan" v-bind:key="i">{{ jur }}</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="font-weight-bold" nowrap="nowrap">
                          Sudah Daftar Ulang
                        </td>
                        <td class="text-center" v-for="(jur, i) in item.total_peserta_du" v-bind:key="i">{{ jur }}</td>
                        <td class="text-center font-weight-black">{{ item.total_peserta_du.reduce((total, jur) => {
                          return total + jur;
                        }) }}</td>
                      </tr>

                      <tr>
                        <td class="font-weight-bold" nowrap="nowrap">
                          Belum Daftar Ulang
                        </td>
                        <td class="text-center" v-for="(jur, i) in item.total_belum_du" v-bind:key="i">{{ jur }}</td>
                        <td class="text-center red--text font-weight-black">{{ item.total_belum_du.reduce((total, jur) => {
                          return total + jur;
                        }) }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>

              </v-card-text>

              <v-card-subtitle>Jenis Kelamin</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">

                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td class="font-weight-bold">Laki - Laki</td>
                            <td>{{ item.jenis_kelamin.laki_laki }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Perempuan</td>
                            <td>{{ item.jenis_kelamin.perempuan }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                  </v-col>
                  <v-col cols="12" md="6" style="height: 200px">
                    <v-chart autoresize :options="item.chart_jenis_kelamin"/>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-subtitle>Asal Sekolah</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6" style="height: 200px">
                    <v-chart autoresize :options="item.chart_asal_sekolah"/>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td class="font-weight-bold">Negri</td>
                            <td>{{ item.asal_sekolah.negri }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Swasta</td>
                            <td>{{ item.asal_sekolah.swasta }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

          </v-col>
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>{{ item.nama }}</v-card-title>
              <v-card-subtitle>Daftar Rincian Total Peneriman Uang daftar ulang setiap panitia</v-card-subtitle>

              <v-card-text>
                <v-timeline dense>
                  <v-slide-x-reverse-transition
                    group
                    hide-on-leave
                  >
                    <v-timeline-item
                      v-for="(terima, i) in item.rincian_penerimaan"
                      :key="i"
                      small
                      fill-dot
                    >
                      <v-card>
                        <v-card-text>
                          <div><span class="title">{{ terima.total | currency }}</span></div>
                          <div>{{ terima.user.name }}</div>
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-slide-x-reverse-transition>
                </v-timeline>

              </v-card-text>
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
  height: 100%;
}
</style>
<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/pie'
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
            this.data[index].chart_total_peserta_du = {
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
                  data: item.total_peserta_du,
                  type: 'bar',
                  name: 'Total Peserta Daftar Ulang'
              },{
                  data: item.total_belum_du,
                  type: 'bar',
                  name: 'Total Peserta Belum Daftar Ulang'
              }],
              animationDuration: 2000
            };
           
            this.data[index].chart_jenis_kelamin = {
              legend: {},
              tooltip: {},
              series: [
                  {
                      type: 'pie',
                      data: [
                          {value: item.jenis_kelamin.perempuan, name: 'Perempuan'},
                          {value: item.jenis_kelamin.laki_laki, name: 'Laki - Laki'},
                      ],

                      animationType: 'scale',
                      animationEasing: 'elasticOut',
                      animationDelay: function () {
                          return Math.random() * 200;
                      }
                  }
              ],
              animationDuration: 2000
            };

            this.data[index].chart_asal_sekolah = {
              legend: {},
              tooltip: {},
              series: [
                  {
                      type: 'pie',
                      data: [
                          {value: item.asal_sekolah.swasta, name: 'Negri'},
                          {value: item.asal_sekolah.negri, name: 'Swasta'},
                      ],

                      animationType: 'scale',
                      animationEasing: 'elasticOut',
                      animationDelay: function () {
                          return Math.random() * 200;
                      }
                  }
              ],
              animationDuration: 2000
            };
           

            // end of chart pendaftaram


          });
        })
      }
    },
    created () {
      this.getData();
    }
  }
</script>