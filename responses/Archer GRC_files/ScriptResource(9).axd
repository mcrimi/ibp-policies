
steal.plugin("jquery").then(function($){var initializing=false,fnTest=/xyz/.test(function(){xyz;})?/\b_super\b/:/.*/,inheritProps=function(newProps,oldProps,addTo){addTo=addTo||newProps
for(var name in newProps){addTo[name]=typeof newProps[name]=="function"&&typeof oldProps[name]=="function"&&fnTest.test(newProps[name])?(function(name,fn){return function(){var tmp=this._super,ret;this._super=oldProps[name];ret=fn.apply(this,arguments);this._super=tmp;return ret;};})(name,newProps[name]):newProps[name];}};jQuery.Class=function(){if(arguments.length)this.extend.apply(this,arguments)};$.extend($.Class,{callback:function(funcs){var args=jQuery.makeArray(arguments),self;funcs=args.shift();if(!jQuery.isArray(funcs)){funcs=[funcs];}
self=this;return function class_cb(){var cur=args.concat(jQuery.makeArray(arguments)),isString,length=funcs.length,f=0,func;for(;f<length;f++){func=funcs[f];if(!func){continue;}
isString=typeof func=="string";if(isString&&self._set_called){self.called=func;}
cur=(isString?self[func]:func).apply(self,cur||[]);if(f<length-1){cur=!jQuery.isArray(cur)||cur._use_call?[cur]:cur}}
return cur;}},getObject:function(objectName,current){var current=current||window,parts=objectName?objectName.split(/\./):[],i=0;for(;i<parts.length;i++){current=current[parts[i]]||(current[parts[i]]={})}
return current;},newInstance:function(){var inst=this.rawInstance(),args;if(inst.setup){args=inst.setup.apply(inst,arguments);}
if(inst.init){inst.init.apply(inst,$.isArray(args)?args:arguments);}
return inst;},setup:function(oldClass,fullName){this.defaults=$.extend(true,{},oldClass.defaults,this.defaults);return arguments;},rawInstance:function(){initializing=true;var inst=new this();initializing=false;return inst;},extend:function(fullName,klass,proto){if(typeof fullName!='string'){proto=klass;klass=fullName;fullName=null;}
if(!proto){proto=klass;klass=null;}
proto=proto||{};var _super_class=this,_super=this.prototype,name,shortName,namespace,prototype;initializing=true;prototype=new this();initializing=false;inheritProps(proto,_super,prototype);function Class(){if(initializing)return;if(this.constructor!==Class&&arguments.length){return this.extend.apply(this,arguments)}else{return this.Class.newInstance.apply(this.Class,arguments)}}
for(name in this){if(this.hasOwnProperty(name)&&$.inArray(name,['prototype','defaults','getObject'])==-1){Class[name]=this[name];}}
inheritProps(klass,this,Class);if(fullName){var parts=fullName.split(/\./),shortName=parts.pop(),current=$.Class.getObject(parts.join('.')),namespace=current;steal.dev.isHappyName(fullName)
current[shortName]=Class;}
$.extend(Class,{prototype:prototype,namespace:namespace,shortName:shortName,constructor:Class,fullName:fullName});Class.prototype.Class=Class.prototype.constructor=Class;var args=Class.setup.apply(Class,[_super_class].concat($.makeArray(arguments)));if(Class.init){Class.init.apply(Class,args||[]);}
return Class;}})
jQuery.Class.prototype.callback=jQuery.Class.callback;})();