<template>
  <div>
    <mainheader search="ture"/>
    <subheader :menulist="menulist"/>
    <router-view/>
  </div>
</template>

<script>
import mainheader from '../../layout/Header.vue';
import subheader from '../../layout/SubHeader.vue';

export default {
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
          name:'관심지역',
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