<template>
  <article>
    <h3>
      <form v-if="editName"
        @submit.prevent="updateMeal({
          meal: { name: $event.target.elements.newMealName.value },
          mealKey,
          mealId
        }); editName = !editName"
      >
        <input type="text" :value="meal.name" name="newMealName">
        <button type="submit">Zapisz</button>
        <button type="button" @click="editName = !editName">Anuluj</button>
      </form>
      <div v-else>
        {{ meal.name }}
        <button @click="editName=!editName">e</button>
      </div>
    </h3>

    <div>
      <button @click="deleteMeal({ mealKey, mealId })">
        Usuń posiłek
      </button>
    </div>

    <section>
      <table class="meals-table">
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Ilość</th>
            <th>Węgle</th>
            <th>Białko</th>
            <th>Tłuszcz</th>
            <th>Kalorie</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, productKey) in meal.products"
            :key="productKey"
          >
            <td>{{ product.name }}</td>
            <td>
              <input type="number" class="portion-weight"
                :value="product.portionWeight"
                @input="updateProdakt({
                  mealKey, mealId, productKey,
                  productId: product.id,
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
                  mealKey, mealId, productKey, productId: product.id
                })">&#x2715;</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <product-searcher
                :mealKey="mealKey"
                :mealId="mealId"
              />
            </td>
            <td>{{ meal.carbs }}</td>
            <td>{{ meal.prots }}</td>
            <td>{{ meal.fats }}</td>
            <td>{{ meal.kcals }}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </article>
</template>

<script>
import { mapActions } from 'vuex';
import ProductSearcher from '@/components/ProductSearcher';
import axios from 'axios';

export default {
  components: { ProductSearcher },
  props: ['meal', 'mealKey', 'mealId'],
  data() {
    return {
      editName: false,
      mealNejm: '',
      timeOut: null,
      timeOut2: null
    }
  },
  methods: {
    ...mapActions([
      'updateMeal',
      'deleteMeal',
      'deleteMealProduct'
    ]),
    updateProdakt(payload) {
      this.$store.commit('UPDATE_MEAL_PRODUCT', payload);
    }
    // updateMealProduct(payload) {
    //   this.$store.commit('UPDATE_MEAL_PRODUCT', payload);
    //   clearTimeout(this.timeOut);
    //   this.timeOut = setTimeout(() => {
    //     this.$store.dispatch('updateMealProduct', payload);
    //   }, 500);
    // },
  }
}
</script>

<style lang="scss" scoped>
article {
  margin-top: 50px;
  position: relative;
  &:before {
    content: "";
    height: 4px;
    width: 110px;
    background-color: rgba(46,204,113, .4);
    position: absolute;
    top: 23px;
    border-radius: 5px;
  }
  h3 {
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: normal;
  }
}

section {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 30px -10px #d8d8d8;
}

.meals-table {
  border-collapse: collapse;
  width: 100%;
  td, th {
    padding: 12px;
    &:first-child {
      text-align: left;
    }
  }
  tbody {
    tr {
      &:nth-child(even) {
        background-color: #f7f7f7;
      }
    }
  }
  tfoot, tbody {
    td {
      &:not(:first-child) {
        text-align: center;
      }
    }
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
</style>

