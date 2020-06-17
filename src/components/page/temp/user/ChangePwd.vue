<template>
  <div class="container mt-5">
    <div class="form-group row">
      <label for="user_pwd">이름</label>
      <input type="password" class="form-control" ref="userName" />
    </div>
    <div class="form-group row">
      <label for="user_pwd">바꿀비밀번호</label>
      <input type="password" class="form-control" ref="userPwd" />
    </div>
    <input type="button" @click="fromcheck" value="확인">
  </div>
</template>

<script>
export default {
    name:'changepwd',
    methods:{
      fromcheck(){
        this.changepwd();

      },
      changepwd(){
        this.$store.dispatch('action_changepwd',
        {
          userId:this.$store.state.user.userid,
          userName:this.$refs.userName.value,
          userPwd:this.$refs.userPwd.value
          }).then((res)=>{
            if(res){
              alert('비밀번호 변경이 완료되었습니다.');
              this.$router.push('/user');
            }else{
              alert('비밀번호 변경에 실패했습니다.');

            }

          });

      }
    }
}
</script>