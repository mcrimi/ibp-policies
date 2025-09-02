
ArcherTech.UI.GenericContent.prototype.setReadOnly=function(layoutId,readOnly)
{var control=$LM._getControlFromLayoutId(layoutId,true);if(control)
{type=control.constructor.__typeName;if(!type)
{if(control.dotNetControl&&control.dotNetControl.IsValuesList)
{control=control.dotNetControl;type=control.constructor.__typeName;}
else
{type=control.Class.fullName;}}
try
{return this.doReadOnly[type](control,readOnly);}
catch(e)
{}}};(function()
{var doReadOnly=ArcherTech.UI.GenericContent.prototype.doReadOnly={},readOnlyGenerator=function(getControl,getContent)
{return function(widget,read_only)
{var control=getControl.apply(widget,arguments),readOnly=control.next(),content;if(!readOnly.length||!readOnly.hasClass('readOnly'))
{readOnly=$('<div class=\'readOnly\'></div>').insertAfter(control);}
if(read_only)
{control.hide();content=getContent.apply(widget,arguments);if(content&&!content.jquery)
{content=content.toString();}
if(widget.constructor.__typeName!='ArcherTech.UI.RichTextEditor'){content=(content||'').replace(/</g,'&lt;');}
readOnly.html(content).show();}
else
{control.show();readOnly.hide();}};},formatDate=function()
{var d=this.get_selectedDate(),df=this.get_dateFormat?this.get_dateFormat():'M/d/yyyy';return d?d.format(df+' hh:mm tt'):'';},textDate=readOnlyGenerator(function(){return $(this._element).parent();},formatDate);doReadOnly['Telerik.Web.UI.RadDatePicker']=textDate;doReadOnly['ArcherTech.UI.ArcherRadDateTimePicker']=textDate;var dropDate=readOnlyGenerator(function(){return $(this._element);},formatDate);doReadOnly['ArcherTech.UI.CalendarComboBox']=dropDate;doReadOnly['ArcherTech.UI.CalendarComboBoxWithTime']=dropDate;doReadOnly['ArcherTech.UI.AttachmentField']=function(control,read_only)
{control.applyDDEReadOnly(read_only);};doReadOnly['ArcherTech.UI.VotingField']=function(control,read_only)
{control.applyDDEReadOnly(read_only);};doReadOnly['ArcherTech.UI.HistoryLog']=function(control,read_only){};doReadOnly['Archer.UI.NumericInput']=readOnlyGenerator(function()
{return this.element.parent();},function()
{return this.val();});doReadOnly['ArcherTech.UI.RichTextEditor']=readOnlyGenerator(function(widget,read_only)
{return this.applyDDEReadOnly(read_only);},function()
{return this.getCurrentValue();});doReadOnly['Phui.Combobox']=readOnlyGenerator(function()
{return this.element.closest('.ComboboxWrapper');},function()
{var currentItem=this.currentItem.item;if(currentItem!=null&&currentItem.value!=null)
{return currentItem.text;}
else
{return'';}});doReadOnly['Archer.UI.Datetime']=readOnlyGenerator(function(widget,read_only)
{if(read_only)
{$(document).trigger('click');}
return this.element.parent();},function()
{return this.textVal();});doReadOnly['ArcherTech.UI.DiscussionField']=function(control,read_only){};doReadOnly['ArcherTech.UI.IpAddressInput']=readOnlyGenerator(function()
{return $(this._element);},function()
{return this.get_value();});doReadOnly['ArcherTech.UI.IPAddressV6EditControl']=readOnlyGenerator(function()
{return $(this._element);},function()
{return this.get_value();});doReadOnly['ArcherTech.UI.ExternalLinksField']=function(control,isReadOnly)
{control.applyDDEReadOnly(isReadOnly);};var telerikNumericReadOnly=readOnlyGenerator(function(){return $(this._element).closest('.RadInput_archer');},function(){return this.get_value();});doReadOnly['ArcherTech.UI.ArcherNumericTextBox']=telerikNumericReadOnly;doReadOnly['Telerik.Web.UI.RadNumericTextBox']=telerikNumericReadOnly;doReadOnly['ArcherTech.UI.ReferenceField']=function(control,isReadOnly)
{control.applyDDEReadOnly(isReadOnly);};doReadOnly['ArcherTech.UI.MultiReferenceField']=function(control,isReadOnly)
{control.applyDDEReadOnly(isReadOnly);};doReadOnly['ArcherTech.UI.MatrixFieldGrid']=function(control,isReadOnly)
{control.applyDDEReadOnly(isReadOnly);};doReadOnly['ArcherTech.UI.EnhancedList']=function(control,isReadOnly)
{control.applyDDEReadOnly(isReadOnly);};doReadOnly['ArcherTech.UI.SchedulerField']=function(control,isReadOnly){control.applyDDEReadOnly(isReadOnly);};var textField=readOnlyGenerator(function(){return $(this._element).parent();},function(){return this.get_value();});doReadOnly['Telerik.Web.UI.RadMaskedTextBox']=textField;doReadOnly['Telerik.Web.UI.RadTextBox']=textField;})();