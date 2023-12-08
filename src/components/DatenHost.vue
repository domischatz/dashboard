<!--<template>
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
</script>-->
<template>
  <div>
    <Line :data="chartData"></Line>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend} from 'chart.js';

ChartJS.register(Title,Tooltip, CategoryScale, LinearScale, Legend, LineElement ,LineElement,PointElement);

export default {
  name: 'Chart',
  components: { Line },
  mounted() {
    import("../data/History/10621.json").then(data => {
      const jsonData = data.default;
      this.chartData.labels = jsonData.map(entry => entry.clock);
      this.chartData.datasets= jsonData.map(entry => parseFloat(entry.value));
      console.log(this.chartData.labels);
      console.log(this.chartData.datasets)
    });
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Values',
            data: [],
          },
        ],
      },
    };
  },
};
</script>



