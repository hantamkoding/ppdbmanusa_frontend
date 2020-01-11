<template>
  <v-app>
    <v-form>
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
               label="Nama Lengkap"
               :rules="[$formRules.required]"
               required
              ></v-text-field>

              <v-row>
                <v-col>
                  <v-text-field
                   label="Tempat Lahir"
                   :rules="[$formRules.required]"
                   required
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
                        v-model="data.tgl_lahir"
                        label="Tanggal Lahir"
                        :rules="[$formRules.required]"
                        append-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="data.tgl_lahir" @input="menus.tgl_lahir = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-radio-group
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
               label="NISN"
               :rules="[$formRules.required]"
               required
              ></v-text-field>

              <v-text-field
               label="No. Hp / Wa Peserta"
               hint="(*) Usahakan No. yang aktif / bisa dihubungi"
               :rules="[$formRules.required]"
               required
              ></v-text-field>

              <v-textarea
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
                    :items="['Negri', 'Swasta']"
                    label="Asal Sekolah"
                    :rules="[$formRules.required]"
                    required
                  ></v-select>
                </v-col>

                <v-col
                  cols="12"
                  sm="8"
                >
                  <v-text-field
                   label="Nama Asal Sekolah"
                   :rules="[$formRules.required]"
                   required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card class="mt-5">
            <v-card-title>
              Paket Keahlian / Pilihan Jurusan
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        menus: {
          tgl_lahir: false
        },
        data: {
          tgl_lahir: this.$moment().format('YYYY-MM-DD')
        }
      }
    }
  }
</script>