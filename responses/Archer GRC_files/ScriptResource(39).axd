
(function($)
{$.fn.loadingAnimation=function(options)
{return $(this).each(function()
{var loadingFrame=$('.loadingFrame');if(loadingFrame.length==0)
{var template=[];template.push("<div class='blockingFrame' style='position:absolute;z-index:998;top:0;left:0;right:0;bottom:0;height:100%;width:100%;opacity:.50;filter:alpha(opacity=50);-moz-opacity:0.50;zoom:1;background-color:#fff;'></div>");if(options.image)
{template.push("<div class='frame loadingFrame' style='position:absolute;z-index:999;width:200px;height:200px;top:50%;left:50%;margin-top:-100px;margin-left:-100px;'>");template.push("<table style='width:100%;border-collapse:collapse' cellSpacing='0' cellPadding='0'><tr><td class=FrameTopLeft>&nbsp;</td>");template.push("<td class='frame-title'><span class='FramePageName'></span></td>");template.push("<td class='FrameTopRight'>&nbsp;</td></tr><tr><td class='FrameLeft'>&nbsp;</td>");template.push("<td class='FrameContent' style='background:#FFF url("+options.image+") no-repeat 50% 30%;height:150px;'>");template.push("<span class='LoadingText Content' style='font-weight:bold;display:block;text-align:center;margin-top:70px;'></span>");template.push("</td><td class='FrameRight'>&nbsp;</td></tr><tr><td class='FrameBottomLeft'>&nbsp;</td><td class='FrameBottom'></td>");template.push("<td class='FrameBottomRight'>&nbsp;</td></tr></table></div>");}
$(this).append(template.join(''));loadingFrame=$('.loadingFrame');}
var blockingFrame=$('.blockingFrame');blockingFrame.show();loadingFrame.find(".FramePageName").text(options.title);loadingFrame.find(".LoadingText").text(options.text);loadingFrame.show();});}
$.fn.loadingAnimation.remove=function(p)
{var loadingFrame=$('.loadingFrame');if(loadingFrame.length)
{loadingFrame.hide();}
var blockingFrame=$('.blockingFrame');if(blockingFrame.length)
{blockingFrame.hide();}}})(jQuery);