<template>
  <div>
      aptrent page
      <button @click="testadd">마커테스트</button>
      <div id="map"></div>
      <searchmodal/>
      <infomodal/>
      <selectmodal/>
  </div>
</template>

<script>
import searchmodal from '@/components/modal/Search.vue';
import infomodal from '@/components/modal/Info.vue';
import selectmodal from '@/components/modal/Select.vue';

import {mapGetters,mapMutations} from 'vuex';
export default {
  name:'searchaptrent',
  mounted() { window.kakao && window.kakao.maps ? this.initMap() : this.addScript(); },
  data(){
    return{
      //markers:[],
      overlays:[],
      map:null
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
    stext:{
      handler () {
        if (typeof window === 'undefined') return // SSR
        if (this.stext == '') return
        this.startsearch()
      },
      immediate: true,
    },
  },
  methods : {
    ...mapMutations(['setsearchmodal','setinfomodal']),
    testadd(){
      let latlng = this.map.getCenter();
      let name = 'test';
      this.infoitems.push({
        name,
        lat:latlng.getLat(),
        lng:latlng.getLng()
      });
    },
    selectmarker(item){
      this.setinfomodal(true);
      this.$store.commit('UPDATE_ITEM',item);
      //
    },
    startsearch(){
      this.setsearchmodal(true);
      //alert('검색한 내용'+this.stext);

    },
    initMap() {
      if(!this.map){
        let container = document.getElementById('map');
        let options = { 
          center: new kakao.maps.LatLng(this.infoitems.length?this.infoitems[0].lat:33.450701, this.infoitems.length?this.infoitems[0].lng:126.570667),
          level: 3
        };
        this.map = new kakao.maps.Map(container, options);
      }
      this.setOverlays(null);
      this.overlays=[];
      //this.setMarkers(null);
      //this.markers=[];
      this.infoitems.map(item=>{
        let content = document.createElement('div');
        content.className = 'overlay';
        content.innerHTML = item.name;
        let position = new kakao.maps.LatLng(item.lat, item.lng);
        let overlay = new kakao.maps.CustomOverlay({
          content,
          position
        });
        //let marker = new kakao.maps.Marker({ position,clickable: true });
        // kakao.maps.event.addListener(overlay, 'click', ()=> {
        //   this.selectmarker(item);
        // });
        // this.markers.push(marker);
        // marker.setMap(this.map);
        content.addEventListener('mouseup',()=>{
          this.selectmarker(item);
        })
        this.overlays.push(overlay);
        overlay.setMap(this.map);
      });
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
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3316f7c5ff4f22e27a6cb06d55fbf336';
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
  margin-left: 200px;
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