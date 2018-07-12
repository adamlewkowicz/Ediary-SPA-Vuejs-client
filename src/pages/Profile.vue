<template>
  <div>
    <profile-data v-if="userHasMeasurements"/>
    <profile-data-creator v-else />
  </div>
</template>

<script>
import ProfileData from '../components/ProfileData';
import ProfileDataCreator from '@/components/ProfileDataCreator';
import { mapGetters } from 'vuex';

export default {
  components: {
    ProfileData,
    ProfileDataCreator
  },
  computed: mapGetters(['userHasMeasurements'])
}
</script>


