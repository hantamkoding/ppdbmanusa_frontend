<template>
  <v-app>
    <v-btn @click="getUser">re</v-btn>
    <v-form v-model="valid">
      <v-row>
        <v-col col="12" md="6">
            <v-card>
              <v-card-text>
                <v-text-field
                 label="Nama"
                 v-model="data.name"
                 :rules="[$formRules.required]"
                ></v-text-field>
                <v-text-field
                 label="username"
                 v-model="data.username"
                 :rules="[$formRules.required]"
                ></v-text-field>
                <v-text-field
                 label="email"
                 type="email"
                 v-model="data.email"
                 :rules="[$formRules.required]"
                ></v-text-field>
   
                <v-text-field
                 label="No. Hp"
                 v-model="data.no_telp"
                 :rules="[$formRules.required]"
                ></v-text-field>

                <v-text-field
                 label="Alamat"
                 v-model="data.alamat"
                 :rules="[$formRules.required]"
                ></v-text-field>

                <v-text-field
                 label="Password"
                 v-model="data.password"
                ></v-text-field>

              </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card>
            <v-card-text>
              <v-checkbox v-model="data.roles" v-for="(item, index) in db.roles" :value="item.id" :label="item.description" v-bind:key="index"></v-checkbox>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn rounded color="success" @click="submit"><v-icon left>mdi-check</v-icon> {{ $route.meta.title }}</v-btn>
    </v-form>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        valid: false,
        db: {
          roles: [],
        },
        data: {
          user_id: this.$route.params.user_id,
          name: '',
          email: '',
          username: '',
          password: '',
          no_telp: '',
          alamat: '',
          roles: [],
        }
      }
    },
    methods: {
      getRoles: function (){
        this.axios.get('roles/get').then(d => {
          this.db.roles = d.data;
        })
      },
      getUser: function (){
        this.axios.get('users/show/' + this.data.user_id).then(d => {
          this.data.name = d.data.name;
          this.data.email = d.data.email;
          this.data.no_telp = d.data.no_telp;
          this.data.email = d.data.email;
          this.data.username = d.data.username;
          this.data.alamat = d.data.alamat;
        })
      },
      submit: function () {
        this.axios.post('users/action', this.data).then(d => {
         this.$pesan.pesan(d.data.status, d.data.pesan);
         if (d.data.status) {
          this.$router.replace({
            name: 'Users'
          })
         }
       })
      }
    },
    created () {
      if (this.data.user_id) {
        this.getUser();
      }
      this.getRoles();
    }
  }
</script>