<script setup>
import Home from './components/Home.vue';
import Showroom from './components/Showroom.vue';
// import other components as needed

const routes = {
  '/': Home,
  '/showroom': Showroom,
  // add more routes here
};

const currentPage = routes[window.location.pathname] || Home;
</script>

<template>
  <NavBar />
  <component :is="currentPage" />
  <Footer />
</template>
