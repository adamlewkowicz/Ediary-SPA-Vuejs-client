import Vue from 'vue';
import axios from 'axios';
import moment from 'moment';

const roundNum = val => Math.round(val * 10) / 10;
let timeOut1 = null;
const sleep = (ms, variable) => new Promise(resolve => {
  clearTimeout(variable);
  variable = setTimeout(resolve, ms);
});

const sleep2 = (ms, fn) => new Promise(resolve => {
  let timeout = null;
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await fn();
  }, ms);
});

const diary = {
  state: {
    meals: [],
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
    },
    ADD_MEAL_PRODUCT (state, payload) {
      state.meals[payload.mealKey].products.push(payload.product);
    },
    UPDATE_MEAL_PRODUCT (state, payload) {
      for (const prop in payload.product) {
        state.meals[payload.mealKey].products[payload.productKey][prop] = payload.product[prop];
      }
    },
    DELETE_MEAL_PRODUCT (state, payload) {
      state.meals[payload.mealKey].products.splice(payload.productKey, 1);
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
    },
    async addMealProduct ({ commit, state }, payload) {
      const { mealKey, mealId, product: { id: productId, portionWeight }} = payload;
      commit('ADD_MEAL_PRODUCT', payload);
      await axios.post(`/meals/${payload.mealId}/${productId}`, { portionWeight });
    },
    async updateMealProduct ({ commit }, payload) {
      commit('UPDATE_MEAL_PRODUCT', payload);
      // await sleep(1000, timeOut1);
      sleep2(1000, async () => await axios.patch(`/meals/${payload.mealId}/${payload.productId}`, payload.product));
      // await axios.patch(`/meals/${payload.mealId}/${payload.productId}`, payload.product);
    },
    async deleteMealProduct ({ commit }, payload) {
      commit('DELETE_MEAL_PRODUCT', payload);
      await axios.delete(`/meals/${payload.mealId}/${payload.productId}`)
    }
  },
  getters: {
    // dailyMeals: state => day => {
    //   return state.meals.filter(meal => {
    //     return moment(meal.date, 'YYYY-MM-DD').diff(day, 'days') == 0;
    //   });
    // },
    calcedMeals: state => {
      const sumMacro = (macroName, products) => products.reduce((sum, product) => roundNum(sum += Number(product[macroName])), 0);
      return state.meals.map((meal, index) => ({
        ...meal,
        mealKey: index,
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
      })).map(meal => ({
        ...meal,
        carbs: sumMacro('carbs', meal.products),
        prots: sumMacro('prots', meal.products),
        fats: sumMacro('fats', meal.products),
        kcals: sumMacro('kcals', meal.products),
      }));
    },
    weeklyMeals: (state, getters) => {
      return getters.calcedMeals.reduce((prev, current) => {
        const date = moment(current.date, 'YYYY-MM-DD').add(0, 'day').format('YYYY-MM-DD');
        prev[date] = prev[date] || [];
        prev[date] = [...prev[date], current];
        return prev;
      }, {});
    },
    weeklyMealsMacro: (state, getters) => {
      const weeklyM = getters.weeklyMeals;
      return Object.keys(weeklyM).reduce((meals, mealDate) => ({
        ...meals,
        [mealDate]: weeklyM[mealDate].reduce((macro, meal) => ({
          ...macro,
          kcals: macro.kcals += meal.kcals
        }), { kcals: 0 })
      }), {});
    }
  }
}

export default diary;
