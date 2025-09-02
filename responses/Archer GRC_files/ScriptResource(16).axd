
steal.plugins('jquery/event').then(function(){var event=jQuery.event,findHelper=function(events,types,callback){for(var t=0;t<types.length;t++){var type=types[t],typeHandlers,all=type.indexOf(".")<0,namespaces,namespace;if(!all){namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+namespaces.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)");}
typeHandlers=(events[type]||[]).slice(0);for(var h=0;h<typeHandlers.length;h++){var handle=typeHandlers[h];if(!handle.selector&&(all||namespace.test(handle.namespace))){callback(type,handle.origHandler||handle.handler);}}}}
event.find=function(el,types,selector){var events=$.data(el,"events"),handlers=[];if(!events){return handlers;}
if(selector){if(!events.live){return[];}
var live=events.live;for(var t=0;t<live.length;t++){var liver=live[t];if(liver.selector===selector&&$.inArray(liver.origType,types)!==-1){handlers.push(liver.origHandler||liver.handler);}}}else{findHelper(events,types,function(type,handler){handlers.push(handler);})}
return handlers;}
event.findBySelector=function(el,types){var events=$.data(el,"events"),selectors={},add=function(selector,event,handler){var select=selectors[selector]||(selectors[selector]={}),events=select[event]||(select[event]=[]);events.push(handler);};if(!events){return selectors;}
$.each(events.live||[],function(i,live){if($.inArray(live.origType,types)!==-1){add(live.selector,live.origType,live.origHandler||live.handler);}})
findHelper(events,types,function(type,handler){add("",type,handler);})
return selectors;}
$.fn.respondsTo=function(events){if(!this.length){return false;}else{return event.find(this[0],$.isArray(events)?events:[events]).length>0;}}
$.fn.triggerHandled=function(event,data){event=(typeof event=="string"?$.Event(event):event);this.trigger(event,data);return event.handled;}
event.setupHelper=function(types,startingEvent,onFirst){if(!onFirst){onFirst=startingEvent;startingEvent=null;}
var add=function(handleObj){var selector=handleObj.selector||"";if(selector){var bySelector=event.find(this,types,selector);if(!bySelector.length){$(this).delegate(selector,startingEvent,onFirst);}}
else{if(!event.find(this,types,selector).length){event.add(this,startingEvent,onFirst,{selector:selector,delegate:this});}}}
var remove=function(handleObj){var selector=handleObj.selector||"";if(selector){var bySelector=event.find(this,types,selector);if(!bySelector.length){$(this).undelegate(selector,startingEvent,onFirst);}}
else{if(!event.find(this,types,selector).length){event.remove(this,startingEvent,onFirst,{selector:selector,delegate:this});}}}
$.each(types,function(){event.special[this]={add:add,remove:remove,setup:function(){},teardown:function(){}};});}})