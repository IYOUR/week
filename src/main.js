// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$http= axios;
Vue.config.productionTip = false
require("./MixedKeyboard.js");
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
	if (to.name == 'home') {
		sessionStorage.removeItem('vpl_number');
	}
	let vpl_number = sessionStorage.getItem('vpl_number');
	if (!vpl_number && to.name != 'home') {
		next({ name: 'home'})
	} else {
		next()
	}
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
