<script setup>
import Home from './components/Home.vue';
import Showroom from './components/Showroom.vue';
import { computed } from 'vue';

const currentPage = computed(() => {
  if (window.location.pathname === '/showroom') return Showroom;
  return Home;
});
</script>

<template>
  <NavBar />
  <component :is="currentPage" />
  <Footer />
</template>
