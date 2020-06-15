<template>
  <div>
      info page
    <div class="form-group row">
      <label for="user_id">아이디</label>
      <input type="text" readonly class="form-control" id="user_id" :value="userinfo.user_id"/>
    </div>
    <div class="form-group row">
      <label for="user_name">이름</label>
      <input type="text" readonly class="form-control" id="user_name" :value="userinfo.user_name"/>
    </div>
    <div class="form-group row">
      <label for="email">메일</label>
      <input type="email" readonly class="form-control" id="email" :value="userinfo.email"/>
    </div>
    <div class="form-group row">
      <label for="address">주소</label>
      <input type="text" readonly class="form-control" id="address" :value="userinfo.address"/>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name:'userinfo',
    computed:{
      ...mapGetters(['userinfo'])
    },
    created(){

    }
}
</script>