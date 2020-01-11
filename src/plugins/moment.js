import Vue from 'vue'
import _moment from 'moment'

const MyPlugin = {
  install(Vue) {
    window.$moment = _moment; 
    Vue.$moment = _moment; 
    Vue.prototype.$moment =  _moment;
  }
};

Vue.use(MyPlugin);

export default _moment;
