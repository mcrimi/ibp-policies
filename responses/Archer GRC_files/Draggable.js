Type.registerNamespace("Telerik.Web.UI.Widgets"),
  (function (t, n, e) {
    var i = function (n) {
        var e;
        (e = {}),
          t.extend(n, {
            trigger: function (t) {
              var n = e[t];
              if (n)
                for (var i = 0; i < n.length; i++) {
                  var o = Array.prototype.slice.call(arguments);
                  o.shift(),
                    o.unshift(this),
                    n[i].handler.apply(n[i].context, o);
                }
            },
            _bind: function (n, i) {
              t.each(n, function (t, n) {
                !(function (t, n, i) {
                  var o = e[t] || [];
                  o.push({ handler: n, context: i }), (e[t] = o);
                })(t, n, i);
              });
            },
            _unbind: function (n, i) {
              t.each(n, function (t, n) {
                !(function (t, n, i) {
                  var o = e[t];
                  if (o) {
                    for (var s = -1, r = 0; r < o.length; r++)
                      if (o[r].func == n && o[r].context == i) {
                        s = r;
                        break;
                      }
                    s > -1 && (o = o.splice(s, 1)), (e[t] = o);
                  }
                })(t, n, i);
              });
            },
            _disposeEvents: function () {
              e = null;
            },
          });
      },
      o = n.EventType,
      s = ".telerikDraggableWidget",
      r = o.Down + s,
      a = o.Up + s,
      l = o.Move + s,
      h = "dragstart" + s;
    (n.Widgets.Draggable = function (e, o) {
      (this._element = e),
        (this._options = t.extend(
          {
            useTransformations: !1,
            shouldPreventDefault: !0,
            enableFrameOverlay: !1,
            enableDelay: !1,
            validateNestedElementsAsTriggers: !1,
            mouseButtonTrigger: n.Widgets.MouseButton.Left,
            touchHoldDelay:
              o && o.touchHoldDelay ? Math.min(1e3, o.touchHoldDelay) : 1e3,
            touchHoldDelta:
              o && o.touchHoldDelta ? Math.min(20, o.touchHoldDelta) : 20,
            customScrollingEvaluator: null,
            useExternalHandle: !(!o || !o.handle),
            cursorType: "move",
            handle: e,
            ownerDocument: document,
            constraints: { minX: null, minY: null, maxX: null, maxY: null },
          },
          o || {},
        )),
        (this._ieTouchActionManager = new n.Helpers.IETouchActionManager(
          this._options.handle,
        )),
        (this._isScrolling = !1),
        i(this),
        this.initialize();
    }),
      (n.Widgets.Draggable.prototype = {
        initialize: function (t, n) {
          this._initStyleVars(!0),
            this._checkTransformationAvailability(),
            this._ieTouchActionManager.allowUserTouch(),
            this._toggleHandleCursor(!0),
            this._attachEventHandlers(),
            (this._enabled = !0);
        },
        dispose: function () {
          this._ieTouchActionManager.dispose(),
            this._detachEventHandlers(),
            this._initStyleVars(!1),
            this._disposeEvents(),
            this._toggleHandleCursor(!1),
            (this._options = null),
            (this._element = null);
        },
        get_handle: function () {
          return this._options.handle;
        },
        set_handle: function (t) {
          this._options.handle = t;
        },
        get_useExternalHandle: function () {
          return this._options.useExternalHandle;
        },
        get_position: function () {
          var n = this._element,
            e = t(n).offset(),
            i = { x: e.left, y: e.top },
            o = this._options.offsetElement;
          if (o) {
            var s = t(o).offset();
            (i.x -= s.left - o.scrollLeft), (i.y -= s.top - o.scrollTop);
          }
          return (i.x = Math.round(i.x)), (i.y = Math.round(i.y)), i;
        },
        get_handlePosition: function () {
          var n = t(this._options.handle);
          return { x: n.offset().left, y: n.offset().top };
        },
        get_useTransform: function () {
          return this._options.useTransformations;
        },
        set_useTransform: function (t) {
          t
            ? (this._checkTransformationAvailability(),
              t &&
                !this._options.useTransformations &&
                alert("The browser does not support CSS3 transformations"))
            : (this._options.useTransformations = !1);
        },
        get_constraints: function () {
          return this._options.constraints;
        },
        set_constraints: function (n) {
          if (
            n &&
            ((n.minX && n.maxX && n.minX > n.maxX) ||
              (n.minY && n.maxY && n.minY > n.maxY))
          )
            throw Error("Invalid Parameters");
          t.extend(
            this._options.constraints,
            n || { maxX: null, minX: null, maxY: null, minY: null },
          );
        },
        get_minX: function () {
          this._options.constraints.minX;
        },
        set_minX: function (t) {
          var n = this._options.constraints;
          if (
            (isNaN(t) && null !== t && "" !== t) ||
            (n.maxX && null !== t && n.maxX < t)
          )
            throw Error("Invalid Parameters");
          n.minX = Math.floor(t);
        },
        get_maxX: function () {
          this._options.constraints.maxX;
        },
        set_maxX: function (t) {
          var n = this._options.constraints;
          if (
            (isNaN(t) && null !== t && "" !== t) ||
            (n.minX && null !== t && n.minX > t)
          )
            throw Error("Invalid Parameters");
          n.maxX = Math.ceil(t);
        },
        get_minY: function () {
          this._options.constraints.minY;
        },
        set_minY: function (t) {
          var n = this._options.constraints;
          if (
            (isNaN(t) && null !== t && "" !== t) ||
            (n.maxY && null !== t && n.maxY < t)
          )
            throw Error("Invalid Parameters");
          n.minY = Math.floor(t);
        },
        get_maxY: function () {
          this._options.constraints.maxY;
        },
        set_maxY: function (t) {
          var n = this._options.constraints;
          if (
            (isNaN(t) && null !== t && "" !== t) ||
            (n.minY && null !== t && n.minY > t)
          )
            throw Error("Invalid Parameters");
          n.maxY = Math.ceil(t);
        },
        get_enabled: function () {
          return this._enabled;
        },
        set_enabled: function (t) {
          this._enabled = t;
        },
        moveTo: function (t) {
          this._moveWithDelta(t);
        },
        add_dragStarting: function (t) {
          this._bind({ dragStarting: t });
        },
        remove_dragStarting: function (t) {
          this._unbind({ dragStarting: t });
        },
        add_dragStart: function (t) {
          this._bind({ dragStart: t });
        },
        remove_dragStart: function (t) {
          this._unbind({ dragStart: t });
        },
        add_dragging: function (t) {
          this._bind({ dragging: t });
        },
        remove_dragging: function (t) {
          this._unbind({ dragging: t });
        },
        add_dragEnd: function (t) {
          this._bind({ dragEnd: t });
        },
        remove_dragEnd: function (t) {
          this._unbind({ dragEnd: t });
        },
        updateScroll: function (t) {
          if (this.startCoords) {
            (this.startCoords.x -= t.x), (this.startCoords.y -= t.y);
            var e = this._options.constraints,
              i = this._options.useTransformations
                ? new n.Point(
                    this.startPosition.x + this.transformPos.x,
                    this.startPosition.y + this.transformPos.y,
                  )
                : this.get_position(),
              o = this._calcConstraints(t, i, e);
            this._options.useTransformations
              ? ((this.transformPos.x += o.x),
                (this.transformPos.y += o.y),
                this._dragTransform(this.transformPos))
              : this._dragClassic(o),
              this._options.enableFrameOverlay && this._resizeOverlay();
          }
        },
        _initStyleVars: function (t) {
          this._elStyle = t ? this._element.style : null;
          var n = this._getStylePrefix("Transform");
          this._transfPropName = t ? (n ? n + "Transform" : "transform") : null;
        },
        _checkTransformationAvailability: function () {
          this._options.useTransformations =
            this._transfPropName in document.body.style;
        },
        _getStylePrefix: function (t) {
          for (
            var n = document.body.style,
              e = ["webkit", "ms", "O", "Khtml", "Icab"],
              i = 0;
            i < e.length;
            i++
          ) {
            var o = e[i];
            if (o + t in n) return o;
          }
        },
        _getBounds: function () {
          return $telerik.getBounds(this._element);
        },
        _attachEventHandlers: function () {
          var n = this,
            e = t(n._options.handle);
          (n._mouseDownHandlerProxy = t.proxy(n._mouseDownHandler, this)),
            e.onEvent(r, n._mouseDownHandlerProxy),
            e.onEvent(h, n._dragStartHandle);
        },
        _detachEventHandlers: function () {
          var n = this,
            e = n._options || {},
            i = t(e.handle),
            o = t(e.ownerDocument);
          i.offEvent(r, n._mouseDownHandlerProxy),
            i.offEvent(h, n._dragStartHandle),
            o.offEvent(l, n._mouseMoveHandlerProxy),
            o.offEvent(l, n._touchMoveHandlerProxy),
            o.offEvent(a, n._mouseUpOnceProxy);
        },
        _dragStartHandle: function (t) {
          $telerik.cancelRawEvent(t.originalEvent);
        },
        _mouseDownHandler: function (e) {
          var i = this;
          if (i._enabled) {
            i._draggingTriggered = !1;
            var o = i._isTouchEvent(e),
              s = i._options;
            if (
              (s.shouldPreventDefault && e.preventDefault(),
              o && t(s.handle).offEvent(r, i._mouseDownHandlerProxy),
              (o || i._validateButtonTrigger(e)) &&
                (!s.validateNestedElementsAsTriggers ||
                  i._validateTargetElemCursor(e)))
            ) {
              var h = i._getEventLocation(e);
              (i.startCoords = i.deltaHelper = { x: h.x, y: h.y }),
                (i.startPosition = i.initialPosition = i.get_position()),
                (i.transformPos = i.startPosition);
              var u = new n.Widgets.DraggableEventArgs(
                i.initialPosition,
                null,
                e,
              );
              if ((i.trigger("dragStarting", u), !u._cancel)) {
                (i._mouseMoveHandlerProxy = t.proxy(i._mouseMoveHandler, i)),
                  (i._mouseUpOnceProxy = t.proxy(i._mouseUpHandlerOnce, i));
                var c = t(s.ownerDocument);
                c.onEvent(l, i._mouseMoveHandlerProxy),
                  c.onEvent(a, i._mouseUpOnceProxy),
                  o && s.enableDelay
                    ? i._touchHoldSimulator(e)
                    : (i._triggerDragStart(e, i), i._cancelDragSelection(e)),
                  s.enableFrameOverlay && i._showOverlay();
              }
            }
          }
        },
        _mouseUpHandlerOnce: function (n) {
          this._options &&
            (t(this._options.ownerDocument).offEvent(a, this._mouseUpOnceProxy),
            this._mouseUpHandler(n));
        },
        _validateTargetElemCursor: function (t) {
          return (
            $telerik.getComputedStyle(t.target || t.srcElement, "cursor") ==
            this._options.cursorType
          );
        },
        _validateButtonTrigger: function (t) {
          var n =
            !("button" in t) && "originalEvent" in t ? t.originalEvent : t;
          return !!(
            this._options.mouseButtonTrigger &
            this._eventButtonToMouseButton(n.button)
          );
        },
        _cancelDragSelection: function (t) {
          $telerik.cancelRawEvent(t);
        },
        _touchHoldSimulator: function (n) {
          (this._touchMoveHandlerProxy = t.proxy(this._touchMoveHandler, this)),
            t(this._options.ownerDocument).onEvent(
              l,
              this._touchMoveHandlerProxy,
            );
          var e = this;
          this.touchHoldTimeout = window.setTimeout(function () {
            e._isScrolling || e._triggerDragStart(n);
          }, this._options.touchHoldDelay);
        },
        _touchMoveHandler: function (t) {
          var n = this._getEventLocation(t),
            e = { x: this.startCoords.x - n.x, y: this.startCoords.y - n.y };
          this._options.customScrollingEvaluator
            ? (this._isScrolling = this._options.customScrollingEvaluator(
                this,
                t,
              ))
            : (this._isScrolling =
                Math.abs(e.x) > this._options.touchHoldDelta ||
                Math.abs(e.y) > this._options.touchHoldDelta);
        },
        _triggerDragStart: function (e) {
          this._clearTouchHoldTimeout();
          var i = new n.Widgets.DraggableEventArgs(
            this.initialPosition,
            null,
            e.originalEvent,
          );
          this.trigger("dragStart", i),
            i._cancel ||
              (this._isTouchEvent(e) &&
                this._touchMoveHandlerProxy &&
                t(this._options.ownerDocument).offEvent(
                  l,
                  this._touchMoveHandlerProxy,
                ),
              (this._mouseMoveHandlerProxy = t.proxy(
                this._mouseMoveHandler,
                this,
              )),
              t(this._options.ownerDocument).onEvent(
                l,
                this._mouseMoveHandlerProxy,
              ),
              (this._draggingTriggered = !0));
        },
        _clearTouchHoldTimeout: function () {
          window.clearTimeout(this.touchHoldTimeout);
        },
        _mouseUpHandler: function (e) {
          (this._isScrolling = !1), this._clearTouchHoldTimeout();
          var i = this._options;
          i.useTransformations && this._applyTransformation();
          var o = t(i.ownerDocument);
          o.offEvent(l, this._mouseMoveHandlerProxy),
            o.offEvent(l, this._touchMoveHandler),
            this._isTouchEvent(e) &&
              (this.eventTimer = window.setTimeout(
                t.proxy(this._reatachMouseDownHandlers, this),
                500,
              )),
            i.enableFrameOverlay && this._hideOverlay();
          var s = this.get_position(),
            r = this.startPosition,
            a = new n.Widgets.DraggableEventArgs(
              r,
              { x: s.x - r.x, y: s.y - r.y },
              e.originalEvent,
            );
          this.trigger("dragEnd", a);
        },
        _reatachMouseDownHandlers: function () {
          if (this._options) {
            var n = t(this._options.handle);
            n.offEvent(r, this._mouseDownHandlerProxy),
              n.onEvent(r, this._mouseDownHandlerProxy);
          }
        },
        _mouseMoveHandler: function (t) {
          this._draggingTriggered &&
            (this._drag(t), this._cancelDragSelection(t));
        },
        _drag: function (t) {
          var e = this._getEventLocation(t),
            i = this._options.constraints,
            o = this._calcConstraints(
              { x: e.x - this.startCoords.x, y: e.y - this.startCoords.y },
              this.startPosition,
              i,
            ),
            s = new n.Widgets.DraggableEventArgs(
              this.startPosition,
              o,
              t.originalEvent,
            );
          this._options.useTransformations
            ? ((this.deltaHelper = o), (this.transformPos = o))
            : ((this.initialPosition = this.get_position()),
              (this.deltaHelper = {
                x: e.x - this.deltaHelper.x,
                y: e.y - this.deltaHelper.y,
              }),
              (this.deltaHelper = this._calcConstraintsClassic(
                this.deltaHelper,
                this.initialPosition,
                e,
                this._options.constraints,
              ))),
            this.trigger("dragging", s),
            1 != s._cancel &&
              (this._options.useTransformations
                ? this._dragTransform(this.deltaHelper)
                : this._dragClassic(this.deltaHelper),
              (this.deltaHelper = { x: e.x, y: e.y }),
              this._options.enableFrameOverlay && this._resizeOverlay());
        },
        _dragTransform: function (n) {
          t(this._element).hasClass("rdwDoNotTransfrom") ||
            (this._clearDragTranslation(),
            (this._elStyle[this._transfPropName] +=
              " translate(" + n.x + "px, " + n.y + "px)"),
            t(this._element).addClass("rdwTransformed"));
        },
        _dragClassic: function (n) {
          t(this._element).hasClass("rdwDoNotTransfrom") ||
            this._moveWithDelta(n);
        },
        _applyTransformation: function () {
          var t = this._elStyle[this._transfPropName],
            n = "translate(",
            e = t.substr(t.lastIndexOf(n)),
            i = e.substr(10, e.indexOf(")") - 10).split(","),
            o = { x: parseFloat(i[0]), y: parseFloat(i[1]) };
          this._clearDragTranslation(), this._moveWithDelta(o);
        },
        _clearDragTranslation: function () {
          if (t(this._element).hasClass("rdwTransformed")) {
            var n = this._elStyle[this._transfPropName];
            (this._elStyle[this._transfPropName] = n.substr(
              0,
              n.lastIndexOf("translate("),
            )),
              t(this._element).removeClass("rdwTransformed");
          }
        },
        _getEventLocation: function (t) {
          return this._isTouchEvent(t)
            ? this._getTouchEventLocation(t)
            : (!("clientX" in t) &&
                "originalEvent" in t &&
                (t = t.originalEvent),
              { x: t.clientX, y: t.clientY });
        },
        _moveWithDelta: function (n) {
          t(this._element).css({
            top:
              parseFloat(t(this._element).css("top")) + parseFloat(n.y) + "px",
            left:
              parseFloat(t(this._element).css("left")) + parseFloat(n.x) + "px",
          });
        },
        _calcConstraints: function (t, n, e) {
          var i = t,
            o = this._element.offsetWidth,
            s = this._element.offsetHeight;
          return (null != e.maxX && n.x + o > e.maxX) ||
            (null != e.minX && n.x < e.minX) ||
            (null != e.maxY && n.y + s > e.maxY) ||
            (null != e.minY && n.y < e.minY)
            ? { x: 0, y: 0 }
            : (t.x < 0
                ? (i.x =
                    null === e.minX || isNaN(e.minX)
                      ? t.x
                      : Math.max(t.x, e.minX - n.x))
                : (i.x =
                    null === e.maxX || isNaN(e.maxX)
                      ? t.x
                      : Math.min(t.x, e.maxX - n.x - o)),
              t.y < 0
                ? (i.y =
                    null === e.minY || isNaN(e.minY)
                      ? t.y
                      : Math.max(t.y, e.minY - n.y))
                : (i.y =
                    null === e.maxY || isNaN(e.maxY)
                      ? t.y
                      : Math.min(t.y, e.maxY - n.y - s)),
              i);
        },
        _calcConstraintsClassic: function (n, e, i, o) {
          var s = n;
          return (o.maxX && e.x > o.maxX) ||
            (o.minX && e.x < o.minX) ||
            (o.maxY && e.y > o.maxY) ||
            (o.minY && e.y < o.minY)
            ? { x: 0, y: 0 }
            : (n.x < 0
                ? (s.x =
                    e.x + n.x < o.minX
                      ? o.minX - e.x
                      : o.maxX && i.x > o.maxX
                        ? 0
                        : n.x)
                : (s.x =
                    o.maxX && e.x + t(this._element).width() + n.x >= o.maxX
                      ? o.maxX - e.x - t(this._element).width()
                      : o.minX && i.x < o.minX
                        ? 0
                        : n.x),
              n.y < 0
                ? (s.y =
                    e.y + this.deltaHelper.y < o.minY
                      ? o.minY - e.y
                      : o.maxY && i.y > o.maxY
                        ? 0
                        : n.y)
                : (s.y =
                    o.maxY && e.y + t(this._element).height() + n.y >= o.maxY
                      ? o.maxY - e.y - t(this._element).height()
                      : o.minY && i.y < o.minY
                        ? 0
                        : n.y),
              s);
        },
        _showOverlay: function () {
          for (
            var t = this._getIFrames(this._options.ownerDocument), n = 0;
            n < t.length;
            n++
          )
            this._createOverlay(t[n]);
        },
        _hideOverlay: function () {
          t(".rrFrameOverlay").remove(),
            t(this._options.ownerDocument)
              .find("iframe")
              .removeData("rrFrameOverlayData");
        },
        _resizeOverlay: function () {
          t(this._options.ownerDocument)
            .find("iframe")
            .each(function () {
              var n = t(this);
              t("#" + n.data("rrFrameOverlayData"))
                .width(n.width())
                .height(n.height());
            });
        },
        _createOverlay: function (n) {
          var e = $telerik.getBounds(n),
            i = this._options.ownerDocument.createElement("div");
          (i.id = "rrOverlay_" + this._generateString(6) + (+new Date() % 1e6)),
            (i.className = "rrFrameOverlay"),
            (i.style.cssText =
              "position:absolute; top:" +
              e.y +
              "px;left:" +
              e.x +
              "px;width:" +
              e.width +
              "px;height:" +
              e.height +
              "px;background-color: white; opacity: 0; filter: alpha(opacity=0)"),
            t(n).data("rrFrameOverlayData", i.id),
            this._options.ownerDocument.body.appendChild(i);
        },
        _getIFrames: function (t) {
          return t.getElementsByTagName("iframe");
        },
        _generateString: function (t) {
          var n =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split(
              "",
            );
          t || (t = Math.floor(Math.random() * n.length));
          for (var e = "", i = 0; i < t; i++)
            e += n[Math.floor(Math.random() * n.length)];
          return e;
        },
        _toggleHandleCursor: function (t) {
          var n = this.get_handle();
          t
            ? ((this._origCursor = n.style.cursor),
              (n.style.cursor = this._options.cursorType))
            : ((n.style.cursor = this._origCursor), (this._origCursor = null));
        },
        _isTouchEvent: function (t) {
          return n.Widgets.Draggable.isTouchEvent(t);
        },
        _getTouchEventLocation: function (t) {
          var n = arguments[1],
            i = n ? [n + "X"] : "pageX",
            o = n ? [n + "Y"] : "pageY",
            s = { x: t[i], y: t[o] },
            r =
              t.changedTouches ||
              (t.originalEvent
                ? t.originalEvent.changedTouches
                : !!t.rawEvent && t.rawEvent.changedTouches);
          return (
            r && r.length < 2 && ((s.x = r[0][i]), (s.y = r[0][o])),
            s.x === e &&
              t.originalEvent &&
              t.originalEvent[i] != e &&
              ((s.x = t.originalEvent[i]), (s.y = t.originalEvent[o])),
            s
          );
        },
        _eventButtonToMouseButton: function (t) {
          var n = Telerik.Web.UI.Widgets.MouseButton;
          if ($telerik.isIE && !$telerik.isIE9Mode)
            switch (t) {
              case 1:
                return n.Left;
              case 4:
                return n.Middle;
              case 2:
                return n.Right;
              default:
                return n.None;
            }
          else
            switch (t) {
              case 0:
                return n.Left;
              case 1:
                return n.Middle;
              case 2:
                return n.Right;
              default:
                return n.None;
            }
        },
      }),
      (n.Widgets.Draggable.isTouchEvent = function (t) {
        var n = t.originalEvent || t.rawEvent || t,
          e = n ? n.type : "";
        if (/touch/i.test(e)) return !0;
        if (/pointer/i.test(e) && "pointerType" in n) {
          var i = n.pointerType;
          return (
            "touch" === i ||
            ("MSPOINTER_TYPE_TOUCH" in n && i === n.MSPOINTER_TYPE_TOUCH)
          );
        }
        return !1;
      }),
      (n.Widgets.DraggableEventArgs = function (t, n, e) {
        (this._cancel = !1),
          (this._position = t),
          (this._delta = n || { x: 0, y: 0 }),
          (this._domEvent = e),
          (this._newPosition = {
            x: this._position.x + this._delta.x,
            y: this._position.y + this._delta.y,
          });
      }),
      (n.Widgets.DraggableEventArgs.prototype = {
        get_position: function () {
          return this._position;
        },
        get_newPosition: function () {
          return this._newPosition;
        },
        get_domEvent: function () {
          return this._domEvent;
        },
        get_cancel: function () {
          return this._cancel;
        },
        set_cancel: function (t) {
          this._cancel = !0 === t || "true" === t;
        },
      }),
      t.registerEnum(n.Widgets, "MouseButton", {
        None: 0,
        Left: 1,
        Middle: 2,
        Right: 4,
      });
  })($telerik.$, Telerik.Web.UI);
