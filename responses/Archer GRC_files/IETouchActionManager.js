!(function (e) {
  Type.registerNamespace("Telerik.Web.UI"),
    Type.registerNamespace("Telerik.Web.UI.Helpers");
  var t = Telerik.Web.UI.Helpers;
  (t.IETouchActionManager = function (t) {
    (this.element = t),
      (this.hasPointers = "PointerEvent" in e || "MSPointerEvent" in e);
  }),
    (t.IETouchActionManager.prototype = {
      allowUserTouch: function () {
        if (this.isPointerEnabled()) {
          var e = this.getStyle();
          (this.touchActionProp =
            "touchAction" in e ? "touchAction" : "msTouchAction"),
            (this.cachedTouchAction = e[this.touchActionProp]),
            (e[this.touchActionProp] = "none");
        }
      },
      restore: function () {
        this.isPointerEnabled() &&
          (this.getStyle()[this.touchActionProp] = this.cachedTouchAction);
      },
      getStyle: function () {
        return this.element ? this.element.style : {};
      },
      isPointerEnabled: function () {
        return this.hasPointers;
      },
      dispose: function () {
        this.restore(), delete this.element;
      },
    }),
    t.IETouchActionManager.registerClass(
      "Telerik.Web.UI.Helpers.IETouchActionManager",
    );
})(window);
