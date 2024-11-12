<template>
  <div class="button-container">
    <span class="remove-icon" @click="confirmRemove" role="button" aria-label="Remove Device">🗑️</span>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    confirmRemove() {
      Swal.fire({
        title: 'Are you sure?',
        text: "This action will remove the device.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff6b6b',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Yes, remove it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeDevice();
        }
      });
    },
    removeDevice() {
      this.$store.commit('SET_DEVICE_VALIDITY', false);
      this.$store.commit('SET_DEVICE_ID', '');
      document.cookie = "devicevalid=; domain=.carbelim.io; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.button-container {
  text-align: center; /* Center the emoji */
}

.remove-icon {
  font-size: 20px; /* Adjust size as needed */
  cursor: pointer;
  transition: transform 0.3s;
}
</style>