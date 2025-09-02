
steal.plugins('phui/combobox').then(function($)
{$.Controller.extend("Phui.Combobox.Ajax",{defaults:{loadingMessage:"Loading ...",process:function(data)
{return data.data?data.data:data;}}},{setup:function(el,options)
{if(el.nodeName=="INPUT")
{var el=$(el);var id=el.prop("id"),className=el.attr("class"),name=el.attr("name"),autocomplete=el.attr("autocomplete")||"off";var input=$("<input type='text' />").attr("id",id).attr("name",name).attr("className",className).attr("autocomplete",autocomplete);el.after(input);el.remove();$.extend(options,{overrideDropdown:true});input.phui_combobox(options);this._super(input[0],options);}},"show:dropdown":function(el,ev,combobox,callback)
{if(!this.notFirstFocus)
{combobox.dropdown().html("<span class='loadingText'>"+this.options.loadingMessage+"</span>");combobox.dropdown().controller().isfirstPass=false;combobox.dropdown().show();combobox.dropdown().controller().style();this.loadDataFromServer(combobox,callback);this.notFirstFocus=true;}},loadDataFromServer:function(combobox,callback,params,isAutocompleteData)
{var data=this.options.data;if(combobox.currentItem)
{var wsData=Sys.Serialization.JavaScriptSerializer.deserialize(data);wsData.value=combobox.currentItem.value;data=Sys.Serialization.JavaScriptSerializer.serialize(wsData);}
$.ajax({url:this.options.url,type:'post',data:data,contentType:"application/json; charset=utf-8",success:this.callback('showData',combobox,isAutocompleteData,callback),error:this.callback('loadDataFromServerError'),fixture:"-items"})},showData:function(combobox,isAutocompleteData,callback,data)
{data=data.d;combobox.dropdown().hide();var oldSelectedValue=combobox.currentItem.value,newSelectedValue;combobox.clearSelection();combobox.dropdown().controller().isFirstPass=true;combobox.loadData(this.options.process(data));combobox.createNoSelectionItem(combobox.modelList);combobox.dropdown().controller().draw(combobox.modelList);newSelectedValue=combobox.currentItem.value;if(!newSelectedValue)
{var item=combobox.modelListMatches("value",oldSelectedValue)[0];if(item)
{combobox.val(oldSelectedValue);}}
combobox.dropdown().controller().show();combobox.options.overrideDropdown=false;this.dataAlreadyLoaded=true;if(callback)
{callback(combobox.modelList);}},loadDataFromServerError:function(response)
{alert(response.responseText);}});});