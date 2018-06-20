<template>
  <article>

    <user-data v-if="ok" />

    <div v-else>

      <p>Twoje dane:</p>
      <table>
        <tbody>
          <tr><td>Wiek:</td> <td>{{ meas.age }}</td></tr>
          <!-- <tr><td>Waga:</td> <td>{{ Number(meas.all.waga[0].value) }} kg</td></tr>w -->
          <tr><td>Wzrost:</td> <td>{{ meas.height }}</td></tr>
          <tr><td>Płeć:</td> <td>{{ meas.man ? 'Mężczyzna' : 'Kobieta' }}</td></tr>
        </tbody>
      </table>

      <form>
        <p><label for="weight">Nowa waga:</label></p>
        <input type="text" id="weight"/>
        <button type="submit">Dodaj pomiar</button>
      </form>

      <div>
        <table v-for="(measData, measProp) in meas.all" :key="measProp">
          <thead>
            <tr>
              <th>{{ measProp }}</th>
              <th>Wartość:</th>
              <th>Data:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(singleMeas, singleMeasKey) in measData" :key="singleMeasKey">
              <td>{{ singleMeas.name }}</td>
              <td>{{ singleMeas.value }}</td>
              <td>{{ singleMeas.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </article>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import FormElements from '@/components/FormElements';
import UserData from '@/components/UserData';

export default {
  components: { FormElements, UserData },
  data() {
    return {
      ok: null,
      user: {
        age: 28,
        weight: 67,
        height: 174,
        man: true
      }
    }
  },
  computed: mapState({
    meas: state => state.measurements.general
  })
}
</script>

<style lang="scss" scoped>
td {
  padding: 10px 25px 10px 0;
}

form {
  margin-top: 50px;
}

input[type=text] {
  @extend %input;
  min-width: 200px;
}
</style>


