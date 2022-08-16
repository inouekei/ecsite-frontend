<template>
  <div class="main">
    <div class="firstview">
      <div class="firstview-text">New Arrivals</div>
    </div>
    <h1>Products</h1>
    <div class="flex">
      <Product v-for="product in products" :product="product"></Product>
    </div>
    <div class="flex">
      <div v-for="link in links">
        <div v-if="link.url">
          <button v-if="link.active">{{link.label}}</button>
          <button class="inactive" @click="getProducts(link.url)" v-else>{{link.label}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      products: null,
      links: []
    };
  },
  computed: {
  },
  methods: {
    async getProducts(url) {
      const resData = await this.$axios.get(url);
      this.products = resData.data.data.data;
      this.links = resData.data.data.links;
      for (let i = 0; i < this.links.length; i++) {
        if (this.links[i]['label'].includes('Previous')) {
          this.links[i]['label'] = '前へ'
        } else if (this.links[i]['label'].includes('Next')) {
          this.links[i]['label'] = '次へ'
        }
      }
    },
  },
  created() {
    this.getProducts("http://127.0.0.1:8000/api/v1/product");
  }
}
</script>
<style>
body {
  margin: 0;
}
</style>
<style scoped>
h1{
  text-align: center;
}
button{
  width: 60px;
  height: 20px;
  margin: 5px;
  border-radius: 10px;
  border: solid;
  border-color: yellowgreen;
  background-color: yellowgreen;
  line-height: 20px;
  color: white;
}
.main{
  margin: 10px 30px;
}
.firstview{
  width: 100%;
  height: 68vw;
  margin: 10px 0;
  background: url(~/assets/sandal.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: right;
  align-items: center;
}
.firstview-text{
  margin-right: 8vw;
  font-size: 40pt;
  font-weight: bold;
  position: relative;
}
.firstview-text::after {
  position: absolute;
  bottom: -20px;
  left: 0;
  content:'for BOYS & GIRLS';
  font-size: 20pt;
}
.flex{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.inactive{
  color: black;
  background-color: white;
}
</style>