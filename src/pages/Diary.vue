<template>
  <div>

    <bar-date-picker
      :mealsMacro="weeklyMealsMacro"
    />

    <div>
      <center>
        <p><meal-creator /></p>
        <p v-if="!todaysMeals.length">
          Brak posiłków w dniu: {{ pickedDate }}
        </p>
      </center>
    </div>

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
    pickedWeek () {
      return this.$store.state.date.pickedWeek;
    },
    todaysMeals() {
      return this.weeklyMeals[this.pickedDate] || [];
    }
  },
  created() {
    this.getMeals(this.pickedDate);
  },
  watch: {
    pickedWeek () {
      this.getMeals(this.pickedDate);
    }
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

