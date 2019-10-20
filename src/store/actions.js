import { ADD_COUNT, ADD_TO_CART } from "./mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // state.cartList.push(payload)
      // 数组常用的方法有哪些？push/unshift/shift/sort/reverse/map/filter/reduce/join
      // payload 新添加的商品
      // 1.查找之前数组是否有该商品
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      // 2.判断oldProduct
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNT, oldProduct);
        resolve("当前的商品数量+1");
      } else {
        payload.count = 1;
        // context.state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve("添加了新的商品");
      }
    });
  }
};
