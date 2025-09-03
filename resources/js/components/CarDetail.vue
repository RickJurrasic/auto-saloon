<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
import { Carousel, Slide, Navigation} from 'vue3-carousel';
import 'vue3-carousel/carousel.css';
const car = JSON.parse(document.getElementById('app').dataset.car);
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true
};

</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <NavBar />
    <main class="py-5 px-4 md:px-12 mx-auto">
      <h1 class="golden font-playfair text-2xl md:text-4xl lg:text-6xl mb-6 text-center">{{ car.brand }} {{ car.model }}</h1>
      <Carousel :items-to-show="carouselConfig.itemsToShow" :wrap-around="carouselConfig.wrapAround" class="mx-auto max-w-5xl w-full">
  <Slide v-for="img in car.images" :key="img.image_path">
    <img :src="img.image_path" alt="Car photo"/>
  </Slide>
  <template #addons>
    <Navigation />
  </template>
</Carousel>
    </main>
  </div>
  <Footer />
</template>
