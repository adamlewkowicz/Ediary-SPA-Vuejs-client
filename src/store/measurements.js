import Vue from 'Vue';
import axios from 'axios';
import { stat } from 'fs';

const roundNum = val => Math.round(val * 100) / 100;

const measurements = {
  state: {
    weight: 0,
    bodyFat: 13.3 / 100
  },
  mutations: {
    GET_MEAS (state, payload) {
      const { meas } = payload.data;
      for (let prop in meas) {
        state[prop] = meas[prop];
      }
      state.weight = meas.all ? parseFloat(meas.all.find(meas => meas.name == 'waga').value) : 0;
    },
    ADD_MEAS (state, payload) {

    },
    ADD_WEIGHT (state, payload) {
      state.weight = payload.value;
      state.general.all.waga.push(payload);
    }
  },
  actions: {
    async getMeas({ commit }) {
      commit('GET_MEAS', await axios.get('/meas'));
    },
    async addMeas({ commit }, payload) {
      const { data: { id }} = await axios.post(`/meas/all`, payload);
      commit('ADD_WEIGHT', {...payload, id });
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
    LBM: state => roundNum((1 - state.bodyFat) * state.weight),
    BMR: (state, getters) => roundNum(370 + (21.6 * getters.LBM)),
    TDEE: (state, getters) => roundNum(getters.BMR * 1.2)
  }
}

export default measurements;
