<template>
  <div>
    <top-menu />
    <nav-panel />
    <section id="page-wrapper">
      <h1>Dziennik</h1>
      <router-view />
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
    ...mapActions(['getMeas'])
  },
  created() {
    this.getMeas();
  }
}
</script>

<style lang="scss">
#page-wrapper {
  box-sizing: border-box;
  margin-left: 200px;
  padding: 50px;
  @include tablet {
    margin: 0;
  }
  @include phone {
    padding: 0;
  }
}

// input[type=text] {

//   box-sizing: border-box;
//   display: block;
// }
</style>
