
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
        const route = this.routes.find(route => params = route.pattern.match(location.pathname));
        if (route === undefined) {
            throw new Error(`no route matching the current path: ${location.pathname}`);
        }
        const url_search_params = new URLSearchParams(location.search);
        const query = Object.fromEntries(url_search_params);
        const queries = {};
        for (const [key, value] of url_search_params) {
            queries[key] ??= [];
            queries[key].push(value);
        }
        this.route = {
            ...route,
            params,
            query,
            queries,
            hash: location.hash,
            key: this.route.key + 1,
        };
    }

    push(url) {
        if (url !== location.pathname + location.search + location.hash) {
            history.pushState({}, '', url);
        }
        this._match();
    }

    replace(url) {
        history.replaceState({}, '', url);
        this._match();
    }

    resolve(name, params) {
        const route = this.routes.find(route => route.name === name);
        if (route === undefined) {
            throw new Error(`no route named "${name}"`);
        }
        const query_params = { ...params };
        for (const key of route.pattern.names) {
            delete query_params[key];
        }
        let url = route.pattern.stringify(params);
        if (Object.keys(query_params).length) {
            const url_search_params = new URLSearchParams();
            for (const [key, value] of Object.entries(query_params)) {
                if (Array.isArray(value)) {
                    for (const v of value) {
                        url_search_params.append(key, v);
                    }
                } else {
                    url_search_params.append(key, value);
                }
            }
            url += '?' + url_search_params;
        }
        return url;
    }
}
