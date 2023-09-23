<template>
  <div class="chartBoard">
    <!-- 头部部分 -->
    <header>
      <h1>自动放卸矿系统-数据可视化展板</h1>
      <div class="showTime"></div>
    </header>
    <!-- 主体部分 -->
    <section class="mainBox">
      <!-- 左列 -->
      <div class="col">
        <!-- 当前任务 -->
        <div class="panel">
          <div class="panelTitle">
            <span>当前任务</span>
            <p></p>
          </div>
          <div class="currentTask">
            <h4 class="currentTaskID">
              任务编号：null
              <!-- 任务编号: {{ this.runningTask[0].taskId }} -->
            </h4>
            <ul class="currentTaskInfo">
              <!-- <li>发布时间: {{ this.runningTask[0].taskTime }}</li> -->
              <li>任务类型：null</li>
              <li>车牌号：null</li>
              <li>车速：null</li>
              <li>最近基站：null</li>
            </ul>
          </div>
          <div class="panel-footer"></div>
          <div class="panel-footer1"></div>
          <div class="panel-footer2"></div>
        </div>
        <!-- 任务执行log -->
        <div class="panel">
          <div class="panelTitle">
            <span>任务执行</span>
            <p></p>
          </div>
          <ul class="taskLog" ref="taskLog">
            <li v-for="item of taskLog" :key="item.tagId">
              {{ item }}
            </li>
          </ul>
          <div class="panel-footer"></div>
          <div class="panel-footer1"></div>
          <div class="panel-footer2"></div>
        </div>
        <!-- 系统警告 -->
        <div class="panel">
          <div class="panelTitle">
            <span>系统警告</span>
            <p></p>
          </div>
          <ul class="sysAlert">
            <li class="alert">
              <div class="popA" v-if="networkAlert">
                <popAlert :alertInfo="this.alertInfo" />
              </div>
              <span class="icon icon-connection" ref="network"></span>
              <span class="alertInfo">
                <h4>网络状态异常</h4>
                <p>0</p>
              </span>
            </li>
            <li class="alert">
              <div class="popA" v-if="trainCtrlAlert">
                <popAlert :alertInfo="this.alertInfo" />
              </div>
              <span class="icon icon-travel-train" ref="trainCtrl"></span>
              <span class="alertInfo">
                <h4>机车控制异常</h4>
                <p>2</p>
              </span>
            </li>
            <li class="alert">
              <div class="popA" v-if="doorCloseAlert">
                <popAlert :alertInfo="this.alertInfo" />
              </div>
              <span class="icon icon-meter" ref="doorClose"></span>
              <span class="alertInfo">
                <h4>车门闭合异常</h4>
                <p>1</p>
              </span>
            </li>
            <li class="alert">
              <div class="popA" v-if="unloadOreAlert">
                <popAlert :alertInfo="this.alertInfo" />
              </div>
              <span class="icon icon-bell" ref="unloadOre"></span>
              <span class="alertInfo">
                <h4>放矿溜嘴异常</h4>
                <p>0</p>
              </span>
            </li>
          </ul>
          <div class="panel-footer"></div>
          <div class="panel-footer1"></div>
          <div class="panel-footer2"></div>
        </div>
      </div>
      <!-- 中列 -->
      <div class="col">
        <!-- 地图 -->
        <div class="map">
          <mainMap></mainMap>
        </div>
        <!-- 车辆控制按钮 -->
        <div class="midCtrl">
          <div class="dashboard">
            <button
              @click="
                ctrlBtnIndex = 1
                ctrlBtnClick()
              "
              class="directButton forward"
            ></button>
            <button
              @click="
                ctrlBtnIndex = 2
                ctrlBtnClick()
              "
              class="directButton backward"
            ></button>
            <button
              @click="
                ctrlBtnIndex = 4
                ctrlBtnClick()
              "
              class="directButton parking_or_unlocking"
            ></button>
            <button
              @click="
                ctrlBtnIndex = 5
                ctrlBtnClick()
              "
              class="funcButton horn_control"
            ></button>
            <button
              @click="
                ctrlBtnIndex = 6
                ctrlBtnClick()
              "
              class="funcButton automatic_sanding"
            ></button>
            <button
              @click="
                ctrlBtnIndex = 11
                ctrlBtnClick()
              "
              class="funcButton vehicle_emergency_stop"
            ></button>

            <!-- <button
              @click="
                ctrlBtnIndex = 7
                ctrlBtnClick()
              "
              class="funcButton temp_stop"
            ></button>
            <button
@click=" ctrlBtnIndex = 8
ctrlBtnClick() "
 class="funcButton temp_launch"
 ></button> -->

          </div>
        </div>
      </div>
      <!-- 右列 -->
      <div class="col">
        <!-- 历史任务 -->
        <div class="panel">
          <div class="panelTitle">
            <span>历史任务</span>
            <p></p>
          </div>
          <div class="tasklist" ref="tasklist">
            <!-- 任务吨数、任务品位、进度 -->
            <table>
              <tr>
                <th>编号</th>
                <th>用户</th>
                <th>数量</th>
                <th>品位</th>
                <th>开始时间</th>
                <th>结束时间</th>
              </tr>
              <tr v-for="item of taskList" :key="item.taskId">
                <td>{{ item.taskId }}</td>
                <td>{{ item.userId }}</td>
                <td>{{ item.taskCapacity }}</td>
                <td>{{ item.taskLevel }}</td>
                <td>{{ item.taskTime }}</td>
                <td>{{ item.completionTime }}</td>
              </tr>
            </table>
          </div>
          <div class="panel-footer"></div>
          <div class="panel-footer1"></div>
          <div class="panel-footer2"></div>
        </div>
        <!-- 矿仓分布 -->
        <div class="panel">
          <div class="panelTitle">
            <span>矿仓分布</span>
            <p></p>
          </div>
          <div class="chart" ref="barChart"></div>
          <div class="panel-footer"></div>
          <div class="panel-footer1"></div>
          <div class="panel-footer2"></div>
        </div>
        <!-- 视频监控 -->
        <div class="panel">
          <div class="panelTitle">
            <span>视频监控</span>
            <p></p>
          </div>
          <button class="videoPanelButton" v-on:click="VideoOpen">
            查看更多
          </button>
          <VideoComponent></VideoComponent>
          <div class="panel-footer"></div>
          <div class="panel-footer1"></div>
          <div class="panel-footer2"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import popAlert from './popAlert.vue';
import axios from "axios";
import * as echarts from "echarts";
import VideoComponent from './videoPanel/video.vue';
import mainMap from './map/index.vue';

const wsBE = new WebSocket('ws://43.143.97.123:666/ws');
// const ws = new WebSocket('ws://localhost:8000/ws');

export default {
  name: "chartBoard",
  components: {
    VideoComponent,
    mainMap,
    popAlert
  },
  data () {
    return {
      timerInterval: [],
      timerAlert: [],
      networkAlert: false,
      trainCtrlAlert: false,
      doorCloseAlert: false,
      unloadOreAlert: false,
      barChart: null,
      runningTask: null,
      taskLog: [],
      taskList: [],
      trainList: [],
      ctrlBtn: ['NULL_error', 'forward', 'backward', 'launch', 'parking_or_unlocking', 'horn_control', 'automatic_sanding', 'NULL_unload_start', 'NULL_unload_over', 'NULL_stageLock', 'NULL_stageUnlock', 'vehicle_emergency_stop', 'NULL_endCtrl'],
      ctrlBtnIndex: 0,
      alertInfo: {
        time: "8:00",
        type: "network"
      }
    };
  },
  created () {
    // 初始化请求历史任务信息
    axios.get("/api/mines/taskStatus?taskStatus=success").then((response) => {
      this.$set(this, 'taskList', response.data.data);
      for (let i = 0; i < this.taskList.length; i++) {
        this.taskList[i].taskTime = this.timestampToTime(this.taskList[i].taskTime);
        this.taskList[i].completionTime = this.timestampToTime(this.taskList[i].completionTime);
      }
    });

    // 请求正在处理任务信息
    axios.get("/api/mines/taskStatus?taskStatus=running").then((response) => {
      this.$set(this, 'runningTask', response.data.data);
      for (let i = 0; i < this.taskList.length; i++) {
        this.runningTask[i].taskTime = this.timestampToTime(this.taskList[i].taskTime);
        this.runningTask[i].completionTime = this.timestampToTime(this.taskList[i].completionTime);
      }
    });

    // 向swagger请求溜井信息
    axios.get("/api/mines/list").then((response) => {
      const dataArray = response.data.data.wellLists;
      const names = dataArray.map((item) => item.wellName);
      const values = dataArray.map((item) => item.wellWeight);
      // 初始化柱状图，只init一次，用this.barChart接收
      this.barChart = echarts.init(this.$refs.barChart);
      // 通过setOption改变图表数据
      this.renderBar(this.barChart, values, names);
    });
  },
  beforeDestroy () {
    for (let i = 0; i < this.timerInterval.length; i++) {
      clearInterval(this.timerInterval[i]);
    }
    for (let i = 0; i < this.timerAlert.length; i++) {
      clearTimeout(this.timerAlert[i]);
    }
    wsBE.close();
  },
  mounted () {
    this.showTime();

    // 请求任务列表数据
    this.timerInterval[0] = setInterval((function () {
      axios.get("/api/mines/taskStatus?taskStatus=success").then((response) => {
        this.$set(this, 'taskList', response.data.data);
        for (let i = 0; i < this.taskList.length; i++) {
          this.taskList[i].taskTime = this.timestampToTime(this.taskList[i].taskTime);
          this.taskList[i].completionTime = this.timestampToTime(this.taskList[i].completionTime);
        }
      });
    }).bind(this), 30000);

    // 请求柱状图数据
    this.timerInterval[1] = setInterval((function () {
      axios.get("/api/mines/list").then((response) => {
        const dataArray = response.data.data.wellLists;
        const names = dataArray.map((item) => item.wellName);
        const values = dataArray.map((item) => item.wellWeight);
        this.renderBar(this.barChart, values, names);
      });
    }).bind(this), 30000);

    // WebSocket信息处理
    wsBE.addEventListener('open', this.handleWsOpen.bind(this), false);
    wsBE.addEventListener('error', this.handleWsError.bind(this), false);
    wsBE.addEventListener('close', this.handleWsClose.bind(this), false);
    wsBE.addEventListener("message", this.handleBEMessage.bind(this), false);
  },
  methods: {
    // WebSocket通信
    handleWsOpen (e) {
      console.log('FE: BE WebSocket open', e);
    },
    handleWsError (e) {
      console.log('FE: BE WebSocket error', e);
    },
    handleWsClose (e) {
      console.log('FE: BE WebSocket close', e);
    },
    // 处理WebSocket消息
    handleBEMessage (e) {
      const socketMsg = JSON.parse(e.data);
      console.log(e.data);
      if (socketMsg.type == "locomotive_status") {
        // this.taskLog.push(socketMsg.msg);
        // console.log(this.taskLog[1]);
      } else if (socketMsg.type == "current_mission") {
        this.taskLog.push(socketMsg.msg);
        this.$nextTick(() => {
          this.scrollToBottom(); // 渲染完成后滚动至底部
        });
      } else if (socketMsg.type == "system_error") {
        this.ifPopAlert();
      } else {
        console.log(socketMsg);
        console.log('WebSocket未判定消息类型');
      }
    },
    // 点击机车控制按钮
    ctrlBtnClick () {
      console.log("test")
      console.log(this.ctrlBtnIndex)
      console.log(this.ctrlBtn[this.ctrlBtnIndex])
      wsBE.send(JSON.stringify({
        type: 'control',
        taskType: this.ctrlBtn[this.ctrlBtnIndex],
      }));
      this.ctrlBtnIndex = 0;
    },
    // 滚轮到页面底端
    scrollToBottom () {
      const container = this.$refs.taskLog; // 假设有一个包含内容的容器
      if (container) {
        container.scrollTop = container.scrollHeight; // 将容器滚动至底部
      }
    },
    // 翻译时间戳
    timestampToTime (timestamp) {
      const date = new Date(timestamp);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
      let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
      let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
      // console.log(Y + M + D + h + m + s);
      return (Y + M + D + h + m + s);
    },
    // 顶部显示时间
    showTime () {
      let t = null
      t = setTimeout(time, 1000)// 開始运行
      function time () {
        clearTimeout(t)// 清除定时器
        let dt = new Date()
        let y = dt.getFullYear()
        let mt = dt.getMonth() + 1
        let day = dt.getDate()
        let h = dt.getHours()// 获取时
        let m = dt.getMinutes()// 获取分
        let s = dt.getSeconds()// 获取秒
        document.querySelector('.showTime').innerHTML = `当前时间：${y}年${mt}月${day}日-${h}时${m}分${s}秒`
        t = setTimeout(time, 1000) // 设定定时器，循环运行
      }
    },
    // 渲染柱状图
    renderBar (chartEle, values, names) {
      const option = {
        // title: {
        //   text: "溜井仓位实时监控图",
        //   subtext: "Fake Data",
        //   left: "center",
        // },
        color: ["#2f89cf"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          }
        },
        grid: {
          top: "40",
          bottom: "15%",
          left: "10%",
        },
        xAxis: {
          type: "category",
          data: names,
          axisLabel: {
            color: "white",
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          name: "仓位数据",
          min: 0,
          max: 2500,
          axisLabel: {
            color: "white",
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              width: 2,
            }
          },
        },
        series: [
          {
            barWidth: "35%",
            data: values,
            type: "bar",
            itemStyle: {
              borderRadius: 5
            }
          },
        ],
      };
      chartEle.setOption(option);
      window.addEventListener("resize", function () {
        chartEle.resize();
      })
    },
    //展示视频 
    VideoOpen () {
      this.$router.replace('videoshowpanel')
    },
    // Alert页面展示
    ifPopAlert () {
      switch (this.alertInfo.type) {
        case 'network':
          this.networkAlert = true;
          this.$refs.network.classList.add('alertRed');
          this.timerAlert.push(setTimeout(function () {
            this.networkAlert = false;
            this.$refs.network.classList.remove('alertRed');
          }.bind(this), 5000));
          break
        case 'trainCtrl':
          this.trainCtrlAlert = true;
          this.$refs.trainCtrl.classList.add('alertRed');
          this.timerAlert.push(setTimeout(function () {
            this.networkAlert = false;
            this.$refs.trainCtrl.classList.remove('alertRed');
          }.bind(this), 5000));
          break
        case 'doorClose':
          this.doorCloseAlert = true;
          this.$refs.doorClose.classList.add('alertRed');
          this.timerAlert.push(setTimeout(function () {
            this.networkAlert = false;
            this.$refs.doorClose.classList.remove('alertRed');
          }.bind(this), 5000));
          break
        case 'unloadOre':
          this.unloadOreAlert = true;
          this.$refs.unloadOre.classList.add('alertRed');
          this.timerAlert.push(setTimeout(function () {
            this.networkAlert = false;
            this.$refs.unloadOre.classList.remove('alertRed');
          }.bind(this), 5000));
          break
        default:
          break
      }
    }
  },
};
</script>

<style>
@import url(../../assets/css/chartBoard.css?//);
@import url(../../assets/css/icon-style.css);
</style>