<template>
  <v-app>
    <v-app-bar
      app
      color="green lighten-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-icon>mdi-school</v-icon> {{ $config.title }}
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <sidebar/>
    </v-navigation-drawer>

    <v-content>
      <v-container>
        <div class="mb-5">
          <v-btn @click="kembali" v-if="$route.name != 'Dashboard'" small outlined rounded>Kembali</v-btn>
        </div>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import sidebar from '@/components/Panel/Sidebar'
  export default {
    components: {
      sidebar
    },
    props: {
      source: String,
    },
    methods: {
      kembali: function () {
        window.history.back();
      }
    },
    data: () => ({
      drawer: false,
    }),
    created: function () {
      this.$user.get();
    },
    mounted: function () {
      window.console.log(this.$route);
    }
  }
</script>
