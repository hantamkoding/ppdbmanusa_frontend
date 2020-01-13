<template>
  <v-app>
    <v-form
      v-model="valid"
    >
      <v-card-title>
        Formulir Pendaftaran
      </v-card-title>
      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <v-card>
            <v-card-title>Data Peserta</v-card-title>
            <v-card-text>
              <v-text-field
               v-model="data.nama"
               label="Nama Lengkap"
               :rules="[$formRules.required]"
              ></v-text-field>

              <v-row>
                <v-col>
                  <v-text-field
                   v-model="data.ttl.tempat"
                   label="Tempat Lahir"
                   :rules="[$formRules.required]"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-menu
                    v-model="menus.tgl_lahir"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="data.ttl.tgl"
                        label="Tanggal Lahir"
                        :rules="[$formRules.required]"
                        append-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="data.ttl.tgl" @input="menus.tgl_lahir = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-radio-group
              v-model="data.sex"
              label="Jenis Kelamin"
              >
                <v-radio
                  v-for="n in ['Laki - Laki', 'Perempuan']"
                  :key="n"
                  :label="`${n}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>

              <v-text-field
                v-model="data.nisn"
                label="NISN"
                :rules="[$formRules.required]"
              ></v-text-field>

              <v-text-field
                v-model="data.no_hp"
                label="No. Hp / Wa Peserta"
                hint="(*) Usahakan No. yang aktif / bisa dihubungi"
                :rules="[$formRules.required]"
              ></v-text-field>

              <v-textarea
                v-model="data.alamat"
                label="Alamat Peserta"
                hint="(*) Masukan Alamat yang lengkap. Meliputi nama jalan / gedung, RT/RW, Desa / Kelurahan, Kecamatan, Kabupaten, dan Provinsi"
              >
                
              </v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
        >
          <v-card>
            <v-card-title>
              Latar Belakang Pendidikan
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                >
                  <v-select
                    v-model="data.asal_sekolah.jenis"
                    :items="['Negri', 'Swasta']"
                    label="Asal Sekolah"
                    :rules="[$formRules.required]"
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                    v-model="data.asal_sekolah.nama"
                    label="Nama Asal Sekolah"
                    :rules="[$formRules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mt-5">
            <v-card-title>
              Paket Keahlian / Pilihan Jurusan
            </v-card-title>
            <v-card-text>
              <v-select
                v-model="data.jurusan_1"
                :items="db.jurusan"
                item-text="nama"
                item-value="kode"
                label="Jurusan 1 (Utama)"
                hint="Pilih jurusan utama"
                :rules="[$formRules.required]"
              ></v-select>

              <v-select
                v-model="data.jurusan_2"
                :items="db.jurusan"
                item-text="nama"
                item-value="kode"
                label="Jurusan 2"
                hint="Pilih jurusan Kedua, digunakan jika jurusan utama tidak tersedia / sudah tidak menerima peserta baru"
                :rules="[$formRules.required]"
              ></v-select>

            </v-card-text>
          </v-card>
          <v-card class="mt-5">
            <v-card-title>
              Sumber informasi PPDB
            </v-card-title>
            <v-card-text>

              <v-select
                v-model="data.sumber"
                :items="db.sumber"
                item-text="nama"
                item-value="nama"
                label="informasi diperoleh dari ?"
                hint="Dari manakah peserta mengetahui informasi ppdb"
                :rules="[$formRules.required]"
              ></v-select>

            </v-card-text>
          </v-card>
          <v-checkbox
            :hide-details="true"
            :rules="[$formRules.required]"
            label="Data yang saya masukan sudah benar"
          ></v-checkbox>
        </v-col>
        <v-col>
          <v-btn
            @click="submit"
            :disabled="!valid"
            color="success"
            rounded
          ><v-icon left>mdi-check</v-icon> Daftarkan Peserta</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        valid: false,
        menus: {
          tgl_lahir: false
        },
        db: { 
          jurusan: [],
          sumber: [],
        },
        data: {
          pendaftaran_id: this.$route.params.pendaftaran_id,
          nama: '',
          sex: null,
          email: '',
          no_hp: '',
          nisn: '',
          alamat: '',
          ttl: {
            tempat: '',
            tgl: this.$moment('2000-1-1').format('YYYY-MM-DD')
          },
          asal_sekolah: {
            jenis: null,
            nama: ''
          },
          jurusan_1: null,
          jurusan_2: null,
          sumber: null,
        }
      }
    },
    methods: {
      getJurusan: function () {
        return this.axios.get('master/jurusan').then((d) => {
          this.db.jurusan = d.data;
         })
      },
      getSumber: function () {
        return this.axios.get('master/sumber').then((d) => {
          this.db.sumber = d.data;
         })
      },
      submit: function () {
        return this.axios.post('peserta/register', this.data).then((d) => {
          window.console.log(d);
            this.$pesan.pesan(d.data.status, d.data.pesan);
            if (d.data.status) {
              this.$router.replace({
                name: 'PesertaPrintPendaftaran',
                params: {
                  id: d.data.data.id
                }
              });
            }
         })
      }
    }, 
    created () {
      this.getJurusan();
      this.getSumber();
    }
  }
</script>