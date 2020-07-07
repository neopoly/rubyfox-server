/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-12"],{

/***/ "./src/components/sidebar-layout.js":
/*!******************************************!*\
  !*** ./src/components/sidebar-layout.js ***!
  \******************************************/
/*! exports provided: SidebarLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarLayout", function() { return SidebarLayout; });
class SidebarLayout extends HTMLElement
{
	constructor()
	{
	    super();

		// Attach a shadow root
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				:host {
					display: flex;
					flex-direction: row;
				}

				@media (max-width: 575.98px) {
					:host(.split-xs) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-xs) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 767.98px) {
					:host(.split-sm) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-sm) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 991.98px) {
					:host(.split-md) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-md) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 1199.98px) {
					:host(.split-lg) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-lg) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				.side-col::slotted(*) {
				}

				.main-col::slotted(*) {
					flex-grow: 1;
				}
			</style>

			<slot class="side-col" name="side-column"></slot>
			<slot class="main-col" name="main-column"></slot>
		`;

		// Set initial selection
		this.selectedIndex = 0;
	}

	get selectedPanel()
	{
		return this._selectedPanel;
	}

	set selectedPanel(element) // 'side' or 'main'
	{
		if (element != null && element.parentNode == this)
		{
			this._selectedPanel = element;

			for (let element of this.children)
			{
				if (element == this._selectedPanel)
					element.setAttribute('aria-selected', 'true');
				else
					element.removeAttribute('aria-selected');
			}
		}
		else
		{
			console.error('Element is not a child of SidebarLayout');
		}
	}

	get selectedIndex()
	{
		return Array.from(this.children).indexOf(this._selectedPanel);
	}

	set selectedIndex(index)
	{
		if (this.children.length > 0)
		{
			if (this.children[index] == null)
			{
				console.error('Invalid SidebarLayout index');
				return;
			}

			let element = this.children[index];
			this.selectedPanel = element;
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('sidebar-layout'))
	window.customElements.define('sidebar-layout', SidebarLayout);


/***/ }),

/***/ "./src/modules/zone-configurator.js":
/*!******************************************!*\
  !*** ./src/modules/zone-configurator.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoneConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _components_view_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/view-stack */ "./src/components/view-stack.js");
/* harmony import */ var _components_sidebar_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/sidebar-layout */ "./src/components/sidebar-layout.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");






class ZoneConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('zoneConfig');

		this.ITEM_TYPE_ZONE = 'zone';
		this.ITEM_TYPE_ROOM = 'room';

		// Outgoing requests
		this.REQ_GET_ZONES = 'getZones';

		this.REQ_GET_ZONE_CONFIG = 'getZoneConfig';
		this.REQ_SAVE_ZONE_CONFIG = 'saveZoneConfig';
		this.REQ_NEW_ZONE_CONFIG = 'newZoneConfig';
		this.REQ_DELETE_ZONE_CONFIG = 'delZoneConfig';
		this.REQ_ACTIVATE_ZONE = 'actZone';

		this.REQ_GET_ROOM_CONFIG = 'getRoomConfig';
		this.REQ_SAVE_ROOM_CONFIG = 'saveRoomConfig';
		this.REQ_NEW_ROOM_CONFIG = 'newRoomConfig';
		this.REQ_DELETE_ROOM_CONFIG = 'delRoomConfig';

		// Incoming responses
		this.RESP_ZONES = 'zones';

		this.RESP_ZONE_CONFIG = 'zoneConfig';
		this.RESP_ZONE_CONFIG_UPDATE_CONFIRM = 'zoneCfgUpd';
		this.RESP_ZONE_ADDED = 'zoneAdded';
		this.RESP_ZONE_REFUSED = 'zoneRefused';
		this.RESP_ZONE_DELETED = 'zoneDel';
		this.RESP_ZONE_ACTIVATED = 'zoneAct';
		this.RESP_ZONE_ACTIVATION_ERROR = 'zoneActErr';

		this.RESP_ROOM_CONFIG = 'roomConfig';
		this.RESP_ROOM_CONFIG_UPDATE_CONFIRM = 'roomCfgUpd';
		this.RESP_ROOM_ADDED = 'roomAdded';
		this.RESP_ROOM_REFUSED = 'roomRefused';
		this.RESP_ROOM_DELETED = 'roomDel';
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	// This methods override those in BaseModule class.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

		// Create interface builder instance
		this._interfaceBuilder = new _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_3__["ConfigInterfaceBuilder"]();

		// Set listener for custom actions triggered by configuration interface
		$('#znc-tabNavigator').on('value-set', $.proxy(this._onConfigValueSet, this));

		// Initialize Zones/Rooms treeview
		this._treeview = $('#znc-treeView').kendoTreeView({
			loadOnDemand: false,
			dataTextField: 'name',
			template: kendo.template('<span class="# if (!item.active) { # inactive-list-item # } #">#: item.name #</span>'),
			change: $.proxy(this._onZoneRoomChange, this),
		}).data('kendoTreeView');

		// Lestend to treeview double-click event
		$('#znc-treeView').on('dblclick', $.proxy(this._onTreeItemDoubleClick, this));

		// Request zones & rooms list to server instance
		this.sendExtensionRequest(this.REQ_GET_ZONES);

		// Initialize progress bar
		$('#znc-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Add listeners to utility buttons
		$('#znc-addZoneButton').on('click', $.proxy(this._onAddZoneClick, this));
		$('#znc-addRoomButton').on('click', $.proxy(this._onAddRoomClick, this));
		$('#znc-editButton').on('click', $.proxy(this._onEditClick, this));
		$('#znc-removeButton').on('click', $.proxy(this._onRemoveClick, this));
		$('#znc-activateButton').on('click', $.proxy(this._onActivateClick, this));

		// Add listener to interface buttons
		$('#znc-cancelButton').on('click', $.proxy(this._onCancelClick, this));
		$('#znc-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#znc-submitButton').on('click', $.proxy(this._onSubmitClick, this));
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Remove tree view doubleclick listener
		$('#znc-treeView').off('dblclick');

		// Remove listener for custom actions triggered by configuration interface
		$('#znc-tabNavigator').off('value-set');

		// Remove listener for zone/room activation event
		$('#znc-addZoneButton').off('click');
		$('#znc-addRoomButton').off('click');
		$('#znc-editButton').off('click');
		$('#znc-removeButton').off('click');
		$('#znc-activateButton').off('click');

		// Remove interface buttons click listeners
		$('#znc-cancelButton').off('click');
		$('#znc-reloadButton').off('click');
		$('#znc-submitButton').off('click');

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		const username = data.getUtfString('user');

		/****** ZONES & ROOMS ******/

		// Zones & rooms list received
		if (command == this.RESP_ZONES)
			this._populateTree(data);

		// Zone or room configuration data received
		else if (command == this.RESP_ZONE_CONFIG || command == this.RESP_ROOM_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'znc-tabNavigator', false);

			// Enable scrolling tabs (if needed)
			if (this._reinitTabs)
			{
				$('#znc-tabNavigator #tabs').scrollingTabs({
					bootstrapVersion: 4,
					scrollToTabEdge: true,
					enableSwiping: true,
					disableScrollArrowsOnFullyScrolled: true,
					cssClassLeftArrow: 'fa fa-chevron-left',
					cssClassRightArrow: 'fa fa-chevron-right'
				});
			}

			// Enable interface
			this._enableConfigInterface(true);
		}

		/****** ZONES ******/

		// Zone configuration update confirmation
		else if (command == this.RESP_ZONE_CONFIG_UPDATE_CONFIRM)
		{
			// If a 'name' parameter is received, it means the zone name changed, and we have to update the zones list
			if (data.getUtfString('zName') != null)
				this._updateZoneNameInList(data.getInt('zId'), data.getUtfString('zName'));

			// If the current user is the updater, show a notification; otherwise, show a dialog box suggesting to reload
			if (username == this.smartFox.mySelf.name)
			{
				// Enable interface
				this._enableConfigInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Zone modified', `Zone settings updated successfully; changes will be applied on next <strong>server restart</strong>`);

				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same zone
				if (data.getInt('zId') == this._editedZoneId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has modified the Zone you are currently editing; please reload to update your view.`);

					// Disable submit button
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					if (data.getUtfString('zName') != null)
						this.shellCtrl.showNotification('Zone renamed', `Administrator ${username} has changed the name on one of the Zones`);
				}
			}
		}

		// New zone added
		else if (command == this.RESP_ZONE_ADDED)
		{
			const zoneName = data.getSFSObject('zone').getUtfString('name');

			// If the current user is the updater, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Reset interface
				this._onCancelClick();

				// Display notification
				this.shellCtrl.showNotification('Zone added', `Zone '${zoneName}' created successfully`);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification('Zone added', `Administrator ${username} created Zone '${zoneName}'`);
			}

			// Add new zone to tree
			let zonesDS = this._treeview.dataSource;
			zonesDS.add(this._createZoneObject(data.getSFSObject('zone')));
			zonesDS.sync();
		}

		// New zone creation refused due to invalid zone name
		else if (command == this.RESP_ZONE_REFUSED)
		{
			// Re-enable interface
			this._enableConfigInterface(true);

			// Show warning
			this.shellCtrl.showSimpleAlert('Zone configuration can\'t be saved because another Zone with the same name already exists.', true);
		}

		// Existing zone deleted
		else if (command == this.RESP_ZONE_DELETED)
		{
			// If the current user is the deleter, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Re-enable interface
				this._enableListInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Zone removed', `Zone '${data.getUtfString('zName')}' deleted successfully`);
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same zone
				if (data.getInt('zId') == this._editedZoneId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has deleted the Zone you are currently modifying; you have to cancel your editing.`);

					// Disable submit and reload buttons
					$('#znc-reloadButton').attr('disabled', true);
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					this.shellCtrl.showNotification('Zone removed', `Administrator ${username} deleted Zone '${data.getUtfString('zName')}'`);
				}
			}

			// Reset selection if the currently selected item or its parent is being removed
			let selectedNode = this._treeview.select();
			let selectedDataItem = this._treeview.dataItem(selectedNode);
			if (selectedDataItem)
			{
				if (selectedDataItem.type == this.ITEM_TYPE_ZONE && selectedDataItem.id == data.getInt('zId'))
					this._deselectTreeItem();

				if (selectedDataItem.type == this.ITEM_TYPE_ROOM)
				{
					let parentDataItem = this._treeview.dataItem(this._treeview.parent(selectedNode));

					if (parentDataItem.id == data.getInt('zId'))
						this._deselectTreeItem();
				}
			}

			// Remove zone from tree
			let dataItem = this._getZoneDataItemById(data.getInt('zId'));
			let zonesDS = this._treeview.dataSource;
			zonesDS.remove(dataItem);
			zonesDS.sync();
		}

		// Zone activated
		else if (command == this.RESP_ZONE_ACTIVATED)
		{
			// Set zone activation status
			const zoneName = this._setZoneActivationStatus(data.getInt('zId'), data.getUtfString('actRooms'), true);

			// Display notification
			if (username == this.smartFox.mySelf.name)
				this.shellCtrl.showNotification('Zone activated', `Zone '${zoneName}' activated successfully`);
			else
				this.shellCtrl.showNotification('Zone activated', `Administrator ${username} activated Zone '${zoneName}'`);
		}

		// Zone activation error
		else if (command == this.RESP_ZONE_ACTIVATION_ERROR)
		{
			// Set zone activation status
			this._setZoneActivationStatus(data.getInt('zId'), '', false);

			// Show alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'), true);
		}

		/****** ROOMS ******/

		// Room configuration update confirmation
		else if (command == this.RESP_ROOM_CONFIG_UPDATE_CONFIRM)
		{
			if (data.getUtfString('rName') != null)
				this._updateRoomNameInList(data.getInt('zId'), data.getInt('rId'), data.getUtfString('rName'));

			// If the current user is the updater, show a notification; otherwise, show a dialog box suggesting to reload
			if (username == this.smartFox.mySelf.name)
			{
				// Enable interface
				this._enableConfigInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Room modified', `Room settings updated successfully; changes will be applied on next <strong>server restart</strong>`);

				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same room
				if (data.getInt('rId') == this._editedRoomId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has modified the Room you are currently editing; please reload to update your view.`);

					// Disable submit button
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					if (data.getUtfString('rName') != null)
						this.shellCtrl.showNotification('Room renamed', `Administrator ${username} has changed the name on one of the Rooms`);
				}
			}
		}

		// New room added
		else if (command == this.RESP_ROOM_ADDED)
		{
			const roomData = data.getSFSObject('room');
			const zoneId = data.getInt('zId');

			let zonesDS = this._treeview.dataSource;
			let zoneItem = zonesDS.get(zoneId);

			// If the current user is the updater, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Reset interface
				this._onCancelClick();

				// Display notification
				this.shellCtrl.showNotification('Room added', `Room '${roomData.getUtfString('name')}' created successfully`);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification('Room added', `Administrator ${username} created Room '${roomData.getUtfString('name')}' in Zone '${zoneItem.name}'`);
			}

			// Add new room to tree
			zoneItem.append(this._createRoomObject(roomData, zoneId));
			zonesDS.sync();

			// Expand zone node where room was added
			this._treeview.expand(this._treeview.select());
		}

		// New room creation refused due to invalid room name
		else if (command == this.RESP_ROOM_REFUSED)
		{
			// Re-enable interface
			this._enableConfigInterface(true);

			// Show warning
			this.shellCtrl.showSimpleAlert('Room configuration can\'t be saved because another Room with the same name already exists.', true);
		}

		// Existing room deleted
		else if (command == this.RESP_ROOM_DELETED)
		{
			let zoneItem = this._getZoneDataItemById(data.getInt('zId'));
			let roomItem = this._getRoomDataItemById(data.getInt('zId'), data.getInt('rId'));

			// If the current user is the deleter, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Re-enable interface
				this._enableListInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Room removed', `Room '${roomItem.name}' deleted successfully`);
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same room
				if (data.getInt('rId') == this._editedRoomId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has deleted the Room you are currently modifying; you have to cancel your editing.`);

					// Disable submit and reload buttons
					$('#znc-reloadButton').attr('disabled', true);
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					this.shellCtrl.showNotification('Room removed', `Administrator ${username} deleted Room '${roomItem.name}' from Zone '${zoneItem.name}'`);
				}
			}

			// Reset selection if the currently selected item or its parent is being removed
			let selectedNode = this._treeview.select();
			let selectedDataItem = this._treeview.dataItem(selectedNode);
			if (selectedDataItem)
			{
				if (selectedDataItem.type == this.ITEM_TYPE_ROOM && selectedDataItem.id == data.getInt('rId'))
					this._deselectTreeItem();
			}

			// Remove room from tree
			zoneItem.children.remove(roomItem);
			this._treeview.dataSource.sync();
		}

		// else if ()
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onTreeItemDoubleClick(e)
	{
		// Get event target's closest tree node
		let treeNode = $(e.target).closest('.k-item[role=treeitem]');

		// Get associated data item
		let dataItem = this._treeview.dataItem(treeNode);

		// Load configuration
		this._loadConfiguration(dataItem.type);
	}

	_onZoneRoomChange()
	{
		// Reset utility buttons
		this._setUtilityButtonsState(this._selectedItem);
	}

	// Utility buttons listeners

	_onAddZoneClick()
	{
		// Deselect list item
		this._deselectTreeItem();

		// Load configuration
		this._loadConfiguration(this.ITEM_TYPE_ZONE);
	}

	_onAddRoomClick()
	{
		// Select parent list item
		this._selectParentTreeItem();

		// Load configuration
		this._loadConfiguration(this.ITEM_TYPE_ROOM);
	}

	_onEditClick()
	{
		// Load configuration
		this._loadConfiguration(this._selectedItem.type);
	}

	_onRemoveClick()
	{
		this.shellCtrl.showConfirmWarning(`Are you sure you want to delete the selected ${this._selectedItem.type == this.ITEM_TYPE_ZONE ? 'Zone' : 'Room'} configuration?`, $.proxy(this._onRemoveConfirm, this));
	}

	_onRemoveConfirm()
	{
		// Disable zone/room selection list
		this._enableListInterface(false);

		let params = new SFS2X.SFSObject();

		// Request zone removal
		if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
		{
			params.putInt('zId', this._selectedItem.id);
			this.sendExtensionRequest(this.REQ_DELETE_ZONE_CONFIG, params);
		}
		else
		{
			params.putInt('zId', this._selectedItemParent.id);
			params.putInt('rId', this._selectedItem.id);
			this.sendExtensionRequest(this.REQ_DELETE_ROOM_CONFIG, params);
		}
	}

	_onActivateClick()
	{
		// Get selected data item
		if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
		{
			let params = new SFS2X.SFSObject();
			params.putInt('zId', this._selectedItem.id);

			this.sendExtensionRequest(this.REQ_ACTIVATE_ZONE, params);
		}
	}

	// Configuration buttons listeners

	_onCancelClick()
	{
		// Enable zone/room selection lists
		this._enableListInterface(true);

		// Disable configuration interface
		this._enableConfigInterface(false);

		// Clear main container
		this._resetTabsContainer(false, true);

		// Set isEditing flag
		this._isEditing = false;
		this._editedItemType = '';

		// Switch panel
		this._switchPanel('znc-sidebarPanel');
	}

	_onReloadClick()
	{
		// Hide validation messages
		this._interfaceBuilder.resetValidation();

		// Reload configuration
		this._loadConfiguration(this._editedItemType, false);
	}

	_onSubmitClick()
	{
		// Check validity
		if (this._interfaceBuilder.checkIsValid())
		{
			let changes = this._interfaceBuilder.getChangedData();

			if (changes.size() > 0)
			{
				//console.log(changes.getDump())

				// In case the zone/room name changed, check it against the list (duplicate names not allowed!)
				if (this._validateName(changes))
				{
					// Disable configuration interface
					this._enableConfigInterface(false);

					// Send settings to server instance
					let params = new SFS2X.SFSObject();
					params.putSFSArray('settings', changes);
					params.putBool('backup', $('#znc-backupCheck').prop('checked'));
					params.putInt('zId', this._editedZoneId);
					params.putInt('rId', this._editedRoomId);

					if (this._editedItemType == this.ITEM_TYPE_ZONE)
					{
						// Submit zone settings
						if (this._editedZoneId > -1)
							this.sendExtensionRequest(this.REQ_SAVE_ZONE_CONFIG, params);
						else
							this.sendExtensionRequest(this.REQ_NEW_ZONE_CONFIG, params);
					}
					else
					{
						// Submit room settings
						if (this._editedRoomId > -1)
							this.sendExtensionRequest(this.REQ_SAVE_ROOM_CONFIG, params);
						else
							this.sendExtensionRequest(this.REQ_NEW_ROOM_CONFIG, params);
					}
				}
				else
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Unable to submit configuration because the ${Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["capitalizeFirst"])(this._editedItemType)} name already exists; duplicate names are not allowed.`, true);
				}
			}
		}
		else
		{
			// Show alert
			this.shellCtrl.showSimpleAlert('Unable to submit configuration changes due to an invalid value; please verify the highlighted form fields in all tabs.', true);
		}
	}

	_onConfigValueSet(e) // SAME METHOD DUPLICATED IN zone-monitor.js
	{
		const configParam = e.target.data;

		// Handle extension name/type dropdowns update and update the main class dropdown datasource accordingly
		if (configParam.name == 'extension.name' || configParam.name == 'extension.type' || configParam.name == 'extension.filterClass')
		{
			// All involved ConfigFormItems must be available and initialized to proceed
			const nameFormItem = this._interfaceBuilder.getConfigFormItem('extension.name');
			const typeFormItem = this._interfaceBuilder.getConfigFormItem('extension.type');
			const classFormItem = this._interfaceBuilder.getConfigFormItem('extension.file');
			const filterFormItem = this._interfaceBuilder.getConfigFormItem('extension.filterClass');

			if (nameFormItem != null && typeFormItem != null && classFormItem != null && filterFormItem != null)
			{
				const source = nameFormItem.data;
				let classesList = [];

				let data = source.triggerData;
				for (let i = 0; i < data.size(); i++)
				{
					let ext = data.getSFSObject(i);

					if (ext.getUtfString('name') == nameFormItem.data.value && ext.getUtfString('type') == typeFormItem.data.value)
					{
						let classes = ext.getUtfString('classesString').split(',');

						if (filterFormItem.data.value == true)
						{
							let filteredClasses = classes.filter(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["filterClassName"]);
							classes = filteredClasses;
						}

						classesList = classesList.concat(classes);
					}
				}

				let currentClass = classFormItem.data.value;

				// If the classes list doesn't contain the current value, create an empty entry and reset the value
				if (classesList.indexOf(currentClass) < 0)
				{
					if (classesList.length == 0)
					{
						classesList.push('');
						currentClass = '';
					}
					else
						currentClass = classesList[0];
				}

				let mainClassDropDown = classFormItem._innerWidget;
				mainClassDropDown.setDataSource(classesList);

				classFormItem.data.value = currentClass;
				classFormItem._setWidgetValue();
			}
		}
	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_enableListInterface(enabled)
	{
		$('#znc-utilButtons').attr('disabled', !enabled);
		$('#znc-treeView').attr('disabled', !enabled);
	}

	_setUtilityButtonsState(dataItem = null)
	{
		let disable = true;

		if (dataItem)
		{
			// Enable 'activate zone' button if zone is inactive
			$('#znc-activateButton').attr('disabled', (dataItem.type != this.ITEM_TYPE_ZONE || dataItem.active));

			disable = false;
		}
		else
		{
			// Disable 'activate zone' button
			$('#znc-activateButton').attr('disabled', true);
		}

		// Enable/disable other utility buttons
		$('#znc-addZoneButton').attr('disabled', false); // Always enabled
		$('#znc-addRoomButton').attr('disabled', disable);
		$('#znc-editButton').attr('disabled', disable);
		$('#znc-removeButton').attr('disabled', disable);
	}

	_enableConfigInterface(enabled)
	{
		$('#znc-cancelButton').attr('disabled', !enabled);
		$('#znc-reloadButton').attr('disabled', !enabled);
		$('#znc-submitButton').attr('disabled', !enabled);
		$('#znc-backupCheck').attr('disabled', !enabled);

		this._interfaceBuilder.disableInterface(!enabled);

		// Also switch view when enabled
		if (enabled)
			this._switchView('znc-main');
	}

	_switchView(viewId)
	{
		document.getElementById('znc-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#znc-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();

		// Set flag to re-initialize tabs if needed
		this._reinitTabs = true;
	}

	_populateTree(data)
	{
		let zData = data.getSFSArray('zones');

		let zonesArr = [];
		for (let z = 0; z < zData.size(); z++)
			zonesArr.push( this._createZoneObject(zData.getSFSObject(z)) );

		// Create datasource
		let zones = new kendo.data.HierarchicalDataSource({
            data: zonesArr,
			sort: {
				field: 'name',
				dir: 'asc'
			},
            schema: {
                model: {
					id: 'id',
                    children: {
						schema: {
							data: 'rooms',
							sort: {
								field: 'name',
								dir: 'asc'
							}
						}
					}
                }
            }
        });

		// Set tree view dataprovider
		this._treeview.setDataSource(zones);

		// Set utility buttons state (add, remove, edit, etc)
		this._setUtilityButtonsState();
	}

	_createZoneObject(zoneData)
	{
		let zone = {
			type: this.ITEM_TYPE_ZONE,
			name: zoneData.getUtfString('name'),
			id: zoneData.getInt('id'),
			active: zoneData.getBool('act')
		}

		// Create rooms list dataprovider
		let rData = zoneData.getSFSArray('rooms');

		let roomsArr = [];
		for (let r = 0; r < rData.size(); r++)
			roomsArr.push( this._createRoomObject(rData.getSFSObject(r), zoneData.getInt('id')) );

		zone.rooms = roomsArr;

		return zone;
	}

	_createRoomObject(roomData, zoneId)
	{
		let room = {
			type: this.ITEM_TYPE_ROOM,
			name: roomData.getUtfString('name'),
			id: roomData.getInt('id'),
			active: roomData.getBool('act'),
			parentId: zoneId,
			spriteCssClass: this._getRoomListIconCssClass(roomData.getBool('act'))
		};

		return room;
	}

	_getRoomListIconCssClass(isActive)
	{
		return isActive ? 'fas fa-door-open' : 'fas fa-door-closed inactive-list-item';
	}

	_setZoneActivationStatus(zoneId, activeRooms, isActive)
	{
		let zoneDI = this._getZoneDataItemById(zoneId);

		zoneDI.active = isActive;

		let activeRoomsArr = activeRooms.split(',');

		if (zoneDI.hasChildren)
		{
			for (let i = 0; i < zoneDI.children.data().length; i++)
			{
				let room = zoneDI.children.data()[i];
				room.active = (isActive && activeRoomsArr.indexOf(room.name) > -1);
				room.spriteCssClass = this._getRoomListIconCssClass(room.active)
			}
		}

		// Refresh list
		this._treeview.dataSource.sync();

		// Return zone name
		return zoneDI.name;
	}

	_deselectTreeItem()
	{
		this._treeview.select($());
	}

	_selectParentTreeItem()
	{
		let selectedNode = this._treeview.select();
		let selectedDataItem = this._treeview.dataItem(selectedNode);

		if (selectedDataItem.type == this.ITEM_TYPE_ROOM)
		{
			let parentNode = this._treeview.parent(selectedNode);
			this._treeview.select(parentNode);
		}
	}

	_loadConfiguration(type, resetTabs = true)
	{
		// Disable zone/room selection list
		this._enableListInterface(false);

		// Disable configuration interface
		this._enableConfigInterface(false);

		// Clear main container
		this._resetTabsContainer(true, resetTabs);

		// Set isEditing flag
		this._isEditing = true;
		this._editedItemType = type;

		// Request zone or room configuration data to server instance
		let params = new SFS2X.SFSObject();
		params.putInt('zId', this._editedZoneId);
		params.putInt('rId', this._editedRoomId);

		// If no room is selected, then we are editing a zone
		if (this._editedItemType == this.ITEM_TYPE_ZONE)
			this.sendExtensionRequest(this.REQ_GET_ZONE_CONFIG, params);
		else
			this.sendExtensionRequest(this.REQ_GET_ROOM_CONFIG, params);

		// Switch panel
		this._switchPanel('znc-mainPanel');
	}

	_resetTabsContainer(isLoading, resetTabs)
	{
		if (resetTabs)
			this._clearTabs();
		else
			this._reinitTabs = false;

		if (!isLoading)
			this._switchView('znc-select');
		else
			this._switchView('znc-loading');
	}

	_switchPanel(panelId)
	{
		document.getElementById('znc-view').selectedPanel = document.getElementById(panelId);
	}

	_getZoneDataItemById(zoneId)
	{
		let zonesDS = this._treeview.dataSource;
		return zonesDS.get(zoneId);
	}

	_getRoomDataItemById(zoneId, roomId)
	{
		let zoneDI = this._getZoneDataItemById(zoneId);

		if (zoneDI.hasChildren)
			return zoneDI.children.get(roomId);

		return null;
	}

	_updateZoneNameInList(zoneId, zoneName)
	{
		this._getZoneDataItemById(zoneId).name = zoneName;
		this._treeview.dataSource.sync();
	}

	_updateRoomNameInList(zoneId, roomId, roomName)
	{
		this._getRoomDataItemById(zoneId, roomId).name = roomName;
		this._treeview.dataSource.sync();
	}

	_validateName(changes)
	{
		const zoneId = this._editedZoneId;

		for (let i = 0; i < changes.size(); i++)
		{
			const setting = changes.getSFSObject(i);

			if (setting.containsKey('name') && setting.getUtfString('name') == 'name')
			{
				// Get name value
				const name = setting.getText('value');

				// Get data source
				let ds = [];

				if (this._editedItemType == this.ITEM_TYPE_ZONE)
					ds = this._treeview.dataSource.data();
				else
				{
					if (this._getZoneDataItemById(zoneId).hasChildren)
						ds = this._getZoneDataItemById(zoneId).children.data();
				}


				// Check if name exists in data source
				for (let j = 0; j < ds.length; j++)
				{
					if (ds[j].name == name)
					{
						return false;
					}
				}

				break;
			}
		}

		return true;
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------

	get _selectedItem()
	{
		return this._treeview.dataItem(this._treeview.select());
	}

	get _selectedItemParent()
	{
		let selectedNode = this._treeview.select();
		let parentNode = this._treeview.parent(selectedNode);

		return this._treeview.dataItem(parentNode);
	}

	get _editedZoneId()
	{
		if (this._isEditing && this._selectedItem)
		{
			if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
				return this._selectedItem.id;
			else
				return this._selectedItemParent.id;
		}

		return -1;
	}

	get _editedRoomId()
	{
		if (this._isEditing && this._selectedItem)
		{
			if (this._selectedItem.type == this.ITEM_TYPE_ROOM)
				return this._selectedItem.id;
		}

		return -1;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTIuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy9zaWRlYmFyLWxheW91dC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL3pvbmUtY29uZmlndXJhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTaWRlYmFyTGF5b3V0IGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2hhZG93IHJvb3Rcblx0XHRjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXHRcdHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuXHRcdFx0PHN0eWxlPlxuXHRcdFx0XHQ6aG9zdCB7XG5cdFx0XHRcdFx0ZGlzcGxheTogZmxleDtcblx0XHRcdFx0XHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LXhzKSA6OnNsb3R0ZWQoOm5vdChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pKSB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG5cdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQteHMpIDo6c2xvdHRlZChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pIHtcblx0XHRcdFx0XHRcdGZsZXgtZ3JvdzogMTtcblx0XHRcdFx0ICAgIH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiA3NjcuOThweCkge1xuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1zbSkgOjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LXNtKSA6OnNsb3R0ZWQoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSB7XG5cdFx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdCAgICB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRAbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQtbWQpIDo6c2xvdHRlZCg6bm90KFthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSkpIHtcblx0XHRcdFx0XHRcdGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1tZCkgOjpzbG90dGVkKFthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSkge1xuXHRcdFx0XHRcdFx0ZmxleC1ncm93OiAxO1xuXHRcdFx0XHQgICAgfVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6IDExOTkuOThweCkge1xuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1sZykgOjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LWxnKSA6OnNsb3R0ZWQoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSB7XG5cdFx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdCAgICB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQuc2lkZS1jb2w6OnNsb3R0ZWQoKikge1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Lm1haW4tY29sOjpzbG90dGVkKCopIHtcblx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdH1cblx0XHRcdDwvc3R5bGU+XG5cblx0XHRcdDxzbG90IGNsYXNzPVwic2lkZS1jb2xcIiBuYW1lPVwic2lkZS1jb2x1bW5cIj48L3Nsb3Q+XG5cdFx0XHQ8c2xvdCBjbGFzcz1cIm1haW4tY29sXCIgbmFtZT1cIm1haW4tY29sdW1uXCI+PC9zbG90PlxuXHRcdGA7XG5cblx0XHQvLyBTZXQgaW5pdGlhbCBzZWxlY3Rpb25cblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuXHR9XG5cblx0Z2V0IHNlbGVjdGVkUGFuZWwoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkUGFuZWw7XG5cdH1cblxuXHRzZXQgc2VsZWN0ZWRQYW5lbChlbGVtZW50KSAvLyAnc2lkZScgb3IgJ21haW4nXG5cdHtcblx0XHRpZiAoZWxlbWVudCAhPSBudWxsICYmIGVsZW1lbnQucGFyZW50Tm9kZSA9PSB0aGlzKVxuXHRcdHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkUGFuZWwgPSBlbGVtZW50O1xuXG5cdFx0XHRmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuY2hpbGRyZW4pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChlbGVtZW50ID09IHRoaXMuX3NlbGVjdGVkUGFuZWwpXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VsZW1lbnQgaXMgbm90IGEgY2hpbGQgb2YgU2lkZWJhckxheW91dCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBzZWxlY3RlZEluZGV4KClcblx0e1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pLmluZGV4T2YodGhpcy5fc2VsZWN0ZWRQYW5lbCk7XG5cdH1cblxuXHRzZXQgc2VsZWN0ZWRJbmRleChpbmRleClcblx0e1xuXHRcdGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0aWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdID09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgU2lkZWJhckxheW91dCBpbmRleCcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy5jaGlsZHJlbltpbmRleF07XG5cdFx0XHR0aGlzLnNlbGVjdGVkUGFuZWwgPSBlbGVtZW50O1xuXHRcdH1cblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ3NpZGViYXItbGF5b3V0JykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NpZGViYXItbGF5b3V0JywgU2lkZWJhckxheW91dCk7XG4iLCJpbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gJy4vYmFzZS1tb2R1bGUnO1xuaW1wb3J0IHtWaWV3U3RhY2t9IGZyb20gJy4uL2NvbXBvbmVudHMvdmlldy1zdGFjayc7XG5pbXBvcnQge1NpZGViYXJMYXlvdXR9IGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZWJhci1sYXlvdXQnO1xuaW1wb3J0IHtDb25maWdJbnRlcmZhY2VCdWlsZGVyfSBmcm9tICcuLi91dGlscy91aWJ1aWxkZXIvY29uZmlnLWludGVyZmFjZS1idWlsZGVyJztcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0LCBmaWx0ZXJDbGFzc05hbWV9IGZyb20gJy4uL3V0aWxzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmVDb25maWd1cmF0b3IgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ3pvbmVDb25maWcnKTtcblxuXHRcdHRoaXMuSVRFTV9UWVBFX1pPTkUgPSAnem9uZSc7XG5cdFx0dGhpcy5JVEVNX1RZUEVfUk9PTSA9ICdyb29tJztcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfR0VUX1pPTkVTID0gJ2dldFpvbmVzJztcblxuXHRcdHRoaXMuUkVRX0dFVF9aT05FX0NPTkZJRyA9ICdnZXRab25lQ29uZmlnJztcblx0XHR0aGlzLlJFUV9TQVZFX1pPTkVfQ09ORklHID0gJ3NhdmVab25lQ29uZmlnJztcblx0XHR0aGlzLlJFUV9ORVdfWk9ORV9DT05GSUcgPSAnbmV3Wm9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfREVMRVRFX1pPTkVfQ09ORklHID0gJ2RlbFpvbmVDb25maWcnO1xuXHRcdHRoaXMuUkVRX0FDVElWQVRFX1pPTkUgPSAnYWN0Wm9uZSc7XG5cblx0XHR0aGlzLlJFUV9HRVRfUk9PTV9DT05GSUcgPSAnZ2V0Um9vbUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfU0FWRV9ST09NX0NPTkZJRyA9ICdzYXZlUm9vbUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfTkVXX1JPT01fQ09ORklHID0gJ25ld1Jvb21Db25maWcnO1xuXHRcdHRoaXMuUkVRX0RFTEVURV9ST09NX0NPTkZJRyA9ICdkZWxSb29tQ29uZmlnJztcblxuXHRcdC8vIEluY29taW5nIHJlc3BvbnNlc1xuXHRcdHRoaXMuUkVTUF9aT05FUyA9ICd6b25lcyc7XG5cblx0XHR0aGlzLlJFU1BfWk9ORV9DT05GSUcgPSAnem9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfQ09ORklHX1VQREFURV9DT05GSVJNID0gJ3pvbmVDZmdVcGQnO1xuXHRcdHRoaXMuUkVTUF9aT05FX0FEREVEID0gJ3pvbmVBZGRlZCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfUkVGVVNFRCA9ICd6b25lUmVmdXNlZCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfREVMRVRFRCA9ICd6b25lRGVsJztcblx0XHR0aGlzLlJFU1BfWk9ORV9BQ1RJVkFURUQgPSAnem9uZUFjdCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfQUNUSVZBVElPTl9FUlJPUiA9ICd6b25lQWN0RXJyJztcblxuXHRcdHRoaXMuUkVTUF9ST09NX0NPTkZJRyA9ICdyb29tQ29uZmlnJztcblx0XHR0aGlzLlJFU1BfUk9PTV9DT05GSUdfVVBEQVRFX0NPTkZJUk0gPSAncm9vbUNmZ1VwZCc7XG5cdFx0dGhpcy5SRVNQX1JPT01fQURERUQgPSAncm9vbUFkZGVkJztcblx0XHR0aGlzLlJFU1BfUk9PTV9SRUZVU0VEID0gJ3Jvb21SZWZ1c2VkJztcblx0XHR0aGlzLlJFU1BfUk9PTV9ERUxFVEVEID0gJ3Jvb21EZWwnO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLyBUaGlzIG1ldGhvZHMgb3ZlcnJpZGUgdGhvc2UgaW4gQmFzZU1vZHVsZSBjbGFzcy5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIENyZWF0ZSBpbnRlcmZhY2UgYnVpbGRlciBpbnN0YW5jZVxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIgPSBuZXcgQ29uZmlnSW50ZXJmYWNlQnVpbGRlcigpO1xuXG5cdFx0Ly8gU2V0IGxpc3RlbmVyIGZvciBjdXN0b20gYWN0aW9ucyB0cmlnZ2VyZWQgYnkgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHQkKCcjem5jLXRhYk5hdmlnYXRvcicpLm9uKCd2YWx1ZS1zZXQnLCAkLnByb3h5KHRoaXMuX29uQ29uZmlnVmFsdWVTZXQsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgWm9uZXMvUm9vbXMgdHJlZXZpZXdcblx0XHR0aGlzLl90cmVldmlldyA9ICQoJyN6bmMtdHJlZVZpZXcnKS5rZW5kb1RyZWVWaWV3KHtcblx0XHRcdGxvYWRPbkRlbWFuZDogZmFsc2UsXG5cdFx0XHRkYXRhVGV4dEZpZWxkOiAnbmFtZScsXG5cdFx0XHR0ZW1wbGF0ZToga2VuZG8udGVtcGxhdGUoJzxzcGFuIGNsYXNzPVwiIyBpZiAoIWl0ZW0uYWN0aXZlKSB7ICMgaW5hY3RpdmUtbGlzdC1pdGVtICMgfSAjXCI+IzogaXRlbS5uYW1lICM8L3NwYW4+JyksXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25ab25lUm9vbUNoYW5nZSwgdGhpcyksXG5cdFx0fSkuZGF0YSgna2VuZG9UcmVlVmlldycpO1xuXG5cdFx0Ly8gTGVzdGVuZCB0byB0cmVldmlldyBkb3VibGUtY2xpY2sgZXZlbnRcblx0XHQkKCcjem5jLXRyZWVWaWV3Jykub24oJ2RibGNsaWNrJywgJC5wcm94eSh0aGlzLl9vblRyZWVJdGVtRG91YmxlQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIFJlcXVlc3Qgem9uZXMgJiByb29tcyBsaXN0IHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX1pPTkVTKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyXG5cdFx0JCgnI3puYy1wcm9ncmVzc0JhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gdXRpbGl0eSBidXR0b25zXG5cdFx0JCgnI3puYy1hZGRab25lQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFkZFpvbmVDbGljaywgdGhpcykpO1xuXHRcdCQoJyN6bmMtYWRkUm9vbUJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25BZGRSb29tQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLWVkaXRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRWRpdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3puYy1yZW1vdmVCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVtb3ZlQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLWFjdGl2YXRlQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFjdGl2YXRlQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBpbnRlcmZhY2UgYnV0dG9uc1xuXHRcdCQoJyN6bmMtY2FuY2VsQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNhbmNlbENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3puYy1yZWxvYWRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25TdWJtaXRDbGljaywgdGhpcykpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdC8vIFJlbW92ZSB0cmVlIHZpZXcgZG91YmxlY2xpY2sgbGlzdGVuZXJcblx0XHQkKCcjem5jLXRyZWVWaWV3Jykub2ZmKCdkYmxjbGljaycpO1xuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVyIGZvciBjdXN0b20gYWN0aW9ucyB0cmlnZ2VyZWQgYnkgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHQkKCcjem5jLXRhYk5hdmlnYXRvcicpLm9mZigndmFsdWUtc2V0Jyk7XG5cblx0XHQvLyBSZW1vdmUgbGlzdGVuZXIgZm9yIHpvbmUvcm9vbSBhY3RpdmF0aW9uIGV2ZW50XG5cdFx0JCgnI3puYy1hZGRab25lQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyN6bmMtYWRkUm9vbUJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLWVkaXRCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3puYy1yZW1vdmVCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3puYy1hY3RpdmF0ZUJ1dHRvbicpLm9mZignY2xpY2snKTtcblxuXHRcdC8vIFJlbW92ZSBpbnRlcmZhY2UgYnV0dG9ucyBjbGljayBsaXN0ZW5lcnNcblx0XHQkKCcjem5jLWNhbmNlbEJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLXJlbG9hZEJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLm9mZignY2xpY2snKTtcblxuXHRcdC8vIENsZWFyIHRhYnMgY29udGFpbmVyXG5cdFx0dGhpcy5fY2xlYXJUYWJzKCk7XG5cdH1cblxuXHRvbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZCwgZGF0YSlcblx0e1xuXHRcdGNvbnN0IHVzZXJuYW1lID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdC8qKioqKiogWk9ORVMgJiBST09NUyAqKioqKiovXG5cblx0XHQvLyBab25lcyAmIHJvb21zIGxpc3QgcmVjZWl2ZWRcblx0XHRpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORVMpXG5cdFx0XHR0aGlzLl9wb3B1bGF0ZVRyZWUoZGF0YSk7XG5cblx0XHQvLyBab25lIG9yIHJvb20gY29uZmlndXJhdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORV9DT05GSUcgfHwgY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9DT05GSUcpXG5cdFx0e1xuXHRcdFx0Ly8gQnVpbGQgdXNlciBpbnRlcmZhY2UgYmFzZWQgb24gcmVjZWl2ZWQgZGF0YVxuXHRcdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5idWlsZEludGVyZmFjZShkYXRhLmdldFNGU0FycmF5KCdzZXR0aW5ncycpLCAnem5jLXRhYk5hdmlnYXRvcicsIGZhbHNlKTtcblxuXHRcdFx0Ly8gRW5hYmxlIHNjcm9sbGluZyB0YWJzIChpZiBuZWVkZWQpXG5cdFx0XHRpZiAodGhpcy5fcmVpbml0VGFicylcblx0XHRcdHtcblx0XHRcdFx0JCgnI3puYy10YWJOYXZpZ2F0b3IgI3RhYnMnKS5zY3JvbGxpbmdUYWJzKHtcblx0XHRcdFx0XHRib290c3RyYXBWZXJzaW9uOiA0LFxuXHRcdFx0XHRcdHNjcm9sbFRvVGFiRWRnZTogdHJ1ZSxcblx0XHRcdFx0XHRlbmFibGVTd2lwaW5nOiB0cnVlLFxuXHRcdFx0XHRcdGRpc2FibGVTY3JvbGxBcnJvd3NPbkZ1bGx5U2Nyb2xsZWQ6IHRydWUsXG5cdFx0XHRcdFx0Y3NzQ2xhc3NMZWZ0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLWxlZnQnLFxuXHRcdFx0XHRcdGNzc0NsYXNzUmlnaHRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBFbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0LyoqKioqKiBaT05FUyAqKioqKiovXG5cblx0XHQvLyBab25lIGNvbmZpZ3VyYXRpb24gdXBkYXRlIGNvbmZpcm1hdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQ09ORklHX1VQREFURV9DT05GSVJNKVxuXHRcdHtcblx0XHRcdC8vIElmIGEgJ25hbWUnIHBhcmFtZXRlciBpcyByZWNlaXZlZCwgaXQgbWVhbnMgdGhlIHpvbmUgbmFtZSBjaGFuZ2VkLCBhbmQgd2UgaGF2ZSB0byB1cGRhdGUgdGhlIHpvbmVzIGxpc3Rcblx0XHRcdGlmIChkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKSAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl91cGRhdGVab25lTmFtZUluTGlzdChkYXRhLmdldEludCgneklkJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCd6TmFtZScpKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvbjsgb3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgbW9kaWZpZWQnLCBgWm9uZSBzZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseTsgY2hhbmdlcyB3aWxsIGJlIGFwcGxpZWQgb24gbmV4dCA8c3Ryb25nPnNlcnZlciByZXN0YXJ0PC9zdHJvbmc+YCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHpvbmVcblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCd6SWQnKSA9PSB0aGlzLl9lZGl0ZWRab25lSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBtb2RpZmllZCB0aGUgWm9uZSB5b3UgYXJlIGN1cnJlbnRseSBlZGl0aW5nOyBwbGVhc2UgcmVsb2FkIHRvIHVwZGF0ZSB5b3VyIHZpZXcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3pOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgcmVuYW1lZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBjaGFuZ2VkIHRoZSBuYW1lIG9uIG9uZSBvZiB0aGUgWm9uZXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE5ldyB6b25lIGFkZGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORV9BRERFRClcblx0XHR7XG5cdFx0XHRjb25zdCB6b25lTmFtZSA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCd6b25lJykuZ2V0VXRmU3RyaW5nKCduYW1lJyk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgaW50ZXJmYWNlXG5cdFx0XHRcdHRoaXMuX29uQ2FuY2VsQ2xpY2soKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIGFkZGVkJywgYFpvbmUgJyR7em9uZU5hbWV9JyBjcmVhdGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIGFkZGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gY3JlYXRlZCBab25lICcke3pvbmVOYW1lfSdgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG5ldyB6b25lIHRvIHRyZWVcblx0XHRcdGxldCB6b25lc0RTID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZTtcblx0XHRcdHpvbmVzRFMuYWRkKHRoaXMuX2NyZWF0ZVpvbmVPYmplY3QoZGF0YS5nZXRTRlNPYmplY3QoJ3pvbmUnKSkpO1xuXHRcdFx0em9uZXNEUy5zeW5jKCk7XG5cdFx0fVxuXG5cdFx0Ly8gTmV3IHpvbmUgY3JlYXRpb24gcmVmdXNlZCBkdWUgdG8gaW52YWxpZCB6b25lIG5hbWVcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9aT05FX1JFRlVTRUQpXG5cdFx0e1xuXHRcdFx0Ly8gUmUtZW5hYmxlIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHQvLyBTaG93IHdhcm5pbmdcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydCgnWm9uZSBjb25maWd1cmF0aW9uIGNhblxcJ3QgYmUgc2F2ZWQgYmVjYXVzZSBhbm90aGVyIFpvbmUgd2l0aCB0aGUgc2FtZSBuYW1lIGFscmVhZHkgZXhpc3RzLicsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEV4aXN0aW5nIHpvbmUgZGVsZXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfREVMRVRFRClcblx0XHR7XG5cdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSBkZWxldGVyLCByZXNldCB0aGUgaW50ZXJmYWNlOyBvdGhlcndpc2UsIGp1c3Qgc2hvdyBhIG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIHJlbW92ZWQnLCBgWm9uZSAnJHtkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKX0nIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEFuIGFsZXJ0IGJveCBpcyBkaXNwbGF5ZWQgaWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGVkaXRpbmcgdGhlIHNhbWUgem9uZVxuXHRcdFx0XHRpZiAoZGF0YS5nZXRJbnQoJ3pJZCcpID09IHRoaXMuX2VkaXRlZFpvbmVJZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gaGFzIGRlbGV0ZWQgdGhlIFpvbmUgeW91IGFyZSBjdXJyZW50bHkgbW9kaWZ5aW5nOyB5b3UgaGF2ZSB0byBjYW5jZWwgeW91ciBlZGl0aW5nLmApO1xuXG5cdFx0XHRcdFx0Ly8gRGlzYWJsZSBzdWJtaXQgYW5kIHJlbG9hZCBidXR0b25zXG5cdFx0XHRcdFx0JCgnI3puYy1yZWxvYWRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHRcdCQoJyN6bmMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgcmVtb3ZlZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGRlbGV0ZWQgWm9uZSAnJHtkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKX0nYCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzZXQgc2VsZWN0aW9uIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBvciBpdHMgcGFyZW50IGlzIGJlaW5nIHJlbW92ZWRcblx0XHRcdGxldCBzZWxlY3RlZE5vZGUgPSB0aGlzLl90cmVldmlldy5zZWxlY3QoKTtcblx0XHRcdGxldCBzZWxlY3RlZERhdGFJdGVtID0gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0oc2VsZWN0ZWROb2RlKTtcblx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWREYXRhSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUgJiYgc2VsZWN0ZWREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgneklkJykpXG5cdFx0XHRcdFx0dGhpcy5fZGVzZWxlY3RUcmVlSXRlbSgpO1xuXG5cdFx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBwYXJlbnREYXRhSXRlbSA9IHRoaXMuX3RyZWV2aWV3LmRhdGFJdGVtKHRoaXMuX3RyZWV2aWV3LnBhcmVudChzZWxlY3RlZE5vZGUpKTtcblxuXHRcdFx0XHRcdGlmIChwYXJlbnREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgneklkJykpXG5cdFx0XHRcdFx0XHR0aGlzLl9kZXNlbGVjdFRyZWVJdGVtKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIHpvbmUgZnJvbSB0cmVlXG5cdFx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKGRhdGEuZ2V0SW50KCd6SWQnKSk7XG5cdFx0XHRsZXQgem9uZXNEUyA9IHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2U7XG5cdFx0XHR6b25lc0RTLnJlbW92ZShkYXRhSXRlbSk7XG5cdFx0XHR6b25lc0RTLnN5bmMoKTtcblx0XHR9XG5cblx0XHQvLyBab25lIGFjdGl2YXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQUNUSVZBVEVEKVxuXHRcdHtcblx0XHRcdC8vIFNldCB6b25lIGFjdGl2YXRpb24gc3RhdHVzXG5cdFx0XHRjb25zdCB6b25lTmFtZSA9IHRoaXMuX3NldFpvbmVBY3RpdmF0aW9uU3RhdHVzKGRhdGEuZ2V0SW50KCd6SWQnKSwgZGF0YS5nZXRVdGZTdHJpbmcoJ2FjdFJvb21zJyksIHRydWUpO1xuXG5cdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgYWN0aXZhdGVkJywgYFpvbmUgJyR7em9uZU5hbWV9JyBhY3RpdmF0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgYWN0aXZhdGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gYWN0aXZhdGVkIFpvbmUgJyR7em9uZU5hbWV9J2ApO1xuXHRcdH1cblxuXHRcdC8vIFpvbmUgYWN0aXZhdGlvbiBlcnJvclxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQUNUSVZBVElPTl9FUlJPUilcblx0XHR7XG5cdFx0XHQvLyBTZXQgem9uZSBhY3RpdmF0aW9uIHN0YXR1c1xuXHRcdFx0dGhpcy5fc2V0Wm9uZUFjdGl2YXRpb25TdGF0dXMoZGF0YS5nZXRJbnQoJ3pJZCcpLCAnJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyksIHRydWUpO1xuXHRcdH1cblxuXHRcdC8qKioqKiogUk9PTVMgKioqKioqL1xuXG5cdFx0Ly8gUm9vbSBjb25maWd1cmF0aW9uIHVwZGF0ZSBjb25maXJtYXRpb25cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9ST09NX0NPTkZJR19VUERBVEVfQ09ORklSTSlcblx0XHR7XG5cdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3JOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fdXBkYXRlUm9vbU5hbWVJbkxpc3QoZGF0YS5nZXRJbnQoJ3pJZCcpLCBkYXRhLmdldEludCgncklkJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCdyTmFtZScpKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvbjsgb3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gbW9kaWZpZWQnLCBgUm9vbSBzZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseTsgY2hhbmdlcyB3aWxsIGJlIGFwcGxpZWQgb24gbmV4dCA8c3Ryb25nPnNlcnZlciByZXN0YXJ0PC9zdHJvbmc+YCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHJvb21cblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCdySWQnKSA9PSB0aGlzLl9lZGl0ZWRSb29tSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBtb2RpZmllZCB0aGUgUm9vbSB5b3UgYXJlIGN1cnJlbnRseSBlZGl0aW5nOyBwbGVhc2UgcmVsb2FkIHRvIHVwZGF0ZSB5b3VyIHZpZXcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3JOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gcmVuYW1lZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBjaGFuZ2VkIHRoZSBuYW1lIG9uIG9uZSBvZiB0aGUgUm9vbXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE5ldyByb29tIGFkZGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9BRERFRClcblx0XHR7XG5cdFx0XHRjb25zdCByb29tRGF0YSA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCdyb29tJyk7XG5cdFx0XHRjb25zdCB6b25lSWQgPSBkYXRhLmdldEludCgneklkJyk7XG5cblx0XHRcdGxldCB6b25lc0RTID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZTtcblx0XHRcdGxldCB6b25lSXRlbSA9IHpvbmVzRFMuZ2V0KHpvbmVJZCk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgaW50ZXJmYWNlXG5cdFx0XHRcdHRoaXMuX29uQ2FuY2VsQ2xpY2soKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIGFkZGVkJywgYFJvb20gJyR7cm9vbURhdGEuZ2V0VXRmU3RyaW5nKCduYW1lJyl9JyBjcmVhdGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIGFkZGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gY3JlYXRlZCBSb29tICcke3Jvb21EYXRhLmdldFV0ZlN0cmluZygnbmFtZScpfScgaW4gWm9uZSAnJHt6b25lSXRlbS5uYW1lfSdgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG5ldyByb29tIHRvIHRyZWVcblx0XHRcdHpvbmVJdGVtLmFwcGVuZCh0aGlzLl9jcmVhdGVSb29tT2JqZWN0KHJvb21EYXRhLCB6b25lSWQpKTtcblx0XHRcdHpvbmVzRFMuc3luYygpO1xuXG5cdFx0XHQvLyBFeHBhbmQgem9uZSBub2RlIHdoZXJlIHJvb20gd2FzIGFkZGVkXG5cdFx0XHR0aGlzLl90cmVldmlldy5leHBhbmQodGhpcy5fdHJlZXZpZXcuc2VsZWN0KCkpO1xuXHRcdH1cblxuXHRcdC8vIE5ldyByb29tIGNyZWF0aW9uIHJlZnVzZWQgZHVlIHRvIGludmFsaWQgcm9vbSBuYW1lXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9SRUZVU0VEKVxuXHRcdHtcblx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdHRoaXMuX2VuYWJsZUNvbmZpZ0ludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0Ly8gU2hvdyB3YXJuaW5nXG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoJ1Jvb20gY29uZmlndXJhdGlvbiBjYW5cXCd0IGJlIHNhdmVkIGJlY2F1c2UgYW5vdGhlciBSb29tIHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0cy4nLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBFeGlzdGluZyByb29tIGRlbGV0ZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9ST09NX0RFTEVURUQpXG5cdFx0e1xuXHRcdFx0bGV0IHpvbmVJdGVtID0gdGhpcy5fZ2V0Wm9uZURhdGFJdGVtQnlJZChkYXRhLmdldEludCgneklkJykpO1xuXHRcdFx0bGV0IHJvb21JdGVtID0gdGhpcy5fZ2V0Um9vbURhdGFJdGVtQnlJZChkYXRhLmdldEludCgneklkJyksIGRhdGEuZ2V0SW50KCdySWQnKSk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIGRlbGV0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmUtZW5hYmxlIGludGVyZmFjZVxuXHRcdFx0XHR0aGlzLl9lbmFibGVMaXN0SW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gcmVtb3ZlZCcsIGBSb29tICcke3Jvb21JdGVtLm5hbWV9JyBkZWxldGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHJvb21cblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCdySWQnKSA9PSB0aGlzLl9lZGl0ZWRSb29tSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBkZWxldGVkIHRoZSBSb29tIHlvdSBhcmUgY3VycmVudGx5IG1vZGlmeWluZzsgeW91IGhhdmUgdG8gY2FuY2VsIHlvdXIgZWRpdGluZy5gKTtcblxuXHRcdFx0XHRcdC8vIERpc2FibGUgc3VibWl0IGFuZCByZWxvYWQgYnV0dG9uc1xuXHRcdFx0XHRcdCQoJyN6bmMtcmVsb2FkQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIHJlbW92ZWQnLCBgQWRtaW5pc3RyYXRvciAke3VzZXJuYW1lfSBkZWxldGVkIFJvb20gJyR7cm9vbUl0ZW0ubmFtZX0nIGZyb20gWm9uZSAnJHt6b25lSXRlbS5uYW1lfSdgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXNldCBzZWxlY3Rpb24gaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtIG9yIGl0cyBwYXJlbnQgaXMgYmVpbmcgcmVtb3ZlZFxuXHRcdFx0bGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuX3RyZWV2aWV3LnNlbGVjdCgpO1xuXHRcdFx0bGV0IHNlbGVjdGVkRGF0YUl0ZW0gPSB0aGlzLl90cmVldmlldy5kYXRhSXRlbShzZWxlY3RlZE5vZGUpO1xuXHRcdFx0aWYgKHNlbGVjdGVkRGF0YUl0ZW0pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSAmJiBzZWxlY3RlZERhdGFJdGVtLmlkID09IGRhdGEuZ2V0SW50KCdySWQnKSlcblx0XHRcdFx0XHR0aGlzLl9kZXNlbGVjdFRyZWVJdGVtKCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlbW92ZSByb29tIGZyb20gdHJlZVxuXHRcdFx0em9uZUl0ZW0uY2hpbGRyZW4ucmVtb3ZlKHJvb21JdGVtKTtcblx0XHRcdHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2Uuc3luYygpO1xuXHRcdH1cblxuXHRcdC8vIGVsc2UgaWYgKClcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFVJIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9vblRyZWVJdGVtRG91YmxlQ2xpY2soZSlcblx0e1xuXHRcdC8vIEdldCBldmVudCB0YXJnZXQncyBjbG9zZXN0IHRyZWUgbm9kZVxuXHRcdGxldCB0cmVlTm9kZSA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5rLWl0ZW1bcm9sZT10cmVlaXRlbV0nKTtcblxuXHRcdC8vIEdldCBhc3NvY2lhdGVkIGRhdGEgaXRlbVxuXHRcdGxldCBkYXRhSXRlbSA9IHRoaXMuX3RyZWV2aWV3LmRhdGFJdGVtKHRyZWVOb2RlKTtcblxuXHRcdC8vIExvYWQgY29uZmlndXJhdGlvblxuXHRcdHRoaXMuX2xvYWRDb25maWd1cmF0aW9uKGRhdGFJdGVtLnR5cGUpO1xuXHR9XG5cblx0X29uWm9uZVJvb21DaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gUmVzZXQgdXRpbGl0eSBidXR0b25zXG5cdFx0dGhpcy5fc2V0VXRpbGl0eUJ1dHRvbnNTdGF0ZSh0aGlzLl9zZWxlY3RlZEl0ZW0pO1xuXHR9XG5cblx0Ly8gVXRpbGl0eSBidXR0b25zIGxpc3RlbmVyc1xuXG5cdF9vbkFkZFpvbmVDbGljaygpXG5cdHtcblx0XHQvLyBEZXNlbGVjdCBsaXN0IGl0ZW1cblx0XHR0aGlzLl9kZXNlbGVjdFRyZWVJdGVtKCk7XG5cblx0XHQvLyBMb2FkIGNvbmZpZ3VyYXRpb25cblx0XHR0aGlzLl9sb2FkQ29uZmlndXJhdGlvbih0aGlzLklURU1fVFlQRV9aT05FKTtcblx0fVxuXG5cdF9vbkFkZFJvb21DbGljaygpXG5cdHtcblx0XHQvLyBTZWxlY3QgcGFyZW50IGxpc3QgaXRlbVxuXHRcdHRoaXMuX3NlbGVjdFBhcmVudFRyZWVJdGVtKCk7XG5cblx0XHQvLyBMb2FkIGNvbmZpZ3VyYXRpb25cblx0XHR0aGlzLl9sb2FkQ29uZmlndXJhdGlvbih0aGlzLklURU1fVFlQRV9ST09NKTtcblx0fVxuXG5cdF9vbkVkaXRDbGljaygpXG5cdHtcblx0XHQvLyBMb2FkIGNvbmZpZ3VyYXRpb25cblx0XHR0aGlzLl9sb2FkQ29uZmlndXJhdGlvbih0aGlzLl9zZWxlY3RlZEl0ZW0udHlwZSk7XG5cdH1cblxuXHRfb25SZW1vdmVDbGljaygpXG5cdHtcblx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Q29uZmlybVdhcm5pbmcoYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHNlbGVjdGVkICR7dGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSA/ICdab25lJyA6ICdSb29tJ30gY29uZmlndXJhdGlvbj9gLCAkLnByb3h5KHRoaXMuX29uUmVtb3ZlQ29uZmlybSwgdGhpcykpO1xuXHR9XG5cblx0X29uUmVtb3ZlQ29uZmlybSgpXG5cdHtcblx0XHQvLyBEaXNhYmxlIHpvbmUvcm9vbSBzZWxlY3Rpb24gbGlzdFxuXHRcdHRoaXMuX2VuYWJsZUxpc3RJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblxuXHRcdC8vIFJlcXVlc3Qgem9uZSByZW1vdmFsXG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUpXG5cdFx0e1xuXHRcdFx0cGFyYW1zLnB1dEludCgneklkJywgdGhpcy5fc2VsZWN0ZWRJdGVtLmlkKTtcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfREVMRVRFX1pPTkVfQ09ORklHLCBwYXJhbXMpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0cGFyYW1zLnB1dEludCgneklkJywgdGhpcy5fc2VsZWN0ZWRJdGVtUGFyZW50LmlkKTtcblx0XHRcdHBhcmFtcy5wdXRJbnQoJ3JJZCcsIHRoaXMuX3NlbGVjdGVkSXRlbS5pZCk7XG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0RFTEVURV9ST09NX0NPTkZJRywgcGFyYW1zKTtcblx0XHR9XG5cdH1cblxuXHRfb25BY3RpdmF0ZUNsaWNrKClcblx0e1xuXHRcdC8vIEdldCBzZWxlY3RlZCBkYXRhIGl0ZW1cblx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHR7XG5cdFx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdFx0cGFyYW1zLnB1dEludCgneklkJywgdGhpcy5fc2VsZWN0ZWRJdGVtLmlkKTtcblxuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9BQ1RJVkFURV9aT05FLCBwYXJhbXMpO1xuXHRcdH1cblx0fVxuXG5cdC8vIENvbmZpZ3VyYXRpb24gYnV0dG9ucyBsaXN0ZW5lcnNcblxuXHRfb25DYW5jZWxDbGljaygpXG5cdHtcblx0XHQvLyBFbmFibGUgem9uZS9yb29tIHNlbGVjdGlvbiBsaXN0c1xuXHRcdHRoaXMuX2VuYWJsZUxpc3RJbnRlcmZhY2UodHJ1ZSk7XG5cblx0XHQvLyBEaXNhYmxlIGNvbmZpZ3VyYXRpb24gaW50ZXJmYWNlXG5cdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdC8vIENsZWFyIG1haW4gY29udGFpbmVyXG5cdFx0dGhpcy5fcmVzZXRUYWJzQ29udGFpbmVyKGZhbHNlLCB0cnVlKTtcblxuXHRcdC8vIFNldCBpc0VkaXRpbmcgZmxhZ1xuXHRcdHRoaXMuX2lzRWRpdGluZyA9IGZhbHNlO1xuXHRcdHRoaXMuX2VkaXRlZEl0ZW1UeXBlID0gJyc7XG5cblx0XHQvLyBTd2l0Y2ggcGFuZWxcblx0XHR0aGlzLl9zd2l0Y2hQYW5lbCgnem5jLXNpZGViYXJQYW5lbCcpO1xuXHR9XG5cblx0X29uUmVsb2FkQ2xpY2soKVxuXHR7XG5cdFx0Ly8gSGlkZSB2YWxpZGF0aW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5yZXNldFZhbGlkYXRpb24oKTtcblxuXHRcdC8vIFJlbG9hZCBjb25maWd1cmF0aW9uXG5cdFx0dGhpcy5fbG9hZENvbmZpZ3VyYXRpb24odGhpcy5fZWRpdGVkSXRlbVR5cGUsIGZhbHNlKTtcblx0fVxuXG5cdF9vblN1Ym1pdENsaWNrKClcblx0e1xuXHRcdC8vIENoZWNrIHZhbGlkaXR5XG5cdFx0aWYgKHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuY2hlY2tJc1ZhbGlkKCkpXG5cdFx0e1xuXHRcdFx0bGV0IGNoYW5nZXMgPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENoYW5nZWREYXRhKCk7XG5cblx0XHRcdGlmIChjaGFuZ2VzLnNpemUoKSA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coY2hhbmdlcy5nZXREdW1wKCkpXG5cblx0XHRcdFx0Ly8gSW4gY2FzZSB0aGUgem9uZS9yb29tIG5hbWUgY2hhbmdlZCwgY2hlY2sgaXQgYWdhaW5zdCB0aGUgbGlzdCAoZHVwbGljYXRlIG5hbWVzIG5vdCBhbGxvd2VkISlcblx0XHRcdFx0aWYgKHRoaXMuX3ZhbGlkYXRlTmFtZShjaGFuZ2VzKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIERpc2FibGUgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHRcdFx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0XHRcdFx0Ly8gU2VuZCBzZXR0aW5ncyB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHRcdFx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdFx0XHRcdHBhcmFtcy5wdXRTRlNBcnJheSgnc2V0dGluZ3MnLCBjaGFuZ2VzKTtcblx0XHRcdFx0XHRwYXJhbXMucHV0Qm9vbCgnYmFja3VwJywgJCgnI3puYy1iYWNrdXBDaGVjaycpLnByb3AoJ2NoZWNrZWQnKSk7XG5cdFx0XHRcdFx0cGFyYW1zLnB1dEludCgneklkJywgdGhpcy5fZWRpdGVkWm9uZUlkKTtcblx0XHRcdFx0XHRwYXJhbXMucHV0SW50KCdySWQnLCB0aGlzLl9lZGl0ZWRSb29tSWQpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX2VkaXRlZEl0ZW1UeXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly8gU3VibWl0IHpvbmUgc2V0dGluZ3Ncblx0XHRcdFx0XHRcdGlmICh0aGlzLl9lZGl0ZWRab25lSWQgPiAtMSlcblx0XHRcdFx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9TQVZFX1pPTkVfQ09ORklHLCBwYXJhbXMpO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX05FV19aT05FX0NPTkZJRywgcGFyYW1zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIFN1Ym1pdCByb29tIHNldHRpbmdzXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fZWRpdGVkUm9vbUlkID4gLTEpXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfU0FWRV9ST09NX0NPTkZJRywgcGFyYW1zKTtcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ORVdfUk9PTV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYFVuYWJsZSB0byBzdWJtaXQgY29uZmlndXJhdGlvbiBiZWNhdXNlIHRoZSAke2NhcGl0YWxpemVGaXJzdCh0aGlzLl9lZGl0ZWRJdGVtVHlwZSl9IG5hbWUgYWxyZWFkeSBleGlzdHM7IGR1cGxpY2F0ZSBuYW1lcyBhcmUgbm90IGFsbG93ZWQuYCwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydCgnVW5hYmxlIHRvIHN1Ym1pdCBjb25maWd1cmF0aW9uIGNoYW5nZXMgZHVlIHRvIGFuIGludmFsaWQgdmFsdWU7IHBsZWFzZSB2ZXJpZnkgdGhlIGhpZ2hsaWdodGVkIGZvcm0gZmllbGRzIGluIGFsbCB0YWJzLicsIHRydWUpO1xuXHRcdH1cblx0fVxuXG5cdF9vbkNvbmZpZ1ZhbHVlU2V0KGUpIC8vIFNBTUUgTUVUSE9EIERVUExJQ0FURUQgSU4gem9uZS1tb25pdG9yLmpzXG5cdHtcblx0XHRjb25zdCBjb25maWdQYXJhbSA9IGUudGFyZ2V0LmRhdGE7XG5cblx0XHQvLyBIYW5kbGUgZXh0ZW5zaW9uIG5hbWUvdHlwZSBkcm9wZG93bnMgdXBkYXRlIGFuZCB1cGRhdGUgdGhlIG1haW4gY2xhc3MgZHJvcGRvd24gZGF0YXNvdXJjZSBhY2NvcmRpbmdseVxuXHRcdGlmIChjb25maWdQYXJhbS5uYW1lID09ICdleHRlbnNpb24ubmFtZScgfHwgY29uZmlnUGFyYW0ubmFtZSA9PSAnZXh0ZW5zaW9uLnR5cGUnIHx8IGNvbmZpZ1BhcmFtLm5hbWUgPT0gJ2V4dGVuc2lvbi5maWx0ZXJDbGFzcycpXG5cdFx0e1xuXHRcdFx0Ly8gQWxsIGludm9sdmVkIENvbmZpZ0Zvcm1JdGVtcyBtdXN0IGJlIGF2YWlsYWJsZSBhbmQgaW5pdGlhbGl6ZWQgdG8gcHJvY2VlZFxuXHRcdFx0Y29uc3QgbmFtZUZvcm1JdGVtID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDb25maWdGb3JtSXRlbSgnZXh0ZW5zaW9uLm5hbWUnKTtcblx0XHRcdGNvbnN0IHR5cGVGb3JtSXRlbSA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q29uZmlnRm9ybUl0ZW0oJ2V4dGVuc2lvbi50eXBlJyk7XG5cdFx0XHRjb25zdCBjbGFzc0Zvcm1JdGVtID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDb25maWdGb3JtSXRlbSgnZXh0ZW5zaW9uLmZpbGUnKTtcblx0XHRcdGNvbnN0IGZpbHRlckZvcm1JdGVtID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDb25maWdGb3JtSXRlbSgnZXh0ZW5zaW9uLmZpbHRlckNsYXNzJyk7XG5cblx0XHRcdGlmIChuYW1lRm9ybUl0ZW0gIT0gbnVsbCAmJiB0eXBlRm9ybUl0ZW0gIT0gbnVsbCAmJiBjbGFzc0Zvcm1JdGVtICE9IG51bGwgJiYgZmlsdGVyRm9ybUl0ZW0gIT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0Y29uc3Qgc291cmNlID0gbmFtZUZvcm1JdGVtLmRhdGE7XG5cdFx0XHRcdGxldCBjbGFzc2VzTGlzdCA9IFtdO1xuXG5cdFx0XHRcdGxldCBkYXRhID0gc291cmNlLnRyaWdnZXJEYXRhO1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc2l6ZSgpOyBpKyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgZXh0ID0gZGF0YS5nZXRTRlNPYmplY3QoaSk7XG5cblx0XHRcdFx0XHRpZiAoZXh0LmdldFV0ZlN0cmluZygnbmFtZScpID09IG5hbWVGb3JtSXRlbS5kYXRhLnZhbHVlICYmIGV4dC5nZXRVdGZTdHJpbmcoJ3R5cGUnKSA9PSB0eXBlRm9ybUl0ZW0uZGF0YS52YWx1ZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRsZXQgY2xhc3NlcyA9IGV4dC5nZXRVdGZTdHJpbmcoJ2NsYXNzZXNTdHJpbmcnKS5zcGxpdCgnLCcpO1xuXG5cdFx0XHRcdFx0XHRpZiAoZmlsdGVyRm9ybUl0ZW0uZGF0YS52YWx1ZSA9PSB0cnVlKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRsZXQgZmlsdGVyZWRDbGFzc2VzID0gY2xhc3Nlcy5maWx0ZXIoZmlsdGVyQ2xhc3NOYW1lKTtcblx0XHRcdFx0XHRcdFx0Y2xhc3NlcyA9IGZpbHRlcmVkQ2xhc3Nlcztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y2xhc3Nlc0xpc3QgPSBjbGFzc2VzTGlzdC5jb25jYXQoY2xhc3Nlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGN1cnJlbnRDbGFzcyA9IGNsYXNzRm9ybUl0ZW0uZGF0YS52YWx1ZTtcblxuXHRcdFx0XHQvLyBJZiB0aGUgY2xhc3NlcyBsaXN0IGRvZXNuJ3QgY29udGFpbiB0aGUgY3VycmVudCB2YWx1ZSwgY3JlYXRlIGFuIGVtcHR5IGVudHJ5IGFuZCByZXNldCB0aGUgdmFsdWVcblx0XHRcdFx0aWYgKGNsYXNzZXNMaXN0LmluZGV4T2YoY3VycmVudENsYXNzKSA8IDApXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoY2xhc3Nlc0xpc3QubGVuZ3RoID09IDApXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Y2xhc3Nlc0xpc3QucHVzaCgnJyk7XG5cdFx0XHRcdFx0XHRjdXJyZW50Q2xhc3MgPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0Y3VycmVudENsYXNzID0gY2xhc3Nlc0xpc3RbMF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgbWFpbkNsYXNzRHJvcERvd24gPSBjbGFzc0Zvcm1JdGVtLl9pbm5lcldpZGdldDtcblx0XHRcdFx0bWFpbkNsYXNzRHJvcERvd24uc2V0RGF0YVNvdXJjZShjbGFzc2VzTGlzdCk7XG5cblx0XHRcdFx0Y2xhc3NGb3JtSXRlbS5kYXRhLnZhbHVlID0gY3VycmVudENsYXNzO1xuXHRcdFx0XHRjbGFzc0Zvcm1JdGVtLl9zZXRXaWRnZXRWYWx1ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9lbmFibGVMaXN0SW50ZXJmYWNlKGVuYWJsZWQpXG5cdHtcblx0XHQkKCcjem5jLXV0aWxCdXR0b25zJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdFx0JCgnI3puYy10cmVlVmlldycpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHR9XG5cblx0X3NldFV0aWxpdHlCdXR0b25zU3RhdGUoZGF0YUl0ZW0gPSBudWxsKVxuXHR7XG5cdFx0bGV0IGRpc2FibGUgPSB0cnVlO1xuXG5cdFx0aWYgKGRhdGFJdGVtKVxuXHRcdHtcblx0XHRcdC8vIEVuYWJsZSAnYWN0aXZhdGUgem9uZScgYnV0dG9uIGlmIHpvbmUgaXMgaW5hY3RpdmVcblx0XHRcdCQoJyN6bmMtYWN0aXZhdGVCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIChkYXRhSXRlbS50eXBlICE9IHRoaXMuSVRFTV9UWVBFX1pPTkUgfHwgZGF0YUl0ZW0uYWN0aXZlKSk7XG5cblx0XHRcdGRpc2FibGUgPSBmYWxzZTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIERpc2FibGUgJ2FjdGl2YXRlIHpvbmUnIGJ1dHRvblxuXHRcdFx0JCgnI3puYy1hY3RpdmF0ZUJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgb3RoZXIgdXRpbGl0eSBidXR0b25zXG5cdFx0JCgnI3puYy1hZGRab25lQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7IC8vIEFsd2F5cyBlbmFibGVkXG5cdFx0JCgnI3puYy1hZGRSb29tQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBkaXNhYmxlKTtcblx0XHQkKCcjem5jLWVkaXRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIGRpc2FibGUpO1xuXHRcdCQoJyN6bmMtcmVtb3ZlQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBkaXNhYmxlKTtcblx0fVxuXG5cdF9lbmFibGVDb25maWdJbnRlcmZhY2UoZW5hYmxlZClcblx0e1xuXHRcdCQoJyN6bmMtY2FuY2VsQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdFx0JCgnI3puYy1yZWxvYWRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyN6bmMtYmFja3VwQ2hlY2snKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGlzYWJsZUludGVyZmFjZSghZW5hYmxlZCk7XG5cblx0XHQvLyBBbHNvIHN3aXRjaCB2aWV3IHdoZW4gZW5hYmxlZFxuXHRcdGlmIChlbmFibGVkKVxuXHRcdFx0dGhpcy5fc3dpdGNoVmlldygnem5jLW1haW4nKTtcblx0fVxuXG5cdF9zd2l0Y2hWaWV3KHZpZXdJZClcblx0e1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6bmMtdmlld3N0YWNrJykuc2VsZWN0ZWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlld0lkKTtcblx0fVxuXG5cdF9jbGVhclRhYnMoKVxuXHR7XG5cdFx0Ly8gRGVzdHJveSBzY3JvbGxpbmcgdGFic1xuXHRcdCQoJyN6bmMtdGFiTmF2aWdhdG9yICN0YWJzJykuc2Nyb2xsaW5nVGFicygnZGVzdHJveScpO1xuXG5cdFx0Ly8gUmVtb3ZlIGFsbCB0YWIgbmF2aWdhdG9yIGNvbnRlbnRcblx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmRlc3Ryb3lJbnRlcmZhY2UoKTtcblxuXHRcdC8vIFNldCBmbGFnIHRvIHJlLWluaXRpYWxpemUgdGFicyBpZiBuZWVkZWRcblx0XHR0aGlzLl9yZWluaXRUYWJzID0gdHJ1ZTtcblx0fVxuXG5cdF9wb3B1bGF0ZVRyZWUoZGF0YSlcblx0e1xuXHRcdGxldCB6RGF0YSA9IGRhdGEuZ2V0U0ZTQXJyYXkoJ3pvbmVzJyk7XG5cblx0XHRsZXQgem9uZXNBcnIgPSBbXTtcblx0XHRmb3IgKGxldCB6ID0gMDsgeiA8IHpEYXRhLnNpemUoKTsgeisrKVxuXHRcdFx0em9uZXNBcnIucHVzaCggdGhpcy5fY3JlYXRlWm9uZU9iamVjdCh6RGF0YS5nZXRTRlNPYmplY3QoeikpICk7XG5cblx0XHQvLyBDcmVhdGUgZGF0YXNvdXJjZVxuXHRcdGxldCB6b25lcyA9IG5ldyBrZW5kby5kYXRhLkhpZXJhcmNoaWNhbERhdGFTb3VyY2Uoe1xuICAgICAgICAgICAgZGF0YTogem9uZXNBcnIsXG5cdFx0XHRzb3J0OiB7XG5cdFx0XHRcdGZpZWxkOiAnbmFtZScsXG5cdFx0XHRcdGRpcjogJ2FzYydcblx0XHRcdH0sXG4gICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICBtb2RlbDoge1xuXHRcdFx0XHRcdGlkOiAnaWQnLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjoge1xuXHRcdFx0XHRcdFx0c2NoZW1hOiB7XG5cdFx0XHRcdFx0XHRcdGRhdGE6ICdyb29tcycsXG5cdFx0XHRcdFx0XHRcdHNvcnQ6IHtcblx0XHRcdFx0XHRcdFx0XHRmaWVsZDogJ25hbWUnLFxuXHRcdFx0XHRcdFx0XHRcdGRpcjogJ2FzYydcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cdFx0Ly8gU2V0IHRyZWUgdmlldyBkYXRhcHJvdmlkZXJcblx0XHR0aGlzLl90cmVldmlldy5zZXREYXRhU291cmNlKHpvbmVzKTtcblxuXHRcdC8vIFNldCB1dGlsaXR5IGJ1dHRvbnMgc3RhdGUgKGFkZCwgcmVtb3ZlLCBlZGl0LCBldGMpXG5cdFx0dGhpcy5fc2V0VXRpbGl0eUJ1dHRvbnNTdGF0ZSgpO1xuXHR9XG5cblx0X2NyZWF0ZVpvbmVPYmplY3Qoem9uZURhdGEpXG5cdHtcblx0XHRsZXQgem9uZSA9IHtcblx0XHRcdHR5cGU6IHRoaXMuSVRFTV9UWVBFX1pPTkUsXG5cdFx0XHRuYW1lOiB6b25lRGF0YS5nZXRVdGZTdHJpbmcoJ25hbWUnKSxcblx0XHRcdGlkOiB6b25lRGF0YS5nZXRJbnQoJ2lkJyksXG5cdFx0XHRhY3RpdmU6IHpvbmVEYXRhLmdldEJvb2woJ2FjdCcpXG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIHJvb21zIGxpc3QgZGF0YXByb3ZpZGVyXG5cdFx0bGV0IHJEYXRhID0gem9uZURhdGEuZ2V0U0ZTQXJyYXkoJ3Jvb21zJyk7XG5cblx0XHRsZXQgcm9vbXNBcnIgPSBbXTtcblx0XHRmb3IgKGxldCByID0gMDsgciA8IHJEYXRhLnNpemUoKTsgcisrKVxuXHRcdFx0cm9vbXNBcnIucHVzaCggdGhpcy5fY3JlYXRlUm9vbU9iamVjdChyRGF0YS5nZXRTRlNPYmplY3QociksIHpvbmVEYXRhLmdldEludCgnaWQnKSkgKTtcblxuXHRcdHpvbmUucm9vbXMgPSByb29tc0FycjtcblxuXHRcdHJldHVybiB6b25lO1xuXHR9XG5cblx0X2NyZWF0ZVJvb21PYmplY3Qocm9vbURhdGEsIHpvbmVJZClcblx0e1xuXHRcdGxldCByb29tID0ge1xuXHRcdFx0dHlwZTogdGhpcy5JVEVNX1RZUEVfUk9PTSxcblx0XHRcdG5hbWU6IHJvb21EYXRhLmdldFV0ZlN0cmluZygnbmFtZScpLFxuXHRcdFx0aWQ6IHJvb21EYXRhLmdldEludCgnaWQnKSxcblx0XHRcdGFjdGl2ZTogcm9vbURhdGEuZ2V0Qm9vbCgnYWN0JyksXG5cdFx0XHRwYXJlbnRJZDogem9uZUlkLFxuXHRcdFx0c3ByaXRlQ3NzQ2xhc3M6IHRoaXMuX2dldFJvb21MaXN0SWNvbkNzc0NsYXNzKHJvb21EYXRhLmdldEJvb2woJ2FjdCcpKVxuXHRcdH07XG5cblx0XHRyZXR1cm4gcm9vbTtcblx0fVxuXG5cdF9nZXRSb29tTGlzdEljb25Dc3NDbGFzcyhpc0FjdGl2ZSlcblx0e1xuXHRcdHJldHVybiBpc0FjdGl2ZSA/ICdmYXMgZmEtZG9vci1vcGVuJyA6ICdmYXMgZmEtZG9vci1jbG9zZWQgaW5hY3RpdmUtbGlzdC1pdGVtJztcblx0fVxuXG5cdF9zZXRab25lQWN0aXZhdGlvblN0YXR1cyh6b25lSWQsIGFjdGl2ZVJvb21zLCBpc0FjdGl2ZSlcblx0e1xuXHRcdGxldCB6b25lREkgPSB0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKHpvbmVJZCk7XG5cblx0XHR6b25lREkuYWN0aXZlID0gaXNBY3RpdmU7XG5cblx0XHRsZXQgYWN0aXZlUm9vbXNBcnIgPSBhY3RpdmVSb29tcy5zcGxpdCgnLCcpO1xuXG5cdFx0aWYgKHpvbmVESS5oYXNDaGlsZHJlbilcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHpvbmVESS5jaGlsZHJlbi5kYXRhKCkubGVuZ3RoOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdGxldCByb29tID0gem9uZURJLmNoaWxkcmVuLmRhdGEoKVtpXTtcblx0XHRcdFx0cm9vbS5hY3RpdmUgPSAoaXNBY3RpdmUgJiYgYWN0aXZlUm9vbXNBcnIuaW5kZXhPZihyb29tLm5hbWUpID4gLTEpO1xuXHRcdFx0XHRyb29tLnNwcml0ZUNzc0NsYXNzID0gdGhpcy5fZ2V0Um9vbUxpc3RJY29uQ3NzQ2xhc3Mocm9vbS5hY3RpdmUpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUmVmcmVzaCBsaXN0XG5cdFx0dGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZS5zeW5jKCk7XG5cblx0XHQvLyBSZXR1cm4gem9uZSBuYW1lXG5cdFx0cmV0dXJuIHpvbmVESS5uYW1lO1xuXHR9XG5cblx0X2Rlc2VsZWN0VHJlZUl0ZW0oKVxuXHR7XG5cdFx0dGhpcy5fdHJlZXZpZXcuc2VsZWN0KCQoKSk7XG5cdH1cblxuXHRfc2VsZWN0UGFyZW50VHJlZUl0ZW0oKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuX3RyZWV2aWV3LnNlbGVjdCgpO1xuXHRcdGxldCBzZWxlY3RlZERhdGFJdGVtID0gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0oc2VsZWN0ZWROb2RlKTtcblxuXHRcdGlmIChzZWxlY3RlZERhdGFJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSlcblx0XHR7XG5cdFx0XHRsZXQgcGFyZW50Tm9kZSA9IHRoaXMuX3RyZWV2aWV3LnBhcmVudChzZWxlY3RlZE5vZGUpO1xuXHRcdFx0dGhpcy5fdHJlZXZpZXcuc2VsZWN0KHBhcmVudE5vZGUpO1xuXHRcdH1cblx0fVxuXG5cdF9sb2FkQ29uZmlndXJhdGlvbih0eXBlLCByZXNldFRhYnMgPSB0cnVlKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSB6b25lL3Jvb20gc2VsZWN0aW9uIGxpc3Rcblx0XHR0aGlzLl9lbmFibGVMaXN0SW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdC8vIERpc2FibGUgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0Ly8gQ2xlYXIgbWFpbiBjb250YWluZXJcblx0XHR0aGlzLl9yZXNldFRhYnNDb250YWluZXIodHJ1ZSwgcmVzZXRUYWJzKTtcblxuXHRcdC8vIFNldCBpc0VkaXRpbmcgZmxhZ1xuXHRcdHRoaXMuX2lzRWRpdGluZyA9IHRydWU7XG5cdFx0dGhpcy5fZWRpdGVkSXRlbVR5cGUgPSB0eXBlO1xuXG5cdFx0Ly8gUmVxdWVzdCB6b25lIG9yIHJvb20gY29uZmlndXJhdGlvbiBkYXRhIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0cGFyYW1zLnB1dEludCgneklkJywgdGhpcy5fZWRpdGVkWm9uZUlkKTtcblx0XHRwYXJhbXMucHV0SW50KCdySWQnLCB0aGlzLl9lZGl0ZWRSb29tSWQpO1xuXG5cdFx0Ly8gSWYgbm8gcm9vbSBpcyBzZWxlY3RlZCwgdGhlbiB3ZSBhcmUgZWRpdGluZyBhIHpvbmVcblx0XHRpZiAodGhpcy5fZWRpdGVkSXRlbVR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX1pPTkVfQ09ORklHLCBwYXJhbXMpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX1JPT01fQ09ORklHLCBwYXJhbXMpO1xuXG5cdFx0Ly8gU3dpdGNoIHBhbmVsXG5cdFx0dGhpcy5fc3dpdGNoUGFuZWwoJ3puYy1tYWluUGFuZWwnKTtcblx0fVxuXG5cdF9yZXNldFRhYnNDb250YWluZXIoaXNMb2FkaW5nLCByZXNldFRhYnMpXG5cdHtcblx0XHRpZiAocmVzZXRUYWJzKVxuXHRcdFx0dGhpcy5fY2xlYXJUYWJzKCk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fcmVpbml0VGFicyA9IGZhbHNlO1xuXG5cdFx0aWYgKCFpc0xvYWRpbmcpXG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCd6bmMtc2VsZWN0Jyk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fc3dpdGNoVmlldygnem5jLWxvYWRpbmcnKTtcblx0fVxuXG5cdF9zd2l0Y2hQYW5lbChwYW5lbElkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3puYy12aWV3Jykuc2VsZWN0ZWRQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBhbmVsSWQpO1xuXHR9XG5cblx0X2dldFpvbmVEYXRhSXRlbUJ5SWQoem9uZUlkKVxuXHR7XG5cdFx0bGV0IHpvbmVzRFMgPSB0aGlzLl90cmVldmlldy5kYXRhU291cmNlO1xuXHRcdHJldHVybiB6b25lc0RTLmdldCh6b25lSWQpO1xuXHR9XG5cblx0X2dldFJvb21EYXRhSXRlbUJ5SWQoem9uZUlkLCByb29tSWQpXG5cdHtcblx0XHRsZXQgem9uZURJID0gdGhpcy5fZ2V0Wm9uZURhdGFJdGVtQnlJZCh6b25lSWQpO1xuXG5cdFx0aWYgKHpvbmVESS5oYXNDaGlsZHJlbilcblx0XHRcdHJldHVybiB6b25lREkuY2hpbGRyZW4uZ2V0KHJvb21JZCk7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdF91cGRhdGVab25lTmFtZUluTGlzdCh6b25lSWQsIHpvbmVOYW1lKVxuXHR7XG5cdFx0dGhpcy5fZ2V0Wm9uZURhdGFJdGVtQnlJZCh6b25lSWQpLm5hbWUgPSB6b25lTmFtZTtcblx0XHR0aGlzLl90cmVldmlldy5kYXRhU291cmNlLnN5bmMoKTtcblx0fVxuXG5cdF91cGRhdGVSb29tTmFtZUluTGlzdCh6b25lSWQsIHJvb21JZCwgcm9vbU5hbWUpXG5cdHtcblx0XHR0aGlzLl9nZXRSb29tRGF0YUl0ZW1CeUlkKHpvbmVJZCwgcm9vbUlkKS5uYW1lID0gcm9vbU5hbWU7XG5cdFx0dGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZS5zeW5jKCk7XG5cdH1cblxuXHRfdmFsaWRhdGVOYW1lKGNoYW5nZXMpXG5cdHtcblx0XHRjb25zdCB6b25lSWQgPSB0aGlzLl9lZGl0ZWRab25lSWQ7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5nZXMuc2l6ZSgpOyBpKyspXG5cdFx0e1xuXHRcdFx0Y29uc3Qgc2V0dGluZyA9IGNoYW5nZXMuZ2V0U0ZTT2JqZWN0KGkpO1xuXG5cdFx0XHRpZiAoc2V0dGluZy5jb250YWluc0tleSgnbmFtZScpICYmIHNldHRpbmcuZ2V0VXRmU3RyaW5nKCduYW1lJykgPT0gJ25hbWUnKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBHZXQgbmFtZSB2YWx1ZVxuXHRcdFx0XHRjb25zdCBuYW1lID0gc2V0dGluZy5nZXRUZXh0KCd2YWx1ZScpO1xuXG5cdFx0XHRcdC8vIEdldCBkYXRhIHNvdXJjZVxuXHRcdFx0XHRsZXQgZHMgPSBbXTtcblxuXHRcdFx0XHRpZiAodGhpcy5fZWRpdGVkSXRlbVR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHRcdFx0XHRkcyA9IHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2UuZGF0YSgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAodGhpcy5fZ2V0Wm9uZURhdGFJdGVtQnlJZCh6b25lSWQpLmhhc0NoaWxkcmVuKVxuXHRcdFx0XHRcdFx0ZHMgPSB0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKHpvbmVJZCkuY2hpbGRyZW4uZGF0YSgpO1xuXHRcdFx0XHR9XG5cblxuXHRcdFx0XHQvLyBDaGVjayBpZiBuYW1lIGV4aXN0cyBpbiBkYXRhIHNvdXJjZVxuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGRzLmxlbmd0aDsgaisrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKGRzW2pdLm5hbWUgPT0gbmFtZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRnZXQgX3NlbGVjdGVkSXRlbSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0odGhpcy5fdHJlZXZpZXcuc2VsZWN0KCkpO1xuXHR9XG5cblx0Z2V0IF9zZWxlY3RlZEl0ZW1QYXJlbnQoKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuX3RyZWV2aWV3LnNlbGVjdCgpO1xuXHRcdGxldCBwYXJlbnROb2RlID0gdGhpcy5fdHJlZXZpZXcucGFyZW50KHNlbGVjdGVkTm9kZSk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0ocGFyZW50Tm9kZSk7XG5cdH1cblxuXHRnZXQgX2VkaXRlZFpvbmVJZCgpXG5cdHtcblx0XHRpZiAodGhpcy5faXNFZGl0aW5nICYmIHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHR7XG5cdFx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbS5pZDtcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbVBhcmVudC5pZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRnZXQgX2VkaXRlZFJvb21JZCgpXG5cdHtcblx0XHRpZiAodGhpcy5faXNFZGl0aW5nICYmIHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHR7XG5cdFx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbS5pZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=