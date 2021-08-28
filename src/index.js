
import RouterLink from './components/router-link.vue';
import RouterView from './components/router-view.vue';
import Router from './router';

Router.install = function(Vue) {
    let router;

    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                router = Vue.observable(this.$options.router);
            }
        },
        methods: {
            $url(name, params) {
                return router.resolve(name, params);
            },
        },
    });

    Object.defineProperties(Vue.prototype, {
        $router: { get: () => router },
        $route: { get: () => router.route },
    });

    Vue.component('router-link', RouterLink);
    Vue.component('router-view', RouterView);
};

export default Router;
