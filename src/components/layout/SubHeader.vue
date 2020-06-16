<template>
  <nav class="navbar-expand navbar-expand-sm bg-dark navbar-dark ">
    <ul class="navbar-nav">
      <router-link :to="menu.link" v-for="menu in menulist" :key="menu.name" tag="button" class="iconbutton" ><strong>{{menu.name}}</strong></router-link>
    </ul>
  </nav>
</template>

<script>
export default {
    props:['menulist'],
}
</script>
<style scoped>
.iconbutton{
    background-color: transparent;
    border: 0;
    text-align: center;
    vertical-align: middle;
    outline: 0;
    padding:18px;
    transition:all 0.9s, color 0.3;
    background-color: rgb(78, 78, 78);
    color: white;
    cursor: pointer;
    z-index: 3;
}
.iconbutton:hover{
  color:rgb(0, 0, 0);
  box-shadow:200px 0 0 0 rgba(255, 255, 255, 0.5) inset;
}
.router-link-exact-active {
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
}
</style>