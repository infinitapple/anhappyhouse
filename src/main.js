import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const cors = require('cors');
Vue.use(cors);


if (window.location.hostname.indexOf('local')>-1){
  Vue.config.productionTip = true
}else{
  Vue.config.productionTip = false
}



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
