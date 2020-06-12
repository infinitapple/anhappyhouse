import Vue from 'vue';
import Vuex from 'vuex';
import http from '@/util/http-common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login:false,
    userid:'',
    key:'',
    searchtext:'',
    items: [],
    item: {},
  },
  getters: {
    login(state){
        return state.login;
    },
    userid(state){
        return state.userid;
    },
    key(state){
        return state.key;
    },
    searchtext(state){
        return state.searchtext;
    },
    items(state) {
      return state.items;
    },
    item(state) {
      return state.item;
    },
  },
  mutations: {
    setsearchtext(state, payload){
        state.searchtext = payload
    },
    setBoards(state, payload) {
      state.items = payload;
    },
    setBoard(state, payload) {
      state.item = payload;
    },
  },
  actions: {
    getBoards(context) {
      http
        .get('/board')
        .then(({ data }) => {
          context.commit('setBoards', data);
        })
        .catch(() => {
          alert('에러가 발생했습니다.');
        });
    },
    getBoard(context, payload) {
      http.get(payload).then(({ data }) => {
        context.commit('setBoard', data);
      });
    },
  },
});
