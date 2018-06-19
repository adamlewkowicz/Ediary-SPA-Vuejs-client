<template>
  <div>
    <div v-if="meals.length">

      Twoje posiłki {{ date }}
    </div>
    <div v-else class="">
      <p>Nie masz żadnych posiłków na <i>{{ date }}</i></p>
      <!-- <button class="btn-meal-creator">+</button> -->
      <div class="datepicker">
        <div
          class="day"
          v-for="(date, dayKey) in weekPeriod"
          :key="dayKey"
          :class="{ 'selected-day' : date.selected}"
          @click="pickedDay=date.day; pickedMonth=date.month"
        >
          <div v-if="date.selected" class="dot-overlap">
            {{ date.month }}
          </div>
          {{ date.day }}
        </div>
      </div>
    </div>

  <meal-creator />

  <meals
    v-for="(meal, mealKey) in allMeals"
    :key="mealKey"
    :meal="meal"
    :mealKey="meal.mealKey"
    :mealId="meal.id"
  />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import Meals from './../components/Meals';
import MealCreator from './../components/MealCreator';

export default {
  components: { Meals, MealCreator },
  data() {
    return {
      meals: [],
      pickedDay: '',
      pickedMonth: '',
      pickedDate: ''
    }
  },
  methods: {
    ...mapActions(['getMeals'])
  },
  computed: {
    ...mapGetters(['weeklyMeals', 'pureMeals']),
    allMeals() {
      return this.weeklyMeals[this.pickedDate];
    },
    renderDays() {
      const daysInMonth = moment().daysInMonth();
      const actualMonth = moment().format('MM');
      const startDate = `01-${actualMonth}`;
      const dates = [];
      for (let i=0; i < daysInMonth; i++) {
        const newDay = moment(startDate, 'DD-MM').add(i, 'day').format('DD');
        dates.push(newDay);
      }
      return dates;
    },
    weekPeriod() {
      const removeDays = moment().add(-3, 'day');
      const days = [];
      for (let i = 1; i < 7; i++) {
        const newDate = removeDays.add(1, 'day');
        const day = newDate.format('DD');
        const month = newDate.format('MM');
        let selected;
        (day == this.pickedDay) ? selected = true : selected  = false;
        days.push({ day, month, selected });
      }
      return days;
    }
  },
  created() {
    this.date = moment().format('DD-MM');
    this.pickedDay = moment().format('DD');
    this.getMeals('2018-06-18');
    this.pickedDate = moment().format('YYYY-MM-DD');
    // this.pickedDate = '2018-06-19';
  }
}
</script>

<style lang="scss" scoped>
.btn-meal-creator {
  border-style: none;
  border-radius: 25px;
  background-color: #a7c0e9;
  color: #fff;
  height: 35px;
  width: 35px;
  &:hover, &:focus {
    cursor: pointer;
  }
}

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
  background-color: #e67e22;
  color: white;
  border-radius: 30px;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 4px;
  right: 4px;
  font-size: 11px;
}
</style>

