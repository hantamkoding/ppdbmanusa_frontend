import Vue from 'vue'
// import __store from '@/store'
import _auth from './auth'
const _roles = {
  has: function (has_roles) {
    var is_admin =  _auth.refresh().data.is_admin;
    var roles = _auth.refresh().data.roles;

    if (is_admin || roles.includes(has_roles)) {
       return true;
    } else {
      return false;
    }
  }
}

const MyPlugin = {
   install(Vue) {
    window.$roles = _roles; 
    Vue.$roles = _roles; 
    Vue.prototype.$roles = _roles;
  }
};

Vue.use(MyPlugin)

export default _roles;
