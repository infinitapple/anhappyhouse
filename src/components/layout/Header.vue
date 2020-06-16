<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">

    <div class="col-3 col-md-2">
        <router-link to="/">AN Happy House</router-link>
    </div>
    <div class="col input-group half-width" v-if="search">
        <input type="text" class="form-control bg-light border-0 small" @keyup.enter="SetSearch" ref="searchtext" :value="stext" placeholder="검색어" />
        <div class="input-group-append">
            <button class="btn btn-primary" @click="SetSearch">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    </div>

    <div class="col text-right">
            <div v-if="login">
                <strong>{{userid}}</strong>님 환영합니다.
                <router-link to="/user">회원정보</router-link>
                <a href="#" @click.prevent="logout">로그아웃</a>
            </div>
            <div v-else>
                <a href="#" @click.prevent="loginmodal">로그인</a>
            </div>
            <loginmodal title="login"/>
    </div>

  </nav>
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
        ...mapGetters(['getloginmodal','stext','login','userid','stype']),
    },
    methods:{
        ...mapMutations(['setsearchmodal']),
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
            this.$store.dispatch('logout');
            alert("로그아웃");
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
</style>