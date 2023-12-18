<template>
  <html>
  <body>
  <div class="home">
    <div class="chart">
      <div class="map-container">
        <Map/>
      </div>
      <router-link to="/chart1" class="chart-container">
<!--        <Chart1 />-->
      </router-link>
      <router-link to="/chart1" class="chart-container">
<!--        <Chart1 />-->
      </router-link>
    </div>
    <ErrorList/>
  </div>
  </body>
  </html>
</template>

<script>
import Chart1 from '../components/Chart1.vue';
import ErrorList from "./ErrorList.vue";
import Map from '../components/Map.vue';

export default {
  components: {
    Chart1,
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
