<template>
  <div class="card">
    <div class="card-header" @click="showModal">
      <div class="iconContainer">
        <img :src="iconPath" alt="icon" class="icon" />
      </div>
      <span class="card-title">{{ name }}</span>
    </div>
    <div class="card-body">
      <transition name="value-change" mode="out-in">
        <span key="value" class="value">{{ displayedValue }} {{ unit }}</span>
      </transition>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercentage + '%', backgroundColor: progressColor }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import AAQI from '../assets/icons/AAQI.svg';
import ACo2 from '../assets/icons/ACo2.svg';
import AHCHO from '../assets/icons/AHCHO.svg';
import APM1 from '../assets/icons/APM1.svg';
import APM10 from '../assets/icons/APM10.svg';
import APM25 from '../assets/icons/APM25.svg';
import ATemp from '../assets/icons/ATemp.svg';
import ATVOC from '../assets/icons/ATVOC.svg';
import WPh from '../assets/icons/WPh.svg';
import WDo from '../assets/icons/WDo.svg';
import WEc from '../assets/icons/WPh.svg';
import WTDs from '../assets/icons/WTDs.svg';
import WTemp from '../assets/icons/WTemp.svg';
import WTurb from '../assets/icons/WTurb.svg';

export default {
  props: {
    name: String,
    value: {
      type: Number,
      required: true,
    },
    icon: String,
    unit: String,
    low: {
      type: Number,
      required: true,
    },
    mid: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    disp: {
      type: String,
      required: true, // New prop for description
    },
  },
  data() {
    return {
      displayedValue: this.value,
      transitionTimeout: null,
    };
  },
  computed: {
    iconPath() {
      const icons = {
        AAQI,
        ACo2,
        AHCHO,
        APM1,
        APM10,
        APM25,
        ATemp,
        ATVOC,
        WPh,
        WDo,
        WEc,
        WTDs,
        WTemp,
        WTurb,
      };
      return icons[this.icon] || this.icon;
    },
    progressPercentage() {
      const { value, low, high } = this;
      if (value <= low) return 0;
      if (value >= high) return 100;
      return ((value - low) / (high - low)) * 100;
    },
    progressColor() {
      const { value, low, mid, high } = this;
      if (value > high) return '#D07A3A';
      if (value > mid) return '#E1C16E';
      return '#90C8AC';
    },
  },
  watch: {
    value(newValue) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = setTimeout(() => {
        this.displayedValue = newValue;
      }, 300);
    },
  },
  methods: {
    showModal() {
      Swal.fire({
        title: `
          <div style="display: flex; align-items: center;">
            <img src="${this.iconPath}" alt="icon" style="width: 28px; height: 28px; margin-right: 10px;">
            <span style="font-weight: bold; font-size: 1.1em; color: #333;">${this.name}</span>
          </div>`,
        html: `
          <div style="font-size: 1.1rem; color: #555; text-align: left;">
            <p>${this.disp}</p>
            <hr style="border-top: 1px solid #e0e0e0; margin: 10px 0;">
            <p><strong style="color: #90C8AC">Good:</strong> ${this.low} and below</p>
            <p><strong style="color: #E1C16E">Moderate:</strong> ${this.low + 1} - ${this.mid}</p>
            <p><strong style="color: #D07A3A">Hazardous:</strong> ${this.mid + 1} and above</p>
          </div>`,
        background: '#fff',
        confirmButtonText: 'Close',
        confirmButtonColor: '#333',
        width: 300,
      });
    },
  },
};
</script>

<style scoped>
.iconContainer {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  margin: 0;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
}
.card-header {
  padding: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  background-color: floralwhite;
  width: 100%;
  cursor: pointer;
}
.icon {
  text-align: center;
  width: 28px;
  height: 28px;
  margin-right: 10px;
}
.card-title {
  font-weight: bold;
  font-size: 1.1em;
  color: #333;
}
.value {
  font-weight: 500;
  font-size: 1.1em;
  text-align: center;
  width: 100%;
  margin-top: 10px;
}
.progress-bar {
  margin-top: 10px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 3px;
  height: 12px;
}
.progress {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease, background-color 0.5s ease;
}
.card-body {
  margin-top: -15px;
  text-align: center;
  width: 100%;
}
.value-change-enter-active,
.value-change-leave-active {
  transition: opacity 2s ease;
}
.value-change-enter,
.value-change-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .card-header {
    flex-direction: column;
    align-items: center;
    padding: 5px;
  }
  .card-title {
    font-size: 1.1rem;
    margin-left: -5px;
  }
  .icon {
    width: 30px;
    height: 30px;
    margin-top: 2px;
  }
}
</style>
