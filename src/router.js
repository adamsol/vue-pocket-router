
import UrlPattern from 'url-pattern';

export default class Router {
    constructor({ routes, base = '' }) {
        const options = { segmentNameCharset: 'a-zA-Z0-9_' };  // https://github.com/snd/url-pattern/issues/32

        this.routes = routes.map(route => ({
            pattern: new UrlPattern(base + route.path, options),
            meta: {},
            ...route,
        }));
    }

    _init() {
        this.route = { key: 0 };
        this._match();

        // Note that because of how Vue's `reactive` works, we can't add an event listener in the constructor,
        // since `this` in the callback would refer to the original object without reactivity.
        // https://stackoverflow.com/questions/67894487/vue-3-reactivity-not-triggered-from-inside-a-class-instance
        window.addEventListener('popstate', () => this._match());
    }

    _match() {
        let params;
        const route = this.routes.find(route => params = route.pattern.match(window.location.pathname));

        if (route === undefined) {
            throw new Error(`no route matching the current path: ${window.location.pathname}`);
        }
        this.route = { ...route, params, key: this.route.key + 1 };
    }

    push(path) {
        if (path !== window.location.pathname) {
            window.history.pushState({}, '', path);
        }
        this._match();
    }

    resolve(name, params) {
        const route = this.routes.find(route => route.name === name);

        if (route === undefined) {
            throw new Error(`no route named "${name}"`);
        }
        return route.pattern.stringify(params);
    }
}
