(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('url-pattern')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'url-pattern'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VuePocketRouter = {}, global.Vue, global.UrlPattern));
})(this, (function (exports, vue, UrlPattern) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var UrlPattern__default = /*#__PURE__*/_interopDefaultLegacy(UrlPattern);

    var script$1 = {
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

    const _hoisted_1 = ["href"];

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("a", {
        href: $props.to,
        onClick: _cache[0] || (_cache[0] = (...args) => ($options.navigate && $options.navigate(...args)))
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 8 /* PROPS */, _hoisted_1))
    }

    script$1.render = render$1;
    script$1.__file = "src/components/router-link.vue";

    function render(_ctx, _cache) {
      return (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.$route.component), vue.mergeProps({
        key: _ctx.$route.key
      }, { ..._ctx.$route.params, ..._ctx.$route.props }), null, 16 /* FULL_PROPS */))
    }

    const script = {};


    script.render = render;
    script.__file = "src/components/router-view.vue";

    function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

    function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

    var Router = /*#__PURE__*/function () {
      function Router(_ref) {
        var routes = _ref.routes,
            _ref$base = _ref.base,
            base = _ref$base === void 0 ? '' : _ref$base;

        _classCallCheck(this, Router);

        var options = {
          segmentNameCharset: 'a-zA-Z0-9_'
        }; // https://github.com/snd/url-pattern/issues/32

        this.routes = routes.map(function (route) {
          return _objectSpread({
            pattern: new UrlPattern__default["default"](base + route.path, options),
            meta: {}
          }, route);
        });
      }

      _createClass(Router, [{
        key: "_init",
        value: function _init() {
          var _this = this;

          this.route = {
            key: 0
          };

          this._match(); // Note that because of how Vue's `reactive` works, we can't add an event listener in the constructor,
          // since `this` in the callback would refer to the original object without reactivity.
          // https://stackoverflow.com/questions/67894487/vue-3-reactivity-not-triggered-from-inside-a-class-instance


          window.addEventListener('popstate', function () {
            return _this._match();
          });
        }
      }, {
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

    function createRouter(options) {
      var router = vue.shallowReactive(new Router(options));

      router._init();

      router.install = function (app) {
        app.mixin({
          methods: {
            $url: function $url(name, params) {
              return router.resolve(name, params);
            }
          }
        });
        Object.defineProperties(app.config.globalProperties, {
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
        app.component('router-link', script$1);
        app.component('router-view', script);
      };

      return router;
    }

    exports.createRouter = createRouter;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
