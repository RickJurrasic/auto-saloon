<script setup>
import About from './components/About.vue';
import Home from './components/Home.vue';
import Showroom from './components/Showroom.vue';

const routes = {
  '/': Home,
  '/showroom': Showroom,
  '/about': About
  //add more here
};

const currentPage = routes[window.location.pathname] || Home;
</script>

<template>
  <NavBar />
  <component :is="currentPage" />
  <Footer />
</template>
