<template>
  <tr>
    <td>
      {{ product.name | cutNameLength }}
      <!-- <button
        @click="triggerDetails(true)"
        class="show-details-btn"
      ></button> -->
    </td>
    <td>
      <input type="number" class="portion-weight"
        :value="product.portionWeight"
        @input="updateMealProduct({
          mealKey, mealId, productKey, productId,
          product: { portionWeight: $event.target.value }
        })"
      />
    </td>
    <td>{{ product.carbs }}</td>
    <td>{{ product.prots }}</td>
    <td>{{ product.fats }}</td>
    <td>{{ product.kcals }}</td>
    <td>
      <button class="del-btn"
        @click="deleteMealProduct({
          mealKey, mealId, productKey, productId
        })"></button>
    </td>
  </tr>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  props: ['product', 'mealKey', 'mealId', 'productKey', 'productId'],
  data() {
    return {
      obj: {
        wat: 4
      }
    }
  },
  methods: {
    ...mapActions([
      'updateMealProduct',
      'deleteMealProduct'
    ]),
    ...mapMutations([
      'UPDATE_MEAL_PRODUCT'
    ]),
    triggerDetails(boolean) {
      this.UPDATE_MEAL_PRODUCT({ ...this.meta, product: { showDetails: boolean }})
    }
  },
  filters: {
    cutNameLength (name) {
      return (name.length > 50) ? (name.substring(0, 45)) + "..." : name;
    }
  },
  computed: {
    meta() {
      const { mealKey, mealId, productKey, productId } = this;
      return { mealKey, mealId, productKey, productId };
    }
  }
}
</script>

<style lang="scss" scoped>
.portion-weight {
  min-width: 45px;
  width: 50px;
  min-height: 45px;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
  font-family: $ff;
  border-style: none;
  color: #056bb5;
  background-color: #fff;
}
/*
.show-details-btn {
  @extend %clearBtn;
  background: url($icoUrl + "arrow-down.png") no-repeat center;
  height: 22px;
  width: 22px;
  transition: transform .3s ease;
  transform: rotate(90deg);
  &:hover {
    transform: rotate(0deg);
  }
}
*/
</style>


