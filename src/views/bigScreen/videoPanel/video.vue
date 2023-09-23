<template>
  <vue-flv-player
    :autoplay="true"
    :controls="true"
    :muted="true"
    ref="myplayen"
    :source="src"
    type="mp4"
  />
</template>
<script>
import chartBoard from '@/assets/videos/test1.mp4'
import VueFlvPlayer from 'vue-flv-player';

export default {
  components: {
    VueFlvPlayer,
  },
  data () {
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
.videoshow {
  height: 0.625rem;
  width: 0.625rem;
  transform: scale(0.5);
}
.flv-player {
  width: 5.2rem;
  height: 2.8rem;
  padding-top: 0.15rem;
  margin-top: 0px;
}
</style>
