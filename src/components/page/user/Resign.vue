<template>
  <div>
    아이디 삭제를 위해서 아이디와 비밀번호를 입력해주세요.
    <div class="form-group row">
      <label for="user_id">아이디</label>
      <input type="text" class="form-control" id="user_id" :value="userinfo.user_id"/>
    </div>
    <div class="form-group row">
      <label for="user_pwd">비밀번호</label>
      <input type="password" class="form-control" id="user_pwd" :value="userinfo.user_pwd"/>
    </div>
  </div>
</template>

<script>
export default {
    name:'userresign',
}
</script>