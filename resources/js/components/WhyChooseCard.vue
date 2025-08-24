<template>
  <div class="bg-[#292929] rounded-lg p-4 flex flex-col items-center text-center w-full min-h-[220px] mx-0 md:max-w-xs md:mx-auto justify-center">
    <img
      :src="icon"
      :alt="heading || 'Card icon'"
      class="h-10 w-10 mb-2"
      v-if="icon"
    />
    <h3 class="golden font-playfair text-lg mb-1 underline">{{ heading }}</h3>
    <p class="golden font-playfair text-xs">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  heading: String,
  text: String
});
</script>
