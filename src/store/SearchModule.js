import http from '@/util/http-api';

const state = {
    stext:'',
    items: [],
    item: {},
}

const getters = {
    'stext': state => state.stext,
    'items': state => state.items,
    'item': state => state.item,
}

const mutations = {
    UPDATE_STEXT(state, data) {
        state.stext = data
    },
    UPDATE_ITEMS(state, data) {
        state.items = data
    },
    UPDATE_ITEM(state, data) {
        state.item = data
    },
}

const actions = {
    update_stext({commit},stextdata) {
        commit('UPDATE_STEXT', stextdata);
    },
    update_items(context) {
        http
            .get('/board')
            .then(({ data }) => {
                context.commit('UPDATE_ITEMS', data);
            })
            .catch(() => {
                alert('에러가 발생했습니다.');
            });
    },
    update_item(context, payload) {
        http
            .get(payload)
            .then(({ data }) => {
                context.commit('UPDATE_ITEM', data);
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