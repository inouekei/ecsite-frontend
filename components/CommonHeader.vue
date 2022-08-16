<template>
  <header>
    <h1 class="title">Trace</h1>
    <nav class="nav">
      <ul class="menu-group">
        <li v-if="$auth.loggedIn">
          <div>Name:{{ $auth.user.name }}</div>
        </li>
        <li>
          <a href="/mypage"><img src="~/assets/user.png" width="30px"></a>
        </li>
        <li>
          <a href="/cart"><img src="~/assets/cart.png" width="30px"></a>
        </li>
        <li v-if="$auth.loggedIn">
          <a @click="logout"><img src="~/assets/logout.png" width="30px"></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
          .then(() => {
          alert('ログアウトしました')
        });
        this.$store.dispatch('ecsite/emptyCartAction');
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
header {
  height: 40px;
  margin: 10px 30px;
  border-bottom: solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-group li {
  list-style: none;
  display: inline-block;
}
.menu-group li a {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
