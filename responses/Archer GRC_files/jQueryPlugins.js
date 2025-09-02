void 0 === $telerik.$ && ($telerik.$ = jQuery),
  /*!
   * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
   *
   * TERMS OF USE - jQuery Easing
   *
   * Open source under the BSD License.
   *
   * Copyright © 2008 George McGinley Smith
   * All rights reserved.
   */
  /*!
   * TERMS OF USE - EASING EQUATIONS
   *
   * Open source under the BSD License.
   *
   * Copyright © 2001 Robert Penner
   * All rights reserved.
   */ (function (e) {
    (e.easing.jswing = e.easing.swing),
      e.extend(e.easing, {
        def: "easeOutQuad",
        swing: function (n, t, o, u, r) {
          return e.easing[e.easing.def](n, t, o, u, r);
        },
        easeLinear: function (e, n, t, o, u) {
          return (o * n) / u + t;
        },
        easeInQuad: function (e, n, t, o, u) {
          return o * (n /= u) * n + t;
        },
        easeOutQuad: function (e, n, t, o, u) {
          return -o * (n /= u) * (n - 2) + t;
        },
        easeInOutQuad: function (e, n, t, o, u) {
          return (n /= u / 2) < 1
            ? (o / 2) * n * n + t
            : (-o / 2) * (--n * (n - 2) - 1) + t;
        },
        easeInCubic: function (e, n, t, o, u) {
          return o * (n /= u) * n * n + t;
        },
        easeOutCubic: function (e, n, t, o, u) {
          return o * ((n = n / u - 1) * n * n + 1) + t;
        },
        easeInOutCubic: function (e, n, t, o, u) {
          return (n /= u / 2) < 1
            ? (o / 2) * n * n * n + t
            : (o / 2) * ((n -= 2) * n * n + 2) + t;
        },
        easeInQuart: function (e, n, t, o, u) {
          return o * (n /= u) * n * n * n + t;
        },
        easeOutQuart: function (e, n, t, o, u) {
          return -o * ((n = n / u - 1) * n * n * n - 1) + t;
        },
        easeInOutQuart: function (e, n, t, o, u) {
          return (n /= u / 2) < 1
            ? (o / 2) * n * n * n * n + t
            : (-o / 2) * ((n -= 2) * n * n * n - 2) + t;
        },
        easeInQuint: function (e, n, t, o, u) {
          return o * (n /= u) * n * n * n * n + t;
        },
        easeOutQuint: function (e, n, t, o, u) {
          return o * ((n = n / u - 1) * n * n * n * n + 1) + t;
        },
        easeInOutQuint: function (e, n, t, o, u) {
          return (n /= u / 2) < 1
            ? (o / 2) * n * n * n * n * n + t
            : (o / 2) * ((n -= 2) * n * n * n * n + 2) + t;
        },
        easeInSine: function (e, n, t, o, u) {
          return -o * Math.cos((n / u) * (Math.PI / 2)) + o + t;
        },
        easeOutSine: function (e, n, t, o, u) {
          return o * Math.sin((n / u) * (Math.PI / 2)) + t;
        },
        easeInOutSine: function (e, n, t, o, u) {
          return (-o / 2) * (Math.cos((Math.PI * n) / u) - 1) + t;
        },
        easeInExpo: function (e, n, t, o, u) {
          return 0 == n ? t : o * Math.pow(2, 10 * (n / u - 1)) + t;
        },
        easeOutExpo: function (e, n, t, o, u) {
          return n == u ? t + o : o * (1 - Math.pow(2, (-10 * n) / u)) + t;
        },
        easeInOutExpo: function (e, n, t, o, u) {
          return 0 == n
            ? t
            : n == u
              ? t + o
              : (n /= u / 2) < 1
                ? (o / 2) * Math.pow(2, 10 * (n - 1)) + t
                : (o / 2) * (2 - Math.pow(2, -10 * --n)) + t;
        },
        easeInCirc: function (e, n, t, o, u) {
          return -o * (Math.sqrt(1 - (n /= u) * n) - 1) + t;
        },
        easeOutCirc: function (e, n, t, o, u) {
          return o * Math.sqrt(1 - (n = n / u - 1) * n) + t;
        },
        easeInOutCirc: function (e, n, t, o, u) {
          return (n /= u / 2) < 1
            ? (-o / 2) * (Math.sqrt(1 - n * n) - 1) + t
            : (o / 2) * (Math.sqrt(1 - (n -= 2) * n) + 1) + t;
        },
        easeInElastic: function (e, n, t, o, u) {
          var r = 1.70158,
            i = 0,
            a = o;
          if (0 == n) return t;
          if (1 == (n /= u)) return t + o;
          if ((i || (i = 0.3 * u), a < Math.abs(o))) {
            a = o;
            r = i / 4;
          } else r = (i / (2 * Math.PI)) * Math.asin(o / a);
          return (
            -a *
              Math.pow(2, 10 * (n -= 1)) *
              Math.sin(((n * u - r) * (2 * Math.PI)) / i) +
            t
          );
        },
        easeOutElastic: function (e, n, t, o, u) {
          var r = 1.70158,
            i = 0,
            a = o;
          if (0 == n) return t;
          if (1 == (n /= u)) return t + o;
          if ((i || (i = 0.3 * u), a < Math.abs(o))) {
            a = o;
            r = i / 4;
          } else r = (i / (2 * Math.PI)) * Math.asin(o / a);
          return (
            a *
              Math.pow(2, -10 * n) *
              Math.sin(((n * u - r) * (2 * Math.PI)) / i) +
            o +
            t
          );
        },
        easeInOutElastic: function (e, n, t, o, u) {
          var r = 1.70158,
            i = 0,
            a = o;
          if (0 == n) return t;
          if (2 == (n /= u / 2)) return t + o;
          if ((i || (i = u * (0.3 * 1.5)), a < Math.abs(o))) {
            a = o;
            r = i / 4;
          } else r = (i / (2 * Math.PI)) * Math.asin(o / a);
          return n < 1
            ? a *
                Math.pow(2, 10 * (n -= 1)) *
                Math.sin(((n * u - r) * (2 * Math.PI)) / i) *
                -0.5 +
                t
            : a *
                Math.pow(2, -10 * (n -= 1)) *
                Math.sin(((n * u - r) * (2 * Math.PI)) / i) *
                0.5 +
                o +
                t;
        },
        easeInBack: function (e, n, t, o, u, r) {
          return (
            null == r && (r = 1.70158), o * (n /= u) * n * ((r + 1) * n - r) + t
          );
        },
        easeOutBack: function (e, n, t, o, u, r) {
          return (
            null == r && (r = 1.70158),
            o * ((n = n / u - 1) * n * ((r + 1) * n + r) + 1) + t
          );
        },
        easeInOutBack: function (e, n, t, o, u, r) {
          return (
            null == r && (r = 1.70158),
            (n /= u / 2) < 1
              ? (o / 2) * (n * n * ((1 + (r *= 1.525)) * n - r)) + t
              : (o / 2) * ((n -= 2) * n * ((1 + (r *= 1.525)) * n + r) + 2) + t
          );
        },
        easeInBounce: function (n, t, o, u, r) {
          return u - e.easing.easeOutBounce(n, r - t, 0, u, r) + o;
        },
        easeOutBounce: function (e, n, t, o, u) {
          return (n /= u) < 1 / 2.75
            ? o * (7.5625 * n * n) + t
            : n < 2 / 2.75
              ? o * (7.5625 * (n -= 1.5 / 2.75) * n + 0.75) + t
              : n < 2.5 / 2.75
                ? o * (7.5625 * (n -= 2.25 / 2.75) * n + 0.9375) + t
                : o * (7.5625 * (n -= 2.625 / 2.75) * n + 0.984375) + t;
        },
        easeInOutBounce: function (n, t, o, u, r) {
          return t < r / 2
            ? 0.5 * e.easing.easeInBounce(n, 2 * t, 0, u, r) + o
            : 0.5 * e.easing.easeOutBounce(n, 2 * t - r, 0, u, r) + 0.5 * u + o;
        },
      });
  })($telerik.$),
  /*!
   * jQuery throttle / debounce - v1.1 - 3/7/2010
   * http://benalman.com/projects/jquery-throttle-debounce-plugin/
   *
   * Copyright (c) 2010 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   */
  (function (e, n) {
    var t,
      o = $telerik.$ || e.Cowboy || (e.Cowboy = {});
    (o.throttle = t =
      function (e, t, u, r) {
        var i,
          a = 0;
        function c() {
          var o = this,
            c = +new Date() - a,
            s = arguments;
          function f() {
            (a = +new Date()), u.apply(o, s);
          }
          r && !i && f(),
            i && clearTimeout(i),
            r === n && c > e
              ? f()
              : !0 !== t &&
                (i = setTimeout(
                  r
                    ? function () {
                        i = n;
                      }
                    : f,
                  r === n ? e - c : e,
                ));
        }
        return (
          "boolean" != typeof t && ((r = u), (u = t), (t = n)),
          o.guid && (c.guid = u.guid = u.guid || o.guid++),
          c
        );
      }),
      (o.debounce = function (e, o, u) {
        return u === n ? t(e, o, !1) : t(e, u, !1 !== o);
      });
  })(window),
  (function (e) {
    function n(n, t) {
      return (
        e.each(t, function (e, t) {
          var o;
          e.indexOf("et_") > 0
            ? (n[e] = t)
            : (n["get_" + e] =
                "domEvent" == e && t
                  ? function () {
                      return new Sys.UI.DomEvent(
                        t.originalEvent || t.rawEvent || t,
                      );
                    }
                  : ((o = t),
                    function () {
                      return o;
                    }));
        }),
        n
      );
    }
    var t;
    ((e.fx.step.height = function (e) {
      var n = $telerik.quirksMode ? 1 : 0,
        t = e.now > n ? e.now : n;
      e.elem.style[e.prop] = Math.round(t) + e.unit;
    }),
    e.extend({
      registerControlEvents: function (n, t) {
        e.each(t, function (e, t) {
          (n.prototype["add_" + t] = function (e) {
            this.get_events().addHandler(t, e);
          }),
            (n.prototype["remove_" + t] = function (e) {
              this.get_events().removeHandler(t, e);
            });
        });
      },
      registerKendoWidgetEvents: function (n, t) {
        e.each(t, function (e, t) {
          (n.prototype["add_" + t] = function (e) {
            this.kendoWidget.bind(t, e);
          }),
            (n.prototype["remove_" + t] = function (e) {
              this.kendoWidget.unbind(t, e);
            });
        });
      },
      registerControlProperties: function (n, t) {
        e.each(t, function (e, t) {
          (n.prototype["get_" + e] = function () {
            var n = this["_" + e];
            return void 0 === n ? t : n;
          }),
            (n.prototype["set_" + e] = function (n) {
              this["_" + e] = n;
            });
        });
      },
      extendControlProperties: function (n, t, o) {
        e.each(t, function (e, t) {
          var u = n.prototype,
            r = "_" + e,
            i = "get" + r,
            a = "set" + r;
          u[i] ||
            (u[i] = function () {
              var e = this[r];
              return e === o ? t : e;
            }),
            u[a] ||
              (u[a] = function (e) {
                this[r] = e;
              });
        });
      },
      registerEnum: function (e, n, t, o) {
        (o = o || !1),
          (e[n] = function () {}),
          (e[n].prototype = t),
          e[n].registerEnum(e.getName() + "." + n, o);
      },
      raiseControlEvent: function (e, t, o) {
        var u = e.get_events().getHandler(t);
        u && u(e, n(new Sys.EventArgs(), o));
      },
      raiseCancellableControlEvent: function (e, t, o) {
        var u = e.get_events().getHandler(t);
        if (u) {
          var r = n(new Sys.CancelEventArgs(), o);
          return u(e, r), r.get_cancel();
        }
        return !1;
      },
      extendEventArgs: function (e, t) {
        return n(e, t);
      },
      isBogus: function (e) {
        try {
          e.parentNode;
          return !1;
        } catch (e) {
          return !0;
        }
      },
    }),
    (e.eachCallback = function (e, n) {
      var t = 0;
      setTimeout(function o() {
        if (0 != e.length) {
          var u = e[t];
          n.apply(u), ++t < e.length && setTimeout(o, 1);
        }
      }, 1);
    }),
    (e.fn.eachCallback = function (e) {
      var n = 0,
        t = this;
      setTimeout(function o() {
        if (0 != t.length) {
          var u = t.get(n);
          e.apply(u), ++n < t.length && setTimeout(o, 1);
        }
      }, 1);
    }),
    $telerik.isTouchDevice) &&
      (e.each(["t_touchover", "t_touchout"], function (n, t) {
        e.fn[t] = function (e) {
          return this.bind(t, e);
        };
      }),
      e(document.body)
        .bind("touchstart", function (e) {
          t = e.originalEvent.currentTarget;
        })
        .bind("touchmove", function (n) {
          var o = n.originalEvent.changedTouches[0],
            u = document.elementFromPoint(o.clientX, o.clientY);
          if (t != u) {
            var r = {
              target: t,
              relatedTarget: t,
              CtrlKey: !1,
              AltKey: !1,
              ShiftKey: !1,
            };
            e(t).trigger("t_touchout", r),
              e((t = u)).trigger(
                "t_touchover",
                e.extend(r, { target: t, relatedTarget: t }),
              );
          }
        }));
  })($telerik.$),
  /*!
   * jQuery Double Tap Plugin.
   *
   * Copyright (c) 2010 Raul Sanchez (http://www.appcropolis.com)
   *
   * Dual licensed under the MIT and GPL licenses:
   * http://www.opensource.org/licenses/mit-license.php
   * http://www.gnu.org/licenses/gpl.html
   */
  (function (e) {
    e.fn.doubletap = function (n, t, o) {
      var u, r;
      (o = null == o ? 500 : o),
        (u = $telerik.isTouchDevice ? "touchend" : "click"),
        e(this).bind(u, function (u) {
          var i = new Date().getTime(),
            a = i - (e(this).data("lastTouch") || i + 1);
          clearTimeout(r),
            a < 500 && a > 0
              ? null != n && "function" == typeof n && n(u)
              : (e(this).data("lastTouch", i),
                (r = setTimeout(
                  function (e) {
                    null != t && "function" == typeof t && t(e),
                      clearTimeout(r);
                  },
                  o,
                  [u],
                ))),
            e(this).data("lastTouch", i);
        });
    };
  })($telerik.$),
  (function (e) {
    e.observable = function (n) {
      var t = {};
      e.extend(n, {
        trigger: function (e) {
          var n = t[e];
          if (n)
            for (var o = 0; o < n.length; o++) {
              var u = Array.prototype.slice.call(arguments);
              u.shift(), n[o].handler.apply(n[o].context, u);
            }
        },
        on: function (n, o) {
          e.each(n, function (e, n) {
            !(function (e, n, o) {
              var u = t[e] || [];
              u.push({ handler: n, context: o }), (t[e] = u);
            })(e, n, o);
          });
        },
        off: function (n, o) {
          e.each(n, function (e, n) {
            !(function (e, n, o) {
              var u = t[e];
              if (!u) return;
              for (var r = -1, i = 0; i < u.length; i++) {
                var a = u[i];
                if (a.func === n && a.context === o) {
                  r = i;
                  break;
                }
              }
              r > -1 && (u = u.splice(r, 1));
              t[e] = u;
            })(e, n, o);
          });
        },
        disposeObservable: function () {
          for (var e in t) delete t[e];
          t = null;
        },
      });
    };
  })($telerik.$),
  (function (e) {
    var n,
      t,
      o,
      u,
      r,
      i,
      a,
      c = window,
      s = c.document,
      f = c.$telerik,
      l = c.setTimeout,
      v = c.clearTimeout,
      h = Telerik.Web.UI,
      p = e.fn,
      d = e.isNumeric,
      g = [].splice,
      m = [].slice,
      E = ".telerik",
      M = ".",
      w = " ",
      b = /mouse/gi;
    (h.EventType = function () {
      throw Error.invalidOperation();
    }),
      (h.EventType.prototype = { Up: 0, Down: 1, Move: 2, Leave: 3 }),
      h.EventType.registerEnum("Telerik.Web.UI.EventType", !1),
      (n = (function () {
        var e = [],
          n = h.EventType;
        for (var t in n) d(n[t]) && e.push(t.toLowerCase());
        return e;
      })()),
      (h.EventNamesMap =
        ((t = Telerik.Web),
        (o = t.Platform),
        (u = o.ios),
        (r = o.android),
        (i = t.BrowserFeatures),
        (a = {
          up: "mouseup",
          down: "mousedown",
          move: "mousemove",
          leave: "mouseleave",
        }),
        i.pointerEvents
          ? (a = {
              up: "pointerup",
              down: "pointerdown",
              move: "pointermove",
              leave: "pointercancel pointerleave",
            })
          : i.msPointerEvents
            ? (a = {
                up: "MSPointerUp",
                down: "MSPointerDown",
                move: "MSPointerMove",
                leave: "MSPointerCancel MSPointerLeave",
              })
            : i.touchEvents &&
              (a =
                u || r
                  ? {
                      up: "touchend touchcancel",
                      down: "touchstart",
                      move: "touchmove",
                      leave: "touchcancel",
                    }
                  : {
                      up: "mouseup touchend touchcancel",
                      down: "mousedown touchstart",
                      move: "mousemove touchmove",
                      leave: "mouseleave touchcancel",
                    }),
        a));
    var y = function () {
      var e = [
        "mousedown",
        "mousemove",
        "mouseup",
        "mouseenter",
        "mouseover",
        "mouseleave",
        "mouseout",
      ];
      if (y._instance) return y._instance;
      (y._instance = this),
        (this.options = {
          mouseEventDelay: 400,
          enabled: !1,
          captureMouseEvents: !1,
        }),
        (this.mouseEventTimeout = null),
        (this.enable = function () {
          var n = 0,
            t = e.length,
            o = s.documentElement,
            u = function (e) {
              y._instance.options.captureMouseEvents && e.stopPropagation();
            };
          if (!y._instance.options.enabled && o.addEventListener)
            for (
              y._instance.options.enabled = !0,
                y._instance.options.captureMouseEvents = !1,
                n = 0;
              n < t;
              n++
            )
              o.addEventListener(e[n], u, !0);
        }),
        (this.disableMouseEventPropagation = function (e) {
          (y._instance.options.captureMouseEvents = !0),
            v(y._instance.mouseEventTimeout);
        }),
        (this.enableMouseEventPropagation = function () {
          v(y._instance.mouseEventTimeout),
            (y._instance.mouseEventTimeout = l(function () {
              y._instance.options.captureMouseEvents = !1;
            }, y._instance.options.mouseEventDelay));
        });
    };
    function I(e, n) {
      return _("on", e, n);
    }
    function T(e, n) {
      return _("off", e, n);
    }
    function _(e, t, o) {
      var u,
        r,
        i = (function (e) {
          var t,
            o,
            u,
            r = e.length > 0 ? e[0] : "",
            i = d(r) ? n[r] : r,
            a = [],
            c = i.split(M);
          if (2 == c.length) {
            for (
              t = k(c[0]).split(w), o = c[c.length - 1], u = 0;
              u < t.length;
              u++
            )
              a.push(t[u] + M + o);
            return a.join(w);
          }
          return k(c[0]);
        })(o),
        a = y.getInstance();
      return (
        Telerik.Web.BrowserFeatures.touchAndMouseEvents &&
          i.search(b) > -1 &&
          ("on" === e && a.enable(),
          (u = 2 === o.length ? undefined : o[1]),
          t[e]("touchstart" + E, u, r, a.disableMouseEventPropagation),
          t[e]("touchend" + E, u, r, a.enableMouseEventPropagation)),
        o.length > 0 && (o[0] = i),
        p[e].apply(t, o)
      );
    }
    function k(e) {
      var t = h.EventNamesMap;
      return t[e] || t[n[e]] || e;
    }
    (y.getInstance = function () {
      return y._instance || new y();
    }),
      (p.onEvent = function () {
        return I(this, m.call(arguments));
      }),
      (p.offEvent = function () {
        return T(this, m.call(arguments));
      }),
      (f.onEvent = function () {
        var n = arguments[0],
          t = g.call(arguments, 1, arguments.length);
        return I(e(n), t);
      }),
      (f.offEvent = function () {
        var n = arguments[0],
          t = g.call(arguments, 1, arguments.length);
        return T(e(n), t);
      });
  })($telerik.$);
