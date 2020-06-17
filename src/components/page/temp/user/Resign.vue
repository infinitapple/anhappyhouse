<template>
  <div class="container mt-5">
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
  </div>
</template>

<script>
export default {
    name:'userresign',
    methods:{
      fromcheck(){
        this.changepwd();
      },
      changepwd(){
        this.$store.dispatch('action_resign',
        {
          userId:this.$refs.userId.value,
          userPwd:this.$refs.userPwd.value
          }).then((res)=>{
            if(res){
              alert('계정이 삭제되었습니다.');
              this.$router.push('/');
            }else{
              alert('계정삭제에 실패했습니다.');
            }

          });

      }
    }
}
</script>