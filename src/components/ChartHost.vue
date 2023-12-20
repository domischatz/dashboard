<template>
  <div>
    <Line :data="chartData"></Line>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(Title, Tooltip, CategoryScale, LinearScale, Legend, LineElement, PointElement);

export default {
  name: 'Chart',
  components: { Line },

  data() {
    return {
      jsonData: [],
      jsonData2: [],
    };
  },
  computed: {
    chartData: function () {
      return {
        labels: this.jsonData.map(entry => entry.clock),
        datasets: [
          {
            label: "Ping",
            data: this.jsonData.map(entry => parseFloat(entry.value)),
            backgroundColor: "#2b4c99",
            fill: false,
            borderColor: "rgb(43, 76, 153)",
            tension: 0.1,
            pointRadius: 0.5,
            borderWidth: 2,
          },
          {
            label: "Connection",
            data: this.jsonData2.map(entry => parseFloat(entry.value)),
            backgroundColor: "rgb(255, 50, 50)", // Set the desired color for the second dataset
            fill: false,
            borderColor: "rgb(255, 50, 50)",
            tension: 0.1,
            pointRadius: 0.5,
            borderWidth: 2,
          },
        ],
      };
    }
  },
  mounted() {
    import("../data/History/10621_chart1.json").then(data => {
      this.jsonData = data.default;
    });

    import("../data/History/10621_chart2.json").then(data => {
      this.jsonData2 = data.default;
    });
  }
};
</script>
