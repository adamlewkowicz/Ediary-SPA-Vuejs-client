<template>
  <form @submit.prevent="addUserData">
    <p>Podaj swoje dane aby śledzić postępy, obliczyć BMI, oraz dzienne zapotrzebowanie kalorii.</p>
    <br>

    <p><label for="age">Wiek</label></p>
    <input type="text" id="age" v-model="userData.age"/>

    <p><label for="weight">Waga</label></p>
    <input type="text" id="weight" v-model="userData.weight"/>

    <p><label for="height">Wzrost</label></p>
    <input type="text" id="height" v-model="userData.height"/>

    <br><br>

    <input type="radio" id="man" value="true" v-model="userData.man"/>
    <label for="man">Mężczyzna</label>

    <input type="radio" id="woman" value="false" v-model="userData.man"/>
    <label for="woman">Kobieta</label>

    <br><br>

    <button type="submit">Zapisz</button>

    <p v-for="(error, errorKey) in errors" :key="errorKey" class="errors">
      {{ error }}
    </p>

  </form>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        age: 23,
        weight: 75,
        height: 181,
        man: null,
        weightGoal: 'maintain'
      },
      errors: []
    }
  },
  methods: {
    addUserData() {
      const { age, weight, height, man } = this.userData;
      this.errors = [];
      const pushError = msg => this.errors.push(msg);

      if (age < 6 || age > 120) pushError('Nieprawidłowy wiek');
      if (weight < 30 || weight > 200) pushError('Nieprawidłowa waga');
      if (height < 120 || height > 250) pushError('Nieprawidłowy wzrost');
      if (man == null) pushError('Wybierz płeć');

      if (!this.errors.length) {
        this.$store.dispatch('addGeneralMeas', this.userData);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input[type=text] {
  @extend %input;
  min-width: 200px;
}

.errors {
  color: #e74c3c;
}
</style>

