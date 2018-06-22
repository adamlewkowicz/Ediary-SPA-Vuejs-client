<template>
  <div>
    <label for="exercise-name">Nazwa ćwiczenia</label>
    <div class="finder-wrapper">
      <input type="text"
        placeholder=""
        v-model="exerciseName"
        id="exercise-name"
        @input="findExercise"
      />
      <button class="add-exercise-btn">+</button>
    </div>
    <div class="seracher-results">
      <ul>
        <li
          v-for="(exercise, exerciseKey) in exercisesFound"
          :key="exerciseKey"
          @click="addExercise(exercise)">
        {{ exercise.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import axios from 'axios';

export default {
  data() {
    return {
      exerciseName: '',
      exercisesFound: [],
      timeOut: null
    }
  },
  methods: {
    // ...mapActions(['addExercise']),
    findExercise() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(async () => {
        const { data } = await axios.get(`/trainings/exercise-names/${this.exerciseName}`);
        this.exercisesFound = data.exerciseNames;
      }, 300);
    },
    addExercise(exercise) {
      this.$store.dispatch('addExercise', {
        ...exercise,
        date: this.actualDate,
        sets: [],
        break: 5,
        finished: false
      });
    }
  },
  computed: {
    pickedDate() {
      return this.$store.state.date.picked;
    },
    actualDate() {
      return `${this.pickedDate} ${moment().format('HH:mm:ss')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.finder-wrapper {
  display: flex;
  align-items: center;
}

.exercise-name {
  flex: 9;
  border-radius: 20px 20px;
}

.add-exercise-btn {
  @extend %clearBtn;
  color: #fff;
  flex: 2;
  font-size: 16px;
  padding-left: 2px;
  box-sizing: border-box;
  box-shadow: -7px 0px 40px rgba(84, 87, 219, .5);
  background-color: #31358d;
  border-radius: 0 20px 20px 0;
  height: 38px;
  min-width: 50px;
}
</style>

