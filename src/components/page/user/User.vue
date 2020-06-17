<template>
  <div>
    <mainheader search=false />
    <subheader :menulist="menulist"/>
    <router-view />
  </div>
</template>

<script>
import mainheader from '../../layout/Header.vue';
import subheader from '../../layout/SubHeader.vue';

import {mapGetters,mapMutations} from 'vuex';

export default {
  computed:{
    ...mapGetters(['spread']),
  },
  created(){
      this.UPDATE_interestmode(true);
  },
  methods:{
    ...mapMutations(['UPDATE_interestmode','UPDATE_SPREAD']),
  },
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