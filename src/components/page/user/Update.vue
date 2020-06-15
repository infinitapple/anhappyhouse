<template>
  <div>
    회원정보 수정
    <div class="form-group row">
      <label for="user_id">아이디</label>
      <input type="text" readonly class="form-control" id="user_id" :value="userinfo.user_id"/>
    </div>
    <div class="form-group row">
      <label for="user_name">이름</label>
      <input type="text" class="form-control" id="user_name" :value="userinfo.user_name"/>
    </div>
    <div class="form-group row">
      <label for="email">메일</label>
      <input type="email" class="form-control" id="email" :value="userinfo.email"/>
    </div>
    <div class="form-group row">
      <label for="address">주소</label>
      <input type="text" class="form-control" id="address" :value="userinfo.address"/>
    </div>
  </div>
</template>

<script>
export default {
    name:'userupdate',
}
</script>