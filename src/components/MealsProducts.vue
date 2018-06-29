<template>
  <tr v-if="!product.showDetails" class="default-details">
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
  <tr v-else>
    <td colspan="7">
      <img :src="`http://localhost:3000/${product.img}`"/>
      <table>
        <tr>
          <td>Nazwa:</td>
          <td>{{ product.name || cutNameLength }}</td>
        </tr>
        <tr>
          <td>Źródło:</td>
          <td>{{ product.source }}</td>
        </tr>
        <tr v-if="product.producer">
          <td>Producent:</td>
          <td>{{ product.producer }}</td>
        </tr>
        <tr>

        </tr>
      </table>
      <button
        @click="triggerDetails(false)"
        class=""
      >D</button>
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
  width: 50px;
  min-height: 45px;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
  font-family: $ff;
  border-style: none;
  color: #056bb5;
  background-color: #fff;
  // border-bottom: 1px solid #d8d8d8;
}

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

.btn-del-product {
  @extend %clearBtn;
  background-color: #e8e8e8;
  min-width: 44px;
  min-height: 44px;
  &:hover {
    background-color: #ff7675;
    color: #fff;
  }
}

.default-details {
  td {
    // padding: 12px;
    &:not(:nth-child(2)):not(:last-child) {
      padding: 12px;
    }
    &:not(:first-child) {
      text-align: center;
    }
  }
}

img {
  max-width: 250px;
  max-height: 250px;
}
</style>


