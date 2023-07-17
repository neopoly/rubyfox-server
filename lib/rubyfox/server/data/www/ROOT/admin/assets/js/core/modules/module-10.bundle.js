/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-10"],{

/***/ "./src/managers/file-datasource-manager.js":
/*!*************************************************!*\
  !*** ./src/managers/file-datasource-manager.js ***!
  \*************************************************/
/*! exports provided: FileDataSourceManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileDataSourceManager", function() { return FileDataSourceManager; });
class FileDataSourceManager
{
	constructor(libFolder, protectedFolders, fileSeparator)
	{
		this._protectedFolders = protectedFolders; // Folders which can't be deleted (but their content can)
		this._libFolder = libFolder;
		this._fileSeparator = fileSeparator;
	}

	get dataSource()
	{
		return this._dataSource;
	}

	init()
	{
		this._dataSource = new kendo.data.TreeListDataSource({
			data: [],
			schema: {
				model: {
					id: 'id',
					parentId: 'parentId',
					expanded: false
				}
			},
			sort: { field: 'name', dir: 'asc' }
		});
	}

	addFile(fileObj, parentLevel = null)
	{
		let file = {};

		file.name = fileObj.getUtfString('name');
		file.isDir = fileObj.getBool('isDir');
		file.lastMod = fileObj.getLong('lastMod');
		file.isLib = (file.isDir && file.name == this._libFolder);
		file.isProtected = (file.isDir && this._protectedFolders.indexOf(file.name) > -1);
		file.size = 0;

		if (parentLevel == null)
			file.level = 0;
		else
			file.level = parentLevel + 1;

		if (fileObj.containsKey('parent'))
		{
			file.parentId = fileObj.getUtfString('parent');
			file.id = file.parentId + this._fileSeparator + file.name;
		}
		else
		{
			file.parentId = null;
			file.id = file.name;
		}

		// Add child files
		if (file.isDir)
		{
			let filesArr = fileObj.getSFSArray('files');

			for (let i = 0; i < filesArr.size(); i++)
				file.size += this.addFile(filesArr.getSFSObject(i), file.level);
		}
		else
			file.size = fileObj.getLong('size');

		// Add file to data source
		this._dataSource.add(file);

		// Return file size
		return file.size;
	}

	removeFile(id)
	{
		let fileItem = this._dataSource.get(id);

		if (fileItem)
		{
			if (fileItem.parentId)
			{
				// Subtract old size from parent size
				let parentItem = this._dataSource.get(fileItem.parentId);
				this._updateParentSize(parentItem, -fileItem.size);
			}

			this._dataSource.remove(fileItem);

			// Return parent item
			if (fileItem.parentId)
				return this._dataSource.get(fileItem.parentId);
		}
	}

	getFileById(id)
	{
		return this._dataSource.get(id);
	}

	addFileToParent(fileObj, parentId)
	{
		let parentItem = this._dataSource.get(parentId);

		if (parentItem != null && parentItem.isDir)
		{
			const fileId = parentId + this._fileSeparator + fileObj.getUtfString('name');
			let fileItem = this._dataSource.get(fileId);

			if (fileItem != null)
			{
				// Subtract old size from parent size
				this._updateParentSize(parentItem, -fileItem.size);

				// Update existing item
				fileItem.name = fileObj.getUtfString('name');
				fileItem.lastMod = fileObj.getLong('lastMod');
				fileItem.size = fileObj.getLong('size');
			}
			else
			{
				// Add new item
				this.addFile(fileObj, parentItem.level);
			}

			// Update parent item size
			this._updateParentSize(parentItem, fileObj.getLong('size'));

			return fileId;
		}
		else
			throw new Error(`An unexpected error occurred while adding file '${fileObj.getUtfString('name')}' (target: ${parentId}).`);
	}

	_updateParentSize(parentItem, value)
	{
		parentItem.size += value;

		if (parentItem.parentId)
		{
			let grandParent = this._dataSource.get(parentItem.parentId);
			this._updateParentSize(grandParent, value);
		}
	}
}


/***/ }),

/***/ "./src/modules/extension-manager.js":
/*!******************************************!*\
  !*** ./src/modules/extension-manager.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ExtensionManager; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _managers_file_datasource_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../managers/file-datasource-manager */ "./src/managers/file-datasource-manager.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");




class ExtensionManager extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('extensionMan');

		// Outgoing requests
		this.REQ_INIT = 'init';
		this.REQ_GET_EXTENSIONS = 'getExtensions';
		this.REQ_CREATE_FOLDER = 'createFolder';
		this.REQ_DELETE_FILES = 'deleteExtFiles';
		this.REQ_RELOAD_EXTENSIONS = 'reloadExt';

		// Incoming responses
		this.RESP_LOCKED = 'lock';
		this.RESP_INIT = 'init';
		this.RESP_EXTENSIONS = 'extensions';
		this.RESP_FILE_ADDED = 'fileAdded';
		this.RESP_FILES_DELETED = 'filesDeleted';
		this.RESP_ERROR = 'error';
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

		// Initialize progress bar
		$('#exm-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Add listeners to buttons
		$('#exm-retryBt').on('click', $.proxy(this._onRetryClick, this));
		$('#exm-refreshBt').on('click', $.proxy(this._onRefreshClick, this));

		// Initialize files list
		this._filesList = $('#exm-fileList').kendoTreeList({
            dataSource: [],
			resizable: true,
			selectable: true,
            columns: [
                {
					field: 'name',
					title: 'Name',
					template: kendo.template(`
						<div >
							# if (isDir) { #
								# if (expanded) { #
									<i class="fas fa-folder-open"></i>
								# } else { #
									<i class="fas fa-folder"></i>
								# } #
							# } else { #
								<i class="far fa-file"></i>
							# } #

							#: name #

						</div>
						<div class="file-controls flex-grow-1 text-right" data-item-id="#:id#">
							# if (isDir) { #
								<button type="button" class="k-button k-primary my-1 create-folder-bt"><i class="fas fa-folder-plus"></i></button>
								# if (level > 0) { #
									<button type="button" class="k-button k-primary my-1 upload-files-bt"><i class="fas fa-file-upload"></i></button>
								# } #
							# } #

							# if (level > 0 && !isProtected) { #
								<button type="button" class="k-button k-primary my-1 remove-file-bt"><i class="fas fa-minus-circle"></i></button>
							# } #

							# if (level == 1 && !isLib) { #
								<button type="button" class="k-button k-primary my-1 reload-ext-bt"><i class="fas fa-redo-alt"></i></button>
							# } #
						</div>
					`),
				},
                {
					field: 'size',
					title: 'Size',
					template: function(dataItem) {
						dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_2__["bytesToSize"]; // Pass bytesToSize utility function to template
						return kendo.template(`
							#: bytesToSize(size, 2, 'KB') #
						`)(dataItem);
					},
					width: 120,
					minScreenWidth: 576
				},
                {
					field: 'lastMod',
					title: 'Last Modified',
					template: kendo.template(`
						#: kendo.toString(new Date(lastMod), 'dd MMM yyyy HH:mm:ss') #
					`),
					width: 200,
					minScreenWidth: 768
				},
            ],
			change: $.proxy(this._onFileSelectedChange, this)
        }).data('kendoTreeList');

		//-------------------------------------------

		// Add listeners to catch control button clicks on rows
		$('#exm-fileList').on('click', '.create-folder-bt', $.proxy(this._showAddFolderModalClick, this));
		$('#exm-fileList').on('click', '.upload-files-bt', $.proxy(this._showUploadFilesModalClick, this));
		$('#exm-fileList').on('click', '.remove-file-bt', $.proxy(this._onRemoveFileClick, this));
		$('#exm-fileList').on('click', '.reload-ext-bt', $.proxy(this._onReloadExtClick, this));

		//-------------------------------------------

		// Initialize "add folder" modal
		this._addFolderModal = $('#exm-addFolderModal');
		this._addFolderModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Add listener to modal hide event
		this._addFolderModal.on('hidden.bs.modal', $.proxy(this._onAddFolderModalHidden, this));

		// Add listener to Add button click
		$('#exm-addFolderBt').on('click', $.proxy(this._onAddFolderClick, this));

		// Initialize kendo validation on folder name form
		this._addFolderValidator = $('#exm-addFolderForm').kendoValidator({}).data('kendoValidator');

		//-------------------------------------------

		// Initialize "upload files" modal
		this._uploadFilesModal = $('#exm-uploadModal');
		this._uploadFilesModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Initialize kendo uploader
		this._uploader = $('#exm-uploader').kendoUpload({
			multiple: true,
			async: {
				saveUrl: 'http://localhost', // This will be changed later in _onUploadStart method
				autoUpload: true,
			},
			directoryDrop: true,
			upload: $.proxy(this._onUploadStart, this),
			complete: $.proxy(this._onUploadEnd, this),
			localization: {
				select: 'Select files...'
			}
		}).data('kendoUpload');

		// Add listener to Upload button click
		$('#exm-clearFilesBt').on('click', $.proxy(this._onClearFilesClick, this));

		//-------------------------------------------

		// Send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#exm-retryBt').off('click');
		$('#exm-refreshBt').off('click');

		$('#exm-fileList').off('click');

		this._addFolderModal.off('hidden.bs.modal');
		this._addFolderModal.modal('dispose');
		$('#exm-addFolderBt').off('click');

		this._uploadFilesModal.modal('dispose');
		$('#exm-clearFilesBt').off('click');
	}

	onExtensionCommand(command, data)
	{
		// Module can be enabled (no locking file exists)
		if (command == this.RESP_INIT)
		{
			// Retrieve file separator
			this._fileSeparator = data.getUtfString('sep');

			// Retrieve Extensions' __lib__ folder name
			const libFolder = data.getUtfString('lib');

			// Create file data source manager
			this._fileManager = new _managers_file_datasource_manager__WEBPACK_IMPORTED_MODULE_1__["FileDataSourceManager"](libFolder, [libFolder], this._fileSeparator);

			// Retrieve module id sent by the server (required because multiple modules use file uploading service)
			const uploadModuleId = data.getUtfString('modId');

			// Set file uploading target configuration
			this._uploadTargetConfig = {
				sessionToken: this.smartFox.sessionToken,
				host: this.smartFox.config.host,
				port: this.smartFox.config.port,
				moduleId: uploadModuleId,
				protocol: this.smartFox.config.useSSL ? 'https' : 'http'
			};

			// Request Extension files data to server instance
			this._refreshDataList();
		}

		/*
		 * This response is returned if the file UploadsLock.txt exists in the /config folder of the server.
		 * This is an additional security measure to avoid unwanted files to be uploaded by malicius users accessing the server
		 * with the default credentials, in case they have not been changed by the administrator after the installation.
		 * The file must be removed manually before accessing the Extension Manager module for the first time
		 */
		else if (command == this.RESP_LOCKED)
		{
			// Show warning
			this._switchView('exm-locked');
		}

		// Extensions folders and files
		else if (command == this.RESP_EXTENSIONS)
		{
			// Retrieve Extension file list
			let extensionsObj = data.getSFSObject('extensions');

			// Initialize manager
			this._fileManager.init();

			// Add list to manager
			this._fileManager.addFile(extensionsObj);

			// Set TreeList data source
			this._filesList.setDataSource(this._fileManager.dataSource);

			// Expand first level
			this._filesList.expand($('#exm-fileList tbody>tr:eq(0)'));

			// Enable interface
			this._enableInterface(true);

			// Show module's main view
			this._switchView('exm-main');
		}

		// An error occurred while managing extension files
		else if (command == this.RESP_ERROR)
		{
			// Hide add folder modal
			this._addFolderModal.modal('hide');

			// Re-enable interface
			this._enableInterface(true);

			// Show an alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'));
		}

		// Extension folder or file added
		else if (command == this.RESP_FILE_ADDED)
		{
			// Get name of the user who added the file/folder
			const requester = data.getUtfString('user');

			// Get the object representing the file/folder being added
			const fileObj = data.getSFSObject('file');

			// Get the target folder where the new file/folder should be added
			const parentPath = data.getUtfString('parent');

			// Get the flag notifying this was a file upload
			const isUpload = data.getBool('isUpload');

			try
			{
				// Add/update item on data source
				const filePath = this._fileManager.addFileToParent(fileObj, parentPath);

				// Refresh view
				this._filesList.refresh();

				if (requester == this.smartFox.mySelf.name)
				{
					// Expand parent
					this._filesList.expand($(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(parentPath)}"]`).closest('tr'));

					if (!isUpload)
					{
						// Hide modal
						this._addFolderModal.modal('hide');

						// Select upload file
						this._filesList.select($(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(filePath)}"]`).closest('tr'));
					}

					// Update selection
					this._onFileSelectedChange();
				}
				else
				{
					// Display notification
					if (!isUpload)
						this.shellCtrl.showNotification(`Folder created`, `Administrator ${requester} created folder: <strong>${filePath}</strong>`);
					else
						this.shellCtrl.showNotification(`File uploaded`, `Administrator ${requester} uploaded file: <strong>${filePath}</strong>`);
				}
			}
			catch (e)
			{
				// This should not happen... data source is corrupted?
				if (requester == this.smartFox.mySelf.name)
					this.shellCtrl.showSimpleAlert(e.message, true);
			}

			// Enable interface
			this._enableInterface(true);
		}

		// Extension files deleted
		else if (command == this.RESP_FILES_DELETED)
		{
			// Get name of the user who deleted the file/s
			const requester = data.getUtfString('user');

			// Get the list of deleted files
			let files = data.getSFSArray('files');

			let filesArr = [];

			// Update data source
			for (let j = 0; j < files.size(); j++)
			{
				let path = files.getUtfString(j);
				filesArr.push(path);

				//------------------------

				// Remove item from data source; parent item is returned
				let parentItem = this._fileManager.removeFile(path);

				// Collapse parent if the last of its children was deleted
				if (parentItem && !parentItem.hasChildren)
					this._filesList.collapse($(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(parentItem.id)}"]`).closest('tr'));
			}

			if (requester == this.smartFox.mySelf.name)
			{
				// Display notification
				this.shellCtrl.showNotification(`${this._selectedItem.isDir ? 'Folder' : 'File'} deleted`, `${this._selectedItem.isDir ? 'Folder' : 'File'} '${this._selectedItem.name}' deleted successfully`);

				this._selectedItem = null;

				this._enableInterface(true);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification(`File deleted`, `Administrator ${requester} deleted the following file${filesArr.length > 1 ? 's' : ''}: <strong>${filesArr.join('<br> ')}</strong>`);
			}

			// Reset selection
			this._onFileSelectedChange();
		}

		// else if ()
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onRetryClick()
	{
		this._switchView('exm-init');

		// Re-send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	_onRefreshClick()
	{
		this._filesList.clearSelection();
		this._refreshDataList();
	}

	_onFileSelectedChange()
	{
		// Hide control buttons on currently selected item
		if (this._selectedItem)
			$(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(this._selectedItem.id)}"]`).hide();

		// Get selected item
		let selectedRows = this._filesList.select();

		if (selectedRows.length > 0)
		{
			// Save ref. to selected item
			this._selectedItem = this._filesList.dataItem(selectedRows[0]);

			// Show control buttons on new selected item
			$(`#exm-fileList .file-controls[data-item-id="${$.escapeSelector(this._selectedItem.id)}"]`).show();
		}
		else
			this._selectedItem = null;
	}

	_showAddFolderModalClick()
	{
		if (this._selectedItem && this._selectedItem.isDir)
		{
			this._addFolderModal.modal('show');
			$('#exm-folderNameIn').focus();
		}
	}

	_onAddFolderClick()
	{
		// The parent folder could have been deleted while user is still typing the name of the new child folder
		if (!this._selectedItem)
		{
			this._addFolderModal.modal('hide');
			this.shellCtrl.showSimpleAlert('Unable to create folder; the parent folder doesn\'t exist.');
			return;
		}

		if (this._addFolderValidator.validate())
		{
			// Disable modal interface
			this._enableAddFolderModal(false);

			let data = new SFS2X.SFSObject();
			data.putUtfString('folder', this._selectedItem.id + this._fileSeparator + $('#exm-folderNameIn').val());

			// Send request to server
			this.sendExtensionRequest(this.REQ_CREATE_FOLDER, data);
		}
	}

	_onAddFolderModalHidden()
	{
		$('#exm-folderNameIn').val('');
		this._resetAddFolderValidation();

		// Enable modal interface
		this._enableAddFolderModal(true);
	}

	_showUploadFilesModalClick()
	{
		if (this._selectedItem)
			this._uploadFilesModal.modal('show');
	}

	_onClearFilesClick()
	{
		this._uploader.clearAllFiles();
	}

	_onUploadStart(e)
	{
		// Disable clear button
		$('#exm-clearFilesBt').attr('disabled', true);

		// Set destination url
		const url = this._uploadTargetConfig.protocol + '://' + this._uploadTargetConfig.host + ':' + this._uploadTargetConfig.port + '/BlueBox/SFS2XFileUpload?sessHashId=' + this._uploadTargetConfig.sessionToken;
		
		e.sender.options.async.saveUrl = url;

		// Set payload
		const params = new FormData();
		params.append('__module', this._uploadTargetConfig.moduleId);
		params.append('__target', this._selectedItem.id);

		for (let f = 0; f < e.files.length; f++)
			params.append('files[]', e.files[f].rawFile);

		e.formData = params;
	}

	_onUploadEnd(e)
	{
		// Enable clear button
		$('#exm-clearFilesBt').attr('disabled', false);
	}

	_onFilesUploadEnd(response)
	{
		// Nothing to do: we have to wait the upload process completion to be signaled by the server through the dedicated Extension response

		//=================================================================

		// TODO Should we handle this response in some way? For some unknown reason we always get ok=false and status=0
		// console.log(response)
		// console.log(response.ok)
		// console.log(response.status)
	}

	_onRemoveFileClick()
	{
		if (this._selectedItem)
			this.shellCtrl.showConfirmWarning(`Are you sure you want to delete the selected ${this._selectedItem.isDir ? 'folder' : 'file'}?<br><br>Path: <strong>${this._selectedItem.id}</strong>`, $.proxy(this._onRemoveFileConfirm, this));
	}

	_onRemoveFileConfirm()
	{
		// Disable interface
		this._enableInterface(false);

		// Request Extension files removal
		// NOTE: for compatibility with older AdminTool, the file to be deleted is sent
		// in an array of strings, even if we can't delete more than 1 file at once in this AdminTool

		let files = new SFS2X.SFSArray();
		files.addUtfString(this._selectedItem.id);

		let params = new SFS2X.SFSObject();
		params.putSFSArray('files', files);

		this.sendExtensionRequest(this.REQ_DELETE_FILES, params);
	}

	_onReloadExtClick()
	{
		if (this._selectedItem)
		{
			let pathArr = this._selectedItem.id.split(this._fileSeparator);

			if (pathArr.length > 1)
			{
				// Request Extension reload
				// NOTE: for compatibility with older AdminTool, the Extension to be reloaded is sent
				// in an array of strings, even if we can't reload more than 1 Extension at once in this AdminTool

				let extToReload = [];
				extToReload.push(pathArr[1]);

				let params = new SFS2X.SFSObject();
				params.putUtfStringArray('extensions', extToReload);

				// Send request to server
				this.sendExtensionRequest(this.REQ_RELOAD_EXTENSIONS, params);
			}
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_switchView(viewId)
	{
		document.getElementById('exm-viewstack').selectedElement = document.getElementById(viewId);
	}

	_enableInterface(enable)
	{
		$('#exm-fileList').attr('disabled', !enable);
		$('#exm-refreshBt').attr('disabled', !enable);
	}

	_refreshDataList()
	{
		// Disable interface
		this._enableInterface(false);

		// Send request to server
		this.sendExtensionRequest(this.REQ_GET_EXTENSIONS)
	}

	_resetAddFolderValidation()
	{
		this._addFolderValidator.hideMessages();

		// The method above doesn't remove the k-invalid classes and aria-invalid="true" attributes from inputs
		// Let's do it manually
		$('#exm-addFolderForm .k-invalid').removeClass('k-invalid');
		$('#exm-addFolderForm [aria-invalid="true"]').removeAttr('aria-invalid');
	}

	_enableAddFolderModal(enable)
	{
		// Disable modal close buttons
		$('#exm-addFolderModal button[data-dismiss="modal"]').attr('disabled', !enable);

		// Disable add button
		$('#exm-addFolderBt').attr('disabled', !enable);

		// Disable fieldset
		$('#exm-addFolderForm').attr('disabled', !enable);
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTAuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbWFuYWdlcnMvZmlsZS1kYXRhc291cmNlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9leHRlbnNpb24tbWFuYWdlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRmlsZURhdGFTb3VyY2VNYW5hZ2VyXG57XG5cdGNvbnN0cnVjdG9yKGxpYkZvbGRlciwgcHJvdGVjdGVkRm9sZGVycywgZmlsZVNlcGFyYXRvcilcblx0e1xuXHRcdHRoaXMuX3Byb3RlY3RlZEZvbGRlcnMgPSBwcm90ZWN0ZWRGb2xkZXJzOyAvLyBGb2xkZXJzIHdoaWNoIGNhbid0IGJlIGRlbGV0ZWQgKGJ1dCB0aGVpciBjb250ZW50IGNhbilcblx0XHR0aGlzLl9saWJGb2xkZXIgPSBsaWJGb2xkZXI7XG5cdFx0dGhpcy5fZmlsZVNlcGFyYXRvciA9IGZpbGVTZXBhcmF0b3I7XG5cdH1cblxuXHRnZXQgZGF0YVNvdXJjZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTtcblx0fVxuXG5cdGluaXQoKVxuXHR7XG5cdFx0dGhpcy5fZGF0YVNvdXJjZSA9IG5ldyBrZW5kby5kYXRhLlRyZWVMaXN0RGF0YVNvdXJjZSh7XG5cdFx0XHRkYXRhOiBbXSxcblx0XHRcdHNjaGVtYToge1xuXHRcdFx0XHRtb2RlbDoge1xuXHRcdFx0XHRcdGlkOiAnaWQnLFxuXHRcdFx0XHRcdHBhcmVudElkOiAncGFyZW50SWQnLFxuXHRcdFx0XHRcdGV4cGFuZGVkOiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c29ydDogeyBmaWVsZDogJ25hbWUnLCBkaXI6ICdhc2MnIH1cblx0XHR9KTtcblx0fVxuXG5cdGFkZEZpbGUoZmlsZU9iaiwgcGFyZW50TGV2ZWwgPSBudWxsKVxuXHR7XG5cdFx0bGV0IGZpbGUgPSB7fTtcblxuXHRcdGZpbGUubmFtZSA9IGZpbGVPYmouZ2V0VXRmU3RyaW5nKCduYW1lJyk7XG5cdFx0ZmlsZS5pc0RpciA9IGZpbGVPYmouZ2V0Qm9vbCgnaXNEaXInKTtcblx0XHRmaWxlLmxhc3RNb2QgPSBmaWxlT2JqLmdldExvbmcoJ2xhc3RNb2QnKTtcblx0XHRmaWxlLmlzTGliID0gKGZpbGUuaXNEaXIgJiYgZmlsZS5uYW1lID09IHRoaXMuX2xpYkZvbGRlcik7XG5cdFx0ZmlsZS5pc1Byb3RlY3RlZCA9IChmaWxlLmlzRGlyICYmIHRoaXMuX3Byb3RlY3RlZEZvbGRlcnMuaW5kZXhPZihmaWxlLm5hbWUpID4gLTEpO1xuXHRcdGZpbGUuc2l6ZSA9IDA7XG5cblx0XHRpZiAocGFyZW50TGV2ZWwgPT0gbnVsbClcblx0XHRcdGZpbGUubGV2ZWwgPSAwO1xuXHRcdGVsc2Vcblx0XHRcdGZpbGUubGV2ZWwgPSBwYXJlbnRMZXZlbCArIDE7XG5cblx0XHRpZiAoZmlsZU9iai5jb250YWluc0tleSgncGFyZW50JykpXG5cdFx0e1xuXHRcdFx0ZmlsZS5wYXJlbnRJZCA9IGZpbGVPYmouZ2V0VXRmU3RyaW5nKCdwYXJlbnQnKTtcblx0XHRcdGZpbGUuaWQgPSBmaWxlLnBhcmVudElkICsgdGhpcy5fZmlsZVNlcGFyYXRvciArIGZpbGUubmFtZTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGZpbGUucGFyZW50SWQgPSBudWxsO1xuXHRcdFx0ZmlsZS5pZCA9IGZpbGUubmFtZTtcblx0XHR9XG5cblx0XHQvLyBBZGQgY2hpbGQgZmlsZXNcblx0XHRpZiAoZmlsZS5pc0Rpcilcblx0XHR7XG5cdFx0XHRsZXQgZmlsZXNBcnIgPSBmaWxlT2JqLmdldFNGU0FycmF5KCdmaWxlcycpO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzQXJyLnNpemUoKTsgaSsrKVxuXHRcdFx0XHRmaWxlLnNpemUgKz0gdGhpcy5hZGRGaWxlKGZpbGVzQXJyLmdldFNGU09iamVjdChpKSwgZmlsZS5sZXZlbCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdGZpbGUuc2l6ZSA9IGZpbGVPYmouZ2V0TG9uZygnc2l6ZScpO1xuXG5cdFx0Ly8gQWRkIGZpbGUgdG8gZGF0YSBzb3VyY2Vcblx0XHR0aGlzLl9kYXRhU291cmNlLmFkZChmaWxlKTtcblxuXHRcdC8vIFJldHVybiBmaWxlIHNpemVcblx0XHRyZXR1cm4gZmlsZS5zaXplO1xuXHR9XG5cblx0cmVtb3ZlRmlsZShpZClcblx0e1xuXHRcdGxldCBmaWxlSXRlbSA9IHRoaXMuX2RhdGFTb3VyY2UuZ2V0KGlkKTtcblxuXHRcdGlmIChmaWxlSXRlbSlcblx0XHR7XG5cdFx0XHRpZiAoZmlsZUl0ZW0ucGFyZW50SWQpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFN1YnRyYWN0IG9sZCBzaXplIGZyb20gcGFyZW50IHNpemVcblx0XHRcdFx0bGV0IHBhcmVudEl0ZW0gPSB0aGlzLl9kYXRhU291cmNlLmdldChmaWxlSXRlbS5wYXJlbnRJZCk7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVBhcmVudFNpemUocGFyZW50SXRlbSwgLWZpbGVJdGVtLnNpemUpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9kYXRhU291cmNlLnJlbW92ZShmaWxlSXRlbSk7XG5cblx0XHRcdC8vIFJldHVybiBwYXJlbnQgaXRlbVxuXHRcdFx0aWYgKGZpbGVJdGVtLnBhcmVudElkKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZGF0YVNvdXJjZS5nZXQoZmlsZUl0ZW0ucGFyZW50SWQpO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpbGVCeUlkKGlkKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UuZ2V0KGlkKTtcblx0fVxuXG5cdGFkZEZpbGVUb1BhcmVudChmaWxlT2JqLCBwYXJlbnRJZClcblx0e1xuXHRcdGxldCBwYXJlbnRJdGVtID0gdGhpcy5fZGF0YVNvdXJjZS5nZXQocGFyZW50SWQpO1xuXG5cdFx0aWYgKHBhcmVudEl0ZW0gIT0gbnVsbCAmJiBwYXJlbnRJdGVtLmlzRGlyKVxuXHRcdHtcblx0XHRcdGNvbnN0IGZpbGVJZCA9IHBhcmVudElkICsgdGhpcy5fZmlsZVNlcGFyYXRvciArIGZpbGVPYmouZ2V0VXRmU3RyaW5nKCduYW1lJyk7XG5cdFx0XHRsZXQgZmlsZUl0ZW0gPSB0aGlzLl9kYXRhU291cmNlLmdldChmaWxlSWQpO1xuXG5cdFx0XHRpZiAoZmlsZUl0ZW0gIT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0Ly8gU3VidHJhY3Qgb2xkIHNpemUgZnJvbSBwYXJlbnQgc2l6ZVxuXHRcdFx0XHR0aGlzLl91cGRhdGVQYXJlbnRTaXplKHBhcmVudEl0ZW0sIC1maWxlSXRlbS5zaXplKTtcblxuXHRcdFx0XHQvLyBVcGRhdGUgZXhpc3RpbmcgaXRlbVxuXHRcdFx0XHRmaWxlSXRlbS5uYW1lID0gZmlsZU9iai5nZXRVdGZTdHJpbmcoJ25hbWUnKTtcblx0XHRcdFx0ZmlsZUl0ZW0ubGFzdE1vZCA9IGZpbGVPYmouZ2V0TG9uZygnbGFzdE1vZCcpO1xuXHRcdFx0XHRmaWxlSXRlbS5zaXplID0gZmlsZU9iai5nZXRMb25nKCdzaXplJyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEFkZCBuZXcgaXRlbVxuXHRcdFx0XHR0aGlzLmFkZEZpbGUoZmlsZU9iaiwgcGFyZW50SXRlbS5sZXZlbCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSBwYXJlbnQgaXRlbSBzaXplXG5cdFx0XHR0aGlzLl91cGRhdGVQYXJlbnRTaXplKHBhcmVudEl0ZW0sIGZpbGVPYmouZ2V0TG9uZygnc2l6ZScpKTtcblxuXHRcdFx0cmV0dXJuIGZpbGVJZDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkIHdoaWxlIGFkZGluZyBmaWxlICcke2ZpbGVPYmouZ2V0VXRmU3RyaW5nKCduYW1lJyl9JyAodGFyZ2V0OiAke3BhcmVudElkfSkuYCk7XG5cdH1cblxuXHRfdXBkYXRlUGFyZW50U2l6ZShwYXJlbnRJdGVtLCB2YWx1ZSlcblx0e1xuXHRcdHBhcmVudEl0ZW0uc2l6ZSArPSB2YWx1ZTtcblxuXHRcdGlmIChwYXJlbnRJdGVtLnBhcmVudElkKVxuXHRcdHtcblx0XHRcdGxldCBncmFuZFBhcmVudCA9IHRoaXMuX2RhdGFTb3VyY2UuZ2V0KHBhcmVudEl0ZW0ucGFyZW50SWQpO1xuXHRcdFx0dGhpcy5fdXBkYXRlUGFyZW50U2l6ZShncmFuZFBhcmVudCwgdmFsdWUpO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcbmltcG9ydCB7RmlsZURhdGFTb3VyY2VNYW5hZ2VyfSBmcm9tICcuLi9tYW5hZ2Vycy9maWxlLWRhdGFzb3VyY2UtbWFuYWdlcic7XG5pbXBvcnQge2J5dGVzVG9TaXplfSBmcm9tICcuLi91dGlscy91dGlsaXRpZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHRlbnNpb25NYW5hZ2VyIGV4dGVuZHMgQmFzZU1vZHVsZVxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCdleHRlbnNpb25NYW4nKTtcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfSU5JVCA9ICdpbml0Jztcblx0XHR0aGlzLlJFUV9HRVRfRVhURU5TSU9OUyA9ICdnZXRFeHRlbnNpb25zJztcblx0XHR0aGlzLlJFUV9DUkVBVEVfRk9MREVSID0gJ2NyZWF0ZUZvbGRlcic7XG5cdFx0dGhpcy5SRVFfREVMRVRFX0ZJTEVTID0gJ2RlbGV0ZUV4dEZpbGVzJztcblx0XHR0aGlzLlJFUV9SRUxPQURfRVhURU5TSU9OUyA9ICdyZWxvYWRFeHQnO1xuXG5cdFx0Ly8gSW5jb21pbmcgcmVzcG9uc2VzXG5cdFx0dGhpcy5SRVNQX0xPQ0tFRCA9ICdsb2NrJztcblx0XHR0aGlzLlJFU1BfSU5JVCA9ICdpbml0Jztcblx0XHR0aGlzLlJFU1BfRVhURU5TSU9OUyA9ICdleHRlbnNpb25zJztcblx0XHR0aGlzLlJFU1BfRklMRV9BRERFRCA9ICdmaWxlQWRkZWQnO1xuXHRcdHRoaXMuUkVTUF9GSUxFU19ERUxFVEVEID0gJ2ZpbGVzRGVsZXRlZCc7XG5cdFx0dGhpcy5SRVNQX0VSUk9SID0gJ2Vycm9yJztcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIENPTU1PTiBNT0RVTEUgSU5URVJGQUNFIE1FVEhPRFNcblx0Ly8gVGhpcyBtZW1iZXJzIGFyZSB1c2VkIGJ5IHRoZSBtYWluIGNvbnRyb2xsZXJcblx0Ly8gdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgbW9kdWxlJ3MgY29udHJvbGxlci5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyXG5cdFx0JCgnI2V4bS1wcm9ncmVzc0JhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gYnV0dG9uc1xuXHRcdCQoJyNleG0tcmV0cnlCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SZXRyeUNsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2V4bS1yZWZyZXNoQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVmcmVzaENsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGZpbGVzIGxpc3Rcblx0XHR0aGlzLl9maWxlc0xpc3QgPSAkKCcjZXhtLWZpbGVMaXN0Jykua2VuZG9UcmVlTGlzdCh7XG4gICAgICAgICAgICBkYXRhU291cmNlOiBbXSxcblx0XHRcdHJlc2l6YWJsZTogdHJ1ZSxcblx0XHRcdHNlbGVjdGFibGU6IHRydWUsXG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAge1xuXHRcdFx0XHRcdGZpZWxkOiAnbmFtZScsXG5cdFx0XHRcdFx0dGl0bGU6ICdOYW1lJyxcblx0XHRcdFx0XHR0ZW1wbGF0ZToga2VuZG8udGVtcGxhdGUoYFxuXHRcdFx0XHRcdFx0PGRpdiA+XG5cdFx0XHRcdFx0XHRcdCMgaWYgKGlzRGlyKSB7ICNcblx0XHRcdFx0XHRcdFx0XHQjIGlmIChleHBhbmRlZCkgeyAjXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1mb2xkZXItb3BlblwiPjwvaT5cblx0XHRcdFx0XHRcdFx0XHQjIH0gZWxzZSB7ICNcblx0XHRcdFx0XHRcdFx0XHRcdDxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlclwiPjwvaT5cblx0XHRcdFx0XHRcdFx0XHQjIH0gI1xuXHRcdFx0XHRcdFx0XHQjIH0gZWxzZSB7ICNcblx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhciBmYS1maWxlXCI+PC9pPlxuXHRcdFx0XHRcdFx0XHQjIH0gI1xuXG5cdFx0XHRcdFx0XHRcdCM6IG5hbWUgI1xuXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmaWxlLWNvbnRyb2xzIGZsZXgtZ3Jvdy0xIHRleHQtcmlnaHRcIiBkYXRhLWl0ZW0taWQ9XCIjOmlkI1wiPlxuXHRcdFx0XHRcdFx0XHQjIGlmIChpc0RpcikgeyAjXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnkgbXktMSBjcmVhdGUtZm9sZGVyLWJ0XCI+PGkgY2xhc3M9XCJmYXMgZmEtZm9sZGVyLXBsdXNcIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0IyBpZiAobGV2ZWwgPiAwKSB7ICNcblx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5IG15LTEgdXBsb2FkLWZpbGVzLWJ0XCI+PGkgY2xhc3M9XCJmYXMgZmEtZmlsZS11cGxvYWRcIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0IyB9ICNcblx0XHRcdFx0XHRcdFx0IyB9ICNcblxuXHRcdFx0XHRcdFx0XHQjIGlmIChsZXZlbCA+IDAgJiYgIWlzUHJvdGVjdGVkKSB7ICNcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstcHJpbWFyeSBteS0xIHJlbW92ZS1maWxlLWJ0XCI+PGkgY2xhc3M9XCJmYXMgZmEtbWludXMtY2lyY2xlXCI+PC9pPjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQjIH0gI1xuXG5cdFx0XHRcdFx0XHRcdCMgaWYgKGxldmVsID09IDEgJiYgIWlzTGliKSB7ICNcblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstcHJpbWFyeSBteS0xIHJlbG9hZC1leHQtYnRcIj48aSBjbGFzcz1cImZhcyBmYS1yZWRvLWFsdFwiPjwvaT48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0IyB9ICNcblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdGApLFxuXHRcdFx0XHR9LFxuICAgICAgICAgICAgICAgIHtcblx0XHRcdFx0XHRmaWVsZDogJ3NpemUnLFxuXHRcdFx0XHRcdHRpdGxlOiAnU2l6ZScsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZ1bmN0aW9uKGRhdGFJdGVtKSB7XG5cdFx0XHRcdFx0XHRkYXRhSXRlbS5ieXRlc1RvU2l6ZSA9IGJ5dGVzVG9TaXplOyAvLyBQYXNzIGJ5dGVzVG9TaXplIHV0aWxpdHkgZnVuY3Rpb24gdG8gdGVtcGxhdGVcblx0XHRcdFx0XHRcdHJldHVybiBrZW5kby50ZW1wbGF0ZShgXG5cdFx0XHRcdFx0XHRcdCM6IGJ5dGVzVG9TaXplKHNpemUsIDIsICdLQicpICNcblx0XHRcdFx0XHRcdGApKGRhdGFJdGVtKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHdpZHRoOiAxMjAsXG5cdFx0XHRcdFx0bWluU2NyZWVuV2lkdGg6IDU3NlxuXHRcdFx0XHR9LFxuICAgICAgICAgICAgICAgIHtcblx0XHRcdFx0XHRmaWVsZDogJ2xhc3RNb2QnLFxuXHRcdFx0XHRcdHRpdGxlOiAnTGFzdCBNb2RpZmllZCcsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGtlbmRvLnRlbXBsYXRlKGBcblx0XHRcdFx0XHRcdCM6IGtlbmRvLnRvU3RyaW5nKG5ldyBEYXRlKGxhc3RNb2QpLCAnZGQgTU1NIHl5eXkgSEg6bW06c3MnKSAjXG5cdFx0XHRcdFx0YCksXG5cdFx0XHRcdFx0d2lkdGg6IDIwMCxcblx0XHRcdFx0XHRtaW5TY3JlZW5XaWR0aDogNzY4XG5cdFx0XHRcdH0sXG4gICAgICAgICAgICBdLFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uRmlsZVNlbGVjdGVkQ2hhbmdlLCB0aGlzKVxuICAgICAgICB9KS5kYXRhKCdrZW5kb1RyZWVMaXN0Jyk7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gY2F0Y2ggY29udHJvbCBidXR0b24gY2xpY2tzIG9uIHJvd3Ncblx0XHQkKCcjZXhtLWZpbGVMaXN0Jykub24oJ2NsaWNrJywgJy5jcmVhdGUtZm9sZGVyLWJ0JywgJC5wcm94eSh0aGlzLl9zaG93QWRkRm9sZGVyTW9kYWxDbGljaywgdGhpcykpO1xuXHRcdCQoJyNleG0tZmlsZUxpc3QnKS5vbignY2xpY2snLCAnLnVwbG9hZC1maWxlcy1idCcsICQucHJveHkodGhpcy5fc2hvd1VwbG9hZEZpbGVzTW9kYWxDbGljaywgdGhpcykpO1xuXHRcdCQoJyNleG0tZmlsZUxpc3QnKS5vbignY2xpY2snLCAnLnJlbW92ZS1maWxlLWJ0JywgJC5wcm94eSh0aGlzLl9vblJlbW92ZUZpbGVDbGljaywgdGhpcykpO1xuXHRcdCQoJyNleG0tZmlsZUxpc3QnKS5vbignY2xpY2snLCAnLnJlbG9hZC1leHQtYnQnLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkRXh0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBcImFkZCBmb2xkZXJcIiBtb2RhbFxuXHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsID0gJCgnI2V4bS1hZGRGb2xkZXJNb2RhbCcpO1xuXHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKHtcblx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJyxcblx0XHRcdGtleWJvYXJkOiBmYWxzZSxcblx0XHRcdHNob3c6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gbW9kYWwgaGlkZSBldmVudFxuXHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuX29uQWRkRm9sZGVyTW9kYWxIaWRkZW4sIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBBZGQgYnV0dG9uIGNsaWNrXG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25BZGRGb2xkZXJDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB2YWxpZGF0aW9uIG9uIGZvbGRlciBuYW1lIGZvcm1cblx0XHR0aGlzLl9hZGRGb2xkZXJWYWxpZGF0b3IgPSAkKCcjZXhtLWFkZEZvbGRlckZvcm0nKS5rZW5kb1ZhbGlkYXRvcih7fSkuZGF0YSgna2VuZG9WYWxpZGF0b3InKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBcInVwbG9hZCBmaWxlc1wiIG1vZGFsXG5cdFx0dGhpcy5fdXBsb2FkRmlsZXNNb2RhbCA9ICQoJyNleG0tdXBsb2FkTW9kYWwnKTtcblx0XHR0aGlzLl91cGxvYWRGaWxlc01vZGFsLm1vZGFsKHtcblx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJyxcblx0XHRcdGtleWJvYXJkOiBmYWxzZSxcblx0XHRcdHNob3c6IGZhbHNlXG5cdFx0fSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHVwbG9hZGVyXG5cdFx0dGhpcy5fdXBsb2FkZXIgPSAkKCcjZXhtLXVwbG9hZGVyJykua2VuZG9VcGxvYWQoe1xuXHRcdFx0bXVsdGlwbGU6IHRydWUsXG5cdFx0XHRhc3luYzoge1xuXHRcdFx0XHRzYXZlVXJsOiAnaHR0cDovL2xvY2FsaG9zdCcsIC8vIFRoaXMgd2lsbCBiZSBjaGFuZ2VkIGxhdGVyIGluIF9vblVwbG9hZFN0YXJ0IG1ldGhvZFxuXHRcdFx0XHRhdXRvVXBsb2FkOiB0cnVlLFxuXHRcdFx0fSxcblx0XHRcdGRpcmVjdG9yeURyb3A6IHRydWUsXG5cdFx0XHR1cGxvYWQ6ICQucHJveHkodGhpcy5fb25VcGxvYWRTdGFydCwgdGhpcyksXG5cdFx0XHRjb21wbGV0ZTogJC5wcm94eSh0aGlzLl9vblVwbG9hZEVuZCwgdGhpcyksXG5cdFx0XHRsb2NhbGl6YXRpb246IHtcblx0XHRcdFx0c2VsZWN0OiAnU2VsZWN0IGZpbGVzLi4uJ1xuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvVXBsb2FkJyk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gVXBsb2FkIGJ1dHRvbiBjbGlja1xuXHRcdCQoJyNleG0tY2xlYXJGaWxlc0J0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNsZWFyRmlsZXNDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHQvLyBTZW5kIGluaXRpYWxpemF0aW9uIHJlcXVlc3Rcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0lOSVQpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdCQoJyNleG0tcmV0cnlCdCcpLm9mZignY2xpY2snKTtcblx0XHQkKCcjZXhtLXJlZnJlc2hCdCcpLm9mZignY2xpY2snKTtcblxuXHRcdCQoJyNleG0tZmlsZUxpc3QnKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHR0aGlzLl9hZGRGb2xkZXJNb2RhbC5vZmYoJ2hpZGRlbi5icy5tb2RhbCcpO1xuXHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKCdkaXNwb3NlJyk7XG5cdFx0JCgnI2V4bS1hZGRGb2xkZXJCdCcpLm9mZignY2xpY2snKTtcblxuXHRcdHRoaXMuX3VwbG9hZEZpbGVzTW9kYWwubW9kYWwoJ2Rpc3Bvc2UnKTtcblx0XHQkKCcjZXhtLWNsZWFyRmlsZXNCdCcpLm9mZignY2xpY2snKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cdFx0Ly8gTW9kdWxlIGNhbiBiZSBlbmFibGVkIChubyBsb2NraW5nIGZpbGUgZXhpc3RzKVxuXHRcdGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9JTklUKVxuXHRcdHtcblx0XHRcdC8vIFJldHJpZXZlIGZpbGUgc2VwYXJhdG9yXG5cdFx0XHR0aGlzLl9maWxlU2VwYXJhdG9yID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3NlcCcpO1xuXG5cdFx0XHQvLyBSZXRyaWV2ZSBFeHRlbnNpb25zJyBfX2xpYl9fIGZvbGRlciBuYW1lXG5cdFx0XHRjb25zdCBsaWJGb2xkZXIgPSBkYXRhLmdldFV0ZlN0cmluZygnbGliJyk7XG5cblx0XHRcdC8vIENyZWF0ZSBmaWxlIGRhdGEgc291cmNlIG1hbmFnZXJcblx0XHRcdHRoaXMuX2ZpbGVNYW5hZ2VyID0gbmV3IEZpbGVEYXRhU291cmNlTWFuYWdlcihsaWJGb2xkZXIsIFtsaWJGb2xkZXJdLCB0aGlzLl9maWxlU2VwYXJhdG9yKTtcblxuXHRcdFx0Ly8gUmV0cmlldmUgbW9kdWxlIGlkIHNlbnQgYnkgdGhlIHNlcnZlciAocmVxdWlyZWQgYmVjYXVzZSBtdWx0aXBsZSBtb2R1bGVzIHVzZSBmaWxlIHVwbG9hZGluZyBzZXJ2aWNlKVxuXHRcdFx0Y29uc3QgdXBsb2FkTW9kdWxlSWQgPSBkYXRhLmdldFV0ZlN0cmluZygnbW9kSWQnKTtcblxuXHRcdFx0Ly8gU2V0IGZpbGUgdXBsb2FkaW5nIHRhcmdldCBjb25maWd1cmF0aW9uXG5cdFx0XHR0aGlzLl91cGxvYWRUYXJnZXRDb25maWcgPSB7XG5cdFx0XHRcdHNlc3Npb25Ub2tlbjogdGhpcy5zbWFydEZveC5zZXNzaW9uVG9rZW4sXG5cdFx0XHRcdGhvc3Q6IHRoaXMuc21hcnRGb3guY29uZmlnLmhvc3QsXG5cdFx0XHRcdHBvcnQ6IHRoaXMuc21hcnRGb3guY29uZmlnLnBvcnQsXG5cdFx0XHRcdG1vZHVsZUlkOiB1cGxvYWRNb2R1bGVJZCxcblx0XHRcdFx0cHJvdG9jb2w6IHRoaXMuc21hcnRGb3guY29uZmlnLnVzZVNTTCA/ICdodHRwcycgOiAnaHR0cCdcblx0XHRcdH07XG5cblx0XHRcdC8vIFJlcXVlc3QgRXh0ZW5zaW9uIGZpbGVzIGRhdGEgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0XHR0aGlzLl9yZWZyZXNoRGF0YUxpc3QoKTtcblx0XHR9XG5cblx0XHQvKlxuXHRcdCAqIFRoaXMgcmVzcG9uc2UgaXMgcmV0dXJuZWQgaWYgdGhlIGZpbGUgVXBsb2Fkc0xvY2sudHh0IGV4aXN0cyBpbiB0aGUgL2NvbmZpZyBmb2xkZXIgb2YgdGhlIHNlcnZlci5cblx0XHQgKiBUaGlzIGlzIGFuIGFkZGl0aW9uYWwgc2VjdXJpdHkgbWVhc3VyZSB0byBhdm9pZCB1bndhbnRlZCBmaWxlcyB0byBiZSB1cGxvYWRlZCBieSBtYWxpY2l1cyB1c2VycyBhY2Nlc3NpbmcgdGhlIHNlcnZlclxuXHRcdCAqIHdpdGggdGhlIGRlZmF1bHQgY3JlZGVudGlhbHMsIGluIGNhc2UgdGhleSBoYXZlIG5vdCBiZWVuIGNoYW5nZWQgYnkgdGhlIGFkbWluaXN0cmF0b3IgYWZ0ZXIgdGhlIGluc3RhbGxhdGlvbi5cblx0XHQgKiBUaGUgZmlsZSBtdXN0IGJlIHJlbW92ZWQgbWFudWFsbHkgYmVmb3JlIGFjY2Vzc2luZyB0aGUgRXh0ZW5zaW9uIE1hbmFnZXIgbW9kdWxlIGZvciB0aGUgZmlyc3QgdGltZVxuXHRcdCAqL1xuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0xPQ0tFRClcblx0XHR7XG5cdFx0XHQvLyBTaG93IHdhcm5pbmdcblx0XHRcdHRoaXMuX3N3aXRjaFZpZXcoJ2V4bS1sb2NrZWQnKTtcblx0XHR9XG5cblx0XHQvLyBFeHRlbnNpb25zIGZvbGRlcnMgYW5kIGZpbGVzXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfRVhURU5TSU9OUylcblx0XHR7XG5cdFx0XHQvLyBSZXRyaWV2ZSBFeHRlbnNpb24gZmlsZSBsaXN0XG5cdFx0XHRsZXQgZXh0ZW5zaW9uc09iaiA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCdleHRlbnNpb25zJyk7XG5cblx0XHRcdC8vIEluaXRpYWxpemUgbWFuYWdlclxuXHRcdFx0dGhpcy5fZmlsZU1hbmFnZXIuaW5pdCgpO1xuXG5cdFx0XHQvLyBBZGQgbGlzdCB0byBtYW5hZ2VyXG5cdFx0XHR0aGlzLl9maWxlTWFuYWdlci5hZGRGaWxlKGV4dGVuc2lvbnNPYmopO1xuXG5cdFx0XHQvLyBTZXQgVHJlZUxpc3QgZGF0YSBzb3VyY2Vcblx0XHRcdHRoaXMuX2ZpbGVzTGlzdC5zZXREYXRhU291cmNlKHRoaXMuX2ZpbGVNYW5hZ2VyLmRhdGFTb3VyY2UpO1xuXG5cdFx0XHQvLyBFeHBhbmQgZmlyc3QgbGV2ZWxcblx0XHRcdHRoaXMuX2ZpbGVzTGlzdC5leHBhbmQoJCgnI2V4bS1maWxlTGlzdCB0Ym9keT50cjplcSgwKScpKTtcblxuXHRcdFx0Ly8gRW5hYmxlIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHQvLyBTaG93IG1vZHVsZSdzIG1haW4gdmlld1xuXHRcdFx0dGhpcy5fc3dpdGNoVmlldygnZXhtLW1haW4nKTtcblx0XHR9XG5cblx0XHQvLyBBbiBlcnJvciBvY2N1cnJlZCB3aGlsZSBtYW5hZ2luZyBleHRlbnNpb24gZmlsZXNcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9FUlJPUilcblx0XHR7XG5cdFx0XHQvLyBIaWRlIGFkZCBmb2xkZXIgbW9kYWxcblx0XHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdHRoaXMuX2VuYWJsZUludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpKTtcblx0XHR9XG5cblx0XHQvLyBFeHRlbnNpb24gZm9sZGVyIG9yIGZpbGUgYWRkZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9GSUxFX0FEREVEKVxuXHRcdHtcblx0XHRcdC8vIEdldCBuYW1lIG9mIHRoZSB1c2VyIHdobyBhZGRlZCB0aGUgZmlsZS9mb2xkZXJcblx0XHRcdGNvbnN0IHJlcXVlc3RlciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCd1c2VyJyk7XG5cblx0XHRcdC8vIEdldCB0aGUgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgZmlsZS9mb2xkZXIgYmVpbmcgYWRkZWRcblx0XHRcdGNvbnN0IGZpbGVPYmogPSBkYXRhLmdldFNGU09iamVjdCgnZmlsZScpO1xuXG5cdFx0XHQvLyBHZXQgdGhlIHRhcmdldCBmb2xkZXIgd2hlcmUgdGhlIG5ldyBmaWxlL2ZvbGRlciBzaG91bGQgYmUgYWRkZWRcblx0XHRcdGNvbnN0IHBhcmVudFBhdGggPSBkYXRhLmdldFV0ZlN0cmluZygncGFyZW50Jyk7XG5cblx0XHRcdC8vIEdldCB0aGUgZmxhZyBub3RpZnlpbmcgdGhpcyB3YXMgYSBmaWxlIHVwbG9hZFxuXHRcdFx0Y29uc3QgaXNVcGxvYWQgPSBkYXRhLmdldEJvb2woJ2lzVXBsb2FkJyk7XG5cblx0XHRcdHRyeVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBZGQvdXBkYXRlIGl0ZW0gb24gZGF0YSBzb3VyY2Vcblx0XHRcdFx0Y29uc3QgZmlsZVBhdGggPSB0aGlzLl9maWxlTWFuYWdlci5hZGRGaWxlVG9QYXJlbnQoZmlsZU9iaiwgcGFyZW50UGF0aCk7XG5cblx0XHRcdFx0Ly8gUmVmcmVzaCB2aWV3XG5cdFx0XHRcdHRoaXMuX2ZpbGVzTGlzdC5yZWZyZXNoKCk7XG5cblx0XHRcdFx0aWYgKHJlcXVlc3RlciA9PSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRXhwYW5kIHBhcmVudFxuXHRcdFx0XHRcdHRoaXMuX2ZpbGVzTGlzdC5leHBhbmQoJChgI2V4bS1maWxlTGlzdCAuZmlsZS1jb250cm9sc1tkYXRhLWl0ZW0taWQ9XCIkeyQuZXNjYXBlU2VsZWN0b3IocGFyZW50UGF0aCl9XCJdYCkuY2xvc2VzdCgndHInKSk7XG5cblx0XHRcdFx0XHRpZiAoIWlzVXBsb2FkKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIEhpZGUgbW9kYWxcblx0XHRcdFx0XHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdFx0XHRcdC8vIFNlbGVjdCB1cGxvYWQgZmlsZVxuXHRcdFx0XHRcdFx0dGhpcy5fZmlsZXNMaXN0LnNlbGVjdCgkKGAjZXhtLWZpbGVMaXN0IC5maWxlLWNvbnRyb2xzW2RhdGEtaXRlbS1pZD1cIiR7JC5lc2NhcGVTZWxlY3RvcihmaWxlUGF0aCl9XCJdYCkuY2xvc2VzdCgndHInKSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gVXBkYXRlIHNlbGVjdGlvblxuXHRcdFx0XHRcdHRoaXMuX29uRmlsZVNlbGVjdGVkQ2hhbmdlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoIWlzVXBsb2FkKVxuXHRcdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbihgRm9sZGVyIGNyZWF0ZWRgLCBgQWRtaW5pc3RyYXRvciAke3JlcXVlc3Rlcn0gY3JlYXRlZCBmb2xkZXI6IDxzdHJvbmc+JHtmaWxlUGF0aH08L3N0cm9uZz5gKTtcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKGBGaWxlIHVwbG9hZGVkYCwgYEFkbWluaXN0cmF0b3IgJHtyZXF1ZXN0ZXJ9IHVwbG9hZGVkIGZpbGU6IDxzdHJvbmc+JHtmaWxlUGF0aH08L3N0cm9uZz5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2F0Y2ggKGUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFRoaXMgc2hvdWxkIG5vdCBoYXBwZW4uLi4gZGF0YSBzb3VyY2UgaXMgY29ycnVwdGVkP1xuXHRcdFx0XHRpZiAocmVxdWVzdGVyID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGUubWVzc2FnZSwgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdHRoaXMuX2VuYWJsZUludGVyZmFjZSh0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBFeHRlbnNpb24gZmlsZXMgZGVsZXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0ZJTEVTX0RFTEVURUQpXG5cdFx0e1xuXHRcdFx0Ly8gR2V0IG5hbWUgb2YgdGhlIHVzZXIgd2hvIGRlbGV0ZWQgdGhlIGZpbGUvc1xuXHRcdFx0Y29uc3QgcmVxdWVzdGVyID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdFx0Ly8gR2V0IHRoZSBsaXN0IG9mIGRlbGV0ZWQgZmlsZXNcblx0XHRcdGxldCBmaWxlcyA9IGRhdGEuZ2V0U0ZTQXJyYXkoJ2ZpbGVzJyk7XG5cblx0XHRcdGxldCBmaWxlc0FyciA9IFtdO1xuXG5cdFx0XHQvLyBVcGRhdGUgZGF0YSBzb3VyY2Vcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgZmlsZXMuc2l6ZSgpOyBqKyspXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBwYXRoID0gZmlsZXMuZ2V0VXRmU3RyaW5nKGopO1xuXHRcdFx0XHRmaWxlc0Fyci5wdXNoKHBhdGgpO1xuXG5cdFx0XHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGl0ZW0gZnJvbSBkYXRhIHNvdXJjZTsgcGFyZW50IGl0ZW0gaXMgcmV0dXJuZWRcblx0XHRcdFx0bGV0IHBhcmVudEl0ZW0gPSB0aGlzLl9maWxlTWFuYWdlci5yZW1vdmVGaWxlKHBhdGgpO1xuXG5cdFx0XHRcdC8vIENvbGxhcHNlIHBhcmVudCBpZiB0aGUgbGFzdCBvZiBpdHMgY2hpbGRyZW4gd2FzIGRlbGV0ZWRcblx0XHRcdFx0aWYgKHBhcmVudEl0ZW0gJiYgIXBhcmVudEl0ZW0uaGFzQ2hpbGRyZW4pXG5cdFx0XHRcdFx0dGhpcy5fZmlsZXNMaXN0LmNvbGxhcHNlKCQoYCNleG0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHskLmVzY2FwZVNlbGVjdG9yKHBhcmVudEl0ZW0uaWQpfVwiXWApLmNsb3Nlc3QoJ3RyJykpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocmVxdWVzdGVyID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oYCR7dGhpcy5fc2VsZWN0ZWRJdGVtLmlzRGlyID8gJ0ZvbGRlcicgOiAnRmlsZSd9IGRlbGV0ZWRgLCBgJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaXNEaXIgPyAnRm9sZGVyJyA6ICdGaWxlJ30gJyR7dGhpcy5fc2VsZWN0ZWRJdGVtLm5hbWV9JyBkZWxldGVkIHN1Y2Nlc3NmdWxseWApO1xuXG5cdFx0XHRcdHRoaXMuX3NlbGVjdGVkSXRlbSA9IG51bGw7XG5cblx0XHRcdFx0dGhpcy5fZW5hYmxlSW50ZXJmYWNlKHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKGBGaWxlIGRlbGV0ZWRgLCBgQWRtaW5pc3RyYXRvciAke3JlcXVlc3Rlcn0gZGVsZXRlZCB0aGUgZm9sbG93aW5nIGZpbGUke2ZpbGVzQXJyLmxlbmd0aCA+IDEgPyAncycgOiAnJ306IDxzdHJvbmc+JHtmaWxlc0Fyci5qb2luKCc8YnI+ICcpfTwvc3Ryb25nPmApO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZXNldCBzZWxlY3Rpb25cblx0XHRcdHRoaXMuX29uRmlsZVNlbGVjdGVkQ2hhbmdlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gZWxzZSBpZiAoKVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVUkgRVZFTlQgTElTVEVORVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uUmV0cnlDbGljaygpXG5cdHtcblx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdleG0taW5pdCcpO1xuXG5cdFx0Ly8gUmUtc2VuZCBpbml0aWFsaXphdGlvbiByZXF1ZXN0XG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9JTklUKTtcblx0fVxuXG5cdF9vblJlZnJlc2hDbGljaygpXG5cdHtcblx0XHR0aGlzLl9maWxlc0xpc3QuY2xlYXJTZWxlY3Rpb24oKTtcblx0XHR0aGlzLl9yZWZyZXNoRGF0YUxpc3QoKTtcblx0fVxuXG5cdF9vbkZpbGVTZWxlY3RlZENoYW5nZSgpXG5cdHtcblx0XHQvLyBIaWRlIGNvbnRyb2wgYnV0dG9ucyBvbiBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbVxuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0pXG5cdFx0XHQkKGAjZXhtLWZpbGVMaXN0IC5maWxlLWNvbnRyb2xzW2RhdGEtaXRlbS1pZD1cIiR7JC5lc2NhcGVTZWxlY3Rvcih0aGlzLl9zZWxlY3RlZEl0ZW0uaWQpfVwiXWApLmhpZGUoKTtcblxuXHRcdC8vIEdldCBzZWxlY3RlZCBpdGVtXG5cdFx0bGV0IHNlbGVjdGVkUm93cyA9IHRoaXMuX2ZpbGVzTGlzdC5zZWxlY3QoKTtcblxuXHRcdGlmIChzZWxlY3RlZFJvd3MubGVuZ3RoID4gMClcblx0XHR7XG5cdFx0XHQvLyBTYXZlIHJlZi4gdG8gc2VsZWN0ZWQgaXRlbVxuXHRcdFx0dGhpcy5fc2VsZWN0ZWRJdGVtID0gdGhpcy5fZmlsZXNMaXN0LmRhdGFJdGVtKHNlbGVjdGVkUm93c1swXSk7XG5cblx0XHRcdC8vIFNob3cgY29udHJvbCBidXR0b25zIG9uIG5ldyBzZWxlY3RlZCBpdGVtXG5cdFx0XHQkKGAjZXhtLWZpbGVMaXN0IC5maWxlLWNvbnRyb2xzW2RhdGEtaXRlbS1pZD1cIiR7JC5lc2NhcGVTZWxlY3Rvcih0aGlzLl9zZWxlY3RlZEl0ZW0uaWQpfVwiXWApLnNob3coKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fc2VsZWN0ZWRJdGVtID0gbnVsbDtcblx0fVxuXG5cdF9zaG93QWRkRm9sZGVyTW9kYWxDbGljaygpXG5cdHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtICYmIHRoaXMuX3NlbGVjdGVkSXRlbS5pc0Rpcilcblx0XHR7XG5cdFx0XHR0aGlzLl9hZGRGb2xkZXJNb2RhbC5tb2RhbCgnc2hvdycpO1xuXHRcdFx0JCgnI2V4bS1mb2xkZXJOYW1lSW4nKS5mb2N1cygpO1xuXHRcdH1cblx0fVxuXG5cdF9vbkFkZEZvbGRlckNsaWNrKClcblx0e1xuXHRcdC8vIFRoZSBwYXJlbnQgZm9sZGVyIGNvdWxkIGhhdmUgYmVlbiBkZWxldGVkIHdoaWxlIHVzZXIgaXMgc3RpbGwgdHlwaW5nIHRoZSBuYW1lIG9mIHRoZSBuZXcgY2hpbGQgZm9sZGVyXG5cdFx0aWYgKCF0aGlzLl9zZWxlY3RlZEl0ZW0pXG5cdFx0e1xuXHRcdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoJ2hpZGUnKTtcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydCgnVW5hYmxlIHRvIGNyZWF0ZSBmb2xkZXI7IHRoZSBwYXJlbnQgZm9sZGVyIGRvZXNuXFwndCBleGlzdC4nKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fYWRkRm9sZGVyVmFsaWRhdG9yLnZhbGlkYXRlKCkpXG5cdFx0e1xuXHRcdFx0Ly8gRGlzYWJsZSBtb2RhbCBpbnRlcmZhY2Vcblx0XHRcdHRoaXMuX2VuYWJsZUFkZEZvbGRlck1vZGFsKGZhbHNlKTtcblxuXHRcdFx0bGV0IGRhdGEgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRkYXRhLnB1dFV0ZlN0cmluZygnZm9sZGVyJywgdGhpcy5fc2VsZWN0ZWRJdGVtLmlkICsgdGhpcy5fZmlsZVNlcGFyYXRvciArICQoJyNleG0tZm9sZGVyTmFtZUluJykudmFsKCkpO1xuXG5cdFx0XHQvLyBTZW5kIHJlcXVlc3QgdG8gc2VydmVyXG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0NSRUFURV9GT0xERVIsIGRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdF9vbkFkZEZvbGRlck1vZGFsSGlkZGVuKClcblx0e1xuXHRcdCQoJyNleG0tZm9sZGVyTmFtZUluJykudmFsKCcnKTtcblx0XHR0aGlzLl9yZXNldEFkZEZvbGRlclZhbGlkYXRpb24oKTtcblxuXHRcdC8vIEVuYWJsZSBtb2RhbCBpbnRlcmZhY2Vcblx0XHR0aGlzLl9lbmFibGVBZGRGb2xkZXJNb2RhbCh0cnVlKTtcblx0fVxuXG5cdF9zaG93VXBsb2FkRmlsZXNNb2RhbENsaWNrKClcblx0e1xuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0pXG5cdFx0XHR0aGlzLl91cGxvYWRGaWxlc01vZGFsLm1vZGFsKCdzaG93Jyk7XG5cdH1cblxuXHRfb25DbGVhckZpbGVzQ2xpY2soKVxuXHR7XG5cdFx0dGhpcy5fdXBsb2FkZXIuY2xlYXJBbGxGaWxlcygpO1xuXHR9XG5cblx0X29uVXBsb2FkU3RhcnQoZSlcblx0e1xuXHRcdC8vIERpc2FibGUgY2xlYXIgYnV0dG9uXG5cdFx0JCgnI2V4bS1jbGVhckZpbGVzQnQnKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXG5cdFx0Ly8gU2V0IGRlc3RpbmF0aW9uIHVybFxuXHRcdGNvbnN0IHVybCA9IHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5wcm90b2NvbCArICc6Ly8nICsgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLmhvc3QgKyAnOicgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcucG9ydCArICcvQmx1ZUJveC9TRlMyWEZpbGVVcGxvYWQ/c2Vzc0hhc2hJZD0nICsgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLnNlc3Npb25Ub2tlbjtcblx0XHRcblx0XHRlLnNlbmRlci5vcHRpb25zLmFzeW5jLnNhdmVVcmwgPSB1cmw7XG5cblx0XHQvLyBTZXQgcGF5bG9hZFxuXHRcdGNvbnN0IHBhcmFtcyA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdHBhcmFtcy5hcHBlbmQoJ19fbW9kdWxlJywgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLm1vZHVsZUlkKTtcblx0XHRwYXJhbXMuYXBwZW5kKCdfX3RhcmdldCcsIHRoaXMuX3NlbGVjdGVkSXRlbS5pZCk7XG5cblx0XHRmb3IgKGxldCBmID0gMDsgZiA8IGUuZmlsZXMubGVuZ3RoOyBmKyspXG5cdFx0XHRwYXJhbXMuYXBwZW5kKCdmaWxlc1tdJywgZS5maWxlc1tmXS5yYXdGaWxlKTtcblxuXHRcdGUuZm9ybURhdGEgPSBwYXJhbXM7XG5cdH1cblxuXHRfb25VcGxvYWRFbmQoZSlcblx0e1xuXHRcdC8vIEVuYWJsZSBjbGVhciBidXR0b25cblx0XHQkKCcjZXhtLWNsZWFyRmlsZXNCdCcpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHR9XG5cblx0X29uRmlsZXNVcGxvYWRFbmQocmVzcG9uc2UpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvOiB3ZSBoYXZlIHRvIHdhaXQgdGhlIHVwbG9hZCBwcm9jZXNzIGNvbXBsZXRpb24gdG8gYmUgc2lnbmFsZWQgYnkgdGhlIHNlcnZlciB0aHJvdWdoIHRoZSBkZWRpY2F0ZWQgRXh0ZW5zaW9uIHJlc3BvbnNlXG5cblx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHQvLyBUT0RPIFNob3VsZCB3ZSBoYW5kbGUgdGhpcyByZXNwb25zZSBpbiBzb21lIHdheT8gRm9yIHNvbWUgdW5rbm93biByZWFzb24gd2UgYWx3YXlzIGdldCBvaz1mYWxzZSBhbmQgc3RhdHVzPTBcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5vaylcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG5cdH1cblxuXHRfb25SZW1vdmVGaWxlQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dDb25maXJtV2FybmluZyhgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgc2VsZWN0ZWQgJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaXNEaXIgPyAnZm9sZGVyJyA6ICdmaWxlJ30/PGJyPjxicj5QYXRoOiA8c3Ryb25nPiR7dGhpcy5fc2VsZWN0ZWRJdGVtLmlkfTwvc3Ryb25nPmAsICQucHJveHkodGhpcy5fb25SZW1vdmVGaWxlQ29uZmlybSwgdGhpcykpO1xuXHR9XG5cblx0X29uUmVtb3ZlRmlsZUNvbmZpcm0oKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBpbnRlcmZhY2Vcblx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0Ly8gUmVxdWVzdCBFeHRlbnNpb24gZmlsZXMgcmVtb3ZhbFxuXHRcdC8vIE5PVEU6IGZvciBjb21wYXRpYmlsaXR5IHdpdGggb2xkZXIgQWRtaW5Ub29sLCB0aGUgZmlsZSB0byBiZSBkZWxldGVkIGlzIHNlbnRcblx0XHQvLyBpbiBhbiBhcnJheSBvZiBzdHJpbmdzLCBldmVuIGlmIHdlIGNhbid0IGRlbGV0ZSBtb3JlIHRoYW4gMSBmaWxlIGF0IG9uY2UgaW4gdGhpcyBBZG1pblRvb2xcblxuXHRcdGxldCBmaWxlcyA9IG5ldyBTRlMyWC5TRlNBcnJheSgpO1xuXHRcdGZpbGVzLmFkZFV0ZlN0cmluZyh0aGlzLl9zZWxlY3RlZEl0ZW0uaWQpO1xuXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0U0ZTQXJyYXkoJ2ZpbGVzJywgZmlsZXMpO1xuXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ERUxFVEVfRklMRVMsIHBhcmFtcyk7XG5cdH1cblxuXHRfb25SZWxvYWRFeHRDbGljaygpXG5cdHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtKVxuXHRcdHtcblx0XHRcdGxldCBwYXRoQXJyID0gdGhpcy5fc2VsZWN0ZWRJdGVtLmlkLnNwbGl0KHRoaXMuX2ZpbGVTZXBhcmF0b3IpO1xuXG5cdFx0XHRpZiAocGF0aEFyci5sZW5ndGggPiAxKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBSZXF1ZXN0IEV4dGVuc2lvbiByZWxvYWRcblx0XHRcdFx0Ly8gTk9URTogZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBBZG1pblRvb2wsIHRoZSBFeHRlbnNpb24gdG8gYmUgcmVsb2FkZWQgaXMgc2VudFxuXHRcdFx0XHQvLyBpbiBhbiBhcnJheSBvZiBzdHJpbmdzLCBldmVuIGlmIHdlIGNhbid0IHJlbG9hZCBtb3JlIHRoYW4gMSBFeHRlbnNpb24gYXQgb25jZSBpbiB0aGlzIEFkbWluVG9vbFxuXG5cdFx0XHRcdGxldCBleHRUb1JlbG9hZCA9IFtdO1xuXHRcdFx0XHRleHRUb1JlbG9hZC5wdXNoKHBhdGhBcnJbMV0pO1xuXG5cdFx0XHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRcdHBhcmFtcy5wdXRVdGZTdHJpbmdBcnJheSgnZXh0ZW5zaW9ucycsIGV4dFRvUmVsb2FkKTtcblxuXHRcdFx0XHQvLyBTZW5kIHJlcXVlc3QgdG8gc2VydmVyXG5cdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfUkVMT0FEX0VYVEVOU0lPTlMsIHBhcmFtcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X3N3aXRjaFZpZXcodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4bS12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X2VuYWJsZUludGVyZmFjZShlbmFibGUpXG5cdHtcblx0XHQkKCcjZXhtLWZpbGVMaXN0JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblx0XHQkKCcjZXhtLXJlZnJlc2hCdCcpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cdH1cblxuXHRfcmVmcmVzaERhdGFMaXN0KClcblx0e1xuXHRcdC8vIERpc2FibGUgaW50ZXJmYWNlXG5cdFx0dGhpcy5fZW5hYmxlSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdC8vIFNlbmQgcmVxdWVzdCB0byBzZXJ2ZXJcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9FWFRFTlNJT05TKVxuXHR9XG5cblx0X3Jlc2V0QWRkRm9sZGVyVmFsaWRhdGlvbigpXG5cdHtcblx0XHR0aGlzLl9hZGRGb2xkZXJWYWxpZGF0b3IuaGlkZU1lc3NhZ2VzKCk7XG5cblx0XHQvLyBUaGUgbWV0aG9kIGFib3ZlIGRvZXNuJ3QgcmVtb3ZlIHRoZSBrLWludmFsaWQgY2xhc3NlcyBhbmQgYXJpYS1pbnZhbGlkPVwidHJ1ZVwiIGF0dHJpYnV0ZXMgZnJvbSBpbnB1dHNcblx0XHQvLyBMZXQncyBkbyBpdCBtYW51YWxseVxuXHRcdCQoJyNleG0tYWRkRm9sZGVyRm9ybSAuay1pbnZhbGlkJykucmVtb3ZlQ2xhc3MoJ2staW52YWxpZCcpO1xuXHRcdCQoJyNleG0tYWRkRm9sZGVyRm9ybSBbYXJpYS1pbnZhbGlkPVwidHJ1ZVwiXScpLnJlbW92ZUF0dHIoJ2FyaWEtaW52YWxpZCcpO1xuXHR9XG5cblx0X2VuYWJsZUFkZEZvbGRlck1vZGFsKGVuYWJsZSlcblx0e1xuXHRcdC8vIERpc2FibGUgbW9kYWwgY2xvc2UgYnV0dG9uc1xuXHRcdCQoJyNleG0tYWRkRm9sZGVyTW9kYWwgYnV0dG9uW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblxuXHRcdC8vIERpc2FibGUgYWRkIGJ1dHRvblxuXHRcdCQoJyNleG0tYWRkRm9sZGVyQnQnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXG5cdFx0Ly8gRGlzYWJsZSBmaWVsZHNldFxuXHRcdCQoJyNleG0tYWRkRm9sZGVyRm9ybScpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==