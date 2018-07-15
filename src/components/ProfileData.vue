<template>
    <article>

    <user-data v-if="ok" />

    <div v-else>

      <p>Twoje dane:</p>
      <table class="box">
        <tbody>
          <tr><td>Wiek:</td> <td>{{ meas.age }}</td></tr>
          <tr><td>Wzrost:</td> <td>{{ meas.height }}</td></tr>
          <tr><td>Płeć:</td> <td>{{ meas.man ? 'Mężczyzna' : 'Kobieta' }}</td></tr>
          <tr><td>Waga:</td> <td>{{ meas.weight }}</td></tr>
          <tr>
            <td>Kalorie:</td>
            <td>{{ macroNeeds[meas.weightGoal].kcals }}</td>
          </tr>
          <tr>
            <td>Chcę</td>
            <td>
              <select @change="changeWeightGoal">
                <option
                  v-for="goal in weightGoalOps"
                  :value="goal.value"
                  :key="goal.value"
                >
                  {{ goal.text }}
                </option>
              </select>
            </td>
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

      <div v-if="weights.length">
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
import { mapState, mapActions, mapGetters } from 'vuex';
import FormElements from '@/components/FormElements';

export default {
  components: { FormElements },
  data() {
    return {
      ok: null,
      weightGoal: 'maintain',
      weightGoalOps: [
        { value: 'loss', text: 'Zmniejszyć wagę' },
        { value: 'maintain', text: 'Utrzymać wagę' },
        { value: 'increase', text: 'Zwiększyć wagę' },
      ]
    }
  },
  methods: {
    ...mapActions(['addMeas']),
    changeWeightGoal(event) {
      this.$store.dispatch('updateGeneralMeas', { weightGoal: event.target.value });
    }
  },
  computed: {
    ...mapState({
      meas: state => state.measurements
    }),
    ...mapGetters(['macroNeeds']),
    todaysDate() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
    weights() {
      if (!this.meas.all) return [];
      return this.meas.all
        .filter(meas => meas.name == 'waga')
        .map(meas => ({
          ...meas,
          date: moment(meas.date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        })
      );
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
