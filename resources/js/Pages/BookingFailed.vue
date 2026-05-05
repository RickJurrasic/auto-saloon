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
            <h1 class="text-4xl font-bold text-red-500 font-playfair mb-4">Payment Failed</h1>
            <p class="text-lg text-gray-300 mb-6">Unfortunately, your payment could not be processed.</p>
            <p class="text-gray-400">Please try again or contact our support if the problem persists.</p>
            <div class="mt-8">
                <Link :href="route('book-a-ride.create')" class="golden font-playfair hover:underline">
                    &larr; Back to Booking
                </Link>
            </div>
        </div>
    </div>
</template>