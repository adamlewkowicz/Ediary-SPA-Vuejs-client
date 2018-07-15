<template>
  <section>
    <article class="box">
      <header>
        <h1>Logowanie</h1>
      </header>
      <vue-form :formData="formData"/>
    </article>
  </section>
</template>

<script>
import VueForm from '@/components/VueForm';
import Joi from 'joi';

export default {
  components: { VueForm },
  data() {
    return {
      credentials: {
        email: 'testaccount',
        password: 'envEirra'
      },
      formData: {
        elements: [
          {
            label: { id: 'login-email', name: 'Email' },
            validation: {
              joi: Joi.string().email().min(4).max(30).required(),
              errMsg: "Adres email jest nieprawidłowy"
            }
          },
          {
            type: 'password',
            label: { id: 'login-password', name: 'Hasło' },
            validation: {
              joi: Joi.string().min(4).max(30).required(),
              errMsg: "Hasło jest nieprawidłowe"
            }
          },
          {
            type: 'submit',
            value: 'Zaloguj się',
            class: 'login-submit'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.errors = [];
      const loginVals = Object.values(this.credentials);
      if (loginVals.some(val => val.length < 4)) {
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


<style lang="scss">
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
  margin: 0 0 40px 0;
  font-size: 25px;
}

.login-submit {
  @extend .btn-submit;
  margin-top: 40px;
}

input {
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #c0392b;
}
</style>
