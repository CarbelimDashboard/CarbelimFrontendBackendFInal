<template>
  <div class="reset-button-container">
    <span class="reset-icon" @click="confirmReset" role="button" aria-label="Reset Relay Names">🗑️</span>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

export default {
  methods: {
    confirmReset() {
      Swal.fire({
        title: 'Are you sure?',
        text: "The names of the relays will be reset to their default values.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff6b6b',
        cancelButtonColor: '#ccc',
        confirmButtonText: 'Yes, reset them!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.resetNames();
        }
      });
    },
    resetNames() {
      const relays = this.$store.state.devices.C201.R;

      relays.forEach(relay => {
        Cookies.remove(`relayName_${relay.id}`);
        this.$store.commit('updateRelayName', { id: relay.id, name: relay.name });
      });

      Swal.fire('Reset!', 'Relay names have been reset to default values.', 'success');
    }
  }
}
</script>

<style scoped>
.reset-button-container {
  text-align: center;
}

.reset-icon {
  font-size: 20px; /* Adjust size as needed */
  cursor: pointer;
  transition: transform 0.3s;
}
</style>