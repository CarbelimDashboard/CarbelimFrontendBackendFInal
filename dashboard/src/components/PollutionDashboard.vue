<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PollutedCities from './PollutedCities.vue';

// Function to determine the color based on AQI value
const getColorByAQI = (aqi) => {
  if (aqi > 150) return '#8B3A3A'; // Unhealthy: A softer dark red
  if (aqi > 100) return '#D07A3A'; // Unhealthy for Sensitive Groups: A muted brownish-orange
  if (aqi > 50) return '#E1C16E'; // Moderate: A softer yellow
  if (aqi > 0) return '#90C8AC'; // Good: A muted teal
  return '#A9A9A9'; // N/A or very low: A soft gray
};

// Function to process and rank cities based on AQI
const processAQIData = (data) => {
  if (!data) return [];

  // Create an array of city data from the getters
  const citiesData = [
    { city: 'London', aqi: data.gettopcity1 },
    { city: 'Dubai', aqi: data.gettopcity2 },
    { city: 'Seoul', aqi: data.gettopcity3 },
    { city: 'Hong Kong', aqi: data.gettopcity4 },
    { city: 'New York', aqi: data.gettopcity5 },
    { city: 'Sydney', aqi: data.gettopcity6 },
    { city: 'Paris', aqi: data.gettopcity7 },
    { city: 'Rome', aqi: data.gettopcity8 },
    { city: 'Tokyo', aqi: data.gettopcity9 },
    { city: 'Delhi', aqi: data.gettopcity10 },
  ];

  // Sort cities by AQI in descending order
  citiesData.sort((a, b) => b.aqi - a.aqi);

  // Assign ranks and colors
  return citiesData.map((cityData, index) => ({
    rank: index + 1,
    city: cityData.city,
    aqi: cityData.aqi,
    color: getColorByAQI(cityData.aqi),
  }));
};

const store = useStore();
const countryName = computed(() => store.getters.getCountryName);
const aqi = computed(() => store.getters.getCountryAqi);
const topCities = computed(() => ({
  gettopcity1: store.getters.gettopcity1,
  gettopcity2: store.getters.gettopcity2,
  gettopcity3: store.getters.gettopcity3,
  gettopcity4: store.getters.gettopcity4,
  gettopcity5: store.getters.gettopcity5,
  gettopcity6: store.getters.gettopcity6,
  gettopcity7: store.getters.gettopcity7,
  gettopcity8: store.getters.gettopcity8,
  gettopcity9: store.getters.gettopcity9,
  gettopcity10: store.getters.gettopcity10,
}));

const mostPollutedCities = computed(() => processAQIData(topCities.value));

</script>

<template>
  <div class="col-12 col-lg-4 order-md-1 order-2">
    <PollutedCities 
      title="AQI of Popular Cities" 
      description="Real-time AQI values of cities" 
      :cities="mostPollutedCities" 
    />
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>