import Vue from 'vue';
import _db from './db' ;
import _router from '@/router'
const _auth_data = _db.get('auth_user');
const _auth = {
  data: _auth_data,
  status: ( _auth_data ? true : false),
  refresh: function () {
    let tmp = _db.get('auth_user');
    this.data = tmp;
    this.status = (tmp ? true : false);
    return this;
  },
  hr: function () {
    return {
      'Authorization': (this.refresh().status ? 'Bearer ' + this.refresh().data.token : null )
    }; 
  },
  logout: function () {
    _db.remove('auth_user');
    this.status = false;
    this.data=null;
    window.console.log(_router.replace({name: 'Login'}));
  }
}

const MyPlugin = {
  install(Vue) {
    window.$auth = _auth; 
    Vue.$auth = _auth; 
    Vue.prototype.$auth = _auth;
  }
};

Vue.use(MyPlugin)
export default _auth;
