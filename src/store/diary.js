import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';

const roundNum = val => Math.round(val * 10) / 10;

const diary = {
  state: {
    meals: []
  },
  mutations: {
    GET_MEALS (state, payload) {
      state.meals = payload.data.meals;
    },
    ADD_MEAL (state, payload) {
      console.log(payload)
      state.meals.push(payload);
    },
    UPDATE_MEAL (state, payload) {
      // state.meals[payload.mealKey] = {...state.meals[payload.mealKey], ...payload.meal }
      for (const prop in payload.meal) {
        state.meals[payload.mealKey][prop] = payload.meal[prop];
      }
    },
    DELETE_MEAL (state, mealKey) {
      state.meals.splice(mealKey, 1);
    }
  },
  actions: {
    async getMeals ({ commit }, date) {
      commit('GET_MEALS', await axios.get(`/meals/${date}`));
    },
    async addMeal ({ commit }, payload) {
      const { data: { id }} = await axios.post(`/meals`, payload);
      commit('ADD_MEAL', { ...payload, id });
    },
    async updateMeal ({ commit }, payload) {
      commit('UPDATE_MEAL', payload);
      await axios.patch(`/meals/${payload.mealId}`, payload.meal);
    },
    async deleteMeal ({ commit }, payload) {
      await axios.delete(`/meals/${payload.mealId}`);
      commit('DELETE_MEAL', payload.mealKey);
    }
  },
  getters: {
    dailyMeals: state => day => {
      return state.meals.filter(meal => {
        return moment(meal.date, 'YYYY-MM-DD').diff(day, 'days') == 0;
      });
    },
    calcedMeals: state => {
      console.log(state)
      // if (!state.meals.length) return [];
      return state.meals.map(meal => ({
        ...meal,
        products: [
          ...meal.products.map(product => {
            const weightScale = product.portionWeight / 100;
            const scaleMacro = macroVal => roundNum(macroVal * weightScale);
            return {
              ...product,
              carbs: scaleMacro(product.carbs),
              prots: scaleMacro(product.prots),
              fats: scaleMacro(product.fats),
              kcals: scaleMacro(product.kcals)
            }
          })
        ]
      }));
    },
    weeklyMeals: (state, getters) => {
      return getters.calcedMeals.reduce((prev, current) => {
        const date = moment(current.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        prev[date] = prev[date] || [];
        prev[date] = [...prev[date], current];
        return prev;
      }, {});
    }
  }
}

export default diary;
