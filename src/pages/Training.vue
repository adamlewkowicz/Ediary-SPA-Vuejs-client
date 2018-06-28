<template>
  <div :class="{ 'training-mode-bg': !editMode }">

    <bar-date-picker v-show="editMode"/>

    <button @click="editMode = !editMode" class="mode-changer">
      {{ editMode ? 'Tryb treningowy' : 'Tryb edycji' }}
    </button>

    <training-creator v-show="editMode"/>

    <div
      v-for="(exercise, exerciseKey) in dailyTrainings"
      :key="exerciseKey"
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

  </div>
</template>

<script>
import BarDatePicker from '@/components/BarDatePicker';
import TrainingCreator from '@/components/TrainingCreator';
import TrainingsEditor from '@/components/TrainingsEditor';
import Trainings from '@/components/Trainings';

export default {
  components: {
    BarDatePicker,
    TrainingCreator,
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

<style lang="scss" scoped>
.training-mode-bg {
  background-color: #342843;
}

.mode-changer {
  border-radius: 30px;
  padding: 16px;
  width: 200px;
  // font-size: 16px;
  color: #fff;
  margin: 20px auto;
  display: block;
  background-color: #1e90ff;
  // background-color: #a55eea;
  // background-color: #20bf6b;
}

h2 {
  text-decoration: underline;
}
</style>

