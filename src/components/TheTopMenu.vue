<template>
  <div id="menu_wrapper">

    <!-- <bar-chart
      v-if="todaysMealsMacro.kcals"
      class="bar-chart"
      :chartData="barChartData"
      :options="chartOpts"
      height="70"
    /> -->

    <transition name="fade">
      <div class="macro-snippet" v-if="userHasMeasurements">
        <span>{{ dateName }}</span>
        <b>{{ todaysMealsMacro.kcals }}</b> / {{ goalMacroNeeds.kcals }} kcal
        <transition name="slide-bottom">
          <i v-show="kcalsAreHigherThanZero"
            class="kcals-left"
            :class="[kcalsAreOver ? 'rose' : '', kcalsAreFine ? 'green' : '']">
            {{ neededKcalsLeft }}
          </i>
        </transition>
      </div>
    </transition>

    <button
      @click="redirect('profile')"
      :class="{ 'notification-warning': (!fetchingData && !userHasMeasurements) }">
      <span>Profil</span>
      <img src="./../assets/img/icons/person.png"/>
    </button>

    <button @click="logout">
      <span>Wyloguj się</span>
      <img src="./../assets/img/icons/settings.png"/>
    </button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
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
      'goalMacroNeeds',
      'userHasMeasurements',
      'daysDiffFromToday',
      'todaysMealsMacroGoalNeeds'
    ]),
    kcalsAreHigherThanZero() {
      return this.todaysMealsMacro.kcals > 0 ? true : false;
    },
    kcalsAreOver() {
      return this.todaysMealsMacroGoalNeeds.kcals > 200 ? true :  false;
    },
    kcalsAreFine() {
      const kcals = this.todaysMealsMacro.kcals;
      const kcalsLeft = this.todaysMealsMacroGoalNeeds.kcals;
      return (kcalsLeft > -200 && kcalsLeft < 200) ? true : false;
    },
    neededKcalsLeft() {
      let kcals = this.todaysMealsMacroGoalNeeds.kcals;
      return kcals < 0 ?  kcals : `+${kcals}`;
    },
    pickedDate() {
      return this.$store.state.date.pickedObj;
    },
    dateName() {
      switch(this.daysDiffFromToday) {
        case -2:
          return 'Przedwczoraj zjadłeś'
        case -1:
          return 'Wczoraj zjadłeś'
        case 0:
          return 'Dzisiaj zjadłeś'
        case 1:
          return 'Jutro zjesz'
        case 2:
          return 'Pojutrze zjesz'
        default:
          const diffDateObj = moment().add(this.daysDiffFromToday, 'days').locale('pl');
          let dateName = `Dnia ${diffDateObj.format('DD.MM')}`;
          if (this.daysDiffFromToday < -2) return dateName += ' zjadłeś';
          else if (this.daysDiffFromToday > 2) return dateName += ' zjesz';
      }
    },
    fetchingData() {
      return this.$store.state.measurements.fetchingData;
    },
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
  @include phone {
    padding: 0 25px;
    span {
      display: none;
    }
  }
}

button { outline: none; }

button img {
  margin: 0 auto;
}

.notification-warning:before {
  top: 0;
  left: -10px;
  @include phone { left: -4px; }
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
  position: relative;
  @include small {
    display: none;
  }
  .kcals-left {
    background-color: #f0932b;
    color: #ffffff;
    padding: 0 5px;
    border-radius: 4px;
    font-style: normal;
    font-size: 11px;
    position: absolute;
    right: 0;
    top: -15px;
    transition: background-color .3s ease;
    &.green { background-color: #68b931 !important; }
    &.rose { background-color: #be2edd !important; }
  }
}

button {
  min-height: 44px;
  min-width: 44px;
  background-color: #fff;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>

