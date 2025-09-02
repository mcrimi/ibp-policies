!(function (e, t, n) {
  var i = "rmItem",
    s = "rmLink",
    r = "rmText",
    d = e.extend;
  t.RadMenuItem.Views || (t.RadMenuItem.Views = {}),
    t.RadMenu.StaticViews || (t.RadMenu.StaticViews = {}),
    (t.RadMenu.StaticViews.Classic = {
      ExtendContextMenuWithView: function (e) {
        d(e, {
          _ensureDecorationElements: function () {
            this._ensureRoundedCorners(), this._ensureShadows();
          },
          _ensureRoundedCorners: function () {
            this._roundedCornersRendered ||
              (this.get_enableRoundedCorners() &&
                ((this._roundedCornersRendered = !0),
                t.RadMenu._renderCornerElements(this)));
          },
          _ensureShadows: function () {
            this._shadowsRendered ||
              (this.get_enableShadows() &&
                ((this._shadowsRendered = !0),
                t.RadMenu._renderCornerElements(this, "shadow")));
          },
        });
      },
      ExtendScrollerWithView: function (t) {
        d(t, {
          _createArrowDomElement: function (t) {
            var n = document.createElement("a");
            return (
              (n.href = "#"),
              (n.style.zIndex = t),
              n.appendChild(document.createTextNode("&nbsp;")),
              $telerik.isIE &&
                e(n).bind("dragstart.menuScroller", function () {
                  return !1;
                }),
              this._scrollElement.appendChild(n),
              n
            );
          },
          _setElementCssClass: function (e, t) {
            e.className != t && (e.className = t);
          },
        });
      },
    }),
    (t.RadMenuItem.Views.Classic = function (e) {
      this._owner = e;
    }),
    (t.RadMenuItem.Views.Classic.prototype = {
      get_templateClassClass: function () {
        return r;
      },
      set_navigateUrl: function (e) {
        var t = this._owner.get_linkElement();
        t && (t.href = e);
      },
      get_text: function () {
        return t.RadMenuItem.callBaseMethod(this._owner, "get_text");
      },
      set_text: function (e) {
        t.RadMenuItem.callBaseMethod(this._owner, "set_text", [e]);
      },
      _renderLink: function (t) {
        var i = "#",
          r = this._owner.get_navigateUrl(),
          d = this._owner.get_target(),
          a = new n(t);
        r && "#" != r && (i = r),
          a.append("<a href='", i, "' "),
          d && a.append("target='", d, "' "),
          a.append("class='", s, " "),
          "" != this._owner.get_text() ||
            e(this._owner.get_textElement()).children().length ||
            a.append(" rmImageOnly"),
          this._owner._isRootLink() && a.append(" rmRootLink"),
          this._owner.get_enabled() || a.append("rmDisabled"),
          a.append("'>");
      },
      _renderLinkContent: function (e) {
        this._owner.get_isSeparator()
          ? this._renderTextElement(e)
          : this._owner._renderLinkContent(e);
      },
      _renderTextElement: function (e) {
        this._owner._renderTextElement(e);
      },
      _renderLinkEndTag: function (e) {
        e[e.length] = "</a>";
      },
      _determineCssClass: function () {
        return this._owner.get_isSeparator() ? i + " rmSeparator" : i;
      },
      _applyCssClass: function (t, n) {
        var i = this._owner,
          s = i.get_templated() ? e(i.get_element()) : e(i.get_linkElement());
        s.removeClass(n), s.addClass(t);
      },
      _updateLinkClass: function () {
        var t = this._owner,
          n = t.get_templated() ? t.get_templateElement() : t.get_linkElement(),
          i = e(n),
          d = t._resolveCssClass(s, !0);
        i.is("div") && d.splice(0, 0, r),
          i.removeClass(),
          i.addClass(d.join(" "));
      },
      _updateTextElementClass: function () {
        var e = this._owner,
          n = e.get_textElement(),
          i = r;
        n &&
          ((e._getHasItems() ||
            e.get_expandMode() == t.MenuItemExpandMode.WebService) &&
            (i += " " + e._getExpandClassName()),
          (n.className = i));
      },
      _ensureRoundedCorners: function () {
        var e,
          n = this._owner;
        n._roundedCornersRendered ||
          ((e = n.get_menu()) &&
            e.get_enableRoundedCorners() &&
            ((n._roundedCornersRendered = !0),
            t.RadMenu._renderCornerElements(n)));
      },
      _ensureShadows: function () {
        var e,
          n = this._owner;
        n._shadowsRendered ||
          ((e = n.get_menu()) &&
            e.get_enableShadows() &&
            ((n._shadowsRendered = !0),
            t.RadMenu._renderCornerElements(n, "shadow")));
      },
      _ensureDecorationElements: function () {
        this._ensureRoundedCorners(), this._ensureShadows();
      },
      _removeChildListCorners: function () {
        var e = this._owner,
          n = e.get_menu();
        (n.get_enableRoundedCorners() || n.get_enableShadows()) &&
          t.RadMenu._removeChildListCorners(e);
      },
      _positionImageElement: function (e) {
        e.insertBefore(this._owner._imageElement, e.firstChild);
      },
      _positionToggleButtonElement: function (e, t) {
        e.appendChild(t);
      },
      _doOpen: function (e) {
        var n,
          i = this._owner,
          s = i.get_menu();
        this._ensureDecorationElements(),
          ((n = i.get_childListElement()).style.display = "block"),
          $telerik.isOpera &&
            (s.get_enableRoundedCorners() || s.get_enableShadows()) &&
            (n.style.position = "absolute"),
          $telerik.isIE7 || (e.style.visibility = "hidden"),
          i._updateColumnWrapSize(),
          i._slide.updateSize(),
          i._slide.show(),
          i._groupSettings.get_flow() == t.ItemFlow.Vertical
            ? t.RadMenu._adjustChildrenWidth(i)
            : t.RadMenu._adjustListWidth(i),
          i._adjustSiblingsWidthOnShow &&
            (i._adjustSiblingsWidth(), (i._adjustSiblingsWidthOnShow = !1)),
          i._updateChildListWidth(),
          i._updateColumnWrapSize(),
          i._resetAnimatedElementPosition(),
          i._slide.set_direction(i._getSlideDirection()),
          i._slide.set_animatedElement(i._getAnimatedElement()),
          i._slide.updateSize(),
          i._positionChildContainer(),
          i._updateScrollWrapSize(),
          !i._scroller ||
            i._autoScrollActive ||
            i._fitsWindow() ||
            (i._updateScrollSize(), i._positionChildContainer()),
          (e.style.visibility = "visible"),
          i._updateZIndex(),
          i._scroller && i._updateScrollPosition(),
          i._updateColumnWrapSize(),
          i._slide.updateSize(),
          i._slide.expand();
      },
      _applyTemplate: function () {
        var t = this._owner;
        if (t._renderedClientTemplate) {
          var n =
            "<div class='" +
            t._getTemplateClassName() +
            "'>" +
            t._renderedClientTemplate +
            "</div>";
          e("a.rmLink", t._element).replaceWith(n),
            e(t._element).addClass("rmTemplate");
        }
      },
    });
})($telerik.$, Telerik.Web.UI, Telerik.Web.StringBuilder);
