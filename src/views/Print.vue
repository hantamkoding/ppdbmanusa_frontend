<template>
  <v-app>
      <embed
        :src="url"
        style="width: 100%; min-height: 500px"
        frameborder="0"
        type="application/pdf"
      >
  </v-app>
</template>
<script>
  export default {
    data() {
      return {
        url: this.$route.query.url
      }
    },
    mounted () {
      window.console.log(typeof cordova);
    }
  }
</script>