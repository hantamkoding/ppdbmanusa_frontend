<template>
  <v-app>
    <v-container v-if="peserta">
      <v-row >
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Detail Peserta</v-card-title>
            <v-card-text>
              <v-text-field
               v-model="peserta.nama"
               label="Nama Peserta"
               :rules="[$formRules.required]"
               disabled
              ></v-text-field>

              <v-text-field
               v-model="peserta.no_pendaftaran"
               label="No.Pendaftaran"
               :rules="[$formRules.required]"
               disabled
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>
                      Perolehan untuk
                    </th>
                    <th>Bahasa Indonesia</th>
                    <th>Bahasa Inggris</th>
                    <th>Matematika</th>
                    <th>IPA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Semester 1</td>
                    <td>
                      <v-text-field
                        v-model="data.bahasa_indonesia"
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        v-model="data.bahasa_inggris"
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        v-model="data.matematika"
                      ></v-text-field>
                    </td>
                    <td>
                      <v-text-field
                        v-model="data.ipa"
                      ></v-text-field>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="">
            <v-card-text>
              <v-text-field
                label="Nilai Wawancara"
                v-model="data.wawancara"
              >
              </v-text-field>
              <v-select
                label="Kompetensi Membaca Al-quran"
                :items="[
                  'Tidak Bisa',
                  'Kurang Lancar',
                  'Lancar',
                  'Hafidz',
                ]"
                v-model="data.alquran"
              >
              </v-select>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn @click="submit" color="success" rounded>
        <v-icon>mdi-check</v-icon> Simpan Nilai Peserta
      </v-btn>
    </v-container>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        peserta_id: this.$route.params.id,
        peserta: null,
        valid: false,
        data: {
          bahasa_inggris: null,
          bahasa_indonesia: null,
          ipa: null,
          matematika: null,
          wawancara: null,
          alquran: null,
        }
      }
    },
    methods: {

      getPeserta: function () {
        this.axios.get('peserta/show/' + this.peserta_id).then((d) => {
          window.console.log(d);
          this.peserta = d.data;
          if (d.data.nilai) {
            this.data = d.data.nilai;
          }
        });
      },
      submit: function () {
        return this.axios.post('peserta/input/nilai/'+this.peserta_id, this.data).then((d) => {
          window.console.log(d);
            this.$pesan.pesan(d.data.status, d.data.pesan);
         })
      }
    },
    created () {
      this.getPeserta();
    }
  }
</script>
