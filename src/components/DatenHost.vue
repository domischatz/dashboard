<template>
  <div>
    <h2>User Data</h2>
    <div>
      <p v-for="(value, key) in datenHost" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </p>
    </div>
  </div>
  <ChartHost/>
</template>

<script>
import ChartHost from './ChartHost.vue';
export default {
  components: {
    ChartHost
  },
  props: {
    datenHost: {
      type: Object,
      required: true
    }
  }
};
</script>