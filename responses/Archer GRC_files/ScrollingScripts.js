Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.ScrollerOrientation = function () {}),
  (Telerik.Web.UI.ScrollerOrientation.prototype = {
    Vertical: 0,
    Horizontal: 1,
  }),
  Telerik.Web.UI.ScrollerOrientation.registerEnum(
    "Telerik.Web.UI.ScrollerOrientation",
  ),
  (Telerik.Web.UI.ScrollerSpeed = function () {}),
  (Telerik.Web.UI.ScrollerSpeed.prototype = {
    Invalid: 0,
    Slow: 1,
    Medium: 2,
    Fast: 3,
    MousewheelDefault: 12,
  }),
  Telerik.Web.UI.ScrollerSpeed.registerEnum("Telerik.Web.UI.ScrollerSpeed"),
  (Telerik.Web.UI.ArrowPosition = function () {}),
  (Telerik.Web.UI.ArrowPosition.prototype = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3,
  }),
  Telerik.Web.UI.ArrowPosition.registerEnum("Telerik.Web.UI.ArrowPosition"),
  (Telerik.Web.UI.Scroller = function (e, t, i) {
    (this._timerInterval = 10),
      (this._scrolledElement = e),
      (this._element = t),
      (this._orientation = i),
      (this._minPosition = 0),
      (this._maxPosition = null),
      (this._currentPosition = 0),
      (this._speed = Telerik.Web.UI.ScrollerSpeed.Invalid),
      (this._direction = 0),
      (this._events = null),
      (this._timer = null),
      (this._onTickDelegate = null);
  }),
  (Telerik.Web.UI.Scroller.prototype = {
    initialize: function () {
      (this._onTickDelegate = Function.createDelegate(this, this._onTick)),
        (this._timer = new Telerik.Web.Timer()),
        this._timer.set_interval(this._timerInterval),
        this._timer.add_tick(this._onTickDelegate);
    },
    dispose: function () {
      this._timer && this._timer.dispose(),
        (this._onTickDelegate = null),
        (this._events = null);
    },
    get_element: function () {
      return this._element;
    },
    get_events: function () {
      return (
        this._events || (this._events = new Sys.EventHandlerList()),
        this._events
      );
    },
    add_positionChanged: function (e) {
      this.get_events().addHandler("positionChanged", e);
    },
    remove_positionChanged: function (e) {
      this.get_events().removeHandler("positionChanged", e);
    },
    setScrollingLimits: function (e, t) {
      (this._minPosition = e),
        (this._maxPosition = Math.min(this._getElementSize(), t));
    },
    isAtMinPosition: function () {
      return this._currentPosition <= this._minPosition;
    },
    isAtMaxPosition: function () {
      return this._currentPosition >= this._maxPosition;
    },
    resetState: function () {
      this._resetOverflowStyle(), this._scrollTo(0);
    },
    startScroll: function (e, t) {
      (this._speed = e), (this._direction = t), this._timer.set_enabled(!0);
    },
    changeScrollSpeed: function (e) {
      this._speed = e;
    },
    stopScroll: function () {
      (this._speed = Telerik.Web.UI.ScrollerSpeed.Invalid),
        (this._direction = 0),
        this._timer.set_enabled(!1);
    },
    scrollToMaxPosition: function () {
      this._scrollTo(this._maxPosition);
    },
    _onTick: function () {
      var e = this._currentPosition + this._direction * this._speed;
      (e = Math.max(e, this._minPosition)),
        (e = Math.min(e, this._maxPosition)),
        this._scrollTo(e),
        (e != this._minPosition && e != this._maxPosition) || this.stopScroll();
    },
    _scrollTo: function (e) {
      var t = "left";
      this._orientation == Telerik.Web.UI.ScrollerOrientation.Vertical &&
        (t = "top"),
        (this._currentPosition = e),
        (this._scrolledElement.style[t] = -e + "px"),
        this._raiseEvent("positionChanged", Sys.EventArgs.Empty);
    },
    _resetOverflowStyle: function () {
      $telerik.isIE
        ? ((this._element.style.overflow = "visible"),
          this._orientation == Telerik.Web.UI.ItemFlow.Vertical
            ? ((this._element.style.overflowX = "visible"),
              (this._element.style.overflowY = "hidden"))
            : ((this._element.style.overflowX = "hidden"),
              (this._element.style.overflowY = "hidden")))
        : (this._element.style.overflow = "hidden");
    },
    _getElementSize: function () {
      return this._orientation == Telerik.Web.UI.ScrollerOrientation.Vertical
        ? this._scrolledElement.offsetHeight
        : this._scrolledElement.offsetWidth;
    },
    _raiseEvent: function (e, t) {
      var i = this.get_events().getHandler(e);
      i && (t || (t = Sys.EventArgs.Empty), i(this, t));
    },
  }),
  Telerik.Web.UI.Scroller.registerClass(
    "Telerik.Web.UI.Scroller",
    null,
    Sys.IDisposable,
  );
