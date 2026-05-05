<script setup>
import { Link, router } from '@inertiajs/vue3';
import { ref, watchEffect } from 'vue';
import MainLayout from '@/Layouts/MainLayout.vue';

const props = defineProps({
  cars: Array,
  user: Object,
  flash: Object,
});

const show = ref(false);
const message = ref('');

watchEffect(() => {
  if (props.flash && props.flash.success) {
    message.value = props.flash.success;
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 3000);
  }
});

const confirmDelete = (carId) => {
  if (window.confirm('Are you sure you want to delete this car?')) {
    router.delete(`/cars/${carId}`);
  }
};

</script>

<template>
        <div class="container mx-auto py-8">
            <!-- Toast Notification -->
            <div v-if="show" class="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-xl shadow-lg z-50">
                {{ message }}
                <button @click="show = false" class="ml-4 text-white font-bold">X</button>
            </div>

            <h2 class="text-5xl font-bold golden font-playfair py-5 my-10">Car Management</h2>

            <div class="mb-8">
                <Link href="/cars/create" class="bg-golden text-white font-bold py-2 px-4 rounded hover:bg-golden-dark">
                    Add New Car
                </Link>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="car in props.cars" :key="car.id" class="bg-gray-700 p-4 rounded-lg shadow">
                    <h4 class="text-xl font-bold text-white golden font-playfair">{{ car.brand }} {{ car.model }}</h4>
                    <p class="text-gray-300">Year: {{ car.year }}</p>
                    <p class="text-gray-300">Engine Type: {{ car.engine_type?.name }}</p>
                    <p class="text-gray-300">Transmission: {{ car.transmission?.name }}</p>
                    <p class="text-gray-300">Body Type: {{ car.body_type?.name }}</p>
                    <p class="text-gray-300">Horsepower: {{ car.horsepower }} HP</p>
                    <p class="text-gray-300">Price: ${{ car.price.toLocaleString() }}</p>
                    <div class="mt-4">
                        <Link :href="`/cars/${car.id}/edit`" class="text-golden hover:underline mr-4">Edit</Link>
                        <button @click="confirmDelete(car.id)" class="text-red-500 hover:underline">Delete</button>
                    </div>
                </div>
                <div v-if="props.cars.length === 0">
                    <p class="text-white">You have no cars listed.</p>
                </div>
            </div>
        </div>
</template>
