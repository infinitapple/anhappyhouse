<template>
 <nav class="navbar navbar-expand navbar-light bg-white topbar static-top">
    <ul class="navbar-nav">
      <li class="nav-link" v-for="menu in menulist" :key="menu.name"><router-link :to="menu.link">{{menu.name}}</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
    props:['menulist']
}
</script>