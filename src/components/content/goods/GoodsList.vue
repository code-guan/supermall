<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
      class="goods-list"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods: {}
  }
};
</script>

<style scoped>
.goods {
  width: 100%;
  overflow: hidden;
}
.goods .goods-list {
  display: block;
  width: 50%;
  float: left;
}
</style>