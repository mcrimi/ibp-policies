
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.ClientContentManager=function()
{ArcherTech.UI.ClientContentManager.initializeBase(this);this._uniqueID=null;this._imageUrl=null;this._fields={};this._images={};this._valuesLists={};this._numericRanges=[];};ArcherTech.UI.ClientContentManager.prototype={initialize:function()
{ArcherTech.UI.ClientContentManager.callBaseMethod(this,'initialize');window.$CM=ArcherTech.UI.ClientContentManager._instance=this;},dispose:function()
{ArcherTech.UI.ClientContentManager.callBaseMethod(this,'dispose');this._uniqueID=null;this._imageUrl=null;this._fields=null;this._images=null;this._valuesLists=null;this._numericRanges=null;window.$CM=undefined;},get_imageUrl:function()
{return this._imageUrl;},set_imageUrl:function(val)
{this._imageUrl=val;},get_uniqueID:function()
{return this._uniqueID;},set_uniqueID:function(val)
{this._uniqueID=val;},get_fields:function()
{return this._fields;},set_fields:function(val)
{this._fields=val;for(var fieldId in this._fields)
{field=this._fields[fieldId];if(field)
{field.active=(field.clientId!==undefined);}}},get_images:function(){return this._images;},set_images:function(val){this._images=val;},get_numericRanges:function()
{return this._numericRanges;},set_numericRanges:function(val)
{this._numericRanges=val;},get_valuesLists:function()
{return this._valuesLists;},set_valuesLists:function(val)
{this._valuesLists=val;if(this._valuesLists)
{for(var valueId in this._valuesLists)
{var valuesList=this._valuesLists[valueId];if(valuesList.values)
{this._populateImage(valuesList.values);}}}},getFieldIdFromClientId:function(clientId)
{var result=null;if(clientId)
{var fieldId=clientId.match(/(f\d+)/);if(fieldId&&fieldId.length>1)
result=fieldId[1].replace('f','');}
return result;},getFieldById:function(fieldId)
{var result=null;if(fieldId)
{var fields=this.get_fields();if(fields)
{var id=parseInt(fieldId);result=fields[id];}}
return result;},getValuesListByFieldId:function(fieldId)
{var result=null;if(fieldId)
{var valuesList=this.get_valuesLists();if(valuesList)
result=valuesList[fieldId];}
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
return result;},getDynamicLookupFieldValue:function(fieldId){var me=this,field=this.getFieldById(fieldId),fieldValueFn=function(){result=field.value;if(result==undefined)
result=null;},result=null;if(field!=null){var control=me.getFieldControl(field),fieldType=ArcherTech.Enums.FieldType.toString(field.type);try{if(control){if(me['_get'+fieldType+'FieldValue']){result=me['_get'+fieldType+'FieldValue'](field);}}else{fieldValueFn();}}
catch(e){fieldValueFn();}}
return result;},getFieldValue:function(fieldId,other,ddeDelegate)
{var field=this.getFieldById(fieldId);var newValue;var result=null;if(field!=null)
{if(ddeDelegate&&ddeDelegate.modifiedFields[fieldId]&&ddeDelegate.modifiedFields[fieldId].value!==undefined)
{newValue=ddeDelegate.modifiedFields[fieldId].value;}
var fieldType=ArcherTech.Enums.FieldType.toString(field.type);if(this['_get'+fieldType+'FieldValue'])
{result=this['_get'+fieldType+'FieldValue'](field,other,newValue,ddeDelegate);}
return result;}
throw'Can\'t get field type for Field Id'+fieldId;},setFieldValue:function(fieldId,fieldValue,otherValue)
{if(fieldId)
{var field=this.getFieldById(fieldId);if(field)
{if(field.type==ArcherTech.Enums.FieldType.Date)
{this._setDateFieldValue(field,fieldValue);}
else if(field.type==ArcherTech.Enums.FieldType.ValuesList)
{this._setValuesListFieldValue(field,fieldValue,otherValue);}}}},getTinyMceImages:function(){var me=this,result={count:0,values:[]},images=me.get_images(),select=[],image;function getImageValue(fieldId){var control=me.getFieldControlById(fieldId),hnam='SelectedValues'+fieldId;if(!control){var hfld=$g(hnam);if(!hfld){$mh(hnam,'[]',theForm);}}
return Sys.Serialization.JavaScriptSerializer.deserialize($gv(hnam)||'[]');}
if(images){for(var key in images){result.count++;image=images[key];image.value=''+key;image.files=getImageValue(key).length;result.values.push(image);}
if(result.count>1){result.values=select.concat(result.values);}}
return result;},setTinyMceImage:function(fieldId,fileId){var me=this,hnam='SelectedValues'+fieldId,val=Sys.Serialization.JavaScriptSerializer.deserialize($gv(hnam)||'[]');val.push(fileId);$sv(hnam,Sys.Serialization.JavaScriptSerializer.serialize(val));},_getValueListFromControlId:function(controlId)
{var fieldId=controlId.match(/(f\d+)/);if(!fieldId)return null;return this.getValuesListByFieldId(fieldId[1].replace('f',''));},_populateImage:function(valuesLists)
{for(var i=0;i<valuesLists.length;++i)
{var valuesList=valuesLists[i];if(valuesList.image)
{valuesList.image=this._imageUrl+valuesList.image;}
if(valuesList.values)
{this._populateImage(valuesList.values);}}},_getTextFieldValue:function(field,other,newValue)
{if(newValue!==undefined)
{return newValue;}
var val=null,textField=null;if(field.displayControl==1)
{textField=this.getFieldControl(field);if(textField)
{val=textField.get_value();if(val=='')
{val=null;}}}
else if(field.displayControl==2)
{textField=$('#'+field.clientId);if(textField.length)
{const htmlTagPattern=/<[^>]*>/g;val=textField.val();const containsHTMLTags=htmlTagPattern.test(val);if(val==undefined||val==''||!containsHTMLTags)
{val=null;}}}
return val;},_getNumericFieldValue:function(field)
{var val=null;var numericField=this.getFieldControl(field);if(numericField!=null)
{var valueFromControl=numericField.get_value();if(!isNaN(valueFromControl)&&valueFromControl!=='')
{val=new Number(valueFromControl);}}
return val;},_getDateFieldValue:function(field,other,ddeValue)
{var val=null;var dateField=this.getFieldElement(field);if(dateField!=null)
{var dateTime=$(dateField).find('.archer_ui_datetime');if(dateTime.length>0&&dateTime.controller()&&dateTime.controller().val())
{val=dateTime.controller().val();if(!val||val=='')
{val=null;}}}
return val;},_getValuesListFieldValue:function(field,other,newValue)
{if(newValue!==undefined)
{return newValue;}
var val=null;var valuesListField=this.getFieldControl(field);if(!$nu(valuesListField))
{if(other)
{return valuesListField.get_otherTextText();}
else if(valuesListField.jquery)
{val=valuesListField.find('input[type=hidden]').val();if(val)
{val=[parseInt(val,10)];}
else
{val=[];}}
else
{val=valuesListField.get_selectedValues();if(!val||val.length==0)
{val=null;}
else if(val.length==1&&val[0]==-1)
{Array.removeAt(val,0);}}}
return val;},_getUsersGroupsListFieldValue:function(field)
{var val=null;var userGroupField=this.getFieldControl(field);if(!$nu(userGroupField))
{val=userGroupField.get_selectedValues();if(val)
{if(val.length==1&&val[0].trim()=='')
{Array.removeAt(val,0);}}}
return val;},_getCrossReferenceFieldValue:function(field)
{var val=null;var control=null;if(field.isSuppressed&&field.suppressedId)
{control=$find(field.suppressedId);}
else
{control=this.getFieldControl(field);}
if(control)
{if(field.displayControl==3)
{val=control.get_selectedValues();}
else if(field.displayControl==12)
{val=control.get_selectedIds();}
else if(field.displayControl==8)
{val=control.get_selectedIds();}}
if(val==undefined)
{val=null;}
return val;},_getMatrixFieldValue:function(field)
{var val=[];var matrixField=this.getFieldControl(field);if(matrixField)
{val=matrixField.getFieldValues()||[];}
return val;},_getIpAddressFieldValue:function(field)
{var result=null;var ipAddressField=this.getFieldControl(field);if(ipAddressField)
{result=ipAddressField.get_bytes();}
return result;},_getRecordStatusFieldValue:function(field)
{var val=null;if(field&&field.clientId)
{if(!field.control)
{field.control=control=$('#'+field.clientId);}
if(field.control&&field.control.length>0)
{val=control.find('input[type=hidden]').val();}}
return val;},_getAttachmentFieldValue:function(field)
{var val=null;var attachmentField=this.getFieldControl(field);if(attachmentField)
{val=attachmentField.getValue();}
return val;},_getImageFieldValue:function(field)
{var val=null;var imageField=this.getFieldControl(field);if(imageField)
{val=imageField.getValue();}
return val;},_getRecordPermissionFieldValue:function(field)
{var val=null;var recPermField=this.getFieldControl(field);if(!$nu(recPermField))
{val=recPermField.get_selectedValues();if(val.length==1&&val[0].trim()=='')
{Array.removeAt(val,0);}}
return val;},_getVotingFieldValue:function(field)
{var val=null;var votingField=this.getFieldControl(field);if(votingField)
{val=votingField.getFieldValue();}
return val;},_getExternalLinksFieldValue:function(field)
{var val=null;var extlinkField=this.getFieldControl(field);if(!$nu(extlinkField))
{val=extlinkField.get_externalLinks();if(val==null||val.length==0)
{val=null;}}
return val;},_getSubFormFieldValue:function(field)
{var val=null;var subformField=this.getFieldControl(field);if(subformField)
{val=subformField.get_selectedIds();}
return val;},_getRelatedRecordsFieldValue:function(field)
{var val=null;var control=this.getFieldControl(field);if(control)
{if(field.displayControl==8)
{val=control.get_selectedIds();}
else if(field.displayControl==12)
{val=control.get_selectedIds();}}
return val;},_setDateFieldValue:function(field,fieldValue)
{if(field)
{var dateField=this.getFieldElement(field);if(dateField)
{var dateTime=$(dateField).find('.archer_ui_datetime');if(dateTime.length>0)
{var control=dateTime.controller();if(control)
{control.val(fieldValue);var readOnlyControl=$(dateField).next('.readOnly');if(readOnlyControl.length)
{readOnlyControl.html(control.textVal());}}}}
else
{var backingField=$('#f'+field.id+'hf');if(backingField.length>0)
{var isTimeIncluded=field.isTimeIncluded||false;var value=null;if($nu(fieldValue))
{value='-1';}
else
{var format='M/d/yyyy';if(isTimeIncluded)
{format+=' h:mm tt';}
value=fieldValue.format(format);}
backingField.val(value);}}}},_setValuesListFieldValue:function(field,fieldValues,otherValue)
{if(field)
{var list=this.getFieldControl(field);if(!list)
{var vl=this.getValuesListByFieldId(field.id);var item;for(var i=0;i<vl.values.length;i++)
{item=vl.values[i];if(Array.contains(fieldValues,item.id))
{item.selected=true;}else
{item.selected=false;}}
var backingField=$('#f'+field.id+'hf');if(backingField.length>0)
{backingField.val(fieldValues||[]);}}
else
{list.set_selectedValues(fieldValues);if($LM)
{var layoutItem=$LM.getLayoutItemById(field.layoutId);if(layoutItem&&layoutItem.display==ArcherTech.Enums.LayoutItemActionType.ReadOnly)
{list.applyDDEReadOnly(true);}}
if(otherValue&&otherValue!='')
{list.set_otherTextText(otherValue);list._otherTextTextBox.enable();}
if(!$nu(list._otherTextItemValue))
{list._toggleOtherTextTextBox();}}}}};ArcherTech.UI.ClientContentManager.GetInstance=function()
{if(ArcherTech.UI.ClientContentManager._instance==null)
{ArcherTech.UI.ClientContentManager._instance=$create(ArcherTech.UI.ClientContentManager,{id:ArcherTech.UI.ClientContentManager._instanceName},null,null,null);}
return ArcherTech.UI.ClientContentManager._instance;};ArcherTech.UI.ClientContentManager._instanceName='clientcontentmanager';ArcherTech.UI.ClientContentManager._instance=null;ArcherTech.UI.ClientContentManager.registerClass('ArcherTech.UI.ClientContentManager',Sys.Component);