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
    <loginmodal title="login" :visible.sync="modalvisible">
        <div class="form-group">
            <label for="id">아이디</label>
            <input type="text" v-model="id" class="form-control" id="id"  placeholder="ID">
        </div>
        <div class="form-group">
            <label for="pwd">비밀번호</label>
            <input type="password" v-model="pwd" class="form-control" id="pwd" placeholder="Password" @keyup.enter="loginfunction">
        </div>
        <button class="btn btn-primary" @click="loginfunction">로그인</button>
    </loginmodal>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import loginmodal from '@/components/modal/Login.vue';

export default {
    props:['search'],
    data(){
        return{
            modalvisible: false,
            id:'',
            pwd:''
        }
    },
    components:{
        loginmodal
    },
    computed:{
        // ...mapState({
        //     searchtext: state => state.search.stext
        // }),
        ...mapGetters(['stext','login','userid']),
    },
    methods:{
        ...mapActions(['update_stext']),
        SetSearch(){
            this.update_stext(this.$refs.searchtext.value);
            alert("쿠키에 값 저장!");
        },
        loginmodal(){
            this.modalvisible = !this.modalvisible;
            //로그인 모달 띄우기
        },
        loginfunction(){
            //axios써서 인증서버에서 key가져오기
            Promise.resolve().then(()=>{
                //this.$store.dispatch('login',id,pwd);
                const key = 'tempkey';
                this.$store.commit('UPDATE_KEY',key);
                this.$store.commit('UPDATE_USERID',this.id);
                this.$store.commit('UPDATE_LOGIN',true);
                alert('로그인');
                this.modalvisible = !this.modalvisible;
            }).catch(()=>{

            });
        },
        logout(){
            this.$store.dispatch('logout');
            alert("로그아웃");
            //로그아웃
        }
    }
}
</script>