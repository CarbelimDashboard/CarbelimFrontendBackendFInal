<template>
  <div class="card">
    <div class="card-header">
      <span class="card-title">{{ newName }}</span>
      <span @click="openEditPopup" class="edit-icon">✏️</span>
    </div>
    <div class="card-body">
      <div class="switch">
        <input type="checkbox" :id="name" v-model="switchState" @change="toggleSwitch" :disabled="isDisabled" />
        <label :for="name">
          <span class="switch-handle"></span>
        </label>
      </div>
      <div v-if="nameError" class="error-message">{{ nameError }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export default {
  props: {
    id: String,
    name: String,
    value: { type: [Boolean, Number], required: true, default: false }
  },
  data() {
    return {
      switchState: Boolean(this.value),
      isDisabled: false,
      newName: this.name,
      nameError: '' // To hold error message for duplicate names
    };
  },
  methods: {
    async toggleSwitch() {
      this.isDisabled = true; // Disable the switch
      const command = this.switchState ? 1 : 0;
      const body = { [`relay${this.id.split('-')[1]}`]: command };
      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/relaycontrol?deviceid=${this.deviceIdValue}`, body);
      } catch (error) {
        console.error('Error sending request:', error);
      } finally {
        this.isDisabled = false; // Re-enable the switch
      }
      this.$emit('update:value', this.switchState ? 1 : 0); // Emit 1 for true, 0 for false
    },
    async openEditPopup() {
      const { value: newName } = await Swal.fire({
        title: 'Edit Name',
        input: 'text',
        inputLabel: 'Enter a new name',
        inputValue: this.newName,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: (name) => {
          if (!name) {
            Swal.showValidationMessage('Name cannot be empty');
          } else if (this.$store.state.devices.C201.R.map(r => r.name).includes(name) && name !== this.newName) {
            Swal.showValidationMessage('This name is already taken. Please choose another.');
          }
          return name;
        }
      });

      if (newName) {
        this.newName = newName;
        this.$store.commit('updateRelayName', { id: this.id, name: this.newName });
        Cookies.set(`relayName_${this.id}`, this.newName, { expires: 90 }); // Expires in 90 days
      }
    }
  },
  watch: {
    value(newValue) {
      this.switchState = Boolean(newValue);
    }
  },
  created() {
    const savedName = Cookies.get(`relayName_${this.id}`);
    if (savedName) {
      this.newName = savedName;
      this.$store.commit('updateRelayName', { id: this.id, name: savedName }); // Update Vuex store
    } else {
      const relay = this.$store.state.devices.C201.R.find(r => r.id === this.id);
      if (relay) {
        this.newName = relay.name; // Set newName to the existing name in Vuex
      }
    }
  },
  computed: {
    isDeviceValid() {
      return this.$store.getters.toGetDeviceValid;
    },
    deviceIdValue() {
      return this.$store.getters.toGetDeviceId;
    }
  }
};
</script>

<style scoped>
.edit-icon {
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}
.card-title {
  text-align: center;
  padding: 10px;
  border-radius: 5px background-color rgb(243, 243, 243);
}
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease-in-out;
  position: relative; /* Added for positioning the edit icon */
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
}
.card-header {
  padding: 10px; /* Adjusted padding */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  background-color: rgb(252, 252, 252);
  width: 100%;
  box-sizing: border-box;
}
.card-title {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}
.switch {
  position: relative;
  display: inline-block;
  width: 50px; /* Reduced width */
  height: 28px; /* Reduced height */
  margin-top: 10px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: background-color 0.4s;
}
.switch label:before {
  content: "";
  position: absolute;
  height: 22px; /* Reduced height */
  width: 22px; /* Reduced width */
  left: 3px; /* Adjusted position */
  bottom: 3px; /* Adjusted position */
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s;
}
input:checked + label {
  background-color: #4caf50;
}
input:checked + label:before {
  transform: translateX(22px); /* Adjusted for the new size */
}
.card-body {
  text-align: center;
  margin-top: -10px;
  padding: -10px;
}
.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
@media (max-width: 600px) {
  .card-title {
    padding: auto + 2px auto + 1px;
  }
}
@media (min-width: 1025px) {
  .card-title {
    padding: 14px 34px;
  }
}
</style>