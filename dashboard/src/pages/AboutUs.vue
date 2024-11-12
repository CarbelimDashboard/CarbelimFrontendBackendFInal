<template>
  <div class="about-us">
    <div class="background-image">
      <img :src="backgroundImage" alt="Background" />
      <div class="overlay"></div>
    </div>
    <div class="content-wrapper">
      <div class="header">
        <div class="icon-wrapper">
          <img :src="appIcon" alt="App Icon" class="app-icon" />
        </div>
        <h1 class="app-name">{{ appName }}</h1>
        <h5 class="app-description">{{ appDescription }}</h5>
      </div>
      <div class="contact-button-wrapper">
        <a class="contact-button" href="https://www.carbelim.io/contact-us/" target="_blank">Contact Us</a>
      </div>
      <div class="app-version">
        <p>Version: {{ appVersion }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundImage: require('../assets/images/Park-with-people.jpg'),
      appIcon: require('../assets/AppIcon.webp'),
      appName: 'Carbelim Dashboard',
      appDescription: 'Comprehensive Monitoring and Control Platform for Carbelim Devices.',
      appVersion: '1.0.0'
    };
  }
};
</script>

<style scoped>
.about-us {
  text-align: center;
}

.background-image {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.background-image .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.content-wrapper {
  background-color: white;
  padding: 30px;
  margin-top: -70px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.icon-wrapper {
  width: 120px;
  height: 120px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon {
  width: 90%;
  height: auto;
}

.app-name {
  font-size: 2rem;
  margin: 10px 0;
  font-weight: bold;
}

.app-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 20px;
}

.contact-options {
  margin: 20px 0;
}

.contact-options a {
  display: inline-block;
  margin: 0 15px;
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.contact-options a:hover {
  color: #0056b3;
}

.app-version {
  font-size: 0.9rem;
  color: #777;
}

@media (max-width: 650px) {
  .content-wrapper {
    padding: 20px;
  }

  .background-image {
    height: 250px;
  }

  .app-name {
    font-size: 1.5rem;
  }

  .app-description {
    font-size: 0.9rem;
  }

  .contact-options a {
    margin: 0 5px;
    font-size: 0.9rem;
  }
}
</style>