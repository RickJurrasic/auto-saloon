<script setup>
import { Carousel, Slide, Navigation} from 'vue3-carousel';
import { Link } from '@inertiajs/vue3';
import 'vue3-carousel/carousel.css';

const props = defineProps({
  car: Object,
});
const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true
};

</script>

<template>
    <div class="py-5 px-4 md:px-12 mx-auto">
      <div class="bg-[#292929] rounded-lg shadow p-6 w-full border" style="border-color: #d4af37;">
      <h1 class="golden font-playfair text-2xl md:text-4xl lg:text-6xl mb-6 text-center">{{ props.car.brand }} {{ props.car.model }}</h1>
      <Carousel :items-to-show="carouselConfig.itemsToShow" :wrap-around="carouselConfig.wrapAround" class="mx-auto max-w-5xl w-full">
  <Slide v-for="img in props.car.images" :key="img.image_path">
    <img :src="img.image_path.startsWith('http') ? img.image_path : `/storage/${img.image_path}`" alt="Car photo" />
  </Slide>
  <template #addons>
    <Navigation />
  </template>
</Carousel>
        <hr class="dark-gold my-8"></hr>
                  <h1 class="golden font-playfair">Car Details</h1>

  <div class="grid grid-cols-2 md:grid-cols-3 gap-8 text-white font-playfair text-2xl my-6">
      <div><p class="golden font-playfair">Year:<br></p>{{ props.car.year }}</div>
      <div><p class="golden font-playfair">Engine Type:<br></p>{{ props.car.engine_type?.name }}</div>
      <div><p class="golden font-playfair">Transmission:<br></p>{{ props.car.transmission?.name }}</div>
      <div><p class="golden font-playfair">Body Type:<br></p>{{ props.car.body_type?.name }}</div>
      <div><p class="golden font-playfair">Horsepower:<br></p>{{ props.car.horsepower }} HP</div>
      <div><p class="golden font-playfair">Price:<br></p>${{ props.car.price }}</div>
  </div>
        <hr class="dark-gold my-8"></hr>
        <p class="golden font-playfair text-lg my-6 text-center">
  {{ props.car.cardescription }}
</p>
<hr class="dark-gold my-8"></hr>
    <Link href="/book-a-ride" class="h-20 scale-on-hover border golden-border px-8 py-8 rounded font-bold shadow-lg w-full max-w-md mx-auto mt-6 font-playfair flex items-center justify-center">
      Book a Ride
    </Link>
</div>

    </div>
</template>
