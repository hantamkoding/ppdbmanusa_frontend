<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="5">
        <v-card>
          <v-card-title>
            Masukan No.Pendftaran Peserta
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
              v-model="no_id"
              label="No. Pendaftaran"
              :rules="[$formRules.required]"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="submit" :disabled="!valid" rounded color="success">Cek No.Pendaftaran</v-btn>
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
        valid: false,
        no_id: ''
      }
    },
    methods: {
      submit: function () {
        this.axios.get('peserta/get/'+this.no_id).then((d) => {
          window.console.log(d.data);
          this.$pesan.pesan(d.data.status, d.data.pesan);
          if (d.data.status) {
            this.$router.replace({
              name: 'PembayaranDaftarUlangKelola',
              params: {
                peserta_id: d.data.data.id
              }
            });
          }
        })
      }
    }
  }
</script>