
Type.registerNamespace('ArcherTech.UI');if(isRightToLeftSet==undefined)
{var isRightToLeftSet=false;}
if(!isRightToLeftSet&&Telerik.Web.UI.Grid)
{isRightToLeftSet=true;Telerik.Web.UI.Grid.IsRightToLeft=function(){return false;};}
ArcherTech.UI.ArcherRadGrid=function(element)
{ArcherTech.UI.ArcherRadGrid.initializeBase(this,[element]);};ArcherTech.UI.ArcherRadGrid.prototype={collapsedRows:[],initialize:function(){ArcherTech.UI.ArcherRadGrid.callBaseMethod(this,'initialize');var grid=$('#'+this.get_id());this._removeTabIndexes(grid);if(document.URL.indexOf('WorkspaceDashboard')==-1&&window.previousScrollPosition)
{setTimeout(function(){grid.find('div.rgDataDiv:first').scrollTop(window.previousScrollPosition);},200);}
if(document.URL.indexOf('Search.aspx')>-1)
{if(this.ClientSettings&&this.ClientSettings.Scrolling&&this.ClientSettings.Scrolling.UseStaticHeaders){$(this.Control).addClass('RadGrid_archer_fixed_headers');var resultTableId=this.ClientID.replace('srviewgrid','tbl');var resultTable=$(this.Control).closest('#'+resultTableId);resultTable.addClass('RadGrid_archer_fixed_headers');var masterResultSection=resultTable.closest('#master-content-container-scroll');masterResultSection.css({'overflow':'hidden'});}
this.resizeView=new ArcherTech.UI.GridResizeView(grid);this.resizeView.render();}
var controlHeadRef=$(this.Control).find('th.rgHeader.rgSorted');var input=controlHeadRef.children('input');var anchor=controlHeadRef.children('a')[0];if(input.length!=0){input.attr('aria-label',anchor.outerText+' '+input.attr('title'));input.attr('id','sorticon');}
var tbody=$(this.Control).find('tbody');if(tbody.length>1){var keyfields=tbody.find('.rgRow>td.keyField,.rgAltRow>td.keyField');if(keyfields.length>0){$(keyfields).replaceWith(function(i,html){var elm=this;var newelm=ArcherTech.UI.ArcherRadGrid.prototype.copyElementAttributes(this,$('<th />',{html:$(elm).html()}));newelm.attr('scope','row');return newelm;});}
var SystemURLs=tbody.find('.rgRow>td.SystemURL,.rgAltRow>td.SystemURL');if(SystemURLs.length>0){$(SystemURLs).replaceWith(function(i,html){return'<th class=\'SystemURL\' scope=\'row\'>'+html+'</th>';});}}
var firstEle=tbody.find('.first');if(firstEle.length>0){firstEle.attr('scope','row');}
ArcherTech.UI.ArcherRadGrid.prototype.bindExpandCollapseRetainHandlers();ArcherTech.UI.ArcherRadGrid.prototype.restoreCollapsedRows();},dispose:function()
{ArcherTech.UI.ArcherRadGrid.callBaseMethod(this,'dispose');},_removeTabIndexes:function(grid)
{grid.attr('tabindex','-1');grid.find('input.rgUngroup').attr('tabindex','-1');},copyElementAttributes:function(sourceElm,targetElm){for(var att,i=0,atts=sourceElm.attributes,n=atts.length;i<n;i++){if(atts[i]){att=atts[i];targetElm.attr(att.nodeName,att.nodeValue);}}
return targetElm;},addToCollapsedList:function(ev){var collapsedRowList=ArcherTech.UI.ArcherRadGrid.prototype.collapsedRows;var id=$(this).attr('id');if(collapsedRowList.indexOf(id)===-1)
collapsedRowList.push(id);setTimeout(ArcherTech.UI.ArcherRadGrid.prototype.bindExpandCollapseRetainHandlers);},removeFromCollapsedList:function(ev){var collapsedRowList=ArcherTech.UI.ArcherRadGrid.prototype.collapsedRows;var id=$(this).attr('id');var index=collapsedRowList.indexOf(id);collapsedRowList.splice(index,1);setTimeout(ArcherTech.UI.ArcherRadGrid.prototype.bindExpandCollapseRetainHandlers);},bindExpandCollapseRetainHandlers:function(){$('.rgCollapse').each(function(i,colBtn){if($(colBtn).parent()&&$(colBtn).parent().parent()&&$(colBtn).parent().parent().hasClass('rgGroupHeader')){$(colBtn).unbind('click',ArcherTech.UI.ArcherRadGrid.prototype.addToCollapsedList);$(colBtn).bind('click',ArcherTech.UI.ArcherRadGrid.prototype.addToCollapsedList);}});$('.rgExpand').each(function(i,expBtn){if($(expBtn).parent()&&$(expBtn).parent().parent()&&$(expBtn).parent().parent().hasClass('rgGroupHeader')){$(expBtn).unbind('click',ArcherTech.UI.ArcherRadGrid.prototype.removeFromCollapsedList);$(expBtn).bind('click',ArcherTech.UI.ArcherRadGrid.prototype.removeFromCollapsedList);}});},restoreCollapsedRows:function(){ArcherTech.UI.ArcherRadGrid.prototype.collapsedRows=sessionStorage.getItem('CollapsedRows')&&JSON.parse(sessionStorage.getItem('CollapsedRows'))||[];var collapsedRowList=ArcherTech.UI.ArcherRadGrid.prototype.collapsedRows;collapsedRowList.forEach(function(collpsed){var elm=$('#'+collpsed);if(elm)
elm.trigger('click');});sessionStorage.removeItem('CollapsedRows');}};function ExpandCollapseItem(elem,id,contentid)
{var row=null;var parent=elem.parentNode;window.previousScrollPosition=$(elem).closest('.rgDataDiv').scrollTop();window.maintainFocus=true;while(row==null&&parent!=null)
{if(parent.id.indexOf(id)===0)
{row=parent;}
else
{parent=parent.parentNode;}}
if(row)
{var hdn=$('#'+id+'ecs');var state=hdn.val().split('|');var hidx=row.id.split('__')[1];if(Array.contains(state,hidx))
{Array.remove(state,hidx);var i,iMax=state.length;var stateToDelete=[];for(i=0;i<iMax;++i)
{if(state[i].startsWith(hidx+':'))
{Array.add(stateToDelete,state[i]);}}
iMax=stateToDelete.length;for(i=0;i<iMax;++i)
{Array.remove(state,stateToDelete[i]);}}
else
{Array.add(state,hidx);}
hdn.val(state.join('|'));var hdnids=$('#ecids_hf');var stateids=hdnids.val().split('|');if(Array.contains(stateids,contentid))
{var i,iMax=stateids.length;var stateidsToDelete=new Array();for(i=0;i<iMax;++i)
{if(stateids[i].startsWith(contentid))
{Array.add(stateidsToDelete,stateids[i]);}}
iMax=stateidsToDelete.length;for(i=0;i<iMax;++i)
{Array.remove(stateids,stateidsToDelete[i]);}
stateids[0]='X';}
else
{Array.add(stateids,contentid);}
hdnids.val(stateids.join('|'));}
sessionStorage.setItem('CollapsedRows',JSON.stringify(ArcherTech.UI.ArcherRadGrid.prototype.collapsedRows));}
function OnHierarchyCollapsed(sender,eventArgs)
{$(eventArgs.get_nestedViewItem()).find('td').css('display','none');}
function OnHierarchyExpanded(sender,eventArgs){var nestedItem=$(eventArgs.get_nestedViewItem());nestedItem.find('.rgExpand').each(function(index)
{$(this).trigger('click');});nestedItem.find('td').css('display','inline');}
ArcherTech.UI.GridResizeView=function(grid){this._dataDiv=grid.find('div.rgDataDiv:first');this._container=window.MasterPageController.GetContainer();this._scrollOffset=20;this.initialize();};ArcherTech.UI.GridResizeView.prototype={initialize:function(){var self=this;this._container.resize(function(){self.render();});},render:function(){if(this._dataDiv.offset()!=null&&this._container.outerHeight()-this._dataDiv.offset().top>0)
{this._dataDiv.height(this._container.outerHeight()-this._dataDiv.offset().top+this._scrollOffset);}}};ArcherTech.UI.ArcherRadGrid.registerClass('ArcherTech.UI.ArcherRadGrid',Telerik.Web.UI.RadGrid);