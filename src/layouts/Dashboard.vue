<template>
  <div>
    <top-menu />
    <nav-panel />
    <section>
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

<style lang="scss" scoped>
section {
  box-sizing: border-box;
  margin-left: 200px;
  padding: 50px;
}
</style>
