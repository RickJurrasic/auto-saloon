<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

// The 'auth' prop is automatically available on every page
defineProps({
  auth: {
    type: Object,
    default: () => ({ user: null, isLoggedIn: false })
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <!-- Pass the isLoggedIn status to the NavBar -->
    <NavBar :is-logged-in="auth.isLoggedIn" />

    <main class="flex-1 flex flex-col">
      <slot />
    </main>

    <Footer />
  </div>
</template>
