<template>
  <div class="modal__dialog" v-if="getinfomodal">
    <header class="modal__header">
        <span>{{item.name}}</span>
        <button @click="close">Close</button>
    </header>
    <div class="modal__body">
        해당 아파트에 대한 실거래가, 그래프 등의 정보나 보여집니다.
        <div v-html="item"></div> <br>
        
        <div v-if="dealitems&&dealitems.length">
            <div v-html="dealitems"></div>
        </div>
        <div v-else>
            거래내역이 없습니다.
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed:{
        ...mapGetters(['getinfomodal','dealitems','item'])
    },
    data(){
        return{
            id:'',
            pwd:''
        }
    },
    methods:{
        close(){
            this.$store.commit('setinfomodal',false)
        },
        infoInit(){
            Promise.resolve().then(()=>{
                //axios를 써서 api서버에서 아파트에 대한 정보 가져와 보여주기
            }).catch(()=>{

            });
        }
    }
}
</script>

<style scoped>
.modal__dialog{
    top: 0; right: 0; bottom: 0; left: 0;
    margin: 110px 0px 0px 200px;
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