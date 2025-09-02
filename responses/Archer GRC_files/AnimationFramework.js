!(function (e, a) {
  var n,
    t = "cID",
    s = "completeCallback",
    u = "key",
    i = "display",
    o = "transition" in document.createElement("p").style,
    r = {
      queue: !0,
      specialEasing: !0,
      step: !0,
      progress: !0,
      start: !0,
      done: !0,
      fail: !0,
      always: !0,
    },
    c = {
      ease: "easeInQuad",
      easeIn: "easeInQuad",
      easeOut: "easeOutQuad",
      easeInOut: "easeInOutQuad",
    },
    I = [
      "linear",
      "ease",
      "easeIn",
      "easeOut",
      "easeInOut",
      "easeInQuad",
      "easeOutQuad",
      "easeInOutQuad",
      "easeInCubic",
      "easeOutCubic",
      "easeInOutCubic",
      "easeInQuart",
      "easeOutQuart",
      "easeInOutQuart",
      "easeInQuint",
      "easeOutQuint",
      "easeInOutQuint",
      "easeInSine",
      "easeOutSine",
      "easeInOutSine",
      "easeInExpo",
      "easeOutExpo",
      "easeInOutExpo",
      "easeInCirc",
      "easeOutQuad",
      "easeInOutQuad",
      "easeInBack",
      "easeOutBack",
      "easeInOutBack",
    ],
    O = { easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out" },
    l = {
      linear: !0,
      ease: !0,
      "ease-in": !0,
      "ease-out": !0,
      "ease-in-out": !0,
      easeIn: !0,
      easeOut: !0,
      easeInOut: !0,
    },
    d = {
      easeInQuad: [0.55, 0.085, 0.68, 0.53],
      easeOutQuad: [0.25, 0.46, 0.45, 0.94],
      easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
      easeInCubic: [0.55, 0.055, 0.675, 0.19],
      easeOutCubic: [0.215, 0.61, 0.355, 1],
      easeInOutCubic: [0.645, 0.045, 0.355, 1],
      easeInQuart: [0.895, 0.03, 0.685, 0.22],
      easeOutQuart: [0.165, 0.84, 0.44, 1],
      easeInOutQuart: [0.77, 0, 0.175, 1],
      easeInQuint: [0.755, 0.05, 0.855, 0.06],
      easeOutQuint: [0.23, 1, 0.32, 1],
      easeInOutQuint: [0.86, 0, 0.07, 1],
      easeInSine: [0.47, 0, 0.745, 0.715],
      easeOutSine: [0.39, 0.575, 0.565, 1],
      easeInOutSine: [0.445, 0.05, 0.55, 0.95],
      easeInExpo: [0.95, 0.05, 0.795, 0.035],
      easeOutExpo: [0.19, 1, 0.22, 1],
      easeInOutExpo: [1, 0, 0, 1],
      easeInCirc: [0.6, 0.04, 0.98, 0.335],
      easeOutCirc: [0.075, 0.82, 0.165, 1],
      easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
      easeInBack: [0.6, -0.28, 0.735, 0.045],
      easeOutBack: [0.175, 0.885, 0.32, 1.275],
      easeInOutBack: [0.68, -0.55, 0.265, 1.55],
    },
    p = { transition: "none" };
  function f(e) {
    var n = a(e[0]),
      t = 1,
      s = e.length,
      u = [],
      i = e[3],
      o = e[4];
    for (e[3] = c[i] || i; t < s - 1; t++) u[t - 1] = e[t];
    n.animate.apply(n, u).promise().done(o);
  }
  (e.transition = function (e, c, Q, m, C) {
    var v, b, g;
    if (
      (m &&
        "random" == m.toLowerCase() &&
        (m = I[Math.round(Math.random() * (I.length - 1))]),
      o && (l[m] || d[m]))
    ) {
      if (((v = a(e)), a.isPlainObject(Q))) {
        for (b in ((g = Q), r)) if (b in g) return void f(arguments);
      } else g = { duration: Q, easing: m, complete: C };
      !(function (e, o, r) {
        var c,
          I,
          l = O[r.easing] || r.easing || "easeOutQuad",
          f = [],
          Q = parseFloat(r.duration);
        for (c in o)
          (c = c.replace(/[A-Z]/g, function (e) {
            return "-" + e.toLowerCase();
          })),
            f.push(c);
        d[l] && (l = "cubic-bezier(" + d[l].join(",") + ")");
        e.data(u, f);
        var m = function () {
          var a = e.data(t),
            i = "boolean" != typeof arguments[0] || arguments[0];
          a && (clearTimeout(a), (a = null)),
            e.off(n, m).removeData(u).removeData(t).removeData(s).css(p),
            r.complete && i && r.complete.call(e.eq(0));
        };
        e.data(s, m),
          e.on(n, m),
          (I = setTimeout(m, Math.ceil(Q + 50))),
          e.data(t, I),
          e.css(i),
          e.css(
            a.extend(
              {
                "transition-duration": Q / 1e3 + "s",
                "transition-timing-function": l,
                "transition-property": f.join(", "),
              },
              o,
            ),
          );
      })(v, c, g);
    } else f(arguments);
  }),
    (a.fn.transition = function (a, n, t, s) {
      e.transition(this, a, n, t, s);
    }),
    (e.stopTransition = function (e, n, t) {
      return (function (e, a, n) {
        var t,
          i = e.data(s),
          r = e.data(u),
          c = !n && r;
        return o
          ? (c &&
              (t = (function (e) {
                var a = {},
                  n = arguments[1];
                return (
                  Array.forEach(e, function (e) {
                    a[e] = n[e];
                  }),
                  a
                );
              })(r, getComputedStyle(e[0]))),
            i && i.call(e, n),
            c && e.css(t),
            e)
          : e.stop(a, n);
      })(a(e), n || !1, t || !1);
    }),
    (a.fn.stopTransition = function (a, n) {
      return e.stopTransition(this, a || !1, n || !1);
    });
})($telerik, $telerik.$);
