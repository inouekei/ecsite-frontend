<template>
  <div class="main" v-if="$auth.loggedIn">
    <div class="flex">
      <div>
        <h1>ショッピングカート</h1>
        <div class="order-list">
          <CurrentOrder v-for="order in $store.state.ecsite.cart" :order="order"></CurrentOrder>
        </div>
      </div>
      <div class="div-total">
        <h2>合計：\{{ $store.getters['ecsite/total'].toLocaleString()
        }}税込</h2>
        <button @click="validateOrders()">注文する</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    validateOrders() {
      let isEmpty = null;
      for (let i = 0; i < this.$store.state.ecsite.cart.length; i++) {
        let q = parseFloat(this.$store.state.ecsite.cart[i]['quantity']);
        if (q === 0) {
          if (isEmpty === null) isEmpty = true;
          else if (isEmpty === false) {
            alert('個数が不適切です');
            return;
          }
        } else if (q < 0 || q > 20 || !(Number.isInteger(q))) {
          alert('個数が不適切です');
          return;
        } else {
          if (isEmpty === null) isEmpty = false;
          else if (isEmpty === true) {
            alert('個数が不適切です');
            return;
          }
        }
      }
      if (isEmpty) alert('カートは空です');
      else {
        this.$store.dispatch('ecsite/placeOrdersAction', this.$store.getters['ecsite/ordersForServer']);
        this.$router.push("/thankyou");
      }
    },
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/auth');
    }
  }
}
</script>
<style>
body {
  margin: 0;
}
</style>
<style scoped>
button{
  width: 200px;
  height: 20px;
  line-height: 20px;
  margin: 5px;
  border-radius: 10px;
  border: solid;
  border-color: yellowgreen;
  color: white;
  background-color: yellowgreen;
}
.main{
  margin: 10px 30px;
}
.flex{
  display: flex;
  flex-wrap: wrap;
}
.order-list{
  border-bottom: solid;
}
.div-total{
  width: 30%;
  margin: auto;
  padding: 20px;
  background-color: lightgray;
  text-align: center;
}
</style>