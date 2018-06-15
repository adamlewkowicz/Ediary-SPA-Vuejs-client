<template>
  <div>
    {{ el }}
    <p><label :for="el.for">{{ el.label }}</label></p>
    <input type="text" :id="el.for"/>
    <button>Dodaj</button>
  </div>
</template>

<script>
export default {
  props: ['el']
}
</script>

<style lang="scss" scoped>
input[type=text] {
  @extend %input;
  min-width: 200px;
}
</style>
