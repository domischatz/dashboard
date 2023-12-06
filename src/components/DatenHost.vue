<template>
  <div>
    <h2>User Data</h2>
    <div>
      <p v-for="(value, key) in datenHost" :key="key">
        <strong>{{ key }}:</strong> {{ value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    datenHost: {
      type: Object,
      required: true
    }
  }
};
</script>
