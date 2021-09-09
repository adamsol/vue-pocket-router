(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('url-pattern')) :
    typeof define === 'function' && define.amd ? define(['url-pattern'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VuePocketRouter = factory(global.UrlPattern));
}(this, (function (UrlPattern) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var UrlPattern__default = /*#__PURE__*/_interopDefaultLegacy(UrlPattern);

    //
    //
    //
    //
    //
    //
    //

    var script = {
        props: {
            to: { type: String, required: true },
        },
        methods: {
            navigate(event) {
                this.$router.push(this.to);
                event.preventDefault();
            },
        },
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
    /* server only */
    , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
      } // Vue.extend constructor export interop.


      var options = typeof script === 'function' ? script.options : script; // render functions

      if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true; // functional template

        if (isFunctionalTemplate) {
          options.functional = true;
        }
      } // scopedId


      if (scopeId) {
        options._scopeId = scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function hook(context) {
          // 2.3 injection
          context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (style) {
            style.call(this, createInjectorSSR(context));
          } // register component module identifier for async chunk inference


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (style) {
        hook = shadowMode ? function (context) {
          style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
        } : function (context) {
          style.call(this, createInjector(context));
        };
      }

      if (hook) {
        if (options.functional) {
          // register for functional component in vue file
          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return script;
    }

    /* script */
    const __vue_script__ = script;

    /* template */
    var __vue_render__$1 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "a",
        { attrs: { href: _vm.to }, on: { click: _vm.navigate } },
        [_vm._t("default")],
        2
      )
    };
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = undefined;
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        false,
        undefined,
        undefined,
        undefined
      );

    /* script */

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        _vm.$route.component,
        _vm._b(
          { key: _vm.$route.key, tag: "component" },
          "component",
          Object.assign({}, _vm.$route.params, _vm.$route.props),
          false
        )
      )
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = undefined;
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      const __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        {},
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

    var Router = /*#__PURE__*/function () {
      function Router(_ref) {
        var _this = this;

        var routes = _ref.routes,
            _ref$base = _ref.base,
            base = _ref$base === void 0 ? '' : _ref$base;

        _classCallCheck(this, Router);

        var options = {
          segmentNameCharset: 'a-zA-Z0-9_'
        }; // https://github.com/snd/url-pattern/issues/32

        this.routes = routes.map(function (route) {
          return _objectSpread({
            pattern: new UrlPattern__default['default'](base + route.path, options),
            meta: {}
          }, route);
        });
        this.route = {
          key: 0
        };

        this._match();

        window.addEventListener('popstate', function () {
          return _this._match();
        });
      }

      _createClass(Router, [{
        key: "_match",
        value: function _match() {
          var params;
          var route = this.routes.find(function (route) {
            return params = route.pattern.match(window.location.pathname);
          });

          if (route === undefined) {
            throw new Error("no route matching the current path: ".concat(window.location.pathname));
          }

          this.route = _objectSpread(_objectSpread({}, route), {}, {
            params: params,
            key: this.route.key + 1
          });
        }
      }, {
        key: "push",
        value: function push(path) {
          if (path !== window.location.pathname) {
            window.history.pushState({}, '', path);
          }

          this._match();
        }
      }, {
        key: "resolve",
        value: function resolve(name, params) {
          var route = this.routes.find(function (route) {
            return route.name === name;
          });

          if (route === undefined) {
            throw new Error("no route named \"".concat(name, "\""));
          }

          return route.pattern.stringify(params);
        }
      }]);

      return Router;
    }();

    Router.install = function (Vue) {
      var router;
      Vue.mixin({
        beforeCreate: function beforeCreate() {
          if (this.$options.router) {
            router = Vue.observable(this.$options.router);
          }
        },
        methods: {
          $url: function $url(name, params) {
            return router.resolve(name, params);
          }
        }
      });
      Object.defineProperties(Vue.prototype, {
        $router: {
          get: function get() {
            return router;
          }
        },
        $route: {
          get: function get() {
            return router.route;
          }
        }
      });
      Vue.component('router-link', __vue_component__$1);
      Vue.component('router-view', __vue_component__);
    };

    return Router;

})));
