import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'chart.js'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)

// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
// Vue.use(Vuetify);

//import moment from 'moment';
//import VueMomentJS from 'vue-momentjs';

import Chartkick from 'chartkick';
import VueChartkick from 'vue-chartkick';

//Vue.user(VueMomentJS,moment)
Vue.use(VueChartkick, { Chartkick });

const cors = require('cors');
Vue.use(cors);


if (window.location.hostname.indexOf('local')>-1){
  Vue.config.productionTip = true
}else{
  Vue.config.productionTip = false
}

new Vue({
//  vuetify : new Vuetify(),
  store,
  router,
  render: h => h(App),
}).$mount('#app')
