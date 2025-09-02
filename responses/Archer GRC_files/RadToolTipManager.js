Type.registerNamespace("Telerik.Web.UI"),
  ($telerik.toToolTipManager = function (e) {
    return e;
  }),
  ($telerik.findToolTipManager = $find),
  (Telerik.Web.UI.RadToolTipManager = function (e) {
    Telerik.Web.UI.RadToolTipManager.initializeBase(this, [e]),
      (this._targetControls = null),
      (this._isToolTipFactory = !1),
      (this._loadOnDemand = !1),
      (this._toolTipZoneID = null),
      (this._autoTooltipify = !1),
      (this._updatePanelUniqueId = ""),
      (this._enableDataCaching = !1),
      (this._updatePanelParent = null),
      (this._tooltips = []),
      (this._idCounter = 100),
      (this._webServiceSettings = null),
      (this._cssClass = null);
  }),
  (Telerik.Web.UI.RadToolTipManager.prototype = {
    initialize: function (e) {
      this.applyElementZIndex();
      var t = this.get_updatePanel();
      t && (this._updatePanelParent = t.parentNode);
      var i = this.get_visibleOnPageLoad();
      this.set_visibleOnPageLoad(!1);
      var n = this.get_toolTipZoneID();
      this.tooltipify(n ? $get(n) : document, n ? this._isDescendant : null),
        i && this._tooltips[0] && this._tooltips[0].show(),
        window.setTimeout(
          Function.createDelegate(this, function () {
            this._trackPageUpdates();
          }),
          0,
        );
    },
    get_updatePanel: function () {
      //! TEMP
      return $get(this._getUpdatePanelID());
    },
    dispose: function () {
      (this._moveUpdatePanel(),
      this._disposeToolTips(),
      this._pageLoadedHandler) &&
        (Sys.WebForms.PageRequestManager.getInstance().remove_pageLoaded(
          this._pageLoadedHandler,
        ),
        (this._pageLoadedHandler = null));
      (this._updatePanelParent = null),
        Telerik.Web.UI.RadToolTipManager.callBaseMethod(this, "dispose");
    },
    _disposeToolTips: function () {
      for (var e = 0; e < this._tooltips.length; e++) {
        this._tooltips[e].dispose();
      }
      this._tooltips = null;
    },
    _isDescendant: function (e, t) {
      return $telerik.isDescendant(e, t);
    },
    _trackPageUpdates: function () {
      Sys.WebForms &&
        ((this._pageLoadedHandler = Function.createDelegate(
          this,
          function (e, t) {
            var i = t.get_panelsUpdated();
            if (i)
              for (var n = 0; n < i.length; n++)
                i[n].id != this._getUpdatePanelID() &&
                  this.tooltipify(i[n], this._isDescendant);
          },
        )),
        Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(
          this._pageLoadedHandler,
        ));
    },
    get_toolTips: function () {
      return this._tooltips;
    },
    get_tooltips: function () {
      return this.get_toolTips();
    },
    getToolTipByElement: function (e) {
      if (!e) return null;
      var t = this.get_tooltips();
      try {
        for (var i = 0; i < t.length; i++)
          if (t[i].get_targetControl() == e) return t[i];
      } catch (e) {}
      return null;
    },
    clearCloneCache: function () {
      this.__clonedProperties__ = null;
    },
    createToolTip: function (e, t, i) {
      if (e) {
        var n = this.clone(this._getUniqueToolTipID());
        (n._manualCloseButtonText = this._manualCloseButtonText),
          n.set_modal(n.isModal()),
          (n._cssClass = this._cssClass);
        var r = e.getAttribute("id");
        return (
          r ? n.set_targetControlID(r) : n.set_targetControl(e),
          (this._tooltips[this._tooltips.length] = n),
          t && t != e.getAttribute("id") && n.set_serverTargetControlID(t),
          i && n.set_serverValue(i),
          this._loadOnDemand
            ? this._initializeAjaxToolTip(n)
            : this._webServiceSettings && this._initializeWebServiceToolTip(n),
          this.get_element().appendChild(n.get_element()),
          n
        );
      }
      alert("clone error: No target element specified");
    },
    tooltipify: function (e, t) {
      e || (e = document),
        t ||
          (t = function (e, t) {
            return !0;
          });
      var i,
        n,
        r,
        a = this.get_targetControls();
      if (a && a.length > 0)
        for (i = a.length, n = 0; n < i; n++) {
          var o = a[n];
          (r = $get(o[0])) && t(e, r) && this.createToolTip(r, o[1], o[2]);
        }
      else {
        if (!this.get_autoTooltipify()) return;
        for (i = (a = e.getElementsByTagName("*")).length, n = 0; n < i; n++) {
          var s = (r = a[n]).getAttribute("title"),
            l = r.getAttribute("alt");
          (s || l) && this.createToolTip(r);
        }
      }
    },
    _initializeWebServiceLoader: function () {
      (this._webServiceLoader = new Telerik.Web.UI.WebServiceLoader(
        this.get_webServiceSettings(),
      )),
        this._webServiceLoader.add_loadingError(
          Function.createDelegate(this, this._onWebServiceError),
        ),
        this._webServiceLoader.add_loadingSuccess(
          Function.createDelegate(this, this._onWebServiceResponse),
        );
    },
    _onWebServiceError: function (e, t) {
      this._onError(t.get_message());
    },
    _onWebServiceResponse: function (e, t) {
      var i = t.get_data(),
        n = document.createElement("div"),
        r = this._currentServicedToolTip;
      r &&
        (r.set_contentElement(n),
        (n.innerHTML = i),
        r._reSetPositionWithoutFlicker()),
        this.raiseEvent("requestEnd");
    },
    _initializeWebServiceToolTip: function (e) {
      e.add_beforeShow(
        Function.createDelegate(this, function (t, i) {
          if (
            !(
              t !== e ||
              (this.get_enableDataCaching() && e.get_contentElement())
            )
          ) {
            var n = this._webServiceLoader;
            n ||
              (this._initializeWebServiceLoader(),
              (n = this._webServiceLoader));
            var r = {
              TargetControlID: e.get_targetControlID(),
              Value: e.get_serverValue(),
            };
            this._currentServicedToolTip = t;
            var a = new Sys.CancelEventArgs();
            if ((this.raiseEvent("requestStart", a), !a.get_cancel())) {
              var o = { context: r };
              this.get_webServiceSettings().get_isWcf() &&
                (o.context = n._serializeDictionaryAsKeyValuePairs(o.context)),
                n.loadData(o),
                t.set_content(""),
                t.showLoadingMessage(!0);
            }
          }
        }),
      );
    },
    _initializeAjaxToolTip: function (e) {
      e.add_beforeShow(
        Function.createDelegate(this, function (t, i) {
          if (t === e) {
            var n = t.get_contentElement();
            if (this.get_enableDataCaching() && n)
              return (
                (n.innerHTML = t._cachedContent), void t.set_contentElement(n)
              );
            this._doLoadOnDemand(t);
          }
        }),
      ),
        e.add_hide(
          Function.createDelegate(this, function (t, i) {
            var n = this.get_updatePanel(),
              r = t.get_popupElement();
            this.get_enableDataCaching() &&
              t.get_id() == e.get_id() &&
              (e._cachedContent = n.innerHTML),
              $telerik.isDescendant(r, n) && this._moveUpdatePanel();
          }),
        );
    },
    _doLoadOnDemand: function (e) {
      var t = new Sys.CancelEventArgs();
      if ((this.raiseEvent("requestStart", t), !t.get_cancel())) {
        var i = this._getDefaultParent(),
          n = this._moveUpdatePanel(i, !0);
        e.showLoadingMessage(!0);
        var r = Sys.WebForms.PageRequestManager.getInstance();
        this._requestStarted && r.abortPostBack();
        var a = Function.createDelegate(this, function (e, t) {
          (this._requestStarted = !0), r.remove_beginRequest(a);
        });
        r.add_beginRequest(a);
        var o = Function.createDelegate(this, function (t, i) {
          if (
            ((this._requestStarted = !1),
            r.remove_endRequest(o),
            !i.get_response().get_aborted())
          ) {
            if (
              ((e._cachedContent && this.get_enableDataCaching()) ||
                ((e._cachedContent = n.innerHTML), e.set_contentElement(n)),
              i.get_error())
            )
              return (
                i.set_errorHandled(!0),
                void this._onError(i.get_error().message)
              );
            e._reSetPositionWithoutFlicker(), this.raiseEvent("requestEnd");
          }
        });
        r.add_endRequest(o);
        var s = e.get_serverTargetControlID();
        s || (s = e.get_targetControlID()),
          (this._ajaxControlID = s),
          (this._ajaxValue = e.get_serverValue()),
          this.updateClientState(),
          __doPostBack(this._updatePanelUniqueId),
          (this._ajaxControlID = null),
          (this._ajaxValue = null);
      }
    },
    _onError: function (e) {
      e || (e = "No error data available");
      var t = new Telerik.Web.UI.ToolTipManagerErrorEventArgs(e);
      this.raiseEvent("responseError", t),
        t.get_cancelErrorAlert() ||
          alert("RadToolTipManager response error:\n Exception=" + e);
    },
    saveClientState: function () {
      var e = {
        AjaxTargetControl: this._ajaxControlID,
        Value: this._ajaxValue,
      };
      return Sys.Serialization.JavaScriptSerializer.serialize(e);
    },
    _getUpdatePanelID: function () {
      return this.get_id() + "RTMPanel";
    },
    _getUniqueToolTipID: function () {
      return (
        this._idCounter++, this.get_id() + this._idCounter + (new Date() - 100)
      );
    },
    _moveUpdatePanel: function (e, t) {
      if ((e || (e = this._updatePanelParent), e && e.appendChild)) {
        var i = this.get_updatePanel();
        return i && (0 != t && (i.style.display = "none"), e.appendChild(i)), i;
      }
    },
    set_modal: function (e) {
      this._modal != e && (this._modal = e);
    },
    get_webServiceLoader: function () {
      return this._webServiceLoader;
    },
    get_webServiceSettings: function () {
      return this._webServiceSettings;
    },
    set_webServiceSettings: function (e) {
      var t = Sys.Serialization.JavaScriptSerializer.deserialize(e);
      this._webServiceSettings = new Telerik.Web.UI.WebServiceSettings(t);
    },
    get_autoTooltipify: function () {
      return this._autoTooltipify;
    },
    set_autoTooltipify: function (e) {
      this._autoTooltipify != e && (this._autoTooltipify = e);
    },
    get_enableDataCaching: function () {
      return this._enableDataCaching;
    },
    set_enableDataCaching: function (e) {
      this._enableDataCaching != e && (this._enableDataCaching = e);
    },
    get_toolTipZoneID: function () {
      return this._toolTipZoneID;
    },
    set_toolTipZoneID: function (e) {
      this._toolTipZoneID != e && (this._toolTipZoneID = e);
    },
    get_isToolTipFactory: function () {
      return this._isToolTipFactory;
    },
    set_isToolTipFactory: function (e) {
      this._isToolTipFactory != e && (this._isToolTipFactory = e);
    },
    get_loadOnDemand: function () {
      return this._loadOnDemand;
    },
    set_loadOnDemand: function (e) {
      this._loadOnDemand != e && (this._loadOnDemand = e);
    },
    get_targetControls: function () {
      return this._targetControls;
    },
    set_targetControls: function (value) {
      this._targetControls = value ? eval(value) : [];
    },
    add_requestStart: function (e) {
      this.get_events().addHandler("requestStart", e);
    },
    remove_requestStart: function (e) {
      this.get_events().removeHandler("requestStart", e);
    },
    add_requestEnd: function (e) {
      this.get_events().addHandler("requestEnd", e);
    },
    remove_requestEnd: function (e) {
      this.get_events().removeHandler("requestEnd", e);
    },
    add_responseError: function (e) {
      this.get_events().addHandler("responseError", e);
    },
    remove_responseError: function (e) {
      this.get_events().removeHandler("responseError", e);
    },
  }),
  Telerik.Web.UI.RadToolTipManager.registerClass(
    "Telerik.Web.UI.RadToolTipManager",
    Telerik.Web.UI.RadToolTip,
  );
var createRadEventArgs = function (e, t) {
  var i = Telerik.Web.UI;
  (i[e] = function () {
    var t = Array.prototype.slice.call(arguments);
    i[e].initializeBase(this, t);
  }),
    i[e].registerClass("Telerik.Web.UI." + e, t);
};
(Telerik.Web.UI.ToolTipManagerErrorEventArgs = function (e) {
  Telerik.Web.UI.ToolTipManagerErrorEventArgs.initializeBase(this),
    (this._cancelErrorAlert = !1),
    (this._errorMessage = e);
}),
  (Telerik.Web.UI.ToolTipManagerErrorEventArgs.prototype = {
    get_errorMessage: function () {
      return this._errorMessage;
    },
    get_cancelErrorAlert: function () {
      return this._cancelErrorAlert;
    },
    set_cancelErrorAlert: function (e) {
      this._cancelErrorAlert = e;
    },
  }),
  Telerik.Web.UI.ToolTipManagerErrorEventArgs.registerClass(
    "Telerik.Web.UI.ToolTipManagerErrorEventArgs",
    Sys.EventArgs,
  ),
  createRadEventArgs(
    "RadToolTipManagerErrorEventArgs",
    Telerik.Web.UI.ToolTipManagerErrorEventArgs,
  );
