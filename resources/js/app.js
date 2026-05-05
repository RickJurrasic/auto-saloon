import './bootstrap';
import { createSSRApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/index.js';
import MainLayout from './Layouts/MainLayout.vue';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
  resolve: async (name) => {
    const page = await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));
    page.default.layout = page.default.layout || MainLayout;
    return page;
  },
  setup({ el, App, props, plugin }) {
    const Ziggy = { ...props.initialPage.props.ziggy, location: new URL(props.initialPage.props.ziggy.url) };
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue, Ziggy) // Use the Ziggy from props
      .mount(el);
  },
});
