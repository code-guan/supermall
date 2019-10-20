import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";

import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

import toast from "./components/common/toast";

Vue.config.productionTip = false;

// 导入 mint-ui 组件
import MintUi from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(MintUi);

// 导入mui样式
import "./lib/mui/css/mui.min.css";
import "./lib/mui/css/icons-extra.css";

// 安装 toast 插件
Vue.use(toast);

// 解决移动端300 毫秒的延迟
FastClick.attach(document.body);

// 使用图片懒加载
Vue.use(VueLazyLoad, {
  // loading: require("./assets/img/home/placehold.jpg")
  loading: require("./assets/img/home/timg.gif")
});

// 1.3 导入自己的 router.js 路由模块
import router from "./router/router";

// 添加事件总线对象
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
