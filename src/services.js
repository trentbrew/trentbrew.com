!(function () {
  "use strict";
  function e(e, t) {
    for (var r = 0; r < t.length; r++) {
      var i = t[r];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function t(e, r) {
    return (
      (t = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (e, t) {
            return (e.__proto__ = t), e;
          }),
      t(e, r)
    );
  }
  function r(e) {
    return (
      (r = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (e) {
            return e.__proto__ || Object.getPrototypeOf(e);
          }),
      r(e)
    );
  }
  function i() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {})
        ),
        !0
      );
    } catch (e) {
      return !1;
    }
  }
  function n(e) {
    return (
      (n =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
      n(e)
    );
  }
  function o(e, t) {
    if (t && ("object" === n(t) || "function" == typeof t)) return t;
    if (void 0 !== t)
      throw new TypeError(
        "Derived constructors may only return object or undefined"
      );
    return (function (e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    })(e);
  }
  function a() {
    return (
      (a = i()
        ? Reflect.construct.bind()
        : function (e, r, i) {
            var n = [null];
            n.push.apply(n, r);
            var o = new (Function.bind.apply(e, n))();
            return i && t(o, i.prototype), o;
          }),
      a.apply(null, arguments)
    );
  }
  function s(e) {
    var i = "function" == typeof Map ? new Map() : void 0;
    return (
      (s = function (e) {
        function n() {
          return a(e, arguments, r(this).constructor);
        }
        if (
          null === e ||
          ((o = e), -1 === Function.toString.call(o).indexOf("[native code]"))
        )
          return e;
        var o;
        if ("function" != typeof e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        if (void 0 !== i) {
          if (i.has(e)) return i.get(e);
          i.set(e, n);
        }
        return (
          (n.prototype = Object.create(e.prototype, {
            constructor: {
              value: n,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          t(n, e)
        );
      }),
      s(e)
    );
  }
  function c(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, i = new Array(t); r < t; r++) i[r] = e[r];
    return i;
  }
  function l(e, t) {
    return (
      (function (e) {
        if (Array.isArray(e)) return e;
      })(e) ||
      (function (e, t) {
        var r =
          null == e
            ? null
            : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
              e["@@iterator"];
        if (null != r) {
          var i,
            n,
            o = [],
            a = !0,
            s = !1;
          try {
            for (
              r = r.call(e);
              !(a = (i = r.next()).done) &&
              (o.push(i.value), !t || o.length !== t);
              a = !0
            );
          } catch (e) {
            (s = !0), (n = e);
          } finally {
            try {
              a || null == r.return || r.return();
            } finally {
              if (s) throw n;
            }
          }
          return o;
        }
      })(e, t) ||
      (function (e, t) {
        if (e) {
          if ("string" == typeof e) return c(e, t);
          var r = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === r && e.constructor && (r = e.constructor.name),
            "Map" === r || "Set" === r
              ? Array.from(e)
              : "Arguments" === r ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
              ? c(e, t)
              : void 0
          );
        }
      })(e, t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  var u,
    h = /^(http(s)?):\/\//,
    f = function (e) {
      if (
        !(function (e) {
          return h.test(e);
        })(e)
      )
        return null;
      var t;
      try {
        t = new URL(e);
      } catch (r) {
        (t = document.createElement("a")).href = e;
      }
      var r = t.protocol,
        i = t.host,
        n = t.pathname,
        o = t.hash,
        a = /:80$/,
        s = /:443$/;
      return (
        "http:" === r && a.test(i)
          ? (i = i.replace(a, ""))
          : "https:" === r && s.test(i) && (i = i.replace(s, "")),
        {
          host: i,
          protocol: r,
          origin: "".concat(r, "//").concat(i),
          pathname: n,
          hash: o,
        }
      );
    },
    p = f("https://payments.stripe.com"),
    m =
      (p && p.origin,
      function (e, t) {
        var r = f(e),
          i = f(t);
        return !(!r || !i) && r.origin === i.origin;
      }),
    d = function (e) {
      return m(e, "https://js.stripe.com/v3/");
    },
    y = "https://js.stripe.com/v3/",
    b =
      ((u = []),
      {
        addEventListener: function (e, t, r, i) {
          e.addEventListener(t, r, i), u.push([e, t, r, i]);
        },
        removeEventListener: function (e, t, r, i) {
          e.removeEventListener(t, r, i),
            (u = u.filter(function (n) {
              return (function (e, t) {
                var r = l(e, 4),
                  i = r[0],
                  n = r[1],
                  o = r[2],
                  a = r[3],
                  s = l(t, 4),
                  c = s[0],
                  u = s[1],
                  h = s[2],
                  f = s[3];
                return (
                  c !== i ||
                  u !== n ||
                  h !== o ||
                  (!0 === ("object" == typeof a && a ? a.capture : a)) !=
                    (!0 === ("object" == typeof f && f ? f.capture : f))
                );
              })([e, t, r, i], n);
            }));
        },
      }),
    g = b.addEventListener,
    v = b.removeEventListener,
    I = document.location.href,
    w = (function (n) {
      function a() {
        var e;
        return (
          ((e = p.call(this)).uniqueId = null),
          (e.initialRenderedHeightSet = !1),
          (e.frame = e.createIframeElement()),
          e.attachShadowDom(),
          e
        );
      }
      !(function (e, r) {
        if ("function" != typeof r && null !== r)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (e.prototype = Object.create(r && r.prototype, {
          constructor: { value: e, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          r && t(e, r);
      })(a, n);
      var s,
        c,
        l,
        u,
        h,
        p =
          ((s = a),
          (c = i()),
          function () {
            var e,
              t = r(s);
            if (c) {
              var i = r(this).constructor;
              e = Reflect.construct(t, arguments, i);
            } else e = t.apply(this, arguments);
            return o(this, e);
          });
      return (
        (l = a),
        (h = [
          {
            key: "observedAttributes",
            get: function () {
              return [
                "client-reference-id",
                "customer-session-client-secret",
                "customer-email",
                "pricing-table-id",
                "publishable-key",
                "__locale-override",
              ];
            },
          },
        ]),
        (u = [
          {
            key: "connectedCallback",
            value: function () {
              (this.pricingTableId =
                this.getAttribute("pricing-table-id") || void 0),
                (this.publishableApiKey =
                  this.getAttribute("publishable-key") || void 0),
                (this.clientReferenceId =
                  this.getAttribute("client-reference-id") || void 0),
                (this.clientSecret =
                  this.getAttribute("customer-session-client-secret") ||
                  void 0),
                (this.customerEmail =
                  this.getAttribute("customer-email") || void 0),
                (this.__localeOverride =
                  this.getAttribute("__locale-override") || void 0),
                (this.uniqueId = this.createUniqueId()),
                this.setIframeSrc(),
                this.addFrameLoadListener(),
                this.addPostMessageListener(),
                this.addPageShowListener();
            },
          },
          {
            key: "disconnectedCallback",
            value: function () {
              this.removeFrameLoadListener(),
                this.removePostMessageListener(),
                this.removePageShowListener();
            },
          },
          {
            key: "createUniqueId",
            value: function () {
              return Math.random().toString(16).slice(2);
            },
          },
          {
            key: "setIframeSrc",
            value: function () {
              var e = this.customerEmail
                  ? encodeURIComponent(this.customerEmail)
                  : void 0,
                t = "prctbl_id="
                  .concat(this.pricingTableId, "&pk=")
                  .concat(this.publishableApiKey, "&uuid=")
                  .concat(this.uniqueId, "&lo=")
                  .concat(this.__localeOverride, "&customerEmail=")
                  .concat(e),
                r = "";
              (r = "".concat(y, "pricing-table-app.html?").concat(t)),
                (this.frame.src = r);
            },
          },
          {
            key: "frameLoadListenerFunc",
            value: function () {
              this.messageIframe({ id: "merchantUrl", lastLocation: I }),
                this.clientReferenceId &&
                  this.messageIframe({
                    id: "clientReferenceId",
                    value: this.clientReferenceId,
                  }),
                this.clientSecret &&
                  this.messageIframe({
                    id: "clientSecret",
                    value: this.clientSecret,
                  }),
                this.customerEmail &&
                  this.messageIframe({
                    id: "customerEmail",
                    value: this.customerEmail,
                  });
            },
          },
          {
            key: "addFrameLoadListener",
            value: function () {
              (this.frameLoadListener = this.frameLoadListenerFunc.bind(this)),
                g(this.frame, "load", this.frameLoadListener, !1);
            },
          },
          {
            key: "removeFrameLoadListener",
            value: function () {
              v(this.frame, "load", this.frameLoadListener, !1);
            },
          },
          {
            key: "postMessageListenerFunc",
            value: function (e) {
              if (d(e.origin)) {
                var t = e.data;
                null !== t &&
                  "object" == typeof t &&
                  "iframeHeight" === t.id &&
                  t.uuid === this.uniqueId &&
                  "number" == typeof t.height &&
                  t.height &&
                  this.frame.height !== t.height &&
                  (this.frame.style.setProperty(
                    "height",
                    "".concat(t.height, "px"),
                    "important"
                  ),
                  this.initialRenderedHeightSet ||
                    (this.messageIframe({ id: "initialRenderedHeightSet" }),
                    (this.initialRenderedHeightSet = !0)));
              }
            },
          },
          {
            key: "addPostMessageListener",
            value: function () {
              (this.postMessageListener =
                this.postMessageListenerFunc.bind(this)),
                g(window, "message", this.postMessageListener, !1);
            },
          },
          {
            key: "removePostMessageListener",
            value: function () {
              v(window, "message", this.postMessageListener, !1);
            },
          },
          {
            key: "attachShadowDom",
            value: function () {
              this.attachShadow({ mode: "open" }).appendChild(this.frame);
            },
          },
          {
            key: "reInitializeIframeFunc",
            value: function () {
              this.messageIframe({ id: "merchantUrl", lastLocation: I }),
                this.messageIframe({ id: "initialRenderedHeightSet" });
            },
          },
          {
            key: "pageShowListenerFunc",
            value: function (e) {
              e.persisted &&
                (g(this.frame, "load", this.reInitializeIframe, !1),
                (this.frame.src = this.frame.src));
            },
          },
          {
            key: "addPageShowListener",
            value: function () {
              (this.pageShowListener = this.pageShowListenerFunc.bind(this)),
                (this.reInitializeIframe =
                  this.reInitializeIframeFunc.bind(this)),
                g(window, "pageshow", this.pageShowListener);
            },
          },
          {
            key: "removePageShowListener",
            value: function () {
              v(window, "pageshow", this.pageShowListener),
                v(this.frame, "load", this.reInitializeIframe, !1);
            },
          },
          {
            key: "createIframeElement",
            value: function () {
              var e = document.createElement("iframe");
              return (
                e.style.setProperty("display", "block", "important"),
                e.style.setProperty("margin", "0px", "important"),
                e.style.setProperty("padding", "0px", "important"),
                e.style.setProperty("userSelect", "none", "important"),
                e.style.setProperty("willChange", "transform", "important"),
                e.style.setProperty("border", "none", "important"),
                e.style.setProperty("margin", "0px", "important"),
                e.style.setProperty("width", "100%", "important"),
                e.style.setProperty("height", "380px", "important"),
                e.style.setProperty(
                  "transition",
                  "height 0.01s linear",
                  "important"
                ),
                e.setAttribute("scrolling", "no"),
                e
              );
            },
          },
          {
            key: "messageIframe",
            value: function (e) {
              var t,
                r = (t = f(y)) ? t.origin : null;
              if (!r)
                throw Error("stripe-pricing-table: target origin is null");
              this.frame.contentWindow &&
                this.frame.contentWindow.postMessage(e, r);
            },
          },
          {
            key: "reloadIframe",
            value: function () {
              (this.initialRenderedHeightSet = !1), this.setIframeSrc();
            },
          },
          {
            key: "attributeChangedCallback",
            value: function (e, t, r) {
              switch (e) {
                case "client-reference-id":
                  this.messageIframe({ id: "clientReferenceId", value: r }),
                    (this.clientReferenceId = r);
                  break;
                case "customer-session-client-secret":
                  this.messageIframe({ id: "clientSecret", value: r }),
                    (this.clientSecret = r);
                  break;
                case "customer-email":
                  this.messageIframe({ id: "customerEmail", value: r }),
                    (this.customerEmail = r);
                  break;
                case "pricing-table-id":
                  (this.pricingTableId = r), this.reloadIframe();
                  break;
                case "publishable-key":
                  (this.publishableApiKey = r), this.reloadIframe();
                  break;
                case "__locale-override":
                  (this.__localeOverride = r), this.reloadIframe();
              }
            },
          },
        ]) && e(l.prototype, u),
        h && e(l, h),
        Object.defineProperty(l, "prototype", { writable: !1 }),
        a
      );
    })(s(HTMLElement));
  void 0 === customElements.get("stripe-pricing-table") &&
    customElements.define("stripe-pricing-table", w);
})();
//# sourceMappingURL=https://js.stripe.com/v3/sourcemaps/pricing-table-09afebfcd2649d9ebeb9da0fa8f13a03.js.map
