import Vue from 'vue';
import axios from "axios";
import Config from '@/config';
import _toast from './toast';
import _auth from './auth';
import Loading from 'vue-loading-overlay';

// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
// Init plugin
Vue.use(Loading);
 
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = (_auth.status ? 'Bearer ' + _auth.data.token : null);
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
var _loading ;
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  baseURL: Config.api_url
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    if (config.method == 'post') {
      _loading = Vue.$loading.show();
    }
    // Do something before request is sent
    if (_auth.refresh().status) {
      config.headers.Authorization = 'Bearer ' + _auth.refresh().data.token;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    if (typeof _loading != 'undefined') {
      _loading.hide();
    }
    // Do something with response data
    return response;
  },
  function(error) {
    if (typeof _loading != 'undefined') {
      _loading.hide();
    }

    _toast.app_error(error);
    if (error.response.status == 401) {
      _auth.logout();
    }
    window.console.log(error.response);
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
// Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default _axios;
