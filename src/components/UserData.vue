<template>
  <div>
    <h2>User Data</h2>
    <div>
      <p><strong>HostID:</strong> {{ userData.HostID }}</p>
      <p><strong>Hostname:</strong> {{ userData.Hostname }}</p>
      <p><strong>Description:</strong> {{ userData.Description }}</p>
      <p><strong>Priority:</strong> {{ userData.Priority }}</p>
      <p><strong>Unack:</strong> {{ userData.Unack }}</p>
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
