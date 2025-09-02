Type.registerNamespace("Telerik.Web.UI.Widgets"),
  (function (e, t, i) {
    var n = function (t) {
        var i;
        (i = {}),
          e.extend(t, {
            trigger: function (e) {
              var t = i[e];
              if (t)
                for (var n = 0; n < t.length; n++) {
                  var s = Array.prototype.slice.call(arguments);
                  s.shift(),
                    s.unshift(this),
                    t[n].handler.apply(t[n].context, s);
                }
            },
            _bind: function (t, n) {
              e.each(t, function (e, t) {
                !(function (e, t, n) {
                  var s = i[e] || [];
                  s.push({ handler: t, context: n }), (i[e] = s);
                })(e, t, n);
              });
            },
            _unbind: function (t, n) {
              e.each(t, function (e, t) {
                !(function (e, t, n) {
                  var s = i[e];
                  if (s) {
                    for (var o = -1, l = 0; l < s.length; l++)
                      if (s[l].func == t && s[l].context == n) {
                        o = l;
                        break;
                      }
                    o > -1 && (s = s.splice(o, 1)), (i[e] = s);
                  }
                })(e, t, n);
              });
            },
            _disposeEvents: function () {
              i = null;
            },
          });
      },
      s = t.Widgets;
    function o(e) {
      return e / 2;
    }
    (s.Resizable = function (t, i) {
      (this._element = t),
        (this._handlesCollection = {}),
        (this.options = e.extend(
          {
            handleSize: 7,
            liveResize: !1,
            enableFrameOverlay: !1,
            appendHandleToElement: !1,
            useTinyHandles: !1,
            constraints: {
              minWidth: null,
              minHeight: null,
              maxWidth: null,
              maxHeight: null,
            },
            ownerDocument: document,
            handles: [
              { direction: "W", element: null },
              { direction: "NW", element: null },
              { direction: "N", element: null },
              { direction: "NE", element: null },
              { direction: "E", element: null },
              { direction: "SE", element: null },
              { direction: "S", element: null },
              { direction: "SW", element: null },
            ],
          },
          i || {},
        )),
        n(this),
        this.initialize();
    }),
      (s.Resizable.prototype = {
        initialize: function () {
          this._initHandles();
        },
        add_resizeStart: function (e) {
          this._bind({ resizeStart: e });
        },
        remove_resizeStart: function (e) {
          this._unbind({ resizeStart: e });
        },
        add_resizing: function (e) {
          this._bind({ resizing: e });
        },
        remove_resizing: function (e) {
          this._unbind({ resizing: e });
        },
        add_resize: function (e) {
          this._bind({ resize: e });
        },
        remove_resize: function (e) {
          this._unbind({ resize: e });
        },
        add_resizeEnd: function (e) {
          this._bind({ resizeEnd: e });
        },
        remove_resizeEnd: function (e) {
          this._unbind({ resizeEnd: e });
        },
        add_destroy: function (e) {
          this._bind({ destroy: e });
        },
        remove_destroy: function (e) {
          this._unbind({ destroy: e });
        },
        get_element: function () {
          return this._element;
        },
        get_constraints: function () {
          return this.options.constraints;
        },
        set_constraints: function (t) {
          if (
            t &&
            ((t.minWidth && t.maxWidth && t.minWidth > t.maxWidth) ||
              (t.minHeight && t.maxHeight && t.minHeight > t.maxHeight))
          )
            throw Error("Invalid Parameters");
          for (var i in (e.extend(
            this.options.constraints,
            t || {
              maxWidth: null,
              minWidth: null,
              maxHeight: null,
              minHeight: null,
            },
          ),
          this._handlesCollection))
            this._setHandleConstraints(this._handlesCollection[i]);
        },
        get_minWidth: function () {
          return this.options.constraints.minWidth;
        },
        set_minWidth: function (e) {
          var t = this.options.constraints;
          if (
            (isNaN(e) && null !== e && "" !== e) ||
            (t.maxWidth && t.maxWidth < e)
          )
            throw Error("Invalid Parameters");
          for (var i in ((t.minWidth = e), this._handlesCollection))
            this._setHandleConstraints(this._handlesCollection[i]);
        },
        get_maxWidth: function () {
          return this.options.constraints.maxWidth;
        },
        set_maxWidth: function (e) {
          var t = this.options.constraints;
          if (
            (isNaN(e) && null !== e && "" !== e) ||
            (t.minWidth && t.minWidth > e)
          )
            throw Error("Invalid Parameters");
          for (var i in ((t.maxWidth = e), this._handlesCollection))
            this._setHandleConstraints(this._handlesCollection[i]);
        },
        get_minHeight: function () {
          return this.options.constraints.minHeight;
        },
        set_minHeight: function (e) {
          var t = this.options.constraints;
          if (
            (isNaN(e) && null !== e && "" !== e) ||
            (t.maxHeight && t.maxHeight < e)
          )
            throw Error("Invalid Parameters");
          for (var i in ((t.minHeight = e), this._handlesCollection))
            this._setHandleConstraints(this._handlesCollection[i]);
        },
        get_maxHeight: function () {
          return this.options.constraints.maxHeight;
        },
        set_maxHeight: function (e) {
          var t = this.options.constraints;
          if (
            (isNaN(e) && null !== e && "" !== e) ||
            (t.minHeight && t.minHeight > e)
          )
            throw Error("Invalid Parameters");
          for (var i in ((t.maxHeight = e), this._handlesCollection))
            this._setHandleConstraints(this._handlesCollection[i]);
        },
        hideHandles: function () {
          for (var e in this._handlesCollection) {
            this._handlesCollection[e]._element.style.display = "none";
          }
        },
        showHandles: function () {
          for (var e in this._handlesCollection) {
            this._handlesCollection[e]._element.style.display = "";
          }
        },
        repositionHandles: function () {
          for (var e in this._handlesCollection)
            this._positionHandle(this._handlesCollection[e]);
        },
        repaint: function () {
          this._configureHandles();
        },
        _initHandles: function () {
          for (var t = this.options.handles, i = 0; i < t.length; i++) {
            var n = null;
            (n = t[i].element
              ? this._initExternalHandle(t[i])
              : this._initHandle(t[i])).add_dragStart(
              e.proxy(this._handleDragStart, this),
            ),
              n.add_dragging(e.proxy(this._handleDragging, this)),
              n.add_dragEnd(e.proxy(this._handleDragEnd, this)),
              (this._handlesCollection[n._direction] = n);
          }
          this._configureHandles();
        },
        _initExternalHandle: function (e) {
          return new s.Handle(e.element, e.direction, {
            handle: e.element,
            cursorType: this._getCursorFromDirection(e.direction),
            enableFrameOverlay: this.options.enableFrameOverlay,
          });
        },
        _initHandle: function (e) {
          var t = this._createHandleElement(e);
          return new s.Handle(t, e.direction, {
            ownerDocument: this.options.ownerDocument,
            cursorType: this._getCursorFromDirection(e.direction),
            enableFrameOverlay: this.options.enableFrameOverlay,
          });
        },
        _createHandleElement: function (e) {
          var t = this.options.ownerDocument.createElement("div");
          return (
            (t.style.position = "absolute"),
            t.setAttribute("unselectable", "on"),
            (t.className = "rrHandle rr" + e.direction),
            t
          );
        },
        _configureHandles: function () {
          for (var e in this._handlesCollection) {
            var t = this._handlesCollection[e];
            t.get_useExternalHandle()
              ? this._setHandleConstraints(t)
              : (this._appendHandleToDOM(t),
                this._applyElementsZIndex(t),
                this._sizeHandle(t),
                this._positionHandle(t),
                (t._element.style.cssText = t._element.style.cssText),
                this._setHandleConstraints(t));
          }
        },
        _appendHandleToDOM: function (e) {
          if (!this._element.parentNode)
            throw Error("Resizable element should be part of the DOM tree");
          this.options.appendHandleToElement
            ? this._element.appendChild(e._element)
            : this.options.ownerDocument.body.appendChild(e._element);
        },
        _applyElementsZIndex: function (e) {
          var t =
            this._element.style.zIndex ||
            $telerik.getComputedStyle(this._element, "z-index");
          e._element.style.zIndex = t || "";
        },
        _setHandleConstraints: function (t) {
          var i,
            n = !!t.get_useExternalHandle(),
            s = n ? 0 : this.options.handleSize,
            o = e(t._element),
            l = o.offset();
          (i = n
            ? {
                minWidth: this.options.constraints.minWidth
                  ? this.options.constraints.minWidth -
                    Math.ceil(e(this._element).innerWidth())
                  : null,
                maxWidth: this.options.constraints.maxWidth
                  ? this.options.constraints.maxWidth -
                    Math.floor(e(this._element).innerWidth())
                  : null,
                minHeight: this.options.constraints.minHeight
                  ? this.options.constraints.minHeight -
                    Math.ceil(e(this._element).innerHeight())
                  : null,
                maxHeight: this.options.constraints.maxHeight
                  ? this.options.constraints.maxHeight -
                    Math.floor(e(this._element).innerHeight())
                  : null,
              }
            : {
                minWidth: this.options.constraints.minWidth
                  ? this.options.constraints.minWidth -
                    this._element.offsetWidth
                  : null,
                maxWidth: this.options.constraints.maxWidth
                  ? this.options.constraints.maxWidth -
                    this._element.offsetWidth
                  : null,
                minHeight: this.options.constraints.minHeight
                  ? this.options.constraints.minHeight -
                    this._element.offsetHeight
                  : null,
                maxHeight: this.options.constraints.maxHeight
                  ? this.options.constraints.maxHeight -
                    this._element.offsetHeight
                  : null,
              }),
            t.set_constraints(null),
            "E" == t._direction || "W" == t._direction
              ? (t.set_minY(l.top), t.set_maxY(l.top + o.outerHeight()))
              : ("N" != t._direction && "S" != t._direction) ||
                (t.set_minX(l.left), t.set_maxX(l.left + o.outerWidth())),
            t._direction.indexOf("W") > -1
              ? (null !== i.maxWidth &&
                  (t.set_minX(null),
                  t.set_minX(t.get_position().x - i.maxWidth)),
                t.set_maxX(null),
                null !== i.minWidth
                  ? t.set_maxX(t.get_position().x - i.minWidth + s)
                  : t.set_maxX(
                      this._getHandleOpositeConstraints(t._direction, n).x,
                    ))
              : t._direction.indexOf("E") > -1 &&
                (null !== i.maxWidth &&
                  (t.set_maxX(null),
                  t.set_maxX(t.get_position().x + i.maxWidth + s)),
                t.set_minX(null),
                null !== i.minWidth
                  ? t.set_minX(t.get_position().x + i.minWidth)
                  : t.set_minX(
                      this._getHandleOpositeConstraints(t._direction, n).x,
                    )),
            t._direction.indexOf("N") > -1
              ? (null !== i.maxHeight &&
                  (t.set_minY(null),
                  t.set_minY(t.get_position().y - i.maxHeight)),
                t.set_maxY(null),
                null !== i.minHeight
                  ? t.set_maxY(t.get_position().y - i.minHeight + s)
                  : t.set_maxY(
                      this._getHandleOpositeConstraints(t._direction, n).y,
                    ))
              : t._direction.indexOf("S") > -1 &&
                (null !== i.maxHeight &&
                  (t.set_maxY(null),
                  t.set_maxY(t.get_position().y + i.maxHeight + s)),
                t.set_minY(null),
                null !== i.minHeight
                  ? t.set_minY(t.get_position().y + i.minHeight)
                  : t.set_minY(
                      this._getHandleOpositeConstraints(t._direction, n).y,
                    ));
        },
        _getHandleOpositeConstraints: function (t, i) {
          var n = { x: null, y: null },
            s = i ? 0 : o(this.options.handleSize);
          return (
            t.toLowerCase().indexOf("w") > -1
              ? (n.x =
                  e(this._element).offset().left + e(this._element).width() + s)
              : t.toLowerCase().indexOf("e") > -1 &&
                (n.x = e(this._element).offset().left - s),
            t.toLowerCase().indexOf("n") > -1
              ? (n.y =
                  e(this._element).offset().top + e(this._element).height() + s)
              : t.toLowerCase().indexOf("s") > -1 &&
                (n.y = e(this._element).offset().top - s),
            n
          );
        },
        _sizeHandle: function (e) {
          var t = e.get_direction();
          this.options.useTinyHandles
            ? (e._element.style.width = e._element.style.height =
                this.options.handleSize + "px")
            : (t.indexOf("W") > -1 || t.indexOf("E") > -1
                ? (e._element.style.width = this.options.handleSize + "px")
                : (e._element.style.width =
                    Math.max(
                      this.options.handleSize,
                      parseFloat(this._element.clientWidth) -
                        this.options.handleSize,
                    ) + "px"),
              t.indexOf("N") > -1 || t.indexOf("S") > -1
                ? (e._element.style.height = this.options.handleSize + "px")
                : (e._element.style.height =
                    Math.max(
                      this.options.handleSize,
                      parseFloat(this._element.clientHeight) -
                        this.options.handleSize,
                    ) + "px"));
        },
        _positionHandle: function (e) {
          var t = this,
            i = t.options,
            n = i.appendHandleToElement && t._isRootPositioned();
          if (n && i.useTinyHandles) return t._positionHandleStatic(e);
          var s = e.get_direction(),
            l = t._element,
            a = l.clientHeight,
            r = l.clientWidth,
            h = s.indexOf("S") > -1 ? parseFloat(a) : 0,
            d = s.indexOf("E") > -1 ? parseFloat(r) : 0,
            _ = e._element.style,
            c =
              parseFloat(a) > i.handleSize / 2 && ("E" == s || "W" == s)
                ? 1
                : -1,
            m =
              parseFloat(r) > i.handleSize / 2 && ("N" == s || "S" == s)
                ? 1
                : -1,
            f = o(i.handleSize),
            u = n ? { top: 0, left: 0 } : t._getPosition(l);
          (_.top = u.top + h + c * f + "px"),
            (_.left = u.left + d + m * f + "px"),
            i.useTinyHandles &&
              (("S" != s && "N" != s) || (_.left = u.left + o(r) - f + "px"),
              ("E" != s && "W" != s) || (_.top = u.top + o(a) - f + "px"));
        },
        _positionHandleStatic: function (t) {
          if (!t._positioned) {
            var i = t.get_direction(),
              n = "-" + o(this.options.handleSize) + "px",
              s = {};
            i.indexOf("N") > -1 && (s.top = 0),
              i.indexOf("W") > -1 && (s.left = 0),
              i.indexOf("E") > -1 && (s.right = 0),
              i.indexOf("S") > -1 && (s.bottom = 0),
              ("N" != i && "S" != i) || ((s.left = "50%"), (s.marginLeft = n)),
              ("W" != i && "E" != i) || ((s.top = "50%"), (s.marginTop = n)),
              e(t._element).css(s),
              (t._positioned = !0);
          }
        },
        _isRootPositioned: function () {
          return (
            this._isRootIndirectlyPositioned() ||
            "static" != $telerik.getComputedStyle(this._element, "position")
          );
        },
        _isRootIndirectlyPositioned: function () {
          var e = this._element;
          return (
            "none" != $telerik.getComputedStyle(e, "transform") &&
            "none" != $telerik.getComputedStyle(e, "webkitTransform") &&
            "none" != $telerik.getComputedStyle(e, "OTransform") &&
            "none" != $telerik.getComputedStyle(e, "msTransform")
          );
        },
        _getPosition: function (e) {
          for (
            var t = { top: e.offsetTop, left: e.offsetLeft },
              i = e.offsetParent;
            i;

          ) {
            (t.top += i.offsetTop), (t.left += i.offsetLeft);
            var n = $telerik.getComputedStyle(i, "overflowX"),
              s = $telerik.getComputedStyle(i, "overflowY");
            ("auto" !== s && "scroll" !== s) || (t.top -= i.scrollTop),
              ("auto" !== n && "scroll" !== n) || (t.left -= i.scrollLeft),
              (i = i.offsetParent);
          }
          return t;
        },
        _toggleDocumentCursor: function (e) {
          this.options.ownerDocument.body.style.cursor =
            "string" == typeof e ? this._getCursorFromDirection(e) : "";
        },
        _getCursorFromDirection: function (e) {
          return e ? e.toLowerCase() + "-resize" : null;
        },
        _handleDragStart: function (t, i) {
          this._setHandleConstraints(t);
          var n = new s.Resizable.ResizeableEventArgs(
            t.get_direction(),
            null,
            i.get_domEvent(),
          );
          this.trigger("resizeStart", n),
            n._cancel || this._toggleDocumentCursor(t.get_direction()),
            i.set_cancel(n._cancel);
          var o = this.options;
          if (o.liveResize && !n._cancel) {
            var l = this._element;
            this.resizeHelper = {
              width: l.clientWidth,
              height: l.clientHeight,
              offset: o.appendHandleToElement
                ? { left: l.offsetLeft, top: l.offsetTop }
                : e(l).offset(),
            };
          }
          delete this._positionChangedX, delete this._positionChangedY;
        },
        _handleDragging: function (e, t) {
          var i = { x: t._delta.x, y: t._delta.y },
            n = e.get_direction(),
            o = this.options,
            l = this._element,
            a = o.appendHandleToElement;
          e.get_useExternalHandle() &&
            (("N" != n && "S" != n) ||
              ((i.x = 0), (i.y = Math.min(i.y, l.clientHeight))),
            ("E" != n && "W" != n) ||
              ((i.x = Math.min(i.x, l.clientWidth)), (i.y = 0)));
          var r,
            h = new s.Resizable.ResizeableEventArgs(n, i, t.get_domEvent());
          (this.trigger("resizing", h),
          t.set_cancel(h._cancel || a),
          o.liveResize && !h._cancel) &&
            (a || (r = this._getCornerHandesPositions()),
            this._applyElementSizing(n, i),
            this.trigger("resize", h),
            r && this._validateHandlesPositions(r, t._delta, n));
        },
        _validateHandlesPositions: function (e, t, i) {
          var n = this._getCornerHandesPositions();
          "E" == i || "W" == i
            ? this._validateDeltaX(t, e, n, "E" == i ? "se" : "sw")
            : "S" == i || "N" == i
              ? this._validateDeltaY(t, e, n, "S" == i ? "se" : "ne")
              : "SW" == i
                ? (this._validateDeltaX(t, e, n, "nw"),
                  this._validateDeltaY(t, e, n, "se"))
                : "NW" == i
                  ? (this._validateDeltaX(t, e, n, "sw"),
                    this._validateDeltaY(t, e, n, "ne"))
                  : "NE" == i
                    ? (this._validateDeltaX(t, e, n, "se"),
                      this._validateDeltaY(t, e, n, "nw"))
                    : "SE" == i &&
                      (this._validateDeltaX(t, e, n, "ne"),
                      this._validateDeltaY(t, e, n, "sw"));
        },
        _validateDeltaX: function (e, t, i, n) {
          "_positionChangedX" in this ||
            0 == e.x ||
            (this._positionChangedX = t[n].left != i[n].left),
            !1 === this._positionChangedX && (e.x = 0);
        },
        _validateDeltaY: function (e, t, i, n) {
          "_positionChangedY" in this ||
            0 == e.y ||
            (this._positionChangedY = t[n].top != i[n].top),
            !1 === this._positionChangedY && (e.y = 0);
        },
        _getCornerHandesPositions: function () {
          var e = this._getHandleElement("SE"),
            t = this._getHandleElement("NE"),
            n = this._getHandleElement("SW"),
            s = this._getHandleElement("NW");
          return e && t && n && s
            ? {
                se: { top: e.offsetTop, left: e.offsetLeft },
                ne: { top: t.offsetTop, left: t.offsetLeft },
                sw: { top: n.offsetTop, left: n.offsetLeft },
                nw: { top: s.offsetTop, left: s.offsetLeft },
              }
            : i;
        },
        _getHandleElement: function (e) {
          var t = this._handlesCollection[e];
          return t && t._element ? t._element : i;
        },
        _handleDragEnd: function (e, t) {
          var i = t._delta,
            n = e.get_direction();
          e.get_useExternalHandle() &&
            (("N" != n && "S" != n) ||
              ((i.x = 0), (i.y = Math.min(i.y, this._element.clientHeight))),
            ("E" != n && "W" != n) ||
              ((i.x = Math.min(i.x, this._element.clientWidth)), (i.y = 0))),
            this._toggleDocumentCursor(),
            this._configureHandles();
          var o = new s.Resizable.ResizeableEventArgs(
            e.get_direction(),
            i,
            t.get_domEvent(),
          );
          this.trigger("resizeEnd", o);
        },
        _applyElementSizing: function (t, i) {
          var n = 1,
            s = 1;
          for (var o in (t.indexOf("W") > -1 &&
            ((s = -1),
            $telerik
              .$(this._element)
              .css("left", parseFloat(this.resizeHelper.offset.left) + i.x)),
          t.indexOf("N") > -1 &&
            ((n = -1),
            $telerik
              .$(this._element)
              .css("top", parseFloat(this.resizeHelper.offset.top) + i.y)),
          e(this._element)
            .innerWidth(parseFloat(this.resizeHelper.width) + s * i.x)
            .innerHeight(parseFloat(this.resizeHelper.height) + n * i.y),
          this._handlesCollection))
            o != t && this._positionHandle(this._handlesCollection[o]);
        },
        dispose: function () {
          for (var e in (this.trigger("destroy", Sys.EventArgs.Empty),
          this._handlesCollection)) {
            var t = this._handlesCollection[e];
            t.get_useExternalHandle() ||
              (t._element.parentNode &&
                t._element.parentNode.removeChild(t._element)),
              t.dispose();
          }
          (this._element = null),
            (this._handlesCollection = null),
            (this.options = null);
        },
      }),
      (s.Resizable.ResizeableEventArgs = function (e, t, i) {
        (this._cancel = !1),
          (this._delta = t),
          (this._direction = e),
          (this._domEvent = i);
      }),
      (s.Resizable.ResizeableEventArgs.prototype = {
        get_delta: function () {
          return this._delta;
        },
        get_direction: function () {
          return this._direction;
        },
        get_domEvent: function () {
          return this._domEvent;
        },
        get_cancel: function () {
          return this._cancel;
        },
        set_cancel: function (e) {
          this._cancel = !0 === e || "true" === e;
        },
      }),
      (s.Handle = function (t, i, n) {
        (this._direction = i),
          (this.options = e.extend(this.options, n || {})),
          Telerik.Web.UI.Widgets.Handle.initializeBase(this, [t, n]);
      }),
      (s.Handle.prototype = {
        get_direction: function () {
          return this._direction;
        },
      }),
      Telerik.Web.UI.Widgets.Draggable.registerClass(
        "Telerik.Web.UI.Widgets.Draggable",
      ),
      Telerik.Web.UI.Widgets.Handle.registerClass(
        "Telerik.Web.UI.Widgets.Handle",
        Telerik.Web.UI.Widgets.Draggable,
      );
  })($telerik.$, Telerik.Web.UI);
