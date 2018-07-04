<template>
  <section>
    <article class="box">
      <header>
        <h1>Logowanie</h1>
      </header>
      <form @submit.prevent="login">
        <label for="email">Email:</label>
        <input type="text" id="email" class="text" v-model="credentials.email">
        <label for="password">Hasło:</label>
        <input type="password" id="password" class="text" v-model="credentials.password">
        <p v-for="(error, errorKey) in errors" :key="errorKey">
          {{ error }}
        </p>
        <button type="submit" class="btn-submit">Zaloguj się</button>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: 'randLogi',
        password: 'Testiiz'
      },
      errors: []
    }
  },
  methods: {
    login() {
      this.errors = [];
      const loginProps = Object.values(this.credentials);
      if (loginProps.some(val => val.length < 4)) {
        this.errors.push('Długość emaila i hasła musi być dłuższa niż 4');
      } else {
        this.$store.dispatch('login', this.credentials);
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    }
  },
  watch: {
    isLoggedIn(loginStatus) {
      if (loginStatus) this.$router.push('/');
    }
  }
}
</script>


<style lang="scss" scoped>
section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  transition: height .2s ease;
  width: 400px;
  padding: 50px;
  min-width: 280px;
}
h1 {
  margin-bottom: 40px;
}
label {
  margin-top: 20px;
  padding-left: 5px;
}
.btn-submit {
  margin: 10px 0;
}

input {
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #c0392b;
}
</style>
