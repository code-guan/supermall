<template>
  <div id="app">
    <!-- 顶部区域 -->

    <!-- 中部 区域 -->
    <!-- exclude: 排除在外 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab ignore">
      <router-link class="mui-tab-item-lib" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/classify">
        <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
        <span class="mui-tab-label">分类</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-lib" to="/personage">
        <span class="mui-icon mui-icon-person"></span>
        <span class="mui-tab-label">个人</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
@import "assets/css/base.css";

/* 改类名，解决 tabbar 点击无法切换的问题 */
.mui-bar-tab .mui-tab-item-lib.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-lib {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-lib .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-lib .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
