Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.RendererBase = function (t) {
    (this.tooltip = t), (this.isRightToLeft = t.isRightToLeft());
  }),
  (Telerik.Web.UI.ToolTip.RendererBase.prototype = {
    createPopupBehavior: function () {
      this.tooltip._popupBehavior = $create(
        Telerik.Web.PopupBehavior,
        {
          id: new Date() - 100 + "PopupBehavior",
          parentElement: this.tooltip._targetControl,
          overlay: this.tooltip._overlay,
        },
        null,
        null,
        this.tooltip._popupElement,
      );
    },
  }),
  Telerik.Web.UI.ToolTip.RendererBase.registerClass(
    "Telerik.Web.UI.ToolTip.RendererBase",
  ),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.IRenderer = function (t) {}),
  (Telerik.Web.UI.ToolTip.IRenderer.prototype = {
    createUI: function () {},
    createRootElement: function () {},
    createCalloutElement: function () {},
    createTitleElement: function () {},
    createContentWrapper: function () {},
    setContent: function () {},
  }),
  Telerik.Web.UI.ToolTip.IRenderer.registerInterface(
    "Telerik.Web.UI.ToolTip.IRenderer",
  ),
  (function () {
    Type.registerNamespace("Telerik.Web.UI.ToolTip");
    var t = Telerik.Web.UI,
      e = $telerik.getComputedStyle,
      i = function (t) {
        return parseInt(t, 10);
      };
    (Telerik.Web.UI.ToolTip.BaseView = function (t) {
      this.tooltip = t;
    }),
      (Telerik.Web.UI.ToolTip.BaseView.prototype = {
        get_width: function () {
          this.tooltip._width;
        },
        get_height: function () {
          this.tooltip._height;
        },
        _addElementShadow: function (t) {
          this.tooltip.get_enableShadow() &&
            Sys.UI.DomElement.addCssClass(t, "rtShadow");
        },
        _removeElementShadow: function (t) {
          this.tooltip.get_enableShadow() &&
            Sys.UI.DomElement.removeCssClass(t, "rtShadow");
        },
        _fixCalloutPosition: function (o, l, n) {
          var s,
            r,
            a = this.tooltip,
            h = a.get_popupElement(),
            p = $telerik.getBounds(h),
            u = a._verticalPosition === t.ToolTipVerticalPosition.Middle,
            _ = a._calloutElement,
            d = $telerik.getBounds(_);
          if (
            ((_.style.left = ""),
            (_.style.top = ""),
            0 !== p.width || 0 !== p.height)
          ) {
            if (u) {
              var c = i(e(h, "borderTopWidth")),
                T = p.height - d.height;
              r =
                (r = Math.floor(o.y + n / 2 - p.y - c)) < d.height || r > T
                  ? p.height / 2
                  : r;
            } else {
              var g = i(e(h, "borderLeftWidth")),
                m = p.width - d.width;
              switch (a._horizontalPosition) {
                case t.ToolTipHorizontalPosition.Center:
                  s =
                    (s = Math.floor(o.x + l / 2 - p.x - g)) < d.width || s > m
                      ? p.width / 2
                      : s;
                  break;
                case t.ToolTipHorizontalPosition.Right:
                  s =
                    (s = Math.floor(o.x + l - p.x - g)) < d.width || s > m
                      ? d.width - g
                      : s;
                  break;
                case t.ToolTipHorizontalPosition.Left:
                  s =
                    (s = Math.floor(o.x - p.x)) < d.width || s > m
                      ? p.width - d.width
                      : s;
              }
            }
            r && (_.style.top = r + "px"), s && (_.style.left = s + "px");
          }
        },
        fixToolTipPositionBase: function (t, e, i, o, l, n) {
          if (0 != e.width || 0 != e.height) {
            var s,
              r,
              a,
              h = !1,
              p = this.tooltip.get_position();
            l
              ? ((s = 2),
                (r =
                  t.x + i > e.x + n &&
                  this.tooltip._horizontalPosition ==
                    Telerik.Web.UI.ToolTipHorizontalPosition.Right),
                (a =
                  t.x < e.x - n &&
                  this.tooltip._horizontalPosition ==
                    Telerik.Web.UI.ToolTipHorizontalPosition.Left))
              : ((s = 20),
                (r =
                  t.y + o > e.y + n &&
                  this.tooltip._verticalPosition ==
                    Telerik.Web.UI.ToolTipVerticalPosition.Bottom),
                (a =
                  t.y < e.y - n &&
                  this.tooltip._verticalPosition ==
                    Telerik.Web.UI.ToolTipVerticalPosition.Top)),
              r && ((h = !0), (s *= -1)),
              a && (h = !0),
              h &&
                ((p += s),
                (this.tooltip._originalPosition = this.tooltip.get_position()),
                this.tooltip.set_position(p),
                this.tooltip.updateLocation());
          }
        },
        _setOverflowToElement: function (t, e) {
          var i = Telerik.Web.UI.ToolTipScrolling;
          switch (e) {
            case i.X:
              (t.style.overflowX = "scroll"), (t.style.overflowY = "hidden");
              break;
            case i.Y:
              (t.style.overflowY = "scroll"), (t.style.overflowX = "hidden");
          }
        },
        _fixMozSetOverflowToElement: function (t, e) {
          t.style.overflowX ||
            t.style.overflowY ||
            (t.style.overflow = this._getOverflowString(e));
        },
        _getOverflowString: function (t) {
          var e = "",
            i = Telerik.Web.UI.ToolTipScrolling;
          switch (t) {
            case i.Auto:
              e = "auto";
              break;
            case i.None:
              e = "hidden";
              break;
            case i.Both:
              e = "scroll";
          }
          return e;
        },
        _createTouchScrollExtender: function (t) {
          t != Telerik.Web.UI.ToolTipScrolling.None &&
            Telerik.Web.UI.TouchScrollExtender._getNeedsScrollExtender() &&
            !this.tooltip._dropDownTouchScroll &&
            this.tooltip._createTouchScrollExtender(!0);
        },
        registerPopupHandlers: function (t) {
          1 == t
            ? this.tooltip.get_sticky()
              ? ((this.tooltip._popupStickyHandler = Function.createDelegate(
                  this,
                  this._onPopupStickyMouseOut,
                )),
                $addHandler(
                  this.tooltip._popupElement,
                  "mouseout",
                  this.tooltip._popupStickyHandler,
                ))
              : this.tooltip.get_leaveTargetAndToolTip() &&
                ((this.tooltip._popupEnterHandler = Function.createDelegate(
                  this,
                  this._onPopupEnterToolTip,
                )),
                $addHandler(
                  this.tooltip._popupElement,
                  "mouseover",
                  this.tooltip._popupEnterHandler,
                ),
                (this.tooltip._popupLeaveHandler = Function.createDelegate(
                  this,
                  this._onPopupLeaveToolTip,
                )),
                $addHandler(
                  this.tooltip._popupElement,
                  "mouseout",
                  this.tooltip._popupLeaveHandler,
                ))
            : (this.tooltip._popupStickyHandler ||
                this.tooltip._popupEnterHandler ||
                this.tooltip._popupLeaveHandler) &&
              ($clearHandlers(this.tooltip._popupElement),
              (this.tooltip._popupStickyHandler = null),
              (this.tooltip._popupEnterHandler = null),
              (this.tooltip._popupLeaveHandler = null));
        },
        _onPopupStickyMouseOut: function (t) {
          this.isMouseOverElement(t) ||
            this.tooltip._hideIfNotManualCloseOrFromCode();
        },
        _onPopupEnterToolTip: function (t) {
          this.isMouseOverElement(t) &&
            (this.tooltip.cancelHideDelay(),
            this.tooltip.cancelAutoCloseDelay());
        },
        _onPopupLeaveToolTip: function (t) {
          this.isMouseOverElement(t) ||
            (this.tooltip._resetHideDelay(),
            this.tooltip._resetAutoCloseDelay());
        },
        isMouseOverElement: function (t) {
          return $telerik.isMouseOverElementEx(this.tooltip._popupElement, t);
        },
      }),
      Telerik.Web.UI.ToolTip.BaseView.registerClass(
        "Telerik.Web.UI.ToolTip.BaseView",
      );
  })(),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.IView = function (t) {}),
  (Telerik.Web.UI.ToolTip.IView.prototype = {
    set_width: function (t) {},
    set_height: function (t) {},
    addShadow: function () {},
    removeShadow: function () {},
    get_bounds: function () {},
    refreshTitle: function () {},
    showLoadingMessage: function () {},
    isLoading: function () {},
  }),
  Telerik.Web.UI.ToolTip.IView.registerInterface(
    "Telerik.Web.UI.ToolTip.IView",
  ),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.ClassicRenderer = function (t) {
    Telerik.Web.UI.ToolTip.ClassicRenderer.initializeBase(this, [t]);
  }),
  (Telerik.Web.UI.ToolTip.ClassicRenderer.prototype = {
    createUI: function () {
      this.tooltip._popupElement ||
        (this.createRootElement(),
        this.createCalloutElement(),
        this.createTableElement(),
        this.createTableElementCells(),
        this.createTitleWrapper(),
        this.createTitleElement(),
        this.tooltip._refreshTitle(),
        this.createManualCloseButton(),
        this.appendTitleElements(),
        this.createContentWrapper(),
        this.setContent()),
        this.tooltip._popupBehavior || this.createPopupBehavior();
    },
    createRootElement: function () {
      var t = "RadToolTipWrapper_" + this.tooltip.get_id(),
        e = document.createElement("div");
      (e.id = t),
        (e.className =
          this.tooltip._getFullSkinName() +
          (this.tooltip.get_showCallout() ? " rtVisibleCallout" : "") +
          (this.isRightToLeft ? " RadToolTip_rtl" : "") +
          (this.tooltip._cssClass ? " " + this.tooltip._cssClass : " ")),
        $telerik.isIE6 || this.tooltip._getUiView()._addElementShadow(e),
        e.setAttribute("unselectable", "on"),
        (this.tooltip._popupElement = e);
    },
    createCalloutElement: function () {
      var t = document.createElement("div");
      (t.className =
        "rtCallout " +
        this.tooltip._getCalloutPosition(this.tooltip._position)),
        (t.innerHTML = "&nbsp;"),
        (this.tooltip._calloutElement = t);
    },
    createTableElement: function () {
      var t = document.createElement("table");
      t.className = "rtWrapper";
      var e = parseInt(this.tooltip.get_width(), 10);
      t.style.width = !isNaN(e) && e > 0 ? e + "px" : "";
      var i = parseInt(this.tooltip.get_height(), 10);
      (t.style.height = !isNaN(i) && i > 0 ? i + "px" : ""),
        (this.tooltip._tableElement = t);
    },
    createTableElementCells: function () {
      var t = [];
      (t = this.isRightToLeft
        ? [
            "rtWrapperTopRight",
            "rtWrapperTopCenter",
            "rtWrapperTopLeft",
            "rtWrapperRightMiddle",
            "rtWrapperContent",
            "rtWrapperLeftMiddle",
            "rtWrapperBottomRight",
            "rtWrapperBottomCenter",
            "rtWrapperBottomLeft",
          ]
        : [
            "rtWrapperTopLeft",
            "rtWrapperTopCenter",
            "rtWrapperTopRight",
            "rtWrapperLeftMiddle",
            "rtWrapperContent",
            "rtWrapperRightMiddle",
            "rtWrapperBottomLeft",
            "rtWrapperBottomCenter",
            "rtWrapperBottomRight",
          ]),
        $telerik.isIE6 ||
          this.tooltip._uiView._addElementShadow(this.tooltip._tableElement);
      for (var e = 0, i = 1; i <= 3; i++)
        for (
          var o = this.tooltip._tableElement.insertRow(-1), l = 1;
          l <= 3;
          l++
        ) {
          var n = o.insertCell(-1);
          (n.innerHTML = "&nbsp;"), (n.className = t[e]), e++;
        }
    },
    createTitleElement: function () {
      var t = document.createElement("div");
      (t.className = "rtTitlebar"),
        (t.style.display = "none"),
        (this.tooltip._titleBar = t);
    },
    createManualCloseButton: function () {
      if (this.tooltip.get_manualClose()) {
        var t = document.createElement("a");
        (t.href = "javascript: void(0);"),
          (t.className = "rtCloseButton"),
          (this.tooltip._closeElementHandler = Function.createDelegate(
            this,
            function (t) {
              return (
                this.tooltip._hideUnconditionally(), $telerik.cancelRawEvent(t)
              );
            },
          )),
          $addHandler(t, "click", this.tooltip._closeElementHandler),
          (this.tooltip._closeElement = t);
        var e = document.createElement("span");
        (e.innerHTML = this.tooltip._manualCloseButtonText),
          (t.title = this.tooltip._manualCloseButtonText),
          (this.tooltip._manualCloseButton = t),
          t.appendChild(e);
      }
    },
    appendTitleElements: function () {
      this.tooltip._manualCloseButton
        ? this.isRightToLeft
          ? (this.tooltip._titleWrapper.appendChild(
              this.tooltip._manualCloseButton,
            ),
            this.tooltip._titleWrapper.appendChild(this.tooltip._titleBar))
          : (this.tooltip._titleWrapper.appendChild(this.tooltip._titleBar),
            this.tooltip._titleWrapper.appendChild(
              this.tooltip._manualCloseButton,
            ))
        : this.tooltip._titleWrapper.appendChild(this.tooltip._titleBar);
    },
    createTitleWrapper: function () {
      (this.tooltip._titleWrapper =
        this.tooltip._tableElement.rows[0].cells[1]),
        (this.tooltip._titleWrapper.innerHTML = "");
    },
    createContentWrapper: function () {
      var t = this.tooltip._tableElement.rows[1].cells[1];
      (t.vAlign = "top"),
        (t.innerHTML = ""),
        (this.tooltip._contentWrapper = t);
    },
    setContent: function () {
      var t,
        e = this.tooltip;
      if (e._text) e.set_content(e._text);
      else {
        var i = e.get_id();
        if ((i && (t = $get(i)), t && t.innerHTML)) {
          var o = e._transferNodeChildren(t);
          e.set_contentElement(o);
        }
      }
      var l = e._popupElement;
      l.appendChild(e._calloutElement), l.appendChild(e._tableElement);
      var n = l.style;
      (n.display = "none"),
        (n.position = "absolute"),
        (t = t || e.get_element()),
        e._addToolTipToDocument(t);
    },
    _appendManualCloseButton: function (t) {
      this.tooltip._titleWrapper.appendChild(t);
    },
    _removeManualCloseButton: function (t) {
      this.tooltip._titleWrapper.removeChild(t);
    },
  }),
  Telerik.Web.UI.ToolTip.ClassicRenderer.registerClass(
    "Telerik.Web.UI.ToolTip.ClassicRenderer",
    Telerik.Web.UI.ToolTip.RendererBase,
    Telerik.Web.UI.ToolTip.IRenderer,
  ),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.ClassicRendererAria = function (t) {
    Telerik.Web.UI.ToolTip.ClassicRendererAria.initializeBase(this, [t]);
  }),
  (Telerik.Web.UI.ToolTip.ClassicRendererAria.prototype = {
    createUI: function () {
      Telerik.Web.UI.ToolTip.ClassicRendererAria.callBaseMethod(
        this,
        "createUI",
      ),
        this._applyAriaSupport();
    },
    _applyAriaSupport: function () {
      if (this.tooltip.get_enableAriaSupport()) {
        this.tooltip.get_element().setAttribute("aria-hidden", "true"),
          this._applyAriaForLayoutTables();
        var t = this.tooltip.get_popupElement();
        t.setAttribute("aria-hidden", "true"),
          t.setAttribute("aria-labelledby", this.tooltip._titleBar.id),
          t.setAttribute("role", "tooltip");
        var e = this.tooltip.getManualCloseButton();
        e && e.setAttribute("role", "button");
      }
    },
    _applyAriaForLayoutTables: function () {
      var t = this.tooltip._tableElement;
      t && t.setAttribute("role", "presentation");
      for (var e = t.getElementsByTagName("tr"), i = 0; i < e.length; i++) {
        var o = e[i];
        o.setAttribute("role", "presentation");
        for (var l = o.getElementsByTagName("td"), n = 0; n < l.length; n++)
          l[n].setAttribute("role", "presentation");
      }
      var s = this.tooltip._titleBar;
      s &&
        ((s.id = this.tooltip.get_id() + "_title"),
        s.setAttribute("role", "label"));
    },
  }),
  Telerik.Web.UI.ToolTip.ClassicRendererAria.registerClass(
    "Telerik.Web.UI.ToolTip.ClassicRendererAria",
    Telerik.Web.UI.ToolTip.ClassicRenderer,
  ),
  (function () {
    Type.registerNamespace("Telerik.Web.UI.ToolTip");
    var t = Telerik.Web.UI;
    (Telerik.Web.UI.ToolTip.LightweightRenderer = function (t) {
      Telerik.Web.UI.ToolTip.LightweightRenderer.initializeBase(this, [t]);
    }),
      (Telerik.Web.UI.ToolTip.LightweightRenderer.prototype = {
        createUI: function () {
          this.tooltip._popupElement ||
            (this.createRootElement(),
            this.addRoundedCorners(),
            this.createTooltipWrapper(),
            this.setRootElementSize(),
            this.createManualCloseButton(),
            this.createCalloutElement(),
            this.createTitleElement(),
            this.createContentWrapper(),
            this.setContent()),
            this.tooltip._popupBehavior || this.createPopupBehavior();
        },
        createRootElement: function () {
          var t = "RadToolTipWrapper_" + this.tooltip.get_id(),
            e = document.createElement("div");
          (e.id = t),
            (e.className =
              this.tooltip._getFullSkinName() +
              (this.tooltip.get_showCallout() ? " rtVisibleCallout" : "") +
              (this.isRightToLeft ? " rtRtl" : "") +
              (this.tooltip._cssClass ? " " + this.tooltip._cssClass : "")),
            $telerik.isIE6 || this.tooltip._getUiView()._addElementShadow(e),
            e.setAttribute("unselectable", "on"),
            this.set_popupElement(e);
        },
        setRootElementSize: function () {
          var t = parseInt(this.tooltip.get_width(), 10);
          this.get_popupElement().style.width =
            !isNaN(t) && t > 0 ? t + "px" : "";
          var e = parseInt(this.tooltip.get_height(), 10);
          this.get_popupElement().style.height =
            !isNaN(e) && e > 0 ? e + "px" : "";
        },
        addRoundedCorners: function () {
          this.tooltip.get_enableRoundedCorners() &&
            Sys.UI.DomElement.addCssClass(
              this.get_popupElement(),
              "rtRoundedCorner",
            );
        },
        createCalloutElement: function () {
          if (
            this.tooltip.get_position() !=
              Telerik.Web.UI.ToolTipPosition.Center &&
            this.tooltip.get_relativeTo() !=
              Telerik.Web.UI.ToolTipRelativeDisplay.BrowserWindow
          ) {
            var t = document.createElement("span");
            (t.className =
              "rtCallout " +
              this.tooltip._getCalloutPosition(this.tooltip._position)),
              (t.innerHTML = "&nbsp;"),
              this.set_calloutElement(t),
              this.get_tooltipWrapper().appendChild(t);
          }
        },
        createTitleElement: function () {
          if (this.tooltip._title) {
            this.createTitleBar(), this.createTitleWrapper();
            var t = document.createElement("span");
            (t.className = "rtTitle"),
              (t.style.display = "none"),
              this.set_titleElement(t),
              this.get_titleWrapper().appendChild(t),
              this.tooltip.set_title(this.tooltip._title);
          }
        },
        createTitleBar: function () {
          var t = document.createElement("div");
          (t.className = "rtTitleBar"),
            this.set_titleBar(t),
            this.get_tooltipWrapper().appendChild(t);
        },
        createTitleWrapper: function () {
          var t = document.createElement("div");
          (t.className = "rtTitleWrapper"),
            (t.id = this.tooltip.get_id() + "_title"),
            this.set_titleWrapper(t),
            this.get_titleBar().appendChild(t);
        },
        createManualCloseButton: function () {
          if (this.tooltip.get_manualClose()) {
            var e = document.createElement("span");
            (e.className = "rtClose rtCloseIcon"),
              this.tooltip._materialRippleManager &&
                this.tooltip._materialRippleManager.initializeRipple(e, {
                  rippleType: t.MaterialRippleType.Icon,
                }),
              this.tooltip._manualCloseButtonText &&
                ((e.value = this.tooltip._manualCloseButtonText),
                (e.title = this.tooltip._manualCloseButtonText)),
              this.set_manualCloseButton(e),
              (this.tooltip._closeElement = e),
              (this.tooltip._closeElementHandler = Function.createDelegate(
                this,
                function (t) {
                  return (
                    this.tooltip._hideUnconditionally(),
                    $telerik.cancelRawEvent(t)
                  );
                },
              )),
              $addHandler(e, "click", this.tooltip._closeElementHandler),
              this.get_tooltipWrapper().appendChild(e);
          }
        },
        createTooltipWrapper: function () {
          var t = document.createElement("div");
          (t.className = "rtRelativeWrapper"),
            this.set_tooltipWrapper(t),
            this.get_popupElement().appendChild(t);
        },
        createContentWrapper: function () {
          var t = document.createElement("div");
          (t.className = "rtContent"),
            (t.innerHTML = ""),
            this.set_contentWrapper(t),
            this.get_tooltipWrapper().appendChild(t);
        },
        setContent: function () {
          var t,
            e = this.tooltip;
          if (e._text) e.set_content(e._text);
          else {
            var i = e.get_id();
            if ((i && (t = $get(i)), t && t.innerHTML)) {
              var o = e._transferNodeChildren(t);
              e.set_contentElement(o);
            }
          }
          var l = this.get_popupElement().style;
          (l.display = "none"),
            (l.position = "absolute"),
            (t = t || e.get_element()),
            e._addToolTipToDocument(t);
        },
        _appendManualCloseButton: function (t) {
          this.tooltip._tooltipWrapper.appendChild(t);
        },
        _removeManualCloseButton: function (t) {
          this.tooltip._tooltipWrapper.removeChild(t);
        },
        get_popupElement: function () {
          return this.tooltip._popupElement;
        },
        set_popupElement: function (t) {
          this.tooltip._popupElement = t;
        },
        get_contentWrapper: function () {
          return this.tooltip._contentWrapper;
        },
        set_contentWrapper: function (t) {
          this.tooltip._contentWrapper = t;
        },
        get_tooltipWrapper: function () {
          return this.tooltip._tooltipWrapper;
        },
        set_tooltipWrapper: function (t) {
          this.tooltip._tooltipWrapper = t;
        },
        get_calloutElement: function () {
          return this.tooltip._calloutElement;
        },
        set_calloutElement: function (t) {
          this.tooltip._calloutElement = t;
        },
        get_titleElement: function () {
          return this.tooltip._titleElement;
        },
        set_titleElement: function (t) {
          this.tooltip._titleElement = t;
        },
        get_titleWrapper: function () {
          return this.tooltip._titleWrapper;
        },
        set_titleWrapper: function (t) {
          this.tooltip._titleWrapper = t;
        },
        get_titleBar: function () {
          return this.tooltip._titleBar;
        },
        set_titleBar: function (t) {
          this.tooltip._titleBar = t;
        },
        get_manualCloseButton: function () {
          return this.tooltip._manualCloseButton;
        },
        set_manualCloseButton: function (t) {
          this.tooltip._manualCloseButton = t;
        },
      }),
      Telerik.Web.UI.ToolTip.LightweightRenderer.registerClass(
        "Telerik.Web.UI.ToolTip.LightweightRenderer",
        Telerik.Web.UI.ToolTip.RendererBase,
        Telerik.Web.UI.ToolTip.IRenderer,
      );
  })(),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.LightweightRendererAria = function (t) {
    Telerik.Web.UI.ToolTip.LightweightRendererAria.initializeBase(this, [t]);
  }),
  (Telerik.Web.UI.ToolTip.LightweightRendererAria.prototype = {
    createUI: function () {
      Telerik.Web.UI.ToolTip.LightweightRendererAria.callBaseMethod(
        this,
        "createUI",
      ),
        this._applyAriaSupport();
    },
    _applyAriaSupport: function () {
      if (this.tooltip.get_enableAriaSupport()) {
        this.tooltip.get_element().setAttribute("aria-hidden", "true"),
          this.tooltip._tooltipWrapper.setAttribute("role", "presentation"),
          this.tooltip._contentWrapper.setAttribute("role", "presentation");
        var t = this.tooltip.get_popupElement();
        this.tooltip._title &&
          t.setAttribute("aria-labelledby", this.tooltip._titleWrapper.id),
          t.setAttribute("aria-hidden", "true"),
          t.setAttribute("role", "tooltip");
        var e = this.tooltip.getManualCloseButton();
        e && e.setAttribute("role", "button");
      }
    },
  }),
  Telerik.Web.UI.ToolTip.LightweightRendererAria.registerClass(
    "Telerik.Web.UI.ToolTip.LightweightRendererAria",
    Telerik.Web.UI.ToolTip.LightweightRenderer,
  ),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (function () {
    var t = "rtLoading";
    (Telerik.Web.UI.ToolTip.ClassicView = function (t) {
      Telerik.Web.UI.ToolTip.ClassicView.initializeBase(this, [t]);
    }),
      (Telerik.Web.UI.ToolTip.ClassicView.prototype = {
        set_width: function (t) {
          (this.tooltip._popupElement.style.width = ""),
            (this.tooltip._tableElement.style.width = t + "px");
        },
        set_height: function (t) {
          (this.tooltip._popupElement.style.height = ""),
            (this.tooltip._tableElement.style.height = t + "px");
        },
        addShadow: function () {
          this._addElementShadow(this.tooltip._tableElement),
            this._addElementShadow(this.tooltip._popupElement);
        },
        removeShadow: function () {
          this._removeElementShadow(this.tooltip._tableElement),
            this._removeElementShadow(this.tooltip._popupElement);
        },
        get_bounds: function () {
          return $telerik.getBounds(this.tooltip._tableElement);
        },
        fixIeHeight: function () {
          if ("CSS1Compat" == document.compatMode) {
            var t =
              this.tooltip._tableElement.offsetHeight -
              parseInt(this.tooltip.get_height(), 10);
            if (t > 0) {
              var e = parseInt(this.tooltip._tableElement.style.height, 10) - t;
              e > 0 && (this.tooltip._tableElement.style.height = e + "px");
            }
          }
        },
        fixToolTipPosition: function (t, e, i, o, l) {
          this.fixToolTipPositionBase(t, e, i, o, l, 0);
        },
        fixTooltipBounds: function (t) {
          return t;
        },
        refreshTitle: function () {
          if (null != this.tooltip._titleBar) {
            (this.tooltip._titleBar.innerHTML = this.tooltip._title),
              (this.tooltip._titleBar.style.display = this.tooltip._title
                ? ""
                : "none");
            var t = this.tooltip._tableElement.rows[0];
            Sys.UI.DomElement.removeCssClass(t, "rtVisibleTitleBar"),
              this.tooltip._title &&
                Sys.UI.DomElement.addCssClass(t, "rtVisibleTitleBar"),
              Telerik.Web.UI.ToolTip.AriaSupportHelper.setTitleElementAriaHiddenAttr(
                t,
                this.tooltip._title,
                this.tooltip.get_enableAriaSupport(),
              );
          }
        },
        showLoadingMessage: function (e) {
          var i = this.tooltip._getFullSkinName();
          e
            ? (Sys.UI.DomElement.addCssClass(this.tooltip._contentWrapper, i),
              Sys.UI.DomElement.addCssClass(this.tooltip._contentWrapper, t))
            : (Sys.UI.DomElement.removeCssClass(
                this.tooltip._contentWrapper,
                i,
              ),
              Sys.UI.DomElement.removeCssClass(
                this.tooltip._contentWrapper,
                t,
              ));
        },
        isLoading: function () {
          return Sys.UI.DomElement.containsCssClass(
            this.tooltip._contentWrapper,
            t,
          );
        },
        setOverflow: function () {
          var t = this.tooltip.get_contentScrolling();
          if (t != Telerik.Web.UI.ToolTipScrolling.Default) {
            var e = this.tooltip._contentElement;
            if (
              e &&
              e.parentNode == this.tooltip._contentWrapper &&
              ((e.document && e.document.documentElement) || !$telerik.isIE)
            ) {
              this._setOverflowToElement(e, t);
              var i = e.parentNode;
              e.style.display = "none";
              var o = $telerik.getPaddingBox(e),
                l = $telerik.getPaddingBox(i),
                n = $telerik.getBounds(i);
              (e.style.width =
                Math.abs(n.width - o.horizontal - l.horizontal) + "px"),
                (e.style.height =
                  Math.abs(n.height - o.vertical - l.vertical) + "px"),
                this._fixMozSetOverflowToElement(e, t),
                this._createTouchScrollExtender(t),
                (e.style.display = "");
            }
          }
        },
      }),
      Telerik.Web.UI.ToolTip.ClassicView.registerClass(
        "Telerik.Web.UI.ToolTip.ClassicView",
        Telerik.Web.UI.ToolTip.BaseView,
        Telerik.Web.UI.ToolTip.IView,
      );
  })(),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (function () {
    var t = "rtLoading";
    (Telerik.Web.UI.ToolTip.LightweightView = function (t) {
      Telerik.Web.UI.ToolTip.LightweightView.initializeBase(this, [t]);
    }),
      (Telerik.Web.UI.ToolTip.LightweightView.prototype = {
        set_width: function (t) {
          this.tooltip._popupElement.style.width = t + "px";
        },
        set_height: function (t) {
          this.tooltip._popupElement.style.height = t + "px";
        },
        addShadow: function () {
          this._addElementShadow(this.tooltip._popupElement);
        },
        removeShadow: function () {
          this._removeElementShadow(this.tooltip._popupElement);
        },
        get_bounds: function () {
          return $telerik.getBounds(this.tooltip._popupElement);
        },
        fixTooltipBounds: function (t) {
          if (
            this.tooltip.get_relativeTo() ==
            Telerik.Web.UI.ToolTipRelativeDisplay.BrowserWindow
          )
            return t;
          var e = this.get_calloutPosition(),
            i = Telerik.Web.UI.CalloutPosition;
          switch (e) {
            case i.TopLeft:
              (t.x -= 31), (t.y += 9);
              break;
            case i.TopCenter:
              t.y += 9;
              break;
            case i.TopRight:
              (t.x += 40), (t.y += 9);
              break;
            case i.MiddleLeft:
              t.x += 10;
              break;
            case i.Center:
              break;
            case i.MiddleRight:
              t.x -= 2;
              break;
            case i.BottomLeft:
              t.x -= 31;
              break;
            case i.BottomCenter:
              break;
            case i.BottomRight:
              t.x += 40;
          }
          return t;
        },
        get_calloutPosition: function () {
          var t = this.tooltip.get_position(),
            e = Telerik.Web.UI.ToolTipPosition;
          switch (t) {
            case e.TopLeft:
              return Telerik.Web.UI.CalloutPosition.BottomRight;
            case e.TopCenter:
              return Telerik.Web.UI.CalloutPosition.BottomCenter;
            case e.TopRight:
              return Telerik.Web.UI.CalloutPosition.BottomLeft;
            case e.MiddleLeft:
              return Telerik.Web.UI.CalloutPosition.MiddleRight;
            case e.Center:
              return Telerik.Web.UI.CalloutPosition.Center;
            case e.MiddleRight:
              return Telerik.Web.UI.CalloutPosition.MiddleLeft;
            case e.BottomLeft:
              return Telerik.Web.UI.CalloutPosition.TopRight;
            case e.BottomCenter:
              return Telerik.Web.UI.CalloutPosition.TopCenter;
            case e.BottomRight:
              return Telerik.Web.UI.CalloutPosition.TopLeft;
          }
          return null;
        },
        fixIeHeight: function () {
          if ("CSS1Compat" == document.compatMode) {
            var t =
              this.tooltip._popupElement.offsetHeight -
              parseInt(this.tooltip.get_height(), 10);
            if (t > 0) {
              var e = parseInt(this.tooltip._popupElement.style.height, 10) - t;
              e > 0 && (this.tooltip._popupElement.style.height = e + "px");
            }
          }
        },
        fixToolTipPosition: function (t, e, i, o, l) {
          this.fixToolTipPositionBase(t, e, i, o, l, 10);
        },
        refreshTitle: function () {
          this.tooltip._titleElement &&
            ((this.tooltip._titleElement.innerHTML = this.tooltip._title),
            (this.tooltip._titleElement.style.display = this.tooltip._title
              ? ""
              : "none"),
            Telerik.Web.UI.ToolTip.AriaSupportHelper.setTitleElementAriaHiddenAttr(
              this.tooltip._titleBar,
              this.tooltip._title,
              this.tooltip.get_enableAriaSupport(),
            ));
        },
        showLoadingMessage: function (e) {
          e
            ? Sys.UI.DomElement.addCssClass(this.tooltip._popupElement, t)
            : Sys.UI.DomElement.removeCssClass(this.tooltip._popupElement, t);
        },
        isLoading: function () {
          return Sys.UI.DomElement.containsCssClass(
            this.tooltip._popupElement,
            t,
          );
        },
        setOverflow: function () {
          var t = this.tooltip.get_contentScrolling();
          if (t != Telerik.Web.UI.ToolTipScrolling.Default) {
            var e = this.tooltip._contentWrapper;
            if (
              e &&
              (!$telerik.isIE ||
                (e.document && e.document.documentElement) ||
                (e.ownerDocument && e.ownerDocument.documentElement))
            ) {
              if (
                (this._setOverflowToElement(e, t), this.tooltip.get_height())
              ) {
                var i = this.tooltip._titleBar
                    ? this.tooltip._titleBar.clientHeight
                    : 0,
                  o = $telerik.getPaddingBox(e),
                  l = $telerik.getPaddingBox(e.parentNode),
                  n =
                    parseInt(this.tooltip.get_height(), 10) -
                    i -
                    o.vertical -
                    l.vertical;
                e.style.height = n + "px";
              }
              this._fixMozSetOverflowToElement(e, t),
                this._createTouchScrollExtender(t),
                (e.style.display = "");
            }
          }
        },
      }),
      Telerik.Web.UI.ToolTip.LightweightView.registerClass(
        "Telerik.Web.UI.ToolTip.LightweightView",
        Telerik.Web.UI.ToolTip.BaseView,
        Telerik.Web.UI.ToolTip.IView,
      );
  })(),
  (function () {
    Type.registerNamespace("Telerik.Web.UI.ToolTip");
    var t = Telerik.Web.UI.ToolTip,
      e = Telerik.Web.UI.RenderMode;
    t.RendererFactory = {
      getRenderer: function (i) {
        var o,
          l = i._renderMode,
          n = i.get_enableAriaSupport();
        if (l === e.Lite)
          o = n
            ? new t.LightweightRendererAria(i)
            : new t.LightweightRenderer(i);
        else o = n ? new t.ClassicRendererAria(i) : new t.ClassicRenderer(i);
        return o;
      },
    };
  })(),
  (function () {
    Type.registerNamespace("Telerik.Web.UI.ToolTip");
    var t = Telerik.Web.UI.ToolTip,
      e = Telerik.Web.UI.RenderMode;
    t.ViewFactory = {
      getView: function (i) {
        return i._renderMode === e.Lite
          ? new t.LightweightView(i)
          : new t.ClassicView(i);
      },
    };
  })(),
  Type.registerNamespace("Telerik.Web.UI.ToolTip"),
  (Telerik.Web.UI.ToolTip.AriaSupportHelper = {
    setPopupElementAriaHiddenAttr: function (t, e, i, o) {
      e && t && o != i && t.setAttribute("aria-hidden", o.toString());
    },
    removeAriaDescribedbyAttr: function (t, e) {
      e && t.removeAttribute("aria-describedby");
    },
    setAriaDescribedbyAttr: function (t, e, i) {
      e && t.setAttribute("aria-describedby", "RadToolTipWrapper_" + i);
    },
    setTitleElementAriaHiddenAttr: function (t, e, i) {
      if (i) {
        var o = !e;
        t.setAttribute("aria-hidden", o.toString());
      }
    },
  }),
  Type.registerNamespace("Telerik.Web.UI"),
  (function () {
    ($telerik.toToolTip = function (t) {
      return t;
    }),
      ($telerik.findToolTip = $find);
    var t = $telerik.$,
      e = Telerik.Web.UI,
      i = Telerik.Web.Browser;
    (e.RadToolTipControllerClass = function () {
      (this._tooltipToShow = null),
        (this._activeToolTip = null),
        this._registerGlobalBodyEventHandlers();
    }),
      (e.RadToolTipControllerClass.prototype = {
        _registerGlobalBodyEventHandlers: function () {
          var t = Function.createDelegate(this, function (t) {
              "Escape" == t.rawEvent.code &&
                (!this._activeToolTip ||
                  (this._activeToolTip.isModal() &&
                    !this._activeToolTip.get_enableAriaSupport()) ||
                  this._hideCurrentToolTipNoAnimation());
            }),
            e = Function.createDelegate(this, function (t) {
              this._hideOnBodyClick(t);
            });
          Sys.Application.add_init(function () {
            $addHandler(document.body, "keydown", t),
              $addHandler(document.body, "click", e);
          }),
            Sys.Application.add_unload(function () {
              $removeHandler(document.body, "keydown", t),
                $removeHandler(document.body, "click", e);
            });
        },
        _hideOnBodyClick: function (t) {
          var e = !1;
          if (null != this._activeToolTip && !this._activeToolTip.isModal()) {
            if (this._activeToolTip._getUiView().isMouseOverElement(t)) return;
            e = this._activeToolTip._hideIfNotManualCloseOrFromCode();
          }
          e && (this._activeToolTip = null);
        },
        _cancelLastShowRequest: function () {
          if (this._tooltipToShow) {
            var t = this._tooltipToShow;
            (this._tooltipToShow = null), t.cancelShowDelay();
          }
        },
        _hideCurrentToolTipNoAnimation: function () {
          this._cancelLastShowRequest(),
            null != this._activeToolTip &&
              this._activeToolTip._hideNoAnimation(),
            (this._activeToolTip = null);
        },
        requestShow: function (t) {
          this._cancelLastShowRequest();
          var e = this._activeToolTip;
          e != t &&
            (e && e._hideIfNotManualCloseOrFromCode(),
            (this._tooltipToShow = t));
        },
        cancelSpecificShowRequest: function (t) {
          this._tooltipToShow == t && this._cancelLastShowRequest();
        },
        showTooltip: function (t) {
          t &&
            !t.isVisible() &&
            (this._cancelLastShowRequest(),
            this.set_activeToolTip(t),
            t.show());
        },
        notifyToolTipClosed: function (t) {
          this._activeToolTip == t && (this._activeToolTip = null);
        },
        set_activeToolTip: function (t) {
          var e = this._activeToolTip;
          e && t != e && this._hideCurrentToolTipNoAnimation(),
            (this._activeToolTip = t);
        },
        get_activeToolTip: function () {
          return this._activeToolTip;
        },
        getInstance: function () {
          return this;
        },
      }),
      e.RadToolTipControllerClass.registerClass(
        "Telerik.Web.UI.RadToolTipControllerClass",
        null,
      ),
      e.RadToolTipController ||
        (e.RadToolTipController = new e.RadToolTipControllerClass()),
      t.registerEnum(e, "ToolTipPosition", {
        TopLeft: 11,
        TopCenter: 12,
        TopRight: 13,
        MiddleLeft: 21,
        Center: 22,
        MiddleRight: 23,
        BottomLeft: 31,
        BottomCenter: 32,
        BottomRight: 33,
      }),
      t.registerEnum(e, "CalloutPosition", {
        TopLeft: 1,
        TopCenter: 2,
        TopRight: 3,
        MiddleLeft: 4,
        Center: 5,
        MiddleRight: 6,
        BottomLeft: 7,
        BottomCenter: 8,
        BottomRight: 9,
      }),
      t.registerEnum(e, "ToolTipHorizontalPosition", {
        Left: 1,
        Center: 2,
        Right: 3,
      }),
      t.registerEnum(e, "ToolTipVerticalPosition", {
        Top: 1,
        Middle: 2,
        Bottom: 3,
      }),
      t.registerEnum(e, "ToolTipRelativeDisplay", {
        Mouse: 0,
        Element: 1,
        BrowserWindow: 2,
      }),
      t.registerEnum(e, "ToolTipScrolling", {
        Auto: 0,
        None: 1,
        X: 2,
        Y: 3,
        Both: 4,
        Default: 5,
      }),
      t.registerEnum(e, "ToolTipAnimation", {
        None: 0,
        Resize: 1,
        Fade: 2,
        Slide: 4,
        FlyIn: 8,
      }),
      t.registerEnum(e, "ToolTipShowEvent", {
        OnMouseOver: 1,
        OnClick: 2,
        OnRightClick: 4,
        OnFocus: 8,
        FromCode: 16,
      }),
      t.registerEnum(e, "ToolTipHideEvent", {
        Default: 1,
        LeaveToolTip: 2,
        ManualClose: 4,
        LeaveTargetAndToolTip: 8,
        FromCode: 16,
      }),
      Type.registerNamespace("Telerik.Web.UI"),
      (e.RadToolTip = function (t) {
        e.RadToolTip.initializeBase(this, [t]),
          (this._position = e.ToolTipPosition.BottomCenter),
          (this._horizontalPosition = null),
          (this._verticalPosition = null),
          (this._targetControlID = null),
          (this._targetControl = null),
          (this._popupElement = null),
          (this._tableElement = null),
          (this._contentWrapper = null),
          (this._titleBar = null),
          (this._titleElement = null),
          (this._contentElement = null),
          (this._calloutElement = null),
          (this._closeElement = null),
          (this._manualCloseButton = null),
          (this._titleWrapper = null),
          (this._manualCloseOffset = null),
          (this._popupBehavior = null),
          (this._modal = !1),
          (this._overlay = !1),
          (this._onModalShowHandler = null),
          (this._onModalCloseHandler = null),
          (this._title = ""),
          (this._text = ""),
          (this._width = ""),
          (this._height = ""),
          (this._manualCloseButtonText = ""),
          (this._mouseTrailing = !1),
          (this._showDelayRef = null),
          (this._autoCloseRef = null),
          (this._zIndex = 8e3),
          (this._cssClass = null),
          (this._dropDownTouchScroll = null),
          (this._showEvent = e.ToolTipShowEvent.OnMouseOver),
          (this._hideEvent = e.ToolTipHideEvent.Default),
          (this._renderer = null),
          (this._uiView = null),
          (this._tooltipWrapper = null);
      }),
      (e.RadToolTip.getCurrent = function () {
        var t = e.RadToolTipController.getInstance();
        return t ? t.get_activeToolTip() : null;
      }),
      (e.RadToolTip.prototype = {
        get_offsetY: function () {
          return (
            isNaN(this._offsetY) &&
              this._renderMode == Telerik.Web.UI.RenderMode.Classic &&
              this.set_offsetY(6),
            this._offsetY || 0
          );
        },
        set_offsetY: function (t) {
          isNaN(t) || (this._offsetY = t);
        },
        get_zIndex: function () {
          return this._zIndex;
        },
        set_zIndex: function (t) {
          isNaN(t) || (this._zIndex = +t);
        },
        initialize: function () {
          e.RadToolTip.callBaseMethod(this, "initialize"),
            this.initRenderer(),
            this.initUiView(),
            this.set_position(this._position),
            this._getToolTipAltText(this._targetControl),
            this.applyElementZIndex(),
            this.get_enableAriaSupport() && this._createUI(),
            this.get_visibleOnPageLoad() &&
              setTimeout(
                Function.createDelegate(this, function () {
                  this.show();
                }),
                0,
              );
        },
        dispose: function () {
          var t = this._getToolTipController();
          if (
            (this == t.get_activeToolTip() && t.set_activeToolTip(null),
            this._showRef &&
              (window.clearTimeout(this._showRef), (this._showRef = null)),
            this._popupBehavior &&
              (this._popupBehavior.dispose(), (this._popupBehavior = null)),
            this._registerPopupHandlers(!1),
            this._registerMouseHandlers(this._targetControl, !1),
            this._makeModal(!1),
            this._createTouchScrollExtender(!1),
            this._closeElementHandler &&
              this._closeElement &&
              ($clearHandlers(this._closeElement),
              (this._closeElementHandler = null)),
            this._popupElement)
          ) {
            var i = this.get_id();
            if (i) {
              var o = $get(i);
              o && o.appendChild(this._popupElement);
            }
          }
          e.RadToolTip.callBaseMethod(this, "dispose");
        },
        applyElementZIndex: function () {
          var t = $telerik.getCurrentStyle(this.get_element(), "zIndex"),
            e = i.ie && 7 === i.version && 0 === t;
          null == t || e || this.set_zIndex(t);
        },
        isCreated: function () {
          return null != this._popupElement;
        },
        get_leaveTargetAndToolTip: function () {
          return this.isHideEventEnabled(
            e.ToolTipHideEvent.LeaveTargetAndToolTip,
          );
        },
        isHideEventEnabled: function (t) {
          return t & this.get_hideEvent();
        },
        hide: function () {
          this._hideUnconditionally();
        },
        _hideIfNotManualCloseOrFromCode: function () {
          var t = this.isHideEventEnabled(e.ToolTipHideEvent.FromCode);
          return (
            !this.get_manualClose() && !t && (this._hideUnconditionally(), !0)
          );
        },
        _hideUnconditionally: function () {
          this.isVisible() && this._hide();
        },
        _hideNoAnimation: function () {
          this._hide(!1);
        },
        _hide: function (t) {
          this.get_animation() != e.ToolTipAnimation.None &&
            $telerik.$(this._popupElement).stop(),
            this.cancelHideDelay(),
            this.cancelShowDelay(),
            this.cancelAutoCloseDelay();
          var i = this._popupElement;
          if (i) {
            var o = new Sys.CancelEventArgs();
            if ((this.raiseEvent("beforeHide", o), !o.get_cancel())) {
              var l = this.get_contentElement();
              if (
                (l && (l.scrollTop = l.scrollLeft = 0),
                this.get_animation() != e.ToolTipAnimation.None && 0 != t)
              ) {
                $telerik.isIE8 && this._getUiView().removeShadow();
                var n = this._calloutElement;
                n && (n.style.visibility = "hidden");
                var s = Function.createDelegate(this, this._afterHide);
                $telerik.$(i).fadeOut(this.get_animationDuration(), s);
              } else this._afterHide();
            }
          }
        },
        _afterHide: function () {
          try {
            this._popupBehavior &&
              (this._popupBehavior.hide(), this._popupBehavior.pin(!1));
          } catch (t) {}
          $telerik.isIE8 && this._getUiView().addShadow(),
            this._getToolTipController().notifyToolTipClosed(this),
            this.raiseEvent("hide"),
            Telerik.Web.UI.ToolTip.AriaSupportHelper.setPopupElementAriaHiddenAttr(
              this._popupElement,
              this.get_enableAriaSupport(),
              this.isVisible(),
              !0,
            ),
            this._registerPopupHandlers(!1);
        },
        clone: function (t) {
          var i = document.createElement("span");
          return (
            t && i.setAttribute("id", t),
            $telerik.cloneControl(this, e.RadToolTip, i)
          );
        },
        show: function () {
          if (this.get_element()) {
            this._createUI();
            var t = new Sys.CancelEventArgs();
            this.raiseEvent("beforeShow", t),
              t.get_cancel() ||
                (!this._shouldShow() && !this.isLoading()) ||
                (this._popupBehavior.pin(!1),
                (this._showRef = window.setTimeout(
                  Function.createDelegate(this, function () {
                    this._getToolTipController().set_activeToolTip(this),
                      this.get_animation() == e.ToolTipAnimation.None
                        ? (this._show(), this._afterShow())
                        : window.setTimeout(
                            Function.createDelegate(this, function () {
                              this._playAnimation();
                            }),
                            100,
                          );
                  }),
                  0,
                )));
          }
        },
        updateLocation: function () {
          this._show();
        },
        showLoadingMessage: function (t) {
          this._getUiView().showLoadingMessage(t);
        },
        isLoading: function () {
          return this._getUiView().isLoading();
        },
        _getToolTipAltText: function (t) {
          var e = t || this.get_targetControl();
          if (e) {
            var i = e.getAttribute("title"),
              o = this.get_ignoreAltAttribute(),
              l = o ? null : e.getAttribute("alt");
            if (
              (i || l) &&
              (o || e.removeAttribute("alt"),
              e.removeAttribute("title"),
              !this.get_text())
            ) {
              var n = i || l;
              this.set_text(n);
            }
          }
        },
        isModal: function () {
          return this._modal;
        },
        set_contentElement: function (t) {
          (this._contentWrapper.innerHTML = ""),
            t.parentNode &&
              t.parentNode.removeChild &&
              t.parentNode.removeChild(t),
            this._contentWrapper.appendChild(t),
            (t.style.display = ""),
            (this._contentElement = t),
            this._setOverflow(),
            this.showLoadingMessage(!1);
        },
        get_contentElement: function () {
          return this._contentElement;
        },
        set_content: function (t) {
          if (((this._text = t), this.isCreated())) {
            var e = document.createElement("div");
            (e.innerHTML = t), this.set_contentElement(e);
          }
        },
        get_content: function () {
          return this._contentElement ? this._contentElement.innerHTML : "";
        },
        cancelHideDelay: function () {
          this._hideDelayRef &&
            (window.clearTimeout(this._hideDelayRef), (this._hideDelayRef = 0));
        },
        cancelAutoCloseDelay: function () {
          this._autoCloseRef &&
            (window.clearTimeout(this._autoCloseRef), (this._autoCloseRef = 0));
        },
        cancelShowDelay: function () {
          this._showDelayRef &&
            (window.clearTimeout(this._showDelayRef),
            (this._showDelayRef = null)),
            this._getToolTipController().cancelSpecificShowRequest(this);
        },
        _getToolTipController: function () {
          return e.RadToolTipController.getInstance();
        },
        _resetAutoCloseDelay: function () {
          this.cancelAutoCloseDelay(),
            this.get_manualClose() ||
              this.get_sticky() ||
              (this.get_autoCloseDelay() &&
                (this._autoCloseRef = window.setTimeout(
                  Function.createDelegate(this, function () {
                    this._hideIfNotManualCloseOrFromCode();
                  }),
                  this.get_autoCloseDelay(),
                )));
        },
        _shouldShow: function () {
          var t = Sys.WebForms.PageRequestManager.getInstance();
          return !(!t || !t.get_isInAsyncPostBack()) || !this.isEmpty();
        },
        _resetShowDelay: function () {
          this.cancelShowDelay();
          var t = Function.createDelegate(this, function () {
            this._getToolTipController().showTooltip(this),
              this.cancelShowDelay();
          });
          this._showDelayRef = window.setTimeout(t, this.get_showDelay());
        },
        _resetHideDelay: function () {
          this.cancelHideDelay(),
            this.get_hideDelay() > 0
              ? (this._hideDelayRef = window.setTimeout(
                  Function.createDelegate(this, function () {
                    this._hideIfNotManualCloseOrFromCode();
                  }),
                  this.get_hideDelay(),
                ))
              : this._hideIfNotManualCloseOrFromCode();
        },
        _show: function () {
          var t = null;
          try {
            t = this.getToolTipBounds();
          } catch (t) {
            var e = this;
            return void window.setTimeout(function () {
              e._addToolTipToDocument();
            }, 10);
          }
          this._setPopupVisible(t.x, t.y);
          var i = this.get_contentElement();
          i && $telerik.repaintChildren(i);
        },
        _afterShow: function () {
          this._registerPopupHandlers(!0),
            this._popupBehavior.pin(this._isRelativeToBrowserWindow()),
            this._resetAutoCloseDelay(),
            this.get_animation() == e.ToolTipAnimation.None &&
              this._adjustCallout(),
            this.raiseEvent("show"),
            Telerik.Web.UI.ToolTip.AriaSupportHelper.setPopupElementAriaHiddenAttr(
              this._popupElement,
              this.get_enableAriaSupport(),
              this.isVisible(),
              !1,
            );
        },
        _isRelativeToBrowserWindow: function () {
          return (
            !this._targetControl ||
            this.get_relativeTo() == e.ToolTipRelativeDisplay.BrowserWindow
          );
        },
        _playAnimation: function () {
          if (this == e.RadToolTip.getCurrent()) {
            var t = Function.createDelegate(this, function () {
                var t = this.getToolTipBounds();
                this._setPopupVisible(t.x, t.y), this._adjustCallout();
                var e = this._getUiView().get_bounds();
                return $telerik.$(this._popupElement).hide(), e;
              }),
              i = t(),
              o = Function.createDelegate(this, function () {
                this._isRelativeToBrowserWindow() &&
                  ((this._documentOverflowX =
                    document.documentElement.style.overflowX),
                  (document.documentElement.style.overflowX = "hidden")),
                  this.get_showCallout() &&
                    this._calloutElement &&
                    (this._calloutElement.style.visibility = "hidden"),
                  $telerik.isIE8 && this._getUiView().removeShadow();
              }),
              l = Function.createDelegate(this, function () {
                var t = this.get_popupElement();
                (t.style.filter = ""),
                  (t.style.opacity = ""),
                  this.get_showCallout() &&
                    this._calloutElement &&
                    (this._calloutElement.style.visibility = ""),
                  $telerik.isIE8 && this._getUiView().addShadow(),
                  this._renderMode == Telerik.Web.UI.RenderMode.Classic &&
                    this._show(),
                  null != this._documentOverflowX &&
                    ((document.documentElement.style.overflowX =
                      this._documentOverflowX),
                    (this._documentOverflowX = null)),
                  this._afterShow();
              }),
              n = this.get_popupElement(),
              s = this.get_animation(),
              r = "" + this._position,
              a = this._isRelativeToBrowserWindow();
            if (a && 2 != this._verticalPosition) {
              var h = 1 == this._verticalPosition ? 3 : 1;
              r = parseInt(h + "" + this._horizontalPosition, 10);
            }
            var p = a ? document.documentElement : this._targetControl,
              u = p
                ? $telerik.getBounds(p)
                : new Telerik.Web.UI.Bounds(1, 1, 1, 1),
              _ = this.get_animationDuration();
            window.setTimeout(function () {
              e.Animations.playJQueryAnimation(n, s, u, i, r, o, l, _);
            }, 0);
          }
        },
        _makeModal: function (t) {
          this._onModalShowHandler &&
            (this.remove_show(this._onModalShowHandler),
            (this._onModalShowHandler = null)),
            this._onModalCloseHandler &&
              (this.remove_hide(this._onModalCloseHandler),
              (this._onModalCloseHandler = null)),
            this._modalExtender &&
              (this._modalExtender.dispose(), (this._modalExtender = null)),
            t &&
              ((this._onModalShowHandler = function (t) {
                t._modalExtender ||
                  (t._modalExtender = new e.ModalExtender(t._popupElement)),
                  t._modalExtender.show();
              }),
              this.add_show(this._onModalShowHandler),
              (this._onModalCloseHandler = function (t) {
                t._modalExtender && t._modalExtender.hide();
              }),
              this.add_hide(this._onModalCloseHandler));
        },
        _onMouseOver: function (t) {
          this._logMousePosition(t),
            this.cancelHideDelay(),
            this.cancelAutoCloseDelay(),
            this.get_showEvent() == e.ToolTipShowEvent.OnMouseOver &&
              (this._resetShowDelay(),
              this._getToolTipController().requestShow(this));
        },
        _onMouseMove: function (t) {
          this._logMousePosition(t),
            this._resetAutoCloseDelay(),
            this._mouseTrailing && this.isVisible() && this._show();
        },
        _onMouseOut: function (t) {
          this.isVisible()
            ? $telerik.isMouseOverElementEx(this._targetControl, t) ||
              (this.cancelShowDelay(),
              this.get_sticky() || this._resetHideDelay())
            : this.cancelShowDelay();
        },
        _onClick: function (t) {
          return (
            this._onMouseOver(t),
            this._resetShowDelay(),
            this._getToolTipController().requestShow(this),
            $telerik.cancelRawEvent(t)
          );
        },
        _onRightClick: function (t) {
          return (
            this._onMouseOver(t),
            this._resetShowDelay(),
            this._getToolTipController().requestShow(this),
            $telerik.cancelRawEvent(t)
          );
        },
        _registerMouseHandlers: function (t, i) {
          if (1 == i) {
            var o = e.ToolTipShowEvent,
              l = this.get_showEvent();
            (l == o.OnMouseOver ||
              this.isHideEventEnabled(
                e.ToolTipHideEvent.LeaveTargetAndToolTip,
              )) &&
              ((this._onMouseOverDelegate = Function.createDelegate(
                this,
                this._onMouseOver,
              )),
              $telerik.addExternalHandler(
                t,
                "mouseover",
                this._onMouseOverDelegate,
              ),
              (this._onMouseOutDelegate = Function.createDelegate(
                this,
                this._onMouseOut,
              )),
              $telerik.addExternalHandler(
                t,
                "mouseout",
                this._onMouseOutDelegate,
              )),
              l == o.OnMouseOver &&
                ((this._onMouseMoveDelegate = Function.createDelegate(
                  this,
                  this._onMouseMove,
                )),
                $telerik.addExternalHandler(
                  t,
                  "mousemove",
                  this._onMouseMoveDelegate,
                )),
              l == o.OnClick &&
                ((this._onClickDelegate = Function.createDelegate(
                  this,
                  this._onClick,
                )),
                $telerik.addExternalHandler(t, "click", this._onClickDelegate)),
              l == o.OnRightClick &&
                ((this._onRightClickDelegate = Function.createDelegate(
                  this,
                  this._onRightClick,
                )),
                $telerik.addExternalHandler(
                  t,
                  "contextmenu",
                  this._onRightClickDelegate,
                )),
              l == o.OnFocus &&
                ((this._onFocusDelegate = Function.createDelegate(
                  this,
                  this._onClick,
                )),
                (this._onBlurDelegate = Function.createDelegate(
                  this,
                  this._onMouseOut,
                )),
                $telerik.addExternalHandler(t, "focus", this._onFocusDelegate),
                $telerik.addExternalHandler(t, "blur", this._onBlurDelegate));
          } else if (t) {
            for (
              var n = [
                  ["mouseover", this._onMouseOverDelegate],
                  ["mousemove", this._onMouseMoveDelegate],
                  ["mouseout", this._onMouseOutDelegate],
                  ["click", this._onClickDelegate],
                  ["contextmenu", this._onRightClickDelegate],
                  ["focus", this._onFocusDelegate],
                  ["blur", this._onBlurDelegate],
                ],
                s = 0;
              s < n.length;
              s++
            ) {
              var r = n[s];
              try {
                null != r[1] && $telerik.removeExternalHandler(t, r[0], r[1]);
              } catch (t) {}
            }
            (this._onMouseOverDelegate = null),
              (this._onMouseMoveDelegate = null),
              (this._onMouseOutDelegate = null),
              (this._onClickDelegate = null),
              (this._onRightClickDelegate = null),
              (this._onFocusDelegate = null),
              (this._onBlurDelegate = null);
          }
        },
        _registerPopupHandlers: function (t) {
          (t ||
            this._popupStickyHandler ||
            this._popupEnterHandler ||
            this._popupLeaveHandler) &&
            this._getUiView().registerPopupHandlers(t);
        },
        _getPosRelativeToMouse: function (t) {
          var e = t.x,
            i = t.y,
            o = this._getMousePosition(),
            l = o.clientX,
            n = o.clientY,
            s = $telerik.standardsMode;
          return (
            $telerik.isIE || "CSS1Compat" == document.compatMode
              ? ((Telerik.Web.Browser.safari &&
                  Telerik.Web.Browser.version < 13) ||
                  (Telerik.Web.Browser.edge &&
                    Telerik.Web.Browser.version >= 13)) &&
                (s = !1)
              : (s = !1),
            s
              ? ((e -= $telerik.getCorrectScrollLeft(document.documentElement)),
                (i -= document.documentElement.scrollTop))
              : ((e -= $telerik.getCorrectScrollLeft(document.body)),
                (i -= document.body.scrollTop)),
            { x: l - e, y: n - i }
          );
        },
        _logMousePosition: function (t) {
          t && ((this._mouseX = t.clientX), (this._mouseY = t.clientY));
        },
        _getMousePosition: function () {
          var t = {};
          return (t.clientX = this._mouseX), (t.clientY = this._mouseY), t;
        },
        _getCalloutBounds: function () {
          var t = { width: 0, height: 0, marginLeft: 0, marginTop: 0 };
          if (this.get_showCallout() && this._calloutElement) {
            (t.marginLeft = parseInt(
              $telerik.getCurrentStyle(this._calloutElement, "marginLeft"),
              10,
            )),
              (t.marginTop = parseInt(
                $telerik.getCurrentStyle(this._calloutElement, "marginTop"),
                10,
              )),
              isNaN(t.marginLeft) && (t.marginLeft = 0),
              isNaN(t.marginTop) && (t.marginTop = 0);
            var e = $telerik.getBounds(this._calloutElement);
            e &&
              (e.width && (t.width = e.width),
              e.height && (t.height = e.height));
          }
          return t;
        },
        _getBoundsRelativeToBrowser: function (t, e, i) {
          var o = this._horizontalPosition,
            l = this._verticalPosition,
            n = 0,
            s = 0,
            r = this.get_offsetX(),
            a = this.get_offsetY();
          i || (i = $telerik.getClientBounds());
          var h = $telerik.getScrollOffset(
            document.compatMode && "BackCompat" != document.compatMode
              ? document.documentElement
              : document.body,
          );
          switch (
            ("fixed" != this._popupElement.style.position &&
              ((n += h.x), (s += h.y)),
            o)
          ) {
            case 2:
              (n += -parseInt(t.width / 2 - i.width / 2, 10)), (n += r);
              break;
            case 3:
              (n += i.width), (n -= t.width), (n -= r);
              break;
            default:
              (n += -t.width), (n += -e.width - e.marginLeft), (n += r);
          }
          switch (l) {
            case 2:
              (s += -parseInt((t.height - i.height) / 2, 10)), (s += a);
              break;
            case 1:
              s += a;
              break;
            default:
              (s += i.height), (s -= a), (s -= t.height);
          }
          return new Telerik.Web.UI.Bounds(n, s, t.width, t.height);
        },
        _getBoundsRelativeToElement: function (t, e, i) {
          var o = this._horizontalPosition,
            l = this._verticalPosition,
            n = 0,
            s = 0,
            r = this.get_offsetX(),
            a = this.get_offsetY();
          switch ((i || (i = $telerik.getBounds(this._targetControl)), o)) {
            case 2:
              (n += -parseInt(t.width / 2 - i.width / 2, 10)), (n += r);
              break;
            case 3:
              (n += i.width), (n -= e.marginLeft), (n += r);
              break;
            default:
              (n += -t.width), (n += -e.width - e.marginLeft), (n -= r);
          }
          switch (l) {
            case 2:
              (s += -parseInt(t.height / 2 - i.height / 2, 10)), (s += a);
              break;
            case 1:
              (s -= t.height), (s -= e.height + e.marginTop), (s -= a);
              break;
            default:
              (s += i.height), (s -= e.marginTop), (s += a);
          }
          return new Telerik.Web.UI.Bounds(n, s, t.width, t.height);
        },
        _getBoundsRelativeToMouse: function (t, e) {
          var i = this._targetControl
              ? $telerik.getBounds(this._targetControl)
              : $telerik.getClientBounds(),
            o = this._getPosRelativeToMouse(i);
          isNaN(o.x) ? ((o.x = 0), (o.y = 0)) : ((i.width = 0), (i.height = 0));
          var l = this._getBoundsRelativeToElement(t, e, i),
            n = Math.round(o.x + l.x),
            s = Math.round(o.y + l.y);
          return new Telerik.Web.UI.Bounds(n, s, t.width, t.height);
        },
        getToolTipBounds: function () {
          var t = this._popupElement,
            i = "none" == t.style.display;
          i && (t.style.visibility = "hidden"),
            (t.style.display = ""),
            this._setOverflow(),
            1 != this._firstShow &&
              (this._getUiView().fixIeHeight(), (this._firstShow = !0));
          var o = this._isRelativeToBrowserWindow()
            ? document.documentElement
            : this._targetControl;
          this._popupBehavior.set_parentElement(o);
          var l = this._getUiView().get_bounds(),
            n = this._getCalloutBounds();
          i &&
            ((this._popupElement.style.display = "none"),
            (t.style.visibility = ""));
          var s = e.ToolTipRelativeDisplay,
            r = e.ToolTipShowEvent,
            a = null;
          return (
            this.get_relativeTo() == s.BrowserWindow
              ? (a = this._getBoundsRelativeToBrowser(l, n))
              : this._targetControl || this.get_showEvent() != r.FromCode
                ? this._targetControl && this.get_showEvent() == r.FromCode
                  ? (a = this._getBoundsRelativeToElement(l, n))
                  : this._mouseTrailing || this.get_relativeTo() == s.Mouse
                    ? (a = this._getBoundsRelativeToMouse(l, n))
                    : this.get_relativeTo() == s.Element &&
                      (a = this._getBoundsRelativeToElement(l, n))
                : (a = this._getBoundsRelativeToBrowser(l, n)),
            (a = this._getUiView().fixTooltipBounds(a))
          );
        },
        _refreshTitle: function () {
          this._getUiView().refreshTitle();
        },
        getManualCloseButton: function () {
          return this._manualCloseButton;
        },
        _getManualCloseOffset: function () {
          if (!this._manualCloseOffset) {
            var t = this.getManualCloseButton(),
              e = t.offsetTop,
              i = e < 0 ? t.offsetHeight + e : 0,
              o = t.offsetLeft,
              l = $telerik.getBounds(this.get_popupElement()).width - o,
              n = l > 0 ? t.offsetWidth - l : 0;
            this.isRightToLeft() &&
              (n = o <= t.offsetWidth / 2 ? Math.abs(o) : 0),
              (this._manualCloseOffset = { offsetX: n, offsetY: i });
          }
          return this._manualCloseOffset;
        },
        _createManualCloseButton: function () {
          this._getRenderer().createManualCloseButton();
        },
        _createUI: function () {
          this._getRenderer().createUI();
        },
        _transferNodeChildren: function (t) {
          if (!t) return null;
          for (
            var e = t.ownerDocument.createElement(t.tagName), i = 0;
            t.childNodes && t.childNodes.length > i;

          ) {
            var o = t.childNodes[i];
            this._clientStateFieldID && o.id == this._clientStateFieldID
              ? (i = 1)
              : (t.removeChild(o), e.appendChild(o));
          }
          return e;
        },
        _getDefaultParent: function () {
          var t = this.get_formID(),
            e = t ? document.getElementById(t) : null;
          return (
            e ||
              (e =
                document.forms && document.forms.length > 0
                  ? document.forms[0]
                  : document.body),
            e
          );
        },
        _addToolTipToDocument: function (t) {
          t && t.parentNode && !this.get_renderInPageRoot()
            ? t.parentNode.insertBefore(this._popupElement, t)
            : this._getDefaultParent().appendChild(this._popupElement);
        },
        _getParentByTagName: function (t, e) {
          var i = t;
          for (
            e = e.toUpperCase();
            i.tagName.toUpperCase() != e && (i = i.parentNode);

          );
          return i;
        },
        _getFullSkinName: function () {
          return "RadToolTip RadToolTip_" + this.get_skin();
        },
        _getUniqueString: function () {
          return "" + (new Date() - 100);
        },
        _getCalloutPosition: function (t) {
          var i = e.ToolTipPosition;
          switch (t) {
            case i.TopLeft:
              return "rtCalloutBottomRight";
            case i.TopCenter:
              return "rtCalloutBottomCenter";
            case i.TopRight:
              return "rtCalloutBottomLeft";
            case i.MiddleLeft:
              return "rtCalloutMiddleRight";
            case i.Center:
              return "rtCalloutCenter";
            case i.MiddleRight:
              return "rtCalloutMiddleLeft";
            case i.BottomLeft:
              return "rtCalloutTopRight";
            case i.BottomCenter:
              return "rtCalloutTopCenter";
            case i.BottomRight:
              return "rtCalloutTopLeft";
          }
          return "";
        },
        _getHorizontalSide: function (t) {
          return parseInt((t + "").charAt(1), 10);
        },
        _getVerticalSide: function (t) {
          return parseInt((t + "").charAt(0), 10);
        },
        _setPopupVisible: function (t, e) {
          var i = this._isRelativeToBrowserWindow(),
            o = this.get_contentElement();
          if (
            (o && (o.scrollTop = o.scrollLeft = 0),
            (this._popupElement.style.zIndex = this._zIndex),
            ($telerik.isMobileSafari ||
              $telerik.isSafari ||
              $telerik.isChrome) &&
              i)
          ) {
            var l = window.pageYOffset,
              n = window.pageXOffset,
              s = document.body.scrollTop,
              r = document.body.scrollLeft;
            s && s != document.documentElement.scrollTop && (e += i ? l : -l),
              r &&
                r != document.documentElement.scrollLeft &&
                (t += i ? n : -n);
          }
          this._popupBehavior.set_x(t),
            this._popupBehavior.set_y(e),
            this._popupBehavior.show(),
            this.get_manualClose() && this._fixManualCloseOffset(),
            this.get_width() || (this._popupElement.style.width = "");
        },
        _fixManualCloseOffset: function () {
          var t = this._getManualCloseOffset(),
            e = this.get_popupElement(),
            i = $telerik.getBounds(e),
            o = !1,
            l = t.offsetY,
            n = t.offsetX,
            s = this.isRightToLeft();
          if (
            (l > 0 && parseInt(e.style.top, 10) < l && ((o = !0), (i.y = l)),
            ((n > 0 &&
              parseInt(e.style.left, 10) + i.width + n >
                $telerik.getViewPortSize().width) ||
              s) &&
              ((o = !0),
              s && i.x < 0 && (i.x = 0),
              (i.x = s ? i.x + n : i.x - n)),
            o)
          ) {
            $telerik.setLocation(e, { x: i.x, y: i.y });
            var r = e._hideWindowedElementsIFrame;
            r && $telerik.setLocation(r, { x: i.x, y: i.y });
          }
        },
        _reSetToolTipPosition: function () {
          var t = this.getToolTipBounds();
          this._setPopupVisible(t.x, t.y);
        },
        _reSetPositionWithoutFlicker: function () {
          var t = this._popupBehavior;
          if (t) {
            t.set_manageVisibility(!1),
              this._reSetToolTipPosition(),
              this._adjustCallout(),
              t.set_manageVisibility(!0);
            var e = this.get_width();
            e && (this._popupElement.style.width = e + "px");
          }
        },
        _setOverflow: function () {
          this._getUiView().setOverflow();
        },
        _createTouchScrollExtender: function (t) {
          var i = this._contentElement;
          if (i) {
            var o = this._dropDownTouchScroll;
            o
              ? t || (o.dispose(), (this._dropDownTouchScroll = null))
              : t &&
                ((this._dropDownTouchScroll = new e.TouchScrollExtender(i)),
                this._dropDownTouchScroll.initialize());
          }
        },
        _getLeftOffset: function () {
          var t = e.ToolTipPosition,
            i = this.get_offsetX();
          return t.Left == this._position
            ? -1 * this._targetControl.offsetWidth + i
            : t.Right == this._position
              ? this._targetControl.offsetWidth + i
              : i;
        },
        _getTopOffset: function () {
          var t = e.ToolTipPosition,
            i = this.get_offsetY();
          return t.Top == this._position
            ? -1 * this._targetControl.offsetHeight + i
            : t.Bottom == this._position
              ? this._targetControl.offsetHeight + i
              : i;
        },
        _adjustCallout: function () {
          if (
            (this._originalPosition &&
              (this.set_position(this._originalPosition),
              this.updateLocation(),
              (this._originalPosition = null)),
            this.get_showCallout() &&
              22 != this.get_position() &&
              this.get_relativeTo() == e.ToolTipRelativeDisplay.Element)
          ) {
            var t = this.get_targetControl();
            if (!t) return;
            var i = $telerik.getBounds(t);
            (this._calloutElement.style.left = ""),
              (this._calloutElement.style.top = "");
            var o = $telerik.getBounds(this._calloutElement),
              l = $telerik.getViewPortSize(),
              n = Math.min(l.height - i.y, i.height),
              s = Math.min(l.width - i.x, i.width);
            (this._calloutElement.style.visibility = "hidden"),
              this._fixToolTipPosition(i, o, s, n, !0),
              (o = $telerik.getBounds(this._calloutElement)),
              this._fixToolTipPosition(i, o, s, n, !1),
              (this._calloutElement.style.visibility = "visible"),
              this._renderMode !== Telerik.Web.UI.RenderMode.Classic &&
                this._fixCalloutPosition(i, s, n);
          }
        },
        _fixCalloutPosition: function (t, e, i) {
          this._getUiView()._fixCalloutPosition(t, e, i);
        },
        _fixToolTipPosition: function (t, e, i, o, l) {
          this._getUiView().fixToolTipPosition(t, e, i, o, l);
        },
        isEmpty: function () {
          var e = t(this.get_contentElement());
          return null === e.text().match(/[^\s]/) && 0 === e.children().length;
        },
        isVisible: function () {
          var t = this._popupElement;
          return t && "none" != t.style.display;
        },
        isRightToLeft: function () {
          var t = this.get_element(),
            e = t.parentNode ? t : this._getDefaultParent();
          return $telerik.isRightToLeft(e);
        },
        get_targetControlID: function () {
          return this._targetControlID;
        },
        set_targetControlID: function (t) {
          if (this._targetControlID != t) {
            this._targetControlID = t;
            var e = this._targetControlID ? $get(this._targetControlID) : null;
            this.set_targetControl(e);
          }
        },
        get_value: function () {
          return this.get_serverValue();
        },
        set_value: function (t) {
          this.set_serverValue(t);
        },
        get_position: function () {
          return this._position;
        },
        set_position: function (t) {
          this._position != t &&
            ((this._position = t),
            this._calloutElement &&
              (this._calloutElement.className =
                "rtCallout " + this._getCalloutPosition(this._position))),
            (this._horizontalPosition = this._getHorizontalSide(
              this._position,
            )),
            (this._verticalPosition = this._getVerticalSide(this._position));
        },
        get_title: function () {
          return this._title;
        },
        set_title: function (t) {
          this._title != t && (this._title = t),
            this._popupElement && this._refreshTitle();
        },
        get_text: function () {
          return this._text;
        },
        set_text: function (t) {
          this._text != t && (this._text = t),
            this.isCreated() && this.set_content(this._text);
        },
        get_width: function () {
          return this._width;
        },
        set_width: function (t) {
          var e = parseInt(t, 10);
          !isNaN(e) &&
            e > 0 &&
            this._width != e &&
            ((this._width = e),
            this._popupElement && this._getUiView().set_width(e));
        },
        get_height: function () {
          return this._height;
        },
        set_height: function (t) {
          var e = parseInt(t, 10);
          !isNaN(e) &&
            e > 0 &&
            this._height != e &&
            ((this._height = e),
            this._popupElement && this._getUiView().set_height(e));
        },
        get_sticky: function () {
          return this.isHideEventEnabled(e.ToolTipHideEvent.LeaveToolTip);
        },
        set_sticky: function (t) {
          t && this.set_hideEvent(e.ToolTipHideEvent.LeaveToolTip);
        },
        get_manualClose: function () {
          return this.isHideEventEnabled(e.ToolTipHideEvent.ManualClose);
        },
        set_manualClose: function (t) {
          t && this.set_hideEvent(e.ToolTipHideEvent.ManualClose);
        },
        get_mouseTrailing: function () {
          return this._mouseTrailing;
        },
        set_mouseTrailing: function (t) {
          this._mouseTrailing != t &&
            ((this._mouseTrailing = t),
            1 == t && this.set_relativeTo(e.ToolTipRelativeDisplay.Mouse));
        },
        get_modal: function () {
          return this._modal;
        },
        set_modal: function (t) {
          this._modal != t && (this._modal = t), this._makeModal(this._modal);
        },
        get_overlay: function () {
          return this._overlay;
        },
        set_overlay: function (t) {
          (this._overlay = t),
            this._popupBehavior &&
              this._popupBehavior.set_overlay(this._overlay),
            this.isVisible() && this._reSetToolTipPosition();
        },
        get_targetControl: function () {
          return this._targetControl;
        },
        set_targetControl: function (t) {
          if (this._targetControl != t) {
            this._targetControl &&
              this._targetControl != t &&
              (this._registerMouseHandlers(this._targetControl, !1),
              Telerik.Web.UI.ToolTip.AriaSupportHelper.removeAriaDescribedbyAttr(
                this._targetControl,
                this.get_enableAriaSupport(),
              ));
            var e = this._ensureRadControlsCompatTarget(t);
            (this._targetControl = e),
              e &&
                (this._getToolTipAltText(e),
                this._registerMouseHandlers(e, !0),
                this._popupBehavior && this._popupBehavior.set_parentElement(e),
                Telerik.Web.UI.ToolTip.AriaSupportHelper.removeAriaDescribedbyAttr(
                  e,
                  this.get_enableAriaSupport(),
                  this.get_id(),
                ));
          }
        },
        get_showEvent: function () {
          return this._showEvent;
        },
        set_showEvent: function (t) {
          var e = this.get_targetControl();
          e && this._registerMouseHandlers(e, !1),
            (this._showEvent = t),
            e && this._registerMouseHandlers(e, !0);
        },
        get_hideEvent: function () {
          return this._hideEvent;
        },
        set_hideEvent: function (t) {
          if (
            this.get_hideEvent() != t &&
            ((this._hideEvent = t), this.isCreated())
          )
            if (this.get_manualClose())
              this._createManualCloseButton(),
                this._getRenderer()._appendManualCloseButton(
                  this._manualCloseButton,
                );
            else {
              var e = this.getManualCloseButton();
              if (!e) return;
              this._getRenderer()._removeManualCloseButton(e),
                this._closeElementHandler &&
                  this._closeElement &&
                  ($clearHandlers(this._closeElement),
                  (this._closeElementHandler = null),
                  (this._manualCloseButton = this._closeElement = null));
            }
        },
        _ensureRadControlsCompatTarget: function (t) {
          var i = null;
          null != t &&
            (this._getToolTipAltText(t),
            (i = t.getAttribute("_rfddecoratedID")) && (t = $get(i)));
          var o = i || this.get_targetControlID();
          if ($get(o + "_text") && o) {
            var l = $find(o);
            l &&
              Object.getType(l).inheritsFrom(e.RadInputControl) &&
              (t = $get(o + "_text"));
          }
          return t;
        },
        get_popupElement: function () {
          return this._popupElement;
        },
        initRenderer: function () {
          this._renderer =
            Telerik.Web.UI.ToolTip.RendererFactory.getRenderer(this);
        },
        initUiView: function () {
          this._uiView = Telerik.Web.UI.ToolTip.ViewFactory.getView(this);
        },
        _getRenderer: function () {
          return this._renderer;
        },
        _getUiView: function () {
          return this._uiView;
        },
      }),
      t.registerControlProperties(e.RadToolTip, {
        serverTargetControlID: null,
        serverValue: "",
        formID: null,
        offsetX: 0,
        relativeTo: e.ToolTipRelativeDisplay.Mouse,
        contentScrolling: e.ToolTipScrolling.Default,
        showCallout: !0,
        renderInPageRoot: !0,
        showDelay: 400,
        autoCloseDelay: 3e3,
        hideDelay: 300,
        visibleOnPageLoad: !1,
        animation: e.ToolTipAnimation.None,
        animationDuration: 500,
        skin: "Default",
        enableShadow: !0,
        enableRoundedCorners: !0,
        ignoreAltAttribute: !1,
        enableAriaSupport: !1,
        renderMode: e.RenderMode.Classic,
      }),
      t.registerControlEvents(e.RadToolTip, [
        "beforeShow",
        "show",
        "beforeHide",
        "hide",
      ]),
      e.RadToolTip.registerClass("Telerik.Web.UI.RadToolTip", e.RadWebControl);
  })();
