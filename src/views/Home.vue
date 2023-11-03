<template>
  <div class="home">
    <h1>Startseite</h1>

    <!-- Zeige die AboutUs-Komponente immer an -->
    <div class="chart">
      <div class="chart-container">
        <About />
      </div>
      <div class="chart-container">
        <About />
      </div>
    </div>

    <!-- Hier können Sie Ihre Charts und andere Inhalte hinzufügen sadafd-->
  </div>
</template>

<script>
import About from '../views/About.vue';

export default {
  components: {
    About,
  },
}
</script>

<style scoped>
.chart {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  width: 50%; /* Jedes Diagramm nimmt 50% des Bildschirms ein */
  border: 1px solid black; /* Schwarze Umrandung */
  padding: 10px; /* Innenabstand für das Diagramm */
  display: flex;
  justify-content: center; /* Zentrieren Sie das Diagramm horizontal */
  align-items: center; /* Zentrieren Sie das Diagramm vertikal */
  height: 50vh; /* Reduzieren Sie die Höhe auf die Hälfte des Bildschirms */
}
</style>
