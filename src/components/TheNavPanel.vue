<template>
  <div>
    <button
      @click="isOpened = !isOpened"
      class="close-menu-btn"
      :class="{ 'opened': isOpened }">
    </button>
    <div id="panel_wrapper" :class="{ 'opened': isOpened }">
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
            <transition name="slide-left">
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
            </transition>
          </li>
          <li>
            <router-link to="/training">
              Treningi
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="blur-background"
      @click="isOpened = !isOpened"
      v-show="isOpened"
    >
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpened: false
    }
  }
}
</script>

<style lang="scss" scoped>

@mixin icon($name) {
  $icoUrl: "./../assets/img/icons/";
  background-image: url($icoUrl + $name + ".png");
  &:hover, &:focus, .router-link-exact-active {
    background-image: url($icoUrl + $name + "-hover.png");
  }
}

.close-menu-btn {
  transition: background-url .3s ease;
  transition: left .3s ease;
  background: url(".././assets/img/icons/menu.svg") no-repeat center;
  background-size: 24px;
  outline: none;
  user-select: none;
  position: fixed;
  width: 42px;
  height: 42px;
  left: 25px;
  top: 14px;
  z-index: 93;
  display: none;
  @include tablet {
    display: block;
  }
  &.opened {
    background: url(".././assets/img/icons/cancel.svg") no-repeat center;
    background-size: 20px;
    left: 144px;
  }
}

.blur-background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1,1,1,.3);
  z-index: 90;
}

#panel_wrapper {
  width: 200px;
  box-sizing: border-box;
  position: fixed;
  z-index: 91;
  top: 0;
  transition: all .3s ease;
  height: 100vh;
  background: linear-gradient(to bottom, #C38FFB, #7457D5);
  @include tablet {
    transform: translateX(-100%);
  }
  &.opened {
    transform: translateX(0);
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
}

.router-link-exact-active {
  color: #f7ceff;
}


.nested-list {
  margin: 5px 0;
  background-color: rgba(0,0,0,.1);
  list-style-type: circle !important;
  a { 
    padding-left: 35px;
    &:hover {
      border-radius: 0;
      background-color: rgba(255,255,255,.2);
    }
  }
}

</style>
