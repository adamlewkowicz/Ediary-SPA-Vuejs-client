<template>
  <div class="training-creator-wrapper">
    <label for="exercise-name">Podaj nazwę ćwiczenia:</label>
    <div class="finder-wrapper">
      <input type="text"
        placeholder=""
        class="text"
        v-model="exerciseName"
        id="exercise-name"
        @input="findExercise"
      />
      <!-- <button @click="clearSearch">x</button> -->
    </div>
    <div class="seracher-results" v-show="exercisesFound.length">
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
      if (!this.exerciseName.length) this.clearSearch();
      else {
        this.timeOut = setTimeout(async () => {
          const { data } = await axios.get(`/trainings/exercise-names/${this.exerciseName}`);
          this.exercisesFound = data.exerciseNames;
        }, 200);
      }
    },
    addExercise(exercise) {
      this.clearSearch();
      this.$store.dispatch('addExercise', {
        ...exercise,
        date: this.actualDate,
        sets: [],
        duration: 0,
        finished: false
      });
    },
    clearSearch() {
      this.exerciseName = '';
      this.exercisesFound = [];
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
.training-creator-wrapper {
  position: relative;
  margin-bottom: 40px;
}

.finder-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.exercise-name {
  flex: 9;
  border-radius: 20px 20px;
}

.seracher-results {
  animation: sizeIn .3s ease;
  border-radius: 6px;
  max-height: 204px;
  width: 300px;
  background-color: #fff;
  // box-shadow: 0 0 30px 0px rgba(212, 214, 242, .6);
  box-shadow: 0 0 30px 0px rgba(212, 214, 242, .9);
  overflow: auto;
  position: absolute;
  z-index: 1;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      background-color: #fff;
      display: block;
      padding: 16px;
      border-radius: 6px;
      &:hover {
        background-color: #a97cfc;
        color: #fff;
      }
    }
  }
}

@keyframes sizeIn {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

.add-exercise-btn {
  @extend %clearBtn;
  // color: #fff;
  // flex: 2;
  // font-size: 16px;
  // padding-left: 2px;
  // box-sizing: border-box;
  // box-shadow: -7px 0px 40px rgba(84, 87, 219, .5);
  // background-color: #31358d;
  // border-radius: 0 20px 20px 0;
  // height: 38px;
  // min-width: 50px;
}
</style>

