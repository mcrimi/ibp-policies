
function CloseReportConfig(report){var activeRadWindow=parent.GetRadWindowManager().getActiveWindow();if(activeRadWindow)activeRadWindow.close(report);}
var PRELOAD_EVENT_HIDDEN_FIELD_NAME='__preloadevent';function $gv(elem){if(typeof(elem)=='string'){elem=$g(elem);}
return elem.value;}
function $sv(elem,value){if(typeof(elem)=='string'){elem=$g(elem);}
elem.value=value;}
function $g(elem){var obj=document.getElementById(elem);if(!obj){obj=document.getElementsByName(elem);if(obj.length>0)return obj[0];else return null;}
return obj;}
function $t(tagName,elem){if(!elem){elem=document;}
return elem.getElementsByTagName(tagName);}
function InvokeHelp(id){if(parent.Help){parent.Help.setHelpCshId(id);}}
function insertOrAppend(elemToInsert,newParent,toInsertBefore){if(toInsertBefore){newParent.insertBefore(elemToInsert,toInsertBefore);}
else{newParent.appendChild(elemToInsert);}}
function sortElements(list,listItem,sortDir){if(toInsertBefore){newParent.insertBefore(elemToInsert,toInsertBefore);}
else{newParent.appendChild(elemToInsert);}}
function $ns(element){var next=element.nextSibling;while(next&&next.nodeType!=1){next=next.nextSibling;}
return next;}
function $nu(obj){if(obj==null||obj==undefined)return true;return false;}
function $mh(name,value,form){return $('<input type=\'hidden\' id=\''+name+'\' name=\''+name+'\' value=\'\' />').val(value).appendTo(form);}
var _localizedResources={};function get_localizedResources(){return _localizedResources;}
function set_localizedResources(val){_localizedResources=val;}
function $pbMain(args,controlId,arg){var h=$g(PRELOAD_EVENT_HIDDEN_FIELD_NAME);if(h){$sv(h,args);}
else{h=$mh(PRELOAD_EVENT_HIDDEN_FIELD_NAME,args,theForm);}
if($nu(controlId)){controlId=null;}
if($nu(arg)){arg=null;}
try{__doPostBack(controlId,arg);}
catch(e){window.setTimeout(function(){__doPostBack(controlId,arg);},5);}}
function redirectionForAuthSources(recordId){parent.ArcherInterface.clearAllDirtyContent();var initParams=parent.Ext.JSON.encode({xtype:"loader",packageName:"ReactLoader",route:'applications/authoritative-source-references/'+recordId,taskNum:"QuestionLibraryContentRecord"});var h='grcr/'+parent.BaseRsa.encode(initParams);parent.ArcherApp.service.ArcherInterface.redirectForward(h);}
function showUnauthorizedMessagePrompt(){parent.Ext.Msg.show({title:parent.ArcherApp.locales.get('msgbx:content_authorization_title_169'),msg:parent.ArcherApp.locales.get('msgbx:content_authorization_message'),buttons:parent.Ext.Msg.OK,fn:function(btn){if(parent.Ext&&parent.Ext.getBody()){parent.Ext.getBody().unmask();}},});}
var pbHasSubmitted=false;function $pb(args,controlId){try{if(window.top.aspxBridge){const currentUrl=window.location.href;let routeParameters={};let baseRoute='';if(currentUrl.toLowerCase().includes('search.aspx')||currentUrl.toLowerCase().includes('iviewsearchresults.aspx')||currentUrl.toLowerCase().includes('workspacedashboard.aspx')){baseRoute='search';const queryString=currentUrl.split('?').length===2?currentUrl.split('?')[1]:'';const queryParams=queryString.split('&');queryParams.forEach(param=>{const[key,value]=param.split('=');if(key==='reportId'||key==='ReportId'){routeParameters.reportId=value;}
if(key==='moduleId'||key==='ModuleId'){routeParameters.moduleId=value;}});if(args){const argsObj=JSON.parse(args);const recordParams={};const searchParams={};if(argsObj.a){argsObj.a.forEach(item=>{if(item.Key==='recid'){recordParams.contentId=item.Value;}
if(item.Key==='reportId'){searchParams.reportId=item.Value;}
if(item.Key==='statsGroupInfo'){searchParams.statsGroupInfo=item.Value;}
if(item.Key==='moduleId'){searchParams.moduleId=item.Value;}
if(item.Key==='multiReport'){var combo=$('#'+item.Value+'_reportsList');if(combo.length>0&&combo[0].control){var selected=combo[0].control.get_selectedItem();if(selected){var value=selected.get_value();if(value){var itemValues=value.split(';');if(itemValues.length==4){var isAdmin=itemValues[2];var reportId=itemValues[3];if(isAdmin=='False'){searchParams.reportId=reportId;}else{searchParams.adminReportId=reportId;}}}}}}});}
if(recordParams.contentId){baseRoute='record';routeParameters={...recordParams};}
if(searchParams.reportId||searchParams.adminReportId){routeParameters={...searchParams};}}
if(args&&JSON.parse(args).e!=='lookupKeyword'){window.top.aspxBridge(baseRoute,routeParameters);}}}}catch(e){console.log('PB$ Bridge: ERROR',e.message);}
if(!pbHasSubmitted){if(args.indexOf('"refreshsearch"')==-1)
externalRouteHelperforEmptyEntry();if(args.indexOf('"statsdrillin"')!==-1){sessionStorage.setItem('isStatsDrillin',true);}
if(args.indexOf('"refFieldAddNew"')!==-1){pbHasSubmitted=true;}
if(args.indexOf('"navigateToManageAuthoritativeSourcesReferences"')!==-1){var recordId=JSON.parse(args).a[0].Value;var navigateAwayStack=parent.ArcherApp.globalNavigateAway,lastPage=navigateAwayStack[navigateAwayStack.length-1];var baseUrl=parent.ArcherApp.globals.baseUrl;var permissionsCheck=baseUrl+'/api/V2/internal/TaskPermissions/CheckTaskAccess';parent.Ext.Ajax.request({url:permissionsCheck,method:'POST',jsonData:{TaskAccessRequest:{PageHitTaskNum:'module',TaskNumbers:['module','i2138']}},success:function(conn,response,options,eOpts){var response=JSON.parse(conn.responseText);if(!(response.value[0].HasRead&&response.value[1].HasRead)){showUnauthorizedMessagePrompt();}
else{if(lastPage!=null){if(lastPage.contentKey!=null&&lastPage.dirtyContentTitle!=null&&lastPage.dirtyContentWarning!=null){if(parent.ArcherInterface.isDirtyContentExtJS(lastPage.contentKey)){parent.Ext.Msg.show({title:lastPage.dirtyContentTitle,msg:lastPage.dirtyContentWarning,buttons:parent.Ext.Msg.OKCANCEL,fn:function(btn){if(btn=='ok'){redirectionForAuthSources(recordId);}
else{if(parent.Ext&&parent.Ext.getBody()){parent.Ext.getBody().unmask();}}},});}else{redirectionForAuthSources(recordId);}}else{redirectionForAuthSources(recordId);}}else{redirectionForAuthSources(recordId);}}},failure:function(){var validationErrorMessages=parent.ArcherTech.UI.GenericContent.GetInstance()._validationErrorMessages;var title=validationErrorMessages['warning'];parent.WarningAlert('Unexpected failure.',title);}});}
else if(location.pathname.search('IViewSearchResults.aspx')==-1){if(location.pathname.search('WorkspaceDashboard.aspx')!=-1){var arguments=Sys.Serialization.JavaScriptSerializer.deserialize(args);if(arguments&&arguments.a&&arguments.a.length>0&&arguments.a[0].Key=='multiReport'){var combo=$('#'+arguments.a[0].Value+'_reportsList');if(combo.length>0&&combo[0].control){var selected=combo[0].control.get_selectedItem();if(selected){var value=selected.get_value();if(value){var itemValues=value.split(';');if(itemValues.length==4){var isAdmin=itemValues[2];var reportId=itemValues[3];if(isAdmin=='False'){args='{"a":[{"Key":"reportId","Value":"'+reportId+'"}],"e":"displayreport"}';}
else{args='{"a":[{"Key":"adminReportId","Value":"'+reportId+'"}],"e":"displayreport"}';}}}}}}}
if(location.pathname.search('Search.aspx')!=-1){if(parent.Ext&&parent.ArcherApp)parent.Ext.getBody().mask(parent.ArcherApp.locales.get('app.loading_msg'));}
$pbMain(args,controlId);}
else{if(parent&&parent.parent&&parent.parent.ArcherInterface){parent.parent.ArcherInterface.redirectFromiView();}
if(args.search('sortcol')!=-1){$pbMain(args,controlId);}
else{this.parent.dashboard.invalidateIView($('#iviewIdHf').val());this.parent.$pbMain(args,controlId);}}}}
function $pbC(args){if(this.frames['master-content-container-scroll']!=null){$('.master-form').scrollTop().value=this.frames['master-content-container-scroll'].scrollTop;}
$pb(__FormatCondensedpb(args),'master-content-container');}
function $pbX(args){$pb(__FormatCondensedpb(args));}
function __FormatCondensedpb(args){var argArray=args.split('|',4);var recordId=argArray[0]||'';var moduleId=argArray[1]||'';var levelId=argArray[2]||'';var sourceId=argArray[3]||'';var keywords=argArray[4]||'';var str='{"a":[{"Key":"recid","Value":"{0}"},{"Key":"moduleId","Value":"{1}"},{"Key":"levelid","Value":"{2}"},{"Key":"sourceId","Value":"{3}"},{"Key":"keywords","Value":"{4}"}],"e":"recdrillin"}';return str.replace('{0}',recordId).replace('{1}',moduleId).replace('{2}',levelId).replace('{3}',sourceId).replace('{4}',encodeURIComponent(keywords));}
function $submit(eventtarget,eventargument){$sv('__EVENTARGUMENT',eventargument);$sv('__EVENTTARGET',eventtarget);document.forms[0].submit();}
function $nf(uri){if(parent.ArcherInterface){parent.ArcherInterface.redirectFromiView();}
$submit('NavigateUri',uri);}
function getParameter(parameterName){var queryString=window.top.location.search.substring(1);var parameterName=parameterName+'=';if(queryString.length>0){begin=queryString.indexOf(parameterName);}
if(begin!=-1){begin+=parameterName.length;end=queryString.indexOf('&',begin);}
if(end==-1){end=queryString.length;}
return unescape(queryString.substring(begin,end));}
var __eventListeners=[];function addCustomEventListener(instance,eventName,listener){var listenerFn=listener;if(instance.addEventListener){instance.addEventListener(eventName,listenerFn,false);}
else if(instance.attachEvent){listenerFn=function(){listener(window.event);};instance.attachEvent('on'+eventName,listenerFn);}
else{throw new Error('Event registration not supported');}
var event={instance:instance,name:eventName,listener:listenerFn};__eventListeners.push(event);return event;}
function removeCustomEventListener(event){var instance=event.instance;if(instance.removeEventListener){instance.removeEventListener(event.name,event.listener,false);}
else if(instance.detachEvent){instance.detachEvent('on'+event.name,event.listener);}
for(var i=0;i<__eventListeners.length;i++){if(__eventListeners[i]==event){__eventListeners.splice(i,1);break;}}}
function unregisterAllCustomEvents(){while(__eventListeners.length>0){removeEventListener(__eventListeners[0]);}}
var getElementsByClassName=function(className,tag,elm){if(document.getElementsByClassName){getElementsByClassName=function(className,tag,elm){elm=elm||document;var elements=elm.getElementsByClassName(className),nodeName=(tag)?new RegExp('\\b'+tag+'\\b','i'):null,returnElements=[],current;for(var i=0,il=elements.length;i<il;i+=1){current=elements[i];if(!nodeName||nodeName.test(current.nodeName)){returnElements.push(current);}}
return returnElements;};}
else if(document.evaluate){getElementsByClassName=function(className,tag,elm){tag=tag||'*';elm=elm||document;var classes=className.split(' '),classesToCheck='',xhtmlNamespace='http://www.w3.org/1999/xhtml',namespaceResolver=(document.documentElement.namespaceURI===xhtmlNamespace)?xhtmlNamespace:null,returnElements=[],elements,node;for(var j=0,jl=classes.length;j<jl;j+=1){classesToCheck+='[contains(concat(\' \', @class, \' \'), \' '+classes[j]+' \')]';}
try{elements=document.evaluate('.//'+tag+classesToCheck,elm,namespaceResolver,0,null);}
catch(e){elements=document.evaluate('.//'+tag+classesToCheck,elm,null,0,null);}
while((node=elements.iterateNext())){returnElements.push(node);}
return returnElements;};}
else{getElementsByClassName=function(className,tag,elm){tag=tag||'*';elm=elm||document;var classes=className.split(' '),classesToCheck=[],elements=(tag==='*'&&elm.all)?elm.all:elm.getElementsByTagName(tag),current,returnElements=[],match;for(var k=0,kl=classes.length;k<kl;k+=1){classesToCheck.push(new RegExp('(^|\\s)'+classes[k]+'(\\s|$)'));}
for(var l=0,ll=elements.length;l<ll;l+=1){current=elements[l];match=false;for(var m=0,ml=classesToCheck.length;m<ml;m+=1){match=classesToCheck[m].test(current.className);if(!match){break;}}
if(match){returnElements.push(current);}}
return returnElements;};}
return getElementsByClassName(className,tag,elm);};function ArcherRadTimePickerAMPMOnClick(){setTimeout('var amOrpm = $get(\''+window.event.srcElement.id+'\'); amOrpm.checked = !amOrpm.checked ; if(!amOrpm.checked)$get(\''+arguments[0]+'\').children[0].checked = true;',75);}
function ShowValidationMessages(jsonRequestResult,title,defaultMsg){if(!jsonRequestResult.ValidationMessages||jsonRequestResult.ValidationMessages.length===0){return false;}
var msgString='';for(var i=0;i<jsonRequestResult.ValidationMessages.length;i++){var valMsg=jsonRequestResult.ValidationMessages[i];if(valMsg.ResourcedMessage&&valMsg.ResourcedMessage.length>0)
msgString+=valMsg.ResourcedMessage+'<br/>';}
if(!title)
title='Warning';if(!msgString)
msgString=defaultMsg;if(!msgString)
msgString='Unhandled error.';WarningAlert(msgString,title);return true;}
function WarningAlert(msg,title,width,height,callWarningFromParent){if($nu(width)){width=410;}
if($nu(height)){height=130;}
if(callWarningFromParent){var m=parent.GetRadWindowManager();var w=m._getStandardPopup('alert',msg);w.set_title(title);w.setSize(width?width:280,height?height:200);w.center();w.show();}
else{if(!window.radalert){parent.radalert(msg,width,height,'<strong>'+title+'</strong>');}
else{msg='<a id="ariaAnchorTag" tabindex = "0" aria-live ="assertive" style = "outline: none;">'+msg+'</a>';var radalertWindow=radalert(msg,width,height,'<strong>'+title+'</strong>');radalertWindow.ui.container.setAttribute('role','dialog');radalertWindow.ui.container.setAttribute('aria-label','Warning');var contentFrame=radalertWindow.GetContentFrame();$('#ariaAnchorTag').focus();if(contentFrame){contentFrame.title='Empty';}}}}
function ShowWarningAlertMessages(messages,title,callWarningFromParent){if(messages==null){messages=window['WarningAlertMessages'];window['WarningAlertMessages']=null;}
try{if(messages!=null){WarningAlert(messages.join('<br />'),title,null,null,callWarningFromParent);}}
catch(err){}}
function EngageWarningAlert(msg,title,buttonId,portalStatus,width,height,callWarningFromParent){if($nu(width)){width=410;}
if($nu(height)){height=130;}
if(callWarningFromParent){var m=parent.GetRadWindowManager();var w=m._getStandardPopup('alert',msg);w.set_title(title);w.setSize(width?width:280,height?height:200);w.center();w.show();}else{if(!window.radalert){parent.radalert(msg,width,height,'<strong>'+title+'</strong>');}else{msg='<a id="ariaAnchorTag" tabindex="0" aria-live="assertive" style="outline: none;">'+msg+'</a>';var radalertWindow=radalert(msg,width,height,'<strong>'+title+'</strong>');radalertWindow.ui.container.setAttribute('role','dialog');radalertWindow.ui.container.setAttribute('aria-label','Warning');var contentFrame=radalertWindow.GetContentFrame();$('#ariaAnchorTag').focus();var okButton=document.getElementById('AlertOkbuttonID');var closeButtons=document.getElementsByClassName('rwCloseButton');if(okButton){okButton.addEventListener('click',function(){var concatenatedErrorAndGuid='Error'+'|'+portalStatus;__doPostBack(buttonId,concatenatedErrorAndGuid);});}
if(closeButtons.length>0){for(var i=0;i<closeButtons.length;i++){closeButtons[i].addEventListener('click',function(){var concatenatedErrorAndGuid='Error'+'|'+portalStatus;__doPostBack(buttonId,concatenatedErrorAndGuid);});}}
if(contentFrame){contentFrame.title='Empty';}}}}
function WarningConfirm(msg,confirmedCallback,title,width,height){if($nu(width)){width=500;}
if($nu(height)){height=130;}
var radconfirmWindow=radconfirm(msg,confirmedCallback,width,height,null,'<b aria-label=\''+title+'\'>'+title+'</b>');var contentFrame=radconfirmWindow.GetContentFrame();if(contentFrame){contentFrame.title='Empty';}}
function __ElementMaxWidth(width,elemId){var deleg=Function.createDelegate(window,__BrowserResize);$addHandler(window,'resize',deleg);var maxWidthElems=window['maxWidthElems'];if($nu(maxWidthElems)){maxWidthElems=[];window['maxWidthElems']=maxWidthElems;}
maxWidthElems.push({element:$get(elemId),maxWidth:width});__BrowserResize(null);}
function __BrowserResize(ev){var maxWidthElems=window['maxWidthElems'];var w=document.body.offsetWidth;for(var idx=0;idx<maxWidthElems.length;idx++){var mwo=maxWidthElems[idx];if(w>mwo.maxWidth&&$nu(mwo.lastWidth)){var lastWidth=mwo.element.style.width;if(lastWidth==null||lastWidth==''){lastWidth='auto';}
mwo.lastWidth=lastWidth;mwo.element.style.width=mwo.maxWidth+'px';}
else if(w<=mwo.maxWidth&&mwo.lastWidth){mwo.element.style.width=mwo.lastWidth;mwo.lastWidth=null;}}}
function HideRadWindow(win){if(win._modalExtender){window.setTimeout(function(){win._modalExtender.hide();},10);}
win.hide();}
function MM_openBrWindow(theURL,winName,features,hash){popupWindow=window.open(theURL,winName,features);try{if(popupWindow.addEventListener)
popupWindow.addEventListener('load',function(){popupWindow.location.hash=hash;});else if(popupWindow.attachEvent)
popupWindow.attachEvent('onload',function(){popupWindow.location.hash=hash;});popupWindow.focus();}
catch(e){}}
function NavigateTo(url){document.forms[0].action=url;document.forms[0].submit();}
Array.find=function(array,predicate){for(var i=0;i<array.length;i++){var item=array[i];if(typeof(item)!=='undefined'&&predicate(item,i)){return item;}}
return null;};Array.findAndRemove=function(array,predicate){var foundIndex=-1;for(var i=0;i<array.length;i++){var item=array[i];if(typeof(item)!=='undefined'&&predicate(item)){foundIndex=i;break;}}
if(foundIndex>=0){array.splice(foundIndex,1);}};function csp(evt){if(!evt){evt=window.event;}
var sudevent=new Sys.UI.DomEvent(evt);sudevent.stopPropagation();}
function jq_watermark_plugin(wmText){var replace=true;this.each(function(i){this._setWatermark=function(){if(this.value==null||this.value==''||replace&&this.waterMark==this.value){this.value=wmText;this.waterMark=wmText;replace=false;}};var jqo=$(this);jqo.blur(function(){this._setWatermark();});jqo.focus(function(){if(this.value==wmText){this.value='';}});this._setWatermark();});}
function jq_truncate_plugin(options){var defaults={length:270,minTrail:20,moreText:'more',lessText:'less',ellipsisText:'...',moreAni:'',lessAni:''};var options=$.extend(defaults,options);return this.each(function(){obj=$(this);var body=obj.html();if(body.length>options.length+options.minTrail){var splitLocation=body.indexOf(' ',options.length);if(splitLocation!=-1){var splitLocation=body.indexOf(' ',options.length);var str1=body.substring(0,splitLocation);var str2=body.substring(splitLocation,body.length-1);obj.html(str1+'<span class="truncate_ellipsis">'+options.ellipsisText+'</span>'+'<span class="truncate_more">'+str2+'</span>');obj.find('.truncate_more').css('display','none');obj.append('<a href="#" class="truncate_more_link EllipsisContent">'+options.moreText+'</a>');var moreLink=$('.truncate_more_link',obj);var moreContent=$('.truncate_more',obj);var ellipsis=$('.truncate_ellipsis',obj);moreLink.click(function(){if(moreLink.text()==options.moreText){moreContent.show(options.moreAni);moreLink.text(options.lessText);ellipsis.css('display','none');}
else{moreContent.hide(options.lessAni);moreLink.text(options.moreText);ellipsis.css('display','inline');}
return false;});}}});}
function GetReorderedValues(sender,args){var field=$('#'+'reorderedValues')[0];if(!$nu(field)){var columnOrder=[];var columns=args.get_gridColumn().get_owner().get_columns();for(i=0;i<columns.length;i++){var columnId=columns[i].get_uniqueName();if(!isNaN(columnId)){columnOrder.push(columnId);}}
field.value=columnOrder;}}
function ShowUserProfilePopup(url,title,iframeTitle){var windowMngr=null;var sizingElement=null;var isOnMasterPage=location.pathname.search('Record.aspx')>0||location.pathname.search('Search.aspx')>0;if(!isOnMasterPage){try{windowMngr=parent.GetRadWindowManager();sizingElement=parent.document.documentElement;}
catch(err){}}
if($nu(windowMngr)){try{windowMngr=GetRadWindowManager();sizingElement=document.documentElement;}
catch(err){}}
if(!$nu(windowMngr)){var window=windowMngr.open(null,'UserProfilePopupWindow');if(!$nu(window)){if(isOnMasterPage||location.pathname.search('ValueSelectorPopup.aspx')>0){window.set_restrictionZoneID('master_windowContainer');}
else{window.set_restrictionZoneID('windowContainer');}
SetupRadWindow(window,$(sizingElement).width()-40,$(sizingElement).height()-40,iframeTitle);window.setUrl(url);window.show();}}}
function ShowCalcError(url,title,iframeTitle){var windowMngr=GetRadWindowManager(),width=document.body.offsetWidth-40,height=document.body.offsetHeight-40,urlx=url+'&frameHeight='+Math.max(height-86,200),win=windowMngr.open(urlx,'CalcErrorWindow',undefined,width,height);if(win){win.set_title(title);win.set_destroyOnClose(true);if(iframeTitle){var contentFrame=win.GetContentFrame();if(contentFrame){contentFrame.title=iframeTitle;}}}}
function ShowContentInRadWindow(content,windowTitle,windowWidth,windowHeight,isUrl,iframeTitle){if(!isUrl&&typeof(content)=='string'){content=$('#'+content);if(content.length==0){alert('No content was found for the id:\''+content+'\'.');}}
var windowMngr=GetRadWindowManager();var window=windowMngr.getWindowByName('ContentWindow');if(window==null){window=windowMngr.open('','ContentWindow');}
if(iframeTitle){var contentFrame=window.GetContentFrame();if(contentFrame){contentFrame.title=iframeTitle;}}
var contentRegion;if(!isUrl){contentRegion=$('#RadWindowWrapper_ContentWindow').find('.rwWindowContent').empty();}
window.set_width(windowWidth);window.set_height(windowHeight);window.set_title(windowTitle);window.set_modal(true);window.Center();window.set_destroyOnClose(true);if(location.pathname.search('WorkspaceDashboard.aspx')==-1){window.set_restrictionZoneID('master_windowContainer');}
else{window.set_restrictionZoneID('windowContainer');}
if(isUrl){window.setUrl(content);}
else{contentRegion.append(content.clone());}
if(location.pathname.search('WorkspaceDashboard.aspx')==-1&&content.indexOf('Shared/ReportSelectorPopup.aspx')!==-1){$('#RadWindowWrapper_ContentWindow').css({'height':windowHeight+'px'});$('#RadWindowWrapper_ContentWindow').css({'top':0+'px'});window.set_behaviors(Telerik.Web.UI.WindowBehaviors.Close+Telerik.Web.UI.WindowBehaviors.Move);}
return window;}
function ShowReportPropertiesInRadWindow(content,windowTitle,windowWidth,windowHeight,iframeTitle){var windowMngr=GetRadWindowManager();var window=windowMngr.getWindowByName('ContentWindow');if(window==null){window=windowMngr.open('','ContentWindow');}
SetupRadWindow(window,windowWidth,windowHeight,iframeTitle);window.set_title(windowTitle);window.setUrl(content);}
function ShowExportWindow(url,reportViewer,iframeTitle){var windowMngr=GetRadWindowManager();if(!windowMngr||windowMngr&&windowMngr.get_windows().length==0){windowMngr=parent.GetRadWindowManager();}
var window=windowMngr.open(url,'ExportWindow');if(window!=null){if(reportViewer){window.ReportViewer=reportViewer;}
SetupRadWindow(window,600,400,iframeTitle);var windowTtl=$(window.GetTitlebar()).find('em').attr('role','heading');window._buttonsArray[0].focus();if(location.pathname.search('WorkspaceDashboard.aspx')==-1){window.set_restrictionZoneID('master_windowContainer');}
else{window.set_restrictionZoneID('windowContainer');}}}
function ShowExportReportCreationWindow(url,iframeTitle){var windowMngr=GetRadWindowManager();var Index=url.indexOf('exportFrom');if(!windowMngr||windowMngr&&windowMngr.get_windows().length==0&&Index==-1){windowMngr=parent.GetRadWindowManager();}
var window=windowMngr.open(url,'ExportReportCreationWindow');if(window!=null){SetupRadWindow(window,400,200,iframeTitle);window._titleElement.setAttribute('role','heading');}}
function showOptions(url,iframeTitle){var optionsConfirmed=function(arg,param){if(arg&&!$nu(arg.argument)){url+='&et='+arg.argument;ShowExportReportCreationWindow(url);}};var wnd=GetArcherWindow('../GenericContent/Options.aspx?type=2','optionsDialog',250,550,iframeTitle);wnd.set_clientCallBackFunction(optionsConfirmed);}
function ShowDownloadFileWindow(url){var windowMngr=GetRadWindowManager();if(!windowMngr||windowMngr&&windowMngr.get_windows().length==0){windowMngr=parent.GetRadWindowManager();}
var window=windowMngr.open(url,'DownloadFileWindow');if(window!=null){SetupRadWindow(window,370,140,'Download Dialog');}}
function ExportSystemReport(format){var reportViewer=window.ReportViewer;if(reportViewer==null){reportViewer=parent.window.ReportViewer;}
if(reportViewer){reportViewer.SaveToDisk(format);window.close();}}
function UpdatePagingInfo(s,e){var sysReportMenu=$('.dxmMenu');var currentPageLabel=$('#master_SysReportToolbar_Menu_ITCNT3_ctl00');var totalPageCountLabel=$('#master_SysReportToolbar_Menu_ITCNT5_ctl00');if(sysReportMenu){sysReportMenu.css('background-color','white');sysReportMenu.css('border','none');}
if(currentPageLabel&&totalPageCountLabel){var currentPage=e.PageCount==0?e.PageCount:e.PageIndex+1;currentPageLabel.text(currentPage);totalPageCountLabel.text(e.PageCount);}}
function ToggleTextOfItem(elm,firstWord,secondWord,iviewId){elm=$(elm),iviewId=$(iviewId).attr('id');var currentTxt=elm.text();if(currentTxt==firstWord){elm.text(secondWord);}
else{elm.text(firstWord);}
setTimeout(function(){$('#'+iviewId).find('.acc-hide-text').focus();},0);}
var contentPane=null;var workspaceController=null;function n(src){var completeClick=function(continueAction){if(continueAction){clearAllDirtyContent();n(src);}};if(isDirtyContent()){showConfirmationPrompt(completeClick);return;}
if($nu(workspaceController)){if(!$nu(window.WorkspaceController)){workspaceController=window.WorkspaceController;}
else if(!$nu(parent.window.WorkspaceController)){workspaceController=parent.window.WorkspaceController;}}
if($nu(contentPane)&&!$nu(workspaceController)){contentPane=workspaceController.get_ContentPane();}
if(!$nu(contentPane)){var sourceUrl=src.toLowerCase();var isSearchPage=sourceUrl.indexOf('search.aspx')!=-1;if(document.URL.toLowerCase().indexOf('workspace.aspx')!=-1&&(isSearchPage||sourceUrl.indexOf('dataimportmanager.aspx')!=-1||sourceUrl.indexOf('record.aspx')!=-1)){var stateId=null;if(sourceUrl.indexOf('pr')==-1){try{stateId=contentPane.getExtContentElement().contentWindow.document.getElementById('__RS').value;}catch(err){stateId=null;}
if(!$nu(stateId)){src+='&pr='+stateId;}}
if(isSearchPage&&!$nu(workspaceController)){src+='&frameWidthHeight='+workspaceController.get_ContentPaneWidth()+','+workspaceController.get_ContentPaneHeight();}}
var contentPaneIframe=contentPane.getExtContentElement(),contentPaneIframeTitle='';if(contentPaneIframe){contentPaneIframeTitle=contentPaneIframe.title;}
contentPane._extContentElement=null;contentPane.set_contentUrl(src);contentPaneIframe=contentPane.getExtContentElement();if(contentPaneIframe){contentPaneIframe.title=contentPaneIframeTitle;}}}
function wo(l){window.open(l);}
jQuery.format=function jQuery_dotnet_string_format(text){if(arguments.length<=1){return text;}
var tokenCount=arguments.length-2;for(var token=0;token<=tokenCount;++token){text=text.replace(new RegExp('\\{'+token+'\\}','gi'),arguments[token+1]);}
return text;};if(window.jQuery){jQuery.fn.extend({watermark:jq_watermark_plugin,truncate:jq_truncate_plugin});}
function ScrubHtmlFromExportWarning(title,url,scrubType,iframeTitle){var scrubConfirmed=function(arg,param){if(arg&&!$nu(arg.argument))
{if(arg.argument==true){url+='&exportOption='+scrubType;}
ShowExportReportCreationWindow(url,iframeTitle);}};var wnd=GetArcherWindow('../GenericContent/AgreeOptionsDialog.aspx?exportOption='+scrubType,'ScrubDialog',180,550,iframeTitle);wnd.SetTitle(title);$(wnd._titleElement).attr('role','heading');wnd.set_clientCallBackFunction(scrubConfirmed);}
function GetEmailClientWindow(url,name,height,width,iframeTitle){GetArcherWindow(url+'&height='+height+'&width='+width,name,height,width,iframeTitle);}
function ShowVisualizer(id){var isInPopup=window.location.pathname.toLowerCase().match(/iview/g)!=null,title=_localizedResources['relvisTitle'],containerSelector=isInPopup?parent.window:window,height=$(containerSelector).height()-40,width=$(containerSelector).width()-40,visUrl='../apps/vis/vis.aspx?contentId='+id,wndw=null;if(isInPopup){wndw=parent.GetArcherWindow(visUrl,title,height,width,title);}
else{wndw=GetArcherWindow(visUrl,title,height,width,title);}
wndw._titleElement.setAttribute('role','heading');}
function GetArcherWindow(url,name,height,width,iframeTitle){var manager=GetRadWindowManager();if(manager){if($nu(url)){url=parent.parent.ArcherApp.globals.baseUrl+'/Shared/Blank.html';}
var window=manager.open(url,name);SetupRadWindow(window,width,height,iframeTitle);return window;}
return null;}
function ShowDiscussionWindow(contentId,fieldId,levelId,iframeTitle,windowTitle){var sizingElement=$(document.documentElement);var windowMngr=GetRadWindowManager();var window=windowMngr.getWindowByName('ContentWindow');var url='../Discussion/DiscussionTopics.aspx?contentId='+contentId+'&fieldId='+fieldId+'&levelId='+levelId;if(window==null){window=windowMngr.open(url,'ContentWindow');}
else{window.setUrl(url);}
SetupRadWindow(window,sizingElement.width()-20,sizingElement.height()-20,iframeTitle);window.set_title(windowTitle+': '+contentId);window.show();}
function SetupRadWindow(window,width,height,iframeTitle){if($nu(height)){height=400;}
if($nu(width)){width=600;}
if(iframeTitle){window.set_title(iframeTitle);var contentFrame=window.GetContentFrame();if(contentFrame){contentFrame.title=iframeTitle;}}
window.set_restrictionZoneID(null);window.setSize(width,height);window.center();window.set_restrictionZoneID(window.get_restrictionZoneID());window.set_modal(true);window.set_visibleStatusbar(false);window.set_behaviors(Telerik.Web.UI.WindowBehaviors.Move+Telerik.Web.UI.WindowBehaviors.Close);window.set_destroyOnClose(true);}
function ShowDescription(url,title,iframeTitle){var w=GetArcherWindow(url,null,150,510,iframeTitle);if(w){w.set_title(title);}}
var workflowReassignHiddenField;function workflowReassignOnClick(workflowReAssignmentSelectorUrl,assigneesFieldId,isEditMode,selectedUsers,reviewerSelectionRequiredWarningMessage,reviewerSelectionRequiredWarningTitle){var _workflowReassignPopupWindow;var hiddenFieldId='workflowReAssignmentSelectorState';if($nu(workflowReassignHiddenField)){$mh(hiddenFieldId,Sys.Serialization.JavaScriptSerializer.serialize(selectedUsers),document.forms[0]);}
_workflowReassignPopupWindow=GetRadWindowManager().open(null,'workflowReassign');_workflowReassignPopupWindow.set_visibleStatusbar(false);_workflowReassignPopupWindow.set_modal(true);_workflowReassignPopupWindow.setBounds({x:0,y:0,width:670,height:400});_workflowReassignPopupWindow.center();_workflowReassignPopupWindow.set_destroyOnClose(true);_workflowReassignPopupWindow.setUrl(workflowReAssignmentSelectorUrl);_workflowReassignPopupWindow.Argument=function(a,ugc){var groupList=[];var userList=[];if(a){$.each(a,function(){if(this.itemType==3){groupList.push(this.itemId);}
if(this.itemType==6){userList.push(this.itemId);}});}
if(groupList.length==0&&userList.length==0){WarningAlert(reviewerSelectionRequiredWarningMessage,reviewerSelectionRequiredWarningTitle);return;}
var _plpbea=new PreLoadPostBackEventArgument();_plpbea.set_e('workflowReassign');var _keyValuePairGroupList=new KeyValuePair();var _keyValuePairUserList=new KeyValuePair();var _keyValuePairassigneesFieldId=new KeyValuePair();var _keyValuePairworkflowReassignisEditMode=new KeyValuePair();_keyValuePairGroupList.set_Key('groupList');_keyValuePairGroupList.set_Value(groupList.join(','));_keyValuePairUserList.set_Key('userList');_keyValuePairUserList.set_Value(userList.join(','));_keyValuePairassigneesFieldId.set_Key('assigneesFieldId');_keyValuePairassigneesFieldId.set_Value(assigneesFieldId);_keyValuePairworkflowReassignisEditMode.set_Key('workflowReassignisEditMode');_keyValuePairworkflowReassignisEditMode.set_Value(isEditMode);if(groupList.length>0)_plpbea.get_a().push(_keyValuePairGroupList);if(userList.length>0)_plpbea.get_a().push(_keyValuePairUserList);_plpbea.get_a().push(_keyValuePairassigneesFieldId);_plpbea.get_a().push(_keyValuePairworkflowReassignisEditMode);var animationOptions=ArcherTech.UI.GenericContent.GetInstance().get_loadingAnimationOptions();$('body').loadingAnimation({title:animationOptions.loading,text:animationOptions.saving,image:animationOptions.image});if(isEditMode){$pb(Sys.Serialization.JavaScriptSerializer.serialize(_plpbea),'master$btnSave');}
else{$pb(Sys.Serialization.JavaScriptSerializer.serialize(_plpbea));}};}
PreLoadPostBackEventArgument=function(){this.a=[];this.e='';};PreLoadPostBackEventArgument.prototype={get_e:function(){return this.e;},set_e:function(val){this.e=val;},get_a:function(){return this.a;},set_a:function(val){this.a=val;}};KeyValuePair=function(){Key='';Value='';};KeyValuePair.prototype={get_Key:function(){return this.Key;},set_Key:function(val){this.Key=val;},get_Value:function(){return this.Value;},set_Value:function(val){this.Value=val;}};function workflowReviewAction(action,isEditMode,isQuestionare){var animationOptions=ArcherTech.UI.GenericContent.GetInstance().get_loadingAnimationOptions();$('body').loadingAnimation({title:animationOptions.loading,text:animationOptions.saving,image:animationOptions.image});var str='{"a":[{"Key":"workflowReviewAction","Value":"{0}"},{"Key":"workflowReviewisEditMode","Value":"{1}"}],"e":"workflowReview"}';str=str.replace('{0}',action||'').replace('{1}',isEditMode||'false');if(isEditMode){$pbMain(str,'master$btnSave');}
else{$pbMain(str);}
return false;}
Sys.WebForms.PageRequestManager.getInstance().add_pageLoading(function(sender,args){var updatedPanels=args.get_panelsUpdating();var deletedPanels=args.get_panelsDeleting();for(var i=0;i<updatedPanels.length;i++){if(updatedPanels[i]){$.cleanData(updatedPanels[i].getElementsByTagName('*'));}}
for(var i=0;i<deletedPanels.length;i++){if(deletedPanels[i]){$.cleanData(deletedPanels[i].getElementsByTagName('*'));}}});$(document).bind('ajaxError',function(event,XMLHttpRequest,ajaxOptions,thrownError){if(XMLHttpRequest.status==401){__doPostBack('','');}});$(document).ready(function(){function removeAltOnFocus(){$(this).find('img').removeAttr('alt');}
$(document).on('focusin','.SectionExpandCollapse',removeAltOnFocus);});function ToggleSectionVisiblity(collapsedStateId,postControlId,commandItemsId,contentRowId,footerRowId,tableId,anchorId,collapsedClass){var collapsedStateElement=null;var commandItems=null;var contentRow=null;var footerRow=null;var table=null;var anchor=null;if(collapsedStateId!=null&&collapsedStateId.length>0){collapsedStateElement=$('#'+collapsedStateId);}
else{return;}
if(collapsedStateElement.length==0){return;}
if(contentRowId!=null&&contentRowId.length>0){contentRow=$('#'+contentRowId);}
if(contentRow.length==0){if(postControlId==null||postControlId.length==0){return;}
collapsedStateElement.val(false);__doPostBack(postControlId,'');}
else{if(commandItemsId!=null&&commandItemsId.length>0){commandItems=$('#'+commandItemsId);}
if(footerRowId!=null&&footerRowId.length>0){footerRow=$('#'+footerRowId);}
if(tableId!=null&&tableId.length>0){table=$('#'+tableId);}
if(anchorId!=null&&anchorId.length>0){anchor=$('#'+anchorId);}
if((commandItems==null&&commandItemsId.length>0)||contentRow.length==0||footerRow.length==0||table.length==0||anchor.length==0){return;}
var collapsed=collapsedStateElement.val()=='true';if(collapsed){collapsed=false;if(commandItems!=null){commandItems.show();}
contentRow.show();footerRow.show();table.removeClass(collapsedClass);anchor.attr('aria-expanded','true');contentRow.trigger('isVisible');RunReportObjects(table);}
else{collapsed=true;if(commandItems!=null){commandItems.hide();}
contentRow.hide();footerRow.hide();table.addClass(collapsedClass);anchor.attr('aria-expanded','false');}
anchor.find('img').removeAttr('alt');collapsedStateElement.val(collapsed);}}
function ToggleSubSectionVisiblity(collapsedStateId,ContentPanelId,tableId,spanId,collapsedClass){var contentPanel=null;var collapsedStateElement=null;var table=null;var span=null;if(collapsedStateId!=null&&collapsedStateId.length>0){collapsedStateElement=$('#'+collapsedStateId);}
else{return;}
if(ContentPanelId!=null&&ContentPanelId.length>0){contentPanel=$('#'+ContentPanelId);}
if(collapsedStateElement.length==0){return;}
if(tableId!=null&&tableId.length>0){table=$('#'+tableId);}
if(spanId!=null&&spanId.length>0){span=$('#'+spanId);}
var collapsed=collapsedStateElement.val()=='true';if(collapsed){collapsed=false;contentPanel.show();table.removeClass(collapsedClass);span.attr('aria-expanded','true');}
else{collapsed=true;contentPanel.hide();table.addClass(collapsedClass);span.attr('aria-expanded','false');}
collapsedStateElement.val(collapsed);}
function isDirtyContent(contentId){if(contentId==undefined){return $('.dirtyContent').length>0;}
else{return $('.dirtyContent[data-dirtyContentId='+contentId+']').length>0;}}
function clearDirtyContent(contentId){var last=$('.dirtyContent').last();if(last&&last.attr('data-dirtyContentId')==contentId){last.remove();}
unlockContent(contentId);}
function clearAllDirtyContent(currentContentId){var skipCurrent=false;$('.dirtyContent').each(function(){$(this).remove();var contentId=$(this).attr('data-dirtyContentId');unlockContent(contentId);if(contentId==currentContentId)
skipCurrent=true;});if(skipCurrent===false&&currentContentId!=undefined)
unlockContent(currentContentId);}
function unlockContent(contentId){contentId=extractContentId(contentId);$.ajax({url:'../api/core/content/unlock/'+contentId,type:'POST'});}
function extractContentId(value){var i=value.toString().indexOf('_');if(i>0)
return value.substring(0,i);else
return value;}
function setDirtyContent(contentId,title,message){var last=$('.dirtyContent').last();if(!last||last.attr('data-dirtyContentId')!=contentId){$('<input>').attr({'type':'hidden','class':'dirtyContent','data-dirtyContentId':contentId,'data-title':title,'data-message':message}).appendTo('form');}}
function showConfirmationPrompt(handler){if(parent.ArcherApp){var navigateAway=parent.ArcherApp.globalNavigateAway;var lastPage=navigateAway[navigateAway.length-1];if(lastPage){WarningConfirm(lastPage.dirtyContentWarning,handler,lastPage.dirtyContentTitle,500,200);}}}
function ReportRouter(reportId,moduleId){var data=parent.parent.Ext.JSON.encode({appId:moduleId,reportId:reportId}),route='reports/'+parent.parent.BaseRsa.encode(data);parent.parent.ArcherInterface.redirectToView(route,undefined,{force:true});}
$(function(){$('.atsLink, .TopMenuLink').each(function(){var curLink=$(this);if(!curLink.attr('data-check-dirty')&&!curLink.hasClass('tabs-full-toggle')){curLink.attr('data-check-dirty',true);var newLink=curLink.clone();if(!curLink.hasClass('TopMenuLink')){newLink.attr('href','#');}
newLink.insertBefore(curLink);curLink.hide();newLink.click(function(event){var completeClick=function(continueAction){if(continueAction){clearAllDirtyContent(curLink.context.ownerDocument.ContentPane._contentKey);event.preventDefault();if(document.createEvent){var mouseClickEvent=document.createEvent('MouseEvents');mouseClickEvent.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);curLink.get(0).dispatchEvent(mouseClickEvent);}
else if(document.createEventObject){curLink.get(0).click();}}};if(isDirtyContent()){showConfirmationPrompt(completeClick);return false;}
else{completeClick(true);}});}});});function removeFocusedClass(id)
{var item=document.getElementById(id);if(item&&item.classList.contains('rmFocused'))
{document.getElementById(id).className=item.className.replace('rmFocused','');}}
function ShowDashboardExportCreationWindow(url,iframeTitle){removeFocusedClass('ExportDashboardItem');removeFocusedClass('ExportDashboardItemPPTX');var reportIds='';var $iViews=$('#iViews').val();var $iViewIds=$('#iViewIds').val();if($iViews==''||$iViewIds==''){WarningAlert('No reports present to export!','Export dashboard');document.getElementsByClassName('rwCloseButton')[0].addEventListener('click',function(){$('#workSpaceOptionsMenu').focus();});$('.AlertButtonCell a').bind('click',function(){$('#workSpaceOptionsMenu').focus();});return;}
var iViewIdList=$iViewIds.split(',');var iviewReportsMap={};var iViewList=$iViews.split(',');for(var i in iViewList){if(iViewList[i].indexOf('|')!=-1){var iviewReportId=iViewList[i].split('|');iviewReportsMap[iviewReportId[0]]=iviewReportId[1];reportIds+=iviewReportId[1]+',';}
else{var $combo=$('#iview'+iViewList[i]+'_reportsList');if($combo.length>0&&$combo[0].control){var selected=$combo[0].control.get_selectedItem();if(selected){var value=selected.get_value();if(value){var itemValues=value.split(';');if(itemValues.length==4){var reportId=itemValues[3];reportIds+=reportId+',';iviewReportsMap[iViewList[i]]=reportId;}}}}}}
var $dashboardLayoutDetails=$('#dashboardLayoutDetails').val();if($dashboardLayoutDetails!=undefined){reportIds='';$iViewIds='';var orderedLayout=GetOrderedLayoutAfterLayoutChange($dashboardLayoutDetails);for(var iview in orderedLayout){if(iViewIdList.indexOf(orderedLayout[iview].iviewid.toString())!=-1){$iViewIds+=orderedLayout[iview].iviewid+',';}
if(iviewReportsMap.hasOwnProperty(orderedLayout[iview].id))
reportIds+=iviewReportsMap[orderedLayout[iview].id]+',';}}
url=url+'&dashboardReportIds='+reportIds+'&dashboardId='+$('#dashboardId').val()+'&iViews='+$iViewIds;var windowMngr=GetRadWindowManager();var window=windowMngr.open(url,'ExportReportCreationWindow');if(window!=null){SetupRadWindow(window,400,200,iframeTitle);}
document.getElementsByClassName('rwCloseButton')[0].focus();document.getElementsByClassName('rwCloseButton')[0].addEventListener('click',function(){$('#workSpaceOptionsMenu').focus();});}
function ExportDataToExcel(moduleId,contentId,levelId){const recordExportPayload={moduleId,contentId,levelId};const data=`{"@odata.type":"EntityModel.SearchReport","DisplayFields":[],"DisplayFieldWidths":[],"ExpandDetailViews":false,"FormatType":"Column","CalendarDisplayFormat":"Month","IsEditable":true,"Criteria":{"@odata.type":"EntityModel.SearchCriteria","ModuleCriteria":{"@odata.type":"EntityModel.SearchModuleCriteria","ModuleId":${moduleId},"LevelIds":[],"SortFields":[],"IsKeywordModule":false,"BuildoutRelationship":"Union"},"SearchDirection":"Both"},"ShowDateHeading":false,"ReportId":0,"Id":0,"MaxRecordCount":0,"IsResultLimitPercent":false,"PageSize":50,"ShowCriteriaHeading":false,"FixColumnHeaders":false,"IsHiddenFromMasterReportList":false,"IsHiddenFromIViews":false,"IsCachingEnabled":false}`;if(parent&&parent.Ext){var localesCollection=parent.Ext.create('Rsa.common.ux.LocalesModel');localesCollection.id=parent.ArcherApp.view.ux.search.manageColumns.ManageColumns.localesObj;localesCollection.load({callback:function(records,operation,success){if(success){var localesHashMap=records.get('value'),editor=parent.Ext.create('ArcherApp.view.ux.search.manageColumns.ManageColumns',{recordExportPayload,searchReport:data,locales:localesHashMap,isRecordExport:true,closable:false,customTitle:localesHashMap.get('recpage:excelExportSelect'),listeners:{close:function(window){var result=window.getResults();if(result.button==='OK'){$sv('SerializedReport',result.report);$pb('{"a":[{"Key":"resultOption","Value":"Columns"}],"e":"modsearch"}');}}}});editor.show();}}});}}
function GetOrderedLayoutAfterLayoutChange(dashboardLayoutDetails){var margin=30;var dashboardDetails=JSON.parse(dashboardLayoutDetails);var iviewsArray=dashboardDetails.iviewGeometryArray;iviewsArray=iviewsArray.sort(SortByLayoutTop);var groupOrder=[];for(var i=0;i<iviewsArray.length;i++){if(groupOrder.indexOf(iviewsArray[i].top)===-1){groupOrder.push(iviewsArray[i].top);}}
iviewsArray.sort(function(a,b){if(groupOrder.indexOf(a.top)<groupOrder.indexOf(b.top)){return-1;}else if(groupOrder.indexOf(a.top)>groupOrder.indexOf(b.top)){return 1;}else if(a.col<b.col){return-1;}else if(a.col>b.col){return 1;}else{return 0;}});for(var i=iviewsArray.length-1;i>0;i--){if((iviewsArray[i].top-iviewsArray[i-1].top)<margin&&(iviewsArray[i].col<iviewsArray[i-1].col)){var temp=iviewsArray[i-1];iviewsArray[i-1]=iviewsArray[i];iviewsArray[i]=temp;}}
return iviewsArray;}
function SortByLayoutTop(a,b){var aTop=a.top;var bTop=b.top;return(aTop-bTop);}
function RunReportObjects(table){table.find('.ReportObjectFrame').each(function(){var reportObjectUrl=$(this).attr('url');var reportObjectClicked=$(this).attr('clicked');if(reportObjectUrl!='loaded'&&reportObjectClicked=='true'){$(this).attr('src',reportObjectUrl);$(this).attr('url','loaded');}});}
function copyStringToClipboard(str){var el=document.createElement('textarea');el.value=str;el.setAttribute('readonly','');el.style={position:'absolute',left:'-9999px'};document.body.appendChild(el);el.select();document.execCommand('copy');document.body.removeChild(el);}
function externalClick(){$('#master_windowContainer, #master_DefaultContent_ReportsSection_Show_Filters, #master_DefaultContent_ForumsSection_Add_New, #master_DefaultContent_results_srsec_sroMenu,.FacetedCheckbox,#msgOptions').on('click',function(event){if('master_btnEllipsisDropDown'!==event.target.parentElement.id){if('master_btnEllipsisDropDown'!==window.event.srcElement.id)
$('#ellipsis-dropdown-content').removeClass('show');}
if('master_btnShare'!==event.target.parentElement.id){if('master_btnShare'!==window.event.srcElement.id)
$('#share-dropdown-content').removeClass('show');}});}
function closeShareDropDown(){document.getElementById('master_btnShare').click();}
function clickShareButton(drpdwnId){document.getElementById(drpdwnId).classList.toggle('show');externalClick();}
function clickCopyLinkButton(){var currentPageDeepLink=document.getElementById('currentPageDeepLink');copyStringToClipboard(currentPageDeepLink.value);closeShareDropDown();}
function clickEllipsisButton(drpdwnId){document.getElementById(drpdwnId).classList.toggle('show');var exportimportDataBtn=document.querySelector("#master_btnExportImportData div");var exportDataBtn=document.querySelector("#master_btnExportData div");if(exportimportDataBtn){exportimportDataBtn.classList.value='';}
if(exportDataBtn){exportDataBtn.classList.value='';}
if(drpdwnId=='workflow-dropdown-content'){var el=$('#master_btnApply1').children()[0];$(el).removeClass('tb-btn');$(el).removeClass('btn-new');var el1=$('#master_btnSave1').children()[0];$(el1).removeClass('tb-btn');$(el1).removeClass('btn-new');}
externalClick();}
function MasterToolbarEmailLinkClicked(subject,body){ShowEmailClient(subject,body);closeShareDropDown();}
function frameCloseButtonClick(adjustedApplicationPath,onclick){var archerApp="/apps/ArcherApp/";if(!sessionStorage.getItem('isStatsDrillin')){const urlToRoute=getURLForNavBack();if(urlToRoute&&urlToRoute.length>0&&urlToRoute.indexOf('index.html')!==-1){window.top.location=adjustedApplicationPath+archerApp+urlToRoute;}
else{sessionStorage.removeItem('isStatsDrillin');Function(onclick.replaceAll("\\'","'"))();}}
else{window.sessionStorage.setItem('goBack','true');sessionStorage.removeItem('isStatsDrillin');Function(onclick.replaceAll("\\'","'"))();};}
function frameUICloseButtonClick(adjustedApplicationPath,onclick){var archerApp="/apps/ArcherApp/";const urlToRoute=getURLForNavBack();if(urlToRoute&&urlToRoute.length>0&&urlToRoute.indexOf('index.html')!==-1){window.top.location=adjustedApplicationPath+archerApp+urlToRoute;}
else{Function(onclick.replaceAll("\\'","'"))();}}
function getURLForNavBack(){const prevUrl=JSON.parse(window.sessionStorage.getItem('prevUrl')||'[]');const currentUrl=window.sessionStorage.getItem('currentUrl')||'';let urlToRoute=prevUrl.pop();if(urlToRoute===undefined){urlToRoute='home';}
if(currentUrl){window.sessionStorage.setItem('goBack','true');}
window.sessionStorage.setItem('prevUrl',JSON.stringify(prevUrl));window.sessionStorage.setItem('currentUrl',`${urlToRoute}`);return urlToRoute;}
function popPrevUrlForInternalRouting(){const prevUrl=JSON.parse(window.sessionStorage.getItem('prevUrl')||'[]');let urlToRoute=prevUrl.pop();window.sessionStorage.setItem('prevUrl',JSON.stringify(prevUrl));window.sessionStorage.setItem('currentUrl',`${urlToRoute||'home'}`);}
function externalRouteHelperforEmptyEntry(){const goBack=window.sessionStorage.getItem('goBack')||'false';const currentUrl=window.sessionStorage.getItem('currentUrl')||'';if(goBack==='false'){const prevUrl=JSON.parse(window.sessionStorage.getItem('prevUrl')||'[]')||[];prevUrl.push(currentUrl);try{window.sessionStorage.setItem('prevUrl',JSON.stringify(prevUrl));}
catch(e){console.log("Archer issue. Storage full error");}
window.sessionStorage.setItem('currentUrl','');}else{window.sessionStorage.setItem('goBack','false');}}
function showSnackbar(){window.archerLoginSnackbar=new mdc.snackbar.MDCSnackbar(document.getElementById("snackbar"));window.archerLoginSnackbar.timeoutMs=8000;var toastMsg=document.getElementById("toastMsg");var innerHtml=toastMsg.innerHTML;if(innerHtml!=""){window.archerLoginSnackbar.open();}}
function closeSnackbar(){window.archerLoginSnackbar.close();}
function checkboxClicked(e){var checkBoxChecked=document.getElementById("checkBoxChecked");if(checkBoxChecked)
checkBoxChecked.value=e.toString();}
function checkboxDomainClicked(e){var labelDomain=document.getElementById("DomainComponentId");var comboBoxDomain=document.getElementById("select-domain-id");if(e){if(labelDomain)labelDomain.style="display: flex";if(comboBoxDomain)comboBoxDomain.style="display: flex";}
else{if(labelDomain)labelDomain.style="display: none";if(comboBoxDomain)comboBoxDomain.style="display: none";}}
function initMaterialFields(){document.querySelectorAll(".mdc-text-field").forEach((el)=>mdc.textField.MDCTextField.attachTo(el));document.querySelectorAll('.mdc-button').forEach(el=>mdc.ripple.MDCRipple.attachTo(el))
document.querySelectorAll('.mdc-snackbar').forEach(el=>mdc.snackbar.MDCSnackbar.attachTo(el))
if(document.querySelector('.mdc-checkbox')){const checkbox=new mdc.checkbox.MDCCheckbox(document.querySelector('.mdc-checkbox'));const checkboxFormField=new mdc.formField.MDCFormField(document.querySelector('.mdc-form-field'));checkboxFormField.input=checkbox;}
if(document.querySelector('.mdc-select')){const select=mdc.select.MDCSelect.attachTo(document.querySelector('.mdc-select'));select.listen('MDCSelect:change',()=>{if(document.getElementById("comboSelectedValue"))
document.getElementById("comboSelectedValue").value=select.value;});}}
window.onload=function(){if(typeof(mdc)!=='undefined'){if(mdc){initMaterialFields();}}};