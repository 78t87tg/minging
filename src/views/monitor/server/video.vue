<template>
        <vue-flv-player :autoplay="true" :controls="true" :muted="true" ref="myplayen" :source="src" type="mp4"/>
  </template>
<script>
import chartBoard from './test1.mp4'
import VueFlvPlayer from 'vue-flv-player';

export default {
  components: {
    VueFlvPlayer,
  },
  data() {
    return {
      src: chartBoard
    };
  },
};
</script>
  <style>
  #indexPage {
    text-align: center;
    margin: 0 auto;
  }
  .videoshow{
    margin-top: 5%;
    height: 50px;
    width: 50px;
    transform: scale(0.5);
  }
  .flv-player{
    width: 350px;
    height: 175px;
    margin-top: 12%;
  }
  </style>