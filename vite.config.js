import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/style.css',
                'resources/js/app.js'
            ],
            refresh: true,
            ssr: 'resources/js/ssr.js',
        }),
        vue({
            template: {
                transformAssetUrls: {
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            'ziggy': path.resolve('vendor/tightenco/ziggy/dist/index.js'),
        },
    },
});
