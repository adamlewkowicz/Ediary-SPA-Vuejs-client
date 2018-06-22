<template>
  <div>
    <bar-date-picker />

    <training-creat />

    <button @click="trainingMode = !trainingMode">
      {{ trainingMode ? 'Tryb edycji' : 'Tryb treningowy' }}
    </button>

    <exercises v-if="!trainingMode"
      v-for="(exercise, exerciseKey) in dailyTrainings"
      :key="exerciseKey"
      :exerciseKey="exerciseKey"
      :exerciseId="exercise.id"
      :exercise="exercise"
    />

    <trainings v-else
      v-for="(exercise, exerciseKey) in dailyTrainings"
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
import Trainings from '@/components/Trainings';

export default {
  components: {
    BarDatePicker,
    TrainingCreator,
    TrainingCreat,
    Exercises,
    Trainings
  },
  data() {
    return {
      trainingMode: false
    }
  },
  computed: {
    pickedDate() {
      return this.$store.state.date.picked;
    },
    dailyTrainings() {
      return this.$store.getters.datedOnTrainings[this.pickedDate] || [];
    }
  }
}
</script>
