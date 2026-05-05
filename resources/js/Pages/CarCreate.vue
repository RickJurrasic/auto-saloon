<script setup>
import { useForm } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    engineTypes: Array,
    transmissions: Array,
    bodyTypes: Array,
});

const form = useForm({
    brand: '',
    model: '',
    year: null,
    price: null,
    horsepower: null,
    cardescription: '',
    engine_type_id: null,
    transmission_id: null,
    body_type_id: null,
    images: null,
});

const imageErrors = computed(() => {
  return Object.keys(form.errors)
    .filter(key => key.startsWith('images'))
    .map(key => form.errors[key]);
});

const submit = () => {
    form.post(window.route('cars.store'));
};
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <main class="flex-1">
            <div class="container mx-auto py-8">
                <h2 class="text-5xl font-bold golden font-playfair py-5 my-10 text-center">Add a New Car</h2>

                <form @submit.prevent="submit" class="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                    <!-- Brand and Model -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label for="brand" class="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                            <input type="text" id="brand" v-model="form.brand" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="form.errors.brand" class="text-red-500 text-sm mt-1">{{ form.errors.brand }}</div>
                        </div>
                        <div>
                            <label for="model" class="block text-sm font-medium text-gray-300 mb-2">Model</label>
                            <input type="text" id="model" v-model="form.model" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="form.errors.model" class="text-red-500 text-sm mt-1">{{ form.errors.model }}</div>
                        </div>
                    </div>

                    <!-- Year, Price, Horsepower -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label for="year" class="block text-sm font-medium text-gray-300 mb-2">Year</label>
                            <input type="number" id="year" v-model="form.year" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="form.errors.year" class="text-red-500 text-sm mt-1">{{ form.errors.year }}</div>
                        </div>
                        <div>
                            <label for="price" class="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                            <input type="number" id="price" v-model="form.price" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="form.errors.price" class="text-red-500 text-sm mt-1">{{ form.errors.price }}</div>
                        </div>
                        <div>
                            <label for="horsepower" class="block text-sm font-medium text-gray-300 mb-2">Horsepower</label>
                            <input type="number" id="horsepower" v-model="form.horsepower" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="form.errors.horsepower" class="text-red-500 text-sm mt-1">{{ form.errors.horsepower }}</div>
                        </div>
                    </div>

                    <!-- Engine, Transmission, Body Type -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label for="engine_type_id" class="block text-sm font-medium text-gray-300 mb-2">Engine</label>
                            <select id="engine_type_id" v-model="form.engine_type_id" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                                <option :value="null">Select</option>
                                <option v-for="engine in engineTypes" :key="engine.id" :value="engine.id">{{ engine.name }}</option>
                            </select>
                            <div v-if="form.errors.engine_type_id" class="text-red-500 text-sm mt-1">{{ form.errors.engine_type_id }}</div>
                        </div>
                        <div>
                            <label for="transmission_id" class="block text-sm font-medium text-gray-300 mb-2">Transmission</label>
                            <select id="transmission_id" v-model="form.transmission_id" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                                <option :value="null">Select</option>
                                <option v-for="transmission in transmissions" :key="transmission.id" :value="transmission.id">{{ transmission.name }}</option>
                            </select>
                            <div v-if="form.errors.transmission_id" class="text-red-500 text-sm mt-1">{{ form.errors.transmission_id }}</div>
                        </div>
                        <div>
                            <label for="body_type_id" class="block text-sm font-medium text-gray-300 mb-2">Body Type</label>
                            <select id="body_type_id" v-model="form.body_type_id" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                                <option :value="null">Select</option>
                                <option v-for="bodyType in bodyTypes" :key="bodyType.id" :value="bodyType.id">{{ bodyType.name }}</option>
                            </select>
                            <div v-if="form.errors.body_type_id" class="text-red-500 text-sm mt-1">{{ form.errors.body_type_id }}</div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                        <label for="cardescription" class="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea id="cardescription" v-model="form.cardescription" rows="4" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden"></textarea>
                        <div v-if="form.errors.cardescription" class="text-red-500 text-sm mt-1">{{ form.errors.cardescription }}</div>
                    </div>

                    <!-- Image Upload -->
                    <div class="mb-6">
                        <label for="images" class="block text-sm font-medium text-gray-300 mb-2">Car Images</label>
                        <input type="file" multiple @input="form.images = $event.target.files" accept="image/*" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-golden file:text-gray-900"/>
                        <div v-if="imageErrors.length > 0" class="text-red-500 text-sm mt-1">
                            <div v-for="error in imageErrors" :key="error">{{ error }}</div>
                        </div>
                        <div v-if="form.images" class="mt-2 text-sm text-gray-400">
                            <ul class="list-disc pl-5">
                                <li v-for="image in form.images" :key="image.name">{{ image.name }}</li>
                            </ul>
                        </div>
                    </div>


                    <!-- Submit Button -->
                    <div class="text-right">
                        <button type="submit" :disabled="form.processing" class="transition-all duration-300 ease-in-out border border-golden text-golden hover:bg-golden font-bold py-2 px-6 rounded-lg">
                            Add Car
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>
