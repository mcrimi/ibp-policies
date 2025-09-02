
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.Validations=function()
{ArcherTech.UI.Validations.initializeBase(this);this._validationRules=[];this._buttonIds=[];this._valBtnClickDel=Type.createDelegate(this,this._validateBtnClick);this._validationAlertTitle=null;};ArcherTech.UI.Validations.prototype={initialize:function()
{ArcherTech.UI.Validations.callBaseMethod(this,'initialize');},dispose:function()
{ArcherTech.UI.Validations.callBaseMethod(this,'dispose');},set_validationRules:function(val)
{this._validationRules=val;},get_validationRules:function()
{return this._validationRules;},set_validationAlertTitle:function(val)
{this._validationAlertTitle=val;},findRule:function(id,property)
{for(var idx=0;idx<this._validationRules.length;idx++)
{var valRule=this._validationRules[idx];var idMatch=false;if(!$nu(valRule.elementId)&&valRule.elementId==id)
{idMatch=true;}
else if(!$nu(valRule.fieldId)&&valRule.fieldId==id)
{idMatch=true;}
if(idMatch&&!$nu(valRule[property]))
{return valRule;}}
return null;},registerValidateButtons:function(buttonIds)
{for(var i=0;i<buttonIds.length;i++)
{var buttonId=buttonIds[i];if(Array.contains(this._buttonIds,buttonId))continue;this._buttonIds.push(buttonId);$addHandler($get(buttonId),'click',this._valBtnClickDel);}},_validateBtnClick:function(event)
{if(!this.validatePage())
{event.stopPropagation();event.preventDefault();}},validatePage:function()
{var messages=[];for(var idx=0;idx<this._validationRules.length;idx++)
{var valRule=this._validationRules[idx];if(!valRule.enabled)
{continue;}
var message=this.validateValue(this.getValue(valRule),valRule);if(!$nu(message))
{Array.add(messages,message);}}
if(messages.length>0)
{ShowWarningAlertMessages(messages,this._validationAlertTitle);}
return messages.length==0;},validateValue:function(value,rule)
{if(!rule.enabled)return null;var message;if(!$nu(rule.required))
{return this._validateRequired(value,rule);}
else if(!$nu(rule.maxLength)&&!$nu(value))
{return this._validateMaxLength(value,rule);}
else if(!$nu(rule.minLength)&&!$nu(value))
{return this._validateMinLength(value,rule);}
else if(!$nu(rule.maxValue)&&!$nu(value))
{return this._validateMaxValue(value,rule);}
else if(!$nu(rule.minValue)&&!$nu(value))
{return this._validateMinValue(value,rule);}
else if(!$nu(rule.otherText))
{return this._validateOtherText(value,rule);}
return null;},_validateRequired:function(value,rule)
{var format=null;if($nu(value))
{format=rule.messageFormat;}
else if((rule.type==ArcherTech.UI.Validations.RuleType.String||rule.type==ArcherTech.UI.Validations.RuleType.List)&&value.length==0)
{format=rule.messageFormat;}
if(!$nu(format))
{return String.format(format,rule.name);}
return null;},_validateMaxLength:function(value,rule)
{if(!$nu(rule.matrixAxis))
{return this._validateMatrixLength(value,rule,true);}
else
{var format;if(value.length>rule.maxLength)
{format=rule.messageFormat;}
if(!$nu(format))
{return String.format(format,value.length,rule.name,rule.maxLength);}}
return null;},_validateMinLength:function(value,rule)
{if(!$nu(rule.matrixAxis))
{return this._validateMatrixLength(value,rule,false);}
else
{var format;if(value.length<rule.minLength)
{format=rule.messageFormat;}
if(!$nu(format))
{return String.format(format,value.length,rule.name,rule.minLength);}}
return null;},_validateMatrixLength:function(value,rule,isMaxValidation)
{var lengthLimit=(isMaxValidation?rule.maxLength:rule.minLength);var fieldObj=ArcherTech.UI.ClientContentManager.GetInstance().getFieldById(rule.fieldId);var selectedItems={};var vlId;var axisName;var errMsg;if(rule.matrixAxis==1)
{vlId='vl'+fieldObj.rowList;axisName='row';}
else
{vlId='vl'+fieldObj.columnList;axisName='column';}
var vlDef=ArcherTech.UI.GenericContent.GetInstance().get_valuesLists()[vlId];for(var idx=0;idx<value.length;idx++)
{var selectedVlValueId='vl'+value[idx][rule.matrixAxis-1];if($nu(selectedItems[selectedVlValueId]))
{selectedItems[selectedVlValueId]=1;}
else
{selectedItems[selectedVlValueId]++;}}
for(var idx=0;idx<vlDef.values.length;idx++)
{var vlValue=vlDef.values[idx];var vlValueId='vl'+vlValue.id;var cnt=selectedItems[vlValueId];cnt=($nu(cnt)?0:cnt);if((isMaxValidation&&cnt>lengthLimit)||(!isMaxValidation&&cnt<lengthLimit))
{if($nu(errMsg))
{errMsg=String.format(rule.messageFormat,axisName,rule.name,lengthLimit);}
else
{errMsg=errMsg+'\n'+String.format(rule.messageFormat,axisName,rule.name,lengthLimit);}}}
return errMsg;},_validateMaxValue:function(value,rule)
{var format;if(rule.type==ArcherTech.UI.Validations.RuleType.Number&&value>rule.maxValue)
{format=rule.messageFormat;}
if(!$nu(format))
{return String.format(format,value,rule.name,rule.maxValue);}
return null;},_validateMinValue:function(value,rule)
{var format;if(rule.type==ArcherTech.UI.Validations.RuleType.Number&&value<rule.minValue)
{format=rule.messageFormat;}
if(!$nu(format))
{return String.format(format,value,rule.name,rule.minValue);}
return null;},_validateOtherText:function(value,rule)
{if($nu(value)||value.trim()==''||value.trim()==rule.otherText)
{return String.format(rule.messageFormat,rule.name);}
return null;},getValue:function(valRule)
{if(!$nu(valRule.elementId))
{var clientObj=$find(valRule.elementId);if(clientObj!=null)
{if(!$nu(clientObj.get_value))
{return clientObj.get_value();}}
return $gv(valRule.elementId);}
else if(!$nu(valRule.fieldId))
{var other=!$nu(valRule.otherText);return ArcherTech.UI.GenericContent.GetInstance().getFieldValue(valRule.fieldId,other);}}};ArcherTech.UI.Validations.GetInstance=function()
{if(ArcherTech.UI.Validations._instance==null)
{ArcherTech.UI.Validations._instance=$create(ArcherTech.UI.Validations,{id:ArcherTech.UI.Validations._instanceName},null,null,null);}
return ArcherTech.UI.Validations._instance;};ArcherTech.UI.Validations._instanceName='validations';ArcherTech.UI.Validations._instance=null;ArcherTech.UI.Validations.RuleType={String:'string',Number:'number',Date:'date',List:'list'};ArcherTech.UI.Validations.registerClass('ArcherTech.UI.Validations',Sys.Component);if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();