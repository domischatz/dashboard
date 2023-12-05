<template>
  <div>
    <h2>User Data</h2>
    <div>
      <p><strong>HostID:</strong> {{ userData.hostid }}</p>
      <p><strong>Hostname:</strong> {{ userData.hostname }}</p>
      <p><strong>Description:</strong> {{ userData.description }}</p>
      <p><strong>Priority:</strong> {{ userData.priority }}</p>
      <p><strong>Unack:</strong> {{ userData.unack }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
/* Deine Stile hier */
</style>
