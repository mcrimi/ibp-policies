
$.fn.treeview=function(settings)
{function itemClicked(e)
{var target=$(e.target);if(target.siblings('a.rtIn').length)
{var anchor=target.siblings('a.rtIn');if(target.is('span.rtMinus'))
{anchor.attr('aria-expanded','false');}
else if(target.is('span.rtPlus'))
{anchor.attr('aria-expanded','true');}}
if(target.is('span.rtMinus')||target.is('span.rtPlus'))
{target.toggleClass('rtPlus').toggleClass('rtMinus').trigger('_expandTree',target);}
else if(target.is('a.rtIn'))
{if(target.hasClass('rtDisabled'))return false;target.trigger('NodeClicked',target);}};function keyPressed(e)
{var target=$(e.target);if(!target.is('a.rtIn'))return false;var span=target.siblings('span');var isCollapsed=span.hasClass('rtPlus');switch(e.keyCode)
{case 39:if(isCollapsed){e.stopPropagation();span.trigger('click');}
break;case 37:if(!isCollapsed){e.stopPropagation();span.trigger('click');}
break;}};function setTabIndexes(listItem)
{var childUl=listItem.children('ul');if($('> div > span',listItem).hasClass('rtPlus'))
{$('a',childUl).attr('tabindex','-1');}
else
{$('> li > div > a',childUl).attr('tabindex','0');childUl.children('li').each(function()
{setTabIndexes($(this));});}};return $(this).each(function()
{$(this).click(itemClicked).keydown(keyPressed).bind('_expandTree',function(e)
{var li=$(e.target).closest('li');var childUl=li.children('ul');if(childUl.length>0)
{childUl.children('li').toggleClass('rtHidden');setTabIndexes(li);}
else if(li.hasClass('SrvcExpandCollaspe'))
{$(e.target).trigger('ExpandTree',childUl);}});});};