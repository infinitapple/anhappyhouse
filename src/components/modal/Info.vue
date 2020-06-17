<template>
    <transition name="slide" appear>
    <div class="modal__dialog" v-if="getinfomodal" :class="{modal__dialog__push:getsearchmodal}">
        <header class="modal__header">
            <button class="backbutton" @click="addtointerest(item.kapt_code)">
                <i class="interest fa fa-star fa-lg" aria-hidden="true"></i>
            </button>
            <button class="backbutton" @click="close">
                <i class="topright fa fa-times fa-2x" aria-hidden="true"></i>
            </button>
        </header>
        <div class="modal__body">
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
        addtointerest(kapt_code){
            if(this.$store.state.user.login){
                this.$store.dispatch('addinterest',{userId:this.$store.state.user.userid,kaptCode:kapt_code}).then((res)=>{
                    if(res)alert('등록성공');
                });
            }else{
                this.$store.commit('setloginmsg','로그인이 필요한 서비스입니다.');
                this.$store.commit('setloginmodal',true);
            }

        },
        infoInit(){
            Promise.resolve().then(()=>{
                //axios를 써서 api서버에서 아파트에 대한 정보 가져와 보여주기
            }).catch(()=>{

            });
        }
    }
}

    // font-size: 28px;
    // font-weight: bold;
    // line-height: 1.29;
    // padding: 16px 16px 0 25px;
    // position: relative;
    
    // top: 4px;
    // right: 18px;
    // position: absolute;
    // color: rgb(155, 155, 0);
    // border: 0;
    // outline: 0;
    // text-align: center;
    // vertical-align: middle;
    // z-index: 2;
</script>

<style scoped>
.modal__dialog{
    top: 0; right: 0; bottom: 0; left: 0;
    margin: 110px 0px 0px 0px;
    width: 300px;
    background: #fff;
    border: 0;
    position: fixed;
    overflow: auto;
    z-index: 2;
    border-radius: .8rem;
}
.modal__header{
    height: 50px;
    background: #000000;
    border-radius: .8rem;
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
.backbutton{
    background-color: transparent;
    border: 0;
    outline: 0;

}
.topright{
    border: 0;
    outline: 0;
    text-align: center;
    vertical-align: middle;
    color:white;
    top: 10px;
    left: 10px;
    position: absolute;
    z-index: 2;
}

.interest{
    border: 0;
    outline: 0;
    text-align: center;
    vertical-align: middle;
    color: rgb(194, 194, 4);
    top: 18px;
    left: 45px;
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

.slide-enter-active,
.slide-leave-active {
 transition: transform .2s;
}

.slide-enter,
.slide-leave-to {
 transform: translateX(-600px);
}

</style>