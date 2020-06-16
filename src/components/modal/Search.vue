<template>
  <div class="modal__dialog" v-if="getsearchmodal">
    <div class="modal__body">
        검색에 대한 아파트리스트 정보들이 보여집니다.
        <button @click="close">Close</button>
        <slot></slot>
        
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed:{
        ...mapGetters(['getsearchmodal','infoitems'])
    },
    data(){
        return{
            id:'',
            pwd:''
        }
    },
    methods:{
        close(){
            this.$store.commit('setsearchmodal',false)
        },
        infoInit(){
            Promise.resolve().then(()=>{
                //axios를 써서 api서버에서 
            }).catch(()=>{

            });
        }
    }
}
</script>

<style scoped>
.modal__dialog{
    top: 0; right: 0; bottom: 0; left: 0;
    margin: 110px 0px 0px 0px;
    width: 200px;
    background: #fff;
    border: 1px solid #888;
    position: fixed;
    overflow: auto;
    z-index: 2;
}
.modal__header{
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
}
.modal__body{
    padding: 10px;
    overflow-y: scroll;
}
.modal__msg{
    color:red;
}
</style>