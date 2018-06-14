<template>
  <div id="panel_wrapper">
    <div id="nav">
      <ul>
        <li>
          <router-link to="/" class="home">
          </router-link>
        </li>
        <li>
          <router-link to="/diary">
          </router-link>
        </li>
        <li>
          <router-link to="/training">
          </router-link>
        </li>
        <li>
          <router-link to="/ae">
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>

@mixin icon($name) {
  $icoUrl: "./../assets/img/icons/";
  background-image: url($icoUrl + $name + ".png");
  &:hover, &:focus, .router-link-exact-active {
    background-image: url($icoUrl + $name + "-hover.png");
  }
}

#panel_wrapper {
  width: 200px;
  height: calc(100vh - 70px);
  padding: 80px 0;
  box-sizing: border-box;
  position: fixed;
}

#nav {
  height: 100%;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  position: relative;
  top: calc((100% - 520px)/2);
  }

a {
  background-position: calc(100px - 12px) calc(65px - 12px);
  background-repeat: no-repeat;
  height: 130px;
  display: block;
  border-right: 1px solid #dddddd;
  &:hover, &:focus {
    border-right: 2px solid #a7c0e9;
  }
}

a.router-link-exact-active {
  border-right: 2px solid #a7c0e9;
}

li {
  &:first-child { a { @include icon("home"); } }
  &:nth-child(2) { a { @include icon("calendar"); } }
  &:nth-child(3) { a { @include icon("dumbbell"); } }
  &:last-child { a { @include icon("chart"); } }
}
</style>
