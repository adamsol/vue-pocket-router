vue-pocket-router
=================

[![License](https://img.shields.io/github/license/adamsol/vue-pocket-router.svg)](https://github.com/adamsol/vue-pocket-router/blob/master/LICENSE.txt)
[![CI](https://github.com/adamsol/vue-pocket-router/actions/workflows/ci.yml/badge.svg)](https://github.com/adamsol/vue-pocket-router/actions)

A tiny router implementation for Vue.js 2.6, which will reload the current view when an already active link is clicked
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

Usage
-----

The basic API is very similar to `vue-router`'s, so pretty much everything from https://router.vuejs.org/guide/
and https://router.vuejs.org/guide/essentials/dynamic-matching.html applies.

Some differences to `vue-router`:
* `vue-pocket-router` operates in HTML5 history mode only.
* Matched URL parameters will be automatically passed to components as props, so there is no need to add `props: true` in your routes.
  Parameters are still accessible as `$route.params`.
* Values of the `to` prop in `router-link` component and the argument of `$router.push(location)` method must be valid URL paths, not objects.
  Use `$router.resolve(name, params)` method, or its shorthand `$url(name, params)`, to obtain URL for a named route with given parameters.
* `vue-pocket-router` uses [url-pattern](https://github.com/snd/url-pattern) as the path matching library
  (as opposed to [path-to-regexp](https://github.com/pillarjs/path-to-regexp) used by `vue-router`).
  See its documentation for how to build your route patterns.
* Query strings and hash fragments, as well as many other features, are currently not supported.

Examples
--------

See [test/components/Main.vue](https://github.com/adamsol/vue-pocket-router/blob/master/test/components/Main.vue)
and [test/index.js](https://github.com/adamsol/vue-pocket-router/blob/master/test/index.js).
