<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'Open Sans';
  font-family: 'Segoe UI';
  background-color: #f4f4f4;
  font-size: 14px;
  color: #1f1f1f;
  // background-color: red;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
}
</style>
