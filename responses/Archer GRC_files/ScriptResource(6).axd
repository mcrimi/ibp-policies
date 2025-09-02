
function ShowEmailClient(subject,body,email)
{$find('ArcherTech.UI.EmailClient').showEmailClient(subject,body,email);}
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.EmailClient=function()
{ArcherTech.UI.EmailClient.initializeBase(this);this._emailLinkFormat='';this._emailClientPath='';this._iframeTitle=null;};ArcherTech.UI.EmailClient.prototype={initialize:function()
{},showEmailClient:function(subject,body,email)
{subject=encodeURIComponent(subject||'');body=encodeURIComponent(body||'');email=email||'';switch(this._emailLinkFormat)
{case'Popup':GetArcherWindow(this._emailClientPath+'?subject='+subject+'&body='+body+'&email='+encodeURIComponent(email),'EmailClient',document.body.offsetHeight-40,document.body.offsetWidth-40,this._iframeTitle);break;case'Truncate':var href='mailto:'+email+'?body='+body;window.open(href,'_top');break;default:subject=subject||'%20';var href='mailto:'+email+'?subject='+subject+'&body='+body;window.open(href,'_top');}},get_iframeTitle:function(){return this._iframeTitle;},set_iframeTitle:function(val){this._iframeTitle=val;}};ArcherTech.UI.EmailClient.registerClass('ArcherTech.UI.EmailClient',Sys.Component);if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();