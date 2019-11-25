<template>
	<v-container>
		<v-row justify="center" align="center" style="height: 100vh">
			<v-col md="4">
				<v-card class="p-2" :dark="db.state.config.dark">
					<v-card-title>Halaman Masuk</v-card-title>
					<v-card-text>
						Masukan data pengguna untuk masuk
						<v-form v-model="valid">
							<v-text-field
								ref="from"
								prepend-icon="mdi-account"
								v-model="data.username"
								:counter="10"
								:rules="rules.username"
								required
							></v-text-field>
							<v-text-field
								prepend-icon="mdi-lock"
								:append-icon="data.showPwd ? 'mdi-eye' : 'mdi-eye-off'"
								@click:append="data.showPwd ? data.showPwd = false : data.showPwd = true"
								v-model="data.password"
								:counter="5"
								:type="!data.showPwd ? 'password' : 'text'"
								:rules="rules.password"
								required
							></v-text-field>
							<v-btn
								:disabled="!valid"
								:rounded="true"
								color="success"
								:right="true"
								@click="submit"
							>Masuk Sekarang</v-btn>
						</v-form>
					</v-card-text>
				</v-card>
			</v-col> 
		</v-row>
		<pesan/>
	</v-container>
</template>
<script>
	import db from '@/store'
	import Pesan from '@/components/Pesan'
	import bus from '@/bus'
	export default {
		components: {
			Pesan
		},
		data: () => {
			return  {
				valid: false,
				db,
				data: {
					username: '',
					password: '',
					showPwd: false,
				},
				rules: {
					username: [
						v => !!v || 'Username wajib diisi',
						v => v.length <= 10 || 'Username maksimal 10 karakter'
					],
					password: [
						v => !!v || 'Password wajib di isi',
						v => v.length >= 5 || 'Password minimal 6 karakter'
					]

				}
			}
		},
		methods: {
			submit () {
				let vm = this;
				this.axios.post('login', {
					username: vm.data.username,
					password: vm.data.password
				}).then((d) => {
					bus.$emit('pesan', {
						success: true,
						pesan: 'google.com'
					});
					window.console.log(d);
				})
				
			}
		},
		watch: {
		},
		mounted () {
		}
	}
</script>