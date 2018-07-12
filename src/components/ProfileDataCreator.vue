<template>
  <form @submit.prevent="addUserData">
    <p>Podaj swoje dane aby śledzić postępy, obliczyć BMI, oraz dzienne zapotrzebowanie kalorii.</p>
    <br>

    <p><label for="age">Wiek</label></p>
    <input type="text" id="age" v-model="newUserData.age"/>

    <p><label for="weight">Waga</label></p>
    <input type="text" id="weight" v-model="newUserData.weight"/>

    <p><label for="height">Wzrost</label></p>
    <input type="text" id="height" v-model="newUserData.height"/>

    <br><br>

    <input type="radio" id="man" value="true" v-model="newUserData.man"/>
    <label for="man">Mężczyzna</label>

    <input type="radio" id="woman" value="false" v-model="newUserData.man"/>
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
      newUserData: {
        age: 31,
        weight: 47,
        height: 120,
        man: true,
        weightGoal: 'maintain'
      },
      errors: []
    }
  },
  methods: {
    addUserData() {
      const uData = this.newUserData;
      this.errors = [];
      const pushError = msg => this.errors.push(msg);

      if (uData.age < 6 || uData.age > 120) pushError('Nieprawidłowy wiek');
      if (uData.weight < 30 || uData.weight > 200) pushError('Nieprawidłowa waga');
      if (uData.height < 120 || uData.height > 250) pushError('Nieprawidłowy wzrost');
      if (uData.man == null) pushError('Wybierz płeć');

      if (!this.errors.length) {
        this.$store.dispatch('addGeneralMeas', this.newUserData);
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

