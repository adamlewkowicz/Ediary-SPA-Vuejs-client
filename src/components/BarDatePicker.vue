<template>
  <div class="bar-picker-wrapper">
    <button @click="DECREASE_PICKED_WEEK"></button>
    <div class="datepicker">
        <div
          class="day"
          v-for="(day, dayKey) in week"
          :key="dayKey"
          :class="{ 'selected-day' : day.selected }"
          @click="CHANGE_PICKED_DATE(day.date)"
        >
          <div v-if="overlapSet[day.date]" class="dot-overlap">
            {{ overlapSet[day.date] == 0 ? '0' : parseInt(overlapSet[day.date]) }}
          </div>
          {{ day.day }}
        </div>
    </div>
    <button @click="INCREASE_PICKED_WEEK"></button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import moment from 'moment';
export default {
  props: {
    overlapSet: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    ...mapMutations([
      'CHANGE_PICKED_DATE',
      'DECREASE_PICKED_WEEK',
      'INCREASE_PICKED_WEEK'
    ])
  },
  computed: {
    date () {
      return this.$store.state.date;
    },
    week() {
      const sevenDays = [];
      for (let i = 0; i < 8; i++) {
        const date = moment(this.date.pickedWeek).add(i, 'day');
        const dateFormatted = moment(date).format('YYYY-MM-DD');
        const selected = (dateFormatted == this.date.picked) ? true : false;
        sevenDays.push({
          date: dateFormatted,
          day: date.format('DD'),
          selected
        });
      }
      return sevenDays
    }
  }
}
</script>

<style lang="scss" scoped>

.bar-picker-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

%buttonStyle {
  background: url($icoUrl + "arrow.svg") no-repeat center;
  background-size: 24px;
  width: 44px;
  outline: none;
}

button {
  transition: background-size .1s;
  @extend %buttonStyle;
  &:first-child {
    transform: rotate(180deg);
  }
  &:hover {
    background-size: 30px;
    animation: move 1s ease infinite;
  }
}

.clicked-btn {
  &:before {
    @extend %buttonStyle;
  }
}

@keyframes move {
  0% {
    background-position-x: 0;
  }
  50% {
    background-position-x: 10px;
  }
  100% {
    background-position-x: 0;

  }
}

@keyframes move2 {
  0% {
    background-position-x: 0;
    background-size: 24px;
    opacity: 0;
  }
  20% {
    // opacity: 1;
    background-size: 30px;
  }
  50% {
    opacity: 1;
  }
  70% {
    background-size: 30px;
    background-position-x: 10px;
  }
  80% {
    background-size: 30px;
    background-position-x: 10px;
  }
  100% {
    background-size: 30px;
    background-position-x: 10px;
  }
}

.datepicker {
  background-color: #342843;
  color: #fff;
  display: flex;
  justify-content: space-around;
  padding: 6px;
  border-radius: 12px;
}

.day {
  padding: 20px;
  font-size: 16px;
  width: 63px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  font-weight: 300;
  border-radius: 8px;
  font-size: 22px;
  transition: background-position .3s ease;
  &:not(:last-child) {
    margin-right: 5px;
  }
  &:not(.selected-day) {
    background-image: linear-gradient(to top, rgba(255,255,255,0.05), rgba(255,255,255,.1));
    background-position-y: 70px;
  }
  &:hover:not(.selected-day) {
    cursor: pointer;
  }
  @include phone {
    padding: 15px;
    width: 50px;
  }
  @include small {
    padding: 10px;
    font-size: 18px;
    width: 40px;
  }
}

.selected-day {
  background: linear-gradient(to top, #DF9FFF, #732EB8);
  // border-bottom: 1px solid rgba(255,255,255, .9);
  // border-top: 1px solid rgba(255,255,255, 0.03);
  // border-bottom: 2px solid #333333;
}

.dot-overlap {
  background-color: #27ae60;
  color: white;
  border-radius: 12px;
  position: absolute;
  height: 16px;
  top: 4px;
  right: 4px;
  font-size: 11px;
  padding: 1px 5px 0 4px;
}
</style>

