<template>
  <article>
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

  </article>
</template>

<script>
import FormElements from '@/components/FormElements';

export default {
  components: { FormElements },
  data() {
    return {
      user: {
        age: 28,
        weight: 67,
        height: 174,
        man: true
      },
      form: [
        { for: 'weight', label: 'Nowa waga' }
      ]
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


