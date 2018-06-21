<template>
  <div>
    <p>{{ exercise.name }}</p>
    <table>
      <thead>
        <th>Seria</th>
        <th>Obciążenie</th>
        <th>Powtórzenia</th>
        <th>Usuń</th>
      </thead>
      <tbody>
        <tr>
        </tr>
      </tbody>
      <tfoot>
        <button @click="addExerciseSet">
          Dodaj serię
        </button>
        <button
          @click="deleteExercise({
            exerciseKey, exerciseId
          })"
        >x</button>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['exerciseKey', 'exerciseId', 'exercise'],
  computed: {
    meta () {
      return {
        exerciseKey: this.exerciseKey,
        exerciseId: this.exerciseId
      }
    }
  },
  methods: {
    ...mapActions(['deleteExercise']),
    addExerciseSet() {
      this.$store.dispatch('addExerciseSet', {
        ...this.meta,
        set: {
          loadweight: 0,
          repeats: 0
        }
      });
    }
  }
}
</script>
