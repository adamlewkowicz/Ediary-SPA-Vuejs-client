<template>
  <article class="meal-wrapper">

    <meal-name-editor
      :mealKey="mealKey"
      :mealId="mealId"
      :meal="meal"
    />

    <section class="box">
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
          <meals-products
            v-for="(product, productKey) in meal.products"
            :key="productKey"
            :product="product"
            :mealKey="mealKey"
            :mealId="mealId"
            :productKey="productKey"
            :productId="product.id"
          />
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <product-searcher
                :mealKey="mealKey"
                :mealId="mealId"
                :meal="meal"
              />
            </td>
            <td>{{ macro.carbs }}</td>
            <td>{{ macro.prots }}</td>
            <td>{{ macro.fats }}</td>
            <td>{{ macro.kcals }}</td>
            <td>
              <button
                @click="deleteMeal({ mealKey, mealId })"
                class="del-btn"
              ></button>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  </article>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';
import MealNameEditor from '@/components/MealNameEditor';
import MealsProducts from '@/components/MealsProducts';
import ProductSearcher from '@/components/ProductSearcher';

export default {
  components: {
    MealNameEditor,
    MealsProducts,
    ProductSearcher
  },
  props: ['meal', 'mealKey', 'mealId'],
  data() {
    return {
      editName: false,
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
    updateMealProduct(payload) {
      this.$store.commit('UPDATE_MEAL_PRODUCT', payload);
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$store.dispatch('updateMealProduct', payload);
      }, 0);
    }
  },
  watch: {
    'meal.kcals' (val) {
      const { carbs, prots, fats, kcals } = this.meal;
      clearTimeout(this.timeOut2);
      this.timeOut2 = setTimeout(() => axios.patch(`/meals/${this.mealId}`, { carbs, prots, fats, kcals }), 2000);
    }
  },
  computed: {
    macro () {
      const { carbs, prots, fats, kcals } = this.meal;
      if (kcals == 0) return {};
      else return { carbs, prots, fats, kcals };
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  margin-top: 25px;
}

.box {
  overflow-x: auto;
  margin-bottom: 35px;
  @include phone {
    padding: 5px;
    th, tfoot > tr > td  {
      &:not(:first-child):not(:nth-child(2)):not(:last-child) {
        padding: 12px 2px;
      }
    }
  }
}

.meals-table {
  @include small {
    font-size: 10px;
  }
  border-collapse: collapse;
  width: 100%;
  td, th {
    padding: 12px;
    &:first-child {
      text-align: left;
    }
  }
  th {
    &:nth-child(2) {
      padding: 12px 18px 12px 5px;
    }
  }
  tbody {
    tr {
      input[type=number] {
        &:nth-child(odd) {
          background-color: red;
        }
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
</style>

