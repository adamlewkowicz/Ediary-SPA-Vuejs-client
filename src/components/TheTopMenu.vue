<template>
  <div id="menu_wrapper">

    <!-- <bar-chart
      v-if="todaysMealsMacro.kcals"
      class="bar-chart"
      :chartData="barChartData"
      :options="chartOpts"
      height="70"
    /> -->


    <div class="macro-snippet">
      <span>Dzisiaj zjadłeś</span> <b>{{ todaysMealsMacro.kcals }}</b> / {{ goalMacroNeeds.kcals }} kcal
    </div>
    <div class="user">
    </div>
    Profil
    <button class="btn" @click="redirect('profile')">
      <img src="./../assets/img/icons/person.png"/>
    </button>
    Wyloguj się
    <button class="btn" @click="logout">
      <img src="./../assets/img/icons/settings.png"/>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DoughnutChart from '@/components/DoughnutChart';
import BarChart from '@/components/BarChart';

export default {
  components: {
    DoughnutChart,
    BarChart
  },
  methods: {
    ...mapActions(['logout']),
    redirect(route) {
      this.$router.push(`/${route}`);
    }
  },
  computed: {
    ...mapGetters([
      'todaysMealsMacro',
      'goalMacroNeeds'
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
    barChartData() {
      const { carbs, prots, fats, kcals } = this.todaysMealsMacro;
      return {
        labels: ['Węglowodany', 'Białko', 'Tłuszcze'],
        datasets: [
          {
            backgroundColor: [
              "#FF6384",
              "#8eaf34",
              "#FFCE56"
            ],
            data: [carbs, prots, fats]
          }
        ]
      }
    },
    chartOpts() {
      return {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                    display: true
                }
            }],
            xAxes: [{
                gridLines: {
                  display: false
                },
                ticks: {
                    display: false
                }
            }],
        }
      }
    }
  },
  // computed: mapGetters([
  //   'todaysMealsMacro',
  //   'goalMacroNeeds',
  //   'todaysMealsMacroGoalNeeds'
  // ])
}
</script>


<style lang="scss" scoped>
#menu_wrapper {
  background-color: #fff;
  height: 70px;
  margin-left: 200px;
  box-shadow: 0px 0px 110px 0px rgba(212,214,242,.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 50px;
  @include tablet {
    margin: 0;
  }
}

.bar-chart {
  justify-self: start;
  margin-right: auto;
  position: relative;
  top: 3px;
  left: -20px;
}

span {
  margin-right: 10px;
}

.macro-snippet {
  margin-right: 40px;
}

.btn {
  border-style: none;
  background-color: #fff;
  padding: 0 10px;
  &:hover {
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-right: 30px;
  }
  outline: 0;
}
</style>

