import http from '../util/http-api';

const state = {
    stext:'',
    stype:'aptinfo',
    slist:[],

    sido:[],
    gugun:[],
    dong:[],
    bjd_code:'',
    updateselectbox:false,
    movecenter:false,

    infoitems: [], //for map
    dealitems: [], //for graph
    item: {},
}

const getters = {
    'stext': state => state.stext,
    'stype': state => state.stype,
    'slist': state => state.slist,

    'sido': state => state.sido,
    'gugun': state => state.gugun,
    'dong': state => state.dong,
    'bjd_code': state => state.bjd_code,
    'updateselectbox': state => state.updateselectbox,
    'movecenter': state => state.movecenter,

    'infoitems': state => state.infoitems,
    'dealitems': state => state.dealitems,
    'item': state => state.item,
}

const mutations = {
    UPDATE_STEXT(state, data) {
        state.stext = data
    },
    UPDATE_STYPE(state, data) {
        state.stype = data
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
    UPDATE_SELECTBOX(state, data) {
        state.updateselectbox = data
    },
    UPDATE_MOVE(state, data) {
        state.movecenter = data
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
    movemap({state,commit},bjd_code){
        if(state.bjd_code!=bjd_code){
            commit('UPDATE_BJD_CODE',bjd_code);
            commit('UPDATE_SELECTBOX',true);
        }
    },
    update_movecenter({commit},data){
        commit('UPDATE_MOVE',data);
    },
    update_selectbox({commit},data){
        commit('UPDATE_SELECTBOX',data);
    },
    update_stype({commit},stype) {
        commit('UPDATE_STYPE', stype);
    },
    update_sido({state,commit}) {
        if(state.sido.length==0){
            //{sido_code, sido_name}
            http
                .get('/bjdcode/sido')
                .then(({ data }) => {
                    commit('UPDATE_SIDO', data);
                    commit('UPDATE_GUGUN', []);
                    commit('UPDATE_DONG', []);
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
                commit('UPDATE_DONG', []);
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
    update_infoitemsfromtext({state,commit}) {
        //option == aptinfo, houseinfo
        http
            .post('/search/'+state.stype,state.stext,{headers:{'Content-type': 'html/text'}})
            .then(({ data }) => {
                commit('UPDATE_INFOITEMS', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_dealitems({commit},{kapt_code ,type}) {
        http
            .get('/housedeal?kapt_code='+kapt_code+'&type='+type)
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
    update_itemlatlng(context, payload) {
        console.log(payload);
        http.post('/public/addLatLng',payload)
        .then(()=>{console.log("update success")})
        .catch(()=>{console.log("update fail")});
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