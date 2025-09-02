!(function (e) {
  (e.RadContextMenuEventArgs = function (t) {
    e.RadContextMenuEventArgs.initializeBase(this),
      (this._domEvent = t || null);
  }),
    (e.RadContextMenuEventArgs.prototype = {
      get_domEvent: function () {
        return this._domEvent;
      },
    }),
    e.RadContextMenuEventArgs.registerClass(
      "Telerik.Web.UI.RadContextMenuEventArgs",
      Sys.EventArgs,
    ),
    (e.RadContextMenuShownEventArgs = function (t, n) {
      e.RadContextMenuShownEventArgs.initializeBase(this),
        (this._targetElement = t),
        (this._domEvent = n || null);
    }),
    (e.RadContextMenuShownEventArgs.prototype = {
      get_targetElement: function () {
        return this._targetElement;
      },
      get_domEvent: function () {
        return this._domEvent;
      },
    }),
    e.RadContextMenuShownEventArgs.registerClass(
      "Telerik.Web.UI.RadContextMenuShownEventArgs",
      Sys.EventArgs,
    ),
    (e.RadContextMenuCancelEventArgs = function (t, n) {
      e.RadContextMenuCancelEventArgs.initializeBase(this),
        (this._targetElement = t),
        (this._domEvent = n);
    }),
    (e.RadContextMenuCancelEventArgs.prototype = {
      get_targetElement: function () {
        return this._targetElement;
      },
      get_domEvent: function () {
        return this._domEvent;
      },
    }),
    e.RadContextMenuCancelEventArgs.registerClass(
      "Telerik.Web.UI.RadContextMenuCancelEventArgs",
      Sys.CancelEventArgs,
    ),
    (e.RadContextMenuShowingEventArgs = function (t, n) {
      e.RadContextMenuShowingEventArgs.initializeBase(this, [t, n]);
    }),
    e.RadContextMenuShowingEventArgs.registerClass(
      "Telerik.Web.UI.RadContextMenuShowingEventArgs",
      e.RadContextMenuCancelEventArgs,
    ),
    (e.RadContextMenuItemEventArgs = function (t, n, i) {
      e.RadContextMenuItemEventArgs.initializeBase(this, [t, i]),
        (this._targetElement = n);
    }),
    (e.RadContextMenuItemEventArgs.prototype = {
      get_targetElement: function () {
        return this._targetElement;
      },
    }),
    e.RadContextMenuItemEventArgs.registerClass(
      "Telerik.Web.UI.RadContextMenuItemEventArgs",
      e.RadMenuItemEventArgs,
    ),
    (e.RadContextMenuItemCancelEventArgs = function (t, n, i) {
      e.RadContextMenuItemCancelEventArgs.initializeBase(this, [t, i]),
        (this._targetElement = n);
    }),
    (e.RadContextMenuItemCancelEventArgs.prototype = {
      get_targetElement: function () {
        return this._targetElement;
      },
    }),
    e.RadContextMenuItemCancelEventArgs.registerClass(
      "Telerik.Web.UI.RadContextMenuItemCancelEventArgs",
      e.RadMenuItemCancelEventArgs,
    );
})(Telerik.Web.UI),
  (function (e) {
    Type.registerNamespace("Telerik.Web.UI");
    var t = Telerik.Web.UI;
    (t.ContextMenuTargetType = function () {
      throw Error.notImplemented();
    }),
      (t.ContextMenuTargetType.prototype = {
        Control: 0,
        Element: 1,
        TagName: 2,
        Document: 3,
      }),
      t.ContextMenuTargetType.registerEnum(
        "Telerik.Web.UI.ContextMenuTargetType",
      ),
      (t.RadContextMenu = function (e) {
        t.RadContextMenu.initializeBase(this, [e]),
          (this._enableSelection = !1),
          (this._targets = []),
          (this._targetElements = null),
          (this._shown = !1),
          (this._scrollWrapElement = null),
          (this._scroller = null),
          (this._animatedElement = null),
          (this._slide = null),
          (this._collapseAnimationEndedDelegate = null),
          (this._detached = !1),
          (this._currentTarget = null),
          (this._flow = t.ItemFlow.Vertical);
      }),
      (t.RadContextMenu.contextMenus = {}),
      (t.RadContextMenu.hideAll = function () {
        for (var e in t.RadContextMenu.contextMenus)
          t.RadContextMenu.contextMenus[e].hide();
      }),
      (t.RadContextMenu._getAllHidden = function () {
        for (var e in t.RadContextMenu.contextMenus)
          if (t.RadContextMenu.contextMenus[e]._shown) return !1;
        return !0;
      }),
      (t.RadContextMenu.prototype = {
        initialize: function () {
          var e = this.get_element(),
            n = this._getContextMenuElement();
          (e.style.display = "block"),
            (e.style.visibility = "hidden"),
            (n.style.display = "block"),
            (n.style.visibility = "hidden"),
            t.RadContextMenu.callBaseMethod(this, "initialize"),
            t.RadMenu.ExtendWithView(this, this, "ExtendContextMenuWithView"),
            (n.style.display = "none"),
            (n.style.visibility = "visible"),
            (n.id = this.get_id() + "_detached"),
            (e.style.display = "none"),
            (e.style.visibility = "visible"),
            (n.style.zIndex = this._originalZIndex),
            this.get_childListElement() || this._createChildListElement(),
            (this.get_childListElement().style.cssFloat = "left"),
            (t.RadContextMenu.contextMenus[this.get_id()] = this),
            (this._elementContextMenu = Function.createDelegate(
              this,
              this._elementContextMenu,
            )),
            this._attachShowHandlers(),
            (this._documentClickHandler = Function.createDelegate(
              this,
              this._documentClickHandler,
            )),
            $telerik.addHandler(document, "click", this._documentClickHandler),
            this._isUsedOnTouchDevices
              ? ((this._itemClickingHandler = Function.createDelegate(
                  this,
                  this._mobileItemClickingHandler,
                )),
                this.add_itemClicking(this._itemClickingHandler),
                (this._itemClickedHandler = Function.createDelegate(
                  this,
                  this._mobileItemClickedHandler,
                )),
                this.add_itemClicked(this._itemClickedHandler))
              : ((this._itemClickedHandler = Function.createDelegate(
                  this,
                  this._itemClickedHandler,
                )),
                this.add_itemClicked(this._itemClickedHandler)),
            this._initializeAnimation(),
            this._initializeScroller();
        },
        dispose: function () {
          if (
            (this._detached && this.attachContextMenu(),
            $telerik.removeHandler(
              document,
              "click",
              this._documentClickHandler,
            ),
            Sys && Sys.WebForms)
          ) {
            var e = Sys.WebForms.PageRequestManager.getInstance();
            e &&
              e.get_isInAsyncPostBack() &&
              $telerik.disposeElement(this._getContextMenuElement());
          }
          this._detachShowHandlers(),
            (this._targetElements = null),
            (this._contextMenuElement = null),
            this._collapseAnimationEndedDelegate &&
              (this._slide &&
                this._slide.remove_collapseAnimationEnded(
                  this._collapseAnimationEndedDelegate,
                ),
              (this._collapseAnimationEndedDelegate = null)),
            this._slide && (this._slide.dispose(), (this._slide = null)),
            this._scroller &&
              (this._scroller.dispose(), (this._scroller = null)),
            delete Telerik.Web.UI.RadContextMenu.contextMenus[this.get_id()],
            t.RadContextMenu.callBaseMethod(this, "dispose");
        },
        _createChildListElement: function () {
          var t = this._getContextMenuElement(),
            n = e("div.rmScrollWrap", t);
          if (
            (null == this._childListElementCssClass &&
              (1 == n.length
                ? (this._childListElementCssClass = "rmActive rmVertical")
                : (this._childListElementCssClass =
                    "rmActive rmVertical rmGroup rmLevel1")),
            this._childListElementCssClass)
          ) {
            var i = e(
              "<ul class='" + this._childListElementCssClass + "'></ul>",
            );
            1 == n.length ? i.appendTo(n) : i.appendTo(t);
          }
        },
        _initializeEventMap: function () {
          this._eventMap.initialize(this, this._getContextMenuElement());
        },
        _childInserted: function (e, n, i) {
          t.RadContextMenu.callBaseMethod(this, "_childInserted", [e, n, i]),
            i._shown &&
              (n._getWidth() > 0 || n.get_isSeparator()) &&
              t.RadMenu._adjustChildrenWidth(i);
        },
        _attachShowHandlers: function () {
          for (
            var e =
                $telerik.isOpera &&
                !("oncontextmenu" in document.documentElement)
                  ? "mousedown"
                  : "contextmenu",
              t = this._getTargetElements(),
              n = 0;
            n < t.length;
            n++
          )
            $telerik.addHandler(t[n], e, this._elementContextMenu);
          $telerik.addHandler(
            this._getContextMenuElement(),
            e,
            this._elementContextMenu,
          );
        },
        _detachShowHandlers: function () {
          for (
            var e =
                $telerik.isOpera &&
                !("oncontextmenu" in document.documentElement)
                  ? "mousedown"
                  : "contextmenu",
              t = this._getTargetElements(),
              n = 0;
            n < t.length;
            n++
          ) {
            var i = t[n];
            try {
              $telerik.removeHandler(i, e, this._elementContextMenu);
            } catch (e) {}
          }
          try {
            $telerik.removeHandler(
              this._getContextMenuElement(),
              e,
              this._elementContextMenu,
            );
          } catch (e) {}
        },
        _documentClickHandler: function (e) {
          var t = this._getContextMenuElement();
          $telerik.isDescendant(t, e.target) ||
            (this.close(), (this._clicked = !1), this._hide(e));
        },
        _itemClickedHandler: function (e, t) {
          this.get_clickToOpen() || this._hide(t.get_domEvent());
        },
        _mobileItemClickingHandler: function (e, n) {
          var i = n.get_item();
          i._shouldHide =
            ((i.get_expandMode() == t.MenuItemExpandMode.ClientSide &&
              (i.get_isOpen() || 0 == i.get_items().get_count())) ||
              (i._itemsLoaded && i.get_selected())) &&
            !i._shouldNavigate();
        },
        _mobileItemClickedHandler: function (e, t) {
          var n = t.get_item();
          n._shouldHide && ((n._shouldHide = !1), this._hide(t.get_domEvent()));
        },
        _initializeAnimation: function () {
          var e = this._getAnimatedElement();
          e &&
            ((this._slide = new t.jSlide(
              e,
              this.get_expandAnimation(),
              this.get_collapseAnimation(),
              this.get_enableOverlay(),
            )),
            this._slide.initialize(),
            this._slide.set_direction(this._getSlideDirection()),
            (this._collapseAnimationEndedDelegate = Function.createDelegate(
              this,
              this._onCollapseAnimationEnded,
            )),
            this._slide.add_collapseAnimationEnded(
              this._collapseAnimationEndedDelegate,
            ),
            (this._expandAnimationStartedDelegate = Function.createDelegate(
              this,
              this._onExpandAnimationStarted,
            )),
            this._slide.add_expandAnimationStarted(
              this._expandAnimationStartedDelegate,
            ),
            (this._expandAnimationEndedDelegate = Function.createDelegate(
              this,
              this._onExpandAnimationEnded,
            )),
            this._slide.add_expandAnimationEnded(
              this._expandAnimationEndedDelegate,
            ));
        },
        _getMainElement: function () {
          return this._getContextMenuElement();
        },
        _getSlideDirection: function () {
          var e = this.get_defaultGroupSettings().get_expandDirection();
          return e == t.ExpandDirection.Auto ? t.ExpandDirection.Down : e;
        },
        _getScrollWrapElement: function () {
          var e = this._getContextMenuElement();
          return (
            this._scrollWrapElement ||
              ((this.get_defaultGroupSettings().get_height() ||
                this.get_defaultGroupSettings().get_width()) &&
                (this._scrollWrapElement = $telerik.getFirstChildByTagName(
                  e,
                  "div",
                  0,
                ))),
            this._scrollWrapElement
          );
        },
        _getAnimatedElement: function () {
          return (
            this._animatedElement ||
              (this._animatedElement =
                this._getScrollWrapElement() || this.get_childListElement()),
            this._animatedElement
          );
        },
        _onExpandAnimationEnded: function (e) {
          var n = new t.RadContextMenuEventArgs();
          this.raise_expandAnimationEnded(n);
        },
        _onExpandAnimationStarted: function (t) {
          if (t.get_element().style.left !== this._cacheLeft) {
            var n = parseInt(this._cacheLeft),
              i = e(t.get_element()).outerWidth();
            n + i > $telerik.getViewPortSize().width
              ? (t.get_element().style.left =
                  n - (n + i - $telerik.getViewPortSize().width) + "px")
              : (t.get_element().style.left = this._cacheLeft);
          }
          if (t.get_element().style.top !== this._cacheTop) {
            var s = parseInt(this._cacheTop),
              l = e(t.get_element()).outerHeight();
            if (s + l > $telerik.getViewPortSize().height) {
              var o = s - (s + l - $telerik.getViewPortSize().height);
              o < 7 && (o = 7), (t.get_element().style.top = o + "px");
            } else t.get_element().style.top = this._cacheTop;
          }
        },
        _onCollapseAnimationEnded: function () {
          this._restoreZIndex();
        },
        _getTargetElements: function () {
          if (null == this._targetElements) {
            this._targetElements = [];
            for (var e = 0; e < this._targets.length; e++)
              this._addTargetElements(this._targets[e]);
          }
          return this._targetElements;
        },
        _addTargetElements: function (e) {
          switch (e.type) {
            case t.ContextMenuTargetType.Document:
              this._addTargetElement(document);
              break;
            case t.ContextMenuTargetType.Control:
            case t.ContextMenuTargetType.Element:
              this._addTargetElement($get(e.id));
              break;
            case t.ContextMenuTargetType.TagName:
              for (
                var n = document.getElementsByTagName(e.tagName), i = 0;
                i < n.length;
                i++
              )
                this._addTargetElement(n[i]);
          }
        },
        _addTargetElement: function (e) {
          e && (this._targetElements[this._targetElements.length] = e);
        },
        _adjustPositionForScreenBoundaries: function (e, n) {
          var i = t.RadMenu._getViewPortSize(),
            s = this._getContextMenuElement();
          (n = Math.min(n, i.height - s.offsetHeight)),
            (e = this.get_rightToLeft()
              ? Math.max(0, e)
              : Math.min(e, i.width - s.offsetWidth)),
            isNaN(e) && (e = 0),
            isNaN(n) && (n = 0),
            (this._getContextMenuElement().style.left = e + "px"),
            (this._getContextMenuElement().style.top = n + "px");
        },
        _detach: function () {
          if (
            !$telerik.isIE ||
            "complete" == document.readyState ||
            "interactive" == document.readyState
          ) {
            var e,
              t = !1;
            e = arguments[0]
              ? arguments[0].target || arguments[0].srcElement
              : this.get_element();
            var n = $telerik.$(e).parents("form");
            (t = n[n.length - 1]) || (t = document.forms[0]),
              this._getContextMenuElement().parentNode.removeChild(
                this._getContextMenuElement(),
              );
            var i = t || document.body;
            i.insertBefore(this._getContextMenuElement(), i.firstChild),
              (this._detached = !0);
          }
        },
        _getContextMenuElement: function () {
          return (
            this._contextMenuElement ||
              (this._contextMenuElement = $telerik.getFirstChildByTagName(
                this.get_element(),
                "div",
                0,
              )),
            this._contextMenuElement
          );
        },
        _isMainElementDescendant: function (e) {
          return $telerik.isDescendant(this._getContextMenuElement(), e);
        },
        _getExtendedItemClickingEventArgs: function (e) {
          return new t.RadContextMenuItemCancelEventArgs(
            e.get_item(),
            this._targetElement,
            e.get_domEvent(),
          );
        },
        _getExtendedItemClickedEventArgs: function (e) {
          return new t.RadContextMenuItemEventArgs(
            e.get_item(),
            this._targetElement,
            e.get_domEvent(),
          );
        },
        _updateScrollWrapSize: function () {
          var e = this._getScrollWrapElement(),
            t = this.get_childListElement();
          e &&
            (e.style.height || (e.style.height = t.offsetHeight + "px"),
            (e.style.width = t.offsetWidth + "px"));
        },
        _getAnimationContainer: function () {
          return this._getContextMenuElement();
        },
        _initializeScroller: function () {
          this._getScrollWrapElement() &&
            (this._scroller && this._scroller.dispose(),
            (this._scroller = new t.MenuItemScroller(
              this,
              this.get_childListElement(),
              t.ItemFlow.Vertical,
            )),
            this._scroller.initialize());
        },
        _adjustRootItemsWidthOnShow: function () {
          for (var e = this.get_items(), t = e.get_count(), n = 0; n < t; n++) {
            var i = e.getItem(n);
            if (i._adjustSiblingsWidthOnShow)
              return (
                i._adjustSiblingsWidth(),
                void (i._adjustSiblingsWidthOnShow = !1)
              );
          }
        },
        _elementContextMenu: function (e) {
          if (
            $telerik.isDescendantOrSelf(this._getContextMenuElement(), e.target)
          )
            return $telerik.cancelRawEvent(e), !1;
          ($telerik.isOpera &&
            !("oncontextmenu" in document.documentElement) &&
            2 != e.button) ||
            this.show(e);
        },
        _showAt: function (n, i, s) {
          var l = this._getMainElement();
          if ((t.RadContextMenu.hideAll(), t.RadContextMenu._getAllHidden())) {
            (this._shown = !0),
              this._ensureDecorationElements(),
              this._detached ||
                (this._detach(s),
                (this._getContextMenuElement().style.visibility = "hidden"),
                (this._getContextMenuElement().style.display = "block"),
                this.repaint());
            var o = this.get_openedItem();
            o && o.close(),
              this._slide.show(),
              this._adjustRootItemsWidthOnShow(),
              this._updateScrollWrapSize(),
              this._slide.updateSize(),
              this._rightToLeft &&
                (n -= this._getContextMenuElement().offsetWidth),
              (this._getContextMenuElement().style.left = n + "px"),
              (this._getContextMenuElement().style.top = i + "px"),
              (this._cacheLeft = n + "px"),
              (this._cacheTop = i + "px"),
              this.get_enableScreenBoundaryDetection() &&
                this._adjustPositionForScreenBoundaries(n, i),
              this._scroller && this._scroller.updateState(),
              (this._getContextMenuElement().style.visibility = "visible"),
              this._slide.expand(),
              e(l).attr("tabindex") && l.focus(),
              this.raise_shown(
                new t.RadContextMenuShownEventArgs(
                  this._targetElement,
                  s || null,
                ),
              );
          }
        },
        _focus: function (t) {
          var n = this.get_focusedItem();
          if (e(t.target).closest(".rmTemplate").length > 0) return !1;
          n && n.focus(t);
        },
        _onKeyDown: function (t) {
          var n = this.get_focusedItem(),
            i = t.originalEvent.code,
            s = this.get_items();
          if (e(t.target).closest(".rmTemplate").length > 0) return !1;
          if ("Escape" === i) return this._hide(), !1;
          if (!n) {
            switch (i) {
              case "ArrowUp":
                var l = s.getItem(s.get_count() - 1);
                l.get_visible() ? l.focus(t) : l.focusPreviousItem(t);
                break;
              case "ArrowDown":
                var o = s.getItem(0);
                o.get_visible() ? o.focus(t) : o.focusNextItem(t);
                break;
              case "Enter":
              case "NumpadEnter":
                this._hide();
            }
            return !1;
          }
          return this._keyboardNavigator._onKeyDown(t, n);
        },
        _hide: function (e) {
          if (this._shown) {
            var n = new t.RadContextMenuCancelEventArgs(
              this._targetElement,
              e || null,
            );
            if ((this.raise_hiding(n), !n.get_cancel())) {
              (this._shown = !1),
                this._slide.collapse(),
                this.raise_hidden(new t.RadContextMenuEventArgs(e || null)),
                (this._targetElement = null),
                (this._clicked = !1),
                this._focusedItem && this._focusedItem._setFocused(!1, e),
                this._clearSelectedItem();
              var i = this.get_openedItem();
              i && i.close(), delete this._cacheLeft, delete this._cacheTop;
            }
          }
        },
        _adjustRootItemWidth: function () {},
        _applyRtlStyles: function () {
          t.RadContextMenu.callBaseMethod(this, "_applyRtlStyles");
          var n = "RadMenu_Context_rtl";
          this._skin && (n += " RadMenu_" + this._skin + "_Context_rtl"),
            e(this._getMainElement()).addClass(n);
        },
        get_childListElement: function () {
          return (
            this._getScrollWrapElement() &&
              (this._childListElement = $telerik.getFirstChildByTagName(
                this._getScrollWrapElement(),
                "ul",
                0,
              )),
            this._childListElement ||
              (this._childListElement = $telerik.getFirstChildByTagName(
                this._getContextMenuElement(),
                "ul",
                0,
              )),
            this._childListElement
          );
        },
        set_targets: function (e) {
          this._targets = e;
        },
        get_targets: function () {
          return this._targets;
        },
        get_contextMenuElement: function () {
          return this._getContextMenuElement();
        },
        show: function (e) {
          var n,
            i,
            s,
            l,
            o = document.documentElement,
            a = document.body;
          this._shown && this._hide(),
            e.target
              ? (this._targetElement = e.target)
              : e.srcElement && (this._targetElement = e.srcElement),
            (n = new t.RadContextMenuShowingEventArgs(
              this._targetElement || null,
              e || null,
            )),
            this.raise_showing(n),
            n.get_cancel() ||
              ((i = $telerik.getTouchEventLocation(e, "client")),
              (s = {
                scrollLeft:
                  $telerik.isIE7 && this._rightToLeft
                    ? o.scrollWidth -
                      o.offsetWidth -
                      Math.abs(o.scrollLeft) +
                      Telerik.Web.Browser.scrollBarWidth
                    : o.scrollLeft + a.scrollLeft,
                scrollTop: Math.max(o.scrollTop, a.scrollTop),
              }),
              (l = {
                left:
                  i.x +
                  (($telerik.isIE7 || $telerik.isIE8) && this._rightToLeft
                    ? -s.scrollLeft
                    : s.scrollLeft),
                top: i.y + s.scrollTop,
              }),
              this._showAt(l.left, l.top, e),
              $telerik.cancelRawEvent(e));
        },
        showAt: function (e, n) {
          var i = new t.RadContextMenuShowingEventArgs();
          this.raise_showing(i), i.get_cancel() || this._showAt(e, n, null);
        },
        hide: function () {
          this._hide(null);
        },
        repaint: function () {
          t.RadMenu._adjustRootItemWidth(
            this.get_id(),
            this.get_childListElement(),
          );
        },
        addTargetElement: function (e) {
          if (e) {
            this._addTargetElement(e);
            var t =
              $telerik.isOpera && !("oncontextmenu" in document.documentElement)
                ? "mousedown"
                : "contextmenu";
            $telerik.addHandler(e, t, this._elementContextMenu);
          }
        },
        removeTargetElement: function (e) {
          if (e) {
            var t =
              $telerik.isOpera && !("oncontextmenu" in document.documentElement)
                ? "mousedown"
                : "contextmenu";
            Array.remove(this._targetElements, e) &&
              $telerik.removeHandler(e, t, this._elementContextMenu);
          }
        },
        attachContextMenu: function () {
          this._detached &&
            (this._getContextMenuElement().parentNode.removeChild(
              this._getContextMenuElement(),
            ),
            this.get_element().insertBefore(
              this._getContextMenuElement(),
              $get(this.get_clientStateFieldID()),
            ),
            (this._detached = !1));
        },
        add_expandAnimationEnded: function (e) {
          this.get_events().addHandler("expandAnimationEnded", e);
        },
        remove_expandAnimationEnded: function (e) {
          this.get_events().removeHandler("expandAnimationEnded", e);
        },
        raise_expandAnimationEnded: function (e) {
          this._fireEvents && this.raiseEvent("expandAnimationEnded", e);
        },
        add_showing: function (e) {
          this.get_events().addHandler("showing", e);
        },
        remove_showing: function (e) {
          this.get_events().removeHandler("showing", e);
        },
        raise_showing: function (e) {
          this._fireEvents && this.raiseEvent("showing", e);
        },
        add_shown: function (e) {
          this.get_events().addHandler("shown", e);
        },
        remove_shown: function (e) {
          this.get_events().removeHandler("shown", e);
        },
        raise_shown: function (e) {
          this._fireEvents && this.raiseEvent("shown", e);
        },
        add_hiding: function (e) {
          this.get_events().addHandler("hiding", e);
        },
        remove_hiding: function (e) {
          this.get_events().removeHandler("hiding", e);
        },
        raise_hiding: function (e) {
          this._fireEvents && this.raiseEvent("hiding", e);
        },
        add_hidden: function (e) {
          this.get_events().addHandler("hidden", e);
        },
        remove_hidden: function (e) {
          this.get_events().removeHandler("hidden", e);
        },
        raise_hidden: function (e) {
          this._fireEvents && this.raiseEvent("hidden", e);
        },
      }),
      t.RadContextMenu.registerClass(
        "Telerik.Web.UI.RadContextMenu",
        t.RadMenu,
      );
  })($telerik.$);
