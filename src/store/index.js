import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
import user from './UserModule.js';
import search from './SearchModule.js';
import modal from './ModalModule.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user,
    search,
    modal,
  },
  plugins:[
    createPersistedState({
      paths:['user'],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key,state,{ expires: 1 }),

      // storage:{
      //   getItem: key => {
      //     console.log('get');
      //     console.log(key);
      //     Cookies.get(key)
      //   },
      //   setItem: (key, value) => {
      //     console.log('set');
      //     console.log(key);
      //     console.log(value);
      //     Cookies.set(key, value, { expires: 3, secure: true })
      //   },
      //   removeItem: key => {
      //     console.log('rem');
      //     console.log(key);
      //     Cookies.remove(key)
      //   }
      // },
      //paths:['user','search'],
    })
  ]
});
