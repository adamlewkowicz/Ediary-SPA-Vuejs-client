<template>
  <article>

    <user-data v-if="ok" />

    <div v-else>

      <p>Twoje dane:</p>
      <table>
        <tbody>
          <tr><td>Wiek:</td> <td>{{ user.age }}</td></tr>
          <tr><td>Waga:</td> <td>{{ user.weight }}</td></tr>
          <tr><td>Wzrost:</td> <td>{{ user.height }}</td></tr>
          <tr><td>Płeć:</td> <td>{{ user.man ? 'Mężczyzna' : 'Kobieta' }}</td></tr>
        </tbody>
      </table>

      <form>
        <p><label for="weight">Nowa waga:</label></p>
        <input type="text" id="weight"/>
        <button type="submit">Dodaj pomiar</button>
      </form>

    </div>

  </article>
</template>

<script>
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

input[type=text] {
  @extend %input;
  min-width: 200px;
}
</style>


