<template>
  <article>
    <h3>Zupa pomidorowa</h3>
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
            v-for="(product, productKey) in products"
            :key="productKey"
          >
            <td>{{ product.name }}</td>
            <td>{{ product.portionWeight }}</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td>
              <button class="btn-del-product">&#x2715;</button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">
              <product-searcher />
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </section>
  </article>
</template>

<script>
import ProductSearcher from '@/components/ProductSearcher';

export default {
  components: { ProductSearcher },
  data() {
    return {
      products: [
        { name: 'Brokuły', portionWeight: 91 },
        { name: 'Ogórki', portionWeight: 13 },
        { name: 'Masło', portionWeight: 39 }
      ]
    }
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
    td {
      &:not(:first-child) {
        text-align: center;
      }
    }
    tr {
      &:nth-child(even) {
        background-color: #f7f7f7;
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
</style>

