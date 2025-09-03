<script setup>
defineProps({
  image: String,
  name: String,
  detailsUrl: String
});
</script>

<template>
  <div class="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center w-full">
    <img v-if="image" :src="image" alt="Car image" class="rounded mb-4 w-full max-w-xs object-cover" />
    <h2 class="golden font-playfair text-2xl mt-4 mb-2">{{ name }}</h2>
    <a :href="detailsUrl" class="bg-golden text-black px-4 py-2 rounded shadow hover:bg-yellow-600 transition">View Details</a>
  </div>
</template>
