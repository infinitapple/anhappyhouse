<template>
  <div>
    <mainheader search=true />
    <subheader :menulist="menulist"/>
    <router-view/>
  </div>
</template>

<script>
import mainheader from '../../layout/Header.vue';
import subheader from '../../layout/SubHeader.vue';

export default {
  created(){
    console.log('tst');
  },
  data(){
    return{
      menulist:[
        {
          name:'아파트',
          link:'apt'
        },
        {
          name:'주택',
          link:'house'
        },
        {
          name:'즐겨찾기',
          link:'interest'
        },
      ]
    }
  },
  components:{
    mainheader,
    subheader
  }
}
</script>