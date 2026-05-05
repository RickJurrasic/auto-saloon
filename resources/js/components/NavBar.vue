<script setup>
import { ref, computed } from 'vue';
import LogoutButton from './LogoutButton.vue';
import { Link, usePage } from '@inertiajs/vue3';

const props = defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false
  }
});

const page = usePage();
const user = computed(() => page.props.auth.user);

const showMobileDropdown = ref(false);
const showUserDropdown = ref(false);

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Showroom', href: '/showroom' },
  { name: 'About', href: '/about' },
  { name: 'Book a Ride', href: '/bookings/create' },
];

const mobileNavLinks = computed(() => {
    const links = [...navLinks];
    links.push({ isDivider: true });

    if (!props.isLoggedIn) {
        links.push({ name: 'Login', href: '/login' });
    } else {
        links.push({ name: user.value.name, isUsername: true });
        links.push({ name: 'Dashboard', href: route('dashboard') });
        links.push({ name: 'Logout', href: '/logout', isLogout: true });
    }
    return links;
});
</script>

<template>
  <nav class="relative flex items-center justify-between py-2 px-4 bg-[#292929]">
    <!-- Left: Logo (tablet/desktop: logo + brand name stacked vertically) -->
    <div class="flex-1 flex items-center md:justify-start">
        <img src="/assets/logo.svg" alt="Logo" class="h-12 w-12 mx-auto md:h-10 md:w-10 md:mx-0" />
        <div class="hidden md:flex flex-col ml-2">
            <span class="font-cinzel-decorative golden text-xl leading-tight">Luxury</span>
            <span class="font-cinzel-decorative golden text-xl leading-tight">Cars</span>
        </div>
    </div>

    <!-- Center: "Luxury Cars" on mobile, nav links on tablet/desktop -->
    <div class="flex-1 flex justify-center items-center">
        <div class="md:hidden flex flex-col items-center">
            <span class="font-cinzel-decorative golden text-2xl leading-tight">Luxury</span>
            <span class="font-cinzel-decorative golden text-2xl leading-tight">Cars</span>
        </div>
        <div class="hidden md:flex w-full justify-between items-center space-x-6">
            <Link
              v-for="link in navLinks"
              :key="link.name"
              :href="link.href"
              class="golden luxury-link font-playfair text-2xl"
            >
              {{ link.name }}
        </Link>
        </div>
    </div>

    <!-- Right: Login/Logout -->
    <div class="hidden md:flex flex-1 justify-end items-center relative">
        <Link v-if="!isLoggedIn" href="/login" class="golden luxury-link font-playfair text-2xl">
            Login
        </Link>
        <div v-else>
            <button @click="showUserDropdown = !showUserDropdown" class="golden luxury-link font-playfair text-2xl flex items-center" id="userName">
                <span class="font-bold">{{ user.name }}</span>
                <svg class="ml-2 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <div v-if="showUserDropdown" class="absolute top-full right-0 mt-2 bg-[#292929] rounded border border-solid golden-border shadow-lg z-50 flex flex-col w-48">
                <Link :href="route('dashboard')" class="block golden font-playfair text-lg px-4 py-2 hover:bg-gray-700">Dashboard</Link>
                <hr class="golden-border" />
                <LogoutButton logout-route="/logout" class="px-4 py-2" />
            </div>
        </div>
    </div>

    <!-- Hamburger (mobile only) -->
    <div class="flex-1 flex justify-end items-center md:hidden relative">
        <button class="p-2 rounded border golden-border focus:outline-none" @click="showMobileDropdown = !showMobileDropdown">
            <span class="text-4xl golden">☰</span>
        </button>
        <div v-if="showMobileDropdown" class="absolute top-full right-0 mt-2 bg-[#292929] border golden-border rounded shadow-lg z-50 flex flex-col w-40">
            <template v-for="(link, index) in mobileNavLinks" :key="index">
                <hr v-if="link.isDivider" class="golden-border" />
                <span v-else-if="link.isUsername" class="block golden underline font-playfair text-lg px-4 pt-2 pb-1 text-center font-bold">
                    {{ link.name }}
                </span>
                <LogoutButton
                    v-else-if="link.isLogout"
                    logout-route="/logout"
                    class="px-4 py-2 text-center"
                />
                <Link v-else :href="link.href" class="block text-bold golden font-playfair text-lg px-4 py-2">
                  {{ link.name }}
                </Link>
            </template>
        </div>
    </div>
  </nav>
</template>
