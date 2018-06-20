<template>
  <div>
    <input type="text" v-model="productName" @input="delayInput" class="searcher" placeholder="Nazwa produktu..."/>
    <div class="products-result" v-if="products.length">
      <ul>
        <li v-for="(product, productKey) in products" :key="productKey" @click="addProduct(productKey)">
          <p>{{ product.name }}</p>
          <div class="product-details">
            {{ product.source }}
            <b>{{ product.carbs }}</b> /
            <b>{{ product.prots }}</b> /
            <b>{{ product.fats }}</b> -
            <b>{{ product.kcals }} </b> kcal
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  props: ['mealKey', 'mealId', 'meal'],
  data() {
    return {
      productName: '',
      timeOut: null,
      products: []
    }
  },
  methods: {
    ...mapActions(['addMealProduct', 'updateMealProduct']),
    delayInput() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => this.getProducts(), 200);
    },
    async getProducts() {
      const { data: { products }} = await axios.get(`/products/ilewazy/${this.productName}`);
      this.products = products;
    },
    async addProduct (productKey) {
      const { mealKey, mealId } = this;
      const payload = { mealKey, mealId };
      const productFound = this.products[productKey];
      if (!productFound.fetched) {
        payload.product = await this.postProduct(productFound.url);
      } else {
        payload.product = productFound;
      }
      payload.product.showDetails = false;
      this.checkDuplicates({
        ...payload,
        productId: payload.product.id
      });
      this.products = [];
      this.productName = '';
    },
    async postProduct (url) {
      const { data: { product }} = await axios.post(`/products/ilewazy`, { url });
      return { ...product, showDetails: false };
    },
    checkDuplicates (payload) {
      const productIndex = this.meal.products.findIndex(product => product.id == payload.productId);

      if (productIndex > -1) {
        const productFound = this.meal.products[productIndex];
        const sumPortion = productFound.portionWeight + payload.product.portionWeight;
        this.updateMealProduct({
          ...payload,
          productKey: productIndex,
          product: {
            portionWeight: sumPortion
          }
        });
      } else {
        this.addMealProduct(payload);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.searcher {
  // border-bottom: 1px solid #8c8c8c;
  width: 100%;
  height: 35px;
  background: url("./../assets/img/icons/glass-finder.svg") no-repeat;
  background-size: 18px;
  background-position-y: center;
  padding: 5px 35px;
  font-family: $ff;
  font-size: 14px;
  outline: 0;
  &::placeholder {
    color: #b6b6b6;
  }
}

.products-result {
  position: absolute;
  z-index: 1;
  height: 300px;
  min-width: 400px;
  overflow-y: auto;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    padding: 10px;
    background-color: #fff;
    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }
  }
}

p {
  margin: 0;
  margin-bottom: 4px;
}

.product-details {
  font-weight: 300;
  font-size: 12px;
  b {
		font-weight: normal;
		&:first-child {
			color: #2e86de;
      margin-left: 10px;
		}
		&:nth-child(2) {
			color: #8eaf34;
		}
		&:nth-child(3) {
			color: #f39c12;
		}
	}
}
</style>



