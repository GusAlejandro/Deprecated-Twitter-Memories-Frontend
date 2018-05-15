// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// Initialize Firebase
// let FBconfig = {
//   apiKey: 'AIzaSyA8RWjHy25fGRtOFwGZ4XlOVSycQFs4-Qs',
//   authDomain: 'twitter-memories-file-storage.firebaseapp.com',
//   databaseURL: 'https://twitter-memories-file-storage.firebaseio.com',
//   projectId: 'twitter-memories-file-storage',
//   storageBucket: 'twitter-memories-file-storage.appspot.com',
//   messagingSenderId: '182189708225'
// }
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   if (requiresAuth) {
//     next('/')
//   } else {
//     next()
//   }
// })
