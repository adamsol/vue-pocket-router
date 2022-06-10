
import { shallowReactive } from 'vue';

import RouterLink from './components/router-link.vue';
import RouterView from './components/router-view.vue';
import Router from './router';

export function createRouter(options) {
    const router = shallowReactive(new Router(options));

    router.install = function(app) {
        app.mixin({
            methods: {
                $url(name, params) {
                    return router.resolve(name, params);
                },
            },
        });

        Object.defineProperties(app.config.globalProperties, {
            $router: { get: () => router },
            $route: { get: () => router.route },
        });

        app.component('router-link', RouterLink);
        app.component('router-view', RouterView);
    };

    return router;
}
