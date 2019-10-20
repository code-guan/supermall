<template>
  <div id="home" class="wrapper">
    <!-- 顶部 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabControl"
      class="tab-control"
    ></tab-control>

    <!-- 实现滚动 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @contentScroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图 -->
      <swiper
        :banners="banners"
        :isfull="true"
        @swiperImageLoad="swiperImageLoad"
        class="home-swiper"
      ></swiper>

      <!-- 推荐视图 -->
      <recommend :recommends="recommends"></recommend>

      <!-- 本周热卖 -->
      <feature-view></feature-view>

      <!-- 二级导航 -->
      <!-- @tabClick 是子传父 ，父传子是 :title 形式 -->
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"></tab-control>

      <!-- 商品列表显示 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 置顶 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import swiper from "components/common/swiper/swiper";
import recommend from "./clildComps/recommend";
import FeatureView from "./clildComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { deboundce } from "common/utils";
// 导出混入
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "home",
  // 定义混入
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      showGoods: [],
      tabOffsetTop: 0,
      isTabControl: false,
      saveY: 0,
      itemImgListener: null
    };
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1. 保存离开页面时 的 y 值
    this.saveY = this.$refs.scroll.getCurrentY();

    // 2. 取消全局事件的监听
    this.$bus.$off("ItemImageLoad", this.itemImgListener);
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    this.tabClick(0);
    // 2.获取 tabControl 的 offsetTop
    // 所有的组件都有一个属性 $el ： 用于获取组件中的 元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    // 事件监听相关方法

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      this.showGoods = this.goods[this.currentType].list;

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 置顶按钮的显示隐藏
    contentScroll(position) {
      // console.log(position);
      // 1. 置顶按钮的显示
      this.isShowBackTop = -position.y > 1000;

      // 2. 二级导航栏的显示隐藏
      this.isTabControl = -position.y > this.tabOffsetTop;
    },
    // 加载更多
    loadMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求的相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    }
  },
  components: {
    NavBar,
    TabControl,
    swiper,
    recommend,
    FeatureView,
    GoodsList,
    Scroll
  }
};
</script>

<style scoped>
.home-nav {
  background: var(--color-tint);
  color: #fff;
  font-size: 18px;
  /* z-index: 999; */
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
}
.tab-control {
  position: relative;
  z-index: 999;
  top: -1px;
  padding-top: 2px;
}
#home {
  height: 100vh;
}

/* position: sticky 可以设置停留  而且需要top 属性，值多少 说明距离顶部多少停留*/
/* .tab-control { */
/* position: sticky;
  top: 44px;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 94px);
  overflow: hidden;
  margin-top: 44px;
} */
.home-swiper {
  height: 200px;
  /* overflow: hidden; */
}
.home-swiper img {
  height: 100%;
}
</style>
