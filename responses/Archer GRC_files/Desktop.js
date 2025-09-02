!(function (e, t) {
  Type.registerNamespace("Telerik.Web.UI");
  var l = "rgFocusable",
    n = "rgActiveCell",
    i = "tr:visible",
    r = ":visible",
    s = i + ">td" + r,
    a = s + ":first",
    o = 37,
    c = 38,
    d = 39,
    u = 40,
    _ = 32;
  (Telerik.Web.UI.GridCellSelection = function () {
    Telerik.Web.UI.GridCellSelection.initializeBase(this),
      (this._owner = {}),
      this._currentTableView,
      (this._lastActiveHeader = null),
      (this.options = null),
      (this._multiple = !1),
      (this._columnSelect = !1),
      (this._multiColumnSelect = !1),
      (this._masterTable = null),
      (this._current = null),
      (this.selectable = null),
      (this.wrapper = null),
      (this._cellSelectedDelegate = null),
      (this._cellSelectingDelegate = null),
      (this._cellDeselectingDelegate = null),
      (this._cellDeselectedDelegate = null),
      (this._upDelegate = null);
  }),
    (Telerik.Web.UI.GridCellSelection.prototype = {
      initialize: function () {
        Telerik.Web.UI.GridCellSelection.callBaseMethod(this, "initialize"),
          (this._cellSelectingDelegate = Function.createDelegate(
            this,
            this._cellSelecting,
          )),
          (this._cellSelectedDelegate = Function.createDelegate(
            this,
            this._cellSelected,
          )),
          (this._cellDeselectingDelegate = Function.createDelegate(
            this,
            this._cellDeselecting,
          )),
          (this._cellDeselectedDelegate = Function.createDelegate(
            this,
            this._cellDeselected,
          )),
          (this.wrapper = e(this._owner.get_element())),
          (this._masterTable = $get(this._owner._masterClientID).tBodies[0]),
          window.$addHandlers(this._masterTable, {
            mousedown: function (t) {
              var l = Telerik.Web.UI.Grid.GetCurrentElement(t);
              Telerik.Web.UI.Grid.IsEditableControl(l) ||
                Telerik.Web.UI.Grid.ClearDocumentEvents(),
                e(document).bind("mouseup", function t() {
                  e(document).unbind("mouseup", t),
                    Telerik.Web.UI.Grid.RestoreDocumentEvents();
                });
            },
          }),
          this._owner.ClientSettings.AllowKeyboardNavigation &&
            this._navigatable(),
          this._selectable();
      },
      _navigatable: function () {
        var _ = this,
          g = _.wrapper,
          f = e(_._masterTable).addClass(l),
          h = e.proxy(_.current, _),
          p = "." + l + " " + s;
        g.bind({
          focus: function (l) {
            var i = _._current;
            if (i && i.is(":visible")) i.addClass(n);
            else if (
              _.get_owner().ClientSettings.Scrolling.EnableVirtualScrollPaging
            ) {
              var r = e(_._masterTable).find(a);
              r != t && r.length && (r.addClass(n), (_._current = r));
            } else h(e(_._masterTable).find(a));
          },
          focusout: function () {
            _._current && _._current.removeClass(n);
          },
          keydown: function (t) {
            var l,
              n,
              s,
              g,
              p,
              C = t.keyCode,
              m = _.current(),
              b = t.shiftKey,
              v = !e(t.target).is(":button,a,:input,a>.t-icon"),
              w = !1;
            if (m && v) {
              if (
                (b &&
                  (m.hasClass(_.options.styles.SELECTED) ||
                    16 == t.keyCode ||
                    _.select(m)),
                c === C)
              ) {
                if (
                  ((g = m.parent().prevAll(i).first()),
                  (p = f.find(a)),
                  0 != g.length && null == g.attr("id"))
                )
                  (s = g.find('table[id*="Detail"]')),
                    (p = (g = s.find("tr[id]:visible").last()).find(a));
                else if (0 == g.length) {
                  var S;
                  for (
                    n = (g = m.parent())
                      .parents('table[id*="Detail"]')
                      .parents("tr"),
                      l = 0;
                    l < n.length;
                    l++
                  )
                    if (null != (S = e(n[l]).prev("tr[id]"))) {
                      g = S;
                      break;
                    }
                }
                h(m ? g.children(":eq(" + m.index() + "),:eq(0)").last() : p),
                  (w = !0);
              } else if (u === C) {
                if (
                  ((g = m.parent().nextAll(i).first()),
                  (p = f.find(a)),
                  0 != g.length && null == g.attr("id"))
                )
                  (s = g.find('table[id*="Detail"]')),
                    (p = (g = s.find("tr[id]:visible").first()).find(a));
                else if (0 == g.length) {
                  var T;
                  for (
                    n = (g = m.parent())
                      .parents('table[id*="Detail"]')
                      .parents("tr"),
                      l = 0;
                    l < n.length;
                    l++
                  )
                    if (null != (T = e(n[l]).next("tr[id]"))) {
                      g = T;
                      break;
                    }
                }
                h(m ? g.children(":eq(" + m.index() + "),:eq(0)").last() : p),
                  (w = !0);
              } else
                o === C
                  ? (h(m ? m.prevAll(r + ":first") : f.find(a)), (w = !0))
                  : d === C &&
                    (h(m ? m.nextAll(":visible:first") : f.find(a)), (w = !0));
              w && (t.preventDefault(), b && _.select(_.current()));
            }
          },
        }),
          g.delegate(p, "mousedown", function (l) {
            _._owner._getGridRow(l) &&
              e(l.currentTarget).parent().attr("id") != t &&
              (h(e(l.currentTarget)),
              e(l.target).is(":button,a,:input, textarea") || g.focus());
          });
      },
      _selectable: function () {
        var t = this,
          l = "rgCellSelectorArea rgCellSelectorArea_" + t._owner.Skin;
        (t.selectable = new Telerik.Web.UI.Extensions.Selectable(
          t._owner.get_element(),
          {
            filter:
              "table.rgMasterTable > tbody > tr[id]:not(.rgDeletedRow) > td:visible",
            multiple: t.get_multiple(),
            multiColumnSelect: t.get_multiColumnSelect(),
            owner: t._owner,
            styles: {
              SELECTED: "rgSelectedCell",
              ACTIVE: "rgFocusedCell",
              UNSELECTING: "web-ui-state-unselecting",
              MARQUEE: l,
            },
            beforeChange: function () {
              (t.shouldUpdateState = t._owner._shouldUpdateClientState),
                (t._owner._shouldUpdateClientState = !1);
            },
            change: function () {
              (t._owner._shouldUpdateClientState = t.shouldUpdateState),
                t._owner.updateClientState();
            },
          },
        )),
          (t.options = t.selectable.options);
        var n = e.proxy(t._getGridTableFromElement, t);
        e.extend(t.selectable, {
          getParentTable: function (e) {
            return n(e);
          },
        }),
          t.selectable.bind("select", t._cellSelectingDelegate),
          t.selectable.bind("selected", t._cellSelectedDelegate),
          t.selectable.bind("deselect", t._cellDeselectingDelegate),
          t.selectable.bind("deselected", t._cellDeselectedDelegate),
          t.get_columnSelect() &&
            (t.wrapper.delegate("th", "mousedown", e.proxy(t._thMouseDown, t)),
            (t._upDelegate = e.proxy(t.selectable._up, t.selectable))),
          t._owner.ClientSettings.AllowKeyboardNavigation &&
            t.wrapper.keydown(function (l) {
              var n = !e(l.target).is(":button,a,:input,a>.t-icon"),
                i = $find(l.target.id);
              if (
                !(
                  !n ||
                  (i &&
                    Telerik.Web.UI.RadGrid.isInstanceOfType(i) &&
                    i.get_id() != t._owner.get_id())
                )
              ) {
                var r = t.current();
                l.keyCode === _ &&
                  (l.preventDefault(),
                  t.get_multiple() && l.ctrlKey
                    ? r.hasClass(t.options.styles.SELECTED) &&
                      (t.deselect(r),
                      r.removeClass(t.options.styles.SELECTED),
                      (r = null))
                    : t.selectable.clear(),
                  t.select(r));
              }
            });
      },
      _thMouseDown: function (l) {
        var n = this,
          i = l.target;
        if (!n._owner._isResize) {
          do {
            if (Telerik.Web.UI.RadGrid.isInstanceOfType($find(i.id))) {
              if ($find(i.id) !== n._owner) return;
              break;
            }
            i = i.parentNode;
          } while (i);
          if (
            !(
              e(l.target).is(":button,a,:input, textarea") ||
              (e(l.target).is("span") &&
                e(l.target).attr("onclick") != t &&
                "" != e(l.target).attr("onclick"))
            )
          ) {
            var r = l.ctrlKey,
              s = l.shiftKey;
            (n._shiftPressed = l.shiftKey),
              (n._downTarget = e(l.currentTarget)),
              n.wrapper.undelegate("th", "mouseup", n._upDelegate),
              n.wrapper.delegate("th", "mouseup", n._upDelegate),
              n.options.multiColumnSelect
                ? n._prepareCellsForMultiColumnSelection(s, r)
                : n._prepareCellsForSingleColumnSelection(s, r),
              (n._lastActiveHeader = n._downTarget);
          }
        }
      },
      select: function (t) {
        var l = this.selectable;
        return (t = e(t)).length
          ? (l.options.multiple || (l.clear(), (t = t.first())),
            void l.value(t))
          : l.value();
      },
      deselect: function (t) {
        var l = this.selectable;
        (t = e(t)).length && l.unselect(t);
      },
      current: function (e) {
        var l = this,
          i = l._current;
        return (
          e !== t &&
            e.length &&
            ((i &&
              (i[0] === e[0] || e.closest("tr").hasClass("rgDeletedRow"))) ||
              (e.addClass(n),
              i && i.removeClass(n),
              (l._current = e),
              l.get_owner().ClientSettings.Scrolling.AllowScroll &&
                l._scrollTo(e.parent()[0], e[0]))),
          l._current
        );
      },
      _cellSelecting: function (t) {
        if (this._owner._getGridRow({ target: t.element })) {
          var l = new Telerik.Web.UI.GridCellSelectCancelEventArgs(
            t.element,
            e,
          );
          this._owner.raise_cellSelecting(l),
            (!l.get_cancel() && l.get_column().get_selectable()) ||
              t.preventDefault();
        } else t.preventDefault();
      },
      _cellSelected: function (t) {
        var l = new Telerik.Web.UI.GridCellSelectEventArgs(t.element, e);
        Array.contains(
          this._owner._selectedCellsIndexes,
          l.get_cellIndexHierarchical(),
        ) ||
          (Array.add(
            this._owner._selectedCellsIndexes,
            l.get_cellIndexHierarchical(),
          ),
          this._owner.raise_cellSelected(l),
          this._owner.updateClientState(),
          l.get_column()._selectedCellsCount++);
      },
      _cellDeselecting: function (t) {
        var l = new Telerik.Web.UI.GridCellSelectCancelEventArgs(t.element, e);
        this._owner.raise_cellDeselecting(l),
          (!l.get_cancel() && l.get_column().get_selectable()) ||
            t.preventDefault();
      },
      _cellDeselected: function (t) {
        var l = new Telerik.Web.UI.GridCellSelectEventArgs(t.element, e);
        Array.contains(
          this._owner._selectedCellsIndexes,
          l.get_cellIndexHierarchical(),
        ) &&
          (Array.remove(
            this._owner._selectedCellsIndexes,
            l.get_cellIndexHierarchical(),
          ),
          this._owner.raise_cellDeselected(l),
          this._owner.updateClientState(),
          l.get_column()._selectedCellsCount--);
      },
      _prepareCellsForSingleColumnSelection: function (t, l) {
        var i = this,
          r = i._getGridTableFromElement(i._downTarget),
          s = r.parentNode,
          a = i._downTarget;
        if (null != r) {
          var o,
            c = i._getHeaderSettings(r),
            d = c.getHeaderIndex(a);
          if (l) {
            (o = e(s).find(
              String.format("{0}:nth-child({1})", i.options.filter, d + 1),
            )),
              i._setActiveOrUnselecting(o),
              i._setActiveCellUponColumnSelection(o);
            for (
              var u = i.get_currentTableView(a[0]).get_columns(), _ = 0;
              _ < u.length;
              _++
            ) {
              var g = u[_];
              g.get_selected() &&
                ((a = g.get_element()),
                (o = e(s).find(
                  String.format(
                    "{0}:nth-child({1})",
                    i.options.filter,
                    c.getHeaderIndex(a) + 1,
                  ),
                )),
                i._setUnselecting(o));
            }
          } else {
            (o = e(s).find(
              String.format("{0}:nth-child({1})", i.options.filter, d + 1),
            )),
              i._setActive(o);
            var f = i.wrapper
              .find(i.options.filter + "." + i.options.styles.SELECTED)
              .not(o);
            i.selectable.unselect(f),
              f.last().removeClass(n),
              i._setActiveCellUponColumnSelection(o);
          }
        }
      },
      _prepareCellsForMultiColumnSelection: function (l, i) {
        var r = this,
          s = r._getGridTableFromElement(r._downTarget),
          a = s.parentNode;
        if (null != s) {
          var o,
            c,
            d,
            u = r._getHeaderSettings(s);
          if (l)
            if (r._lastActiveHeader == t || 0 == r._lastActiveHeader.length)
              (c = r._downTarget),
                (d = u.getHeaderIndex(c)),
                (o = e(a).find(
                  String.format("{0}:nth-child({1})", r.options.filter, d + 1),
                )),
                r._setActiveOrUnselecting(o),
                this._owner.ClientSettings.AllowKeyboardNavigation &&
                  r._setActiveCellUponColumnSelection(o);
            else {
              if (r._lastActiveHeader[0] == r._downTarget[0]) return;
              var _;
              if (
                ((c = r._downTarget),
                (r.selectable._shiftPressed = !1),
                u.hasMultiHeaders)
              ) {
                var g = u.multiHeaders,
                  f = e.inArray(c[0], g),
                  h = e.inArray(r._lastActiveHeader[0], g);
                _ = f > h ? g.slice(h + 1, f + 1) : g.slice(f, h).reverse();
              } else
                _ =
                  c.index() > r._lastActiveHeader.index()
                    ? r._lastActiveHeader.nextAll()
                    : r._lastActiveHeader.prevAll();
              for (var p = 0; p < _.length; ) {
                if (
                  ((c = e(_[p])),
                  (d = u.getHeaderIndex(c)),
                  (o = e(a).find(
                    String.format(
                      "{0}:nth-child({1})",
                      r.options.filter,
                      d + 1,
                    ),
                  )),
                  r._setActiveOrUnselecting(o),
                  c[0] === r._downTarget[0])
                ) {
                  this._owner.ClientSettings.AllowKeyboardNavigation &&
                    r._setActiveCellUponColumnSelection(o);
                  break;
                }
                p++;
              }
            }
          else if (i)
            (c = r._downTarget),
              (d = u.getHeaderIndex(c)),
              (o = e(a).find(
                String.format("{0}:nth-child({1})", r.options.filter, d + 1),
              )),
              r._setActiveOrUnselecting(o),
              this._owner.ClientSettings.AllowKeyboardNavigation &&
                r._setActiveCellUponColumnSelection(o);
          else {
            (c = r._downTarget),
              (d = u.getHeaderIndex(c)),
              (o = e(a).find(
                String.format("{0}:nth-child({1})", r.options.filter, d + 1),
              )),
              r._setActive(o);
            var C = r.wrapper
              .find(r.options.filter + "." + r.options.styles.SELECTED)
              .not(o);
            r.selectable.unselect(C),
              C.last().removeClass(n),
              this._owner.ClientSettings.AllowKeyboardNavigation &&
                r._setActiveCellUponColumnSelection(o);
          }
        }
      },
      _setActiveCellUponColumnSelection: function (e) {
        this.selectable._downTarget = this.current(e.first());
      },
      _setActiveCellElement: function (t) {
        this.selectable._downTarget = this.current(e(t));
      },
      _setActiveOrUnselecting: function (t) {
        for (var l = this, n = 0; n < t.length; n++)
          e(t[n]).hasClass(l.options.styles.SELECTED)
            ? e(t[n]).addClass(l.options.styles.UNSELECTING)
            : e(t[n]).addClass(l.options.styles.ACTIVE);
      },
      _setActive: function (t) {
        for (var l = 0; l < t.length; l++)
          e(t[l]).hasClass(this.options.styles.SELECTED) ||
            e(t[l]).addClass(this.options.styles.ACTIVE);
      },
      _setUnselecting: function (t) {
        for (var l = 0; l < t.length; l++)
          e(t[l]).hasClass(this.options.styles.SELECTED) &&
            e(t[l]).addClass(this.options.styles.UNSELECTING);
      },
      _scrollTo: function (e, t) {
        var l = e.offsetTop,
          n = $get(this._owner.get_id() + "_GridData"),
          i = t.offsetLeft,
          r = e.offsetHeight,
          s = t.offsetWidth,
          a = n.scrollTop,
          o = n.scrollLeft,
          c = n.clientHeight,
          d = n.clientWidth,
          u = l + r,
          _ = i + s;
        (n.scrollTop = a > l ? l : u > a + c ? u - c : a),
          (n.scrollLeft = o > i ? i : _ > o + d ? _ - d : o);
      },
      _selectColumnByHeaderElement: function (e, t) {
        null != e.get_element
          ? this._selectColumnCells(t, e.get_element())
          : this._selectColumnCells(t, e);
      },
      _deselectColumnByHeaderElement: function (e, t) {
        null != e.get_element
          ? this._deselectColumnCells(t, e.get_element())
          : this._deselectColumnCells(t, e);
      },
      _selectColumnCells: function (t, l) {
        var n = this,
          i = l.parentNode;
        if ((null == l && (l = n._getGridTableFromElement(t)), l)) {
          var r = n._getHeaderSettings(l).getHeaderIndex(t),
            s = e(i).find(
              String.format("{0}:nth-child({1})", n.options.filter, r + 1),
            );
          n.selectable.value(s);
        }
      },
      _deselectColumnCells: function (t, l) {
        var n = this,
          i = l.parentNode;
        if ((null == l && (l = n._getGridTableFromElement(t)), l)) {
          var r = n._getHeaderSettings(l).getHeaderIndex(t),
            s = e(i).find(
              String.format("{0}:nth-child({1})", n.options.filter, r + 1),
            );
          n.selectable.unselect(s);
        }
      },
      _deselectTableViewCells: function (l) {
        var n = this,
          i = l.parentNode;
        if (l) {
          l.get_element != t && (l = l.get_element());
          var r = e(i).find(
            String.format(
              "{0}.{1}",
              n.options.filter,
              n.options.styles.SELECTED,
            ),
          );
          n.selectable.unselect(r);
        }
      },
      _clear: function () {
        this.selectable.clear();
      },
      _isMasterTable: function (e) {
        var t = !1;
        return e.id == this._owner._masterClientID && (t = !0), t;
      },
      _isDetailTable: function (e) {
        return new RegExp(this.get_owner().get_id() + ".+Detail.+").test(e.id);
      },
      _isHeaderTable: function (e) {
        return new RegExp(this.get_owner().get_id() + ".+Header").test(e.id);
      },
      _getGridTableFromElement: function (t) {
        for (
          var l, n = this, i = e(t).parents("table"), r = 0;
          r < i.length;
          r++
        ) {
          if (n._isMasterTable(i[r]) || n._isDetailTable(i[r])) {
            l = i[r];
            break;
          }
          n._isHeaderTable(i[r]) &&
            (l = e(i[r])
              .parents('div[id="' + this.get_owner().get_id() + '"]')
              .find('div[id="' + this.get_owner().get_id() + '_GridData"]')
              .find('table[id*="' + this.get_owner().get_id() + '"]')).length >
              0 &&
            (l = l[0]);
        }
        return l;
      },
      _getHeaderSettings: function (t) {
        var l = {
          hasMultiHeaders: !1,
          multiHeaders: [],
          getHeaderIndex: function (t) {
            return e(t).index();
          },
        };
        if (t.id) {
          var n = $find(t.id),
            i = this._owner;
          n &&
            !n.get_parentView() &&
            (n = i.MasterTableViewHeader
              ? i.MasterTableViewHeader
              : i.MasterTableView);
          var r = n._hasMultiHeaders,
            s = n.MultiHeaderCells;
          r &&
            ((l.hasMultiHeaders = !0),
            (l.multiHeaders = s),
            (l.getHeaderIndex = function (t) {
              var l = e(t);
              return e.inArray(l[0], s);
            }));
        }
        return l;
      },
      get_currentTableView: function (e) {
        var t,
          l = this;
        return (
          (t = l._getGridTableFromElement(e).id),
          (null != l._currentTableView && l._currentTableView.get_id() == t) ||
            (l._currentTableView = $find(t)),
          l._currentTableView
        );
      },
      get_column: function (e) {
        for (
          var t, l = this.get_currentTableView().get_columns(), n = 0;
          n < l.length;
          n++
        )
          if (l[n].get_uniqueName() == e) {
            t = l[n];
            break;
          }
        return t;
      },
      get_owner: function () {
        return this._owner;
      },
      set_owner: function (e) {
        this._owner = e;
      },
      get_multiple: function () {
        return this._multiple;
      },
      set_multiple: function (e) {
        this._multiple = e;
      },
      get_columnSelect: function () {
        return this._columnSelect;
      },
      set_columnSelect: function (e) {
        this._columnSelect = e;
      },
      get_multiColumnSelect: function () {
        return this._multiColumnSelect;
      },
      set_multiColumnSelect: function (e) {
        this._multiColumnSelect = e;
      },
    }),
    Telerik.Web.UI.GridCellSelection.registerClass(
      "Telerik.Web.UI.GridCellSelection",
      Sys.Component,
    );
})($telerik.$);
