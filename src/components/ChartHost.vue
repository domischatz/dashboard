<template>
  <div>
    <Line :data="chartData"></Line>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs' ;
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

  data() {
    return {
      jsonData : [],
    };
  },
  computed:
      {
        chartData : function ()
        {
          return  {
            labels:   this.jsonData.map(entry => entry.clock),
            datasets: [
              {
                label: "Values",
                data: this.jsonData.map(entry => parseFloat(entry.value)),
                backgroundColor: "#2b4c99",
                fill: false,
                borderColor: "rgb(43, 76, 153)",
                tension: 0.1,
                pointRadius: 0.5,
                borderWidth: 2,
              },
            ],
          }
        }
      },
  mounted() {
    import("../data/History/10621.json").then(data => {
      this.jsonData = data.default;

    });
  }
};
</script>