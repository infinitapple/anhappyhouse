<template>
  <div>
    <router-link to="/">Home</router-link>
    <template v-if="search">
        <input type="text" @keyup.enter="SetSearch" ref="searchtext" :value="stext" />
        <button @click="SetSearch">검색</button>
    </template>
    
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
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
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
        ...mapGetters(['getloginmodal','stext','login','userid']),
    },
    methods:{
        ...mapActions(['update_infoitemsfromtext','update_stext']),
        SetSearch(){
            this.update_stext(this.$refs.searchtext.value);
            this.update_infoitemsfromtext('aptinfo');
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