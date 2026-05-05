<script setup>
import { computed } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';

const props = defineProps({
  cars: Array,
  bookings: Array,
});

const page = usePage();
const user = computed(() => page.props.auth.user);
const isAdmin = computed(() => user.value && user.value.is_admin);

</script>

<template>
    <div class="min-h-screen flex flex-col">
        <main class="flex-1">
            <div class="container mx-auto py-8">
                <h2 v-if="user" class="text-5xl font-bold golden font-playfair py-5 my-10">{{ user.name }}'s Dashboard</h2>

                <!-- Quick Stats -->
                <h3 class="text-3xl font-bold golden font-playfair mb-6" style="text-decoration: underline;">Quick Stats</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div class="bg-gray-600 p-6 rounded-lg shadow mx-5">
                        <p class="text-5xl golden font-extrabold text-gray-900 mt-2">{{ props.cars.length }}</p>
                        <h3 class="text-xl font-bold text-gray-800 golden font-playfair">Cars Listed</h3>
                    </div>
                    <div class="bg-gray-600 p-6 rounded-lg shadow mx-5">
                        <p class="text-5xl golden font-extrabold text-gray-900 mt-2">{{ props.bookings.length }}</p>
                        <h3 class="text-xl font-bold text-gray-800 golden font-playfair">{{ isAdmin ? 'Total Bookings' : 'Your Bookings' }}</h3>
                    </div>
                </div>

                <!-- Management Section -->
                <div class="mt-12">
                    <h3 class="text-3xl font-bold golden font-playfair mb-6" style="text-decoration: underline;">
                        {{ isAdmin ? 'Management Section' : 'Your Management Section' }}
                    </h3>
                    <div class="flex flex-wrap justify-center gap-6">
                        <div class="bg-gray-700 p-6 rounded-lg shadow hover:bg-gray-600 transition-colors w-full md:w-128 text-center">
                            <Link :href="route('cars.index')" class="text-xl font-bold text-white golden font-playfair">{{ isAdmin ? 'Manage Cars' : 'Manage Your Cars' }}</Link>
                        </div>
                        <div class="bg-gray-700 p-6 rounded-lg shadow hover:bg-gray-600 transition-colors w-full md:w-128 text-center">
                            <Link :href="route('bookings.index')" class="text-xl font-bold text-white golden font-playfair">{{ isAdmin ? 'Manage Bookings' : 'Manage Your Bookings' }}</Link>
                        </div>
                    </div>
                </div>

                <!-- User's Cars -->
                <div class="mt-12">
                    <h3 class="text-3xl font-bold golden font-playfair mb-6" style="text-decoration: underline;">{{ isAdmin ? 'All Cars' : 'Your Cars' }}</h3>
                    <div class="flex flex-wrap justify-center gap-6">
                        <div v-for="car in props.cars" :key="car.id" class="bg-gray-700 p-4 rounded-lg shadow w-full md:w-[48%] lg:w-[31%]">
                            <h4 class="text-xl font-bold text-white golden font-playfair">{{ car.brand }} {{ car.model }}</h4>
                            <p class="text-gray-300">Year: {{ car.year }}</p>
                            <p class="text-gray-300">Price: ${{ car.price }}</p>
                        </div>
                        <div v-if="props.cars.length === 0">
                            <p class="text-white">You have no cars listed.</p>
                        </div>
                    </div>
                </div>

                <!-- Bookings -->
                <div class="mt-12">
                    <h3 class="text-3xl font-bold golden font-playfair mb-6" style="text-decoration: underline;">{{ isAdmin ? 'All Bookings' : 'Your Bookings' }}</h3>
                    <div class="bg-gray-700 p-4 rounded-lg shadow">
                        <ul>
                            <li v-for="booking in props.bookings" :key="booking.id" class="border-b border-gray-600 py-2">
                                <p class="text-white"><span class="font-bold">Car:</span> {{ booking.car.brand }} {{ booking.car.model }}</p>
                                <p class="text-white"><span class="font-bold">Booked by:</span> {{ booking.name }}</p>
                                <p class="text-white"><span class="font-bold">Date:</span> {{ new Date(booking.test_drive_date).toLocaleDateString() }}</p>
                            </li>
                            <li v-if="props.bookings.length === 0">
                                <p class="text-white">{{ isAdmin ? 'There are no bookings.' : 'You have no bookings.' }}</p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </main>
    </div>
</template>
