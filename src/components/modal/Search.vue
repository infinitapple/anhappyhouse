<template>
    <div>
        <transition name="slide" appear>
                <div class="modal__dialog" v-if="getsearchmodal">
                    <div class="modal__body">
                        검색에 대한 아파트리스트 정보들이 보여집니다.
                        <slot></slot>
                    </div>
                    <div class="leftcaret" @click="toggle">
                        <i class="rotateleft fa fa-caret-down fa-3x" aria-hidden="true"></i>
                    </div>
                </div>
        </transition>
        
        <div class="rightcaret" @click="toggle"  v-if="!getsearchmodal">
            <i class="rotateright fa fa-caret-down fa-3x" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed:{
        ...mapGetters(['getsearchmodal','infoitems'])
    },
    methods:{
        toggle(){
            this.$store.commit('setsearchmodal',!this.getsearchmodal);
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
    width: 250px;
    background: #fff;
    border: 1px solid rgb(216, 216, 216);
    position: fixed;
    overflow: auto;
    z-index: 3;
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
.leftcaret{
    position: absolute;
    top: 50%;
    margin-left: 216px;
    background: rgb(202, 202, 202);
    border: 1px solid rgb(179, 176, 176);
    border-radius: .35rem;
    height: 50px;
    width: 30px;
    z-index: 5;
}
.rightcaret{
    position: fixed;
    top: 50%;
    margin-left: -10px;
    margin-top: 55px;
    background: rgb(202, 202, 202);
    border: 1px solid rgb(179, 176, 176);
    border-radius: .35rem;
    height: 50px;
    z-index: 5;
}
.rotateleft{
    transform: rotate(90deg);
}

.rotateright{
    transform: rotate(-90deg);
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