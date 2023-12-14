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
                backgroundColor: '#f87979',
                data: this.jsonData.map(entry => parseFloat(entry.value)),
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