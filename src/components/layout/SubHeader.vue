<template>
  <div>
      <li v-for="menu in menulist" :key="menu.name">
        <a href="#" @click.prevent="movePage(menu.link)">{{menu.name}}</a>
      </li>
  </div>
</template>

<script>
export default {
    props:['menulist'],
    methods:{
        movePage(link){
            this.$router.push(link);
        },
    }

}
</script>

<style>

</style>