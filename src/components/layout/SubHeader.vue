<template>
  <div class="nav">
    <router-link v-for="menu in menulist" :key="menu.name" :to="menu.link">{{menu.name}}</router-link>
  </div>
</template>

<script>
export default {
    props:['menulist']
}
</script>