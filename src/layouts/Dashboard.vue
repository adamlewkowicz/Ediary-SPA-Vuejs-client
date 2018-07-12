<template>
  <div>
    <top-menu v-show="!trainingMode"/>
    <nav-panel v-show="!trainingMode"/>
    <section
      class="page-wrapper"
      :class="{ 'training-mode': trainingMode }"
    >
      <div class="page-title-wrapper">
        <transition name="an">
          <h1 v-if="!trainingMode" :key="pageTitle" class="page-title">
            {{ pageTitle }}
          </h1>
        </transition>
      </div>
      <!-- <transition name="fade"> -->
        <router-view />
      <!-- </transition> -->
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import TopMenu from './../components/TheTopMenu.vue';
import NavPanel from './../components/TheNavPanel.vue';


export default {
  components: { TopMenu, NavPanel },
  methods: {
    ...mapActions(['getMeas', 'getExercises', 'getMeals'])
  },
  mounted() {
    this.getMeas();
    this.getExercises(this.pickedDate);
    this.getMeals(this.pickedDate);
  },
  computed: {
    trainingMode () {
      return this.$store.state.training.trainingMode;
    },
    pickedDate () {
      return this.$store.state.date.pickedWeek;
    },
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    pageTitle() {
      return this.$route.meta.title;
    }
  },
  watch: {
    isLoggedIn(loginStatus) {
      if (!loginStatus) {
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  box-sizing: border-box;
  margin-left: 200px;
  padding: 50px;
  @include tablet {
    margin: 0;
  }
  @include phone {
    padding: 5px;
  }
  &.training-mode {
    padding: 20px;
    margin: 0;
    // background-color: #6c5ce7;
  }
}

.page-title-wrapper {
  height: 60px;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
}

.page-title {
  font-size: 25px;
  font-weight: 400;
  margin: 0;
}

.an-enter {
  opacity: 0;
  transform: translateX(100px);
}

.an-enter-active {
  position: absolute;
  z-index: 0;
  transition: all 1s ease;
}

.an-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}

.an-leave-active {
  position: absolute;
  z-index: 0;
  transition: all .3s ease;
}


</style>
