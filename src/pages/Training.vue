<template>
  <div>
    <bar-date-picker />

    <training-creat />

    <button @click="editMode = !editMode">
      {{ editMode ? 'Tryb edycji' : 'Tryb treningowy' }}
    </button>

    <!-- <exercises v-if="!trainingMode"
      v-for="(exercise, exerciseKey) in dailyTrainings"
      :key="exerciseKey"
      :exerciseKey="exerciseKey"
      :exerciseId="exercise.id"
      :exercise="exercise"
    /> -->

    <div
      v-for="(exercise, exerciseKey) in dailyTrainings"
      :key="exerciseKey"
      :exerciseKey="exerciseKey"
      :exerciseId="exercise.id"
      :exercise="exercise"
    >
      <trainings-editor v-if="editMode"
        :exerciseKey="exercise.exerciseKey"
        :exerciseId="exercise.id"
        :exercise="exercise"
      />

      <trainings v-else
        :exerciseKey="exercise.exerciseKey"
        :exerciseId="exercise.id"
        :exercise="exercise"
      />

    </div>
    <!-- <trainings
      v-for="(exercise, exerciseKey) in dailyTrainings"
      :key="exerciseKey"
      :exerciseKey="exerciseKey"
      :exerciseId="exercise.id"
      :exercise="exercise"
    /> -->

  </div>
</template>

<script>
import BarDatePicker from '@/components/BarDatePicker';
import TrainingCreator from '@/components/TrainingCreator';
import TrainingCreat from '@/components/TrainingCreat';
import TrainingsEditor from '@/components/TrainingsEditor';
import Trainings from '@/components/Trainings';

export default {
  components: {
    BarDatePicker,
    TrainingCreator,
    TrainingCreat,
    TrainingsEditor,
    Trainings
  },
  data() {
    return {
      editMode: true
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
