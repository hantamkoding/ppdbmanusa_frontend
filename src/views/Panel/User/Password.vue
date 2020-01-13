<template>
  <v-app>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Ubah Password</v-card-title>
          <v-card-text>
            <v-form v-model="valid">
              
              <v-text-field
                label="Password Lama"
                :append-icon="data.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="data.showPwd ? data.showPwd = false : data.showPwd = true"
                v-model="data.pwd_lama"
                :type="!data.showPwd ? 'password' : 'text'"
                :rules="rules.password"
                required
              ></v-text-field>

              <v-text-field
                v-model="data.pwd_baru"
                label="Password Baru"
                :append-icon="data.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="data.showPwd ? data.showPwd = false : data.showPwd = true"
                :type="!data.showPwd ? 'password' : 'text'"
                :rules="rules.password"
                required
              ></v-text-field>

              <v-text-field
                v-model="data.pwd_baru_konfirmasi"
                label="Konfirmasi Password Baru"
                :append-icon="data.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="data.showPwd ? data.showPwd = false : data.showPwd = true"
                :type="!data.showPwd ? 'password' : 'text'"
                :rules="rules.password"
                required
              ></v-text-field>


            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn :disabled="!valid" @click="submit" color="success" rounded>Simpan Password</v-btn>
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
        showPwd: false,
        data: {
          pwd_lama: '',
          pwd_baru: '',
          pwd_baru_konfirmasi: '',
        },
        rules: {

          password: [
            v => !!v || 'Password wajib di isi',
            v => v.length >= 6 || 'Password minimal 6 karakter'
          ]

        }
      }
    },
    methods: {
      submit: function () {
        this.$axios.post('user/update_password', this.data).then((d) => {
         this.$pesan.pesan(d.data.status, d.data.pesan);
        });
      }
    }
  }
</script>