vue-pocket-router
=================

[![License](https://img.shields.io/github/license/adamsol/vue-pocket-router.svg)](https://github.com/adamsol/vue-pocket-router/blob/master/LICENSE.txt)
[![CI](https://github.com/adamsol/vue-pocket-router/actions/workflows/ci.yml/badge.svg)](https://github.com/adamsol/vue-pocket-router/actions)
[![npm](https://img.shields.io/npm/v/vue-pocket-router.svg)](https://www.npmjs.com/package/vue-pocket-router)

A tiny router implementation for Vue.js 3.2+, which will reload the current view when an already active link is clicked
and will always recreate your components after navigation.

Why?
----

Despite a considerable interest of the community and strong arguments to support this behaviour,
`vue-router` ignores active links and has no configuration option for refreshing the view after clicking the same link again.
See https://github.com/vuejs/vue-router/issues/974 and related issues.

Also, `vue-router` does not recreate the view when new URL leads to the same component,
which results in lifecycle hooks not firing when they are expected.
See https://forum.vuejs.org/t/rerendering-component-on-route-param-change-recalling-created-hooks/9536.

This library can replace `vue-router` in simple cases to avoid hacking it.

Note that in `vue-router@4` there is an undocumented `force` parameter that can be used to change behaviour of a specific link,
but [it's not supported by the developers](https://github.com/vuejs/router/issues/1257#issuecomment-1048097494).

Installation
------------

```sh
npm install vue-pocket-router
```

```js
import { createRouter } from 'vue-pocket-router';

app.use(createRouter({
    // options
}));
```

Usage
-----

The basic API is very similar to `vue-router`'s, so pretty much everything from https://router.vuejs.org/guide/
and https://router.vuejs.org/guide/essentials/dynamic-matching.html applies.

Available options:
* `routes` (required) – array of objects with the following fields:
  * `path` (required)
  * `component` (required)
  * `name` (optional) – for reverse URL resolving
  * `props` (optional) – object with values of props to pass to the component
  * `meta` (optional) – any additional data to store with the route (empty object by default)
* `base` (optional) – base URL the application is hosted under, e.g. `'/app'` (note the lack of a trailing slash; empty string by default)

Some differences to `vue-router`:
* `vue-pocket-router` operates in HTML5 history mode only.
* Matched URL parameters will be automatically passed to components as props, so there is no need to add `props: true` in your routes.
  Parameters are still accessible as `$route.params`.
* Values of the `to` prop in `router-link` component and the argument of `$router.push(url)`/`$router.replace(url)` methods must be valid URL strings, not objects.
  Use `$router.resolve(name, params)` method, or its shorthand `$url(name, params)`, to obtain URL for a named route with given parameters.
  If `params` object contains additional keys other than the route's named segments, they will be appended as a query string.
* `vue-pocket-router` uses [`url-pattern`](https://github.com/snd/url-pattern) as the path matching library.
  See its documentation for how to build your route patterns.
* Navigation guards (among other features) are not implemented. You can use a `$route` watcher instead.

Examples
--------

See [test/components/Main.vue](https://github.com/adamsol/vue-pocket-router/blob/master/test/components/Main.vue)
and [test/index.js](https://github.com/adamsol/vue-pocket-router/blob/master/test/index.js).
