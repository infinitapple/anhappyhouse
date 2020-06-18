import http from '../util/http-api';
import apicommon from '../util/http-api';

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
    interestmode:false,

    infoitems: [], //for map
    dealitems0: [], //for graph
    dealitems1: [], //for graph
    dealitems2: [], //for graph
    interestitems:[],
    item: {},
    apthouseinfo: {},
    dataset: {list:[['t'],['e'],['s'],['t'],[]]},

    dataset0:[],
    dataset1:[],
    dataset2:[],
    avgmoney1:0,
    avgmoney2:0,

    aptdiver: ['매매','전세','월세','오피스텔','기타'],
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
    'interestmode': state => state.interestmode,
    'interestitems': state => state.interestitems,

    'infoitems': state => state.infoitems,
    'dealitems0': state => state.dealitems0,
    'dealitems1': state => state.dealitems1,
    'dealitems2': state => state.dealitems2,
    'item': state => state.item,
    
    'apthouseinfo': state => state.apthouseinfo,
    'dataset': state => state.dataset,
    'aptdiver': state => state.aptdiver,

    'dataset0': state => state.dataset0,
    'dataset1': state => state.dataset1,
    'dataset2': state => state.dataset2,

    'avgmoney0': state => state.avgmoney0,
    'avgmoney1': state => state.avgmoney1,
    'avgmoney2': state => state.avgmoney2,
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
    UPDATE_interestmode(state, data) {
        state.interestmode = data
    },
    UPDATE_interestitems(state, data) {
        state.interestitems = data
    },

    UPDATE_INFOITEMS(state, data) {
        state.infoitems = data
    },
    UPDATE_DEALITEMS0(state, data) {
        state.dealitems0 = data
    },
    UPDATE_DEALITEMS1(state, data) {
        state.dealitems1 = data
    },
    UPDATE_DEALITEMS2(state, data) {
        state.dealitems2 = data
    },
    UPDATE_ITEM(state, data) {
        state.item = data
    },
    UPDATE_apthouseinfo(state, data) {
        state.apthouseinfo = data
    },
    UPDATE_dataset(state, data) {
        state.dataset = data
    },
    
    reset_dataset(state){
        state.dataset0=[];
        state.dataset1=[];
        state.dataset2=[];
    },

    setting_dataset(state,i) {
        if(!state.item)return;
        //item에서 정보 가져옴
        let moment = require('moment');
        let now = null;
        if(i==0){
            now = state.dealitems0;
        }else if(i==1){
            now = state.dealitems1;
        }else if(i==2){
            now = state.dealitems2;
        }
        if(now&&now.length){
            let datas = [];
            let sum=0;
            for(let j=0;j<now.length;j++){
                let data=[];
                let date = now[j].deal_date+("00"+now[j].deal_day).slice(-2);
                data[0] = moment(date,'YYYYMMDD').format('YYYY.MM.DD');
                if(i==0){
                    data[1] = (now[j].deal_money.replace(/[^\d]+/g, ''))*1;
                }else if(i==1){
                    data[1] = (now[j].deposit.replace(/[^\d]+/g, ''))*1;
                }else if(i==2){
                    data[1] = (now[j].rent_money)*1;
                }
                sum+=data[1];
                datas.push(data);
            }
            if(i==0){
                state.dataset0 =datas;
                state.avgmoney0 = Math.round(sum/datas.length);
            }else if(i==1){
                state.dataset1 =datas;
                state.avgmoney1 = Math.round(sum/datas.length);
            }else if(i==2){
                state.dataset2 =datas;
                state.avgmoney2 = Math.round(sum/datas.length);
            }
        }

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
    update_pagemove({commit}){
        commit('UPDATE_GUGUN', []);
        commit('UPDATE_DONG', []);
        commit('UPDATE_BJD_CODE', '');
        commit('UPDATE_STEXT', '');
        commit('UPDATE_INFOITEMS', []);
        commit('UPDATE_DEALITEMS0', []);
        commit('UPDATE_DEALITEMS1', []);
        commit('UPDATE_DEALITEMS2', []);
        commit('UPDATE_ITEM', {});
        
    },
    update_sido({state,commit}) {
        if(state.sido.length==0){
            //{sido_code, sido_name}
            apicommon
                .get('/bjdcode/sido')
                .then(({ data }) => {
                    commit('UPDATE_SIDO', data);
                    commit('UPDATE_GUGUN', []);
                    commit('UPDATE_DONG', []);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    update_gugun({commit}, sido_code) {
        //{sigungu_code, sigungu_name}
        apicommon
            .get('/bjdcode/sigungu/'+sido_code)
            .then(({ data }) => {
                commit('UPDATE_GUGUN', data);
                commit('UPDATE_DONG', []);
            });
    },
    update_dong({commit}, sigungu_code) {
        //[{bjd_code, sido_name, sigungu_name, bjd_name},...]
        apicommon
            .get('/bjdcode/bjd/'+sigungu_code)
            .then(({ data }) => {
                commit('UPDATE_DONG', data);
            });
    },
    update_bjd_code({commit}, bjd_code) {
        commit('UPDATE_BJD_CODE', bjd_code);
    },
    async update_infoitems({state,commit}) {
        //option == aptinfo, houseinfo
        return await apicommon
            .get('/subnav/'+state.stype+'/'+state.bjd_code)
            .then(({data}) => {
                if(data=='fail')return false;
                commit('UPDATE_INFOITEMS', data);
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    },
    async update_infoitemsfromtext({state,commit}) {
        //option == aptinfo, houseinfo
        return await apicommon
            .post('/search/'+state.stype,state.stext,{headers:{'Content-type': 'html/text'}})
            .then(({ data }) => {
                if(data=='fail')return false;
                commit('UPDATE_INFOITEMS', data);
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    },
    async update_dealitems({commit},{type,kapt_code}) {
        return await apicommon
           .get('/housedeal?kapt_code='+kapt_code+'&type='+type)
           .then(({ data }) => {
                if(type==0){
                    commit('UPDATE_DEALITEMS0',data);
                }else if(type==1){
                    commit('UPDATE_DEALITEMS1',data);
                }else if(type==2){
                    commit('UPDATE_DEALITEMS2',data);
                }
           })
           .catch((err) => {
               console.log(err);
           });
    },
    update_item({commit}, payload) {
        apicommon
            .get(payload)
            .then(({ data }) => {
                commit('UPDATE_ITEM', data);
            });
    },
    update_itemlatlng(context, payload) {
        console.log(payload);
        apicommon.post('/public/addLatLng',payload)
        .then(()=>{console.log("update success")})
        .catch(()=>{console.log("update fail")});
    },

    async addinterest({getters},{userId,kaptCode}){
        console.log({userId,kaptCode});
        //http.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await http
            .post('/auth/wish/add',{userId,kaptCode},getters.bearertoken)
            .then((res)=>{
                console.log(res);
                if(res.data=='fail')return false;
                getters.interestitems.push({})
                return true;
            }).catch((err)=>{
                console.log(err);
                return false;
            });
    },
    async removeinterest({getters},{userId,kaptCode}){

        //http.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await http
            .post('/auth/wish/delete',{userId,kaptCode},getters.bearertoken)
            .then(({ data })=>{
                if(data=='fail')return false;
                return true;
            }).catch((err)=>{
                console.log(err);
                return false;
            });
    },
    
    async update_infoitemsfrominterest({getters,commit},userId) {
        //http.defaults.headers.get['Authorization']="Bearer "+getters.access_token;
        return await http
            .get('/auth/wish/'+userId,getters.bearertoken)
            .then(({ data }) => {
                if(data=='fail')return false;
                commit('UPDATE_INFOITEMS', data);
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    },

    async update_interestitems({getters,commit},userId) {
        //http.defaults.headers.get['Authorization']="Bearer "+getters.access_token;
        return await http
            .get('/auth/wish/'+userId,getters.bearertoken)
            .then((res) => {
                console.log(res);
                if(res.data=='fail')return false;
                commit('UPDATE_interestitems', res.data);
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
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