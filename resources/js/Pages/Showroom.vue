<script setup>
import CarCard from '../components/CarCard.vue';
import { ref, watch } from 'vue';
import { router, Link } from '@inertiajs/vue3';
import { debounce } from 'lodash';

const props = defineProps({
  cars: {
    type: Object, // Changed from Array to Object for paginator
    required: true,
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
});

const search = ref(props.filters.search);

// Watch for changes in the search input and trigger a new request
// debounce is used to avoid sending a request on every keystroke
watch(search, debounce((value) => {
  router.get('/showroom', { search: value }, {
    preserveState: true,
    replace: true,
  });
}, 300)); // 300ms debounce delay

</script>

<template>
  <div class="flex flex-col items-center justify-center py-12">
    <h1 class="text-4xl golden font-playfair mb-6">Showroom</h1>
    <p class="text-lg text-white mb-8">Browse our selection of luxury cars below.</p>

    <!-- Filter Bar -->
    <div class="mb-8 w-full max-w-5xl">
      <input
        v-model="search"
        type="text"
        placeholder="Search by brand or model..."
        class="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-golden"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
      <CarCard
        v-for="car in props.cars.data"
        :key="car.id"
        :brand="car.brand"
        :image="car.images.length
  ? (car.images[0].image_path.startsWith('http')
      ? car.images[0].image_path
      : `/storage/${car.images[0].image_path}`)
  : ''"
        :name="car.model"
        :detailsUrl="`/cars/${car.id}`"
      />
    </div>

    <!-- Empty State -->
    <div v-if="props.cars.data.length === 0" class="text-white text-center py-10">
        <p>No cars found matching your criteria.</p>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center space-x-4 text-white">
        <Link
            v-if="props.cars.prev_page_url"
            :href="props.cars.prev_page_url"
            class="px-4 py-2 rounded-md bg-gray-800 hover:bg-golden"
            preserve-scroll
        >Previous</Link>
        <Link
            v-if="props.cars.next_page_url"
            :href="props.cars.next_page_url"
            class="px-4 py-2 rounded-md bg-gray-800 hover:bg-golden"
            preserve-scroll
        >Next</Link>
    </div>
  </div>
</template>
