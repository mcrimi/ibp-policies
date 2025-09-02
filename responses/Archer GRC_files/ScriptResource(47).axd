
jQuery.extend(ArcherTech.UI.GenericContent.prototype,{debugInfo:function()
{var debugInfo={};debugInfo.Rule={};debugInfo.Conditions=[];debugInfo.Actions=[];return debugInfo;},get_ddeDebugEnabled:function()
{return this._ddeDebugEnabled;},set_ddeDebugEnabled:function(val)
{this._ddeDebugEnabled=val;},processRules:function(field,isRelatedRecordChanged)
{if(this.ignoreModifications||!field.isInDde)return;this.ignoreModifications=true;var self=this;var ruleIdx=0,ddeDelegate={changedSections:{},changedLayoutItems:{},debugEnabled:false,modifiedFields:{},relatedQuestionField:null,processConditionalLayout:false,isRelatedRecordChanged:isRelatedRecordChanged};ddeDelegate.modifiedFields[field.id]=function(){};ddeDelegate.modifiedFields[field.id].value=field.value;var fnrResult,rule;var rules=$EM.get_ddeRules();if(rules&&rules.length>0)
{this.addLoadingAnimation();var fieldId=field.id;do
{fnrResult=self.findNextRule(fieldId,rules,ruleIdx);if(fnrResult)
{rule=fnrResult[0];ruleIdx=fnrResult[1]+1;rule.preProcessActions(ddeDelegate,fieldId);}}while(fnrResult);ruleIdx=0;var hasValidAction=false,debugEnabled=DEBUGGER&&self.get_ddeDebugEnabled(),debugInfo=null;ddeDelegate.debugEnabled=debugEnabled;if(debugEnabled)
{DEBUGGER.writeStyledDiv('Start of Rule Processing for Filter and Set Actions... <br> ','succeed');}
do
{fnrResult=self.findNextRule(fieldId,rules,ruleIdx);if(fnrResult)
{rule=fnrResult[0];ruleIdx=fnrResult[1]+1;if(debugEnabled)
{debugInfo=self.debugInfo();debugInfo.Rule.name=rule.name;debugInfo.Rule.operatorLogic=rule.operator;ddeDelegate.debugInfo=debugInfo;var result=rule.evalulate(ddeDelegate),foundValidAction=rule.performActions(ddeDelegate,null,fieldId,result);if(!hasValidAction)
{hasValidAction=foundValidAction;}
if(foundValidAction)
{DEBUGGER.debug(ddeDelegate.debugInfo);}}
else
{if(rule.evalulate(ddeDelegate))
{rule.performActions(ddeDelegate,null,fieldId,true);}}}}while(fnrResult);if(debugEnabled)
{if(!hasValidAction)
{DEBUGGER.writeStyledDiv('<br> (No Filter or Set Actions) <br> ','');}
DEBUGGER.writeStyledDiv('<br> Rule Processing of Filter and Set Actions Complete. <br> <br>','succeed');DEBUGGER.writeStyledDiv('Start of Rule Processing for Conditional Layout Actions... <br> ','succeed');}
ruleIdx=0;ddeDelegate.processConditionalLayout=true;hasValidAction=false;do
{fnrResult=self.findNextRule(fieldId,rules,ruleIdx);if(fnrResult)
{rule=fnrResult[0];ruleIdx=fnrResult[1]+1;if(rule.hasLayoutAction)
{if(debugEnabled)
{debugInfo=self.debugInfo();debugInfo.Rule.name=rule.name;debugInfo.Rule.operatorLogic=rule.operator;ddeDelegate.debugInfo=debugInfo;var result=rule.evalulate(ddeDelegate),foundValidAction=rule.performActions(ddeDelegate,null,null,result);if(!hasValidAction)
{hasValidAction=foundValidAction;}
if(foundValidAction)
{DEBUGGER.debug(ddeDelegate.debugInfo);}}
else if(rule.evalulate(ddeDelegate))
{rule.performActions(ddeDelegate,null,fieldId,true);}}}}while(fnrResult);if(debugEnabled)
{if(!hasValidAction)
{DEBUGGER.writeStyledDiv('<br> (No Conditional Layout Actions) <br> ','');}
DEBUGGER.writeStyledDiv('<br> Rule Processing for Conditional Layout Actions Complete. <br> <br> ','succeed');}
for(var fieldId in ddeDelegate.modifiedFields)
{ddeDelegate.modifiedFields[fieldId]();}
self.processConditionalLayout(ddeDelegate);}
setTimeout(function(){self.ignoreModifications=false;},0);},addLoadingAnimation:function()
{var animationOptions=this.get_loadingAnimationOptions();$('body').loadingAnimation({title:animationOptions.loading,text:'',image:animationOptions.image});},findNextRule:function(fieldId,rules,idx)
{for(var ridx=idx;ridx<rules.length;ridx++)
{var rule=rules[ridx];if(rule)
{return[rule,ridx];}}
return null;},processConditionalLayout:function(ddeDelegate)
{var gc=ArcherTech.UI.GenericContent.GetInstance(),lm=$LM;var rootTabSets=[],changedSections=[];for(sectionId in ddeDelegate.changedSections)
{var sectionDelegate=ddeDelegate.changedSections[sectionId],action=sectionDelegate.action,s=lm.getSectionById(sectionId),cs={};if(!s)continue;if(!s.display)
s.display=ArcherTech.Enums.SectionLayoutActionType.Display;var oldDisplay=s.display;if(oldDisplay==action)
{cs.isDirty=false;if(oldDisplay==ArcherTech.Enums.SectionLayoutActionType.ReadOnly)
{this._updateLayoutItemsBySection(s,ddeDelegate,ArcherTech.Enums.LayoutItemActionType.ReadOnly);}
else if(oldDisplay==ArcherTech.Enums.SectionLayoutActionType.Hide)
{this._updateLayoutItemsBySection(s,ddeDelegate,ArcherTech.Enums.LayoutItemActionType.Hide);}}
else
{cs.isDirty=true;s.display=action;if(s.parentTabId>0)
{this._flagParents(s.parentTabId,rootTabSets);}
switch(action)
{case ArcherTech.Enums.SectionLayoutActionType.ReadOnly:cs.show=true;this._updateLayoutItemsBySection(s,ddeDelegate,ArcherTech.Enums.LayoutItemActionType.ReadOnly);break;case ArcherTech.Enums.SectionLayoutActionType.Display:case ArcherTech.Enums.SectionLayoutActionType.ForceDisplay:cs.show=true;break;case ArcherTech.Enums.SectionLayoutActionType.Hide:cs.show=false;this._updateLayoutItemsBySection(s,ddeDelegate,ArcherTech.Enums.LayoutItemActionType.Hide);break;}}
changedSections[sectionId]=cs;}
for(p in ddeDelegate.changedLayoutItems)
{var layoutItem=ddeDelegate.changedLayoutItems[p];var li=lm.getLayoutItemById(p);if(!li)continue;if(!li.display)
li.display=ArcherTech.Enums.LayoutItemActionType.Display;if(li.display!=layoutItem.action)
{li.display=layoutItem.action;if(li.tabId>0)
{this._flagParents(li.tabId,rootTabSets);}
switch(layoutItem.action)
{case ArcherTech.Enums.LayoutItemActionType.Required:this.processFieldShowHide(li,true,ddeDelegate);gc.setReadOnly(layoutItem.id,false);break;case ArcherTech.Enums.LayoutItemActionType.ReadOnly:this.processFieldShowHide(li,true,ddeDelegate);gc.setReadOnly(layoutItem.id,true);break;case ArcherTech.Enums.LayoutItemActionType.Display:case ArcherTech.Enums.LayoutItemActionType.ForceDisplay:this.processFieldShowHide(li,true,ddeDelegate);gc.setReadOnly(layoutItem.id,false);break;case ArcherTech.Enums.LayoutItemActionType.Hide:gc.setReadOnly(layoutItem.id,false);this.processFieldShowHide(li,false,ddeDelegate);break;}
if(!$nu(layoutItem.Required))
{lm.setRequired(layoutItem.id,layoutItem.Required);}}
this._processBusinessLogicForSection(li.sectionId,changedSections);}
for(sectionId in changedSections)
{var cs=changedSections[sectionId];if(cs&&cs.isDirty)
{$LM.sectionShowHide(sectionId,cs.show);}}
for(tabSetId in rootTabSets)
{var ts=rootTabSets[tabSetId];if(typeof ts==='object'){this._processTabSet(ts);ts.isDirty=false;}}
var rqf=ddeDelegate.relatedQuestionField;if(rqf){if(rqf.clientId){$find(rqf.clientId).setLookedUpRecords([]);}
if(rqf.relatedSubformId>0){$sv('SelectedValues'+rqf.relatedSubformId,Sys.Serialization.JavaScriptSerializer.serialize([]));}}
this.ddeDelegate=null;this.rootTabSets=null;this.changedSections=null;$('body').loadingAnimation.remove();},processFieldShowHide:function(layoutItem,show,ddeDelegate)
{if(!layoutItem)return;var lm=$LM,layoutId=layoutItem.id;var s=lm.getSectionById(layoutItem.sectionId);if(!s)return;var func=this._getDisplayFunction(show);var layoutItemCount=s.layoutItems,visibleLayoutItems=s.visibleLayoutItems;if($nu(visibleLayoutItems))
visibleLayoutItems=layoutItemCount;if(show)
{if((visibleLayoutItems<layoutItemCount||visibleLayoutItems==0)&&!layoutItem.visible)
visibleLayoutItems++;}
else
{if(visibleLayoutItems>0&&($nu(layoutItem.visible)||layoutItem.visible))
visibleLayoutItems--;}
s.visibleLayoutItems=visibleLayoutItems;var fieldId=layoutItem.fieldId;if(fieldId&&fieldId>0)
{var options=layoutItem.options;if(options.helpIcon)
{$('#loitem'+layoutId+'hi')[func]('hidden');if(show===false)
{lm.closeRecordHelp(fieldId,null);}}
else if(options.helpAbove||options.helpBelow)
{var helpTextElement=$('#loitem'+layoutId+'ht');if(helpTextElement)
{helpTextElement[func]('hidden');this.updateRowDisplay(helpTextElement,0,0,show);}}
var fieldMessageElement=$('#loitem'+layoutId+'fm');if(fieldMessageElement)
{fieldMessageElement[func]('hidden');if(options.displayMessage==ArcherTech.Enums.FieldMessageDisplayModeType.AboveField)
{this.updateRowDisplay(fieldMessageElement,0,0,show);}}
if(options.hideLabel)
{$('#loitem'+layoutId)[func]('hidden');}
var field=$CM.getFieldById(fieldId);if(field)
{var clientId=field.clientId,element=$('#'+clientId),control=$find(clientId),hasPrefixOrSuffix=false;if(control&&control.changeDisplay)
{control.changeDisplay(show);}
else
{if(control)
{if((field.displayControl=='1'&&field.type==ArcherTech.Enums.FieldType.Text)||field.type==ArcherTech.Enums.FieldType.Numeric)
{element=element.parent();}}
else if(field.type=='3')
{if(!show)
{$(document).trigger('click');}}
if(field.hasPrefix||field.hasSuffix)
{hasPrefixOrSuffix=true;if(field.hasPrefix)
{var prefix=$('#'+fieldId+'_prefix');prefix[func](' hidden');}
if(field.hasSuffix)
{var suffix=$('#'+fieldId+'_suffix');suffix[func](' hidden');}}
element[func](' hidden');if(!show)
{element.find('input').blur();}}
this.toggleFieldAuditInfo(fieldId,show);if(field&&field.isRelatedQuestion)
{if(!show)
{ddeDelegate.relatedQuestionField=field;}}
if(layoutItem.visible!==show)
{if(layoutItem.isQuestion==true)
{var sectionControl=$('#'+s.clientId);element=sectionControl.find('.lo_'+layoutId+'_tr');}
else if(control&&control._isInSubSection&&control._namingContainer)
{element=$('#'+control._namingContainer);}
else if(hasPrefixOrSuffix)
{var spElement=$('#'+fieldId+'_tbl');if(spElement!=null&&spElement.length>0)
{element=spElement;}}
this.updateRowDisplay(element,layoutItem.colSpan,layoutItem.rowSpan,show);layoutItem.visible=show;}}}
else
{var nonfieldElement=$('.loitem'+layoutId);if(nonfieldElement)
{if($('.RO'+layoutId).length!==0){nonfieldElement=$('.RO'+layoutId)
nonfieldElement[func]('hidden');nonfieldElement.siblings()[func]('hidden');}
else
nonfieldElement[func]('hidden');if(layoutItem.visible!==show)
{this.updateRowDisplay(nonfieldElement,layoutItem.colSpan,layoutItem.rowSpan,show);layoutItem.visible=show;if(show)
{nonfieldElement.trigger('isVisible');}}}}},_getDisplayFunction:function(show)
{return show?'removeClass':'addClass';},_processTabSet:function(ts)
{if(ts)
{var lm=$LM,hasVisibleTab=false;var visibleTab=[];for(var i=0;i<ts.tabIds.length;i++)
{var tab=lm.getTabById(ts.tabIds[i]);if(!tab)continue;if(tab.isDirty)
{this._processTab(tab);tab.isDirty=false;}
if(tab.visible)
{hasVisibleTab=true;visibleTab.push(tab);}}
if(visibleTab.length==1)
{$('.'+visibleTab[0].clientId+' a')[0]?.click();}
if(ts.visible!=hasVisibleTab)
{ts.visible=hasVisibleTab;var func=this._getDisplayFunction(hasVisibleTab);$('#'+ts.clientId)[func](' hidden');}}},_processTab:function(tab)
{if($nu(tab))return;var lm=$LM;var hasVisibleChildren=false;for(var i=0;i<tab.sectionIds.length;i++)
{var s=lm.getSectionById(tab.sectionIds[i]);if(s&&s.display!=ArcherTech.Enums.SectionLayoutActionType.Hide)
{hasVisibleChildren=true;break;}}
for(var i=0;i<tab.tabSetIds.length;i++)
{var ts=lm.getTabSetById(tab.tabSetIds[i]);if(!ts)continue;if(ts.isDirty)
{this._processTabSet(ts);ts.isDirty=false;}
if(ts.visible===true)
{hasVisibleChildren=true;break;}}
if(tab.visible!=hasVisibleChildren)
{tab.visible=hasVisibleChildren;var func=this._getDisplayFunction(hasVisibleChildren);$('.'+tab.clientId)[func](' hidden');}},_flagParents:function(parentTabId,rootTabSets)
{var lm=$LM;if(!lm)return;var flagParents=function(parentTabId,rootTabSets)
{if(parentTabId>0)
{var t=lm.getTabById(parentTabId);if(t&&!t.isDirty)
{t.isDirty=true;var ts=lm.getTabSetById(t.tabSetId);if(ts&&!ts.isDirty)
{ts.isDirty=true;var flaggedTabSet=rootTabSets[ts.id];if($nu(flaggedTabSet))
{rootTabSets[ts.id]=ts;}
if(ts.parentTabId>0)
{flagParents(ts.parentTabId,rootTabSets);}}}}};flagParents(parentTabId,rootTabSets);},toggleFieldAuditInfo:function(fieldId,show)
{var auditInfo=$('#'+fieldId+'auditInfo'),func=this._getDisplayFunction(show);if(auditInfo&&auditInfo.length>0)
{auditInfo[func](' hidden');}
auditInfo=null;},_processBusinessLogicForSection:function(sectionId,changedSections)
{var lm=$LM,s=lm.getSectionById(sectionId);if(!s)return;var layoutItemCount=s.layoutItems,visibleLayoutItems=s.visibleLayoutItems;if($nu(visibleLayoutItems))
visibleLayoutItems=layoutItemCount;var sectionControl=$('#'+s.clientId),isHidden=sectionControl.hasClass('hidden'),cs=changedSections[sectionId];if($nu(cs))
{cs={};}
if(visibleLayoutItems==0)
{s.display=ArcherTech.Enums.SectionLayoutActionType.Hide;cs.show=false;cs.isDirty=!isHidden;}
else
{s.display=ArcherTech.Enums.SectionLayoutActionType.Display;cs.show=true;cs.isDirty=isHidden;}
changedSections[sectionId]=cs;},_updateLayoutItemsBySection:function(s,ddeDelegate,action)
{if(!s)return;var layoutIds=s.layoutIds||[];for(var i=0;i<layoutIds.length;i++)
{var layoutId=layoutIds[i],layoutItem=ddeDelegate.changedLayoutItems[layoutId];if($nu(layoutItem))
{layoutItem={};layoutItem.id=layoutItemId;ddeDelegate.changedLayoutItems[layoutItemId]=layoutItem;}
layoutItem.action=action;if(!$nu(layoutItem.Required))
{layoutItem.Required=false;}}},updateRowDisplay:function(element,colSpan,rowSpan,show)
{if(element)
{var row=element.prop('nodeName')=='TR'?element:element.parent().parent(),itemsInRow,visibleItemsInRow,hasColSpan=colSpan&&colSpan>1,hasRowSpan=rowSpan&&rowSpan>1,func;if(row)
{visibleItemsInRow=row.attr('visibleItems')||0;itemsInRow=row.attr('items')||0;if(show)
{if(visibleItemsInRow<itemsInRow||visibleItemsInRow==0)
{visibleItemsInRow++;}
if(hasColSpan)
{visibleItemsInRow++;}}
else
{if(hasColSpan)
{visibleItemsInRow=0;}
else if(visibleItemsInRow>0)
{visibleItemsInRow--;}}
func=visibleItemsInRow==0?'hide':'show';if(!hasRowSpan||(hasRowSpan&&hasColSpan))
{row[func]();}
row.attr('visibleItems',visibleItemsInRow);if(hasRowSpan&&hasColSpan)
{var rowSpanRow=row;for(var i=1;i<rowSpan;i++)
{rowSpanRow=rowSpanRow.next();if(rowSpanRow&&rowSpanRow.length==1&&rowSpanRow.prop('nodeName')=='TR')
{rowSpanRow[func]();}}
rowSpanRow=null;}
row=visibleItemsInRow=itemsInRow=func=null;}}}});