<template>
  <div>
    <button class="new-meal-btn" @click="creatorActive = true">+</button>
    <div v-if="creatorActive" class="creator-wrapper">
      <div class="theater-curtain"></div>
      <div class="creator">
        <button class="cancel-btn" @click="creatorActive = false">&#x2715;</button>
        <h3>Dodaj nowy posiłek</h3>
        <label for="name">Nazwa:</label>
        <input type="text" v-model="meal.name" id="name">
        <label for="date">Data:</label>
        <input type="text" v-model="meal.date" id="date">
        <label>Makroskładniki:</label>
        <div class="macro-elements">
          <div>
            <label for="carbs">Węgle:</label>
            <input type="text" v-model="meal.carbs" id="carbs"/>
          </div>
          <div>
            <label for="prots">Białko:</label>
            <input type="text" v-model="meal.prots" id="prots"/>
          </div>
          <div>
            <label for="fats">Tłuszcze:</label>
            <input type="text" v-model="meal.fats" id="fats"/>
          </div>
          <div>
            <label for="kcals">Kalorie:</label>
            <input type="text" v-model="meal.kcals" id="kcals"/>
          </div>
        </div>
        <p v-for="(err, errKey) in errors" :key="errKey" class="errors">
          {{ err }}
        </p>
        <button class="add-meal-btn" @click="addMeal">Dodaj posiłek</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      creatorActive: false,
      meal: {
        name: 'Posiłek',
        date: '',
        carbs: 0,
        prots: 0,
        fats: 0,
        kcals: 0,
        products: []
      },
      errors: []
    }
  },
  created() {
    this.meal.date = moment().format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
    addMeal() {
      const { name, date } = this.meal;
      this.errors = [];
      if (Object.values(this.meal).some(val => (val.length == 0) && (!val instanceof Array))) {
        this.errors.push('Proszę wypełnić wszystkie pola');
      } else {
        this.$store.dispatch('addMeal', this.meal);
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.theater-curtain {
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  top: 0;
  left: 0;
  width: 100vw;
  position: absolute;
  z-index: 2;
  user-select: none;
  box-sizing: border-box;
}

.creator {
  z-index: 3;
  background-color: #fff;
  width: 400px;
  position: fixed;
  margin: 0 auto;
  left: calc(50% - 150px);
  padding: 40px;
  box-sizing: border-box;
  label {
    font-weight: 300;
  }
  h3 {
    text-align: center;
    margin-bottom: 30px;
  }
  input[type=text] {
    @extend %input;
    width: 100%;
    box-sizing: border-box;
    display: block;
    margin-bottom: 20px;
  }
}

.errors {
  color: #eb4d4b;
  text-align: center;
}

.cancel-btn {
  @extend %clearBtn;
  background-color: #fff;
  padding: 8px;
  width: 33px;
  position: absolute;
  right: 20px;
  top: 20px;
  &:hover {
    background-color: #eb4d4b;
    color: #fff;
  }
}

.macro-elements {
  display: flex;
  label {
    text-align: center;
  }
  div {
    padding: 10px;
    color: #5e5e5e;
    input[type=text] {
      margin-bottom: 15px;
      text-align: center;
    }
  }
}

.add-meal-btn {
  @extend %clearBtn;
  background-color: #30336b;
  width: 100%;
  border-radius: 30px;
  padding: 15px;
  color: #fff;
  margin-top: 10px;
}
</style>

