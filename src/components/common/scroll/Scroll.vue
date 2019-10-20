<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1. 创建 BScroll 对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 当封装的是 div 或 span 时，需要添加 click ，才能点击触发事件
      click: true,
      // probeType 最好不写死，这样更不会影响性能
      // probeType: 3
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 2. 监听滚动的位置
    this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit("contentScroll", position);
    });

    // 3. 监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载更多");
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      // console.log("hello");
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    getCurrentY() {
      return this.scroll.y ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>