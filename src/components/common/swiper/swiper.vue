<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 将来，谁使用此 轮播图 组件，谁为我们传递 lunbotuList -->
      <!-- 此时， lunbotuList 应该是父组件向子组件传值 -->
      <!-- :class 为轮播图手动添加 width ，是否为 100% -->
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
        <img :src="item" :class="{'full': isfull}" alt />
        <a :href="item.link">
          <img :src="item.image" :class="{'full': isfull}" @load="imageLoad" />
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["banners", "isfull"],
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    imageLoad() {
      // console.log("hello");
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 200px;
  text-align: center;
}
.mint-swipe-item img {
  width: 80%;
  height: 150%;
}
.mint-swipe-item a img {
  /* // width: 100%; */
  height: 100%;
  width: 100%;
}
.full {
  width: 100%;
}
</style>
