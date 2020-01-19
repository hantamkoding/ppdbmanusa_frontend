<template>
	<v-app>
  <v-row>
   <v-col
    lg="6"
    md="8"
   >
     <v-card>
      <v-card-title>Ubah Profile</v-card-title>
      <v-card-text>
       <v-form v-model="valid">
        <v-text-field
         label="Nama"
         v-model="data.name"
         :rules="[$formRules.required, ...rules.name]"
         :counter="40"
         required
        ></v-text-field>

        <v-text-field
         label="E-mail"
         v-model="data.email"
         :rules="rules.email"
         required
        ></v-text-field>

        <v-text-field
         label="No. Telp"
         type="number"
         v-model="data.no_telp"
         :rules="[$formRules.required]"
         required
        ></v-text-field>

        <v-textarea
          label="Alamat Lengkap"
          v-model="data.alamat"
          :rules="[$formRules.required]"
        ></v-textarea>

        <v-btn
         :disabled="!valid"
         color="success"
         class="mr-4"
         @click="submit"
         rounded
        >
         Simpan Perubahan
        </v-btn>
       </v-form>
     </v-card-text>
    </v-card>
   </v-col>
  </v-row>
 </v-app>
</template>
<script>
 import _user from '@/plugins/user'
	export default {
		data: () => {
			return {
				valid: true,
        data: _user.data,
        rules: {
         name: [
          v => v.length <= 40 || 'Nama tidak boleh melebihi 40 karakter'  
         ],
         email: [
          v => /.+@.+/.test(v) || 'Email yang kamu masukan tidak valid',
         ]
        }
      } 
		},
    methods: {
     submit: function () {
      this.$axios.post('user/update_profile', this.data).then((d) => {
       this.$pesan.pesan(d.data.status, d.data.pesan);
       this.$user.get();
      });
     }
    },
    created () {
    }
	}
</script>