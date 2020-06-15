<template>
  <div>
      changepwd page
    <div class="form-group row">
      <label for="user_pwd">바꿀비밀번호</label>
      <input type="password" class="form-control" id="user_pwd" :value="userinfo.user_pwd"/>
    </div>
  </div>
</template>

<script>
export default {
    name:'changepwd',
}
</script>