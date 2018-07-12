import Vue from "vue";
import axios from "axios";
import moment from "moment";

const training = {
  state: {
    exercises: [],
    additionalSetProps: {
      isActive: false,
      finished: false
    },
    trainingMode: false
  },
  mutations: {
    CHANGE_TRAINING_MODE (state) {
      state.trainingMode = !state.trainingMode;
    },
    GET_EXERCISES (state, payload) {
      state.exercises = payload.data.exercises.map(exercise => ({
        ...exercise,
        sets: exercise.sets.map(set => ({...set, ...state.additionalSetProps}))
      }));
    },
    ADD_EXERCISE (state, payload) {
      state.exercises.push(payload);
    },
    UPDATE_EXERCISE (state, payload) {
      for (const prop in payload.exercise) {
        state.exercises[payload.exerciseKey][prop] = payload.exercise[prop];
      }
    },
    DELETE_EXERCISE (state, exerciseKey) {
      state.exercises.splice(exerciseKey, 1);
    },
    ADD_EXERCISE_SET (state, payload) {
      state.exercises[payload.exerciseKey].sets.push(payload.set);
    },
    UPDATE_EXERCISE_SET (state, payload) {
      const { exerciseKey, setKey } = payload;
      for (let prop in payload.set) {
        state.exercises[exerciseKey].sets[setKey][prop] = payload.set[prop];
      }
    },
    DELETE_EXERCISE_SET (state, payload) {
      const { exerciseKey, setKey } = payload;
      state.exercises[exerciseKey].sets.splice(setKey, 1);
    }
  },
  actions: {
    async getExercises ({ commit }, date) {
      commit('GET_EXERCISES', await axios.get(`/trainings/${date}`));
    },
    async addExercise ({ commit }, payload) {
      const { data: { id }} = await axios.post(`/trainings`, payload);
      commit('ADD_EXERCISE', { id, ...payload });
    },
    async deleteExercise ({ commit }, payload) {
      commit('DELETE_EXERCISE', payload.exerciseKey);
      await axios.delete(`/trainings/${payload.exerciseId}`);
    },
    async addExerciseSet ({ commit }, payload) {
      const { data: { id }} = await axios.post(`/trainings/${payload.exerciseId}`, payload.set);
      payload.set.id = id;
      commit('ADD_EXERCISE_SET', payload);
    },
    async updateExerciseSet ({ commit }, payload) {
      commit('UPDATE_EXERCISE_SET', payload);
      await axios.patch(`/trainings/${payload.exerciseId}/${payload.setId}`, payload.set);
    },
    async updateAllExerciseSets ({ commit }, payload) {
      commit('UPDATE_ALL_EXERCISE_SETS', payload);
      await axios.patch(`/trainings/`)
    },
    async deleteExerciseSet ({ commit }, payload) {
      commit('DELETE_EXERCISE_SET', payload);
      await axios.delete(`/trainings/${payload.exerciseId}/${payload.setId}`);
    }
  },
  getters: {
    exercisesDuration: state => {
      return state.exercises.map((exercise, index) => ({
        ...exercise,
        exerciseKey: index,
        duration: exercise.sets.reduce((duration, set) => duration += set.time + set.break, 0)
      }));
    },
    datedOnTrainings: (state, getters) => {
      return getters.exercisesDuration.reduce((trainings, training) => {
        const date = moment(training.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
        trainings[date] = trainings[date] || [];
        trainings[date] = [...trainings[date], training];
        return trainings;
      }, {});
    },
    numberOfExercises: (state, getters) => {
      return Object.keys(getters.datedOnTrainings).reduce((obj, date) => ({
        ...obj,
        [date]: getters.datedOnTrainings[date].length
      }), {});
    }
  }
}

export default training;
