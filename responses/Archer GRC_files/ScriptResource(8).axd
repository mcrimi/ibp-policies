
steal=function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]=='function'&&arguments[i]!=jQuery){arguments[i](jQuery);}}
return steal;};steal.plugins=steal.plugin=steal.then=steal.resources=steal.models=steal.controllers=steal;steal.dev=function(){};steal.dev.isHappyName=function(){};jQueryPluginCreator={add:function(controlId,controlClass,options,events,data)
{if(controlClass&&controlClass.fullName=='Phui.Combobox'&&window.ArcherTech&&window.ArcherTech.UI&&window.ArcherTech.UI.GenericContent)
{var vl=$CM._getValueListFromControlId(controlId);if(vl)
{var vlItems=vl.values,items=[],item,selectedId;if(options.items&&options.items.length>0&&options.items[0]&&options.items[0].value)
{selectedId=options.items[0].value;}
function buildTree(parentCollection,valuesListItems)
{for(var i=0;i<valuesListItems.length;i++)
{item=valuesListItems[i];var newItem={value:item.id+':0',text:item.name,selected:item.selected?true:(item.id+':0'==selectedId),active:item.active,enabled:!item.disabled,children:[],forceHidden:item.forceHidden};if(item.values&&item.values.length>0)
{buildTree(newItem.children,item.values);}
parentCollection.push(newItem);}}
buildTree(items,vlItems);options.items=items;controlClass=Phui.Combobox;}}
var controlEl=document.getElementById(controlId),inst=new controlClass(controlEl,options),event,item,handler;for(event in events)
{handler=events[event];if(typeof events[event]=='string')
{handler=window[events[event]];}
if(handler)
{inst.element.bind(event,handler);}}
for(item in data)
{inst.element.data(item,data[item]);}}};