<template>
  <div>
    <div class="box">
      <div class="doughnut-chart-wrapper">
        <doughnut-chart
          :width="500"
          :height="500"
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
    </div>
    <div class="box weekly-macro">
      <div class="line-cart-wrapper">
        <line-chart
          :options="{ responsive: true, maintainAspectRatio: false }"
          :chartData="lineChartData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DoughnutChart from '@/components/DoughnutChart';
import LineChart from '@/components/LineChart';

export default {
  props: {
    todaysMeals: {
      type: Array,
      required: true
    }
  },
  components: {
    DoughnutChart,
    LineChart
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
      'todaysMealsMacroGoalNeeds',
      'weeklyMealsMacro'
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
    lineChartData() {
      const values = Object.values(this.weeklyMealsMacro);
      const dates = Object.keys(this.weeklyMealsMacro);
      return {
        labels: dates,
        datasets: [{
          borderColor: '#0abde3',
          backgroundColor: 'transparent',

          label: 'Kalorie',
          data: values
        }]
      }
      return values;
    }
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
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  @include phone {
    flex-direction: column;
  }
}

.line-cart-wrapper {
  width: 100%;
  height: 400px;
}

.doughnut-chart-wrapper {
  width: 50%;
  max-width: 500px;
  max-height: 500px;
  @include tablet {
    width: 100%;
    margin-bottom: 50px;
  }
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
  margin: 10px 50px;
  h3 {
    text-align: center;
    margin: 0 0 30px 0;
  }
  @include phone {
    margin: 0;
  }
}

span {
  padding: 5px;
  margin-right: 35px;
  @include phone { margin-right: 10px; }
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


