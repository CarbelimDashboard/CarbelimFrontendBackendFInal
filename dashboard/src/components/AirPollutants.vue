<template>
  <div class="col-12 col-lg-8 order-1 order-md-2 topContainer">
    <div class="my-3 Card border border-1 rounded-3 card-with-bg">
      <div class="py-3 d-flex justify-content-center align-items-center">
        <h2 class="card-pollutants-title">Major Air Pollutants in {{ countryName }}</h2>
      </div>

      <div class="row row-cols-3 g-3 px-3">
        <PollutantSensor
          v-for="(pollutant, index) in analyzedPollutants"
          :key="index"
          :imgSrc="pollutant.imgSrc"
          :imgAlt="pollutant.imgAlt"
          :value="pollutant.value"
          :link="pollutant.link"
          :label="pollutant.label"
          :barColor="pollutant.barColor"
          :barWidth="pollutant.barWidth"
        />
      </div>

      <div class="attention-box d-flex px-3 gap-3 align-items-center">
        <div class="dynamic-airquality text-center" :style="{ backgroundColor: pm25Analysis.barColor }">
          <p class="m-0">PM2.5 <span class="times-value">{{ pm25Analysis.multiplier }}X</span></p>
        </div>
        <p class="m-0">
          The current PM2.5 concentration in {{ countryName }} is
          <b :style="{ color: pm25Analysis.barColor }">{{ pm25Analysis.multiplier }} times above</b>
          the recommended limit given by the WHO 24 hrs air quality guidelines value.
        </p>
      </div>
    </div>

    <MetroCities />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';
import PollutantSensor from './PollutantSensor.vue';
import MetroCities from './MetroCities.vue';

export default {
  name: 'AirPollutants',
  components: {
    PollutantSensor,
    MetroCities
  },
  setup() {
    const store = useStore();

    // Define countryName as a computed property
    const countryName = computed(() => store.getters.getCountryName);

    return {
      countryName,
    };
  },
  computed: {
    ...mapGetters([
      'getCountrypm25',
      'getCountrypm10',
      'getCountryso2',
      'getCountryco',
      'getCountryo3',
      'getCountryno2'
    ]),
    analyzedPollutants() {
      return [
        {
          imgSrc: require('../assets/icons/APM25.svg'),
          imgAlt: 'India pm2.5 icon',
          value: this.getCountrypm25,
          label: '(PM2.5)',
          ...this.analyzePollutant(this.getCountrypm25, '(PM2.5)')
        },
        {
          imgSrc: require('../assets/icons/APM10.svg'),
          imgAlt: 'India pm10 icon',
          value: this.getCountrypm10,
          label: '(PM10)',
          ...this.analyzePollutant(this.getCountrypm10, '(PM10)')
        },
        {
          imgSrc: require('../assets/icons/AHCHO.svg'),
          imgAlt: 'India so2 sulphur dioxide icon',
          value: this.getCountryso2,
          label: '(SO2)',
          ...this.analyzePollutant(this.getCountryso2, '(SO2)')
        },
        {
          imgSrc: require('../assets/icons/ACo2.svg'),
          imgAlt: ' India co carbon monoxide icon',
          value: this.getCountryco,
          label: '(CO)',
          ...this.analyzePollutant(this.getCountryco, '(CO)')
        },
        {
          imgSrc: require('../assets/icons/WDo.svg'),
          imgAlt: 'India o3 ozone icon',
          value: this.getCountryo3,
          label: '(Ozone)',
          ...this.analyzePollutant(this.getCountryo3, '(Ozone)')
        },
        {
          imgSrc: require('../assets/icons/WEc.svg'),
          imgAlt: 'India no2 nitrogen dioxide icon',
          value: this.getCountryno2,
          label: '(NO2)',
          ...this.analyzePollutant(this.getCountryno2, '(NO2)')
        }
      ];
    },
    pm25Analysis() {
      const pm25Value = this.getCountrypm25;
      const WHO_PM25_LIMIT = 25; // WHO 24-hour mean guideline value for PM2.5
      const multiplier = (pm25Value / WHO_PM25_LIMIT).toFixed(1);

      let barColor;
      if (pm25Value > 150) {
        barColor = '#D07A3A'; // Red
      } else if (pm25Value > 50) {
        barColor = '#E1C16E'; // Yellow
      } else {
        barColor = '#90C8AC'; // Green
      }

      return { multiplier, barColor };
    }
  },
  methods: {
    analyzePollutant(value, label) {
      let barColor, barWidth;

      if (label === '(PM2.5)' || label === '(PM10)') {
        if (value > 150) {
          barColor = '#D07A3A'; // Red
          barWidth = 100;
        } else if (value > 50) {
          barColor = '#E1C16E'; // Yellow
          barWidth = (value / 150) * 100;
        } else {
          barColor = '#90C8AC'; // Green
          barWidth = (value / 50) * 100;
        }
      } else {
        if (value > 100) {
          barColor = '#D07A3A'; // Red
          barWidth = 100;
        } else if (value > 50) {
          barColor = '#E1C16E'; // Yellow
          barWidth = (value / 100) * 100;
        } else {
          barColor = '#90C8AC'; // Green
          barWidth = (value / 50) * 100;
        }
      }

      return { barColor, barWidth }; // Return the object with barColor and barWidth
    }
  }
}
</script>

<style scoped>
.card-pollutants {
  padding: 1rem;
}

.card-pollutants-title {
  margin: 0;
  font-size: 1.5rem;
}

.attention-box {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 3rem;
}

.dynamic-airquality {
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #ffffff;
}

.times-value {
  font-weight: bold;
}

.card-with-bg {
  background-color: #ffffff;
  background-image: url('https://www.aqi.in/assets/images/india_map_shape_new_3.png');
  background-position: bottom;
  background-size: 100% 15%;
  background-repeat: no-repeat;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>