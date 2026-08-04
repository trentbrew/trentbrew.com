import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { inject } from '@vercel/analytics'

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// Initialize Vercel Web Analytics for SPA tracking
// Page views are tracked automatically after injection
inject()
