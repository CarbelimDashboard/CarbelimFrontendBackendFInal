<template>
  <div class="container">
    <div class="text-container">
      <div class="value-text">{{ value }}</div>
      <div class="valuename-text">{{ valuename }}</div>
      <div class="remark-box" :style="{ backgroundColor: progressColor }" @click="showModal">
        {{ computedRemark }}
      </div>
    </div>
    <apexchart
      type="radialBar"
      :options="chartOptions"
      :series="[computedPercentage]"
      :width="size"
    ></apexchart>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts';
import Swal from 'sweetalert2';

export default {
  components: {
    apexchart: ApexCharts,
  },
  props: {
    value: {
      type: Number,
      required: true,
    },
    valuename: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 225,
    },
  },
  computed: {
    computedPercentage() {
      return (this.value / 300) * 100; // Convert 0-300 scale to 0-100 for radial display
    },
    computedRemark() {
      return this.getRemark(this.value);
    },
    chartOptions() {
      return {
        chart: {
          type: 'radialBar',
          sparkline: { enabled: true },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: { margin: 25, size: '70%' },
            track: {
              background: '#e0e0e0',
              strokeWidth: '200%',
              margin: 10,
            },
            dataLabels: {
              showOn: 'always',
              name: { show: false },
              value: { show: false },
            },
          },
        },
        colors: [this.progressColor],
        stroke: { lineCap: 'round', width: 12 },
      };
    },
    progressColor() {
      const { value } = this;
      if (value <= 100) return '#90C8AC'; // Green for low values
      if (value <= 200) return '#E1C16E'; // Yellow for moderate values
      return '#D07A3A'; // Brownish-Orange for high values
    },
  },
  methods: {
    getRemark(value) {
      if (value <= 100) return 'SAFE';
      if (value <= 200) return 'MODERATE';
      return 'HAZARDOUS';
    },
    showModal() {
      Swal.fire({
        title: `<span style="font-weight: bold; color: #333;">AQI & WQI Information</span>`,
        html: `
          <div style="text-align: left; font-size: 1rem; color: #555;">
            <p><strong>AQI (Air Quality Index):</strong> Measures air quality, with a scale from Safe to Hazardous.</p>
            <p><strong>WQI (Water Quality Index):</strong> Measures water quality, using a similar scale.</p>
            <hr style="border-top: 1px solid #e0e0e0; margin: 10px 0;">
            <p><strong style="color: #90C8AC">Good:</strong> AQI &lt;= 100, WQI &lt;= 100</p>
            <p><strong style="color: #E1C16E">Moderate:</strong> AQI 101-200, WQI 101-200</p>
            <p><strong style="color: #D07A3A">Hazardous:</strong> AQI > 200, WQI > 200</p>
          </div>
        `,
        background: '#fff',
        width: 300,
        confirmButtonText: 'Close',
        confirmButtonColor: '#333',
        customClass: {
          title: 'sweetalert-title',
          popup: 'sweetalert-popup',
        },
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  border-radius: 12px;
  background-color: #f5f2ea;
  font-family: Arial, sans-serif;
  width: 100%;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin-top: 55px;
  text-align: center;
}

.value-text {
  margin-bottom: -5px;
  font-size: 2.4em;
  font-weight: bold;
  color: #000;
}

.valuename-text {
  font-size: 1.2em;
  color: #000;
}

.remark-box {
  padding: 6px 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  animation: blink 1.5s infinite alternate; /* Blinking animation */
}

@keyframes blink {
  0%, 100% {
    filter: brightness(95%);
  }
  50% {
    filter: brightness(110%); /* Increased brightness for the "blinking" effect */
  }
}

@media (max-width: 768px) {
  .container {
    margin-top: -15px;
    max-width: 220px;
    padding: 12px;
    margin-bottom: 5px;
  }
  .value-text {
    font-weight: bold;
    font-size: 1.8em;
  }
  .valuename-text {
    font-size: 1.25em;
    margin-top: 5px;
  }
  .remark-box {
    font-size: 1em;
    margin-top: 2px;
    width: 120px;
  }
}

/* SweetAlert custom styles for modern look */
.sweetalert-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.sweetalert-popup {
  font-family: Arial, sans-serif;
  border-radius: 10px;
}

.sweetalert-p {
  font-size: 5rem;
}
</style>
