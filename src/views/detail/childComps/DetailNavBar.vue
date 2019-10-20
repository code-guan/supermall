<template>
  <div class="detail-nav">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.png" alt style="width: 26px; margin-top: 10px" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item ,index) in titles"
          :key="index"
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
        >{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "Detail",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.go(-1);
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.detail-nav {
  background: #fff;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
</style>