import Vue from 'vue'
// import __store from '@/store'
import __db from './db'
import Axios from './axios'
import __auth from './auth'
const _user_data = function () { return __db.get('detail_user') }

const _user = {
  data: _user_data(),
  get: function () {
    let vm = this;
    return Axios.get('user', {headers: __auth.hr()}).then((d) => {
      __db.set('detail_user', d.data);
      vm.data = d.data;
    });
  }
}

const MyPlugin = {
   install(Vue) {
    window.$user = _user; 
    Vue.$user = _user; 
    Vue.prototype.$user = _user;
  }
};

Vue.use(MyPlugin)

export default _user;
