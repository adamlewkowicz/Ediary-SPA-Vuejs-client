<template>
  <article class="meal-wrapper">

    <meal-name-editor
      :mealKey="mealKey"
      :mealId="mealId"
      :meal="meal"
    />

    <section class="box">
      <table class="meal-table">
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
        <transition-group name="list-complete" tag="tbody">
          <meals-products
            class="list-complete-item"
            v-for="(product, productKey) in meal.products"
            :key="product.id"
            :product="product"
            :mealKey="mealKey"
            :mealId="mealId"
            :productKey="productKey"
            :productId="product.id"
          />
        </transition-group>
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

<style lang="scss">
.meal-wrapper {
  margin-top: 25px;
}

.box {
  margin-bottom: 35px;
  @include small {
    padding: 15px !important;
  }
}

.meal-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  th {
    padding: 0 12px 16px 12px;
    &:first-child {
      padding-left: 0;
      width: 40%;
    }
    &:nth-child(2) { padding-right: 0 12px 12px 0; }
  }
  th, td {
    text-align: center;
    &:first-child { text-align: left; }
  }
}

$theadColNames: 'Produkt:', 'Ilość (g)', 'Węgle', 'Białko', 'Tłuszcz', 'Kalorie', 'Usuń';
$tfootColNames: '', 'Węgle', 'Białko', 'Tłuszcz', 'Kalorie';

@include phone {
  .meal-table {
    thead { display: none; }
    td {
      display: block;
      text-align: left;
      position: relative;
      padding: 5px 0 5px 30%;
      &:before {
        position: absolute;
        font-weight: 500;
        width: 30%;
        top: 5px;
        left: 0px;
      }
    }
    tbody {
      tr {
        border-bottom: 2px solid $purple;
        &:last-child td:last-child { padding-bottom: 40px; }
        &:not(:first-child) td:first-child {
          padding-top: 20px;
          &:before { top: 20px; }
        }
      }
      td {
        &:nth-child(2):before { top: 14px; }
        &:last-child:before { top: 12px; }
        &:nth-child(2), &:last-child { padding: 0 0 0 30% }
        @for $index from 1 through 7 {
          &:nth-child(#{$index}):before { content: nth($theadColNames, $index); }
        }
      }
    }
    tfoot tr {
      box-shadow: $baseShadow;
      border-radius: 12px;
    }
    tfoot td {
      margin: 0 20px;
      &:not(:first-child):not(:last-child) {
        display: inline-block;
      }
      &:first-child {
        margin-top: 20px;
        padding: 45px 0;
        position: relative;
        &:before {
          font-weight: bold;
          width: 100%;
          position: absolute;
          content: "Znajdź produkt";
        }
        &:after {
          left: 50%;
          transform: translateX(-50%);
          position: absolute;
          bottom: 14px;
          font-weight: bold;
          content: "Makro posiłku";
        }
      }
      &:last-child {
        margin-bottom: 20px;
        padding: 0;
        position: relative;
        padding-top: 45px;
        &:before {
          top: 15px;
          width: auto;
          left: 50%;
          transform: translateX(-50%);
          content: "Usuń Posilek";
          font-weight: bold;
        }
      }
      @for $index from 2 through 5 {
        &:nth-child(#{$index}):before { content: nth($tfootColNames, $index); }
      }
    }
  }
}
</style>

