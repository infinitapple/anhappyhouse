<template>
  <div>
    <div id="map"></div>
    <searchmodal>
      <div v-for="(infoitem, idx) in infoitems" :key="idx" >
        <button class="selectboxing" @click.prevent="selectmarker(infoitem)">
          <i class="fas fa-building"></i>
          {{infoitem.kapt_name}}
        </button>
        <div v-if="interestmode" @click="removeinterestitem(infoitem.kapt_code)">
            <i class="fas fa-trash"></i>
        </div>
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
  mounted() { window.kakao && window.kakao.maps ? this.initMap() : this.addScript();},
  props:['searchtype'],
  data(){
    return{
      overlays:[],
      map:null,
      geocode:null,
    }
  },
  created(){
    if(this.searchtype=='interest'){
      this.UPDATE_interestmode(true);
      this.update_movecenter(true);
      this.update_infoitemsfrominterest(this.$store.state.user.userid).then((rst)=>{
        if(rst)this.setsearchmodal(true);
      });
    }else{
      this.UPDATE_interestmode(false);
      this.update_stype(this.searchtype);
      if(this.stext.length>0){
        this.update_infoitemsfromtext();
      }
    }
  },
  components:{
      searchmodal,
      infomodal,
      selectmodal
  },
  computed:{
    ...mapGetters(['movecenter','infoitems','stext','interestmode'])
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
    ...mapMutations(['setting_apthouseinfo','UPDATE_interestmode','UPDATE_ITEM','setsearchmodal','setinfomodal']),
    ...mapActions(['removeinterest','update_infoitemsfrominterest','update_dealitems','update_movecenter','movemap','update_infoitemsfromtext','update_stype','update_itemlatlng']),

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
    removeinterestitem(kaptCode){
      this.removeinterest({userId:this.$store.state.user.userid,kaptCode});
      this.$store.commit('UPDATE_INFOITEMS',this.infoitems.filter(item=>item.kapt_code!=kaptCode));

    },

    async selectmarker(item){
      await this.UPDATE_ITEM(item);
        this.setinfomodal(false);
      this.panTo(item.lat,item.lng);
      this.update_dealitems(item.kapt_code).then(()=>{
        this.setting_apthouseinfo();
        this.setsearchmodal(true);
        this.setinfomodal(true);
      }); // searchtype 바꾸면서 같이 바꿀것!!!!!!!!!
    },

    scrollevent(){
      if(this.map&&!this.interestmode){
        let latlng = this.map.getCenter();  
        //좌표로 행정코드 알아내기
        this.geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(),(result, status)=>{
          if (status === kakao.maps.services.Status.OK) {
            this.movemap(result[0].code);
          }
        });
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
        this.infoitems.map(async item=>{
          if(item.lat==null){
            await new Promise((resolve,reject)=>{
              this.geocoder.addressSearch(item.road_name, (result,status)=>{
                if(status===kakao.maps.services.Status.OK){
                  item.lat = result[0].y;
                  item.lng = result[0].x;
                  resolve();
                  console.log('update to server');
                  this.update_itemlatlng(item);//item을 서버에 업데이트
                }else{
                  reject();
                }
              });
            }).catch(()=>{
              item.lat = 33.450701;
              item.lng = 126.570667;
            });
          }
          this.createOverlays(item);
        });
      }
      this.setinfomodal(false);
      
      if(this.movecenter){
        console.log("move");
        if(this.infoitems&&this.infoitems[0]){
          this.panTo(this.infoitems[0].lat,this.infoitems[0].lng,2)
          //setTimeout(this.panTo(this.infoitems[0].lat,this.infoitems[0].lng,2),100);
        }else{
          console.log(this.stext);
          if(this.stext){
            this.geocoder.addressSearch(this.stext,(result,status)=>{
              if(status===kakao.maps.services.Status.OK){
                this.panTo(result[0].y,result[0].x,2);
              }
            });
          }
        }
        this.update_movecenter(false);
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
      content.addEventListener('click',()=>{
        this.selectmarker(item);
      })
      this.overlays.push(overlay);
      overlay.setMap(this.map);
    },
    panTo(lat,lng,level) {
      let moveLatLon = new kakao.maps.LatLng(lat, lng);
      this.map.setLevel(level,{animation:true})
      this.map.panTo(moveLatLon);
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

// #map {
//   position: fixed !important;
//   top: 0; right: 0; bottom: 0; left: 0;
//   margin-top: 110px;
//   z-index: 0;
// }
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
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    text-overflow: clip;
    border:1px solid #ccc;
    border-radius: 5px;
    padding:5px;
    font-size:12px;
    text-align: center;
    word-wrap: break-word;
}
.selectboxing{
    border: 0;
    text-align: center;
    vertical-align: middle;
    outline: 0;
    color:white;
    background-color: rgba(0, 0, 0, 0.9);
    margin-bottom: 10px;
    border-radius: .35rem;
}
</style>