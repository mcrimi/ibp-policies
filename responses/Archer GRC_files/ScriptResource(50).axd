
(function()
{var gc=ArcherTech.UI.GenericContent.GetInstance();ArcherTech.UI.GenericContent.Actions={perform:function(action,ddeDelegate,ruleId)
{if(action)
{if(!action.layoutActions||!action.layoutActions.length)
{if(action==null||action.fieldId==undefined||action.fieldId==null)
{return;}
var field=$CM.getFieldById(action.fieldId);if(!field||!field.active)
{return;}}
args=$.makeArray(arguments),args.push(field);var type=ArcherTech.Enums.EventActionType.toString(action.type);return this[type].apply(this,args);}},preProcess:function(action,ddeDelegate,ruleId)
{if(!(action&&action.layoutActions))
{if(action==null||!action.fieldId)
{return;}
var field=$CM.getFieldById(action.fieldId);if(!field||!field.active)
{return;}}
args=$.makeArray(arguments),args.push(field);var type=ArcherTech.Enums.EventActionType.toString(action.type);if(this['preProcess'+type])
{return this['preProcess'+type].apply(this,args);}},preProcessApplyConditionalLayout:function(action,ddeDelegate,ruleId,field)
{if(!action.layoutActions)return;var lm=$LM;for(var i=0;i<action.layoutActions.length;i++)
{var layoutAction=action.layoutActions[i];switch(layoutAction.type)
{case ArcherTech.Enums.ConditionalLayoutActionOptionType.Section:var section=ddeDelegate.changedSections[layoutAction.id];if($nu(section))
{section={};section.id=layoutAction.id;section.action=ArcherTech.Enums.SectionLayoutActionType.Display;ddeDelegate.changedSections[layoutAction.id]=section;var s=lm.getSectionById(layoutAction.id);if(s)
{for(var j=0;j<s.layoutIds.length;j++)
{var layoutItemId=s.layoutIds[j];var changedLayoutItem=ddeDelegate.changedLayoutItems[layoutItemId];if($nu(changedLayoutItem))
{changedLayoutItem={};changedLayoutItem.id=layoutItemId;changedLayoutItem.action=ArcherTech.Enums.LayoutItemActionType.Display;ddeDelegate.changedLayoutItems[layoutItemId]=changedLayoutItem;}}}}
break;case ArcherTech.Enums.ConditionalLayoutActionOptionType.LayoutItem:var layoutItem=ddeDelegate.changedLayoutItems[layoutAction.id];if($nu(layoutItem))
{layoutItem={};layoutItem.id=layoutAction.id;layoutItem.action=ArcherTech.Enums.LayoutItemActionType.Display;ddeDelegate.changedLayoutItems[layoutAction.id]=layoutItem;}
if(layoutAction.action===ArcherTech.Enums.LayoutItemActionType.Required)
{layoutItem.Required=false;}
break;}}},preProcessFilterValuesList:function(action,ddeDelegate,ruleId,field)
{ddeDelegate.modifiedFields[action.fieldId]=function()
{var modifiedField=arguments.callee;gc.filterValuesListValues(action.fieldId,[]);if(!$nu(modifiedField.AvailableValuesListValueIds)&&modifiedField.AvailableValuesListValueIds.length>0)
{gc.filterValuesListValues(action.fieldId,modifiedField.AvailableValuesListValueIds);}
if(!$nu(modifiedField.value)&&modifiedField.value.length>0)
{$CM.setFieldValue(action.fieldId,modifiedField.value);}};ddeDelegate.modifiedFields[action.fieldId].field=ddeDelegate.modifiedFields[action.fieldId].field||field;ddeDelegate.modifiedFields[action.fieldId].AvailableValuesListValueIds=null;},ApplyConditionalLayout:function(action,ddeDelegate,ruleId)
{if(!action.layoutActions)return;var lm=$LM;for(var i=0;i<action.layoutActions.length;i++)
{var layoutAction=action.layoutActions[i];switch(layoutAction.type)
{case ArcherTech.Enums.ConditionalLayoutActionOptionType.Section:var section=ddeDelegate.changedSections[layoutAction.id];if($nu(section))
{section={};section.id=layoutAction.id;section.action=layoutAction.action;ddeDelegate.changedSections[layoutAction.id]=section;}
else if(layoutAction.action===ArcherTech.Enums.SectionLayoutActionType.ReadOnly)
{section.action=layoutAction.action;}
else if(layoutAction.action===ArcherTech.Enums.SectionLayoutActionType.ForceDisplay)
{if(section.action===ArcherTech.Enums.SectionLayoutActionType.Hide||section.action===ArcherTech.Enums.SectionLayoutActionType.Display)
{section.action=layoutAction.action;}}
else if(layoutAction.action===ArcherTech.Enums.SectionLayoutActionType.Hide)
{if(section.action===ArcherTech.Enums.SectionLayoutActionType.Display)
{section.action=layoutAction.action;}}
break;case ArcherTech.Enums.ConditionalLayoutActionOptionType.LayoutItem:var layoutItem=ddeDelegate.changedLayoutItems[layoutAction.id];if($nu(layoutItem))
{layoutItem={};layoutItem.id=layoutAction.id;layoutItem.action=layoutAction.action;ddeDelegate.changedLayoutItems[layoutAction.id]=layoutItem;}
else if(layoutAction.action===ArcherTech.Enums.LayoutItemActionType.Required)
{ddeDelegate.changedLayoutItems[layoutAction.id].action=layoutAction.action;ddeDelegate.changedLayoutItems[layoutAction.id].Required=true;}
else if(layoutAction.action===ArcherTech.Enums.LayoutItemActionType.ReadOnly)
{if(layoutItem.action!==ArcherTech.Enums.LayoutItemActionType.Required)
{layoutItem.action=layoutAction.action;}}
else if(layoutAction.action===ArcherTech.Enums.LayoutItemActionType.ForceDisplay)
{if(layoutItem.action===ArcherTech.Enums.LayoutItemActionType.Hide||layoutItem.action===ArcherTech.Enums.LayoutItemActionType.Display)
{layoutItem.action=layoutAction.action;}}
else if(layoutAction.action===ArcherTech.Enums.LayoutItemActionType.Hide)
{if(layoutItem.action===ArcherTech.Enums.LayoutItemActionType.Display)
{layoutItem.action=layoutAction.action;}}
break;}}},FilterValuesList:function(action,ddeDelegate,ruleId,field)
{var modified=ddeDelegate.modifiedFields,mf=modified[action.fieldId];if(!Array.contains(ddeDelegate.VLFields,action.fieldId))
{ddeDelegate.VLFields.push(action.fieldId);}
var applyCumulativeFiltering=$EM.get_isFilterCumulative();if(!applyCumulativeFiltering&&(!$nu(mf.filterValuesListRuleId)&&mf.filterValuesListRuleId!=ruleId))return;var available=mf.AvailableValuesListValueIds||(mf.AvailableValuesListValueIds=[]);for(var i=0;i<action.availableIds.length;i++)
{if(!Array.contains(available,action.availableIds[i]))
{available.push(action.availableIds[i]);}}
mf.filterValuesListRuleId=ruleId;},SetDate:function(action,ddeDelegate,ruleId,field)
{var mf=ddeDelegate.modifiedFields[action.fieldId];if(mf&&mf.ruleId)return;var val=null;switch(action.setDateType)
{case ArcherTech.Enums.SetDateActionOptionType.Offset:var today=ArcherTech.UI.GenericContent.Helpers.today();val=new Date(today.getTime()+action.offset*(1000*60*60*24));val.setMilliseconds(0);val.setSeconds(0);val.setMinutes(0);val.setHours(0);break;case ArcherTech.Enums.SetDateActionOptionType.Specific:val=ArcherTech.UI.GenericContent.Helpers.getDate(action.date,false);break;}
mf=function()
{$CM.setFieldValue(action.fieldId,val);};mf.value=val;mf.ruleId=ruleId;ddeDelegate.modifiedFields[action.fieldId]=mf;field.value=val;},SetValuesList:function(action,ddeDelegate,ruleId,field)
{var modified=ddeDelegate.modifiedFields,mf=modified[action.fieldId],current=action.selectedIds.slice(0)||[];if(!Array.contains(ddeDelegate.VLFields,action.fieldId))
{ddeDelegate.VLFields.push(action.fieldId);}
if(!mf||($nu(mf.setValuesListRuleId)&&mf.AvailableValuesListValueIds===undefined))
{mf=modified[action.fieldId]=function()
{if(arguments.callee.AvailableValuesListValueIds!==undefined)
{gc.filterValuesListValues(action.fieldId,arguments.callee.AvailableValuesListValueIds);}
if(!$nu(arguments.callee.value))
{$CM.setFieldValue(action.fieldId,arguments.callee.value);}};}
if(!$nu(mf.setValuesListRuleId)&&mf.setValuesListRuleId!=ruleId)
{return;}
if(!$nu(mf.filterValuesListRuleId)&&$nu(mf.setValuesListRuleId)){mf.value=[];}
mf.setValuesListRuleId=ruleId;mf.value=mf.value||[];mf.field=field;if(current.length>0)
{for(var i=0;i<current.length;++i)
{if(!Array.contains(mf.value,current[i])&&field.displayControl!==3&&field.displayControl!==4){mf.value.push(current[i]);}else{mf.value=[current[i]];}}}
if(mf.initialValue)
mf.initialValue=mf.value;}};})();