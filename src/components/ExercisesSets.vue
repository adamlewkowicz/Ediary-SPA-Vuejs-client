<template>
  <tr>
    <td>{{ setKey + 1 }}</td>
    <td>
      <input
        type="number"
        :value="set.repeats"
        @input="updateExerciseSet({
          exerciseKey, exerciseId, setKey, setId,
          set: { repeats: $event.target.value }
        })"
      />
    </td>
    <td>
      <input
        type="number"
        :value="set.loadweight"
        @input="updateExerciseSet({
          exerciseKey, exerciseId, setKey, setId,
          set: { loadweight: $event.target.value }
        })"
      />
    </td>
    <td>
      <button
        @click="deleteExerciseSet({
          exerciseKey, exerciseId, setKey, setId
        })"
      >&#x2715;</button>
    </td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: [
    'exerciseKey',
    'exerciseId',
    'setKey',
    'setId',
    'set'
  ],
  methods: {
    ...mapActions([
      'deleteExerciseSet',
      'updateExerciseSet'
    ])
  }
}
</script>


<style lang="scss" scoped>

</style>
