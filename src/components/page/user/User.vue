<template>
  <div>
    <mainheader search="false"/>
    <subheader :menulist="menulist" />
    <router-view />
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
          name:'회원정보',
          link:'info'
        },
        {
          name:'정보수정',
          link:'update'
        },
        {
          name:'비밀번호변경',
          link:'changepwd'
        },
        {
          name:'회원탈퇴',
          link:'resign'
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