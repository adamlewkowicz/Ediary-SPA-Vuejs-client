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
          </tr>
        </tbody>
      </table>
    </section>
  </article>
</template>

<script>
export default {
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
  box-shadow: 0px 0px 20px -3px #d8d8d8;
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
        background-color: #f3f3f3;
      }
    }
  }
}
</style>

