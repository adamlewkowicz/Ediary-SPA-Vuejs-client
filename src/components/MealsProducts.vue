<template>
  <tr v-if="!product.showDetails" class="default-details">
    <td>
      {{ product.name }}
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
      <button class="btn-del-product"
        @click="deleteMealProduct({
          mealKey, mealId, productKey, productId
        })">&#x2715;</button>
    </td>
  </tr>
  <tr v-else>
    <td colspan="7">
      <img :src="`http://localhost:3000/${product.img}`"/>
      <table>
        <tr>
          <td>Nazwa:</td>
          <td>{{ product.name }}</td>
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
  max-width: 50px;
  text-align: center;
  font-size: 14px;
  padding-left: 10px;
  box-sizing: border-box;
  font-family: $ff;
  border-style: none;
  border-bottom: 1px solid #d8d8d8;
}

.show-details-btn {
  @extend %clearBtn;
  background: url('./../assets/img/icons/arrow-down.png') no-repeat center;
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
  border-radius: 30px;
  width: 22px;
  height: 22px;
  &:hover {
    background-color: #ff7675;
    color: #fff;
  }
}

.default-details {
  td {
    padding: 12px;
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


