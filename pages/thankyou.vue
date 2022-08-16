<template>
  <div class="main" v-show="$store.state.ecsite.uuid">
    <h1>ありがとうございます。注文が確定されました。</h1>
    <p>注文内容と配送状況についてはEメールでお知らせをご確認ください。</p>
    <div class="div-uuid">
      <h2>注文番号<br>{{ $store.state.ecsite.uuid }}</h2>
      <p>で承りました</p>
      <button @click="continueShopping()">ショッピングを続ける</button>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      uuid: null,
    };
  },
  computed: {
  },
  methods: {
    continueShopping() {
      this.$store.dispatch('ecsite/initUuidAction');
      this.$router.push('/');
    }
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
h2{
  line-height: 70px;
}
button{
  display: block;
  width: 200px;
  height: 40px;
  margin: auto;
  border-radius: 10px;
  border: solid;
  border-color: yellowgreen;
  background-color: yellowgreen;
  line-height: 20px;
  color: white;
}
.main{
  margin: 50px 20%;
  text-align: center;
}
.div-uuid{
  margin-top: 50px;
  background-color: lightgray;
  padding: 50px 30px;
}
</style>