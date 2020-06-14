<template>
  <div>
    <div class="modal__toggle">
        <button @click="modaltoggle">시군동검색</button>
    </div>
    <div class="modal__dialog" v-if="getselectmodal">
        <table>
            <tr>
                <td>
                    <select>
                        <option>시도</option>
                        <option v-for="sel in sido" :key="sel.name" :value="sel.code">{{sel.name}}</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option>군구</option>
                        <option v-for="sel in gugun" :key="sel.name" :value="sel.code">{{sel.name}}</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option>동</option>
                        <option v-for="sel in dong" :key="sel.name" :value="sel.code">{{sel.name}}</option>
                    </select>
                </td>
            </tr>
        </table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

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
    methods:{
        modaltoggle(){
            this.$store.commit('setselectmodal',!this.getselectmodal)
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