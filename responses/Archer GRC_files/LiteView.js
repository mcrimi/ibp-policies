!(function (e, t, n) {
  var r = "rmItem",
    s = "rmLink",
    a = "rmTemplate",
    i = [a, "rmLast", "rmFirst", r],
    l = [
      "rmExpand",
      "rmExpandDown",
      "rmExpandTop",
      "rmExpandLeft",
      "rmExpandRight",
    ],
    o = "span",
    d = e.extend;
  t.RadMenuItem.Views || (t.RadMenuItem.Views = {}),
    t.RadMenu.StaticViews || (t.RadMenu.StaticViews = {}),
    (t.RadMenu.StaticViews.Lite = {
      ExtendContextMenuWithView: function (e) {
        d(e, {
          _ensureDecorationElements: function () {
            this._ensureRoundedCorners(), this._ensureShadows();
          },
          _ensureRoundedCorners: function () {
            this._roundedCornersRendered = !0;
          },
          _ensureShadows: function () {
            this._shadowsRendered = !0;
          },
        });
      },
      ExtendScrollerWithView: function (t) {
        d(t, {
          _createArrowDomElement: function () {
            var e = document.createElement(o),
              t = document.createElement(o);
            return (
              (t.className = "rmIcon"),
              t.appendChild(document.createTextNode("Scroll Arrow")),
              (e.className = "rmArrow"),
              e.appendChild(t),
              this._scrollElement.appendChild(e),
              e
            );
          },
          _setElementCssClass: function (t, n, r) {
            var s = e(t);
            s.hasClass(n) || s.removeClass(r).addClass(n);
          },
        });
      },
    }),
    (t.RadMenuItem.Views.Lite = function (e) {
      this._owner = e;
    }),
    (t.RadMenuItem.Views.Lite.prototype = {
      get_templateClassClass: function () {
        return "rmContent";
      },
      set_navigateUrl: function (e) {
        var t = this._owner.get_linkElement();
        t &&
          (e && "#" !== e
            ? "A" == t.nodeName
              ? (t.href = e)
              : this._replaceSpanElement(e)
            : this._replaceLinkElement());
      },
      get_text: function () {
        var e,
          t = this._owner;
        return null !== t._text
          ? t._text
          : ((t._text = t._properties.getValue("text", "")),
            t._text
              ? t._text
              : t.get_element() &&
                  ((e = t.get_textElement()) || (e = t.get_linkElement()))
                ? (void 0 !== e.innerText
                    ? (t._text = e.innerText)
                    : (t._text = e.textContent),
                  t._text)
                : "");
      },
      set_text: function (e) {
        var t = this._owner,
          n = t.get_textElement() || t.get_linkElement();
        n && (n.innerHTML = e),
          (t._text = e),
          t._properties.setValue("text", e, !0);
      },
      _renderLink: function (e) {
        var t = this._owner,
          r = t.get_navigateUrl(),
          a = t.get_target(),
          i = s,
          l = new n(e);
        t._isRootLink() && (i += " rmRootLink"),
          "" == t.get_text() && (i += " rmImageOnly"),
          r && "#" != r
            ? (l.append("<a href='", r, "' "),
              a && l.append("target='", a, "' "),
              l.append("class='", i, "'>"))
            : l.append("<span class='", i, "' tabindex='0'>");
      },
      _renderLinkContent: function (e) {
        var t = this._owner;
        t.get_isSeparator() || t._renderLinkContent(e);
      },
      _renderTextElement: function (e, t) {
        var n = this._owner;
        t ? n._renderTextElement(e) : (e[e.length] = n.get_text());
      },
      _renderLinkEndTag: function (e) {
        var t = this._owner.get_navigateUrl();
        e[e.length] = t && "#" != t ? "</a>" : "</span>";
      },
      _determineCssClass: function () {
        var e = [];
        return this._owner.get_isSeparator()
          ? (e.push(r), e.push("rmSeparator"), e.join(" "))
          : (Array.addRange(e, this._resolveLIClass()), e.join(" "));
      },
      _applyCssClass: function (t, n) {
        var r = this._owner,
          s = e(r.get_element());
        s.removeClass(n), s.addClass(t);
      },
      _updateLinkClass: function () {
        var t = e(this._owner.get_element()),
          n = this._resolveLIClass();
        Array.forEach(i, function (e) {
          t.hasClass(e) && Array.insert(n, 0, e);
        }),
          t.removeClass(),
          t.addClass(n.join(" "));
      },
      _updateTextElementClass: function () {
        var n = this._owner,
          r = e(n.get_linkElement());
        0 != r.length &&
          (Array.forEach(l, function (e) {
            r.removeClass(e);
          }),
          (n._getHasItems() ||
            n.get_expandMode() == t.MenuItemExpandMode.WebService) &&
            (r.addClass(l[0]),
            r.addClass("rmExpand " + n._getExpandClassName())));
      },
      _resolveLIClass: function () {
        var e = this._owner,
          t = e._resolveCssClass(r);
        return e.get_templated() && Array.addRange(t, [e.get_cssClass(), a]), t;
      },
      _ensureRoundedCorners: function () {
        this._owner._roundedCornersRendered = !0;
      },
      _ensureShadows: function () {
        this._owner._shadowsRendered = !0;
      },
      _ensureDecorationElements: function () {
        this._ensureRoundedCorners(), this._ensureShadows();
      },
      _removeChildListCorners: function () {
        var e = this._owner;
        (e._shadowsRendered = !0), (e._roundedCornersRendered = !0);
      },
      _replaceSpanElement: function (t) {
        var n = this._owner.get_linkElement(),
          r = e("<a href='" + t + "' class='" + n.className + "'></a>");
        this._replaceElement(r);
      },
      _replaceLinkElement: function () {
        var t = this._owner.get_linkElement(),
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
        var n = e(this._owner.get_linkElement());
        t.html(n.html()),
          t.attr("accesskey", n.attr("accesskey")),
          n.replaceWith(t),
          (this._owner._linkElement = t.get(0));
      },
      _createTextElement: function () {
        var t = this._owner,
          n = t.get_text();
        t._textElement = e("<span class='rmText'>" + n + "</span>").get(0);
      },
      _positionImageElement: function (t) {
        var n = this._owner,
          r = e(t);
        !n.get_textElement() && r.hasClass(s)
          ? (this._createTextElement(),
            r.empty(),
            t.appendChild(n._imageElement),
            t.appendChild(n._textElement))
          : t.insertBefore(n._imageElement, t.firstChild);
      },
      _positionToggleButtonElement: function (t, n) {
        var r = this._owner,
          a = e(t);
        !r.get_textElement() &&
          a.hasClass(s) &&
          (this._createTextElement(), a.empty(), t.appendChild(r._textElement)),
          t.appendChild(n);
      },
      _doOpen: function (e) {
        var n = this._owner,
          r = n._slide;
        (e.style.display = "block"),
          (e.style.visibility = "hidden"),
          (e.style.width = "auto"),
          n._groupSettings.get_flow() === t.ItemFlow.Vertical
            ? t.RadMenu._adjustChildrenWidth(n)
            : t.RadMenu._adjustListWidth(n),
          n._adjustSiblingsWidthOnShow &&
            (n._adjustSiblingsWidth(), (n._adjustSiblingsWidthOnShow = !1)),
          n._updateColumnWrapSize(),
          n._resetAnimatedElementPosition(),
          r.set_direction(n._getSlideDirection()),
          r.set_animatedElement(n._getAnimatedElement()),
          r.updateSize(),
          n._updateScrollWrapSize(),
          !n._scroller ||
            n._autoScrollActive ||
            n._fitsWindow() ||
            n._updateScrollSize(),
          n._positionChildContainer(),
          (e.style.visibility = "visible"),
          n._updateZIndex(),
          n._scroller && n._updateScrollPosition(),
          r.expand();
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
          e("span.rmLink", t._element).replaceWith(n),
            e(t._element).addClass("rmTemplate");
        }
      },
    });
})($telerik.$, Telerik.Web.UI, Telerik.Web.StringBuilder);
