<template>
  <section class="box">
    <h1>{{ exercise.name }}</h1>
    <p>Przerwa między seriami: {{ exercise.break }} s</p>
    <button
      class="start-exercise-btn"
      @click="activeSet=0; isTraining=true"
    >
      {{ (isTraining || exerciseFinished) ? 'Rozpocznij ponownie' : 'Rozpocznij' }}
    </button>
    <p v-for="(error, errorKey) in errors" :key="errorKey">
      {{ error }}
    </p>
    <table>
      <thead>
        <tr>
          <th>Seria</th>
          <th>Powtórzenia</th>
          <th>Obciążenie</th>
          <th>Czas</th>
          <th>Przerwa</th>
        </tr>
      </thead>
      <tbody>
        <trainings-sets
          v-for="(set, setKey) in exercise.sets"
          :key="setKey"
          :exerciseKey="exerciseKey"
          :exerciseId="exerciseId"
          :setKey="setKey"
          :set="set"
          @click.native="activateSet(set, setKey)"
          @nextSet="jumpToNextSet"
        />
      </tbody>
    </table>
    <div v-if="exerciseFinished" class="finished">
      Ćwiczenie ukończone!
      <p>Całkowity czas ćwiczenia: {{ exerciseDurationInMins }} minuty</p>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import TrainingsSets from '@/components/TrainingsSets';
import axios from 'axios';

export default {
  props: ['exerciseKey', 'exerciseId', 'exercise'],
  components: { TrainingsSets },
  data() {
    return {
      activeExercise: -1,
      finished: false,
      errors: []
    }
  },
  methods: {
    ...mapMutations(['UPDATE_EXERCISE_SET']),
    jumpToNextSet(setKey) {
      if (this.unfinishedSet > 0) {
        this.updateExerciseSet(this.unfinishedSet, { isActive: true });
      }
    },
    activateSet(set, setKey) {
      this.errors = [];
      if (this.isTraining) {
        this.errors.push('Skończ bieżącą serię aby zacząć następną');
      } else if (set.finished==true) {
        if (confirm(`Czy chcesz powtórzyć tą (${setKey+1}) serię?`)) {
          this.updateExerciseSet(setKey, { isActive: true, finished: false });
        }
      } else {
        this.updateExerciseSet(setKey, { isActive: true });
      }
    },
    updateExerciseSet(setKey, set) {
      this.UPDATE_EXERCISE_SET({
        exerciseKey: this.exerciseKey,
        setKey,
        set
      });
    }
  },
  watch: {
    async exerciseFinished(isFinished) {
      if (isFinished) {
        await axios.patch(`/trainings/${this.exerciseId}`, { ...this.exercise, sets: undefined });
      }
    }
  },
  computed: {
    unfinishedSet() {
      return this.exercise.sets.findIndex(set => set.finished==false);
    },
    isTraining() {
      return this.exercise.sets.find(set => set.isActive) ? true : false;
    },
    exerciseFinished() {
      return (this.unfinishedSet == -1) && (this.exercise.sets.length > 0) ? true: false;
    },
    exerciseDurationInMins() {
      return parseInt(this.exercise.duration / 60);
    }
  }
}
</script>

<style lang="scss" scoped>
.set {
  &:hover {
    background-color: #ecf0f1;
  }
}

.start-exercise-btn {
  @extend %clearBtn;
  background-color: #6c5ce7;
  font-weight: 300;
  border-radius: 30px;
  color: #fff;
  padding: 10px;
}

.finished {
  margin-top: 30px;
}

section {
  // background-color: #fff;
  padding: 40px;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px -10px #d8d8d8;
  h1 {
    font-size: 25px;
  }
  table {
    width: 100%;
    margin-top: 50px;

  }
}
</style>

