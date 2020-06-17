import auth from '../util/http-auth';
import api from '../util/http-api';
const querystring = require('querystring');

const state = {
    login:false,
    userid:'',
    userinfo:{
        userId :'',
        userType :'',
        userName :'',
        email:'',
        address:'',
        joindate :''
    },
    access_token:'',
    token_type:'',
    refresh_token:'',
    expires_in:0,
    scope:'',
}
const getters = {
    'login': state => state.login,
    'userid': state => state.userid,
    'userinfo': state => state.userinfo,
    'access_token': state => state.access_token,
    'token_type': state => state.token_type,
    'refresh_token': state => state.refresh_token,
    'expires_in': state => state.expires_in,
    'scope': state => state.scope,
}

const mutations = {
    UPDATE_LOGIN(state, data) {
        state.login = data
    },
    UPDATE_USERID(state, data) {
        state.userid = data
    },
    UPDATE_USERINFO(state, data) {
        state.userinfo = data
    },
    UPDATE_access_token(state, data) {
        state.access_token = data
    },
    UPDATE_token_type(state, data) {
        state.token_type = data
    },
    UPDATE_refresh_token(state, data) {
        state.refresh_token = data
    },
    UPDATE_expires_in(state, data) {
        state.expires_in = data
    },
    UPDATE_scope(state, data) {
        state.scope = data
    },

    UPDATE_logout(state) {
        state.login=false;
        state.access_token='';
        //api.defaults.headers.get['Authorization']='';
        //api.defaults.headers.post['Authorization']='';
    },

}
const actions = {
    settoken({state}){
        console.log('set token');
        if(state.access_token.length){
            console.log('set ok');
            //api.defaults.headers.common['Authorization']="Bearer "+state.access_token;
        }
    },
    //에러처리
    async tokenrefresh({commit},err){
        console.log(err);
        commit('UPDATE_logout');
        // if(err&&err.error&&err.error=='invalid_token'&&err.error_description
        // &&err.error_description.indexOf('expired')>-1){//에러 종류가 기간만료라면//
        //     //refresh_token으로 access_token업데이트 시도
        //     let qs = querystring.stringify({'username':state.userid,'refresh_token':state.refresh_token,'grant_type':'password'});
        //     await auth
        //     .post('/oauth/token',qs,{Authorization:'Basic YW5oYXBweWhvdXNlOmhhcHB5aG91c2U='})
        //     .then(({ data }) => {
        //         if(data=='fail')return false;
        //         commit('UPDATE_LOGIN', true);
        //         commit('UPDATE_access_token', data.access_token);
        //         commit('UPDATE_token_type', data.token_type);
        //         if(data.refresh_token)
        //             commit('UPDATE_refresh_token', data.refresh_token);
        //         commit('UPDATE_expires_in', data.expires_in);
        //         commit('UPDATE_scope', data.scope);
        //         api.defaults.headers.common['Authorization']="Bearer "+data.access_token;
        //         return true;
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         //.catch 업데이트 실패시 로그아웃 처리
        //         commit('UPDATE_logout');
        //         return false;
        //     }).then((rst)=>{
        //         if(rst){
        //             //.then 업데이트 성공시
        //             console.log('token refresh');
        //         }
        //     });
        // }else{
        //     //에러 종류가 유효하지 않은 인증키라면 로그아웃
        //     commit('UPDATE_logout');
        // }
    },
    async action_login({commit}, {id,pwd}) {
        // commit('UPDATE_LOGIN', true);
        // commit('UPDATE_USERID', id);
        // commit('UPDATE_KEY', pwd);
        // return new Promise((resolve)=>{resolve()});
        
        //const username = 'anhappyhouse'
        //const password = 'happyhouse'
        //const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
        let qs = querystring.stringify({'username':id,'password':pwd,'grant_type':'password'});
        return await auth
            .post('/oauth/token',qs,{Authorization:'Basic YW5oYXBweWhvdXNlOmhhcHB5aG91c2U='})
            .then(({ data }) => {
                if(data=='fail')return false;
                commit('UPDATE_LOGIN', true);
                commit('UPDATE_USERID', id);
                commit('UPDATE_access_token', data.access_token);
                commit('UPDATE_token_type', data.token_type);
                commit('UPDATE_refresh_token', data.refresh_token);
                commit('UPDATE_expires_in', data.expires_in);
                commit('UPDATE_scope', data.scope);
                return true;
            })
            .catch((err) => {
                console.log(err);
                commit('UPDATE_logout');
                return false;
            });
    },
    async action_getuserinfo({getters,commit,dispatch}) {
        //http.defaults.headers.get['Access-Control-Allow-Origin']='*';
        //api.defaults.headers.get['Authorization']="Bearer "+getters.access_token;
        return await api
            .get('/auth/user/'+getters.userid,{Authorization:"Bearer "+getters.access_token})
            .then(({ data }) => {
                if(data=='fail')return false;
                commit('UPDATE_USERINFO', data);
                return true;
            })
            .catch((err) => {
                console.log(err);
                dispatch('tokenrefresh',err);
                //commit('UPDATE_logout');
                return false;
            });
    },
    async action_changepwd({getters,dispatch},{userId,userPwd}) {
        //api.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await api
            .post('/auth/user/change',{userId,userPwd},{Authorization:"Bearer "+getters.access_token})
            .then(({data}) => {
                if(data=='fail')return false;
                else return true;
            })
            .catch((err) => {
                console.log(err);
                dispatch('tokenrefresh',err);
                //commit('UPDATE_logout');
                return false;
            });
    },
    async action_changepwdwithoutlogin({dispatch},{userId,userName,userPwd}) {
        console.log({userId,userName,userPwd});
        return await api
            .post('/changepwd',{userId,userName,userPwd})
            .then(({data}) => {
                if(data=='fail')return false;
                else return true;
            })
            .catch((err) => {
                console.log(err);
                dispatch('tokenrefresh',err);
                //commit('UPDATE_logout');
                return false;
            });
    },
    async action_changeuserinfo({getters,commit,dispatch},userdata) {
        //api.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await api
            .post('/auth/user/modify',userdata,{Authorization:"Bearer "+getters.access_token})
            .then(() => {
                commit('UPDATE_USERINFO', userdata);
                return true;
            })
            .catch((err) => {
                console.log(err);
                dispatch('tokenrefresh',err);
                //commit('UPDATE_logout');
                return false;
            });
    },
    async action_resign({getters,commit,dispatch},{userId,userPwd}) {
        //api.defaults.headers.post['Authorization']="Bearer "+getters.access_token;
        return await api
            .post('/auth/user/delete',{userId,userPwd},{Authorization:"Bearer "+getters.access_token})
            .then(({data}) => {
                if(data=='fail')return false;
                commit('UPDATE_logout');
                return true;
            })
            .catch((err) => {
                console.log(err);
                dispatch('tokenrefresh',err);
                //commit('UPDATE_logout');
                return false;
            });
    },
    async action_signup(context,uerdata) {
        return await api.post('/signup',uerdata)
        .then(({data}) => {
            if(data=='fail')return false;
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