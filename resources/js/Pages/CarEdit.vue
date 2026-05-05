<script setup>
import { useForm, router } from '@inertiajs/vue3';
import { computed } from 'vue';

const props = defineProps({
    car: Object,
    engineTypes: Array,
    transmissions: Array,
    bodyTypes: Array,
    errors: Object,
});

const form = useForm({
    _method: 'PUT',
    brand: props.car.brand,
    model: props.car.model,
    year: props.car.year,
    price: props.car.price,
    horsepower: props.car.horsepower,
    cardescription: props.car.cardescription,
    engine_type_id: props.car.engine_type_id,
    transmission_id: props.car.transmission_id,
    body_type_id: props.car.body_type_id,
    images: null,
});

const imageErrors = computed(() => {
  return Object.keys(props.errors)
    .filter(key => key.startsWith('images'))
    .map(key => props.errors[key]);
});

const submit = () => {
    router.post(route('cars.update', props.car.id), form, {
        forceFormData: true,
    });
};

const deleteImage = (imageId) => {
    if (confirm('Are you sure you want to delete this image?')) {
        router.delete(route('car-images.destroy', imageId), {
            preserveScroll: true,
        });
    }
};
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <main class="flex-1">
            <div class="container mx-auto py-8">
                <h2 class="text-5xl font-bold golden font-playfair py-5 my-10 text-center">Edit Car</h2>

                <form @submit.prevent="submit" class="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                    <!-- Brand and Model -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label for="brand" class="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                            <input type="text" id="brand" v-model="form.brand" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="props.errors.brand" class="text-red-500 text-sm mt-1">{{ props.errors.brand }}</div>
                        </div>
                        <div>
                            <label for="model" class="block text-sm font-medium text-gray-300 mb-2">Model</label>
                            <input type="text" id="model" v-model="form.model" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="props.errors.model" class="text-red-500 text-sm mt-1">{{ props.errors.model }}</div>
                        </div>
                    </div>

                    <!-- Year, Price, Horsepower -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label for="year" class="block text-sm font-medium text-gray-300 mb-2">Year</label>
                            <input type="number" id="year" v-model="form.year" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="props.errors.year" class="text-red-500 text-sm mt-1">{{ props.errors.year }}</div>
                        </div>
                        <div>
                            <label for="price" class="block text-sm font-medium text-gray-300 mb-2">Price ($)</label>
                            <input type="number" id="price" v-model="form.price" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="props.errors.price" class="text-red-500 text-sm mt-1">{{ props.errors.price }}</div>
                        </div>
                        <div>
                            <label for="horsepower" class="block text-sm font-medium text-gray-300 mb-2">Horsepower</label>
                            <input type="number" id="horsepower" v-model="form.horsepower" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                            <div v-if="props.errors.horsepower" class="text-red-500 text-sm mt-1">{{ props.errors.horsepower }}</div>
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
                            <div v-if="props.errors.engine_type_id" class="text-red-500 text-sm mt-1">{{ props.errors.engine_type_id }}</div>
                        </div>
                        <div>
                            <label for="transmission_id" class="block text-sm font-medium text-gray-300 mb-2">Transmission</label>
                            <select id="transmission_id" v-model="form.transmission_id" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                                <option :value="null">Select</option>
                                <option v-for="transmission in transmissions" :key="transmission.id" :value="transmission.id">{{ transmission.name }}</option>
                            </select>
                            <div v-if="props.errors.transmission_id" class="text-red-500 text-sm mt-1">{{ props.errors.transmission_id }}</div>
                        </div>
                        <div>
                            <label for="body_type_id" class="block text-sm font-medium text-gray-300 mb-2">Body Type</label>
                            <select id="body_type_id" v-model="form.body_type_id" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden">
                                <option :value="null">Select</option>
                                <option v-for="bodyType in bodyTypes" :key="bodyType.id" :value="bodyType.id">{{ bodyType.name }}</option>
                            </select>
                            <div v-if="props.errors.body_type_id" class="text-red-500 text-sm mt-1">{{ props.errors.body_type_id }}</div>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                        <label for="cardescription" class="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea id="cardescription" v-model="form.cardescription" rows="4" class="w-full bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:ring-golden focus:border-golden"></textarea>
                        <div v-if="props.errors.cardescription" class="text-red-500 text-sm mt-1">{{ props.errors.cardescription }}</div>
                    </div>

                    <!-- Current Images -->
                    <div class="mb-6">
                        <h3 class="text-lg font-medium text-gray-300 mb-2">Current Images</h3>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div v-for="image in car.images" :key="image.id" class="relative">
                                <img :src="`/storage/${image.image_path}`" class="rounded-lg w-full h-auto" alt="Car preview">
                                <button @click.prevent="deleteImage(image.id)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs">&times;</button>
                            </div>
                        </div>
                    </div>

                    <!-- Image Upload -->
                    <div class="mb-6">
                        <label for="images" class="block text-sm font-medium text-gray-300 mb-2">Add New Images</label>
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
                            Update Car
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>
