h1, h2, h3, h4, h5, h6, strong {
    /*bringing boldness back to headers and the strong element*/
    /*Needed to allow TinyMCE 'bold' plugin to work in IE and Firefox*/
    font-weight: bold;
}

.app-header {

  /* Default header color */
  background-color: #00617F;
  background-image: none !important;
  border-bottom: none !important; 
}

.homeToast .x-autocontainer-innerCt 
{
    padding: 16px !important;
    max-width: 600px!important;
    word-wrap: break-word;
    word-break: normal;
}

.x-tool .x-tool-close:focus
{
    opacity:1;
}

/*  SL pages BEGIN*/

.rsa-selector-filtering .x-img,
.rsa-selector-sorting .x-img,
.x-action-col-glyph,
.x-action-col-icon {
    color :#176DC2 !important;
}

.grid-text-link{
    color:#176DC2 !important;
}

.dataimports-label-active{
    background-color: #176DC2 !important;
}

.archer-main-header .x-title-text {

    color: #212121 !important;

}

.archer-main-header .x-panel-body-default{
    color: #212121 !important;
}

.archer-accordion-header .x-title-text{
    color: #212121 !important;

}

.archer-main-header .x-img{ /* 'i' & 'close' button image color*/
    color: #212121 !important;
}

.archer-main-header .x-btn-icon-el-default-toolbar-medium{ /* button image color*/
    color: #176DC2 !important;

}

.archer-main-header .x-btn-inner-default-toolbar-medium{ /* button text color*/
    color: #176DC2 !important;
}

.toolbar-app-buttons:hover{ /* toolbar button on hover*/
    border:1px solid #176DC2;
    background-color: #FFF !important;
}

.outer-table .cell-background-color .x-panel-body-default{ /* cell background on DIH*/
    background: #F2F2F2 !important; 
}

/*  SL pages END*/

.global-search-bar {
  background-color: $rsa-primary-color;
  background-image: -moz-linear-gradient(top, #00617F 0%, #00617F 90%, #00617F 140%);
  background-image: -o-linear-gradient(top, #00617F 0%, #00617F 90%, #00617F 140%);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #00617F), color-stop(.9, #00617F ), color-stop(1.4, #00617F ));
  background-image: -webkit-linear-gradient(top, #00617F 0%, #00617F 90%, #00617F 140%);
  background-image: linear-gradient(to bottom, #00617F 0%, #00617F 90%, #00617F 140%);
}

.divider-header {
  height: 40px;
  width: 1px;
  border-left: 1px solid #CCF3FF;
}

.x-form-item-label-default {
    color: #000 !important;
    /* font: 400 12px/17px sans-serif; */
}

/*Workspace Buttons*/
.x-btn-inner-WorkspaceButton-large {
    font: 400 14px/20px Open Sans;
    color: white;
    padding: 0 10px 0 5px;
    max-width: 100%;
}

.x-btn-icon-el-WorkspaceButton-large.x-btn-glyph {
  font-size: 20px;
  line-height: 20px;
  color: white;
  opacity: 0.8;
}

.x-ie8 .x-btn-icon-el-WorkspaceButton-large.x-btn-glyph {
  color: white;
}

.x-btn-arrow-glyph {
  display: inline-block;
  height: 40px;
  width: 20px;
  font-size: 22px;
  line-height: 40px;
  color: white !important;
  opacity: 0.8;
  margin-right: 0;
  vertical-align: middle !important;
  background-position: center center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  text-align: center !important;
  vertical-align: middle !important;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}

.x-btn-WorkspaceButton-large.x-btn-over,
.x-btn-WorkspaceButton-large.x-btn-focus,
.x-btn-WorkspaceButton-large.x-btn-focus.x-btn-over,
.x-btn-WorkspaceButton-large.x-btn-pressed {
    background-image: none;
    background-color: #003A4C;
   -webkit-border-radius: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}

.x-btn-WorkspaceButton-large .x-btn-arrow-glyph:hover {
  background-color: #002733;
}

.megamenu-workspacebutton-active {
	background-color: #003A4C !important;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#001319', endColorstr='#00617F') !important;
	background: -webkit-gradient(linear, left top, left bottom, from(#001319), to(#00617F)) !important;
	background: -moz-linear-gradient(top,  #001319,  #00617F) !important;
	background-image: -ms-linear-gradient(top, #001319 0%, #00617F 100%) !important;
	-webkit-border-radius: 0 !important;
	border-radius: 0 !important;
}

/* Focus visibility */
.x-btn-WorkspaceButton-large {
    border: 2px solid transparent;
}

.x-btn-WorkspaceButton-large.x-btn-focus,
.x-btn-WorkspaceButton-large.x-btn-focus.x-btn-over {
    border: 2px ridge white;
}

/*End of Workspace Buttons*/

/* Start of System Menu (a.k.a. prefMenu) */

.x-menu-SystemMenu, 
.x-menu-header-SystemMenu,
.x-menu-header-title-SystemMenu,
.x-menu-body-SystemMenu,
.x-menu-item-SystemMenu,
.x-menu-item-text-SystemMenu {
    color: white !important;
	background-color: #005975 !important; 
}

.x-menu-item-SystemMenu.x-menu-item-active {
    background-color: #004E66 !important;
}

/* End of System Menu (a.k.a. prefMenu) */

/* Start of Mega Menus */

.x-menu-header-DashboardsMenu, 
.x-menu-header-QuickLinksMenu,
.x-menu-item-text-DashboardsMenu,
.x-menu-item-text-QuickLinksMenu, 
.x-menu-item-text-SolutionsMenu, 
.x-menu-item-text-ApplicationsMenu, 
.x-menu-item-text-DiscussionForumMenu, 
.x-menu-item-text-AdminSolutionsMenu {
  color: white !important;
}


.x-menu-header-title-SolutionsMenu, 
.x-menu-header-title-ApplicationsMenu,
.x-menu-header-title-DiscussionForumMenu,
.x-menu-header-title-AdminSolutionsMenu {
    color: #7DA5B2;
}

.x-menu-DashboardsMenu, 
.x-menu-header-DashboardsMenu,
.x-menu-header-title-DashboardsMenu,
.x-menu-body-DashboardsMenu {
	background-color: #00617F;
}

.x-menu-QuickLinksMenu,
.x-menu-header-QuickLinksMenu,
.x-menu-header-title-QuickLinksMenu,
.x-menu-body-QuickLinksMenu {
    background-color: #00617F;
}

.x-menu-SolutionsMenu,
.x-menu-header-SolutionsMenu,
.x-menu-body-SolutionsMenu,
.x-menu-AdminSolutionsMenu,
.x-menu-header-AdminSolutionMenu,
.x-menu-body-AdminSolutionsMenu {
    background-color: #005975;
}

.x-menu-item-clicked-SolutionsMenu,
.x-menu-item-clicked-SolutionsMenu.x-menu-item-active {
  background-color: #003A4C !important;
}

.megamenu-container.solutions {
    border-left: 1px solid #004E66 !important;
}

.applications-menu-container-visible {
	background-color: #004E66;
	box-shadow: -1px 0 1px 0 #002733;  
}

.x-window-header-showAllWindow-right.match-bgcolor .x-tool-img,
.x-window-header-showAllWindow-right.match-bgcolor,
.x-menu-ApplicationsMenu, 
.x-menu-header-ApplicationsMenu,
.x-menu-body-ApplicationsMenu {
	background-color: #004E66 !important;
}

.multi-action-menu-item-button {
	color: white;
}

.megamenu-container.dashboard:after,
.megaMenuForShowAll:after {
	color: #005975 !important;
}

.megamenu-container.solutions {
	background-color: #005975; 
}

.megamenu-container.applications {
	background-color: #004E66; 
}

/* Focus visibility */
.x-menu-item-ApplicationsMenu .x-menu-item-link {
    padding: 2px;
}

.x-menu-item-ApplicationsMenu .multi-action-menu-item-button {
    padding: 1px;
}

.x-menu-item-DiscussionForumMenu .x-menu-item-link {
    padding: 0px;
}

.x-menu-item-DashboardsMenu .x-menu-item-link,
.x-menu-item-QuickLinksMenu .x-menu-item-link {
    margin-left: 10px;
}

.x-menu-item-SolutionsMenu {
    margin: 0 5px;
}

.x-menu-item-DashboardsMenu .x-menu-item-link,
.x-menu-item-QuickLinksMenu .x-menu-item-link,
.x-menu-item-SolutionsMenu,
.x-menu-item-ApplicationsMenu .x-menu-item-link,
.x-menu-item-AdminSolutionsMenu .x-menu-item-link {
    border: 2px solid transparent;
}

.x-menu-item-ApplicationsMenu .multi-action-menu-item-button,
.x-menu-item-DiscussionForumMenu .x-menu-item-link {
    border: 1px solid transparent;
}

.x-menu-item-ApplicationsMenu-focus .multi-action-menu-item-button:focus,
.x-menu-item-DiscussionForumMenu-focus .x-menu-item-link:focus {
    border: 1px solid white;
}

.x-menu-item-SystemMenu .x-menu-item-link {
    /* Can't use transparent here */
    border: 2px solid #005975;
    padding-left: 2px;
}

.x-menu-item-SystemMenu-focus .x-menu-item-link {
    border: 2px ridge white;
    padding-left: 2px;
}

/* End of Mega Menus */



/*Start of Home Header Menu Bar*/

.x-btn-HomeMenuButton-large.x-btn-over,
.x-btn-HomeMenuButton-large.x-btn-focus,
.x-btn-HomeMenuButton-large.x-btn-focus.x-btn-over,
.x-btn-HomeMenuButton-large.x-btn-pressed {
  background-image: none;
  background-color: #003A4C;
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.x-btn-HomeMenuButton-large .x-btn-glyph {
    color: white;
}

.x-ie8m .x-btn-HomeMenuButton-large .x-btn-glyph {
  color: white;
}

/* Focus visibility */
.x-btn-HomeMenuButton-large {
    border: 2px solid transparent;
    padding: 8px 10px 10px 10px;
}

.x-btn-HomeMenuButton-large.x-btn-focus,
.x-btn-HomeMenuButton-large.x-btn-focus.x-btn-over {
    border: 2px ridge white;
}
/*End of Home Menu Bar*/


/* For Help header button */
.x-btn-HelpMenuButton-large.x-btn-over,
.x-btn-HelpMenuButton-large.x-btn-focus,
.x-btn-HelpMenuButton-large.x-btn-focus.x-btn-over,
.x-btn-HelpMenuButton-large.x-btn-pressed {
  background-image: none;
  background-color: #003A4C;
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.x-btn-HelpMenuButton-large .x-btn-glyph {
    font-size: 15px;
    line-height: 15px;
    color: white;
    opacity: 0.8;
}

.x-ie8m .x-btn-HelpMenuButton-large .x-btn-glyph {
  color: black;
}

/* Focus visibility */
.x-btn-HelpMenuButton-large {
    border: 2px solid transparent;
}

.x-btn-HelpMenuButton-large.x-btn-focus,
.x-btn-HelpMenuButton-large.x-btn-focus.x-btn-over {
    border: 2px ridge white;
}

/*End of Help Header Button*/


/*Pref Header Button*/
.x-btn-PrefMenuButton-large.x-btn-over,
.x-btn-PrefMenuButton-large.x-btn-focus,
.x-btn-PrefMenuButton-large.x-btn-focus.x-btn-over,
.x-btn-PrefMenuButton-large.x-btn-pressed {
  background-image: none;
  background-color: #003A4C;
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.x-btn-inner-PrefMenuButton-large {
  color: white;
}

.x-btn-PrefMenuButton-large .x-btn-glyph {
  color: white;
}

.x-ie8m .x-btn-PrefMenuButton-large .x-btn-glyph {
  color: white;
}

.x-btn-PrefMenuButton-large .x-btn-arrow-glyph:hover {
  background-color: #002733;
}

.admin-button .x-btn-icon-el-WorkspaceButton-large.x-btn-glyph {
	margin: 0 10px 0 0;
}

.admin-button {
    padding: 0 10px 0 0;
}

/* Focus visibility */
.x-btn-PrefMenuButton-large {
    border: 2px solid transparent;
}

.x-btn-PrefMenuButton-large.x-btn-focus,
.x-btn-PrefMenuButton-large.x-btn-focus.x-btn-over {
    border: 2px ridge white;
}

/*End of Header Buttons*/


/* Begin ShowAll Button */

.x-btn-WorkspaceShowAllButton-medium {
  border-color: #00617F;
}

.x-btn-WorkspaceShowAllButton-medium.x-btn-over,
.x-btn-WorkspaceShowAllButton-medium.x-btn-focus,
.x-btn-WorkspaceShowAllButton-medium.x-btn-focus.x-btn-over,
.x-btn-WorkspaceShowAllButton-medium.x-btn-pressed {
  background-image: none;
  background-color: #003A4C;
  border-color: #00617F;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.x-btn-inner-WorkspaceShowAllButton-medium {
    color: white;
}

.x-btn-icon-el-WorkspaceShowAllButton-medium.x-btn-glyph {
  color: white;
}

.x-btn-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-pressed {
    background-color: #00617F !important;
}

.showAllWindowWorkspacesViewAdmin .x-item-selected,
.showAllWindowWorkspacesView .x-item-selected {    
    background-color: #00617F;
}

/* Focus visibility */
.x-btn-WorkspaceShowAllButton-medium {
    border: 2px solid transparent;
}

.x-btn-WorkspaceShowAllButton-medium.x-btn-focus,
.x-btn-WorkspaceShowAllButton-medium.x-btn-focus.x-btn-over {
    border: 2px ridge white;
}

/* End ShowAll Button */


/* Begin ShowAll Menu */

.x-toolbar-ShowAllWindowToolbarTop {
  background-image: none;
  background-color: #00617F;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#00617F', EndColorStr='#002733');
  background-image: -ms-linear-gradient(top, #00617F 0%, #002733 85%);
  background-image: -moz-linear-gradient(top, #00617F 0%, #002733 85%);
  background-image: -o-linear-gradient(top, #00617F 0%, #002733 85%);
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #00617F), color-stop(.85, #002733));
  background-image: -webkit-linear-gradient(top, #00617F 0%, #002733 85%);
  background-image: linear-gradient(to bottom, #00617F 0%, #002733 85%);
}

.x-window-body-showAllWindow {
  background: #00617F;
}

.x-window-header-showAllWindow-right, 
.x-window-header-showAllWindow .x-tool-img {
  background-color: #00617F;
}

.showAllWindowWorkspacesViewAdmin,
.showAllWindowWorkspacesView {
    background-color: #002733;
}

.showAllWindowWorkspacesViewAdmin,
.showAllWindowWorkspacesView a {
    cursor: pointer;
}

.x-toolbar-ShowAllWindowToolbarBottom {
  border-top: 1px solid #00617F !important;
}

.x-toolbar-ShowAllWindowToolbarBottom {
  background-image: none;
  background-color: #004E66;
}

.x-toolbar-ShowAllWindowToolbarBottom .x-tool-img {
  background-color: #004E66;
}

.x-btn-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-over,
.x-btn-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-focus,
.x-btn-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-focus.x-btn-over,
.x-btn-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-pressed {
  border-color: #004E66 !important;
  background-image: none;
  background-color: #00617F;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}

.x-menu-item-text-ShowAllWindowWorkspacesMenu, 
.x-menu-item-icon-ShowAllWindowWorkspacesMenu, 
.x-btn-inner-ShowAllWindowToolbarBottomReorderButton-medium, 
.x-btn-icon-el-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-glyph, 
.x-ie8 .x-btn-icon-el-ShowAllWindowToolbarBottomReorderButton-medium.x-btn-glyph {
  color: white !important;
}

.x-window-showAllWindow .x-tool-img.x-tool-close {
    /* need to load a lighter or darker sprite image based on primary color lightness */
    /* url(images/tools/tool-sprites.png) */
}

/* End ShowAll Menu */


/* For Pref header button   ---- Additional - icon needs to be the same color as glyphs */

/* we will have to make a black version of PrefMenuButton-large-arrow.png, when
	Archer Theming engine make color calculations, it can determine which icon to load.

.x-btn-PrefMenuButton-large .x-btn-arrow {
  background-image: url(images/button/PrefMenuButton-large-arrow.png);
}

.x-btn-PrefMenuButton-large .x-btn-inner {
  color: white;
}
*/


/* Configuration Edit button */
.x-btn-inner-ConfigurationButton-small {
	color: #176DC2 !important;
}
.x-btn-ConfigurationButton-small {
	border-color: #176DC2 !important;
}
.x-btn-icon-el-ConfigurationButton-small.x-btn-glyph {
	color: #176DC2 !important;
}
.x-btn-over.x-btn-ConfigurationButton-small {
	border-color: #176DC2 !important;
	background-color: #FFF !important;
}
/* End Configuration Edit button */

/* Begin Right Rail */
.right-rail {
    border-left: 1px solid #C7C7C7 !important;
}
.right-rail .bottom-container {
    background-color: #C7C7C7 !important;
 }

.rr-actions-panel, .rr-charts-panel {
    background-color: #E0E0E0 !important;
}

.x-panel-body-RightRail {
  background-color: #E0E0E0 !important;
}

.x-btn-inner-ActionButton-medium {
  color: #176DC2 !important;
 }

.x-btn-icon-el-ActionButton-medium.x-btn-glyph, 
.x-ie8 .x-btn-icon-el-ActionButton-medium.x-btn-glyph {
    color: #176DC2 !important;
} 

.x-btn-ActionButton-medium {
	background-color: #FFF !important;
}
.x-btn-over.x-btn-ActionButton-medium {
    background-color: #FFFFFF !important;
	border-color: #176DC2 !important;
}

.remove-chart-container, .chart-nodata {
	border: 1px solid #00BCFF !important; 
	background-color: #E0E0E0 !important;
}


.x-btn-inner-ActionAddButton-medium {
	color: #176DC2 !important;
}
.x-btn-ActionAddButton-medium {
	border-color:  #176DC2 !important;
	background-color: #FFFFFF !important;
    border-bottom-style: solid !important;
    border-width: 1px !important;
}
.x-btn-icon-el-ActionAddButton-medium.x-btn-glyph {
	color:  #176DC2 !important;
}
.x-btn-over.x-btn-ActionAddButton-medium {
	border-color: #176DC2 !important;
	background-color: #FFFFFF !important;
}

.x-btn.x-btn-menu-active.x-btn-ActionsCancelButton-medium, .x-btn.x-btn-pressed.x-btn-ActionsCancelButton-medium,
.x-btn-over.x-btn-ActionsCancelButton-medium,
.x-btn-over.x-btn-ActionsCancelButton-medium:active,
.x-btn-ActionsCancelButton-medium:hover .x-btn-inner-ActionsCancelButton-medium 
{
    background: #fff;
    color: #0d47a1 !important;
    border-color: #0d47a1;
    text-transform: uppercase !important;
}
.x-btn-over.x-btn-ActionsSaveButton-medium,
.x-btn-ActionsSaveButton-medium,
.x-btn-inner-ActionsSaveButton-medium {
    color: #fff;
    border-color: #176DC2 !important;
    background: #176DC2;
    text-transform: uppercase !important;
}
    .x-btn-ActionsSaveButton-medium:hover,
    .x-btn-ActionsSaveButton-medium:active,
    .x-btn-ActionsSaveButton-medium:focus,
    .x-btn-ActionsSaveButton-medium:focus .x-btn-inner-ActionsSaveButton-medium,
    .x-btn-ActionsSaveButton-medium :hover .x-btn-inner-ActionsSaveButton-medium {
        color: #fff;
        background: #0d47a1 !important;
        text-transform: uppercase !important;
        border-color: #0d47a1 !important;
    }


.x-btn-inner-ActionsCancelButton-medium {
    font-weight: 600;
    color: #176DC2;
    text-transform: uppercase !important;
}

.x-btn-ActionsCancelButton-medium {
	border-color: #176DC2;
	background-color: #FFF;
    text-transform: uppercase !important;
}
/* End Right Rail */


/* Popups */
/* KC - 2015.12.14 - Prefixing these with .x-window to constrain to popups and prevent applying styles globally. 
    ARCHER-15658 - .x-btn-default-small from this section was getting applied to column/document toggle buttons
    on leveled-app record browser. 
*/
.x-window .x-window-header-default .x-tool-img,
.x-window .x-window-header-default-top {
    background-color: #E0E0E0;
}

.x-window .x-window-header-title-default {
    color: #212121 !important;
    font-family: Open Sans;
}
.x-window .x-btn-inner-default-small {
	color: #176DC2;
    text-transform: uppercase !important;
}


.x-message-box .x-btn-default-small:nth-of-type(1):not([style*="display: none"]),
.x-message-box .x-btn-default-small:nth-of-type(2):not([style*="display: none"])
{
    border-color: #176DC2 !important;
    background-color: #176DC2 !important;
    
}
.x-message-box .x-btn-default-small:nth-of-type(1):not([style*="display: none"]) .x-btn-inner-default-small,
.x-message-box .x-btn-default-small:nth-of-type(2):not([style*="display: none"]) .x-btn-inner-default-small
{
    color:#fff;
    text-transform: uppercase !important;
}
.x-message-box .x-btn-default-small:nth-of-type(1):not([style*="display: none"]):hover .x-btn-inner-default-small,
.x-message-box .x-btn-default-small:nth-of-type(2):not([style*="display: none"]):hover .x-btn-inner-default-small{
   
    color: #fff !important;
    background: #0D47A1 !important;
    text-transform: uppercase !important;
}

.x-message-box .x-btn-default-small:nth-of-type(1):hover:not([style*="display: none"]),
.x-message-box .x-btn-default-small:nth-of-type(2):hover:not([style*="display: none"]){
     background: #0D47A1 !important;
     border-color: #0D47A1 !important;
}

.x-message-box .x-btn-default-small:nth-of-type(1):focus:not([style*="display: none"]),
.x-message-box .x-btn-default-small:nth-of-type(2):focus:not([style*="display: none"]) {
    border-color: #0D47A1 !important;
    background: #0D47A1 !important;
}

.x-window .x-btn-default-small {
	border-color: #176DC2;
    background-color: #FFF;
    text-transform: uppercase !important;
}

.x-btn-default-small:hover .x-btn-inner-default-small,
.CancelPop.x-btn-default-small:focus .x-btn-inner-default-small
{
    background: #fff;
    color: #0d47a1 !important;
    border-color: #0d47a1;
    text-transform: uppercase !important;
}

.x-keyboard-mode .x-btn-focus.x-btn-default-small.CancelPop {
     background: #fff !important;
     border-color: #0d47a1;
}

.x-window .x-btn-over.x-btn-default-small
 {
	/*border-color: #176DC2 !important;*/
    background-color: #fff !important;
	background-color: #FFFFFF !important;
    color: #0d47a1 !important;
    border-color: #0d47a1;
    text-transform: uppercase !important;

}
.x-window .x-toolbar-footer {
    background-color: #F7F7F7;
}

.x-window-default {
    border-color: #E0E0E0;
}
/* End Popups */


/* Begin North Content Area */
.north-content-area-empty {
  background-color: #E0E0E0 !important;
  border-left: 1px solid #00BCFF !important;
  border-bottom: 1px solid #00BCFF !important;
}


/* End North Content Area */


/* Begin Action Buttons */
.x-btn-ActionButton-medium {
    border-color: #176DC2;
}

.x-btn-inner-textbutton-medium {
    color: #176DC2 !important;
}
/* End Action Buttons */
/* Begin Page Title and Page Button */
.home-configuration {
    color: #212121;
}
.home-configuration-separator {
	border-right: 1px solid #C7C7C7 !important;
}
/* End Page Title and Page Button */


/* Begin Gadgets */

.x-panel-header-title-RsaPanel > .x-title-icon-wrap-RsaPanel > .x-title-glyph, 
.x-ie8 .x-panel-header-title-RsaPanel > .x-title-icon-wrap-RsaPanel > .x-title-glyph {
    color: #212121;
}

.x-panel-header-title-pagesectionpanel > .x-title-text-pagesectionpanel {
    color:#212121;
}

.x-panel-header-title-RsaPanel {
    color: #212121;
}

.x-panel-header-RsaPagePanel {
  border-bottom: 1px solid #00BCFF !important;
}

.wgt-tasks-item-des, 
.activity-day-event-title {
  color: #176DC2 !important;
}

.task-gadget-more-container {
  background-color: #F7F7F7 !important; 
  border-top: 1px solid;
  border-top-color: #00BCFF !important;
}
.tasks-gadget-more-button {
  border: 1px solid #176DC2 !important;
  color:  #176DC2 !important;  
}

/* End Gadgets */

/* Begin Task Gadget */

.archive-line-arrow {
	color: #00617F;
}

.archive-line-text {
    color: #4D4D4D !important;
}

.archive-line-text:focus {
    padding: 3px;
    background-color: #D3D3D3;
}

.archive-line-text:hover {
    background: #CFCFCF;
    color: #0d47a1;
    border-color: #0d47a1;
}

.wgt-tasks-box .wgt-tasks-item-des {
    color: #176DC2 !important;
}

.archive-line-hr {
  border-top: 1px solid #00BCFF !important;
}

/* End Task Gadget */

/* Begin Activity Gadget */

.x-btn-ActivityButton-small {
    border-color: #F7F7F7;
}

.x-btn-inner-ActivityButton-small {
    color: #212121;
}

.x-btn.x-btn-menu-active.x-btn-ActivityButton-small,
.x-btn.x-btn-pressed.x-btn-ActivityButton-small {
    background-image: none;
    background-color: #F7F7F7;
}

.x-btn.x-btn-menu-active.x-btn-ActivityButton-small .x-btn-inner,
.x-btn.x-btn-pressed.x-btn-ActivityButton-small .x-btn-inner {
  color: #212121;
}

.x-btn-focus.x-btn-menu-active.x-btn-ActivityButton-small,
.x-btn-focus.x-btn-pressed.x-btn-ActivityButton-small {
  -webkit-box-shadow: #F7F7F7 0 1px 0px 0 inset, #F7F7F7 0 -1px 0px 0 inset, #F7F7F7 -1px 0 0px 0 inset, #F7F7F7 1px 0 0px 0 inset;
  -moz-box-shadow: #F7F7F7 0 1px 0px 0 inset, #F7F7F7 0 -1px 0px 0 inset, #F7F7F7 -1px 0 0px 0 inset, #F7F7F7 1px 0 0px 0 inset;
  box-shadow: #F7F7F7 0 1px 0px 0 inset, #F7F7F7 0 -1px 0px 0 inset, #F7F7F7 -1px 0 0px 0 inset, #F7F7F7 1px 0 0px 0 inset;
}

.activity {
    background-color: #F7F7F7 !important;
}

.activity-icon {
    color: #212121 !important;
    opacity: 0.5;
}

.activity-date-heading {
	color: #212121 !important;
    opacity: 0.5;
}

.activity-day {
    background: #F7F7F7;
    box-shadow: 0 2px 2px -2px #E6E6E6;
    border: 1px solid #F7F7F7;
}

.activity-day .activity {
    background: #F7F7F7;
}

.activity-day:before {
  border-right-color: #F7F7F7;
}

.activity-day:after {
  border-right-color: #F7F7F7;
}

/* End Activity Gadget */

/* Simple Search */

.walkup-search-main .app-title {
    color: #212121 !important;
}

.walkup-search-main .search-application-grid div.search-grid-link  {
    color: #176DC2;
}

.search-application-grid a.search-grid-link  {
    color: #176DC2 !important;
    text-decoration: none;
}

.walkup-search-main .record-button-container {
    background-color: #F7F7F7 !important;
    border-left: 1px #C7C7C7 solid;
    border-top: 1px #C7C7C7 solid; 
}

.walkup-search-main .selected-filter .x-btn-inner-default-small { 
    color: #fff !important; 
}

.record-button-container .search-nav-all-button.selected-filter {
    background-color: #00617F !important; 
    color: #fff !important; 
}

.walkup-search-main .search-nav-all-button,
.walkup-search-main .search-nav-my-button {
    background-color: #F7F7F7 !important;
    color: #00617F !important;
}

.walkup-search-main .search-nav-all-button .x-btn-inner-default-small,
.walkup-search-main .search-nav-my-button .x-btn-inner-default-small {
    color: #00617F;
}

.walkup-search-main .search-nav-all-button.x-btn-focus .x-btn-inner-default-small,
.walkup-search-main .search-nav-my-button.x-btn-focus .x-btn-inner-default-small,
.walkup-search-main .search-nav-all-button.x-btn-over .x-btn-inner-default-small,
.walkup-search-main .search-nav-my-button.x-btn-over .x-btn-inner-default-small {
    color: #fff !important;
}
.x-btn-default-toolbar-small {
    border-color: #176DC2 !important;
    background-color:white !important;
}
.x-btn-inner-default-toolbar-small {
    color: #176DC2 !important;
    text-transform:uppercase !important;
}


.x-btn-default-toolbar-small:hover, .x-btn-inner-default-toolbar-small:hover{
        background: #fff;
        color: #0d47a1 !important;
        border-color: #0d47a1 !important;
}
.walkup-search-main .search-nav-all-button .x-btn .search-nav-buttons .x-unselectable .x-box-item .x-btn-default-small {
    background-color: #212121; color: #212121;
}

.walkup-search-main .search-nav-all-button .x-btn .search-nav-buttons .x-unselectable .x-box-item .x-btn-default-small .x-btn-over {
    background-color: #212121; color: #ffffff;
}

.walkup-search-main .search-nav-all-button.x-btn-over, 
.walkup-search-main .search-nav-my-button.x-btn-over {
    background-color: #212121 !important; 
    color: #fff !important; 
}

.walkup-search-main .search-nav-all-button.x-btn-focus,
.walkup-search-main .search-nav-my-button.x-btn-focus {
    background-color: #212121 !important; 
    color: #fff !important; 
}

.walkup-search-main .search-application-filter, 
.walkup-search-main .search-application-filter .x-panel-body,
.walkup-search-main .search-application-filter .x-grid-row, 
.walkup-search-main .search-application-filter .line-content  {
    background-color: #F7F7F7 !important; 
}


.search-application-filter.x-tree-arrows .x-tree-expander:after {
    color: #212121 !important; 
}
.search-application-filter.x-tree-arrows .x-tree-expander-over .x-tree-expander:after {
    color: #212121 !important; 
}
.search-application-filter.x-tree-arrows .x-grid-tree-node-expanded .x-tree-expander:after {
    color: #212121 !important; 
}
.search-application-filter.x-tree-arrows .x-grid-tree-node-expanded .x-tree-expander-over .x-tree-expander:after {
    color: #212121 !important; 
}


.walkup-search-main .search-application-filter .x-grid-row .x-tree-node-text {
    color: #212121;
}

.walkup-search-main .search-application-filter .x-grid-tree-node-leaf .x-tree-node-text {
    color: #212121; 
} 

.walkup-search-main .search-application-filter .x-grid-item-selected .x-grid-tree-node-leaf .x-grid-cell-inner  {
    background-color: #212121;
}

.walkup-search-main .search-application-filter .grid-item-selected .x-grid-tree-node-leaf .x-grid-cell-inner  {
	background-color: #212121;
}
	
.walkup-search-main .search-application-filter .grid-item-selected .x-grid-tree-node-leaf .x-tree-node-text  {
	color: #ffffff;
}

.walkup-search-main .leveled-app-record-browser {
    border-left: 2px solid #212121;
}

.walkup-search-main .leveled-app-record-browser .leveled-app-view-as-container {
    background-color: #F7F7F7;
}

.walkup-search-main .leveled-app-record-browser .leveled-app-view-as-container .x-form-item-label-inner, 
.walkup-search-main .leveled-app-record-browser .leveled-app-view-as-container .x-btn-inner, 
.walkup-search-main .leveled-app-record-browser h2, 
.walkup-search-main .leveled-app-record-browser .subitem-title {
    color: #212121;
}

.walkup-search-main .leveled-app-record-browser .leveled-app-view-as-container .x-segmented-button-item.x-btn-pressed {
    background-color: #00617F;
    border-color: #00617F;
}

.walkup-search-main .leveled-app-record-browser .leveled-app-view-as-container .x-segmented-button-item.x-btn-default-small {
    border-color: #00617F;
}

.walkup-search-main .leveled-app-record-browser a.item-name {
    color: #176DC2;
}

.walkup-search-main .leveled-app-record-browser td.subitem-orphans.x-grid-item-focused {
    border-top: 1px solid #176DC2 !important;
}

.walkup-search-main .leveled-app-record-browser .document-view-treepanel .sub-level-expander, 
.walkup-search-main .leveled-app-record-browser .document-view-treepanel .record-type {
    color: #212121;
}

.walkup-search-main .search-application-grid {
    border-top: 1px solid #00BCFF;
    border-left: 2px solid #00617F;
}

.walkup-search-main .search-application-grid .x-grid-body {
    border-right: 0.5px solid #00BCFF;    
}

.walkup-search-main .search-application-grid .x-column-header {
    color: #212121;     
    background-color: #F7F7F7; 
    border-right: 1px solid  #00BCFF; 
}

.walkup-search-main .search-application-grid .x-column-header-over, 
.walkup-search-main .search-application-grid .x-column-header-trigger {     
    background-color: #F7F7F7; 
}

.walkup-search-main .paging-toolbar {
    background-color: #F7F7F7;
}

.walkup-search-main .paging-toolbar .x-toolbar-text-default, 
.walkup-search-main .paging-toolbar .x-btn-icon-el  {
    color: #212121;
}

.walkup-search-main .tab-container .tab.active, 
.walkup-search-main .tab-container .tab:hover {
    background-color: #176DC2;
    border-bottom: 1px solid #176DC2;
}

.walkup-search-main .tab-container .x-btn-inner-default-toolbar-small {
    color: #176DC2;
}

.walkup-search-main .tab-container .tab.active .x-btn-inner-default-toolbar-small, 
.walkup-search-main .tab-container .tab:hover .x-btn-inner-default-toolbar-small {
    text-shadow: 2px 2px 1px #125394;
}

.walkup-search-main .tab-container .tab {
    color: #176DC2;
    border-top: 1px solid #01070C;
    border-right: 1px solid #01070C;
    border-bottom: 1px solid $Helper.LightenHtmlColor#176DC2, '.20'); /* #acd192; */
}

.walkup-search-main .tab-container .tab:last-child {
    border-right: 1.75px solid #0C3A67;
}

.walkup-search-main .tab-container .tab {
    background-color: #FFFFFF;
    border-bottom: 1px solid #176DC2;
}


.x-btn-inner-ToolbarButton-medium, 
.x-btn-icon-el-ToolbarButton-medium.x-btn-glyph {
    color: #176DC2;
    font-size: 1.25em
}

/* End Simple Search*/

/* Global Search */

.global-search .textfield .x-form-trigger-wrap {
    border: 1px solid #00BCFF !important;
    border-right: none !important;
}

.global-search .search-field .icon {
    background-color: #E0E0E0 !important;
    border: 1px solid #00BCFF !important;
    color: #212121 !important;
    border-left: none !important;
}

.global-search .textfield input {
    color: #212121 !important;
}
.overflow-button .x-btn-inner-default-small,
.overflow-button .x-btn-arrow-right:after,
.global-search .summary-filter .work-with-results-cont .apps .item {
    color: #176DC2 !important;
}

.global-search .results .search-item .title a {
    color: #176DC2 !important;
}

.global-search .results .search-item .title a .icon {
    color: #176DC2 !important;
}

.global-search .results .search-item .last-line .name {
    color: #212121 !important;
}

.global-search .results .search-item-over {
    background-color: #F7F7F7;
}

.global-search .results .search-item .fields .field-label a .icon {
    color: #176DC2 !important;
}

.global-search .x-btn-inner-GlobalSearchPagingButton-medium {
    color: #212121;
}
.global-search .x-btn-icon-el-GlobalSearchPagingButton-medium.x-btn-glyph {
    color: #080808;
}

/* End Global Search */

/* Start History Bar */

.x-btn-HistoryBarOverflow-small {
  border-color: #00617F; 
}

.x-btn-inner-HistoryBarOverflow-small {
  font: 700 13px/16px Open Sans;
  color: #00617F; 
  padding: 0 5px;
  max-width: 100%; 
}

.x-btn-focus.x-btn-menu-active.x-btn-HistoryBarOverflow-small,
.x-btn-focus.x-btn-pressed.x-btn-HistoryBarOverflow-small {
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: #d2dce4 0 1px 0px 0 inset, #d2dce4 0 -1px 0px 0 inset, #d2dce4 -1px 0 0px 0 inset, #d2dce4 1px 0 0px 0 inset;
  -moz-box-shadow: #d2dce4 0 1px 0px 0 inset, #d2dce4 0 -1px 0px 0 inset, #d2dce4 -1px 0 0px 0 inset, #d2dce4 1px 0 0px 0 inset;
  box-shadow: #d2dce4 0 1px 0px 0 inset, #d2dce4 0 -1px 0px 0 inset, #d2dce4 -1px 0 0px 0 inset, #d2dce4 1px 0 0px 0 inset; 
}

.x-nbr .x-segmented-button-item.x-btn-focus.x-btn-HistoryBarOverflow-small:after {
  border-width: 1px;
  border-color: #d5e2ec; 
}

.x-nbr .x-segmented-button-item.x-btn-focus.x-btn-over.x-btn-HistoryBarOverflow-small:after {
  border-width: 1px;
  border-color: #d4e0e9; 
}

.x-nbr .x-segmented-button-item.x-btn-focus.x-btn-menu-active.x-btn-HistoryBarOverflow-small:after, .x-nbr .x-segmented-button-item.x-btn-focus.x-btn-pressed.x-btn-HistoryBarOverflow-small:after {
  border-width: 1px;
  border-color: #d2dce4; 
}

.x-btn-arrow-glyph-history {
  display: inline-block;
  height: 26px;
  width: 20px;
  font-size: 15px;
  line-height: 26px;
  color: #00617F !important;
  opacity: 0.8;
  margin-right: 0;
  vertical-align: middle !important;
  background-position: center center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  text-align: center !important;
  vertical-align: middle !important;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer; 
}


/* HISTORY BAR */

.history-bar-left-board {
  border-left: 1px solid #00BCFF !important; 
}

.history-bar .history-toolbar {
  background-color: #E0E0E0 !important;
  padding: 0;
  color: #00617F !important;
  border-bottom: 1px solid #00BCFF !important;
}

.history-bar .history-toolbar .history-menu {
  border: none;
  background-color: #E0E0E0 !important;
}

.history-bar .history-toolbar .history-main {
    border: none;
    padding-right: 10px; 
}

.history-bar .history-toolbar .history-main .history-title {
      cursor: pointer;
      color: #00617F !important;
      line-height: 30px;
      padding-left: 15px;
      font-family: Open Sans;
      font-weight: 500;
      font-size: 1.15em;
      border: 0;
}
    
.history-bar .history-toolbar .history-main .history-title-button {
      color: #00617F !important;
      line-height: 30px;
      font-family: rsa-icons;
      font-weight: 400;
      font-size: 20px;
      padding-left: 2px;
      cursor: pointer;
      border: 0;
}
  
.history-bar .history-toolbar .history-item {
    padding: 0 5px;
    border: none;
    margin-top: 3px; 
  }
    
.history-bar .history-toolbar .history-item .item-icon {
      font-family: rsa-icons;
      line-height: 26px;
      color: #00617F !important;
      width: 16px;
      font-weight: 400;
      font-size: 15px;
      cursor: default;
      border: 0px;
}
    
.history-bar .history-toolbar .history-item .item-icon-separator {
      font-family: rsa-icons;
      line-height: 26px;
      color: #00617F !important;
      width: 16px;
      font-weight: 200;
      font-size: 10px;
      cursor: default;
      border: 0px;
      padding-right: 5px;
      opacity: 0.6;
}

.history-bar .history-toolbar .history-item .item-title {
      cursor: default;
      font-family: Open Sans;
      color: #00617F !important;
      line-height: 26px;
      font-weight: 700;
      font-size: 0.95em;
      border: 0; 
}

.history-bar .history-toolbar .history-item.selected {
    background-color: #fff !important;
    color: #00617F !important;
    border: 1px solid #00BCFF  !important;
    margin-top: 3px;
    border-bottom: none;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.history-bar .history-toolbar .separator-container .separator {
    margin: 5px 0;
    padding: 0 5px;
    border-left: 1px solid #00BCFF !important;
}

.history-bar .history-space {
  background-color:#E0E0E0 !important;
  padding: 0 0;
  border: none;
  border-bottom: 1px solid #00BCFF !important;
  margin-top: 0;
}

/* End of History Bar*/


/* OpsRisk Solution **************/

/* Stages (Chevron) */
.stage .step {
	color: #212121 !important;
}
.stage .step.active {
	background-color: #212121 !important;
	color: #fff !important;
}
.stage .step.active .arrow {
	border-color: transparent transparent transparent #212121 !important;
}
.stage .step.active .wedge {
	border-color: #212121 #212121 #212121 transparent !important;
}
.stage .step.done {
	background-color: #E0E0E0 !important;
	color: #212121 !important;
}
.stage .step.done .arrow {
	border-color: transparent transparent transparent #E0E0E0 !important;
}
.stage .step.done .wedge {
	border-color: #E0E0E0 #E0E0E0 #E0E0E0 transparent !important;
}
/* End Chevron */

/* Titles */
.orm-main .risk-assessment-toolbar .title, 
.orm-main .control-toolbar .title, 
.orm-main .review-toolbar .title {
	color: #212121 !important;
}

/* Buttons */
.x-btn-inner-ToolbarButton-medium, 
.x-btn-icon-el-ToolbarButton-medium.x-btn-glyph,
.options-button .options-btn-arrow-glyph,
.options-button-menu .menu-item .x-menu-item-icon-default.x-menu-item-glyph,
.toolbar-related {
	color: #176DC2 !important;
}

.x-btn.x-btn-disabled.x-btn-ToolbarButton-medium .x-btn-inner,
.x-btn-ToolbarButton-medium.x-item-disabled .x-btn-glyph {
    color: #176DC2 !important;
    opacity: 0.25 !important;
}

.orm-main .risk-assessment-wrapper .business-process-list .item .second-line .icon,
.orm-main .risk-assessment-wrapper .risk-content .title .icon,
.orm-main .risk-assessment-wrapper .risk-content .title:hover,
.orm-main .control-assessment-wrapper .control-content .title .icon,
.orm-main .control-assessment-wrapper .control-content .title:hover {
	color: #176DC2 !important;
}

/* For panel tool area */
.x-panel-header-title-RsaPagePanel {
    color: #212121 !important;
}

.x-title-icon-RsaPagePanel {
  color: #212121 !important;
}

.section-panel-title {
    color: #212121 !important;
}

.page-section-panel-cls .x-tool > .x-tool-collapse-top {
  color: #212121 !important;
}

.rsa-popup-table .inner-table .x-table-layout .modification-box {
    border: 1px solid #616161 ;
}

.rsa-popup-table .x-panel-body {
    background-color: #F7F7F7;
}

.page-section-panel-cls .x-tool > .x-tool-expand-bottom {
  color: #212121 !important;
}

.x-panel-header-RsaPagePanel-top,
.x-panel-header-pagesectionpanel-top {
    background-color: #E0E0E0;
    padding: 2px !important;
}

.form-panel-cls .x-panel-body,
.page-section-panel-cls .x-panel-body {
    background-color: #F7F7F7;
}

.x-panel-body-default .rsa-selector-sorting {
    background-color: #F7F7F7;
}

.x-panel-RsaPagePanel,
.x-panel-pagesectionpanel {
    border-color: #E0E0E0;
}

.x-panel-RsaPagePanel .x-docked-top {
    border-bottom-width: 2px !important;
    border-color:#E0E0E0 !important;
    overflow: visible;
}

.x-window-header-showAllWindow .x-tool-close {
  color: #176DC2 !important;
}

.x-tool-close {
  color: #176DC2 !important;
  overflow: visible;
}

.x-tool-save {
  color: #176DC2 !important;
}

.x-tool-new {
  color: #176DC2 !important;
}

.x-tool-copy {
  color: #176DC2 !important;
}

.x-tool-view {
  color: #176DC2 !important;
}

.x-tool-delete {
  color: #176DC2 !important;
}

.x-tool-edit {
  color: #176DC2 !important;
}

.x-tool-related {
  color: #176DC2 !important;
}

.x-tool-recalculate {
  color: #176DC2 !important;
}

.x-tool-export {
  color: #176DC2 !important;
}

.x-tool-email {
  color: #176DC2 !important;
}

.x-tool-print {
  color: #176DC2 !important;
}

.x-tool-minimize {
  color: #176DC2 !important;
}

.x-tool-maximize {
  color: #176DC2 !important;
}

.x-tool-help {
  color: #176DC2 !important;
}

.x-tool-gear {
  color: #176DC2 !important;
}

.x-tool-search {
  color: #176DC2 !important;
}

.x-tool-refresh {
  color: #176DC2 !important;
}

/* Tool Panel Button Styles*/
.x-btn-icon-el-basebutton-small,
.x-btn-inner-basebutton-small,
.x-btn-icon-el-basebutton-medium,
.x-btn-inner-basebutton-medium,
.x-btn-icon-el-basebutton-large,
.x-btn-inner-basebutton-large {
    color: #176DC2;
}

.x-btn-icon-el-primarybutton-small,
.x-btn-inner-primarybutton-small,
.x-btn-icon-el-primarybutton-medium,
.x-btn-inner-primarybutton-medium,
.x-btn-icon-el-primarybutton-large,
.x-btn-inner-primarybutton-large {
    color: #fff !important;
}

.x-btn-inner-basebutton-small,
.x-btn-inner-basebutton-medium,
.x-btn-inner-basebutton-large {
    font-weight: 600;
}
.x-btn-inner-primarybutton-small,
.x-btn-inner-primarybutton-medium,
.x-btn-inner-primarybutton-large {
    font-weight: 600;
    line-height: 17px;
}

.x-btn-basebutton-small,
.x-btn-basebutton-medium,
.x-btn-basebutton-large {
    color: #176DC2 !important;
    background-color: #fff;
    text-transform: uppercase !important;
    border-radius: 3px 3px;
    border: 1px solid #176DC2;
}

.x-btn-primarybutton-small,
.x-btn-primarybutton-medium,
.x-btn-primarybutton-large 
{    
    color: #176DC2 !important;
    background-color: #176DC2 !important;
    text-transform: uppercase !important;
    border-radius: 3px 3px;
    width:auto;
    
    height:24px;
    border: 1px solid #176DC2;
}
.x-btn.x-btn-pressed.x-btn-basebutton-small,
.x-btn.x-btn-pressed.x-btn-basebutton-medium,
.x-btn.x-btn-pressed.x-btn-basebutton-large {
    background: #fff;
    color: #0d47a1 !important;
    border-color: #0d47a1;
}
.x-btn.x-btn-pressed.x-btn-primarybutton-small,
.x-btn.x-btn-pressed.x-btn-primarybutton-medium,
.x-btn.x-btn-pressed.x-btn-primarybutton-large {
    background: #fff;
    color: #0d47a1 !important;
    border-color: #0d47a1;
}


.x-btn-basebutton-small:focus { 
    padding: 3px;
    background-color: #D3D3D3 !important;
}

.x-btn.x-btn-disabled.x-btn-basebutton-medium,
.x-btn.x-btn-disabled.x-btn-basebutton-small,
.x-btn.x-btn-disabled.x-btn-basebutton-large
{
    border-color: #176DC2 !important;
}
.x-btn.x-btn-disabled.x-btn-primarybutton-medium,
.x-btn.x-btn-disabled.x-btn-primarybutton-small,
.x-btn.x-btn-disabled.x-btn-primarybutton-large
{
    border-color: #9e9e9e !important;
    background-color: #9e9e9e !important;
}

.x-btn.x-btn-disabled.x-btn-primarybutton-medium .x-btn-icon-el-primarybutton-medium,
.x-btn.x-btn-disabled.x-btn-primarybutton-small .x-btn-icon-el-primarybutton-small,
.x-btn.x-btn-disabled.x-btn-primarybutton-large .x-btn-icon-el-primarybutton-large,
.x-btn.x-btn-disabled.x-btn-primarybutton-small .x-btn-inner,
.x-btn.x-btn-disabled.x-btn-primarybutton-large .x-btn-inner 
{
    color:  #176DC2 !important;
}
    .x-btn.x-btn-disabled.x-btn-primarybutton-medium .x-btn-inner {
        color: #176DC2;
    }
    .x-btn.x-btn-disabled.x-btn-basebutton-medium .x-btn-icon-el-basebutton-medium,
    .x-btn.x-btn-disabled.x-btn-basebutton-small .x-btn-icon-el-basebutton-small,
    .x-btn.x-btn-disabled.x-btn-basebutton-large .x-btn-icon-el-basebutton-large,
    .x-btn.x-btn-disabled.x-btn-basebutton-medium .x-btn-inner,
    .x-btn.x-btn-disabled.x-btn-basebutton-small .x-btn-inner,
    .x-btn.x-btn-disabled.x-btn-basebutton-large .x-btn-inner {
        color: #176DC2 !important;
    }

.x-btn-focus.x-btn-basebutton-small,
.x-btn-over.x-btn-basebutton-small,
.x-btn-focus.x-btn-basebutton-medium,
.x-btn-over.x-btn-basebutton-medium,
.x-btn-focus.x-btn-basebutton-large,
.x-btn-over.x-btn-basebutton-large,
.x-btn-basebutton-medium:hover .x-btn-inner-basebutton-medium,
.x-btn-basebutton-medium:hover .x-btn-icon-el-basebutton-medium,
.x-btn-basebutton-small:hover .x-btn-inner-basebutton-small,
.x-btn-basebutton-small:hover .x-btn-icon-el-basebutton-small,
.x-btn-basebutton-large:hover .x-btn-inner-basebutton-large,
.x-btn-basebutton-large:hover .x-btn-icon-el-basebutton-large
{
    background: #fff;
    color: #0d47a1 !important;
    border-color: #0d47a1;

}

.x-btn-focus.x-btn-primarybutton-small,
.x-btn-over.x-btn-primarybutton-small,
.x-btn-focus.x-btn-primarybutton-medium,
.x-btn-over.x-btn-primarybutton-medium,
.x-btn-focus.x-btn-primarybutton-large,
.x-btn-over.x-btn-primarybutton-large,
.x-btn-primarybutton-medium:hover .x-btn-inner-primarybutton-medium,
.x-btn-primarybutton-medium:hover .x-btn-icon-el-primarybutton-medium,
.x-btn-primarybutton-small:hover .x-btn-inner-primarybutton-small,
.x-btn-primarybutton-small:hover .x-btn-icon-el-primarybutton-small,
.x-btn-primarybutton-large:hover .x-btn-inner-primarybutton-large,
.x-btn-primarybutton-large:hover .x-btn-icon-el-primarybutton-large
{
   color: #fff;
   background:#0d47a1 !important;
   border-color: #0d47a1;
}

/* End of Tool Panel Button Styles*/


/* End of panel tool area */

/* Grid Styles for Archer */

.archer-grid .x-column-header-sort-ASC .x-column-header-text-inner:after {
    color: #212121 !important;
}

.archer-grid .x-column-header-sort-DESC .x-column-header-text-inner:after {
    color: #212121 !important;
}

.archer-grid .x-column-header {
    color: #212121 !important;
    background-color: #D3D3D3 !important;
    border-right: 1px solid #C7C7C7 !important;
}

.archer-grid .x-column-header-over,
.archer-grid .x-column-header-open
 {
    background-color: #D9D9D9 !important;
}

.archer-grid .x-grid-item-alt {
    background-color: #f7f7f7 !important;
}
    .archer-grid .x-grid-item-alt:hover,
    .x-grid .x-panel-body .x-grid-with-row-lines .x-grid-item:hover,
    .x-grid .x-panel-body .x-grid-with-row-lines .x-grid-item.x-grid-item-selected:hover,
    .x-grid .x-panel-body .x-grid-with-row-lines .x-grid-item.x-grid-item-selected + .x-grid-item:hover {
        background-color: #eeeeee !important;
    }

.archer-grid  .x-grid-cell-import-field-col .x-grid-cell-inner {
      color: #212121 !important;
  }
/* End of Grid Styles for Archer */

/* Archer Form Text and Label */
.x-form-text-rsa-text {
    color: #212121;
    background-color: #DEDEDE !important;
}

.x-form-trigger-wrap-rsa-text {
    border-color: #BABABA !important;
}

.x-form-trigger-wrap-rsa-text.x-form-trigger-wrap-focus {
    border-color: #3B3B3B !important;
}

.x-form-trigger-wrap-rsa-text.x-form-trigger-wrap-invalid {
    border-color: #af0014 !important;
    border-width: 1px !important;
}

.x-form-empty-field-rsa-text {
    color: #6E6E6E !important;
}
/* End of Form Text and Label */

/* Archer Form Text Field */
.x-form-trigger-wrap {
    border-color: #176DC2 !important;
}
.x-form-trigger-wrap * {
    border-color: #00BCFF; 
    background-color: white;

}
.x-form-file-wrap .x-form-trigger-wrap .x-form-text {
    border-color: #00BCFF !important;
}



.x-form-trigger-wrap-default.x-form-trigger-wrap-invalid {
    border-color: #af0014 !important;
}

.x-form-trigger-wrap-default.x-form-trigger-wrap-invalid.x-form-trigger-wrap-focus {
    box-shadow: 0px 0px 1px 1px #af0014 !important;
}

.x-form-text-default.x-form-textarea {
    line-height: normal;
}
/* End of Archer Form Text Field */

/* Archer Picker Triggers */
.x-form-trigger {
    color: black !important;
}
.x-form-arrow-trigger {
        border-color: #00BCFF !important; 
        background-color: white !important;
}

.x-form-trigger-spinner .x-form-spinner {
    color: black !important;
    background-color: white !important;
}

.x-form-trigger-default,
.x-form-trigger-default.x-form-trigger-focus {
     border-color: #00BCFF; 
}

/* End of Archer Picker Triggers */

/* Archer Default Menu List */
.x-boundlist .x-boundlist-item.x-boundlist-item-over,.x-boundlist-item.x-boundlist-item-over.x-boundlist-selected {
    background-color: #DAE8F6 !important;
    border: none;
}

.x-boundlist .x-boundlist-item {
    border: none;
}
.x-boundlist .x-boundlist-item.x-boundlist-selected,
.x-boundlist .x-boundlist-item.x-boundlist-selected {
    background-color: #E0E0E0;
    border:none;
}
/* End of Archer Default Menu List */

/* Archer Date Picker */
.x-datepicker {
    border-color: #212121 !important;
}
.x-datepicker .x-btn-inner {
     text-transform: uppercase !important;
     color: #176DC2 !important;
}

.x-datepicker-header .x-datepicker-arrow {
    color: #212121 !important;
}

.x-datepicker-header .x-btn-split-right.x-btn-wrap,
.x-datepicker-header .x-btn-split-right.x-btn-wrap:after {
    color: #212121 !important;
}

.x-datepicker-column-header-inner {
    color: #212121 !important;
    background-color: #F7F7F7 !important;
}

.x-datepicker-footer {
    background-color: #F7F7F7 !important;
}

.x-datepicker-footer .x-btn {
        background-color:#fff;
        border-color: #176DC2 !important;
}

.x-datepicker-footer .x-btn:hover {
         background: #fff;
         color: #0d47a1 !important;
         border-color: #0d47a1;
}

        .x-datepicker-today {
            border-color: #212121 !important;
        }

.x-datepicker-selected {
    border-color: #212121 !important;
}

.x-datepicker-date:hover {
    border-color: #00BCFF !important;
}

.x-monthpicker {
    border-color: #212121 !important;
}

.x-monthpicker-selected {
    border-color: #212121 !important;
}

.x-monthpicker-item-inner {
    color: #212121 !important;
}

.x-monthpicker-buttons {
    background-color: #F7F7F7 !important;
}

.x-monthpicker-buttons .x-btn {
    background-color: #fff !important;
    border-color: #176DC2 !important;
}

.x-monthpicker-buttons .x-btn:hover {
    border-color: #0d47a1 !important;
}

    .x-monthpicker-yearnav-button {
        color: #212121 !important;
    }
/* End of Archer Date Picker */

/* Archer Tree Panel */
.x-tree-panel {
    border-color: transparent !important;
}

.x-tree-panel .x-panel-header-default {
    background-color: #00BCFF !important;
}

.x-tree-panel .x-title-text {
    color: #212121 !important;
}

.x-tree-panel .x-column-header {
    background-color: #F7F7F7 !important;
    border-color: #00BCFF !important;
}

.x-tree-panel .x-column-header-over:after {
    border-color: #212121 !important;
}

.x-tree-panel .x-column-header-focus:after {
    border-color: #212121 !important;
}

.x-column-header.x-column-header-focus .x-column-header-inner:after {
    border-color: #212121 !important;
}

.x-tree-panel .x-column-header-over .x-column-header-trigger,
.x-tree-panel .x-column-header-open .x-column-header-trigger {
    color: #212121 !important;
}

.x-tree-panel .x-column-header-open {
    background-color: #F7F7F7 !important;
}

.x-tree-panel .x-column-header-open:after {
    border-color: #212121 !important;
}

.x-tree-panel .x-column-header-text-inner,
.x-tree-panel .x-column-header-text-inner:after {
    color: #212121 !important;
}

.x-menu-item-default.x-menu-item-active {
    background-color: #F7F7F7 !important;
}

.x-tree-panel .x-panel-body .x-grid-item-over {
    background-color: #F7F7F7 !important;
}

.x-tree-panel .x-panel-body .x-grid-item-selected {
    background-color: #F7F7F7 !important;
}

.x-tree-panel .x-grid-cell-inner:before {
    border-color: #212121 !important;
}

.x-grid-row .x-tree-expander {
    color: #176DC2 !important;
}

.left-nav-admin-menu .x-panel-header-title .x-title-text {
    color: black !important;
}

.x-grid-tree-node-leaf .x-tree-elbow-img {
    color: #212121 !important;
}

.x-grid-cell-inner-treecolumn .x-tree-icon {
    color: #176DC2 !important;
}

.x-tree-checkbox {
    color: #176DC2;
}
/* End of Archer Tree Panel */

/* Archer Grid Panel */
.x-grid {
    border-color: transparent !important;
}

.x-grid .x-panel-header-default {
    background-color: #C7C7C7 !important;
}

.x-grid .x-title-text {
    color: #212121 !important;
}

.x-grid .x-column-header {
    border-color: #CFCFCF !important;
}

.x-grid .x-column-header-over:after {
    border-color: #212121 !important;
}

.x-grid .x-column-header-focus:after {
    border-color: #212121 !important;
}

.x-grid .x-column-header.x-column-header-focus .x-column-header-inner:after {
    border-color: #212121 !important;
}

.x-grid .x-column-header-open:after {
    border-color: #212121 !important;
}

.x-grid .x-column-header-text-inner {
    color: #212121 !important;
}

.x-grid .x-panel-body .x-grid-item-over {
    background-color: #F7F7F7 !important;
}

.x-grid .x-panel-body .x-grid-item-selected {
    background-color: #F7F7F7 !important;
}

.x-box-item.x-window-text.x-component-default,
.x-box-item.x-window-text.x-component-default:hover {
    color: #00617F !important;
}

.addSecondaryColor {
    color: #176DC2 !important;
}

.advSearchButton .x-btn-inner-default-toolbar-small {
    font-family: "Open Sans", sans-serif !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    line-height: 28px;
    text-transform: uppercase !important;
    height: inherit;
    padding: 0px 12px;
    border-radius: 3px 3px;
    margin-right: 0 !important;
    background: #176DC2 !important;
    color: #fff !important;
	cursor: pointer;
    display: inline-block
}

.advSearchButton .x-btn-inner-default-toolbar-small:hover {
    border-radius: 3px !important;
    background: #0d47a1 !important
}

.advSearchButton.x-btn-default-toolbar-small {
    padding: 3px 0px;
	border: none !important;
}

.advSearchToolbar.x-toolbar-default {
    padding-left: 6px !important;
}

.addSecondaryColor .x-box-item.x-component-default:hover {
    color: #0d47a1 !important;
}
.x-grid .x-grid-cell-inner:before {
    border-color: #212121 !important;
}

.x-grid-item-focused {
    border-color: #212121 !important;
}

.x-grid .x-panel-body .x-grid-with-row-lines .x-grid-item,
.x-grid .x-panel-body .x-grid-with-row-lines .x-grid-item.x-grid-item-selected,
.x-grid .x-panel-body .x-grid-with-row-lines .x-grid-item.x-grid-item-selected + .x-grid-item {
    border-color: #CECECE !important;
}

.x-grid-body {
    background-color: white !important;
}

.left-nav-admin-menu .x-panel-header {
    background-color: white !important;
}

.x-grid-filters-find .x-form-item-label-inner {
    color: #212121 !important;
    cursor: pointer;
}

.x-grid .x-grid-header-ct * {
    background-color: #C2C2C2 !important;    
}

.x-grid-empty {
	color: black;
}
/* End of Archer Grid Panel */

/* Archer Component Menu */
.x-menu-body .x-menu-item .x-hmenu-sort-asc,
.x-menu-body .x-menu-item .x-hmenu-sort-desc,
.x-menu-body .x-menu-item .x-menu-item-arrow,
.x-menu-body .x-menu-item .x-menu-item-checkbox,
.x-menu-body .x-menu-item .x-cols-icon,
.x-menu-body .x-menu-item .x-group-by-icon {
    color: #176DC2 !important;
}
/* End of Archer Component Menu*/

/* Archer TinyMCE Text Area */
.x-form-trigger-wrap,
.mce-tinymce.mce-panel {
     border-color: #00BCFF !important; 
}

.mce-menubar {
    background-color: #00BCFF !important;
}

.mce-menubar, .mce-toolbar-grp, .mce-edit-area, .mce-statusbar {
    border-color: #212121 !important;
}

.mce-menubar .mce-menubtn button span {
    color: #212121 !important;
}

.mce-menubar .mce-menubtn button i {
    border-top-color: #212121 !important;
}

.mce-menubar .mce-menubtn:hover,
.mce-menubar .mce-menubtn:focus {
    background-color: #F7F7F7 !important;
}

.mce-toolbar-grp .mce-btn {
    border-color: #ADADAD !important;
    background-color: #F7F7F7 !important;
}

.mce-toolbar-grp .mce-btn:hover {
    background-color: #C7C7C7 !important;
}

.mce-toolbar-grp .mce-btn.mce-disabled button:hover {
    background-color: #DBDBDB !important;
}

.mce-toolbar-grp .mce-btn button:hover {
    background-color: #C7C7C7 !important;
}

.mce-toolbar-grp .mce-btn button .mce-ico,
.mce-toolbar-grp .mce-btn button span,
.mce-toolbar-grp .mce-btn button .mce-caret {
    color: #212121 !important;
    border-top-color: #212121 !important;
}

.mce-statusbar .mce-label,
.mce-statusbar .mce-path-item,
.mce-statusbar .mce-divider {
    color: #212121 !important;
}

.mce-combobox .mce-textbox {
    border-color: #ADADAD !important;
    color: #212121 !important;
}

.mce-container.mce-menu .mce-menu-item:hover,
.mce-container.mce-menu .mce-menu-item.mce-menu-item-expand.mce-selected {
    background-color: #EDEDEE !important;
}

.mce-container.mce-menu .mce-menu-item:hover .mce-ico,
.mce-container.mce-menu .mce-menu-item:hover .mce-text,
.mce-container.mce-menu .mce-menu-item:hover .mce-menu-shortcut,
.mce-container.mce-menu .mce-menu-item.mce-active .mce-ico,
.mce-container.mce-menu .mce-menu-item.mce-active .mce-text,
.mce-container.mce-menu .mce-menu-item.mce-active .mce-menu-shortcut,
.mce-container.mce-menu .mce-menu-item.mce-menu-item-expand.mce-selected .mce-ico,
.mce-container.mce-menu .mce-menu-item.mce-menu-item-expand.mce-selected .mce-text,
.mce-container.mce-menu .mce-menu-item.mce-menu-item-expand.mce-selected .mce-caret {
    color: #212121 !important;
    border-left-color: #212121 !important;
}

.mce-container.mce-menu .mce-menu-item.mce-active,
.mce-container.mce-menu .mce-menu-item.mce-active:hover {
    background-color: #555C66 !important;
}
.mce-container.mce-menu .mce-grid .mce-active {
    background-color: #F7F7F7 !important;
}

.x-docked {
    z-index: auto !important;
}  

.x-box-layout-ct {
    overflow: initial;
}

.tox.tox-platform-ie .tox-dialog-wrap {
    position: -ms-page !important;
}

.tox-dialog-wrap {
    z-index: 19001 !important;
}

.tox .tox-dialog--width-lg {
    z-index: 19002 !important;
}

.tox-tinymce-inline {
    z-index: 19000 !important;
}

.tox-tinymce-aux {
    z-index: 19000 !important;
}

.tox-menu {
    z-index: 19001 !important;
}

/* End of Archer TinyMCE Text Area */

/* Archer Checkbox */
.x-form-type-checkbox .x-form-checkbox {
    color: #176DC2 !important;
}
/* End of Archer Checkbox */

/* Archer Grid Cell Check Column */
.x-grid-checkcolumn:after {
    color: #176DC2 !important;
}

.x-column-header-checkbox:after {
    color: #176DC2 !important;
}

/* End of Archer Grid Cell Check Column */

/* Archer Grid Cell Row Checker Check Box */
.x-column-header-checkbox .x-column-header-text,
.x-grid-body .x-grid-cell-row-checker .x-grid-row-checker {
    color: #176DC2 !important;
}
/* End of Archer Grid Cell Row Checker Check Box */

/* Archer Radio Button */
.x-form-type-radio .x-form-radio {
    color: #176DC2 !important;
}
/* End of Archer Radio Button */

/* Archer Grid Cell Radio Column */
.x-grid-cell-radiocolumn .x-grid-radiocolumn {
    color: #176DC2 !important;
}

.x-btn-icon-el-textbutton-medium{
    color: #176DC2 !important;
}

/* End of Archer Grid Cell Radio Column */

/* Archer Tab Panel */
.x-panel .x-tab-bar-top .x-tab-bar-strip {
    background-color: #9c9c9c !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab {
    background-color: #EEEEEE !important;
    border-color: #9c9c9c !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab.x-tab-active {
    background-color: white !important;
    border-color: #9c9c9c !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab.x-tab-focus {
    border-color: #9c9c9c !important;
    box-shadow: 0px -1px 0px #212121 inset !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab.x-tab-over {
    border-color: #9c9c9c !important;
    box-shadow: 0px -1px 0px #212121 inset !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab.x-tab-active.x-tab-over {
    border-color: #9c9c9c !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab.x-tab-active.x-tab-focus.x-tab-over {
    border-color: #9c9c9c !important;
    box-shadow: 0px -1px 0px #212121 inset !important;
}

.x-panel .x-tab-bar-top .x-tab-bar-body .x-tab .x-tab-inner {
    color: #212121 !important;
}
/* End of Archer Tab Panel */


.iview-preview label {
    background-color: #00BCFF !important;
}

/* Archer focus classes */
.x-form-trigger-wrap-focus {
    border: 1px solid #085590 !important;
    outline: none !important;
} 
.x-tool-focus {
    outline: 1px solid #085590 !important;
    outline-offset: 1px !important;
    border-color: transparent !important;
}

.x-form-radio.x-field-form-checkbox-focus {
    /* Used for radio buttons */
    outline: 1px solid #085590 !important;
    outline-offset: 1px !important;
    border-color: transparent !important;
}

.x-form-checkbox.x-form-checkbox-focus {
    /* Used for checkboxes */
    border-color: #085590 !important;
    outline: none !important;
}
/* End of Archer focus classes*/

.app-footer{
    background-color: #212121;
}

.left-nav-admin-menu .x-panel-header,.left-nav-admin-menu .x-grid-td,.left-nav-admin-menu .x-tree-view {
    background-color: #FFFFFF;
    color: black;
}

.left-nav-admin-menu table:first-child td{
    border-top-color:transparent !important;
}

.x-panel-header-default-vertical .x-panel-header-title-default > .x-title-text-default{
   transform:rotate(180deg);
   position:relative;
   bottom:0;
   text-align:right;
   display:block;
   margin-left: 4px;
   -webkit-transform: rotate(180deg);
   -moz-transform: rotate(180deg);
   -ms-transform: rotate(180deg);
}

.x-panel-header-default-horizontal.x-header-noborder{
    padding: 10px 10px 10px 22px;
}

.left-nav-admin-menu .x-grid-tree-node-leaf .x-tree-node-text{
    margin-left: -31px;
}

.left-nav-admin-menu .x-tree-view {
    margin: 0px 8px 0px 16px;
}
.adminMenuIcon .x-tool-collapse-left{
font: 20px/1 rsa-icons;
background: none !important;
margin-top: -1px;
transform: rotate(90deg);
-webkit-transform: rotate(90deg);
-moz-transform: rotate(90deg);
-ms-transform: rotate(90deg);
-o-transform: rotate(90deg);
}
.adminMenuIcon .x-tool-collapse-left:before{
content:"\e930";
}
.x-panel-header-default-vertical .x-tool-expand-right
{
font: 20px/1 rsa-icons;
background: none !important;
margin-top: -1px;
transform: rotate(90deg);
-webkit-transform: rotate(90deg);
-moz-transform: rotate(90deg);
-ms-transform: rotate(90deg);
-o-transform: rotate(90deg);
}
.x-panel-header-default-vertical .x-tool-expand-right:before
{
content:"\e92f";	
}

.x-panel-header-title-default{
    color:#212121;
    font-size:1rem;
    font-weight:bold;
    font-family:lato, sans-serif;
    line-height:16px;
}

.rsa-version {
    color: white;
}

.rsa-loading {
    min-height: 50px;
    min-width: 50px;
}
/*   Start of rsa headerbutton */

.x-btn-inner-headerbutton-medium{ /* button text color*/
    color: #176DC2 !important
}

/* End of rsa headerbutton */

/* Start of rsa iframe */

.iframe-fullscreen {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1001
}

.left-nav-admin-menu.no-opacity {
  /* Used to prevent left nav admin menu from overlapping full screen advanced workflow designer */
  opacity: 0;
}

/* End of rsa iframe */

/* Archer Rad Spell */
.RadWindow .rwTitleRow,
.RadWindow .rwContentRow {
    background-color: #E0E0E0;
}

.RadWindow .rwTitleRow .rwTitlebarControls em {
    color: #212121 !important;
}

.RadWindow .rwTitleRow .rwTitlebarControls .rwCloseButton {
    color: #176DC2 !important;
}

.left-nav-admin-menu .x-grid-item-selected {
    background-color: #E0E0E0 !important;
}

.left-nav-admin-menu .x-grid-item-over {
    background-color: #F7F7F7;
}

.left-nav-admin-menu .x-tree-expander:after {
    color: #212121 !important;
}

.left-nav-admin-menu .x-tree-expander-over .x-tree-expander:after {
    color: #212121 !important;
}

.left-nav-admin-menu .x-grid-tree-node-expanded .x-tree-expander:after {
    color: #212121 !important;
}

.left-nav-admin-menu .x-grid-tree-node-expanded .x-tree-expander-over .x-tree-expander:after {
    color: #212121 !important;
}

.record-browser-toolbar {
    background-color: #F7F7F7 !important;
    border-left: 2px solid#C7C7C7;
    border-top: 1px solid#C7C7C7;
}

.non-editable-field {
    background-color: #CCC;
}

.search-application-grid .x-grid-item-focused {
    border: 1px solid #212121 !important;
    box-shadow: inset 0 0 7px #E6E6E6;
}

.search-application-grid .non-editable-field.x-grid-cell.x-grid-item-focused {
    border: 0 solid transparent !important;
    /*border-right: 0 solid transparent !important;
    border-top: 0 solid transparent !important;*/
    border-bottom: 1px solid #ebf3f7 !important;
}

.destructive-action-buttons .x-btn-inner,
.destructive-action-buttons .x-btn-glyph {
    color: #993A3C !important;
}

.record-action-container .x-btn-ToolbarButton-medium {
    background-color: #FFFFFF !important;
    margin: 0 5px 0 5px;
    padding: 5px;
}

.record-action-container .x-btn-over.x-btn-ToolbarButton-medium {
    background-color: #FFFFFF !important;
}

.record-action-container .x-btn-disabled.x-btn-ToolbarButton-medium {
    opacity: 0.35 !important;
}

.destructive-action-buttons.x-btn.x-btn-disabled.x-btn-ToolbarButton-medium .x-btn-inner,
.destructive-action-buttons.x-btn-ToolbarButton-medium.x-item-disabled .x-btn-glyph {
    color: #993A3C !important;
    opacity: 0.35 !important;
}

.record-action-container .destructive-action-buttons.x-btn-over {
    background-color: #FFD9D9 !important;
    border: 1px solid #E0A4A5 !important;
}

.walkup-search-main .search-application-filter .x-panel-header-default {
    background-color: #F7F7F7;
}

.walkup-search-main .search-application-filter .x-panel-header-title-default {
    color: #212121 !important;
}

    .walkup-search-main .search-application-filter .x-panel-header-title-default > .x-title-text-default {
        padding: 28px 0 0 15px;
    }

.x-btn-icon-el-ToolbarButton-medium {
    font-size: 16px;
}

.x-btn-icon-el-ToolbarDiscardButton-medium {
    font-size: 16px;
}

.search-application-grid .x-grid-item-alt {
    background-color: #DEDEDE !important;
}

.x-panel-header-default {
    background-color:#fff;
}

.search-box-view-all {
    color:#212121 !important;
}

.clear-text{
    color: white;
    opacity: 0.6;
}

.search-box .x-form-trigger-wrap *{
    color:white;
}

.x-btn-SearchBoxSearch-large .x-btn-glyph {
    color: white;
}

.x-ie8m .x-btn-SearchBoxSearch-large .x-btn-glyph {
    color: white;
}

.loader {
    border:2px solid rgba(255,255,255,0.5);
    border-top: 2px solid white;
}

.search-box-combobox input::placeholder {
    color:white;
    opacity: 0.5;
}

.search-box .search-box-container .search-box-cancel:focus{
    border: 1px solid white;
}

.search-box .search-box-container .search-box-search:focus{
    border: 1px solid white;
}

.x-keyboard-mode .x-btn-focus.x-btn-SearchBoxSearch-large {
    box-shadow: none; 
    -webkit-box-shadow: none; 
    -moz-box-shadow: none;      
}

.x-keyboard-mode .x-btn-focus.x-btn-SearchBoxCancel-large {
    box-shadow: none; 
    -webkit-box-shadow: none; 
    -moz-box-shadow: none;      
}

.x-btn-inner-SearchBoxCancel-large {
    padding: 0px;
}

.x-keyboard-mode .x-btn-focus.x-btn-default-small,
.x-keyboard-mode .x-btn-focus.x-btn-basebutton-large,
.x-keyboard-mode .x-btn-focus.x-btn-basebutton-medium,
.x-keyboard-mode .x-btn-focus.x-btn-default-toolbar-small,
.x-keyboard-mode .x-btn-focus.x-form-file-input,
.x-keyboard-mode .x-btn-focus.x-btn-ActionsCancelButton-medium {
    background-color: rgba(23,109,194,0.07) !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
}

.x-box-inner {
   overflow: inherit;     
}

/*Color picker ok-cancel button*/

button.sp-choose.x-btn-basebutton-medium {
    background-image: -webkit-linear-gradient(top,#176dc2,#176dc2) !important;
    background-image: -moz-linear-gradient(top, #176dc2, #176dc2) !important;
    background-image: -ms-linear-gradient(top, #176dc2, #176dc2) !important;
    background-image: -o-linear-gradient(top, #176dc2, #176dc2) !important;
    background-image: linear-gradient(to bottom, #176dc2, #176dc2) !important;
    border-color: #176DC2 !important;
    color: #fff !important;
    text-shadow: none !important;
}

    button.sp-choose.x-btn-basebutton-medium:hover,
    button.sp-choose.x-btn-basebutton-medium:focus {
        background-image: -webkit-linear-gradient(top,#0d47a1,#0d47a1) !important;
        background-image: -moz-linear-gradient(top, #0d47a1, #0d47a1) !important;
        background-image: -ms-linear-gradient(top, #0d47a1, #0d47a1) !important;
        background-image: -o-linear-gradient(top, #0d47a1, #0d47a1) !important;
        background-image: linear-gradient(to bottom, #0d47a1, #0d47a1) !important;
        border-color: #0d47a1 !important;
        color: #fff !important;
        text-shadow: none !important;
    }

button.x-btn-basebutton-medium.sp-cancel-custom {
    color: #176DC2 !important;
}

    button.x-btn-basebutton-medium.sp-cancel-custom:hover,
    button.x-btn-basebutton-medium.sp-cancel-custom:focus {
        color: #0d47a1 !important;
    }

.sp-cancel-custom {
    border-color: #176DC2 !important;
    text-shadow: none !important;
    margin-left: -36px;
    /*color:#176DC2 !important;*/
}

    .sp-cancel-custom:hover,
    .sp-cancel-custom:focus {
        border-color: #0d47a1 !important;
        /*color: #0d47a1 !important;*/
        text-decoration: none !important;
    }

.sp-choose {
    color: #176DC2 !important;
}

    .sp-choose:hover {
        background-color: #176DC2 !important;
    }

.tox .tox-menu {
    z-index: 99999 !important;
}

.tox .tox-tooltip {
    z-index: 100000 !important;
}

