import { Link, usePage, createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { useSSRContext, unref, mergeProps, withCtx, createTextVNode, computed, ref, toDisplayString, createSSRApp, h as h$1 } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main$3 = /* @__PURE__ */ Object.assign({
  inheritAttrs: false
}, {
  __name: "LogoutButton",
  __ssrInlineRender: true,
  props: {
    logoutRoute: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.logoutRoute,
        method: "post",
        as: "button"
      }, _ctx.$attrs, { class: "bg-transparent border-none p-0 w-full text-center golden font-playfair text-lg hover:bg-gray-700 md:text-2xl md:w-auto md:text-center" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Logout `);
          } else {
            return [
              createTextVNode(" Logout ")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/LogoutButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "NavBar",
  __ssrInlineRender: true,
  props: {
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const user = computed(() => page.props.auth.user);
    const showMobileDropdown = ref(false);
    const showUserDropdown = ref(false);
    const navLinks = [
      { name: "Home", href: "/" },
      { name: "Showroom", href: "/showroom" },
      { name: "About", href: "/about" },
      { name: "Book a Ride", href: "/book-a-ride" }
    ];
    const mobileNavLinks = computed(() => {
      const links = [...navLinks];
      links.push({ isDivider: true });
      if (!props.isLoggedIn) {
        links.push({ name: "Login", href: "/login" });
      } else {
        links.push({ name: user.value.name, isUsername: true });
        links.push({ name: "Dashboard", href: route("dashboard") });
        links.push({ name: "Logout", href: "/logout", isLogout: true });
      }
      return links;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "relative flex items-center justify-between py-2 px-4 bg-[#292929]" }, _attrs))}><div class="flex-1 flex items-center md:justify-start"><img src="/assets/logo.svg" alt="Logo" class="h-12 w-12 mx-auto md:h-10 md:w-10 md:mx-0"><div class="hidden md:flex flex-col ml-2"><span class="font-cinzel-decorative golden text-xl leading-tight">Luxury</span><span class="font-cinzel-decorative golden text-xl leading-tight">Cars</span></div></div><div class="flex-1 flex justify-center items-center"><div class="md:hidden flex flex-col items-center"><span class="font-cinzel-decorative golden text-2xl leading-tight">Luxury</span><span class="font-cinzel-decorative golden text-2xl leading-tight">Cars</span></div><div class="hidden md:flex w-full justify-between items-center space-x-6"><!--[-->`);
      ssrRenderList(navLinks, (link) => {
        _push(ssrRenderComponent(unref(Link), {
          key: link.name,
          href: link.href,
          class: "golden luxury-link font-playfair text-2xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="hidden md:flex flex-1 justify-end items-center relative">`);
      if (!__props.isLoggedIn) {
        _push(ssrRenderComponent(unref(Link), {
          href: "/login",
          class: "golden luxury-link font-playfair text-2xl"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div><button class="golden luxury-link font-playfair text-2xl flex items-center" id="userName"><span class="font-bold">${ssrInterpolate(user.value.name)}</span><svg class="ml-2 h-4 w-4 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>`);
        if (showUserDropdown.value) {
          _push(`<div class="absolute top-full right-0 mt-2 bg-[#292929] rounded border border-solid golden-border shadow-lg z-50 flex flex-col w-48">`);
          _push(ssrRenderComponent(unref(Link), { href: _ctx.route("dashboard"), class: "block golden font-playfair text-lg px-4 py-2 hover:bg-gray-700" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Dashboard`);
              } else {
                return [createTextVNode("Dashboard")];
              }
            }), _: 1
          }, _parent));
          _push(`<hr class="golden-border">`);
          _push(ssrRenderComponent(_sfc_main$3, {
            "logout-route": "/logout",
            class: "px-4 py-2"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div><div class="flex-1 flex justify-end items-center md:hidden relative"><button class="p-2 rounded border golden-border focus:outline-none"><span class="text-4xl golden">☰</span></button>`);
      if (showMobileDropdown.value) {
        _push(`<div class="absolute top-full right-0 mt-2 bg-[#292929] border golden-border rounded shadow-lg z-50 flex flex-col w-40"><!--[-->`);
        ssrRenderList(mobileNavLinks.value, (link, index) => {
          _push(`<!--[-->`);
          if (link.isDivider) {
            _push(`<hr class="golden-border">`);
          } else if (link.isUsername) {
            _push(`<span class="block golden underline font-playfair text-lg px-4 pt-2 pb-1 text-center font-bold">${ssrInterpolate(link.name)}</span>`);
          } else if (link.isLogout) {
            _push(ssrRenderComponent(_sfc_main$3, {
              "logout-route": "/logout",
              class: "px-4 py-2 text-center"
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(Link), {
              href: link.href,
              class: "block text-bold golden font-playfair text-lg px-4 py-2"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(link.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(link.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavBar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-around py-5 bg-[#292929]" }, _attrs))}><div class="flex-1 flex justify-center items-center"></div><div class="flex-1 flex justify-around items-center font-cinzel-decorative"><img src="/assets/facebook.svg" alt="Facebook" class="h-6 w-6"><img src="/assets/tiktok.svg" alt="TikTok" class="h-6 w-6"><img src="/assets/instagram.svg" alt="Instagram" class="h-6 w-6"></div><div class="flex-1 flex justify-center items-center golden"><p class="text-md md:text-xl lg:text-2xl font-cinzel-decorative">Erik Sternad <br> © 2025</p></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = {
  __name: "MainLayout",
  __ssrInlineRender: true,
  props: {
    auth: {
      type: Object,
      default: () => ({ user: null, isLoggedIn: false })
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-[#1f1b17]" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "is-logged-in": __props.auth.isLoggedIn
      }, null, _parent));
      _push(`<main class="flex-1 flex flex-col">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/MainLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function t() {
  return t = Object.assign ? Object.assign.bind() : function (t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = {
  default: n, formatters: {
    RFC1738: function (t4) {
      return e.call(t4, r, "+");
    }, RFC3986: function (t4) {
      return String(t4);
    }
  }, RFC1738: "RFC1738"
}, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = (function () {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
})(), s = function (t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = {
  arrayToObject: s, assign: function (t4, e2) {
    return Object.keys(e2).reduce(function (t5, r2) {
      return t5[r2] = e2[r2], t5;
    }, t4);
  }, combine: function (t4, e2) {
    return [].concat(t4, e2);
  }, compact: function (t4) {
    for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
      var f2 = a2[s2], c2 = i2[f2];
      "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
    }
    return (function (t5) {
      for (; t5.length > 1;) {
        var e3 = t5.pop(), r3 = e3.obj[e3.prop];
        if (u(r3)) {
          for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
          e3.obj[e3.prop] = n3;
        }
      }
    })(e2), t4;
  }, decode: function (t4, e2, r2) {
    var n2 = t4.replace(/\+/g, " ");
    if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
      return decodeURIComponent(n2);
    } catch (t5) {
      return n2;
    }
  }, encode: function (t4, e2, r2, n2, i2) {
    if (0 === t4.length) return t4;
    var u2 = t4;
    if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function (t5) {
      return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
    });
    for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
      var c2 = u2.charCodeAt(f2);
      45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
    }
    return s2;
  }, isBuffer: function (t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  }, isRegExp: function (t4) {
    return "[object RegExp]" === Object.prototype.toString.call(t4);
  }, maybeMap: function (t4, e2) {
    if (u(t4)) {
      for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
      return r2;
    }
    return e2(t4);
  }, merge: function t2(e2, r2, n2) {
    if (!r2) return e2;
    if ("object" != typeof r2) {
      if (u(e2)) e2.push(r2);
      else {
        if (!e2 || "object" != typeof e2) return [e2, r2];
        (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
      }
      return e2;
    }
    if (!e2 || "object" != typeof e2) return [e2].concat(r2);
    var o2 = e2;
    return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function (r3, o3) {
      if (i.call(e2, o3)) {
        var u2 = e2[o3];
        u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
      } else e2[o3] = r3;
    }), e2) : Object.keys(r2).reduce(function (e3, o3) {
      var u2 = r2[o3];
      return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
    }, o2);
  }
}, c = Object.prototype.hasOwnProperty, l = {
  brackets: function (t4) {
    return t4 + "[]";
  }, comma: "comma", indices: function (t4, e2) {
    return t4 + "[" + e2 + "]";
  }, repeat: function (t4) {
    return t4;
  }
}, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function (t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = {
  addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function (t4) {
    return g.call(t4);
  }, skipNulls: false, strictNullHandling: false
}, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function (t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function (t4) {
  return t4.replace(/&#(\d+);/g, function (t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function (t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function (t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth;) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), (function (t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    })(s2, e2, r2, n2);
  }
}, S = function (t4, e2) {
  var r2 = /* @__PURE__ */ (function (t5) {
    return $;
  })();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? (function (t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function (t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  })(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + (function (t4, e3) {
      var r2, n2 = t4, i2 = (function (t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      })(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    })(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = {
  install(t4, e2) {
    const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
    parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
  }
};
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: async (name) => {
      const page2 = await resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/About.vue": () => import("./assets/About-DfccIV58.js"), "./Pages/BookARide.vue": () => import("./assets/BookARide-BGNUmE5_.js"), "./Pages/BookingFailed.vue": () => import("./assets/BookingFailed-DftMUfWq.js"), "./Pages/BookingManagement.vue": () => import("./assets/BookingManagement-CYpIQRh7.js"), "./Pages/BookingStatus.vue": () => import("./assets/BookingStatus-C06zLTjX.js"), "./Pages/BookingSuccess.vue": () => import("./assets/BookingSuccess-Baj_gjKu.js"), "./Pages/CarCreate.vue": () => import("./assets/CarCreate-BLJIMXB4.js"), "./Pages/CarDetail.vue": () => import("./assets/CarDetail-xM0ErNaz.js"), "./Pages/CarEdit.vue": () => import("./assets/CarEdit-Crr7y48E.js"), "./Pages/CarManagement.vue": () => import("./assets/CarManagement-HuXGE6ux.js"), "./Pages/Dashboard.vue": () => import("./assets/Dashboard-8es7Z6rL.js"), "./Pages/Home.vue": () => import("./assets/Home-Da9Ee19D.js"), "./Pages/Login.vue": () => import("./assets/Login-t94E-7ZM.js"), "./Pages/Showroom.vue": () => import("./assets/Showroom-BhIFFF8K.js") }));
      page2.default.layout = page2.default.layout || _sfc_main;
      return page2;
    },
    setup({ App, props, plugin }) {
      return createSSRApp({
        render: () => h$1(App, props)
      }).use(plugin).use(k, { ...page.props.ziggy, location: new URL(page.props.ziggy.url) });
    }
  })
);
export {
  _export_sfc as _,
  _sfc_main as a
};
