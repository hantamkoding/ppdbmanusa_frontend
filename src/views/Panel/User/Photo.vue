<template>
  <v-app>
    <v-card>
      <v-card-title>
        Rubah Foto Profile
      </v-card-title>
      <v-card-text>
        <v-img sizes="100%" :src="$config.base_url + img" />
      </v-card-text>
      <v-card-text>
        <v-form v-model="valid">
          <v-file-input
            v-model="file"
            label="Pilih Gambar"
            prepend-icon="mdi-camera"
            :rules="rules.required"
          ></v-file-input>

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
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        img: this.$user.data.img,
        file: null,
        rules: {

        },
        valid: false
      }
    },
    watch: {
      'files': function (test){
        window.console.log(test);
      }
    },
    methods: {
      submit: function () {
         let formData= new FormData();
         formData.append('file', this.file);
         this.axios.post('user/update_foto', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then((d) => {
             this.img = d.data.data.img;
             this.$user.get().then(() => {
               this.$pesan.pesan(d.data.status, d.data.pesan);
             });
          });
      }
    }
  }
</script>