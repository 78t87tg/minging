<template>
    <div>
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        title="矿场视频监控系统"
        sub-title="This is a subtitle"
        class="VideoTopMenuheader" 
      >
        <template slot="extra">
          <a-button key="1" type="primary" @click="returnIndex">
            返回首页
          </a-button>
        </template>
      </a-page-header>
    </div>
  </template>
   <script>
   export default {
     methods: {
      returnIndex() {
        this.$router.push("/index")
       },
     },
   };
   </script>
  <style>
  .VideoTopMenuheader{
    color: white;
  }
  .VideoTopMenuheader .ant-page-header-heading-title {
    color: white;
}
  tr:last-child td {
    padding-bottom: 0;
  }
  </style>