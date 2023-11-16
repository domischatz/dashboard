<template>
  <html>
    <body>
    <div class="home">
      <div class="chart">
        <router-link to="/Map" class="chart-container">
          <Map/>
        </router-link>
        <router-link to="/chart1" class="chart-container">
          <Chart1 />
        </router-link>
        <router-link to="/chart1" class="chart-container">
          <Chart1 />
        </router-link>
      </div>
    </div>
    </body>
  </html>
</template>

<script>
import Chart1 from '../components/Chart1.vue';
import Map from '../components/Map.vue';

export default {
  components: { // Registriert die Chart1-Komponente für die Verwendung in dieser Komponente.
    Chart1,
    Map,
  },
}
</script>

<style>

body{
  margin: 0;
}

.chart {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  width: 100%; /* Jedes Diagramm nimmt 50% des Bildschirms ein */
  border: 1px solid black; /* Schwarze Umrandung */
  padding: 10px; /* Innenabstand für das Diagramm */
  display: flex;
  justify-content: center; /* Zentrieren Sie das Diagramm horizontal */
  align-items: center; /* Zentrieren Sie das Diagramm vertikal */
  height: 50vh; /* Reduzieren Sie die Höhe auf die Hälfte des Bildschirms */
}
</style>
