<template>
  <div>
    <input type="text" v-model="productName" class="searcher" placeholder="Nazwa produktu..."/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.searcher {
  // border-bottom: 1px solid #8c8c8c;
  width: 100%;
  height: 35px;
  background: url("./../assets/img/icons/glass-finder.svg") no-repeat;
  background-size: 18px;
  background-position-y: center;
  padding: 5px 35px;
  font-family: $ff;
  font-size: 14px;
  outline: 0;
  &::placeholder {
    color: #b6b6b6;
  }
}
</style>



