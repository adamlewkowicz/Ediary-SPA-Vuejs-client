<template>
  <div id="menu_wrapper">
    <div class="user">
    </div>
    Profil
    <button class="btn">
      <img src="./../assets/img/icons/person.png"/>
    </button>
    Ustawienia
    <button class="btn">
      <img src="./../assets/img/icons/settings.png"/>
    </button>
  </div>
</template>

<style lang="scss" scoped>
#menu_wrapper {
  background-color: #fff;
  height: 70px;
  // box-shadow: 0px -10px 40px 10px #d8d8d8;
  box-shadow: 0px -20px 40px 10px #d8d8d8;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 50px;
}

.btn {
  border-style: none;
  background-color: #fff;
  padding: 0 10px;
  &:hover {
    cursor: pointer;
  }
  &:not(:last-child) {
    margin-right: 30px;
  }
}
</style>

