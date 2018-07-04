<template>
  <div :class="{ 'training-mode-bg': !editMode }">

    <bar-date-picker
      v-show="!trainingMode"
      :overlapSet="numberOfExercises"
    />

    <button @click="changeTrainingMode" class="mode-changer">
      {{ trainingMode ? 'Tryb edycji' : 'Tryb treningowy' }}
    </button>

    <training-creator v-show="!trainingMode"/>

    <div
      v-for="(exercise, exerciseKey) in dailyTrainings"
      :key="exerciseKey"
    >
      <trainings-editor v-if="!trainingMode"
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
import { mapActions, mapGetters } from 'vuex';

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
  methods: {
    changeTrainingMode() {
      if (!this.dailyTrainings.length) {
        alert('Aby włączyć tryb treningowy musisz dodać jakieś ćwiczenia');
      } else if (!this.dailyTrainings[0].sets.length) {
        alert('Aby włączyć tryb treningowy musisz dodać przynajmniej jedną serię do ćwiczenia');
      } else {
        this.$store.commit('CHANGE_TRAINING_MODE');
      }
    }
  },
  computed: {
    ...mapGetters(['numberOfExercises']),
    pickedDate() {
      return this.$store.state.date.picked;
    },
    pickedWeek () {
      return this.$store.state.date.pickedWeek;
    },
    dailyTrainings() {
      return this.$store.getters.datedOnTrainings[this.pickedDate] || [];
    },
    trainingMode () {
      return this.$store.state.training.trainingMode;
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
  margin: 0 auto;
  margin-bottom: 20px;
  display: block;
  background-color: #1e90ff;
  // background-color: #a55eea;
  // background-color: #20bf6b;
}

h2 {
  text-decoration: underline;
}
</style>

