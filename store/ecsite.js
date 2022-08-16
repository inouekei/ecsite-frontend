export const state = () => ({
  cart: [],
  uuid: null,
});
export const getters = {
  total(state) {
    let resData = 0;
    for (let i = 0; i < state.cart.length; i++) {
      resData += (state.cart[i]['price'])*(state.cart[i]['quantity']);
    }
      return resData;
  },
  ordersForServer(state) {
    let resData = [];
    for (let i = 0; i < state.cart.length; i++){
      resData.push({
        product_id: state.cart[i]['product_id'],
        quantity: state.cart[i]['quantity'],
      });
    }
    return resData;
  }
}
export const mutations = {
  addToCartMutation(state, payload) {
    for (let i = 0; i < state.cart.length; i++){
      if (state.cart[i]['product_id'] === payload['product_id']) {
        state.cart[i]['quantity'] += payload['quantity'];
        return;
      }
    }
    state.cart.push(payload);
  },
  updateQuantityMutation(state, payload) {
    for (let i = 0; i < state.cart.length; i++){
      if (state.cart[i]['product_id'] === payload['product_id']) {
        state.cart[i]['quantity'] = payload['quantity'];
        return;
      }
    }
  },
  deleteOrderMutation(state, payload) {
    for (let i = 0; i < state.cart.length; i++){
      if (state.cart[i]['product_id'] === payload['product_id']) {
        state.cart.splice(i, 1);
        return;
      }
    }
  },
  emptyCartMutation(state) {
    state.cart = [];
  },
  updateUuid(state, uuid) {
    state.uuid = uuid;
  },
  initUuid(state) {
    state.uuid = null;
  }
}
export const actions = {
  addToCartAction(context, singleorder) {
    context.commit("addToCartMutation", singleorder);
  },
  updateQuantityAction(context, singleorder) {
    context.commit("updateQuantityMutation", singleorder);
  },
  deleteOrderAction(context, singleorder) {
    context.commit("deleteOrderMutation", singleorder);
  },
  async placeOrdersAction(context, orders) {
    const resData = await this.$axios.post(
      "http://127.0.0.1:8000/api/v1/order/",
      orders,
    );
    context.commit("emptyCartMutation");
    context.commit("updateUuid", resData.data.uuid);
  },
  initUuidAction(context){
    context.commit("initUuid");
  },
  initAllAction(context) {
    context.commit("emptyCartMutation");
    context.commit("initUuid");
  }
}