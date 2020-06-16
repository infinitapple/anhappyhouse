<template>
  <div :id="elementId" :style="{ width, height }">
    <!-- daum kakao map -->
  </div>
</template>

<script>
import Map from '@/util/kakaomap.js'
// ...

export default {

  props: {
    elementId: {
      type: String,
      required: true,
    },
    markers: {
      type: Array,
      default () {
        return []
      },
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '100%',
    },
    height: {
      type: String,
      required: false,
      default: '640px',
    },
    lat: {
      type: String,
      required: false,
      default: '33.450701',
    },
    lng: {
      type: String,
      required: false,
      default: '126.570667',
    },
    level: {
      type: String,
      required: false,
      default: '3',
    },
  },
  data () {
    return {
      map: null,
    }
  },
  watch: {
    markers: {
      handler () {
        if (typeof window === 'undefined') return // SSR
        this.initMap(this.markers)
      },
      immediate: true,
    },
  },
  methods: {
    setCenter (lat, lng, level) {
      console.log(lat);
      console.log(lng);
      this.map && this.map.setCenter({ lat, lng, maxLevel: level })
    },
    async initMap (markers) {
      if (!this.map) {
        const map = new Map()
        await map.mount(this.elementId)

        map.addMarkerClusters([
          {
            key: 'cluster1',
            color: '#222529',
            zIndex: 0,
          },
          {
            key: 'cluster2',
            color: '#209cee',
            zIndex: 1,
          },
        ])
        // this.markers.push({
        //   name:'test',
        //   type:'',
        //   location:{
        //     lat:33.450701,
        //     lng:126.570667
        //   }
        // })

        this.map = map
        this.setCenter(this.lat*1,this.lng*1,this.level*1)
      } else {
        this.map.clearMarkers()
      }

      this.map.addMarkers(
        markers.map(
          (marker) => {
            const { name, type, location: { lat, lng } } = marker
            return {
              lat,
              lng,
              clusterKey: type,
              title: name,
              onClick: () => {
                this.$emit('click-marker', marker)
              },
            }
          }
        )
      )
    },
  },
}
</script>