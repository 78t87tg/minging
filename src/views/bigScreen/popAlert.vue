<template>
  <div class="popAlert">
    <div class="popAlertHead">
      <!-- <span class="icon icon-warning"></span> -->
      <p>系统警告</p>
    </div>
    <div class="popAlertBody">
      <p>{{ alertInfo.time }}发生{{ alertInfo.type }}异常。</p>
      <!-- <button @click="closePopAlert" class="seeAlert">知道了</button> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    alertInfo: Object // 声明 message 为字符串类型
  },
  methods: {
    // closePopAlert () {
    //   this.$emit('closeAlert');
    // }
  },
}
</script>

<style>
@import url(../../assets/css/popAlert.css);
@import url(../../assets/css/icon-style.css);
</style>
