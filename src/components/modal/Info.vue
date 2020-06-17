<template>
    <transition name="slide" appear>
    <div class="modal__dialog" v-if="getinfomodal" :class="{modal__dialog__push:getsearchmodal}">
        <header class="modal__header">
            <button class="backbutton" @click="exist"  v-if="isexist(item.kapt_code)">
                <i class="interestex fa fa-star fa-lg" aria-hidden="true"></i>
            </button>
            <button class="backbutton" @click="addtointerest(item.kapt_code)" v-else>
                <i class="interest fa fa-star fa-lg" aria-hidden="true"></i>
            </button>
            <button class="backbutton" @click="close">
                <i class="topright fa fa-times fa-2x" aria-hidden="true"></i>
            </button>
        </header>
        <div class="modal__body mt-5">

            <table class="table">
                <tbody>
                    <tr>
                        <td>
                            <table class = "table table-bordered">
                                <tr>
                                    <td>
                                        <h2>{{apthouseinfo.kapt_name}}</h2>
                                        <h4>{{apthouseinfo.kapt_tel}}</h4>
                                    </td>
                                </tr>
                            </table>
                            <table class = "table table-bordered">
                                <tr>
                                    <th>거래타입</th>
                                    <td><span v-for="(types,i) in apthouseinfo.saletages" :key="i">{{types}}</span></td>
                                </tr>
                                <tr>
                                    <th>건설사</th>
                                    <td>{{apthouseinfo.kapt_acompany}}</td>
                                </tr>
                                <tr v-if="apthouseinfo.road_name">
                                    <th>도로주소</th>
                                    <td>{{apthouseinfo.road_name}}</td>
                                </tr>
                                <tr v-if="apthouseinfo.build_year">
                                    <th>건축년도</th>
                                    <td>{{apthouseinfo.build_year}}</td>
                                </tr>
                                <tr v-if="apthouseinfo.area">
                                    <th>전용면적</th>
                                    <td>{{apthouseinfo.area}}m<sup>2</sup></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr><td><h4 class="text-center">차트</h4></td></tr>
<!--<canvas id="canvas" ref="canvas" style="display: block; width: 300px; height: 241px;" width="300" height="241" class="chartjs-render-monitor"></canvas>-->
                    <tr v-for="(chartdata,idx) in dataset" :key="idx">
                        <td>
                            <div class="text-center"><strong>{{aptdiver[idx]}}</strong></div>
                            <line-chart v-if="chartdata.length" :data="chartdata"></line-chart>
                            <div v-else class="text-center">거래내역 없음</div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        
    </div>
    </transition>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    computed:{
        ...mapGetters(['aptdiver','getsearchmodal','dealitems','getinfomodal','item','apthouseinfo','dataset','apthouseinfo','interestitems'])
    },
    created(){
        this.interestitemslocal=this.interestitems;
    },
    data(){
        return{
            interestitemslocal:[],
        }
    },
    // created(){
    //     // if(this.ctx==null){
    //     //     this.ctx = this.$refs.canvas.getContext('2d');
    //     //     let color = Chart.helpers.color;
    //     //     let datasets = [];
    //     //     for(let i=0;i<this.dataset.length;i++){
    //     //         let now = this.dataset[i];
    //     //         let dataobj={};
    //     //         let data=[];
    //     //         dataobj.label=this.aptdiver[i];
    //     //         dataobj.backgroundColor=color(window.chartColors.red).alpha(0.5).rgbString();
    //     //         dataobj.borderColor=window.chartColors.red;
    //     //         dataobj.fill = false;
    //     //         for(let j=0;j<now.length;j++){
    //     //             data.push({
    //     //                 x: moment(now.x,'yyyymmdd').toDate(),
    //     //                 y: now.y
    //     //             });
    //     //         }
    //     //         dataobj.data = data;
    //     //         datasets.push(dataobj);
    //     //     }
    //     //     let config = {
    //     //         type: 'line',
    //     //         data: {
    //     //             datasets
    //     //         },
    //     //         options: {
    //     //             responsive: true,
    //     //             title: {
    //     //                 display: true,
    //     //                 text: 'Chart.js Time Point Data'
    //     //             },
    //     //             scales: {
    //     //                 xAxes: [{
    //     //                     type: 'time',
    //     //                     display: true,
    //     //                     scaleLabel: {
    //     //                         display: true,
    //     //                         labelString: 'Date'
    //     //                     },
    //     //                     ticks: {
    //     //                         major: {
    //     //                             fontStyle: 'bold',
    //     //                             fontColor: '#FF0000'
    //     //                         }
    //     //                     }
    //     //                 }],
    //     //                 yAxes: [{
    //     //                     display: true,
    //     //                     scaleLabel: {
    //     //                         display: true,
    //     //                         labelString: 'value'
    //     //                     }
    //     //                 }]
    //     //             }
    //     //         }
    //     //     };
    //     //     this.chart = new Chart(this.ctx, config);
    //     //     this.chart.update();
    //     // }

        


    // },
    // watch:{

    // },
    methods:{
        close(){
            this.$store.commit('setinfomodal',false);
        },
        addtointerest(kapt_code){
            if(this.isexist(kapt_code)){
                alert('이미 등록한 즐겨찾기입니다.');
                return;
            }
            if(this.$store.state.user.login){
                this.$store.dispatch('addinterest',{userId:this.$store.state.user.userid,kaptCode:kapt_code}).then((res)=>{
                    if(res){
                        this.interestitemslocal.push({kapt_code});
                        alert('등록성공');
                    }
                });
            }else{
                this.$store.commit('setloginmsg','로그인이 필요한 서비스입니다.');
                this.$store.commit('setloginmodal',true);
            }
        },
        isexist(kapt_code){
            if(this.interestitemslocal.filter(item=>item.kapt_code==kapt_code).length>0){
                return true;
            }return false;
        },
        exist(){
            alert('이미 등록한 즐겨찾기입니다.');
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
    width: 500px;
    background: #fff;
    border: 0;
    position: fixed;
    overflow: auto;
    z-index: 2;
    border-radius: .8rem;
}
.modal__header{
    position: fixed;
    width: 500px;
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

.interestex{
    border: 0;
    outline: 0;
    text-align: center;
    vertical-align: middle;
    color: rgb(124, 124, 124);
    top: 18px;
    left: 45px;
    position: absolute;
    z-index: 2;
}
.interest{
    border: 0;
    outline: 0;
    text-align: center;
    vertical-align: middle;
    color: rgb(216, 216, 7);
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