
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.ClientLayoutManager=function()
{ArcherTech.UI.ClientLayoutManager.initializeBase(this);this._sections={};this._tabs={};this._tabSets={};this._layoutItems={};};ArcherTech.UI.ClientLayoutManager.prototype={initialize:function()
{ArcherTech.UI.ClientLayoutManager.callBaseMethod(this,'initialize');window.$LM=ArcherTech.UI.ClientLayoutManager._instance=this;},dispose:function()
{ArcherTech.UI.ClientLayoutManager.callBaseMethod(this,'dispose');this._sections=null;this._layoutItems=null;this._tabs=null;this._tabSets=null;window.$LM=undefined;},get_uniqueID:function()
{return this._uniqueID;},set_uniqueID:function(val)
{this._uniqueID=val;},get_sections:function()
{return this._sections;},set_sections:function(val)
{this._sections=val;},get_tabs:function()
{return this._tabs;},set_tabs:function(val)
{this._tabs=val;},get_tabSets:function()
{return this._tabSets;},set_tabSets:function(val)
{this._tabSets=val;},get_layoutItems:function()
{return this._layoutItems;},set_layoutItems:function(val)
{this._layoutItems=val;},closeRecordHelp:function(fieldId,sectionId)
{if(ArcherTech.UI.RecordHelpManager&&ArcherTech.UI.ClientContentManager)
{var helpManager=ArcherTech.UI.RecordHelpManager.GetInstance();var CM=ArcherTech.UI.ClientContentManager.GetInstance();if(helpManager&&CM)
{var currentHelpFieldId=helpManager.get_currentHelpFieldId();if(currentHelpFieldId!=null)
{if(fieldId==null&&sectionId!=null)
{var field=CM.getFieldById(currentHelpFieldId);if(field!=null&&field.sectionId==sectionId)
{fieldId=field.id;}}
if(currentHelpFieldId==fieldId)
{helpManager.closeWindow();}}}}},getFieldIdFromClientId:function(clientId)
{var result=null;if(clientId)
{var fieldId=clientId.match(/(f\d+)/);if(fieldId&&fieldId.length>1)
result=fieldId[1].replace('f','');}
return result;},getSectionById:function(sectionId)
{var result=null;if(sectionId)
{var sections=this.get_sections();if(sections)
result=sections[sectionId];}
return result;},getLayoutItemById:function(itemId)
{var result=null;if(itemId)
{var items=this.get_layoutItems();if(items)
result=items[itemId];}
return result;},getTabById:function(tabId)
{var result=null;if(tabId)
{var tabs=this._tabs;if(tabs)
result=tabs[tabId];}
return result;},getTabSetById:function(tabSetId)
{var result=null;if(tabSetId)
{var tabSets=this._tabSets;if(tabSets)
result=tabSets[tabSetId];}
return result;},getFieldElement:function(field)
{var result=null;if(field&&field.clientId)
{var element=$get(field.clientId);if(element)
{result=element;}}
return result;},getFieldControl:function(field)
{var control=null;if(field&&field.clientId)
{control=$find(field.clientId);if(!control)
{var element=$('#'+field.clientId);if(element.length)
{if(element.controller)
{control=element.controller();}
else
{control=element;}}}}
return control;},getFieldControlById:function(fieldId)
{var result=null;var field=this.getFieldById(fieldId);if(field)
{result=this.getFieldControl(field);}
return result;},sectionShowHide:function(sectionId,show)
{var func=show?'removeClass':'addClass',s=this.getSectionById(sectionId),sectionControl;if(s)
{sectionControl=$('#'+s.clientId);if(sectionControl)
{sectionControl[func]('hidden');if(show===false)
{this.closeRecordHelp(null,sectionId);}}}
func=sections=s=sectionControl=null;},setRequired:function(layoutId,show)
{var layoutItem=this.getLayoutItemById(layoutId),requiredImage;if(layoutItem)
{var field=$CM.getFieldById(layoutItem.fieldId);if(field)
{requiredImage=$('#'+field.id+'requiredImg');if(requiredImage&&requiredImage.length>0)
{if(show){requiredImage.show();requiredImage.attr('alt',_localizedResources['required']);requiredImage.attr('title',_localizedResources['required']);}
else{requiredImage.hide();requiredImage.attr('alt','');requiredImage.attr('title','');}}
if((field.type==ArcherTech.Enums.FieldType.ValuesList&&field.displayControl==3)||(field.type==ArcherTech.Enums.FieldType.UsersGroupsList&&field.displayControl==3))
{var control=this._getControlFromLayoutId(layoutId);if(control&&control.enableNoSelection)
{control.enableNoSelection(!show);}}}}},_getControlFromLayoutId:function(layoutId,includeDotNet)
{var layoutItem=this.getLayoutItemById(layoutId);if(layoutItem)
{var field=$CM.getFieldById(layoutItem.fieldId);if(field)
{var clientId=field.clientId;if(clientId)
{var compositeControl=$('#'+clientId+' .composite-cntnr');if(compositeControl.length>0)
{return $find(clientId);}
var child=$('#'+clientId);var control=null;while((child=child.children().eq(0)).length)
{if(child.controller)
{control=child.controller();if(control)
{if(includeDotNet)
{control.dotNetControl=$find(clientId);}
return control;}}}
return $find(clientId);}}}}};ArcherTech.UI.ClientLayoutManager.GetInstance=function()
{if(ArcherTech.UI.ClientLayoutManager._instance==null)
{ArcherTech.UI.ClientLayoutManager._instance=$create(ArcherTech.UI.ClientLayoutManager,{id:ArcherTech.UI.ClientLayoutManager._instanceName},null,null,null);}
return ArcherTech.UI.ClientLayoutManager._instance;};ArcherTech.UI.ClientLayoutManager._instanceName='ClientLayoutManager';ArcherTech.UI.ClientLayoutManager._instance=null;ArcherTech.UI.ClientLayoutManager.registerClass('ArcherTech.UI.ClientLayoutManager',Sys.Component);