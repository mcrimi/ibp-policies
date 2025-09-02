Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.Overlay = function (e) {
    (this._targetElement = e), (this._element = null);
  }),
  (Telerik.Web.UI.Overlay.IsSupported = function () {
    return $telerik.isIE;
  }),
  (Telerik.Web.UI.Overlay.prototype = {
    initialize: function () {
      var e = document.createElement("div");
      (e.innerHTML =
        "<iframe>Your browser does not support inline frames or is currently configured not to display inline frames.</iframe>"),
        (this._element = e.firstChild),
        (this._element.src = "about:blank"),
        this._targetElement.parentNode.insertBefore(
          this._element,
          this._targetElement,
        ),
        this._targetElement.style.zIndex > 0 &&
          (this._element.style.zIndex = this._targetElement.style.zIndex - 1),
        (this._element.style.position = "absolute"),
        (this._element.style.border = "0px"),
        (this._element.frameBorder = 0),
        (this._element.style.filter =
          "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"),
        (this._element.tabIndex = -1),
        $telerik.isSafari || $telerik.isIE10Mode || (e.outerHTML = null),
        this.updatePosition();
    },
    dispose: function () {
      this._element.parentNode &&
        this._element.parentNode.removeChild(this._element),
        (this._targetElement = null),
        (this._element = null);
    },
    get_targetElement: function () {
      return this._targetElement;
    },
    set_targetElement: function (e) {
      this._targetElement = e;
    },
    get_element: function () {
      return this._element;
    },
    updatePosition: function () {
      (this._element.style.top = this._toUnit(this._targetElement.style.top)),
        (this._element.style.left = this._toUnit(
          this._targetElement.style.left,
        )),
        (this._element.style.width = this._targetElement.offsetWidth + "px"),
        (this._element.style.height = this._targetElement.offsetHeight + "px");
    },
    _toUnit: function (e) {
      return e ? parseInt(e, 10) + "px" : "0px";
    },
  }),
  Telerik.Web.UI.Overlay.registerClass(
    "Telerik.Web.UI.Overlay",
    null,
    Sys.IDisposable,
  );
