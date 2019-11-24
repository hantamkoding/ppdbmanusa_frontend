<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  mounted () {
    document.title = this.$route.meta.title;
  },
  watch: {
    $route : function (route) {
      document.title = route.meta.title;
    }
  }
};
</script>
