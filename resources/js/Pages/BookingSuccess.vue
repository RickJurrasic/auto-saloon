<script setup>
import MainLayout from '@/Layouts/MainLayout.vue';
import { Link } from '@inertiajs/vue3';

defineOptions({
    layout: MainLayout
});
</script>

<template>
    <div class="flex-grow flex flex-col items-center justify-center bg-[#1f1b17] text-white">
        <div class="max-w-lg p-8 border golden-border rounded-lg shadow-md text-center bg-[#292929]">
            <h1 class="text-4xl font-bold golden font-playfair mb-4">Thank You!</h1>
            <p class="text-lg text-gray-300 mb-6">Your booking has been successfully processed.</p>
            <p class="text-gray-400">You will receive a confirmation email shortly with the details of your test drive.</p>
            <div class="mt-8">
                <Link :href="route('showroom.index')" class="golden font-playfair hover:underline">
                    &larr; Back to Showroom
                </Link>
            </div>
        </div>
    </div>
</template>
