
Type.registerNamespace('ArcherTech.UI');ArcherTech.UI.MasterPageController=function()
{this._isFrameLess=false;this._masterPageHeader=null;this._masterToolbarContainer=null;this._masterCommandRow=null;this._masterPageScrollingArea=null;this._masterPageFooter=null;this._masterButtonContainer=null;this._scollbarAdjustmentApplied=false;};ArcherTech.UI.MasterPageController.prototype={Initialize:function(isFrameLess)
{this._isFrameLess=isFrameLess;this._masterPageHeader=$('#master_hr');this._masterToolbarContainer=$('#master_ToolbarContainer');this._masterToolbarContainer_UI=$('#master_ToolbarContainer_UI');this._masterPageScrollingArea=$('#master-content-container-scroll');this._masterCommandRow=$('#master_comr');this._masterPageFooter=$('#master_fr');this._masterButtonContainer=$('#master_buttonContainer');},AdjustSize:function()
{if(!$nu(this._masterPageScrollingArea)&&this._masterPageScrollingArea.length>0)
{var contentPaneHeight;var contentPaneWidth;var workspaceController=parent.window.WorkspaceController;if(!$nu(workspaceController))
{contentPaneHeight=workspaceController.get_ContentPaneHeight();contentPaneWidth=workspaceController.get_ContentPaneWidth();}
else
{var body=$('body');contentPaneHeight=body.height();contentPaneWidth=body.width();var bottomActions=$('.FrameButtonsLower');if(bottomActions.height()>0){contentPaneHeight-=bottomActions.height()+6;}}
this.SetPageScrollingAreaHeight(contentPaneHeight);this.SetPageScrollingAreaWidth(contentPaneWidth);this._masterPageScrollingArea.resize();}},SetPageScrollingAreaHeight:function(containerHeight)
{var newScrollingAreaHeight=containerHeight;if(!this._isFrameLess)
{newScrollingAreaHeight-=18;}
if(this._masterPageHeader.length>0)
{newScrollingAreaHeight-=this._masterPageHeader.height();}
if(this._masterPageScrollingArea.length>0&&this._masterToolbarContainer.length>0){newScrollingAreaHeight-=this._masterPageScrollingArea.position().top-this._masterToolbarContainer.position().top;}
if(this._masterPageScrollingArea.length>0&&this._masterToolbarContainer_UI.length>0){newScrollingAreaHeight-=this._masterPageScrollingArea.position().top-this._masterToolbarContainer_UI.position().top;if(this._masterPageFooter.length>0&&this._masterPageHeader.length>0){newScrollingAreaHeight-=-this._masterPageHeader.height()-18;if($('#master_windowContainer').length>0)$('#master_windowContainer').css('overflow','visible');}}
if(this._masterCommandRow.length>0)
{newScrollingAreaHeight-=this._masterCommandRow.height();}
if(this._masterPageFooter.length>0)
{newScrollingAreaHeight-=this._masterPageFooter.height();}
if(this._masterButtonContainer.length>0)
{newScrollingAreaHeight-=this._masterButtonContainer.height();}
if(newScrollingAreaHeight<160)
{newScrollingAreaHeight=160;}
this._masterPageScrollingArea.height(newScrollingAreaHeight);},SetPageScrollingAreaWidth:function(containerWidth)
{if(!this._isFrameLess)
{containerWidth-=21;}
if(containerWidth<300)
{containerWidth=300;}
this._masterPageScrollingArea.width(containerWidth);},GetPageScrollingAreaWidth:function()
{var containerWidth=500;if(!$nu(this._masterPageScrollingArea)&&this._masterPageScrollingArea.length>0)
{containerWidth=this._masterPageScrollingArea.width();}
return containerWidth;},GetContainer:function()
{return this._masterPageScrollingArea;}};window.MasterPageController=new ArcherTech.UI.MasterPageController();