<script setup>

import About from './components/About.vue';
import Home from './components/Home.vue';
import Showroom from './components/Showroom.vue';
import CarDetail from './components/CarDetail.vue';

function getRouteComponent(path) {
  if (path === '/') return Home;
  if (path === '/showroom') return Showroom;
  if (path === '/about') return About;
  if (/^\/cars\/\d+$/.test(path)) return CarDetail;
  return Home;
}

const currentPage = getRouteComponent(window.location.pathname);
</script>

<template>
  <NavBar />
  <component :is="currentPage" />
  <Footer />
</template>
