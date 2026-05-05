import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h } from 'vue'
import MainLayout from './Layouts/MainLayout.vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/index.js';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createServer(page =>
  createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      const page = await resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));
      page.default.layout = page.default.layout || MainLayout;
      return page;
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h(App, props),
      })
        .use(plugin)
        .use(ZiggyVue, { ...page.props.ziggy, location: new URL(page.props.ziggy.url) });
    },
  }),
)
