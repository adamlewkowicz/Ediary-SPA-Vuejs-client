<template>
  <div class="box">
    <div class="doughnut-chart-wrapper">
      <doughnut-chart
        :chartData="chartData"
      />
    </div>
    <div class="todays-macro-info">
      <h3>Makroskładniki</h3>
      <p v-for="(macroElVal, macroElName) in goalMacroNeeds" :key="macroElName">
        <span :class="macroElName">
          {{ polishMacroElNames[macroElName] }}
        </span>
        {{ todaysMealsMacro[macroElName] }} / <b>{{ goalMacroNeeds[macroElName] }}</b>
        {{ todaysMealsMacroGoalNeeds[macroElName] }}
      </p>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DoughnutChart from '@/components/DoughnutChart';

export default {
  props: {
    todaysMeals: {
      type: Array,
      required: true
    }
  },
  components: {
    DoughnutChart
  },
  data() {
    return {
      polishMacroElNames: {
        carbs: 'Węglowodany',
        prots: 'Białko',
        fats: 'Tłuszcz',
        kcals: 'Kalorie'
      }
    }
  },
  computed: {
    ...mapGetters([
      'todaysMealsMacro',
      'userHasMeasurements',
      'goalMacroNeeds',
      'todaysMealsMacroGoalNeeds'
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
  filters: {
    macroNeedsInfo(macroVal) {
      if (macroVal < 0) return `Brakuje ${macroVal * -1}`
      else return `Dodatkowo +${macroVal}`
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
}

.doughnut-chart-wrapper {
  max-width: 350px;
}

$macroColors: #FF6384, #8eaf34, #FFCE56, #34495e;
$macroNames: 'carbs', 'prots', 'fats', 'kcals';

p {
  margin: 5px 0;
  b {
    margin-right: 20px;
  }
}

.todays-macro-info {
  h3 {
    text-align: center;
    margin: 0 0 30px 0;
  }
}

span {
  padding: 5px;
  margin-right: 35px;
  color: #fff;
  width: 102px;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
  @for $index from 1 through 4 {
    &.#{nth($macroNames, $index)} {
      background-color: nth($macroColors, $index);
    }
  }
}
</style>


