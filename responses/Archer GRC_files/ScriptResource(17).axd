
steal.plugins('jquery/event','jquery/event/livehack').then(function($){jQuery.Hover=function(){this._delay=jQuery.Hover.delay;this._distance=jQuery.Hover.distance;};$.extend(jQuery.Hover,{delay:100,distance:10})
$.extend(jQuery.Hover.prototype,{delay:function(delay){this._delay=delay;},distance:function(distance){this._distance=distance;}})
var $=jQuery,event=jQuery.event,handle=event.handle,onmouseenter=function(ev){var delegate=ev.liveFired||ev.currentTarget;var selector=ev.handleObj.selector;var loc={pageX:ev.pageX,pageY:ev.pageY},dist=0,timer,entered=this,called=false,lastEv=ev,hover=new jQuery.Hover();$(entered).bind("mousemove.specialMouseEnter",{},function(ev){dist+=Math.pow(ev.pageX-loc.pageX,2)+Math.pow(ev.pageY-loc.pageY,2);loc={pageX:ev.pageX,pageY:ev.pageY}
lastEv=ev}).bind("mouseleave.specialMouseLeave",{},function(ev){clearTimeout(timer);if(called){$.each(event.find(delegate,["hoverleave"],selector),function(){this.call(entered,ev)})}
$(entered).unbind("mouseleave.specialMouseLeave")})
$.each(event.find(delegate,["hoverinit"],selector),function(){this.call(entered,ev,hover)})
timer=setTimeout(function(){if(dist<hover._distance&&$(entered).queue().length==0){$.each(event.find(delegate,["hoverenter"],selector),function(){this.call(entered,lastEv,hover)})
called=true;$(entered).unbind("mousemove.specialMouseEnter")}else{dist=0;timer=setTimeout(arguments.callee,hover._delay)}},hover._delay)};event.setupHelper(["hoverinit","hoverenter","hoverleave","hovermove"],"mouseenter",onmouseenter)})