<template>
  <div>
    <bar-date-picker
      :mealsMacro="weeklyMealsMacro"
    />

    <meal-creator />

    <meals
      v-for="(meal, mealKey) in todaysMeals"
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
import BarDatePicker from './../components/BarDatePicker';
import Meals from './../components/Meals';
import MealCreator from './../components/MealCreator';

export default {
  components: {
    BarDatePicker,
    Meals,
    MealCreator
  },
  data() {
    return {
      meals: [],
      pickedDay: '',
      pickedMonth: ''
    }
  },
  methods: {
    ...mapActions(['getMeals'])
  },
  computed: {
    ...mapGetters(['weeklyMeals', 'weeklyMealsMacro']),
    pickedDate () {
      return this.$store.state.date.picked;
    },
    todaysMeals() {
      return this.weeklyMeals[this.pickedDate];
    }
  },
  created() {
    // this.date = moment().format('DD-MM');
    // this.pickedDay = moment().format('DD');
    this.getMeals('2018-06-18');
    // this.pickedDate = moment().format('YYYY-MM-DD');
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
</style>

