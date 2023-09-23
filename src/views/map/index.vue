<template>
  <div>
    <object id="svgObject" type="image/svg+xml" :data="mapSvg"></object>
    <button @click="test" class="button2">返回原页面</button>
  </div>
</template>

<script>
//const ws = new WebSocket('ws://43.143.97.123:666/ws');
const ws = new WebSocket('ws://219.144.198.91:8081/websocket/mapdata');
const wsLight = new WebSocket('ws://219.144.198.91:8081/websocket/mapdata');
import MapSvg from "./mapsvg.svg"
var _ = require('lodash');
export default {
  data() {
    let map = MapSvg;
    return {
      mapSvg: map,
      svg: null,
      svgall: null,
      svgDoc: null,
      path1: null,
    };
  },
  methods: {
    async test(){
      this.$router.push('index')
    },

    handleWsOpen (e) {
      console.log('FE: WebSocket open', e);
    },
    handleWsError (e) {
      console.log('FE: WebSocket error', e);
    },
    handleWsClose (e) {
      console.log('FE: WebSocket close', e);
    },
    handleWsMessage (e) {
      const socketMsg = JSON.parse(e.data);
      if(socketMsg.type === "position"){
        let svgX = socketMsg.data["888888"].posX * 0.28 + 407
        let svgY = socketMsg.data["888888"].posY * (-0.28) + 1798
        const svgObject = document.getElementById("svgObject");
        this.svgDoc = svgObject.contentDocument;
        let dot =this.svgDoc.querySelector(".xiaokuangche")
        dot.setAttribute("r",2)
        dot.setAttribute("cx",svgX)
        dot.setAttribute("cy",svgY)
      }
    },
  },
  beforeMount(){
    ws.addEventListener('open', this.handleWsOpen.bind(this), false);
    ws.addEventListener('error', this.handleWsError.bind(this), false);
    ws.addEventListener('close', this.handleWsClose.bind(this), false);
    ws.addEventListener("message", _.throttle(this.handleWsMessage.bind(this),300), false);
  },
  mounted() {
    this.$nextTick(() => {
      const svgObject = document.getElementById("svgObject");
      // svgObject.addEventListener('load', () => { this.highlightRoadshow(); });
    });
  },
};
</script>

<style>
.button1 {
  position: fixed;
  left: 10px;
  top: 10px;
}
.button2{
  position: fixed;
  left:60px;
  top: 10px;
}
#svgObject {
  position: absolute;
  left: -300px;
  top: -200px;
}
</style>
