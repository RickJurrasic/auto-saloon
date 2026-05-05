<template>
    <Link :href="logoutRoute" method="post" as="button" v-bind="$attrs" class="bg-transparent border-none p-0 w-full text-center golden font-playfair text-lg hover:bg-gray-700 md:text-2xl md:w-auto md:text-center">
        Logout
    </Link>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';

defineOptions({
  inheritAttrs: false
});

defineProps({
    logoutRoute: {
        type: String,
        required: true
    }
});
</script>
