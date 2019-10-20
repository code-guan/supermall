<template>
  <div class="detail-swiper">
    <swiper :banners="topImages" :isfull="true"></swiper>
  </div>
</template>

<script>
import swiper from "components/common/swiper/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    swiper
  }
};
</script>

<style scoped>
.detail-swiper {
  background: #fff;
}
</style>