<template>
  <v-app class="splashscreen">
    <v-container class="fill-height" align="center">
      <v-row justify="center" align="center">
        <v-col align="Center">
          <v-progress-circular
            :size="40"
            color="success"
            indeterminate
          >
          </v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
  <!-- <v-spn -->
</template>
<script>
  export default {
    mounted () {
        setTimeout(() => {

          if (this.$auth.status) {
            this.$router.replace({
              name: 'Dashboard'
            });
          }  else {
            this.$router.replace({
              name: 'Login'
            });
          }

        }, 2000);
    }
  }
</script>
<style>
  .splashscreen {
    background: #333!important;
  }
</style>