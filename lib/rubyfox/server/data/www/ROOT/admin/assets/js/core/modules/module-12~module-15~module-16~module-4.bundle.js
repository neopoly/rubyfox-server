/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-12~module-15~module-16~module-4"],{

/***/ "./src/components/uibuilder/config-check-box.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-check-box.js ***!
  \******************************************************/
/*! exports provided: ConfigCheckBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCheckBox", function() { return ConfigCheckBox; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigCheckBox extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				type: 'checkbox',
				class: '',
				id: this._data.name,
				name: this._data.name,
				'data-role': 'switch',
			};

			// Set widget attributes (see parent class)
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules (see parent class)
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
   _initialize()
   {
	   if (this._data.editable)
	   {
		   // Initialize kendo widget
		   kendo.init(this._widgetHtml);

		   // Save ref. to widget
		   this._innerWidget = this._widgetHtml.data('kendoSwitch');

		   // Enable value commit binding
		   this._innerWidget.bind('change', $.proxy(this._onValueInput, this));
	   }

	   // Proceed with initialization
	   super._initialize();
   }

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._innerWidget.value(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._innerWidget.enable(this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._innerWidget.value();

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-check-box'))
	window.customElements.define('config-check-box', ConfigCheckBox);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-drop-down-list.js":
/*!***********************************************************!*\
  !*** ./src/components/uibuilder/config-drop-down-list.js ***!
  \***********************************************************/
/*! exports provided: ConfigDropDownList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigDropDownList", function() { return ConfigDropDownList; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigDropDownList extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				class: 'form-control',
				id: this._data.name,
				name: this._data.name,
				'data-role': 'dropdownlist',
			};

			// Set widget attributes (see parent class)
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules (see parent class)
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
	_initialize()
	{
		if (this._data.editable)
		{
			// Initialize kendo widget
			kendo.init(this._widgetHtml);

			// Save ref. to widget
			this._innerWidget = this._widgetHtml.data('kendoDropDownList');

			// Set list items
			this._innerWidget.setDataSource(this._getDataSource(this._data.dataProvider))

			// Enable value commit binding
			this._widgetHtml.bind('change', $.proxy(this._onValueInput, this));
		}

		// Proceed with initialization
		super._initialize();
	}

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._innerWidget.value(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._innerWidget.wrapper.attr('disabled', !this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._innerWidget.value();

		// Trigger event
		this._triggerEvent();
	}

	_getDataSource(dpString)
	{
		if (dpString)
			return dpString.split(',');

		// In case the dataprovider is empty, add at least the current value
		else
			return [this._data.value];
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-drop-down-list'))
	window.customElements.define('config-drop-down-list', ConfigDropDownList);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-dual-list.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-dual-list.js ***!
  \******************************************************/
/*! exports provided: ConfigDualList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigDualList", function() { return ConfigDualList; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigDualList extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter.
	 * @override
	 */
	_generateInnerWidget()
	{
		this._widgetHtml = $('<div>');

		const availableId = this._getId(this._data.name, 'available');
		const selectedId = this._getId(this._data.name, 'selected');

		// Create header for labels
		let header = $('<div>', {class: 'form-label-container dual-list-labels'});

		header.append($('<label>', {
			class: 'font-italic form-label dual-list-left-col' + (!this._data.editable ? ' no-interact' : ''),
			for: availableId,
		}).text('Available'));

		header.append($('<label>', {
			class: 'font-italic font-weight-bold form-label dual-list-right-col' + (!this._data.editable ? ' no-interact' : ''),
			for: selectedId,
		}).text('Selected'));

		this._widgetHtml.append(header);

		// Add available items list
		this._availableListHtml = $('<select>', {
			id: availableId,
			class: 'dual-list-left-col' + (!this._data.editable ? ' no-interact' : ''),
		});
		this._widgetHtml.append(this._availableListHtml);

		// Add selected items list
		this._selectedListHtml = $('<select>', {
			id: selectedId,
			class: 'dual-list-right-col' + (!this._data.editable ? ' no-interact' : ''),
		});
		this._widgetHtml.append(this._selectedListHtml);

		// Return component
		return this._widgetHtml;
	}

	// IDs containing a "." cause issues to connected lists
	_getId(name, suffix)
	{
		return name.replace('.', '_') + '-' + suffix;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
	_initialize()
	{
		// Initialize "avalable" listbox
		this._availableList = this._availableListHtml.kendoListBox({
            connectWith: this._getId(this._data.name, 'selected'),
            toolbar: {
                tools: this._data.editable ? ['transferTo', 'transferFrom', 'transferAllTo', 'transferAllFrom'] : []
            },
			template: "<div>#:value#</div>",
			selectable: 'multiple',
        }).data('kendoListBox');

		// Initialize "selected" listbox
        this._selectedList = this._selectedListHtml.kendoListBox({
			template: "<div>#:value#</div>",
			selectable: 'multiple',
			// The following listeners can't be used because events are fired before the datasource is actually updated
			// We have to use a change event listener on the datasource (see below), even if not optimal
			//add: $.proxy(this._onValueInput, this),
			//remove: $.proxy(this._onValueInput, this),
		}).data('kendoListBox');

		// Proceed with initialization
		super._initialize();
	}

	/**
	 * Set widget's datasource.
	 * @override
	 */
	_setWidgetValue()
	{
		let availableArr = this._data.dataProvider != '' ? this._data.dataProvider.split(',') : [];
		let selectedArr = this._data.value != '' ? this._data.value.split(',') : [];

		// Remove selected values from available values
		if (selectedArr.length > 0)
		{
			let temp = [];

			for (let val of availableArr)
			{
				if (selectedArr.indexOf(val) == -1)
					temp.push(val);
			}

			availableArr = temp;
		}

		// Convert lists of strings to lists of objects
		let availableValues = [];
		for (let val of availableArr)
			availableValues.push({value: val});

		let selectedValues = [];
		for (let val of selectedArr)
			selectedValues.push({value: val});

		// Clear selection
		this._availableList.clearSelection();
		this._selectedList.clearSelection();

		// Set datasources
		this._availableList.setDataSource(new kendo.data.DataSource({
			data: availableValues
		}));

		this._selectedList.setDataSource(new kendo.data.DataSource({
			data: selectedValues,
			// We listen to the change event instead of the add/remove events on the listbox, because those are fired before the datasource is updated
			// This is not optimal because the event is fired for each item added to or removed from the datasource
			change: $.proxy(this._onValueInput, this)
		}));

		// Disable editing
		if (!this._data.editable)
		{
			this._availableList.enable('.k-item', false);
			this._selectedList.enable('.k-item', false);
		}

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
		{
			// Clear selection
			this._availableList.clearSelection();
			this._selectedList.clearSelection();

			// Enable/disable lists
			this._availableList.wrapper.attr('disabled', !this._editEnabled);
			this._selectedList.wrapper.attr('disabled', !this._editEnabled);
		}
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		let listData = this._selectedList.dataSource.data();

		// Update Configuration Parameter to new value
		this._data.value = listData.map(e => e.value).join(',');

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-dual-list'))
	window.customElements.define('config-dual-list', ConfigDualList);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-form-item.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-form-item.js ***!
  \******************************************************/
/*! exports provided: ConfigFormItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigFormItem", function() { return ConfigFormItem; });
class ConfigFormItem extends HTMLElement
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super();

		this.id = 'form-item-' + configParam.name;
		this._editEnabled = editEnabled;
		this._data = configParam;

		// Create form item view
		this._buildView(inDialog);

		// Initialize form item
		this._initialize();
	}

	connectedCallback()
	{
		// Trigger event
		// NOTE: when a ConfigFormItem is instantiated, the _triggerEvent method is called as soon as its value is set.
		// When this happens, due to the fact that the object is not yet in the DOM, the event is not catched by the listener
		// (which is attached to the outer container). So forcing the event to trigger again as soon as the ConfigFormItem
		// is appended to the DOM is needed.
		this._triggerEvent();
	}

	set data(configParam)
	{
		this._data = configParam;
		this._setWidgetValue();
	}

	get data()
	{
		return this._data;
	}

	set editEnabled(enable)
	{
		if (enable != this._editEnabled)
		{
			this._editEnabled = enable;
			this._setWidgetEditEnabled();
		}
	}

	get editEnabled()
	{
		return this._editEnabled;
	}

	_buildView(isInsideDialog)
	{
		if (!isInsideDialog)
		{
			// Set additional classes for inner widget
			let classNames = '';

			switch (this._data.type)
			{
				case 'DualList':
					classNames = 'col-sm-7 col-lg-8';
					break;
				case 'DataGrid':
					classNames = 'col-sm'; // Use 'col-sm-7 col-lg-8' for DataGrid too?
					break;
				case 'TextInput':
					classNames = 'col-sm col-lg-5 col-xl-4';
					break;
				default:
					classNames = 'col-sm-auto';

			}

			// Generate boilerplate html, surrounding the actual widget (label, numeric stepper, etc)
			this.innerHTML = `
				<div class="form-group position-relative row">
					<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
						<label for="${this._data.name}" class="form-label ${(this._data.clientOnly ? 'client-only' : '')}">${this._data.label} <i class="fas fa-question-circle text-muted help" title="${this._data.tooltip}"></i>${(this._data.immediate ? '<i class="fas fa-bolt text-muted ml-1 help" title="This setting is applied <b>immediately</b> on submit, without requiring a server restart"></i>' : '')}</label>
					</div>
					<div class="inner-widget align-self-center ${classNames}">
						<span class="k-invalid-msg" data-for="${this._data.name}"></span>
					</div>
				</div>
			`;
		}
		else
		{
			this.innerHTML = `
				<div class="form-group position-relative">
					<div class="col-form-label form-label-container">
						<label for="${this._data.name}" class="form-label ${(this._data.clientOnly ? 'client-only' : '')}">${this._data.label} <i class="fas fa-question-circle text-muted help" title="${this._data.tooltip}"></i></label>
					</div>
					<div class="inner-widget">
						<span class="k-invalid-msg" data-for="${this._data.name}"></span>
					</div>
				</div>
			`;
		}

		// Create inner widget (must be overridden)
		let widget = this._generateInnerWidget();

		// Append inner widget
		$(this).find('.inner-widget').prepend(widget);
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_generateInnerWidget()
	{
		// Show an error, should be overridden
		console.error(`Unable to create ${this._data.type} form item for configuration parameter ${this.id}`);
	}

	/**
	 * Set attributes on the widget configuration object.
	 */
	_setWidgetAttributes(config)
	{
		const attribs = this._data.attributes;

		if (attribs)
		{
			for (let attr in attribs)
			{
				config[attr] = attribs[attr];

				if (attr == 'pattern')
					config['data-pattern-msg'] = 'Contains invalid characters';
			}
		}
	}

	/**
	 * Set additional attributes on the widget configuration object to properly validate input.
	 */
	_setWidgetValidationAttributes(config)
	{
		const val = this._data.validator;

		if (val != null && val != '')
		{
			if (val == 'ip')
			{
				config['pattern'] = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
				config['data-pattern-msg'] = 'Invalid IP address';
				config['required'] = true;
				config['data-required-msg'] = 'Required';
			}

			else if (val == 'ipRange')
			{
				config['pattern'] = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/[3][0-2]|\/[1-2]?[0-9])?$';
				config['data-pattern-msg'] = 'Invalid IP address or range';
				config['required'] = true;
				config['data-required-msg'] = 'Required';
			}

			else if (val == 'notNull')
			{
				config['required'] = true;
				config['data-required-msg'] = 'Required';
			}

			else if (val == 'pwd')
			{
				config['pattern'] = '^.{6,}$';
				config['data-pattern-msg'] = 'Minimum length: 6 characters';
			}

			else if (val == 'posNum')
			{
				config['pattern'] = '^[0-9]\d*$';
				config['data-pattern-msg'] = 'Non-negative number required';
			}

			else if (val == 'aoi')
			{
				// Nothing to do
				// See Kendo validation initialization in config-interface-builder.js
			}

			else if (val == 'url')
			{
				config['type'] = 'url';
				config['data-url-msg'] = 'Invalid URL';
			}
		}
	}

	/**
	 * Initialize form item.
	 *
	 * NOTE: must be overridden if inner widget requires special initialization (for example Kendo widgets)
	 */
	_initialize()
	{
		// Set value
 	   this._setWidgetValue();

 	   // Set edit enabled
 	   this._setWidgetEditEnabled();
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_setWidgetValue()
	{
		// Nothing to do, must be overridden
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_setWidgetEditEnabled()
	{
		// Nothing to do, must be overridden
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_onValueInput(e)
	{
		// Nothing to do, must be overridden
	}

	_triggerEvent()
	{
		if (this._data.trigger)
		{
			let event = new CustomEvent('value-set', {detail: null, bubbles: true, cancelable: true});
			this.dispatchEvent(event);
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-form-item'))
	window.customElements.define('config-form-item', ConfigFormItem);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-grid.js":
/*!*************************************************!*\
  !*** ./src/components/uibuilder/config-grid.js ***!
  \*************************************************/
/*! exports provided: ConfigGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigGrid", function() { return ConfigGrid; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");
/* harmony import */ var _widgets_list_item_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/list-item-editor */ "./src/components/uibuilder/widgets/list-item-editor.js");




class ConfigGrid extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter.
	 * @override
	 */
	_generateInnerWidget()
	{
		// Create main widget's html
		this._widgetHtml = $('<div>', {class: ''});

		// Set grid widget configuration
		let gridConfig = {
			id: this._data.name,
			name: this._data.name,
			class: 'limited-height' + (!this._data.editable ? ' no-interact' : '')
		};

		// Append grid to main html; grid will be converted to Kendo widget during initialization
		this._widgetHtml.append($('<div>', gridConfig));

		if (this._data.editable)
		{
			// BUTTONS

			// Create buttons container
			let buttons = $('<div>', {class: 'mt-2 text-right'});

			// Append buttons to container
			this._addButton = $('<button>', {type: 'button', class: 'k-button k-secondary', title: 'Add'}).append($('<i class="fas fa-plus"></i>'));
			this._editButton = $('<button>', {type: 'button', class: 'k-button k-secondary ml-2', title: 'Edit', disabled: true}).append($('<i class="fas fa-pen"></i>'));
			this._removeButton = $('<button>', {type: 'button', class: 'k-button k-secondary ml-2', title: 'Remove', disabled: true}).append($('<i class="fas fa-times"></i>'));

			buttons.append(this._addButton);
			buttons.append(this._editButton);
			buttons.append(this._removeButton);

			// Append buttons container to main html
			this._widgetHtml.append(buttons);

			// Create edit dialog
			// NOTE: data-dismiss="modal" on the close/cancel buttons was removed to work around an issue with nested modals;
			// the custom "data-cancel" attribute is used to add a custom listener to the buttons
			this._editDialog = $(`
				<div class="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title text-primary" id="modalTitle">${this._data.label}</h5>
								<button type="button" class="close" aria-label="Close" data-cancel="modal">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body in-flow-invalid-msg">

							</div>
							<div class="modal-footer flex-column">
								<div class="d-flex w-100">
									<div class="flex-grow-1 text-left">
										<button type="button" class="k-button k-primary">...</button>
									</div>
									<div class="flex-grow-1 text-right">
										<button type="button" class="k-button k-secondary" data-cancel="modal">Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`);

			// Add listener to dialog hide event
			this._editDialog.on('hidden.bs.modal', $.proxy(this._onEditPanelHidden, this));

			// Add listener to main button click event
			$('button.k-primary', this._editDialog).on('click', $.proxy(this._onSubmitBtClick, this));

			// Add listener to close/cancel buttons click event
			$('button[data-cancel="modal"]', this._editDialog).on('click', $.proxy(this._onCancelBtClick, this));

			// Append edit dialog to main html
			this._widgetHtml.append(this._editDialog);
		}

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
	_initialize()
	{
		let columns = [];
		for (let subConfigParam of this._data.defaultListItem)
		{
			let col = {
				field: subConfigParam.name,
				title: subConfigParam.label,
				width: 120
			}

			// Display V or X for booleans
			if (typeof subConfigParam.value === 'boolean')
				col.template = `#= ${subConfigParam.name} ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>' #`;

			// Hide passwords
			if (subConfigParam.type == 'TextInput' && subConfigParam.attributes != null && subConfigParam.attributes.type == 'password')
				col.template = `#= '•'.repeat(data.${subConfigParam.name}.length) #`;

			columns.push(col);
		}

		// Initialize grid
		let gridHtml = this._widgetHtml.find(`#${$.escapeSelector(this._data.name)}`);

		gridHtml.kendoGrid({
			resizable: true,
			selectable: this._data.editable ? 'row' : false,
			change: $.proxy(this._onGridSelectionChange, this),
			columns: columns,
			noRecords: {
				template: 'No items.'
			}
		});

		// Save ref. to widget
		this._gridWidget = gridHtml.data('kendoGrid');

		// Show tootip if grid's cell content exceeds cell width (ellipsis is displayed by Kendo Grid)
		gridHtml.kendoTooltip({
			filter: 'td',
			show: function(e) {
				// Never show tooltip...
				this.content.parent().css('visibility', 'hidden');

				// ...unless content is returned (see below) due to cell width being exceeded
				if (this.content.text() != '')
					this.content.parent().css('visibility', 'visible');
			},
			hide: function() {
				this.content.parent().css('visibility', 'hidden');
			},
			content: function(e) {
				let element = e.target[0];
				if (element.offsetWidth < element.scrollWidth)
					return e.target.text();
				else
					return '';
			}
		});

		/*
		// Initialize button tooltips
		this._widgetHtml.kendoTooltip({
			filter: 'button',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});
		*/

		// Add button listeners
		if (this._data.editable)
		{
			this._addButton.click($.proxy(this._onAddClick, this));
			this._editButton.click($.proxy(this._onEditClick, this));
			this._removeButton.click($.proxy(this._onRemoveClick, this));
		}

		// Proceed with initialization
		super._initialize();
	}

	/**
	 * Set widget's datasource.
	 * @override
	 */
	_setWidgetValue()
	{
		let dataSource = new kendo.data.DataSource({
			data: this._data.listValues
		});

		// Read current horizontal scroll value
		const scrollLeft = $('.k-grid-content', this._gridWidget.wrapper).scrollLeft();

		// Clear grid selection if any
		this._gridWidget.clearSelection();

		// Set updated grid's datasource
		this._gridWidget.setDataSource(dataSource);

		// Set horizontal scroll
		$('.k-grid-content', this._gridWidget.wrapper).scrollLeft(scrollLeft);
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
		{
			// Deselect item
			this._gridWidget.clearSelection();

			// Enable/disable grid
			this._gridWidget.wrapper.attr('disabled', !this._editEnabled);

			// Enable "Add" button
			if (this._editEnabled)
				this._addButton.attr('disabled', false);

			// Disable all buttons
			else
			{
				this._addButton.attr('disabled', true);
				this._editButton.attr('disabled', true);
				this._removeButton.attr('disabled', true);
			}
		}
	}

	_onGridSelectionChange(e)
	{
		let selectedRows = this._gridWidget.select();
		let selectedDataItems = [];

		for (let i = 0; i < selectedRows.length; i++)
		{
			let dataItem = this._gridWidget.dataItem(selectedRows[i]);
			selectedDataItems.push(dataItem);
		}

		// Enable/disable edit button
		if (this._editButton)
			this._editButton.prop('disabled', selectedDataItems.length == 0);

		// Enable/disable remove button
		if (this._removeButton)
		{
			// Always disable button if no list item is selected
			this._removeButton.prop('disabled', selectedDataItems.length == 0);

			// Also disable button if denyEmpty == true and just one item remains in the list
			if (this._data.denyEmpty)
				this._removeButton.prop('disabled', this._data.listItems.length <= 1);
		}
    }

	_onRemoveClick()
	{
		let selectedIndex = this._gridWidget.select().index();

		// Remove item from list
		this._data.removeListItem(selectedIndex);

		// Regenerate datagrid's datasource
		this._setWidgetValue();
	}

	_onAddClick()
	{
		// Clone default item and add to list
		let newListItem = [];
		for (let subCP of this._data.defaultListItem)
			newListItem.push(subCP.clone(true));

		// Create edit popup
		this._openEditPanel(newListItem);
	}

	_onEditClick()
	{
		let selectedIndex = this._gridWidget.select().index();

		// Clone selected item and add to list
		let clonedListItem = [];
		for (let subCP of this._data.listItems[selectedIndex])
			clonedListItem.push(subCP.clone(true));

		// Create edit popup
		this._openEditPanel(clonedListItem, selectedIndex);
	}

	_openEditPanel(subConfigParamsArray, editIndex = -1)
	{
		// Check if this configuration item is inside a modal window;
		// if yes, the edit panel (which is a modal as well) must be configured to remove the dark background
		if ($(this).parents('.modal').length > 0)
			$('.modal', $(this)).attr('data-backdrop', false);

		// Create dialog content
		this._itemEditor = new _widgets_list_item_editor__WEBPACK_IMPORTED_MODULE_2__["ListItemEditor"]();
		this._itemEditor.data = subConfigParamsArray;
		this._itemEditor.index = editIndex;

		let itemEditor = $(this._itemEditor);

		// Append content to dialog
		$('.modal-body', this._editDialog).append(itemEditor);

		// Set dialog main button text
		$('button.k-primary', this._editDialog).html(editIndex > -1 ? '<i class="fas fa-pen mr-1"></i>Update' : '<i class="fas fa-plus mr-1"></i>Add');

		// Display dialog
		this._editDialog.modal('show');
	}

	_onSubmitBtClick()
	{
		if (this._itemEditor.validate())
		{
			let data = this._itemEditor.data;
			let index = this._itemEditor.index;

			// Hide modal
			this._editDialog.modal('hide');

			// Complete editing
			this._onEditComplete(data, index);
		}
	}

	_onCancelBtClick()
	{
		// Hide modal
		this._editDialog.modal('hide');
	}

	_onEditPanelHidden(e)
	{
		// Remove content from dialog
		this._itemEditor.remove();

		// Set dialog main button text
		$('button.k-primary', this._editDialog).html('...');

		this._itemEditor = null;
	}

	_onEditComplete(listItem, editIndex)
	{
		// An existing list item was updated
		if (editIndex > -1)
			this._data.updateListItem(listItem, editIndex);

		// A new list item was added; add it to the configuration parameter
		else
			this._data.addListItem(listItem);

		// Regenerate datagrid's datasource
		this._setWidgetValue();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-grid'))
	window.customElements.define('config-grid', ConfigGrid);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-label.js":
/*!**************************************************!*\
  !*** ./src/components/uibuilder/config-label.js ***!
  \**************************************************/
/*! exports provided: ConfigLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigLabel", function() { return ConfigLabel; });
class ConfigLabel extends HTMLElement
{
	constructor()
	{
	    super();

		this.setAttribute('class','config-label');
	}

	set value(val)
	{
		if (typeof val === 'boolean')
			this.innerHTML = (val ? 'true' : 'false');
		else if (typeof val === 'number')
			this.innerHTML = (val ? val : 0);
		else
			this.innerHTML = (val != '' ? val : '&mdash;');
	}

	get value()
	{
		return this.textContent;
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-label'))
	window.customElements.define('config-label', ConfigLabel);


/***/ }),

/***/ "./src/components/uibuilder/config-numeric-stepper.js":
/*!************************************************************!*\
  !*** ./src/components/uibuilder/config-numeric-stepper.js ***!
  \************************************************************/
/*! exports provided: ConfigNumericStepper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigNumericStepper", function() { return ConfigNumericStepper; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigNumericStepper extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				type: 'number',
				class: 'form-control',
				id: this._data.name,
				name: this._data.name,
				'data-role': 'numerictextbox',
				'data-required-msg': 'Required',
				'data-format': '#',
				required: 'required',
			};

			// Set widget attributes (see parent class)
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules (see parent class)
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
   _initialize()
   {
	   if (this._data.editable)
	   {
		   // Initialize kendo widget
		   kendo.init(this._widgetHtml);

		   // Save ref. to widget
		   this._innerWidget = this._widgetHtml.data('kendoNumericTextBox');

		   // Enable value commit binding
		   this._innerWidget.bind('change', $.proxy(this._onValueInput, this));
	   }

	   // Proceed with initialization
	   super._initialize();
   }

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._innerWidget.value(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._innerWidget.enable(this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = Number(this._innerWidget.value());

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-numeric-stepper'))
	window.customElements.define('config-numeric-stepper', ConfigNumericStepper);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-text-input.js":
/*!*******************************************************!*\
  !*** ./src/components/uibuilder/config-text-input.js ***!
  \*******************************************************/
/*! exports provided: ConfigTextInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigTextInput", function() { return ConfigTextInput; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigTextInput extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				type: 'text',
				class: 'form-control k-textbox',
				id: this._data.name,
				name: this._data.name,
				autocomplete: 'off',
			};

			// Set widget attributes
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);

			// Enable value commit binding
			this._widgetHtml.on('change', $.proxy(this._onValueInput, this));
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._widgetHtml.val(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._widgetHtml.attr('disabled', !this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._widgetHtml.val();

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-text-input'))
	window.customElements.define('config-text-input', ConfigTextInput);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-vector-3d.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-vector-3d.js ***!
  \******************************************************/
/*! exports provided: ConfigVector3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigVector3D", function() { return ConfigVector3D; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");
/* harmony import */ var _widgets_vector_3d_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/vector-3d-input */ "./src/components/uibuilder/widgets/vector-3d-input.js");




class ConfigVector3D extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Create widget's html
			this._widgetHtml = new _widgets_vector_3d_input__WEBPACK_IMPORTED_MODULE_2__["Vector3DInput"](this._data.name, this._data.validator == 'aoi');

			// Set widget attributes
			this._setWidgetAttributes(this._widgetHtml);

			// Enable value commit binding
			$(this._widgetHtml).on('change', $.proxy(this._onValueInput, this));
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
		{
			$(this._widgetHtml).attr('disabled', !this._editEnabled);
		}
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._widgetHtml.value;

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-vector-3d'))
	window.customElements.define('config-vector-3d', ConfigVector3D);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/widgets/list-item-editor.js":
/*!**************************************************************!*\
  !*** ./src/components/uibuilder/widgets/list-item-editor.js ***!
  \**************************************************************/
/*! exports provided: ListItemEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemEditor", function() { return ListItemEditor; });
/* harmony import */ var _utils_uibuilder_config_form_item_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/uibuilder/config-form-item-factory */ "./src/utils/uibuilder/config-form-item-factory.js");


class ListItemEditor extends HTMLElement
{
	constructor()
	{
	    super();
	}

	set data(subConfigParamsArray)
	{
		this._data = subConfigParamsArray;

		this._buildView();
	}

	get data()
	{
		return this._data;
	}

	set index(index)
	{
		this._index = index;
	}

	get index()
	{
		return this._index;
	}

	_buildView()
	{
		// Generate container form
		this._form = $('<form>', {
			onsubmit: 'return false;'
		});

		// Append form
		$(this).append(this._form);

		// Generate form fields
		for (let configParam of this._data)
		{
			// Create form item
			let formItem = _utils_uibuilder_config_form_item_factory__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItemFactory"].create(configParam, true, true);
			formItem.data = configParam;

			// Add form item to form
			this._form.append(formItem);
		}

		// Initialize kendo validation on form
		this._validator = this._form.kendoValidator({
			validateOnBlur: true,
			rules: {
				// Add rule to validate AOI form items?
				// (see: https://demos.telerik.com/kendo-ui/validator/custom-validation)
				aoi: function (input) {
					if (input.is('[data-aoi-msg]') && input.val() != '')
					{
						if (input.val() == '0,0,0')
							return false;
                    }

                    return true;
                }
			}
		}).data('kendoValidator');
	}

	validate()
	{
		return this._validator.validate();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('list-item-editor'))
	window.customElements.define('list-item-editor', ListItemEditor);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/widgets/vector-3d-input.js":
/*!*************************************************************!*\
  !*** ./src/components/uibuilder/widgets/vector-3d-input.js ***!
  \*************************************************************/
/*! exports provided: Vector3DInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector3DInput", function() { return Vector3DInput; });
class Vector3DInput extends HTMLElement
{
	constructor(id, isValidable)
	{
	    super();

		this.id = id;
		this.name = id;

		this._isValidable = isValidable;

		this._initialize();
	}

	set enableClear(value)
	{
		if (value)
			this._clearButton.show();
		else
			this._clearButton.hide();
	}

	set allowNegative(value)
	{
		if (value)
		{
			this._widgetX.setOptions( {min: null} );
			this._widgetY.setOptions( {min: null} );
			this._widgetZ.setOptions( {min: null} );
		}
	}

	set value(val)
	{
		var coords = val.split(',');

		if (coords.length >= 1)
			this._widgetX.value(coords[0]);

		if (coords.length >= 2)
			this._widgetY.value(coords[1]);

		if (coords.length >= 3)
			this._widgetZ.value(coords[2]);

		if (this._isValidable)
			this._inputVal.val(this.value);
	}

	get value()
	{
		if (this._widgetX.value() == null && this._widgetY.value() == null && this._widgetZ.value() == null)
			return '';
		else
			return this._widgetX.value() + ',' + this._widgetY.value() + ',' + this._widgetZ.value();
	}

	_initialize()
	{
		// Generate container form
		this._container = $('<div>', {
			class: 'form-inline'
		});

		// Append container
		$(this).append(this._container);

		// Set inputs configuration
		let configHtml = {
			type: 'number',
			class: 'form-control short-4',
		};

		// Set widget configuration
		let configWidget = {
			min: 0,
			spinners: false,
			format: '#.######',
			decimals: 6,
			round: false,
			spinners: false,
			restrictDecimals: false,
			change: $.proxy(this._onChange, this)
		};

		// Create widgets
		this._inputX = $('<input>', configHtml);
		this._container.append(this._inputX);
		this._widgetX = this._inputX.kendoNumericTextBox(configWidget).data('kendoNumericTextBox');

		this._container.append('<span class="px-1">,</span>');

		this._inputY = $('<input>', configHtml);
		this._container.append(this._inputY);
		this._widgetY = this._inputY.kendoNumericTextBox(configWidget).data('kendoNumericTextBox');

		this._container.append('<span class="px-1">,</span>');

		this._inputZ = $('<input>', configHtml);
		this._container.append(this._inputZ);
		this._widgetZ = this._inputZ.kendoNumericTextBox(configWidget).data('kendoNumericTextBox');

		this._container.append('<span class="px-1"></span>'); // Additional spacer

		// Create invisible field to apply overall validation
		if (this._isValidable)
		{
			this._inputVal = $('<input>', {name: `${this.name}-custom-validate`, 'data-aoi-msg': 'Values can\'t all be 0'});
			this._container.append(this._inputVal);
			this._container.append(`<span class="k-invalid-msg" data-for="${this.name}-custom-validate"></span>`)
			this._inputVal.hide();
		}

		// Create and append Clear button
		this._clearButton = $('<button>', {type: 'button', class: 'k-button k-secondary my-1', title: 'Clear'}).append($('<i class="fas fa-times"></i>'));
		this._clearButton.on('click', $.proxy(this._onClearClick, this));
		this._container.append(this._clearButton);

		// Hide button by default
		this._clearButton.hide();
	}

	_onChange()
	{
		// Empty strings are not allowed
		if (this._widgetX.value() == null)
			this._widgetX.value(0);

		if (this._widgetY.value() == null)
			this._widgetY.value(0);

		if (this._widgetZ.value() == null)
			this._widgetZ.value(0);

		this._dispatchCommit();
	}

	_onClearClick()
	{
		this._widgetX.value('');
		this._widgetY.value('');
		this._widgetZ.value('');

		this._dispatchCommit();
	}

	_dispatchCommit()
	{
		if (this._isValidable)
			this._inputVal.val(this.value);

		this.dispatchEvent(new Event('change'));
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('vector-3d-input'))
	window.customElements.define('vector-3d-input', Vector3DInput);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/utils/uibuilder/config-form-item-factory.js":
/*!*********************************************************!*\
  !*** ./src/utils/uibuilder/config-form-item-factory.js ***!
  \*********************************************************/
/*! exports provided: ConfigFormItemFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigFormItemFactory", function() { return ConfigFormItemFactory; });
/* harmony import */ var _components_uibuilder_config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/uibuilder/config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _components_uibuilder_config_numeric_stepper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/uibuilder/config-numeric-stepper */ "./src/components/uibuilder/config-numeric-stepper.js");
/* harmony import */ var _components_uibuilder_config_text_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/uibuilder/config-text-input */ "./src/components/uibuilder/config-text-input.js");
/* harmony import */ var _components_uibuilder_config_check_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/uibuilder/config-check-box */ "./src/components/uibuilder/config-check-box.js");
/* harmony import */ var _components_uibuilder_config_drop_down_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/uibuilder/config-drop-down-list */ "./src/components/uibuilder/config-drop-down-list.js");
/* harmony import */ var _components_uibuilder_config_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/uibuilder/config-grid */ "./src/components/uibuilder/config-grid.js");
/* harmony import */ var _components_uibuilder_config_dual_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/uibuilder/config-dual-list */ "./src/components/uibuilder/config-dual-list.js");
/* harmony import */ var _components_uibuilder_config_vector_3d__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/uibuilder/config-vector-3d */ "./src/components/uibuilder/config-vector-3d.js");










class ConfigFormItemFactory
{
	static create(configParam, editEnabled, inDialog = false)
	{
		switch (configParam.type)
		{
			case 'TextInput':
				return new _components_uibuilder_config_text_input__WEBPACK_IMPORTED_MODULE_2__["ConfigTextInput"](configParam, editEnabled, inDialog);
				break;

			case 'CheckBox':
				return new _components_uibuilder_config_check_box__WEBPACK_IMPORTED_MODULE_3__["ConfigCheckBox"](configParam, editEnabled, inDialog);
				break;

			case 'NumericStepper':
				return new _components_uibuilder_config_numeric_stepper__WEBPACK_IMPORTED_MODULE_1__["ConfigNumericStepper"](configParam, editEnabled, inDialog);
				break;

			case 'ComboBox':
				return new _components_uibuilder_config_drop_down_list__WEBPACK_IMPORTED_MODULE_4__["ConfigDropDownList"](configParam, editEnabled, inDialog);
				break;

			case 'DataGrid':
				return new _components_uibuilder_config_grid__WEBPACK_IMPORTED_MODULE_5__["ConfigGrid"](configParam, editEnabled, inDialog);
				break;

			case 'DualList':
				return new _components_uibuilder_config_dual_list__WEBPACK_IMPORTED_MODULE_6__["ConfigDualList"](configParam, editEnabled, inDialog);
				break;

			case 'Vector3D':
				return new _components_uibuilder_config_vector_3d__WEBPACK_IMPORTED_MODULE_7__["ConfigVector3D"](configParam, editEnabled, inDialog);
				break;

			default:
				return new _components_uibuilder_config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"](configParam, editEnabled, inDialog); // Will log an error for missing form item type
		}
	}
}


/***/ }),

/***/ "./src/utils/uibuilder/config-interface-builder.js":
/*!*********************************************************!*\
  !*** ./src/utils/uibuilder/config-interface-builder.js ***!
  \*********************************************************/
/*! exports provided: ConfigInterfaceBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigInterfaceBuilder", function() { return ConfigInterfaceBuilder; });
/* harmony import */ var _configuration_parameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration-parameter */ "./src/utils/uibuilder/configuration-parameter.js");
/* harmony import */ var _config_form_item_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-form-item-factory */ "./src/utils/uibuilder/config-form-item-factory.js");



class ConfigInterfaceBuilder
{
	constructor()
	{
		// Set some constants
		this.TAB_PREFIX = 'tab-'
		this.TAB_PANE_PREFIX = 'tabpane-';
		this.SEPARATOR_BEFORE = 'before';
		this.SEPARATOR_AFTER = 'after';
	}

	dump(modifiedOnly = false)
	{
		let dumpStr = '';

		for (let cp of this._configParams)
		{
			if (modifiedOnly)
			{
				if (cp.isModified)
					dumpStr += cp.toString() + '\n';
			}
			else
				dumpStr += cp.toString() + '\n';
		}

		console.log(dumpStr);
	}

	buildInterface(data, mainContainerId, disableEdit = false, tabSuffix = '')
	{
		this._mainContainerId = mainContainerId;
		this._configParams = new Array();
		this._validator = null;

		let hasNewFormItem = false;

		//console.log(data.getDump())

		for (let i = 0; i < data.size(); i++)
		{
			// PARSE DATA

			let configParam = _configuration_parameter__WEBPACK_IMPORTED_MODULE_0__["ConfigurationParameter"].fromSfsObject(data.get(i));
			this._configParams.push(configParam);

			// Get tab and tab pane id from group id
			const tabId = this.TAB_PREFIX + configParam.categoryId + (tabSuffix ? '_' + tabSuffix : '');
			const tabPaneId = this.TAB_PANE_PREFIX + configParam.categoryId + (tabSuffix ? '_' + tabSuffix : '');

			// BUILD INTERFACE :: TABS

			// Check if a tab specific for this group already exists inside the mainContainer: if not, create it
			// (a tab already exists if it was created in a previous loop)
			let tab = $(`#${mainContainerId} > #tabs #${tabId}`);

			if (tab.length == 0)
			{
				// Create tab for tab pane
				tab = $('<li>', {class: 'nav-item'});
				tab.append($('<a>', {
					class: 'nav-link' + (i == 0 ? ' active' : ''),
					id: tabId,
					'data-toggle': 'tab',
					href: '#' + tabPaneId,
					role: 'tab',
					'aria-controls': tabPaneId,
					'aria-selected': (i == 0 ? 'true' : 'false'),
					html: configParam.category,
				}));

				// Add tab to container
				$(`#${mainContainerId} > #tabs`).append(tab);
			}

			// BUILD INTERFACE :: TAB PANES

			// Check if a tab pane specific for this group already exists inside the mainContainer: if not, create it
			// (a tab pane already exists if it was created in a previous loop or if it exists statically in the html - in case it is needed to add some static content)
			let tabPane = $(`#${mainContainerId} > #tabPanels > #${tabPaneId}`);

			if (tabPane.length == 0)
			{
				// Create tab pane
				tabPane = $('<div>', {
					class: 'tab-pane' + (i == 0 ? ' show active' : ''),
					id: tabPaneId,
					role: 'tabpanel',
					'aria-labelledby': tabId,
					'data-dynamic': 'true',
				});

				// Add tab pane to container
				$(`#${mainContainerId} > #tabPanels`).append(tabPane);
			}

			// BUILD INTERFACE :: TAB PANES' FORM

			// Check if a form already exists inside the tab pane: if not, create it
			let form = tabPane.find('form');

			if (form.length == 0)
			{
				// Create form
				form = $('<form>', {
					class: '',
					autocomplete: 'off'
				});

				// Create an inner fieldset; this might be useful to easily disable the whole form at once (actually we don't use it because Kendo widgets are not disabled automatically)
				form.append(
					$('<fieldset>', {
						class: ''
					})
				);

				// Add form to tab pane
				tabPane.prepend(form);

				// form.on("keypress", function(event) {
				// 	// If the user presses the "Enter" key on the keyboard
				// 	if (event.key === "Enter") {
				// 		// Cancel the default action, if needed
				// 		event.preventDefault();
				// 		console.log("ENTER")
				// 	}
				// });
				form.submit(function(evt) {
					console.log("SUBMIT")
					evt.preventDefault();
				});
			}

			// Get fieldset, which is the actual form items container
			let fieldset = form.find('fieldset');

			// BUILD INTERFACE :: TAB PANES' FORM ITEMS

			// Check if form item already exists in fieldset; if yes, just update its data
			let formItem = fieldset.find(`#form-item-${$.escapeSelector(configParam.name)}`);

			if (formItem.length == 0)
			{
				hasNewFormItem = true;

				formItem = _config_form_item_factory__WEBPACK_IMPORTED_MODULE_1__["ConfigFormItemFactory"].create(configParam, !disableEdit);

				// Add separator before
				if (configParam.separator != null && configParam.separator.pos == 'before')
					fieldset.append(this._buildSeparator(configParam.separator));

				// Add form item to form
				fieldset.append(formItem);

				// Add separator after
				if (configParam.separator != null && configParam.separator.pos == 'after')
					fieldset.append(this._buildSeparator(configParam.separator));
			}
			else
				formItem[0].data = configParam;
		}

		// Add listener to show help tooltips
		let allTabPanes = $(`#${mainContainerId} > #tabPanels > div.tab-pane`);
		allTabPanes.kendoTooltip({
			filter: 'i[title].help',
			position: 'right',
			width: '250px',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});

		// Initialize kendo validation on forms' main container
		this._validator = $(`#${mainContainerId}`).kendoValidator({
			validateOnBlur: true,
			rules: {
				// Add rule to validate AOI form items
				// (see: https://demos.telerik.com/kendo-ui/validator/custom-validation)
				aoi: function (input) {
					if (input.is('[data-aoi-msg]') && input.val() != '')
					{
						if (input.val() == '0,0,0')
							return false;
                    }

                    return true;
                }
			}
		}).data('kendoValidator');
	}

	destroyInterface()
	{
		// Destroy all Kendo widgets in forms
		kendo.destroy($(`#${this._mainContainerId} > #tabPanels > div.tab-pane > form`));

		// Remove all tabs
		$(`#${this._mainContainerId} > #tabs`).empty();

		// Remove dynamic tab panes (tab panes created by Interface Builder)
		$(`#${this._mainContainerId} > #tabPanels > div.tab-pane[data-dynamic="true"]`).remove();

		// Remove form inside static tab panes (predefined tab panes in html)
		$(`#${this._mainContainerId} > #tabPanels > div.tab-pane > form`).remove();

		// Remove "active" class from static tab panes (otherwise this class messes with the tab navigator functioning)
		$(`#${this._mainContainerId} > #tabPanels > div.tab-pane`).removeClass('active');
	}

	disableInterface(disable)
	{
		// Enable/disable all config form items
		$(`#${this._mainContainerId} *[id^='form-item-']`).prop('editEnabled', !disable);
	}

	_buildSeparator(separator)
	{
		if (separator.text == null)
			return $(`<hr class="config-form-separator">`);

		else
			return $(`<label class="config-form-separator-label mb-3">${separator.text}</label>`);
	}

	getChangedData()
	{
		let changes = new SFS2X.SFSArray();

		for (var cp of this._configParams)
		{
			if (cp.isModified)
				changes.addSFSObject(cp.toSfsObject());
		}

		return changes;
	}

	resetIsModified()
	{
		for (let cp of this._configParams)
		{
			if (cp.isModified)
				cp.resetIsModified();
		}
	}

	checkIsValid()
	{
		return this._validator.validate();
	}

	resetValidation()
	{
		this._validator.hideMessages();

		// The method above doesn't remove the k-invalid classes and aria-invalid="true" attributes from inputs
		// Let's do it manually
		$(`#${this._mainContainerId} .k-invalid`).removeClass('k-invalid');
		$(`#${this._mainContainerId} [aria-invalid="true"]`).removeAttr('aria-invalid');
	}

	getConfigFormItem(configParamName)
	{
		let formItem = $(`#${this._mainContainerId}`).find(`#form-item-${$.escapeSelector(configParamName)}`);

		if (formItem.length > 0)
			return formItem[0];
		else
			return null;
	}

	activateFirstTabPanel()
	{
		let configParam = this._configParams[0];
		const tabPaneId = this.TAB_PANE_PREFIX + configParam.categoryId;
		let tabPane = $(`#${this._mainContainerId} > #tabPanels > #${tabPaneId}`);
		tabPane.addClass('show active');
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/utils/uibuilder/configuration-parameter.js":
/*!********************************************************!*\
  !*** ./src/utils/uibuilder/configuration-parameter.js ***!
  \********************************************************/
/*! exports provided: ConfigurationParameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationParameter", function() { return ConfigurationParameter; });
class ConfigurationParameter
{
	static fromSfsObject(element)
	{
		let cp = new ConfigurationParameter();

		// Parse common data
		cp.name = element.getUtfString('name');
		cp.label = element.getUtfString('label');
		cp.category = element.getUtfString('category');
		cp.immediate = (element.containsKey('immediate') ? element.getBool('immediate') : false);
		cp.tooltip = element.getUtfString('tooltip');
		cp.type = element.getUtfString('type');
		cp.value = element.get('value');
		cp.validator = element.getUtfString('validator');
		cp.editable = (element.containsKey('edit') ? element.getBool('edit') : true);
		cp.trigger = (element.containsKey('trigger') ? element.getBool('trigger') : false);
		cp.triggerData = element.getSFSArray('triggerData');
		cp.clientOnly = (element.containsKey('clientOnly') ? element.getBool('clientOnly') : false);
		cp.dataProvider = element.getUtfString('dataProvider');

		// Parse component specific attributes
		let tmpAttributes = element.getSFSObject('attributes');
		if (tmpAttributes != null)
		{
			let attributes = {};

			let keys = tmpAttributes.getKeysArray();
			for (let key of keys)
				attributes[key] = tmpAttributes.get(key);

			cp.attributes = attributes;
		}

		// Parse separator settings
		let tmpSeparator = element.getSFSObject('separator');
		if (tmpSeparator != null)
		{
			let separator = {};

			let keys1 = tmpSeparator.getKeysArray();
			for (let key1 of keys1)
				separator[key1] = tmpSeparator.get(key1);

			cp.separator = separator;
		}

		// Parse default list item
		let tmpDefaultListItem = element.getSFSArray('defaultListItem');
		if (tmpDefaultListItem != null && tmpDefaultListItem.size() > 0)
		{
			let defaultListItem = [];

			for (let i = 0; i < tmpDefaultListItem.size(); i++)
				defaultListItem.push(ConfigurationParameter.fromSfsObject(tmpDefaultListItem.getSFSObject(i)));

			cp.defaultListItem = defaultListItem;

			// Parse list values
			let listValues = [];

			let tmpListValues = element.getSFSArray('listValues');
			if (tmpListValues != null && tmpListValues.size() > 0)
			{
				for (let v = 0; v < tmpListValues.size(); v++)
				{
					let listValueObj = tmpListValues.getSFSObject(v);
					let obj = {};

					let keys2 = listValueObj.getKeysArray();
					for (let key2 of keys2)
						obj[key2] = listValueObj.get(key2);

					listValues.push(obj);
				}
			}

			cp.listValues = listValues;

			// If we have a list, on the server-side items could be represented by a class
			cp.clazz = element.getUtfString('clazz');

			// Avoid list to be emptied
			cp.denyEmpty = (element.containsKey('denyEmpty') ? element.getBool('denyEmpty') : false);
		}

		return cp;
	}

	constructor()
	{
		/* CONSTANTS */
		this.DEFAULT_CATEGORY_NAME = 'General';
		this.DEFAULT_CATEGORY_ID = 'general';

		/* PUBLIC VARS */

		this.name = '';
		this.label = '';
		this.tooltip = '';
		this.type = null;
		this.trigger = false;
		this.triggerData = null;
		this.clientOnly = false;
		this.editable = true;
		this.attributes = null;
		this.dataProvider = null;

		this.separator = null;			// Parameter used to create a separator before or after the config parameter
		this.defaultListItem = null;	// List of sub-ConfigurationParameters, each containing the default values
		this.clazz = null;				// Name of the class representing the list item (not used in case of primiteve data types)
		this.denyEmpty = false;			// Disallow to empty a list (DataGrid config parameter type only)

		this.immediate = false;			// Shows icon indicating that setting will be applied immediately on submit, without the need for a server restart

		/* PRIVATE VARS */

		this._category = this.DEFAULT_CATEGORY_NAME;
		this._categoryId = this.DEFAULT_CATEGORY_ID;
		this._value = null;
		this._initialValue = null;		// Save the initial value of the configuration parameter, to check if the value was modified
		this._validator = null;

		this._listItems = [];			// Array of arrays of ConfigurationParameters
		this._listItemsChanged = false;	// Flag to be set in case a list item is added or removed
	}

	//---------------------------------------------
	// GETTERS / SETTERS
	//---------------------------------------------

	set category(val)
	{
		if (val)
		{
			this._category = val;
			this._setIdFromCategoryName(this._category);
		}
	}

	get category()
	{
		return this._category;
	}

	set value(val)
	{
		if (this._value != val)
		{
			// If value is null, then we are setting this for the first time and
			// we want to save the initial value, to check later if it has been modified
			if (this._value == null)
				this._initialValue = val;

			this._value = val;
		}
	}

	get value()
	{
		return this._value;
	}

	set validator(val)
	{
		if (val)
			this._validator = val;
	}

	get validator()
	{
		return this._validator;
	}

	/**
	 * An array of objects; each object contains the name-value pairs used to
	 * populate the list of sub-configuration parameters arrays, based on defaultListItem.
	 */
	set listValues(arr)
	{
		this._setSubConfigurationParams(arr);
	}

	get listValues()
	{
		return this._getSubConfigurationParamsValues();
	}

	//---------------------------------------------
	// GETTERS ONLY
	//---------------------------------------------

	get isModified()
	{
		let _isModified = false;

		// If the parameter is used on the client only (for example in a custom trigger)
		// then we never have to consider it as modified, to prevent it being sent to the server
		if (!this.clientOnly)
		{
			if (this._value != this._initialValue || this._listItemsChanged)
				_isModified = true;
			else
			{
				// Check sub parameters
				outerLoop: for (let listItem of this._listItems)
				{
					for (let subCP of listItem)
					{
						if (subCP.isModified)
						{
							_isModified = true;
							break outerLoop;
						}
					}
				}
			}
		}

		return _isModified;
	}

	get categoryId()
	{
		return this._categoryId;
	}

	get listItems()
	{
		return this._listItems;
	}

	//---------------------------------------------
	// PUBLIC METHODS
	//---------------------------------------------

	/**
	 * Return a clone of this ConfigurationParameter.
	 */
	clone(cloneValue = false)
	{
		let cp = new ConfigurationParameter();
		cp.name = this.name;
		cp.label = this.label;
		cp.category = this.category;
		cp.tooltip = this.tooltip;
		cp.type = this.type;
		cp.validator = this.validator;
		cp.trigger = this.trigger;
		cp.triggerData = (this.triggerData != null ? SFS2X.SFSArray.newFromBinaryData(this.triggerData.toBinary()) : null);
		cp.clientOnly = this.clientOnly;
		cp.dataProvider = this.dataProvider;

		if (cloneValue)
			cp.value = this.value;

		if (this.attributes != null)
		{
			cp.attributes = new Object();
			for (let s1 in this.attributes)
				cp.attributes[s1] = this.attributes[s1];
		}

		if (this.separator != null)
		{
			cp.separator = new Object()
			for (let s2 in this.separator)
				cp.separator[s2] = this.separator[s2];
		}

		if (this.defaultListItem != null)
		{
			let clonedDefaultListItems = [];

			for (let subCP of this.defaultListItem)
				clonedDefaultListItems.push(subCP.clone(cloneValue));

			cp.defaultListItem = clonedDefaultListItems;
		}

		cp.listValues = this.listValues; // No need to clone this, as the listValues setter already does it
		cp.clazz = this.clazz;
		cp.denyEmpty = this.denyEmpty;
		cp.immediate = this.immediate;

		return cp;
	}

	/**
	 * Reset initial value by copying the current value.
	 */
	resetIsModified()
	{
		this._initialValue = this._value;

		// Reset sub-parameters
		if (this._listItems != null)
		{
			for (let listItem of this._listItems)
			{
				for (let subCP of listItem)
					subCP.resetIsModified();
			}
		}

		this._listItemsChanged = false;
	}

	addListItem(newListItem)
	{
		this._listItems.push(newListItem);
		this._listItemsChanged = true;
	}

	updateListItem(listItem, itemIndex)
	{
		this._listItems[itemIndex] = listItem;
		this._listItemsChanged = true;
	}

	removeListItem(itemIndex)
	{
		this._listItems.splice(itemIndex, 1);
		this._listItemsChanged = true;
	}

	toSfsObject()
	{
		let obj = new SFS2X.SFSObject();

		// Set changed setting name
		obj.putUtfString('name', this.name);

		// Set changed setting class, if any
		if (this.clazz != null)
			obj.putUtfString('clazz', this.clazz);

		if (this.value != null)
		{
			// Set changed setting value
			if (typeof this.value === 'boolean')
				obj.putBool('value', this.value);
			else if (typeof this.value === 'number')
				obj.putInt('value', this.value);
			else
				obj.putText('value', this.value);
		}
		else
		{
			// Set changed setting list of values

			let listItems = new SFS2X.SFSArray();

			for (let a of this._listItems)
			{
				if (a.length == 1) // We have just one sub config param; no need to parse it complitely
				{
					// Simple list
					let tempObj = a[0].toSfsObject();
					let wa = tempObj.getWrappedItem('value');
					listItems.add(wa.value, wa.type);
				}
				else
				{
					// Complex list

					let values = new SFS2X.SFSArray();

					for (let subCp of a)
						values.addSFSObject(subCp.toSfsObject());

					listItems.addSFSArray(values);
				}
			}

			obj.putSFSArray('value', listItems);
		}

		return obj;
	}

	/**
	 * Return a description of the ConfigurationParameter instance.
	 */
	toString()
	{
		let s = ``;
		s += `Configuration parameter: ${this.name}\n`;
		s += `\ttype: ${this.type}\n`;
		s += `\tlabel: ${this.label}\n`;
		s += `\tcategory name: ${this.category}\n`;
		s += `\tcategory id: ${this.categoryId}\n`;
		s += `\timmediate: ${this.immediate}\n`;
		s += `\ttooltip: ${this.tooltip}\n`;
		s += `\tvalue: ${this.value}\n`;
		s += `\ttrigger: ${this.trigger}\n`;
		s += `\ttrigger data: ${this.triggerData}\n`;
		s += `\tclient only: ${this.clientOnly}\n`;
		s += `\tvalidator: ${this.validator}\n`;
		s += `\tis modified: ${this.isModified}\n`;

		if (this.attributes != null)
		{
			s += `\tcomponent attributes:\n`;

			for (let s1 in this.attributes)
				s += `\t\t${s1} --> ${this.attributes[s1]}\n`;
		}

		if (this.dataProvider != null)
			s += `\tdata provider: ${this.dataProvider}\n`;

		if (this.separator != null)
		{
			s += `\tseparator:\n`;

			for (let s2 in this.separator)
				s += `\t\t${s2} --> ${this.separator[s2]}\n`;
		}

		if (this._listItems != null && this._listItems.length > 0)
		{
			s += `\t# list items: ${this._listItems.length}\n`;

			for (let i = 0; i < this._listItems.length; i++)
			{
				s += `\tlist item ${i} sub-parameters:\n`;
				for (let e = 0; e < this._listItems[i].length; e++)
					s += `\t\t${this._listItems[i][e].toCompactString()}\n`;
			}

			s += `\tclass name: ${this.clazz}\n`;
			s += `\tdeny empty list: ${this.denyEmpty}\n`;
		}

		return s;
	}

	/**
	 * Return a compact description of the ConfigurationParameter instance.
	 */
	toCompactString()
	{
		return `Configuration parameter '${this.name}': ${this.value} ${this.isModified ? '[X]' : '[ ]'}`;
	}

	//---------------------------------------------
	// PRIVATE METHODS
	//---------------------------------------------

	/**
	 * Retrieve the category id form the category name.
	 * Spaces and invalid characters are removed; words are separated using capitals.
	 */
	_setIdFromCategoryName(categoryName)
	{
		this._categoryId = categoryName;

		// Strip invalid characters
		var pattern = /[^0-9a-zA-Z]/g;
		this._categoryId = this._categoryId.replace(pattern, ' ');

		// Capitalize words
		var words = this._categoryId.split(' ');
		this._categoryId = '';

		for (let i = 0; i < words.length; i++)
		{
			let word = words[i];
			if (word.length > 0)
				this._categoryId += (i > 0 ? word.substr(0,1).toUpperCase() : word.substr(0,1).toLowerCase()) + (word.length > 1 ? word.substr(1) : "");
		}

		if (this._categoryId.length == 0)
			this._categoryId = this.DEFAULT_CATEGORY_ID;
	}

	_setSubConfigurationParams(_listValues)
	{
		this._listItems = [];

		for (let obj of _listValues)
		{
			let listItem = [];

			for (let defaultCP of this.defaultListItem)
			{
				let subCP = defaultCP.clone(false);
				subCP.value = obj[subCP.name];

				listItem.push(subCP);
			}

			this._listItems.push(listItem);
		}
	}

	_getSubConfigurationParamsValues()
	{
		let _listValues = [];

		for (let listItem of this._listItems)
		{
			let obj = {};

			for (let subCP of listItem)
			{
				if (subCP.value != null)
					obj[subCP.name] = subCP.value;
			}

			_listValues.push(obj);
		}

		return _listValues;
	}
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTJ+bW9kdWxlLTE1fm1vZHVsZS0xNn5tb2R1bGUtNC5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctY2hlY2stYm94LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kcm9wLWRvd24tbGlzdC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctZHVhbC1saXN0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1mb3JtLWl0ZW0uanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWdyaWQuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWxhYmVsLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1udW1lcmljLXN0ZXBwZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLXRleHQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLXZlY3Rvci0zZC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci93aWRnZXRzL2xpc3QtaXRlbS1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvd2lkZ2V0cy92ZWN0b3ItM2QtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvdXRpbHMvdWlidWlsZGVyL2NvbmZpZy1mb3JtLWl0ZW0tZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy91dGlscy91aWJ1aWxkZXIvY29uZmlnLWludGVyZmFjZS1idWlsZGVyLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL3VpYnVpbGRlci9jb25maWd1cmF0aW9uLXBhcmFtZXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnQ2hlY2tCb3ggZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCBhIHNpbXBsZSBsYWJlbCBpcyB1c2VkLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIFNldCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0bGV0IGNvbmZpZyA9IHtcblx0XHRcdFx0dHlwZTogJ2NoZWNrYm94Jyxcblx0XHRcdFx0Y2xhc3M6ICcnLFxuXHRcdFx0XHRpZDogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHRuYW1lOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRcdCdkYXRhLXJvbGUnOiAnc3dpdGNoJyxcblx0XHRcdH07XG5cblx0XHRcdC8vIFNldCB3aWRnZXQgYXR0cmlidXRlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldEF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgd2lkZ2V0IGF0dHJpYnV0ZXMgYmFzZWQgb24gdmFsaWRhdGlvbiBydWxlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIENyZWF0ZSB3aWRnZXQncyBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGlucHV0PicsIGNvbmZpZyk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgQ29uZmlnTGFiZWwoKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHdpZGdldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuICAgX2luaXRpYWxpemUoKVxuICAge1xuXHQgICBpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0ICAge1xuXHRcdCAgIC8vIEluaXRpYWxpemUga2VuZG8gd2lkZ2V0XG5cdFx0ICAga2VuZG8uaW5pdCh0aGlzLl93aWRnZXRIdG1sKTtcblxuXHRcdCAgIC8vIFNhdmUgcmVmLiB0byB3aWRnZXRcblx0XHQgICB0aGlzLl9pbm5lcldpZGdldCA9IHRoaXMuX3dpZGdldEh0bWwuZGF0YSgna2VuZG9Td2l0Y2gnKTtcblxuXHRcdCAgIC8vIEVuYWJsZSB2YWx1ZSBjb21taXQgYmluZGluZ1xuXHRcdCAgIHRoaXMuX2lubmVyV2lkZ2V0LmJpbmQoJ2NoYW5nZScsICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKSk7XG5cdCAgIH1cblxuXHQgICAvLyBQcm9jZWVkIHdpdGggaW5pdGlhbGl6YXRpb25cblx0ICAgc3VwZXIuX2luaXRpYWxpemUoKTtcbiAgIH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCB0aGUgbGFiZWwgdGV4dCBpcyBzZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdFx0dGhpcy5faW5uZXJXaWRnZXQudmFsdWUodGhpcy5fZGF0YS52YWx1ZSk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC52YWx1ZSA9IHRoaXMuX2RhdGEudmFsdWU7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX2lubmVyV2lkZ2V0LmVuYWJsZSh0aGlzLl9lZGl0RW5hYmxlZCk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9vblZhbHVlSW5wdXQoZSlcblx0e1xuXHRcdC8vIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB0byBuZXcgdmFsdWVcblx0XHR0aGlzLl9kYXRhLnZhbHVlID0gdGhpcy5faW5uZXJXaWRnZXQudmFsdWUoKTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1jaGVjay1ib3gnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLWNoZWNrLWJveCcsIENvbmZpZ0NoZWNrQm94KTtcbiIsImltcG9ydCB7Q29uZmlnRm9ybUl0ZW19IGZyb20gJy4vY29uZmlnLWZvcm0taXRlbSc7XG5pbXBvcnQge0NvbmZpZ0xhYmVsfSBmcm9tICcuL2NvbmZpZy1sYWJlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdEcm9wRG93bkxpc3QgZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCBhIHNpbXBsZSBsYWJlbCBpcyB1c2VkLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIFNldCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0bGV0IGNvbmZpZyA9IHtcblx0XHRcdFx0Y2xhc3M6ICdmb3JtLWNvbnRyb2wnLFxuXHRcdFx0XHRpZDogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHRuYW1lOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRcdCdkYXRhLXJvbGUnOiAnZHJvcGRvd25saXN0Jyxcblx0XHRcdH07XG5cblx0XHRcdC8vIFNldCB3aWRnZXQgYXR0cmlidXRlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldEF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgd2lkZ2V0IGF0dHJpYnV0ZXMgYmFzZWQgb24gdmFsaWRhdGlvbiBydWxlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIENyZWF0ZSB3aWRnZXQncyBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGlucHV0PicsIGNvbmZpZyk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgQ29uZmlnTGFiZWwoKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHdpZGdldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfaW5pdGlhbGl6ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHdpZGdldFxuXHRcdFx0a2VuZG8uaW5pdCh0aGlzLl93aWRnZXRIdG1sKTtcblxuXHRcdFx0Ly8gU2F2ZSByZWYuIHRvIHdpZGdldFxuXHRcdFx0dGhpcy5faW5uZXJXaWRnZXQgPSB0aGlzLl93aWRnZXRIdG1sLmRhdGEoJ2tlbmRvRHJvcERvd25MaXN0Jyk7XG5cblx0XHRcdC8vIFNldCBsaXN0IGl0ZW1zXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC5zZXREYXRhU291cmNlKHRoaXMuX2dldERhdGFTb3VyY2UodGhpcy5fZGF0YS5kYXRhUHJvdmlkZXIpKVxuXG5cdFx0XHQvLyBFbmFibGUgdmFsdWUgY29tbWl0IGJpbmRpbmdcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwuYmluZCgnY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0XHR9XG5cblx0XHQvLyBQcm9jZWVkIHdpdGggaW5pdGlhbGl6YXRpb25cblx0XHRzdXBlci5faW5pdGlhbGl6ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX2lubmVyV2lkZ2V0LnZhbHVlKHRoaXMuX2RhdGEudmFsdWUpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsdWUgPSB0aGlzLl9kYXRhLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC53cmFwcGVyLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSB0aGlzLl9pbm5lcldpZGdldC52YWx1ZSgpO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0X2dldERhdGFTb3VyY2UoZHBTdHJpbmcpXG5cdHtcblx0XHRpZiAoZHBTdHJpbmcpXG5cdFx0XHRyZXR1cm4gZHBTdHJpbmcuc3BsaXQoJywnKTtcblxuXHRcdC8vIEluIGNhc2UgdGhlIGRhdGFwcm92aWRlciBpcyBlbXB0eSwgYWRkIGF0IGxlYXN0IHRoZSBjdXJyZW50IHZhbHVlXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIFt0aGlzLl9kYXRhLnZhbHVlXTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1kcm9wLWRvd24tbGlzdCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctZHJvcC1kb3duLWxpc3QnLCBDb25maWdEcm9wRG93bkxpc3QpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0R1YWxMaXN0IGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlci5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGRpdj4nKTtcblxuXHRcdGNvbnN0IGF2YWlsYWJsZUlkID0gdGhpcy5fZ2V0SWQodGhpcy5fZGF0YS5uYW1lLCAnYXZhaWxhYmxlJyk7XG5cdFx0Y29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuX2dldElkKHRoaXMuX2RhdGEubmFtZSwgJ3NlbGVjdGVkJyk7XG5cblx0XHQvLyBDcmVhdGUgaGVhZGVyIGZvciBsYWJlbHNcblx0XHRsZXQgaGVhZGVyID0gJCgnPGRpdj4nLCB7Y2xhc3M6ICdmb3JtLWxhYmVsLWNvbnRhaW5lciBkdWFsLWxpc3QtbGFiZWxzJ30pO1xuXG5cdFx0aGVhZGVyLmFwcGVuZCgkKCc8bGFiZWw+Jywge1xuXHRcdFx0Y2xhc3M6ICdmb250LWl0YWxpYyBmb3JtLWxhYmVsIGR1YWwtbGlzdC1sZWZ0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHRcdGZvcjogYXZhaWxhYmxlSWQsXG5cdFx0fSkudGV4dCgnQXZhaWxhYmxlJykpO1xuXG5cdFx0aGVhZGVyLmFwcGVuZCgkKCc8bGFiZWw+Jywge1xuXHRcdFx0Y2xhc3M6ICdmb250LWl0YWxpYyBmb250LXdlaWdodC1ib2xkIGZvcm0tbGFiZWwgZHVhbC1saXN0LXJpZ2h0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHRcdGZvcjogc2VsZWN0ZWRJZCxcblx0XHR9KS50ZXh0KCdTZWxlY3RlZCcpKTtcblxuXHRcdHRoaXMuX3dpZGdldEh0bWwuYXBwZW5kKGhlYWRlcik7XG5cblx0XHQvLyBBZGQgYXZhaWxhYmxlIGl0ZW1zIGxpc3Rcblx0XHR0aGlzLl9hdmFpbGFibGVMaXN0SHRtbCA9ICQoJzxzZWxlY3Q+Jywge1xuXHRcdFx0aWQ6IGF2YWlsYWJsZUlkLFxuXHRcdFx0Y2xhc3M6ICdkdWFsLWxpc3QtbGVmdC1jb2wnICsgKCF0aGlzLl9kYXRhLmVkaXRhYmxlID8gJyBuby1pbnRlcmFjdCcgOiAnJyksXG5cdFx0fSk7XG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC5hcHBlbmQodGhpcy5fYXZhaWxhYmxlTGlzdEh0bWwpO1xuXG5cdFx0Ly8gQWRkIHNlbGVjdGVkIGl0ZW1zIGxpc3Rcblx0XHR0aGlzLl9zZWxlY3RlZExpc3RIdG1sID0gJCgnPHNlbGVjdD4nLCB7XG5cdFx0XHRpZDogc2VsZWN0ZWRJZCxcblx0XHRcdGNsYXNzOiAnZHVhbC1saXN0LXJpZ2h0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHR9KTtcblx0XHR0aGlzLl93aWRnZXRIdG1sLmFwcGVuZCh0aGlzLl9zZWxlY3RlZExpc3RIdG1sKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8vIElEcyBjb250YWluaW5nIGEgXCIuXCIgY2F1c2UgaXNzdWVzIHRvIGNvbm5lY3RlZCBsaXN0c1xuXHRfZ2V0SWQobmFtZSwgc3VmZml4KVxuXHR7XG5cdFx0cmV0dXJuIG5hbWUucmVwbGFjZSgnLicsICdfJykgKyAnLScgKyBzdWZmaXg7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB3aWRnZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2luaXRpYWxpemUoKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6ZSBcImF2YWxhYmxlXCIgbGlzdGJveFxuXHRcdHRoaXMuX2F2YWlsYWJsZUxpc3QgPSB0aGlzLl9hdmFpbGFibGVMaXN0SHRtbC5rZW5kb0xpc3RCb3goe1xuICAgICAgICAgICAgY29ubmVjdFdpdGg6IHRoaXMuX2dldElkKHRoaXMuX2RhdGEubmFtZSwgJ3NlbGVjdGVkJyksXG4gICAgICAgICAgICB0b29sYmFyOiB7XG4gICAgICAgICAgICAgICAgdG9vbHM6IHRoaXMuX2RhdGEuZWRpdGFibGUgPyBbJ3RyYW5zZmVyVG8nLCAndHJhbnNmZXJGcm9tJywgJ3RyYW5zZmVyQWxsVG8nLCAndHJhbnNmZXJBbGxGcm9tJ10gOiBbXVxuICAgICAgICAgICAgfSxcblx0XHRcdHRlbXBsYXRlOiBcIjxkaXY+Izp2YWx1ZSM8L2Rpdj5cIixcblx0XHRcdHNlbGVjdGFibGU6ICdtdWx0aXBsZScsXG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvTGlzdEJveCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBcInNlbGVjdGVkXCIgbGlzdGJveFxuICAgICAgICB0aGlzLl9zZWxlY3RlZExpc3QgPSB0aGlzLl9zZWxlY3RlZExpc3RIdG1sLmtlbmRvTGlzdEJveCh7XG5cdFx0XHR0ZW1wbGF0ZTogXCI8ZGl2PiM6dmFsdWUjPC9kaXY+XCIsXG5cdFx0XHRzZWxlY3RhYmxlOiAnbXVsdGlwbGUnLFxuXHRcdFx0Ly8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgY2FuJ3QgYmUgdXNlZCBiZWNhdXNlIGV2ZW50cyBhcmUgZmlyZWQgYmVmb3JlIHRoZSBkYXRhc291cmNlIGlzIGFjdHVhbGx5IHVwZGF0ZWRcblx0XHRcdC8vIFdlIGhhdmUgdG8gdXNlIGEgY2hhbmdlIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBkYXRhc291cmNlIChzZWUgYmVsb3cpLCBldmVuIGlmIG5vdCBvcHRpbWFsXG5cdFx0XHQvL2FkZDogJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpLFxuXHRcdFx0Ly9yZW1vdmU6ICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKSxcblx0XHR9KS5kYXRhKCdrZW5kb0xpc3RCb3gnKTtcblxuXHRcdC8vIFByb2NlZWQgd2l0aCBpbml0aWFsaXphdGlvblxuXHRcdHN1cGVyLl9pbml0aWFsaXplKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRhdGFzb3VyY2UuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdGxldCBhdmFpbGFibGVBcnIgPSB0aGlzLl9kYXRhLmRhdGFQcm92aWRlciAhPSAnJyA/IHRoaXMuX2RhdGEuZGF0YVByb3ZpZGVyLnNwbGl0KCcsJykgOiBbXTtcblx0XHRsZXQgc2VsZWN0ZWRBcnIgPSB0aGlzLl9kYXRhLnZhbHVlICE9ICcnID8gdGhpcy5fZGF0YS52YWx1ZS5zcGxpdCgnLCcpIDogW107XG5cblx0XHQvLyBSZW1vdmUgc2VsZWN0ZWQgdmFsdWVzIGZyb20gYXZhaWxhYmxlIHZhbHVlc1xuXHRcdGlmIChzZWxlY3RlZEFyci5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGxldCB0ZW1wID0gW107XG5cblx0XHRcdGZvciAobGV0IHZhbCBvZiBhdmFpbGFibGVBcnIpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChzZWxlY3RlZEFyci5pbmRleE9mKHZhbCkgPT0gLTEpXG5cdFx0XHRcdFx0dGVtcC5wdXNoKHZhbCk7XG5cdFx0XHR9XG5cblx0XHRcdGF2YWlsYWJsZUFyciA9IHRlbXA7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBsaXN0cyBvZiBzdHJpbmdzIHRvIGxpc3RzIG9mIG9iamVjdHNcblx0XHRsZXQgYXZhaWxhYmxlVmFsdWVzID0gW107XG5cdFx0Zm9yIChsZXQgdmFsIG9mIGF2YWlsYWJsZUFycilcblx0XHRcdGF2YWlsYWJsZVZhbHVlcy5wdXNoKHt2YWx1ZTogdmFsfSk7XG5cblx0XHRsZXQgc2VsZWN0ZWRWYWx1ZXMgPSBbXTtcblx0XHRmb3IgKGxldCB2YWwgb2Ygc2VsZWN0ZWRBcnIpXG5cdFx0XHRzZWxlY3RlZFZhbHVlcy5wdXNoKHt2YWx1ZTogdmFsfSk7XG5cblx0XHQvLyBDbGVhciBzZWxlY3Rpb25cblx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG5cdFx0dGhpcy5fc2VsZWN0ZWRMaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG5cblx0XHQvLyBTZXQgZGF0YXNvdXJjZXNcblx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LnNldERhdGFTb3VyY2UobmV3IGtlbmRvLmRhdGEuRGF0YVNvdXJjZSh7XG5cdFx0XHRkYXRhOiBhdmFpbGFibGVWYWx1ZXNcblx0XHR9KSk7XG5cblx0XHR0aGlzLl9zZWxlY3RlZExpc3Quc2V0RGF0YVNvdXJjZShuZXcga2VuZG8uZGF0YS5EYXRhU291cmNlKHtcblx0XHRcdGRhdGE6IHNlbGVjdGVkVmFsdWVzLFxuXHRcdFx0Ly8gV2UgbGlzdGVuIHRvIHRoZSBjaGFuZ2UgZXZlbnQgaW5zdGVhZCBvZiB0aGUgYWRkL3JlbW92ZSBldmVudHMgb24gdGhlIGxpc3Rib3gsIGJlY2F1c2UgdGhvc2UgYXJlIGZpcmVkIGJlZm9yZSB0aGUgZGF0YXNvdXJjZSBpcyB1cGRhdGVkXG5cdFx0XHQvLyBUaGlzIGlzIG5vdCBvcHRpbWFsIGJlY2F1c2UgdGhlIGV2ZW50IGlzIGZpcmVkIGZvciBlYWNoIGl0ZW0gYWRkZWQgdG8gb3IgcmVtb3ZlZCBmcm9tIHRoZSBkYXRhc291cmNlXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKVxuXHRcdH0pKTtcblxuXHRcdC8vIERpc2FibGUgZWRpdGluZ1xuXHRcdGlmICghdGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LmVuYWJsZSgnLmstaXRlbScsIGZhbHNlKTtcblx0XHRcdHRoaXMuX3NlbGVjdGVkTGlzdC5lbmFibGUoJy5rLWl0ZW0nLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gQ2xlYXIgc2VsZWN0aW9uXG5cdFx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZExpc3QuY2xlYXJTZWxlY3Rpb24oKTtcblxuXHRcdFx0Ly8gRW5hYmxlL2Rpc2FibGUgbGlzdHNcblx0XHRcdHRoaXMuX2F2YWlsYWJsZUxpc3Qud3JhcHBlci5hdHRyKCdkaXNhYmxlZCcsICF0aGlzLl9lZGl0RW5hYmxlZCk7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZExpc3Qud3JhcHBlci5hdHRyKCdkaXNhYmxlZCcsICF0aGlzLl9lZGl0RW5hYmxlZCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB2YWx1ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHRsZXQgbGlzdERhdGEgPSB0aGlzLl9zZWxlY3RlZExpc3QuZGF0YVNvdXJjZS5kYXRhKCk7XG5cblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gbmV3IHZhbHVlXG5cdFx0dGhpcy5fZGF0YS52YWx1ZSA9IGxpc3REYXRhLm1hcChlID0+IGUudmFsdWUpLmpvaW4oJywnKTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1kdWFsLWxpc3QnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLWR1YWwtbGlzdCcsIENvbmZpZ0R1YWxMaXN0KTtcbiIsImV4cG9ydCBjbGFzcyBDb25maWdGb3JtSXRlbSBleHRlbmRzIEhUTUxFbGVtZW50XG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLmlkID0gJ2Zvcm0taXRlbS0nICsgY29uZmlnUGFyYW0ubmFtZTtcblx0XHR0aGlzLl9lZGl0RW5hYmxlZCA9IGVkaXRFbmFibGVkO1xuXHRcdHRoaXMuX2RhdGEgPSBjb25maWdQYXJhbTtcblxuXHRcdC8vIENyZWF0ZSBmb3JtIGl0ZW0gdmlld1xuXHRcdHRoaXMuX2J1aWxkVmlldyhpbkRpYWxvZyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGZvcm0gaXRlbVxuXHRcdHRoaXMuX2luaXRpYWxpemUoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKClcblx0e1xuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHQvLyBOT1RFOiB3aGVuIGEgQ29uZmlnRm9ybUl0ZW0gaXMgaW5zdGFudGlhdGVkLCB0aGUgX3RyaWdnZXJFdmVudCBtZXRob2QgaXMgY2FsbGVkIGFzIHNvb24gYXMgaXRzIHZhbHVlIGlzIHNldC5cblx0XHQvLyBXaGVuIHRoaXMgaGFwcGVucywgZHVlIHRvIHRoZSBmYWN0IHRoYXQgdGhlIG9iamVjdCBpcyBub3QgeWV0IGluIHRoZSBET00sIHRoZSBldmVudCBpcyBub3QgY2F0Y2hlZCBieSB0aGUgbGlzdGVuZXJcblx0XHQvLyAod2hpY2ggaXMgYXR0YWNoZWQgdG8gdGhlIG91dGVyIGNvbnRhaW5lcikuIFNvIGZvcmNpbmcgdGhlIGV2ZW50IHRvIHRyaWdnZXIgYWdhaW4gYXMgc29vbiBhcyB0aGUgQ29uZmlnRm9ybUl0ZW1cblx0XHQvLyBpcyBhcHBlbmRlZCB0byB0aGUgRE9NIGlzIG5lZWRlZC5cblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxuXG5cdHNldCBkYXRhKGNvbmZpZ1BhcmFtKVxuXHR7XG5cdFx0dGhpcy5fZGF0YSA9IGNvbmZpZ1BhcmFtO1xuXHRcdHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cdH1cblxuXHRnZXQgZGF0YSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YTtcblx0fVxuXG5cdHNldCBlZGl0RW5hYmxlZChlbmFibGUpXG5cdHtcblx0XHRpZiAoZW5hYmxlICE9IHRoaXMuX2VkaXRFbmFibGVkKVxuXHRcdHtcblx0XHRcdHRoaXMuX2VkaXRFbmFibGVkID0gZW5hYmxlO1xuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgZWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2VkaXRFbmFibGVkO1xuXHR9XG5cblx0X2J1aWxkVmlldyhpc0luc2lkZURpYWxvZylcblx0e1xuXHRcdGlmICghaXNJbnNpZGVEaWFsb2cpXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgY2xhc3NlcyBmb3IgaW5uZXIgd2lkZ2V0XG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9ICcnO1xuXG5cdFx0XHRzd2l0Y2ggKHRoaXMuX2RhdGEudHlwZSlcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnRHVhbExpc3QnOlxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSAnY29sLXNtLTcgY29sLWxnLTgnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdEYXRhR3JpZCc6XG5cdFx0XHRcdFx0Y2xhc3NOYW1lcyA9ICdjb2wtc20nOyAvLyBVc2UgJ2NvbC1zbS03IGNvbC1sZy04JyBmb3IgRGF0YUdyaWQgdG9vP1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdUZXh0SW5wdXQnOlxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSAnY29sLXNtIGNvbC1sZy01IGNvbC14bC00Jztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRjbGFzc05hbWVzID0gJ2NvbC1zbS1hdXRvJztcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBib2lsZXJwbGF0ZSBodG1sLCBzdXJyb3VuZGluZyB0aGUgYWN0dWFsIHdpZGdldCAobGFiZWwsIG51bWVyaWMgc3RlcHBlciwgZXRjKVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHBvc2l0aW9uLXJlbGF0aXZlIHJvd1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtc20tNSBjb2wtbGctNCBjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cIiR7dGhpcy5fZGF0YS5uYW1lfVwiIGNsYXNzPVwiZm9ybS1sYWJlbCAkeyh0aGlzLl9kYXRhLmNsaWVudE9ubHkgPyAnY2xpZW50LW9ubHknIDogJycpfVwiPiR7dGhpcy5fZGF0YS5sYWJlbH0gPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiJHt0aGlzLl9kYXRhLnRvb2x0aXB9XCI+PC9pPiR7KHRoaXMuX2RhdGEuaW1tZWRpYXRlID8gJzxpIGNsYXNzPVwiZmFzIGZhLWJvbHQgdGV4dC1tdXRlZCBtbC0xIGhlbHBcIiB0aXRsZT1cIlRoaXMgc2V0dGluZyBpcyBhcHBsaWVkIDxiPmltbWVkaWF0ZWx5PC9iPiBvbiBzdWJtaXQsIHdpdGhvdXQgcmVxdWlyaW5nIGEgc2VydmVyIHJlc3RhcnRcIj48L2k+JyA6ICcnKX08L2xhYmVsPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXQgYWxpZ24tc2VsZi1jZW50ZXIgJHtjbGFzc05hbWVzfVwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnXCIgZGF0YS1mb3I9XCIke3RoaXMuX2RhdGEubmFtZX1cIj48L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0YDtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBwb3NpdGlvbi1yZWxhdGl2ZVwiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cIiR7dGhpcy5fZGF0YS5uYW1lfVwiIGNsYXNzPVwiZm9ybS1sYWJlbCAkeyh0aGlzLl9kYXRhLmNsaWVudE9ubHkgPyAnY2xpZW50LW9ubHknIDogJycpfVwiPiR7dGhpcy5fZGF0YS5sYWJlbH0gPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiJHt0aGlzLl9kYXRhLnRvb2x0aXB9XCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnXCIgZGF0YS1mb3I9XCIke3RoaXMuX2RhdGEubmFtZX1cIj48L3NwYW4+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0YDtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgaW5uZXIgd2lkZ2V0IChtdXN0IGJlIG92ZXJyaWRkZW4pXG5cdFx0bGV0IHdpZGdldCA9IHRoaXMuX2dlbmVyYXRlSW5uZXJXaWRnZXQoKTtcblxuXHRcdC8vIEFwcGVuZCBpbm5lciB3aWRnZXRcblx0XHQkKHRoaXMpLmZpbmQoJy5pbm5lci13aWRnZXQnKS5wcmVwZW5kKHdpZGdldCk7XG5cdH1cblxuXHQvKipcblx0ICogVE8gQkUgT1ZFUlJJRERFTlxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0Ly8gU2hvdyBhbiBlcnJvciwgc2hvdWxkIGJlIG92ZXJyaWRkZW5cblx0XHRjb25zb2xlLmVycm9yKGBVbmFibGUgdG8gY3JlYXRlICR7dGhpcy5fZGF0YS50eXBlfSBmb3JtIGl0ZW0gZm9yIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyICR7dGhpcy5pZH1gKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgYXR0cmlidXRlcyBvbiB0aGUgd2lkZ2V0IGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxuXHQgKi9cblx0X3NldFdpZGdldEF0dHJpYnV0ZXMoY29uZmlnKVxuXHR7XG5cdFx0Y29uc3QgYXR0cmlicyA9IHRoaXMuX2RhdGEuYXR0cmlidXRlcztcblxuXHRcdGlmIChhdHRyaWJzKVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGF0dHIgaW4gYXR0cmlicylcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlnW2F0dHJdID0gYXR0cmlic1thdHRyXTtcblxuXHRcdFx0XHRpZiAoYXR0ciA9PSAncGF0dGVybicpXG5cdFx0XHRcdFx0Y29uZmlnWydkYXRhLXBhdHRlcm4tbXNnJ10gPSAnQ29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzJztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGFkZGl0aW9uYWwgYXR0cmlidXRlcyBvbiB0aGUgd2lkZ2V0IGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRvIHByb3Blcmx5IHZhbGlkYXRlIGlucHV0LlxuXHQgKi9cblx0X3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZylcblx0e1xuXHRcdGNvbnN0IHZhbCA9IHRoaXMuX2RhdGEudmFsaWRhdG9yO1xuXG5cdFx0aWYgKHZhbCAhPSBudWxsICYmIHZhbCAhPSAnJylcblx0XHR7XG5cdFx0XHRpZiAodmFsID09ICdpcCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpZ1sncGF0dGVybiddID0gJ14oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KSQnO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcGF0dGVybi1tc2cnXSA9ICdJbnZhbGlkIElQIGFkZHJlc3MnO1xuXHRcdFx0XHRjb25maWdbJ3JlcXVpcmVkJ10gPSB0cnVlO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcmVxdWlyZWQtbXNnJ10gPSAnUmVxdWlyZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ2lwUmFuZ2UnKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbJ3BhdHRlcm4nXSA9ICdeKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPykoXFwvWzNdWzAtMl18XFwvWzEtMl0/WzAtOV0pPyQnO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcGF0dGVybi1tc2cnXSA9ICdJbnZhbGlkIElQIGFkZHJlc3Mgb3IgcmFuZ2UnO1xuXHRcdFx0XHRjb25maWdbJ3JlcXVpcmVkJ10gPSB0cnVlO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcmVxdWlyZWQtbXNnJ10gPSAnUmVxdWlyZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ25vdE51bGwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbJ3JlcXVpcmVkJ10gPSB0cnVlO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcmVxdWlyZWQtbXNnJ10gPSAnUmVxdWlyZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ3B3ZCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpZ1sncGF0dGVybiddID0gJ14uezYsfSQnO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcGF0dGVybi1tc2cnXSA9ICdNaW5pbXVtIGxlbmd0aDogNiBjaGFyYWN0ZXJzJztcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAodmFsID09ICdwb3NOdW0nKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbJ3BhdHRlcm4nXSA9ICdeWzAtOV1cXGQqJCc7XG5cdFx0XHRcdGNvbmZpZ1snZGF0YS1wYXR0ZXJuLW1zZyddID0gJ05vbi1uZWdhdGl2ZSBudW1iZXIgcmVxdWlyZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ2FvaScpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIE5vdGhpbmcgdG8gZG9cblx0XHRcdFx0Ly8gU2VlIEtlbmRvIHZhbGlkYXRpb24gaW5pdGlhbGl6YXRpb24gaW4gY29uZmlnLWludGVyZmFjZS1idWlsZGVyLmpzXG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKHZhbCA9PSAndXJsJylcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlnWyd0eXBlJ10gPSAndXJsJztcblx0XHRcdFx0Y29uZmlnWydkYXRhLXVybC1tc2cnXSA9ICdJbnZhbGlkIFVSTCc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgZm9ybSBpdGVtLlxuXHQgKlxuXHQgKiBOT1RFOiBtdXN0IGJlIG92ZXJyaWRkZW4gaWYgaW5uZXIgd2lkZ2V0IHJlcXVpcmVzIHNwZWNpYWwgaW5pdGlhbGl6YXRpb24gKGZvciBleGFtcGxlIEtlbmRvIHdpZGdldHMpXG5cdCAqL1xuXHRfaW5pdGlhbGl6ZSgpXG5cdHtcblx0XHQvLyBTZXQgdmFsdWVcbiBcdCAgIHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cbiBcdCAgIC8vIFNldCBlZGl0IGVuYWJsZWRcbiBcdCAgIHRoaXMuX3NldFdpZGdldEVkaXRFbmFibGVkKCk7XG5cdH1cblxuXHQvKipcblx0ICogVE8gQkUgT1ZFUlJJRERFTlxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG8sIG11c3QgYmUgb3ZlcnJpZGRlblxuXHR9XG5cblx0LyoqXG5cdCAqIFRPIEJFIE9WRVJSSURERU5cblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvLCBtdXN0IGJlIG92ZXJyaWRkZW5cblx0fVxuXG5cdC8qKlxuXHQgKiBUTyBCRSBPVkVSUklEREVOXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvLCBtdXN0IGJlIG92ZXJyaWRkZW5cblx0fVxuXG5cdF90cmlnZ2VyRXZlbnQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEudHJpZ2dlcilcblx0XHR7XG5cdFx0XHRsZXQgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3ZhbHVlLXNldCcsIHtkZXRhaWw6IG51bGwsIGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWV9KTtcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cdFx0fVxuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLWZvcm0taXRlbScpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctZm9ybS1pdGVtJywgQ29uZmlnRm9ybUl0ZW0pO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcbmltcG9ydCB7TGlzdEl0ZW1FZGl0b3J9IGZyb20gJy4vd2lkZ2V0cy9saXN0LWl0ZW0tZWRpdG9yJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0dyaWQgZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdC8vIENyZWF0ZSBtYWluIHdpZGdldCdzIGh0bWxcblx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGRpdj4nLCB7Y2xhc3M6ICcnfSk7XG5cblx0XHQvLyBTZXQgZ3JpZCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdGxldCBncmlkQ29uZmlnID0ge1xuXHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdG5hbWU6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdGNsYXNzOiAnbGltaXRlZC1oZWlnaHQnICsgKCF0aGlzLl9kYXRhLmVkaXRhYmxlID8gJyBuby1pbnRlcmFjdCcgOiAnJylcblx0XHR9O1xuXG5cdFx0Ly8gQXBwZW5kIGdyaWQgdG8gbWFpbiBodG1sOyBncmlkIHdpbGwgYmUgY29udmVydGVkIHRvIEtlbmRvIHdpZGdldCBkdXJpbmcgaW5pdGlhbGl6YXRpb25cblx0XHR0aGlzLl93aWRnZXRIdG1sLmFwcGVuZCgkKCc8ZGl2PicsIGdyaWRDb25maWcpKTtcblxuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIEJVVFRPTlNcblxuXHRcdFx0Ly8gQ3JlYXRlIGJ1dHRvbnMgY29udGFpbmVyXG5cdFx0XHRsZXQgYnV0dG9ucyA9ICQoJzxkaXY+Jywge2NsYXNzOiAnbXQtMiB0ZXh0LXJpZ2h0J30pO1xuXG5cdFx0XHQvLyBBcHBlbmQgYnV0dG9ucyB0byBjb250YWluZXJcblx0XHRcdHRoaXMuX2FkZEJ1dHRvbiA9ICQoJzxidXR0b24+Jywge3R5cGU6ICdidXR0b24nLCBjbGFzczogJ2stYnV0dG9uIGstc2Vjb25kYXJ5JywgdGl0bGU6ICdBZGQnfSkuYXBwZW5kKCQoJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+JykpO1xuXHRcdFx0dGhpcy5fZWRpdEJ1dHRvbiA9ICQoJzxidXR0b24+Jywge3R5cGU6ICdidXR0b24nLCBjbGFzczogJ2stYnV0dG9uIGstc2Vjb25kYXJ5IG1sLTInLCB0aXRsZTogJ0VkaXQnLCBkaXNhYmxlZDogdHJ1ZX0pLmFwcGVuZCgkKCc8aSBjbGFzcz1cImZhcyBmYS1wZW5cIj48L2k+JykpO1xuXHRcdFx0dGhpcy5fcmVtb3ZlQnV0dG9uID0gJCgnPGJ1dHRvbj4nLCB7dHlwZTogJ2J1dHRvbicsIGNsYXNzOiAnay1idXR0b24gay1zZWNvbmRhcnkgbWwtMicsIHRpdGxlOiAnUmVtb3ZlJywgZGlzYWJsZWQ6IHRydWV9KS5hcHBlbmQoJCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+JykpO1xuXG5cdFx0XHRidXR0b25zLmFwcGVuZCh0aGlzLl9hZGRCdXR0b24pO1xuXHRcdFx0YnV0dG9ucy5hcHBlbmQodGhpcy5fZWRpdEJ1dHRvbik7XG5cdFx0XHRidXR0b25zLmFwcGVuZCh0aGlzLl9yZW1vdmVCdXR0b24pO1xuXG5cdFx0XHQvLyBBcHBlbmQgYnV0dG9ucyBjb250YWluZXIgdG8gbWFpbiBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLmFwcGVuZChidXR0b25zKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGVkaXQgZGlhbG9nXG5cdFx0XHQvLyBOT1RFOiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIG9uIHRoZSBjbG9zZS9jYW5jZWwgYnV0dG9ucyB3YXMgcmVtb3ZlZCB0byB3b3JrIGFyb3VuZCBhbiBpc3N1ZSB3aXRoIG5lc3RlZCBtb2RhbHM7XG5cdFx0XHQvLyB0aGUgY3VzdG9tIFwiZGF0YS1jYW5jZWxcIiBhdHRyaWJ1dGUgaXMgdXNlZCB0byBhZGQgYSBjdXN0b20gbGlzdGVuZXIgdG8gdGhlIGJ1dHRvbnNcblx0XHRcdHRoaXMuX2VkaXREaWFsb2cgPSAkKGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJtb2RhbFRpdGxlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1rZXlib2FyZD1cImZhbHNlXCIgZGF0YS1iYWNrZHJvcD1cInN0YXRpY1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGg1IGNsYXNzPVwibW9kYWwtdGl0bGUgdGV4dC1wcmltYXJ5XCIgaWQ9XCJtb2RhbFRpdGxlXCI+JHt0aGlzLl9kYXRhLmxhYmVsfTwvaDU+XG5cdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGRhdGEtY2FuY2VsPVwibW9kYWxcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtYm9keSBpbi1mbG93LWludmFsaWQtbXNnXCI+XG5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXIgZmxleC1jb2x1bW5cIj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleC1ncm93LTEgdGV4dC1sZWZ0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5XCI+Li4uPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMSB0ZXh0LXJpZ2h0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1zZWNvbmRhcnlcIiBkYXRhLWNhbmNlbD1cIm1vZGFsXCI+Q2FuY2VsPC9idXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgKTtcblxuXHRcdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGRpYWxvZyBoaWRlIGV2ZW50XG5cdFx0XHR0aGlzLl9lZGl0RGlhbG9nLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuX29uRWRpdFBhbmVsSGlkZGVuLCB0aGlzKSk7XG5cblx0XHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtYWluIGJ1dHRvbiBjbGljayBldmVudFxuXHRcdFx0JCgnYnV0dG9uLmstcHJpbWFyeScsIHRoaXMuX2VkaXREaWFsb2cpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25TdWJtaXRCdENsaWNrLCB0aGlzKSk7XG5cblx0XHRcdC8vIEFkZCBsaXN0ZW5lciB0byBjbG9zZS9jYW5jZWwgYnV0dG9ucyBjbGljayBldmVudFxuXHRcdFx0JCgnYnV0dG9uW2RhdGEtY2FuY2VsPVwibW9kYWxcIl0nLCB0aGlzLl9lZGl0RGlhbG9nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQ2FuY2VsQnRDbGljaywgdGhpcykpO1xuXG5cdFx0XHQvLyBBcHBlbmQgZWRpdCBkaWFsb2cgdG8gbWFpbiBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLmFwcGVuZCh0aGlzLl9lZGl0RGlhbG9nKTtcblx0XHR9XG5cblx0XHQvLyBSZXR1cm4gY29tcG9uZW50XG5cdFx0cmV0dXJuIHRoaXMuX3dpZGdldEh0bWw7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB3aWRnZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2luaXRpYWxpemUoKVxuXHR7XG5cdFx0bGV0IGNvbHVtbnMgPSBbXTtcblx0XHRmb3IgKGxldCBzdWJDb25maWdQYXJhbSBvZiB0aGlzLl9kYXRhLmRlZmF1bHRMaXN0SXRlbSlcblx0XHR7XG5cdFx0XHRsZXQgY29sID0ge1xuXHRcdFx0XHRmaWVsZDogc3ViQ29uZmlnUGFyYW0ubmFtZSxcblx0XHRcdFx0dGl0bGU6IHN1YkNvbmZpZ1BhcmFtLmxhYmVsLFxuXHRcdFx0XHR3aWR0aDogMTIwXG5cdFx0XHR9XG5cblx0XHRcdC8vIERpc3BsYXkgViBvciBYIGZvciBib29sZWFuc1xuXHRcdFx0aWYgKHR5cGVvZiBzdWJDb25maWdQYXJhbS52YWx1ZSA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0XHRjb2wudGVtcGxhdGUgPSBgIz0gJHtzdWJDb25maWdQYXJhbS5uYW1lfSA/ICc8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT4nIDogJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPicgI2A7XG5cblx0XHRcdC8vIEhpZGUgcGFzc3dvcmRzXG5cdFx0XHRpZiAoc3ViQ29uZmlnUGFyYW0udHlwZSA9PSAnVGV4dElucHV0JyAmJiBzdWJDb25maWdQYXJhbS5hdHRyaWJ1dGVzICE9IG51bGwgJiYgc3ViQ29uZmlnUGFyYW0uYXR0cmlidXRlcy50eXBlID09ICdwYXNzd29yZCcpXG5cdFx0XHRcdGNvbC50ZW1wbGF0ZSA9IGAjPSAn4oCiJy5yZXBlYXQoZGF0YS4ke3N1YkNvbmZpZ1BhcmFtLm5hbWV9Lmxlbmd0aCkgI2A7XG5cblx0XHRcdGNvbHVtbnMucHVzaChjb2wpO1xuXHRcdH1cblxuXHRcdC8vIEluaXRpYWxpemUgZ3JpZFxuXHRcdGxldCBncmlkSHRtbCA9IHRoaXMuX3dpZGdldEh0bWwuZmluZChgIyR7JC5lc2NhcGVTZWxlY3Rvcih0aGlzLl9kYXRhLm5hbWUpfWApO1xuXG5cdFx0Z3JpZEh0bWwua2VuZG9HcmlkKHtcblx0XHRcdHJlc2l6YWJsZTogdHJ1ZSxcblx0XHRcdHNlbGVjdGFibGU6IHRoaXMuX2RhdGEuZWRpdGFibGUgPyAncm93JyA6IGZhbHNlLFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uR3JpZFNlbGVjdGlvbkNoYW5nZSwgdGhpcyksXG5cdFx0XHRjb2x1bW5zOiBjb2x1bW5zLFxuXHRcdFx0bm9SZWNvcmRzOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiAnTm8gaXRlbXMuJ1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gU2F2ZSByZWYuIHRvIHdpZGdldFxuXHRcdHRoaXMuX2dyaWRXaWRnZXQgPSBncmlkSHRtbC5kYXRhKCdrZW5kb0dyaWQnKTtcblxuXHRcdC8vIFNob3cgdG9vdGlwIGlmIGdyaWQncyBjZWxsIGNvbnRlbnQgZXhjZWVkcyBjZWxsIHdpZHRoIChlbGxpcHNpcyBpcyBkaXNwbGF5ZWQgYnkgS2VuZG8gR3JpZClcblx0XHRncmlkSHRtbC5rZW5kb1Rvb2x0aXAoe1xuXHRcdFx0ZmlsdGVyOiAndGQnLFxuXHRcdFx0c2hvdzogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHQvLyBOZXZlciBzaG93IHRvb2x0aXAuLi5cblx0XHRcdFx0dGhpcy5jb250ZW50LnBhcmVudCgpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblxuXHRcdFx0XHQvLyAuLi51bmxlc3MgY29udGVudCBpcyByZXR1cm5lZCAoc2VlIGJlbG93KSBkdWUgdG8gY2VsbCB3aWR0aCBiZWluZyBleGNlZWRlZFxuXHRcdFx0XHRpZiAodGhpcy5jb250ZW50LnRleHQoKSAhPSAnJylcblx0XHRcdFx0XHR0aGlzLmNvbnRlbnQucGFyZW50KCkuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHRcdH0sXG5cdFx0XHRoaWRlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dGhpcy5jb250ZW50LnBhcmVudCgpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcblx0XHRcdH0sXG5cdFx0XHRjb250ZW50OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdGxldCBlbGVtZW50ID0gZS50YXJnZXRbMF07XG5cdFx0XHRcdGlmIChlbGVtZW50Lm9mZnNldFdpZHRoIDwgZWxlbWVudC5zY3JvbGxXaWR0aClcblx0XHRcdFx0XHRyZXR1cm4gZS50YXJnZXQudGV4dCgpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0cmV0dXJuICcnO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Lypcblx0XHQvLyBJbml0aWFsaXplIGJ1dHRvbiB0b29sdGlwc1xuXHRcdHRoaXMuX3dpZGdldEh0bWwua2VuZG9Ub29sdGlwKHtcblx0XHRcdGZpbHRlcjogJ2J1dHRvbicsXG5cdFx0XHRjb250ZW50OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHJldHVybiBgPGRpdiBjbGFzcz1cImhlbHAtdG9vbHRpcFwiPiR7ZS50YXJnZXQuZGF0YSgndGl0bGUnKX08L2Rpdj5gO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCovXG5cblx0XHQvLyBBZGQgYnV0dG9uIGxpc3RlbmVyc1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdHRoaXMuX2FkZEJ1dHRvbi5jbGljaygkLnByb3h5KHRoaXMuX29uQWRkQ2xpY2ssIHRoaXMpKTtcblx0XHRcdHRoaXMuX2VkaXRCdXR0b24uY2xpY2soJC5wcm94eSh0aGlzLl9vbkVkaXRDbGljaywgdGhpcykpO1xuXHRcdFx0dGhpcy5fcmVtb3ZlQnV0dG9uLmNsaWNrKCQucHJveHkodGhpcy5fb25SZW1vdmVDbGljaywgdGhpcykpO1xuXHRcdH1cblxuXHRcdC8vIFByb2NlZWQgd2l0aCBpbml0aWFsaXphdGlvblxuXHRcdHN1cGVyLl9pbml0aWFsaXplKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRhdGFzb3VyY2UuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdGxldCBkYXRhU291cmNlID0gbmV3IGtlbmRvLmRhdGEuRGF0YVNvdXJjZSh7XG5cdFx0XHRkYXRhOiB0aGlzLl9kYXRhLmxpc3RWYWx1ZXNcblx0XHR9KTtcblxuXHRcdC8vIFJlYWQgY3VycmVudCBob3Jpem9udGFsIHNjcm9sbCB2YWx1ZVxuXHRcdGNvbnN0IHNjcm9sbExlZnQgPSAkKCcuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl9ncmlkV2lkZ2V0LndyYXBwZXIpLnNjcm9sbExlZnQoKTtcblxuXHRcdC8vIENsZWFyIGdyaWQgc2VsZWN0aW9uIGlmIGFueVxuXHRcdHRoaXMuX2dyaWRXaWRnZXQuY2xlYXJTZWxlY3Rpb24oKTtcblxuXHRcdC8vIFNldCB1cGRhdGVkIGdyaWQncyBkYXRhc291cmNlXG5cdFx0dGhpcy5fZ3JpZFdpZGdldC5zZXREYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuXG5cdFx0Ly8gU2V0IGhvcml6b250YWwgc2Nyb2xsXG5cdFx0JCgnLmstZ3JpZC1jb250ZW50JywgdGhpcy5fZ3JpZFdpZGdldC53cmFwcGVyKS5zY3JvbGxMZWZ0KHNjcm9sbExlZnQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gRGVzZWxlY3QgaXRlbVxuXHRcdFx0dGhpcy5fZ3JpZFdpZGdldC5jbGVhclNlbGVjdGlvbigpO1xuXG5cdFx0XHQvLyBFbmFibGUvZGlzYWJsZSBncmlkXG5cdFx0XHR0aGlzLl9ncmlkV2lkZ2V0LndyYXBwZXIuYXR0cignZGlzYWJsZWQnLCAhdGhpcy5fZWRpdEVuYWJsZWQpO1xuXG5cdFx0XHQvLyBFbmFibGUgXCJBZGRcIiBidXR0b25cblx0XHRcdGlmICh0aGlzLl9lZGl0RW5hYmxlZClcblx0XHRcdFx0dGhpcy5fYWRkQnV0dG9uLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBEaXNhYmxlIGFsbCBidXR0b25zXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuX2FkZEJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHR0aGlzLl9lZGl0QnV0dG9uLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdHRoaXMuX3JlbW92ZUJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdF9vbkdyaWRTZWxlY3Rpb25DaGFuZ2UoZSlcblx0e1xuXHRcdGxldCBzZWxlY3RlZFJvd3MgPSB0aGlzLl9ncmlkV2lkZ2V0LnNlbGVjdCgpO1xuXHRcdGxldCBzZWxlY3RlZERhdGFJdGVtcyA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3RlZFJvd3MubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bGV0IGRhdGFJdGVtID0gdGhpcy5fZ3JpZFdpZGdldC5kYXRhSXRlbShzZWxlY3RlZFJvd3NbaV0pO1xuXHRcdFx0c2VsZWN0ZWREYXRhSXRlbXMucHVzaChkYXRhSXRlbSk7XG5cdFx0fVxuXG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgZWRpdCBidXR0b25cblx0XHRpZiAodGhpcy5fZWRpdEJ1dHRvbilcblx0XHRcdHRoaXMuX2VkaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBzZWxlY3RlZERhdGFJdGVtcy5sZW5ndGggPT0gMCk7XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSByZW1vdmUgYnV0dG9uXG5cdFx0aWYgKHRoaXMuX3JlbW92ZUJ1dHRvbilcblx0XHR7XG5cdFx0XHQvLyBBbHdheXMgZGlzYWJsZSBidXR0b24gaWYgbm8gbGlzdCBpdGVtIGlzIHNlbGVjdGVkXG5cdFx0XHR0aGlzLl9yZW1vdmVCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBzZWxlY3RlZERhdGFJdGVtcy5sZW5ndGggPT0gMCk7XG5cblx0XHRcdC8vIEFsc28gZGlzYWJsZSBidXR0b24gaWYgZGVueUVtcHR5ID09IHRydWUgYW5kIGp1c3Qgb25lIGl0ZW0gcmVtYWlucyBpbiB0aGUgbGlzdFxuXHRcdFx0aWYgKHRoaXMuX2RhdGEuZGVueUVtcHR5KVxuXHRcdFx0XHR0aGlzLl9yZW1vdmVCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0aGlzLl9kYXRhLmxpc3RJdGVtcy5sZW5ndGggPD0gMSk7XG5cdFx0fVxuICAgIH1cblxuXHRfb25SZW1vdmVDbGljaygpXG5cdHtcblx0XHRsZXQgc2VsZWN0ZWRJbmRleCA9IHRoaXMuX2dyaWRXaWRnZXQuc2VsZWN0KCkuaW5kZXgoKTtcblxuXHRcdC8vIFJlbW92ZSBpdGVtIGZyb20gbGlzdFxuXHRcdHRoaXMuX2RhdGEucmVtb3ZlTGlzdEl0ZW0oc2VsZWN0ZWRJbmRleCk7XG5cblx0XHQvLyBSZWdlbmVyYXRlIGRhdGFncmlkJ3MgZGF0YXNvdXJjZVxuXHRcdHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cdH1cblxuXHRfb25BZGRDbGljaygpXG5cdHtcblx0XHQvLyBDbG9uZSBkZWZhdWx0IGl0ZW0gYW5kIGFkZCB0byBsaXN0XG5cdFx0bGV0IG5ld0xpc3RJdGVtID0gW107XG5cdFx0Zm9yIChsZXQgc3ViQ1Agb2YgdGhpcy5fZGF0YS5kZWZhdWx0TGlzdEl0ZW0pXG5cdFx0XHRuZXdMaXN0SXRlbS5wdXNoKHN1YkNQLmNsb25lKHRydWUpKTtcblxuXHRcdC8vIENyZWF0ZSBlZGl0IHBvcHVwXG5cdFx0dGhpcy5fb3BlbkVkaXRQYW5lbChuZXdMaXN0SXRlbSk7XG5cdH1cblxuXHRfb25FZGl0Q2xpY2soKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLl9ncmlkV2lkZ2V0LnNlbGVjdCgpLmluZGV4KCk7XG5cblx0XHQvLyBDbG9uZSBzZWxlY3RlZCBpdGVtIGFuZCBhZGQgdG8gbGlzdFxuXHRcdGxldCBjbG9uZWRMaXN0SXRlbSA9IFtdO1xuXHRcdGZvciAobGV0IHN1YkNQIG9mIHRoaXMuX2RhdGEubGlzdEl0ZW1zW3NlbGVjdGVkSW5kZXhdKVxuXHRcdFx0Y2xvbmVkTGlzdEl0ZW0ucHVzaChzdWJDUC5jbG9uZSh0cnVlKSk7XG5cblx0XHQvLyBDcmVhdGUgZWRpdCBwb3B1cFxuXHRcdHRoaXMuX29wZW5FZGl0UGFuZWwoY2xvbmVkTGlzdEl0ZW0sIHNlbGVjdGVkSW5kZXgpO1xuXHR9XG5cblx0X29wZW5FZGl0UGFuZWwoc3ViQ29uZmlnUGFyYW1zQXJyYXksIGVkaXRJbmRleCA9IC0xKVxuXHR7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhpcyBjb25maWd1cmF0aW9uIGl0ZW0gaXMgaW5zaWRlIGEgbW9kYWwgd2luZG93O1xuXHRcdC8vIGlmIHllcywgdGhlIGVkaXQgcGFuZWwgKHdoaWNoIGlzIGEgbW9kYWwgYXMgd2VsbCkgbXVzdCBiZSBjb25maWd1cmVkIHRvIHJlbW92ZSB0aGUgZGFyayBiYWNrZ3JvdW5kXG5cdFx0aWYgKCQodGhpcykucGFyZW50cygnLm1vZGFsJykubGVuZ3RoID4gMClcblx0XHRcdCQoJy5tb2RhbCcsICQodGhpcykpLmF0dHIoJ2RhdGEtYmFja2Ryb3AnLCBmYWxzZSk7XG5cblx0XHQvLyBDcmVhdGUgZGlhbG9nIGNvbnRlbnRcblx0XHR0aGlzLl9pdGVtRWRpdG9yID0gbmV3IExpc3RJdGVtRWRpdG9yKCk7XG5cdFx0dGhpcy5faXRlbUVkaXRvci5kYXRhID0gc3ViQ29uZmlnUGFyYW1zQXJyYXk7XG5cdFx0dGhpcy5faXRlbUVkaXRvci5pbmRleCA9IGVkaXRJbmRleDtcblxuXHRcdGxldCBpdGVtRWRpdG9yID0gJCh0aGlzLl9pdGVtRWRpdG9yKTtcblxuXHRcdC8vIEFwcGVuZCBjb250ZW50IHRvIGRpYWxvZ1xuXHRcdCQoJy5tb2RhbC1ib2R5JywgdGhpcy5fZWRpdERpYWxvZykuYXBwZW5kKGl0ZW1FZGl0b3IpO1xuXG5cdFx0Ly8gU2V0IGRpYWxvZyBtYWluIGJ1dHRvbiB0ZXh0XG5cdFx0JCgnYnV0dG9uLmstcHJpbWFyeScsIHRoaXMuX2VkaXREaWFsb2cpLmh0bWwoZWRpdEluZGV4ID4gLTEgPyAnPGkgY2xhc3M9XCJmYXMgZmEtcGVuIG1yLTFcIj48L2k+VXBkYXRlJyA6ICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzIG1yLTFcIj48L2k+QWRkJyk7XG5cblx0XHQvLyBEaXNwbGF5IGRpYWxvZ1xuXHRcdHRoaXMuX2VkaXREaWFsb2cubW9kYWwoJ3Nob3cnKTtcblx0fVxuXG5cdF9vblN1Ym1pdEJ0Q2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2l0ZW1FZGl0b3IudmFsaWRhdGUoKSlcblx0XHR7XG5cdFx0XHRsZXQgZGF0YSA9IHRoaXMuX2l0ZW1FZGl0b3IuZGF0YTtcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuX2l0ZW1FZGl0b3IuaW5kZXg7XG5cblx0XHRcdC8vIEhpZGUgbW9kYWxcblx0XHRcdHRoaXMuX2VkaXREaWFsb2cubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0Ly8gQ29tcGxldGUgZWRpdGluZ1xuXHRcdFx0dGhpcy5fb25FZGl0Q29tcGxldGUoZGF0YSwgaW5kZXgpO1xuXHRcdH1cblx0fVxuXG5cdF9vbkNhbmNlbEJ0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gSGlkZSBtb2RhbFxuXHRcdHRoaXMuX2VkaXREaWFsb2cubW9kYWwoJ2hpZGUnKTtcblx0fVxuXG5cdF9vbkVkaXRQYW5lbEhpZGRlbihlKVxuXHR7XG5cdFx0Ly8gUmVtb3ZlIGNvbnRlbnQgZnJvbSBkaWFsb2dcblx0XHR0aGlzLl9pdGVtRWRpdG9yLnJlbW92ZSgpO1xuXG5cdFx0Ly8gU2V0IGRpYWxvZyBtYWluIGJ1dHRvbiB0ZXh0XG5cdFx0JCgnYnV0dG9uLmstcHJpbWFyeScsIHRoaXMuX2VkaXREaWFsb2cpLmh0bWwoJy4uLicpO1xuXG5cdFx0dGhpcy5faXRlbUVkaXRvciA9IG51bGw7XG5cdH1cblxuXHRfb25FZGl0Q29tcGxldGUobGlzdEl0ZW0sIGVkaXRJbmRleClcblx0e1xuXHRcdC8vIEFuIGV4aXN0aW5nIGxpc3QgaXRlbSB3YXMgdXBkYXRlZFxuXHRcdGlmIChlZGl0SW5kZXggPiAtMSlcblx0XHRcdHRoaXMuX2RhdGEudXBkYXRlTGlzdEl0ZW0obGlzdEl0ZW0sIGVkaXRJbmRleCk7XG5cblx0XHQvLyBBIG5ldyBsaXN0IGl0ZW0gd2FzIGFkZGVkOyBhZGQgaXQgdG8gdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fZGF0YS5hZGRMaXN0SXRlbShsaXN0SXRlbSk7XG5cblx0XHQvLyBSZWdlbmVyYXRlIGRhdGFncmlkJ3MgZGF0YXNvdXJjZVxuXHRcdHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctZ3JpZCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctZ3JpZCcsIENvbmZpZ0dyaWQpO1xuIiwiZXhwb3J0IGNsYXNzIENvbmZpZ0xhYmVsIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0dGhpcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywnY29uZmlnLWxhYmVsJyk7XG5cdH1cblxuXHRzZXQgdmFsdWUodmFsKVxuXHR7XG5cdFx0aWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJylcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKHZhbCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAodmFsID8gdmFsIDogMCk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAodmFsICE9ICcnID8gdmFsIDogJyZtZGFzaDsnKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1sYWJlbCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctbGFiZWwnLCBDb25maWdMYWJlbCk7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnTnVtZXJpY1N0ZXBwZXIgZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCBhIHNpbXBsZSBsYWJlbCBpcyB1c2VkLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIFNldCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0bGV0IGNvbmZpZyA9IHtcblx0XHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRcdGNsYXNzOiAnZm9ybS1jb250cm9sJyxcblx0XHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHQnZGF0YS1yb2xlJzogJ251bWVyaWN0ZXh0Ym94Jyxcblx0XHRcdFx0J2RhdGEtcmVxdWlyZWQtbXNnJzogJ1JlcXVpcmVkJyxcblx0XHRcdFx0J2RhdGEtZm9ybWF0JzogJyMnLFxuXHRcdFx0XHRyZXF1aXJlZDogJ3JlcXVpcmVkJyxcblx0XHRcdH07XG5cblx0XHRcdC8vIFNldCB3aWRnZXQgYXR0cmlidXRlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldEF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgd2lkZ2V0IGF0dHJpYnV0ZXMgYmFzZWQgb24gdmFsaWRhdGlvbiBydWxlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIENyZWF0ZSB3aWRnZXQncyBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGlucHV0PicsIGNvbmZpZyk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgQ29uZmlnTGFiZWwoKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHdpZGdldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuICAgX2luaXRpYWxpemUoKVxuICAge1xuXHQgICBpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0ICAge1xuXHRcdCAgIC8vIEluaXRpYWxpemUga2VuZG8gd2lkZ2V0XG5cdFx0ICAga2VuZG8uaW5pdCh0aGlzLl93aWRnZXRIdG1sKTtcblxuXHRcdCAgIC8vIFNhdmUgcmVmLiB0byB3aWRnZXRcblx0XHQgICB0aGlzLl9pbm5lcldpZGdldCA9IHRoaXMuX3dpZGdldEh0bWwuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xuXG5cdFx0ICAgLy8gRW5hYmxlIHZhbHVlIGNvbW1pdCBiaW5kaW5nXG5cdFx0ICAgdGhpcy5faW5uZXJXaWRnZXQuYmluZCgnY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0ICAgfVxuXG5cdCAgIC8vIFByb2NlZWQgd2l0aCBpbml0aWFsaXphdGlvblxuXHQgICBzdXBlci5faW5pdGlhbGl6ZSgpO1xuICAgfVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIHRoZSBsYWJlbCB0ZXh0IGlzIHNldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC52YWx1ZSh0aGlzLl9kYXRhLnZhbHVlKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLnZhbHVlID0gdGhpcy5fZGF0YS52YWx1ZTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGlzYWJsZWQgc3RhdGUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldEVkaXRFbmFibGVkKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdFx0dGhpcy5faW5uZXJXaWRnZXQuZW5hYmxlKHRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSBOdW1iZXIodGhpcy5faW5uZXJXaWRnZXQudmFsdWUoKSk7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctbnVtZXJpYy1zdGVwcGVyJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1udW1lcmljLXN0ZXBwZXInLCBDb25maWdOdW1lcmljU3RlcHBlcik7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnVGV4dElucHV0IGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlciB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgYSBzaW1wbGUgbGFiZWwgaXMgdXNlZC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdGxldCBjb25maWcgPSB7XG5cdFx0XHRcdHR5cGU6ICd0ZXh0Jyxcblx0XHRcdFx0Y2xhc3M6ICdmb3JtLWNvbnRyb2wgay10ZXh0Ym94Jyxcblx0XHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHRhdXRvY29tcGxldGU6ICdvZmYnLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRBdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIFNldCBhZGRpdGlvbmFsIHdpZGdldCBhdHRyaWJ1dGVzIGJhc2VkIG9uIHZhbGlkYXRpb24gcnVsZXNcblx0XHRcdHRoaXMuX3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIENyZWF0ZSB3aWRnZXQncyBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGlucHV0PicsIGNvbmZpZyk7XG5cblx0XHRcdC8vIEVuYWJsZSB2YWx1ZSBjb21taXQgYmluZGluZ1xuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBDb25maWdMYWJlbCgpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsKHRoaXMuX2RhdGEudmFsdWUpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsdWUgPSB0aGlzLl9kYXRhLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSB0aGlzLl93aWRnZXRIdG1sLnZhbCgpO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLXRleHQtaW5wdXQnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLXRleHQtaW5wdXQnLCBDb25maWdUZXh0SW5wdXQpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcbmltcG9ydCB7VmVjdG9yM0RJbnB1dH0gZnJvbSAnLi93aWRnZXRzL3ZlY3Rvci0zZC1pbnB1dCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdWZWN0b3IzRCBleHRlbmRzIENvbmZpZ0Zvcm1JdGVtXG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSB3aWRnZXQgdG8gcmVuZGVyIHRoZSBDb25maWdQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIGEgc2ltcGxlIGxhYmVsIGlzIHVzZWQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gQ3JlYXRlIHdpZGdldCdzIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgVmVjdG9yM0RJbnB1dCh0aGlzLl9kYXRhLm5hbWUsIHRoaXMuX2RhdGEudmFsaWRhdG9yID09ICdhb2knKTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRBdHRyaWJ1dGVzKHRoaXMuX3dpZGdldEh0bWwpO1xuXG5cdFx0XHQvLyBFbmFibGUgdmFsdWUgY29tbWl0IGJpbmRpbmdcblx0XHRcdCQodGhpcy5fd2lkZ2V0SHRtbCkub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgQ29uZmlnTGFiZWwoKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIHRoZSBsYWJlbCB0ZXh0IGlzIHNldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC52YWx1ZSA9IHRoaXMuX2RhdGEudmFsdWU7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQkKHRoaXMuX3dpZGdldEh0bWwpLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9vblZhbHVlSW5wdXQoZSlcblx0e1xuXHRcdC8vIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB0byBuZXcgdmFsdWVcblx0XHR0aGlzLl9kYXRhLnZhbHVlID0gdGhpcy5fd2lkZ2V0SHRtbC52YWx1ZTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy12ZWN0b3ItM2QnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLXZlY3Rvci0zZCcsIENvbmZpZ1ZlY3RvcjNEKTtcbiIsImltcG9ydCB7Q29uZmlnRm9ybUl0ZW1GYWN0b3J5fSBmcm9tICcuLi8uLi8uLi91dGlscy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbS1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIExpc3RJdGVtRWRpdG9yIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXHR9XG5cblx0c2V0IGRhdGEoc3ViQ29uZmlnUGFyYW1zQXJyYXkpXG5cdHtcblx0XHR0aGlzLl9kYXRhID0gc3ViQ29uZmlnUGFyYW1zQXJyYXk7XG5cblx0XHR0aGlzLl9idWlsZFZpZXcoKTtcblx0fVxuXG5cdGdldCBkYXRhKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhO1xuXHR9XG5cblx0c2V0IGluZGV4KGluZGV4KVxuXHR7XG5cdFx0dGhpcy5faW5kZXggPSBpbmRleDtcblx0fVxuXG5cdGdldCBpbmRleCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faW5kZXg7XG5cdH1cblxuXHRfYnVpbGRWaWV3KClcblx0e1xuXHRcdC8vIEdlbmVyYXRlIGNvbnRhaW5lciBmb3JtXG5cdFx0dGhpcy5fZm9ybSA9ICQoJzxmb3JtPicsIHtcblx0XHRcdG9uc3VibWl0OiAncmV0dXJuIGZhbHNlOydcblx0XHR9KTtcblxuXHRcdC8vIEFwcGVuZCBmb3JtXG5cdFx0JCh0aGlzKS5hcHBlbmQodGhpcy5fZm9ybSk7XG5cblx0XHQvLyBHZW5lcmF0ZSBmb3JtIGZpZWxkc1xuXHRcdGZvciAobGV0IGNvbmZpZ1BhcmFtIG9mIHRoaXMuX2RhdGEpXG5cdFx0e1xuXHRcdFx0Ly8gQ3JlYXRlIGZvcm0gaXRlbVxuXHRcdFx0bGV0IGZvcm1JdGVtID0gQ29uZmlnRm9ybUl0ZW1GYWN0b3J5LmNyZWF0ZShjb25maWdQYXJhbSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRmb3JtSXRlbS5kYXRhID0gY29uZmlnUGFyYW07XG5cblx0XHRcdC8vIEFkZCBmb3JtIGl0ZW0gdG8gZm9ybVxuXHRcdFx0dGhpcy5fZm9ybS5hcHBlbmQoZm9ybUl0ZW0pO1xuXHRcdH1cblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdmFsaWRhdGlvbiBvbiBmb3JtXG5cdFx0dGhpcy5fdmFsaWRhdG9yID0gdGhpcy5fZm9ybS5rZW5kb1ZhbGlkYXRvcih7XG5cdFx0XHR2YWxpZGF0ZU9uQmx1cjogdHJ1ZSxcblx0XHRcdHJ1bGVzOiB7XG5cdFx0XHRcdC8vIEFkZCBydWxlIHRvIHZhbGlkYXRlIEFPSSBmb3JtIGl0ZW1zP1xuXHRcdFx0XHQvLyAoc2VlOiBodHRwczovL2RlbW9zLnRlbGVyaWsuY29tL2tlbmRvLXVpL3ZhbGlkYXRvci9jdXN0b20tdmFsaWRhdGlvbilcblx0XHRcdFx0YW9pOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tkYXRhLWFvaS1tc2ddJykgJiYgaW5wdXQudmFsKCkgIT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LnZhbCgpID09ICcwLDAsMCcpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXHR9XG5cblx0dmFsaWRhdGUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbGlzdC1pdGVtLWVkaXRvcicpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdsaXN0LWl0ZW0tZWRpdG9yJywgTGlzdEl0ZW1FZGl0b3IpO1xuIiwiZXhwb3J0IGNsYXNzIFZlY3RvcjNESW5wdXQgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcihpZCwgaXNWYWxpZGFibGUpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLmlkID0gaWQ7XG5cdFx0dGhpcy5uYW1lID0gaWQ7XG5cblx0XHR0aGlzLl9pc1ZhbGlkYWJsZSA9IGlzVmFsaWRhYmxlO1xuXG5cdFx0dGhpcy5faW5pdGlhbGl6ZSgpO1xuXHR9XG5cblx0c2V0IGVuYWJsZUNsZWFyKHZhbHVlKVxuXHR7XG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5fY2xlYXJCdXR0b24uc2hvdygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX2NsZWFyQnV0dG9uLmhpZGUoKTtcblx0fVxuXG5cdHNldCBhbGxvd05lZ2F0aXZlKHZhbHVlKVxuXHR7XG5cdFx0aWYgKHZhbHVlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3dpZGdldFguc2V0T3B0aW9ucygge21pbjogbnVsbH0gKTtcblx0XHRcdHRoaXMuX3dpZGdldFkuc2V0T3B0aW9ucygge21pbjogbnVsbH0gKTtcblx0XHRcdHRoaXMuX3dpZGdldFouc2V0T3B0aW9ucygge21pbjogbnVsbH0gKTtcblx0XHR9XG5cdH1cblxuXHRzZXQgdmFsdWUodmFsKVxuXHR7XG5cdFx0dmFyIGNvb3JkcyA9IHZhbC5zcGxpdCgnLCcpO1xuXG5cdFx0aWYgKGNvb3Jkcy5sZW5ndGggPj0gMSlcblx0XHRcdHRoaXMuX3dpZGdldFgudmFsdWUoY29vcmRzWzBdKTtcblxuXHRcdGlmIChjb29yZHMubGVuZ3RoID49IDIpXG5cdFx0XHR0aGlzLl93aWRnZXRZLnZhbHVlKGNvb3Jkc1sxXSk7XG5cblx0XHRpZiAoY29vcmRzLmxlbmd0aCA+PSAzKVxuXHRcdFx0dGhpcy5fd2lkZ2V0Wi52YWx1ZShjb29yZHNbMl0pO1xuXG5cdFx0aWYgKHRoaXMuX2lzVmFsaWRhYmxlKVxuXHRcdFx0dGhpcy5faW5wdXRWYWwudmFsKHRoaXMudmFsdWUpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKClcblx0e1xuXHRcdGlmICh0aGlzLl93aWRnZXRYLnZhbHVlKCkgPT0gbnVsbCAmJiB0aGlzLl93aWRnZXRZLnZhbHVlKCkgPT0gbnVsbCAmJiB0aGlzLl93aWRnZXRaLnZhbHVlKCkgPT0gbnVsbClcblx0XHRcdHJldHVybiAnJztcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0WC52YWx1ZSgpICsgJywnICsgdGhpcy5fd2lkZ2V0WS52YWx1ZSgpICsgJywnICsgdGhpcy5fd2lkZ2V0Wi52YWx1ZSgpO1xuXHR9XG5cblx0X2luaXRpYWxpemUoKVxuXHR7XG5cdFx0Ly8gR2VuZXJhdGUgY29udGFpbmVyIGZvcm1cblx0XHR0aGlzLl9jb250YWluZXIgPSAkKCc8ZGl2PicsIHtcblx0XHRcdGNsYXNzOiAnZm9ybS1pbmxpbmUnXG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgY29udGFpbmVyXG5cdFx0JCh0aGlzKS5hcHBlbmQodGhpcy5fY29udGFpbmVyKTtcblxuXHRcdC8vIFNldCBpbnB1dHMgY29uZmlndXJhdGlvblxuXHRcdGxldCBjb25maWdIdG1sID0ge1xuXHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRjbGFzczogJ2Zvcm0tY29udHJvbCBzaG9ydC00Jyxcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHdpZGdldCBjb25maWd1cmF0aW9uXG5cdFx0bGV0IGNvbmZpZ1dpZGdldCA9IHtcblx0XHRcdG1pbjogMCxcblx0XHRcdHNwaW5uZXJzOiBmYWxzZSxcblx0XHRcdGZvcm1hdDogJyMuIyMjIyMjJyxcblx0XHRcdGRlY2ltYWxzOiA2LFxuXHRcdFx0cm91bmQ6IGZhbHNlLFxuXHRcdFx0c3Bpbm5lcnM6IGZhbHNlLFxuXHRcdFx0cmVzdHJpY3REZWNpbWFsczogZmFsc2UsXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25DaGFuZ2UsIHRoaXMpXG5cdFx0fTtcblxuXHRcdC8vIENyZWF0ZSB3aWRnZXRzXG5cdFx0dGhpcy5faW5wdXRYID0gJCgnPGlucHV0PicsIGNvbmZpZ0h0bWwpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRYKTtcblx0XHR0aGlzLl93aWRnZXRYID0gdGhpcy5faW5wdXRYLmtlbmRvTnVtZXJpY1RleHRCb3goY29uZmlnV2lkZ2V0KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInB4LTFcIj4sPC9zcGFuPicpO1xuXG5cdFx0dGhpcy5faW5wdXRZID0gJCgnPGlucHV0PicsIGNvbmZpZ0h0bWwpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRZKTtcblx0XHR0aGlzLl93aWRnZXRZID0gdGhpcy5faW5wdXRZLmtlbmRvTnVtZXJpY1RleHRCb3goY29uZmlnV2lkZ2V0KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInB4LTFcIj4sPC9zcGFuPicpO1xuXG5cdFx0dGhpcy5faW5wdXRaID0gJCgnPGlucHV0PicsIGNvbmZpZ0h0bWwpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRaKTtcblx0XHR0aGlzLl93aWRnZXRaID0gdGhpcy5faW5wdXRaLmtlbmRvTnVtZXJpY1RleHRCb3goY29uZmlnV2lkZ2V0KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInB4LTFcIj48L3NwYW4+Jyk7IC8vIEFkZGl0aW9uYWwgc3BhY2VyXG5cblx0XHQvLyBDcmVhdGUgaW52aXNpYmxlIGZpZWxkIHRvIGFwcGx5IG92ZXJhbGwgdmFsaWRhdGlvblxuXHRcdGlmICh0aGlzLl9pc1ZhbGlkYWJsZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9pbnB1dFZhbCA9ICQoJzxpbnB1dD4nLCB7bmFtZTogYCR7dGhpcy5uYW1lfS1jdXN0b20tdmFsaWRhdGVgLCAnZGF0YS1hb2ktbXNnJzogJ1ZhbHVlcyBjYW5cXCd0IGFsbCBiZSAwJ30pO1xuXHRcdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZCh0aGlzLl9pbnB1dFZhbCk7XG5cdFx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKGA8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2dcIiBkYXRhLWZvcj1cIiR7dGhpcy5uYW1lfS1jdXN0b20tdmFsaWRhdGVcIj48L3NwYW4+YClcblx0XHRcdHRoaXMuX2lucHV0VmFsLmhpZGUoKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgYW5kIGFwcGVuZCBDbGVhciBidXR0b25cblx0XHR0aGlzLl9jbGVhckJ1dHRvbiA9ICQoJzxidXR0b24+Jywge3R5cGU6ICdidXR0b24nLCBjbGFzczogJ2stYnV0dG9uIGstc2Vjb25kYXJ5IG15LTEnLCB0aXRsZTogJ0NsZWFyJ30pLmFwcGVuZCgkKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4nKSk7XG5cdFx0dGhpcy5fY2xlYXJCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNsZWFyQ2xpY2ssIHRoaXMpKTtcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKHRoaXMuX2NsZWFyQnV0dG9uKTtcblxuXHRcdC8vIEhpZGUgYnV0dG9uIGJ5IGRlZmF1bHRcblx0XHR0aGlzLl9jbGVhckJ1dHRvbi5oaWRlKCk7XG5cdH1cblxuXHRfb25DaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gRW1wdHkgc3RyaW5ncyBhcmUgbm90IGFsbG93ZWRcblx0XHRpZiAodGhpcy5fd2lkZ2V0WC52YWx1ZSgpID09IG51bGwpXG5cdFx0XHR0aGlzLl93aWRnZXRYLnZhbHVlKDApO1xuXG5cdFx0aWYgKHRoaXMuX3dpZGdldFkudmFsdWUoKSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fd2lkZ2V0WS52YWx1ZSgwKTtcblxuXHRcdGlmICh0aGlzLl93aWRnZXRaLnZhbHVlKCkgPT0gbnVsbClcblx0XHRcdHRoaXMuX3dpZGdldFoudmFsdWUoMCk7XG5cblx0XHR0aGlzLl9kaXNwYXRjaENvbW1pdCgpO1xuXHR9XG5cblx0X29uQ2xlYXJDbGljaygpXG5cdHtcblx0XHR0aGlzLl93aWRnZXRYLnZhbHVlKCcnKTtcblx0XHR0aGlzLl93aWRnZXRZLnZhbHVlKCcnKTtcblx0XHR0aGlzLl93aWRnZXRaLnZhbHVlKCcnKTtcblxuXHRcdHRoaXMuX2Rpc3BhdGNoQ29tbWl0KCk7XG5cdH1cblxuXHRfZGlzcGF0Y2hDb21taXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lzVmFsaWRhYmxlKVxuXHRcdFx0dGhpcy5faW5wdXRWYWwudmFsKHRoaXMudmFsdWUpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgndmVjdG9yLTNkLWlucHV0JykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZlY3Rvci0zZC1pbnB1dCcsIFZlY3RvcjNESW5wdXQpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbSc7XG5cbmltcG9ydCB7Q29uZmlnTnVtZXJpY1N0ZXBwZXJ9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1udW1lcmljLXN0ZXBwZXInO1xuaW1wb3J0IHtDb25maWdUZXh0SW5wdXR9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy10ZXh0LWlucHV0JztcbmltcG9ydCB7Q29uZmlnQ2hlY2tCb3h9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1jaGVjay1ib3gnO1xuaW1wb3J0IHtDb25maWdEcm9wRG93bkxpc3R9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kcm9wLWRvd24tbGlzdCc7XG5pbXBvcnQge0NvbmZpZ0dyaWR9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1ncmlkJztcbmltcG9ydCB7Q29uZmlnRHVhbExpc3R9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kdWFsLWxpc3QnO1xuaW1wb3J0IHtDb25maWdWZWN0b3IzRH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLXZlY3Rvci0zZCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdGb3JtSXRlbUZhY3Rvcnlcbntcblx0c3RhdGljIGNyZWF0ZShjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nID0gZmFsc2UpXG5cdHtcblx0XHRzd2l0Y2ggKGNvbmZpZ1BhcmFtLnR5cGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnVGV4dElucHV0Jzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdUZXh0SW5wdXQoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdDaGVja0JveCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnQ2hlY2tCb3goY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdOdW1lcmljU3RlcHBlcic6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnTnVtZXJpY1N0ZXBwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdDb21ib0JveCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnRHJvcERvd25MaXN0KGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnRGF0YUdyaWQnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmZpZ0dyaWQoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdEdWFsTGlzdCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnRHVhbExpc3QoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdWZWN0b3IzRCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnVmVjdG9yM0QoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmZpZ0Zvcm1JdGVtKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpOyAvLyBXaWxsIGxvZyBhbiBlcnJvciBmb3IgbWlzc2luZyBmb3JtIGl0ZW0gdHlwZVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtDb25maWd1cmF0aW9uUGFyYW1ldGVyfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGFyYW1ldGVyJztcbmltcG9ydCB7Q29uZmlnRm9ybUl0ZW1GYWN0b3J5fSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0tZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdJbnRlcmZhY2VCdWlsZGVyXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdC8vIFNldCBzb21lIGNvbnN0YW50c1xuXHRcdHRoaXMuVEFCX1BSRUZJWCA9ICd0YWItJ1xuXHRcdHRoaXMuVEFCX1BBTkVfUFJFRklYID0gJ3RhYnBhbmUtJztcblx0XHR0aGlzLlNFUEFSQVRPUl9CRUZPUkUgPSAnYmVmb3JlJztcblx0XHR0aGlzLlNFUEFSQVRPUl9BRlRFUiA9ICdhZnRlcic7XG5cdH1cblxuXHRkdW1wKG1vZGlmaWVkT25seSA9IGZhbHNlKVxuXHR7XG5cdFx0bGV0IGR1bXBTdHIgPSAnJztcblxuXHRcdGZvciAobGV0IGNwIG9mIHRoaXMuX2NvbmZpZ1BhcmFtcylcblx0XHR7XG5cdFx0XHRpZiAobW9kaWZpZWRPbmx5KVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoY3AuaXNNb2RpZmllZClcblx0XHRcdFx0XHRkdW1wU3RyICs9IGNwLnRvU3RyaW5nKCkgKyAnXFxuJztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0ZHVtcFN0ciArPSBjcC50b1N0cmluZygpICsgJ1xcbic7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2coZHVtcFN0cik7XG5cdH1cblxuXHRidWlsZEludGVyZmFjZShkYXRhLCBtYWluQ29udGFpbmVySWQsIGRpc2FibGVFZGl0ID0gZmFsc2UsIHRhYlN1ZmZpeCA9ICcnKVxuXHR7XG5cdFx0dGhpcy5fbWFpbkNvbnRhaW5lcklkID0gbWFpbkNvbnRhaW5lcklkO1xuXHRcdHRoaXMuX2NvbmZpZ1BhcmFtcyA9IG5ldyBBcnJheSgpO1xuXHRcdHRoaXMuX3ZhbGlkYXRvciA9IG51bGw7XG5cblx0XHRsZXQgaGFzTmV3Rm9ybUl0ZW0gPSBmYWxzZTtcblxuXHRcdC8vY29uc29sZS5sb2coZGF0YS5nZXREdW1wKCkpXG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc2l6ZSgpOyBpKyspXG5cdFx0e1xuXHRcdFx0Ly8gUEFSU0UgREFUQVxuXG5cdFx0XHRsZXQgY29uZmlnUGFyYW0gPSBDb25maWd1cmF0aW9uUGFyYW1ldGVyLmZyb21TZnNPYmplY3QoZGF0YS5nZXQoaSkpO1xuXHRcdFx0dGhpcy5fY29uZmlnUGFyYW1zLnB1c2goY29uZmlnUGFyYW0pO1xuXG5cdFx0XHQvLyBHZXQgdGFiIGFuZCB0YWIgcGFuZSBpZCBmcm9tIGdyb3VwIGlkXG5cdFx0XHRjb25zdCB0YWJJZCA9IHRoaXMuVEFCX1BSRUZJWCArIGNvbmZpZ1BhcmFtLmNhdGVnb3J5SWQgKyAodGFiU3VmZml4ID8gJ18nICsgdGFiU3VmZml4IDogJycpO1xuXHRcdFx0Y29uc3QgdGFiUGFuZUlkID0gdGhpcy5UQUJfUEFORV9QUkVGSVggKyBjb25maWdQYXJhbS5jYXRlZ29yeUlkICsgKHRhYlN1ZmZpeCA/ICdfJyArIHRhYlN1ZmZpeCA6ICcnKTtcblxuXHRcdFx0Ly8gQlVJTEQgSU5URVJGQUNFIDo6IFRBQlNcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSB0YWIgc3BlY2lmaWMgZm9yIHRoaXMgZ3JvdXAgYWxyZWFkeSBleGlzdHMgaW5zaWRlIHRoZSBtYWluQ29udGFpbmVyOiBpZiBub3QsIGNyZWF0ZSBpdFxuXHRcdFx0Ly8gKGEgdGFiIGFscmVhZHkgZXhpc3RzIGlmIGl0IHdhcyBjcmVhdGVkIGluIGEgcHJldmlvdXMgbG9vcClcblx0XHRcdGxldCB0YWIgPSAkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYnMgIyR7dGFiSWR9YCk7XG5cblx0XHRcdGlmICh0YWIubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENyZWF0ZSB0YWIgZm9yIHRhYiBwYW5lXG5cdFx0XHRcdHRhYiA9ICQoJzxsaT4nLCB7Y2xhc3M6ICduYXYtaXRlbSd9KTtcblx0XHRcdFx0dGFiLmFwcGVuZCgkKCc8YT4nLCB7XG5cdFx0XHRcdFx0Y2xhc3M6ICduYXYtbGluaycgKyAoaSA9PSAwID8gJyBhY3RpdmUnIDogJycpLFxuXHRcdFx0XHRcdGlkOiB0YWJJZCxcblx0XHRcdFx0XHQnZGF0YS10b2dnbGUnOiAndGFiJyxcblx0XHRcdFx0XHRocmVmOiAnIycgKyB0YWJQYW5lSWQsXG5cdFx0XHRcdFx0cm9sZTogJ3RhYicsXG5cdFx0XHRcdFx0J2FyaWEtY29udHJvbHMnOiB0YWJQYW5lSWQsXG5cdFx0XHRcdFx0J2FyaWEtc2VsZWN0ZWQnOiAoaSA9PSAwID8gJ3RydWUnIDogJ2ZhbHNlJyksXG5cdFx0XHRcdFx0aHRtbDogY29uZmlnUGFyYW0uY2F0ZWdvcnksXG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvLyBBZGQgdGFiIHRvIGNvbnRhaW5lclxuXHRcdFx0XHQkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYnNgKS5hcHBlbmQodGFiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQlVJTEQgSU5URVJGQUNFIDo6IFRBQiBQQU5FU1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhIHRhYiBwYW5lIHNwZWNpZmljIGZvciB0aGlzIGdyb3VwIGFscmVhZHkgZXhpc3RzIGluc2lkZSB0aGUgbWFpbkNvbnRhaW5lcjogaWYgbm90LCBjcmVhdGUgaXRcblx0XHRcdC8vIChhIHRhYiBwYW5lIGFscmVhZHkgZXhpc3RzIGlmIGl0IHdhcyBjcmVhdGVkIGluIGEgcHJldmlvdXMgbG9vcCBvciBpZiBpdCBleGlzdHMgc3RhdGljYWxseSBpbiB0aGUgaHRtbCAtIGluIGNhc2UgaXQgaXMgbmVlZGVkIHRvIGFkZCBzb21lIHN0YXRpYyBjb250ZW50KVxuXHRcdFx0bGV0IHRhYlBhbmUgPSAkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+ICMke3RhYlBhbmVJZH1gKTtcblxuXHRcdFx0aWYgKHRhYlBhbmUubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENyZWF0ZSB0YWIgcGFuZVxuXHRcdFx0XHR0YWJQYW5lID0gJCgnPGRpdj4nLCB7XG5cdFx0XHRcdFx0Y2xhc3M6ICd0YWItcGFuZScgKyAoaSA9PSAwID8gJyBzaG93IGFjdGl2ZScgOiAnJyksXG5cdFx0XHRcdFx0aWQ6IHRhYlBhbmVJZCxcblx0XHRcdFx0XHRyb2xlOiAndGFicGFuZWwnLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsbGVkYnknOiB0YWJJZCxcblx0XHRcdFx0XHQnZGF0YS1keW5hbWljJzogJ3RydWUnLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBBZGQgdGFiIHBhbmUgdG8gY29udGFpbmVyXG5cdFx0XHRcdCQoYCMke21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzYCkuYXBwZW5kKHRhYlBhbmUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCVUlMRCBJTlRFUkZBQ0UgOjogVEFCIFBBTkVTJyBGT1JNXG5cblx0XHRcdC8vIENoZWNrIGlmIGEgZm9ybSBhbHJlYWR5IGV4aXN0cyBpbnNpZGUgdGhlIHRhYiBwYW5lOiBpZiBub3QsIGNyZWF0ZSBpdFxuXHRcdFx0bGV0IGZvcm0gPSB0YWJQYW5lLmZpbmQoJ2Zvcm0nKTtcblxuXHRcdFx0aWYgKGZvcm0ubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENyZWF0ZSBmb3JtXG5cdFx0XHRcdGZvcm0gPSAkKCc8Zm9ybT4nLCB7XG5cdFx0XHRcdFx0Y2xhc3M6ICcnLFxuXHRcdFx0XHRcdGF1dG9jb21wbGV0ZTogJ29mZidcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGFuIGlubmVyIGZpZWxkc2V0OyB0aGlzIG1pZ2h0IGJlIHVzZWZ1bCB0byBlYXNpbHkgZGlzYWJsZSB0aGUgd2hvbGUgZm9ybSBhdCBvbmNlIChhY3R1YWxseSB3ZSBkb24ndCB1c2UgaXQgYmVjYXVzZSBLZW5kbyB3aWRnZXRzIGFyZSBub3QgZGlzYWJsZWQgYXV0b21hdGljYWxseSlcblx0XHRcdFx0Zm9ybS5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGZpZWxkc2V0PicsIHtcblx0XHRcdFx0XHRcdGNsYXNzOiAnJ1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gQWRkIGZvcm0gdG8gdGFiIHBhbmVcblx0XHRcdFx0dGFiUGFuZS5wcmVwZW5kKGZvcm0pO1xuXG5cdFx0XHRcdC8vIGZvcm0ub24oXCJrZXlwcmVzc1wiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHQvLyBcdC8vIElmIHRoZSB1c2VyIHByZXNzZXMgdGhlIFwiRW50ZXJcIiBrZXkgb24gdGhlIGtleWJvYXJkXG5cdFx0XHRcdC8vIFx0aWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG5cdFx0XHRcdC8vIFx0XHQvLyBDYW5jZWwgdGhlIGRlZmF1bHQgYWN0aW9uLCBpZiBuZWVkZWRcblx0XHRcdFx0Ly8gXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdC8vIFx0XHRjb25zb2xlLmxvZyhcIkVOVEVSXCIpXG5cdFx0XHRcdC8vIFx0fVxuXHRcdFx0XHQvLyB9KTtcblx0XHRcdFx0Zm9ybS5zdWJtaXQoZnVuY3Rpb24oZXZ0KSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJTVUJNSVRcIilcblx0XHRcdFx0XHRldnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBmaWVsZHNldCwgd2hpY2ggaXMgdGhlIGFjdHVhbCBmb3JtIGl0ZW1zIGNvbnRhaW5lclxuXHRcdFx0bGV0IGZpZWxkc2V0ID0gZm9ybS5maW5kKCdmaWVsZHNldCcpO1xuXG5cdFx0XHQvLyBCVUlMRCBJTlRFUkZBQ0UgOjogVEFCIFBBTkVTJyBGT1JNIElURU1TXG5cblx0XHRcdC8vIENoZWNrIGlmIGZvcm0gaXRlbSBhbHJlYWR5IGV4aXN0cyBpbiBmaWVsZHNldDsgaWYgeWVzLCBqdXN0IHVwZGF0ZSBpdHMgZGF0YVxuXHRcdFx0bGV0IGZvcm1JdGVtID0gZmllbGRzZXQuZmluZChgI2Zvcm0taXRlbS0keyQuZXNjYXBlU2VsZWN0b3IoY29uZmlnUGFyYW0ubmFtZSl9YCk7XG5cblx0XHRcdGlmIChmb3JtSXRlbS5sZW5ndGggPT0gMClcblx0XHRcdHtcblx0XHRcdFx0aGFzTmV3Rm9ybUl0ZW0gPSB0cnVlO1xuXG5cdFx0XHRcdGZvcm1JdGVtID0gQ29uZmlnRm9ybUl0ZW1GYWN0b3J5LmNyZWF0ZShjb25maWdQYXJhbSwgIWRpc2FibGVFZGl0KTtcblxuXHRcdFx0XHQvLyBBZGQgc2VwYXJhdG9yIGJlZm9yZVxuXHRcdFx0XHRpZiAoY29uZmlnUGFyYW0uc2VwYXJhdG9yICE9IG51bGwgJiYgY29uZmlnUGFyYW0uc2VwYXJhdG9yLnBvcyA9PSAnYmVmb3JlJylcblx0XHRcdFx0XHRmaWVsZHNldC5hcHBlbmQodGhpcy5fYnVpbGRTZXBhcmF0b3IoY29uZmlnUGFyYW0uc2VwYXJhdG9yKSk7XG5cblx0XHRcdFx0Ly8gQWRkIGZvcm0gaXRlbSB0byBmb3JtXG5cdFx0XHRcdGZpZWxkc2V0LmFwcGVuZChmb3JtSXRlbSk7XG5cblx0XHRcdFx0Ly8gQWRkIHNlcGFyYXRvciBhZnRlclxuXHRcdFx0XHRpZiAoY29uZmlnUGFyYW0uc2VwYXJhdG9yICE9IG51bGwgJiYgY29uZmlnUGFyYW0uc2VwYXJhdG9yLnBvcyA9PSAnYWZ0ZXInKVxuXHRcdFx0XHRcdGZpZWxkc2V0LmFwcGVuZCh0aGlzLl9idWlsZFNlcGFyYXRvcihjb25maWdQYXJhbS5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0Zm9ybUl0ZW1bMF0uZGF0YSA9IGNvbmZpZ1BhcmFtO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBzaG93IGhlbHAgdG9vbHRpcHNcblx0XHRsZXQgYWxsVGFiUGFuZXMgPSAkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZWApO1xuXHRcdGFsbFRhYlBhbmVzLmtlbmRvVG9vbHRpcCh7XG5cdFx0XHRmaWx0ZXI6ICdpW3RpdGxlXS5oZWxwJyxcblx0XHRcdHBvc2l0aW9uOiAncmlnaHQnLFxuXHRcdFx0d2lkdGg6ICcyNTBweCcsXG5cdFx0XHRjb250ZW50OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHJldHVybiBgPGRpdiBjbGFzcz1cImhlbHAtdG9vbHRpcFwiPiR7ZS50YXJnZXQuZGF0YSgndGl0bGUnKX08L2Rpdj5gO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB2YWxpZGF0aW9uIG9uIGZvcm1zJyBtYWluIGNvbnRhaW5lclxuXHRcdHRoaXMuX3ZhbGlkYXRvciA9ICQoYCMke21haW5Db250YWluZXJJZH1gKS5rZW5kb1ZhbGlkYXRvcih7XG5cdFx0XHR2YWxpZGF0ZU9uQmx1cjogdHJ1ZSxcblx0XHRcdHJ1bGVzOiB7XG5cdFx0XHRcdC8vIEFkZCBydWxlIHRvIHZhbGlkYXRlIEFPSSBmb3JtIGl0ZW1zXG5cdFx0XHRcdC8vIChzZWU6IGh0dHBzOi8vZGVtb3MudGVsZXJpay5jb20va2VuZG8tdWkvdmFsaWRhdG9yL2N1c3RvbS12YWxpZGF0aW9uKVxuXHRcdFx0XHRhb2k6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5pcygnW2RhdGEtYW9pLW1zZ10nKSAmJiBpbnB1dC52YWwoKSAhPSAnJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoaW5wdXQudmFsKCkgPT0gJzAsMCwwJylcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvVmFsaWRhdG9yJyk7XG5cdH1cblxuXHRkZXN0cm95SW50ZXJmYWNlKClcblx0e1xuXHRcdC8vIERlc3Ryb3kgYWxsIEtlbmRvIHdpZGdldHMgaW4gZm9ybXNcblx0XHRrZW5kby5kZXN0cm95KCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gZGl2LnRhYi1wYW5lID4gZm9ybWApKTtcblxuXHRcdC8vIFJlbW92ZSBhbGwgdGFic1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFic2ApLmVtcHR5KCk7XG5cblx0XHQvLyBSZW1vdmUgZHluYW1pYyB0YWIgcGFuZXMgKHRhYiBwYW5lcyBjcmVhdGVkIGJ5IEludGVyZmFjZSBCdWlsZGVyKVxuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gZGl2LnRhYi1wYW5lW2RhdGEtZHluYW1pYz1cInRydWVcIl1gKS5yZW1vdmUoKTtcblxuXHRcdC8vIFJlbW92ZSBmb3JtIGluc2lkZSBzdGF0aWMgdGFiIHBhbmVzIChwcmVkZWZpbmVkIHRhYiBwYW5lcyBpbiBodG1sKVxuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gZGl2LnRhYi1wYW5lID4gZm9ybWApLnJlbW92ZSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIFwiYWN0aXZlXCIgY2xhc3MgZnJvbSBzdGF0aWMgdGFiIHBhbmVzIChvdGhlcndpc2UgdGhpcyBjbGFzcyBtZXNzZXMgd2l0aCB0aGUgdGFiIG5hdmlnYXRvciBmdW5jdGlvbmluZylcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZWApLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0fVxuXG5cdGRpc2FibGVJbnRlcmZhY2UoZGlzYWJsZSlcblx0e1xuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIGFsbCBjb25maWcgZm9ybSBpdGVtc1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gKltpZF49J2Zvcm0taXRlbS0nXWApLnByb3AoJ2VkaXRFbmFibGVkJywgIWRpc2FibGUpO1xuXHR9XG5cblx0X2J1aWxkU2VwYXJhdG9yKHNlcGFyYXRvcilcblx0e1xuXHRcdGlmIChzZXBhcmF0b3IudGV4dCA9PSBudWxsKVxuXHRcdFx0cmV0dXJuICQoYDxociBjbGFzcz1cImNvbmZpZy1mb3JtLXNlcGFyYXRvclwiPmApO1xuXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuICQoYDxsYWJlbCBjbGFzcz1cImNvbmZpZy1mb3JtLXNlcGFyYXRvci1sYWJlbCBtYi0zXCI+JHtzZXBhcmF0b3IudGV4dH08L2xhYmVsPmApO1xuXHR9XG5cblx0Z2V0Q2hhbmdlZERhdGEoKVxuXHR7XG5cdFx0bGV0IGNoYW5nZXMgPSBuZXcgU0ZTMlguU0ZTQXJyYXkoKTtcblxuXHRcdGZvciAodmFyIGNwIG9mIHRoaXMuX2NvbmZpZ1BhcmFtcylcblx0XHR7XG5cdFx0XHRpZiAoY3AuaXNNb2RpZmllZClcblx0XHRcdFx0Y2hhbmdlcy5hZGRTRlNPYmplY3QoY3AudG9TZnNPYmplY3QoKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNoYW5nZXM7XG5cdH1cblxuXHRyZXNldElzTW9kaWZpZWQoKVxuXHR7XG5cdFx0Zm9yIChsZXQgY3Agb2YgdGhpcy5fY29uZmlnUGFyYW1zKVxuXHRcdHtcblx0XHRcdGlmIChjcC5pc01vZGlmaWVkKVxuXHRcdFx0XHRjcC5yZXNldElzTW9kaWZpZWQoKTtcblx0XHR9XG5cdH1cblxuXHRjaGVja0lzVmFsaWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHR9XG5cblx0cmVzZXRWYWxpZGF0aW9uKClcblx0e1xuXHRcdHRoaXMuX3ZhbGlkYXRvci5oaWRlTWVzc2FnZXMoKTtcblxuXHRcdC8vIFRoZSBtZXRob2QgYWJvdmUgZG9lc24ndCByZW1vdmUgdGhlIGstaW52YWxpZCBjbGFzc2VzIGFuZCBhcmlhLWludmFsaWQ9XCJ0cnVlXCIgYXR0cmlidXRlcyBmcm9tIGlucHV0c1xuXHRcdC8vIExldCdzIGRvIGl0IG1hbnVhbGx5XG5cdFx0JChgIyR7dGhpcy5fbWFpbkNvbnRhaW5lcklkfSAuay1pbnZhbGlkYCkucmVtb3ZlQ2xhc3MoJ2staW52YWxpZCcpO1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gW2FyaWEtaW52YWxpZD1cInRydWVcIl1gKS5yZW1vdmVBdHRyKCdhcmlhLWludmFsaWQnKTtcblx0fVxuXG5cdGdldENvbmZpZ0Zvcm1JdGVtKGNvbmZpZ1BhcmFtTmFtZSlcblx0e1xuXHRcdGxldCBmb3JtSXRlbSA9ICQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH1gKS5maW5kKGAjZm9ybS1pdGVtLSR7JC5lc2NhcGVTZWxlY3Rvcihjb25maWdQYXJhbU5hbWUpfWApO1xuXG5cdFx0aWYgKGZvcm1JdGVtLmxlbmd0aCA+IDApXG5cdFx0XHRyZXR1cm4gZm9ybUl0ZW1bMF07XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY3RpdmF0ZUZpcnN0VGFiUGFuZWwoKVxuXHR7XG5cdFx0bGV0IGNvbmZpZ1BhcmFtID0gdGhpcy5fY29uZmlnUGFyYW1zWzBdO1xuXHRcdGNvbnN0IHRhYlBhbmVJZCA9IHRoaXMuVEFCX1BBTkVfUFJFRklYICsgY29uZmlnUGFyYW0uY2F0ZWdvcnlJZDtcblx0XHRsZXQgdGFiUGFuZSA9ICQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gIyR7dGFiUGFuZUlkfWApO1xuXHRcdHRhYlBhbmUuYWRkQ2xhc3MoJ3Nob3cgYWN0aXZlJyk7XG5cdH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGFyYW1ldGVyXG57XG5cdHN0YXRpYyBmcm9tU2ZzT2JqZWN0KGVsZW1lbnQpXG5cdHtcblx0XHRsZXQgY3AgPSBuZXcgQ29uZmlndXJhdGlvblBhcmFtZXRlcigpO1xuXG5cdFx0Ly8gUGFyc2UgY29tbW9uIGRhdGFcblx0XHRjcC5uYW1lID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ25hbWUnKTtcblx0XHRjcC5sYWJlbCA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCdsYWJlbCcpO1xuXHRcdGNwLmNhdGVnb3J5ID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ2NhdGVnb3J5Jyk7XG5cdFx0Y3AuaW1tZWRpYXRlID0gKGVsZW1lbnQuY29udGFpbnNLZXkoJ2ltbWVkaWF0ZScpID8gZWxlbWVudC5nZXRCb29sKCdpbW1lZGlhdGUnKSA6IGZhbHNlKTtcblx0XHRjcC50b29sdGlwID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ3Rvb2x0aXAnKTtcblx0XHRjcC50eXBlID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ3R5cGUnKTtcblx0XHRjcC52YWx1ZSA9IGVsZW1lbnQuZ2V0KCd2YWx1ZScpO1xuXHRcdGNwLnZhbGlkYXRvciA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCd2YWxpZGF0b3InKTtcblx0XHRjcC5lZGl0YWJsZSA9IChlbGVtZW50LmNvbnRhaW5zS2V5KCdlZGl0JykgPyBlbGVtZW50LmdldEJvb2woJ2VkaXQnKSA6IHRydWUpO1xuXHRcdGNwLnRyaWdnZXIgPSAoZWxlbWVudC5jb250YWluc0tleSgndHJpZ2dlcicpID8gZWxlbWVudC5nZXRCb29sKCd0cmlnZ2VyJykgOiBmYWxzZSk7XG5cdFx0Y3AudHJpZ2dlckRhdGEgPSBlbGVtZW50LmdldFNGU0FycmF5KCd0cmlnZ2VyRGF0YScpO1xuXHRcdGNwLmNsaWVudE9ubHkgPSAoZWxlbWVudC5jb250YWluc0tleSgnY2xpZW50T25seScpID8gZWxlbWVudC5nZXRCb29sKCdjbGllbnRPbmx5JykgOiBmYWxzZSk7XG5cdFx0Y3AuZGF0YVByb3ZpZGVyID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ2RhdGFQcm92aWRlcicpO1xuXG5cdFx0Ly8gUGFyc2UgY29tcG9uZW50IHNwZWNpZmljIGF0dHJpYnV0ZXNcblx0XHRsZXQgdG1wQXR0cmlidXRlcyA9IGVsZW1lbnQuZ2V0U0ZTT2JqZWN0KCdhdHRyaWJ1dGVzJyk7XG5cdFx0aWYgKHRtcEF0dHJpYnV0ZXMgIT0gbnVsbClcblx0XHR7XG5cdFx0XHRsZXQgYXR0cmlidXRlcyA9IHt9O1xuXG5cdFx0XHRsZXQga2V5cyA9IHRtcEF0dHJpYnV0ZXMuZ2V0S2V5c0FycmF5KCk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cylcblx0XHRcdFx0YXR0cmlidXRlc1trZXldID0gdG1wQXR0cmlidXRlcy5nZXQoa2V5KTtcblxuXHRcdFx0Y3AuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG5cdFx0fVxuXG5cdFx0Ly8gUGFyc2Ugc2VwYXJhdG9yIHNldHRpbmdzXG5cdFx0bGV0IHRtcFNlcGFyYXRvciA9IGVsZW1lbnQuZ2V0U0ZTT2JqZWN0KCdzZXBhcmF0b3InKTtcblx0XHRpZiAodG1wU2VwYXJhdG9yICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0bGV0IHNlcGFyYXRvciA9IHt9O1xuXG5cdFx0XHRsZXQga2V5czEgPSB0bXBTZXBhcmF0b3IuZ2V0S2V5c0FycmF5KCk7XG5cdFx0XHRmb3IgKGxldCBrZXkxIG9mIGtleXMxKVxuXHRcdFx0XHRzZXBhcmF0b3Jba2V5MV0gPSB0bXBTZXBhcmF0b3IuZ2V0KGtleTEpO1xuXG5cdFx0XHRjcC5zZXBhcmF0b3IgPSBzZXBhcmF0b3I7XG5cdFx0fVxuXG5cdFx0Ly8gUGFyc2UgZGVmYXVsdCBsaXN0IGl0ZW1cblx0XHRsZXQgdG1wRGVmYXVsdExpc3RJdGVtID0gZWxlbWVudC5nZXRTRlNBcnJheSgnZGVmYXVsdExpc3RJdGVtJyk7XG5cdFx0aWYgKHRtcERlZmF1bHRMaXN0SXRlbSAhPSBudWxsICYmIHRtcERlZmF1bHRMaXN0SXRlbS5zaXplKCkgPiAwKVxuXHRcdHtcblx0XHRcdGxldCBkZWZhdWx0TGlzdEl0ZW0gPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0bXBEZWZhdWx0TGlzdEl0ZW0uc2l6ZSgpOyBpKyspXG5cdFx0XHRcdGRlZmF1bHRMaXN0SXRlbS5wdXNoKENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIuZnJvbVNmc09iamVjdCh0bXBEZWZhdWx0TGlzdEl0ZW0uZ2V0U0ZTT2JqZWN0KGkpKSk7XG5cblx0XHRcdGNwLmRlZmF1bHRMaXN0SXRlbSA9IGRlZmF1bHRMaXN0SXRlbTtcblxuXHRcdFx0Ly8gUGFyc2UgbGlzdCB2YWx1ZXNcblx0XHRcdGxldCBsaXN0VmFsdWVzID0gW107XG5cblx0XHRcdGxldCB0bXBMaXN0VmFsdWVzID0gZWxlbWVudC5nZXRTRlNBcnJheSgnbGlzdFZhbHVlcycpO1xuXHRcdFx0aWYgKHRtcExpc3RWYWx1ZXMgIT0gbnVsbCAmJiB0bXBMaXN0VmFsdWVzLnNpemUoKSA+IDApXG5cdFx0XHR7XG5cdFx0XHRcdGZvciAobGV0IHYgPSAwOyB2IDwgdG1wTGlzdFZhbHVlcy5zaXplKCk7IHYrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBsaXN0VmFsdWVPYmogPSB0bXBMaXN0VmFsdWVzLmdldFNGU09iamVjdCh2KTtcblx0XHRcdFx0XHRsZXQgb2JqID0ge307XG5cblx0XHRcdFx0XHRsZXQga2V5czIgPSBsaXN0VmFsdWVPYmouZ2V0S2V5c0FycmF5KCk7XG5cdFx0XHRcdFx0Zm9yIChsZXQga2V5MiBvZiBrZXlzMilcblx0XHRcdFx0XHRcdG9ialtrZXkyXSA9IGxpc3RWYWx1ZU9iai5nZXQoa2V5Mik7XG5cblx0XHRcdFx0XHRsaXN0VmFsdWVzLnB1c2gob2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjcC5saXN0VmFsdWVzID0gbGlzdFZhbHVlcztcblxuXHRcdFx0Ly8gSWYgd2UgaGF2ZSBhIGxpc3QsIG9uIHRoZSBzZXJ2ZXItc2lkZSBpdGVtcyBjb3VsZCBiZSByZXByZXNlbnRlZCBieSBhIGNsYXNzXG5cdFx0XHRjcC5jbGF6eiA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCdjbGF6eicpO1xuXG5cdFx0XHQvLyBBdm9pZCBsaXN0IHRvIGJlIGVtcHRpZWRcblx0XHRcdGNwLmRlbnlFbXB0eSA9IChlbGVtZW50LmNvbnRhaW5zS2V5KCdkZW55RW1wdHknKSA/IGVsZW1lbnQuZ2V0Qm9vbCgnZGVueUVtcHR5JykgOiBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNwO1xuXHR9XG5cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0LyogQ09OU1RBTlRTICovXG5cdFx0dGhpcy5ERUZBVUxUX0NBVEVHT1JZX05BTUUgPSAnR2VuZXJhbCc7XG5cdFx0dGhpcy5ERUZBVUxUX0NBVEVHT1JZX0lEID0gJ2dlbmVyYWwnO1xuXG5cdFx0LyogUFVCTElDIFZBUlMgKi9cblxuXHRcdHRoaXMubmFtZSA9ICcnO1xuXHRcdHRoaXMubGFiZWwgPSAnJztcblx0XHR0aGlzLnRvb2x0aXAgPSAnJztcblx0XHR0aGlzLnR5cGUgPSBudWxsO1xuXHRcdHRoaXMudHJpZ2dlciA9IGZhbHNlO1xuXHRcdHRoaXMudHJpZ2dlckRhdGEgPSBudWxsO1xuXHRcdHRoaXMuY2xpZW50T25seSA9IGZhbHNlO1xuXHRcdHRoaXMuZWRpdGFibGUgPSB0cnVlO1xuXHRcdHRoaXMuYXR0cmlidXRlcyA9IG51bGw7XG5cdFx0dGhpcy5kYXRhUHJvdmlkZXIgPSBudWxsO1xuXG5cdFx0dGhpcy5zZXBhcmF0b3IgPSBudWxsO1x0XHRcdC8vIFBhcmFtZXRlciB1c2VkIHRvIGNyZWF0ZSBhIHNlcGFyYXRvciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGNvbmZpZyBwYXJhbWV0ZXJcblx0XHR0aGlzLmRlZmF1bHRMaXN0SXRlbSA9IG51bGw7XHQvLyBMaXN0IG9mIHN1Yi1Db25maWd1cmF0aW9uUGFyYW1ldGVycywgZWFjaCBjb250YWluaW5nIHRoZSBkZWZhdWx0IHZhbHVlc1xuXHRcdHRoaXMuY2xhenogPSBudWxsO1x0XHRcdFx0Ly8gTmFtZSBvZiB0aGUgY2xhc3MgcmVwcmVzZW50aW5nIHRoZSBsaXN0IGl0ZW0gKG5vdCB1c2VkIGluIGNhc2Ugb2YgcHJpbWl0ZXZlIGRhdGEgdHlwZXMpXG5cdFx0dGhpcy5kZW55RW1wdHkgPSBmYWxzZTtcdFx0XHQvLyBEaXNhbGxvdyB0byBlbXB0eSBhIGxpc3QgKERhdGFHcmlkIGNvbmZpZyBwYXJhbWV0ZXIgdHlwZSBvbmx5KVxuXG5cdFx0dGhpcy5pbW1lZGlhdGUgPSBmYWxzZTtcdFx0XHQvLyBTaG93cyBpY29uIGluZGljYXRpbmcgdGhhdCBzZXR0aW5nIHdpbGwgYmUgYXBwbGllZCBpbW1lZGlhdGVseSBvbiBzdWJtaXQsIHdpdGhvdXQgdGhlIG5lZWQgZm9yIGEgc2VydmVyIHJlc3RhcnRcblxuXHRcdC8qIFBSSVZBVEUgVkFSUyAqL1xuXG5cdFx0dGhpcy5fY2F0ZWdvcnkgPSB0aGlzLkRFRkFVTFRfQ0FURUdPUllfTkFNRTtcblx0XHR0aGlzLl9jYXRlZ29yeUlkID0gdGhpcy5ERUZBVUxUX0NBVEVHT1JZX0lEO1xuXHRcdHRoaXMuX3ZhbHVlID0gbnVsbDtcblx0XHR0aGlzLl9pbml0aWFsVmFsdWUgPSBudWxsO1x0XHQvLyBTYXZlIHRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBjb25maWd1cmF0aW9uIHBhcmFtZXRlciwgdG8gY2hlY2sgaWYgdGhlIHZhbHVlIHdhcyBtb2RpZmllZFxuXHRcdHRoaXMuX3ZhbGlkYXRvciA9IG51bGw7XG5cblx0XHR0aGlzLl9saXN0SXRlbXMgPSBbXTtcdFx0XHQvLyBBcnJheSBvZiBhcnJheXMgb2YgQ29uZmlndXJhdGlvblBhcmFtZXRlcnNcblx0XHR0aGlzLl9saXN0SXRlbXNDaGFuZ2VkID0gZmFsc2U7XHQvLyBGbGFnIHRvIGJlIHNldCBpbiBjYXNlIGEgbGlzdCBpdGVtIGlzIGFkZGVkIG9yIHJlbW92ZWRcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIEdFVFRFUlMgLyBTRVRURVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0c2V0IGNhdGVnb3J5KHZhbClcblx0e1xuXHRcdGlmICh2YWwpXG5cdFx0e1xuXHRcdFx0dGhpcy5fY2F0ZWdvcnkgPSB2YWw7XG5cdFx0XHR0aGlzLl9zZXRJZEZyb21DYXRlZ29yeU5hbWUodGhpcy5fY2F0ZWdvcnkpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBjYXRlZ29yeSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2F0ZWdvcnk7XG5cdH1cblxuXHRzZXQgdmFsdWUodmFsKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZhbHVlICE9IHZhbClcblx0XHR7XG5cdFx0XHQvLyBJZiB2YWx1ZSBpcyBudWxsLCB0aGVuIHdlIGFyZSBzZXR0aW5nIHRoaXMgZm9yIHRoZSBmaXJzdCB0aW1lIGFuZFxuXHRcdFx0Ly8gd2Ugd2FudCB0byBzYXZlIHRoZSBpbml0aWFsIHZhbHVlLCB0byBjaGVjayBsYXRlciBpZiBpdCBoYXMgYmVlbiBtb2RpZmllZFxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlID09IG51bGwpXG5cdFx0XHRcdHRoaXMuX2luaXRpYWxWYWx1ZSA9IHZhbDtcblxuXHRcdFx0dGhpcy5fdmFsdWUgPSB2YWw7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHZhbHVlKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl92YWx1ZTtcblx0fVxuXG5cdHNldCB2YWxpZGF0b3IodmFsKVxuXHR7XG5cdFx0aWYgKHZhbClcblx0XHRcdHRoaXMuX3ZhbGlkYXRvciA9IHZhbDtcblx0fVxuXG5cdGdldCB2YWxpZGF0b3IoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRvcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBhcnJheSBvZiBvYmplY3RzOyBlYWNoIG9iamVjdCBjb250YWlucyB0aGUgbmFtZS12YWx1ZSBwYWlycyB1c2VkIHRvXG5cdCAqIHBvcHVsYXRlIHRoZSBsaXN0IG9mIHN1Yi1jb25maWd1cmF0aW9uIHBhcmFtZXRlcnMgYXJyYXlzLCBiYXNlZCBvbiBkZWZhdWx0TGlzdEl0ZW0uXG5cdCAqL1xuXHRzZXQgbGlzdFZhbHVlcyhhcnIpXG5cdHtcblx0XHR0aGlzLl9zZXRTdWJDb25maWd1cmF0aW9uUGFyYW1zKGFycik7XG5cdH1cblxuXHRnZXQgbGlzdFZhbHVlcygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0U3ViQ29uZmlndXJhdGlvblBhcmFtc1ZhbHVlcygpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gR0VUVEVSUyBPTkxZXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Z2V0IGlzTW9kaWZpZWQoKVxuXHR7XG5cdFx0bGV0IF9pc01vZGlmaWVkID0gZmFsc2U7XG5cblx0XHQvLyBJZiB0aGUgcGFyYW1ldGVyIGlzIHVzZWQgb24gdGhlIGNsaWVudCBvbmx5IChmb3IgZXhhbXBsZSBpbiBhIGN1c3RvbSB0cmlnZ2VyKVxuXHRcdC8vIHRoZW4gd2UgbmV2ZXIgaGF2ZSB0byBjb25zaWRlciBpdCBhcyBtb2RpZmllZCwgdG8gcHJldmVudCBpdCBiZWluZyBzZW50IHRvIHRoZSBzZXJ2ZXJcblx0XHRpZiAoIXRoaXMuY2xpZW50T25seSlcblx0XHR7XG5cdFx0XHRpZiAodGhpcy5fdmFsdWUgIT0gdGhpcy5faW5pdGlhbFZhbHVlIHx8IHRoaXMuX2xpc3RJdGVtc0NoYW5nZWQpXG5cdFx0XHRcdF9pc01vZGlmaWVkID0gdHJ1ZTtcblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ2hlY2sgc3ViIHBhcmFtZXRlcnNcblx0XHRcdFx0b3V0ZXJMb29wOiBmb3IgKGxldCBsaXN0SXRlbSBvZiB0aGlzLl9saXN0SXRlbXMpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmb3IgKGxldCBzdWJDUCBvZiBsaXN0SXRlbSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoc3ViQ1AuaXNNb2RpZmllZClcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0X2lzTW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRicmVhayBvdXRlckxvb3A7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIF9pc01vZGlmaWVkO1xuXHR9XG5cblx0Z2V0IGNhdGVnb3J5SWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2NhdGVnb3J5SWQ7XG5cdH1cblxuXHRnZXQgbGlzdEl0ZW1zKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9saXN0SXRlbXM7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQVUJMSUMgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBjbG9uZSBvZiB0aGlzIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIuXG5cdCAqL1xuXHRjbG9uZShjbG9uZVZhbHVlID0gZmFsc2UpXG5cdHtcblx0XHRsZXQgY3AgPSBuZXcgQ29uZmlndXJhdGlvblBhcmFtZXRlcigpO1xuXHRcdGNwLm5hbWUgPSB0aGlzLm5hbWU7XG5cdFx0Y3AubGFiZWwgPSB0aGlzLmxhYmVsO1xuXHRcdGNwLmNhdGVnb3J5ID0gdGhpcy5jYXRlZ29yeTtcblx0XHRjcC50b29sdGlwID0gdGhpcy50b29sdGlwO1xuXHRcdGNwLnR5cGUgPSB0aGlzLnR5cGU7XG5cdFx0Y3AudmFsaWRhdG9yID0gdGhpcy52YWxpZGF0b3I7XG5cdFx0Y3AudHJpZ2dlciA9IHRoaXMudHJpZ2dlcjtcblx0XHRjcC50cmlnZ2VyRGF0YSA9ICh0aGlzLnRyaWdnZXJEYXRhICE9IG51bGwgPyBTRlMyWC5TRlNBcnJheS5uZXdGcm9tQmluYXJ5RGF0YSh0aGlzLnRyaWdnZXJEYXRhLnRvQmluYXJ5KCkpIDogbnVsbCk7XG5cdFx0Y3AuY2xpZW50T25seSA9IHRoaXMuY2xpZW50T25seTtcblx0XHRjcC5kYXRhUHJvdmlkZXIgPSB0aGlzLmRhdGFQcm92aWRlcjtcblxuXHRcdGlmIChjbG9uZVZhbHVlKVxuXHRcdFx0Y3AudmFsdWUgPSB0aGlzLnZhbHVlO1xuXG5cdFx0aWYgKHRoaXMuYXR0cmlidXRlcyAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGNwLmF0dHJpYnV0ZXMgPSBuZXcgT2JqZWN0KCk7XG5cdFx0XHRmb3IgKGxldCBzMSBpbiB0aGlzLmF0dHJpYnV0ZXMpXG5cdFx0XHRcdGNwLmF0dHJpYnV0ZXNbczFdID0gdGhpcy5hdHRyaWJ1dGVzW3MxXTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5zZXBhcmF0b3IgIT0gbnVsbClcblx0XHR7XG5cdFx0XHRjcC5zZXBhcmF0b3IgPSBuZXcgT2JqZWN0KClcblx0XHRcdGZvciAobGV0IHMyIGluIHRoaXMuc2VwYXJhdG9yKVxuXHRcdFx0XHRjcC5zZXBhcmF0b3JbczJdID0gdGhpcy5zZXBhcmF0b3JbczJdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmRlZmF1bHRMaXN0SXRlbSAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGxldCBjbG9uZWREZWZhdWx0TGlzdEl0ZW1zID0gW107XG5cblx0XHRcdGZvciAobGV0IHN1YkNQIG9mIHRoaXMuZGVmYXVsdExpc3RJdGVtKVxuXHRcdFx0XHRjbG9uZWREZWZhdWx0TGlzdEl0ZW1zLnB1c2goc3ViQ1AuY2xvbmUoY2xvbmVWYWx1ZSkpO1xuXG5cdFx0XHRjcC5kZWZhdWx0TGlzdEl0ZW0gPSBjbG9uZWREZWZhdWx0TGlzdEl0ZW1zO1xuXHRcdH1cblxuXHRcdGNwLmxpc3RWYWx1ZXMgPSB0aGlzLmxpc3RWYWx1ZXM7IC8vIE5vIG5lZWQgdG8gY2xvbmUgdGhpcywgYXMgdGhlIGxpc3RWYWx1ZXMgc2V0dGVyIGFscmVhZHkgZG9lcyBpdFxuXHRcdGNwLmNsYXp6ID0gdGhpcy5jbGF6ejtcblx0XHRjcC5kZW55RW1wdHkgPSB0aGlzLmRlbnlFbXB0eTtcblx0XHRjcC5pbW1lZGlhdGUgPSB0aGlzLmltbWVkaWF0ZTtcblxuXHRcdHJldHVybiBjcDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldCBpbml0aWFsIHZhbHVlIGJ5IGNvcHlpbmcgdGhlIGN1cnJlbnQgdmFsdWUuXG5cdCAqL1xuXHRyZXNldElzTW9kaWZpZWQoKVxuXHR7XG5cdFx0dGhpcy5faW5pdGlhbFZhbHVlID0gdGhpcy5fdmFsdWU7XG5cblx0XHQvLyBSZXNldCBzdWItcGFyYW1ldGVyc1xuXHRcdGlmICh0aGlzLl9saXN0SXRlbXMgIT0gbnVsbClcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBsaXN0SXRlbSBvZiB0aGlzLl9saXN0SXRlbXMpXG5cdFx0XHR7XG5cdFx0XHRcdGZvciAobGV0IHN1YkNQIG9mIGxpc3RJdGVtKVxuXHRcdFx0XHRcdHN1YkNQLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX2xpc3RJdGVtc0NoYW5nZWQgPSBmYWxzZTtcblx0fVxuXG5cdGFkZExpc3RJdGVtKG5ld0xpc3RJdGVtKVxuXHR7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zLnB1c2gobmV3TGlzdEl0ZW0pO1xuXHRcdHRoaXMuX2xpc3RJdGVtc0NoYW5nZWQgPSB0cnVlO1xuXHR9XG5cblx0dXBkYXRlTGlzdEl0ZW0obGlzdEl0ZW0sIGl0ZW1JbmRleClcblx0e1xuXHRcdHRoaXMuX2xpc3RJdGVtc1tpdGVtSW5kZXhdID0gbGlzdEl0ZW07XG5cdFx0dGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHRyZW1vdmVMaXN0SXRlbShpdGVtSW5kZXgpXG5cdHtcblx0XHR0aGlzLl9saXN0SXRlbXMuc3BsaWNlKGl0ZW1JbmRleCwgMSk7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHR0b1Nmc09iamVjdCgpXG5cdHtcblx0XHRsZXQgb2JqID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXG5cdFx0Ly8gU2V0IGNoYW5nZWQgc2V0dGluZyBuYW1lXG5cdFx0b2JqLnB1dFV0ZlN0cmluZygnbmFtZScsIHRoaXMubmFtZSk7XG5cblx0XHQvLyBTZXQgY2hhbmdlZCBzZXR0aW5nIGNsYXNzLCBpZiBhbnlcblx0XHRpZiAodGhpcy5jbGF6eiAhPSBudWxsKVxuXHRcdFx0b2JqLnB1dFV0ZlN0cmluZygnY2xhenonLCB0aGlzLmNsYXp6KTtcblxuXHRcdGlmICh0aGlzLnZhbHVlICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IGNoYW5nZWQgc2V0dGluZyB2YWx1ZVxuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLnZhbHVlID09PSAnYm9vbGVhbicpXG5cdFx0XHRcdG9iai5wdXRCb29sKCd2YWx1ZScsIHRoaXMudmFsdWUpO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIHRoaXMudmFsdWUgPT09ICdudW1iZXInKVxuXHRcdFx0XHRvYmoucHV0SW50KCd2YWx1ZScsIHRoaXMudmFsdWUpO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRvYmoucHV0VGV4dCgndmFsdWUnLCB0aGlzLnZhbHVlKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIFNldCBjaGFuZ2VkIHNldHRpbmcgbGlzdCBvZiB2YWx1ZXNcblxuXHRcdFx0bGV0IGxpc3RJdGVtcyA9IG5ldyBTRlMyWC5TRlNBcnJheSgpO1xuXG5cdFx0XHRmb3IgKGxldCBhIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHRcdHtcblx0XHRcdFx0aWYgKGEubGVuZ3RoID09IDEpIC8vIFdlIGhhdmUganVzdCBvbmUgc3ViIGNvbmZpZyBwYXJhbTsgbm8gbmVlZCB0byBwYXJzZSBpdCBjb21wbGl0ZWx5XG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaW1wbGUgbGlzdFxuXHRcdFx0XHRcdGxldCB0ZW1wT2JqID0gYVswXS50b1Nmc09iamVjdCgpO1xuXHRcdFx0XHRcdGxldCB3YSA9IHRlbXBPYmouZ2V0V3JhcHBlZEl0ZW0oJ3ZhbHVlJyk7XG5cdFx0XHRcdFx0bGlzdEl0ZW1zLmFkZCh3YS52YWx1ZSwgd2EudHlwZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gQ29tcGxleCBsaXN0XG5cblx0XHRcdFx0XHRsZXQgdmFsdWVzID0gbmV3IFNGUzJYLlNGU0FycmF5KCk7XG5cblx0XHRcdFx0XHRmb3IgKGxldCBzdWJDcCBvZiBhKVxuXHRcdFx0XHRcdFx0dmFsdWVzLmFkZFNGU09iamVjdChzdWJDcC50b1Nmc09iamVjdCgpKTtcblxuXHRcdFx0XHRcdGxpc3RJdGVtcy5hZGRTRlNBcnJheSh2YWx1ZXMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdG9iai5wdXRTRlNBcnJheSgndmFsdWUnLCBsaXN0SXRlbXMpO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIGEgZGVzY3JpcHRpb24gb2YgdGhlIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIgaW5zdGFuY2UuXG5cdCAqL1xuXHR0b1N0cmluZygpXG5cdHtcblx0XHRsZXQgcyA9IGBgO1xuXHRcdHMgKz0gYENvbmZpZ3VyYXRpb24gcGFyYW1ldGVyOiAke3RoaXMubmFtZX1cXG5gO1xuXHRcdHMgKz0gYFxcdHR5cGU6ICR7dGhpcy50eXBlfVxcbmA7XG5cdFx0cyArPSBgXFx0bGFiZWw6ICR7dGhpcy5sYWJlbH1cXG5gO1xuXHRcdHMgKz0gYFxcdGNhdGVnb3J5IG5hbWU6ICR7dGhpcy5jYXRlZ29yeX1cXG5gO1xuXHRcdHMgKz0gYFxcdGNhdGVnb3J5IGlkOiAke3RoaXMuY2F0ZWdvcnlJZH1cXG5gO1xuXHRcdHMgKz0gYFxcdGltbWVkaWF0ZTogJHt0aGlzLmltbWVkaWF0ZX1cXG5gO1xuXHRcdHMgKz0gYFxcdHRvb2x0aXA6ICR7dGhpcy50b29sdGlwfVxcbmA7XG5cdFx0cyArPSBgXFx0dmFsdWU6ICR7dGhpcy52YWx1ZX1cXG5gO1xuXHRcdHMgKz0gYFxcdHRyaWdnZXI6ICR7dGhpcy50cmlnZ2VyfVxcbmA7XG5cdFx0cyArPSBgXFx0dHJpZ2dlciBkYXRhOiAke3RoaXMudHJpZ2dlckRhdGF9XFxuYDtcblx0XHRzICs9IGBcXHRjbGllbnQgb25seTogJHt0aGlzLmNsaWVudE9ubHl9XFxuYDtcblx0XHRzICs9IGBcXHR2YWxpZGF0b3I6ICR7dGhpcy52YWxpZGF0b3J9XFxuYDtcblx0XHRzICs9IGBcXHRpcyBtb2RpZmllZDogJHt0aGlzLmlzTW9kaWZpZWR9XFxuYDtcblxuXHRcdGlmICh0aGlzLmF0dHJpYnV0ZXMgIT0gbnVsbClcblx0XHR7XG5cdFx0XHRzICs9IGBcXHRjb21wb25lbnQgYXR0cmlidXRlczpcXG5gO1xuXG5cdFx0XHRmb3IgKGxldCBzMSBpbiB0aGlzLmF0dHJpYnV0ZXMpXG5cdFx0XHRcdHMgKz0gYFxcdFxcdCR7czF9IC0tPiAke3RoaXMuYXR0cmlidXRlc1tzMV19XFxuYDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5kYXRhUHJvdmlkZXIgIT0gbnVsbClcblx0XHRcdHMgKz0gYFxcdGRhdGEgcHJvdmlkZXI6ICR7dGhpcy5kYXRhUHJvdmlkZXJ9XFxuYDtcblxuXHRcdGlmICh0aGlzLnNlcGFyYXRvciAhPSBudWxsKVxuXHRcdHtcblx0XHRcdHMgKz0gYFxcdHNlcGFyYXRvcjpcXG5gO1xuXG5cdFx0XHRmb3IgKGxldCBzMiBpbiB0aGlzLnNlcGFyYXRvcilcblx0XHRcdFx0cyArPSBgXFx0XFx0JHtzMn0gLS0+ICR7dGhpcy5zZXBhcmF0b3JbczJdfVxcbmA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsICYmIHRoaXMuX2xpc3RJdGVtcy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdHMgKz0gYFxcdCMgbGlzdCBpdGVtczogJHt0aGlzLl9saXN0SXRlbXMubGVuZ3RofVxcbmA7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aDsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRzICs9IGBcXHRsaXN0IGl0ZW0gJHtpfSBzdWItcGFyYW1ldGVyczpcXG5gO1xuXHRcdFx0XHRmb3IgKGxldCBlID0gMDsgZSA8IHRoaXMuX2xpc3RJdGVtc1tpXS5sZW5ndGg7IGUrKylcblx0XHRcdFx0XHRzICs9IGBcXHRcXHQke3RoaXMuX2xpc3RJdGVtc1tpXVtlXS50b0NvbXBhY3RTdHJpbmcoKX1cXG5gO1xuXHRcdFx0fVxuXG5cdFx0XHRzICs9IGBcXHRjbGFzcyBuYW1lOiAke3RoaXMuY2xhenp9XFxuYDtcblx0XHRcdHMgKz0gYFxcdGRlbnkgZW1wdHkgbGlzdDogJHt0aGlzLmRlbnlFbXB0eX1cXG5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNvbXBhY3QgZGVzY3JpcHRpb24gb2YgdGhlIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIgaW5zdGFuY2UuXG5cdCAqL1xuXHR0b0NvbXBhY3RTdHJpbmcoKVxuXHR7XG5cdFx0cmV0dXJuIGBDb25maWd1cmF0aW9uIHBhcmFtZXRlciAnJHt0aGlzLm5hbWV9JzogJHt0aGlzLnZhbHVlfSAke3RoaXMuaXNNb2RpZmllZCA/ICdbWF0nIDogJ1sgXSd9YDtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgY2F0ZWdvcnkgaWQgZm9ybSB0aGUgY2F0ZWdvcnkgbmFtZS5cblx0ICogU3BhY2VzIGFuZCBpbnZhbGlkIGNoYXJhY3RlcnMgYXJlIHJlbW92ZWQ7IHdvcmRzIGFyZSBzZXBhcmF0ZWQgdXNpbmcgY2FwaXRhbHMuXG5cdCAqL1xuXHRfc2V0SWRGcm9tQ2F0ZWdvcnlOYW1lKGNhdGVnb3J5TmFtZSlcblx0e1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSBjYXRlZ29yeU5hbWU7XG5cblx0XHQvLyBTdHJpcCBpbnZhbGlkIGNoYXJhY3RlcnNcblx0XHR2YXIgcGF0dGVybiA9IC9bXjAtOWEtekEtWl0vZztcblx0XHR0aGlzLl9jYXRlZ29yeUlkID0gdGhpcy5fY2F0ZWdvcnlJZC5yZXBsYWNlKHBhdHRlcm4sICcgJyk7XG5cblx0XHQvLyBDYXBpdGFsaXplIHdvcmRzXG5cdFx0dmFyIHdvcmRzID0gdGhpcy5fY2F0ZWdvcnlJZC5zcGxpdCgnICcpO1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSAnJztcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bGV0IHdvcmQgPSB3b3Jkc1tpXTtcblx0XHRcdGlmICh3b3JkLmxlbmd0aCA+IDApXG5cdFx0XHRcdHRoaXMuX2NhdGVnb3J5SWQgKz0gKGkgPiAwID8gd29yZC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpIDogd29yZC5zdWJzdHIoMCwxKS50b0xvd2VyQ2FzZSgpKSArICh3b3JkLmxlbmd0aCA+IDEgPyB3b3JkLnN1YnN0cigxKSA6IFwiXCIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9jYXRlZ29yeUlkLmxlbmd0aCA9PSAwKVxuXHRcdFx0dGhpcy5fY2F0ZWdvcnlJZCA9IHRoaXMuREVGQVVMVF9DQVRFR09SWV9JRDtcblx0fVxuXG5cdF9zZXRTdWJDb25maWd1cmF0aW9uUGFyYW1zKF9saXN0VmFsdWVzKVxuXHR7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zID0gW107XG5cblx0XHRmb3IgKGxldCBvYmogb2YgX2xpc3RWYWx1ZXMpXG5cdFx0e1xuXHRcdFx0bGV0IGxpc3RJdGVtID0gW107XG5cblx0XHRcdGZvciAobGV0IGRlZmF1bHRDUCBvZiB0aGlzLmRlZmF1bHRMaXN0SXRlbSlcblx0XHRcdHtcblx0XHRcdFx0bGV0IHN1YkNQID0gZGVmYXVsdENQLmNsb25lKGZhbHNlKTtcblx0XHRcdFx0c3ViQ1AudmFsdWUgPSBvYmpbc3ViQ1AubmFtZV07XG5cblx0XHRcdFx0bGlzdEl0ZW0ucHVzaChzdWJDUCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2xpc3RJdGVtcy5wdXNoKGxpc3RJdGVtKTtcblx0XHR9XG5cdH1cblxuXHRfZ2V0U3ViQ29uZmlndXJhdGlvblBhcmFtc1ZhbHVlcygpXG5cdHtcblx0XHRsZXQgX2xpc3RWYWx1ZXMgPSBbXTtcblxuXHRcdGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHR7XG5cdFx0XHRsZXQgb2JqID0ge307XG5cblx0XHRcdGZvciAobGV0IHN1YkNQIG9mIGxpc3RJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc3ViQ1AudmFsdWUgIT0gbnVsbClcblx0XHRcdFx0XHRvYmpbc3ViQ1AubmFtZV0gPSBzdWJDUC52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0X2xpc3RWYWx1ZXMucHVzaChvYmopO1xuXHRcdH1cblxuXHRcdHJldHVybiBfbGlzdFZhbHVlcztcblx0fVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeEhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3pMQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDblBBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xYQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDL0VBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdKQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDMVJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==