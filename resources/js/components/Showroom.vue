<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
import CarCard from './CarCard.vue';

// Fetch car data from Blade view
const cars = JSON.parse(document.getElementById('app').dataset.cars);
const carouselConfig = { itemsToShow: 1, wrapAround: true };
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <NavBar />
    <main class="flex-1 flex flex-col items-center justify-center py-12">
      <h1 class="text-4xl golden font-playfair mb-6">Showroom</h1>
      <p class="text-lg text-white mb-8">Browse our selection of luxury cars below.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <CarCard
          v-for="car in cars"
          :key="car.id"
          :images="car.images.map(img => img.image_path)"
          :name="car.model"
          :detailsUrl="`/cars/${car.id}`"
          :carouselConfig="carouselConfig"
        />
      </div>
    </main>
    <Footer />
  </div>
</template>
