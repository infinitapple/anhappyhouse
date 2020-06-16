const state = {
    loginmodal:false,
    loginmsg:'',
    infomodal:false,
    searchmodal:false,
    interestmodal:false,
    selectmodal:false,
}

const getters = {
    'getloginmodal': state => state.loginmodal,
    'getloginmsg': state => state.loginmsg,
    'getinfomodal': state => state.infomodal,
    'getsearchmodal': state => state.searchmodal,
    'getinterestmodal': state => state.interestmodal,
    'getselectmodal': state => state.selectmodal,
}

const mutations = {
    setloginmodal(state,set){
        state.loginmodal = set;
    },
    setloginmsg(state,set){
        state.loginmsg = set;
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
    setselectmodal(state,set){
        state.selectmodal = set;
    },
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
}