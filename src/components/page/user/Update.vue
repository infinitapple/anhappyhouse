<template>
  <!-- <div class="container mt-5">
    <div class="form-group row">
      <label for="user_id">아이디</label>
      <input type="text" readonly class="form-control" id="user_id" v-model="userinfotmp.userId "/>
    </div>
    <div class="form-group row">
      <label for="user_name">이름</label>
      <input type="text" class="form-control" id="user_name" v-model="userinfotmp.userName "/>
    </div>
    <div class="form-group row">
      <label for="email">메일</label>
      <input type="email" class="form-control" id="email" v-model="userinfotmp.email"/>
    </div>
    <div class="form-group row">
      <label for="address">주소</label>
      <input type="text" class="form-control" id="address" v-model="userinfotmp.address"/>
    </div>
    <input type="button" v-if="loadsuccess" @click="formcheck" value="회원정보 수정"/>
  </div>-->

  <div class="container">
        <transition name="slide" appear>
    <div class="row mb-3 mt-5" v-if="loadsuccess">
      <div class="mx-auto col-md-6">
        <div class="card shadow-lg bg-white">
          <div class="card-header bg-info">
            <h2 class="card-title text-center font-weight-bolder text-white-50">Update Info</h2>
          </div>
          <div class="card-body">
            <form class="needs-validation" novalidate>
              <div class="form-group">
                <label for="user_name">아이디</label>
                <input
                  type="text"
                  readonly
                  class="form-control"
                  id="user_id"
                  v-model="userinfotmp.userId "
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please type user id.</div>
              </div>

              <div class="form-group">
                <label for="user_name">이름</label>
                <input
                  type="text"
                  class="form-control"
                  id="user_name"
                  v-model="userinfotmp.userName "
                />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please type user name.</div>
              </div>

              <div class="form-group">
                <label for="email">이메일</label>
                <input type="email" class="form-control" id="email" v-model="userinfotmp.email" />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please type email.</div>
              </div>

              <div class="form-group">
                <label for="address">주소</label>
                <input type="text" class="form-control" id="address" v-model="userinfotmp.address" />
                <div class="valid-feedback">Valid.</div>
                <div class="invalid-feedback">Please type address.</div>
              </div>

              <center class="mt-3">
                <input type="button" v-if="loadsuccess" @click="formcheck" value="회원정보 수정" />
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
import { mapGetters } from "vuex";
export default {
  name: "userupdate",
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
  },
  methods: {
    formcheck() {
      this.doupdate();
    },
    doupdate() {
      this.$store
        .dispatch("action_changeuserinfo", this.userinfotmp)
        .then(rst => {
          if (rst) {
            alert("변경사항이 적용되었습니다.");
            this.$router.push("/user");
          } else {
            alert("업데이트 도중 문제가 발생하였습니다.");
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