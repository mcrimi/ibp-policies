
ArcherTech.UI.GenericContent.Conditions={process:function(condition,ddeDelegate)
{var fieldId=condition.fieldId,field=$CM.getFieldById(fieldId);if(!field)return false;if(ddeDelegate.modifiedFields[fieldId]&&ddeDelegate.modifiedFields[fieldId].value!==undefined)
{field.value=ddeDelegate.modifiedFields[fieldId].value;}
else if(field.value===undefined)
{field.value=$CM.getFieldValue(condition.fieldId,false,ddeDelegate);}
var currentValue=field.value,compareValue=currentValue,origValue,doComparison=true,args=$.makeArray(arguments),type;if(condition.isOldContent||condition.requiresContentChanged)
{if(field.origValue===undefined)
{origValue=null;}
else
{origValue=field.origValue;}
if(field.type!=ArcherTech.Enums.FieldType.SubForm&&($nu(origValue)||origValue.length==0)&&($nu(currentValue)||currentValue.length==0))
{return false;}}
if(condition.isOldContent)
{compareValue=origValue;}
if(doComparison&&condition.requiresContentChanged)
{if(condition.type===ArcherTech.Enums.FilterType.ChangedField)
{if(field.type===ArcherTech.Enums.FieldType.RelatedRecords&&ddeDelegate.isRelatedRecordChanged)
return true;return!ArcherTech.UI.GenericContent.Helpers.compare(origValue,currentValue,field,true);}
else
{doComparison=!ArcherTech.UI.GenericContent.Helpers.compare(origValue,currentValue,field,false);}}
if(!compareValue&&condition.type!=ArcherTech.Enums.FilterType.Text&&condition.type!=ArcherTech.Enums.FilterType.Numeric)
{compareValue=[];}
args.push(compareValue);args.push(field);if(doComparison)
{var type=ArcherTech.Enums.FilterType.toString(condition.type);if(!this[type])
{throw'cannot process that type of condition';}
return this[type].apply(this,args);}
return false;},Text:function(condition,ddeDelegate,value)
{var currentValue=((value&&value!='')?value.toLowerCase():null);var conditionValue=((condition.value&&condition.value!='')?condition.value.toLowerCase():null);switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:return currentValue===conditionValue;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:return currentValue!==conditionValue;case ArcherTech.Enums.FilterOperatorType.Contains:if(!currentValue)
{return currentValue===conditionValue;}
return currentValue.indexOf(conditionValue)>=0;case ArcherTech.Enums.FilterOperatorType.DoesNotContain:if(!currentValue)
{return currentValue!==conditionValue;}
return currentValue.indexOf(conditionValue)<0;default:return false;}},RecordStatus:function(condition,ddeDelegate,value)
{var result=false;if(!$nu(value))
{switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:result=condition.value==value;break;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:result=condition.value!=value;break;}}
return result;},Numeric:function(condition,ddeDelegate,value)
{if(value==null)
value=undefined;switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:return value==condition.value;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:return value!=condition.value;case ArcherTech.Enums.FilterOperatorType.GreaterThan:return value>condition.value;case ArcherTech.Enums.FilterOperatorType.LessThan:return value<condition.value;default:return false;}},NumericBetween:function(condition,ddeDelegate,value)
{return!value||value.length==0?false:(value<=condition.value.endValue)&&(value>=condition.value.beginValue);},NumericRange:function(condition,ddeDelegate,value)
{var numericValue=value?parseInt(value):NaN;var comparisonResult=false;if(isNaN(numericValue))
{comparisonResult=Boolean(condition.isNoSelectionIncluded);}
else if(condition.value&&condition.value.length>0)
{var cm=$CM;if(cm)
{for(var i=0;i<condition.value.length&&!comparisonResult;++i)
{var numericRange=cm._numericRanges[condition.value[i]]||null;if(numericRange&&!isNaN(numericValue))
{comparisonResult=numericValue>=numericRange.minValue&&numericValue<=numericRange.maxValue;}}}}
switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Contains:return comparisonResult;case ArcherTech.Enums.FilterOperatorType.DoesNotContain:return!comparisonResult;}
return false;},ValueList:function(condition,ddeDelegate,values)
{if(!condition.value)condition.value=[];var compareValues=[],equals=(condition.value.length==values.length),selected,contains=false,j=0,i=0;for(;j<values.length;j++)
{compareValues.push(parseInt(values[j],10));}
for(;i<condition.value.length;i++)
{selected=condition.value[i];if(!Array.contains(compareValues,selected))
{equals=false;}
else
{contains=true;}}
if(condition.isNoSelectionIncluded&&(values==null||values.length==0||values[0]==2147483647))
{contains=true;equals=true;}
switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:return equals;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:return!equals;case ArcherTech.Enums.FilterOperatorType.Contains:return contains;case ArcherTech.Enums.FilterOperatorType.DoesNotContain:return!contains;}
return false;},UserGroup:function(condition,ddeDelegate,values)
{if(!condition.value)
{condition.value={};condition.value.userIds=[];condition.value.groupIds=[];}
if(condition.isNoSelectionIncluded==undefined)
condition.isNoSelectionIncluded=false;var usersAndGroups=[],userIds=condition.value.userIds||[],groupIds=condition.value.groupIds||[],equals,selected,contains=false;if(!condition.isNoSelectionIncluded&&(!userIds.length&&!groupIds.length))return false;for(var i=0;i<userIds.length;i++)
{usersAndGroups.push(userIds[i]+':1');}
for(var i=0;i<groupIds.length;i++)
{usersAndGroups.push(groupIds[i]+':2');}
equals=(usersAndGroups.length==values.length);for(var i=0;i<usersAndGroups.length;i++)
{selected=usersAndGroups[i];if(Array.contains(values,selected))
{contains=true;}
else
{equals=false;}}
if(condition.isNoSelectionIncluded&&(values==null||values.length==0))
{contains=true;}
switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:return equals;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:return!equals;case ArcherTech.Enums.FilterOperatorType.Contains:return contains;case ArcherTech.Enums.FilterOperatorType.DoesNotContain:return!contains;}
return false;},Reference:function(condition,ddeDelegate,values)
{var contains=false,equals=false,hasValidNoSelectionCondition=condition.isNoSelectionIncluded&&(values==null||values.length==0||values[0]==2147483647);if(condition.value)
{var compareValues=[],selected,conditionValues=condition.value[0],i=0;equals=(conditionValues.length==values.length);for(;i<conditionValues.length;i++)
{selected=conditionValues[i];compareValues.push(selected);if(Array.contains(values,selected))
{contains=true;}
else
{equals=false;}}
if(hasValidNoSelectionCondition)
{contains=true;}}
else if(hasValidNoSelectionCondition)
{equals=true;contains=true;}
switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:return equals;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:return!equals;case ArcherTech.Enums.FilterOperatorType.Contains:return contains;case ArcherTech.Enums.FilterOperatorType.DoesNotContain:return!contains;}
return false;},DateOffset:function(condition,ddeDelegate,value)
{var h=ArcherTech.UI.GenericContent.Helpers;var type=ArcherTech.Enums.FilterOperatorType.toString(condition.operator);return h.isDate(value)?h[type](value,condition.value):false;},DateComparison:function(condition,ddeDelegate,value,field)
{var h=ArcherTech.UI.GenericContent.Helpers;var result=false;var compareDate=h.isDate(value)?value:h.nilDate();var conditionDate=h.isDate(condition.value)?condition.value:h.nilDate();var begin=new Date(conditionDate.getTime());var end=new Date(conditionDate.getTime());var notBetween=false;switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:end=h.getEndOfTheDay(end);break;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:end=h.getEndOfTheDay(end);notBetween=true;break;case ArcherTech.Enums.FilterOperatorType.GreaterThan:begin=h.addDays(begin,1);end=h.maxDate();break;case ArcherTech.Enums.FilterOperatorType.LessThan:begin=h.minDate();end=h.getEndOfPreviousDay(end);break;}
result=compareDate<=end&&compareDate>=begin;if(notBetween)
result=!result;return result;},DateRange:function(condition,ddeDelegate,value,field)
{var h=ArcherTech.UI.GenericContent.Helpers;var result=false;if(h.isDate(value))
{var begin=condition.value.beginValue;var end=condition.value.endValue;end=h.getEndOfTheDay(end);result=value<=end&&value>=begin;}
return result;},CurrentDate:function(condition,ddeDelegate,value)
{var h=ArcherTech.UI.GenericContent.Helpers;var result=false;if(h.isDate(value))
{var begin=null;var end=null;switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.CurrentDay:begin=h.today();end=h.getEndOfTheDay(h.today());break;case ArcherTech.Enums.FilterOperatorType.CurrentMonth:var start=h.today();begin=new Date(start.getFullYear(),start.getMonth(),1);end=h.getEndOfPreviousDay(h.addMonths(new Date(start.getFullYear(),start.getMonth(),1),1));break;case ArcherTech.Enums.FilterOperatorType.CurrentQuarter:var currentQuarter=h.quarter();begin=new Date(currentQuarter.getFullYear(),currentQuarter.getMonth(),1);end=h.getEndOfPreviousDay(h.addMonths(new Date(currentQuarter.getFullYear(),currentQuarter.getMonth(),1),3));break;case ArcherTech.Enums.FilterOperatorType.CurrentYear:var start=h.today();begin=new Date(start.getFullYear(),0,1);end=h.getEndOfPreviousDay(h.addYears(new Date(start.getFullYear(),0,1),1));break;case ArcherTech.Enums.FilterOperatorType.AfterToday:begin=h.addDays(h.today(),1);end=h.maxDate();break;case ArcherTech.Enums.FilterOperatorType.PriorToToday:begin=h.minDate();end=h.getEndOfPreviousDay(h.today());break;}
result=value<=end&&value>=begin;}
return result;},ChangedField:function(condition,ddeDelegate,value,field)
{return true;},IpAddress:function(condition,ddeDelegate,value)
{var array1=condition.value||[];var array2=value||[];switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:return ArcherTech.UI.GenericContent.Helpers.compareArrays(array1,array2);case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:return!ArcherTech.UI.GenericContent.Helpers.compareArrays(array1,array2);default:return false;}},Matrix:function(condition,ddeDelegate,values,field)
{var result=false;if(!condition.value)
condition.value=[];switch(condition.operator)
{case ArcherTech.Enums.FilterOperatorType.Equals:result=this._isEqualsMatrix(condition.isNoSelectionIncluded,condition.value,values);break;case ArcherTech.Enums.FilterOperatorType.DoesNotEqual:result=!this._isEqualsMatrix(condition.isNoSelectionIncluded,condition.value,values);break;case ArcherTech.Enums.FilterOperatorType.Contains:result=this._containsMatrix(condition.isNoSelectionIncluded,condition.value,values);break;case ArcherTech.Enums.FilterOperatorType.DoesNotContain:result=!this._containsMatrix(condition.isNoSelectionIncluded,condition.value,values);break;}
return result;},_isEqualsMatrix:function(isNoSelectionIncluded,conditionValues,currentValues)
{var result=false;if(isNoSelectionIncluded&&conditionValues.length==0&&currentValues.length==0)
{result=true;}
else
{var array1=conditionValues||[];var array2=currentValues||[];if(array1.length==array2.length)
{result=true;for(var i=0;i<array1.length;i++)
{if(array1[i].Key!==array2[i].Key||!ArcherTech.UI.GenericContent.Helpers.compareArrays(array1[i].Value,array2[i].Value))
{result=false;break;}}}}
return result;},_containsMatrix:function(isNoSelectionIncluded,conditionValues,currentValues)
{var result=false;if(isNoSelectionIncluded&&conditionValues.length==0&&currentValues.length==0)
{result=true;}
else if(conditionValues&&conditionValues.length>0)
{result=true;for(var colIdx=0;colIdx<conditionValues.length;++colIdx)
{for(var rowIdx=0;rowIdx<conditionValues[colIdx].Value.length;++rowIdx)
{if(!this._isSelectedMatrix(conditionValues[colIdx].Key,conditionValues[colIdx].Value[rowIdx],currentValues))
{result=false;break;}}}}
return result;},_isSelectedMatrix:function(colId,rowId,selectedColRows)
{var result=false;if(selectedColRows&&selectedColRows.length)
{for(var colIdx=0;colIdx<selectedColRows.length;++colIdx)
{if(selectedColRows[colIdx]&&selectedColRows[colIdx].Key==colId)
{if(selectedColRows[colIdx].Value&&Array.contains(selectedColRows[colIdx].Value,rowId))
{result=true;break;}}
if(result)
{break;}}}
return result;}};ArcherTech.UI.GenericContent.Helpers={getDate:function(str,useTimezone)
{if(!str)
{return null;}
var date=null;try
{var matches=str.match(/Date\((-*\d+)-(\d\d)(\d\d)/);if(matches)
{return new Date(parseInt(matches[1])-(useTimezone?1000*60*(parseInt(matches[2])*60+parseInt(matches[3])):0));}
else
{matches=str.match(/Date\((-*\d+)\+(\d\d)(\d\d)/);if(matches)
{return new Date(parseInt(matches[1])+(useTimezone?1000*60*(parseInt(matches[2])*60+parseInt(matches[3])):0));}
else
{return new Date(Number(str.match(/-*\d+/)[0]));}}}
catch(e)
{}
return date;},addYears:function(date,years)
{if(this.isDate(date))
{date.setFullYear(date.getFullYear()+years);}
return date;},addMonths:function(date,months)
{if(this.isDate(date))
{date.setMonth(date.getMonth()+months);}
return date;},addDays:function(date,days)
{if(this.isDate(date))
{date.setDate(date.getDate()+days);}
return date;},getEndOfTheDay:function(date)
{if(this.isDate(date))
{date.setDate(date.getDate()+1);date.setMilliseconds(-3);}
return date;},getEndOfPreviousDay:function(date)
{if(this.isDate(date))
{date.setMilliseconds(-3);}
return date;},today:function()
{var now=new Date();now.setMilliseconds(0);now.setSeconds(0);now.setMinutes(0);now.setHours(0);return now;},tomorrow:function()
{return new Date(this.today().getTime()+1000*60*60*24);},month:function()
{var today=this.today();today.setDate(1);return today;},nextMonth:function(months,date)
{months=months===undefined?1:months;var years=Math.floor(months/12);var months=months%12;var thisMonth=date||this.month();var year=thisMonth.getFullYear();thisMonth.setFullYear(year+years);var month=thisMonth.getMonth();if(months+month<=11&&months+month>=0)
{thisMonth.setMonth(month+months);return thisMonth;}else
{var years=months>0?1:-1;var month=years==1?months+month-12:months+month+12;year=thisMonth.getFullYear();thisMonth.setMonth(month);thisMonth.setFullYear(year+years);}
return thisMonth;},quarter:function()
{var now=new Date();var quarters=[this.month(),this.month(),this.month(),this.month()];quarters[0].setMonth(0);quarters[1].setMonth(3);quarters[2].setMonth(6);quarters[3].setMonth(9);for(var q=0;q<quarters.length;q++)
{if(!quarters[q+1]||quarters[q+1]-now>0)
{return quarters[q];}}
throw'can\'t get quarter for '+now;},nextQuarter:function(quarters,date)
{quarters=quarters===undefined?1:quarters;return this.nextMonth(quarters*3,this.quarter());},day:1000*60*60*24,maxDate:function(){return new Date(9999,12,31,23,59,59,997);},minDate:function(){return new Date(1800,1,1,0,0,0,0);},nilDate:function(){return new Date(1001,1,1,0,0,0,0);},Equals:function(date,value)
{return false;},DoesNotEqual:function(date,value)
{return false;},GreaterThan:function(date,value)
{return false;},LessThan:function(date,value)
{return false;},NextXDays:function(date,value)
{var result=false;if(this.isDate(date))
{var begin=this.addDays(this.today(),1);var end=this.getEndOfPreviousDay(this.addDays(this.today(),(1+value)));result=date<=end&&date>=begin;}
return result;},NextXMonths:function(date,value)
{var result=false;if(this.isDate(date))
{var start=this.addMonths(this.today(),1);var begin=new Date(start.getFullYear(),start.getMonth(),1);var end=this.getEndOfPreviousDay(new Date(start.getFullYear(),(start.getMonth()+value),1));result=date<=end&&date>=begin;}
return result;},NextXQuarters:function(date,value)
{var result=false;if(this.isDate(date))
{var start=this.quarter();var begin=this.addMonths(new Date(start.getFullYear(),start.getMonth(),1),3);var end=this.getEndOfPreviousDay(this.addMonths(new Date(start.getFullYear(),start.getMonth(),1),(value*3+3)));result=date<=end&&date>=begin;}
return result;},NextXYears:function(date,value)
{var result=false;if(this.isDate(date))
{var start=this.today();var begin=this.addYears(new Date(start.getFullYear(),0,1),1);var end=this.getEndOfPreviousDay(this.addYears(new Date(start.getFullYear(),0,1),(value+1)));result=date<=end&&date>=begin;}
return result;},LastXDays:function(date,value)
{var result=false;if(this.isDate(date))
{var begin=this.addDays(this.today(),-(value));var end=this.getEndOfPreviousDay(this.today());result=date<=end&&date>=begin;}
return result;},LastXMonths:function(date,value)
{var result=false;if(this.isDate(date))
{var start=this.addMonths(this.today(),-(value));var begin=new Date(start.getFullYear(),start.getMonth(),1);var end=this.getEndOfPreviousDay(this.addMonths(new Date(start.getFullYear(),start.getMonth(),1),value));result=date<=end&&date>=begin;}
return result;},LastXQuarters:function(date,value)
{var result=false;if(this.isDate(date))
{var start=this.quarter();var begin=this.addMonths(new Date(start.getFullYear(),start.getMonth(),1),-(value*3));var end=this.getEndOfPreviousDay(new Date(start.getFullYear(),start.getMonth(),1));result=date<=end&&date>=begin;}
return result;},LastXYears:function(date,value)
{var result=false;if(this.isDate(date))
{var start=this.today();var begin=new Date((start.getFullYear()-value),0,1);var end=this.getEndOfPreviousDay(new Date(start.getFullYear(),0,1));result=date<=end&&date>=begin;}
return result;},isFuture:function(date)
{return(date-new Date()>=0);},isPast:function(date)
{return(new Date()-date>=0);},isDate:function(date)
{return(date&&date.constructor.__typeName=='Date');},compare:function(orig,curr,field,isChangedCondition)
{var result=false;switch(field.type)
{case ArcherTech.Enums.FieldType.Text:result=(orig===curr);break;case ArcherTech.Enums.FieldType.Numeric:result=(orig==curr);break;case ArcherTech.Enums.FieldType.Date:var date1=undefined;var date2=undefined;if(field.isTimeIncluded)
{date1=this.isDate(orig)?orig.getTime():0;date2=this.isDate(curr)?curr.getTime():0;}
else
{date1=this.isDate(orig)?new Date(orig.getFullYear(),orig.getMonth(),orig.getDate()).getTime():0;date2=this.isDate(curr)?new Date(curr.getFullYear(),curr.getMonth(),curr.getDate()).getTime():0;}
result=(date1==date2);break;case ArcherTech.Enums.FieldType.FirstPublishedDate:case ArcherTech.Enums.FieldType.LastUpdatedDate:var date1=this.isDate(orig)?orig.getTime():0;var date2=this.isDate(curr)?curr.getTime():0;result=(date1==date2);break;case ArcherTech.Enums.FieldType.ValuesList:var array1=orig||[];var array2=curr||[];array2.sort();result=this.compareArrays(array1,array2);if(isChangedCondition&&result==true)
{result=!field.otherTextChanged;}
break;case ArcherTech.Enums.FieldType.UsersGroupsList:case ArcherTech.Enums.FieldType.RecordPermissions:case ArcherTech.Enums.FieldType.SubForm:var array1=orig||[];var array2=curr||[];array1.sort();array2.sort();result=this.compareArrays(array1,array2);break;case ArcherTech.Enums.FieldType.CrossReference:case ArcherTech.Enums.FieldType.RelatedRecords:var array1=orig||[];var array2=curr||[];array1.sort();array2.sort();result=this.compareArrays(array1,array2);break;case ArcherTech.Enums.FieldType.IpAddress:var array1=orig||[];var array2=curr||[];result=this.compareArrays(array1,array2);break;case ArcherTech.Enums.FieldType.Matrix:var array1=orig||[];var array2=curr||[];if(array1.length==array2.length)
{result=true;for(var i=0;i<array1.length;i++)
{if(array1[i].Key!==array2[i].Key||!this.compareArrays(array1[i].Value,array2[i].Value))
{result=false;break;}}}
break;case ArcherTech.Enums.FieldType.RecordStatus:result=(orig===curr);break;case ArcherTech.Enums.FieldType.Voting:break;}
return result;},compareArrays:function(a,b)
{var result=false;if($.isArray(a)&&$.isArray(b)&&a.length==b.length)
{result=true;for(var i=0;i<a.length;i++)
{if(a[i]!==b[i])
{result=false;break;}}}
return result;}};