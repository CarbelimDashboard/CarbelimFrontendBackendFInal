<template>
  <div class="MainContainer">
    <div class="left-container">
      <div class="dashboardname">{{ dashboardname }}</div>
      <ProgressBar
        :value="progressBarData.value"
        :valuename="progressBarData.name"
        :size="300"
      />
    </div>
    <div class="cards-container">
      <CardComponent
        v-for="(card, index) in cards"
        :key="index"
        :name="card.name"
        :value="card.value"
        :icon="card.icon"
        :unit="card.unit"
        :low="card.low"
        :mid="card.mid"
        :high="card.high"
        :disp="card.disp"
      />
    </div>
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';
import ProgressBar from './ProgressBar.vue';

export default {
  components: {
    CardComponent,
    ProgressBar
  },
  props: {
    dashboardname: String,
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    progressBarData() {
      // Find either AQI or WQI card based on id
      const aqiCard = this.cards.find(card => card.id === 'Aaq');
      const wqiCard = this.cards.find(card => card.id === 'Wwq');
      
      // Return the relevant card's data if found, or default values
      if (aqiCard) {
        return { value: aqiCard.value, name: aqiCard.name };
      } else if (wqiCard) {
        return { value: wqiCard.value, name: wqiCard.name };
      }
      
      // Default data if neither card is found
      return { value: 0, name: 'N/A' };
    }
  }
};
</script>


<style scoped>
.MainContainer {
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  gap: 16px;
}

/* Keep the original layout for widths above 1194px */
@media (min-width: 1195px) {
  .MainContainer {
    display: flex;
  }
}

.left-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 250px;
  padding: 8px 0px 24px 0px;
  background-color: floralwhite;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-height: 220px;
}

.dashboardname {
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  margin-bottom: 12px;
  color: rgb(15, 15, 15);
}

.cards-container {
  display: grid;
  gap: 16px;
  flex-grow: 1;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Responsive card layout */
}

/* Adjust layout for widths between 1127px and 1194px */
@media (max-width: 1300px) and (min-width: 1126px) {
  .MainContainer {
    display: flex;
    flex-wrap: wrap;
  }
  .cards-container {
    grid-template-columns: repeat(4, 1fr); /* 4 cards in a row */
  }
}

/* Adjust layout for widths between 661px and 1126px */
@media (max-width: 1126px) and (min-width: 661px) {
  .MainContainer {
    display: flex;
    flex-wrap: wrap;
  }
  .left-container {
    width: 250px; /* Keep the left container width */
  }
  .cards-container {
    grid-template-columns: repeat(3, 1fr); /* 3 cards in a row */
    margin-top: 16px; /* Add spacing between left container and cards */
  }
}

/* Mobile view */
@media (max-width: 660px) {
  .MainContainer {
    flex-direction: column;
  }
  .left-container {
    width: 100%;
    margin-bottom: 16px;
  }
  .cards-container {
    grid-template-columns: repeat(3, 1fr); /* Ensure at least 3 cards in mobile view */
  }
}
</style>