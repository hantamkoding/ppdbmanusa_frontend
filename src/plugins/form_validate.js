import Vue from 'vue'
const _formRules = {
  required: v => !!v || 'Wajib diisi',
  length: len => v => (v || '').length >= len || `Wajib diisi, required ${len}`,
};

const MyPlugin = {
   install(Vue) {
    window.$formRules = _formRules; 
    Vue.$formRules = _formRules; 
    Vue.prototype.$formRules = _formRules;
  }
};

Vue.use(MyPlugin)



export default _formRules