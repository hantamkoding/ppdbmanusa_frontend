import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/id'
const _moment = moment;

const MyPlugin = {
  install(Vue) {
    window.$moment = _moment; 
    Vue.$moment = _moment; 
    Vue.prototype.$moment =  _moment;
  }
};

Vue.use(MyPlugin);

export default _moment;
