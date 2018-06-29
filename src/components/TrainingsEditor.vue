<template>
  <div>
    <h2>{{ exercise.name }}</h2>
    <div class="box">
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
  computed: {
    meta () {
      return {
        exerciseKey: this.exerciseKey,
        exerciseId: this.exerciseId
      }
    },
    additionalSetProps () {
      return this.$store.state.training.additionalSetProps;
    }
  },
  methods: {
    ...mapActions(['deleteExercise']),
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

.add-set-btn {
  color: #fff;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  background-color: $purple;
}
</style>

