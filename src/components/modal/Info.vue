<template>
    <transition name="slide" appear>
    <div class="modal__dialog" v-if="getinfomodal" :class="{modal__dialog__push:getsearchmodal}">
        <header class="modal__header">
            <button class="backbutton" @click="addtointerest(item.kapt_code)"  v-if="isexist(item.kapt_code)">
                <i class="interest fa fa-star fa-lg" aria-hidden="true"></i>
            </button>
            <button class="backbutton" @click="addtointerest(item.kapt_code)" v-else>
                <i class="interestex fa fa-star fa-lg" aria-hidden="true"></i>
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
                                        <h2>{{item.kapt_name}}</h2>
                                        <h4>{{item.kapt_tel}}</h4>
                                    </td>
                                </tr>
                            </table>
                            <table class = "table table-bordered">
                                <tr>
                                    <th>거래타입</th>
                                    <td>{{item.sale_type}}</td>
                                </tr>
                                <tr>
                                    <th>건설사</th>
                                    <td>{{item.kapt_acompany}}</td>
                                </tr>
                                <tr v-if="item.road_name">
                                    <th>도로주소</th>
                                    <td>{{item.road_name}}</td>
                                </tr>
                                <!--<tr v-if="apthouseinfo.build_year">
                                    <th>건축년도</th>
                                    <td>{{apthouseinfo.build_year}}</td>
                                </tr>
                                <tr v-if="apthouseinfo.area">
                                    <th>전용면적</th>
                                    <td>{{apthouseinfo.area}}m<sup>2</sup></td>
                                </tr>-->
                            </table>
                        </td>
                    </tr>
                    <tr><td><h4 class="text-center">차트</h4></td></tr>
<!--<canvas id="canvas" ref="canvas" style="display: block; width: 300px; height: 241px;" width="300" height="241" class="chartjs-render-monitor"></canvas>-->
                    <tr>
                        <td>
                            <div class="text-center mt-3">
                                <strong>{{aptdiver[0]}}</strong>
                                <span v-if="dataset0.length">(평균: {{$store.state.search.avgmoney0}} 만원)</span>
                            </div>
                            <line-chart v-if="dataset0.length" :data="dataset0"></line-chart>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center mt-3">
                                <strong>{{aptdiver[1]}}</strong>
                                <span v-if="dataset1.length">(평균: {{$store.state.search.avgmoney1}} 만원)</span>
                            </div>
                            <div v-if="dataset1.length">
                                <line-chart :data="dataset1"></line-chart>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="text-center mt-3">
                                <strong>{{aptdiver[2]}}</strong>
                                <span v-if="dataset2.length">(평균: {{$store.state.search.avgmoney2}} 만원)</span>
                            </div>
                            <div v-if="dataset2.length">
                                <line-chart :data="dataset2"></line-chart>
                            </div>
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
        ...mapGetters(['avgmoney0','avgmoney1','avgmoney2','infoitems','login','interestmode','aptdiver','getsearchmodal','getinfomodal','item','apthouseinfo','dataset0','dataset1','dataset2','apthouseinfo'])
    },
    created(){
        if(this.login){
            this.$store.dispatch('update_interestitems',this.$store.state.user.userid);
        }else{
            this.$store.state.search.interestitems=[];
        }
    },
    data(){
        return{
            datalists:{list:[]},
        }

    },
    watch:{
        dealitems:{
            handler(){
                console.log(this.dealitems);
                this.datalists=this.dealitems;
            },
            immediate: false,
        },
        login: {
            handler () {
                if(this.login){
                    this.$store.dispatch('update_interestitems',this.$store.state.user.userid);
                }else{
                    this.$store.state.search.interestitems=[];
                }
            },
            immediate: false,
        },
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
                if(confirm('즐겨찾기를 해제하시겠습니까?')){
                    this.removeinterestitem(kapt_code);
                }
                return;
            }
            if(this.$store.state.user.login){
                this.$store.dispatch('addinterest',{userId:this.$store.state.user.userid,kaptCode:kapt_code}).then((res)=>{
                    if(res){
                        this.$store.state.search.interestitems.push({kapt_code});
                        alert('등록성공');
                    }
                });
            }else{
                this.$store.commit('setloginmsg','로그인이 필요한 서비스입니다.');
                this.$store.commit('setloginmodal',true);
            }
        },
        isexist(kapt_code){
            if(this.$store.state.search.interestitems.filter(item=>item.kapt_code==kapt_code).length>0){
                return true;
            }return false;
        },
        exist(){
            alert('이미 등록한 즐겨찾기입니다.');
        },
        removeinterestitem(kaptCode){
            this.$store.dispatch('removeinterest',{userId:this.$store.state.user.userid,kaptCode});
            if(this.interestmode){
                this.$store.commit('UPDATE_INFOITEMS',this.infoitems.filter(item=>item.kapt_code!=kaptCode));
            }
            this.$store.state.search.interestitems = this.$store.state.search.interestitems.filter(item=>item.kapt_code!=kaptCode);
        },
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