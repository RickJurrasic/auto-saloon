<template>
  <footer class="flex items-center justify-around py-5 bg-black">
    <div class="flex-1 flex justify-center items-center">
    </div>
    <div class="flex-1 flex justify-around items-center font-cinzel-decorative">
      <img :src="facebookIcon" alt="Facebook" class="h-6 w-6" />
      <img :src="tiktokIcon" alt="TikTok" class="h-6 w-6" />
      <img :src="instagramIcon" alt="Instagram" class="h-6 w-6" />
    </div>
    <div class="flex-1 flex justify-center items-center golden font-cinzel-decorative">
        <p class="text-xs">Erik Sternad
            <br>
            © 2025</p>
    </div>
  </footer>
</template>

<script setup>
import facebookIcon from '../assets/facebook.svg';
import tiktokIcon from '../assets/tiktok.svg';
import instagramIcon from '../assets/instagram.svg';
</script>

<style scoped>
    footer {
        background-color: #292929;
    }
</style>
