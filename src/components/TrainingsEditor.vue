<template>
  <div>
    <h2>{{ exercise.name }}</h2>
    <div class="box">
      Czas przerwy dla każdego z powtórzeń:
      <div class="sets-duration-setter">
        <input
          type="range"
          v-model="setsBreakInSeconds"
          min="0"
          max="300"
        />
        <input
          type="text"
          :value="setsBreakTime.minutes"
          @input="updateBreakTime($event, 'min')"
        />
        min.
        <input
          type="text"
          :value="setsBreakTime.seconds"
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
      setsBreakInSeconds: 60
    }
  },
  computed: {
    meta () {
      return {
        exerciseKey: this.exerciseKey,
        exerciseId: this.exerciseId
      }
    },
    setsBreakTime() {
      const setsBreakInMinutes = parseInt(this.setsBreakInSeconds / 60);
      return {
        minutes: setsBreakInMinutes,
        seconds: this.setsBreakInSeconds - setsBreakInMinutes * 60
      }
    },
    additionalSetProps () {
      return this.$store.state.training.additionalSetProps;
    }
  },
  methods: {
    ...mapActions(['deleteExercise']),
    updateBreakTime(event, timeUnit) {
      if (event.target.value > 900) {
        this.setsBreakInSeconds = 900;
      } else if (timeUnit == 'min') {
        this.setsBreakInSeconds = event.target.value * 60 + this.setsBreakTime.seconds;
      } else {
        this.setsBreakInSeconds = 31;
      }
    },
    addExerciseSet() {
      this.$store.dispatch('addExerciseSet', {
        ...this.meta,
        set: {
          loadweight: 0,
          repeats: 0,
          break: 10,
          time: 0,
          ...this.additionalSetProps
        }
      });
    }
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

