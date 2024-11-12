<template>
    <div class="settings-container">
      <div class="category">
        <h2 class="general-title">General</h2>
        <div class="action-container">
          <span class="remove-text">Remove the devices: </span>
          <RemoveDeviceButton ref="removeDevice" />
        </div>
        <div class="action-container">
          <span class="reset-text">Reset all the realy names: </span>
          <ResetButton ref="resetButton" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import RemoveDeviceButton from '../components/RemoveDeviceButton.vue';
  import ResetButton from '../components/ResetButton.vue';
  
  export default {
    components: {
      RemoveDeviceButton,
      ResetButton
    },
    methods: {
      confirmRemove() {
        // Logic for confirming device removal
        this.$refs.removeDevice.confirmRemove();
      },
      confirmReset() {
        // Logic for confirming reset of relay names
        this.$refs.resetButton.confirmReset();
      }
    }
  }
  </script>
  
  <style scoped>
  .settings-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .general-title {
    font-size: 26px; /* Reduced size for General title */
  }
  
  .category {
    margin: 20px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
  }
  
  .action-container {
    display: flex;
    align-items: center;
    margin: 10px 0; /* Space between actions */
  }
  
  .remove-text, .reset-text {
    margin-right: 10px; /* Space between text and icon */
    font-size: 16px; /* Text size for actions */
  }
  </style>