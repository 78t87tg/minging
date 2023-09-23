 
<template>
    <div>
      <a-menu
        style="width: 256px"
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        mode="inline"
        :theme="theme"
        :selected-keys="[current]"
        @click="handleClick"
      >
         <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="appstore" /><span>放矿点监控列表</span></span>
            <a-sub-menu key="sub1-1" title="全局视角监控" >
            <a-menu-item v-for="video in  videoList[0].childList" :key="video.id" @click="selectVideo(video.id,0)">
                {{video.title}}
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub1-2" title="仰视视角监控">
            <a-menu-item v-for="video in  videoList[1].childList" :key="video.id" @click="selectVideo(video.id,1)">
                {{video.title}}
          </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub1-3" title="溜嘴侧路轨视角监控">
            <a-menu-item v-for="video in  videoList[2].childList" :key="video.id" @click="selectVideo(video.id,2)">
                {{video.title}}
          </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="appstore" /><span>卸矿点监控列表</span></span>
          <a-sub-menu key="sub1-4" title="视角1监控列表" >
          </a-sub-menu>
          <a-sub-menu key="sub1-5" title="视角2监控列表">
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><a-icon type="setting" /><span>系统设置</span></span>
          <a-menu-item key="7">
            选项
          </a-menu-item>
          <a-menu-item key="8">
            退出
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </template>
  <script>
  export default {
    props: {
    videoList: {
      type: Array,
    }
   },
    data() {
      return {
        current: '1',
        theme: 'dark',
      };
    },
    methods: {
      handleClick(e) {
        this.current = e.key;
      },
      changeTheme(checked) {
        this.theme = checked ? 'dark' : 'light';
      },
      selectVideo(videoId,VideolistID) {
      this.$emit('update-current-video', videoId,VideolistID);
    }
    },
  };
  </script>
 <style scoped>
       
 </style>