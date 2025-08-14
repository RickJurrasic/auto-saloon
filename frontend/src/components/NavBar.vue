<template>
  <nav class="flex items-center justify-around py-2 bg-black">
    <div class="flex-1 flex justify-center items-center">
      <img :src="logo" alt="Logo" class="h-15 w-15" />
    </div>
    <div class="flex-1 flex justify-center items-center font-cinzel-decorative">
      <span class="text-3xl golden">Luxury Cars</span>
    </div>
    <div class="flex-1 flex justify-center items-center">
      <button class="p-2 rounded">
        <span class="text-7xl golden">☰</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import logo from '../assets/logo.svg';
</script>

<style scoped>
nav {
  background-color: #292929;
}
</style>
