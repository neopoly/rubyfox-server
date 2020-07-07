/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-12~module-13~module-9"],{

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
		// When this happenso, due to the fact that the object is not yet in the DOM, the event is not catched by the listener
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
				default:
					classNames = 'col-sm-auto';

			}

			// Generate boilerplate html, surrounding the actual widget (label, numeric stepper, etc)
			this.innerHTML = `
				<div class="form-group position-relative row">
					<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
						<label for="${this._data.name}" class="form-label ${(this._data.clientOnly ? 'client-only' : '')}">${this._data.label} <i class="fas fa-question-circle text-muted help" title="${this._data.tooltip}"></i></label>
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
			this._removeButton.prop('disabled', selectedDataItems.length == 0);
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
		this._form = $('<form>', {});

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
		this.defaultListItem = null;		// List of sub-ConfigurationParameters, each containing the default values
		this.clazz = null;				// Name of the class representing the list item (not used in case of primiteve data types)

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTJ+bW9kdWxlLTEzfm1vZHVsZS05LmJ1bmRsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1jaGVjay1ib3guanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWRyb3AtZG93bi1saXN0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kdWFsLWxpc3QuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctZ3JpZC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctbGFiZWwuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLW51bWVyaWMtc3RlcHBlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctdGV4dC1pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctdmVjdG9yLTNkLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL3dpZGdldHMvbGlzdC1pdGVtLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci93aWRnZXRzL3ZlY3Rvci0zZC1pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy91dGlscy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbS1mYWN0b3J5LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL3VpYnVpbGRlci9jb25maWctaW50ZXJmYWNlLWJ1aWxkZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvdXRpbHMvdWlidWlsZGVyL2NvbmZpZ3VyYXRpb24tcGFyYW1ldGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29uZmlnRm9ybUl0ZW19IGZyb20gJy4vY29uZmlnLWZvcm0taXRlbSc7XG5pbXBvcnQge0NvbmZpZ0xhYmVsfSBmcm9tICcuL2NvbmZpZy1sYWJlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdDaGVja0JveCBleHRlbmRzIENvbmZpZ0Zvcm1JdGVtXG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSB3aWRnZXQgdG8gcmVuZGVyIHRoZSBDb25maWdQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIGEgc2ltcGxlIGxhYmVsIGlzIHVzZWQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IHdpZGdldCBjb25maWd1cmF0aW9uXG5cdFx0XHRsZXQgY29uZmlnID0ge1xuXHRcdFx0XHR0eXBlOiAnY2hlY2tib3gnLFxuXHRcdFx0XHRjbGFzczogJycsXG5cdFx0XHRcdGlkOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRcdG5hbWU6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0J2RhdGEtcm9sZSc6ICdzd2l0Y2gnLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzIChzZWUgcGFyZW50IGNsYXNzKVxuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0QXR0cmlidXRlcyhjb25maWcpO1xuXG5cdFx0XHQvLyBTZXQgYWRkaXRpb25hbCB3aWRnZXQgYXR0cmlidXRlcyBiYXNlZCBvbiB2YWxpZGF0aW9uIHJ1bGVzIChzZWUgcGFyZW50IGNsYXNzKVxuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0VmFsaWRhdGlvbkF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIHdpZGdldCdzIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSAkKCc8aW5wdXQ+JywgY29uZmlnKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBDb25maWdMYWJlbCgpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgd2lkZ2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG4gICBfaW5pdGlhbGl6ZSgpXG4gICB7XG5cdCAgIGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHQgICB7XG5cdFx0ICAgLy8gSW5pdGlhbGl6ZSBrZW5kbyB3aWRnZXRcblx0XHQgICBrZW5kby5pbml0KHRoaXMuX3dpZGdldEh0bWwpO1xuXG5cdFx0ICAgLy8gU2F2ZSByZWYuIHRvIHdpZGdldFxuXHRcdCAgIHRoaXMuX2lubmVyV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0SHRtbC5kYXRhKCdrZW5kb1N3aXRjaCcpO1xuXG5cdFx0ICAgLy8gRW5hYmxlIHZhbHVlIGNvbW1pdCBiaW5kaW5nXG5cdFx0ICAgdGhpcy5faW5uZXJXaWRnZXQuYmluZCgnY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0ICAgfVxuXG5cdCAgIC8vIFByb2NlZWQgd2l0aCBpbml0aWFsaXphdGlvblxuXHQgICBzdXBlci5faW5pdGlhbGl6ZSgpO1xuICAgfVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIHRoZSBsYWJlbCB0ZXh0IGlzIHNldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC52YWx1ZSh0aGlzLl9kYXRhLnZhbHVlKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLnZhbHVlID0gdGhpcy5fZGF0YS52YWx1ZTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGlzYWJsZWQgc3RhdGUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldEVkaXRFbmFibGVkKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdFx0dGhpcy5faW5uZXJXaWRnZXQuZW5hYmxlKHRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSB0aGlzLl9pbm5lcldpZGdldC52YWx1ZSgpO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLWNoZWNrLWJveCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctY2hlY2stYm94JywgQ29uZmlnQ2hlY2tCb3gpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0Ryb3BEb3duTGlzdCBleHRlbmRzIENvbmZpZ0Zvcm1JdGVtXG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSB3aWRnZXQgdG8gcmVuZGVyIHRoZSBDb25maWdQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIGEgc2ltcGxlIGxhYmVsIGlzIHVzZWQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IHdpZGdldCBjb25maWd1cmF0aW9uXG5cdFx0XHRsZXQgY29uZmlnID0ge1xuXHRcdFx0XHRjbGFzczogJ2Zvcm0tY29udHJvbCcsXG5cdFx0XHRcdGlkOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRcdG5hbWU6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0J2RhdGEtcm9sZSc6ICdkcm9wZG93bmxpc3QnLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzIChzZWUgcGFyZW50IGNsYXNzKVxuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0QXR0cmlidXRlcyhjb25maWcpO1xuXG5cdFx0XHQvLyBTZXQgYWRkaXRpb25hbCB3aWRnZXQgYXR0cmlidXRlcyBiYXNlZCBvbiB2YWxpZGF0aW9uIHJ1bGVzIChzZWUgcGFyZW50IGNsYXNzKVxuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0VmFsaWRhdGlvbkF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIHdpZGdldCdzIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSAkKCc8aW5wdXQ+JywgY29uZmlnKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBDb25maWdMYWJlbCgpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgd2lkZ2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG4gICBfaW5pdGlhbGl6ZSgpXG4gICB7XG5cdCAgIGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHQgICB7XG5cdFx0ICAgLy8gSW5pdGlhbGl6ZSBrZW5kbyB3aWRnZXRcblx0XHQgICBrZW5kby5pbml0KHRoaXMuX3dpZGdldEh0bWwpO1xuXG5cdFx0ICAgLy8gU2F2ZSByZWYuIHRvIHdpZGdldFxuXHRcdCAgIHRoaXMuX2lubmVyV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0SHRtbC5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xuXG5cdFx0ICAgLy8gU2V0IGxpc3QgaXRlbXNcblx0XHQgICB0aGlzLl9pbm5lcldpZGdldC5zZXREYXRhU291cmNlKHRoaXMuX2dldERhdGFTb3VyY2UodGhpcy5fZGF0YS5kYXRhUHJvdmlkZXIpKVxuXG5cdFx0ICAgLy8gRW5hYmxlIHZhbHVlIGNvbW1pdCBiaW5kaW5nXG5cdFx0ICAgdGhpcy5fd2lkZ2V0SHRtbC5iaW5kKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuX29uVmFsdWVJbnB1dCwgdGhpcykpO1xuXHQgICB9XG5cblx0ICAgLy8gUHJvY2VlZCB3aXRoIGluaXRpYWxpemF0aW9uXG5cdCAgIHN1cGVyLl9pbml0aWFsaXplKCk7XG4gICB9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX2lubmVyV2lkZ2V0LnZhbHVlKHRoaXMuX2RhdGEudmFsdWUpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsdWUgPSB0aGlzLl9kYXRhLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC53cmFwcGVyLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSB0aGlzLl9pbm5lcldpZGdldC52YWx1ZSgpO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0X2dldERhdGFTb3VyY2UoZHBTdHJpbmcpXG5cdHtcblx0XHRpZiAoZHBTdHJpbmcpXG5cdFx0XHRyZXR1cm4gZHBTdHJpbmcuc3BsaXQoJywnKTtcblxuXHRcdC8vIEluIGNhc2UgdGhlIGRhdGFwcm92aWRlciBpcyBlbXB0eSwgYWRkIGF0IGxlYXN0IHRoZSBjdXJyZW50IHZhbHVlXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIFt0aGlzLl9kYXRhLnZhbHVlXTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1kcm9wLWRvd24tbGlzdCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctZHJvcC1kb3duLWxpc3QnLCBDb25maWdEcm9wRG93bkxpc3QpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0R1YWxMaXN0IGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlci5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGRpdj4nKTtcblxuXHRcdGNvbnN0IGF2YWlsYWJsZUlkID0gdGhpcy5fZ2V0SWQodGhpcy5fZGF0YS5uYW1lLCAnYXZhaWxhYmxlJyk7XG5cdFx0Y29uc3Qgc2VsZWN0ZWRJZCA9IHRoaXMuX2dldElkKHRoaXMuX2RhdGEubmFtZSwgJ3NlbGVjdGVkJyk7XG5cblx0XHQvLyBDcmVhdGUgaGVhZGVyIGZvciBsYWJlbHNcblx0XHRsZXQgaGVhZGVyID0gJCgnPGRpdj4nLCB7Y2xhc3M6ICdmb3JtLWxhYmVsLWNvbnRhaW5lciBkdWFsLWxpc3QtbGFiZWxzJ30pO1xuXG5cdFx0aGVhZGVyLmFwcGVuZCgkKCc8bGFiZWw+Jywge1xuXHRcdFx0Y2xhc3M6ICdmb250LWl0YWxpYyBmb3JtLWxhYmVsIGR1YWwtbGlzdC1sZWZ0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHRcdGZvcjogYXZhaWxhYmxlSWQsXG5cdFx0fSkudGV4dCgnQXZhaWxhYmxlJykpO1xuXG5cdFx0aGVhZGVyLmFwcGVuZCgkKCc8bGFiZWw+Jywge1xuXHRcdFx0Y2xhc3M6ICdmb250LWl0YWxpYyBmb250LXdlaWdodC1ib2xkIGZvcm0tbGFiZWwgZHVhbC1saXN0LXJpZ2h0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHRcdGZvcjogc2VsZWN0ZWRJZCxcblx0XHR9KS50ZXh0KCdTZWxlY3RlZCcpKTtcblxuXHRcdHRoaXMuX3dpZGdldEh0bWwuYXBwZW5kKGhlYWRlcik7XG5cblx0XHQvLyBBZGQgYXZhaWxhYmxlIGl0ZW1zIGxpc3Rcblx0XHR0aGlzLl9hdmFpbGFibGVMaXN0SHRtbCA9ICQoJzxzZWxlY3Q+Jywge1xuXHRcdFx0aWQ6IGF2YWlsYWJsZUlkLFxuXHRcdFx0Y2xhc3M6ICdkdWFsLWxpc3QtbGVmdC1jb2wnICsgKCF0aGlzLl9kYXRhLmVkaXRhYmxlID8gJyBuby1pbnRlcmFjdCcgOiAnJyksXG5cdFx0fSk7XG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC5hcHBlbmQodGhpcy5fYXZhaWxhYmxlTGlzdEh0bWwpO1xuXG5cdFx0Ly8gQWRkIHNlbGVjdGVkIGl0ZW1zIGxpc3Rcblx0XHR0aGlzLl9zZWxlY3RlZExpc3RIdG1sID0gJCgnPHNlbGVjdD4nLCB7XG5cdFx0XHRpZDogc2VsZWN0ZWRJZCxcblx0XHRcdGNsYXNzOiAnZHVhbC1saXN0LXJpZ2h0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHR9KTtcblx0XHR0aGlzLl93aWRnZXRIdG1sLmFwcGVuZCh0aGlzLl9zZWxlY3RlZExpc3RIdG1sKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8vIElEcyBjb250YWluaW5nIGEgXCIuXCIgY2F1c2UgaXNzdWVzIHRvIGNvbm5lY3RlZCBsaXN0c1xuXHRfZ2V0SWQobmFtZSwgc3VmZml4KVxuXHR7XG5cdFx0cmV0dXJuIG5hbWUucmVwbGFjZSgnLicsICdfJykgKyAnLScgKyBzdWZmaXg7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB3aWRnZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2luaXRpYWxpemUoKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6ZSBcImF2YWxhYmxlXCIgbGlzdGJveFxuXHRcdHRoaXMuX2F2YWlsYWJsZUxpc3QgPSB0aGlzLl9hdmFpbGFibGVMaXN0SHRtbC5rZW5kb0xpc3RCb3goe1xuICAgICAgICAgICAgY29ubmVjdFdpdGg6IHRoaXMuX2dldElkKHRoaXMuX2RhdGEubmFtZSwgJ3NlbGVjdGVkJyksXG4gICAgICAgICAgICB0b29sYmFyOiB7XG4gICAgICAgICAgICAgICAgdG9vbHM6IHRoaXMuX2RhdGEuZWRpdGFibGUgPyBbJ3RyYW5zZmVyVG8nLCAndHJhbnNmZXJGcm9tJywgJ3RyYW5zZmVyQWxsVG8nLCAndHJhbnNmZXJBbGxGcm9tJ10gOiBbXVxuICAgICAgICAgICAgfSxcblx0XHRcdHRlbXBsYXRlOiBcIjxkaXY+Izp2YWx1ZSM8L2Rpdj5cIixcblx0XHRcdHNlbGVjdGFibGU6ICdtdWx0aXBsZScsXG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvTGlzdEJveCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBcInNlbGVjdGVkXCIgbGlzdGJveFxuICAgICAgICB0aGlzLl9zZWxlY3RlZExpc3QgPSB0aGlzLl9zZWxlY3RlZExpc3RIdG1sLmtlbmRvTGlzdEJveCh7XG5cdFx0XHR0ZW1wbGF0ZTogXCI8ZGl2PiM6dmFsdWUjPC9kaXY+XCIsXG5cdFx0XHRzZWxlY3RhYmxlOiAnbXVsdGlwbGUnLFxuXHRcdFx0Ly8gVGhlIGZvbGxvd2luZyBsaXN0ZW5lcnMgY2FuJ3QgYmUgdXNlZCBiZWNhdXNlIGV2ZW50cyBhcmUgZmlyZWQgYmVmb3JlIHRoZSBkYXRhc291cmNlIGlzIGFjdHVhbGx5IHVwZGF0ZWRcblx0XHRcdC8vIFdlIGhhdmUgdG8gdXNlIGEgY2hhbmdlIGV2ZW50IGxpc3RlbmVyIG9uIHRoZSBkYXRhc291cmNlIChzZWUgYmVsb3cpLCBldmVuIGlmIG5vdCBvcHRpbWFsXG5cdFx0XHQvL2FkZDogJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpLFxuXHRcdFx0Ly9yZW1vdmU6ICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKSxcblx0XHR9KS5kYXRhKCdrZW5kb0xpc3RCb3gnKTtcblxuXHRcdC8vIFByb2NlZWQgd2l0aCBpbml0aWFsaXphdGlvblxuXHRcdHN1cGVyLl9pbml0aWFsaXplKCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRhdGFzb3VyY2UuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdGxldCBhdmFpbGFibGVBcnIgPSB0aGlzLl9kYXRhLmRhdGFQcm92aWRlciAhPSAnJyA/IHRoaXMuX2RhdGEuZGF0YVByb3ZpZGVyLnNwbGl0KCcsJykgOiBbXTtcblx0XHRsZXQgc2VsZWN0ZWRBcnIgPSB0aGlzLl9kYXRhLnZhbHVlICE9ICcnID8gdGhpcy5fZGF0YS52YWx1ZS5zcGxpdCgnLCcpIDogW107XG5cblx0XHQvLyBSZW1vdmUgc2VsZWN0ZWQgdmFsdWVzIGZyb20gYXZhaWxhYmxlIHZhbHVlc1xuXHRcdGlmIChzZWxlY3RlZEFyci5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGxldCB0ZW1wID0gW107XG5cblx0XHRcdGZvciAobGV0IHZhbCBvZiBhdmFpbGFibGVBcnIpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChzZWxlY3RlZEFyci5pbmRleE9mKHZhbCkgPT0gLTEpXG5cdFx0XHRcdFx0dGVtcC5wdXNoKHZhbCk7XG5cdFx0XHR9XG5cblx0XHRcdGF2YWlsYWJsZUFyciA9IHRlbXA7XG5cdFx0fVxuXG5cdFx0Ly8gQ29udmVydCBsaXN0cyBvZiBzdHJpbmdzIHRvIGxpc3RzIG9mIG9iamVjdHNcblx0XHRsZXQgYXZhaWxhYmxlVmFsdWVzID0gW107XG5cdFx0Zm9yIChsZXQgdmFsIG9mIGF2YWlsYWJsZUFycilcblx0XHRcdGF2YWlsYWJsZVZhbHVlcy5wdXNoKHt2YWx1ZTogdmFsfSk7XG5cblx0XHRsZXQgc2VsZWN0ZWRWYWx1ZXMgPSBbXTtcblx0XHRmb3IgKGxldCB2YWwgb2Ygc2VsZWN0ZWRBcnIpXG5cdFx0XHRzZWxlY3RlZFZhbHVlcy5wdXNoKHt2YWx1ZTogdmFsfSk7XG5cblx0XHQvLyBDbGVhciBzZWxlY3Rpb25cblx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG5cdFx0dGhpcy5fc2VsZWN0ZWRMaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG5cblx0XHQvLyBTZXQgZGF0YXNvdXJjZXNcblx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LnNldERhdGFTb3VyY2UobmV3IGtlbmRvLmRhdGEuRGF0YVNvdXJjZSh7XG5cdFx0XHRkYXRhOiBhdmFpbGFibGVWYWx1ZXNcblx0XHR9KSk7XG5cblx0XHR0aGlzLl9zZWxlY3RlZExpc3Quc2V0RGF0YVNvdXJjZShuZXcga2VuZG8uZGF0YS5EYXRhU291cmNlKHtcblx0XHRcdGRhdGE6IHNlbGVjdGVkVmFsdWVzLFxuXHRcdFx0Ly8gV2UgbGlzdGVuIHRvIHRoZSBjaGFuZ2UgZXZlbnQgaW5zdGVhZCBvZiB0aGUgYWRkL3JlbW92ZSBldmVudHMgb24gdGhlIGxpc3Rib3gsIGJlY2F1c2UgdGhvc2UgYXJlIGZpcmVkIGJlZm9yZSB0aGUgZGF0YXNvdXJjZSBpcyB1cGRhdGVkXG5cdFx0XHQvLyBUaGlzIGlzIG5vdCBvcHRpbWFsIGJlY2F1c2UgdGhlIGV2ZW50IGlzIGZpcmVkIGZvciBlYWNoIGl0ZW0gYWRkZWQgdG8gb3IgcmVtb3ZlZCBmcm9tIHRoZSBkYXRhc291cmNlXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKVxuXHRcdH0pKTtcblxuXHRcdC8vIERpc2FibGUgZWRpdGluZ1xuXHRcdGlmICghdGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LmVuYWJsZSgnLmstaXRlbScsIGZhbHNlKTtcblx0XHRcdHRoaXMuX3NlbGVjdGVkTGlzdC5lbmFibGUoJy5rLWl0ZW0nLCBmYWxzZSk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gQ2xlYXIgc2VsZWN0aW9uXG5cdFx0XHR0aGlzLl9hdmFpbGFibGVMaXN0LmNsZWFyU2VsZWN0aW9uKCk7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZExpc3QuY2xlYXJTZWxlY3Rpb24oKTtcblxuXHRcdFx0Ly8gRW5hYmxlL2Rpc2FibGUgbGlzdHNcblx0XHRcdHRoaXMuX2F2YWlsYWJsZUxpc3Qud3JhcHBlci5hdHRyKCdkaXNhYmxlZCcsICF0aGlzLl9lZGl0RW5hYmxlZCk7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZExpc3Qud3JhcHBlci5hdHRyKCdkaXNhYmxlZCcsICF0aGlzLl9lZGl0RW5hYmxlZCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB2YWx1ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHRsZXQgbGlzdERhdGEgPSB0aGlzLl9zZWxlY3RlZExpc3QuZGF0YVNvdXJjZS5kYXRhKCk7XG5cblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gbmV3IHZhbHVlXG5cdFx0dGhpcy5fZGF0YS52YWx1ZSA9IGxpc3REYXRhLm1hcChlID0+IGUudmFsdWUpLmpvaW4oJywnKTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1kdWFsLWxpc3QnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLWR1YWwtbGlzdCcsIENvbmZpZ0R1YWxMaXN0KTtcbiIsImV4cG9ydCBjbGFzcyBDb25maWdGb3JtSXRlbSBleHRlbmRzIEhUTUxFbGVtZW50XG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLmlkID0gJ2Zvcm0taXRlbS0nICsgY29uZmlnUGFyYW0ubmFtZTtcblx0XHR0aGlzLl9lZGl0RW5hYmxlZCA9IGVkaXRFbmFibGVkO1xuXHRcdHRoaXMuX2RhdGEgPSBjb25maWdQYXJhbTtcblxuXHRcdC8vIENyZWF0ZSBmb3JtIGl0ZW0gdmlld1xuXHRcdHRoaXMuX2J1aWxkVmlldyhpbkRpYWxvZyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGZvcm0gaXRlbVxuXHRcdHRoaXMuX2luaXRpYWxpemUoKTtcblx0fVxuXG5cdGNvbm5lY3RlZENhbGxiYWNrKClcblx0e1xuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHQvLyBOT1RFOiB3aGVuIGEgQ29uZmlnRm9ybUl0ZW0gaXMgaW5zdGFudGlhdGVkLCB0aGUgX3RyaWdnZXJFdmVudCBtZXRob2QgaXMgY2FsbGVkIGFzIHNvb24gYXMgaXRzIHZhbHVlIGlzIHNldC5cblx0XHQvLyBXaGVuIHRoaXMgaGFwcGVuc28sIGR1ZSB0byB0aGUgZmFjdCB0aGF0IHRoZSBvYmplY3QgaXMgbm90IHlldCBpbiB0aGUgRE9NLCB0aGUgZXZlbnQgaXMgbm90IGNhdGNoZWQgYnkgdGhlIGxpc3RlbmVyXG5cdFx0Ly8gKHdoaWNoIGlzIGF0dGFjaGVkIHRvIHRoZSBvdXRlciBjb250YWluZXIpLiBTbyBmb3JjaW5nIHRoZSBldmVudCB0byB0cmlnZ2VyIGFnYWluIGFzIHNvb24gYXMgdGhlIENvbmZpZ0Zvcm1JdGVtXG5cdFx0Ly8gaXMgYXBwZW5kZWQgdG8gdGhlIERPTSBpcyBuZWVkZWQuXG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHRzZXQgZGF0YShjb25maWdQYXJhbSlcblx0e1xuXHRcdHRoaXMuX2RhdGEgPSBjb25maWdQYXJhbTtcblx0XHR0aGlzLl9zZXRXaWRnZXRWYWx1ZSgpO1xuXHR9XG5cblx0Z2V0IGRhdGEoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RhdGE7XG5cdH1cblxuXHRzZXQgZWRpdEVuYWJsZWQoZW5hYmxlKVxuXHR7XG5cdFx0aWYgKGVuYWJsZSAhPSB0aGlzLl9lZGl0RW5hYmxlZClcblx0XHR7XG5cdFx0XHR0aGlzLl9lZGl0RW5hYmxlZCA9IGVuYWJsZTtcblx0XHRcdHRoaXMuX3NldFdpZGdldEVkaXRFbmFibGVkKCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGVkaXRFbmFibGVkKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9lZGl0RW5hYmxlZDtcblx0fVxuXG5cdF9idWlsZFZpZXcoaXNJbnNpZGVEaWFsb2cpXG5cdHtcblx0XHRpZiAoIWlzSW5zaWRlRGlhbG9nKVxuXHRcdHtcblx0XHRcdC8vIFNldCBhZGRpdGlvbmFsIGNsYXNzZXMgZm9yIGlubmVyIHdpZGdldFxuXHRcdFx0bGV0IGNsYXNzTmFtZXMgPSAnJztcblxuXHRcdFx0c3dpdGNoICh0aGlzLl9kYXRhLnR5cGUpXG5cdFx0XHR7XG5cdFx0XHRcdGNhc2UgJ0R1YWxMaXN0Jzpcblx0XHRcdFx0XHRjbGFzc05hbWVzID0gJ2NvbC1zbS03IGNvbC1sZy04Jztcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnRGF0YUdyaWQnOlxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSAnY29sLXNtJzsgLy8gVXNlICdjb2wtc20tNyBjb2wtbGctOCcgZm9yIERhdGFHcmlkIHRvbz9cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRjbGFzc05hbWVzID0gJ2NvbC1zbS1hdXRvJztcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZW5lcmF0ZSBib2lsZXJwbGF0ZSBodG1sLCBzdXJyb3VuZGluZyB0aGUgYWN0dWFsIHdpZGdldCAobGFiZWwsIG51bWVyaWMgc3RlcHBlciwgZXRjKVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHBvc2l0aW9uLXJlbGF0aXZlIHJvd1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtc20tNSBjb2wtbGctNCBjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cIiR7dGhpcy5fZGF0YS5uYW1lfVwiIGNsYXNzPVwiZm9ybS1sYWJlbCAkeyh0aGlzLl9kYXRhLmNsaWVudE9ubHkgPyAnY2xpZW50LW9ubHknIDogJycpfVwiPiR7dGhpcy5fZGF0YS5sYWJlbH0gPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiJHt0aGlzLl9kYXRhLnRvb2x0aXB9XCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldCBhbGlnbi1zZWxmLWNlbnRlciAke2NsYXNzTmFtZXN9XCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2dcIiBkYXRhLWZvcj1cIiR7dGhpcy5fZGF0YS5uYW1lfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSBgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIHBvc2l0aW9uLXJlbGF0aXZlXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiJHt0aGlzLl9kYXRhLm5hbWV9XCIgY2xhc3M9XCJmb3JtLWxhYmVsICR7KHRoaXMuX2RhdGEuY2xpZW50T25seSA/ICdjbGllbnQtb25seScgOiAnJyl9XCI+JHt0aGlzLl9kYXRhLmxhYmVsfSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCIke3RoaXMuX2RhdGEudG9vbHRpcH1cIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0XCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2dcIiBkYXRhLWZvcj1cIiR7dGhpcy5fZGF0YS5uYW1lfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRgO1xuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSBpbm5lciB3aWRnZXQgKG11c3QgYmUgb3ZlcnJpZGRlbilcblx0XHRsZXQgd2lkZ2V0ID0gdGhpcy5fZ2VuZXJhdGVJbm5lcldpZGdldCgpO1xuXG5cdFx0Ly8gQXBwZW5kIGlubmVyIHdpZGdldFxuXHRcdCQodGhpcykuZmluZCgnLmlubmVyLXdpZGdldCcpLnByZXBlbmQod2lkZ2V0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUTyBCRSBPVkVSUklEREVOXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHQvLyBTaG93IGFuIGVycm9yLCBzaG91bGQgYmUgb3ZlcnJpZGRlblxuXHRcdGNvbnNvbGUuZXJyb3IoYFVuYWJsZSB0byBjcmVhdGUgJHt0aGlzLl9kYXRhLnR5cGV9IGZvcm0gaXRlbSBmb3IgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXIgJHt0aGlzLmlkfWApO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBhdHRyaWJ1dGVzIG9uIHRoZSB3aWRnZXQgY29uZmlndXJhdGlvbiBvYmplY3QuXG5cdCAqL1xuXHRfc2V0V2lkZ2V0QXR0cmlidXRlcyhjb25maWcpXG5cdHtcblx0XHRjb25zdCBhdHRyaWJzID0gdGhpcy5fZGF0YS5hdHRyaWJ1dGVzO1xuXG5cdFx0aWYgKGF0dHJpYnMpXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgYXR0ciBpbiBhdHRyaWJzKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbYXR0cl0gPSBhdHRyaWJzW2F0dHJdO1xuXG5cdFx0XHRcdGlmIChhdHRyID09ICdwYXR0ZXJuJylcblx0XHRcdFx0XHRjb25maWdbJ2RhdGEtcGF0dGVybi1tc2cnXSA9ICdDb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMnO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgYWRkaXRpb25hbCBhdHRyaWJ1dGVzIG9uIHRoZSB3aWRnZXQgY29uZmlndXJhdGlvbiBvYmplY3QgdG8gcHJvcGVybHkgdmFsaWRhdGUgaW5wdXQuXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsaWRhdGlvbkF0dHJpYnV0ZXMoY29uZmlnKVxuXHR7XG5cdFx0Y29uc3QgdmFsID0gdGhpcy5fZGF0YS52YWxpZGF0b3I7XG5cblx0XHRpZiAodmFsICE9IG51bGwgJiYgdmFsICE9ICcnKVxuXHRcdHtcblx0XHRcdGlmICh2YWwgPT0gJ2lwJylcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlnWydwYXR0ZXJuJ10gPSAnXigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pJCc7XG5cdFx0XHRcdGNvbmZpZ1snZGF0YS1wYXR0ZXJuLW1zZyddID0gJ0ludmFsaWQgSVAgYWRkcmVzcyc7XG5cdFx0XHRcdGNvbmZpZ1sncmVxdWlyZWQnXSA9IHRydWU7XG5cdFx0XHRcdGNvbmZpZ1snZGF0YS1yZXF1aXJlZC1tc2cnXSA9ICdSZXF1aXJlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKHZhbCA9PSAnbm90TnVsbCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpZ1sncmVxdWlyZWQnXSA9IHRydWU7XG5cdFx0XHRcdGNvbmZpZ1snZGF0YS1yZXF1aXJlZC1tc2cnXSA9ICdSZXF1aXJlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKHZhbCA9PSAncHdkJylcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlnWydwYXR0ZXJuJ10gPSAnXi57Nix9JCc7XG5cdFx0XHRcdGNvbmZpZ1snZGF0YS1wYXR0ZXJuLW1zZyddID0gJ01pbmltdW0gbGVuZ3RoOiA2IGNoYXJhY3RlcnMnO1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ3Bvc051bScpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpZ1sncGF0dGVybiddID0gJ15bMC05XVxcZCokJztcblx0XHRcdFx0Y29uZmlnWydkYXRhLXBhdHRlcm4tbXNnJ10gPSAnTm9uLW5lZ2F0aXZlIG51bWJlciByZXF1aXJlZCc7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKHZhbCA9PSAnYW9pJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gTm90aGluZyB0byBkb1xuXHRcdFx0XHQvLyBTZWUgS2VuZG8gdmFsaWRhdGlvbiBpbml0aWFsaXphdGlvbiBpbiBjb25maWctaW50ZXJmYWNlLWJ1aWxkZXIuanNcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAodmFsID09ICd1cmwnKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbJ3R5cGUnXSA9ICd1cmwnO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtdXJsLW1zZyddID0gJ0ludmFsaWQgVVJMJztcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSBmb3JtIGl0ZW0uXG5cdCAqXG5cdCAqIE5PVEU6IG11c3QgYmUgb3ZlcnJpZGRlbiBpZiBpbm5lciB3aWRnZXQgcmVxdWlyZXMgc3BlY2lhbCBpbml0aWFsaXphdGlvbiAoZm9yIGV4YW1wbGUgS2VuZG8gd2lkZ2V0cylcblx0ICovXG5cdF9pbml0aWFsaXplKClcblx0e1xuXHRcdC8vIFNldCB2YWx1ZVxuIFx0ICAgdGhpcy5fc2V0V2lkZ2V0VmFsdWUoKTtcblxuIFx0ICAgLy8gU2V0IGVkaXQgZW5hYmxlZFxuIFx0ICAgdGhpcy5fc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUTyBCRSBPVkVSUklEREVOXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0Ly8gTm90aGluZyB0byBkbywgbXVzdCBiZSBvdmVycmlkZGVuXG5cdH1cblxuXHQvKipcblx0ICogVE8gQkUgT1ZFUlJJRERFTlxuXHQgKi9cblx0X3NldFdpZGdldEVkaXRFbmFibGVkKClcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG8sIG11c3QgYmUgb3ZlcnJpZGRlblxuXHR9XG5cblx0LyoqXG5cdCAqIFRPIEJFIE9WRVJSSURERU5cblx0ICovXG5cdF9vblZhbHVlSW5wdXQoZSlcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG8sIG11c3QgYmUgb3ZlcnJpZGRlblxuXHR9XG5cblx0X3RyaWdnZXJFdmVudCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS50cmlnZ2VyKVxuXHRcdHtcblx0XHRcdGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgndmFsdWUtc2V0Jywge2RldGFpbDogbnVsbCwgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZX0pO1xuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblx0XHR9XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctZm9ybS1pdGVtJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1mb3JtLWl0ZW0nLCBDb25maWdGb3JtSXRlbSk7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuaW1wb3J0IHtMaXN0SXRlbUVkaXRvcn0gZnJvbSAnLi93aWRnZXRzL2xpc3QtaXRlbS1lZGl0b3InO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnR3JpZCBleHRlbmRzIENvbmZpZ0Zvcm1JdGVtXG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSB3aWRnZXQgdG8gcmVuZGVyIHRoZSBDb25maWdQYXJhbWV0ZXIuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0Ly8gQ3JlYXRlIG1haW4gd2lkZ2V0J3MgaHRtbFxuXHRcdHRoaXMuX3dpZGdldEh0bWwgPSAkKCc8ZGl2PicsIHtjbGFzczogJyd9KTtcblxuXHRcdC8vIFNldCBncmlkIHdpZGdldCBjb25maWd1cmF0aW9uXG5cdFx0bGV0IGdyaWRDb25maWcgPSB7XG5cdFx0XHRpZDogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0Y2xhc3M6ICdsaW1pdGVkLWhlaWdodCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKVxuXHRcdH07XG5cblx0XHQvLyBBcHBlbmQgZ3JpZCB0byBtYWluIGh0bWw7IGdyaWQgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gS2VuZG8gd2lkZ2V0IGR1cmluZyBpbml0aWFsaXphdGlvblxuXHRcdHRoaXMuX3dpZGdldEh0bWwuYXBwZW5kKCQoJzxkaXY+JywgZ3JpZENvbmZpZykpO1xuXG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gQlVUVE9OU1xuXG5cdFx0XHQvLyBDcmVhdGUgYnV0dG9ucyBjb250YWluZXJcblx0XHRcdGxldCBidXR0b25zID0gJCgnPGRpdj4nLCB7Y2xhc3M6ICdtdC0yIHRleHQtcmlnaHQnfSk7XG5cblx0XHRcdC8vIEFwcGVuZCBidXR0b25zIHRvIGNvbnRhaW5lclxuXHRcdFx0dGhpcy5fYWRkQnV0dG9uID0gJCgnPGJ1dHRvbj4nLCB7dHlwZTogJ2J1dHRvbicsIGNsYXNzOiAnay1idXR0b24gay1zZWNvbmRhcnknLCB0aXRsZTogJ0FkZCd9KS5hcHBlbmQoJCgnPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT4nKSk7XG5cdFx0XHR0aGlzLl9lZGl0QnV0dG9uID0gJCgnPGJ1dHRvbj4nLCB7dHlwZTogJ2J1dHRvbicsIGNsYXNzOiAnay1idXR0b24gay1zZWNvbmRhcnkgbWwtMicsIHRpdGxlOiAnRWRpdCcsIGRpc2FibGVkOiB0cnVlfSkuYXBwZW5kKCQoJzxpIGNsYXNzPVwiZmFzIGZhLXBlblwiPjwvaT4nKSk7XG5cdFx0XHR0aGlzLl9yZW1vdmVCdXR0b24gPSAkKCc8YnV0dG9uPicsIHt0eXBlOiAnYnV0dG9uJywgY2xhc3M6ICdrLWJ1dHRvbiBrLXNlY29uZGFyeSBtbC0yJywgdGl0bGU6ICdSZW1vdmUnLCBkaXNhYmxlZDogdHJ1ZX0pLmFwcGVuZCgkKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4nKSk7XG5cblx0XHRcdGJ1dHRvbnMuYXBwZW5kKHRoaXMuX2FkZEJ1dHRvbik7XG5cdFx0XHRidXR0b25zLmFwcGVuZCh0aGlzLl9lZGl0QnV0dG9uKTtcblx0XHRcdGJ1dHRvbnMuYXBwZW5kKHRoaXMuX3JlbW92ZUJ1dHRvbik7XG5cblx0XHRcdC8vIEFwcGVuZCBidXR0b25zIGNvbnRhaW5lciB0byBtYWluIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwuYXBwZW5kKGJ1dHRvbnMpO1xuXG5cdFx0XHQvLyBDcmVhdGUgZWRpdCBkaWFsb2dcblx0XHRcdC8vIE5PVEU6IGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgb24gdGhlIGNsb3NlL2NhbmNlbCBidXR0b25zIHdhcyByZW1vdmVkIHRvIHdvcmsgYXJvdW5kIGFuIGlzc3VlIHdpdGggbmVzdGVkIG1vZGFscztcblx0XHRcdC8vIHRoZSBjdXN0b20gXCJkYXRhLWNhbmNlbFwiIGF0dHJpYnV0ZSBpcyB1c2VkIHRvIGFkZCBhIGN1c3RvbSBsaXN0ZW5lciB0byB0aGUgYnV0dG9uc1xuXHRcdFx0dGhpcy5fZWRpdERpYWxvZyA9ICQoYFxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxcIiB0YWJpbmRleD1cIi0xXCIgcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIm1vZGFsVGl0bGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWtleWJvYXJkPVwiZmFsc2VcIiBkYXRhLWJhY2tkcm9wPVwic3RhdGljXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWRcIiByb2xlPVwiZG9jdW1lbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0XHQ8aDUgY2xhc3M9XCJtb2RhbC10aXRsZSB0ZXh0LXByaW1hcnlcIiBpZD1cIm1vZGFsVGl0bGVcIj4ke3RoaXMuX2RhdGEubGFiZWx9PC9oNT5cblx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgZGF0YS1jYW5jZWw9XCJtb2RhbFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IGluLWZsb3ctaW52YWxpZC1tc2dcIj5cblxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmbGV4LWNvbHVtblwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDBcIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMSB0ZXh0LWxlZnRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXByaW1hcnlcIj4uLi48L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xIHRleHQtcmlnaHRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJrLWJ1dHRvbiBrLXNlY29uZGFyeVwiIGRhdGEtY2FuY2VsPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGApO1xuXG5cdFx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gZGlhbG9nIGhpZGUgZXZlbnRcblx0XHRcdHRoaXMuX2VkaXREaWFsb2cub24oJ2hpZGRlbi5icy5tb2RhbCcsICQucHJveHkodGhpcy5fb25FZGl0UGFuZWxIaWRkZW4sIHRoaXMpKTtcblxuXHRcdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIG1haW4gYnV0dG9uIGNsaWNrIGV2ZW50XG5cdFx0XHQkKCdidXR0b24uay1wcmltYXJ5JywgdGhpcy5fZWRpdERpYWxvZykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblN1Ym1pdEJ0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGNsb3NlL2NhbmNlbCBidXR0b25zIGNsaWNrIGV2ZW50XG5cdFx0XHQkKCdidXR0b25bZGF0YS1jYW5jZWw9XCJtb2RhbFwiXScsIHRoaXMuX2VkaXREaWFsb2cpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25DYW5jZWxCdENsaWNrLCB0aGlzKSk7XG5cblx0XHRcdC8vIEFwcGVuZCBlZGl0IGRpYWxvZyB0byBtYWluIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwuYXBwZW5kKHRoaXMuX2VkaXREaWFsb2cpO1xuXHRcdH1cblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHdpZGdldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfaW5pdGlhbGl6ZSgpXG5cdHtcblx0XHRsZXQgY29sdW1ucyA9IFtdO1xuXHRcdGZvciAobGV0IHN1YkNvbmZpZ1BhcmFtIG9mIHRoaXMuX2RhdGEuZGVmYXVsdExpc3RJdGVtKVxuXHRcdHtcblx0XHRcdGxldCBjb2wgPSB7XG5cdFx0XHRcdGZpZWxkOiBzdWJDb25maWdQYXJhbS5uYW1lLFxuXHRcdFx0XHR0aXRsZTogc3ViQ29uZmlnUGFyYW0ubGFiZWwsXG5cdFx0XHRcdHdpZHRoOiAxMjBcblx0XHRcdH1cblxuXHRcdFx0Ly8gRGlzcGxheSBWIG9yIFggZm9yIGJvb2xlYW5zXG5cdFx0XHRpZiAodHlwZW9mIHN1YkNvbmZpZ1BhcmFtLnZhbHVlID09PSAnYm9vbGVhbicpXG5cdFx0XHRcdGNvbC50ZW1wbGF0ZSA9IGAjPSAke3N1YkNvbmZpZ1BhcmFtLm5hbWV9ID8gJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPicgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+JyAjYDtcblxuXHRcdFx0Ly8gSGlkZSBwYXNzd29yZHNcblx0XHRcdGlmIChzdWJDb25maWdQYXJhbS50eXBlID09ICdUZXh0SW5wdXQnICYmIHN1YkNvbmZpZ1BhcmFtLmF0dHJpYnV0ZXMgIT0gbnVsbCAmJiBzdWJDb25maWdQYXJhbS5hdHRyaWJ1dGVzLnR5cGUgPT0gJ3Bhc3N3b3JkJylcblx0XHRcdFx0Y29sLnRlbXBsYXRlID0gYCM9ICfigKInLnJlcGVhdChkYXRhLiR7c3ViQ29uZmlnUGFyYW0ubmFtZX0ubGVuZ3RoKSAjYDtcblxuXHRcdFx0Y29sdW1ucy5wdXNoKGNvbCk7XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBncmlkXG5cdFx0bGV0IGdyaWRIdG1sID0gdGhpcy5fd2lkZ2V0SHRtbC5maW5kKGAjJHskLmVzY2FwZVNlbGVjdG9yKHRoaXMuX2RhdGEubmFtZSl9YCk7XG5cblx0XHRncmlkSHRtbC5rZW5kb0dyaWQoe1xuXHRcdFx0cmVzaXphYmxlOiB0cnVlLFxuXHRcdFx0c2VsZWN0YWJsZTogdGhpcy5fZGF0YS5lZGl0YWJsZSA/ICdyb3cnIDogZmFsc2UsXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25HcmlkU2VsZWN0aW9uQ2hhbmdlLCB0aGlzKSxcblx0XHRcdGNvbHVtbnM6IGNvbHVtbnMsXG5cdFx0XHRub1JlY29yZHM6IHtcblx0XHRcdFx0dGVtcGxhdGU6ICdObyBpdGVtcy4nXG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBTYXZlIHJlZi4gdG8gd2lkZ2V0XG5cdFx0dGhpcy5fZ3JpZFdpZGdldCA9IGdyaWRIdG1sLmRhdGEoJ2tlbmRvR3JpZCcpO1xuXG5cdFx0Ly8gU2hvdyB0b290aXAgaWYgZ3JpZCdzIGNlbGwgY29udGVudCBleGNlZWRzIGNlbGwgd2lkdGggKGVsbGlwc2lzIGlzIGRpc3BsYXllZCBieSBLZW5kbyBHcmlkKVxuXHRcdGdyaWRIdG1sLmtlbmRvVG9vbHRpcCh7XG5cdFx0XHRmaWx0ZXI6ICd0ZCcsXG5cdFx0XHRzaG93OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdC8vIE5ldmVyIHNob3cgdG9vbHRpcC4uLlxuXHRcdFx0XHR0aGlzLmNvbnRlbnQucGFyZW50KCkuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXG5cdFx0XHRcdC8vIC4uLnVubGVzcyBjb250ZW50IGlzIHJldHVybmVkIChzZWUgYmVsb3cpIGR1ZSB0byBjZWxsIHdpZHRoIGJlaW5nIGV4Y2VlZGVkXG5cdFx0XHRcdGlmICh0aGlzLmNvbnRlbnQudGV4dCgpICE9ICcnKVxuXHRcdFx0XHRcdHRoaXMuY29udGVudC5wYXJlbnQoKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xuXHRcdFx0fSxcblx0XHRcdGhpZGU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLmNvbnRlbnQucGFyZW50KCkuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuXHRcdFx0fSxcblx0XHRcdGNvbnRlbnQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0bGV0IGVsZW1lbnQgPSBlLnRhcmdldFswXTtcblx0XHRcdFx0aWYgKGVsZW1lbnQub2Zmc2V0V2lkdGggPCBlbGVtZW50LnNjcm9sbFdpZHRoKVxuXHRcdFx0XHRcdHJldHVybiBlLnRhcmdldC50ZXh0KCk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRyZXR1cm4gJyc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvKlxuXHRcdC8vIEluaXRpYWxpemUgYnV0dG9uIHRvb2x0aXBzXG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC5rZW5kb1Rvb2x0aXAoe1xuXHRcdFx0ZmlsdGVyOiAnYnV0dG9uJyxcblx0XHRcdGNvbnRlbnQ6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0cmV0dXJuIGA8ZGl2IGNsYXNzPVwiaGVscC10b29sdGlwXCI+JHtlLnRhcmdldC5kYXRhKCd0aXRsZScpfTwvZGl2PmA7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ki9cblxuXHRcdC8vIEFkZCBidXR0b24gbGlzdGVuZXJzXG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0dGhpcy5fYWRkQnV0dG9uLmNsaWNrKCQucHJveHkodGhpcy5fb25BZGRDbGljaywgdGhpcykpO1xuXHRcdFx0dGhpcy5fZWRpdEJ1dHRvbi5jbGljaygkLnByb3h5KHRoaXMuX29uRWRpdENsaWNrLCB0aGlzKSk7XG5cdFx0XHR0aGlzLl9yZW1vdmVCdXR0b24uY2xpY2soJC5wcm94eSh0aGlzLl9vblJlbW92ZUNsaWNrLCB0aGlzKSk7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvY2VlZCB3aXRoIGluaXRpYWxpemF0aW9uXG5cdFx0c3VwZXIuX2luaXRpYWxpemUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGF0YXNvdXJjZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0bGV0IGRhdGFTb3VyY2UgPSBuZXcga2VuZG8uZGF0YS5EYXRhU291cmNlKHtcblx0XHRcdGRhdGE6IHRoaXMuX2RhdGEubGlzdFZhbHVlc1xuXHRcdH0pO1xuXG5cdFx0Ly8gUmVhZCBjdXJyZW50IGhvcml6b250YWwgc2Nyb2xsIHZhbHVlXG5cdFx0Y29uc3Qgc2Nyb2xsTGVmdCA9ICQoJy5rLWdyaWQtY29udGVudCcsIHRoaXMuX2dyaWRXaWRnZXQud3JhcHBlcikuc2Nyb2xsTGVmdCgpO1xuXG5cdFx0Ly8gQ2xlYXIgZ3JpZCBzZWxlY3Rpb24gaWYgYW55XG5cdFx0dGhpcy5fZ3JpZFdpZGdldC5jbGVhclNlbGVjdGlvbigpO1xuXG5cdFx0Ly8gU2V0IHVwZGF0ZWQgZ3JpZCdzIGRhdGFzb3VyY2Vcblx0XHR0aGlzLl9ncmlkV2lkZ2V0LnNldERhdGFTb3VyY2UoZGF0YVNvdXJjZSk7XG5cblx0XHQvLyBTZXQgaG9yaXpvbnRhbCBzY3JvbGxcblx0XHQkKCcuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl9ncmlkV2lkZ2V0LndyYXBwZXIpLnNjcm9sbExlZnQoc2Nyb2xsTGVmdCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBEZXNlbGVjdCBpdGVtXG5cdFx0XHR0aGlzLl9ncmlkV2lkZ2V0LmNsZWFyU2VsZWN0aW9uKCk7XG5cblx0XHRcdC8vIEVuYWJsZS9kaXNhYmxlIGdyaWRcblx0XHRcdHRoaXMuX2dyaWRXaWRnZXQud3JhcHBlci5hdHRyKCdkaXNhYmxlZCcsICF0aGlzLl9lZGl0RW5hYmxlZCk7XG5cblx0XHRcdC8vIEVuYWJsZSBcIkFkZFwiIGJ1dHRvblxuXHRcdFx0aWYgKHRoaXMuX2VkaXRFbmFibGVkKVxuXHRcdFx0XHR0aGlzLl9hZGRCdXR0b24uYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG5cblx0XHRcdC8vIERpc2FibGUgYWxsIGJ1dHRvbnNcblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fYWRkQnV0dG9uLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdHRoaXMuX2VkaXRCdXR0b24uYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0dGhpcy5fcmVtb3ZlQnV0dG9uLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0X29uR3JpZFNlbGVjdGlvbkNoYW5nZShlKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkUm93cyA9IHRoaXMuX2dyaWRXaWRnZXQuc2VsZWN0KCk7XG5cdFx0bGV0IHNlbGVjdGVkRGF0YUl0ZW1zID0gW107XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkUm93cy5sZW5ndGg7IGkrKylcblx0XHR7XG5cdFx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl9ncmlkV2lkZ2V0LmRhdGFJdGVtKHNlbGVjdGVkUm93c1tpXSk7XG5cdFx0XHRzZWxlY3RlZERhdGFJdGVtcy5wdXNoKGRhdGFJdGVtKTtcblx0XHR9XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSBlZGl0IGJ1dHRvblxuXHRcdGlmICh0aGlzLl9lZGl0QnV0dG9uKVxuXHRcdFx0dGhpcy5fZWRpdEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIHNlbGVjdGVkRGF0YUl0ZW1zLmxlbmd0aCA9PSAwKTtcblxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIHJlbW92ZSBidXR0b25cblx0XHRpZiAodGhpcy5fcmVtb3ZlQnV0dG9uKVxuXHRcdFx0dGhpcy5fcmVtb3ZlQnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgc2VsZWN0ZWREYXRhSXRlbXMubGVuZ3RoID09IDApO1xuICAgIH1cblxuXHRfb25SZW1vdmVDbGljaygpXG5cdHtcblx0XHRsZXQgc2VsZWN0ZWRJbmRleCA9IHRoaXMuX2dyaWRXaWRnZXQuc2VsZWN0KCkuaW5kZXgoKTtcblxuXHRcdC8vIFJlbW92ZSBpdGVtIGZyb20gbGlzdFxuXHRcdHRoaXMuX2RhdGEucmVtb3ZlTGlzdEl0ZW0oc2VsZWN0ZWRJbmRleCk7XG5cblx0XHQvLyBSZWdlbmVyYXRlIGRhdGFncmlkJ3MgZGF0YXNvdXJjZVxuXHRcdHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cdH1cblxuXHRfb25BZGRDbGljaygpXG5cdHtcblx0XHQvLyBDbG9uZSBkZWZhdWx0IGl0ZW0gYW5kIGFkZCB0byBsaXN0XG5cdFx0bGV0IG5ld0xpc3RJdGVtID0gW107XG5cdFx0Zm9yIChsZXQgc3ViQ1Agb2YgdGhpcy5fZGF0YS5kZWZhdWx0TGlzdEl0ZW0pXG5cdFx0XHRuZXdMaXN0SXRlbS5wdXNoKHN1YkNQLmNsb25lKHRydWUpKTtcblxuXHRcdC8vIENyZWF0ZSBlZGl0IHBvcHVwXG5cdFx0dGhpcy5fb3BlbkVkaXRQYW5lbChuZXdMaXN0SXRlbSk7XG5cdH1cblxuXHRfb25FZGl0Q2xpY2soKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLl9ncmlkV2lkZ2V0LnNlbGVjdCgpLmluZGV4KCk7XG5cblx0XHQvLyBDbG9uZSBzZWxlY3RlZCBpdGVtIGFuZCBhZGQgdG8gbGlzdFxuXHRcdGxldCBjbG9uZWRMaXN0SXRlbSA9IFtdO1xuXHRcdGZvciAobGV0IHN1YkNQIG9mIHRoaXMuX2RhdGEubGlzdEl0ZW1zW3NlbGVjdGVkSW5kZXhdKVxuXHRcdFx0Y2xvbmVkTGlzdEl0ZW0ucHVzaChzdWJDUC5jbG9uZSh0cnVlKSk7XG5cblx0XHQvLyBDcmVhdGUgZWRpdCBwb3B1cFxuXHRcdHRoaXMuX29wZW5FZGl0UGFuZWwoY2xvbmVkTGlzdEl0ZW0sIHNlbGVjdGVkSW5kZXgpO1xuXHR9XG5cblx0X29wZW5FZGl0UGFuZWwoc3ViQ29uZmlnUGFyYW1zQXJyYXksIGVkaXRJbmRleCA9IC0xKVxuXHR7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhpcyBjb25maWd1cmF0aW9uIGl0ZW0gaXMgaW5zaWRlIGEgbW9kYWwgd2luZG93O1xuXHRcdC8vIGlmIHllcywgdGhlIGVkaXQgcGFuZWwgKHdoaWNoIGlzIGEgbW9kYWwgYXMgd2VsbCkgbXVzdCBiZSBjb25maWd1cmVkIHRvIHJlbW92ZSB0aGUgZGFyayBiYWNrZ3JvdW5kXG5cdFx0aWYgKCQodGhpcykucGFyZW50cygnLm1vZGFsJykubGVuZ3RoID4gMClcblx0XHRcdCQoJy5tb2RhbCcsICQodGhpcykpLmF0dHIoJ2RhdGEtYmFja2Ryb3AnLCBmYWxzZSk7XG5cblx0XHQvLyBDcmVhdGUgZGlhbG9nIGNvbnRlbnRcblx0XHR0aGlzLl9pdGVtRWRpdG9yID0gbmV3IExpc3RJdGVtRWRpdG9yKCk7XG5cdFx0dGhpcy5faXRlbUVkaXRvci5kYXRhID0gc3ViQ29uZmlnUGFyYW1zQXJyYXk7XG5cdFx0dGhpcy5faXRlbUVkaXRvci5pbmRleCA9IGVkaXRJbmRleDtcblxuXHRcdGxldCBpdGVtRWRpdG9yID0gJCh0aGlzLl9pdGVtRWRpdG9yKTtcblxuXHRcdC8vIEFwcGVuZCBjb250ZW50IHRvIGRpYWxvZ1xuXHRcdCQoJy5tb2RhbC1ib2R5JywgdGhpcy5fZWRpdERpYWxvZykuYXBwZW5kKGl0ZW1FZGl0b3IpO1xuXG5cdFx0Ly8gU2V0IGRpYWxvZyBtYWluIGJ1dHRvbiB0ZXh0XG5cdFx0JCgnYnV0dG9uLmstcHJpbWFyeScsIHRoaXMuX2VkaXREaWFsb2cpLmh0bWwoZWRpdEluZGV4ID4gLTEgPyAnPGkgY2xhc3M9XCJmYXMgZmEtcGVuIG1yLTFcIj48L2k+VXBkYXRlJyA6ICc8aSBjbGFzcz1cImZhcyBmYS1wbHVzIG1yLTFcIj48L2k+QWRkJyk7XG5cblx0XHQvLyBEaXNwbGF5IGRpYWxvZ1xuXHRcdHRoaXMuX2VkaXREaWFsb2cubW9kYWwoJ3Nob3cnKTtcblx0fVxuXG5cdF9vblN1Ym1pdEJ0Q2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2l0ZW1FZGl0b3IudmFsaWRhdGUoKSlcblx0XHR7XG5cdFx0XHRsZXQgZGF0YSA9IHRoaXMuX2l0ZW1FZGl0b3IuZGF0YTtcblx0XHRcdGxldCBpbmRleCA9IHRoaXMuX2l0ZW1FZGl0b3IuaW5kZXg7XG5cblx0XHRcdC8vIEhpZGUgbW9kYWxcblx0XHRcdHRoaXMuX2VkaXREaWFsb2cubW9kYWwoJ2hpZGUnKTtcblxuXHRcdFx0Ly8gQ29tcGxldGUgZWRpdGluZ1xuXHRcdFx0dGhpcy5fb25FZGl0Q29tcGxldGUoZGF0YSwgaW5kZXgpO1xuXHRcdH1cblx0fVxuXG5cdF9vbkNhbmNlbEJ0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gSGlkZSBtb2RhbFxuXHRcdHRoaXMuX2VkaXREaWFsb2cubW9kYWwoJ2hpZGUnKTtcblx0fVxuXG5cdF9vbkVkaXRQYW5lbEhpZGRlbihlKVxuXHR7XG5cdFx0Ly8gUmVtb3ZlIGNvbnRlbnQgZnJvbSBkaWFsb2dcblx0XHR0aGlzLl9pdGVtRWRpdG9yLnJlbW92ZSgpO1xuXG5cdFx0Ly8gU2V0IGRpYWxvZyBtYWluIGJ1dHRvbiB0ZXh0XG5cdFx0JCgnYnV0dG9uLmstcHJpbWFyeScsIHRoaXMuX2VkaXREaWFsb2cpLmh0bWwoJy4uLicpO1xuXG5cdFx0dGhpcy5faXRlbUVkaXRvciA9IG51bGw7XG5cdH1cblxuXHRfb25FZGl0Q29tcGxldGUobGlzdEl0ZW0sIGVkaXRJbmRleClcblx0e1xuXHRcdC8vIEFuIGV4aXN0aW5nIGxpc3QgaXRlbSB3YXMgdXBkYXRlZFxuXHRcdGlmIChlZGl0SW5kZXggPiAtMSlcblx0XHRcdHRoaXMuX2RhdGEudXBkYXRlTGlzdEl0ZW0obGlzdEl0ZW0sIGVkaXRJbmRleCk7XG5cblx0XHQvLyBBIG5ldyBsaXN0IGl0ZW0gd2FzIGFkZGVkOyBhZGQgaXQgdG8gdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyXG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fZGF0YS5hZGRMaXN0SXRlbShsaXN0SXRlbSk7XG5cblx0XHQvLyBSZWdlbmVyYXRlIGRhdGFncmlkJ3MgZGF0YXNvdXJjZVxuXHRcdHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctZ3JpZCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctZ3JpZCcsIENvbmZpZ0dyaWQpO1xuIiwiZXhwb3J0IGNsYXNzIENvbmZpZ0xhYmVsIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0dGhpcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywnY29uZmlnLWxhYmVsJyk7XG5cdH1cblxuXHRzZXQgdmFsdWUodmFsKVxuXHR7XG5cdFx0aWYgKHR5cGVvZiB2YWwgPT09ICdib29sZWFuJylcblx0XHRcdHRoaXMuaW5uZXJIVE1MID0gKHZhbCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuXHRcdGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAodmFsID8gdmFsIDogMCk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAodmFsICE9ICcnID8gdmFsIDogJyZtZGFzaDsnKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy50ZXh0Q29udGVudDtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1sYWJlbCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctbGFiZWwnLCBDb25maWdMYWJlbCk7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnTnVtZXJpY1N0ZXBwZXIgZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCBhIHNpbXBsZSBsYWJlbCBpcyB1c2VkLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIFNldCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0bGV0IGNvbmZpZyA9IHtcblx0XHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRcdGNsYXNzOiAnZm9ybS1jb250cm9sJyxcblx0XHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHQnZGF0YS1yb2xlJzogJ251bWVyaWN0ZXh0Ym94Jyxcblx0XHRcdFx0J2RhdGEtcmVxdWlyZWQtbXNnJzogJ1JlcXVpcmVkJyxcblx0XHRcdFx0J2RhdGEtZm9ybWF0JzogJyMnLFxuXHRcdFx0XHRyZXF1aXJlZDogJ3JlcXVpcmVkJyxcblx0XHRcdH07XG5cblx0XHRcdC8vIFNldCB3aWRnZXQgYXR0cmlidXRlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldEF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgd2lkZ2V0IGF0dHJpYnV0ZXMgYmFzZWQgb24gdmFsaWRhdGlvbiBydWxlcyAoc2VlIHBhcmVudCBjbGFzcylcblx0XHRcdHRoaXMuX3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIENyZWF0ZSB3aWRnZXQncyBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGlucHV0PicsIGNvbmZpZyk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgQ29uZmlnTGFiZWwoKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHdpZGdldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuICAgX2luaXRpYWxpemUoKVxuICAge1xuXHQgICBpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0ICAge1xuXHRcdCAgIC8vIEluaXRpYWxpemUga2VuZG8gd2lkZ2V0XG5cdFx0ICAga2VuZG8uaW5pdCh0aGlzLl93aWRnZXRIdG1sKTtcblxuXHRcdCAgIC8vIFNhdmUgcmVmLiB0byB3aWRnZXRcblx0XHQgICB0aGlzLl9pbm5lcldpZGdldCA9IHRoaXMuX3dpZGdldEh0bWwuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xuXG5cdFx0ICAgLy8gRW5hYmxlIHZhbHVlIGNvbW1pdCBiaW5kaW5nXG5cdFx0ICAgdGhpcy5faW5uZXJXaWRnZXQuYmluZCgnY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0ICAgfVxuXG5cdCAgIC8vIFByb2NlZWQgd2l0aCBpbml0aWFsaXphdGlvblxuXHQgICBzdXBlci5faW5pdGlhbGl6ZSgpO1xuICAgfVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIHRoZSBsYWJlbCB0ZXh0IGlzIHNldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC52YWx1ZSh0aGlzLl9kYXRhLnZhbHVlKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLnZhbHVlID0gdGhpcy5fZGF0YS52YWx1ZTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGlzYWJsZWQgc3RhdGUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldEVkaXRFbmFibGVkKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdFx0dGhpcy5faW5uZXJXaWRnZXQuZW5hYmxlKHRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSBOdW1iZXIodGhpcy5faW5uZXJXaWRnZXQudmFsdWUoKSk7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctbnVtZXJpYy1zdGVwcGVyJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1udW1lcmljLXN0ZXBwZXInLCBDb25maWdOdW1lcmljU3RlcHBlcik7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnVGV4dElucHV0IGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlciB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgYSBzaW1wbGUgbGFiZWwgaXMgdXNlZC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdGxldCBjb25maWcgPSB7XG5cdFx0XHRcdHR5cGU6ICd0ZXh0Jyxcblx0XHRcdFx0Y2xhc3M6ICdmb3JtLWNvbnRyb2wgay10ZXh0Ym94Jyxcblx0XHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHRhdXRvY29tcGxldGU6ICdvZmYnLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRBdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIFNldCBhZGRpdGlvbmFsIHdpZGdldCBhdHRyaWJ1dGVzIGJhc2VkIG9uIHZhbGlkYXRpb24gcnVsZXNcblx0XHRcdHRoaXMuX3NldFdpZGdldFZhbGlkYXRpb25BdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIENyZWF0ZSB3aWRnZXQncyBodG1sXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gJCgnPGlucHV0PicsIGNvbmZpZyk7XG5cblx0XHRcdC8vIEVuYWJsZSB2YWx1ZSBjb21taXQgYmluZGluZ1xuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBDb25maWdMYWJlbCgpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsKHRoaXMuX2RhdGEudmFsdWUpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsdWUgPSB0aGlzLl9kYXRhLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSB0aGlzLl93aWRnZXRIdG1sLnZhbCgpO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLXRleHQtaW5wdXQnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLXRleHQtaW5wdXQnLCBDb25maWdUZXh0SW5wdXQpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcbmltcG9ydCB7VmVjdG9yM0RJbnB1dH0gZnJvbSAnLi93aWRnZXRzL3ZlY3Rvci0zZC1pbnB1dCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdWZWN0b3IzRCBleHRlbmRzIENvbmZpZ0Zvcm1JdGVtXG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSB3aWRnZXQgdG8gcmVuZGVyIHRoZSBDb25maWdQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIGEgc2ltcGxlIGxhYmVsIGlzIHVzZWQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gQ3JlYXRlIHdpZGdldCdzIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgVmVjdG9yM0RJbnB1dCh0aGlzLl9kYXRhLm5hbWUsIHRoaXMuX2RhdGEudmFsaWRhdG9yID09ICdhb2knKTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRBdHRyaWJ1dGVzKHRoaXMuX3dpZGdldEh0bWwpO1xuXG5cdFx0XHQvLyBFbmFibGUgdmFsdWUgY29tbWl0IGJpbmRpbmdcblx0XHRcdCQodGhpcy5fd2lkZ2V0SHRtbCkub24oJ2NoYW5nZScsICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKSk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSBuZXcgQ29uZmlnTGFiZWwoKTtcblxuXHRcdC8vIFJldHVybiBjb21wb25lbnRcblx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0SHRtbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIHRoZSBsYWJlbCB0ZXh0IGlzIHNldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC52YWx1ZSA9IHRoaXMuX2RhdGEudmFsdWU7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQkKHRoaXMuX3dpZGdldEh0bWwpLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9vblZhbHVlSW5wdXQoZSlcblx0e1xuXHRcdC8vIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB0byBuZXcgdmFsdWVcblx0XHR0aGlzLl9kYXRhLnZhbHVlID0gdGhpcy5fd2lkZ2V0SHRtbC52YWx1ZTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy12ZWN0b3ItM2QnKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLXZlY3Rvci0zZCcsIENvbmZpZ1ZlY3RvcjNEKTtcbiIsImltcG9ydCB7Q29uZmlnRm9ybUl0ZW1GYWN0b3J5fSBmcm9tICcuLi8uLi8uLi91dGlscy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbS1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIExpc3RJdGVtRWRpdG9yIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXHR9XG5cblx0c2V0IGRhdGEoc3ViQ29uZmlnUGFyYW1zQXJyYXkpXG5cdHtcblx0XHR0aGlzLl9kYXRhID0gc3ViQ29uZmlnUGFyYW1zQXJyYXk7XG5cblx0XHR0aGlzLl9idWlsZFZpZXcoKTtcblx0fVxuXG5cdGdldCBkYXRhKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9kYXRhO1xuXHR9XG5cblx0c2V0IGluZGV4KGluZGV4KVxuXHR7XG5cdFx0dGhpcy5faW5kZXggPSBpbmRleDtcblx0fVxuXG5cdGdldCBpbmRleCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faW5kZXg7XG5cdH1cblxuXHRfYnVpbGRWaWV3KClcblx0e1xuXHRcdC8vIEdlbmVyYXRlIGNvbnRhaW5lciBmb3JtXG5cdFx0dGhpcy5fZm9ybSA9ICQoJzxmb3JtPicsIHt9KTtcblxuXHRcdC8vIEFwcGVuZCBmb3JtXG5cdFx0JCh0aGlzKS5hcHBlbmQodGhpcy5fZm9ybSk7XG5cblx0XHQvLyBHZW5lcmF0ZSBmb3JtIGZpZWxkc1xuXHRcdGZvciAobGV0IGNvbmZpZ1BhcmFtIG9mIHRoaXMuX2RhdGEpXG5cdFx0e1xuXHRcdFx0Ly8gQ3JlYXRlIGZvcm0gaXRlbVxuXHRcdFx0bGV0IGZvcm1JdGVtID0gQ29uZmlnRm9ybUl0ZW1GYWN0b3J5LmNyZWF0ZShjb25maWdQYXJhbSwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0XHRmb3JtSXRlbS5kYXRhID0gY29uZmlnUGFyYW07XG5cblx0XHRcdC8vIEFkZCBmb3JtIGl0ZW0gdG8gZm9ybVxuXHRcdFx0dGhpcy5fZm9ybS5hcHBlbmQoZm9ybUl0ZW0pO1xuXHRcdH1cblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdmFsaWRhdGlvbiBvbiBmb3JtXG5cdFx0dGhpcy5fdmFsaWRhdG9yID0gdGhpcy5fZm9ybS5rZW5kb1ZhbGlkYXRvcih7XG5cdFx0XHR2YWxpZGF0ZU9uQmx1cjogdHJ1ZSxcblx0XHRcdHJ1bGVzOiB7XG5cdFx0XHRcdC8vIEFkZCBydWxlIHRvIHZhbGlkYXRlIEFPSSBmb3JtIGl0ZW1zP1xuXHRcdFx0XHQvLyAoc2VlOiBodHRwczovL2RlbW9zLnRlbGVyaWsuY29tL2tlbmRvLXVpL3ZhbGlkYXRvci9jdXN0b20tdmFsaWRhdGlvbilcblx0XHRcdFx0YW9pOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tkYXRhLWFvaS1tc2ddJykgJiYgaW5wdXQudmFsKCkgIT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LnZhbCgpID09ICcwLDAsMCcpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXHR9XG5cblx0dmFsaWRhdGUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnbGlzdC1pdGVtLWVkaXRvcicpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdsaXN0LWl0ZW0tZWRpdG9yJywgTGlzdEl0ZW1FZGl0b3IpO1xuIiwiZXhwb3J0IGNsYXNzIFZlY3RvcjNESW5wdXQgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcihpZCwgaXNWYWxpZGFibGUpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLmlkID0gaWQ7XG5cdFx0dGhpcy5uYW1lID0gaWQ7XG5cblx0XHR0aGlzLl9pc1ZhbGlkYWJsZSA9IGlzVmFsaWRhYmxlO1xuXG5cdFx0dGhpcy5faW5pdGlhbGl6ZSgpO1xuXHR9XG5cblx0c2V0IGVuYWJsZUNsZWFyKHZhbHVlKVxuXHR7XG5cdFx0aWYgKHZhbHVlKVxuXHRcdFx0dGhpcy5fY2xlYXJCdXR0b24uc2hvdygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX2NsZWFyQnV0dG9uLmhpZGUoKTtcblx0fVxuXG5cdHNldCBhbGxvd05lZ2F0aXZlKHZhbHVlKVxuXHR7XG5cdFx0aWYgKHZhbHVlKVxuXHRcdHtcblx0XHRcdHRoaXMuX3dpZGdldFguc2V0T3B0aW9ucygge21pbjogbnVsbH0gKTtcblx0XHRcdHRoaXMuX3dpZGdldFkuc2V0T3B0aW9ucygge21pbjogbnVsbH0gKTtcblx0XHRcdHRoaXMuX3dpZGdldFouc2V0T3B0aW9ucygge21pbjogbnVsbH0gKTtcblx0XHR9XG5cdH1cblxuXHRzZXQgdmFsdWUodmFsKVxuXHR7XG5cdFx0dmFyIGNvb3JkcyA9IHZhbC5zcGxpdCgnLCcpO1xuXG5cdFx0aWYgKGNvb3Jkcy5sZW5ndGggPj0gMSlcblx0XHRcdHRoaXMuX3dpZGdldFgudmFsdWUoY29vcmRzWzBdKTtcblxuXHRcdGlmIChjb29yZHMubGVuZ3RoID49IDIpXG5cdFx0XHR0aGlzLl93aWRnZXRZLnZhbHVlKGNvb3Jkc1sxXSk7XG5cblx0XHRpZiAoY29vcmRzLmxlbmd0aCA+PSAzKVxuXHRcdFx0dGhpcy5fd2lkZ2V0Wi52YWx1ZShjb29yZHNbMl0pO1xuXG5cdFx0aWYgKHRoaXMuX2lzVmFsaWRhYmxlKVxuXHRcdFx0dGhpcy5faW5wdXRWYWwudmFsKHRoaXMudmFsdWUpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKClcblx0e1xuXHRcdGlmICh0aGlzLl93aWRnZXRYLnZhbHVlKCkgPT0gbnVsbCAmJiB0aGlzLl93aWRnZXRZLnZhbHVlKCkgPT0gbnVsbCAmJiB0aGlzLl93aWRnZXRaLnZhbHVlKCkgPT0gbnVsbClcblx0XHRcdHJldHVybiAnJztcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5fd2lkZ2V0WC52YWx1ZSgpICsgJywnICsgdGhpcy5fd2lkZ2V0WS52YWx1ZSgpICsgJywnICsgdGhpcy5fd2lkZ2V0Wi52YWx1ZSgpO1xuXHR9XG5cblx0X2luaXRpYWxpemUoKVxuXHR7XG5cdFx0Ly8gR2VuZXJhdGUgY29udGFpbmVyIGZvcm1cblx0XHR0aGlzLl9jb250YWluZXIgPSAkKCc8ZGl2PicsIHtcblx0XHRcdGNsYXNzOiAnZm9ybS1pbmxpbmUnXG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgY29udGFpbmVyXG5cdFx0JCh0aGlzKS5hcHBlbmQodGhpcy5fY29udGFpbmVyKTtcblxuXHRcdC8vIFNldCBpbnB1dHMgY29uZmlndXJhdGlvblxuXHRcdGxldCBjb25maWdIdG1sID0ge1xuXHRcdFx0dHlwZTogJ251bWJlcicsXG5cdFx0XHRjbGFzczogJ2Zvcm0tY29udHJvbCBzaG9ydC00Jyxcblx0XHR9O1xuXG5cdFx0Ly8gU2V0IHdpZGdldCBjb25maWd1cmF0aW9uXG5cdFx0bGV0IGNvbmZpZ1dpZGdldCA9IHtcblx0XHRcdG1pbjogMCxcblx0XHRcdHNwaW5uZXJzOiBmYWxzZSxcblx0XHRcdGZvcm1hdDogJyMuIyMjIyMjJyxcblx0XHRcdGRlY2ltYWxzOiA2LFxuXHRcdFx0cm91bmQ6IGZhbHNlLFxuXHRcdFx0c3Bpbm5lcnM6IGZhbHNlLFxuXHRcdFx0cmVzdHJpY3REZWNpbWFsczogZmFsc2UsXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25DaGFuZ2UsIHRoaXMpXG5cdFx0fTtcblxuXHRcdC8vIENyZWF0ZSB3aWRnZXRzXG5cdFx0dGhpcy5faW5wdXRYID0gJCgnPGlucHV0PicsIGNvbmZpZ0h0bWwpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRYKTtcblx0XHR0aGlzLl93aWRnZXRYID0gdGhpcy5faW5wdXRYLmtlbmRvTnVtZXJpY1RleHRCb3goY29uZmlnV2lkZ2V0KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInB4LTFcIj4sPC9zcGFuPicpO1xuXG5cdFx0dGhpcy5faW5wdXRZID0gJCgnPGlucHV0PicsIGNvbmZpZ0h0bWwpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRZKTtcblx0XHR0aGlzLl93aWRnZXRZID0gdGhpcy5faW5wdXRZLmtlbmRvTnVtZXJpY1RleHRCb3goY29uZmlnV2lkZ2V0KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInB4LTFcIj4sPC9zcGFuPicpO1xuXG5cdFx0dGhpcy5faW5wdXRaID0gJCgnPGlucHV0PicsIGNvbmZpZ0h0bWwpO1xuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRaKTtcblx0XHR0aGlzLl93aWRnZXRaID0gdGhpcy5faW5wdXRaLmtlbmRvTnVtZXJpY1RleHRCb3goY29uZmlnV2lkZ2V0KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInB4LTFcIj48L3NwYW4+Jyk7IC8vIEFkZGl0aW9uYWwgc3BhY2VyXG5cblx0XHQvLyBDcmVhdGUgaW52aXNpYmxlIGZpZWxkIHRvIGFwcGx5IG92ZXJhbGwgdmFsaWRhdGlvblxuXHRcdGlmICh0aGlzLl9pc1ZhbGlkYWJsZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9pbnB1dFZhbCA9ICQoJzxpbnB1dD4nLCB7bmFtZTogYCR7dGhpcy5uYW1lfS1jdXN0b20tdmFsaWRhdGVgLCAnZGF0YS1hb2ktbXNnJzogJ1ZhbHVlcyBjYW5cXCd0IGFsbCBiZSAwJ30pO1xuXHRcdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZCh0aGlzLl9pbnB1dFZhbCk7XG5cdFx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKGA8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2dcIiBkYXRhLWZvcj1cIiR7dGhpcy5uYW1lfS1jdXN0b20tdmFsaWRhdGVcIj48L3NwYW4+YClcblx0XHRcdHRoaXMuX2lucHV0VmFsLmhpZGUoKTtcblx0XHR9XG5cblx0XHQvLyBDcmVhdGUgYW5kIGFwcGVuZCBDbGVhciBidXR0b25cblx0XHR0aGlzLl9jbGVhckJ1dHRvbiA9ICQoJzxidXR0b24+Jywge3R5cGU6ICdidXR0b24nLCBjbGFzczogJ2stYnV0dG9uIGstc2Vjb25kYXJ5IG15LTEnLCB0aXRsZTogJ0NsZWFyJ30pLmFwcGVuZCgkKCc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4nKSk7XG5cdFx0dGhpcy5fY2xlYXJCdXR0b24ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNsZWFyQ2xpY2ssIHRoaXMpKTtcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKHRoaXMuX2NsZWFyQnV0dG9uKTtcblxuXHRcdC8vIEhpZGUgYnV0dG9uIGJ5IGRlZmF1bHRcblx0XHR0aGlzLl9jbGVhckJ1dHRvbi5oaWRlKCk7XG5cdH1cblxuXHRfb25DaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gRW1wdHkgc3RyaW5ncyBhcmUgbm90IGFsbG93ZWRcblx0XHRpZiAodGhpcy5fd2lkZ2V0WC52YWx1ZSgpID09IG51bGwpXG5cdFx0XHR0aGlzLl93aWRnZXRYLnZhbHVlKDApO1xuXG5cdFx0aWYgKHRoaXMuX3dpZGdldFkudmFsdWUoKSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fd2lkZ2V0WS52YWx1ZSgwKTtcblxuXHRcdGlmICh0aGlzLl93aWRnZXRaLnZhbHVlKCkgPT0gbnVsbClcblx0XHRcdHRoaXMuX3dpZGdldFoudmFsdWUoMCk7XG5cblx0XHR0aGlzLl9kaXNwYXRjaENvbW1pdCgpO1xuXHR9XG5cblx0X29uQ2xlYXJDbGljaygpXG5cdHtcblx0XHR0aGlzLl93aWRnZXRYLnZhbHVlKCcnKTtcblx0XHR0aGlzLl93aWRnZXRZLnZhbHVlKCcnKTtcblx0XHR0aGlzLl93aWRnZXRaLnZhbHVlKCcnKTtcblxuXHRcdHRoaXMuX2Rpc3BhdGNoQ29tbWl0KCk7XG5cdH1cblxuXHRfZGlzcGF0Y2hDb21taXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2lzVmFsaWRhYmxlKVxuXHRcdFx0dGhpcy5faW5wdXRWYWwudmFsKHRoaXMudmFsdWUpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgndmVjdG9yLTNkLWlucHV0JykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZlY3Rvci0zZC1pbnB1dCcsIFZlY3RvcjNESW5wdXQpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbSc7XG5cbmltcG9ydCB7Q29uZmlnTnVtZXJpY1N0ZXBwZXJ9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1udW1lcmljLXN0ZXBwZXInO1xuaW1wb3J0IHtDb25maWdUZXh0SW5wdXR9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy10ZXh0LWlucHV0JztcbmltcG9ydCB7Q29uZmlnQ2hlY2tCb3h9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1jaGVjay1ib3gnO1xuaW1wb3J0IHtDb25maWdEcm9wRG93bkxpc3R9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kcm9wLWRvd24tbGlzdCc7XG5pbXBvcnQge0NvbmZpZ0dyaWR9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1ncmlkJztcbmltcG9ydCB7Q29uZmlnRHVhbExpc3R9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kdWFsLWxpc3QnO1xuaW1wb3J0IHtDb25maWdWZWN0b3IzRH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLXZlY3Rvci0zZCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdGb3JtSXRlbUZhY3Rvcnlcbntcblx0c3RhdGljIGNyZWF0ZShjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nID0gZmFsc2UpXG5cdHtcblx0XHRzd2l0Y2ggKGNvbmZpZ1BhcmFtLnR5cGUpXG5cdFx0e1xuXHRcdFx0Y2FzZSAnVGV4dElucHV0Jzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdUZXh0SW5wdXQoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdDaGVja0JveCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnQ2hlY2tCb3goY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdOdW1lcmljU3RlcHBlcic6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnTnVtZXJpY1N0ZXBwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdDb21ib0JveCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnRHJvcERvd25MaXN0KGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHRcdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAnRGF0YUdyaWQnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmZpZ0dyaWQoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdEdWFsTGlzdCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnRHVhbExpc3QoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdWZWN0b3IzRCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnVmVjdG9yM0QoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmZpZ0Zvcm1JdGVtKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpOyAvLyBXaWxsIGxvZyBhbiBlcnJvciBmb3IgbWlzc2luZyBmb3JtIGl0ZW0gdHlwZVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtDb25maWd1cmF0aW9uUGFyYW1ldGVyfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24tcGFyYW1ldGVyJztcbmltcG9ydCB7Q29uZmlnRm9ybUl0ZW1GYWN0b3J5fSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0tZmFjdG9yeSc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdJbnRlcmZhY2VCdWlsZGVyXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHRcdC8vIFNldCBzb21lIGNvbnN0YW50c1xuXHRcdHRoaXMuVEFCX1BSRUZJWCA9ICd0YWItJ1xuXHRcdHRoaXMuVEFCX1BBTkVfUFJFRklYID0gJ3RhYnBhbmUtJztcblx0XHR0aGlzLlNFUEFSQVRPUl9CRUZPUkUgPSAnYmVmb3JlJztcblx0XHR0aGlzLlNFUEFSQVRPUl9BRlRFUiA9ICdhZnRlcic7XG5cdH1cblxuXHRkdW1wKG1vZGlmaWVkT25seSA9IGZhbHNlKVxuXHR7XG5cdFx0bGV0IGR1bXBTdHIgPSAnJztcblxuXHRcdGZvciAobGV0IGNwIG9mIHRoaXMuX2NvbmZpZ1BhcmFtcylcblx0XHR7XG5cdFx0XHRpZiAobW9kaWZpZWRPbmx5KVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoY3AuaXNNb2RpZmllZClcblx0XHRcdFx0XHRkdW1wU3RyICs9IGNwLnRvU3RyaW5nKCkgKyAnXFxuJztcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0ZHVtcFN0ciArPSBjcC50b1N0cmluZygpICsgJ1xcbic7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2coZHVtcFN0cik7XG5cdH1cblxuXHRidWlsZEludGVyZmFjZShkYXRhLCBtYWluQ29udGFpbmVySWQsIGRpc2FibGVFZGl0ID0gZmFsc2UsIHRhYlN1ZmZpeCA9ICcnKVxuXHR7XG5cdFx0dGhpcy5fbWFpbkNvbnRhaW5lcklkID0gbWFpbkNvbnRhaW5lcklkO1xuXHRcdHRoaXMuX2NvbmZpZ1BhcmFtcyA9IG5ldyBBcnJheSgpO1xuXHRcdHRoaXMuX3ZhbGlkYXRvciA9IG51bGw7XG5cblx0XHRsZXQgaGFzTmV3Rm9ybUl0ZW0gPSBmYWxzZTtcblxuXHRcdC8vY29uc29sZS5sb2coZGF0YS5nZXREdW1wKCkpXG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuc2l6ZSgpOyBpKyspXG5cdFx0e1xuXHRcdFx0Ly8gUEFSU0UgREFUQVxuXG5cdFx0XHRsZXQgY29uZmlnUGFyYW0gPSBDb25maWd1cmF0aW9uUGFyYW1ldGVyLmZyb21TZnNPYmplY3QoZGF0YS5nZXQoaSkpO1xuXHRcdFx0dGhpcy5fY29uZmlnUGFyYW1zLnB1c2goY29uZmlnUGFyYW0pO1xuXG5cdFx0XHQvLyBHZXQgdGFiIGFuZCB0YWIgcGFuZSBpZCBmcm9tIGdyb3VwIGlkXG5cdFx0XHRjb25zdCB0YWJJZCA9IHRoaXMuVEFCX1BSRUZJWCArIGNvbmZpZ1BhcmFtLmNhdGVnb3J5SWQgKyAodGFiU3VmZml4ID8gJ18nICsgdGFiU3VmZml4IDogJycpO1xuXHRcdFx0Y29uc3QgdGFiUGFuZUlkID0gdGhpcy5UQUJfUEFORV9QUkVGSVggKyBjb25maWdQYXJhbS5jYXRlZ29yeUlkICsgKHRhYlN1ZmZpeCA/ICdfJyArIHRhYlN1ZmZpeCA6ICcnKTtcblxuXHRcdFx0Ly8gQlVJTEQgSU5URVJGQUNFIDo6IFRBQlNcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSB0YWIgc3BlY2lmaWMgZm9yIHRoaXMgZ3JvdXAgYWxyZWFkeSBleGlzdHMgaW5zaWRlIHRoZSBtYWluQ29udGFpbmVyOiBpZiBub3QsIGNyZWF0ZSBpdFxuXHRcdFx0Ly8gKGEgdGFiIGFscmVhZHkgZXhpc3RzIGlmIGl0IHdhcyBjcmVhdGVkIGluIGEgcHJldmlvdXMgbG9vcClcblx0XHRcdGxldCB0YWIgPSAkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYnMgIyR7dGFiSWR9YCk7XG5cblx0XHRcdGlmICh0YWIubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENyZWF0ZSB0YWIgZm9yIHRhYiBwYW5lXG5cdFx0XHRcdHRhYiA9ICQoJzxsaT4nLCB7Y2xhc3M6ICduYXYtaXRlbSd9KTtcblx0XHRcdFx0dGFiLmFwcGVuZCgkKCc8YT4nLCB7XG5cdFx0XHRcdFx0Y2xhc3M6ICduYXYtbGluaycgKyAoaSA9PSAwID8gJyBhY3RpdmUnIDogJycpLFxuXHRcdFx0XHRcdGlkOiB0YWJJZCxcblx0XHRcdFx0XHQnZGF0YS10b2dnbGUnOiAndGFiJyxcblx0XHRcdFx0XHRocmVmOiAnIycgKyB0YWJQYW5lSWQsXG5cdFx0XHRcdFx0cm9sZTogJ3RhYicsXG5cdFx0XHRcdFx0J2FyaWEtY29udHJvbHMnOiB0YWJQYW5lSWQsXG5cdFx0XHRcdFx0J2FyaWEtc2VsZWN0ZWQnOiAoaSA9PSAwID8gJ3RydWUnIDogJ2ZhbHNlJyksXG5cdFx0XHRcdFx0aHRtbDogY29uZmlnUGFyYW0uY2F0ZWdvcnksXG5cdFx0XHRcdH0pKTtcblxuXHRcdFx0XHQvLyBBZGQgdGFiIHRvIGNvbnRhaW5lclxuXHRcdFx0XHQkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYnNgKS5hcHBlbmQodGFiKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQlVJTEQgSU5URVJGQUNFIDo6IFRBQiBQQU5FU1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhIHRhYiBwYW5lIHNwZWNpZmljIGZvciB0aGlzIGdyb3VwIGFscmVhZHkgZXhpc3RzIGluc2lkZSB0aGUgbWFpbkNvbnRhaW5lcjogaWYgbm90LCBjcmVhdGUgaXRcblx0XHRcdC8vIChhIHRhYiBwYW5lIGFscmVhZHkgZXhpc3RzIGlmIGl0IHdhcyBjcmVhdGVkIGluIGEgcHJldmlvdXMgbG9vcCBvciBpZiBpdCBleGlzdHMgc3RhdGljYWxseSBpbiB0aGUgaHRtbCAtIGluIGNhc2UgaXQgaXMgbmVlZGVkIHRvIGFkZCBzb21lIHN0YXRpYyBjb250ZW50KVxuXHRcdFx0bGV0IHRhYlBhbmUgPSAkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+ICMke3RhYlBhbmVJZH1gKTtcblxuXHRcdFx0aWYgKHRhYlBhbmUubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENyZWF0ZSB0YWIgcGFuZVxuXHRcdFx0XHR0YWJQYW5lID0gJCgnPGRpdj4nLCB7XG5cdFx0XHRcdFx0Y2xhc3M6ICd0YWItcGFuZScgKyAoaSA9PSAwID8gJyBzaG93IGFjdGl2ZScgOiAnJyksXG5cdFx0XHRcdFx0aWQ6IHRhYlBhbmVJZCxcblx0XHRcdFx0XHRyb2xlOiAndGFicGFuZWwnLFxuXHRcdFx0XHRcdCdhcmlhLWxhYmVsbGVkYnknOiB0YWJJZCxcblx0XHRcdFx0XHQnZGF0YS1keW5hbWljJzogJ3RydWUnLFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBBZGQgdGFiIHBhbmUgdG8gY29udGFpbmVyXG5cdFx0XHRcdCQoYCMke21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzYCkuYXBwZW5kKHRhYlBhbmUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCVUlMRCBJTlRFUkZBQ0UgOjogVEFCIFBBTkVTJyBGT1JNXG5cblx0XHRcdC8vIENoZWNrIGlmIGEgZm9ybSBhbHJlYWR5IGV4aXN0cyBpbnNpZGUgdGhlIHRhYiBwYW5lOiBpZiBub3QsIGNyZWF0ZSBpdFxuXHRcdFx0bGV0IGZvcm0gPSB0YWJQYW5lLmZpbmQoJ2Zvcm0nKTtcblxuXHRcdFx0aWYgKGZvcm0ubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENyZWF0ZSBmb3JtXG5cdFx0XHRcdGZvcm0gPSAkKCc8Zm9ybT4nLCB7XG5cdFx0XHRcdFx0Y2xhc3M6ICcnLFxuXHRcdFx0XHRcdGF1dG9jb21wbGV0ZTogJ29mZidcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Ly8gQ3JlYXRlIGFuIGlubmVyIGZpZWxkc2V0OyB0aGlzIG1pZ2h0IGJlIHVzZWZ1bCB0byBlYXNpbHkgZGlzYWJsZSB0aGUgd2hvbGUgZm9ybSBhdCBvbmNlIChhY3R1YWxseSB3ZSBkb24ndCB1c2UgaXQgYmVjYXVzZSBLZW5kbyB3aWRnZXRzIGFyZSBub3QgZGlzYWJsZWQgYXV0b21hdGljYWxseSlcblx0XHRcdFx0Zm9ybS5hcHBlbmQoXG5cdFx0XHRcdFx0JCgnPGZpZWxkc2V0PicsIHtcblx0XHRcdFx0XHRcdGNsYXNzOiAnJ1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdCk7XG5cblx0XHRcdFx0Ly8gQWRkIGZvcm0gdG8gdGFiIHBhbmVcblx0XHRcdFx0dGFiUGFuZS5wcmVwZW5kKGZvcm0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBHZXQgZmllbGRzZXQsIHdoaWNoIGlzIHRoZSBhY3R1YWwgZm9ybSBpdGVtcyBjb250YWluZXJcblx0XHRcdGxldCBmaWVsZHNldCA9IGZvcm0uZmluZCgnZmllbGRzZXQnKTtcblxuXHRcdFx0Ly8gQlVJTEQgSU5URVJGQUNFIDo6IFRBQiBQQU5FUycgRk9STSBJVEVNU1xuXG5cdFx0XHQvLyBDaGVjayBpZiBmb3JtIGl0ZW0gYWxyZWFkeSBleGlzdHMgaW4gZmllbGRzZXQ7IGlmIHllcywganVzdCB1cGRhdGUgaXRzIGRhdGFcblx0XHRcdGxldCBmb3JtSXRlbSA9IGZpZWxkc2V0LmZpbmQoYCNmb3JtLWl0ZW0tJHskLmVzY2FwZVNlbGVjdG9yKGNvbmZpZ1BhcmFtLm5hbWUpfWApO1xuXG5cdFx0XHRpZiAoZm9ybUl0ZW0ubGVuZ3RoID09IDApXG5cdFx0XHR7XG5cdFx0XHRcdGhhc05ld0Zvcm1JdGVtID0gdHJ1ZTtcblxuXHRcdFx0XHRmb3JtSXRlbSA9IENvbmZpZ0Zvcm1JdGVtRmFjdG9yeS5jcmVhdGUoY29uZmlnUGFyYW0sICFkaXNhYmxlRWRpdCk7XG5cblx0XHRcdFx0Ly8gQWRkIHNlcGFyYXRvciBiZWZvcmVcblx0XHRcdFx0aWYgKGNvbmZpZ1BhcmFtLnNlcGFyYXRvciAhPSBudWxsICYmIGNvbmZpZ1BhcmFtLnNlcGFyYXRvci5wb3MgPT0gJ2JlZm9yZScpXG5cdFx0XHRcdFx0ZmllbGRzZXQuYXBwZW5kKHRoaXMuX2J1aWxkU2VwYXJhdG9yKGNvbmZpZ1BhcmFtLnNlcGFyYXRvcikpO1xuXG5cdFx0XHRcdC8vIEFkZCBmb3JtIGl0ZW0gdG8gZm9ybVxuXHRcdFx0XHRmaWVsZHNldC5hcHBlbmQoZm9ybUl0ZW0pO1xuXG5cdFx0XHRcdC8vIEFkZCBzZXBhcmF0b3IgYWZ0ZXJcblx0XHRcdFx0aWYgKGNvbmZpZ1BhcmFtLnNlcGFyYXRvciAhPSBudWxsICYmIGNvbmZpZ1BhcmFtLnNlcGFyYXRvci5wb3MgPT0gJ2FmdGVyJylcblx0XHRcdFx0XHRmaWVsZHNldC5hcHBlbmQodGhpcy5fYnVpbGRTZXBhcmF0b3IoY29uZmlnUGFyYW0uc2VwYXJhdG9yKSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdGZvcm1JdGVtWzBdLmRhdGEgPSBjb25maWdQYXJhbTtcblx0XHR9XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gc2hvdyBoZWxwIHRvb2x0aXBzXG5cdFx0bGV0IGFsbFRhYlBhbmVzID0gJChgIyR7bWFpbkNvbnRhaW5lcklkfSA+ICN0YWJQYW5lbHMgPiBkaXYudGFiLXBhbmVgKTtcblx0XHRhbGxUYWJQYW5lcy5rZW5kb1Rvb2x0aXAoe1xuXHRcdFx0ZmlsdGVyOiAnaVt0aXRsZV0uaGVscCcsXG5cdFx0XHRwb3NpdGlvbjogJ3JpZ2h0Jyxcblx0XHRcdHdpZHRoOiAnMjUwcHgnLFxuXHRcdFx0Y29udGVudDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJoZWxwLXRvb2x0aXBcIj4ke2UudGFyZ2V0LmRhdGEoJ3RpdGxlJyl9PC9kaXY+YDtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdmFsaWRhdGlvbiBvbiBmb3JtcycgbWFpbiBjb250YWluZXJcblx0XHR0aGlzLl92YWxpZGF0b3IgPSAkKGAjJHttYWluQ29udGFpbmVySWR9YCkua2VuZG9WYWxpZGF0b3Ioe1xuXHRcdFx0dmFsaWRhdGVPbkJsdXI6IHRydWUsXG5cdFx0XHRydWxlczoge1xuXHRcdFx0XHQvLyBBZGQgcnVsZSB0byB2YWxpZGF0ZSBBT0kgZm9ybSBpdGVtc1xuXHRcdFx0XHQvLyAoc2VlOiBodHRwczovL2RlbW9zLnRlbGVyaWsuY29tL2tlbmRvLXVpL3ZhbGlkYXRvci9jdXN0b20tdmFsaWRhdGlvbilcblx0XHRcdFx0YW9pOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tkYXRhLWFvaS1tc2ddJykgJiYgaW5wdXQudmFsKCkgIT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LnZhbCgpID09ICcwLDAsMCcpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXHR9XG5cblx0ZGVzdHJveUludGVyZmFjZSgpXG5cdHtcblx0XHQvLyBEZXN0cm95IGFsbCBLZW5kbyB3aWRnZXRzIGluIGZvcm1zXG5cdFx0a2VuZG8uZGVzdHJveSgkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZSA+IGZvcm1gKSk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIHRhYnNcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYnNgKS5lbXB0eSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGR5bmFtaWMgdGFiIHBhbmVzICh0YWIgcGFuZXMgY3JlYXRlZCBieSBJbnRlcmZhY2UgQnVpbGRlcilcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZVtkYXRhLWR5bmFtaWM9XCJ0cnVlXCJdYCkucmVtb3ZlKCk7XG5cblx0XHQvLyBSZW1vdmUgZm9ybSBpbnNpZGUgc3RhdGljIHRhYiBwYW5lcyAocHJlZGVmaW5lZCB0YWIgcGFuZXMgaW4gaHRtbClcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZSA+IGZvcm1gKS5yZW1vdmUoKTtcblx0fVxuXG5cdGRpc2FibGVJbnRlcmZhY2UoZGlzYWJsZSlcblx0e1xuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIGFsbCBjb25maWcgZm9ybSBpdGVtc1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gKltpZF49J2Zvcm0taXRlbS0nXWApLnByb3AoJ2VkaXRFbmFibGVkJywgIWRpc2FibGUpO1xuXHR9XG5cblx0X2J1aWxkU2VwYXJhdG9yKHNlcGFyYXRvcilcblx0e1xuXHRcdGlmIChzZXBhcmF0b3IudGV4dCA9PSBudWxsKVxuXHRcdFx0cmV0dXJuICQoYDxociBjbGFzcz1cImNvbmZpZy1mb3JtLXNlcGFyYXRvclwiPmApO1xuXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuICQoYDxsYWJlbCBjbGFzcz1cImNvbmZpZy1mb3JtLXNlcGFyYXRvci1sYWJlbCBtYi0zXCI+JHtzZXBhcmF0b3IudGV4dH08L2xhYmVsPmApO1xuXHR9XG5cblx0Z2V0Q2hhbmdlZERhdGEoKVxuXHR7XG5cdFx0bGV0IGNoYW5nZXMgPSBuZXcgU0ZTMlguU0ZTQXJyYXkoKTtcblxuXHRcdGZvciAodmFyIGNwIG9mIHRoaXMuX2NvbmZpZ1BhcmFtcylcblx0XHR7XG5cdFx0XHRpZiAoY3AuaXNNb2RpZmllZClcblx0XHRcdFx0Y2hhbmdlcy5hZGRTRlNPYmplY3QoY3AudG9TZnNPYmplY3QoKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNoYW5nZXM7XG5cdH1cblxuXHRyZXNldElzTW9kaWZpZWQoKVxuXHR7XG5cdFx0Zm9yIChsZXQgY3Agb2YgdGhpcy5fY29uZmlnUGFyYW1zKVxuXHRcdHtcblx0XHRcdGlmIChjcC5pc01vZGlmaWVkKVxuXHRcdFx0XHRjcC5yZXNldElzTW9kaWZpZWQoKTtcblx0XHR9XG5cdH1cblxuXHRjaGVja0lzVmFsaWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHR9XG5cblx0cmVzZXRWYWxpZGF0aW9uKClcblx0e1xuXHRcdHRoaXMuX3ZhbGlkYXRvci5oaWRlTWVzc2FnZXMoKTtcblxuXHRcdC8vIFRoZSBtZXRob2QgYWJvdmUgZG9lc24ndCByZW1vdmUgdGhlIGstaW52YWxpZCBjbGFzc2VzIGFuZCBhcmlhLWludmFsaWQ9XCJ0cnVlXCIgYXR0cmlidXRlcyBmcm9tIGlucHV0c1xuXHRcdC8vIExldCdzIGRvIGl0IG1hbnVhbGx5XG5cdFx0JChgIyR7dGhpcy5fbWFpbkNvbnRhaW5lcklkfSAuay1pbnZhbGlkYCkucmVtb3ZlQ2xhc3MoJ2staW52YWxpZCcpO1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gW2FyaWEtaW52YWxpZD1cInRydWVcIl1gKS5yZW1vdmVBdHRyKCdhcmlhLWludmFsaWQnKTtcblx0fVxuXG5cdGdldENvbmZpZ0Zvcm1JdGVtKGNvbmZpZ1BhcmFtTmFtZSlcblx0e1xuXHRcdGxldCBmb3JtSXRlbSA9ICQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH1gKS5maW5kKGAjZm9ybS1pdGVtLSR7JC5lc2NhcGVTZWxlY3Rvcihjb25maWdQYXJhbU5hbWUpfWApO1xuXG5cdFx0aWYgKGZvcm1JdGVtLmxlbmd0aCA+IDApXG5cdFx0XHRyZXR1cm4gZm9ybUl0ZW1bMF07XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY3RpdmF0ZUZpcnN0VGFiUGFuZWwoKVxuXHR7XG5cdFx0bGV0IGNvbmZpZ1BhcmFtID0gdGhpcy5fY29uZmlnUGFyYW1zWzBdO1xuXHRcdGNvbnN0IHRhYlBhbmVJZCA9IHRoaXMuVEFCX1BBTkVfUFJFRklYICsgY29uZmlnUGFyYW0uY2F0ZWdvcnlJZDtcblx0XHRsZXQgdGFiUGFuZSA9ICQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gIyR7dGFiUGFuZUlkfWApO1xuXHRcdHRhYlBhbmUuYWRkQ2xhc3MoJ3Nob3cgYWN0aXZlJyk7XG5cdH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGFyYW1ldGVyXG57XG5cdHN0YXRpYyBmcm9tU2ZzT2JqZWN0KGVsZW1lbnQpXG5cdHtcblx0XHRsZXQgY3AgPSBuZXcgQ29uZmlndXJhdGlvblBhcmFtZXRlcigpO1xuXG5cdFx0Ly8gUGFyc2UgY29tbW9uIGRhdGFcblx0XHRjcC5uYW1lID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ25hbWUnKTtcblx0XHRjcC5sYWJlbCA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCdsYWJlbCcpO1xuXHRcdGNwLmNhdGVnb3J5ID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ2NhdGVnb3J5Jyk7XG5cdFx0Y3AudG9vbHRpcCA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCd0b29sdGlwJyk7XG5cdFx0Y3AudHlwZSA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCd0eXBlJyk7XG5cdFx0Y3AudmFsdWUgPSBlbGVtZW50LmdldCgndmFsdWUnKTtcblx0XHRjcC52YWxpZGF0b3IgPSBlbGVtZW50LmdldFV0ZlN0cmluZygndmFsaWRhdG9yJyk7XG5cdFx0Y3AuZWRpdGFibGUgPSAoZWxlbWVudC5jb250YWluc0tleSgnZWRpdCcpID8gZWxlbWVudC5nZXRCb29sKCdlZGl0JykgOiB0cnVlKTtcblx0XHRjcC50cmlnZ2VyID0gKGVsZW1lbnQuY29udGFpbnNLZXkoJ3RyaWdnZXInKSA/IGVsZW1lbnQuZ2V0Qm9vbCgndHJpZ2dlcicpIDogZmFsc2UpO1xuXHRcdGNwLnRyaWdnZXJEYXRhID0gZWxlbWVudC5nZXRTRlNBcnJheSgndHJpZ2dlckRhdGEnKTtcblx0XHRjcC5jbGllbnRPbmx5ID0gKGVsZW1lbnQuY29udGFpbnNLZXkoJ2NsaWVudE9ubHknKSA/IGVsZW1lbnQuZ2V0Qm9vbCgnY2xpZW50T25seScpIDogZmFsc2UpO1xuXHRcdGNwLmRhdGFQcm92aWRlciA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCdkYXRhUHJvdmlkZXInKTtcblxuXHRcdC8vIFBhcnNlIGNvbXBvbmVudCBzcGVjaWZpYyBhdHRyaWJ1dGVzXG5cdFx0bGV0IHRtcEF0dHJpYnV0ZXMgPSBlbGVtZW50LmdldFNGU09iamVjdCgnYXR0cmlidXRlcycpO1xuXHRcdGlmICh0bXBBdHRyaWJ1dGVzICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSB7fTtcblxuXHRcdFx0bGV0IGtleXMgPSB0bXBBdHRyaWJ1dGVzLmdldEtleXNBcnJheSgpO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpXG5cdFx0XHRcdGF0dHJpYnV0ZXNba2V5XSA9IHRtcEF0dHJpYnV0ZXMuZ2V0KGtleSk7XG5cblx0XHRcdGNwLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuXHRcdH1cblxuXHRcdC8vIFBhcnNlIHNlcGFyYXRvciBzZXR0aW5nc1xuXHRcdGxldCB0bXBTZXBhcmF0b3IgPSBlbGVtZW50LmdldFNGU09iamVjdCgnc2VwYXJhdG9yJyk7XG5cdFx0aWYgKHRtcFNlcGFyYXRvciAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGxldCBzZXBhcmF0b3IgPSB7fTtcblxuXHRcdFx0bGV0IGtleXMxID0gdG1wU2VwYXJhdG9yLmdldEtleXNBcnJheSgpO1xuXHRcdFx0Zm9yIChsZXQga2V5MSBvZiBrZXlzMSlcblx0XHRcdFx0c2VwYXJhdG9yW2tleTFdID0gdG1wU2VwYXJhdG9yLmdldChrZXkxKTtcblxuXHRcdFx0Y3Auc2VwYXJhdG9yID0gc2VwYXJhdG9yO1xuXHRcdH1cblxuXHRcdC8vIFBhcnNlIGRlZmF1bHQgbGlzdCBpdGVtXG5cdFx0bGV0IHRtcERlZmF1bHRMaXN0SXRlbSA9IGVsZW1lbnQuZ2V0U0ZTQXJyYXkoJ2RlZmF1bHRMaXN0SXRlbScpO1xuXHRcdGlmICh0bXBEZWZhdWx0TGlzdEl0ZW0gIT0gbnVsbCAmJiB0bXBEZWZhdWx0TGlzdEl0ZW0uc2l6ZSgpID4gMClcblx0XHR7XG5cdFx0XHRsZXQgZGVmYXVsdExpc3RJdGVtID0gW107XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdG1wRGVmYXVsdExpc3RJdGVtLnNpemUoKTsgaSsrKVxuXHRcdFx0XHRkZWZhdWx0TGlzdEl0ZW0ucHVzaChDb25maWd1cmF0aW9uUGFyYW1ldGVyLmZyb21TZnNPYmplY3QodG1wRGVmYXVsdExpc3RJdGVtLmdldFNGU09iamVjdChpKSkpO1xuXG5cdFx0XHRjcC5kZWZhdWx0TGlzdEl0ZW0gPSBkZWZhdWx0TGlzdEl0ZW07XG5cblx0XHRcdC8vIFBhcnNlIGxpc3QgdmFsdWVzXG5cdFx0XHRsZXQgbGlzdFZhbHVlcyA9IFtdO1xuXG5cdFx0XHRsZXQgdG1wTGlzdFZhbHVlcyA9IGVsZW1lbnQuZ2V0U0ZTQXJyYXkoJ2xpc3RWYWx1ZXMnKTtcblx0XHRcdGlmICh0bXBMaXN0VmFsdWVzICE9IG51bGwgJiYgdG1wTGlzdFZhbHVlcy5zaXplKCkgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IgKGxldCB2ID0gMDsgdiA8IHRtcExpc3RWYWx1ZXMuc2l6ZSgpOyB2KyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgbGlzdFZhbHVlT2JqID0gdG1wTGlzdFZhbHVlcy5nZXRTRlNPYmplY3Qodik7XG5cdFx0XHRcdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0XHRcdFx0bGV0IGtleXMyID0gbGlzdFZhbHVlT2JqLmdldEtleXNBcnJheSgpO1xuXHRcdFx0XHRcdGZvciAobGV0IGtleTIgb2Yga2V5czIpXG5cdFx0XHRcdFx0XHRvYmpba2V5Ml0gPSBsaXN0VmFsdWVPYmouZ2V0KGtleTIpO1xuXG5cdFx0XHRcdFx0bGlzdFZhbHVlcy5wdXNoKG9iaik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y3AubGlzdFZhbHVlcyA9IGxpc3RWYWx1ZXM7XG5cblx0XHRcdC8vIElmIHdlIGhhdmUgYSBsaXN0LCBvbiB0aGUgc2VydmVyLXNpZGUgaXRlbXMgY291bGQgYmUgcmVwcmVzZW50ZWQgYnkgYSBjbGFzc1xuXHRcdFx0Y3AuY2xhenogPSBlbGVtZW50LmdldFV0ZlN0cmluZygnY2xhenonKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY3A7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHQvKiBDT05TVEFOVFMgKi9cblx0XHR0aGlzLkRFRkFVTFRfQ0FURUdPUllfTkFNRSA9ICdHZW5lcmFsJztcblx0XHR0aGlzLkRFRkFVTFRfQ0FURUdPUllfSUQgPSAnZ2VuZXJhbCc7XG5cblx0XHQvKiBQVUJMSUMgVkFSUyAqL1xuXG5cdFx0dGhpcy5uYW1lID0gJyc7XG5cdFx0dGhpcy5sYWJlbCA9ICcnO1xuXHRcdHRoaXMudG9vbHRpcCA9ICcnO1xuXHRcdHRoaXMudHlwZSA9IG51bGw7XG5cdFx0dGhpcy50cmlnZ2VyID0gZmFsc2U7XG5cdFx0dGhpcy50cmlnZ2VyRGF0YSA9IG51bGw7XG5cdFx0dGhpcy5jbGllbnRPbmx5ID0gZmFsc2U7XG5cdFx0dGhpcy5lZGl0YWJsZSA9IHRydWU7XG5cdFx0dGhpcy5hdHRyaWJ1dGVzID0gbnVsbDtcblx0XHR0aGlzLmRhdGFQcm92aWRlciA9IG51bGw7XG5cblx0XHR0aGlzLnNlcGFyYXRvciA9IG51bGw7XHRcdFx0Ly8gUGFyYW1ldGVyIHVzZWQgdG8gY3JlYXRlIGEgc2VwYXJhdG9yIGJlZm9yZSBvciBhZnRlciB0aGUgY29uZmlnIHBhcmFtZXRlclxuXHRcdHRoaXMuZGVmYXVsdExpc3RJdGVtID0gbnVsbDtcdFx0Ly8gTGlzdCBvZiBzdWItQ29uZmlndXJhdGlvblBhcmFtZXRlcnMsIGVhY2ggY29udGFpbmluZyB0aGUgZGVmYXVsdCB2YWx1ZXNcblx0XHR0aGlzLmNsYXp6ID0gbnVsbDtcdFx0XHRcdC8vIE5hbWUgb2YgdGhlIGNsYXNzIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtIChub3QgdXNlZCBpbiBjYXNlIG9mIHByaW1pdGV2ZSBkYXRhIHR5cGVzKVxuXG5cdFx0LyogUFJJVkFURSBWQVJTICovXG5cblx0XHR0aGlzLl9jYXRlZ29yeSA9IHRoaXMuREVGQVVMVF9DQVRFR09SWV9OQU1FO1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSB0aGlzLkRFRkFVTFRfQ0FURUdPUllfSUQ7XG5cdFx0dGhpcy5fdmFsdWUgPSBudWxsO1xuXHRcdHRoaXMuX2luaXRpYWxWYWx1ZSA9IG51bGw7XHRcdC8vIFNhdmUgdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyLCB0byBjaGVjayBpZiB0aGUgdmFsdWUgd2FzIG1vZGlmaWVkXG5cdFx0dGhpcy5fdmFsaWRhdG9yID0gbnVsbDtcblxuXHRcdHRoaXMuX2xpc3RJdGVtcyA9IFtdO1x0XHRcdC8vIEFycmF5IG9mIGFycmF5cyBvZiBDb25maWd1cmF0aW9uUGFyYW1ldGVyc1xuXHRcdHRoaXMuX2xpc3RJdGVtc0NoYW5nZWQgPSBmYWxzZTtcdC8vIEZsYWcgdG8gYmUgc2V0IGluIGNhc2UgYSBsaXN0IGl0ZW0gaXMgYWRkZWQgb3IgcmVtb3ZlZFxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gR0VUVEVSUyAvIFNFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRzZXQgY2F0ZWdvcnkodmFsKVxuXHR7XG5cdFx0aWYgKHZhbClcblx0XHR7XG5cdFx0XHR0aGlzLl9jYXRlZ29yeSA9IHZhbDtcblx0XHRcdHRoaXMuX3NldElkRnJvbUNhdGVnb3J5TmFtZSh0aGlzLl9jYXRlZ29yeSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGNhdGVnb3J5KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jYXRlZ29yeTtcblx0fVxuXG5cdHNldCB2YWx1ZSh2YWwpXG5cdHtcblx0XHRpZiAodGhpcy5fdmFsdWUgIT0gdmFsKVxuXHRcdHtcblx0XHRcdC8vIElmIHZhbHVlIGlzIG51bGwsIHRoZW4gd2UgYXJlIHNldHRpbmcgdGhpcyBmb3IgdGhlIGZpcnN0IHRpbWUgYW5kXG5cdFx0XHQvLyB3ZSB3YW50IHRvIHNhdmUgdGhlIGluaXRpYWwgdmFsdWUsIHRvIGNoZWNrIGxhdGVyIGlmIGl0IGhhcyBiZWVuIG1vZGlmaWVkXG5cdFx0XHRpZiAodGhpcy5fdmFsdWUgPT0gbnVsbClcblx0XHRcdFx0dGhpcy5faW5pdGlhbFZhbHVlID0gdmFsO1xuXG5cdFx0XHR0aGlzLl92YWx1ZSA9IHZhbDtcblx0XHR9XG5cdH1cblxuXHRnZXQgdmFsdWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xuXHR9XG5cblx0c2V0IHZhbGlkYXRvcih2YWwpXG5cdHtcblx0XHRpZiAodmFsKVxuXHRcdFx0dGhpcy5fdmFsaWRhdG9yID0gdmFsO1xuXHR9XG5cblx0Z2V0IHZhbGlkYXRvcigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdmFsaWRhdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIG9iamVjdHM7IGVhY2ggb2JqZWN0IGNvbnRhaW5zIHRoZSBuYW1lLXZhbHVlIHBhaXJzIHVzZWQgdG9cblx0ICogcG9wdWxhdGUgdGhlIGxpc3Qgb2Ygc3ViLWNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBhcnJheXMsIGJhc2VkIG9uIGRlZmF1bHRMaXN0SXRlbS5cblx0ICovXG5cdHNldCBsaXN0VmFsdWVzKGFycilcblx0e1xuXHRcdHRoaXMuX3NldFN1YkNvbmZpZ3VyYXRpb25QYXJhbXMoYXJyKTtcblx0fVxuXG5cdGdldCBsaXN0VmFsdWVzKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9nZXRTdWJDb25maWd1cmF0aW9uUGFyYW1zVmFsdWVzKCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBHRVRURVJTIE9OTFlcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRnZXQgaXNNb2RpZmllZCgpXG5cdHtcblx0XHRsZXQgX2lzTW9kaWZpZWQgPSBmYWxzZTtcblxuXHRcdC8vIElmIHRoZSBwYXJhbWV0ZXIgaXMgdXNlZCBvbiB0aGUgY2xpZW50IG9ubHkgKGZvciBleGFtcGxlIGluIGEgY3VzdG9tIHRyaWdnZXIpXG5cdFx0Ly8gdGhlbiB3ZSBuZXZlciBoYXZlIHRvIGNvbnNpZGVyIGl0IGFzIG1vZGlmaWVkLCB0byBwcmV2ZW50IGl0IGJlaW5nIHNlbnQgdG8gdGhlIHNlcnZlclxuXHRcdGlmICghdGhpcy5jbGllbnRPbmx5KVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLl92YWx1ZSAhPSB0aGlzLl9pbml0aWFsVmFsdWUgfHwgdGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZClcblx0XHRcdFx0X2lzTW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBDaGVjayBzdWIgcGFyYW1ldGVyc1xuXHRcdFx0XHRvdXRlckxvb3A6IGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvciAobGV0IHN1YkNQIG9mIGxpc3RJdGVtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChzdWJDUC5pc01vZGlmaWVkKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRfaXNNb2RpZmllZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrIG91dGVyTG9vcDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gX2lzTW9kaWZpZWQ7XG5cdH1cblxuXHRnZXQgY2F0ZWdvcnlJZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2F0ZWdvcnlJZDtcblx0fVxuXG5cdGdldCBsaXN0SXRlbXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpc3RJdGVtcztcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBVQkxJQyBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNsb25lIG9mIHRoaXMgQ29uZmlndXJhdGlvblBhcmFtZXRlci5cblx0ICovXG5cdGNsb25lKGNsb25lVmFsdWUgPSBmYWxzZSlcblx0e1xuXHRcdGxldCBjcCA9IG5ldyBDb25maWd1cmF0aW9uUGFyYW1ldGVyKCk7XG5cdFx0Y3AubmFtZSA9IHRoaXMubmFtZTtcblx0XHRjcC5sYWJlbCA9IHRoaXMubGFiZWw7XG5cdFx0Y3AuY2F0ZWdvcnkgPSB0aGlzLmNhdGVnb3J5O1xuXHRcdGNwLnRvb2x0aXAgPSB0aGlzLnRvb2x0aXA7XG5cdFx0Y3AudHlwZSA9IHRoaXMudHlwZTtcblx0XHRjcC52YWxpZGF0b3IgPSB0aGlzLnZhbGlkYXRvcjtcblx0XHRjcC50cmlnZ2VyID0gdGhpcy50cmlnZ2VyO1xuXHRcdGNwLnRyaWdnZXJEYXRhID0gKHRoaXMudHJpZ2dlckRhdGEgIT0gbnVsbCA/IFNGUzJYLlNGU0FycmF5Lm5ld0Zyb21CaW5hcnlEYXRhKHRoaXMudHJpZ2dlckRhdGEudG9CaW5hcnkoKSkgOiBudWxsKTtcblx0XHRjcC5jbGllbnRPbmx5ID0gdGhpcy5jbGllbnRPbmx5O1xuXHRcdGNwLmRhdGFQcm92aWRlciA9IHRoaXMuZGF0YVByb3ZpZGVyO1xuXG5cdFx0aWYgKGNsb25lVmFsdWUpXG5cdFx0XHRjcC52YWx1ZSA9IHRoaXMudmFsdWU7XG5cblx0XHRpZiAodGhpcy5hdHRyaWJ1dGVzICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0Y3AuYXR0cmlidXRlcyA9IG5ldyBPYmplY3QoKTtcblx0XHRcdGZvciAobGV0IHMxIGluIHRoaXMuYXR0cmlidXRlcylcblx0XHRcdFx0Y3AuYXR0cmlidXRlc1tzMV0gPSB0aGlzLmF0dHJpYnV0ZXNbczFdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnNlcGFyYXRvciAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGNwLnNlcGFyYXRvciA9IG5ldyBPYmplY3QoKVxuXHRcdFx0Zm9yIChsZXQgczIgaW4gdGhpcy5zZXBhcmF0b3IpXG5cdFx0XHRcdGNwLnNlcGFyYXRvcltzMl0gPSB0aGlzLnNlcGFyYXRvcltzMl07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZGVmYXVsdExpc3RJdGVtICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0bGV0IGNsb25lZERlZmF1bHRMaXN0SXRlbXMgPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgc3ViQ1Agb2YgdGhpcy5kZWZhdWx0TGlzdEl0ZW0pXG5cdFx0XHRcdGNsb25lZERlZmF1bHRMaXN0SXRlbXMucHVzaChzdWJDUC5jbG9uZShjbG9uZVZhbHVlKSk7XG5cblx0XHRcdGNwLmRlZmF1bHRMaXN0SXRlbSA9IGNsb25lZERlZmF1bHRMaXN0SXRlbXM7XG5cdFx0fVxuXG5cdFx0Y3AubGlzdFZhbHVlcyA9IHRoaXMubGlzdFZhbHVlczsgLy8gTm8gbmVlZCB0byBjbG9uZSB0aGlzLCBhcyB0aGUgbGlzdFZhbHVlcyBzZXR0ZXIgYWxyZWFkeSBkb2VzIGl0XG5cdFx0Y3AuY2xhenogPSB0aGlzLmNsYXp6O1xuXG5cdFx0cmV0dXJuIGNwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0IGluaXRpYWwgdmFsdWUgYnkgY29weWluZyB0aGUgY3VycmVudCB2YWx1ZS5cblx0ICovXG5cdHJlc2V0SXNNb2RpZmllZCgpXG5cdHtcblx0XHR0aGlzLl9pbml0aWFsVmFsdWUgPSB0aGlzLl92YWx1ZTtcblxuXHRcdC8vIFJlc2V0IHN1Yi1wYXJhbWV0ZXJzXG5cdFx0aWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHRcdHtcblx0XHRcdFx0Zm9yIChsZXQgc3ViQ1Agb2YgbGlzdEl0ZW0pXG5cdFx0XHRcdFx0c3ViQ1AucmVzZXRJc01vZGlmaWVkKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZCA9IGZhbHNlO1xuXHR9XG5cblx0YWRkTGlzdEl0ZW0obmV3TGlzdEl0ZW0pXG5cdHtcblx0XHR0aGlzLl9saXN0SXRlbXMucHVzaChuZXdMaXN0SXRlbSk7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHR1cGRhdGVMaXN0SXRlbShsaXN0SXRlbSwgaXRlbUluZGV4KVxuXHR7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zW2l0ZW1JbmRleF0gPSBsaXN0SXRlbTtcblx0XHR0aGlzLl9saXN0SXRlbXNDaGFuZ2VkID0gdHJ1ZTtcblx0fVxuXG5cdHJlbW92ZUxpc3RJdGVtKGl0ZW1JbmRleClcblx0e1xuXHRcdHRoaXMuX2xpc3RJdGVtcy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblx0XHR0aGlzLl9saXN0SXRlbXNDaGFuZ2VkID0gdHJ1ZTtcblx0fVxuXG5cdHRvU2ZzT2JqZWN0KClcblx0e1xuXHRcdGxldCBvYmogPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cblx0XHQvLyBTZXQgY2hhbmdlZCBzZXR0aW5nIG5hbWVcblx0XHRvYmoucHV0VXRmU3RyaW5nKCduYW1lJywgdGhpcy5uYW1lKTtcblxuXHRcdC8vIFNldCBjaGFuZ2VkIHNldHRpbmcgY2xhc3MsIGlmIGFueVxuXHRcdGlmICh0aGlzLmNsYXp6ICE9IG51bGwpXG5cdFx0XHRvYmoucHV0VXRmU3RyaW5nKCdjbGF6eicsIHRoaXMuY2xhenopO1xuXG5cdFx0aWYgKHRoaXMudmFsdWUgIT0gbnVsbClcblx0XHR7XG5cdFx0XHQvLyBTZXQgY2hhbmdlZCBzZXR0aW5nIHZhbHVlXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMudmFsdWUgPT09ICdib29sZWFuJylcblx0XHRcdFx0b2JqLnB1dEJvb2woJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ251bWJlcicpXG5cdFx0XHRcdG9iai5wdXRJbnQoJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG9iai5wdXRUZXh0KCd2YWx1ZScsIHRoaXMudmFsdWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IGNoYW5nZWQgc2V0dGluZyBsaXN0IG9mIHZhbHVlc1xuXG5cdFx0XHRsZXQgbGlzdEl0ZW1zID0gbmV3IFNGUzJYLlNGU0FycmF5KCk7XG5cblx0XHRcdGZvciAobGV0IGEgb2YgdGhpcy5fbGlzdEl0ZW1zKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoYS5sZW5ndGggPT0gMSkgLy8gV2UgaGF2ZSBqdXN0IG9uZSBzdWIgY29uZmlnIHBhcmFtOyBubyBuZWVkIHRvIHBhcnNlIGl0IGNvbXBsaXRlbHlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIFNpbXBsZSBsaXN0XG5cdFx0XHRcdFx0bGV0IHRlbXBPYmogPSBhWzBdLnRvU2ZzT2JqZWN0KCk7XG5cdFx0XHRcdFx0bGV0IHdhID0gdGVtcE9iai5nZXRXcmFwcGVkSXRlbSgndmFsdWUnKTtcblx0XHRcdFx0XHRsaXN0SXRlbXMuYWRkKHdhLnZhbHVlLCB3YS50eXBlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBDb21wbGV4IGxpc3RcblxuXHRcdFx0XHRcdGxldCB2YWx1ZXMgPSBuZXcgU0ZTMlguU0ZTQXJyYXkoKTtcblxuXHRcdFx0XHRcdGZvciAobGV0IHN1YkNwIG9mIGEpXG5cdFx0XHRcdFx0XHR2YWx1ZXMuYWRkU0ZTT2JqZWN0KHN1YkNwLnRvU2ZzT2JqZWN0KCkpO1xuXG5cdFx0XHRcdFx0bGlzdEl0ZW1zLmFkZFNGU0FycmF5KHZhbHVlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0b2JqLnB1dFNGU0FycmF5KCd2YWx1ZScsIGxpc3RJdGVtcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBkZXNjcmlwdGlvbiBvZiB0aGUgQ29uZmlndXJhdGlvblBhcmFtZXRlciBpbnN0YW5jZS5cblx0ICovXG5cdHRvU3RyaW5nKClcblx0e1xuXHRcdGxldCBzID0gYGA7XG5cdFx0cyArPSBgQ29uZmlndXJhdGlvbiBwYXJhbWV0ZXI6ICR7dGhpcy5uYW1lfVxcbmA7XG5cdFx0cyArPSBgXFx0dHlwZTogJHt0aGlzLnR5cGV9XFxuYDtcblx0XHRzICs9IGBcXHRsYWJlbDogJHt0aGlzLmxhYmVsfVxcbmA7XG5cdFx0cyArPSBgXFx0Y2F0ZWdvcnkgbmFtZTogJHt0aGlzLmNhdGVnb3J5fVxcbmA7XG5cdFx0cyArPSBgXFx0Y2F0ZWdvcnkgaWQ6ICR7dGhpcy5jYXRlZ29yeUlkfVxcbmA7XG5cdFx0cyArPSBgXFx0dG9vbHRpcDogJHt0aGlzLnRvb2x0aXB9XFxuYDtcblx0XHRzICs9IGBcXHR2YWx1ZTogJHt0aGlzLnZhbHVlfVxcbmA7XG5cdFx0cyArPSBgXFx0dHJpZ2dlcjogJHt0aGlzLnRyaWdnZXJ9XFxuYDtcblx0XHRzICs9IGBcXHR0cmlnZ2VyIGRhdGE6ICR7dGhpcy50cmlnZ2VyRGF0YX1cXG5gO1xuXHRcdHMgKz0gYFxcdGNsaWVudCBvbmx5OiAke3RoaXMuY2xpZW50T25seX1cXG5gO1xuXHRcdHMgKz0gYFxcdHZhbGlkYXRvcjogJHt0aGlzLnZhbGlkYXRvcn1cXG5gO1xuXHRcdHMgKz0gYFxcdGlzIG1vZGlmaWVkOiAke3RoaXMuaXNNb2RpZmllZH1cXG5gO1xuXG5cdFx0aWYgKHRoaXMuYXR0cmlidXRlcyAhPSBudWxsKVxuXHRcdHtcblx0XHRcdHMgKz0gYFxcdGNvbXBvbmVudCBhdHRyaWJ1dGVzOlxcbmA7XG5cblx0XHRcdGZvciAobGV0IHMxIGluIHRoaXMuYXR0cmlidXRlcylcblx0XHRcdFx0cyArPSBgXFx0XFx0JHtzMX0gLS0+ICR7dGhpcy5hdHRyaWJ1dGVzW3MxXX1cXG5gO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmRhdGFQcm92aWRlciAhPSBudWxsKVxuXHRcdFx0cyArPSBgXFx0ZGF0YSBwcm92aWRlcjogJHt0aGlzLmRhdGFQcm92aWRlcn1cXG5gO1xuXG5cdFx0aWYgKHRoaXMuc2VwYXJhdG9yICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0cyArPSBgXFx0c2VwYXJhdG9yOlxcbmA7XG5cblx0XHRcdGZvciAobGV0IHMyIGluIHRoaXMuc2VwYXJhdG9yKVxuXHRcdFx0XHRzICs9IGBcXHRcXHQke3MyfSAtLT4gJHt0aGlzLnNlcGFyYXRvcltzMl19XFxuYDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fbGlzdEl0ZW1zICE9IG51bGwgJiYgdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0cyArPSBgXFx0IyBsaXN0IGl0ZW1zOiAke3RoaXMuX2xpc3RJdGVtcy5sZW5ndGh9XFxuYDtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0SXRlbXMubGVuZ3RoOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdHMgKz0gYFxcdGxpc3QgaXRlbSAke2l9IHN1Yi1wYXJhbWV0ZXJzOlxcbmA7XG5cdFx0XHRcdGZvciAobGV0IGUgPSAwOyBlIDwgdGhpcy5fbGlzdEl0ZW1zW2ldLmxlbmd0aDsgZSsrKVxuXHRcdFx0XHRcdHMgKz0gYFxcdFxcdCR7dGhpcy5fbGlzdEl0ZW1zW2ldW2VdLnRvQ29tcGFjdFN0cmluZygpfVxcbmA7XG5cdFx0XHR9XG5cblx0XHRcdHMgKz0gYFxcdGNsYXNzIG5hbWU6ICR7dGhpcy5jbGF6en1cXG5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNvbXBhY3QgZGVzY3JpcHRpb24gb2YgdGhlIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIgaW5zdGFuY2UuXG5cdCAqL1xuXHR0b0NvbXBhY3RTdHJpbmcoKVxuXHR7XG5cdFx0cmV0dXJuIGBDb25maWd1cmF0aW9uIHBhcmFtZXRlciAnJHt0aGlzLm5hbWV9JzogJHt0aGlzLnZhbHVlfSAke3RoaXMuaXNNb2RpZmllZCA/ICdbWF0nIDogJ1sgXSd9YDtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgY2F0ZWdvcnkgaWQgZm9ybSB0aGUgY2F0ZWdvcnkgbmFtZS5cblx0ICogU3BhY2VzIGFuZCBpbnZhbGlkIGNoYXJhY3RlcnMgYXJlIHJlbW92ZWQ7IHdvcmRzIGFyZSBzZXBhcmF0ZWQgdXNpbmcgY2FwaXRhbHMuXG5cdCAqL1xuXHRfc2V0SWRGcm9tQ2F0ZWdvcnlOYW1lKGNhdGVnb3J5TmFtZSlcblx0e1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSBjYXRlZ29yeU5hbWU7XG5cblx0XHQvLyBTdHJpcCBpbnZhbGlkIGNoYXJhY3RlcnNcblx0XHR2YXIgcGF0dGVybiA9IC9bXjAtOWEtekEtWl0vZztcblx0XHR0aGlzLl9jYXRlZ29yeUlkID0gdGhpcy5fY2F0ZWdvcnlJZC5yZXBsYWNlKHBhdHRlcm4sICcgJyk7XG5cblx0XHQvLyBDYXBpdGFsaXplIHdvcmRzXG5cdFx0dmFyIHdvcmRzID0gdGhpcy5fY2F0ZWdvcnlJZC5zcGxpdCgnICcpO1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSAnJztcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bGV0IHdvcmQgPSB3b3Jkc1tpXTtcblx0XHRcdGlmICh3b3JkLmxlbmd0aCA+IDApXG5cdFx0XHRcdHRoaXMuX2NhdGVnb3J5SWQgKz0gKGkgPiAwID8gd29yZC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpIDogd29yZC5zdWJzdHIoMCwxKS50b0xvd2VyQ2FzZSgpKSArICh3b3JkLmxlbmd0aCA+IDEgPyB3b3JkLnN1YnN0cigxKSA6IFwiXCIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9jYXRlZ29yeUlkLmxlbmd0aCA9PSAwKVxuXHRcdFx0dGhpcy5fY2F0ZWdvcnlJZCA9IHRoaXMuREVGQVVMVF9DQVRFR09SWV9JRDtcblx0fVxuXG5cdF9zZXRTdWJDb25maWd1cmF0aW9uUGFyYW1zKF9saXN0VmFsdWVzKVxuXHR7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zID0gW107XG5cblx0XHRmb3IgKGxldCBvYmogb2YgX2xpc3RWYWx1ZXMpXG5cdFx0e1xuXHRcdFx0bGV0IGxpc3RJdGVtID0gW107XG5cblx0XHRcdGZvciAobGV0IGRlZmF1bHRDUCBvZiB0aGlzLmRlZmF1bHRMaXN0SXRlbSlcblx0XHRcdHtcblx0XHRcdFx0bGV0IHN1YkNQID0gZGVmYXVsdENQLmNsb25lKGZhbHNlKTtcblx0XHRcdFx0c3ViQ1AudmFsdWUgPSBvYmpbc3ViQ1AubmFtZV07XG5cblx0XHRcdFx0bGlzdEl0ZW0ucHVzaChzdWJDUCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2xpc3RJdGVtcy5wdXNoKGxpc3RJdGVtKTtcblx0XHR9XG5cdH1cblxuXHRfZ2V0U3ViQ29uZmlndXJhdGlvblBhcmFtc1ZhbHVlcygpXG5cdHtcblx0XHRsZXQgX2xpc3RWYWx1ZXMgPSBbXTtcblxuXHRcdGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHR7XG5cdFx0XHRsZXQgb2JqID0ge307XG5cblx0XHRcdGZvciAobGV0IHN1YkNQIG9mIGxpc3RJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc3ViQ1AudmFsdWUgIT0gbnVsbClcblx0XHRcdFx0XHRvYmpbc3ViQ1AubmFtZV0gPSBzdWJDUC52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0X2xpc3RWYWx1ZXMucHVzaChvYmopO1xuXHRcdH1cblxuXHRcdHJldHVybiBfbGlzdFZhbHVlcztcblx0fVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeEhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3pMQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4T0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3RUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0pBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDMVFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBIiwic291cmNlUm9vdCI6IiJ9