<template>
  <div class="order-row">
    <img :src="order.image_link"></img>
    <div class="name-section">
      <p>{{order.name}}</p>
      <div class="div-delete" @click="deleteOrder()">削除する</div>
    </div>
    <p>個数</p>
    <input v-model="quantity" type="number" min="1" max="20" step="1" required></input>
    <p>\{{ order.price.toLocaleString() }}(税込)</p>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      product_id: '',
      quantity: null,
      image_link: null,
      name: null,
      price: null,
    },
  },
  computed: {
    quantity: {
      get() {
        return this.order.quantity;
      },
      set(value) {
        const tempData = {
          product_id : this.order.product_id,
          quantity: value,
        }
        this.$store.dispatch('ecsite/updateQuantityAction', tempData);
      },
    },
  },
  methods: {
    deleteOrder() {
      this.$store.dispatch('ecsite/deleteOrderAction', this.order);
    }
  },
};
</script>

<style scoped>
img{
  width: 10vw;
  margin: 10px 0;
}
p{
  margin: auto;
  line-height: 12pt;
}
input{
  height:20px;
  margin: auto;
  display: block;
}
.order-row{
  width: 50vw;
  border-top: solid;
  display: flex;
  justify-content: space-between;
}
.name-section{
  width: 40%;
  margin: auto;
  padding-left: 40px;
  font-weight: bold;
  position: relative;
}
.div-delete{
  position: absolute;
  top: 50px;
  left: 60px;
  font-weight: normal;
  color: gray;
}
</style>
