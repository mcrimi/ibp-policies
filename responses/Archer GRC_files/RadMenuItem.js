!(function (e, t, i) {
  var n = ".",
    s = "rmGroup",
    l = "rmGroupColumn",
    r = "rmScrollWrap",
    a = "rmLevel",
    o = "rmLeftImage",
    h = "rmToggle",
    _ = "rmIcon",
    g = "rmText",
    d = "span";
  (t.RadMenuItem = function () {
    t.RadMenuItem.initializeBase(this);
  }),
    (t.RadMenuItem.prototype = {
      _initialize: function (e, i) {
        t.RadMenuItem.callBaseMethod(this, "_initialize", [e, i]);
        var n = this.get_menu();
        (this._groupSettings = new t.RadMenuItemGroupSettings(
          e.groupSettings || {},
          n.get_defaultGroupSettings(),
        )),
          this._initializeAnimation(),
          this._clearNavigateUrl(),
          this._updateTextElementClass(),
          this._renderAccessKey(),
          (this._originalExpandMode = this.get_expandMode());
      },
      _initializeRenderedItem: function () {
        t.RadMenuItem.callBaseMethod(this, "_initializeRenderedItem"),
          this._initializeAnimation(),
          this._clearNavigateUrl(),
          this._updateTextElementClass(),
          this._updateLinkClass(),
          this._renderAccessKey(),
          t.RadMenu._updateChildrenPositionClass(this.get_parent()),
          t.RadMenu._updateChildrenPositionClass(this);
      },
      _dispose: function () {
        t.BaseMenuItem.callBaseMethod(this, "_dispose"),
          this._collapseAnimationEndedDelegate &&
            (this._slide &&
              this._slide.remove_collapseAnimationEnded(
                this._collapseAnimationEndedDelegate,
              ),
            (this._collapseAnimationEndedDelegate = null)),
          this._slide && (this._slide.dispose(), (this._slide = null)),
          this._scroller && (this._scroller.dispose(), (this._scroller = null)),
          this._disposeDomElement(),
          this._clearTimeout();
      },
      get_view: function () {
        return this._view;
      },
      withView: function (e, i) {
        if (!this.get_view()) {
          if (!this.get_menu()) return i ? i() : void 0;
          this._view = t.RadMenu.GetView(this.get_menu(), this);
        }
        return e();
      },
      get_templateElement: function () {
        var t;
        return (
          this._templateElement ||
            ((t = this._getTemplateClassName()),
            (this._templateElement = e(this.get_element())
              .children("div." + t)
              .get(0))),
          this._templateElement
        );
      },
      get_childListElement: function () {
        if (!this._childListElement) {
          var e = this._getSlideWrapElement();
          if (e) {
            var t = e,
              i = this._getScrollWrapElement();
            i && (t = i),
              (this._childListElement = $telerik.getFirstChildByTagName(
                t,
                "ul",
                0,
              ));
          }
        }
        return this._childListElement;
      },
      get_imageElement: function () {
        return (
          this._imageElement ||
            (this._imageElement = e(this.get_linkElement())
              .children(n + o)
              .get(0)),
          this._imageElement
        );
      },
      get_textElement: function () {
        return (
          this._textElement ||
            (this._textElement = e(this.get_linkElement())
              .children(n + g)
              .get(0)),
          this._textElement
        );
      },
      get_text: function () {
        var e = this;
        return e.withView(
          function () {
            return e.get_view().get_text();
          },
          function () {
            return t.RadMenuItem.callBaseMethod(e, "get_text");
          },
        );
      },
      set_text: function (e) {
        var i = this;
        this.withView(
          function () {
            i.get_view().set_text(e);
          },
          function () {
            t.RadMenuItem.callBaseMethod(i, "set_text", [e]);
          },
        ),
          this._state != t.RadMenuItemState.Closed
            ? (this._clearWidth(), this._setWidth(this._getWidth() + "px"))
            : this._getParentFlow() == t.ItemFlow.Vertical &&
              (this._adjustSiblingsWidthOnShow = !0),
          this._updateLinkClass();
      },
      set_navigateUrl: function (e) {
        var t = this;
        this._properties.setValue("navigateUrl", e, !0),
          this.withView(function () {
            t.get_view().set_navigateUrl(e);
          }),
          this._clearNavigateUrl();
      },
      get_groupSettings: function () {
        return this._groupSettings;
      },
      set_groupSettings: function (e) {
        this._groupSettings = e;
      },
      get_hoveredImageUrl: function () {
        return this._properties.getValue("hoveredImageUrl", null);
      },
      set_hoveredImageUrl: function (e) {
        this._properties.setValue("hoveredImageUrl", e, !0),
          this._updateImageSrc();
      },
      get_clickedImageUrl: function () {
        return this._properties.getValue("clickedImageUrl", null);
      },
      set_clickedImageUrl: function (e) {
        this._properties.setValue("clickedImageUrl", e, !0),
          this._updateImageSrc();
      },
      get_selectedImageUrl: function () {
        return this._properties.getValue("selectedImageUrl", null);
      },
      set_selectedImageUrl: function (e) {
        this._properties.setValue("selectedImageUrl", e, !0),
          this._updateImageSrc();
      },
      get_imageUrl: function () {
        return this._imageUrl
          ? this._imageUrl
          : ((this._imageUrl = this._properties.getValue("imageUrl", null)),
            this._imageUrl || (this._imageUrl = this._getCurrentImageUrl()),
            this._imageUrl);
      },
      set_imageUrl: function (t) {
        if (
          ((this._imageUrl = t),
          this._properties.setValue("imageUrl", t, !0),
          !t)
        )
          return (
            e(this.get_imageElement()).remove(),
            void (this._imageElement = null)
          );
        this._updateImageSrc();
      },
      get_expandedImageUrl: function () {
        return this._properties.getValue("expandedImageUrl", null);
      },
      set_expandedImageUrl: function (e) {
        this._properties.setValue("expandedImageUrl", e, !0),
          this._updateImageSrc();
      },
      get_disabledImageUrl: function () {
        return this._properties.getValue("disabledImageUrl", null);
      },
      set_disabledImageUrl: function (e) {
        this._properties.setValue("disabledImageUrl", e, !0),
          this._updateImageSrc();
      },
      set_visible: function (e) {
        if (this.get_visible() != e) {
          t.RadMenuItem.callBaseMethod(this, "set_visible", [e]);
          var i,
            n = this._getParentFlow(),
            s = this.get_element(),
            l = this.get_linkElement(),
            r = this.get_textElement(),
            a = e ? "" : "none";
          if (
            (n === t.ItemFlow.Vertical &&
              (this._adjustSiblingsWidthOnShow = !0),
            this._clearWidth(),
            l ? (i = l) : r && (i = r),
            (this.get_isSeparator() || this.get_templated()) &&
              (i = s.childNodes[0] || s),
            (i.style.display = a),
            i != s &&
              (this.get_visible()
                ? (s.style.cssText = this._styleCssText)
                : ((this._styleCssText = this.get_element().style.cssText),
                  (s.style.cssText =
                    "padding:0px;margin:0px;height:0px;overflow:hidden;"))),
            n === t.ItemFlow.Vertical)
          ) {
            e || this._clearSiblingsWidth();
            var o = this.get_parent();
            o.get_element().offsetWidth > 0 &&
              t.RadMenu._adjustChildrenWidth(o);
          }
        }
      },
      scrollIntoView: function () {
        var i = this.get_parent();
        if (i) {
          var n = i._getScrollWrapElement();
          if (n) {
            var s = i._scroller;
            if (s) {
              var l =
                (undefined !== i._flow && null !== i._flow
                  ? i._flow
                  : i.get_groupSettings().get_flow()) == t.ItemFlow.Vertical;
              l ? (n.scrollTop = 0) : $telerik.scrollLeft(n, 0);
              var r = i.get_childListElement(),
                a = l ? "offsetTop" : "offsetLeft",
                o = l ? "offsetHeight" : "offsetWidth",
                h = e([i._scroller._decArrow, i._scroller._incArrow]),
                _ = l ? h.first().height() : h.first().width(),
                g = l ? h.last().height() : h.last().width(),
                d = -r[a],
                u = n[o] - g,
                m = d + n[o],
                c = this.get_element()[a],
                p = this.get_element()[o],
                f = c + p;
              (c < d + _ || f > m - g) &&
                (d - c > f - m
                  ? s.set_currentPosition(c - _)
                  : s.set_currentPosition(c - u + p));
            }
          }
        }
      },
      focusFirstChild: function (e) {
        var t = this.get_items();
        if (0 != t.get_count()) {
          for (var i = t.getItem(0), n = i; !i._canFocus(); )
            if ((i = i._getNextItem()) == n) return;
          i._transferFocus(e || null);
        }
      },
      focusLastChild: function (e) {
        var t = this.get_items();
        if (0 != t.get_count()) {
          for (var i = t.getItem(t.get_count() - 1), n = i; !i._canFocus(); )
            if ((i = i._getPreviousItem()) == n) return;
          i._transferFocus(e || null);
        }
      },
      focusNextItem: function (e) {
        for (var t = this._getNextItem(); !t._canFocus(); )
          t = t._getNextItem();
        t._transferFocus(e || null);
      },
      focusPreviousItem: function (e) {
        for (var t = this._getPreviousItem(); !t._canFocus(); )
          t = t._getPreviousItem();
        t._transferFocus(e || null);
      },
      _render: function (e) {
        var t = this,
          i = this.withView(function () {
            return t.get_view();
          });
        this._renderedClientTemplate
          ? this._renderClientTemplate(e)
          : ((e[e.length] = "<li class='" + this._determineCssClass() + "'>"),
            i._renderLink(e),
            i._renderLinkContent(e),
            i._renderLinkEndTag(e),
            this._renderChildItems(e),
            (e[e.length] = "</li>"));
      },
      _renderLinkContent: function (e) {
        var i =
            this.get_menu().get_showToggleHandle() &&
            (this.get_items().get_count() > 0 ||
              this.get_expandMode() === t.MenuItemExpandMode.WebService),
          n = i;
        (this.get_imageUrl() || this.get_enableImageSprite()) &&
          ((n = !0), this._renderImage(e)),
          this.get_menu()._enableItemImagesPreloading &&
            this._renderPreloadImages(e),
          this.get_view()._renderTextElement(e, n),
          i && this._renderToggleButton(e);
      },
      _renderClientTemplate: function (e) {
        (e[e.length] =
          "<li class='" + this._determineCssClass() + " rmTemplate'>"),
          (e[e.length] = "<div class='" + this._getTemplateClassName() + "'>"),
          (e[e.length] = this._renderedClientTemplate),
          (e[e.length] = "</div></li>");
      },
      _renderTextElement: function (e) {
        (e[e.length] = "<span class='" + g + "'>"),
          (e[e.length] = this.get_text()),
          (e[e.length] = "</span>");
      },
      _renderToggleButton: function (e) {
        (e[e.length] = "<span class='" + h + "'>"),
          (e[e.length] = "<span class='" + _ + "'>Toggle</span>"),
          (e[e.length] = "</span>");
      },
      _renderAccessKey: function () {
        if (!this.get_isSeparator() && !this.get_templated()) {
          var e,
            t = this.get_linkElement();
          if (t && (e = t.getAttribute("accessKey")) && this.get_text()) {
            var i = this.get_textElement() || t,
              n = i.innerHTML,
              s = n.toLowerCase().indexOf(e.toLowerCase());
            -1 == n.toLowerCase().indexOf("<u>") &&
              -1 != s &&
              (i.innerHTML =
                n.substr(0, s) +
                "<u>" +
                n.substr(s, 1) +
                "</u>" +
                n.substr(s + 1, n.length));
          }
        }
      },
      _renderImage: function (e) {
        var t = this.get_enableImageSprite(),
          n = t ? "span" : "img",
          s = t ? " " : " alt='' src='" + this.get_imageUrl() + "' ",
          l = new i(e);
        return (
          l.append("<", n, s).append("class='", o, "' "),
          this.get_enabled() || l.append("disabled='disabled'"),
          t ? l.append("></span>") : l.append("/>"),
          e
        );
      },
      _renderPreloadImages: function () {
        for (
          var e = [
              this.get_imageUrl(),
              this.get_hoveredImageUrl(),
              this.get_expandedImageUrl(),
              this.get_disabledImageUrl(),
              this.get_clickedImageUrl(),
              this.get_selectedImageUrl(),
            ],
            i = 0;
          i < e.length;
          i++
        ) {
          var n = e[i];
          n && t.RadMenu._preloadImage(n);
        }
      },
      _renderChildItems: function (e, t) {
        var n = this.get_items().toArray();
        if (t || 0 != n.length) {
          var s = new i(e);
          s.append("<div class='rmSlide'>"),
            this._getShouldRenderScrollWrap() && this._renderScrollWrap(s);
          var l = this._getGroupCssClass();
          this._hasMultipleColumns()
            ? this._renderColumns(s, n, l, t)
            : this._renderChildGroup(s, n, l, t),
            this._getShouldRenderScrollWrap() && s.append("</div>"),
            s.append("</div>");
        }
      },
      _renderScrollWrap: function (e) {
        e.append("<div class='")
          .append(r, " ", s, " ")
          .append(a, this._getGroupLevelCssClass())
          .append("' style='");
        var t = this.get_groupSettings(),
          i = t.get_width();
        i && e.append("width :", i, ";");
        var n = t.get_height();
        n && e.append("height :", n, ";"), e.append("'>");
      },
      _renderColumns: function (e, i, n, s) {
        e.append("<ul class='", "rmMultiColumn", "'>");
        for (
          var r = this.get_groupSettings(),
            a = r.get_repeatColumns(),
            o = s ? 0 : Math.min(a, i.length),
            h = r.get_repeatDirection(),
            _ = 0;
          _ < o;
          _++
        ) {
          var g = "";
          0 == _ && (g = " rmFirstGroupColumn"),
            e.append("<li class='", l, g, "'>");
          var d =
              h == t.MenuRepeatDirection.Vertical
                ? this._getRowItems(_, a, i)
                : this._getColumnItems(_, a, i),
            u = n + " rmMultiGroup";
          this._renderChildGroup(e, d, u), e.append("</li>");
        }
        e.append("</ul>");
      },
      _renderChildGroup: function (t, i, n, s) {
        t.append("<ul class='", n, "'>"),
          s ||
            e.each(i, function () {
              this._render(t.get_buffer());
            }),
          t.append("</ul>");
      },
      _determineCssClass: function () {
        var e = this;
        return this.withView(function () {
          return e.get_view()._determineCssClass();
        });
      },
      _getNextItem: function () {
        var e = this.get_parent().get_items(),
          t = this.get_index();
        return t == e.get_count() - 1 ? e.getItem(0) : e.getItem(t + 1);
      },
      _getPreviousItem: function () {
        var e = this.get_parent().get_items(),
          t = this.get_index();
        return 0 == t ? e.getItem(e.get_count() - 1) : e.getItem(t - 1);
      },
      _getTemplateClassName: function () {
        var e = this;
        return this.withView(function () {
          return e.get_view().get_templateClassClass();
        });
      },
      _getGroupLevelCssClass: function () {
        return a + (this.get_level() + 1);
      },
      _getGroupCssClass: function () {
        var e = new i();
        return (
          e.append(this._getFlowCssClass()),
          this._getShouldRenderScrollWrap() ||
            e.append(" ", s, " ", this._getGroupLevelCssClass()),
          e.toString()
        );
      },
      _getIsImageOnly: function () {
        return (
          null === this._isImageOnly &&
            (this._isImageOnly = null != this.get_imageElement()),
          this._isImageOnly
        );
      },
      _getFlowCssClass: function () {
        return this.get_groupSettings().get_flow() == t.ItemFlow.Vertical
          ? "rmVertical"
          : "rmHorizontal";
      },
      _getCurrentImageUrl: function () {
        var e = null,
          t = this.get_imageElement();
        return t && (e = t.src), e;
      },
      _getParentFlow: function () {
        var e = this.get_parent();
        return e
          ? e == this.get_menu()
            ? e._flow
            : e.get_groupSettings().get_flow()
          : null;
      },
      _getRowItems: function (t, i, n) {
        for (var s = [], l = 0; l < i; l++) s[l] = [];
        var r = s[i - 1];
        return (
          e.each(n, function () {
            r.push(this),
              (function () {
                for (var e = s.length - 1; e > 0; e--) {
                  var t = s[e],
                    i = s[e - 1];
                  if (t.length == i.length) return;
                  i.push(t.shift());
                }
              })();
          }),
          s[t]
        );
      },
      _getColumnItems: function (e, t, i) {
        for (var n = [], s = 0, l = 0; l < i.length; l++)
          s == e && n.push(i[l]), (s = (s + 1) % t);
        return n;
      },
      _getColumnForItem: function (i) {
        if (!this._hasMultipleColumns()) return null;
        var n = this.get_childListElement(),
          s = e(n).children(".rmGroupColumn"),
          l = this.get_groupSettings(),
          r = l.get_repeatColumns();
        if (s.length < r) return this._createEmptyColumn();
        var a = i.get_index();
        return l.get_repeatDirection() == t.MenuRepeatDirection.Horizontal
          ? s[a % r]
          : s[s.length - 1];
      },
      _getColumnItemCount: function (t) {
        return e(t).children(".rmGroup").children(".rmItem").length;
      },
      _getToggleButtonElement: function () {
        return (
          this._toggleButtonElement ||
            (this._toggleButtonElement = e(this.get_linkElement())
              .children(n + h)
              .get(0)),
          this._toggleButtonElement
        );
      },
      _getChildElements: function () {
        var i = e(this.get_childListElement());
        if (i.is(".rmMultiColumn")) {
          var n = i.find("> .rmGroupColumn > ul > .rmItem"),
            s = this.get_groupSettings(),
            l = s.get_repeatDirection(),
            r = s.get_repeatColumns();
          if (1 == r || l == t.MenuRepeatDirection.Vertical) return n;
          for (var a = [], o = Math.ceil(n.length / r), h = 0; h < o; h++)
            n.filter(".rmItem:nth-child(" + (h + 1) + ")").each(function () {
              Array.add(a, this);
            });
          return a;
        }
        return i.children(".rmItem");
      },
      _getSlideWrapElement: function () {
        return (
          this._slideWrapElement ||
            (this._slideWrapElement = e(this.get_element())
              .children(".rmSlide")
              .get(0)),
          this._slideWrapElement
        );
      },
      _getScrollWrapElement: function () {
        if (!this._scrollWrapElement) {
          var t = this._getSlideWrapElement();
          t &&
            (this._scrollWrapElement = e(t)
              .children(n + r)
              .get(0));
        }
        return this._scrollWrapElement;
      },
      _getAnimationContainer: function () {
        return this._getSlideWrapElement();
      },
      _getContentTemplateContainer: function () {
        return (
          this._contentTemplateContainer ||
            (this._contentTemplateContainer = e(this.get_element())
              .find(".rmContentTemplate")
              .get(0)),
          this._contentTemplateContainer
        );
      },
      _getAnimatedElement: function () {
        return (
          this._animatedElement ||
            (this._animatedElement =
              this._getScrollWrapElement() ||
              this.get_childListElement() ||
              this._getContentTemplateContainer()),
          this._animatedElement
        );
      },
      _createChildControls: function () {
        t.RadMenuItem.callBaseMethod(this, "_createChildControls"),
          this._initializeScroller();
      },
      _createChildListElement: function () {
        var t = [];
        this._renderChildItems(t, !0);
        var i = e(t.join(""));
        return (
          e(this.get_element()).append(i),
          this._initializeAnimation(),
          this._updateTextElementClass(),
          this._getShouldRenderScrollWrap() && this._initializeScroller(),
          i
        );
      },
      _createToggleButtonElement: function () {
        var e = document.createElement(d),
          t = document.createElement(d);
        (t.className = _),
          t.appendChild(document.createTextNode("Toggle")),
          (e.className = h),
          e.appendChild(t),
          (this._toggleButtonElement = e);
      },
      _attachChildren: function () {
        this._childrenDetached &&
          (this.get_element().appendChild(this._getAnimationContainer()),
          (this._childrenDetached = !1));
      },
      _detachChildren: function () {
        if (!this._childrenDetached) {
          var e,
            t = this.get_parent();
          if (0 == this.get_level() && t.get_enableRootItemScroll()) {
            var i = document.createElement("div");
            (i.className = "rmHorizontal rmRootGroup"),
              t.get_enableRoundedCorners() &&
                (i.className += " rmRoundedCorners"),
              t.get_enableShadows() && (i.className += " rmShadows"),
              (i.style.position = "absolute"),
              (i.style.height = "0px"),
              (i.style.width = "0px"),
              (i.style.visibility = "hidden"),
              (i.style.left = "0px"),
              t.get_rightToLeft() && (i.style.cssFloat = "right");
            var n = document.createElement("div");
            (n.className = s),
              (n.style.position = "relative"),
              t.get_element().appendChild(i),
              i.appendChild(n),
              $telerik.isIE && (i.style.cssText = i.style.cssText),
              (e = n);
          } else e = t._getAnimationContainer();
          var l = this._getAnimationContainer();
          e.appendChild(l),
            (this._childrenDetached = !0),
            (l._item = this),
            (l._itemTypeName = Object.getTypeName(this));
        }
      },
      _getWidth: function () {
        var e = this.get_linkElement();
        return e ? e.offsetWidth : this.get_element().offsetWidth;
      },
      _setWidth: function (t) {
        var i = this.get_linkElement();
        if ((i || (i = this.get_element()), i)) {
          $telerik.isOpera && (this.get_element().style.cssFloat = "none");
          var n = parseInt(t, 10);
          if (isNaN(n)) i.style.width = t;
          else {
            var s = n,
              l =
                parseFloat(e(i).css("padding-left")) +
                parseFloat(e(i).css("padding-right")),
              r = e(i).css("border-left-width"),
              a = e(i).css("border-right-width"),
              o = /\d/;
            if (
              !(
                (s -=
                  l +
                  ((o.test(r) ? parseInt(r, 10) : 0) +
                    (o.test(a) ? parseInt(a, 10) : 0))) <= 0
              )
            ) {
              var h = i.style.width;
              (h && s == h) || (i.style.width = s + "px");
            }
          }
        }
      },
      _clearWidth: function () {
        this._setWidth("auto");
      },
      _initializeAnimation: function () {
        this._determineExpandDirection();
        var e = this._getAnimatedElement();
        if (e) {
          var i = this.get_menu();
          (this._slide = new t.jSlide(
            e,
            i.get_expandAnimation(),
            i.get_collapseAnimation(),
            i.get_enableOverlay(),
          )),
            this._slide.initialize(),
            this._slide.set_direction(this._getSlideDirection()),
            (this._collapseAnimationEndedDelegate = Function.createDelegate(
              this,
              this._onCollapseAnimationEnded,
            )),
            this._slide.add_collapseAnimationEnded(
              this._collapseAnimationEndedDelegate,
            );
        }
      },
      _doOpen: function (i) {
        var n,
          s,
          l,
          r = this,
          a = this.get_menu();
        a &&
          a.get_enableAriaSupport() &&
          e(this._slideWrapElement).removeAttr("aria-hidden"),
          this.get_hasContentTemplate() || this._ensureChildControls(),
          (n = this.get_parent()) != a &&
            n._state != t.RadMenuItemState.Open &&
            n._open(i),
          (s = this._getAnimationContainer()) &&
            ((n._openedItem = this),
            (this._state = t.RadMenuItemState.Open),
            this.get_hasContentTemplate()
              ? this._doOpenContentTemplate(s)
              : this.withView(function () {
                  r.get_view()._doOpen(s);
                }),
            this._updateLinkClass(),
            this._updateImageSrc(),
            a &&
              a.get_enableAriaSupport() &&
              e(this._childListElement).removeAttr("aria-hidden"),
            (l = new t.RadMenuItemOpenedEventArgs(this, i)),
            this.get_menu()._raiseEvent("itemOpened", l));
      },
      _doOpenContentTemplate: function (e) {
        var t = this,
          i = t._slide;
        this.withView(function () {
          t.get_view()._ensureDecorationElements();
        }),
          (e.style.display = "block"),
          (e.style.visibility = "hidden"),
          t._resetAnimatedElementPosition(),
          i.set_direction(t._getSlideDirection()),
          i.set_animatedElement(t._getAnimatedElement()),
          i.updateSize(),
          t._positionChildContainerBasic(),
          (e.style.visibility = "visible"),
          t._updateZIndex(),
          i.expand();
      },
      _doClose: function (i) {
        var n, s;
        this._openedItem && this._openedItem._close(i),
          (this.get_parent()._openedItem = null),
          this._getAnimationContainer() &&
            ((this._state = t.RadMenuItemState.Closed),
            this._getIsImageOnly() || (this.get_element().style.zIndex = 0),
            this._slide.collapse(),
            this._updateLinkClass(),
            this._updateImageSrc(),
            n &&
              n.get_enableAriaSupport() &&
              e(this._childListElement).attr("aria-hidden", !0),
            (s = new t.RadMenuItemClosedEventArgs(this, i)),
            (n = this.get_menu())._raiseEvent("itemClosed", s),
            this._closeChildren(i));
      },
      _click: function (e) {
        if (this.get_enabled()) {
          var i,
            n = this.get_menu(),
            s = n.get_openedItem(),
            l = n._getExtendedItemClickingEventArgs(
              new t.RadMenuItemClickingEventArgs(this, e),
            );
          (n._isUsedOnTouchDevices && this._preventDefaultUnderMobile(e)) ||
            (n._raiseEvent("itemClicking", l),
            l.get_cancel()
              ? e && e.preventDefault && e.preventDefault()
              : (n._isUsedOnTouchDevices && !n.get_showToggleHandle()
                  ? this._shouldPostBack() || this._toggleState(e)
                  : n.get_clickToOpen() &&
                    0 == this.get_level() &&
                    (s && s != this && s._close(e),
                    !n.get_clicked() ||
                    $telerik.isBlackBerry4 ||
                    $telerik.isBlackBerry5
                      ? this._open(e)
                      : this._close(e),
                    n.set_clicked(!n.get_clicked())),
                (i = n._getExtendedItemClickedEventArgs(
                  new t.RadMenuItemClickedEventArgs(this, e),
                )),
                n._raiseEvent("itemClicked", i),
                this._shouldNavigate() ||
                  (this.set_selected(!0),
                  this._shouldPostBack() &&
                    n._postback(this._getHierarchicalIndex()))));
        } else $telerik.isSafari && !$telerik.isChrome && e.preventDefault();
      },
      _toggleState: function (e) {
        this.get_enabled() &&
          (this.get_isOpen()
            ? this._close(e)
            : this._shouldOpen() && this._open(e));
      },
      _doFocus: function (e) {
        if (this._canFocus()) {
          this._ensureChildControls();
          var i = this.get_parent(),
            n = this.get_menu();
          i._state != t.RadMenuItemState.Open && i.open && i._open(e),
            (i._focusedItem = this),
            i !== n && (n._focusedItem = this),
            this.scrollIntoView(),
            n.get_enableAriaSupport() &&
              "click" !== e.type.toLowerCase() &&
              "domactivate" !== e.type.toLowerCase() &&
              this._doAriaFocus(),
            n._triggerEventOnce(
              "itemFocus",
              new t.RadMenuItemFocusEventArgs(this, e),
              "focus",
            );
        }
      },
      _doBlur: function (e) {
        if (!this.get_isSeparator()) {
          var i = this,
            n = i.get_parent(),
            s = i.get_menu(),
            l = e ? e.type : "blur";
          (n._focusedItem = null),
            n !== s && (s._focusedItem = null),
            s.get_enableAriaSupport() && this._doAriaBlur(),
            s._triggerEventOnce(
              "itemBlur",
              new t.RadMenuItemBlurEventArgs(i, e),
              l,
            );
        }
      },
      _doAriaFocus: function () {
        var t = this.get_menu(),
          i = t.get_id() + "_active";
        e(this.get_linkElement()).attr("id", i),
          e(t._getMainElement()).attr("aria-activedescendant", i);
      },
      _doAriaBlur: function () {
        e(this.get_menu()._getMainElement()).removeAttr(
          "aria-activedescendant",
        ),
          e(this.get_linkElement()).removeAttr("id");
      },
      _transferFocus: function (e) {
        this._ensureChildControls();
        var i = this.get_parent(),
          n = i.get_openedItem();
        n && n != this && n._close(e),
          i._state != t.RadMenuItemState.Open && i.open && i._open(e),
          this.get_menu().get_focusedItem() &&
            this.get_menu().get_focusedItem().blur(e),
          this.focus(e);
      },
      _setFocused: function (e, t) {
        e ? this._doFocus(t) : this._doBlur(t);
      },
      _updateZIndex: function () {
        var e = this._getAnimationContainer(),
          t = this.get_parent();
        (e.style.visibility = "visible"),
          (this.get_element().style.zIndex =
            t.get_items().get_count() - this.get_index()),
          (e.style.zIndex = t.get_items().get_count() + 1),
          this.get_menu()._incrementZIndex(this._zIndexStep);
      },
      _positionChildContainer: function () {
        this._autoScrollActive || this._saveAnimationContainerSize();
        var e = this._positionChildContainerBasic(),
          t = e.left,
          i = e.top,
          n = this.get_menu(),
          s = n.get_enableAutoScroll(),
          l = n.get_enableScreenBoundaryDetection(),
          r = !1;
        if (s) {
          if (
            !this._applyAutoScroll(t, i) &&
            (this._autoScrollActive &&
              (this._removeAutoScroll(),
              (this._autoScrollActive = !1),
              this._restoreAnimationContainerSize(),
              (t = (e = this._positionChildContainerBasic()).left),
              (i = e.top)),
            l)
          ) {
            var a = this._adjustForScreenBoundaries(t, i);
            (r = !0), this._applyAutoScroll(a.adjustedLeft, a.adjustedTop);
          }
          this._autoScrollActive && this._updateScrollSize();
        }
        l && !r && this._adjustForScreenBoundaries(t, i),
          this._updateTextElementClass();
      },
      _positionChildContainerBasic: function () {
        var e = 0,
          i = 0,
          n = this.get_element(),
          s = n.offsetHeight,
          l = n.offsetWidth,
          r = this._getAnimationContainer(),
          a = r.offsetHeight,
          o = r.offsetWidth;
        switch (this.get_groupSettings().get_expandDirection()) {
          case t.ExpandDirection.Up:
            e = -a;
            break;
          case t.ExpandDirection.Down:
            e = s;
            break;
          case t.ExpandDirection.Left:
            i = -o;
            break;
          case t.ExpandDirection.Right:
            i = l;
        }
        return (
          this.get_menu().get_rightToLeft() &&
            0 == this.get_level() &&
            ((i = l - o),
            this._getParentFlow() == t.ItemFlow.Vertical && (i -= l)),
          this._setChildContainerPosition(i, e),
          { left: i, top: e }
        );
      },
      _setChildContainerPosition: function (e, i) {
        var n = this._getAnimationContainer(),
          s = this.get_parent(),
          l = null;
        if ((s._getScrollWrapElement && (l = s._getScrollWrapElement()), l)) {
          this._detachChildren();
          var r = this.get_element();
          (i += r.offsetTop), (e += r.offsetLeft);
          var a = s.get_childListElement(),
            o = parseInt(a.style.top, 10);
          isNaN(o) && (o = 0),
            0 == this.get_groupSettings().get_offsetY() && (i += o);
          var h = parseInt(a.style.left, 10);
          isNaN(h) && (h = 0),
            0 == this.get_groupSettings().get_offsetX() &&
              ((e += h),
              this._getParentFlow() == t.ItemFlow.Horizontal &&
                (e = Math.max(e, 0)));
        }
        (n.style.left = e + this.get_groupSettings().get_offsetX() + "px"),
          (n.style.top = i + this.get_groupSettings().get_offsetY() + "px");
      },
      _adjustForScreenBoundaries: function (i, n) {
        var s = this._getAnimationContainer(),
          l = s.offsetHeight,
          r = s.offsetWidth,
          a = this.get_menu().get_rightToLeft(),
          o = this.get_element(),
          h = o.offsetHeight,
          _ = o.offsetWidth,
          g = this.get_groupSettings().get_expandDirection(),
          d = g,
          u = t.RadMenu._getViewPortSize(),
          m = e().scrollTop(),
          c = $telerik.getLocation(s),
          p = $telerik.getLocation(o),
          f = u.width - p.x - o.offsetWidth,
          v = p.x,
          C = u.height - p.y - o.offsetHeight,
          E = p.y - m;
        switch (g) {
          case t.ExpandDirection.Up:
            ($telerik.elementOverflowsTop(s, c) || (c.y < m && C > E)) &&
              ((d = t.ExpandDirection.Down), (n = h));
            break;
          case t.ExpandDirection.Down:
            $telerik.elementOverflowsBottom(u, s, c) &&
              p.y > s.offsetHeight &&
              ((d = t.ExpandDirection.Up), (n = -l));
            break;
          case t.ExpandDirection.Left:
            if (
              (c.x < e(document).scrollLeft() &&
                f > v &&
                ((d = t.ExpandDirection.Right), (i = _)),
              a && 0 == this.get_level())
            ) {
              var S = v > e(this.get_childListElement()).outerWidth(!0),
                I = "get_contextMenuElement" in this.get_menu();
              S && !I && (i -= _);
            }
            break;
          case t.ExpandDirection.Right:
            $telerik.elementOverflowsRight(u, s, c)
              ? v > f && ((d = t.ExpandDirection.Left), (i = -r))
              : a &&
                ($telerik.elementOverflowsLeft(s) && f > v
                  ? (i += r)
                  : ((d = t.ExpandDirection.Left), (i -= _)));
        }
        switch (d) {
          case t.ExpandDirection.Down:
          case t.ExpandDirection.Up:
            if ($telerik.elementOverflowsRight(u, s)) {
              var w = u.width - (c.x + r);
              this.get_menu().get_rightToLeft() && 0 == this.get_level()
                ? (i += w)
                : (i = w);
            }
            a && $telerik.elementOverflowsLeft(s) && f > v && (i = i + r - _);
            break;
          case t.ExpandDirection.Left:
          case t.ExpandDirection.Right:
            if ($telerik.elementOverflowsBottom(u, s)) {
              var x = Math.min(l, u.height);
              n = u.height - (c.y + x) - this._defaultScrollSize;
            }
        }
        return (
          this._setChildContainerPosition(i, n),
          this._slide.set_direction(d),
          { adjustedLeft: i, adjustedTop: n }
        );
      },
      _resetAnimatedElementPosition: function () {
        var e = this._getAnimatedElement();
        (e.style.top = "0px"), (e.style.left = "0px");
      },
      _determineExpandDirection: function () {
        var e = this.get_groupSettings();
        e.get_expandDirection() == t.ExpandDirection.Auto &&
          (this._getParentFlow() == t.ItemFlow.Vertical
            ? this.get_menu().get_rightToLeft()
              ? e.set_expandDirection(t.ExpandDirection.Left)
              : e.set_expandDirection(t.ExpandDirection.Right)
            : e.set_expandDirection(t.ExpandDirection.Down));
      },
      _getMaximumExpandSize: function () {
        var e,
          i,
          n = this._slide.get_direction(),
          s = t.RadMenu._getViewPortSize(),
          l = this._getAnimationContainer(),
          r = $telerik.getLocation(l);
        return this.get_groupSettings().get_flow() == t.ItemFlow.Vertical
          ? ((e =
              n == t.ExpandDirection.Up
                ? l.offsetHeight + r.y
                : s.height - r.y - this._defaultScrollSize),
            Math.min(e, s.height - this._defaultScrollSize))
          : ((i = n == t.ExpandDirection.Left ? r.x : s.width - r.x),
            Math.min(i, s.width));
      },
      _saveAnimationContainerSize: function () {
        var e = this._getAnimationContainer(),
          t = e.offsetHeight,
          i = e.offsetWidth;
        (this._animationContainerOriginalSize = {}),
          (this._animationContainerOriginalSize.height = t),
          (this._animationContainerOriginalSize.width = i);
      },
      _restoreAnimationContainerSize: function () {
        if (this._animationContainerOriginalSize) {
          var e = this._getAnimationContainer();
          (e.style.height = this._animationContainerOriginalSize.height + "px"),
            (e.style.width = this._animationContainerOriginalSize.width + "px"),
            (this._animationContainerOriginalSize = null);
        }
      },
      _getSlideDirection: function () {
        var e = this.get_groupSettings().get_expandDirection();
        return e == t.ExpandDirection.Auto ? null : e;
      },
      _getExpandClassName: function () {
        return "rmExpand" + this._getExpandClass();
      },
      _getExpandClass: function () {
        switch (this._getSlideDirection()) {
          case t.jSlideDirection.Up:
            return "Top";
          case t.jSlideDirection.Down:
            return "Down";
          case t.jSlideDirection.Left:
            return "Left";
          case t.jSlideDirection.Right:
            return "Right";
        }
      },
      _fitsWindow: function () {
        var e = this._getMaximumExpandSize(),
          i = this._getAnimationContainer();
        return this.get_groupSettings().get_flow() == t.ItemFlow.Vertical
          ? i.offsetHeight <= e
          : i.offsetWidth <= e;
      },
      _updateImageSrc: function () {
        var e = this.get_imageUrl();
        if (
          (this._hovered &&
            this.get_hoveredImageUrl() &&
            (e = this.get_hoveredImageUrl()),
          this._state == t.RadMenuItemState.Open &&
            this.get_expandedImageUrl() &&
            (e = this.get_expandedImageUrl()),
          !this.get_enabled() &&
            this.get_disabledImageUrl() &&
            (e = this.get_disabledImageUrl()),
          this._clicked &&
            this.get_clickedImageUrl() &&
            (e = this.get_clickedImageUrl()),
          this.get_selected() &&
            this.get_selectedImageUrl() &&
            (e = this.get_selectedImageUrl()),
          e && this.get_element())
        ) {
          var i = this.get_imageElement();
          i || (i = this._createImageElement()),
            (e = e.replace(/&amp;/gi, "&")) != i.src && (i.src = e);
        }
      },
      _applyCssClass: function (e, t) {
        var i = this;
        this.withView(function () {
          i.get_view()._applyCssClass(e, t);
        });
      },
      _updateLinkClass: function () {
        var e = this;
        this.get_isSeparator() ||
          this.withView(function () {
            e.get_view()._updateLinkClass();
          });
      },
      _updateTextElementClass: function () {
        var e = this;
        this.withView(function () {
          e.get_view()._updateTextElementClass();
        });
      },
      _updateColumnWrapSize: function () {
        var t = e(this.get_childListElement());
        if (t.is(".rmMultiColumn")) {
          var i = 0,
            n = 0;
          e(t)
            .children(".rmGroupColumn")
            .children(".rmGroup")
            .each(function () {
              (i += this.offsetWidth), (n = Math.max(this.offsetHeight, n));
            }),
            0 != i &&
              0 != n &&
              t.css("width", i + "px").css("height", n + "px");
        }
      },
      _updateScrollPosition: function () {
        this._scroller.updateState(),
          this.get_menu().get_rightToLeft() &&
            this._groupSettings.get_flow() == t.ItemFlow.Horizontal &&
            ((this.get_childListElement().style.cssFloat = "left"),
            this._scroller.scrollToMaxPosition());
      },
      _updateChildListWidth: function () {
        var i = this.get_menu();
        if (
          this._groupSettings.get_flow() == t.ItemFlow.Vertical &&
          i.get_rightToLeft() &&
          $telerik.isIE
        ) {
          var n = this.get_childListElement(),
            s = e(n).children(".rmItem").get(0);
          s && (n.style.width = s.offsetWidth + "px");
        }
      },
      _recalculateColumns: function () {
        if (
          this.get_groupSettings().get_repeatDirection() !=
          t.MenuRepeatDirection.Horizontal
        )
          for (
            var i = this.get_childListElement(),
              n = e(i).children(".rmGroupColumn"),
              s = n.length - 1;
            s > 0;
            s--
          ) {
            var l = n[s],
              r = n[s - 1];
            if (this._getColumnItemCount(r) == this._getColumnItemCount(l))
              return;
            e(r)
              .children(".rmGroup")
              .append(e(l).children(".rmGroup").children(".rmItem").eq(0));
          }
      },
      _createEmptyColumn: function () {
        var t = this._getGroupCssClass(),
          n = new i();
        n.append("<li class='", l, "'>"),
          this._renderChildGroup(n, [], t),
          n.append("</li>");
        var s = e(n.toString());
        return e(this.get_childListElement()).append(s), s;
      },
      _createImageElement: function () {
        var e = this,
          t = this.get_enableImageSprite() ? d : "img",
          i = this.get_linkElement() || this.get_element();
        return (
          (this._imageElement = document.createElement(t)),
          (this._imageElement.className = o),
          this.get_enabled() || (this._imageElement.disabled = "disabled"),
          i.firstChild
            ? this.withView(function () {
                e.get_view()._positionImageElement(i);
              })
            : i.appendChild(this._imageElement),
          this._imageElement
        );
      },
      _hasMultipleColumns: function () {
        var e = this.get_groupSettings().get_repeatColumns();
        return (
          1 == e &&
            (e = this.get_menu()
              .get_defaultGroupSettings()
              .get_repeatColumns()),
          e > 1
        );
      },
      _onCollapseAnimationEnded: function () {
        var e = this.get_menu();
        if (
          ((this.get_element().style.zIndex = 0),
          e._restoreZIndex(),
          0 == this.get_level() && e.get_rightToLeft())
        ) {
          var t = e.get_element();
          t.style.cssText = t.style.cssText;
        }
      },
      _stopAnimation: function () {
        this._slide && this._slide._stopAnimation();
      },
      _resolveCssClass: function (i, n) {
        var s,
          l = [];
        return (
          this.get_templated() ||
            (l.push(i),
            n &&
              "" == this.get_text() &&
              0 === e(this.get_textElement()).children().length &&
              l.push("rmImageOnly"),
            n && this._isRootLink() && l.push("rmRootLink"),
            this.get_focused() &&
              !this.get_templated() &&
              l.push(this.get_focusedCssClass()),
            (s = this.get_menu()),
            !this.get_selected() ||
              (s && !s.get_enableSelection()) ||
              l.push(this.get_selectedCssClass()),
            this._clicked && l.push(this.get_clickedCssClass()),
            l.push(this.get_cssClass())),
          this._state == t.RadMenuItemState.Open &&
            l.push(this.get_expandedCssClass()),
          this.get_enabled() ||
            Array.addRange(l, ["rmDisabled", this.get_disabledCssClass()]),
          l
        );
      },
      _preventDefaultUnderMobile: function (t) {
        if (!t) return !1;
        if (
          !(
            this._shouldNavigate() ||
            e(this.get_element()).hasClass("rmTemplate") ||
            this._getContentTemplateContainer()
          )
        )
          t.preventDefault();
        else if (
          !this.get_menu().get_showToggleHandle() &&
          this._shouldOpen()
        ) {
          if (this.get_isOpen()) return !0;
          t.preventDefault();
        }
        return !1;
      },
      _applyTemplate: function () {
        var e = this;
        this.withView(function () {
          e.get_view()._applyTemplate();
        });
      },
      _initializeScroller: function () {
        this._getScrollWrapElement() &&
          ((this._scroller = new t.MenuItemScroller(
            this,
            this.get_childListElement(),
            this.get_groupSettings().get_flow(),
          )),
          this._scroller.initialize());
      },
      _removeScrollWrapContainer: function () {
        var e = this.get_menu();
        e &&
          ((e.get_enableRoundedCorners() && this._roundedCornersRendered) ||
            (e.get_enableShadows() && this._shadowsRendered)) &&
          t.RadMenu._removeScrollWrapContainer(this);
      },
      _getShouldRenderScrollWrap: function () {
        if (this._hasMultipleColumns()) return !1;
        var e = this.get_groupSettings(),
          t = this.get_menu().get_defaultGroupSettings(),
          i = e.get_width();
        i || (i = t.get_width());
        var n = e.get_height();
        return n || (n = t.get_height()), i || n;
      },
      _initializeAutoScroll: function () {
        this._removeChildListCorners(),
          this._buildScrollWrap(),
          this._initializeScroller(),
          (this._animatedElement = null),
          (this._scrollWrapElement = null),
          this._slide.set_animatedElement(this._getAnimatedElement()),
          this._ensureRoundedCorners(),
          this._ensureShadows();
      },
      _isAutoScrollPossible: function () {
        var e = this.get_menu(),
          i = this._getMaximumExpandSize(),
          n = this._getAnimationContainer();
        return this.get_groupSettings().get_flow() == t.ItemFlow.Vertical
          ? e.get_autoScrollMinimumHeight() < i && i <= n.offsetHeight
          : e.get_autoScrollMinimumWidth() < i && i <= n.offsetWidth;
      },
      _applyAutoScroll: function (e, t) {
        return (
          !!this._isAutoScrollPossible() &&
          (this._scroller ||
            (this._initializeAutoScroll(),
            (this._autoScrollActive = !0),
            this._setChildContainerPosition(e, t)),
          !0)
        );
      },
      _removeAutoScroll: function () {
        this._removeScrollWrapContainer();
        for (var e = this.get_items(), t = e.get_count(), i = 0; i < t; i++)
          e.getItem(i)._removeAutoScroll();
        if ((this._attachChildren(), this._scroller)) {
          this._scroller.dispose(), (this._scroller = null);
          var n = this._getSlideWrapElement(),
            l = this.get_childListElement(),
            r = this._getScrollWrapElement();
          n.appendChild(l),
            n.removeChild(r),
            (l.className = String.format(
              "{0} {1} {2}{3}",
              this._getFlowCssClass(),
              s,
              a,
              this.get_level(),
            )),
            (this._animatedElement = null),
            (this._scrollWrapElement = null),
            this._slide.set_animatedElement(this._getAnimatedElement()),
            this._slide.updateSize(),
            this._ensureRoundedCorners(),
            this._ensureShadows();
        }
      },
      _updateScrollSize: function () {
        var e = this._slide.get_direction(),
          i = this._getAnimationContainer(),
          n = this._getScrollWrapElement();
        (n.style.height = ""), (n.style.width = "");
        var s = this._getMaximumExpandSize();
        this.get_groupSettings().get_flow() == t.ItemFlow.Vertical
          ? ($telerik.setSize(n, {
              height: s,
              width: parseInt(i.style.width, 10),
            }),
            e == t.ExpandDirection.Up && (i.style.top = -s + "px"))
          : $telerik.setSize(n, {
              width: s,
              height: parseInt(i.style.height, 10),
            }),
          this._slide.updateSize(),
          this._scroller.resetState();
      },
      _buildScrollWrap: function () {
        var e = this._getSlideWrapElement(),
          t = this.get_childListElement(),
          i = document.createElement("div");
        (i.style.position = "relative"),
          (i.style.overflow = "hidden"),
          (t.className = this._getFlowCssClass()),
          (i.className = String.format(
            "{0} {1} {2}{3}",
            r,
            s,
            a,
            this.get_level(),
          )),
          i.appendChild(t),
          e.appendChild(i);
      },
      _updateScrollWrapSize: function () {
        var e = this._getScrollWrapElement(),
          i = this.get_childListElement();
        e &&
          (e.style.height || (e.style.height = i.offsetHeight + "px"),
          this.get_groupSettings().get_flow() == t.ItemFlow.Vertical &&
            (e.style.width = i.offsetWidth + "px"));
      },
      _adjustSiblingsWidth: function (e) {
        var i = this.get_parent();
        i && (this._clearSiblingsWidth(), t.RadMenu._adjustChildrenWidth(i, e));
      },
      _clearSiblingsWidth: function () {
        for (
          var e = this.get_parent(), t = e.get_items(), i = 0;
          i < t.get_count();
          i++
        ) {
          var n = t.getItem(i);
          if (n != this) {
            var s = n.get_linkElement();
            s && (s.style.width = "auto");
          }
          $telerik.isSafari && (e.get_childListElement().style.width = "auto");
        }
      },
      _ensureToggleButton: function () {
        var e = this,
          t = this.get_linkElement() || this.get_element();
        this._getToggleButtonElement() ||
          (this._createToggleButtonElement(),
          this.withView(function () {
            e.get_view()._positionToggleButtonElement(
              t,
              e._toggleButtonElement,
            );
          }));
      },
      _ensureRoundedCorners: function () {
        var e = this;
        this.withView(function () {
          e.get_view()._ensureRoundedCorners();
        });
      },
      _ensureShadows: function () {
        var e = this;
        this.withView(function () {
          e.get_view()._ensureShadows();
        });
      },
      _removeChildListCorners: function () {
        var e = this;
        this.withView(function () {
          e.get_view()._removeChildListCorners();
        });
      },
      _isRootLink: function () {
        if (this.get_menu())
          return (
            !(this.get_level() > 0) &&
            !("get_contextMenuElement" in this.get_menu())
          );
      },
      _createLoadingItem: function () {
        var e = this.get_menu().get_loadingTemplate();
        if ("" !== e) {
          var i = new t.RadMenuItem();
          this.get_items().add(i), i.set_text(e);
        }
      },
      _removeLoadingItem: function () {
        if ("" !== this.get_menu().get_loadingTemplate()) {
          var e = this.get_items().getItem(0);
          this.get_items().remove(e);
        }
      },
      _onChildrenLoading: function () {
        (this._itemsLoading = !0),
          this._createLoadingItem(),
          this._doOpen(null);
      },
      _onChildrenLoaded: function () {
        if (
          (this._removeLoadingItem(),
          (this._itemsLoaded = !0),
          (this._itemsLoading = !1),
          this.get_items().get_count() > 0)
        ) {
          var i = e(this.get_element()).hasClass("rmTemplate");
          this._hovered || i || $telerik.isTouchDevice
            ? this._doOpen(null)
            : this.get_menu()._renderMode === t.RenderMode.Lite &&
              (this._getAnimationContainer().style.width = "auto");
        }
      },
      _onChildrenLoadingError: function () {
        this._close(null),
          this._removeLoadingItem(),
          (this._itemsLoaded = !1),
          (this._itemsLoading = !1);
      },
    }),
    t.RadMenuItem.registerClass("Telerik.Web.UI.RadMenuItem", t.BaseMenuItem);
})($telerik.$, Telerik.Web.UI, Telerik.Web.StringBuilder);
