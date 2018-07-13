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
  background-color: #fafbfd;
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


.del-btn {
  background: url("./assets/img/icons/cancel-x.svg") no-repeat center;
  transition: background-size .1s;
  background-size: 16px;
  width: 100%;
  min-height: 42px;
  min-width: 42px;
  user-select: none;
  outline: none;
  &:hover {
    background-size: 20px;
    animation: rotate .5s ease;
    animation-delay: .2s;
  }
}


@keyframes rotate {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
