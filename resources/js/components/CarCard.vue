<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div class="relative">
      <img
        :src="car.image_url || '/images/default-car.jpg'"
        :alt="`${car.brand} ${car.model}`"
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
        {{ car.price_per_day ?? car.price }} USD
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-lg font-bold text-gray-900">{{ car.brand }} {{ car.model }}</h3>
      <p class="text-gray-600 mt-1 line-clamp-2 text-sm">{{ car.description }}</p>

      <div class="mt-4 flex justify-between items-center border-t pt-3 border-gray-100">
        <span class="text-xs font-semibold uppercase tracking-wider text-gray-400">{{ car.category || 'Luxury' }}</span>

        <!-- Změna na button s emitem, aby to ladilo s tvým skriptem -->
        <button
          @click="bookCar(car.id)"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Book Test Ride
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Definice props, které ladí s tvým Car modelem
defineProps({
  car: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['book'])

const bookCar = (carId) => {
  emit('book', carId)
}
</script>
