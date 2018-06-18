<template>
  <div>
    <!-- {{ el.label }} -->
    <p><label :for="el.for">{{ el.label }}</label></p>
    <input type="text" :id="el.for" v-model="name"/>
  </div>
</template>

<script>
export default {
  props: ['el'],
  data() {
    return {
      name: ''
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=text] {
  @extend %input;
  min-width: 200px;
}
</style>
