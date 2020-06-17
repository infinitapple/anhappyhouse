<template>
  <!-- <div class="container mt-5">
    <div class="form-group row">
      <label for="user_pwd">이름</label>
      <input type="password" class="form-control" ref="userName" />
    </div>
    <div class="form-group row">
      <label for="user_pwd">바꿀비밀번호</label>
      <input type="password" class="form-control" ref="userPwd" />
    </div>
    <input type="button" @click="fromcheck" value="확인" />
  </div>-->

  <div class="container">
        <transition name="slide" appear>
    <div class="row mb-3 mt-5" v-if="loadsuccess">
      <div class="mx-auto col-md-6">
        <div class="card shadow-lg bg-white">
          <div class="card-header bg-info">
            <h2 class="card-title text-center font-weight-bolder text-white-50">Change Password</h2>
          </div>
          <div class="card-body">
            <form class="needs-validation" novalidate>

              <div class="form-group">
                <label for="user_pwd">아이디</label>
                <input type="text" class="form-control" ref="userId" />
              </div>

              <div class="form-group">
                <label for="user_pwd">이름</label>
                <input type="text" class="form-control" ref="userName" />
              </div>

              <div class="form-group">
                <label class="font-weight-bold" for="pwd">바꿀 비밀번호</label>
                <input type="password" class="form-control" ref="userPwd" />
              </div>

              <center class="mt-3">
                <!-- <input type="submit" class="btn btn-info w-50" value="changepwd" /> -->
                <input type="button" @click="fromcheck" value="확인" />
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
        </transition>
  </div>
</template>

<script>
export default {
  name: "changepwdnologin",
  data() {
    return {
      loadsuccess: false,
    };
  },
  created(){
    this.loadsuccess=true;
  },
  methods: {
    fromcheck() {

      this.changepwd();
    },
    changepwd() {
      this.$store
        .dispatch("action_changepwdwithoutlogin", {
          userId: this.$refs.userId.value,
          userName: this.$refs.userName.value,
          userPwd: this.$refs.userPwd.value
        })
        .then(res => {
          if (res) {
            alert("비밀번호 변경이 완료되었습니다.");
            this.$router.push("/user");
          } else {
            alert("비밀번호 변경에 실패했습니다.");
          }
        });
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