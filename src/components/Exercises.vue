<template>
  <div class="exercise-wrapper">
    <p>{{ exercise.name }}</p>
    <table>
      <thead>
        <th>Seria</th>
        <th>Powtórzenia</th>
        <th>Obciążenie</th>
        <th>Usuń</th>
      </thead>
      <tbody>
        <exercises-sets
          v-for="(set, setKey) in exercise.sets"
          :key="setKey"
          :exerciseKey="exerciseKey"
          :exerciseId="exerciseId"
          :setKey="setKey"
          :setId="set.id"
          :set="set"
        />
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
import ExercisesSets from '@/components/ExercisesSets';

export default {
  props: ['exerciseKey', 'exerciseId', 'exercise'],
  components: {
    ExercisesSets
  },
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

<style lang="scss" scoped>
.exercise-wrapper {
  margin-top: 50px;
}
</style>

