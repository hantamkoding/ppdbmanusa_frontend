<template>
  <v-app>
    <v-row v-if="!data">
      <v-col cols="12" md="6">
        <v-skeleton-loader
          type="card"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader
          v-for="index in 5"
          v-bind:key="index"
          type="list-item-avatar"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <div v-else>
      <v-row>
        <v-col cols="12" md="5">
          <v-card>
           <v-simple-table>
              <template v-slot:default>
                <tr>
                  <th>No. Pendaftaran</th>
                  <td>:</td>
                  <td>{{ data.peserta.no_pendaftaran }}</td>
                </tr>
                <tr>
                  <th>Nama Peserta</th>
                  <td>:</td>
                  <td>{{ data.peserta.nama }}</td>
                </tr>
                <tr>
                  <th>Jenis Kelamin</th>
                  <td>:</td>
                  <td>{{ data.peserta.sex }}</td>
                </tr>
                <tr>
                  <th>Asal Sekolah</th>
                  <td>:</td>
                  <td>{{ data.peserta.asal_sekolah.nama }}</td>
                </tr>
                <tr>
                  <th>Pilihan Jurusan</th>
                  <td>:</td>
                  <td>{{ data.peserta.jurusan.kode }} ({{ data.peserta.jurusan.nama }})</td>
                </tr>
              </template>
            </v-simple-table>
          </v-card>
          <v-card class="mt-5">
             <v-card-actions>
               <v-btn rounded outlined small color="info" :to="{
                name: 'Print',
                query: {
                  url: $config.api_url + 'daftar_ulang/rincian/print/' + data.rincian_du.id
                }
               }"><v-icon left small>mdi-printer</v-icon> Print Rincian Biaya</v-btn>
             </v-card-actions>
             <v-simple-table>
              <template v-slot:default>
                <tr>
                  <th>Total Biaya Daftar Ulang</th>
                  <td>:</td>
                  <td class="text-right"><span class="blue--text">{{ data.total.rincian | currency }}</span></td>
                </tr>
                <tr>
                  <th>Total dibayar Peserta</th>
                  <td>:</td>
                  <td class="text-right">{{ data.total.dibayar | currency }}</td>
                </tr>
                <tr>
                  <th>Total Kekurangan</th>
                  <td>:</td>
                  <td class="text-right">{{ (data.total.kekurangan) | currency }}</td>
                </tr>
              </template>
            </v-simple-table>
            <v-card-text class="text-center">
              Status
              <v-divider></v-divider>
              <span v-if="data.total.kekurangan == 0" class="display-1 success--text">LUNAS</span>
              <span v-else class="display-1 red--text">BELUM LUNAS</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col col="12" md="7">
          <v-card>
            <v-card-title><v-icon left>mdi-history</v-icon> Riwayat Pembayaran</v-card-title>

            <v-card-actions>
              <v-btn @click="dialogs.add = true" color="success" small outlined rounded><v-icon left>mdi-cash-register</v-icon> Tambah Pembayaran</v-btn>
            </v-card-actions>
            <v-card-text class="py-0">
              <v-timeline style="max-height: 300px;overflow-y: scroll;" dense>
                <v-slide-x-reverse-transition
                  group
                  hide-on-leave
                >
                  <v-timeline-item
                    v-for="(item, index) in data.pembayaran_du"
                    :key="item.id"
                    small
                    fill-dot
                  >
                    <v-card>
                      <v-card-text>
                        <div><small>{{ item.created_at }}</small></div>
                        <div><span class="title">{{ item.jumlah | currency }}</span></div>
                        <table style="width: 100%">
                            <tr class="table">
                              <td><b>No.</b></td>
                              <td>: {{ item.id }}</td>
                            </tr>
                            <tr>
                              <td><b>Atas Nama</b></td>
                              <td>: {{ item.atas_nama }}</td>
                            </tr>
                            <tr>
                              <td><b>Penerima</b></td>
                              <td>: {{ item.user.name }}</td>
                            </tr>
                        </table>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-tooltip v-if="index == 0" bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn small rounded outlined v-on="on" @click="hapusInvoice(item.id)" color="red" class="mr-1">
                              <v-icon small>mdi-delete-outline</v-icon>
                            </v-btn> 
                          </template>
                          <span>Hapus Bukti Pembayaran</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn small rounded outlined v-on="on" :to="{name: 'Print', query: {
                              url: $config.api_url+ `invoice/print/${item.id}`
                            }}" color="primary">
                              <v-icon small>mdi-printer</v-icon>
                            </v-btn> 
                          </template>
                          <span>Print Bukti Pembayaran</span>
                        </v-tooltip>

                      </v-card-actions>
                    </v-card>
                  </v-timeline-item>
                </v-slide-x-reverse-transition>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialogs.add"
        transition="scale-transition"
        max-width="500"
      >
        <v-card>
          <v-card-title>Tambah Transaksi Pembayaran</v-card-title>
          <v-card-text>
            <v-form @submit="submit" v-model="pembayaran.valid">
              <v-text-field
              label="No.Pendaftaran"
              :value="data.peserta.no_pendaftaran"
              disabled
              ></v-text-field>

              <v-text-field
              label="Nama Peserta"
              :value="data.peserta.nama"
              disabled
              ></v-text-field>

              <v-text-field
              label="Atas Nama"
              v-model="pembayaran.atas_nama"
              :rules="[$formRules.required, $formRules.length(1)]"
              ></v-text-field>

              <v-currency-field
              prefix="Rp. "
              label="Jumlah Uang"
              v-model="pembayaran.jumlah"
              :rules="[$formRules.required, $formRules.length(3)]"
              ></v-currency-field>

              <v-text-field
              label="Nama Penerima"
              :value="$user.data.name"
              disabled
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small @click="submit" color="success" rounded :disabled="!pembayaran.valid">
              <v-icon left>mdi-check</v-icon> Tambah Transaksi Pembayaran
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </div>
  </v-app>
</template>
<script>
  export default {
    data () {
      return  {
        dialogs:{
          add: false,
        },
        peserta_id: this.$route.params.peserta_id,
        data: null,
        pembayaran: {
          valid: false,
          atas_nama: '',
          jumlah: 0,
        }
      }
    },
    methods: {
      getData: function () {
        this.axios.get('pembayaran/detail/'+ this.peserta_id).then((d) => {
          window.console.log(d);
          this.data = d.data;
        })
      },
      hapusInvoice: function (id){
        this.$confirm('Apakah kamu yakin akan menghapus data ini ? Invoice Number: #'+id).then(res => {
            if (res) {
              this.axios.delete('pembayaran/delete/'+ id).then((d) => {
                if (d.data.status) {
                  this.getData();
                }
                this.$pesan.pesan(d.data.status, d.data.pesan);
              })
            }
        })
      },
      submit: function (){
        this.$axios.post('pembayaran/action', {
          peserta_id: this.peserta_id,
          ...this.pembayaran
        }).then((d) => {
          window.console.log(d);
          if (d.data.status) {
            this.getData();
            this.dialogs.add = false;
          }
          this.$pesan.pesan(d.data.status, d.data.pesan);
        });

      }
    },
    created () {
      this.getData();
    }
  }
</script>