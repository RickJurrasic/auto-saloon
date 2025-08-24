<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div>
      <div class="text-xl font-medium text-black">Hello Tailwind!</div>
      <p class="text-gray-500">Your setup is working 🎉</p>
      <button @click="count++"
              class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Clicked {{ count }} times
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
