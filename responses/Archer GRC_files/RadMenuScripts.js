!(function (e, t) {
  Type.registerNamespace("Telerik.Web.UI");
  var i = Telerik.Web.UI;
  e.registerEnum(i, "RadMenuItemState", {
    Closed: 0,
    Open: 1,
    AboutToClose: 2,
    AboutToOpen: 3,
  }),
    e.registerEnum(i, "MenuItemExpandMode", { ClientSide: 0, WebService: 1 }),
    (i.BaseMenuItem = function () {
      i.BaseMenuItem.initializeBase(this),
        (this._zIndexStep = 1e3),
        (this._defaultScrollSize = 16),
        (this._menu = null),
        (this._groupSettings = new i.RadMenuItemGroupSettings({})),
        (this._imageUrl = null),
        (this._enableImageSprite = null),
        (this._flow = null),
        (this._openedItem = null),
        (this._timeoutRef = null),
        (this._focused = !1),
        (this._clicked = !1),
        (this._hovered = !1),
        (this._isImageOnly = null),
        (this._itemsLoaded = !1),
        (this._itemsLoading = !1),
        (this._adjustSiblingsWidthOnShow = !1),
        (this._state = i.RadMenuItemState.Closed),
        (this._linkElement = null),
        (this._templateElement = null),
        (this._imageElement = null),
        (this._childListElement = null),
        (this._scrollWrapElement = null),
        (this._slideWrapElement = null),
        (this._animatedElement = null),
        (this._animationContainer = null),
        (this._childrenDetached = !1),
        (this._autoScrollActive = !1),
        (this._animationContainerOriginalSize = null),
        (this._collapseAnimationEndedDelegate = null),
        (this._expandAnimationEndedDelegate = null),
        (this._slide = null),
        (this._scroller = null),
        (this._styleCssText = null),
        (this._hasItems = null),
        (this._view = null);
    }),
    (i.BaseMenuItem.prototype = {
      _disposeDomElement: function () {
        var e = this._slideWrapElement,
          t = this._parentItemElement;
        e && ((e._item = null), (e._itemTypeName = null)),
          t && ((t._item = null), (t._itemTypeName = null)),
          (this._childListElement = null),
          (this._contentTemplateContainer = null),
          (this._linkElement = null),
          (this._imageElement = null),
          (this._textElement = null),
          (this._toggleButtonElement = null),
          (this._slideWrapElement = null),
          (this._parentItemElement = null),
          (this._scrollWrapElement = null),
          (this._animatedElement = null);
      },
      get_linkElement: function () {
        return (
          this._linkElement ||
            (this._linkElement = e(this.get_element())
              .children(".rmLink")
              .get(0)),
          this._linkElement
        );
      },
      get_templateElement: function () {
        return null;
      },
      get_imageElement: function () {
        return null;
      },
      get_menu: function () {
        return this._getControl();
      },
      get_items: function () {
        return this._getChildren();
      },
      get_navigateUrl: function () {
        var t = this.get_linkElement();
        return !this.get_enabled() && t
          ? e(t).data("href")
          : this._getNavigateUrl();
      },
      get_target: function () {
        return this._properties.getValue("target", null);
      },
      set_target: function (e) {
        this._properties.setValue("target", e),
          this.get_linkElement() && (this.get_linkElement().target = e);
      },
      get_groupSettings: function () {
        return null;
      },
      set_groupSettings: function (e) {},
      get_isOpen: function () {
        return (
          !!this.get_parent() && this.get_parent().get_openedItem() == this
        );
      },
      get_nextItem: function () {
        return this.get_nextSibling();
      },
      get_previousItem: function () {
        return this.get_previousSibling();
      },
      get_focusedItem: function () {
        return this._focusedItem;
      },
      get_isSeparator: function () {
        return this._properties.getValue("isSeparator", !1);
      },
      set_isSeparator: function (e) {
        this._properties.setValue("isSeparator", e, !0);
      },
      get_openedItem: function () {
        return this._openedItem;
      },
      get_templated: function () {
        return 1 == this._properties.getValue("templated", !1);
      },
      get_hasContentTemplate: function () {
        return 1 == this._properties.getValue("hasContentTemplate", !1);
      },
      get_focused: function () {
        return this._focused;
      },
      set_focused: function (e) {
        this._setFocused(e);
      },
      get_selected: function () {
        return 1 == this._properties.getValue("selected", !1);
      },
      set_selected: function (e) {
        if ((this.get_enabled() || !e) && this.get_selected() != e) {
          this._properties.setValue("selected", e);
          var t = this.get_menu();
          t &&
            (e
              ? (t._clearSelectedItem(), t._registerSelectedItem(this))
              : t._unregisterSelectedItem(this),
            this._updateImageSrc(),
            this._updateLinkClass());
        }
      },
      get_hoveredImageUrl: function () {
        return this._properties.getValue("hoveredImageUrl", null);
      },
      set_hoveredImageUrl: function (e) {
        this._properties.setValue("hoveredImageUrl", e, !0);
      },
      get_clickedImageUrl: function () {
        return this._properties.getValue("clickedImageUrl", null);
      },
      set_clickedImageUrl: function (e) {
        this._properties.setValue("clickedImageUrl", e, !0);
      },
      get_selectedImageUrl: function () {
        return this._properties.getValue("selectedImageUrl", null);
      },
      set_selectedImageUrl: function (e) {
        this._properties.setValue("selectedImageUrl", e, !0);
      },
      get_imageUrl: function () {
        return this._properties.getValue("imageUrl", null);
      },
      set_imageUrl: function (e) {
        this._properties.setValue("imageUrl", e, !0);
      },
      get_expandedImageUrl: function () {
        return this._properties.getValue("expandedImageUrl", null);
      },
      set_expandedImageUrl: function (e) {
        this._properties.setValue("expandedImageUrl", e, !0);
      },
      get_disabledImageUrl: function () {
        return this._properties.getValue("disabledImageUrl", null);
      },
      set_disabledImageUrl: function (e) {
        this._properties.setValue("disabledImageUrl", e, !0);
      },
      get_disabledCssClass: function () {
        return this._properties.getValue("disabledCssClass", "rmDisabled");
      },
      set_disabledCssClass: function (e) {
        this._properties.setValue("disabledCssClass", e, !0),
          this._updateLinkClass();
      },
      get_expandedCssClass: function () {
        return this._properties.getValue("expandedCssClass", "rmExpanded");
      },
      set_expandedCssClass: function (e) {
        this._properties.setValue("expandedCssClass", e, !0),
          this._updateLinkClass();
      },
      get_focusedCssClass: function () {
        return this._properties.getValue("focusedCssClass", "rmFocused");
      },
      set_focusedCssClass: function (e) {
        this._properties.setValue("focusedCssClass", e, !0),
          this._updateLinkClass();
      },
      get_selectedCssClass: function () {
        return this._properties.getValue("selectedCssClass", "rmSelected");
      },
      set_selectedCssClass: function (e) {
        this._properties.setValue("selectedCssClass", e, !0),
          this._updateLinkClass();
      },
      get_clickedCssClass: function () {
        return this._properties.getValue("clickedCssClass", "rmClicked");
      },
      set_clickedCssClass: function (e) {
        this._properties.setValue("clickedCssClass", e, !0),
          this._updateLinkClass();
      },
      get_outerCssClass: function () {
        return this._properties.getValue("outerCssClass", "");
      },
      set_outerCssClass: function (e) {
        var t = this.get_outerCssClass();
        this._properties.setValue("outerCssClass", e, !0),
          this._updateItemClass(t, e);
      },
      get_postBack: function () {
        return 1 == this._properties.getValue("postBack", !0);
      },
      set_postBack: function (e) {
        this._properties.setValue("postBack", e);
      },
      get_expandMode: function () {
        return this._properties.getValue(
          "expandMode",
          i.MenuItemExpandMode.ClientSide,
        );
      },
      set_expandMode: function (e) {
        this._properties.setValue("expandMode", e, !0);
      },
      set_enabled: function (t) {
        i.BaseMenuItem.callBaseMethod(this, "set_enabled", [t]),
          this._updateLinkClass(),
          this._updateImageSrc(),
          this.get_menu() &&
            this.get_menu().get_enableAriaSupport() &&
            e(this.get_element()).attr("aria-disabled", t),
          t ? this._restoreNavigateUrl() : this._clearNavigateUrl();
      },
      set_enableImageSprite: function (e) {
        this._properties.setValue("enableImageSprite", e),
          (this._enableImageSprite = e);
      },
      get_enableImageSprite: function () {
        if (null === this._enableImageSprite) {
          var e = this.get_menu(),
            t = this._properties.getValue("enableImageSprite", null);
          this._enableImageSprite =
            null != e && null === t ? e._enableImageSprites : t || !1;
        }
        return this._enableImageSprite;
      },
      get_level: function () {
        for (var e = this.get_parent(), t = 0; e; ) {
          if (
            i.ControlItemContainer.isInstanceOfType(e) ||
            i.RadMenu.isInstanceOfType(e)
          )
            return t;
          t++, (e = e.get_parent());
        }
        return t;
      },
      get_clientTemplate: function () {
        return this._clientTemplate
          ? this._clientTemplate
          : this.get_menu()
            ? this.get_menu().get_clientTemplate()
            : null;
      },
      set_clientTemplate: function (e) {
        this._clientTemplate = e;
      },
      open: function () {
        this._open(null);
      },
      close: function () {
        this._close(null);
      },
      hide: function () {
        this.set_visible(!1);
      },
      show: function () {
        this.set_visible(!0);
      },
      focus: function (e) {
        this._setFocused(!0, e);
      },
      blur: function (e) {
        this._setFocused(!1, e);
      },
      focusFirstChild: function (e) {},
      focusLastChild: function (e) {},
      focusNextItem: function (e) {},
      focusPreviousItem: function (e) {},
      select: function () {
        this.set_selected(!0), this.click();
      },
      unselect: function () {
        this.set_selected(!1);
      },
      disable: function () {
        this.set_enabled(!1);
      },
      enable: function () {
        this.set_enabled(!0);
      },
      click: function () {
        this._click(null);
      },
      bindTemplate: function (e) {
        e || (e = this._extractDataItem()),
          (this._renderedClientTemplate = i.TemplateRenderer.renderTemplate(
            e,
            this.get_menu(),
            this,
          )),
          this.get_element() && this._applyTemplate();
      },
      _extractDataItem: function () {
        return {
          Text: this.get_text(),
          Value: this.get_value(),
          ImageUrl: this.get_imageUrl(),
          SelectedImageUrl: this.get_selectedImageUrl(),
          ClickedImageUrl: this.get_clickedImageUrl(),
          DisabledImageUrl: this.get_disabledImageUrl(),
          ExpandedImageUrl: this.get_expandedImageUrl(),
          HoveredImageUrl: this.get_hoveredImageUrl(),
          Attributes: this.get_attributes()._data,
        };
      },
      _shouldInitializeChild: function () {
        return !0;
      },
      _removeToggleButton: function () {
        var e = this._getToggleButtonElement();
        e.parentNode.removeChild(e), (this._toggleButtonElement = null);
      },
      _createItemCollection: function () {
        var e = new i.RadMenuItemCollection(this);
        return i.RadMenu._createChildControls(this, e), e;
      },
      _getHasItems: function () {
        return (
          null === this._hasItems &&
            (this._hasItems =
              this.get_itemData() && this.get_itemData().length > 0),
          this._hasItems
        );
      },
      _setHasItems: function (e) {
        this._hasItems = e;
      },
      _hasMultipleColumns: function () {
        return !1;
      },
      _clearNavigateUrl: function () {
        var t = this.get_linkElement();
        t &&
          !this.get_enabled() &&
          t.href &&
          (e(t).data("href", this._getNavigateUrl()),
          $telerik.isSafari && !$telerik.isChrome
            ? e(t).attr("href", "#")
            : e(t).removeAttr("href"));
      },
      _restoreNavigateUrl: function () {
        var t = this.get_linkElement();
        if (t) {
          var i = e(t).data("href");
          this.get_enabled() && i && (t.href = i);
        }
      },
      _getData: function () {
        var e = i.BaseMenuItem.callBaseMethod(this, "_getData"),
          t = this.get_navigateUrl();
        return (
          t && "#" != t && location.href + "#" !== t && (e.navigateUrl = t),
          null !== this.get_imageUrl() && (e.imageUrl = this.get_imageUrl()),
          e
        );
      },
      _loadFromDictionary: function (e, t) {
        var i = {};
        for (var n in e)
          if ("__type" !== n && "Attributes" !== n) {
            var s = n.charAt(0).toLowerCase() + n.substr(1),
              r = e[n];
            null !== r && "" !== r && (i[s] = r);
          }
        this._properties.load(i),
          e.Attributes && this.get_attributes()._load(e.Attributes, t);
      },
      _replaceCssClass: function (e, t, i) {
        e.className = e.className.replace(t, i);
      },
      _cacheDomProperties: function () {
        this.get_disabledImageUrl(),
          this.get_expandedImageUrl(),
          this.get_hoveredImageUrl(),
          this.get_selectedImageUrl(),
          this.get_imageUrl(),
          this.get_text(),
          this.get_navigateUrl(),
          this.get_target();
        for (var e = 0; e < this.get_items().get_count(); e++)
          this.get_items().getItem(e)._cacheDomProperties();
      },
      _closeChildren: function (e) {
        for (var t = this.get_items(), i = 0; i < t.get_count(); i++) {
          var n = t.getItem(i);
          n._stopAnimation(), n._close(e);
        }
      },
      _preventClose: function () {
        var e = this.get_parent();
        this._state == i.RadMenuItemState.AboutToClose &&
          (this._clearTimeout(),
          (this._state = i.RadMenuItemState.Open),
          (e._openedItem = this)),
          e._preventClose && e._preventClose();
      },
      _setTimeout: function (e, t) {
        this._timeoutRef = setTimeout(e, t);
      },
      _clearTimeout: function () {
        this._timeoutRef &&
          (clearTimeout(this._timeoutRef), (this._timeoutRef = null));
      },
      _updateItemClass: function (t, i) {
        var n = e(this.get_element());
        n.length &&
          (t && n.hasClass(t) && n.removeClass(t), i && n.addClass(i));
      },
      _updateImageSrc: function () {},
      _updateTextElementClass: function () {},
      _open: function (e) {
        var t = this.get_menu(),
          n = new i.RadMenuItemOpeningEventArgs(this, e);
        this.get_enabled() &&
          (t._raiseEvent("itemOpening", n),
          n.get_cancel() ||
            (this._isWebServiceCallNeeded()
              ? this._loadChildrenFromWebService()
              : this._shouldOpen() && this._doOpen(e)));
      },
      _close: function (e) {
        if (
          !this.get_isSeparator() &&
          this._state != i.RadMenuItemState.Closed
        ) {
          var t = this.get_menu(),
            n = new i.RadMenuItemClosingEventArgs(this, e);
          t._raiseEvent("itemClosing", n), n.get_cancel() || this._doClose(e);
        }
      },
      _shouldOpen: function () {
        return (
          this.get_items().get_count() > 0 ||
          this.get_hasContentTemplate() ||
          this._isWebServiceCallNeeded()
        );
      },
      _shouldPostBack: function () {
        return (
          !!this.get_menu() &&
          this.get_postBack() &&
          this.get_menu()._postBackReference
        );
      },
      _canFocus: function () {
        return !this.get_isSeparator() && this.get_visible();
      },
      _isWebServiceCallNeeded: function () {
        return (
          !this._itemsLoading &&
          !this._itemsLoaded &&
          this.get_expandMode() == i.MenuItemExpandMode.WebService
        );
      },
      _loadChildrenFromWebService: function () {
        var e = this.get_menu();
        e._clientDataSourceID
          ? e._loadChildrenFromClientDataSource(this)
          : e._loadChildrenFromWebService(this);
      },
    }),
    i.BaseMenuItem.registerClass("Telerik.Web.UI.BaseMenuItem", i.ControlItem);
})($telerik.$),
  (function (e, t) {
    (e.RadMenuItemCollection = function (t) {
      e.RadMenuItemCollection.initializeBase(this, [t]);
    }),
      (e.RadMenuItemCollection.prototype = {}),
      e.RadMenuItemCollection.registerClass(
        "Telerik.Web.UI.RadMenuItemCollection",
        e.ControlItemCollection,
      );
  })(Telerik.Web.UI),
  (function (e) {
    (e.RadMenuItemEventArgs = function (t, i) {
      e.RadMenuItemEventArgs.initializeBase(this),
        (this._item = t),
        (this._domEvent = i || null);
    }),
      (e.RadMenuItemEventArgs.prototype = {
        get_item: function () {
          return this._item;
        },
        get_domEvent: function () {
          return this._domEvent;
        },
      }),
      e.RadMenuItemEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemEventArgs",
        Sys.EventArgs,
      ),
      (e.RadMenuItemCancelEventArgs = function (t, i) {
        e.RadMenuItemCancelEventArgs.initializeBase(this),
          (this._item = t),
          (this._domEvent = i || null);
      }),
      (e.RadMenuItemCancelEventArgs.prototype = {
        get_item: function () {
          return this._item;
        },
        get_domEvent: function () {
          return this._domEvent;
        },
      }),
      e.RadMenuItemCancelEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemCancelEventArgs",
        Sys.CancelEventArgs,
      ),
      (e.RadMenuMouseOverEventArgs = function (t, i) {
        e.RadMenuMouseOverEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuMouseOverEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuMouseOverEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuMouseOutEventArgs = function (t, i) {
        e.RadMenuMouseOutEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuMouseOutEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuMouseOutEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemFocusEventArgs = function (t, i) {
        e.RadMenuItemFocusEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemFocusEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemFocusEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemBlurEventArgs = function (t, i) {
        e.RadMenuItemBlurEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemBlurEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemBlurEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemClickingEventArgs = function (t, i) {
        e.RadMenuItemClickingEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemClickingEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemClickingEventArgs",
        e.RadMenuItemCancelEventArgs,
      ),
      (e.RadMenuItemClickedEventArgs = function (t, i) {
        e.RadMenuItemClickedEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemClickedEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemClickedEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemOpeningEventArgs = function (t, i) {
        e.RadMenuItemOpeningEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemOpeningEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemOpeningEventArgs",
        e.RadMenuItemCancelEventArgs,
      ),
      (e.RadMenuItemOpenedEventArgs = function (t, i) {
        e.RadMenuItemOpenedEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemOpenedEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemOpenedEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemClosingEventArgs = function (t, i) {
        e.RadMenuItemClosingEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemClosingEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemClosingEventArgs",
        e.RadMenuItemCancelEventArgs,
      ),
      (e.RadMenuItemClosedEventArgs = function (t, i) {
        e.RadMenuItemClosedEventArgs.initializeBase(this, [t, i || null]);
      }),
      e.RadMenuItemClosedEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemClosedEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemPopulatingEventArgs = function (t, i) {
        e.RadMenuItemPopulatingEventArgs.initializeBase(this, [t]),
          (this._context = i);
      }),
      (e.RadMenuItemPopulatingEventArgs.prototype = {
        get_context: function () {
          return this._context;
        },
      }),
      e.RadMenuItemPopulatingEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemPopulatingEventArgs",
        e.RadMenuItemCancelEventArgs,
      ),
      (e.RadMenuItemPopulatedEventArgs = function (t) {
        e.RadMenuItemPopulatedEventArgs.initializeBase(this, [t]);
      }),
      e.RadMenuItemPopulatedEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemPopulatedEventArgs",
        e.RadMenuItemEventArgs,
      ),
      (e.RadMenuItemPopulationFailedEventArgs = function (t, i) {
        e.RadMenuItemPopulationFailedEventArgs.initializeBase(this, [t]),
          (this._errorMessage = i);
      }),
      (e.RadMenuItemPopulationFailedEventArgs.prototype = {
        get_errorMessage: function () {
          return this._errorMessage;
        },
      }),
      e.RadMenuItemPopulationFailedEventArgs.registerClass(
        "Telerik.Web.UI.RadMenuItemPopulationFailedEventArgs",
        e.RadMenuItemCancelEventArgs,
      );
  })(Telerik.Web.UI),
  (function ($, undefined) {
    ($telerik.findMenu = $find),
      ($telerik.toMenu = function (e) {
        return e;
      }),
      Type.registerNamespace("Telerik.Web.UI");
    var $T = Telerik.Web.UI,
      $J = Sys.Serialization.JavaScriptSerializer,
      DOT = ".",
      DOMActivate = "DOMActivate",
      MENU_RTL_CLASS = "RadMenu_rtl",
      MENU_POPUP_CLASS = "RadMenuPopup",
      MENU_POPUP_RTL_CLASS = "RadMenuPopup_rtl",
      MENU_DISABLED_CLASS = "rmDisabled",
      MENU_ANIMATION_CONTAINER_CLASS = "rmSlide",
      MENU_ITEM_CLASS = "rmItem",
      MENU_LINK_CLASS = "rmLink",
      MENU_TOGGLE_HANDLE_CLASS = "rmToggle",
      MENU_ROOT_TOGGLE_CLASS = "rmRootToggle",
      MENU_PARENT_ITEM_CLASS = "rmParentItem",
      MENU_ROOT_GROUP_CLASS = "rmRootGroup",
      MENU_GROUP_CLASS = "rmGroup",
      MENU_HIDDEN_POINTER_CLASS = "rmHiddenPointer",
      MENU_LEFT_ALIGNED_CLASS = "rmLeft",
      MENU_EXPANDED_CLASS = "rmExpanded",
      MENU_ARROWS_SELECTOR_NAME =
        ".rmTopArrow, .rmBottomArrow, .rmLeftArrow, .rmRightArrow",
      CLICK = "click",
      MOUSEUP = "mouseup",
      MOBILE_CLICK = $telerik.isTouchDevice ? "touchend" : "click",
      MOUSEDOWN = $telerik.isTouchDevice ? "touchstart" : "mousedown",
      MOBILE_MOUSEUP = $telerik.isTouchDevice ? "touchend" : "mouseup",
      MOBILE_DOCUMENT_CLICK = $telerik.isTouchDevice ? "mouseup" : "click",
      MOUSEOVER = $telerik.isTouchDevice ? "touchstart" : "mouseover",
      MOUSEOUT = $telerik.isTouchDevice ? "touchend" : "mouseout",
      BLUR = "blur",
      FOCUS = "focus",
      KEYDOWN = "keydown",
      MOUSEWHEEL = "mousewheel",
      DOMMOUSESCROLL = "DOMMouseScroll",
      DEFAULT_TOGGLE_OFFSET = 14,
      ORIENTATION_MEDIA = "(orientation: portrait)",
      childGroupStyle = { left: "100%", opacity: 0 },
      rootGroupStyle = { left: 0, opacity: 1 },
      supportsMedia = "matchMedia" in window;
    ($T.RadMenu = function (e) {
      $T.RadMenu.initializeBase(this, [e]),
        (this._childTypeName = ""),
        (this._selectedValue = ""),
        (this._itemData = null),
        (this._expandAnimation = new $T.AnimationSettings({})),
        (this._collapseAnimation = new $T.AnimationSettings({})),
        (this._flow = $T.ItemFlow.Horizontal),
        (this._defaultGroupSettings = new $T.RadMenuItemGroupSettings({})),
        (this._childListElement = null),
        (this._popUpElement = null),
        (this._postBackReference = null),
        (this._onClickDelegate = null),
        (this._webServiceSettings = new $T.WebServiceSettings({})),
        (this._persistLoadOnDemandItems = !0),
        (this._enableOverlay = !0),
        (this._childListElementCssClass = ""),
        (this._selectedItemIndex = null),
        (this._eventPreventDelay = 250),
        (this._enabled = !0),
        (this._visible = !0),
        (this._openedItem = null),
        (this._childrenDetached = !1),
        (this._originalZIndex = null),
        (this._defaultZIndex = 7e3),
        (this._zIndexIncrementDepth = 0),
        (this._fireEvents = !0),
        (this._webServiceLoader = null),
        (this._preventBlurEvent = !1),
        (this._onMouseOutDelegate = null),
        (this._onClickDelegate = null),
        (this._isUsedOnTouchDevices = !1),
        (this._cachedClickedIndex = null),
        (this._rightToLeft = null),
        (this._skin = null),
        (this._enableItemImagesPreloading = !1),
        (this._keyboardNavigator = null),
        (this._isMobile = !1),
        (this._opened = !1),
        (this._maintainState = !1),
        (this._clientDataSource = null),
        (this._dataFieldParentID = ""),
        (this._dataFieldID = ""),
        (this._dataNavigateUrlField = ""),
        (this._animatedHeight = 200),
        (this._popUpHeight = ""),
        (this._ariaSettings = null);
    }),
      ($T.RadMenu.prototype = {
        initialize: function () {
          ((this._isMobile = this._renderMode === $T.RenderMode.Mobile),
          (this._childTypeName = this._isMobile
            ? "Telerik.Web.UI.MobileMenuItem"
            : "Telerik.Web.UI.RadMenuItem"),
          $T.RadMenu.callBaseMethod(this, "initialize"),
          this._isMobile ? this._initializeMobile() : this._initialize(),
          this.get_enabled() || this.set_enabled(!1),
          this.get_webServiceSettings().get_isOData()) &&
            (this._initializeWebServiceLoader(),
            0 == this.get_items().get_count() &&
              ($.raiseCancellableControlEvent(this, "menuPopulating", {}) ||
                this._webServiceLoader.loadData({ isRootLevel: !0 }, this)));
          this._addFocusStateUpdate(),
            this._raiseEvent("load", null),
            this._initializeExpandState(),
            (this._cdInitDelegate = $.proxy(
              this._initializeClientDataSource,
              this,
            )),
            Sys.Application.add_load(this._cdInitDelegate),
            this.get_enableAriaSupport() && this._applyAriaSupport();
        },
        _initialize: function () {
          var e = this,
            t = e.get_element(),
            i = $(e._getMainElement());
          (this._isUsedOnTouchDevices = $telerik.isTouchDevice),
            (t.value = this._selectedValue),
            this.get_rightToLeft() && this._initRightToLeft(),
            this._flow == $T.ItemFlow.Vertical &&
              this.get_childListElement() &&
              this._adjustRootItemWidth(),
            (this._originalZIndex = parseInt(
              $telerik.getCurrentStyle(t, "zIndex"),
              10,
            )),
            this._originalZIndex ||
              ((t.style.zIndex = this._defaultZIndex),
              (this._originalZIndex = this._defaultZIndex)),
            (this._keyboardNavigator = new $T.RadMenu.KeyboardNavigator(this)),
            (this._onClickDelegate = Function.createDelegate(
              this,
              this._onClick,
            )),
            $telerik.addHandler(document, CLICK, this._onClickDelegate),
            this.get_clickToOpen() ||
              ($telerik.isIE &&
                ((this._onMouseOutDelegate = Function.createDelegate(
                  this,
                  this._onMouseOut,
                )),
                $telerik.addExternalHandler(
                  document.documentElement,
                  "mouseout",
                  this._onMouseOutDelegate,
                ))),
            this._isUsedOnTouchDevices
              ? i.on(CLICK, DOT + MENU_ITEM_CLASS, function (t) {
                  e._onItemTouchEnd(t);
                })
              : (this._eventMap.addHandlerForClassName(
                  "mouseover",
                  MENU_ITEM_CLASS,
                  this._onItemMouseOver,
                ),
                this._eventMap.addHandlerForClassName(
                  "mouseout",
                  MENU_ITEM_CLASS,
                  this._onItemMouseOut,
                  !0,
                ),
                this._eventMap.addHandlerForClassName(
                  "dragstart",
                  MENU_ITEM_CLASS,
                  this._onItemDragStart,
                ),
                this._eventMap.addHandlerForClassName(
                  CLICK,
                  MENU_LINK_CLASS,
                  this._onItemClick,
                ),
                this._eventMap.addHandlerForClassName(
                  CLICK,
                  MENU_ITEM_CLASS,
                  this._onItemClick,
                )),
            this._eventMap.addHandlerForClassName(
              "mouseover",
              MENU_LINK_CLASS,
              this._onLinkMouseOver,
            ),
            this._eventMap.addHandlerForClassName(
              "mouseout",
              MENU_LINK_CLASS,
              this._onLinkMouseOut,
              !0,
            ),
            this._eventMap.addHandlerForClassName(
              MOUSEDOWN,
              MENU_LINK_CLASS,
              this._onLinkMouseDown,
            ),
            this._eventMap.addHandlerForClassName(
              MOBILE_MOUSEUP,
              MENU_LINK_CLASS,
              this._onLinkMouseUp,
            ),
            this._eventMap.addHandlerForClassName(
              MOBILE_MOUSEUP,
              "rmTemplate",
              this._onTemplasteLinkMouseUp,
            ),
            this._eventMap.addHandlerForClassName(
              "blur",
              MENU_LINK_CLASS,
              this._onLinkBlur,
            ),
            this._eventMap.addHandlerForClassName(
              "deactivate",
              MENU_LINK_CLASS,
              this._onLinkBlur,
            ),
            this._eventMap.addHandlerForClassName(
              "focus",
              MENU_LINK_CLASS,
              this._onLinkFocus,
            ),
            this._eventMap.addHandlerForClassName(
              "activate",
              MENU_LINK_CLASS,
              this._onLinkFocus,
            ),
            $telerik.isChrome &&
              $(e.get_element()).on(DOMActivate, function (t) {
                e._focus(t);
              }),
            $telerik.isFirefox &&
              i.on(DOMMOUSESCROLL, function (t) {
                e._onItemMousewheel(t);
              }),
            this._initializeKeyboardEvents(),
            i
              .on(MOUSEDOWN, MENU_ARROWS_SELECTOR_NAME, function (t) {
                e._onArrowMouseDown(t.target);
              })
              .on(MOBILE_MOUSEUP, MENU_ARROWS_SELECTOR_NAME, function (t) {
                e._onArrowMouseUp(t.target);
              })
              .on(MOUSEOVER, MENU_ARROWS_SELECTOR_NAME, function (t) {
                e._onArrowMouseOver(
                  t.target,
                  $T.RadMenu._resolveDirectionFromClass(this.className),
                );
              })
              .on(MOUSEOUT, MENU_ARROWS_SELECTOR_NAME, function (t) {
                e._onArrowMouseOut(t.target);
              })
              .on(MOUSEWHEEL, DOT + MENU_ITEM_CLASS, function (t) {
                e._onItemMousewheel(t);
              })
              .on(CLICK, MENU_ARROWS_SELECTOR_NAME, function (e) {
                e.preventDefault(), e.stopPropagation();
              }),
            this._initializeScroller();
        },
        _initializeKeyboardEvents: function () {
          var e = this;
          $(e._getMainElement())
            .on(KEYDOWN, function (t) {
              e._onKeyDown(t);
            })
            .on(FOCUS, function (t) {
              e._focus(t);
            })
            .on(BLUR, function (t) {
              var i = e.get_focusedItem(),
                n = e._extractItemFromDomElement(t.relatedTarget);
              i && i !== n && i.blur(t);
            });
        },
        _initializeMobile: function () {
          var e = this,
            t = $(e._getPopUpElement()),
            i = $(e._element).find(DOT + MENU_ROOT_TOGGLE_CLASS),
            n = !1;
          this._detachPopUpContainer(),
            this._sizeAnimationContainer(),
            this.get_rightToLeft() &&
              t.addClass(MENU_POPUP_RTL_CLASS).attr("dir", "rtl"),
            t
              .on(MOBILE_CLICK, DOT + MENU_ITEM_CLASS, function (e) {
                e.stopPropagation();
              })
              .on("touchstart", DOT + MENU_LINK_CLASS, function (e) {
                n = !1;
              })
              .on("touchmove", DOT + MENU_LINK_CLASS, function (e) {
                n = !0;
              })
              .on(MOBILE_CLICK, DOT + MENU_LINK_CLASS, function (t) {
                t.stopPropagation(), n || e._onLinkClick(t);
              })
              .on(MOBILE_CLICK, DOT + MENU_TOGGLE_HANDLE_CLASS, function (t) {
                t.stopPropagation(),
                  t.preventDefault(),
                  setTimeout(function () {
                    e._onToggleClick(t);
                  }, 150);
              })
              .on(MOBILE_CLICK, DOT + MENU_PARENT_ITEM_CLASS, function (t) {
                t.stopPropagation(),
                  t.preventDefault(),
                  setTimeout(function () {
                    e._onParentItemClick(t);
                  }, 150);
              })
              .on(MOBILE_CLICK, DOT + MENU_GROUP_CLASS, function (e) {
                e.stopPropagation();
              }),
            i.on(MOBILE_CLICK, function (t) {
              t.stopPropagation(),
                e._opened || e._positionPopUpContainer(),
                e._animatePopUp();
            }),
            $(document).on(
              MOBILE_DOCUMENT_CLICK + DOT + e.get_id(),
              function (t) {
                (t.button && 0 != t.button) || (e._opened && e._animatePopUp());
              },
            ),
            $telerik.isTouchDevice &&
              (t
                .on(MOUSEUP, DOT + MENU_ITEM_CLASS, function (e) {
                  e.stopPropagation();
                })
                .on(MOUSEUP, DOT + MENU_LINK_CLASS, function (e) {
                  e.stopPropagation();
                })
                .on(MOUSEUP, DOT + MENU_GROUP_CLASS, function (e) {
                  e.stopPropagation();
                }),
              i.on(MOUSEUP, function (e) {
                e.stopPropagation();
              })),
            supportsMedia &&
              ((e._mediaListenerDelegate = Function.createDelegate(
                e,
                e._onOrientationChange,
              )),
              (e._mediaQuery = window.matchMedia(ORIENTATION_MEDIA)),
              e._mediaQuery.addListener(e._mediaListenerDelegate));
        },
        _addFocusStateUpdate: function () {
          this.add_itemFocus(function (e, t) {
            (t.get_item()._focused = !0), t.get_item()._updateLinkClass();
          }),
            this.add_itemBlur(function (e, t) {
              (t.get_item()._focused = !1), t.get_item()._updateLinkClass();
            });
        },
        _applyAriaSupport: function () {
          if (
            ($(this.get_element()).find("[tabindex]").removeAttr("tabindex"),
            this._applyMainElementAttributes(),
            this._ariaSettings)
          ) {
            var e = $J.deserialize(this._ariaSettings);
            new $T.WaiAriaDecorator(this._getMainElement(), e).setAttributes();
          }
        },
        _applyMainElementAttributes: function () {
          var e = this,
            t = $(e._getMainElement()),
            i = $(e._childListElement);
          t.attr({
            role: "menubar",
            tabindex: 0,
            "aria-disabled": !e.get_enabled(),
          }),
            i.attr("role", "presentation");
          for (var n = 0; n < e.get_allItems().length; n++) {
            var s = e.get_allItems()[n];
            if (
              (s.get_isSeparator()
                ? $(s.get_element()).attr({ role: "presentation" })
                : $(s.get_linkElement()).attr({
                    role: "menuitem",
                    "aria-disabled": !s.get_enabled(),
                    "aria-haspopup": s.get_items().get_count() > 0,
                  }),
              s.get_items().get_count() > 0)
            ) {
              var r = e.get_id() + "_slide_" + n;
              $(s._slideWrapElement).attr({
                role: "menu",
                "aria-hidden": !0,
                id: r,
              }),
                $(s.get_linkElement()).attr("aria-owns", r),
                $(s._childListElement).attr("role", "presentation");
            }
          }
        },
        _focus: function (e) {
          var t = this.get_focusedItem(),
            i = $(e.target);
          if (
            i.closest(".rmTemplate").length > 0 ||
            i.closest(this._scrollWrapElement).length > 0
          )
            return !1;
          t ||
            (t =
              this._extractItemFromDomElement(e.relatedTarget) ||
              this.get_selectedItem()),
            t ? t.focus(e) : this.get_items().getItem(0).focus(e);
        },
        _triggerEventOnce: function (e, t, i) {
          var n,
            s = this;
          this._preventBlurEvent
            ? (this._preventBlurEvent = !1)
            : (s["_" + e] && s["_" + e] == t.get_item() && "click" != i) ||
              ((s["_" + e] = t.get_item()),
              "click" !== i && s._raiseEvent(e, t),
              clearTimeout(n),
              (n = window.setTimeout(function () {
                s["_" + e] = null;
              }, s._eventPreventDelay)));
        },
        dispose: function () {
          this._isMobile ? this._disposeMobile() : this._diposeDesktop(),
            $T.RadMenu.callBaseMethod(this, "dispose");
        },
        _diposeDesktop: function () {
          this._keyboardNavigator &&
            (this._keyboardNavigator._dispose(),
            (this._keyboardNavigator = null)),
            this._onClickDelegate &&
              ($telerik.removeHandler(document, CLICK, this._onClickDelegate),
              (this._onClickDelegate = null)),
            this._onMouseOutDelegate &&
              ($telerik.removeExternalHandler(
                document.documentElement,
                "mouseout",
                this._onMouseOutDelegate,
              ),
              (this._onMouseOutDelegate = null)),
            this._isUsedOnTouchDevices && $(this.get_childListElement()).off(),
            this._eventMap &&
              (this._eventMap.dispose(), (this._eventMap = null)),
            $(this._element).off(),
            this._scroller &&
              (this._scroller.dispose(), (this._scroller = null));
        },
        _disposeMobile: function () {
          (this._popUpElement = null),
            (this._animationContainer = null),
            $(this._getPopUpElement()).off(),
            $(this._element)
              .find(DOT + MENU_ROOT_TOGGLE_CLASS)
              .off(),
            $(document).off(MOBILE_DOCUMENT_CLICK + DOT + this.get_id()),
            this._mediaQuery &&
              this._mediaListenerDelegate &&
              (this._mediaQuery.removeListener(this._mediaListenerDelegate),
              (this._mediaListenerDelegate = null));
        },
        get_rippleZonesConfiguration: function () {
          var e = this._getPopUpElement(),
            t = e ? ".rmRootToggle" : ".rmLink",
            i = [
              {
                element: this._getMainElement(),
                rippleConfigurations: [
                  { containerSelector: t, disabledClass: "rmDisabled" },
                  {
                    containerSelector: ".rmRightArrow, .rmLeftArrow",
                    autoHide: !0,
                    disabledClass: "rmDisabled",
                  },
                ],
              },
            ];
          return (
            e &&
              (i[i.length] = {
                element: e,
                rippleConfigurations: [
                  { containerSelector: ".rmItem", disabledClass: "rmDisabled" },
                ],
              }),
            i
          );
        },
        get_maintainState: function () {
          return this._maintainState;
        },
        set_maintainState: function (e) {
          this._maintainState = !!e;
        },
        get_items: function () {
          return this._getChildren();
        },
        set_items: function (e) {
          this._children = e;
        },
        get_childListElement: function () {
          var e, t, i;
          return (
            this._childListElement ||
              ((i = this._getPopUpElement())
                ? (this._childListElement = $(i)
                    .find(DOT + MENU_ROOT_GROUP_CLASS)
                    .get(0))
                : ((e = this.get_element()),
                  (t = this._getScrollWrapElement()) && (e = t),
                  (this._childListElement = $telerik.getFirstChildByTagName(
                    e,
                    "ul",
                    0,
                  )))),
            this._childListElement
          );
        },
        get_expandAnimation: function () {
          return this._expandAnimation;
        },
        set_expandAnimation: function (e) {
          var t = Sys.Serialization.JavaScriptSerializer.deserialize(e);
          this._expandAnimation = new $T.AnimationSettings(t);
        },
        get_collapseAnimation: function () {
          return this._collapseAnimation;
        },
        set_collapseAnimation: function (e) {
          var t = Sys.Serialization.JavaScriptSerializer.deserialize(e);
          this._collapseAnimation = new $T.AnimationSettings(t);
        },
        get_defaultGroupSettings: function () {
          return this._defaultGroupSettings;
        },
        set_defaultGroupSettings: function (e) {
          var t = Sys.Serialization.JavaScriptSerializer.deserialize(e);
          this._defaultGroupSettings = new $T.RadMenuItemGroupSettings(t);
        },
        get_itemData: function () {
          return this._itemData;
        },
        set_itemData: function (e) {
          this._enableItemImagesPreloading && $T.RadMenu._preloadItemImages(e),
            (this._itemData = e);
        },
        set_enabled: function (e) {
          if (
            ($T.RadMenu.callBaseMethod(this, "set_enabled", [e]),
            this.get_isInitialized())
          ) {
            this.get_element().disabled = !e;
            var t = this.get_items(),
              i = $(this._getRootToggleElement()),
              n = t.get_count(),
              s = e ? "enable" : "disable";
            i.toggleClass(MENU_DISABLED_CLASS, !e),
              this.get_enableAriaSupport() &&
                $(this.get_element()).attr("aria-disabled", !e),
              this[s + "Events"]();
            for (var r = 0; r < n; r++) t.getItem(r)[s]();
          }
        },
        get_focusedItem: function () {
          return this._focusedItem;
        },
        get_openedItem: function () {
          return this._openedItem;
        },
        get_rightToLeft: function () {
          return (
            null === this._rightToLeft &&
              (this._rightToLeft = $T.RadMenu._requiresRightToLeft(
                this.get_element(),
              )),
            this._rightToLeft
          );
        },
        set_rightToLeft: function (e) {
          this._rightToLeft = e;
        },
        get_selectedItem: function () {
          return this._childControlsCreated && this._selectedItemIndex
            ? this._findItemByHierarchicalIndex(this._selectedItemIndex)
            : null;
        },
        createMenuItem: function () {
          return this._isMobile
            ? new $T.MobileMenuItem()
            : new $T.RadMenuItem();
        },
        repaint: function () {
          if (this._isMobile) this._sizeAnimationContainer();
          else {
            var e = this._flow == $T.ItemFlow.Vertical,
              t = this.get_element();
            if ((e && this._adjustRootItemWidth(), this._scroller)) {
              var i = this._getScrollWrapElement();
              e
                ? (i.style.height = t.style.height)
                : (i.style.width = t.style.width),
                this._initializeScroller();
            }
            window.setTimeout(function () {
              t.style.cssText = t.style.cssText;
            }, 0);
          }
        },
        saveClientState: function () {
          var e = { logEntries: this._log._logEntries };
          return (
            this._selectedItemIndex &&
              (e.selectedItemIndex = this._selectedItemIndex),
            Sys.Serialization.JavaScriptSerializer.serialize(e)
          );
        },
        close: function () {
          var e = this.get_openedItem();
          if (e) {
            var t = this.get_selectedItem();
            t && t.set_selected(!1), e.close();
          }
          this.get_clickToOpen() && this.set_clicked(!1),
            this._isMobile && this._opened && this._animatePopUp();
        },
        disable: function () {
          this.set_enabled(!1);
        },
        enable: function () {
          this.set_enabled(!0);
        },
        disableEvents: function () {
          this._fireEvents = !1;
        },
        enableEvents: function () {
          this._fireEvents = !0;
        },
        focus: function () {
          this.get_element().focus();
        },
        findItemByText: function (e) {
          return this._findItemByText(e);
        },
        findItemByUrl: function (e) {
          return this._findItemByUrl(e);
        },
        findItemByAbsoluteUrl: function (e) {
          return this._findItemByAbsoluteUrl(e);
        },
        findItemByValue: function (e) {
          return this._findItemByValue(e);
        },
        findItemByAttribute: function (e, t) {
          return this._findItemByAttribute(e, t);
        },
        get_allItems: function () {
          return this._getAllItems();
        },
        get_persistLoadOnDemandItems: function () {
          return this._persistLoadOnDemandItems;
        },
        set_persistLoadOnDemandItems: function (e) {
          this._persistLoadOnDemandItems = e;
        },
        get_enableOverlay: function () {
          return this._enableOverlay;
        },
        set_enableOverlay: function (e) {
          this._enableOverlay = e;
        },
        _detachPopUpContainer: function () {
          $(document.body).find("form").append(this._getPopUpElement());
        },
        _positionPopUpContainer: function () {
          var e = $(this._getRootToggleElement()),
            t = $(this._getPopUpElement()),
            i = document.documentElement.clientWidth,
            n = e.offset(),
            s = { left: "auto", right: "auto" };
          n.left > Math.round(i / 2)
            ? ((s.right = i - (n.left + e.outerWidth())),
              t.removeClass(MENU_LEFT_ALIGNED_CLASS))
            : ((s.left = n.left), t.addClass(MENU_LEFT_ALIGNED_CLASS)),
            (s.top = n.top + e.height() + DEFAULT_TOGGLE_OFFSET),
            t.css(s);
        },
        _initializeExpandState: function () {
          var e = this._cachedClickedIndex;
          if (this._isUsedOnTouchDevices && e) {
            var t = this._findItemByHierarchicalIndex(e);
            t &&
              t.get_items().get_count() > 0 &&
              $T.RadMenu._expandItemsRecursively(this, e);
          }
        },
        _isMainElementDescendant: function (e) {
          return $telerik.isDescendant(this.get_element(), e);
        },
        _createChildControls: function () {
          (this._children = new $T.RadMenuItemCollection(this)),
            $T.RadMenu._createChildControls(this, this._children);
        },
        _createChildListElement: function () {
          if (this._childListElementCssClass) {
            var e = this._getPopUpElement() || this.get_element(),
              t = $("<ul class='" + this._childListElementCssClass + "'></ul>"),
              i = $(e).find("div.rmScrollWrap, div.rmSlide");
            1 == i.length ? t.appendTo(i) : t.appendTo(e);
          }
        },
        _getChildElements: function () {
          return $(this.get_childListElement()).children(".rmItem");
        },
        _getRootToggleElement: function () {
          return (
            this._rootToggleElement ||
              (this._rootToggleElement = $(this._element)
                .find(DOT + MENU_ROOT_TOGGLE_CLASS)
                .get(0)),
            this._rootToggleElement
          );
        },
        _getPopUpElement: function () {
          return (
            this._popUpElement ||
              (this._popUpElement = $(this._element)
                .find(DOT + MENU_POPUP_CLASS)
                .get(0)),
            this._popUpElement
          );
        },
        _getAnimationContainerElement: function () {
          return (
            this._animationContainer ||
              (this._animationContainer = $(this._popUpElement)
                .find(DOT + MENU_ANIMATION_CONTAINER_CLASS)
                .get(0)),
            this._animationContainer
          );
        },
        _getScrollWrapElement: function () {
          if (!this._scrollWrapElement) {
            var e = $telerik.getFirstChildByTagName(
              this.get_element(),
              "div",
              0,
            );
            e &&
              Sys.UI.DomElement.containsCssClass(e, "rmScrollWrap") &&
              (this._scrollWrapElement = e);
          }
          return this._scrollWrapElement;
        },
        _clearSelectedItem: function () {
          var e = this.get_selectedItem();
          e && e.set_selected(!1);
        },
        _registerSelectedItem: function (e) {
          (this._selectedItemIndex = e._getHierarchicalIndex()),
            this.updateClientState(),
            this._updateValidationField(e);
        },
        _unregisterSelectedItem: function (e) {
          e._getHierarchicalIndex() == this._selectedItemIndex &&
            ((this._selectedItemIndex = null),
            this.updateClientState(),
            this._updateValidationField(this.get_selectedItem()));
        },
        _updateValidationField: function (e) {
          var t = "";
          e && null === (t = e.get_value()) && (t = e.get_text()),
            (this.get_element().value = t);
        },
        _onMouseOut: function (e) {
          var t = e.relatedTarget ? e.relatedTarget : e.toElement,
            i = this;
          if (!t && !this._isMainElementDescendant(e.target))
            try {
              setTimeout(function () {
                i.close();
              }, this.get_collapseDelay());
            } catch (e) {}
        },
        _onClick: function (e) {
          if (!this._isMainElementDescendant(e.target)) {
            var t = this.get_clickToOpen();
            (this._focusedItem || t) && this.close();
          }
        },
        _onItemMouseOver: function (e) {
          var t,
            i,
            n = this._extractItemFromDomElement(e.eventMapTarget),
            s = e.target;
          return (
            !(
              n.get_enabled() && !$(s).hasClass(MENU_ANIMATION_CONTAINER_CLASS)
            ) ||
            ($T.RadMenu._isTargetToggleButton(s)
              ? (e.preventDefault && e.preventDefault(), !1)
              : (n._preventClose(),
                !(!this.get_clickToOpen() || this.get_clicked()) ||
                  n._state == $T.RadMenuItemState.Open ||
                  n._state == $T.RadMenuItemState.AboutToOpen ||
                  ((t = n.get_parent()),
                  (i = t.get_openedItem()) &&
                    i != n &&
                    (i._clearTimeout(),
                    (i._state = $T.RadMenuItemState.AboutToClose),
                    i._setTimeout(function () {
                      i.close(), (i._timeoutRef = null);
                    }, this.get_expandDelay())),
                  !n._shouldOpen() ||
                    ((n._state = $T.RadMenuItemState.AboutToOpen),
                    n._setTimeout(function () {
                      n.open(), (n._timeoutRef = null);
                    }, this.get_expandDelay()),
                    !0))))
          );
        },
        _onItemMouseOut: function (e) {
          var t,
            i,
            n = this._extractItemFromDomElement(e.eventMapTarget);
          if (null != n) {
            if (!n.get_enabled()) return !0;
            if (
              ((t = e.eventMapRelatedTarget),
              (i = n.get_element()),
              !t || i == t || $telerik.isDescendant(i, t))
            )
              return !0;
            if (
              n.get_hasContentTemplate() &&
              $telerik.isDescendant(n._getContentTemplateContainer(), t)
            )
              return !0;
            if (
              this._childrenDetached &&
              $telerik.isDescendant(n.get_parent()._getAnimationContainer(), t)
            )
              return !0;
            if (
              this._scroller &&
              n.get_level() > 0 &&
              !$telerik.isDescendant(this.get_element(), t)
            ) {
              for (
                var s = n;
                s.get_level() > 0 && void 0 !== (s = s.get_parent()).get_level;

              );
              this._onItemMouseOut({
                eventMapTarget: s.get_element(),
                eventMapRelatedTarget: t,
              });
            }
            return (
              n._state == $T.RadMenuItemState.Closed ||
              n._state == $T.RadMenuItemState.AboutToClose ||
              (n._state == $T.RadMenuItemState.AboutToOpen
                ? (n._clearTimeout(),
                  (n._state = $T.RadMenuItemState.Closed),
                  (n.get_parent()._openedItem = null),
                  !0)
                : (this.get_clickToOpen() ||
                    ((n._state = $T.RadMenuItemState.AboutToClose),
                    n._setTimeout(function () {
                      n.close(), (n._timeoutRef = null);
                    }, this.get_collapseDelay())),
                  !0))
            );
          }
        },
        _onItemDragStart: function (e) {
          return e.preventDefault(), !1;
        },
        _onItemClick: function (e) {
          if (!this.get_enabled()) return $telerik.cancelRawEvent(e), !1;
          var t,
            i = this._extractItemFromDomElement(e.eventMapTarget),
            n = e.target,
            s = i.get_parent().get_openedItem();
          return (
            !i.get_isSeparator() &&
            ($T.RadMenu._isTargetToggleButton(n)
              ? (e.preventDefault && e.preventDefault(),
                s && s !== i && s.close(),
                i._toggleState(e),
                !1)
              : (((t = $T.RadMenu._getFirstClickableParent(
                  e.target,
                  i.get_element(),
                )) &&
                  !$(t).hasClass(MENU_LINK_CLASS)) ||
                  ($(e.eventMapTarget).is(DOT + MENU_ITEM_CLASS) &&
                    i.get_linkElement()) ||
                  (i._transferFocus(e),
                  i._click(e),
                  Telerik.Web.Browser.chrome && this.focus(),
                  i._shouldNavigate() || $telerik.cancelRawEvent(e)),
                !1))
          );
        },
        _onItemTouchEnd: function (e) {
          if (!this.get_enabled())
            return e.preventDefault(), void e.stopPropagation();
          var t,
            i = $telerik.getTouchTarget(e),
            n = this._extractItemFromDomElement(i),
            s = n.get_parent(),
            r = s ? s._scroller : null;
          if (!(n.get_isSeparator() || (r && r._touchScrollInAction))) {
            if ((e.stopPropagation(), $T.RadMenu._isTargetToggleButton(i)))
              return e.preventDefault(), void n._toggleState(e);
            if (
              (t = $T.RadMenu._getFirstClickableParent(
                e.target,
                n.get_element(),
              )) &&
              !$(t).hasClass(MENU_LINK_CLASS)
            )
              return !1;
            n._transferFocus(e), n._click(e);
          }
        },
        _onLinkMouseOver: function (e) {
          var t,
            i = e.eventMapRelatedTarget,
            n = this._extractItemFromDomElement(e.eventMapTarget);
          return (
            !n.get_enabled() ||
            ((t = n.get_linkElement()),
            !i ||
              t == i ||
              $telerik.isDescendant(t, i) ||
              ((n._hovered = !0),
              n._updateImageSrc(),
              this._raiseEvent(
                "mouseOver",
                new $T.RadMenuMouseOverEventArgs(n, e),
              )),
            !0)
          );
        },
        _onLinkMouseOut: function (e) {
          var t,
            i = e.eventMapRelatedTarget,
            n = this._extractItemFromDomElement(e.eventMapTarget);
          return (
            !n.get_enabled() ||
            ((t = n.get_linkElement()),
            i && t
              ? (t == i ||
                  $telerik.isDescendant(t, i) ||
                  ((n._hovered = !1),
                  n._updateImageSrc(),
                  this._raiseEvent(
                    "mouseOut",
                    new $T.RadMenuMouseOutEventArgs(n, e),
                  )),
                !0)
              : void 0)
          );
        },
        _onLinkMouseDown: function (e) {
          var t = this._extractItemFromDomElement(e.eventMapTarget);
          return (
            !t.get_enabled() ||
            ((t._clicked = !0), t._updateLinkClass(), t._updateImageSrc(), !0)
          );
        },
        _onLinkMouseUp: function (e) {
          var t = this._extractItemFromDomElement(e.eventMapTarget);
          return (
            !t.get_enabled() ||
            ((Telerik.Web.Browser.chrome ||
              Telerik.Web.Browser.ie ||
              Telerik.Web.Browser.edge) &&
              ((this._preventBlurEvent = !0), this.focus()),
            (t._clicked = !1),
            t._updateLinkClass(),
            t._updateImageSrc(),
            !0)
          );
        },
        _onTemplasteLinkMouseUp: function (e) {
          var t = this._extractItemFromDomElement(e.eventMapTarget),
            i = $T.RadMenu._getFirstClickableParent(e.target, t.get_element());
          return (
            !(!i || $(i).hasClass(MENU_LINK_CLASS)) ||
            !t.get_enabled() ||
            ((Telerik.Web.Browser.chrome ||
              Telerik.Web.Browser.ie ||
              Telerik.Web.Browser.edge) &&
              ((this._preventBlurEvent = !0), this.focus()),
            (t._clicked = !1),
            t._updateLinkClass(),
            t._updateImageSrc(),
            !0)
          );
        },
        _onLinkBlur: function (e) {
          var t =
            this.get_focusedItem() ||
            this._extractItemFromDomElement(e.eventMapTarget);
          return (t._focused = !1), t.blur(e), !0;
        },
        _onLinkFocus: function (e) {
          var t = this._extractItemFromDomElement(e.eventMapTarget);
          return (t._focused = !0), (this._focusedItem = t), this._focus(e), !1;
        },
        _onKeyDown: function (e) {
          var t = this.get_focusedItem();
          return (
            !($(e.target).closest(".rmTemplate").length > 0 || !t) &&
            this._keyboardNavigator._onKeyDown(e, t)
          );
        },
        _onLinkClick: function (e) {
          var t = e.target;
          this._extractItemFromDomElement(t)._click(e);
        },
        _onToggleClick: function (e) {
          var t = e.target;
          this._extractItemFromDomElement(t)._open(e);
        },
        _onParentItemClick: function (e) {
          var t = e.target;
          this._extractItemFromDomElement(t)._close(e);
        },
        _onOrientationChange: function () {
          this._opened && this._positionPopUpContainer(), this.repaint();
        },
        _animatePopUp: function () {
          var e,
            t = this,
            i = $(this._getPopUpElement()),
            n = $(this._getRootToggleElement()),
            s = $(this._getAnimationContainerElement()),
            r = this._opened
              ? this.get_collapseAnimation()
              : this.get_expandAnimation(),
            a = { height: this._opened ? 0 : this._animatedHeight },
            o = r.get_duration(),
            l = $T.AnimationType.toEasing(r.get_type());
          this.get_enabled() &&
            (this._opened
              ? (i.addClass(MENU_HIDDEN_POINTER_CLASS),
                (e = function () {
                  i.hide(), t._restoreState();
                }))
              : (i.removeClass(MENU_HIDDEN_POINTER_CLASS), i.show()),
            (this._opened = !this._opened),
            n.toggleClass(MENU_EXPANDED_CLASS, this._opened),
            s.stopTransition(),
            "easeNone" !== l ? s.transition(a, o, l, e) : (s.css(a), e && e()));
        },
        _sizeAnimationContainer: function () {
          var e,
            t = $(this._getPopUpElement()),
            i = $(this.get_childListElement()),
            n = $(this._getAnimationContainerElement()),
            s = parseInt(this._popUpHeight, 10),
            r = {
              "max-height": Math.round(
                0.6 * document.documentElement.clientHeight,
              ),
            };
          this._opened || t.show(),
            n.css(r),
            n.height("auto"),
            i.height("auto"),
            (e = n.height()) > 0 && (this._animatedHeight = e),
            isNaN(s) || (n.css("max-height", s), (this._animatedHeight = s)),
            i.length > 0 &&
              (i.height(this._animatedHeight),
              "" === n.get(0).style.width &&
                i[0].scrollHeight > i.height() &&
                n.width(n.width() + Telerik.Web.Browser.scrollBarWidth)),
            this._opened
              ? n.height(this._animatedHeight)
              : (n.height(0), t.hide());
        },
        _purgeEmptyGroup: function (e) {
          if ((e == this && e.hide ? e.hide() : e.close(), this._isMobile))
            this._purgeEmptyGroupMobile(e);
          else {
            $T.RadMenu._removeChildListCorners(e),
              $T.RadMenu._removeScrollWrapContainer(e);
            var t = $telerik.getFirstChildByTagName(e.get_element(), "div", 0);
            this !== e &&
              this.get_showToggleHandle() &&
              e._removeToggleButton(),
              e._originalExpandMode && e.set_expandMode(e._originalExpandMode),
              e._slideWrapElement &&
                ($telerik.isIE &&
                  !$telerik.isIE10Mode &&
                  (e._slideWrapElement.outerHTML = ""),
                (e._slideWrapElement = null),
                (e._scrollWrapElement = null)),
              (e._linkElement = null),
              (e._childListElement = null),
              (e._animatedElement = null),
              (e._animationContainer = null),
              (e._itemsLoaded = !1),
              (e._hasItems = !1),
              e._updateTextElementClass && e._updateTextElementClass(),
              this._enableRootItemScroll && (e._childrenDetached = !1),
              e != this &&
                (e._slide && (e._slide.dispose(), (e._slide = null)),
                $telerik.isIE && t && (t.outerHTML = ""),
                t && t.parentNode && t.parentNode.removeChild(t),
                (t = null));
          }
        },
        _purgeEmptyGroupMobile: function (e) {
          $(e.get_childListElement()).remove(),
            this !== e && e._removeToggleButton(),
            (e._childListElement = null),
            (e._parentItemElement = null),
            (e._childrenDetached = !1),
            (e._itemsLoaded = !1),
            (e._hasItems = !1);
        },
        _childrenCleared: function (e) {
          (e == this || e._getHasItems()) &&
            (this._purgeEmptyGroup(e),
            $T.RadMenu.callBaseMethod(this, "_childrenCleared", [e]));
        },
        _childInserting: function (e, t, i) {
          if (i != this && i.get_hasContentTemplate())
            throw new Error(
              "Cannot add items to an RadMenuItem, which has ContentTemplate.",
            );
          i._childControlsCreated && this._backupClientState();
        },
        _childInserted: function (e, t, i) {
          this._restoreClientState(),
            i._setHasItems && i._setHasItems(!0),
            $T.RadMenu.callBaseMethod(this, "_childInserted", [e, t, i]),
            this._isMobile
              ? i !== this &&
                (i._ensureToggleButton(), i._ensureChildrenParent())
              : (i._updateTextElementClass && i._updateTextElementClass(),
                i._state &&
                  i._state === $T.RadMenuItemState.Open &&
                  this._renderMode === $T.RenderMode.Classic &&
                  (t._getWidth() > 0 && $T.RadMenu._adjustChildrenWidth(i),
                  i._updateColumnWrapSize()),
                i == this &&
                  this._enableRootItemScroll &&
                  this._initializeScroller(),
                this.get_showToggleHandle() &&
                  i !== this &&
                  i._ensureToggleButton());
        },
        _attachChildItem: function (e, t, i) {
          if (i != this && i._hasMultipleColumns()) {
            i.get_childListElement() || i._createChildListElement();
            var n,
              s,
              r = e.get_nextSibling();
            r
              ? (n = r.get_element()).parentNode.insertBefore(t, n)
              : ((s = i._getColumnForItem(e)),
                $(s).children(".rmGroup").append(t),
                i._recalculateColumns());
          } else $T.RadMenu.callBaseMethod(this, "_attachChildItem", [e, t, i]);
        },
        _childRemoving: function (e) {
          e.set_selected(!1),
            e._cacheDomProperties(),
            this._backupClientState(),
            $T.RadMenu.callBaseMethod(this, "_childRemoving", [e]);
        },
        _childRemoved: function (e, t) {
          this._restoreClientState(), e.get_text();
          var i = e.get_element();
          0 == t.get_items().get_count() && t !== this
            ? this._purgeEmptyGroup(t)
            : ($telerik.isIE && (i.outerHTML = ""),
              i.parentNode && i.parentNode.removeChild(i),
              (i = null)),
            $T.RadMenu.callBaseMethod(this, "_childRemoved", [e, t]),
            this._isMobile ||
              (t._state &&
                t._state === $T.RadMenuItemState.Open &&
                this._renderMode === $T.RenderMode.Classic &&
                ($T.RadMenu._adjustChildrenWidth(t, !0),
                t._updateColumnWrapSize()),
              t == this &&
                this._enableRootItemScroll &&
                this._initializeScroller(),
              $T.RadMenu._updateChildrenPositionClass(t));
        },
        _backupClientState: function () {
          this._backupSelectedItem = this.get_selectedItem();
        },
        _restoreClientState: function () {
          this._backupSelectedItem &&
            this._registerSelectedItem(this._backupSelectedItem);
        },
        _getExtendedItemClickingEventArgs: function (e) {
          return e;
        },
        _getExtendedItemClickedEventArgs: function (e) {
          return e;
        },
        _incrementZIndex: function (e) {
          0 == this._zIndexIncrementDepth &&
            (this.get_element().style.zIndex = this._originalZIndex + e);
          this._zIndexIncrementDepth++;
        },
        _restoreZIndex: function () {
          (this._zIndexIncrementDepth > 0 && this._zIndexIncrementDepth--,
          0 == this._zIndexIncrementDepth) &&
            (this.get_element().style.zIndex = this._originalZIndex);
        },
        _restoreState: function () {
          if (!this.get_maintainState()) {
            var e = function (t) {
              t._openedItem && (e(t._openedItem), (t._openedItem = null));
            };
            e(this),
              $(this.get_childListElement())
                .stopTransition()
                .css(rootGroupStyle),
              $(this._getPopUpElement())
                .find(".rmGroup:not(.rmRootGroup)")
                .css(childGroupStyle);
          }
        },
        _getMainElement: function () {
          return this.get_element();
        },
        _initRightToLeft: function () {
          (this._getMainElement().dir = "ltr"), this._applyRtlStyles();
        },
        _applyRtlStyles: function () {
          var e = MENU_RTL_CLASS;
          this._skin && (e += " RadMenu_" + this._skin + "_rtl"),
            $(this._getMainElement()).addClass(e);
        },
        _postback: function (hierarchicalIndex) {
          if (this._postBackReference) {
            var postbackFunction = this._postBackReference.replace(
              "arguments",
              hierarchicalIndex,
            );
            eval(postbackFunction);
          }
        },
        _raiseEvent: function (e, t) {
          this._fireEvents && this.raiseEvent(e, t);
        },
        _adjustRootItemWidth: function () {
          $T.RadMenu._adjustRootItemWidth(
            this.get_id(),
            this.get_childListElement(),
          );
        },
      }),
      $.registerControlProperties($T.RadMenu, {
        clicked: !1,
        dataBindings: null,
        odataClientSettings: null,
        enableRootItemScroll: !1,
        enableRoundedCorners: !1,
        enableShadows: !1,
        enableImageSprites: !1,
        showToggleHandle: !1,
        clientTemplate: null,
        loadingTemplate: "",
        enableScreenBoundaryDetection: !0,
        enableAutoScroll: !1,
        enableSelection: !0,
        autoScrollMinimumHeight: 50,
        autoScrollMinimumWidth: 50,
        clickToOpen: !1,
        collapseDelay: 500,
        expandDelay: 10,
        enableAriaSupport: !1,
      }),
      $.registerControlEvents($T.RadMenu, [
        "load",
        "menuPopulating",
        "menuPopulated",
        "itemFocus",
        "itemBlur",
        "itemOpening",
        "itemOpened",
        "itemClosing",
        "itemClosed",
        "itemPopulating",
        "itemPopulated",
        "itemPopulationFailed",
        "templateDataBound",
        "mouseOver",
        "mouseOut",
        "itemClicked",
        "itemClicking",
      ]),
      $T.RadMenu.registerClass(
        "Telerik.Web.UI.RadMenu",
        $T.ControlItemContainer,
      );
  })($telerik.$),
  (function (e, t, i) {
    (t.RadMenu.GetView = function (e, i) {
      var n = e._renderMode,
        s = t.RadMenuItem.Views;
      return n == t.RenderMode.Classic ? new s.Classic(i) : new s.Lite(i);
    }),
      (t.RadMenu.ExtendWithView = function (e, i, n) {
        var s = e._renderMode,
          r = t.RadMenu.StaticViews;
        s == t.RenderMode.Classic ? r.Classic[n](i) : r.Lite[n](i);
      }),
      (t.RadMenu._expandItemsRecursively = function (e, t) {
        for (var i = t.split(":"), n = e, s = 0, r = i.length; s < r; s++) {
          var a = n.get_items().getItem(i[s]);
          a.open(), (n = a);
        }
      }),
      (t.RadMenu._getFirstClickableParent = function (t, i) {
        for (
          var n = [
              "select",
              "option",
              "a",
              "input",
              "textarea",
              "button",
              "label",
              "area",
            ],
            s = t;
          s != i;

        ) {
          if (-1 != e.inArray(s.tagName.toLowerCase(), n)) return s;
          s = s.parentNode;
        }
        return null;
      }),
      (t.RadMenu._isTargetToggleButton = function (e) {
        return e && ("rmToggle" == e.className || "rmIcon" == e.className);
      }),
      (t.RadMenu._createChildControls = function (t, i) {
        var n,
          s = t.get_itemData();
        s &&
          t.get_childListElement() &&
          ((n = t._getControl()),
          e(t._getChildElements()).each(function (e) {
            var t = n.createMenuItem();
            i.add(t), t._initialize(s[e], this);
          }));
      }),
      (t.RadMenu._adjustChildrenWidth = function (e, i) {
        var n,
          s = e.get_items(),
          r = s.get_count();
        if (i) for (var a = 0; a < r; a++) s.getItem(a)._clearWidth();
        (n = t.RadMenu._getMaxChildWidth(e) + "px"),
          ($telerik.isChrome || $telerik.isSafari) &&
            e._control &&
            e._control._enableRootItemScroll &&
            (e._childListElement.style.width = n),
          t.RadMenu._setChildrenWidth(e, n);
      }),
      (t.RadMenu._getMaxChildWidth = function (t) {
        for (
          var i = 0,
            n = t._getControl(),
            s = t.get_items(),
            r = s.get_count(),
            a = 0;
          a < r;
          a++
        ) {
          if (n.get_rightToLeft()) {
            var o = s.getItem(a).get_imageElement();
            o && ((o.style.styleFloat = "left"), (o.style.cssFloat = "left"));
          }
          var l = s.getItem(a)._getWidth();
          i = Math.max(l, i);
        }
        if (t.get_groupSettings) {
          var _ = t.get_groupSettings().get_width();
          if (_) {
            var u = e(t.get_childListElement()),
              d = parseFloat(e(u).css("padding-left")),
              h = parseFloat(e(u).css("padding-right"));
            i = parseInt(_, 10) - d - h;
          }
        }
        return i;
      }),
      (t.RadMenu._setChildrenWidth = function (e, t) {
        for (
          var i = e._getControl(), n = e.get_items(), s = n.get_count(), r = 0;
          r < s;
          r++
        ) {
          if (i.get_rightToLeft()) {
            var a = n.getItem(r).get_imageElement();
            a && ((a.style.styleFloat = "right"), (a.style.cssFloat = "right"));
          }
          n.getItem(r)._setWidth(t);
        }
      }),
      (t.RadMenu._adjustRootItemWidth = function (e, i) {
        var n = $get(e),
          s = t.RadMenu._getMaxRootItemWidth(n, i || null);
        t.RadMenu._setRootItemWidth(n, s, i || null);
      }),
      (t.RadMenu._getChildListElement = function (e) {
        var t = $telerik.getFirstChildByTagName(e, "ul", 0);
        if (!t) {
          var i = $telerik.getFirstChildByTagName(e, "div", 0);
          if (!(t = $telerik.getFirstChildByTagName(i, "ul", 0))) {
            var n = i;
            (i = $telerik.getFirstChildByTagName(n, "div", 0)),
              (t = $telerik.getFirstChildByTagName(i, "ul", 0));
          }
        }
        return t;
      }),
      (t.RadMenu._getMaxRootItemWidth = function (i, n) {
        n || (n = t.RadMenu._getChildListElement(i));
        for (
          var s = e(n).children(".rmItem"), r = s.length, a = 0, o = 0;
          o < r;
          o++
        ) {
          var l = s[o];
          if (3 !== l.nodeType) {
            var _,
              u = $telerik.getFirstChildByTagName(l, "a", 0);
            (_ = u ? u.offsetWidth : l.offsetWidth), (a = Math.max(a, _));
          }
        }
        return a;
      }),
      (t.RadMenu._setRootItemWidth = function (e, i, n) {
        n || (n = t.RadMenu._getChildListElement(e));
        var s = $telerik.getPaddingBox(n).horizontal,
          r = $telerik.getBorderBox(n).horizontal;
        0 != i &&
          ($telerik.isSafari && (n.style.width = i),
          "" === e.style.width &&
            t.RadMenu._requiresRightToLeft(e) &&
            (e.style.width = i + s + r + "px"));
      }),
      (t.RadMenu._requiresRightToLeft = function (t) {
        for (var i = t; 9 !== i.nodeType; ) {
          if ("rtl" == i.dir) return !0;
          if ("rtl" == e(i).css("direction")) return !0;
          i = i.parentNode;
        }
        return !1;
      }),
      (t.RadMenu._adjustListWidth = function (i, n) {
        var s = e(i.get_childListElement()),
          r = 0;
        s.find(".rmItem").each(function () {
          if (e(this).is(":visible")) {
            if ($telerik.isIE7 || $telerik.isIE8) r += e(this).outerWidth(!0);
            else {
              var t = Math.ceil(
                  parseFloat(
                    window.getComputedStyle(this).getPropertyValue("width"),
                  ),
                ),
                i =
                  parseInt(e(this).css("border-left-width"), 10) +
                  parseInt(e(this).css("border-right-width"), 10),
                n = Math.ceil(
                  parseFloat(e(this).css("padding-left")) +
                    parseFloat(e(this).css("padding-right")),
                ),
                s = Math.ceil(
                  parseFloat(e(this).css("margin-left")) +
                    parseFloat(e(this).css("margin-right")),
                );
              r += t + i + n + s;
            }
            this.style.clear = "none";
          }
        }),
          (n = n || 0),
          n++,
          r > 0
            ? (($telerik.isIE9Mode || parseFloat(s.css("font-size")) > 12) &&
                (r += 3),
              (s[0].style.width = Math.ceil(r) + "px"))
            : n < 3 &&
              setTimeout(function () {
                t.RadMenu._adjustListWidth(i, n);
              }, 0);
      }),
      (t.RadMenu._getViewPortSize = function () {
        var e = $telerik.getViewPortSize(),
          t = "CSS1Compat" != document.compatMode;
        return (
          (($telerik.isFirefox && t) || Telerik.Web.Browser.edge) &&
            (e.height += document.body.scrollTop),
          e
        );
      }),
      (t.RadMenu._updateChildrenPositionClass = function (t) {
        var i = function (t) {
          e(t)
            .children(".rmItem")
            .filter(function () {
              return this._item && this._item.get_visible();
            })
            .removeClass("rmFirst rmLast")
            .filter(":first")
            .addClass("rmFirst")
            .end()
            .filter(":last")
            .addClass("rmLast");
        };
        if (t) {
          var n = t.get_childListElement();
          n &&
            (e(n).is(".rmMultiColumn")
              ? e(n)
                  .find("> .rmGroupColumn > ul")
                  .each(function () {
                    i(this);
                  })
              : i(n));
        }
      }),
      (t.RadMenu._removeChildListCorners = function (t) {
        e(t.get_childListElement())
          .find(
            ".rmTopRight, .rmBottomLeft, .rmBottomRight, .rmTopFix, .rmBottomFix",
          )
          .remove(),
          (t._roundedCornersRendered = !1),
          (t._shadowsRendered = !1);
      }),
      (t.RadMenu._removeScrollWrapContainer = function (t) {
        if (t._slide) {
          var i = e(t._getScrollWrapElement()).appendTo(
            t._slide.get_element(),
          )[0];
          i &&
            (e(t.get_element()).find(".rmScrollWrapContainer").remove(),
            t._slide.set_animatedElement(i)),
            (t._roundedCornersRendered = !1),
            (t._shadowsRendered = !1);
        }
      }),
      (t.RadMenu._renderCornerElements = function (t, i) {
        var n = e(t._getScrollWrapElement()),
          s =
            '<{0} class="rmTopRight"></{0}><{0} class="rmBottomLeft"></{0}><{0} class="rmBottomRight"></{0}><{0} class="rmTopFix"></{0}><{0} class="rmBottomFix"></{0}>';
        if (
          (i &&
            (s =
              '<{0} class="rmTopRight rmTopShadowRight"></{0}><{0} class="rmBottomLeft rmBottomShadowLeft"></{0}><{0} class="rmBottomRight rmBottomShadowRight"></{0}>'),
          t.get_hasContentTemplate && t.get_hasContentTemplate())
        )
          (s = String.format(s, "span")),
            e(t._getContentTemplateContainer()).prepend(s);
        else if (((s = String.format(s, "li")), n.length)) {
          var r = e(t.get_element()).find(".rmScrollWrapContainer");
          r.length ||
            ((r = e('<div class="rmScrollWrapContainer">')
              .append(n)
              .appendTo(t._getAnimationContainer())),
            (t._animatedElement = r[0]),
            t._slide.set_animatedElement(t._getAnimatedElement())),
            r.prepend(s);
        } else e(t.get_childListElement()).prepend(s);
      }),
      (t.RadMenu._preloadItemImages = function (e) {
        var i = [
            "imageUrl",
            "hoveredImageUrl",
            "expandedImageUrl",
            "disabledImageUrl",
            "clickedImageUrl",
            "selectedImageUrl",
          ],
          n = function (e) {
            for (var s = 0; s < e.length; s++) {
              for (var r = e[s], a = 0; a < i.length; a++) {
                var o = r[i[a]];
                o && t.RadMenu._preloadImage(o);
              }
              r.items && n(r.items);
            }
          };
        n(e);
      }),
      (t.RadMenu._preloadImage = function (e) {
        new Image().src = e;
      }),
      (t.RadMenu._resolveDirectionFromClass = function (e) {
        return e
          .match(/rm(Left|Right|Top|Bottom)Arrow/gi)[0]
          .replace(/rm(Left|Right|Top|Bottom)Arrow/gi, function () {
            return arguments[1];
          });
      });
  })($telerik.$, Telerik.Web.UI),
  (function (e, t, i) {
    (t.RadMenu.KeyboardNavigator = function (e) {
      (this._owner = e), (this._item = null);
    }),
      (t.RadMenu.KeyboardNavigator.prototype = {
        _dispose: function () {
          (this._owner = null), (this._item = null);
        },
        _onKeyDown: function (e, i) {
          this._item = i;
          var n = e.originalEvent.code,
            s = this._owner.get_rightToLeft(),
            r = this._item._getParentFlow();
          switch (n) {
            case "Tab":
              return (
                e.target !== this._owner.get_element() &&
                  i &&
                  i.get_level() > 0 &&
                  this._owner.get_element().focus(),
                this._item.blur(e),
                this._owner.close(),
                !0
              );
            case "ArrowUp":
              this._onKeyboardUp(e);
              break;
            case "ArrowDown":
              this._onKeyboardDown(e);
              break;
            case "ArrowLeft":
              s && r === t.ItemFlow.Horizontal
                ? this._onKeyboardRight(e)
                : this._onKeyboardLeft(e);
              break;
            case "ArrowRight":
              s && r === t.ItemFlow.Horizontal
                ? this._onKeyboardLeft(e)
                : this._onKeyboardRight(e);
              break;
            case "Space":
            case "Enter":
            case "NumpadEnter":
              return this._item.get_enabled()
                ? (this._item.get_linkElement() &&
                    this._item.get_linkElement().click(),
                  this._item._shouldNavigate() || this._onKeyboardSpace(e),
                  (this._item = null),
                  e.preventDefault(),
                  e.stopPropagation(),
                  !1)
                : (e.preventDefault(), !0);
            case "Escape":
              this._onKeyboardEsc(e);
              break;
            default:
              return (this._item = null), !0;
          }
          return (this._item = null), e.preventDefault(), !1;
        },
        _onKeyboardSpace: function (e) {
          this._item.focusFirstChild(e);
        },
        _onKeyboardUp: function (e) {
          if (this._item._getParentFlow() == t.ItemFlow.Vertical)
            this._item.focusPreviousItem(e);
          else {
            if (!this._item.get_enabled()) return !0;
            this._item.focusLastChild(e);
          }
        },
        _onKeyboardDown: function (e) {
          if (this._item._getParentFlow() == t.ItemFlow.Vertical)
            this._item.focusNextItem(e);
          else {
            if (!this._item.get_enabled()) return !0;
            this._item.focusFirstChild(e);
          }
        },
        _onKeyboardLeft: function (e) {
          if (this._item._getParentFlow() != t.ItemFlow.Horizontal) {
            var i = this._item.get_items(),
              n = this._item.get_groupSettings();
            if (
              i.get_count() > 0 &&
              n.get_expandDirection() == t.ExpandDirection.Left
            )
              return (
                !this._item.get_enabled() || void this._item.focusFirstChild(e)
              );
            var s = this._item.get_parent(),
              r = null;
            if (
              (s.get_groupSettings && (r = s.get_groupSettings()),
              r && r.get_expandDirection() == t.ExpandDirection.Right)
            )
              s._transferFocus(e);
            else {
              var a = this._owner.get_openedItem();
              a && a.focusPreviousItem(e);
            }
          } else this._item.focusPreviousItem(e);
        },
        _onKeyboardRight: function (e) {
          if (this._item._getParentFlow() != t.ItemFlow.Horizontal) {
            var i = this._item.get_items(),
              n = this._item.get_groupSettings();
            if (
              i.get_count() > 0 &&
              n.get_expandDirection() == t.ExpandDirection.Right
            )
              return (
                !this._item.get_enabled() || void this._item.focusFirstChild(e)
              );
            var s = this._item.get_parent(),
              r = null;
            if (
              (s.get_groupSettings && (r = s.get_groupSettings()),
              r && r.get_expandDirection() == t.ExpandDirection.Left)
            )
              s._transferFocus(e);
            else {
              var a = this._owner.get_openedItem();
              a && a.focusNextItem(e);
            }
          } else this._item.focusNextItem(e);
        },
        _onKeyboardEsc: function (e) {
          var t = this._item.get_parent();
          t == this._owner
            ? this._item._setFocused(!1, e)
            : (t._close(e), t._transferFocus(e));
        },
      });
  })($telerik.$, Telerik.Web.UI),
  (function (e, t, i) {
    var n = Sys.Serialization.JavaScriptSerializer;
    (t.RadMenu.prototype.get_hierarchyModel = function () {
      var e = this.get_odataClientSettings();
      e.ExpandMode = t.MenuItemExpandMode.WebService;
      var i = this.get_dataBindings();
      return (
        i && (i[i.length - 1].ExpandMode = t.MenuItemExpandMode.ClientSide),
        (e.DataBindings = i),
        t.RadODataDataSource.Binder.Hierarhical.Model(e)
      );
    }),
      (t.RadMenu.prototype._initializeODataSourceBinder = function () {
        var i = this;
        setTimeout(function () {
          var n = i.get_odataClientSettings().ODataSourceID,
            s = $find(n);
          if (s) {
            (i._hierarhicalBinder = new t.RadODataDataSource.Binder.Hierarhical(
              s,
              i,
            )),
              i._hierarhicalBinder.initialize(),
              e.raiseCancellableControlEvent(i, "menuPopulating", {}) ||
                i._onDataNeeded();
          } else {
            var r = String.format(
              "DataSource with id {0} was not found on the page",
              n,
            );
            alert(r);
          }
        }, 1);
      }),
      (t.RadMenu.prototype._onDataNeeded = function (e) {
        var t = {
          level: e != i ? 1 + e.get_level() : 0,
          key: e != i ? e.get_key() : "null",
          events: {
            requesting: function (t) {
              if (e) {
                var i = new Telerik.Web.UI.WebServiceLoaderEventArgs(e);
                this._onItemLoadingStarted(this, i);
              }
            },
            success: function (t) {
              var i = e || this,
                n = new Telerik.Web.UI.WebServiceLoaderSuccessEventArgs(t, i);
              this._onItemLoadingSuccess(this, n);
            },
            fail: function (t) {
              var i = e || this,
                n = new Telerik.Web.UI.WebServiceLoaderErrorEventArgs(
                  t.get_message(),
                  i,
                );
              this._onItemLoadingError(this, n);
            },
          },
        };
        this._hierarhicalBinder.fetch(t);
      }),
      (t.RadMenu.prototype.get_webServiceSettings = function () {
        return this._webServiceSettings;
      }),
      (t.RadMenu.prototype.set_webServiceSettings = function (e) {
        var i = n.deserialize(e);
        i.ODataSettings
          ? (this._webServiceSettings = new t.NavigationControlODataSettings(i))
          : (this._webServiceSettings = new t.WebServiceSettings(i));
      }),
      (t.RadMenu.prototype._initializeWebServiceLoader = function () {
        this.get_webServiceSettings().get_isOData()
          ? (this._webServiceLoader = new t.NavigationControlODataLoader(
              this.get_webServiceSettings(),
              function (e) {
                return e.length > 0
                  ? t.MenuItemExpandMode.WebService
                  : t.MenuItemExpandMode.ClientSide;
              },
            ))
          : (this._webServiceLoader = new t.WebServiceLoader(
              this.get_webServiceSettings(),
            )),
          this._webServiceLoader.add_loadingStarted(
            Function.createDelegate(this, this._onItemLoadingStarted),
          ),
          this._webServiceLoader.add_loadingSuccess(
            Function.createDelegate(this, this._onItemLoadingSuccess),
          ),
          this._webServiceLoader.add_loadingError(
            Function.createDelegate(this, this._onItemLoadingError),
          );
      }),
      (t.RadMenu.prototype._loadChildrenFromWebService = function (e) {
        this._webServiceLoader || this._initializeWebServiceLoader();
        var i = {},
          n = new t.RadMenuItemPopulatingEventArgs(e, i);
        if ((this._raiseEvent("itemPopulating", n), !n.get_cancel())) {
          var s = {
            Text: e.get_text(),
            Value: e.get_value(),
            ExpandMode: e.get_expandMode(),
          };
          e.get_attributes().get_count() > 0 &&
            (s.Attributes = e.get_attributes()._data);
          var r = { item: s, context: i };
          if (this.get_webServiceSettings().get_isWcf())
            (r.context =
              this._webServiceLoader._serializeDictionaryAsKeyValuePairs(
                r.context,
              )),
              r.item.Attributes &&
                (r.item.Attributes =
                  this._webServiceLoader._serializeDictionaryAsKeyValuePairs(
                    r.item.Attributes,
                  ));
          else if (this.get_odataClientSettings())
            return void this._onDataNeeded(e);
          this._webServiceLoader.loadData(r, e);
        }
      }),
      (t.RadMenu.prototype._onItemLoadingStarted = function (e, t) {
        t.get_context()._onChildrenLoading();
      }),
      (t.RadMenu.prototype._onItemLoadingSuccess = function (i, n) {
        var s,
          r = n.get_data(),
          a = n.get_context(),
          o = a.get_items(),
          l = this.get_webServiceSettings().get_isWcf();
        for (s = 0; s < r.length; s++) {
          var _ = r[s],
            u = this.createMenuItem();
          u._loadFromDictionary(_, l),
            (u._renderedClientTemplate = t.TemplateRenderer.renderTemplate(
              _,
              this,
              u,
            )),
            "" === u.get_navigateUrl() && u.set_navigateUrl("#"),
            o.add(u);
        }
        if (
          (a._onChildrenLoaded && a._onChildrenLoaded(),
          this.get_persistLoadOnDemandItems())
        ) {
          this.trackChanges(),
            a.set_expandMode &&
              a.set_expandMode(t.MenuItemExpandMode.ClientSide);
          var d = o.get_count();
          for (s = 0; s < d; s++) this._log.logInsert(o.getItem(s));
          this.commitChanges();
        }
        if (
          (this._isMobile && this === a && this._sizeAnimationContainer(),
          e(a.get_element()).is(".rmItem"))
        ) {
          var h = new t.RadMenuItemPopulatedEventArgs(a);
          this._raiseEvent("itemPopulated", h);
        } else e.raiseControlEvent(this, "menuPopulated", {});
      }),
      (t.RadMenu.prototype._onItemLoadingError = function (e, i) {
        var n,
          s = i.get_message(),
          r = i.get_context();
        r._onChildrenLoadingError && r._onChildrenLoadingError(),
          (n = new t.RadMenuItemPopulationFailedEventArgs(r, s)),
          this._raiseEvent("itemPopulationFailed", n),
          n.get_cancel() || alert(s);
      }),
      (t.RadMenu.prototype._initializeClientDataSource = function () {
        this._clientDataSourceID &&
          ((this._clientDataSource = $find(this._clientDataSourceID)),
          this._loadChildrenFromClientDataSource(this)),
          Sys.Application.remove_load(this._cdInitDelegate);
      }),
      (t.RadMenu.prototype._loadChildrenFromClientDataSource = function (e) {
        var i = new t.RadMenuItemPopulatingEventArgs(e, {});
        this._raiseEvent("itemPopulating", i),
          i.get_cancel() || this._requestDataFromClientDataSource(e);
      }),
      (t.RadMenu.prototype._requestDataFromClientDataSource = function (e) {
        var t,
          i = this._clientDataSource,
          n = this;
        (t = e.get_key ? e.get_key() : null),
          0 == i.get_data().length
            ? i.fetch(function () {
                n._processClientDataSourceData(t, e);
              })
            : n._processClientDataSourceData(t, e);
      }),
      (t.RadMenu.prototype._processClientDataSourceData = function (e, t) {
        var i = this,
          n = this._clientDataSource;
        n.get_filterExpressions().clear(),
          n
            .get_filterExpressions()
            .add([{ fieldName: this._dataFieldParentID, value: e }]),
          n.fetch(function () {
            var e = n.view();
            i._loadItemsFromData(e, t);
          });
      }),
      (t.RadMenu.prototype._loadItemsFromData = function (e, t) {
        for (
          var i = [], n = e.length, s = this._clientDataSource, r = 0;
          r < n;
          r++
        ) {
          var a = e[r],
            o = 0,
            l = a[this._dataFieldID];
          s.get_filterExpressions().clear(),
            s
              .get_filterExpressions()
              .add([{ fieldName: this._dataFieldParentID, value: l }]),
            s.view().length > 0 && (o = 1),
            i.push({
              ExpandMode: o,
              Key: a[this._dataFieldID],
              NavigateUrl: a[this._dataNavigateUrlField],
              ParentID: a[this._dataFieldParentID],
              Text: a[this._dataTextField],
              Value: a[this._dataValueField],
            });
        }
        var _ = {
          _data: i,
          _context: t,
          get_data: function () {
            return this._data;
          },
          get_context: function () {
            return this._context;
          },
        };
        this._onItemLoadingSuccess(this, _);
      });
  })($telerik.$, Telerik.Web.UI),
  (function (e, t, i) {
    (t.RadMenu.prototype._initializeScroller = function () {
      if (!this._childControlsCreated) return null;
      var e = this._getScrollWrapElement(),
        i = this.get_childListElement();
      if (e && i) {
        var n = null;
        this._scroller &&
          ((n = this._scroller.get_currentPosition()),
          this._scroller.dispose()),
          (this._scroller = new t.MenuItemScroller(
            this,
            this.get_childListElement(),
            this._flow,
          )),
          (i.style.display = "block");
        var s = this._flow == t.ItemFlow.Horizontal;
        s
          ? t.RadMenu._adjustListWidth(this)
          : (t.RadMenu._adjustChildrenWidth(this),
            this.get_rightToLeft() &&
              $telerik.isIE &&
              i.firstChild &&
              ((i.style.width = i.firstChild.offsetWidth + "px"),
              (i.parentNode.style.width = i.offsetWidth + "px"))),
          this._scroller.initialize(),
          this._scroller.updateState(),
          null !== n && this._scroller.set_currentPosition(n),
          this.get_rightToLeft() &&
            s &&
            ((i.style.cssFloat = "left"), this._scroller.scrollToMaxPosition());
      }
    }),
      (t.RadMenu.prototype._getScrollableParent = function (e) {
        var t = this._extractItemFromDomElement(e);
        return !t && this._scroller && (t = this), t;
      }),
      (t.RadMenu.prototype._changeScrollSpeed = function (e, t) {
        var i = this._getScrollableParent(e)._scroller;
        i && i.changeScrollSpeed(t);
      }),
      (t.RadMenu.prototype._startScroll = function (e, i) {
        var n = this._getScrollableParent(e),
          s = n._scroller;
        if (s) {
          var r = 1,
            a = n.get_openedItem();
          (i != t.ArrowPosition.Top && i != t.ArrowPosition.Left) || (r = -1),
            a && a.close(),
            s.startScroll(t.ScrollerSpeed.Slow, r);
        }
      }),
      (t.RadMenu.prototype._stopScroll = function (e) {
        var t = this._getScrollableParent(e)._scroller;
        t && t.stopScroll();
      }),
      (t.RadMenu.prototype._onItemMousewheel = function (e) {
        var i = e.originalEvent,
          n = i.wheelDelta ? i.wheelDelta : -i.detail,
          s = t.ScrollerSpeed.MousewheelDefault,
          r = this._getScrollableParent(e.target),
          a = r && r.get_parent ? r.get_parent() : null,
          o = a ? a._scroller : null;
        o && (o.scrollRelative(n > 0 ? -s : s), e.preventDefault());
      }),
      (t.RadMenu.prototype._onArrowMouseDown = function (e) {
        this._changeScrollSpeed(e, t.ScrollerSpeed.Fast);
      }),
      (t.RadMenu.prototype._onArrowMouseUp = function (e) {
        this._changeScrollSpeed(e, t.ScrollerSpeed.Slow);
      }),
      (t.RadMenu.prototype._onArrowMouseOver = function (e, i) {
        this._startScroll(e, t.ArrowPosition[i]);
      }),
      (t.RadMenu.prototype._onArrowMouseOut = function (e) {
        this._stopScroll(e);
      });
  })($telerik.$, Telerik.Web.UI),
  (function (e, t, i) {
    var n = e.proxy,
      s = "rmItem",
      r = "touchstart",
      a = "touchend",
      o = "touchmove",
      l = ".";
    (t.MenuItemScroller = function (e, i, n) {
      (this._owner = e),
        (this._menu = this._owner.get_menu
          ? this._owner.get_menu()
          : this._owner),
        (this._leftArrowCssClass = "rmLeftArrow"),
        (this._rightArrowCssClass = "rmRightArrow"),
        (this._topArrowCssClass = "rmTopArrow"),
        (this._bottomArrowCssClass = "rmBottomArrow"),
        (this._leftArrowDisabledCssClass = "rmLeftArrowDisabled"),
        (this._rightArrowDisabledCssClass = "rmRightArrowDisabled"),
        (this._topArrowDisabledCssClass = "rmTopArrowDisabled"),
        (this._bottomArrowDisabledCssClass = "rmBottomArrowDisabled"),
        (this._arrowsZIndex = 2),
        (this._scroller = null),
        (this._childListElement = i),
        (this._scrollElement = null),
        (this._orientation = null),
        (this._minScrollPosition = null),
        (this._itemFlow = n),
        (this._scrollerPositionChangedDelegate = null),
        (this._decArrow = null),
        (this._incArrow = null),
        (this._rtl = t.RadMenu._requiresRightToLeft(i)),
        (this._isUsedOnTouchDevices = $telerik.isTouchDevice),
        (this._initialTouchLocation = 0),
        (this._previousScrollLocation = 0),
        (this._touchScrollInAction = !1),
        (this._timeOut = null);
    }),
      (t.MenuItemScroller.prototype = {
        initialize: function () {
          if (
            (t.RadMenu.ExtendWithView(
              this._menu,
              this,
              "ExtendScrollerWithView",
            ),
            (this._childListElement.style.position = "relative"),
            (this._scrollElement = this._childListElement.parentNode),
            (this._orientation = t.ScrollerOrientation.Horizontal),
            this._itemFlow == t.ItemFlow.Vertical &&
              (this._orientation = t.ScrollerOrientation.Vertical),
            (this._scroller = new t.Scroller(
              this._childListElement,
              this._scrollElement,
              this._orientation,
            )),
            this._isUsedOnTouchDevices)
          ) {
            var i = e(this._childListElement);
            i.on(r, l + s, n(this._mobileScrollHandlerStart, this)),
              i.on(o, l + s, n(this._mobileScrollHandler, this)),
              i.on(a, l + s, n(this._mobileScrollHandlerStop, this)),
              (this._scroller._onTick = e.proxy(this._onTick, this));
          }
          this._scroller.initialize(),
            this._createArrows(),
            this._scroller.resetState(),
            (this._scrollerPositionChangedDelegate = Function.createDelegate(
              this,
              this._onScrollerPositionChanged,
            )),
            this._scroller.add_positionChanged(
              this._scrollerPositionChangedDelegate,
            );
        },
        dispose: function () {
          if (this._isUsedOnTouchDevices) {
            var t = e(this._childListElement);
            t.off(r, l + s, this._mobileScrollHandlerStart),
              t.off(o, l + s, this._mobileScrollHandler),
              t.off(a, l + s, this._mobileScrollHandlerStop);
          }
          if (this._scroller) {
            this._scroller.dispose(), (this._scroller = null);
            var i = e(this._decArrow).add(e(this._incArrow));
            $telerik.isIE && i.unbind(".menuScroller"), i.remove();
          }
          (this._scrollerPositionChangedDelegate = null),
            (this._childListElement = null),
            (this._scrollElement = null);
        },
        updateState: function () {
          this._updateScrollingLimits(), this._updateArrows();
        },
        resetState: function () {
          this._scroller.resetState();
        },
        startScroll: function (e, t) {
          this._scroller.startScroll(e, t);
        },
        changeScrollSpeed: function (e) {
          this._scroller.changeScrollSpeed(e);
        },
        stopScroll: function () {
          this._scroller.stopScroll();
        },
        scrollToMaxPosition: function () {
          this._scroller.scrollToMaxPosition();
        },
        scrollRelative: function (e) {
          this.set_currentPosition(this.get_currentPosition() + e);
        },
        get_currentPosition: function () {
          return this._scroller._currentPosition;
        },
        set_currentPosition: function (e) {
          this._scroller._scrollTo(
            Math.max(
              Math.min(this._scroller._maxPosition, e),
              this._scroller._minPosition,
            ),
          );
        },
        _onTick: function () {
          var e = this._scroller,
            t = e._currentPosition + e._direction * e._speed;
          (t = Math.max(t, e._minPosition)),
            (t = Math.min(t, e._maxPosition)),
            (this._previousScrollLocation = t),
            e._scrollTo(t),
            (t != e._minPosition && t != e._maxPosition) || e.stopScroll();
        },
        _createArrows: function () {
          var e = this._arrowsZIndex;
          (this._decArrow = this._createArrowDomElement(e)),
            (this._incArrow = this._createArrowDomElement(e)),
            this._orientation == t.ScrollerOrientation.Vertical
              ? ((this._decArrow.style.left = "0px"),
                (this._decArrow.style.top = "0px"),
                (this._incArrow.style.left = "0px"),
                (this._incArrow.style.bottom = "0px"))
              : ((this._decArrow.style.top = "0px"),
                (this._decArrow.style.left = "-1px"),
                (this._incArrow.style.top = "0px"),
                (this._incArrow.style.right = "-1px"));
        },
        _updateArrows: function () {
          var e = this._scroller.isAtMinPosition(),
            t = this._scroller.isAtMaxPosition();
          e
            ? ((this._decArrow.disabled = "disabled"),
              this._setElementCssClass(
                this._decArrow,
                this._getDecArrowCssClass(!1),
                this._getDecArrowCssClass(!0),
              ))
            : ((this._decArrow.disabled = ""),
              this._setElementCssClass(
                this._decArrow,
                this._getDecArrowCssClass(!0),
                this._getDecArrowCssClass(!1),
              )),
            t
              ? ((this._incArrow.disabled = "disabled"),
                this._setElementCssClass(
                  this._incArrow,
                  this._getIncArrowCssClass(!1),
                  this._getIncArrowCssClass(!0),
                ))
              : ((this._incArrow.disabled = ""),
                this._setElementCssClass(
                  this._incArrow,
                  this._getIncArrowCssClass(!0),
                  this._getIncArrowCssClass(!1),
                ));
        },
        _updateScrollingLimits: function () {
          var i = 0,
            n = 0,
            s = e(this._childListElement),
            r = e(this._scrollElement);
          (n =
            this._orientation == t.ScrollerOrientation.Vertical
              ? s.outerHeight(!0) - r.height()
              : s.outerWidth(!0) - r.width()),
            this._rtl && $telerik.isIE8 && ((i = -n), (n = 0)),
            this._scroller.setScrollingLimits(i, n);
        },
        _getDecArrowCssClass: function (e) {
          return this._orientation == t.ScrollerOrientation.Vertical
            ? e
              ? this._topArrowCssClass
              : this._topArrowDisabledCssClass
            : e
              ? this._leftArrowCssClass
              : this._leftArrowDisabledCssClass;
        },
        _getIncArrowCssClass: function (e) {
          return this._orientation == t.ScrollerOrientation.Vertical
            ? e
              ? this._bottomArrowCssClass
              : this._bottomArrowDisabledCssClass
            : e
              ? this._rightArrowCssClass
              : this._rightArrowDisabledCssClass;
        },
        _onScrollerPositionChanged: function (e, t) {
          this._updateArrows();
        },
        _mobileScrollHandler: function (e) {
          var t,
            i,
            n =
              this._orientation != Telerik.Web.UI.ScrollerOrientation.Vertical
                ? $telerik.getTouchEventLocation(e).x
                : $telerik.getTouchEventLocation(e).y,
            s = this._owner.get_openedItem();
          e.preventDefault(),
            e.stopPropagation(),
            0 === this._initialTouchLocation &&
              ((this._initialTouchLocation = n), s && s.close()),
            (i =
              (t = this._initialTouchLocation - n) +
              this._previousScrollLocation),
            this.set_currentPosition(i),
            clearTimeout(this._timeOut),
            (this._touchScrollInAction = !0),
            this._scroller.isAtMinPosition(i) ||
            this._scroller.isAtMaxPosition(i)
              ? this.stopScroll()
              : (this._lastDelta = t);
        },
        _mobileScrollHandlerStop: function (e) {
          e.stopPropagation(),
            (this._initialTouchLocation = 0),
            (this._previousScrollLocation += this._lastDelta),
            (this._touchScrollInAction = !1);
        },
        _mobileScrollHandlerStart: function (e) {
          var t = this;
          e.stopPropagation(),
            (this._timeOut = setTimeout(function () {
              t._touchScrollInAction = !1;
            }, 90));
        },
      }),
      t.MenuItemScroller.registerClass(
        "Telerik.Web.UI.MenuItemScroller",
        null,
        Sys.IDisposable,
      );
  })($telerik.$, Telerik.Web.UI),
  (function (e, t, i) {
    e.registerEnum(t, "ItemFlow", { Vertical: 0, Horizontal: 1 }),
      e.registerEnum(t, "ExpandDirection", {
        Auto: 0,
        Up: 1,
        Down: 2,
        Left: 3,
        Right: 4,
      }),
      e.registerEnum(t, "MenuRepeatDirection", { Vertical: 0, Horizontal: 1 }),
      (t.RadMenuItemGroupSettings = function (e, t) {
        var i;
        if (t) for (i in t) this[i] = t[i];
        for (i in e) {
          var n = this["set_" + i];
          n && n.call(this, e[i]);
        }
      }),
      e.registerControlProperties(t.RadMenuItemGroupSettings, {
        flow: t.ItemFlow.Vertical,
        expandDirection: t.ExpandDirection.Auto,
        offsetX: 0,
        offsetY: 0,
        width: null,
        height: null,
        repeatDirection: t.MenuRepeatDirection.Vertical,
        repeatColumns: 1,
      }),
      t.RadMenuItemGroupSettings.registerClass(
        "Telerik.Web.UI.RadMenuItemGroupSettings",
      );
  })($telerik.$, Telerik.Web.UI);
