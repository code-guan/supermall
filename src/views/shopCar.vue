<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部购买栏 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartBottomBar from "./clildComps/CartBottomBar";
import CartList from "./clildComps/CartList";

import { mapGetters } from "vuex";

export default {
  name: "shopCar",
  data() {
    return {};
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength;
    // }
    ...mapGetters(["cartLength"])
    // ...mapGetters({
    //   length: "cartlength"
    // })
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style scoped>
.cart {
  background: #fff;
  height: 100vh;
}

.nav-bar {
  background: var(--color-tint);
  color: #fff;
}
</style>
