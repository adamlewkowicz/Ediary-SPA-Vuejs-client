<template>
  <section>
    <article class="box">
      <header>
        <u class="change-mode" @click="changeMode">
          {{ loginMode ? 'Rejestracja' : 'Logowanie' }}
        </u>
        <template v-if="loginMode">
          <h1>Logowanie</h1>
          <label for="l-email">Email:</label>
          <input type="text" v-model="loginData.email" id="l-email"/>
          <label for="l-password">Hasło:</label>
          <input type="password" v-model="loginData.password" id="l-password"/>
          <button type="button" @click="login" class="login-submit">
            Zaloguj się
          </button>
        </template>
        <template v-else>
          <h1>Rejestracja</h1>
          <label for="r-email">Email:</label>
          <input type="text" v-model="registerData.email" r="r-email"/>
          <label for="r-password">Hasło:</label>
          <input type="password" v-model="registerData.password1" id="r-password"/>
          <label for="r-repeat">Hasło ponownie:</label>
          <input type="password" v-model="registerData.password2" id="r-repeat"/>
          <button type="button" @click="register" class="login-submit">
            Zarejestruj się
          </button>
        </template>
        <p v-for="(error, errorKey) in errors" :key="errorKey">
          {{ error }}
        </p>
      </header>
    </article>
  </section>
</template>

<script>
import axios from 'axios';
import VueForm from '@/components/VueForm';
import Joi from 'joi';

export default {
  components: { VueForm },
  data() {
    return {
      loginMode: true,
      isLoading: false,
      loginData: {
        email: '',
        password: ''
      },
      registerData: {
        email: '',
        password1: '',
        password2: ''
      },
      errors: [],
      credentials: {
        email: 'testaccount',
        password: 'envEirra'
      },
      formData: {
        elements: [
          {
            name: 'login',
            label: { id: 'login-email', name: 'Email' },
            validation: {
              joi: Joi.string().email().min(4).max(30).required(),
              errMsg: "Adres email jest nieprawidłowy"
            }
          },
          {
            type: 'password',
            name: 'password',
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
      if (Object.values(this.loginData).length.some(data => data.legnth < 4 || data.length > 20)) {
        this.errors.push('Email oraz hasło muszą mieć minimum 4 a maksimum 20 znaków');
      } else {
        this.isLoading = true;
        this.$store.dispatch('login', this.loginData);
      }
    },
    register() {
      this.errors = [];
      const { email, password1, password2 } = this.registerData;
      if (Object.values(this.registerData).some(data => data.length < 4 || data.length > 20)) {
        this.errors.push('Email oraz hasło muszą mieć minimum 4 a maksimum 20 znaków');
      } else if (password1 !== password2) {
        this.errors.push('Hasła muszą być identyczne');
      } else {
        this.isLoading = true;
        const credentials = { email, password: password2 };
        axios.post(`/user/register`, credentials)
          .then(res => this.$store.dispatch('login', credentials))
          .catch(err => {
            this.isLoading = false;
            this.errors.push('Nieprawidłowe dane');
          });
      }
    },
    changeMode() {
      if (!this.isLoading) this.loginMode = !this.loginMode;
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

u:hover {
  cursor: pointer;
}

.box {
  width: 400px;
  padding: 50px;
  min-width: 280px;
}

h1 {
  margin: 7px 0 35px 0;
  font-size: 25px;
  i {
    font-style: normal;
    font-size: 16px;
    padding: 5px 0;
  }
}

input {
  @extend .text;
}

.login-submit {
  @extend .btn-submit;
  margin-top: 35px;
}

input {
  margin-bottom: 10px;
}

p {
  text-align: center;
  color: #c0392b;
}
</style>
