Type.registerNamespace("Telerik.Web.UI"),
  (function ($, $T, undefined) {
    ($telerik.toWindow = function (t) {
      return t;
    }),
      ($telerik.findWindow = $find);
    var $J = Sys.Serialization.JavaScriptSerializer,
      zeroBox = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        horizontal: 0,
        vertical: 0,
      },
      global = window,
      parseInt = global.parseInt,
      document = global.document,
      HTML = "html",
      BODY = "body",
      PREVENT_PAGE_SCROLLING_CLASS = "rwPreventPageScrolling",
      scrollBarWidth = Telerik.Web.Browser.scrollBarWidth;
    ($T.RadWindowControllerClass = function () {
      (this._activeWindow = null), (this._historyStack = []);
    }),
      ($T.RadWindowControllerClass.prototype = {
        getInstance: function () {
          return this;
        },
        hideCurrentWindowIfNonModal: function () {
          null != this._activeWindow &&
            this._activeWindow.isModal &&
            !this._activeWindow.isModal() &&
            this._activeWindow.close(),
            (this._activeWindow = null);
        },
        inactivateCurrentWindow: function () {
          null != this._activeWindow && this._activeWindow.setActive(!1),
            (this._activeWindow = null);
        },
        set_activeWindow: function (t) {
          t != this._activeWindow &&
            (this.inactivateCurrentWindow(),
            (this._activeWindow = t),
            Array.remove(this._historyStack, t),
            Array.add(this._historyStack, t));
        },
        notifyWindowClosed: function (t) {
          this._activeWindow == t && (this._activeWindow = null),
            Array.remove(this._historyStack, t),
            this._activatePreviousWindow();
        },
        _activatePreviousWindow: function () {
          for (var t = this._historyStack, e = t.length - 1; e >= 0; e--) {
            var i = t[e];
            if (!i) return;
            if (i.isCreated() && !i.isClosed() && !i.isMinimized()) {
              i.setActive(!0);
              break;
            }
            Array.removeAt(t, e);
          }
        },
        get_activeWindow: function () {
          return this._activeWindow;
        },
      }),
      $T.RadWindowControllerClass.registerClass(
        "Telerik.Web.UI.RadWindowControllerClass",
        null,
      ),
      $T.RadWindowController ||
        ($T.RadWindowController = new $T.RadWindowControllerClass()),
      Type.registerNamespace("Telerik.Web.UI"),
      Type.registerNamespace("Telerik.Web.UI.RadWindowUtils"),
      ($T.RadWindowUtils.Localization = {
        Close: "Close",
        Minimize: "Minimize",
        Maximize: "Maximize",
        Reload: "Reload",
        PinOn: "Pin on",
        PinOff: "Pin off",
        Restore: "Restore",
        OK: "OK",
        Cancel: "Cancel",
        Yes: "Yes",
        No: "No",
      }),
      $.registerEnum($T, "WindowBehaviors", {
        None: 0,
        Resize: 1,
        Minimize: 2,
        Close: 4,
        Pin: 8,
        Maximize: 16,
        Move: 32,
        Reload: 64,
        Default: 127,
      }),
      $.registerEnum($T, "WindowAutoSizeBehaviors", {
        Width: 1,
        WidthProportional: 2,
        Height: 4,
        HeightProportional: 8,
        Default: 10,
      }),
      $.registerEnum($T, "WindowAnimation", {
        None: 0,
        Resize: 1,
        Fade: 2,
        Slide: 4,
        FlyIn: 8,
      }),
      $.registerEnum($T, "WindowMinimizeMode", {
        SameLocation: 1,
        MinimizeZone: 2,
        Default: 1,
      }),
      ($T.RadWindow = function (t) {
        $T.RadWindow.initializeBase(this, [t]),
          (this._openerElement = null),
          (this._offsetElement = null),
          (this._popupElement = null),
          (this._tableElement = null),
          (this._contentElement = null),
          (this._contentCell = null),
          (this._titleElement = null),
          (this._titleCell = null),
          (this._titlebarElement = null),
          (this._statusCell = null),
          (this._statusMessageElement = null),
          (this._iframe = null),
          (this._dockMode = !1),
          (this._isPredefined = !1),
          (this._buttonsElement = null),
          (this._buttonsArray = []),
          (this._iconUrl = ""),
          (this._shortCutManager = null),
          (this._tabIndex = null),
          (this.isIE = $telerik.isIE),
          (this._openerElementID = null),
          (this._offsetElementID = null),
          (this._behaviors = $T.WindowBehaviors.Default),
          (this._left = null),
          (this._top = null),
          (this._title = ""),
          (this._width = "300px"),
          (this._minWidth = null),
          (this._minHeight = null),
          (this._defaultMinWidth = null),
          (this._defaultMinHeight = null),
          (this._handlesWidth = null),
          (this._resizeOverlayElement = null),
          (this._height = "300px"),
          (this._opacity = 100),
          (this._visibleTitlebar = !0),
          (this._visibleStatusbar = !0),
          (this._modal = !1),
          (this._overlay = !1),
          (this._keepInScreenBounds = !1),
          (this._windowAnimation = null),
          (this._onMouseDownDelegate = null),
          (this._onClickDelegate = null),
          (this._onTitlebarDblclickDelegate = null),
          (this._onTitlebarClickDelegate = null),
          (this._onWindowResizeDelegate = null),
          (this._onIframeLoadDelegate = null),
          (this._onChildPageUnloadDelegate = null),
          (this._onChildPageClickDelegate = null),
          (this._onKeyDownDelegate = null),
          (this._onModalShowHandler = null),
          (this._onModalCloseHandler = null),
          (this._loaded = !1),
          (this._isCloned = !1),
          (this._restoreRect = null),
          (this._popupBehavior = null),
          (this._popupVisible = !1),
          (this._initialHandlesCursor = []),
          (this._dropDownTouchScroll = null),
          (this._browserWindow = window),
          (this._stylezindex = null),
          (this._renderMode = $T.RenderMode.Classic);
        var e = navigator.userAgent;
        (this._isiPhoneiPadAppleWebkit =
          e.match(/iPhone|iPad/) && e.match(/AppleWebKit/)),
          (this._iframeWrapper = null),
          (this._ariaSettings = null),
          (this.GetWindowManager = this.get_windowManager),
          (this.BrowserWindow = window),
          (this.GetContentFrame = this.get_contentFrame),
          (this.GetLeftPosition = function () {
            this.getWindowBounds().x;
          }),
          (this.GetTopPosition = function () {
            this.getWindowBounds().y;
          }),
          (this.GetTitlebar = function () {
            return this.ui ? this.ui.titlebar : null;
          }),
          (this.GetStatusbar = function () {
            return this._statusCell;
          }),
          (this.SetOpenerElementId = this.set_openerElementID),
          (this.SetStatus = this.set_status),
          (this.GetStatus = this.get_status),
          (this.SetModal = this.set_modal),
          (this.SetWidth = this.set_width),
          (this.SetHeight = this.set_height),
          (this.GetWidth = this.get_width),
          (this.GetHeight = this.get_height),
          (this.SetOffsetElementId = this.set_offsetElementID),
          (this.SetTitle = this.set_title),
          (this.MoveTo = this.moveTo),
          (this.Center = this.center),
          (this.SetVisible = this.setVisible),
          (this.SetSize = this.setSize),
          (this.Show = this.show),
          (this.Hide = this.hide),
          (this.GetUrl = this.get_navigateUrl),
          (this.SetUrl = this.setUrl),
          (this.Reload = this.reload),
          (this.SetActive = this.setActive),
          (this.Minimize = this.minimize),
          (this.Restore = this.restore),
          (this.Maximize = this.maximize),
          (this.Close = this.close),
          (this.TogglePin = this.togglePin),
          (this.IsMaximized = this.isMaximized),
          (this.IsMinimized = this.isMinimized),
          (this.IsModal = this.isModal),
          (this.IsClosed = this.isClosed),
          (this.IsPinned = this.isPinned),
          (this.IsVisible = this.isVisible),
          (this.IsActive = this.isActive),
          (this.IsBehaviorEnabled = this.isBehaviorEnabled);
      }),
      ($T.RadWindow.prototype = {
        _getLocalization: function () {
          return $T.RadWindowUtils.Localization;
        },
        _getLocalizationString: function (t) {
          var e = this.get_localization();
          "string" == typeof e &&
            ((e = Sys.Serialization.JavaScriptSerializer.deserialize(e)),
            this.set_localization(e));
          var i = this._getLocalization();
          return e ? e[t] : i[t];
        },
        _registerGlobalBodyEventHandlers: function (t) {
          var e = this.get_shortcuts();
          e &&
            (this._shortCutManager ||
              (this._shortCutManager = new $T.WindowShortCutManager(e)),
            t
              ? ((this._onKeyDownDelegate = Function.createDelegate(
                  this,
                  this._onKeyDown,
                )),
                $addHandler(
                  document.documentElement,
                  "keydown",
                  this._onKeyDownDelegate,
                ))
              : this._onKeyDownDelegate &&
                ($removeHandler(
                  document.documentElement,
                  "keydown",
                  this._onKeyDownDelegate,
                ),
                (this._onKeyDownDelegate = null)));
        },
        _registerIframeLoadHandler: function (t) {
          this._iframe &&
            (t
              ? ((this._onIframeLoadDelegate = Function.createDelegate(
                  this,
                  this._onIframeLoad,
                )),
                $addHandler(this._iframe, "load", this._onIframeLoadDelegate))
              : this._onIframeLoadDelegate &&
                ($removeHandler(
                  this._iframe,
                  "load",
                  this._onIframeLoadDelegate,
                ),
                (this._onIframeLoadDelegate = null),
                $clearHandlers(this._iframe)));
        },
        _registerWindowResizeHandler: function (t) {
          t
            ? ((this._onWindowResizeDelegate = Function.createDelegate(
                this,
                this._maintainMaximizedSize,
              )),
              $addHandler(window, "resize", this._onWindowResizeDelegate))
            : this._onWindowResizeDelegate &&
              ($removeHandler(window, "resize", this._onWindowResizeDelegate),
              (this._onWindowResizeDelegate = null));
        },
        _registerOpenerElementHandler: function (t, e) {
          t &&
            (Sys.UI.DomElement.containsCssClass(t, "RadButton")
              ? t.setAttribute("rwOpener", !0)
              : t.removeAttribute("rwOpener"),
            1 == e
              ? ((this._onClickDelegate = Function.createDelegate(
                  this,
                  this._onClick,
                )),
                $(t).on("click", this._onClickDelegate))
              : ($(t).off("click", this._onClickDelegate),
                (this._onClickDelegate = null)));
        },
        _registerTitlebarHandlers: function (t) {
          var e = this.ui ? this.ui.titleCell || this.ui.titlebar : null;
          t
            ? ((this._onTitlebarDblclickDelegate = Function.createDelegate(
                this,
                function () {
                  this.isMinimized()
                    ? this.restore()
                    : this.isBehaviorEnabled($T.WindowBehaviors.Maximize) &&
                      (this.isMaximized() ? this.restore() : this.maximize());
                },
              )),
              (this._onTitlebarClickDelegate = Function.createDelegate(
                this,
                function () {
                  this._getWindowController()._activeWindow === this &&
                    this.setActive(!0);
                },
              )),
              $addHandler(e, "dblclick", this._onTitlebarDblclickDelegate),
              $addHandler(e, "click", this._onTitlebarClickDelegate))
            : e &&
              (this._onTitlebarDblclickDelegate &&
                ($removeHandler(
                  e,
                  "dblclick",
                  this._onTitlebarDblclickDelegate,
                ),
                (this._onTitlebarDblclickDelegate = null)),
              this._onTitlebarClickDelegate &&
                ($removeHandler(e, "click", this._onTitlebarClickDelegate),
                (this._onTitlebarClickDelegate = null)),
              $clearHandlers(e));
        },
        _makeModal: function (t) {
          this._onModalShowHandler &&
            (this.remove_show(this._onModalShowHandler),
            (this._onModalShowHandler = null)),
            this._onModalCloseHandler &&
              (this.remove_close(this._onModalCloseHandler),
              (this._onModalCloseHandler = null)),
            this._modalExtender &&
              (this._modalExtender.dispose(), (this._modalExtender = null)),
            t &&
              ((void 0 !== $T.RadWindowManager &&
                $T.RadWindowManager.isInstanceOfType(this)) ||
                ((this._onModalShowHandler = function (t) {
                  if (!t._modalExtender) {
                    var e = t._popupElement,
                      i = t.get_enableAriaSupport();
                    t._modalExtender = new $T.ModalExtender(e, {
                      enableAriaSupport: i,
                      getNodesToHide: function () {
                        return $(e).nextAll(":not(script,link)").get();
                      },
                      trapTabKey: i,
                    });
                  }
                  t._modalExtender.show();
                  var n = null;
                  try {
                    n = document.activeElement;
                  } catch (t) {
                    document.documentElement.focus(),
                      (n = document.activeElement);
                  }
                  if (n && n.tagName && "body" != n.tagName.toLowerCase()) {
                    var s =
                      !$telerik.isDescendant(this._contentElement, n) &&
                      this._dockMode;
                    (t._isPredefined && !s) ||
                      ((t._focusedPageElement = n), n.blur());
                  }
                  t.get_centerIfModal() && t.center();
                }),
                this.add_show(this._onModalShowHandler),
                (this._onModalCloseHandler = function (t) {
                  window.setTimeout(function () {
                    t._modalExtender && t._modalExtender.hide();
                    var e = t._focusedPageElement;
                    if (e) {
                      try {
                        e.focus();
                      } catch (t) {}
                      t._focusedPageElement = null;
                    }
                  }, 10);
                }),
                this.add_close(this._onModalCloseHandler)));
        },
        _enableMoveResize: function (t) {
          if (this.view) {
            var e = {
              resize: this.isBehaviorEnabled($T.WindowBehaviors.Resize),
              move: this.isBehaviorEnabled($T.WindowBehaviors.Move),
            };
            t ? this.view.enableMoveResize(e) : this.view.disableMoveResize(e);
          }
        },
        _setResizeOverlayVisible: function (t) {
          if (!this._dockMode) {
            var e = this._resizeOverlayElement;
            if (!e) {
              var i = this._getHandlesWidth(),
                n = this._visibleTitlebar ? this._getTitlebarHeight() : i;
              ((e = document.createElement("div")).style.position = "absolute"),
                (e.style.zIndex = "1"),
                (e.style.top = n + "px"),
                (e.style.left = Math.round(i / 2) + "px"),
                (e.style.backgroundColor = "White"),
                (e.style.filter = "alpha(opacity=0)"),
                (e.style.opacity = 0),
                this._contentCell.appendChild(e),
                (this._resizeOverlayElement = e);
            }
            this._setResizeOverlaySize(), (e.style.display = t ? "" : "none");
          }
        },
        _setResizeOverlaySize: function () {
          var t = this._resizeOverlayElement;
          if (t) {
            var e = this._contentCell;
            (t.style.width = e.offsetWidth + "px"),
              (t.style.height = e.offsetHeight + "px");
          }
        },
        onResizeStart: function () {
          if (this.isMaximized()) return !1;
          this.setActive(!0),
            this._setResizeOverlayVisible(!0),
            (this._cachedDragZoneBounds = this._getRestrictionZoneBounds());
          var t = new Sys.CancelEventArgs();
          return this.raiseEvent("resizeStart", t), !t.get_cancel() && void 0;
        },
        onResizing: function (t) {
          if (
            !this._cachedDragZoneBounds ||
            this._checkRestrictionZoneBounds(this._cachedDragZoneBounds, t)
          ) {
            this._dockMode
              ? (this.setWidthDockMode(t.width - 1),
                this.setHeightDockMode(t.height - 1))
              : this._setResizeOverlaySize();
            var e = this._getCurrentBounds(),
              i = this.get_minWidth(),
              n = parseInt(this.get_maxWidth(), 10),
              s = this.get_minHeight(),
              o = parseInt(this.get_maxHeight(), 10),
              r = !1;
            if (t.width < i || (n && t.width > n)) {
              var a = i;
              t.width < i ? (t.width = i) : ((t.width = n), (a = n));
              var h = this._resizeExtender._originalBounds;
              this._resizeExtender._resizeDir.west
                ? ((t.x = h.x + (h.width - a)),
                  this._cachedDragZoneBounds &&
                    (t.x -= this._cachedDragZoneBounds.x))
                : (t.x = e.x),
                (t.y = e.y),
                (t.height = e.height),
                (r = !0);
            }
            return (
              (t.height < s || (o && t.height > o)) &&
                ((t.height = t.height < s ? s : o),
                (t.x = e.x),
                (t.y = e.y),
                (t.width = e.width),
                (r = !0)),
              r
                ? (this.setSize(t.width, t.height),
                  this._setPopupVisible(t.x, t.y),
                  !1)
                : (this._updateTitleWidth(), !0)
            );
          }
          return !1;
        },
        onResizeEnd: function () {
          this._cachedDragWindowBounds = null;
          var t = this._getCurrentBounds();
          this._dockMode || this._setResizeOverlayVisible(!1),
            this._setPopupVisible(t.x, t.y),
            this._storeBounds(),
            this._overlay &&
              $telerik.isFirefox &&
              this._popupBehavior._onMove(),
            this.raiseEvent("resizeEnd", new Sys.EventArgs());
        },
        onDragStart: function () {
          if ((this.setActive(!0), this.isPinned() || this.isMaximized()))
            return !1;
          if (this.isMinimized() && this.get_minimizeZoneID()) return !1;
          var t = this.get_popupElement();
          this._cachedDragZoneBounds = this._getRestrictionZoneBounds();
          var e = $telerik.getSize(t),
            i = $telerik.getBorderBox(t);
          return (
            (e.width -= i.horizontal),
            (e.height -= i.vertical),
            (this._cachedDragWindowBounds = e),
            this._setResizeOverlayVisible(!0),
            this.raiseEvent("dragStart", new Sys.EventArgs()),
            !0
          );
        },
        onDragEnd: function (t) {
          (this._cachedDragZoneBounds = null),
            (this._cachedDragWindowBounds = null),
            this._overlay &&
              $telerik.isFirefox &&
              this._popupBehavior._onMove(),
            this._setResizeOverlayVisible(!1);
          var e = this._getCurrentBounds();
          this.moveTo(e.x, e.y),
            this.setActive(!0),
            this.isMinimized() && (this._getTitleElement().style.width = ""),
            this.raiseEvent("dragEnd", new Sys.EventArgs());
        },
        onDrag: function (t) {
          if (!this._cachedDragZoneBounds) return !0;
          var e = this._cachedDragWindowBounds,
            i = this._cachedDragZoneBounds;
          (t.width = e.width), (t.height = e.height);
          var n = this._checkRestrictionZoneBounds(i, t);
          return (
            n ||
              (t.x <= i.x
                ? (t.x = i.x)
                : i.x + i.width <= t.x + e.width &&
                  (t.x = i.x + i.width - e.width),
              t.y <= i.y
                ? (t.y = i.y)
                : i.y + i.height <= t.y + e.height &&
                  (t.y = i.y + i.height - e.height),
              (n = !0)),
            n
          );
        },
        initialize: function () {
          $T.RadWindow.callBaseMethod(this, "initialize"),
            (this._positionX = this._left),
            (this._positionY = this._top),
            this.initView();
          var t = this.get_element();
          t.innerHTML
            .toLowerCase()
            .indexOf(
              "thank you for using the trial version of telerik� ui for asp.net ajax",
            ) > 0 && (t.style.display = ""),
            this.get_visibleOnPageLoad() &&
              setTimeout(
                Function.createDelegate(this, function () {
                  this.show();
                }),
                0,
              ),
            this._registerWindowResizeHandler(!0);
          var e = this.get_element().className;
          e && this.set_cssClass(e.replace(/^ /, ""));
        },
        initView: function () {
          var t = $T.Window.UIFactory;
          (this.ui && this.ui.window == this) ||
            (this.ui = t.getRenderer(this._renderMode, this)),
            (this.view && this.view.window == this) ||
              (this.view = t.getView(this._renderMode, this));
        },
        dispose: function () {
          var t = this.get_windowManager();
          t &&
            (t.get_preserveClientState() && t.saveWindowState(this),
            this.get_destroyOnClose() && t.removeWindow(this)),
            this.disposeUI(),
            this._keyboardNavigation && this._keyboardNavigation.dispose(),
            $T.RadWindow.callBaseMethod(this, "dispose");
        },
        disposeUI: function () {
          this._windowAnimation && this._windowAnimation.dispose(),
            $telerik.isChrome ||
              $telerik.isSafari ||
              (this._removeFromDOM = this.get_destroyOnClose()),
            this._enableMoveResize(!1),
            this._makeModal(!1),
            this._registerTitlebarHandlers(!1),
            this._titleIconElement && $clearHandlers(this._titleIconElement),
            this._registerWindowResizeHandler(!1),
            this._registerIframeLoadHandler(!1),
            this._openerElement &&
              this._registerOpenerElementHandler(this._openerElement, !1),
            this.set_behaviors($T.WindowBehaviors.None),
            this.view && this.view.dispose(),
            this.ui && this.ui.dispose(),
            (this.view = this.ui = null);
          var t = this._iframe;
          t &&
            ((t.radWindow = null),
            "sandbox" in document.createElement("iframe") &&
              (t.src = "about:blank"),
            (t.name = ""),
            t.removeAttribute("name"),
            t.removeAttribute("NAME"));
          this._createTouchScrollExtender(!1),
            this._contentElement &&
              this._isPredefined &&
              (this._contentElement.innerHTML = "");
          var e = this.get_contentElement();
          if (this._dockMode && e && Sys && Sys.WebForms) {
            var i = Sys.WebForms.PageRequestManager.getInstance();
            i && i.get_isInAsyncPostBack() && $telerik.disposeElement(e);
          }
          var n = this._popupElement;
          n && n.parentNode && n.parentNode.removeChild(n),
            (this._popupVisible = !1);
          var s = this._popupBehavior;
          this.get_destroyOnClose() &&
            s &&
            (s.dispose(), (this._popupBehavior = null));
        },
        hide: function () {
          return this._hide(), this._registerGlobalBodyEventHandlers(!1), !0;
        },
        clone: function (t) {
          var e,
            i = document.createElement("span");
          t && i.setAttribute("id", t);
          var n = this.get_contentElement(),
            s = n ? n.cloneNode(!0) : null;
          this._renderMode != $T.RenderMode.Classic &&
            (this._contentElement = s);
          try {
            (e = $telerik.cloneControl(
              this,
              $T.RadWindow,
              i,
            ))._enableRippleEffect = this._enableRippleEffect;
          } finally {
            this._renderMode != $T.RenderMode.Classic &&
              n &&
              this.set_contentElement(n);
          }
          return e;
        },
        _createTouchScrollExtender: function (t) {
          var e = $get(this.get_id() + "_C");
          if (e) {
            var i = this._dropDownTouchScroll;
            i
              ? t || (i.dispose(), (this._dropDownTouchScroll = null))
              : t &&
                ((this._dropDownTouchScroll = new $T.TouchScrollExtender(e)),
                this._dropDownTouchScroll.initialize());
          }
        },
        set_contentElement: function (t) {
          this._isPredefined ||
            0 != t.getElementsByTagName("iframe").length ||
            (this._dockMode = !0),
            this.view && this.view.setContent(t);
        },
        _setShadowCSSClass: function (t) {
          this.ui.setShadowCssClass(t);
        },
        get_contentElement: function () {
          return (
            this._contentElement || (this.ui ? this.ui.pendingContent : null)
          );
        },
        isCreated: function () {
          return null != this._popupElement;
        },
        show: function () {
          var t = this.isCreated();
          this._createUI();
          var e = this._contentElement || this._contentCell;
          if (e) {
            var i = $(e).closest(".RadWindow");
            $(this.get_element()).find(".wm").appendTo(i), this._renderWm(i);
          }
          var n = new Sys.CancelEventArgs();
          if (
            (this.setZIndexCss(),
            this.raiseEvent("beforeShow", n),
            !n.get_cancel())
          ) {
            if (
              (!this.get_navigateUrl() ||
                (t && !this.get_reloadOnShow()) ||
                this.setUrl(this.get_navigateUrl()),
              !t && this.get_initialBehaviors() != $T.WindowBehaviors.None)
            )
              return (
                this._show(),
                this._afterShow(),
                this.isInitialBehaviorEnabled($T.WindowBehaviors.Minimize) &&
                  this.minimize(),
                this.isInitialBehaviorEnabled($T.WindowBehaviors.Maximize) &&
                  this.maximize(),
                void (
                  this.isInitialBehaviorEnabled($T.WindowBehaviors.Pin) &&
                  this.togglePin()
                )
              );
            this.get_animation() == $T.WindowAnimation.None
              ? (this._show(), this._afterShow())
              : this._playAnimation();
          }
        },
        _show: function () {
          var t = this;
          if (this.get_offsetElementID() && !this._offsetElement) {
            var e = $get(this.get_offsetElementID());
            e && (this._offsetElement = e);
          }
          var i = this._popupBehavior.get_parentElement();
          this._offsetElement &&
            !this._offsetSet &&
            (this._popupBehavior.set_parentElement(this._offsetElement),
            (this._offsetSet = !0)),
            this.set_visibleTitlebar(this._visibleTitlebar),
            this.set_visibleStatusbar(this._visibleStatusbar),
            t.get_enableShadow()
              ? t._setShadowCSSClass(!0)
              : t._setShadowCSSClass(!1),
            this._reSetWindowPosition(),
            (this._popupVisible = !0),
            this.setVisible(!0);
          var n = this._getStoredBounds();
          this._firstShow && !n
            ? (this.set_width(this.get_width()),
              this.set_height(this.get_height()))
            : this._restoreBounds(),
            i != this._popupBehavior.get_parentElement() &&
              this._popupBehavior.set_parentElement(i);
          var s = this.get_contentElement();
          !this._isPredefned && s && $telerik.repaintChildren(s);
        },
        _hide: function () {
          if (this.get_animation() && 0 != this.get_animation()) {
            this._enableShadow && $telerik.isIE && this._setShadowCSSClass(!1);
            var t = Function.createDelegate(this, this._afterHide),
              e = this.isMaximized(),
              i = this.get_animationDuration();
            $telerik
              .$(this._popupElement)
              .stopTransition()
              .transition({ opacity: 0 }, i, "linear", function () {
                t(e);
              });
          } else this._afterHide();
        },
        _afterHide: function (t) {
          if (this._popupBehavior) {
            null == t && (t = this.isMaximized());
            var e = this.isMinimized();
            (t || e) && this.restore(),
              $telerik.isFirefox && this.setOverflowVisible(!1),
              (this._popupVisible = !1),
              $telerik.isIE9 || $telerik.isIE10
                ? this._moveElementToShowOutOfView()
                : this.setVisible(!1),
              this._getWindowController().notifyWindowClosed(this),
              (this._isClosing = !1);
          }
        },
        _moveElementToShowOutOfView: function () {
          this.view || this.initView(), this.view.moveOutOfSight();
        },
        get_leftHidingPoint: function () {
          return this._isRightToLeft ? 1e4 : -1e4;
        },
        _afterShow: function () {
          ($telerik.isIE9 || $telerik.isIE10) &&
            this._restoreElementToShowStyling(),
            this._restoreElementToShowOpacity(),
            this.setActive(!0),
            $telerik.isFirefox && this.setOverflowVisible(!0),
            this._registerGlobalBodyEventHandlers(!0),
            this._storeBounds(),
            this.raiseEvent("show", new Sys.EventArgs());
          var t = this.get_animation() != $T.WindowAnimation.None;
          this.get_autoSize() && (this._dockMode || t) && this.autoSize(t),
            this.get_enableAriaSupport() &&
              this._popupElement &&
              this.isVisible() &&
              this._popupElement.setAttribute("aria-hidden", "false");
        },
        _restoreElementToShowStyling: function () {
          this._popupBehavior &&
            $(this._popupBehavior.get_elementToShow()).css("overflow", "");
        },
        _restoreElementToShowOpacity: function () {
          if (this._popupBehavior) {
            var t = $(this._popupBehavior.get_elementToShow());
            "0" === t.css("opacity") && t.css("opacity", "");
          }
        },
        _playAnimation: function () {
          var t = Function.createDelegate(this, function () {
              var t = this._getCalculatedPopupBounds();
              this._setPopupVisible(t.x, t.y);
              var e = $telerik.getBounds(this._popupElement),
                i = this.get_offsetElementID();
              if (i) {
                var n = $get(i);
                if (n) {
                  var s = $telerik.getBounds(n);
                  (e.x = s.x), (e.y = s.y);
                }
              }
              return $telerik.$(this._popupElement).hide(), e;
            }),
            e = this._popupElement;
          this._enableShadow && $telerik.isIE && this._setShadowCSSClass(!1);
          var i = this.get_animation(),
            n = this._openerElement
              ? $telerik.getBounds(this._openerElement)
              : null,
            s = t(),
            o = this.get_animationDuration(),
            r = "" + this._position,
            a = Function.createDelegate(this, function () {
              var t = this.get_popupElement();
              (t.style.filter = ""),
                $telerik.isIE7 && t.style.removeAttribute("filter"),
                (t.style.opacity = ""),
                this._enableShadow &&
                  $telerik.isIE &&
                  !$telerik.isIE6 &&
                  this._setShadowCSSClass(!0),
                this._show(),
                this._afterShow();
            });
          $T.Animations.playJQueryAnimation(e, i, n, s, r, null, a, o);
        },
        _onClick: function (t) {
          return this.show(), this._cancelEvent(t);
        },
        _onKeyDown: function (t) {
          var e = this._shortCutManager.isShortCutHit(t);
          e && this.isActive() && this.fire(e.get_name());
        },
        _cancelEvent: function (t) {
          return (
            t &&
              ((t.returnValue = !1),
              (t.cancelBubble = !0),
              t.preventDefault(),
              t.stopPropagation()),
            !1
          );
        },
        _getWindowController: function () {
          return $T.RadWindowController.getInstance();
        },
        _getReloadOnShowUrl: function (t) {
          var e = "rwndrnd=" + Math.random();
          e = t.indexOf("?") > -1 ? "&" + e : "?" + e;
          var i = t.indexOf("#");
          return (t = i > -1 ? t.substr(0, i) + e + t.substr(i) : t + e);
        },
        getWindowBounds: function () {
          return this._getCalculatedPopupBounds();
        },
        toString: function () {
          return "[RadWindow id=" + this.get_id() + "]";
        },
        center: function () {
          var t = this._getCentralBounds();
          this.moveTo(t.x, t.y);
        },
        moveTo: function (t, e) {
          if (this._popupElement) {
            var i = this.ui.getBounds(),
              n = this._getRestrictionZoneBounds();
            if (n)
              if (
                !this._checkRestrictionZoneBounds(
                  null,
                  new Telerik.Web.UI.Bounds(
                    t + n.x,
                    e + n.y,
                    i.width,
                    i.height,
                  ),
                )
              )
                return !1;
          }
          return (
            (t = parseInt(t, 10)),
            (e = parseInt(e, 10)),
            this._createUI(),
            this._setPopupVisible(t, e),
            this._storeBounds(),
            !0
          );
        },
        setZIndexCss: function () {
          var t = this.ui,
            e = t.container,
            i = parseInt(e.style.zIndex, 10);
          if (!this.isMaximized()) {
            var n =
              t.get_initialZIndexCss() ||
              Telerik.Web.UI.RadWindowUtils.get_newZindex(i);
            e.style.zIndex = "" + n;
          }
        },
        setSize: function (t, e) {
          (this._firstShow = !1),
            this.set_width(t),
            this.set_height(e),
            this._storeBounds();
        },
        _calculateBoundsToFit: function (t, e) {
          var i,
            n,
            s = this._renderMode == $T.RenderMode.Lite,
            o = this.get_minWidth() - this._getHandlesWidth(),
            r = this._tableElement
              ? parseInt(this._tableElement.offsetHeight, 10) -
                parseInt(this.get_height(), 10)
              : 0,
            a = this._getTitleElement();
          a && (a.style.width = s ? "" : "1px");
          var h = t.parentNode,
            l = h.style.height,
            d = h.style.width,
            u = "IFRAME" == t.nodeName;
          if (
            ((t.style.height = !s || u ? "1px" : ""),
            (t.style.width = !s || u ? "1px" : ""),
            s && ((h.style.height = "1px"), (h.style.width = "1px")),
            this._dockMode)
          ) {
            var c = t.style.overflow,
              _ = t.style.position;
            $(t).css({ position: "absolute", overflow: "visible" });
            try {
              var g = t.scrollWidth + $telerik.getBorderBox(t).horizontal;
              (n = g > o ? g : o),
                (i = t.scrollHeight),
                this._contentCell &&
                  Sys.UI.DomElement.addCssClass(this._contentCell, "rwLoading");
            } finally {
              $(t).css({ position: _, overflow: c });
            }
          } else {
            var m = e.getElementsByTagName("body")[0],
              w = (m && m.scrollWidth) || 0,
              f = (m && m.scrollHeight) || 0;
            (n = Math.max(e.scrollWidth, w)) < o &&
              ((t.style.width = o + "px"), (n = e.scrollWidth)),
              (i = Math.max(e.scrollHeight, f));
          }
          s && ((h.style.height = l), (h.style.width = d));
          var p = this._getRestrictionZoneBounds(),
            v = p || this._getViewportBounds(),
            C = this._getHandlesWidth() + n,
            b = this.get_defaultMinHeight() + i;
          this._enableShadow &&
            $telerik.isIE &&
            !$telerik.isIE6 &&
            this._tableElement &&
            r > 0 &&
            (b -= r);
          var y = C,
            S = b;
          C > v.width && ((y = v.width), (S += scrollBarWidth)),
            b > v.height && ((S = v.height), (y += scrollBarWidth));
          var E = this.get_minWidth(),
            z = this.get_minHeight(),
            B = parseInt(this.get_maxHeight(), 10),
            I = parseInt(this.get_maxWidth(), 10);
          return (
            E > y && (y = E),
            z > S && (S = z),
            B && B < S && (S = B),
            I && I < y && (y = I),
            {
              width: Math.ceil(y),
              height: Math.ceil(S),
              contentPageWidth: n,
              contentPageHeight: i,
            }
          );
        },
        _autoSizeBehaviorBounds: function (t, e) {
          var i = this._getRestrictionZoneBounds(),
            n = i || this._getViewportBounds(),
            s = $T.WindowAutoSizeBehaviors,
            o = this.isAutoSizeBehaviorEnabled(s.WidthProportional),
            r = this.isAutoSizeBehaviorEnabled(s.Width),
            a = o || r,
            h = this.isAutoSizeBehaviorEnabled(s.HeightProportional),
            l = this.isAutoSizeBehaviorEnabled(s.Height),
            d = h || l,
            u = t;
          if (
            (i && ((u.y -= i.y), (u.x -= i.x)),
            o &&
              null === this._positionX &&
              (u.x = this.calcPosition(t.x, t.width, e.width, n.width, !1)),
            a && (u.width = e.width),
            a &&
              !d &&
              this.get_height() < e.height &&
              (u.width += scrollBarWidth),
            h &&
              null === this._positionY &&
              (u.y = this.calcPosition(t.y, t.height, e.height, n.height, !0)),
            d && (u.height = e.height),
            d && !a && this.ui.content)
          ) {
            var c = this.get_width() < this.ui.content.scrollWidth;
            u.height += c ? scrollBarWidth : 1;
          }
          if (i) {
            if (
              (u.width == i.width && (u.x = 0),
              u.height == i.height &&
                ((u.y = 0),
                this._enableShadow &&
                  $telerik.isIE &&
                  !$telerik.isIE6 &&
                  this._tableElement))
            ) {
              var _ =
                parseInt(this._tableElement.offsetHeight, 10) -
                parseInt(this.get_height(), 10);
              u.height -= _;
            }
          } else this.set_keepInScreenBounds(!0);
          return u;
        },
        autoSize: function (t) {
          if (
            !(
              this._isClosing ||
              this.isClosed() ||
              this.isMinimized() ||
              this.isMaximized()
            )
          ) {
            this.setOverflowVisible(!0),
              (this._autoSizeInProgress = !this.get_autoSize());
            var e = this.get_contentFrame(),
              i = this._getTitleElement(),
              n = this.get_popupElement(),
              s = $telerik.getBounds(n),
              o = $telerik.getBorderBox(n),
              r = this.get_contentElement(),
              a = r ? $telerik.getBorderBox(r) : zeroBox;
            Telerik.Web.Browser.ff &&
              ((o = this._getBordersFF(n)), r && (a = this._getBordersFF(r))),
              (s.width -= o.horizontal + a.horizontal),
              (s.height -= o.vertical + a.vertical);
            var h = null,
              l = this.get_keepInScreenBounds();
            if (!this._dockMode) {
              try {
                if (!(h = e.contentWindow.document.documentElement)) return;
              } catch (t) {
                return !1;
              }
              r = e;
            }
            var d = this._calculateBoundsToFit(r, h),
              u = this._autoSizeBehaviorBounds(s, d);
            return (
              (u.width += o.horizontal + a.horizontal),
              (u.height += o.vertical + a.vertical),
              this.setOverflowVisible(!1),
              t
                ? this._autoSizeWithAnimation(u)
                : (this._deleteStoredBounds(),
                  this.setBounds(u),
                  this.setOverflowVisible(!0),
                  this._contentCell &&
                    Sys.UI.DomElement.removeCssClass(
                      this._contentCell,
                      "rwLoading",
                    ),
                  this.raiseEvent("autoSizeEnd", new Sys.EventArgs())),
              $telerik.isIE &&
                e &&
                ((e.style.overflow = "hidden"),
                setTimeout(function () {
                  e.style.overflow = "";
                }, 0)),
              this.set_keepInScreenBounds(l),
              e &&
                ((r.style.width = "100%"),
                (r.style.height = "100%"),
                $telerik.isIE9Mode && this.set_height(this.get_height())),
              i &&
                !this._isRightToLeft &&
                1 != this.get_renderMode() &&
                (i.style.width = ""),
              !0
            );
          }
        },
        _getBordersFF: function (t) {
          var e = {
            top: parseFloat($(t).css("border-top-width")),
            right: parseFloat($(t).css("border-right-width")),
            bottom: parseFloat($(t).css("border-bottom-width")),
            left: parseFloat($(t).css("border-left-width")),
          };
          return (
            (e.horizontal = e.left + e.right),
            (e.vertical = e.top + e.bottom),
            e
          );
        },
        _autoSizeWithAnimation: function (t) {
          var e = this.get_popupElement();
          this._enableShadow && $telerik.isIE && this._setShadowCSSClass(!1);
          var i = Function.createDelegate(this, function () {
            if (!this.isClosed()) {
              var e = this.get_popupElement();
              (e.style.filter = ""),
                $telerik.isIE7 && e.style.removeAttribute("filter"),
                (e.style.opacity = ""),
                this._deleteStoredBounds(),
                this.setBounds(t),
                this.setOverflowVisible(!0),
                this._contentCell &&
                  Sys.UI.DomElement.removeCssClass(
                    this._contentCell,
                    "rwLoading",
                  ),
                this._enableShadow &&
                  $telerik.isIE &&
                  !$telerik.isIE6 &&
                  this._setShadowCSSClass(!0),
                this.raiseEvent("autoSizeEnd", new Sys.EventArgs());
            }
          });
          this._tableElement && (this._tableElement.style.height = "100%");
          var n = { width: t.width, height: t.height, x: t.x, y: t.y },
            s = this._getRestrictionZoneBounds();
          s && ((n.x += s.x), (n.y += s.y)),
            setTimeout(function () {
              $telerik
                .$(e)
                .transition(
                  {
                    width: n.width,
                    height: n.height,
                    left: n.x,
                    top: n.y,
                    opacity: 1,
                  },
                  300,
                  "easeIn",
                  i,
                );
            }, 0);
        },
        setBounds: function (t) {
          t &&
            ((this._checkRestrictionZoneBounds = function () {
              return !0;
            }),
            this.moveTo(t.x, t.y),
            this.setSize(t.width, t.height),
            (this._checkRestrictionZoneBounds =
              $T.RadWindow.prototype._checkRestrictionZoneBounds));
        },
        _substractWrappersBorder: function (t, e) {
          var i = this.get_popupElement(),
            n = this._contentCell;
          if (!i || !n) return t;
          var s = $telerik.getBorderBox(i),
            o = $telerik.getBorderBox(n);
          return (t -= e
            ? s.horizontal + o.hrizontal
            : s.vertical + o.vertical);
        },
        setWidthDockMode: function (t) {
          this._dockMode &&
            this.get_contentElement() &&
            this.view.setContentWidth(t);
        },
        setHeightDockMode: function (t) {
          var e = this.get_contentElement();
          this._dockMode && e && this.setContentFixedHeight(t, e);
        },
        setContentFixedHeight: function (t, e) {
          this.isCreated() && this.view.setContentFixedHeight(t, e);
        },
        calcPosition: function (t, e, i, n, s) {
          var o = t + Math.round((e - i) / 2);
          if (
            (o < 0 || o + e > n) &&
            ((o = Math.round(Math.abs((n - i) / 2))),
            this.isAutoSizeBehaviorEnabled($T.WindowAutoSizeBehaviors.Default))
          ) {
            var r = this._dockMode ? window : this.BrowserWindow;
            o += s
              ? Math.max(
                  r.document.documentElement.scrollTop,
                  r.document.body.scrollTop,
                )
              : Math.max(
                  r.document.documentElement.scrollLeft,
                  r.document.body.scrollLeft,
                );
          }
          return o;
        },
        _maintainMaximizedSize: function () {
          this.isMaximized() && this.view && this.view.setMaximizeSize();
        },
        _enablePageScrolling: function (t) {
          t
            ? ($(HTML).removeClass(PREVENT_PAGE_SCROLLING_CLASS),
              $(BODY).removeClass(PREVENT_PAGE_SCROLLING_CLASS))
            : ($(HTML).addClass(PREVENT_PAGE_SCROLLING_CLASS),
              $(BODY).addClass(PREVENT_PAGE_SCROLLING_CLASS));
        },
        _getRestrictionZoneBounds: function () {
          var t = null,
            e = this._getRestrictionZoneElement();
          return (
            e &&
              (((t = $telerik.getBounds(e)).scrollLeft = 0), (t.scrollTop = 0)),
            t
          );
        },
        _getRestrictionZoneElement: function () {
          var t = this.get_restrictionZoneID();
          return t && $get(t);
        },
        _storeBounds: function () {
          if (this.isCreated()) {
            var t = this._getCurrentBounds();
            if (this.isMaximized()) return !1;
            this.isMinimized() &&
              (this._restoreRect
                ? ((t.width = this._restoreRect.width),
                  (t.height = this._restoreRect.height))
                : ((t.width = this.get_width()),
                  (t.height = this.get_height()))),
              ($telerik.isIE9 || $telerik.isIE10) &&
                this._restoreRect &&
                t.x == this.get_leftHidingPoint() &&
                -1e4 == t.y &&
                ((t.x = this._restoreRect.x), (t.y = this._restoreRect.y)),
              (this._restoreRect = t);
          }
        },
        _restoreBounds: function () {
          if (this._restoreRect) {
            var t = this._restoreRect;
            this.setSize(t.width, t.height), this.moveTo(t.x, t.y);
          }
        },
        _getStoredBounds: function () {
          if (this._restoreRect) return this._restoreRect;
        },
        _deleteStoredBounds: function () {
          this._restoreRect = null;
        },
        _getCurrentBounds: function () {
          var t = this.ui.getBounds();
          1 != this._firstShow &&
            (this._updateWindowSize(this._height), (this._firstShow = !0));
          var e = this._getRestrictionZoneBounds();
          return e && ((t.x -= e.x), (t.y -= e.y)), t;
        },
        _getCentralBounds: function () {
          var t = this._getCurrentBounds(),
            e = this._getViewportBounds(),
            i = parseInt((e.width - t.width) / 2, 10),
            n = parseInt((e.height - t.height) / 2, 10);
          return (t.x = i + e.scrollLeft), (t.y = n + e.scrollTop), t;
        },
        _getViewportBounds: function () {
          var t = this._getRestrictionZoneBounds();
          if (t) return t;
          var e = $telerik.getClientBounds(),
            i =
              $telerik.getCorrectScrollLeft(document.documentElement) ||
              $telerik.getCorrectScrollLeft(document.body),
            n = document.documentElement.scrollTop || document.body.scrollTop;
          return (
            (e.scrollLeft = i),
            (e.scrollTop = n),
            this.isIE &&
              (0 == e.width && (e.width = document.body.clientWidth),
              0 == e.height && (e.height = document.body.clientHeight)),
            e
          );
        },
        _getCalculatedPopupBounds: function () {
          var t = this,
            e = t.isModal(),
            i = t.isMaximized(),
            n = t.isMinimized(),
            s = this._getStoredBounds();
          if (s && !i && !n) return s;
          var o = this._getCurrentBounds(),
            r = this._offsetElement;
          if (
            (!e && null == t._top && null == t._left && !r) ||
            (e && t.get_centerIfModal())
          )
            o = this._getCentralBounds();
          else {
            if (r) (o.y = 0), (o.x = 0);
            else {
              var a = this._getViewportBounds();
              (o.x = a.scrollLeft), (o.y = a.scrollTop);
            }
            if (!i) {
              var h = this._left ? this._left : 0;
              o.x += h;
              var l = this._top ? this._top : 0;
              o.y += l;
            }
          }
          return o;
        },
        _checkRestrictionZoneBounds: function (t, e) {
          var i = t;
          return (
            (!i && !(i = this._getRestrictionZoneBounds())) ||
            $T.ResizeExtender.containsBounds(i, e)
          );
        },
        _getTitlebarHeight: function () {
          return this.ui ? this.ui.getTitlebarHeight() : 0;
        },
        _reSetWindowPosition: function () {
          var t = this._getCalculatedPopupBounds();
          this._setPopupVisible(t.x, t.y);
        },
        _fixIeHeight: function (t, e) {
          if ("CSS1Compat" == document.compatMode) {
            var i = t.offsetHeight - parseInt(e, 10);
            if (i > 0) {
              var n = parseInt(t.style.height, 10) - i;
              n > 0 && (t.style.height = n + "px");
            }
          }
        },
        _setPopupVisible: function (t, e) {
          var i = this._getRestrictionZoneBounds();
          i && ((t += i.x), (e += i.y)),
            this.isCreated() && this.view.moveTo(t, e);
        },
        _isWindowRightToLeft: function () {
          var t = this._isRightToLeft;
          if (null == t) {
            var e = this.get_element(),
              i = e.parentNode ? e : this._getDefaultParent();
            t = this._isRightToLeft = $telerik.isRightToLeft(i);
          }
          return t;
        },
        _createStatusbarResizer: function (t) {
          this.ui && this.ui.createStatusbarResizer();
        },
        _createUI: function () {
          this.initView(), this.ui.createUI();
        },
        _getDefaultParent: function () {
          var t = this.get_formID()
            ? document.getElementById(this.get_formID())
            : null;
          return (
            t ||
              (t =
                document.forms && document.forms.length > 0
                  ? document.forms[0]
                  : document.body),
            t
          );
        },
        _getStatusMessageElement: function () {
          if (this.ui) return this.ui.getStatusMessageNode();
        },
        _getTitleCommandButtonsHolder: function () {
          if (this.ui) return this.ui.getTitleCommandsContainer();
        },
        _getTitleElement: function () {
          if (this.ui) return this.ui.getTitleNode();
        },
        _getTitleIcon: function () {
          if (this.ui) return this.ui.getIconNode();
        },
        _getTitleCommandButton: function (t) {
          if (this.ui) return this.ui.getCommandButton(t);
        },
        getTitleCommandButton: function (t) {
          return this._getTitleCommandButton(t);
        },
        _getHandlesWidth: function () {
          return (
            !this._handlesWidth &&
              this.ui &&
              (this._handlesWidth = this.ui.getHandlesWidth()),
            this._handlesWidth
          );
        },
        get_defaultMinWidth: function () {
          if (this.ui) return this.ui.get_uiMinWidth();
        },
        get_defaultMinHeight: function () {
          if (this.ui) return this.ui.get_uiMinHeight();
        },
        setOverflowVisible: function (t) {
          if (t || !this._overflowHidden) {
            var e,
              i,
              n = "hidden",
              s = "hidden",
              o = "hidden";
            if (!this._dockMode)
              try {
                var r = this.get_contentFrame();
                if (
                  (r && (r.style.overflow = t ? "" : "hidden"),
                  !(e = r.contentWindow.document.documentElement))
                )
                  return;
                (i = r.contentWindow.document.body),
                  t ||
                    ((this._oldBodyOverflow = i.style.overflow),
                    (this._oldDocOverflow = e.style.overflow),
                    (this._overflowHidden = !0));
              } catch (t) {}
            t &&
              ((s = this._oldBodyOverflow),
              (o = this._oldDocOverflow),
              (n = "auto"),
              (this._overflowHidden = !1)),
              this._dockMode
                ? (this.get_contentElement().style.overflow = n)
                : e &&
                  i &&
                  ((o || "" == o) && (e.style.overflow = o),
                  (s || "" == s) && (i.style.overflow = s));
          }
        },
        _updateTitleWidth: function () {
          this.ui && this.ui.updateTitleWidth();
        },
        _addWindowToDocument: function () {
          this.view.moveToDefaultParent();
        },
        _createBackReference: function () {
          var t = this;
          t.Argument || (t.Argument = {});
          var e = this._iframe;
          try {
            (e.radWindow = t),
              null != e.contentWindow && (e.contentWindow.radWindow = t);
          } catch (t) {}
        },
        _getFullSkinName: function () {
          return (
            "RadWindow RadWindow_" +
            this.get_skin() +
            " rwNormalWindow rwTransparentWindow"
          );
        },
        _configureMinimizeButton: function (t) {
          var e =
              1 == t
                ? this._getLocalizationString("Restore")
                : this._getLocalizationString("Minimize"),
            i = 1 == t ? this.restore : this._minimize,
            n = this._getTitleCommandButton("Minimize");
          if (!this.isBehaviorEnabled($T.WindowBehaviors.Close) && n) {
            var s = n.parentNode,
              o = this._isWindowRightToLeft() ? "right" : "left";
            1 == t && (o = "right" == o ? "left" : "right"),
              (s.style.styleFloat = o),
              (s.style.cssFloat = o);
          }
          this._registerTitlebarHandlersButton("Minimize", e, i);
        },
        _configureMaximizeButton: function (t) {
          var e =
              1 == t
                ? this._getLocalizationString("Restore")
                : this._getLocalizationString("Maximize"),
            i = 1 == t ? this.restore : this.maximize;
          this._registerTitlebarHandlersButton("Maximize", e, i);
        },
        _registerTitlebarHandlersButton: function (t, e, i) {
          this.ui &&
            this.ui.changeCommandButtonByName(
              t,
              e,
              Function.createDelegate(this, i),
            );
        },
        isCloned: function () {
          return this._isCloned;
        },
        isBehaviorEnabled: function (t) {
          return !!(t & this.get_behaviors());
        },
        isInitialBehaviorEnabled: function (t) {
          return !!(t & this.get_initialBehaviors());
        },
        isAutoSizeBehaviorEnabled: function (t) {
          return !!(t & this.get_autoSizeBehaviors());
        },
        setVisible: function (t) {
          this.view || this.initView(), t ? this.view.show() : this.view.hide();
        },
        isVisible: function () {
          return this._popupVisible;
        },
        isModal: function () {
          return this._modal;
        },
        isActive: function () {
          return this.view && this.view.isActive();
        },
        isPinned: function () {
          var t = this._getTitleCommandButton("Pin");
          return t && Sys.UI.DomElement.containsCssClass(t, "on");
        },
        isClosed: function () {
          return !this.isVisible();
        },
        isMinimized: function () {
          return (
            this._popupElement &&
            Sys.UI.DomElement.containsCssClass(
              this._popupElement,
              "rwMinimizedWindow",
            )
          );
        },
        isMaximized: function () {
          return (
            this._popupElement &&
            Sys.UI.DomElement.containsCssClass(
              this._popupElement,
              "rwMaximizedWindow",
            )
          );
        },
        _moveToMinimizeZone: function () {
          var t = $get(this.get_minimizeZoneID());
          t &&
            (this.isPinned() &&
              ((this._isMinimizePinned = !0), this.togglePin()),
            this.view.minimizeToZone(t));
        },
        _moveToDocument: function () {
          this.view.revertToDefaultParent(),
            this._isMinimizePinned &&
              ((this._isMinimizePinned = !1), this.togglePin());
        },
        minimize: function () {
          this._clearTouchEventIdentifier(),
            !1 !== this._minimize() && this.setActive(!0);
        },
        _minimize: function () {
          return (
            this._clearTouchEventIdentifier(),
            !!this.isCreated() &&
              !!this.onCommand("Minimize") &&
              (this.isMaximized() &&
                (this._normalizeWindowRootCss(), this._restoreBounds()),
              void (this.view && this.view.minimize()))
          );
        },
        restore: function () {
          var t = this;
          (this._clearTouchEventIdentifier(), t.isCreated() && !t.isClosed()) &&
            t.onCommand("Restore") &&
            (t._configureMinimizeButton(),
            t._configureMaximizeButton(),
            t.isMinimized() && t.get_minimizeZoneID() && t._moveToDocument(),
            t.isMaximized() && t.view.restoreResizeHandlesCursor(),
            t._normalizeWindowRootCss(),
            t._enablePageScrolling(!0),
            t._restoreBounds(),
            t.setVisible(!0),
            t._enableShadow && !$telerik.isIE6 && t._setShadowCSSClass(!0),
            t.get_showOnTopWhenMaximized() &&
              t._restoreZindex &&
              ((t._popupElement.style.zIndex = t._restoreZindex),
              t.get_modal() &&
                t._modalExtender &&
                t._modalExtender.updateModalOverlayZIndex(),
              (t._restoreZindex = null)),
            t.setVisible(!0),
            t.setActive(!0),
            this.isVisible() && t._show(),
            t._restoreDocumentScrollPosition());
        },
        _restoreDocumentScrollPosition: function () {
          var t = this._restoreOptions,
            e = $(document),
            i = document.body,
            n = function (t, i) {
              i && i > 0 && e["scroll" + t](i);
            },
            s = function (t, e) {
              e && e > 0 && (i["scroll" + t] = e);
            };
          t &&
            (n("Top", t.documentScrollTop),
            n("Left", t.documentScrollLeft),
            s("Left", t.bodyScrollLeft),
            s("Top", t.bodyScrollTop));
        },
        maximize: function () {
          var t = this;
          (this._clearTouchEventIdentifier(), this.isCreated()) &&
            this.onCommand("Maximize") &&
            (this._storeBounds(),
            this.isMinimized() &&
              this.get_minimizeZoneID() &&
              this._moveToDocument(),
            this.isMinimized() &&
              (this._normalizeWindowRootCss(),
              (this._checkRestrictionZoneBounds = function () {
                return !0;
              }),
              this._restoreBounds(),
              (this._checkRestrictionZoneBounds =
                $T.RadWindow.prototype._checkRestrictionZoneBounds)),
            t._saveDocumentScrollPosition(),
            t._removeDocumentBodyScrolling(),
            t.view.maximize(),
            t.get_restrictionZoneID() ||
              $(t.get_popupElement()).css({ left: 0, top: 0 }),
            this.isActive() || this.setActive(!0));
        },
        _saveDocumentScrollPosition: function () {
          var t = $(document),
            e = document.body;
          this._restoreOptions = {
            documentScrollLeft: t.scrollLeft(),
            documentScrollTop: t.scrollTop(),
            bodyScrollLeft: e.scrollLeft,
            bodyScrollTop: e.scrollTop,
          };
        },
        _removeDocumentBodyScrolling: function () {
          var t = document.body;
          (t.scrollLeft = 0), (t.scrollTop = 0);
        },
        setActive: function (t) {
          this.isCreated() && this.view && this.view.setActive(t),
            t &&
              (this._getWindowController().set_activeWindow(this),
              this.raiseEvent("activate", new Sys.EventArgs()));
        },
        togglePin: function () {
          if (
            (this._clearTouchEventIdentifier(), this.isCreated()) &&
            this.onCommand("Pin")
          ) {
            this.setActive(!0);
            var t = this.isPinned(),
              e = t
                ? this._getLocalizationString("PinOn")
                : this._getLocalizationString("PinOff");
            this.view.toggleCommand("Pin"),
              this._registerTitlebarHandlersButton("Pin", e, this.togglePin),
              $T.RadWindowUtils.setPinned(!t, this);
          }
        },
        reload: function () {
          if (
            (this._clearTouchEventIdentifier(), this.isCreated()) &&
            this.onCommand("Reload") &&
            this._iframe
          ) {
            this._onWindowUrlChanging();
            try {
              this._iframe.contentWindow.location.reload(),
                ($telerik.isChrome || $telerik.isSafari) &&
                  this._iframe.contentWindow.document.domain !=
                    document.domain &&
                  this._onWindowUrlChanged();
            } catch (t) {
              this._onWindowUrlChanged();
            }
          }
        },
        fire: function (t) {
          if (t && "function" == typeof this[t]) this[t]();
          else {
            var e = this.get_windowManager();
            if (!e) return;
            t && "function" == typeof e[t] && e[t]();
          }
        },
        _normalizeWindowRootCss: function () {
          var t = this._popupElement;
          if (t) {
            $telerik.removeCssClasses(t, [
              "rwMinimizedWindow",
              "rwMaximizedWindow",
              "rwMinimizedWindowShadow",
            ]),
              Sys.UI.DomElement.addCssClass(t, "rwNormalWindow");
            var e = t._hideWindowedElementsIFrame;
            e &&
              Sys.UI.DomElement.removeCssClass(e, "rwMinimizedWindowOverlay");
          }
          this._updateTitleWidth();
        },
        close: function (t) {
          if (!this.isClosed()) {
            var e = new Sys.CancelEventArgs(),
              i = void 0 === t || this._isDomEventObject(t) ? null : t;
            if (
              ((e._argument = i),
              (e.get_argument = function () {
                return this._argument;
              }),
              this.raiseEvent("beforeClose", e),
              !e.get_cancel())
            ) {
              (this._isClosing = !0), this.hide();
              var n = new Sys.EventArgs();
              (n._argument = i),
                (n.get_argument = function () {
                  return this._argument;
                }),
                this.raiseEvent("close", n),
                this._enablePageScrolling(!0),
                this._normalizeWindowRootCss(),
                this._isDomEventObject(t) && (t = null),
                this._invokeDialogCallBackFunction(t),
                this.get_destroyOnClose() && !this._dockMode && this.dispose();
            }
          }
        },
        _invokeDialogCallBackFunction: function (oArg) {
          var callback = this.get_clientCallBackFunction();
          callback &&
            ("string" == typeof callback && (callback = eval(callback)),
            "function" == typeof callback && callback(this, oArg));
        },
        _isDomEventObject: function (t) {
          return t instanceof Sys.UI.DomEvent || t instanceof $.Event;
        },
        onCommand: function (t) {
          var e = new Sys.CancelEventArgs();
          return (
            (e._commandName = t),
            (e.get_commandName = function () {
              return this._commandName;
            }),
            this.raise_command(e),
            !e.get_cancel()
          );
        },
        setUrl: function (t) {
          if (!this._dockMode) {
            this._createUI(), this.set_navigateUrl(t);
            var e = t;
            this.get_reloadOnShow() && (e = this._getReloadOnShowUrl(e)),
              this.view.setUrl(e),
              this._loaded || this._registerIframeLoadHandler(!0),
              (this._loaded = !0);
          }
        },
        _registerChildPageHandlers: function (t) {
          var e = null;
          try {
            if (
              (e = this._iframe.contentWindow.document).domain !=
              document.domain
            )
              return;
          } catch (t) {
            return;
          }
          null != e &&
            (t
              ? ((this._onChildPageUnloadDelegate = Function.createDelegate(
                  this,
                  this._onChildPageUnload,
                )),
                (this._iframe.contentWindow.onunload =
                  this._onChildPageUnloadDelegate),
                (this._onChildPageClickDelegate = Function.createDelegate(
                  this,
                  this._onChildPageClick,
                )),
                $telerik.addExternalHandler(
                  e,
                  "click",
                  this._onChildPageClickDelegate,
                ))
              : this._onChildPageClickDelegate &&
                ($telerik.removeExternalHandler(
                  e,
                  "click",
                  this._onChildPageClickDelegate,
                ),
                (this._onChildPageClickDelegate = null)));
        },
        _onChildPageUnload: function (t) {
          if (
            (this._registerChildPageHandlers(!1),
            this._removeFromDOM && !$telerik.isChrome && !$telerik.isSafari)
          ) {
            this._removeFromDOM = !1;
            var e = this._popupElement;
            e && e.parentNode && e.parentNode.removeChild(e);
          }
        },
        _onChildPageClick: function (t) {
          if (this.isVisible() && !this.isClosed()) {
            var e = t.target ? t.target : t.srcElement;
            if (e) {
              if ("INPUT" == e.tagName && "button" == e.type) return;
              if ("BUTTON" == e.tagName || "A" == e.tagName) return;
            }
            this.setActive(!0);
          }
        },
        _onIframeLoad: function () {
          if (
            (this._onWindowUrlChanged(),
            $telerik.isFirefox && this.setOverflowVisible(!0),
            this._registerChildPageHandlers(!0),
            this.raiseEvent("pageLoad", new Sys.EventArgs()),
            this.get_autoSize())
          ) {
            var t = this.get_animation() != $T.WindowAnimation.None;
            this.autoSize(t);
          }
          try {
            this._iframe.contentWindow.close = Function.createDelegate(
              this,
              function () {
                this.close();
              },
            );
          } catch (t) {
            return !1;
          }
        },
        _onWindowUrlChanging: function () {
          this.isCreated() && this.view.onUrlChanging();
        },
        _onWindowUrlChanged: function () {
          this.isCreated() && this.view.onUrlChanged();
        },
        _updatePopupZindex: function () {
          this._popupBehavior && this.isVisible() && this._popupBehavior.show();
        },
        _updateOpacity: function () {
          var t = this._dockMode
            ? this.get_contentElement()
            : this.get_contentFrame();
          if (t)
            if (this._opacity < 100) {
              this._contentCell &&
                (this._contentCell.style.background = "none transparent");
              var e = t.style;
              (e.filter = "alpha(opacity=" + this._opacity + ")"),
                (e.opacity = this._opacity / 100);
            } else
              this._contentCell && (this._contentCell.style.background = ""),
                $telerik.isIE
                  ? (this._contentCell &&
                      this._contentCell.removeAttribute("style"),
                    t.style.removeAttribute("filter"),
                    t.style.removeAttribute("opacity"))
                  : ((t.style.filter = ""), (t.style.opacity = ""));
        },
        get_zindex: function () {
          return this.ui ? this.ui.get_zIndexCss() : -1;
        },
        get_browserWindow: function () {
          return this._browserWindow;
        },
        get_contentFrame: function () {
          return this._iframe;
        },
        get_offsetElementID: function () {
          return this._offsetElementID;
        },
        set_offsetElementID: function (t) {
          this._offsetElementID != t &&
            ((this._offsetElementID = t),
            (this._offsetElement = $get(t)),
            this._deleteStoredBounds(),
            (this._offsetSet = !1)),
            this.isVisible() && this._show();
        },
        get_openerElementID: function () {
          return this._openerElementID;
        },
        set_openerElementID: function (t) {
          this._openerElementID != t &&
            (this._openerElement &&
              (this._registerOpenerElementHandler(this._openerElement, !1),
              (this._openerElement = null)),
            (this._openerElementID = t),
            this._openerElementID &&
              (this._openerElement = $get(this._openerElementID)),
            this._openerElement &&
              this._registerOpenerElementHandler(this._openerElement, !0));
        },
        get_left: function () {
          return this._left;
        },
        set_left: function (t) {
          if (this._left != t) {
            var e = parseInt(t, 10);
            (this._left = e || 0 == e ? e : null),
              (this._positionX = this._left);
          }
        },
        get_top: function () {
          return this._top;
        },
        set_top: function (t) {
          if (this._top != t) {
            var e = parseInt(t, 10);
            (this._top = e || 0 == e ? e : null), (this._positionY = this._top);
          }
        },
        get_stylezindex: function () {
          if (this.ui) return this.ui.get_initialZIndexCss();
        },
        get_title: function () {
          return this._title;
        },
        set_title: function (t) {
          this._title != t && (this._title = t),
            this.isCreated() && this.view.setTitleText(this._title);
        },
        get_tabIndex: function () {
          return this._tabIndex;
        },
        set_tabIndex: function (t) {
          (this._tabIndex = t),
            this.isCreated() && this.view.setTabIndex(this._tabIndex);
        },
        get_width: function () {
          return parseInt(this._width, 10);
        },
        _fixSizeValue: function (t) {
          return (
            -1 == (t = "" + t).indexOf("px") &&
              ((t = parseInt(t, 10)), isNaN(t) ? (t = "") : (t += "px")),
            t
          );
        },
        set_width: function (t) {
          if (null == t) return !1;
          if (this.isMaximized()) return !1;
          var e = this.get_minWidth();
          e && e > t && (t = e);
          var i = parseInt(this.get_maxWidth(), 10);
          if (
            (i && i < t && i >= e && (t = i),
            (t = this._fixSizeValue(t)),
            this.isCreated())
          ) {
            var n = this.ui.getBounds(),
              s = parseInt(t, 10);
            if (
              (isNaN(s) && (s = n.width),
              !this._checkRestrictionZoneBounds(
                null,
                new Telerik.Web.UI.Bounds(n.x, n.y, s, n.height),
              ))
            )
              return !1;
          }
          return (
            this._width != t && (this._width = t),
            this._dockMode && this.setWidthDockMode(this.get_width()),
            this.isCreated() &&
              (this.popupElementIsOutOfView() || this._deleteStoredBounds(),
              this.view.setWidth(this._width)),
            this._updateTitleWidth(),
            !0
          );
        },
        popupElementIsOutOfView: function () {
          return !!this.view && this.view.isOutOfSight();
        },
        get_minWidth: function () {
          var t = parseInt(this._minWidth, 10);
          if (!this.isCreated()) return t;
          var e = this.get_defaultMinWidth();
          return t && t > e ? t : e;
        },
        set_minWidth: function (t) {
          this._minWidth != t && (this._minWidth = t);
        },
        get_minHeight: function () {
          var t = parseInt(this._minHeight, 10);
          if (!this.isCreated()) return t;
          var e = this.get_defaultMinHeight();
          return t && t > e ? t : e;
        },
        set_minHeight: function (t) {
          this._minHeight != t && (this._minHeight = t);
        },
        get_height: function () {
          return parseInt(this._height, 10);
        },
        set_height: function (t) {
          var e;
          if (null == t) return !1;
          if (this.isMaximized()) return !1;
          var i = this.get_minHeight();
          if (
            (i && i > t && (!e || (e && e >= i)) && (t = i),
            (e = parseInt(this.get_maxHeight(), 10)) && e < t && (t = e),
            (t = this._fixSizeValue(t)),
            this.isCreated())
          ) {
            this._firstShow = !1;
            var n = this.get_contentElement();
            this._dockMode && n && (n.style.height = "");
            var s = this.ui.getBounds();
            if (
              !this._checkRestrictionZoneBounds(
                null,
                new Telerik.Web.UI.Bounds(s.x, s.y, s.width, parseInt(t, 10)),
              )
            )
              return !1;
          }
          return (
            this._height != t && (this._height = t),
            this._dockMode && this.setHeightDockMode(this.get_height()),
            this.isCreated() &&
              (this.popupElementIsOutOfView() || this._deleteStoredBounds(),
              this.view.setHeight(this._height),
              this.view.updatePopupZindex()),
            !0
          );
        },
        _updateWindowSize: function (t, e) {
          this.view && this.view.setHeight(t, e);
        },
        get_behaviors: function () {
          return this._behaviors;
        },
        set_behaviors: function (t) {
          if (
            (this._behaviors != t && (this._behaviors = t),
            null != this._titlebarElement)
          ) {
            this._enableMoveResize(!1), this._enableMoveResize(!0);
            for (
              var e = $T.WindowBehaviors,
                i = [
                  [
                    this.isBehaviorEnabled(e.Pin),
                    "rwPinButton",
                    this._getLocalizationString("PinOn"),
                    Function.createDelegate(this, this.togglePin),
                  ],
                  [
                    this.isBehaviorEnabled(e.Reload),
                    "rwReloadButton",
                    this._getLocalizationString("Reload"),
                    Function.createDelegate(this, this.reload),
                  ],
                  [
                    this.isBehaviorEnabled(e.Minimize),
                    "rwMinimizeButton",
                    this._getLocalizationString("Minimize"),
                    Function.createDelegate(this, this._minimize),
                  ],
                  [
                    this.isBehaviorEnabled(e.Maximize),
                    "rwMaximizeButton",
                    this._getLocalizationString("Maximize"),
                    Function.createDelegate(this, this.maximize),
                  ],
                  [
                    this.isBehaviorEnabled(e.Close),
                    "rwCloseButton",
                    this._getLocalizationString("Close"),
                    Function.createDelegate(this, this.close),
                  ],
                ],
                n = [],
                s = 0;
              s < i.length;
              s++
            ) {
              var o = i[s];
              o[0] && n.push(o.splice(1, 3));
            }
            this.view && (this._buttonsArray = this.view.setCommandButtons(n));
          }
        },
        addShortcut: function (t, e) {
          this._shortCutManager
            ? this._shortCutManager.addShortCut(t.toLowerCase(), e)
            : (this.get_shortcuts() ||
                (this._shortcuts =
                  "[['" + t.toLowerCase() + "', '" + e + "']]"),
              this._registerGlobalBodyEventHandlers(!0));
        },
        removeShortcut: function (t) {
          this._shortCutManager &&
            this._shortCutManager.removeShortCut(t.toLowerCase());
        },
        getShortcutString: function (t) {
          if (!this._shortCutManager) return null;
          var e = this._shortCutManager.findShortCutByName(t.toLowerCase());
          return e && e.get_shortCutString() ? e.get_shortCutString() : null;
        },
        isShortcutAdded: function (t) {
          return !!this.getShortcutString(t.toLowerCase());
        },
        removeAllShortcutsCommand: function (t) {
          for (; this.isShortcutAdded(t); )
            this.removeShortcut(t.toLowerCase());
        },
        get_modal: function () {
          return this._modal;
        },
        set_modal: function (t) {
          (this._modal = t),
            this._makeModal(this._modal),
            this.isVisible() && this._modal && this._onModalShowHandler(this);
        },
        get_visibleTitlebar: function () {
          return this._visibleTitlebar;
        },
        set_visibleTitlebar: function (t) {
          var e = this._visibleTitlebar != t;
          e && (this._visibleTitlebar = t);
          var i = this.get_popupElement();
          i &&
            (t
              ? Sys.UI.DomElement.removeCssClass(i, "rwNoTitleBar")
              : Sys.UI.DomElement.addCssClass(i, "rwNoTitleBar")),
            this.ui &&
              this.ui.titlebar &&
              ((this.ui.titlebar.style.display = t ? "" : "none"),
              this.get_enableAriaSupport() &&
                this.ui.titlebar.setAttribute("aria-hidden", !t),
              e && this.set_height(this.get_height()));
        },
        get_visibleStatusbar: function () {
          return this._visibleStatusbar;
        },
        set_visibleStatusbar: function (t) {
          this._visibleStatusbar != t && (this._visibleStatusbar = t),
            this.view &&
              (t ? this.view.showStatusbar() : this.view.hideStatusbar());
        },
        get_overlay: function () {
          return this._overlay;
        },
        set_overlay: function (t) {
          (this._overlay = t),
            this._popupBehavior &&
              this._popupBehavior.set_overlay(this._overlay),
            this.isVisible() && this._reSetWindowPosition();
        },
        get_opacity: function () {
          return this._opacity;
        },
        set_opacity: function (t) {
          this.get_opacity() != t &&
            ((this._opacity = t > 100 ? 100 : t),
            (this._opacity = t < 0 ? 0 : t),
            this.isCreated() && this._updateOpacity());
        },
        get_iconUrl: function () {
          return this._iconUrl;
        },
        set_iconUrl: function (t) {
          (this._iconUrl = t),
            this._titleIconElement &&
              (this.get_iconUrl() && "" != this.get_iconUrl()
                ? ((this._titleIconElement.className = "rwIcon rwCustomIcon"),
                  (this._titleIconElement.style.background =
                    "transparent url('" + t + "') no-repeat scroll 0px 0px"))
                : ((this._titleIconElement.className = "rwIcon"),
                  (this._titleIconElement.style.background = "")));
        },
        get_renderMode: function () {
          return this._renderMode;
        },
        set_renderMode: function (t) {
          this._renderMode = t;
        },
        get_restrictionZoneID: function () {
          return this._restrictionZoneID;
        },
        set_restrictionZoneID: function (t) {
          (this._restrictionZoneID = t),
            t && this.isCreated() && this.fitInRestrictionZone();
        },
        fitInRestrictionZone: function () {
          var t = this._getCurrentBounds(),
            e = this._getRestrictionZoneElement(),
            i = this._getRestrictionZoneBounds(),
            n = $telerik.getBorderBox(e),
            s = {
              x: i.x + n.left,
              y: i.y + n.top,
              width: i.width - n.horizontal,
              height: i.height - n.vertical,
            },
            o = { width: 0, height: 0 };
          t.x < n.left && (t.x = n.left),
            t.y < n.top && (t.y = n.top),
            t.x + t.width > s.width &&
              ((t.x = s.width - t.width + n.left),
              t.x < n.left && ((t.x = n.left), (o.width = s.width))),
            t.y + t.height > s.height &&
              ((t.y = s.height - t.height + n.top),
              t.y < n.top && ((t.y = n.top), (o.height = s.height))),
            (o.width || o.height) &&
              this.setSize(o.width || t.width, o.height || t.height),
            this.moveTo(t.x, t.y);
        },
        get_keepInScreenBounds: function () {
          return this._keepInScreenBounds;
        },
        set_keepInScreenBounds: function (t) {
          (this._keepInScreenBounds = t),
            this._popupBehavior &&
              this._popupBehavior.set_keepInScreenBounds(
                this._keepInScreenBounds,
              ),
            this.isVisible() && this._reSetWindowPosition();
        },
        get_popupElement: function () {
          return this._popupElement;
        },
        set_status: function (t) {
          var e = this._getStatusMessageElement();
          e &&
            window.setTimeout(function () {
              e.value = t;
            }, 0);
        },
        get_status: function () {
          var t = this._getStatusMessageElement();
          if (t) return t.value;
        },
        raise_command: function (t) {
          this.raiseEvent("command", t);
        },
        add_resize: function (t) {
          this.get_events().addHandler("resizeEnd", t);
        },
        remove_resize: function (t) {
          this.get_events().removeHandler("resizeEnd", t);
        },
        saveClientState: function () {
          for (var t = ["position"], e = {}, i = 0; i < t.length; i++)
            e[t[i]] = this["get_" + t[i]]();
          return Sys.Serialization.JavaScriptSerializer.serialize(e);
        },
        _applyAriaSupport: function () {
          this._applyAriaForLayoutTables(), this._applyAriaSettings();
          var t = this.get_popupElement();
          t.setAttribute("aria-hidden", "true"),
            t.getAttribute("aria-labelledby") ||
              t.getAttribute("aria-label") ||
              t.setAttribute("aria-labelledby", this._getTitleElement().id),
            this._isPredefined
              ? (t.setAttribute("role", "alertdialog"),
                t.getAttribute("aria-describedby") ||
                  t.setAttribute(
                    "aria-describedby",
                    this.get_id() + "_message",
                  ))
              : t.setAttribute("role", "dialog");
        },
        _applyAriaForLayoutTables: function () {
          var t = this._tableElement;
          if (t) {
            t.setAttribute("role", "presentation");
            for (
              var e = t.getElementsByTagName("tr"), i = 0;
              i < e.length;
              i++
            ) {
              var n = e[i];
              n.setAttribute("role", "presentation");
              for (
                var s = n.getElementsByTagName("td"), o = 0;
                o < s.length;
                o++
              )
                s[o].setAttribute("role", "presentation");
            }
          }
          var r = this.ui.titlebar;
          r && r.setAttribute("role", "presentation");
          var a = this._statusCell;
          if (a) {
            var h = a.getElementsByTagName("table")[0];
            h && h.setAttribute("role", "presentation");
          }
        },
        _applyAriaSettings: function () {
          var t = this;
          if (t._ariaSettings) {
            var e = $J.deserialize(t._ariaSettings);
            new $T.WaiAriaDecorator(t.get_popupElement(), e).setAttributes();
          }
        },
        _clearTouchEventIdentifier: function () {
          var t = this._resizeExtender;
          t && t._touchEventIdentifier && (t._touchEventIdentifier = null);
        },
      }),
      $.registerControlProperties($T.RadWindow, {
        animation: $T.WindowAnimation.None,
        animationDuration: 500,
        ariaSettings: null,
        autoSize: !1,
        autoSizeBehaviors: $T.WindowAutoSizeBehaviors.Default,
        centerIfModal: !0,
        clientCallBackFunction: null,
        cssClass: "",
        destroyOnClose: !1,
        enableAriaSupport: !1,
        enableShadow: !1,
        formID: null,
        initialBehaviors: $T.WindowBehaviors.None,
        localization: null,
        maxHeight: null,
        maxWidth: null,
        minimizeIconUrl: null,
        minimizeZoneID: null,
        name: null,
        navigateUrl: null,
        reloadOnShow: !1,
        shortcuts: null,
        showContentDuringLoad: !0,
        showOnTopWhenMaximized: !0,
        skin: "Deafult",
        windowManager: null,
        visibleOnPageLoad: !1,
      }),
      $.registerControlEvents($T.RadWindow, [
        "command",
        "dragStart",
        "dragEnd",
        "activate",
        "beforeShow",
        "show",
        "pageLoad",
        "close",
        "beforeClose",
        "resizeStart",
        "resizeEnd",
        "autoSizeEnd",
      ]),
      $T.RadWindow.registerClass("Telerik.Web.UI.RadWindow", $T.RadWebControl),
      ($T.RadWindowUtils._zIndex = 3e3),
      ($T.RadWindowUtils.get_newZindex = function (t) {
        return (
          (null == (t = parseInt(t, 10)) || isNaN(t)) && (t = 0),
          $T.RadWindowUtils._zIndex < t && ($T.RadWindowUtils._zIndex = t),
          $T.RadWindowUtils._zIndex++,
          $T.RadWindowUtils._zIndex
        );
      }),
      ($T.RadWindowUtils._pinnedList = {}),
      ($T.RadWindowUtils.setPinned = function (t, e) {
        if (t) {
          var i = e._getViewportBounds(),
            n = e._getCurrentBounds();
          (e.LeftOffset = n.x - i.scrollLeft),
            (e.TopOffset = n.y - i.scrollTop);
          var s = window.setInterval(function () {
            $T.RadWindowUtils._updatePinnedElementPosition(e);
          }, 100);
          $T.RadWindowUtils._pinnedList[s] = e;
        } else {
          var o = null,
            r = $T.RadWindowUtils._pinnedList;
          for (var a in r)
            if (r[a] == e) {
              o = a;
              break;
            }
          null != o &&
            (window.clearInterval(o),
            ($T.RadWindowUtils._pinnedList[o] = null)),
            (e.TopOffset = null),
            (e.LeftOffset = null);
        }
      }),
      ($T.RadWindowUtils._updatePinnedElementPosition = function (t) {
        if (!t.isMaximized() && t.isVisible()) {
          var e = t._getViewportBounds(),
            i = t._getCurrentBounds(),
            n = null != t.LeftOffset ? t.LeftOffset + e.scrollLeft : i.x,
            s = null != t.TopOffset ? t.TopOffset + e.scrollTop : i.y;
          (i.x == n && i.y == s) || t.moveTo(n, s);
        }
      });
  })($telerik.$, Telerik.Web.UI),
  Type.registerNamespace("Telerik.Web.UI.Window"),
  (function (t, e, i) {
    (e.IRenderer = function () {}),
      (e.IRenderer.prototype = {
        createUI: function () {},
        setContent: function (t) {},
        get_container: function () {},
        getHandlesWidth: function () {},
        setShadowCssClass: function (t) {},
        getBounds: function () {},
        updateTitleWidth: function () {},
        getTitleNode: function () {},
        createTitle: function () {},
        getIconNode: function () {},
        createIcon: function () {},
        getTitleCommandsContainer: function () {},
        createTitleCommandsContainer: function () {},
        getStatusbar: function () {},
        createStatusbar: function () {},
        getStatusMessageNode: function () {},
        createStatusMessage: function () {},
        createStatusbarResizer: function () {},
        getCommandButtons: function () {},
        getCommandButton: function () {},
        createCommandButton: function (t) {},
        changeCommandButton: function (t, e, i) {},
        changeCommandButtonByName: function (t, e, i) {},
        clearCommandButtons: function () {},
        geTitlebarHeight: function () {},
        get_zIndexCss: function () {},
        get_initialZIndexCss: function () {},
        get_uiMinWidth: function () {},
        get_uiMinHeight: function () {},
        dispose: function () {},
      }),
      e.IRenderer.registerInterface("Telerik.Web.UI.Window.IRenderer"),
      (e.RendererBase = function (t) {
        this.window = t;
      }),
      (e.RendererBase.prototype = {}),
      e.RendererBase.registerClass(
        "Telerik.Web.UI.Window.RendererBase",
        null,
        e.IRenderer,
      );
  })($telerik.$, Telerik.Web.UI.Window),
  Type.registerNamespace("Telerik.Web.UI.Window"),
  (function (t, e, i) {
    (e.IView = function () {}),
      (e.IView.prototype = {
        moveTo: function (t, e) {},
        setContent: function (t) {},
        setUrl: function (t) {},
        show: function () {},
        hide: function () {},
        isVisible: function () {},
        maximize: function () {},
        minimize: function () {},
        setWidth: function (t) {},
        setHeight: function () {},
        setMaximizeSize: function () {},
        setContentFixedHeight: function () {},
        setContentWidth: function (t) {},
        setTitleText: function (t) {},
        showShadow: function () {},
        hideShadow: function () {},
        showStatusbar: function () {},
        hideStatusbar: function () {},
        moveOutOfSight: function () {},
        isOutOfSight: function () {},
        enableMoveResize: function (t) {},
        disableMoveResize: function (t) {},
        setCommandButtons: function (t) {},
        toggleCommand: function (t) {},
        minimizeToZone: function (t) {},
        moveToDefaultParent: function () {},
        revertToDefaultParent: function () {},
        setActive: function (t) {},
        isActive: function () {},
        onUrlChanging: function () {},
        onUrlChanged: function () {},
        updatePopupZindex: function () {},
        dispose: function () {},
      }),
      e.IView.registerInterface("Telerik.Web.UI.Window.IView"),
      (e.ViewBase = function (t) {
        this.window = t;
      }),
      (e.ViewBase.prototype = {}),
      e.ViewBase.registerClass("Telerik.Web.UI.Window.ViewBase", null, e.IView);
  })($telerik.$, Telerik.Web.UI.Window),
  (function (t, e, i) {
    Type.registerNamespace("Telerik.Web.UI.Window");
    var n = Telerik.Web.UI;
    function s() {
      var t = document.createElement("table");
      return (
        (t.align = "left"),
        (t.cellSpacing = 0),
        (t.cellPadding = 0),
        t.insertRow(-1),
        t
      );
    }
    function o(t, e) {
      var i = t.rows[0].insertCell(-1);
      (i.style.width = "100%"), i.appendChild(e);
      var n = document.createElement("label");
      n.setAttribute("for", e.id),
        (n.innerHTML = "status label"),
        (n.style.display = "none"),
        i.appendChild(n);
    }
    (e.ClassicRenderer = function (t) {
      e.ClassicRenderer.initializeBase(this, [t]),
        (this.container =
          this.table =
          this.titleCell =
          this.titlebar =
          this.topResizer =
          this.commandsContainer =
          this.title =
          this.icon =
          this.statusMessage =
          this.contentFrame =
          this.content =
          this.contentCell =
          this.bottomResizer =
          this.statusbar =
          this.statusCell =
            null);
    }),
      (e.ClassicRenderer.prototype = {
        createUI: function () {
          var e = this.window;
          if (!this.container) {
            var i = "RadWindowWrapper_" + e.get_id(),
              n = e._isWindowRightToLeft(),
              o = document.createElement("div");
            (o.id = i), (o.className = e._getFullSkinName());
            var r = e.get_cssClass();
            r && Sys.UI.DomElement.addCssClass(o, r),
              n && Sys.UI.DomElement.addCssClass(o, "RadWindow_rtl"),
              e._visibleTitlebar ||
                Sys.UI.DomElement.addCssClass(o, "rwNoTitleBar"),
              (o.style.width = e._width),
              (o.style.height = e._height),
              o.setAttribute("unselectable", "on"),
              this._setTabIndex(o),
              (this.container = e._popupElement = o);
            var a = document.createElement("table");
            (a.cellSpacing = 0),
              (a.cellPadding = 0),
              Sys.UI.DomElement.addCssClass(a, "rwTable"),
              (this.table = e._tableElement = a);
            var h = [];
            h = n
              ? [
                  "rwCorner rwTopRight",
                  "rwTitlebar",
                  "rwCorner rwTopLeft",
                  "rwCorner rwBodyRight",
                  "rwWindowContent",
                  "rwCorner rwBodyLeft",
                  "rwCorner rwBodyRight",
                  "rwStatusbar",
                  "rwCorner rwBodyLeft",
                  "rwCorner rwFooterRight",
                  "rwFooterCenter",
                  "rwCorner rwFooterLeft",
                ]
              : [
                  "rwCorner rwTopLeft",
                  "rwTitlebar",
                  "rwCorner rwTopRight",
                  "rwCorner rwBodyLeft",
                  "rwWindowContent",
                  "rwCorner rwBodyRight",
                  "rwCorner rwBodyLeft",
                  "rwStatusbar",
                  "rwCorner rwBodyRight",
                  "rwCorner rwFooterLeft",
                  "rwFooterCenter",
                  "rwCorner rwFooterRight",
                ];
            for (
              var l = [
                  "rwTitleRow",
                  "rwContentRow",
                  "rwStatusbarRow",
                  "rwFooterRow",
                ],
                d = 0,
                u = 0;
              u < 4;
              u++
            ) {
              var c = a.insertRow(-1);
              c.className = l[u];
              for (var _ = 1; _ <= 3; _++) {
                var g = c.insertCell(-1);
                (g.innerHTML = "&nbsp;"), (g.className = h[d]), d++;
              }
            }
            var m = a.rows[0].cells[1];
            (m.innerHTML = ""), (this.titleCell = e._titleCell = m);
            var w = document.createElement("div");
            (w.className = "rwTopResize"),
              (w.innerHTML = "\x3c!-- / --\x3e"),
              (this.topResizer = e._topResizer = w),
              this.titleCell.appendChild(e._topResizer);
            var f = s();
            (f.className = "rwTitlebarControls"),
              (this.titlebar = e._titlebarElement = f),
              this.titleCell.appendChild(this.titlebar);
            var p = this.getIconNode();
            this.titlebar.rows[0].insertCell(-1).appendChild(p),
              e.set_iconUrl(e.get_iconUrl());
            var v = this.getTitleNode();
            this.titlebar.rows[0].insertCell(-1).appendChild(v),
              e.set_title(e._title);
            var C = this.titlebar.rows[0].insertCell(-1);
            (C.noWrap = !0),
              (C.style.whiteSpace = "nowrap"),
              C.appendChild(e._getTitleCommandButtonsHolder());
            var b = a.rows[1].cells[1];
            (b.vAlign = "top"),
              (b.innerHTML = ""),
              (this.contentCell = e._contentCell = b),
              e._dockMode ||
                e._isPredefined ||
                Sys.UI.DomElement.addCssClass(
                  this.contentCell,
                  "rwExternalContent",
                ),
              e._enableShadow && !$telerik.isIE6 && e._setShadowCSSClass(!0);
            var y = e.get_name();
            if (
              (this.createStatusbar(n),
              this.container.appendChild(e._tableElement),
              (this.container.style.display = "none"),
              (this.container.style.position = "absolute"),
              e._addWindowToDocument(),
              e._registerTitlebarHandlers(!0),
              e.set_visibleTitlebar(e._visibleTitlebar),
              e.set_visibleStatusbar(e._visibleStatusbar),
              e.get_enableAriaSupport() && e._applyAriaSupport(),
              e._dockMode)
            ) {
              var S = (this.content = $get(e.get_id() + "_C"));
              S &&
                S.innerHTML &&
                ((S.style.display = ""),
                (S.style.overflow = "auto"),
                (S.style.border = "0px"),
                e.set_contentElement(S),
                e.setWidthDockMode(e.get_width()),
                e.setHeightDockMode(e.get_height()));
            } else {
              var E =
                $telerik.isIE && !$telerik.isIE9Mode
                  ? document.createElement("<iframe name='" + y + "'>")
                  : document.createElement("iframe");
              if (
                ((E.name = y),
                (E.src = "about:blank"),
                (E.style.width = "100%"),
                (E.style.height = "100%"),
                (E.style.border = "0px"),
                (E.frameBorder = "0"),
                $telerik.isIE8 && (E.style.display = "block"),
                (this.contentFrame = e._iframe = E),
                (!$telerik.isMobileSafari && !e._isiPhoneiPadAppleWebkit) ||
                  e._isPredefined)
              )
                this.contentCell.appendChild(e._iframe);
              else {
                var z = document.createElement("div");
                t(z).addClass("rwIframeWrapperIOS"),
                  z.appendChild(this.contentFrame),
                  this.contentCell.appendChild(z),
                  e._isiOS5Safari && e.setContentFixedHeight(e.get_height(), z),
                  (e._iframeWrapper = z);
              }
              e._createBackReference();
            }
            e._updateOpacity();
          }
          $telerik.isTouchDevice ||
            ((this.container.style.Transform = "none"),
            (this.container.style.BackfaceVisibility = "visible"),
            (this.container.style.webkitTransform = "none"),
            (this.container.style.webkitBackfaceVisibility = "visible"),
            (this.container.style.OTransform = "none"),
            (this.container.style.OBackfaceVisibility = "visible"),
            (this.container.style.MozTransform = "none"),
            (this.container.style.MozBackfaceVisibility = "visible"),
            (this.container.style.msTransform = "none"),
            (this.container.style.msBackfaceVisibility = "visible")),
            e._popupBehavior ||
              (e.set_behaviors(e._behaviors),
              (this.popupBehavior = e._popupBehavior =
                $create(
                  Telerik.Web.PopupBehavior,
                  {
                    id: new Date() - 100 + "PopupBehavior",
                    parentElement: null,
                    overlay: e._overlay,
                    keepInScreenBounds: e._keepInScreenBounds,
                  },
                  null,
                  null,
                  this.container,
                )));
        },
        setContent: function (t) {
          this.contentCell.appendChild(t),
            (t.style.display = ""),
            (this.content = this.window._contentElement = t);
        },
        get_container: function () {
          return this.container;
        },
        getHandlesWidth: function () {
          if (!this._handlesWidth) {
            var t = this.table;
            if (!t) return 0;
            var e = parseInt(
              $telerik.getCurrentStyle(t.rows[2].cells[0], "width"),
              10,
            );
            if (!e) return 0;
            this._handlesWidth = 2 * e;
          }
          return this._handlesWidth;
        },
        setShadowCssClass: function (t) {
          t
            ? (Sys.UI.DomElement.addCssClass(this.container, "rwShadow"),
              Sys.UI.DomElement.addCssClass(this.table, "rwShadow"))
            : (Sys.UI.DomElement.removeCssClass(this.container, "rwShadow"),
              Sys.UI.DomElement.removeCssClass(this.table, "rwShadow"));
        },
        getBounds: function () {
          var t = this.container,
            e = "none" == t.style.display;
          t.style.display = "";
          var i = $telerik.getBounds(t);
          return e && (t.style.display = "none"), i;
        },
        updateTitleWidth: function () {
          if (this.window._visibleTitlebar && !this.window.isMinimized()) {
            var t = this.getTitleNode();
            if (!t) return;
            t.style.width = "1px";
            var e = 0,
              i = this.getTitleCommandsContainer(),
              n = i.offsetWidth;
            if (n > 0) {
              var s = i.getElementsByTagName("LI");
              0 == s.length
                ? (n = 0)
                : s[0] &&
                  s[0].offsetWidth > 0 &&
                  (n = s.length * s[0].offsetWidth),
                (i.style.width = n ? n + "px" : ""),
                (e += n);
            }
            var o = this.getIconNode(),
              r = o.offsetWidth;
            r > 0 &&
              "TD" == o.parentNode.tagName &&
              ((o.parentNode.style.width = r + "px"), (e += r)),
              (e += this.getHandlesWidth());
            var a,
              h = this.titlebar;
            (a = h ? h.offsetWidth - e : e) > 0 && (t.style.width = a + "px");
          }
        },
        getTitleNode: function () {
          return this.title || this.createTitle(), this.title;
        },
        createTitle: function () {
          var t = document.createElement("em");
          return (
            t.setAttribute("unselectable", "on"),
            this.window.get_enableAriaSupport() &&
              ((t.id = this.window.get_id() + "_title"),
              t.setAttribute("role", "label")),
            (this.title = this.window._titleElement = t),
            t
          );
        },
        getIconNode: function () {
          return this.icon || this.createIcon(), this.icon;
        },
        createIcon: function () {
          var t = document.createElement("a");
          (t.className = "rwIcon"),
            $addHandler(t, "mousedown", this.window._cancelEvent),
            (this.icon = this.window._titleIconElement = t);
        },
        getTitleCommandsContainer: function () {
          return (
            this.commandsContainer || this.createTitleCommandsContainer(),
            this.commandsContainer
          );
        },
        createTitleCommandsContainer: function () {
          var t = document.createElement("ul");
          (t.className = "rwControlButtons"),
            this.window.get_enableAriaSupport() &&
              t.setAttribute("role", "toolbar"),
            (this.commandsContainer = this.window._buttonsElement = t);
        },
        getStatusMessageNode: function () {
          return (
            this.statusMessage || this.createStatusMessage(), this.statusMessage
          );
        },
        createStatusMessage: function () {
          var t = document.createElement("input");
          (t.id = this.window.get_id() + "_status"),
            (t.readOnly = "readonly"),
            t.setAttribute("unselectable", "on"),
            t.setAttribute("tabindex", "-1"),
            (this.statusMessage = this.window._statusMessageElement = t);
        },
        getStatusbar: function () {
          return this.statusCell || this.createStatusbar;
        },
        createStatusbar: function (t) {
          var e = this.table,
            i = s();
          (i.style.width = "100%"),
            (this.statusCell = this.window._statusCell = e.rows[2].cells[1]),
            (this.statusbar = this.statusCell.parentNode),
            (this.statusCell.innerHTML = ""),
            this.statusCell.appendChild(i),
            t || o(i, this.getStatusMessageNode()),
            this.window.isBehaviorEnabled(n.WindowBehaviors.Resize) &&
              this.createStatusbarResizer(i),
            t && o(i, this.getStatusMessageNode());
        },
        createStatusbarResizer: function () {
          if (!this.bottomResizer) {
            var t = this.statusCell.firstChild.rows[0].insertCell(-1);
            t.style.width = "15px";
            var e = document.createElement("div");
            t.appendChild(e),
              (this.bottomResizer = this.window._bottomResizer = e);
          }
        },
        getCommandButtons: function () {
          return t(this.commandsContainer).find("a[class$='Button']");
        },
        getCommandButton: function (e) {
          if (!e || !this.commandsContainer) return null;
          var i = e.toLowerCase();
          return (
            (i = i.charAt(0).toUpperCase() + i.substring(1)),
            t("." + (e = "rw" + i + "Button"), this.commandsContainer)[0]
          );
        },
        createCommandButton: function (t) {
          var e = document.createElement("li"),
            i = document.createElement("a");
          (i.href = "javascript:void(0);"),
            (i.className = t[0]),
            i.setAttribute("title", t[1]),
            this.window.get_enableAriaSupport() &&
              (e.setAttribute("role", "presentation"),
              i.setAttribute("role", "button")),
            this._setTabIndex(i),
            this.attachButtonEvents(i, t[2]);
          var n = document.createElement("span");
          return (
            (n.innerHTML = t[1]),
            i.appendChild(n),
            e.appendChild(i),
            this.commandsContainer.appendChild(e),
            i
          );
        },
        changeCommandButton: function (t, e, i) {
          t &&
            (t.setAttribute("title", e),
            (t.innerHTML = e),
            this.clearCommandButton(t),
            this.attachButtonEvents(t, i));
        },
        changeCommandButtonByName: function (t, e, i) {
          var n = this.getCommandButton(t);
          n && this.changeCommandButton(n, e, i);
        },
        clearCommandButtons: function () {
          for (
            var e = t(this.commandsContainer),
              i = this.getCommandButtons(),
              n = 0;
            n < i.length;
            n++
          )
            this.clearCommandButton(i[n]);
          e.empty();
        },
        attachButtonEvents: function (t, e) {
          $addHandlers(
            t,
            {
              dblclick: this._cancelEvent,
              mousedown: this._cancelEvent,
              keypress: this._keyPressHandler(e),
            },
            this,
          ),
            $telerik.addHandler(t, "click", e),
            $telerik.addHandler(t, "click", this._cancelEvent);
        },
        clearCommandButton: function (t) {
          $clearHandlers(t);
        },
        getTitlebarHeight: function () {
          return this.table ? this.table.rows[0].offsetHeight : 0;
        },
        get_zIndexCss: function () {
          return this.container ? this.container.style.zIndex : -1;
        },
        get_initialZIndexCss: function () {
          var t = this.window.get_element();
          return t
            ? parseInt(
                t.style.zIndex || $telerik.getComputedStyle(t, "zIndex"),
                10,
              )
            : null;
        },
        get_uiMinWidth: function () {
          return (
            this._defaultMinWidth ||
              ((this._defaultMinWidth = this.getHandlesWidth()),
              this.window._visibleTitlebar &&
                (this._defaultMinWidth += this._getTitleBarMinWidth())),
            this._defaultMinWidth
          );
        },
        _getTitleBarMinWidth: function () {
          var t,
            e = this.table,
            i = this.title,
            n = i.style.width,
            s = this.titleCell,
            o = this.content;
          return (
            i && (i.style.width = "1px"),
            o && (o.style.width = "1px"),
            (e.style.width = "1px"),
            (t = s.offsetWidth + s.offsetLeft),
            (i.style.width = n),
            (e.style.width = ""),
            o && (o.style.width = ""),
            t
          );
        },
        get_uiMinHeight: function () {
          if (!this._defaultMinHeight) {
            var t = Math.ceil(this.getHandlesWidth() / 2);
            (this._defaultMinHeight = t),
              (this._defaultMinHeight += this.window._visibleTitlebar
                ? this.titleCell.offsetHeight
                : t),
              (this._defaultMinHeight += this.window._visibleStatusbar
                ? this.statusCell.offsetHeight
                : 0);
          }
          return this._defaultMinHeight;
        },
        dispose: function () {
          this.container =
            this.table =
            this.titleCell =
            this.titlebar =
            this.topResizer =
            this.commandsContainer =
            this.title =
            this.icon =
            this.statusMessage =
            this.contentFrame =
            this.content =
            this.contentCell =
            this.bottomResizer =
            this.statusbar =
            this.statusCell =
              null;
        },
        _keyPressHandler: function (t) {
          return function (e) {
            var i = e.target || e.srcElement;
            (function (t) {
              return t.charCode === r.space || t.charCode === r.enter;
            })(e) && t(e),
              $telerik.stopPropagation(e),
              i.focus();
          };
        },
        _setTabIndex: function (t) {
          var e = this.window.get_tabIndex();
          null !== e && t.setAttribute("tabIndex", e);
        },
        _cancelEvent: function (t) {
          return (
            this.window && this.window._clearTouchEventIdentifier(),
            $telerik.cancelRawEvent(t)
          );
        },
      }),
      e.ClassicRenderer.registerClass(
        "Telerik.Web.UI.Window.ClassicRenderer",
        e.RendererBase,
        e.IRenderer,
      );
    var r = Sys.UI.Key;
  })($telerik.$, Telerik.Web.UI.Window),
  Type.registerNamespace("Telerik.Web.UI.Window"),
  (function (t, e, i) {
    (e.ClassicView = function (t) {
      e.ClassicView.initializeBase(this, [t]), (this.ui = this.window.ui);
    }),
      (e.ClassicView.prototype = {
        moveTo: function (t, e) {
          this.ui.popupBehavior._setCoordinates(t, e),
            this.ui.popupBehavior.show(),
            this._removeExplicitMSAjaxWidth(),
            this.ui.updateTitleWidth();
        },
        show: function () {
          this.ui.popupBehavior && this.ui.popupBehavior.show(),
            (this._isViewVisible = !0);
        },
        hide: function () {
          this.ui.popupBehavior && this.ui.popupBehavior.hide(),
            (this._isViewVisible = !1),
            this._ariaHide();
        },
        isVisible: function () {
          return this._isViewVisible;
        },
        setContent: function (t) {
          var e = this.ui.content;
          e &&
            t != e &&
            ($telerik.disposeElement(e),
            (e.innerHTML = ""),
            e.appendChild(t),
            (t = e)),
            this.ui.createUI(),
            this.ui.contentFrame
              ? (this.ui.contentFrame.style.display = "none")
              : !this.window._dropDownTouchScroll &&
                Telerik.Web.UI.TouchScrollExtender._getNeedsScrollExtender() &&
                this.window._createTouchScrollExtender(!0),
            this.ui.setContent(t);
        },
        setUrl: function (t) {
          var e = this.ui.contentFrame;
          e && ((e.src = t), this.onUrlChanging());
        },
        maximize: function () {
          this.ui.setShadowCssClass(!1);
          var t = this.ui.container;
          $telerik.removeCssClasses(t, [
            "rwNormalWindow",
            "rwMinimizedWindow",
            "rwMinimizedWindowShadow",
          ]),
            Sys.UI.DomElement.addCssClass(t, "rwMaximizedWindow"),
            this.window._configureMaximizeButton(!0),
            this.window._configureMinimizeButton(),
            this.window._maintainMaximizedSize(),
            this.window._maintainMaximizedSize();
          var e = t._hideWindowedElementsIFrame;
          if (
            (e &&
              (Sys.UI.DomElement.removeCssClass(e, "rwMinimizedWindowOverlay"),
              this.ui.popupBehavior._handleElementResize()),
            this.window.get_showOnTopWhenMaximized())
          ) {
            var i = t.style.zIndex;
            i && (this.window._restoreZindex = i), (t.style.zIndex = 1e5);
          }
          this.ui.updateTitleWidth();
        },
        setMaximizeSize: function () {
          var t = this.ui.container;
          if (t) {
            var e = this.window._getViewportBounds();
            (t.style.top = e.scrollTop + e.y + "px"),
              (t.style.left = e.scrollLeft + e.x + "px");
            var i = parseInt(this.window.get_maxWidth(), 10),
              n = parseInt(this.window.get_maxHeight(), 10);
            i && (e.width = i),
              n && (e.height = n),
              $telerik.setSize(t, { width: e.width, height: e.height }),
              this.window._getRestrictionZoneBounds() ||
                this.window._enablePageScrolling(!1);
            var s = this.window._tableElement;
            e = $telerik.getContentSize(t);
            var o = $telerik.getBorderBox(s),
              r = $telerik.getPaddingBox(s),
              a = e.height - o.vertical - r.vertical;
            (s.style.height = a + "px"),
              this.window._fixIeHeight(s, a),
              this.window._dockMode &&
                (this.window.setWidthDockMode(e.width),
                this.window.setHeightDockMode(e.height)),
              this.ui.updateTitleWidth(),
              this.window._isiOS5Safari &&
                this.window.setContentFixedHeight(
                  e.height,
                  this.window._iframeWrapper,
                );
          }
        },
        minimize: function () {
          this.window._configureMinimizeButton(!0),
            this.window._configureMinimizeButton(!0),
            this.window._enablePageScrolling(!0);
          var t = this.ui.container;
          $telerik.removeCssClasses(t, ["rwNormalWindow", "rwMaximizedWindow"]),
            Sys.UI.DomElement.addCssClass(t, "rwMinimizedWindow"),
            this.window._enableShadow &&
              !$telerik.isIE6 &&
              (this.ui.setShadowCssClass(!0),
              Sys.UI.DomElement.addCssClass(t, "rwMinimizedWindowShadow"));
          var e = t._hideWindowedElementsIFrame;
          e && Sys.UI.DomElement.addCssClass(e, "rwMinimizedWindowOverlay"),
            (this.ui.getTitleNode().style.width = ""),
            this.minimizeToZone(this.window.get_minimizeZoneID());
        },
        setTabIndex: function (t) {
          var e = this.ui.container,
            i = this.ui.getCommandButtons();
          null != t
            ? (e.setAttribute("tabIndex", t), i.attr("tabIndex", t))
            : (e.removeAttribute("tabIndex"), i.removeAttr("tabIndex"));
        },
        setWidth: function (t) {
          var e = this.ui.container,
            i = parseInt(t, 10);
          (e.style.width = i - $telerik.getBorderBox(e).horizontal + "px"),
            this.updatePopupZindex();
        },
        setHeight: function (t, e) {
          var i = this.ui.container,
            n = this.ui.table,
            s = parseInt(t || n.style.height, 10);
          if ((1 == e && (s = n.offsetHeight), 0 != parseInt(s, 10))) {
            var o = $telerik.getBorderBox(i).vertical,
              r = (s = s > o ? s - o : s) + "px";
            (n.style.height = r),
              this._fixTableHeightInIE(n, s),
              (i.style.height = r);
          }
        },
        setContentFixedHeight: function (t, e) {
          if (e) {
            var i = this.ui,
              n = this._substractWrappersBorder(t),
              s = this.window.isVisible(),
              o = i.table.rows[3].cells[1],
              r = i.table.rows[0].cells[1],
              a = i.table.rows[2].cells[1];
            (n -= s
              ? parseInt($telerik.getBounds(o).height, 10)
              : parseInt($telerik.getCurrentStyle(o, "height"), 10)),
              this.window._visibleTitlebar
                ? ((n -= s
                    ? parseInt($telerik.getBounds(i.titlebar).height, 10)
                    : parseInt(
                        $telerik.getCurrentStyle(i.titlebar, "height"),
                        10,
                      )),
                  (n -= s
                    ? parseInt($telerik.getBounds(i.topResizer).height, 10)
                    : parseInt(
                        $telerik.getCurrentStyle(i.topResizer, "height"),
                        10,
                      )))
                : (n -= s
                    ? parseInt($telerik.getBounds(r).height, 10)
                    : parseInt($telerik.getCurrentStyle(r, "height"), 10)),
              this.window._visibleStatusbar &&
                (n -= s
                  ? parseInt($telerik.getBounds(a).height, 10)
                  : parseInt($telerik.getCurrentStyle(a, "height"), 10)),
              n > 0 && (e.style.height = n + "px");
          }
        },
        setContentWidth: function (t) {
          if (this.ui.content) {
            var e =
              this.window._substractWrappersBorder(t) -
              this.ui.getHandlesWidth();
            e > 0 && (this.ui.content.style.width = e + "px");
          }
        },
        setTitleText: function (t) {
          this.ui.title &&
            ((this.ui.title.innerHTML = t || "&nbsp;"),
            this.ui.updateTitleWidth());
        },
        showStatusbar: function () {
          this._displayStatusbar("", !0);
        },
        hideStatusbar: function () {
          this._displayStatusbar("none", !1);
        },
        _displayStatusbar: function (t, e) {
          var i = this.ui.statusbar;
          !(function (t, e) {
            t && (t.style.display = e);
          })(i, t),
            this._hasAriaSupport() &&
              (function (t, e) {
                t && t.setAttribute("aria-hidden", !e);
              })(i, e);
        },
        showShadow: function () {
          this.ui.setShadowCssClass(!0);
        },
        hideShadow: function () {
          this.ui.setShadowCssClass(!1);
        },
        moveOutOfSight: function () {
          var e = this.ui.popupBehavior;
          if (e) {
            this.window._storeBounds();
            var i = e.get_elementToShow();
            t(i).css({
              display: "",
              position: "absolute",
              top: "-10000px",
              left: this.window.get_leftHidingPoint() + "px",
              overflow: "hidden",
            }),
              i._hideWindowedElementsIFrame &&
                i._hideWindowedElementsIFrame.style &&
                (i._hideWindowedElementsIFrame.style.display = "none");
          }
          this._ariaHide();
        },
        isOutOfSight: function () {
          var t = this.ui.container;
          if (!t) return !1;
          var e = parseInt(t.style.left, 10);
          return (
            $telerik.isIE &&
            ($telerik.isIE9 || $telerik.isIE10) &&
            e == this.window.get_leftHidingPoint()
          );
        },
        enableMoveResize: function (t) {
          if ((this.disableMoveResize(t), this.ui.container)) {
            var e = this.ui.table.rows,
              i = {},
              n = this.window._isWindowRightToLeft();
            t.resize &&
              (this.ui.createStatusbarResizer(),
              (this.ui.bottomResizer.style.display = ""),
              (i = n
                ? {
                    nw: e[0].cells[2],
                    n: this.ui.topResizer,
                    ne: e[0].cells[0],
                    w: [e[1].cells[2], e[2].cells[2]],
                    e: [e[1].cells[0], e[2].cells[0]],
                    sw: e[3].cells[2],
                    s: e[3].cells[1],
                    se: [e[3].cells[0], this.ui.bottomResizer],
                  }
                : {
                    nw: e[0].cells[0],
                    n: this.ui.topResizer,
                    ne: e[0].cells[2],
                    w: [e[1].cells[0], e[2].cells[0]],
                    e: [e[1].cells[2], e[2].cells[2]],
                    sw: e[3].cells[0],
                    s: e[3].cells[1],
                    se: [e[3].cells[2], this.ui.bottomResizer],
                  })),
              t.move && (i.move = this.ui.titleCell),
              (this.resizeExtender = this.window._resizeExtender =
                new Telerik.Web.UI.ResizeExtender(
                  this.window,
                  this.ui.container,
                  i,
                  this.ui.table,
                ));
            var s = this.window._dockMode ? null : this.ui.contentFrame;
            this.resizeExtender.set_iframeToSkip(s);
          }
        },
        disableMoveResize: function (t) {
          this.resizeExtender &&
            (this.resizeExtender.dispose(),
            (this.resizeExtender = this.window._resizeExtender = null)),
            t.Resize &&
              this.ui.bottomResizer &&
              (this.ui.bottomResizer.style.display = "none");
        },
        setCommandButtons: function (t) {
          var e = [];
          this.ui.clearCommandButtons();
          for (var i = 0; i < t.length; i++)
            e.push(this.ui.createCommandButton(t[i]));
          return this.ui.updateTitleWidth(), e;
        },
        toggleCommand: function (t) {
          var e = this.ui.getCommandButton(t);
          e && Sys.UI.DomElement.toggleCssClass(e, "on");
        },
        minimizeToZone: function (t) {
          if (t) {
            "string" == typeof t && (t = $get(t));
            var e = this.ui.container;
            e.parentNode != t &&
              (e.parentNode.removeChild(e),
              t.appendChild(e),
              this.window.setVisible(!0),
              (e.style.position = "static"),
              $telerik.isIE
                ? (e.style.display = "inline")
                : (e.style.cssFloat = "left"));
          }
        },
        moveToDefaultParent: function () {
          var t = this.window._getDefaultParent();
          t.insertBefore(this.ui.container, t.firstChild);
        },
        revertToDefaultParent: function () {
          var t = this.ui.container;
          t.parentNode.removeChild(t),
            (t.style.position = "absolute"),
            $telerik.isIE ? (t.style.display = "") : (t.style.cssFloat = ""),
            this.moveToDefaultParent();
        },
        setActive: function (t) {
          var e = this.ui.container;
          t
            ? (this.window.setZIndexCss(),
              Sys.UI.DomElement.removeCssClass(e, "rwInactiveWindow"))
            : Sys.UI.DomElement.addCssClass(e, "rwInactiveWindow");
        },
        isActive: function () {
          var t = this.ui.container;
          return (
            t && !Sys.UI.DomElement.containsCssClass(t, "rwInactiveWindow")
          );
        },
        onUrlChanging: function () {
          if (this.ui.contentFrame)
            if (this.window.get_showContentDuringLoad()) {
              var t = this.ui.statusMessage;
              t && Sys.UI.DomElement.addCssClass(t, "rwLoading");
            } else {
              var e = this.ui.contentFrame,
                i = e.style;
              (i.position = "absolute"),
                (i.top = "-10000px"),
                $telerik.isIE9Mode && this.setHeight(this.window._height),
                this.window._isWindowRightToLeft() &&
                  $telerik.isChrome &&
                  (i.width = "1px");
              var n = e.parentNode;
              Sys.UI.DomElement.addCssClass(n, "rwLoading");
            }
        },
        onUrlChanged: function () {
          var t = this.ui.statusMessage,
            e = this.ui.contentFrame;
          if (this.window.get_showContentDuringLoad())
            t && Sys.UI.DomElement.removeCssClass(t, "rwLoading");
          else {
            (e.style.position = ""),
              this.window._isWindowRightToLeft() &&
                $telerik.isChrome &&
                (e.style.width = "100%");
            var i = e.parentNode;
            Sys.UI.DomElement.removeCssClass(i, "rwLoading"),
              $telerik.isIE9Mode &&
                (this.window.isMaximized()
                  ? this.window._maintainMaximizedSize()
                  : this.window.isMinimized() ||
                    this.setHeight(this.window.get_height()));
          }
          t && this.window.set_status(this.window.get_navigateUrl());
          try {
            var n = e.contentWindow.document.title;
            n &&
              n != this.window.get_title() &&
              this.window.set_title(
                n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;"),
              );
          } catch (t) {}
        },
        updatePopupZindex: function () {
          var t = this.ui.popupBehavior;
          t && this.window.isVisible() && t.show();
        },
        dispose: function () {},
        _substractWrappersBorder: function (t, e) {
          var i = this.ui.container,
            n = this.ui.contentCell;
          if (!i || !n) return t;
          var s = $telerik.getBorderBox(i),
            o = $telerik.getBorderBox(n);
          return (t -= e
            ? s.horizontal + o.hrizontal
            : s.vertical + o.vertical);
        },
        _fixTableHeightInIE: function (t, e) {
          if ("CSS1Compat" == document.compatMode) {
            var i = t.offsetHeight - parseInt(e, 10);
            if (i > 0) {
              var n = parseInt(t.style.height, 10) - i;
              n > 0 && (t.style.height = n + "px");
            }
          }
        },
        _removeExplicitMSAjaxWidth: function () {
          this.window.get_width() || (this.ui.container.style.width = "");
        },
        _ariaHide: function () {
          this.window.get_enableAriaSupport() &&
            this.ui.container &&
            !this.window.isVisible() &&
            this.ui.container.setAttribute("aria-hidden", "true");
        },
        _hasAriaSupport: function () {
          return this.window.get_enableAriaSupport();
        },
        restoreResizeHandlesCursor: function () {},
      }),
      e.ClassicView.registerClass(
        "Telerik.Web.UI.Window.ClassicView",
        e.ViewBase,
        e.IView,
      );
  })($telerik.$, Telerik.Web.UI.Window),
  (function (t, e, i) {
    Type.registerNamespace("Telerik.Web.UI.Window");
    var n = Telerik.Web.UI,
      s = function (t) {
        return t + ".rwCommand";
      },
      o = n.EventType,
      r = s(o.Down),
      a = s(o.Up),
      h = s("dblclick"),
      l = $telerik.cancelRawEvent,
      d = $telerik.preventDefault;
    (e.LightweightRenderer = function (t) {
      e.LightweightRenderer.initializeBase(this, [t]),
        (this.options = { skin: this.window.get_skin(), minTitleWidth: 30 }),
        (this.container = null),
        (this.titlebar = null),
        (this.icon = null),
        (this.title = null),
        (this.commandsContainer = null),
        (this.content = null),
        (this.contentFrame = null),
        (this.statusbar = null),
        (this.statusMessage = null),
        (this.topResizer = null),
        (this.bottomResizer = null);
    }),
      (e.LightweightRenderer.prototype = {
        createUI: function () {
          if (!this.container) {
            var e = this.window,
              i = e._isWindowRightToLeft(),
              n = Sys.UI.DomElement.addCssClass,
              s = document.createElement("div");
            this._appendToDom(s),
              (this.container = e._popupElement = s),
              (s.id = "RadWindowWrapper_" + e.get_id()),
              (s.className = this._getSkinCssClass());
            var o = e.get_cssClass();
            o && n(s, o),
              i && n(s, "rwRtl"),
              e._visibleTitlebar || n(s, "rwNoTitleBar"),
              this.setShadowCssClass(e._enableShadow),
              s.setAttribute("unselectable", "on"),
              this._setTabIndex(s);
            var r = s.style;
            (r.width = e._width),
              (r.height = e._height),
              (r.position = "absolute");
            var a =
              (this.titlebar =
              e._titlebarElement =
                document.createElement("div"));
            (a.className = "rwTitleBar"), s.appendChild(a);
            var h = document.createElement("div");
            (h.className = "rwTitleWrapper"),
              a.appendChild(h),
              this._setRolePresentation(h),
              h.appendChild(this.getIconNode()),
              h.appendChild(this.getTitleNode()),
              e.set_title(e._title),
              h.appendChild(this.getTitleCommandsContainer()),
              e._registerTitlebarHandlers(!0),
              e.set_iconUrl(e.get_iconUrl());
            var l = (this.content =
              $get(e.get_id() + "_C") ||
              this.pendingContent ||
              document.createElement("div"));
            if (
              (this._setRolePresentation(l),
              l &&
                ((l.style.display = "none"),
                (l.className = "rwContent"),
                this.setContent(l)),
              !e._dockMode)
            ) {
              var d = l.getElementsByTagName("iframe"),
                u = e.get_name(),
                c =
                  d.length > 0
                    ? d[0]
                    : document.createElement(
                        $telerik.isIE && !$telerik.isIE9Mode
                          ? "<iframe name='" + u + "'>"
                          : "iframe",
                      );
              if (
                ((c.name = u),
                (c.title = u),
                (c.src = "about:blank"),
                (c.style.width = "100%"),
                (c.style.height = "100%"),
                (c.style.border = "0px"),
                (c.frameBorder = "0"),
                $telerik.isIE8 && (c.style.display = "block"),
                (this.contentFrame = e._iframe = c),
                (!$telerik.isMobileSafari && !e._isiPhoneiPadAppleWebkit) ||
                  e._isPredefined)
              )
                this.content.appendChild(this.contentFrame);
              else {
                var _ = document.createElement("div");
                t(_).addClass("rwIframeWrapperIOS"),
                  _.appendChild(this.contentFrame),
                  this.content.appendChild(_),
                  e._isiOS5Safari && e.setContentFixedHeight(e.get_height(), _),
                  (e._iframeWrapper = _);
              }
              Sys.UI.DomElement.addCssClass(this.content, "rwExternalContent"),
                e._createBackReference();
            }
            var g = this.createStatusbar();
            this.container.appendChild(g),
              e._visibleStatusbar || (g.style.display = "none"),
              e._addWindowToDocument(),
              $telerik.isTouchDevice ||
                ((this.container.style.Transform = "none"),
                (this.container.style.BackfaceVisibility = "visible"),
                (this.container.style.webkitTransform = "none"),
                (this.container.style.webkitBackfaceVisibility = "visible"),
                (this.container.style.OTransform = "none"),
                (this.container.style.OBackfaceVisibility = "visible"),
                (this.container.style.MozTransform = "none"),
                (this.container.style.MozBackfaceVisibility = "visible"),
                (this.container.style.msTransform = "none"),
                (this.container.style.msBackfaceVisibility = "visible")),
              e._popupBehavior ||
                (e.set_behaviors(e._behaviors),
                (this.popupBehavior = e._popupBehavior =
                  $create(
                    Telerik.Web.PopupBehavior,
                    {
                      id: new Date() - 100 + "PopupBehavior",
                      parentElement: null,
                      overlay: e._overlay,
                      keepInScreenBounds: e._keepInScreenBounds,
                    },
                    null,
                    null,
                    this.container,
                  ))),
              e.get_enableAriaSupport() && this.window._applyAriaSupport();
          }
        },
        _appendToDom: function (e) {
          var i = this.window,
            n = t(i.get_element()).closest("form");
          n.length > 0 ? n.prepend(e) : document.body.appendChild(e);
        },
        _getSkinCssClass: function () {
          return "RadWindow RadWindow_" + this.options.skin;
        },
        setContent: function (t) {
          this._setContent(t), (this.content = this.window._contentElement = t);
        },
        _setContent: function (t) {
          var e = this.container.children;
          1 == e.length
            ? this.container.appendChild(t)
            : this.container.insertBefore(t, e[1]),
            (t.style.display = "");
        },
        get_container: function () {
          return this.container;
        },
        getHandlesWidth: function () {
          var e = t(this.container).css(["paddingLeft", "paddingRight"]),
            i = parseFloat(e.paddingLeft, 10) + parseFloat(e.paddingRight, 10);
          return Math.max(i, 12);
        },
        setShadowCssClass: function (t) {
          (t
            ? Sys.UI.DomElement.addCssClass
            : Sys.UI.DomElement.removeCssClass)(this.container, "rwShadow");
        },
        getBounds: function () {
          var t = this.container,
            e = "none" == t.style.display;
          t.style.display = "";
          var i = $telerik.getBounds(t);
          return e && (t.style.display = "none"), i;
        },
        showContentOverlay: function () {
          var t = this.contentOverlay;
          this.contentOverlay || (t = this.createContentOverlay()),
            (t.style.display = "");
        },
        hideContentOverlay: function () {
          this.contentOverlay && (this.contentOverlay.style.display = "none");
        },
        createContentOverlay: function () {
          var t = this.content,
            e = (this.contentOverlay = document.createElement("div")),
            i = e.style;
          return (
            (i.position = "absolute"),
            (i.top = 0),
            (i.left = 0),
            (i.zIndex = "1"),
            (i.backgroundColor = "white"),
            (i.filter = "alpha(opacity=0)"),
            (i.opacity = 0),
            (i.width = "100%"),
            (i.height = "100%"),
            t.appendChild(e),
            e
          );
        },
        updateTitleWidth: function () {},
        getTitleNode: function () {
          return this.title || this.createTitle(), this.title;
        },
        createTitle: function () {
          var t = document.createElement("span");
          t.setAttribute("unselectable", "on"),
            (t.className = "rwTitle"),
            this.window.get_enableAriaSupport() &&
              (t.id = this.window.get_id() + "_title"),
            (this.title = this.window._titleElement = t);
        },
        getIconNode: function () {
          return this.icon || this.createIcon(), this.icon;
        },
        createIcon: function () {
          var t = document.createElement("span");
          (t.className = "rwIcon"),
            this._setRolePresentation(t),
            (this.icon = this.window._titleIconElement = t);
        },
        getTitleCommandsContainer: function () {
          return (
            this.commandsContainer || this.createTitleCommandsContainer(),
            this.commandsContainer
          );
        },
        createTitleCommandsContainer: function () {
          var t = document.createElement("ul");
          (t.className = "rwCommands"),
            this._setRole(t, "toolbar"),
            (this.commandsContainer = this.window._buttonsElement = t);
        },
        getStatusbar: function () {
          return this.statusbar || this.createStatusbar();
        },
        createStatusbar: function () {
          var t = (this.statusbar = document.createElement("div"));
          return (
            (t.className = "rwStatusBar"),
            this._setRole(t, "status"),
            t.appendChild(this.getStatusMessageNode()),
            this.window.isBehaviorEnabled(n.WindowBehaviors.Resize) &&
              t.appendChild(this.createStatusbarResizer()),
            t
          );
        },
        getStatusMessageNode: function () {
          return (
            this.statusMessage || this.createStatusMessage(), this.statusMessage
          );
        },
        createStatusMessage: function () {
          var t = document.createElement("input");
          (t.id = this.window.get_id() + "_status"),
            (t.readOnly = "readonly"),
            t.setAttribute("unselectable", "on"),
            t.setAttribute("tabindex", "-1"),
            (this.statusMessage = this._statusMessageElement = t),
            this.window.get_enableAriaSupport() &&
              t.setAttribute("aria-label", "status");
        },
        createStatusbarResizer: function () {
          if (!this.bottomResizer) {
            var t = document.createElement("span");
            return (
              (t.className = "rwResize"),
              this._setRolePresentation(t),
              (this.bottomResizer = t),
              t
            );
          }
        },
        removeStatusbarResizer: function () {
          var t = this.bottomResizer;
          t && (t.parentNode.removeChild(t), (this.bottomResizer = null));
        },
        getCommandButtons: function () {
          return t(this.commandsContainer).find(".rwCommandButton");
        },
        getCommandButton: function (e) {
          if (!e || !this.commandsContainer) return null;
          var i = e.toLowerCase(),
            n =
              ".rw" +
              (i = i.charAt(0).toUpperCase() + i.substring(1)) +
              "Button, .rw" +
              i;
          return t(this.commandsContainer).find(n)[0];
        },
        createCommandButton: function (t) {
          var e = document.createElement("li");
          e.className = "rwListItem";
          var i = document.createElement("span");
          return (
            (i.className = "rwCommandButton " + t[0]),
            (i.value = i.title = t[1]),
            this.attachButtonEvents(i, t[2]),
            e.appendChild(i),
            this.commandsContainer.appendChild(e),
            this._setRolePresentation(e),
            this._setRole(i, "button"),
            this._setTabIndex(i),
            this._initializeRipple(i),
            i
          );
        },
        _initializeRipple: function (t) {
          if (this.window._enableRippleEffect) {
            var e = n.MaterialRippleManager.getInstance();
            e &&
              e.initializeRipple(t, {
                rippleType: n.MaterialRippleType.Icon,
                autoHide: !0,
                iconRippleSizeFactor: 0.54,
              });
          }
        },
        changeCommandButton: function (t, e, i) {
          (t.value = t.title = e),
            this.clearCommandButton(t),
            this.attachButtonEvents(t, i);
        },
        attachButtonEvents: function (t, e) {
          $telerik.onEvent(t, r, l),
            $telerik.onEvent(t, a, d),
            $telerik.onEvent(t, a, this._upHandler(e)),
            $telerik.onEvent(t, h, l),
            $telerik.onEvent(t, "keypress", this._keyPressHandler(e));
        },
        changeCommandButtonByName: function (t, e, i) {
          var n = this.getCommandButton(t);
          n && this.changeCommandButton(n, e, i);
        },
        clearCommandButtons: function () {
          for (
            var e = t(this.commandsContainer),
              i = this.getCommandButtons(),
              n = 0;
            n < i.length;
            n++
          )
            this.clearCommandButton(i[n]);
          e.empty();
        },
        clearCommandButton: function (t) {
          $telerik.offEvent(t, r),
            $telerik.offEvent(t, a),
            $telerik.offEvent(t, a),
            $telerik.offEvent(t, h),
            $telerik.offEvent(t, "keypress");
        },
        geTitlebarHeight: function () {
          return this.titlebar ? this.titlebar.offsetHeight : 0;
        },
        get_zIndexCss: function () {
          return this.container ? this.container.style.zIndex : -1;
        },
        get_initialZIndexCss: function () {
          var t = this.window.get_element();
          return t
            ? parseInt(
                t.style.zIndex || $telerik.getComputedStyle(t, "zIndex"),
                10,
              )
            : null;
        },
        get_uiMinWidth: function () {
          return (
            (this._minUIWidth = this.options.minTitleWidth || 0),
            (this._minUIWidth += this.getHandlesWidth()),
            this.commandsContainer &&
              (this._minUIWidth += this.commandsContainer.offsetWidth),
            this.icon && (this._minUIWidth += this.icon.offsetWidth),
            this._minUIWidth
          );
        },
        get_uiMinHeight: function () {
          return (
            this._minUIHeight ||
              ((this._minUIHeight = this.getHandlesWidth() / 2 || 0),
              this.window._visibleTitlebar &&
                (this._minUIHeight += this.titlebar.offsetHeight),
              this.window._visibleStatusbar &&
                (this._minUIHeight += this.statusbar.offsetHeight)),
            this._minUIHeight
          );
        },
        dispose: function () {
          this.container =
            this.titlebar =
            this.icon =
            this.title =
            this.commandsContainer =
            this.content =
            this.contentFrame =
            this.statusbar =
            this.statusMessage =
            this.topResizer =
            this.bottomResizer =
              null;
        },
        _keyPressHandler: function (t) {
          return function (e) {
            var i = e.target || e.srcElement;
            (function (t) {
              var e = t.key && 1 === t.key.length && t.key.charCodeAt(0),
                i = e || t.keyCode;
              return i === u.space || i === u.enter;
            })(e) && t(e),
              i.focus();
          };
        },
        _upHandler: function (t) {
          return function (e) {
            (function (t) {
              return 3 === t.which;
            })(e) || t(e);
          };
        },
        _setRolePresentation: function (t) {
          this._setRole(t, "presentation");
        },
        _setRole: function (t, e) {
          var i = this.window.get_enableAriaSupport();
          t && i && t.setAttribute("role", e);
        },
        _setTabIndex: function (t) {
          var e = this.window.get_tabIndex();
          null !== e && t.setAttribute("tabindex", e);
        },
        _cancelEvent: function (t) {
          return $telerik.cancelRawEvent(t);
        },
        _preventDefault: function (t) {
          t.preventDefault && t.preventDefault(), (t.returnValue = !1);
        },
      }),
      e.LightweightRenderer.registerClass(
        "Telerik.Web.UI.Window.LightweightRenderer",
        e.RendererBase,
        e.IRenderer,
      );
    var u = Sys.UI.Key;
  })($telerik.$, Telerik.Web.UI.Window),
  Type.registerNamespace("Telerik.Web.UI.Window"),
  (function (t, e, i) {
    var n = window,
      s = (n.parseFloat, n.parseInt),
      o = n.Math,
      r = o.max,
      a = o.min,
      h = new Sys.UI.Bounds(0, 0, 0, 0);
    function l(t, e, i) {
      return r(e, a(t, i));
    }
    (e.LightweightView = function (t) {
      e.LightweightView.initializeBase(this, [t]), (this.ui = this.window.ui);
    }),
      (e.LightweightView.prototype = {
        moveTo: function (t, e) {
          var i = this.ui;
          i.popupBehavior._setCoordinates(t, e),
            i.popupBehavior.show(),
            this._removeExplicitMSAjaxWidth(),
            i.updateTitleWidth();
        },
        setContent: function (t) {
          var e = this.ui.content;
          e &&
            t != e &&
            ($telerik.disposeElement(e),
            (e.innerHTML = ""),
            e.appendChild(t),
            (t = e)),
            this.window.isCreated() || (this.ui.pendingContent = t),
            this.ui.createUI(),
            this.window._isPredefined &&
              this.ui.contentFrame &&
              ((this.ui.contentFrame.style.display = "none"),
              (this.ui.contentFrame.style.height = "")),
            this.ui.contentFrame && this.ui.contentFrame.parentNode != t
              ? (this.ui.contentFrame.style.display = "none")
              : !this.window._dropDownTouchScroll &&
                Telerik.Web.UI.TouchScrollExtender._getNeedsScrollExtender() &&
                this.window._createTouchScrollExtender(!0),
            this.ui.setContent(t);
        },
        setUrl: function (t) {
          var e = this.ui.contentFrame;
          e &&
            ((e.src = t),
            this.setContentFixedHeight(
              this.window.get_height(),
              this.ui.content,
            ),
            this.onUrlChanging());
        },
        show: function () {
          this.ui.popupBehavior && this.ui.popupBehavior.show(),
            this._showResizableHandlers(),
            this._repaintResizable(),
            (this._isViewVisible = !0);
        },
        hide: function () {
          this.ui.popupBehavior && this.ui.popupBehavior.hide(),
            this._hideResizableHandlers(),
            (this._isViewVisible = !1);
        },
        isVisible: function () {
          return this._isViewVisible;
        },
        maximize: function () {
          this.ui.setShadowCssClass(!1);
          var e = this.ui.container;
          $telerik.removeCssClasses(e, [
            "rwNormalWindow",
            "rwMinimizedWindow",
            "rwMinimizedWindowShadow",
          ]),
            Sys.UI.DomElement.addCssClass(e, "rwMaximizedWindow"),
            this.window._configureMaximizeButton(!0),
            this.window._configureMinimizeButton(),
            this.window._maintainMaximizedSize(),
            this.window._maintainMaximizedSize();
          var i = e._hideWindowedElementsIFrame;
          if (
            (i &&
              (Sys.UI.DomElement.removeCssClass(i, "rwMinimizedWindowOverlay"),
              this.ui.popupBehavior._handleElementResize()),
            this.window.get_showOnTopWhenMaximized())
          ) {
            var n = e.style.zIndex,
              o = 1e5;
            n && ((this.window._restoreZindex = n), (o = 2 * s(n, 10))),
              (e.style.zIndex = o);
          }
          if ((this.ui.updateTitleWidth(), this.resizable)) {
            var r = this.resizable._handlesCollection;
            for (var a in r) {
              var h = r[a].get_handle(),
                l = t(h).css("cursor");
              this.window._initialHandlesCursor.push(l),
                t(h).css("cursor", "default");
            }
          }
        },
        setMaximizeSize: function () {
          var t = this.ui.container;
          if (t) {
            var e = this.window._getViewportBounds();
            (e.height -= 1),
              (t.style.top = e.scrollTop + e.y + "px"),
              (t.style.left = e.scrollLeft + e.x + "px");
            var i = s(this.window.get_maxWidth(), 10),
              n = s(this.window.get_maxHeight(), 10);
            i && (e.width = i),
              n && (e.height = n),
              $telerik.setSize(t, { width: e.width, height: e.height }),
              this.window._getRestrictionZoneBounds() ||
                this.window._enablePageScrolling(!1),
              this.window._dockMode &&
                (this.window.setWidthDockMode(e.width),
                this.window.setHeightDockMode(e.height)),
              this.ui.updateTitleWidth(),
              this.ui.contentFrame &&
                this.setContentFixedHeight(e.height, this.ui.content);
          }
        },
        minimize: function () {
          this.window._configureMinimizeButton(!0),
            this.window._configureMinimizeButton(!0),
            this.window._enablePageScrolling(!0);
          var t = this.ui.container;
          $telerik.removeCssClasses(t, ["rwNormalWindow", "rwMaximizedWindow"]),
            Sys.UI.DomElement.addCssClass(t, "rwMinimizedWindow"),
            this.window._enableShadow &&
              !$telerik.isIE6 &&
              (this.ui.setShadowCssClass(!0),
              Sys.UI.DomElement.addCssClass(t, "rwMinimizedWindowShadow"));
          var e = t._hideWindowedElementsIFrame;
          e && Sys.UI.DomElement.addCssClass(e, "rwMinimizedWindowOverlay"),
            this.setWidth(200),
            this.setHeight(this.ui.titlebar.offsetHeight),
            (this.ui.getTitleNode().style.width = ""),
            this.minimizeToZone(this.window.get_minimizeZoneID());
        },
        setTabIndex: function (t) {
          var e = this.ui.container,
            i = this.ui.getCommandButtons();
          null != t
            ? (e.setAttribute("tabIndex", t), i.attr("tabIndex", t))
            : (e.removeAttribute("tabIndex"), i.removeAttr("tabIndex"));
        },
        setWidth: function (t) {
          this._setWidth(t), this._repaintResizable();
        },
        _setWidth: function (e) {
          var i = this.ui.container,
            n = t(i),
            o = s(e, 10);
          0 !== o && n.outerWidth(o);
        },
        setHeight: function (t) {
          this._setHeight(t), this._repaintResizable();
        },
        _setHeight: function (e) {
          var i = this.ui,
            n = i.container,
            o = t(n),
            r = s(e, 10);
          0 !== r &&
            (this.setContentFixedHeight(r, i.content), o.outerHeight(r));
        },
        setContentFixedHeight: function (e, i) {
          if (i) {
            var n = this.ui,
              s = e - (t(n.container).outerHeight() - t(n.container).height());
            this.window._visibleTitlebar && (s -= t(n.titlebar).outerHeight()),
              this.window._visibleStatusbar &&
                (s -= t(n.statusbar).outerHeight()),
              t(i).outerHeight(s);
          }
        },
        setContentWidth: function (t) {
          this.ui.content.style.width = "";
        },
        setTitleText: function (t) {
          this.ui.title && (this._setTitleText(t), this.ui.updateTitleWidth());
        },
        _setTitleText: function (t) {
          var e = t;
          this.window.get_enableAriaSupport() &&
            (e = t || "<span style='display:none'>empty</span>"),
            (this.ui.title.innerHTML = e || "&nbsp;");
        },
        showStatusbar: function () {
          this._displayStatusbar("", !0);
        },
        hideStatusbar: function () {
          this._displayStatusbar("none", !1);
        },
        _displayStatusbar: function (t, e) {
          if (this.ui.container) {
            var i = this.ui.getStatusbar();
            !(function (t, e) {
              t && (t.style.display = e);
            })(i, t),
              this._hasAriaSupport() &&
                (function (t, e) {
                  t && t.setAttribute("aria-hidden", !e);
                })(i, e),
              this.setHeight(this.window.get_height());
          }
        },
        showShadow: function () {
          this.ui.setShadowCssClass(!0);
        },
        hideShadow: function () {
          this.ui.setShadowCssClass(!1);
        },
        moveOutOfSight: function () {
          var e = this.ui.popupBehavior;
          if (e) {
            this.window._storeBounds();
            var i = e.get_elementToShow();
            t(i).css({
              display: "",
              position: "absolute",
              top: "-10000px",
              left: this.window.get_leftHidingPoint() + "px",
              overflow: "hidden",
            }),
              i._hideWindowedElementsIFrame &&
                i._hideWindowedElementsIFrame.style &&
                (i._hideWindowedElementsIFrame.style.display = "none");
          }
          this._ariaHide();
        },
        isOutOfSight: function () {
          var t = this.ui.container;
          if (!t) return !1;
          var e = s(t.style.left, 10);
          return (
            $telerik.isIE &&
            ($telerik.isIE9 || $telerik.isIE10) &&
            e === this.window.get_leftHidingPoint()
          );
        },
        enableMoveResize: function (e) {
          var i = this,
            n = this.window;
          if (
            (this.disableMoveResize(e),
            e.move &&
              !this.draggable &&
              ((this.draggable = new Telerik.Web.UI.Widgets.Draggable(
                this.ui.container,
                { handle: this.ui.titlebar, shouldPreventDefault: !1 },
              )),
              this.draggable.add_dragStart(
                Function.createDelegate(this, function (t, e) {
                  var s;
                  this._cancelDragSelection(e.get_domEvent()), n.setActive(!0);
                  var o =
                    n.isPinned() ||
                    n.isMaximized() ||
                    (n.isMinimized() && n.get_minimizeZoneID());
                  if ((e.set_cancel(o), !o)) {
                    var r = n._getRestrictionZoneElement();
                    if (r) {
                      this.restrictBounds = n._getRestrictionZoneBounds();
                      var a = n._getCurrentBounds(),
                        h = $telerik.getBorderBox(r),
                        d = this.restrictBounds,
                        u = {
                          x: d.x + h.left,
                          y: d.y + h.top,
                          width: d.width - h.horizontal,
                          height: d.height - h.vertical,
                        },
                        c = {
                          minX: u.x,
                          minY: u.y,
                          maxX: u.width + u.x,
                          maxY: u.height + u.y,
                        };
                      (s = {
                        x: l(a.x + d.x, c.minX, c.maxX),
                        y: l(a.y + d.y, c.minY, c.maxY),
                      }),
                        i.moveTo(s.x, s.y),
                        t.set_constraints(c);
                    }
                    n.raiseEvent("dragStart", new Sys.EventArgs());
                  }
                }),
              ),
              this.draggable.add_dragging(
                Function.createDelegate(this, function (t, e) {
                  this.ui.showContentOverlay(),
                    $telerik.cancelRawEvent(e.get_domEvent()),
                    e.set_cancel(
                      n.isPinned() ||
                        n.isMaximized() ||
                        (n.isMinimized() && n.get_minimizeZoneID()),
                    );
                }),
              ),
              this.draggable.add_dragEnd(
                Function.createDelegate(this, function (t, e) {
                  var i;
                  this.ui.hideContentOverlay(),
                    n._storeBounds(),
                    n.isMaximized() ||
                      ((i = n._getStoredBounds()), n.moveTo(i.x, i.y)),
                    this._repaintResizable(),
                    n.raiseEvent("dragEnd", new Sys.EventArgs());
                }),
              )),
            e.resize &&
              !this.resizable &&
              ((this.resizable = new Telerik.Web.UI.Widgets.Resizable(
                this.ui.container,
                {
                  appendHandleToElement: !$telerik.isIE,
                  constraints: {
                    minWidth: this.ui.get_uiMinWidth(),
                    minHeight: this.ui.get_uiMinHeight(),
                  },
                  handleSize: 12,
                  shouldPreventDefault: !1,
                },
              )),
              this.resizable.add_resizeStart(
                t.proxy(this._resizeStartHandler, this),
              ),
              this.resizable.add_resizing(t.proxy(this._resizingHandler, this)),
              this.resizable.add_resizeEnd(
                t.proxy(this._resizeEndHandler, this),
              ),
              this.ui.bottomResizer && !this.bottomResizerHandle))
          ) {
            var s = new Telerik.Web.UI.Widgets.Handle(
              this.ui.bottomResizer,
              "SE",
              { cursorType: "se-resize" },
            );
            s.add_dragStart(
              t.proxy(this.resizable._handleDragStart, this.resizable),
            ),
              s.add_dragging(
                t.proxy(this.resizable._handleDragging, this.resizable),
              ),
              s.add_dragEnd(
                t.proxy(this.resizable._handleDragEnd, this.resizable),
              ),
              (this.bottomResizerHandle = s);
          }
        },
        _resizeStartHandler: function (t, e) {
          var i = this.window,
            n = i._getCurrentBounds();
          this.ui.showContentOverlay(),
            $telerik.cancelRawEvent(e.get_domEvent()),
            i.setActive(!0),
            (i.isMinimized() || i.isMaximized()) && e.set_cancel(!0),
            t.set_constraints({
              minWidth: this.ui.get_uiMinWidth(),
              minHeight: this.ui.get_uiMinHeight(),
            }),
            (this.restrictBounds = i._getRestrictionZoneBounds());
          var o = this.restrictBounds || h;
          this.resizeHelper = {
            width: i.get_width(),
            height: i.get_height() || this.ui.container.clientHeight,
            offset: { top: s(n.y + o.y, 10), left: s(n.x + o.x, 10) },
            borders: $telerik.getBorderBox(this.ui.container),
          };
          var r = new Sys.CancelEventArgs();
          this.window.raiseEvent("resizeStart", r),
            e.set_cancel(r.get_cancel());
        },
        touchCount: 0,
        _resizingHandler: function (t, e) {
          $telerik.cancelRawEvent(e.get_domEvent());
          var i = this.restrictBounds,
            n = this._getResizeBounds(e),
            s = this.resizeHelper.borders,
            r = {
              x: n.x - s.left,
              y: n.y - s.top,
              width: n.width + s.horizontal,
              height: n.height + s.vertical,
            },
            a = this.window._checkRestrictionZoneBounds(i, r);
          if (
            ((n.width = o.max(t.options.constraints.minWidth, n.width)),
            (n.height = o.max(t.options.constraints.minHeight, n.height)),
            e.set_cancel(!0),
            a && this.touchCount++ > 0)
          ) {
            var h = this.ui.container.style;
            (h.left = n.x + "px"),
              (h.top = n.y + "px"),
              this._setWidth(n.width),
              this._setHeight(n.height),
              (this._currentResizeBounds = n);
          }
        },
        _getResizeBounds: function (t) {
          var e = t.get_direction(),
            i = function (t) {
              return e.indexOf(t) > -1;
            },
            n = t.get_delta(),
            s = this.resizeHelper,
            o = i("N") ? -1 : 1,
            r = i("W") ? -1 : 1;
          return {
            x: s.offset.left + (i("W") ? n.x : 0),
            y: s.offset.top + (i("N") ? n.y : 0),
            width: s.width + r * n.x,
            height: s.height + o * n.y,
          };
        },
        _getMoveBounds: function (t) {
          var e = t.get_newPosition(),
            i = this.resizeHelper;
          return { x: e.x, y: e.y, width: i.width, height: i.height };
        },
        _resizeEndHandler: function (t, e) {
          (this.touchCount = 0),
            $telerik.cancelRawEvent(e.get_domEvent()),
            this.ui.hideContentOverlay();
          var i = this._currentResizeBounds;
          i &&
            (this.moveTo(s(i.x, 10), s(i.y, 10)),
            this.window.set_width(s(i.width, 10)),
            this.window.set_height(s(i.height, 10))),
            this.window._storeBounds(),
            this.window.raiseEvent("resizeEnd", new Sys.EventArgs()),
            (this._currentResizeBounds = null);
        },
        _showResizableHandlers: function () {
          this.resizable && this.resizable.showHandles();
        },
        _hideResizableHandlers: function () {
          this.resizable && this.resizable.hideHandles();
        },
        _repaintResizable: function () {
          this.resizable && this.resizable.repaint();
        },
        _isDir: function (t, e) {
          return t.indexOf(e) > -1;
        },
        disableMoveResize: function (t) {
          this.draggable && (this.draggable.dispose(), (this.draggable = null)),
            this.resizable &&
              (this.bottomResizerHandle &&
                (this.ui.removeStatusbarResizer(),
                this.bottomResizerHandle.dispose(),
                (this.bottomResizerHandle = null)),
              this.resizable.dispose(),
              (this.resizable = null));
        },
        setCommandButtons: function (t) {
          var e = [];
          this.ui.clearCommandButtons();
          for (var i = 0; i < t.length; i++)
            e.push(this.ui.createCommandButton(t[i]));
          return this.ui.updateTitleWidth(), e;
        },
        toggleCommand: function (t) {
          var e = this.ui.getCommandButton(t);
          e && Sys.UI.DomElement.toggleCssClass(e, "on");
        },
        minimizeToZone: function (t) {
          if (t) {
            "string" == typeof t && (t = $get(t));
            var e = this.ui.container;
            e.parentNode != t &&
              (e.parentNode.removeChild(e),
              t.appendChild(e),
              this.window.setVisible(!0),
              (e.style.position = "static"),
              $telerik.isIE
                ? (e.style.display = "inline")
                : (e.style.cssFloat = "left"));
          }
        },
        moveToDefaultParent: function () {
          var t = this.window._getDefaultParent();
          this.ui.container !== t.firstChild &&
            t.insertBefore(this.ui.container, t.firstChild);
        },
        revertToDefaultParent: function () {
          var t = this.window._getDefaultParent();
          this.ui.container !== t.firstChild &&
            t.insertBefore(this.ui.container, t.firstChild);
        },
        setActive: function (t) {
          var e = this.ui.container;
          t
            ? (this.window.setZIndexCss(),
              Sys.UI.DomElement.removeCssClass(e, "rwInactiveWindow"))
            : Sys.UI.DomElement.addCssClass(e, "rwInactiveWindow"),
            this._repaintResizable();
        },
        isActive: function () {
          var t = this.ui.container;
          return (
            t && !Sys.UI.DomElement.containsCssClass(t, "rwInactiveWindow")
          );
        },
        onUrlChanging: function () {
          if (this.ui.contentFrame)
            if (this.window.get_showContentDuringLoad()) {
              var t = this.ui.statusbar;
              t && Sys.UI.DomElement.addCssClass(t, "rwLoading");
            } else {
              var e = this.ui.contentFrame,
                i = e.style;
              (e.originalPosition = i.position),
                (e.originalHeight = i.height),
                (i.position = "absolute"),
                (i.top = "-10000px"),
                $telerik.isIE9Mode && this.setHeight(this.window._height),
                this.window._isWindowRightToLeft() &&
                  $telerik.isChrome &&
                  (i.width = "1px"),
                Sys.UI.DomElement.addCssClass(this.ui.container, "rwLoading");
            }
        },
        onUrlChanged: function () {
          var t = this.ui.statusbar,
            e = this.ui.contentFrame;
          this.window.get_showContentDuringLoad()
            ? t && Sys.UI.DomElement.removeCssClass(t, "rwLoading")
            : ((e.style.position = ""),
              (e.style.height = e.originalHeight),
              (e.originalHeight = null),
              this.window._isWindowRightToLeft() &&
                $telerik.isChrome &&
                (e.style.width = "100%"),
              Sys.UI.DomElement.removeCssClass(this.ui.container, "rwLoading"),
              $telerik.isIE9Mode &&
                (this.window.isMaximized()
                  ? this.window._maintainMaximizedSize()
                  : this.window.isMinimized() ||
                    this.setHeight(this.window.get_height()))),
            t && this.window.set_status(this.window.get_navigateUrl());
          try {
            var i = e.contentWindow.document.title;
            i &&
              i != this.window.get_title() &&
              this.window.set_title(
                i
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;"),
              );
          } catch (t) {}
        },
        updatePopupZindex: function () {
          var t = this.ui.popupBehavior;
          t && this.window.isVisible() && t.show();
        },
        dispose: function () {},
        _substractWrappersBorder: function (t, e) {
          var i = this.ui.container;
          if (!i) return t;
          var n = $telerik.getBorderBox(i);
          return (t -= e ? n.horizontal : n.vertical);
        },
        _removeExplicitMSAjaxWidth: function () {
          this.window.get_width() || (this.ui.container.style.width = "");
        },
        _ariaHide: function () {
          this.window.get_enableAriaSupport() &&
            this.ui.container &&
            !this.window.isVisible() &&
            this.ui.container.setAttribute("aria-hidden", "true");
        },
        _cancelDragSelection: function (t) {
          $telerik.isTouchDevice || $telerik.cancelRawEvent(t);
        },
        _hasAriaSupport: function () {
          return this.window.get_enableAriaSupport();
        },
        _preventDefault: function (t) {
          t.preventDefault && t.preventDefault(), (t.returnValue = !1);
        },
        restoreResizeHandlesCursor: function () {
          if (this.resizable) {
            var e = this.resizable._handlesCollection;
            for (var i in e) {
              var n = e[i].get_handle();
              t(n).css("cursor", this.window._initialHandlesCursor.shift());
            }
          }
        },
      }),
      e.LightweightView.registerClass(
        "Telerik.Web.UI.Window.LightweightView",
        e.ViewBase,
        e.IView,
      );
  })($telerik.$, Telerik.Web.UI.Window),
  Type.registerNamespace("Telerik.Web.UI.Window"),
  (function (t, e, i) {
    e.UIFactory = {
      getRenderer: function (t, i) {
        var n = Telerik.Web.UI.RenderMode;
        return t == n.Classic
          ? new e.ClassicRenderer(i)
          : t == n.Lite
            ? new e.LightweightRenderer(i)
            : void 0;
      },
      getView: function (t, i) {
        var n = Telerik.Web.UI.RenderMode;
        return t == n.Classic
          ? new e.ClassicView(i)
          : t == n.Lite
            ? new e.LightweightView(i)
            : void 0;
      },
    };
  })($telerik.$, Telerik.Web.UI.Window),
  (function (t) {
    Type.registerNamespace("Telerik.Web.UI");
    var e = Telerik.Web.UI;
    (e.WindowShortCutManager = function (t) {
      e.WindowShortCutManager.initializeBase(this, [t]);
    }),
      (e.WindowShortCutManager.prototype = {}),
      e.WindowShortCutManager.registerClass(
        "Telerik.Web.UI.WindowShortCutManager",
        e.ShortCutManager,
      ),
      (e.WindowShortCut = function (t, i, n) {
        e.WindowShortCut.initializeBase(this, [t, i, n]);
      }),
      (e.WindowShortCut.prototype = {}),
      e.WindowShortCut.registerClass(
        "Telerik.Web.UI.WindowShortCut",
        e.ShortCut,
      );
  })($telerik.$);
