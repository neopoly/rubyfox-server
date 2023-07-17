/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-4"],{

/***/ "./src/modules/cluster-configurator.js":
/*!*********************************************!*\
  !*** ./src/modules/cluster-configurator.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClusterConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");



class ClusterConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('clusterConfig');

		// Outgoing requests
		this.REQ_GET_CONFIG = 'getConfig';
		this.REQ_UPDATE_CONFIG = 'updConfig';

		// Incoming responses
		this.RESP_CONFIG = 'config';
		this.RESP_CONFIG_UPDATE_CONFIRM = 'configUpdate';
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

		// Initialize progress bar
		$('#clc-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Create interface builder instance
		this._interfaceBuilder = new _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__["ConfigInterfaceBuilder"]();

		// Add listener to interface buttons
		$('#clc-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#clc-submitButton').on('click', $.proxy(this._onSubmitClick, this));

		//-----------------------------------*/

		// Request configuration data to server instance
		this.sendExtensionRequest(this.REQ_GET_CONFIG);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Remove interface buttons click listeners
		$('#clc-reloadButton').off('click');
		$('#clc-submitButton').off('click');

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		// Cluster configuration data received
		if (command == this.RESP_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'clc-tabNavigator', false);

			// Enable buttons
			this._enableButtons(true);

			// Initialize TabNavigator-ralated widgets
			if (!this._tabNavInitialized)
			{
				// Enable scrolling tabs
				$('#clc-tabNavigator > #tabs').scrollingTabs({
					bootstrapVersion: 4,
					scrollToTabEdge: true,
					enableSwiping: true,
					disableScrollArrowsOnFullyScrolled: true,
					cssClassLeftArrow: 'fa fa-chevron-left',
					cssClassRightArrow: 'fa fa-chevron-right'
				});

				this._tabNavInitialized = true;
			}

			// Run validation (to remove validation messages if data was reloaded)
			this._interfaceBuilder.checkIsValid();

			this._switchView('clc-main');
		}

		// Cluster configuration update confirmation
		else if (command == this.RESP_CONFIG_UPDATE_CONFIRM)
		{
			// Enable buttons
			this._enableButtons(true);

			// Enable form items
			this._interfaceBuilder.disableInterface(false);

			// If the current user is the updater, show a notification
			// Otherwise, show a dialog box suggesting to reload
			let updater = data.getUtfString('user');

			if (updater == this.smartFox.mySelf.name)
			{
				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();

				// Display notification
				this.shellCtrl.showNotification('Cluster settings updated', 'Immediate changes (<i class="fas fa-bolt"></i>) have been applied; all other changes will be active after next server restart');
			}
			else
			{
				// Show alert
				this.shellCtrl.showSimpleAlert(`Administrator ${updater} has modified the cluster settings; please reload to update your view.`);

				// Disable submit button
				$('#clc-submitButton').attr('disabled', true);
			}
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_enableButtons(enabled)
	{
		$('#clc-reloadButton').attr('disabled', !enabled);
		$('#clc-submitButton').attr('disabled', !enabled);
		$('#clc-backupCheck').attr('disabled', !enabled);
	}

	_switchView(viewId)
	{
		document.getElementById('clc-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#clc-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();
	}

	_onReloadClick()
	{
		// Disable buttons
		this._enableButtons(false);

		// Switch to loading view
		this._switchView('clc-loading');

		// Hide validation messages
		this._interfaceBuilder.resetValidation();

		// Request configuration data to server instance
		this.sendExtensionRequest(this.REQ_GET_CONFIG);
	}

	_onSubmitClick()
	{
		// Check validity
		if (this._interfaceBuilder.checkIsValid())
		{
			let changes = this._interfaceBuilder.getChangedData();

			if (changes.size() > 0)
			{
				// Disable buttons
				this._enableButtons(false);

				// Disable form items
				this._interfaceBuilder.disableInterface(true);

				// Send updated settings to server instance
				let params = new SFS2X.SFSObject();
				params.putSFSArray('settings', changes);
				params.putBool('backup', $('#clc-backupCheck').prop('checked'));

				this.sendExtensionRequest(this.REQ_UPDATE_CONFIG, params);
			}
		}
		else
			this.shellCtrl.showSimpleAlert('Unable to submit configuration changes due to an invalid value; please verify the highlighted form fields in all tabs.', true);
	}

	_updateConfigFormItemDisplayedValue(configParamName, newValue)
	{
		// Get the relevant Configuration Form Item
		const configFormItem = this._interfaceBuilder.getConfigFormItem(configParamName);

		// Update Configuration Parameter associated with the Configuration Form Item
		configFormItem.data.value = newValue;
		configFormItem.data.resetIsModified(); // This is needed to avoid the Configuration Parameter to flagged as 'changed'

		// Display the new value of the Configuration Form Item
		configFormItem._setWidgetValue(); // Display the new value in the config form item
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtNC5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL2NsdXN0ZXItY29uZmlndXJhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSAnLi9iYXNlLW1vZHVsZSc7XG5pbXBvcnQge0NvbmZpZ0ludGVyZmFjZUJ1aWxkZXJ9IGZyb20gJy4uL3V0aWxzL3VpYnVpbGRlci9jb25maWctaW50ZXJmYWNlLWJ1aWxkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbHVzdGVyQ29uZmlndXJhdG9yIGV4dGVuZHMgQmFzZU1vZHVsZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCdjbHVzdGVyQ29uZmlnJyk7XG5cblx0XHQvLyBPdXRnb2luZyByZXF1ZXN0c1xuXHRcdHRoaXMuUkVRX0dFVF9DT05GSUcgPSAnZ2V0Q29uZmlnJztcblx0XHR0aGlzLlJFUV9VUERBVEVfQ09ORklHID0gJ3VwZENvbmZpZyc7XG5cblx0XHQvLyBJbmNvbWluZyByZXNwb25zZXNcblx0XHR0aGlzLlJFU1BfQ09ORklHID0gJ2NvbmZpZyc7XG5cdFx0dGhpcy5SRVNQX0NPTkZJR19VUERBVEVfQ09ORklSTSA9ICdjb25maWdVcGRhdGUnO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLyBUaGlzIG1ldGhvZHMgb3ZlcnJpZGUgdGhvc2UgaW4gQmFzZU1vZHVsZSBjbGFzcy5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyXG5cdFx0JCgnI2NsYy1wcm9ncmVzc0JhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIENyZWF0ZSBpbnRlcmZhY2UgYnVpbGRlciBpbnN0YW5jZVxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIgPSBuZXcgQ29uZmlnSW50ZXJmYWNlQnVpbGRlcigpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGludGVyZmFjZSBidXR0b25zXG5cdFx0JCgnI2NsYy1yZWxvYWRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjY2xjLXN1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25TdWJtaXRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHQvLyBSZXF1ZXN0IGNvbmZpZ3VyYXRpb24gZGF0YSB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9DT05GSUcpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdC8vIFJlbW92ZSBpbnRlcmZhY2UgYnV0dG9ucyBjbGljayBsaXN0ZW5lcnNcblx0XHQkKCcjY2xjLXJlbG9hZEJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjY2xjLXN1Ym1pdEJ1dHRvbicpLm9mZignY2xpY2snKTtcblxuXHRcdC8vIENsZWFyIHRhYnMgY29udGFpbmVyXG5cdFx0dGhpcy5fY2xlYXJUYWJzKCk7XG5cdH1cblxuXHRvbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZCwgZGF0YSlcblx0e1xuXHRcdC8vIENsdXN0ZXIgY29uZmlndXJhdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0NPTkZJRylcblx0XHR7XG5cdFx0XHQvLyBCdWlsZCB1c2VyIGludGVyZmFjZSBiYXNlZCBvbiByZWNlaXZlZCBkYXRhXG5cdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmJ1aWxkSW50ZXJmYWNlKGRhdGEuZ2V0U0ZTQXJyYXkoJ3NldHRpbmdzJyksICdjbGMtdGFiTmF2aWdhdG9yJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uc1xuXHRcdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyh0cnVlKTtcblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSBUYWJOYXZpZ2F0b3ItcmFsYXRlZCB3aWRnZXRzXG5cdFx0XHRpZiAoIXRoaXMuX3RhYk5hdkluaXRpYWxpemVkKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBFbmFibGUgc2Nyb2xsaW5nIHRhYnNcblx0XHRcdFx0JCgnI2NsYy10YWJOYXZpZ2F0b3IgPiAjdGFicycpLnNjcm9sbGluZ1RhYnMoe1xuXHRcdFx0XHRcdGJvb3RzdHJhcFZlcnNpb246IDQsXG5cdFx0XHRcdFx0c2Nyb2xsVG9UYWJFZGdlOiB0cnVlLFxuXHRcdFx0XHRcdGVuYWJsZVN3aXBpbmc6IHRydWUsXG5cdFx0XHRcdFx0ZGlzYWJsZVNjcm9sbEFycm93c09uRnVsbHlTY3JvbGxlZDogdHJ1ZSxcblx0XHRcdFx0XHRjc3NDbGFzc0xlZnRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tbGVmdCcsXG5cdFx0XHRcdFx0Y3NzQ2xhc3NSaWdodEFycm93OiAnZmEgZmEtY2hldnJvbi1yaWdodCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5fdGFiTmF2SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSdW4gdmFsaWRhdGlvbiAodG8gcmVtb3ZlIHZhbGlkYXRpb24gbWVzc2FnZXMgaWYgZGF0YSB3YXMgcmVsb2FkZWQpXG5cdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmNoZWNrSXNWYWxpZCgpO1xuXG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdjbGMtbWFpbicpO1xuXHRcdH1cblxuXHRcdC8vIENsdXN0ZXIgY29uZmlndXJhdGlvbiB1cGRhdGUgY29uZmlybWF0aW9uXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfQ09ORklHX1VQREFURV9DT05GSVJNKVxuXHRcdHtcblx0XHRcdC8vIEVuYWJsZSBidXR0b25zXG5cdFx0XHR0aGlzLl9lbmFibGVCdXR0b25zKHRydWUpO1xuXG5cdFx0XHQvLyBFbmFibGUgZm9ybSBpdGVtc1xuXHRcdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5kaXNhYmxlSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvblxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0bGV0IHVwZGF0ZXIgPSBkYXRhLmdldFV0ZlN0cmluZygndXNlcicpO1xuXG5cdFx0XHRpZiAodXBkYXRlciA9PSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBSZXNldCB0aGUgJ21vZGlmaWVkJyBmbGFnXG5cdFx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIucmVzZXRJc01vZGlmaWVkKCk7XG5cblx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignQ2x1c3RlciBzZXR0aW5ncyB1cGRhdGVkJywgJ0ltbWVkaWF0ZSBjaGFuZ2VzICg8aSBjbGFzcz1cImZhcyBmYS1ib2x0XCI+PC9pPikgaGF2ZSBiZWVuIGFwcGxpZWQ7IGFsbCBvdGhlciBjaGFuZ2VzIHdpbGwgYmUgYWN0aXZlIGFmdGVyIG5leHQgc2VydmVyIHJlc3RhcnQnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYEFkbWluaXN0cmF0b3IgJHt1cGRhdGVyfSBoYXMgbW9kaWZpZWQgdGhlIGNsdXN0ZXIgc2V0dGluZ3M7IHBsZWFzZSByZWxvYWQgdG8gdXBkYXRlIHlvdXIgdmlldy5gKTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0JCgnI2NsYy1zdWJtaXRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9lbmFibGVCdXR0b25zKGVuYWJsZWQpXG5cdHtcblx0XHQkKCcjY2xjLXJlbG9hZEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyNjbGMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdFx0JCgnI2NsYy1iYWNrdXBDaGVjaycpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHR9XG5cblx0X3N3aXRjaFZpZXcodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsYy12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X2NsZWFyVGFicygpXG5cdHtcblx0XHQvLyBEZXN0cm95IHNjcm9sbGluZyB0YWJzXG5cdFx0JCgnI2NsYy10YWJOYXZpZ2F0b3IgI3RhYnMnKS5zY3JvbGxpbmdUYWJzKCdkZXN0cm95Jyk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIHRhYiBuYXZpZ2F0b3IgY29udGVudFxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGVzdHJveUludGVyZmFjZSgpO1xuXHR9XG5cblx0X29uUmVsb2FkQ2xpY2soKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBidXR0b25zXG5cdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyhmYWxzZSk7XG5cblx0XHQvLyBTd2l0Y2ggdG8gbG9hZGluZyB2aWV3XG5cdFx0dGhpcy5fc3dpdGNoVmlldygnY2xjLWxvYWRpbmcnKTtcblxuXHRcdC8vIEhpZGUgdmFsaWRhdGlvbiBtZXNzYWdlc1xuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIucmVzZXRWYWxpZGF0aW9uKCk7XG5cblx0XHQvLyBSZXF1ZXN0IGNvbmZpZ3VyYXRpb24gZGF0YSB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9DT05GSUcpO1xuXHR9XG5cblx0X29uU3VibWl0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gQ2hlY2sgdmFsaWRpdHlcblx0XHRpZiAodGhpcy5faW50ZXJmYWNlQnVpbGRlci5jaGVja0lzVmFsaWQoKSlcblx0XHR7XG5cdFx0XHRsZXQgY2hhbmdlcyA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q2hhbmdlZERhdGEoKTtcblxuXHRcdFx0aWYgKGNoYW5nZXMuc2l6ZSgpID4gMClcblx0XHRcdHtcblx0XHRcdFx0Ly8gRGlzYWJsZSBidXR0b25zXG5cdFx0XHRcdHRoaXMuX2VuYWJsZUJ1dHRvbnMoZmFsc2UpO1xuXG5cdFx0XHRcdC8vIERpc2FibGUgZm9ybSBpdGVtc1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmRpc2FibGVJbnRlcmZhY2UodHJ1ZSk7XG5cblx0XHRcdFx0Ly8gU2VuZCB1cGRhdGVkIHNldHRpbmdzIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdFx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdFx0XHRwYXJhbXMucHV0U0ZTQXJyYXkoJ3NldHRpbmdzJywgY2hhbmdlcyk7XG5cdFx0XHRcdHBhcmFtcy5wdXRCb29sKCdiYWNrdXAnLCAkKCcjY2xjLWJhY2t1cENoZWNrJykucHJvcCgnY2hlY2tlZCcpKTtcblxuXHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX1VQREFURV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydCgnVW5hYmxlIHRvIHN1Ym1pdCBjb25maWd1cmF0aW9uIGNoYW5nZXMgZHVlIHRvIGFuIGludmFsaWQgdmFsdWU7IHBsZWFzZSB2ZXJpZnkgdGhlIGhpZ2hsaWdodGVkIGZvcm0gZmllbGRzIGluIGFsbCB0YWJzLicsIHRydWUpO1xuXHR9XG5cblx0X3VwZGF0ZUNvbmZpZ0Zvcm1JdGVtRGlzcGxheWVkVmFsdWUoY29uZmlnUGFyYW1OYW1lLCBuZXdWYWx1ZSlcblx0e1xuXHRcdC8vIEdldCB0aGUgcmVsZXZhbnQgQ29uZmlndXJhdGlvbiBGb3JtIEl0ZW1cblx0XHRjb25zdCBjb25maWdGb3JtSXRlbSA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q29uZmlnRm9ybUl0ZW0oY29uZmlnUGFyYW1OYW1lKTtcblxuXHRcdC8vIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciBhc3NvY2lhdGVkIHdpdGggdGhlIENvbmZpZ3VyYXRpb24gRm9ybSBJdGVtXG5cdFx0Y29uZmlnRm9ybUl0ZW0uZGF0YS52YWx1ZSA9IG5ld1ZhbHVlO1xuXHRcdGNvbmZpZ0Zvcm1JdGVtLmRhdGEucmVzZXRJc01vZGlmaWVkKCk7IC8vIFRoaXMgaXMgbmVlZGVkIHRvIGF2b2lkIHRoZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB0byBmbGFnZ2VkIGFzICdjaGFuZ2VkJ1xuXG5cdFx0Ly8gRGlzcGxheSB0aGUgbmV3IHZhbHVlIG9mIHRoZSBDb25maWd1cmF0aW9uIEZvcm0gSXRlbVxuXHRcdGNvbmZpZ0Zvcm1JdGVtLl9zZXRXaWRnZXRWYWx1ZSgpOyAvLyBEaXNwbGF5IHRoZSBuZXcgdmFsdWUgaW4gdGhlIGNvbmZpZyBmb3JtIGl0ZW1cblx0fVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=