
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.ReferenceField=function(element)
{ArcherTech.UI.ReferenceField.initializeBase(this,[element]);this._lookupUrl=null;this._uniqueId=null;this._hiddenFieldName=null;this._asyncChgFieldName=null;this._fieldId=null;this._layoutItemUniqueId=null;this._customFieldHeight=null;this._customFieldWidth=null;this._isDdeReadOnly=null;this._isHidden=null;this._isInDdeCondition=null;this._isInSubSection=false;this._namingContainer=null;this._referenceFieldType=null;this._referenceFieldId=null;this._displayControlType=null;this._viewAllViewLessCssMarker=null;this._defaultGridDisplayRowCount=null;this._skipDirtyContent=null;this._hasPendingClientSideValueChangedEvent=null;this._isQuestionnaireComments=null;this._viewAll=null;this._viewAdditionalRecordsMsg=null;this._maxValue=null;this._maxSelectionWarningText='';this._addNewHref='';this._addNew_attr_href='';this._iframeTitle=null;this._lookupReportId=null;this._dynamicFilterFieldIds=null;this._isEditableGridDisplay=false;this._isInEditMode=false;this._isBulkIleEnabled=false;};ArcherTech.UI.ReferenceField.prototype={initialize:function()
{ArcherTech.UI.ReferenceField.callBaseMethod(this,'initialize');if(this._isDdeReadOnly)
{this.makeReadOnly();}
else if(this._isHidden)
{this.changeDisplay(false);}
if(this._hasPendingClientSideValueChangedEvent)
{var self=this;setTimeout(function(){__GenericContentFieldValueChanged(self,{argument:self.get_fieldId(),_newValue:self.get_selectedIds(),skipDirtyContent:self.get_skipDirtyContent()});},10);}
var noRecordsCell=$('#'+this.get_id()).find('.rgNoRecords div:visible');if(noRecordsCell.length>0){noRecordsCell.attr('id',this.get_id()+'_norecords');var lastIndex=this.get_id().lastIndexOf('_');parentEleID=this.get_id().substring(0,lastIndex);$('#'+parentEleID).find('.SubSectionLabel').attr('aria-describedby',this.get_id()+'_norecords');}
this._setAddNewLinkState();if(this._isBulkIleEnabled){this._hideBulkILEControls();this._formatBulkILEHeader();this._resetBulkEditors();if(this.isInEditMode){this._enableBulkILE();}}},dispose:function()
{ArcherTech.UI.ReferenceField.callBaseMethod(this,'dispose');},get_lookupUrl:function()
{return this._lookupUrl;},set_lookupUrl:function(val)
{this._lookupUrl=val;},get_uniqueId:function()
{return this._uniqueId;},set_uniqueId:function(val)
{this._uniqueId=val;},get_selectedIds:function()
{var serIds=$gv(this.get_hiddenFieldName());return Sys.Serialization.JavaScriptSerializer.deserialize(serIds);},set_selectedIds:function(val)
{var serIds=Sys.Serialization.JavaScriptSerializer.serialize(val);$sv(this.get_hiddenFieldName(),serIds);$sv(this.get_asyncChgFieldName(),'y');},get_SelectedInMRFT:function()
{return $gv('SelectedInMRFT'+this._fieldId);},set_SelectedInMRFT:function(val)
{$sv('SelectedInMRFT'+this._fieldId,val);},get_hiddenFieldName:function()
{return this._hiddenFieldName;},set_hiddenFieldName:function(val)
{this._hiddenFieldName=val;},get_isQuestionnaireComments:function()
{return this._isQuestionnaireComments;},set_isQuestionnaireComments:function(val)
{this._isQuestionnaireComments=val;},get_asyncChgFieldName:function()
{return this._asyncChgFieldName;},set_asyncChgFieldName:function(val)
{this._asyncChgFieldName=val;},get_fieldId:function()
{return this._fieldId;},set_fieldId:function(val)
{this._fieldId=val;},get_namingContainer:function()
{return this._namingContainer;},set_namingContainer:function(val)
{this._namingContainer=val;},get_isDdeReadOnly:function()
{return this._isDdeReadOnly;},set_isDdeReadOnly:function(val)
{this._isDdeReadOnly=val;},get_isHidden:function()
{return this._isHidden;},set_isHidden:function(val)
{this._isHidden=val;},get_isInDdeCondition:function()
{return this._isInDdeCondition;},set_isInDdeCondition:function(val)
{this._isInDdeCondition=val;},get_isInSubSection:function()
{return this._isInSubSection;},set_isInSubSection:function(val)
{this._isInSubSection=val;},get_layoutItemUniqueId:function()
{return this._layoutItemUniqueId;},set_layoutItemUniqueId:function(val)
{this._layoutItemUniqueId=val;},get_customFieldHeight:function()
{return this._customFieldHeight;},set_customFieldHeight:function(val)
{this._customFieldHeight=val;},get_viewAllViewLessCssMarker:function()
{return this._viewAllViewLessCssMarker;},set_viewAllViewLessCssMarker:function(val)
{this._viewAllViewLessCssMarker=val;},get_defaultGridDisplayRowCount:function()
{return this._defaultGridDisplayRowCount;},set_defaultGridDisplayRowCount:function(val)
{this._defaultGridDisplayRowCount=val;},get_customFieldWidth:function()
{return this._customFieldWidth;},set_customFieldWidth:function(val)
{this._customFieldWidth=val;},get_referenceFieldType:function()
{return this._referenceFieldType;},set_referenceFieldType:function(val)
{this._referenceFieldType=val;},get_referenceFieldId:function()
{return this._referenceFieldId;},set_referenceFieldId:function(val)
{this._referenceFieldId=val;},get_displayControlType:function()
{return this._displayControlType;},set_displayControlType:function(val)
{this._displayControlType=val;},get_skipDirtyContent:function(){return this._skipDirtyContent;},set_skipDirtyContent:function(val){this._skipDirtyContent=val;},get_hasPendingClientSideValueChangedEvent:function()
{return this._hasPendingClientSideValueChangedEvent;},set_hasPendingClientSideValueChangedEvent:function(val)
{this._hasPendingClientSideValueChangedEvent=val;},get_viewAll:function()
{return this._viewAll;},set_viewAll:function(val)
{this._viewAll=val;},get_viewAdditionalRecordsMsg:function()
{return this._viewAdditionalRecordsMsg;},set_viewAdditionalRecordsMsg:function(val)
{this._viewAdditionalRecordsMsg=val;},get_maxValue:function(){return this._maxValue;},set_maxValue:function(val){this._maxValue=val;},get_maxSelectionWarningText:function(){return this._maxSelectionWarningText;},set_maxSelectionWarningText:function(val){this._maxSelectionWarningText=val;},get_addNewHref:function(){return this._addNewHref;},set_addNewHref:function(val){this._addNewHref=val;},get_iframeTitle:function(){return this._iframeTitle;},set_iframeTitle:function(val){this._iframeTitle=val;},get_lookupReportId:function()
{return this._lookupReportId;},set_lookupReportId:function(val)
{this._lookupReportId=val;},get_dynamicFilterFieldIds:function()
{return this._dynamicFilterFieldIds;},set_dynamicFilterFieldIds:function(val)
{this._dynamicFilterFieldIds=val;},get_isEditableGridDisplay:function(){return this._isEditableGridDisplay;},set_isEditableGridDisplay:function(val){this._isEditableGridDisplay=val;},get_isBulkIleEnabled:function(){return this._isBulkIleEnabled;},set_isBulkIleEnabled:function(val){this._isBulkIleEnabled=val;},get_isInEditMode:function(){return this.isInEditMode;},set_isInEditMode:function(val){this.isInEditMode=val;},applyDDEReadOnly:function(isReadOnly)
{if(isReadOnly)
{this.makeReadOnly();}
else
{this.makeEditable();}
this.set_isDdeReadOnly(isReadOnly);},showLookup:function()
{if(window)
{window.onerror=function(errorMsg){if(errorMsg==='Permission denied')return true;};}
if(this.get_dynamicFilterFieldIds()==null)
{var oThis=this;Security2000.GenericContent.GenericContentService.GetDynamicFilterFieldIds(this.get_lookupReportId(),function(result)
{oThis.set_dynamicFilterFieldIds(result);oThis.finalizeLookup();},function()
{});}
else
{this.finalizeLookup();}},finalizeLookup:function()
{var fieldArray={};var dynamicFieldIds=this.get_dynamicFilterFieldIds();if(dynamicFieldIds&&ArcherTech.UI.ClientContentManager)
{var contentManager=ArcherTech.UI.ClientContentManager.GetInstance();for(var i=0;i<dynamicFieldIds.length;i++){var dynamicFilterFieldId=dynamicFieldIds[i];fieldArray[dynamicFilterFieldId]=contentManager.getDynamicLookupFieldValue(dynamicFilterFieldId);}}
ArcherTech.UI.ReferenceField.OpenLookupWindow(this);var form=ArcherTech.UI.ReferenceField.GetLookupForm();form.action=this.get_lookupUrl();$mh('dynamicFilters',Sys.Serialization.JavaScriptSerializer.serialize(fieldArray),form);$mh('selectedValues',this.get_selectedIds().join(','),form);setTimeout(function(){form.submit();},100);},setLookedUpRecords:function(recordIds)
{this.set_selectedIds(recordIds);if(recordIds&&recordIds.length>0)
{$('a.applyButton').show();}
else
{$('a.applyButton').hide();}
var grid=$(this._element);this._detachCalenderInstance(grid);__doPostBack(this.get_uniqueId(),'');},_getRadGridObj:function()
{var id=this.get_id();id=id.substr(0,id.length-1)+'grid';return $find(id);},_setReferenceFieldHeight:function(refFieldObj)
{var fieldHeight=this._customFieldHeight;if(fieldHeight==null)
{return;}
switch(this._displayControlType)
{case'SingleColumn':var refFieldSelectedItemsObj=jQuery('#'+this._referenceFieldId+' .SelectedOverFlowDiv');if(refFieldSelectedItemsObj.length>0)
{refFieldSelectedItemsObj.css('overflow','auto');refFieldSelectedItemsObj.height(1.5*Math.min(fieldHeight,this.get_selectedIds().length)+'em');}
break;case'DropDownList':case'Grid':break;default:}},changeDisplay:function(show)
{var func=show?'removeClass':'addClass';switch(this._displayControlType)
{case'SingleColumn':$(this._element)[func]('hidden');var addNew=$($get(this.get_id()+'_Add_New'));if(addNew&&addNew.length>0){show?addNew.show():addNew.hide();}
break;case'Grid':$($get(this._namingContainer))[func]('hidden');break;default:break;}},makeReadOnly:function()
{switch(this._displayControlType)
{case'SingleColumn':var control=$(this._element);var container=$(this._element.parentElement);var readOnly=container.find('.readOnly');if(!readOnly.length)
{readOnly=$('<div class=\'readOnly\'></div>').appendTo(container);}
var selectedContent=container.find('.SelectedOverFlowDiv');if(selectedContent.length)
{selectedContent.find('img').hide();readOnly.html(selectedContent.html());}
readOnly.show();control.hide();break;case'Grid':var containerId=this._namingContainer;var container=$($get(containerId));var hideCommands=function(containerId)
{var addNew=$('#'+containerId+'_'+window._localizedResources.addNew.replace(' ','_'));var lookup=$('#'+containerId+'_'+window._localizedResources.lookup.replace(' ','_'));if(addNew&&addNew.length>0)
{addNew.hide();addNew.prev().hide();}
if(lookup&&lookup.length>0)
{lookup.hide();lookup.prev().hide();}};var selector='#'+containerId;var supportedReadonlyLinks=$(selector+'_'+window._localizedResources.viewAll.replace(' ','_')+','+
selector+'_'+window._localizedResources.viewLess.replace(' ','_')+','+
selector+'_'+window._localizedResources.enableInlineEdit.replace(' ','_'));if(supportedReadonlyLinks&&supportedReadonlyLinks.length>0)
{hideCommands(containerId);}
else
{container.find('.ml-command-items-div').hide();}
container.find('.GridRemoveImage').hide();break;default:break;}
if(this._isQuestionnaireComments)
{$('.comments').hide();}},makeEditable:function()
{switch(this._displayControlType)
{case'SingleColumn':var control=$(this._element);var container=$(this._element.parentElement);var readOnly=container.find('.readOnly');if(readOnly.length)
{readOnly.hide();}
control.find('img').show();var addNew=$('#'+control.attr('id')+' .add-new');if(addNew&&addNew.length>0)
{addNew.show();}
control.show();break;case'Grid':var containerId=this._namingContainer;var container=$($get(containerId));var addNew=$('#'+containerId+' .add-new');var lookup=$('#'+containerId+'_Lookup');if(addNew&&addNew.length>0)
{addNew.show();addNew.prev().show();}
if(lookup&&lookup.length>0)
{lookup.show();lookup.prev().show();}
container.find('.ml-command-items-div').show();container.find('.GridRemoveImage').show();break;default:break;}
if(this._isQuestionnaireComments)
{$('.comments').show();}},removeRecord:function(elem,rec)
{var ids=this.get_selectedIds();Array.remove(ids,rec);this.set_selectedIds(ids);var field=ArcherTech.UI.ClientContentManager.GetInstance().getFieldById(this.get_fieldId());if(!$nu(field))
{if(field.displayControl==12)
{div=elem.parentNode;div.parentNode.removeChild(div);}}
__GenericContentFieldValueChanged(this,{_newValue:ids});if(!$nu(ids)&&!$nu(this._defaultGridDisplayRowCount))
{if(ids.count==this._defaultGridDisplayRowCount)
{$('.'+this._viewAllViewLessCssMarker).hide();}}
this._setAddNewLinkState();var mrft=$('div[id$=mrft_f'+this.get_fieldId()+'c]');if(this._displayControlType=='AnswerValueGrid'||mrft.length>0)
{__doPostBack(this.get_uniqueId(),'');}
if(this._displayControlType=='Grid'&&!this.get_viewAll()&&ids.length>0&&$('#'+this.get_id()).find('tbody tr').length<=2)
{var noRecordsDiv=$('#'+this.get_id()).find('.rgNoRecords div');var fId=this.get_fieldId();var that=this;var viewAdditionalRecordsMsg=this.get_viewAdditionalRecordsMsg();setTimeout(function(){var linkOnclickJs=that._makeViewLessPB(fId);noRecordsDiv.html('<a class="ContentURL" href="javascript:$pb(\''+linkOnclickJs+'\')">'+viewAdditionalRecordsMsg+'</a>');},42);}
this._hideSelectallAndBulkILEControls();},_hideSelectallAndBulkILEControls:function(){var $table=$(this._element).find('table');var table=$table[0];if(table.tBodies[0].rows.length==1){var colgroup=$table.find('colgroup');var firstCol=colgroup.find('col').first();var thead=$table.find('thead');var selectAllCheckBox=thead.find('th').first();var noRecordsCell=$table.find('.rgNoRecords > td');var bulkIleEditorSection=$table.find('#bulkIleEditors');bulkIleEditorSection.hide();if(selectAllCheckBox!==null&&selectAllCheckBox[0]!==null&&selectAllCheckBox[0].innerHTML.includes('<input'))
{firstCol.hide();selectAllCheckBox.hide();var currentColSpan=noRecordsCell.attr('colspan');noRecordsCell.attr('colspan',currentColSpan-1);}}},_makeViewLessPB:function(fieldId)
{var _plpbea=new PreLoadPostBackEventArgument();_plpbea.set_e('referenceFieldViewAllViewLess');var _keyValuePairViewAll=new KeyValuePair();var _keyValuePairFieldid=new KeyValuePair();_keyValuePairViewAll.set_Key('viewAll');_keyValuePairViewAll.set_Value(false);_keyValuePairFieldid.set_Key('fieldid');_keyValuePairFieldid.set_Value(fieldId);_plpbea.get_a().push(_keyValuePairViewAll);_plpbea.get_a().push(_keyValuePairFieldid);return Sys.Serialization.JavaScriptSerializer.serialize(_plpbea).replace(/"/g,'&quot;');},disableAddNew:function(disabled){switch(this._displayControlType){case'SingleColumn':var control=$(this._element),addNew=$('#'+control.attr('id')+' .add-new');this._addNew_attr_href=this._addNewHref;if(disabled){if(!addNew.hasClass('Disabled')){addNew.addClass('Disabled');this._addNew_attr_href=addNew.attr('href');addNew.removeAttr('href');}}else{if(addNew.hasClass('Disabled')){addNew.removeClass('Disabled');addNew.attr('href',this._addNew_attr_href);addNew.removeAttr('disabled');}}
break;case'Grid':var addNew=$('#'+this._namingContainer+' .add-new');if(addNew.length>0){if(disabled){if(!addNew.hasClass('Disabled')){addNew.addClass('Disabled');this._addNew_onclick_handler=addNew[0].onclick;addNew[0].onclick=null;addNew.unbind('click');addNew.click(function(e){e.stopImmediatePropagation();e.preventDefault();});}}else{if(addNew.hasClass('Disabled')){addNew.removeClass('Disabled');addNew.unbind('click');addNew.click(this._addNew_onclick_handler);addNew.removeAttr('disabled');}}}
break;default:break;}},_setAddNewLinkState:function(){if(this._maxValue){var ids=this.get_selectedIds();if(ids.length>=this._maxValue){this.disableAddNew(true);}
else{this.disableAddNew(false);}}},_hideBulkILEControls:function(){if(this._referenceFieldType&&this._referenceFieldType=='Subform')return;if(!this._isBulkIleEnabled)return;var gridId=this._findAndReplace(this._uniqueId,'$','_');var $selectAllCheckbox=$('#'+gridId).find('.levelSelectAll');$selectAllCheckbox.hide();var colGroups=$('div#'+this._findAndReplace(this._uniqueId.substring(0,this._uniqueId.length-1)+'srvgrid','$','_')).find('colgroup > col:nth-child(1)');var colGroupColItem=colGroups.get(0);if(colGroupColItem){this.checkboxColWidth=colGroupColItem.style.width;colGroupColItem.style.width=0;colGroups.each(function(idx,colGroupEntry){colGroupEntry.style.width=0;});}else{this.checkboxColWidth=30;}},_formatBulkILEHeader:function(){if(!this._isBulkIleEnabled)return;var gridId=this._findAndReplace(this._uniqueId,'$','_');var $gridContainer=$('#'+gridId).first();var grids=$gridContainer.find('div.RadGrid');grids.each(function(){var $grid=$(this);var tableHeaderDef=$grid.find('table thead').first();var headerColumns=$grid.find('tr th.rgHeader');var hasIleContainers=headerColumns.find('div.bulkIleControlContainer').length>0;if(!hasIleContainers)
return;var newRow=$('<tr id=\'bulkIleEditors\' style=\'display:none;vertical-align: top;\'></tr>');headerColumns.each(function(){var $sourceCol=$(this);var dataFieldId=$sourceCol.attr('data-fieldid');var bulkControl=$sourceCol.find('div.bulkIleControlContainer').first();var newCol=undefined;if(dataFieldId)
newCol=$('<th class=\'rgHeader\' style=\'background-color:#63A6D74D !important;\' data-fieldid=\''+
dataFieldId+'\'></th>');else
newCol=$('<th class=\'rgHeader\' style=\'background-color:#63A6D74D !important;\'></th>');newCol.appendTo(newRow);if(!bulkControl.length)
bulkControl=$('<div></div>');bulkControl.appendTo(newCol);});tableHeaderDef.append(newRow);});},_findAndReplace:function(string,target,replacement){if(string){var index=string.indexOf(target);while(index!==-1){string=string.replace(target,replacement);index=string.indexOf(target);}}
return string;},toggleEditableGridDisplay:function(sender,gridId){this._toggleBulkILEControls(gridId);if(!this.get_isEditableGridDisplay())
{this.enableInlineEdit(sender,gridId);this.set_isEditableGridDisplay(true);}
else
{var section=$(this._element).closest('.ViewEditSection');var saveImgs=section.find('.save:visible');var that=this;var callback=function()
{window.editableGridController.grids[gridId].destroy();window.editableGridController.toggleSaveAll();that.disableInlineEdit(gridId);};if(saveImgs.length>0)
{navigatePrompt(callback,$(this._element));}else
{callback();}}},_toggleBulkILEControls:function(gridId){if(!this._isBulkIleEnabled)return;var $selectAllCheckbox=$('#'+gridId).find('.levelSelectAll');var hasRecords=$('#'+gridId).find('.rgNoRecords:visible').length===0;if(!hasRecords)
return;var $table=$selectAllCheckbox.closest('table');var colStyle=$table.find('colgroup > col:nth-child(1)').get(0).style;if(!this.get_isEditableGridDisplay())
{colStyle.width=this.checkboxColWidth;$selectAllCheckbox.show();var grid=$('#'+gridId);grid.find('#bulkIleEditors').show();$selectAllCheckbox.bind('click',this.selectAll);grid.find('tr td:nth-child(1) input:checkbox').bind('click',this.selectOrUnselectAll);}
else
{colStyle.width='0px';$selectAllCheckbox.hide();$selectAllCheckbox.unbind('click',this.selectAll);var grid=$('#'+gridId);grid.find('tr td:nth-child(1) input:checkbox').unbind('click',this.selectOrUnselectAll);grid.find('#bulkIleEditors').hide();grid.find('.bulkIleControlContainer').hide();this._detachCalenderInstance(grid);}},_enableBulkILE:function(){var $grid=$(this._element);$grid.find('#bulkIleEditors').show();$grid.find('.bulkIleControlContainer').show();var $selectAllCheckbox=$grid.find('.levelSelectAll');var $table=$selectAllCheckbox.closest('table');var recordCheckBoxesWrapper=$table.find('colgroup > col:nth-child(1)');if(recordCheckBoxesWrapper&&recordCheckBoxesWrapper.length>0){var colStyle=recordCheckBoxesWrapper.get(0).style;colStyle.width=this.checkboxColWidth;}
$selectAllCheckbox.show();$selectAllCheckbox.bind('click',this.selectAll);},enableInlineEdit:function(sender,gridId){var commandItem=$(sender);if(initILE)
initILE(gridId);commandItem.text(window._localizedResources.disableInlineEdit);},disableInlineEdit:function(gridId)
{if(window._currentEditor)
window._currentEditor.deactivate();$sv(this.get_asyncChgFieldName(),'y');__doPostBack(this.get_uniqueId(),'');},_detachCalenderInstance:function(grid){var dateTimeControls=grid.find('.bulkIleControl.Date>input[type=text]');for(var i=0;i<dateTimeControls.length;i++){var dateField=dateTimeControls[i];var dateControl=dateField.control;if(dateControl){dateControl._calendar=null;}}},selectAll:function(checkbox){var rows=$(this).closest('table').find('tr');rows.trigger('click');var $checkboxes=rows.find('td:nth-child(1) input:visible');$checkboxes.prop('checked',$(this).is(':checked'));$checkboxes.trigger('change');},selectOrUnselectAll:function(checkbox){var $containingTable=$(this).closest('table');var unCheckedItems=$containingTable.find('tr td:nth-child(1) input:checkbox:not(:checked)').length;$containingTable.find('.levelSelectAll').prop('checked',unCheckedItems===0);},_resetBulkEditors:function(){$('.bulkIleControl').each(function(){var $elem=$(this);var isUglControl=$elem.hasClass('UsersGroupsList')&&!$elem.hasClass('RadComboBox');var isValuesListControl=$elem.hasClass('ValuesList')&&!$elem.hasClass('RadComboBox');if(isUglControl||isValuesListControl){var divParent=$elem.find('div.SelectedOverFlowDiv').parent();var $divSelectedOverFlowDiv=$elem.find('div.SelectedOverFlowDiv').detach();$divSelectedOverFlowDiv.text('');$elem.find('input:hidden').val('[]');$divSelectedOverFlowDiv.appendTo(divParent);}});}};ArcherTech.UI.ReferenceField.LookupWindow=null;ArcherTech.UI.ReferenceField.CurrentLookupField=null;ArcherTech.UI.ReferenceField.OpenLookupWindow=function(refField)
{var e=Function._validateParams(arguments,[{name:'refField',type:ArcherTech.UI.ReferenceField}]);if(e)throw e;ArcherTech.UI.ReferenceField.CurrentLookupField=refField;var height,width;var wndContainer=$(window);var masterTbl=$('#master_tbl');if(!masterTbl[0]){masterTbl=parent.$('#master_tbl');}
if((masterTbl.width()*2)<wndContainer.width()||masterTbl.height()<300)
{width=wndContainer.width();height=wndContainer.height();}
else
{width=masterTbl.width();height=masterTbl.height();}
ArcherTech.UI.ReferenceField.LookupWindow=GetArcherWindow('about:blank','HelpWindow',height-40,width-40,refField.get_iframeTitle());};ArcherTech.UI.ReferenceField.CloseLookupWindow=function(ok)
{if(ok)
{var records=[];var newValues='';var selector=ArcherTech.UI.ReferenceField.LookupWindow.get_contentFrame().contentWindow.document.forms[0].selectedValues;records=$gv(selector).split(',');for(var i=0,l=records.length;i<l;i++)
{records[i]=parseInt(records[i]);}
if(records.length==1)
{if(isNaN(records[0]))
{records=[];}}
if(this.CurrentLookupField.get_maxValue()!=null){if(records.length>this.CurrentLookupField.get_maxValue()){return{warning:true,msg:this.CurrentLookupField.get_maxSelectionWarningText()};}}
var currentField=ArcherTech.UI.ReferenceField.CurrentLookupField;var isInDde=currentField.get_isInDdeCondition()&&Sys.WebForms.PageRequestManager.getInstance().get_isInAsyncPostBack();if(currentField)
{currentField.setLookedUpRecords(records);if(!isInDde)
{var genericContent=ArcherTech.UI.GenericContent.GetInstance();if(genericContent)
{var animationOptions=genericContent.get_loadingAnimationOptions();$('body').loadingAnimation({title:animationOptions.loading,text:animationOptions.loading,image:animationOptions.image});}}
var endRequestHandler=function(){ArcherTech.UI.ReferenceField.UpdateCurrentField(records);if(isInDde){Sys.WebForms.PageRequestManager.getInstance().remove_endRequest(endRequestHandler);}
var lookup=document.querySelector('[id$="Lookup"]');if(lookup){var scrollTopPos=window.frames['master-content-container-scroll'].scrollTop;lookup.focus();window.frames['master-content-container-scroll'].scrollTop=scrollTopPos;}};Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);}}
ArcherTech.UI.ReferenceField.LookupWindow.close();ArcherTech.UI.ReferenceField.LookupWindow=null;};ArcherTech.UI.ReferenceField.GetLookupForm=function()
{var form=$get('lookupForm');if(!form)
{form=document.createElement('form');form.id='lookupForm';form.method='POST';document.body.appendChild(form);}
form.innerHTML='';form.target='HelpWindow';return form;};ArcherTech.UI.ReferenceField.UpdateCurrentField=function(records)
{if(ArcherTech.UI.ReferenceField.CurrentLookupField&&records)
{if(window.__GenericContentFieldValueChanged!=null&&__GenericContentFieldValueChanged!=null)
{__GenericContentFieldValueChanged(ArcherTech.UI.ReferenceField.CurrentLookupField,{_newValue:records});}
ArcherTech.UI.ReferenceField.CurrentLookupField._setReferenceFieldHeight();ArcherTech.UI.ReferenceField.CurrentLookupField=null;}};ArcherTech.UI.ReferenceField.registerClass('ArcherTech.UI.ReferenceField',Sys.UI.Control);