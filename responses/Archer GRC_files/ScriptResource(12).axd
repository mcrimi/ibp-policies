
steal.plugins('jquery/event').then(function($){var oldClean=jQuery.cleanData
$.cleanData=function(elems){for(var i=0,elem;(elem=elems[i])!=null;i++){$(elem).triggerHandler("destroyed")}
oldClean(elems)}})