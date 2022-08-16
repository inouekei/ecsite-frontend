<template>
  <div class="product-card" @click="showProduct(product.id)">
    <img :src="product.image_link"></img>
    <p>{{product.name}}<br>\{{ product.price.toLocaleString() }}(税込)</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      id: null,
      name: '',
      price: null,
      image_link: ''
    },
  }, 
  methods: {
    showProduct(id) {
      this.$router.push('/products/' + id);
    },
  },
};
</script>

<style scoped>
img{
  width: 100%;
}
p{
  margin: 0;
  line-height: 12pt;
}
.product-card{
  width: 20%;
  margin: 10px;
}
</style>
