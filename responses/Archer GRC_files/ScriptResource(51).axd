
ArcherTech.UI.GenericContent.Rule=function(data)
{$.extend(this,data);};$.extend(ArcherTech.UI.GenericContent.Rule.prototype,{evalulate:function(ddeDelegate)
{if(!this.conditions.length)
{return false;}
var conditionResults=[],i=0,c,condition,conditionsLength=!this.conditions?0:this.conditions.length,evalResults=[],objectType,order,result,evalObj;for(;i<conditionsLength;i++)
{condition=this.conditions[i];objectType=typeof condition;if(objectType=='boolean')
{result=condition;}
else
{result=ArcherTech.UI.GenericContent.Conditions.process(condition,ddeDelegate);}
order=condition.Order||i+1;evalObj={};evalObj.result=result;evalObj.order=order;conditionResults[i]=evalObj;evalResults[i]=result;if(ddeDelegate.debugEnabled)
{c={};c.result=result;c.Id=condition.Id||0;c.order=order;ddeDelegate.debugInfo.Conditions.push(c);}}
return this.operator&&this.operator.length>0?this.evaluateOperatorLogic(conditionResults,ddeDelegate):$.inArray(false,evalResults)==-1;},isAffected:function(ddeDelegate,fieldId)
{var result=false;if(!$nu(this.conditions))
{var i=0,conditionsLength=this.conditions.length,modifiedFields=ddeDelegate.modifiedFields;for(;i<conditionsLength;i++)
{var conditionFieldId=this.conditions[i].fieldId;if(String(fieldId)===String(conditionFieldId)||modifiedFields[conditionFieldId]&&modifiedFields[conditionFieldId].value!==undefined)
{result=true;break;}}}
return result;},evaluateOperatorLogic:function(results,ddeDelegate)
{var eq=this.operator,resultsLength=results.length;for(var i=resultsLength;i>0;i--)
{evalObj=results[i-1];if(evalObj!=undefined)
{var exp=new RegExp(evalObj.order.toString(),'g');eq=eq.replace(exp,evalObj.result.toString());}}
eq=eq.replace(/or/gi,'||').replace(/and/gi,'&&').replace(/not/gi,'!');eq=eq.replace(/(\d+)+/g,'false');var result=false;try
{result=eval(eq);}
catch(err)
{if(ddeDelegate.debugEnabled)
{var debugInfo=ddeDelegate.debugInfo;if(debugInfo)
{DEBUGGER.writeStyledDiv('<br>Rule: '+debugInfo.Rule.name+' contains invalid operator logic. <br>','fail');}}
result=false;}
return result;},performActions:function(ddeDelegate,func,fieldId,result)
{var i=0,action,hasValidAction=false,processAction=false,processLayout=false;ddeDelegate.VLFields=[];for(;i<this.actions.length;i++)
{var isConditionalLayout=false,isFilterAction=false,isSetAction=false;action=$EM.getActionById(this.actions[i]);if(action)
{isConditionalLayout=action.type==ArcherTech.Enums.EventActionType.ApplyConditionalLayout;if(!isConditionalLayout)
{isFilterAction=action.type==ArcherTech.Enums.EventActionType.FilterValuesList;if(!isFilterAction)
{isSetAction=action.type==ArcherTech.Enums.EventActionType.SetValuesList||action.type==ArcherTech.Enums.EventActionType.SetDate;}}
processLayout=ddeDelegate.processConditionalLayout===true;if(!this.hasLayoutAction)
{this.hasLayoutAction=isConditionalLayout;}
processAction=(isConditionalLayout&&processLayout)||(!processLayout&&(isFilterAction||(isSetAction&&this.isAffected(ddeDelegate,fieldId))));if(!hasValidAction)
{hasValidAction=processAction;}
if(func&&!isSetAction||result&&(!func&&processAction))
{ArcherTech.UI.GenericContent.Actions[func||'perform'](action,ddeDelegate,this.id);if(ddeDelegate.debugEnabled)
{ddeDelegate.debugInfo.Actions.push(action.name);}}}}
if(result&&func===null)
{for(i=0;i<ddeDelegate.VLFields.length;++i)
{var vlFieldId=ddeDelegate.VLFields[i];var modifiedField=ddeDelegate.modifiedFields[vlFieldId];if(!$nu(modifiedField))
{var availableValuesListIds=modifiedField.AvailableValuesListValueIds;if(availableValuesListIds)
{var current=modifiedField.value||(modifiedField.field.value?modifiedField.field.value.slice(0):[]);if($nu(modifiedField.initialValue))
{modifiedField.initialValue=current;}
else if(modifiedField.initialValue.length>0)
{for(var v=0;v<modifiedField.initialValue.length;++v)
{var potentiallySelectedValue=modifiedField.initialValue[v];if(!isNaN(potentiallySelectedValue))
{potentiallySelectedValue+=':0';}
if(!Array.contains(current,potentiallySelectedValue)&&Array.contains(availableValuesListIds,parseInt(potentiallySelectedValue.replace(':0',''))))
{current.push(potentiallySelectedValue);}}}
modifiedField.value=this._filterSelectedValues(current,availableValuesListIds);}
if(modifiedField.field)
modifiedField.field.value=modifiedField.value;}}}
return hasValidAction;},_filterSelectedValues:function(values,filter)
{var filteredValue=[];for(var c=0;c<values.length;c++)
{var value=values[c];var curr=1*value.toString().match(/\d+/);if(filter)
{if(Array.contains(filter,curr))
{filteredValue.push(curr+':0');}}
else
{filteredValue.push(curr+':0');}}
return filteredValue;},preProcessActions:function(ddeDelegate,fieldId)
{this.performActions.call(this,ddeDelegate,'preProcess',fieldId);}});