<template>
  <v-app>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-row>
            <v-col
              cols="12"
              xs="12"
              md="6"
            >

              <v-text-field
               label="Nama"
               v-model="data.nama"
               :rules="[$formRules.required, $formRules.length(5), rules.name]"
               :counter="40"
               required
              ></v-text-field>

              <v-select
                :items="['Peminatan', 'Umum']"
                v-model="data.jalur"
                label="Jalur Pendaftaran"
                :rules="[$formRules.required]"
                required
              ></v-select>
              
              <v-menu
                v-model="menus.tgl_start"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="data.tgl_start"
                    label="Tanggal Mulai"
                    :rules="[$formRules.required]"
                    append-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="data.tgl_start" @input="menus.tgl_start = false"></v-date-picker>
              </v-menu>
            
              <v-menu
                v-model="menus.tgl_end"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="data.tgl_end"
                    label="Tanggal Selesai"
                    append-icon="mdi-calendar"
                    :rules="[$formRules.required]"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="data.tgl_end" @input="menus.tgl_end = false" :min="data.tgl_start"></v-date-picker>
              </v-menu>
            
              <v-menu
                v-model="menus.tgl_pengumuman"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="data.tgl_pengumuman"
                    label="Tanggal Pengumuman"
                    :rules="[$formRules.required]"
                    append-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="data.tgl_pengumuman" @input="menus.tgl_pengumuman = false" :min="data.tgl_start"></v-date-picker>
              </v-menu>

              <v-text-field
               label="Kode Pendaftaran"
               v-model="data.awalan_id"
               :rules="[$formRules.required]"
               prefix="PPD-"
               type="number"
               hint="Awalan untuk no. id para pendaftar contoh : PPD-20200100xxxx"
               required
              ></v-text-field>

            
            </v-col>
            <v-col
            cols="12"
            xs="12"
            md="6"
            >
              <v-text-field
               label="Maximal Peserta"
               v-model="data.max_siswa"
               :rules="[$formRules.required]"
               type="number"
               hint="Usahakan pendaftaran dibagi menjadi beberapa sesi dan setting nilai maximum untuk pendaftar di setiap sesi. untuk menanggulangi jaringan lambat dan proses yang terlalu berat"
               required
              ></v-text-field>

              <v-textarea
               label="Keterangan Lanjut / Detail Pendaftaran"
               v-model="data.keterangan"
               hint="Berisi keterangan lebih lanjut mengenai pendaftaran"
               counter
              ></v-textarea>

               <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th>Berkas</th>
                        <th>Jumlah</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in data.berkas" v-bind:key="index">
                        <td>
                          <v-text-field v-model="item.nama"></v-text-field>
                        </td>
                        <td>
                          <v-text-field v-model="item.jumlah" type="number"></v-text-field>
                        </td>
                        <td>
                          <v-btn @click="data.berkas.slice(index, 1)" color="red" small rounded outlined>
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3">
                          <v-btn @click="data.berkas.push({nama: '', jumlah: null})" small rounded outlined>Tambah Berkas</v-btn>

                        </td>
                      </tr>
                    </tfoot>
                  </template>
                </v-simple-table>
             </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submitForm" :disabled="!valid" color="success" rounded>
          Simpan Pendaftaran
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        title: this.$route.meta.title,
        valid: false,
        menus: {
          tgl_start: false,
          tgl_end: false,
          tgl_pengumuman: false,
        },
        data: {
          nama: '',
          jalur: '',
          max_siswa: 2000,
          tgl_start: this.$moment().format('YYYY-MM-DD'),
          tgl_end: this.$moment().format('YYYY-MM-DD'),
          tgl_pengumuman: this.$moment().format('YYYY-MM-DD'),
          awalan_id: this.$moment().format('mmss'),
          keterangan: '',
          berkas: []
        },
        rules: {
          name: v => v.length <= 40 || 'Nama Tidak boleh melebihi 40 karakter'
        }
      }
    },
    methods: {
      submitForm: function () {
        this.$axios.post('pendaftaran/action', this.data).then((d) => {
          if (d.data.status) {
            this.$router.replace({
              name: 'Pendaftaran'
            })
          }
          this.$pesan.pesan(d.data.status, d.data.pesan);
        });
      },
      getData: function () {
        this.axios.get('pendaftaran/show/'+this.id).then((d) => {
          window.console.log(d);
          this.data = d.data
         })
      }
    },
    created () {
      if (this.id) {
        this.getData();
      }
    }
  }
</script>