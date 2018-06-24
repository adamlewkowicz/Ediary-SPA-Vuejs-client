<template>
  <div id="menu_wrapper">
    <div class="user">
    </div>
    Profil
    <button class="btn" @click="redirect('profile')">
      <img src="./../assets/img/icons/person.png"/>
    </button>
    Ustawienia
    <button class="btn" @click="redirect('settings')">
      <img src="./../assets/img/icons/settings.png"/>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    redirect(route) {
      this.$router.push(`/${route}`);
    }
  }
}
</script>


<style lang="scss" scoped>
#menu_wrapper {
  background-color: #fff;
  height: 70px;
  margin-left: 200px;
  box-shadow: 0px 0px 110px 0px rgba(212,214,242,.8);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 50px;
  @include tablet {
    margin: 0;
  }
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
  outline: 0;
}
</style>

