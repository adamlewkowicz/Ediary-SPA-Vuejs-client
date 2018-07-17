<template>
  <div>
    <input type="text" v-model="productName" @input="delayInput" class="searcher" placeholder="Nazwa produktu..."/>

      <div class="products-result" v-if="products.length">
        <transition-group appear tag="ul" name="slide-left">
          <li v-for="(product, productKey) in productsWithPhrases" :key="productKey" @click="addProduct(product)">
            <p v-html="product.thickPhrase"></p>
            <div class="product-details">
              {{ product.source }}
              <b>{{ product.carbs }}</b> /
              <b>{{ product.prots }}</b> /
              <b>{{ product.fats }}</b> -
              <b>{{ product.kcals }} </b> kcal
            </div>
          </li>
        </transition-group>
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
      if (this.productName.length > 0) {
        const getProducts = await axios.get(`/products/${this.productName}`);
        this.products = getProducts.data.products;
      } else {
        this.products = [];
      }
    },
    async addProduct (product) {
      const { mealKey, mealId } = this;
      const payload = { mealKey, mealId };
      if (!product.saved) {
        payload.product = await this.postProduct(product);
      } else {
        payload.product = product;
      }
      payload.product.showDetails = false;
      this.checkDuplicates({
        ...payload,
        productId: payload.product.id
      });
      this.products = [];
      this.productName = '';
    },
    async postProduct (product) {
      const postProduct = await axios.post(`/products`, product);
      return { id: postProduct.data.id, ...product };
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
  },
  computed: {
    productsWithPhrases() {

      const thickerPhrase = (productName) => {
        const phrase = this.productName;
        const loweredProductName = productName.toLowerCase();
        const firstCharIndex = loweredProductName.indexOf(phrase);
        if (firstCharIndex < 0) return productName;

        const cut = (start, end) => productName.substring(start, end);

        const phraseEndPos = firstCharIndex + phrase.length;

        let nameWithPhrase =
          cut(0, firstCharIndex) +
          '<b>' + cut(firstCharIndex, phraseEndPos) + '</b>' +
          cut(phraseEndPos, productName.length);

        return nameWithPhrase;
      }

      return this.products.map(product => ({
        ...product,
        thickPhrase: thickerPhrase(product.name)
      }));
    }
  }
}
</script>

<style lang="scss" scoped>
.searcher {
  width: 100%;
  height: 35px;
  background: url("./../assets/img/icons/glass-finder.svg") no-repeat;
  background-size: 18px;
  background-position-y: center;
  padding: 5px 35px;
  font-family: $ff;
  font-size: 14px;
  outline: 0;
  box-sizing: border-box;
  &::placeholder {
    color: #a1a1a1;
    font-weight: 300;
  }
}

.products-result {
  position: absolute;
  z-index: 1;
  height: 300px;
  // min-width: 400px;
  max-width: 400px;
  width: 400px;
  overflow-y: auto;
  @include phone {
    min-width: 260px;
    width: 100%;
  }
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



