
steal.plugins('jquery/controller','phui/keycode').then(function(){$.fn.selectionStart=function(){var el=this[0];if(el.createTextRange){var r=document.selection.createRange().duplicate()
r.moveEnd('character',el.value.length)
if(r.text=='')return el.value.length
return el.value.lastIndexOf(r.text)}else return el.selectionStart}
$.fn.selectionEnd=function(){var el=this[0];if(el.createTextRange){var r=document.selection.createRange().duplicate()
r.moveStart('character',-el.value.length)
return r.text.length}else return el.selectionEnd}
$.fn.selectText=function(start,end){var el=this[0];if(el.setSelectionRange){if(!end){el.focus();el.setSelectionRange(start,start);}else{el.selectionStart=start;el.selectionEnd=end;}}else if(el.createTextRange){var r=el.createTextRange();r.moveStart('character',start);end=end||start;r.moveEnd('character',end-el.value.length);r.select();}}
$.Controller.extend("Phui.KeyValidator",{defaults:{test:/.*/,defaultText:"",overwrite:false,hop:null}},{"keydown":function(el,ev){var key=$.keyname(ev);},"keypress":function(el,ev){var key=$.keyname(ev);if(this.skip&&(key=="backspace"||key=="delete")){return;}
this.skip=false;if(key!="undefined"&&key!="backspace"&&key!="delete"){return;}
if((ev.ctrlKey||ev.metaKey)&&(key.toLowerCase()=="v"||key.toLowerCase()=="c"||key.toLowerCase()=="x"||key.toLowerCase()=="a"))return;var current=this.element.val(),start=this.element.selectionStart(),end=this.element.selectionEnd();if(this.options.hop&&start==end&&current.substr(end,1)==this.options.hop&&key=='backspace'&&current.substr(end-1,1)==this.options.hop){start++;end++;}
var before=current.substr(0,start),beforeMinus=before.length?before.substr(0,start-1):"",after=current.substr(end),afterMinus=after.length?after.substr(1):"",moveSelection=0,first,second,prev;if(key=='backspace'&&start==end){first=beforeMinus+after;second=beforeMinus+this.options.defaultText.substr(start-1,1)+after;moveSelection=-1;}else if(key=='backspace'){first=before+after;second=before+this.options.defaultText.substr(start,end)+after;}else if(key=='delete'&&start==end){first=before+afterMinus;second=before+this.options.defaultText.substr(start,1)+afterMinus;moveSelection=1}else if(key=='delete'){first=before+after;second=before+this.options.defaultText.substr(start,end)+after;}else{first=before+key+after;second=before+key+afterMinus;moveSelection=1;}
if(!this.passes(first)){if(this.passes(second)){ev.preventDefault();if(moveSelection>0&&this.options.hop&&second.substr(start+moveSelection,1)==this.options.hop){moveSelection++;}
el.val(second).selectText(start+moveSelection)}else{ev.preventDefault();return;}}},passes:function(newVal){return((typeof this.options.test)=='object'?this.options.test.test(newVal):this.options.test(newVal))}})})