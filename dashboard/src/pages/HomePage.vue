<template>
  <div class="maincontainer">
    <div id="TopContainer" class="row g-4 container mx-auto">
      <AqiCard />
      <MapCard />
    </div>

    <div class="d-flex container">
      <div class="row">
        <PollutionDashboard />
        <AirPollutants />
      </div>
    </div>
    
    <div>
      <FAQ />
    </div>
    <div class="container mx-auto px-4 my-3">
      <DiwaliProduct />
    </div>
    <div class="BlankSpace"></div>
  </div>

</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';
import PollutionDashboard from '../components/PollutionDashboard.vue';
import AirPollutants from '../components/AirPollutants.vue';
import DiwaliProduct from '../components/DiwaliProduct.vue';
import FAQ from '../components/FAQ.vue';
import AqiCard from '../components/AqiCard.vue';
import MapCard from '../components/MapCard.vue';
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['countryName', 'city1name', 'city1aqi', 'city1pm25', 'city1pm10', 'city1so2', 'city1co', 'city1o3', 'city1no2', 
                 'city2name', 'city2aqi', 'city2pm25', 'city2pm10', 'city2so2', 'city2co', 'city2o3', 'city2no2',
                 'city3name', 'city3aqi', 'city3pm25', 'city3pm10', 'city3so2', 'city3co', 'city3o3', 'city3no2',
                 'top10London', 'top10Dubai', 'top10Seoul', 'top10HongKong', 'top10NewYork', 'top10Sydney', 'top10Paris', 
                 'top10Rome', 'top10Tokyo', 'top10Delhi']),
  },
  components: {
    AqiCard,
    MapCard,
    PollutionDashboard,
    AirPollutants,
    DiwaliProduct,
    FAQ,
  },

  methods: {
    ...mapActions(['fetchCountryData', 'fetchTopCityData']),

    async fetchCountry() {
    try {
      // Remove the hardcoded IP to use the user's actual IP address
      const response = await axios.get('https://ipinfo.io?token=b21b42138f4d12');
      const country = response.data.country;

      console.log(`Detected Country Code: ${country}`);

      const countryMapping = {
        'US': 'USA',
        'IN': 'India',
        'CN': 'China',
        'JP': 'Japan',
        'BR': 'Brazil',
        'GB': 'UK',
        'FR': 'France',
        'IT': 'Italy',
        'CA': 'Canada',
        'RU': 'Russia',
        'KR': 'SouthKorea',
        'AU': 'Australia',
        'MX': 'Mexico',
        'ID': 'Indonesia',
        'ES': 'Spain',
        'TR': 'Turkey',
        'SA': 'SaudiArabia',
        'ZA': 'SouthAfrica',
        'AR': 'Argentina',
        'NG': 'Nigeria',
        'EG': 'Egypt',
        'PK': 'Pakistan',
        'VN': 'Vietnam',
        'TH': 'Thailand',
        'PH': 'Philippines',
        'MY': 'Malaysia',
        'UA': 'Ukraine',
        'PL': 'Poland',
        'AE': 'UAE',
      };

      // Map the detected country code to a formatted country name, or default to 'USA' if not in the list
      const formattedCountryName = countryMapping[country] || 'USA';
      this.$store.commit('setCountryName', formattedCountryName);
      console.log(`Updated Country Name: ${this.countryName}`);

      // Trigger data fetch based on detected country
      await this.fetchCountryData();
      await this.fetchTopCityData();

      // Log all the updated values after data fetching
      this.logValues();

    } catch (error) {
      console.error('Error detecting country or fetching data:', error);

      // Show error message with SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Data Fetch Error',
        text: `Error getting location: ${error.message}`,
        footer: 'Check your network connection or try disabling any extensions that may block the request.',
      });
    }
  },

    async fetchCountryData() {
      try {
        console.log('Fetching Country Data...');
        await this.$store.dispatch('fetchCountryData');
        console.log('Country Data Fetched and Stored');
      } catch (error) {
        console.error('Error fetching country data:', error);

        // Show error message with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Country Data Error',
          text: `There was an error fetching the country data. Details: ${error.message}`,
        });
      }
    },

    async fetchTopCityData() {
      try {
        console.log('Fetching Top City Data...');
        await this.$store.dispatch('fetchTopCityData');
        console.log('Top City Data Fetched and Stored');
      } catch (error) {
        console.error('Error fetching top city data:', error);

        // Show error message with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Top City Data Error',
          text: `There was an error fetching the top city data. Details: ${error.message}`,
        });
      }
    },

    logValues() {
      // Log each value after it has been updated in the store
      console.log('Updated Values:');
      console.log(`countryName: ${this.countryName}`);
      console.log(`city1name: ${this.city1name}`);
      console.log(`city1aqi: ${this.city1aqi}`);
      console.log(`city1pm25: ${this.city1pm25}`);
      console.log(`city1pm10: ${this.city1pm10}`);
      console.log(`city1so2: ${this.city1so2}`);
      console.log(`city1co: ${this.city1co}`);
      console.log(`city1o3: ${this.city1o3}`);
      console.log(`city1no2: ${this.city1no2}`);

      console.log(`city2name: ${this.city2name}`);
      console.log(`city2aqi: ${this.city2aqi}`);
      console.log(`city2pm25: ${this.city2pm25}`);
      console.log(`city2pm10: ${this.city2pm10}`);
      console.log(`city2so2: ${this.city2so2}`);
      console.log(`city2co: ${this.city2co}`);
      console.log(`city2o3: ${this.city2o3}`);
      console.log(`city2no2: ${this.city2no2}`);

      console.log(`city3name: ${this.city3name}`);
      console.log(`city3aqi: ${this.city3aqi}`);
      console.log(`city3pm25: ${this.city3pm25}`);
      console.log(`city3pm10: ${this.city3pm10}`);
      console.log(`city3so2: ${this.city3so2}`);
      console.log(`city3co: ${this.city3co}`);
      console.log(`city3o3: ${this.city3o3}`);
      console.log(`city3no2: ${this.city3no2}`);

      console.log(`top10London: ${this.top10London}`);
      console.log(`top10Dubai: ${this.top10Dubai}`);
      console.log(`top10Seoul: ${this.top10Seoul}`);
      console.log(`top10HongKong: ${this.top10HongKong}`);
      console.log(`top10NewYork: ${this.top10NewYork}`);
      console.log(`top10Sydney: ${this.top10Sydney}`);
      console.log(`top10Paris: ${this.top10Paris}`);
      console.log(`top10Rome: ${this.top10Rome}`);
      console.log(`top10Tokyo: ${this.top10Tokyo}`);
      console.log(`top10Delhi: ${this.top10Delhi}`);
    },
  },

  mounted() {
    console.log('Component Mounted. Initiating Country Detection and Data Fetch...');
    this.fetchCountry();
  },
};
</script>

<style scoped>
.BlankSpace {
  height: 0px;
}

#TopContainer {
  justify-content: center;
  background-color: white;
  margin-top: 1px;
  padding: 5px 2px 5px;
  padding-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.maincontainer {
  background-color: rgb(243, 243, 243);
  padding: 20px;
  transform: scale(1);
  transform-origin: top left;
  overflow-x: hidden;
}

@media (max-width: 650px) { 
.maincontainer {
  margin-bottom: 20px;
}
.BlankSpace {
  height: 40px;
}
}
</style>
