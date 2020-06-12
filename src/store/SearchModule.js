import http from '@/util/http-api';

const state = {
    stext:'',
    slist:[],
    sido:[],
    gugun:[],
    dong:[],
    infoitems: [], //for map
    dealitems: [], //for graph
    item: {},
}

const getters = {
    'stext': state => state.stext,
    'slist': state => state.slist,
    'sido': state => state.sido,
    'gugun': state => state.gugun,
    'dong': state => state.dong,
    'infoitems': state => state.infoitems,
    'dealitems': state => state.dealitems,
    'item': state => state.item,
}

const mutations = {
    UPDATE_STEXT(state, data) {
        state.stext = data
    },
    UPDATE_SLIST(state, data) {
        state.slist = data
    },
    UPDATE_SIDO(state, data) {
        state.sido = data
    },
    UPDATE_GUGUN(state, data) {
        state.gugun = data
    },
    UPDATE_DONG(state, data) {
        state.dong = data
    },
    UPDATE_INFOITEMS(state, data) {
        state.infoitems = data
    },
    UPDATE_DEALITEMS(state, data) {
        state.dealitems = data
    },
    UPDATE_ITEM(state, data) {
        state.item = data
    },
}

const actions = {
    update_stext({commit},stextdata) {
        commit('UPDATE_STEXT', stextdata);
    },
    update_sido({commit}) {
        http
            .get('/sido/getsido')
            .then(({ data }) => {
                commit('UPDATE_SIDO', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_gugun({commit}, sido) {
        http
            .get('/sido/getgugun',{sido})
            .then(({ data }) => {
                commit('UPDATE_GUGUN', data);
            });
    },
    update_dong({commit}, gun,code) {
        http
            .get('/sido/getdong',{gun,code})
            .then(({ data }) => {
                // let donglist=[];
                // data.foreach(item=>{donglist.push(item.dong);});
                commit('UPDATE_DONG', data);
            });
    },
    update_infoitems({commit},dong,code) {
        http
            .get('/apt/getapt',{dong,code})
            .then(({ data }) => {
                commit('UPDATE_INFOITEMS', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_dealitems({commit},AptName ,code) {
        http
            .get('/apt/getdeal',{AptName ,code})
            .then(({ data }) => {
                commit('UPDATE_ITEMS', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_item({commit}, payload) {
        http
            .get(payload)
            .then(({ data }) => {
                commit('UPDATE_ITEM', data);
            });
    },
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
    actions
}