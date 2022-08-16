<template>
  <div class="order-row">
    <img :src="product.image_link"></img>
    <div class="wrapper">
      <div>注文番号：{{order.uuid}}</div>
      <div class="flex">
        <div class="name-section">
          <p>{{product.name}}</p>
        </div>
        <div>
          <p>{{ dateOrdered }}</p>
        </div>
        <div>
          <p>合計 {{ order.quantity }}個</p>
        </div>
        <div>
          <p>\{{product.price}}(税込)</p>
        </div>
      </div>
      <div><a :href="productPage">もう一度購入する</a></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      uuid: '',
      product_id: '',
      quantity: null,
    },
  },
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
    };
  },
  computed: {
    dateOrdered() {
      let date = new Date(this.order.created_at);
      return date.getFullYear() + "年" +
        (date.getMonth() + 1) + "月" +
        date.getDate() + "日";
    },
    productPage() {
      return '/products/' + this.order.product_id;
    }
  },
  methods: {
    async getProduct(id) {
      const resData = await this.$axios.get("http://127.0.0.1:8000/api/v1/product/" + id);
      this.product = resData.data.data;
    },
  },
  created() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/auth');
    }
    this.getProduct(this.order.product_id);
  }
};
</script>

<style scoped>
img{
  width: 10vw;
  margin-right: 10px;
}
p{
  margin: auto;
  line-height: 12pt;
}
.order-row{
  width: 100%;
  padding: 10px 0 10px;
  border-top: solid;
  color: gray;
  display: flex;
}
.wrapper{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.name-section{
  width: 30%;
  color: black;
  font-weight: bold;
}
.div-repurchase{
  font-weight: normal;
  color: gray;
}
</style>
