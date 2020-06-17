<template>
  <!-- <div class="container mt-5">
    <h3><strong>아이디 삭제를 위해서 아이디와 비밀번호를 입력해주세요.</strong></h3>
    <div class="form-group row">
      <label for="user_id">아이디</label>
      <input type="text" class="form-control" ref="userId" />
    </div>
    <div class="form-group row">
      <label for="user_pwd">비밀번호</label>
      <input type="password" class="form-control" ref="userPwd"/>
    </div>
    <input type="button" @click="fromcheck" value="삭제">
  </div>-->

  <div class="container">
        <transition name="slide" appear>
    <div class="row mb-3 mt-5" v-if="loadsuccess">
      <div class="mx-auto col-md-6">
        <div class="card shadow-lg bg-white">
          <div class="card-header bg-info">
            <h2 class="card-title text-center font-weight-bolder text-white-50">Unsubscribe</h2>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="user_id">아이디</label>
              <input type="text" class="form-control" ref="userId" />
            </div>

            <div class="form-group">
              <label for="user_pwd">비밀번호</label>
              <input type="password" class="form-control" ref="userPwd" />
            </div>
            <center>
              <input type="button" @click="fromcheck" value="삭제" />
            </center>
          </div>
        </div>
      </div>
    </div>
        </transition>
  </div>
</template>

<script>
export default {
  name: "userresign",
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
        .dispatch("action_resign", {
          userId: this.$refs.userId.value,
          userPwd: this.$refs.userPwd.value
        })
        .then(res => {
          if (res) {
            alert("계정이 삭제되었습니다.");
            this.$router.push("/");
          } else {
            alert("계정삭제에 실패했습니다.");
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