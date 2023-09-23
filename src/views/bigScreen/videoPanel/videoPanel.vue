<template>
  <div class="video-component">
    <TopMenuComponent class="VideoTop"></TopMenuComponent>
    <MenuComponent
      @update-current-video="setCurrentVideo(arguments)"
      :videoList="videoList"
      class="VideoMenu"
      v-if="VideoMode"
    ></MenuComponent>
    <div class="video-grid" v-if="VideoMode">
      <div
        v-for="video in paginatedVideoList(videoListID)"
        :key="video.id"
        class="video-item"
        :class="{ selected: currentVideo === video.id }"
      >
        <h3 class="title1">{{ video.title }}</h3>
        <a-button
          type="primary"
          @click="() => changeView(video.id)"
          size="small"
          class="videoItemButton"
        >
          多角度
        </a-button>
        <VideoComponent></VideoComponent>
      </div>
    </div>
    <div class="video-grid1" v-else>
      <div
        v-for="video in videoListThree"
        :key="video.title"
        class="video-item-three"
      >
        <h3 class="title1">{{ video.title }}</h3>
        <a-button
          type="primary"
          @click="() => changeView(video.id)"
          size="small"
          class="videoItemButton"
        >
          返回
        </a-button>
        <VideoComponent></VideoComponent>
      </div>
    </div>

    <a-pagination
      :current="currentPage"
      :total="videoList[0].childList.length"
      :pageSize="pageSize"
      :default-current="1"
      @change="handlePageChange"
      class="VideoPagination"
      v-if="VideoMode"
    />
  </div>
</template>

  <script>
import VideoComponent from './video.vue';
import MenuComponent from './menu.vue';
import TopMenuComponent from './topMenu.vue';
export default {
  components: {
    VideoComponent,
    MenuComponent,
    TopMenuComponent,
  },
  data () {
    return {
      VideoMode: true,
      currentVideo: 0,
      currentPage: 1,
      pageSize: 12,
      videoListID: 0,
      videoListThree: [],//多重视角下的video
      videoList: [
        {
          childList: [
            { id: 1, title: '**矿场 点位1 全局' },
            { id: 2, title: '**矿场 点位2 全局' },
            { id: 3, title: '**矿场 点位3 全局' },
            { id: 4, title: '**矿场 点位4 全局' },
            { id: 5, title: '**矿场 点位5 全局' },
            { id: 6, title: '**矿场 点位6 全局' },
            { id: 7, title: '**矿场 点位7 全局' },
            { id: 8, title: '**矿场 点位8 全局' },
            { id: 9, title: '**矿场 点位9 全局' },
            { id: 10, title: '**矿场 点位10 全局' },
            { id: 11, title: '**矿场 点位11 全局' },
            { id: 12, title: '**矿场 点位12 全局' },
            { id: 13, title: '**矿场 点位13 全局' },
            { id: 14, title: '**矿场 点位14 全局' },
            { id: 15, title: '**矿场 点位15 全局' },
            { id: 16, title: '**矿场 点位16 全局' },
          ],
          id: 1,
          title: "全局视角监控"
        },
        {
          childList: [
            { id: 1, title: '**矿场 点位1 仰视' },
            { id: 2, title: '**矿场 点位2 仰视' },
            { id: 3, title: '**矿场 点位3 仰视' },
            { id: 4, title: '**矿场 点位4 仰视' },
            { id: 5, title: '**矿场 点位5 仰视' },
            { id: 6, title: '**矿场 点位6 仰视' },
            { id: 7, title: '**矿场 点位7 仰视' },
            { id: 8, title: '**矿场 点位8 仰视' },
            { id: 9, title: '**矿场 点位9 仰视 ' },
            { id: 10, title: '**矿场 点位10 仰视' },
            { id: 11, title: '**矿场 点位11 仰视' },
            { id: 12, title: '**矿场 点位12 仰视' },
            { id: 13, title: '**矿场 点位13 仰视' },
            { id: 14, title: '**矿场 点位14 仰视' },
            { id: 15, title: '**矿场 点位15 仰视' },
            { id: 16, title: '**矿场 点位16 仰视' },
          ],
          id: 2,
          title: "仰视视角监控"
        },
        {
          childList: [
            { id: 1, title: '**矿场 点位1 路轨' },
            { id: 2, title: '**矿场 点位2 路轨' },
            { id: 3, title: '**矿场 点位3 路轨' },
            { id: 4, title: '**矿场 点位4 路轨' },
            { id: 5, title: '**矿场 点位5 路轨' },
            { id: 6, title: '**矿场 点位6 路轨' },
            { id: 7, title: '**矿场 点位7 路轨' },
            { id: 8, title: '**矿场 点位8 路轨' },
            { id: 9, title: '**矿场 点位9 路轨' },
            { id: 10, title: '**矿场 点位10 路轨' },
            { id: 11, title: '**矿场 点位11 路轨' },
            { id: 12, title: '**矿场 点位12 路轨' },
            { id: 13, title: '**矿场 点位13 路轨' },
            { id: 14, title: '**矿场 点位14 路轨' },
            { id: 15, title: '**矿场 点位15 路轨' },
            { id: 16, title: '**矿场 点位16 路轨' },
          ],
          id: 3,
          title: "溜嘴侧路轨视角监控"
        },
      ]
    };
  },
  computed: {
    // paginatedVideoList() {
    //   const startIndex = (this.currentPage - 1) * this.pageSize;
    //   const endIndex = startIndex +this.pageSize;
    //   return this.videoList[0].childList.slice(startIndex,endIndex);
    // }
  },
  methods: {
    paginatedVideoList (id) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.videoList[id].childList.slice(startIndex, endIndex);
    },
    handlePageChange (page) {
      this.currentPage = page;
    },
    // 当需要设置某个视频项为选中状态时调用
    setCurrentVideo (data) {
      this.currentVideo === data[0] ? this.currentVideo = 0 : this.currentVideo = data[0];
      this.currentPage = (Math.trunc((data[0] - 1) / 12 + 1));
      this.videoListID = data[1];
    },
    changeView (id) {
      this.VideoMode = !this.VideoMode;
      if (this.VideoMode) {
        this.currentVideo = 0
        this.currentPage = 1
        this.videoListID = 0
      }
      else {
        this.videoListThree = [];
        this.videoListThree.push(this.videoList[0].childList[id - 1])
        this.videoListThree.push(this.videoList[1].childList[id - 1])
        this.videoListThree.push(this.videoList[2].childList[id - 1])
      }
    }
  }
};
  </script>

  <style scoped>
.videoItemButton {
  margin-left: 20px;
}
.title1 {
  display: inline-block;
  width: 60%;
  color: aliceblue;
  margin-left: 0px;
}
.VideoMenu {
  height: 88%;
  overflow-y: auto;
}
.VideoTop {
  height: 0%;
}
.VideoPagination {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
.video-component {
  color: aliceblue;
  position: relative;
  display: block;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url('../../../assets/images/mbgc.png');
  background-size: cover; /* 设置背景大小为cover，即拉伸图片以填满整个div */
}

.video-list {
  position: absolute;
  left: 0;
  top: 50px;
  width: 15%;
}

.menu-item {
  color: aliceblue;
  text-align: center;
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.video-grid {
  position: absolute;
  right: 0;
  top: 90px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
}
.video-grid1 {
  position: absolute;
  right: 0;
  top: 90px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
}
.video-item {
  color: aliceblue;
  margin-left: 20px;
  margin-top: 5px;
  width: 20%;
  height: 180px;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px solid black;
}
.video-item-three {
  color: aliceblue;
  margin-left: 20px;
  margin-top: 5px;
  width: 45%;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px solid black;
}
.video-item-three .videoItemButton {
  margin-left: 180px;
}
.video-item-three .flv-player {
  width: 700px;
  height: 280px;
  margin: 0;
  padding: 0;
}
.video-item:hover {
  background-color: rgb(6, 65, 153);
}
.selected {
  background-color: rgb(6, 65, 153);
}
.flv-player {
  width: 200px;
  height: 120px;
  margin: 0;
  padding: 0;
}
.menu {
  display: flex;
  flex-direction: column;
  width: 15%;
  text-align: center;
  padding: 10px;
}
.menu-item {
  margin-bottom: 20px;
  margin-left: 20px;
  cursor: pointer;
}
.menu-item:hover {
  background-color: #ccc;
}
.content {
  padding: 10px;
}
</style>
