<script>
import data from '/src/assets/server-metrics.json'
export default {
  data() {
    let userDps=[], systemDps=[], waitDps=[], buffersDps=[], cacheDps=[], usedDps=[], inboundDps=[], outboundDps=[], writeDps=[], readDps=[],
        toolTip = {
          shared: true
        },
        legend = {
          cursor: "pointer",
          itemclick: function (e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
            } else {
              e.dataSeries.visible = true;
            }
            e.chart.render();
          }
        };
    return {
      userDps: userDps, systemDps: systemDps, waitDps: waitDps, buffersDps:buffersDps,  cacheDps:cacheDps, usedDps:usedDps, inboundDps:inboundDps, outboundDps:outboundDps, writeDps:writeDps, readDps:readDps,
      charts: [],
      jsonData: data,
      cpuChartOptions: {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title:{
          text: "CPU Utilization"
        },
        toolTip: toolTip,
        axisY: {
          valueFormatString: "#0.#%",
        },
        legend: legend,
        data: [{
          type: "splineArea",
          showInLegend: "true",
          name: "User",
          yValueFormatString: "#0.#%",
          color: "#80DEEA",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          legendMarkerType: "square",
          dataPoints: userDps
        },{
          type: "splineArea",
          showInLegend: "true",
          name: "System",
          yValueFormatString: "#0.#%",
          color: "#26C6DA",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          legendMarkerType: "square",
          dataPoints: systemDps
        },{
          type: "splineArea",
          showInLegend: "true",
          name: "Wait",
          yValueFormatString: "#0.#%",
          color: "#00ACC1",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          legendMarkerType: "square",
          dataPoints: waitDps
        }]
      },
      memoryChartOptions: {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Memory Usage"
        },
        axisY: {
          suffix: " GB"
        },
        toolTip: toolTip,
        legend: legend,
        data: [{
          type: "splineArea",
          showInLegend: "true",
          name: "Cache",
          color: "#EF9A9A",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## GB",
          legendMarkerType: "square",
          dataPoints: cacheDps
        },{
          type: "splineArea",
          showInLegend: "true",
          name: "Buffers",
          color: "#EF5350",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## GB",
          legendMarkerType: "square",
          dataPoints: buffersDps
        },{
          type: "splineArea",
          showInLegend: "true",
          name: "Used",
          color: "#E53935",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## GB",
          legendMarkerType: "square",
          dataPoints: usedDps
        }]
      },
      networkChartOptions: {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Network Traffic"
        },
        axisY: {
          suffix: " Kb/s"
        },
        toolTip: toolTip,
        legend: legend,
        data: [{
          type: "splineArea",
          showInLegend: "true",
          name: "Outbound",
          color: "#C5E1A5",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## Kb/s",
          legendMarkerType: "square",
          dataPoints: outboundDps
        },{
          type: "splineArea",
          showInLegend: "true",
          name: "Inbound",
          color: "#43A047",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## Kb/s",
          legendMarkerType: "square",
          dataPoints: inboundDps
        }]
      },
      diskChartOptions: {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Disk I/O (IOPS)"
        },
        axisY: {},
        toolTip: toolTip,
        legend: legend,
        data: [{
          type: "splineArea",
          showInLegend: "true",
          name: "Write",
          color: "#FFAB91",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## ops/second",
          legendMarkerType: "square",
          dataPoints: writeDps
        },{
          type: "splineArea",
          showInLegend: "true",
          name: "Read",
          color: "#F4511E",
          xValueType: "dateTime",
          xValueFormatString: "DD MMM YY HH:mm",
          yValueFormatString: "#.## ops/second",
          legendMarkerType: "square",
          dataPoints: readDps
        }]
      },
      styleOptions: {
        width: "100%",
        height: "400px",
        float: "left"
      }
    }
  },
  methods: {
    chartRef(chartInstance) {
      this.charts.push(chartInstance);
    },
    syncCharts(charts, syncToolTip, syncCrosshair, syncAxisXRange) {
      if(!this.onToolTipUpdated){
        this.onToolTipUpdated = function(e) {
          for (var j = 0; j < charts.length; j++) {
            if (charts[j] != e.chart)
              charts[j].toolTip.showAtX(e.entries[0].xValue);
          }
        }
      }

      if(!this.onToolTipHidden){
        this.onToolTipHidden = function(e) {
          for( var j = 0; j < charts.length; j++){
            if(charts[j] != e.chart)
              charts[j].toolTip.hide();
          }
        }
      }

      if(!this.onCrosshairUpdated){
        this.onCrosshairUpdated = function(e) {
          for(var j = 0; j < charts.length; j++) {
            if(charts[j] != e.chart)
              charts[j].axisX[0].crosshair.showAt(e.value);
          }
        }
      }

      if(!this.onCrosshairHidden){
        this.onCrosshairHidden =  function(e) {
          for( var j = 0; j < charts.length; j++) {
            if(charts[j] != e.chart)
              charts[j].axisX[0].crosshair.hide();
          }
        }
      }

      if(!this.onRangeChanged){
        this.onRangeChanged = function(e) {
          for (var j = 0; j < charts.length; j++) {
            if (e.trigger === "reset") {
              charts[j].options.axisX.viewportMinimum = charts[j].options.axisX.viewportMaximum = null;
              charts[j].options.axisY.viewportMinimum = charts[j].options.axisY.viewportMaximum = null;
              charts[j].render();
            } else if (charts[j] !== e.chart) {
              charts[j].options.axisX.viewportMinimum = e.axisX[0].viewportMinimum;
              charts[j].options.axisX.viewportMaximum = e.axisX[0].viewportMaximum;
              charts[j].render();
            }
          }
        }
      }

      for(var i = 0; i < charts.length; i++) {

        //Sync ToolTip
        if(syncToolTip) {
          if(!charts[i].options.toolTip)
            charts[i].options.toolTip = {};

          charts[i].options.toolTip.updated = this.onToolTipUpdated;
          charts[i].options.toolTip.hidden = this.onToolTipHidden;
        }

        //Sync Crosshair
        if(syncCrosshair) {
          if(!charts[i].options.axisX)
            charts[i].options.axisX = { labelAngle: 0, valueFormatString: "MMM D", crosshair: { enabled: true, snapToDataPoint: true, valueFormatString: "HH:mm" }};

          charts[i].options.axisX.crosshair.updated = this.onCrosshairUpdated;
          charts[i].options.axisX.crosshair.hidden = this.onCrosshairHidden;
        }

        //Sync Zoom / Pan
        if(syncAxisXRange) {
          charts[i].options.zoomEnabled = true;
          charts[i].options.rangeChanged = this.onRangeChanged;
        }

        charts[i].render();
      }
    }
  },
  created() {
    for(var i = 0; i < this.jsonData.length; i++) {
      this.systemDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].system)});
      this.userDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].user)});
      this.waitDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].wait)});
      this.buffersDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].buffers)});
      this.cacheDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].cache)});
      this.usedDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].used)});
      this.inboundDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].inbound)});
      this.outboundDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].outbound)});
      this.writeDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].write)});
      this.readDps.push({x: Number(this.jsonData[i].time), y: Number(this.jsonData[i].read)});
    }
  },
  mounted() {
    this.syncCharts(this.charts, true, true, true)
  }
}
</script>
<template>
  <CanvasJSChart  :options="cpuChartOptions" :styles="styleOptions" @chart-ref="chartRef"/>
  <CanvasJSChart  :options="memoryChartOptions" :styles="styleOptions" @chart-ref="chartRef"/>
  <CanvasJSChart  :options="networkChartOptions" :styles="styleOptions"  @chart-ref="chartRef"/>
  <CanvasJSChart  :options="diskChartOptions" :styles="styleOptions" @chart-ref="chartRef"/>
</template>