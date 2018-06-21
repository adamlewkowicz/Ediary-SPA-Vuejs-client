import Vue from "vue";
import axios from "axios";

const training = {
  state: {
    exercises: []
  },
  mutations: {
    ADD_EXERCISE (state, payload) {
      state.exercises.push(payload);
    },
    DELETE_EXERCISE (state, exerciseKey) {
      state.exercises.splice(exerciseKey, 1);
    },
    ADD_EXERCISE_SET (state, payload) {
      state.exercises[payload.exerciseKey].sets.push(payload.set);
    },
    UPDATE_EXERCISE_SET (state, payload) {
      const { exerciseKey, setKey } = payload;
      for (const prop in payload.set) {
        state.exercises[exerciseKey].sets[setKey][prop] = payload.set[prop];
      }
    },
    DELETE_EXERCISE_SET (state, payload) {
      const { exerciseKey, setKey } = payload;
      state.exercises[exerciseKey].sets.splice(setKey, 1);
    }
  },
  actions: {
    async addExercise ({ commit }, payload) {
      const { data: { id }} = await axios.post(`/trainings`, payload);
      commit('ADD_EXERCISE', {
        id,
        ...payload
      });
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
    async deleteExerciseSet ({ commit }, payload) {
      commit('DELETE_EXERCISE_SET', payload);
      await axios.delete(`/trainings/${payload.exerciseId}/${payload.setId}`);
    }
  }
}

export default training;
