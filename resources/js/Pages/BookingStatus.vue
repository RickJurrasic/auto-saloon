<script setup>
import { Head, Link } from '@inertiajs/vue3';
import MainLayout from '@/Layouts/MainLayout.vue';

defineOptions({ layout: MainLayout });

const props = defineProps({
    status: String, // 'success' or 'failed'
    message: String,
});
</script>

<template>
    <Head>
    <title>{{ status === 'success' ? 'Booking Successful | Autosaloon' : 'Booking Failed | Autosaloon' }}</title>
</Head>

    <div class="container mx-auto p-6 text-white flex items-center justify-center" style="min-height: 60vh;">
        <div class="bg-[#292929] golden-border shadow-lg rounded-lg p-8 md:p-12 text-center max-w-2xl">
            <div v-if="status === 'success'">
                <h1 class="text-4xl font-bold mb-4 golden font-playfair">Booking Confirmed!</h1>
                <p class="text-gray-300 text-lg mb-8">{{ message }} We look forward to seeing you.</p>
            </div>
            <div v-else>
                <h1 class="text-4xl font-bold mb-4 text-red-400 font-playfair">Booking Failed</h1>
                <p class="text-gray-300 text-lg mb-8">{{ message || 'An unexpected error occurred. Please try again or contact support.' }}</p>
            </div>

            <div class="flex justify-center gap-4">
                <Link
                    :href="route('bookings.index')"
                    class="inline-block border border-golden text-golden hover:bg-golden hover:text-black font-bold py-2 px-6 rounded transition-all duration-300"
                >
                    Manage Bookings
                </Link>
                <Link
                    :href="route('showroom.index')"
                    class="inline-block bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded transition-all duration-300"
                >
                    Back to Showroom
                </Link>
            </div>
        </div>
    </div>
</template>
