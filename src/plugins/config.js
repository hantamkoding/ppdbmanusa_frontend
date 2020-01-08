import Vue from 'vue';
import Config from '@/config';

let __config = Config;
const MyPlugin = {
  install(Vue) {
    window.$config = __config; 
    Vue.$config = __config; 
    Vue.prototype.$config= __config;
  }
};

Vue.use(MyPlugin)

export default __config;