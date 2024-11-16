<template>
  <div class="button-container">
    <span class="remove-icon" @click="confirmRemove" role="button" aria-label="Remove Device">🗑️</span>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
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
        // Clear the Vuex store
        this.$store.commit('SET_DEVICE_VALIDITY', false);
        this.$store.commit('SET_DEVICE_ID', '');

        // Remove the cookie
        Cookies.remove('devicevalid'); // Use the same name as when you set it
        // Optionally redirect
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