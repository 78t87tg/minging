<template>
  <div id="mapIndex">
    <object
      id="svgObject"
      ref="svgObject"
      type="image/svg+xml"
      :data="mapSvg"
      @load="changeViewBox"
    ></object>
    <button @click=test class="test">测试</button>
    <button @click="mapSwitch = !mapSwitch" class="mapSwitch">切换地图</button>
  </div>
</template>

<script>
const ws = new WebSocket('ws://219.144.198.91:8081/websocket/mapdata');
const wsBE = new WebSocket('ws://43.143.97.123:666/ws')
//const ws = new WebSocket('ws://43.143.97.123:666/ws');
import MapSvg from "./mapsvg.svg";
export default {
  data () {
    let map = MapSvg;
    return {
      mapSwitch: true,
      mapSvg: map,
      svg: null,
      svgall: null,
      svgDoc: null,
      path1: null,
      viewBoxValue: "400 130 1200 1150",
      svgX: 1048,
      svgY: 532,
      minX: null,
      minY: null,
      winSize: 400,
    };
  },
  methods: {
    // 计算所需viewBox，改变this.viewBoxValue
    calculateViewBox () {
      this.minX = this.svgX - this.winSize / 2;
      this.minY = this.svgY - this.winSize / 2;
      this.viewBoxValue = `${this.minX} ${this.minY} ${this.winSize} ${this.winSize - 70}`;
    },
    // 改变svg的viewBox属性
    changeViewBox () {
      this.svgDoc = this.$refs.svgObject.contentDocument;
      const vb = this.svgDoc.querySelector("svg");
      vb.setAttribute('viewBox', this.viewBoxValue);
    },
    test(){
      const svgObject = document.getElementById("svgObject");
        this.svgDoc = svgObject.contentDocument;
        let dot = this.svgDoc.querySelector(".xiaokuangche");
        dot.setAttribute("r", 10)
        dot.setAttribute("cx", 713)
        dot.setAttribute("cy", 920)
    },
    handleWsOpen (e) {
      console.log('FE: XJB WebSocket open', e);
    },
    handleWsError (e) {
      console.log('FE: XJB WebSocket error', e);
    },
    handleWsClose (e) {
      console.log('FE: XJB WebSocket close', e);
    },
    handleWsMessage (e) {
      // console.log(e.data)
      const socketMsg = JSON.parse(e.data);
      if (socketMsg.type === "position") {
        let svgX = socketMsg.data["888888"].posX * 0.28 + 407;
        let svgY = socketMsg.data["888888"].posY * (-0.28) + 1798;
        const svgObject = document.getElementById("svgObject");
        this.svgDoc = svgObject.contentDocument;
        let dot = this.svgDoc.querySelector(".xiaokuangche");
        dot.setAttribute("r", 2)
        dot.setAttribute("cx", svgX)
        dot.setAttribute("cy", svgY)
        

        if(svgX > 678 && svgX <755){
          let lightenter1 = this.svgDoc.querySelector("#enterPut").children[2]
          let lightenter2 = this.svgDoc.querySelector("#enterPut").children[3]
          lightenter1.setAttribute("style", "fill:#D33C3C")
          lightenter2.setAttribute("style", "fill:#D33C3C")
        }

        if(svgX > 751 && svgX< 950){
          let lightenter1 = this.svgDoc.querySelector("#enterPut").children[2]
          let lightenter2 = this.svgDoc.querySelector("#enterPut").children[3]
          let lightexit1 = this.svgDoc.querySelector("#exitPut").children[2];
          let lightexit2 = this.svgDoc.querySelector("#exitPut").children[3];
          lightenter1.setAttribute("style", "fill:#40A532")
          lightenter2.setAttribute("style", "fill:#40A532")
          lightexit1.setAttribute("style", "fill:#D33C3C")
          lightexit2.setAttribute("style", "fill:#D33C3C")
        }

        if(svgX > 950 && svgX< 992)
        {
        let lightenter3 = this.svgDoc.querySelector("#enterunload").children[2];
        let lightenter4 = this.svgDoc.querySelector("#enterunload").children[3];
        lightenter3.setAttribute("style", "fill:#D33C3C")
        lightenter4.setAttribute("style", "fill:#D33C3C")
        }

        if(svgX > 992)
        {
        let lightenter3 = this.svgDoc.querySelector("#enterunload").children[2];
        let lightenter4 = this.svgDoc.querySelector("#enterunload").children[3];
        let lightexit7 = this.svgDoc.querySelector("#exitunload").children[2];
        let lightexit8 = this.svgDoc.querySelector("#exitunload").children[3];
        lightenter3.setAttribute("style", "fill:##40A532")
        lightenter4.setAttribute("style", "fill:##40A532")
        lightexit7.setAttribute("style", "fill:#D33C3C")
        lightexit8.setAttribute("style", "fill:#D33C3C")
        }


        if (this.mapSwitch) {
          this.viewBoxValue = "400 130 1200 1150";
          this.changeViewBox();
        } else {
          this.svgX = svgX;
          this.svgY = svgY;
          this.calculateViewBox();
          this.changeViewBox();
        }
      } else {
      }
    },
    handleWsBEMessage(e){
      const socketMsg = JSON.parse(e.data);
      console.log(socketMsg.msg);
        if(socketMsg.msg == "请求信集闭系统进行区间闭锁..."){
          let lightenter1 = this.svgDoc.querySelector("#enterPut").children[2]
          let lightenter2 = this.svgDoc.querySelector("#enterPut").children[3]
          lightenter1.setAttribute("style", "fill:#D33C3C")
          lightenter2.setAttribute("style", "fill:#D33C3C")
        }

        if(socketMsg.msg == "向信集闭系统请求区间解锁中..."){
          let lightenter1 = this.svgDoc.querySelector("#enterPut").children[2]
          let lightenter2 = this.svgDoc.querySelector("#enterPut").children[3]
          let lightexit1 = this.svgDoc.querySelector("#exitPut").children[2];
          let lightexit2 = this.svgDoc.querySelector("#exitPut").children[3];
          lightenter1.setAttribute("style", "fill:#40A532")
          lightenter2.setAttribute("style", "fill:#40A532")
          lightexit1.setAttribute("style", "fill:#D33C3C")
          lightexit2.setAttribute("style", "fill:#D33C3C")
        }

        if(socketMsg.msg == "请求信集闭系统进行区间闭锁...")
        {
        let lightenter3 = this.svgDoc.querySelector("#enterunload").children[2];
        let lightenter4 = this.svgDoc.querySelector("#enterunload").children[3];
        lightenter3.setAttribute("style", "fill:#D33C3C")
        lightenter4.setAttribute("style", "fill:#D33C3C")
        }

        if(socketMsg.msg == "向信集闭系统请求区间解锁中...")
        {
        let lightenter3 = this.svgDoc.querySelector("#enterunload").children[2];
        let lightenter4 = this.svgDoc.querySelector("#enterunload").children[3];
        let lightexit7 = this.svgDoc.querySelector("#exitunload").children[2];
        let lightexit8 = this.svgDoc.querySelector("#exitunload").children[3];
        lightenter3.setAttribute("style", "fill:##40A532")
        lightenter4.setAttribute("style", "fill:##40A532")
        lightexit7.setAttribute("style", "fill:#D33C3C")
        lightexit8.setAttribute("style", "fill:#D33C3C")
        }
    }
  },
  mounted () {
    ws.addEventListener('open', this.handleWsOpen.bind(this), false);
    ws.addEventListener('error', this.handleWsError.bind(this), false);
    ws.addEventListener('close', this.handleWsClose.bind(this), false);
    ws.addEventListener("message", this.handleWsMessage.bind(this), false);

    wsBE.addEventListener('open', this.handleWsOpen.bind(this), false);
    wsBE.addEventListener('error', this.handleWsError.bind(this), false);
    wsBE.addEventListener('close', this.handleWsClose.bind(this), false);
    wsBE.addEventListener("message", this.handleWsBEMessage.bind(this), false);
  },
};
</script>

<style>
#mapIndex {
  position: relative;
}
.mapSwitch {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  color: #fff;
}

.test{
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: none;
  color: #fff;
}

#svgObject {
  width: 100%;
}
</style>
