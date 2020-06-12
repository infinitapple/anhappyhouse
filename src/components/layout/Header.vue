<template>
  <div>
        <template v-if="search">
            <input type="text" @keyup.enter="SetSearch" ref="searchtext" :value="searchtext" />
            <button @click="SetSearch">검색</button>
        </template>
      
        <div v-if="login">
            <strong>{{userid}}</strong>님 환영합니다.
            <a href="#" @click.prevent="moveInfo">회원정보</a>
            <a href="#" @click.prevent="logout">로그아웃</a>
        </div>
        <div v-else>
            <a href="#" @click.prevent="loginmodal">로그인</a>
        </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    props:['search'],
    computed:{
        ...mapGetters(['searchtext','login','userid'])
    },
    methods:{
        SetSearch(){
            alert("set");
            this.$store.commit('setsearchtext',this.$refs.searchtext.value);
        },
        moveInfo(){
            this.$router.push('/user/info');
        },
        loginmodal(){
            //로그인 모달 띄우기
        },
        logout(){
            //로그아웃
        }
    }
}
</script>

<style>

</style>