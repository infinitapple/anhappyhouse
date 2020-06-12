import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import usermodule from './UserModule.js';
import searchmodule from './SearchModule.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    user:usermodule,
    search:searchmodule
  },
  plugins:[
    createPersistedState({
      paths:['usermodule'],
    })
  ]
});
