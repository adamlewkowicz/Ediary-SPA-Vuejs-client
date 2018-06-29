<template>
  <div>

    <bar-date-picker
      :overlapSet="weeklyMealsMacro"
    />

    <div class="meal-helpers">
      <button class="add-btn" @click="addMeal">Dodaj nowy posiłek</button>
      <!-- <p><meal-creator /></p> -->
      <p v-if="!todaysMeals.length">
        Brak posiłków w dniu: {{ pickedDate }}
      </p>
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
    ...mapActions(['getMeals']),
    addMeal() {
      this.$store.dispatch('addMeal', {
        name: 'Posiłek',
        date: this.pickedDate,
        carbs: 0,
        prots: 0,
        fats: 0,
        kcals: 0,
        products: []
      });
    }
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

.meal-helpers {
  p {
    margin-top: 200px;
    text-align: center;
  }
}

.create-meal {
  background-color: #fff;
  padding: 13px;
  padding-right: 30px;
  box-shadow: 0px 0px 60px 3px rgba(212,214,242,1);
  border-radius: 6px;
  position: relative;
  outline: none;
  display: block;
  margin: 30px auto;
  &::after {
    content: "+";
    font-family: $ff;
    position: absolute;
    padding: 15px;
    top: calc(50% - 24.5px);
    right: -25px;
    color: #fff;
    background-color: $purple;
    border-radius: 30px;
    width: 49px;
    box-sizing: border-box;
  }
}
</style>

