<template>
  <section>
    <article class="box">
      <header>
        <h1>Logowanie</h1>
      </header>
      <form>
        <label for="email">Email:</label>
        <input type="text" id="email" class="text" v-model="credentials.email">
        <label for="password">Hasło:</label>
        <input type="password" id="password" class="text" v-model="credentials.password">
        <button class="btn-submit">Zaloguj się</button>
      </form>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      }
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
  margin-top: 40px;
}
</style>
