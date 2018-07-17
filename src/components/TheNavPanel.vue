<template>
  <div id="panel_wrapper">
    <nav>
      <ul>
        <li>
          <router-link to="/" class="home">
            Panel główny
          </router-link>
        </li>
        <li>
          <router-link to="/diary">
            Dziennik
          </router-link>
          <ul v-if="$route.path.startsWith('/diary')" class="nested-list">
            <li>
              <router-link to="/diary">
                Posiłki
              </router-link>
            </li>
            <li>
              <router-link to="/diary/stats">
                Statystyki
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/training">
            Treningi
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

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
  box-sizing: border-box;
  position: fixed;
  top: 0;
  height: 100vh;
  background: linear-gradient(to bottom, #C38FFB, #7457D5);
  @include tablet {
    background: linear-gradient(to right, #C38FFB, #7457D5);
    position: relative;
    height: 50px;
    width: 100%;
    ul {
      display: flex;
      justify-content: center;
    }
  }
}

nav {
  margin-top: 70px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  a {
    display: block;
    color: #fff;
    padding: 15px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 600;
    text-indent: 1px;
    &:hover {
      background-color: rgba(0,0,0,.1);
      border-radius: 12px;
    }
  }
  @include tablet {
    margin-top: 0px;
    // height: 100%;
  }
}


.nested-list {
  background-color: rgba(0,0,0,.1);
  list-style-type: circle !important;
  a { padding-left: 35px; }
}

</style>
