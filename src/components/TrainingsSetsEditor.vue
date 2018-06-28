<template>
  <tr>
    <td>{{ setKey + 1 }}</td>
    <td>
      <input
        type="number"
        :value="set.repeats"
        @input="updateExerciseSet({ repeats: parseInt($event.target.value) })"
      />
    </td>
    <td>
      <input
        type="number"
        :value="set.loadweight"
        @input="updateExerciseSet({ loadweight: parseFloat($event.target.value) })"
      />
    </td>
    <td>
      <input type="number"
        :value="set.break"
        @input="updateExerciseSet({ break: parseInt($event.target.value) })"
      />
    </td>
    <td>
      <button class="del-btn"
        @click="deleteExerciseSet"
      ></button>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'exerciseKey',
    'exerciseId',
    'setKey',
    'setId',
    'set'
  ],
  methods: {
    updateExerciseSet(set) {
      this.$store.dispatch('updateExerciseSet', {
        ...this.meta,
        set
      });
    },
    deleteExerciseSet() {
      this.$store.dispatch('deleteExerciseSet', this.meta);
    }
  },
  computed: {
    meta() {
      const { exerciseKey, exerciseId, setKey, setId } = this;
      return { exerciseKey, exerciseId, setKey, setId };
    }
  }
}
</script>


<style lang="scss" scoped>
td {
  text-align: center;
  input[type=number] {
    text-align: center;
    height: 40px;
    color: #056bb5;
  }
}
</style>
