<template>
  <div>
    <div class="modal__toggle">
        <button @click="modaltoggle">시군동검색</button>
    </div>
    <div class="modal__dialog" v-if="getselectmodal">
        <table>
            <tr>
                <td>
                    <select @change="selectsido" ref="sido">
                        <option>시도</option>
                        <option v-for="sel in sido" :key="sel.sido_name" :value="sel.sido_code">{{sel.sido_name}}</option>
                    </select>
                </td>
                <td>
                    <select @change="selectgugun" ref="gugun">
                        <option>군구</option>
                        <option v-for="sel in gugun" :key="sel.sigungu_name" :value="sel.sigungu_code">{{sel.sigungu_name}}</option>
                    </select>
                </td>
                <td>
                    <select @change="selectdong" ref="dong">
                        <option>동</option>
                        <option v-for="sel in dong" :key="sel.bjd_name" :value="sel.bjd_code">{{sel.bjd_name}}</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';

export default {
    props:['title'],
    computed:{
        ...mapGetters(['getselectmodal','sido','gugun','dong'])
    },
    data(){
        return{
            id:'',
            pwd:''
        }
    },
    created(){
        this.update_sido();
    },
    methods:{
        ...mapActions(['update_sido','update_gugun','update_dong','update_bjd_code','update_infoitems']),
        modaltoggle(){
            this.$store.commit('setselectmodal',!this.getselectmodal)
        },
        selectsido(){
            this.update_gugun(this.$refs.sido.value);
        },
        selectgugun(){
            this.update_dong(this.$refs.gugun.value);
        },
        selectdong(){
            this.update_bjd_code(this.$refs.dong.value);
            this.update_infoitems('aptinfo');
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