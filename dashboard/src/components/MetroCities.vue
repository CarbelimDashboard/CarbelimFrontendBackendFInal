<template>
  <div class="card border-none">
    <div class="metro-citie-title-header">
      <h4 class="text-white p-2 mb-0">{{ countryName }} - Metro Cities AQI</h4>
    </div>
    <div class="row g-3 px-2 py-3 container">
      <CityCard
        v-for="(city, index) in cityList"
        :key="index"
        :name="city.name"
        :image="city.image"
        :aqiIn="city.aqi"
        :temprature="city.temprature"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CityCard from './CityCard.vue';

export default {
  name: 'MetroCities',
  components: {
    CityCard
  },
  setup() {
    const store = useStore();

    // Define countryName as a computed property
    const countryName = computed(() => store.getters.getCountryName);

    // Define cityList as a computed property
    const cityList = computed(() => {
      return [
        {
          name: store.getters.getcity1name,
          image: require('../assets/images/DelhiIcon.webp'),
          aqi: store.getters.getcity1Aqi,
          temprature: store.getters.getcity1Temperature // Ensure you have this getter
        },
        {
          name: store.getters.getcity2name,
          image: require('../assets/images/MumbaiIcon.webp'),
          aqi: store.getters.getcity2Aqi,
          temprature: store.getters.getcity2Temperature // Ensure you have this getter
        },
        {
          name: store.getters.getcity3name,
          image: require('../assets/images/KolkataIcon.webp'),
          aqi: store.getters.getcity3Aqi,
          temprature: store.getters.getcity3Temperature // Ensure you have this getter
        }
      ];
    });

    return {
      countryName,
      cityList
    };
  }
};
</script>

<style scoped>
.text {
  border-radius: 10px;
}

.card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.metro-citie-title-header {
  background-color: #289bd1;
}
</style>