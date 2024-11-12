<template>
  <transition name="fade">
    <div class="loading-overlay" v-if="isLoading">
      <div class="spinner"></div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed; /* Changed to fixed positioning to cover the entire viewport */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(31, 41, 55, 0.9); /* Slight transparency to see underlying structure */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite, colorchange 4s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes colorchange {
  0% { border-top-color: #3498db; }
  25% { border-top-color: #e74c3c; }
  50% { border-top-color: #f1c40f; }
  75% { border-top-color: #2ecc71; }
  100% { border-top-color: #3498db; }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Layout adjustments for sidebar and mobile */
.main-content {
  position: relative;
  padding-top: 4.2rem; /* Adjust for header height */
  margin-left: 200px; /* Matches sidebar width in desktop view */
}

@media (max-width: 650px) {
  .main-content {
    margin-left: 0;
    padding-bottom: 3.2rem; /* Account for bottom bar in mobile view */
  }
}
</style>
