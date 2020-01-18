import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css';
import VCurrencyField from 'v-currency-field'
import VueCurrencyFilter from 'vue-currency-filter'
import { VTextField } from 'vuetify/lib'  //Globally import VTextField
import VuetifyConfirm from 'vuetify-confirm'

Vue.component('v-text-field', VTextField)
Vue.use(Vuetify);
Vue.use(VCurrencyField, { 
  locale: 'id',
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0
})

Vue.use(VueCurrencyFilter, {
  symbol : 'Rp.',
  thousandsSeparator: '.',
  fractionCount: 2,
  fractionSeparator: ',',
  symbolPosition: 'front',
  symbolSpacing: true
})

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Lanjutkan',
  buttonFalseText: 'Batal',
  color: 'red',
  icon: 'mdi-alert-circle-outline',
  title: 'Peringatan !!!',
  width: 350,
  property: '$confirm'
})

export default vuetify