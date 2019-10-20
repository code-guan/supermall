<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.png" alt />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-button {
  width: 23px;
  height: 23px;
  border: 2px solid #aaa;
  border-radius: 50%;
  margin-left: 3px;
}

.check-button img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.check {
  background-color: #da7d7d;
  border: 1px solid #da7d7d;
}
</style>