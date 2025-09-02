!(function (e, t) {
  var n = ".",
    i = "rmParentItem",
    s = "rmToggle",
    l = "rmItem",
    a = "rmLink",
    r = "rmGroup",
    o = "rmLoading",
    h = "rmLoadingTemplate",
    _ = "rmLoadingIcon",
    g = { opacity: 0 },
    m = { opacity: 1 },
    c = { left: "100%" },
    d = { left: "-100%" },
    u = { left: 0 };
  (t.MobileMenuItem = function () {
    t.MobileMenuItem.initializeBase(this);
  }),
    (t.MobileMenuItem.prototype = {
      _initialize: function (e, n) {
        t.MobileMenuItem.callBaseMethod(this, "_initialize", [e, n]),
          this._clearNavigateUrl();
      },
      _initializeRenderedItem: function () {
        t.MobileMenuItem.callBaseMethod(this, "_initializeRenderedItem"),
          this._ensureChildrenParent(),
          this._clearNavigateUrl();
      },
      _dispose: function () {
        t.BaseMenuItem.callBaseMethod(this, "_dispose"),
          this._disposeDomElement();
      },
      get_childListElement: function () {
        return (
          this._childListElement ||
            (this._childListElement = e(this._element)
              .children(n + r)
              .get(0)),
          this._childListElement
        );
      },
      get_textElement: function () {
        return this.get_linkElement();
      },
      set_navigateUrl: function (e) {
        var t = this.get_linkElement();
        this._properties.setValue("navigateUrl", e, !0),
          t &&
            (e && "#" !== e
              ? "A" == t.nodeName
                ? (t.href = e)
                : this._replaceSpanElement(e)
              : this._replaceLinkElement(),
            this._clearNavigateUrl());
      },
      set_visible: function (e) {
        var n = this.get_visible() != e,
          i = e ? "" : "none",
          s = this.get_element();
        n &&
          (t.MobileMenuItem.callBaseMethod(this, "set_visible", [e]),
          (s.style.display = i));
      },
      scrollIntoView: function () {
        var e = this.get_element();
        e && e.scrollIntoView(!1);
      },
      _render: function (e) {
        (e[e.length] = "<li class='" + l + "'>"),
          this._renderTextContainer(e),
          (this.get_items().get_count() > 0 ||
            this.get_expandMode() === t.MenuItemExpandMode.WebService) &&
            (this._renderToggleButton(e), this._renderChildItems(e)),
          (e[e.length] = "</li>");
      },
      _renderTextContainer: function (e) {
        var t = this.get_navigateUrl();
        t && "#" != t ? this._renderLink(e, t) : this._renderSpan(e);
      },
      _renderLink: function (e, t) {
        var n = this.get_target();
        (e[e.length] = "<a href='" + t + "' "),
          n && (e[e.length] = "target='" + n + "' "),
          (e[e.length] = "class='" + a + "'>"),
          (e[e.length] = this.get_text()),
          (e[e.length] = "</a>");
      },
      _renderSpan: function (e) {
        (e[e.length] = "<span class='" + a + "'>"),
          (e[e.length] = this.get_text()),
          (e[e.length] = "</span>");
      },
      _renderToggleButton: function (e) {
        (e[e.length] = "<span class='" + s + "'>"),
          (e[e.length] = "\x3c!-- &nbsp; --\x3e"),
          (e[e.length] = "</span>");
      },
      _renderParentItem: function (e) {
        var t = l + " " + i;
        (e[e.length] = "<li class='" + t + "'>"),
          (e[e.length] = this.get_text()),
          (e[e.length] = "</li>");
      },
      _renderChildItems: function (t, n) {
        var i = this.get_items().toArray();
        0 != i.length &&
          ((t[t.length] = "<ul class='" + r + "'>"),
          this._renderParentItem(t),
          n ||
            e.each(i, function () {
              this._render(t);
            }),
          (t[t.length] = "</ul>"));
      },
      _ensureChildrenParent: function () {
        var e = this._getParentItemElement();
        e &&
          !e._item &&
          ((this._parentItemElement._item = this),
          (this._parentItemElement._itemTypeName = Object.getTypeName(this)));
      },
      _ensureToggleButton: function () {
        var t = e(this.get_linkElement());
        this._getToggleButtonElement() ||
          (this._createToggleButtonElement(),
          e(this._toggleButtonElement).insertAfter(t));
      },
      _getParentItemElement: function () {
        return (
          this._parentItemElement ||
            (this._parentItemElement = e(this.get_childListElement())
              .children(n + i)
              .get(0)),
          this._parentItemElement
        );
      },
      _getToggleButtonElement: function () {
        return (
          this._toggleButtonElement ||
            (this._toggleButtonElement = e(this.get_element())
              .children(n + s)
              .get(0)),
          this._toggleButtonElement
        );
      },
      _getChildElements: function () {
        return e(this.get_childListElement()).children(
          ".rmItem :not(.rmParentItem)",
        );
      },
      _doOpen: function (n) {
        var i,
          s = this.get_menu(),
          l = s.get_rightToLeft() ? c : d,
          a = this.get_parent(),
          r = s.get_expandAnimation(),
          o = r.get_duration(),
          h = t.AnimationType.toEasing(r.get_type()),
          _ = e(this.get_childListElement()),
          p = e(a.get_childListElement()),
          E = function () {
            p.css(g);
          };
        this.get_hasContentTemplate() || this._ensureChildControls(),
          (this._state = t.RadMenuItemState.Open),
          (a._openedItem = this),
          this._detachChildren(),
          _.css(m).stopTransition(),
          p.stopTransition(),
          "easeNone" !== h
            ? (_.transition(u, o, h), p.transition(l, o, h, E))
            : (_.css(u), p.css(l), E()),
          (i = new t.RadMenuItemOpenedEventArgs(this, n)),
          s._raiseEvent("itemOpened", i);
      },
      _doClose: function (n) {
        var i,
          s = this.get_menu(),
          l = this.get_parent(),
          a = s.get_rightToLeft() ? d : c,
          r = s.get_collapseAnimation(),
          o = r.get_duration(),
          h = t.AnimationType.toEasing(r.get_type()),
          _ = e(this.get_childListElement()),
          p = e(l.get_childListElement()),
          E = function () {
            _.css(g);
          };
        (this._state = t.RadMenuItemState.Closed),
          (l._openedItem = null),
          p.css(m).stopTransition(),
          _.stopTransition(),
          "easeNone" !== h
            ? (p.transition(u, o, h), _.transition(a, o, h, E))
            : (p.css(u), _.css(a), E()),
          (i = new t.RadMenuItemClosedEventArgs(this, n)),
          s._raiseEvent("itemClosed", i);
      },
      _click: function (n) {
        if (this.get_enabled()) {
          var i,
            s = this.get_menu(),
            l = new t.RadMenuItemClickingEventArgs(this, n);
          s._raiseEvent("itemClicking", l),
            l.get_cancel()
              ? n.preventDefault()
              : ((i = new t.RadMenuItemClickedEventArgs(this, n)),
                s._raiseEvent("itemClicked", i),
                this._shouldNavigate() ||
                  (this.set_selected(!0),
                  this._shouldPostBack() &&
                    (e(s.get_element())
                      .children(".rmRootToggle")
                      .trigger("touchend"),
                    s._postback(this._getHierarchicalIndex()))));
        }
      },
      _setFocused: function (e) {
        (this._focused = e), this._updateLinkClass();
      },
      _detachChildren: function () {
        if (!this._childrenDetached) {
          var t = this.get_menu(),
            n = e(t._getAnimationContainerElement()),
            i = e(this.get_childListElement());
          n.append(i), (this._childrenDetached = !0);
        }
      },
      _createChildListElement: function () {
        var t,
          n = [],
          i = e(this.get_element());
        return (
          this._renderChildItems(n, !0),
          (t = e(n.join(""))),
          i.append(t),
          t.get(0)
        );
      },
      _createToggleButtonElement: function () {
        var e = document.createElement("span");
        (e.className = s),
          (e.innerHTML = "&nbsp;"),
          (this._toggleButtonElement = e);
      },
      _applyCssClass: function (t, n) {
        var i = e(this.get_element());
        i.removeClass(n), i.addClass(t);
      },
      _updateLinkClass: function () {
        if (!this.get_isSeparator()) {
          var t = e(this.get_element()),
            n = this._resolveCssClass();
          t.removeClass(), t.addClass(n.join(" "));
        }
      },
      _resolveCssClass: function () {
        var e = [l, this.get_cssClass()],
          t = this.get_menu();
        return (
          this.get_focused() && e.push(this.get_focusedCssClass()),
          !this.get_selected() ||
            (t && !t.get_enableSelection()) ||
            e.push(this.get_selectedCssClass()),
          this._clicked && e.push(this.get_clickedCssClass()),
          this.get_enabled() ||
            Array.addRange(e, ["rmDisabled", this.get_disabledCssClass()]),
          e
        );
      },
      _replaceSpanElement: function (t) {
        var n = this.get_linkElement(),
          i = e("<a href='" + t + "' class='" + n.className + "'></a>");
        this._replaceElement(i);
      },
      _replaceLinkElement: function () {
        var t = this.get_linkElement(),
          n = e(
            "<span class='" +
              t.className +
              "' tabindex='" +
              t.tabIndex +
              "'></span>",
          );
        this._replaceElement(n);
      },
      _replaceElement: function (t) {
        var n = e(this.get_linkElement());
        t.html(n.html()),
          t.attr("accesskey", n.attr("accesskey")),
          n.replaceWith(t),
          (this._linkElement = t.get(0));
      },
      _createLoadingItem: function () {
        var t,
          n = this.get_menu(),
          i = n.get_loadingTemplate(),
          s = e(n._getAnimationContainerElement());
        s.addClass(o),
          "" !== i
            ? ((t = "<span class='" + h + "'>" + i + "</span>"), s.append(e(t)))
            : s.addClass(_);
      },
      _removeLoadingItem: function () {
        var t = this.get_menu(),
          i = t.get_loadingTemplate(),
          s = e(t._getAnimationContainerElement());
        s.removeClass(o), "" !== i ? e(n + h).remove() : s.removeClass(_);
      },
      _onChildrenLoading: function () {
        (this._itemsLoading = !0), this._createLoadingItem();
      },
      _onChildrenLoaded: function () {
        this._removeLoadingItem(),
          (this._itemsLoaded = !0),
          (this._itemsLoading = !1),
          this._doOpen(null);
      },
      _onChildrenLoadingError: function () {
        this._removeLoadingItem(),
          (this._itemsLoaded = !1),
          (this._itemsLoading = !1);
      },
    }),
    t.MobileMenuItem.registerClass(
      "Telerik.Web.UI.MobileMenuItem",
      t.BaseMenuItem,
    );
})($telerik.$, Telerik.Web.UI);
