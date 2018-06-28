<template>
  <tr>

    <template v-if="set.isActive">
      <td colspan="5" class="active-set"
        :class="{ 'break': activeBreak }">

        <div v-if="!activeBreak">
          <button @click.stop="startBreak">
            Przerwa
          </button>
          {{ set.time }}s
        </div>

        <div v-else>
          Przerwa {{ countBreakTime }}s
          <button @click.stop="endBreak">
            Koniec
          </button>
          <button
            @click.stop="extendBreakTime"
          >Przedłuż o 10s
          </button>
        </div>

      </td>
    </template>

    <template v-else>
      <td>{{ setKey+1 }}</td>
      <td>{{ set.repeats }}</td>
      <td>{{ set.loadweight }}</td>
      <td>{{ set.time }}s</td>
      <td>{{ set.break }}s</td>
    </template>

  </tr>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['exerciseKey', 'setKey', 'set', 'lastSet'],
  data() {
    return {
      activeBreak: false,
      countBreakTime: 0,
      interval: null
    }
  },
  methods: {
    ...mapMutations(['UPDATE_EXERCISE_SET']),
    startSet() {
      this.interval = setInterval(() => {
        this.updateExerciseSet({ time: this.set.time+1 });
      }, 1000);
    },
    startBreak() {
      clearInterval(this.interval);
      this.activeBreak = true;
      this.countBreakTime = this.set.break;
      this.interval = setInterval(() => {
        this.countBreakTime--;
        if (this.countBreakTime < 1) {
          this.endBreak();
        }
      }, 1000);
    },
    extendBreakTime(event, time = 10) {
      this.countBreakTime += time;
      this.updateExerciseSet({ break: this.set.break + time });
    },
    endBreak() {
      clearInterval(this.interval);
      this.updateExerciseSet({
        finished: true,
        isActive: false,
        break: this.set.break - this.countBreakTime
      });
      this.$emit('nextSet');
    },
    updateExerciseSet(set, setKey = this.setKey) {
      this.UPDATE_EXERCISE_SET({
        exerciseKey: this.exerciseKey,
        setKey,
        set
      });
    }
  },
  computed: {
    isActive () {
      return this.set.isActive;
    }
  },
  watch: {
    isActive (isActive) {
      clearInterval(this.interval);
      if (isActive) {
        this.activeBreak = false;
        this.startSet();
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss" scoped>
tr {
  &:hover {
    cursor: pointer;
    background-color: rgba(0,0,0,.1);
  }
}

td {
  padding: 20px;
  text-align: center;
}

.active-set {
  background-color: #27ae60;
  color: #fff;
  button {
    @extend %clearBtn;
    background-color: #2ecc71;
    color: #fff;
    padding: 5px;
    border-radius: 10px;
  }
}

.break {
  background-color: #3498db;
  button {
    background-color: #2980b9;
  }
}
</style>

