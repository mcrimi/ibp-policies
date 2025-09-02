function GetRadWindowManager() {
  return Telerik.Web.UI.WindowManager.Manager;
}
Type.registerNamespace("Telerik.Web.UI"),
  Type.registerNamespace("Telerik.Web.UI.WindowManager"),
  ($telerik.toWindowManager = function (e) {
    return e;
  }),
  ($telerik.findWindowManager = $find),
  (window.radalert = function (e, i, t, n, o, a) {
    return GetRadWindowManager().radalert(e, i, t, n, o, a);
  }),
  (window.radconfirm = function (e, i, t, n, o, a, r) {
    return GetRadWindowManager().radconfirm(e, i, t, n, o, a, r);
  }),
  (window.radprompt = function (e, i, t, n, o, a, r) {
    return GetRadWindowManager().radprompt(e, i, t, n, o, a, r);
  }),
  (window.radopen = function (e, i, t, n, o, a) {
    return GetRadWindowManager().open(e, i, null, t, n, o, a);
  }),
  (window.radopenWithContainer = function (e, i) {
    var t = GetRadWindowManager(),
      n = $get(e);
    if (n) return t.open(null, i, n);
    t.radalert(
      "Content element with such ClientID not found!<br/> Make sure you have provided a correct ClientID!",
    );
  }),
  (function (e) {
    var i = Telerik.Web.UI.WindowManager,
      t = ".telerikDialogKeyboardNavigation";
    (i.DialogKeyboardNavigation = function (e) {
      (this._dialog = e), (this._shortCuts = []);
    }),
      (i.DialogKeyboardNavigation.prototype = {
        addShortCut: function (i) {
          var n = e.extend(
              {
                key: "",
                element: null,
                eventName: "",
                action: null,
                preventDefault: !0,
                stopPropagation: !0,
              },
              i || {},
            ),
            o = n.action;
          this._shortCuts.push(n),
            e(n.element).on(n.eventName + t, function (i) {
              i.keyCode === n.key &&
                (n.preventDefault && i.preventDefault(),
                n.stopPropagation && i.stopPropagation(),
                e.isFunction(o) && o());
            });
        },
        dispose: function () {
          for (var i = this._shortCuts, n = i ? i.length : 0, o = 0; o < n; o++)
            e(i[o].element).off(t);
        },
      }),
      i.DialogKeyboardNavigation.registerClass(
        "Telerik.Web.UI.WindowManager.DialogKeyboardNavigation",
        null,
      );
  })($telerik.$),
  (function ($, undefined) {
    var $W = Telerik.Web.UI.WindowManager,
      DialogKeyboardNavigation = $W.DialogKeyboardNavigation,
      KEY_UP = "keyup",
      POPUP_BUTTON_SELECTOR = ".rwPopupButton,.rwOkBtn,.rwCancelBtn",
      DIALOG_INPUT_SELECTOR = ".rwDialogInput,.rwPromptInput",
      Keys = { ENTER: 13, ESCAPE: 27, SPACEBAR: 32 };
    (Telerik.Web.UI.RadWindowManager = function (e) {
      Telerik.Web.UI.RadWindowManager.initializeBase(this, [e]),
        (this._windowIDs = []),
        (this._windows = []),
        (this._preserveClientState = !1),
        (this.Open = this.open),
        (this.GetWindowByName = this.getWindowByName),
        (this.GetWindowById = this.getWindowById),
        (this.GetActiveWindow = this.getActiveWindow),
        (this.GetWindowObjects = this.get_windows),
        (this.GetWindows = this.get_windows),
        (this.Cascade = this.cascade),
        (this.Tile = this.tile),
        (this.RestoreAll = this.restoreAll),
        (this.MaximizeAll = this.maximizeAll),
        (this.MinimizeAll = this.minimizeAll),
        (this.ShowAll = this.showAll),
        (this.CloseAll = this.closeAll),
        (this.CloseActiveWindow = this.closeActiveWindow),
        (this.MinimizeActiveWindow = this.minimizeActiveWindow),
        (this.RestoreActiveWindow = this.restoreActiveWindow);
    }),
      (Telerik.Web.UI.RadWindowManager.prototype = {
        get_zIndex: function () {
          return Telerik.Web.UI.RadWindowUtils._zIndex;
        },
        set_zIndex: function (e) {
          isNaN(e) || (Telerik.Web.UI.RadWindowUtils._zIndex = e);
        },
        initialize: function (e) {
          try {
            var i = this.get_element().style.zIndex;
            i && this.set_zIndex(i);
          } catch (e) {}
          this._initialize(),
            this._registerAsPageManager(),
            this.get_preserveClientState() && this.restoreState();
        },
        dispose: function () {
          this.get_preserveClientState() && this.saveState(),
            this._disposeWindows(),
            (this._windows = null),
            Telerik.Web.UI.RadWindowManager.callBaseMethod(this, "dispose");
        },
        open: function (e, i, t, n, o, a, r) {
          var s,
            l = this.getWindowByName(i);
          if (l) t && this.get_navigateUrl() && (l._dockMode = !1);
          else {
            i || (i = this.get_id() + this._getUniqueId()),
              (l = this._createWindow(i, t));
            var d = this.get_element().className;
            d && l.set_cssClass(d.replace(/^ /, ""));
          }
          e && !l.get_reloadOnShow() && l._iframe && l._iframe.src != e
            ? l.setUrl(e)
            : e && (l._navigateUrl = e),
            (n || o) && l.setSize(n, o);
          var c = l.get_popupElement(),
            u = parseInt(a, 10);
          isNaN(u) ||
            (l.set_left(u), c && ((s = l.getWindowBounds()), l.moveTo(u, s.y)));
          var g = parseInt(r, 10);
          return (
            isNaN(g) ||
              (l.set_top(g),
              c && ((s = l.getWindowBounds()), l.moveTo(s.x, g))),
            l.show(),
            l
          );
        },
        radalert: function (e, i, t, n, o, a) {
          var r = this._getStandardPopup("alert", e, null, a);
          return (
            this._initializeRadAlertKeyboardNavigation(r),
            void 0 !== n && r.set_title(n),
            r.setSize(i || 280, t || 200),
            r.set_clientCallBackFunction(function (e, i) {
              o && o(i);
            }),
            r.center(),
            r.show(),
            r
          );
        },
        _initializeKeyboardNavigation: function (e, i) {
          if (e) {
            var t = $(e.get_popupElement()).find(POPUP_BUTTON_SELECTOR)[0];
            (e._keyboardNavigation = new DialogKeyboardNavigation(e)),
              e._keyboardNavigation.addShortCut({
                eventName: KEY_UP,
                element: t,
                key: Keys.SPACEBAR,
                action:
                  i ||
                  function () {
                    e.close(!0);
                  },
              }),
              e.addShortcut("Close", "Esc");
          }
        },
        _initializeRadAlertKeyboardNavigation: function (e) {
          this._initializeKeyboardNavigation(e);
        },
        radconfirm: function (e, i, t, n, o, a, r) {
          var s = this._getStandardPopup("confirm", e, null, r);
          return (
            this._initializeRadConfirmKeyboardNavigation(s),
            void 0 !== a && s.set_title(a),
            s.setSize(t || 280, n || 200),
            s.set_clientCallBackFunction(function (e, t) {
              i && i(t);
            }),
            s.center(),
            s.show(),
            s
          );
        },
        _initializeRadConfirmKeyboardNavigation: function (e) {
          var i = e;
          if (i) {
            var t = $(i.get_popupElement()).find(POPUP_BUTTON_SELECTOR)[1];
            this._initializeKeyboardNavigation(i),
              i._keyboardNavigation.addShortCut({
                eventName: KEY_UP,
                element: t,
                key: Keys.SPACEBAR,
                action: function () {
                  i.close(!1);
                },
              });
          }
        },
        radprompt: function (e, i, t, n, o, a, r) {
          var s = this._getStandardPopup("prompt", e, r);
          if (
            (this._initializeRadPromptKeyboardNavigation(s),
            void 0 !== a && s.set_title(a),
            s.setSize(t || 280, n || 200),
            s.set_clientCallBackFunction(function (e, t) {
              i && i(t);
            }),
            s.center(),
            s.show(),
            r && $telerik.isIE)
          ) {
            var l = s.get_popupElement().getElementsByTagName("INPUT")[0];
            l && (l.value = r);
          }
          return s;
        },
        _initializeRadPromptKeyboardNavigation: function (e) {
          var i = e;
          if (i) {
            var t = $(i.get_popupElement()).find(POPUP_BUTTON_SELECTOR)[1];
            this._initializeKeyboardNavigation(i, function () {
              var e = $(i.get_popupElement()).find(DIALOG_INPUT_SELECTOR)[0];
              i.close($(e).val());
            }),
              i._keyboardNavigation.addShortCut({
                eventName: KEY_UP,
                element: t,
                key: Keys.SPACEBAR,
                action: function () {
                  i.close(null);
                },
              });
          }
        },
        getActiveWindow: function () {
          return Telerik.Web.UI.RadWindowController.get_activeWindow();
        },
        getWindowById: function (e) {
          for (var i = this.get_windows(), t = 0; t < i.length; t++) {
            var n = i[t];
            if (e == n.get_id()) return n;
          }
          return null;
        },
        getWindowByName: function (e) {
          var i = this.get_windows();
          if (!i) return null;
          for (var t = 0; t < i.length; t++) {
            var n = i[t];
            if (e == n.get_name()) return n;
          }
          return null;
        },
        removeWindow: function (e) {
          if (e) {
            var i = this.getWindowByName(e.get_name()),
              t = this.get_windows();
            i && Array.remove(t, i);
          }
        },
        _getUniqueId: function () {
          return "" + (new Date() - 100);
        },
        _initialize: function () {
          for (var e = this._windowIDs, i = 0; i < e.length; i++) {
            var t = e[i],
              n = $find(t);
            n &&
              (n.set_windowManager(this),
              (this._windows[this._windows.length] = n));
          }
        },
        _disposeWindows: function () {
          for (var e = 0; e < this._windows.length; e++) {
            var i = this._windows[e];
            i.isCloned() && i.dispose();
          }
          this._windows = [];
        },
        clearCloneCache: function () {
          this.__clonedProperties__ = null;
        },
        _createWindow: function (e, i) {
          var t = this.clone(e);
          return (
            t.set_modal(t.isModal()),
            t.set_centerIfModal(this.get_centerIfModal()),
            t.set_name(e),
            (this._windows[this._windows.length] = t),
            t.set_windowManager(this),
            i &&
              (t.set_contentElement(i),
              (t._dockMode = !0),
              t.set_behaviors(
                t.get_behaviors() & ~Telerik.Web.UI.WindowBehaviors.Reload,
              )),
            t
          );
        },
        _replaceLocalization: function (e, i) {
          for (var t = /##LOC\[(.*?)\]##/; e.match(t); ) {
            var n = this._getLocalizationString(RegExp.$1),
              o = n || "";
            e = e.replace(t, o);
          }
          return e;
        },
        _getStandardPopup: function (e, i, t, n) {
          var o = this,
            a = o._createWindow(e + o._getUniqueId(), !1);
          a.set_destroyOnClose(!0),
            a.set_restrictionZoneID(null),
            a.set_modal(!0),
            a.set_behaviors(
              Telerik.Web.UI.WindowBehaviors.Close +
                Telerik.Web.UI.WindowBehaviors.Move,
            ),
            a.set_visibleStatusbar(!1),
            (a._isPredefined = !0),
            (i = i.replace(/\$/g, "$$$"));
          var r = document.getElementById(
              o.get_id() + "_" + e.toLowerCase() + "template",
            ),
            s = $telerik.isIE && !$telerik.isIE9Mode ? "''" : "",
            l = o._stringFormat(r.innerHTML, a.get_id(), i, t || s);
          l = o._replaceLocalization(
            l,
            Telerik.Web.UI.RadWindowUtils.Localization,
          );
          var d = document.createElement("div");
          a.set_contentElement(d),
            (d.innerHTML = l),
            (d.id = a.get_id() + "_content"),
            $(".rwDialogText, .rwDialogMessage", d).attr(
              "id",
              a.get_id() + "_message",
            );
          var c = $(this.get_element()).find(".wm").clone();
          if (
            (c.length > 0 && c.appendTo(a._contentElement.parentElement),
            "prompt" != e && null != n && "null" != n)
          ) {
            var u = $telerik.$(d).find("div.rwDialog,div.rwDialogPopup");
            u.css({ backgroundImage: String.format("url('{0}')", n) }),
              $(u).addClass("rwNoIcon");
          }
          for (
            var g, _ = a.get_contentElement(), h = ["a", "button", "input"];
            !g && h.length;

          )
            g = _.getElementsByTagName(h.pop())[0];
          return (
            o._enableRippleEffect &&
              $("BUTTON", _).each(function (e, i) {
                g || (g = i), o._initializeRipple(i);
              }),
            g &&
              g.focus &&
              window.setTimeout(function () {
                var e = !0;
                if (g.setActive)
                  try {
                    g.setActive(), (e = !1);
                  } catch (e) {}
                e && g.focus();
              }, 0),
            a
          );
        },
        _initializeRipple: function (e) {
          var i = this;
          i._materialRippleManager ||
            (i._materialRippleManager =
              Telerik.Web.UI.MaterialRippleManager.getInstance()),
            i._materialRippleManager.initializeRipple(e);
        },
        _stringFormat: function (e) {
          for (var i = 1; i < arguments.length; i++)
            e = e.replace(
              new RegExp("\\{" + (i - 1) + "\\}", "ig"),
              arguments[i],
            );
          return e;
        },
        _registerAsPageManager: function () {
          var e = Telerik.Web.UI.WindowManager.Manager,
            i = this.get_id();
          e &&
            e.get_id() == i &&
            (e.dispose(), (Telerik.Web.UI.WindowManager.Manager = null)),
            e && !e.get_id() && (Telerik.Web.UI.WindowManager.Manager = null),
            Telerik.Web.UI.WindowManager.Manager ||
              (Telerik.Web.UI.WindowManager.Manager = this),
            e && this._ensureFirstManagerIsRegistered();
        },
        _ensureFirstManagerIsRegistered: function () {
          var e = this.get_id(),
            i = this;
          try {
            document.body.innerHTML.replace(
              /\$create\(Telerik.Web.UI.RadWindowManager.*\$get\("([^"]*)"\)/,
              function (t, n) {
                e == n && (Telerik.Web.UI.WindowManager.Manager = i);
              },
            );
          } catch (e) {}
        },
        saveWindowState: function (e) {
          if (e && e.isCreated()) {
            var i = e.getWindowBounds(),
              t =
                (e.isVisible() || e.isMinimized()) +
                "@" +
                i.width +
                "@" +
                i.height +
                "@" +
                i.x +
                "@" +
                i.y +
                "@" +
                e.isMinimized();
            this._setRadWindowCookie(e.get_id(), t);
          }
        },
        saveState: function () {
          var e,
            i = this.get_windows();
          for (e = 0; e < i.length; e++) {
            var t = i[e];
            t.isCloned() && this.saveWindowState(t);
          }
        },
        restoreState: function () {
          var e;
          function i(e, i) {
            var t = i.split("@");
            t.length > 1 &&
              ("true" != t[0] || e.isVisible() || e.show(),
              window.setTimeout(function () {
                parseInt(t[1], 10) > 0 && e.set_width(t[1]),
                  parseInt(t[2], 10) > 0 && e.set_height(t[2]),
                  "true" == t[0] &&
                    e.moveTo(parseInt(t[3], 10), parseInt(t[4], 10)),
                  "true" == t[5] && e.minimize();
              }, 1));
          }
          var t = this.get_windows();
          for (e = 0; e < t.length; e++) {
            var n = t[e],
              o = this._getRadWindowCookie(n.get_id());
            o && i(n, o);
          }
        },
        _getOnlyCookie: function () {
          for (var e = document.cookie.split("; "), i = 0; i < e.length; i++) {
            var t = e[i].split("=");
            if ("RadWindowCookie" == t[0]) return t[1];
          }
          return null;
        },
        _setRadWindowCookie: function (e, i) {
          e = "[" + e + "]";
          var t = this._getOnlyCookie(),
            n = "",
            o = "";
          if (t) {
            var a = t.split(e);
            a && a.length > 1
              ? ((n = a[0]), (o = a[1].substr(a[1].indexOf("#") + 1)))
              : (o = t);
          }
          var r = new Date();
          r.setFullYear(r.getFullYear() + 10),
            (document.cookie =
              "RadWindowCookie=" +
              (n + e) +
              "-" +
              i +
              "#" +
              o +
              ";path=/;expires=" +
              r.toUTCString() +
              ";");
        },
        _getRadWindowCookie: function (e) {
          var i = this._getOnlyCookie();
          if (i) {
            var t = null;
            e = "[" + e + "]";
            var n = i.indexOf(e);
            if (n >= 0) {
              var o = n + e.length + 1;
              t = i.substring(o, i.indexOf("#", o));
            }
            return t;
          }
        },
        cascade: function () {
          for (
            var e = 0, i = 0, t = this._getWindowsSortedByZindex(), n = 0;
            n < t.length;
            n++
          ) {
            var o = t[n];
            !o.isClosed() &&
              o.isVisible() &&
              (o.restore(),
              o.moveTo(i, e),
              o.setActive(!0),
              (e += 25),
              (i += 25));
          }
        },
        tile: function () {
          var e,
            i = this._getWindowsSortedByZindex(),
            t = 0;
          for (e = 0; e < i.length; e++) {
            var n = i[e];
            !n.isClosed() && n.isVisible() && t++;
          }
          var o = 0,
            a = 1;
          if (t <= 5) o = t;
          else {
            for (e = 2; t * e < 5 * (e + 1) && !(++e > 6); );
            (a = e), (o = Math.ceil(t / a));
          }
          var r = $telerik.getClientBounds(),
            s = Math.floor(r.width / o),
            l = Math.floor(r.height / a),
            d = document.documentElement.scrollLeft || document.body.scrollLeft,
            c = document.documentElement.scrollTop || document.body.scrollTop,
            u = 0;
          for (e = 0; e < i.length; e++) {
            var g = i[e];
            !g.isClosed() &&
              g.isVisible() &&
              ((++u - 1) % o == 0 &&
                u > o &&
                ((c += l),
                (d =
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft)),
              g.restore(),
              g.moveTo(d, c),
              g.setSize(s, l),
              (d += s));
          }
        },
        closeActiveWindow: function () {
          this._executeActiveWindow("close");
        },
        minimizeActiveWindow: function () {
          this._executeActiveWindow("minimize");
        },
        restoreActiveWindow: function () {
          this._executeActiveWindow("restore");
        },
        closeAll: function () {
          this._executeAll("close");
        },
        showAll: function () {
          this._executeAll("show");
        },
        minimizeAll: function () {
          this._executeAll("minimize");
        },
        maximizeAll: function () {
          this._executeAll("maximize");
        },
        restoreAll: function () {
          this._executeAll("restore");
        },
        _getWindowsSortedByZindex: function () {
          return this._windows.concat([]).sort(function (e, i) {
            var t = e.get_zindex(),
              n = i.get_zindex();
            return t == n ? 0 : t < n ? -1 : 1;
          });
        },
        _executeAll: function (e) {
          if (this._windows)
            for (var i = this._windows.concat([]), t = 0; t < i.length; t++)
              i[t][e]();
        },
        _executeActiveWindow: function (e) {
          var i = this.getActiveWindow();
          i && "function" == typeof i[e] && i[e]();
        },
        get_preserveClientState: function () {
          return this._preserveClientState;
        },
        set_preserveClientState: function (e) {
          this._preserveClientState != e && (this._preserveClientState = e);
        },
        set_windowControls: function (value) {
          (this._windowIDs = eval(value)), this._disposeWindows();
        },
        set_child: function (e) {},
        get_windowControls: function () {},
        get_windows: function () {
          return this._windows;
        },
      }),
      Telerik.Web.UI.RadWindowManager.registerClass(
        "Telerik.Web.UI.RadWindowManager",
        Telerik.Web.UI.RadWindow,
      );
  })($telerik.$);
