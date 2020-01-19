<template>
  <v-app>
    <v-card>
      <v-card-title>
        Lihat Peserta Pendaftaran
        <div class="flex-grow-1"></div>
        <v-btn small @click="getUsers">refresh</v-btn>
        <v-btn :to="{name: 'addUsers'}" color="success" small>Add New</v-btn>
      </v-card-title>
      <v-data-table
        :headers="table.headers"
        :items="table.items"
      >
        <template v-slot:item.action="{ item }">
          <v-btn small :to="{name: 'editUsers', params: {
            user_id: item.id
          }}" color="success" outlined rounded>
            <v-icon small left>mdi-account-edit-outline</v-icon> edit 
          </v-btn>

        </template>
      </v-data-table>
    </v-card>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        table: {
          headers: [
            { text: 'Nama', value: 'name' },
            { text: 'Roles', value: 'roles' },
            { text: 'Aksi', value: 'action' },
          ],
          items: [],
        },
      }
    },

    methods: {
      getUsers: function () {
       return this.axios.get('users').then((d) => {
        window.console.log(d);
          this.table.items = d.data;
       })
      },
      // async getData: function () {
        
      // }
    },

    created () {
      this.getUsers();
    }

  }
</script>