!(function () {
  Type.registerNamespace("Telerik.Web"),
    Type.registerNamespace("Telerik.Web.UI");
  var e = Telerik.Web.UI;
  (e.ModalExtender = function (t, i) {
    (this._windowResizeDelegate = null),
      (this._windowScrollDelegate = null),
      (this._xCoordinate = -1),
      (this._yCoordinate = -1),
      (this._backgroundElement = null),
      (this._foregroundElement = t),
      (this._saveTabIndexes = []),
      (this._saveAccessKeys = []),
      (this._saveDisabledElements = []),
      (this._tagWithTabIndex = new Array(
        "A",
        "AREA",
        "BUTTON",
        "INPUT",
        "OBJECT",
        "SELECT",
        "TEXTAREA",
        "IFRAME",
        "SPAN",
      )),
      (this._tagWithAcessKey = this._tagWithTabIndex),
      (this._elementsToDisable = []),
      i &&
        i.enableAriaSupport &&
        ((this._ariaHiddenStorage = new e.NodeAttributeDataStorage(
          "aria-hidden",
          {
            getNodes: i.getNodesToHide,
            onStore: function (e) {
              e.setAttribute("aria-hidden", "true");
            },
          },
        )),
        i.trapTabKey && (this._tabKeyTrap = new e.TabKeyTrap(t)));
  }),
    (e.ModalExtender.prototype = {
      dispose: function () {
        this.hide(),
          (this._backgroundElement = null),
          (this._foregroundElement = null),
          this._tabKeyTrap && this._tabKeyTrap.dispose(),
          (this._tabKeyTrap = undefined);
      },
      show: function () {
        var e = this._getModalOverlay();
        if (!$telerik.getVisible(e)) {
          this._attachWindowHandlers(!0),
            this._foregroundElement.parentNode.appendChild(e),
            this.updateModalOverlayZIndex(),
            (e.style.display = ""),
            this._disableElements(this._elementsToDisable),
            this._disableTab(),
            this._disableAccesskey();
          var t = this._ariaHiddenStorage,
            i = this._tabKeyTrap;
          t && t.store(),
            i && i.trap(),
            this._updatePageLayout(),
            this._updatePageLayout();
        }
      },
      updateModalOverlayZIndex: function () {
        var e = this._getModalOverlay(),
          t = this._foregroundElement,
          i = $telerik.getCurrentStyle(t, "zIndex");
        isNaN(parseInt(i, 10)) ||
          0 == parseInt(i, 10) ||
          (e.style.zIndex = i - 1);
      },
      hide: function () {
        var e = this._ariaHiddenStorage,
          t = this._tabKeyTrap;
        e && e.restore(),
          t && t.removeTrap(),
          this._restoreTab(),
          this._restoreAccessKey(),
          this._restoreDisabledElements(),
          this._attachWindowHandlers(!1);
        var i = this._backgroundElement;
        i &&
          (i.parentNode && i.parentNode.removeChild(i),
          (this._backgroundElement = null));
      },
      _getModalOverlay: function () {
        if (!this._backgroundElement) {
          var e = document.createElement("div");
          (e.style.display = "none"),
            (e.style.position = "absolute"),
            $telerik.isRightToLeft(this._foregroundElement)
              ? (e.style.right = "0px")
              : (e.style.left = "0px"),
            (e.style.top = "0px"),
            (e.style.zIndex = 1e4),
            (e.style.backgroundColor = "#aaaaaa"),
            (e.style.filter =
              "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=50)"),
            (e.style.opacity = ".5"),
            (e.style.MozOpacity = ".5"),
            e.setAttribute("unselectable", "on"),
            (e.className = "TelerikModalOverlay"),
            (this._backgroundElement = e);
        }
        return this._backgroundElement;
      },
      _attachWindowHandlers: function (e) {
        var t = window;
        1 == e
          ? ((this._windowResizeDelegate = Function.createDelegate(
              this,
              this._updatePageLayout,
            )),
            $addHandler(t, "resize", this._windowResizeDelegate),
            (this._windowScrollDelegate = Function.createDelegate(
              this,
              this._updatePageLayout,
            )),
            $addHandler(t, "scroll", this._windowScrollDelegate))
          : (this._windowResizeDelegate &&
              $removeHandler(t, "resize", this._windowResizeDelegate),
            (this._windowResizeDelegate = null),
            this._windowScrollDelegate &&
              $removeHandler(t, "scroll", this._windowScrollDelegate),
            (this._windowScrollDelegate = null));
      },
      _updatePageLayout: function () {
        var e = $telerik.getClientBounds(),
          t = e.width,
          i = e.height,
          n = this._getModalOverlay();
        (n.style.width =
          Math.max(
            Math.max(
              document.documentElement.scrollWidth,
              document.body.scrollWidth,
            ),
            t,
          ) + "px"),
          (n.style.height =
            Math.max(
              Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight,
              ),
              i,
            ) + "px");
      },
      _getElementsWithTabIndexes: function (e, t) {
        var i = this,
          n = $telerik
            .$(e)
            .find(this._tagWithTabIndex.join(","))
            .filter(function () {
              return (
                -1 != this.tabIndex &&
                !this.disabled &&
                this !== t &&
                !$telerik.$.contains(t, this) &&
                !!$telerik.getVisible(this) &&
                !("SPAN" == this.nodeName && !i._hasTabIndexAttribute(this))
              );
            });
        return $telerik.$.makeArray(n);
      },
      _getElementsWithAccessKey: function (e, t) {
        var i = $telerik
          .$(e)
          .find(this._tagWithAcessKey.join(","))
          .filter(function () {
            return (
              !(
                !this.accessKey ||
                this.disabled ||
                this === t ||
                $telerik.$.contains(t, this)
              ) && !!$telerik.getVisible(this)
            );
          });
        return $telerik.$.makeArray(i);
      },
      _hasTabIndexAttribute: function (e) {
        if (e.hasAttribute) return e.hasAttribute("tabIndex");
        var t = e.getAttribute("tabIndex");
        if (null == t || "undefined" == t || -32768 === t) return !1;
        if ("number" == typeof t && 0 != t) return !0;
        if (0 == t) {
          var i = $telerik.getOuterHtml(e).replace(e.innerHTML);
          return /tabindex=/i.test(i);
        }
        return !1;
      },
      _getElementsToDisable: function (e, t, i) {
        var n = $telerik
          .$(t)
          .find(e.join(","))
          .filter(function () {
            return !(
              this.disabled ||
              !$telerik.getVisible(this) ||
              this === i ||
              $telerik.$.contains(i, this)
            );
          });
        return $telerik.$.makeArray(n);
      },
      _disableElements: function (e) {
        if (((this._saveDisabledElements = []), e && 0 != e.length))
          for (
            var t = this._getElementsToDisable(
                e,
                document,
                this._foregroundElement,
              ),
              i = 0;
            i < t.length;
            i++
          )
            (t[i].disabled = !0), this._saveDisabledElements.push(t[i]);
      },
      _restoreDisabledElements: function () {
        for (var e = 0; e < this._saveDisabledElements.length; e++)
          this._saveDisabledElements[e].disabled = !1;
      },
      _disableTab: function () {
        var e,
          t = this._getElementsWithTabIndexes(
            document,
            this._foregroundElement,
          );
        for (this._saveTabIndexes = [], e = 0; e < t.length; e++) {
          var i = t[e],
            n = i.tabIndex,
            s = this._hasTabIndexAttribute(i);
          this._saveTabIndexes.push({ tag: i, index: n, hasAttribute: s }),
            (i.tabIndex = "-1");
        }
      },
      _restoreTab: function () {
        for (var e = 0; e < this._saveTabIndexes.length; e++) {
          var t = this._saveTabIndexes[e].tag;
          (t.tabIndex = this._saveTabIndexes[e].index),
            !this._saveTabIndexes[e].hasAttribute &&
              this._hasTabIndexAttribute(t) &&
              t.removeAttribute("tabIndex");
        }
      },
      _disableAccesskey: function () {
        this._saveAccessKeys = [];
        for (
          var e = this._getElementsWithAccessKey(
              document,
              this._foregroundElement,
            ),
            t = 0;
          t < e.length;
          t++
        ) {
          var i = e[t],
            n = i.accessKey;
          this._saveAccessKeys.push({ element: i, accessKey: n }),
            (i.accessKey = "");
        }
      },
      _restoreAccessKey: function () {
        for (var e = 0; e < this._saveAccessKeys.length; e++)
          this._saveAccessKeys[e].element.accessKey =
            this._saveAccessKeys[e].accessKey;
      },
    }),
    e.ModalExtender.registerClass("Telerik.Web.UI.ModalExtender", null);
})($telerik.$),
  (function () {
    Type.registerNamespace("Telerik.Web");
    var e = Telerik.Web;
    (Telerik.Web.PositioningMode = function () {
      throw Error.invalidOperation();
    }),
      (Telerik.Web.PositioningMode.prototype = {
        Absolute: 0,
        Center: 1,
        BottomLeft: 2,
        BottomRight: 3,
        TopLeft: 4,
        TopRight: 5,
        None: 6,
      }),
      Telerik.Web.PositioningMode.registerEnum("Telerik.Web.PositioningMode"),
      (e.PopupAnimation = function (e, t) {
        var i = this,
          n = { easing: "", duration: 0, properties: {}, callback: null };
        (i._element = e || null),
          (i.options = $telerik.$.extend(n, t)),
          (i._inProgress = !1);
      }),
      (e.PopupAnimation.prototype = {
        get_easing: function () {
          return this.options.easing;
        },
        set_easing: function (e) {
          this.options.easing = e;
        },
        get_duration: function () {
          return this.options.duration;
        },
        set_duration: function (e) {
          this.options.easing = e;
        },
        get_properties: function () {
          return this.options.properties;
        },
        set_properties: function (e) {
          this.options.properties = e;
        },
        get_callback: function () {
          return this.options.callback;
        },
        set_callback: function (e) {
          this.options.callback = e;
        },
        get_element: function () {
          return this._element;
        },
        set_element: function (e) {
          this._element = e;
        },
        get_options: function (e) {
          return this.options;
        },
        set_options: function (e) {
          $telerik.$.extend(this.options, e);
        },
        isInProgress: function () {
          return this._inProgress;
        },
        play: function () {
          var e = this,
            t = $telerik.$(e.get_element());
          t.stopTransition(),
            (e._inProgress = !0),
            t.transition(
              e.get_properties(),
              e.get_duration(),
              e.get_easing(),
              function (t) {
                var i = e.get_callback();
                (e._inProgress = !1), $telerik.$.isFunction(i) && i();
              },
            );
        },
        stop: function () {
          $telerik.$(this.get_element()).stopTransition(),
            (this._inProgress = !1);
        },
      }),
      e.PopupAnimation.registerClass("Telerik.Web.PopupAnimation"),
      (Telerik.Web.PopupBehavior = function (e) {
        var t = this;
        Telerik.Web.PopupBehavior.initializeBase(this, [e]),
          (this._x = 0),
          (this._y = 0),
          (this._positioningMode = Telerik.Web.PositioningMode.Absolute),
          (this._parentElement = null),
          (this._parentElementID = null),
          (this._moveHandler = null),
          (this._firstPopup = !0),
          (this._originalParent = null),
          (this._overlay = !1),
          (this._keepInScreenBounds = !0),
          (this._manageVisibility = !0),
          (t._showAnimation = null),
          (t._hideAnimation = null),
          (t._useAnimation = !1);
      }),
      (Telerik.Web.PopupBehavior.prototype = {
        initialize: function () {
          var t = this;
          if (
            (Telerik.Web.PopupBehavior.callBaseMethod(t, "initialize"),
            t._useAnimation)
          ) {
            var i = t.get_elementToShow();
            (t._showAnimation = new e.PopupAnimation(i)),
              (t._hideAnimation = new e.PopupAnimation(i, {
                callback: $telerik.$.proxy(t._hide, t),
              })),
              t.hide();
          }
          t.hide();
        },
        getPageOffset: function () {
          return {
            x:
              $telerik.getCorrectScrollLeft(document.documentElement) ||
              $telerik.getCorrectScrollLeft(document.body),
            y: document.documentElement.scrollTop || document.body.scrollTop,
          };
        },
        pin: function (e) {
          var t,
            i = this.get_elementToShow(),
            n = this.getPageOffset(),
            s = e ? "fixed" : "absolute";
          i.style.position != s &&
            ((t = $telerik.getBounds(i)),
            e &&
              (n.x || n.y) &&
              ((this._x = t.x - n.x),
              (this._y = t.y - n.y),
              $telerik.setLocation(i, { x: this._x, y: this._y })),
            (i.style.position = s));
        },
        center: function () {
          var e = this.get_elementToShow();
          this._manageVisibility && $telerik.setVisible(e, !0);
          var t = $telerik.getClientBounds(),
            i = $telerik.getBounds(e),
            n = parseInt((t.width - i.width) / 2, 10),
            s = parseInt((t.height - i.height) / 2, 10),
            o = this.get_parentElement();
          this.set_parentElement(document.documentElement),
            this.set_x(n),
            this.set_y(s),
            this.show(),
            this.set_parentElement(o);
        },
        get_parentElement: function () {
          return (
            !this._parentElement &&
              this._parentElementID &&
              (this.set_parentElement($get(this._parentElementID)),
              Sys.Debug.assert(
                null != this._parentElement,
                String.format(
                  'Couldn\'t find parent element "{0}"',
                  this._parentElementID,
                ),
              )),
            this._parentElement
          );
        },
        set_parentElement: function (e) {
          this._parentElement = e;
        },
        get_parentElementID: function () {
          return this._parentElement
            ? this._parentElement.id
            : this._parentElementID;
        },
        set_parentElementID: function (e) {
          (this._parentElementID = e),
            this.get_isInitialized() && this.set_parentElement($get(e));
        },
        get_positioningMode: function () {
          return this._positioningMode;
        },
        set_positioningMode: function (e) {
          this._positioningMode = e;
        },
        get_x: function () {
          return this._x;
        },
        set_x: function (e) {
          e != this._x &&
            ((this._x = e),
            $telerik.getVisible(this.get_elementToShow()) &&
              this._manageVisibility &&
              this.show());
        },
        get_y: function () {
          return this._y;
        },
        set_y: function (e) {
          e != this._y &&
            ((this._y = e),
            $telerik.getVisible(this.get_elementToShow()) &&
              this._manageVisibility &&
              this.show());
        },
        get_overlay: function () {
          return this._overlay;
        },
        set_overlay: function (e) {
          if (
            ((this._overlay = e), this._attachWindowHandlers(!1), this._overlay)
          )
            this._attachWindowHandlers(!0);
          else {
            var t = this.get_elementToShow()._hideWindowedElementsIFrame;
            t && (t.style.display = "none");
          }
        },
        get_manageVisibility: function () {
          return this._manageVisibility;
        },
        set_manageVisibility: function (e) {
          this._manageVisibility = e;
        },
        get_keepInScreenBounds: function () {
          return this._keepInScreenBounds;
        },
        set_keepInScreenBounds: function (e) {
          this._keepInScreenBounds = e;
        },
        get_elementToShow: function () {
          return this._elementToShow ? this._elementToShow : this.get_element();
        },
        set_elementToShow: function (e) {
          this._elementToShow && this._detachElementToShow(),
            (this._elementToShow = e);
        },
        get_showAnimation: function () {
          return this._showAnimation;
        },
        set_showAnimation: function (e) {
          this._showAnimation && this._showAnimation.set_options(e);
        },
        get_hideAnimation: function () {
          return this._hideAnimation;
        },
        set_hideAnimation: function (e) {
          this._hideAnimation && this._hideAnimation.set_options(e);
        },
        _detachElementToShow: function () {
          var e = this.get_elementToShow();
          this._moveHandler &&
            ($telerik.removeExternalHandler(e, "move", this._moveHandler),
            (this._moveHandler = null));
          var t = e._hideWindowedElementsIFrame;
          if (t) {
            var i = t.parentNode,
              n = t.nextSibling;
            i &&
              (i.removeChild(t),
              n
                ? i.insertBefore(document.createElement("span"), n)
                : i.appendChild(document.createElement("span")));
          }
        },
        show: function () {
          var e = this,
            t = this.get_elementToShow(),
            i = $telerik.getVisible(t);
          e.get_positioningMode() !== Telerik.Web.PositioningMode.None &&
            (t.style.position = "absolute");
          var n = document.documentElement;
          $telerik.isFirefox &&
            "hidden" == $telerik.getCurrentStyle(n, "overflow") &&
            ((t.style.left = n.scrollLeft + "px"),
            (t.style.top = n.scrollLeft + "px"));
          var s = this._manageVisibility;
          s && !i && $telerik.setVisible(t, !0);
          var o,
            r,
            l = t.offsetParent || n,
            a = $telerik.getBounds(l);
          if ((s && !i && $telerik.setVisible(t, !1), this._parentElement)) {
            r = $telerik.getBounds(this._parentElement);
            var h = this._getOffsetParentLocation(l);
            o = { x: r.x - h.x, y: r.y - h.y };
          } else (r = a), (o = { x: 0, y: 0 });
          if ((s && $telerik.setVisible(t, !0), e._useAnimation))
            e.get_showAnimation().play();
          else {
            var u,
              c = Math.max(
                t.offsetWidth - (t.clientLeft ? 2 * t.clientLeft : 0),
                0,
              ),
              _ = Math.max(
                t.offsetHeight - (t.clientTop ? 2 * t.clientTop : 0),
                0,
              );
            switch (this._positioningMode) {
              case Telerik.Web.PositioningMode.Center:
                u = {
                  x: Math.round(r.width / 2 - c / 2),
                  y: Math.round(r.height / 2 - _ / 2),
                };
                break;
              case Telerik.Web.PositioningMode.BottomLeft:
                u = { x: 0, y: r.height };
                break;
              case Telerik.Web.PositioningMode.BottomRight:
                u = { x: r.width - c, y: r.height };
                break;
              case Telerik.Web.PositioningMode.TopLeft:
                u = { x: 0, y: -t.offsetHeight };
                break;
              case Telerik.Web.PositioningMode.TopRight:
                u = { x: r.width - c, y: -t.offsetHeight };
                break;
              default:
                u = { x: 0, y: 0 };
            }
            (u.x += this._x + o.x),
              (u.y += this._y + o.y),
              $telerik.setLocation(t, u),
              this._firstPopup && (t.style.width = c + "px"),
              (this._firstPopup = !1);
            var d = this._fixPositionInBounds();
            this._createOverlay(d);
          }
        },
        hide: function () {
          var e = this,
            t = e.get_showAnimation();
          e._useAnimation
            ? t.isInProgress() || e._hideAnimation.play()
            : this._hide();
        },
        _hide: function () {
          var e = this.get_elementToShow();
          if (
            (this._manageVisibility && $telerik.setVisible(e, !1),
            e.originalWidth &&
              ((e.style.width = e.originalWidth + "px"),
              (e.originalWidth = null)),
            Sys.Browser.agent === Sys.Browser.InternetExplorer || this._overlay)
          ) {
            var t = e._hideWindowedElementsIFrame;
            t && (t.style.display = "none");
          }
        },
        _getViewportBounds: function () {
          var e = $telerik.getClientBounds(),
            t = document.documentElement,
            i = document.body;
          return (
            (e.scrollLeft = $telerik.isMobileSafari
              ? window.pageXOffset
              : $telerik.getCorrectScrollLeft(t) ||
                $telerik.getCorrectScrollLeft(i)),
            (e.scrollTop = $telerik.isMobileSafari
              ? window.pageYOffset
              : t.scrollTop || i.scrollTop),
            e
          );
        },
        _getOffsetParentLocation: function (e) {
          if (
            e &&
            "BODY" != e.tagName.toUpperCase() &&
            "HTML" != e.tagName.toUpperCase()
          ) {
            var t = $telerik.getLocation(e),
              i = $telerik.getBorderBox(e);
            return (
              (t.x += i.top),
              (t.y += i.left),
              (t.x -= $telerik.getCorrectScrollLeft(e)),
              (t.y -= e.scrollTop),
              t
            );
          }
          return { x: 0, y: 0 };
        },
        _fixPositionInBounds: function () {
          var e = this.get_elementToShow(),
            t = $telerik.getBounds(e);
          if (!this._keepInScreenBounds) return t;
          var i = this._getViewportBounds(),
            n = !1,
            s = i.width > t.width,
            o = i.height > t.height,
            r = i.scrollTop,
            l = i.height + r,
            a = i.scrollLeft,
            h = i.width + a;
          if (
            ($telerik.isIE8 || $telerik.isOpera || $telerik.isSafari) &&
            $telerik.isRightToLeft(document.body)
          ) {
            var u = e.style.display;
            $telerik.isOpera && (e.style.display = "none");
            var c = document.documentElement.scrollWidth;
            (h = c || document.body.scrollWidth),
              $telerik.isOpera && (e.style.display = u);
          }
          if (
            ((t.x < a || !s) && ((t.x = a), (n = !0)),
            (t.y < r || !o) && ((t.y = r), (n = !0)),
            s && t.x + t.width > h && ((t.x = h - t.width), (n = !0)),
            o && l < t.y + t.height && ((t.y = l - t.height), (n = !0)),
            n)
          ) {
            var _ = this._getOffsetParentLocation(e.offsetParent);
            (t.y -= _.y), (t.x -= _.x), $telerik.setLocation(e, t);
          }
          return t;
        },
        _createOverlay: function (e) {
          if (this._overlay) {
            var t = this.get_elementToShow(),
              i = t._hideWindowedElementsIFrame;
            if (
              (i ||
                (((i = document.createElement("iframe")).src =
                  "data:text/html,<html></html>"),
                (i.style.position = "absolute"),
                (i.style.display = "none"),
                (i.scrolling = "no"),
                (i.frameBorder = "0"),
                (i.tabIndex = "-1"),
                (i.style.filter =
                  "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"),
                t.parentNode.insertBefore(i, t),
                (t._hideWindowedElementsIFrame = i),
                (this._moveHandler = Function.createDelegate(
                  this,
                  this._onMove,
                )),
                $telerik.addExternalHandler(t, "move", this._moveHandler)),
              $telerik.previousElement(i) === t &&
                t.parentNode.insertBefore(i, t),
              $telerik.setBounds(i, e),
              $telerik.isFirefox)
            ) {
              var n = this._getViewportBounds();
              (i.style.top = parseInt(e.y, 10) - n.scrollTop + "px"),
                (i.style.left = parseInt(e.x, 10) - n.scrollLeft + "px"),
                (i.style.position = "fixed"),
                $telerik.isFirefox3 && (i.style.backgroundColor = "#fff");
            }
            if (!$telerik.quirksMode) {
              i.style.display = t.style.display;
              var s = $telerik.getCurrentStyle(t, "zIndex");
              s && (i.style.zIndex = s);
            }
          }
        },
        _setCoordinates: function (e, t) {
          var i = !1;
          e != this._x && ((this._x = e), (i = !0)),
            t != this._y && ((this._y = t), (i = !0)),
            $telerik.getVisible(this.get_elementToShow()) &&
              i &&
              this._manageVisibility &&
              this.show();
        },
        dispose: function () {
          var e = this.get_elementToShow();
          e &&
            (this._attachWindowHandlers(!1),
            $telerik.getVisible(e) && this._manageVisibility && this.hide(),
            this._originalParent &&
              (e.parentNode.removeChild(e),
              this._originalParent.appendChild(e),
              (this._originalParent = null)),
            this._detachElementToShow()),
            (this._parentElement = null),
            Telerik.Web.PopupBehavior.callBaseMethod(this, "dispose"),
            e &&
              e._behaviors &&
              0 == e._behaviors.length &&
              (e._behaviors = null),
            (e = null);
        },
        _onMove: function () {
          var e = this.get_elementToShow(),
            t = e._hideWindowedElementsIFrame;
          if (t)
            if (Sys.Browser.agent === Sys.Browser.Firefox) {
              var i = this._getViewportBounds();
              (t.style.top = parseInt(e.style.top, 10) - i.scrollTop + "px"),
                (t.style.left =
                  parseInt(e.style.left, 10) - i.scrollLeft + "px"),
                (t.style.position = "fixed");
            } else (t.style.top = e.style.top), (t.style.left = e.style.left);
        },
        _handleElementResize: function () {
          var e = this.get_elementToShow(),
            t = e._hideWindowedElementsIFrame;
          if (t) {
            var i = $telerik.getBounds(e);
            $telerik.setBounds(t, i);
          }
        },
        _attachWindowHandlers: function (e) {
          if (Sys.Browser.agent === Sys.Browser.Firefox) {
            var t = window;
            1 == e
              ? ((this._windowResizeDelegate = Function.createDelegate(
                  this,
                  this._onMove,
                )),
                $telerik.addExternalHandler(
                  t,
                  "resize",
                  this._windowResizeDelegate,
                ),
                (this._windowScrollDelegate = Function.createDelegate(
                  this,
                  this._onMove,
                )),
                $telerik.addExternalHandler(
                  t,
                  "scroll",
                  this._windowScrollDelegate,
                ))
              : (this._windowResizeDelegate &&
                  $telerik.removeExternalHandler(
                    t,
                    "resize",
                    this._windowResizeDelegate,
                  ),
                (this._windowResizeDelegate = null),
                this._windowScrollDelegate &&
                  $telerik.removeExternalHandler(
                    t,
                    "scroll",
                    this._windowScrollDelegate,
                  ),
                (this._windowScrollDelegate = null));
          }
        },
      }),
      Telerik.Web.PopupBehavior.registerClass(
        "Telerik.Web.PopupBehavior",
        Sys.UI.Behavior,
      );
  })(),
  Type.registerNamespace("Telerik.Web"),
  Type.registerNamespace("Telerik.Web.UI"),
  (function () {
    var e,
      t = Telerik.Web.UI,
      i = "pageX",
      n = "pageY",
      s = "clientX",
      o = "clientY",
      r = Math.floor,
      l = !!window.PointerEvent,
      a = !!window.MSPointerEvent,
      h = ".telerikResizeExtender",
      u = "dragstart",
      c =
        (((e = {}).hasTouch = "ontouchstart" in window),
        (e.hasPointer = l || a),
        (e.hasPointerTouch = !!navigator.msMaxTouchPoints),
        (e.isTouch = e.hasTouch || e.hasPointerTouch),
        (e._pointers = []),
        e);
    (t.ResizeExtender = function (e, i, n, s, o, r, l, a) {
      (this._document = o || document),
        (this._documentMouseMoveDelegate = null),
        (this._documentMouseUpDelegate = null),
        (this._jsOwner = null),
        (this._element = null),
        (this._tableElement = null),
        (this._saveDelegates = {}),
        (this._moveCursorType = "move"),
        (this._moveToMouseLocation = !1),
        (this._hideIframes = !0),
        (this._iframeToSkip = null),
        (this._enabled = !0),
        (this._startX = 0),
        (this._startY = 0),
        (this._cancelResize = !0),
        (this._startCursorLocation = null),
        (this._autoScrollEnabled = !0),
        (this._ieTouchActionManager = new t.Helpers.IETouchActionManager(i)),
        (this._touchEventIdentifier = null),
        (this._utils = c),
        this.initialize(e, i, n, s, r, l, a);
    }),
      (t.ResizeExtender.containsBounds = function (e, t) {
        if (!e || !t) return !1;
        var i = $telerik.containsPoint(e, t.x, t.y);
        if (i) {
          var n = t.x + t.width,
            s = t.y + t.height;
          i = $telerik.containsPoint(e, n, s);
        }
        return i;
      }),
      (t.ResizeExtender.prototype = {
        initialize: function (e, t, i, n, s, o, r) {
          t &&
            (this._element
              ? alert(
                  "Element " +
                    t.getAttribute("id") +
                    " cannot be made resizable, as the resizeExtender already has the element " +
                    this._element.getAttribute("id") +
                    " associated with it. You must create a new extender resizer object",
                )
              : ((this._jsOwner = e),
                (this._element = t),
                (this._tableElement = n),
                (this._handles = i),
                this._ieTouchActionManager.allowUserTouch(),
                s && (this._moveCursorType = s),
                null != o && (this._autoScrollEnabled = o),
                null != r && (this._moveToMouseLocation = r),
                this._configureHandleElements(!0)));
        },
        dispose: function () {
          this._ieTouchActionManager.dispose(),
            this._attachDocumentHandlers(!1),
            this._configureHandleElements(!1),
            (this._startCursorLocation = null),
            (this._iframeToSkip = null),
            (this._jsOwner = null),
            (this._element = null),
            (this._handles = null),
            (this._saveDelegates = null),
            (this._constraints = null);
        },
        enable: function (e) {
          this._enabled = e;
        },
        set_hideIframes: function (e) {
          this._hideIframes = e;
        },
        get_hideIframes: function () {
          return this._hideIframes;
        },
        set_iframeToSkip: function (e) {
          this._iframeToSkip = e;
        },
        get_iframeToSkip: function () {
          return this._iframeToSkip;
        },
        get_constraints: function () {
          return this._constraints;
        },
        set_constraints: function (e) {
          this._constraints = e;
        },
        get_useCssTransform: function () {
          return this._useCssTransform;
        },
        set_useCssTransform: function (e) {
          this._useCssTransform = e;
        },
        _raiseDragEvent: function (e, t, i) {
          var n = this,
            s = n._jsOwner;
          if (s && s["on" + e]) {
            var o = t;
            return (
              o || (o = {}),
              (o.element = n._element),
              (o.ownerEvent = i),
              (o.eventIdetifier = n._getTouchEventIdentifier(i)),
              s["on" + e](o)
            );
          }
          return !0;
        },
        _raiseEvent: function (e, t) {
          var i = this._jsOwner;
          return (
            !i ||
            !i["on" + e] ||
            (t
              ? "Resize" == e
                ? (t = this._resizeDir)
                : "Resizing" == e && (t = this._getProposedBounds(t))
              : (t = new Sys.EventArgs()),
            i["on" + e](t))
          );
        },
        _getProposedBounds: function (e) {
          var t = $telerik.getBounds(this._element);
          return {
            x: e.x || t.x,
            y: e.y || t.y,
            width: e.width || t.width,
            height: e.height || t.height,
          };
        },
        getPositionedParent: function () {
          for (var e = this._element.parentNode; e && e != document; ) {
            if ("static" != $telerik.getCurrentStyle(e, "position", "static"))
              return e;
            e = e.parentNode;
          }
          return null;
        },
        _storeStartCoords: function (e) {
          var i = this,
            n = i._utils;
          if (i._enabled) {
            i._cancelResize = !1;
            var l = i._getTouchEventLocation(e, i._touchEventIdentifier);
            n.isTouch && l && l.x && l.y
              ? ((i._startX = l.x), (i._startY = l.y))
              : e.originalEvent
                ? ((i._startX = r(e.originalEvent[s])),
                  (i._startY = r(e.originalEvent[o])))
                : ((i._startX = r(e.clientX)), (i._startY = r(e.clientY)));
            var a = i._element,
              h = $telerik.getBounds(a),
              u =
                null != a.id &&
                t.RadDock &&
                t.RadDock.isInstanceOfType($find(a.id));
            if ($telerik.isIE && 1 != u) {
              var c = i.getPositionedParent();
              c && ((h.x += c.scrollLeft), (h.y += c.scrollTop));
            }
            i._originalBounds = h;
            var _ = e.target ? e.target : e.srcElement;
            _ && 3 == _.type && (_ = _.parentNode),
              (i._resizeType = $telerik.getCurrentStyle(_, "cursor")),
              !i._resizeType &&
                e.currentTarget &&
                (i._resizeType = $telerik.getCurrentStyle(
                  e.currentTarget,
                  "cursor",
                )),
              (i._resizeDir = {
                north: i._resizeType.match(/n.?-/) ? 1 : 0,
                east: i._resizeType.match(/e-/) ? 1 : 0,
                south: i._resizeType.match(/s.?-/) ? 1 : 0,
                west: i._resizeType.match(/w-/) ? 1 : 0,
                move: new RegExp(i._moveCursorType).test(this._resizeType)
                  ? 1
                  : 0,
              }),
              (i._leftHandleMouseDelta = 0),
              i._resizeDir.west &&
                (i._leftHandleMouseDelta = Math.abs(h.x - this._startX));
            var d = i._resizeDir.move
              ? i._raiseDragEvent("DragStart", null, e)
              : i._raiseEvent("ResizeStart");
            i._cancelResize = 0 == d;
            var g = $telerik.getCurrentStyle(a.parentNode, "position"),
              f = "relative" == g || "absolute" == g;
            if (
              ((i._offsetLocation = f
                ? $telerik.getLocation(a.parentNode)
                : { x: 0, y: 0 }),
              i._moveToMouseLocation)
            ) {
              var p = $telerik.isTouchDevice
                ? { left: i._startX, top: i._startY }
                : $telerik.getDocumentRelativeCursorPosition({
                    clientX: this._startX,
                    clientY: this._startY,
                  });
              if (f) {
                var m = $telerik.getBorderBox(a.parentNode);
                (p.left -= m.left), (p.top -= m.top);
              }
              i._startCursorLocation = {
                x: p.left - Math.floor(h.width / 2),
                y: p.top - Math.floor(h.height / 2),
              };
            }
            i._cancelResize ||
              (i._clearSelection(),
              i._setIframesVisible(!1),
              i._attachDocumentHandlers(!1),
              i._attachDocumentHandlers(!0));
          }
        },
        _getTouchEventLocation: function (e, t) {
          var s = e.originalEvent ? e.originalEvent : null,
            o =
              e.changedTouches ||
              (s
                ? s.changedTouches
                : !!e.rawEvent && e.rawEvent.changedTouches),
            l = null;
          c._pointers = this._getUniquePointerIds();
          var a,
            h,
            u = c._pointers;
          if (c.isTouch)
            if (s)
              if (c.hasPointer) {
                for (a = !1, h = 0; h < u.length; h++)
                  if (u[h].pointerId === t) {
                    (l = { x: u[h][i], y: u[h][n] }), (a = !0);
                    break;
                  }
                a || (l = { x: r(s[i]), y: r(s[n]) });
              } else if (o && o[0]) {
                for (a = !1, h = 0; h < o.length; h++)
                  if (o[h].identifier === t) {
                    (l = { x: o[h][i], y: o[h][n] }), (a = !0);
                    break;
                  }
                a || (l = { x: o[0][i], y: o[0][n] });
              } else l = { x: r(e.clientX), y: r(e.clientY) };
            else l = { x: r(e.clientX), y: r(e.clientY) };
          return l;
        },
        _getEventClientCoordinates: function (e) {
          return e.originalEvent
            ? { x: e.originalEvent[s], y: e.originalEvent[o] }
            : { x: e[s], y: e[o] };
        },
        _getIntegerCoordinates: function (e) {
          return e && e.hasOwnProperty("x") && e.hasOwnProperty("y")
            ? { x: r(e.x), y: r(e.y) }
            : null;
        },
        _getIntegerEventCoordinates: function (e) {
          var t = this._getEventClientCoordinates(e);
          return this._getIntegerCoordinates(t);
        },
        _getTouchEventIdentifier: function (e) {
          var t = this._utils,
            i = e.originalEvent ? e.originalEvent : null;
          if (t.isTouch) {
            if (!i) return null;
            if (i.targetTouches && i.targetTouches[0])
              return i.targetTouches[0].identifier;
            if (i.pointerId) return i.pointerId;
          }
          return null;
        },
        _resize: function (e) {
          var t = this,
            i = t._utils;
          if (!t._enabled || t._cancelResize) return !1;
          var n = t._originalBounds,
            s = new Telerik.Web.UI.Bounds(0, 0, 0, 0),
            o = null;
          if (
            null ===
            (o = i.isTouch
              ? t._getTouchEventLocation(e, t._touchEventIdentifier)
              : t._getIntegerEventCoordinates(e))
          )
            return !1;
          var r = o.x - t._startX,
            l = o.y - t._startY,
            a = t._resizeDir,
            h = a.move;
          if (h) {
            var u = t._startCursorLocation;
            u &&
              ((n.x = u.x),
              (n.y = u.y),
              (t._originalBounds = n),
              (t._startCursorLocation = null)),
              (s.x = n.x + r),
              (s.y = n.y + l);
            var c = t._getMoveConstraints(n);
            c &&
              ((s.x = t._constrainPosition(s.x, c.x, c.width)),
              (s.y = t._constrainPosition(s.y, c.y, c.height)));
          } else {
            a.east
              ? ((s.x = n.x), (s.width = n.width + r))
              : a.west &&
                ((s.x = o.x - t._leftHandleMouseDelta),
                (s.width = n.width - r)),
              a.south
                ? ((s.y = n.y), (s.height = n.height + l))
                : a.north && ((s.y = n.y + l), (s.height = n.height - l));
            var _ = t._getSizeConstraints(n);
            _ &&
              ((s.x = t._constrainPosition(
                s.x,
                _.x,
                Math.min(s.x + s.width, _.width - s.width),
              )),
              (s.y = t._constrainPosition(
                s.y,
                _.y,
                Math.min(s.y + s.height, _.height - s.height),
              )),
              (s.width = t._constrainDimension(s.width, _.width - s.x)),
              (s.height = t._constrainDimension(s.height, _.height - s.y)));
          }
          var d = t._offsetLocation;
          if (
            (d && ((s.x -= d.x), (s.y -= d.y)),
            0 ==
              (h
                ? t._raiseDragEvent("Drag", s, e)
                : t._raiseEvent("Resizing", s)))
          )
            return !0;
          var g = t._element;
          if (t._useCssTransform && h) {
            t._lastTouchDelta = { x: s.x - n.x + d.x, y: s.y - n.y + d.y };
            var f = {
              x: s.x ? t._lastTouchDelta.x : 0,
              y: s.y ? t._lastTouchDelta.y : 0,
            };
            t._setTranslate(g, f.x, f.y);
          } else
            (h || s.x > 0) && (g.style.left = s.x + "px"),
              (h || s.y > 0) && (g.style.top = s.y + "px");
          return (
            s.width > 0 && (g.style.width = s.width + "px"),
            s.height > 0 && (g.style.height = s.height + "px"),
            h || t._updateInnerTableSize(),
            !0
          );
        },
        _setTranslate: function (e, t, i) {
          var n = e.style;
          n.webkitTransform =
            n.mozTransform =
            n.OTransform =
              "translate(" + t + "px," + i + "px)";
        },
        _updateInnerTableSize: function () {
          var e = this._resizeDir;
          if (e.south || e.north) {
            var t = this._element.style.height,
              i = this._tableElement;
            i && ((i.style.height = t), this._fixIeHeight(i, t));
          }
        },
        _getMoveConstraints: function (e) {
          var t = this._getSizeConstraints();
          return t && ((t.width -= e.width), (t.height -= e.height)), t;
        },
        _getSizeConstraints: function (e) {
          var t = this._constraints;
          if (!t) return null;
          var i = t.x + this._offsetLocation.x,
            n = t.y + this._offsetLocation.y;
          return new Telerik.Web.UI.Bounds(i, n, i + t.width, n + t.height);
        },
        _constrainPosition: function (e, t, i) {
          return Math.max(t, Math.min(i, e));
        },
        _constrainDimension: function (e, t) {
          return this._constrainPosition(e, 0, t);
        },
        _fixIeHeight: function (e, t) {
          if ("CSS1Compat" == document.compatMode) {
            var i = e.offsetHeight - parseInt(t, 10);
            if (i > 0) {
              var n = parseInt(e.style.height, 10) - i;
              n > 0 && (e.style.height = n + "px");
            }
          }
        },
        _setIframesVisible: function (e) {
          if (this.get_hideIframes())
            for (
              var t = this._document.getElementsByTagName("iframe"),
                i = this.get_iframeToSkip(),
                n = 0,
                s = t.length;
              n < s;
              n++
            ) {
              var o = t[n];
              if (!i || (i !== o && i != o)) {
                if (((o.style.visibility = e ? "" : "hidden"), $telerik.isIE))
                  try {
                    o.contentWindow.document.body.style.visibility = e
                      ? ""
                      : "hidden";
                  } catch (e) {}
              } else i = null;
            }
        },
        _configureHandleElements: function (e) {
          for (
            var t = this._handles,
              i = [
                "nw",
                "n",
                "ne",
                "w",
                "e",
                "sw",
                "s",
                "se",
                this._moveCursorType,
              ],
              n = 0,
              s = i.length;
            n < s;
            n++
          ) {
            var o = i[n],
              r = t[o];
            if (r)
              if ("[object Array]" === Object.prototype.toString.call(r))
                for (var l = 0; l < r.length; l++)
                  this._configureHandle("id" + n + "_" + l, e, r[l], o);
              else this._configureHandle("id" + n, e, r, o);
          }
        },
        _configureHandle: function (e, i, n, s) {
          var o = this,
            r = $telerik.$(n),
            l = this._saveDelegates,
            a = l[e] ? l[e].delegate : null;
          if (i) {
            if (!a) {
              var c = $telerik.$.proxy(o._onHandleMouseDown, o);
              r.onEvent(t.EventType.Down + h, c),
                r.on(u + h, function (e) {
                  e.preventDefault();
                }),
                (n.style.cursor =
                  s == this._moveCursorType ? s : s + "-resize"),
                (l[e] = { element: n, delegate: c });
            }
          } else
            a &&
              (r.offEvent(t.EventType.Down + h, o.delegate),
              r.off(u + h),
              (n.style.cursor = ""),
              delete l[e]);
        },
        _attachDocumentHandlers: function (e) {
          var i = this,
            n = $telerik.$(i._document);
          if (e)
            (i._documentMouseMoveDelegate = $telerik.$.proxy(
              i._onDocumentMouseMove,
              i,
            )),
              n.onEvent(t.EventType.Move + h, i._documentMouseMoveDelegate),
              (i._documentMouseUpDelegate = $telerik.$.proxy(
                i._onDocumentMouseUp,
                i,
              )),
              n.onEvent(t.EventType.Up + h, i._documentMouseUpDelegate);
          else {
            var s = i._documentMouseMoveDelegate;
            s && n.offEvent(t.EventType.Move + h, s);
            var o = i._documentMouseUpDelegate;
            o && n.offEvent(t.EventType.Up + h, o),
              (i._documentMouseMoveDelegate = null),
              (i._documentMouseUpDelegate = null);
          }
        },
        _canExecuteTouchEvent: function (e) {
          var t = this,
            i = t._utils,
            n = e.originalEvent ? e.originalEvent : null,
            s = null;
          if (i.isTouch) {
            if (n) {
              if (
                (i.hasPointer
                  ? n.pointerId && (s = n.pointerId)
                  : n.targetTouches &&
                    n.targetTouches[0] &&
                    (s = n.targetTouches[0].identifier),
                null !== t._touchEventIdentifier)
              ) {
                if (t._touchEventIdentifier !== s) return !1;
              } else t._touchEventIdentifier = s;
              return !0;
            }
            return !0;
          }
          return !0;
        },
        _cleanUpPointerTracking: function (e) {
          if (c.hasPointer) {
            c._pointers = this._getUniquePointerIds();
            var t = c._pointers,
              i = e.originalEvent
                ? this._indexOfPointer(e.originalEvent.pointerId)
                : null;
            null !== i && -1 !== i && t.splice(i, 1);
          }
        },
        _getUniquePointerIds: function () {
          var e = c._pointers,
            t = null,
            i = [];
          return $telerik.$.grep(e, function (e, n) {
            return (
              !!e.pointerId &&
              ((t = e.pointerId),
              -1 === $telerik.$.inArray(t, i) && (i.push(t), !0))
            );
          });
        },
        _indexOfPointer: function (e) {
          for (var t = c._pointers, i = t.length, n = 0; n < i; n++)
            if (e === t[n].pointerId) return n;
          return -1;
        },
        _updatePointer: function (e) {
          if (c.hasPointer) {
            var t = e.originalEvent
              ? this._indexOfPointer(e.originalEvent.pointerId)
              : null;
            null !== t &&
              -1 !== t &&
              e.originalEvent.pointerId === this._touchEventIdentifier &&
              ((c._pointers[t].pageX = r(e.originalEvent.pageX)),
              (c._pointers[t].pageY = r(e.originalEvent.pageY)));
          }
        },
        _onHandleMouseDown: function (e) {
          var t = this,
            s = t._utils,
            o = null,
            l = e.originalEvent,
            a = !0;
          if (
            (s.isTouch &&
              (l
                ? (null !== (o = t._getTouchEventIdentifier(e)) &&
                    c._pointers.push({
                      pageX: r(l[i]),
                      pageY: r(l[n]),
                      pointerId: o,
                    }),
                  (a = t._canExecuteTouchEvent(e)))
                : t._resetTouchIdentifier()),
            a && (t._updatePointer(e), t._storeStartCoords(e)),
            !s.isTouch)
          )
            return $telerik.cancelRawEvent(e);
          s.isTouch && s.hasPointer && t._onDocumentMouseMove(e);
        },
        _onDocumentMouseMove: function (e) {
          var t,
            i = this,
            n = !0;
          if (
            (i._utils.isTouch &&
              ((n = i._canExecuteTouchEvent(e)), i._updatePointer(e)),
            n && (t = i._resize(e)),
            i._autoScrollEnabled && i._autoScroll(e),
            t)
          )
            return $telerik.cancelRawEvent(e);
        },
        _onDocumentMouseUp: function (e) {
          var t = this,
            i = !t._cancelResize;
          (t._cancelResize = !0), (t._startCursorLocation = null);
          var n = t._resizeDir && t._resizeDir.move;
          (t._useCssTransform && n && t._moveBoxBy(t._lastTouchDelta),
          i &&
            (t._clearSelection(),
            t._setIframesVisible(!0),
            n
              ? t._raiseDragEvent("DragEnd", null, e)
              : t._raiseEvent("ResizeEnd"),
            t._attachDocumentHandlers(!1),
            t._scroller && t._scroller.set_enabled(!1)),
          (t._touchEventIdentifier = null),
          c.isTouch) &&
            null !== t._getTouchEventIdentifier(e) &&
            t._cleanUpPointerTracking(e);
        },
        _getTouchIdentifier: function () {
          return this._touchEventIdentifier;
        },
        _resetTouchIdentifier: function () {
          this._touchEventIdentifier = null;
        },
        _moveBoxBy: function (e, t) {
          var i = this._originalBounds,
            n = this._offsetLocation;
          (t = t || this._element),
            this._resetBoxTransform(t),
            (t.style.left = i.x + e.x - n.x + "px"),
            (t.style.top = i.y + e.y - n.y + "px");
        },
        _resetBoxTransform: function (e) {
          var t = e.style;
          t.webkitTransform =
            t.mozTransform =
            t.OTransform =
            t.msTranslate =
              "translate(0,0)";
        },
        _clearSelection: function () {
          if (this._document.selection && this._document.selection.empty)
            try {
              this._document.selection.empty();
            } catch (e) {}
        },
        _initializeAutoScroll: function () {
          this._autoScrollInitialized ||
            ((this._scrollEdgeConst = 40),
            (this._scrollByConst = 10),
            (this._scroller = null),
            (this._scrollDeltaX = 0),
            (this._scrollDeltaY = 0),
            (this._scrollerTickHandler = Function.createDelegate(
              this,
              this._onScrollerTick,
            )),
            (this._scroller = new Telerik.Web.Timer()),
            this._scroller.set_interval(10),
            this._scroller.add_tick(this._scrollerTickHandler),
            (this._autoScrollInitialized = !0));
        },
        _autoScroll: function (e) {
          this._initializeAutoScroll();
          var t = $telerik.getClientBounds();
          if (t.width > 0) {
            (this._scrollDeltaX = this._scrollDeltaY = 0),
              e.clientX < t.x + this._scrollEdgeConst
                ? (this._scrollDeltaX = -this._scrollByConst)
                : e.clientX > t.width - this._scrollEdgeConst &&
                  (this._scrollDeltaX = this._scrollByConst),
              e.clientY < t.y + this._scrollEdgeConst
                ? (this._scrollDeltaY = -this._scrollByConst)
                : e.clientY > t.height - this._scrollEdgeConst &&
                  (this._scrollDeltaY = this._scrollByConst);
            var i = this._scroller;
            0 != this._scrollDeltaX || 0 != this._scrollDeltaY
              ? ((this._originalStartX = this._startX),
                (this._originalStartY = this._startY),
                i.set_enabled(!0))
              : (i.get_enabled() &&
                  ((this._startX = this._originalStartX),
                  (this._startY = this._originalStartY)),
                i.set_enabled(!1));
          }
        },
        _onScrollerTick: function () {
          var e =
              document.documentElement.scrollLeft || document.body.scrollLeft,
            t = document.documentElement.scrollTop || document.body.scrollTop;
          window.scrollBy(this._scrollDeltaX, this._scrollDeltaY);
          var i =
              (document.documentElement.scrollLeft ||
                document.body.scrollLeft) - e,
            n =
              (document.documentElement.scrollTop || document.body.scrollTop) -
              t,
            s = this._element,
            o = {
              x: parseInt(s.style.left, 10) + i,
              y: parseInt(s.style.top, 10) + n,
            };
          (this._startX -= i), (this._startY -= n);
          try {
            $telerik.setLocation(s, o);
          } catch (e) {}
        },
      }),
      t.ResizeExtender.registerClass(
        "Telerik.Web.UI.ResizeExtender",
        null,
        Sys.IDisposable,
      );
  })(),
  (function (e) {
    Type.registerNamespace("Telerik.Web.UI");
    var t = Telerik.Web.UI;
    (t.TabKeyTrap = function (e) {
      (this.element = e),
        (this.trapDelegate = Function.createDelegate(this, this._keepInTrap));
    }),
      (t.TabKeyTrap.prototype = {
        trap: function () {
          $telerik.onEvent(this.element, "keydown", this.trapDelegate);
        },
        removeTrap: function () {
          $telerik.offEvent(this.element, "keydown", this.trapDelegate);
        },
        dispose: function () {
          this.element = undefined;
        },
        _keepInTrap: function (t) {
          if (9 === t.which) {
            var i = e(this.element),
              n = t.target,
              s = i
                .find(
                  "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], *[contenteditable]",
                )
                .filter(":visible[tabindex!=-1]"),
              o = s.length - 1,
              r = s.index(n);
            t.shiftKey
              ? 0 === r && (s.get(o).focus(), t.preventDefault())
              : r === o && (s.get(0).focus(), t.preventDefault());
          }
        },
      }),
      t.TabKeyTrap.registerClass("Telerik.Web.UI.TabKeyTrap");
  })($telerik.$);
