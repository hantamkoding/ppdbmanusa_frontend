"use strict";

import Vue from 'vue';

const _db = {
  store: 'asdasd'
}

MyPlugin.install = function (Vue, options) {
  // 1. add global method or property
  Vue.myGlobalMethod = function () {
    // some logic ...
  }

  // 2. add a global asset
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // some logic ...
    }
  })

  // 3. inject some component options
  Vue.mixin({
    created: function () {
      // some logic ...
    }
  })

  // 4. add an instance method
  Vue.prototype.$myMethod = function (methodOptions) {
    // some logic ...
  }
}

