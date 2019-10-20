<template>
  <div id="detail">
    <!-- 顶部导航 -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav" />

    <!-- 滑动区域 -->
    <scroll class="content" ref="scroll" :probe-type="3" @contentScroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :param-info="paramInfo" ref="param"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <!-- 底部栏 -->
    <detail-bottom-bar class="detail-bottom" @addToCart="addToCart"></detail-bottom-bar>

    <!-- 置顶按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { deboundce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParams,
  CommentInfo
} from "network/detail";

import { mapActions } from "vuex";

import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: {},
      itemImageListener: null,
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      message: "",
      show: false
    };
  },
  created() {
    //  1. 保存 id
    this.iid = this.$route.params.iid;
    // console.log(this.iid);

    // 2. 根据 id 获取 数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 获取数据
      const data = res.result;
      // 1.获取 顶部轮播图
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4. 保存 商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5. 获取参数信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6. 取出评论信息
      // this.commentInfo = data.rate.list[0];
      this.commentInfo = new CommentInfo(data.rate);

      // 使用 this.$nextTick 获取的值不对， 图片没有加载完成
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // });
    });

    // 3. 请求详情数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4. 给 getThemeTopYs 赋值
    this.getThemeTopYs = deboundce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      // console.log(this.themeTopYs);
    });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImageListener);
  },
  methods: {
    ...mapActions(["addCart"]),

    imageLoad() {
      // this.$refs.scroll.refresh();
      this.refresh();

      this.getThemeTopYs();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      // 1. 获取 y 值
      const positionY = -position.y;
      // console.log(positionY);

      // 2. positionY 和 themeTopys 中的值 进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if (
        //   this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   // console.log(i);
        //   this.currentIndex = i;

        //   this.$refs.detailNav.currentIndex = this.currentIndex;
        // }
        if (
          this.currentIndex !== i &&
          (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
        ) {
          this.currentIndex = i;

          this.$refs.detailNav.currentIndex = this.currentIndex;
        }
      }

      // 1. 置顶按钮的显示
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      // console.log("点击添加到购物车");
      // 1、获取添加到购物车的商品信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // console.log(product);

      // 2、将商品添加到购物车里
      // this.$store.cartList.push(product)
      // this.$store.commit("addCart", product);

      // 映射方法
      this.addCart(product).then(res => {
        console.log(res);
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 500);

        console.log(this.$toast);

        this.$toast.show(res);
      });

      // this.$store.dispatch("addCart", product).then(res => {
      //   console.log(res);
      // });
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Toast
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 99;
  height: 100vh;
  background: #fff;
}
.detail-nav {
  position: relative;
  z-index: 99;
  background: #fff;
}
.content {
  height: calc(100% - 102px);
  overflow: hidden;
}
</style>