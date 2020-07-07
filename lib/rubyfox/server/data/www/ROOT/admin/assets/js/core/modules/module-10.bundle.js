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

/***/ "./src/modules/servlet-manager.js":
/*!****************************************!*\
  !*** ./src/modules/servlet-manager.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServletManager; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _managers_file_datasource_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../managers/file-datasource-manager */ "./src/managers/file-datasource-manager.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");




class ServletManager extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('servletMan');

		// Outgoing requests
		this.REQ_INIT = 'init';
		this.REQ_GET_SERVLETS = 'getServlets';
		this.REQ_CREATE_FOLDER = 'createFolder';
		this.REQ_DELETE_FILES = 'deleteSrvltFiles';

		// Incoming responses
		this.RESP_LOCKED = 'lock';
		this.RESP_INIT = 'init';
		this.RESP_SERVLETS = 'servlets';
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
		$('#svm-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Add listeners to buttons
		$('#svm-retryBt').on('click', $.proxy(this._onRetryClick, this));
		$('#svm-refreshBt').on('click', $.proxy(this._onRefreshClick, this));

		// Initialize files list
		this._filesList = $('#svm-fileList').kendoTreeList({
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
								<button type="button" class="k-button k-primary my-1 upload-files-bt"><i class="fas fa-file-upload"></i></button>
							# } #

							# if (level > 0 && !isProtected) { #
								<button type="button" class="k-button k-primary my-1 remove-file-bt"><i class="fas fa-minus-circle"></i></button>
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
		$('#svm-fileList').on('click', '.create-folder-bt', $.proxy(this._showAddFolderModalClick, this));
		$('#svm-fileList').on('click', '.upload-files-bt', $.proxy(this._showUploadFilesModalClick, this));
		$('#svm-fileList').on('click', '.remove-file-bt', $.proxy(this._onRemoveFileClick, this));

		//-------------------------------------------

		// Initialize "add folder" modal
		this._addFolderModal = $('#svm-addFolderModal');
		this._addFolderModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Add listener to modal hide event
		this._addFolderModal.on('hidden.bs.modal', $.proxy(this._onAddFolderModalHidden, this));

		// Add listener to Add button click
		$('#svm-addFolderBt').on('click', $.proxy(this._onAddFolderClick, this));

		// Initialize kendo validation on folder name form
		this._addFolderValidator = $('#svm-addFolderForm').kendoValidator({}).data('kendoValidator');

		//-------------------------------------------

		// Initialize "upload files" modal
		this._uploadFilesModal = $('#svm-uploadModal');
		this._uploadFilesModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Initialize kendo uploader
		this._uploader = $('#svm-uploader').kendoUpload({
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
		$('#svm-clearFilesBt').on('click', $.proxy(this._onClearFilesClick, this));

		//-------------------------------------------

		// Send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#svm-retryBt').off('click');
		$('#svm-refreshBt').off('click');

		$('#svm-fileList').off('click');

		this._addFolderModal.off('hidden.bs.modal');
		this._addFolderModal.modal('dispose');
		$('#svm-addFolderBt').off('click');

		this._uploadFilesModal.modal('dispose');
		$('#svm-clearFilesBt').off('click');
	}

	onExtensionCommand(command, data)
	{
		// Module can be enabled (no locking file exists)
		if (command == this.RESP_INIT)
		{
			// Retrieve file separator
			this._fileSeparator = data.getUtfString('sep');

			// Create file data source manager
			this._fileManager = new _managers_file_datasource_manager__WEBPACK_IMPORTED_MODULE_1__["FileDataSourceManager"](null, [], this._fileSeparator);

			// Retrieve HTTP port to be used for files uploading
			const uploadHttpPort = data.getInt('httpPort');

			// Retrieve module id sent by the server (required because multiple modules use file uploading service)
			const uploadModuleId = data.getUtfString('modId');

			// Set file uploading target configuration
			this._uploadTargetConfig = {
				sessionToken: this.smartFox.sessionToken,
				host: this.smartFox.config.host,
				httpPort: uploadHttpPort,
				moduleId: uploadModuleId,
			};

			// Request Servlet files data to server instance
			this._refreshDataList();
		}

		/*
		 * This response is returned if the file UploadsLock.txt exists in the /config folder of the server.
		 * This is an additional security measure to avoid unwanted files to be uploaded by malicius users accessing the server
		 * with the default credentials, in case they have not been changed by the administrator after the installation.
		 * The file must be removed manually before accessing the Servlet Manager module for the first time
		 */
		else if (command == this.RESP_LOCKED)
		{
			// Show warning
			this._switchView('svm-locked');
		}

		// Servlet folders and files
		else if (command == this.RESP_SERVLETS)
		{
			// Retrieve Servlets file list
			let servletsObj = data.getSFSObject('servlets');

			// Initialize manager
			this._fileManager.init();

			// Add list to manager
			this._fileManager.addFile(servletsObj);

			// Set TreeList data source
			this._filesList.setDataSource(this._fileManager.dataSource);

			// Expand first level
			this._filesList.expand($('#svm-fileList tbody>tr:eq(0)'));

			// Enable interface
			this._enableInterface(true);

			// Show module's main view
			this._switchView('svm-main');
		}

		// An error occurred while managing servlet files
		else if (command == this.RESP_ERROR)
		{
			// Hide add folder modal
			this._addFolderModal.modal('hide');

			// Re-enable interface
			this._enableInterface(true);

			// Show an alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'));
		}

		// Servlet folder or file added
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
					this._filesList.expand($(`#svm-fileList .file-controls[data-item-id="${parentPath}"]`).closest('tr'));

					if (!isUpload)
					{
						// Hide modal
						this._addFolderModal.modal('hide');

						// Select upload file
						this._filesList.select($(`#svm-fileList .file-controls[data-item-id="${filePath}"]`).closest('tr'));
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

		// Servlet files deleted
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
					this._filesList.collapse($(`#svm-fileList .file-controls[data-item-id="${parentItem.id}"]`).closest('tr'));
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
		this._switchView('svm-init');

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
			$(`#svm-fileList .file-controls[data-item-id="${this._selectedItem.id}"]`).hide();

		// Get selected item
		let selectedRows = this._filesList.select();

		if (selectedRows.length > 0)
		{
			// Save ref. to selected item
			this._selectedItem = this._filesList.dataItem(selectedRows[0]);

			// Show control buttons on new selected item
			$(`#svm-fileList .file-controls[data-item-id="${this._selectedItem.id}"]`).show();
		}
		else
			this._selectedItem = null;
	}

	_showAddFolderModalClick()
	{
		if (this._selectedItem && this._selectedItem.isDir)
		{
			this._addFolderModal.modal('show');
			$('#svm-folderNameIn').focus();
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
			data.putUtfString('folder', this._selectedItem.id + this._fileSeparator + $('#svm-folderNameIn').val());

			// Send request to server
			this.sendExtensionRequest(this.REQ_CREATE_FOLDER, data);
		}
	}

	_onAddFolderModalHidden()
	{
		$('#svm-folderNameIn').val('');
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
		$('#svm-clearFilesBt').attr('disabled', true);

		// Set destination url
		const url = 'http://' + this._uploadTargetConfig.host + ':' + this._uploadTargetConfig.httpPort + '/BlueBox/SFS2XFileUpload?sessHashId=' + this._uploadTargetConfig.sessionToken;

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
		$('#svm-clearFilesBt').attr('disabled', false);
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

		// Request Servlet files removal
		// NOTE: for compatibility with older AdminTool, the file to be deleted is sent
		// in an array of strings, even if we can't delete more than 1 file at once in this AdminTool

		let files = new SFS2X.SFSArray();
		files.addUtfString(this._selectedItem.id);

		let params = new SFS2X.SFSObject();
		params.putSFSArray('files', files);

		this.sendExtensionRequest(this.REQ_DELETE_FILES, params);
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_switchView(viewId)
	{
		document.getElementById('svm-viewstack').selectedElement = document.getElementById(viewId);
	}

	_enableInterface(enable)
	{
		$('#svm-fileList').attr('disabled', !enable);
		$('#svm-refreshBt').attr('disabled', !enable);
	}

	_refreshDataList()
	{
		// Disable interface
		this._enableInterface(false);

		// Send request to server
		this.sendExtensionRequest(this.REQ_GET_SERVLETS)
	}

	_resetAddFolderValidation()
	{
		this._addFolderValidator.hideMessages();

		// The method above doesn't remove the k-invalid classes and aria-invalid="true" attributes from inputs
		// Let's do it manually
		$('#svm-addFolderForm .k-invalid').removeClass('k-invalid');
		$('#svm-addFolderForm [aria-invalid="true"]').removeAttr('aria-invalid');
	}

	_enableAddFolderModal(enable)
	{
		// Disable modal close buttons
		$('#svm-addFolderModal button[data-dismiss="modal"]').attr('disabled', !enable);

		// Disable add button
		$('#svm-addFolderBt').attr('disabled', !enable);

		// Disable fieldset
		$('#svm-addFolderForm').attr('disabled', !enable);
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTAuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbWFuYWdlcnMvZmlsZS1kYXRhc291cmNlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9zZXJ2bGV0LW1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEZpbGVEYXRhU291cmNlTWFuYWdlclxue1xuXHRjb25zdHJ1Y3RvcihsaWJGb2xkZXIsIHByb3RlY3RlZEZvbGRlcnMsIGZpbGVTZXBhcmF0b3IpXG5cdHtcblx0XHR0aGlzLl9wcm90ZWN0ZWRGb2xkZXJzID0gcHJvdGVjdGVkRm9sZGVyczsgLy8gRm9sZGVycyB3aGljaCBjYW4ndCBiZSBkZWxldGVkIChidXQgdGhlaXIgY29udGVudCBjYW4pXG5cdFx0dGhpcy5fbGliRm9sZGVyID0gbGliRm9sZGVyO1xuXHRcdHRoaXMuX2ZpbGVTZXBhcmF0b3IgPSBmaWxlU2VwYXJhdG9yO1xuXHR9XG5cblx0Z2V0IGRhdGFTb3VyY2UoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7XG5cdH1cblxuXHRpbml0KClcblx0e1xuXHRcdHRoaXMuX2RhdGFTb3VyY2UgPSBuZXcga2VuZG8uZGF0YS5UcmVlTGlzdERhdGFTb3VyY2Uoe1xuXHRcdFx0ZGF0YTogW10sXG5cdFx0XHRzY2hlbWE6IHtcblx0XHRcdFx0bW9kZWw6IHtcblx0XHRcdFx0XHRpZDogJ2lkJyxcblx0XHRcdFx0XHRwYXJlbnRJZDogJ3BhcmVudElkJyxcblx0XHRcdFx0XHRleHBhbmRlZDogZmFsc2Vcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHNvcnQ6IHsgZmllbGQ6ICduYW1lJywgZGlyOiAnYXNjJyB9XG5cdFx0fSk7XG5cdH1cblxuXHRhZGRGaWxlKGZpbGVPYmosIHBhcmVudExldmVsID0gbnVsbClcblx0e1xuXHRcdGxldCBmaWxlID0ge307XG5cblx0XHRmaWxlLm5hbWUgPSBmaWxlT2JqLmdldFV0ZlN0cmluZygnbmFtZScpO1xuXHRcdGZpbGUuaXNEaXIgPSBmaWxlT2JqLmdldEJvb2woJ2lzRGlyJyk7XG5cdFx0ZmlsZS5sYXN0TW9kID0gZmlsZU9iai5nZXRMb25nKCdsYXN0TW9kJyk7XG5cdFx0ZmlsZS5pc0xpYiA9IChmaWxlLmlzRGlyICYmIGZpbGUubmFtZSA9PSB0aGlzLl9saWJGb2xkZXIpO1xuXHRcdGZpbGUuaXNQcm90ZWN0ZWQgPSAoZmlsZS5pc0RpciAmJiB0aGlzLl9wcm90ZWN0ZWRGb2xkZXJzLmluZGV4T2YoZmlsZS5uYW1lKSA+IC0xKTtcblx0XHRmaWxlLnNpemUgPSAwO1xuXG5cdFx0aWYgKHBhcmVudExldmVsID09IG51bGwpXG5cdFx0XHRmaWxlLmxldmVsID0gMDtcblx0XHRlbHNlXG5cdFx0XHRmaWxlLmxldmVsID0gcGFyZW50TGV2ZWwgKyAxO1xuXG5cdFx0aWYgKGZpbGVPYmouY29udGFpbnNLZXkoJ3BhcmVudCcpKVxuXHRcdHtcblx0XHRcdGZpbGUucGFyZW50SWQgPSBmaWxlT2JqLmdldFV0ZlN0cmluZygncGFyZW50Jyk7XG5cdFx0XHRmaWxlLmlkID0gZmlsZS5wYXJlbnRJZCArIHRoaXMuX2ZpbGVTZXBhcmF0b3IgKyBmaWxlLm5hbWU7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRmaWxlLnBhcmVudElkID0gbnVsbDtcblx0XHRcdGZpbGUuaWQgPSBmaWxlLm5hbWU7XG5cdFx0fVxuXG5cdFx0Ly8gQWRkIGNoaWxkIGZpbGVzXG5cdFx0aWYgKGZpbGUuaXNEaXIpXG5cdFx0e1xuXHRcdFx0bGV0IGZpbGVzQXJyID0gZmlsZU9iai5nZXRTRlNBcnJheSgnZmlsZXMnKTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlc0Fyci5zaXplKCk7IGkrKylcblx0XHRcdFx0ZmlsZS5zaXplICs9IHRoaXMuYWRkRmlsZShmaWxlc0Fyci5nZXRTRlNPYmplY3QoaSksIGZpbGUubGV2ZWwpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHRmaWxlLnNpemUgPSBmaWxlT2JqLmdldExvbmcoJ3NpemUnKTtcblxuXHRcdC8vIEFkZCBmaWxlIHRvIGRhdGEgc291cmNlXG5cdFx0dGhpcy5fZGF0YVNvdXJjZS5hZGQoZmlsZSk7XG5cblx0XHQvLyBSZXR1cm4gZmlsZSBzaXplXG5cdFx0cmV0dXJuIGZpbGUuc2l6ZTtcblx0fVxuXG5cdHJlbW92ZUZpbGUoaWQpXG5cdHtcblx0XHRsZXQgZmlsZUl0ZW0gPSB0aGlzLl9kYXRhU291cmNlLmdldChpZCk7XG5cblx0XHRpZiAoZmlsZUl0ZW0pXG5cdFx0e1xuXHRcdFx0aWYgKGZpbGVJdGVtLnBhcmVudElkKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBTdWJ0cmFjdCBvbGQgc2l6ZSBmcm9tIHBhcmVudCBzaXplXG5cdFx0XHRcdGxldCBwYXJlbnRJdGVtID0gdGhpcy5fZGF0YVNvdXJjZS5nZXQoZmlsZUl0ZW0ucGFyZW50SWQpO1xuXHRcdFx0XHR0aGlzLl91cGRhdGVQYXJlbnRTaXplKHBhcmVudEl0ZW0sIC1maWxlSXRlbS5zaXplKTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5fZGF0YVNvdXJjZS5yZW1vdmUoZmlsZUl0ZW0pO1xuXG5cdFx0XHQvLyBSZXR1cm4gcGFyZW50IGl0ZW1cblx0XHRcdGlmIChmaWxlSXRlbS5wYXJlbnRJZClcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2RhdGFTb3VyY2UuZ2V0KGZpbGVJdGVtLnBhcmVudElkKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWxlQnlJZChpZClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhU291cmNlLmdldChpZCk7XG5cdH1cblxuXHRhZGRGaWxlVG9QYXJlbnQoZmlsZU9iaiwgcGFyZW50SWQpXG5cdHtcblx0XHRsZXQgcGFyZW50SXRlbSA9IHRoaXMuX2RhdGFTb3VyY2UuZ2V0KHBhcmVudElkKTtcblxuXHRcdGlmIChwYXJlbnRJdGVtICE9IG51bGwgJiYgcGFyZW50SXRlbS5pc0Rpcilcblx0XHR7XG5cdFx0XHRjb25zdCBmaWxlSWQgPSBwYXJlbnRJZCArIHRoaXMuX2ZpbGVTZXBhcmF0b3IgKyBmaWxlT2JqLmdldFV0ZlN0cmluZygnbmFtZScpO1xuXHRcdFx0bGV0IGZpbGVJdGVtID0gdGhpcy5fZGF0YVNvdXJjZS5nZXQoZmlsZUlkKTtcblxuXHRcdFx0aWYgKGZpbGVJdGVtICE9IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFN1YnRyYWN0IG9sZCBzaXplIGZyb20gcGFyZW50IHNpemVcblx0XHRcdFx0dGhpcy5fdXBkYXRlUGFyZW50U2l6ZShwYXJlbnRJdGVtLCAtZmlsZUl0ZW0uc2l6ZSk7XG5cblx0XHRcdFx0Ly8gVXBkYXRlIGV4aXN0aW5nIGl0ZW1cblx0XHRcdFx0ZmlsZUl0ZW0ubmFtZSA9IGZpbGVPYmouZ2V0VXRmU3RyaW5nKCduYW1lJyk7XG5cdFx0XHRcdGZpbGVJdGVtLmxhc3RNb2QgPSBmaWxlT2JqLmdldExvbmcoJ2xhc3RNb2QnKTtcblx0XHRcdFx0ZmlsZUl0ZW0uc2l6ZSA9IGZpbGVPYmouZ2V0TG9uZygnc2l6ZScpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBZGQgbmV3IGl0ZW1cblx0XHRcdFx0dGhpcy5hZGRGaWxlKGZpbGVPYmosIHBhcmVudEl0ZW0ubGV2ZWwpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBVcGRhdGUgcGFyZW50IGl0ZW0gc2l6ZVxuXHRcdFx0dGhpcy5fdXBkYXRlUGFyZW50U2l6ZShwYXJlbnRJdGVtLCBmaWxlT2JqLmdldExvbmcoJ3NpemUnKSk7XG5cblx0XHRcdHJldHVybiBmaWxlSWQ7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvcihgQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCB3aGlsZSBhZGRpbmcgZmlsZSAnJHtmaWxlT2JqLmdldFV0ZlN0cmluZygnbmFtZScpfScgKHRhcmdldDogJHtwYXJlbnRJZH0pLmApO1xuXHR9XG5cblx0X3VwZGF0ZVBhcmVudFNpemUocGFyZW50SXRlbSwgdmFsdWUpXG5cdHtcblx0XHRwYXJlbnRJdGVtLnNpemUgKz0gdmFsdWU7XG5cblx0XHRpZiAocGFyZW50SXRlbS5wYXJlbnRJZClcblx0XHR7XG5cdFx0XHRsZXQgZ3JhbmRQYXJlbnQgPSB0aGlzLl9kYXRhU291cmNlLmdldChwYXJlbnRJdGVtLnBhcmVudElkKTtcblx0XHRcdHRoaXMuX3VwZGF0ZVBhcmVudFNpemUoZ3JhbmRQYXJlbnQsIHZhbHVlKTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSAnLi9iYXNlLW1vZHVsZSc7XG5pbXBvcnQge0ZpbGVEYXRhU291cmNlTWFuYWdlcn0gZnJvbSAnLi4vbWFuYWdlcnMvZmlsZS1kYXRhc291cmNlLW1hbmFnZXInO1xuaW1wb3J0IHtieXRlc1RvU2l6ZX0gZnJvbSAnLi4vdXRpbHMvdXRpbGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmxldE1hbmFnZXIgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ3NlcnZsZXRNYW4nKTtcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfSU5JVCA9ICdpbml0Jztcblx0XHR0aGlzLlJFUV9HRVRfU0VSVkxFVFMgPSAnZ2V0U2VydmxldHMnO1xuXHRcdHRoaXMuUkVRX0NSRUFURV9GT0xERVIgPSAnY3JlYXRlRm9sZGVyJztcblx0XHR0aGlzLlJFUV9ERUxFVEVfRklMRVMgPSAnZGVsZXRlU3J2bHRGaWxlcyc7XG5cblx0XHQvLyBJbmNvbWluZyByZXNwb25zZXNcblx0XHR0aGlzLlJFU1BfTE9DS0VEID0gJ2xvY2snO1xuXHRcdHRoaXMuUkVTUF9JTklUID0gJ2luaXQnO1xuXHRcdHRoaXMuUkVTUF9TRVJWTEVUUyA9ICdzZXJ2bGV0cyc7XG5cdFx0dGhpcy5SRVNQX0ZJTEVfQURERUQgPSAnZmlsZUFkZGVkJztcblx0XHR0aGlzLlJFU1BfRklMRVNfREVMRVRFRCA9ICdmaWxlc0RlbGV0ZWQnO1xuXHRcdHRoaXMuUkVTUF9FUlJPUiA9ICdlcnJvcic7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDT01NT04gTU9EVUxFIElOVEVSRkFDRSBNRVRIT0RTXG5cdC8vIFRoaXMgbWVtYmVycyBhcmUgdXNlZCBieSB0aGUgbWFpbiBjb250cm9sbGVyXG5cdC8vIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIG1vZHVsZSdzIGNvbnRyb2xsZXIuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0aW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcilcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcik7XG5cblx0XHQvLyBJbml0aWFsaXplIHByb2dyZXNzIGJhclxuXHRcdCQoJyNzdm0tcHJvZ3Jlc3NCYXInKS5rZW5kb1Byb2dyZXNzQmFyKHtcblx0XHRcdG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMTAwLFxuXHRcdFx0dmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXJzIHRvIGJ1dHRvbnNcblx0XHQkKCcjc3ZtLXJldHJ5QnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmV0cnlDbGljaywgdGhpcykpO1xuXHRcdCQoJyNzdm0tcmVmcmVzaEJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblJlZnJlc2hDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBmaWxlcyBsaXN0XG5cdFx0dGhpcy5fZmlsZXNMaXN0ID0gJCgnI3N2bS1maWxlTGlzdCcpLmtlbmRvVHJlZUxpc3Qoe1xuICAgICAgICAgICAgZGF0YVNvdXJjZTogW10sXG5cdFx0XHRyZXNpemFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgIHtcblx0XHRcdFx0XHRmaWVsZDogJ25hbWUnLFxuXHRcdFx0XHRcdHRpdGxlOiAnTmFtZScsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGtlbmRvLnRlbXBsYXRlKGBcblx0XHRcdFx0XHRcdDxkaXYgPlxuXHRcdFx0XHRcdFx0XHQjIGlmIChpc0RpcikgeyAjXG5cdFx0XHRcdFx0XHRcdFx0IyBpZiAoZXhwYW5kZWQpIHsgI1xuXHRcdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXMgZmEtZm9sZGVyLW9wZW5cIj48L2k+XG5cdFx0XHRcdFx0XHRcdFx0IyB9IGVsc2UgeyAjXG5cdFx0XHRcdFx0XHRcdFx0XHQ8aSBjbGFzcz1cImZhcyBmYS1mb2xkZXJcIj48L2k+XG5cdFx0XHRcdFx0XHRcdFx0IyB9ICNcblx0XHRcdFx0XHRcdFx0IyB9IGVsc2UgeyAjXG5cdFx0XHRcdFx0XHRcdFx0PGkgY2xhc3M9XCJmYXIgZmEtZmlsZVwiPjwvaT5cblx0XHRcdFx0XHRcdFx0IyB9ICNcblxuXHRcdFx0XHRcdFx0XHQjOiBuYW1lICNcblxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1jb250cm9scyBmbGV4LWdyb3ctMSB0ZXh0LXJpZ2h0XCIgZGF0YS1pdGVtLWlkPVwiIzppZCNcIj5cblx0XHRcdFx0XHRcdFx0IyBpZiAoaXNEaXIpIHsgI1xuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5IG15LTEgY3JlYXRlLWZvbGRlci1idFwiPjxpIGNsYXNzPVwiZmFzIGZhLWZvbGRlci1wbHVzXCI+PC9pPjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5IG15LTEgdXBsb2FkLWZpbGVzLWJ0XCI+PGkgY2xhc3M9XCJmYXMgZmEtZmlsZS11cGxvYWRcIj48L2k+PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdCMgfSAjXG5cblx0XHRcdFx0XHRcdFx0IyBpZiAobGV2ZWwgPiAwICYmICFpc1Byb3RlY3RlZCkgeyAjXG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnkgbXktMSByZW1vdmUtZmlsZS1idFwiPjxpIGNsYXNzPVwiZmFzIGZhLW1pbnVzLWNpcmNsZVwiPjwvaT48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0IyB9ICNcblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdGApLFxuXHRcdFx0XHR9LFxuICAgICAgICAgICAgICAgIHtcblx0XHRcdFx0XHRmaWVsZDogJ3NpemUnLFxuXHRcdFx0XHRcdHRpdGxlOiAnU2l6ZScsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZ1bmN0aW9uKGRhdGFJdGVtKSB7XG5cdFx0XHRcdFx0XHRkYXRhSXRlbS5ieXRlc1RvU2l6ZSA9IGJ5dGVzVG9TaXplOyAvLyBQYXNzIGJ5dGVzVG9TaXplIHV0aWxpdHkgZnVuY3Rpb24gdG8gdGVtcGxhdGVcblx0XHRcdFx0XHRcdHJldHVybiBrZW5kby50ZW1wbGF0ZShgXG5cdFx0XHRcdFx0XHRcdCM6IGJ5dGVzVG9TaXplKHNpemUsIDIsICdLQicpICNcblx0XHRcdFx0XHRcdGApKGRhdGFJdGVtKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHdpZHRoOiAxMjAsXG5cdFx0XHRcdFx0bWluU2NyZWVuV2lkdGg6IDU3NlxuXHRcdFx0XHR9LFxuICAgICAgICAgICAgICAgIHtcblx0XHRcdFx0XHRmaWVsZDogJ2xhc3RNb2QnLFxuXHRcdFx0XHRcdHRpdGxlOiAnTGFzdCBNb2RpZmllZCcsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGtlbmRvLnRlbXBsYXRlKGBcblx0XHRcdFx0XHRcdCM6IGtlbmRvLnRvU3RyaW5nKG5ldyBEYXRlKGxhc3RNb2QpLCAnZGQgTU1NIHl5eXkgSEg6bW06c3MnKSAjXG5cdFx0XHRcdFx0YCksXG5cdFx0XHRcdFx0d2lkdGg6IDIwMCxcblx0XHRcdFx0XHRtaW5TY3JlZW5XaWR0aDogNzY4XG5cdFx0XHRcdH0sXG4gICAgICAgICAgICBdLFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uRmlsZVNlbGVjdGVkQ2hhbmdlLCB0aGlzKVxuICAgICAgICB9KS5kYXRhKCdrZW5kb1RyZWVMaXN0Jyk7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gY2F0Y2ggY29udHJvbCBidXR0b24gY2xpY2tzIG9uIHJvd3Ncblx0XHQkKCcjc3ZtLWZpbGVMaXN0Jykub24oJ2NsaWNrJywgJy5jcmVhdGUtZm9sZGVyLWJ0JywgJC5wcm94eSh0aGlzLl9zaG93QWRkRm9sZGVyTW9kYWxDbGljaywgdGhpcykpO1xuXHRcdCQoJyNzdm0tZmlsZUxpc3QnKS5vbignY2xpY2snLCAnLnVwbG9hZC1maWxlcy1idCcsICQucHJveHkodGhpcy5fc2hvd1VwbG9hZEZpbGVzTW9kYWxDbGljaywgdGhpcykpO1xuXHRcdCQoJyNzdm0tZmlsZUxpc3QnKS5vbignY2xpY2snLCAnLnJlbW92ZS1maWxlLWJ0JywgJC5wcm94eSh0aGlzLl9vblJlbW92ZUZpbGVDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHQvLyBJbml0aWFsaXplIFwiYWRkIGZvbGRlclwiIG1vZGFsXG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwgPSAkKCcjc3ZtLWFkZEZvbGRlck1vZGFsJyk7XG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFx0c2hvdzogZmFsc2Vcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtb2RhbCBoaWRlIGV2ZW50XG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsICQucHJveHkodGhpcy5fb25BZGRGb2xkZXJNb2RhbEhpZGRlbiwgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIEFkZCBidXR0b24gY2xpY2tcblx0XHQkKCcjc3ZtLWFkZEZvbGRlckJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFkZEZvbGRlckNsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHZhbGlkYXRpb24gb24gZm9sZGVyIG5hbWUgZm9ybVxuXHRcdHRoaXMuX2FkZEZvbGRlclZhbGlkYXRvciA9ICQoJyNzdm0tYWRkRm9sZGVyRm9ybScpLmtlbmRvVmFsaWRhdG9yKHt9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0XHQvLyBJbml0aWFsaXplIFwidXBsb2FkIGZpbGVzXCIgbW9kYWxcblx0XHR0aGlzLl91cGxvYWRGaWxlc01vZGFsID0gJCgnI3N2bS11cGxvYWRNb2RhbCcpO1xuXHRcdHRoaXMuX3VwbG9hZEZpbGVzTW9kYWwubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFx0c2hvdzogZmFsc2Vcblx0XHR9KTtcblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdXBsb2FkZXJcblx0XHR0aGlzLl91cGxvYWRlciA9ICQoJyNzdm0tdXBsb2FkZXInKS5rZW5kb1VwbG9hZCh7XG5cdFx0XHRtdWx0aXBsZTogdHJ1ZSxcblx0XHRcdGFzeW5jOiB7XG5cdFx0XHRcdHNhdmVVcmw6ICdodHRwOi8vbG9jYWxob3N0JywgLy8gVGhpcyB3aWxsIGJlIGNoYW5nZWQgbGF0ZXIgaW4gX29uVXBsb2FkU3RhcnQgbWV0aG9kXG5cdFx0XHRcdGF1dG9VcGxvYWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0ZGlyZWN0b3J5RHJvcDogdHJ1ZSxcblx0XHRcdHVwbG9hZDogJC5wcm94eSh0aGlzLl9vblVwbG9hZFN0YXJ0LCB0aGlzKSxcblx0XHRcdGNvbXBsZXRlOiAkLnByb3h5KHRoaXMuX29uVXBsb2FkRW5kLCB0aGlzKSxcblx0XHRcdGxvY2FsaXphdGlvbjoge1xuXHRcdFx0XHRzZWxlY3Q6ICdTZWxlY3QgZmlsZXMuLi4nXG5cdFx0XHR9XG5cdFx0fSkuZGF0YSgna2VuZG9VcGxvYWQnKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBVcGxvYWQgYnV0dG9uIGNsaWNrXG5cdFx0JCgnI3N2bS1jbGVhckZpbGVzQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQ2xlYXJGaWxlc0NsaWNrLCB0aGlzKSk7XG5cblx0XHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdC8vIFNlbmQgaW5pdGlhbGl6YXRpb24gcmVxdWVzdFxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfSU5JVCk7XG5cdH1cblxuXHRkZXN0cm95KClcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuZGVzdHJveSgpO1xuXG5cdFx0JCgnI3N2bS1yZXRyeUJ0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNzdm0tcmVmcmVzaEJ0Jykub2ZmKCdjbGljaycpO1xuXG5cdFx0JCgnI3N2bS1maWxlTGlzdCcpLm9mZignY2xpY2snKTtcblxuXHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm9mZignaGlkZGVuLmJzLm1vZGFsJyk7XG5cdFx0dGhpcy5fYWRkRm9sZGVyTW9kYWwubW9kYWwoJ2Rpc3Bvc2UnKTtcblx0XHQkKCcjc3ZtLWFkZEZvbGRlckJ0Jykub2ZmKCdjbGljaycpO1xuXG5cdFx0dGhpcy5fdXBsb2FkRmlsZXNNb2RhbC5tb2RhbCgnZGlzcG9zZScpO1xuXHRcdCQoJyNzdm0tY2xlYXJGaWxlc0J0Jykub2ZmKCdjbGljaycpO1xuXHR9XG5cblx0b25FeHRlbnNpb25Db21tYW5kKGNvbW1hbmQsIGRhdGEpXG5cdHtcblx0XHQvLyBNb2R1bGUgY2FuIGJlIGVuYWJsZWQgKG5vIGxvY2tpbmcgZmlsZSBleGlzdHMpXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0lOSVQpXG5cdFx0e1xuXHRcdFx0Ly8gUmV0cmlldmUgZmlsZSBzZXBhcmF0b3Jcblx0XHRcdHRoaXMuX2ZpbGVTZXBhcmF0b3IgPSBkYXRhLmdldFV0ZlN0cmluZygnc2VwJyk7XG5cblx0XHRcdC8vIENyZWF0ZSBmaWxlIGRhdGEgc291cmNlIG1hbmFnZXJcblx0XHRcdHRoaXMuX2ZpbGVNYW5hZ2VyID0gbmV3IEZpbGVEYXRhU291cmNlTWFuYWdlcihudWxsLCBbXSwgdGhpcy5fZmlsZVNlcGFyYXRvcik7XG5cblx0XHRcdC8vIFJldHJpZXZlIEhUVFAgcG9ydCB0byBiZSB1c2VkIGZvciBmaWxlcyB1cGxvYWRpbmdcblx0XHRcdGNvbnN0IHVwbG9hZEh0dHBQb3J0ID0gZGF0YS5nZXRJbnQoJ2h0dHBQb3J0Jyk7XG5cblx0XHRcdC8vIFJldHJpZXZlIG1vZHVsZSBpZCBzZW50IGJ5IHRoZSBzZXJ2ZXIgKHJlcXVpcmVkIGJlY2F1c2UgbXVsdGlwbGUgbW9kdWxlcyB1c2UgZmlsZSB1cGxvYWRpbmcgc2VydmljZSlcblx0XHRcdGNvbnN0IHVwbG9hZE1vZHVsZUlkID0gZGF0YS5nZXRVdGZTdHJpbmcoJ21vZElkJyk7XG5cblx0XHRcdC8vIFNldCBmaWxlIHVwbG9hZGluZyB0YXJnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0dGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnID0ge1xuXHRcdFx0XHRzZXNzaW9uVG9rZW46IHRoaXMuc21hcnRGb3guc2Vzc2lvblRva2VuLFxuXHRcdFx0XHRob3N0OiB0aGlzLnNtYXJ0Rm94LmNvbmZpZy5ob3N0LFxuXHRcdFx0XHRodHRwUG9ydDogdXBsb2FkSHR0cFBvcnQsXG5cdFx0XHRcdG1vZHVsZUlkOiB1cGxvYWRNb2R1bGVJZCxcblx0XHRcdH07XG5cblx0XHRcdC8vIFJlcXVlc3QgU2VydmxldCBmaWxlcyBkYXRhIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdFx0dGhpcy5fcmVmcmVzaERhdGFMaXN0KCk7XG5cdFx0fVxuXG5cdFx0Lypcblx0XHQgKiBUaGlzIHJlc3BvbnNlIGlzIHJldHVybmVkIGlmIHRoZSBmaWxlIFVwbG9hZHNMb2NrLnR4dCBleGlzdHMgaW4gdGhlIC9jb25maWcgZm9sZGVyIG9mIHRoZSBzZXJ2ZXIuXG5cdFx0ICogVGhpcyBpcyBhbiBhZGRpdGlvbmFsIHNlY3VyaXR5IG1lYXN1cmUgdG8gYXZvaWQgdW53YW50ZWQgZmlsZXMgdG8gYmUgdXBsb2FkZWQgYnkgbWFsaWNpdXMgdXNlcnMgYWNjZXNzaW5nIHRoZSBzZXJ2ZXJcblx0XHQgKiB3aXRoIHRoZSBkZWZhdWx0IGNyZWRlbnRpYWxzLCBpbiBjYXNlIHRoZXkgaGF2ZSBub3QgYmVlbiBjaGFuZ2VkIGJ5IHRoZSBhZG1pbmlzdHJhdG9yIGFmdGVyIHRoZSBpbnN0YWxsYXRpb24uXG5cdFx0ICogVGhlIGZpbGUgbXVzdCBiZSByZW1vdmVkIG1hbnVhbGx5IGJlZm9yZSBhY2Nlc3NpbmcgdGhlIFNlcnZsZXQgTWFuYWdlciBtb2R1bGUgZm9yIHRoZSBmaXJzdCB0aW1lXG5cdFx0ICovXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfTE9DS0VEKVxuXHRcdHtcblx0XHRcdC8vIFNob3cgd2FybmluZ1xuXHRcdFx0dGhpcy5fc3dpdGNoVmlldygnc3ZtLWxvY2tlZCcpO1xuXHRcdH1cblxuXHRcdC8vIFNlcnZsZXQgZm9sZGVycyBhbmQgZmlsZXNcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9TRVJWTEVUUylcblx0XHR7XG5cdFx0XHQvLyBSZXRyaWV2ZSBTZXJ2bGV0cyBmaWxlIGxpc3Rcblx0XHRcdGxldCBzZXJ2bGV0c09iaiA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCdzZXJ2bGV0cycpO1xuXG5cdFx0XHQvLyBJbml0aWFsaXplIG1hbmFnZXJcblx0XHRcdHRoaXMuX2ZpbGVNYW5hZ2VyLmluaXQoKTtcblxuXHRcdFx0Ly8gQWRkIGxpc3QgdG8gbWFuYWdlclxuXHRcdFx0dGhpcy5fZmlsZU1hbmFnZXIuYWRkRmlsZShzZXJ2bGV0c09iaik7XG5cblx0XHRcdC8vIFNldCBUcmVlTGlzdCBkYXRhIHNvdXJjZVxuXHRcdFx0dGhpcy5fZmlsZXNMaXN0LnNldERhdGFTb3VyY2UodGhpcy5fZmlsZU1hbmFnZXIuZGF0YVNvdXJjZSk7XG5cblx0XHRcdC8vIEV4cGFuZCBmaXJzdCBsZXZlbFxuXHRcdFx0dGhpcy5fZmlsZXNMaXN0LmV4cGFuZCgkKCcjc3ZtLWZpbGVMaXN0IHRib2R5PnRyOmVxKDApJykpO1xuXG5cdFx0XHQvLyBFbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UodHJ1ZSk7XG5cblx0XHRcdC8vIFNob3cgbW9kdWxlJ3MgbWFpbiB2aWV3XG5cdFx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdzdm0tbWFpbicpO1xuXHRcdH1cblxuXHRcdC8vIEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIG1hbmFnaW5nIHNlcnZsZXQgZmlsZXNcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9FUlJPUilcblx0XHR7XG5cdFx0XHQvLyBIaWRlIGFkZCBmb2xkZXIgbW9kYWxcblx0XHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKCdoaWRlJyk7XG5cblx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdHRoaXMuX2VuYWJsZUludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpKTtcblx0XHR9XG5cblx0XHQvLyBTZXJ2bGV0IGZvbGRlciBvciBmaWxlIGFkZGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfRklMRV9BRERFRClcblx0XHR7XG5cdFx0XHQvLyBHZXQgbmFtZSBvZiB0aGUgdXNlciB3aG8gYWRkZWQgdGhlIGZpbGUvZm9sZGVyXG5cdFx0XHRjb25zdCByZXF1ZXN0ZXIgPSBkYXRhLmdldFV0ZlN0cmluZygndXNlcicpO1xuXG5cdFx0XHQvLyBHZXQgdGhlIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGZpbGUvZm9sZGVyIGJlaW5nIGFkZGVkXG5cdFx0XHRjb25zdCBmaWxlT2JqID0gZGF0YS5nZXRTRlNPYmplY3QoJ2ZpbGUnKTtcblxuXHRcdFx0Ly8gR2V0IHRoZSB0YXJnZXQgZm9sZGVyIHdoZXJlIHRoZSBuZXcgZmlsZS9mb2xkZXIgc2hvdWxkIGJlIGFkZGVkXG5cdFx0XHRjb25zdCBwYXJlbnRQYXRoID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3BhcmVudCcpO1xuXG5cdFx0XHQvLyBHZXQgdGhlIGZsYWcgbm90aWZ5aW5nIHRoaXMgd2FzIGEgZmlsZSB1cGxvYWRcblx0XHRcdGNvbnN0IGlzVXBsb2FkID0gZGF0YS5nZXRCb29sKCdpc1VwbG9hZCcpO1xuXG5cdFx0XHR0cnlcblx0XHRcdHtcblx0XHRcdFx0Ly8gQWRkL3VwZGF0ZSBpdGVtIG9uIGRhdGEgc291cmNlXG5cdFx0XHRcdGNvbnN0IGZpbGVQYXRoID0gdGhpcy5fZmlsZU1hbmFnZXIuYWRkRmlsZVRvUGFyZW50KGZpbGVPYmosIHBhcmVudFBhdGgpO1xuXG5cdFx0XHRcdC8vIFJlZnJlc2ggdmlld1xuXHRcdFx0XHR0aGlzLl9maWxlc0xpc3QucmVmcmVzaCgpO1xuXG5cdFx0XHRcdGlmIChyZXF1ZXN0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIEV4cGFuZCBwYXJlbnRcblx0XHRcdFx0XHR0aGlzLl9maWxlc0xpc3QuZXhwYW5kKCQoYCNzdm0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHtwYXJlbnRQYXRofVwiXWApLmNsb3Nlc3QoJ3RyJykpO1xuXG5cdFx0XHRcdFx0aWYgKCFpc1VwbG9hZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBIaWRlIG1vZGFsXG5cdFx0XHRcdFx0XHR0aGlzLl9hZGRGb2xkZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHRcdFx0XHQvLyBTZWxlY3QgdXBsb2FkIGZpbGVcblx0XHRcdFx0XHRcdHRoaXMuX2ZpbGVzTGlzdC5zZWxlY3QoJChgI3N2bS1maWxlTGlzdCAuZmlsZS1jb250cm9sc1tkYXRhLWl0ZW0taWQ9XCIke2ZpbGVQYXRofVwiXWApLmNsb3Nlc3QoJ3RyJykpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFVwZGF0ZSBzZWxlY3Rpb25cblx0XHRcdFx0XHR0aGlzLl9vbkZpbGVTZWxlY3RlZENoYW5nZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdFx0aWYgKCFpc1VwbG9hZClcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oYEZvbGRlciBjcmVhdGVkYCwgYEFkbWluaXN0cmF0b3IgJHtyZXF1ZXN0ZXJ9IGNyZWF0ZWQgZm9sZGVyOiA8c3Ryb25nPiR7ZmlsZVBhdGh9PC9zdHJvbmc+YCk7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbihgRmlsZSB1cGxvYWRlZGAsIGBBZG1pbmlzdHJhdG9yICR7cmVxdWVzdGVyfSB1cGxvYWRlZCBmaWxlOiA8c3Ryb25nPiR7ZmlsZVBhdGh9PC9zdHJvbmc+YCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNhdGNoIChlKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBUaGlzIHNob3VsZCBub3QgaGFwcGVuLi4uIGRhdGEgc291cmNlIGlzIGNvcnJ1cHRlZD9cblx0XHRcdFx0aWYgKHJlcXVlc3RlciA9PSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lKVxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChlLm1lc3NhZ2UsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBFbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gU2VydmxldCBmaWxlcyBkZWxldGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfRklMRVNfREVMRVRFRClcblx0XHR7XG5cdFx0XHQvLyBHZXQgbmFtZSBvZiB0aGUgdXNlciB3aG8gZGVsZXRlZCB0aGUgZmlsZS9zXG5cdFx0XHRjb25zdCByZXF1ZXN0ZXIgPSBkYXRhLmdldFV0ZlN0cmluZygndXNlcicpO1xuXG5cdFx0XHQvLyBHZXQgdGhlIGxpc3Qgb2YgZGVsZXRlZCBmaWxlc1xuXHRcdFx0bGV0IGZpbGVzID0gZGF0YS5nZXRTRlNBcnJheSgnZmlsZXMnKTtcblxuXHRcdFx0bGV0IGZpbGVzQXJyID0gW107XG5cblx0XHRcdC8vIFVwZGF0ZSBkYXRhIHNvdXJjZVxuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBmaWxlcy5zaXplKCk7IGorKylcblx0XHRcdHtcblx0XHRcdFx0bGV0IHBhdGggPSBmaWxlcy5nZXRVdGZTdHJpbmcoaik7XG5cdFx0XHRcdGZpbGVzQXJyLnB1c2gocGF0aCk7XG5cblx0XHRcdFx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRcdFx0XHQvLyBSZW1vdmUgaXRlbSBmcm9tIGRhdGEgc291cmNlOyBwYXJlbnQgaXRlbSBpcyByZXR1cm5lZFxuXHRcdFx0XHRsZXQgcGFyZW50SXRlbSA9IHRoaXMuX2ZpbGVNYW5hZ2VyLnJlbW92ZUZpbGUocGF0aCk7XG5cblx0XHRcdFx0Ly8gQ29sbGFwc2UgcGFyZW50IGlmIHRoZSBsYXN0IG9mIGl0cyBjaGlsZHJlbiB3YXMgZGVsZXRlZFxuXHRcdFx0XHRpZiAocGFyZW50SXRlbSAmJiAhcGFyZW50SXRlbS5oYXNDaGlsZHJlbilcblx0XHRcdFx0XHR0aGlzLl9maWxlc0xpc3QuY29sbGFwc2UoJChgI3N2bS1maWxlTGlzdCAuZmlsZS1jb250cm9sc1tkYXRhLWl0ZW0taWQ9XCIke3BhcmVudEl0ZW0uaWR9XCJdYCkuY2xvc2VzdCgndHInKSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChyZXF1ZXN0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbihgJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaXNEaXIgPyAnRm9sZGVyJyA6ICdGaWxlJ30gZGVsZXRlZGAsIGAke3RoaXMuX3NlbGVjdGVkSXRlbS5pc0RpciA/ICdGb2xkZXInIDogJ0ZpbGUnfSAnJHt0aGlzLl9zZWxlY3RlZEl0ZW0ubmFtZX0nIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cblx0XHRcdFx0dGhpcy5fc2VsZWN0ZWRJdGVtID0gbnVsbDtcblxuXHRcdFx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oYEZpbGUgZGVsZXRlZGAsIGBBZG1pbmlzdHJhdG9yICR7cmVxdWVzdGVyfSBkZWxldGVkIHRoZSBmb2xsb3dpbmcgZmlsZSR7ZmlsZXNBcnIubGVuZ3RoID4gMSA/ICdzJyA6ICcnfTogPHN0cm9uZz4ke2ZpbGVzQXJyLmpvaW4oJzxicj4gJyl9PC9zdHJvbmc+YCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJlc2V0IHNlbGVjdGlvblxuXHRcdFx0dGhpcy5fb25GaWxlU2VsZWN0ZWRDaGFuZ2UoKTtcblx0XHR9XG5cblx0XHQvLyBlbHNlIGlmICgpXG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBVSSBFVkVOVCBMSVNURU5FUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfb25SZXRyeUNsaWNrKClcblx0e1xuXHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3N2bS1pbml0Jyk7XG5cblx0XHQvLyBSZS1zZW5kIGluaXRpYWxpemF0aW9uIHJlcXVlc3Rcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0lOSVQpO1xuXHR9XG5cblx0X29uUmVmcmVzaENsaWNrKClcblx0e1xuXHRcdHRoaXMuX2ZpbGVzTGlzdC5jbGVhclNlbGVjdGlvbigpO1xuXHRcdHRoaXMuX3JlZnJlc2hEYXRhTGlzdCgpO1xuXHR9XG5cblx0X29uRmlsZVNlbGVjdGVkQ2hhbmdlKClcblx0e1xuXHRcdC8vIEhpZGUgY29udHJvbCBidXR0b25zIG9uIGN1cnJlbnRseSBzZWxlY3RlZCBpdGVtXG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHRcdCQoYCNzdm0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaWR9XCJdYCkuaGlkZSgpO1xuXG5cdFx0Ly8gR2V0IHNlbGVjdGVkIGl0ZW1cblx0XHRsZXQgc2VsZWN0ZWRSb3dzID0gdGhpcy5fZmlsZXNMaXN0LnNlbGVjdCgpO1xuXG5cdFx0aWYgKHNlbGVjdGVkUm93cy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdC8vIFNhdmUgcmVmLiB0byBzZWxlY3RlZCBpdGVtXG5cdFx0XHR0aGlzLl9zZWxlY3RlZEl0ZW0gPSB0aGlzLl9maWxlc0xpc3QuZGF0YUl0ZW0oc2VsZWN0ZWRSb3dzWzBdKTtcblxuXHRcdFx0Ly8gU2hvdyBjb250cm9sIGJ1dHRvbnMgb24gbmV3IHNlbGVjdGVkIGl0ZW1cblx0XHRcdCQoYCNzdm0tZmlsZUxpc3QgLmZpbGUtY29udHJvbHNbZGF0YS1pdGVtLWlkPVwiJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaWR9XCJdYCkuc2hvdygpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9zZWxlY3RlZEl0ZW0gPSBudWxsO1xuXHR9XG5cblx0X3Nob3dBZGRGb2xkZXJNb2RhbENsaWNrKClcblx0e1xuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0gJiYgdGhpcy5fc2VsZWN0ZWRJdGVtLmlzRGlyKVxuXHRcdHtcblx0XHRcdHRoaXMuX2FkZEZvbGRlck1vZGFsLm1vZGFsKCdzaG93Jyk7XG5cdFx0XHQkKCcjc3ZtLWZvbGRlck5hbWVJbicpLmZvY3VzKCk7XG5cdFx0fVxuXHR9XG5cblx0X29uQWRkRm9sZGVyQ2xpY2soKVxuXHR7XG5cdFx0Ly8gVGhlIHBhcmVudCBmb2xkZXIgY291bGQgaGF2ZSBiZWVuIGRlbGV0ZWQgd2hpbGUgdXNlciBpcyBzdGlsbCB0eXBpbmcgdGhlIG5hbWUgb2YgdGhlIG5ldyBjaGlsZCBmb2xkZXJcblx0XHRpZiAoIXRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHR7XG5cdFx0XHR0aGlzLl9hZGRGb2xkZXJNb2RhbC5tb2RhbCgnaGlkZScpO1xuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KCdVbmFibGUgdG8gY3JlYXRlIGZvbGRlcjsgdGhlIHBhcmVudCBmb2xkZXIgZG9lc25cXCd0IGV4aXN0LicpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hZGRGb2xkZXJWYWxpZGF0b3IudmFsaWRhdGUoKSlcblx0XHR7XG5cdFx0XHQvLyBEaXNhYmxlIG1vZGFsIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlQWRkRm9sZGVyTW9kYWwoZmFsc2UpO1xuXG5cdFx0XHRsZXQgZGF0YSA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdGRhdGEucHV0VXRmU3RyaW5nKCdmb2xkZXInLCB0aGlzLl9zZWxlY3RlZEl0ZW0uaWQgKyB0aGlzLl9maWxlU2VwYXJhdG9yICsgJCgnI3N2bS1mb2xkZXJOYW1lSW4nKS52YWwoKSk7XG5cblx0XHRcdC8vIFNlbmQgcmVxdWVzdCB0byBzZXJ2ZXJcblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfQ1JFQVRFX0ZPTERFUiwgZGF0YSk7XG5cdFx0fVxuXHR9XG5cblx0X29uQWRkRm9sZGVyTW9kYWxIaWRkZW4oKVxuXHR7XG5cdFx0JCgnI3N2bS1mb2xkZXJOYW1lSW4nKS52YWwoJycpO1xuXHRcdHRoaXMuX3Jlc2V0QWRkRm9sZGVyVmFsaWRhdGlvbigpO1xuXG5cdFx0Ly8gRW5hYmxlIG1vZGFsIGludGVyZmFjZVxuXHRcdHRoaXMuX2VuYWJsZUFkZEZvbGRlck1vZGFsKHRydWUpO1xuXHR9XG5cblx0X3Nob3dVcGxvYWRGaWxlc01vZGFsQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHRcdHRoaXMuX3VwbG9hZEZpbGVzTW9kYWwubW9kYWwoJ3Nob3cnKTtcblx0fVxuXG5cdF9vbkNsZWFyRmlsZXNDbGljaygpXG5cdHtcblx0XHR0aGlzLl91cGxvYWRlci5jbGVhckFsbEZpbGVzKCk7XG5cdH1cblxuXHRfb25VcGxvYWRTdGFydChlKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBjbGVhciBidXR0b25cblx0XHQkKCcjc3ZtLWNsZWFyRmlsZXNCdCcpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cblx0XHQvLyBTZXQgZGVzdGluYXRpb24gdXJsXG5cdFx0Y29uc3QgdXJsID0gJ2h0dHA6Ly8nICsgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLmhvc3QgKyAnOicgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuaHR0cFBvcnQgKyAnL0JsdWVCb3gvU0ZTMlhGaWxlVXBsb2FkP3Nlc3NIYXNoSWQ9JyArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5zZXNzaW9uVG9rZW47XG5cblx0XHRlLnNlbmRlci5vcHRpb25zLmFzeW5jLnNhdmVVcmwgPSB1cmw7XG5cblx0XHQvLyBTZXQgcGF5bG9hZFxuXHRcdGNvbnN0IHBhcmFtcyA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdHBhcmFtcy5hcHBlbmQoJ19fbW9kdWxlJywgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLm1vZHVsZUlkKTtcblx0XHRwYXJhbXMuYXBwZW5kKCdfX3RhcmdldCcsIHRoaXMuX3NlbGVjdGVkSXRlbS5pZCk7XG5cblx0XHRmb3IgKGxldCBmID0gMDsgZiA8IGUuZmlsZXMubGVuZ3RoOyBmKyspXG5cdFx0XHRwYXJhbXMuYXBwZW5kKCdmaWxlc1tdJywgZS5maWxlc1tmXS5yYXdGaWxlKTtcblxuXHRcdGUuZm9ybURhdGEgPSBwYXJhbXM7XG5cdH1cblxuXHRfb25VcGxvYWRFbmQoZSlcblx0e1xuXHRcdC8vIEVuYWJsZSBjbGVhciBidXR0b25cblx0XHQkKCcjc3ZtLWNsZWFyRmlsZXNCdCcpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHR9XG5cblx0X29uRmlsZXNVcGxvYWRFbmQocmVzcG9uc2UpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvOiB3ZSBoYXZlIHRvIHdhaXQgdGhlIHVwbG9hZCBwcm9jZXNzIGNvbXBsZXRpb24gdG8gYmUgc2lnbmFsZWQgYnkgdGhlIHNlcnZlciB0aHJvdWdoIHRoZSBkZWRpY2F0ZWQgRXh0ZW5zaW9uIHJlc3BvbnNlXG5cblx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHQvLyBUT0RPIFNob3VsZCB3ZSBoYW5kbGUgdGhpcyByZXNwb25zZSBpbiBzb21lIHdheT8gRm9yIHNvbWUgdW5rbm93biByZWFzb24gd2UgYWx3YXlzIGdldCBvaz1mYWxzZSBhbmQgc3RhdHVzPTBcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5vaylcblx0XHQvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG5cdH1cblxuXHRfb25SZW1vdmVGaWxlQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dDb25maXJtV2FybmluZyhgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgc2VsZWN0ZWQgJHt0aGlzLl9zZWxlY3RlZEl0ZW0uaXNEaXIgPyAnZm9sZGVyJyA6ICdmaWxlJ30/PGJyPjxicj5QYXRoOiA8c3Ryb25nPiR7dGhpcy5fc2VsZWN0ZWRJdGVtLmlkfTwvc3Ryb25nPmAsICQucHJveHkodGhpcy5fb25SZW1vdmVGaWxlQ29uZmlybSwgdGhpcykpO1xuXHR9XG5cblx0X29uUmVtb3ZlRmlsZUNvbmZpcm0oKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSBpbnRlcmZhY2Vcblx0XHR0aGlzLl9lbmFibGVJbnRlcmZhY2UoZmFsc2UpO1xuXG5cdFx0Ly8gUmVxdWVzdCBTZXJ2bGV0IGZpbGVzIHJlbW92YWxcblx0XHQvLyBOT1RFOiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIEFkbWluVG9vbCwgdGhlIGZpbGUgdG8gYmUgZGVsZXRlZCBpcyBzZW50XG5cdFx0Ly8gaW4gYW4gYXJyYXkgb2Ygc3RyaW5ncywgZXZlbiBpZiB3ZSBjYW4ndCBkZWxldGUgbW9yZSB0aGFuIDEgZmlsZSBhdCBvbmNlIGluIHRoaXMgQWRtaW5Ub29sXG5cblx0XHRsZXQgZmlsZXMgPSBuZXcgU0ZTMlguU0ZTQXJyYXkoKTtcblx0XHRmaWxlcy5hZGRVdGZTdHJpbmcodGhpcy5fc2VsZWN0ZWRJdGVtLmlkKTtcblxuXHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0cGFyYW1zLnB1dFNGU0FycmF5KCdmaWxlcycsIGZpbGVzKTtcblxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfREVMRVRFX0ZJTEVTLCBwYXJhbXMpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X3N3aXRjaFZpZXcodmlld0lkKVxuXHR7XG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N2bS12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X2VuYWJsZUludGVyZmFjZShlbmFibGUpXG5cdHtcblx0XHQkKCcjc3ZtLWZpbGVMaXN0JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblx0XHQkKCcjc3ZtLXJlZnJlc2hCdCcpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cdH1cblxuXHRfcmVmcmVzaERhdGFMaXN0KClcblx0e1xuXHRcdC8vIERpc2FibGUgaW50ZXJmYWNlXG5cdFx0dGhpcy5fZW5hYmxlSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdC8vIFNlbmQgcmVxdWVzdCB0byBzZXJ2ZXJcblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9TRVJWTEVUUylcblx0fVxuXG5cdF9yZXNldEFkZEZvbGRlclZhbGlkYXRpb24oKVxuXHR7XG5cdFx0dGhpcy5fYWRkRm9sZGVyVmFsaWRhdG9yLmhpZGVNZXNzYWdlcygpO1xuXG5cdFx0Ly8gVGhlIG1ldGhvZCBhYm92ZSBkb2Vzbid0IHJlbW92ZSB0aGUgay1pbnZhbGlkIGNsYXNzZXMgYW5kIGFyaWEtaW52YWxpZD1cInRydWVcIiBhdHRyaWJ1dGVzIGZyb20gaW5wdXRzXG5cdFx0Ly8gTGV0J3MgZG8gaXQgbWFudWFsbHlcblx0XHQkKCcjc3ZtLWFkZEZvbGRlckZvcm0gLmstaW52YWxpZCcpLnJlbW92ZUNsYXNzKCdrLWludmFsaWQnKTtcblx0XHQkKCcjc3ZtLWFkZEZvbGRlckZvcm0gW2FyaWEtaW52YWxpZD1cInRydWVcIl0nKS5yZW1vdmVBdHRyKCdhcmlhLWludmFsaWQnKTtcblx0fVxuXG5cdF9lbmFibGVBZGRGb2xkZXJNb2RhbChlbmFibGUpXG5cdHtcblx0XHQvLyBEaXNhYmxlIG1vZGFsIGNsb3NlIGJ1dHRvbnNcblx0XHQkKCcjc3ZtLWFkZEZvbGRlck1vZGFsIGJ1dHRvbltkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cblx0XHQvLyBEaXNhYmxlIGFkZCBidXR0b25cblx0XHQkKCcjc3ZtLWFkZEZvbGRlckJ0JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblxuXHRcdC8vIERpc2FibGUgZmllbGRzZXRcblx0XHQkKCcjc3ZtLWFkZEZvbGRlckZvcm0nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBHRVRURVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=