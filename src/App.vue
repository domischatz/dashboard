<template>
  <div class="app">
    <!-- Sidebar -->
    <Navbar v-if="$route.name !== 'Login'" />
    <!-- Content -->
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style>
:root {
  --primary: #464746;
  --secondary: #82d9e1;
  --light: #4ade80;
  --sidebar-width: 300px;
}
</style>
