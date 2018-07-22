import Vue from 'vue';
import axios from 'axios';

const user = {
  state: {
    isLoggedIn: localStorage.getItem('auth-token') ? true : false,
    isLoggingIn: false,
    token: null
  },
  mutations: {
    UPDATE_USER_STATE (state, payload) {
      for (let prop in payload) {
        state[prop] = payload[prop];
      }
    }
  },
  actions: {
    async login ({ commit }, payload) {
      commit('UPDATE_USER_STATE', { isLoggingIn: true });
      const postLogin = await axios.post(`/user/login`, payload);
      const authToken = `Bearer ${postLogin.data.token}`;
      localStorage.setItem('auth-token', authToken);
      axios.defaults.headers.common['Authorization'] = authToken;
      commit('UPDATE_USER_STATE', {
        ...postLogin.data,
        isLoggedIn: true,
        isLoggingIn: false
      });
    },
    logout ({ commit }) {
      localStorage.removeItem('auth-token');
      axios.defaults.headers.common['Authorization'] = null;
      commit('UPDATE_USER_STATE', {
        isLoggedIn: false,
        token: null
      });
    },
    async checkTokenExp({ commit }, payload) {

    }
  }
}

export default user;
