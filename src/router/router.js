// 导入 插件
import Vue from "vue";
import VueRouter from "vue-router";

// 挂载路由
Vue.use(VueRouter);

// 导入对应的路由组件
import home from "views/home.vue";
import classify from "views/classify.vue";
import shopcar from "views/shopCar.vue";
import personage from "views/personage.vue";
import Detail from "views/detail/Detail.vue";

// 创建路由对象
const router = new VueRouter({
  routes: [
    // 配置路由规则
    { path: "/", redirect: "/home" },
    { path: "/home", component: home },
    { path: "/classify", component: classify },
    { path: "/shopcar", component: shopcar },
    { path: "/personage", component: personage },
    { path: "/detail/:iid", component: Detail }
  ],
  mode: "history",
  linkActiveClass: "mui-active" // 覆盖默认的路由高亮的类，默认的是 router-link-active
});

// 把路由对象暴露出去
export default router;
