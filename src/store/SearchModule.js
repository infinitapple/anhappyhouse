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
    dealitems: [], //for graph
    interestitems:[],
    item: {},
    apthouseinfo: {},
    dataset: {},

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
    'dealitems': state => state.dealitems,
    'item': state => state.item,
    
    'apthouseinfo': state => state.apthouseinfo,
    'dataset': state => state.dataset,
    'aptdiver': state => state.aptdiver,
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
    UPDATE_DEALITEMS(state, data) {
        state.dealitems = data
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

    setting_apthouseinfo(state) {
        if(!state.item)return;
        //item에서 정보 가져옴
        let moment = require('moment');
        let apthouseinfo={};
        if(state.item.kapt_name) apthouseinfo.kapt_name = state.item.kapt_name;
        apthouseinfo.kapt_acompany = state.item.kapt_acompany;
        apthouseinfo.kapt_tel = state.item.kapt_tel;
        apthouseinfo.road_name = state.item.road_name;

        apthouseinfo.saletages=[];
        if(state.item.sale_type) apthouseinfo.saletages.push(state.item.sale_type);
        let tmp_sale_type=[];

        let dataset = [];

        //dealitems에서 정보 가져옴
        for(let i=0;i<state.dealitems.length;i++){
            let now = state.dealitems[i];
            let datas = [];
            for(let j=0;j<now.length;j++){
                if(now[j].deal_money) tmp_sale_type[0]=true;
                if(now[j].deposit) tmp_sale_type[1]=true;
                if(now[j].rent_money) tmp_sale_type[2]=true;
                apthouseinfo.area = now[j].area;
                apthouseinfo.build_year = now[j].build_year;
                //eachdata
                let data=[];
                let date = now[j].deal_date+("00"+now[j].deal_day).slice(-2);
                data[0] = moment(date,'YYYYMMDD').format('YYYY.MM.DD');
                if(now[j].type==0)
                    data[1] = now[j].deal_money.replace(/[^\d]+/g, '');
                else if(now[j].type==1)
                    data[1] = now[j].deposit;
                else if(now[j].type==2)
                    data[1] = now[j].rent_money;
                else if(now[j].deal_money&&now[j].deal_money.length)
                    data[1] = now[j].deal_money.replace(/[^\d]+/g, '');
                else if(now[j].deposit&&now[j].deal_money.length)
                    data[1] = now[j].deposit;
                else if(now[j].rent_money&&now[j].deal_money.length)
                    data[1] = now[j].rent_money;
                datas.push(data);
                // if(j>1){
                //     datas[j-1][0]='';
                // }

            }
            dataset.push(datas);
        }

        for(let i=0;i<5;i++){
            if(tmp_sale_type[i]) apthouseinfo.saletages.push(state.aptdiver[i]);
        }
        state.apthouseinfo = apthouseinfo;
        //state.datasets = [[{x:,y:},{x:,y:}, ...], [{x:,y:},{x:,y:}, ...], ...]
        state.dataset = dataset;
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
        commit('UPDATE_DEALITEMS', []);
        commit('UPDATE_ITEM', {});
        
    },
    update_sido({state,commit}) {
        if(state.sido.length==0){
            //{sido_code, sido_name}
            console.log(apicommon.defaults.headers);
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
    async update_dealitems({commit},kapt_code) {
        let newdat=[];
        for(let type=0;type<2;type++){
            await apicommon
                .get('/housedeal?kapt_code='+kapt_code+'&type='+type)
                .then(({ data }) => {
                    newdat[type]=data;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        commit('UPDATE_DEALITEMS',newdat);
        return new Promise((resolve)=>{resolve()});
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
        http.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await http
            .post('/auth/wish/add',{userId,kaptCode})
            .then(({ data })=>{
                if(data=='fail')return false;
                return true;
            }).catch((err)=>{
                console.log(err);
                return false;
            });
    },
    async removeinterest({getters},{userId,kaptCode}){

        http.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await http
            .post('/auth/wish/delete',{userId,kaptCode})
            .then(({ data })=>{
                if(data=='fail')return false;
                return true;
            }).catch((err)=>{
                console.log(err);
                return false;
            });
    },
    
    async update_infoitemsfrominterest({getters,commit},userId) {
        http.defaults.headers.get['Authorization']="Bearer "+getters.access_token;
        return await http
            .get('/auth/wish/'+userId)
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
        http.defaults.headers.get['Authorization']="Bearer "+getters.access_token;
        return await http
            .get('/auth/wish/'+userId)
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
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
    actions
}