<template>
  <div class="goods-list-item" @click="itemClick">
    <div class="goods-list-img">
      <img v-lazy="showImage" @load="imageLoad" />
    </div>
    <div class="goods-list-item-describe">
      <p class="title">{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="cfav">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("ItemImageLoad");
    },
    itemClick() {
      // console.log("进入详情页");
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-list-item {
  padding: 5px;
  width: 100%;
  height: 360px;
  position: relative;
  padding-left: 12px;
  box-sizing: border-box;
  /* background-color: #fff; */
}
.goods-list-img {
  display: block;
  width: 100%;
  height: 80%;
  overflow: hidden;
}
.goods-list-item img {
  width: 100%;
  height: 90%;
  /* padding: 2px; */
  border-radius: 10px;
}
.goods-list-item-describe {
  position: absolute;
  bottom: 2px;
  left: 0;
  overflow: hidden;
  margin-bottom: 10px;
  height: 20%;
  padding: 0 10px;
}
.goods-list-item .title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  padding: 0px 10px;
}
.goods-list-item .price {
  color: var(--color-high-text);
  margin-right: 30px;
  margin-left: 10px;
}
.goods-list-item .cfav {
  position: relative;
}
.goods-list-item .cfav::before {
  content: "";
  position: absolute;
  left: -18px;
  top: 2px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>