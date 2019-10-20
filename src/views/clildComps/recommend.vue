<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-list">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  overflow: hidden;
  text-align: center;
  background: #fff;
  margin-bottom: 10px;
}
.recommend-list {
  flex: 1;
  display: block;
  padding: 10px;
}
.recommend-list img {
  width: 80%;
}
.recommend-list a {
  color: #666;
}
</style>
