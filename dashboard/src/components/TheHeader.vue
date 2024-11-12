<template>
  <header class="navbar">
    <div class="navbar__logo">
      <router-link to="/">
        <img src="../assets/Carbelim-Logo2.png" alt="Logo">
      </router-link>
    </div>

    <!-- Sidebar Navigation for Desktop Only -->
    <nav class="sidebar__nav" v-if="!isMobile">
      <ul class="sidebar__links">
        <li>
          <router-link to="/" :class="{ 'active': isActive('/home') }">
            <img class="navicon" src="../assets/icons/home.svg" alt="">
            <span>Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard" :class="{ 'active': isActive('/dashboard') }">
            <img class="navicon" src="../assets/icons/dashboard.svg" alt="">
            <span>Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/graph" :class="{ 'active': isActive('/graph') }">
            <img class="navicon" src="../assets/icons/stats.svg" alt="">
            <span>Graph</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" :class="{ 'active': isActive('/about') }">
            <img class="navicon" src="../assets/icons/info.svg" alt="">
            <span>About</span>
          </router-link>
        </li>
      </ul>

      <!-- Settings item at the bottom of sidebar -->
      <router-link to="/settings" :class="{ 'active': isActive('/settings') }" class="sidebar__settings">
        <img class="navicon" src="../assets/icons/settings.svg" alt="">
        <span>Settings</span>
      </router-link>
    </nav>

    <!-- Bottom Navigation for Mobile Only -->
    <div class="navbar__bottom-bar" v-if="isMobile">
      <ul class="navbar__bottom-links">
        <li>
          <router-link to="/" :class="{ 'active': isActive('/home') }">
            <img class="navicon" src="../assets/icons/home.svg" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/graph" :class="{ 'active': isActive('/graph') }">
            <img class="navicon" src="../assets/icons/stats.svg" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard" :class="{ 'active': isActive('/dashboard') }">
            <img class="navicon" src="../assets/icons/dashboard.svg" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/about" :class="{ 'active': isActive('/about') }">
            <img class="navicon" src="../assets/icons/info.svg" alt="">
          </router-link>
        </li>
        <li>
          <router-link to="/settings" :class="{ 'active': isActive('/settings') }">
            <img class="navicon" src="../assets/icons/settings.svg" alt="">
          </router-link>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 650;
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.navbar {
  font-family: Roboto;
  height: 4.2rem;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  background-color: #1f2937;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar__logo img {
  margin-left: 1rem;
  height: 40px;
}

.sidebar__nav {
  position: fixed;
  top: 4.2rem;
  left: 0;
  width: 200px;
  background-color: #1f2937;
  height: calc(100vh - 4.2rem);
  padding-top: 1rem;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

.sidebar__links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar__links li {
  margin-bottom: 1rem;
}

.sidebar__links a {
  display: flex;
  align-items: center;
  color: #9ca3af;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.3s, box-shadow 0.3s;
}

.sidebar__links a.active {
  color: #fff;
}

.sidebar__links a.active {
  color: #3b82f6;
  box-shadow: inset 0 -2px 0 #3b82f6; /* Highlight effect without background */
}

.sidebar__links img.navicon {
  margin-right: 0.5rem;
  filter: invert() brightness(80%);
  height: 19px;
  width: 19px;
}

.sidebar__settings {
  position: absolute;
  bottom: 1rem;
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.3s, box-shadow 0.3s;
}

.sidebar__settings.active {
  color: #3b82f6;
  box-shadow: inset 0 -2px 0 #3b82f6;
}

.sidebar__settings img.navicon {
  margin-right: 0.5rem;
  filter: invert() brightness(80%);
  height: 22px;
  width: 22px;
}

/* Bottom Navbar for Mobile */
.navbar__bottom-bar {
  position: fixed;
  bottom: 0;
  height: 3.8rem;
  left: 0;
  width: 100%;
  background-color: #1f2937;
  border-top: 1px solid #374151;
  padding: 0 .4rem;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
}

.navbar__bottom-links {
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__bottom-links li {
  margin: 0;
}

.navbar__bottom-links a {
  color: #9ca3af;
  text-decoration: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 50px;
  transition: color 0.3s;
}

.navbar__bottom-links a.active .navicon {
  filter: invert(50%) sepia(100%) saturate(100%) hue-rotate(200deg);
}

.navbar__bottom-links a:not(.active) .navicon {
  filter: invert() brightness(80%);
}

.sidebar__links a.active .navicon {
  filter: invert(50%) sepia(100%) saturate(100%) hue-rotate(200deg);
}

.sidebar__links a:not(.active) .navicon {
  filter: invert() brightness(80%);
}

.navbar__bottom-links img.navicon {
  margin-top: 3px;
  height: 26px;
  width: 26px;
  filter: invert() brightness(80%);
}

@media (max-width: 650px) {
  .sidebar__nav {
    display: none;
  }
  .navbar__bottom-bar {
    display: block;
  }
}
</style>
