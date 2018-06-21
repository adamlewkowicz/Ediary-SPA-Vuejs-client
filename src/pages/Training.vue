<template>
  <div>
    <bar-date-picker />

    <training-creat />

    <exercises
      v-for="(exercise, exerciseKey) in exercises"
      :key="exerciseKey"
      :exerciseKey="exerciseKey"
      :exerciseId="exercise.id"
      :exercise="exercise"
    />

  </div>
</template>

<script>
import BarDatePicker from '@/components/BarDatePicker';
import TrainingCreator from '@/components/TrainingCreator';
import TrainingCreat from '@/components/TrainingCreat';
import Exercises from '@/components/Exercises';

export default {
  components: {
    BarDatePicker,
    TrainingCreator,
    TrainingCreat,
    Exercises
  },
  computed: {
    exercises() {
      return this.$store.state.training.exercises;
    }
  }
}
</script>
