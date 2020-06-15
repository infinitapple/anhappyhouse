const state = {
    overlays:[],
    map:null,
    geocode:null,
}

const getters = {
    'getloginmodal': state => state.loginmodal,
    'getloginmsg': state => state.loginmsg,
    'getinfomodal': state => state.infomodal,
    'getsearchmodal': state => state.searchmodal,
    'getinterestmodal': state => state.interestmodal,
    'getselectmodal': state => state.selectmodal,
}

const mutations = {
    setloginmodal(state,set){
        state.loginmodal = set;
    },
    setloginmsg(state,set){
        state.loginmsg = set;
    },
    setinfomodal(state,set){
        state.infomodal = set;
    },
    setsearchmodal(state,set){
        state.searchmodal = set;
    },
    setinterestmodal(state,set){
        state.interestmodal = set;
    },
    setselectmodal(state,set){
        state.selectmodal = set;
    },
}

const actions= {
    initMap({state,commit},infoitems) {
        if(!state.map){
          let container = document.getElementById('map');
          let options = { 
            center: new kakao.maps.LatLng(this.infoitems.length?this.infoitems[0].lat:33.450701, this.infoitems.length?this.infoitems[0].lng:126.570667),
            level: 3
          };
          state.map = new kakao.maps.Map(container, options);
        }
        if(!this.geocode){
            state.geocoder = new kakao.maps.services.Geocoder();
        }
        commit.setOverlays(null);
        state.overlays=[];
        //this.setMarkers(null);
        //this.markers=[];
        if(infoitems)infoitems.map(async item=>{
          let position= null;
          await state.geocoder.addressSearch(item.road_name,(result,status)=>{
            if(status===kakao.maps.services.Status.OK){
              position= new kakao.maps.LatLng(result[0].y,result[0].x);
              console.log(this);
              console.log(position);
              console.log(result[0].y);
              console.log(result[0].x);
            }
          });
          console.log(position);
          let content = document.createElement('div');
          content.className = 'overlay';
          content.innerHTML = item.kapt_name;
           position = new kakao.maps.LatLng(item.lat, item.lng);
          console.log(position);
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
      addScript() {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=3316f7c5ff4f22e27a6cb06d55fbf336&libraries=services';
        document.head.appendChild(script);
      }
}

export default {
    state: {
        ...state
    },
    getters,
    mutations,
    actions
}