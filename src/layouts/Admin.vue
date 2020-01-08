<template>
  <v-app>

    <v-app-bar
      app
      color="deep-purple accent-4"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ $config.title }}</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <sidebar/>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>

        <!-- If using vue-router -->
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
