
steal.plugins('archer/ui/time/popout','archer/ui/date/popout').then(function()
{$.Controller.extend('Archer.UI.Datetime',{listensTo:['setDate','closed'],_dateFormat:'dd MMMM yyyy',_timeFormat:'hh:mm:ss tt',setDateFormat:function(format)
{Archer.UI.Datetime._dateFormat=format;},setTimeFormat:function(format)
{Archer.UI.Datetime._timeFormat=format;},formatTime:function(timeinMS,seconds)
{var datetime=new Date(timeinMS);if(datetime.localeFormat)
{return datetime.localeFormat(seconds!==false?this._timeFormat:this._timeFormat.replace(/\:?ss/,''));}else
{return''+datetime.getHours()+':'+datetime.getMinutes();}},formatDate:function(datetime,includeTime)
{var format=this._dateFormat;if(includeTime)
{format+=' '+this._timeFormat;}
if(datetime.format)
{return datetime.format(format);}else
{return''+datetime;}},parseTime:function(dateStr,includeTime)
{var format=this._dateFormat;if(includeTime)
{format+=' '+this._timeFormat;}
if(Date.parseLocale)
{var newDate=Date.parseLocale(dateStr,format);if(includeTime&&!newDate)
{newDate=Date.parseLocale(dateStr,this._dateFormat);if(newDate)
{newDate.setHours(0,0);}}
return newDate;}else
{return new Date(dateStr);}},defaults:{showTime:true,showDate:true,val:null,dateDropdown:false}},{setup:function(el,options)
{var el=$(el),div,options=options||{};if(!options.dateDropdown)
{div=$('<div><a aria-label=\''+options.datePickerLabel+'\' class=\'date\'><img src="../foundation/images/Vista_Calendar_sprite.gif" alt="Date" /></a><a aria-label=\''+options.timePickerLabel+'\' class=\'time\'><img src="../foundation/images/Vista_Calendar_sprite.gif" alt="Time" /></a></div>');}
else
{div=$('<div class=\'datedropdown\'><div class=\'archer_ui_datetime_wrapper\'><div class=\'toggle\'>&nbsp;</div>'+'<div class=\'container\' role=\'combobox\' aria-haspopup=\'listbox\' aria-expanded=\'false\'></div></div><a aria-label=\''+options.datePickerLabel+'\' class=\'date\'></a><a aria-label=\''+options.timePickerLabel+'\' class=\'time\'></a></div>');}
this.oldElement=el.replaceWith(div);function updateAriaExpanded(expanded){div.attr('aria-expanded',expanded);}
div.on('click','.toggle',function(){var isExpanded=div.attr('aria-expanded')==='true';updateAriaExpanded(!isExpanded);});updateAriaExpanded(false);div.attr('id',this.oldElement.attr('id'));this.oldElement.removeAttr('id');if(!options.dateDropdown)
{div.prepend(this.oldElement);}
else
{div.find('.container').append(this.oldElement);}
this._super(div,options);},init:function()
{var timeButton=this.element.find('.time');var dateButton=this.element.find('.date');dateButton[0].tabIndex=0;timeButton[0].tabIndex=0;if(!this.options.showTime)
{timeButton.hide();}
if(this.options.dateDropdown)
{dateButton.hide();}
if(this.options.val)
{var newDate=new Date(this.options.val);if(newDate&&newDate.toString()=='NaN')
{if(this.options.showTime)
{formatted=this.Class.formatDate(this.options.val,this.options.showTime);}
else
{var dates=this.options.val.split(' ');if(dates.length>0)
{formatted=this.Class.formatDate(dates[0],this.options.showTime);}}
this.oldElement.val(formatted);this.element.trigger('change',this.options.val);}
else
{this.val(newDate);}}
if(this.options.width)
{var width=parseInt(this.options.width,10)-10;if(this.options.dateDropdown)
{this.element.find('.archer_ui_datetime_wrapper').width(width);}else
{this.element.find('input').width(width);}}
this.bind(this.oldElement,'change','oldChanged');this.bind(this.oldElement,'keypress','onKeyPress');this.bind(this.oldElement,'keydown','onKeyDown');this.bind(dateButton,'keypress','ondatepickerKeyPress');this.bind(timeButton,'keypress','ontimepickerKeyPress');},ondatepickerKeyPress:function(sender,eventArgs){if(eventArgs.keyCode===13){$(eventArgs.target).click();$('#archer_ui_date_popout').triggerHandler('show',[this.find('input'),this.val(),'ondatepickerKeyPress']);}},ontimepickerKeyPress:function(sender,eventArgs){if(eventArgs.keyCode===13){$(eventArgs.target).click();var element=this.element.find('.archer_ui_datetime_wrapper');$('#archer_ui_time_popout').triggerHandler('show',[element,this.val(),'ontimepickerKeyPress']);sender.addClass('time_active');}},onKeyPress:function(sender,eventArgs){if(eventArgs.keyCode==13){eventArgs.preventDefault();eventArgs.stopImmediatePropagation();}},onKeyDown:function(sender,eventArgs){if(eventArgs.keyCode==13){var el=$($(eventArgs.target).closest('.archer_ui_datetime_wrapper')[0]);if(el.length){el.click();$('#archer_ui_date_popout').triggerHandler('show',[el,this.val(),'ondatepickerKeyPress']);}}},oldChanged:function(el,ev){ev.preventDefault();ev.stopImmediatePropagation();var inputVal=this.oldElement.val();if(!(inputVal===null||inputVal===undefined))
{if(inputVal.length==0)
{this.val(null);}
else
{var dateVal=this.Class.parseTime(inputVal,this.options.showTime);if(dateVal)
{this.val(dateVal);}else
{this.element.trigger('validationError');}}}},'.date click':function(el)
{el.addClass('date_active');$('#archer_ui_date_popout').triggerHandler('show',[this.find('input'),this.val()]);},'.archer_ui_datetime_wrapper click':function(el)
{if(!this.options.dateDropdown)return;$('#archer_ui_date_popout').triggerHandler('show',[el,this.val()]);},'.time click':function(el)
{el.addClass('time_active');var element=this.element.find('.archer_ui_datetime_wrapper');element=element[0]?element:this.find('input');$('#archer_ui_time_popout').triggerHandler('show',[element,this.val()]);},setDate:function(el,ev,date)
{this.val(date);},textVal:function()
{return this.find('input[type=text]').val();},val:function(date)
{if(date===undefined)
{var inputVal=this.oldElement.val(),dateVal=this.Class.parseTime(inputVal,this.options.showTime);return isFinite(dateVal)?dateVal:null;}
if(date==null)
{this.oldElement.val('');this.element.trigger('change',date);}
else
{var datetime=new Date(date.getTime()),formatted=this.Class.formatDate(datetime,this.options.showTime);this.oldElement.val(formatted);this.element.trigger('change',date);}},'closed':function(el,ev)
{ev.stopPropagation();el.find('.date').removeClass('date_active');el.find('.time').removeClass('time_active');}});});