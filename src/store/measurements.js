import Vue from 'Vue';
import axios from 'axios';

const measurements = {
  state: {
    general: {}
  },
  mutations: {
    GET_MEAS (state, payload) {
      state.general = payload.data.meas;
    }
  },
  actions: {
    async getMeas({ commit }) {
      commit('GET_MEAS', await axios.get('/meas'));
    }
  },
  getters: {
    calcNeeds: state => {
      // const { weight } = state.general;
      const weight = state.general.all.waga[0].value;
      const calcMacro = {
        carbs: 2.2 * weight,
        prots: 4.4 * weight,
        fats: 0.9 * weight
      }
      calcMacro.kcals = calcMacro.carbs * 4 + calcMacro.prots * 4 + calcMacro.fats * 9
      return calcMacro
    }
  }
}

export default measurements;
