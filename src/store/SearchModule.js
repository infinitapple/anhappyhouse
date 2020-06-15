import http from '../util/http-api';

const state = {
    stext:'',
    slist:[],
    sido:[],
    gugun:[],
    dong:[],
    bjd_code:'',
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
    'bjd_code': state => state.bjd_code,
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
    UPDATE_BJD_CODE(state, data) {
        state.bjd_code = data
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
    update_sido({state,commit}) {
        if(state.sido.length==0){
            //{sido_code, sido_name}
            http
                .get('/bjdcode/sido')
                .then(({ data }) => {
                    commit('UPDATE_SIDO', data);
                })
                .catch(() => {
                    alert('에러가 발생했습니다.');
                });
        }
    },
    update_gugun({commit}, sido_code) {
        //{sigungu_code, sigungu_name}
        http
            .get('/bjdcode/sigungu/'+sido_code)
            .then(({ data }) => {
                commit('UPDATE_GUGUN', data);
            });
    },
    update_dong({commit}, sigungu_code) {
        //[{bjd_code, sido_name, sigungu_name, bjd_name},...]
        http
            .get('/bjdcode/bjd/'+sigungu_code)
            .then(({ data }) => {
                commit('UPDATE_DONG', data);
            });
    },
    update_bjd_code({commit}, bjd_code) {
        commit('UPDATE_BJD_CODE', bjd_code);
    },
    update_infoitems({state,commit},option) {
        //option == aptinfo, houseinfo
        http
            .get('/subnav/'+option+'/'+state.bjd_code)
            .then(({data}) => {
                commit('UPDATE_INFOITEMS', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_infoitemsfromtext({state,commit},option) {
        //option == aptinfo, houseinfo
        http
            .post('/search/'+option,state.stext,{headers:{'Content-type': 'html/text'}})
            .then(({ data }) => {
                commit('UPDATE_INFOITEMS', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_dealitems({commit},kapt_code ,type) {
        http
            .get('/housedeal',{kapt_code ,type})
            .then(({ data }) => {
                commit('UPDATE_DEALITEMS', data);
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