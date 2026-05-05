<script setup>

import { Link } from '@inertiajs/vue3';

defineProps({
  brand: String,
  image: String,
  name: String,
  detailsUrl: String
});
</script>

<template>
  <div class="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center w-full scale-on-hover">
  <div v-if="image" class="w-full max-w-xs rounded mb-4 overflow-hidden">
    <div class="aspect-[2/1] w-full">
      <img :src="image" alt="Car image" class="w-full h-full object-cover" />
    </div>
  </div>
  <h2 class="golden font-playfair text-2xl mt-4 mb-2">{{ brand }} {{ name }}</h2>
  <Link :href="detailsUrl" class="bg-golden text-black px-4 py-2 rounded shadow hover:bg-yellow-600 transition">View Details</Link>
</div>
</template>
