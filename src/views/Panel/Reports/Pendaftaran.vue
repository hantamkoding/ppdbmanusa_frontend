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
              <v-card-text style="height: 350px">
                <v-chart autoresize :options="item.chart_pendaftaran"/>
              </v-card-text>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th v-for="(jur, i) in item.jurusan" v-bind:key="i">{{ jur }}</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th nowrap="nowrap">
                        Pilihan Jurusan Ke 1
                      </th>
                      <td class="text-center" v-for="(jur, i) in item.pilihan_1" v-bind:key="i">{{ jur }}</td>
                      <td class="text-center font-weight-black">{{ item.pilihan_1.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>
                    </tr>
                    <tr>
                      <th nowrap="nowrap">
                        Pilihan Jurusan Ke 2
                      </th>
                      <td class="text-center" v-for="(jur, i) in item.pilihan_2" v-bind:key="i">{{ jur }}</td>
                      <td class="text-center font-weight-black">{{ item.pilihan_2.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>

                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
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
              <v-card-subtitle>Peserta Diterima</v-card-subtitle>
              <v-card-text style="height: 350px">
                <v-chart autoresize :options="item.chart_pengumuman"/>
              </v-card-text>

              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th v-for="(jur, i) in item.jurusan" v-bind:key="i">{{ jur }}</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th nowrap="nowrap">
                        Diterima
                      </th>
                      <td class="text-center" v-for="(jur,i) in item.diterima" v-bind:key="i">{{ jur }}</td>
                      <td class="text-center font-weight-black">{{ item.diterima.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>
                    </tr>
                    <tr>
                      <th nowrap="nowrap">
                        Tidak Diterima / Belum ada data
                      </th>
                      <td class="text-center" v-for="(jur,i) in item.tidak_diterima" v-bind:key="i">{{ jur }}</td>
                      <td class="text-center font-weight-black">{{ item.tidak_diterima.reduce((total, jur) => {
                        return total + jur;
                      }) }}</td>

                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-subtitle>Jenis Kelamin</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">

                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td class="font-weight-bold">Laki - Laki</td>
                            <td>{{ item.jenis_kelamin_diterima.laki_laki }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Perempuan</td>
                            <td>{{ item.jenis_kelamin_diterima.perempuan }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                  </v-col>
                  <v-col cols="12" md="6" style="height: 200px">
                    <v-chart autoresize :options="item.chart_jenis_kelamin_diterima"/>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-card-subtitle>Asal Sekolah</v-card-subtitle>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6" style="height: 200px">
                    <v-chart autoresize :options="item.chart_asal_sekolah_diterima"/>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td class="font-weight-bold">Negri</td>
                            <td>{{ item.asal_sekolah_diterima.negri }}</td>
                          </tr>
                          <tr>
                            <td class="font-weight-bold">Swasta</td>
                            <td>{{ item.asal_sekolah_diterima.swasta }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                  </v-col>
                </v-row>
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

        this.axios.get('reports/pendaftaran').then(d => {
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
          
            this.data[index].chart_jenis_kelamin_diterima = {
              legend: {},
              tooltip: {},
              series: [
                  {
                      type: 'pie',
                      data: [
                          {value: item.jenis_kelamin_diterima.perempuan, name: 'Perempuan'},
                          {value: item.jenis_kelamin_diterima.laki_laki, name: 'Laki - Laki'},
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

            this.data[index].chart_asal_sekolah_diterima = {
              legend: {},
              tooltip: {},
              series: [
                  {
                      type: 'pie',
                      data: [
                          {value: item.asal_sekolah_diterima.swasta, name: 'Negri'},
                          {value: item.asal_sekolah_diterima.negri, name: 'Swasta'},
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

          });
        })
      }
    },
    created () {
      this.getData();
    }
  }
</script>