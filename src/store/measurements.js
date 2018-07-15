import Vue from 'Vue';
import axios from 'axios';

const roundNum = val => Math.round(val * 100) / 100;

const measurements = {
  state: {
    weight: 0,
    bodyFat: 13.3 / 100,
    weightGoal: 'maintain',
    all: [],
    fetchingData: true
  },
  mutations: {
    GET_MEAS (state, payload) {
      const { meas } = payload.data;
      for (let prop in meas) {
        state[prop] = meas[prop];
      }
      state.weight = meas.all && meas.all.length ? parseFloat(meas.all.find(meas => meas.name == 'waga').value) : 0;
      state.fetchingData = false;
    },
    ADD_GENERAL_MEAS (state, payload) {
      for (let prop in payload) {
        state[prop] = payload[prop];
      }
    },
    UPDATE_GENERAL_MEAS (state, payload) {
      for (let prop in payload) {
        state[prop] = payload[prop];
      }
    },
    ADD_WEIGHT (state, payload) {
      state.weight = payload.value;
      state.general.all.waga.push(payload);
    },
    UPDATE_MEAS (state, payload) {
      for (let prop in payload) {
        state[prop] = payload[prop];
      }
    }
  },
  actions: {
    async getMeas({ commit }) {
      commit('GET_MEAS', await axios.get('/meas'));
    },
    async addGeneralMeas ({ commit }, payload) {
      commit('UPDATE_MEAS', payload);
      const res = await axios.post(`/meas/general`, payload);
    },
    async updateGeneralMeas ({ commit }, payload) {
      commit('UPDATE_GENERAL_MEAS', payload);
      await axios.patch(`/meas/general`, payload);
    },
    async addMeas({ commit }, payload) {
      const { data: { id }} = await axios.post(`/meas/all`, payload);
      commit('ADD_WEIGHT', {...payload, id });
    }
  },
  getters: {
    macroNeeds: state => {
      const { weight } = state;

      const getMacro = (carbs, prots, fats) => {
        const calcMacro = {
          carbs: roundNum(carbs * weight),
          prots: roundNum(prots * weight),
          fats: roundNum(fats * weight)
        }
        calcMacro.kcals = roundNum(calcMacro.carbs * 4 + calcMacro.prots * 4 + calcMacro.fats * 9);
        return calcMacro;
      }

      return {
        loss: getMacro(2.2, 2.6, 0.45),
        maintain: getMacro(3.5, 2.2, 0.8),
        increase: getMacro(4.4, 2.2, 0.9)
      }
    },
    goalMacroNeeds: (state, getters) => {
      return getters.macroNeeds[state.weightGoal];
    },
    userHasMeasurements: state => state.weight > 0 ? true : false
    // LBM: state => roundNum((1 - state.bodyFat) * state.weight),
    // BMR: (state, getters) => roundNum(370 + (21.6 * getters.LBM)),
    // TDEE: (state, getters) => roundNum(getters.BMR * 1.2)
  }
}

export default measurements;
