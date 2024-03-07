import { openBlock, createElementBlock, renderSlot, createBlock, resolveDynamicComponent, mergeProps, shallowReactive } from 'vue';
import UrlPattern from 'url-pattern';

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
  return (openBlock(), createElementBlock("a", {
    href: $props.to,
    onClick: _cache[0] || (_cache[0] = (...args) => ($options.navigate && $options.navigate(...args)))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 8 /* PROPS */, _hoisted_1))
}

script$1.render = render$1;
script$1.__file = "src/components/router-link.vue";

function render(_ctx, _cache) {
  return (openBlock(), createBlock(resolveDynamicComponent(_ctx.$route.component), mergeProps({
    key: _ctx.$route.key
  }, { ..._ctx.$route.params, ..._ctx.$route.props }), null, 16 /* FULL_PROPS */))
}

const script = {};


script.render = render;
script.__file = "src/components/router-view.vue";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        pattern: new UrlPattern(base + route.path, options),
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
        return params = route.pattern.match(location.pathname);
      });

      if (route === undefined) {
        throw new Error("no route matching the current path: ".concat(location.pathname));
      }

      var url_search_params = new URLSearchParams(location.search);
      var query = Object.fromEntries(url_search_params);
      var queries = {};

      var _iterator = _createForOfIteratorHelper(url_search_params),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _queries$key;

          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          (_queries$key = queries[key]) !== null && _queries$key !== void 0 ? _queries$key : queries[key] = [];
          queries[key].push(value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.route = _objectSpread(_objectSpread({}, route), {}, {
        params: params,
        query: query,
        queries: queries,
        hash: location.hash,
        key: this.route.key + 1
      });
    }
  }, {
    key: "push",
    value: function push(url) {
      if (url !== location.pathname + location.search + location.hash) {
        history.pushState({}, '', url);
      }

      this._match();
    }
  }, {
    key: "replace",
    value: function replace(url) {
      history.replaceState({}, '', url);

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

      var query_params = _objectSpread({}, params);

      var _iterator2 = _createForOfIteratorHelper(route.pattern.names),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _key = _step2.value;
          delete query_params[_key];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var url = route.pattern.stringify(params);

      if (Object.keys(query_params).length) {
        var url_search_params = new URLSearchParams();

        for (var _i2 = 0, _Object$entries = Object.entries(query_params); _i2 < _Object$entries.length; _i2++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

          if (Array.isArray(value)) {
            var _iterator3 = _createForOfIteratorHelper(value),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var v = _step3.value;
                url_search_params.append(key, v);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          } else {
            url_search_params.append(key, value);
          }
        }

        url += '?' + url_search_params;
      }

      return url;
    }
  }]);

  return Router;
}();

function createRouter(options) {
  var router = shallowReactive(new Router(options));

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

export { createRouter };
