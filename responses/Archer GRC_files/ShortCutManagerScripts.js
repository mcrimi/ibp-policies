!(function () {
  Type.registerNamespace("Telerik.Web.UI");
  var e = Telerik.Web.UI;
  (e.ShortCut = function (e, t, s) {
    (this._name = e),
      (this._shortcutString = ""),
      (this._callBack = s),
      (this.CtrlKey = !1),
      (this.LeftCtrlKey = !1),
      (this.ShiftKey = !1),
      (this.LeftShiftKey = !1),
      (this.AltKey = !1),
      (this.LeftAltKey = !1),
      (this.CmdKey = !1),
      (this.KeyCode = 0),
      this.setShortCut(t);
  }),
    (e.ShortCut.prototype = {
      get_name: function () {
        return this._name;
      },
      set_name: function (e) {
        this._name = e;
      },
      get_shortCutString: function () {
        return this._shortcutString;
      },
      setShortCut: function (e) {
        this._parseShortcutString(e), (this._shortcutString = e);
      },
      get_callBack: function () {
        return this._callBack;
      },
      set_callBack: function (e) {
        this._callBack = e;
      },
      _parseShortcutString: function (e) {
        if ("string" != typeof e)
          throw { description: "Invalid shortcut string" };
        (this.CtrlKey = !1),
          (this.LeftCtrlKey = !1),
          (this.ShiftKey = !1),
          (this.LeftShiftKey = !1),
          (this.AltKey = !1),
          (this.LeftAltKey = !1),
          (this.CmdKey = !1),
          (this.KeyCode = 0);
        for (
          var t = (e = (e = e.replace(/\s*/gi, "")).replace(
              /\+\+/gi,
              "+PLUS",
            )).split("+"),
            s = "",
            r = 0;
          r < t.length;
          r++
        )
          switch ((s = t[r].toUpperCase())) {
            case "LCTRL":
              this.LeftCtrlKey = !0;
            case "CTRL":
              this.CtrlKey = !0;
              break;
            case "LSHIFT":
              this.LeftShiftKey = !0;
            case "SHIFT":
              this.ShiftKey = !0;
              break;
            case "LALT":
              this.LeftAltKey = !0;
            case "ALT":
              this.AltKey = !0;
              break;
            case "COMMAND":
            case "CMD":
              this.CmdKey = !0;
              break;
            case "F1":
              this.KeyCode = 112;
              break;
            case "F2":
              this.KeyCode = 113;
              break;
            case "F3":
              this.KeyCode = 114;
              break;
            case "F4":
              this.KeyCode = 115;
              break;
            case "F5":
              this.KeyCode = 116;
              break;
            case "F6":
              this.KeyCode = 117;
              break;
            case "F7":
              this.KeyCode = 118;
              break;
            case "F8":
              this.KeyCode = 119;
              break;
            case "F9":
              this.KeyCode = 120;
              break;
            case "F10":
              this.KeyCode = 121;
              break;
            case "F11":
              this.KeyCode = 122;
              break;
            case "F12":
              this.KeyCode = 123;
              break;
            case "ENTER":
              this.KeyCode = 13;
              break;
            case "HOME":
              this.KeyCode = 36;
              break;
            case "END":
              this.KeyCode = 35;
              break;
            case "LEFT":
              this.KeyCode = 37;
              break;
            case "RIGHT":
              this.KeyCode = 39;
              break;
            case "UP":
              this.KeyCode = 38;
              break;
            case "DOWN":
              this.KeyCode = 40;
              break;
            case "PAGEUP":
              this.KeyCode = 33;
              break;
            case "PAGEDOWN":
              this.KeyCode = 34;
              break;
            case "SPACE":
              this.KeyCode = 32;
              break;
            case "TAB":
              this.KeyCode = 9;
              break;
            case "BACK":
              this.KeyCode = 8;
              break;
            case "CONTEXT":
              this.KeyCode = 93;
              break;
            case "ESCAPE":
            case "ESC":
              this.KeyCode = 27;
              break;
            case "DELETE":
            case "DEL":
              this.KeyCode = 46;
              break;
            case "INSERT":
            case "INS":
              this.KeyCode = 45;
              break;
            case "PLUS":
              this.KeyCode = "+".charCodeAt(0);
              break;
            default:
              this.KeyCode = s.charCodeAt(0);
          }
      },
    }),
    e.ShortCut.registerClass("Telerik.Web.UI.ShortCut", null);
})(),
  (function () {
    Type.registerNamespace("Telerik.Web.UI");
    var e = Telerik.Web.UI;
    (e.ShortCutManager = function (e) {
      (this._shortcuts = []), this.addShortCuts(e);
    }),
      (e.ShortCutManager.prototype = {
        addShortCuts: function (e) {
          if (e) {
            "string" == typeof e &&
              (e = Sys.Serialization.JavaScriptSerializer.deserialize(e));
            for (var t = 0; t < e.length; t++)
              this.addShortCut(e[t][0], e[t][1], e[t][2]);
          }
        },
        addShortCut: function (t, s, r) {
          var a = new e.ShortCut(t, s, r);
          (a.HashValue = this._getShortCutHashValue(a)),
            (this._shortcuts[a.HashValue] = a);
        },
        removeShortCut: function (e) {
          var t = this.findShortCutByName(e);
          t && (this._shortcuts[t.HashValue] = null);
        },
        setShortCut: function (e, t) {
          this.removeShortCut(e), this.addShortCut(e, t);
        },
        isShortCutHit: function (e) {
          var t = null != e.ctrlLeft ? e.ctrlLeft : e.ctrlKey,
            s = null != e.shiftLeft ? e.shiftLeft : e.shiftKey,
            r = null != e.altLeft ? e.altLeft : e.altKey;
          return this._hitTest(
            e.keyCode,
            e.ctrlKey,
            t,
            e.shiftKey,
            s,
            e.altKey,
            r,
            !!e.metaKey,
          );
        },
        _hitTest: function (e, t, s, r, a, i, h, o) {
          var c = this._getHashValue(e, t, s, r, a, i, h, o);
          return this._shortcuts[c];
        },
        _getHashValue: function (e, t, s, r, a, i, h, o) {
          var c = 65535 & e,
            n = 0;
          return (
            (n |= t ? 1 : 0),
            (n |= r ? 4 : 0),
            (n |= i ? 16 : 0),
            (c |= (n |= o ? 256 : 0) << 16)
          );
        },
        _getShortCutHashValue: function (e) {
          return this._getHashValue(
            e.KeyCode,
            e.CtrlKey,
            e.LeftCtrlKey,
            e.ShiftKey,
            e.LeftShiftKey,
            e.AltKey,
            e.LeftAltKey,
            e.CmdKey,
          );
        },
        findShortCutByName: function (e) {
          var t;
          for (var s in this._shortcuts)
            if (null != (t = this._shortcuts[s]) && t._name == e) return t;
          return null;
        },
      }),
      e.ShortCutManager.registerClass("Telerik.Web.UI.ShortCutManager", null);
  })();
