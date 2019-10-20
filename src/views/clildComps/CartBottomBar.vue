<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">去计算：{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;

      // 方法一：使用 filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)

      // 方法二：使用 find
      return !this.$store.state.cartList.find(item => !item.checked);

      // 方法三：使用 普通 遍历
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked) return false;
      // }
      // return true;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中
        this.$store.state.cartList.map(item => (item.checked = false));
      } else {
        // 部分选中或全部没选中
        this.$store.state.cartList.map(item => (item.checked = true));
      }
    },
    calcClick() {
      if (this.checkLength === 0) {
        this.$toast.show("请选择要购买的商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background: #eee;
  line-height: 40px;
  display: flex;
  color: #666;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}

.check-button {
  width: 23px;
  height: 23px;
  line-height: 20px;
  margin-right: 6px;
}

.price {
  margin-left: 5%;
  flex: 1;
}

.calculate {
  width: 85px;
  background: #f64;
  color: #fff;
  text-align: center;
}
</style>