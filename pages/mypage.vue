<template>
  <div class="main">
    <h1>購入履歴</h1>
    <div class="orders">
      <PastOrder v-for="order in orders" :order="order"></PastOrder>
    </div>
    <div class="flex">
      <div v-for="link in links">
        <div v-if="link.url">
          <button v-if="link.active">{{link.label}}</button>
          <button class="inactive" @click="getMyOrders(link.url)" v-else>{{link.label}}</button>
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
      orders: null,
      links: []
    };
  },
  computed: {
  },
  methods: {
    async getMyOrders(url) {
      const resData = await this.$axios.get(url);
      this.orders = resData.data.data.data;
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
    if (!this.$auth.loggedIn) {
      this.$router.push('/auth');
    }
    this.getMyOrders("http://127.0.0.1:8000/api/v1/order");
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
  margin: 30px 20%;
}
.div-orders{
  margin: 10px 0;
  border-bottom: solid;
}
.flex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.inactive{
  color: black;
  background-color: white;
}
</style>