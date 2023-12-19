<template>
  <html>
  <body>
  <div class="home">
    <div class="chart">
      <div class="map-container">
        <Map/>
      </div>
    </div>
    <ErrorList/>
  </div>
  </body>
  </html>
</template>

<script>
import ErrorList from "./ErrorList.vue";
import Map from '../components/Map.vue';

export default {
  components: {
    ErrorList,
    Map,
  },
}
</script>

<style>
body {
  margin: 0;
}

.chart {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  width: 100%;
//border: 1px solid black; /* Schwarze Umrandung */
  padding: 2px; /* Innenabstand für das Diagramm */
  display: flex;
}

.map-container {
  width: 100%;
}
</style>
