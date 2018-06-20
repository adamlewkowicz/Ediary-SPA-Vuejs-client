<template>
  <div class="datepicker">
    <div
      class="day"
      v-for="(day, dayKey) in week"
      :key="dayKey"
      :class="{ 'selected-day' : day.selected }"
      @click="PICKED_DATE(day.date)"
    >
      <div v-if="mealsMacro[day.date]" class="dot-overlap">
        {{ parseInt(mealsMacro[day.date].kcals) }}
      </div>
      {{ day.day }}
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import moment from 'moment';
export default {
  props: ['mealsMacro'],
  methods: {
    ...mapMutations(['PICKED_DATE'])
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
.datepicker {
  // background-color: #333333;
  display: flex;
  justify-content: space-around;
}

.day {
  padding: 20px;
  font-size: 16px;
  width: 100%;
  text-align: center;
  position: relative;
  &:hover {
    cursor: pointer;
    border-bottom: 2px solid #d6d6d6;
  }
}

.selected-day {
  border-bottom: 2px solid #333333;
}

.dot-overlap {
  background-color: #27ae60;
  color: white;
  border-radius: 10px;
  position: absolute;
  height: 16px;
  top: 4px;
  right: 4px;
  font-size: 11px;
  padding: 0px 4px;
}
</style>

