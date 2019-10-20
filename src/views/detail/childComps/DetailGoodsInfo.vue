<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item,index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  methods: {
    imgLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 8px;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  font-size: 15px;
  overflow: hidden;
  color: #666;
}
.start {
  border-top: 0.5px solid rgb(110, 109, 109);
  margin-bottom: 20px;
  width: 25%;
}
.end {
  border: 0.5px solid rgb(110, 109, 109);
  width: 30%;
  margin-top: 20px;
  float: right;
}
.info-key {
  margin-left: 10px;
  font-size: 18px;
  padding: 10px 0;
}

.info-list {
  width: 100%;
}
.info-list img {
  width: 100%;
  overflow: hidden;
}
</style>