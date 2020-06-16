<template>
  <div>
    <div class="modal__toggle">
        <button @click="modaltoggle">시군동검색</button>
    </div>
    <div class="modal__dialog" v-if="getselectmodal">
        <table>
            <tr>
                <td>
                    <select @change="selectsido" v-model="sidocode">
                        <option value=''>시도</option>
                        <option v-for="(sel, idx) in sido" :key="idx" :value="sel.sido_code">{{sel.sido_name}}</option>
                    </select>
                </td>
                <td>
                    <select @change="selectgugun" v-model="guguncode">
                        <option value=''>군구</option>
                        <option v-for="(sel, idx) in gugun" :key="idx" :value="sel.sigungu_code">{{sel.sigungu_name}}</option>
                    </select>
                </td>
                <td>
                    <select @change="selectdong(true)" v-model="dongcode">
                        <option value=''>동</option>
                        <option v-for="(sel, idx) in dong" :key="idx" :value="sel.bjd_code">{{sel.bjd_name}}</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex';

export default {
    props:['title','searchtype'],
    computed:{
        ...mapGetters(['infoitems','updateselectbox','getselectmodal','sido','gugun','dong','bjd_code'])
    },
    data(){
        return{
            sidocode:'',
            guguncode:'',
            dongcode:''
        }
    },
    created(){
        this.update_sido();
        this.update_pagemove();
    },
    watch: {
        updateselectbox: {
            handler () {
                if(this.updateselectbox){
                    //법정동 코드를 확인
                    //2자리로 시도 선택
                    this.sidocode=this.bjd_code.substring(0,2);
                    this.selectsido();
                    //5자리로 시군구 선택
                    this.guguncode=this.bjd_code.substring(0,5);
                    this.selectgugun();
                    //10자리로 법정동 선택
                    this.dongcode=this.bjd_code;
                    this.update_selectbox(false);
                    this.selectdong(false);
                }
            },
            immediate: false,
        },
    },
    methods:{
        ...mapMutations(['setselectmodal','setsearchmodal']),
        ...mapActions(['update_pagemove','update_infoitemsfromtext','update_movecenter','update_selectbox','update_stext','update_sido','update_gugun','update_dong','update_bjd_code','update_infoitems']),
        modaltoggle(){
            this.setselectmodal(!this.getselectmodal);
        },
        selectsido(){
            if(this.sidocode){
                this.update_gugun(this.sidocode);
            }
        },
        selectgugun(){
            if(this.guguncode){
                this.update_dong(this.guguncode);
            }
        },
        selectdong(onmove){
            if(this.dongcode.length){
                this.update_stext('');
                this.update_movecenter(onmove);
                this.update_bjd_code(this.dongcode);
                this.update_infoitems(this.searchtype).then(()=>{
                    if(this.infoitems==null||this.infoitems.length==0||this.infoitems[0].bjd_code!=this.dongcode){
                        if(onmove&&this.sido.length&&this.gugun.length&&this.dong.length){
                            let searchstring='';
                            searchstring+=this.sido.filter(sel=>sel.sido_code==this.sidocode)[0].sido_name+' ';
                            searchstring+=this.gugun.filter(sel=>sel.sigungu_code==this.guguncode)[0].sigungu_name+' ';
                            searchstring+=this.dong.filter(sel=>sel.bjd_code==this.dongcode)[0].bjd_name
                            this.update_stext(searchstring);
                            this.update_movecenter(onmove);
                            this.update_infoitemsfromtext();
                        }
                    }
                });
            }
        },
    }
}
</script>

<style scoped>
.modal__toggle{
  position: fixed;
    margin-top: 75px;
    margin-left: 50%;
    z-index: 2;
}
.modal__dialog{
  position: fixed;
    margin-top: 100px;
    margin-left: 50%;
    background: #fff;
    border: 1px solid #888;
    z-index: 2;
}
</style>