import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/style.css',
                'resources/js/app.js'
            ],
            refresh: true,
        }),
        vue(),
    ],
});
