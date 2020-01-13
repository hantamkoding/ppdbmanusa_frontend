<template>
	<v-container fluid class="fill-height bg-full">
		<v-row justify="center" align="center" style="overflow: hidden;">
			<v-col md="6" lg="4">
				<v-card class="p-2">
					<v-card-title>{{ $config.school }}</v-card-title>
					<v-card-text>
						Masukan data pengguna untuk masuk
						<v-form v-model="valid">
							<v-text-field
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
	</v-container>
</template>
<script>
	export default {
		data: () => {
			return  {
				valid: false,
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
				vm.$axios.post('login', {
					username: this.data.username,
					password: this.data.password
				}).then((d) => {
					if (d.data.status) {
						vm.$db.set('auth_user', d.data.data);
						vm.$auth.refresh();
						vm.$user.get().then(() => {
							vm.$router.replace({
								name: 'Dashboard'
							})
						});
					}
					vm.$pesan.pesan(d.data.status, d.data.pesan);
				})
			}
		},
		watch: {
		},
		mounted () {
		}
	}
</script>
<style>
	.bg-full {
		background: url("../assets/imgs/bg-pattern.png"), #7b4397;
		background: url("..//assets/imgs/bg-pattern.png"), linear-gradient(to left, #7b4397, #dc2430);
		overflow: hidden;
	}
</style>