import http from '../util/http-auth';

const state = {
    login:false,
    userid:'',
    key:'',
    userinfo:{
        user_id:'',
        user_name:'',
        email:'',
        address:''
    }
}
const getters = {
    'login': state => state.login,
    'userid': state => state.userid,
    'key': state => state.key,
    'userinfo': state => state.userinfo,
}

const mutations = {
    UPDATE_LOGIN(state, data) {
        state.login = data
    },
    UPDATE_USERID(state, data) {
        state.userid = data
    },
    UPDATE_KEY(state, data) {
        state.key = data
    },
    UPDATE_USERINFO(state, data) {
        state.userinfo = data
    },
}

const actions = {
    action_login({commit}, id,pwd) {
        http
            .post('/login',{id,pwd})
            .then(({ data }) => {
                commit('UPDATE_LOGIN', true);
                commit('UPDATE_USERID', id);
                commit('UPDATE_KEY', data);
            })
            .catch(() => {
                commit('UPDATE_LOGIN', false);
            });
    },
    action_logout({commit}) {
        commit('UPDATE_LOGIN', false);
        commit('UPDATE_KEY', '');
    },
    action_getuserinfo({getters,commit}) {
        http
            .get('/user/getuserinfo/'+getters.userid)
            .then(({ data }) => {
                commit('UPDATE_USERINFO', data);
            })
            .catch(() => {
                commit('UPDATE_LOGIN', false);
            });
    },
    action_changepwd({commit},id,pwd) {
        http
            .put('/changepwd',{id,pwd})
            .then(() => {
            })
            .catch(() => {
                commit('UPDATE_LOGIN', false);
            });
    },
    action_changeuserinfo({commit},userdata) {
        http
            .put('/changeuserinfo',userdata)
            .then(() => {
                commit('UPDATE_USERINFO', userdata);
            })
            .catch(() => {
                commit('UPDATE_LOGIN', false);
            });
    },
    action_resign({commit},user_id,user_pwd) {
        http
            .delete('/resign',{user_id,user_pwd})
            .then(() => {
            })
            .catch(() => {
                commit('UPDATE_LOGIN', false);
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