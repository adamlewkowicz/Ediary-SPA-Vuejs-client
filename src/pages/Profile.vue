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
          <tr><td>Waga:</td> <td>{{ weight }}</td></tr>
          <tr>
            <td>Kalorie:</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <form
        @submit.prevent="addMeas({
          nameId: 1,
          name: 'waga',
          value: $event.target.elements.weightVal.value,
          date: todaysDate
        })"
      >
        <p><label for="weight">Nowa waga:</label></p>
        <input type="text" id="weight" name="weightVal"/>
        <button type="submit">Dodaj pomiar</button>
      </form>

      <div>
        <table class="meas-tab">
          <thead>
            <tr>
              <th>Wartość:</th>
              <th>Data:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(weightMeas, weightMeasKey) in weights" :key="weightMeasKey">
              <td>{{ weightMeas.value }}</td>
              <td>{{ weightMeas.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </article>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import FormElements from '@/components/FormElements';
import UserData from '@/components/UserData';

export default {
  components: { FormElements, UserData },
  data() {
    return {
      ok: null
    }
  },
  methods: {
    ...mapActions(['addMeas'])
  },
  computed: {
    ...mapState({
      meas: state => state.measurements.general
    }),
    todaysDate() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    weight() {
      return this.$store.state.measurements.weight;
    },
    weights() {
      return this.meas.all.waga.map(meas => ({
        ...meas,
        date: moment(meas.date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
      }));
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  padding: 10px 25px 10px 0;
}

form {
  margin-top: 50px;
}

.meas-tab {
  width: 100%;
  margin-top: 50px;
  text-align: left;
}

input[type=text] {
  @extend %input;
  min-width: 200px;
}
</style>


