<template>
    <transition name="slide" appear>
    <div class="modal__dialog" v-if="getinfomodal" :class="{modal__dialog__push:getsearchmodal}">
        <i class="topright fa fa-times fa-2x" @click="close" aria-hidden="true"></i>
        <header class="modal__header">
            <span>{{item.kapt_name}}</span>
        </header>
        <div class="modal__body">
            해당 아파트에 대한 실거래가, 그래프 등의 정보나 보여집니다.
            <div v-html="item"></div> <br>
            <div v-for="(dealitem,idx) in dealitems" :key="idx">
                {{dealitem}}
            </div>
        </div>
        
    </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed:{
        ...mapGetters(['getsearchmodal','dealitems','getinfomodal','item'])
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
    margin: 110px 0px 0px 0px;
    width: 300px;
    background: #fff;
    border: 1px solid rgb(216, 216, 216);
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
.modal__dialog__push{
    margin-left:250px;
}

.topright{
    top: 10px;
    right: 10px;
    position: absolute;
    z-index: 2;
}

.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 400px;
 background-color: #FFF;
 border-radius: 16px;
 
 padding: 25px;
 
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity .1s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .1s;
}

.slide-enter,
.slide-leave-to {
 transform: translateX(-200px);
}

</style>