Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridColumn = function (e) {
    if (
      (Telerik.Web.UI.GridColumn.initializeBase(this, [e]),
      (this._owner = {}),
      (this._data = {}),
      this._selected,
      (this._selectedCellsCount = 0),
      (this._resizeTolerance = $telerik.isTouchDevice ? 10 : 5),
      (this._onMouseUpDelegate = null),
      (this._columnResizer = null),
      (this._checkboxes = []),
      (this._onContextMenuItemClickingDelegate = null),
      (this._onContextMenuHiddenDelegate = null),
      (this._supportedStringAggregatesValues = {
        "System.String": { Count: !0, CountDistinct: !0, None: !0, Custom: !0 },
        "System.DateTime": {
          None: !0,
          Min: !0,
          Max: !0,
          Last: !0,
          First: !0,
          Count: !0,
          CountDistinct: !0,
          Custom: !0,
        },
      }),
      (this._supportedColumnTypesForAggregation = [
        "GridDateTimeColumn",
        "GridBoundColumn",
        "GridTemplateColumn",
        "GridMaskedColumn",
        "GridNumericColumn",
        "GridCalculatedColumn",
      ]),
      (this._oldTitle = null),
      Sys.UI.DomElement.containsCssClass(e, "rgRotateHeader") &&
        0 == e.children.length)
    ) {
      var t = document.createElement("span");
      (t.innerHTML = e.innerHTML), (e.innerHTML = ""), e.appendChild(t);
    }
  }),
  (Telerik.Web.UI.GridColumn.prototype = {
    initialize: function () {
      Telerik.Web.UI.GridColumn.callBaseMethod(this, "initialize"),
        (this._onMouseDownDelegate = $telerik.addMobileHandler(
          this,
          this.get_element(),
          "mousedown",
          this._onMouseDownHandler,
        )),
        (this.get_element().UniqueName = this.get_uniqueName()),
        (this._onLocalMouseMoveDelegate = $telerik.addMobileHandler(
          this,
          this.get_element(),
          "mousemove",
          this._onLocalMouseMoveHandler,
        )),
        $telerik.isTouchDevice ||
          (window.$addHandlers(this.get_element(), {
            click: Function.createDelegate(this, this._onClick),
          }),
          window.$addHandlers(this.get_element(), {
            dblclick: Function.createDelegate(this, this._onDblClick),
          }),
          window.$addHandlers(this.get_element(), {
            mouseover: Function.createDelegate(this, this._onMouseOver),
          }),
          window.$addHandlers(this.get_element(), {
            mouseout: Function.createDelegate(this, this._onMouseOut),
          }));
      var e = this._owner._owner,
        t = e.ClientSettings;
      $telerik.isMobileIE10 &&
        (t.AllowColumnsReorder ||
          (t.Resizing && t.Resizing.AllowColumnResize)) &&
        ((this.get_element().style.msTouchAction = "none"),
        (this.get_element().style.touchAction = "none")),
        $telerik.isOpera
          ? window.$addHandlers(this.get_element(), {
              mousedown: Function.createDelegate(this, this._onContextMenu),
            })
          : window.$addHandlers(this.get_element(), {
              contextmenu: Function.createDelegate(this, this._onContextMenu),
            }),
        Telerik.Web.Browser.ie &&
          window.$addHandlers(this.get_element(), {
            keydown: Function.createDelegate(this, this._onIEKeyDown),
          }),
        (this._selectedCellsCount = this._data.SelectedCellsCount),
        (this.Display = this._data.Display),
        (this._enableHeaderContextMenu = this._data.EnableHeaderContextMenu),
        (this._oldTitle = this.get_element().title),
        this._data.ListOfFilterValues &&
          this._data.ListOfFilterValues.length > 0 &&
          ((e._checkListFilterKeys[e._checkListFilterKeys.length] =
            this.get_owner()._data.UniqueID + "," + this.get_uniqueName()),
          (e._checkListFilterValues[e._checkListFilterValues.length] =
            this._data.ListOfFilterValues)),
        this._initializeBindingMethods();
    },
    _onIEKeyDown: function (e) {
      if (
        "A" == e.target.tagName &&
        e.target.parentElement.className.indexOf("rgHeader") >= 0 &&
        e.shiftKey &&
        121 == e.keyCode
      ) {
        e.preventDefault();
        var t = e.target.getBoundingClientRect();
        (e.clientX = t.left + 0.5 * t.width),
          (e.clientY = t.top + 0.5 * t.height),
          this._onContextMenu(e);
      }
    },
    dispose: function () {
      this._columnResizer && this._columnResizer.dispose(),
        this._owner._owner.raise_columnDestroying(Sys.EventArgs.Empty),
        window.$clearHandlers(this.get_element()),
        (this._checkboxes = []),
        (this._element.control = null),
        (this._owner = null),
        Telerik.Web.UI.GridColumn.callBaseMethod(this, "dispose");
    },
    get_owner: function () {
      return this._owner;
    },
    get_selected: function () {
      var e = !1;
      return (
        this._owner._owner.get_allowColumnSelection() &&
          this._selectedCellsCount > 0 &&
          this._selectedCellsCount ==
            this.get_realOwner().get_dataItems().length &&
          (e = !0),
        e
      );
    },
    set_selected: function (e) {
      this._owner._owner.get_allowColumnSelection() &&
        (e
          ? (this._owner._owner.get_allowMultiColumnSelection() ||
              this.get_realOwner().clearSelectedColumns(),
            this._owner._owner._cellSelection._selectColumnByHeaderElement(
              this.get_realOwner(),
              this.get_element(),
            ),
            (this._selectedCellsCount = this._owner.get_dataItems().length))
          : (this._owner._owner._cellSelection._deselectColumnByHeaderElement(
              this.get_realOwner(),
              this.get_element(),
            ),
            (this._selectedCellsCount = 0)));
    },
    get_realOwner: function () {
      return this._owner.get_id() ==
        this._owner._owner.get_masterTableView().get_id() + "_Header"
        ? this._owner._owner.get_masterTableView()
        : $find(this._owner.get_id());
    },
    get_selectedCellsCount: function () {
      return this._selectedCellsCount;
    },
    set_selectedCellsCount: function (e) {
      this._selectedCellsCount = e;
    },
    _initializeBindingMethods: function () {
      var e,
        t =
          Telerik.Web.UI.Grid[this._data.ColumnType] ||
          Telerik.Web.UI.Grid.GridBoundColumn,
        i = function () {};
      if (t) {
        for (e in t) this[e] = t[e];
        (this.initializeCell = this.initializeCell || i),
          (this.populateCell = this.populateCell || i),
          (this.populateEditCell = this.populateEditCell || i);
      }
    },
    _onMouseDownHandler: function (e) {
      if (
        (e.button != Sys.UI.MouseButton.leftButton ||
          Telerik.Web.UI.Grid._moveHeaderDiv) &&
        !$telerik.isTouchDevice
      )
        return !1;
      var t = this.get_owner().get_owner(),
        i = t._animation && t._animation.ColumnAnimation,
        r =
          $telerik.isTouchDevice &&
          this._isTouchPointOverResizeHandle(e) &&
          this._owner._owner.ClientSettings &&
          this._owner._owner.ClientSettings.Resizing.AllowColumnResize &&
          this.get_resizable();
      if (
        (i ||
          this._onMouseUpDelegate ||
          (this._onMouseUpDelegate = $telerik.addMobileHandler(
            this,
            document,
            "mouseup",
            this._onMouseUpHandler,
            null,
            !0,
          )),
        $telerik.isTouchDevice &&
          ((this._canDragDrop = !0), r && (this._canResize = !0)),
        t.ClientSettings.AllowDragToGroup ||
          t.ClientSettings.AllowColumnsReorder)
      ) {
        var n = t._getHeaderContextMenu();
        n && n._shown && n.hide(),
          (t.ClientSettings.AllowColumnsReorder &&
            i &&
            t.ClientSettings.Animation.AllowColumnReorderAnimation &&
            1 === t.ClientSettings.ColumnsReorderMethod) ||
            this._onMouseMoveDelegate ||
            (this._onMouseMoveDelegate = $telerik.addMobileHandler(
              this,
              document,
              "mousemove",
              this._onMouseMoveHandler,
              null,
              !0,
            )),
          this._canDragDrop &&
            !r &&
            ((this._data.Reorderable && t.ClientSettings.AllowColumnsReorder) ||
              (this._data.Groupable && t.ClientSettings.AllowDragToGroup)) &&
            (i
              ? t._animation.ColumnAnimation._mouseDown(e, this)
              : Telerik.Web.UI.Grid.CreateDragDrop(e, this, !0));
      }
      this._canResize &&
        (0 == e.button || $telerik.isTouchDevice) &&
        (this._isMouseOverResizeHandle(e) &&
          ((this._columnResizer = new Telerik.Web.UI.GridColumnResizer(
            this,
            t.ClientSettings.Resizing.EnableRealTimeResize,
            t.ClientSettings.Resizing.ResizeGridOnColumnResize,
          )),
          this._columnResizer._position(e),
          (this._owner._owner._isResize = !0)),
        Telerik.Web.UI.Grid.ClearDocumentEvents());
    },
    _onMouseUpHandler: function (e) {
      if (
        (this._onMouseUpDelegate &&
          ($telerik.removeMobileHandler(
            document,
            "mouseup",
            this._onMouseUpDelegate,
            null,
            !0,
          ),
          (this._onMouseUpDelegate = null)),
        this._onMouseMoveDelegate &&
          ($telerik.removeMobileHandler(
            document,
            "mousemove",
            this._onMouseMoveDelegate,
            null,
            !0,
          ),
          (this._onMouseMoveDelegate = null)),
        Telerik.Web.UI.Grid)
      ) {
        var currentElement;
        currentElement = $telerik.isTouchDevice
          ? $telerik.getTouchTarget(e)
          : Telerik.Web.UI.Grid.GetCurrentElement(e);
        var preventRevertAnimation = !1,
          owner = this._owner;
        if (
          null != currentElement &&
          this._canDragDrop &&
          !owner._owner._isResize
        ) {
          var postBackFunction = owner._owner.ClientSettings.PostBackFunction;
          if (
            ((postBackFunction = postBackFunction.replace(
              "{0}",
              owner._owner.UniqueID,
            )),
            owner._owner.ClientSettings.AllowDragToGroup &&
              owner._owner._groupPanel)
          ) {
            var isOverGroupPanel = !1;
            if (
              ($telerik.isMouseOverElement(
                owner._owner._groupPanel.get_element(),
                e,
              ) && (isOverGroupPanel = !0),
              (Telerik.Web.UI.Grid.IsChildOf(
                currentElement,
                owner._owner._groupPanel.get_element(),
              ) ||
                ($telerik.isTouchDevice &&
                  currentElement == owner._owner._groupPanel.get_element()) ||
                isOverGroupPanel) &&
                this._data.Groupable)
            ) {
              preventRevertAnimation = !0;
              var isClientDataSourceBinding =
                !!owner._owner._clientDataSourceID;
              owner.groupColumn(
                isClientDataSourceBinding
                  ? this.get_dataField()
                  : this.get_element().UniqueName,
              );
            }
          }
          if (
            owner._owner.ClientSettings.AllowColumnsReorder &&
            Telerik.Web.UI.Grid.IsChildOf(
              currentElement,
              this.get_element().parentNode,
            ) &&
            currentElement != this.get_element()
          ) {
            for (
              var headerCell = currentElement.parentNode;
              null != headerCell && void 0 === headerCell.UniqueName;

            )
              headerCell = headerCell.parentNode;
            if (
              (null != headerCell &&
                void 0 !== headerCell.UniqueName &&
                headerCell.UniqueName != this.get_uniqueName() &&
                (currentElement = headerCell),
              void 0 !== currentElement.UniqueName &&
                this._canDropOnThisColumn(currentElement.UniqueName) &&
                this.get_reorderable())
            )
              if (owner._owner.ClientSettings.ReorderColumnsOnClient)
                1 == owner._owner.ClientSettings.ColumnsReorderMethod
                  ? owner.reorderColumns(
                      this.get_element().UniqueName,
                      currentElement.UniqueName,
                    )
                  : owner.swapColumns(
                      this.get_element().UniqueName,
                      currentElement.UniqueName,
                    ),
                  (preventRevertAnimation = !0);
              else {
                var column1 = owner.getColumnByUniqueName(
                    this.get_element().UniqueName,
                  ),
                  column2 = owner.getColumnByUniqueName(
                    currentElement.UniqueName,
                  ),
                  args = new Sys.CancelEventArgs();
                if (
                  ((args.get_gridSourceColumn = function () {
                    return column1;
                  }),
                  (args.get_gridTargetColumn = function () {
                    return column2;
                  }),
                  owner._owner.raise_columnSwapping(args),
                  args.get_cancel())
                )
                  return !1;
                (preventRevertAnimation = !0),
                  (postBackFunction = postBackFunction.replace(
                    "{1}",
                    "ReorderColumns," +
                      owner._data.UniqueID +
                      "," +
                      this.get_element().UniqueName +
                      "," +
                      currentElement.UniqueName,
                  )),
                  eval(postBackFunction);
              }
          }
        }
        (owner._owner._animation &&
          owner._owner.ClientSettings.Animation &&
          owner._owner.ClientSettings.Animation.AllowColumnRevertAnimation &&
          !preventRevertAnimation) ||
          Telerik.Web.UI.Grid.DestroyDragDrop(),
          (owner._owner._isResize = null),
          Telerik.Web.UI.Grid.RestoreDocumentEvents();
      }
    },
    _onMouseMoveHandler: function (e) {
      if (this._canDragDrop) {
        if (!this.get_element()) return;
        $telerik.isTouchDevice && e.preventDefault(),
          Telerik.Web.UI.Grid.MoveDragDrop(e, this, !0);
      }
    },
    _onLocalMouseMoveHandler: function (e) {
      if (
        Telerik.Web.UI.Grid &&
        !$telerik.isTouchDevice &&
        ((this._canDragDrop = !0),
        (this._canResize = !1),
        !this._owner._owner._isResize)
      ) {
        var t = Telerik.Web.UI.Grid.GetCurrentElement(e),
          i = Telerik.Web.UI.Grid.GetFirstParentByTagName(t, "th"),
          r = Telerik.Web.UI.Grid.FindPosX(t),
          n =
            !!this._owner._owner.ClientSettings.AllowDragToGroup &&
            this._data.Groupable,
          l =
            !!this._owner._owner.ClientSettings.AllowColumnsReorder &&
            this.get_reorderable();
        if (
          ((n || l) &&
            ((this.get_element().title =
              this._owner._owner.ClientSettings.ClientMessages
                .DragToGroupOrReorder || this.get_element().title),
            (this.get_element().style.cursor = "move")),
          this._owner._owner.ClientSettings.Resizing.AllowColumnResize &&
            this.get_resizable() &&
            Telerik.Web.UI.Grid.GetEventPosX(e) >= r + i.offsetWidth - 5 &&
            !Telerik.Web.UI.Grid._moveHeaderDiv &&
            (this._canDragDrop = !1),
          this._owner._owner.ClientSettings &&
            this._owner._owner.ClientSettings.Resizing.AllowColumnResize &&
            this.get_resizable() &&
            "th" == this.get_element().tagName.toLowerCase())
        ) {
          if (
            ((t = Telerik.Web.UI.Grid.GetCurrentElement(e)),
            this._owner._owner.GridDataDiv &&
              !this._owner._owner.GridHeaderDiv &&
              !window.netscape)
          ) {
            document.body.currentStyle &&
              document.body.currentStyle.margin &&
              -1 != document.body.currentStyle.marginLeft.indexOf("px") &&
              !window.opera &&
              parseInt(document.body.currentStyle.marginLeft, 10),
              (this._resizeTolerance = 10);
          }
          this._isMouseOverResizeHandle(e) &&
          !Telerik.Web.UI.Grid._moveHeaderDiv
            ? ((this.get_element().style.cursor = "e-resize"),
              this.get_element().title !==
                this._owner._owner.ClientSettings.ClientMessages.DragToResize &&
                (this._oldTitle = this.get_element().title),
              (this.get_element().title =
                this._owner._owner.ClientSettings.ClientMessages.DragToResize),
              (this._canResize = !0),
              (t.style.cursor = "e-resize"))
            : ("move" != this.get_element().style.cursor &&
                ((this.get_element().style.cursor = ""),
                (t.style.cursor = ""),
                (this.get_element().title = this._oldTitle)),
              "e-resize" == t.style.cursor && (t.style.cursor = ""),
              (this._canResize = !1));
        }
      }
    },
    _canDropOnThisColumn: function (e) {
      if (void 0 === this._owner._columns) {
        this._owner._columns = {};
        for (var t = 0; t < this._owner._data._columnsData.length; t++)
          this._owner._columns[this._owner._data._columnsData[t].UniqueName] =
            this._owner._data._columnsData[t];
      }
      var i = !0;
      return (
        this._owner._hasMultiHeaders &&
          (i =
            this.get_columnGroupName() ==
            this._owner._columns[e].ColumnGroupName),
        this._owner._columns[e].Reorderable && i
      );
    },
    showHeaderMenu: function (e, t, i) {
      this._owner._data.enableHeaderContextMenu &&
        this._initHeaderContextMenu(e, !0, t, i);
    },
    _shouldShowAggregatesMenuForColumn: function () {
      return (
        this.get_owner()._data.enableHeaderContextAggregatesMenu &&
        Array.contains(
          this._supportedColumnTypesForAggregation,
          this._data.ColumnType,
        )
      );
    },
    _initHeaderContextAggregatesMenu: function (e) {
      if (e.findItemByValue("AggregatesContainer")) {
        var t = e.findItemByValue("AggregatesContainer");
        if (this._shouldShowAggregatesMenuForColumn()) {
          t.set_visible(!0);
          for (var i = t.get_items(), r = 0, n = i.get_count(); r < n; r++) {
            var l = i.getItem(r);
            (l._column = this),
              this._supportedStringAggregatesValues[this.get_dataType()] &&
              !this._supportedStringAggregatesValues[this.get_dataType()][
                l.get_value()
              ]
                ? l.set_visible(!1)
                : l.set_visible(!0);
          }
        } else t.set_visible(!1);
      }
    },
    _initHeaderContextMenu: function (e, t, i, r) {
      if (this._owner._owner._getHeaderContextMenu()) {
        var n = this._owner._owner._getHeaderContextMenu(),
          l = this,
          o = $find(this._owner._owner._filterCheckListClientID || "");
        if (o && this._owner._owner._filterCheckListSearch) {
          (this._owner._owner._checkListFilterActiveColumn = this),
            o.get_items().clear();
          var a = "";
          if (
            this._owner._data.CheckListWebServicePath &&
            this._data.FilterCheckListWebServiceMethod
          )
            o.set_visible(!0),
              o
                .get_webServiceSettings()
                .set_path(this._owner._data.CheckListWebServicePath),
              o
                .get_webServiceSettings()
                .set_method(this._data.FilterCheckListWebServiceMethod),
              o.requestItems();
          else if (this._data.FilterCheckListEnableLoadOnDemand) {
            o.set_visible(!0);
            var s = {
              columnUniqueName: this.get_uniqueName(),
              tableViewUniqueId: this._owner._data.UniqueID,
            };
            o._doLoadOnDemandWithCallBack(s, { startIndex: 0, count: 0 });
          } else o.set_visible(!1), (a = "None");
          var d = $find(this._owner._owner._filterCheckListSearch.id);
          d.set_visible("" == a);
          var h = d.get_element().parentNode.parentNode;
          (h.className = h.className.replace(" rgEmptyList", "")),
            "" != a && (h.className = h.className + " rgEmptyList"),
            d.set_value("");
        }
        n._shown && n.hide();
        var u;
        l._data.DataField;
        if (
          (l._data.DataTextField
            ? l._data.DataTextField
            : l._data.DataAlternateTextField && l._data.DataAlternateTextField,
          (this._onContextMenuItemClickingDelegate = Function.createDelegate(
            n,
            this._onContextMenuItemClicking,
          )),
          n.add_itemClicking(this._onContextMenuItemClickingDelegate),
          (this._onContextMenuHiddenDelegate = Function.createDelegate(
            this,
            this._onContextMenuHidden,
          )),
          n.add_hidden(this._onContextMenuHiddenDelegate),
          this._initHeaderContextAggregatesMenu(n),
          n.findItemByValue("SortAsc") &&
            (n.findItemByValue("SortAsc")._column = l),
          n.findItemByValue("SortDesc") &&
            (n.findItemByValue("SortDesc")._column = l),
          n.findItemByValue("SortNone") &&
            (n.findItemByValue("SortNone")._column = l),
          n.findItemByValue("GroupBy") &&
            ((u = n.findItemByValue("GroupBy")),
            l._data.Groupable
              ? ((n.findItemByValue("GroupBy")._column = l), u.set_visible(!0))
              : u.set_visible(!1)),
          n.findItemByValue("UnGroupBy") &&
            ((u = n.findItemByValue("UnGroupBy")),
            l._data.Groupable
              ? ((n.findItemByValue("UnGroupBy")._column = l),
                u.set_visible(!0))
              : u.set_visible(!1)),
          this._updateFreezeOption(),
          n.findItemByValue("topGroupSeperator") &&
            n
              .findItemByValue("topGroupSeperator")
              .set_visible(l._data.Groupable),
          n.findItemByValue("bottomGroupSeperator") &&
            n
              .findItemByValue("bottomGroupSeperator")
              .set_visible(l._data.Groupable),
          this._owner._data.enableHeaderContextFilterMenu &&
            this._owner._data.AllowFilteringByColumn &&
            l._data.AllowFiltering)
        ) {
          n.findItemByValue("FilterMenuParent") &&
            (n.findItemByValue("FilterMenuParent").set_enabled(!0),
            n.findItemByValue("FilterMenuParent").set_visible(!0)),
            n.findItemByValue("FilterList") &&
              n.findItemByValue("FilterList").set_visible(!0),
            n.findItemByValue("filterMenuSeparator") &&
              n.findItemByValue("filterMenuSeparator").set_visible(!0),
            (null != n.FilterControlsIDsHelper &&
              void 0 !== n.FilterControlsIDsHelper) ||
              (n.FilterControlsIDsHelper = {
                IdPrefix: "HCFM",
                IdSuffix: { FirstCond: "FirstCond", SecondCond: "SecondCond" },
                FilterControl: {
                  CheckBox: "CB",
                  RadComboBox: "RCMB",
                  RadTextBox: "RTB",
                  RadDateInput: "RDI",
                  RadDatePicker: "RDP",
                  RadDateTimePicker: "RDTP",
                  RadTimePicker: "RTP",
                  RadNumericBox: "RNTB",
                  RadMaskedBox: "RMTB",
                  FilterButton: "FilterButton",
                  ClearFilterButton: "ClearFilterButton",
                },
                FirstFilterValueControl: null,
                SecondFilterValueControl: null,
                FilterControlsType: null,
                getFilterControlID: function (e, t) {
                  return this.IdPrefix + e + t;
                },
              });
          var _ = null;
          if (
            (n.findItemByValue("FilterMenuParent") &&
            n.findItemByValue("FilterMenuContainer") &&
            l._data.AllowFiltering
              ? (_ = n.findItemByValue("FilterMenuContainer").get_element())
              : n.findItemByValue("FilterMenuParent") &&
                $telerik.findElement(
                  n.findItemByValue("FilterMenuParent").get_element(),
                  "HCFMFilterButton",
                ) &&
                (_ = n.findItemByValue("FilterMenuParent").get_element()),
            _)
          ) {
            n.trackChanges(),
              (this._onContextMenuItemClosingDelegate = Function.createDelegate(
                n,
                this._onContextMenuItemClosing,
              )),
              n.add_itemClosing(this._onContextMenuItemClosingDelegate),
              n.commitChanges(),
              this._updateDisplayHCMenuFilterControls(
                _,
                n.FilterControlsIDsHelper,
              ),
              this._updateFilterFunctionsForHCMenu(
                _,
                n.FilterControlsIDsHelper,
              ),
              this._updateFilterValuesForHCMenu(n.FilterControlsIDsHelper);
            var g = $telerik.findElement(_, "HCFMFilterButton");
            (this._filterButtonClickDelegate = Function.createDelegate(
              this,
              this._filterButtonClickHandler,
            )),
              window.$addHandler(g, "click", this._filterButtonClickDelegate);
            var c = $telerik.findElement(_, "HCFMClearFilterButton");
            (c.onclick = ""),
              (this._clearFilterButtonClickDelegate = Function.createDelegate(
                this,
                this._clearFilterButtonClickHandler,
              )),
              window.$addHandler(
                c,
                "click",
                this._clearFilterButtonClickDelegate,
              );
          }
        } else
          n.findItemByValue("FilterMenuParent") &&
          this._owner._data.AllowFilteringByColumn &&
          !this._owner._data.enableHeaderContextFilterMenu
            ? n.findItemByValue("FilterMenuParent").set_enabled(!1)
            : n.findItemByValue("FilterMenuParent") &&
              (n.findItemByValue("FilterMenuParent").set_visible(!1),
              n.findItemByValue("FilterList") &&
                n.findItemByValue("FilterList").set_visible(!1)),
            n.findItemByValue("filterMenuSeparator") &&
              !this._owner._data.AllowFilteringByColumn &&
              n.findItemByValue("filterMenuSeparator").set_visible(!1);
        var m = n.findItemByValue("BestFit");
        m &&
          (m.set_visible(this.get_resizable()),
          (m._column = this.get_resizable() ? this : null));
        var p = n.findItemByValue("bestFitSeparator");
        p && p.set_visible(m.get_visible());
        var f = null;
        if (
          (n.findItemByValue("ColumnsContainer") &&
            (f = n.findItemByValue("ColumnsContainer").get_items()),
          f)
        ) {
          for (var w = 0, C = f.get_count(); w < C; w++) {
            (u = f.getItem(w)).set_visible(!1);
            for (
              var I = 0, v = l.get_owner().get_columns().length;
              I < v;
              I++
            ) {
              var T = l.get_owner().get_columns()[I];
              if (
                u.get_value() ==
                String.format(
                  "{0}|{1}",
                  l.get_owner()._data.ClientID,
                  T.get_uniqueName(),
                )
              ) {
                u.set_visible(!0);
                var b = u.get_element().getElementsByTagName("input");
                if (b && b.length && "checkbox" == b[0].type) {
                  window.$addHandler(b[0], "click", this._checkBoxClickHandler),
                    T.get_visible() ? (b[0].checked = !0) : (b[0].checked = !1),
                    (b[0]._column = T),
                    (b[0]._index = I),
                    Array.add(this._checkboxes, b[0]);
                  break;
                }
              }
            }
          }
          this._handleColumnsCheckboxesState();
        }
        var y = new Telerik.Web.UI.GridHeaderMenuCancelEventArgs(this, e, n);
        if ((this._owner._owner.raise_headerMenuShowing(y), y.get_cancel()))
          return;
        var S = $telerik.getLocation(this.get_element());
        if (t) {
          if (S) {
            var D = S.x,
              k = S.y;
            i && (D += parseInt(i, 10)),
              r && (k += parseInt(r, 10)),
              n.showAt(D, k),
              $telerik.cancelRawEvent(e);
          }
        } else {
          var x = $telerik.getTouchEventLocation(e, "client");
          if (0 == x.x && 0 == x.y && S) {
            var G = this.get_element().getBoundingClientRect();
            n.showAt(
              S.x + (G.right - G.left) / 2,
              S.y + (G.bottom - G.top) / 2,
            );
          } else n.show(e);
          var N = n.get_items(),
            F = function () {
              for (var e = 0; e < N.get_count(); e++) {
                var t = N.getItem(e);
                if (t._linkElement) {
                  t._linkElement.focus();
                  break;
                }
                if (t._templateElement) {
                  t._templateElement.focus();
                  break;
                }
              }
              n.remove_expandAnimationEnded(F);
            };
          n.add_expandAnimationEnded(F);
        }
        this._owner._owner._enableRippleEffect &&
          this._initializeContextMenuFilterRippleEffect(n);
      }
    },
    _initializeContextMenuFilterRippleEffect: function (e) {
      var t = e.get_contextMenuElement(),
        i = Telerik.Web.UI.MaterialRippleManager.getInstance(),
        r = $telerik.findElement(t, "HCFMFilterButton"),
        n = $telerik.findElement(t, "HCFMClearFilterButton");
      i && (r && i.initializeRipple(r), n && i.initializeRipple(n));
    },
    _updateFreezeOption: function () {
      var e = this._owner,
        t = e._owner,
        i = t._getHeaderContextMenu(),
        r = i.findItemByValue("Freeze"),
        n = i.findItemByValue("FreezeSeparator"),
        l = t.ClientSettings.Scrolling.FrozenColumnsCount,
        o = Array.indexOf(e.get_columns(), this);
      r &&
        (r.set_visible(
          this.get_realOwner().get_id() == t.get_masterTableView().get_id(),
        ),
        n.set_visible(
          this.get_realOwner().get_id() == t.get_masterTableView().get_id(),
        ),
        o >= l
          ? (r.set_text(t._freezeText),
            r.set_cssClass("rgFreeze"),
            t._renderMode == Telerik.Web.UI.RenderMode.Lite &&
              ($telerik
                .$(r.get_linkElement())
                .children(".rmIcon")[0].className = "rmIcon rgFreezeIcon"))
          : (r.set_text(t._unfreezeText),
            r.set_cssClass("rgUnFreeze"),
            t._renderMode == Telerik.Web.UI.RenderMode.Lite &&
              ($telerik
                .$(r.get_linkElement())
                .children(".rmIcon")[0].className = "rmIcon rgUnFreezeIcon")),
        (r._column = this));
    },
    _toggleFreeze: function () {
      var e = this._owner,
        t = e._owner,
        i = this._owner._owner
          ._getHeaderContextMenu()
          .findItemByValue("Freeze"),
        r = this._owner._owner.ClientSettings.Scrolling,
        n = Array.indexOf(e.get_columns(), this),
        l = t.ClientSettings.AllowColumnsReorder;
      (t.ClientSettings.AllowColumnsReorder = !0),
        i &&
          (n >= r.FrozenColumnsCount
            ? (e._reorderColumns(
                this.get_uniqueName(),
                e.get_columns()[r.FrozenColumnsCount].get_uniqueName(),
              ),
              r.FrozenColumnsCount++)
            : (e._reorderColumns(
                this.get_uniqueName(),
                e.get_columns()[r.FrozenColumnsCount - 1].get_uniqueName(),
              ),
              r.FrozenColumnsCount--),
          t._scrolling._frozenScroll
            ? (t._scrolling._frozenScroll.scrollLeft = 0)
            : t._scrolling._scrollToFirstColumn()),
        (t.ClientSettings.AllowColumnsReorder = l);
    },
    _updateFilterValuesForHCMenu: function (e) {
      var t = this._data.CurrentFilterValue,
        i = this._data.AndCurrentFilterValue;
      if (e.FirstFilterValueControl)
        if (e.FilterControlsType == e.FilterControl.CheckBox)
          "true" == t.toString().toLowerCase()
            ? (e.FirstFilterValueControl.checked = !0)
            : (e.FirstFilterValueControl.checked = !1);
        else if (
          e.FilterControlsType == e.FilterControl.RadTextBox ||
          e.FilterControlsType == e.FilterControl.RadMaskedBox ||
          e.FilterControlsType == e.FilterControl.RadNumericBox
        )
          e.FirstFilterValueControl.set_value(t);
        else if (
          e.FilterControlsType == e.FilterControl.RadDateInput ||
          e.FilterControlsType == e.FilterControl.RadDatePicker ||
          e.FilterControlsType == e.FilterControl.RadDateTimePicker ||
          e.FilterControlsType == e.FilterControl.RadTimePicker
        ) {
          var r = Date.parseLocale(t);
          if (!r)
            try {
              r = new Date(t);
            } catch (e) {}
          isNaN(r) || null == r || void 0 === r
            ? e.FirstFilterValueControl.clear()
            : e.FirstFilterValueControl.set_selectedDate(r);
        }
      if (e.SecondFilterValueControl)
        if (e.FilterControlsType == e.FilterControl.CheckBox)
          "true" == i.toString().toLowerCase()
            ? (e.SecondFilterValueControl.checked = !0)
            : (e.SecondFilterValueControl.checked = !1);
        else if (
          e.FilterControlsType == e.FilterControl.RadTextBox ||
          e.FilterControlsType == e.FilterControl.RadMaskedBox ||
          e.FilterControlsType == e.FilterControl.RadNumericBox
        )
          e.SecondFilterValueControl.set_value(i);
        else if (
          e.FilterControlsType == e.FilterControl.RadDateInput ||
          e.FilterControlsType == e.FilterControl.RadDatePicker ||
          e.FilterControlsType == e.FilterControl.RadDateTimePicker ||
          e.FilterControlsType == e.FilterControl.RadTimePicker
        ) {
          var n = Date.parseLocale(i);
          if (!n)
            try {
              n = new Date(i);
            } catch (e) {}
          isNaN(n) || null == n || void 0 === n
            ? e.SecondFilterValueControl.clear()
            : e.SecondFilterValueControl.set_selectedDate(n);
        }
    },
    _updateFilterFunctionsForHCMenu: function (e, t) {
      var i = this._data.CurrentFilterFunctionName,
        r = this._data.AndCurrentFilterFunctionName,
        n = t.getFilterControlID(
          t.FilterControl.RadComboBox,
          t.IdSuffix.FirstCond,
        ),
        l = $telerik.findControl(e, n);
      this._setUpHeaderContextMenuFilterControls(
        l,
        i,
        this._data.DataTypeName,
        this._data.FilterListOptions,
      ),
        (n = t.getFilterControlID(
          t.FilterControl.RadComboBox,
          t.IdSuffix.SecondCond,
        )),
        (l = $telerik.findControl(e, n)),
        this._setUpHeaderContextMenuFilterControls(
          l,
          r,
          this._data.DataTypeName,
          this._data.FilterListOptions,
        );
    },
    _updateDisplayHCMenuFilterControls: function (e, t) {
      this._updateDisplayHCFilterBoundColumnControls(
        e,
        t,
        t.IdSuffix.FirstCond,
      ),
        this._updateDisplayHCFilterBoundColumnControls(
          e,
          t,
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterCheckBoxColumnControls(
          e,
          t,
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterCheckBoxColumnControls(
          e,
          t,
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadDatePicker,
          "DatePicker",
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadDatePicker,
          "DatePicker",
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadDateTimePicker,
          "DateTimePicker",
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadDateTimePicker,
          "DateTimePicker",
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadTimePicker,
          "TimePicker",
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadTimePicker,
          "TimePicker",
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadDateInput,
          "None",
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterPickerControls(
          e,
          t,
          t.FilterControl.RadDateInput,
          "None",
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterMaskedBoxControls(
          e,
          t,
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterMaskedBoxControls(
          e,
          t,
          t.IdSuffix.SecondCond,
        ),
        this._updateDisplayHCFilterNumericBoxControls(
          e,
          t,
          t.IdSuffix.FirstCond,
        ),
        this._updateDisplayHCFilterNumericBoxControls(
          e,
          t,
          t.IdSuffix.SecondCond,
        );
    },
    _updateDisplayHCFilterBoundColumnControls: function (e, t, i) {
      var r = t.getFilterControlID(t.FilterControl.RadTextBox, i),
        n = $telerik.findControl(e, r);
      n &&
        ("GridDateTimeColumn" != this._data.ColumnType &&
        "GridMaskedColumn" != this._data.ColumnType &&
        "GridNumericColumn" != this._data.ColumnType &&
        "GridCheckBoxColumn" != this._data.ColumnType &&
        "System.Boolean" != this._data.DataTypeName &&
        "GridRatingColumn" != this._data.ColumnType
          ? (i == t.IdSuffix.FirstCond
              ? (t.FirstFilterValueControl = n)
              : (t.SecondFilterValueControl = n),
            (t.FilterControlsType = t.FilterControl.RadTextBox),
            n.set_visible(!0),
            this._data.FilterControlWidth &&
              (n._originalTextBoxCssText =
                this._adjustHCFilterMenuInputControlsWidth(
                  n._originalTextBoxCssText,
                  this._data.FilterControlWidth.Value,
                )))
          : n.set_visible(!1));
    },
    _updateDisplayHCFilterPickerControls: function (e, t, i, r, n) {
      var l = t.getFilterControlID(i, n),
        o = $telerik.findControl(e, l);
      o &&
        (this._data.PickerType != r
          ? o.set_visible(!1)
          : (n == t.IdSuffix.FirstCond
              ? (t.FirstFilterValueControl = o)
              : (t.SecondFilterValueControl = o),
            (t.FilterControlsType = i),
            o.set_visible(!0),
            this._data.FilterControlWidth &&
              (i == t.FilterControl.RadDateInput
                ? (o._originalTextBoxCssText =
                    this._adjustHCFilterMenuInputControlsWidth(
                      o._originalTextBoxCssText,
                      this._data.FilterControlWidth.Value,
                    ))
                : this._adjustHCFilterMenuPickerControlsWidth(
                    o,
                    this._data.FilterControlWidth.Value,
                  )),
            this._data.MinDate && o.set_minDate(new Date(this._data.MinDate)),
            this._data.MaxDate && o.set_maxDate(new Date(this._data.MaxDate))));
    },
    _updateDisplayHCFilterCheckBoxColumnControls: function (e, t, i) {
      var r = t.getFilterControlID(t.FilterControl.CheckBox, i),
        n = $telerik.findElement(e, r);
      n &&
        ("GridCheckBoxColumn" == this._data.ColumnType ||
        "System.Boolean" == this._data.DataTypeName
          ? ((n.style.display = "block"),
            i == t.IdSuffix.FirstCond
              ? ((t.FirstFilterValueControl = n),
                (t.FilterControlsType = t.FilterControl.CheckBox))
              : ((t.SecondFilterValueControl = n),
                (t.FilterControlsType = t.FilterControl.CheckBox)))
          : (n.style.display = "none"));
    },
    _updateDisplayHCFilterMaskedBoxControls: function (
      filterItemElement,
      idGenHelper,
      idSuffix,
    ) {
      var controlID = idGenHelper.getFilterControlID(
          idGenHelper.FilterControl.RadMaskedBox,
          idSuffix,
        ),
        _maskedFilterBox = $telerik.findControl(filterItemElement, controlID);
      if (_maskedFilterBox)
        if ("GridMaskedColumn" != this._data.ColumnType)
          _maskedFilterBox.set_visible(!1);
        else if (
          (idSuffix == idGenHelper.IdSuffix.FirstCond
            ? (idGenHelper.FirstFilterValueControl = _maskedFilterBox)
            : (idGenHelper.SecondFilterValueControl = _maskedFilterBox),
          (idGenHelper.FilterControlsType =
            idGenHelper.FilterControl.RadMaskedBox),
          _maskedFilterBox.set_visible(!0),
          null != this._data.Mask && void 0 !== this._data.Mask)
        ) {
          for (
            var mask = [], maskParts = this._data.Mask.split(","), i = 0;
            i < maskParts.length;
            i++
          )
            mask.push(eval(maskParts[i]));
          (_maskedFilterBox._length = 0),
            _maskedFilterBox._setMask(mask),
            this._data.FilterControlWidth &&
              (_maskedFilterBox._originalTextBoxCssText =
                this._adjustHCFilterMenuInputControlsWidth(
                  _maskedFilterBox._originalTextBoxCssText,
                  this._data.FilterControlWidth.Value,
                ));
        }
    },
    _updateDisplayHCFilterNumericBoxControls: function (e, t, i) {
      var r = t.getFilterControlID(t.FilterControl.RadNumericBox, i),
        n = $telerik.findControl(e, r);
      if (n)
        if (
          "GridNumericColumn" != this._data.ColumnType &&
          "GridRatingColumn" != this._data.ColumnType
        )
          n.set_visible(!1);
        else {
          (t.FilterControlsType = t.FilterControl.RadNumericBox),
            i == t.IdSuffix.FirstCond
              ? (t.FirstFilterValueControl = n)
              : (t.SecondFilterValueControl = n);
          var l = n.get_numberFormat();
          null != this._data.NegativePattern &&
            void 0 !== this._data.NegativePattern &&
            (l.NegativePattern = this._data.NegativePattern),
            null != this._data.PositivePattern &&
              void 0 !== this._data.PositivePattern &&
              (l.PositivePattern = this._data.PositivePattern),
            null != this._data.AllowRounding &&
              void 0 !== this._data.AllowRounding &&
              (l.AllowRounding = this._data.AllowRounding),
            null != this._data.KeepNotRoundedValue &&
              void 0 !== this._data.KeepNotRoundedValue &&
              (l.KeepNotRoundedValue = this._data.KeepNotRoundedValue),
            n.set_numberFormat(l),
            n.set_visible(!0);
        }
    },
    _adjustHCFilterMenuInputControlsWidth: function (e, t) {
      return (
        -1 != e.search(/(^|[^-])width/i)
          ? (e = e.replace(
              /(^|[^-])width(\s*):(\s*)([^;]+);/i,
              "$1WIDTH:" + t + "px;",
            ))
          : (e += "WIDTH:" + t + "px;"),
        e
      );
    },
    _adjustHCFilterMenuPickerControlsWidth: function (e, t) {
      $get(e.get_id() + "_wrapper").style.width = t;
    },
    _setUpHeaderContextMenuFilterControls: function (e, t, i, r) {
      for (var n = e.get_items().toArray(), l = 0; l < n.length; l++) {
        var o = n[l];
        "System.Boolean" != i ||
        ("GreaterThan" != o.get_value() &&
          "LessThan" != o.get_value() &&
          "GreaterThanOrEqualTo" != o.get_value() &&
          "LessThanOrEqualTo" != o.get_value())
          ? ("System.String" == i ||
              ("StartsWith" != o.get_value() &&
                "EndsWith" != o.get_value() &&
                "Contains" != o.get_value() &&
                "DoesNotContain" != o.get_value() &&
                "IsEmpty" != o.get_value() &&
                "NotIsEmpty" != o.get_value())) &&
            (0 != r || "Custom" != o.get_value())
            ? (o.get_value() == t && o.select(), o.set_visible(!0))
            : o.set_visible(!1)
          : o.set_visible(!1);
      }
    },
    _filterButtonClickHandler: function (e) {
      var t = this._owner._owner._getHeaderContextMenu(),
        i = this,
        r = t.FilterControlsIDsHelper;
      i._data.DataField;
      i._data.DataTextField
        ? i._data.DataTextField
        : i._data.DataAlternateTextField && i._data.DataAlternateTextField;
      var n,
        l,
        o,
        a = r.getFilterControlID(
          r.FilterControl.RadComboBox,
          r.IdSuffix.FirstCond,
        ),
        s = (
          t.findItemByValue("FilterMenuContainer") ||
          t.findItemByValue("FilterMenuParent")
        )
          .findControl(a)
          .get_selectedItem()
          .get_value(),
        d = r.getFilterControlID(
          r.FilterControl.RadComboBox,
          r.IdSuffix.SecondCond,
        ),
        h = (
          t.findItemByValue("FilterMenuContainer") ||
          t.findItemByValue("FilterMenuParent")
        )
          .findControl(d)
          .get_selectedItem()
          .get_value(),
        u = !0,
        _ = ["NoFilter", "IsEmpty", "NotIsEmpty", "IsNull", "NotIsNull"];
      if (
        r.FilterControlsType == r.FilterControl.RadTextBox ||
        r.FilterControlsType == r.FilterControl.RadMaskedBox ||
        r.FilterControlsType == r.FilterControl.RadNumericBox
      )
        (n = r.FirstFilterValueControl.get_value()),
          (l = r.SecondFilterValueControl.get_value());
      else if (r.FilterControlsType == r.FilterControl.CheckBox)
        (n = r.FirstFilterValueControl.checked),
          (l = r.SecondFilterValueControl.checked),
          (u = !1);
      else {
        var g =
            ((o = r.FilterControlsType),
            function (e) {
              return o == r.FilterControl.RadDateInput
                ? e._dateFormat
                : e._dateInput._dateFormat;
            }),
          c = r.FirstFilterValueControl.get_selectedDate();
        c && (n = c.localeFormat(g(r.FirstFilterValueControl)));
        var m = r.SecondFilterValueControl.get_selectedDate();
        m && (l = m.localeFormat(g(r.SecondFilterValueControl)));
      }
      -1 !== $telerik.$.inArray(s, _) && (n = ""),
        -1 !== $telerik.$.inArray(h, _) && (l = ""),
        u &&
          ((n = void 0 === n || null == n ? "" : n.toString()),
          (l = void 0 === l || null == l ? "" : l.toString()),
          (n = n.replace(/\\/g, "\\\\").replace(/'/g, "\\'")),
          (l = l.replace(/\\/g, "\\\\").replace(/'/g, "\\'"))),
        e.preventDefault();
      var p = this._owner,
        f = i._data.UniqueName + "|?" + s + "|" + n + "|?" + h + "|" + l,
        w = $find(p.get_owner().get_id());
      if (
        (void 0 !== w.ClientSettings.DataBinding.Location &&
          "" != w.ClientSettings.DataBinding.Location &&
          !w.get_masterTableView()._virtualization) ||
        w._clientDataSourceID
      ) {
        for (; 0 != p._filterExpressions.get_count(); ) {
          var C = p._filterExpressions.getItem(0);
          C.get_columnUniqueName() == i._data.UniqueName &&
            p._filterExpressions.remove(C);
        }
        "NoFilter" != s &&
          "" !== n &&
          p.filter(i._data.UniqueName, n, s, !0, !0),
          "NoFilter" != h &&
            "" !== l &&
            p.filter(i._data.UniqueName, l, h, !1, !0),
          (i._data.CurrentFilterFunctionName = s),
          (i._data.AndCurrentFilterFunctionName = h),
          (i._data.CurrentFilterValue = n),
          (i._data.AndCurrentFilterValue = l),
          "NoFilter" == s && (i._data.CurrentFilterValue = ""),
          "NoFilter" == h && (i._data.AndCurrentFilterValue = ""),
          ("NoFilter" != s && "NoFilter" != h) ||
            ((t = p._owner._getHeaderContextMenu()),
            this._updateFilterValuesForHCMenu(t.FilterControlsIDsHelper),
            "NoFilter" == s &&
              p._updateFilterControlValue(
                "",
                this._data.UniqueName,
                "NoFilter",
              )),
          p.fireCommand("HeaderContextMenuFilter", f),
          w._clientDataSourceID && t && t.hide();
      } else p.fireCommand("HeaderContextMenuFilter", f);
      return !1;
    },
    _clearFilterButtonClickHandler: function (e) {
      var t = this._owner._owner._getHeaderContextMenu(),
        i = this._data.UniqueName + "|?NoFilter||?NoFilter|";
      e.preventDefault();
      var r = this._owner,
        n = $find(r.get_owner().get_id());
      if (
        (void 0 !== n.ClientSettings.DataBinding.Location &&
          "" != n.ClientSettings.DataBinding.Location &&
          !n.get_masterTableView()._virtualization) ||
        n._clientDataSourceID
      ) {
        t = r._owner._getHeaderContextMenu();
        var l = this;
        (l._data.CurrentFilterFunctionName = "NoFilter"),
          (l._data.AndCurrentFilterFunctionName = "NoFilter"),
          (l._data.CurrentFilterValue = ""),
          (l._data.AndCurrentFilterValue = ""),
          r._updateFilterControlValue("", l._data.UniqueName, "NoFilter"),
          this.set_filterFunction("NoFilter"),
          r._filterExpressions.clear();
        var o = $telerik.getElementByClassName(
          r._getFilterCellByColumnUniqueName(l._data.UniqueName),
          "rgFilter",
        );
        Sys.UI.DomElement.removeCssClass(o, "rgFiltered");
        var a =
          t.findItemByValue("FilterMenuContainer") ||
          t.findItemByValue("FilterMenuParent");
        this._updateDisplayHCMenuFilterControls(
          a.get_element(),
          t.FilterControlsIDsHelper,
        ),
          this._updateFilterFunctionsForHCMenu(
            a.get_element(),
            t.FilterControlsIDsHelper,
          ),
          this._updateFilterValuesForHCMenu(t.FilterControlsIDsHelper);
      }
      if (n._filterCheckListClientID) {
        var s = $find(n._filterCheckListClientID);
        n._resetCheckListFilterOfColumn(this),
          s.uncheckItems(s.get_checkedItems()),
          n._filterCheckListSearch &&
            $find(n._filterCheckListSearch.id).set_value(""),
          n.updateClientState();
      }
      return (
        r.fireCommand("HeaderContextMenuFilter", i),
        n._clientDataSourceID && t && t.hide(),
        !1
      );
    },
    _checkBoxClickHandler: function (e) {
      var t = $find(this._column.get_owner().get_id());
      if (
        t &&
        (this.checked ? t.showColumn(this._index) : t.hideColumn(this._index),
        this._column._handleColumnsCheckboxesState(),
        $telerik.isIE8 || $telerik.isIE9)
      ) {
        var i = t._owner.get_element(),
          r = i.style.display;
        i.style.display = "none";
        i.offsetHeight;
        i.style.display = r;
      }
    },
    _handleColumnsCheckboxesState: function () {
      var e = this.get_owner().get_owner();
      if (e) {
        var t = e.get_headerMenu().findItemByValue("ColumnsContainer");
        if (!t) return;
        var i = t.get_items();
        if (!i) return;
        for (var r, n = null, l = null, o = 0, a = i.get_count(); o < a; o++)
          if (
            (n = i.getItem(o)).get_visible() &&
            ((l = n
              .get_element()
              .getElementsByTagName("input")[0]).removeAttribute("disabled"),
            l.checked)
          ) {
            if (r) {
              r = null;
              break;
            }
            r = l;
          }
        r && (r.disabled = "disabled");
      }
    },
    _onContextMenuItemClosing: function (e, t) {
      "FilterMenuParent" == t.get_item().get_value() &&
        t.get_item()._popUpOpened &&
        t.set_cancel(!0);
    },
    _onContextMenuItemClicking: function (e, t) {
      var i = t.get_item(),
        r = !!e.get_parent()._clientDataSourceID,
        n = i.get_value();
      if (
        "FilterList" == n ||
        "FilterMenuContainer" == n ||
        "AggregatesContainer" == n ||
        "FilterMenuParent" == n ||
        "ColumnsContainer" == n ||
        (Telerik.Web.UI.RadMenuItem.isInstanceOfType(i.get_parent()) &&
          "ColumnsContainer" == i.get_parent().get_value())
      )
        $telerik.isTouchDevice ? t.set_cancel(!1) : t.set_cancel(!0),
          e.get_clickToOpen() && t.get_item().open();
      else if ("SortAsc" == n || "SortDesc" == n || "SortNone" == n) {
        var l = i._column._data,
          o = $find(i._column.get_owner().get_id()),
          a = o.get_owner(),
          s = l.SortExpression;
        if (
          (void 0 !== a.ClientSettings.DataBinding.Location &&
            "" != a.ClientSettings.DataBinding.Location) ||
          r
        )
          "SortNone" == n
            ? (t = o._raiseAction("ClearSort", {
                sortExpression: s,
              })).get_cancel() || ((s = t.get_sortExpression()), o.clearSort(s))
            : ((s += "SortAsc" == n ? " ASC" : " DESC"),
              (t = o._raiseAction("Sort", {
                sortExpression: s,
              })).get_cancel() || ((s = t.get_sortExpression()), o.sort(s)));
        else {
          e.trackChanges();
          var d = l.DataField;
          l.DataTextField
            ? (d = l.DataTextField)
            : l.DataAlternateTextField && (d = l.DataAlternateTextField),
            i.get_attributes().setAttribute("ColumnName", s || d),
            i
              .get_attributes()
              .setAttribute("TableID", i._column.get_owner()._data.UniqueID),
            e.commitChanges();
        }
      } else if ("GroupBy" == n)
        r
          ? (i._column
              .get_owner()
              .fireCommand("GroupByColumn", i._column.get_dataField()),
            e.hide())
          : (i._column.get_owner().groupColumn(i._column.get_uniqueName()),
            t.set_cancel(!0));
      else if ("UnGroupBy" == n)
        if (r) {
          var h = i._column.get_owner().get_owner()._groupPanel;
          if (h) {
            for (
              var u = h._items, _ = i._column.get_dataField(), g = null, c = 0;
              c < u.length;
              c++
            )
              u[c]._dataField == _ && (g = u[c]);
            g && h._ungroup(g.get_element().childNodes[0]);
          } else
            i._column.get_owner().ungroupColumn(i._column.get_uniqueName());
          e.hide();
        } else
          i._column.get_owner().ungroupColumn(i._column.get_uniqueName()),
            t.set_cancel(!0);
      else
        "BestFit" == n
          ? i._column.resizeToFit()
          : i.get_isSeparator()
            ? t.set_cancel(!0)
            : null != i.get_parent() &&
                i.get_parent().get_value &&
                "AggregatesContainer" == i.get_parent().get_value()
              ? i._column
                  .get_owner()
                  .fireCommand(
                    "SetColumnAggregate",
                    String.format(
                      "{0}|{1}|{2}",
                      n,
                      i._column.get_owner()._data.UniqueID,
                      i._column.get_uniqueName(),
                    ),
                  )
              : "Freeze" == n && i._column._toggleFreeze();
    },
    _onContextMenuHidden: function (e, t) {
      var i = e;
      if (this._checkboxes)
        for (var r = 0, n = this._checkboxes.length; r < n; r++)
          window.$removeHandler(
            this._checkboxes[r],
            "click",
            this._checkBoxClickHandler,
          ),
            (this._checkboxes[r]._column = null),
            (this._checkboxes[r]._index = null);
      if (
        (this._onContextMenuItemClickingDelegate &&
          (e.remove_itemClicking(this._onContextMenuItemClickingDelegate),
          (this._onContextMenuItemClickingDelegate = null)),
        this._onContextMenuItemClosingDelegate &&
          (e.remove_itemClosing(this._onContextMenuItemClosingDelegate),
          (this._onContextMenuItemClosingDelegate = null)),
        this._onContextMenuHiddenDelegate &&
          (e.remove_hidden(this._onContextMenuHiddenDelegate),
          (this._onContextMenuHiddenDelegate = null)),
        this._filterButtonClickDelegate)
      ) {
        var l = $telerik.findElement(
          (
            i.findItemByValue("FilterMenuContainer") ||
            i.findItemByValue("FilterMenuParent")
          ).get_element(),
          "HCFMFilterButton",
        );
        window.$removeHandler(l, "click", this._filterButtonClickDelegate),
          (this._filterButtonClickDelegate = null);
      }
      if (this._clearFilterButtonClickDelegate) {
        var o = $telerik.findElement(
          (
            i.findItemByValue("FilterMenuContainer") ||
            i.findItemByValue("FilterMenuParent")
          ).get_element(),
          "HCFMClearFilterButton",
        );
        window.$removeHandler(o, "click", this._clearFilterButtonClickDelegate),
          (this._clearFilterButtonClickDelegate = null);
      }
      this._checkboxes = [];
    },
    _onContextMenu: function (e) {
      if (
        (!$telerik.isOpera || 2 == e.button) &&
        !1 !== this._data.EnableHeaderContextMenu &&
        (this._owner._owner.raise_columnContextMenu(
          new Telerik.Web.UI.GridColumnEventArgs(this, e),
        ),
        this._owner._owner.get_events().getHandler("columnContextMenu") ||
          this._owner._data.enableHeaderContextMenu)
      ) {
        if ((this._initHeaderContextMenu(e), !e.preventDefault))
          return (e.returnValue = !1), !1;
        e.preventDefault();
      }
    },
    resizeToFit: function (e, t) {
      if (this._canResizeToFit()) {
        void 0 !== t && (this.get_realOwner()._includeAllHeaderRows = t);
        var i = this._getItemContainerTableView(),
          r = Array.indexOf(i.get_columns(), this),
          n = this._createFitTestContainer(i.get_element(), e),
          l = this._calculateBestFitSizes(n, r);
        this._removeFitTestContainer(i.get_element()),
          this.get_owner().resizeColumn(r, l || this.get_element().offsetWidth),
          this.get_owner()._owner.updateClientState();
      }
    },
    _isMouseOverResizeHandle: function (e) {
      var t = Telerik.Web.UI.Grid.GetEventPosX(e),
        i =
          Telerik.Web.UI.Grid.FindPosX(this.get_element()) +
          this.get_element().offsetWidth;
      return t >= i - this._resizeTolerance && t <= i + this._resizeTolerance;
    },
    _isTouchPointOverResizeHandle: function (e) {
      return (
        $telerik.getTouchEventLocation(e).x >=
        Telerik.Web.UI.Grid.FindPosX(this.get_element()) +
          this.get_element().offsetWidth -
          this._resizeTolerance
      );
    },
    _canResizeToFit: function () {
      var e =
          this.get_visible() &&
          (null == this._data.Display || this._data.Display) &&
          (null == this.Display || this.Display),
        t = this.get_owner().get_owner().ClientSettings.Resizing;
      return (
        e &&
        this.get_resizable() &&
        t &&
        t.AllowColumnResize &&
        t.AllowResizeToFit
      );
    },
    _getItemContainerTableView: function () {
      var e = this.get_owner();
      return e.get_id().endsWith("_Header")
        ? $find(e.get_owner().get_id()).get_masterTableView()
        : e;
    },
    _calculateBestFitSizes: function (e, t) {
      var i = e.tBodies[0].getElementsByTagName("tr")[0];
      if (i) {
        var r = i.cells[t];
        if (r) return r.offsetWidth;
      }
      return null;
    },
    _createFitTestContainer: function (e, t) {
      var i = e.parentNode,
        r = i.id + "_FitTestContainer",
        n = r + "_FitTestTable",
        l = document.createDocumentFragment(),
        o = document.createElement("div");
      l.appendChild(o),
        (o.id = r),
        (o.style.position = "absolute"),
        (o.style.visibility = "hidden"),
        e.tBodies.length > 0 &&
          (o.innerHTML =
            "<table class='" +
            e.className +
            "' cellspacing='0' border='0' style='" +
            e.style.cssText +
            ";table-layout:auto;white-space:nowrap;width:auto;'><tbody>" +
            e.tBodies[e.tBodies.length - 1].innerHTML +
            "</tbody></table>");
      var a = o.childNodes[0];
      a.id = n;
      for (var s = [], d = 0, h = a.rows.length; d < h; d++) {
        var u = a.rows[d];
        (u.id && u.id.indexOf(e.id) > -1) ||
          (u.className && u.className.indexOf("rgFooter") > -1) ||
          s.push(u);
      }
      for (var _ = s.pop(); _; ) a.deleteRow(_.rowIndex), (_ = s.pop());
      return (
        t || this._insertHeaderCells(a),
        i.appendChild(l.childNodes[0]),
        document.getElementById(n)
      );
    },
    _insertHeaderCells: function (e) {
      var t,
        i,
        r,
        n,
        l,
        o = e.createTHead();
      if (
        (this._owner._hasMultiHeaders &&
          (this.get_realOwner()._includeAllHeaderRows = !0),
        this.get_realOwner()._includeAllHeaderRows)
      )
        for (
          i = $telerik.$(
            ">tr:not(.rgCommandRow)",
            this.get_element().parentNode.parentNode,
          ),
            l = 0;
          l < i.length;
          l++
        )
          (r = i[l]),
            ((t = o.insertRow(-1)).className = r.className),
            this._insertCellsInRows(r.cells, t);
      else
        (t = o.insertRow(-1)),
          (n = (r = this.get_element().parentNode).cells),
          this._insertCellsInRows(n, t);
      if (this.get_realOwner().get_element().tFoot)
        for (
          i = this.get_realOwner().get_element().tFoot.rows, l = 0;
          l < i.length;
          l++
        )
          (r = i[l]).className.indexOf("rgFooter") > -1 &&
            (((t = o.insertRow(-1)).className = r.className),
            this._insertCellsInRows(r.cells, t));
    },
    _insertCellsInRows: function (e, t) {
      for (var i, r = 0, n = e.length; r < n; r++)
        ((i = t.insertCell(r)).className = e[r].className),
          (i.colSpan = e[r].colSpan),
          (i.rowSpan = e[r].rowSpan),
          (i.style.cssText = e[r].style.cssText),
          (i.style.width = "auto"),
          (i.innerHTML = e[r].innerHTML);
    },
    _removeFitTestContainer: function (e) {
      var t = document.getElementById(e.parentNode.id + "_FitTestContainer");
      t && t.parentNode.removeChild(t);
    },
    _onClick: function (e) {
      this._owner._owner.raise_columnClick(
        new Telerik.Web.UI.GridColumnEventArgs(this, e),
      );
    },
    _onDblClick: function (e) {
      this._owner._owner.raise_columnDblClick(
        new Telerik.Web.UI.GridColumnEventArgs(this, e),
      ),
        this._isMouseOverResizeHandle(e) && this.resizeToFit();
    },
    _onMouseOver: function (e) {
      this._owner._owner.raise_columnMouseOver(
        new Telerik.Web.UI.GridColumnEventArgs(this, e),
      ),
        "" != this._owner._owner.Skin &&
          Sys.UI.DomElement.addCssClass(this.get_element(), "rgHeaderOver");
    },
    _onMouseOut: function (e) {
      this._owner._owner.raise_columnMouseOut(
        new Telerik.Web.UI.GridColumnEventArgs(this, e),
      ),
        "" != this._owner._owner.Skin &&
          Sys.UI.DomElement.removeCssClass(this.get_element(), "rgHeaderOver");
    },
    get_resizable: function () {
      return this._data.Resizable;
    },
    set_resizable: function (e) {
      this._data.Resizable != e && (this._data.Resizable = e);
    },
    get_reorderable: function () {
      return this._data.Reorderable;
    },
    get_columnGroupName: function () {
      return this._data.ColumnGroupName;
    },
    get_selectable: function () {
      return this._data.Selectable;
    },
    set_reorderable: function (e) {
      this._data.Reorderable != e && (this._data.Reorderable = e);
    },
    get_uniqueName: function () {
      return this._data.UniqueName;
    },
    get_dataField: function () {
      return this._data.DataField;
    },
    get_readOnly: function () {
      return void 0 !== this._data.ReadOnly;
    },
    get_dataType: function () {
      return this._data.DataTypeName;
    },
    get_filterFunction: function () {
      return this._data.CurrentFilterFunctionName;
    },
    set_filterFunction: function (e) {
      this._data.CurrentFilterFunctionName != e &&
        (this._data.CurrentFilterFunctionName = e);
    },
    get_filterDelay: function () {
      return void 0 === this._data.FilterDelay ? null : this._data.FilterDelay;
    },
    set_filterDelay: function (e) {
      this._data.FilterDelay != e && (this._data.FilterDelay = e);
    },
  }),
  Telerik.Web.UI.GridColumn.registerClass(
    "Telerik.Web.UI.GridColumn",
    Sys.UI.Control,
  ),
  (Telerik.Web.UI.GridColumnEventArgs = function (e, t) {
    Telerik.Web.UI.GridColumnEventArgs.initializeBase(this),
      (this._gridColumn = e),
      (this._domEvent = t);
  }),
  (Telerik.Web.UI.GridColumnEventArgs.prototype = {
    get_gridColumn: function () {
      return this._gridColumn;
    },
    get_domEvent: function () {
      return this._domEvent;
    },
  }),
  Telerik.Web.UI.GridColumnEventArgs.registerClass(
    "Telerik.Web.UI.GridColumnEventArgs",
    Sys.EventArgs,
  ),
  (Telerik.Web.UI.GridColumnCancelEventArgs = function (e, t) {
    Telerik.Web.UI.GridColumnCancelEventArgs.initializeBase(this),
      (this._gridColumn = e),
      (this._domEvent = t);
  }),
  (Telerik.Web.UI.GridColumnCancelEventArgs.prototype = {
    get_gridColumn: function () {
      return this._gridColumn;
    },
    get_domEvent: function () {
      return this._domEvent;
    },
  }),
  Telerik.Web.UI.GridColumnCancelEventArgs.registerClass(
    "Telerik.Web.UI.GridColumnCancelEventArgs",
    Sys.CancelEventArgs,
  ),
  (Telerik.Web.UI.GridHeaderMenuCancelEventArgs = function (e, t, i) {
    Telerik.Web.UI.GridHeaderMenuCancelEventArgs.initializeBase(this, [e, t]),
      (this._menu = i);
  }),
  (Telerik.Web.UI.GridHeaderMenuCancelEventArgs.prototype = {
    get_menu: function () {
      return this._menu;
    },
  }),
  Telerik.Web.UI.GridHeaderMenuCancelEventArgs.registerClass(
    "Telerik.Web.UI.GridHeaderMenuCancelEventArgs",
    Telerik.Web.UI.GridColumnCancelEventArgs,
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  Type.registerNamespace("Telerik.Web.UI.Grid"),
  (function ($T) {
    function copyDataFieldsValuesToArray(e, t) {
      var i = [];
      if (!e || !t) return i;
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        "number" != typeof t[n]
          ? Array.add(i, String.format("'{0}'", t[n]))
          : Array.add(i, t[n]);
      }
      return i;
    }
    ($T.Grid.GridBoundColumn = {
      populateCell: function (e, t, i) {
        var r = this._owner._owner,
          n = this._data.DataFormatString;
        void 0 !== n && "" != n
          ? (-1 != i.toString().indexOf("/Date(") &&
              (i = new Date(
                parseInt(i.replace("/Date(", "").replace(")/", ""), 10),
              )),
            (e.innerHTML = String.localeFormat(n, i) || "&nbsp;"))
          : -1 != i.toString().indexOf("/Date(")
            ? (e.innerHTML = String.localeFormat(
                "{0:" + r._defaultDateTimeFormat + "}",
                new Date(
                  parseInt(i.replace("/Date(", "").replace(")/", ""), 10),
                ),
              ))
            : (e.innerHTML = "" !== i ? i : "&nbsp;");
      },
      populateEditCell: function (e, t, i, r) {
        this.get_realOwner()._fillEditorsData(r, this, i);
      },
    }),
      ($T.Grid.GridTemplateColumn = {
        populateCell: function (e, t, i, r) {
          if (this._data.ClientItemTemplate) {
            var n = this.get_realOwner()._getBindingContext(
                t,
                r.get_itemIndex(),
              ),
              l = Telerik.Web.UI.Template.compile(
                this._data.ClientItemTemplate,
              );
            l && (e.innerHTML = l(n));
          }
        },
        populateEditCell: function (e, t, i, r) {
          this.get_realOwner()._fillTemplateEditorsData(r, t, e);
        },
      }),
      ($T.Grid.GridCheckBoxColumn = {
        initializeCell: function (e) {
          e.innerHTML =
            '<span disabled="disabled"><input type="checkbox" disabled="disabled" /></span>';
        },
        populateCell: function (e, t, i) {
          var r = e.getElementsByTagName("input")[0];
          r && "checkbox" == r.type && (r.checked = i);
        },
        populateEditCell: function (e, t, i, r) {
          this.get_realOwner()._fillTemplateEditorsData(r, t, e);
        },
      }),
      ($T.Grid.GridHyperLinkColumn = {
        initializeCell: function (e) {
          e.innerHTML = "<a />";
        },
        populateCell: function (cell, dataItem) {
          if (dataItem) {
            var data = this._data,
              links = cell.getElementsByTagName("a");
            if (links.length > 0) {
              var link = links[0];
              data.NavigateUrl &&
                "" != data.NavigateUrl &&
                (link.href = data.NavigateUrl),
                data.Target && "" != data.Target && (link.target = data.Target),
                data.Text && "" != data.Text && (link.innerHTML = data.Text);
              var format = data.DataTextFormatString,
                text = String.localeFormat(
                  "" == format ? "{0}" : format,
                  dataItem[data.DataTextField],
                ),
                urlData = copyDataFieldsValuesToArray(
                  data.DataNavigateUrlFields,
                  dataItem,
                );
              if (urlData && urlData.length > 0) {
                var url = eval(
                  "String.format('" +
                    data.DataNavigateUrlFormatString +
                    "'," +
                    urlData.join(",") +
                    ")",
                );
                link.href = url;
              }
              ((format && "" != format) ||
                (data.DataTextField && "" != data.DataTextField)) &&
                (link.innerHTML = text);
            }
          }
        },
      }),
      ($T.Grid.GridImageColumn = {
        initializeCell: function (e) {
          e.innerHTML = "<img />";
        },
        populateCell: function (cell, dataItem) {
          if (dataItem) {
            var data = this._data,
              imgs = cell.getElementsByTagName("img"),
              img = imgs[0];
            if (img) {
              data.ImageUrl && "" != data.ImageUrl && (img.src = data.ImageUrl),
                data.AlternateText &&
                  "" != data.AlternateText &&
                  (img.alt = img.title = data.AlternateText);
              var format = data.DataAlternateTextFormatString,
                text = String.localeFormat(
                  "" == format ? "{0}" : format,
                  dataItem[data.DataAlternateTextField],
                ),
                urlData = copyDataFieldsValuesToArray(
                  data.DataImageUrlFields,
                  dataItem,
                );
              if (urlData && urlData.length > 0) {
                var url = eval(
                  "String.format('" +
                    (data.DataImageUrlFormatString || "{0}") +
                    "'," +
                    urlData.join(",") +
                    ")",
                );
                img.src = url;
              }
              data.ImageHeight &&
                "" != data.ImageHeight &&
                (img.style.height = data.ImageHeight),
                data.ImageWidth &&
                  "" != data.ImageWidth &&
                  (img.style.width = data.ImageWidth),
                ((format && "" != format) ||
                  (data.DataAlternateTextField &&
                    "" != data.DataAlternateTextField)) &&
                  (img.alt = img.title = text);
            }
          }
        },
      }),
      ($T.Grid.GridButtonColumn = {
        initializeCell: function (e, t) {
          var i,
            r = this._owner._owner,
            n = this._data;
          switch (n.ButtonType) {
            case "PushButton":
              i = '<input type="submit" onclick="{0}"/>';
              break;
            case "LinkButton":
              i = '<a href="#" onclick="{0}"></a>';
              break;
            case "ImageButton":
              i =
                '<input type="image" src="' + n.ImageUrl + '" onclick="{0}"/>';
              break;
            case "FontIconButton":
              "Delete" == n.CommandName
                ? (i =
                    '<button type="submit" class="t-button rgActionButton rgDel" value="Delete" title="Delete" onclick="{0}"><span class="t-font-icon rgIcon rgDelIcon"></span></button>')
                : "Edit" == n.CommandName &&
                  (i =
                    '<button type="submit" class="t-button rgActionButton rgEdit" value="Edit" title="Edit" onclick="{0}"><span class="t-font-icon rgIcon rgEditIcon"></span></button>');
          }
          var l = n.CommandArgument;
          (null != l && "" != l) || (l = t._itemIndexHierarchical);
          var o = String.format(
            this._getClickStatement(),
            r.get_id(),
            this.get_realOwner().get_id(),
            t.get_id(),
            n.CommandName,
            l,
          );
          (e.innerHTML = String.format(i, o)), this.populateCell(e, {});
        },
        populateCell: function (e, t) {
          var i,
            r = t[this._data.DataTextField];
          switch (
            ((null != r && "" != r) || (r = this._data.Text),
            this._data.ButtonType)
          ) {
            case "PushButton":
              (i = e.getElementsByTagName("input")[0]).value = r;
              break;
            case "LinkButton":
              (i = e.getElementsByTagName("a")[0]).innerHTML = r;
              break;
            case "ImageButton":
              ((i = e.getElementsByTagName("input")[0]).title = r), (i.alt = r);
          }
        },
        _getClickStatement: function () {
          return "if(!$find('{1}').fireCommand('{3}','{4}')) return false;";
        },
      }),
      ($T.Grid.GridEditCommandColumn = $T.Grid.GridButtonColumn),
      ($T.Grid.GridDragDropColumn = {
        initializeCell: function (e) {
          this.get_realOwner().get_owner()._renderMode ==
          Telerik.Web.UI.RenderMode.Classic
            ? (e.innerHTML = '<input class="rgDrag" type="button">')
            : (e.innerHTML = '<a class="rgDragIcon t-font-icon rgIcon"></a>');
        },
        populateCell: function (e, t) {},
      }),
      ($T.Grid.GridClientDeleteColumn = {
        initializeCell: $T.Grid.GridButtonColumn.initializeCell,
        populateCell: $T.Grid.GridButtonColumn.populateCell,
        _getClickStatement: function () {
          return "Batch" == this.get_realOwner()._data.EditMode
            ? "$find('{0}').get_batchEditingManager()._deleteRecord('{1}','{2}'); return false;"
            : "$find('{1}')._clientDelete(event); return false;";
        },
      }),
      ($T.Grid.GridClientSelectColumn = {
        initializeCell: function (e, t) {
          var i = this._owner._owner;
          e.innerHTML = String.format(
            "<input type='checkbox' id='{0}_SelectCheckBox' />",
            i.get_id() + "__" + t._itemIndexHierarchical,
          );
        },
      }),
      ($T.Grid.GridCalculatedColumn = {
        populateCell: function (cell, dataItem) {
          var data = this._data,
            cellValue = "",
            fieldsData = [],
            fieldName;
          if (void 0 !== data.Expression && "" != data.Expression) {
            fieldsData = [];
            for (var k = 0; k < data.DataFields.length; k++)
              (fieldName = data.DataFields[k]),
                Array.add(fieldsData, dataItem[fieldName]);
            var newValue = eval(
                "String.format('" +
                  data.Expression +
                  "'," +
                  fieldsData.join(",") +
                  ")",
              ),
              format = data.DataFormatString;
            "" == format && (format = "{0}");
            var evaluated = "";
            try {
              evaluated = eval(newValue);
            } catch (e) {}
            cellValue = String.localeFormat(format, evaluated);
          }
          cell.innerHTML = "" !== cellValue ? cellValue : "&nbsp;";
        },
      }),
      ($T.Grid.GridAttachmentColumn = {
        initializeCell: function (e) {
          e.innerHTML = "<a></a>";
        },
        populateCell: function (e, t, i) {
          var r,
            n = e.getElementsByTagName("a")[0];
          n || (this.initializeCell(e), (n = e.getElementsByTagName("a")[0])),
            "" !== i
              ? ((n.innerHTML = i),
                (r =
                  '{"ColumnUniqueName":"' +
                  this.get_uniqueName() +
                  '","FileName":"' +
                  i +
                  '"}'),
                n.setAttribute(
                  "onclick",
                  "if (!$find('" +
                    this._owner._owner.get_masterTableView().get_id() +
                    "').fireCommand('DownloadAttachment','" +
                    r +
                    "')) return false;",
                ),
                (n.href = "#"))
              : ((n.href = ""),
                (n.innerHTML = "&nbsp;"),
                (n.onclick = function () {}));
        },
      }),
      ($T.Grid.GridRatingColumn = {
        populateCell: function (e, t, i) {
          var r = $telerik.getElementByClassName(e, "RadRating"),
            n = r ? $find(r.id) : null;
          n &&
            ((n._caching = !0),
            (n._shouldUpdateClientState = !1),
            n.set_value(parseFloat(i)),
            (n._shouldUpdateClientState = !0));
        },
      }),
      ($T.Grid.GridGroupSplitterColumn = {
        populateCell: function (e) {
          Sys.UI.DomElement.addCssClass(e, "rgGroupCol");
        },
        populateEditCell: function (e) {
          Sys.UI.DomElement.addCssClass(e, "rgGroupCol");
        },
      }),
      ($T.Grid.GridExpandColumn = {
        initializeCell: function (e) {
          Sys.UI.DomElement.addCssClass(e, "rgExpandCol");
        },
      });
  })(Telerik.Web.UI),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridColumnAnimation = function () {
    Telerik.Web.UI.GridColumnAnimation.initializeBase(this),
      (this.$ = null),
      (this._owner = {}),
      (this._mouseMoveDelegate = null),
      (this._moueUpDelegate = null),
      (this._$animatedContainer = null),
      (this._$innerContainer = null),
      (this._animatedHeaderOffset = 0),
      (this._dragToGroupColumn = null),
      (this._nextCellPosition = 0),
      (this._animatedHeaderCells = []),
      (this._revertPendingCells = []),
      (this._initialDraggedHeaderCellIndex = -1),
      (this._draggedHeaderCellIndex = -1),
      (this._reorderDuration = 300),
      (this._revertDuration = 300),
      (this._allowColumnsReorderAnimation = !1),
      (this._allowColumnRevertAnimation = !1),
      (this._allowDragToGroup = !1),
      (this._allowFreeMove = !1);
  }),
  (Telerik.Web.UI.GridColumnAnimation.prototype = {
    initialize: function () {
      Telerik.Web.UI.GridColumnAnimation.callBaseMethod(this, "initialize");
      var e = this.get_owner().ClientSettings;
      (this._allowColumnsReorderAnimation =
        e.Animation.AllowColumnReorderAnimation &&
        e.AllowColumnsReorder &&
        1 == e.ColumnsReorderMethod),
        (this._allowColumnRevertAnimation =
          e.Animation.AllowColumnRevertAnimation),
        (this._allowDragToGroup = e.AllowDragToGroup),
        (this._allowFreeMove = this._allowDragToGroup),
        (this._mouseMoveDelegate = Function.createDelegate(
          this,
          this._mouseMove,
        )),
        (this._mouseUpDelegate = Function.createDelegate(this, this._mouseUp)),
        (this.$ = $telerik.$),
        (function (e) {
          e.fn.outerHtml = function (t) {
            if (!this[0]) return null;
            var i = t ? this.eq(0).clone() : this.eq(0).clone().empty();
            return e("<p>").append(i).html();
          };
        })(this.$);
    },
    _mouseDown: function (e, t) {
      var i = e.target || e.srcElement,
        r = t.get_element();
      i &&
        ((i !== r && i.parentNode !== r) ||
          ((this._dragToGroupColumn = t),
          (this._mouseDownPosition = [e.clientX, e.clientY]),
          this._allowColumnsReorderAnimation
            ? this.$(document).mousemove(this._mouseMoveDelegate)
            : this._createDraggedHeaderCell(e),
          this.$(document).mouseup(this._mouseUpDelegate),
          Telerik.Web.UI.Grid.ClearDocumentEvents()));
    },
    _createDraggedHeaderCell: function (e) {
      Telerik.Web.UI.Grid.CreateDragDrop(e, this._dragToGroupColumn, !0);
    },
    _createAnimatedContainer: function (e) {
      var t = this.$(e),
        i = t.closest("table");
      (this._animatedHeaderOffset = i.offset()),
        (this._animatedHeaderOffset.top = t.offset().top),
        (this._$innerContainer = this.$(
          $("<div>", { id: i.attr("id"), class: i.attr("class") }),
        ).css({
          height: "100%",
          overflow: this._allowFreeMove ? "visible" : "hidden",
          padding: "0",
          margin: "0",
          position: "absolute",
          border: "none",
          width: "100%",
        })),
        (this._$animatedContainer = this.$(
          this.$(this.get_owner().get_element()).outerHtml(),
        )
          .append(this._$innerContainer)
          .css({
            left: this._animatedHeaderOffset.left + "px",
            top: this._animatedHeaderOffset.top + "px",
            width: i.parent().width() + "px",
            height: t.outerHeight() - 1 + "px",
            overflow: this._allowFreeMove ? "visible" : "hidden",
            padding: "0",
            margin: "0",
            position: "absolute",
            borderStyle: "none none solid none",
          })
          .appendTo(document.body));
      var r = this;
      this.$("th", t.parent()).each(function (t) {
        if (0 !== this.clientWidth) {
          var i = r._createAnimatedCell(this);
          this === e &&
            (i
              .addClass("rgDraggedHeader")
              .attr("title", "")
              .css({ opacity: "0.8", zIndex: "9999" }),
            (r._draggedHeaderCellIndex = r._animatedHeaderCells.length),
            (r._initialDraggedHeaderCellIndex = r._draggedHeaderCellIndex));
          r._$innerContainer.append(i),
            r._animatedHeaderCells.push(
              new Telerik.Web.UI.GridAnimatedHeaderCell(
                i,
                r.get_reorderDuration(),
                this.UniqueName,
              ),
            );
        }
      });
    },
    _createAnimatedCell: function (e) {
      var t = this.$(e);
      return this._changeElementTag(e, "div").css({
        position: "absolute",
        left: this._getNextCellPosition(e),
        width: t.width() + "px",
        cursor: "default",
      });
    },
    _getNextCellPosition: function (e) {
      var t = this._nextCellPosition;
      return (this._nextCellPosition += this.$(e).outerWidth()), t;
    },
    _changeElementTag: function (e, t) {
      if ((e = e.jquery && e.length ? e[0] : e).tagName) {
        var i = this.$(e).html(),
          r = this.$(e).outerHtml(),
          n = e.tagName.toLowerCase();
        return (
          (r = r
            .replace("<" + e.tagName, "<" + n)
            .replace(e.tagName + ">", n + ">")),
          this.$(r.replace("<" + n, "<" + t).replace(n + ">", t + ">")).html(i)
        );
      }
    },
    _mouseMove: function (e) {
      if (this._mouseDownPosition) {
        if (
          !(
            Math.abs(this._mouseDownPosition[0] - e.clientX) > 0 ||
            Math.abs(this._mouseDownPosition[1] - e.clientY) > 0
          )
        )
          return;
        this._createAnimatedContainer(this._dragToGroupColumn.get_element()),
          (this._mouseDownPosition = null);
      }
      this._handleMouseMoveInternal(e);
    },
    _handleMouseMoveInternal: function (e) {
      this._setMoveDirection(e),
        this._getDraggedHeaderCell().moveWithCursor(e, this._allowFreeMove),
        (this._mouseTrackOrigin = this._getMouseTrackOrigin(e)),
        this._isTrackOriginOverHeader() &&
        !this._getDraggedHeaderCell().isPointOverOrigin(this._mouseTrackOrigin)
          ? this._reorderHeaderCells()
          : this._revertHeaderCellsToOrigin(),
        this._allowDragToGroup && this._updateGroupPanelIndicators(e);
    },
    _updateGroupPanelIndicators: function (e) {
      this._isDraggedHeaderOverGroupPanel()
        ? (Telerik.Web.UI.Grid.CreateReorderIndicators(
            this.get_owner()._groupPanel.get_element(),
            this.get_owner().Skin,
            this.get_owner()._imagesPath,
            !0,
            this.get_owner().get_id(),
          ),
          Telerik.Web.UI.Grid.MoveReorderIndicators(
            e,
            this.get_owner()._groupPanel.get_element(),
            !0,
            this.get_owner().get_id(),
          ))
        : this._hideReorderIndicators();
    },
    _hideReorderIndicators: function () {
      Telerik.Web.UI.Grid.ReorderIndicator1 &&
        ((Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility = "hidden"),
        (Telerik.Web.UI.Grid.ReorderIndicator1.style.display = "none"),
        (Telerik.Web.UI.Grid.ReorderIndicator1.style.position = "absolute"),
        (Telerik.Web.UI.Grid.ReorderIndicator2.style.visibility =
          Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility),
        (Telerik.Web.UI.Grid.ReorderIndicator2.style.display =
          Telerik.Web.UI.Grid.ReorderIndicator1.style.display),
        (Telerik.Web.UI.Grid.ReorderIndicator2.style.position =
          Telerik.Web.UI.Grid.ReorderIndicator1.style.position));
    },
    _getMoveDirection: function () {
      return this._moveDirection || 0;
    },
    _setMoveDirection: function (e) {
      var t = this._prevPageX || e.pageX;
      (this._moveDirection = e.pageX - t), (this._prevPageX = e.pageX);
    },
    _isTrackOriginOverHeader: function () {
      var e = Telerik.Web.UI.Grid.Animation;
      return (
        !!this._mouseTrackOrigin &&
        e.containsPoint(
          e.getBoundingRectangle(this._$animatedContainer),
          this._mouseTrackOrigin,
        )
      );
    },
    _getLastMovedHeaderWidth: function () {
      return (
        this._lastMovedCellWidth ||
          (this._lastMovedCellWidth =
            this._getDraggedHeaderCell().get_animationWidth()),
        this._lastMovedCellWidth
      );
    },
    _updateLastMovedHeaderWidth: function (e) {
      this._lastMovedCellWidth = Math.max(
        e.get_animationWidth(),
        this._getDraggedHeaderCell().get_animationWidth(),
      );
    },
    _reorderHeaderCells: function () {
      var e =
          this._animatedHeaderOffset.left +
          this._getDraggedHeaderCell().get_draggedPosition(),
        t = this._draggedHeaderCellIndex,
        i = null;
      if (this._getMoveDirection() > 0 || e < this._mouseTrackOrigin.left)
        for (
          e += this._getLastMovedHeaderWidth();
          e < this._mouseTrackOrigin.left &&
          t < this._animatedHeaderCells.length - 1;

        )
          t++,
            (e += (i = this._animatedHeaderCells[t]).get_animationWidth()),
            i.canMove() && this._moveCell(t, "left");
      else if (this._getMoveDirection() < 0 || e >= this._mouseTrackOrigin.left)
        for (; e > this._mouseTrackOrigin.left && t > 0; )
          t--,
            (e -= (i = this._animatedHeaderCells[t]).get_animationWidth()),
            i.canMove() && this._moveCell(t, "right");
    },
    _moveCell: function (e, t) {
      var i = this._animatedHeaderCells[e];
      i.isPointOver(this._mouseTrackOrigin)
        ? (this._updateLastMovedHeaderWidth(i),
          this._getDraggedHeaderCell().set_draggedPosition(
            i.get_currentPosition(),
          ))
        : i.isPointOverOrigin(this._mouseTrackOrigin) &&
          (this._updateLastMovedHeaderWidth(i),
          this._getDraggedHeaderCell().set_draggedPosition(
            i.get_originalPosition(),
          )),
        this._exchangeCellPosition(e),
        this._updateRevertState(i),
        "left" === t
          ? i.moveLeft(this._getDraggedHeaderCell().get_animationWidth())
          : i.moveRight(this._getDraggedHeaderCell().get_animationWidth());
    },
    _updateRevertState: function (e) {
      if (e.isAtOrigin()) this._revertPendingCells.push(e);
      else if (this._revertPendingCells.length > 0) {
        var t = Array.indexOf(this._revertPendingCells, e);
        t > -1 && this._revertPendingCells.splice(t, 1);
      }
    },
    _exchangeCellPosition: function (e) {
      var t = this._draggedHeaderCellIndex,
        i = this._getDraggedHeaderCell();
      this._animatedHeaderCells.splice(t, 1),
        this._animatedHeaderCells.splice(e, 0, i),
        (this._draggedHeaderCellIndex = e);
    },
    _revertHeaderCellsToOrigin: function () {
      if (this._revertPendingCells.length > 0) {
        this._initialDraggedHeaderCellIndex !== this._draggedHeaderCellIndex &&
          this._exchangeCellPosition(this._initialDraggedHeaderCellIndex);
        var e = this._getDraggedHeaderCell();
        for (
          e.get_draggedPosition() !== e.get_originalPosition() &&
          (this._updateLastMovedHeaderWidth(e),
          e.set_draggedPosition(e.get_originalPosition()));
          this._revertPendingCells.length;

        )
          this._revertPendingCells.pop().moveToOrigin();
      }
    },
    _getMouseTrackOrigin: function (e) {
      var t = { left: e.pageX, top: e.pageY },
        i = Telerik.Web.UI.Grid.Animation.getTrackedPoint();
      return !this._allowFreeMove && i && (t.top = i.top), t;
    },
    _getDraggedHeaderCell: function () {
      return this._animatedHeaderCells[this._draggedHeaderCellIndex];
    },
    _isDraggedHeaderOverGroupPanel: function () {
      return (
        !!this._mouseTrackOrigin &&
        this._allowDragToGroup &&
        this.get_owner()._groupPanel &&
        Telerik.Web.UI.Grid.Animation.containsPoint(
          this._getGroupPanelBoundingRectangle(),
          this._mouseTrackOrigin,
        )
      );
    },
    _getGroupPanelBoundingRectangle: function () {
      return (
        this._cachedGroupPanelRect ||
          (this._cachedGroupPanelRect =
            Telerik.Web.UI.Grid.Animation.getBoundingRectangle(
              this.get_owner()._groupPanel.get_element(),
            )),
        this._cachedGroupPanelRect
      );
    },
    _mouseUp: function (e) {
      if (
        (clearTimeout(this._mouseMoveTimeout),
        !this._mouseDownPosition && this._allowColumnsReorderAnimation)
      ) {
        var t = this._getDraggedHeaderCell().get_element().parent()[0].id,
          i = $find(t);
        if (
          this.get_owner().ClientSettings.AllowColumnsReorder &&
          this._isTrackOriginOverHeader()
        ) {
          var r = this._getReorderColumnNames();
          return (
            r && i && i.reorderColumns(r.first, r.second),
            this._clearAnimationData(),
            this._removeAnimatedContainer(),
            void Telerik.Web.UI.Grid.RestoreDocumentEvents()
          );
        }
        if (
          (this._revertHeaderCellsToOrigin(),
          this.get_owner().ClientSettings.AllowDragToGroup &&
            this._isDraggedHeaderOverGroupPanel())
        ) {
          var n = i.getColumnByUniqueName(
            this._getDraggedHeaderCell().get_columnName(),
          );
          n &&
            n._data.Groupable &&
            (this._clearAnimationData(),
            this._removeAnimatedContainer(),
            this._hideReorderIndicators(),
            i.groupColumn(n.get_element().UniqueName));
        } else this._moveDraggedCellToOrigin();
      } else
        this._allowDragToGroup && this._dragToGroupColumn
          ? (this._dragToGroupColumn._onMouseUpHandler(e),
            this._allowColumnRevertAnimation &&
              Telerik.Web.UI.Grid.AnimateRevertDragDrop(
                this._dragToGroupColumn,
                this.get_revertDuration(),
              ))
          : (this._dragToGroupColumn._onMouseUpHandler(e),
            this._dragToGroupColumn && this._allowColumnRevertAnimation
              ? Telerik.Web.UI.Grid.AnimateRevertDragDrop(
                  this._dragToGroupColumn,
                  this.get_revertDuration(),
                )
              : Telerik.Web.UI.Grid.DestroyDragDrop());
      this._clearAnimationData(), Telerik.Web.UI.Grid.RestoreDocumentEvents();
    },
    _getReorderColumnNames: function () {
      for (
        var e = this._getDraggedHeaderCell().get_columnName(), t = "", i = 0;
        i < this._revertPendingCells.length;
        i++
      ) {
        var r = this._revertPendingCells[i];
        if (
          !r.isDragged() &&
          r.get_originalPosition() ===
            this._getDraggedHeaderCell().get_currentPosition()
        ) {
          t = r.get_columnName();
          break;
        }
      }
      return e && t && e !== t ? { first: e, second: t } : null;
    },
    _moveDraggedCellToOrigin: function () {
      var e = this._getDraggedHeaderCell();
      if (this._allowColumnRevertAnimation) {
        var t = this;
        e.get_element().animate(
          { left: e.get_originalPosition(), top: 0 },
          this.get_revertDuration(),
          function () {
            t._removeAnimatedContainer();
          },
        );
      } else this._removeAnimatedContainer();
    },
    _clearAnimationData: function () {
      (this._mouseTrackOrigin = -1),
        (this._nextCellPosition = 0),
        (this._revertPendingCells = []),
        (this._animatedHeaderCells = []),
        (this._draggedHeaderCellIndex = -1),
        (this._initialDraggedHeaderCellIndex = -1),
        (this._lastMovedCellWidth = null),
        (this._moveDirection = 0),
        (this._prevPageX = 0),
        (this._mouseMoveInProgress = !1),
        (this._dragToGroupColumn = null),
        (this._mouseDownPosition = null),
        Telerik.Web.UI.Grid.Animation.clearElementRelativeMousePoint(),
        this._clearHandlers();
    },
    _clearHandlers: function () {
      this.$(document).unbind("mousemove", this._mouseMoveDelegate),
        this.$(document).unbind("mouseup", this._mouseUpDelegate);
    },
    _removeAnimatedContainer: function () {
      this._$animatedContainer.remove();
    },
    get_reorderDuration: function () {
      return this._reorderDuration;
    },
    set_reorderDuration: function (e) {
      this._reorderDuration = e;
    },
    get_revertDuration: function () {
      return this._revertDuration;
    },
    set_revertDuration: function (e) {
      this._revertDuration = e;
    },
    get_owner: function () {
      return this._owner;
    },
    set_owner: function (e) {
      this._owner = e;
    },
  }),
  Telerik.Web.UI.GridColumnAnimation.registerClass(
    "Telerik.Web.UI.GridColumnAnimation",
    Sys.Component,
  ),
  (Telerik.Web.UI.GridAnimatedHeaderCell = function (e, t, i) {
    (this._$element = e),
      (this._columnName = i),
      (this._originalPosition = parseInt(e.css("left"), 10)),
      (this._currentPosition = this._originalPosition),
      (this.className = this._$element[0].className),
      (this._animated = !1),
      (this._animationDuration = t),
      (this._originalOffset = this._$element.offset()),
      (this._originalParentOffset = this._$element.parent().offset()),
      (this._originBoundingRectangle = {
        left: this._originalParentOffset.left + this.get_originalPosition(),
        top: this._originalOffset.top,
        width: this.get_animationWidth(),
        height:
          this._$element.parent().height() -
          (this._$element.innerHeight() - this._$element.height()),
      }),
      (this._$element[0].innerHTML = String.format(
        "<span style='display:inline-block;vertical-align:middle;width:100%;'>{0}</span>",
        this._$element.html(),
      )),
      this._$element.prepend(
        "<span style='display:inline-block;vertical-align:middle;height:100%;'></span>",
      ),
      this._$element.height(this._originBoundingRectangle.height);
  }),
  (Telerik.Web.UI.GridAnimatedHeaderCell.prototype = {
    isDragged: function () {
      return this._$element[0].className.indexOf("rgDraggedHeader") > -1;
    },
    get_element: function () {
      return this._$element;
    },
    get_columnName: function () {
      return this._columnName;
    },
    isAtOrigin: function () {
      return this.get_currentPosition() === this.get_originalPosition();
    },
    get_originalPosition: function () {
      return this._originalPosition;
    },
    get_currentPosition: function () {
      return this._currentPosition;
    },
    get_draggedPosition: function () {
      return this._currentPosition;
    },
    set_draggedPosition: function (e) {
      this.isDragged() && (this._currentPosition = e);
    },
    get_animationWidth: function () {
      return this._$element.outerWidth();
    },
    get_animationDuration: function () {
      return this._animationDuration;
    },
    isPointOver: function (e) {
      return Telerik.Web.UI.Grid.Animation.containsPoint(
        Telerik.Web.UI.Grid.Animation.getBoundingRectangle(this.get_element()),
        e,
      );
    },
    isPointOverOrigin: function (e) {
      return Telerik.Web.UI.Grid.Animation.containsPoint(
        this._originBoundingRectangle,
        e,
      );
    },
    canMove: function () {
      return (
        this.className.indexOf("rgGroupCol") < 0 &&
        this.className.indexOf("rgExpandCol") < 0
      );
    },
    canMoveLeft: function () {
      return (
        this.canMove() &&
        this.get_currentPosition() > 0 &&
        this.get_originalPosition() <= this.get_currentPosition()
      );
    },
    canMoveRight: function () {
      var e = this._$element.parent().width() - this._$element.outerWidth();
      return (
        this.canMove() &&
        this.get_currentPosition() < e &&
        this.get_originalPosition() >= this.get_currentPosition()
      );
    },
    moveLeft: function (e) {
      this.moveTo(e, "left");
    },
    moveRight: function (e) {
      this.moveTo(e, "right");
    },
    moveToOrigin: function () {
      this.moveTo(0, "origin");
    },
    moveTo: function (e, t) {
      var i = { left: null };
      switch (t) {
        case "left":
          this.canMoveLeft() &&
            (i.left =
              this.get_currentPosition() === this.get_originalPosition()
                ? this.get_originalPosition() - e
                : this.get_originalPosition());
          break;
        case "right":
          this.canMoveRight() &&
            (i.left =
              this.get_currentPosition() === this.get_originalPosition()
                ? this.get_originalPosition() + e
                : this.get_originalPosition());
          break;
        case "origin":
          this.get_currentPosition !== this.get_originalPosition() &&
            (i.left = this.get_originalPosition());
      }
      if (null !== i.left) {
        this._currentPosition = i.left;
        var r = this;
        setTimeout(function () {
          r._$element.stop(!1, !1).animate(i, r.get_animationDuration());
        }, 10);
      }
    },
    moveWithCursor: function (e, t) {
      if (this.isDragged()) {
        var i = {};
        t
          ? ((i.left = e.pageX - this._originalParentOffset.left + "px"),
            (i.top = e.pageY - this._originalParentOffset.top + "px"))
          : (Telerik.Web.UI.Grid.Animation.getElementRelativeTrackedPoint() ||
              Telerik.Web.UI.Grid.Animation.trackElementRelativeMousePoint(
                this.get_element(),
                e,
              ),
            (i.left =
              e.pageX -
              this._originalParentOffset.left -
              Telerik.Web.UI.Grid.Animation.getElementRelativeTrackedPoint()
                .left +
              "px")),
          this.get_element().css(i);
      }
    },
  }),
  Type.registerNamespace("Telerik.Web.UI.Grid"),
  Type.registerNamespace("Telerik.Web.UI.Grid.Animation"),
  (Telerik.Web.UI.Grid.Animation.getBoundingRectangle = function (e) {
    var t = (e = e.jquery ? e : $telerik.$(e)).offset(),
      i = {};
    return (
      (i.left = i.x = t.left),
      (i.width = e.outerWidth()),
      (i.top = i.y = t.top),
      (i.height = e.outerHeight()),
      i
    );
  }),
  (Telerik.Web.UI.Grid.Animation.containsPoint = function (e, t) {
    return (
      void 0 === e.x && (e.x = e.left),
      void 0 === e.y && (e.y = e.top),
      void 0 === t.x && (t.x = t.left),
      void 0 === t.y && (t.y = t.top),
      $telerik.containsPoint(e, t.x, t.y)
    );
  }),
  (Telerik.Web.UI.Grid.Animation.trackElementRelativeMousePoint = function (
    e,
    t,
  ) {
    t.pageX || $telerik.$.event.fix(t);
    var i = (e = e.jquery ? e : $telerik.$(e)).offset();
    Telerik.Web.UI.Grid.Animation._trackedElement = e;
    var r = (Telerik.Web.UI.Grid.Animation._trackedElementRelativeMousePoint =
      {});
    (r.left = r.x = t.pageX - i.left), (r.top = r.y = t.pageY - i.top);
  }),
  (Telerik.Web.UI.Grid.Animation.getTrackedPoint = function () {
    var e = Telerik.Web.UI.Grid.Animation.getElementRelativeTrackedPoint();
    if (!Telerik.Web.UI.Grid.Animation._trackedElement || !e) return null;
    var t = Telerik.Web.UI.Grid.Animation._trackedElement.offset(),
      i = {};
    return (i.left = i.x = t.left + e.left), (i.top = i.y = t.top + e.top), i;
  }),
  (Telerik.Web.UI.Grid.Animation.getElementRelativeTrackedPoint = function () {
    return Telerik.Web.UI.Grid.Animation._trackedElementRelativeMousePoint;
  }),
  (Telerik.Web.UI.Grid.Animation.clearElementRelativeMousePoint = function () {
    (Telerik.Web.UI.Grid.Animation._trackedElement = null),
      (Telerik.Web.UI.Grid.Animation._trackedElementRelativeMousePoint = null);
  }),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridColumnResizer = function (e, t, i) {
    Telerik.Web.UI.GridColumnResizer.initializeBase(this),
      (this._column = e),
      (this._isRealTimeResize = t),
      (this._elementToAttachMove = i
        ? document
        : this._column._owner._owner.get_element()),
      (this._currentWidth = null),
      (this._leftResizer = document.createElement("span")),
      (this._leftResizer.style.backgroundColor = "navy"),
      (this._leftResizer.style.width = "1px"),
      (this._leftResizer.style.position = "absolute"),
      (this._leftResizer.style.cursor = "e-resize"),
      (this._rightResizer = document.createElement("span")),
      (this._rightResizer.style.backgroundColor = "navy"),
      (this._rightResizer.style.width = "1px"),
      (this._rightResizer.style.position = "absolute"),
      (this._rightResizer.style.cursor = "e-resize"),
      (this._resizerToolTip = document.createElement("span")),
      (this._resizerToolTip.style.position = "absolute"),
      (this._resizerToolTip.style.zIndex = 1e4),
      (this._resizerToolTip.style.display =
        "" ==
        this._column._owner._owner.ClientSettings.ClientMessages
          .ColumnResizeTooltipFormatString
          ? "none"
          : ""),
      (this._resizerToolTipFormatString =
        this._column._owner._owner.ClientSettings.ClientMessages.ColumnResizeTooltipFormatString),
      "" != this._column._owner._owner.Skin &&
        ((this._resizerToolTip.className = String.format(
          "GridToolTip GridToolTip_{0}",
          this._column._owner._owner.Skin,
        )),
        (this._leftResizer.className = String.format(
          "GridLeftResizer GridLeftResizer_{0}",
          this._column._owner._owner.Skin,
        )),
        (this._rightResizer.className = String.format(
          "GridRightResizer GridRightResizer_{0}",
          this._column._owner._owner.Skin,
        ))),
      (this._column._owner._owner._embeddedSkin &&
        "" != this._column._owner._owner.Skin) ||
        ((this._resizerToolTip.style.backgroundColor = "#F5F5DC"),
        (this._resizerToolTip.style.border = "1px solid"),
        (this._resizerToolTip.style.font = "icon"),
        (this._resizerToolTip.style.padding = "2px"));
    var r = this._column.get_element().offsetWidth;
    (this._resizerToolTip.innerHTML = this._applyTooltipText(r)),
      document.body.appendChild(this._leftResizer),
      document.body.appendChild(this._rightResizer),
      document.body.appendChild(this._resizerToolTip),
      (this._resizerToolTip.style.width =
        this._resizerToolTip.clientWidth +
        (parseInt(r, 10).toString().length >= 3 ? 0 : 10) +
        "px"),
      (this.CanDestroy = !0),
      (this._onMouseUpDelegate = $telerik.addMobileHandler(
        this,
        document,
        "mouseup",
        this._onMouseUpHandler,
        null,
        !0,
      )),
      (this._onMouseMoveDelegate = $telerik.addMobileHandler(
        this,
        this._elementToAttachMove,
        "mousemove",
        this._onMouseMoveHandler,
      ));
  }),
  (Telerik.Web.UI.GridColumnResizer.prototype = {
    dispose: function () {
      try {
        this._destroy();
      } catch (e) {}
      this._onMouseUpDelegate &&
        $telerik.removeMobileHandler(
          document,
          "mouseup",
          this._onMouseUpDelegate,
          null,
          !0,
        ),
        this._onMouseMoveDelegate &&
          $telerik.removeMobileHandler(
            this._elementToAttachMove,
            "mousemove",
            this._onMouseMoveDelegate,
          ),
        (this._leftResizer = null),
        (this._rightResizer = null),
        (this._resizerToolTip = null),
        (this._elementToAttachMove = null);
    },
    _position: function (e) {
      (this._leftResizer.style.top =
        Telerik.Web.UI.Grid.FindPosY(this._column.get_element()) + "px"),
        (this._leftResizer.style.left =
          Telerik.Web.UI.Grid.FindPosX(this._column.get_element()) + "px"),
        (this._rightResizer.style.top = this._leftResizer.style.top),
        (this._rightResizer.style.left =
          parseInt(this._leftResizer.style.left, 10) +
          this._column.get_element().offsetWidth +
          "px");
      var t =
        parseInt(this._rightResizer.style.top, 10) -
        this._resizerToolTip.offsetHeight -
        2;
      t < 0 &&
        (t +=
          this._resizerToolTip.offsetHeight +
          this._column.get_element().offsetHeight +
          2),
        (this._resizerToolTip.style.top = t + "px");
      var i = parseInt(this._rightResizer.style.left, 10) - 5;
      (this._resizerToolTip.style.left = i + "px"),
        $telerik.elementOverflowsRight(
          $telerik.getViewPortSize(),
          this._resizerToolTip,
        ) &&
          (this._resizerToolTip.style.left =
            i - this._resizerToolTip.offsetWidth + "px"),
        parseInt(this._leftResizer.style.left, 10) <
          Telerik.Web.UI.Grid.FindPosX(this._column._owner.get_element()) &&
          (this._leftResizer.style.display = "none");
      var r = this._column,
        n = r._owner,
        l = n._owner,
        o = l.ClientSettings.Scrolling,
        a = n._hasMultiHeaders
          ? r.get_element().offsetHeight
          : n.get_element().tHead.offsetHeight;
      if (o.AllowScroll)
        if (o.UseStaticHeaders)
          this._leftResizer.style.height =
            l._gridDataDiv.clientHeight + a + "px";
        else {
          var s = l._gridDataDiv.clientHeight;
          n._hasMultiHeaders &&
            (s =
              s -
              n.get_element().tHead.offsetHeight +
              r.get_element().offsetHeight),
            (this._leftResizer.style.height = s + "px");
        }
      else
        this._leftResizer.style.height =
          n.get_element().tBodies[0].offsetHeight + a + "px";
      this._rightResizer.style.height = this._leftResizer.style.height;
    },
    _onMouseUpHandler: function (e) {
      this._destroy(e);
    },
    _onMouseMoveHandler: function (e) {
      $telerik.isTouchDevice && e.preventDefault(), this._move(e);
    },
    _destroy: function (e) {
      if (this.CanDestroy) {
        if (
          (this._onMouseUpDelegate &&
            ($telerik.removeMobileHandler(
              document,
              "mouseup",
              this._onMouseUpDelegate,
              null,
              !0,
            ),
            (this._onMouseUpDelegate = null)),
          this._onMouseMoveDelegate &&
            ($telerik.removeMobileHandler(
              this._elementToAttachMove,
              "mousemove",
              this._onMouseMoveDelegate,
            ),
            (this._onMouseMoveDelegate = null),
            (this._elementToAttachMove = null)),
          null != this._currentWidth)
        ) {
          var t = 0;
          if (this._currentWidth > 0) {
            var i = this._column,
              r = i._owner;
            (t = r._hasMultiHeaders
              ? Array.indexOf(r.get_columns(), i)
              : i.get_element().cellIndex),
              r.resizeColumn(t, this._currentWidth),
              (this._currentWidth = null);
          }
        }
        var n = this._column._owner._owner;
        (n._isResize = null),
          n.updateClientState(),
          document.body.removeChild(this._leftResizer),
          document.body.removeChild(this._rightResizer),
          document.body.removeChild(this._resizerToolTip),
          (this.CanDestroy = !1);
      }
    },
    _move: function (e) {
      var t = Telerik.Web.UI.Grid.FindPosX(this._column.get_element());
      (this._leftResizer.style.left = t + "px"),
        (this._rightResizer.style.left =
          parseInt(this._leftResizer.style.left, 10) +
          (Telerik.Web.UI.Grid.GetEventPosX(e) - t) +
          "px");
      var i = parseInt(this._rightResizer.style.left, 10) - 5;
      (this._resizerToolTip.style.left = i + "px"),
        $telerik.elementOverflowsRight(
          $telerik.getViewPortSize(),
          this._resizerToolTip,
        ) &&
          (this._resizerToolTip.style.left =
            i - this._resizerToolTip.offsetWidth + "px");
      var r =
          parseInt(this._rightResizer.style.left, 10) -
          parseInt(this._leftResizer.style.left, 10),
        n = this._resizerToolTip.offsetHeight;
      if (
        ((this._resizerToolTip.innerHTML = this._applyTooltipText(r)),
        this._resizerToolTip.offsetHeight > n &&
          (this._resizerToolTip.style.width =
            parseInt(this._resizerToolTip.style.width, 10) + 10 + "px"),
        Telerik.Web.UI.Grid.FireEvent(this._column._owner, "OnColumnResizing", [
          this._column.Index,
          r,
        ]))
      )
        if (((this._currentWidth = r), this._isRealTimeResize)) {
          var l =
            -1 != navigator.userAgent.indexOf("Safari") ||
            this._column._owner._hasMultiHeaders
              ? Telerik.Web.UI.Grid.GetRealCellIndex(
                  this._column._owner,
                  this._column.get_element(),
                )
              : this._column.get_element().cellIndex;
          this._column._owner.resizeColumn(l, r),
            (this._leftResizer.style.left = t + "px"),
            (this._rightResizer.style.left =
              t + this._column.get_element().offsetWidth + "px"),
            Telerik.Web.UI.Grid.FindPosY(this._leftResizer) !=
              Telerik.Web.UI.Grid.FindPosY(this._column.get_element()) &&
              ((this._leftResizer.style.top =
                Telerik.Web.UI.Grid.FindPosY(this._column.get_element()) +
                "px"),
              (this._rightResizer.style.top =
                Telerik.Web.UI.Grid.FindPosY(this._column.get_element()) +
                "px"));
          var o = this._column,
            a = o._owner,
            s = a._owner,
            d = s.ClientSettings.Scrolling,
            h = a._hasMultiHeaders
              ? o.get_element().offsetHeight
              : a.get_element().tHead.offsetHeight;
          if (d.AllowScroll)
            if (d.UseStaticHeaders)
              this._leftResizer.style.height =
                s._gridDataDiv.clientHeight + h + "px";
            else {
              var u = s._gridDataDiv.clientHeight;
              a._hasMultiHeaders &&
                (u =
                  u -
                  a.get_element().tHead.offsetHeight +
                  o.get_element().offsetHeight),
                (this._leftResizer.style.height = u + "px");
            }
          else
            this._leftResizer.style.height =
              a.get_element().tBodies[0].offsetHeight + h + "px";
          this._rightResizer.style.height = this._leftResizer.style.height;
        } else this._currentWidth = r;
    },
    _applyTooltipText: function (e) {
      return this._resizerToolTipFormatString.replace(/\{0[^\}]*\}/g, e);
    },
  }),
  Telerik.Web.UI.GridColumnResizer.registerClass(
    "Telerik.Web.UI.GridColumnResizer",
    null,
    Sys.IDisposable,
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  Type.registerNamespace("Telerik.Web.UI.Grid"),
  (Telerik.Web.UI.Grid._uniqueIDToClientID = function (e) {
    return e.replace(/[$:]/g, "_");
  }),
  (Telerik.Web.UI.Grid.getTableHeaderRow = function (e) {
    var t = null;
    if (e.tHead && "none" != e.tHead.style.display)
      for (var i = 0; i < e.tHead.rows.length; i++)
        if (
          null != e.tHead.rows[i] &&
          null != e.tHead.rows[i].cells[0] &&
          null != e.tHead.rows[i].cells[0].tagName &&
          "th" == e.tHead.rows[i].cells[0].tagName.toLowerCase()
        ) {
          t = e.tHead.rows[i];
          break;
        }
    return t;
  }),
  (Telerik.Web.UI.Grid.ShowContextMenu = function (e, t, i) {
    for (var r = e.get_columns(), n = 0; n < r.length; n++)
      r[n].get_uniqueName() == t && r[n].showHeaderMenu(i, 75, 20);
  }),
  (Telerik.Web.UI.Grid.FilterSearch = function (e, t) {
    for (
      var i = $find(e._filterCheckListClientID).get_items()._array, r = 0;
      r < i.length;
      r++
    )
      i[r].set_visible(
        i[r].get_text().toLowerCase().indexOf(t.value.toLowerCase()) >= 0,
      );
  }),
  (Telerik.Web.UI.Grid.hasEventAttached = function (e, t, i) {
    if ("object" != typeof e._events || null == e._events) return !1;
    var r = e._events[t];
    if (!(r instanceof Array)) return !1;
    for (var n = 0, l = r.length; n < l; n++) if (r[n].handler === i) return !0;
    return !1;
  }),
  (Telerik.Web.UI.Grid.ChangePageSize = function (e, t) {
    if (e && e.PageSize != t) {
      var i = e._raiseAction("PageSize", { newPageSize: parseInt(t, 10) });
      i.get_cancel() || e.set_pageSize(i.get_newPageSize());
    }
  }),
  (Telerik.Web.UI.Grid.SeoChangePageUrl = function (e, t, i, r) {
    var n,
      l,
      o,
      a = window.location.href,
      s = r == t ? i : String.format("{0}_{1}", i, r),
      d = !1;
    if (-1 == a.indexOf("?"))
      return (window.location.href += String.format("?{0}={1}", e, s)), !1;
    n = (l = a.split("?"))[0];
    for (var h = 0, u = (o = l[1].split("&")).length; h < u; h++)
      if (-1 != o[h].indexOf(e)) {
        (o[h] = String.format("{0}={1}", e, s)), (d = !0);
        break;
      }
    d || o.push(String.format("{0}={1}", e, s)),
      (window.location.href = String.format("{0}?{1}", n, o.join("&")));
  }),
  (Telerik.Web.UI.Grid.ChangePageIndexButtonClickHandler = function (
    e,
    t,
    i,
    r,
  ) {
    var n,
      l = $find(r).get_pageSize(),
      o = $find(i);
    if (!o) return !1;
    (n = o.get_value()), Telerik.Web.UI.Grid.SeoChangePageUrl(e, t, n, l);
  }),
  (Telerik.Web.UI.Grid.ChangePageSizeButtonClickHandler = function (
    e,
    t,
    i,
    r,
  ) {
    var n,
      l = $find(r).get_currentPageIndex() + 1,
      o = $find(i);
    if (!o) return !1;
    (n = o.get_value()), Telerik.Web.UI.Grid.SeoChangePageUrl(e, t, l, n);
  }),
  (Telerik.Web.UI.Grid.ChangingPageSizeComboHandler = function (e, t) {
    var i;
    if (
      (t.get_item
        ? (i = t.get_item())
        : t.get_index && (i = e.get_items().getItem(t.get_index())),
      i)
    ) {
      var r = i.get_attributes().getAttribute("ownerTableViewId"),
        n = null;
      if (((n = i.get_value() ? i.get_value() : i.get_text()), r && n)) {
        var l = $find(r);
        if (l && l.PageSize != n)
          l
            ._raiseAction("PageSize", { newPageSize: parseInt(n, 10) })
            .get_cancel() && t.set_cancel(!0);
      }
    }
  }),
  (Telerik.Web.UI.Grid.ChangePageSizeComboHandler = function (e, t) {
    var i;
    if (
      (t.get_item
        ? (i = t.get_item())
        : t.get_index && (i = e.get_items().getItem(t.get_index())),
      i)
    ) {
      var r = i.get_attributes().getAttribute("ownerTableViewId"),
        n = null;
      if (
        ((n = e.get_value
          ? e.get_value()
            ? e.get_value()
            : e.get_text()
          : i.get_value()
            ? i.get_value()
            : i.get_text()),
        r && n)
      ) {
        var l = parseInt(n, 10),
          o = $find(r);
        if (o) {
          var a = i.get_attributes().getAttribute("seoRedirectUrl");
          if (a) return (window.location.href = a), !1;
          o.set_pageSize(l);
        }
      }
    }
  }),
  (Telerik.Web.UI.Grid.Sort = function (e, t) {
    var i = e._raiseAction("Sort", { sortExpression: t });
    i.get_cancel() || ((t = i.get_sortExpression()), e.sort(t));
  }),
  (Telerik.Web.UI.Grid.GetRealCellIndex = function (e, t) {
    for (var i = 0; i < e.get_columns().length; i++)
      if (e.get_columns()[i].get_element() == t) return i;
  }),
  (Telerik.Web.UI.Grid.CopyAttributes = function (e, t) {
    for (var i = 0; i < t.attributes.length; i++)
      try {
        if ("id" == t.attributes[i].name.toLowerCase()) continue;
        null != t.attributes[i].value &&
          "null" != t.attributes[i].value &&
          "" != t.attributes[i].value &&
          e.setAttribute(t.attributes[i].name, t.attributes[i].value);
      } catch (e) {
        continue;
      }
  }),
  (Telerik.Web.UI.Grid.PositionDragElement = function (e, t) {
    var i = $telerik.isTouchDevice
        ? $telerik.getTouchEventLocation(t).x
        : t.clientX,
      r = $telerik.isTouchDevice
        ? $telerik.getTouchEventLocation(t).y
        : t.clientY;
    (e.style.top = r + $telerik.getDocumentElementScrollTop() + 10 + "px"),
      (e.style.left = i + $telerik.getDocumentElementScrollLeft() + 10 + "px"),
      ($telerik.isOpera || $telerik.isTouchDevice) &&
        (e.style.top =
          parseInt(e.style.top, 10) - document.body.scrollTop + "px");
  }),
  (Telerik.Web.UI.Grid.ClearDocumentEvents = function (e) {
    e ||
      (document.onmousedown != this.mouseDownHandler &&
        (this.documentOnMouseDown = document.onmousedown),
      (this.mouseDownHandler = function (e) {
        return !1;
      }),
      (document.onmousedown = this.mouseDownHandler)),
      document.onselectstart != this.selectStartHandler &&
        (this.documentOnSelectStart = document.onselectstart),
      document.ondragstart != this.dragStartHandler &&
        (this.documentOnDragStart = document.ondragstart),
      (this.selectStartHandler = function () {
        return !1;
      }),
      (this.dragStartHandler = function () {
        return !1;
      }),
      (document.onselectstart = this.selectStartHandler),
      (document.ondragstart = this.dragStartHandler);
  }),
  (Telerik.Web.UI.Grid.RestoreDocumentEvents = function () {
    "function" == typeof this.documentOnMouseDown &&
    document.onmousedown != this.mouseDownHandler
      ? (document.onmousedown = this.documentOnMouseDown)
      : (document.onmousedown = ""),
      "function" == typeof this.documentOnSelectStart &&
      document.onselectstart != this.selectStartHandler
        ? (document.onselectstart = this.documentOnSelectStart)
        : (document.onselectstart = ""),
      "function" == typeof this.documentOnDragStart &&
      document.ondragstart != this.dragStartHandler
        ? (document.ondragstart = this.documentOnDragStart)
        : (document.ondragstart = "");
  }),
  (Telerik.Web.UI.Grid.IsChildOf = function (e, t) {
    if (!e) return !1;
    for (; e.parentNode; ) {
      if (e.parentNode == t) return !0;
      e = e.parentNode;
    }
    return !1;
  }),
  (Telerik.Web.UI.Grid.GetCurrentElement = function (e) {
    var t;
    return (
      e || (e = window.event),
      (t = e.srcElement ? e.srcElement : e.target),
      Telerik.Web.UI.Grid.IsDomElement(t) ? t : null
    );
  }),
  (Telerik.Web.UI.Grid.IsDomElement = function (e) {
    return "object" == typeof HTMLElement
      ? e instanceof HTMLElement
      : e &&
          "object" == typeof e &&
          1 === e.nodeType &&
          "string" == typeof e.nodeName;
  }),
  (Telerik.Web.UI.Grid.GetNonOverflowingCoordinates = function (e, t, i) {
    var r = i(window),
      n = r.width(),
      l = r.height(),
      o = $telerik.getBounds(e),
      a = i(e).offset(),
      s = a.left,
      d = a.top,
      h = r.scrollLeft(),
      u = r.scrollTop(),
      _ = d + o.height > l + u,
      g = d < u,
      c = s + o.width > n + h;
    if (!(_ || g || c || s < h)) return { x: s, y: d };
    switch (t) {
      case 0:
        (s = n / 2 + h - e.offsetWidth / 2),
          (d = l / 2 + u - e.offsetHeight / 2);
        break;
      case 1:
        (s = n + h - e.offsetWidth), (d = l + u - e.offsetHeight);
        break;
      case 2:
        (s = h), (d = l + u - e.offsetHeight);
        break;
      case 3:
        (s = n + h - e.offsetWidth), (d = u);
        break;
      case 4:
        (s = h), (d = u);
    }
    return { x: s, y: d };
  }),
  (Telerik.Web.UI.Grid.GetCurrentTouchElement = function (e) {
    if ($telerik.isTouchDevice) return $telerik.getTouchTarget(e);
  }),
  (Telerik.Web.UI.Grid.CreateReorderIndicators = function (e, t, i, r, n) {
    var l,
      o,
      a = $find(n);
    null == this.ReorderIndicator1 &&
      null == this.ReorderIndicator2 &&
      ((this.ReorderIndicator1 = document.createElement("span")),
      (this.ReorderIndicator2 = document.createElement("span")),
      "" != i
        ? (((l = new Image()).src = i + "MoveDown.gif"),
          ((o = new Image()).src = i + "MoveUp.gif"),
          (this.ReorderIndicator1.innerHTML =
            '<img src="' + i + 'MoveDown.gif" alt="reorder indicator" />'),
          (this.ReorderIndicator2.innerHTML =
            '<img src="' + i + 'MoveUp.gif" alt="reorder indicator" />'),
          (this.ReorderIndicator1.className = "GridReorderTopImage_" + t),
          (this.ReorderIndicator2.className = "GridReorderBottomImage_" + t))
        : "" == t
          ? ((this.ReorderIndicator1.innerHTML = "&darr;"),
            (this.ReorderIndicator2.innerHTML = "&uarr;"))
          : ((this.ReorderIndicator1.className =
              "GridReorderTop GridReorderTop_" + t),
            (this.ReorderIndicator2.className =
              "GridReorderBottom GridReorderBottom_" + t)),
      a._renderMode != Telerik.Web.UI.RenderMode.Lite &&
        ((this.ReorderIndicator1.style.backgroundColor = "transparent"),
        (this.ReorderIndicator1.style.color = "darkblue"),
        (this.ReorderIndicator1.style.fontSize = "1px"),
        (this.ReorderIndicator2.style.backgroundColor =
          this.ReorderIndicator1.style.backgroundColor),
        (this.ReorderIndicator2.style.color =
          this.ReorderIndicator1.style.color),
        (this.ReorderIndicator2.style.fontSize =
          this.ReorderIndicator1.style.fontSize)),
      r &&
        "TH" == e.nodeName &&
        a &&
        a.GridDataDiv &&
        (a.GridDataDiv.scrollLeft,
        a.ClientSettings.Scrolling.UseStaticHeaders || a.GridDataDiv.scrollTop),
      (this.ReorderIndicator1.style.top =
        Telerik.Web.UI.Grid.FindPosY(e) -
        this.ReorderIndicator1.offsetHeight +
        "px"),
      (this.ReorderIndicator1.style.left =
        Telerik.Web.UI.Grid.FindPosX(e) + "px"),
      (this.ReorderIndicator2.style.top =
        Telerik.Web.UI.Grid.FindPosY(e) + e.offsetHeight + "px"),
      (this.ReorderIndicator2.style.left = this.ReorderIndicator1.style.left),
      (this.ReorderIndicator1.style.visibility = "hidden"),
      (this.ReorderIndicator1.style.display = "none"),
      (this.ReorderIndicator1.style.position = "absolute"),
      (this.ReorderIndicator2.style.visibility =
        this.ReorderIndicator1.style.visibility),
      (this.ReorderIndicator2.style.display =
        this.ReorderIndicator1.style.display),
      (this.ReorderIndicator2.style.position =
        this.ReorderIndicator1.style.position),
      document.body.appendChild(this.ReorderIndicator1),
      document.body.appendChild(this.ReorderIndicator2),
      "" != i &&
        ((this.ReorderIndicator1.style.marginLeft =
          -parseInt(l.width / 2, 10) + "px"),
        (this.ReorderIndicator2.style.marginLeft =
          -parseInt(o.width / 2, 10) + "px"),
        (l = null),
        (o = null)));
  }),
  (Telerik.Web.UI.Grid.NavigateToPage = function (e, t) {
    var i,
      r = $find(e);
    if (r) {
      var n = r.get_currentPageIndex();
      if (
        ("Next" == t
          ? n++
          : "Prev" == t
            ? n--
            : (n =
                "First" == t
                  ? 0
                  : "Last" == t
                    ? r.get_pageCount() - 1
                    : parseInt(t, 10) - 1),
        n < 0 || n > r.get_pageCount() - 1)
      )
        return !1;
      (i = r._raiseAction("Page", { newPageIndex: n })).get_cancel() ||
        ((n = i.get_newPageIndex()), r.page(n + 1));
    }
  }),
  (Telerik.Web.UI.Grid.DestroyReorderIndicators = function () {
    null != this.ReorderIndicator1 &&
      null != this.ReorderIndicator2 &&
      (document.body.removeChild(this.ReorderIndicator1),
      document.body.removeChild(this.ReorderIndicator2),
      (this.ReorderIndicator1 = null),
      (this.ReorderIndicator2 = null));
  }),
  (Telerik.Web.UI.Grid.MoveReorderIndicators = function (e, t, i, r) {
    if (null != this.ReorderIndicator1 && null != this.ReorderIndicator2) {
      (this.ReorderIndicator1.style.visibility = "visible"),
        (this.ReorderIndicator1.style.display = ""),
        (this.ReorderIndicator2.style.visibility = "visible"),
        (this.ReorderIndicator2.style.display = "");
      var n = $find(r);
      i &&
        "TH" == t.nodeName &&
        n &&
        n.GridDataDiv &&
        (n.GridDataDiv.scrollLeft,
        n.ClientSettings.Scrolling.UseStaticHeaders || n.GridDataDiv.scrollTop);
      var l = 0;
      i &&
        "TH" == t.nodeName &&
        n &&
        null != this._columnInitiatorIndex &&
        null != this._columnOverIndex &&
        this._columnInitiatorIndex < this._columnOverIndex &&
        (l = t.offsetWidth),
        (this.ReorderIndicator1.style.top =
          Telerik.Web.UI.Grid.FindPosY(t) -
          this.ReorderIndicator1.offsetHeight +
          "px"),
        (this.ReorderIndicator1.style.left =
          Telerik.Web.UI.Grid.FindPosX(t) + l + "px"),
        (this.ReorderIndicator2.style.top =
          Telerik.Web.UI.Grid.FindPosY(t) + t.offsetHeight + "px"),
        (this.ReorderIndicator2.style.left = this.ReorderIndicator1.style.left);
    }
  }),
  (Telerik.Web.UI.Grid.getVisibleCols = function (e) {
    for (var t = 0, i = 0, r = e.length; i < r; i++)
      "none" != e[i].style.display && t++;
    return t;
  }),
  (Telerik.Web.UI.Grid.isDetailTable = function (e) {
    return new RegExp(e.get_owner().get_id() + ".+Detail.+").test(e.get_id());
  }),
  (Telerik.Web.UI.Grid.hideShowCells = function (e, t, i, r, n) {
    var l,
      o,
      a,
      s = Telerik.Web.UI.Grid.getVisibleCols(r),
      d = $find(e.id),
      h = d._owner,
      u = d._hasMultiHeaders,
      _ = [],
      g = !1,
      c = h.ClientSettings.Scrolling,
      m = c && c.AllowScroll && c.UseStaticHeaders,
      p = d.get_columns()[t],
      f = Telerik.Web.UI.Grid.isDetailTable(d);
    u &&
      ((m && e.id.indexOf("Header") > -1) ||
        (!m && d.get_owner().get_masterTableView().get_id() == e.id) ||
        f) &&
      (_ = Telerik.Web.UI.Grid.getMultiHeaderCells(d));
    var w = e.rows,
      C = 0;
    for (l = 0, o = w.length; l < o; l++) {
      var I = null,
        v =
          u &&
          !!w[l].className &&
          e.rows[l].className.indexOf("rgMultiHeaderRow") > -1;
      if (!v || !g) {
        if (
          m &&
          h._renderMode == Telerik.Web.UI.RenderMode.Lite &&
          -1 !== w[l].className.indexOf("rgGroupHeader")
        ) {
          for (a = 0; a < w[l].cells.length; a++)
            -1 !== w[l].cells[a].className.indexOf("rgGroupCol") && C++;
          (w[l].cells[w[l].cells.length - 1].colSpan = s - C || 1), (C = 0);
        }
        if (1 == w[l].cells.length && w[l].cells.length != s)
          w[l].cells[0].colSpan = s || 1;
        else
          for (
            a = 0;
            a < w[l].cells.length &&
            ((I = w[l].cells[a]),
            !Telerik.Web.UI.Grid._trySetColSpanOnDetailTable(I));
            a++
          ) {
            var T = I.colSpan;
            if (
              !u &&
              !n &&
              w[l].cells.length != s &&
              ((T > 1 && a + T >= t) ||
                (-1 != I.parentNode.className.indexOf("rgGroupHeader") &&
                  -1 == I.className.indexOf("rgGroupCol")))
            ) {
              if (p && "GridGroupSplitterColumn" === p._data.ColumnType) {
                var b = w[l].cells[p.get_element().cellIndex];
                if (b && -1 !== b.className.indexOf("rgGroupCol")) break;
              }
              if (i) w[l].cells[a].colSpan = w[l].cells[a].colSpan + 1;
              else {
                var y = w[l].cells[a].colSpan - 1;
                y <= 0 && (y = 1), (w[l].cells[a].colSpan = y);
              }
              break;
            }
          }
        if (
          null != (I = v ? _[t] : w[l].cells[t]) &&
          1 == I.colSpan &&
          ((I.children.length > 0 &&
            "TABLE" == I.children[0].tagName.toUpperCase() &&
            I.children[0].className.indexOf("rgDetailTable") > -1) ||
            ("none" == I.style.display &&
              i &&
              (I.style.display = window.netscape ? "table-cell" : ""),
            ("" != I.style.display && "table-cell" != I.style.display) ||
              i ||
              (I.style.display = "none"),
            d._owner.get_enableAriaSupport() &&
              I.setAttribute(
                "aria-hidden",
                ("none" == I.style.display).toString(),
              )),
          u && !g)
        ) {
          var S = I.parentCell;
          for (g = !0; S; ) {
            if ("none" == I.style.display) {
              var D = S.colSpan - 1;
              0 == D ? (S.style.display = "none") : (S.colSpan = D);
            } else
              "none" == S.style.display ? (S.style.display = "") : S.colSpan++;
            S = S.parentCell;
          }
        }
      }
    }
    h._renderMode == Telerik.Web.UI.RenderMode.Mobile &&
      m &&
      h._groupPanel &&
      (h._groupPanel.children[0].colSpan =
        Telerik.Web.UI.Grid.getVisibleCols(r));
    m &&
      ($telerik.isFirefox || $telerik.isIE9Mode) &&
      ((e.style.tableLayout = "auto"),
      setTimeout(function () {
        e.style.tableLayout = "fixed";
      }, 0)),
      Telerik.Web.UI.Grid.calculateRowSpan(e, i, m, u, _, t);
  }),
  (Telerik.Web.UI.Grid.calculateRowSpan = function (e, t, i, r, n, l) {
    var o = e.parentNode;
    if (!(i && o && o.id && -1 == o.id.indexOf("GridHeader")) && r) {
      var a,
        s,
        d,
        h,
        u,
        _,
        g = e.tHead.rows,
        c = 0;
      for (h = 0; h < g.length; h++) {
        s = (a = g[h]).cells;
        var m = !0;
        for (u = 0; u < s.length; u++)
          (d = s[u]), (m = m && "none" == d.style.display);
        (m || a.className.indexOf("rgFilterRow") > -1) && c++;
      }
      for (h = 0, _ = g.length; h < _; h++) {
        s = (a = g[h]).cells;
        var p = _ - h;
        for (u = 0; u < s.length; u++)
          if ((d = s[u]).id && d.id.indexOf("MultiHeader") > -1) {
            var f = p - c;
            d.rowSpan = f > 0 ? f : 1;
          }
        if (h == g.length - 1 - c) break;
      }
    }
  }),
  (Telerik.Web.UI.Grid._trySetColSpanOnDetailTable = function (e) {
    var t,
      i = $telerik.getFirstChildByTagName(e, "table", 0);
    if ((i && (t = $find(i.id)), t)) {
      var r = t.get_parentView()._getVisibleColumnsCount();
      return (e.colSpan = r), !0;
    }
    return !1;
  }),
  (Telerik.Web.UI.Grid._hideShowSelect = function (e, t) {
    if (e)
      for (var i = e.getElementsByTagName("select"), r = 0; r < i.length; r++)
        i[r].style.display = t ? "" : "none";
  }),
  (Telerik.Web.UI.Grid.FindPosX = function (e) {
    return Telerik.Web.UI.Grid.GetLocation(e).x;
  }),
  (Telerik.Web.UI.Grid.FindPosY = function (e) {
    return Telerik.Web.UI.Grid.GetLocation(e).y;
  }),
  (Telerik.Web.UI.Grid.CreateDragDrop = function (e, t, i) {
    if (i) {
      var r = t.get_element().parentNode;
      this._columnInitiatorIndex = t
        .get_owner()
        ._getCellIndexByColumnUniqueNameFromTableRowElement(
          r,
          t.get_element().UniqueName,
        );
    }
    t._owner._owner._renderMode != Telerik.Web.UI.RenderMode.Mobile &&
      Telerik.Web.UI.Grid.CreateReorderIndicators(
        t.get_element(),
        t._owner._owner.Skin,
        t._owner._owner._imagesPath,
        i,
        t._owner._owner.get_id(),
      ),
      (this._moveHeaderDiv = document.createElement("div"));
    var n = document.createElement("table");
    Telerik.Web.UI.Grid.CopyAttributes(this._moveHeaderDiv, t.get_element()),
      (this._moveHeaderDiv.style.margin = 0),
      Telerik.Web.UI.Grid.CopyAttributes(n, t._owner.get_element()),
      (n.style.margin = "0px"),
      (n.style.height = t.get_element().offsetHeight + "px"),
      (n.style.width = t.get_element().offsetWidth + "px"),
      (n.style.border = "0px"),
      (n.style.borderCollapse = "collapse"),
      (n.style.padding = "0px");
    var l = document.createElement("thead"),
      o = document.createElement("tr");
    n.appendChild(l),
      l.appendChild(o),
      o.appendChild(t.get_element().cloneNode(!0)),
      this._moveHeaderDiv.appendChild(n),
      $telerik.isIE ||
        (this._moveHeaderDiv.className +=
          " " + t._owner._owner.get_element().className),
      t._owner._owner.get_enableAriaSupport() &&
        (this._moveHeaderDiv.removeAttribute("aria-dropeffect"),
        this._moveHeaderDiv.setAttribute("aria-grabbed", "true")),
      document.body.appendChild(this._moveHeaderDiv),
      (this._moveHeaderDiv.style.height = n.style.height),
      (this._moveHeaderDiv.style.width = n.style.width),
      (this._moveHeaderDiv.style.position = "absolute"),
      (this._moveHeaderDiv.style.cursor = "move"),
      (this._moveHeaderDiv.style.display = "none"),
      (this._moveHeaderDiv.UniqueName = t.get_element().UniqueName),
      Telerik.Web.UI.Grid.ClearDocumentEvents();
  }),
  (Telerik.Web.UI.Grid.MoveDragDrop = function (e, t, i) {
    var r;
    if (null != this._moveHeaderDiv)
      if (
        (void 0 !== this._moveHeaderDiv.style.filter
          ? (this._moveHeaderDiv.style.filter = "alpha(opacity=80);")
          : void 0 !== this._moveHeaderDiv.style.MozOpacity
            ? (this._moveHeaderDiv.style.MozOpacity = 0.8)
            : void 0 !== this._moveHeaderDiv.style.opacity &&
              (this._moveHeaderDiv.style.opacity = 0.8),
        (this._moveHeaderDiv.style.visibility = ""),
        (this._moveHeaderDiv.style.display = ""),
        Telerik.Web.UI.Grid.PositionDragElement(this._moveHeaderDiv, e),
        (r = $telerik.isTouchDevice
          ? $telerik.getTouchTarget(e)
          : Telerik.Web.UI.Grid.GetCurrentElement(e)),
        t._owner._owner._renderMode != Telerik.Web.UI.RenderMode.Mobile)
      ) {
        if (null != r) {
          i && "th" == r.tagName.toLowerCase()
            ? (this._columnOverIndex = t
                .get_owner()
                ._getCellIndexByColumnUniqueNameFromTableRowElement(
                  r.parentNode,
                  r.UniqueName,
                ))
            : i &&
              r.parentNode &&
              r.parentNode.tagName &&
              "th" == r.parentNode.tagName.toLowerCase() &&
              ((this._columnOverIndex = t
                .get_owner()
                ._getCellIndexByColumnUniqueNameFromTableRowElement(
                  r.parentNode.parentNode,
                  r.parentNode.UniqueName,
                )),
              (r = r.parentNode));
          var n = t._owner._owner._groupPanel
            ? t._owner._owner._groupPanel.get_element()
            : null;
          if (
            Telerik.Web.UI.Grid.IsChildOf(r, t._owner.get_element()) ||
            (t._owner._owner.ClientSettings.AllowDragToGroup &&
              t._owner._owner._groupPanel &&
              (Telerik.Web.UI.Grid.IsChildOf(r, n) ||
                (($telerik.isTouchDevice ||
                  t._owner._owner._renderMode ==
                    Telerik.Web.UI.RenderMode.Lite) &&
                  r == n)))
          ) {
            if (
              r != t.get_element() &&
              r.parentNode == t.get_element().parentNode
            )
              if (t._hierarchicalIndex)
                if (
                  t._owner._owner._renderMode == Telerik.Web.UI.RenderMode.Lite
                ) {
                  var l = r.parentNode.getElementsByTagName("span");
                  l &&
                    r != l[l.length - 1] &&
                    ((r.title =
                      t._owner._owner.ClientSettings.ClientMessages.DropHereToReorder),
                    Telerik.Web.UI.Grid.MoveReorderIndicators(
                      e,
                      r,
                      i,
                      t._owner._owner.get_id(),
                    ));
                } else
                  r.parentNode.cells &&
                    r != r.parentNode.cells[r.parentNode.cells.length - 1] &&
                    ((r.title =
                      t._owner._owner.ClientSettings.ClientMessages.DropHereToReorder),
                    Telerik.Web.UI.Grid.MoveReorderIndicators(
                      e,
                      r,
                      i,
                      t._owner._owner.get_id(),
                    ));
              else {
                var o = t._owner.getColumnByUniqueName(r.UniqueName),
                  a = !0;
                t._owner._hasMultiHeaders &&
                  (a =
                    !!t &&
                    !!o &&
                    t.get_columnGroupName() == o.get_columnGroupName()),
                  o &&
                    o._data.Reorderable &&
                    o._owner._owner.ClientSettings.AllowColumnsReorder &&
                    a &&
                    ((r.title =
                      t._owner._owner.ClientSettings.ClientMessages.DropHereToReorder),
                    Telerik.Web.UI.Grid.MoveReorderIndicators(
                      e,
                      r,
                      i,
                      t._owner._owner.get_id(),
                    ));
              }
            else
              t._owner._owner.ClientSettings.AllowDragToGroup &&
              t._owner._owner._groupPanel &&
              (Telerik.Web.UI.Grid.IsChildOf(r, n) ||
                (($telerik.isTouchDevice ||
                  t._owner._owner._renderMode ==
                    Telerik.Web.UI.RenderMode.Lite) &&
                  r == n))
                ? Telerik.Web.UI.Grid.MoveReorderIndicators(
                    e,
                    n,
                    i,
                    t._owner._owner.get_id(),
                  )
                : ((Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility =
                    "hidden"),
                  (Telerik.Web.UI.Grid.ReorderIndicator1.style.display =
                    "none"),
                  (Telerik.Web.UI.Grid.ReorderIndicator1.style.position =
                    "absolute"),
                  (Telerik.Web.UI.Grid.ReorderIndicator2.style.visibility =
                    Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility),
                  (Telerik.Web.UI.Grid.ReorderIndicator2.style.display =
                    Telerik.Web.UI.Grid.ReorderIndicator1.style.display),
                  (Telerik.Web.UI.Grid.ReorderIndicator2.style.position =
                    Telerik.Web.UI.Grid.ReorderIndicator1.style.position));
            var s = null;
            t && (s = t._owner._owner),
              s &&
                s.ClientSettings.Scrolling.AllowScroll &&
                s._gridDataDiv &&
                Telerik.Web.UI.Grid.AutoScrollHorizontally(s, r);
          } else
            "hidden" !=
              Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility &&
              ((Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility =
                "hidden"),
              (Telerik.Web.UI.Grid.ReorderIndicator1.style.display = "none"),
              (Telerik.Web.UI.Grid.ReorderIndicator1.style.position =
                "absolute"),
              (Telerik.Web.UI.Grid.ReorderIndicator2.style.visibility =
                Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility),
              (Telerik.Web.UI.Grid.ReorderIndicator2.style.display =
                Telerik.Web.UI.Grid.ReorderIndicator1.style.display),
              (Telerik.Web.UI.Grid.ReorderIndicator2.style.position =
                Telerik.Web.UI.Grid.ReorderIndicator1.style.position));
        }
      } else {
        var d,
          h,
          u = this._moveHeaderDiv,
          _ = t._owner._owner._groupPanel,
          g = t._owner._owner._groupPanel.cells[0];
        $telerik.isTouchDevice
          ? ((h = $telerik.getTouches(e)[0]),
            (d = $telerik.containsPoint(
              $telerik.getBounds(_),
              h.location.pageX,
              h.location.pageY,
            )))
          : (d = $telerik.isMouseOverElement(_, e)),
          (u.className = u.className.replace("rgDropAllow", "")),
          (u.className = u.className.replace("rgDropDisable", "")),
          (u.className = u.className.trim()),
          (g.className = g.className.replace("rgGroupPanelCellHover", "")),
          (g.className = g.className.trim()),
          d
            ? ((u.className += " rgDropAllow"),
              (g.className += " rgGroupPanelCellHover"))
            : (u.className += " rgDropDisable");
      }
  }),
  (Telerik.Web.UI.Grid.AutoScrollHorizontally = function (e, t) {
    if (e && this && !(e.ClientSettings.Scrolling.FrozenColumnsCount > 0)) {
      var i,
        r,
        n = e._gridDataDiv;
      if (n && this._moveHeaderDiv) {
        var l = Telerik.Web.UI.Grid.GetLocation(this._moveHeaderDiv);
        r = (i = Telerik.Web.UI.Grid.GetLocation(n).x) + n.offsetWidth;
        var o,
          a = n.scrollLeft <= 0,
          s = n.scrollLeft >= n.scrollWidth - n.offsetWidth + 16,
          d = l.x - i,
          h = r - l.x;
        d < 50 + Telerik.Web.UI.Grid.GetScrollBarWidth() && !a
          ? ((o = 10 - d / 5),
            (n.scrollLeft = n.scrollLeft - o),
            window.setTimeout(function () {
              Telerik.Web.UI.Grid.AutoScrollHorizontally(e, t);
            }, 100),
            Telerik.Web.UI.Grid.HideReorderIndicators())
          : h < 50 + Telerik.Web.UI.Grid.GetScrollBarWidth() &&
            !s &&
            ((o = 10 - h / 5),
            (n.scrollLeft = n.scrollLeft + o),
            window.setTimeout(function () {
              Telerik.Web.UI.Grid.AutoScrollHorizontally(e, t);
            }, 100),
            Telerik.Web.UI.Grid.HideReorderIndicators());
      }
    }
  }),
  (Telerik.Web.UI.Grid.HideReorderIndicators = function () {
    Telerik.Web.UI.Grid.ReorderIndicator1 &&
      Telerik.Web.UI.Grid.ReorderIndicator2 &&
      ((Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility = "hidden"),
      (Telerik.Web.UI.Grid.ReorderIndicator1.style.display = "none"),
      (Telerik.Web.UI.Grid.ReorderIndicator1.style.position = "absolute"),
      (Telerik.Web.UI.Grid.ReorderIndicator2.style.visibility =
        Telerik.Web.UI.Grid.ReorderIndicator1.style.visibility),
      (Telerik.Web.UI.Grid.ReorderIndicator2.style.display =
        Telerik.Web.UI.Grid.ReorderIndicator1.style.display),
      (Telerik.Web.UI.Grid.ReorderIndicator2.style.position =
        Telerik.Web.UI.Grid.ReorderIndicator1.style.position));
  }),
  (Telerik.Web.UI.Grid.DestroyDragDrop = function (e) {
    null != this._moveHeaderDiv &&
      (this._moveHeaderDiv.parentNode.removeChild(this._moveHeaderDiv),
      (this._moveHeaderDiv = null),
      Telerik.Web.UI.Grid.RestoreDocumentEvents());
    (this._columnInitiatorIndex = null),
      (this._columnOverIndex = null),
      e || Telerik.Web.UI.Grid.DestroyReorderIndicators();
  }),
  (Telerik.Web.UI.Grid.AnimateRevertDragDrop = function (e, t) {
    if (this._moveHeaderDiv) {
      t = t || 300;
      var i = this._moveHeaderDiv;
      $telerik.$ &&
        (function (r) {
          var n = $telerik.getLocation(e.get_element());
          r(i)
            .clone()
            .appendTo(i.parentNode)
            .animate({ left: n.x, top: n.y }, t, function () {
              r(this).remove();
            });
        })($telerik.$),
        Telerik.Web.UI.Grid.DestroyDragDrop();
    }
  }),
  (Telerik.Web.UI.Grid.GetFirstParentByTagName = function (e, t) {
    for (; e && e.parentNode; ) {
      if (e.tagName.toLowerCase() == t.toLowerCase()) return e;
      e = e.parentNode;
    }
    return null;
  }),
  (Telerik.Web.UI.Grid.GetFirstParentRowWithID = function (e) {
    for (; e && e.parentNode; ) {
      if ("tr" == e.tagName.toLowerCase() && null != e.id && "" != e.id)
        return e;
      e = e.parentNode;
    }
    return null;
  }),
  (Telerik.Web.UI.Grid.CreateColumnResizers = function (e, t) {
    Telerik.Web.UI.Grid.ClearDocumentEvents(),
      (this.LeftResizer = document.createElement("span")),
      (this.LeftResizer.style.backgroundColor = "navy"),
      (this.LeftResizer.style.width = "1px"),
      (this.LeftResizer.style.position = "absolute"),
      (this.LeftResizer.style.cursor = "e-resize"),
      (this.RightResizer = document.createElement("span")),
      (this.RightResizer.style.backgroundColor = "navy"),
      (this.RightResizer.style.width = "1px"),
      (this.RightResizer.style.position = "absolute"),
      (this.RightResizer.style.cursor = "e-resize"),
      (this.ResizerToolTip = document.createElement("span")),
      (this.ResizerToolTip.style.backgroundColor = "#F5F5DC"),
      (this.ResizerToolTip.style.border = "1px solid"),
      (this.ResizerToolTip.style.position = "absolute"),
      (this.ResizerToolTip.style.font = "icon"),
      (this.ResizerToolTip.style.padding = "2"),
      (this.ResizerToolTip.innerHTML =
        "Width: <b>" + e.get_element().offsetWidth + "</b> <em>pixels</em>"),
      (this.LeftResizer.style.display =
        this.ResizerToolTip.style.display =
        this.ResizerToolTip.style.display =
          "none"),
      document.body.appendChild(this.LeftResizer),
      document.body.appendChild(this.RightResizer),
      document.body.appendChild(this.ResizerToolTip),
      Telerik.Web.UI.Grid.MoveColumnResizers(e, t);
  }),
  (Telerik.Web.UI.Grid.DestroyColumnResizers = function () {
    Telerik.Web.UI.Grid.RestoreDocumentEvents(),
      this.LeftResizer &&
        this.LeftResizer.parentNode &&
        (document.body.removeChild(this.LeftResizer),
        (this.LeftResizer = null)),
      this.RightResizer &&
        this.RightResizer.parentNode &&
        (document.body.removeChild(this.RightResizer),
        (this.RightResizer = null)),
      this.ResizerToolTip &&
        this.ResizerToolTip.parentNode &&
        (document.body.removeChild(this.ResizerToolTip),
        (this.ResizerToolTip = null));
  }),
  (Telerik.Web.UI.Grid.MoveColumnResizers = function (e, t) {
    if (this.LeftResizer && this.RightResizer && this.RightResizer) {
      if (
        ((this.LeftResizer.style.display =
          this.RightResizer.style.display =
          this.ResizerToolTip.style.display =
            ""),
        (this.LeftResizer.style.top =
          Telerik.Web.UI.Grid.FindPosY(e.get_element()) + "px"),
        (this.LeftResizer.style.left =
          Telerik.Web.UI.Grid.FindPosX(e.get_element()) + "px"),
        (this.RightResizer.style.top = this.LeftResizer.style.top),
        (this.RightResizer.style.left =
          Telerik.Web.UI.Grid.GetEventPosX(t) - 5 + "px"),
        (this.ResizerToolTip.style.top =
          parseInt(this.RightResizer.style.top, 10) - 20 + "px"),
        (this.ResizerToolTip.style.left =
          parseInt(this.RightResizer.style.left, 10) - 5 + "px"),
        parseInt(this.LeftResizer.style.left, 10) <
          Telerik.Web.UI.Grid.FindPosX(e._owner.get_element()) &&
          (this.LeftResizer.style.display = "none"),
        e._owner._owner.ClientSettings.Scrolling.AllowScroll)
      ) {
        var i = $get(e._owner._owner.ClientID + "_GridData");
        e._owner._owner.ClientSettings.Scrolling.UseStaticHeaders
          ? (this.LeftResizer.style.height =
              i.clientHeight + e._owner.get_element().tHead.offsetHeight + "px")
          : (this.LeftResizer.style.height = i.clientHeight + "px");
      } else
        this.LeftResizer.style.height =
          e._owner.get_element().tBodies[0].offsetHeight +
          e._owner.get_element().tHead.offsetHeight +
          "px";
      this.RightResizer.style.height = this.LeftResizer.style.height;
      var r =
        parseInt(this.RightResizer.style.left, 10) -
        parseInt(this.LeftResizer.style.left, 10);
      (this.ResizerToolTip.innerHTML =
        "Width: <b>" + r + "</b> <em>pixels</em>"),
        e._owner._owner.ClientSettings.Resizing.EnableRealTimeResize &&
          r > 0 &&
          ((e.get_element().style.width = r + "px"),
          (this.RightResizer.style.left =
            parseInt(this.LeftResizer.style.left, 10) +
            e.get_element().offsetWidth +
            "px")),
        parseInt(this.RightResizer.style.left, 10) + 1 <=
          parseInt(this.LeftResizer.style.left, 10) &&
          Telerik.Web.UI.Grid.DestroyColumnResizers();
    }
  }),
  (Telerik.Web.UI.Grid.FindScrollPosX = function (e) {
    for (var t = 0; e.parentNode; )
      "number" == typeof e.parentNode.scrollLeft &&
        (t += e.parentNode.scrollLeft),
        (e = e.parentNode);
    return (
      document.body.currentStyle &&
        -1 != document.body.currentStyle.marginLeft.indexOf("px") &&
        !window.opera &&
        (t =
          parseInt(t, 10) -
          parseInt(document.body.currentStyle.marginLeft, 10)),
      t
    );
  }),
  (Telerik.Web.UI.Grid.FindScrollPosY = function (e) {
    for (var t = 0; e.parentNode; )
      "number" == typeof e.parentNode.scrollTop &&
        (t += e.parentNode.scrollTop),
        (e = e.parentNode);
    return (
      document.body.currentStyle &&
        -1 != document.body.currentStyle.marginTop.indexOf("px") &&
        !window.opera &&
        (t =
          parseInt(t, 10) - parseInt(document.body.currentStyle.marginTop, 10)),
      t
    );
  }),
  (Telerik.Web.UI.Grid.GetEventPosX = function (e) {
    return $telerik.isTouchDevice
      ? $telerik.getTouchEventLocation(e).x
      : parseInt(e.clientX, 10) +
          parseInt($telerik.getScrollOffset(document.body, !0).x, 10);
  }),
  (Telerik.Web.UI.Grid.GetEventPosY = function (e) {
    return $telerik.isTouchDevice
      ? $telerik.getTouchEventLocation(e).y
      : parseInt(e.clientY, 10) +
          parseInt($telerik.getScrollOffset(document.body, !0).y, 10);
  }),
  (Telerik.Web.UI.Grid.IsScrollOnLeftSide = function () {
    return (
      void 0 === this._IsScrollOnLeftSide &&
        Telerik.Web.UI.Grid.getScrollBarHeight(),
      this._IsScrollOnLeftSide
    );
  }),
  (Telerik.Web.UI.Grid.getScrollBarHeight = function () {
    try {
      var e,
        t,
        i = document.createElement("div");
      (i.style.position = "absolute"),
        (i.style.top = "-1000px"),
        (i.style.left = "-1000px"),
        (i.style.width = "100px"),
        (i.style.height = "100px"),
        (i.style.overflow = "auto");
      var r = document.createElement("div");
      (r.style.width = "1000px"),
        (r.style.height = "1000px"),
        i.appendChild(r),
        document.body.appendChild(i),
        (e = i.offsetHeight),
        (t = i.clientHeight),
        document.body.removeChild(document.body.lastChild),
        (this.scrollbarHeight = e - t),
        (this.scrollbarHeight <= 0 || 0 == t) && (this.scrollbarHeight = 16),
        (i.dir = "rtl");
      var n = document.createElement("div");
      return (
        (n.style.position = "absolute"),
        (n.style.left = "0"),
        (n.style.height = "100%"),
        (n.style.width = "100%"),
        i.appendChild(n),
        $telerik.isOpera && ((n.style.left = ""), (n.style.width = "100px")),
        document.body.appendChild(i),
        (this._IsScrollOnLeftSide = !1),
        ($telerik.$(i).offset().left != $telerik.$(n).offset().left ||
          $telerik.isChrome) &&
          (this._IsScrollOnLeftSide = !0),
        i.removeChild(r),
        i.removeChild(n),
        i.parentNode.removeChild(i),
        (i = null),
        (r = null),
        (n = null),
        this.scrollbarHeight
      );
    } catch (e) {
      return (this._IsScrollOnLeftSide = !1), !1;
    }
  }),
  (Telerik.Web.UI.Grid.GetScrollBarWidth = function () {
    try {
      var e,
        t,
        i = document.createElement("div");
      (i.style.position = "absolute"),
        (i.style.top = "-1000px"),
        (i.style.left = "-1000px"),
        (i.style.width = "100px"),
        (i.style.overflow = "auto");
      var r = document.createElement("div");
      return (
        (r.style.width = "1000px"),
        i.appendChild(r),
        document.body.appendChild(i),
        (e = i.offsetWidth),
        (t = i.clientWidth),
        (this.scrollbarWidth = e - t),
        (this.scrollbarWidth <= 0 || 0 == t) && (this.scrollbarWidth = 16),
        i.removeChild(r),
        i.parentNode.removeChild(i),
        (i = null),
        (r = null),
        this.scrollbarWidth
      );
    } catch (e) {
      return !1;
    }
  }),
  (Telerik.Web.UI.Grid.IsRightToLeft = function (e) {
    try {
      for (; e && e != document; ) {
        if ("rtl" == $telerik.getCurrentStyle(e, "direction")) return !0;
        e = e.parentNode;
      }
      return !1;
    } catch (e) {
      return !1;
    }
  }),
  (Telerik.Web.UI.Grid.FireEvent = function (
    sender,
    eventHandler,
    eventArguments,
  ) {
    try {
      var returnValue = !0;
      if ("string" == typeof sender[eventHandler]) eval(sender[eventHandler]);
      else if ("function" == typeof sender[eventHandler])
        if (eventArguments)
          switch (eventArguments.length) {
            case 1:
              returnValue = sender[eventHandler](eventArguments[0]);
              break;
            case 2:
              returnValue = sender[eventHandler](
                eventArguments[0],
                eventArguments[1],
              );
          }
        else returnValue = sender[eventHandler]();
      return "boolean" != typeof returnValue || returnValue;
    } catch (e) {
      throw e;
    }
  }),
  (Telerik.Web.UI.Grid.GetTableColGroup = function (e) {
    try {
      return e.getElementsByTagName("colgroup")[0];
    } catch (e) {
      return !1;
    }
  }),
  (Telerik.Web.UI.Grid.RemoveHiddenColGroupCols = function (e) {
    try {
      for (var t = e.getElementsByTagName("col"), i = 0; i < t.length; i++)
        t[i].style.display &&
          "none" == t[i].style.display &&
          (t[i].parentNode.removeChild(t[i]), i--);
    } catch (e) {}
  }),
  (Telerik.Web.UI.Grid.GetTableColGroupCols = function (e) {
    try {
      for (var t = [], i = 0; i < e.childNodes.length; i++)
        e.childNodes[i].tagName &&
          "col" == e.childNodes[i].tagName.toLowerCase() &&
          (t[t.length] = e.childNodes[i]);
      return t;
    } catch (e) {
      return !1;
    }
  }),
  (Telerik.Web.UI.Grid.ClearItemStyle = function (e, t, i) {
    if ((Sys.UI.DomElement.removeCssClass(e, i), t)) {
      for (
        var r = e.style.cssText.toLowerCase().replace(/ /g, "").split(";"),
          n = 0;
        n < r.length;
        n++
      )
        -1 != t.indexOf(r[n]) && (r[n] = "");
      e.style.cssText = r.join(";");
    }
  }),
  (Telerik.Web.UI.Grid.SetItemStyle = function (e, t, i) {
    Sys.UI.DomElement.addCssClass(e, i),
      t && (e.style.cssText = e.style.cssText + ";" + t);
  }),
  (Telerik.Web.UI.Grid.ScrollIntoView = function (e) {
    var t =
        Telerik.Web.UI.Grid.getScrollableContainer(e) ||
        document.body ||
        document.documentElement,
      i = e,
      r = $telerik.getLocation(i).y - $telerik.getLocation(t).y + t.scrollTop,
      n = r + i.offsetHeight,
      l = t.clientHeight,
      o = parseInt(t.scrollTop, 10),
      a = o + l;
    i.offsetHeight > l || r < o
      ? (t.scrollTop = r)
      : n > a && (t.scrollTop = n - l),
      (t.scrollTop = t.scrollTop);
  }),
  (Telerik.Web.UI.Grid.getScrollableContainer = function (e) {
    if (e && e.parentNode) {
      for (var t = null, i = e.parentNode; null != i; ) {
        if ("BODY" == i.tagName.toUpperCase()) {
          t = i;
          break;
        }
        var r = $telerik.getCurrentStyle(i, "overflowY");
        if ("scroll" == r || "auto" == r) {
          t = i;
          break;
        }
        i = i.parentNode;
      }
      return t;
    }
  }),
  (Telerik.Web.UI.Grid.GetNestedTableView = function (e) {
    var t = null,
      i = Telerik.Web.UI.Grid.GetNestedTable(e);
    return i && (t = $find(i.id.split("__")[0])), t;
  }),
  (Telerik.Web.UI.Grid.GetLastNestedTableView = function (e) {
    var t = null,
      i = Telerik.Web.UI.Grid.GetLastNestedTable(e);
    return i && (t = $find(i.id.split("__")[0])), t;
  }),
  (Telerik.Web.UI.Grid.GetPreviousNestedTableView = function (e) {
    var t = null;
    return (
      e.previousSibling &&
        e.previousSibling.previousSibling &&
        (t = Telerik.Web.UI.Grid.GetNestedTableView(e.previousSibling)),
      t
    );
  }),
  (Telerik.Web.UI.Grid.GetNestedTable = function (e) {
    var t = null,
      i = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(e, "tr");
    if (i) {
      var r = i.getElementsByTagName("table");
      r.length > 0 && -1 != r[0].id.indexOf("Detail") && (t = r[0]);
    }
    return t;
  }),
  (Telerik.Web.UI.Grid.GetLastNestedTable = function (e) {
    var t = null,
      i = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(e, "tr");
    if (i)
      for (
        var r = i.getElementsByTagName("table"), n = r.length - 1;
        n >= 0;
        n--
      ) {
        var l = r[n];
        if (-1 != l.id.indexOf("Detail") && -1 == l.id.indexOf("_mainTable")) {
          t = l;
          break;
        }
      }
    return t;
  }),
  (Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName = function (e, t) {
    for (
      e = e.nextSibling;
      null != e &&
      (3 == e.nodeType ||
        (e.tagName && e.tagName.toLowerCase() != t.toLowerCase()));

    )
      e = e.nextSibling;
    return e;
  }),
  (Telerik.Web.UI.Grid.GetNodePreviousSiblingByTagName = function (e, t) {
    for (
      e = e.previousSibling;
      null != e &&
      (3 == e.nodeType ||
        (e.tagName && e.tagName.toLowerCase() != t.toLowerCase()));

    )
      e = e.previousSibling;
    return e;
  }),
  (Telerik.Web.UI.Grid.ClearBestFitCache = function (e) {}),
  (Telerik.Web.UI.Grid.LocationCache = {}),
  (Telerik.Web.UI.Grid.GetLocation = function (e) {
    return $telerik.isOpera
      ? $telerik.originalGetLocation(e)
      : $telerik.getLocation(e);
  }),
  (Telerik.Web.UI.Grid.GetGrid = function (e) {
    for (; e; ) {
      if ("div" == e.tagName.toLowerCase() && e.id && $find(e.id))
        return $find(e.id);
      e = e.parentNode;
    }
    return null;
  }),
  (Telerik.Web.UI.Grid.ClientStateData = function () {
    var e = {};
    (this.add = function (t, i) {
      e[t] = i;
    }),
      (this.toString = function () {
        var t = "",
          i = null;
        for (var r in e)
          (t += r),
            void 0 !== (i = e[r]) && null != i && ((t += ","), (t += e[r])),
            (t += ";");
        return t;
      });
  }),
  (Telerik.Web.UI.Grid.getMultiHeaderCells = function (e) {
    for (
      var t = "MultiHeader", i = e.get_element().tHead.rows, r = [], n = 0;
      n < i.length;
      n++
    )
      for (var l = i[n], o = 0; o < l.cells.length; o++) {
        var a = l.cells[o];
        a.id && a.id.indexOf(t) > -1 && r.push(a);
      }
    return (
      r.sort(function (e, i) {
        return e.id.split(t)[1] - i.id.split(t)[1];
      }),
      r
    );
  }),
  (Telerik.Web.UI.Grid.correctWidthForIE = function (e) {
    var t = $telerik.getBorderWidth(e, Telerik.Web.BoxSide.Right);
    return (
      $telerik.getBorderWidth(e, Telerik.Web.BoxSide.Left) +
      t +
      parseInt(e.currentStyle.paddingLeft, 10) +
      parseInt(e.currentStyle.paddingRight, 10)
    );
  }),
  (Telerik.Web.UI.Grid.IsEditableControl = function (e) {
    var t = e.tagName ? e.tagName.toLowerCase() : null;
    return !(
      !t ||
      ("input" !== t &&
        "textarea" !== t &&
        "select" !== t &&
        "option" !== t &&
        "checkbox" != t)
    );
  }),
  (Telerik.Web.UI.Grid.IsActionControl = function (e) {
    e.jquery && (e = e[0]);
    var t = e.tagName ? e.tagName.toLowerCase() : null,
      i = $find(e.id);
    return (
      !(
        !t ||
        !(
          "button" == t ||
          "a" == t ||
          (i &&
            Telerik.Web.UI.RadButton &&
            Telerik.Web.UI.RadButton.isInstanceOfType(i))
        )
      ) || Telerik.Web.UI.Grid.IsEditableControl(e)
    );
  }),
  (Telerik.Web.UI.Grid.BuildEventArgs = function (e, t) {
    for (var i in t) {
      var r = i,
        n = t[i];
      r.indexOf("et_") > 0
        ? (e[r] = n)
        : ((e["_" + r] = n),
          (e["get_" + r] = (function (e) {
            return function () {
              return this["_" + e];
            };
          })(r)));
    }
    return e;
  }),
  (Telerik.Web.UI.Grid.TouchPointDirection = {
    None: -1,
    N: 0,
    NNE: 1,
    NE: 2,
    ENE: 3,
    E: 4,
    ESE: 5,
    SE: 6,
    SSE: 7,
    S: 8,
    SSW: 9,
    SW: 10,
    WSW: 11,
    W: 12,
    WNW: 13,
    NW: 14,
    NNW: 15,
  }),
  (Telerik.Web.UI.Grid.TouchPointMovement = {
    Up: 0,
    Left: 1,
    Down: 2,
    Right: 3,
    None: 4,
    Inconsistent: 5,
  }),
  (Telerik.Web.UI.Grid.detectTouchPointDirection = function (e, t, i) {
    if (t.x > e.x)
      if (t.y > e.y) {
        if (0 == i) return Telerik.Web.UI.Grid.TouchPointDirection.SE;
        if (i > 0) return Telerik.Web.UI.Grid.TouchPointDirection.ESE;
        if (i < 0) return Telerik.Web.UI.Grid.TouchPointDirection.SSE;
      } else {
        if (t.y == e.y) return Telerik.Web.UI.Grid.TouchPointDirection.E;
        if (0 == i) return Telerik.Web.UI.Grid.TouchPointDirection.NE;
        if (i > 0) return Telerik.Web.UI.Grid.TouchPointDirection.ENE;
        if (i < 0) return Telerik.Web.UI.Grid.TouchPointDirection.NNE;
      }
    else {
      if (t.x == e.x)
        return t.y > e.y
          ? Telerik.Web.UI.Grid.TouchPointDirection.S
          : t.y == e.y
            ? Telerik.Web.UI.Grid.TouchPointDirection.None
            : Telerik.Web.UI.Grid.TouchPointDirection.N;
      if (t.y > e.y) {
        if (0 == i) return Telerik.Web.UI.Grid.TouchPointDirection.SW;
        if (i > 0) return Telerik.Web.UI.Grid.TouchPointDirection.WSW;
        if (i < 0) return Telerik.Web.UI.Grid.TouchPointDirection.SSW;
      } else {
        if (t.y == e.y) return Telerik.Web.UI.Grid.TouchPointDirection.W;
        if (0 == i) return Telerik.Web.UI.Grid.TouchPointDirection.NW;
        if (i > 0) return Telerik.Web.UI.Grid.TouchPointDirection.WNW;
        if (i < 0) return Telerik.Web.UI.Grid.TouchPointDirection.NNW;
      }
    }
  }),
  (Telerik.Web.UI.Grid.detectTouchPointMovement = function (e) {
    return e >= Telerik.Web.UI.Grid.TouchPointDirection.NE &&
      e < Telerik.Web.UI.Grid.TouchPointDirection.SE
      ? Telerik.Web.UI.Grid.TouchPointMovement.Right
      : e >= Telerik.Web.UI.Grid.TouchPointDirection.SE &&
          e < Telerik.Web.UI.Grid.TouchPointDirection.SW
        ? Telerik.Web.UI.Grid.TouchPointMovement.Down
        : e >= Telerik.Web.UI.Grid.TouchPointDirection.SW &&
            e < Telerik.Web.UI.Grid.TouchPointDirection.NW
          ? Telerik.Web.UI.Grid.TouchPointMovement.Left
          : e >= Telerik.Web.UI.Grid.TouchPointDirection.NW ||
              (e >= Telerik.Web.UI.Grid.TouchPointDirection.N &&
                e < Telerik.Web.UI.Grid.TouchPointDirection.NE)
            ? Telerik.Web.UI.Grid.TouchPointMovement.Up
            : e == Telerik.Web.UI.Grid.TouchPointDirection.None
              ? Telerik.Web.UI.Grid.TouchPointMovement.None
              : void 0;
  }),
  (Telerik.Web.UI.Grid.reorderArray = function (e, t, i) {
    for (var r = [], n = 0; n < e.length; n++) r[n] = e[n];
    if (t > i) {
      var l = r.splice(t, 1)[0];
      return r.splice(i, 0, l), r;
    }
    if (t < i) return r.splice(i + 1, 0, r[t]), r.splice(t, 1), r;
  }),
  (Telerik.Web.UI.Grid.Draggable = (function (e) {
    var t = ".draggable";
    function i(e) {
      (this._options = e), (this._isDragging = !1), this.init(e);
    }
    return (
      (i.prototype = {
        init: function (i) {
          e(i.container).onEvent(
            ($telerik.isTouchDevice ? "touchstart" : "down") + t,
            e.proxy(this._down, this),
          );
        },
        dispose: function () {
          e(document).add(this._options.container).off(t);
        },
        _positionDragElement: function (e) {
          var t = $telerik.getEventLocation(e);
          this._$dragElement.offset({ top: t.pageY + 1, left: t.pageX + 1 });
        },
        _down: function (i) {
          var r,
            n = this._options;
          if (n.canDrag.call(n.thisArg, i)) {
            if (!1 === (r = n.createDraggable.call(n.thisArg, i))) return;
            e(document).onEvent(
              ($telerik.isTouchDevice ? "touchmove" : "move") + t,
              e.proxy(this._move, this),
            ),
              e(document).onEvent(
                ($telerik.isTouchDevice ? "touchend" : "up") + t,
                e.proxy(this._up, this),
              ),
              (this._$dragElement = e(r).appendTo(document.body)),
              n.createDropClue &&
                (this._$dropClue = e(n.createDropClue.call(n.thisArg, i))
                  .css("position", "absolute")
                  .appendTo(document.body)
                  .hide()),
              $telerik.isTouchDevice && i.preventDefault(!0),
              this._positionDragElement(i),
              (this._isDragging = !0);
          }
        },
        _move: function (e) {
          var t = this._options;
          this._positionDragElement(e),
            t.dragging.call(t.thisArg, e, {
              $dropClue: this._$dropClue,
              $dragElement: this._$dragElement,
            }),
            $telerik.isTouchDevice || e.preventDefault(!0);
        },
        _up: function (i) {
          var r = this._options;
          this._isDragging &&
            (r.stopDragging &&
              r.stopDragging.call(r.thisArg, i, {
                $dragElement: this._$dragElement,
              }),
            this._$dragElement.remove(),
            this._$dropClue && this._$dropClue.remove(),
            e(document).off(t),
            (this._isDragging = !1));
        },
      }),
      i
    );
  })($telerik.$)),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridItemResizer = function (e) {
    Telerik.Web.UI.GridItemResizer.initializeBase(this),
      (this._owner = e),
      (this._onResizeMouseUpDelegate = null),
      (this._cellsWithEvents = []);
  }),
  (Telerik.Web.UI.GridItemResizer.prototype = {
    dispose: function () {
      for (var e = 0; e < this._cellsWithEvents.length; e++)
        window.$clearHandlers(this._cellsWithEvents[e]),
          (this._cellsWithEvents[e]._events = null),
          (this._cellsWithEvents[e]._onResizeMouseDownDelegate = null);
      (this._cellsWithEvents = null),
        this._destroyRowResizer(),
        this._onResizeMouseUpDelegate &&
          $telerik.removeExternalHandler(
            document,
            "mouseup",
            this._onResizeMouseUpDelegate,
          );
    },
    _detectResizeCursorsOnItems: function (e, t) {
      if (
        null != t &&
        "td" == t.tagName.toLowerCase() &&
        !this._owner.MoveHeaderDiv
      ) {
        for (
          var i = Telerik.Web.UI.Grid.GetFirstParentByTagName(t, "tr"), r = !1;
          i && Telerik.Web.UI.Grid.IsChildOf(i, this._owner.get_element());

        ) {
          if (i.id && 2 == i.id.split("__").length) {
            r = !0;
            break;
          }
          i = Telerik.Web.UI.Grid.GetFirstParentByTagName(i.parentNode, "tr");
        }
        if (!r) return;
        var n = t.parentNode.parentNode.parentNode,
          l = $find(n.id);
        if (null != l) {
          if (!l.get_element()) return;
          if (!l.get_element().tBodies[0]) return;
          var o = Telerik.Web.UI.Grid.GetEventPosY(e),
            a =
              ($telerik.isSafari
                ? Telerik.Web.UI.Grid.FindPosY(i)
                : Telerik.Web.UI.Grid.FindPosY(t)) + t.offsetHeight;
          (this._resizeTolerance = 5),
            o > a - this._resizeTolerance && o < a + this._resizeTolerance
              ? ((t.style.cursor = "n-resize"),
                (t.title =
                  this._owner.ClientSettings.ClientMessages.DragToResize),
                t._onResizeMouseDownDelegate ||
                  ((t._onResizeMouseDownDelegate = Function.createDelegate(
                    this,
                    this._onResizeMouseDownHandler,
                  )),
                  window.$addHandler(
                    t,
                    "mousedown",
                    t._onResizeMouseDownDelegate,
                  ),
                  (this._cellsWithEvents[this._cellsWithEvents.length] = t)))
              : ((t.style.cursor = "default"),
                (t.title = ""),
                t._onResizeMouseDownDelegate &&
                  (null != t._events &&
                    window.$removeHandler(
                      t,
                      "mousedown",
                      t._onResizeMouseDownDelegate,
                    ),
                  (t._onResizeMouseDownDelegate = null),
                  (t._events = null)));
        }
      }
    },
    _moveItemResizer: function (e) {
      "undefined" != this._owner._rowResizer &&
        null != this._owner._rowResizer &&
        null != this._owner._rowResizer.parentNode &&
        ((this._owner._rowResizer.style.top =
          Telerik.Web.UI.Grid.GetEventPosY(e) + "px"),
        this._owner.ClientSettings.Resizing.EnableRealTimeResize &&
          (this._destroyRowResizerAndResizeRow(e, !1),
          this._updateRowResizerWidth(e)));
    },
    _destroyRowResizerAndResizeRow: function (e, t) {
      if (
        "undefined" != this._owner._cellToResize &&
        null != this._owner._cellToResize &&
        "td" == this._owner._cellToResize.tagName.toLowerCase() &&
        "undefined" != this._owner._rowResizer &&
        null != this._owner._rowResizer
      ) {
        var i,
          r = $telerik.isSafari
            ? Telerik.Web.UI.Grid.FindPosY(this._owner._cellToResize.parentNode)
            : Telerik.Web.UI.Grid.FindPosY(this._owner._cellToResize);
        if (
          (i = this._gridDataDiv
            ? parseInt(this._owner._rowResizer.style.top, 10) +
              this._gridDataDiv.scrollTop -
              r
            : parseInt(this._owner._rowResizer.style.top, 10) - r) > 0
        ) {
          var n = this._owner._cellToResize.parentNode.parentNode.parentNode,
            l = $find(n.id);
          null != l &&
            l.resizeItem(this._owner._cellToResize.parentNode.rowIndex, i);
        }
      }
      t && this._destroyRowResizer();
    },
    _updateRowResizerWidth: function (e) {
      var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
      null != t &&
        "td" == t.tagName.toLowerCase() &&
        null != this._owner._rowResizerRefTable &&
        (this._owner._rowResizer.style.width =
          this._owner.get_element().offsetWidth + "px");
    },
    _createRowResizer: function (e) {
      this._destroyRowResizer();
      var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
      if (null != t && "td" == t.tagName.toLowerCase()) {
        if (t.cellIndex > 0) {
          var i = t.parentNode.rowIndex;
          t = t.parentNode.parentNode.parentNode.rows[i].cells[0];
        }
        (this._owner._rowResizer = null), (this._owner._cellToResize = t);
        var r = t.parentNode.parentNode.parentNode,
          n = $find(r.id);
        (this._owner._rowResizer = document.createElement("div")),
          (this._owner._rowResizer.style.backgroundColor = "navy"),
          (this._owner._rowResizer.style.height = "1px"),
          (this._owner._rowResizer.style.fontSize = "1"),
          (this._owner._rowResizer.style.position = "absolute"),
          (this._owner._rowResizer.style.cursor = "n-resize"),
          null != n &&
            ((this._owner._rowResizerRefTable = n),
            (this._owner._rowResizer.style.width =
              this._owner.get_element().offsetWidth + "px"),
            (this._owner._rowResizer.style.left =
              Telerik.Web.UI.Grid.FindPosX(this._owner.get_element()) + "px")),
          (this._owner._rowResizer.style.top =
            Telerik.Web.UI.Grid.GetEventPosY(e) + "px"),
          document.body.appendChild(this._owner._rowResizer);
      }
    },
    _destroyRowResizer: function () {
      "undefined" != this._owner._rowResizer &&
        null != this._owner._rowResizer &&
        null != this._owner._rowResizer.parentNode &&
        (this._owner._rowResizer.parentNode.removeChild(
          this._owner._rowResizer,
        ),
        (this._owner._rowResizer = null),
        (this._owner._rowResizerRefTable = null));
    },
    _onResizeMouseDownHandler: function (e) {
      var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
      if (t) {
        if ("td" != t.tagName.toLowerCase()) return;
        window.$clearHandlers(t);
      }
      this._createRowResizer(e),
        Telerik.Web.UI.Grid.ClearDocumentEvents(),
        (this._onResizeMouseUpDelegate = Function.createDelegate(
          this,
          this._onResizeMouseUpHandler,
        )),
        $telerik.addExternalHandler(
          document,
          "mouseup",
          this._onResizeMouseUpDelegate,
        ),
        (this._owner._isRowResize = !0);
    },
    _onResizeMouseUpHandler: function (e) {
      $telerik.removeExternalHandler(
        document,
        "mouseup",
        this._onResizeMouseUpDelegate,
      ),
        (this._owner._isRowResize = null),
        this._destroyRowResizerAndResizeRow(e, !0),
        Telerik.Web.UI.Grid.RestoreDocumentEvents();
    },
  }),
  Telerik.Web.UI.GridItemResizer.registerClass(
    "Telerik.Web.UI.GridItemResizer",
    null,
    Sys.IDisposable,
  ),
  (Telerik.Web.UI.GridDataItem = function (e) {
    Telerik.Web.UI.GridDataItem.initializeBase(this, [e]),
      (this._owner = {}),
      (this._data = {}),
      (this._selected = !1),
      (this._selectable = !0),
      (this._expanded = !1),
      (this._display = !1),
      (this._dataKeyValue = null),
      (this._dataItem = null),
      (this._itemIndexHierarchical = ""),
      (this._itemIndex = null),
      (this._editFormItem = "notSet"),
      (this._nestedViews = null);
  }),
  (Telerik.Web.UI.GridDataItem.prototype = {
    initialize: function () {
      Telerik.Web.UI.GridDataItem.callBaseMethod(this, "initialize");
      var e = this._element.id.split("_");
      this._itemIndex = parseInt(e[e.length - 1], 10);
    },
    dispose: function () {
      this._owner._owner.raise_rowDestroying(
        new Telerik.Web.UI.GridDataItemEventArgs(this.get_element(), null),
      ),
        this.get_element() &&
          (window.$clearHandlers(this.get_element()),
          (this._element.control = null)),
        Telerik.Web.UI.GridDataItem.callBaseMethod(this, "dispose");
    },
    get_itemIndex: function () {
      return this._itemIndex;
    },
    get_itemIndexHierarchical: function () {
      return this._itemIndexHierarchical;
    },
    get_owner: function () {
      return this._owner;
    },
    get_cell: function (e) {
      return this.get_parent().getCellByColumnUniqueName(this, e);
    },
    get_dataItem: function () {
      return this._dataItem;
    },
    findControl: function (e) {
      return $telerik.findControl(this.get_element(), e);
    },
    findElement: function (e) {
      return $telerik.findElement(this.get_element(), e);
    },
    getDataKeyValue: function (e) {
      var t = this.get_element().id.split("__")[1],
        i = null;
      return (
        this._owner._owner._clientKeyValues &&
          this._owner._owner._clientKeyValues[t] &&
          (i = this._owner._owner._clientKeyValues[t]),
        i ? i[e] : null
      );
    },
    get_selected: function () {
      return this._selected;
    },
    set_selected: function (e) {
      if (this._selected != e) {
        if (!this.get_selectable()) return;
        if (
          !this._owner._owner._selection._selectRowInternal(
            this.get_element(),
            { ctrlKey: !1 },
            !0,
            !0,
            !0,
          )
        )
          return;
      }
    },
    get_selectable: function () {
      return this._selectable;
    },
    get_expanded: function () {
      return this._expanded;
    },
    set_expanded: function (e) {
      if (this._expanded != e) {
        if (e && !this._owner.expandItem(this.get_element())) return;
        if (!e && !this._owner.collapseItem(this.get_element())) return;
        this._expanded = e;
      }
    },
    get_nestedViews: function () {
      var e = this,
        t = e._nestedViews,
        i = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(
          e.get_element(),
          "tr",
        );
      if (
        !t &&
        ((e._nestedViews = t = []),
        e.get_owner()._data.hasDetailItemTemplate &&
          (i = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(i, "tr")),
        i)
      )
        for (
          var r,
            n,
            l = e.get_owner().get_element().id.split("Detail").length,
            o = i.getElementsByTagName("table"),
            a = 0,
            s = o.length;
          a < s;
          a++
        )
          -1 != (r = o[a]).id.indexOf("Detail") &&
            -1 == r.id.indexOf("_mainTable") &&
            l + 1 == r.id.split("Detail").length &&
            (n = $find(r.id)) &&
            Telerik.Web.UI.GridTableView.isInstanceOfType(n) &&
            Array.add(t, n);
      return t;
    },
    get_display: function () {
      return this._display;
    },
    set_display: function (e) {
      this._display != e && (this._display = e);
    },
    get_isInEditMode: function () {
      return (
        Array.indexOf(
          this.get_owner().get_owner()._editIndexes,
          this._itemIndexHierarchical,
        ) > -1
      );
    },
    get_editFormItem: function () {
      if ("notSet" === this._editFormItem) {
        if ($telerik.$) {
          var e = $telerik.$(this.get_element()).next();
          e.children("td").children("div.rgEditForm").length &&
            (this._editFormItem = e.get(0));
        }
        var t = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(
          this.get_element(),
          "tr",
        );
        if (t && t.cells)
          for (var i = 0; i < t.cells.length; i++)
            $telerik.getChildByClassName(t.cells[i], "rgEditForm") &&
              (this._editFormItem = t);
        "notSet" === this._editFormItem && (this._editFormItem = null);
      }
      return this._editFormItem;
    },
  }),
  Telerik.Web.UI.GridDataItem.registerClass(
    "Telerik.Web.UI.GridDataItem",
    Sys.UI.Control,
  ),
  (function (e) {
    Type.registerNamespace("Telerik.Web.UI"),
      (Telerik.Web.UI.GridScrolling = function () {
        Telerik.Web.UI.GridScrolling.initializeBase(this),
          (this._owner = {}),
          (this._onGridScrollDelegate = null);
      }),
      (Telerik.Web.UI.GridScrolling.prototype = {
        initialize: function () {
          Telerik.Web.UI.GridScrolling.callBaseMethod(this, "initialize"),
            (this.AllowScroll =
              this._owner.ClientSettings.Scrolling.AllowScroll),
            (this.UseStaticHeaders =
              this._owner.ClientSettings.Scrolling.UseStaticHeaders),
            this._owner.canRepaint()
              ? (this._initializeDimensions(), this._initializeScroll())
              : ((this._shouldInitializeLayoutAndScroll = !0),
                this._owner.add_parentShown(this._owner.get_element())),
            Telerik.Web.UI.TouchScrollExtender._getNeedsScrollExtender() &&
              !this._dropDownTouchScroll &&
              this._createTouchScrollExtender(!0);
        },
        updated: function () {
          Telerik.Web.UI.GridScrolling.callBaseMethod(this, "updated");
        },
        dispose: function () {
          if (this._onResizeDelegate)
            try {
              window.$removeHandler(window, "resize", this._onResizeDelegate),
                (this._onResizeDelegate = null);
            } catch (e) {}
          this._onGridFrozenScrollDelegate &&
            (window.$removeHandler(
              this._frozenScroll,
              "scroll",
              this._onGridFrozenScrollDelegate,
            ),
            (this._onGridFrozenScrollDelegate = null)),
            this._onGridScrollDelegate &&
              (this._owner.GridDataDiv &&
                window.$removeHandler(
                  this._owner.GridDataDiv,
                  "scroll",
                  this._onGridScrollDelegate,
                ),
              this._owner.GridHeaderDiv &&
                window.$removeHandler(
                  this._owner.GridHeaderDiv,
                  "scroll",
                  this._onGridScrollDelegate,
                ),
              (this._onGridScrollDelegate = null)),
            this._frozenScroll && window.$clearHandlers(this._frozenScroll),
            this._createTouchScrollExtender(!1),
            Telerik.Web.UI.GridScrolling.callBaseMethod(this, "dispose");
        },
        get_owner: function () {
          return this._owner;
        },
        set_owner: function (e) {
          this._owner = e;
        },
        _initializeDimensions: function () {
          var e = this;
          this.onWindowResize(),
            this.initializeAutoLayout(),
            this.applyFrozenScroll();
          var t = 0;
          if (
            ((this._onResizeDelegate = Function.createDelegate(
              this._owner,
              function () {
                var e = this;
                clearInterval(t),
                  (t = setTimeout(function () {
                    clearInterval(t), e.repaint();
                  }, 200));
              },
            )),
            -1 != navigator.userAgent.toLowerCase().indexOf("msie")
              ? setTimeout(function () {
                  window.$addHandler(window, "resize", e._onResizeDelegate);
                }, 0)
              : window.$addHandler(window, "resize", this._onResizeDelegate),
            this._owner.ClientSettings.Scrolling.FrozenColumnsCount > 0 &&
              (this._owner.ClientSettings.Resizing.AllowRowResize &&
                this._owner.ClientSettings.Scrolling.FrozenColumnsCount++,
              this._owner.MasterTableViewHeader &&
                this._owner.MasterTableViewHeader._data._columnsData))
          )
            for (
              var i = 0,
                r = this._owner.MasterTableViewHeader._data._columnsData.length;
              i < r;
              i++
            ) {
              var n = this._owner.MasterTableViewHeader._data._columnsData[i];
              ("GridExpandColumn" == n.ColumnType ||
                ("GridGroupSplitterColumn" == n.ColumnType &&
                  !1 ===
                    this._owner.ClientSettings.Scrolling
                      .CountGroupSplitterColumnAsFrozen)) &&
                this._owner.ClientSettings.Scrolling.FrozenColumnsCount++;
            }
        },
        _createTouchScrollExtender: function (e) {
          var t = this._owner.GridDataDiv;
          if (t) {
            var i = this._dropDownTouchScroll;
            i
              ? e || (i.dispose(), (this._dropDownTouchScroll = null))
              : e &&
                ((this._dropDownTouchScroll =
                  new Telerik.Web.UI.TouchScrollExtender(t)),
                this._dropDownTouchScroll.initialize());
          }
        },
        applyFrozenScroll: function () {
          this._frozenScroll = $get(this._owner.ClientID + "_Frozen");
          var e = Telerik.Web.UI.Grid.getScrollBarHeight();
          if ((this._initFrozenScrollButtons(), this._frozenScroll)) {
            var t = $get(this._owner.ClientID + "_FrozenScroll");
            (this._onGridFrozenScrollDelegate = Function.createDelegate(
              this,
              this.onGridFrozenScroll,
            )),
              window.$addHandler(
                this._frozenScroll,
                "scroll",
                this._onGridFrozenScrollDelegate,
              ),
              (this.gridMasterTableWidth = this._owner
                .get_masterTableView()
                .get_element().offsetWidth),
              (t.style.width = this._owner.GridDataDiv.scrollWidth + "px"),
              (t.style.height = e + "px"),
              this._owner.get_masterTableView().get_element().offsetWidth >
              this._owner.GridDataDiv.clientWidth
                ? ($telerik.isIE && e++,
                  (this._frozenScroll.style.height = e + "px"),
                  this._owner.ClientSettings.Scrolling.SaveScrollPosition &&
                    void 0 !==
                      this._owner.ClientSettings.Scrolling.ScrollLeft &&
                    (this._frozenScroll.scrollLeft =
                      this._owner.ClientSettings.Scrolling.ScrollLeft),
                  null != this._owner.GridDataDiv.style.overflowX
                    ? (this._owner.GridDataDiv.style.overflowX = "hidden")
                    : ((this._frozenScroll.style.marginTop = "-" + e + "px"),
                      (this._frozenScroll.style.zIndex = 99999),
                      (this._frozenScroll.style.position = "relative")),
                  Telerik.Web.UI.Grid.IsRightToLeft(
                    this._owner.GridHeaderDiv,
                  ) && Telerik.Web.UI.Grid.IsScrollOnLeftSide()
                    ? (this._frozenScroll.style.marginLeft = e + "px")
                    : (Telerik.Web.UI.Grid.IsRightToLeft(
                        this._owner.GridHeaderDiv,
                      ) &&
                        $telerik.isSafari) ||
                      (this._frozenScroll.style.marginRight = e + "px"),
                  this._owner.GridHeaderDiv &&
                    this._owner.GridDataDiv &&
                    this._owner.GridDataDiv.clientWidth ==
                      this._owner.GridDataDiv.offsetWidth &&
                    void 0 !== this._frozenScroll.style.overflowX &&
                    void 0 !== this._frozenScroll.style.overflowY &&
                    ((this._frozenScroll.style.overflowX = "auto"),
                    (this._frozenScroll.style.overflowY = "hidden")),
                  ($telerik.isIE8 || $telerik.isChrome) &&
                    (this._frozenScroll.style.overflowX = "scroll"))
                : (this._frozenScroll.style.height = 0),
              (this.isFrozenScroll = !0),
              (this.gridDataTableWidth = this._owner.GridDataDiv.clientWidth),
              (this.isFrozenScrollApplied = !0);
          }
        },
        onGridFrozenResized: function () {
          var e = Telerik.Web.UI.Grid.getScrollBarHeight();
          if (
            ($telerik.isIE && ++e,
            this.gridDataTableWidth != this._owner.GridDataDiv.clientWidth)
          )
            if (
              ((this.gridDataTableWidth = this._owner.GridDataDiv.clientWidth),
              this.gridMasterTableWidth > this.gridDataTableWidth)
            )
              (this._frozenScroll.style.height = e + "px"),
                null != this._owner.GridDataDiv.style.overflowX
                  ? (this._owner.GridDataDiv.style.overflowX = "hidden")
                  : ((this._frozenScroll.style.marginTop = "-" + e + "px"),
                    (this._frozenScroll.style.zIndex = 99999),
                    (this._frozenScroll.style.position = "relative")),
                window.netscape &&
                  ((this._frozenScroll.style.width =
                    this._owner.GridDataDiv.offsetWidth - e + "px"),
                  (this._frozenScroll.style.marginRight = e + "px")),
                this._owner.GridHeaderDiv &&
                  this._owner.GridDataDiv &&
                  this._owner.GridDataDiv.clientWidth ==
                    this._owner.GridDataDiv.offsetWidth &&
                  void 0 !== this._frozenScroll.style.overflowX &&
                  void 0 !== this._frozenScroll.style.overflowY &&
                  ((this._frozenScroll.style.overflowX = "auto"),
                  (this._frozenScroll.style.overflowY = "hidden"),
                  window.netscape &&
                    ((this._frozenScroll.style.width =
                      parseInt(this._frozenScroll.style.width, 10) + e + "px"),
                    (this._frozenScroll.style.marginRight = 0))),
                ($telerik.isIE8 || $telerik.isChrome) &&
                  (this._frozenScroll.style.overflowX = "scroll");
            else {
              (this._frozenScroll.scrollLeft = 0),
                (this._frozenScroll.style.height = 0);
              for (
                var t = this._owner.get_masterTableView().get_columns(),
                  i = 0,
                  r = t.length;
                i < r;
                i++
              )
                !t[i].get_visible() &&
                  t[i].Display &&
                  this._owner.get_masterTableView().showColumn(i);
            }
        },
        _initFrozenScrollButtons: function () {
          var t,
            i = this._owner,
            r = (e = e || $telerik.$)(i.get_element()),
            n = e(i.get_masterTableView().get_element()),
            l =
              "> table > thead .rgCommandRow, > table > tbody .rgCommandRow, > table > tfoot .rgCommandRow, #" +
              this.get_id() +
              "_Pager .rgCommandRow";
          n.hasClass("rgDetailTable")
            ? (t = n.find("> thead > .rgCommandRow, > tfoot > .rgCommandRow"))
            : 0 == (t = r.find(l)).length &&
              (t = r.find("> .rgDataDiv").find(l)),
            (this._$prevButton = t
              .find(".rgPrev")
              .on("click", e.proxy(this._prevFrozenColumnHandler, this))),
            (this._$nextButton = t
              .find(".rgNext")
              .on("click", e.proxy(this._nextFrozenColumnHandler, this))),
            (this._currentColumnIndex = 0),
            (this._notFrozenColumns = this._getNotFrozenColumns());
        },
        _scrollToFirstColumn: function () {
          for (
            var e = this._getNotFrozenColumns();
            this._currentColumnIndex > 0;

          ) {
            var t = e[this._currentColumnIndex - 1],
              i = this._owner.get_masterTableView(),
              r = this._owner.get_masterTableViewHeader();
            t.FrozenDisplay ||
              (r._showNotFrozenColumn(t.Index), this._afterColumnFreeze(i, r)),
              this._$nextButton.removeClass("rgDisabled"),
              this._currentColumnIndex--;
          }
          this._$prevButton.addClass("rgDisabled");
        },
        _prevFrozenColumnHandler: function (e) {
          var t = this._getNotFrozenColumns()[--this._currentColumnIndex],
            i = this._owner.get_masterTableView(),
            r = this._owner.get_masterTableViewHeader();
          if (void 0 === t)
            return ++this._currentColumnIndex, void e.preventDefault();
          t.FrozenDisplay ||
            (r._showNotFrozenColumn(t.Index),
            this._afterColumnFreeze(i, r),
            Telerik.Web.Browser.ie &&
              Telerik.Web.Browser.version > 7 &&
              ((i.get_element().style.position = "relative"),
              (r.get_element().style.position = "relative"),
              window.setTimeout(function () {
                (i.get_element().style.position = ""),
                  (r.get_element().style.position = "");
              }, 0))),
            this._$nextButton.removeClass("rgDisabled"),
            0 == this._currentColumnIndex &&
              this._$prevButton.addClass("rgDisabled"),
            e.preventDefault();
        },
        _nextFrozenColumnHandler: function (e) {
          e.preventDefault();
          var t,
            i = this._getNotFrozenColumns(),
            r = i[this._currentColumnIndex++],
            n = this._owner.get_masterTableView(),
            l = this._owner.get_masterTableViewHeader(),
            o = this._owner.get_element().offsetWidth;
          (o = this._owner.get_element().offsetWidth),
            (t = this._owner.get_masterTableView().get_element().offsetWidth),
            void 0 === r || t <= o
              ? this._currentColumnIndex--
              : (r.FrozenDisplay &&
                  (l._hideNotFrozenColumn(r.Index),
                  this._afterColumnFreeze(n, l)),
                this._$prevButton.removeClass("rgDisabled"),
                (this._currentColumnIndex >= i.length - 1 ||
                  (t = this._owner
                    .get_masterTableView()
                    .get_element().offsetWidth) <= o) &&
                  this._$nextButton.addClass("rgDisabled"));
        },
        _getNotFrozenColumns: function () {
          var e = [];
          e._getPreviousNotFrozenColumnWidth = function (e) {
            for (var t = 0, i = 0; i < this.length - 1; i++)
              this[i].Index < e && (t += this[i].Width);
            return t;
          };
          var t,
            i,
            r = this._owner.get_masterTableView();
          for (
            t = this._owner.ClientSettings.Scrolling.FrozenColumnsCount;
            t < r.get_columns().length;
            t++
          )
            if ((i = r.get_columns()[t]).Display) {
              var n = !1;
              (window.netscape ||
                $telerik.isSafari ||
                $telerik.isIE8 ||
                $telerik.isOpera) &&
                "none" == i.get_element().style.display &&
                ((i.get_element().style.display = "table-cell"), (n = !0));
              var l = 1 * r.ColGroup.Cols[t].style.width.replace("px", "");
              (e[e.length] = { Index: t, Width: l, FrozenDisplay: !0 }),
                "boolean" == typeof i.FrozenDisplay &&
                  (e[e.length - 1].FrozenDisplay = i.FrozenDisplay),
                (window.netscape ||
                  $telerik.isSafari ||
                  $telerik.isIE8 ||
                  $telerik.isOpera) &&
                  n &&
                  ((i.get_element().style.display = "none"), (n = !1));
            }
          return e;
        },
        _afterColumnFreeze: function (e, t, i) {
          i > 0.99999 &&
            ($telerik.isFirefox || $telerik.isIE7) &&
            (t.get_element().style.width =
              this._owner.get_masterTableViewHeader().get_element()
                .offsetWidth + "px"),
            (t.get_element().style.tableLayout = "auto"),
            (t.get_element().style.tableLayout = "fixed"),
            i > 0.99999 &&
              ($telerik.isFirefox || $telerik.isIE7) &&
              (e.get_element().style.width =
                this._owner.get_masterTableViewHeader().get_element()
                  .offsetWidth + "px"),
            (e.get_element().style.tableLayout = "auto"),
            (e.get_element().style.tableLayout = "fixed"),
            (t.get_element().style.width = "100%"),
            (e.get_element().style.width = "100%");
        },
        onGridFrozenScroll: function (e) {
          this._frozenScrollCounter || (this._frozenScrollCounter = 0),
            this._frozenScrollCounter++,
            (this._needToUpdateClientState = !1);
          var t = this;
          (t._currentElement = Telerik.Web.UI.Grid.GetCurrentElement(e)),
            (Telerik.Web.UI.Grid.frozenScrollHanlder = function (e) {
              if (
                ($telerik.isOpera &&
                  1 *
                    navigator.userAgent.substring(
                      navigator.userAgent.indexOf("Version/") + 7 + 1,
                    ),
                t._frozenScrollCounter == e && !t._owner._isResize)
              ) {
                t._lastScrollIndex || (t._lastScrollIndex = 0);
                var i,
                  r,
                  n = t._owner.get_masterTableView(),
                  l = t._owner.get_masterTableViewHeader(),
                  o = t._currentElement;
                if (
                  (t._owner.ClientSettings.Scrolling.FrozenColumnsCount >
                    l.get_columns().length && (t.isFrozenScroll = !1),
                  t.isFrozenScroll)
                ) {
                  var a = t._getNotFrozenColumns(),
                    s = 0,
                    d = -1,
                    h = o.scrollWidth - o.offsetWidth;
                  0 != h && (d = h),
                    (s = o.scrollLeft / d) < 0 && (s *= -1),
                    s > 1 && (s = 1),
                    Telerik.Web.UI.Grid.IsRightToLeft(t._owner.GridHeaderDiv) &&
                      ($telerik.isSafari || $telerik.isIE7) &&
                      (s = 1 - s);
                  var u = n.get_columns(),
                    _ = o.scrollLeft;
                  for (r = 0; r < a.length; ) {
                    i = a[r];
                    var g = a._getPreviousNotFrozenColumnWidth(i.Index);
                    if (h < 0) break;
                    if (
                      ((i.Width + g) / d <= s && 0 != _
                        ? i.FrozenDisplay && l._hideNotFrozenColumn(i.Index)
                        : i.FrozenDisplay || l._showNotFrozenColumn(i.Index),
                      ++r == a.length - 1 && s > 0.99999)
                    ) {
                      for (var c = 0, m = 0, p = 0; p < u.length - 1; p++)
                        "boolean" != typeof u[p].FrozenDisplay ||
                          u[p].FrozenDisplay ||
                          ((c += a[m].Width), m++, p);
                      if (c - d < 0) {
                        var f = a[m];
                        l._hideNotFrozenColumn(f.Index);
                      }
                    }
                  }
                  t._afterColumnFreeze(n, l, s),
                    s > 0.99999 &&
                      $telerik.isFirefox &&
                      ((l.get_element().style.width =
                        l.get_element().offsetWidth + "px"),
                      (l.get_element().style.tableLayout = "auto"),
                      (l.get_element().style.tableLayout = "fixed"),
                      (n.get_element().style.width =
                        l.get_element().offsetWidth + "px"),
                      (n.get_element().style.tableLayout = "auto"),
                      (l.get_element().style.tableLayout = ""),
                      setTimeout(function () {
                        $telerik.isFirefox &&
                          Sys.Browser.version >= 4 &&
                          (n.get_element().style.tableLayout = "fixed"),
                          (l.get_element().style.tableLayout = "auto"),
                          (l.get_element().style.tableLayout = "fixed");
                      }, 100)),
                    t._owner.get_masterTableViewFooter() &&
                      ((t._owner
                        .get_masterTableViewFooter()
                        .get_element().style.width =
                        l.get_element().offsetWidth + "px"),
                      (t._owner
                        .get_masterTableViewFooter()
                        .get_element().style.tableLayout = "auto"),
                      (t._owner
                        .get_masterTableViewFooter()
                        .get_element().style.tableLayout = "fixed"));
                } else t._owner.GridDataDiv.scrollLeft = o.scrollLeft;
                (t._frozenScrollCounter = 0),
                  (t._needToUpdateClientState = !0),
                  setTimeout(Telerik.Web.UI.Grid._clientStateUpdater, 500),
                  t._owner.get_events().getHandler("scroll") &&
                    t._owner.raise_scroll(
                      new Telerik.Web.UI.GridScrollEventArgs(t._currentElement),
                    );
              }
            }),
            (Telerik.Web.UI.Grid._clientStateUpdater = function () {
              t._needToUpdateClientState &&
                ((t._needToUpdateClientState = !1),
                t._owner.updateClientState());
            }),
            setTimeout(
              "Telerik.Web.UI.Grid.frozenScrollHanlder(" +
                this._frozenScrollCounter +
                ")",
              0,
            );
        },
        onWindowResize: function () {
          this.setDataDivHeight(),
            this.setHeaderAndFooterDivsWidth(),
            this.isFrozenScrollApplied && this.onGridFrozenResized();
        },
        setHeaderAndFooterDivsWidth: function () {
          var e = this._owner,
            t = e.get_masterTableView(),
            i = e.GridDataDiv,
            r = e.GridHeaderDiv;
          if (t && i && r) {
            var n = t.get_element(),
              l = Telerik.Web.UI.Grid.getScrollBarHeight(),
              o = navigator.userAgent.toLowerCase().indexOf("msie") > -1,
              a =
                Telerik.Web.UI.Grid.IsRightToLeft(r) &&
                Telerik.Web.UI.Grid.IsScrollOnLeftSide(),
              s = this._owner.GridFooterDiv;
            if (i.clientWidth === i.offsetWidth)
              (r.style.marginRight = r.style.paddingRight = ""),
                (r.style.marginLeft = r.style.paddingLeft = "");
            else {
              var d = 0;
              a
                ? ((d =
                    (e.ClientSettings.Scrolling.FrozenColumnsCount &&
                      parseInt(
                        $telerik.getComputedStyle(r, "border-left-width", 0),
                        10,
                      )) ||
                    0),
                  (r.style.marginLeft = l - d + "px"),
                  (r.style.marginRight = r.style.paddingRight = ""))
                : ((d =
                    (e.ClientSettings.Scrolling.FrozenColumnsCount &&
                      parseInt(
                        $telerik.getComputedStyle(r, "border-right-width", 0),
                        10,
                      )) ||
                    0),
                  (r.style.marginRight = l - d + "px"),
                  (r.style.marginLeft = r.style.paddingRight = ""));
            }
            if (
              (s &&
                ((s.style.paddingRight = r.style.paddingRight),
                (s.style.paddingLeft = r.style.paddingLeft),
                (s.style.width = r.style.width),
                (s.style.marginRight = r.style.marginRight),
                (s.style.marginLeft = r.style.marginLeft)),
              this._owner._renderMode != Telerik.Web.UI.RenderMode.Mobile)
            ) {
              var h = this._owner._groupPanel,
                u = this._owner.get_masterTableViewHeader();
              h &&
                h._items.length > 0 &&
                o &&
                u &&
                (n.style.width = u.get_element().offsetWidth + "px");
            }
          }
        },
        setDataDivHeight: function () {
          var e = 0,
            t = this._owner.get_element();
          if (this._owner.GridDataDiv && "" != t.style.height) {
            if (
              ((this._owner.GridDataDiv.style.height = "10px"),
              "" != this._owner._groupPanelClientID &&
                this._owner._renderMode != Telerik.Web.UI.RenderMode.Mobile)
            ) {
              var i = $get(this._owner._groupPanelClientID);
              i && (e += i.offsetHeight);
            }
            this._owner.GridHeaderDiv &&
              (e += this._owner.GridHeaderDiv.parentNode.offsetHeight),
              this._owner.GridFooterDiv &&
                (e += this._owner.GridFooterDiv.parentNode.offsetHeight),
              this._owner.PagerControl &&
                (e += this._owner.PagerControl.offsetHeight),
              this._owner.TopPagerControl &&
                (e += this._owner.TopPagerControl.offsetHeight),
              this._owner.ClientSettings.Scrolling.FrozenColumnsCount &&
                !$telerik.$(".rgCommandRow .rgNext", t).length &&
                (e += Telerik.Web.UI.Grid.getScrollBarHeight());
            var r = t.clientHeight - e;
            r > 0 && (this._owner.GridDataDiv.style.height = r + "px");
          }
        },
        initializeAutoLayout: function () {
          var e = this._owner.MasterTableView,
            t = this._owner.get_masterTableViewHeader();
          if (this.AllowScroll && this.UseStaticHeaders && e && t) {
            var i = e.get_element(),
              r = t.get_element(),
              n = e._getFirstDataRow(),
              l = this._owner.get_masterTableViewFooter(),
              o = l ? l.get_element() : null;
            if ("auto" != i.style.tableLayout) return;
            (r.style.tableLayout = "auto"),
              (this._owner.GridHeaderDiv.style.marginRight =
                Telerik.Web.UI.Grid.GetScrollBarWidth() + "px");
            var a = t.HeaderRow,
              s = 0,
              d = null;
            a ? (d = a.cells) : t.MultiHeaderCells && (d = t.MultiHeaderCells),
              null != d &&
                ((s = d.length),
                n && n.cells.length < d.length && (s = n.cells.length));
            for (var h = 0; h < s; h++) {
              var u = this._owner.get_masterTableViewHeader().ColGroup.Cols[h];
              if (u && ("" == u.style.width || window.netscape)) {
                var _ = d[h].offsetWidth;
                if (
                  (n &&
                    n.cells[h].offsetWidth > _ &&
                    (_ = n.cells[h].offsetWidth),
                  o)
                ) {
                  var g = o.tBodies[0].rows[0],
                    c = g ? g.cells[h] : null;
                  c && c.offsetWidth > _ && (_ = c.offsetWidth);
                }
                if (!(_ <= 0)) {
                  (u.style.width = _ + 0 + "px"),
                    (e.ColGroup.Cols[h].style.width = _ + "px"),
                    l &&
                      l.ColGroup &&
                      (l.ColGroup.Cols[h].style.width = _ + "px");
                }
              }
            }
            i.style.tableLayout = r.style.tableLayout = "fixed";
            var m = this._owner.GridDataDiv;
            m.clientHeight == m.scrollHeight &&
              (this._owner.GridHeaderDiv.style.marginRight = "auto"),
              o && (o.style.tableLayout = "fixed");
          }
        },
        initializeSaveScrollPosition: function () {
          if (this._owner.ClientSettings.Scrolling.SaveScrollPosition) {
            if (
              "" != this._owner.ClientSettings.Scrolling.ScrollTop &&
              !this._owner.ClientSettings.Scrolling.EnableVirtualScrollPaging
            ) {
              var e = this,
                t = e._owner.get_masterTableView()._virtualization,
                i = e._owner.ClientSettings.Virtualization;
              t &&
                (i.ItemAtTop
                  ? setTimeout(function () {
                      e._owner.add_dataBound(e._scrollToIndex),
                        t.select(i.StartIndex, !0);
                    }, 100)
                  : this._owner.ClientSettings.Scrolling.ScrollTop &&
                    ((t._shouldLoadState = !1),
                    (t._startScrollTop =
                      this._owner.ClientSettings.Scrolling.ScrollTop))),
                (this._owner.GridDataDiv.scrollTop =
                  this._owner.ClientSettings.Scrolling.ScrollTop);
            }
            var r = $get(this._owner.ClientID + "_Frozen");
            this._owner.ClientSettings.Scrolling.ScrollLeft &&
              "" != this._owner.ClientSettings.Scrolling.ScrollLeft &&
              (this._owner.GridHeaderDiv &&
                !r &&
                (this._owner.GridHeaderDiv.scrollLeft =
                  this._owner.ClientSettings.Scrolling.ScrollLeft),
              this._owner.GridFooterDiv &&
                !r &&
                (this._owner.GridFooterDiv.scrollLeft =
                  this._owner.ClientSettings.Scrolling.ScrollLeft),
              r
                ? (r.scrollLeft =
                    this._owner.ClientSettings.Scrolling.ScrollLeft)
                : (this._owner.GridDataDiv.scrollLeft =
                    this._owner.ClientSettings.Scrolling.ScrollLeft));
          }
        },
        _scrollToIndex: function (e) {
          e
            .get_masterTableView()
            ._virtualization.scrollToIndex(
              e.ClientSettings.Virtualization.ItemAtTop,
            ),
            e.remove_dataBound(e._scrolling._scrollToIndex);
        },
        _initializeScroll: function () {
          var e = this,
            t = function () {
              e.initializeSaveScrollPosition();
            };
          window.netscape && !window.opera ? window.setTimeout(t, 0) : t(),
            this._initializeVirtualScrollPaging(),
            (this._owner.GridDataDiv || this._owner.GridHeaderDiv) &&
              ((this._onGridScrollDelegate = Function.createDelegate(
                this,
                this._onGridScroll,
              )),
              this._owner.GridDataDiv &&
                window.$addHandlers(this._owner.GridDataDiv, {
                  scroll: this._onGridScrollDelegate,
                }),
              this._owner.GridHeaderDiv &&
                window.$addHandlers(this._owner.GridHeaderDiv, {
                  scroll: this._onGridScrollDelegate,
                }));
        },
        _hideRadComboBoxes: function () {
          if (Telerik.Web.UI.RadComboBox) {
            var e,
              t,
              i,
              r,
              n = document.getElementsByTagName("div"),
              l = [];
            for (e = 0, i = n.length; e < i; e++) {
              var o = n[e];
              Sys.UI.DomElement.containsCssClass(o, "rcbSlide") &&
                Array.add(l, o);
            }
            for (e = 0, i = l.length; e < i; e++) {
              var a = l[e].getElementsByTagName("div");
              if (a)
                for (t = 0, r = a.length; t < r; t++)
                  if (a[t].id.indexOf("_DropDown") > -1) {
                    var s = a[t].id.substr(0, a[t].id.indexOf("_DropDown")),
                      d = $find(s);
                    d &&
                      d.get_dropDownVisible() &&
                      Telerik.Web.UI.Grid.IsChildOf(
                        d.get_element(),
                        this._owner.get_element(),
                      ) &&
                      d.hideDropDown();
                  }
            }
          }
        },
        _onGridScroll: function (e) {
          this._owner._renderMode != Telerik.Web.UI.RenderMode.Mobile &&
            (this._owner._getFilterMenu() &&
              this._owner._getFilterMenu().hide(),
            this._owner._headerContextMenu &&
              this._owner._headerContextMenu.hide()),
            this._hideRadComboBoxes();
          var t = null;
          if (
            (Telerik.Web.UI.RadDatePicker
              ? (t = Telerik.Web.UI.RadDatePicker.PopupInstances)
              : Telerik.Web.UI.RadDateInputComponent &&
                (t = Telerik.Web.UI.RadDatePickerComponent.PopupInstances),
            t)
          )
            for (var i in t)
              $find(i) &&
                ($find(i)
                  .get_id()
                  .indexOf(this._owner.ClientID + "_gdtcSharedCalendar") > -1 ||
                  $find(i)
                    .get_id()
                    .indexOf(this._owner.ClientID + "_gdtcSharedTimeView") >
                    -1) &&
                t[i].Hide();
          var r = e.srcElement ? e.srcElement : e.target;
          if (window.opera && this.isFrozenScroll)
            this._owner.GridDataDiv.scrollLeft =
              this._owner.GridHeaderDiv.scrollLeft = 0;
          else {
            if (
              (this.UseStaticHeaders && this._updateDataDivScrollPos(r),
              !Telerik.Web.UI.GridSelection ||
                (Telerik.Web.UI.GridSelection &&
                  this._owner.ClientSettings.EnablePostBackOnRowClick) ||
                (this._owner._selectedItemsInternal.length > 0 &&
                  0 == this._owner._selectedIndexes.length))
            ) {
              var n = this._owner._selectedItemsInternal;
              if (n.length > 0)
                for (var l = 0; l < n.length; l++)
                  null == n ||
                    Array.contains(
                      this._owner._selectedIndexes,
                      n[l].itemIndex,
                    ) ||
                    Array.add(this._owner._selectedIndexes, n[l].itemIndex);
            }
            this._owner.updateClientState(),
              this._owner.get_events().getHandler("scroll") &&
                this._owner.raise_scroll(
                  new Telerik.Web.UI.GridScrollEventArgs(
                    this._owner._gridDataDiv,
                  ),
                );
          }
        },
        _updateDataDivScrollPos: function (e) {
          e &&
            (this.isFrozenScroll
              ? (this._owner.GridHeaderDiv &&
                  ($telerik.isSafari
                    ? this._owner.GridHeaderDiv.scrollLeft &&
                      this._owner.GridHeaderDiv.scrollLeft !=
                        this._owner.GridDataDiv.scrollLeft &&
                      (this._owner.GridHeaderDiv.scrollLeft =
                        this._owner.GridDataDiv.scrollLeft)
                    : (this._owner.GridHeaderDiv.scrollLeft =
                        this._owner.GridDataDiv.scrollLeft)),
                this._owner.GridFooterDiv &&
                  (this._owner.GridFooterDiv.scrollLeft =
                    this._owner.GridDataDiv.scrollLeft))
              : (this._owner.GridHeaderDiv &&
                  (e == this._owner.GridHeaderDiv &&
                    ($telerik.isSafari
                      ? this._owner.GridHeaderDiv.scrollLeft &&
                        this._owner.GridHeaderDiv.scrollLeft !=
                          this._owner.GridDataDiv.scrollLeft &&
                        (this._owner.GridDataDiv.scrollLeft =
                          this._owner.GridHeaderDiv.scrollLeft)
                      : (this._owner.GridDataDiv.scrollLeft =
                          this._owner.GridHeaderDiv.scrollLeft)),
                  e == this._owner.GridDataDiv &&
                    ($telerik.isSafari
                      ? this._owner.GridHeaderDiv.scrollLeft !=
                          this._owner.GridDataDiv.scrollLeft &&
                        (this._owner.GridHeaderDiv.scrollLeft =
                          this._owner.GridDataDiv.scrollLeft)
                      : (this._owner.GridHeaderDiv.scrollLeft =
                          this._owner.GridDataDiv.scrollLeft))),
                this._owner.GridFooterDiv &&
                  (this._owner.GridFooterDiv.scrollLeft =
                    this._owner.GridDataDiv.scrollLeft)));
        },
        _initializeVirtualScrollPaging: function (e) {
          if (this._owner.ClientSettings.Scrolling.EnableVirtualScrollPaging) {
            (this._scrollCounter = 0),
              (this._currentAJAXScrollTop = 0),
              "" != this._owner.ClientSettings.Scrolling.AJAXScrollTop &&
                void 0 !== this._owner.ClientSettings.Scrolling.AJAXScrollTop &&
                (this._currentAJAXScrollTop =
                  this._owner.ClientSettings.Scrolling.AJAXScrollTop);
            var t,
              i,
              r =
                this._owner.get_masterTableView().get_currentPageIndex() *
                this._owner.get_masterTableView().get_pageSize() *
                20,
              n =
                this._owner.get_masterTableView().get_pageCount() *
                this._owner.get_masterTableView().get_pageSize() *
                20,
              l = n - r,
              o = this._owner.get_masterTableView().get_element();
            ($telerik.isIE8 || $telerik.isSafari || $telerik.isOpera) &&
              o &&
              o.parentNode &&
              ((t = $get("dummyDivTop", o.parentNode)) ||
                (((t = document.createElement("div")).innerHTML = "&nbsp;"),
                (t.style.height = "1px"),
                (t.id = "dummyDivTop"),
                (t.style.marginTop = "-1px"),
                o.parentNode.insertBefore(t, o)),
              (i = $get("dummyDivBottom", o.parentNode)) ||
                (((i = document.createElement("div")).innerHTML = "&nbsp;"),
                (i.style.height = "1px"),
                (i.id = "dummyDivBottom"),
                (i.style.marginBottom = "-1px"),
                o.parentNode.appendChild(i)));
            var a = o.offsetHeight,
              s = $telerik.isOpera && +Sys.Browser.version < 9.8;
            e &&
              (s || ($telerik.isFirefox && !$telerik.isFirefox3)) &&
              ("" != o.style.marginBottom &&
                (a -= parseInt(o.style.marginBottom, 10)),
              "" != o.style.marginTop &&
                (a -= parseInt(o.style.marginTop, 10)));
            var d = this._owner._gridDataDiv.offsetHeight;
            s
              ? ((o.style.position = "relative"),
                (o.style.top = r + "px"),
                (o.style.marginBottom = n - a + "px"))
              : ($telerik.isIE8 || $telerik.isOpera) && t && i
                ? ((t.style.height = Math.max(r, 0) + "px"),
                  (i.style.height =
                    l >= d
                      ? Math.max(l - a, 0) + "px"
                      : Math.max(d - a, 0) + "px"))
                : ((o.style.marginTop = r + "px"),
                  (o.style.marginBottom =
                    l >= d ? l - a + "px" : d - a + "px")),
              (this._owner._gridDataDiv.scrollTop = r),
              (this._currentAJAXScrollTop = r),
              this._createScrollerToolTip();
            var h = Function.createDelegate(this, this._onAjaxScrollHandler);
            window.$addHandler(this._owner._gridDataDiv, "scroll", h);
          }
        },
        _createScrollerToolTip: function () {
          $get(this._owner.get_id() + "ScrollerToolTip") ||
            ((this._scrollerToolTip = document.createElement("span")),
            (this._scrollerToolTip.id =
              this._owner.get_id() + "ScrollerToolTip"),
            (this._scrollerToolTip.style.position = "absolute"),
            (this._scrollerToolTip.style.zIndex = 1e4),
            (this._scrollerToolTip.style.display = "none"),
            "" != this._owner.Skin &&
              (this._scrollerToolTip.className = String.format(
                "GridToolTip_{0}",
                this._owner.Skin,
              )),
            (this._owner._embeddedSkin && "" != this._owner.Skin) ||
              ((this._scrollerToolTip.style.border = "1px solid"),
              (this._scrollerToolTip.style.backgroundColor = "#F5F5DC"),
              (this._scrollerToolTip.style.font = "icon"),
              (this._scrollerToolTip.style.padding = "2px")),
            document.body.appendChild(this._scrollerToolTip));
        },
        _onAjaxScrollHandler: function (e) {
          var t = this._owner._gridDataDiv;
          t && (this._currentScrollTop = t.scrollTop), this._scrollCounter++;
          var i = this;
          (Telerik.Web.UI.Grid.AjaxScrollInternal = function (e) {
            if (i._scrollCounter == e) {
              var t = i._owner._gridDataDiv;
              if (i._currentAJAXScrollTop != t.scrollTop) {
                if (i._owner.get_masterTableView().get_currentPageIndex() == l)
                  return;
                i._owner.get_masterTableView().page(l + 1);
              }
              (i._scrollCounter = 0), i._hideScrollerToolTip();
            }
          }),
            this._owner.raise_scroll(new Telerik.Web.UI.GridScrollEventArgs(t));
          var r = Telerik.Web.UI.Grid.getScrollBarHeight(),
            n = t.scrollTop / (t.scrollHeight - t.offsetHeight + r),
            l = Math.round(
              (this._owner.get_masterTableView().get_pageCount() - 1) * n,
            );
          window.setTimeout(
            "Telerik.Web.UI.Grid.AjaxScrollInternal(" +
              this._scrollCounter +
              ")",
            500,
          ),
            this._showScrollerTooltip(n, l);
        },
        _showScrollerTooltip: function (e, t) {
          var i = $get(this._owner.get_id() + "ScrollerToolTip");
          if (i) {
            var r = this._owner.get_masterTableView().get_pageCount();
            this._applyPagerTooltipText(i, t, r);
            var n = this._owner._gridDataDiv;
            (i.style.display = ""),
              (i.style.top =
                parseInt(Telerik.Web.UI.Grid.FindPosY(n), 10) +
                Math.round(n.offsetHeight * e) +
                "px"),
              (i.style.left =
                parseInt(Telerik.Web.UI.Grid.FindPosX(n), 10) +
                n.offsetWidth -
                (n.offsetWidth - n.clientWidth) -
                i.offsetWidth +
                "px");
          }
        },
        _applyPagerTooltipText: function (e, t, i) {
          if (
            "" ==
            this._owner.ClientSettings.ClientMessages.PagerTooltipFormatString
          )
            e.style.display = "none";
          else {
            var r =
                this._owner.ClientSettings.ClientMessages
                  .PagerTooltipFormatString,
              n = 0 == t ? 1 : t + 1,
              l = i;
            (r = r.replace(/\{0[^\}]*\}/g, n).replace(/\{1[^\}]*\}/g, l)),
              (e.innerHTML = r);
          }
        },
        _hideScrollerToolTip: function () {
          var e = this;
          setTimeout(function () {
            var t = $get(e._owner.get_id() + "ScrollerToolTip");
            t && t.parentNode && (t.style.display = "none");
          }, 200);
        },
      }),
      Telerik.Web.UI.GridScrolling.registerClass(
        "Telerik.Web.UI.GridScrolling",
        Sys.Component,
      ),
      (Telerik.Web.UI.GridScrollEventArgs = function (e) {
        Telerik.Web.UI.GridScrollEventArgs.initializeBase(this),
          (this.scrollTop = e.scrollTop),
          (this.scrollLeft = e.scrollLeft),
          (this.scrollControl = e),
          (this.isOnTop = 0 == e.scrollTop);
        var t = Telerik.Web.UI.Grid.getScrollBarHeight();
        e.clientHeight == e.offsetHeight && (t = 0),
          (this.isOnBottom =
            e.scrollHeight - e.offsetHeight + t == e.scrollTop);
      }),
      (Telerik.Web.UI.GridScrollEventArgs.prototype = {
        get_scrollTop: function () {
          return this.scrollTop;
        },
        get_scrollLeft: function () {
          return this.scrollLeft;
        },
        get_scrollControl: function () {
          return this.scrollControl;
        },
        get_isOnTop: function () {
          return this.isOnTop;
        },
        get_isOnBottom: function () {
          return this.isOnBottom;
        },
      }),
      Telerik.Web.UI.GridScrollEventArgs.registerClass(
        "Telerik.Web.UI.GridScrollEventArgs",
        Sys.EventArgs,
      );
  })($telerik.$),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridSelection = function () {
    Telerik.Web.UI.GridSelection.initializeBase(this),
      (this._owner = {}),
      (this._masterTable = null),
      (this._selectionInProgress = !1),
      (this._lastSelectedItemIndex = null);
  }),
  (Telerik.Web.UI.GridSelection.prototype = {
    initialize: function () {
      var e = this;
      if (
        (Telerik.Web.UI.GridSelection.callBaseMethod(e, "initialize"),
        null != e._owner._masterClientID)
      ) {
        window.$addHandlers(e._owner.get_element(), {
          click: Function.createDelegate(e, e._click),
        }),
          (e._masterTable = $get(e._owner._masterClientID).tBodies[0]),
          e._owner.AllowMultiRowSelection &&
            !e._owner.ClientSettings.Selecting.UseClientSelectColumnOnly &&
            (e._owner.ClientSettings.Selecting.EnableDragToSelectRows
              ? (window.$addHandlers(e._masterTable, {
                  mousedown: Function.createDelegate(e, e._mousedown),
                }),
                window.$addHandlers(e._masterTable, {
                  mousemove: Function.createDelegate(e, e._mousemove),
                }),
                window.$addHandlers(e._masterTable, {
                  mouseup: Function.createDelegate(e, e._mouseup),
                }),
                $telerik.addExternalHandler(
                  document,
                  "mouseup",
                  Function.createDelegate(e, e._mouseup),
                ))
              : window.$addHandlers(
                  e._masterTable,
                  {
                    mousedown: e._mouseDownTryClearDocumentEvents,
                    mouseup: e._mouseUpRestoreDocumentEvents,
                  },
                  e,
                ));
        var t = !1;
        if (this._owner._selectedItemsInternal.length > 0)
          for (
            var i = null, r = 0;
            r < this._owner._selectedItemsInternal.length;
            r++
          )
            (i = this._owner._selectedItemsInternal[r].itemIndex),
              Array.contains(this._owner._selectedIndexes, i) ||
                (Array.add(this._owner._selectedIndexes, i), (t = !0));
        t && this._owner.updateClientState();
      }
    },
    updated: function () {
      Telerik.Web.UI.GridSelection.callBaseMethod(this, "updated");
    },
    dispose: function () {
      this._masterTable &&
        (window.$clearHandlers(this._masterTable),
        (this._masterTable._events = null)),
        (this._masterTable = null),
        (this._owner = null),
        Telerik.Web.UI.GridSelection.callBaseMethod(this, "dispose");
    },
    get_owner: function () {
      return this._owner;
    },
    set_owner: function (e) {
      this._owner = e;
    },
    _mouseDownTryClearDocumentEvents: function (e) {
      e.shiftKey &&
        !this._shouldReturnOnMouseDown(e) &&
        Telerik.Web.UI.Grid.ClearDocumentEvents(!0);
    },
    _mouseUpRestoreDocumentEvents: function (e) {
      Telerik.Web.UI.Grid.RestoreDocumentEvents();
    },
    _mousedown: function (e) {
      this._owner.ClientSettings.Selecting.EnableDragToSelectRows &&
        this._owner.AllowMultiRowSelection &&
        !this._owner._rowResizer &&
        2 != e.rawEvent.button &&
        this._createRowSelectorArea(e);
    },
    _mousemove: function (e) {
      this._owner._isRowDragged()
        ? this._destroyRowSelectorArea(e)
        : this._resizeRowSelectorArea(e);
    },
    _mouseup: function (e) {
      this._destroyRowSelectorArea(e);
    },
    _shouldReturnOnMouseDown: function (e) {
      if (e.ctrlKey) return !0;
      var t = null;
      return (
        e.srcElement ? (t = e.srcElement) : e.target && (t = e.target),
        !t ||
          null == t ||
          !t.tagName ||
          "input" == t.tagName.toLowerCase() ||
          "textarea" == t.tagName.toLowerCase() ||
          "select" == t.tagName.toLowerCase() ||
          "option" == t.tagName.toLowerCase() ||
          !this._owner.ClientSettings.Selecting.AllowRowSelect ||
          !this._owner.AllowMultiRowSelection ||
          void 0
      );
    },
    _createRowSelectorArea: function (e) {
      if (!this._shouldReturnOnMouseDown(e)) {
        var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
        if (
          t &&
          Telerik.Web.UI.Grid.IsChildOf(t, this._owner.get_element()) &&
          ((this._firstRow = Telerik.Web.UI.Grid.GetFirstParentByTagName(
            t,
            "tr",
          )),
          "" != this._firstRow.id && !this._rowSelectorArea)
        ) {
          (this._rowSelectorArea = document.createElement("span")),
            (this._rowSelectorArea.style.position = "absolute"),
            (this._rowSelectorArea.style.zIndex = 1000100),
            "" != this._owner.Skin &&
              (this._rowSelectorArea.className = String.format(
                "GridRowSelector_{0}",
                this._owner.Skin,
              )),
            (this._owner._embeddedSkin && "" != this._owner.Skin) ||
              (this._rowSelectorArea.style.backgroundColor = "navy"),
            "opacity" in this._rowSelectorArea.style
              ? (this._rowSelectorArea.style.opacity = 0.1)
              : "MozOpacity" in this._rowSelectorArea.style
                ? (this._rowSelectorArea.style.MozOpacity = 0.1)
                : (this._rowSelectorArea.style.filter = "alpha(opacity=10);"),
            this._owner._gridDataDiv
              ? ((this._rowSelectorArea.style.top =
                  Telerik.Web.UI.Grid.FindPosY(this._firstRow) +
                  this._owner._gridDataDiv.scrollTop +
                  "px"),
                (this._rowSelectorArea.style.left =
                  Telerik.Web.UI.Grid.FindPosX(this._firstRow) +
                  this._owner._gridDataDiv.scrollLeft +
                  "px"),
                parseInt(this._rowSelectorArea.style.left, 10) <
                  Telerik.Web.UI.Grid.FindPosX(this._owner.get_element()) &&
                  (this._rowSelectorArea.style.left =
                    Telerik.Web.UI.Grid.FindPosX(this._owner.get_element()) +
                    "px"))
              : ((this._rowSelectorArea.style.top =
                  Telerik.Web.UI.Grid.FindPosY(this._firstRow) + "px"),
                (this._rowSelectorArea.style.left =
                  Telerik.Web.UI.Grid.FindPosX(this._firstRow) + "px")),
            document.body.appendChild(this._rowSelectorArea),
            Telerik.Web.UI.Grid.ClearDocumentEvents(!0);
          var i = document.activeElement;
          i &&
            i.tagName &&
            "input" === i.tagName.toLowerCase() &&
            document.activeElement.blur();
        }
      }
    },
    _destroyRowSelectorArea: function (e) {
      if (this._rowSelectorArea) {
        var t = this._rowSelectorArea.style.height;
        document.body.removeChild(this._rowSelectorArea),
          (this._rowSelectorArea = null),
          Telerik.Web.UI.Grid.RestoreDocumentEvents();
        var i,
          r = Telerik.Web.UI.Grid.GetCurrentElement(e);
        if (!r || !Telerik.Web.UI.Grid.IsChildOf(r, this._owner.get_element()))
          return;
        var n = Telerik.Web.UI.Grid.GetFirstParentByTagName(r, "td");
        if (
          ("td" == r.tagName.toLowerCase() ||
            "tr" == r.tagName.toLowerCase() ||
            (n && "td" == n.tagName.toLowerCase())) &&
          ("td" == r.tagName.toLowerCase()
            ? (i = r.parentNode)
            : "td" == n.tagName.toLowerCase()
              ? (i = n.parentNode)
              : "tr" == r.tagName.toLowerCase() && (i = r),
          this._firstRow.parentNode.parentNode.id == i.parentNode.parentNode.id)
        ) {
          var l = this._owner,
            o =
              this._firstRow.rowIndex < i.rowIndex
                ? this._firstRow.rowIndex
                : i.rowIndex,
            a =
              o == this._firstRow.rowIndex
                ? i.rowIndex
                : this._firstRow.rowIndex;
          e.ctrlKey || e.shiftKey || o === a || l.clearSelectedItems(),
            (this._selectionInProgress = !0),
            (l._keyboardNavigationProperties.lastClickSelectedItem = i);
          for (var s = o; s < a + 1; s++) {
            s == a && (this._selectionInProgress = !1);
            var d = this._firstRow.parentNode.parentNode.rows[s];
            if ("" != d.id && d && "" != t) {
              var h = $find(d.id);
              if (h) h.set_selected(!0);
              else $find(d.id.split("__")[0]).selectItem(d);
            }
          }
        }
      }
    },
    _resizeRowSelectorArea: function (e) {
      if (this._rowSelectorArea && this._rowSelectorArea.parentNode) {
        var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
        if (!t || !Telerik.Web.UI.Grid.IsChildOf(t, this._owner.get_element()))
          return;
        var i = parseInt(this._rowSelectorArea.style.left, 10),
          r = Telerik.Web.UI.Grid.GetEventPosX(e),
          n = parseInt(this._rowSelectorArea.style.top, 10),
          l = Telerik.Web.UI.Grid.GetEventPosY(e);
        if (
          (l >=
            $telerik.getLocation(this._rowSelectorArea).y +
              this._rowSelectorArea.offsetHeight &&
            this._rowSelectorArea.dragDirectionTop &&
            (this._rowSelectorArea.dragDirectionTop = null),
          r - i - 5 > 0 &&
            (this._rowSelectorArea.style.width = r - i - 5 + "px"),
          this._rowSelectorArea.offsetWidth >
            this._owner.get_element().offsetWidth &&
            (this._rowSelectorArea.style.width =
              this._owner.get_element().offsetWidth + "px"),
          l > n && !this._rowSelectorArea.dragDirectionTop)
        )
          l - n - 5 > 0 &&
            (this._rowSelectorArea.style.height = l - n - 5 + "px");
        else if (
          (this._rowSelectorArea.dragDirectionTop ||
            (this._rowSelectorArea.dragDirectionTop = !0),
          n - l - 5 > 0 || this._rowSelectorArea.dragDirectionTop)
        ) {
          this._rowSelectorArea.style.top = l - 5 + "px";
          var o =
            Telerik.Web.UI.Grid.FindPosY(this._firstRow) -
            parseInt(this._rowSelectorArea.style.top, 10) -
            5;
          if (o > 0)
            if (this._owner._gridDataDiv)
              if (
                this._owner._gridDataDiv.offsetHeight +
                  this._owner._gridDataDiv.offsetTop >
                parseInt(this._rowSelectorArea.style.top, 10) + o
              )
                this._rowSelectorArea.style.height = o + "px";
              else {
                var a =
                  this._owner._gridDataDiv.offsetHeight +
                  this._owner._gridDataDiv.offsetTop -
                  parseInt(this._rowSelectorArea.style.top, 10) -
                  5;
                this._rowSelectorArea.style.height = a >= 0 ? a + "px" : "0px";
              }
            else this._rowSelectorArea.style.height = o + "px";
        }
      }
    },
    _shouldRaiseRowEvent: function (e) {
      var t = $find(e.id);
      !t && e.parentNode && (t = $find(e.parentNode.id));
      var i =
        "input" == e.tagName.toLowerCase() &&
        "checkbox" == e.type.toLowerCase() &&
        e.id &&
        -1 != e.id.indexOf("SelectCheckBox");
      return !(
        ("input" == e.tagName.toLowerCase() && !i) ||
        "select" == e.tagName.toLowerCase() ||
        "option" == e.tagName.toLowerCase() ||
        "button" == e.tagName.toLowerCase() ||
        "a" == e.tagName.toLowerCase() ||
        "textarea" == e.tagName.toLowerCase() ||
        "img" == e.tagName.toLowerCase() ||
        (($telerik.isChrome || Telerik.Web.Browser.edge) &&
          "span" == e.tagName.toLowerCase() &&
          e.parentNode &&
          "button" == e.parentNode.tagName.toLowerCase()) ||
        (t &&
          Telerik.Web.UI.RadButton &&
          Telerik.Web.UI.RadButton.isInstanceOfType(t))
      );
    },
    _click: function (e) {
      var el = e.target ? e.target : e.srcElement;
      if (
        ($telerik.isTouchDevice && 3 == el.nodeType && (el = el.parentNode),
        el.tagName &&
          !(
            ("span" == el.tagName.toLowerCase() &&
              el.className.indexOf("rfdToggleImage") > -1) ||
            ("label" == el.tagName.toLowerCase() && el.htmlFor)
          ))
      ) {
        var isRowDragHandle = el.id && el.id.indexOf("RowDragHandle") > -1;
        if (this._shouldRaiseRowEvent(el) || isRowDragHandle) {
          var isClientSelectCheckBox =
              "input" == el.tagName.toLowerCase() &&
              "checkbox" == el.type.toLowerCase() &&
              el.id &&
              -1 != el.id.indexOf("SelectCheckBox"),
            owner = this._owner;
          if (
            (isClientSelectCheckBox &&
              owner.ClientSettings.AllowKeyboardNavigation &&
              owner.get_element().focus(),
            owner.ClientSettings.Selecting &&
              owner.ClientSettings.Selecting.AllowRowSelect)
          ) {
            if (
              (e.ctrlKey &&
                (owner._keyboardNavigationProperties.holdingCtrl = !0),
              "tr" != el.tagName.toLowerCase())
            )
              for (
                el = Telerik.Web.UI.Grid.GetFirstParentByTagName(el, "tr");
                el && 2 !== el.id.split("__").length && el.parentNode;

              )
                el = Telerik.Web.UI.Grid.GetFirstParentByTagName(
                  el.parentNode,
                  "tr",
                );
            if (
              !owner.ClientSettings.Selecting.UseClientSelectColumnOnly ||
              isClientSelectCheckBox ||
              !this._findClientSelectColumn(el) ||
              isRowDragHandle
            ) {
              for (
                var originalEl = el, found = !1;
                el && Telerik.Web.UI.Grid.IsChildOf(el, owner.get_element());

              ) {
                if (el.id && 2 == el.id.split("__").length) {
                  found = !0;
                  break;
                }
                el = Telerik.Web.UI.Grid.GetFirstParentByTagName(
                  el.parentNode,
                  "tr",
                );
              }
              if (
                (found || (el = originalEl),
                el &&
                  (el.parentNode.parentNode.parentNode == owner.get_element() ||
                    el.parentNode.parentNode.parentNode == owner._gridDataDiv ||
                    Array.contains(
                      owner.get_detailTables(),
                      $find(el.parentNode.parentNode.id),
                    )) &&
                  el.id &&
                  2 == el.id.split("__").length)
              ) {
                if (owner.get_allowMultiRowSelection()) {
                  if (e.shiftKey) {
                    var clickedItemIndex = owner._searchRowIndex(el.id),
                      lastSelectedItemIndex = this._lastSelectedItemIndex;
                    (this._selectionInProgress = !0),
                      isNaN(parseInt(lastSelectedItemIndex, 10))
                        ? (this._lastSelectedItemIndex = clickedItemIndex)
                        : lastSelectedItemIndex < clickedItemIndex
                          ? (e.ctrlKey ||
                              owner._clearSelectedItemsExcludingInterval(
                                lastSelectedItemIndex,
                                clickedItemIndex,
                              ),
                            owner._selectItemsInInterval(
                              lastSelectedItemIndex,
                              clickedItemIndex,
                              1,
                            ))
                          : lastSelectedItemIndex > clickedItemIndex
                            ? (e.ctrlKey ||
                                owner._clearSelectedItemsExcludingInterval(
                                  clickedItemIndex,
                                  lastSelectedItemIndex,
                                ),
                              owner._selectItemsInInterval(
                                clickedItemIndex,
                                lastSelectedItemIndex,
                                1,
                              ))
                            : owner._clearSelectedItemsExcludingInterval(
                                lastSelectedItemIndex,
                                lastSelectedItemIndex,
                              );
                  }
                  (e.ctrlKey || (!e.ctrlKey && !e.shiftKey)) &&
                    (this._lastSelectedItemIndex = owner._searchRowIndex(
                      el.id,
                    )),
                    (this._selectionInProgress = !1),
                    this._selectRowInternal(
                      el,
                      e,
                      isClientSelectCheckBox,
                      !0,
                      !0,
                    );
                } else if (isClientSelectCheckBox) {
                  var itemSelected = Array.contains(
                    owner._selectedIndexes,
                    el.id.split("__")[1],
                  );
                  this._selectRowInternal(
                    el,
                    e,
                    itemSelected,
                    itemSelected,
                    !0,
                  );
                } else this._selectRowInternal(el, e, !1, !1, !0);
                owner._keyboardNavigationProperties.lastClickSelectedItem = el;
              }
            }
          }
          if (
            owner.ClientSettings &&
            owner.ClientSettings.EnablePostBackOnRowClick &&
            el &&
            (el &&
              "tr" != el.tagName.toLowerCase() &&
              (el = Telerik.Web.UI.Grid.GetFirstParentByTagName(el, "tr")),
            el && "" != el.id && 2 == el.id.split("__").length)
          ) {
            var tableView = $find(
              Telerik.Web.UI.Grid.GetFirstParentByTagName(el, "table").id,
            );
            if (tableView && tableView.get_owner() == this._owner) {
              var itemIndex = el.id.split("__")[1],
                postBackFunction = owner.ClientSettings.PostBackFunction;
              (postBackFunction = postBackFunction.replace(
                "{0}",
                owner.UniqueID,
              )),
                (postBackFunction = postBackFunction.replace(
                  "{1}",
                  "RowClick;" + itemIndex,
                )),
                eval(postBackFunction);
            }
          }
        }
      }
    },
    _selectRowInternal: function (e, t, i, r, n, l) {
      if (!Sys.UI.DomElement.containsCssClass(e, "rgDeletedRow")) {
        var o;
        void 0 === l ? ((l = !0), (o = !1)) : (o = l);
        var a = e.id.split("__")[1],
          s = $find(e.id.split("__")[0]);
        s.get_dataItems();
        var d = $find(e.id);
        if (!d || d.get_selectable()) {
          var h, u, _, g, c, m;
          if (!i) {
            var p =
              (t.rawEvent && !t.rawEvent.metaKey) || $telerik.isTouchDevice;
            if (
              !this._owner.AllowMultiRowSelection ||
              (this._owner.AllowMultiRowSelection &&
                !t.ctrlKey &&
                !t.shiftKey &&
                p)
            ) {
              if (
                (t.shiftKey ||
                  (this._owner._keyboardNavigationProperties.lastSelectedRowIndex =
                    this._owner._searchRowIndex(e.id)),
                this._owner._selectedItemsInternal.length > 0)
              )
                for (
                  u = this._owner._selectedItemsInternal.length - 1;
                  u >= 0;

                ) {
                  var f = $get(this._owner._selectedItemsInternal[u].id);
                  if (null != f)
                    if (!(d = $find(f.id)) || d.get_selectable())
                      if (
                        ((m = new Telerik.Web.UI.GridDataItemCancelEventArgs(
                          f,
                          t,
                        )),
                        this._owner.raise_rowDeselecting(m),
                        m.get_cancel())
                      )
                        u--;
                      else {
                        if (
                          (Sys.UI.DomElement.removeCssClass(
                            f,
                            s._data._selectedItemStyleClass,
                          ),
                          s._data._selectedItemStyle)
                        ) {
                          for (
                            c = f.style.cssText
                              .toLowerCase()
                              .replace(/ /g, "")
                              .split(";"),
                              _ = 0;
                            _ < c.length;
                            _++
                          )
                            -1 !=
                              s._data._selectedItemStyle
                                .toLowerCase()
                                .indexOf(c[_]) && (c[_] = "");
                          f.style.cssText = c.join(";");
                        }
                        this._checkClientSelectColumn(f, !1),
                          (h = $find(
                            this._owner._selectedItemsInternal[u].id,
                          )) && (h._selected = !1),
                          Array.remove(
                            this._owner._selectedItemsInternal,
                            this._owner._selectedItemsInternal[u],
                          ),
                          Array.remove(
                            this._owner._selectedIndexes,
                            this._owner._selectedIndexes[u],
                          ),
                          this._owner.get_enableAriaSupport() &&
                            f.setAttribute("aria-selected", "false"),
                          this._owner.raise_rowDeselected(
                            new Telerik.Web.UI.GridDataItemEventArgs(f, t),
                          ),
                          (u = Math.min(
                            this._owner._selectedItemsInternal.length,
                            u,
                          )),
                          u--;
                      }
                    else u--;
                  else
                    Array.remove(
                      this._owner._selectedItemsInternal,
                      this._owner._selectedItemsInternal[u],
                    ),
                      Array.remove(
                        this._owner._selectedIndexes,
                        this._owner._selectedIndexes[u],
                      ),
                      u--;
                }
              (g = this._getTableHeaderRow(e.parentNode.parentNode)) &&
                this._checkClientSelectColumn(g, !1);
            }
          }
          if (Array.contains(this._owner._selectedIndexes, a)) {
            if (
              (r || (i && !l)) &&
              !t.shiftKey &&
              ((m = new Telerik.Web.UI.GridDataItemCancelEventArgs(e, t)),
              this._owner.raise_rowDeselecting(m),
              !m.get_cancel())
            ) {
              if (
                (Sys.UI.DomElement.removeCssClass(
                  e,
                  s._data._selectedItemStyleClass,
                ),
                s._data._selectedItemStyle)
              ) {
                for (
                  c = e.style.cssText
                    .toLowerCase()
                    .replace(/ /g, "")
                    .split(";"),
                    _ = 0;
                  _ < c.length;
                  _++
                )
                  -1 !=
                    s._data._selectedItemStyle.toLowerCase().indexOf(c[_]) &&
                    (c[_] = "");
                e.style.cssText = c.join(";");
              }
              for (u = 0; u < this._owner._selectedItemsInternal.length; u++)
                if (this._owner._selectedItemsInternal[u].itemIndex == a) {
                  (h = $find(this._owner._selectedItemsInternal[u].id)) &&
                    (h._selected = !1),
                    Array.remove(
                      this._owner._selectedItemsInternal,
                      this._owner._selectedItemsInternal[u],
                    );
                  break;
                }
              for (u = 0; u < this._owner._selectedIndexes.length; u++)
                if (this._owner._selectedIndexes[u] == a) {
                  Array.remove(
                    this._owner._selectedIndexes,
                    this._owner._selectedIndexes[u],
                  );
                  break;
                }
              this._checkClientSelectColumn(e, !1),
                this._owner.get_enableAriaSupport() &&
                  e.setAttribute("aria-selected", "false"),
                this._owner.raise_rowDeselected(
                  new Telerik.Web.UI.GridDataItemEventArgs(e, t),
                ),
                null != e.parentNode &&
                  void 0 !== e.parentNode &&
                  null != e.parentNode.parentNode &&
                  void 0 !== e.parentNode.parentNode &&
                  (g = this._getTableHeaderRow(e.parentNode.parentNode)) &&
                  this._checkClientSelectColumn(g, !1);
            }
          } else if (
            !this._owner.AllowMultiRowSelection &&
            this._owner._selectedIndexes.length > 0
          )
            this._checkClientSelectColumn(e, !1);
          else if (!i || l) {
            if (
              ((m = new Telerik.Web.UI.GridDataItemCancelEventArgs(e, t)),
              this._owner.raise_rowSelecting(m),
              m.get_cancel())
            )
              return (
                i &&
                  (this._checkClientSelectColumn(e, !1),
                  null != e.parentNode &&
                    void 0 !== e.parentNode &&
                    null != e.parentNode.parentNode &&
                    void 0 !== e.parentNode.parentNode &&
                    (g = this._getTableHeaderRow(e.parentNode.parentNode)) &&
                    this._checkClientSelectColumn(g, !1)),
                !1
              );
            Sys.UI.DomElement.addCssClass(e, s._data._selectedItemStyleClass),
              "" != s._data._selectedItemStyle &&
                (e.style.cssText =
                  e.style.cssText + ";" + s._data._selectedItemStyle),
              Array.add(this._owner._selectedItemsInternal, {
                itemIndex: a,
                id: e.id,
              }),
              Array.add(this._owner._selectedIndexes, a),
              this._checkClientSelectColumn(e, !0),
              (h = $find(e.id)) && (h._selected = !0),
              this._owner.get_enableAriaSupport() &&
                e.setAttribute("aria-selected", "true"),
              this._owner.raise_rowSelected(
                new Telerik.Web.UI.GridDataItemEventArgs(e, t),
              );
            var w = 0,
              C = s.get_dataItems();
            for (u = 0; u < C.length; u++)
              C[u].get_selectable() || C[u].get_selected() || w++;
            o ||
              s.get_selectedItems().length != s.get_dataItems().length - w ||
              (null != e.parentNode &&
                void 0 !== e.parentNode &&
                null != e.parentNode.parentNode &&
                void 0 !== e.parentNode.parentNode &&
                (g = this._getTableHeaderRow(e.parentNode.parentNode)) &&
                this._checkClientSelectColumn(g, !0));
          }
          return (
            n && this._owner.updateClientState(),
            this._selectRowInternalSetActiveRow(e, t),
            !0
          );
        }
        this._selectRowInternalSetActiveRow(e, t);
      }
    },
    _selectRowInternalSetActiveRow: function (e, t) {
      if (this._owner.ClientSettings.AllowKeyboardNavigation) {
        if (
          this._selectionInProgress &&
          this._owner.get_allowMultiRowSelection()
        )
          return !0;
        this._owner._activeRow &&
          e.id != this._owner._activeRow.id &&
          this._owner._setActiveRow(e, t);
      }
    },
    _checkClientSelectColumn: function (e, t) {
      for (var i = e.getElementsByTagName("input"), r = 0; r < i.length; r++) {
        var n = i[r];
        "checkbox" == n.type.toLowerCase() &&
          n.id &&
          -1 != n.id.indexOf("SelectCheckBox") &&
          ((n.checked = t),
          this._owner.get_enableAriaSupport() &&
            n.setAttribute("aria-checked", t.toString()),
          $telerik.isSafari && (n.safarichecked = t));
      }
    },
    _getTableHeaderRow: function (e) {
      var t = Telerik.Web.UI.Grid.getTableHeaderRow(e),
        i = this._owner.get_masterTableView()._hasMultiHeaders;
      return (
        t ||
          ((t = $get(
            String.format(
              "{0}_Header",
              this.get_owner().get_masterTableView().get_id(),
            ),
          )) &&
            (t = Telerik.Web.UI.Grid.getTableHeaderRow(t))),
        i && "thead" == t.parentNode.tagName.toLowerCase() ? t.parentNode : t
      );
    },
    _findClientSelectColumn: function (e) {
      if (e) {
        var t = e.getElementsByTagName("input");
        if (t)
          for (var i = 0; i < t.length; i++) {
            var r = t[i];
            if (
              "checkbox" == r.type.toLowerCase() &&
              r.id &&
              -1 != r.id.indexOf("SelectCheckBox")
            )
              return r;
          }
      }
    },
  }),
  Telerik.Web.UI.GridSelection.registerClass(
    "Telerik.Web.UI.GridSelection",
    Sys.Component,
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridTableView = function (e) {
    Telerik.Web.UI.GridTableView.initializeBase(this, [e]),
      (this._owner = {}),
      (this._data = {}),
      (this._hiddenCols = {}),
      (this._dataItemsCreated = !1),
      (this._dataItems = []),
      (this._cachedItems = []),
      (this._columnsInternal = []),
      (this._sortExpressions = new Telerik.Web.UI.GridSortExpressions()),
      (this._filterExpressions = new Telerik.Web.UI.GridFilterExpressions()),
      (this._firstDataRow = null),
      this._exapndedGroupItemsTemp,
      this._enableGroupsExpandAll,
      (this._groupHeadersCount = []),
      this._enableHierarchyExpandAll,
      (this._dataSource = null),
      (this._preventUpdatePager = !1),
      (this._virtualItemCount = 0),
      (this._pageButtonCount = 10),
      (this._hasDetailTables = !1),
      (this._hasMultiHeaders = !1),
      (this._hierarchyLoadMode = "ServerOnDemand"),
      (this.__shouldPerformFiltering = !0),
      (this._shouldAutoPostBackOnFilter = !0),
      (this._rangeValidationInProcess = !1),
      (this._calculatedParentTableCells = !1),
      (this._groupLevelsCount = 0),
      (this._groupColumnIndex = 1),
      (this._originalGroupLevel = null),
      (this._resizedColumnsData = new Telerik.Web.UI.Grid.ClientStateData()),
      (this._hidedItemsData = new Telerik.Web.UI.Grid.ClientStateData()),
      (this._showedItemsData = new Telerik.Web.UI.Grid.ClientStateData()),
      (this._resizedItemsData = new Telerik.Web.UI.Grid.ClientStateData()),
      (this._resizedControlData = new Telerik.Web.UI.Grid.ClientStateData()),
      this._includeAllHeaderRows,
      this._scrollbarHeight;
  }),
  (Telerik.Web.UI.GridTableView.prototype = {
    initialize: function () {
      if (
        (Telerik.Web.UI.GridTableView.callBaseMethod(this, "initialize"),
        this._element && this._owner && this._owner._element)
      )
        for (var e = this._element.parentNode; e; ) {
          if (this._owner._element == e && e.control) {
            this._owner = e.control;
            break;
          }
          e = e.parentNode;
        }
      var t, i;
      if (
        ($telerik.isIE &&
          this._data &&
          this._data._batchEditingSettings &&
          "mousedown" ==
            (this._data._batchEditingSettings.eventType || "").toLowerCase() &&
          (this._data._batchEditingSettings.eventType = "click"),
        "" == this._data._selectedItemStyleClass &&
          "" == this._data._selectedItemStyle &&
          (this._data._selectedItemStyle =
            "background-color:navy;color:white;"),
        "" == this._data._renderActiveItemStyleClass &&
          "" == this._data._renderActiveItemStyle &&
          (this._data._renderActiveItemStyle =
            "background-color:navy;color:white;"),
        (this.ColGroup = Telerik.Web.UI.Grid.GetTableColGroup(
          this.get_element(),
        )),
        this.ColGroup &&
          (this.ColGroup.Cols = Telerik.Web.UI.Grid.GetTableColGroupCols(
            this.ColGroup,
          )),
        $telerik.quirksMode)
      )
        for (t = 0; t < this.ColGroup.Cols.length; t++)
          "none" == this.ColGroup.Cols[t].style.display &&
            (this.ColGroup.Cols[t].style.display = "");
      (this.PageSize = this._data.PageSize),
        (this.PageCount = this._data.PageCount),
        (this.CurrentPageIndex = this._data.CurrentPageIndex),
        (this._virtualItemCount = this._data.VirtualItemCount),
        (this._pageButtonCount = this._data.PageButtonCount),
        (this._hasDetailTables = this._data.HasDetailTables),
        (this._hasMultiHeaders = this._data.HasMultiHeaders),
        this._data.GroupLevelsCount &&
          ((this._groupLevelsCount = 1 * this._data.GroupLevelsCount),
          (this._exapndedGroupItemsTemp = new Array(this._groupLevelsCount))),
        this._data.GroupHeadersCount &&
          (this._groupHeadersCount = this._data.GroupHeadersCount),
        this._data.HierarchyLoadMode &&
          (this._hierarchyLoadMode = this._data.HierarchyLoadMode),
        this._data.EnableGroupsExpandAll &&
          (this._enableGroupsExpandAll = this._data.EnableGroupsExpandAll),
        this._data.EnableHierarchyExpandAll &&
          (this._enableHierarchyExpandAll =
            this._data.EnableHierarchyExpandAll);
      var r = null,
        n =
          this._owner.ClientSettings.Scrolling &&
          this._owner.ClientSettings.Scrolling.AllowScroll &&
          this._owner.ClientSettings.Scrolling.UseStaticHeaders;
      if (
        (-1 != this.get_element().id.indexOf("_Header") && n) ||
        (!n && -1 == this.get_element().id.indexOf("_Header")) ||
        -1 != this.get_element().id.indexOf("_Detail")
      ) {
        var l = [];
        if (
          (this._hasMultiHeaders
            ? ((l = Telerik.Web.UI.Grid.getMultiHeaderCells(this)),
              (this.MultiHeaderCells = l))
            : (r = Telerik.Web.UI.Grid.getTableHeaderRow(this.get_element())),
          !r)
        ) {
          var o = $get(this.get_element().id + "_Header");
          o && (r = Telerik.Web.UI.Grid.getTableHeaderRow(o));
        }
        this.HeaderRow = r;
        var a = this._owner.ClientSettings;
        $telerik.isMobileIE10 &&
          (a.AllowRowsDragDrop || (a.Scrolling && a.Scrolling.AllowScroll)) &&
          ((this.get_element().style.msTouchAction = "none"),
          (this.get_element().style.touchAction = "none"));
        var s = this._data._columnsData;
        for (i = 0; i < s.length; i++)
          if (r || (l && l[i])) {
            var d = s[i],
              h = this._hasMultiHeaders ? l[i] : r.cells[i];
            if (h) {
              this._owner.raise_columnCreating(new Sys.EventArgs());
              var u = $create(
                  Telerik.Web.UI.GridColumn,
                  { _owner: this, _data: d },
                  null,
                  null,
                  h,
                ),
                _ = new Sys.EventArgs();
              (_.get_column = function () {
                return u;
              }),
                Array.add(this._columnsInternal, u),
                this._owner.raise_columnCreated(_);
            }
          }
        if ((this._setupHeaderRotations(), this._hasMultiHeaders)) {
          var g = this.get_element().tHead,
            c = this._owner.ClientSettings.Scrolling;
          c &&
            c.AllowScroll &&
            c.UseStaticHeaders &&
            !Telerik.Web.UI.Grid.isDetailTable(this) &&
            (g =
              this.get_owner().GridHeaderDiv.getElementsByTagName("table")[0]
                .tHead);
          var m = [];
          if (g && g.rows)
            for (var p = 0; p < g.rows.length; p++) {
              var f = g.rows[p];
              f.className &&
                f.className.indexOf("rgMultiHeaderRow") > -1 &&
                m.push(f);
            }
          this._calculatedParentTableCells ||
            ((this._calculatedParentTableCells = !0),
            this._setParentTableCells(m));
        }
      }
      $telerik.isIE &&
        document.documentMode &&
        document.documentMode <= 7 &&
        this._setHeaderFooterSpan(),
        this._data.VirtualizationDataAsJSON &&
        -1 !== this.get_element().parentNode.id.indexOf("_GridData")
          ? ((this._virtualization = $create(
              Telerik.Web.UI.GridVirtualization,
              null,
              null,
              { _tableView: this.get_id() },
              null,
            )),
            (this._virtualization._tableView = this),
            this._owner.ClientSettings.Virtualization.StartIndex &&
              (this._virtualization._startIndex =
                this._owner.ClientSettings.Virtualization.StartIndex),
            this._virtualization.initialize())
          : (this._owner.get_events().getHandler("rowCreating") ||
              this._owner.get_events().getHandler("rowCreated")) &&
            this.get_dataItems(),
        this._owner.get_enableAriaSupport() && this._initializeAriaSupport();
    },
    dispose: function () {
      var e;
      for (
        this._owner.raise_tableDestroying(Sys.EventArgs.Empty),
          this._sortExpressions.dispose(),
          this._filterExpressions.dispose(),
          window.$clearHandlers(this.get_element()),
          this.get_element().tBodies[0] &&
            window.$clearHandlers(this.get_element().tBodies[0]),
          e = 0;
        e < this._dataItems.length;
        e++
      )
        this._dataItems[e] &&
          (this._dataItems[e].dispose(), (this._dataItems[e] = null));
      if (this._cachedItems)
        for (e = 0; e < this._cachedItems.length; e++)
          this._cachedItems[e] &&
            (this._cachedItems[e].dispose(), (this._cachedItems[e] = null));
      (this._dataItems = []),
        null != this.ColGroup &&
          null != this.ColGroup.Cols &&
          (this.ColGroup.Cols = null),
        null != this.ColGroup && (this.ColGroup = null),
        (this._element.control = null),
        (this._owner = null),
        (this._data = null),
        (this._hiddenCols = null),
        (this._dataItems = null),
        (this._cachedItems = null),
        (this._columnsInternal = null),
        (this._groupHeadersCount = null),
        Telerik.Web.UI.GridTableView.callBaseMethod(this, "dispose");
    },
    _setupHeaderRotations: function () {
      var e,
        t,
        i = this.get_columns(),
        r = 0;
      for (t = 0; t < i.length; t++)
        (e = i[t].get_element()),
          Sys.UI.DomElement.containsCssClass(e, "rgRotateHeader") &&
            e.children[0].offsetWidth > r &&
            (r = e.children[0].offsetWidth);
      if (
        !(parseInt($telerik.getComputedStyle(e, "height", 0), 10) > r) &&
        ($telerik.isOpera &&
          (r += [
            "paddingTop",
            "paddingBottom",
            "borderTopWidth",
            "borderBottomWidth",
          ].reduce(function (t, i) {
            var r = parseInt($telerik.getCurrentStyle(e, i), 10);
            return t + (isNaN(r) ? 0 : r);
          }, 0)),
        0 != r)
      )
        for (t = 0; t < i.length; t++)
          "" == i[t].get_element().style.height &&
            (i[t].get_element().style.height = r + "px");
    },
    get_columns: function () {
      return this._columnsInternal;
    },
    showFilterItem: function () {
      this._toggleFilterItemVisibility(!0);
    },
    hideFilterItem: function () {
      this._toggleFilterItemVisibility(!1);
    },
    get_isFilterItemVisible: function () {
      return this._data.isFilterItemExpanded;
    },
    _toggleFilterItemVisibility: function (e) {
      var t = this._getTableFilterRow();
      t &&
        e != this._data.isFilterItemExpanded &&
        ((t.style.display = e ? "" : "none"),
        (this._data.isFilterItemExpanded = e),
        Array.add(this._owner._expandedFilterItems, this._data.UniqueID + "!"),
        this._owner.updateClientState());
    },
    get_tableFilterRow: function () {
      return this._getTableFilterRow();
    },
    _getTableFilterRow: function () {
      var e,
        t,
        i = null,
        r = this.get_element();
      if (r.tHead && "none" != r.tHead.style.display) {
        if (this._hasMultiHeaders)
          for (e = 0; e < r.tHead.rows.length; e++)
            if (
              (t = r.tHead.rows[e]).className &&
              t.className.indexOf("rgFilterRow") > -1
            )
              return t;
        if (!this.HeaderRow) return null;
        for (
          e = this.HeaderRow ? this.HeaderRow.rowIndex : 1;
          e < r.tHead.rows.length;
          e++
        )
          if (
            null != (t = r.tHead.rows[e]) &&
            null != t.cells[0] &&
            null != t.cells[0].tagName &&
            "th" != t.cells[0].tagName.toLowerCase() &&
            t.className &&
            t.className.indexOf("rgFilterRow") > -1
          ) {
            i = t;
            break;
          }
      } else if (
        this._owner.get_masterTableViewHeader() &&
        this._owner.get_masterTableViewHeader().get_element()
      ) {
        if (
          (r = this._owner.get_masterTableViewHeader().get_element()).tHead &&
          this._hasMultiHeaders
        )
          for (e = 0; e < r.tHead.rows.length; e++)
            if (
              (t = r.tHead.rows[e]).className &&
              t.className.indexOf("rgFilterRow") > -1
            )
              return t;
        for (e = 1; e < r.rows.length; e++)
          if (
            null != (t = r.tHead.rows[e]) &&
            null != t.cells[0] &&
            null != t.cells[0].tagName &&
            t.className &&
            t.className.indexOf("rgFilterRow") > -1
          ) {
            i = r.tHead.rows[e];
            break;
          }
      }
      return i;
    },
    _initializeAriaSupport: function () {
      var e = this.get_element();
      if (e.id && -1 != e.id.indexOf("Detail")) {
        e.setAttribute("role", "listitem");
        var t = e.parentNode;
        t && "td" == t.tagName.toLowerCase() && t.setAttribute("role", "group");
        var i = this.get_dataItems();
        if (i.length > 0) {
          var r = i[0].get_element().id.split(":").length;
          e.setAttribute("aria-level", r.toString());
        }
      }
      var n = this.get_tableFilterRow();
      if (n)
        for (
          var l = n.getElementsByTagName("input"), o = 0;
          o < l.length;
          o++
        ) {
          var a = l[o];
          if ("none" != a.style.display && "hidden" != a.style.visibility) {
            var s = a.type.toLowerCase();
            "text" == s && a.setAttribute("role", "textbox"),
              ("submit" != s && "button" != s) ||
                a.setAttribute("role", "button"),
              "checkbox" == s && a.setAttribute("role", "checkbox");
          }
        }
      var d = this;
      setTimeout(function () {
        d._initializeTableViewAriaSupport();
      });
    },
    _initializeTableViewAriaSupport: function () {
      var e,
        t,
        i,
        r,
        n = this.get_owner().ClientSettings,
        l = this.get_columns(),
        o = this._data.EditMode,
        a = this.get_dataItems();
      for (e = 0; e < a.length; e++) {
        if (
          ((i = a[e]),
          n && n.AllowRowsDragDrop && n.Selecting && n.Selecting.AllowRowSelect)
        )
          i.get_element().setAttribute("aria-dropeffect", "move");
        for (t = 0; t < l.length; t++) {
          var s = l[t],
            d = null,
            h = s.get_element();
          "none" == h.style.display && h.setAttribute("aria-hidden", "true"),
            n.AllowColumnsReorder && h.setAttribute("aria-dropeffect", "move");
          var u = s.get_uniqueName();
          if (
            (h.childNodes.length > 0 &&
              h.setAttribute(
                "aria-label",
                s._data.UniqueName.replace(/[_-]/g, " "),
              ),
            "GridEditCommandColumn" == s._data.ColumnType &&
              "PopUp" == o &&
              (d = u),
            (r = i.get_cell(u)),
            "GridClientSelectColumn" == s._data.ColumnType ||
              "GridCheckBoxColumn" == s._data.ColumnType)
          ) {
            var _ = r.getElementsByTagName("input");
            if (_.length > 0) {
              var g = _[0];
              if (g && g.id) {
                var c = s._data.UniqueName + " checkbox";
                g.setAttribute("role", "checkbox"),
                  g.setAttribute("title", c),
                  g.setAttribute("aria-label", c),
                  g.setAttribute("aria-checked", g.checked);
              }
            }
          }
          "none" == r.style.display && r.setAttribute("aria-hidden", "true"),
            s.get_readOnly() && r.setAttribute("aria-readonly", "true"),
            d &&
              "PopUp" == o &&
              r &&
              r.firstChild &&
              ("img" == r.firstChild.tagName.toLowerCase() ||
                "a" == r.firstChild.tagName.toLowerCase() ||
                "input" == r.firstChild.tagName.toLowerCase()) &&
              r.firstChild.setAttribute("aria-haspopup", "true");
        }
      }
    },
    _handleAutoPostBackOnFilterWithoutDelay: function (e, t, i) {
      var r = $find(e);
      this._currentFilterTimeoutID &&
        clearTimeout(this._currentFilterTimeoutID);
      try {
        var n = this.get_id();
        this._currentFilterTimeoutID = setTimeout(function () {
          var e = $find(n),
            i = r.get_textBoxValue(),
            l = r.parseDate(i);
          e._shouldAutoPostBackOnFilter &&
            (null != l
              ? (r.set_selectedDate(l),
                r.get_selectedDate() &&
                  e.filter(t, e._getFilterControlValue(t)))
              : "" == i &&
                (e.__shouldPerformFiltering
                  ? e.filter(t, "")
                  : (this.__shouldPerformFiltering = !0)));
        }, i);
      } catch (e) {}
    },
    _handleAutoPostBackOnFilterWithDelay: function (e, t, i, r) {
      var n = $find(t),
        l = e || window.event;
      this._currentFilterTimeoutID &&
        clearTimeout(this._currentFilterTimeoutID);
      try {
        13 == l.keyCode || 20 == l.keyCode
          ? ((l.cancelBubble = !0),
            (l.returnValue = !1),
            l.stopPropagation && (l.stopPropagation(), l.preventDefault()),
            (this._currentFilterTimeoutID = setTimeout(function () {
              var e = n.get_textBoxValue(),
                t = n.parseDate(e);
              null != t
                ? n.set_selectedDate(t)
                : "" == e && n.set_selectedDate(e);
            }, 0)))
          : (this._currentFilterTimeoutID = setTimeout(function () {
              var e = n.get_textBoxValue(),
                t = n.parseDate(e);
              null != t
                ? n.set_selectedDate(t)
                : "" == e && n.set_selectedDate(e);
            }, r));
      } catch (e) {}
    },
    _filterOnKeyDownWithDelay: function (e, t, i, r, n) {
      var l = e || window.event;
      if (8 == l.keyCode || 46 == l.keyCode) {
        this._currentFilterTimeoutID &&
          clearTimeout(this._currentFilterTimeoutID);
        var o = this.get_id();
        !$telerik.isOpera || n
          ? (this._currentFilterTimeoutID = setTimeout(function () {
              $find(o).filter(i, $get(t).value);
            }, r))
          : (this._currentFilterTimeoutID = setTimeout(function () {
              $get(t).blur();
            }, r));
      }
    },
    _filterOnKeyPressWithDelay: function (e, t, i, r, n) {
      var l = e || window.event,
        o = this.get_id();
      if (
        !$telerik.isFirefox ||
        !(
          (l.keyCode >= 33 && l.keyCode <= 40) ||
          (l.keyCode >= 112 && l.keyCode <= 123) ||
          (l.keyCode >= 16 && l.keyCode <= 20) ||
          (l.keyCode >= 144 && l.keyCode <= 145) ||
          (l.keyCode >= 92 && l.keyCode <= 93)
        )
      ) {
        if (
          (this._currentFilterTimeoutID &&
            clearTimeout(this._currentFilterTimeoutID),
          13 == l.keyCode)
        )
          return (
            (l.cancelBubble = !0),
            (l.returnValue = !1),
            l.preventDefault && (l.preventDefault(), l.stopPropagation()),
            !$telerik.isOpera || n
              ? (this._currentFilterTimeoutID = setTimeout(function () {
                  $find(o).filter(i, $get(t).value);
                }, 0))
              : (this._currentFilterTimeoutID = setTimeout(function () {
                  $get(t).blur();
                }, 0)),
            !1
          );
        !$telerik.isOpera || n
          ? (this._currentFilterTimeoutID = setTimeout(function () {
              $find(o).filter(i, $get(t).value);
            }, r))
          : (this._currentFilterTimeoutID = setTimeout(function () {
              $get(t).blur();
            }, r));
      }
    },
    _filterNoDelay: function (e, t) {
      var i = this.get_id();
      this._currentFilterTimeoutID &&
        clearTimeout(this._currentFilterTimeoutID),
        (this._currentFilterTimeoutID = setTimeout(function () {
          var r = $get(e).value,
            n = $find(e);
          n && n.get_value && (r = n.get_value()), $find(i).filter(t, r);
        }, 0));
    },
    get_clientDataKeyNames: function () {
      var e = [];
      return (
        this._data.clientDataKeyNames && (e = this._data.clientDataKeyNames), e
      );
    },
    get_dataItems: function () {
      if (
        this._dataItemsCreated ||
        (this._cachedItems && this._cachedItems.length > 0)
      )
        return this._dataItems;
      this._dataItemsCreated = !0;
      var e,
        t,
        i,
        r,
        n = (
          $telerik.isOpera ? this.get_element() : this.get_element().tBodies[0]
        ).rows;
      for (e = 0, i = n.length; e < i; e++) {
        var l = n[e];
        if (l.id) {
          var o = $find(l.id);
          this._owner.raise_rowCreating(
            new Telerik.Web.UI.GridDataItemCancelEventArgs(l, null),
          );
          var a = !0,
            s = this._owner._unselectableItemsInternal;
          for (t = 0, r = s.length; t < r; t++)
            if (s[t].id == l.id) {
              a = !1;
              break;
            }
          var d = !1;
          for (t = 0; t < this._owner._selectedItemsInternal.length; t++)
            if (this._owner._selectedItemsInternal[t].id == l.id) {
              d = !0;
              break;
            }
          var h = !1;
          for (
            this._owner._expandItems[l.id.split("__")[1]] && (h = !0), t = 0;
            t < this._owner._expandedItems.length;
            t++
          )
            if (this._owner._expandedItems[t] == l.id.split("__")[1]) {
              h = !h;
              break;
            }
          o ||
            (o = $create(
              Telerik.Web.UI.GridDataItem,
              { _owner: this, _data: {} },
              null,
              null,
              l,
            )),
            (o._selectable = a),
            (o._selected = d),
            (o._expanded = h),
            (o._itemIndexHierarchical = l.id.split("__")[1]),
            this._virtualization && this._virtualization.updateItemState(o),
            (this._dataItems[this._dataItems.length] = o),
            0 == e && this._saveCellAttributes(o),
            this._owner.raise_rowCreated(
              new Telerik.Web.UI.GridDataItemEventArgs(l, null),
            );
        }
      }
      return (
        this._virtualization &&
          this._virtualization.updateItemsCellSelectionState(),
        this._dataItems
      );
    },
    get_owner: function () {
      return this._owner;
    },
    get_name: function () {
      return this._data.Name;
    },
    get_isItemInserted: function () {
      if ("Batch" == this._data.EditMode) {
        var e = this.get_dataItems();
        return e.length > 0 && e[0].get_element().id.indexOf("-") >= 0;
      }
      return this._data.IsItemInserted;
    },
    get_insertItem: function () {
      var e = $find(this._owner.get_id()),
        t = null;
      function i(e) {
        for (var t = 0; t < e.length; t++) {
          var i = e[t];
          if (i.className.indexOf("rgEditRow") > -1) return i;
          var r = i.getElementsByTagName("div")[0];
          if (r && r.className.indexOf("rgEditForm") > -1) return i;
        }
        return null;
      }
      if (
        this === e.get_masterTableView() &&
        e.ClientSettings.Scrolling.AllowScroll &&
        e.ClientSettings.Scrolling.UseStaticHeaders
      ) {
        if (e.GridHeaderDiv) {
          var r = e.GridHeaderDiv.getElementsByTagName("thead")[0];
          r && (t = i(r.rows)),
            !t && e.PagerControl && (t = i(e.PagerControl.rows));
        }
      } else {
        var n = this.get_element();
        n.tHead && (t = i(n.tHead.rows)),
          !t && n.tFoot && (t = i(n.tFoot.rows));
      }
      return t;
    },
    get_editItems: function () {
      for (var e = [], t = this.get_dataItems(), i = 0; i < t.length; i++)
        t[i].get_isInEditMode() && (e[e.length] = t[i]);
      return e;
    },
    _handlerKeyDownInInserItem: function (e) {
      var t = e.keyCode || e.charCode;
      e.charCode &&
        (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0));
      var i =
          t ==
          this._owner.ClientSettings.KeyboardNavigationSettings
            .ExitEditInsertModeKey,
        r =
          t ==
          this._owner.ClientSettings.KeyboardNavigationSettings
            .UpdateInsertItemKey;
      if (this._owner._canHandleKeyboardAction(e))
        return (
          i
            ? (this.cancelInsert(),
              (e.cancelBubble = !0),
              (e.returnValue = !1),
              e.stopPropagation && (e.preventDefault(), e.stopPropagation()))
            : r &&
              (this.insertItem(),
              (e.cancelBubble = !0),
              (e.returnValue = !1),
              e.stopPropagation && (e.preventDefault(), e.stopPropagation())),
          !1
        );
    },
    _showNotFrozenColumn: function (e) {
      this._hideShowNotFrozenColumn(e, !0, !0);
    },
    _hideNotFrozenColumn: function (e) {
      this._hideShowNotFrozenColumn(e, !1, !0);
    },
    showColumn: function (e) {
      if (!this.get_columns()[e].get_visible()) {
        var t = new Telerik.Web.UI.GridColumnCancelEventArgs(
          this.get_columns()[e],
          null,
        );
        if ((this._owner.raise_columnShowing(t), t.get_cancel())) return !1;
        this._hideShowColumn(e, !0);
        var i =
          this._data.UniqueID + "," + this.get_columns()[e].get_uniqueName();
        Array.contains(this._owner._showedColumns, i) ||
          Array.add(this._owner._showedColumns, i),
          Array.contains(this._owner._hidedColumns, i) &&
            Array.remove(this._owner._hidedColumns, i),
          this._owner.updateClientState(),
          $find(this._owner.get_id()).repaint(),
          (t = new Telerik.Web.UI.GridColumnEventArgs(
            this.get_columns()[e],
            null,
          )),
          this._owner.raise_columnShown(t);
      }
    },
    hideColumn: function (e) {
      if (this.get_columns()[e].get_visible()) {
        if (1 == this._getVisibleColumnsCount()) {
          var t = this.get_columns()[e]._data.ColumnType;
          if (!this._isHelperColumnType(t)) return;
        }
        var i = new Telerik.Web.UI.GridColumnCancelEventArgs(
          this.get_columns()[e],
          null,
        );
        if ((this._owner.raise_columnHiding(i), i.get_cancel())) return !1;
        this._hideShowColumn(e, !1);
        var r =
          this._data.UniqueID + "," + this.get_columns()[e].get_uniqueName();
        Array.contains(this._owner._hidedColumns, r) ||
          Array.add(this._owner._hidedColumns, r),
          Array.contains(this._owner._showedColumns, r) &&
            Array.remove(this._owner._showedColumns, r),
          this._owner.updateClientState(),
          (i = new Telerik.Web.UI.GridColumnEventArgs(
            this.get_columns()[e],
            null,
          )),
          this._owner.raise_columnHidden(i);
      }
    },
    _getVisibleColumnsCount: function () {
      for (
        var e = 0,
          t = this.get_columns(),
          i = null,
          r = null,
          n = 0,
          l = t.length;
        n < l;
        n++
      )
        (r = (i = t[n])._data.ColumnType),
          this._isHelperColumnType(r) ||
            "none" == i.get_element().style.display ||
            e++;
      return e;
    },
    _isHelperColumnType: function (e) {
      return (
        "GridExpandColumn" == e ||
        "GridGroupSplitterColumn" == e ||
        "GridRowIndicatorColumn" == e ||
        "GridDragDropColumn" == e
      );
    },
    _hideShowColumn: function (e, t, i) {
      (t = this.get_columns()[e].Display = t),
        this.get_columns()[e]._data &&
          (this.get_columns()[e]._data.Display = t);
      if (
        (this._owner.ClientSettings.Resizing &&
          this._owner.ClientSettings.Resizing.EnableRealTimeResize &&
          this._owner.ClientSettings.Resizing.EnableRealTimeResize,
        this != this._owner.get_masterTableViewHeader() &&
          this != this._owner.get_masterTableViewFooter() &&
          this != this._owner.get_masterTableView())
      )
        return (
          this._hideShowCol(this, e, t),
          i ||
            Telerik.Web.UI.Grid.hideShowCells(
              this.get_element(),
              e,
              t,
              this.ColGroup.Cols,
            ),
          void this._setHeaderFooterSpan()
        );
      this._owner.get_masterTableViewHeader() &&
        (this._hideShowCol(this._owner.get_masterTableViewHeader(), e, t),
        Telerik.Web.UI.Grid.hideShowCells(
          this._owner.get_masterTableViewHeader().get_element(),
          e,
          t,
          this._owner.get_masterTableView().ColGroup.Cols,
        )),
        this._owner.get_masterTableView() &&
          (this._hideShowCol(this._owner.get_masterTableView(), e, t),
          i ||
            Telerik.Web.UI.Grid.hideShowCells(
              this._owner.get_masterTableView().get_element(),
              e,
              t,
              this._owner.get_masterTableView().ColGroup.Cols,
            )),
        this._owner.get_masterTableViewFooter() &&
          !i &&
          (this._hideShowCol(this._owner.get_masterTableViewFooter(), e, t),
          Telerik.Web.UI.Grid.hideShowCells(
            this._owner.get_masterTableViewFooter().get_element(),
            e,
            t,
            this._owner.get_masterTableViewFooter().ColGroup.Cols,
          )),
        i || this._setHeaderFooterSpan();
    },
    _setParentTableCells: function (e) {
      for (
        var t = [],
          i = this._data.hiddenColumnHeaderSpans.split(";"),
          r = 0,
          n = 0;
        n < e.length - 1;
        n++
      )
        for (var l = e[n], o = 0; o < l.cells.length; o++) {
          var a = l.cells[o];
          a.id || ((a.actualColSpan = parseInt(i[r], 10)), r++);
        }
      for (var s = 0; s < e.length; s++) {
        var d = e[s],
          h = 0,
          u = null,
          _ = 0,
          g = [];
        t.length > 0 &&
          (h = (u = t[0]).actualColSpan ? u.actualColSpan : u.colSpan);
        for (var c = 0; c < d.cells.length; c++) {
          var m = d.cells[c],
            p = m.actualColSpan ? m.actualColSpan : m.colSpan;
          0 == s
            ? ((m.parentCell = null), p)
            : ((m.parentCell = u),
              m.colSpan < h
                ? (h -= p)
                : p == h &&
                  _ < t.length - 1 &&
                  (h = (u = t[++_]).actualColSpan
                    ? u.actualColSpan
                    : u.colSpan)),
            (m.id && -1 != m.id.indexOf("MultiHeader")) || g.push(m);
        }
        t = g;
      }
    },
    _setHeaderFooterSpan: function () {
      var e,
        t,
        i = function (e) {
          if (!e) return 0;
          for (var t = 0, i = 0, r = e.length; i < r; i++) t += e[i].colSpan;
          return t;
        },
        r = this.get_element().tFoot,
        n = this.get_element().tHead,
        l = Math.max(this._getVisibleColumnsLengthOnly(), 1);
      if (r && r.rows)
        for (e = 0, t = r.rows.length; e < t; e++)
          r.rows[e].cells &&
            r.rows[e].cells[0] &&
            l > i(r.rows[e].cells) &&
            (r.rows[e].cells[0].colSpan = l);
      if (n && n.rows)
        for (e = 0, t = n.rows.length; e < t; e++) {
          if (
            n.rows[e] &&
            (n.rows[e] == this.get_element().HeaderRow ||
              (n.rows[e].cells.length > 0 &&
                "th" == n.rows[e].cells[0].tagName.toLowerCase()))
          ) {
            var o =
              this.get_element().tBodies && this.get_element().tBodies[0]
                ? this.get_element().tBodies[0]
                : null;
            o &&
              o.rows &&
              "none" == o.style.display &&
              1 == o.rows[0].cells.length &&
              o.rows[0].cells[0].colSpan &&
              (o.rows[0].cells[0].colSpan = l);
            break;
          }
          n.rows[e] &&
            n.rows[e].cells &&
            n.rows[e].cells.length > 0 &&
            n.rows[e].cells[0] &&
            l > i(n.rows[e].cells) &&
            (n.rows[e].cells[0].colSpan = l);
        }
    },
    _getVisibleColumnsLengthOnly: function () {
      var e = 0,
        t = this.get_columns();
      if (t)
        for (var i = 0, r = t.length; i < r; i++) {
          var n = t[i];
          "hidden" == n.get_element().style.visibility ||
            "none" == n.get_element().style.display ||
            (null != n.Display && !n.Display) ||
            e++;
        }
      return e;
    },
    _getVisibleColumns: function () {
      var e = [],
        t = this.get_columns();
      if (t)
        for (var i = 0, r = t.length; i < r; i++) {
          var n = t[i];
          "hidden" == n.get_element().style.visibility ||
            "none" == n.get_element().style.display ||
            (null != n.Display && !n.Display) ||
            Array.add(e, n);
        }
      return e;
    },
    _hideShowCol: function (e, t, i) {
      if (e && e.ColGroup && e.ColGroup.Cols && e.ColGroup.Cols[t]) {
        var r = e.ColGroup.Cols[t];
        ("" == r.style.display) != i &&
          (i
            ? ((r.style.display = ""),
              this._owner.get_enableAriaSupport() &&
                r.setAttribute("aria-hidden", "false"))
            : ((r.style.display = "none"),
              this._owner.get_enableAriaSupport() &&
                r.setAttribute("aria-hidden", "true")),
          this._tryAddRemoveColWidth(e, i));
      }
    },
    _tryAddRemoveColWidth: function (e, t) {
      var i = null != $get(this._owner.ClientID + "_Frozen");
      if (
        ($telerik.isIE8 || $telerik.isChrome || $telerik.isSafari) &&
        !i &&
        1 === e._getVisibleColumns().length
      ) {
        var r,
          n = e._getVisibleColumns()[0],
          l = n.get_element().cellIndex;
        e &&
          e.ColGroup &&
          e.ColGroup.Cols &&
          e.ColGroup.Cols[l] &&
          ((r = e.ColGroup.Cols[l]),
          t
            ? n._bufferWidth &&
              ((r.style.width = n._bufferWidth), (n._bufferWidth = null))
            : ((n._bufferWidth = r.style.width), (r.style.width = "")));
      }
    },
    _hideShowNotFrozenColumn: function (e, t, i) {
      var r, n, l;
      if (!t && 1 == this._getVisibleColumnsCount()) {
        var o = this.get_columns()[e]._data.ColumnType;
        if (!this._isHelperColumnType(o)) return;
      }
      $telerik.isOpera &&
        navigator.userAgent.substring(
          navigator.userAgent.indexOf("Version/") + 7 + 1,
        ),
        this._owner.get_masterTableViewHeader() &&
          ((this._owner.get_masterTableViewHeader().get_columns()[
            e
          ].FrozenDisplay = t),
          this._hideShowCol(this._owner.get_masterTableViewHeader(), e, t),
          Telerik.Web.UI.Grid.hideShowCells(
            this._owner.get_masterTableViewHeader().get_element(),
            e,
            t,
            this._owner.get_masterTableViewHeader().ColGroup.Cols,
            i,
          ),
          this._setHeaderFooterSpan());
      var a = this._owner.get_masterTableView();
      a &&
        ((a.get_columns()[e].FrozenDisplay = t),
        this._hideShowCol(a, e, t),
        this._hideShowCol(this._owner.get_masterTableView(), e, t),
        Telerik.Web.UI.Grid.hideShowCells(
          a.get_element(),
          e,
          t,
          a.ColGroup.Cols,
          i,
        ),
        this._setHeaderFooterSpan(),
        a.get_element().getElementsByTagName("select").length > 0 &&
          ((l = a.get_element()),
          setTimeout(function () {
            for (r = 0, n = l.rows.length; r < n; r++) {
              var i = l.rows[r].cells[e];
              Telerik.Web.UI.Grid._hideShowSelect(i, t);
            }
          }, 0))),
        this._owner.get_masterTableViewFooter() &&
          (this._hideShowCol(this._owner.get_masterTableViewFooter(), e, t),
          Telerik.Web.UI.Grid.hideShowCells(
            this._owner.get_masterTableViewFooter().get_element(),
            e,
            t,
            this._owner.get_masterTableViewFooter().ColGroup.Cols,
            i,
          ),
          this._setHeaderFooterSpan(),
          this._owner
            .get_masterTableViewFooter()
            .get_element()
            .getElementsByTagName("select").length > 0 &&
            ((l = this._owner.get_masterTableViewFooter().get_element()),
            setTimeout(function () {
              for (r = 0, n = l.rows.length; r < n; r++) {
                var i = l.rows[r].cells[e];
                Telerik.Web.UI.Grid._hideShowSelect(i, t);
              }
            }, 0)));
    },
    hideItem: function (e) {
      if (!this._canShowHideItem(e)) return !1;
      var t = null;
      if (this.get_element() && this.get_element().tBodies.length > 1) {
        var i = $telerik.getFirstChildByTagName(this.get_element(), "tbody", 0);
        i && i.rows[e] && (t = i.rows[e]);
      } else
        this.get_element() &&
          this.get_element().tBodies[0] &&
          this.get_element().tBodies[0].rows[e] &&
          (t = this.get_element().tBodies[0].rows[e]);
      var r = new Telerik.Web.UI.GridDataItemCancelEventArgs(t, null);
      if ((this._owner.raise_rowHiding(r), r.get_cancel())) return !1;
      if (
        (t && (t.style.display = "none"),
        t && "" != t.id && 2 == t.id.split("__").length)
      ) {
        var n = t.id.split("__")[1],
          l = this._hidedItemsData;
        l.add(String.format("{0},{1}", this.get_id(), n)),
          (this._owner._hidedItems = l.toString()),
          this._owner.updateClientState();
      }
      $find(this._owner.get_id())._getPositionedDataItems(!0),
        (r = new Telerik.Web.UI.GridDataItemEventArgs(t, null)),
        this._owner.raise_rowHidden(r);
    },
    showItem: function (e) {
      if (!this._canShowHideItem(e)) return !1;
      var t = null;
      if (this.get_element() && this.get_element().tBodies.length > 1) {
        var i = $telerik.getFirstChildByTagName(this.get_element(), "tbody", 0);
        i && i.rows[e] && (t = i.rows[e]);
      } else
        this.get_element() &&
          this.get_element().tBodies[0] &&
          this.get_element().tBodies[0].rows[e] &&
          (t = this.get_element().tBodies[0].rows[e]);
      var r = new Telerik.Web.UI.GridDataItemCancelEventArgs(t, null);
      if ((this._owner.raise_rowShowing(r), r.get_cancel())) return !1;
      if (
        (t &&
          (window.netscape
            ? (t.style.display = "table-row")
            : (t.style.display = "")),
        t && "" != t.id && 2 == t.id.split("__").length)
      ) {
        var n = t.id.split("__")[1],
          l = this._showedItemsData;
        l.add(String.format("{0},{1}", this.get_id(), n)),
          (this._owner._showedItems = l.toString()),
          this._owner.updateClientState();
      }
      $find(this._owner.get_id())._getPositionedDataItems(!0),
        (r = new Telerik.Web.UI.GridDataItemEventArgs(t, null)),
        this._owner.raise_rowShown(r);
    },
    _canShowHideItem: function (e) {
      if (isNaN(parseInt(e, 10))) return !1;
      if (e < 0) return !1;
      if (this.get_element() && this.get_element().tBodies.length > 1) {
        var t = $telerik.getFirstChildByTagName(this.get_element(), "tbody", 0);
        if (t && t.rows[e] && e > t.rows[e].length - 1) return !1;
      } else if (
        this.get_element() &&
        this.get_element().tBodies[0] &&
        this.get_element().tBodies[0].rows[e] &&
        e > this.get_element().tBodies[0].rows[e].length - 1
      )
        return !1;
      return !0;
    },
    _getRowsFromBody: function (e) {
      for (var t = e.length, i = 0; i < t; i++)
        if ("TBODY" == e[i].parentNode.tagName.toUpperCase())
          return e[i].parentNode.rows;
    },
    _getFirstDataRow: function () {
      if (null != this._firstDataRow) return this._firstDataRow;
      if (this._dataItems.length > 0) return this._dataItems[0].get_element();
      var e = [];
      if ($telerik.isOpera) e = this._getRowsFromBody(this.get_element().rows);
      else {
        var t = this.get_element().tBodies;
        t.length > 0 && (e = t[0].rows);
      }
      for (var i = 0, r = e.length; i < r; i++) {
        var n = e[i];
        if ("" != n.id && 2 == n.id.split("__").length) {
          this._firstRow = n;
          break;
        }
      }
      return this._firstRow;
    },
    _getNextDataRow: function (e) {
      var t,
        i = null;
      t = $telerik.isOpera
        ? this._getRowsFromBody(this.get_element().rows)
        : this.get_element().tBodies[0].rows;
      for (var r = e.sectionRowIndex + 1, n = t.length; r < n; r++)
        if ("" != (e = t[r]).id && 2 == e.id.split("__").length) {
          i = e;
          break;
        }
      return i;
    },
    _getNestedTableWhenRowIsInEditMode: function (e) {
      var t = null,
        i = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(e, "tr");
      if (
        (this._data.hasDetailItemTemplate &&
          (i = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(i, "tr")),
        i)
      ) {
        var r = i.nextSibling.getElementsByTagName("table");
        r.length > 0 && -1 != r[0].id.indexOf("Detail") && (t = r[0]);
      }
      return t;
    },
    _getNextNestedDataRow: function (e) {
      var t = null,
        i = null,
        r = e.id,
        n = $find(r);
      if (
        this._owner.ClientSettings.AllowKeyboardNavigation &&
        n &&
        n.get_isInEditMode()
      )
        i = this._getNestedTableWhenRowIsInEditMode(e);
      else if (this._data.hasDetailItemTemplate) {
        var l = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(e, "tr");
        i = Telerik.Web.UI.Grid.GetNestedTable(l);
      } else i = Telerik.Web.UI.Grid.GetNestedTable(e);
      if (i) {
        var o;
        o = $telerik.isOpera
          ? this._getRowsFromBody(this.get_element().rows)
          : this.get_element().tBodies[0].rows;
        for (var a = 0; a < o.length; a++)
          if ("" != (e = o[a]).id && 2 == e.id.split("__").length) {
            t = e;
            break;
          }
      }
      return t;
    },
    _getPreviousDataRow: function (e) {
      var t,
        i = null;
      t = $telerik.isOpera
        ? this._getRowsFromBody(this.get_element().rows)
        : this.get_element().tBodies[0].rows;
      for (var r = e.sectionRowIndex - 1; r >= 0; r--)
        if ("" != (e = t[r]).id && 2 == e.id.split("__").length) {
          i = e;
          break;
        }
      return i;
    },
    _getPreviousNestedDataRow: function (e) {
      var t = null;
      if (Telerik.Web.UI.Grid.GetNestedTable(e)) {
        var i;
        i = $telerik.isOpera
          ? this._getRowsFromBody(this.get_element().rows)
          : this.get_element().tBodies[0].rows;
        for (var r = e.sectionRowIndex - 1; r >= 0; r--)
          if ("" != (e = i[r]).id && 2 == e.id.split("__").length) {
            t = e;
            break;
          }
      }
      return t;
    },
    get_parentView: function () {
      var e = null;
      return (
        this.get_id() != this._owner.get_masterTableView().get_id() &&
          (e = $find(this.get_parentRow().id.split("__")[0])),
        e
      );
    },
    get_parentRow: function () {
      var e = null;
      return (
        this.get_id() != this._owner.get_masterTableView().get_id() &&
          (e = this.get_element().parentNode.parentNode.previousSibling),
        e
      );
    },
    get_selectedItems: function () {
      for (
        var e = [], t = 0;
        t < this._owner._selectedItemsInternal.length;
        t++
      ) {
        if (
          this._owner._selectedItemsInternal[t].id.split("__")[0] ==
          this.get_id()
        ) {
          var i = $find(this._owner._selectedItemsInternal[t].id);
          null == i
            ? $get(this._owner._selectedItemsInternal[t].id) &&
              ((i = $create(
                Telerik.Web.UI.GridDataItem,
                { _owner: this, _data: this._data, _selected: !0 },
                null,
                null,
                $get(this._owner._selectedItemsInternal[t].id),
              )),
              Array.add(e, i))
            : i &&
              i._owner.get_element().id == this.get_element().id &&
              Array.add(e, i);
        }
      }
      return e;
    },
    selectAllItems: function () {
      if (this._owner.AllowMultiRowSelection) {
        var e = (
          $telerik.isOpera ? this.get_element() : this.get_element().tBodies[0]
        ).rows;
        if (e)
          for (var t = 0, i = e.length; t < i; t++) {
            var r = e[t];
            if (r.id) {
              var n = $find(r.id);
              n ? n.set_selected(!0) : this.selectItem(r);
            }
          }
      }
    },
    clearSelectedItems: function () {
      var e,
        t,
        i,
        r = this,
        n = r._owner,
        l = r.get_element().id,
        o = n._selectedItemsInternal,
        a = n._selectedIndexes;
      if (o.length > 0)
        for (e = o.length - 1; e >= 0; )
          (i = o[e]),
            (t = $find(i.id))
              ? t._owner.get_element().id == l && t.set_selected(!1)
              : (t = $get(i.id)) &&
                  t.parentNode &&
                  t.parentNode.parentNode.id == l
                ? r.deselectItem($get(i.id))
                : (Array.remove(o, i),
                  Array.remove(a, a[e]),
                  r._owner.updateClientState()),
            (e = Math.min(o.length, e)),
            e--;
    },
    clearSelectedCells: function () {
      null != this._owner._cellSelection &&
        this._owner._cellSelection._deselectTableViewCells(this);
    },
    selectItem: function (e) {
      (e = this._getRowByIndexOrItemIndexHierarchical(e)),
        this._owner._selection &&
          e &&
          e.id &&
          (this._owner.AllowMultiRowSelection || this.clearSelectedItems(),
          (this._owner._keyboardNavigationProperties.lastClickSelectedItem = e),
          this._owner._selection._selectRowInternal(
            e,
            { ctrlKey: !1 },
            !0,
            !1,
            !0,
          ));
    },
    deselectItem: function (e) {
      var t = this;
      (e = t._getRowByIndexOrItemIndexHierarchical(e)),
        t._owner._selection &&
          e &&
          e.id &&
          Array.contains(t._owner._selectedIndexes, e.id.split("__")[1]) &&
          t._owner._selection._selectRowInternal(
            e,
            { ctrlKey: !1 },
            !0,
            !0,
            !0,
          );
    },
    _getRowByIndexOrItemIndexHierarchical: function (e) {
      var t = null;
      if ("number" == typeof e) {
        if (
          this.get_element().tBodies.length > 0 &&
          (this.get_element().tBodies[0].rows[e] &&
            (t = this.get_element().tBodies[0].rows[e]),
          t && ("" == t.id || !t.id.endsWith(e.toString())))
        )
          for (; t && !t.id.endsWith(e.toString()); )
            t = this._getNextDataRow(t);
        e = t;
      }
      if ("string" == typeof e) {
        var i = e;
        if (!(e = $get(this.get_element().id + "__" + e))) {
          var r = i.split(":"),
            n = r.length;
          if (n > 1) {
            var l = this;
            (t = l.get_dataItems()[r[0]]) ||
              (t =
                1 == l.get_dataItems().length
                  ? l.get_dataItems()[0]
                  : l.get_dataItems()[r[0].split("__")[1]]);
            for (var o = 1; o < n; o++) {
              var a = r[o].split("_")[1];
              (l = t.get_nestedViews()[0]) || (l = this),
                (t =
                  1 == l.get_dataItems().length
                    ? l.get_dataItems()[0]
                    : l.get_dataItems()[a]);
            }
            e = t.get_element();
          } else {
            var s = parseInt(r[0].split("__")[1], 10),
              d = this.get_dataItems();
            e = !isNaN(s) && s < d.length ? d[s].get_element() : null;
          }
        }
      }
      return e;
    },
    _reorderColumns: function (e, t) {
      var i = this.getColumnByUniqueName(e),
        r = this.getColumnByUniqueName(t);
      if (i && r && e !== t) {
        var n = i.get_element().parentNode,
          l = this._getCellIndexByColumnUniqueNameFromTableRowElement(n, e),
          o = this._getCellIndexByColumnUniqueNameFromTableRowElement(n, t);
        if (
          this._hasMultiHeaders &&
          n.className.indexOf("rgMultiHeaderRow") > -1
        ) {
          var a = this._getMultiHeaderByColumnUniqueName(e);
          a && (l = a.index);
          var s = this._getMultiHeaderByColumnUniqueName(t);
          s && (o = s.index);
        }
        var d = this._owner.ClientSettings.ReorderColumnsOnClient;
        this._owner.ClientSettings.ReorderColumnsOnClient = !0;
        var h,
          u,
          _,
          g = this._owner.ClientSettings.ColumnsReorderMethod;
        if (((this._owner.ClientSettings.ColumnsReorderMethod = 0), o > l)) {
          if (
            ((h = new Telerik.Web.UI.GridColumnCancelEventArgs(i, null)),
            this._owner.raise_columnMovingToLeft(h),
            h.get_cancel())
          )
            return !1;
          for (; l < o; )
            (u = this.getColumnUniqueNameByCellIndex(n, l + 1)),
              (_ = this.getColumnUniqueNameByCellIndex(n, l)),
              this.swapColumns(u, _),
              l++;
          (h = new Telerik.Web.UI.GridColumnEventArgs(i, null)),
            this._owner.raise_columnMovedToLeft(h);
        } else {
          if (
            ((h = new Telerik.Web.UI.GridColumnCancelEventArgs(i, null)),
            this._owner.raise_columnMovingToRight(h),
            h.get_cancel())
          )
            return !1;
          for (; o < l; )
            (u = this.getColumnUniqueNameByCellIndex(n, l - 1)),
              (_ = this.getColumnUniqueNameByCellIndex(n, l)),
              this.swapColumns(u, _),
              l--;
          (h = new Telerik.Web.UI.GridColumnEventArgs(i, null)),
            this._owner.raise_columnMovedToRight(h);
        }
        (this._owner.ClientSettings.ColumnsReorderMethod = g),
          (this._owner.ClientSettings.ReorderColumnsOnClient = d);
      }
    },
    reorderColumns: function (columnName1, columnName2) {
      if (
        this._owner.ClientSettings.AllowColumnsReorder &&
        1 == this._owner.ClientSettings.ColumnsReorderMethod &&
        (this._reorderColumns(columnName1, columnName2),
        !this._owner.ClientSettings.ReorderColumnsOnClient)
      ) {
        var postBackFunction = this._owner.ClientSettings.PostBackFunction;
        return (
          (postBackFunction = postBackFunction.replace(
            "{0}",
            this._owner.UniqueID,
          )),
          void eval(postBackFunction)
        );
      }
    },
    swapColumns: function (columnName1, columnName2) {
      var column1 = this.getColumnByUniqueName(columnName1),
        column2 = this.getColumnByUniqueName(columnName2);
      if (
        column1 &&
        column2 &&
        columnName1 !== columnName2 &&
        this._owner.ClientSettings.AllowColumnsReorder &&
        column1.get_reorderable() &&
        column2.get_reorderable()
      ) {
        if (!this._owner.ClientSettings.ReorderColumnsOnClient) {
          var postBackFunction = this._owner.ClientSettings.PostBackFunction;
          return (
            (postBackFunction = postBackFunction.replace(
              "{0}",
              this._owner.UniqueID,
            )),
            (postBackFunction = postBackFunction.replace(
              "{1}",
              "ReorderColumns," +
                this._data.UniqueID +
                "," +
                column1.get_uniqueName() +
                "," +
                column2.get_uniqueName(),
            )),
            void eval(postBackFunction)
          );
        }
        if (0 == this._owner.ClientSettings.ColumnsReorderMethod) {
          var index1 = this._getCellIndexByColumnUniqueNameFromTableRowElement(
              column1.get_element().parentNode,
              columnName1,
            ),
            index2 = this._getCellIndexByColumnUniqueNameFromTableRowElement(
              column2.get_element().parentNode,
              columnName2,
            ),
            args = new Sys.CancelEventArgs();
          if (
            ((args.get_gridSourceColumn = function () {
              return column1;
            }),
            (args.get_gridTargetColumn = function () {
              return column2;
            }),
            this._owner.raise_columnSwapping(args),
            args.get_cancel())
          )
            return !1;
          var mtv = this._owner.get_masterTableView();
          if (
            (this.get_id() &&
              -1 != this.get_id().indexOf("Detail") &&
              (!mtv || (mtv && mtv.get_id() != this.get_id())) &&
              (this._reorderColumnsInternal(columnName1, columnName2),
              (mtv = null)),
            this._owner.get_masterTableViewHeader() &&
              this._owner
                .get_masterTableViewHeader()
                ._reorderColumnsInternal(columnName1, columnName2),
            mtv && mtv._reorderColumnsInternal(columnName1, columnName2),
            this._owner.get_masterTableViewFooter())
          ) {
            var isStaticHeaders =
              this._owner.ClientSettings.Scrolling &&
              this._owner.ClientSettings.Scrolling.AllowScroll &&
              this._owner.ClientSettings.Scrolling.UseStaticHeaders;
            this.get_id() &&
            -1 == this.get_id().indexOf("Detail") &&
            isStaticHeaders
              ? this._owner
                  .get_masterTableViewFooter()
                  ._reorderFooterInStaticHeaders(columnName1, columnName2)
              : this._owner
                  .get_masterTableViewFooter()
                  ._reorderColumnsInternal(columnName1, columnName2);
          }
          var cellUniqueName2 = column2.get_element().UniqueName,
            cellUniqueName1 = column1.get_element().UniqueName;
          (column1.get_element().UniqueName = cellUniqueName2),
            (column2.get_element().UniqueName = cellUniqueName1);
          var dataTmp = column2._data,
            tempPopulateCell = column2.populateCell,
            tempDisplay = column2.Display;
          if (
            ((column2._data = column1._data),
            (column2.populateCell = column1.populateCell),
            (column2.Display = column1.Display),
            (column1._data = dataTmp),
            (column1.populateCell = tempPopulateCell),
            (column1.Display = tempDisplay),
            (this.get_columns()[index2] = column2),
            (this.get_columns()[index1] = column1),
            this._owner.ClientSettings.AllowKeyboardNavigation &&
              null != this._owner._cellSelection)
          )
            for (
              var rows = this.get_element().rows, i = 0;
              i < rows.length;
              i++
            )
              if ("" != rows[i].id && null != rows[i].id) {
                this._owner._cellSelection._setActiveCellElement(
                  rows[i].cells[index2],
                );
                break;
              }
          this._copyColAttributes(
            this._owner.get_masterTableView().ColGroup.Cols[index1],
            this._owner.get_masterTableView().ColGroup.Cols[index2],
          ),
            this._owner.get_masterTableViewHeader() &&
              this._owner.get_masterTableViewHeader().ColGroup &&
              this._copyColAttributes(
                this._owner.get_masterTableViewHeader().ColGroup.Cols[index1],
                this._owner.get_masterTableViewHeader().ColGroup.Cols[index2],
              ),
            this._owner.get_masterTableViewFooter() &&
              this._owner.get_masterTableViewFooter().ColGroup &&
              this._copyColAttributes(
                this._owner.get_masterTableViewFooter().ColGroup.Cols[index1],
                this._owner.get_masterTableViewFooter().ColGroup.Cols[index2],
              ),
            (args = new Sys.EventArgs()),
            (args.get_gridSourceColumn = function () {
              return column1;
            }),
            (args.get_gridTargetColumn = function () {
              return column2;
            }),
            this._createColumnsByUniqueNameHash(),
            this._owner.raise_columnSwapped(args);
          var _reorderedColumnsData =
            this._data.UniqueID + "," + columnName1 + "," + columnName2;
          Array.add(this._owner._reorderedColumns, _reorderedColumnsData),
            this._owner.updateClientState();
        }
      }
    },
    _copyColAttributes: function (e, t) {
      if (e && t) {
        var i = document.createElement("col"),
          r = !1,
          n = !1;
        "" == e.style.width && "" != t.style.width && (n = !0),
          "" == t.style.width && "" != e.style.width && (r = !0);
        var l = e.style.display,
          o = t.style.display;
        $telerik.mergeElementAttributes(e, i, !1),
          $telerik.mergeElementAttributes(t, e, !1),
          $telerik.mergeElementAttributes(i, t, !1),
          (e.style.display = o),
          (t.style.display = l),
          r && (e.style.width = ""),
          n && (t.style.width = "");
        var a = e.parentNode;
        if (!a) return;
        if (!a.parentNode) return;
      }
    },
    _reorderFooterInStaticHeaders: function (e, t) {
      for (var i = 0; i < this.get_element().rows.length; i++) {
        var r = this.get_element().rows[i],
          n = this._getCellByFooterColumnUniqueNameFromTableRowElement(r, e),
          l = this._getCellByFooterColumnUniqueNameFromTableRowElement(r, t);
        n && l && this._reorderControls(n, l);
      }
    },
    _getCellByFooterColumnUniqueNameFromTableRowElement: function (e, t) {
      for (
        var i = 0, r = this._owner.get_masterTableView().get_columns().length;
        i < r;
        i++
      )
        if (
          this._owner
            .get_masterTableView()
            .get_columns()
            [i].get_element()
            .UniqueName.toUpperCase() == t.toUpperCase()
        )
          return e.cells[i];
      return null;
    },
    _reorderColumnsInternal: function (e, t) {
      for (var i = !1, r = 0; r < this.get_element().rows.length; r++) {
        var n = this.get_element().rows[r];
        if (
          n.id ||
          "tbody" != n.parentNode.tagName.toLowerCase() ||
          -1 !== n.className.indexOf("rgFooter")
        ) {
          var l = this._getCellByColumnUniqueNameFromTableRowElement(n, e),
            o = this._getCellByColumnUniqueNameFromTableRowElement(n, t);
          if (
            this._hasMultiHeaders &&
            n.className.indexOf("rgMultiHeaderRow") > -1
          ) {
            if (i) continue;
            i = !0;
            var a = this._getMultiHeaderByColumnUniqueName(e);
            a && (l = a.cell);
            var s = this._getMultiHeaderByColumnUniqueName(t);
            s && (o = s.cell);
          }
          l && o && this._reorderControls(l, o);
        }
      }
    },
    _reorderControls: function (e, t) {
      var i = document.createElement("div"),
        r = document.createElement("div");
      document.body.appendChild(i),
        document.body.appendChild(r),
        this._moveNodes(e, r),
        this._moveNodes(t, i);
      var n = e.style.cssText,
        l = t.style.cssText,
        o = e.className,
        a = t.className,
        s = e.align,
        d = t.align;
      (e.innerHTML = t.innerHTML = ""),
        this._moveNodes(r, t),
        this._moveNodes(i, e),
        this._recreateControls(e),
        this._recreateControls(t),
        (e.style.cssText = l),
        (t.style.cssText = n),
        (e.className = a),
        (t.className = o),
        (e.align = d),
        (t.align = s),
        i.parentNode.removeChild(i),
        r.parentNode.removeChild(r);
    },
    _moveNodes: function (e, t) {
      for (var i = e.childNodes; i.length > 0; ) t.appendChild(i[0]);
    },
    _recreateControls: function (e) {
      for (
        var t = e.getElementsByTagName("*"), i = 0, r = t.length;
        i < r;
        i++
      ) {
        var n = t[i];
        if (void 0 !== n.id && "" != n.id) {
          var l = $find(n.id);
          if (!l) continue;
          l._element = $get(n.id);
        }
      }
    },
    getColumnByUniqueName: function (e) {
      for (var t = 0; t < this.get_columns().length; t++)
        if (this.get_columns()[t].get_element().UniqueName == e)
          return this.get_columns()[t];
      return null;
    },
    getCellByColumnUniqueName: function (e, t) {
      return this._getCellByColumnUniqueNameFromTableRowElement(
        e.get_element(),
        t,
      );
    },
    _getCellByColumnUniqueNameFromTableRowElement: function (e, t) {
      var i = this,
        r = (i._cellsByUniqueName =
          i._cellsByUniqueName || i._createColumnsByUniqueNameHash());
      return e.cells[r[t]] || null;
    },
    _createColumnsByUniqueNameHash: function () {
      for (
        var e = this,
          t = {},
          i = e._columnsInternal,
          r = e._owner,
          n = e.get_id(),
          l = r.get_masterTableView(),
          o = r.get_masterTableViewFooter(),
          a = r.get_masterTableViewHeader(),
          s = 0;
        s < i.length;
        s++
      )
        t[i[s].get_uniqueName()] = s;
      return (
        n == l.get_id() || (o && n == o.get_id()) || (a && n == a.get_id())
          ? ((r.get_masterTableView()._cellsByUniqueName = t),
            a && (a._cellsByUniqueName = t),
            o && (o._cellsByUniqueName = t))
          : (e._cellsByUniqueName = t),
        t
      );
    },
    _getCellIndexByColumnUniqueNameFromTableRowElement: function (e, t) {
      if (!t || "" == t) return null;
      for (var i = 0; i < this.get_columns().length; i++)
        if (
          this.get_columns()[i].get_element().UniqueName.toUpperCase() ==
          t.toUpperCase()
        )
          return i;
      return null;
    },
    getColumnUniqueNameByCellIndex: function (e, t) {
      for (
        var i = this._toArray(e.cells).sort(function (e, t) {
            return e.cellIndex - t.cellIndex;
          }),
          r = 0;
        r < i.length;
        r++
      )
        if (i[r].UniqueName && r == t) return i[r].UniqueName;
      return null;
    },
    _toArray: function (e) {
      for (var t = Array(e.length), i = 0; i < t.length; i++) t[i] = e[i];
      return t;
    },
    _getMultiHeaderByColumnUniqueName: function (e) {
      if (this._hasMultiHeaders) {
        var t = this.getColumnByUniqueName(e);
        if (t)
          for (
            var i = t.get_element().parentNode.cells, r = 0;
            r < i.length;
            r++
          ) {
            var n = i[r];
            if (n.UniqueName == e) return { index: r, cell: n };
          }
      }
      return null;
    },
    _sliderClientValueChanged: function (e, t, i) {
      var r = $get(e),
        n = $find(t),
        l = 0;
      r &&
        n &&
        ((l = n.get_value()),
        i || this._applyPagerLabelText(r, l, this.get_pageCount())),
        i && (window.location.href = i.replace("-2147483648", l + 1));
    },
    _applyPagerLabelText: function (e, t, i) {
      var r =
          this._owner.ClientSettings.ClientMessages.PagerTooltipFormatString,
        n = 0 == t ? 1 : t + 1,
        l = i;
      (r = r.replace(/\{0[^\}]*\}/g, n).replace(/\{1[^\}]*\}/g, l)),
        (e.innerHTML = r);
    },
    resizeItem: function (e, t, i) {
      if (this._owner.ClientSettings.Resizing.AllowRowResize) {
        var r = this.get_element().rows[e];
        if (r && "" != r.id && 2 == r.id.split("__").length) {
          var n = new Telerik.Web.UI.GridDataItemCancelEventArgs(r, null);
          if ((this._owner.raise_rowResizing(n), n.get_cancel())) return !1;
        }
        var l = this.get_element().style.tableLayout;
        this.get_element().style.tableLayout = "";
        var o,
          a = this.get_element().parentNode.parentNode.parentNode.parentNode,
          s = $find(a.id);
        if (
          (null != s &&
            ((o = s.get_element().style.tableLayout),
            (s.get_element().style.tableLayout = "")),
          i
            ? this.get_element() &&
              this.get_element().tBodies[0] &&
              this.get_element().tBodies[0].rows[e] &&
              this.get_element().tBodies[0].rows[e].cells[0] &&
              ((this.get_element().tBodies[0].rows[e].cells[0].style.height =
                t + "px"),
              (this.get_element().tBodies[0].rows[e].style.height = t + "px"))
            : this.get_element() &&
              this.get_element().rows[e] &&
              this.get_element().rows[e].cells[0] &&
              ((this.get_element().rows[e].cells[0].style.height = t + "px"),
              (this.get_element().rows[e].style.height = t + "px")),
          (this.get_element().style.tableLayout = l),
          null != s && (s.get_element().style.tableLayout = o),
          r && "" != r.id && 2 == r.id.split("__").length)
        ) {
          var d = r.id.split("__")[1],
            h = this._resizedItemsData;
          h.add(String.format("{0},{1}", this.get_id(), d), t),
            (this._owner._resizedItems = h.toString()),
            this._owner.raise_rowResized(
              new Telerik.Web.UI.GridDataItemEventArgs(r, null),
            );
        }
        this._owner._isBatchEditingEnabled &&
          this._owner._rowHighlightingForDeletedRows &&
          this._owner.get_batchEditingManager()._adjustBatchDeletedRows(),
          this._owner.updateClientState();
      }
    },
    resizeColumn: function (e, t, i) {
      var r = this._hasMultiHeaders;
      if (this._validateResizeColumnParams(e, t)) {
        "string" == typeof e && (e = parseInt(e, 10));
        var n = new Telerik.Web.UI.GridColumnCancelEventArgs(
          this.get_columns()[e],
          null,
        );
        if ((this._owner.raise_columnResizing(n), n.get_cancel())) return !1;
        var l,
          o = this.get_element().offsetWidth,
          a =
            this._owner.get_element().offsetWidth -
            parseInt(
              $telerik.getCurrentStyle(
                this._owner.get_element(),
                "borderLeftWidth",
                0,
              ),
              10,
            ) -
            parseInt(
              $telerik.getCurrentStyle(
                this._owner.get_element(),
                "borderRightWidth",
                0,
              ),
              10,
            );
        if (
          (this == this._owner.get_masterTableView() &&
            this._owner.get_masterTableViewHeader() &&
            this._owner.get_masterTableViewHeader().resizeColumn(e, t),
          this.HeaderRow && "none" === this.HeaderRow.style.display)
        ) {
          var s = this._owner.get_masterTableView().get_element().tBodies;
          if (s && s.length > 0) {
            var d = s[0].rows;
            d && d.length > 0 && (this.HeaderRow = d[0]);
          }
        }
        if (this.HeaderRow || this.MultiHeaderCells) {
          var h = e;
          l =
            (r ? this.MultiHeaderCells : this.HeaderRow.cells)[h].offsetWidth -
            t;
        }
        var u,
          _ =
            this._owner.ClientSettings.Resizing.EnableNextColumnResize &&
            e < this.get_columns().length - 1 &&
            !i;
        if (_)
          if (
            (u = this.get_columns()[e + 1].get_element().offsetWidth + l) <= 1
          )
            return !1;
        this.ColGroup &&
          this.ColGroup.Cols[e] &&
          t > 0 &&
          (this.ColGroup.Cols[e].style.width = t + "px"),
          this._owner.get_masterTableViewHeader() &&
            this.get_id() == this._owner.get_masterTableViewHeader().get_id() &&
            (this._owner.get_masterTableView().ColGroup &&
              this._owner.get_masterTableView().ColGroup.Cols[e] &&
              t > 0 &&
              (this._owner.get_masterTableView().ColGroup.Cols[e].style.width =
                t + "px"),
            this._owner.get_masterTableViewFooter() &&
              this._owner.get_masterTableViewFooter().ColGroup &&
              this._owner.get_masterTableViewFooter().ColGroup.Cols[e] &&
              t > 0 &&
              (this._owner.get_masterTableViewFooter().ColGroup.Cols[
                e
              ].style.width = t + "px")),
          -1 != t.toString().indexOf("px") && (t = t.replace("px", "")),
          -1 == t.toString().indexOf("%") && (t += "px"),
          this._resizedColumnsData.add(
            String.format(
              "{0},{1}",
              this._data.UniqueID,
              this.get_columns()[e].get_uniqueName(),
            ),
            t,
          );
        var g = null != $get(this._owner.ClientID + "_Frozen");
        if (
          (g ||
            (this._owner.get_masterTableViewHeader() &&
              (this._owner.ClientSettings.Resizing.ResizeGridOnColumnResize =
                !0),
            this._owner.ClientSettings.Resizing.ResizeGridOnColumnResize
              ? null != l && this._resizeGridOnColumnResize(e, l, o)
              : this._noResizeGridOnColumnResize(o, e, a)),
          (this._owner._resizedColumns = this._resizedColumnsData.toString()),
          this._owner.GroupPanelObject &&
            this._owner.GroupPanelObject.Items.length > 0 &&
            -1 != navigator.userAgent.toLowerCase().indexOf("msie") &&
            this._owner.get_masterTableView() &&
            this._owner.get_masterTableViewHeader() &&
            (this._owner.get_masterTableView().get_element().style.width =
              this._owner.get_masterTableViewHeader().get_element()
                .offsetWidth + "px"),
          (n = new Telerik.Web.UI.GridColumnEventArgs(
            this.get_columns()[e],
            null,
          )),
          this._owner.raise_columnResized(n),
          "Batch" == this._data.EditMode &&
            this._data._batchEditingSettings.highlightDeletedRows &&
            this._owner.get_batchEditingManager()._adjustBatchDeletedRows(),
          window.netscape &&
            (this.get_element().style.cssText =
              this.get_element().style.cssText),
          g && null != l)
        ) {
          var c = $get(this._owner.ClientID + "_FrozenScroll");
          c.style.width = c.offsetWidth - l + "px";
          var m = $get(this._owner.ClientID + "_Frozen");
          this._scrollbarHeight ||
            (this._scrollbarHeight = Telerik.Web.UI.Grid.getScrollBarHeight());
          var p = this._scrollbarHeight;
          m.offsetWidth >= this._owner.GridDataDiv.clientWidth
            ? ($telerik.isIE && p++,
              (m.style.height = p + "px"),
              this._owner.ClientSettings.Scrolling.SaveScrollPosition &&
                void 0 !== this._owner.ClientSettings.Scrolling.ScrollLeft &&
                (m.scrollLeft =
                  this._owner.ClientSettings.Scrolling.ScrollLeft),
              null != this._owner.GridDataDiv.style.overflowX
                ? (this._owner.GridDataDiv.style.overflowX = "hidden")
                : ((m.style.marginTop = "-" + p + "px"),
                  (m.style.zIndex = 99999),
                  (m.style.position = "relative")),
              (this._isRightToLeft =
                this._isRightToLeft ||
                Telerik.Web.UI.Grid.IsRightToLeft(this._owner.GridHeaderDiv)),
              (this._isScrollOnLeftSide =
                this._isScrollOnLeftSide ||
                Telerik.Web.UI.Grid.IsScrollOnLeftSide()),
              this._isRightToLeft && this._isScrollOnLeftSide
                ? (m.style.marginLeft = p + "px")
                : !this._isRightToLeft &&
                  $telerik.isSafari &&
                  (m.style.marginRight = p + "px"),
              this._owner.GridHeaderDiv &&
                this._owner.GridDataDiv &&
                this._owner.GridDataDiv.clientWidth ==
                  this._owner.GridDataDiv.offsetWidth &&
                void 0 !== m.style.overflowX &&
                void 0 !== m.style.overflowY &&
                ((m.style.overflowX = "auto"), (m.style.overflowY = "hidden")),
              ($telerik.isIE8 || $telerik.isChrome) &&
                m &&
                (m.style.overflowX = "scroll"))
            : (m.style.height = 0);
        }
        _ && u > 1 && this.resizeColumn(e + 1, u, !0);
      }
    },
    _resizeGridOnColumnResize: function (e, t, i) {
      var r;
      if (
        this._owner.get_masterTableViewHeader() &&
        this.get_id() == this._owner.get_masterTableViewHeader().get_id()
      ) {
        (this.get_element().style.width = i - t + "px"),
          (this._owner.get_masterTableView().get_element().style.width =
            this.get_element().style.width);
        for (var n = 0; n < this.ColGroup.Cols.length; n++)
          if (n != e && "" == this.ColGroup.Cols[n].style.width) {
            var l = n,
              o = this._hasMultiHeaders
                ? this.MultiHeaderCells
                : this.HeaderRow.cells;
            if ("none" != o[l].style.display) {
              var a = o[l].offsetWidth;
              (this.ColGroup.Cols[n].style.width = a + "px"),
                (this._owner.get_masterTableView().ColGroup.Cols[
                  n
                ].style.width = this.ColGroup.Cols[n].style.width),
                this._owner.get_masterTableViewFooter() &&
                  this._owner.get_masterTableViewFooter().ColGroup &&
                  (this._owner.get_masterTableViewFooter().ColGroup.Cols[
                    n
                  ].style.width = this.ColGroup.Cols[n].style.width);
            }
          }
        this._owner.get_masterTableViewFooter() &&
          this._owner.get_masterTableViewFooter().get_element() &&
          (this._owner.get_masterTableViewFooter().get_element().style.width =
            this.get_element().style.width),
          (r = this.get_element().offsetWidth + "px");
      } else {
        var s = i || this.get_element().offsetWidth;
        (this.get_element().style.width = r = s > t ? s - t + "px" : s + "px"),
          (this._owner.get_element().style.width = r);
      }
      this._resizedControlData.add(this._data.UniqueID, r),
        (this._owner._resizedControl = this._resizedControlData.toString());
    },
    _noResizeGridOnColumnResize: function (e, t, i) {
      for (
        var r = this._hasMultiHeaders
            ? this.MultiHeaderCells
            : this.HeaderRow.cells,
          n = t + 1;
        n < this.ColGroup.Cols.length;
        n++
      )
        (r[n].style.width = ""),
          (this.ColGroup.Cols[n].style.width = ""),
          this._owner.get_masterTableViewHeader() &&
            this.get_id() == this._owner.get_masterTableViewHeader().get_id() &&
            ((this._owner.get_masterTableView().ColGroup.Cols[n].style.width =
              ""),
            (this._owner.get_masterTableViewHeader().get_element().cells[
              n
            ].style.width = "")),
          this._owner.get_masterTableViewFooter() &&
            ((this._owner.get_masterTableViewFooter().ColGroup.Cols[
              n
            ].style.width = ""),
            (this._owner.get_masterTableViewFooter().get_element().cells[
              n
            ].style.width = "")),
          this._resizedColumnsData.add(
            String.format(
              "{0},{1}",
              this._data.UniqueID,
              this.get_columns()[n].get_uniqueName(),
            ),
            "",
          );
      i > 0 && (this._owner.get_element().style.width = i + "px"),
        (this.get_element().style.width = e + "px"),
        this._owner.get_masterTableViewHeader() &&
          this.get_id() == this._owner.get_masterTableViewHeader().get_id() &&
          (this._owner.get_masterTableView().get_element().style.width =
            this.get_element().style.width),
        this._owner.get_masterTableViewFooter() &&
          (this._owner.get_masterTableViewFooter().get_element().style.width =
            this.get_element().style.width);
    },
    _validateResizeColumnParams: function (e, t) {
      return (
        !isNaN(parseInt(e, 10)) &&
        !isNaN(parseInt(t, 10)) &&
        !(e < 0) &&
        !(t < 0) &&
        !(e > this.get_columns().length - 1) &&
        !!this._owner.ClientSettings.Resizing.AllowColumnResize &&
        !!this.get_columns() &&
        !!this.get_columns()[e].get_resizable()
      );
    },
    resizeColumnToFit: function (e) {
      "string" == typeof e && (e = this.getColumnByUniqueName(e)),
        "number" == typeof e && (e = this.get_columns()[e]),
        "object" == typeof e && e.resizeToFit && e.resizeToFit();
    },
    get_allowPaging: function () {
      return !!this._data.AllowPaging;
    },
    get_pageCount: function () {
      return this.PageCount;
    },
    get_pageSize: function () {
      return this.PageSize;
    },
    set_pageSize: function (e) {
      var t = this.PageSize;
      this.PageSize != e &&
        ((this.PageSize = e),
        this.set_currentPageIndex(0, !0),
        !this.fireCommand("PageSize", e) && this._preventUpdatePager
          ? ((this.PageSize = t),
            this._refreshPagerSlider(),
            this._refreshAdvancedPageTextBoxes(),
            this._refreshDropDownPager(),
            this._generateNumericPager(),
            (this._preventUpdatePager = !1))
          : this._updatePager());
    },
    get_virtualItemCount: function () {
      return this._virtualItemCount;
    },
    set_virtualItemCount: function (e) {
      (this._virtualItemCount == e && 0 !== e) ||
        ((this._virtualItemCount = e),
        0 != e || (this._dataSource && 0 != this._dataSource.length)
          ? this.set_currentPageIndex(0, !1)
          : this.set_currentPageIndex(0, !0),
        this._updatePager(),
        this._initializeVirtualScrollPaging(),
        this._virtualization && this._virtualization.set_virtualItemCount(e));
    },
    set_pageButtonCount: function (e) {
      (this._pageButtonCount = e), this._updatePager();
    },
    get_pageButtonCount: function () {
      return this._pageButtonCount;
    },
    _initializeVirtualScrollPaging: function () {
      var e = $find(this._owner.get_id());
      e._scrolling && e._scrolling._initializeVirtualScrollPaging(!0);
    },
    _updatePager: function () {
      var e = Math.ceil(this.get_virtualItemCount() / this.get_pageSize());
      this.PageCount = e;
      var t = String.format("{0}PCN", this.get_id()),
        i = String.format("{0}FIP", this.get_id()),
        r = String.format("{0}DSC", this.get_id()),
        n = String.format("{0}LIP", this.get_id()),
        l = this._data.pageOfLabelClientID;
      this._populatePagerStatsElements(t, i, n, r, l),
        (t = String.format("{0}PCNTop", this.get_id())),
        (i = String.format("{0}FIPTop", this.get_id())),
        (r = String.format("{0}DSCTop", this.get_id())),
        (n = String.format("{0}LIPTop", this.get_id())),
        (l = this._data.pageOfLabelTopClientID),
        this._populatePagerStatsElements(t, i, n, r, l),
        this._refreshPagerSlider(),
        this._refreshAdvancedPageTextBoxes(),
        this._refreshDropDownPager(),
        this._generateNumericPager(),
        this._setPagerVisibility(e > 1 || this._data.PagerAlwaysVisible);
    },
    _refreshPagerSlider: function () {
      this._data.sliderClientID &&
        "" != this._data.sliderClientID &&
        this._setSliderValue(
          $find(this._data.sliderClientID),
          this.get_pageCount(),
          this._data.sliderLabelClientID,
        ),
        this._data.sliderTopClientID &&
          "" != this._data.sliderTopClientID &&
          this._setSliderValue(
            $find(this._data.sliderTopClientID),
            this.get_pageCount(),
            this._data.sliderTopLabelClientID,
          );
    },
    _refreshAdvancedPageTextBoxes: function () {
      this._data.goToPageTextBoxClientID &&
        "" != this._data.goToPageTextBoxClientID &&
        this._setTextBoxValue(
          $find(this._data.goToPageTextBoxClientID),
          this.PageCount || 1,
        ),
        this._data.goToPageTextBoxTopClientID &&
          "" != this._data.goToPageTextBoxTopClientID &&
          this._setTextBoxValue(
            $find(this._data.goToPageTextBoxTopClientID),
            this.PageCount || 1,
          ),
        this._data.changePageSizeTextBoxClientID &&
          "" != this._data.changePageSizeTextBoxClientID &&
          this._setTextBoxValue(
            $find(this._data.changePageSizeTextBoxClientID),
            this.get_virtualItemCount() || 1,
            this.PageSize,
          ),
        this._data.changePageSizeTextBoxTopClientID &&
          "" != this._data.changePageSizeTextBoxTopClientID &&
          this._setTextBoxValue(
            $find(this._data.changePageSizeTextBoxTopClientID),
            this.get_virtualItemCount() || 1,
            this.PageSize,
          );
    },
    _refreshDropDownPager: function () {
      this._data.changePageSizeComboBoxTopClientID &&
        "" != this._data.changePageSizeComboBoxTopClientID &&
        this._setChangePageComboSelectedValue(
          $find(this._data.changePageSizeComboBoxTopClientID),
          this.PageSize,
        ),
        this._data.changePageSizeComboBoxClientID &&
          "" != this._data.changePageSizeComboBoxClientID &&
          this._setChangePageComboSelectedValue(
            $find(this._data.changePageSizeComboBoxClientID),
            this.PageSize,
          );
    },
    _setChangePageComboSelectedValue: function (e, t) {
      if (null != e) {
        var i = e.findItemByValue(t);
        if (i) e.trackChanges(), i.select(), e.commitChanges();
        else {
          for (
            var r,
              n,
              l = e.get_items(),
              o = l.get_count(),
              a = 0,
              s = l.get_count();
            a < s;
            a++
          )
            if (l.getItem(a).get_value() > t) {
              (r = l
                .getItem(a)
                .get_attributes()
                .getAttribute("ownerTableViewId")),
                (o = a);
              break;
            }
          e.trackChanges(),
            (n =
              e.get_id().indexOf("PageSizeCombo") > -1
                ? new Telerik.Web.UI.RadComboBoxItem()
                : new Telerik.Web.UI.DropDownListItem()).set_text(t.toString()),
            n.set_value(t),
            l.insert(o, n),
            n.get_attributes().setAttribute("ownerTableViewId", r),
            n.select(),
            e.commitChanges();
        }
      }
    },
    _setSliderValue: function (e, t, i) {
      null != e &&
        ((t = Math.max(t - 1, 0)),
        e.set_maximumValue(t),
        this._applyPagerLabelText($get(i), 0, t + 1));
    },
    _setTextBoxValue: function (e, t, i) {
      null != e &&
        (void 0 !== t && e.set_maxValue(t),
        void 0 !== i && e.set_value(Math.min(i, t)));
    },
    _populatePagerStatsElements: function (e, t, i, r, n) {
      if (
        ($get(e) && ($get(e).innerHTML = this.PageCount),
        n &&
          "" != n &&
          $get(n) &&
          ($get(n).innerHTML = String.format(" of {0}", this.PageCount || 1)),
        $get(t) &&
          (0 == this.get_virtualItemCount()
            ? ($get(t).innerHTML = 0)
            : ($get(t).innerHTML =
                (this.get_currentPageIndex() + 1) * this.get_pageSize() -
                this.get_pageSize() +
                1)),
        $get(r) && ($get(r).innerHTML = this.get_virtualItemCount()),
        $get(i))
      ) {
        var l = this.get_virtualItemCount(),
          o = (this.get_currentPageIndex() + 1) * this.get_pageSize();
        o > l && (o = l), ($get(i).innerHTML = o);
      }
      if ($get(i) && $get(r)) {
        var a = parseInt($get(i).innerHTML, 10),
          s = parseInt($get(r).innerHTML, 10);
        a > s && ($get(i).innerHTML = s);
      }
    },
    _generateNumericPager: function () {
      this._populateNumericPagerDiv(
        $get(String.format("{0}NPPHTop", this.get_id())),
      ),
        this._populateNumericPagerDiv(
          $get(String.format("{0}NPPH", this.get_id())),
        );
    },
    _populateNumericPagerDiv: function (e) {
      if (e) {
        e.innerHTML = "";
        var t = new Sys.StringBuilder(),
          i = 1,
          r = this._pageButtonCount;
        this.get_currentPageIndex() + 1 > r &&
          (i = Math.floor(this.get_currentPageIndex() / r) * r + 1);
        var n = Math.min(this.PageCount, i + r - 1);
        i > r &&
          (t.append('<a href="#"'),
          t.append(
            String.format(
              " onclick=\"Telerik.Web.UI.Grid.NavigateToPage('{0}',{1}); return false;\"",
              this.get_id(),
              Math.max(i - r, 0),
            ),
          ),
          t.append("><span>...</span></a>"));
        for (var l = i, o = n; l <= o; l++)
          l == this.get_currentPageIndex() + 1
            ? (t.append('<a href="#"'),
              t.append(' onclick="return false;" class="rgCurrentPage"'),
              t.append(String.format("><span>{0}</span></a>", l)))
            : (t.append('<a href="#"'),
              t.append(
                String.format(
                  " onclick=\"Telerik.Web.UI.Grid.NavigateToPage('{0}',{1}); return false;\"",
                  this.get_id(),
                  l,
                ),
              ),
              t.append(String.format("><span>{0}</span></a>", l)));
        n < this.PageCount &&
          (t.append('<a href="#"'),
          t.append(
            String.format(
              " onclick=\"Telerik.Web.UI.Grid.NavigateToPage('{0}',{1}); return false;\"",
              this.get_id(),
              n + 1,
            ),
          ),
          t.append("><span>...</span></a>")),
          (e.innerHTML = t.toString());
      }
    },
    get_currentPageIndex: function () {
      return this.CurrentPageIndex;
    },
    set_currentPageIndex: function (e, t) {
      if (this.CurrentPageIndex != e) {
        this.CurrentPageIndex = e;
        var i = String.format("{0}CPI", this.get_id()),
          r = String.format("{0}FIP", this.get_id()),
          n = String.format("{0}LIP", this.get_id()),
          l = String.format("{0}DSC", this.get_id()),
          o = String.format("{0}CPITop", this.get_id()),
          a = String.format("{0}FIPTop", this.get_id()),
          s = String.format("{0}LIPTop", this.get_id()),
          d = String.format("{0}DSCTop", this.get_id());
        $get(i) && ($get(i).innerHTML = e + 1),
          $get(r) &&
            ($get(r).innerHTML =
              (e + 1) * this.get_pageSize() - this.get_pageSize() + 1);
        var h,
          u = 0;
        if (
          ($get(l) && (u = parseInt($get(l).innerHTML, 10)),
          $get(n) &&
            ((h = (e + 1) * this.get_pageSize()) > u && (h = u),
            ($get(n).innerHTML = h)),
          $get(o) && ($get(o).innerHTML = e + 1),
          $get(a) &&
            ($get(a).innerHTML =
              (e + 1) * this.get_pageSize() - this.get_pageSize() + 1),
          (u = 0),
          $get(d) && (u = parseInt($get(d).innerHTML, 10)),
          $get(s) &&
            ((h = (e + 1) * this.get_pageSize()) > u && (h = u),
            ($get(s).innerHTML = h)),
          this._generateNumericPager(),
          this._data.sliderClientID &&
            "" != this._data.sliderClientID &&
            this._data.sliderTopClientID &&
            "" != this._data.sliderTopClientID)
        ) {
          var _ = $find(this._data.sliderClientID);
          _ && _.set_value(e),
            (_ = $find(this._data.sliderTopClientID)) && _.set_value(e);
        }
        if (
          this._data.goToPageTextBoxClientID &&
          "" != this._data.goToPageTextBoxClientID &&
          this._data.goToPageTextBoxTopClientID &&
          "" != this._data.goToPageTextBoxTopClientID
        ) {
          var g = $find(this._data.goToPageTextBoxClientID);
          null != g && g.set_value(e + 1),
            null != (g = $find(this._data.goToPageTextBoxTopClientID)) &&
              g.set_value(e + 1);
        }
        t || this.fireCommand("Page", e);
      }
    },
    get_dataSource: function () {
      return this._dataSource;
    },
    set_dataSource: function (e) {
      this._dataSource != e && (this._dataSource = e);
    },
    get_allowMultiColumnSorting: function () {
      return this._data.AllowMultiColumnSorting;
    },
    set_allowMultiColumnSorting: function (e) {
      this._data.AllowMultiColumnSorting != e &&
        (this._data.AllowMultiColumnSorting = e);
    },
    get_allowNaturalSort: function () {
      return this._data.AllowNaturalSort;
    },
    set_allowNaturalSort: function (e) {
      this._data.AllowNaturalSort != e && (this._data.AllowNaturalSort = e);
    },
    _setPagerVisibility: function (e) {
      var t,
        i,
        r,
        n = e ? "" : "none";
      if (this.get_element().tFoot) {
        var l = this.get_element().tFoot;
        if (l.rows)
          for (t = 0, r = l.rows.length; t < r; t++)
            l.rows[t].className.indexOf("rgPager") > -1 &&
              (l.rows[t].style.display = n);
      } else {
        var o = $get(String.format("{0}_Pager", this.get_id()));
        if (o && (i = o.rows || (o.tBodies && o.tBodies[0].rows)) && i.length)
          for (t = 0, r = i.length; t < r; t++)
            i[t].className.indexOf("rgPager") > -1 && (i[t].style.display = n);
      }
      var a = this.get_element().tHead;
      if (a)
        for (t = 0, r = a.rows.length; t < r; t++)
          a.rows[t].className.indexOf("rgPager") > -1 &&
            (a.rows[t].style.display = n);
      else {
        var s = $get(String.format("{0}_TopPager", this.get_id()));
        if (s && (i = s.rows || (s.tBodies && s.tBodies[0].rows)) && i.length)
          for (t = 0, r = i.length; t < r; t++)
            i[t].className.indexOf("rgPager") > -1 && (i[t].style.display = n);
      }
    },
    _fixRowsClassNames: function () {
      for (
        var e, t = this.get_element().tBodies[0].rows, i = 0, r = 0;
        r < t.length;
        r++
      )
        (-1 === (e = t[r]).className.indexOf("rgRow") &&
          -1 === e.className.indexOf("rgAltRow")) ||
          "none" === e.style.display ||
          (i % 2 == 0 || 0 == this._owner.ClientSettings.EnableAlternatingItems
            ? (Sys.UI.DomElement.removeCssClass(e, "rgAltRow"),
              Sys.UI.DomElement.addCssClass(e, "rgRow"))
            : (Sys.UI.DomElement.removeCssClass(e, "rgRow"),
              Sys.UI.DomElement.addCssClass(e, "rgAltRow")),
          i++);
    },
    expandItem: function (e) {
      e = this._getRowByIndexOrItemIndexHierarchical(e);
      var t = this._getExpandButton(e);
      return this._ensureExpandCollapseButtons(t, !1), this._expandRow(e);
    },
    _expandRow: function (e) {
      if (!this._owner.ClientSettings.AllowExpandCollapse) return !1;
      var t = e,
        i = t.id.split("__")[1],
        r = 1;
      if (!$find(t.id)) {
        var n = $find(t.id.split("__")[0]);
        n && n.get_dataItems();
      }
      var l = $find(t.id);
      l && l.get_isInEditMode() && "InPlace" != this._data.EditMode && (r = 2);
      var o = this._data.hasDetailItemTemplate ? 1 : 0,
        a = t.parentNode.rows[t.sectionRowIndex + r + o];
      if (a && "none" == a.style.display) {
        var s = new Telerik.Web.UI.GridDataItemCancelEventArgs(t, null);
        if (
          ((s.get_nestedViewItem = function () {
            return a;
          }),
          this._owner.raise_hierarchyExpanding(s),
          s.get_cancel())
        )
          return !1;
        var d = $find(t.id);
        d && (d._expanded = !0),
          (a.style.display = window.netscape ? "table-row" : ""),
          ((s = new Telerik.Web.UI.GridDataItemEventArgs(
            t,
            null,
          )).get_nestedViewItem = function () {
            return a;
          }),
          this._owner.raise_hierarchyExpanded(s),
          "Batch" == this._data.EditMode &&
            this._data._batchEditingSettings.highlightDeletedRows &&
            this.get_owner()
              .get_batchEditingManager()
              ._adjustBatchDeletedRows(),
          Array.add(this._owner._expandedItems, i),
          this._owner.updateClientState();
      }
      if (
        "tr" ==
          this.get_element().parentNode.parentNode.tagName.toLowerCase() &&
        this.get_id() != this._owner._masterClientID
      ) {
        var h = this.get_element().parentNode.parentNode.parentNode.parentNode,
          u = $find(h.id),
          _ = h.rows[this.get_element().parentNode.parentNode.rowIndex - 1];
        _ && u._expandRow(_);
      }
      return !0;
    },
    collapseItem: function (e) {
      e = this._getRowByIndexOrItemIndexHierarchical(e);
      var t = this._getExpandButton(e);
      return this._ensureExpandCollapseButtons(t, !0), this._collapseRow(e);
    },
    _performCollapseItem: function (e) {
      e = this._getRowByIndexOrItemIndexHierarchical(e);
      var t = 0;
      this._data._columnsData &&
        this._data._columnsData.length > 0 &&
        "GridGroupSplitterColumn" == this._data._columnsData[0].ColumnType &&
        (t = 1);
      var i = e.cells[t].getElementsByTagName("input")[0];
      if (
        (null == i && (i = e.cells[t].getElementsByTagName("img")[0]),
        this._ensureExpandCollapseButtons(i, !0),
        !$find(e.id))
      ) {
        var r = $find(e.id.split("__")[0]);
        this._owner._ensureDataItemsCreated(r);
      }
      return this._collapseRow(e);
    },
    _collapseRow: function (e) {
      if (!this._owner.ClientSettings.AllowExpandCollapse) return !1;
      var t = e,
        i = t.id.split("__")[1],
        r = 1;
      if (
        this._owner._editIndexes.length > 0 &&
        ("Client" == this._hierarchyLoadMode ||
          "Conditional" == this._hierarchyLoadMode) &&
        "InPlace" != this._data.EditMode
      ) {
        var n = $find(t.id);
        n && n.get_isInEditMode() && (r += 1);
      }
      var l = this._data.hasDetailItemTemplate ? 1 : 0,
        o = t.parentNode.rows[t.sectionRowIndex + r + l];
      if (o && "none" != o.style.display) {
        var a = new Telerik.Web.UI.GridDataItemCancelEventArgs(t, null);
        if (
          ((a.get_nestedViewItem = function () {
            return o;
          }),
          this._owner.raise_hierarchyCollapsing(a),
          a.get_cancel())
        )
          return !1;
        var s = $find(t.id);
        s && (s._expanded = !1),
          (o.style.display = "none"),
          ((a = new Telerik.Web.UI.GridDataItemEventArgs(
            t,
            null,
          )).get_nestedViewItem = function () {
            return o;
          }),
          this._owner.raise_hierarchyCollapsed(a),
          "Batch" == this._data.EditMode &&
            this._data._batchEditingSettings.highlightDeletedRows &&
            this.get_owner()
              .get_batchEditingManager()
              ._adjustBatchDeletedRows(),
          Array.add(this._owner._expandedItems, i),
          this._owner.updateClientState();
      }
      return !0;
    },
    _ensureExpandCollapseButtons: function (e, t) {
      var i;
      e &&
        (t
          ? (e.title == this._owner._hierarchySettings.CollapseTooltip &&
              (e.title = this._owner._hierarchySettings.ExpandTooltip),
            e.src
              ? (i = this.get_columns()[e.parentNode.cellIndex]) &&
                (e.src = i._data.ExpandImageUrl)
              : ((i = this.get_columns()[e.parentNode.cellIndex]) &&
                  -1 !== e.className.indexOf("rgCollapse") &&
                  (this.get_owner()._renderMode ==
                  Telerik.Web.UI.RenderMode.Lite
                    ? ((e.className = e.className.replace(
                        /rgCollapse/g,
                        "rgExpand",
                      )),
                      e.children.length > 0 &&
                        "span" == e.children[0].tagName.toLowerCase() &&
                        (e.children[0].className =
                          e.children[0].className.replace(
                            /rgCollapse/g,
                            "rgExpand",
                          )))
                    : (e.className = "rgExpand")),
                e.textContent && "-" == e.textContent && (e.textContent = "+")),
            this._owner.get_enableAriaSupport() &&
              (e.setAttribute("aria-expanded", "false"),
              e.parentNode.parentNode.setAttribute("aria-expanded", "false")))
          : (e.title == this._owner._hierarchySettings.ExpandTooltip &&
              (e.title = this._owner._hierarchySettings.CollapseTooltip),
            e.src
              ? (i = this.get_columns()[e.parentNode.cellIndex]) &&
                (e.src = i._data.CollapseImageUrl)
              : ((i = this.get_columns()[e.parentNode.cellIndex]) &&
                  -1 !== e.className.indexOf("rgExpand") &&
                  (this.get_owner()._renderMode ==
                  Telerik.Web.UI.RenderMode.Lite
                    ? ((e.className = e.className.replace(
                        /rgExpand/g,
                        "rgCollapse",
                      )),
                      e.children.length > 0 &&
                        "span" == e.children[0].tagName.toLowerCase() &&
                        (e.children[0].className =
                          e.children[0].className.replace(
                            /rgExpand/g,
                            "rgCollapse",
                          )))
                    : (e.className = "rgCollapse")),
                e.textContent && "+" == e.textContent && (e.textContent = "-")),
            this._owner.get_enableAriaSupport() &&
              (e.setAttribute("aria-expanded", "true"),
              e.parentNode.parentNode.setAttribute("aria-expanded", "true"))));
    },
    _toggleExpand: function (e, t) {
      if (this._owner.ClientSettings.AllowExpandCollapse) {
        var i = e.parentNode.parentNode,
          r = 1;
        this._owner._editIndexes.length > 0 &&
          ("Client" == this._hierarchyLoadMode ||
            "Conditional" == this._hierarchyLoadMode) &&
          "InPlace" != this._data.EditMode &&
          $find(i.id).get_isInEditMode() &&
          (r += 1);
        var n = this._data.hasDetailItemTemplate ? 1 : 0,
          l = i.parentNode.rows[i.sectionRowIndex + r + n],
          o = $find(this._owner.get_id());
        if ("none" != l.style.display) {
          if (!this._collapseRow(i)) return !1;
          this._ensureExpandCollapseButtons(e, !0);
        } else {
          if (!this._expandRow(i)) return !1;
          this._ensureExpandCollapseButtons(e, !1);
        }
        o._scrolling && o._scrolling.UseStaticHeaders && o.repaint(),
          o.ClientSettings.AllowKeyboardNavigation && o.get_element().focus(),
          (o.ClientSettings.AllowKeyboardNavigation ||
            o.get_allowMultiRowSelection()) &&
            o._getPositionedDataItems(!0),
          this._enableHierarchyExpandAll &&
            this._toggleHierarchyExpandAllHeaderButtons();
      }
    },
    _toggleExpandByRowElement: function (e, t) {
      if (this._owner.ClientSettings.AllowExpandCollapse) {
        this._owner._editIndexes.length > 0 &&
          ("Client" == this._hierarchyLoadMode ||
            "Conditional" == this._hierarchyLoadMode) &&
          "InPlace" != this._data.EditMode &&
          $find(e.id).get_isInEditMode() &&
          1;
        var i = $find(this._owner.get_id()),
          r = 0;
        this._data._columnsData &&
          this._data._columnsData.length > 0 &&
          "GridGroupSplitterColumn" == this._data._columnsData[0].ColumnType &&
          (r = 1);
        var n =
          e.cells[r].getElementsByTagName("input")[0] ||
          e.cells[r].getElementsByTagName("img")[0] ||
          e.cells[r].getElementsByTagName("button")[0];
        if (t) {
          if (!this._collapseRow(e)) return !1;
          this._ensureExpandCollapseButtons(n, !0);
        } else {
          if (!this._expandRow(e)) return !1;
          this._ensureExpandCollapseButtons(n, !1);
        }
        i.ClientSettings.AllowKeyboardNavigation && i.get_element().focus(),
          (i.ClientSettings.AllowKeyboardNavigation ||
            i.get_allowMultiRowSelection()) &&
            i._getPositionedDataItems(!0);
      }
    },
    _expandAll: function (e) {
      var t,
        i = e || window.event,
        r = i.srcElement ? i.srcElement : i.target;
      (i.returnValue = !1),
        (i.cancelBubble = !0),
        i.preventDefault && (i.preventDefault(), i.stopPropagation());
      for (
        var n = this.get_columns()[r.parentNode.cellIndex],
          l = !!(
            r.className.indexOf("rgCollapse") > -1 ||
            (r.src && r.src.indexOf(n._data.CollapseImageUrl) > -1)
          ),
          o = this.get_element(),
          a = ($telerik.isOpera ? o : o.tBodies[0]).rows,
          s = 0,
          d = a.length;
        s < d;
        s++
      ) {
        var h = a[s];
        h.id && this._toggleExpandByRowElement(h, l);
      }
      l
        ? (r.src
            ? (r.src = n._data.ExpandImageUrl)
            : this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite
              ? (((t = Telerik.Web.UI.Grid.GetFirstParentByTagName(
                  r,
                  "th",
                ).getElementsByTagName("button")[0]).className =
                  "t-button rgActionButton rgExpand"),
                (t.children[0].className = "t-font-icon rgIcon rgExpandIcon"))
              : (r.className = "rgExpand"),
          (this._owner.get_hierarchyColsExpandedState()[this._data.UniqueID] =
            !1))
        : (r.src
            ? (r.src = n._data.CollapseImageUrl)
            : this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite
              ? (((t = Telerik.Web.UI.Grid.GetFirstParentByTagName(
                  r,
                  "th",
                ).getElementsByTagName("button")[0]).className =
                  "t-button rgActionButton rgCollapse"),
                (t.children[0].className = "t-font-icon rgIcon rgCollapseIcon"))
              : (r.className = "rgCollapse"),
          (this._owner.get_hierarchyColsExpandedState()[this._data.UniqueID] =
            !0)),
        this._owner.updateClientState();
    },
    _toggleHierarchyExpandAllHeaderButtons: function () {
      var e,
        t,
        i = this.get_dataItems(),
        r = this._getHierarchyColExpButtons(),
        n = i[0].get_expanded(),
        l = !0;
      for (t = 0; t < i.length; t++)
        if (n != i[t].get_expanded()) {
          l = !1;
          break;
        }
      if (l) {
        var o = this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite;
        for (t = 0; t < r.length; t++)
          n
            ? r[t].src
              ? (e = this.get_columns()[r[t].parentNode.cellIndex]) &&
                (r[t].src = e._data.CollapseImageUrl)
              : o
                ? ((r[t].className = "t-button rgActionButton rgCollapse"),
                  r[t].children.length > 0 &&
                    "span" == r[t].children[0].tagName.toLowerCase() &&
                    (r[t].children[0].className =
                      "t-font-icon rgIcon rgCollapseIcon"))
                : (r[t].className = "rgCollapse")
            : r[t].src
              ? (e = this.get_columns()[r[t].parentNode.cellIndex]) &&
                (r[t].src = e._data.ExpandImageUrl)
              : o
                ? ((r[t].className = "t-button rgActionButton rgExpand"),
                  r[t].children.length > 0 &&
                    "span" == r[t].children[0].tagName.toLowerCase() &&
                    (r[t].children[0].className =
                      "t-font-icon rgIcon rgExpandIcon"))
                : (r[t].className = "rgExpand");
        (this._owner.get_hierarchyColsExpandedState()[this._data.UniqueID] = n),
          this._owner.updateClientState();
      }
    },
    _toggleDisplayHierarchyExpandAllButtons: function () {
      for (
        var e = this._isLastLevelGroupAllButtonOpen() ? "" : "none",
          t = this._getHeaderHierarchyExpandAllButtons(),
          i = 0;
        i < t.length;
        i++
      )
        t[i].style.display = e;
    },
    _getHeaderHierarchyExpandAllButtons: function () {
      for (
        var e = [],
          t = this.get_columns(),
          i =
            this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite
              ? "button"
              : "input",
          r = 0;
        r < t.length;
        r++
      ) {
        var n = t[r].get_element();
        if (n.className.indexOf("rgExpandCol") > -1) {
          var l = n.getElementsByTagName(i)[0];
          if (l) {
            Array.add(e, l);
            continue;
          }
          (l = n.getElementsByTagName("img")[0]) && Array.add(e, l);
        }
      }
      return e;
    },
    _isLastLevelGroupAllButtonOpen: function () {
      var e = !1,
        t = this._getGroupColExpButtons(),
        i = t[t.length - 1];
      return (
        "none" != i.style.display &&
          i.className.indexOf("rgCollapse") > -1 &&
          (e = !0),
        e
      );
    },
    _expandAllGroups: function (e, t) {
      var i = e || window.event,
        r = i.target || i.srcElement;
      "span" == r.tagName.toLocaleLowerCase() && (r = r.parentNode),
        this._groupExpandAll(r, t),
        this._toggleDisplayHierarchyExpandAllButtons();
    },
    _createFakeElement: function (e, t) {
      var i = document.createElement(e);
      return (i.className = t), i;
    },
    _getGroupColExpButtons: function () {
      for (
        var e = [],
          t = this.get_columns(),
          i = this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite,
          r = 0;
        r < t.length;
        r++
      ) {
        var n = t[r].get_element();
        if (n.className.indexOf("rgGroupCol") > -1) {
          var l = i
            ? n.getElementsByTagName("button")[0]
            : n.getElementsByTagName("input")[0];
          if (l) {
            Array.add(e, l);
            continue;
          }
          (l = n.getElementsByTagName("img")[0]) ||
            (l = this._createFakeElement("input", "rgExpand")),
            l && Array.add(e, l);
        }
      }
      return e;
    },
    _getHierarchyColExpButtons: function () {
      for (
        var e = [],
          t = this.get_columns(),
          i = this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite,
          r = 0;
        r < t.length;
        r++
      ) {
        var n = t[r].get_element();
        if (n.className.indexOf("rgExpandCol") > -1) {
          var l = i
            ? n.getElementsByTagName("button")[0]
            : n.getElementsByTagName("input")[0] ||
              n.getElementsByTagName("img")[0];
          Array.add(e, l);
        }
      }
      return e;
    },
    _showGroupColExpButtonsOnCollapse: function (e, t) {
      for (var i = this._getGroupColExpButtons(), r = t + 1; r < i.length; r++)
        e.className.indexOf("rgCollapse") > -1 &&
          "none" != e.style.display &&
          (i[r].style.display = ""),
          (e = i[r]);
    },
    _hideGroupColExpButtonsOnCollapse: function (e, t) {
      for (var i = this._getGroupColExpButtons(), r = t + 1; r < i.length; r++)
        i[r].style.display = "none";
    },
    _updateGroupsColState: function (e, t) {
      this._owner._groupColsState[this._data.UniqueID] ||
        (this._owner._groupColsState[this._data.UniqueID] = new Array(
          1 * this._data.GroupLevelsCount,
        )),
        (this._owner._groupColsState[this._data.UniqueID][t] = e);
    },
    _groupExpandAll: function (e, t) {
      if (this._owner.ClientSettings.AllowExpandCollapse) {
        this._owner._shouldUpdateClientState = !1;
        for (
          var i = this.get_element(),
            r = ($telerik.isOpera ? i : i.tBodies[0]).rows,
            n = 0,
            l = r.length;
          n < l;
          n++
        ) {
          var o = r[n];
          if (o.id || -1 !== o.className.indexOf("rgGroupHeader")) {
            var a = this._getGroupExpandButton(o);
            if (a)
              a.id.split("__")[2] == t &&
                (e.className.indexOf("rgCollapse") > -1
                  ? (this._toggleGroupsExpandAll(a, {}, !0),
                    this._hideGroupColExpButtonsOnCollapse(a, t),
                    this._updateGroupsColState(!1, t))
                  : (this._toggleGroupsExpandAll(a, {}, !1),
                    this._showGroupColExpButtonsOnCollapse(a, t),
                    this._updateGroupsColState(!0, t)));
          }
        }
        var s = this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite;
        e.className.indexOf("rgCollapse") > -1
          ? s
            ? ((e.className = "t-button rgActionButton rgExpand"),
              (e.title = this.get_owner()._groupingSettings.ExpandAllTooltip),
              e.children.length > 0 &&
                "span" == e.children[0].tagName.toLowerCase() &&
                (e.children[0].className = "t-font-icon rgIcon rgExpandIcon"))
            : ((e.className = "rgExpand"),
              (e.title = this.get_owner()._groupingSettings.ExpandAllTooltip))
          : s
            ? ((e.className = "t-button rgActionButton rgCollapse"),
              (e.title = this.get_owner()._groupingSettings.CollapseAllTooltip),
              e.children.length > 0 &&
                "span" == e.children[0].tagName.toLowerCase() &&
                (e.children[0].className = "t-font-icon rgIcon rgCollapseIcon"))
            : ((e.className = "rgCollapse"),
              (e.title =
                this.get_owner()._groupingSettings.CollapseAllTooltip)),
          (this._owner._shouldUpdateClientState = !0),
          this._owner.updateClientState();
      }
    },
    _shouldSkipOtherRows: function (e, t) {
      if (e.className.indexOf("rgNoRecords") > -1) return !0;
      if (
        e.className.indexOf("rgRow") > -1 ||
        e.className.indexOf("rgAltRow") > -1
      ) {
        var i = e.id.split("__");
        if (i.length > 1) if (parseInt(i[1], 10) >= t) return !0;
      }
      return !1;
    },
    _toggleGroupsExpandAll: function (e, t, i, r) {
      var n = !1;
      r || (n = !0);
      var l = e,
        o = void 0 !== r;
      if (
        (void 0 === r && (r = l),
        this._owner.ClientSettings.AllowGroupExpandCollapse)
      ) {
        var a = l.id.split("__")[0],
          s = $find(a),
          d = l.id.split("__")[1],
          h = l.id.split("__")[2],
          u = !1;
        this._originalGroupLevel || (this._originalGroupLevel = h),
          (parseInt(h, 10) < parseInt(this._originalGroupLevel, 10) || n) &&
            (this._originalGroupLevel = h);
        var _ = l.parentNode.cellIndex,
          g = l.parentNode.parentNode.sectionRowIndex,
          c = s.get_element().tBodies[0],
          m = this.get_columns()[_],
          p = new Sys.CancelEventArgs();
        if (
          (o ||
            (i
              ? this._owner.raise_groupCollapsing(p)
              : this._owner.raise_groupExpanding(p)),
          p.get_cancel())
        )
          return !1;
        if (l === r && m)
          if (l.src)
            i || l.src === m._data.CollapseImageUrl
              ? i &&
                l.src !== m._data.ExpandImageUrl &&
                ((u = !0),
                (l.src = m._data.ExpandImageUrl),
                (l.title = s._owner._groupingSettings.ExpandTooltip),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "false"),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "false",
                  )))
              : ((u = !0),
                (l.src = m._data.CollapseImageUrl),
                (l.title = s._owner._groupingSettings.CollapseTooltip),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "true"),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "true",
                  )));
          else {
            var f =
              this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite;
            i || -1 !== l.className.indexOf("rgCollapse")
              ? i &&
                -1 === l.className.indexOf("rgExpand") &&
                ((u = !0),
                f
                  ? ((l.className = "t-button rgActionButton rgExpand"),
                    l.children.length > 0 &&
                      "span" == l.children[0].tagName.toLowerCase() &&
                      (l.children[0].className =
                        "t-font-icon rgIcon rgExpandIcon"))
                  : (l.className = "rgExpand"),
                (l.title = s._owner._groupingSettings.ExpandTooltip),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "false"),
                  l.setAttribute("aria-label", l.title),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "false",
                  )))
              : ((u = !0),
                (l.className = f
                  ? "t-button rgActionButton rgCollapse"
                  : "rgCollapse"),
                f &&
                  l.children.length > 0 &&
                  "span" == l.children[0].tagName.toLowerCase() &&
                  (l.children[0].className =
                    "t-font-icon rgIcon rgCollapseIcon"),
                (l.title = s._owner._groupingSettings.CollapseTooltip),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "true"),
                  l.setAttribute("aria-label", l.title),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "true",
                  )));
          }
        var w = "none";
        !i &&
          0 !== l.offsetHeight &&
          this._isGroupButtonCollapse(l) &&
          (w = window.netscape ? "table-row" : ""),
          this._owner._groupingSettings.RetainGroupFootersVisibility &&
            !t.groupLevel &&
            (t.groupLevel = h);
        var C,
          I,
          v,
          T,
          b = h,
          y = !1,
          S =
            parseInt(this._groupLevelsCount, 10) -
            parseInt(this._originalGroupLevel, 10),
          D = parseInt(this._groupLevelsCount, 10) - parseInt(h, 10),
          k = this.get_virtualItemCount();
        for (C = g + 1; C < c.rows.length; C++)
          if (((I = c.rows[C]), !k || i || !this._shouldSkipOtherRows(I, k))) {
            var x,
              G = this._previousRow(c.rows[C]);
            if (
              I.className.indexOf("rgRow") < 0 &&
              I.className.indexOf("rgAltRow") < 0 &&
              G &&
              G.id
            ) {
              var N = this._getExpandButton(G);
              if (
                N &&
                !this._isGroupButtonCollapse(N) &&
                -1 == I.className.indexOf("rgFooter")
              )
                continue;
            }
            if (
              ((I.id || -1 !== I.className.indexOf("rgGroupHeader")) &&
                (x = this._getGroupExpandButton(I)),
              x)
            ) {
              if (
                (b = x.id.split("__")[2]) == h ||
                parseInt(b, 10) < parseInt(h, 10)
              ) {
                if (t.groupLevel && h == t.groupLevel && "none" == w)
                  for (T = h - b + 1, v = 0; v < T; v++)
                    (I = c.rows[C - v - 1]).id || (I.style.display = "");
                break;
              }
              if (parseInt(b, 10) - parseInt(h, 10) == 1) {
                if (x.src == l.src || l.className == x.className) {
                  x === r &&
                    "none" == w &&
                    (l.src
                      ? (x.src = m._data.CollapseImageUrl)
                      : this.get_owner()._renderMode ==
                          Telerik.Web.UI.RenderMode.Lite
                        ? ((x.className = "t-button rgActionButton rgCollapse"),
                          x.children.length > 0 &&
                            "span" == x.children[0].tagName.toLowerCase() &&
                            (x.children[0].className =
                              "t-font-icon rgIcon rgCollapseIcon"))
                        : (x.className = "rgCollapse"));
                  var F = !1;
                  i ? (F = i) : this._isGroupButtonCollapse(l) || (F = !0),
                    (I.style.display = w),
                    this._toggleGroupsExpand(x, t, l, F),
                    (D =
                      parseInt(this._groupLevelsCount, 10) - parseInt(h, 10));
                }
                I.style.display = w;
              }
            } else if (
              (b == h &&
                (S > 0 && (I.style.display = w),
                -1 != I.className.indexOf("rgFooter")
                  ? S--
                  : (I.style.display = w)),
              ("" == w || "table-row" == w) &&
                -1 != I.className.indexOf("rgFooter"))
            ) {
              var R = 1;
              this._owner._groupingSettings.RetainGroupFootersVisibility &&
                (R = 2),
                D <= R && (I.style.display = w),
                D--;
            }
            C == c.rows.length - 1 && (y = !0);
          }
        if (t.groupLevel && y && t.groupLevel == h && "none" == w)
          for (T = 1 * h + 1, v = 0; v < T; v++)
            (I = c.rows[c.rows.length - v - 1]).id || (I.style.display = "");
        if (l === r && u) {
          var U = this._owner._expandedGroupItems,
            E = s._data.UniqueID + "!" + d;
          for (S = 0, C = 0; C < U.length; C++) U[C] == E && S++;
          2 === S ? Array.remove(U, E) : Array.add(U, E);
        }
        this._owner.updateClientState(),
          (p = new Sys.EventArgs()),
          o ||
            (i
              ? this._owner.raise_groupCollapsed(p)
              : this._owner.raise_groupExpanded(p)),
          $find(this._owner.get_id())._getPositionedDataItems(!0);
      }
    },
    _previousRow: function (e) {
      var t = e.previousSibling;
      return (
        this._data.hasDetailItemTemplate &&
          t.className &&
          (-1 != t.className.indexOf("rgRow") ||
            -1 != t.className.indexOf("rgAltRow")) &&
          (t = e.previousSibling),
        t
      );
    },
    _previousDataItemElement: function (e) {
      var t = this;
      if (t._isDataItemElement(e)) return e;
      for (; !t._isDataItemElement(e) && e; ) e = e.previousSibling;
      return t._isDataItemElement(e) ? e : null;
    },
    _isDataItemElement: function (e) {
      return (
        e &&
        e.className &&
        (-1 != e.className.indexOf("rgRow") ||
          -1 != e.className.indexOf("rgAltRow")) &&
        -1 != e.id.indexOf("__")
      );
    },
    _expandCollapseGroup: function (e, t, i) {
      var r = {
          expandChildren: !1,
          expandParents: !0,
          collapseChildren: !1,
          collapseParents: !1,
          toggleChildren: !1,
          toggleParents: !1,
          findClosestGroup: !0,
        },
        n = this;
      t = t || {};
      var l,
        o,
        a,
        s,
        d,
        h = e.parentNode.parentNode.rows,
        u = !i;
      for (var _ in r) void 0 === t[_] && (t[_] = r[_]);
      if (t.findClosestGroup) {
        for (
          l = e.rowIndex;
          h[l] && !Sys.UI.DomElement.containsCssClass(h[l], "rgGroupHeader");

        )
          l--;
        if (!(e = h[l])) return;
      }
      if (
        ((d =
          -1 !==
          (o = n._getGroupExpandButton(e)).className.indexOf("rgExpand")),
        !0 === i || d
          ? (s = "rgExpand")
          : (!1 !== i && d) || (s = "rgCollapse"),
        this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite &&
          (s = "t-button rgActionButton " + s),
        o ||
          ((o = $telerik.getElementByClassName(e, "rgGroupCol")) &&
            (o = $telerik.getElementByClassName(o, "rgExpand"))),
        o ||
          ((o = $telerik.getElementByClassName(e, "rgGroupCol")) &&
            (o = $telerik.getElementByClassName(o, "rgCollapse"))),
        o)
      ) {
        if (s && !(o.className.indexOf(s) > -1)) return !1;
        if (
          (s || (s = o.className),
          n._toggleGroupsExpand(o, {}),
          (t.expandParents && i && void 0 !== i) ||
            (t.collapseParents && u && void 0 !== i) ||
            t.toggleParents)
        )
          for (
            a = $telerik.getElementsByClassName(e, "rgGroupCol").length - 1,
              l = e.rowIndex - 1;
            a > 0 && h[l];

          )
            $telerik.getElementsByClassName(h[l], "rgGroupCol").length === a &&
              (n._expandCollapseGroup(
                h[l],
                { expandParents: !1, findClosestGroup: !1 },
                i,
              ),
              a--),
              l--;
        if (
          (t.expandChildren && i) ||
          (t.collapseChildren && u) ||
          t.toggleChildren
        )
          for (
            a = $telerik.getElementsByClassName(e, "rgGroupCol").length,
              l = e.rowIndex + 1;
            h[l] &&
            $telerik.getElementsByClassName(h[l], "rgGroupCol").length !== a;

          )
            n._expandCollapseGroup(
              h[l],
              { expandParents: !1, findClosestGroup: !1 },
              i,
            ),
              l++;
        if ("Server" === this._data.GroupLoadMode) {
          var g = "",
            c = o.id.split("__");
          (t.expandChildren || (t.toggleChildren && s.indexOf("rgExpand"))) &&
            (g = "expandChildren;" + c[1] + ";" + c[2]),
            this.fireCommand("GroupsCustomExpandCollapse", g);
        }
        return !0;
      }
      return !1;
    },
    toggleGroup: function (e, t) {
      return this._expandCollapseGroup(e, t);
    },
    expandGroup: function (e, t) {
      return this._expandCollapseGroup(e, t, !0);
    },
    collapseGroup: function (e, t) {
      return this._expandCollapseGroup(e, t, !1);
    },
    _expandCollapseAllGroups: function (e, t) {
      e = parseInt(e, 10);
      var i,
        r = isNaN(e) || 0 === e,
        n = this._getGroupColExpButtons(),
        l = r
          ? t.indexOf("rgExpand") > -1
            ? "expandToLevel"
            : "collapseToLevel"
          : t.indexOf("rgExpand") > -1
            ? "expandLevel"
            : "collapseLevel";
      if (r)
        for (var o = 0; o < n.length; o++)
          ((i = n[o]).className = t), this._groupExpandAll(i, o), (e = o);
      else {
        if (!(i = n[e])) return !1;
        (i.className = t), this._groupExpandAll(i, e);
      }
      return (
        "Server" === this._data.GroupLoadMode &&
          this.fireCommand(
            "GroupsCustomExpandCollapse",
            String.format("{0};{1}", l, e),
          ),
        !0
      );
    },
    expandAllGroups: function (e) {
      return this._expandCollapseAllGroups(e, "rgExpand");
    },
    collapseAllGroups: function (e) {
      return this._expandCollapseAllGroups(e, "rgCollapse");
    },
    _toggleGroupsExpand: function (e, t, i, r) {
      var n = !1;
      i || (n = !0);
      var l = e,
        o = void 0 !== i;
      if (
        (void 0 === i && (i = l),
        this._owner.ClientSettings.AllowGroupExpandCollapse)
      ) {
        var a = l.id.split("__")[0],
          s = $find(a),
          d = l.id.split("__")[1],
          h = l.id.split("__")[2],
          u = !1;
        this._originalGroupLevel || (this._originalGroupLevel = h),
          (parseInt(h, 10) < parseInt(this._originalGroupLevel, 10) || n) &&
            (this._originalGroupLevel = h);
        var _ = l.parentNode.cellIndex,
          g = l.parentNode.parentNode.sectionRowIndex,
          c = s.get_element().tBodies[0],
          m = this.get_columns()[_],
          p = new Sys.CancelEventArgs(),
          f = !1;
        if (
          (this._isGroupButtonCollapse(l) && (f = !0),
          void 0 !== r && (f = r),
          o ||
            (f
              ? this._owner.raise_groupCollapsing(p)
              : this._owner.raise_groupExpanding(p)),
          p.get_cancel())
        )
          return !1;
        var w = this._owner._shouldUpdateClientState;
        if (((this._owner._shouldUpdateClientState = !1), l === i && m))
          if (l.src)
            f || l.src === m._data.CollapseImageUrl
              ? f &&
                l.src !== m._data.ExpandImageUrl &&
                ((u = !0),
                (l.src = m._data.ExpandImageUrl),
                (l.title = s._owner._groupingSettings.ExpandTooltip),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "false"),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "false",
                  )))
              : ((u = !0),
                (l.src = m._data.CollapseImageUrl),
                (l.title = s._owner._groupingSettings.CollapseTooltip),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "true"),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "true",
                  )));
          else {
            var C,
              I =
                this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite;
            f || -1 !== l.className.indexOf("rgCollapse")
              ? f &&
                -1 === l.className.indexOf("rgExpand") &&
                ((u = !0),
                (l.title = s._owner._groupingSettings.ExpandTooltip),
                I
                  ? ((C = l.children[0]),
                    (l.value = l.value.replace(/Collapse/g, "Expand")),
                    (l.className = l.className.replace(
                      /rgCollapse/g,
                      "rgExpand",
                    )),
                    C &&
                      C.className.indexOf("t-font-icon rgIcon") > -1 &&
                      (C.className = C.className.replace(
                        /Collapse/g,
                        "Expand",
                      )))
                  : (l.className = "rgExpand"),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "false"),
                  l.setAttribute("aria-label", l.title),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "false",
                  )))
              : ((u = !0),
                (l.title = s._owner._groupingSettings.CollapseTooltip),
                I
                  ? ((C = l.children[0]),
                    (l.value = l.value.replace(/Expand/g, "Collapse")),
                    (l.className = l.className.replace(
                      /rgExpand/g,
                      "rgCollapse",
                    )),
                    C &&
                      C.className.indexOf("t-font-icon rgIcon") > -1 &&
                      (C.className = C.className.replace(
                        /Expand/g,
                        "Collapse",
                      )))
                  : (l.className = "rgCollapse"),
                this._owner.get_enableAriaSupport() &&
                  (l.setAttribute("aria-expanded", "true"),
                  l.setAttribute("aria-label", l.title),
                  l.parentNode.parentNode.setAttribute(
                    "aria-expanded",
                    "true",
                  )));
          }
        var v = "none";
        !f &&
          0 !== l.offsetHeight &&
          this._isGroupButtonCollapse(l) &&
          (v = window.netscape ? "table-row" : ""),
          this._owner._groupingSettings.RetainGroupFootersVisibility &&
            !t.groupLevel &&
            (t.groupLevel = h);
        var T,
          b,
          y,
          S,
          D = h,
          k = !1,
          x =
            parseInt(this._groupLevelsCount, 10) -
            parseInt(this._originalGroupLevel, 10),
          G = parseInt(this._groupLevelsCount, 10) - parseInt(h, 10),
          N = this.get_virtualItemCount();
        for (T = g + 1; T < c.rows.length; T++)
          if (((y = c.rows[T]), !N || f || !this._shouldSkipOtherRows(y, N))) {
            var F,
              R = this._previousRow(c.rows[T]);
            if (
              y.className.indexOf("rgRow") < 0 &&
              y.className.indexOf("rgAltRow") < 0 &&
              R &&
              R.id
            ) {
              var U = this._getExpandButton(R);
              if (
                U &&
                !this._isGroupButtonCollapse(U) &&
                -1 == y.className.indexOf("rgFooter")
              )
                continue;
            }
            if (
              ((y.id || -1 !== y.className.indexOf("rgGroupHeader")) &&
                (F = this._getGroupExpandButton(y)),
              F)
            ) {
              if (
                (D = F.id.split("__")[2]) == h ||
                parseInt(D, 10) < parseInt(h, 10)
              ) {
                if (t.groupLevel && h == t.groupLevel && "none" == v)
                  for (S = h - D + 1, b = 0; b < S; b++)
                    (y = c.rows[T - b - 1]).id || (y.style.display = "");
                break;
              }
              if (parseInt(D, 10) - parseInt(h, 10) == 1) {
                if (F.src == l.src || l.className == F.className) {
                  F === i &&
                    "none" == v &&
                    (l.src
                      ? (F.src = m._data.CollapseImageUrl)
                      : this.get_owner()._renderMode ==
                          Telerik.Web.UI.RenderMode.Lite
                        ? ((F.className = "t-button rgActionButton rgCollapse"),
                          F.children.length > 0 &&
                            "span" == F.children[0].tagName.toLowerCase() &&
                            (F.children[0].className =
                              "t-font-icon rgIcon rgCollapseIcon"))
                        : (F.className = "rgCollapse"));
                  var E = !1;
                  f ? (E = f) : this._isGroupButtonCollapse(l) || (E = !0),
                    (y.style.display = v),
                    this._toggleGroupsExpand(F, t, l, E),
                    (G =
                      parseInt(this._groupLevelsCount, 10) - parseInt(h, 10));
                }
                y.style.display = v;
              }
            } else if (
              (D == h &&
                (x > 0 && (y.style.display = v),
                -1 != y.className.indexOf("rgFooter")
                  ? x--
                  : (y.style.display = v)),
              ("" == v || "table-row" == v) &&
                -1 != y.className.indexOf("rgFooter"))
            ) {
              var W = 1;
              this._owner._groupingSettings.RetainGroupFootersVisibility &&
                (W = 2),
                G <= W && (y.style.display = v),
                G--;
            }
            T == c.rows.length - 1 && (k = !0);
          }
        if (t.groupLevel && k && t.groupLevel == h && "none" == v)
          for (S = 1 * h + 1, b = 0; b < S; b++)
            (y = c.rows[c.rows.length - b - 1]).id || (y.style.display = "");
        if (l === i && u) {
          var M = this._owner._expandedGroupItems,
            B = s._data.UniqueID + "!" + d + "!" + h;
          x = 0;
          for (var A = 0; A < M.length; A++) M[A] == B && x++;
          2 === x
            ? (Array.remove(M, B),
              this._enableGroupsExpandAll &&
                this._toggleGroupsExpandAllButton(1 * h))
            : (Array.add(M, B),
              this._enableGroupsExpandAll &&
                this._toggleGroupsExpandAllButton(1 * h));
        }
        (this._owner._shouldUpdateClientState = w),
          this._owner.updateClientState(),
          (p = new Sys.EventArgs()),
          o ||
            (f
              ? this._owner.raise_groupCollapsed(p)
              : this._owner.raise_groupExpanded(p)),
          $find(this._owner.get_id())._getPositionedDataItems(!0),
          "Batch" == this._data.EditMode &&
            this._data._batchEditingSettings.highlightDeletedRows &&
            this.get_owner()
              .get_batchEditingManager()
              ._adjustBatchDeletedRows();
      }
    },
    _arrayContains: function (e, t) {
      for (var i = e.length; i--; ) if (e[i] === t) return !0;
      return !1;
    },
    _toggleGroupsExpandAllButton: function (e) {
      for (
        var t = this._owner._expandedGroupItems,
          i = this._getGroupColExpButtons()[e],
          r = i.className.indexOf("rgCollapse") > -1,
          n = this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite,
          l = this._groupHeadersCount[e],
          o = l,
          a = [],
          s = 0;
        s < t.length;
        s++
      ) {
        t[s].split("!")[2] == e &&
          (this._arrayContains(a, t[s]) && o--, Array.add(a, t[s]));
      }
      0 != o ||
        this._exapndedGroupItemsTemp[e] == a.length ||
        (a.length != l && a.length != 2 * l) ||
        ((this._exapndedGroupItemsTemp[e] = a.length),
        r
          ? (n
              ? ((i.className = "t-button rgActionButton rgExpand"),
                (i.title = this.get_owner()._groupingSettings.ExpandAllTooltip),
                i.children.length > 0 &&
                  "span" == i.children[0].tagName.toLowerCase() &&
                  (i.children[0].className = "t-font-icon rgIcon rgExpandIcon"))
              : ((i.className = "rgExpand"),
                (i.title =
                  this.get_owner()._groupingSettings.ExpandAllTooltip)),
            this._hideGroupColExpButtonsOnCollapse(i, 1 * e),
            this._updateGroupsColState(!1, e),
            this._toggleDisplayHierarchyExpandAllButtons())
          : (n
              ? ((i.className = "t-button rgActionButton rgCollapse"),
                (i.title =
                  this.get_owner()._groupingSettings.CollapseAllTooltip),
                i.children.length > 0 &&
                  "span" == i.children[0].tagName.toLowerCase() &&
                  (i.children[0].className =
                    "t-font-icon rgIcon rgCollapseIcon"))
              : ((i.className = "rgCollapse"),
                (i.title =
                  this.get_owner()._groupingSettings.CollapseAllTooltip)),
            this._showGroupColExpButtonsOnCollapse(i, 1 * e),
            this._updateGroupsColState(!0, e),
            this._toggleDisplayHierarchyExpandAllButtons()));
    },
    _isGroupButtonCollapse: function (e) {
      var t = e.parentNode.cellIndex,
        i = this.get_columns()[t]._data.CollapseImageUrl;
      return !!(
        (e.className && -1 !== e.className.indexOf("rgCollapse")) ||
        (e.src && -1 !== e.src.indexOf(i))
      );
    },
    _getGroupExpandButton: function (e) {
      var t = this._findButtonByClickScript(e, "_toggleGroupsExpand");
      return t || -1 == e.className.indexOf("rgGroupHeader")
        ? t
        : $telerik.getElementByClassName(e, "rgCollapse") ||
            $telerik.getElementByClassName(e, "rgExpand");
    },
    _getExpandButton: function (e) {
      return this._findButtonByClickScript(e, "_toggleExpand");
    },
    _findButtonByClickScript: function (e, t) {
      for (var i, r, n = ["img", "input", "button"], l = 0; l < n.length; l++) {
        i = e.getElementsByTagName(n[l]);
        for (var o = 0; o < i.length; o++)
          if (
            null != (r = i[o]).onclick &&
            -1 != r.onclick.toString().indexOf(t)
          )
            return r;
      }
      return null;
    },
    editItem: function (e) {
      var t = (e = this._getRowByIndexOrItemIndexHierarchical(e)).id.split(
        "__",
      )[1];
      if (!this.fireCommand("Edit", t)) return !1;
    },
    updateItem: function (e) {
      var t = (e = this._getRowByIndexOrItemIndexHierarchical(e)).id.split(
        "__",
      )[1];
      if (!this.fireCommand("Update", t)) return !1;
    },
    deleteItem: function (e) {
      var t = (e = this._getRowByIndexOrItemIndexHierarchical(e)).id.split(
        "__",
      )[1];
      if (!this.fireCommand("Delete", t)) return !1;
    },
    rebind: function () {
      if (((this._forceRebind = !0), !this.fireCommand("RebindGrid", "")))
        return !1;
    },
    insertItem: function () {
      if (!this.fireCommand("PerformInsert", "")) return !1;
    },
    showInsertItem: function () {
      if (!this.fireCommand("InitInsert", "")) return !1;
    },
    cancelInsert: function () {
      if (!this.fireCommand("CancelInsert", "")) return !1;
    },
    sort: function (e) {
      var t = new Telerik.Web.UI.GridSortExpression(),
        i = e.split(" ")[0],
        r = Telerik.Web.UI.GridSortOrder.Ascending,
        n = -1,
        l = this._sortExpressions.find(i);
      if (
        (null != l && (n = l.get_sortOrder()),
        (r =
          -1 != e.toUpperCase().indexOf(" ASC")
            ? Telerik.Web.UI.GridSortOrder.Ascending
            : -1 != e.toUpperCase().indexOf(" DESC")
              ? Telerik.Web.UI.GridSortOrder.Descending
              : null != l
                ? n == Telerik.Web.UI.GridSortOrder.None
                  ? Telerik.Web.UI.GridSortOrder.Ascending
                  : n == Telerik.Web.UI.GridSortOrder.Ascending
                    ? Telerik.Web.UI.GridSortOrder.Descending
                    : this.get_allowNaturalSort()
                      ? Telerik.Web.UI.GridSortOrder.None
                      : Telerik.Web.UI.GridSortOrder.Ascending
                : Telerik.Web.UI.GridSortOrder.Ascending),
        null != l && this._sortExpressions.remove(l),
        !this.get_allowMultiColumnSorting())
      ) {
        for (var o = 0; o < this._sortExpressions._array.length; o++)
          this._showSortIconForField(
            this._sortExpressions._array[o].get_fieldName(),
            Telerik.Web.UI.GridSortOrder.None,
          ),
            this._styleSortedColumnElements(
              this._sortExpressions._array[o].get_fieldName(),
              Telerik.Web.UI.GridSortOrder.None,
            );
        this._sortExpressions.clear();
      }
      if (
        (r != n && this._showSortIconForField(i, r),
        r != Telerik.Web.UI.GridSortOrder.None &&
          (t.set_fieldName(i),
          t.set_sortOrder(r),
          this._sortExpressions.add(t)),
        !this.fireCommand("Sort", e))
      )
        return this._styleSortedColumnElements(i, r), !1;
    },
    _styleSortedColumnElements: function (e, t) {
      for (
        var i,
          r = this.get_columns(),
          n = this.get_dataItems(),
          l =
            t != Telerik.Web.UI.GridSortOrder.None
              ? Sys.UI.DomElement.addCssClass
              : Sys.UI.DomElement.removeCssClass,
          o = this.get_owner().SortingSettings.EnableSkinSortStyles,
          a = 0;
        a < r.length;
        a++
      )
        if (r[a]._data.SortExpression == e) {
          o && l(r[a].get_element(), "rgSorted");
          for (var s = 0; s < n.length; s++)
            (i = n[s].get_cell(r[a].get_uniqueName())),
              o && l(i, "rgSorted"),
              this.get_owner().SortingSettings.SortedBackColor &&
                (t != Telerik.Web.UI.GridSortOrder.None
                  ? (i.style.backgroundColor =
                      this.get_owner().SortingSettings.SortedBackColor.Name)
                  : (i.style.backgroundColor = ""));
          break;
        }
    },
    _showSortIconForField: function (e, t) {
      if (e && "" != e && void 0 !== t)
        for (
          var i = t == Telerik.Web.UI.GridSortOrder.Ascending ? "" : "none",
            r = t == Telerik.Web.UI.GridSortOrder.Descending ? "" : "none",
            n = t == Telerik.Web.UI.GridSortOrder.None ? "" : "none",
            l = this.get_columns(),
            o = 0;
          o < l.length;
          o++
        )
          if (l[o]._data.SortExpression == e) {
            var a = $telerik.getChildrenByClassName(
              l[o].get_element(),
              "rgSort",
            );
            if (a && a.length > 1) {
              (a[0].style.display = i), (a[1].style.display = r);
              var s = $telerik
                .getChildrenByClassName(l[o].get_element(), "rgNoSort")
                .pop();
              s && (s.style.display = n);
            }
          }
    },
    clearSort: function (e) {
      if (!e) {
        for (var t = this.get_sortExpressions(), i = 0; i < t.get_count(); i++)
          this._showSortIconForField(
            t.getItem(i).get_fieldName(),
            Telerik.Web.UI.GridSortOrder.None,
          );
        return (
          this.get_sortExpressions().clear(), this.fireCommand("ClearSort", "")
        );
      }
      var r = this.get_sortExpressions().find(e);
      return (
        r &&
          (this._showSortIconForField(e, Telerik.Web.UI.GridSortOrder.None),
          this.get_sortExpressions().remove(r)),
        this.fireCommand("ClearSort", e)
      );
    },
    get_sortExpressions: function () {
      return this._sortExpressions;
    },
    filter: function (e, t, i, r, n) {
      var l = new Telerik.Web.UI.GridFilterExpression(),
        o = "rgFiltered",
        a = $telerik.getElementByClassName(
          this._getFilterCellByColumnUniqueName(e),
          "rgFilter",
        ),
        s = this.getColumnByUniqueName(e);
      if (s) {
        this._owner._resetCheckListFilterOfColumn(s);
        var d = !1;
        void 0 === i
          ? ((i = s.get_filterFunction()), (d = !0))
          : "string" == typeof i && s.set_filterFunction(i),
          (("number" == typeof i &&
            Telerik.Web.UI.GridFilterFunction.NoFilter == i) ||
            ("string" == typeof i &&
              Telerik.Web.UI.GridFilterFunction.parse(i) ==
                Telerik.Web.UI.GridFilterFunction.NoFilter)) &&
            (null != s.get_filterDelay() || (null != t && "" !== t && d)) &&
            (d &&
              (i =
                s._data.Acff && "NoFilter" != s._data.Acff
                  ? s._data.Acff
                  : "System.String" == s.get_dataType()
                    ? "Contains"
                    : "EqualTo"),
            s._data.EnableRangeFiltering && (i = "Between")),
          a &&
            ("NoFilter" === i ||
            ("" === t &&
              "IsEmpty" !== i &&
              "IsNull" !== i &&
              "NotIsNull" !== i &&
              "NotIsEmpty" !== i)
              ? Sys.UI.DomElement.removeCssClass(a, o)
              : a.className.indexOf(o) < 0 &&
                Sys.UI.DomElement.addCssClass(a, o));
        var h = "";
        switch (s._data.ColumnType) {
          case "GridHyperLinkColumn":
            h = s._data.DataTextField;
            break;
          case "GridImageColumn":
          case "GridBinaryImageColumn":
            h = s._data.DataAlternateTextField;
            break;
          case "GridCalculatedColumn":
            h = String.format("{0}Result", s._data.UniqueName);
            break;
          case "GridAttachmentColumn":
            h =
              s._data.DataTextField + "" != ""
                ? s._data.DataTextField
                : s._data.FileNameTextField;
            break;
          default:
            h = s._data.DataField;
        }
        r && this._updateFilterControlValue(t, e, i),
          l.set_fieldName(h),
          l.set_columnUniqueName(e),
          l.set_dataTypeName(s._data.DataTypeName),
          t &&
            t.replace &&
            (t = (t = (t = t.replace(/\\/g, "\\\\")).replace(
              /'/g,
              "\\'",
            )).replace(/;/g, "^#"));
        var u = this._filterExpressions.find(l.get_columnUniqueName());
        if (
          (null == u || n
            ? (l.set_filterFunction(i),
              l.set_fieldValue(t),
              this._filterExpressions.add(l))
            : (Telerik.Web.UI.GridFilterFunction.parse(i) ==
                Telerik.Web.UI.GridFilterFunction.NoFilter &&
                this._filterExpressions.remove(u),
              u.set_filterFunction(i),
              u.set_fieldValue(t)),
          this.set_currentPageIndex(0, !0),
          !n)
        )
          if (!this.fireCommand("Filter", e + "|?" + t + "|?" + i))
            return (
              "NoFilter" == i &&
                "GridDateTimeColumn" == s._data.ColumnType &&
                this._updateFilterControlValue(t, e, i),
              !1
            );
      }
    },
    _updateFilterControlValue: function (e, t, i) {
      var r = Array.contains(
          ["NoFilter", "IsNull", "NotIsNull", "IsEmpty", "NotIsEmpty"],
          i,
        ),
        n = this._getFilterCellByColumnUniqueName(t),
        l = n.getElementsByTagName("input")[0];
      if (l) {
        var o = this.getColumnByUniqueName(t);
        if (
          ("object" == typeof e && null === e && (e = ""),
          o && "GridDateTimeColumn" == o._data.ColumnType)
        ) {
          var a = $find(l.id);
          if (
            !a ||
            ("Telerik.Web.UI.RadDateTimePicker" !=
              Object.getType(a).getName() &&
              "Telerik.Web.UI.RadDatePicker" != Object.getType(a).getName())
          )
            a ||
              ((a = $find(l.id.replace("_text", ""))) &&
                "Telerik.Web.UI.RadDateInput" == Object.getType(a).getName() &&
                (r
                  ? a.clear()
                  : "string" == typeof e
                    ? a.set_selectedDate(new Date(e))
                    : a.set_selectedDate(e)));
          else {
            if (o._data.EnableRangeFiltering) {
              var s = $telerik.findControl(n, String.format("RDIPF2{0}", t));
              s && s.get_dateInput().clear();
            }
            r
              ? a.get_dateInput().clear()
              : "string" == typeof e
                ? a.set_selectedDate(new Date(e))
                : a.set_selectedDate(e);
          }
        } else if (o && "GridNumericColumn" == o._data.ColumnType) {
          var d = $find(l.id.replace("_text", ""));
          d &&
            "Telerik.Web.UI.RadNumericTextBox" == Object.getType(d).getName() &&
            (r ? d.clear() : d.set_value(e));
        } else
          l.type && "checkbox" == l.type
            ? (l.checked = !r && !!e)
            : l.type && "text" == l.type && (l.value = r ? "" : e);
      }
    },
    _getFilterControlValue: function (e) {
      var t = this._getFilterControlValueByIndex(e, 0);
      if (this.getColumnByUniqueName(e)._data.EnableRangeFiltering) {
        var i,
          r = this._getFilterCellByColumnUniqueName(e),
          n = $telerik.findControl(r, String.format("RDIPF2{0}", e));
        if (n) {
          if (this._owner._clientDataSourceID)
            return [t, n.get_dateInput().get_selectedDate()];
          i = n.get_dateInput();
        } else i = $telerik.findControl(r, String.format("RDIF2{0}", e));
        var l = i.get_value();
        if (null == t || "" == t || null == l || "" == l) return null;
        (t = t.replace(/\s/g, ",")), (t += " " + (l = l.replace(/\s/g, ",")));
      }
      return t;
    },
    _getFilterControlValueByIndex: function (e, t, i) {
      var r =
        this._getFilterCellByColumnUniqueName(e).getElementsByTagName("input")[
          t
        ];
      if (!r) return null;
      if ("checkbox" == r.type) return r.checked;
      var n = r.id.endsWith("_text")
        ? $find(r.id.substr(0, r.id.length - 5))
        : r.id.endsWith("_ClientState")
          ? $find(r.id.substr(0, r.id.length - 12))
          : r.id.endsWith("_Input")
            ? $find(r.id.substr(0, r.id.length - 6))
            : $find(r.id);
      if (n)
        switch (Object.getType(n).getName()) {
          case "Telerik.Web.UI.RadAutoCompleteBox":
            return n.get_text();
          case "Telerik.Web.UI.RadDatePicker":
          case "Telerik.Web.UI.RadDateTimePicker":
          case "Telerik.Web.UI.RadTimePicker":
            return this._owner._clientDataSourceID
              ? n.get_dateInput().get_selectedDate()
              : n.get_dateInput().get_value();
          default:
            if ("function" == typeof n.get_value) return n.get_value();
        }
      return i && !n ? null : r.value;
    },
    _rangeValidationHandler: function (e, t, i) {
      if (!this._rangeValidationInProcess) {
        this._rangeValidationInProcess = !0;
        var r,
          n,
          l,
          o = this._getFilterCellByColumnUniqueName(i),
          a = $telerik.findControl(o, String.format("RDIPF{0}", i));
        if (
          (a
            ? ((r = a.get_dateInput()),
              (n = (l = $telerik.findControl(
                o,
                String.format("RDIPF2{0}", i),
              )).get_dateInput()))
            : ((r = $telerik.findControl(o, String.format("RDIF{0}", i))),
              (n = $telerik.findControl(o, String.format("RDIF2{0}", i)))),
          Telerik.Web.UI.DatePickerPopupOpeningEventArgs.isInstanceOfType(t))
        )
          this._setControlsRangeValidation(e, a, l);
        else if (
          Telerik.Web.UI.DatePickerPopupClosingEventArgs.isInstanceOfType(t)
        )
          this._clearControlsRangeValidation(a, l);
        else if (
          Telerik.Web.UI.InputValueChangingEventArgs.isInstanceOfType(t)
        ) {
          var s = !0;
          a.get_dateInput && e.get_id() === a.get_dateInput().get_id()
            ? (t.get_newValue() && n.get_selectedDate()) || (s = !1)
            : (a.get_selectedDate() && t.get_newValue()) || (s = !1),
            (this._shouldAutoPostBackOnFilter = s),
            this._setControlsRangeValidation(e, r, n);
        } else
          Telerik.Web.UI.DateInputValueChangedEventArgs.isInstanceOfType(t) &&
            this._clearControlsRangeValidation(r, n);
        this._rangeValidationInProcess = !1;
      }
    },
    _getFilterCellByColumnUniqueName: function (e) {
      var t = this._getTableFilterRow();
      if (!t) return null;
      var i = this._getCellIndexByColumnUniqueNameFromTableRowElement(t, e);
      return null == i ? null : t.cells[i];
    },
    _setControlsRangeValidation: function (e, t, i) {
      if ((this._clearControlsRangeValidation(t, i), e.get_id() === t.get_id()))
        i.get_selectedDate()
          ? e.set_maxDate(i.get_selectedDate())
          : i.set_value && i.set_value(i.get_textBoxValue());
      else if (e.get_id() === i.get_id()) {
        var r = t.get_selectedDate();
        r ? i.set_minDate(r) : t.set_value && t.set_value(t.get_textBoxValue());
      }
    },
    _clearControlsRangeValidation: function (e, t) {
      var i = new Date(1900, 1, 1),
        r = new Date(2099, 12, 31);
      e.set_maxDate(r), t.set_minDate(i);
    },
    clearSelectedColumns: function () {
      for (var e = this.get_columns(), t = 0; t < e.length; t++)
        e[t].get_selected() && e[t].set_selected(!1);
    },
    clearFilter: function (e) {
      var t;
      if (!e) {
        for (var i = 0; i < this._filterExpressions.get_count(); i++) {
          var r = this._filterExpressions.getItem(i);
          this._updateFilterControlValue(
            null,
            r.get_columnUniqueName(),
            Telerik.Web.UI.GridFilterFunction.NoFilter,
          ),
            (t = this.getColumnByUniqueName(r.get_columnUniqueName())) &&
              t.set_filterFunction("NoFilter");
        }
        return (
          this._filterExpressions.clear(), this.fireCommand("ClearFilter", "")
        );
      }
      if (!(t = this.getColumnByUniqueName(e))) return !1;
      var n = this._filterExpressions.find(e);
      return (
        n ||
          ((n = new Telerik.Web.UI.GridFilterExpression()).set_columnUniqueName(
            e,
          ),
          n.set_filterFunction("NoFilter"),
          this._filterExpressions.add(n)),
        this.filter(e, "", "NoFilter", !0)
      );
    },
    get_filterExpressions: function () {
      return this._filterExpressions;
    },
    page: function (e) {
      var t = this.get_currentPageIndex(),
        i = t;
      return (
        "Next" == e
          ? i++
          : "Prev" == e
            ? i--
            : (i =
                "First" == e
                  ? 0
                  : "Last" == e
                    ? this.get_pageCount() - 1
                    : parseInt(e, 10) - 1),
        !(i < 0 || i > this.get_pageCount() - 1) &&
          (this.set_currentPageIndex(i, !0),
          this.fireCommand("Page", e)
            ? void 0
            : (this._preventUpdatePager &&
                (this.set_currentPageIndex(t, !0),
                (this._preventUpdatePager = !1)),
              !1))
      );
    },
    exportToExcel: function () {
      if (!this.fireCommand("ExportToExcel", "")) return !1;
    },
    exportToWord: function () {
      if (!this.fireCommand("ExportToWord", "")) return !1;
    },
    exportToCsv: function () {
      if (!this.fireCommand("ExportToCsv", "")) return !1;
    },
    exportToPdf: function () {
      if (!this.fireCommand("ExportToPdf", "")) return !1;
    },
    editSelectedItems: function () {
      if (!this.fireCommand("EditSelected", "")) return !1;
    },
    updateEditedItems: function () {
      if (!this.fireCommand("UpdateEdited", "")) return !1;
    },
    deleteSelectedItems: function () {
      if (!this.fireCommand("DeleteSelected", "")) return !1;
    },
    editAllItems: function () {
      if (!this.fireCommand("EditAll", "")) return !1;
    },
    cancelAll: function () {
      if (!this.fireCommand("CancelAll", "")) return !1;
    },
    cancelUpdate: function (e) {
      var t = (e = this._getRowByIndexOrItemIndexHierarchical(e)).id.split(
        "__",
      )[1];
      if (!this.fireCommand("CancelUpdate", t)) return !1;
    },
    groupColumn: function (e) {
      if (!e || !this.fireCommand("GroupByColumn", e)) return !1;
    },
    ungroupColumn: function (e) {
      if (!e || !this.fireCommand("UnGroupByColumn", e)) return !1;
    },
    _ungroupByExpression: function (e) {
      if (!this.fireCommand("UnGroupByExpression", e)) return !1;
    },
    _deleteRow: function (e, t) {
      var i,
        r = e.parentNode.parentNode,
        n = $find(e.id),
        l = e.rowIndex,
        o = e.cells.length;
      for (
        r.deleteRow(l), i = r.rows[l];
        i &&
        "none" !== i.style.display &&
        i.cells.length !== o &&
        !Sys.UI.DomElement.containsCssClass(i, "rgGroupHeader");

      )
        r.deleteRow(l), l++, (i = r.rows[l]);
      1 === r.tBodies[0].rows.length &&
        "none" == r.tBodies[0].rows[0].style.display &&
        (r.tBodies[0].rows[0].style.display = ""),
        this.deselectItem(e),
        void 0 !== t && Array.add(this._owner._deletedItems, t),
        n && (n.dispose(), Array.remove(this._dataItems, n)),
        this._fixRowsClassNames();
    },
    _clientDelete: function (e) {
      var t = Telerik.Web.UI.Grid.GetCurrentElement(e),
        i = Telerik.Web.UI.Grid.GetFirstParentByTagName(t, "tr"),
        r = i.id.split("__")[1],
        n = new Telerik.Web.UI.GridDataItemCancelEventArgs(i, e);
      if ((this._owner.raise_rowDeleting(n), n.get_cancel())) return !1;
      null != this._owner.get_events().getHandler("command") &&
        this.fireCommand("Delete", r),
        this._deleteRow(i, r),
        this._owner.raise_rowDeleted(
          new Telerik.Web.UI.GridDataItemEventArgs(i, e),
        ),
        this._owner.updateClientState();
    },
    fireCommand: function (e, t) {
      if (!this._raiseCommandEvent(e, t)) return !1;
      e &&
        ["ExportToExcel", "ExportToWord", "ExportToCsv", "ExportToPdf"].indexOf(
          e,
        ) > -1 &&
        (this._owner.__isExporting = !0),
        this._executePostBackEvent(
          "FireCommand:" + this._data.UniqueID + ";" + e + ";" + t,
        ),
        (this._owner.__isExporting = void 0);
    },
    _raiseCommandEvent: function (e, t) {
      var i = new Sys.CancelEventArgs();
      (i.get_commandName = function () {
        return e;
      }),
        (i.get_commandArgument = function () {
          return t;
        });
      var r = this;
      return (
        (i.get_tableView = function () {
          return r;
        }),
        this._owner.raise_command(i),
        !i.get_cancel()
      );
    },
    _executePostBackEvent: function (data) {
      var postBackFunction = this._owner.ClientSettings.PostBackFunction;
      (postBackFunction = postBackFunction.replace(
        "{0}",
        this._owner.UniqueID,
      )),
        (postBackFunction = postBackFunction.replace(
          /\{1\}/,
          data.replace(/\$/g, "$$$$"),
        )),
        eval(postBackFunction);
    },
    _raiseAction: function (e, t) {
      var i,
        r = this,
        n = new Sys.CancelEventArgs();
      if (t)
        for (i in t)
          !(function (e) {
            (n["_" + e] = t[e]),
              (n["get_" + e] = function () {
                return t[e];
              }),
              (n["set_" + e] = function (i) {
                t[e] = i;
              });
          })(i);
      return (
        (n.get_actionName = function () {
          return e;
        }),
        (n.get_tableView = function () {
          return r;
        }),
        r._owner.raise_userAction(n),
        n
      );
    },
  }),
  Telerik.Web.UI.GridTableView.registerClass(
    "Telerik.Web.UI.GridTableView",
    Sys.UI.Control,
  ),
  (Telerik.Web.UI.GridFilterFunction = function () {}),
  (Telerik.Web.UI.GridFilterFunction.prototype = {
    NoFilter: 0,
    Contains: 1,
    DoesNotContain: 2,
    StartsWith: 3,
    EndsWith: 4,
    EqualTo: 5,
    NotEqualTo: 6,
    GreaterThan: 7,
    LessThan: 8,
    GreaterThanOrEqualTo: 9,
    LessThanOrEqualTo: 10,
    Between: 11,
    NotBetween: 12,
    IsEmpty: 13,
    NotIsEmpty: 14,
    IsNull: 15,
    NotIsNull: 16,
    Custom: 17,
  }),
  Telerik.Web.UI.GridFilterFunction.registerEnum(
    "Telerik.Web.UI.GridFilterFunction",
    !1,
  ),
  (Telerik.Web.UI.GridFilterFunction._wrapMethod = function (e, t, i) {
    var r = e[t];
    e[t] = function () {
      var t = Array.prototype.slice.call(arguments);
      return i.apply(
        e,
        [
          function () {
            return r.apply(e, t);
          },
        ].concat(t),
      );
    };
  }),
  (Telerik.Web.UI.GridFilterFunction._enumParseMethod = function (e, t, i) {
    if ("number" == typeof t) return t;
    try {
      return e(t, !!i);
    } catch (e) {
      return null;
    }
  }),
  Telerik.Web.UI.GridFilterFunction._wrapMethod(
    Telerik.Web.UI.GridFilterFunction,
    "parse",
    Telerik.Web.UI.GridFilterFunction._enumParseMethod,
  ),
  (Telerik.Web.UI.GridSortOrder = function () {}),
  (Telerik.Web.UI.GridSortOrder.prototype = {
    None: 0,
    Ascending: 1,
    Descending: 2,
  }),
  Telerik.Web.UI.GridSortOrder.registerEnum("Telerik.Web.UI.GridSortOrder", !1),
  (Telerik.Web.UI.GridSortExpression = function () {
    (this._fieldName = ""), (this._sortOrder = null);
  }),
  (Telerik.Web.UI.GridSortExpression.prototype = {
    get_fieldName: function () {
      return this._fieldName;
    },
    set_fieldName: function (e) {
      this._fieldName != e && ((this._fieldName = e), (this.FieldName = e));
    },
    get_sortOrder: function () {
      return this._sortOrder;
    },
    set_sortOrder: function (e) {
      this._sortOrder != e && ((this._sortOrder = e), (this.SortOrder = e));
    },
    dispose: function () {
      (this._fieldName = null), (this._sortOrder = null);
    },
  }),
  Telerik.Web.UI.GridSortExpression.registerClass(
    "Telerik.Web.UI.GridSortExpression",
    null,
    Sys.IDisposable,
  ),
  (Telerik.Web.UI.GridFilterFunctionsOqlFormat = function () {
    var e = {};
    return (
      (e[Telerik.Web.UI.GridFilterFunction.Contains] = "{0} LIKE '*{1}*'"),
      (e[Telerik.Web.UI.GridFilterFunction.DoesNotContain] =
        "NOT ({0} LIKE '*{1}*'"),
      (e[Telerik.Web.UI.GridFilterFunction.StartsWith] = "{0} LIKE '{1}*'"),
      (e[Telerik.Web.UI.GridFilterFunction.EndsWith] = "{0} LIKE '*{1}"),
      (e[Telerik.Web.UI.GridFilterFunction.EqualTo] = "{0} = {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotEqualTo] = "{0} <> {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThan] = "{0} > {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThan] = "{0} < {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThanOrEqualTo] =
        "{0} >= {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThanOrEqualTo] = "{0} <= {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.Between] =
        "({0} >= {1}) AND ({0} <= {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.NotBetween] =
        "({0} < {1}) OR ({0} > {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.IsEmpty] = "{0} = ''"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsEmpty] = "{0} <> ''"),
      (e[Telerik.Web.UI.GridFilterFunction.IsNull] = "{0} == nil"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsNull] = "({0} != nil)"),
      e
    );
  }),
  (Telerik.Web.UI.GridFilterFunctionsSqlFormat = function () {
    var e = {};
    return (
      (e[Telerik.Web.UI.GridFilterFunction.Contains] = "[{0}] LIKE '%{1}%'"),
      (e[Telerik.Web.UI.GridFilterFunction.DoesNotContain] =
        "[{0}] NOT LIKE '%{1}%'"),
      (e[Telerik.Web.UI.GridFilterFunction.StartsWith] = "[{0}] LIKE '{1}%'"),
      (e[Telerik.Web.UI.GridFilterFunction.EndsWith] = "[{0}] LIKE '%{1}'"),
      (e[Telerik.Web.UI.GridFilterFunction.EqualTo] = "[{0}] = {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotEqualTo] = "[{0}] <> {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThan] = "[{0}] > {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThan] = "[{0}] < {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThanOrEqualTo] =
        "[{0}] >= {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThanOrEqualTo] = "[{0}] <= {1}"),
      (e[Telerik.Web.UI.GridFilterFunction.Between] =
        "([{0}] >= {1}) AND ([{0}] <= {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.NotBetween] =
        "([{0}] < {1}) OR ([{0}] > {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.IsEmpty] = "[{0}] = ''"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsEmpty] = "[{0}] <> ''"),
      (e[Telerik.Web.UI.GridFilterFunction.IsNull] = "[{0}] IS NULL"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsNull] = "NOT ([{0}] IS NULL)"),
      e
    );
  }),
  (Telerik.Web.UI.GridFilterFunctionsDynamicLinqFormat = function () {
    var e = {};
    return (
      (e[Telerik.Web.UI.GridFilterFunction.Contains] = "{0}.Contains({1}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.DoesNotContain] =
        "!{0}.Contains({1}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.StartsWith] =
        "{0}.StartsWith({1}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.EndsWith] = "{0}.EndsWith({1}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.EqualTo] = "{0} = {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotEqualTo] = "{0} <> {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThan] = "{0} > {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThan] = "{0} < {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThanOrEqualTo] =
        "{0} >= {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThanOrEqualTo] =
        "{0} <= {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.Between] =
        "({0} >= {1}) AND ({0} <= {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.NotBetween] =
        "({0} < {1}) OR ({0} > {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.IsEmpty] = '{0} = ""{1}{2}'),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsEmpty] = '{0} <> ""{1}{2}'),
      (e[Telerik.Web.UI.GridFilterFunction.IsNull] = "{0} == null{1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsNull] = "({0} != null){1}{2}"),
      e
    );
  }),
  (Telerik.Web.UI.GridFilterFunctionsADONetDataServices = function () {
    var e = {};
    return (
      (e[Telerik.Web.UI.GridFilterFunction.Contains] =
        "substringof({1},{0}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.DoesNotContain] =
        "not substringof({1},{0}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.StartsWith] =
        "startswith({0},{1}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.EndsWith] = "endswith({0},{1}){2}"),
      (e[Telerik.Web.UI.GridFilterFunction.EqualTo] = "{0} eq {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotEqualTo] = "{0} ne {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThan] = "{0} gt {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThan] = "{0} lt {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.GreaterThanOrEqualTo] =
        "{0} ge {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.LessThanOrEqualTo] =
        "{0} le {1}{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.Between] =
        "({0} ge {1} and {0} le {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.NotBetween] =
        "({0} le {1} or {0} ge {2})"),
      (e[Telerik.Web.UI.GridFilterFunction.IsEmpty] = "{0} eq ''{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsEmpty] = "{0} ne ''{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.IsNull] = "{0} eq null{2}"),
      (e[Telerik.Web.UI.GridFilterFunction.NotIsNull] = "{0} ne null{2}"),
      e
    );
  }),
  (Telerik.Web.UI.GridFilterExpression = function () {
    (this._fieldName = ""),
      (this._fieldValue = null),
      (this._filterFunction = null),
      (this._columnUniqueName = null),
      (this._dataTypeName = null);
  }),
  (Telerik.Web.UI.GridFilterExpression.prototype = {
    get_columnUniqueName: function () {
      return this._columnUniqueName;
    },
    set_columnUniqueName: function (e) {
      this._columnUniqueName != e &&
        ((this._columnUniqueName = e), (this.ColumnUniqueName = e));
    },
    get_fieldName: function () {
      return this._fieldName;
    },
    set_fieldName: function (e) {
      this._fieldName != e && ((this._fieldName = e), (this.FieldName = e));
    },
    get_fieldValue: function () {
      return this._fieldValue;
    },
    set_fieldValue: function (e) {
      this._fieldValue != e && ((this._fieldValue = e), (this.FieldValue = e));
    },
    get_filterFunction: function () {
      return this._filterFunction;
    },
    set_filterFunction: function (e) {
      this._filterFunction != e &&
        ((this._filterFunction = e), (this.FilterFunction = e));
    },
    get_dataTypeName: function () {
      return this._dataTypeName;
    },
    set_dataTypeName: function (e) {
      this._dataTypeName != e &&
        ((this._dataTypeName = e), (this.DataTypeName = e));
    },
    toString: function (e) {
      var t = "";
      void 0 !== e && (t = e);
      var i = this._fieldName;
      "" != t && (i = String.format("{0}.{1}", t, i));
      var r = "";
      if (null != this._filterFunction) {
        var n = Telerik.Web.UI.GridFilterFunctionsSqlFormat(),
          l = Telerik.Web.UI.GridFilterFunction.parse(this._filterFunction),
          o = n[l];
        if (null != o) {
          if (
            this._checkListFilterValues &&
            this._checkListFilterValues.length > 0 &&
            l == Telerik.Web.UI.GridFilterFunction.EqualTo
          ) {
            r = [];
            for (var a = 0; a < this._checkListFilterValues.length; a++) {
              var s = this.getQuotedValue(this._checkListFilterValues[a]);
              r[r.length] = String.format(o, this._fieldName, s, "");
            }
            return "(" + r.join(" OR ") + ")";
          }
          if (
            l != Telerik.Web.UI.GridFilterFunction.Between &&
            l != Telerik.Web.UI.GridFilterFunction.NotBetween
          )
            r =
              (("System.String" == this.get_dataTypeName() ||
                "System.Char" == this.get_dataTypeName()) &&
                l == Telerik.Web.UI.GridFilterFunction.Contains) ||
              l == Telerik.Web.UI.GridFilterFunction.DoesNotContain ||
              l == Telerik.Web.UI.GridFilterFunction.StartsWith ||
              l == Telerik.Web.UI.GridFilterFunction.EndsWith
                ? String.format(o, i, this._fieldValue)
                : String.format(o, i, this.getQuotedValue(this._fieldValue));
          else {
            var d = this._fieldValue.split(" ")[0],
              h =
                this._fieldValue.split(" ").length > 0
                  ? this._fieldValue.split(" ")[1]
                  : "";
            r = String.format(
              o,
              i,
              this.getQuotedValue(d),
              this.getQuotedValue(h),
            );
          }
        }
      }
      return r;
    },
    toOql: function (e) {
      var t = "";
      void 0 !== e && (t = e);
      var i = this._fieldName;
      "" != t && (i = String.format("{0}.{1}", t, i));
      var r = "";
      if (null != this._filterFunction) {
        var n = Telerik.Web.UI.GridFilterFunctionsOqlFormat(),
          l = Telerik.Web.UI.GridFilterFunction.parse(this._filterFunction),
          o = n[l];
        if (null != o) {
          if (
            this._checkListFilterValues &&
            this._checkListFilterValues.length > 0 &&
            l == Telerik.Web.UI.GridFilterFunction.EqualTo
          ) {
            r = [];
            for (var a = 0; a < this._checkListFilterValues.length; a++)
              r[r.length] = String.format(
                o,
                i,
                this.getQuotedValue(this._fieldValue),
              );
            return "(" + r.join(" OR ") + ")";
          }
          if (
            l != Telerik.Web.UI.GridFilterFunction.Between &&
            l != Telerik.Web.UI.GridFilterFunction.NotBetween
          )
            r =
              (("System.String" == this.get_dataTypeName() ||
                "System.Char" == this.get_dataTypeName()) &&
                l == Telerik.Web.UI.GridFilterFunction.Contains) ||
              l == Telerik.Web.UI.GridFilterFunction.DoesNotContain ||
              l == Telerik.Web.UI.GridFilterFunction.StartsWith ||
              l == Telerik.Web.UI.GridFilterFunction.EndsWith
                ? String.format(o, i, this._fieldValue)
                : String.format(o, i, this.getQuotedValue(this._fieldValue));
          else {
            var s = this._fieldValue.split(" ")[0],
              d =
                this._fieldValue.split(" ").length > 0
                  ? this._fieldValue.split(" ")[1]
                  : "";
            r = String.format(
              o,
              i,
              this.getQuotedValue(s),
              this.getQuotedValue(d),
            );
          }
        }
      }
      return r;
    },
    getQuotedValue: function (e) {
      return "System.String" == this.get_dataTypeName() ||
        "System.Char" == this.get_dataTypeName() ||
        "System.DateTime" == this.get_dataTypeName() ||
        "System.TimeSpan" == this.get_dataTypeName() ||
        "System.Guid" == this.get_dataTypeName()
        ? String.format("'{0}'", e)
        : e;
    },
    getDataServiceValue: function (e) {
      if (
        "System.String" == this.get_dataTypeName() ||
        "System.Char" == this.get_dataTypeName()
      )
        return String.format("'{0}'", e);
      if ("System.DateTime" == this.get_dataTypeName()) {
        var t,
          i = "yyyy-MM-ddThh:mm:ss",
          r = Date.parseLocale(e);
        return (
          r && (t = r.format(i)),
          (!r || t.indexOf("NaN") >= 0) && (t = new Date(e).format(i)),
          String.format("datetime'{0}'", t)
        );
      }
      return "System.TimeSpan" == this.get_dataTypeName()
        ? String.format("time'{0}'", e)
        : "System.Guid" == this.get_dataTypeName()
          ? String.format("guid'{0}'", e)
          : e;
    },
    getDynamicLinqValue: function (e) {
      return "System.String" == this.get_dataTypeName()
        ? String.format('"{0}"', e)
        : -1 != this.get_dataTypeName().indexOf("DateTime")
          ? String.format('DateTime.Parse("{0}")', e)
          : -1 != this.get_dataTypeName().indexOf("TimeSpan")
            ? String.format('TimeSpan.Parse("{0}")', e)
            : -1 != this.get_dataTypeName().indexOf("Guid")
              ? String.format('Guid("{0}")', e)
              : e;
    },
    toDynamicLinq: function (e) {
      var t = "";
      void 0 !== e && (t = e);
      var i = "";
      if (null != this._filterFunction) {
        var r,
          n = Telerik.Web.UI.GridFilterFunctionsDynamicLinqFormat(),
          l = Telerik.Web.UI.GridFilterFunction.parse(this._filterFunction),
          o = n[l];
        if (null != o) {
          if (
            this._checkListFilterValues &&
            this._checkListFilterValues.length > 0 &&
            l == Telerik.Web.UI.GridFilterFunction.EqualTo
          ) {
            i = [];
            for (var a = 0; a < this._checkListFilterValues.length; a++)
              (r = this.getDynamicLinqValue(this._checkListFilterValues[a])),
                (i[i.length] = String.format(o, this._fieldName, r, ""));
            return "(" + i.join(" OR ") + ")";
          }
          r = "";
          var s = "";
          l == Telerik.Web.UI.GridFilterFunction.IsNull ||
          l == Telerik.Web.UI.GridFilterFunction.NotIsNull
            ? (r = "")
            : l == Telerik.Web.UI.GridFilterFunction.Between ||
                l == Telerik.Web.UI.GridFilterFunction.NotBetween
              ? ((s = this.getDynamicLinqValue(this._fieldValue.split(" ")[1])),
                (r = this.getDynamicLinqValue(this._fieldValue.split(" ")[0])))
              : (r = this.getDynamicLinqValue(this._fieldValue));
          var d = this._fieldName;
          "" != t && (d = String.format("{0}.{1}", t, d)),
            (i = String.format(o, d, r, s));
        }
      }
      return i;
    },
    toDataService: function () {
      var e = "";
      if (null != this._filterFunction) {
        var t = Telerik.Web.UI.GridFilterFunctionsADONetDataServices(),
          i = Telerik.Web.UI.GridFilterFunction.parse(this._filterFunction),
          r = t[i];
        if (null != r) {
          if (
            this._checkListFilterValues &&
            this._checkListFilterValues.length > 0 &&
            i == Telerik.Web.UI.GridFilterFunction.EqualTo
          ) {
            e = [];
            for (var n = 0; n < this._checkListFilterValues.length; n++)
              e[e.length] = String.format(
                r,
                this._fieldName,
                this.getDataServiceValue(this._checkListFilterValues[n]),
              );
            return "(" + e.join(" or ") + ")";
          }
          var l = "",
            o = "";
          i == Telerik.Web.UI.GridFilterFunction.IsNull ||
          i == Telerik.Web.UI.GridFilterFunction.NotIsNull
            ? (l = "")
            : i == Telerik.Web.UI.GridFilterFunction.Between ||
                i == Telerik.Web.UI.GridFilterFunction.NotBetween
              ? ((o = this._fieldValue.split(" ")[1]),
                (l = this._fieldValue.split(" ")[0]))
              : (l = this._fieldValue),
            (e = String.format(
              r,
              this._fieldName,
              this.getDataServiceValue(l),
              "" != o ? this.getDataServiceValue(o) : o,
            ));
        }
      }
      return e;
    },
    dispose: function () {
      (this._fieldName = null),
        (this._fieldValue = null),
        (this._filterFunction = null),
        (this._columnUniqueName = null),
        (this._dataTypeName = null);
    },
  }),
  Telerik.Web.UI.GridFilterExpression.registerClass(
    "Telerik.Web.UI.GridFilterExpression",
    null,
    Sys.IDisposable,
  ),
  (Telerik.Web.UI.Collection = function () {
    this._array = [];
  }),
  (Telerik.Web.UI.Collection.prototype = {
    add: function (e) {
      var t = this._array.length;
      this.insert(t, e);
    },
    insert: function (e, t) {
      Array.insert(this._array, e, t);
    },
    remove: function (e) {
      Array.remove(this._array, e);
    },
    removeAt: function (e) {
      var t = this.getItem(e);
      t && this.remove(t);
    },
    clear: function () {
      this._array = [];
    },
    toList: function () {
      return this._array;
    },
    get_count: function () {
      return this._array.length;
    },
    getItem: function (e) {
      return this._array[e];
    },
    indexOf: function (e) {
      return Array.indexOf(this._array, e);
    },
    forEach: function (e) {
      for (var t = 0, i = this.get_count(); t < i; t++) e(this._array[t]);
    },
    dispose: function () {
      this._array = null;
    },
  }),
  Telerik.Web.UI.Collection.registerClass(
    "Telerik.Web.UI.Collection",
    null,
    Sys.IDisposable,
  ),
  (Telerik.Web.UI.GridSortExpressions = function () {
    Telerik.Web.UI.GridSortExpressions.initializeBase(this);
  }),
  (Telerik.Web.UI.GridSortExpressions.prototype = {
    find: function (e) {
      for (var t = 0, i = this.get_count(); t < i; t++) {
        var r = this.getItem(t);
        if (r.get_fieldName() == e) return r;
      }
      return null;
    },
    sortOrderAsString: function (e) {
      return 0 == e ? "" : 1 == e ? "ASC" : 2 == e ? "DESC" : void 0;
    },
    toString: function () {
      for (var e = [], t = 0, i = this.get_count(); t < i; t++) {
        var r = this.getItem(t);
        e[e.length] = String.format(
          "{0} {1}",
          r.get_fieldName(),
          this.sortOrderAsString(r.get_sortOrder()),
        );
      }
      return e.join(",");
    },
    toClientDataSourceList: function () {
      var e = [];
      return (
        Array.forEach(this._array, function (t, i) {
          e[i] = { fieldName: t.FieldName, sortOrder: t.SortOrder };
        }),
        e
      );
    },
  }),
  Telerik.Web.UI.GridSortExpressions.registerClass(
    "Telerik.Web.UI.GridSortExpressions",
    Telerik.Web.UI.Collection,
  ),
  (Telerik.Web.UI.GridFilterExpressions = function () {
    Telerik.Web.UI.GridFilterExpressions.initializeBase(this);
  }),
  (Telerik.Web.UI.GridFilterExpressions.prototype = {
    find: function (e) {
      for (var t = 0, i = this.get_count(); t < i; t++) {
        var r = this.getItem(t);
        if (r.get_columnUniqueName() == e) return r;
      }
      return null;
    },
    toString: function (e) {
      var t = "";
      void 0 !== e && (t = e);
      for (var i = [], r = 0, n = this.get_count(); r < n; r++) {
        var l = this.getItem(r);
        i[i.length] = l.toString(t);
      }
      return i.join(" AND ");
    },
    toOql: function (e) {
      var t = "";
      void 0 !== e && (t = e);
      for (var i = [], r = 0, n = this.get_count(); r < n; r++) {
        var l = this.getItem(r);
        i[i.length] = l.toOql(t);
      }
      return i.join(" AND ");
    },
    toDynamicLinq: function (e) {
      var t = "";
      void 0 !== e && (t = e);
      for (var i = [], r = 0, n = this.get_count(); r < n; r++) {
        var l = this.getItem(r);
        i[i.length] = l.toDynamicLinq(t);
      }
      return i.join(" AND ");
    },
    toDataService: function () {
      for (var e = [], t = 0, i = this.get_count(); t < i; t++) {
        var r = this.getItem(t);
        e[e.length] = r.toDataService();
      }
      return e.join(" and ");
    },
    toClientDataSourceList: function () {
      var e = [],
        t = [];
      return (
        Array.forEach(this._array, function (i, r) {
          if ("NoFilter" != i.FilterFunction) {
            var n = i._checkListFilterValues;
            if (n && n.length > 0) {
              t = [];
              for (var l = 0; l < n.length; l++)
                t[l] = {
                  field: i.FieldName,
                  operator:
                    Telerik.Web.UI.ClientDataSource.FilterOperator.EqualTo,
                  value: n[l],
                };
              e[r] = {
                logicOperator:
                  Telerik.Web.UI.ClientDataSource.FilterLogicOperator.Or,
                filters: t,
              };
            } else {
              var o =
                11 === i.FilterFunction || "Between" == i.FilterFunction
                  ? 1
                  : 12 === i.FilterFunction || "NotBetween" == i.FilterFunction
                    ? 2
                    : 0;
              if (o) {
                t = [];
                var a = i.FieldValue;
                (t[0] = {
                  field: i.FieldName,
                  operator:
                    1 === o
                      ? Telerik.Web.UI.ClientDataSource.FilterOperator
                          .GreaterThanOrEqualTo
                      : Telerik.Web.UI.ClientDataSource.FilterOperator.LessThan,
                  value: a[0],
                }),
                  (t[1] = {
                    field: i.FieldName,
                    operator:
                      1 === o
                        ? Telerik.Web.UI.ClientDataSource.FilterOperator
                            .LessThan
                        : Telerik.Web.UI.ClientDataSource.FilterOperator
                            .GreaterThanOrEqualTo,
                    value: a[1],
                  }),
                  (e[r] = {
                    logicOperator:
                      1 === o
                        ? Telerik.Web.UI.ClientDataSource.FilterLogicOperator
                            .And
                        : Telerik.Web.UI.ClientDataSource.FilterLogicOperator
                            .Or,
                    filters: t,
                  });
              } else
                e[r] = {
                  field: i.FieldName,
                  operator:
                    Telerik.Web.UI.ClientDataSource.FilterOperator[
                      i.FilterFunction
                    ],
                  value: i.FieldValue,
                };
            }
          }
        }),
        {
          logicOperator:
            Telerik.Web.UI.ClientDataSource.FilterLogicOperator.And,
          filters: e,
        }
      );
    },
  }),
  Telerik.Web.UI.GridFilterExpressions.registerClass(
    "Telerik.Web.UI.GridFilterExpressions",
    Telerik.Web.UI.Collection,
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  (Telerik.Web.UI.GridGroupPanel = function (e) {
    Telerik.Web.UI.GridGroupPanel.initializeBase(this, [e]),
      (this._owner = {}),
      (this._isLightweight = !1),
      (this._lightCellPlaceHolders = {});
  }),
  (Telerik.Web.UI.GridGroupPanel.prototype = {
    initialize: function () {
      Telerik.Web.UI.GridGroupPanel.callBaseMethod(this, "initialize");
      var e = this;
      e.groupPanelItemCounter = 0;
      var t = this._owner;
      (e._isLightweight = t._renderMode == Telerik.Web.UI.RenderMode.Lite),
        e._isLightweight
          ? (e._createLightWeightGroupPanelItems(this.get_element(), 0),
            $telerik
              .$(e.get_element())
              .find(".rgGroupItem")
              .each(function () {
                e._lightCellPlaceHolders[this] = this.parentNode;
              }))
          : e._createGroupPanelItems(this.get_element(), 0),
        e._initializeEvents();
    },
    dispose: function () {
      window.$clearHandlers(this.get_element()),
        (this._element.control = null),
        (this._groupTouchItems = []),
        Telerik.Web.UI.GridGroupPanel.callBaseMethod(this, "dispose");
    },
    _initializeEvents: function () {
      this._owner._clientDataSourceID &&
        window.$addHandler(
          this.get_element(),
          "click",
          Function.createDelegate(this, this._click),
        );
    },
    _click: function (e) {
      var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
      if (
        (this._owner._renderMode == Telerik.Web.UI.RenderMode.Lite &&
          "span" == t.tagName.toLowerCase() &&
          (t = t.parentNode),
        Sys.UI.DomElement.containsCssClass(t, "rgUngroup"))
      )
        this._ungroup(t);
      else if (
        Sys.UI.DomElement.containsCssClass(t, "rgSortAsc") ||
        Sys.UI.DomElement.containsCssClass(t, "rgSortDesc")
      ) {
        var i,
          r = t.parentNode,
          n = t.className;
        (i = this._getFieldNameFromTarget(r)),
          this._owner._renderMode == Telerik.Web.UI.RenderMode.Lite
            ? (t.children.length > 0 &&
                "span" == t.children[0].tagName.toLowerCase() &&
                ((t.children[0].className = "t-font-icon rgIcon "),
                (t.children[0].className +=
                  t.className.indexOf("rgSortAsc") > -1
                    ? "rgSortDescIcon"
                    : "rgSortAscIcon")),
              (t.className = "t-button rgActionButton "))
            : (t.className = ""),
          (t.className +=
            n.indexOf("rgSortAsc") > -1 ? "rgSortDesc" : "rgSortAsc"),
          (t.title =
            n.indexOf("rgSortAsc") > -1 ? "Sorted asc" : "Sorted desc"),
          this._sort(i),
          $telerik.preventDefault(e);
      }
    },
    _getFieldNameFromTarget: function (e) {
      for (
        var t = $telerik.getElementsByClassName(
            this.get_element(),
            "rgGroupItem",
          ),
          i = null,
          r = "",
          n = 0;
        n < t.length;
        n++
      ) {
        t[n] == e && (i = n);
      }
      var l = this._owner.get_masterTableView()._data.GroupByExpressions;
      return null != i && i < l.length && (r = l[i].field), r;
    },
    _sort: function (e) {
      this._owner.get_masterTableView().fireCommand("SortGroup", e);
    },
    _ungroup: function (e) {
      var t;
      if (this._isLightweight) {
        var i = e.parentNode,
          r = i.parentNode || this._lightCellPlaceHolders[i],
          n = this.get_element();
        (t = this._getFieldNameFromTarget(i)),
          this._owner.get_masterTableView().ungroupColumn(t),
          r.children.length > 0 && r.removeChild(i),
          0 == r.children.length &&
            r.parentNode == n &&
            (n.removeChild(r), (n.innerHTML = this._owner._groupPanelText));
      } else {
        var l = e.parentNode,
          o = l.parentNode,
          a = o.parentNode.parentNode.parentNode;
        t = this._getFieldNameFromTarget(l);
        var s = $telerik.previousElement(l),
          d = $telerik.nextElement(l);
        this._owner.get_masterTableView().ungroupColumn(t),
          s ? o.removeChild(s) : d && o.removeChild(d),
          o.removeChild(l),
          o.cells.length <= 1 &&
            (a.removeChild(a.childNodes[0]),
            (a.innerHTML = this._owner._groupPanelText));
      }
    },
    _createLightItems: function (e, t) {
      var i,
        r = this.get_element();
      r.innerHTML.indexOf("div") > -1
        ? (i = r.children[0])
        : ((r.innerHTML = ""), (i = document.createElement("div")));
      var n = Telerik.Web.UI.GridGroupPanelItem.CreateLightItem(
        this._owner,
        e,
        t,
      );
      i.appendChild(n), r.appendChild(i);
    },
    _create: function (e, t) {
      var i,
        r = this.get_element().getElementsByTagName("table"),
        n = r[r.length - 1],
        l = n.tBodies[0].rows[0],
        o = Telerik.Web.UI.GridGroupPanelItem.Create(
          this._owner,
          e,
          1 != r.length,
          t,
        );
      1 == r.length
        ? (((n = document.createElement("table")).cellPadding = 2),
          (n.style.cssText = "border-style:None;width:100%;border-spacing:0;"),
          n.appendChild(document.createElement("tbody")),
          (l.cells[0].innerHTML = ""),
          l.cells[0].appendChild(n),
          (l = n.tBodies[0].appendChild(
            document.createElement("tr"),
          )).appendChild(o),
          ((i = document.createElement("td")).style.width = "100%"),
          l.appendChild(i))
        : l.insertBefore(o, l.cells[l.cells.length - 1]);
    },
    _createLightWeightGroupPanelItems: function (placeHolder) {
      (this._itemsInternal = eval(this._owner._groupPanelItems)),
        (this._items = []);
      var that = this,
        $ = $telerik.$;
      $(placeHolder)
        .children("div")
        .each(function (e, t) {
          $(t)
            .children("span")
            .each(function (e, t) {
              var i, r;
              that._itemsInternal[that.groupPanelItemCounter] &&
                ((i =
                  that._itemsInternal[that.groupPanelItemCounter]
                    .HierarchicalIndex),
                (r =
                  that._itemsInternal[that.groupPanelItemCounter].DataField)),
                i &&
                  ((that._items[that._items.length] = $create(
                    Telerik.Web.UI.GridGroupPanelItem,
                    { _hierarchicalIndex: i, _owner: that, _dataField: r },
                    null,
                    null,
                    t,
                  )),
                  that.groupPanelItemCounter++);
            });
        });
    },
    _createGroupPanelItems: function (table) {
      (this._itemsInternal = eval(this._owner._groupPanelItems)),
        (this._items = []);
      for (var rows = table.tBodies[0].rows, i = 0; i < rows.length; i++)
        for (
          var foundItemsOnThisRow = !1, row = rows[i], j = 0;
          j < row.cells.length;
          j++
        ) {
          var cell = row.cells[j],
            hierarchicalIndex,
            dataField;
          if ("th" == cell.tagName.toLowerCase())
            this._itemsInternal[this.groupPanelItemCounter] &&
              ((hierarchicalIndex =
                this._itemsInternal[this.groupPanelItemCounter]
                  .HierarchicalIndex),
              (dataField =
                this._itemsInternal[this.groupPanelItemCounter].DataField)),
              hierarchicalIndex &&
                ((this._items[this._items.length] = $create(
                  Telerik.Web.UI.GridGroupPanelItem,
                  {
                    _hierarchicalIndex: hierarchicalIndex,
                    _owner: this,
                    _dataField: dataField,
                  },
                  null,
                  null,
                  cell,
                )),
                (foundItemsOnThisRow = !0),
                this.groupPanelItemCounter++);
          cell.firstChild &&
            cell.firstChild.tagName &&
            "table" == cell.firstChild.tagName.toLowerCase() &&
            this._createGroupPanelItems(cell.firstChild);
        }
    },
    _isItem: function (e) {
      for (var t = 0; t < this._items.length; t++)
        if (this._items[t].get_element() == e) return this._items[t];
      return null;
    },
  }),
  Telerik.Web.UI.GridGroupPanel.registerClass(
    "Telerik.Web.UI.GridGroupPanel",
    Sys.UI.Control,
  ),
  (Telerik.Web.UI.GridGroupPanelItem = function (e) {
    Telerik.Web.UI.GridGroupPanelItem.initializeBase(this, [e]),
      (this._hierarchicalIndex = null),
      (this._owner = {}),
      (this._dataField = null);
  }),
  (Telerik.Web.UI.GridGroupPanelItem.Create = function (e, t, i, r) {
    e = $find(e.get_id());
    var n = document.createDocumentFragment(),
      l = document.createElement("th");
    l.setAttribute("scope", "col"),
      (l.title = e._unGroupTooltip || "Drag out of the bar to ungroup"),
      (l.className = "rgGroupItem"),
      (l.style.cssText = "white-space: nowrap; cursor: move;"),
      l.appendChild(document.createTextNode(t + " "));
    var o = document.createElement("input");
    if (
      (o.setAttribute("type", "submit"),
      (o.value = " "),
      (o.title = "Sorted asc"),
      (o.className = "rgSortAsc"),
      l.appendChild(o),
      e._showUnGroupButton)
    ) {
      var a = document.createElement("input");
      a.setAttribute("type", "submit"),
        (a.title = e._unGroupButtonTooltip || "Click here to ungroup"),
        (a.value = " "),
        (a.className = "rgUngroup"),
        l.appendChild(a);
    }
    if (i) {
      var s = document.createElement("td");
      (s.innerHTML = "-"), n.appendChild(s);
    }
    return (
      n.appendChild(l),
      (e._groupPanel._items[e._groupPanel._items.length] = $create(
        Telerik.Web.UI.GridGroupPanelItem,
        {
          _hierarchicalIndex:
            "0:" +
            (e.get_masterTableView()._data.GroupByExpressions.length - 1),
          _owner: e._groupPanel,
          _dataField: r,
        },
        null,
        null,
        l,
      )),
      n
    );
  }),
  (Telerik.Web.UI.GridGroupPanelItem.CreateLightItem = function (e, t, i) {
    e = $find(e.get_id());
    var r = document.createDocumentFragment(),
      n = document.createElement("span");
    (n.title = e._unGroupTooltip || "Drag out of the bar to ungroup"),
      (n.className = "rgGroupItem"),
      (n.style.cssText = "white-space: nowrap; cursor: move;"),
      n.appendChild(document.createTextNode(t + " "));
    var l = document.createElement("button");
    l.setAttribute("type", "submit"),
      (l.className = "t-button rgActionButton rgSortAsc"),
      (l.title = "Sort Ascending");
    var o = document.createElement("span");
    if (
      ((o.className = "t-font-icon rgIcon rgSortAscIcon"),
      l.appendChild(o),
      n.appendChild(l),
      e._showUnGroupButton)
    ) {
      var a = document.createElement("button");
      a.setAttribute("type", "submit"),
        (a.className = "t-button rgActionButton rgUngroup"),
        (a.title = "Ungroup"),
        ((o = document.createElement("span")).className =
          "t-font-icon rgIcon rgUngroupIcon"),
        a.appendChild(o),
        n.appendChild(a);
    }
    return (
      r.appendChild(n),
      (e._groupPanel._items[e._groupPanel._items.length] = $create(
        Telerik.Web.UI.GridGroupPanelItem,
        {
          _hierarchicalIndex:
            "0:" +
            (e.get_masterTableView()._data.GroupByExpressions.length - 1),
          _owner: e._groupPanel,
          _dataField: i,
        },
        null,
        null,
        n,
      )),
      r
    );
  }),
  (Telerik.Web.UI.GridGroupPanelItem.prototype = {
    initialize: function () {
      Telerik.Web.UI.GridGroupPanelItem.callBaseMethod(this, "initialize"),
        (this.get_element().style.cursor = "move"),
        (this._onMouseDownDelegate = $telerik.addMobileHandler(
          this,
          this.get_element(),
          "mousedown",
          this._onMouseDownHandler,
        ));
    },
    dispose: function () {
      window.$clearHandlers(this.get_element()),
        (this._element.control = null),
        Telerik.Web.UI.GridGroupPanelItem.callBaseMethod(this, "dispose");
    },
    _onMouseDownHandler: function (e) {
      var t = $telerik.isTouchDevice ? e : e.rawEvent;
      t.currentTarget === t.target &&
        ((this._onMouseUpDelegate = $telerik.addMobileHandler(
          this,
          document,
          "mouseup",
          this._onMouseUpHandler,
          null,
          !0,
        )),
        (this._onMouseMoveDelegate = $telerik.addMobileHandler(
          this,
          document,
          "mousemove",
          this._onMouseMoveHandler,
          null,
          !0,
        )),
        Telerik.Web.UI.Grid.CreateDragDrop(e, this, !1),
        Telerik.Web.UI.Grid.CreateReorderIndicators(
          this.get_element(),
          this._owner._owner.Skin,
          this._owner._owner.ImagesPath,
          !1,
          this._owner._owner.get_id(),
        ));
    },
    _onMouseUpHandler: function (e) {
      $telerik.removeMobileHandler(
        document,
        "mouseup",
        this._onMouseUpDelegate,
        null,
        !0,
      ),
        $telerik.removeMobileHandler(
          document,
          "mousemove",
          this._onMouseMoveDelegate,
          null,
          !0,
        );
      var t = this._fireDropAction(e),
        i = this._owner._owner;
      i.ClientSettings.Animation &&
      i.ClientSettings.Animation.AllowColumnRevertAnimation &&
      !t
        ? Telerik.Web.UI.Grid.AnimateRevertDragDrop(
            this,
            i.ClientSettings.Animation.ColumnRevertAnimationDuration,
          )
        : Telerik.Web.UI.Grid.DestroyDragDrop();
    },
    _onMouseMoveHandler: function (e) {
      $telerik.isTouchDevice && e.preventDefault(),
        Telerik.Web.UI.Grid.MoveDragDrop(e, this, !1);
    },
    _fireDropAction: function (e) {
      var currentElement;
      if (
        ((currentElement = $telerik.isTouchDevice
          ? $telerik.getTouchTarget(e)
          : Telerik.Web.UI.Grid.GetCurrentElement(e)),
        null != currentElement)
      ) {
        for (
          var grid = this._owner._owner,
            groupItem = null,
            isOverGroupItem = !1,
            tagName = this._owner._isLightweight ? "span" : "th",
            groupItems = $telerik.getElementsByClassName(
              grid.get_element(),
              "rgGroupItem",
              tagName,
            ),
            i = 0;
          i < groupItems.length;
          i++
        )
          if ($telerik.isMouseOverElement(groupItems[i], e)) {
            (isOverGroupItem = !0), (groupItem = groupItems[i]);
            break;
          }
        $telerik.isMouseOverElement(this._owner.get_element(), e) &&
          (isOverGroupItem = !0);
        var postBackFunction =
            this._owner._owner.ClientSettings.PostBackFunction,
          args,
          commandArgument,
          commandName;
        if (
          ((postBackFunction = postBackFunction.replace(
            "{0}",
            this._owner._owner.UniqueID,
          )),
          !isOverGroupItem &&
            !(
              Telerik.Web.UI.Grid.IsChildOf(
                currentElement,
                this._owner.get_element(),
              ) ||
              ($telerik.isTouchDevice &&
                currentElement == this._owner.get_element())
            ))
        )
          return (
            (commandName = "UnGroupByExpression"),
            (commandArgument = this._hierarchicalIndex),
            (args = new Sys.CancelEventArgs()),
            (args.get_commandName = function () {
              return commandName;
            }),
            (args.get_commandArgument = function () {
              return commandArgument;
            }),
            this._owner._owner._clientDataSourceID
              ? args.set_cancel(!0)
              : this._owner._owner.raise_command(args),
            args.get_cancel()
              ? (this._owner._owner._clientDataSourceID &&
                  this._owner._ungroup(this.get_element().childNodes[0]),
                !1)
              : ((postBackFunction = postBackFunction.replace(
                  "{1}",
                  "UnGroupByExpression," + this._hierarchicalIndex,
                )),
                eval(postBackFunction),
                !0)
          );
        var item = this._owner._isItem(currentElement);
        if (
          (null == item &&
            null != groupItem &&
            ((currentElement = groupItem),
            (item = this._owner._isItem(currentElement))),
          currentElement != this.get_element() &&
            null != item &&
            currentElement.parentNode == this.get_element().parentNode)
        )
          return (
            (commandName = "ReorderGroupByExpression"),
            (commandArgument =
              this._hierarchicalIndex + "," + item._hierarchicalIndex),
            (args = new Sys.CancelEventArgs()),
            (args.get_commandName = function () {
              return commandName;
            }),
            (args.get_commandArgument = function () {
              return commandArgument;
            }),
            this._owner._owner.raise_command(args),
            !args.get_cancel() &&
              ((postBackFunction = postBackFunction.replace(
                "{1}",
                "ReorderGroupByExpression," +
                  this._hierarchicalIndex +
                  "," +
                  item._hierarchicalIndex,
              )),
              eval(postBackFunction),
              !0)
          );
      }
      return !1;
    },
  }),
  Telerik.Web.UI.GridGroupPanelItem.registerClass(
    "Telerik.Web.UI.GridGroupPanelItem",
    Sys.UI.Control,
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  ($telerik.findGrid = $find),
  ($telerik.toGrid = function (e) {
    return e;
  }),
  (Telerik.Web.UI.RadGrid = function (e) {
    this._initializeEvents([
      "gridCreating",
      "gridCreated",
      "gridDestroying",
      "masterTableViewCreating",
      "masterTableViewCreated",
      "tableCreating",
      "tableCreated",
      "tableDestroying",
      "cellDeselected",
      "cellDeselecting",
      "cellSelected",
      "cellSelecting",
      "columnCreating",
      "columnCreated",
      "columnDestroying",
      "columnResizing",
      "columnResized",
      "columnSwapping",
      "columnSwapped",
      "columnMovingToLeft",
      "columnMovedToLeft",
      "columnMovingToRight",
      "columnMovedToRight",
      "columnHiding",
      "columnHidden",
      "columnShowing",
      "columnShown",
      "rowCreating",
      "rowCreated",
      "rowDestroying",
      "rowResizing",
      "rowResized",
      "rowHiding",
      "rowHidden",
      "rowShowing",
      "rowShown",
      "rowClick",
      "rowDblClick",
      "columnClick",
      "columnDblClick",
      "rowSelecting",
      "rowSelected",
      "rowDeselecting",
      "rowDeselected",
      "rowMouseOver",
      "rowMouseOut",
      "columnMouseOver",
      "columnMouseOut",
      "columnContextMenu",
      "rowContextMenu",
      "scroll",
      "keyPress",
      "hierarchyExpanding",
      "hierarchyExpanded",
      "hierarchyCollapsing",
      "hierarchyCollapsed",
      "groupExpanding",
      "groupExpanded",
      "groupCollapsing",
      "groupCollapsed",
      "activeRowChanging",
      "activeRowChanged",
      "rowDeleting",
      "rowDeleted",
      "filterMenuShowing",
      "rowDropping",
      "rowDropped",
      "rowDragStarted",
      "rowDragging",
      "popUpShowing",
      "command",
      "userAction",
      "rowDataBound",
      "dataBinding",
      "dataBound",
      "headerMenuShowing",
      "dataBindingFailed",
      "dataSourceResolved",
      "batchEditGetEditorValue",
      "batchEditSetEditorValue",
      "batchEditGetCellValue",
      "batchEditSetCellValue",
      "batchEditCellValueChanging",
      "batchEditCellValueChanged",
      "batchEditOpening",
      "batchEditOpened",
      "batchEditClosing",
      "batchEditClosed",
    ]),
      Telerik.Web.UI.RadGrid.initializeBase(this, [e]),
      (this.Skin = "Default"),
      (this._imagesPath = ""),
      (this._embeddedSkin = !0),
      (this.ClientID = null),
      (this.UniqueID = null),
      (this._clientDataSourceID = null),
      (this._activeRowIndex = ""),
      (this._activeRow = null),
      (this.ShowGroupPanel = !1),
      (this._groupPanel = null),
      (this._groupPanelClientID = ""),
      (this._groupPanelItems = ""),
      (this._groupPanelText = ""),
      (this._showUnGroupButton = !1),
      (this._unGroupTooltip = ""),
      (this._unGroupButtonTooltip = ""),
      (this._freezeText = ""),
      (this._unfreezeText = ""),
      (this._gridTableViewsData = ""),
      (this._popUpIds = ""),
      (this._popUpSettings = {}),
      (this.ClientSettings = {}),
      (this.SortingSettings = {}),
      (this._selection = null),
      (this._cellSelection = null),
      (this._selectedCellsIndexes = []),
      (this._selectedCellsInternal = []),
      (this._selectedIndexes = []),
      (this._selectedItemsInternal = []),
      (this._unselectableItemsInternal = []),
      (this._unselectableItemsIndexes = []),
      (this._masterClientID = ""),
      (this._scrolling = null),
      (this._gridItemResizer = null),
      (this._resizedItems = ""),
      (this._resizedColumns = ""),
      (this._resizedControl = ""),
      (this._hidedItems = ""),
      (this._showedItems = ""),
      (this._hidedColumns = []),
      (this._showedColumns = []),
      (this._reorderedColumns = []),
      (this._groupColsState = {}),
      (this._hierarchyColsExpandedState = {}),
      (this._filterMenuData = {}),
      (this._filterMenu = null),
      (this._headerContextMenu = null),
      (this._detailTables = []),
      (this._clientKeyValues = {}),
      (this._onKeyDownDelegate = null),
      (this._onMouseMoveDelegate = null),
      (this._hierarchySettings = {}),
      (this._groupingSettings = {}),
      (this._currentPageIndex = null),
      (this._expandItems = {}),
      (this._expandedItems = []),
      (this._expandedGroupItems = []),
      (this._deletedItems = []),
      (this._expandedFilterItems = []),
      (this._initializeRequestHandler = null),
      (this._endRequestHandler = null),
      (this._statusLabelID = null),
      (this._loadingText = null),
      (this._readyText = null),
      (this._onFilterMenuClick = null),
      (this._popUpLocations = {}),
      (this._submitControls = []),
      (this._allowSubmitOnEnter = !1),
      (this._validationGroup = ""),
      (window[this.ClientID] = this),
      (this._canMoveRow = !1),
      (this._originalDragItem = null),
      (this._dropClue = null),
      (this._draggedItems = []),
      (this._draggedItemsIndexes = []),
      (this._draggingPosition = "above"),
      (this._editIndexes = null),
      (this._controlToFocus = null),
      (this._documentKeyDownDelegate = null),
      (this._dataDivMouseDownDelegate = null),
      (this._dataDivMouseUpDelegate = null),
      (this._dataDivMouseMoveDelegate = null),
      (this._swipeStartDelegate = null),
      (this._swipeUpDelegate = null),
      (this._swipeMoveDelegate = null),
      (this._isTouchScrollInProgress = !1),
      (this._documentMouseUpDelegate = null),
      (this._documentMouseMoveDelegate = null),
      (this._onBatchRowDeleteDelegate = null),
      (this._shouldFocusOnPage = null),
      (this._lastSelectedItemIndex = null),
      (this._filterCheckListClientID = null),
      (this._checkListFilterActiveColumn = ""),
      (this._checkListFilterKeys = []),
      (this._checkListFilterValues = []),
      (this._filterApplyButton = null),
      (this._invisibleParentsArray = []),
      (this._modalPopupWrapper = null),
      (this._animation = null),
      (this.ValidationSettings = {}),
      (this._enableAriaSupport = !1),
      (this._positionedDataItems = null),
      (this._positionedDataItemsIndexes = null),
      (this._keyboardNavigationProperties = {
        positionedDataItems: null,
        positionedDataItemsIndexes: null,
        lastClickSelectedItem: null,
        currentSelectedIndex: 0,
        initialRowIndex: 0,
        directionIndex: 0,
        lastSelectedRowIndex: null,
        holdingCtrl: !1,
        firstSelection: !0,
        unselectableItemsCount: 0,
        setInitialState: function () {
          (this.initialRowIndex = this.currentSelectedIndex),
            (this.directionIndex = 0);
        },
      }),
      (this.odataClientSettings = null),
      (this._dataBindingWithSelectMethod = !1),
      (this._isBatchEditingEnabled = !1),
      (this._rowHighlightingForDeletedRows = !1),
      (this._batchEditingOpenForEditEvents = {}),
      (this._defaultDateTimeFormat = null),
      (this._startTouchPoints = {}),
      (this._endTouchPoints = {}),
      (this._currentTouchPoints = {}),
      (this._currentMovement = null),
      (this._validSwipe = !0),
      (this._swipeThreshold = 20);
  }),
  (Telerik.Web.UI.RadGrid.prototype = {
    initialize: function () {
      if (
        (Telerik.Web.UI.RadGrid.callBaseMethod(this, "initialize"),
        this._renderWm(this.get_element()),
        this._masterClientID && $get(this._masterClientID))
      ) {
        if (
          (this.ClientSettings &&
            (this.ClientSettings.PostBackFunction ||
              (this.ClientSettings.PostBackFunction =
                "__doPostBack('{0}','{1}')"),
            this.ClientSettings.AllowExpandCollapse ||
              (this.ClientSettings.AllowExpandCollapse = !0),
            null == this.ClientSettings.AllowGroupExpandCollapse &&
              (this.ClientSettings.AllowGroupExpandCollapse = !0),
            void 0 === this.ClientSettings.EnableAlternatingItems &&
              (this.ClientSettings.EnableAlternatingItems = !0),
            this.ClientSettings.ColumnsReorderMethod ||
              (this.ClientSettings.ColumnsReorderMethod = 0),
            this.ClientSettings.ClientMessages &&
              ((void 0 !==
                this.ClientSettings.ClientMessages.DragToGroupOrReorder &&
                null !=
                  this.ClientSettings.ClientMessages.DragToGroupOrReorder) ||
                (this.ClientSettings.ClientMessages.DragToGroupOrReorder =
                  "Drag to group or reorder"),
              (void 0 !== this.ClientSettings.ClientMessages.DragToResize &&
                null != this.ClientSettings.ClientMessages.DragToResize) ||
                (this.ClientSettings.ClientMessages.DragToResize =
                  "Drag to resize"),
              (void 0 !==
                this.ClientSettings.ClientMessages.DropHereToReorder &&
                null != this.ClientSettings.ClientMessages.DropHereToReorder) ||
                (this.ClientSettings.ClientMessages.DropHereToReorder =
                  "Drop here to reorder"),
              (void 0 !==
                this.ClientSettings.ClientMessages.PagerTooltipFormatString &&
                null !=
                  this.ClientSettings.ClientMessages
                    .PagerTooltipFormatString) ||
                (this.ClientSettings.ClientMessages.PagerTooltipFormatString =
                  "Page <strong>{0}</strong> of <strong>{1}</strong>"),
              (void 0 !==
                this.ClientSettings.ClientMessages
                  .ColumnResizeTooltipFormatString &&
                null !=
                  this.ClientSettings.ClientMessages
                    .ColumnResizeTooltipFormatString) ||
                (this.ClientSettings.ClientMessages.ColumnResizeTooltipFormatString =
                  "Width: <strong>{0}</strong> <em>pixels</em>")),
            this.ClientSettings.DataBinding &&
              (this.ClientSettings.DataBinding.MaximumRowsParameterName ||
                (this.ClientSettings.DataBinding.MaximumRowsParameterName =
                  "maximumRows"),
              this.ClientSettings.DataBinding.StartRowIndexParameterName ||
                (this.ClientSettings.DataBinding.StartRowIndexParameterName =
                  "startRowIndex"),
              this.ClientSettings.DataBinding.SortParameterName ||
                (this.ClientSettings.DataBinding.SortParameterName =
                  "sortExpression"),
              this.ClientSettings.DataBinding.FilterParameterName ||
                (this.ClientSettings.DataBinding.FilterParameterName =
                  "filterExpression")),
            this.ClientSettings.KeyboardNavigationSettings.AllowSubmitOnEnter &&
              (this._allowSubmitOnEnter =
                this.ClientSettings.KeyboardNavigationSettings.AllowSubmitOnEnter),
            this.ClientSettings.KeyboardNavigationSettings.ValidationGroup &&
              (this._validationGroup =
                this.ClientSettings.KeyboardNavigationSettings.ValidationGroup)),
          this.ClientSettings.Animation &&
            ((this.ClientSettings.Animation.AllowColumnReorderAnimation &&
              1 === this.ClientSettings.ColumnsReorderMethod) ||
              this.ClientSettings.Animation.AllowColumnRevertAnimation) &&
            ((this._animation = {}),
            (this._animation.ColumnAnimation = $create(
              Telerik.Web.UI.GridColumnAnimation,
              {
                reorderDuration:
                  this.ClientSettings.Animation.ColumnReorderAnimationDuration,
                revertDuration:
                  this.ClientSettings.Animation.ColumnRevertAnimationDuration,
              },
              null,
              { owner: this.ClientID },
            ))),
          null != this._editIndexes &&
            (this._editIndexes = eval(this._editIndexes)),
          this.ClientSettings.AllowKeyboardNavigation &&
            ((this._documentKeyDownDelegate = Function.createDelegate(
              this,
              this._documentKeyDown,
            )),
            $telerik.addExternalHandler(
              document,
              "keydown",
              this._documentKeyDownDelegate,
            )),
          (this.ClientSettings.AllowRowsDragDrop ||
            (this.get_events().getHandler("rowDblClick") &&
              $telerik.isTouchDevice)) &&
            (this._onMouseDownDelegate = $telerik.addMobileHandler(
              this,
              this.get_element(),
              "mousedown",
              this._mouseDown,
            )),
          this.ClientSettings.AllowRowsDragDrop &&
            ((this._documentMouseUpDelegate = $telerik.addMobileHandler(
              this,
              document,
              "mouseup",
              this._mouseUp,
              null,
              !0,
            )),
            (this._documentMouseMoveDelegate = $telerik.addMobileHandler(
              this,
              document,
              "mousemove",
              this._mouseMove,
              null,
              !0,
            ))),
          !this.ClientSettings.AllowRowsDragDrop &&
            this.get_events().getHandler("rowDblClick") &&
            $telerik.isTouchDevice &&
            (this._documentMouseUpDelegate = $telerik.addMobileHandler(
              this,
              document,
              "mouseup",
              this._mouseUp,
              null,
              !0,
            )),
          window.$addHandlers(this.get_element(), {
            click: Function.createDelegate(this, this._click),
          }),
          window.$addHandlers(this.get_element(), {
            dblclick: Function.createDelegate(this, this._dblclick),
          }),
          $telerik.isTouchDevice && $telerik.$ && $telerik.$.fn.doubletap)
        ) {
          var $ = $telerik.$,
            dblClickHandler = $.proxy(this._dblclick, this);
          $(this.get_element()).doubletap(dblClickHandler);
        }
        if (
          ($telerik.isOpera
            ? window.$addHandlers(this.get_element(), {
                mousedown: Function.createDelegate(this, this._contextmenu),
              })
            : window.$addHandlers(this.get_element(), {
                contextmenu: Function.createDelegate(this, this._contextmenu),
              }),
          $telerik.isTouchDevice || this._attachMouseHandlers(),
          this._initializeSubmitControls(),
          this.raise_gridCreating(new Sys.EventArgs()),
          (this.Control = this.get_element()),
          (this.get_element().tabIndex = 0),
          this.ShowGroupPanel)
        ) {
          var groupPanelEl = $get(this._groupPanelClientID);
          groupPanelEl &&
            (this._groupPanel = $create(
              Telerik.Web.UI.GridGroupPanel,
              { _owner: this },
              null,
              null,
              $get(this._groupPanelClientID),
            ));
        }
        if (
          ((this._gridDataDiv = $get(this.get_id() + "_GridData")),
          this._fillSelectedCellsIndexes(),
          this._fillUnselectableItemsIndexes(),
          this.ClientSettings &&
            this.ClientSettings.Selecting &&
            this.get_allowCellSelection() &&
            (this._cellSelection = $create(
              Telerik.Web.UI.GridCellSelection,
              {
                _owner: this,
                multiple: this.get_allowMutliCellSelection(),
                columnSelect: this.get_allowColumnSelection(),
                multiColumnSelect: this.get_allowMultiColumnSelection(),
              },
              null,
              { owner: this.ClientID },
            )),
          ((this.ClientSettings &&
            this.ClientSettings.Selecting &&
            this.ClientSettings.Selecting.AllowRowSelect) ||
            this.ClientSettings.EnablePostBackOnRowClick) &&
            (this._selection = $create(
              Telerik.Web.UI.GridSelection,
              { _owner: this },
              null,
              { owner: this.ClientID },
            )),
          (this.GridDataDiv = $get(this.ClientID + "_GridData")),
          (this.GridHeaderDiv = $get(this.ClientID + "_GridHeader")),
          (this.GridFooterDiv = $get(this.ClientID + "_GridFooter")),
          (this.PagerControl = $get(this._masterClientID + "_Pager")),
          (this.TopPagerControl = $get(this._masterClientID + "_TopPager")),
          this._initializeTableViews(),
          this._getFilterMenu(),
          this._filterMenu &&
            ((this._filterApplyButton = $telerik.getElementByClassName(
              this._filterMenu.get_element(),
              "rgFilterApply",
            )),
            this._filterApplyButton &&
              ((this._checkListFilterApplyButtonDelegate =
                $telerik.addMobileHandler(
                  this,
                  this._filterApplyButton,
                  "click",
                  this._checkListFilterApplyButtonHandler,
                )),
              (this._filterCancelButton = $telerik.getElementByClassName(
                this._filterMenu.get_element(),
                "rgFilterCancel",
              )),
              (this._checkListFilterCancelButtonDelegate =
                $telerik.addMobileHandler(
                  this,
                  this._filterCancelButton,
                  "click",
                  this._checkListFilterCancelButtonHandler,
                )))),
          !this._filterApplyButton && this._getHeaderContextMenu())
        ) {
          var filterMenu = $telerik.getElementByClassName(
            this._getHeaderContextMenu().get_element(),
            "rgFilterMenu",
          );
          filterMenu &&
            ((this._filterApplyButton = $telerik.getElementByClassName(
              filterMenu,
              "rgHCMFilter",
            )),
            this._filterApplyButton &&
              ((this._checkListIsInHeaderContextMenu = !0),
              (this._checkListFilterApplyButtonDelegate =
                $telerik.addMobileHandler(
                  this,
                  this._filterApplyButton,
                  "click",
                  this._checkListFilterApplyButtonHandler,
                )),
              (this._filterCancelButton = $telerik.getElementByClassName(
                this._getHeaderContextMenu().get_element(),
                "rgHCMClear",
              )),
              (this._checkListFilterCancelButtonDelegate =
                $telerik.addMobileHandler(
                  this,
                  this._filterCancelButton,
                  "click",
                  this._checkListFilterCancelButtonHandler,
                )),
              (this._filterCheckListSearch = $telerik.findElement(
                this._getHeaderContextMenu().get_element(),
                "filterCheckListSearch",
              ))));
        }
        this._checkListFilterKeys &&
          this._checkListFilterKeys.length > 0 &&
          this.updateClientState();
        var filterCheckList = $find(this._filterCheckListClientID || "");
        if (
          (filterCheckList &&
            ((this._checkListItemsRequestedDelegate = Function.createDelegate(
              this,
              this._checkListItemsRequestedHandler,
            )),
            filterCheckList.add_itemsRequested(
              this._checkListItemsRequestedDelegate,
            )),
          $telerik.isMobileIE10 &&
            (this.get_events().getHandler("rowDblClick") &&
              ((this.get_element().style.msTouchAction = "none"),
              (this.get_element().style.touchAction = "none")),
            this._groupPanel &&
              ((this._groupPanel.get_element().style.msTouchAction = "none"),
              (this._groupPanel.get_element().style.touchAction = "none"))),
          this.ClientSettings.Scrolling.AllowScroll &&
            $telerik.isTouchDevice &&
            ((this._dataDivMouseDownDelegate = $telerik.addMobileHandler(
              this,
              this.GridDataDiv,
              "mousedown",
              this._dataDivMouseDown,
            )),
            (this._dataDivMouseUpDelegate = $telerik.addMobileHandler(
              this,
              this.GridDataDiv,
              "mouseup",
              this._dataDivMouseUp,
            )),
            (this._dataDivMouseMoveDelegate = $telerik.addMobileHandler(
              this,
              this.GridDataDiv,
              "mousemove",
              this._dataDivMouseMove,
            ))),
          this.get_masterTableView().get_allowPaging() &&
            $telerik.isTouchDevice)
        ) {
          var swipeArea = this.ClientSettings.Scrolling.AllowScroll
            ? this.GridDataDiv
            : $telerik.getChildrenByTagName(
                this.get_masterTableView().get_element(),
                "tbody",
              )[0];
          (this._swipeStartDelegate = $telerik.addMobileHandler(
            this,
            swipeArea,
            "mousedown",
            this._swipeStart,
          )),
            (this._swipeEndDelegate = $telerik.addMobileHandler(
              this,
              swipeArea,
              "mouseup",
              this._swipeEnd,
            )),
            (this._swipeMoveDelegate = $telerik.addMobileHandler(
              this,
              swipeArea,
              "mousemove",
              this._swipeMove,
            ));
        }
        var isRtl = Telerik.Web.UI.Grid.IsRightToLeft(
            this.get_masterTableView().get_element(),
          ),
          i;
        if (
          (isRtl &&
            (this.get_element().className = String.format(
              "{0} RadGridRTL RadGridRTL_{1}",
              this.get_element().className,
              this.Skin,
            )),
          this.ClientSettings &&
          this.ClientSettings.Scrolling &&
          (this.ClientSettings.Scrolling.AllowScroll ||
            (this.ClientSettings.Scrolling.AllowScroll &&
              (this.ClientSettings.Scrolling.UseStaticHeaders ||
                this.ClientSettings.Scrolling.EnableVirtualScrollPaging)))
            ? (this._scrolling = $create(
                Telerik.Web.UI.GridScrolling,
                { _owner: this },
                null,
                { owner: this.ClientID },
              ))
            : this.repaint(),
          this._activeRowIndex)
        ) {
          var row =
            this.get_masterTableView()._getRowByIndexOrItemIndexHierarchical(
              this._activeRowIndex,
            );
          if (row) {
            var selectedItemsInternal = this._selectedItemsInternal;
            for (i = 0; i < selectedItemsInternal.length; i++)
              Array.add(
                this._selectedIndexes,
                selectedItemsInternal[i].itemIndex,
              );
            this.set_activeRow(row);
          }
        }
        if (
          (null != this._lastSelectedItemIndex &&
            this._selection &&
            (this._selection._lastSelectedItemIndex =
              this._lastSelectedItemIndex),
          this._isBatchEditingEnabled &&
            ((this._batchEditing = $create(
              Telerik.Web.UI.GridBatchEditing,
              null,
              null,
              { _owner: this.get_id() },
              null,
            )),
            this._scrolling
              ? $telerik
                  .$(this.get_element())
                  .find(".rgDataDiv")
                  .css({ position: "relative" })
              : ((this._onBatchRowDeleteDelegate = Function.createDelegate(
                  this,
                  this._adjustBatchDeletedRows,
                )),
                window.$addHandler(
                  window,
                  "resize",
                  this._onBatchRowDeleteDelegate,
                ),
                $telerik.$(this.get_element()).css({ position: "relative" }))),
          this._attachDomEvents(),
          Sys.WebForms && Sys.WebForms.PageRequestManager)
        ) {
          var requestManager = Sys.WebForms.PageRequestManager.getInstance();
          requestManager &&
            ((this._initializeRequestHandler = Function.createDelegate(
              this,
              this._initializeRequest,
            )),
            requestManager.add_initializeRequest(
              this._initializeRequestHandler,
            ));
        }
        if (
          (this._clientDataSourceID &&
            (this._clientSideBinding = new Telerik.Web.UI.GridClientSideBinding(
              this,
            )),
          this.raise_gridCreated(new Sys.EventArgs()),
          this._shouldFocusOnPage)
        )
          try {
            (this._shouldFocusOnPage = !1), this.get_element().focus();
          } catch (e) {}
        this._initializePopUpEditForm(),
          void 0 === this.ClientSettings.DataBinding.Location ||
            "" == this.ClientSettings.DataBinding.Location ||
            this.get_masterTableView()._virtualization ||
            ((this._onCommandDelegate = Function.createDelegate(
              this,
              this._onCommand,
            )),
            this.add_command(this._onCommandDelegate),
            this._onSuccessDelegate ||
              this._onFailDelegate ||
              ((this._onSuccessDelegate = Function.createDelegate(
                this,
                this._onSuccess,
              )),
              (this._onFailDelegate = Function.createDelegate(
                this,
                this._onFail,
              ))),
            void 0 !== this.ClientSettings.DataBinding.SelectMethod &&
            "" != this.ClientSettings.DataBinding.SelectMethod
              ? ((this._dataBindingWithSelectMethod = !0),
                this._getData(
                  this.ClientSettings.DataBinding.Location,
                  this.ClientSettings.DataBinding.SelectMethod,
                  this._getRequestData(),
                  this._onSuccessDelegate,
                  this._onFailDelegate,
                ))
              : void 0 !== this.ClientSettings.DataBinding.DataService &&
                void 0 !==
                  this.ClientSettings.DataBinding.DataService.TableName &&
                "" != this.ClientSettings.DataBinding.DataService.TableName &&
                this._getDataServiceData(
                  this._onSuccessDelegate,
                  this._onFailDelegate,
                )),
          this.ClientSettings.Virtualization.EnableVirtualization &&
            (Telerik.Web.UI.GridVirtualization._handleRowHeightChangingEvents(
              this,
            ),
            (this._onVirtualizationCommandDelegate = Function.createDelegate(
              this,
              this._onVirtualizationCommand,
            )),
            this.add_command(this._onVirtualizationCommandDelegate),
            this.get_masterTableView()._virtualization &&
              this.get_masterTableView()._virtualization.repaint()),
          this.get_isUsingODataSource() &&
            (this._initializeODataSourceBinder(),
            (this._onCommandODataSourceDelegate = Function.createDelegate(
              this,
              this._onCommandODataSource,
            )),
            this.add_command(this._onCommandODataSourceDelegate));
        var thisControlToFocus = this._controlToFocus;
        this.ClientSettings.AllowKeyboardNavigation &&
          null != thisControlToFocus &&
          "" != thisControlToFocus &&
          setTimeout(function () {
            try {
              var e = !1,
                t = $find(thisControlToFocus);
              null == t ? (t = $get(thisControlToFocus)) : (e = !0),
                null == t &&
                  (t = document.getElementsByName(
                    thisControlToFocus.replace(/_/gi, "$"),
                  )[0]),
                null != t &&
                  (t.focus
                    ? t.focus()
                    : e &&
                      (null != t._focused && (t._focused = !0),
                      t.setFocus && t.setFocus()),
                  t.select && t.select());
            } catch (e) {}
          }, 0),
          this.get_enableAriaSupport() && this._initializeAriaSupport();
      }
    },
    _initializePopUpEditForm: function () {
      var that = this,
        popUpIdsData,
        overFlowOffset = 20,
        left = overFlowOffset,
        top = overFlowOffset,
        popUpId,
        popUp,
        modalDivId,
        modalDiv,
        coordinates,
        dragHandle,
        tables,
        header,
        captionElem,
        captionText,
        headerText;
      if (that._popUpIds && "" != that._popUpIds) {
        popUpIdsData = eval(that._popUpIds);
        for (var i = 0; i < popUpIdsData.length; i++)
          if (((popUpId = popUpIdsData[i]), (popUp = $get(popUpId)), popUp)) {
            var args = new Sys.CancelEventArgs();
            if (
              ((args.get_popUp = function () {
                return popUp;
              }),
              that.raise_popUpShowing(args),
              args.get_cancel())
            )
              continue;
            if (
              that._popUpSettings.Modal &&
              ((modalDivId = String.format("modalDivId_{0}", that.get_id())),
              !$get(modalDivId))
            ) {
              (modalDiv = document.createElement("div")),
                (modalDiv.id = modalDivId),
                (modalDiv.style.width =
                  document.documentElement.scrollWidth + "px"),
                (modalDiv.style.height =
                  document.documentElement.scrollHeight + "px"),
                (modalDiv.className = String.format(
                  "GridModal_{0}",
                  that.Skin,
                )),
                (that._onResizeDelegate = Function.createDelegate(
                  that,
                  that.onWindowResize,
                )),
                -1 != navigator.userAgent.toLowerCase().indexOf("msie")
                  ? setTimeout(function () {
                      window.$addHandler(
                        window,
                        "resize",
                        that._onResizeDelegate,
                      );
                    }, 0)
                  : window.$addHandler(
                      window,
                      "resize",
                      that._onResizeDelegate,
                    ),
                (modalDiv.style.top = modalDiv.style.left = 0),
                (modalDiv.style.position = "absolute"),
                (modalDiv.style.backgroundColor = "threedshadow"),
                (modalDiv.style.zIndex = that._popUpSettings.ZIndex - 10);
              try {
                modalDiv.style.opacity = "0.5";
              } catch (e) {}
              void 0 !== modalDiv.style.filter
                ? (modalDiv.style.filter = "alpha(opacity=50);")
                : void 0 !== modalDiv.style.MozOpacity &&
                  (modalDiv.style.MozOpacity = 0.5),
                document.getElementsByTagName("form")[0].appendChild(modalDiv);
            }
            if (
              ((popUp.style.zIndex = that._popUpSettings.ZIndex),
              (left = top += 20),
              (dragHandle = popUp.getElementsByTagName("div")[0]),
              setTimeout(function () {
                if (that._popUpSettings.KeepInScreenBounds) {
                  (popUp.style.visibility = "hidden"),
                    (popUp.style.display = "");
                  var e = $get(
                    popUp.querySelector("div.rgHeader").id.replace("_PEF", ""),
                  );
                  e
                    ? ((popUp.style.left =
                        Telerik.Web.UI.Grid.FindPosX(e) + "px"),
                      (popUp.style.top =
                        Telerik.Web.UI.Grid.FindPosY(e) +
                        $telerik.$(e).height() +
                        "px"))
                    : ((popUp.style.left =
                        Telerik.Web.UI.Grid.FindPosX(that.get_element()) +
                        left +
                        "px"),
                      (popUp.style.top =
                        Telerik.Web.UI.Grid.FindPosY(that.get_element()) +
                        top +
                        "px")),
                    (coordinates =
                      Telerik.Web.UI.Grid.GetNonOverflowingCoordinates(
                        popUp,
                        that._popUpSettings.OverflowPosition,
                        $telerik.$,
                      )),
                    (popUp.style.left = coordinates.x + "px"),
                    (popUp.style.top = coordinates.y + "px"),
                    (popUp.style.visibility = "visible");
                } else
                  "" == popUp.style.left &&
                    (popUp.style.left =
                      Telerik.Web.UI.Grid.FindPosX(that.get_element()) +
                      left +
                      "px"),
                    "" == popUp.style.top &&
                      (popUp.style.top =
                        Telerik.Web.UI.Grid.FindPosY(that.get_element()) +
                        top +
                        "px"),
                    (popUp.style.display = "");
                if (that._enableRippleEffect) {
                  var t = $telerik.findElement(popUp, "UpdateButton"),
                    i = $telerik.findElement(popUp, "CancelButton");
                  t &&
                    Telerik.Web.UI.MaterialRippleManager.getInstance().initializeRipple(
                      t,
                      {
                        rippleType: Telerik.Web.UI.MaterialRippleType.Icon,
                        maxRippleSize: 50,
                      },
                    ),
                    i &&
                      Telerik.Web.UI.MaterialRippleManager.getInstance().initializeRipple(
                        i,
                        {
                          rippleType: Telerik.Web.UI.MaterialRippleType.Icon,
                          maxRippleSize: 50,
                        },
                      );
                }
                (that._popUpLocations[dragHandle.id] =
                  parseInt(popUp.style.left, 10) +
                  "px," +
                  parseInt(popUp.style.top, 10) +
                  "px"),
                  that.updateClientState();
              }, 100),
              (popUp.tabIndex = 0),
              that.resizeModalBackground(),
              0 != popUp.offsetHeight &&
                (popUp.getElementsByTagName("div")[4].style.height =
                  popUp.offsetHeight - dragHandle.offsetHeight + "px"),
              that.get_enableAriaSupport())
            ) {
              (tables = popUp.querySelectorAll(
                ".rgEditForm.rgEditPopup table",
              )),
                (header = popUp.querySelector(
                  "div.rgHeader .rgPopupHeaderAria",
                )),
                (captionElem = popUp.querySelector("caption")),
                (captionText = captionElem
                  ? (captionElem.textContent || captionElem.innerText).replace(
                      /^\s+|\s+$/g,
                      "",
                    )
                  : ""),
                (headerText = header
                  ? (header.textContent || header.innerText).replace(
                      /^\s+|\s+$/g,
                      "",
                    )
                  : ""),
                popUp.setAttribute("role", "dialog"),
                popUp.setAttribute("aria-label", captionText),
                header &&
                  (header.setAttribute("aria-live", "polite"),
                  header.setAttribute("aria-atomic", "true"),
                  header.setAttribute("aria-relevant", "text"),
                  setTimeout(function () {
                    header.setAttribute("aria-label", headerText),
                      (header.innerHTML = headerText);
                  }, 1e3)),
                captionElem &&
                  captionElem.setAttribute("aria-label", captionText),
                that._popUpSettings.Modal &&
                  that.get_element().setAttribute("aria-hidden", "true");
              for (var tblIndex = 0; tblIndex < tables.length; tblIndex++)
                tables[tblIndex].setAttribute("role", "presentation");
            }
            window.$addHandlers(dragHandle, {
              mousedown: Function.createDelegate(popUp, that._popUpMouseDown),
            }),
              window.$addHandlers(document, {
                mouseup: Function.createDelegate(popUp, that._popUpMouseUp),
              }),
              window.$addHandlers(document, {
                mouseout: Function.createDelegate(popUp, that._popUpMouseOut),
              }),
              that.ClientSettings.AllowKeyboardNavigation &&
                that.ClientSettings.KeyboardNavigationSettings
                  .EnableKeyboardShortcuts &&
                window.$addHandler(
                  popUp,
                  "keypress",
                  Function.createDelegate(
                    {
                      popUpForm: popUp,
                      keyMappings:
                        that.ClientSettings.KeyboardNavigationSettings,
                    },
                    that._popUpKeyDown,
                  ),
                ),
              $telerik.addExternalHandler(
                document,
                "mousemove",
                Function.createDelegate(popUp, that._popUpMouseMove),
              ),
              that.get_enableAriaSupport() &&
                (that._restrictTabNavigation(popUp), that._stopDefaultSubmit()),
              $telerik.repaintChildren(that);
          }
      }
    },
    get_rippleZonesConfiguration: function () {
      var e =
          ".rgGroupCol:not('.rgHeader') .t-button, .rgFilterRow .t-button, .rgRow .t-button, .rgAltRow .t-button, .rgEditRow .t-button, .rgPager .rgPageLast, .rgPager .rgPageFirst, .rgPager .rgPagePrev, .rgPager .rgPageNext, .rgEditForm .t-button, .rgDragIcon",
        t = $telerik.$(e)[0],
        i = 60;
      return (
        t && (i = t.offsetWidth / 0.6),
        [
          {
            element: this.get_element(),
            rippleConfigurations: [
              {
                containerSelector: e,
                rippleType: Telerik.Web.UI.MaterialRippleType.Icon,
                maxRippleSize: i,
              },
              {
                containerSelector:
                  ".rgPager .rgNumPart a:not('.rgCurrentPage')",
                rippleType: Telerik.Web.UI.MaterialRippleType.Icon,
                maxRippleSize: i,
                boundToElementSize: !0,
              },
              {
                containerSelector:
                  ".rgCommandCell .t-button, .rgPager .rgPagerButton, .rgGroupItem",
              },
            ],
          },
        ]
      );
    },
    _stopDefaultSubmit: function () {
      var e = "_preventDefaultButton_" + this.get_id(),
        t = $get(e);
      t ||
        ((t = document.createElement("input")).setAttribute("type", "submit"),
        t.setAttribute("name", e),
        (t.style.display = "none"),
        (t.onclick = function () {
          return !1;
        }),
        window.theForm.insertBefore(t, window.theForm.firstChild));
    },
    _modalPopupEditFormBlurHandler: function (e) {
      var t = this._modalPopupWrapper;
      setTimeout(function () {
        $telerik.isDescendantOrSelf(t, document.activeElement) || t.focus();
      }, 1);
    },
    _restrictTabNavigation: function (e) {
      var t = this;
      (e.tabIndex = 0),
        e.getElementsByTagName("input")[0].focus(),
        (t._modalPopupWrapper = e),
        e.addEventListener(
          "blur",
          $telerik.$.proxy(t._modalPopupEditFormBlurHandler, t),
          !0,
        );
    },
    _initializeCallback: function (e, t) {
      WebForm_DoCallback(this.UniqueID, e, t, "", null, !1);
    },
    _dataDivMouseDown: function (e) {
      this._isTouchScrollInProgress = !1;
      var t = $telerik.getTouchTarget(e);
      if (this._scrolling) {
        if (t) {
          var i =
              "td" == t.tagName.toLowerCase() &&
              Telerik.Web.UI.Grid.IsChildOf(t, this.GridDataDiv),
            r =
              e.changedTouches ||
              (e.originalEvent
                ? e.originalEvent.touches
                : !!e.rawEvent && e.rawEvent.touches);
          (!i || (r && r.length > 1)) &&
            this._scrolling._dropDownTouchScroll.disable();
        }
        this.get_allowCellSelection() &&
          this._scrolling._dropDownTouchScroll.enable();
      }
    },
    _dataDivMouseUp: function (e) {
      this._scrolling &&
        (this.get_allowCellSelection() && !this._isTouchScrollInProgress
          ? this._scrolling._dropDownTouchScroll.disable()
          : this._scrolling._dropDownTouchScroll.enable());
    },
    _dataDivMouseMove: function (e) {
      this.get_allowCellSelection() &&
        this._scrolling &&
        ((this._isTouchScrollInProgress = !0),
        this._scrolling._dropDownTouchScroll.enable());
    },
    _swipeStart: function (e) {
      (this._startTouchPoints = {}),
        (this._endTouchPoints = {}),
        (this._currentTouchPoints = {}),
        (this._currentMovement = null),
        (this._validSwipe = !0);
      var t =
        e.changedTouches ||
        (e.originalEvent
          ? e.originalEvent.touches
          : !!e.rawEvent && e.rawEvent.touches);
      if (t && t.length > 1) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          this._startTouchPoints[r.identifier] = {
            x: r.clientX,
            y: r.clientY,
            direction: Telerik.Web.UI.Grid.TouchPointDirection.None,
            movement: Telerik.Web.UI.Grid.TouchPointMovement.None,
          };
        }
        this._currentTouchPoints = $telerik.$.extend(
          {},
          this._startTouchPoints,
        );
      }
    },
    _swipeMove: function (e) {
      var t = e.originalEvent || e.rawEvent || e,
        i = t.touches || t.changedTouches,
        r = !1,
        n = null;
      if (i && i.length > 1)
        for (var l = 0; l < i.length; l++) {
          var o = i[l];
          if (this._currentTouchPoints[o.identifier]) {
            var a = this._currentTouchPoints[o.identifier];
            if (
              !a ||
              a.movement == Telerik.Web.UI.Grid.TouchPointMovement.Inconsistent
            )
              continue;
            o = {
              identifier: i[l].identifier,
              x: i[l].clientX,
              y: i[l].clientY,
              direction: Telerik.Web.UI.Grid.TouchPointDirection.None,
              movement: Telerik.Web.UI.Grid.TouchPointMovement.None,
            };
            var s = Math.abs(o.x - a.x),
              d = Math.abs(o.y - a.y);
            if (s <= this._swipeThreshold && d <= this._swipeThreshold)
              continue;
            var h = Telerik.Web.UI.Grid.detectTouchPointDirection(a, o, s - d),
              u = Telerik.Web.UI.Grid.detectTouchPointMovement(h);
            (o.movement = u),
              a &&
                a.movement != Telerik.Web.UI.Grid.TouchPointMovement.None &&
                a.movement != u &&
                (o.movement =
                  Telerik.Web.UI.Grid.TouchPointMovement.Inconsistent),
              (o.direction = h),
              (this._currentTouchPoints[o.identifier] = o),
              0 == l ? (n = o.movement) : n == o.movement && (r = !0);
          }
        }
      if (r) return $telerik.cancelRawEvent(e.originalEvent), !1;
    },
    _swipeEnd: function (e) {
      var t = (e.originalEvent || e.rawEvent || e).changedTouches;
      if (
        t &&
        t.length > 0 &&
        Object.keys(this._currentTouchPoints).length > 0
      ) {
        var i = t[0].identifier;
        if (
          (this._currentMovement ||
            (this._currentMovement = this._currentTouchPoints[i].movement),
          !this._validSwipe)
        )
          return;
        if (this._currentTouchPoints[i] && this._startTouchPoints[i]) {
          var r = this._currentTouchPoints[i];
          this._endTouchPoints[i] = r;
          var n = this._startTouchPoints[i],
            l = Math.abs(r.x - n.x),
            o = Math.abs(r.y - n.y),
            a =
              (l > this._swipeThreshold || o > this._swipeThreshold) &&
              r.movement !=
                Telerik.Web.UI.Grid.TouchPointMovement.Inconsistent &&
              r.movement == this._currentMovement;
          this._validSwipe = this._validSwipe && a;
        }
        this._validSwipe &&
          Object.keys(this._startTouchPoints).length ==
            Object.keys(this._endTouchPoints).length &&
          (this._currentMovement ==
            Telerik.Web.UI.Grid.TouchPointMovement.Left &&
            this.get_masterTableView().page("Next"),
          this._currentMovement ==
            Telerik.Web.UI.Grid.TouchPointMovement.Right &&
            this.get_masterTableView().page("Prev"));
      }
    },
    _initializeSubmitControls: function () {
      this._submitControls = [{ Name: "input", Type: "text" }];
    },
    _shouldFocusGridOnDocumentKeyDown: function (e, t) {
      var i = e.srcElement || e.explicitOriginalTarget;
      return !!(
        (e.ctrlKey &&
          t == this.ClientSettings.KeyboardNavigationSettings.FocusKey) ||
        ((t ==
          this.ClientSettings.KeyboardNavigationSettings.ExpandDetailTableKey ||
          t ==
            this.ClientSettings.KeyboardNavigationSettings
              .CollapseDetailTableKey) &&
          this.ClientSettings &&
          this.ClientSettings.AllowKeyboardNavigation &&
          i &&
          i.id == this.get_element().id)
      );
    },
    _shouldFocusGridOnDocKeyDownWithCellSelection: function (e, t) {
      return (
        e.ctrlKey &&
        t == this.ClientSettings.KeyboardNavigationSettings.FocusKey
      );
    },
    _documentKeyDown: function (e) {
      var t = (e = e || window.event).keyCode || e.charCode;
      if (
        (e.charCode &&
          (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0)),
        this.get_allowCellSelection())
      )
        this._shouldFocusGridOnDocKeyDownWithCellSelection(e, t) &&
          this.get_element().focus();
      else if (
        this._shouldFocusGridOnDocumentKeyDown(e, t) &&
        this.get_element().focus &&
        (this.get_element().focus(),
        this.ClientSettings.AllowKeyboardNavigation &&
          !this._activeRow &&
          this.get_masterTableView().get_dataItems().length > 0)
      ) {
        var i = null;
        null !=
          (i =
            this._selectedItemsInternal.length > 0
              ? $find(this._selectedItemsInternal[0].id)
              : this.get_masterTableView().get_dataItems()[0]) &&
          (this._setActiveRow(i.get_element(), e),
          this.ClientSettings.Selecting &&
            this.ClientSettings.Selecting.AllowRowSelect &&
            this._selection._selectRowInternal(
              i.get_element(),
              e,
              !1,
              !0,
              !0,
              !1,
            ));
      }
    },
    _attachMouseHandlers: function () {
      window.$addHandlers(this.get_element(), {
        mouseover: Function.createDelegate(this, this._mouseover),
      }),
        window.$addHandlers(this.get_element(), {
          mouseout: Function.createDelegate(this, this._mouseout),
        });
    },
    _getDataServiceData: function (e, t, i) {
      var r = new Sys.CancelEventArgs(),
        n = this.ClientSettings.DataBinding.Location;
      (r.get_location = function () {
        return n;
      }),
        (r.set_location = function (e) {
          n = e;
        });
      var l = this.ClientSettings.DataBinding.DataService.TableName;
      (r.get_tableName = function () {
        return l;
      }),
        (r.set_tableName = function (e) {
          l = e;
        });
      var o = this.ClientSettings.DataBinding.DataService.FilterQueryOption;
      (r.get_filterQueryOption = function () {
        return o;
      }),
        (r.set_filterQueryOption = function (e) {
          o = e;
        });
      var a = this.ClientSettings.DataBinding.DataService.SortQueryOption;
      (r.get_sortQueryOption = function () {
        return a;
      }),
        (r.set_sortQueryOption = function (e) {
          a = e;
        });
      var s = this.get_masterTableView().getDataServiceQuery(
        r.get_tableName(),
        r.get_filterQueryOption(),
        r.get_sortQueryOption(),
      );
      (r.get_query = function () {
        return s;
      }),
        (r.set_query = function (e) {
          s = e;
        });
      var d = this._getDataResponseType();
      (r.get_responseType = function () {
        return d;
      }),
        (r.set_responseType = function (e) {
          d = e;
        });
      var h = this._isBoundToServiceType(
        Telerik.Web.UI.GridClientDataServiceType.OData,
      )
        ? "$callback"
        : null;
      if (
        ((r.get_callback = function () {
          return h;
        }),
        (r.set_callback = function (e) {
          h = e;
        }),
        this.raise_dataBinding(r),
        r.get_cancel())
      )
        return !1;
      var u =
        void 0 !== i
          ? i
          : String.format("{0}/{1}", r.get_location(), r.get_query());
      try {
        var _ = function (e, t) {
          return e.replace(/\\'/g, "'");
        };
        "jsonp" === d && (_ = null);
        var g = {
          type: "GET",
          url: u,
          contentType: "application/json; charset=utf-8",
          dataFilter: _,
          dataType: d,
          jsonp: h,
          success: e,
          error: t,
        };
        $telerik.$.ajax(g);
      } catch (e) {
        throw new Error(e);
      }
    },
    _getData: function (e, t, i, r, n) {
      var l = Sys.Serialization.JavaScriptSerializer.deserialize(i),
        o = new Sys.CancelEventArgs();
      if (
        ((o.get_location = function () {
          return e;
        }),
        (o.set_location = function (t) {
          e = t;
        }),
        (o.get_methodName = function () {
          return t;
        }),
        (o.set_methodName = function (e) {
          t = e;
        }),
        (o.get_methodArguments = function () {
          return l;
        }),
        (o.set_methodArguments = function (e) {
          l = e;
        }),
        this.raise_dataBinding(o),
        o.get_cancel())
      )
        return !1;
      try {
        $telerik.$.ajax({
          type: "POST",
          url: o.get_location() + "/" + o.get_methodName(),
          data: Sys.Serialization.JavaScriptSerializer.serialize(l),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: r,
          error: n,
        });
      } catch (e) {
        throw new Error(e);
      }
    },
    _getCacheKey: function (e) {
      return String.format(
        "{0}{1}{2}{3}",
        e.get_currentPageIndex(),
        e.get_pageSize(),
        e.get_sortExpressions().toString(),
        e.get_filterExpressions().toString(),
      );
    },
    _getRequestData: function (e, t) {
      var i = this.get_masterTableView(),
        r = {};
      void 0 !== e && void 0 !== t
        ? ((r[this.ClientSettings.DataBinding.StartRowIndexParameterName] = e),
          (r[this.ClientSettings.DataBinding.MaximumRowsParameterName] = t))
        : ((r[this.ClientSettings.DataBinding.StartRowIndexParameterName] =
            i.get_currentPageIndex() * i.get_pageSize()),
          i._data && i._data.AllowPaging
            ? (r[this.ClientSettings.DataBinding.MaximumRowsParameterName] =
                i.get_pageSize())
            : (r[this.ClientSettings.DataBinding.MaximumRowsParameterName] =
                Math.pow(2, 31) - 1));
      var n = null;
      void 0 === this.ClientSettings.DataBinding.SortParameterType
        ? (n = i.get_sortExpressions().toList())
        : (this.ClientSettings.DataBinding.SortParameterType ==
            Telerik.Web.UI.GridClientDataBindingParameterType.String ||
            this.ClientSettings.DataBinding.SortParameterType ==
              Telerik.Web.UI.GridClientDataBindingParameterType.Linq ||
            this.ClientSettings.DataBinding.SortParameterType ==
              Telerik.Web.UI.GridClientDataBindingParameterType.Oql) &&
          (n = i.get_sortExpressions().toString()),
        (r[this.ClientSettings.DataBinding.SortParameterName] = n);
      var l = null;
      return (
        void 0 === this.ClientSettings.DataBinding.FilterParameterType
          ? (l = i.get_filterExpressions().toList())
          : this.ClientSettings.DataBinding.FilterParameterType ==
              Telerik.Web.UI.GridClientDataBindingParameterType.String
            ? (l = i.get_filterExpressions().toString())
            : this.ClientSettings.DataBinding.FilterParameterType ==
                Telerik.Web.UI.GridClientDataBindingParameterType.Linq
              ? (l = i.get_filterExpressions().toDynamicLinq())
              : this.ClientSettings.DataBinding.FilterParameterType ==
                  Telerik.Web.UI.GridClientDataBindingParameterType.Oql &&
                (l = i.get_filterExpressions().toOql()),
        (r[this.ClientSettings.DataBinding.FilterParameterName] = l),
        Sys.Serialization.JavaScriptSerializer.serialize(r)
      );
    },
    _isBoundToServiceType: function (e) {
      return (
        !!(
          this.ClientSettings &&
          this.ClientSettings.DataBinding &&
          this.ClientSettings.DataBinding.DataService
        ) &&
        (void 0 !== this.ClientSettings.DataBinding.DataService.Type
          ? this.ClientSettings.DataBinding.DataService.Type === e
          : e === Telerik.Web.UI.GridClientDataServiceType.ADONet)
      );
    },
    _getDataResponseType: function () {
      return this.ClientSettings &&
        this.ClientSettings.DataBinding &&
        this.ClientSettings.DataBinding.ResponseType &&
        this.ClientSettings.DataBinding.ResponseType ===
          Telerik.Web.UI.GridClientDataResponseType.JSONP
        ? "jsonp"
        : "json";
    },
    _onSuccess: function (e) {
      if ("object" == typeof e && null != e) {
        void 0 !== e.d && (e = e.d);
        var t = this.get_masterTableView();
        if (
          this.ClientSettings.DataBinding.EnableCaching &&
          !t._virtualization
        ) {
          var i = this._getCacheKey(t);
          this._cache || (this._cache = {}),
            this._cache[i] || (this._cache[i] = e);
        }
        var r = !0,
          n = e;
        n.get_data && (n = n.get_data());
        var l,
          o,
          a = 0;
        if (
          ((l =
            void 0 === this.ClientSettings.DataBinding.DataPropertyName
              ? "Data"
              : this.ClientSettings.DataBinding.DataPropertyName),
          (o =
            void 0 === this.ClientSettings.DataBinding.CountPropertyName
              ? "Count"
              : this.ClientSettings.DataBinding.CountPropertyName),
          this._isBoundToServiceType(
            Telerik.Web.UI.GridClientDataServiceType.OData,
          ) && e.results
            ? ((n = e.results),
              isNaN(e.__count)
                ? t.get_allowPaging() || ((a = 0), (r = !1))
                : ((a = e.__count), (r = !1)))
            : void 0 !== e[l] &&
              void 0 !== e[o] &&
              ((r = !1), (n = e[l]), (a = e[o])),
          r)
        ) {
          if (
            void 0 !== this.ClientSettings.DataBinding.SelectCountMethod &&
            "" != this.ClientSettings.DataBinding.SelectCountMethod
          )
            if (
              ((this._onSelectCountSuccessDelegate = Function.createDelegate(
                this,
                this._onSelectCountSuccess,
              )),
              void 0 !== this.ClientSettings.DataBinding.DataService &&
                void 0 !==
                  this.ClientSettings.DataBinding.DataService.TableName &&
                "" != this.ClientSettings.DataBinding.DataService.TableName)
            ) {
              var s = t
                  .get_filterExpressions()
                  .toString("it")
                  .replace(/'/g, '"')
                  .replace(/\[/g, "")
                  .replace(/\]/g, ""),
                d = String.format(
                  "{0}/{1}?where='{2}'",
                  this.ClientSettings.DataBinding.Location,
                  this.ClientSettings.DataBinding.SelectCountMethod,
                  s,
                );
              this._getDataServiceData(
                this._onSelectCountSuccessDelegate,
                this._onFailDelegate,
                d,
              );
            } else
              this._getData(
                this.ClientSettings.DataBinding.Location,
                this.ClientSettings.DataBinding.SelectCountMethod,
                "{}",
                this._onSelectCountSuccessDelegate,
                this._onFailDelegate,
              );
        } else t.set_virtualItemCount(a);
        var h = new Telerik.Web.UI.GridDataSourceResolvedEventArgs(n);
        this.raise_dataSourceResolved(h),
          (n = h.get_data()),
          0 == t.get_virtualItemCount() && t._updatePager(),
          t._virtualization || (t.set_dataSource(n), t.dataBind());
      }
    },
    _onFail: function (e) {
      var t = new Sys.EventArgs();
      if (void 0 !== e && void 0 !== e.responseText) {
        var i;
        try {
          i = Sys.Serialization.JavaScriptSerializer.deserialize(
            e.responseText,
          );
        } catch (e) {
          i = null;
        }
        if (!i) return;
        if (i.error) {
          var r = i.error,
            n = r.message && r.message.value ? r.message.value : "";
          t = this._constructErrorArgsObject(n, "", "");
        } else
          t = this._constructErrorArgsObject(
            i.Message,
            i.ExceptionType,
            i.StackTrace,
          );
      }
      this.raise_dataBindingFailed(t);
    },
    _constructErrorArgsObject: function (e, t, i) {
      var r = new Sys.EventArgs();
      return (
        (r.get_message = function () {
          return e;
        }),
        (r.get_exceptionType = function () {
          return t;
        }),
        (r.get_stackTrace = function () {
          return i;
        }),
        r
      );
    },
    _onSelectCountSuccess: function (e) {
      void 0 !== e.d && (e = e.d),
        void 0 !== e[this.ClientSettings.DataBinding.SelectCountMethod] &&
          (e = e[this.ClientSettings.DataBinding.SelectCountMethod]),
        this.get_masterTableView().set_virtualItemCount(e);
    },
    _onCommandODataSource: function (e, t) {
      t.set_cancel(!0), this.get_isUsingODataSource() && this._onDataNeeded();
    },
    _onCommand: function (e, t) {
      t.set_cancel(!0);
      var i = this.get_masterTableView();
      if (this.ClientSettings.DataBinding.EnableCaching) {
        var r = this._getCacheKey(i);
        if ((this._cache || (this._cache = {}), this._cache[r]))
          return void this._onSuccess(this._cache[r]);
      }
      void 0 !== this.ClientSettings.DataBinding.SelectMethod &&
      "" != this.ClientSettings.DataBinding.SelectMethod
        ? this._getData(
            this.ClientSettings.DataBinding.Location,
            this.ClientSettings.DataBinding.SelectMethod,
            this._getRequestData(),
            this._onSuccessDelegate,
            this._onFailDelegate,
          )
        : void 0 !== this.ClientSettings.DataBinding.DataService &&
          void 0 !== this.ClientSettings.DataBinding.DataService.TableName &&
          "" != this.ClientSettings.DataBinding.DataService.TableName &&
          (i.getDataServiceQuery(
            this.ClientSettings.DataBinding.DataService.TableName,
            this.ClientSettings.DataBinding.DataService.FilterQueryOption,
            this.ClientSettings.DataBinding.DataService.SortQueryOption,
          ),
          this._getDataServiceData(
            this._onSuccessDelegate,
            this._onFailDelegate,
          ));
    },
    _onVirtualizationCommand: function (e, t) {
      var i = t.get_tableView(),
        r = i._virtualization,
        n = i.get_pageSize(),
        l = i.get_currentPageIndex();
      r &&
        "Page" === t.get_commandName() &&
        (t.set_cancel(!0), r.scrollToIndex(n * l), r.select(n * l));
    },
    _getHeadLinksForPrint: function () {
      for (
        var e = $telerik.$("link[type='text/css']"), t = "", i = 0;
        i < e.length;
        i++
      )
        t +=
          "<link rel='Stylesheet' type='text/css' href='" +
          e[i]
            .getAttribute("href")
            .replace(/&amp;amp;t/g, "&t")
            .replace(/&amp;t/g, "&t") +
          "'>";
      return t;
    },
    print: function () {
      if (!this.ClientSettings.EnableClientPrint) return !1;
      var e,
        t = this,
        i = window.kendo,
        r = window.open();
      if (!r) return !1;
      (e = $telerik.$("<div>")),
        i.drawing
          .drawDOM(t.get_element())
          .then(function (t) {
            return i.drawing.Surface.create(e, { type: "svg" }).draw(t);
          })
          .done(function (i) {
            var n =
              "<html><head>" +
              t._getHeadLinksForPrint() +
              "</head><body><form style='height:" +
              t.get_element().scrollHeight +
              "px;'>" +
              e.get(0).innerHTML +
              "</form></body></html>";
            r.document.open(),
              r.document.write(n),
              r.document.close(),
              setTimeout(function () {
                r.print();
              }, 1),
              e.remove();
          });
    },
    repaint: function () {
      var e = this.get_element(),
        t = this._scrolling,
        i = this.get_masterTableView();
      if (this.canRepaint()) {
        if (
          (this._clearParentShowHandlers(),
          !t && this.GridDataDiv && (t = $find(this.get_id())._scrolling),
          Telerik.Web.UI.GridScrolling && t)
        )
          t._shouldInitializeLayoutAndScroll
            ? ((t._shouldInitializeLayoutAndScroll = !1),
              t._initializeDimensions(),
              t._initializeScroll())
            : t.onWindowResize();
        else {
          this._repaintWidthFlag && (e.style.width = "");
          var r = 0;
          this._masterClientID &&
            null != i &&
            (r = i.get_element().offsetWidth),
            e.offsetWidth < r &&
              ((e.style.width = r + "px"), (this._repaintWidthFlag = !0));
        }
        this._masterClientID &&
          i &&
          i._virtualization &&
          i._virtualization.repaint(),
          this._isBatchEditingEnabled &&
            this._rowHighlightingForDeletedRows &&
            this.get_batchEditingManager() &&
            this.get_batchEditingManager()._adjustBatchDeletedRows();
      } else e && this.add_parentShown(e);
    },
    onWindowResize: function () {
      this.resizeModalBackground();
    },
    resizeModalBackground: function () {
      var e = String.format("modalDivId_{0}", this.get_id()),
        t = $get(e);
      if (t) {
        (t.style.width = "1px"), (t.style.height = "1px");
        var i = document.documentElement,
          r = document.body;
        (t.style.width =
          Math.max(
            Math.max(i.scrollWidth, r.scrollWidth),
            Math.max(i.offsetWidth, r.offsetWidth),
          ) + "px"),
          (t.style.height =
            Math.max(
              Math.max(i.scrollHeight, r.scrollHeight),
              Math.max(i.offsetHeight, r.offsetHeight),
            ) + "px");
      }
    },
    _popUpKeyDown: function (e) {
      var t = e.keyCode || e.charCode;
      e.charCode &&
        (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0));
      var i = t == this.keyMappings.ExitEditInsertModeKey,
        r = t == this.keyMappings.UpdateInsertItemKey,
        n = Telerik.Web.UI.Grid.GetFirstParentByTagName(
          this.popUpForm,
          "tr",
        ).previousSibling;
      if ("" != n.id) {
        var l,
          o = n.id.split("__")[0],
          a = $find(o);
        if (a)
          if (a.get_owner()._canHandleKeyboardAction(e))
            i
              ? ((l = new Telerik.Web.UI.GridKeyPressEventArgs(e)),
                a.get_owner().raise_keyPress(l),
                l.get_cancel() || a.cancelUpdate(n),
                e.preventDefault(),
                e.stopPropagation())
              : r &&
                ((l = new Telerik.Web.UI.GridKeyPressEventArgs(e)),
                a.get_owner().raise_keyPress(l),
                l.get_cancel() || a.updateItem(n),
                e.preventDefault(),
                e.stopPropagation());
      }
    },
    _popUpMouseDown: function (e) {
      return (
        (this.canMove = !0),
        (this.originalLeft = this.offsetLeft - e.clientX),
        (this.originalTop = this.offsetTop - e.clientY),
        ($telerik.isFirefox &&
          2 == e.button &&
          navigator.userAgent.indexOf("Mac")) ||
          Telerik.Web.UI.Grid.ClearDocumentEvents(),
        !1
      );
    },
    _popUpMouseOut: function (e) {
      if (this.canMove)
        return (
          (e.rawEvent.relatedTarget
            ? e.rawEvent.relatedTarget
            : e.rawEvent.toElement) ||
            ((this.canMove = !1), Telerik.Web.UI.Grid.RestoreDocumentEvents()),
          !1
        );
    },
    _popUpMouseUp: function (e) {
      if (this.canMove) {
        this.canMove = !1;
        var t = this.getElementsByTagName("div")[0].id,
          i = t.split("__")[0],
          r = $find(i);
        if (r) {
          var n = r._owner;
          (n._popUpLocations[t] =
            parseInt(this.style.left, 10) +
            "px," +
            parseInt(this.style.top, 10) +
            "px"),
            n.updateClientState(),
            n.resizeModalBackground();
        }
        Telerik.Web.UI.Grid.RestoreDocumentEvents();
      }
    },
    _popUpMouseMove: function (e) {
      if (this.canMove)
        return (
          (this.style.left = e.clientX + this.originalLeft + "px"),
          (this.style.top = e.clientY + this.originalTop + "px"),
          !1
        );
    },
    _isRowDragged: function (e) {
      return null != $get(String.format("{0}_DraggedRows", this.get_id()));
    },
    _mouseDown: function (e) {
      if (
        !$telerik.isTouchDevice &&
        e.rawEvent.button != Sys.UI.MouseButton.leftButton &&
        this._draggedRow
      )
        return this.get_masterTableView()
          ? (this._draggedRow.parentNode.removeChild(this._draggedRow),
            (this._draggedRow = null),
            void this._clearDrag())
          : void this._clearDrag();
      var t;
      $telerik.isTouchDevice
        ? (t = $telerik.getTouchTarget(e)).tagName &&
          "td" == t.tagName.toLowerCase() &&
          this.get_events().getHandler("rowDblClick") &&
          $telerik.cancelRawEvent(e)
        : (t = Telerik.Web.UI.Grid.GetCurrentElement(e));
      var i = t.id && t.id.indexOf("RowDragHandle") > -1;
      if (
        this.ClientSettings.Scrolling.AllowScroll &&
        $telerik.isTouchDevice &&
        this.ClientSettings.AllowRowsDragDrop &&
        !i &&
        "td" == t.tagName.toLowerCase() &&
        Telerik.Web.UI.Grid.IsChildOf(t, this.GridDataDiv)
      )
        return $telerik.cancelRawEvent();
      var r = Telerik.Web.UI.Grid.GetFirstParentByTagName(t, "tr");
      if (r && "" != r.id) {
        var n = this.get_masterTableView()
            ._getRowByIndexOrItemIndexHierarchical(r)
            .id.split("__")[0],
          l = $find(n);
        if (
          l &&
          (!l._data._useDragColumn || i) &&
          !(
            (!this._canRiseRowEvent(e) && !i) ||
            (this._isRowResize && 1 == this._isRowResize)
          ) &&
          (0 != this._selectedIndexes.length ||
            !this.get_allowMultiRowSelection() ||
            !this.ClientSettings.Selecting.EnableDragToSelectRows ||
            i) &&
          (!this.get_allowMultiRowSelection() ||
            !(e.ctrlKey || (e.rawEvent && e.rawEvent.metaKey)))
        ) {
          this._draggedItems && (this._draggedItems = []);
          var o,
            a = !1;
          for (o = 0; o < this._selectedItemsInternal.length; o++)
            if (this._selectedItemsInternal[o].id == r.id) {
              a = !0;
              break;
            }
          if (!a) {
            var s =
              this.get_allowMultiRowSelection() &&
              !this.ClientSettings.Selecting.EnableDragToSelectRows;
            if (
              !Telerik.Web.UI.GridSelection ||
              !this._selection ||
              (!s && this.get_allowMultiRowSelection() && !i)
            )
              return;
            var d = this.ClientSettings.EnablePostBackOnRowClick;
            if (
              ((this.ClientSettings.EnablePostBackOnRowClick = !1),
              this._selection._click(e),
              (this.ClientSettings.EnablePostBackOnRowClick = d),
              0 == this._selectedItemsInternal.length ||
                this._selectedItemsInternal[0].id != r.id)
            )
              return;
          }
          (this._canMoveRow = !0), (this._originalDragItem = r);
          var h = new Telerik.Web.UI.GridDataItemCancelEventArgs(r, e);
          if ((this.raise_rowDragStarted(h), !h.get_cancel())) {
            (this._draggedRow = document.createElement("div")),
              (this._draggedRow.id = String.format(
                "{0}_DraggedRows",
                this.get_id(),
              )),
              (this._draggedRow.style.position = "absolute"),
              (this._draggedRow.className = this.get_element().className);
            var u = [],
              _ = l.get_selectedItems();
            for (o = 0; o < _.length; o++)
              if (Array.contains(l.get_dataItems(), _[o])) {
                var g = _[o].get_element();
                this.get_enableAriaSupport() &&
                  (g.removeAttribute("aria-dropeffect"),
                  g.setAttribute("aria-grabbed", "true")),
                  (u[u.length] = String.format(
                    "<tr class='{0}'>",
                    g.className,
                  )),
                  (u[u.length] = g.innerHTML),
                  (u[u.length] = "</tr>"),
                  Array.add(this._draggedItems, _[o]);
              }
            var c = r.parentNode.parentNode;
            this._draggedRow.innerHTML = String.format(
              "<table class='{0}'>{1}<tbody>{2}</tbody></table>",
              c.className,
              c.getElementsByTagName("colgroup")[0].outerHTML,
              u.join(""),
            );
            var m = this._draggedRow.getElementsByTagName("table")[0];
            return (
              Telerik.Web.UI.Grid.CopyAttributes(
                this._draggedRow,
                this.get_element(),
              ),
              (this._draggedRow.className += String.format(
                " GridDraggedRows GridDraggedRows_{0}",
                this.Skin,
              )),
              (this._draggedRow.style.height = ""),
              Telerik.Web.UI.Grid.CopyAttributes(m, c),
              (m.style.height = ""),
              (m.style.margin = ""),
              (this._draggedRow.style.zIndex = 99999),
              (this._draggedRow.style.display = "none"),
              (this._draggedRow.style.width =
                this.get_element().offsetWidth + "px"),
              document.body.insertBefore(
                this._draggedRow,
                document.body.firstChild,
              ),
              this._createDropClue(),
              ($telerik.isFirefox &&
                2 == e.button &&
                navigator.userAgent.indexOf("Mac")) ||
                Telerik.Web.UI.Grid.ClearDocumentEvents(),
              !1
            );
          }
        }
      }
    },
    _createDropClue: function () {
      (this._dropClue = document.createElement("div")),
        document.body.appendChild(this._dropClue),
        (this._dropClue.style.position = "absolute"),
        (this._dropClue.style.height = "5px");
    },
    _positionDropClue: function (e) {
      if (this._dropClue != e.target && this.get_masterTableView()) {
        var t,
          i = null;
        if (
          (t = $telerik.isTouchDevice
            ? $telerik.getTouchTarget(e)
            : Telerik.Web.UI.Grid.GetCurrentElement(e))
        ) {
          var r = Telerik.Web.UI.Grid.GetFirstParentByTagName(t, "tr");
          if (r && "" != r.id) {
            var n = this._getParentRadGridControl(t);
            if (Telerik.Web.UI.Grid.IsChildOf(t, this.get_element()))
              r != this._originalDragItem &&
                (i =
                  this.get_masterTableView()._getRowByIndexOrItemIndexHierarchical(
                    r,
                  ));
            else if (n) {
              if (!n.get_masterTableView()) return;
              (r = Telerik.Web.UI.Grid.GetFirstParentByTagName(t, "tr")),
                (i = n
                  .get_masterTableView()
                  ._getRowByIndexOrItemIndexHierarchical(r));
            }
          } else
            r &&
              r.className &&
              -1 != r.className.indexOf("rgNoRecords") &&
              (i = r);
        }
        if (i) {
          (this._dropClue.row = i),
            (this._dropClue.style.width = i.offsetWidth + "px");
          var l,
            o = i,
            a = $telerik.getLocation(o);
          (this._dropClue.style.left = a.x + "px"),
            (l = $telerik.isTouchDevice
              ? $telerik.getTouchEventLocation(e)
              : this._getMousePosition(e)),
            (this._dropClue.style.display = ""),
            (this._dropClue.style.visibility = "visible"),
            l.y < a.y + o.offsetHeight / 2
              ? ((this._dropClue.style.top = a.y + "px"),
                "" != this.Skin
                  ? (this._dropClue.className = String.format(
                      "GridItemDropIndicator GridItemDropIndicator_{0}",
                      this.Skin,
                    ))
                  : ((this._dropClue.style.borderTop = "1px dotted black"),
                    (this._dropClue.style["font-size"] = "3px"),
                    (this._dropClue.style["line-height"] = "3px"),
                    (this._dropClue.style.height = "1px"),
                    (this._dropClue.className = "GridItemDropIndicator")),
                (this._draggingPosition = "above"))
              : ((this._dropClue.style.top = a.y + o.offsetHeight + "px"),
                "" != this.Skin
                  ? (this._dropClue.className = String.format(
                      "GridItemDropIndicator GridItemDropIndicator_{0}",
                      this.Skin,
                    ))
                  : ((this._dropClue.style.borderTop = "1px dotted black"),
                    (this._dropClue.style["font-size"] = "3px"),
                    (this._dropClue.style["line-height"] = "3px"),
                    (this._dropClue.style.height = "1px"),
                    (this._dropClue.className = "GridItemDropIndicator")),
                (this._draggingPosition = "below"));
        } else
          $telerik.isDescendantOrSelf(this._draggedRow, t) ||
            (this._dropClue.style.visibility = "hidden");
      }
    },
    _getMousePosition: function (e) {
      var t = $telerik.getScrollOffset(document.body, !0),
        i = e.clientX,
        r = e.clientY;
      return { x: (i += t.x), y: (r += t.y) };
    },
    _mouseUp: function (e) {
      var t, i, r;
      this._canMoveRow = !1;
      var n,
        l = null;
      if (this._draggedRow) {
        if (!this.get_masterTableView()) return void this._clearDrag();
        var o;
        if (
          (this._draggedRow.parentNode.removeChild(this._draggedRow),
          (this._draggedRow = null),
          (o = $telerik.isTouchDevice
            ? $telerik.getTouchTarget(e)
            : Telerik.Web.UI.Grid.GetCurrentElement(e)))
        ) {
          if (o == this._dropClue) o = this._dropClue.row;
          else if (o.id && -1 != o.id.indexOf("_GridData")) {
            var a = $find(o.id.replace("_GridData", ""));
            if (a && "Telerik.Web.UI.RadGrid" == Object.getType(a).getName()) {
              var s = a.get_masterTableView().get_element().rows;
              s.length > 0 &&
                ((o = s[s.length - 1].cells[0]),
                (this._draggingPosition = "below"));
            }
          }
          n = this._draggedItems;
          var d = Telerik.Web.UI.Grid.GetFirstParentByTagName(o, "tr"),
            h = this._draggingPosition;
          d && "" == d.id && ((d = null), (h = null));
          var u = new Telerik.Web.UI.GridDragDropCancelEventArgs(
            d,
            e,
            n,
            o,
            null,
            h,
          );
          if ((this.raise_rowDropping(u), !u.get_cancel())) {
            if (d == this._originalDragItem) {
              if (this.get_enableAriaSupport())
                for (i = 0; i < n.length; i++) {
                  var _ = n[i].get_element();
                  _.removeAttribute("aria-grabbed"),
                    _.setAttribute("aria-dropeffect", "move");
                }
              return this._clearDrag(), void this.raise_rowDropped(u);
            }
            var g,
              c = this._getParentRadGridControl(o);
            if (c) {
              var m = Telerik.Web.UI.Grid.GetFirstParentByTagName(o, "tr");
              if (!m || m == this._originalDragItem || !c.get_masterTableView())
                return void this._clearDrag();
              var p = m,
                f = c.get_masterTableView()._data.UniqueID;
              if ("" != m.id) {
                p = c
                  .get_masterTableView()
                  ._getRowByIndexOrItemIndexHierarchical(m);
                var w = $find(p.id.split("__")[0]);
                w && (f = w._data.UniqueID);
              } else {
                var C = !1;
                if (c.get_masterTableView().get_element().tBodies.length > 0)
                  for (
                    i = 0,
                      r = c.get_masterTableView().get_element().tBodies[0]
                        .rows.length;
                    i < r;
                    i++
                  ) {
                    if (
                      m ==
                      c.get_masterTableView().get_element().tBodies[0].rows[i]
                    ) {
                      C = !0;
                      break;
                    }
                    for (
                      var I = c
                          .get_masterTableView()
                          .get_element()
                          .tBodies[0].rows[i].getElementsByTagName("table"),
                        v = 0,
                        T = I.length;
                      v < T;
                      v++
                    )
                      if (I[v] && this._isChildRowElement(m, I[v])) {
                        var b = $find(I[v].id);
                        b && (f = b._data.UniqueID), (C = !0);
                        break;
                      }
                    if (C) break;
                  }
                if (!C) return;
              }
              if (((n = this._draggedItems), (l = null), "" != p.id))
                l = new Telerik.Web.UI.GridDragDropCancelEventArgs(
                  p,
                  e,
                  n,
                  null,
                  c,
                  this._draggingPosition,
                );
              else {
                var y = Telerik.Web.UI.Grid.GetFirstParentRowWithID(p);
                null != y && "" != y.id
                  ? ((p = y),
                    (l = new Telerik.Web.UI.GridDragDropCancelEventArgs(
                      p,
                      e,
                      n,
                      null,
                      c,
                      this._draggingPosition,
                    )))
                  : (l = new Telerik.Web.UI.GridDragDropCancelEventArgs(
                      null,
                      e,
                      n,
                      null,
                      c,
                      this._draggingPosition,
                    ));
              }
              for (
                this.raise_rowDropped(l), this._draggedItemsIndexes = [], t = 0;
                t < n.length;
                t++
              )
                Array.add(
                  this._draggedItemsIndexes,
                  n[t]._itemIndexHierarchical,
                );
              this.updateClientState();
              var S = p.id.split("__")[1];
              (g = String.format(
                "{0},{1},{2},{3}",
                S,
                c.UniqueID,
                this._draggingPosition,
                f,
              )),
                this.get_masterTableView().fireCommand("RowDropped", g);
            } else {
              var D = u.get_destinationHtmlElement();
              for (
                n = this._draggedItems,
                  l = new Telerik.Web.UI.GridDragDropCancelEventArgs(
                    null,
                    e,
                    n,
                    D,
                    null,
                    null,
                  ),
                  this.raise_rowDropped(l),
                  this._draggedItemsIndexes = [],
                  t = 0;
                t < n.length;
                t++
              )
                Array.add(
                  this._draggedItemsIndexes,
                  n[t]._itemIndexHierarchical,
                );
              this.updateClientState(),
                D.id &&
                  (g = String.format("{0},{1},{2},{3}", D.id, "", "", "")),
                this.get_masterTableView().fireCommand("RowDroppedHtml", g);
            }
          }
        }
        Telerik.Web.UI.Grid.RestoreDocumentEvents();
      }
      this._clearDrag();
    },
    _clearDrag: function () {
      this._dropClue &&
        (document.body.removeChild(this._dropClue), (this._dropClue = null)),
        this._draggedItems && (this._draggedItems = []),
        (this._draggingPosition = "above"),
        Telerik.Web.UI.Grid.RestoreDocumentEvents();
    },
    _isChildRowElement: function (e, t) {
      for (var i = 0, r = t.tBodies[0].rows.length; i < r; i++)
        if (e == t.tBodies[0].rows[i]) return !0;
      return !1;
    },
    _getParentRadGridControl: function (e) {
      for (; e; ) {
        if (e.id && "" != e.id)
          try {
            var t = $find(e.id);
            if (t && "Telerik.Web.UI.RadGrid" == Object.getType(t).getName())
              return t;
          } catch (e) {}
        e = e.parentNode;
      }
      return null;
    },
    _cancelEvent: function (e) {
      return !1;
    },
    _mouseMove: function (e) {
      if (this._canMoveRow && this._draggedRow) {
        var t = new Sys.EventArgs();
        return (
          (t.get_domEvent = function () {
            return e;
          }),
          this.raise_rowDragging(t),
          (this._draggedRow.style.display = ""),
          (this._draggedRow.style.position = "absolute"),
          Telerik.Web.UI.Grid.PositionDragElement(this._draggedRow, e),
          this._positionDropClue(e),
          this.ClientSettings.Scrolling.AllowScroll &&
            this.GridDataDiv &&
            this.ClientSettings.AllowAutoScrollOnDragDrop &&
            this._autoScroll(),
          $telerik.isTouchDevice && $telerik.cancelRawEvent(e),
          !1
        );
      }
    },
    _autoScroll: function () {
      var e,
        t,
        i = this.GridDataDiv;
      if (this._draggedRow && this.GridDataDiv) {
        var r = $telerik.getLocation(this._draggedRow);
        t = (e = $telerik.getLocation(i).y) + i.offsetHeight;
        var n,
          l = i.scrollTop <= 0,
          o = i.scrollTop >= i.scrollHeight - i.offsetHeight + 16,
          a = r.y - e,
          s = t - r.y,
          d = this;
        a < 50 && !l
          ? ((n = 10 - a / 5),
            (i.scrollTop = i.scrollTop - n),
            window.setTimeout(function () {
              d._autoScroll();
            }, 100))
          : s < 50 &&
            !o &&
            ((n = 10 - s / 5),
            (i.scrollTop = i.scrollTop + n),
            window.setTimeout(function () {
              d._autoScroll(this._mousePos);
            }, 100));
      }
    },
    _fillSelectedCellsIndexes: function () {
      if (this._selectedCellsInternal.length > 0)
        for (var e = null, t = 0; t < this._selectedCellsInternal.length; t++)
          (e = this._selectedCellsInternal[t].cellIndex),
            Array.contains(this._selectedCellsIndexes, e) ||
              Array.add(this._selectedCellsIndexes, e);
    },
    _fillUnselectableItemsIndexes: function () {
      var e = this._unselectableItemsInternal;
      if (e.length > 0)
        for (var t = null, i = 0, r = e.length; i < r; i++)
          (t = e[i].itemIndex),
            Array.contains(e, t) ||
              Array.add(this._unselectableItemsIndexes, t);
    },
    dispose: function () {
      var modalDiv = $get(String.format("modalDivId_{0}", this.get_id())),
        isModalPopup = !1;
      if (
        (modalDiv &&
          ((isModalPopup = !0), modalDiv.parentNode.removeChild(modalDiv)),
        this._onResizeDelegate)
      )
        try {
          window.$removeHandler(window, "resize", this._onResizeDelegate),
            (this._onResizeDelegate = null);
        } catch (e) {}
      if (
        (this._isBatchEditingEnabled &&
          this._rowHighlightingForDeletedRows &&
          this._onBatchRowDeleteDelegate &&
          (window.$removeHandler(
            window,
            "resize",
            this._onBatchRowDeleteDelegate,
          ),
          (this._onBatchRowDeleteDelegate = null)),
        this._gridItemResizer && this._gridItemResizer.dispose(),
        this._popUpIds && "" != this._popUpIds)
      )
        for (
          var _popUpIdsData = eval(this._popUpIds), i = 0;
          i < _popUpIdsData.length;
          i++
        ) {
          var el = $get(_popUpIdsData[i]);
          if (el) {
            if (this.get_enableAriaSupport() && isModalPopup) {
              var dummyPreventButtonId =
                "_preventDefaultButton_" + this.get_id();
              theForm.firstChild.name == dummyPreventButtonId &&
                window.theForm.removeChild(theForm.firstChild),
                el.removeEventListener(
                  "blur",
                  this._modalPopupEditFormBlurHandler,
                  !0,
                );
            }
            var divs = el.getElementsByTagName("div");
            divs.length > 0 && window.$clearHandlers(divs[0]);
          }
        }
      if (
        (this.raise_gridDestroying(new Sys.EventArgs()),
        this._filterCheckListClientID && this._checkListItemsRequestedDelegate)
      ) {
        var filterCheckList = $find(this._filterCheckListClientID);
        filterCheckList &&
          (filterCheckList.remove_itemsRequested(
            this._checkListItemsRequestedDelegate,
          ),
          (this._checkListItemsRequestedDelegate = null));
      }
      if (
        (this._detachDomEvents(),
        window.$clearHandlers(this.get_element()),
        (this._events = null),
        this._batchEditing && this._batchEditing.dispose(),
        this._selection && this._selection.dispose(),
        this._scrolling && this._scrolling.dispose(),
        this._clientSideBinding &&
          (this._clientSideBinding.dispose(), (this._clientSideBinding = null)),
        this._filterMenu &&
          (this._onFilterMenuClick &&
            (this._filterMenu.remove_itemClicked(this._onFilterMenuClicking),
            this._filterMenu.remove_itemClicked(this._onFilterMenuClick),
            this._filterMenu.remove_hidden(this._onFilterMenuHiddenDelegate),
            (this._onFilterMenuHiddenDelegate = null)),
          this._onFilterMenuShown &&
            (this._filterMenu.remove_expandAnimationEnded(
              this._onFilterMenuShown,
            ),
            (this._onFilterMenuShown = null)),
          (this._filterMenu = null)),
        this._headerContextMenu && (this._headerContextMenu = null),
        Sys.WebForms && Sys.WebForms.PageRequestManager)
      ) {
        var requestManager = Sys.WebForms.PageRequestManager.getInstance();
        requestManager &&
          this._initializeRequestHandler &&
          requestManager.remove_initializeRequest(
            this._initializeRequestHandler,
          );
      }
      (this._initializeRequestHandler = null),
        this.GridDataDiv && window.$clearHandlers(this.GridDataDiv),
        this.GridHeaderDiv && window.$clearHandlers(this.GridHeaderDiv),
        this.GridFooterDiv && window.$clearHandlers(this.GridFooterDiv),
        this._groupPanel &&
          this._groupPanel.get_element() &&
          window.$clearHandlers(this._groupPanel.get_element()),
        (this._draggedItems = null),
        (this.Control = null),
        (this.GridDataDiv = null),
        (this.GridHeaderDiv = null),
        (this.GridFooterDiv = null),
        (this.PagerControl = null),
        (this.TopPagerControl = null),
        (this.MasterTableView = null),
        (this.MasterTableViewHeader = null),
        (this.MasterTableViewFooter = null),
        (this._hidedColumns = []),
        (this._showedColumns = []),
        this.get_isUsingODataSource() &&
          (this._flatBinder._source.remove_requestSucceeded(
            this._oDataRequestSucceededDelegate,
          ),
          (this._oDataRequestSucceededDelegate = null)),
        this.ClientSettings.AllowKeyboardNavigation &&
          this._documentKeyDownDelegate &&
          ($telerik.removeExternalHandler(
            document,
            "keydown",
            this._documentKeyDownDelegate,
          ),
          (this._documentKeyDownDelegate = null)),
        this.ClientSettings.AllowRowsDragDrop &&
          ($telerik.isTouchDevice &&
            ($telerik.removeMobileHandler(
              this.get_element(),
              "mousedown",
              this._onMouseDownDelegate,
            ),
            (this._onMouseDownDelegate = null)),
          $telerik.removeMobileHandler(
            document,
            "mouseup",
            this._documentMouseUpDelegate,
            null,
            !0,
          ),
          (this._documentMouseUpDelegate = null),
          $telerik.removeMobileHandler(
            document,
            "mousemove",
            this._documentMouseMoveDelegate,
            null,
            !0,
          ),
          (this._documentMouseMoveDelegate = null)),
        !this.ClientSettings.AllowRowsDragDrop &&
          this._documentMouseUpDelegate &&
          $telerik.isTouchDevice &&
          ($telerik.removeMobileHandler(
            document,
            "mouseup",
            this._documentMouseUpDelegate,
            null,
            !0,
          ),
          (this._documentMouseUpDelegate = null)),
        this.ClientSettings.Scrolling.AllowScroll &&
          $telerik.isTouchDevice &&
          ($telerik.removeMobileHandler(
            this.GridDataDiv,
            "mousedown",
            this._dataDivMouseDownDelegate,
          ),
          (this._dataDivMouseDownDelegate = null),
          $telerik.removeMobileHandler(
            this.GridDataDiv,
            "mouseup",
            this._dataDivMouseUpDelegate,
          ),
          (this._dataDivMouseUpDelegate = null),
          $telerik.removeMobileHandler(
            this.GridDataDiv,
            "mousemove",
            this._dataDivMouseMoveDelegate,
          ),
          (this._dataDivMouseMoveDelegate = null)),
        $telerik.isTouchDevice &&
          ($telerik.removeMobileHandler(
            this.GridDataDiv,
            "mousedown",
            this._swipeStartDelegate,
          ),
          (this._swipeStartDelegate = null),
          $telerik.removeMobileHandler(
            this.GridDataDiv,
            "mouseup",
            this._swipeEndDelegate,
          ),
          (this._swipeEndDelegate = null),
          $telerik.removeMobileHandler(
            this.GridDataDiv,
            "mousemove",
            this._swipeMoveDelegate,
          ),
          (this._swipeMoveDelegate = null)),
        (window[this.ClientID] = null),
        Telerik.Web.UI.RadGrid.callBaseMethod(this, "dispose");
    },
    _initializeRequest: function (e, t) {
      var i = t.get_postBackElement();
      if (
        t.get_postBackElement() == this.get_element() ||
        Telerik.Web.UI.Grid.IsChildOf(i, this.get_element())
      ) {
        if (this._statusLabelID) {
          for (
            var r = ["rgExpXLS", "rgExpDOC", "rgExpPDF", "rgExpCSV"],
              n = !0,
              l = i.className,
              o = 0,
              a = r.length;
            o < a;
            o++
          )
            if (-1 != l.indexOf(r[o])) {
              n = !1;
              break;
            }
          if (n && 1 != this.__isExporting) {
            var s = $get(this._statusLabelID);
            s &&
              ((s.title = this._loadingText), (s.style.visibility = "visible"));
          }
        }
        this._isAjaxRequest = !0;
      }
    },
    _initializeODataSourceBinder: function () {
      var e = this,
        t = e.get_odataClientSettings().ODataSourceID,
        i = $find(t);
      if (i)
        (e._flatBinder = new Telerik.Web.UI.RadODataDataSource.Binder.Flat(
          i,
          e,
        )),
          e._flatBinder.initialize(),
          (e._oDataRequestSucceededDelegate = Function.createDelegate(
            e,
            e._onODataRequestSucceeded,
          )),
          i.add_requestSucceeded(e._oDataRequestSucceededDelegate),
          e._onDataNeeded();
      else {
        var r = String.format(
          "DataSource with id {0} was not found on the page",
          t,
        );
        alert(r);
      }
    },
    _onDataNeeded: function (e) {
      var t = {
          events: {
            fail: function (e) {
              this._onFail(e);
            },
          },
        },
        i = { filter: {} };
      i.filter.filters = [];
      var r,
        n,
        l = this.get_masterTableView().get_filterExpressions();
      for (n = 0; n < l.get_count(); n++) {
        var o = (r = l.getItem(n)).get_fieldValue(),
          a = [];
        if ((o.split && (a = o.split(" ")), "Between" == r.FilterFunction))
          r.set_filterFunction("GreaterThanOrEqualTo"),
            r.set_fieldValue(a[0]),
            i.filter.filters.push(this._convertToODataFilterExprJson(r)),
            r.set_filterFunction("LessThanOrEqualTo"),
            r.set_fieldValue(a[1]),
            i.filter.filters.push(this._convertToODataFilterExprJson(r));
        else if ("NotBetween" == r.FilterFunction)
          r.set_filterFunction("LessThanOrEqualTo"),
            r.set_fieldValue(a[0]),
            i.filter.filters.push(this._convertToODataFilterExprJson(r)),
            r.set_filterFunction("GreaterThanOrEqualTo"),
            r.set_fieldValue(a[1]),
            i.filter.filters.push(this._convertToODataFilterExprJson(r)),
            (i.filter.logic = "or");
        else {
          if ("DoesNotContain" == r.FilterFunction) return;
          i.filter.filters.push(this._convertToODataFilterExprJson(r));
        }
      }
      var s = this.get_masterTableView().get_sortExpressions();
      for (i.sort = [], n = 0; n < s.get_count(); n++)
        (r = s.getItem(n)),
          i.sort.push({
            field: r.FieldName,
            dir: 1 == r.SortOrder ? "asc" : "desc",
          });
      (i.page = this.get_masterTableView().get_currentPageIndex()),
        (i.pageSize = this.get_masterTableView().get_pageSize()),
        null != t
          ? ((t.data = i), this._flatBinder.fetch(t))
          : this._flatBinder.fetch();
    },
    _onODataRequestSucceeded: function (e, t) {
      var i = this.get_masterTableView();
      if (this.ClientSettings.DataBinding.EnableCaching) {
        var r = this._getCacheKey(i);
        this._cache || (this._cache = {}),
          this._cache[r] || (this._cache[r] = t);
      }
      var n = t.get_data(),
        l = t.get_count(),
        o = new Telerik.Web.UI.GridDataSourceResolvedEventArgs(n);
      i.set_virtualItemCount(l),
        this.raise_dataSourceResolved(o),
        0 == i.get_virtualItemCount() && i._updatePager(),
        i.set_dataSource(n),
        i.dataBind();
    },
    _convertToODataFilterExprJson: function (e) {
      var t = {},
        i = e.get_fieldName();
      switch (e.FilterFunction) {
        case "EqualTo":
          t = this._getODataFilterExpressionJson(i, "eq", e.FieldValue);
          break;
        case "NotEqualTo":
          t = this._getODataFilterExpressionJson(i, "neq", e.FieldValue);
          break;
        case "GreaterThan":
          t = this._getODataFilterExpressionJson(i, "gt", e.FieldValue);
          break;
        case "LessThan":
          t = this._getODataFilterExpressionJson(i, "lt", e.FieldValue);
          break;
        case "GreaterThanOrEqualTo":
          t = this._getODataFilterExpressionJson(i, "gte", e.FieldValue);
          break;
        case "LessThanOrEqualTo":
          t = this._getODataFilterExpressionJson(i, "lte", e.FieldValue);
          break;
        case "StartsWith":
          t = this._getODataFilterExpressionJson(i, "startswith", e.FieldValue);
          break;
        case "EndsWith":
          t = this._getODataFilterExpressionJson(i, "endswith", e.FieldValue);
          break;
        case "Contains":
        case "Between":
          t = this._getODataFilterExpressionJson(i, "contains", e.FieldValue);
          break;
        case "IsEmpty":
          t = this._getODataFilterExpressionJson(i, "eq", "");
          break;
        case "NotIsEmpty":
          t = this._getODataFilterExpressionJson(i, "neq", "");
          break;
        case "IsNull":
          t = this._getODataFilterExpressionJson(i, "eq", null);
          break;
        case "NotIsNull":
          t = this._getODataFilterExpressionJson(i, "neq", null);
      }
      return t;
    },
    _getODataFilterExpressionJson: function (e, t, i) {
      return { field: e, operator: t, value: i };
    },
    get_flatModel: function () {
      var e = this.get_odataClientSettings(),
        t = Telerik.Web.UI.RadODataDataSource.Binder.Flat.Model(e);
      return (
        (t.parse = function (e) {
          return e;
        }),
        t
      );
    },
    get_allowActiveRowCycle: function () {
      return this.ClientSettings.KeyboardNavigationSettings.AllowActiveRowCycle;
    },
    set_allowActiveRowCycle: function (e) {
      this.ClientSettings.KeyboardNavigationSettings.AllowActiveRowCycle = e;
    },
    get_odataClientSettings: function () {
      return this._odataClientSettings;
    },
    set_odataClientSettings: function (e) {
      this._odataClientSettings = e;
    },
    get_isUsingODataSource: function () {
      return null != this._odataClientSettings;
    },
    get_selectedCellsIndexes: function () {
      return this._selectedCellsIndexes;
    },
    get_selectedItemsInternal: function () {
      return this._selectedItemsInternal;
    },
    set_selectedItemsInternal: function (e) {
      this._selectedItemsInternal != e && (this._selectedItemsInternal = e);
    },
    get_expandItems: function () {
      return this._expandItems;
    },
    set_expandItems: function (e) {
      this._expandItems != e && (this._expandItems = e);
    },
    get_hidedColumns: function () {
      return this._hidedColumns;
    },
    set_hidedColumns: function (e) {
      this._hidedColumns != e &&
        ((this._hidedColumns = e), this.updateClientState());
    },
    get_showedColumns: function () {
      return this._showedColumns;
    },
    set_showedColumns: function (e) {
      this._showedColumns != e &&
        ((this._showedColumns = e), this.updateClientState());
    },
    get_groupColsState: function () {
      return this._groupColsState;
    },
    set_groupColsState: function (e) {
      this._groupColsState != e &&
        ((this._groupColsState = e), this.updateClientState());
    },
    get_hierarchyColsExpandedState: function () {
      return this._hierarchyColsExpandedState;
    },
    set_hierarchyColsExpandedState: function (e) {
      this._hierarchyColsExpandedState != e &&
        ((this._hierarchyColsExpandedState = e), this.updateClientState());
    },
    get_selectedCellsInternal: function () {
      return this._selectedCellsInternal;
    },
    set_selectedCellsInternal: function (e) {
      this._selectedCellsInternal != e && (this._selectedCellsInternal = e);
    },
    get_unselectableItemsInternal: function () {
      return this._unselectableItemsInternal;
    },
    set_unselectableItemsInternal: function (e) {
      this._unselectableItemsInternal != e &&
        (this._unselectableItemsInternal = e);
    },
    get_allowCellSelection: function () {
      return (
        this.ClientSettings.Selecting.CellSelectionMode >
        Telerik.Web.UI.GridCellSelectionMode.None
      );
    },
    get_allowMutliCellSelection: function () {
      return (
        this.ClientSettings.Selecting.CellSelectionMode >
        Telerik.Web.UI.GridCellSelectionMode.SingleCell
      );
    },
    get_allowColumnSelection: function () {
      return (
        this.ClientSettings.Selecting.CellSelectionMode >
        Telerik.Web.UI.GridCellSelectionMode.MultiCell
      );
    },
    get_allowMultiColumnSelection: function () {
      return (
        this.ClientSettings.Selecting.CellSelectionMode >
        Telerik.Web.UI.GridCellSelectionMode.Column
      );
    },
    get_allowMultiRowSelection: function () {
      return this.AllowMultiRowSelection;
    },
    set_allowMultiRowSelection: function (e) {
      this.AllowMultiRowSelection != e && (this.AllowMultiRowSelection = e);
    },
    get_masterTableView: function () {
      return $find(this._masterClientID);
    },
    get_masterTableViewHeader: function () {
      return $find(this._masterClientID + "_Header");
    },
    get_masterTableViewFooter: function () {
      return $find(this._masterClientID + "_Footer");
    },
    get_selectedItems: function () {
      for (var e = [], t = 0; t < this._selectedItemsInternal.length; t++)
        Array.add(e, this._getRow(this._selectedItemsInternal[t].id));
      return e;
    },
    get_editIndexes: function () {
      return this._editIndexes;
    },
    get_editItems: function () {
      var e,
        t = [],
        i = this.get_masterTableView();
      function r(e, t) {
        var i = document.getElementById(e.get_id() + "__" + t);
        return i ? (e.get_dataItems(), $find(i.id)) : null;
      }
      for (var n = 0, l = this._editIndexes.length; n < l; n++) {
        var o = this._editIndexes[n];
        if (o.indexOf(":") > -1) {
          for (var a = 0; a < this._detailTables.length; a++)
            if ((e = r(this._detailTables[a], o))) {
              t[t.length] = e;
              break;
            }
        } else (e = r(i, o)) && (t[t.length] = e);
      }
      return t;
    },
    get_batchEditingManager: function () {
      return this._batchEditing;
    },
    clearSelectedItems: function () {
      var e = this,
        t = e._selectedItemsInternal,
        i = e._selectedIndexes;
      if (t.length > 0)
        for (var r = t.length - 1; r >= 0; ) {
          var n = t[r],
            l = $find(n.id);
          if (l) l.set_selected(!1);
          else {
            var o = $get(n.id);
            o
              ? e._selection._selectRowInternal(o, { ctrlKey: !1 }, !0, !0, !0)
              : (Array.remove(t, n),
                Array.remove(i, i[r]),
                e.updateClientState());
          }
          r--;
        }
    },
    clearSelectedCells: function () {
      null != this._cellSelection && this._cellSelection._clear();
    },
    _initializeTableViews: function () {
      for (
        var _gridTableViewsDataInternal = eval(this._gridTableViewsData), i = 0;
        i < _gridTableViewsDataInternal.length;
        i++
      ) {
        var data = _gridTableViewsDataInternal[i];
        if (
          data.ClientID &&
          null == $find(data.ClientID) &&
          null != $get(data.ClientID)
        ) {
          this._masterClientID != data.ClientID &&
            this.raise_tableCreating(new Sys.EventArgs());
          var tableView = $create(
            Telerik.Web.UI.GridTableView,
            { _owner: this, _data: data },
            null,
            null,
            $get(data.ClientID),
          );
          if (this._masterClientID != data.ClientID) {
            var args = new Sys.EventArgs();
            (args.get_tableView = function () {
              return tableView;
            }),
              Array.add(this._detailTables, tableView),
              this.raise_tableCreated(args);
          }
          this._masterClientID == data.ClientID &&
            (this.raise_masterTableViewCreating(new Sys.EventArgs()),
            (this.MasterTableView = tableView),
            this.raise_masterTableViewCreated(new Sys.EventArgs()),
            $get(data.ClientID + "_Header") &&
              ((this.MasterTableViewHeader = $create(
                Telerik.Web.UI.GridTableView,
                { _owner: this, _data: data },
                null,
                null,
                $get(data.ClientID + "_Header"),
              )),
              (this.MasterTableView._columnsInternal =
                this.MasterTableViewHeader._columnsInternal)),
            $get(data.ClientID + "_Footer") &&
              (this.MasterTableViewFooter = $create(
                Telerik.Web.UI.GridTableView,
                { _owner: this, _data: data },
                null,
                null,
                $get(data.ClientID + "_Footer"),
              )));
        }
      }
    },
    get_detailTables: function () {
      return this._detailTables;
    },
    get_enableAriaSupport: function () {
      return this._enableAriaSupport;
    },
    _initializeAriaSupport: function () {
      var e,
        t,
        i,
        r,
        n,
        l,
        o = this.get_element(),
        a = this._renderMode === Telerik.Web.UI.RenderMode.Lite,
        s = this.ClientSettings,
        d = function (e) {
          if (
            (e.setAttribute("role", "columnheader"),
            e.parentNode.getAttribute("role") ||
              e.parentNode.setAttribute("role", "row"),
            e.getElementsByTagName("a")[0])
          ) {
            var t = e.getElementsByTagName("input")[0];
            t
              ? t.className.indexOf("rgSortAsc") > -1
                ? e.setAttribute("aria-sort", "ascending")
                : t.className.indexOf("rgSortDesc") > -1 &&
                  e.setAttribute("aria-sort", "descending")
              : e.setAttribute("aria-sort", "none");
          }
        };
      if (o.querySelectorAll)
        for (
          e = 0, i = (l = o.querySelectorAll("th.rgHeader")).length;
          e < i;
          e++
        )
          d(l[e]);
      else
        for (e = 0, i = (l = o.getElementsByTagName("th")).length; e < i; e++) {
          var h = l[e];
          h.className.indexOf("rgHeader") > -1 && d(h);
        }
      var u,
        _,
        g = o.getElementsByTagName("td");
      for (e = 0, i = g.length; e < i; e++) {
        var c = (r = (n = g[e]).parentNode).className;
        if (
          n.className.indexOf("rgExpandCol") > -1 ||
          n.className.indexOf("rgGroupCol") > -1
        ) {
          if (
            (n.setAttribute("role", "gridcell"),
            r.setAttribute("role", "row"),
            c.indexOf("rgGroupHeader") > -1 || r.id)
          ) {
            var m = n.getElementsByTagName(a ? "button" : "input")[0];
            m &&
              (a || m.setAttribute("role", "button"),
              m.className.indexOf("rgCollapse") > -1
                ? (n.setAttribute("aria-expanded", "true"),
                  m.setAttribute("aria-expanded", "true"))
                : m.className.indexOf("rgExpand") > -1 &&
                  (n.setAttribute("aria-expanded", "false"),
                  m.setAttribute("aria-expanded", "false"))),
              c.indexOf("rgGroupHeader") > -1 &&
                !r.getAttribute("role") &&
                r.setAttribute("role", "row");
          }
        } else if (
          c.indexOf("rgRow") > -1 ||
          c.indexOf("rgAltRow") > -1 ||
          c.indexOf("rgFooter") > -1
        )
          n.setAttribute("role", "gridcell"),
            r.getAttribute("role") ||
              (r.setAttribute("role", "row"),
              c.indexOf("rgSelectedRow") > -1 &&
                (r.setAttribute("aria-selected", "true"), (r.tabIndex = 1)));
        else if (
          n.className.indexOf("rgCommandCell") > -1 &&
          !r.getAttribute("role")
        )
          n.setAttribute("role", "presentation"),
            r.setAttribute("role", "presentation");
        else if (
          r.className.indexOf("rgPager") > -1 &&
          !r.getAttribute("role")
        ) {
          r.setAttribute("role", "presentation");
          var p = r.getElementsByTagName("div"),
            f = r.querySelector(".rgPager .RadComboBox .rcbInner button");
          if (f) {
            var w = $telerik.findElement(
              f.parentNode,
              "PageSizeComboBox_Input",
            );
            (f.value = w.title), w.setAttribute("aria-label", w.title);
          }
          for (var C = 0; C < p.length; C++) {
            var I = p[C];
            if (I.className && I.className.indexOf("rgWrap") > -1) {
              var v = I.getElementsByTagName("input");
              for (t = 0; t < v.length; t++) {
                var T = v[t],
                  b = T.className;
                "submit" == T.type &&
                  b &&
                  (b.indexOf("PagePrev") > -1 ||
                    b.indexOf("PageFirst") > -1 ||
                    b.indexOf("PageNext") > -1 ||
                    b.indexOf("PageLast") > -1 ||
                    b.indexOf("PagerButton") > -1) &&
                  T.setAttribute("role", "button");
              }
            }
          }
        } else if (
          r.className.indexOf("rgEditRow") > -1 &&
          !r.getAttribute("role")
        )
          r.setAttribute("role", "row"), r.removeAttribute("aria-readonly");
        else if (!r.id) {
          var y =
            "table" === r.parentNode.tagName.toLowerCase()
              ? r.parentNode
              : r.parentNode.parentNode;
          ((y && y.className.indexOf("rgMasterTable") > -1) ||
            y.className.indexOf("rgDetailTable") > -1) &&
            (r.getAttribute("role") || r.setAttribute("role", "presentation"));
        }
      }
      if (
        (this._groupPanel &&
          this._groupPanel.get_element().setAttribute("role", "presentation"),
        this.ClientSettings.Scrolling &&
          this.ClientSettings.Scrolling.UseStaticHeaders)
      ) {
        u = $telerik
          .$(o)
          .find(".rgDataDiv>table.rgMasterTable, table.rgDetailTable");
        var S = $telerik
          .$(o)
          .find("table[id$=Pager], table[id$=Header],table[id$=Footer]");
        S.removeAttr("summary"),
          S.find("th:empty").remove(),
          S.find("thead:empty").remove(),
          S.attr("role", "presentation");
        var D = "",
          k = "",
          x = "",
          G = (_ = $telerik.$(o).find(".rgDataDiv>table.rgMasterTable")).find(
            "tbody",
          );
        G.length > 0 && ((D = G.parent()[0].id + "_tbody"), G.attr("id", D));
        var N = $telerik.$(o).find("table[id$=Header]>thead");
        N.length > 0 && ((k = N.parent()[0].id + "_thead"), N.attr("id", k));
        var F = $telerik.$(o).find("table[id$=Footer]>tbody");
        F.length > 0 && ((x = F.parent()[0].id + "_tbody"), F.attr("id", x)),
          _.attr("aria-owns", k + " " + D + " " + x),
          $telerik.$(o).find("table[id$=TopPager]").attr("role", "toolbar");
      } else
        (u = $telerik.$(o).find("table.rgMasterTable, table.rgDetailTable")),
          (_ = $telerik.$(o).find("table.rgMasterTable"));
      var R = this;
      if (
        (u.each(function () {
          this.setAttribute("role", "grid"),
            s.Selecting.AllowRowSelect &&
              R.get_allowMultiRowSelection() &&
              this.setAttribute("aria-multiselectable", "true");
        }),
        this._detailTables.length && _.attr("role", "treegrid"),
        this._getHeaderContextMenu())
      ) {
        $telerik
          .$(o)
          .find(".rgOptions")
          .each(function () {
            this.setAttribute("aria-label", "Column Menu");
          });
        var U = this._getHeaderContextMenu(),
          E = U.findItemByValue("FilterMenuParent");
        if (E && E.get_element()) {
          var W = $telerik.$(E.get_element());
          W.find('input[id$="FirstCond_Input"]').attr(
            "aria-label",
            "First Condition Filter Function",
          ),
            W.find('input[id$="SecondCond_Input"]').attr(
              "aria-label",
              "Second Condition Filter Function",
            ),
            W.find(
              'input[id$="FirstCond"], input[id$="FirstCond_dateInput"]',
            ).attr("aria-label", "First Condition Filter Value"),
            W.find(
              'input[id$="SecondCond"], input[id$="SecondCond_dateInput"]',
            ).attr("aria-label", "Second Condition Filter Value");
        }
        var M = U.findItemByValue("FilterList");
        if (M && M.get_element())
          $telerik
            .$(M.get_element())
            .find('input[id$="filterCheckListSearch"]')
            .attr("aria-label", "Filter Checklist Search");
      }
    },
    _initializeEvents: function (e) {
      if (e)
        for (var t = 0, i = e.length; t < i; t++) {
          var r = e[t];
          (this["add_" + r] = (function (e) {
            return function (t) {
              this.get_events().addHandler(e, t);
            };
          })(r)),
            (this["remove_" + r] = (function (e) {
              return function (t) {
                this.get_events().removeHandler(e, t);
              };
            })(r)),
            (this["raise_" + r] = (function (e) {
              return function (t) {
                this.raiseEvent(e, t);
              };
            })(r));
        }
    },
    _selectAllRows: function (e, t, i) {
      for (
        var r = i.srcElement ? i.srcElement : i.target,
          n = $find(e).get_element(),
          l = !!r.checked,
          o = 0,
          a = n.rows.length;
        o < a;
        o++
      ) {
        var s = n.rows[o];
        s.id &&
          "none" != s.style.display &&
          this._selection._selectRowInternal(s, i, !0, !1, !1, l);
      }
      n.rows.length > 0 && this.updateClientState();
    },
    _showFilterMenu: function (e, t, i) {
      var r = $find(e),
        n = r.getColumnByUniqueName(t),
        l = this,
        o = this._getFilterMenu();
      if (o) {
        o.hide();
        var a = new Sys.CancelEventArgs();
        if (
          ((a.get_menu = function () {
            return o;
          }),
          (a.get_tableView = function () {
            return r;
          }),
          (a.get_column = function () {
            return n;
          }),
          (a.get_domEvent = function () {
            return i;
          }),
          this.raise_filterMenuShowing(a),
          a.get_cancel())
        )
          return;
        var s = this._filterMenu;
        this._buildFilterMenuItemList(
          s,
          n._data.FilterListOptions,
          n._data.DataTypeName,
          n._data.CurrentFilterFunction,
          n,
        ),
          (this._onFilterMenuClicking = Function.createDelegate(
            this,
            this._filterMenuClickingHandler,
          )),
          s.add_itemClicking(this._onFilterMenuClicking);
        var d = Telerik.Web.UI.Grid.GetCurrentElement(i);
        if (
          (d && $telerik.addCssClasses(d, ["rgFilterActive"]),
          (this._onFilterMenuHiddenDelegate = Function.createDelegate(
            { opener: d, context: this },
            this._onFilterMenuHidden,
          )),
          s.add_hidden(this._onFilterMenuHiddenDelegate),
          $telerik.isTouchDevice)
        ) {
          var h = $telerik.getTouchEventLocation(i).x,
            u = $telerik.getTouchEventLocation(i).y;
          s.showAt(h, u), $telerik.preventDefault(i);
        } else {
          var _ = $telerik.getLocation(d);
          s.showAt(_.x + d.offsetWidth / 2, _.y + d.offsetHeight / 2),
            $telerik.preventDefault(i);
        }
        var g = function () {
          s.remove_expandAnimationEnded(g), l._focusFirstItem();
        };
        if (
          (s.add_expandAnimationEnded(g),
          (s._shown = !1),
          window.setTimeout(function () {
            s._shown = !0;
          }),
          r._owner._enableRippleEffect)
        ) {
          var c = $telerik
              .$(s.get_contextMenuElement())
              .find(".rgFilterApply")[0],
            m = $telerik
              .$(s.get_contextMenuElement())
              .find(".rgFilterCancel")[0];
          c &&
            Telerik.Web.UI.MaterialRippleManager.getInstance().initializeRipple(
              c,
            ),
            m &&
              Telerik.Web.UI.MaterialRippleManager.getInstance().initializeRipple(
                m,
              );
        }
      }
    },
    _focusFirstItem: function () {
      var e = this._filterMenu,
        t = e.get_focusedItem() || e.get_items().getItem(0);
      t._linkElement
        ? t._linkElement.focus()
        : t._templateElement && t._templateElement.focus();
    },
    _onFilterMenuHidden: function (e, t) {
      this.opener &&
        ($telerik.removeCssClasses(this.opener, ["rgFilterActive"]),
        (this.opener = null)),
        this.context &&
          this.context._filterMenu &&
          (this.context._onFilterMenuClicking &&
            this.context._filterMenu.remove_itemClicking(
              this.context._onFilterMenuClicking,
            ),
          this.context._onFilterMenuHiddenDelegate &&
            this.context._filterMenu.remove_hidden(
              this.context._onFilterMenuHiddenDelegate,
            ),
          this.context._onFilterMenuShown &&
            this.context._filterMenu.remove_expandAnimationEnded(
              this.context._onFilterMenuShown,
            ),
          (this.context._onFilterMenuHiddenDelegate = null),
          (this.context._onFilterMenuShown = null));
    },
    _getFilterMenu: function () {
      return (
        Telerik.Web.UI.RadContextMenu &&
          !this._filterMenu &&
          (this._filterMenu = $find(this.ClientID + "_rfltMenu")),
        this._filterMenu
      );
    },
    get_headerMenu: function () {
      return this._getHeaderContextMenu();
    },
    _getHeaderContextMenu: function () {
      return (
        Telerik.Web.UI.RadContextMenu &&
          !this._headerContextMenu &&
          (this._headerContextMenu = $find(this.ClientID + "_rghcMenu")),
        this._headerContextMenu
      );
    },
    _filterMenuClickingHandler: function (e, t) {
      var i = t.get_item()._filterMenu_tableID;
      if (i) {
        var r = $find(i);
        if (r) {
          var n = t.get_item().get_value(),
            l = t.get_item()._filterMenu_column_uniqueName,
            o = r._getFilterControlValue(l),
            a = r._raiseAction("Filter", {
              filterFunction: n,
              columnUniqueName: l,
              filterValue: o,
            });
          if (a.get_cancel())
            return t.get_item().set_focused(!1), void t.set_cancel(!0);
          if (
            ((n = a.get_filterFunction()),
            (l = a.get_columnUniqueName()),
            (o = a.get_filterValue()),
            "NoFilter" == n)
          )
            r._updateFilterControlValue(o, l, n);
          else if (
            (null == o || "" === o) &&
            "IsEmpty" != n &&
            "NotIsEmpty" != n &&
            "IsNull" != n &&
            "NotIsNull" != n
          )
            return void e.hide();
          if (!r.filter(l, o, n)) {
            var s = this.get_masterTableView();
            s && (s.__shouldPerformFiltering = !1),
              t.set_cancel(!0),
              this._filterMenu.remove_itemClicking(this._onFilterMenuClicking);
          }
          e.hide();
        } else t.set_cancel(!0);
      } else t.set_cancel(!0);
    },
    _checkListItemsRequestedHandler: function () {
      if (
        this._checkListFilterActiveColumn &&
        this._checkListFilterActiveColumn
      ) {
        var e = $find(this._filterCheckListClientID);
        e.set_visible(!0);
        var t,
          i,
          r,
          n,
          l =
            this._checkListFilterActiveColumn.get_owner()._data.UniqueID +
            "," +
            this._checkListFilterActiveColumn.get_uniqueName(),
          o = -1;
        for (t = 0; t < this._checkListFilterKeys.length; t++)
          if (this._checkListFilterKeys[t] == l) {
            o = t;
            break;
          }
        if (
          o >= 0 &&
          o < this._checkListFilterValues.length &&
          this._checkListFilterValues[o] &&
          this._checkListFilterValues[o].length > 0
        ) {
          var a = {};
          for (t = 0; t < this._checkListFilterValues[o].length; t++)
            a[this._checkListFilterValues[o][t]] = !0;
          for (n = e.get_items().get_count(), r = 0; r < n; r++)
            a[(i = e.get_items().getItem(r)).get_value()] && i.check();
        }
        for (n = e.get_items().get_count(), r = 0; r < n; r++)
          "" === (i = e.get_items().getItem(r)).get_text() &&
            i.set_text("(null)"),
            (i.get_element().title = i.get_text());
      }
    },
    _checkListFilterCancelButtonHandler: function () {
      this._filterMenu.hide();
    },
    _resetCheckListFilterOfColumn: function (e) {
      for (
        var t = e.get_owner()._data.UniqueID + "," + e.get_uniqueName(),
          i = this._checkListFilterKeys.length,
          r = 0;
        r < this._checkListFilterKeys.length;
        r++
      )
        if (this._checkListFilterKeys[r] == t) {
          i = r;
          break;
        }
      return (
        (this._checkListFilterKeys[i] = t),
        (this._checkListFilterValues[i] = []),
        i
      );
    },
    _checkListFilterApplyButtonHandler: function () {
      var e = $find(this._filterCheckListClientID),
        t = this._checkListFilterActiveColumn,
        i = this._resetCheckListFilterOfColumn(t),
        r = $find(t.get_owner().get_id().replace("_Header", "")),
        n = "rgFiltered",
        l = r._getFilterCellByColumnUniqueName(t.get_uniqueName()),
        o = l ? $telerik.getElementByClassName(l, "rgFilter") : null,
        a = e.get_items()._array;
      if (!e._allChecked)
        for (var s = 0; s < a.length; s++)
          if (a[s].get_checkBoxElement().checked) {
            var d = a[s].get_value();
            "(null)" === d && (d = ""),
              (this._checkListFilterValues[i][
                this._checkListFilterValues[i].length
              ] = d);
          }
      var h = r._filterExpressions.find(t.get_uniqueName());
      this._checkListFilterValues[i].length > 0
        ? (h ||
            ((h = new Telerik.Web.UI.GridFilterExpression()).set_fieldName(
              t._data.DataField,
            ),
            h.set_dataTypeName(t._data.DataTypeName),
            h.set_columnUniqueName(t.get_uniqueName()),
            r._filterExpressions.add(h)),
          o && Sys.UI.DomElement.addCssClass(o, n),
          h.set_filterFunction(Telerik.Web.UI.GridFilterFunction.EqualTo),
          (h._checkListFilterValues = this._checkListFilterValues[i]))
        : (h &&
            (h.set_filterFunction(Telerik.Web.UI.GridFilterFunction.NoFilter),
            (h._checkListFilterValues = this._checkListFilterValues[i]),
            r._filterExpressions.remove(h)),
          o && Sys.UI.DomElement.removeCssClass(o, n)),
        this._filterMenu.hide(),
        this.updateClientState(),
        this._checkListIsInHeaderContextMenu ||
          r.fireCommand(
            "Filter",
            t.get_uniqueName() +
              "|?|?" +
              (h
                ? Telerik.Web.UI.GridFilterFunction.EqualTo
                : Telerik.Web.UI.GridFilterFunction.NoFilter),
          );
    },
    _buildFilterMenuItemList: function (e, t, i, r, n) {
      var l = n._data.ColumnType,
        o = n._data.EnableRangeFiltering,
        a = null,
        s = $find(this._filterCheckListClientID || "");
      if (s) {
        (this._checkListFilterActiveColumn = n), s.get_items().clear();
        var d = "";
        if (
          n._owner._data.CheckListWebServicePath &&
          n._data.FilterCheckListWebServiceMethod
        )
          s.set_visible(!0),
            s
              .get_webServiceSettings()
              .set_path(n._owner._data.CheckListWebServicePath),
            s
              .get_webServiceSettings()
              .set_method(n._data.FilterCheckListWebServiceMethod),
            s.requestItems();
        else if (n._data.FilterCheckListEnableLoadOnDemand) {
          s.set_visible(!0);
          var h = {
            columnUniqueName: n.get_uniqueName(),
            tableViewUniqueId: n._owner._data.UniqueID,
          };
          s._doLoadOnDemandWithCallBack(h, { startIndex: 0, count: 0 });
        } else s.set_visible(!1), (d = "None");
        (this._filterApplyButton.style.display = d),
          (this._filterCancelButton.style.display = d);
      }
      e.get_items().get_count() > 0 &&
        e.get_items().getItem(0).get_items().get_count() > 0 &&
        (e = e.get_items().getItem(0));
      for (var u = 0; u < e.get_items().get_count(); u++) {
        var _ = e.get_items().getItem(u);
        (a = _.get_value()),
          (_._filterMenu_column_uniqueName = n.get_uniqueName()),
          (_._filterMenu_tableID = n._owner._data.ClientID),
          !this._clientSideBinding ||
          !this._clientSideBinding._clientDataSource ||
          ("DoesNotContain" != a &&
            "IsEmpty" != a &&
            "NotIsEmpty" != a &&
            "IsNull" != a &&
            "NotIsNull" != a &&
            ("Between" != a || ("GridDateTimeColumn" == l && o)) &&
            ("NotBetween" != a || ("GridDateTimeColumn" == l && o)))
            ? ("System.Boolean" != i ||
                ("GreaterThan" != a &&
                  "LessThan" != a &&
                  "GreaterThanOrEqualTo" != a &&
                  "LessThanOrEqualTo" != a &&
                  "Between" != a &&
                  "NotBetween" != a)) &&
              ("System.String" == i ||
                ("StartsWith" != a &&
                  "EndsWith" != a &&
                  "Contains" != a &&
                  "DoesNotContain" != a &&
                  "IsEmpty" != a &&
                  "NotIsEmpty" != a)) &&
              (0 != t || "Custom" != a) &&
              ("GridDateTimeColumn" != l ||
                !o ||
                ("EqualTo" != a &&
                  "GreaterThan" != a &&
                  "GreaterThanOrEqualTo" != a &&
                  "LessThan" != a &&
                  "LessThanOrEqualTo" != a &&
                  "NotEqualTo" != a)) &&
              ((("GridDateTimeColumn" != l || o) &&
                "GridMaskedColumn" != l &&
                "GridNumericColumn" != l &&
                "GridRatingColumn" != l) ||
                ("Between" != a && "NotBetween" != a))
              ? (a == n._data.CurrentFilterFunctionName
                  ? ((_._focused = !0),
                    (e._focusedItem = _),
                    _._updateLinkClass())
                  : ((_._focused = !1), _._updateLinkClass()),
                _.set_visible(!0))
              : _.set_visible(!1)
            : _.set_visible(!1);
      }
    },
    saveClientState: function () {
      var e = {};
      if (
        ((e.selectedIndexes = this._selectedIndexes),
        (e.selectedCellsIndexes = this._selectedCellsIndexes),
        (e.unselectableItemsIndexes = this._unselectableItemsIndexes),
        (e.reorderedColumns = this._reorderedColumns),
        (e.expandedItems = this._expandedItems),
        (e.expandedGroupItems = this._expandedGroupItems),
        this._expandedFilterItems &&
          (e.expandedFilterItems = this._expandedFilterItems),
        (e.deletedItems = this._deletedItems),
        "" != this._resizedColumns && (e.resizedColumns = this._resizedColumns),
        "" != this._resizedControl && (e.resizedControl = this._resizedControl),
        "" != this._resizedItems && (e.resizedItems = this._resizedItems),
        "" != this._hidedItems && (e.hidedItems = this._hidedItems),
        "" != this._showedItems && (e.showedItems = this._showedItems),
        this._hidedColumns && (e.hidedColumns = this._hidedColumns),
        this._showedColumns && (e.showedColumns = this._showedColumns),
        this._groupColsState && (e.groupColsState = this._groupColsState),
        this._hierarchyColsExpandedState &&
          (e.hierarchyState = this._hierarchyColsExpandedState),
        this._activeRow && (e.activeRowIndex = this._activeRow.id),
        this._gridDataDiv)
      ) {
        var t = this.get_masterTableView(),
          i = t._virtualization,
          r =
            i && i._haveCustomScrollbar && i._scrollbar
              ? i._scrollbar.scrollTop
              : this._gridDataDiv.scrollTop;
        $get(this.ClientID + "_Frozen")
          ? (e.scrolledPosition =
              r + "," + $get(this.ClientID + "_Frozen").scrollLeft)
          : (e.scrolledPosition = r + "," + this._gridDataDiv.scrollLeft),
          i &&
            t.get_allowPaging() &&
            t.get_currentPageIndex() > 0 &&
            (e.currentPageIndex = t.get_currentPageIndex()),
          i &&
            i._itemAtTop &&
            ((e.itemAtTop = i._itemAtTop), (e.startIndex = i._startIndex));
      }
      this._popUpLocations && (e.popUpLocations = this._popUpLocations),
        this._draggedItemsIndexes &&
          (e.draggedItemsIndexes = this._draggedItemsIndexes),
        this._shouldFocusOnPage &&
          (e.shouldFocusOnPage = this._shouldFocusOnPage);
      var n = this._selection;
      return (
        n &&
          null != n._lastSelectedItemIndex &&
          (e.lastSelectedItemIndex = n._lastSelectedItemIndex),
        this._checkListFilterKeys &&
          this._checkListFilterKeys.length > 0 &&
          ((e.checkListFilterKeys = this._checkListFilterKeys),
          (e.checkListFilterValues = this._checkListFilterValues)),
        Sys.Serialization.JavaScriptSerializer.serialize(e)
      );
    },
    _attachDomEvents: function () {
      (this._onKeyDownDelegate = Function.createDelegate(
        this,
        this._onKeyDownHandler,
      )),
        (this._onKeyPressDelegate = Function.createDelegate(
          this,
          this._onKeyPressHandler,
        )),
        (this._onMouseMoveDelegate = Function.createDelegate(
          this,
          this._onMouseMoveHandler,
        )),
        window.$addHandler(
          this.get_element(),
          "keydown",
          this._onKeyDownDelegate,
        ),
        window.$addHandler(
          this.get_element(),
          "keypress",
          this._onKeyPressDelegate,
        ),
        window.$addHandler(
          this.get_element(),
          "mousemove",
          this._onMouseMoveDelegate,
        );
    },
    _detachDomEvents: function () {
      this._onKeyDownDelegate &&
        (window.$removeHandler(
          this.get_element(),
          "keydown",
          this._onKeyDownDelegate,
        ),
        (this._onKeyDownDelegate = null)),
        this._onKeyPressDelegate &&
          (window.$removeHandler(
            this.get_element(),
            "keypress",
            this._onKeyPressDelegate,
          ),
          (this._onKeyPressDelegate = null)),
        this._onMouseMoveDelegate &&
          (window.$removeHandler(
            this.get_element(),
            "mousemove",
            this._onMouseMoveDelegate,
          ),
          (this._onMouseMoveDelegate = null));
    },
    _onMouseMoveHandler: function (e) {
      var t = Telerik.Web.UI.Grid.GetCurrentElement(e);
      this.ClientSettings &&
        this.ClientSettings.Resizing.AllowRowResize &&
        (null == this._gridItemResizer &&
          (this._gridItemResizer = new Telerik.Web.UI.GridItemResizer(this)),
        this._gridItemResizer._detectResizeCursorsOnItems(e, t),
        this._gridItemResizer._moveItemResizer(e));
    },
    _onKeyDownHandler: function (e) {
      var t = e.keyCode || e.charCode;
      e.charCode &&
        (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0)),
        this._isShortCutKeyPressed(e) && this._raiseKeyPressInternal(e),
        t == this.ClientSettings.KeyboardNavigationSettings.DeleteActiveRow &&
          this._raiseKeyPressInternal(e);
      var i = t >= 37 && t <= 40,
        r = 33 == t || 34 == t;
      ((($telerik.isChrome ||
        (Telerik.Web.Browser.ff &&
          parseInt(Telerik.Web.Browser.fullVersion) >= 65) ||
        Telerik.Web.Browser.edge ||
        $telerik.isIE ||
        $telerik.isSafari ||
        $telerik.isOpera) &&
        (i || r)) ||
        (($telerik.isChrome || $telerik.isSafari || $telerik.isOpera) &&
          t ==
            this.ClientSettings.KeyboardNavigationSettings
              .ExitEditInsertModeKey)) &&
        this._raiseKeyPressInternal(e),
        this.ClientSettings &&
          this.ClientSettings.AllowKeyboardNavigation &&
          this.get_batchEditingManager() &&
          this.get_batchEditingManager()._handleKeyboardNavigation(e);
    },
    _onKeyPressHandler: function (e) {
      this._raiseKeyPressInternal(e);
    },
    _raiseKeyPressInternal: function (e) {
      var t = new Telerik.Web.UI.GridKeyPressEventArgs(e);
      this.raise_keyPress(t),
        t.get_cancel() || this._handleGridKeyboardAction(e);
    },
    _validateEditInsertForm: function (e) {
      if (
        this.ValidationSettings.EnableValidation &&
        this.ValidationSettings.CommandsToValidate.toString().indexOf(e) > -1
      ) {
        var t = this._validationGroup;
        if ("function" == typeof Page_ClientValidate)
          if (1 != Page_ClientValidate(t)) return !1;
      }
      return !0;
    },
    _getTableViewByControlIntoIt: function (e) {
      var t,
        i = e.id.split("_"),
        r = 0;
      for (t = 0; t < i.length; t++) i[t].indexOf("Detail") > -1 && (r = t);
      var n = "",
        l = [];
      if (r > 0) {
        for (t = 0; t < r + 1; t++) l.push(i[t]);
        n = l.join("_");
      }
      if (!n) {
        for (
          var o = Telerik.Web.UI.Grid.GetFirstParentByTagName(e, "table");
          o && -1 == o.id.indexOf(this.ClientID);

        )
          o = Telerik.Web.UI.Grid.GetFirstParentByTagName(
            o.parentNode,
            "table",
          );
        o && (n = o.id);
      }
      var a = $find(n);
      return a || (a = this.get_masterTableView()), a;
    },
    _cancelDefaultAction: function (e) {
      e.preventDefault && e.preventDefault(),
        (e.returnValue = !1),
        e.stopPropagation && (e.stopPropagation(), (e.cancelBubble = !0));
    },
    _handleGridKeyboardAction: function (e) {
      var t = e.keyCode || e.charCode;
      if (
        (e.charCode &&
          (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0)),
        this.ClientSettings &&
          this.ClientSettings.AllowKeyboardNavigation &&
          this.ClientSettings.Selecting.CellSelectionMode ==
            Telerik.Web.UI.GridCellSelectionMode.None)
      ) {
        var i = Telerik.Web.UI.Grid.GetCurrentElement(e),
          r = this._allowSubmitOnEnter,
          n = this._canHandleKeyboardAction(e);
        if (!n && !r) return;
        if (r && 13 == t) {
          if (i.type && "textarea" == i.type.toLowerCase()) return;
          for (var l = !1, o = 0; o < this._submitControls.length; o++)
            i.tagName.toLowerCase() == this._submitControls[o].Name &&
              i.type.toLowerCase() == this._submitControls[o].Type &&
              (l = !0);
          if (i.type && !l && "checkbox" == i.type.toLowerCase())
            return void this._cancelDefaultAction(e);
          if (!l && this._editIndexes.length > 0) return;
          var a = this._getTableViewByControlIntoIt(i);
          if (
            l &&
            a.get_isItemInserted() &&
            this._validateEditInsertForm("PerformInsert")
          )
            return a.insertItem(), void this._cancelDefaultAction(e);
        }
        var s =
            t == this.ClientSettings.KeyboardNavigationSettings.MoveUpKey ||
            t == this.ClientSettings.KeyboardNavigationSettings.MoveDownKey,
          d = this._shouldSelectOnSpace(e, t),
          h =
            t ==
              this.ClientSettings.KeyboardNavigationSettings
                .ExpandDetailTableKey ||
            t ==
              this.ClientSettings.KeyboardNavigationSettings
                .CollapseDetailTableKey,
          u = (33 == t || 34 == t) && n,
          _ =
            this.ClientSettings.KeyboardNavigationSettings
              .EnableKeyboardShortcuts &&
            (t ==
              this.ClientSettings.KeyboardNavigationSettings
                .ExitEditInsertModeKey ||
              t ==
                this.ClientSettings.KeyboardNavigationSettings
                  .UpdateInsertItemKey),
          g =
            this.ClientSettings.KeyboardNavigationSettings
              .EnableKeyboardShortcuts &&
            t == this.ClientSettings.KeyboardNavigationSettings.DeleteActiveRow;
        if (s) this._handleActiveRowNavigation(e);
        else if (h)
          (this.get_id() === e.target.id ||
            (this.get_enableAriaSupport() &&
              this._activeRow &&
              this._activeRow.id === e.target.id)) &&
            this._handleActiveRowExpandCollapse(e);
        else if (d) this._handleActiveRowSelection(e);
        else if (_)
          this._handleExitEditModeOrUpdateItem(e, t),
            (void 0 === e.rawEvent.returnValue ||
              ("boolean" == typeof e.rawEvent.returnValue &&
                e.rawEvent.returnValue)) &&
              t ==
                this.ClientSettings.KeyboardNavigationSettings
                  .UpdateInsertItemKey &&
              (this._handleActiveRowEdit(e), this._cancelDefaultAction(e));
        else if (g) {
          if (
            i.type &&
            ("text" == i.type.toLowerCase() ||
              "textarea" == i.type.toLowerCase())
          )
            return;
          this._handleDeleteActiveRow();
        } else
          u ? this._handlePaging(e) : e.ctrlKey && this._handleShortCutKey(e);
      }
    },
    _shouldSelectOnSpace: function (e, t) {
      var i = e.target.tagName.toUpperCase(),
        r = this.ClientSettings.Selecting;
      return !(
        32 != t ||
        !r ||
        !r.AllowRowSelect ||
        "INPUT" == i ||
        "TEXTAREA" == i
      );
    },
    _canHandleKeyboardAction: function (e) {
      var t = e.keyCode || e.charCode;
      if (
        (32 == t || 13 == t || 33 == t || 34 == t || 127 == t) &&
        this.ClientSettings.KeyboardNavigationSettings.EnableKeyboardShortcuts
      ) {
        var i = Telerik.Web.UI.Grid.GetCurrentElement(e),
          r =
            "input" == i.tagName.toLowerCase() &&
            "checkbox" == i.type.toLowerCase() &&
            i.id &&
            -1 != i.id.indexOf("SelectCheckBox");
        if (127 == t && "input" == i.tagName.toLowerCase() && "text" == i.type)
          return !1;
        if (33 == t || 34 == t) {
          if (
            "input" == i.tagName.toLowerCase() ||
            "textarea" == i.tagName.toLowerCase()
          )
            return !1;
        } else if (
          ("input" == i.tagName.toLowerCase() && !r) ||
          "select" == i.tagName.toLowerCase() ||
          "option" == i.tagName.toLowerCase() ||
          "button" == i.tagName.toLowerCase() ||
          "a" == i.tagName.toLowerCase() ||
          "textarea" == i.tagName.toLowerCase() ||
          "img" == i.tagName.toLowerCase()
        )
          return !1;
      }
      return !0;
    },
    _handleShortCutKey: function (e) {
      var t = e.keyCode || e.charCode;
      switch (
        (e.charCode &&
          (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0)),
        t)
      ) {
        case this.ClientSettings.KeyboardNavigationSettings.InitInsertKey:
          this._activeRow &&
            (this._getRow(this._activeRow.id).get_owner().showInsertItem(),
            e.preventDefault());
          break;
        case this.ClientSettings.KeyboardNavigationSettings.RebindKey:
          this._activeRow &&
            (this._getRow(this._activeRow.id).get_owner().rebind(),
            e.preventDefault());
      }
    },
    _isShortCutKeyPressed: function (e) {
      var t = e.keyCode || e.charCode;
      if (
        (e.charCode &&
          (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0)),
        e.ctrlKey)
      )
        switch (t) {
          case this.ClientSettings.KeyboardNavigationSettings.InitInsertKey:
          case this.ClientSettings.KeyboardNavigationSettings.RebindKey:
            return !0;
          default:
            return !1;
        }
    },
    _handleDeleteActiveRow: function () {
      if (this._activeRow) {
        var e = $find(this._activeRow.id.split("__")[0]);
        e && e.deleteItem(this._activeRow);
      }
    },
    _getRow: function (e) {
      var t = $find(e);
      if (!t) {
        var i = e.split("__")[0],
          r = $find(i);
        this._ensureDataItemsCreated(r), (t = $find(e));
      }
      return t;
    },
    _handlePaging: function (e) {
      var t = null,
        i = null,
        r = e.keyCode || e.charCode,
        n = null;
      this._activeRow &&
        ((t = (n = this._getRow(
          this._activeRow.id,
        ).get_owner()).get_currentPageIndex()),
        (i = n.get_pageCount())),
        33 == r
          ? ++t < i &&
            ((this._shouldFocusOnPage = !0),
            this.updateClientState(),
            this._activeRow && n.page("Next"))
          : --t > -1 &&
            ((this._shouldFocusOnPage = !0),
            this.updateClientState(),
            this._activeRow && n.page("Prev")),
        (e.rawEvent.returnValue = !1),
        (e.rawEvent.cancelBubble = !0),
        e.stopPropagation && (e.preventDefault(), e.stopPropagation());
    },
    _handleExitEditModeOrUpdateItem: function (e, t) {
      var i = Telerik.Web.UI.Grid.GetCurrentElement(e),
        r = Telerik.Web.UI.Grid.GetFirstParentByTagName(i, "tr");
      if (r && !this.isGridDataRow(r) && r.parentNode) {
        var n = r;
        (r = Telerik.Web.UI.Grid.GetFirstParentByTagName(r.parentNode, "tr")) ||
          (r = n);
      }
      if (
        t ==
          this.ClientSettings.KeyboardNavigationSettings
            .ExitEditInsertModeKey &&
        this._activeRow &&
        this._getRow(this._activeRow.id)._owner.get_isItemInserted()
      )
        return (
          this._getRow(this._activeRow.id)._owner.cancelInsert(),
          (e.rawEvent.returnValue = !1),
          (e.rawEvent.cancelBubble = !0),
          e.stopPropagation && (e.preventDefault(), e.stopPropagation()),
          !1
        );
      if (
        t ==
        this.ClientSettings.KeyboardNavigationSettings.ExitEditInsertModeKey
      ) {
        if (this._activeRow) {
          var l = this._activeRow.id,
            o = $find(l);
          if (!o) {
            var a = $find(l.split("__")[0]);
            this._owner._ensureDataItemsCreated(a), (o = $find(l));
          }
          if (o.get_isInEditMode()) {
            var s = o.get_element();
            this.isGridDataRow(s).cancelUpdate(s),
              (e.rawEvent.returnValue = !1),
              (e.rawEvent.cancelBubble = !0),
              e.stopPropagation && (e.preventDefault(), e.stopPropagation());
          }
        }
        return !1;
      }
      if (null == r || void 0 === r) return !1;
      var d = this.isGridDataRow(r);
      if (null == d || void 0 === d) {
        for (var h, u = $telerik.$(i).parents("tr"), _ = 0; _ < u.length; _++)
          if (
            null != (h = u[_].previousSibling) &&
            void 0 !== h &&
            "TR" == h.tagName &&
            null != (d = this.isGridDataRow(h)) &&
            void 0 !== d
          ) {
            t ==
            this.ClientSettings.KeyboardNavigationSettings.ExitEditInsertModeKey
              ? d.cancelUpdate(h)
              : t ==
                  this.ClientSettings.KeyboardNavigationSettings
                    .UpdateInsertItemKey &&
                this._validateEditInsertForm("Update") &&
                d.updateItem(h),
              (e.rawEvent.returnValue = !1),
              (e.rawEvent.cancelBubble = !0),
              e.stopPropagation && (e.preventDefault(), e.stopPropagation());
            break;
          }
        return !1;
      }
      return this.isInEditModeByHierarchicalIndex(r.id.split("__")[1])
        ? (t ==
          this.ClientSettings.KeyboardNavigationSettings.ExitEditInsertModeKey
            ? d.cancelUpdate(r)
            : t ==
                this.ClientSettings.KeyboardNavigationSettings
                  .UpdateInsertItemKey &&
              this._validateEditInsertForm("Update") &&
              d.updateItem(r),
          (e.rawEvent.returnValue = !1),
          (e.rawEvent.cancelBubble = !0),
          e.stopPropagation && (e.preventDefault(), e.stopPropagation()),
          !1)
        : void 0;
    },
    isGridDataRow: function (e) {
      if ("" != e.id) {
        var t = this.get_masterTableView()
            ._getRowByIndexOrItemIndexHierarchical(e)
            .id.split("__")[0],
          i = $find(t);
        return null != i && void 0 !== i ? i : void 0;
      }
    },
    isInEditModeByHierarchicalIndex: function (e) {
      if (null != this._editIndexes && void 0 !== this._editIndexes) {
        for (var t = 0; t < this._editIndexes.length; t++)
          if (this._editIndexes[t] == e) return !0;
        return !1;
      }
      return !1;
    },
    _shouldSkipNavigation: function (e) {
      var t =
          "input" == e.tagName.toLowerCase() &&
          "checkbox" == e.type.toLowerCase() &&
          e.id &&
          -1 != e.id.indexOf("SelectCheckBox"),
        i = e && e.className && -1 != e.className.indexOf("RadDropDownList");
      return !(
        null == e ||
        !e.tagName ||
        t ||
        ("input" != e.tagName.toLowerCase() &&
          "textarea" != e.tagName.toLowerCase() &&
          "select" != e.tagName.toLowerCase() &&
          !i)
      );
    },
    _handleActiveRowNavigation: function (e) {
      var t = e.keyCode || e.charCode;
      e.charCode &&
        (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0));
      var i = Telerik.Web.UI.Grid.GetCurrentElement(e);
      if (!this._shouldSkipNavigation(i)) {
        var r = this._getPositionedDataItems();
        if (!(r.length <= 0)) {
          var n,
            l,
            o,
            a,
            s = this._keyboardNavigationProperties,
            d = this.ClientSettings.KeyboardNavigationSettings.MoveUpKey,
            h = this.ClientSettings.KeyboardNavigationSettings.MoveDownKey,
            u = this.get_allowActiveRowCycle(),
            _ = this._activeRow,
            g = this.ClientSettings;
          _ &&
            g.Selecting &&
            !g.Selecting.AllowRowSelect &&
            (s.currentSelectedIndex = this._searchRowIndex(_.id));
          var c = [],
            m = null;
          if (g.Selecting && g.Selecting.AllowRowSelect) {
            (this._selection._selectionInProgress = !0), (n = this._selection);
            a = !0;
            for (var p = 0, f = r.length; p < f; p++)
              r[p].get_selected() && (c[c.length] = r[p]);
            if (
              (s.firstSelection &&
                (_
                  ? ((s.currentSelectedIndex = this._searchRowIndex(_.id)),
                    this._clearSelectedItemsExcludingInterval(
                      s.currentSelectedIndex,
                      s.currentSelectedIndex,
                    ),
                    (s.lastSelectedRowIndex = s.currentSelectedIndex),
                    (this._selection._lastSelectedItemIndex =
                      s.currentSelectedIndex))
                  : c.length > 0 &&
                    ((s.currentSelectedIndex = this._searchRowIndex(
                      c[0].get_id(),
                    )),
                    (s.lastSelectedRowIndex = s.currentSelectedIndex),
                    (this._selection._lastSelectedItemIndex =
                      s.currentSelectedIndex)),
                s.setInitialState()),
              c.length > 1 && void 0 !== s.currentSelectedIndex)
            ) {
              if (s.lastClickSelectedItem) {
                var w = this._searchRowIndex(s.lastClickSelectedItem.id);
                w && (s.currentSelectedIndex = w);
              }
            } else
              c.length > 0 && s.lastClickSelectedItem
                ? ((s.currentSelectedIndex = this._searchRowIndex(
                    s.lastClickSelectedItem.id,
                  )),
                  s.setInitialState())
                : _ || (t == d && (s.currentSelectedIndex = 1));
            if (
              (("undefined" == s.currentSelectedIndex ||
                isNaN(s.currentSelectedIndex) ||
                null == s.currentSelectedIndex) &&
                (t == d
                  ? (s.currentSelectedIndex = 1)
                  : t == h && (s.currentSelectedIndex = 0)),
              (s.lastClickSelectedItem = null),
              s.holdingCtrl && e.shiftKey && !e.ctrlKey)
            )
              if (
                (s.setInitialState(),
                (_ && $find(_.id).get_selected()) ||
                  (c.length > 1 && !s.holdingCtrl))
              )
                this._clearSelectedItemsExcludingInterval(
                  s.initialRowIndex,
                  s.initialRowIndex,
                ),
                  r[s.initialRowIndex].get_selected() ||
                    n._selectRowInternal(
                      r[s.initialRowIndex].get_element(),
                      e,
                      !0,
                      !0,
                      !1,
                    );
              else {
                var C = s.lastSelectedRowIndex;
                (s.initialRowIndex = C),
                  (s.currentSelectedIndex < C || u) &&
                  (t == d || (!u && t == h))
                    ? (C > s.currentSelectedIndex
                        ? this._clearSelectedItemsExcludingInterval(
                            s.currentSelectedIndex,
                            C,
                          )
                        : this._clearSelectedItemsInInterval(
                            C,
                            s.currentSelectedIndex,
                          ),
                      this._selectItemsInInterval(
                        C,
                        s.currentSelectedIndex,
                        -1,
                      ))
                    : (t != h && u) ||
                      (s.currentSelectedIndex > C
                        ? this._clearSelectedItemsExcludingInterval(
                            C,
                            s.currentSelectedIndex,
                          )
                        : this._clearSelectedItemsInInterval(
                            s.currentSelectedIndex,
                            C,
                          ),
                      this._selectItemsInInterval(
                        C,
                        s.currentSelectedIndex,
                        1,
                      ));
              }
            (l = r[s.currentSelectedIndex]),
              (m = s.directionIndex),
              (o = s.currentSelectedIndex);
            var I = t;
            for (I = I == d ? h : d; l && !l.get_selectable(); )
              l = r[(o = this._getNextIndex(I, !1, o))];
            var v =
              (s.directionIndex > 0 && t == h) ||
              (s.directionIndex < 0 && t == d);
            s.currentSelectedIndex === s.initialRowIndex &&
              v &&
              r.length - s.unselectableItemsCount === c.length &&
              (a = !1);
          }
          if (
            ((s.currentSelectedIndex = this._getNextIndex(t, !0)),
            g.Selecting && g.Selecting.AllowRowSelect)
          ) {
            (e.shiftKey && 0 !== c.length) ||
              (r[s.currentSelectedIndex].get_selectable() &&
                s.setInitialState());
            for (
              var T,
                b = s.directionIndex > 0 && t == d,
                y = s.directionIndex < 0 && t == h,
                S = s.currentSelectedIndex;
              !r[S].get_selectable();

            )
              S = this._getNextIndex(t, !1, S);
            if (
              S === s.initialRowIndex &&
              (b || y || (0 !== m && 0 === s.directionIndex))
            )
              if (r.length - s.unselectableItemsCount === c.length) a = !1;
              else {
                l.get_selected() &&
                  r[s.currentSelectedIndex].get_selectable() &&
                  !e.ctrlKey &&
                  ((T = { ctrlKey: !1 }),
                  n._selectRowInternal(l.get_element(), T, !0, !0, !1));
                var D = s.currentSelectedIndex;
                (s.currentSelectedIndex = S),
                  s.setInitialState(),
                  (s.currentSelectedIndex = D);
              }
            if (
              l &&
              l.get_selected() &&
              r[s.currentSelectedIndex].get_selected() &&
              a
            ) {
              for (
                var k = s.currentSelectedIndex;
                r[k] && !r[k].get_selectable();

              )
                k = this._getNextIndex(t, !1, k);
              !e.ctrlKey &&
                e.shiftKey &&
                r[k] &&
                r[k].get_selected() &&
                r[k].get_selectable() &&
                l.get_selected() &&
                ((T = { ctrlKey: !1 }),
                n._selectRowInternal(l.get_element(), T, !0, !0, !1));
            } else if (l && !l.get_selected() && e.ctrlKey && e.shiftKey)
              (T = { ctrlKey: e.ctrlKey }),
                n._selectRowInternal(l.get_element(), T, !0, !0, !1);
            else if (e.shiftKey && _ && s.firstSelection) {
              var x = s.currentSelectedIndex;
              (s.currentSelectedIndex = o),
                s.setInitialState(),
                (s.currentSelectedIndex = x),
                l.get_selected() ||
                  ((T = { ctrlKey: !1 }),
                  n._selectRowInternal(_, T, !0, !0, !1));
            }
            e.ctrlKey ? (s.holdingCtrl = !0) : (s.holdingCtrl = !1),
              (this._selection._selectionInProgress = !1),
              e.shiftKey ||
                e.ctrlKey ||
                (this._selection._lastSelectedItemIndex =
                  s.currentSelectedIndex);
          }
          this._setActiveRow(r[s.currentSelectedIndex].get_element(), e);
          var G = !1;
          g.Selecting &&
            g.Selecting.AllowRowSelect &&
            ((!e.ctrlKey || (e.ctrlKey && e.shiftKey)) &&
              ((G = !0),
              n._selectRowInternal(
                r[s.currentSelectedIndex].get_element(),
                e,
                !1,
                !0,
                !0,
                !1,
              )),
            G || this.updateClientState(),
            _ &&
              $find(_.id) &&
              $find(_.id).get_selected() &&
              !e.shiftKey &&
              e.ctrlKey &&
              G &&
              (s.lastSelectedRowIndex = s.currentSelectedIndex)),
            (s.firstSelection = !1),
            e.preventDefault();
        }
      }
    },
    _getNextIndex: function (e, t, i) {
      var r = this._getPositionedDataItems(),
        n = this._keyboardNavigationProperties,
        l = this.get_allowActiveRowCycle(),
        o = this.ClientSettings.KeyboardNavigationSettings.MoveUpKey,
        a = this.ClientSettings.KeyboardNavigationSettings.MoveDownKey,
        s = n.currentSelectedIndex,
        d = this.get_masterTableView(),
        h = d._virtualization,
        u = h && h._haveCustomScrollbar ? h._getScrollInfo() : null,
        _ = 0;
      return (
        i && (s = i),
        e == o
          ? (--s < 0 &&
              (u
                ? (h.select(
                    Math.max(
                      h.get_startIndex() -
                        r.length +
                        Math.floor(u.itemAtBottom - u.itemAtTop),
                      0,
                    ),
                  ),
                  (s = Math.floor(u.itemAtTop) - h.get_startIndex() - 1))
                : (s = l ? r.length - 1 : 0)),
            u &&
            h.get_startIndex() + s < d.get_currentPageIndex() * d.get_pageSize()
              ? s++
              : u &&
                h.get_startIndex() + s <= Math.floor(u.itemAtTop) &&
                h.scrollToIndex(h.get_startIndex() + s),
            t && n.directionIndex++)
          : e == a &&
            (++s > r.length - 1 &&
              (u
                ? ((s = Math.min(
                    Math.floor(u.itemAtBottom - u.itemAtTop),
                    h.get_virtualItemCount(),
                  )),
                  (_ = r.length - Math.floor(u.itemAtBottom - u.itemAtTop)))
                : (s = l ? 0 : r.length - 1)),
            u &&
            h.get_startIndex() + s >=
              (d.get_currentPageIndex() + 1) * d.get_pageSize()
              ? s--
              : u &&
                (h.get_startIndex() + s >= Math.floor(u.itemAtBottom) ||
                  _ > 0) &&
                h.scrollToIndex(h.get_startIndex() + s + _, !0),
            t && n.directionIndex--),
        s
      );
    },
    _clearSelectedItemsExcludingInterval: function (e, t) {
      var i,
        r = 0,
        n = [];
      for (i = 0; i < this._selectedItemsInternal.length; i++)
        ((r = this._searchRowIndex(this._selectedItemsInternal[i].id)) < e ||
          r > t) &&
          n.push(r);
      for (i = 0; i < n.length; i++)
        this._positionedDataItems[n[i]].set_selected(!1);
    },
    _clearSelectedItemsInInterval: function (e, t) {
      var i,
        r = 0,
        n = [];
      for (i = 0; i < this._selectedItemsInternal.length; i++)
        (r = this._searchRowIndex(this._selectedItemsInternal[i].id)) > e &&
          r < t &&
          n.push(r);
      for (i = 0; i < n.length; i++)
        this._positionedDataItems[n[i]].set_selected(!1);
    },
    _selectItemsInInterval: function (e, t, i) {
      var r = this._getPositionedDataItems(),
        n = e;
      t += i;
      do {
        if (
          (n < 0 ? (n = r.length - 1) : n > r.length - 1 && (n = 0),
          r[n] && !r[n].get_selected())
        ) {
          this._selection._selectRowInternal(
            r[n].get_element(),
            { ctrlKey: !1 },
            !0,
            !0,
            !1,
          );
        }
        n += i;
      } while (n !== t);
    },
    _getPositionedDataItems: function (e) {
      var t = this._positionedDataItems;
      if (t && t.length > 0 && !e) return t;
      (this._keyboardNavigationProperties.unselectableItemsCount = 0),
        (t = this._getAllChildItemsRecursive(this.get_masterTableView())),
        (this._positionedDataItemsIndexes = {});
      for (var i = 0, r = t.length; i < r; i++)
        this._positionedDataItemsIndexes[t[i].get_id()] = i;
      return (
        (this._keyboardNavigationProperties.firstSelection = !0),
        (this._positionedDataItems = t),
        t
      );
    },
    _getAllChildItemsRecursive: function (e) {
      if (
        !e ||
        (e && "none" === e.get_element().parentNode.parentNode.style.display)
      )
        return [];
      for (var t = [], i = e.get_dataItems(), r = 0, n = i.length; r < n; r++) {
        var l = i[r];
        if ("none" !== l.get_element().style.display) {
          l.get_selectable() ||
            l.get_selected() ||
            this._keyboardNavigationProperties.unselectableItemsCount++,
            (t[t.length] = l);
          var o = l.get_nestedViews();
          if (o.length)
            for (var a = 0, s = o.length; a < s; a++) {
              var d = o[a],
                h = this._getAllChildItemsRecursive(d);
              h.length && Array.addRange(t, h);
            }
        }
      }
      return t;
    },
    _searchRowIndex: function (e) {
      return (
        this._getPositionedDataItems(), this._positionedDataItemsIndexes[e]
      );
    },
    _setActiveRow: function (e, t) {
      if (
        e &&
        this.ClientSettings &&
        this.ClientSettings.AllowKeyboardNavigation
      ) {
        var i = new Telerik.Web.UI.GridDataItemCancelEventArgs(
          this._activeRow || e,
          t,
        );
        if ((this.raise_activeRowChanging(i), i.get_cancel())) return;
        if (this._activeRow) {
          var r = $find(this._activeRow.id.split("__")[0]);
          Telerik.Web.UI.Grid.ClearItemStyle(
            this._activeRow,
            r._data._renderActiveItemStyle,
            r._data._renderActiveItemStyleClass,
          );
        }
        this._activeRow = e;
        var n = $find(e.id.split("__")[0]);
        if (
          (Telerik.Web.UI.Grid.SetItemStyle(
            e,
            n._data._renderActiveItemStyle,
            n._data._renderActiveItemStyleClass,
          ),
          Telerik.Web.UI.Grid.ScrollIntoView(e),
          this.updateClientState(),
          this.get_enableAriaSupport())
        ) {
          var l = e.tabIndex;
          (e.tabIndex = 1), e.focus(), (e.tabIndex = l);
        }
        this.raise_activeRowChanged(
          new Telerik.Web.UI.GridDataItemEventArgs(this._activeRow, t),
        );
      }
    },
    clearActiveRow: function () {
      if (this._activeRow) {
        var e = $find(this._activeRow.id.split("__")[0]);
        Telerik.Web.UI.Grid.ClearItemStyle(
          this._activeRow,
          e._data._renderActiveItemStyle,
          e._data._renderActiveItemStyleClass,
        ),
          (this._activeRow = null),
          this.updateClientState();
      }
    },
    set_activeRow: function (e) {
      this._setActiveRow(e, null);
    },
    _ensureDataItemsCreated: function (e) {
      0 == e._dataItems.length && e.get_dataItems();
    },
    _isClientSideExpandCollapse: function (e) {
      for (var t = e.cells, i = 0, r = t.length; i < r; i++) {
        var n = t[i],
          l = n.className;
        if (l && l.indexOf("rgExpandCol") > -1) {
          var o = n.getElementsByTagName("input")[0];
          if (
            o &&
            o.onclick &&
            o.onclick.toString().indexOf("_toggleExpand") > -1
          )
            return !0;
        }
      }
      return !1;
    },
    _handleActiveRowExpandCollapse: function (e) {
      var t = e.keyCode || e.charCode;
      if (
        (e.charCode &&
          (t = String.fromCharCode(e.charCode).toUpperCase().charCodeAt(0)),
        this._activeRow)
      ) {
        var i = $find(this._activeRow.id.split("__")[0]);
        this._ensureDataItemsCreated(i);
        var r = i._hierarchyLoadMode,
          n = "ServerOnDemand" == r || "ServerBind" == r,
          l =
            "Conditional" == r &&
            this._isClientSideExpandCollapse(this._activeRow),
          o = "";
        if (
          t ==
          this.ClientSettings.KeyboardNavigationSettings.CollapseDetailTableKey
        ) {
          var a = i._getNextNestedDataRow(this._activeRow);
          ((n && a) || !l) &&
            "Client" != r &&
            ((this._shouldFocusOnPage = !0),
            (o = this._activeRow.id + "##"),
            i.fireCommand("ExpandCollapse", o)),
            ((a && "none" != a.parentNode.style.display) ||
              (a &&
                $find(this._activeRow.id).get_isInEditMode() &&
                "none" != a.parentNode.style.display)) &&
              (i._performCollapseItem(this._activeRow),
              this._getPositionedDataItems(!0));
        } else if (
          t ==
          this.ClientSettings.KeyboardNavigationSettings.ExpandDetailTableKey
        ) {
          var s = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(
            this._activeRow,
            "tr",
          );
          if (
            ($find(this._activeRow.id).get_isInEditMode() &&
              (s = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(s, "tr")),
            !i._isDataItemElement(s) &&
              i._data.hasDetailItemTemplate &&
              (s = Telerik.Web.UI.Grid.GetNodeNextSiblingByTagName(s, "tr")),
            s &&
              "none" == s.style.display &&
              -1 === s.className.indexOf("rgNoRecords"))
          )
            i.expandItem(this._activeRow),
              this._getPositionedDataItems(!0),
              this.get_element().focus();
          else if (i._hasDetailTables && (n || !l)) {
            var d = $find(this._activeRow.id),
              h = d.get_nestedViews()[0],
              u = this._activeRow.id;
            d &&
              ((i = $find(u.split("__")[0])), this._ensureDataItemsCreated(i)),
              ((h &&
                t ==
                  this.ClientSettings.KeyboardNavigationSettings
                    .CollapseDetailTableKey) ||
                (!h &&
                  t ==
                    this.ClientSettings.KeyboardNavigationSettings
                      .ExpandDetailTableKey)) &&
                ((this._shouldFocusOnPage = !0),
                (o = this._activeRow.id + "##"),
                i.fireCommand("ExpandCollapse", o));
          }
        }
      }
    },
    _handleActiveRowSelection: function (e) {
      if (this._activeRow) {
        if (
          (this._selection._selectRowInternal(
            this._activeRow,
            { ctrlKey: this.get_allowMultiRowSelection() && e.ctrlKey },
            !1,
            !0,
            !0,
          ),
          this.ClientSettings.AllowKeyboardNavigation)
        ) {
          var t = this._keyboardNavigationProperties,
            i = this._getPositionedDataItems()[t.currentSelectedIndex];
          i &&
            i.get_selected() &&
            (t.lastSelectedRowIndex = t.currentSelectedIndex),
            (t.lastClickSelectedItem =
              this._getPositionedDataItems()[
                t.currentSelectedIndex
              ].get_element()),
            this._setActiveRow(this._activeRow, e);
        }
        e.preventDefault();
      }
    },
    _handleActiveRowEdit: function (e) {
      if (this._activeRow) {
        e.preventDefault();
        var t = $find(this._activeRow.id.split("__")[0]);
        t && t.editItem(this._activeRow);
      }
    },
    _adjustBatchDeletedRows: function () {
      this.get_batchEditingManager()._adjustBatchDeletedRows();
    },
    _getGridRow: function (e) {
      var t = Telerik.Web.UI.Grid.GetFirstParentByTagName(
          Telerik.Web.UI.Grid.GetCurrentElement(e),
          "tr",
        ),
        i = t;
      if (t && "" != t.id && 2 == t.id.split("__").length) {
        do {
          if (Telerik.Web.UI.RadGrid.isInstanceOfType($find(i.id))) break;
          i = i.parentNode;
        } while (i);
        if (i && $find(i.id) === this) return t;
      }
      return !1;
    },
    _click: function (e) {
      if (this._canRiseRowEvent(e)) {
        var t = e.target.className;
        if (
          this._renderMode !== Telerik.Web.UI.RenderMode.Lite ||
          !t.indexOf ||
          !(t.indexOf("rgExpandIcon") > -1 || t.indexOf("rgCollapseIcon") > -1)
        ) {
          if (
            !this.get_enableAriaSupport() &&
            this.ClientSettings.AllowKeyboardNavigation &&
            this.ClientSettings.Selecting.CellSelectionMode ==
              Telerik.Web.UI.GridCellSelectionMode.None
          )
            if ($telerik.isIE) {
              if (this.get_element().setActive)
                try {
                  this.get_element().setActive();
                } catch (e) {}
            } else this.get_element().focus && this.get_element().focus();
          var i = this._getGridRow(e);
          i &&
            this.raise_rowClick(new Telerik.Web.UI.GridDataItemEventArgs(i, e));
        }
      }
    },
    _dblclick: function (e) {
      if (
        ($telerik.isTouchDevice && $telerik.cancelRawEvent(e),
        this._canRiseRowEvent(e))
      ) {
        var t = this._getGridRow(e);
        t &&
          this.raise_rowDblClick(
            new Telerik.Web.UI.GridDataItemEventArgs(t, e),
          );
      }
    },
    _contextmenu: function (e) {
      if (!$telerik.isOpera || 2 == e.button) {
        var t = this._getGridRow(e),
          i = null;
        if (
          (t &&
            ((i = new Telerik.Web.UI.GridDataItemCancelEventArgs(t, e)),
            this.raise_rowContextMenu(i)),
          i &&
            !i.get_cancel() &&
            this.get_events().getHandler("rowContextMenu"))
        ) {
          if (!e.preventDefault) return (e.returnValue = !1), !1;
          e.preventDefault();
        }
      }
    },
    _mouseover: function (e) {
      this._overRow &&
        (this.raise_rowMouseOut(
          new Telerik.Web.UI.GridDataItemEventArgs(this._overRow, e),
        ),
        "" != this.Skin &&
          this.ClientSettings.EnableRowHoverStyle &&
          Sys.UI.DomElement.removeCssClass(this._overRow, "rgHoveredRow"));
      var t = this._getGridRow(e);
      t &&
        (this.raise_rowMouseOver(
          new Telerik.Web.UI.GridDataItemEventArgs(t, e),
        ),
        "" != this.Skin &&
          this.ClientSettings.EnableRowHoverStyle &&
          Sys.UI.DomElement.addCssClass(t, "rgHoveredRow"),
        (this._overRow = t));
    },
    _mouseout: function (e) {
      !this._overRow ||
        (($telerik.isIE8 || document.documentMode) &&
          $telerik.isMouseOverElement(this._overRow, e)) ||
        (this.raise_rowMouseOut(
          new Telerik.Web.UI.GridDataItemEventArgs(this._overRow, e),
        ),
        "" != this.Skin &&
          this.ClientSettings.EnableRowHoverStyle &&
          Sys.UI.DomElement.removeCssClass(this._overRow, "rgHoveredRow"),
        (this._overRow = null));
    },
    _canRiseRowEvent: function (e) {
      var t;
      return (
        !(
          !(t = $telerik.isTouchDevice
            ? $telerik.getTouchTarget(e)
            : Telerik.Web.UI.Grid.GetCurrentElement(e)) ||
          !t.tagName ||
          "input" == t.tagName.toLowerCase() ||
          "select" == t.tagName.toLowerCase() ||
          "option" == t.tagName.toLowerCase() ||
          "button" == t.tagName.toLowerCase() ||
          "a" == t.tagName.toLowerCase() ||
          "textarea" == t.tagName.toLowerCase() ||
          "img" == t.tagName.toLowerCase() ||
          ($telerik.isChrome &&
            "span" == t.tagName.toLowerCase() &&
            t.parentNode &&
            "button" == t.parentNode.tagName.toLowerCase())
        ) &&
        !(
          this.get_masterTableView() &&
          !Telerik.Web.UI.Grid.IsChildOf(
            t,
            this.get_masterTableView().get_element(),
          )
        )
      );
    },
    confirm: function (text, e, gridId, title, width, height) {
      if (window.confirmResult) return (window.confirmResult = !1), !0;
      if (void 0 === window.GetRadWindowManager) return window.confirm(text);
      var radWindowManager = window.GetRadWindowManager();
      if (!radWindowManager) return window.confirm(text);
      var grid = $find(gridId),
        el = e.srcElement ? e.srcElement : e.target;
      "input" !== el.tagName.toLowerCase() &&
        "a" !== el.tagName.toLowerCase() &&
        "button" !== el.tagName.toLowerCase() &&
        (el = el.parentNode);
      var masterTableView = grid.get_masterTableView();
      function callBackFunc(result) {
        if (result) {
          if (
            !$telerik.isIE &&
            el.onclick.toString().indexOf("_clientDelete(event)") > -1
          )
            return masterTableView._clientDelete(e), !1;
          if (
            ((window.confirmResult = !0),
            el.href && !el.onclick && (window.netscape || $telerik.isSafari))
          )
            return eval(el.href), void (window.confirmResult = !1);
          if (
            window.netscape &&
            el.type &&
            ("image" == el.type.toLowerCase() ||
              "submit" == el.type.toLowerCase() ||
              "button" == el.type.toLowerCase()) &&
            !el.click
          )
            return __doPostBack(el.name, ""), void (window.confirmResult = !1);
          el.click &&
            setTimeout(function () {
              el.click(e);
            });
        }
        return !1;
      }
      return (
        window.radconfirm(
          text,
          callBackFunc,
          void 0 !== width ? width : 280,
          void 0 !== height ? height : 200,
          this,
          void 0 !== title ? title : "Confirm",
        ),
        !1
      );
    },
  }),
  Telerik.Web.UI.RadGrid.registerClass(
    "Telerik.Web.UI.RadGrid",
    Telerik.Web.UI.RadWebControl,
  ),
  (Telerik.Web.UI.GridKeyPressEventArgs = function (e) {
    Telerik.Web.UI.GridKeyPressEventArgs.initializeBase(this),
      (this._keyCode = e.keyCode || e.charCode),
      (this._isShiftPressed = e.shiftKey),
      (this._isCtrlPressed = e.ctrlKey),
      (this._isAltPressed = e.altKey),
      (this._domEvent = e);
  }),
  (Telerik.Web.UI.GridKeyPressEventArgs.prototype = {
    get_keyCode: function () {
      return this._keyCode;
    },
    get_isShiftPressed: function () {
      return this._isShiftPressed;
    },
    get_isCtrlPressed: function () {
      return this._isCtrlPressed;
    },
    get_isAltPressed: function () {
      return this._isAltPressed;
    },
    get_domEvent: function () {
      return this._domEvent;
    },
  }),
  Telerik.Web.UI.GridKeyPressEventArgs.registerClass(
    "Telerik.Web.UI.GridKeyPressEventArgs",
    Sys.CancelEventArgs,
  ),
  (Telerik.Web.UI.GridDragDropCancelEventArgs = function (e, t, i, r, n, l) {
    Telerik.Web.UI.GridDragDropCancelEventArgs.initializeBase(this),
      (this._targetItemId = ""),
      (this._targetItemIndexHierarchical = ""),
      (this._targetGridDataItem = null),
      (this._targetItemTableView = null),
      (this._targetItemDataKeyValues = null),
      e &&
        ((this._targetItemId = e.id),
        (this._targetItemIndexHierarchical = this._targetItemId.split("__")[1]),
        (this._targetItemTableView = $find(this._targetItemId.split("__")[0])),
        this._targetItemTableView &&
          this._targetItemTableView._owner._clientKeyValues &&
          this._targetItemTableView._owner._clientKeyValues[
            this._targetItemIndexHierarchical
          ] &&
          (this._targetItemDataKeyValues =
            this._targetItemTableView._owner._clientKeyValues[
              this._targetItemIndexHierarchical
            ])),
      (this._domEvent = t),
      (this._dragedItems = i),
      (this._htmlElement = r),
      (this._targetRadGrid = n),
      (this._dropPosition = l);
  }),
  (Telerik.Web.UI.GridDragDropCancelEventArgs.prototype = {
    get_targetGridDataItem: function () {
      return (
        this._targetItemTableView &&
          !this._targetGridDataItem &&
          (this._targetItemTableView.get_dataItems(),
          (this._targetGridDataItem = $find(this._targetItemId))),
        this._targetGridDataItem
      );
    },
    get_targetItemIndexHierarchical: function () {
      return this._targetItemIndexHierarchical;
    },
    get_targetItemId: function () {
      return this._targetItemId;
    },
    get_targetItemTableView: function () {
      return this._targetItemTableView;
    },
    get_domEvent: function () {
      return this._domEvent;
    },
    get_TargetDataKeyValue: function (e) {
      return this._targetItemDataKeyValues
        ? this._targetItemDataKeyValues[e]
        : null;
    },
    get_draggedItems: function () {
      return this._dragedItems;
    },
    get_destinationHtmlElement: function () {
      return this._htmlElement;
    },
    set_destinationHtmlElement: function (e) {
      this._htmlElement = e;
    },
    get_targetRadGrid: function () {
      return this._targetRadGrid;
    },
    get_dropPosition: function () {
      return this._dropPosition;
    },
  }),
  Telerik.Web.UI.GridDragDropCancelEventArgs.registerClass(
    "Telerik.Web.UI.GridDragDropCancelEventArgs",
    Sys.CancelEventArgs,
  ),
  (Telerik.Web.UI.GridDataItemEventArgs = function (e, t) {
    Telerik.Web.UI.GridDataItemEventArgs.initializeBase(this),
      (this._id = ""),
      (this._itemIndexHierarchical = ""),
      (this._gridDataItem = null),
      (this._tableView = null),
      (this._dataKeyValues = null),
      e &&
        ((this._id = e.id),
        (this._itemIndexHierarchical = this._id.split("__")[1]),
        (this._tableView = $find(this._id.split("__")[0])),
        this._tableView &&
          this._tableView._owner._clientKeyValues &&
          this._tableView._owner._clientKeyValues[
            this._itemIndexHierarchical
          ] &&
          (this._dataKeyValues =
            this._tableView._owner._clientKeyValues[
              this._itemIndexHierarchical
            ])),
      (this._domEvent = t);
  }),
  (Telerik.Web.UI.GridDataItemEventArgs.prototype = {
    get_item: function () {
      return this.get_gridDataItem();
    },
    get_gridDataItem: function () {
      return (
        this._tableView &&
          !this._gridDataItem &&
          ((this._gridDataItem = $find(this._id)),
          this._gridDataItem ||
            (this._tableView.get_dataItems(),
            (this._gridDataItem = $find(this._id)))),
        this._gridDataItem
      );
    },
    get_itemIndexHierarchical: function () {
      return this._itemIndexHierarchical;
    },
    get_id: function () {
      return this._id;
    },
    get_tableView: function () {
      return this._tableView;
    },
    get_domEvent: function () {
      return this._domEvent;
    },
    getDataKeyValue: function (e) {
      return this._dataKeyValues ? this._dataKeyValues[e] : null;
    },
  }),
  Telerik.Web.UI.GridDataItemEventArgs.registerClass(
    "Telerik.Web.UI.GridDataItemEventArgs",
    Sys.EventArgs,
  ),
  (Telerik.Web.UI.GridDataItemCancelEventArgs = function (e, t) {
    Telerik.Web.UI.GridDataItemCancelEventArgs.initializeBase(this),
      (this._id = ""),
      (this._itemIndexHierarchical = ""),
      (this._gridDataItem = null),
      (this._tableView = null),
      (this._dataKeyValues = null),
      e &&
        ((this._id = e.id),
        (this._itemIndexHierarchical = this._id.split("__")[1]),
        (this._tableView = $find(this._id.split("__")[0])),
        this._tableView &&
          this._tableView._owner._clientKeyValues &&
          this._tableView._owner._clientKeyValues[
            this._itemIndexHierarchical
          ] &&
          (this._dataKeyValues =
            this._tableView._owner._clientKeyValues[
              this._itemIndexHierarchical
            ])),
      (this._domEvent = t);
  }),
  (Telerik.Web.UI.GridDataItemCancelEventArgs.prototype = {
    get_gridDataItem: function () {
      return (
        this._tableView &&
          !this._gridDataItem &&
          (this._tableView.get_dataItems(),
          (this._gridDataItem = $find(this._id))),
        this._gridDataItem
      );
    },
    get_itemIndexHierarchical: function () {
      return this._itemIndexHierarchical;
    },
    get_id: function () {
      return this._id;
    },
    get_tableView: function () {
      return this._tableView;
    },
    get_domEvent: function () {
      return this._domEvent;
    },
    getDataKeyValue: function (e) {
      return this._dataKeyValues ? this._dataKeyValues[e] : null;
    },
  }),
  Telerik.Web.UI.GridDataItemCancelEventArgs.registerClass(
    "Telerik.Web.UI.GridDataItemCancelEventArgs",
    Sys.CancelEventArgs,
  ),
  (Telerik.Web.UI.GridClientDataBindingParameterType = function () {}),
  (Telerik.Web.UI.GridClientDataBindingParameterType.prototype = {
    String: 0,
    List: 1,
    Linq: 2,
    Oql: 3,
  }),
  Telerik.Web.UI.GridClientDataBindingParameterType.registerEnum(
    "Telerik.Web.UI.GridClientDataBindingParameterType",
    !1,
  ),
  (Telerik.Web.UI.GridClientDataResponseType = function () {}),
  (Telerik.Web.UI.GridClientDataResponseType.prototype = { JSON: 0, JSONP: 1 }),
  Telerik.Web.UI.GridClientDataResponseType.registerEnum(
    "Telerik.Web.UI.GridClientDataResponseType",
  ),
  (Telerik.Web.UI.GridClientDataServiceType = function () {}),
  (Telerik.Web.UI.GridClientDataServiceType.prototype = {
    ADONet: 0,
    OData: 1,
  }),
  Telerik.Web.UI.GridClientDataServiceType.registerEnum(
    "Telerik.Web.UI.GridClientDataServiceType",
  ),
  (Telerik.Web.UI.GridDataSourceResolvedEventArgs = function (e) {
    Telerik.Web.UI.GridDataSourceResolvedEventArgs.initializeBase(this),
      (this._data = e);
  }),
  (Telerik.Web.UI.GridDataSourceResolvedEventArgs.prototype = {
    get_data: function () {
      return this._data;
    },
    set_data: function (e) {
      this._data = e;
    },
  }),
  Telerik.Web.UI.GridDataSourceResolvedEventArgs.registerClass(
    "Telerik.Web.UI.GridDataSourceResolvedEventArgs",
    Sys.EventArgs,
  ),
  (Telerik.Web.UI.GridCellSelectEventArgs = function (e, t) {
    Telerik.Web.UI.GridCellSelectEventArgs.initializeBase(this),
      (this.row = t(e).parent("tr[id]")),
      (this.rowElement = this.row[0]),
      (this._id = ""),
      (this._tableView = null),
      (this._col = null),
      this.rowElement &&
        ((this._itemIndexHierarchical = this.rowElement.id.split("__")[1]),
        (this._id = this.rowElement.id),
        (this._tableView = $find(this._id.split("__")[0])));
    for (var i = this._tableView.get_columns(), r = 0, n = 0; r < i.length; r++)
      n == t(e).index() && (this._col = i[r]), n++;
  }),
  (Telerik.Web.UI.GridCellSelectEventArgs.prototype = {
    get_row: function () {
      return this.rowElement;
    },
    get_column: function () {
      return this._col;
    },
    get_gridDataItem: function () {
      return (
        this._tableView &&
          !this._gridDataItem &&
          (this._tableView.get_dataItems(),
          (this._gridDataItem = $find(this._id))),
        this._gridDataItem
      );
    },
    get_tableView: function () {
      return this._tableView;
    },
    get_cellIndexHierarchical: function () {
      return (
        this._itemIndexHierarchical + "&" + this.get_column().get_uniqueName()
      );
    },
  }),
  Telerik.Web.UI.GridCellSelectEventArgs.registerClass(
    "Telerik.Web.UI.GridCellSelectEventArgs",
    Sys.EventArgs,
  ),
  (Telerik.Web.UI.GridCellSelectCancelEventArgs = function (e, t) {
    Telerik.Web.UI.GridCellSelectCancelEventArgs.initializeBase(this),
      (this.row = t(e).parent("tr[id]")),
      (this.rowElement = this.row[0]),
      (this._id = ""),
      (this._tableView = null),
      (this._col = null),
      this.rowElement &&
        ((this._id = this.rowElement.id),
        (this._tableView = $find(this._id.split("__")[0])));
    for (var i = this._tableView.get_columns(), r = 0, n = 0; r < i.length; r++)
      n == t(e).index() && (this._col = i[r]), n++;
  }),
  (Telerik.Web.UI.GridCellSelectCancelEventArgs.prototype = {
    get_row: function () {
      return this.rowElement;
    },
    get_column: function () {
      return this._col;
    },
    get_gridDataItem: function () {
      return (
        this._tableView &&
          !this._gridDataItem &&
          (this._tableView.get_dataItems(),
          (this._gridDataItem = $find(this._id))),
        this._gridDataItem
      );
    },
  }),
  Telerik.Web.UI.GridCellSelectCancelEventArgs.registerClass(
    "Telerik.Web.UI.GridCellSelectCancelEventArgs",
    Sys.CancelEventArgs,
  ),
  (Telerik.Web.UI.GridCellSelectionMode = function () {}),
  (Telerik.Web.UI.GridCellSelectionMode.prototype = {
    None: 0,
    SingleCell: 1,
    MultiCell: 2,
    Column: 3,
    MultiColumn: 4,
  }),
  Telerik.Web.UI.GridCellSelectionMode.registerEnum(
    "Telerik.Web.UI.GridCellSelectionMode",
    !1,
  ),
  Type.registerNamespace("Telerik.Web.UI"),
  (function (e) {
    (e.GridClientSideBinding = function (e) {
      (this._grid = e),
        (this._masterTableView = e.get_masterTableView()),
        (this._groupExpressions =
          this._masterTableView._data.GroupByExpressions),
        (this._dataFieldHeaderTextMap =
          this._masterTableView._data.DataFieldHeaderText),
        (this._supressChange = !1),
        (this._initialBinding = !1),
        (this._changeDelegate = null),
        this.initialize();
    }),
      (e.GridClientSideBinding.prototype = {
        initialize: function () {
          var e = this;
          e._clientDataSource = $find(e._grid._clientDataSourceID);
          var t = function () {
            (e._clientDataSource = $find(e._grid._clientDataSourceID)),
              e._initDataSource(),
              Sys.Application.remove_load(t);
          };
          Sys.Application.add_load(t);
        },
        dispose: function () {
          this._changeDelegate &&
            this._clientDataSource &&
            (this._clientDataSource.remove_change(this._changeDelegate),
            this._clientDataSource.remove_sync(this._changeDelegate)),
            (this._changeDelegate = null),
            (this._clientDataSource = null);
        },
        get_clientDataSource: function () {
          return this._clientDataSource;
        },
        refresh: function () {
          this._change();
        },
        _initDataSource: function () {
          var e = this._grid.get_masterTableView();
          this._grid.add_command(
            Function.createDelegate(this, this._onCommand),
          ),
            (this._changeDelegate = Function.createDelegate(
              this,
              this._change,
            )),
            this._clientDataSource.add_change(this._changeDelegate),
            this._clientDataSource.add_sync(this._changeDelegate),
            e._virtualization
              ? e._virtualization.select()
              : ((this._initialBinding = !0), this._clientDataSource.fetch());
        },
        _onCommand: function (e, t) {
          var i = t.get_commandName(),
            r = t.get_commandArgument(),
            n = r.toString().split(":"),
            l = parseInt(n[n.length - 1], 10),
            o = !1;
          switch (i) {
            case "UnGroupByExpression":
              this._updateGroupExpressions({ type: "remove", index: l }),
                (o = !0);
              break;
            case "ReorderGroupByExpression":
              var a = r.toString().split(","),
                s = parseInt(a[0].split(":")[1], 10),
                d = parseInt(a[1].split(":")[1], 10),
                h = Telerik.Web.UI.Grid.reorderArray(
                  this._groupExpressions,
                  s,
                  d,
                );
              if (this._grid._renderMode != Telerik.Web.UI.RenderMode.Mobile) {
                for (
                  var u = this._groupExpressions.length,
                    _ = this._grid._groupPanel,
                    g = this._grid._groupPanel._items,
                    c = 0;
                  c < u;
                  c++
                ) {
                  var m = g[0];
                  _._ungroup(m.get_element().childNodes[0]);
                }
                this._grid._groupPanel._items = [];
                for (var p = 0; p < u; p++) {
                  var f = h[p];
                  this._updateGroupExpressions({ type: "add", field: f.field });
                }
              }
              (this._groupExpressions =
                this._grid.get_masterTableView()._data.GroupByExpressions =
                  h),
                (o = !0);
              break;
            case "GroupByColumn":
              this._updateGroupExpressions({ type: "add", field: r }), (o = !0);
              break;
            case "UnGroupByColumn":
              this._updateGroupExpressions({ type: "remove", field: r }),
                (o = !0);
              break;
            case "SortGroup":
              this._updateGroupExpressions({ type: "sort", field: r }),
                (o = !0);
              break;
            case "Page":
            case "Delete":
            case "PageSize":
            case "Sort":
            case "ClearSort":
            case "Filter":
            case "HeaderSort":
            case "HeaderContextMenuFilter":
            case "RebindGrid":
              o = !0;
          }
          o && (t.set_cancel(!0), this._change());
        },
        _updateGroupExpressions: function (t) {
          var i,
            r,
            n,
            l,
            o,
            a = t.type,
            s = this._groupExpressions,
            d = s.length,
            h = $telerik.$,
            u = this._grid._groupPanel;
          if ("add" == a) {
            for (var _ = 0; _ < d; _++) if (s[_].field == t.field) return;
            s.push({
              field: t.field,
              dir: "asc",
              aggregates: this._masterTableView._data.Aggregates,
            }),
              u &&
                (this._grid._renderMode == Telerik.Web.UI.RenderMode.Mobile
                  ? (0 == (o = h(u.cells[0])).find("label").length &&
                      (((l = o.find("span")[0]).innerHTML = "View Groups"),
                      (l.className = "rgGroupPanelCollapse"),
                      this._masterTableView._initializeGroupPanelEvents()),
                    (n = this._masterTableView._getViewByType(
                      e.Grid.MobileViewType.Group,
                    ))._groupFieldNames.push(t.field),
                    n._createGroupItem(
                      this._dataFieldHeaderTextMap[t.field] || t.field,
                    ),
                    n._$element
                      .find(".rgUngroup")
                      .offEvent(e.EventNamesMap.up)
                      .onEvent(e.EventNamesMap.up, h.proxy(n._handleCloseUp, n))
                      .on("click", $telerik.preventDefault),
                    n._$element
                      .find("[class *= 'rgSort']")
                      .offEvent(e.EventNamesMap.up)
                      .onEvent(e.EventNamesMap.up, h.proxy(n._handleSortUp, n))
                      .on("click", $telerik.preventDefault))
                  : this._grid._renderMode == Telerik.Web.UI.RenderMode.Lite
                    ? u._createLightItems(
                        this._dataFieldHeaderTextMap[t.field] || t.field,
                        t.field,
                      )
                    : u._create(
                        this._dataFieldHeaderTextMap[t.field] || t.field,
                        t.field,
                      ));
          }
          for (i = 0; i < d; i++) {
            if (
              ((r = s[i]),
              "remove" == a && (r.field == t.field || i === t.index))
            ) {
              if (
                (this._masterTableView._removeGroupColumn(), s.splice(i, 1), u)
              )
                if (
                  this._grid._renderMode != Telerik.Web.UI.RenderMode.Mobile
                ) {
                  var g = u._items;
                  g.splice(i, 1);
                  for (var c = 0; c < g.length; c++)
                    g[c]._hierarchicalIndex = "0:" + c;
                } else
                  0 == (o = h(u.cells[0])).find("label").length &&
                    (((l = o.find("span")[0]).className =
                      "rgGroupPanelCollapse"),
                    (l.innerHTML = this._grid._groupPanelText),
                    (l.className = ""),
                    (n = this._masterTableView._getViewByType(
                      e.Grid.MobileViewType.Group,
                    )).hide());
              break;
            }
            "sort" == a &&
              r.field == t.field &&
              (r.dir = "asc" == r.dir ? "desc" : "asc");
          }
        },
        _setAggregatesToClientDataSource: function (e, t) {
          var i = [
            "",
            "sum",
            "min",
            "max",
            "last",
            "first",
            "count",
            "average",
            "countDistinct",
            "custom",
          ];
          e.get_aggregates().clear();
          for (var r = t.get_columns(), n = 0; n < r.length; n++)
            if (r[n]._data.Aggregate) {
              var l = new Telerik.Web.UI.ClientDataSource.Aggregate();
              l.set_field(r[n]._data.DataField),
                l.set_aggregate(i[r[n]._data.Aggregate]),
                e.get_aggregates().add(l);
            }
        },
        _change: function () {
          if (!this._supressChange) {
            var e = this._clientDataSource,
              t = this._grid.get_masterTableView(),
              i = this._grid,
              r = i ? i.get_batchEditingManager() : null,
              n = t._forceRebind || !1;
            if (
              ((t._forceRebind = null),
              (!t._virtualization ||
                (t._virtualization && t._virtualization._isDataBinding)) &&
                (n ||
                  (e.get_sortExpressions().clear(),
                  e
                    .get_sortExpressions()
                    .add(t.get_sortExpressions().toClientDataSourceList()),
                  e.get_filterExpressions().clear(),
                  e
                    .get_filterExpressions()
                    .add(t.get_filterExpressions().toClientDataSourceList()),
                  e.get_groupExpressions().clear(),
                  e.set__groupExpressions(this._groupExpressions),
                  this._setAggregatesToClientDataSource(e, t),
                  t._virtualization ||
                    (e.set_allowPaging(t.get_allowPaging()),
                    t.get_allowPaging() &&
                      (t.get_pageSize() != e.get_pageSize() &&
                        e.set_pageSize(t.get_pageSize()),
                      t.get_currentPageIndex() != e.get_currentPageIndex() &&
                        e.set_currentPageIndex(t.get_currentPageIndex())))),
                !this._databindingInProgress))
            )
              if (this._initialBinding)
                (this._initialBinding = !1),
                  (this._databindingInProgress = !0),
                  t.set_dataSource(n ? e.recreateView() : e.view()),
                  t.set_virtualItemCount(e.get_totalItemsCount()),
                  (this._databindingInProgress = !1),
                  t.dataBind(),
                  t.updateAggregates(e._kendoDataSource.aggregates()),
                  r && r._removeChanges();
              else {
                var l = this;
                (this._databindingInProgress = !0),
                  e.fetch(function () {
                    t.set_dataSource(n ? e.recreateView() : e.view()),
                      t.set_virtualItemCount(e.get_totalItemsCount()),
                      (l._databindingInProgress = !1),
                      t.dataBind(),
                      t.updateAggregates(e._kendoDataSource.aggregates()),
                      r && r._removeChanges();
                  });
              }
          }
        },
      }),
      e.GridClientSideBinding.registerClass(
        "Telerik.Web.UI.GridClientSideBinding",
        null,
      );
    var t,
      i = {
        updateAggregates: function (e) {
          var t = null;
          this.get_element().tFoot && (t = this.get_element().tFoot.rows[0]),
            !t &&
              this._owner.GridFooterDiv &&
              this._owner.GridFooterDiv.children[0] &&
              (t = this._owner.GridFooterDiv.children[0].rows[1]),
            t && "rgFooter" == t.className && this._updateAggregates(t, e);
        },
        dataBind: function () {
          if (
            this._virtualization &&
            !this._virtualization._isDataBinding &&
            ((this.get_allowPaging() &&
              this._dataSource.length > this.get_pageSize()) ||
              (!this.get_allowPaging() &&
                this._dataSource.length > this._virtualization._itemsPerView))
          )
            return (
              (this._virtualization._startIndex = null),
              this._virtualization.set_bindingType("Client"),
              this._virtualization.set_cachedData(this._dataSource),
              this._virtualization.set_virtualItemCount(
                this._dataSource.length,
              ),
              void this._virtualization.select()
            );
          Array.forEach(
            $telerik.getElementsByClassName(
              this.get_element().tBodies[0],
              "rgGroupHeader",
            ),
            function (e) {
              e.parentNode.removeChild(e);
            },
          ),
            Array.forEach(
              $telerik.getElementsByClassName(
                this.get_element().tBodies[0],
                "rgFooter",
              ),
              function (e) {
                e.parentNode.removeChild(e);
              },
            );
          var e = $telerik.getElementByClassName(
            this.get_element(),
            "rgNoRecords",
          );
          e &&
            (this._dataSource.length > 0
              ? (e.style.display = "none")
              : ((e.style.display = ""),
                this._setPagerVisibility(this._data.PagerAlwaysVisible)));
          var t,
            i,
            r,
            n = this.get_dataItems(),
            l = this.get_columns(),
            o = $telerik.isOpera
              ? this.get_element()
              : this.get_element().tBodies[0];
          if (this._dataSource.length < n.length || 1 == o.rows.length) {
            for (t = 0, i = n.length; t < i; t++)
              n[t].set_visible(!1), (n[t].get_element().style.display = "none");
            this._cacheDataItems();
          }
          this._dataBind(this._dataSource);
          var a = !0;
          this._owner._keyboardNavigationProperties &&
            (a = this._owner._keyboardNavigationProperties.firstSelection);
          var s = $find(this._owner.get_id());
          for (
            s._getPositionedDataItems && s._getPositionedDataItems(!0),
              this._owner._keyboardNavigationProperties &&
                (this._owner._keyboardNavigationProperties.firstSelection = a),
              this._fixRowsClassNames(),
              this._owner.raise_dataBound(Sys.EventArgs.Empty),
              t = 0,
              r = l.length;
            t < r;
            t++
          ) {
            var d = !1;
            "hidden" == l[t].get_element().style.visibility ||
              (null != l[t].Display && 1 != l[t].Display) ||
              (null != l[t]._data.Display && !l[t]._data.Display) ||
              (d = !0),
              d || this.hideColumn(t);
          }
          if (this.get_id() == this._owner._masterClientID) {
            var h = $find(this._owner.get_id());
            h._scrolling &&
              (this._owner._scrolling.setHeaderAndFooterDivsWidth(),
              h._scrolling._initializeVirtualScrollPaging(!0));
          }
        },
        createItem: function (e, t, i) {
          var r = this,
            n = r.get_dataItems();
          e = 0 == e ? 0 : e || n.length;
          var l,
            o = $telerik.isOpera
              ? this.get_element()
              : this.get_element().tBodies[0];
          l =
            e < n.length && n.length > 0
              ? o.parentNode.insertRow(n[e].get_element().rowIndex)
              : e === n.length && n.length > 0
                ? o.insertRow(-1)
                : o.insertRow(e);
          var a = new Telerik.Web.UI.GridDataItemCancelEventArgs(l, null);
          if ((this._owner.raise_rowCreating(a), a.get_cancel())) return null;
          var s,
            d,
            h,
            u,
            _,
            g = document.createDocumentFragment();
          if (n.length > 0) {
            var c = 0 == e ? n[0].get_id() : n[e - 1].get_id();
            (h =
              -1 === (h = c.split("__")[1]).indexOf("_")
                ? parseInt(c.split("__")[1], 10) + (0 == e ? -1 : 1)
                : "-1"),
              t &&
                parseInt(t, 10) < 0 &&
                parseInt(h, 10) > parseInt(t, 10) &&
                (h = t),
              (l.id = String.format("{0}__{1}", c.split("__")[0], h));
          } else
            (h = void 0 === t ? "0" : t),
              (l.id = String.format("{0}__{1}", this.get_id(), h)),
              r._hideRgNoRecordsRow(o);
          if (((l.className = "rgRow"), n[n.length - 2])) {
            var m = n[n.length - 2].get_element().className;
            (m = m.replace(" rgActiveRow", "").replace(" rgSelectedRow", "")),
              (l.className = m);
          }
          d = $create(
            Telerik.Web.UI.GridDataItem,
            { _owner: r, _data: {}, _itemIndexHierarchical: "" + h },
            null,
            null,
            l,
          );
          for (var p = 0, f = r.get_columns().length; p < f; p++)
            (u = r.get_columns()[p]),
              (s = r._createCell(u)),
              g.appendChild(s),
              u.Display || (s.style.display = "none"),
              "Batch" == r._data.EditMode &&
                r._isColumnEditable(u, l) &&
                (((_ = document.createElement("div")).innerHTML = "&nbsp;"),
                s.appendChild(_),
                (s = _)),
              u.initializeCell(s, d),
              0 == s.childNodes.length && (s.innerHTML = "&nbsp;");
          return (
            l.appendChild(g),
            r._clearRowClassStyles(d.get_element()),
            i && i(d),
            r._owner.raise_rowCreated(
              new Telerik.Web.UI.GridDataItemEventArgs(l, null),
            ),
            Array.insert(n, e, d),
            d
          );
        },
        _createCell: function (e) {
          var t,
            i,
            r = this.get_dataItems()[0],
            n = document.createElement("td"),
            l = this._cellAttributes;
          if (l && r)
            for (i in (t = l[e.get_uniqueName()])) n.setAttribute(i, t[i]);
          return n;
        },
        _saveCellAttributes: function (e) {
          var t,
            i,
            r,
            n,
            l = (this._cellAttributes = {}),
            o = this.get_columns(),
            a = o.length;
          for (t = 0; t < a; t++)
            if (
              ((i = l[o[t].get_uniqueName()] = {}),
              (n = e.get_cell(o[t].get_uniqueName())))
            ) {
              for (var s = n.attributes, d = 0; d < s.length; d++)
                "style" !== (r = s[d]).nodeName &&
                  ($telerik.isChrome ||
                    r.specified ||
                    ("value" == r.nodeName && r.nodeValue)) &&
                  (i[r.nodeName] = r.nodeValue);
              n.style.cssText && (i.style = n.style.cssText);
            }
        },
        _isGroup: function (e) {
          return !!(
            e &&
            e.hasOwnProperty("hasSubgroups") &&
            e.items &&
            "number" == typeof e.items.length
          );
        },
        _getGroupLevels: function (e) {
          for (var t = 0; this._isGroup(e[0]); ) t++, (e = e[0].items);
          return t;
        },
        _dataBind: function (e, t) {
          t = t || {
            dataItemIndex: 0,
            groupLevel: 0,
            groupRowIndex: 0,
            groupLevels: this._getGroupLevels(e),
          };
          var i = this._isGroup(e[0]),
            r = this.get_dataItems(),
            n = e.length,
            l = 0;
          if (i) {
            var o = this._data.GroupByExpressions;
            if (o) {
              for (var a = {}, s = 0; s < o.length; s++) {
                var d = o[s];
                a[d.field] = d.alias;
              }
              t.aliasFieldMap = a;
            }
            "GridGroupSplitterColumn" !=
              this.get_columns()[t.groupLevel]._data.ColumnType &&
              this._createGroupColumn(),
              t.groupLevel++;
          }
          for (this._dataItemsByGlobalIndex = {}; l < n; l++)
            i
              ? this._createGroup(e[l], t)
              : t.isEmptyDataGroup ||
                this._appendItem(r[t.dataItemIndex++], e[l], l);
          i && t.groupLevel--;
        },
        _createGroup: function (e, t) {
          if (
            (this._createGroupRow(e, t),
            this._dataBind(e.items, t),
            this._data.ShowGroupFooter)
          )
            for (var i in e.aggregates) {
              this._createAggregateRow(e, t, i);
              break;
            }
        },
        _createGroupRow: function (e, t) {
          var i,
            r,
            n = this,
            l = document.createElement("tr"),
            o = t.groupLevel,
            a = 0;
          for (t.groupRowIndex += 2, l.className = "rgGroupHeader"; a < o; a++)
            ((i = document.createElement("td")).className = "rgGroupCol"),
              l.appendChild(i);
          if (
            this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Mobile ||
            this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite
          ) {
            ((r = document.createElement("button")).className =
              "t-button rgActionButton "),
              (r.title = "Collapse ");
            var s = document.createElement("span");
            (s.className = "t-font-icon rgIcon rgCollapseIcon"),
              r.appendChild(s);
          } else r = document.createElement("input");
          if (
            (r.setAttribute("type", "submit"),
            r.setAttribute(
              "title",
              this._owner._groupingSettings.CollapseTooltip,
            ),
            (r.id =
              this.get_id() +
              "__" +
              t.groupRowIndex +
              "__" +
              (t.groupLevel - 1)),
            (r.className += "rgCollapse"),
            (r.value = " "),
            (r.onclick = function (e) {
              return (e = e || window.event), n._toggleGroupsExpand(r, e), !1;
            }),
            i.appendChild(r),
            (i = document.createElement("td")),
            this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Lite
              ? (i.innerHTML =
                  "<span class='rgGroupHeaderText'>" +
                  (t.aliasFieldMap[e.field] ||
                    this._data.DataFieldHeaderText[e.field] ||
                    e.field) +
                  ": " +
                  e.value +
                  "</span>")
              : (i.innerHTML =
                  "<p><span class='rgGroupHeaderText'>" +
                  (t.aliasFieldMap[e.field] ||
                    this._data.DataFieldHeaderText[e.field] ||
                    e.field) +
                  ": </span>" +
                  e.value +
                  "</p>"),
            i.setAttribute("colSpan", this._getVisibleColumns().length - o),
            l.appendChild(i),
            t.isEmptyDataGroup)
          ) {
            var d = $telerik.getElementsByClassName(
              this.get_element().tBodies[0],
              "rgGroupHeader",
            );
            d.length > 0 &&
              this.get_element().tBodies[0].insertBefore(
                l,
                d[t.groupLevel - 1],
              );
          } else
            t.dataItemIndex <
              this.get_dataItems().concat(this._cachedItems).length &&
              this.get_element().tBodies[0].insertBefore(
                l,
                this.get_dataItems()
                  .concat(this._cachedItems)
                  [t.dataItemIndex].get_element(),
              );
        },
        _createAggregateRow: function (e, t) {
          var i,
            r,
            n = this.get_columns(),
            l = e.aggregates,
            o = document.createElement("tr"),
            a = t.groupLevels;
          for (o.className = "rgFooter", r = 0; r < a; r++)
            ((i = document.createElement("td")).className = "rgGroupCol"),
              o.appendChild(i);
          for (r = 0; r < n.length - a; r++)
            (i = document.createElement("td")), o.appendChild(i);
          this._updateAggregates(o, l),
            this.get_dataItems().concat(this._cachedItems)[t.dataItemIndex] &&
              this.get_element().tBodies[0].insertBefore(
                o,
                this.get_dataItems()
                  .concat(this._cachedItems)
                  [t.dataItemIndex].get_element(),
              );
        },
        _updateAggregates: function (e, t) {
          for (
            var i = [
                "",
                "sum",
                "min",
                "max",
                "last",
                "first",
                "count",
                "average",
                "countDistinct",
                "custom",
              ],
              r = this.get_columns(),
              n = 0;
            n < r.length;
            n++
          ) {
            var l = r[n];
            if (l._data.Aggregate && l._data.DataField) {
              var o = this._getCellByColumnUniqueNameFromTableRowElement(
                e,
                l._data.UniqueName,
              );
              t[l._data.DataField]
                ? l._data.AggregateClientFormatString.indexOf("{0}")
                  ? (o.innerHTML = l._data.AggregateClientFormatString.replace(
                      "{0}",
                      t[l._data.DataField][i[l._data.Aggregate]],
                    ))
                  : (o.innerHTML = t[l._data.DataField][i[l._data.Aggregate]])
                : (o.innerHTML = "");
            }
          }
        },
        _appendItem: function (e, t, i) {
          var r = this.get_columns();
          if (
            (null == e &&
              (e = this._getNextCachedItem()) &&
              Array.add(this._dataItems, e),
            this._virtualization &&
              ((this._dataItemsByGlobalIndex[
                this._virtualization.get_startIndex() + i
              ] = e),
              this._virtualization._shouldLoadState
                ? this._virtualization.loadState(e)
                : (this._virtualization.hideEditFormItem(
                    e.get_editFormItem(),
                    e.get_element(),
                  ),
                  this._virtualization.updateItemState(e))),
            null != e || (e = this.createItem()))
          ) {
            var n = -1 !== e.get_element().className.indexOf("rgEditRow");
            if (
              (("none" != e.get_element().style.display &&
                "hidden" != e.get_element().style.visibility) ||
                (e.set_visible(!0),
                (e.get_element().style.display = $telerik.isIE
                  ? ""
                  : "table-row")),
              this._owner._clientKeyValues &&
                this._data &&
                this._data.clientDataKeyNames)
            )
              for (
                var l = 0, o = this._data.clientDataKeyNames.length;
                l < o;
                l++
              ) {
                var a = this._data.clientDataKeyNames[l],
                  s = t ? t[a] : null;
                if (this._owner._clientKeyValues[e._itemIndexHierarchical])
                  this._owner._clientKeyValues[e._itemIndexHierarchical][a] = s;
                else {
                  var d = {};
                  null != this._owner._clientKeyValues[e._itemIndexHierarchical]
                    ? (((d =
                        this._owner._clientKeyValues[e._itemIndexHierarchical])[
                        a
                      ] = s),
                      (this._owner._clientKeyValues[e._itemIndexHierarchical] =
                        d))
                    : (((d = {})[a] = s),
                      (this._owner._clientKeyValues[e._itemIndexHierarchical] =
                        d));
                }
              }
            this._data._dataBindTemplates &&
              n &&
              this._fillTemplateEditorsData(e, t);
            for (var h = 0, u = r.length; h < u; h++) {
              var _ = r[h].get_uniqueName(),
                g = this._getCellByColumnUniqueNameFromTableRowElement(
                  e.get_element(),
                  _,
                );
              if (g) {
                this._virtualization &&
                  this._virtualization.loadCellSelection(e, g, _),
                  "Batch" === this._data.EditMode &&
                    this._isColumnEditable(r[h], e.get_element()) &&
                    (g = g.children[0]);
                var c = r[h]._data.DataField;
                "GridAttachmentColumn" == r[h]._data.ColumnType &&
                  (c = r[h]._data.DataTextField),
                  void 0 === c && (c = _);
                var m = t[c];
                if ((null == m && (m = ""), void 0 !== m)) {
                  var p = r[h];
                  n
                    ? p.populateEditCell(g, t, m, e)
                    : p.populateCell(g, t, m, e);
                }
              }
            }
            var f = {},
              w = t;
            (f.get_dataItem = function () {
              return w;
            }),
              (f.get_item = function () {
                return e;
              }),
              (e._dataItem = w),
              this._owner.raise_rowDataBound(f);
          }
        },
        _getHeaderRow: function () {
          var e;
          if (this._hasMultiHeaders) {
            var t = this._owner.ClientSettings.Scrolling,
              i =
                t && t.AllowScroll && t.UseStaticHeaders
                  ? this._owner.get_masterTableViewHeader().get_element()
                  : this.get_element();
            e = $telerik.getElementByClassName(i.tHead, "rgMultiHeaderRow");
          } else
            e =
              this.HeaderRow ||
              this._owner.get_masterTableViewHeader().HeaderRow;
          return e;
        },
        _createGroupColumn: function () {
          this._owner.raise_columnCreating(new Sys.EventArgs());
          var e = this._getHeaderRow(),
            t = document.createElement("th");
          e &&
            ((t.className = "rgHeader rgGroupCol"),
            t.setAttribute("scope", "col"),
            (t.innerHTML = "&nbsp"),
            this._hasMultiHeaders &&
              ((t.id =
                this.get_id() +
                "GroupColumn" +
                e.cells.length +
                "_MultiHeader-1"),
              (t.rowSpan = $telerik.getElementsByClassName(
                e.parentNode,
                "rgMultiHeaderRow",
              ).length)),
            e.insertBefore(t, e.cells[0])),
            this._updateColGroups(!0);
          var i = $create(
              Telerik.Web.UI.GridColumn,
              {
                _owner: this,
                _data: {
                  UniqueName: "GroupColumnClient" + this._groupColumnIndex++,
                  ColumnType: "GridGroupSplitterColumn",
                },
              },
              null,
              null,
              t,
            ),
            r = new Sys.EventArgs();
          (r.get_column = function () {
            return i;
          }),
            (i.Display = !0),
            Array.forEach(
              this.get_dataItems().concat(this._cachedItems),
              function (e) {
                e.get_element().insertBefore(
                  document.createElement("td"),
                  e.get_element().cells[0],
                );
              },
            ),
            this._updateRows(!0),
            this._columnsInternal.unshift(i),
            this._createColumnsByUniqueNameHash(),
            this._owner.raise_columnCreated(r);
        },
        _removeGroupColumn: function () {
          var e = this._getHeaderRow();
          e.removeChild(e.cells[0]),
            this._updateColGroups(!1),
            this._updateRows(!1),
            Array.forEach(
              this.get_dataItems().concat(this._cachedItems),
              function (e) {
                e.get_element().removeChild(e.get_element().cells[0]);
              },
            ),
            this._columnsInternal.shift().dispose(),
            this._createColumnsByUniqueNameHash();
        },
        _updateColGroups: function (e) {
          var t = this._owner;
          this._updateColGroup(this, e),
            t.get_masterTableViewHeader() &&
              this._updateColGroup(t.get_masterTableViewHeader(), e),
            t.get_masterTableViewFooter() &&
              this._updateColGroup(t.get_masterTableViewFooter(), e);
        },
        _updateColGroup: function (e, t) {
          if (t) {
            var i = document.createElement("col");
            (i.style.width =
              this.get_owner()._renderMode == Telerik.Web.UI.RenderMode.Mobile
                ? "41px"
                : "20px"),
              e.ColGroup.insertBefore(
                i,
                e.ColGroup.getElementsByTagName("col")[0],
              ),
              e.ColGroup.Cols.unshift(i);
          } else
            e.ColGroup.removeChild(e.ColGroup.getElementsByTagName("col")[0]),
              e.ColGroup.Cols.shift();
        },
        _updateRows: function (e) {
          var t = this._owner.get_element(),
            i = $telerik.getElementByClassName(t, "rgCommandCell"),
            r = $telerik.getElementByClassName(t, "rgGroupPanelCell"),
            n = $telerik.getElementByClassName(t, "rgFilterRow"),
            l = $telerik.getElementByClassName(t, "rgFooter"),
            o = $telerik.getElementByClassName(t, "rgPager"),
            a = e ? 1 : -1;
          this._owner._renderMode == Telerik.Web.UI.RenderMode.Lite &&
            (r = $telerik.getElementByClassName(t, "rgGroupPanel").parentNode),
            i && (i.colSpan += a),
            r && (r.colSpan += a),
            o && (o.cells[0].colSpan += a),
            n && (e ? this._prependCell(n) : n.removeChild(n.cells[0])),
            l && (e ? this._prependCell(l) : l.removeChild(l.cells[0]));
        },
        _prependCell: function (e) {
          if (e) {
            var t = document.createElement("td");
            return (t.innerHTML = "&nbsp;"), e.insertBefore(t, e.cells[0]), t;
          }
          return {};
        },
        _isColumnEditable: function (e, t) {
          if (e) {
            var i = e._data,
              r = t && "-" === t.id.split("__")[1].charAt(0);
            return (
              (!r || "AlwaysHidden" !== i.InsertVisiblityMode) &&
              (i.Editable || (r && "AlwaysVisible" === i.InsertVisiblityMode))
            );
          }
        },
        _hideRgNoRecordsRow: function (e) {
          for (var t, i = e.rows, r = 0; r < i.length; r++)
            if (
              (t = i[i.length - r - 1]).className &&
              -1 !== t.className.indexOf("rgNoRecords")
            ) {
              t.style.display = "none";
              break;
            }
        },
        _clearRowClassStyles: function (e) {
          var t,
            i = ["rgSelectedRow"],
            r = ["rgSelectedCell"];
          for (t = 0; t < i.length; t++)
            Sys.UI.DomElement.removeCssClass(e, i[t]);
          for (t = 0; t < r.length; t++)
            for (var n = e.getElementsByTagName("td"); n.length < t; t++)
              Sys.UI.DomElement.removeCssClass(n[0], r[t]);
        },
        _getBindingContext: function (e, t) {
          return this._extend({}, e, {
            item: e,
            index: t,
            dataIndex:
              void 0 !== t
                ? this.get_currentPageIndex() * this.get_pageSize() + t
                : null,
            isSelected:
              void 0 !== t &&
              Array.contains(this._owner._selectedIndexes, t + ""),
            owner: this,
            format: this._formatValue,
          });
        },
        _formatValue: function (e, t) {
          return null == e
            ? ""
            : (-1 != e.toString().indexOf("/Date(") &&
                (e = new Date(
                  parseInt(e.replace("/Date(", "").replace(")/", ""), 10),
                )),
              t ? t.indexOf("{0:") < 0 && (t = "{0:" + t + "}") : (t = "{0}"),
              String.localeFormat(t, e));
        },
        _extend: function (e, t) {
          if (arguments.length > 2)
            for (var i = 1; i < arguments.length; i++)
              this._extend(e, arguments[i]);
          else for (var r in t) e[r] = t[r];
          return e;
        },
        _cacheDataItems: function () {
          var e = this.get_dataItems();
          if (this._cachedItems && this._cachedItems.length > 0) {
            var t = this._cachedItems;
            this._cachedItems = e.splice(
              this._dataSource.length,
              e.length - this._dataSource.length,
            );
            for (var i = 0; i < t.length; i++)
              this._cachedItems[this._cachedItems.length] = t[i];
            t = null;
          } else
            this._cachedItems = e.splice(
              this._dataSource.length,
              e.length - this._dataSource.length,
            );
        },
        _getNextCachedItem: function () {
          if (this._cachedItems && this._cachedItems.length > 0)
            return this._cachedItems.splice(0, 1)[0];
        },
        _fillTemplateEditorsData: function (e, t, i) {
          var r = null;
          if (
            (this._owner._editIndexes.length > 0 &&
            Array.contains(this._owner._editIndexes, t._itemIndexHierarchical)
              ? null == i &&
                (r =
                  "InPlace" == e._owner._data.EditMode
                    ? e.get_element()
                    : e.get_element().nextSibling)
              : (r = e.get_element()),
            r || i)
          ) {
            if (!i) {
              if (!r.tagName) return;
              if ("tr" != r.tagName.toLowerCase()) return;
            }
            for (var n in t) {
              var l = $telerik.findControl(null != i ? i : r, n);
              if (null != l) {
                var o = Object.getType(l).getName();
                if (
                  "Telerik.Web.UI.RadTextBox" == o ||
                  "Telerik.Web.UI.RadNumericTextBox" == o ||
                  "Telerik.Web.UI.RadMaskedTextBox" == o
                ) {
                  l.set_value(t[n]);
                  continue;
                }
                if ("Telerik.Web.UI.RadDateInput" == o) {
                  l.set_selectedDate(t[n]);
                  continue;
                }
                if ("Telerik.Web.UI.RadDatePicker" == o) {
                  l.set_selectedDate(t[n]);
                  continue;
                }
                if ("Telerik.Web.UI.RadEditor" == o) {
                  l.set_html(t[n]);
                  continue;
                }
                if ("Telerik.Web.UI.RadComboBox" == o) {
                  var a = l.findItemByValue(t[n]);
                  a ? a.select() : l.set_value(t[n]);
                  continue;
                }
              }
              var s = $telerik.findElement(null != i ? i : r, n);
              if (null != s) {
                if ("input" == s.tagName.toLowerCase()) {
                  if ("checkbox" != s.type && "radio" != s.type) {
                    s.value = t[n];
                    continue;
                  }
                  s.checked = t[n];
                  continue;
                }
                if ("span" == s.tagName.toLowerCase()) {
                  s.innerHTML = t[n];
                  continue;
                }
                if ("textarea" == s.tagName.toLowerCase()) {
                  s.innerHTML = t[n];
                  continue;
                }
                if ("select" == s.tagName.toLowerCase())
                  for (var d = s.options, h = 0; h < d.length; h++)
                    d[h].value == t[n] && (d[h].selected = !0);
              }
            }
          }
        },
        _getEditFormCellByUniqueName: function (e, t) {
          var i = null,
            r = e.get_element().nextSibling;
          if (null != r && r.tagName && "tr" == r.tagName.toLowerCase()) {
            for (
              var n = r.getElementsByTagName("td"), l = 0, o = n.length;
              l < o;
              l++
            )
              if (n[l].id && "" != n[l].id) {
                var a = n[l].id.split("__");
                if (a[a.length - 1] && a[a.length - 1] == t.get_uniqueName()) {
                  i = n[l];
                  break;
                }
              }
            return i;
          }
        },
        _fillEditorsData: function (e, t, i) {
          var r = t._data.ColumnType,
            n = null;
          if (
            null !=
            (n =
              "InPlace" == t._owner._data.EditMode
                ? this.getCellByColumnUniqueName(e, t.get_uniqueName())
                : this._getEditFormCellByUniqueName(e, t))
          ) {
            var l, o, a;
            if (
              ("GridBoundColumn" == r &&
                (l = n.getElementsByTagName("input")).length > 0 &&
                (l[0].value = i),
              "GridDateTimeColumn" == r)
            )
              for (
                l = n.getElementsByTagName("input"), a = 0;
                a < l.length;
                a++
              ) {
                var s = $find(l[a].id);
                null != s && s.set_selectedDate(i);
              }
            if ("GridNumericColumn" == r)
              for (
                l = n.getElementsByTagName("input"), a = 0;
                a < l.length;
                a++
              )
                null != (o = $find(l[a].id)) && o.set_value(i);
            if ("GridHTMLEditorColumn" == r)
              for (
                l = n.getElementsByTagName("textarea"), a = 0;
                a < l.length;
                a++
              )
                null != (o = $find(l[a].id)) && o.set_html(i);
            if ("GridDropDownColumn" == r) {
              for (
                l = n.getElementsByTagName("input"), a = 0;
                a < l.length;
                a++
              )
                if (null != (o = $find(l[a].id.replace("_Input", "")))) {
                  var d = o.findItemByValue(i);
                  d && d.select();
                }
              var h = n.getElementsByTagName("option");
              for (a = 0; a < h.length; a++)
                h[a].value == i && (h[a].selected = !0);
            }
            "GridCheckBoxColumn" == r &&
              1 == (l = n.getElementsByTagName("input")).length &&
              "checkbox" == l[0].type &&
              (l[0].checked = i);
          }
        },
        extractValuesFromItem: function (e) {
          if (
            ((e = this._getRowByIndexOrItemIndexHierarchical(e)),
            Telerik.Web.UI.Grid.GetFirstParentByTagName(e, "table") !==
              this.get_element())
          )
            return null;
          this.get_dataItems();
          for (
            var t = this.get_columns(), i = {}, r = 0, n = t.length;
            r < n;
            r++
          ) {
            var l,
              o,
              a,
              s,
              d,
              h = t[r],
              u = h.get_uniqueName(),
              _ = h._data.ColumnType,
              g = h._data.DataField;
            if ("InPlace" != this._data.EditMode) {
              var c = (
                e.id.indexOf("__") > -1 ? e.nextSibling : e
              ).getElementsByTagName("td");
              for (s = 0, d = c.length; s < d; s++)
                if (c[s].id && !(c[s].id.indexOf("__") < 0)) {
                  var m = c[s].id.split("__");
                  if (m[m.length - 1] == h.get_uniqueName()) {
                    l = c[s];
                    break;
                  }
                }
            } else l = this._getCellByColumnUniqueNameFromTableRowElement(e, u);
            if (l) {
              if (
                ("GridBoundColumn" == _ &&
                  1 == (o = l.getElementsByTagName("input")).length &&
                  (i[g] = o[0].value),
                "GridDateTimeColumn" == _)
              )
                for (
                  o = l.getElementsByTagName("input"), d = 0;
                  d < o.length;
                  d++
                ) {
                  var p = $find(o[d].id);
                  null != p && (i[g] = p.get_selectedDate());
                }
              if ("GridNumericColumn" == _)
                for (
                  o = l.getElementsByTagName("input"), d = 0;
                  d < o.length;
                  d++
                )
                  null != (a = $find(o[d].id)) && (i[g] = a.get_value());
              if ("GridHTMLEditorColumn" == _)
                for (
                  o = l.getElementsByTagName("textarea"), d = 0;
                  d < o.length;
                  d++
                )
                  (a =
                    $find(o[d].name.replace(/\$/gi, "_")) || $find(o[d].id)) &&
                    a.get_html &&
                    (i[g] = a.get_html());
              if ("GridDropDownColumn" == _) {
                for (
                  o = l.getElementsByTagName("input"), d = 0;
                  d < o.length;
                  d++
                )
                  null != (a = $find(o[d].id.replace("_Input", ""))) &&
                    (i[g] = a.get_value());
                var f = l.getElementsByTagName("select");
                if (f.length > 0) {
                  var w = f[0];
                  i[g] = w.options[w.selectedIndex].value;
                }
              }
              "GridCheckBoxColumn" == _ &&
                1 == (o = l.getElementsByTagName("input")).length &&
                "checkbox" == o[0].type &&
                (i[g] = o[0].checked);
            }
          }
          return i;
        },
        extractOldValuesFromItem: function (e) {
          (e = this._getRowByIndexOrItemIndexHierarchical(e)),
            this.get_dataItems();
          var t = $find(e.id),
            i = {};
          return null != t && (i = t.get_dataItem()), i;
        },
        extractKeysFromItem: function (e) {
          var t = {};
          if (
            (e = this._getRowByIndexOrItemIndexHierarchical(e)) &&
            e.id &&
            e.id.indexOf("__") > -1
          ) {
            var i = e.id.split("__")[1];
            if (
              this._owner._clientKeyValues &&
              this._owner._clientKeyValues[i]
            ) {
              var r = this._owner._clientKeyValues[i];
              for (var n in r) t[n] = r[n];
            }
          }
          return t;
        },
        prepareSortQueryOption: function (e, t) {
          if (null != t && "" != t && e.get_count() > 0) {
            for (
              var i = t.split(","), r = "", n = !0, l = 0;
              l < i.length;
              l++
            ) {
              for (var o = 0; o < e.get_count(); o++)
                if (i[l].indexOf(e.getItem(o).get_fieldName()) > -1) {
                  n = !1;
                  break;
                }
              n ? (r += i[l] + ", ") : (n = !0);
            }
            return r.substring(0, r.lastIndexOf(","));
          }
          return t;
        },
        getDataServiceQuery: function (e, t, i, r, n) {
          i = this.prepareSortQueryOption(this.get_sortExpressions(), i);
          var l = this.get_sortExpressions()
              .toString()
              .replace(/ ASC/gm, " asc")
              .replace(/ DESC/gm, " desc"),
            o = this.get_filterExpressions().toDataService();
          (r = void 0 === r ? this.get_currentPageIndex() : r),
            (n = void 0 === n ? this.get_pageSize() : n);
          var a = new Sys.StringBuilder(),
            s = "&$orderby={0}";
          null != i && "" != i
            ? ((s = String.format(s, i)),
              "" != l
                ? ((s += ", {0}"), a.append(String.format(s, l)))
                : a.append(s))
            : "" != l && a.append(String.format(s, l));
          var d = "&$filter={0}";
          null != t && "" != t
            ? ((d = String.format(d, t)),
              "" != o
                ? ((d += " and {0}"), a.append(String.format(d, o)))
                : a.append(d))
            : "" != o && a.append(String.format(d, o)),
            this._owner._isBoundToServiceType(
              Telerik.Web.UI.GridClientDataServiceType.OData,
            ) &&
              ((this.get_allowPaging() || this._virtualization) &&
                a.append("&$inlinecount=allpages"),
              "jsonp" === this._owner._getDataResponseType() &&
                a.append("&$format=json")),
            (this.get_allowPaging() || this._virtualization) &&
              a.append(String.format("&$top={0}&$skip={1}", n, r * n));
          var h = a.toString();
          return e.indexOf("?") > -1 ? e + h : e + "?" + h.substr(1);
        },
      };
    for (t in i) e.GridTableView.prototype[t] = i[t];
  })(Telerik.Web.UI);
