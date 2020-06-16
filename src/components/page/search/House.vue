<template>
  <div>
    이전버전 테스트 {{testmsg}}
    <button @click="testadd">마커테스트</button>
    <div id="map"></div>
    <searchmodal>
      <div v-for="(infoitem, idx) in infoitems" :key="idx">
        <a href="#" @click.prevent="selectmarker(infoitem)">{{infoitem.kapt_name}}</a>
      </div>
    </searchmodal>
    <infomodal/>
    <selectmodal/>
  </div>
</template>

<script>
import searchmodal from '@/components/modal/Search.vue';
import infomodal from '@/components/modal/Info.vue';
import selectmodal from '@/components/modal/Select.vue';

import {mapGetters,mapMutations,mapActions} from 'vuex';
export default {
  name:'searchaptrent',
  mounted() { window.kakao && window.kakao.maps ? this.initMap() : this.addScript();},
  data(){
    return{
      testmsg:'',
      searchtype:'aptinfo',
      overlays:[],
      map:null,
      geocode:null,
    }
  },
  created(){
    if(this.stext.length>0){
      this.update_stype(this.searchtype),
      this.update_infoitemsfromtext();
    }
  },
  components:{
      searchmodal,
      infomodal,
      selectmodal
  },
  computed:{
    ...mapGetters(['infoitems','stext'])
  },
  watch: {
    infoitems: {
      handler () {
        window.kakao && window.kakao.maps ? this.initMap() : null;
      },
      immediate: false,
    },
  },
  methods : {
    ...mapMutations(['setsearchmodal','setinfomodal']),
    ...mapActions(['movemap','update_infoitemsfromtext','update_stype','update_itemlatlng']),

/////////////////////////////////////////////////////////////for debug
    testadd(){
      let latlng = this.map.getCenter();
      this.infoitems.push({
        kapt_name:'테스트',
        road_name:'제주특별자치도 제주시 첨단로 242',
        lat:latlng.getLat(),
        lng:latlng.getLng()
      });
    },
/////////////////////////////////////////////////////////////for debug end

    selectmarker(item){
      this.setinfomodal(true);
      this.$store.commit('UPDATE_ITEM',item);
      this.panTo(item.lat,item.lng);
    },

    scrollevent(){
      if(this.map){
        let latlng = this.map.getCenter();  
        //좌표로 행정코드 알아내기
        this.geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(),(result, status)=>{
          if (status === kakao.maps.services.Status.OK) {
            for(let i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'B') {
                this.movemap(result[i].code);
                break;
              }
            }
          }
        });
        this.testmsg = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
        this.testmsg += '경도는 ' + latlng.getLng() + ' 입니다';
      }
    },

    initMap() {
      if(!this.map){
        let container = document.getElementById('map');
        let options = { 
          center: new kakao.maps.LatLng(35.197636928054486, 126.81424906768534),
          level: 3
        };
        this.map = new kakao.maps.Map(container, options);
        kakao.maps.event.addListener(this.map, 'dragend', this.scrollevent);
      }
      if(!this.geocode){
        this.geocoder = new kakao.maps.services.Geocoder();
      }

      this.setOverlays(null);
      this.overlays=[];
      if(this.infoitems){
        this.infoitems.map(item=>{
          if(item.lat==null){
            this.geocoder.addressSearch(item.road_name, (result,status)=>{
              if(status===kakao.maps.services.Status.OK){
                item.lat = result[0].y;
                item.lng = result[0].x;
                this.createOverlays(item);
                console.log('update to server');
                this.update_itemlatlng(item);//item을 서버에 업데이트
              }else{
                item.lat = 33.450701;
                item.lng = 126.570667;
                this.createOverlays(item);
              }
            });
          }else{
            this.createOverlays(item);
          }
        });
      }
      this.setinfomodal(false);
      if(this.infoitems.legnth==0){
        this.scrollevent();
      }
    },
    createOverlays(item){
      let position = new kakao.maps.LatLng(item.lat,item.lng);
      let content = document.createElement('div');
      content.className = 'overlay';
      content.innerHTML = item.kapt_name;
      let overlay = new kakao.maps.CustomOverlay({
        content,
        position
      });
      content.addEventListener('mouseup',()=>{
        this.selectmarker(item);
      })
      this.overlays.push(overlay);
      overlay.setMap(this.map);
    },
    panTo(lat,lng,level) {
      let moveLatLon = new kakao.maps.LatLng(lat, lng);
      this.map.panTo(moveLatLon);
      setTimeout(()=>{
          this.map.setLevel(level,{animation:true})
        },200); 
    },
    setOverlays(map) {
      this.overlays.map(overlay=>{overlay.setMap(map);});
    },
    setMarkers(map) {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
      }
    },
    addScript() {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3316f7c5ff4f22e27a6cb06d55fbf336&libraries=services';
      document.head.appendChild(script);
    }
  }
}
</script>
<style>
#map {
  position: fixed !important;
  top: 0; right: 0; bottom: 0; left: 0;
  margin-top: 110px;
  z-index: 0;
}
.overlay {
    position:absolute;
    left: -50px;
    top: -55px;
    width:100px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.9);
    border:1px solid #ccc;
    border-radius: 5px;
    padding:5px;
    font-size:12px;
    text-align: center;
    white-space: pre;
    word-wrap: break-word;
}
</style>