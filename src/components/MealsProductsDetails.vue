<template>
  <tr>
    <td colspan="7">
      <img :src="`http://localhost:3000/${product.img}`"/>
      <table>
        <tr>
          <td>Nazwa:</td>
          <td>{{ product.name || cutNameLength }}</td>
        </tr>
        <tr>
          <td>Źródło:</td>
          <td>{{ product.source }}</td>
        </tr>
        <tr v-if="product.producer">
          <td>Producent:</td>
          <td>{{ product.producer }}</td>
        </tr>
        <tr>

        </tr>
      </table>
      <button
        @click="triggerDetails(false)"
        class=""
      >D</button>
    </td>
  </tr>
</template>
