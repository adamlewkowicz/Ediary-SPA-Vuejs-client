<template>
  <article class="meal-wrapper">
    <h3 class="meal-name" :class="{ 'animated-bar': editName }">
      <form v-if="editName"
        @submit.prevent="updateMeal({
          meal: { name: $event.target.elements.newMealName.value },
          mealKey,
          mealId
        }); editName = !editName"
      >
        <input type="text" :value="meal.name" name="newMealName" class="edit-meal-name">
        <button type="submit">Zapisz</button>
        <button type="button" @click="editName = !editName">Anuluj</button>
      </form>
      <div v-else>
        {{ meal.name }}
        <button
          @click="editName=!editName"
          class="edit-name-btn"
        ></button>
      </div>
    </h3>

    <div>
      <!-- <p>ID: {{ mealId }}</p> -->
    </div>

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
import MealsProducts from '@/components/MealsProducts';
import ProductSearcher from '@/components/ProductSearcher';

export default {
  components: {
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
  margin-top: 50px;
  position: relative;
  h3 {
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: normal;
  }
}

.meal-name {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 300;
  // margin: 0px 0px 30px 0;
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

.meals-table {
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
      // &:nth-child(even) {
      //   background-color: #f9f9f9;
      // }
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

