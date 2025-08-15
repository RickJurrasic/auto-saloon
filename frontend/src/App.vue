<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1">
        <div class="relative w-full h-[40vh]">
    <video
      src="../src/assets/landing_video.mp4"
      autoplay
      loop
      muted
      playsinline
      class="w-full h-full object-cover"
    ></video>
    <div class="absolute inset-0 flex flex-col items-center justify-center overlay">
      <!-- Overlay content here, e.g., text or buttons -->
      <p class="golden font-playfair text-2xl">Experience Luxury on Wheels</p>
      <br />
      <p class="golden font-playfair">"Test drive premium cars with unmatched style and performance."</p>
      <br/>
<button class="bg-[#292929] golden font-playfair px-6 py-2 rounded shadow">
  Book a ride
</button>    </div>
  </div>
    </main>
    <Footer />
  </div>
</template>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
