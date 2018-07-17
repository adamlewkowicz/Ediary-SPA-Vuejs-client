<template>
  <div>

    <div class="meal-helpers">
      <button class="add-btn" @click="addMeal">Dodaj nowy posiłek</button>
    </div>

     <meals
      v-for="(meal, mealKey) in todaysMeals"
      :key="mealKey"
      :meal="meal"
      :mealKey="meal.mealKey"
      :mealId="meal.id"
      class="meals"
    />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Meals from '@/components/Meals';

export default {
  props: {
    todaysMeals: {
      type: Array,
      required: true
    },
    pickedDate: {
      type: String,
      required: true
    }
  },
  components: {
    Meals
  },
  methods: {
    addMeal() {
      this.$store.dispatch('addMeal', {
        name: 'Posiłek',
        date: `${this.pickedDate} ${this.getCurrentTime()}`,
        carbs: 0,
        prots: 0,
        fats: 0,
        kcals: 0,
        products: []
      });
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

.meals {
  &:last-child {
    margin-bottom: 220px;
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

