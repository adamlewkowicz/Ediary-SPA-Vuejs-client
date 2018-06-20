import Vue from 'Vue';
import axios from 'axios';
import { stat } from 'fs';

const roundNum = val => Math.round(val * 100) / 100;

const measurements = {
  state: {
    general: {},
    weight: 68,
    bodyFat: 0.16
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
    macroNeeds: state => {
      const weight = state.weight;
      const calcMacro = {
        carbs: roundNum(2.2 * weight),
        prots: roundNum(4.4 * weight),
        fats: roundNum(0.9 * weight)
      }
      calcMacro.kcals = calcMacro.carbs * 4 + calcMacro.prots * 4 + calcMacro.fats * 9
      return calcMacro
    },
    LBM: state => (1 - state.bodyFat) * state.weight,
    BMR: (state, getters) => roundNum(370 + (21.6 * getters.LBM)),
    TDEE: (state, getters) => roundNum(getters.BMR * 1.2)
  }
}

export default measurements;
