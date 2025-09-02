Type.registerNamespace("Telerik.Web.UI.Animations"),
  (function () {
    var t = $telerik.$,
      e = Telerik.Web.UI;
    (e.Animations.playJQueryAnimation = function (e, i, s, n, a, r, o, h, l) {
      if (e) {
        i || (i = 2),
          s || (s = new Telerik.Web.UI.Bounds(1, 1, 1, 1)),
          n || (n = new Telerik.Web.UI.Bounds(1, 1, 1, 1));
        var u = h || 500;
        a || (a = 32), (a += "");
        var d = parseInt(a.substr(0, 1), 10),
          m = parseInt(a.substr(1, 1), 10);
        if ((r && r(), t(e).stopTransition(!1, !0), 2 != i)) {
          if (8 == i) {
            var _ = $telerik.getClientBounds(),
              c = $telerik.getClientBounds();
            switch (((s.x = c.width / 2), (s.y = c.height), m)) {
              case 2:
                s.x = n.x;
                break;
              case 3:
                s.x = _.width;
                break;
              case 1:
                s.x = _.x;
            }
            switch (d) {
              case 2:
                s.y = n.y;
                break;
              case 1:
                s.y = _.y - n.height;
                break;
              case 3:
                s.y = _.height;
            }
          } else if (4 == i) {
            switch (
              ((s.x = n.x), (s.y = n.y), (s.width = n.width), (s.height = 1), m)
            ) {
              case 2:
              case 3:
                s.x = n.x;
                break;
              case 1:
                var p = n.x;
                2 == d && (p += n.width), (s.x = p);
            }
            switch (d) {
              case 2:
                (s.y = n.y), (s.height = n.height), (s.width = 1);
                break;
              case 1:
                s.y = n.y + n.height;
                break;
              case 3:
                s.y = n.y;
            }
          }
          t(e)
            .css({
              width: s.width,
              height: s.height,
              left: s.x,
              top: s.y,
              opacity: 0.1,
              filter: "alpha(opacity=10)",
            })
            .show()
            .transition(
              {
                width: n.width,
                height: n.height,
                left: n.x,
                top: n.y,
                opacity: l || 1,
              },
              u,
              null,
              o,
            );
        } else t(e).css({ left: n.x, top: n.y }).fadeIn(u, o);
      }
    }),
      (t.fx.prototype.oldstep = t.fx.prototype.step),
      (t.fx.prototype.step = function (t) {
        var e = this.prop;
        if (
          "left" == e ||
          "top" == e ||
          "telerikCarouselAngle" == e ||
          "telerikCoverFlowIndex" == e
        ) {
          if (this.elem.getAttribute("paused")) {
            if (!this.elem.getAttribute("elapsedTime")) {
              var i = +new Date() - this.startTime;
              this.elem.setAttribute("elapsedTime", i);
            }
            return !0;
          }
          this.elem.getAttribute("elapsedTime") &&
            ((this.startTime =
              +new Date() - this.elem.getAttribute("elapsedTime")),
            this.elem.removeAttribute("elapsedTime"));
        }
        return this.oldstep(t);
      }),
      (e.Animations.jMoveBase = function (t, i, s, n) {
        e.Animations.jMoveBase.initializeBase(this),
          (this._owner = t),
          (this._element = i),
          (this._duration = s),
          (this._events = null),
          (this._animationEndedDelegate = null),
          (this._isPlaying = !1),
          (this._isPaused = !1),
          (this._isCyclic = !1),
          (this._easing = n),
          (this._isDisposed = !1);
      }),
      (e.Animations.jMoveBase.prototype = {
        initialize: function () {
          e.Animations.jMoveBase.callBaseMethod(this, "initialize"),
            (this._animationEndedDelegate = Function.createDelegate(
              this,
              this._animationEnded,
            ));
        },
        dispose: function () {
          this._isDisposed ||
            (this._getAnimationQuery().stopTransition(!0, !1),
            (this._owner = null),
            (this._element = null),
            (this._animationEndedDelegate = null),
            e.Animations.jMoveBase.callBaseMethod(this, "dispose"),
            (this._isDisposed = !0));
        },
        get_isPlaying: function () {
          return this._isPlaying;
        },
        get_isCyclic: function () {
          return this._isCyclic;
        },
        set_isCyclic: function (t) {
          this._isCyclic = t;
        },
        get_easing: function () {
          return this._easing;
        },
        set_easing: function (t) {
          this._easing = t;
        },
        get_duration: function () {
          return this._duration;
        },
        set_duration: function (t) {
          this._duration = t;
        },
        get_isActive: function () {
          return !0;
        },
        play: function (t) {
          var e = this._getAnimationQuery().filter("[paused='true']"),
            i = e.attr("paused");
          if ((e.removeAttr("paused"), i && e.attr("elapsedTime")))
            (this._isPlaying = !0), (this._isPaused = !1);
          else {
            var s = this._owner,
              n = s.get_frameDuration();
            if (
              this._isPaused &&
              this._isCyclic &&
              n > 0 &&
              !t &&
              s._setAnimationTimeout
            )
              s._setAnimationTimeout(n);
            else
              0 != this._animationStarted() &&
                (this._playAnimation(),
                (this._isPlaying = !0),
                (this._isPaused = !1));
          }
        },
        stop: function () {
          this._getAnimationQuery().stopTransition(!1, this._isPlaying),
            (this._isPlaying = !1);
        },
        pause: function () {
          this._isPlaying &&
            this._getAnimationQuery().filter(":animated").attr("paused", !0),
            (this._isPlaying = !1),
            (this._isPaused = !0);
        },
        add_started: function (t) {
          this.get_events().addHandler("started", t);
        },
        remove_started: function (t) {
          this.get_events().removeHandler("started", t);
        },
        add_ended: function (t) {
          this.get_events().addHandler("ended", t);
        },
        remove_ended: function (t) {
          this.get_events().removeHandler("ended", t);
        },
        _getAnimationQuery: function () {
          return t(this._element);
        },
        _playAnimation: function () {},
        _animationStarted: function () {
          var t = new Sys.CancelEventArgs();
          return this._raiseEvent("started", t), !t.get_cancel();
        },
        _animationEnded: function () {
          (this._isPlaying = !1),
            this._raiseEvent("ended", Sys.EventArgs.Empty);
        },
        _raiseEvent: function (t, e) {
          var i = this.get_events().getHandler(t);
          i && (e || (e = Sys.EventArgs.Empty), i(this, e));
        },
      }),
      e.Animations.jMoveBase.registerClass(
        "Telerik.Web.UI.Animations.jMoveBase",
        Sys.Component,
      ),
      (e.Animations.jMove = function (t, i, s, n, a, r) {
        e.Animations.jMove.initializeBase(this, [t, i, s, r]),
          (this._horizontal = void 0 === n || null == n ? 0 : n),
          (this._vertical = void 0 === a || null == a ? 0 : a);
      }),
      (e.Animations.jMove.prototype = {
        initialize: function () {
          e.Animations.jMove.callBaseMethod(this, "initialize");
        },
        dispose: function () {
          e.Animations.jMove.callBaseMethod(this, "dispose");
        },
        get_vertical: function () {
          return this._vertical;
        },
        set_vertical: function (t) {
          this._vertical = t;
        },
        get_horizontal: function () {
          return this._horizontal;
        },
        set_horizontal: function (t) {
          this._horizontal = t;
        },
        _getFinalPosition: function () {
          return isNaN(parseInt(this._vertical, 10))
            ? this._horizontal
            : this._vertical;
        },
        _getAnimatedProperty: function () {
          return isNaN(parseInt(this._vertical, 10)) ? "left" : "top";
        },
        _getPosition: function () {
          return this._element.style[this._getAnimatedProperty()];
        },
        _playAnimation: function () {
          var t = this._getFinalPosition(),
            e = this._getAnimationQuery(),
            i = this._getAnimatedProperty(),
            s = {};
          (s[i] = t),
            e
              .stopTransition(!0, !this._isCyclic)
              .transition(
                s,
                this._duration,
                this._easing || "ease",
                this._animationEndedDelegate,
              );
        },
      }),
      e.Animations.jMove.registerClass(
        "Telerik.Web.UI.Animations.jMove",
        e.Animations.jMoveBase,
      ),
      (e.Animations.jCarousel = function (t, i, s, n, a, r, o) {
        e.Animations.jCarousel.initializeBase(this, [t, i, n, o]),
          (this._items = s),
          (this._minScale = a.minScale),
          (this._x = a.xO),
          (this._y = a.yO),
          (this._xRadius = a.xR),
          (this._yRadius = a.yR),
          (this._customProperties = r),
          (this._angle = Math.PI / 2),
          (this._query = null);
      }),
      (e.Animations.jCarousel.prototype = {
        initialize: function () {
          e.Animations.jCarousel.callBaseMethod(this, "initialize");
        },
        dispose: function () {
          e.Animations.jCarousel.callBaseMethod(this, "dispose"),
            (this._items = null),
            (this._customProperties = null),
            (this._query = null);
        },
        get_angle: function () {
          return this._angle;
        },
        set_angle: function (t) {
          this._angle = t;
        },
        _getFinalPosition: function () {
          return this._angle;
        },
        _getAnimatedProperty: function () {
          return "telerikCarouselAngle";
        },
        _getAnimationQuery: function () {
          var e = this._query;
          return (
            e ||
              (t.each(this._items, function (i, s) {
                var n = this.element;
                e = e ? e.add(n) : t(n);
              }),
              (this._query = e)),
            e
          );
        },
        _playAnimation: function () {
          this._getAnimationQuery().stopTransition(!0, !this._isCyclic);
          var e = this._items,
            i = e.length > 0 ? (2 * Math.PI) / e.length : 0,
            s = this._angle,
            n = this;
          t.each(e, function (e, a) {
            s.toString().indexOf("e") > -1 && (s = Math.round(1e4 * s) / 1e4),
              t(this.element)
                .stop(!0, !1)
                .transition(
                  { queue: !0, telerikCarouselAngle: s },
                  {
                    xO: n._x,
                    yO: n._y,
                    xR: n._xRadius,
                    yR: n._yRadius,
                    minScale: n._minScale,
                    reflection: this.reflection,
                    width: this.width,
                    height: this.height,
                    outerWidth: this.outerWidth,
                    outerHeight: this.outerHeight,
                    customProperties: n._customProperties,
                    duration: n._duration,
                    easing: n._easing,
                    complete: n._animationEndedDelegate,
                  },
                ),
              (s += i);
          });
        },
      }),
      e.Animations.jCarousel.registerClass(
        "Telerik.Web.UI.Animations.jCarousel",
        e.Animations.jMoveBase,
      ),
      (t.fx.step.telerikCarouselAngle = function (e) {
        var i = e.now,
          s = e.options,
          n = Math.sin(i),
          a = s.minScale,
          r = a + (n + 1) * ((1 - a) / 2),
          o = s.xO + (Math.cos(i + Math.PI) * s.xR - s.outerWidth / 2) * r,
          h = s.yO + n * s.yR * r;
        e.elem.telerikCarouselAngle = e.now;
        var l = t.extend({}, s.customProperties);
        if (s.customProperties) {
          var u = /^([\d+-.]+)(.*)$/;
          t.each(l, function (t, e) {
            var i = u.exec(e);
            i && (l[t] = i ? i[1] * r + i[2] : e);
          });
        }
        var d =
            !t.support.opacity &&
            s.customProperties &&
            s.customProperties.opacity &&
            s.reflection,
          m = "px",
          _ = t.extend(l, {
            width: s.width * r + m,
            height: s.height * r * (d ? 2 : 1) + m,
            left: o + m,
            top: h + m,
            zIndex: parseInt(1e5 * r, 10),
          });
        t(e.elem).css("display", "none").css(_).css("display", "");
      }),
      (e.Animations.jCoverFlow = function (t, i, s, n, a, r, o) {
        e.Animations.jCoverFlow.initializeBase(this, [t, i, n, o]),
          (this._items = s),
          (this._minScale = a.minScale),
          (this._x = a.xO),
          (this._y = a.yO),
          (this._xRadius = a.xR),
          (this._yRadius = a.yR),
          (this._xItemSpacing = a.xItemSpacing),
          (this._yItemSpacing = a.yItemSpacing),
          (this._selectedItemOffsetX = a.selectedItemOffsetX),
          (this._selectedItemOffsetY = a.selectedItemOffsetY),
          (this._matrix = a.matrix),
          (this._customProperties = r),
          (this._index = 0),
          (this._query = null);
      }),
      (e.Animations.jCoverFlow.prototype = {
        initialize: function () {
          e.Animations.jCoverFlow.callBaseMethod(this, "initialize");
        },
        dispose: function () {
          e.Animations.jCoverFlow.callBaseMethod(this, "dispose"),
            (this._items = null),
            (this._customProperties = null),
            (this._matrix = null),
            (this._query = null);
        },
        get_index: function () {
          return this._index;
        },
        set_index: function (t) {
          this._index = t;
        },
        _getFinalPosition: function () {
          return this._index;
        },
        _getAnimatedProperty: function () {
          return "telerikCoverFlowIndex";
        },
        _getAnimationQuery: function () {
          if (!this._query) {
            for (var e = this._items, i = t(), s = 0, n = e.length; s < n; s++)
              i.add(e[s].element);
            this._query = i;
          }
          return this._query;
        },
        _getTransformProperty: function () {
          var t = "transform";
          return (
            $telerik.isIE9Mode
              ? (t = "msTransform")
              : $telerik.isIE
                ? (t = "filter")
                : $telerik.isSafari
                  ? (t = "WebkitTransform")
                  : $telerik.isOpera && (t = "OTransform"),
            t
          );
        },
        _playAnimation: function () {
          this._getAnimationQuery().stopTransition(!0, !this._isCyclic);
          var e = this._items,
            i = e.length,
            s = this._owner.isVertical(),
            n = this._index,
            a = e[n];
          if (a) {
            var r = {
                top: this._y - a.outerHeight / 2,
                right: this._x + a.outerWidth / 2,
                bottom: this._y + a.outerHeight / 2,
                left: this._x - a.outerWidth / 2,
              },
              o = this._matrix;
            1 == o.m11 && 1 == o.m22 && 0 == o.m12 && 0 == o.m21 && (o = null);
            var h = this._getTransformProperty(),
              l = this,
              u = $telerik.getContentSize(this._owner._clipElement);
            t.each(e, function (e, a) {
              var d = e - n,
                m = 0 == d,
                _ = m ? 1 : l._minScale,
                c = this.element,
                p = parseInt(c.telerikCoverFlowIndex, 10),
                f = 0 == p,
                g = f ? 1 : l._minScale,
                y = d > 0,
                v = l._x + this.outerWidth / 2,
                x = s ? v - this.outerWidth * _ : r[y ? "right" : "left"],
                A = s ? v - this.outerWidth * g : r[p > 0 ? "right" : "left"],
                w = l._y + this.outerHeight / 2,
                M = s ? r[y ? "bottom" : "top"] : w - this.outerHeight * _,
                I = s ? r[p > 0 ? "bottom" : "top"] : w - this.outerHeight * g,
                P = {},
                C = f || m;
              (s || C) && (P.top = { start: I, end: M }),
                (s && !C) || (P.left = { start: A, end: x });
              for (var b = 0; b < 2; b++) {
                var k = 0 == b,
                  S = k ? d : p,
                  T = k ? _ : g;
                S > 0
                  ? s
                    ? (P.top[k ? "end" : "start"] +=
                        l._yRadius + --S * l._yItemSpacing)
                    : (P.left[k ? "end" : "start"] +=
                        l._xRadius + --S * l._xItemSpacing)
                  : S < 0
                    ? s
                      ? (P.top[k ? "end" : "start"] +=
                          -(l._yRadius + this.outerHeight * T) +
                          ++S * l._yItemSpacing)
                      : (P.left[k ? "end" : "start"] +=
                          -(l._xRadius + this.outerWidth * T) +
                          ++S * l._xItemSpacing)
                    : ((P.left[k ? "end" : "start"] += l._selectedItemOffsetX),
                      (P.top[k ? "end" : "start"] += l._selectedItemOffsetY));
              }
              if (
                C ||
                ((!P.top ||
                  (P.top.start >= -this.outerHeight * g &&
                    P.top.start <= u.height) ||
                  (P.top.end >= -this.outerHeight * _ &&
                    P.top.end <= u.height)) &&
                  (!P.left ||
                    (P.left.start >= -this.outerWidth * g &&
                      P.left.start <= u.width) ||
                    (P.left.end >= -this.outerWidth * _ &&
                      P.left.end <= u.width)))
              ) {
                var j = { zIndex: 100 * (i - Math.abs(p)) };
                P.top && (j.top = P.top.start + "px"),
                  P.left && (j.left = P.left.start + "px"),
                  Math.abs(p - d) > 1 && (j.zIndex = 100 * (i - Math.abs(d))),
                  t(c)
                    .stop(!0, !1)
                    .css(j)
                    .transition(
                      { queue: !0, telerikCoverFlowIndex: d },
                      {
                        isVertical: s,
                        animateSize: C,
                        steps: P,
                        minScale: l._minScale,
                        width: this.width,
                        height: this.height,
                        outerWidth: this.outerWidth,
                        outerHeight: this.outerHeight,
                        matrix: o,
                        transformProperty: h,
                        reflection: this.reflection,
                        itemsCount: i,
                        customProperties: l._customProperties,
                        duration: l._duration,
                        easing: l._easing,
                        complete: l._animationEndedDelegate,
                      },
                    );
              } else
                t(c).stopTransition(!0, !1).attr("telerikCoverFlowIndex", d);
            });
          }
        },
      }),
      e.Animations.jCoverFlow.registerClass(
        "Telerik.Web.UI.Animations.jCoverFlow",
        e.Animations.jMoveBase,
      ),
      (t.fx.step.telerikCoverFlowIndex = function (e) {
        var i = e.now,
          s = e.options;
        e.elem.telerikCoverFlowIndex = i;
        var n = Math.abs((i - e.start) / (e.end - e.start)),
          a = "px",
          r = {};
        Math.abs(e.start - e.end) <= 1 &&
          (r.zIndex = parseInt(100 * (s.itemsCount - Math.abs(i)), 10));
        var o = 0,
          h = 0,
          l = s.isVertical,
          u = s.minScale,
          d = s.animateSize
            ? 0 == e.end
              ? u + (1 - u) * n
              : 1 - (1 - u) * n
            : u;
        if (s.animateSize) {
          if (s.customProperties) {
            var m = t.extend({}, s.customProperties),
              _ = /^([\d+-.]+)(.*)$/;
            t.each(m, function (t, e) {
              var i = _.exec(e);
              m[t] = i ? i[1] * d + i[2] : e;
            }),
              (r = t.extend(m, r));
          }
          r = t.extend(r, { width: s.width * d + a, height: s.height * d + a });
        }
        if (s.matrix) {
          var c = t.extend({}, s.matrix),
            p = s.animateSize ? (0 == e.end ? 1 - n : n) : 1,
            f = 0 == i ? 0 : i < 0 ? -1 : 1;
          e.start * e.end < 0 &&
            (p =
              (e.start < 0 && i < 0) || (e.start > 0 && i > 0)
                ? 1 - n * Math.abs((e.end - e.start) / e.start)
                : n * Math.abs((e.end - e.start) / e.end) -
                  Math.abs(e.start / e.end)),
            (c = {
              m11: 1 - (1 - c.m11) * p,
              m12: c.m12 * p * f,
              m21: c.m21 * p * f,
              m22: 1 - (1 - c.m22) * p,
            });
          var g = "filter" == s.transformProperty,
            y =
              "matrix(" +
              c.m11 +
              ", " +
              c.m21 +
              ", " +
              c.m12 +
              ", " +
              c.m22 +
              ", 0, 0)";
          g &&
            (y =
              "progid:DXImageTransform.Microsoft.Matrix(FilterType='bilinear',M11=" +
              c.m11 +
              ", M12=" +
              c.m12 +
              ", M21=" +
              c.m21 +
              ", M22=" +
              c.m22 +
              ",sizingMethod='auto expand')"),
            (r[s.transformProperty] = y);
          var v = Math.abs(c.m11) + Math.abs(c.m12),
            x = Math.abs(c.m21) + Math.abs(c.m22);
          l ? (h = f * ((1 - x) / 2)) : (o = f * ((1 - v) / 2)),
            g &&
              ((o += (v - 1) / 2),
              (h += (x - 1) / 2),
              s.matrix.m12 && s.reflection && (o *= 2));
        }
        var A = s.animateSize,
          w = s.steps;
        (l || A) &&
          w.top &&
          (r.top =
            w.top.start +
            (w.top.end - w.top.start) * n -
            h * d * s.outerHeight +
            a),
          (l && !A) ||
            !w.left ||
            (r.left =
              w.left.start +
              (w.left.end - w.left.start) * n -
              o * d * s.outerWidth +
              a),
          "filter" == s.transformProperty &&
            s.matrix &&
            s.reflection &&
            (r.height =
              2 * (r.height ? parseInt(r.height, 10) : u * s.height) + a),
          t(e.elem).css("display", "none").css(r).css("display", "");
      });
  })();
