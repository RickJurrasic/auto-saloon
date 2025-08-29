<script setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import 'vue3-carousel/carousel.css';

defineProps({
  images: Array,
  name: String,
  detailsUrl: String,
  carouselConfig: Object
});
</script>

<template>
  <div class="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center w-full md:w-[400px]">
    <Carousel v-bind="carouselConfig">
      <Slide v-for="img in images" :key="img">
        <img :src="img" alt="Car photo" class="w-full h-48 object-cover rounded mb-2" />
      </Slide>
      <Pagination />
      <Navigation />
    </Carousel>
    <h2 class="golden font-playfair text-2xl mt-4 mb-2">{{ name }}</h2>
    <a :href="detailsUrl" class="bg-golden text-black px-4 py-2 rounded shadow hover:bg-yellow-600 transition">View Details</a>
  </div>
</template>
