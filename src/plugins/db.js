import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

VueCookies.config('7d')

let _db = {
  set: function (key, data) {
    return window.$cookies.set(key, data);
  },
  get: function (key) {
    return window.$cookies.get(key);
  },
  remove: function (key) {
    return window.$cookies.remove(key);
  }
};

const MyPlugin = {
  install(Vue) {
    window.$db = _db; 
    Vue.$db = _db; 
    Vue.prototype.$db =  _db;
  }
};

Vue.use(MyPlugin);
export default _db;
