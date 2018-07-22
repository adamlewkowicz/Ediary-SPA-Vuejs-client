<template>
  <div>

    <bar-date-picker
      :overlapSet="weeklyMealsMacro"
    />

    <button class="add-btn" @click="addMeal">Dodaj nowy posiłek</button>

    <p v-if="!todaysMeals.length">
      Brak posiłków w dniu: {{ pickedDate }}
    </p>

    <router-view v-else
      :todaysMeals="todaysMeals"
      :pickedDate="pickedDate"
    />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BarDatePicker from '@/components/BarDatePicker';
import moment from 'moment';

export default {
  components: {
    BarDatePicker
  },
  data() {
    return {
      pickedDay: '',
      pickedMonth: ''
    }
  },
  methods: {
    ...mapActions(['getMeals']),
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
    },
    getCurrentTime() {
      return moment().format('HH:mm:ss');
    }
  },
  computed: {
    ...mapGetters(['weeklyMeals', 'weeklyMealsMacro']),
    date() {
      return this.$store.state.date;
    },
    pickedDate() {
      return this.date.picked;
    },
    pickedWeek() {
      return this.date.pickedWeek;
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
p {
  margin-top: 200px;
  text-align: center;
}
</style>


