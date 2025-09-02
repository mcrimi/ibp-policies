
steal.plugins('jquery/controller','jquery/lang/json','phui/scrollbar_width','phui/keycode').controllers('dropdown','selectable').then(function()
{$.Controller.extend("Phui.Combobox",{defaults:{classNames:"phui_combobox_wrapper",render:{"itemTemplate":function(item,val)
{if(!val)
{return"<span class='text'>"+item.text+"</span>";}else
{var re=new RegExp('\\b'+val,'i'),pos=item.text.search(re),start=item.text.substr(0,pos),end=item.text.substr(pos+val.length);return"<span class='text'>"+
start+"<span class='item-match'>"+
item.text.substr(pos,val.length)+"</span>"+end+"</span>";}}},filterEnabled:true,displayHTML:false,selectedClassName:"selected",activatedClassName:"activated",disabledClassName:"disabled",width:null,filterEnabled:false,emptyItemsText:($C?$C('EmptyMsg'):"No items available"),watermarkText:"Click for options",showNoSelectionOption:false,noSelectionMsg:($C?$C('NoSelectionMsg'):"No Selection"),storeSerializedItem:true,nonSerializedAttrs:["id","activated","children","level","parentId","forceHidden","__type"],overrideDropdown:false,noItemsMsg:($C?$C('EmptyMsg'):"No items available")}},{setup:function(el,options)
{el=$(el);var name=el.attr("name"),id=el.attr("id"),div=$("<div><div class='toggle'><img class=\"toggle-img\" src=\"../RSAarcher/BackgroundImageGenerator.axd?className=MasterSprite&classProperties=timestamp:636832210886600000;themeId:143;iName:archer;\" alt=\"toggle icon\" /></div><div class='viewbox' tabindex='0' style='display:none'></div><div class='container'></div><input type='hidden' /></div>"),container=div.find('.container');this.oldElement=el.replaceWith(div).removeAttr("name");this.oldElement.css("display","block");this.oldElement.attr("role","combobox");this.oldElement.attr("aria-autocomplete","list");this.oldElement.attr("aria-expanded","false")
if(options.filterEnabled!=null&&options.filterEnabled==false)
{this.oldElement.attr("readonly","readonly");}
div.attr("id",this.oldElement.attr("id"));this.oldElement.removeAttr("id");container.append(this.oldElement);var hidden=div.find("input[type=hidden]")
hidden.attr("name",name);hidden.attr("id",id+"_hf");this._super(div,options);if(this.options.displayHTML)
{this.oldElement.hide();this.find(".viewbox").show();}},init:function()
{this.element.addClass(this.options.classNames);if(this.options.width)
{this.element.width(this.options.width);}
this.currentItem={"value":null};this.loadData(this.options.items);this.resetWatermark();this.valueSet=true;},resetWatermark:function()
{var value=this.val();if((value===null||value==="")&&!this.options.showNoSelectionOption&&this.options.watermarkText)
{this.find("input[type='text']").val(this.options.watermarkText);}},clearWatermark:function()
{var input=this.find("input[type='text']");if(input.val()==this.options.watermarkText)
{input.val("");}},dropdown:function()
{if(!this._dropdown)
{this.options.inputElement=this.element.find("input[type='text']");this._dropdown=$("<div/>").phui_combobox_dropdown($.extend({parentElement:this.element},this.options)).hide();if(this.element)
{this.element.after(this._dropdown[0]);if(this.options.items)
{this.dropdown().controller().draw(this.modelList);}}
this.dropdown().hide();}
return this._dropdown;},loadData:function(items)
{if(!items)
{return;}
var selected=this.makeModelList(items);if(selected)
{this.val(selected.value);}},cleanData:function()
{this.modeList=[];},makeModelList:function(items)
{if(!items||items.length===0)
{this.modelList=[];return this.modelList;}
var data=this.flattenEls(items.slice(0),0),selectedItem,instances=[],item;this.createNoSelectionItem(instances,items[0]);if(instances.length>0)
{selectedItem=instances[0];}
for(var i=0;i<data.length;i++)
{item=data[i];item=$.extend({id:i+1,enabled:true,children:[],level:0},typeof item=='string'?{text:item}:item);if(item.selected)
{selectedItem=item;}
instances.push(item);}
this.modelList=instances;return selectedItem;},createNoSelectionItem:function(list,itemZero)
{var noSelectionText=this.options.noSelectionMsg;var noSelectionEnabled=this.options.showNoSelectionOption;if(itemZero!=null&&itemZero.text==noSelectionText)
{return;}
var item={id:0,enabled:true,children:[],level:0,value:null,text:noSelectionText,forceHidden:!noSelectionEnabled};if(!list||list.length>0)
{var newList=[];newList.push(item);$.each(list,function(item)
{newList.push(item);});list=newList;}
else
{list.push(item);}},flattenEls:function(list,currentLevel,items)
{items=items||[];currentLevel=currentLevel||0;if(!list||!list.length)
{return;}
var i=0;for(;i<list.length;i++)
{var item=list[i];item.level=currentLevel;items.push(item);if(item.children&&item.children.length>0)
{items=this.flattenEls(item.children,currentLevel+1,items);}}
return items;},".viewbox focusin":function(el,ev)
{this._toggleComboboxView(el);},_toggleComboboxView:function(el)
{el.hide();var input=this.find("input[type='text']");if(input.is(':visible'))
{input.show();if(this.options.filterEnabled)
{input[0].focus();input[0].select();}}},showDropdown:function(callback)
{this.clearWatermark()
this.dropdown().controller().show(callback);},showDropdownIfHidden:function(callback)
{if(!this.dropdown().is(":visible"))
{this.showDropdown(callback);}else
{callback&&callback();}},"input keydown":function(el,ev){if(ev.keyCode===9){this.removeAriaLabel();}},"input keyup":function(el,ev)
{var key=$.keyname(ev),selectable=this.dropdown().children("ul").controller();switch(key)
{case"escape":this.dropdown().controller().hide();this.removeAriaLabel();return false;case"down":if(this.dropdown().is(":visible"))
{selectable.selectNext();}
else
{this.focusInputAndShowDropdown(this.find("input[type=text]"));var viewbox=this.find(".viewbox");if(viewbox.is(":visible"))
{this._toggleComboboxView(viewbox);}}
this.addAriaLabel();return;case"up":this.showDropdownIfHidden(function()
{selectable.selectPrev();});this.addAriaLabel();return;case"enter":if(this.dropdown().is(":visible"))
{var selected=this.dropdown().children("ul").controller().selected();this.dropdown().controller().selectElement(selected);}else
{this.showDropdown();}
var inputTag=this.find("input[type='text']");inputTag.attr("title",inputTag.attr("aria-label"));this.removeAriaLabel();return;case"left":case"right":case"shift":case"tab":return;default:if(this.options.filterEnabled)
{this.autocomplete(el.val());}}},autocomplete:function(val)
{if(!this.modelList||!this.modelList[0]||!this.modelList[0].text)
{return;}
var isAutocompleteData=true,noItemsMsg=this.dropdown().find('.noItemsMsg'),matches=this.modelList;if(val&&val!="")
{matches=$.grep(this.modelList,function(item)
{var re=new RegExp('\\b'+val,'i');return item.value&&!item.forceHidden&&(item.text.search(re)>-1);});}
this.dropdown().controller().draw(matches,val);this.showDropdownIfHidden();if(!matches.length)
{if(!noItemsMsg.length)
{this.dropdown().children(":eq(0)").hide();this.dropdown().append("<span class='noItemsMsg'>"+this.options.noItemsMsg+"</span>");}}
else
{if(noItemsMsg.length)
{this.dropdown().children(":eq(0)").show();noItemsMsg.remove();}}
this.dropdown().controller().fitDropdown();},"input click":function(el,ev)
{this.focusInputAndShowDropdown(el);},focusInputAndShowDropdown:function(el)
{if(el.is(':disabled'))return;if(el.is(":visible")&&this.options.filterEnabled)
{el[0].focus();}
if(!this.dropdown().is(":visible"))
{if(this.dropdown().width()==0)
{this.dropdown().width(this.element.width());}
if(this.options.overrideDropdown)
{el.trigger("show:dropdown",this);}else
{if(this.currentItem)
{var current=this.dropdown().controller()._getEl(this.currentItem.item);if(current.length)
{this.dropdown().controller().list.controller().selected(current,false);}}
this.showDropdown();}
setTimeout(function()
{el[0].select();});}},modelListMatches:function(attr,value)
{return $.grep(this.modelList,function(item)
{return item[attr]==value;});},_setViewboxHtmlAndShow:function(html)
{if(this.options.displayHTML)
{this.find("input[type=text]").hide();this.find(".viewbox").show().html(html||"");}},".toggle click":function(el,ev)
{if(this.dropdown().is(":visible"))
{this.dropdown().controller().hide();}else
{this.focusInputAndShowDropdown(this.find("input[type=text]"));}
var viewbox=this.find(".viewbox");if(viewbox.is(":visible"))
{this._toggleComboboxView(viewbox);}},focusin:function(el,ev)
{clearTimeout(this.closeDropdownOnBlurTimeout);},focusout:function(el,ev)
{if(this.dropdown().is(":hidden"))
{return;}
var thisObject=this;var callback=function()
{if(thisObject.dropdown().controller().wasFocused())
{thisObject.dropdown().controller().resetWasFocused();thisObject.find("input[type=text]").focus();}
else
{thisObject.blurred();}}
this.closeDropdownOnBlurTimeout=setTimeout(callback,200);},blurred:function()
{try
{if(this.currentItem.item)
{this._setViewboxHtmlAndShow(this.options.render.itemTemplate(this.currentItem.item));}
this.removeAriaLabel();this.dropdown().controller().hide();}catch(e)
{}},removeAriaLabel:function(){var inputTag=this.find("input[type='text']");if(inputTag.attr("aria-labelledby")===undefined){ariaLabelledBy=inputTag.attr("data-aria-labelledby");inputTag.attr("aria-labelledby",ariaLabelledBy);inputTag.removeAttr("aria-label");inputTag.removeAttr("data-aria-labelledby");}},addAriaLabel:function(){var inputTag=this.find("input[type='text']");ariaLabelledBy=inputTag.attr("aria-labelledby");if(ariaLabelledBy!=undefined){inputTag.attr("data-aria-labelledby",ariaLabelledBy);inputTag.removeAttr("aria-labelledby");}},".toggle dblclick":function(el)
{if($.browser.msie)
{if(this.dropdown().is(":visible"))
{this.dropdown().controller().hide()}else
{this.showDropdown()}
this.focusInputAndShowDropdown(this.find("input[type=text]"));}},destroy:function()
{this.dropdown().stop().remove();this._dropdown=null;this.modelList=null;this.oldElementName=null;var me=this.element;this._super();me.replaceWith(this.oldElement);this.oldElement=null;},textVal:function()
{return this.find("input[type=text]").val();},val:function(value)
{if(value===undefined)
{return this.currentItem.value;}
var item=this.modelListMatches("value",value)[0];if(item)
{var html=this.options.render.itemTemplate(item);if(this.currentItem.item)
{this.currentItem.item.activated=false;}
this.currentItem={"value":item.value,"item":item,"html":html};item.activated=true;if(item.value!=null)
{this.oldElement[0].value=$.trim(this.htmlUnEscape(item.text));}else
{this.oldElement[0].value="";}
if(this.options.displayHTML)
{this._setViewboxHtmlAndShow(html);}
if(this.options.storeSerializedItem&&this.currentItem.value)
{var clone=$.extend({},this.currentItem.item);for(var field in clone)
{if($.inArray(field,this.options.nonSerializedAttrs)>-1)
{delete clone[field];}}
this.find("input[type=hidden]")[0].value=$.toJSON(clone);}
else
{this.find("input[type=hidden]")[0].value=this.currentItem.value;}
if(this._dropdown)
{this.dropdown().controller().draw(this.modelList);}
if(this.valueSet)
{this.element.trigger("change",this.currentItem.value);}}},'input change':function(el,ev)
{ev.stopImmediatePropagation();},selectItem:function(value)
{var item=this.modelListMatches("value",value)[0];if(item)
{item.forceHidden=false;this.dropdown().controller().selectItem(item);}},clearSelection:function()
{if(this.currentItem.item)
{this.find("input[type='text']").val("");this.find("input[type=hidden]").val(null);this.dropdown().controller().clearSelection(this.currentItem.item);this.currentItem={"value":null,"item":null,"html":null};}},getItem:function(value)
{var item=this.modelListMatches("value",value)[0];if(item)
{return item;}
return null;},getItems:function()
{return this.modelList||[];},populateItems:function(callback)
{this.find("input[type='text']").trigger("show:dropdown",[this,callback]);},query:function(text)
{var matches=$.grep(this.modelList,function(item)
{return item.text.indexOf(text)>-1;});var results=[];for(var i=0;i<matches.length;i++)
{results.push(matches[i].value);}
return results;},enableNoSelection:function(value)
{this.options.showNoSelectionOption=value;if(this.modelList&&this.modelList.length>0)
{if(value)
{this.showItem(null);}
else
{this.hideItem(null);}}},showItem:function(value)
{var item=this.modelListMatches("value",value)[0];if(item)
{this.dropdown().controller().showItem(item);item.forceHidden=false;}},hideItem:function(value)
{var item=this.modelListMatches("value",value)[0];if(item)
{if(this.currentItem.item&&item.value===this.currentItem.item.value)
{this.clearSelection();}
this.dropdown().controller().hideItem(item);item.forceHidden=true;}},enable:function(value)
{var item=this.modelListMatches("value",value)[0];if(item)
{item.enabled=true;this.dropdown().controller().enable(item);}},disable:function(value)
{var item=this.modelListMatches("value",value)[0];if(item)
{item.enabled=false;item.activated=false;this.dropdown().controller().disable(item);}},htmlUnEscape:function(str){return str.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,'\'').replace(/&lt;/g,'<').replace(/&gt;/g,'>');}});});