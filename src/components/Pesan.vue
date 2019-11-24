<template>
	<v-snackbar
      :color="color"
      v-model="snackbar"
    >
      {{ pesan }}
      <v-btn
        color="white"
        @click="snackbar = false" 
        icon
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
	</v-snackbar>
</template>
<script>
	import bus from '@/bus'
	export default {
		data () {
			return {
				snackbar: false,
				pesan: '',
				color: 'success'
			}
		},
		mounted () {
			let vm = this;
			bus.$on('pesan', data => {
				vm.snackbar = true;
				vm.pesan = data.pesan;
				vm.color = ( data.success ? 'success' : 'danger' );
				window.console.log(data);
			});
		}
	}
</script>