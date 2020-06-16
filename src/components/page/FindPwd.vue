<template>
    <div class="container">
        <router-link to="/">Home</router-link>
        findpwd page
        <div class="form-group row">
            <label for="user_id">아이디</label>
            <input type="text" class="form-control" id="user_id" v-model="user_id"/>
        </div>
        <div class="form-group row">
            <label for="user_name">이름</label>
            <input type="text" class="form-control" id="user_name" v-model="user_name"/>
        </div>
    </div>
</template>

<script>
export default {
    name:'findpwd',
    data(){
      return{
        user_id:'',
        user_name:'',
      }
    },
}
</script>

<style>

</style>