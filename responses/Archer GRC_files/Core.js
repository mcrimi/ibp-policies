!(function (e, t) {
  var r,
    i = Object.prototype.toString,
    n = "input",
    o = e.navigator,
    a = o.userAgent;
  function l(e, t) {
    t();
  }
  function s(e) {
    return t.createElement(e);
  }
  function d(e, t) {
    return e.indexOf(t);
  }
  function u(e) {
    var r = t.createElement("div"),
      i = "ms Moz webkit".split(" "),
      n = i.length;
    if (e in r.style) return !0;
    for (
      e = e.replace(/^[a-z]/, function (e) {
        return e.toUpperCase();
      });
      n--;

    )
      if (i[n] + e in r.style) return !0;
    return !1;
  }
  var c = function () {};
  c.prototype = {
    addTest: function (e, t, r) {
      var n;
      undefined === (r = r || this)[e] &&
        ((n = t),
        (t = "[object Function]" === i.call(n) ? t() : t),
        (r[e] = t));
    },
    addSuite: function (e, t) {
      for (var r in ((e = this[e] = {}), t))
        t.hasOwnProperty(r) && this.addTest(r, t[r], e);
    },
  };
  var f = new c(),
    h = new c(),
    g = new c(),
    m = new c(),
    p = new c(),
    v = new c();
  l(0, function () {
    f.addTest("windows", function () {
      return d(a, "Windows") > -1 && -1 == d(a, "Windows Phone");
    }),
      f.addTest("mac", function () {
        var e = d(a, "Macintosh") > -1;
        return e && o.maxTouchPoints > 0 && (e = !1), e;
      }),
      f.addTest("linux", function () {
        return d(a, "Linux") > -1 && -1 == d(a, "Android");
      }),
      f.addTest("windowsphone", function () {
        return d(a, "Windows Phone") > -1;
      }),
      f.addTest("android", function () {
        return d(a, "Android") > -1 && -1 == d(a, "Windows Phone");
      }),
      f.addTest("ios", function () {
        return (
          (d(a, "Macintosh") > -1 && o.maxTouchPoints > 0) ||
          ((d(a, "iPad") > -1 || d(a, "iPhone") > -1 || d(a, "iPod") > -1) &&
            -1 == d(a, "Windows Phone"))
        );
      }),
      f.addTest("ipad", function () {
        return (
          !!(d(a, "Macintosh") > -1 && o.maxTouchPoints > 0) ||
          (d(a, "iPad") > -1 && -1 == d(a, "Windows Phone"))
        );
      }),
      f.addTest("iphone", function () {
        return (
          (d(a, "iPhone") > -1 || d(a, "iPod") > -1) &&
          -1 == d(a, "Windows Phone")
        );
      });
  }),
    l(0, function () {
      h.addTest("trident", function () {
        return d(a, " Trident/") > -1;
      }),
        h.addTest("spartan", function () {
          return d(a, " Edge/") > -1;
        }),
        h.addTest("presto", function () {
          return d(a, " Opera/") > -1;
        }),
        h.addTest("gecko", function () {
          return !h.trident && d(a, " Firefox/") > -1;
        }),
        h.addTest("webkit", function () {
          return !h.spartan && !h.trident && d(a, " AppleWebKit/") > -1;
        });
    }),
    l(0, function () {
      g.addTest("ie", function () {
        return f.windows && (h.trident || d(a, " MSIE ") > -1);
      }),
        g.addTest("edge", function () {
          return f.windows && d(a, " Edge/") > -1;
        }),
        g.addTest("edgeChromium", function () {
          return (
            h.webkit &&
            !g.opera &&
            (d(a, " Edg/") > -1 || d(a, " EdgA/") > -1 || d(a, " EdgiOS/") > -1)
          );
        }),
        g.addTest("iemobile", function () {
          return f.windowsphone && d(a, " IEMobile/") > -1;
        }),
        g.addTest("edgemobile", function () {
          return f.windowsphone && d(a, " Edge/") > -1;
        }),
        g.addTest("ff", function () {
          return !g.ie && d(a, " Firefox/") > -1;
        }),
        g.addTest("opera", function () {
          return d(a, " OPR/") > -1 || d(a, " OPiOS/") > -1;
        }),
        g.addTest("operaPresto", function () {
          return d(a, " Opera/") > -1;
        }),
        g.addTest("operaMini", function () {
          return d(a, " Opera Mini/") > -1;
        }),
        g.addTest("webkit", function () {
          return h.webkit;
        }),
        g.addTest("safari", function () {
          return h.webkit && d(a, " Version/") > -1;
        }),
        g.addTest("chrome", function () {
          return (
            h.webkit &&
            !g.opera &&
            (d(a, " Chrome/") > -1 || d(a, " CriOS/") > -1)
          );
        }),
        g.addTest("fullVersion", function () {
          var e,
            t,
            r = null;
          return (
            g.ie && (r = d(a, " rv:") > -1 ? /rv:([\d\.]+)/ : /MSIE ([\d\.]+)/),
            g.edge && (r = /Edge\/([\d\.]+)/),
            g.iemobile && (r = /IEMobile\/([\d\.]+)/),
            g.edgemobile && (r = /Edge\/([\d\.]+)/),
            g.ff && (r = /Firefox\/([\d\.]+)/),
            g.opera && (r = /OP(?:R|iOS)\/([\d\.]+)/),
            g.operaPresto && (r = /Version\/([\d\.]+)/),
            g.safari && (r = /Version\/([\d\.]+)/),
            g.chrome && (r = /(?:Chrome|CriOS)\/([\d\.]+)/),
            g.edgeChromium && (r = /(?:Edg|EdgA|EdgiOS)\/([\d\.]+)/),
            null === r ? null : ((e = a), (t = r), e.match(t))[1]
          );
        }),
        g.addTest("version", function () {
          var e = g.fullVersion;
          return null === e ? null : parseFloat(e);
        }),
        g.addTest("documentMode", t.documentMode || null),
        g.addTest("quirksMode", g.ie && "CSS1Compat" !== t.compatMode),
        g.addTest("standardsMode", !g.quirksMode);
    }),
    l(0, function () {
      var e = s("canvas");
      m.addTest("canvas", !(!e.getContext || !e.getContext("2d")));
    }),
    l(0, function () {
      var e = s(n);
      m.addSuite("input", {
        autocomplete: !!("autocomplete" in e),
        autofocus: !!("autofocus" in e),
        list: !!("list" in e),
        max: !!("max" in e),
        min: !!("min" in e),
        multiple: !!("multiple" in e),
        pattern: !!("pattern" in e),
        placeholder: !!("placeholder" in e),
        required: !!("required" in e),
        step: !!("step" in e),
      });
    }),
    l(0, function () {
      var e = s(n);
      function t(t) {
        return e.setAttribute("type", t), "text" !== e.type;
      }
      m.addSuite("inputTypes", {
        color: t("color"),
        date: t("date"),
        datetime: t("datetime"),
        "datetime-local": t("datetime-local"),
        email: t("email"),
        month: t("month"),
        number: t("number"),
        range: t("range"),
        search: t("search"),
        tel: t("tel"),
        time: t("time"),
        url: t("url"),
        week: t("week"),
      });
    }),
    l(0, function () {
      m.addTest("propertychange", "onpropertychange" in t);
    }),
    l(0, function () {
      var r = e.document.documentElement,
        i = Sys.UI.DomElement.addCssClass;
      g.addTest("scrollBarWidth", function () {
        var e,
          r = t.documentElement,
          i = t.createElement("div"),
          n = t.body,
          o = n || t.createElement("body");
        return (
          (i.style.cssText =
            "overflow:scroll;overflow-x:hidden;zoom:1;clear:both"),
          (i.innerHTML = "&nbsp;"),
          o.appendChild(i),
          n || r.appendChild(o),
          (e = i.offsetWidth - i.scrollWidth),
          i.parentNode.removeChild(i),
          n || o.parentNode.removeChild(o),
          e
        );
      }),
        v.addTest("boxShadow", function () {
          var e = u("boxShadow");
          return !1 === e && i(r, "t-no-boxshadow"), e;
        }),
        v.addTest("flexbox", function () {
          var e = u("flex");
          return !1 === e && i(r, "t-no-flexbox"), e;
        });
    }),
    l(0, function () {
      m.addTest("touchEvents", function () {
        return "ontouchstart" in e;
      }),
        m.addTest("pointerEvents", function () {
          return "PointerEvent" in e;
        }),
        m.addTest("msPointerEvents", function () {
          return "MSPointerEvent" in e;
        }),
        m.addTest("touchAndMouseEvents", function () {
          return m.touchEvents && !f.android && !f.ios;
        });
    }),
    Type.registerNamespace("Telerik.Web"),
    ((r = Telerik.Web).Platform = f),
    (r.Engine = h),
    (r.Browser = g),
    (r.BrowserFeatures = m),
    (r.BrowserPlugins = p),
    (r.CssFeatures = v);
})(window, document),
  (function (e) {
    var t = e.document.documentElement,
      r = Sys.UI.DomElement.addCssClass,
      i = Telerik.Web.Browser;
    Array.forEach(["chrome", "ff", "ie", "opera", "safari"], function (e, n) {
      i[e] && r(t, String.format("t-{0} t-{0}{1}", e, i.version));
    });
  })(window, document);
try {
  Sys.Browser.agent == Sys.Browser.InternetExplorer &&
    document.execCommand("BackgroundImageCache", !1, !0);
} catch (e) {}
Type.registerNamespace("Telerik.Web.UI"),
  (function (e) {
    (e.Point = function (e, t) {
      (this.x = e), (this.y = t);
    }),
      e.Point.registerClass("Telerik.Web.UI.Point"),
      (e.Bounds = function (e, t, r, i) {
        (this.x = e), (this.y = t), (this.height = i), (this.width = r);
      }),
      e.Bounds.registerClass("Telerik.Web.UI.Bounds");
  })(Telerik.Web.UI);
var commonScripts = {
  cloneJsObject: function (e, t) {
    for (var r in (t || (t = {}), e))
      if ("__proto__" !== r && "constructor" !== r && "prototype" !== r) {
        var i = e[r];
        t[r] = i instanceof Array ? Array.clone(i) : i;
      }
    return t;
  },
  isCloned: function () {
    return this._isCloned;
  },
  cloneControl: function (e, t, r) {
    if (!e) return null;
    t || (t = Object.getType(e));
    var i = e.__clonedProperties__;
    null == i &&
      (i = e.__clonedProperties__ = $telerik._getPropertiesParameter(e, t)),
      r ||
        ((r = e.get_element().cloneNode(!0)).removeAttribute("control"),
        r.removeAttribute("id"));
    var n = $create(t, i, null, null, r);
    e._observerContext && (n._observerContext = e._observerContext);
    var o = $telerik.cloneJsObject(e.get_events());
    return (
      (n._events = o),
      (n._events._list = $telerik.cloneJsObject(n._events._list)),
      (n._isCloned = !0),
      (n.isCloned = $telerik.isCloned),
      n
    );
  },
  _getPropertiesParameter: function (e, t) {
    var r = {},
      i = t.prototype;
    for (var n in i)
      if ("__proto__" !== n && "constructor" !== n && "prototype" !== n) {
        var o = e[n];
        if ("function" == typeof o && 0 == n.indexOf("get_")) {
          var a = n.substring(4);
          if (null == e["set_" + a]) continue;
          var l = o.call(e);
          if (null == l) continue;
          r[a] = l;
        }
      }
    return delete r.clientStateFieldID, delete r.id, r;
  },
  getOuterSize: function (e) {
    var t = $telerik.getSize(e),
      r = $telerik.getMarginBox(e);
    return {
      width: t.width + r.left + r.right,
      height: t.height + r.top + r.bottom,
    };
  },
  getOuterBounds: function (e) {
    var t = $telerik.getBounds(e),
      r = $telerik.getMarginBox(e);
    return {
      x: t.x - r.left,
      y: t.y - r.top,
      width: t.width + r.left + r.right,
      height: t.height + r.top + r.bottom,
    };
  },
  getInvisibleParent: function (e) {
    return this.getParentBy(e, function (e) {
      return "none" === $telerik.getCurrentStyle(e, "display", "");
    });
  },
  getHiddenParent: function (e) {
    return this.getParentBy(e, function (e) {
      return "hidden" === $telerik.getCurrentStyle(e, "visibility", "");
    });
  },
  getParentBy: function (e, t) {
    for (
      var r = e.nodeType == e.DOCUMENT_NODE ? e : e.ownerDocument;
      e && e != r;

    ) {
      if (t(e)) return e;
      e = e.parentNode;
    }
    return null;
  },
  isScrolledIntoView: function (e) {
    var t = e.ownerDocument,
      r = t.defaultView ? t.defaultView : t.parentWindow,
      i = $telerik.$(r).scrollTop(),
      n = i + $telerik.$(r).height(),
      o = $telerik.$(e).offset().top,
      a = o + $telerik.$(e).height();
    return o + (a - o) / 4 >= i && o + (a - o) / 4 <= n;
  },
  scrollIntoView: function (e) {
    if (e && e.parentNode) {
      for (
        var t = null,
          r = e.offsetParent,
          i = e.offsetTop,
          n = 0,
          o = e.parentNode;
        null != o;

      ) {
        var a = $telerik.getCurrentStyle(o, "overflowY");
        if ("scroll" == a || "auto" == a) {
          t = o;
          break;
        }
        if (
          (o == r && ((i += o.offsetTop), (r = o.offsetParent)),
          "BODY" == o.tagName)
        ) {
          var l = o.ownerDocument;
          !$telerik.isIE &&
            l.defaultView &&
            l.defaultView.frameElement &&
            //! Set the height to be equal to the height of the iframe, not the body element!
            (n = l.defaultView.frameElement.offsetHeight),
            (t = o);
          break;
        }
        o = o.parentNode;
      }
      t &&
        (n || (n = t.offsetHeight),
        t.scrollTop + n < i + e.offsetHeight
          ? (t.scrollTop = i + e.offsetHeight - n)
          : i < t.scrollTop && (t.scrollTop = i));
    }
  },
  getScrollableParent: function (e) {
    for (var t, r = e.parentNode, i = null; null != r; ) {
      if (
        "scroll" == (t = $telerik.getCurrentStyle(r, "overflowY")) ||
        "auto" == t
      ) {
        i = r;
        break;
      }
      r = r.parentNode;
    }
    return i;
  },
  getScrollableParents: function (e) {
    for (var t, r = e.parentNode, i = []; null != r && 1 === r.nodeType; )
      ("scroll" != (t = $telerik.getCurrentStyle(r, "overflowY")) &&
        "auto" != t) ||
        i.push(r),
        (r = r.parentNode);
    return i;
  },
  withFrozenParentsScroll: function (e, t) {
    for (
      var r = $telerik.getScrollableParents(e),
        i = [],
        n = $telerik.$(window).scrollTop(),
        o = 0;
      o < r.length;
      o++
    )
      i.push(r[o].scrollTop);
    t.apply();
    for (var a = 0; a < r.length; a++) r[a].scrollTop = i[a];
    $telerik.$(window).scrollTop(n);
  },
  fixScrollableParentBehavior_OldIE: function (e) {
    if (($telerik.isIE6 || $telerik.isIE7) && e && 1 === e.nodeType) {
      var t = $telerik.getScrollableParent(e);
      "static" == $telerik.getComputedStyle(t, "position") &&
        (t.style.position = "relative");
    }
  },
  isRightToLeft: function (e) {
    for (; e && 9 !== e.nodeType; ) {
      var t = $telerik.getCurrentStyle(e, "direction");
      if ("rtl" == e.dir || "rtl" == t) return !0;
      if ("ltr" == e.dir || "ltr" == t) return !1;
      e = e.parentNode;
    }
    return !1;
  },
  getCorrectScrollLeft: function (e) {
    return $telerik.isRightToLeft(e)
      ? -(e.scrollWidth - e.offsetWidth - Math.abs(e.scrollLeft))
      : e.scrollLeft;
  },
  scrollLeft: function (e, t) {
    var r = $telerik.isRightToLeft(e),
      i = Telerik.Web.Browser,
      n = i.webkit,
      o = i.ff;
    if (void 0 === t)
      return r && n
        ? e.scrollWidth - e.clientWidth - e.scrollLeft
        : Math.abs(e.scrollLeft);
    e.scrollLeft = r && n ? e.scrollWidth - e.clientWidth - t : r && o ? -t : t;
  },
  _borderStyleNames: [
    "borderTopStyle",
    "borderRightStyle",
    "borderBottomStyle",
    "borderLeftStyle",
  ],
  _borderWidthNames: [
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
  ],
  _paddingWidthNames: [
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
  ],
  _marginWidthNames: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
  radControls: [],
  registerControl: function (e) {
    Array.contains(this.radControls, e) || Array.add(this.radControls, e);
  },
  unregisterControl: function (e) {
    Array.remove(this.radControls, e);
  },
  repaintChildren: function (e) {
    for (
      var t = e.get_element ? e.get_element() : e,
        r = 0,
        i = this.radControls.length;
      r < i;
      r++
    ) {
      var n = this.radControls[r];
      n.repaint && this.isDescendant(t, n.get_element()) && n.repaint();
    }
  },
  _borderThickness: function () {
    $telerik._borderThicknesses = {};
    var e = document.createElement("div"),
      t = document.createElement("div");
    (e.style.visibility = "hidden"),
      (e.style.position = "absolute"),
      (e.style.top = "-9999px"),
      (e.style.fontSize = "1px"),
      (t.style.height = "0px"),
      (t.style.overflow = "hidden"),
      document.body.appendChild(e).appendChild(t);
    var r = e.offsetHeight;
    (t.style.borderTop = "solid black"),
      (e.style.borderLeft = "1px solid red"),
      (t.style.borderTopWidth = "thin"),
      ($telerik._borderThicknesses.thin = e.offsetHeight - r),
      (t.style.borderTopWidth = "medium"),
      ($telerik._borderThicknesses.medium = e.offsetHeight - r),
      (t.style.borderTopWidth = "thick"),
      ($telerik._borderThicknesses.thick = e.offsetHeight - r);
    var i = $telerik.getComputedStyle(e, "border-left-color", null),
      n = $telerik.getComputedStyle(t, "border-top-color", null);
    i &&
      n &&
      i == n &&
      (document.documentElement.className += " _Telerik_a11y"),
      void 0 !== e.removeChild && e.removeChild(t),
      document.body.removeChild(e),
      $telerik.isSafari || $telerik.isIE10Mode || (t.outerHTML = null),
      $telerik.isSafari || $telerik.isIE10Mode || (e.outerHTML = null),
      (e = null),
      (t = null);
  },
  getLocation: function (e) {
    var t,
      r = e && e.ownerDocument ? e.ownerDocument : document;
    if (e === r.documentElement) return new Telerik.Web.UI.Point(0, 0);
    if (Sys.Browser.agent == Sys.Browser.InternetExplorer) {
      if (
        e.window === e ||
        9 === e.nodeType ||
        !e.getClientRects ||
        !e.getBoundingClientRect ||
        null == e.parentElement
      )
        return new Telerik.Web.UI.Point(0, 0);
      var i = e.getClientRects();
      if (!i || !i.length) return new Telerik.Web.UI.Point(0, 0);
      var n = i[0],
        o = 0,
        a = 0,
        l = !1;
      try {
        l = r.parentWindow.frameElement;
      } catch (e) {
        l = !0;
      }
      if (l) {
        var s = e.getBoundingClientRect();
        if (!s) return new Telerik.Web.UI.Point(0, 0);
        for (var d = n.left, u = n.top, c = 1; c < i.length; c++) {
          var f = i[c];
          f.left < d && (d = f.left), f.top < u && (u = f.top);
        }
        (o = d - s.left), (a = u - s.top);
      }
      var h = 0;
      if ($telerik.isIE6 || $telerik.isIE7 || $telerik.quirksMode) {
        var g = 1;
        if (l && l.getAttribute) {
          var m = l.getAttribute("frameborder");
          null != m &&
            ((g = parseInt(m, 10)),
            isNaN(g) && (g = "no" == m.toLowerCase() ? 0 : 1));
        }
        h = 2 * g;
      }
      var p = r.documentElement,
        v = n.left - h - o + $telerik.getCorrectScrollLeft(p),
        k = n.top - h - a + p.scrollTop;
      return (
        (t = new Telerik.Web.UI.Point(Math.round(v), Math.round(k))),
        $telerik.quirksMode &&
          ((t.x += $telerik.getCorrectScrollLeft(r.body)),
          (t.y += r.body.scrollTop)),
        t
      );
    }
    if (((t = $telerik.originalGetLocation(e)), $telerik.isOpera)) {
      var b = null,
        S = $telerik.getCurrentStyle(e, "display");
      for (b = "inline" != S ? e.parentNode : e.offsetParent; b; ) {
        var _ = b.tagName.toUpperCase();
        if ("BODY" == _ || "HTML" == _) break;
        if (
          "TABLE" == _ &&
          b.parentNode &&
          "inline-block" == b.parentNode.style.display
        ) {
          var y = b.offsetLeft,
            T = b.style.display;
          (b.style.display = "inline-block"),
            b.offsetLeft > y && (t.x += b.offsetLeft - y),
            (b.style.display = T);
        }
        (t.x -= $telerik.getCorrectScrollLeft(b)),
          (t.y -= b.scrollTop),
          (b = "inline" != S ? b.parentNode : b.offsetParent);
      }
    }
    var E = Math.max(r.documentElement.scrollTop, r.body.scrollTop),
      w = Math.max(r.documentElement.scrollLeft, r.body.scrollLeft);
    if (($telerik.isSafari || $telerik.isSpartan) && (E > 0 || w > 0)) {
      var $ = r.documentElement.getElementsByTagName("form");
      if ($ && $.length > 0) {
        var W = $telerik.originalGetLocation($[0]);
        W.y && W.y < 0 && (t.y += E), W.x && W.x < 0 && (t.x += w);
      } else {
        for (var I = e.parentNode, C = !1, B = !1; I && I.tagName; ) {
          var x = $telerik.originalGetLocation(I);
          x.y < 0 && (C = !0), x.x < 0 && (B = !0), (I = I.parentNode);
        }
        C && (t.y += E), B && (t.x += w);
      }
    }
    return t;
  },
  setLocation: function (e, t) {
    var r = e.style;
    (r.position = "absolute"), (r.left = t.x + "px"), (r.top = t.y + "px");
  },
  getElementQuery: function (e) {
    for (var t = []; e.parentNode; ) {
      if (e.id) {
        t.unshift("#" + e.id);
        break;
      }
      if (e == e.ownerDocument.documentElement) t.unshift(e.tagName);
      else {
        for (
          var r = 1, i = e;
          i.previousElementSibling;
          i = i.previousElementSibling, r++
        );
        t.unshift(String.format("{0}:nth-child({1})", e.tagName, r));
      }
      e = e.parentNode;
    }
    return t.join(" > ");
  },
  findControl: function (e, t) {
    for (var r = e.getElementsByTagName("*"), i = 0, n = r.length; i < n; i++) {
      var o = r[i].id;
      if (o && o.endsWith(t)) return $find(o);
    }
    return null;
  },
  findElement: function (e, t) {
    for (var r = e.getElementsByTagName("*"), i = 0, n = r.length; i < n; i++) {
      var o = r[i].id;
      if (o && o.endsWith(t)) return $get(o);
    }
    return null;
  },
  getContentSize: function (e) {
    if (!e) throw Error.argumentNull("element");
    var t = $telerik.getSize(e),
      r = $telerik.getBorderBox(e),
      i = $telerik.getPaddingBox(e);
    return {
      width: t.width - r.horizontal - i.horizontal,
      height: t.height - r.vertical - i.vertical,
    };
  },
  getSize: function (e) {
    if (!e) throw Error.argumentNull("element");
    return { width: e.offsetWidth, height: e.offsetHeight };
  },
  setContentSize: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (!t) throw Error.argumentNull("size");
    if (
      "border-box" == $telerik.getCurrentStyle(e, "MozBoxSizing") ||
      "border-box" == $telerik.getCurrentStyle(e, "BoxSizing")
    ) {
      var r = $telerik.getBorderBox(e),
        i = $telerik.getPaddingBox(e);
      t = {
        width: t.width + r.horizontal + i.horizontal,
        height: t.height + r.vertical + i.vertical,
      };
    }
    (e.style.width = t.width.toString() + "px"),
      (e.style.height = t.height.toString() + "px");
  },
  setSize: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (!t) throw Error.argumentNull("size");
    var r = $telerik.getBorderBox(e),
      i = $telerik.getPaddingBox(e),
      n = {
        width: t.width - r.horizontal - i.horizontal,
        height: t.height - r.vertical - i.vertical,
      };
    $telerik.setContentSize(e, n);
  },
  getBounds: function (e) {
    var t = $telerik.getLocation(e);
    return new Telerik.Web.UI.Bounds(
      t.x,
      t.y,
      e.offsetWidth || 0,
      e.offsetHeight || 0,
    );
  },
  setBounds: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (!t) throw Error.argumentNull("bounds");
    $telerik.setSize(e, t), $telerik.setLocation(e, t);
  },
  getClientBounds: function () {
    var e,
      t,
      r = Telerik.Web.Browser;
    return (
      r.ie || r.edge
        ? ((e = document.documentElement.clientWidth),
          (t = document.documentElement.clientHeight),
          0 == e &&
            0 == t &&
            ((e = document.body.clientWidth), (t = document.body.clientHeight)))
        : r.safari
          ? ((e = window.innerWidth), (t = window.innerHeight))
          : r.opera && r.version < 9.5
            ? ((e = Math.min(window.innerWidth, document.body.clientWidth)),
              (t = Math.min(window.innerHeight, document.body.clientHeight)))
            : ((e = Math.min(
                window.innerWidth,
                document.documentElement.clientWidth,
              )),
              (t = Math.min(
                window.innerHeight,
                document.documentElement.clientHeight,
              ))),
      new Telerik.Web.UI.Bounds(0, 0, e, t)
    );
  },
  getMarginBox: function (e) {
    if (!e) throw Error.argumentNull("element");
    var t = {
      top: $telerik.getMargin(e, Telerik.Web.BoxSide.Top),
      right: $telerik.getMargin(e, Telerik.Web.BoxSide.Right),
      bottom: $telerik.getMargin(e, Telerik.Web.BoxSide.Bottom),
      left: $telerik.getMargin(e, Telerik.Web.BoxSide.Left),
    };
    return (
      (t.horizontal = t.left + t.right), (t.vertical = t.top + t.bottom), t
    );
  },
  getPaddingBox: function (e) {
    if (!e) throw Error.argumentNull("element");
    var t = {
      top: $telerik.getPadding(e, Telerik.Web.BoxSide.Top),
      right: $telerik.getPadding(e, Telerik.Web.BoxSide.Right),
      bottom: $telerik.getPadding(e, Telerik.Web.BoxSide.Bottom),
      left: $telerik.getPadding(e, Telerik.Web.BoxSide.Left),
    };
    return (
      (t.horizontal = t.left + t.right), (t.vertical = t.top + t.bottom), t
    );
  },
  getBorderBox: function (e) {
    if (!e) throw Error.argumentNull("element");
    var t = {
      top: $telerik.getBorderWidth(e, Telerik.Web.BoxSide.Top),
      right: $telerik.getBorderWidth(e, Telerik.Web.BoxSide.Right),
      bottom: $telerik.getBorderWidth(e, Telerik.Web.BoxSide.Bottom),
      left: $telerik.getBorderWidth(e, Telerik.Web.BoxSide.Left),
    };
    return (
      (t.horizontal = t.left + t.right), (t.vertical = t.top + t.bottom), t
    );
  },
  isBorderVisible: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (t < Telerik.Web.BoxSide.Top || t > Telerik.Web.BoxSide.Left)
      throw Error.argumentOutOfRange(
        String.format(Sys.Res.enumInvalidValue, t, "Telerik.Web.BoxSide"),
      );
    var r = $telerik._borderStyleNames[t];
    return "none" != $telerik.getCurrentStyle(e, r);
  },
  getMargin: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (t < Telerik.Web.BoxSide.Top || t > Telerik.Web.BoxSide.Left)
      throw Error.argumentOutOfRange(
        String.format(Sys.Res.enumInvalidValue, t, "Telerik.Web.BoxSide"),
      );
    var r = $telerik._marginWidthNames[t],
      i = $telerik.getCurrentStyle(e, r);
    try {
      return $telerik.parsePadding(i);
    } catch (e) {
      return 0;
    }
  },
  getBorderWidth: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (t < Telerik.Web.BoxSide.Top || t > Telerik.Web.BoxSide.Left)
      throw Error.argumentOutOfRange(
        String.format(Sys.Res.enumInvalidValue, t, "Telerik.Web.BoxSide"),
      );
    if (!$telerik.isBorderVisible(e, t)) return 0;
    var r = $telerik._borderWidthNames[t],
      i = $telerik.getCurrentStyle(e, r);
    return $telerik.parseBorderWidth(i);
  },
  getPadding: function (e, t) {
    if (!e) throw Error.argumentNull("element");
    if (t < Telerik.Web.BoxSide.Top || t > Telerik.Web.BoxSide.Left)
      throw Error.argumentOutOfRange(
        String.format(Sys.Res.enumInvalidValue, t, "Telerik.Web.BoxSide"),
      );
    var r = $telerik._paddingWidthNames[t],
      i = $telerik.getCurrentStyle(e, r);
    return $telerik.parsePadding(i);
  },
  parseBorderWidth: function (e) {
    if (e) {
      switch (e) {
        case "thin":
        case "medium":
        case "thick":
          return $telerik._borderThicknesses[e];
        case "inherit":
          return 0;
      }
      return $telerik.parseUnit(e).size;
    }
    return 0;
  },
  parsePadding: function (e) {
    return e
      ? "auto" == e || "inherit" == e
        ? 0
        : $telerik.parseUnit(e).size
      : 0;
  },
  parseUnit: function (e) {
    if (!e) throw Error.argumentNull("value");
    for (
      var t, r, i = (e = e.trim().toLowerCase()).length, n = -1, o = 0;
      o < i;
      o++
    ) {
      var a = e.substr(o, 1);
      if ((a < "0" || a > "9") && "-" != a && "." != a && "," != a) break;
      n = o;
    }
    if (-1 == n) throw Error.create("No digits");
    return (
      (t = n < i - 1 ? e.substring(n + 1).trim() : "px"),
      (r = parseFloat(e.substr(0, n + 1))),
      "px" == t && (r = Math.floor(r)),
      { size: r, type: t }
    );
  },
  containsPoint: function (e, t, r) {
    return t >= e.x && t <= e.x + e.width && r >= e.y && r <= e.y + e.height;
  },
  isDescendant: function (e, t) {
    try {
      for (var r = t.parentNode; null != r; r = r.parentNode)
        if (r == e) return !0;
    } catch (e) {}
    return !1;
  },
  isDescendantOrSelf: function (e, t) {
    return e === t || $telerik.isDescendant(e, t);
  },
  addCssClasses: function (e, t) {
    for (var r = 0; r < t.length; r++) Sys.UI.DomElement.addCssClass(e, t[r]);
  },
  removeCssClasses: function (e, t) {
    for (var r = 0; r < t.length; r++)
      Sys.UI.DomElement.removeCssClass(e, t[r]);
  },
  getScrollOffset: function (e, t) {
    for (
      var r = 0,
        i = 0,
        n = e,
        o = e && e.ownerDocument ? e.ownerDocument : document;
      null != n &&
      null != n.scrollLeft &&
      ((r += $telerik.getCorrectScrollLeft(n)),
      (i += n.scrollTop),
      t && (n != o.body || (0 == n.scrollLeft && 0 == n.scrollTop)));

    )
      n = n.parentNode;
    return { x: r, y: i };
  },
  getElementByClassName: function (e, t, r) {
    if (e.getElementsByClassName) return e.getElementsByClassName(t)[0];
    for (
      var i = null,
        n = 0,
        o = (i = r ? e.getElementsByTagName(r) : e.getElementsByTagName("*"))
          .length;
      n < o;
      n++
    ) {
      var a = i[n];
      if (Sys.UI.DomElement.containsCssClass(a, t)) return a;
    }
    return null;
  },
  getElementsByClassName: function (e, t, r) {
    var i;
    return (
      (i = (e = e || document).getElementsByClassName
        ? function (e, t, r) {
            for (
              var i,
                n = r.getElementsByClassName(e),
                o = t ? new RegExp("\\b" + t + "\\b", "i") : null,
                a = [],
                l = 0,
                s = n.length;
              l < s;
              l += 1
            )
              (i = n[l]), (o && !o.test(i.nodeName)) || a.push(i);
            return a;
          }
        : document.evaluate
          ? function (e, t, r) {
              t = t || "*";
              for (
                var i,
                  n,
                  o = e.split(" "),
                  a = "",
                  l = "http://www.w3.org/1999/xhtml",
                  s = document.documentElement.namespaceURI === l ? l : null,
                  d = [],
                  u = 0,
                  c = o.length;
                u < c;
                u += 1
              )
                a += "[contains(concat(' ', @class, ' '), ' " + o[u] + " ')]";
              try {
                i = document.evaluate(".//" + t + a, r, s, 0, null);
              } catch (e) {
                i = document.evaluate(".//" + t + a, r, null, 0, null);
              }
              for (; (n = i.iterateNext()); ) d.push(n);
              return d;
            }
          : function (e, t, r) {
              t = t || "*";
              for (
                var i,
                  n,
                  o = e.split(" "),
                  a = [],
                  l = "*" === t && r.all ? r.all : r.getElementsByTagName(t),
                  s = [],
                  d = 0,
                  u = o.length;
                d < u;
                d += 1
              )
                a.push(new RegExp("(^|\\s)" + o[d] + "(\\s|$)"));
              for (var c = 0, f = l.length; c < f; c += 1) {
                (i = l[c]), (n = !1);
                for (
                  var h = 0, g = a.length;
                  h < g && (n = a[h].test(i.className));
                  h += 1
                );
                n && s.push(i);
              }
              return s;
            }),
      i(t, r, e)
    );
  },
  nextElement: function (e) {
    if (!e) return e;
    for (var t = e.nextSibling; t && 1 != t.nodeType; ) t = t.nextSibling;
    return t;
  },
  previousElement: function (e) {
    if (!e) return e;
    for (var t = e.previousSibling; t && 1 != t.nodeType; )
      t = t.previousSibling;
    return t;
  },
  _getWindow: function (e) {
    var t = e.ownerDocument || e.document || e;
    return t.defaultView || t.parentWindow;
  },
  useAttachEvent: function (e) {
    return e.attachEvent && !$telerik.isOpera;
  },
  useDetachEvent: function (e) {
    return e.detachEvent && !$telerik.isOpera;
  },
  addHandler: function (e, t, r, i) {
    e._events || (e._events = {});
    var n,
      o = e._events[t];
    if (
      (o || (e._events[t] = o = []),
      $telerik.useAttachEvent(e)
        ? ((n = function () {
            var t = {};
            try {
              t = $telerik._getWindow(e).event;
            } catch (e) {}
            return r.call(e, new Sys.UI.DomEvent(t));
          }),
          e.attachEvent("on" + t, n))
        : e.addEventListener &&
          ((n = function (t) {
            return r.call(e, new Sys.UI.DomEvent(t));
          }),
          e.addEventListener(t, n, !1)),
      (o[o.length] = { handler: r, browserHandler: n, autoRemove: i }),
      i)
    ) {
      var a = e.dispose;
      a !== $telerik._disposeHandlers &&
        ((e.dispose = $telerik._disposeHandlers),
        void 0 !== a && (e._chainDispose = a));
    }
  },
  addHandlers: function (e, t, r, i) {
    for (var n in t) {
      var o = t[n];
      r && (o = Function.createDelegate(r, o)),
        $telerik.addHandler(e, n, o, i || !1);
    }
  },
  clearHandlers: function (e) {
    $telerik._clearHandlers(e, !1);
  },
  _clearHandlers: function (e, t) {
    if (e._events) {
      var r = e._events;
      for (var i in r)
        for (var n = r[i], o = n.length - 1; o >= 0; o--) {
          var a = n[o];
          (t && !a.autoRemove) || $telerik.removeHandler(e, i, a.handler);
        }
      e._events = null;
    }
  },
  _disposeHandlers: function () {
    $telerik._clearHandlers(this, !0);
    var e = this._chainDispose,
      t = typeof e;
    "undefined" !== t &&
      ((this.dispose = e),
      (this._chainDispose = null),
      "function" === t && this.dispose());
  },
  removeHandler: function (e, t, r) {
    $telerik._removeHandler(e, t, r);
  },
  _removeHandler: function (e, t, r) {
    for (var i = null, n = e._events[t] || [], o = 0, a = n.length; o < a; o++)
      if (n[o].handler === r) {
        i = n[o].browserHandler;
        break;
      }
    if ($telerik.useDetachEvent(e)) e.detachEvent("on" + t, i);
    else if (e.removeEventListener)
      try {
        e.removeEventListener(t, i, !1);
      } catch (e) {}
    n.splice(o, 1);
  },
  _emptySrc: function () {
    return "about:blank";
  },
  addExternalHandler: function (e, t, r) {
    e &&
      ($telerik.useAttachEvent(e)
        ? e.attachEvent("on" + t, r)
        : e.addEventListener && e.addEventListener(t, r, !1));
  },
  removeExternalHandler: function (e, t, r) {
    e &&
      ($telerik.useDetachEvent(e)
        ? e.detachEvent("on" + t, r)
        : e.addEventListener && e.removeEventListener(t, r, !1));
  },
  addMobileHandler: function (e, t, r, i, n, o) {
    if (t && e) {
      var a = Function.createDelegate(e, ($telerik.isTouchDevice && n) || i);
      return (
        $telerik.isTouchDevice
          ? $telerik.$
            ? $telerik.$(t).bind($telerik.getMobileEventCounterpart(r), a)
            : $telerik.addExternalHandler(
                t,
                $telerik.getMobileEventCounterpart(r),
                a,
              )
          : o
            ? $telerik.addExternalHandler(t, r, a)
            : $addHandler(t, r, a),
        a
      );
    }
  },
  removeMobileHandler: function (e, t, r, i, n) {
    e &&
      ($telerik.isTouchDevice
        ? $telerik.$
          ? $telerik.$(e).unbind($telerik.getMobileEventCounterpart(t), i || r)
          : $telerik.removeExternalHandler(
              e,
              $telerik.getMobileEventCounterpart(t),
              i || r,
            )
        : n
          ? $telerik.removeExternalHandler(e, t, r)
          : $removeHandler(e, t, r));
  },
  getMobileEventCounterpart: function (e) {
    switch (e) {
      case "mousedown":
        return $telerik.isMobileIE10 ? "MSPointerDown" : "touchstart";
      case "mouseup":
        return $telerik.isMobileIE10 ? "MSPointerUp" : "touchend";
      case "mousemove":
        return $telerik.isMobileIE10 ? "MSPointerMove" : "touchmove";
    }
    return e;
  },
  getTouchEventLocation: function (e) {
    var t = arguments[1],
      r = t ? [t + "X"] : "pageX",
      i = t ? [t + "Y"] : "pageY",
      n = { x: e[r], y: e[i] },
      o =
        e.changedTouches ||
        (e.originalEvent
          ? e.originalEvent.changedTouches
          : !!e.rawEvent && e.rawEvent.changedTouches);
    return (
      $telerik.isTouchDevice &&
        o &&
        o.length < 2 &&
        ((n.x = o[0][r]), (n.y = o[0][i])),
      $telerik.isMobileIE10 &&
        e.originalEvent &&
        ((n.x = e.originalEvent[r]), (n.y = e.originalEvent[i])),
      n
    );
  },
  getTouchTarget: function (e) {
    if ($telerik.isTouchDevice) {
      var t =
        "originalEvent" in e
          ? e.originalEvent.changedTouches
          : "rawEvent" in e
            ? e.rawEvent.changedTouches
            : e.changedTouches;
      return t
        ? document.elementFromPoint(t[0].clientX, t[0].clientY)
        : e.target;
    }
    return e.target;
  },
  cancelRawEvent: function (e) {
    return !!e && ($telerik.stopPropagation(e), $telerik.preventDefault(e), !1);
  },
  preventDefault: function (e) {
    e.preventDefault && e.preventDefault(), (e.returnValue = !1);
  },
  stopPropagation: function (e) {
    e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0);
  },
  getOuterHtml: function (e) {
    if (e.outerHTML) return e.outerHTML;
    var t = e.cloneNode(!0),
      r = e.ownerDocument.createElement("div");
    return r.appendChild(t), r.innerHTML;
  },
  setVisible: function (e, t) {
    e &&
      t != $telerik.getVisible(e) &&
      (t
        ? e.style.removeAttribute
          ? e.style.removeAttribute("display")
          : e.style.removeProperty("display")
        : (e.style.display = "none"),
      (e.style.visibility = t ? "visible" : "hidden"));
  },
  getVisible: function (e) {
    return (
      !(!e || !e.parentNode) &&
      "none" != $telerik.getCurrentStyle(e, "display") &&
      "hidden" != $telerik.getCurrentStyle(e, "visibility")
    );
  },
  getViewPortSize: function () {
    var e = 0,
      t = 0,
      r = document.body;
    return (
      ((!$telerik.quirksMode && !$telerik.isSafari) ||
        (Telerik.Web.Browser.safari && Telerik.Web.Browser.version >= 13) ||
        (Telerik.Web.Browser.chrome && Telerik.Web.Browser.version >= 61) ||
        (Telerik.Web.Browser.opera && Telerik.Web.Browser.version >= 48)) &&
        ((r = document.documentElement),
        Telerik.Web.Browser.edge && (r = document.body)),
      window.innerWidth
        ? ((e = Math.max(
            document.documentElement.clientWidth,
            document.body.clientWidth,
          )),
          (t = Math.max(
            document.documentElement.clientHeight,
            document.body.clientHeight,
          )),
          e > window.innerWidth && (e = document.documentElement.clientWidth),
          t > window.innerHeight && (t = document.documentElement.clientHeight))
        : ((e = r.clientWidth), (t = r.clientHeight)),
      (e += r.scrollLeft),
      (t += r.scrollTop),
      $telerik.isMobileSafari &&
        ((e += window.pageXOffset), (t += window.pageYOffset)),
      { width: e - 6, height: t - 6 }
    );
  },
  elementOverflowsTop: function (e, t) {
    return (t || $telerik.getLocation(e)).y < 0;
  },
  elementOverflowsLeft: function (e, t) {
    return (t || $telerik.getLocation(e)).x < 0;
  },
  elementOverflowsBottom: function (e, t, r) {
    return (r || $telerik.getLocation(t)).y + t.offsetHeight > e.height;
  },
  elementOverflowsRight: function (e, t, r) {
    return (r || $telerik.getLocation(t)).x + t.offsetWidth > e.width;
  },
  getDocumentRelativeCursorPosition: function (e) {
    var t = document.documentElement,
      r = document.body,
      i =
        $telerik.quirksMode || r.scrollLeft > t.scrollLeft
          ? $telerik.getCorrectScrollLeft(r)
          : $telerik.getCorrectScrollLeft(t),
      n = e.clientX + i,
      o = e.clientY + $telerik.getDocumentElementScrollTop();
    return (
      ($telerik.isIE6 || $telerik.isIE7) && ((n -= 2), (o -= 2)),
      { left: n, top: o }
    );
  },
  getDocumentElementScrollTop: function () {
    var e = document.documentElement,
      t = document.body;
    return $telerik.quirksMode || t.scrollTop > e.scrollTop
      ? t.scrollTop
      : e.scrollTop;
  },
  getDocumentElementScrollLeft: function () {
    var e = document.documentElement,
      t = document.body;
    return $telerik.quirksMode || t.scrollLeft > e.scrollLeft
      ? t.scrollLeft
      : e.scrollLeft;
  },
  evalScriptCode: function (e) {
    $telerik.isSafari && (e = e.replace(/^\s*<!--((.|\n)*)-->\s*$/im, "$1"));
    var t = document.createElement("script");
    t.setAttribute("type", "text/javascript"),
      (t.text = e),
      document.getElementsByTagName("head")[0].appendChild(t),
      t.parentNode.removeChild(t);
  },
  isScriptRegistered: function (e, t) {
    if (!e) return 0;
    t || (t = document),
      null == $telerik._uniqueScripts && ($telerik._uniqueScripts = {});
    var r = document.getElementsByTagName("script"),
      i = 0,
      n = e.indexOf("?d="),
      o = e.indexOf("&"),
      a = n > 0 && o > n ? e.substring(n + 3, o) : e;
    if (null != $telerik._uniqueScripts[a]) return 2;
    for (var l = 0, s = r.length; l < s; l++) {
      var d = r[l];
      d.src &&
        -1 != d.getAttribute("src", 2).indexOf(a) &&
        (($telerik._uniqueScripts[a] = !0), $telerik.isDescendant(t, d) || i++);
    }
    return i;
  },
  evalScripts: function (e, t) {
    $telerik.registerSkins(e);
    for (
      var r = e.getElementsByTagName("script"),
        i = 0,
        n = 0,
        o = function (e, t) {
          if (e - n > 0 && ($telerik.isIE || $telerik.isSafari))
            window.setTimeout(function () {
              o(e, t);
            }, 5);
          else {
            var r = document.createElement("script");
            r.setAttribute("type", "text/javascript"),
              document.getElementsByTagName("head")[0].appendChild(r),
              (r.loadFinished = !1),
              (r.onload = function () {
                this.loadFinished || ((this.loadFinished = !0), n++);
              }),
              (r.onreadystatechange = function () {
                "loaded" !== this.readyState ||
                  this.loadFinished ||
                  ((this.loadFinished = !0), n++);
              }),
              r.setAttribute("src", t);
          }
        },
        a = [],
        l = 0,
        s = r.length;
      l < s;
      l++
    ) {
      var d = r[l];
      if (d.src) {
        var u = d.getAttribute("src", 2);
        $telerik.isScriptRegistered(u, e) || o(i++, u);
      } else Array.add(a, d.innerHTML);
    }
    var c = function () {
      if (i - n > 0) window.setTimeout(c, 20);
      else {
        for (var e = 0; e < a.length; e++) $telerik.evalScriptCode(a[e]);
        t && t();
      }
    };
    c();
  },
  registerSkins: function (e) {
    e || (e = document.body);
    var t = e.getElementsByTagName("link");
    if (t && t.length > 0) {
      var r = document.getElementsByTagName("head")[0];
      if (r)
        for (var i = 0, n = t.length; i < n; i++) {
          var o = t[i];
          if ("Telerik_stylesheet" == o.className) {
            var a = r.getElementsByTagName("link");
            if (o.href.indexOf("ie7CacheFix") >= 0)
              try {
                (o.href = o.href.replace("&ie7CacheFix", "")),
                  (o.href = o.href.replace("?ie7CacheFix", ""));
              } catch (e) {}
            if (a && a.length > 0) {
              for (var l = a.length - 1; l >= 0 && a[l--].href != o.href; );
              if (l >= 0) continue;
            }
            $telerik.isIE &&
              !$telerik.isIE9Mode &&
              (o.parentNode.removeChild(o), (o = o.cloneNode(!0))),
              r.appendChild(o),
              n > t.length && ((n = t.length), i--);
          }
        }
    }
  },
  getFirstChildByTagName: function (e, t, r) {
    if (!e || !e.childNodes) return null;
    for (var i = e.childNodes[r] || e.firstChild; i; ) {
      if (1 == i.nodeType && i.tagName.toLowerCase() == t) return i;
      i = i.nextSibling;
    }
    return null;
  },
  getChildByClassName: function (e, t, r) {
    for (var i = e.childNodes[r] || e.firstChild; i; ) {
      if (1 == i.nodeType && i.className.indexOf(t) > -1) return i;
      i = i.nextSibling;
    }
    return null;
  },
  getChildrenByTagName: function (e, t) {
    var r = [],
      i = e.childNodes;
    $telerik.isIE && (i = e.children);
    for (var n = 0, o = i.length; n < o; n++) {
      var a = i[n];
      1 == a.nodeType && a.tagName.toLowerCase() == t && Array.add(r, a);
    }
    return r;
  },
  getChildrenByClassName: function (e, t) {
    var r = [],
      i = e.childNodes;
    $telerik.isIE && (i = e.children);
    for (var n = 0, o = i.length; n < o; n++) {
      var a = i[n];
      1 == a.nodeType && a.className.indexOf(t) > -1 && Array.add(r, a);
    }
    return r;
  },
  mergeElementAttributes: function (e, t, r) {
    if (e && t) {
      for (var i = 0; i < e.attributes.length; i++) {
        var n = e.attributes[i].nodeValue;
        t.setAttribute(e.attributes[i].nodeName, n);
      }
      "" == t.getAttribute("style") && t.removeAttribute("style");
    }
  },
  isMouseOverElement: function (e, t) {
    var r = $telerik.getBounds(e),
      i = $telerik.getDocumentRelativeCursorPosition(t);
    return $telerik.containsPoint(r, i.left, i.top);
  },
  isMouseOverElementEx: function (e, t) {
    var r = null;
    try {
      r = $telerik.getOuterBounds(e);
    } catch (e) {
      return !1;
    }
    if (t && t.target) {
      var i = t.target.tagName;
      if ("SELECT" == i || "OPTION" == i) return !0;
      if (t.clientX < 0 || t.clientY < 0) return !0;
    }
    var n = $telerik.getDocumentRelativeCursorPosition(t),
      o = $telerik.getBorderBox(e);
    return (
      (r.x += o.left),
      (r.y += o.top),
      (r.width -= o.horizontal),
      (r.height -= o.vertical),
      $telerik.containsPoint(r, n.left, n.top)
    );
  },
  getPreviousHtmlNode: function (e) {
    if (!e || !e.previousSibling) return null;
    for (; e.previousSibling; ) {
      if (1 == e.previousSibling.nodeType) return e.previousSibling;
      e = e.previousSibling;
    }
  },
  getNextHtmlNode: function (e) {
    if (!e || !e.nextSibling) return null;
    for (; e.nextSibling; ) {
      if (1 == e.nextSibling.nodeType) return e.nextSibling;
      e = e.nextSibling;
    }
  },
  disposeElement: function (e) {
    if (void 0 !== Sys.WebForms) {
      var t = Sys.WebForms.PageRequestManager.getInstance();
      t && t._destroyTree
        ? t._destroyTree(e)
        : Sys.Application.disposeElement &&
          Sys.Application.disposeElement(e, !0);
    }
  },
  htmlEncode: function (e) {
    return ("" + e)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },
  htmlDecode: function (e) {
    return ("" + e)
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&amp;/g, "&");
  },
};
null == window.$telerik
  ? (window.$telerik = commonScripts)
  : null != $telerik.$ &&
    $telerik.$.extend &&
    $telerik.$.extend(window.$telerik, commonScripts),
  (window.TelerikCommonScripts = Telerik.Web.CommonScripts = window.$telerik),
  (function (e) {
    function t(e, t) {
      return e.indexOf(t);
    }
    function r(e, t) {
      return e.match(t);
    }
    var i,
      n,
      o = e.navigator.userAgent;
    ($telerik.isTrident = t(o, " Trident/") > -1),
      ($telerik.isSpartan = t(o, " Edge/") > -1),
      ($telerik.isIE = t(o, " MSIE ") > -1 || $telerik.isTrident),
      ($telerik.isFirefox = t(o, " Firefox/") > -1 && !$telerik.isIE),
      $telerik.isIE &&
        (((i = r(o, /MSIE ([\d\.]+)/)) || (i = r(o, /rv:([\d\.]+)/))) &&
          (n = i[1]),
        ($telerik.isIE6 = n < 7),
        ($telerik.isIE7 =
          7 == n || (document.documentMode && 7 == document.documentMode)),
        ($telerik.isIE8 = document.documentMode && 8 == document.documentMode),
        ($telerik.isIE9 = document.documentMode && 9 == document.documentMode),
        ($telerik.isIE9Mode =
          document.documentMode && document.documentMode >= 9),
        ($telerik.isIE10 =
          document.documentMode && 10 == document.documentMode),
        ($telerik.isIE10Mode =
          document.documentMode && document.documentMode >= 10));
  })(window),
  void 0 === Sys.Browser.WebKit && (Sys.Browser.WebKit = {}),
  void 0 === Sys.Browser.Chrome && (Sys.Browser.Chrome = {}),
  navigator.userAgent.indexOf("Chrome") > -1 &&
  !$telerik.isTrident &&
  !$telerik.isSpartan
    ? ((Sys.Browser.version = parseFloat(
        navigator.userAgent.match(/WebKit\/(\d+(\.\d+)?)/i)[1],
      )),
      (Sys.Browser.agent = Sys.Browser.Chrome),
      (Sys.Browser.name = "Chrome"))
    : navigator.userAgent.indexOf("WebKit/") > -1 &&
      !$telerik.isTrident &&
      !$telerik.isSpartan &&
      ((Sys.Browser.version = parseFloat(
        navigator.userAgent.match(/WebKit\/(\d+(\.\d+)?)/i)[1],
      )),
      Sys.Browser.version < 500
        ? ((Sys.Browser.agent = Sys.Browser.Safari),
          (Sys.Browser.name = "Safari"))
        : ((Sys.Browser.agent = Sys.Browser.WebKit),
          (Sys.Browser.name = "WebKit"))),
  ($telerik.isMobileSafari =
    -1 != navigator.userAgent.search(/like\sMac\sOS\sX.*Mobile\/\S+/)),
  ($telerik.isChrome = Sys.Browser.agent == Sys.Browser.Chrome),
  ($telerik.isSafari6 =
    Sys.Browser.agent == Sys.Browser.WebKit && Sys.Browser.version >= 536),
  ($telerik.isSafari5 =
    Sys.Browser.agent == Sys.Browser.WebKit &&
    Sys.Browser.version >= 534 &&
    Sys.Browser.version < 536),
  ($telerik.isSafari4 =
    Sys.Browser.agent == Sys.Browser.WebKit &&
    Sys.Browser.version >= 526 &&
    Sys.Browser.version < 534),
  ($telerik.isSafari3 =
    Sys.Browser.agent == Sys.Browser.WebKit &&
    Sys.Browser.version < 526 &&
    Sys.Browser.version > 500),
  ($telerik.isSafari2 = !1),
  ($telerik.isSafari =
    $telerik.isSafari2 ||
    $telerik.isSafari3 ||
    $telerik.isSafari4 ||
    $telerik.isSafari5 ||
    $telerik.isSafari6 ||
    $telerik.isChrome),
  ($telerik.isAndroid =
    -1 != navigator.userAgent.search(/Android/i) &&
    !($telerik.isTrident || $telerik.isSpartan)),
  ($telerik.isBlackBerry4 =
    -1 != navigator.userAgent.search(/BlackBerry\d+\/4[\d\.]+/i)),
  ($telerik.isBlackBerry5 =
    -1 != navigator.userAgent.search(/BlackBerry\d+\/5[\d\.]+/i)),
  ($telerik.isBlackBerry6 =
    -1 != navigator.userAgent.search(/BlackBerry.*Safari\/\S+/i)),
  ($telerik.isBlackBerry =
    $telerik.isBlackBerry4 || $telerik.isBlackBerry5 || $telerik.isBlackBerry6),
  ($telerik.isOpera = Sys.Browser.agent == Sys.Browser.Opera),
  ($telerik.isFirefox2 = $telerik.isFirefox && Sys.Browser.version < 3),
  ($telerik.isFirefox3 = $telerik.isFirefox && Sys.Browser.version >= 3),
  ($telerik.quirksMode = $telerik.isIE && "CSS1Compat" != document.compatMode),
  ($telerik.standardsMode = !$telerik.quirksMode),
  ($telerik.OperaEngine = 0),
  ($telerik.OperaVersionString = window.opera ? window.opera.version() : 0),
  ($telerik.OperaVersion = $telerik.OperaVersionString
    ? parseInt(10 * $telerik.OperaVersionString, 10) / 10
    : 0),
  $telerik.isOpera &&
    (($telerik._prestoVersion = navigator.userAgent.match(
      /Presto\/(\d+\.(\d+)?)/,
    )),
    $telerik._prestoVersion &&
      ($telerik.OperaEngine =
        parseInt($telerik._prestoVersion[1], 10) +
        parseInt($telerik._prestoVersion[2], 10) / 100)),
  ($telerik.isOpera9 = $telerik.isOpera && $telerik.OperaVerNumber < 10),
  ($telerik.isOpera10 =
    $telerik.isOpera &&
    $telerik.OperaVersion >= 10 &&
    $telerik.OperaVersion < 10.5),
  ($telerik.isOpera105 = $telerik.isOpera && $telerik.OperaVersion >= 10.5),
  ($telerik.isOpera11 = $telerik.isOpera && $telerik.OperaVersion > 11),
  ($telerik.isMobileOpera =
    $telerik.isOpera &&
    -1 != navigator.userAgent.search(/opera (?:mobi|tablet)/i)),
  ($telerik.isMobileIE10 =
    $telerik.isIE10Mode &&
    -1 != navigator.userAgent.search(/\bARM\b;|\bTouch\b/i)),
  ($telerik.isTouchDevice =
    (navigator.userAgent.indexOf("Macintosh") > -1 &&
      navigator.maxTouchPoints > 0) ||
    $telerik.isMobileSafari ||
    $telerik.isAndroid ||
    $telerik.isBlackBerry6 ||
    $telerik.isMobileOpera),
  ($telerik.isMagicKeyboard = (function () {
    var e = $telerik.isTouchDevice,
      t = matchMedia("(pointer:fine)").matches;
    return e && t;
  })()),
  $telerik.isIE9Mode && (document.documentElement.className += " _Telerik_IE9"),
  $telerik.isOpera11
    ? (document.documentElement.className += " _Telerik_Opera11")
    : $telerik.isOpera105 &&
      (document.documentElement.className += " _Telerik_Opera105"),
  ($telerik.cssVendorPrefix = (function () {
    var e = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
      t = "",
      r = document.createElement("div");
    for (var i in r.style) e.test(i) && (t = i.match(e)[0]);
    return (
      !t && "WebkitOpacity" in r.style && (t = "Webkit"),
      !t && "KhtmlOpacity" in r.style && (t = "Khtml"),
      (r = null),
      t
    );
  })()),
  (function (e, t) {
    var r,
      i,
      n = /-([\da-z])/gi,
      o = new RegExp(
        "^(" + /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source + ")(?!px)[a-z%]+$",
        "i",
      ),
      a = /^(top|right|bottom|left)$/;
    function l(e, t) {
      return t.toUpperCase();
    }
    e.getComputedStyle
      ? ((r = function (e) {
          return e.ownerDocument.defaultView.getComputedStyle(e, null);
        }),
        (i = function (e, i) {
          var n = r(e);
          return n ? n.getPropertyValue(i) || n[i] : t;
        }))
      : document.documentElement.currentStyle &&
        ((r = function (e) {
          return e.currentStyle;
        }),
        (i = function (e, i) {
          var n,
            l,
            s,
            d,
            u = r(e),
            c = e.style;
          return (
            null === (d = u ? u[i] : t) && c && c[i] && (d = c[i]),
            o.test(d) &&
              !a.test(i) &&
              ((s = c.left),
              (l = (n = e.runtimeStyle) && n.left) &&
                (n.left = e.currentStyle.left),
              (c.left = "fontSize" === i ? "1em" : d),
              (d = c.pixelLeft + "px"),
              (c.left = s),
              l && (n.left = l)),
            d
          );
        })),
      ($telerik.getComputedStyle = function (e, t, r) {
        var o = t.replace(n, l),
          a = null;
        return (
          e &&
            ((t = (function (e, t) {
              if (t in e) return t;
              var r = t.charAt(0).toUpperCase() + t.slice(1),
                i = t;
              return (t = $telerik.cssVendorPrefix + r) in e ? t : i;
            })(e.style, o)),
            (a = i(e, t)) || 0 === a || (a = void 0 !== r ? r : null)),
          a
        );
      }),
      ($telerik.getCurrentStyle = function (e, t, r) {
        return $telerik.getComputedStyle(e, t, r);
      });
  })(window),
  document.documentElement.getBoundingClientRect
    ? ($telerik.originalGetLocation = function (e) {
        var t = Function._validateParams(arguments, [
          { name: "element", domElement: !0 },
        ]);
        if (t) throw t;
        if (
          e.self ||
          9 === e.nodeType ||
          e === document.documentElement ||
          e.parentNode === e.ownerDocument.documentElement
        )
          return new Telerik.Web.UI.Point(0, 0);
        var r = e.getBoundingClientRect();
        if (!r) return new Telerik.Web.UI.Point(0, 0);
        var i = e.ownerDocument.documentElement,
          n = Math.round(r.left) + i.scrollLeft,
          o = Math.round(r.top) + i.scrollTop;
        if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
          try {
            var a = e.ownerDocument.parentWindow.frameElement || null;
            if (a) {
              var l = "0" === a.frameBorder || "no" === a.frameBorder ? 2 : 0;
              (n += l), (o += l);
            }
          } catch (e) {}
          if (7 === Sys.Browser.version && !document.documentMode) {
            var s = document.body,
              d = s.getBoundingClientRect(),
              u = (d.right - d.left) / s.clientWidth;
            (u = ((u = Math.round(100 * u)) - (u % 5)) / 100),
              isNaN(u) ||
                1 === u ||
                ((n = Math.round(n / u)), (o = Math.round(o / u)));
          }
          (document.documentMode || 0) < 8 &&
            ((n -= i.clientLeft), (o -= i.clientTop));
        }
        return new Telerik.Web.UI.Point(n, o);
      })
    : $telerik.isSafari
      ? ($telerik.originalGetLocation = function (e) {
          var t = Function._validateParams(arguments, [
            { name: "element", domElement: !0 },
          ]);
          if (t) throw t;
          if ((e.window && e.window === e) || 9 === e.nodeType)
            return new Telerik.Web.UI.Point(0, 0);
          var r,
            i,
            n,
            o = 0,
            a = 0,
            l = null,
            s = null;
          for (r = e; r; l = r, s = i, r = r.offsetParent)
            (i = Sys.UI.DomElement._getCurrentStyle(r)),
              (n = r.tagName ? r.tagName.toUpperCase() : null),
              (!r.offsetLeft && !r.offsetTop) ||
                ("BODY" === n && s && "absolute" === s.position) ||
                ((o += r.offsetLeft), (a += r.offsetTop)),
              l &&
                Sys.Browser.version >= 3 &&
                ((o += parseInt(i.borderLeftWidth, 10)),
                (a += parseInt(i.borderTopWidth, 10)));
          var d = (i = Sys.UI.DomElement._getCurrentStyle(e))
            ? i.position
            : null;
          if (!d || "absolute" !== d)
            for (r = e.parentNode; r; r = r.parentNode) {
              "BODY" !== (n = r.tagName ? r.tagName.toUpperCase() : null) &&
                "HTML" !== n &&
                (r.scrollLeft || r.scrollTop) &&
                ((o -= r.scrollLeft || 0), (a -= r.scrollTop || 0));
              var u = (i = Sys.UI.DomElement._getCurrentStyle(r))
                ? i.position
                : null;
              if (u && "absolute" === u) break;
            }
          return new Telerik.Web.UI.Point(o, a);
        })
      : ($telerik.originalGetLocation = function (e) {
          var t = Function._validateParams(arguments, [
            { name: "element", domElement: !0 },
          ]);
          if (t) throw t;
          if ((e.window && e.window === e) || 9 === e.nodeType)
            return new Telerik.Web.UI.Point(0, 0);
          var r,
            i,
            n = 0,
            o = 0,
            a = null,
            l = null,
            s = null;
          for (r = e; r; a = r, l = s, r = r.offsetParent)
            (i = r.tagName ? r.tagName.toUpperCase() : null),
              (s = Sys.UI.DomElement._getCurrentStyle(r)),
              (r.offsetLeft || r.offsetTop) &&
                ("BODY" !== i || (l && "absolute" === l.position)) &&
                ((n += r.offsetLeft), (o += r.offsetTop)),
              null !== a &&
                s &&
                ("TABLE" !== i &&
                  "TD" !== i &&
                  "HTML" !== i &&
                  ((n += parseInt(s.borderLeftWidth, 10) || 0),
                  (o += parseInt(s.borderTopWidth, 10) || 0)),
                "TABLE" !== i ||
                  ("relative" !== s.position && "absolute" !== s.position) ||
                  ((n += parseInt(s.marginLeft, 10) || 0),
                  (o += parseInt(s.marginTop, 10) || 0)));
          var d = (s = Sys.UI.DomElement._getCurrentStyle(e))
            ? s.position
            : null;
          if (!d || "absolute" !== d)
            for (r = e.parentNode; r; r = r.parentNode)
              "BODY" !== (i = r.tagName ? r.tagName.toUpperCase() : null) &&
                "HTML" !== i &&
                (r.scrollLeft || r.scrollTop) &&
                ((n -= r.scrollLeft || 0),
                (o -= r.scrollTop || 0),
                (s = Sys.UI.DomElement._getCurrentStyle(r)) &&
                  ((n += parseInt(s.borderLeftWidth, 10) || 0),
                  (o += parseInt(s.borderTopWidth, 10) || 0)));
          return new Telerik.Web.UI.Point(n, o);
        }),
  Sys.Application.add_init(function () {
    try {
      $telerik._borderThickness();
    } catch (e) {}
  }),
  (Telerik.Web.UI.Orientation = function () {
    throw Error.invalidOperation();
  }),
  (Telerik.Web.UI.Orientation.prototype = { Horizontal: 0, Vertical: 1 }),
  Telerik.Web.UI.Orientation.registerEnum("Telerik.Web.UI.Orientation", !1),
  (Telerik.Web.UI.RenderMode = function () {
    throw Error.invalidOperation();
  }),
  (Telerik.Web.UI.RenderMode.prototype = {
    Auto: 0,
    Classic: 1,
    Lite: 2,
    Native: 3,
    Mobile: 4,
  }),
  Telerik.Web.UI.RenderMode.registerEnum("Telerik.Web.UI.RenderMode", !1),
  (Telerik.Web.UI.DayOfWeek = function () {
    throw Error.invalidOperation();
  }),
  (Telerik.Web.UI.DayOfWeek.prototype = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  }),
  Telerik.Web.UI.DayOfWeek.registerEnum("Telerik.Web.UI.DayOfWeek", !1),
  (Telerik.Web.UI.RadWebControl = function (e) {
    Telerik.Web.UI.RadWebControl.initializeBase(this, [e]),
      (this._clientStateFieldID = null),
      (this._renderMode = Telerik.Web.UI.RenderMode.Classic),
      (this._shouldUpdateClientState = !0),
      (this._invisibleParents = []),
      (this._enableRippleEffect = !1);
  }),
  (Telerik.Web.UI.RadWebControl.prototype = {
    initialize: function () {
      if (
        (Telerik.Web.UI.RadWebControl.callBaseMethod(this, "initialize"),
        $telerik.registerControl(this),
        this._registerToMaterialRippleManager(),
        this.get_clientStateFieldID())
      ) {
        var e = $get(this.get_clientStateFieldID());
        e && e.setAttribute("autocomplete", "off");
      }
    },
    dispose: function () {
      $telerik.unregisterControl(this), this._disposeMaterialRipples();
      var e = this.get_element();
      if (
        (this._clearParentShowHandlers(),
        Telerik.Web.UI.RadWebControl.callBaseMethod(this, "dispose"),
        e)
      ) {
        e.control = null;
        var t = !0;
        if (e._events) {
          for (var r in e._events)
            if (e._events[r].length > 0) {
              t = !1;
              break;
            }
          t && (e._events = null);
        }
      }
    },
    raiseEvent: function (e, t) {
      var r = this.get_events().getHandler(e);
      r && (t || (t = Sys.EventArgs.Empty), r(this, t));
    },
    updateClientState: function () {
      this._shouldUpdateClientState &&
        this.set_clientState(this.saveClientState());
    },
    saveClientState: function () {
      return null;
    },
    get_clientStateFieldID: function () {
      return this._clientStateFieldID;
    },
    set_clientStateFieldID: function (e) {
      this._clientStateFieldID != e &&
        ((this._clientStateFieldID = e),
        this.raisePropertyChanged("ClientStateFieldID"));
    },
    get_renderMode: function () {
      return this._renderMode;
    },
    set_renderMode: function (e) {
      this._renderMode != e &&
        ((this._renderMode = e), this.raisePropertyChanged("RenderMode"));
    },
    get_clientState: function () {
      if (this._clientStateFieldID) {
        var e = document.getElementById(this._clientStateFieldID);
        if (e) return e.value;
      }
      return null;
    },
    set_clientState: function (e) {
      if (this._clientStateFieldID) {
        var t = document.getElementById(this._clientStateFieldID);
        t && (t.value = e);
      }
    },
    get_enabled: function () {
      return this._enabled;
    },
    set_enabled: function (e) {
      this._enabled = e;
    },
    repaint: function () {},
    canRepaint: function () {
      return this.get_element() && this.get_element().offsetWidth > 0;
    },
    _renderWm: function (e) {
      if (
        e &&
        (void 0 === $telerik.$ && ($telerik.$ = window.jQuery || window.$),
        $telerik.$)
      ) {
        var t = $telerik.$(e).find(".wm");
        if (t.length > 0)
          $telerik.$(e).css("position", "relative"),
            $telerik
              .$("<div></div>")
              .appendTo(e)
              .css({
                position: "absolute",
                width: "100%",
                height: "100%",
                "pointer-events": "none",
                inset: "0px",
              })[0]
              .attachShadow({ mode: "closed" })
              .append(t[0]),
            t[0].removeAttribute("class"),
            t.show();
      }
    },
    add_parentShown: function (e) {
      var t = $telerik.getInvisibleParent(e);
      t &&
        (Array.contains(this._invisibleParents, t) ||
          (Array.add(this._invisibleParents, t),
          this._handleHiddenParent(!0, t)));
    },
    remove_parentShown: function (e) {
      Array.remove(this._invisibleParents, e), this._handleHiddenParent(!1, e);
    },
    _registerToMaterialRippleManager: function () {
      if (this._enableRippleEffect && Telerik.Web.UI.MaterialRippleManager) {
        var e = Telerik.Web.UI.MaterialRippleManager.getInstance();
        e && ((this._materialRippleManager = e), e.get_controls().push(this));
      }
    },
    _disposeMaterialRipples: function () {
      this._enableRippleEffect &&
        Telerik.Web.UI.MaterialRippleManager &&
        Telerik.Web.UI.MaterialRippleManager.getInstance() &&
        Telerik.Web.UI.MaterialRippleManager.getInstance().disposeControl(this);
    },
    _handleHiddenParent: function (e, t) {
      if (t) {
        this._parentShowDelegate ||
          (this._parentShowDelegate = Function.createDelegate(
            this,
            this._parentShowHandler,
          ));
        var r = this._parentShowDelegate;
        e
          ? (this.parentShownObserver ||
              (this.parentShownObserver =
                new Telerik.Web.UI.NodeMutationObserver(r)),
            this.parentShownObserver.observe(t, {
              attributes: !0,
              attributeOldValue: !0,
              attributeFilter: ["style", "class"],
              subtree: !1,
            }))
          : this.parentShownObserver &&
            (this.parentShownObserver.disconnect(t),
            this.parentShownObserver.isEmpty() &&
              (this.parentShownObserver.dispose(),
              (this.parentShownObserver = null)));
      }
    },
    _parentShowHandler: function (e) {
      if (null === e.length || isNaN(e.length)) {
        if ($telerik.isIE) {
          if (
            (e.rawEvent && (e = e.rawEvent),
            !e || !e.srcElement || !e.propertyName)
          )
            return;
          var t = e.srcElement;
          if (
            "style.display" == e.propertyName ||
            "className" == e.propertyName
          )
            "none" != $telerik.getCurrentStyle(t, "display") &&
              ((e.target = t), this._runWhenParentShows(e));
        } else if ("style" == e.attrName || "class" == e.attrName) {
          //! class must be used, not className!
          var r = e.target;
          e.currentTarget == e.target &&
            "none" != $telerik.getCurrentStyle(r, "display") &&
            window.setTimeout(
              Function.createDelegate(this, function () {
                this._runWhenParentShows(e);
              }),
              0,
            );
        }
      } else {
        var i = this;
        Array.forEach(e, function (e) {
          if ("style" == e.attributeName || "class" == e.attributeName) {
            var t = e.target;
            "none" != $telerik.getCurrentStyle(t, "display") &&
              i._runWhenParentShows(e);
          }
        });
      }
    },
    _runWhenParentShows: function (e) {
      var t = e.target;
      this.remove_parentShown(t), this.repaint();
    },
    _clearParentShowHandlers: function () {
      for (var e = this._invisibleParents, t = 0; t < e.length; t++)
        this.remove_parentShown(e[t]);
      (this._invisibleParents = []), (this._parentShowDelegate = null);
    },
    _getChildElement: function (e) {
      return $get(this.get_id() + "_" + e);
    },
    _findChildControl: function (e) {
      return $find(this.get_id() + "_" + e);
    },
  }),
  Telerik.Web.UI.RadWebControl.registerClass(
    "Telerik.Web.UI.RadWebControl",
    Sys.UI.Control,
  ),
  (Telerik.Web.Timer = function () {
    Telerik.Web.Timer.initializeBase(this),
      (this._interval = 1e3),
      (this._enabled = !1),
      (this._timer = null),
      (this._timerCallbackDelegate = Function.createDelegate(
        this,
        this._timerCallback,
      ));
  }),
  (Telerik.Web.Timer.prototype = {
    get_interval: function () {
      return this._interval;
    },
    set_interval: function (e) {
      this._interval !== e &&
        ((this._interval = e),
        this.raisePropertyChanged("interval"),
        this.get_isUpdating() ||
          null === this._timer ||
          (this._stopTimer(), this._startTimer()));
    },
    get_enabled: function () {
      return this._enabled;
    },
    set_enabled: function (e) {
      e !== this.get_enabled() &&
        ((this._enabled = e),
        this.raisePropertyChanged("enabled"),
        this.get_isUpdating() || (e ? this._startTimer() : this._stopTimer()));
    },
    add_tick: function (e) {
      this.get_events().addHandler("tick", e);
    },
    remove_tick: function (e) {
      this.get_events().removeHandler("tick", e);
    },
    dispose: function () {
      this.set_enabled(!1),
        this._stopTimer(),
        Telerik.Web.Timer.callBaseMethod(this, "dispose");
    },
    updated: function () {
      Telerik.Web.Timer.callBaseMethod(this, "updated"),
        this._enabled && (this._stopTimer(), this._startTimer());
    },
    _timerCallback: function () {
      var e = this.get_events().getHandler("tick");
      e && e(this, Sys.EventArgs.Empty);
    },
    _startTimer: function () {
      this._timer = window.setInterval(
        this._timerCallbackDelegate,
        this._interval,
      );
    },
    _stopTimer: function () {
      window.clearInterval(this._timer), (this._timer = null);
    },
  }),
  Telerik.Web.Timer.registerClass("Telerik.Web.Timer", Sys.Component),
  (Telerik.Web.BoxSide = function () {}),
  (Telerik.Web.BoxSide.prototype = { Top: 0, Right: 1, Bottom: 2, Left: 3 }),
  Telerik.Web.BoxSide.registerEnum("Telerik.Web.BoxSide", !1),
  (Telerik.Web.UI.WebServiceLoaderEventArgs = function (e) {
    Telerik.Web.UI.WebServiceLoaderEventArgs.initializeBase(this),
      (this._context = e);
  }),
  (Telerik.Web.UI.WebServiceLoaderEventArgs.prototype = {
    get_context: function () {
      return this._context;
    },
  }),
  Telerik.Web.UI.WebServiceLoaderEventArgs.registerClass(
    "Telerik.Web.UI.WebServiceLoaderEventArgs",
    Sys.EventArgs,
  ),
  (Telerik.Web.UI.WebServiceLoaderSuccessEventArgs = function (e, t) {
    Telerik.Web.UI.WebServiceLoaderSuccessEventArgs.initializeBase(this, [t]),
      (this._data = e);
  }),
  (Telerik.Web.UI.WebServiceLoaderSuccessEventArgs.prototype = {
    get_data: function () {
      return this._data;
    },
  }),
  Telerik.Web.UI.WebServiceLoaderSuccessEventArgs.registerClass(
    "Telerik.Web.UI.WebServiceLoaderSuccessEventArgs",
    Telerik.Web.UI.WebServiceLoaderEventArgs,
  ),
  (Telerik.Web.UI.WebServiceLoaderErrorEventArgs = function (e, t) {
    Telerik.Web.UI.WebServiceLoaderErrorEventArgs.initializeBase(this, [t]),
      (this._message = e);
  }),
  (Telerik.Web.UI.WebServiceLoaderErrorEventArgs.prototype = {
    get_message: function () {
      return this._message;
    },
  }),
  Telerik.Web.UI.WebServiceLoaderErrorEventArgs.registerClass(
    "Telerik.Web.UI.WebServiceLoaderErrorEventArgs",
    Telerik.Web.UI.WebServiceLoaderEventArgs,
  ),
  (Telerik.Web.UI.WebServiceLoader = function (e) {
    (this._webServiceSettings = e),
      (this._events = null),
      (this._onWebServiceSuccessDelegate = Function.createDelegate(
        this,
        this._onWebServiceSuccess,
      )),
      (this._onWebServiceErrorDelegate = Function.createDelegate(
        this,
        this._onWebServiceError,
      )),
      (this._currentRequest = null);
  }),
  (Telerik.Web.UI.WebServiceLoader.prototype = {
    get_webServiceSettings: function () {
      return this._webServiceSettings;
    },
    get_events: function () {
      return (
        this._events || (this._events = new Sys.EventHandlerList()),
        this._events
      );
    },
    loadData: function (e, t) {
      var r = this.get_webServiceSettings();
      this.invokeMethod(r.get_method(), e, t);
    },
    invokeMethod: function (e, t, r) {
      var i = this.get_webServiceSettings();
      if (i.get_isEmpty())
        alert("Please, specify valid web service and method.");
      else {
        this._raiseEvent(
          "loadingStarted",
          new Telerik.Web.UI.WebServiceLoaderEventArgs(r),
        );
        var n = i.get_path(),
          o = i.get_useHttpGet();
        this._currentRequest = Sys.Net.WebServiceProxy.invoke(
          n,
          e,
          o,
          t,
          this._onWebServiceSuccessDelegate,
          this._onWebServiceErrorDelegate,
          r,
        );
      }
    },
    add_loadingStarted: function (e) {
      this.get_events().addHandler("loadingStarted", e);
    },
    add_loadingError: function (e) {
      this.get_events().addHandler("loadingError", e);
    },
    add_loadingSuccess: function (e) {
      this.get_events().addHandler("loadingSuccess", e);
    },
    _serializeDictionaryAsKeyValuePairs: function (e) {
      var t = [];
      for (var r in e) t[t.length] = { Key: r, Value: e[r] };
      return t;
    },
    _onWebServiceSuccess: function (e, t) {
      var r = new Telerik.Web.UI.WebServiceLoaderSuccessEventArgs(e, t);
      this._raiseEvent("loadingSuccess", r);
    },
    _onWebServiceError: function (e, t) {
      var r = new Telerik.Web.UI.WebServiceLoaderErrorEventArgs(
        e.get_message(),
        t,
      );
      this._raiseEvent("loadingError", r);
    },
    _raiseEvent: function (e, t) {
      var r = this.get_events().getHandler(e);
      r && (t || (t = Sys.EventArgs.Empty), r(this, t));
    },
  }),
  Telerik.Web.UI.WebServiceLoader.registerClass(
    "Telerik.Web.UI.WebServiceLoader",
  ),
  (Telerik.Web.UI.WebServiceSettings = function (e) {
    (this._path = null),
      (this._method = null),
      (this._useHttpGet = !1),
      (this._odata = !1),
      e || (e = {}),
      void 0 !== e.path && (this._path = e.path),
      void 0 !== e.method && (this._method = e.method),
      void 0 !== e.useHttpGet && (this._useHttpGet = e.useHttpGet);
  }),
  (Telerik.Web.UI.WebServiceSettings.prototype = {
    get_isWcf: function () {
      return /\.svc($|\/)/.test(this._path) && !this.get_isOData();
    },
    get_isOData: function () {
      return this._odata;
    },
    get_path: function () {
      return this._path;
    },
    set_path: function (e) {
      this._path = e;
    },
    get_method: function () {
      return this._method;
    },
    set_method: function (e) {
      this._method = e;
    },
    get_useHttpGet: function () {
      return this._useHttpGet;
    },
    set_useHttpGet: function (e) {
      this._useHttpGet = e;
    },
    get_isEmpty: function () {
      var e = this.get_path(),
        t = this.get_method();
      return !(e && t);
    },
  }),
  Telerik.Web.UI.WebServiceSettings.registerClass(
    "Telerik.Web.UI.WebServiceSettings",
  ),
  (Telerik.Web.UI.CallbackLoader = function (e) {
    this._callbackSettings = e;
  }),
  (Telerik.Web.UI.CallbackLoader.prototype = {
    invokeCallbackMethod: function () {
      WebForm_DoCallback(
        this._callbackSettings._id,
        this._callbackSettings._arguments,
        this._callbackSettings._onCallbackSuccess,
        this._callbackSettings._context,
        this._callbackSettings._onCallbackError,
        this._callbackSettings._isAsync,
      );
    },
  }),
  Telerik.Web.UI.CallbackLoader.registerClass("Telerik.Web.UI.CallbackLoader"),
  (Telerik.Web.UI.CallbackSettings = function (e) {
    (this._id = e.id),
      (this._arguments = e.arguments),
      (this._onCallbackSuccess = e.onCallbackSuccess),
      (this._context = e.context),
      (this._onCallbackError = e.onCallbackError),
      (this._isAsync = e.isAsync);
  }),
  Telerik.Web.UI.CallbackSettings.registerClass(
    "Telerik.Web.UI.CallbackSettings",
  ),
  (Telerik.Web.UI.WaiAriaDecorator = function (e, t) {
    (this._element = e), (this._ariaSettings = t);
  }),
  (Telerik.Web.UI.WaiAriaDecorator.prototype = {
    setAttributes: function () {
      var e = this.get_ariaSettings();
      for (var t in e) {
        var r = e[t];
        r && this.get_element().setAttribute(t, r);
      }
    },
    get_element: function () {
      return this._element;
    },
    set_element: function (e) {
      this._element = e;
    },
    get_ariaSettings: function () {
      return this._ariaSettings;
    },
    set_ariaSettings: function (e) {
      this._ariaSettings = e;
    },
  }),
  Telerik.Web.UI.WaiAriaDecorator.registerClass(
    "Telerik.Web.UI.WaiAriaDecorator",
  ),
  (Telerik.Web.UI.KeyboardNavigationSettings = function (e, t) {
    (this._element = e), (this._navigationSettings = t);
  }),
  (Telerik.Web.UI.KeyboardNavigationSettings.prototype = {
    initialize: function () {
      var e = this,
        t = Sys.Serialization.JavaScriptSerializer.deserialize(
          this._navigationSettings,
        ),
        r = (this._keyboardNavigationHandler = function (r) {
          if (
            e.isModifierSatisfied(t.commandKey, r) &&
            r.keyCode === t.focusKey
          ) {
            var i = $telerik.$(e.get_element());
            i.is("a,input,select,button,iframe") ||
              i.attr("tabindex") ||
              i.attr("tabindex", "0"),
              i.focus();
          }
        });
      $telerik.$(document.body).on("keydown", r);
    },
    dispose: function () {
      $telerik.$(document.body).off("keydown", this._keyboardNavigationHandler);
    },
    get_element: function () {
      return this._element;
    },
    set_element: function (e) {
      this._element = e;
    },
    get_navigationSettings: function () {
      return this._navigationSettings;
    },
    set_navigationSettings: function (e) {
      this._navigationSettings = e;
    },
    isModifierSatisfied: function (e, t) {
      var r = Telerik.Web.UI.KeyboardModifier,
        i = t.altKey === (4 & e) > 0,
        n = t.ctrlKey === (2 & e) > 0,
        o = t.shiftKey === (8 & e) > 0,
        a = i && n && o;
      return e & r.None && (a = !1), e & r.Cmd && (a = t.metaKey), a;
    },
  }),
  Telerik.Web.UI.KeyboardNavigationSettings.registerClass(
    "Telerik.Web.UI.KeyboardNavigationSettings",
  ),
  (Telerik.Web.UI.KeyboardModifier = function () {
    throw Error.invalidOperation();
  }),
  (Telerik.Web.UI.KeyboardModifier.prototype = {
    None: 1,
    Ctrl: 2,
    Alt: 4,
    AltCtrl: 6,
    Shift: 8,
    CtrlShift: 10,
    AltShift: 12,
    Cmd: 16,
  }),
  Telerik.Web.UI.KeyboardModifier.registerEnum(
    "Telerik.Web.UI.KeyboardModifier",
    !1,
  ),
  (Telerik.Web.UI.ActionsManager = function (e) {
    Telerik.Web.UI.ActionsManager.initializeBase(this),
      (this._actions = []),
      (this._currentActionIndex = -1);
  }),
  (Telerik.Web.UI.ActionsManager.prototype = {
    get_actions: function () {
      return this._actions;
    },
    shiftPointerLeft: function () {
      this._currentActionIndex--;
    },
    shiftPointerRight: function () {
      this._currentActionIndex++;
    },
    get_currentAction: function () {
      return this.get_actions()[this._currentActionIndex];
    },
    get_nextAction: function () {
      return this.get_actions()[this._currentActionIndex + 1];
    },
    addAction: function (e) {
      if (e) {
        var t = new Telerik.Web.UI.ActionsManagerEventArgs(e);
        return (
          this.raiseEvent("executeAction", t),
          this._clearActionsToRedo(),
          Array.add(this._actions, e),
          (this._currentActionIndex = this._actions.length - 1),
          !0
        );
      }
      return !1;
    },
    undo: function (e) {
      null == e && (e = 1),
        e > this._actions.length && (e = this._actions.length);
      for (
        var t = null;
        0 < e-- &&
        0 <= this._currentActionIndex &&
        this._currentActionIndex < this._actions.length;

      )
        if ((t = this._actions[this._currentActionIndex--])) {
          var r = new Telerik.Web.UI.ActionsManagerEventArgs(t);
          this.raiseEvent("undoAction", r);
        }
    },
    redo: function (e) {
      null == e && (e = 1),
        e > this._actions.length && (e = this._actions.length);
      for (
        var t = null, r = this._currentActionIndex + 1;
        0 < e-- && 0 <= r && r < this._actions.length;

      ) {
        if ((t = this._actions[r])) {
          var i = new Telerik.Web.UI.ActionsManagerEventArgs(t);
          this.raiseEvent("redoAction", i), (this._currentActionIndex = r);
        }
        r++;
      }
    },
    removeActionAt: function (e) {
      this._actions.splice(e, 1),
        this._currentActionIndex >= e && this._currentActionIndex--;
    },
    canUndo: function () {
      return -1 < this._currentActionIndex;
    },
    canRedo: function () {
      return this._currentActionIndex < this._actions.length - 1;
    },
    getActionsToUndo: function () {
      return this.canUndo()
        ? this._actions.slice(0, this._currentActionIndex + 1).reverse()
        : [];
    },
    getActionsToRedo: function () {
      return this.canRedo()
        ? this._actions.slice(this._currentActionIndex + 1)
        : [];
    },
    _clearActionsToRedo: function () {
      if (this.canRedo()) {
        var e = this._currentActionIndex + 2;
        e < this._actions.length &&
          this._actions.splice(e, this._actions.length - e);
      }
    },
    add_undoAction: function (e) {
      this.get_events().addHandler("undoAction", e);
    },
    remove_undoAction: function (e) {
      this.get_events().removeHandler("undoAction", e);
    },
    add_redoAction: function (e) {
      this.get_events().addHandler("redoAction", e);
    },
    remove_redoAction: function (e) {
      this.get_events().removeHandler("redoAction", e);
    },
    add_executeAction: function (e) {
      this.get_events().addHandler("executeAction", e);
    },
    remove_executeAction: function (e) {
      this.get_events().removeHandler("executeAction", e);
    },
    raiseEvent: function (e, t) {
      var r = this.get_events().getHandler(e);
      r && r(this, t);
    },
  }),
  Telerik.Web.UI.ActionsManager.registerClass(
    "Telerik.Web.UI.ActionsManager",
    Sys.Component,
  ),
  (Telerik.Web.UI.ActionsManagerEventArgs = function (e) {
    Telerik.Web.UI.ActionsManagerEventArgs.initializeBase(this),
      (this._action = e);
  }),
  (Telerik.Web.UI.ActionsManagerEventArgs.prototype = {
    get_action: function () {
      return this._action;
    },
  }),
  Telerik.Web.UI.ActionsManagerEventArgs.registerClass(
    "Telerik.Web.UI.ActionsManagerEventArgs",
    Sys.CancelEventArgs,
  ),
  (Telerik.Web.StringBuilder = function (e) {
    this._buffer = e || [];
  }),
  (Telerik.Web.StringBuilder.prototype = {
    append: function (e) {
      for (var t = 0; t < arguments.length; t++)
        this._buffer[this._buffer.length] = arguments[t];
      return this;
    },
    toString: function () {
      return this._buffer.join("");
    },
    get_buffer: function () {
      return this._buffer;
    },
  }),
  (Telerik.Web.UI.RadTemplateBoundEventArgs = function (e, t, r) {
    Telerik.Web.UI.RadTemplateBoundEventArgs.initializeBase(this),
      (this._dataItem = e),
      (this._template = t),
      (this._html = r);
  }),
  (Telerik.Web.UI.RadTemplateBoundEventArgs.prototype = {
    get_dataItem: function () {
      return this._dataItem;
    },
    set_html: function (e) {
      this._html = e;
    },
    get_html: function (e) {
      return this._html;
    },
    get_template: function (e) {
      return this._template;
    },
  }),
  Telerik.Web.UI.RadTemplateBoundEventArgs.registerClass(
    "Telerik.Web.UI.RadTemplateBoundEventArgs",
    Sys.EventArgs,
  ),
  (function () {
    function e(e, t) {
      if (t)
        return (
          "'" +
          e
            .split("'")
            .join("\\'")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\t/g, "\\t") +
          "'"
        );
      var r = e.charAt(0),
        i = e.substring(1);
      return "=" === r
        ? "+(" + i + ")+"
        : ":" === r
          ? "+e(" + i + ")+"
          : ";" + e + ";o+=";
    }
    var t = /^\w+/,
      r = /\${([^}]*)}/g,
      i = /\\}/g,
      n = /__CURLY__/g,
      o = /\\#/g,
      a = /__SHARP__/g;
    Telerik.Web.UI.Template = {
      paramName: "data",
      useWithBlock: !0,
      render: function (e, t) {
        var r,
          i,
          n = "";
        for (r = 0, i = t.length; r < i; r++) n += e(t[r]);
        return n;
      },
      compile: function (l, s) {
        var d,
          u,
          c = (function () {
            if ($telerik.$)
              return $telerik.$.extend.apply($telerik.$, arguments);
            for (
              var e =
                  arguments[0] && "object" == typeof arguments[0]
                    ? arguments[0]
                    : {},
                t = 1;
              t < arguments.length;
              t++
            ) {
              var r = arguments[t];
              if (null != r)
                for (var i in r) {
                  var n = r[i];
                  void 0 !== n && (e[i] = n);
                }
            }
            return e;
          })({}, this, s),
          f = c.paramName,
          h = f.match(t)[0],
          g = c.useWithBlock,
          m = "var o,e=$telerik.htmlEncode;";
        if ("function" == typeof l)
          return 2 === l.length
            ? function (e) {
                return l($telerik.$ || jQuery, { data: e }).join("");
              }
            : l;
        for (
          m += g ? "with(" + f + "){" : "",
            m += "o=",
            d = l
              .replace(i, "__CURLY__")
              .replace(r, "#=e($1)#")
              .replace(n, "}")
              .replace(o, "__SHARP__")
              .split("#"),
            u = 0;
          u < d.length;
          u++
        )
          m += e(d[u], u % 2 == 0);
        (m += g ? ";}" : ";"), (m = (m += "return o;").replace(a, "#"));
        try {
          return new Function(h, m);
        } catch (e) {
          throw new Error(
            String.format("Invalid template:'{0}' Generated code:'{1}'", l, m),
          );
        }
      },
    };
  })(),
  (function () {
    var e = $telerik,
      t = /touch/gi,
      r = /pointer/gi,
      i = /mouse/gi,
      n = ["pageX", "pageY", "clientX", "clientY", "screenX", "screenY"];
    (e.getEventLocation = function (e) {
      var t = e.originalEvent || null,
        r = t && t.changedTouches ? t.changedTouches : [],
        i = t || e,
        o = {},
        a = n.length,
        l = null,
        s = null;
      for (r && 1 === r.length && (i = r[0]), l = 0; l < a; l++)
        o[(s = n[l])] = i[s] || e[s];
      return o;
    }),
      (e.getTouchLocation = function (e) {
        var t = {},
          r = null,
          i = n.length,
          o = null;
        for (o = 0; o < i; o++) t[(r = n[o])] = e[r];
        return t;
      }),
      (e.getTouches = function (n) {
        var o,
          a = n.type,
          l = n.currentTarget,
          s = n.originalEvent || null,
          d = [],
          u = null,
          c = null,
          f = s && s.changedTouches ? s.changedTouches : [],
          h = f.length,
          g = null;
        if (((o = e.getEventLocation(n)), a.match(t)))
          for (g = 0; g < h; g++)
            (u = f[g]),
              (c = e.getTouchLocation(u)),
              d.push({
                type: "touch",
                target: u.target,
                currentTarget: l,
                id: u.identifier,
                location: c,
                event: n,
              });
        else
          a.match(r)
            ? d.push({
                type: "pointer",
                target: n.target,
                currentTarget: l,
                id: s.pointerId,
                location: o,
                event: n,
              })
            : a.match(i)
              ? d.push({
                  type: "mouse",
                  target: n.target,
                  currentTarget: l,
                  id: 1,
                  location: o,
                  event: n,
                })
              : d.push({
                  type: a,
                  target: n.target,
                  currentTarget: l,
                  id: 1,
                  location: o,
                  event: n,
                });
        return d;
      });
  })(),
  Sys &&
    Sys.WebForms &&
    Sys.WebForms.PageRequestManager &&
    (Sys.WebForms.PageRequestManager.prototype._onFormElementClick = function (
      e,
    ) {
      window.navigator.msPointerEnabled
        ? ((this._activeDefaultButtonClicked =
            e.target === this._activeDefaultButton),
          this._onFormElementActive(
            e.target,
            parseInt(e.offsetX, 10),
            parseInt(e.offsetY, 10),
          ))
        : ((this._activeDefaultButtonClicked =
            e.target === this._activeDefaultButton),
          this._onFormElementActive(e.target, e.offsetX, e.offsetY));
    }),
  (function () {
    Type.registerNamespace("Telerik.Web.UI.Events");
    var e = Telerik.Web.UI,
      t = e.Events;
    (e.NodeMutationObserver = function (e) {
      (this.callback = e), (this.mutations = []);
    }),
      (e.NodeMutationObserver.prototype = {
        observe: function (e, t) {
          if ("undefined" != typeof MutationObserver) {
            var r = new MutationObserver(this.callback);
            r.observe(e, t), this.mutations.push({ node: e, mutation: r });
          }
        },
        disconnect: function (e) {
          var t = this.findMutationIndex(e);
          -1 != t &&
            (this.mutations[t].mutation.disconnect(),
            Array.removeAt(this.mutations, t));
        },
        findMutationIndex: function (e) {
          for (var t = this.mutations, r = 0; r < t.length; r++) {
            if (t[r].node === e) return r;
          }
          return -1;
        },
        isEmpty: function () {
          return 0 === this.mutations.length;
        },
        dispose: function () {
          for (; this.mutations.length; )
            this.mutations.pop().mutation.disconnect();
          this.callback = null;
        },
      }),
      (t.simulateMouseEvent = function (e, t, r) {
        var i,
          n = $telerik.$.extend({}, r || {});
        return (
          document.createEvent
            ? (i = document.createEvent("MouseEvents")).initMouseEvent(
                t,
                n.bubbles,
                n.cancelable,
                document.defaultView,
                n.button,
                n.screenX,
                n.screenY,
                n.clientX,
                n.clientY,
                n.ctrlKey,
                n.altKey,
                n.shiftKey,
                n.metaKey,
                n.button,
                e,
              )
            : "MouseEvent" in window && (i = new MouseEvent("click", n)),
          i && e.dispatchEvent(i),
          i ||
            ((i = (function (e, t) {
              for (var r in t) e[r] = t[r];
              return e;
            })(document.createEventObject(), n)),
            e.fireEvent("on" + t, i)),
          e
        );
      });
  })(),
  (function (e) {
    Type.registerNamespace("Telerik.Web.UI");
    var t = Telerik.Web.UI;
    function r(e) {
      return "function" == typeof e
        ? e
        : "string" == typeof e
          ? function () {
              return $telerik.$(e);
            }
          : void 0;
    }
    (t.NodeDataStorage = function (e) {
      (this.options = $telerik.$.extend(
        {
          getNodes: function () {
            return [];
          },
          getNodeValue: function (e) {},
          setNodeValue: function (e) {},
          onStore: function () {},
        },
        e || {},
      )),
        (this.storage = []);
    }),
      (t.NodeDataStorage.prototype = {
        store: function () {
          var e = this.options,
            t = e.getNodes();
          this.cleanUp();
          for (var r = 0, i = t.length; r < i; r++) {
            var n = t[r];
            this.storage.push({ node: n, value: e.getNodeValue(n) }),
              e.onStore(n);
          }
        },
        restore: function () {
          for (var e = this.options, t = this.storage; t.length; ) {
            var r = t.pop();
            e.setNodeValue(r.node, r.value);
          }
        },
        cleanUp: function () {
          this.storage = [];
        },
      }),
      t.NodeDataStorage.registerClass("Telerik.Web.UI.NodeDataStorage"),
      (t.NodeAttributeDataStorage = function (i, n) {
        var o = (function (e, t) {
          return (
            t && "function" == typeof t.onStore
              ? ((e.getNodes = r(t.getNodes)), (e.onStore = t.onStore))
              : (e.getNodes = r(t)),
            e
          );
        })(
          (function (t) {
            return {
              getNodeValue: function (e) {
                return e.getAttribute(t);
              },
              setNodeValue: function (r, i) {
                null === i || i === e
                  ? r.removeAttribute(t)
                  : r.setAttribute(t, i);
              },
            };
          })(i),
          n,
        );
        return new t.NodeDataStorage(o);
      });
  })();
