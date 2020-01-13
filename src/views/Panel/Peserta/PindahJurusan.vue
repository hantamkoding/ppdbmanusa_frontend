<template>
  <v-app>
    <v-row v-if="peserta">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>
            Pindah Jurusan Peserta
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
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

              <v-select
                item-text="nama"
                item-value="kode"
                label="Jurusan Lama"
                v-model="peserta.jurusan.kode"
                :rules="[$formRules.required]"
                :items="db.jurusan"
                disabled
              >
              </v-select>
              <v-select
                item-text="nama"
                item-value="kode"
                label="Jurusan Baru"
                hint="Pilih Jurusan tujuan"
                v-model="data.jurusan"
                :rules="[$formRules.required]"
                :items="db.jurusan"
              >
                
              </v-select>              
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!valid" @click="submit" color="success" rounded><v-icon left>mdi-check</v-icon> Pindah Peserta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        peserta_id: this.$route.params.id,
        peserta: null,
        valid: false,
        db: {
          jurusan: []
        },
        data: {
          peserta_id: this.$route.params.id,
          jurusan: null,
        }
      }
    },
    methods: {

      getJurusan: function () {
        return this.axios.get('master/jurusan').then((d) => {
          this.db.jurusan = d.data;
         })
      },

      getPeserta: function () {
        this.axios.get('peserta/show/' + this.peserta_id).then((d) => {
          window.console.log(d);
          this.peserta = d.data;
        });
      },
      submit: function () {
        return this.axios.post('peserta/pindah_jurusan', this.data).then((d) => {
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
      this.getPeserta();
      this.getJurusan();
    }
  }
</script>
