const state = {
    loginmodal:false,
    infomodal:false,
    searchmodal:false,
    interestmodal:false,
}

const getters = {
    'getloginmodal': state => state.loginmodal,
    'getinfomodal': state => state.infomodal,
    'getsearchmodal': state => state.searchmodal,
    'getinterestmodal': state => state.interestmodal,
}

const mutations = {
    setloginmodal(state,set){
        state.loginmodal = set;
    },
    setinfomodal(state,set){
        state.infomodal = set;
    },
    setsearchmodal(state,set){
        state.searchmodal = set;
    },
    setinterestmodal(state,set){
        state.interestmodal = set;
    },
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
}