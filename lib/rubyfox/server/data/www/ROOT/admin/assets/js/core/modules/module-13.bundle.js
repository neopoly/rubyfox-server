/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-13"],{

/***/ "./src/components/module-specific/ssl-certificate-manager.js":
/*!*******************************************************************!*\
  !*** ./src/components/module-specific/ssl-certificate-manager.js ***!
  \*******************************************************************/
/*! exports provided: SslCertificateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SslCertificateManager", function() { return SslCertificateManager; });
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/utilities */ "./src/utils/utilities.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_1__);



class SslCertificateManager extends HTMLElement
{
	constructor()
	{
	    super();

		this._modalHtml = `
			<div class="modal" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-primary" id="uploadModalTitle">SSL Certificate Manager</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body in-flow-invalid-msg">
							<fieldset id="uploadFieldset">
								<div id="uploaderSubform">
									<div class="form-group">
										<div class="col-form-label form-label-container">
											<label for="uploader" class="form-label">Certificate keystore (jks) <i class="fas fa-question-circle text-muted help" title="SSL certificate's protected keystore file to be uploaded to the server, in jks format"></i></label>
										</div>
										<div class="inner-widget">
											<input type="file" id="uploader" name="uploader" accept=".jks" data-upload-msg="Select a file">
											<span class="k-invalid-msg position-static" data-for="uploader"></span>
										</div>
									</div>
								</div>
								<div id="passwordsSubform">
									<div class="form-row">
										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="ksPassword" class="form-label">Keystore password <i class="fas fa-question-circle text-muted help" title="Password used to protect the certificate keystore"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="ksPassword" name="ksPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="ksPassword"></span>
											</div>
										</div>

										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="confirmKsPassword" class="form-label">Confirm password <i class="fas fa-question-circle text-muted help" title="Keystore password confirmation"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="confirmKsPassword" name="confirmKsPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="confirmKsPassword"></span>
											</div>
										</div>
									</div>

									<p><em>For additional security, enter again and confirm your SFS2X administration password.</em></p>

									<div class="form-row">
										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="adminPassword" class="form-label">Admin password <i class="fas fa-question-circle text-muted help" title="SmartFoxServer 2X remote administration password"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="adminPassword" name="adminPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="adminPassword"></span>
											</div>
										</div>

										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="confirmAdminPassword" class="form-label">Confirm password <i class="fas fa-question-circle text-muted help" title="SmartFoxServer 2X remote administration password confirmation"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="confirmAdminPassword" name="confirmAdminPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="confirmAdminPassword"></span>
											</div>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
						<div class="modal-footer flex-column">
							<div class="d-flex w-100">
								<div class="flex-grow-1 text-left">
									<button id="uploadSslButton" type="button" class="k-button k-primary"><i class="fas fa-upload mr-1"></i>Upload certificate</button>
									<i id="uploadSpinner" class="fas fa-circle-notch fa-spin text-primary align-middle ml-1"></i>
								</div>
								<div class="flex-grow-1 text-right">
									<button type="button" class="k-button k-secondary" data-dismiss="modal">Cancel</button>
								</div>
							</div>
							<div id="uploadErrorMsg" class="text-danger mt-3"></div>
						</div>
					</div>
				</div>
			</div>
		`;

		//-------------------------------------------

		$(this).append(`
			<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
				<label class="form-label">Upload certificate <i class="fas fa-question-circle text-muted help" title="Upload an SSL certificate's protected keystore to the server"></i></label>
			</div>
			<div class="inner-widget align-self-center align-self-sm-start col-auto">
				<button id="manageSslButton" type="button" class="k-button k-primary" disabled><i class="fas fa-cog mr-1"></i>Manage</button>
			</div>
		`);

		// Add listeners to Manage button click
		$('#manageSslButton', $(this)).on('click', $.proxy(this._onManageSslClick, this));
	}

	destroy()
	{
		// Remove event listener
		$('#manageSslButton', $(this)).off('click');

		// Hide modal (which in turn destroys it)
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
			modalElement.modal('hide');
	}

	get enabled()
	{
		return this._isEnabled;
	}

	set enabled(value)
	{
		this._isEnabled = value;

		// Enable/disable Manage button
		$('#manageSslButton', $(this)).attr('disabled', !value);

		// Enable/disable modal
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Disable modal close buttons
			$('button[data-dismiss="modal"]', modalElement).attr('disabled', !value);

			// Disable upload button
			$('#uploadSslButton', modalElement).attr('disabled', !value);

			// Disable fieldset
			$('#uploadFieldset', modalElement).attr('disabled', !value);
		}
	}

	get uploadTargetConfig()
	{
		return this._uploadTargetConfig;
	}

	set uploadTargetConfig(data)
	{
		this._uploadTargetConfig = data;
	}

	_onManageSslClick()
	{
		// Initialize and show modal
		this._showModal();
	}

	_onUploadSslClick()
	{
		if (this._validate())
			this._startSslCertUpload();
	}

	_showModal()
	{
		// Append modal html
		$(this).append(this._modalHtml);

		let modalElement = $('#uploadModal', $(this));

		// Hide SSL certificate upload spinner and error message container
		$('#uploadSpinner', modalElement).hide();
		$('#uploadErrorMsg', modalElement).hide();
		$('#uploadErrorMsg', modalElement).text('');

		// Add listener to Upload button click
		$('#uploadSslButton', modalElement).on('click', $.proxy(this._onUploadSslClick, this));

		// Add listener to modal hide event
		modalElement.on('hidden.bs.modal', $.proxy(this._destroyModal, this));

		// Initialize kendo uploader
		this._uploadWidget = modalElement.find('#uploader').kendoUpload({
			allowedExtensions: ['.jks'],
			multiple: false,
			template: function(dataItem) {
				dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_0__["bytesToSize"]; // Pass bytesToSize utility function to template
				return kendo.template(`
					<span class='k-progress w-100'></span>
					<span class="">
						<span class="k-file-name" title="#=name#">#=name#</span>
						<span class="k-file-size">Size: #=bytesToSize(size, 1, 'Bytes')#</span>
					</span>
				`)(dataItem);
			},
	        localization: {
	            select: 'Select file...'
	        }
        }).data('kendoUpload');

		// Initialize kendo validation on uploader subform
		// NOTE: we use separate validators to be able to disable 'validateOnBlur' on the uploader,
		// because it causes the error message to appear as soon as the "Select file" button is clicked
		this._validator1 = modalElement.find('#uploaderSubform').kendoValidator({
			validateOnBlur: false,
			rules: {
				upload: function(input) {
					let valid = false;
					if (input.is('[type=file]'))
						valid = input.closest('.k-upload').find('.k-file').length > 0;

					return valid;
	            }
			}
		}).data('kendoValidator');

		// Initialize kendo validation on passwords subform
		this._validator2 = modalElement.find('#passwordsSubform').kendoValidator({
			validateOnBlur: true,
			rules: {
				verifyKsPassword: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=confirmKsPassword]'))
						valid = input.val() === $(this).find('#ksPassword').val();
					return valid;
				}, this),
				verifyAdmPassword: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=confirmAdminPassword]'))
						valid = input.val() === $(this).find('#adminPassword').val();
					return valid;
				}, this)
			},
			messages: {
				verifyKsPassword: 'Password not matching',
				verifyAdmPassword: 'Password not matching',
			}
		}).data('kendoValidator');

		// Initialize bootstrap modal
		modalElement.modal({
			backdrop: 'static',
			keyboard: false,
		});
	}

	_destroyModal()
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Remove listeners
			$('#uploadSslButton', modalElement).off('click');
			modalElement.off('hidden.bs.modal');

			// Destroy everything Kendo
			kendo.destroy(modalElement);

			// Dispose modal
			modalElement.modal('dispose');

			// Remove html
			modalElement.remove();
			modalElement = null;
		}
	}

	_validate()
	{
		let val1 = this._validator1.validate();
		let val2 = this._validator2.validate();

		return val1 && val2;
	}

	_startSslCertUpload()
	{
		if (!this._uploadTargetConfig)
			throw new Error('Upload target configuration not set');

		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			let certData = {};
			certData.file = this._uploadWidget.getFiles()[0];
			certData.ksPassword = $('#ksPassword', modalElement).val();
			certData.adminPassword = $('#adminPassword', modalElement).val();

			// Disable modal
			this.enabled = false;

			// Hide previous error and show spinner
			$('#uploadSpinner', modalElement).show();
			$('#uploadErrorMsg', modalElement).hide();
			$('#uploadErrorMsg', modalElement).text('');

			//=================================================================

			// Generate Init Vector
			let rngValues = [];
			for (let i = 0; i < 16; i++)
				rngValues.push(Math.floor(Math.random() * 256));

			let iv = new Uint8Array(rngValues);

			// Generate secret key by MD5-encoding admin password + session token
			let md5Pass = this._binaryMD5(certData.adminPassword + this._uploadTargetConfig.sessionToken);

			// Encrypt keystore password via AES (128bit)
			let encryptedPwd = this._aesEncrypt(certData.ksPassword, md5Pass, iv);

			// Encode IV using Base64
			let encodedIv = this._b64Encode(iv);

			// Encode encrypted password using Base64
			let encodedPwd = this._b64Encode(encryptedPwd);

			//=================================================================

			// Set parameters to be sent with the certificate keystore file
			const params = new FormData();
			params.append('files[]', certData.file.rawFile);
			params.append('__iv', encodedIv);
			params.append('__password', encodedPwd);
			params.append('__module', this._uploadTargetConfig.moduleId);

			// Set destination url
			const url = this._uploadTargetConfig.protocol + '://' + this._uploadTargetConfig.host + ':' + this._uploadTargetConfig.port + '/BlueBox/SFS2XFileUpload?sessHashId=' + this._uploadTargetConfig.sessionToken;

			// Start upload
			fetch(url, {
				method: 'POST',
				body: params,
				mode: 'no-cors'
			}).then($.proxy(this._onSslCertUploadEnd, this));
		}
	}

	_onSslCertUploadEnd(response)
	{
		// Nothing to do: we have to wait the upload process completion to be signaled by the server through the dedicated Extension response

		//=================================================================

		// TODO Should we handle this response in some way? For some unknown reason we always get ok=false and status=0
		//console.log(response)
		//console.log(response.ok)
		//console.log(response.status)
	}

	/**
	 * Method called by parent when upload failed.
	 */
	onSslCertUploadError(error)
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Enable modal
			this.enabled = true;

			// Show upload error
			$('#uploadErrorMsg', modalElement).show();
			$('#uploadErrorMsg', modalElement).text(error + '.');

			// Hide spinner
			$('#uploadSpinner', modalElement).hide();
		}
	}

	/**
	 * Method called by parent when upload is completed successfully.
	 */
	onSslCertUploadSuccess()
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Enable modal
			this.enabled = true;

			// Hide spinner
			$('#uploadSpinner', modalElement).hide();

			// Hide modal
			modalElement.modal('hide');
		}
	}

	// *****************************************************************

	/*
	 * Takes a string and returns the MD5 as Uint8Array
	 */
	_binaryMD5(str)
	{
		let MD5 = new SFS2X.MD5();
		let hexStr = MD5.hex_md5(str);

		return this._hexByteStringToByteArray(hexStr);
	}

	/*
	 * Hex bytes ---> Actual byte[] as Uint8Array
	 */
	_hexByteStringToByteArray(hexByteString)
	{
	    let bytes = new Uint8Array(16); // MD5 fixed output size

	    for (let i = 0; i < hexByteString.length;)
	    {
	        let hexByte = hexByteString[i++] + hexByteString[i++];
	        let byte = parseInt(hexByte, 16);

	        bytes[i / 2 - 1] = byte;
	    }

	    return bytes;
	}

	/*
	 * Encrypt using AES, mode CBC, PKCS#7 padding
	 *
	 * text 		-> the text we want to encode
	 * key 		-> the AES key
	 * iv  		-> the AES/CBC init vector
	 *
	 * Returns 	-> Uint8Array
	 */
	_aesEncrypt(text, key, iv)
	{
		let textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.utf8.toBytes(text); 		// Get UTF-8 bytes
		let aesCBC = new aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.ModeOfOperation.cbc(key, iv);	// Init CBC mode
		textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.padding.pkcs7.pad(textBytes); 		// PKCS#7 padding

		// Encrypt
		return aesCBC.encrypt(textBytes);
	}

	/*
	 * Encode passed byte array --> Base64 representation
	 * Returns --> string
	 */
	_b64Encode(barray)
	{
		return btoa(String.fromCharCode.apply(null, barray));
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('ssl-certificate-manager'))
	window.customElements.define('ssl-certificate-manager', SslCertificateManager);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/modules/server-configurator.js":
/*!********************************************!*\
  !*** ./src/modules/server-configurator.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServerConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");
/* harmony import */ var _components_module_specific_ssl_certificate_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/module-specific/ssl-certificate-manager */ "./src/components/module-specific/ssl-certificate-manager.js");




class ServerConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('serverConfig');

		// Outgoing requests
		this.REQ_INIT = 'init';
		this.REQ_GET_CONFIG = 'getConfig';
		this.REQ_UPDATE_CONFIG = 'updConfig';
		this.REQ_UPDATE_GEO_DB = 'updGeoDb';

		// Incoming responses
		this.RESP_INIT = 'init';
		this.RESP_CONFIG = 'config';
		this.RESP_CONFIG_UPDATE_CONFIRM = 'configUpdate';
		this.RESP_CONFIG_CHANGED_ALERT = 'configAlert';
		this.RESP_SSL_UPLOAD_ERROR = 'sslUploadError';
		this.RESP_SSL_UPLOAD_CONFIRM = 'sslUpload';
		this.RESP_UPDATE_GEO_DB = 'geoDbUpdate';
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
		$('#src-progressBar').kendoProgressBar({
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

		// Add listener to GeoLite2 database update button
		$('#src-updateGeolocDbButton').on('click', $.proxy(this._onUpdateGeolocDbClick, this));

		// Add listener to interface buttons
		$('#src-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#src-submitButton').on('click', $.proxy(this._onSubmitClick, this));

		// Save ref to SSL Manager
		this._sslCertManager = document.getElementById('src-sslCertManager');

		//-----------------------------------*/

		// Send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Destroy SSL Certificate Manager
		this._sslCertManager.destroy();

		// Remove interface buttons click listeners
		$('#src-updateGeolocDbButton').off('click');
		$('#src-reloadButton').off('click');
		$('#src-submitButton').off('click');

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		// Initialization data received
		if (command == this.RESP_INIT)
		{
			// Retrieve module id sent by the server (required because multiple modules use file uploading service)
			const uploadModuleId = data.getUtfString('modId');

			// Set SSL upload manager target configuration
			this._sslCertManager.uploadTargetConfig = {
				sessionToken: this.smartFox.sessionToken,
				host: this.smartFox.config.host,
				port: this.smartFox.config.port,
				moduleId: uploadModuleId,
				protocol: this.smartFox.config.useSSL ? 'https' : 'http'
			};

			// Server sends a flag indicating if file uploads are locked
			// We use it to enable the "Manage SSL certificate" button
			this._sslLocked = data.getBool('lock');

			if (!this._sslLocked)
				$('#src-manageSslWarn').hide();

			// Request configuration data to server instance
			this.sendExtensionRequest(this.REQ_GET_CONFIG);
		}

		// Server configuration data received
		else if (command == this.RESP_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'src-tabNavigator', false);

			// Enable buttons
			this._enableButtons(true);

			// Initialize TabNavigator-ralated widgets
			if (!this._tabNavInitialized)
			{
				// Enable scrolling tabs
				$('#src-tabNavigator > #tabs').scrollingTabs({
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

			this._switchView('src-main');
		}

		// Server configuration update confirmation
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
				this.shellCtrl.showNotification('Server settings updated', 'Immediate changes (<i class="fas fa-bolt"></i>) have been applied; all other changes will be active after next server restart');
			}
			else
			{
				// Show alert
				this.shellCtrl.showSimpleAlert(`Administrator ${updater} has modified the server settings; please reload to update your view.`);

				// Disable submit button
				$('#src-submitButton').attr('disabled', true);
			}
		}

		// Server configuration xml saved by an external process
		else if (command == this.RESP_CONFIG_CHANGED_ALERT)
		{
			// Show alert
			this.shellCtrl.showSimpleAlert(`The system has modified the server settings automatically; please reload to update your view.`);

			// Disable submit button
			$('#src-submitButton').attr('disabled', true);
		}

		// SSL certificate upload error
		else if (command == this.RESP_SSL_UPLOAD_ERROR)
		{
			const error = data.getUtfString('error');

			// Log warning
			this.shellCtrl.logMessage(error, 'error');

			// Show error in manager window
			this._sslCertManager.onSslCertUploadError(error);
		}

		// SSL certificate upload confirmed
		else if (command == this.RESP_SSL_UPLOAD_CONFIRM)
		{
			// Closw manager window
			this._sslCertManager.onSslCertUploadSuccess();

			let updater = data.getUtfString('user');

			// Display notification
			if (updater == this.smartFox.mySelf.name)
				this.shellCtrl.showNotification('SSL certificate', 'SSL certificate keystore was uploaded successfully');
			else
				this.shellCtrl.showNotification('SSL certificate', `Administrator ${updater} has uploaded a new SSL certificate keystore`);

			// When a certificate is uploaded, HTTPS is also enabled automatically:
			// we have to update the interface accordingly
			this._updateConfigFormItemDisplayedValue('webServer.enableHttps', true);
		}

		// Geolocation database update confirmation
		else if (command == this.RESP_UPDATE_GEO_DB)
		{
			// Enable button
			$('#src-updateGeolocDbButton').attr('disabled', false);

			// Check success
			if (data.getBool('success'))
			{
				// Update displayed date
				this._updateConfigFormItemDisplayedValue('adminHelper.geoDbReleaseDate', data.getUtfString('newRelDate'));

				// If the current user is the updater, also show a notification
				let updater = data.getUtfString('user');

				if (updater == this.smartFox.mySelf.name)
					this.shellCtrl.showNotification('Geolocation database updated', 'Latest release of the GeoLite2 Country database has been installed successfully');
			}
			else
			{
				// Show alert
				this.shellCtrl.showSimpleAlert(data.getUtfString('error'));
			}
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_enableButtons(enabled)
	{
		$('#src-reloadButton').attr('disabled', !enabled);
		$('#src-submitButton').attr('disabled', !enabled);
		$('#src-backupCheck').attr('disabled', !enabled);

		$('#src-updateGeolocDbButton').attr('disabled', !enabled);

		if (!this._sslLocked)
			this._sslCertManager.enabled = enabled;
	}

	_switchView(viewId)
	{
		document.getElementById('src-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#src-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();
	}

	_onUpdateGeolocDbClick()
	{
		// Disable button
		$('#src-updateGeolocDbButton').attr('disabled', true);

		// Send request to server
		this.sendExtensionRequest(this.REQ_UPDATE_GEO_DB);
	}

	_onReloadClick()
	{
		// Disable buttons
		this._enableButtons(false);

		// Switch to loading view
		this._switchView('src-loading');

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
				params.putBool('backup', $('#src-backupCheck').prop('checked'));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTMuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy9tb2R1bGUtc3BlY2lmaWMvc3NsLWNlcnRpZmljYXRlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9zZXJ2ZXItY29uZmlndXJhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Ynl0ZXNUb1NpemV9IGZyb20gJy4uLy4uL3V0aWxzL3V0aWxpdGllcyc7XG5pbXBvcnQgYWVzanMgZnJvbSAnYWVzLWpzJztcblxuZXhwb3J0IGNsYXNzIFNzbENlcnRpZmljYXRlTWFuYWdlciBleHRlbmRzIEhUTUxFbGVtZW50XG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoKTtcblxuXHRcdHRoaXMuX21vZGFsSHRtbCA9IGBcblx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwidXBsb2FkTW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cInVwbG9hZE1vZGFsVGl0bGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWRcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHQ8aDUgY2xhc3M9XCJtb2RhbC10aXRsZSB0ZXh0LXByaW1hcnlcIiBpZD1cInVwbG9hZE1vZGFsVGl0bGVcIj5TU0wgQ2VydGlmaWNhdGUgTWFuYWdlcjwvaDU+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBpbi1mbG93LWludmFsaWQtbXNnXCI+XG5cdFx0XHRcdFx0XHRcdDxmaWVsZHNldCBpZD1cInVwbG9hZEZpZWxkc2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBpZD1cInVwbG9hZGVyU3ViZm9ybVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cInVwbG9hZGVyXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+Q2VydGlmaWNhdGUga2V5c3RvcmUgKGprcykgPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiU1NMIGNlcnRpZmljYXRlJ3MgcHJvdGVjdGVkIGtleXN0b3JlIGZpbGUgdG8gYmUgdXBsb2FkZWQgdG8gdGhlIHNlcnZlciwgaW4gamtzIGZvcm1hdFwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwidXBsb2FkZXJcIiBuYW1lPVwidXBsb2FkZXJcIiBhY2NlcHQ9XCIuamtzXCIgZGF0YS11cGxvYWQtbXNnPVwiU2VsZWN0IGEgZmlsZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZyBwb3NpdGlvbi1zdGF0aWNcIiBkYXRhLWZvcj1cInVwbG9hZGVyXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJwYXNzd29yZHNTdWJmb3JtXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwia3NQYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPktleXN0b3JlIHBhc3N3b3JkIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIlBhc3N3b3JkIHVzZWQgdG8gcHJvdGVjdCB0aGUgY2VydGlmaWNhdGUga2V5c3RvcmVcIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJrc1Bhc3N3b3JkXCIgbmFtZT1cImtzUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBrLXRleHRib3hcIiBhdXRvY29tcGxldGU9XCJvZmZcIiByZXF1aXJlZCBkYXRhLXJlcXVpcmVkLW1zZz1cIlJlcXVpcmVkXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZyBwb3NpdGlvbi1zdGF0aWNcIiBkYXRhLWZvcj1cImtzUGFzc3dvcmRcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbmZpcm1Lc1Bhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+Q29uZmlybSBwYXNzd29yZCA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCJLZXlzdG9yZSBwYXNzd29yZCBjb25maXJtYXRpb25cIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJjb25maXJtS3NQYXNzd29yZFwiIG5hbWU9XCJjb25maXJtS3NQYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIGstdGV4dGJveFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIHJlcXVpcmVkIGRhdGEtcmVxdWlyZWQtbXNnPVwiUmVxdWlyZWRcIiAvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnIHBvc2l0aW9uLXN0YXRpY1wiIGRhdGEtZm9yPVwiY29uZmlybUtzUGFzc3dvcmRcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cblx0XHRcdFx0XHRcdFx0XHRcdDxwPjxlbT5Gb3IgYWRkaXRpb25hbCBzZWN1cml0eSwgZW50ZXIgYWdhaW4gYW5kIGNvbmZpcm0geW91ciBTRlMyWCBhZG1pbmlzdHJhdGlvbiBwYXNzd29yZC48L2VtPjwvcD5cblxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImFkbWluUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5BZG1pbiBwYXNzd29yZCA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCJTbWFydEZveFNlcnZlciAyWCByZW1vdGUgYWRtaW5pc3RyYXRpb24gcGFzc3dvcmRcIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJhZG1pblBhc3N3b3JkXCIgbmFtZT1cImFkbWluUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBrLXRleHRib3hcIiBhdXRvY29tcGxldGU9XCJvZmZcIiByZXF1aXJlZCBkYXRhLXJlcXVpcmVkLW1zZz1cIlJlcXVpcmVkXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZyBwb3NpdGlvbi1zdGF0aWNcIiBkYXRhLWZvcj1cImFkbWluUGFzc3dvcmRcIj48L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImNvbmZpcm1BZG1pblBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+Q29uZmlybSBwYXNzd29yZCA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCJTbWFydEZveFNlcnZlciAyWCByZW1vdGUgYWRtaW5pc3RyYXRpb24gcGFzc3dvcmQgY29uZmlybWF0aW9uXCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwiY29uZmlybUFkbWluUGFzc3dvcmRcIiBuYW1lPVwiY29uZmlybUFkbWluUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBrLXRleHRib3hcIiBhdXRvY29tcGxldGU9XCJvZmZcIiByZXF1aXJlZCBkYXRhLXJlcXVpcmVkLW1zZz1cIlJlcXVpcmVkXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZyBwb3NpdGlvbi1zdGF0aWNcIiBkYXRhLWZvcj1cImNvbmZpcm1BZG1pblBhc3N3b3JkXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2ZpZWxkc2V0PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZsZXgtY29sdW1uXCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDBcIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleC1ncm93LTEgdGV4dC1sZWZ0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIGlkPVwidXBsb2FkU3NsQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5XCI+PGkgY2xhc3M9XCJmYXMgZmEtdXBsb2FkIG1yLTFcIj48L2k+VXBsb2FkIGNlcnRpZmljYXRlPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBpZD1cInVwbG9hZFNwaW5uZXJcIiBjbGFzcz1cImZhcyBmYS1jaXJjbGUtbm90Y2ggZmEtc3BpbiB0ZXh0LXByaW1hcnkgYWxpZ24tbWlkZGxlIG1sLTFcIj48L2k+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xIHRleHQtcmlnaHRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1zZWNvbmRhcnlcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBpZD1cInVwbG9hZEVycm9yTXNnXCIgY2xhc3M9XCJ0ZXh0LWRhbmdlciBtdC0zXCI+PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHQkKHRoaXMpLmFwcGVuZChgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLXNtLTUgY29sLWxnLTQgY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0PGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiPlVwbG9hZCBjZXJ0aWZpY2F0ZSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCJVcGxvYWQgYW4gU1NMIGNlcnRpZmljYXRlJ3MgcHJvdGVjdGVkIGtleXN0b3JlIHRvIHRoZSBzZXJ2ZXJcIj48L2k+PC9sYWJlbD5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldCBhbGlnbi1zZWxmLWNlbnRlciBhbGlnbi1zZWxmLXNtLXN0YXJ0IGNvbC1hdXRvXCI+XG5cdFx0XHRcdDxidXR0b24gaWQ9XCJtYW5hZ2VTc2xCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnlcIiBkaXNhYmxlZD48aSBjbGFzcz1cImZhcyBmYS1jb2cgbXItMVwiPjwvaT5NYW5hZ2U8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBNYW5hZ2UgYnV0dG9uIGNsaWNrXG5cdFx0JCgnI21hbmFnZVNzbEJ1dHRvbicsICQodGhpcykpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25NYW5hZ2VTc2xDbGljaywgdGhpcykpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJcblx0XHQkKCcjbWFuYWdlU3NsQnV0dG9uJywgJCh0aGlzKSkub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gSGlkZSBtb2RhbCAod2hpY2ggaW4gdHVybiBkZXN0cm95cyBpdClcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdFx0bW9kYWxFbGVtZW50Lm1vZGFsKCdoaWRlJyk7XG5cdH1cblxuXHRnZXQgZW5hYmxlZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faXNFbmFibGVkO1xuXHR9XG5cblx0c2V0IGVuYWJsZWQodmFsdWUpXG5cdHtcblx0XHR0aGlzLl9pc0VuYWJsZWQgPSB2YWx1ZTtcblxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIE1hbmFnZSBidXR0b25cblx0XHQkKCcjbWFuYWdlU3NsQnV0dG9uJywgJCh0aGlzKSkuYXR0cignZGlzYWJsZWQnLCAhdmFsdWUpO1xuXG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgbW9kYWxcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIERpc2FibGUgbW9kYWwgY2xvc2UgYnV0dG9uc1xuXHRcdFx0JCgnYnV0dG9uW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgbW9kYWxFbGVtZW50KS5hdHRyKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG5cblx0XHRcdC8vIERpc2FibGUgdXBsb2FkIGJ1dHRvblxuXHRcdFx0JCgnI3VwbG9hZFNzbEJ1dHRvbicsIG1vZGFsRWxlbWVudCkuYXR0cignZGlzYWJsZWQnLCAhdmFsdWUpO1xuXG5cdFx0XHQvLyBEaXNhYmxlIGZpZWxkc2V0XG5cdFx0XHQkKCcjdXBsb2FkRmllbGRzZXQnLCBtb2RhbEVsZW1lbnQpLmF0dHIoJ2Rpc2FibGVkJywgIXZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgdXBsb2FkVGFyZ2V0Q29uZmlnKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl91cGxvYWRUYXJnZXRDb25maWc7XG5cdH1cblxuXHRzZXQgdXBsb2FkVGFyZ2V0Q29uZmlnKGRhdGEpXG5cdHtcblx0XHR0aGlzLl91cGxvYWRUYXJnZXRDb25maWcgPSBkYXRhO1xuXHR9XG5cblx0X29uTWFuYWdlU3NsQ2xpY2soKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6ZSBhbmQgc2hvdyBtb2RhbFxuXHRcdHRoaXMuX3Nob3dNb2RhbCgpO1xuXHR9XG5cblx0X29uVXBsb2FkU3NsQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZhbGlkYXRlKCkpXG5cdFx0XHR0aGlzLl9zdGFydFNzbENlcnRVcGxvYWQoKTtcblx0fVxuXG5cdF9zaG93TW9kYWwoKVxuXHR7XG5cdFx0Ly8gQXBwZW5kIG1vZGFsIGh0bWxcblx0XHQkKHRoaXMpLmFwcGVuZCh0aGlzLl9tb2RhbEh0bWwpO1xuXG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyN1cGxvYWRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0Ly8gSGlkZSBTU0wgY2VydGlmaWNhdGUgdXBsb2FkIHNwaW5uZXIgYW5kIGVycm9yIG1lc3NhZ2UgY29udGFpbmVyXG5cdFx0JCgnI3VwbG9hZFNwaW5uZXInLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLnRleHQoJycpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIFVwbG9hZCBidXR0b24gY2xpY2tcblx0XHQkKCcjdXBsb2FkU3NsQnV0dG9uJywgbW9kYWxFbGVtZW50KS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uVXBsb2FkU3NsQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtb2RhbCBoaWRlIGV2ZW50XG5cdFx0bW9kYWxFbGVtZW50Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuX2Rlc3Ryb3lNb2RhbCwgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB1cGxvYWRlclxuXHRcdHRoaXMuX3VwbG9hZFdpZGdldCA9IG1vZGFsRWxlbWVudC5maW5kKCcjdXBsb2FkZXInKS5rZW5kb1VwbG9hZCh7XG5cdFx0XHRhbGxvd2VkRXh0ZW5zaW9uczogWycuamtzJ10sXG5cdFx0XHRtdWx0aXBsZTogZmFsc2UsXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24oZGF0YUl0ZW0pIHtcblx0XHRcdFx0ZGF0YUl0ZW0uYnl0ZXNUb1NpemUgPSBieXRlc1RvU2l6ZTsgLy8gUGFzcyBieXRlc1RvU2l6ZSB1dGlsaXR5IGZ1bmN0aW9uIHRvIHRlbXBsYXRlXG5cdFx0XHRcdHJldHVybiBrZW5kby50ZW1wbGF0ZShgXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9J2stcHJvZ3Jlc3Mgdy0xMDAnPjwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIlwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWZpbGUtbmFtZVwiIHRpdGxlPVwiIz1uYW1lI1wiPiM9bmFtZSM8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstZmlsZS1zaXplXCI+U2l6ZTogIz1ieXRlc1RvU2l6ZShzaXplLCAxLCAnQnl0ZXMnKSM8L3NwYW4+XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRgKShkYXRhSXRlbSk7XG5cdFx0XHR9LFxuXHQgICAgICAgIGxvY2FsaXphdGlvbjoge1xuXHQgICAgICAgICAgICBzZWxlY3Q6ICdTZWxlY3QgZmlsZS4uLidcblx0ICAgICAgICB9XG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvVXBsb2FkJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHZhbGlkYXRpb24gb24gdXBsb2FkZXIgc3ViZm9ybVxuXHRcdC8vIE5PVEU6IHdlIHVzZSBzZXBhcmF0ZSB2YWxpZGF0b3JzIHRvIGJlIGFibGUgdG8gZGlzYWJsZSAndmFsaWRhdGVPbkJsdXInIG9uIHRoZSB1cGxvYWRlcixcblx0XHQvLyBiZWNhdXNlIGl0IGNhdXNlcyB0aGUgZXJyb3IgbWVzc2FnZSB0byBhcHBlYXIgYXMgc29vbiBhcyB0aGUgXCJTZWxlY3QgZmlsZVwiIGJ1dHRvbiBpcyBjbGlja2VkXG5cdFx0dGhpcy5fdmFsaWRhdG9yMSA9IG1vZGFsRWxlbWVudC5maW5kKCcjdXBsb2FkZXJTdWJmb3JtJykua2VuZG9WYWxpZGF0b3Ioe1xuXHRcdFx0dmFsaWRhdGVPbkJsdXI6IGZhbHNlLFxuXHRcdFx0cnVsZXM6IHtcblx0XHRcdFx0dXBsb2FkOiBmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmIChpbnB1dC5pcygnW3R5cGU9ZmlsZV0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQuY2xvc2VzdCgnLmstdXBsb2FkJykuZmluZCgnLmstZmlsZScpLmxlbmd0aCA+IDA7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdCAgICAgICAgICAgIH1cblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB2YWxpZGF0aW9uIG9uIHBhc3N3b3JkcyBzdWJmb3JtXG5cdFx0dGhpcy5fdmFsaWRhdG9yMiA9IG1vZGFsRWxlbWVudC5maW5kKCcjcGFzc3dvcmRzU3ViZm9ybScpLmtlbmRvVmFsaWRhdG9yKHtcblx0XHRcdHZhbGlkYXRlT25CbHVyOiB0cnVlLFxuXHRcdFx0cnVsZXM6IHtcblx0XHRcdFx0dmVyaWZ5S3NQYXNzd29yZDogJC5wcm94eShmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbbmFtZT1jb25maXJtS3NQYXNzd29yZF0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQudmFsKCkgPT09ICQodGhpcykuZmluZCgnI2tzUGFzc3dvcmQnKS52YWwoKTtcblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdFx0XHRcdH0sIHRoaXMpLFxuXHRcdFx0XHR2ZXJpZnlBZG1QYXNzd29yZDogJC5wcm94eShmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbbmFtZT1jb25maXJtQWRtaW5QYXNzd29yZF0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQudmFsKCkgPT09ICQodGhpcykuZmluZCgnI2FkbWluUGFzc3dvcmQnKS52YWwoKTtcblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdFx0XHRcdH0sIHRoaXMpXG5cdFx0XHR9LFxuXHRcdFx0bWVzc2FnZXM6IHtcblx0XHRcdFx0dmVyaWZ5S3NQYXNzd29yZDogJ1Bhc3N3b3JkIG5vdCBtYXRjaGluZycsXG5cdFx0XHRcdHZlcmlmeUFkbVBhc3N3b3JkOiAnUGFzc3dvcmQgbm90IG1hdGNoaW5nJyxcblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBib290c3RyYXAgbW9kYWxcblx0XHRtb2RhbEVsZW1lbnQubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0X2Rlc3Ryb3lNb2RhbCgpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIFJlbW92ZSBsaXN0ZW5lcnNcblx0XHRcdCQoJyN1cGxvYWRTc2xCdXR0b24nLCBtb2RhbEVsZW1lbnQpLm9mZignY2xpY2snKTtcblx0XHRcdG1vZGFsRWxlbWVudC5vZmYoJ2hpZGRlbi5icy5tb2RhbCcpO1xuXG5cdFx0XHQvLyBEZXN0cm95IGV2ZXJ5dGhpbmcgS2VuZG9cblx0XHRcdGtlbmRvLmRlc3Ryb3kobW9kYWxFbGVtZW50KTtcblxuXHRcdFx0Ly8gRGlzcG9zZSBtb2RhbFxuXHRcdFx0bW9kYWxFbGVtZW50Lm1vZGFsKCdkaXNwb3NlJyk7XG5cblx0XHRcdC8vIFJlbW92ZSBodG1sXG5cdFx0XHRtb2RhbEVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHRtb2RhbEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF92YWxpZGF0ZSgpXG5cdHtcblx0XHRsZXQgdmFsMSA9IHRoaXMuX3ZhbGlkYXRvcjEudmFsaWRhdGUoKTtcblx0XHRsZXQgdmFsMiA9IHRoaXMuX3ZhbGlkYXRvcjIudmFsaWRhdGUoKTtcblxuXHRcdHJldHVybiB2YWwxICYmIHZhbDI7XG5cdH1cblxuXHRfc3RhcnRTc2xDZXJ0VXBsb2FkKClcblx0e1xuXHRcdGlmICghdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgdGFyZ2V0IGNvbmZpZ3VyYXRpb24gbm90IHNldCcpO1xuXG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyN1cGxvYWRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0aWYgKG1vZGFsRWxlbWVudClcblx0XHR7XG5cdFx0XHRsZXQgY2VydERhdGEgPSB7fTtcblx0XHRcdGNlcnREYXRhLmZpbGUgPSB0aGlzLl91cGxvYWRXaWRnZXQuZ2V0RmlsZXMoKVswXTtcblx0XHRcdGNlcnREYXRhLmtzUGFzc3dvcmQgPSAkKCcja3NQYXNzd29yZCcsIG1vZGFsRWxlbWVudCkudmFsKCk7XG5cdFx0XHRjZXJ0RGF0YS5hZG1pblBhc3N3b3JkID0gJCgnI2FkbWluUGFzc3dvcmQnLCBtb2RhbEVsZW1lbnQpLnZhbCgpO1xuXG5cdFx0XHQvLyBEaXNhYmxlIG1vZGFsXG5cdFx0XHR0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuXHRcdFx0Ly8gSGlkZSBwcmV2aW91cyBlcnJvciBhbmQgc2hvdyBzcGlubmVyXG5cdFx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuc2hvdygpO1xuXHRcdFx0JCgnI3VwbG9hZEVycm9yTXNnJywgbW9kYWxFbGVtZW50KS5oaWRlKCk7XG5cdFx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLnRleHQoJycpO1xuXG5cdFx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHRcdC8vIEdlbmVyYXRlIEluaXQgVmVjdG9yXG5cdFx0XHRsZXQgcm5nVmFsdWVzID0gW107XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspXG5cdFx0XHRcdHJuZ1ZhbHVlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuXG5cdFx0XHRsZXQgaXYgPSBuZXcgVWludDhBcnJheShybmdWYWx1ZXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBzZWNyZXQga2V5IGJ5IE1ENS1lbmNvZGluZyBhZG1pbiBwYXNzd29yZCArIHNlc3Npb24gdG9rZW5cblx0XHRcdGxldCBtZDVQYXNzID0gdGhpcy5fYmluYXJ5TUQ1KGNlcnREYXRhLmFkbWluUGFzc3dvcmQgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuc2Vzc2lvblRva2VuKTtcblxuXHRcdFx0Ly8gRW5jcnlwdCBrZXlzdG9yZSBwYXNzd29yZCB2aWEgQUVTICgxMjhiaXQpXG5cdFx0XHRsZXQgZW5jcnlwdGVkUHdkID0gdGhpcy5fYWVzRW5jcnlwdChjZXJ0RGF0YS5rc1Bhc3N3b3JkLCBtZDVQYXNzLCBpdik7XG5cblx0XHRcdC8vIEVuY29kZSBJViB1c2luZyBCYXNlNjRcblx0XHRcdGxldCBlbmNvZGVkSXYgPSB0aGlzLl9iNjRFbmNvZGUoaXYpO1xuXG5cdFx0XHQvLyBFbmNvZGUgZW5jcnlwdGVkIHBhc3N3b3JkIHVzaW5nIEJhc2U2NFxuXHRcdFx0bGV0IGVuY29kZWRQd2QgPSB0aGlzLl9iNjRFbmNvZGUoZW5jcnlwdGVkUHdkKTtcblxuXHRcdFx0Ly89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdFx0XHQvLyBTZXQgcGFyYW1ldGVycyB0byBiZSBzZW50IHdpdGggdGhlIGNlcnRpZmljYXRlIGtleXN0b3JlIGZpbGVcblx0XHRcdGNvbnN0IHBhcmFtcyA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0cGFyYW1zLmFwcGVuZCgnZmlsZXNbXScsIGNlcnREYXRhLmZpbGUucmF3RmlsZSk7XG5cdFx0XHRwYXJhbXMuYXBwZW5kKCdfX2l2JywgZW5jb2RlZEl2KTtcblx0XHRcdHBhcmFtcy5hcHBlbmQoJ19fcGFzc3dvcmQnLCBlbmNvZGVkUHdkKTtcblx0XHRcdHBhcmFtcy5hcHBlbmQoJ19fbW9kdWxlJywgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLm1vZHVsZUlkKTtcblxuXHRcdFx0Ly8gU2V0IGRlc3RpbmF0aW9uIHVybFxuXHRcdFx0Y29uc3QgdXJsID0gdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLnByb3RvY29sICsgJzovLycgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuaG9zdCArICc6JyArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5wb3J0ICsgJy9CbHVlQm94L1NGUzJYRmlsZVVwbG9hZD9zZXNzSGFzaElkPScgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuc2Vzc2lvblRva2VuO1xuXG5cdFx0XHQvLyBTdGFydCB1cGxvYWRcblx0XHRcdGZldGNoKHVybCwge1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0Ym9keTogcGFyYW1zLFxuXHRcdFx0XHRtb2RlOiAnbm8tY29ycydcblx0XHRcdH0pLnRoZW4oJC5wcm94eSh0aGlzLl9vblNzbENlcnRVcGxvYWRFbmQsIHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRfb25Tc2xDZXJ0VXBsb2FkRW5kKHJlc3BvbnNlKVxuXHR7XG5cdFx0Ly8gTm90aGluZyB0byBkbzogd2UgaGF2ZSB0byB3YWl0IHRoZSB1cGxvYWQgcHJvY2VzcyBjb21wbGV0aW9uIHRvIGJlIHNpZ25hbGVkIGJ5IHRoZSBzZXJ2ZXIgdGhyb3VnaCB0aGUgZGVkaWNhdGVkIEV4dGVuc2lvbiByZXNwb25zZVxuXG5cdFx0Ly89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdFx0Ly8gVE9ETyBTaG91bGQgd2UgaGFuZGxlIHRoaXMgcmVzcG9uc2UgaW4gc29tZSB3YXk/IEZvciBzb21lIHVua25vd24gcmVhc29uIHdlIGFsd2F5cyBnZXQgb2s9ZmFsc2UgYW5kIHN0YXR1cz0wXG5cdFx0Ly9jb25zb2xlLmxvZyhyZXNwb25zZSlcblx0XHQvL2NvbnNvbGUubG9nKHJlc3BvbnNlLm9rKVxuXHRcdC8vY29uc29sZS5sb2cocmVzcG9uc2Uuc3RhdHVzKVxuXHR9XG5cblx0LyoqXG5cdCAqIE1ldGhvZCBjYWxsZWQgYnkgcGFyZW50IHdoZW4gdXBsb2FkIGZhaWxlZC5cblx0ICovXG5cdG9uU3NsQ2VydFVwbG9hZEVycm9yKGVycm9yKVxuXHR7XG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyN1cGxvYWRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0aWYgKG1vZGFsRWxlbWVudClcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgbW9kYWxcblx0XHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdC8vIFNob3cgdXBsb2FkIGVycm9yXG5cdFx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLnNob3coKTtcblx0XHRcdCQoJyN1cGxvYWRFcnJvck1zZycsIG1vZGFsRWxlbWVudCkudGV4dChlcnJvciArICcuJyk7XG5cblx0XHRcdC8vIEhpZGUgc3Bpbm5lclxuXHRcdFx0JCgnI3VwbG9hZFNwaW5uZXInLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTWV0aG9kIGNhbGxlZCBieSBwYXJlbnQgd2hlbiB1cGxvYWQgaXMgY29tcGxldGVkIHN1Y2Nlc3NmdWxseS5cblx0ICovXG5cdG9uU3NsQ2VydFVwbG9hZFN1Y2Nlc3MoKVxuXHR7XG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyN1cGxvYWRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0aWYgKG1vZGFsRWxlbWVudClcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgbW9kYWxcblx0XHRcdHRoaXMuZW5hYmxlZCA9IHRydWU7XG5cblx0XHRcdC8vIEhpZGUgc3Bpbm5lclxuXHRcdFx0JCgnI3VwbG9hZFNwaW5uZXInLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblxuXHRcdFx0Ly8gSGlkZSBtb2RhbFxuXHRcdFx0bW9kYWxFbGVtZW50Lm1vZGFsKCdoaWRlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuXHQvKlxuXHQgKiBUYWtlcyBhIHN0cmluZyBhbmQgcmV0dXJucyB0aGUgTUQ1IGFzIFVpbnQ4QXJyYXlcblx0ICovXG5cdF9iaW5hcnlNRDUoc3RyKVxuXHR7XG5cdFx0bGV0IE1ENSA9IG5ldyBTRlMyWC5NRDUoKTtcblx0XHRsZXQgaGV4U3RyID0gTUQ1LmhleF9tZDUoc3RyKTtcblxuXHRcdHJldHVybiB0aGlzLl9oZXhCeXRlU3RyaW5nVG9CeXRlQXJyYXkoaGV4U3RyKTtcblx0fVxuXG5cdC8qXG5cdCAqIEhleCBieXRlcyAtLS0+IEFjdHVhbCBieXRlW10gYXMgVWludDhBcnJheVxuXHQgKi9cblx0X2hleEJ5dGVTdHJpbmdUb0J5dGVBcnJheShoZXhCeXRlU3RyaW5nKVxuXHR7XG5cdCAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheSgxNik7IC8vIE1ENSBmaXhlZCBvdXRwdXQgc2l6ZVxuXG5cdCAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhleEJ5dGVTdHJpbmcubGVuZ3RoOylcblx0ICAgIHtcblx0ICAgICAgICBsZXQgaGV4Qnl0ZSA9IGhleEJ5dGVTdHJpbmdbaSsrXSArIGhleEJ5dGVTdHJpbmdbaSsrXTtcblx0ICAgICAgICBsZXQgYnl0ZSA9IHBhcnNlSW50KGhleEJ5dGUsIDE2KTtcblxuXHQgICAgICAgIGJ5dGVzW2kgLyAyIC0gMV0gPSBieXRlO1xuXHQgICAgfVxuXG5cdCAgICByZXR1cm4gYnl0ZXM7XG5cdH1cblxuXHQvKlxuXHQgKiBFbmNyeXB0IHVzaW5nIEFFUywgbW9kZSBDQkMsIFBLQ1MjNyBwYWRkaW5nXG5cdCAqXG5cdCAqIHRleHQgXHRcdC0+IHRoZSB0ZXh0IHdlIHdhbnQgdG8gZW5jb2RlXG5cdCAqIGtleSBcdFx0LT4gdGhlIEFFUyBrZXlcblx0ICogaXYgIFx0XHQtPiB0aGUgQUVTL0NCQyBpbml0IHZlY3RvclxuXHQgKlxuXHQgKiBSZXR1cm5zIFx0LT4gVWludDhBcnJheVxuXHQgKi9cblx0X2Flc0VuY3J5cHQodGV4dCwga2V5LCBpdilcblx0e1xuXHRcdGxldCB0ZXh0Qnl0ZXMgPSBhZXNqcy51dGlscy51dGY4LnRvQnl0ZXModGV4dCk7IFx0XHQvLyBHZXQgVVRGLTggYnl0ZXNcblx0XHRsZXQgYWVzQ0JDID0gbmV3IGFlc2pzLk1vZGVPZk9wZXJhdGlvbi5jYmMoa2V5LCBpdik7XHQvLyBJbml0IENCQyBtb2RlXG5cdFx0dGV4dEJ5dGVzID0gYWVzanMucGFkZGluZy5wa2NzNy5wYWQodGV4dEJ5dGVzKTsgXHRcdC8vIFBLQ1MjNyBwYWRkaW5nXG5cblx0XHQvLyBFbmNyeXB0XG5cdFx0cmV0dXJuIGFlc0NCQy5lbmNyeXB0KHRleHRCeXRlcyk7XG5cdH1cblxuXHQvKlxuXHQgKiBFbmNvZGUgcGFzc2VkIGJ5dGUgYXJyYXkgLS0+IEJhc2U2NCByZXByZXNlbnRhdGlvblxuXHQgKiBSZXR1cm5zIC0tPiBzdHJpbmdcblx0ICovXG5cdF9iNjRFbmNvZGUoYmFycmF5KVxuXHR7XG5cdFx0cmV0dXJuIGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBiYXJyYXkpKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ3NzbC1jZXJ0aWZpY2F0ZS1tYW5hZ2VyJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NzbC1jZXJ0aWZpY2F0ZS1tYW5hZ2VyJywgU3NsQ2VydGlmaWNhdGVNYW5hZ2VyKTtcbiIsImltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSAnLi9iYXNlLW1vZHVsZSc7XG5pbXBvcnQge0NvbmZpZ0ludGVyZmFjZUJ1aWxkZXJ9IGZyb20gJy4uL3V0aWxzL3VpYnVpbGRlci9jb25maWctaW50ZXJmYWNlLWJ1aWxkZXInO1xuaW1wb3J0IHtTc2xDZXJ0aWZpY2F0ZU1hbmFnZXJ9IGZyb20gJy4uL2NvbXBvbmVudHMvbW9kdWxlLXNwZWNpZmljL3NzbC1jZXJ0aWZpY2F0ZS1tYW5hZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyQ29uZmlndXJhdG9yIGV4dGVuZHMgQmFzZU1vZHVsZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCdzZXJ2ZXJDb25maWcnKTtcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfSU5JVCA9ICdpbml0Jztcblx0XHR0aGlzLlJFUV9HRVRfQ09ORklHID0gJ2dldENvbmZpZyc7XG5cdFx0dGhpcy5SRVFfVVBEQVRFX0NPTkZJRyA9ICd1cGRDb25maWcnO1xuXHRcdHRoaXMuUkVRX1VQREFURV9HRU9fREIgPSAndXBkR2VvRGInO1xuXG5cdFx0Ly8gSW5jb21pbmcgcmVzcG9uc2VzXG5cdFx0dGhpcy5SRVNQX0lOSVQgPSAnaW5pdCc7XG5cdFx0dGhpcy5SRVNQX0NPTkZJRyA9ICdjb25maWcnO1xuXHRcdHRoaXMuUkVTUF9DT05GSUdfVVBEQVRFX0NPTkZJUk0gPSAnY29uZmlnVXBkYXRlJztcblx0XHR0aGlzLlJFU1BfQ09ORklHX0NIQU5HRURfQUxFUlQgPSAnY29uZmlnQWxlcnQnO1xuXHRcdHRoaXMuUkVTUF9TU0xfVVBMT0FEX0VSUk9SID0gJ3NzbFVwbG9hZEVycm9yJztcblx0XHR0aGlzLlJFU1BfU1NMX1VQTE9BRF9DT05GSVJNID0gJ3NzbFVwbG9hZCc7XG5cdFx0dGhpcy5SRVNQX1VQREFURV9HRU9fREIgPSAnZ2VvRGJVcGRhdGUnO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLyBUaGlzIG1ldGhvZHMgb3ZlcnJpZGUgdGhvc2UgaW4gQmFzZU1vZHVsZSBjbGFzcy5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyXG5cdFx0JCgnI3NyYy1wcm9ncmVzc0JhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIENyZWF0ZSBpbnRlcmZhY2UgYnVpbGRlciBpbnN0YW5jZVxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIgPSBuZXcgQ29uZmlnSW50ZXJmYWNlQnVpbGRlcigpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIEdlb0xpdGUyIGRhdGFiYXNlIHVwZGF0ZSBidXR0b25cblx0XHQkKCcjc3JjLXVwZGF0ZUdlb2xvY0RiQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblVwZGF0ZUdlb2xvY0RiQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBpbnRlcmZhY2UgYnV0dG9uc1xuXHRcdCQoJyNzcmMtcmVsb2FkQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblJlbG9hZENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3NyYy1zdWJtaXRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uU3VibWl0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIFNhdmUgcmVmIHRvIFNTTCBNYW5hZ2VyXG5cdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3JjLXNzbENlcnRNYW5hZ2VyJyk7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdC8vIFNlbmQgaW5pdGlhbGl6YXRpb24gcmVxdWVzdFxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfSU5JVCk7XG5cdH1cblxuXHRkZXN0cm95KClcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuZGVzdHJveSgpO1xuXG5cdFx0Ly8gRGVzdHJveSBTU0wgQ2VydGlmaWNhdGUgTWFuYWdlclxuXHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLmRlc3Ryb3koKTtcblxuXHRcdC8vIFJlbW92ZSBpbnRlcmZhY2UgYnV0dG9ucyBjbGljayBsaXN0ZW5lcnNcblx0XHQkKCcjc3JjLXVwZGF0ZUdlb2xvY0RiQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNzcmMtcmVsb2FkQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNzcmMtc3VibWl0QnV0dG9uJykub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gQ2xlYXIgdGFicyBjb250YWluZXJcblx0XHR0aGlzLl9jbGVhclRhYnMoKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6YXRpb24gZGF0YSByZWNlaXZlZFxuXHRcdGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9JTklUKVxuXHRcdHtcblx0XHRcdC8vIFJldHJpZXZlIG1vZHVsZSBpZCBzZW50IGJ5IHRoZSBzZXJ2ZXIgKHJlcXVpcmVkIGJlY2F1c2UgbXVsdGlwbGUgbW9kdWxlcyB1c2UgZmlsZSB1cGxvYWRpbmcgc2VydmljZSlcblx0XHRcdGNvbnN0IHVwbG9hZE1vZHVsZUlkID0gZGF0YS5nZXRVdGZTdHJpbmcoJ21vZElkJyk7XG5cblx0XHRcdC8vIFNldCBTU0wgdXBsb2FkIG1hbmFnZXIgdGFyZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLnVwbG9hZFRhcmdldENvbmZpZyA9IHtcblx0XHRcdFx0c2Vzc2lvblRva2VuOiB0aGlzLnNtYXJ0Rm94LnNlc3Npb25Ub2tlbixcblx0XHRcdFx0aG9zdDogdGhpcy5zbWFydEZveC5jb25maWcuaG9zdCxcblx0XHRcdFx0cG9ydDogdGhpcy5zbWFydEZveC5jb25maWcucG9ydCxcblx0XHRcdFx0bW9kdWxlSWQ6IHVwbG9hZE1vZHVsZUlkLFxuXHRcdFx0XHRwcm90b2NvbDogdGhpcy5zbWFydEZveC5jb25maWcudXNlU1NMID8gJ2h0dHBzJyA6ICdodHRwJ1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gU2VydmVyIHNlbmRzIGEgZmxhZyBpbmRpY2F0aW5nIGlmIGZpbGUgdXBsb2FkcyBhcmUgbG9ja2VkXG5cdFx0XHQvLyBXZSB1c2UgaXQgdG8gZW5hYmxlIHRoZSBcIk1hbmFnZSBTU0wgY2VydGlmaWNhdGVcIiBidXR0b25cblx0XHRcdHRoaXMuX3NzbExvY2tlZCA9IGRhdGEuZ2V0Qm9vbCgnbG9jaycpO1xuXG5cdFx0XHRpZiAoIXRoaXMuX3NzbExvY2tlZClcblx0XHRcdFx0JCgnI3NyYy1tYW5hZ2VTc2xXYXJuJykuaGlkZSgpO1xuXG5cdFx0XHQvLyBSZXF1ZXN0IGNvbmZpZ3VyYXRpb24gZGF0YSB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX0NPTkZJRyk7XG5cdFx0fVxuXG5cdFx0Ly8gU2VydmVyIGNvbmZpZ3VyYXRpb24gZGF0YSByZWNlaXZlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0NPTkZJRylcblx0XHR7XG5cdFx0XHQvLyBCdWlsZCB1c2VyIGludGVyZmFjZSBiYXNlZCBvbiByZWNlaXZlZCBkYXRhXG5cdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmJ1aWxkSW50ZXJmYWNlKGRhdGEuZ2V0U0ZTQXJyYXkoJ3NldHRpbmdzJyksICdzcmMtdGFiTmF2aWdhdG9yJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uc1xuXHRcdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyh0cnVlKTtcblxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSBUYWJOYXZpZ2F0b3ItcmFsYXRlZCB3aWRnZXRzXG5cdFx0XHRpZiAoIXRoaXMuX3RhYk5hdkluaXRpYWxpemVkKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBFbmFibGUgc2Nyb2xsaW5nIHRhYnNcblx0XHRcdFx0JCgnI3NyYy10YWJOYXZpZ2F0b3IgPiAjdGFicycpLnNjcm9sbGluZ1RhYnMoe1xuXHRcdFx0XHRcdGJvb3RzdHJhcFZlcnNpb246IDQsXG5cdFx0XHRcdFx0c2Nyb2xsVG9UYWJFZGdlOiB0cnVlLFxuXHRcdFx0XHRcdGVuYWJsZVN3aXBpbmc6IHRydWUsXG5cdFx0XHRcdFx0ZGlzYWJsZVNjcm9sbEFycm93c09uRnVsbHlTY3JvbGxlZDogdHJ1ZSxcblx0XHRcdFx0XHRjc3NDbGFzc0xlZnRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tbGVmdCcsXG5cdFx0XHRcdFx0Y3NzQ2xhc3NSaWdodEFycm93OiAnZmEgZmEtY2hldnJvbi1yaWdodCdcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhpcy5fdGFiTmF2SW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSdW4gdmFsaWRhdGlvbiAodG8gcmVtb3ZlIHZhbGlkYXRpb24gbWVzc2FnZXMgaWYgZGF0YSB3YXMgcmVsb2FkZWQpXG5cdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmNoZWNrSXNWYWxpZCgpO1xuXG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdzcmMtbWFpbicpO1xuXHRcdH1cblxuXHRcdC8vIFNlcnZlciBjb25maWd1cmF0aW9uIHVwZGF0ZSBjb25maXJtYXRpb25cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9DT05GSUdfVVBEQVRFX0NPTkZJUk0pXG5cdFx0e1xuXHRcdFx0Ly8gRW5hYmxlIGJ1dHRvbnNcblx0XHRcdHRoaXMuX2VuYWJsZUJ1dHRvbnModHJ1ZSk7XG5cblx0XHRcdC8vIEVuYWJsZSBmb3JtIGl0ZW1zXG5cdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmRpc2FibGVJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSB1cGRhdGVyLCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHQvLyBPdGhlcndpc2UsIHNob3cgYSBkaWFsb2cgYm94IHN1Z2dlc3RpbmcgdG8gcmVsb2FkXG5cdFx0XHRsZXQgdXBkYXRlciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCd1c2VyJyk7XG5cblx0XHRcdGlmICh1cGRhdGVyID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlc2V0IHRoZSAnbW9kaWZpZWQnIGZsYWdcblx0XHRcdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5yZXNldElzTW9kaWZpZWQoKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdTZXJ2ZXIgc2V0dGluZ3MgdXBkYXRlZCcsICdJbW1lZGlhdGUgY2hhbmdlcyAoPGkgY2xhc3M9XCJmYXMgZmEtYm9sdFwiPjwvaT4pIGhhdmUgYmVlbiBhcHBsaWVkOyBhbGwgb3RoZXIgY2hhbmdlcyB3aWxsIGJlIGFjdGl2ZSBhZnRlciBuZXh0IHNlcnZlciByZXN0YXJ0Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXBkYXRlcn0gaGFzIG1vZGlmaWVkIHRoZSBzZXJ2ZXIgc2V0dGluZ3M7IHBsZWFzZSByZWxvYWQgdG8gdXBkYXRlIHlvdXIgdmlldy5gKTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0JCgnI3NyYy1zdWJtaXRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFNlcnZlciBjb25maWd1cmF0aW9uIHhtbCBzYXZlZCBieSBhbiBleHRlcm5hbCBwcm9jZXNzXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfQ09ORklHX0NIQU5HRURfQUxFUlQpXG5cdFx0e1xuXHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBUaGUgc3lzdGVtIGhhcyBtb2RpZmllZCB0aGUgc2VydmVyIHNldHRpbmdzIGF1dG9tYXRpY2FsbHk7IHBsZWFzZSByZWxvYWQgdG8gdXBkYXRlIHlvdXIgdmlldy5gKTtcblxuXHRcdFx0Ly8gRGlzYWJsZSBzdWJtaXQgYnV0dG9uXG5cdFx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gU1NMIGNlcnRpZmljYXRlIHVwbG9hZCBlcnJvclxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1NTTF9VUExPQURfRVJST1IpXG5cdFx0e1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBkYXRhLmdldFV0ZlN0cmluZygnZXJyb3InKTtcblxuXHRcdFx0Ly8gTG9nIHdhcm5pbmdcblx0XHRcdHRoaXMuc2hlbGxDdHJsLmxvZ01lc3NhZ2UoZXJyb3IsICdlcnJvcicpO1xuXG5cdFx0XHQvLyBTaG93IGVycm9yIGluIG1hbmFnZXIgd2luZG93XG5cdFx0XHR0aGlzLl9zc2xDZXJ0TWFuYWdlci5vblNzbENlcnRVcGxvYWRFcnJvcihlcnJvcik7XG5cdFx0fVxuXG5cdFx0Ly8gU1NMIGNlcnRpZmljYXRlIHVwbG9hZCBjb25maXJtZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9TU0xfVVBMT0FEX0NPTkZJUk0pXG5cdFx0e1xuXHRcdFx0Ly8gQ2xvc3cgbWFuYWdlciB3aW5kb3dcblx0XHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLm9uU3NsQ2VydFVwbG9hZFN1Y2Nlc3MoKTtcblxuXHRcdFx0bGV0IHVwZGF0ZXIgPSBkYXRhLmdldFV0ZlN0cmluZygndXNlcicpO1xuXG5cdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVwZGF0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignU1NMIGNlcnRpZmljYXRlJywgJ1NTTCBjZXJ0aWZpY2F0ZSBrZXlzdG9yZSB3YXMgdXBsb2FkZWQgc3VjY2Vzc2Z1bGx5Jyk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1NTTCBjZXJ0aWZpY2F0ZScsIGBBZG1pbmlzdHJhdG9yICR7dXBkYXRlcn0gaGFzIHVwbG9hZGVkIGEgbmV3IFNTTCBjZXJ0aWZpY2F0ZSBrZXlzdG9yZWApO1xuXG5cdFx0XHQvLyBXaGVuIGEgY2VydGlmaWNhdGUgaXMgdXBsb2FkZWQsIEhUVFBTIGlzIGFsc28gZW5hYmxlZCBhdXRvbWF0aWNhbGx5OlxuXHRcdFx0Ly8gd2UgaGF2ZSB0byB1cGRhdGUgdGhlIGludGVyZmFjZSBhY2NvcmRpbmdseVxuXHRcdFx0dGhpcy5fdXBkYXRlQ29uZmlnRm9ybUl0ZW1EaXNwbGF5ZWRWYWx1ZSgnd2ViU2VydmVyLmVuYWJsZUh0dHBzJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gR2VvbG9jYXRpb24gZGF0YWJhc2UgdXBkYXRlIGNvbmZpcm1hdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1VQREFURV9HRU9fREIpXG5cdFx0e1xuXHRcdFx0Ly8gRW5hYmxlIGJ1dHRvblxuXHRcdFx0JCgnI3NyYy11cGRhdGVHZW9sb2NEYkJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBDaGVjayBzdWNjZXNzXG5cdFx0XHRpZiAoZGF0YS5nZXRCb29sKCdzdWNjZXNzJykpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFVwZGF0ZSBkaXNwbGF5ZWQgZGF0ZVxuXHRcdFx0XHR0aGlzLl91cGRhdGVDb25maWdGb3JtSXRlbURpc3BsYXllZFZhbHVlKCdhZG1pbkhlbHBlci5nZW9EYlJlbGVhc2VEYXRlJywgZGF0YS5nZXRVdGZTdHJpbmcoJ25ld1JlbERhdGUnKSk7XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgYWxzbyBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRcdGxldCB1cGRhdGVyID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdFx0XHRpZiAodXBkYXRlciA9PSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lKVxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ0dlb2xvY2F0aW9uIGRhdGFiYXNlIHVwZGF0ZWQnLCAnTGF0ZXN0IHJlbGVhc2Ugb2YgdGhlIEdlb0xpdGUyIENvdW50cnkgZGF0YWJhc2UgaGFzIGJlZW4gaW5zdGFsbGVkIHN1Y2Nlc3NmdWxseScpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChkYXRhLmdldFV0ZlN0cmluZygnZXJyb3InKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X2VuYWJsZUJ1dHRvbnMoZW5hYmxlZClcblx0e1xuXHRcdCQoJyNzcmMtcmVsb2FkQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdFx0JCgnI3NyYy1zdWJtaXRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjc3JjLWJhY2t1cENoZWNrJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cblx0XHQkKCcjc3JjLXVwZGF0ZUdlb2xvY0RiQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cblx0XHRpZiAoIXRoaXMuX3NzbExvY2tlZClcblx0XHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLmVuYWJsZWQgPSBlbmFibGVkO1xuXHR9XG5cblx0X3N3aXRjaFZpZXcodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NyYy12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X2NsZWFyVGFicygpXG5cdHtcblx0XHQvLyBEZXN0cm95IHNjcm9sbGluZyB0YWJzXG5cdFx0JCgnI3NyYy10YWJOYXZpZ2F0b3IgI3RhYnMnKS5zY3JvbGxpbmdUYWJzKCdkZXN0cm95Jyk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIHRhYiBuYXZpZ2F0b3IgY29udGVudFxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGVzdHJveUludGVyZmFjZSgpO1xuXHR9XG5cblx0X29uVXBkYXRlR2VvbG9jRGJDbGljaygpXG5cdHtcblx0XHQvLyBEaXNhYmxlIGJ1dHRvblxuXHRcdCQoJyNzcmMtdXBkYXRlR2VvbG9jRGJCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXG5cdFx0Ly8gU2VuZCByZXF1ZXN0IHRvIHNlcnZlclxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfVVBEQVRFX0dFT19EQik7XG5cdH1cblxuXHRfb25SZWxvYWRDbGljaygpXG5cdHtcblx0XHQvLyBEaXNhYmxlIGJ1dHRvbnNcblx0XHR0aGlzLl9lbmFibGVCdXR0b25zKGZhbHNlKTtcblxuXHRcdC8vIFN3aXRjaCB0byBsb2FkaW5nIHZpZXdcblx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdzcmMtbG9hZGluZycpO1xuXG5cdFx0Ly8gSGlkZSB2YWxpZGF0aW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5yZXNldFZhbGlkYXRpb24oKTtcblxuXHRcdC8vIFJlcXVlc3QgY29uZmlndXJhdGlvbiBkYXRhIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX0NPTkZJRyk7XG5cdH1cblxuXHRfb25TdWJtaXRDbGljaygpXG5cdHtcblx0XHQvLyBDaGVjayB2YWxpZGl0eVxuXHRcdGlmICh0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmNoZWNrSXNWYWxpZCgpKVxuXHRcdHtcblx0XHRcdGxldCBjaGFuZ2VzID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDaGFuZ2VkRGF0YSgpO1xuXG5cdFx0XHRpZiAoY2hhbmdlcy5zaXplKCkgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNhYmxlIGJ1dHRvbnNcblx0XHRcdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyhmYWxzZSk7XG5cblx0XHRcdFx0Ly8gRGlzYWJsZSBmb3JtIGl0ZW1zXG5cdFx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGlzYWJsZUludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0XHQvLyBTZW5kIHVwZGF0ZWQgc2V0dGluZ3MgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0XHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRcdHBhcmFtcy5wdXRTRlNBcnJheSgnc2V0dGluZ3MnLCBjaGFuZ2VzKTtcblx0XHRcdFx0cGFyYW1zLnB1dEJvb2woJ2JhY2t1cCcsICQoJyNzcmMtYmFja3VwQ2hlY2snKS5wcm9wKCdjaGVja2VkJykpO1xuXG5cdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfVVBEQVRFX0NPTkZJRywgcGFyYW1zKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KCdVbmFibGUgdG8gc3VibWl0IGNvbmZpZ3VyYXRpb24gY2hhbmdlcyBkdWUgdG8gYW4gaW52YWxpZCB2YWx1ZTsgcGxlYXNlIHZlcmlmeSB0aGUgaGlnaGxpZ2h0ZWQgZm9ybSBmaWVsZHMgaW4gYWxsIHRhYnMuJywgdHJ1ZSk7XG5cdH1cblxuXHRfdXBkYXRlQ29uZmlnRm9ybUl0ZW1EaXNwbGF5ZWRWYWx1ZShjb25maWdQYXJhbU5hbWUsIG5ld1ZhbHVlKVxuXHR7XG5cdFx0Ly8gR2V0IHRoZSByZWxldmFudCBDb25maWd1cmF0aW9uIEZvcm0gSXRlbVxuXHRcdGNvbnN0IGNvbmZpZ0Zvcm1JdGVtID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDb25maWdGb3JtSXRlbShjb25maWdQYXJhbU5hbWUpO1xuXG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgQ29uZmlndXJhdGlvbiBGb3JtIEl0ZW1cblx0XHRjb25maWdGb3JtSXRlbS5kYXRhLnZhbHVlID0gbmV3VmFsdWU7XG5cdFx0Y29uZmlnRm9ybUl0ZW0uZGF0YS5yZXNldElzTW9kaWZpZWQoKTsgLy8gVGhpcyBpcyBuZWVkZWQgdG8gYXZvaWQgdGhlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIGZsYWdnZWQgYXMgJ2NoYW5nZWQnXG5cblx0XHQvLyBEaXNwbGF5IHRoZSBuZXcgdmFsdWUgb2YgdGhlIENvbmZpZ3VyYXRpb24gRm9ybSBJdGVtXG5cdFx0Y29uZmlnRm9ybUl0ZW0uX3NldFdpZGdldFZhbHVlKCk7IC8vIERpc3BsYXkgdGhlIG5ldyB2YWx1ZSBpbiB0aGUgY29uZmlnIGZvcm0gaXRlbVxuXHR9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNuZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=