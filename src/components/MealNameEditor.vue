<template>
  <h3 class="meal-name" :class="{ 'animated-bar': editName }">
    <form v-if="editName" @submit.prevent="updateMeal">
      <input type="text" v-model="newMealName" class="edit-meal-name">
      <button type="submit">Zapisz</button>
      <button type="button" @click="editName = !editName">Anuluj</button>
    </form>
    <div v-else>
      {{ meal.name }}
      <button
        @click="editMode"
        class="edit-name-btn"
      ></button>
    </div>
</h3>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['mealKey', 'mealId', 'meal'],
  data() {
    return {
      newMealName: '',
      editName: false
    }
  },
  methods: {
    updateMeal() {
      const { mealKey, mealId } = this;
      this.$store.dispatch('updateMeal', {
        meal: { name: this.newMealName },
        mealKey,
        mealId
      });
      this.editName = false;
    },
    editMode() {
      this.newMealName = this.meal.name;
      this.editName = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.meal-name {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 300;
  &:after {
    content: "";
    height: 4px;
    width: 110px;
    background-color: rgba(46,204,113, .0);
    position: absolute;
    top: 34px;
    border-radius: 5px;
  }
}

.animated-bar {
  &:after {
    background: linear-gradient(to right,rgba(137, 247, 254, .5), rgba(102, 166, 255, .5));
    background-size: 200% 200%;
    animation: bar 1s ease infinite;
    // height: 40px;
  }
}

.edit-meal-name {
  min-width: 250px;
  position: relative;
  top: 4px;
  font-size: 20px;
  font-family: $ff;
  padding: 0;
}

.edit-name-btn {
  @extend %clearBtn;
  background: url($icoUrl + "pencil.png") center no-repeat;
  background-size: 16px 16px;
  width: 24px;
  height: 24px;
  position: relative;
  top: 4px;
  margin-left: 10px;
}

@keyframes bar {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>



