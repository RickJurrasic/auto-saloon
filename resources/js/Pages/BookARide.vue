<script setup>
import { computed, watch } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';

const props = defineProps({
  cars: Array,
});

const user = computed(() => usePage().props.auth.user);

const form = useForm({
  // Pre-fill with user data if available, otherwise use empty strings
  name: user.value?.name ?? '',
  email: user.value?.email ?? '',
  phone: '',
  car_id: null,
  booking_date: '',
  price: 0, // Add price to the form
  message: '',
});

const flash = computed(() => usePage().props.flash);

const selectedCar = computed(() => {
  if (!form.car_id) return null;
  return props.cars.find(car => car.id === form.car_id);
});

// Update form price when selectedCar changes
watch(selectedCar, (newCar) => {
  form.price = newCar ? newCar.price : 0;
});

const submit = () => {
  form.post(route('bookings.store'), {
    // No need for onSuccess because a successful submission
    // will result in a full page redirect to GoPay.
    // onError will handle validation errors.
  });
};
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <main class="flex-1">
      <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-[#292929] border golden-border overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 md:p-10">
              <div v-if="flash && flash.error" class="mb-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
                <strong class="font-bold">Error! </strong>
                <span class="block sm:inline">{{ flash.error }}</span>
              </div>

              <h1 class="golden font-playfair text-4xl text-center mb-6">Book a Test Ride</h1>
              <form @submit.prevent="submit" class="space-y-6 font-playfair max-w-xl mx-auto">
                <!-- Name -->
                <div>
                  <label for="name" class="block golden text-lg">Full Name</label>
                  <input v-model="form.name" id="name" type="text" class="mt-1 block w-full bg-gray-700 border-gray-600 golden-border rounded-md shadow-sm focus:ring-golden focus:border-golden" :disabled="!!user" required>
                </div>

                <!-- Email & Phone -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="email" class="block golden text-lg">Email Address</label>
                    <input v-model="form.email" id="email" type="email" class="mt-1 block w-full bg-gray-700 border-gray-600 golden-border rounded-md shadow-sm focus:ring-golden focus:border-golden" :disabled="!!user" required>
                  </div>
                  <div>
                    <label for="phone" class="block golden text-lg">Phone Number</label>
                    <input v-model="form.phone" id="phone" type="tel" class="mt-1 block w-full bg-gray-700 border-gray-600 golden-border rounded-md shadow-sm focus:ring-golden focus:border-golden">
                  </div>
                </div>

                <!-- Car Selection & Date -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="car_id" class="block golden text-lg">Select a Car</label>
                    <select v-model="form.car_id" id="car_id" class="mt-1 block w-full bg-gray-700 border-gray-600 golden-border rounded-md shadow-sm focus:ring-golden focus:border-golden" required>
                      <option :value="null" disabled>-- Please choose a car --</option>
                      <option v-for="car in props.cars" :key="car.id" :value="car.id">{{ car.brand }} {{ car.model }}</option>
                    </select>
                  </div>
                  <div>
                    <label for="booking_date" class="block golden text-lg">Preferred Date</label>
                    <input v-model="form.booking_date" id="booking_date" type="date" class="mt-1 block w-full bg-gray-700 border-gray-600 golden-border rounded-md shadow-sm focus:ring-golden focus:border-golden" required>
                  </div>
                </div>

                <!-- Price Display -->
                <div v-if="selectedCar" class="text-center pt-4">
                    <p class="text-2xl">
                        <span class="golden">Booking Price: </span>
                        <span class="text-white font-bold">${{ new Intl.NumberFormat().format(selectedCar.price) }}</span>
                    </p>
                </div>

                <div class="flex items-center justify-center mt-8">
                  <button type="submit" :disabled="form.processing" class="bg-[#1f1b17] golden-border text-white font-bold py-3 px-8 rounded-lg shadow-lg scale-on-hover text-xl" :class="{ 'opacity-50 cursor-not-allowed': form.processing }">
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>
