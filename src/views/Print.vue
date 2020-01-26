<template>
  <v-app>
    <div v-if="$store.state.is_mobile">
      <v-btn color="success" rounded outlined :href="url"><v-icon left>mdi-cloud-download-outline</v-icon> Download Dokumen</v-btn>
    </div>
    <div v-else>
      <embed
        :src="url"
        style="width: 100%; min-height: 500px"
        frameborder="0"
        type="application/pdf"
      >
    </div>
  </v-app>
</template>
<script>
  // import pdf from 'vue-pdf'
  export default {
    data() {
      return {
        url: this.$route.query.url,
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>