<template>
<div>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark static-top">

    <div class="col-3 col-md-2">
        <router-link tag="button" class="iconbutton text-white" to="/">
            <i class="fa fa-home" aria-hidden="true"></i>
            <div class="">AN Happy House</div>
        </router-link>
    </div>
    <div class="col input-group half-width" v-if="search&&!interestmode">
        <input type="text" class="form-control bg-light border-0 small" @keyup.enter="SetSearch" ref="searchtext" :value="stext" placeholder="검색어" />
        <div class="input-group-append">
            <button class="btn btn-primary" @click="SetSearch">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div class="col half-width" v-else></div>

    <div class="col-1 col-sm-2 text-white text-right">
        <div v-if="login">
            <strong >{{userid}}</strong>님
            <button class="iconbutton text-light" @mouseenter="dropdown=true" @click="$router.push('/user')">
                <i class="fas fa-user-circle fa-2x"></i>
            </button>
        </div>
        <div v-else>
            <button class="iconbutton text-light" @click="loginmodal">
                <i class="fas fa-lock fa-2x"></i>
            </button>
        </div>
    </div>

    <div class="dropbox " v-if="dropdown" @mouseleave="dropdown=false">
        <a class="dropdown-item mt-2" href="#" @click.prevent="$router.push('/user')">
            <i class="fas fa-user mr-1"></i>
            사용자 정보
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#" @click.prevent="logout">
            <i class="fas fa-sign-out-alt mr-1"></i>
            로그아웃
        </a>
    </div>
  </nav>
    <loginmodal title="login"/>
</div>
</template>

<script>
        // <v-text-field
        //   hide-details
        //   single-line
        // @keyup.enter="SetSearch" ref="searchtext" :value="stext" placeholder="검색어"
        // >
        // </v-text-field>
        // <v-btn icon>
        //   <v-icon>mdi-dots-vertical</v-icon>
        // </v-btn>

import {mapGetters,mapMutations,mapActions} from 'vuex';
import loginmodal from '@/components/modal/Login.vue';

export default {
    props:['search'],
    components:{
        loginmodal
    },
    computed:{
        // ...mapState({
        //     searchtext: state => state.search.stext
        // }),
        ...mapGetters(['getloginmodal','stext','login','userid','stype','interestmode']),
    },
    data(){
        return{
            dropdown:false,
        }
    },
    methods:{
        ...mapMutations(['UPDATE_interestitems','UPDATE_SPREAD','setsearchmodal']),
        ...mapActions(['update_movecenter','update_infoitemsfromtext','update_stext']),
        async SetSearch(){
            this.update_stext(this.$refs.searchtext.value);
            this.update_movecenter(true);
            await this.update_infoitemsfromtext();
            this.setsearchmodal(true);
        },
        loginmodal(){
            this.$store.commit('setloginmsg','');
            this.$store.commit('setloginmodal',!this.getloginmodal);
            //로그인 모달 띄우기
        },
        logout(){
            this.$store.commit('UPDATE_logout');
            this.dropdown=false;
            this.UPDATE_interestitems([]);
            this.$router.push('/');
            //로그아웃
        }
    }
}
</script>

<style scoped>
.half-width{
    width:50%;
}
.static-top{
    max-height: 50px;
    white-space: nowrap;
}
.dropbox{
    border-radius: .35rem;
    border: 1px solid #e3e6f0;
    background-clip: padding-box;
    background-color: #fff;
    text-align: left;
    right: 0;
    margin: 75px 5px 0px 0px;
    width: 200px;
    height: 100px;
    position: absolute;
    overflow: auto;
    z-index: 6;
}
.iconbutton{
    background-color: transparent;
    border: 0;
    text-align: center;
    vertical-align: middle;
    outline: 0;
}
</style>