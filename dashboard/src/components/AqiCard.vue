<template>
  <div class="col-md-7 col-12">
    <div :class="['card', 'card-w-background', 'h-100']" :style="{ filter: backgroundFilter }">
      <div class="card-body">
        <h5 class="card-title"><b>{{ countryName }} Air Quality Index (AQI)</b></h5>
        <p class="card-text">Real-time PM2.5, PM10 air pollution level in {{ countryName }}</p>
        <div class="row g-3">
          <div class="col-12 col-lg-6 d-grid justify-content-between">
            <div class="d-lg-flex align-items-center d-none">
              <button
                id="statusbtn"
                :class="btnClass"
                @click="showAqiModal"
              >
                {{ simpleAqiStatus }}
              </button>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex justify-content-center align-items-end">
            <div>
              <h1 :style="{ color: aqiColor, fontSize: '50px' }">
                {{ aqi || 'N/A' }}
              </h1>
              <p>(AQI-{{ countryName }})</p>
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center mt-3 d-lg-none">
            <button
              :class="btnClass"
              @click="showAqiModal"
            >
              {{ simpleAqiStatus }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';

export default {
  setup() {
    const store = useStore();
    const countryName = computed(() => store.getters.getCountryName);
    const aqi = computed(() => store.getters.getCountryAqi);

    const getAqiProperties = (value) => {
      if (value === null) return { status: 'N/A', simpleStatus: 'N/A', color: '#A9A9A9', btnClass: 'btn-secondary', filter: 'none' };
      if (value <= 50) return { status: 'Good', simpleStatus: 'Good', color: '#90C8AC', btnClass: 'btn-success', filter: 'none' };
      if (value <= 100) return { status: 'Moderate', simpleStatus: 'Moderate', color: '#E1C16E', btnClass: 'btn-warning', filter: 'none' };
      if (value <= 150) return { status: 'Unhealthy for Sensitive Groups', simpleStatus: 'Unhealthy', color: '#D07A3A', btnClass: 'btn-orange', filter: 'none' };
      if (value <= 200) return { status: 'Unhealthy', simpleStatus: 'Unhealthy', color: '#FF6347', btnClass: 'btn-danger', filter: 'none' };
      if (value <= 300) return { status: 'Very Unhealthy', simpleStatus: 'Very Unhealthy', color: '#8B3A3A', btnClass: 'btn-purple', filter: 'none' };
      return { status: 'Hazardous', simpleStatus: 'Hazardous', color: '#8B0000', btnClass: 'btn-dark-red', filter: 'none' };
    };

    const aqiProperties = computed(() => getAqiProperties(aqi.value));

    const simpleAqiStatus = computed(() => aqiProperties.value.simpleStatus);
    const aqiColor = computed(() => aqiProperties.value.color);
    const btnClass = computed(() => `btn ${aqiProperties.value.btnClass} text-white rounded-pill px-4 btn-lg blink-animation`);
    const backgroundFilter = computed(() => aqiProperties.value.filter);

    const showAqiModal = () => {
      Swal.fire({
        title: `AQI</strong>`,
        html: `
          <p><strong>AQI (Air Quality Index):</strong> Measures the quality of the air, indicating levels from Good to Hazardous.</p>
          <hr>
            <div style="text-align: left; font-size: 1rem; color: #555;">
            <p><strong style="color: #90C8AC">Good:</strong> AQI ≤ 50</p>
            <p><strong style="color: #E1C16E">Moderate:</strong> AQI 51-100</p>
            <p><strong style="color: #D07A3A">Unhealthy for Sensitive Groups:</strong> AQI 101-150</p>
            <p><strong style="color: #FF6347">Unhealthy:</strong> AQI 151-200</p>
            <p><strong style="color: #8B3A3A">Very Unhealthy:</strong> AQI 201-300</p>
            <p><strong style="color: #8B0000">Hazardous:</strong> AQI > 300</p>
          </div>
        `,
        background: '#fff',
        width: 300,
        confirmButtonText: 'Close',
        confirmButtonColor: '#333',
      });
    };

    return {
      countryName,
      aqi,
      simpleAqiStatus,
      aqiColor,
      btnClass,
      backgroundFilter,
      showAqiModal,
    };
  },
};
</script>

<style scoped>
@keyframes blink {
  0%, 100% {
    filter: brightness(95%);
  }
  50% {
    filter: brightness(110%); /* Increased brightness for the "blinking" effect */
  }
}

.blink-animation {
  animation: blink 1.5s infinite ease-in-out;
}

#statusbtn {
  margin-left: 40px;
}

.card-w-background {
  background-image: url('../assets/india_map_shape_new_3.png');
  background-position: bottom;
  background-size: 100% 95px;
  background-repeat: no-repeat;
  border: none;
}

.air-quality-card {
  background-image: url('../assets/air-quality-map.webp');
  background-size: cover;
  border: none;
}

.btn-success {
  background-color: #90C8AC !important;
}

.btn-warning {
  background-color: #E1C16E !important;
}

.btn-orange {
  background-color: #D07A3A !important;
}

.btn-danger {
  background-color: #FF6347 !important;
}

.btn-purple {
  background-color: #8B3A3A !important;
}

.btn-dark-red {
  background-color: #8B0000 !important;
}

.btn-lg {
  font-size: 22px;
  font-weight: bold;
  padding: 10px 20px;
}
</style>
