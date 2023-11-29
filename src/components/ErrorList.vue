<script setup>
import { ref, onMounted } from "vue";
import { VueTable } from "@harv46/vue-table";
import "@harv46/vue-table/dist/style.css";

const headers = ["HostID", "Hostname", "Description", "Priority", "Unack"];
const keys = ["HostID", "Hostname", "Description", "Priority", "Unack"];

const data = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("src/components/fehlerliste.json");
    const jsonData = await response.json();
    data.value = jsonData;
  } catch (error) {
    console.error("Fehler beim Laden der Daten:", error);
  }
});
</script>

<template>
  <div>
    <VueTable :headers="headers" :data="data" :keys="keys"/>
  </div>
</template>

