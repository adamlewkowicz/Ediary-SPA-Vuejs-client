<template>
  <div>
    <div class="box" v-if="userHasMeasurements">
      <div class="chart-wrapper">
        <doughnut-chart :chartData="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DoughnutChart from '@/components/DoughnutChart';

export default {
  components: {
    DoughnutChart
  },
  computed: {
    ...mapGetters([
      'todaysMealsMacro',
      'userHasMeasurements'
    ]),
    chartData() {
      const { carbs, prots, fats } = this.todaysMealsMacro;
      return {
        datasets: [{
          data: [carbs, prots, fats],
          backgroundColor: [
            "#FF6384",
            "#8eaf34",
            "#FFCE56"
          ],
        }],
        labels: [
          'Węglowodany',
          'Białko',
          'Tłuszcze'
        ]
      }
    },
  },
}
</script>

<style lang="scss">
.chart-wrapper {
  width: 400px;
  height: 400px;
}
</style>

