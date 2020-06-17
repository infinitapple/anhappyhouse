<template>
  <!-- <div class="container">
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

  </div>-->

  <div class="container">
        <transition name="slide" appear>
    <div class="row mb-3 mt-5" v-if="loadsuccess">
      <div class="mx-auto col-md-6">
        <div class="card shadow-lg bg-white">
          <div class="card-header bg-info">
            <h2
              class="card-title text-center font-weight-bolder text-uppercase text-white-50"
            >Sign up</h2>
          </div>
          <div class="card-body">
              <div class="form-group">
                <label for="user_name">아이디</label>
                <input type="text" class="form-control" id="user_id" v-model="userId" />
              </div>

              <div class="form-group">
                <label for="pwd">비밀번호</label>
                <input type="password" class="form-control" id="user_pwd" v-model="userPwd" />
              </div>

              <div class="form-group">
                <label for="user_name">이름</label>
                <input type="text" class="form-control" id="user_name" v-model="userName" />
              </div>

              <div class="form-group">
                <label for="email">이메일</label>
                <input type="text" class="form-control" id="email" v-model="email" />
              </div>

              <div class="form-group">
                <label for="address">주소</label>
                <input type="text" class="form-control" id="address" v-model="address" />
              </div>

              <div class="text-right">
                <button class="btn btn-primary mr-3" @click="checkform">회원가입</button>
                <router-link to="/" tag='button' class="btn btn-primary">돌아가기</router-link>
              </div>

          </div>
        </div>
      </div>
    </div>
        </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "signup",
  data() {
    return {
      loadsuccess: false,
      userId: "",
      userPwd: "",
      userName: "",
      userType: 0,
      email: "",
      address: ""
    };
  },
  created(){
    this.loadsuccess=true;
  },
  methods: {
    ...mapActions(["action_signup"]),
    checkform() {
      this.signup();
    },
    signup() {
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
    movePage() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
 transition: transform .15s;
}

.slide-enter,
.slide-leave-to {
 transform: translateY(-30px);
}
</style>