!(function (t) {
  Type.registerNamespace("Telerik.Web.UI");
  var e = Telerik.Web.UI,
    i = !1;
  (Telerik.Web.UI.TouchScrollExtender = function (e) {
    this._containerElements = t(e);
    var i = arguments[1] || {};
    (this._autoScan = "autoScan" in i && i.autoScan),
      (this._showScrollHints = !("showScrollHints" in i) || i.showScrollHints),
      (this._useRoundedHints = !("useRoundedHints" in i) || i.useRoundedHints),
      (this._hasHorizontalScrollHint = !1),
      (this._hasVerticalScrollHint = !1),
      (this._verticalScrollHint = !1),
      (this._horizontalScrollHint = !1),
      (this._lastAnimator = !1),
      (this._dragCanceled = !1),
      (this._currentTouches = 0),
      (this.containers = []),
      (this._enableTouchScroll = !0),
      (this._unbindBeforeDragging = !1);
  }),
    (Telerik.Web.UI.TouchScrollExtender._getNeedsScrollExtender = function () {
      return $telerik.isTouchDevice;
    }),
    (Telerik.Web.UI.TouchScrollExtender.prototype = {
      initialize: function () {
        if (this._enableTouchScroll) {
          this._autoScan &&
            (this._containerElements = this._containerElements
              .add(t("*", this._containerElements))
              .filter(function () {
                return (
                  "scroll" == t(this).css("overflow") ||
                  "auto" == t(this).css("overflow")
                );
              }));
          var i = this;
          this._containerElements.each(function () {
            this.style.overflow = "hidden";
            var e = t(this)
                .addClass("RadTouchExtender")
                .css("-webkit-tap-highlight-color", "rgba(0, 0, 0, 0);"),
              n = {
                element: e.stop(),
                horizontalScrollHint: t(
                  '<div id="horizontalScrollHint" style="position: absolute; display: none; z-index: 200000; font-size: 0; height: 3px; border: 1px solid #333; background: #777; " />',
                ).appendTo(this.parentNode),
                verticalScrollHint: t(
                  '<div id="verticalScrollHint" style="position: absolute; display: none; z-index: 200000; width: 3px; border: 1px solid #333; background: #777; " />',
                ).appendTo(this.parentNode),
              };
            i._useRoundedHints &&
              (n.horizontalScrollHint.css({
                "-moz-border-radius": "3px",
                "-webkit-border-radius": "3px",
                "border-radius": "3px",
              }),
              n.verticalScrollHint.css({
                "-moz-border-radius": "3px",
                "-webkit-border-radius": "3px",
                "border-radius": "3px",
              })),
              e.data("dragID", i.containers.push(n) - 1);
          }),
            (this._startDragProxy = t.proxy(this._startDrag, this)),
            e.TouchScrollExtender._getNeedsScrollExtender()
              ? ((this._onGestureStartProxy = t.proxy(
                  this._onGestureStart,
                  this,
                )),
                (this._onGestureEndProxy = t.proxy(this._onGestureEnd, this)),
                this._containerElements.bind(
                  "touchstart",
                  this._startDragProxy,
                ),
                this._containerElements.bind(
                  "gesturestart",
                  this._onGestureStartProxy,
                ),
                this._containerElements.bind(
                  "gestureend",
                  this._onGestureEndProxy,
                ))
              : this._containerElements.bind("mousedown", this._startDragProxy),
            (this._storeLastLocation = t.throttle(100, function (t) {
              (this._lastAnimator.kX = t.x), (this._lastAnimator.kY = t.y);
            })),
            (this._alignScrollHints = t.throttle(20, function () {
              var e = 0,
                i = 0,
                n = this._lastAnimator.element[0],
                o = this._lastAnimator.horizontalScrollHint,
                r = this._lastAnimator.verticalScrollHint,
                s = this._getBorderBox(n),
                l = t(n).position();
              this._hasHorizontalScrollHint &&
                o &&
                ((e =
                  Math.abs(n.scrollLeft) * this._widthConstant +
                  l.left +
                  s.left),
                o.css({ left: e })),
                this._hasVerticalScrollHint &&
                  r &&
                  ((i =
                    Math.abs(n.scrollTop) * this._heightConstant +
                    l.top +
                    s.top),
                  r.css({ top: i }));
            })),
            (this._throttleScroll = t.throttle(10, function (t) {
              (this._lastAnimator.element[0].scrollLeft =
                this._lastAnimator.dragStartX - t.x),
                (this._lastAnimator.element[0].scrollTop =
                  this._lastAnimator.dragStartY - t.y);
            }));
        }
        this._scrollEndedDelegate = Function.createDelegate(
          this,
          this._scrollEnded,
        );
      },
      dispose: function () {
        this.disable(),
          this._detachInitilalEvents(),
          (this.containers = null),
          (this._containerElements = null),
          (this._events = null),
          (this._scrollEndedDelegate = null);
      },
      _detachInitilalEvents: function () {
        this._containerElements &&
          (this._startDragProxy &&
            this._containerElements.unbind("mousedown", this._startDragProxy),
          this._onGestureStartProxy &&
            this._containerElements.unbind(
              "gesturestart",
              this._onGestureStartProxy,
            ),
          this._onGestureEndProxy &&
            this._containerElements.unbind(
              "gestureend",
              this._onGestureEndProxy,
            ));
      },
      _startDrag: function (n) {
        if (this._preventMultiTouch(n))
          return this._detachEvents(), void (i = !1);
        if (!this._dragCanceled && !i) {
          var o = t(n.target),
            r = o.parents(".RadTouchExtender");
          o.hasClass("RadTouchExtender") && (r = r.add(o));
          var s = (this._lastAnimator = this.containers[r.data("dragID")]),
            l = s.element[0];
          if (
            ((this._hasHorizontalScrollHint = l.offsetWidth < l.scrollWidth),
            (this._hasVerticalScrollHint = l.offsetHeight < l.scrollHeight),
            (s.hasDragged = !1),
            this._hasHorizontalScrollHint || this._hasVerticalScrollHint)
          ) {
            (i = !0),
              s.element.stop(!0),
              (s.originalEvent = n.originalEvent),
              e.TouchScrollExtender._getNeedsScrollExtender() ||
                this._cancelEvents(n);
            var a = $telerik.getTouchEventLocation(n);
            (s.kX = a.x), (s.kY = a.y);
            var c = l.scrollLeft || 0,
              h = l.scrollTop || 0;
            (s.dragStartX = (c > 0 ? c : 0) + a.x),
              (s.dragStartY = (h > 0 ? h : 0) + a.y),
              e.TouchScrollExtender._getNeedsScrollExtender()
                ? (this._unbindBeforeDragging &&
                    t(document.body).unbind({
                      touchmove: t.proxy(this._compositeDragger, this),
                      touchend: t.proxy(this._endDrag, this),
                    }),
                  t(document.body).bind({
                    touchmove: t.proxy(this._compositeDragger, this),
                    touchend: t.proxy(this._endDrag, this),
                  }))
                : t(document.body).bind({
                    mousemove: t.proxy(this._compositeDragger, this),
                    mouseup: t.proxy(this._endDrag, this),
                  });
          }
        }
      },
      _preventMultiTouch: function (t) {
        if (t.originalEvent.touches && t.originalEvent.touches.length > 1)
          return !0;
      },
      _getBorderBox: function (t) {
        var e = {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          horizontal: 0,
          vertical: 0,
        };
        if (window.getComputedStyle) {
          var i = window.getComputedStyle(t, null);
          (e.left = parseInt(i.getPropertyValue("border-left-width"), 10)),
            (e.right = parseInt(i.getPropertyValue("border-right-width"), 10)),
            (e.top = parseInt(i.getPropertyValue("border-top-width"), 10)),
            (e.bottom = parseInt(
              i.getPropertyValue("border-bottom-width"),
              10,
            ));
        } else
          (e.left = t.currentStyle.borderLeftWidth),
            (e.right = t.currentStyle.borderRightWidth),
            (e.top = t.currentStyle.borderTopWidth),
            (e.bottom = t.currentStyle.borderBottomWidth);
        return (
          (e.horizontal = e.left + e.right), (e.vertical = e.top + e.bottom), e
        );
      },
      _addScrollHints: function () {
        if (this._showScrollHints) {
          var e = 0,
            i = 0,
            n = this._lastAnimator,
            o = n.element[0],
            r = this._getBorderBox(o),
            s = t(o).position();
          if (this._hasHorizontalScrollHint) {
            var l = n.element.innerWidth(),
              a = ~~((l / o.scrollWidth) * l) - 2;
            (this._widthConstant = a / l),
              setTimeout(function () {
                (e = Math.abs(o.scrollLeft) * (a / l) + s.left + r.left),
                  (i = o.offsetHeight + s.top + r.top - 7),
                  n.horizontalScrollHint.width(a).css({ left: e, top: i });
              }, 0),
              n.horizontalScrollHint.fadeTo(200, 0.5);
          }
          if (this._hasVerticalScrollHint) {
            var c = n.element.innerHeight(),
              h = ~~((c / o.scrollHeight) * c) - 2;
            (this._heightConstant = h / c),
              setTimeout(function () {
                (i = Math.abs(o.scrollTop) * (h / c) + s.top + r.top),
                  (e = o.offsetWidth + s.left + r.left - 7),
                  n.verticalScrollHint.height(h).css({ left: e, top: i });
              }, 0),
              n.verticalScrollHint.fadeTo(200, 0.5);
          }
        }
      },
      _removeScrollHints: function () {
        if (this._showScrollHints) {
          var t = this._lastAnimator.horizontalScrollHint,
            e = this._lastAnimator.verticalScrollHint;
          this._hasHorizontalScrollHint && t && t.hide(),
            this._hasVerticalScrollHint && e && e.hide();
        }
      },
      _simpleDragger: function (t) {
        if (!this._dragCanceled) {
          this._cancelEvents(t);
          var e = $telerik.getTouchEventLocation(t);
          this._lastAnimator.element.length &&
            (this._throttleScroll(e), this._alignScrollHints()),
            this._storeLastLocation(e);
        }
      },
      _compositeDragger: function (i) {
        if (!this._dragCanceled) {
          var n = $telerik.getTouchEventLocation(i),
            o = this._lastAnimator,
            r = o.element[0];
          this._cancelEvents(i, o, n, "compositeDragger"),
            (Math.abs(o.kX - n.x) > 10 || Math.abs(o.kY - n.y) > 10) &&
              ((o.hasDragged = !0),
              this._addScrollHints(),
              e.TouchScrollExtender._getNeedsScrollExtender()
                ? t(document.body)
                    .unbind("touchmove", this._compositeDragger)
                    .bind("touchmove", t.proxy(this._simpleDragger, this))
                : t(document.body)
                    .unbind("mousemove", this._compositeDragger)
                    .bind("mousemove", t.proxy(this._simpleDragger, this)),
              $telerik.isIE
                ? (o.element.bind("click", this._cancelEvents),
                  r.setCapture(!0))
                : r.addEventListener("click", this._cancelEvents, !0));
        }
      },
      disable: function () {
        this._detachEvents(), (i = !1), (this._dragCanceled = !0);
      },
      enable: function () {
        this._dragCanceled = !1;
      },
      _onGestureStart: function () {
        this._detachEvents(), (i = !1), (this._dragCanceled = !0);
      },
      _onGestureEnd: function () {
        this._dragCanceled = !1;
      },
      _endDrag: function (t) {
        if (!this._dragCanceled) {
          if (
            ((i = !1),
            this._cancelEvents(t),
            this._detachEvents(),
            e.TouchScrollExtender._getNeedsScrollExtender() &&
              1 == this._lastAnimator.originalEvent.touches.length &&
              !this._lastAnimator.hasDragged)
          ) {
            var n = this._lastAnimator.originalEvent,
              o = document.createEvent("MouseEvents");
            o.initMouseEvent(
              "click",
              n.bubbles,
              n.cancelable,
              n.view,
              n.detail,
              n.screenX,
              n.screenY,
              n.clientX,
              n.clientY,
              !1,
              !1,
              !1,
              !1,
              n.button,
              n.relatedTarget,
            ),
              n.target.dispatchEvent(o);
          }
          var r = this,
            s = $telerik.getTouchEventLocation(t),
            l = this._lastAnimator;
          $telerik.isIE
            ? setTimeout(function () {
                l.element.unbind("click", r._cancelEvents),
                  document.releaseCapture();
              }, 10)
            : setTimeout(function () {
                l.element[0].removeEventListener("click", r._cancelEvents, !0);
              }, 0),
            l.hasDragged &&
              (l.element.length && ((l.endX = s.x), (l.endY = s.y)),
              this._finishDrag(l));
        }
      },
      _detachEvents: function () {
        e.TouchScrollExtender._getNeedsScrollExtender()
          ? t(document.body)
              .unbind("touchmove", this._simpleDragger)
              .unbind("touchmove", this._compositeDragger)
              .unbind("touchend", this._endDrag)
          : t(document.body)
              .unbind("mousemove", this._simpleDragger)
              .unbind("mousemove", this._compositeDragger)
              .unbind("mouseup", this._endDrag);
      },
      _finishDrag: function (t) {
        var e = t.element[0].scrollLeft + t.kX - t.endX,
          i = t.element[0].scrollTop + t.kY - t.endY;
        (t.kX = 0), (t.kY = 0);
        var n = this;
        t.element.stop(!0).animate(
          { scrollLeft: e, scrollTop: i },
          {
            duration: 500,
            easing: "easeOutQuad",
            complete: function () {
              n._removeScrollHints(), n._scrollEndedDelegate();
            },
            step: function () {
              n._alignScrollHints();
            },
          },
        ),
          this._hasHorizontalScrollHint &&
            t.horizontalScrollHint &&
            t.horizontalScrollHint.stop().css("opacity", 0.5).fadeTo(450, 0),
          this._hasVerticalScrollHint &&
            t.verticalScrollHint &&
            t.verticalScrollHint.stop().css("opacity", 0.5).fadeTo(450, 0);
      },
      _cancelEvents: function (t) {
        t.stopPropagation(), t.preventDefault();
      },
      _setUnbindBeforeDragging: function (t) {
        this._unbindBeforeDragging = t;
      },
      get_events: function () {
        return (
          this._events || (this._events = new Sys.EventHandlerList()),
          this._events
        );
      },
      _scrollEnded: function () {
        this._raiseEvent("scrollEnded", Sys.EventArgs.Empty);
      },
      add_scrollEnded: function (t) {
        this.get_events().addHandler("scrollEnded", t);
      },
      remove_scrollEnded: function (t) {
        this.get_events().removeHandler("scrollEnded", t);
      },
      _raiseEvent: function (t, e) {
        var i = this.get_events().getHandler(t);
        i && (e || (e = Sys.EventArgs.Empty), i(this, e));
      },
    }),
    Telerik.Web.UI.TouchScrollExtender.registerClass(
      "Telerik.Web.UI.TouchScrollExtender",
      null,
      Sys.IDisposable,
    );
})($telerik.$);
