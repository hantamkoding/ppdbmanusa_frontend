<template>
  <v-app>
     <v-list>
      <v-list-item>
        <v-list-item-avatar>
          <v-img  :src="$config.base_url + $user.data.img"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on" link>
            <v-list-item-content>
              <v-list-item-title class="title">{{ $user.data.name }}</v-list-item-title>
              <v-list-item-subtitle>@{{ $user.data.username }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
        <v-list>

          <v-list-item :to="{ name: 'userPhoto' }" replace link>
            <v-list-item-action>
              <v-icon>mdi-account-edit-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>Ubah Foto</v-list-item-content>
          </v-list-item>

          <v-list-item :to="{ name: 'userEdit' }" replace link>
            <v-list-item-action>
              <v-icon>mdi-account-edit-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>Ubah Profile</v-list-item-content>
          </v-list-item>

          <v-list-item :to="{ name: 'userPassword' }" replace link>
            <v-list-item-action>
              <v-icon>mdi-lock</v-icon>
            </v-list-item-action>
            <v-list-item-content>Ubah Password</v-list-item-content>
          </v-list-item>

          <v-list-item @click="$auth.logout()" replace link>
            <v-list-item-action>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-action>
            <v-list-item-content>Logout</v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>
    </v-list>
    <v-divider></v-divider>
    <v-list shaped>
      <v-list-item-group v-model="active" color="primary">

        <v-list-item :to="{name: 'Dashboard'}" replace>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              Dashboard
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'Pendaftaran'}" replace>
          <v-list-item-action>
            <v-icon>mdi-clipboard-account-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              Pendaftaran
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'PesertaListsPendaftaran'}" replace>
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              Peserta
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'PengumumanInputKode'}" replace>
          <v-list-item-action>
            <v-icon>mdi-clipboard-check-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
              Pengumuman
          </v-list-item-content>
        </v-list-item>

      </v-list-item-group>
    </v-list>
  </v-app>
</template>
<script>
  export default {
    data: () => {
      return {
        active: 1
      }
    }
  }
</script>