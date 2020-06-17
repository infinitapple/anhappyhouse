<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    signup page
      <div class="form-group row">
        <label for="user_id">아이디</label>
        <input type="text" class="form-control" id="user_id" v-model="userId"/>
      </div>
      <div class="form-group row">
        <label for="user_pwd">비밀번호</label>
        <input type="password" class="form-control" id="user_pwd" v-model="userPwd"/>
      </div>
      <div class="form-group row">
        <label for="user_name">이름</label>
        <input type="text" class="form-control" id="user_name" v-model="userName"/>
      </div>
      <div class="form-group row">
        <label for="email">메일</label>
        <input type="email" class="form-control" id="email" v-model="email"/>
      </div>
      <div class="form-group row">
        <label for="address">주소</label>
        <input type="text" class="form-control" id="address" v-model="address"/>
      </div>
      <button class="btn btn-primary" @click="checkform">회원가입</button>

  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name:'signup',
    data(){
      return{
        userId:'',
        userPwd:'',
        userName:'',
        userType:0,
        email:'',
        address:''
      }
    },
    methods:{
      ...mapActions(['action_signup']),
      checkform(){
        this.signup();
      },
      signup(){
        this.action_signup(this.$data)
          .then((rst)=>{
            if(rst){
              alert('회원가입되었습니다. 로그인해주세요.');
              this.movePage();
            }else{
              alert('회원가입에 실패했습니다.');
            }
          });
      },
      movePage(){
        this.$router.push('/');
      }
    }
}
</script>