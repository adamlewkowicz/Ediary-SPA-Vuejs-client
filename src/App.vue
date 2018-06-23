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
  background-color: #f0f2f6;
}
#app {
  font-family: 'Open Sans';
  font-family: 'Segoe UI';
  // font-family: 'Lato';
  // font-family: 'Montserrat';
  background-color: #f0f2f6;
  font-size: 14px;
  // color: #1f1f1f;
  color: #342843;
  // background-color: red;
  box-sizing: border-box;
  // width: 100%;
  min-height: 100vh;
}

label {
  margin: 7px 0;
  display: block;
}
</style>
