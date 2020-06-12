import http from '@/util/http-auth';

const state = {
    login:false,
    userid:'',
    key:'',
}

const getters = {
    'login': state => state.login,
    'userid': state => state.userid,
    'key': state => state.key,
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
}

const actions = {
    login({commit}, logindata) {
        http
            .get('/board',logindata)
            .then(({ data }) => {
                commit('UPDATE_LOGIN', true);
                commit('UPDATE_USERID', logindata.id);
                commit('UPDATE_KEY', data);
            })
            .catch(() => {
                commit('UPDATE_LOGIN', false);
                alert('로그인 중 에러가 발생했습니다.');
            });
    },
    logout({commit}) {
        commit('UPDATE_LOGIN', false);
    }
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
    actions
}