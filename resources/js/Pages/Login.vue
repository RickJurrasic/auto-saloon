<script setup>
import { useForm } from '@inertiajs/vue3';

const form = useForm({
  email: '',
  password: '',
});

function handleLogin() {
    form.post('/login', {
        onFinish: () => form.reset('password'),
    });
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
    <main class="flex-1">
        <h1 class="font-playfair golden py-5 my-5">Login</h1>
        <div class="bg-[#292929] rounded-lg shadow p-6 w-full border min-h-50 py-5 my-5 flex flex-col justify-center align-center md:max-w-md mx-auto" style="border-color: #d4af37;">
            <div v-if="Object.keys(form.errors).length" class="mb-4 text-red-500">
                <ul>
                    <li v-for="(error, key) in form.errors" :key="key">{{ error }}</li>
                </ul>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="flex flex-col md:flex-row md:items-center md:justify-center gap-2 py-5 mx-5">
                    <label for="email" class="mb-1 md:mb-0 min-w-[100px]">Email:</label>
                    <input v-model="form.email" id="email" type="email" class="border-2 golden-border rounded px-4 py-2 w-full" />
                </div>
                <div class="flex flex-col md:flex-row md:items-center md:justify-center gap-2 py-5 mx-5">
                    <label for="password" class="mb-1 md:mb-0 min-w-[100px]">Password:</label>
                    <input v-model="form.password" id="password" type="password" class="border-2 golden-border rounded px-4 py-2 w-full" required />
                </div>
                <button type="submit" :disabled="form.processing" style="border-color: #d4af37;" class="scale-on-hover">Login</button>
            </form>
            <div class="mt-6 text-center text-sm text-gray-400">
                <p class="font-bold text-gray-200 underline">For demonstration purposes:</p>
                <div class="mt-2">
                    <p><strong>Admin:</strong> admin@example.com</p>
                    <p><strong>User:</strong> user@example.com</p>
                    <p><strong>Password:</strong> password</p>
                </div>
            </div>
        </div>
    </main>
    </div>
</template>
