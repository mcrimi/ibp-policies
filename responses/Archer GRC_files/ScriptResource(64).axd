
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.RecordHelpManager=function(element)
{ArcherTech.UI.RecordHelpManager.initializeBase(this,[element]);this._helpIconPopupUrl=null;this._currentHelpWindow=null;this._currentHelpFieldId=null;this._toolTipManager=null;this._iframeTitle=null;};ArcherTech.UI.RecordHelpManager.prototype={initialize:function()
{ArcherTech.UI.RecordHelpManager.callBaseMethod(this,'initialize');ArcherTech.UI.RecordHelpManager._instance=this;},dispose:function()
{ArcherTech.UI.RecordHelpManager.callBaseMethod(this,'dispose');},get_helpIconPopupUrl:function()
{return this._helpIconPopupUrl;},set_helpIconPopupUrl:function(val)
{this._helpIconPopupUrl=val;},get_currentHelpWindow:function()
{return this._currentHelpWindow;},set_currentHelpWindow:function(val)
{this._currentHelpWindow=val;},get_currentHelpFieldId:function()
{return this._currentHelpFieldId;},set_currentHelpFieldId:function(val)
{this._currentHelpFieldId=val;},get_toolTipManager:function()
{return this._toolTipManager;},set_toolTipManager:function(val)
{this._toolTipManager=val;},get_iframeTitle:function(){return this._iframeTitle;},set_iframeTitle:function(val){this._iframeTitle=val;},addTooltipHelp:function(targetId,fieldId)
{var element=$get(targetId);var tooltip=null;var tooltips=this._toolTipManager.get_tooltips();if(!element){element=$get(targetId+'fm');}
for(i=0;i<tooltips.length;i++)
{tooltip=tooltips[i];if(!tooltip)
{continue;}
if(tooltip.get_targetControlID()==targetId)
{tooltip.dispose();Array.remove(tooltips,tooltips[i]);tooltip=null;}}
if(element){tooltip=this._toolTipManager.createToolTip(element);tooltip.set_serverValue(fieldId);}},closeWindow:function()
{if(this._currentHelpWindow)
{this._currentHelpWindow.close();}},showFieldHelpWindow:function(fieldId,fieldName)
{var w=radopen(null,'_helpIconWindow'),restrictionZoneId=w.get_restrictionZoneID();fieldName=htmlDecoder(fieldName);w.set_restrictionZoneID('');w.setSize(500,200);w.center();w.set_restrictionZoneID(restrictionZoneId);w.set_visibleStatusbar(false);w.set_destroyOnClose(true);w.set_title(fieldName);$(w._titleElement).attr('role','application').attr('aria-label',fieldName+' model window open');$(w._titleElement).attr('tabindex','-1').focus();w.setUrl(this._helpIconPopupUrl+fieldId);if(this._iframeTitle){var contentFrame=w.GetContentFrame();if(contentFrame){contentFrame.title=this._iframeTitle;}}
w.show();$('.rwControlButtons').attr('role','none');$('.rwControlButtons').find('span').attr('aria-hidden','true');$('.rwCloseButton').attr('role','button').attr('aria-label','Close');var closeButton=$(w._buttonsArray);closeButton.on('keydown',function(event){if(event.keyCode===13||event.keyCode===27){w.close();$('img[alt=\'Show help for '+fieldName+'\']').parent().focus();}
event.preventDefault();});this._currentHelpFieldId=fieldId;this._currentHelpWindow=w;}};function sanitizeValues(){if(typeof windowFields!=='undefined'&&windowFields!==null){const ids=windowFields.split(',');for(var i=0;i<ids.length-1;i++){var spanEle=$("#loitem"+ids[i]);if(spanEle.length>0&&spanEle.contents()[1]?.textContent)
spanEle.contents()[1].textContent=htmlDecoder(spanEle.contents()[1].textContent);}}}
function htmlDecoder(input,initialValue){let result=input;if(initialValue!==undefined){result=initialValue;}
if(input){const doc=new DOMParser().parseFromString(input,"text/html");if(doc&&doc.documentElement&&doc.documentElement.textContent){result=doc.documentElement.textContent;}}
return result;}
ArcherTech.UI.RecordHelpManager._instance=null;ArcherTech.UI.RecordHelpManager.GetInstance=function()
{return ArcherTech.UI.RecordHelpManager._instance;};ArcherTech.UI.RecordHelpManager.registerClass('ArcherTech.UI.RecordHelpManager',Sys.UI.Control);