<template>
    <div class="modal__window" v-if="getloginmodal" @click.self="handleWrapperClick">
        
        <transition name="slide" appear>
            <div class="modal__dialog">
                <header class="modal__header">
                    <span>로그인</span>
                </header>
                <div class="modal__body">
                    <span class="modal__msg"><strong>{{getloginmsg}}</strong></span>
                    <div class="form-group">
                        <label for="id">아이디</label>
                        <input type="text" v-model="id" class="form-control ml-1" id="id" ref='id'  placeholder="ID">
                    </div>  
                    <div class="form-group">
                        <label for="pwd">비밀번호</label>
                        <input type="password" v-model="pwd" class="form-control ml-1" id="pwd" placeholder="Password" @keyup.enter="loginfunction">
                    </div>
                    <div class="text-right">
                        <button class="btn btn-primary mr-3" @click="loginfunction">로그인</button>
                        <router-link to="/signup" tag="button" class="btn btn-primary mr-3">회원가입</router-link>
                        <router-link to="/changepwd" tag="button" class="btn btn-primary">비밀번호 찾기</router-link>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex';

export default {
    props:['title'],
    computed:{
        ...mapGetters(['getloginmodal','getloginmsg','login'])
    },
    data(){
        return{
            id:'',
            pwd:''
        }
    },
    methods:{
        ...mapActions(['action_login','update_interestitems']),
        ...mapMutations(['setloginmodal','setloginmsg']),
        handleWrapperClick(){
            this.setloginmodal(false);
        },
        async loginfunction (){
            //axios써서 인증서버에서 key가져오기
            await this.action_login({id:this.id,pwd:this.pwd});
            if(this.login){
                this.update_interestitems(this.id);
                this.setloginmodal(false);
            }else{
                this.setloginmsg('아이디와 비밀번호가 일치하지 않습니다.');
                this.pwd='';
                this.$refs.id.focus();
            }
        }
    }
}
</script>

<style scoped>
.modal__window {
  background-color: rgba(0, 0, 0, 0.3);
  top: 0; right: 0; bottom: 0; left: 0;
  position: fixed;
  overflow: auto;
  margin: 0;
  z-index: 100 !important;
}
.modal__dialog{
    margin: 75px auto auto auto;
    width: 600px;
    background: #fff;
    border: 1px solid rgb(216, 216, 216);
    border-radius: .35rem;
}
.modal__header{
    font-size: 28px;
    font-weight: bold;
    line-height: 1.29;
    padding: 16px 16px 0 25px;
    position: relative;
    text-align: left;
}
.modal__body{
    padding: 25px;
    min-height: 150px;
    max-height: 412px;
    overflow-y: scroll;
}
.modal__msg{
    color:red;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .15s;
}

.slide-enter,
.slide-leave-to {
 transform: translateY(-30px);
}
</style>