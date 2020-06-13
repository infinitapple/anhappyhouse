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
          name:'아파트 매매',
          link:'apt'
        },
        {
          name:'아파트 월세',
          link:'aptrent'
        },
        {
          name:'주택 매매',
          link:'house'
        },
        {
          name:'주택 월세',
          link:'houserent'
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