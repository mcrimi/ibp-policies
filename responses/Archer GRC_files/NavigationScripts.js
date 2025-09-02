function WebForm_CallbackComplete() {
  for (var e = 0; e < __pendingCallbacks.length; e++) {
    var t = __pendingCallbacks[e];
    if (t && t.xmlRequest && 4 == t.xmlRequest.readyState) {
      (__pendingCallbacks[e] = null),
        WebForm_ExecuteCallback(t),
        t.async || (__synchronousCallBackIndex = -1);
      var i = "__CALLBACKFRAME" + e,
        n = document.getElementById(i);
      n && n.parentNode.removeChild(n);
    }
  }
}
Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.AttributeCollection = function (e) {
    (this._owner = e), (this._data = {}), (this._keys = []);
  }),
  (Telerik.Web.UI.AttributeCollection.prototype = {
    getAttribute: function (e) {
      return this._data[e];
    },
    setAttribute: function (e, t) {
      this._add(e, t);
      var i = {};
      (i[e] = t), this._owner._notifyPropertyChanged("attributes", i);
    },
    _add: function (e, t) {
      Array.indexOf(this._keys, e) < 0 && Array.add(this._keys, e),
        (this._data[e] = t);
    },
    removeAttribute: function (e) {
      Array.remove(this._keys, e), delete this._data[e];
    },
    _load: function (e, t) {
      if (t)
        for (var i = 0, n = e.length; i < n; i++)
          this._add(e[i].Key, e[i].Value);
      else for (var r in e) this._add(r, e[r]);
    },
    get_count: function () {
      return this._keys.length;
    },
  }),
  Telerik.Web.UI.AttributeCollection.registerClass(
    "Telerik.Web.UI.AttributeCollection",
  ),
  (function () {
    Type.registerNamespace("Telerik.Web.UI");
    var e = Telerik.Web.UI;
    (Telerik.Web.JavaScriptSerializer = {
      _stringRegEx: new RegExp('["\b\f\n\r\t\\\\\0-]', "i"),
      serialize: function (e) {
        var t = new Telerik.Web.StringBuilder();
        return (
          Telerik.Web.JavaScriptSerializer._serializeWithBuilder(e, t),
          t.toString()
        );
      },
      _serializeWithBuilder: function (e, t) {
        var i;
        switch (typeof e) {
          case "object":
            if (e)
              if (e.constructor == Array) {
                for (t.append("["), i = 0; i < e.length; ++i)
                  i > 0 && t.append(","), this._serializeWithBuilder(e[i], t);
                t.append("]");
              } else {
                if (e.constructor == Date) {
                  t.append('"\\/Date('),
                    t.append(e.getTime()),
                    t.append(')\\/"');
                  break;
                }
                var n = [],
                  r = 0;
                for (var s in e) s.startsWith("$") || (n[r++] = s);
                t.append("{");
                var a = !1;
                for (i = 0; i < r; i++) {
                  var o = e[n[i]];
                  void 0 !== o &&
                    "function" != typeof o &&
                    (a ? t.append(",") : (a = !0),
                    this._serializeWithBuilder(n[i], t),
                    t.append(":"),
                    this._serializeWithBuilder(o, t));
                }
                t.append("}");
              }
            else t.append("null");
            break;
          case "number":
            if (!isFinite(e))
              throw Error.invalidOperation(
                Sys.Res.cannotSerializeNonFiniteNumbers,
              );
            t.append(String(e));
            break;
          case "string":
            if (
              (t.append('"'),
              Sys.Browser.agent === Sys.Browser.Safari ||
                Telerik.Web.JavaScriptSerializer._stringRegEx.test(e))
            ) {
              var l = e.length;
              for (i = 0; i < l; ++i) {
                var h = e.charAt(i);
                if (h >= " ")
                  ("\\" !== h && '"' !== h) || t.append("\\"), t.append(h);
                else
                  switch (h) {
                    case "\b":
                      t.append("\\b");
                      break;
                    case "\f":
                      t.append("\\f");
                      break;
                    case "\n":
                      t.append("\\n");
                      break;
                    case "\r":
                      t.append("\\r");
                      break;
                    case "\t":
                      t.append("\\t");
                      break;
                    default:
                      t.append("\\u00"),
                        h.charCodeAt() < 16 && t.append("0"),
                        t.append(h.charCodeAt().toString(16));
                  }
              }
            } else t.append(e);
            t.append('"');
            break;
          case "boolean":
            t.append(e.toString());
            break;
          default:
            t.append("null");
        }
      },
    }),
      (e.ChangeLog = function () {
        (this._opCodeInsert = 1),
          (this._opCodeDelete = 2),
          (this._opCodeClear = 3),
          (this._opCodePropertyChanged = 4),
          (this._opCodeReorder = 5),
          (this._logEntries = null);
      }),
      (e.ChangeLog.prototype = {
        initialize: function () {
          (this._logEntries = []), (this._serializedEntries = null);
        },
        logInsert: function (e) {
          var t = {};
          (t.Type = this._opCodeInsert),
            (t.Index = e._getHierarchicalIndex()),
            (t.Data = e._getData()),
            Array.add(this._logEntries, t);
        },
        logDelete: function (e) {
          var t = {};
          (t.Type = this._opCodeDelete),
            (t.Index = e._getHierarchicalIndex()),
            Array.add(this._logEntries, t);
        },
        logClear: function (e) {
          var t = {};
          (t.Type = this._opCodeClear),
            e._getHierarchicalIndex && (t.Index = e._getHierarchicalIndex()),
            Array.add(this._logEntries, t);
        },
        logPropertyChanged: function (e, t, i) {
          var n = {};
          (n.Type = this._opCodePropertyChanged),
            (n.Index = e._getHierarchicalIndex()),
            (n.Data = {}),
            (n.Data[t] = i),
            Array.add(this._logEntries, n);
        },
        logReorder: function (e, t, i) {
          Array.add(this._logEntries, {
            Type: this._opCodeReorder,
            Index: t + "",
            Data: { NewIndex: i + "" },
          });
        },
        serialize: function () {
          if (0 == this._logEntries.length)
            return null == this._serializedEntries
              ? "[]"
              : this._serializedEntries;
          var e = Telerik.Web.JavaScriptSerializer.serialize(this._logEntries);
          return (
            null == this._serializedEntries
              ? (this._serializedEntries = e)
              : (this._serializedEntries =
                  this._serializedEntries.substring(
                    0,
                    this._serializedEntries.length - 1,
                  ) +
                  "," +
                  e.substring(1)),
            (this._logEntries = []),
            this._serializedEntries
          );
        },
      }),
      e.ChangeLog.registerClass("Telerik.Web.UI.ChangeLog");
  })(window),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.PropertyBag = function (e) {
    (this._data = {}), (this._owner = e);
  }),
  (Telerik.Web.UI.PropertyBag.prototype = {
    getValue: function (e, t) {
      var i = this._data[e];
      return void 0 === i ? t : i;
    },
    setValue: function (e, t, i) {
      (this._data[e] = t), i && this._owner._notifyPropertyChanged(e, t);
    },
    load: function (e) {
      this._data = e;
    },
  }),
  (Telerik.Web.UI.ControlItem = function () {
    (this._key = null),
      (this._element = null),
      (this._parent = null),
      (this._text = null),
      (this._children = null),
      (this._childControlsCreated = !1),
      (this._itemData = null),
      (this._control = null),
      (this._properties = new Telerik.Web.UI.PropertyBag(this));
  }),
  (Telerik.Web.UI.ControlItem.prototype = {
    _shouldNavigate: function () {
      var e = this.get_navigateUrl();
      return !!e && !e.endsWith("#");
    },
    _getNavigateUrl: function () {
      return this.get_linkElement()
        ? this._properties.getValue(
            "navigateUrl",
            this.get_linkElement().getAttribute("href", 2),
          )
        : this._properties.getValue("navigateUrl", null);
    },
    _initialize: function (e, t) {
      this.set_element(t),
        this._properties.load(e),
        e.attributes && this.get_attributes()._load(e.attributes),
        (this._itemData = e.items);
    },
    _dispose: function () {
      this._children &&
        this._children.forEach(function (e) {
          e._dispose();
        }),
        this._element && ((this._element._item = null), (this._element = null)),
        this._control && (this._control = null);
    },
    _initializeRenderedItem: function () {
      var e = this._children;
      if (e && !(e.get_count() < 1))
        for (
          var t = this._getChildElements(), i = 0, n = e.get_count();
          i < n;
          i++
        ) {
          var r = e.getItem(i);
          r.get_element() ||
            (r.set_element(t[i]),
            this._shouldInitializeChild(r) && r._initializeRenderedItem());
        }
    },
    findControl: function (e) {
      return $telerik.findControl(this.get_element(), e);
    },
    get_attributes: function () {
      return (
        this._attributes ||
          (this._attributes = new Telerik.Web.UI.AttributeCollection(this)),
        this._attributes
      );
    },
    get_element: function () {
      return this._element;
    },
    set_element: function (e) {
      (this._element = e),
        (this._element._item = this),
        (this._element._itemTypeName = Object.getTypeName(this));
    },
    get_parent: function () {
      return this._parent;
    },
    set_parent: function (e) {
      this._parent = e;
    },
    get_text: function () {
      if (null !== this._text) return this._text;
      if (((this._text = this._properties.getValue("text", "")), this._text))
        return this._text;
      if (!this.get_element()) return "";
      var e = this.get_textElement();
      return e ? ((this._text = e.textContent || e.innerText), this._text) : "";
    },
    set_text: function (e) {
      var t = this.get_textElement();
      t && (t.innerHTML = e),
        (this._text = e),
        this._properties.setValue("text", e, !0);
    },
    get_value: function () {
      return this._properties.getValue("value", null);
    },
    set_value: function (e) {
      this._properties.setValue("value", e, !0);
    },
    get_itemData: function () {
      return this._itemData;
    },
    get_index: function () {
      return this.get_parent()
        ? this.get_parent()._getChildren().indexOf(this)
        : -1;
    },
    set_enabled: function (e) {
      this._properties.setValue("enabled", e, !0);
    },
    get_enabled: function () {
      return 1 == this._properties.getValue("enabled", !0);
    },
    get_isEnabled: function () {
      var e = this._getControl();
      return e ? e.get_enabled() && this.get_enabled() : this.get_enabled();
    },
    set_visible: function (e) {
      this._properties.setValue("visible", e);
    },
    get_visible: function () {
      return this._properties.getValue("visible", !0);
    },
    get_level: function () {
      for (var e = this.get_parent(), t = 0; e; ) {
        if (Telerik.Web.UI.ControlItemContainer.isInstanceOfType(e)) return t;
        t++, (e = e.get_parent());
      }
      return t;
    },
    get_isLast: function () {
      return (
        this.get_index() == this.get_parent()._getChildren().get_count() - 1
      );
    },
    get_isFirst: function () {
      return 0 == this.get_index();
    },
    get_nextSibling: function () {
      return this.get_parent()
        ? this.get_parent()
            ._getChildren()
            .getItem(this.get_index() + 1)
        : null;
    },
    get_previousSibling: function () {
      return this.get_parent()
        ? this.get_parent()
            ._getChildren()
            .getItem(this.get_index() - 1)
        : null;
    },
    toJsonString: function () {
      return Sys.Serialization.JavaScriptSerializer.serialize(this._getData());
    },
    _getHierarchicalIndex: function () {
      for (var e = [], t = this._getControl(), i = this; i != t; )
        (e[e.length] = i.get_index()), (i = i.get_parent());
      return e.reverse().join(":");
    },
    _getChildren: function () {
      return this._ensureChildControls(), this._children;
    },
    _ensureChildControls: function () {
      this._childControlsCreated ||
        (this._createChildControls(), (this._childControlsCreated = !0));
    },
    _setCssClass: function (e, t) {
      e.className != t && (e.className = t);
    },
    _createChildControls: function () {
      this._children = this._createItemCollection();
    },
    _createItemCollection: function () {},
    _getControl: function () {
      if (!this._control) {
        var e = this.get_parent();
        e &&
          (Telerik.Web.UI.ControlItemContainer.isInstanceOfType(e)
            ? (this._control = e)
            : (this._control = e._getControl()));
      }
      return this._control;
    },
    _getAllItems: function () {
      var e = [];
      return this._getAllItemsRecursive(e, this), e;
    },
    _getAllItemsRecursive: function (e, t) {
      for (var i = t._getChildren(), n = 0; n < i.get_count(); n++) {
        var r = i.getItem(n);
        Array.add(e, r), this._getAllItemsRecursive(e, r);
      }
    },
    _getData: function () {
      var e = this._properties._data;
      return (
        delete e.items,
        (e.text = this.get_text()),
        this.get_attributes().get_count() > 0 &&
          (e.attributes = this.get_attributes()._data),
        e
      );
    },
    _notifyPropertyChanged: function (e, t) {
      var i = this._getControl();
      i && i._itemPropertyChanged(this, e, t);
    },
    _loadFromDictionary: function (e, t) {
      void 0 !== e.Text && this.set_text(e.Text),
        void 0 !== e.Key && this.set_text(e.Key),
        void 0 !== e.Value && "" !== e.Value && this.set_value(e.Value),
        void 0 !== e.Enabled && !0 !== e.Enabled && this.set_enabled(e.Enabled),
        e.Attributes && this.get_attributes()._load(e.Attributes, t);
    },
    _loadFromCustomDictionary: function (e, t) {
      var i = e[t.dataTextField],
        n = e[t.dataValueField],
        r = e[t.dataKeyField],
        s = e[t.Enabled],
        a = e[t.Attributes];
      void 0 !== i && this.set_text(i),
        void 0 !== n && "" !== n && this.set_value(n),
        void 0 !== r && this.set_key(r),
        void 0 !== s && !0 !== s && this.set_enabled(s),
        a && this.get_attributes()._load(a, !1);
    },
    _createDomElement: function () {
      var e = document.createElement("ul"),
        t = [];
      return this._render(t), (e.innerHTML = t.join("")), e.firstChild;
    },
    get_cssClass: function () {
      return this._properties.getValue("cssClass", "");
    },
    set_cssClass: function (e) {
      var t = this.get_cssClass();
      this._properties.setValue("cssClass", e, !0), this._applyCssClass(e, t);
    },
    get_key: function () {
      return this._properties.getValue("key", null);
    },
    set_key: function (e) {
      this._properties.setValue("key", e, !0);
    },
    _applyCssClass: function () {},
  }),
  Telerik.Web.UI.ControlItem.registerClass("Telerik.Web.UI.ControlItem"),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.ControlItemCollection = function (e) {
    (this._array = []), (this._parent = e), (this._control = null);
  }),
  (Telerik.Web.UI.ControlItemCollection.prototype = {
    add: function (e) {
      var t = this._array.length;
      this.insert(t, e);
    },
    insert: function (e, t) {
      var i = t.get_parent(),
        n = this._parent._getControl();
      i && i._getChildren().remove(t),
        n && n._childInserting(e, t, this._parent),
        Array.insert(this._array, e, t),
        t.set_parent(this._parent),
        n && (n._childInserted(e, t, this._parent), n._logInserted(t));
    },
    remove: function (e) {
      var t = this._parent._getControl();
      t && t._childRemoving(e),
        Array.remove(this._array, e),
        t && t._childRemoved(e, this._parent),
        e.set_parent(null),
        (e._control = null);
    },
    removeAt: function (e) {
      var t = this.getItem(e);
      t && this.remove(t);
    },
    clear: function () {
      var e = this._parent._getControl();
      e && (e._logClearing(this._parent), e._childrenCleared(this._parent)),
        (this._array = []);
    },
    get_count: function () {
      return this._array.length;
    },
    getItem: function (e) {
      return this._array[e];
    },
    indexOf: function (e) {
      for (var t = 0, i = this._array.length; t < i; t++)
        if (this._array[t] === e) return t;
      return -1;
    },
    forEach: function (e) {
      for (var t = 0, i = this.get_count(); t < i; t++) e(this._array[t]);
    },
    toArray: function () {
      return this._array.slice(0);
    },
  }),
  Telerik.Web.UI.ControlItemCollection.registerClass(
    "Telerik.Web.UI.ControlItemCollection",
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  (function (e, t) {
    (t.ControlItemContainer = function (e) {
      t.ControlItemContainer.initializeBase(this, [e]),
        (this._childControlsCreated = !1),
        (this._enabled = !0),
        (this._log = new t.ChangeLog()),
        (this._enableClientStatePersistence = !1),
        (this._eventMap = new t.EventMap()),
        (this._attributes = new t.AttributeCollection(this)),
        (this._children = null),
        (this._odataClientSettings = null),
        (this._dataTextField = ""),
        (this._dataValueField = ""),
        (this._clientDataSourceID = ""),
        (this._navigationSettings = null);
    }),
      (t.ControlItemContainer.prototype = {
        initialize: function () {
          t.ControlItemContainer.callBaseMethod(this, "initialize"),
            this._ensureChildControls(),
            this._log.initialize(),
            this._initializeEventMap(),
            this.get_isUsingODataSource() &&
              this._initializeODataSourceBinder(),
            this._navigationSettings && this._applyKeyboardNavigationSettings();
        },
        dispose: function () {
          this._eventMap && this._eventMap.dispose(),
            this._childControlsCreated && this._disposeChildren(),
            this._keyboardNavigationSettings &&
              this._keyboardNavigationSettings.dispose(),
            this.get_isUsingODataSource() && this._disposeODataSourceBinder(),
            t.ControlItemContainer.callBaseMethod(this, "dispose");
        },
        trackChanges: function () {
          this._enableClientStatePersistence = !0;
        },
        set_enabled: function (e) {
          this._enabled = e;
        },
        set_clientDataSource: function () {
          throw "Not implemented";
        },
        get_enabled: function () {
          return this._enabled;
        },
        commitChanges: function () {
          this.updateClientState(), (this._enableClientStatePersistence = !1);
        },
        get_attributes: function () {
          return this._attributes;
        },
        set_attributes: function (e) {
          this._attributes._load(e);
        },
        get_isUsingODataSource: function () {
          return null != this._odataClientSettings;
        },
        get_odataClientSettings: function () {
          return this._odataClientSettings;
        },
        set_odataClientSettings: function (e) {
          this._odataClientSettings = e;
        },
        _disposeChildren: function () {
          var e = this._getChildren();
          if (e)
            for (var t = 0, i = e.get_count(); t < i; t++)
              e.getItem(t)._dispose();
        },
        _initializeEventMap: function () {
          this._eventMap.initialize(this);
        },
        _initializeODataSourceBinder: function () {},
        _disposeODataSourceBinder: function () {},
        _applyKeyboardNavigationSettings: function () {
          (this._keyboardNavigationSettings = new t.KeyboardNavigationSettings(
            this.get_element(),
            this._navigationSettings,
          )),
            this._keyboardNavigationSettings.initialize();
        },
        _getChildren: function () {
          return this._ensureChildControls(), this._children;
        },
        _extractErrorMessage: function (e) {
          return e.get_message ? e.get_message() : e.replace(/(\d*\|.*)/, "");
        },
        _notifyPropertyChanged: function (e, t) {},
        _childInserting: function (e, t, i) {},
        _childInserted: function (e, t, i) {
          if (i._childControlsCreated && i.get_element()) {
            var n = t._createDomElement(),
              r = n.parentNode;
            this._attachChildItem(t, n, i),
              this._destroyDomElement(r),
              t.get_element()
                ? t.set_element(n)
                : (t.set_element(n), t._initializeRenderedItem());
          }
        },
        _attachChildItem: function (e, t, i) {
          var n = i.get_childListElement();
          n || (n = i._createChildListElement());
          var r = e.get_nextSibling(),
            s = r ? r.get_element() : null;
          i.get_childListElement().insertBefore(t, s);
        },
        _destroyDomElement: function (e) {
          var t = "radControlsElementContainer",
            i = $get(t);
          i ||
            (((i = document.createElement("div")).id = t),
            (i.style.display = "none"),
            document.body.appendChild(i)),
            i.appendChild(e),
            (i.innerHTML = "");
        },
        _childrenCleared: function (e) {
          for (var t = 0; t < e._getChildren().get_count(); t++)
            e._getChildren().getItem(t)._dispose();
          var i = e.get_childListElement();
          i && (i.innerHTML = "");
        },
        _childRemoving: function (e) {
          this._logRemoving(e);
        },
        _childRemoved: function (e, t) {
          e._dispose();
        },
        _createChildListElement: function () {
          throw Error.notImplemented();
        },
        _createDomElement: function () {
          throw Error.notImplemented();
        },
        _getControl: function () {
          return this;
        },
        _logInserted: function (e) {
          if (
            e.get_parent()._childControlsCreated &&
            this._enableClientStatePersistence
          ) {
            this._log.logInsert(e);
            for (var t = e._getAllItems(), i = 0; i < t.length; i++)
              this._log.logInsert(t[i]);
          }
        },
        _logRemoving: function (e) {
          this._enableClientStatePersistence && this._log.logDelete(e);
        },
        _logClearing: function (e) {
          this._enableClientStatePersistence && this._log.logClear(e);
        },
        _itemPropertyChanged: function (e, t, i) {
          this._enableClientStatePersistence &&
            this._log.logPropertyChanged(e, t, i);
        },
        _ensureChildControls: function () {
          this._childControlsCreated ||
            (this._createChildControls(), (this._childControlsCreated = !0));
        },
        _createChildControls: function () {
          throw Error.notImplemented();
        },
        _extractItemFromDomElement: function (e) {
          for (this._ensureChildControls(); e && 9 !== e.nodeType; ) {
            if (e._item && this._verifyChildType(e._itemTypeName))
              return e._item;
            e = e.parentNode;
          }
          return null;
        },
        _verifyChildType: function (e) {
          return e === this._childTypeName;
        },
        _getAllItems: function () {
          for (var e = [], t = 0; t < this._getChildren().get_count(); t++) {
            var i = this._getChildren().getItem(t);
            Array.add(e, i), Array.addRange(e, i._getAllItems());
          }
          return e;
        },
        _findItemByText: function (e) {
          for (var t = this._getAllItems(), i = 0; i < t.length; i++)
            if (t[i].get_text() == e) return t[i];
          return null;
        },
        _findItemByValue: function (e) {
          for (var t = this._getAllItems(), i = 0; i < t.length; i++)
            if (t[i].get_value() == e) return t[i];
          return null;
        },
        _findItemByAttribute: function (e, t) {
          for (var i = this._getAllItems(), n = 0; n < i.length; n++)
            if (i[n].get_attributes().getAttribute(e) == t) return i[n];
          return null;
        },
        _findItemByAbsoluteUrl: function (e) {
          for (var t = this._getAllItems(), i = 0; i < t.length; i++)
            if (t[i].get_linkElement() && t[i].get_linkElement().href == e)
              return t[i];
          return null;
        },
        _findItemByUrl: function (e) {
          for (var t = this._getAllItems(), i = 0; i < t.length; i++)
            if (t[i].get_navigateUrl() == e) return t[i];
          return null;
        },
        _findItemByHierarchicalIndex: function (e) {
          for (
            var t = null, i = this, n = e.split(":"), r = 0;
            r < n.length;
            r++
          ) {
            var s = parseInt(n[r], 10);
            if (i._getChildren().get_count() <= s) return null;
            (t = i._getChildren().getItem(s)), (i = t);
          }
          return t;
        },
      }),
      t.ControlItemContainer.registerClass(
        "Telerik.Web.UI.ControlItemContainer",
        t.RadWebControl,
      );
  })($telerik.$, Telerik.Web.UI),
  (function (e, t) {
    var i = Telerik.Web.UI,
      n = ".dropdown",
      r = {
        anchor: null,
        enableOverlay: !1,
        width: "",
        height: "",
        maxWidth: "",
        maxHeight: "",
        enableScreenBoundaryDetection: !0,
        enableDirectionDetection: !1,
        rtl: !1,
        offsetX: 0,
        offsetY: 0,
      };
    (i.DropDown = function (t, n) {
      e.observable(this),
        (this._options = e.extend(
          {},
          r,
          {
            direction: i.jSlideDirection.Down,
            expandAnimation: new i.AnimationSettings({}),
            collapseAnimation: new i.AnimationSettings({}),
          },
          n,
        )),
        (this._element = t.children[0]),
        (this._animationContainer = t),
        t && (t._dropDown = this);
    }),
      (i.DropDown.prototype = {
        initialize: function () {
          this._initializeSlide();
        },
        _initializeSlide: function () {
          (this._slide = new i.jSlide(
            this._element,
            this.get_expandAnimation(),
            this.get_collapseAnimation(),
            this._options.enableOverlay,
          )),
            this._slide.set_direction(this.get_direction()),
            this._slide.initialize(),
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
            ),
            (this._collapseAnimationStartedDelegate = Function.createDelegate(
              this,
              this._onCollapseAnimationStarted,
            )),
            this._slide.add_collapseAnimationStarted(
              this._collapseAnimationStartedDelegate,
            ),
            (this._collapseAnimationEndedDelegate = Function.createDelegate(
              this,
              this._onCollapseAnimationEnded,
            )),
            this._slide.add_collapseAnimationEnded(
              this._collapseAnimationEndedDelegate,
            );
        },
        dispose: function () {
          this._unbindParentsScroll(),
            this.disposeObservable(),
            this._disposeSlide(),
            !!Sys.WebForms &&
              Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack() &&
              $telerik.disposeElement(this._animationContainer),
            e(this._animationContainer).remove(),
            (this._animationContainer = null),
            (this._element = null);
        },
        _disposeSlide: function () {
          this._expandAnimationStartedDelegate &&
            (this._slide &&
              this._slide.remove_expandAnimationStarted(
                this._expandAnimationStartedDelegate,
              ),
            (this._expandAnimationStartedDelegate = null)),
            this._expandAnimationEndedDelegate &&
              (this._slide &&
                this._slide.remove_expandAnimationEnded(
                  this._expandAnimationEndedDelegate,
                ),
              (this._expandAnimationEndedDelegate = null)),
            this._collapseAnimationStartedDelegate &&
              (this._slide &&
                this._slide.remove_collapseAnimationStarted(
                  this._collapseAnimationStartedDelegate,
                ),
              (this._collapseAnimationStartedDelegate = null)),
            this._collapseAnimationEndedDelegate &&
              (this._slide &&
                this._slide.remove_collapseAnimationEnded(
                  this._collapseAnimationEndedDelegate,
                ),
              (this._collapseAnimationEndedDelegate = null)),
            this._slide && (this._slide.dispose(), (this._slide = null));
        },
        get_anchor: function () {
          return this._options.anchor;
        },
        set_anchor: function (e) {
          this._options.anchor = e;
        },
        get_direction: function () {
          return this._options.direction;
        },
        set_direction: function (e) {
          (this._options.direction = e), (this._slide._direction = e);
        },
        get_expandAnimation: function () {
          return this._options.expandAnimation;
        },
        set_expandAnimation: function (e) {
          (this._options.expandAnimation = e),
            (this._slide._expandAnimation = e);
        },
        get_collapseAnimation: function () {
          return this._options.collapseAnimation;
        },
        set_collapseAnimation: function (e) {
          (this._options.collapseAnimation = e),
            (this._slide._collapseAnimation = e);
        },
        get_width: function () {
          return this._options.width;
        },
        set_width: function (e) {
          this._options.width = e;
        },
        get_height: function () {
          return this._options.height;
        },
        set_height: function (e) {
          this._options.height = e;
        },
        get_maxWidth: function () {
          return this._options.maxWidth;
        },
        set_maxWidth: function (e) {
          this._options.maxWidth = e;
        },
        get_maxHeight: function () {
          return this._options.maxHeight;
        },
        set_maxHeight: function (e) {
          this._options.maxHeight = e;
        },
        get_enableScreenBoundaryDetection: function () {
          return this._options.enableScreenBoundaryDetection;
        },
        set_enableScreenBoundaryDetection: function (e) {
          this._options.enableScreenBoundaryDetection = e;
        },
        get_enableDirectionDetection: function () {
          return this._options.enableDirectionDetection;
        },
        set_enableDirectionDetection: function (e) {
          this._options.enableDirectionDetection = e;
        },
        get_offsetX: function () {
          return this._options.offsetX;
        },
        set_offsetX: function (e) {
          this._options.offsetX = e;
        },
        get_offsetY: function () {
          return this._options.offsetY;
        },
        set_offsetY: function (e) {
          this._options.offsetY = e;
        },
        _onExpandAnimationStarted: function () {
          this.trigger("expandAnimationStarted", new Sys.EventArgs());
        },
        _onExpandAnimationEnded: function () {
          this.trigger("expandAnimationEnded", new Sys.EventArgs());
        },
        _onCollapseAnimationStarted: function () {
          this.trigger("collapseAnimationStarted", new Sys.EventArgs());
        },
        _onCollapseAnimationEnded: function () {
          this.trigger("collapseAnimationEnded", new Sys.EventArgs());
        },
        show: function (e) {
          if (!this.isVisible()) {
            var t = new Sys.CancelEventArgs();
            this.trigger("opening", t),
              t.get_cancel() ||
                ((e = e || this.get_anchor()),
                this.reflow(e),
                this._slide.expand(),
                this._bindParentsScroll(),
                this._bindWindowResize(e),
                this.trigger("opened", new Sys.EventArgs()));
          }
        },
        hide: function () {
          if (this.isVisible()) {
            var e = new Sys.CancelEventArgs();
            this.trigger("closing", e),
              e.get_cancel() ||
                (this._slide.collapse(),
                this._unbindParentsScroll(),
                this._unbindWindowResize(),
                this.trigger("closed", new Sys.EventArgs()));
          }
        },
        toggle: function (e) {
          this.isVisible() ? this.hide() : this.show(e);
        },
        isVisible: function () {
          return e(this._animationContainer).is(":visible");
        },
        updateSize: function (t) {
          var i = e(t),
            n = this.get_width(),
            r = this.get_height();
          "auto" === n && (n = i.outerWidth()),
            "auto" === r && (r = i.outerHeight()),
            this._setDimensions({ width: n, height: r }),
            this._checkMaxDimensions();
        },
        resolveScreenBoundaries: function () {
          if (this.get_enableScreenBoundaryDetection()) {
            var e,
              t,
              n = this._options.enableDirectionDetection,
              r = this.get_direction(),
              s = this._getAvailableSpace(),
              a = this._getHiddenElementSize(this._animationContainer),
              o = this.get_maxWidth(),
              l = this.get_maxHeight(),
              h = {};
            switch (r) {
              case i.jSlideDirection.Up:
                a.height > s.top &&
                  (n && s.bottom > 0 && s.bottom > s.top
                    ? ((r = i.jSlideDirection.Down),
                      (t = Math.min(a.height, s.bottom)))
                    : (t = s.top));
                break;
              case i.jSlideDirection.Down:
                a.height > s.bottom &&
                  (n && s.top > 0 && s.top > s.bottom
                    ? ((r = i.jSlideDirection.Up),
                      (t = Math.min(a.height, s.top)))
                    : (t = s.bottom));
                break;
              case i.jSlideDirection.Left:
                a.width > s.left &&
                  (n && s.right > 0 && s.right > s.left
                    ? ((r = i.jSlideDirection.Right),
                      (e = Math.min(a.width, s.right)))
                    : (e = s.left));
                break;
              case i.jSlideDirection.Right:
                a.width > s.right &&
                  (n && s.left > 0 && s.left > s.right
                    ? ((r = i.jSlideDirection.Left),
                      (e = Math.min(a.width, s.left)))
                    : (e = s.right));
            }
            e && e > 0
              ? (o && (e = Math.min(e, o)), (h.width = e))
              : t && t > 0 && (l && (t = Math.min(t, l)), (h.height = t)),
              this._setDimensions(h),
              (this._slide._direction = r);
          }
        },
        position: function (t) {
          var n = e(t || this.get_anchor()),
            r = this._animationContainer,
            s = n.offset(),
            a = this._getHiddenElementSize(r),
            o = this._getHiddenElementOffsetParent(r) || document.body,
            l = e(o).offset(),
            h = s.top + this.get_offsetY(),
            d = s.left + this.get_offsetX(),
            _ = $telerik.getComputedStyle(document.body, "position", null);
          switch (this._slide._direction) {
            case i.jSlideDirection.Up:
              h -= a.height;
              break;
            case i.jSlideDirection.Down:
              h += n.outerHeight();
              break;
            case i.jSlideDirection.Left:
              d -= a.width;
              break;
            case i.jSlideDirection.Right:
              d += n.outerWidth();
          }
          (o === document.body && "relative" !== _ && "absolute" !== _) ||
            ((h -= l.top), (d -= l.left)),
            this._options.rtl && (d -= a.width - n.outerWidth()),
            e(r).css({ top: h + "px", left: d + "px" });
        },
        reflow: function (e) {
          var t = new Sys.CancelEventArgs();
          (e = e || this.get_anchor()),
            this._detachDropDown(),
            this.trigger("reflowing", t),
            t.get_cancel() ||
              (this.updateSize(e),
              this.resolveScreenBoundaries(),
              this.position(e),
              this.trigger("reflowed", new Sys.EventArgs()));
        },
        _detachDropDown: function () {
          if (!this._detached) {
            var t = e(this._element),
              i = t.parents("form").eq(0);
            i.length || (i = t.parents("body").eq(0)),
              i.prepend(this._animationContainer),
              (this._detached = !0);
          }
        },
        _setDimensions: function (i) {
          var n = e(this._animationContainer),
            r = e(this._element);
          i.width !== t && (n.width(i.width), r.outerWidth(i.width)),
            i.height !== t && (n.height(i.height), r.outerHeight(i.height));
        },
        _checkMaxDimensions: function () {
          var e,
            t = this.get_maxWidth(),
            i = this.get_maxHeight();
          (t || i) &&
            ((e = this._getHiddenElementSize(this._animationContainer)),
            t && t < e.width && this._setDimensions({ width: t }),
            i && i < e.height && this._setDimensions({ height: i }));
        },
        _bindParentsScroll: function () {
          var e = this;
          this._getScrollableParents().on("scroll" + n, function () {
            e.hide();
          });
        },
        _unbindParentsScroll: function () {
          this._getScrollableParents().off("scroll" + n);
        },
        _getScrollableParents: function () {
          return e(this.get_anchor())
            .parentsUntil("body")
            .filter(function (e, t) {
              return (
                "visible" !== $telerik.getComputedStyle(t, "overflow", null)
              );
            });
        },
        _bindWindowResize: function (t) {
          var i = this;
          e(window).on("resize" + n, function () {
            i.reflow(t);
          }),
            $telerik.isTouchDevice &&
              e(window).on("scroll" + n, function (e) {
                i.reflow(t);
              });
        },
        _unbindWindowResize: function () {
          e(window)
            .off("resize" + n)
            .off("scroll" + n);
        },
        _getAvailableSpace: function () {
          var t = e(this.get_anchor()),
            i = e(document),
            n = e(window),
            r = t.offset(),
            s = r.top + this.get_offsetY() - i.scrollTop(),
            a = n.outerHeight() - s - t.outerHeight(),
            o = r.left + this.get_offsetX() - i.scrollLeft();
          return {
            top: s,
            bottom: a,
            left: o,
            right: n.outerWidth() - o - t.outerWidth(),
          };
        },
        _getHiddenElementSize: function (e) {
          var t;
          return (
            this._withHiddenElement(e, function (i) {
              t = { width: e.offsetWidth, height: e.offsetHeight };
            }),
            t
          );
        },
        _getHiddenElementOffsetParent: function (e) {
          var t;
          return (
            this._withHiddenElement(e, function (e) {
              t = e.offsetParent;
            }),
            t
          );
        },
        _withHiddenElement: function (e, t) {
          var i = e.style.display,
            n = e.style.visibility;
          (e.style.visibility = "hidden"),
            (e.style.display = "block"),
            t(e),
            (e.style.visibility = n),
            (e.style.display = i);
        },
      }),
      i.DropDown.registerClass("Telerik.Web.UI.DropDown");
  })($telerik.$),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.EventMap = function () {
    (this._owner = null),
      (this._element = null),
      (this._eventMap = {}),
      (this._onDomEventDelegate = null),
      (this._browserHandlers = {}),
      (this._externalHandlers = {});
  }),
  (Telerik.Web.UI.EventMap.prototype = {
    initialize: function (e, t) {
      (this._owner = e),
        t || (t = this._owner.get_element()),
        (this._element = t);
    },
    skipElement: function (e, t) {
      var i = e.target;
      if (3 == i.nodeType) return !1;
      var n = i.tagName.toLowerCase(),
        r = i.className;
      return (
        "select" == n ||
        "option" == n ||
        ("a" == n && (!t || r.indexOf(t) < 0)) ||
        "input" == n ||
        "label" == n ||
        "textarea" == n ||
        "button" == n
      );
    },
    dispose: function () {
      if (this._onDomEventDelegate) {
        for (var e in this._eventMap) {
          if (this._shouldUseEventCapture(e)) {
            var t = this._browserHandlers[e];
            this._element.removeEventListener(e, t, !0);
          } else
            $telerik.removeHandler(this._element, e, this._onDomEventDelegate);
          var i = this._externalHandlers[e];
          i && $telerik.removeExternalHandler(this._element, e, i);
        }
        this._onDomEventDelegate = null;
        var n = !0;
        if (this._element._events) {
          for (var r in this._element._events)
            if (this._element._events[r].length > 0) {
              n = !1;
              break;
            }
          n && (this._element._events = null);
        }
      }
    },
    addHandlerForClassName: function (e, t, i, n) {
      var r = this;
      if (void 0 === this._eventMap[e])
        if (((this._eventMap[e] = {}), this._shouldUseEventCapture(e))) {
          var s = this._getDomEventDelegate(),
            a = this._element,
            o = function (e) {
              return s.call(a, new Sys.UI.DomEvent(e));
            };
          (this._browserHandlers[e] = o), a.addEventListener(e, o, !0);
        } else if (n) {
          var l = function (e) {
            r._onDomEvent(new Sys.UI.DomEvent(e));
          };
          $telerik.addExternalHandler(this._element, e, l),
            (this._externalHandlers[e] = l);
        } else
          $telerik.addHandler(this._element, e, this._getDomEventDelegate());
      this._eventMap[e][t] = i;
    },
    addHandlerForClassNames: function (e, t, i, n) {
      t instanceof Array || (t = t.split(/[,\s]+/g));
      for (var r = 0; r < t.length; r++)
        this.addHandlerForClassName(e, t[r], i, n);
    },
    _onDomEvent: function (e) {
      var t = this._eventMap[e.type];
      if (t)
        for (var i = e.target; i && 9 !== i.nodeType; ) {
          var n = i.className;
          if (n) {
            for (
              var r = "string" == typeof n ? n.split(" ") : [], s = null, a = 0;
              a < r.length && !(s = t[r[a]]);
              a++
            );
            if (s && (this._fillEventFields(e, i), 1 != s.call(this._owner, e)))
              return void (i.parentNode || e.stopPropagation());
            if (i == this._element) return;
            i = i.parentNode;
          } else i = i.parentNode;
        }
    },
    _fillEventFields: function (e, t) {
      if (
        ((e.eventMapTarget = t),
        e.rawEvent.relatedTarget
          ? (e.eventMapRelatedTarget = e.rawEvent.relatedTarget)
          : "mouseover" == e.type
            ? (e.eventMapRelatedTarget = e.rawEvent.fromElement)
            : (e.eventMapRelatedTarget = e.rawEvent.toElement),
        e.eventMapRelatedTarget)
      )
        try {
          e.eventMapRelatedTarget.className;
        } catch (t) {
          e.eventMapRelatedTarget = this._element;
        }
    },
    _shouldUseEventCapture: function (e) {
      return ("blur" == e || "focus" == e) && !$telerik.isIE;
    },
    _getDomEventDelegate: function () {
      return (
        this._onDomEventDelegate ||
          (this._onDomEventDelegate = Function.createDelegate(
            this,
            this._onDomEvent,
          )),
        this._onDomEventDelegate
      );
    },
  }),
  Telerik.Web.UI.EventMap.registerClass("Telerik.Web.UI.EventMap"),
  (function (e) {
    Type.registerNamespace("Telerik.Web.UI"),
      (Telerik.Web.UI.AnimationType = function () {}),
      (Telerik.Web.UI.AnimationType.toEasing = function (e) {
        return "ease" + Telerik.Web.UI.AnimationType.toString(e);
      }),
      (Telerik.Web.UI.AnimationType.prototype = {
        None: 0,
        Linear: 1,
        InQuad: 2,
        OutQuad: 3,
        InOutQuad: 4,
        InCubic: 5,
        OutCubic: 6,
        InOutCubic: 7,
        InQuart: 8,
        OutQuart: 9,
        InOutQuart: 10,
        InQuint: 11,
        OutQuint: 12,
        InOutQuint: 13,
        InSine: 14,
        OutSine: 15,
        InOutSine: 16,
        InExpo: 17,
        OutExpo: 18,
        InOutExpo: 19,
        InBack: 20,
        OutBack: 21,
        InOutBack: 22,
        InBounce: 23,
        OutBounce: 24,
        InOutBounce: 25,
        InElastic: 26,
        OutElastic: 27,
        InOutElastic: 28,
      }),
      Telerik.Web.UI.AnimationType.registerEnum("Telerik.Web.UI.AnimationType"),
      (Telerik.Web.UI.AnimationSettings = function (e) {
        (this._type = Telerik.Web.UI.AnimationType.OutQuart),
          (this._duration = 300),
          void 0 !== e.type && (this._type = e.type),
          void 0 !== e.duration && (this._duration = e.duration);
      }),
      (Telerik.Web.UI.AnimationSettings.prototype = {
        get_type: function () {
          return this._type;
        },
        set_type: function (e) {
          this._type = e;
        },
        get_duration: function () {
          return this._duration;
        },
        set_duration: function (e) {
          this._duration = e;
        },
      }),
      Telerik.Web.UI.AnimationSettings.registerClass(
        "Telerik.Web.UI.AnimationSettings",
      ),
      (Telerik.Web.UI.jSlideDirection = function () {}),
      (Telerik.Web.UI.jSlideDirection.prototype = {
        Up: 1,
        Down: 2,
        Left: 3,
        Right: 4,
      }),
      Telerik.Web.UI.jSlideDirection.registerEnum(
        "Telerik.Web.UI.jSlideDirection",
      ),
      (Telerik.Web.UI.jSlide = function (e, t, i, n) {
        (this._animatedElement = e),
          (this._element = e.parentNode),
          (this._expandAnimation = t),
          (this._collapseAnimation = i),
          (this._direction = Telerik.Web.UI.jSlideDirection.Down),
          (this._expanding = null),
          (this._enableOverlay = null == n || n),
          (this._events = null),
          (this._overlay = null),
          (this._animationEndedDelegate = null);
      }),
      (Telerik.Web.UI.jSlide.prototype = {
        initialize: function () {
          if (Telerik.Web.UI.Overlay.IsSupported() && this._enableOverlay) {
            var e = this.get_animatedElement();
            (this._overlay = new Telerik.Web.UI.Overlay(e)),
              this._overlay.initialize();
          }
          this._animationEndedDelegate = Function.createDelegate(
            this,
            this._animationEnded,
          );
        },
        dispose: function () {
          (this._animatedElement = null),
            (this._events = null),
            this._overlay && (this._overlay.dispose(), (this._overlay = null)),
            (this._animationEndedDelegate = null),
            (this._element = null),
            (this._expandAnimation = null),
            (this._collapseAnimation = null);
        },
        get_element: function () {
          return this._element;
        },
        get_animatedElement: function () {
          return this._animatedElement;
        },
        set_animatedElement: function (e) {
          (this._animatedElement = e),
            this._overlay &&
              this._overlay.set_targetElement(this._animatedElement);
        },
        get_direction: function () {
          return this._direction;
        },
        set_direction: function (e) {
          this._direction = e;
        },
        get_events: function () {
          return (
            this._events || (this._events = new Sys.EventHandlerList()),
            this._events
          );
        },
        updateSize: function () {
          var e = this.get_animatedElement(),
            t = this.get_element(),
            i = 0;
          e.style.top && (i = Math.max(parseInt(e.style.top, 10), 0));
          var n = 0;
          e.style.left && (n = Math.max(parseInt(e.style.left, 10), 0));
          var r = e.offsetHeight + i;
          t.style.height != r + "px" &&
            (t.style.height = Math.max(r, 0) + "px");
          var s = e.offsetWidth + n;
          t.style.width != s + "px" && (t.style.width = Math.max(s, 0) + "px"),
            this._overlay && this._updateOverlay();
        },
        show: function () {
          this._showElement();
        },
        expand: function () {
          (this._expanding = !0), this._resetState(!0);
          var e = null,
            t = null;
          switch (this.get_direction()) {
            case Telerik.Web.UI.jSlideDirection.Up:
            case Telerik.Web.UI.jSlideDirection.Left:
              (e = parseInt(this._getSize(), 10)), (t = 0);
              break;
            case Telerik.Web.UI.jSlideDirection.Down:
            case Telerik.Web.UI.jSlideDirection.Right:
              (e = parseInt(this._getPosition(), 10)), (t = 0);
          }
          this._expandAnimationStarted(),
            e == t ||
            this._expandAnimation.get_type() ==
              Telerik.Web.UI.AnimationType.None
              ? (this._setPosition(t),
                (this.get_animatedElement().style.visibility = "visible"),
                this._animationEnded())
              : this._playAnimation(this._expandAnimation, t);
        },
        collapse: function () {
          this._resetState(), (this._expanding = !1);
          var e = null,
            t = null,
            i = parseInt(this._getSize(), 10),
            n = parseInt(this._getPosition(), 10);
          switch (this.get_direction()) {
            case Telerik.Web.UI.jSlideDirection.Up:
            case Telerik.Web.UI.jSlideDirection.Left:
              (e = 0), (t = i);
              break;
            case Telerik.Web.UI.jSlideDirection.Down:
            case Telerik.Web.UI.jSlideDirection.Right:
              (e = 0), (t = n - i);
          }
          this._collapseAnimationStarted(),
            e == t ||
            this._collapseAnimation.get_type() ==
              Telerik.Web.UI.AnimationType.None
              ? (this._setPosition(t), this._animationEnded())
              : this._playAnimation(this._collapseAnimation, t);
        },
        add_collapseAnimationStarted: function (e) {
          this.get_events().addHandler("collapseAnimationStarted", e);
        },
        remove_collapseAnimationStarted: function (e) {
          this.get_events().removeHandler("collapseAnimationStarted", e);
        },
        add_collapseAnimationEnded: function (e) {
          this.get_events().addHandler("collapseAnimationEnded", e);
        },
        remove_collapseAnimationEnded: function (e) {
          this.get_events().removeHandler("collapseAnimationEnded", e);
        },
        add_expandAnimationStarted: function (e) {
          this.get_events().addHandler("expandAnimationStarted", e);
        },
        remove_expandAnimationStarted: function (e) {
          this.get_events().removeHandler("expandAnimationStarted", e);
        },
        add_expandAnimationEnded: function (e) {
          this.get_events().addHandler("expandAnimationEnded", e);
        },
        remove_expandAnimationEnded: function (e) {
          this.get_events().removeHandler("expandAnimationEnded", e);
        },
        _playAnimation: function (e, t) {
          this.get_animatedElement().style.visibility = "visible";
          var i = this._getAnimationQuery(),
            n = {};
          n[this._getAnimatedStyleProperty()] = t;
          var r = e.get_duration();
          $telerik.stopTransition(i, !1),
            $telerik.transition(
              i,
              n,
              r,
              Telerik.Web.UI.AnimationType.toEasing(e.get_type()),
              this._animationEndedDelegate,
            );
        },
        _stopAnimation: function () {
          $telerik.stopTransition(this._getAnimationQuery(), !1, !0);
        },
        _expandAnimationStarted: function () {
          this._raiseEvent("expandAnimationStarted", Sys.EventArgs.Empty);
        },
        _collapseAnimationStarted: function () {
          this._raiseEvent("collapseAnimationStarted", Sys.EventArgs.Empty);
        },
        _animationEnded: function () {
          this._expanding
            ? (this._element && (this._element.style.overflow = "visible"),
              this._raiseEvent("expandAnimationEnded", Sys.EventArgs.Empty))
            : (this._element && (this._element.style.display = "none"),
              this._raiseEvent("collapseAnimationEnded", Sys.EventArgs.Empty)),
            this._overlay && this._updateOverlay();
        },
        _updateOverlay: function () {
          this._overlay.updatePosition();
        },
        _showElement: function () {
          var e = this.get_animatedElement(),
            t = this.get_element();
          t &&
            t.style &&
            ((t.style.display =
              "TABLE" != t.tagName.toUpperCase() ? "block" : ""),
            (e.style.display =
              "TABLE" != e.tagName.toUpperCase() ? "block" : ""),
            (t.style.overflow = "hidden"));
        },
        _resetState: function (e) {
          if ((this._stopAnimation(), this._showElement(), e)) {
            var t = this.get_animatedElement();
            switch (this.get_direction()) {
              case Telerik.Web.UI.jSlideDirection.Up:
                t.style.top = t.offsetHeight + "px";
                break;
              case Telerik.Web.UI.jSlideDirection.Down:
                t.style.top = -t.offsetHeight + "px";
                break;
              case Telerik.Web.UI.jSlideDirection.Left:
                t.style.left = t.offsetWidth + "px";
                break;
              case Telerik.Web.UI.jSlideDirection.Right:
                t.style.left = -t.offsetWidth + "px";
                break;
              default:
                Error.argumentOutOfRange(
                  "direction",
                  this.get_direction(),
                  "Slide direction is invalid. Use one of the values in the Telerik.Web.UI.SlideDirection enumeration.",
                );
            }
          }
        },
        _getAnimationQuery: function () {
          var t = [this.get_animatedElement()];
          return (
            this._enableOverlay &&
              this._overlay &&
              (t[t.length] = this._overlay.get_element()),
            e(t)
          );
        },
        _getSize: function () {
          var e = this.get_animatedElement();
          switch (this.get_direction()) {
            case Telerik.Web.UI.jSlideDirection.Up:
            case Telerik.Web.UI.jSlideDirection.Down:
              return e.offsetHeight;
            case Telerik.Web.UI.jSlideDirection.Left:
            case Telerik.Web.UI.jSlideDirection.Right:
              return e.offsetWidth;
            default:
              return 0;
          }
        },
        _setPosition: function (e) {
          var t = this.get_animatedElement(),
            i = this._getAnimatedStyleProperty();
          t.style[i] = e;
        },
        _getPosition: function () {
          var e = this.get_animatedElement(),
            t = this._getAnimatedStyleProperty();
          return e.style[t] || 0;
        },
        _getAnimatedStyleProperty: function () {
          switch (this.get_direction()) {
            case Telerik.Web.UI.jSlideDirection.Up:
            case Telerik.Web.UI.jSlideDirection.Down:
              return "top";
            case Telerik.Web.UI.jSlideDirection.Left:
            case Telerik.Web.UI.jSlideDirection.Right:
              return "left";
          }
        },
        _raiseEvent: function (e, t) {
          var i = this.get_events().getHandler(e);
          i && (t || (t = Sys.EventArgs.Empty), i(this, t));
        },
      }),
      Telerik.Web.UI.jSlide.registerClass(
        "Telerik.Web.UI.jSlide",
        null,
        Sys.IDisposable,
      );
  })($telerik.$),
  (function (e) {
    e.TemplateRenderer = {
      renderTemplate: function (t, i, n) {
        var r,
          s = this._getTemplateFunction(i, n);
        if (!s) return null;
        try {
          r = s(t);
        } catch (e) {
          throw Error.invalidOperation(
            String.format("Error rendering template: {0}", e.message),
          );
        }
        if (i && i.raiseEvent) {
          var a = new e.RadTemplateBoundEventArgs(t, s, r);
          i.raiseEvent("templateDataBound", a), (r = a.get_html());
        }
        return r;
      },
      _getTemplateFunction: function (t, i) {
        var n, r;
        if (
          (i && i.get_clientTemplate && (n = i.get_clientTemplate()),
          !n && t && (n = t.get_clientTemplate()),
          !n)
        )
          return null;
        if (t) {
          t._templateCache || (t._templateCache = {});
          var s = t._templateCache[n];
          if (s) return s;
        }
        try {
          r = e.Template.compile(n);
        } catch (e) {
          throw Error.invalidOperation(
            String.format("Error creating template: {0}", e.message),
          );
        }
        return t && (t._templateCache[n] = r), r;
      },
    };
  })(Telerik.Web.UI);
