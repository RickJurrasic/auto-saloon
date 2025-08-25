<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <NavBar />
    <main class="flex-1 flex flex-col items-center justify-center py-12">
      <h1 class="text-4xl golden font-playfair mb-6">Showroom</h1>
      <p class="text-lg text-white mb-8">Browse our selection of luxury cars below.</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <div class="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center">
          <h2 class="golden font-playfair text-2xl mb-2">Porsche 911</h2>
          <p class="text-white">A timeless classic with unmatched performance.</p>
        </div>
        <div class="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center">
          <h2 class="golden font-playfair text-2xl mb-2">Rolls Royce Ghost</h2>
          <p class="text-white">Luxury and comfort at its finest.</p>
        </div>
        <div class="bg-[#292929] rounded-lg shadow p-6 flex flex-col items-center">
          <h2 class="golden font-playfair text-2xl mb-2">Mercedes S-Class</h2>
          <p class="text-white">Elegance and technology in perfect harmony.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
