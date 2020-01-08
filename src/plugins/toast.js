import Vue from 'vue'
import Notifications from 'vue-notification'
import Toasted from 'vue-toasted';

Vue.use(Notifications)
Vue.use(Toasted, {
	iconPack: 'mdi'
});

// Lets Register a Global Error Notification Toast.
Vue.toasted.register('app_error', 'Maaf terjadi kesalaham aplikasi..', {
    type : 'error',
    icon : 'error_outline'
})

const _pesan = {
	pesan: function(Status, Pesan) {
		if (Status) {
			_pesan.success(Pesan);
		} else {
			_pesan.error(Pesan);
		}
	},
	success: function(Pesan, title) {
		return Vue.notify({
			type: 'success',
			title: title,
			text: (Pesan ? Pesan : 'Terjadi Kesalahan Aplikasi....')
		});
	},
	error: function(Pesan, title) {
		return Vue.notify({
			type: 'error',
			title: title,
			text: (Pesan ? Pesan : 'Terjadi Kesalahan Aplikasi....')
		});
	},
	info: function(Pesan, title) {
		return Vue.notify({
			type: 'info',
			title: title,
			text: (Pesan ? Pesan : 'Terjadi Kesalahan Aplikasi....')
		});
	},
	app_error: function(Pesan) {
		return Vue.notify({
			type: 'error',
			title: 'Kesalahan Aplikasi',
			text: (Pesan ? Pesan : 'Terjadi Kesalahan Aplikasi....')
		});
	},
}
const MyPlugin = {
  install(Vue) {
    window.$pesan = _pesan; 
    Vue.$pesan = _pesan; 
    Vue.prototype.$pesan =  _pesan;
  }
};

Vue.use(MyPlugin);

export default _pesan;