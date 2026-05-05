<script setup>
import { Head, Link, usePage, router } from '@inertiajs/vue3';
import MainLayout from '@/Layouts/MainLayout.vue';
import { computed } from 'vue';

defineOptions({ layout: MainLayout });

const props = defineProps({
  bookings: Array,
});

const page = usePage();
const user = computed(() => page.props.auth.user);
const isAdmin = computed(() => user.value && user.value.is_admin);

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Function to determine if a booking can be cancelled
const canCancelBooking = (booking) => {
    // Admins can delete any booking.
    if (isAdmin.value) {
        return true;
    }
    // A user can cancel/delete their own booking, regardless of status.
    return booking.user_id === user.value?.id;
};

const cancelBooking = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
        router.delete(route('bookings.destroy', bookingId), {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <Head title="My Bookings" />

    <div class="container mx-auto p-6 text-white">
        <!-- Flash Messages -->
        <div v-if="$page.props.flash.success" class="mb-6 p-4 bg-green-500/20 text-green-300 border border-green-500 rounded-lg text-center">
            {{ $page.props.flash.success }}
        </div>
        <div v-if="$page.props.flash.error" class="mb-6 p-4 bg-red-500/20 text-red-300 border border-red-500 rounded-lg text-center">
            {{ $page.props.flash.error }}
        </div>


        <h1 class="text-4xl font-bold mb-8 golden font-playfair text-center">
            {{ isAdmin ? 'All Bookings' : 'My Bookings' }}
        </h1>

        <div v-if="bookings.length === 0" class="bg-[#292929] golden-border shadow-md rounded-lg p-6 text-center">
            <p class="text-gray-300 text-lg">No bookings found.</p>
            <Link :href="route('showroom.index')" class="mt-4 inline-block border border-golden text-golden hover:bg-golden hover:text-black font-bold py-2 px-4 rounded transition-all duration-300">
                Browse Cars
            </Link>
        </div>

        <div v-else class="overflow-x-auto bg-[#292929] shadow-lg rounded-lg golden-border">
            <table class="min-w-full divide-y divide-gray-700">
                <thead class="bg-gray-800">
                    <tr>
                        <th class="px-6 py-3 text-center text-xs font-medium golden uppercase tracking-wider">Car</th>
                        <th v-if="isAdmin" class="px-6 py-3 text-center text-xs font-medium golden uppercase tracking-wider">Booked By</th>
                        <th class="px-6 py-3 text-center text-xs font-medium golden uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-center text-xs font-medium golden uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-center text-xs font-medium golden uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-center text-xs font-medium golden uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-700">
                    <tr v-for="booking in bookings" :key="booking.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-white">
                                {{ booking.car.brand }} {{ booking.car.model }}
                            </div>
                            <div class="text-sm text-gray-400">
                                {{ booking.car.year }}
                            </div>
                        </td>
                        <td v-if="isAdmin" class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-white">
                                {{ booking.user.name }}
                            </div>
                            <div class="text-sm text-gray-400">
                                {{ booking.user.email }}
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {{ formatDate(booking.test_drive_date) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            ${{ booking.amount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="{
                                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                                'bg-yellow-500/20 text-yellow-300 border border-yellow-500': booking.status === 'pending',
                                'bg-green-500/20 text-green-300 border border-green-500': booking.status === 'confirmed',
                                'bg-red-500/20 text-red-300 border border-red-500': booking.status === 'cancelled' || booking.status === 'failed' || booking.status === 'timeout',
                            }">
                                {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                                v-if="canCancelBooking(booking)"
                                @click="cancelBooking(booking.id)"
                                class="text-red-600 hover:text-red-900 ml-2"
                            >
                                Cancel
                            </button>
                            <span v-else class="text-gray-400">N/A</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
