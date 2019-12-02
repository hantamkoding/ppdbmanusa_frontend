"use strict";

import Vue from 'vue';
import './db';
let _auth_user = Vue.$db.get('auth_user');
let _auth = {
  status: (_auth_user ? true : false)
}
const MyPlugin = {
  install(Vue) {
    Window.$auth = _auth; 
    Vue.$auth = _auth; 
    Object.defineProperties(Vue.prototype, {
      $auth: {
        get() {
          return _auth;
        }
      },
    });


  }
};

Vue.use(MyPlugin)
export default MyPlugin;
