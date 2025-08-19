<template>
  <nav class="relative flex items-center justify-between py-2 px-4 bg-[#292929]">
    <!-- Left: Logo (tablet/desktop: logo + brand name stacked vertically) -->
    <div class="flex-1 flex items-center md:justify-start">
      <img :src="logo" alt="Logo" class="h-12 w-12 mx-auto md:h-10 md:w-10 md:mx-0" />
      <!-- Brand name only on tablet/desktop -->
      <div class="hidden md:flex flex-col ml-2">
        <span class="font-cinzel-decorative golden text-xl leading-tight">Luxury</span>
        <span class="font-cinzel-decorative golden text-xl leading-tight">Cars</span>
      </div>
    </div>
    <!-- Center: "Luxury Cars" on mobile, nav links on tablet/desktop -->
    <div class="flex-1 flex justify-center items-center">
      <!-- Mobile: Centered brand name -->
      <div class="md:hidden flex flex-col items-center">
        <span class="font-cinzel-decorative golden text-2xl leading-tight">Luxury</span>
        <span class="font-cinzel-decorative golden text-2xl leading-tight">Cars</span>
      </div>
      <!-- Tablet/Desktop: Nav links -->
      <div class="hidden md:flex w-full justify-between items-center space-x-6">
        <a
          v-for="link in navLinks.filter(l => l.name !== 'Login')"
          :key="link.name"
          :href="link.href"
          class="golden font-playfair text-lg underline hover:underline"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
    <!-- Right: Login (tablet/desktop only) -->
    <div class="hidden md:flex flex-1 justify-end items-center">
      <a
        v-for="link in navLinks.filter(l => l.name === 'Login')"
        :key="link.name"
        :href="link.href"
        class="golden font-playfair text-lg hover:underline"
      >
        {{ link.name }}
      </a>
    </div>
    <!-- Hamburger (mobile only) -->
    <div class="flex-1 flex justify-end items-center md:hidden">
      <button class="p-2 rounded" @click="showDropdown = !showDropdown">
        <span class="text-4xl golden">☰</span>
      </button>
      <div v-if="showDropdown" class="absolute top-full right-4 mt-2 bg-[#292929] rounded shadow-lg z-50 flex flex-col w-40">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="golden font-playfair text-lg px-4 py-2 hover:bg-black underline hover:underline"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import logo from '../assets/logo.svg';

const showDropdown = ref(false);

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Showroom', href: '/showroom' },
  { name: 'About', href: '/about' },
  { name: 'Login', href: '/login' }
];
</script>

<style scoped>
nav {
  background-color: #292929;
}
</style>
