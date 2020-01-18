<template>
  <v-app>
      <embed
        :src="url"
        style="width: 100%; min-height: 500px"
        frameborder="0"
      >
  </v-app>
</template>
<script>
  export default {
    data() {
      return {
        url: this.$route.query.url
      }
    } 
  }
</script>