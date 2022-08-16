<template>
  <dev class="auth-page">
    <dev class="login-section">
      <h2>ログイン</h2>
      <h3>会員のお客さま</h3>
      <p>メールアドレスとパスワードを入力してログインしてください。</p>
      <form @submit.prevent="login">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="{ errors }" rules="required|email">
            <div class="entry">
              <div class="error">
                {{ errors[0] }}
              </div>
              <label>メールアドレス:</label>
              <input id="email" type="email" v-model="loginEmail" required />
            </div>
          </validation-provider>
          <validation-provider v-slot="{ errors }" rules="min:6|required">
            <div class="entry">
              <div class="error">
                {{ errors[0] }}
              </div>
              <label>パスワード:</label>
              <input id="password" type="password" v-model="loginPassword" required />
            </div>
          </validation-provider>
          <button type="submit"
            :disabled="ObserverProps.invalid || !ObserverProps.validated">ログイン</button>
        </validation-observer>
      </form>
    </dev>
    <dev class="register-section">
      <h2>新規会員登録</h2>
      <h3>初めてご利用の方・会員以外の方</h3>
      <p>初めてご利用のお客様は、こちらから会員登録を行ってください。</p>
      <form @submit.prevent="register">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider v-slot="{ errors }" rules="required|email">
            <div class="entry">
              <div class="error">
                {{ errors[0] }}
              </div>
              <label>メールアドレス:</label>
              <input id="email" type="email" v-model="registerEmail" required />
            </div>
          </validation-provider>
          <validation-provider v-slot="{ errors }" rules="min:6|required">
            <div class="entry">
              <div class="error">
                {{ errors[0] }}
              </div>
              <label>パスワード:</label>
              <input id="password" type="password" v-model="registerPassword" required />
            </div>
          </validation-provider>
          <validation-provider v-slot="{ errors }" rules="min:4|required">
            <div class="entry">
              <div class="error">
                {{ errors[0] }}
              </div>
              <label>お名前:</label>
              <input id="name" type="text" v-model="registerName" required />
            </div>
          </validation-provider>
          <button type="submit"
            :disabled="ObserverProps.invalid || !ObserverProps.validated">新規会員登録</button>
        </validation-observer>
      </form>
    </dev>
  </dev>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      loginEmail: null,
      loginPassword: null,
      registerName: null,
      registerEmail: null,
      registerPassword: null,
    };
  },
  methods: {
    async register() {
      try {
        await this.$axios.post("http://localhost:8000/api/auth/register", {
          name: this.registerName,
          email: this.registerEmail,
          password: this.registerPassword,
        }).then(() => {
          alert('ユーザ登録が完了しました')
          this.registerName = null;
          this.registerEmail = null;
          this.registerPassword = null;
        });
      } catch {
        alert("メールアドレスがすでに登録されています");
      }
    },
    async login() {
      try {
        await this.$auth.loginWith("laravelJWT", {
          data: {
            email: this.loginEmail,
            password: this.loginPassword,
          },
        }).then(() => {
          alert('ログインしました')
        });
        this.$store.dispatch('ecsite/initAllAction');
        this.$router.push("/");
      } catch {
        alert("メールアドレスまたはパスワードが間違っております");
      }
    },
  },
};
</script>
<style>
body{
  margin:0;
}
</style>
<style scoped>
  h3{
    border-bottom: solid;
    padding-left: 10px;
    margin-bottom: 30px;
  }
  p{
    margin-left: 10px;
  }
  form{
    margin-top: 20px;
  }
  label{
    font-weight: bold;
  }
  input{
    width:300px;
  }
  button{
    display: block;
    width: 200px;
    margin: 20px auto;
    border: none;
    font-size: 12pt;
    font-weight: bold;
    color: white;
  }
  .auth-page{
    display: flex;
    justify-content:center;
  }
  .login-section, .register-section{
    margin: 100px 20px;
  }
  .entry{
    text-align: right;
  }
  .error{
    color: red;
  }
  .login-section button{
    background-color: black;
  }
  .register-section button{
    background-color: yellowgreen;
  }
</style>