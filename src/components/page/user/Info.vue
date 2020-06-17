<template>
  <!-- <div class="container mt-5">
    <div class="form-group row">
      <label for="user_id">아이디</label>
      <input type="text" readonly class="form-control" id="user_id" :value="userinfo.userId"/>
    </div>
    <div class="form-group row">
      <label for="user_name">이름</label>
      <input type="text" readonly class="form-control" id="user_name" :value="userinfo.userName"/>
    </div>
    <div class="form-group row">
      <label for="email">메일</label>
      <input type="email" readonly class="form-control" id="email" :value="userinfo.email"/>
    </div>
    <div class="form-group row">
      <label for="address">주소</label>
      <input type="text" readonly class="form-control" id="address" :value="userinfo.address"/>
    </div>
  </div>-->

  <div class="container">
        <transition name="slide" appear>
    <div class="row mb-3 mt-5" v-if="loadsuccess">
      <div class="mx-auto col-md-6">
        <div class="card shadow-lg bg-white">
          <div class="card-header bg-info">
            <h2 class="card-title text-center font-weight-bolder text-white-50">User Info</h2>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="user_id">아이디</label>
              <input
                type="text"
                readonly
                class="form-control"
                id="user_id"
                :value="userinfotmp.userId"
              />
            </div>

            <div class="form-group">
              <label for="user_name">이름</label>
              <input
                type="text"
                readonly
                class="form-control"
                id="user_name"
                :value="userinfotmp.userName"
              />
            </div>

            <div class="form-group">
              <label for="email">메일</label>
              <input type="email" readonly class="form-control" id="email" :value="userinfotmp.email" />
            </div>

            <div class="form-group">
              <label for="address">주소</label>
              <input
                type="text"
                readonly
                class="form-control"
                id="address"
                :value="userinfotmp.address"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
        </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "userinfo",
  data() {
    return {
      loadsuccess: false,
      userinfotmp: {
        userId: "",
        userPwd: "",
        userName: "",
        userType: 0,
        email: "",
        address: ""
      }
    };
  },
  computed: {
    ...mapGetters(["userinfo"])
  },
  created() {
    this.$store.dispatch("action_getuserinfo").then(rst => {
      if (rst) {
        this.userinfotmp = this.userinfo;
        this.loadsuccess = true;
      } else {
        alert("사용자 정보 로딩에 실패했습니다.");
        this.$router.push("/");
      }
    });
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