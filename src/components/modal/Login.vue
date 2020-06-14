<template>
  <div class="modal__window" v-if="getloginmodal" @click.self="handleWrapperClick">
      <div class="modal__dialog">
          <header class="modal__header">
              <span>{{title}}</span>
          </header>
          <div class="modal__body">
            <span class="modal__msg"><strong>{{getloginmsg}}</strong></span>
            <div class="form-group">
                <label for="id">아이디</label>
                <input type="text" v-model="id" class="form-control" id="id"  placeholder="ID">
            </div>
            <div class="form-group">
                <label for="pwd">비밀번호</label>
                <input type="password" v-model="pwd" class="form-control" id="pwd" placeholder="Password" @keyup.enter="loginfunction">
            </div>
            <div class="text-right">
                <button class="btn btn-primary mr-3" @click="loginfunction">로그인</button>
                <router-link to="/signup" tag="button" class="btn btn-primary">회원가입</router-link>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';

export default {
    props:['title'],
    computed:{
        ...mapGetters(['getloginmodal','getloginmsg'])
    },
    data(){
        return{
            id:'',
            pwd:''
        }
    },
    methods:{
        ...mapActions(['login']),
        handleWrapperClick(){
            this.$store.commit('setloginmodal',false)
        },
        loginfunction(){
            //axios써서 인증서버에서 key가져오기
            Promise.resolve().then(()=>{
                //this.login(id,pwd);
                const key = 'tempkey';
                this.$store.commit('UPDATE_KEY',key);
                this.$store.commit('UPDATE_USERID',this.id);
                this.$store.commit('UPDATE_LOGIN',true);
                alert('로그인');
                this.$store.commit('setloginmodal',!this.getloginmodal);
            }).catch(()=>{

            });
        }
    }
}
</script>

<style scoped>
.modal__window {
  background-color: rgba(0, 0, 0, 0.3);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  z-index: 3;
}
.modal__dialog{
    margin: 75px auto auto auto;
    width: 600px;
    background: #fff;
    border: 1px solid #888;
}
.modal__header{
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
}
.modal__body{
    padding: 25px;
    min-height: 150px;
    max-height: 412px;
    overflow-y: scroll;
}
.modal__msg{
    color:red;
}
</style>