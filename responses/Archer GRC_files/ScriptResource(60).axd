
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.ClientEventManager=function()
{ArcherTech.UI.ClientEventManager.initializeBase(this);this._ddeRules=[];this._ddeActions={};this._isFilterCumulative=false;};ArcherTech.UI.ClientEventManager.prototype={initialize:function()
{ArcherTech.UI.ClientEventManager.callBaseMethod(this,'initialize');window.$EM=ArcherTech.UI.ClientEventManager._instance=this;},dispose:function()
{ArcherTech.UI.ClientEventManager.callBaseMethod(this,'dispose');this._uniqueID=null;this._ddeRules=null;this._ddeActions=null;this._isFilterCumulative=null;window.$EM=undefined;},get_ddeRules:function()
{return this._ddeRules;},set_ddeRules:function(val)
{if(val&&val.length>0)
{for(var i=0;i<val.length;++i)
{Array.add(this._ddeRules,new ArcherTech.UI.GenericContent.Rule(val[i]));}}},get_ddeActions:function()
{return this._ddeActions;},set_ddeActions:function(val)
{this._ddeActions=val;},get_isFilterCumulative:function()
{return this._isFilterCumulative;},set_isFilterCumulative:function(val)
{this._isFilterCumulative=val;},getRuleById:function(ruleId)
{var result=null;if(ruleId)
{var rules=this.get_ddeRules();if(rules)
result=rules[ruleId];}
return result;},getActionById:function(actionId)
{var result=null;if(actionId)
{var actions=this.get_ddeActions();if(actions)
result=actions[actionId];}
return result;}};ArcherTech.UI.ClientEventManager.GetInstance=function()
{if(ArcherTech.UI.ClientEventManager._instance==null)
{ArcherTech.UI.ClientEventManager._instance=$create(ArcherTech.UI.ClientEventManager,{id:ArcherTech.UI.ClientEventManager._instanceName},null,null,null);}
return ArcherTech.UI.ClientEventManager._instance;};ArcherTech.UI.ClientEventManager._instanceName='ClientEventManager';ArcherTech.UI.ClientEventManager._instance=null;ArcherTech.UI.ClientEventManager.registerClass('ArcherTech.UI.ClientEventManager',Sys.Component);