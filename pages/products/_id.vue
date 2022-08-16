<template>
  <div class="main" v-if="$auth.loggedIn">
    <div class="flex">
      <img :src="product.image_link"></img>
      <div>
        <div>{{product.name}}</div>
        <h1>\{{ localPrice }}(税込)</h1>
        <div>
          <label>個数</label><input v-model=quantity type="number" min="1" max="20" step="1" required></input>
        </div>
        <button @click="addToCart()">カートに入れる</button>
      </div>
    </div>
    <h2>{{product.desc_ttl}}</h2>
    <p>{{product.desc_body}}</p>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      product: {
        id: 0,
        name: '',
        price: null,
        image_link: '',
        desc_ttl: '',
        desc_body: '',
      },
      quantity: 1,
    };
  },
  computed: {
    localPrice() {
      if (this.product.price) {
        return this.product.price.toLocaleString();
      }
      else return null;
    },
  },
  methods: {
    async getProduct(id) {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/product/" + id);
      this.product = resData.data.data;
    },
    addToCart() {
      let q = parseFloat(this.quantity);
      if (q === 0) {
        alert("個数が0です。");
      } else if (q < 0 || q > 20 || !(Number.isInteger(q))) {
        alert("個数が不適切です。");
      } else {
        const singleOrder = {
          product_id: this.product.id,
          image_link: this.product.image_link,
          name: this.product.name,
          price: this.product.price,
          quantity: this.quantity,
        };
        this.$store.dispatch('ecsite/addToCartAction', singleOrder);
        this.$router.push("/cart");
      }
    }
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/auth');
    }
    this.getProduct(this.$route.params.id);
  }
}
</script>
<style>
body {
  margin: 0;
}
</style>
<style scoped>
img{
  width: 200px;
  margin-right: 30px;
}
button {
  position: relative;
  width: 150px;
  height: 25px;
  line-height: 20px;
  margin: 5px;
  border-radius: 10px;
  border: solid;
  border-color: yellowgreen;
  color: white;
  background-color: yellowgreen;
}
button::before{
  width: 20px;
  height: 20px;
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  background: url(~/assets/whitecart.png);
  background-size: contain;
  background-repeat: no-repeat;
}
.main{
  margin: 20vh 20vw;
}
.flex{
  margin-bottom: 100px;
  display: flex;
  /* justify-content: center; */
  flex-wrap: wrap;
}
</style>