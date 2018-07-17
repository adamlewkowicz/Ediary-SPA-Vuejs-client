<template>
  <div>

    <bar-date-picker
      :overlapSet="weeklyMealsMacro"
    />

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
    ...mapActions(['getMeals'])
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


