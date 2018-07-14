<template>
  <div>
    <h2>{{ exercise.name }}</h2>
    <div class="box">
      Czas przerwy dla każdego z powtórzeń: {{ exercise.break }} s.
      <div class="sets-duration-setter">
        <input
          type="range"
          :value="exercise.break || 0"
          @input="updateExercise({ break: Number($event.target.value) }, 1000)"
          min="0"
          max="900"
        />
        <input
          type="text"
          :value="convertedSetsBreakTime.minutes"
          @input="updateBreakTime($event, 'min')"
        />
        min.
        <input
          type="text"
          :value="convertedSetsBreakTime.seconds"
          @input="updateBreakTime($event)"
        />
        sek.
      </div>

      <table class="center-table">
        <thead>
          <th>Seria</th>
          <th>Powtórzenia</th>
          <th>Obciążenie (kg)</th>
          <th>Przerwa (s)</th>
          <th>Usuń</th>
        </thead>
        <tbody>
          <trainings-sets-editor
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
          <tr>
            <td colspan="4">
              <button @click="addExerciseSet" class="add-set-btn">
                Dodaj serię
              </button>
            </td>
            <td>
            <button class="del-btn"
              @click="deleteExercise({
                exerciseKey, exerciseId
              })"
            ></button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TrainingsSetsEditor from '@/components/TrainingsSetsEditor';

export default {
  props: ['exerciseKey', 'exerciseId', 'exercise'],
  components: {
    TrainingsSetsEditor
  },
  data() {
    return {
      allSetsBreakTime: 0
    }
  },
  computed: {
    meta () {
      return {
        exerciseKey: this.exerciseKey,
        exerciseId: this.exerciseId
      }
    },
    convertedSetsBreakTime() {
      if (!this.exercise.break) return { minutes: 0, seconds: 0 };
      const setsBreakInMinutes = parseInt(this.exercise.break / 60);
      return {
        minutes: setsBreakInMinutes,
        seconds: this.exercise.break - setsBreakInMinutes * 60
      }
    }
  },
  methods: {
    ...mapActions(['deleteExercise']),
    updateBreakTime(event, timeUnit) {
      let value = Number(event.target.value);
      if (timeUnit == 'min') {
        if (value > 15) this.updateExercise({ break: 900 });
        if (value < 0) this.updateExercise({ break: 0 });
        else this.updateExercise({ break: value * 60 + this.convertedSetsBreakTime.seconds });
      } else {
        if (value > 59) value = 59;
        if (value < 0) value = 0;
        this.updateExercise({
          break: this.convertedSetsBreakTime.minutes * 60 + value
        });
      }
    },
    addExerciseSet() {
      this.$store.dispatch('addExerciseSet', {
        ...this.meta,
        set: {
          loadweight: 0,
          repeats: 0,
          break: 10,
          time: 0
        }
      });
    },
    updateExerciseBreak(event) {
      this.updateExercise({
        break: Number(event.target.value)
      });
    },
    updateExercise(exercise, delay) {
      this.$store.dispatch('updateExercise', {
        ...this.meta,
        delay,
        exercise
      });
    }
  },
  mounted() {
    this.allSetsBreakTime = this.exercise.break;
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 40px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 0;
}
th {
  padding: 10px;
}

h2 {
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 300;
}

.sets-duration-setter {
  margin: 10px 0;
  display: flex;
  align-items: center;
  input[type=range] {
    margin-right: 40px;
  }
  input[type=text] {
    width: 44px;
    height: 44px;
    text-align: center;
  }
}

.add-set-btn {
  color: #fff;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  background-color: $purple;
}
</style>

