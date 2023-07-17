/*! (c) gotoAndPlay | All rights reserved */
var application =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"application": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "assets/js/core/modules/" + ({"module-10":"module-10","module-13~module-16~module-17~module-4":"module-13~module-16~module-17~module-4","module-16":"module-16","module-4":"module-4","module-14":"module-14","module-15":"module-15","module-3":"module-3","vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9":"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9","module-11":"module-11","module-12":"module-12","module-17":"module-17","module-5":"module-5","module-6":"module-6","module-7":"module-7","module-8":"module-8","module-9":"module-9","vendors~module-0":"vendors~module-0","module-0":"module-0","vendors~module-1":"vendors~module-1","module-1":"module-1","vendors~module-13":"vendors~module-13","module-13":"module-13"}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/application.js":
/*!****************************!*\
  !*** ./src/application.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _shell_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shell-controller */ "./src/shell-controller.js");


$( document ).ready(function()
{
    console.info("SmartFoxServer 2X AdminTool ready!");

	// Create shell controller instance
	this.controller = new _shell_controller__WEBPACK_IMPORTED_MODULE_0__["ShellController"]();
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/view-stack.js":
/*!**************************************!*\
  !*** ./src/components/view-stack.js ***!
  \**************************************/
/*! exports provided: ViewStack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewStack", function() { return ViewStack; });
class ViewStack extends HTMLElement
{
	constructor()
	{
	    super();

		// Attach a shadow root
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				:host {}

				::slotted(:not([aria-selected="true"])) {
			      display: none !important;
			    }
			</style>
			<slot></slot>
		`;

		// Select first item
		this.selectedIndex = 0;
	}

	get selectedElement()
	{
		return this._selectedElement;
	}

	set selectedElement(element)
	{
		if (element != null && element.parentNode == this)
		{
			this._selectedElement = element;

			for (let element of this.children)
			{
				if (element == this._selectedElement)
					element.setAttribute('aria-selected', 'true');
				else
					element.removeAttribute('aria-selected');
			}
		}
		else
		{
			console.error('Element is not a child of ViewStack');
		}
	}

	get selectedIndex()
	{
		return Array.from(this.children).indexOf(this._selectedElement);
	}

	set selectedIndex(index)
	{
		if (this.children.length > 0)
		{
			if (this.children[index] == null)
			{
				console.error("Invalid ViewStack index");
				return;
			}

			let element = this.children[index];
			this.selectedElement = element;
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('view-stack'))
	window.customElements.define('view-stack', ViewStack);


/***/ }),

/***/ "./src/managers/chat-manager.js":
/*!**************************************!*\
  !*** ./src/managers/chat-manager.js ***!
  \**************************************/
/*! exports provided: ChatManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatManager", function() { return ChatManager; });
class ChatManager
{
	constructor(shellCtrl)
	{
		this.USERVAR_MODULE = 'mod';

		this.shellCtrl = shellCtrl;

		// TODO Implement chat manager after creating the chat UI in main shell
	}

	/**
	 * Called by the shell when the user loads a new module, so that this info
	 * can be saved in the user variables and displayed in the chat's userlist.
	 */
	setCurrentModule(moduleId)
	{
		// Save module id in user variables
		let userVar = new SFS2X.SFSUserVariable(this.USERVAR_MODULE, moduleId);
		this.shellCtrl.smartFox.send(new SFS2X.SetUserVariablesRequest([userVar]));
	}
}


/***/ }),

/***/ "./src/managers/connection-manager.js":
/*!********************************************!*\
  !*** ./src/managers/connection-manager.js ***!
  \********************************************/
/*! exports provided: ConnectionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionManager", function() { return ConnectionManager; });
/* harmony import */ var _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/event-dispatcher */ "./src/utils/event-dispatcher.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");



class ConnectionManager extends _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]
{
	constructor(shellCtrl)
	{
		super();

		this.ADMIN_ZONE_NAME = "--=={{{ AdminZone }}}==--";
		this.EXTENSION_ERROR = "error";

		this.COMMANDS_PREFIX = "admin";
		this.COMMAND_RESTART = "restart";
		this.COMMAND_HALT = "halt";

		this.shellCtrl = shellCtrl;
	}

	get smartFox()
	{
		return this._sf;
	}

	connect(config, username, password)
	{
		// Set additional configuration options
		config.zone = this.ADMIN_ZONE_NAME;
		config.debug = false;

		// Create SmartFox instance
		this._sf = new SFS2X.SmartFox(config);

		// Add listeners to SmartFox events useful to the shell
		this._addSFSEventListeners();

		// Save reference to connection details
		this._config = config;
		this._username = username;
		this._password = password;

		// Connect to SmartFoxServer instance
		this._sf.connect();
	}

	disconnect()
	{
		this._sf.disconnect();
	}

	restartServer()
	{
		if (this._sf.isConnected)
			this._sf.send(new SFS2X.ExtensionRequest(this.COMMANDS_PREFIX + "." + this.COMMAND_RESTART));
	}

	haltServer()
	{
		if (this._sf.isConnected)
			this._sf.send(new SFS2X.ExtensionRequest(this.COMMANDS_PREFIX + "." + this.COMMAND_HALT));
	}

	/* --------- PRIVATE UTILITY METHODS --------- */

	_addSFSEventListeners()
	{
		this._sf.addEventListener(SFS2X.SFSEvent.CONNECTION, this._onConnection, this);
		this._sf.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this._onConnectionLost, this);
		this._sf.addEventListener(SFS2X.SFSEvent.LOGIN, this._onLogin, this);
		this._sf.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this._onLoginError, this);
		this._sf.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse, this);
	}

	_reset()
	{
		// Remove SFS event listeners
		this._sf.removeEventListener(SFS2X.SFSEvent.CONNECTION, this._onConnection);
		this._sf.removeEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this._onConnectionLost);
		this._sf.removeEventListener(SFS2X.SFSEvent.LOGIN, this._onLogin);
		this._sf.removeEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this._onLoginError);
		this._sf.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse);

		// Delete SmartFox class instance
		this._sf = null;

		// Delete connection details
		this._config = null;
		this._username = null;
		this._password = null;
	}

	_login()
	{
		// The current AdminTool version must be sent to the server during login, to check if it is up-to-date
		let params = new SFS2X.SFSObject();
		params.putInt('clientVer', this.shellCtrl.intVersion);

		// Login
		this._sf.send( new SFS2X.LoginRequest(this._username, this._password, params, this._config.zone) );
	}

	/* --------- SMARTFOX EVENT LISTENERS --------- */

	_onConnection(evtParams)
	{
		if (evtParams.success)
		{
			// Dispatch connection event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].CONNECTION);

			// Send login request
			this._login();
		}
		else
		{
			// Dispatch error event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].ERROR, {message: `Unable to connect to ${this._config.host}:${this._config.port}`});

			// Reset status
			this._reset();
		}
	}

	_onConnectionLost(evtParams)
	{
		let reason = evtParams.reason;

		if (reason != SFS2X.ClientDisconnectionReason.MANUAL)
		{
			var msg;

			// Log disconnection message stating the reason
			if (reason == SFS2X.ClientDisconnectionReason.IDLE)
				msg = 'inactivity';
			else
			{
				msg = 'unknown reason';

				if (reason != SFS2X.ClientDisconnectionReason.UNKNOWN)
					msg += ` (server reported: ${reason})`;
			}

			// Dispatch error event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].ERROR, {message: `A disconnection occurred due to ${msg}; please reconnect`});
		}
		else
		{
			// Dispatch disconnection event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].DISCONNECTION);
		}

		// Reset
		this._reset();
	}

	_onLogin(evtParams)
	{
		let data = evtParams.data;

		let params = {
			serverVersion: data.getUtfString('serverVer'),
			serverName: data.getUtfString('serverName'),
			serverUptime: data.getIntArray('uptime'),
			procControlEnabled: data.getBool('procCtrl'),
			allowHalt: data.getBool('allowHalt'),
			modules: data.getSFSArray('modules'),
			disableVerCheck: data.getBool('disVerChk'),
		};

		// Dispatch login event
		this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].LOGIN, params);
	}

	_onLoginError(evtParams)
	{
		// Disconnect from server
		this._sf.disconnect();

		// Dispatch error event
		this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].ERROR, {message: evtParams.errorMessage});
	}

	_onExtensionResponse(evtParams)
	{
		if (evtParams.cmd == this.EXTENSION_ERROR)
		{
			let data = evtParams.params;

			// An unexpected error occurred in the Admin Tool server-side extension
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].SERVER_ERROR, {message: 'An unexpected error occurred in the Admin Tool server-side extension, please check the server-side logs; the extension reported: ' + data.getUtfString('error')});
		}
	}
}


/***/ }),

/***/ "./src/managers/module-manager.js":
/*!****************************************!*\
  !*** ./src/managers/module-manager.js ***!
  \****************************************/
/*! exports provided: ModuleManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleManager", function() { return ModuleManager; });
/* harmony import */ var _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/event-dispatcher */ "./src/utils/event-dispatcher.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");
/* harmony import */ var _modules_base_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../modules/base-module */ "./src/modules/base-module.js");





class ModuleManager extends _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]
{
	constructor(shellCtrl, container)
	{
		super();

		// Make BaseModule class globally available, so it can be extended by custom modules
		window.BaseModule = _modules_base_module__WEBPACK_IMPORTED_MODULE_3__["BaseModule"]

		this._shellCtrl = shellCtrl;
		this._container = container;
		this._currentModuleId = null;

		// Add listener for navigation items click
		this._container.on('click', '.nav-item', $.proxy(function(event) {
			event.preventDefault();

			let moduleId = event.currentTarget.dataset.id;
			let moduleData = this._moduleConfigById[moduleId];

			if (moduleId != this._currentModuleId)
			{
				// Load selected module
				this._loadModule(moduleData);
			}

			// Close navigation
			this._shellCtrl._toggleNav(false);
		}, this));

		// Add listener to show tooltip
		this._container.kendoTooltip({
			filter: 'li[data-id]',
			content: $.proxy(function(event) {
				let moduleId = event.target[0].dataset.id;
				let moduleData = this._moduleConfigById[moduleId];
		        return `<strong>${moduleData.name}</strong><br><span>${moduleData.description}</span>`;
		    }, this)
		});

		/* TESTING MEMORY LEAKS IN MODULES LOADING
		ADD THIS IN THE MAIN VIEW TO START THE TEST: <div><button id="temp">test</button><span id="cnt"></span></div>
		$('#temp').click(
			$.proxy(function(event)
			{
				this.cnt = 0;
				if (this.timer == null)
				{
					this.timer = window.setInterval($.proxy(function() {

						$('#cnt').text(this.cnt++)
						if (this._currentModuleId == 'Dashboard')
							this._loadModule(this._moduleConfigById['ServerConfigurator']);
						else
							this._loadModule(this._moduleConfigById['Dashboard']);
					}, this), 500);
				}
				else
				{
					window.clearInterval(this.timer);
					this.timer = null;
				}
			}, this)
		);
		*/
	}

	initModulesList(modulesData, loadModuleId = null)
	{
		// SETUP MODULES LIST

		// Empty container of module selection buttons
		this._container.empty();

		this._moduleConfigById = {};
		var firstModule = null;
		var loadModule = null;

		for (let i = 0; i < modulesData.size(); i++)
		{
			let moduleData = this._getModuleObject(modulesData.getSFSObject(i));

			this._moduleConfigById[moduleData.id] = moduleData;

			// Get first module
			if (i == 0)
				firstModule = moduleData;

			// Get passed module
			if (moduleData.id == loadModuleId)
				loadModule = moduleData;

			// Display module button
			let moduleButton = this._createModuleButton(moduleData);
			let element = this._container.append(moduleButton);
		}

		// LOAD INITIAL MODULE

		// If module is not passed, load the first one of the modules list
		if (loadModule == null)
			loadModule = firstModule;

		this._loadModule(loadModule);
	}

	unloadModule()
	{
		this._destroyCurrentModule();
	}

	get currentModuleId()
	{
		return this._currentModuleId;
	}

	get currentModule()
	{
		return document.querySelector('.module');
	}

	_getModuleObject(sfsObj)
	{
		return {
			id: sfsObj.getUtfString('id'),
			name: sfsObj.getUtfString('name'),
			description: sfsObj.getUtfString('description'),
			spacing: sfsObj.getBool('spacing'),
			icon: sfsObj.containsKey('iconSvg') ? sfsObj.getUtfString('iconSvg') : '',
			tag: Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_2__["toKebabCase"])(sfsObj.getUtfString('id')),
			isCustom: sfsObj.getBool('isCustom')
		}
	}

	_createModuleButton(moduleData)
	{
		return `
			<li class="nav-item ${moduleData.spacing ? 'mr-lg-3' : ''}" data-id="${moduleData.id}">
				<div class="module-icon">${moduleData.icon}</div>
				<label>${moduleData.name}</label>
			</li>
		`;
	}

	_loadModule(moduleData)
	{
		if (moduleData == null)
			return;
		
		// Load the HTML file of a module
		$('<module/>').load(`modules/${moduleData.tag}.html`, $.proxy(function(html, status) {

			if (status != 'error')
			{
				if (!moduleData.isCustom)
				{
					// Load the JS file of a standard module
					__webpack_require__("./src/modules lazy recursive ^\\.\\/.*\\.js$")(`./${moduleData.tag}.js`).then(module => {
						this._onModuleControllerLoadSuccess(moduleData, html, module);
					})
					.catch(error => {
						this._onModuleControllerLoadError(moduleData, error);
					});
				}
				else
				{
					// Load the JS file of a custom module
					import(/* webpackIgnore: true */`../custom-modules/${moduleData.tag}.js`).then(module => {
						this._onModuleControllerLoadSuccess(moduleData, html, module);
					})
					.catch(error => {
						this._onModuleControllerLoadError(moduleData, error);
					});
				}
			}
			else
			{
				// Dispatch error event
				this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ModuleManagerEvent"].MODULE_LOAD_ERROR, {message: `${moduleData.name} module's view (html) not found.`});
			}
		}, this));
	}

	_onModuleControllerLoadSuccess(moduleData, html, module)
	{
		// Destroy current module
		this._destroyCurrentModule();

		// Define loaded module (if necessary)
		if (!window.customElements.get(moduleData.tag + '-module'))
			window.customElements.define(moduleData.tag + '-module', module.default);

		// Append new module
		$('div.module-loader').append(html);

		// Initialize module
		this.currentModule.initialize(moduleData, this._shellCtrl);

		// Save current module id
		this._currentModuleId = moduleData.id;

		// Dispatch event
		this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ModuleManagerEvent"].MODULE_LOADED, {moduleData: moduleData});
	}

	_onModuleControllerLoadError(moduleData, error)
	{
		// Log error details
		this._shellCtrl.logMessage(error, 'warn');

		// Dispatch error event
		this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ModuleManagerEvent"].MODULE_LOAD_ERROR, {message: `${moduleData.name} custom module's controller (js) couldn't be loaded.`});
	}

	_destroyCurrentModule()
	{
		// Get a reference to current module
		const mod = this.currentModule;

		// Call destroy method on module's class
		if (mod != null)
			mod.destroy();

		// Empty module container
		$('div.module-loader').empty();

		this._currentModuleId = null;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/modules lazy recursive ^\\.\\/.*\\.js$":
/*!********************************************************!*\
  !*** ./src/modules lazy ^\.\/.*\.js$ namespace object ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./analytics.js": [
		"./src/modules/analytics.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"vendors~module-0",
		"module-0"
	],
	"./ban-manager.js": [
		"./src/modules/ban-manager.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"vendors~module-1",
		"module-1"
	],
	"./base-module.js": [
		"./src/modules/base-module.js"
	],
	"./blue-box-monitor.js": [
		"./src/modules/blue-box-monitor.js",
		"module-3"
	],
	"./cluster-configurator.js": [
		"./src/modules/cluster-configurator.js",
		"module-13~module-16~module-17~module-4",
		"module-4"
	],
	"./cluster-monitor.js": [
		"./src/modules/cluster-monitor.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-5"
	],
	"./cluster-updater.js": [
		"./src/modules/cluster-updater.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-6"
	],
	"./console.js": [
		"./src/modules/console.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-7"
	],
	"./dashboard.js": [
		"./src/modules/dashboard.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-8"
	],
	"./extension-deployer.js": [
		"./src/modules/extension-deployer.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-9"
	],
	"./extension-manager.js": [
		"./src/modules/extension-manager.js",
		"module-10"
	],
	"./license-manager.js": [
		"./src/modules/license-manager.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-11"
	],
	"./log-viewer.js": [
		"./src/modules/log-viewer.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-12"
	],
	"./server-configurator.js": [
		"./src/modules/server-configurator.js",
		"vendors~module-13",
		"module-13~module-16~module-17~module-4",
		"module-13"
	],
	"./servlet-manager.js": [
		"./src/modules/servlet-manager.js",
		"module-14"
	],
	"./template.js": [
		"./src/modules/template.js",
		"module-15"
	],
	"./zone-configurator.js": [
		"./src/modules/zone-configurator.js",
		"module-13~module-16~module-17~module-4",
		"module-16"
	],
	"./zone-monitor.js": [
		"./src/modules/zone-monitor.js",
		"vendors~mod-0~mod-1~mod-11~mod-12~mod-17~mod-5~mod-6~mod-7~mod-8~mod-9",
		"module-13~module-16~module-17~module-4",
		"module-17"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/modules lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/modules/base-module.js":
/*!************************************!*\
  !*** ./src/modules/base-module.js ***!
  \************************************/
/*! exports provided: BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return BaseModule; });
class BaseModule extends HTMLElement
{
	constructor(commandsPrefix)
	{
	    super();

		this._commandsPrefix = commandsPrefix;
	}

	get shellCtrl()
	{
		return this._shellCtrl;
	}

	get smartFox()
	{
		return this._shellCtrl.smartFox;
	}

	get idData()
	{
		return this._idData;
	}

	//---------------------------------
	// OVERRIDABLE METHODS
	//---------------------------------

	/**
	 * Called by the modules manager after loading the module.
	 * In case it is overridden, super must always be called!
	 */
	initialize(idData, shellController)
	{
		this._idData = idData;
		this._shellCtrl = shellController;

		// Add listener to Admin extension messages
		this.smartFox.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse, this);
	}

	/**
	 * Called by the modules manager before unloading the module.
	 * In case it is overridden, super must always be called!
	 */
	destroy()
	{
		// Remove listener to Admin extension messages
		this.smartFox.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse);

		// Destroy all Kendo widgets
		kendo.destroy($('.module'));
	}

	/**
	 * Called by the onExtensionResponse listener below.
	 * Must be overridden.
	 */
	onExtensionCommand(cmd, data)
	{
		// Nothing to do
	}

	/**
	 * Called by the main shell whenever the server uptime changes.
	 * Can be overridden to display the uptime inside a module or make calculations on the server uptime.
	 */
	onUptimeUpdated(values)
	{
		// Nothing to do
	}

	//---------------------------------
	// PUBLIC METHODS
	//---------------------------------

	/**
	 * Send a request to Admin extension.
	 */
	sendExtensionRequest(command, data = null)
	{
		if (data == null)
			data = new SFS2X.SFSObject();

		this.smartFox.send(new SFS2X.ExtensionRequest(`${this._commandsPrefix}.${command}`, data));
	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_onExtensionResponse(evtParams)
	{
		// Filter server responses
		let commands = evtParams.cmd.split('.');
		let data = evtParams.params;

		if (commands[0] == this._commandsPrefix)
		{
			if (commands.length > 1)
				this.onExtensionCommand(commands[1], data)
		}
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/shell-controller.js":
/*!*********************************!*\
  !*** ./src/shell-controller.js ***!
  \*********************************/
/*! exports provided: ShellController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShellController", function() { return ShellController; });
/* harmony import */ var _components_view_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/view-stack */ "./src/components/view-stack.js");
/* harmony import */ var _managers_module_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./managers/module-manager */ "./src/managers/module-manager.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
/* harmony import */ var _managers_connection_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./managers/connection-manager */ "./src/managers/connection-manager.js");
/* harmony import */ var _managers_chat_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./managers/chat-manager */ "./src/managers/chat-manager.js");
/* harmony import */ var _utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/dot-properties-parse */ "./src/utils/dot-properties-parse.js");
/* harmony import */ var _utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5__);








class ShellController
{
	constructor()
	{
		// Set constants and variables

		this.VERSION_MAJOR = 3;
		this.VERSION_MINOR = 2;
		this.VERSION_SUB = 9;

		this.DEFAULT_WS_PORT = 8080;
		this.DEFAULT_WSS_PORT = 8443;

		this.DEFAULT_USERNAME = 'sfsadmin';
		this.DEFAULT_PASSWORD = 'sfsadmin';

		this._loginValidator = null;

		// Display version
		$('.admin-version').text('v' + this.stringVersion);

		// Create modules manager instance and add event listeners
		this._modManager = new _managers_module_manager__WEBPACK_IMPORTED_MODULE_1__["ModuleManager"](this, $('.nav-main'));
		this._modManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ModuleManagerEvent"].MODULE_LOADED, this._onModuleLoaded, this);
		this._modManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ModuleManagerEvent"].MODULE_LOAD_ERROR, this._onModuleLoadError, this);

		// Create connection manager instance and add event listeners
		this._connManager = new _managers_connection_manager__WEBPACK_IMPORTED_MODULE_3__["ConnectionManager"](this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].CONNECTION, this._onConnection, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].LOGIN, this._onLogin, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].DISCONNECTION, this._onDisconnection, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].ERROR, this._onConnManagerError, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].SERVER_ERROR, this._onServerError, this);

		// Create admin chat manager
		this._chatManager = new _managers_chat_manager__WEBPACK_IMPORTED_MODULE_4__["ChatManager"](this);

		/* --------------------------- */

		// Initialize views
		this._initViews();

		// Show login view
		this._switchShellView('login-view');
	}

	//---------------------------------
	// VIEW INITIALIZERS
	//---------------------------------

	/**
	 * Initialize login view.
	 */
	_initLoginView()
	{
		// Set default input values (password never saved)
		let host = window.location.hostname;
		let port = window.location.protocol == 'https:' ? this.DEFAULT_WSS_PORT : this.DEFAULT_WS_PORT;
		let encrypt = window.location.protocol == 'https:';
		let user = 'sfsadmin';
		let remember = false;

		// Load "last-server" cookie
		let data = Cookies.getJSON('last-server')
        if (data)
		{
			host = data.host;
            port = data.port;
			encrypt = data.encrypt;
			user = data.user;
			remember = true;
        }

		// Retrieve host from GET parameter
		let getHost = this._getUrlParameter('host');
		if (getHost)
			host = getHost;

		// Set input values
		$('#loginHost').val(host);
		$('#loginUsername').val(user);
		$('#loginEncrypt').prop('checked', encrypt);
		$('#rememberLogin').prop('checked', remember);

		// Initialize numeric input
		$('#loginPort').kendoNumericTextBox({
			format: '#####',
			value: port
		});

		// Initialize the Kendo UI Validator on the "form" container
		// (NOTE: does NOT have to be an actual <form> tag)
		this._loginValidator = $('#loginForm').kendoValidator({
			validateOnBlur: true
		}).data('kendoValidator');

		// Add listener to validate the form when the Connect button is clicked
		$('#loginButton').click($.proxy(this._onConnectClick, this));

		// Add listener to submit form on Enter key press
		$('#loginForm').keyup(function(event) {
			if (event.key !== 'Enter') return;

			$('#loginButton').click();
			event.preventDefault();
		});

		// Add listener to encrypt checkbox
		$('#loginEncrypt').change($.proxy(function(event) {
			let port = this.DEFAULT_WS_PORT;

			if ($('#loginEncrypt').prop('checked'))
				port = this.DEFAULT_WSS_PORT;

			$('#loginPort').data('kendoNumericTextBox').value(port);
		}, this));

		// Hide error message container
		$('#login-error').hide();
	}

	/**
	 * Initialize module view.
	 */
	_initModuleView()
	{
		// Add listeners to open/close menu buttons
		$('.nav-open').click($.proxy(function(event) {
			event.preventDefault();
			this._toggleNav(true);
		}, this));

		$('.nav-close, .nav-overlay').click($.proxy(function(event) {
			event.preventDefault();
			this._toggleNav(false);
		}, this));

		// Add listeners to service buttons
		$('#restart-button').click($.proxy(this._onRestartClick, this));
		$('#halt-button').click($.proxy(this._onHaltClick, this));
		$('#help-button').click($.proxy(this._onHelpClick, this));
		$('#disconnect-button').click($.proxy(this._onDisconnectClick, this));

		// Add listener to show tooltip on service buttons hover
		$('.nav-service').kendoTooltip({
			filter: 'li[title]'
		});

		// Add listener to scroll main view to top if status bar is clicked
		$('#status-bar').click(function(event) {
			event.preventDefault();
			$('main').animate({ scrollTop: 0 }, 'fast');
		});
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	/**
	 * Validate login form and connect+login to SmartFoxServer.
	 */
	_onConnectClick(event)
	{
		// Hide any previous error message
		$('#login-error').hide();
		$('#login-error').text('');

		// Validate login form
		if (this._loginValidator.validate())
		{
			// Disable login form
			this._enableLoginForm(false);

			// Retrieve connection details
			let config = {};
			config.host = $('#loginHost').val().trim();
			config.port = $('#loginPort').data('kendoNumericTextBox').value();
			config.useSSL = $('#loginEncrypt').prop('checked');

			let username = $('#loginUsername').val().trim();
			let password = $('#loginPassword').val();

			// Save input values to cookie (except password)...
			// ...or clear previously saved cookie
			if ($('#rememberLogin').prop('checked'))
			{
				Cookies.set('last-server', {
					host: config.host,
					port: config.port,
					encrypt: config.useSSL,
					user: username

				}, {expires: 30});
			}
			else
			{
				Cookies.remove('last-server');
			}

			// Connect to SFS2X & login
			this._connManager.connect(config, username, password);
		}
	}

	/**
	 * Restart SmartFoxServer.
	 */
	_onRestartClick(event)
	{
		let message = 'Are you sure you want to stop and restart this instance of SmartFoxServer 2X?';
		this.showConfirmWarning(message, $.proxy(this._onRestartConfirmDialogConfirm, this));
	}

	/**
	 * Halt SmartFoxServer.
	 */
	_onHaltClick(event)
	{
		let message = 'Are you sure you want to stop this instance of SmartFoxServer 2X?<br>You won\'t be able to restart it using the Administration Tool.';
		this.showConfirmWarning(message, $.proxy(this._onHaltConfirmDialogConfirm, this));
	}

	/**
	 * Open online documentation.
	 */
	_onHelpClick(event)
	{
		// Open online doc
		window.open(`http://docs2x.smartfoxserver.com/GettingStarted/admintool-${this._modManager.currentModuleId}`, '_blank');
	}

	/**
	 * Disconnect from server.
	 */
	_onDisconnectClick(event)
	{
		this._connManager.disconnect();
	}

	//------------------------------------
	// CONNECTION MANAGER EVENT LISTENERS
	//------------------------------------

	_onConnection(evtParams)
	{
		// Log message
		this.logMessage(`Connection to ${this._connManager.smartFox.config.host}:${this._connManager.smartFox.config.port} established`);
	}

	_onLogin(evtParams)
	{
		// Log message
		this.logMessage(`Successful login to ${this._connManager.smartFox.config.host}:${this._connManager.smartFox.config.port} performed`);

		// Get last loaded module from cookies
		let loadModuleId = null;
		let data = Cookies.getJSON('last-module')
        if (data)
			loadModuleId = data.id;

		// Init the modules list with the configuration returned by the server and: load last saved module, or first module in the list, or passed module id
		this._modManager.initModulesList(evtParams.modules, loadModuleId);

		// Save current uptime and timestamp
		this._uptimeSecs = this._uptimeToSecs(evtParams.serverUptime);
		this._lastTimestamp = Date.now();

		// Show/hide Halt and Restart buttons depending if:
		// 1) this feature is supported for the server operating system
		// 2) the administrator who just logged in has the permission to execute these actions
		this._showHaltRestartButtons(evtParams.procControlEnabled && evtParams.allowHalt);

		// Switch to modules view
		this._goToModulesView(evtParams.serverVersion, evtParams.serverName, evtParams.disableVerCheck);

		// If default username and password have been used...
		if ($('#loginUsername').val() == this.DEFAULT_USERNAME && $('#loginPassword').val() == this.DEFAULT_PASSWORD)
		{
			// ...show alert
			this.showSimpleAlert('You are using the default administration profile which is highly insecure, please make sure to immediately change the password.');

			// ...show non-removable message in alert bar
			$('#alert-bar').show();
			$('#alert-bar').text('You are using the default administration profile which is highly insecure, please change the password.');
		}
	}

	/**
	 * Listener called when the user disconnected voluntarily.
	 */
	_onDisconnection(evtParams)
	{
		// Remove any popup or alert
		this.removeDialog();

		// Switch back to login view
		this._goToLoginView();

		// Hide navigation if open
		this._toggleNav(false);
	}

	/**
	 * Listener called when an error caused a disconnection.
	 */
	_onConnManagerError(evtParams)
	{
		// Remove any popup or alert
		this.removeDialog();

		// Log system message
		this.logMessage(evtParams.message, 'warn');

		// Switch back to login view
		this._goToLoginView();

		// Display error in login view
		$('#login-error').text(evtParams.message);
		$('#login-error').show();
	}

	/**
	 * Listener called when an unexpected server-side error occurs.
	 */
	_onServerError(evtParams)
	{
		// Show an alert
		this.showSimpleAlert(evtParams.message);
	}

	//---------------------------------
	// OTHER EVENT LISTENERS
	//---------------------------------

	_onModuleLoaded(evtParams)
	{
		const moduleData = evtParams.moduleData;

		// Save last loaded module to cookies
		Cookies.set('last-module', {
			id: moduleData.id
		}, {expires: 30});

		// Display module title
		$('#module-title').show();
		$('#module-title-label').text(moduleData.name);

		// Tell the chat manager which module has been loaded
		this._chatManager.setCurrentModule(moduleData.id);

		// Assign the .selected class to the selected navigation item
		$('.nav-main').find(`[data-id='${moduleData.id}']`).addClass('selected').siblings('.selected').removeClass('selected');
	}

	_onModuleLoadError(evtParams)
	{
		// Show an alert
		this.showSimpleAlert(evtParams.message);
	}

	_onRestartConfirmDialogConfirm()
	{
		// Send restart server request
		this._connManager.restartServer();
	}

	_onHaltConfirmDialogConfirm()
	{
		// Send halt server request
		this._connManager.haltServer();
	}

	//---------------------------------
	// PUBLIC METHODS
	// This members are used by the sub-managers (i.e. ConnectionManager)
	// or the modules to communicate with this shell controller.
	//---------------------------------

	get smartFox()
	{
		return this._connManager.smartFox;
	}

	get intVersion()
	{
		var version = this.VERSION_MAJOR;
		version += (this.VERSION_MINOR < 10 ? '0' : '') + this.VERSION_MINOR;
		version += (this.VERSION_SUB < 10 ? '0' : '') + this.VERSION_SUB;

		return Number(version);
	}

	get stringVersion()
	{
		return this.VERSION_MAJOR + '.' + this.VERSION_MINOR + '.' + this.VERSION_SUB;
	}

	getSfsVersion()
	{
		return this._currentSfsVersion;
	}

	logMessage(message, type = 'log')
	{
		switch (type) {
			case 'info':
				console.info('[ ADMINTOOL | INFO ] ' + message);
				break;
			case 'warn':
				console.warn('[ ADMINTOOL | WARN ] ' + message);
				break;
			case 'error':
				console.error('[ ADMINTOOL | ERROR ] ' + message);
				break;
			default:
				console.log('[ ADMINTOOL | INFO ] ' + message);
		}
	}

	removeDialog()
	{
		// Hide any showing modal
		$('.modal').modal('hide');

		// Hide any showing toast
		$('.toast').toast('hide');

		// Remove shell's dialog
		if (this._dialog != null)
		{
			this._dialog.close();
			this._dialog.destroy();
			this._dialog = null;
		}

		// Enable the following if other Kendo dialogs are used in modules
		/*
		// Remove any other dialog (inner to module)
		$('.k-dialog-content').each(function(index) {
			// Confirm dialog
			let confirm = $(this).data('kendoConfirm');
			if (confirm)
			{
				confirm.close();
				confirm.destroy();
			}
		});
		*/
	}

	/**
	 * Show simple alert.
	 */
	showSimpleAlert(text, isWarning = true)
	{
		// Create and show dialog
		this._dialog = kendo.alert(text);
		this._dialog.title(isWarning ? 'Warning' : 'Information');

		// Set custom class for styling
		this._dialog.wrapper.addClass(isWarning ? 'is-warning' : 'is-info');

		// Log message too
		// (we encapsule the text in a span and extract the text again to remove inner html tags)
		let html = $('<span>' + text + '</span>');
		this.logMessage(html.text(), isWarning ? 'warn' : 'info');
	}

	/**
	 * Show confirm alert.
	 */
	showConfirmWarning(text, confirmHandler)
	{
		// Create dialog
		this._dialog = $('<div></div>').kendoConfirm({
	      title: 'Warning',
	      content: text,
		  actions: [
	          {
	              text: 'OK',
	              primary: true,
	              action: confirmHandler
	          },
	      ]
	  	}).data('kendoConfirm');

		// Set custom class for styling
		this._dialog.wrapper.addClass('is-warning');

		// Show dialog
		this._dialog.open();
	}

	showNotification(title, message)
	{
		// Display notification
		let toast = $(`
			<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
				<div class="toast-header">
					<strong class="mr-auto">${title}</strong>
					<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="toast-body">${message}</div>
			</div>
		`);

		$('.toast-container').append(toast);
		toast.toast('show');

		// Log message too
		// (we encapsule the text in a span and extract the text again to remove inner html tags)
		let html = $('<span>' + title + ' - ' + message + '</span>');
		this.logMessage(html.text(), 'info');
	}

	updateModuleTitle(title, asSuffix = false)
	{
		$('#module-title-label').text( (asSuffix ? $('#module-title-label').text() : '') + title );
	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_initViews()
	{
		// Initialize login view
		this._initLoginView();

		// Initialize module view
		this._initModuleView();
	}

	/**
	 * Switch view in top view stack.
	 * @param  {string} viewId Identifier of the viewstask child to display.
	 */
	_switchShellView(viewId)
	{
		document.getElementById('shell').selectedElement = document.getElementById(viewId);

		// (jQuery alternative)
		// $('#shell')[0].selectedElement = $('#shell').children('#' + viewId)[0];
	}

	/**
	 * Enable/disable login form.
	 */
	_enableLoginForm(enable)
	{
		// Enable/disable fieldset (works for all non-kendo inputs)
		$('#loginForm fieldset').prop('disabled', !enable);

		// Enable/disable numeric textbox
		$('#loginPort').data('kendoNumericTextBox').enable(enable);
	}

	_toggleNav(bool)
	{
		$('.nav-container, .nav-overlay').toggleClass('is-visible', bool);
		$('.module-container').toggleClass('scale-down', bool);
	}

	_getUrlParameter(param)
	{
		let pageURL = window.location.search.substring(1);
		let urlVariables = pageURL.split('&');

		for (var i = 0; i < urlVariables.length; i++) {
			let paramName = urlVariables[i].split('=');
			if (paramName[0] == param && paramName[1] != '')
				return paramName[1];
		}

		return null;
	}

	_goToLoginView()
	{
		// Clear password field
		$('#loginPassword').val('');

		// Switch to login view
		this._switchShellView('login-view');

		// Unload current module
		this._modManager.unloadModule();

		// Enable login form
		this._enableLoginForm(true);

		// Remove uptime updater
		clearInterval(this._uptimeTimer);
	}

	_goToModulesView(serverVersion, serverName, disableVerCheck)
	{
		// Hide module title
		$('#module-title').hide();
		$('#module-title-label').text('');

		// Hide alert bar
		$('#alert-bar').hide();

		// Show server version in the header
		$('#sfs-version-value').text(serverVersion);

		// Set server name, IP and port in module's title bar
		let host = `${this._connManager.smartFox.config.host}:${this._connManager.smartFox.config.port}` + (serverName != '' ? ` [${serverName}]` : '');
		$('#host-label').text(host);

		// Save current SFS version
		this._currentSfsVersion = serverVersion;

		// Check new SFS version availability (unless disabled in the server-side configuration xml)
		if (!disableVerCheck)
			this._checkAvailableSfsVersion();

		// Start uptime updater
		this._uptimeTimer = setInterval($.proxy(this._updateUptime, this), 1000);

		// Switch to modules view
		this._switchShellView('module-view');
	}

	_showHaltRestartButtons(show)
	{
		if (show)
		{
			$('#restart-button').show();
			$('#halt-button').show();
		}
		else
		{
			$('#restart-button').hide();
			$('#halt-button').hide();
		}
	}

	_checkAvailableSfsVersion()
	{
		// Remove class to hide update button style and notification icon
		$('#sfs-version').removeClass('is-active');

		// Remove update button click listeners
		$('#sfs-version-button').off('click');

		// Load file containing latest SFS version info
		$.ajax({
			type: 'GET',
			url: 'https://www.smartfoxserver.com/downloads/sfs2x/latestVersion.txt',
        	dataType: 'text',
			success: $.proxy(this._onLatestSfsVersionInfoLoaded, this),
			error: $.proxy(function() {
				this.logMessage('Unable to check new server version availability on SmartFoxServer website', 'warn');
			}, this)
		});
	}

	_onLatestSfsVersionInfoLoaded(data)
	{
		// Parse returned data
		const v = Object(_utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5__["parse"])(data);

		if (v.version != null && this._isSfsVersionNewer(v.version, this._currentSfsVersion))
		{
			this.tempflag = true;
			this.logMessage('An updated version of SmartFoxServer 2X is available for download', 'info');

			// Set upgrade dialog details
			this._sfsUpdateDetails = v;

			// Add listener to show SFS version update modal
			$('#sfs-version-button').click(function() {
				$('#serverUpdateModal').modal({
					backdrop: 'static',
					keyboard: false,
				});
			});

			// Set class to show update button style and notification icon
			$('#sfs-version').addClass('is-active');

			// Update modal content
			const newVer = this._sfsUpdateDetails;
			const currVer = this._currentSfsVersion;

			let modal = $('#serverUpdateModal');

			// Update modal content
			$('#newVersLb', modal).text(newVer.version);
			$('#updTypeLb', modal).text(newVer.isPatch ? 'patch' : 'full installer');
			$('#reqVersLb', modal).text(newVer.isPatch ? ' (requires version ' + newVer.requires + ' or later)' : '');
			$('#currVersLb', modal).text(currVer);
			$('#serverUpdateModalLink', modal).attr('href', newVer.url);
		}
	}

	_isSfsVersionNewer(availableVer, currentVer)
	{
		const MAJ = 0;
		const MIN = 1;
		const SUB = 2;

		const available = availableVer.split('.');
		const current = currentVer.split('.');

		// Check major version
		if (available[MAJ] > current[MAJ])
			return true;
		else if (available[MAJ] == current[MAJ])
		{
			// Check minor version
			if (available[MIN] > current[MIN])
				return true;
			else if (available[MIN] == current[MIN])
			{
				// Check sub version
				if (available[SUB] > current[SUB])
					return true;
			}
		}

		return false;
	}

	_updateUptime()
	{
		const currTimestamp = Date.now();
		const elapsedSec = Math.round((currTimestamp - this._lastTimestamp) / 1000);

		this._uptimeSecs += elapsedSec;
		this._lastTimestamp = currTimestamp;

		// Send updated uptime to current module (if loaded)
		let module = this._modManager.currentModule;
		if (module != null)
		{
			let counter = this._uptimeSecs;
			let uptimeArr = [];

			uptimeArr[0] = Math.floor(counter / (24 * 60 * 60));	// days
			counter -= uptimeArr[0] * 24 * 60 * 60;

			uptimeArr[1] = Math.floor(counter / (60 * 60));			// hours
			counter -= uptimeArr[1] * 60 * 60;

			uptimeArr[2] = Math.floor(counter / 60);				// minutes
			counter -= uptimeArr[2] * 60;

			uptimeArr[3] = counter;									// seconds

			module.onUptimeUpdated(uptimeArr);
		}
	}

	_uptimeToSecs(uptimeArr)
	{
		let uptime = 0;

		uptime += uptimeArr[0] * 24 * 60 * 60;	// days
		uptime += uptimeArr[1] * 60 * 60; 		// hours
		uptime += uptimeArr[2] * 60; 			// minutes
		uptime += uptimeArr[3];					// seconds

		return uptime;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/utils/dot-properties-parse.js":
/*!*******************************************!*\
  !*** ./src/utils/dot-properties-parse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const atComment = (src, offset) => {
  const ch = src[offset]
  return ch === '#' || ch === '!'
}

const atLineEnd = (src, offset) => {
  const ch = src[offset]
  return !ch || ch === '\r' || ch === '\n'
}

const endOfIndent = (src, offset) => {
  let ch = src[offset]
  while (ch === '\t' || ch === '\f' || ch === ' ') {
    offset += 1
    ch = src[offset]
  }
  return offset
}

const endOfComment = (src, offset) => {
  let ch = src[offset]
  while (ch && ch !== '\r' && ch !== '\n') {
    offset += 1
    ch = src[offset]
  }
  return offset
}

const endOfKey = (src, offset) => {
  let ch = src[offset]
  while (ch && ch !== '\r' && ch !== '\n' && ch !== '\t' && ch !== '\f' && ch !== ' ' && ch !== ':' && ch !== '=') {
    if (ch === '\\') {
      if (src[offset + 1] === '\n') {
        offset = endOfIndent(src, offset + 2)
      } else {
        offset += 2
      }
    } else {
      offset += 1
    }
    ch = src[offset]
  }
  return offset
}

const endOfSeparator = (src, offset) => {
  let ch = src[offset]
  let hasEqSign = false
  loop: while (ch === '\t' || ch === '\f' || ch === ' ' || ch === '=' || ch === ':' || ch === '\\') {
    switch (ch) {
      case '\\':
        if (src[offset + 1] !== '\n') break loop
        offset = endOfIndent(src, offset + 2)
        break
      case '=':
      case ':':
        if (hasEqSign) break loop
        hasEqSign = true
        // fallthrough
      default:
        offset += 1
    }
    ch = src[offset]
  }
  return offset
}

const endOfValue = (src, offset) => {
  let ch = src[offset]
  while (ch && ch !== '\r' && ch !== '\n') {
    offset += ch === '\\' ? 2 : 1
    ch = src[offset]
  }
  return offset
}

const unescape = (str) => str.replace(/\\(u[0-9a-fA-F]{4}|\r?\n[ \t\f]*|.)?/g, (match, code) => {
  switch (code && code[0]) {
    case 'f': return '\f'
    case 'n': return '\n'
    case 'r': return '\r'
    case 't': return '\t'
    case 'u':
      const c = parseInt(code.substr(1), 16)
      return isNaN(c) ? code : String.fromCharCode(c)
    case '\r':
    case '\n':
    case undefined:
      return ''
    default:
      return code
  }
})

/**
 * Splits the input string into an array of logical lines
 *
 * Key-value pairs are [key, value] arrays with string values. Escape sequences
 * in keys and values are parsed. Empty lines are included as empty strings, and
 * comments as strings that start with '#' or '! characters. Leading whitespace
 * is not included.
 *
 * @see https://docs.oracle.com/javase/9/docs/api/java/util/Properties.html#load(java.io.Reader)
 *
 * @param {string} src
 * @returns Array<string | string[]]>
 */
function parseLines (src) {
  const lines = []
  for (i = 0; i < src.length; ++i) {
    if (src[i] === '\n' && src[i - 1] === '\r') i += 1
    if (!src[i]) break
    const keyStart = endOfIndent(src, i)
    if (atLineEnd(src, keyStart)) {
      lines.push('')
      i = keyStart
      continue
    }
    if (atComment(src, keyStart)) {
      const commentEnd = endOfComment(src, keyStart)
      lines.push(src.slice(keyStart, commentEnd))
      i = commentEnd
      continue
    }
    const keyEnd = endOfKey(src, keyStart)
    const key = unescape(src.slice(keyStart, keyEnd))
    const valueStart = endOfSeparator(src, keyEnd)
    if (atLineEnd(src, valueStart)) {
      lines.push([key, ''])
      i = valueStart
      continue
    }
    const valueEnd = endOfValue(src, valueStart)
    const value = unescape(src.slice(valueStart, valueEnd))
    lines.push([key, value])
    i = valueEnd
  }
  return lines
}

/**
 * Parses an input string read from a .properties file into a JavaScript Object
 *
 * If the second `path` parameter is true, dots '.' in keys will result in a
 * multi-level object (use a string value to customise). If a parent level is
 * directly assigned a value while it also has a child with an assigned value,
 * the parent value will be assigned to its empty string '' key. Repeated keys
 * will take the last assigned value. Key order is not guaranteed, but is likely
 * to match the order of the input lines.
 *
 * @param {string} src
 * @param {boolean | string} [path=false]
 */
function parse (src, path) {
  const pathSep = typeof path === 'string' ? path : '.'
  return parseLines(src).reduce((res, line) => {
    if (Array.isArray(line)) {
      const [key, value] = line
      if (path) {
        const keyPath = key.split(pathSep)
        let parent = res
        while (keyPath.length >= 2) {
          const p = keyPath.shift()
          if (!parent[p]) {
            parent[p] = {}
          } else if (typeof parent[p] !== 'object') {
            parent[p] = { '': parent[p] }
          }
          parent = parent[p]
        }
        const leaf = keyPath[0]
        if (typeof parent[leaf] === 'object') {
          parent[leaf][''] = value
        } else {
          parent[leaf] = value
        }
      } else {
        res[key] = value
      }
    }
    return res
  }, {})
}

module.exports = { parse, parseLines }


/***/ }),

/***/ "./src/utils/event-dispatcher.js":
/*!***************************************!*\
  !*** ./src/utils/event-dispatcher.js ***!
  \***************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
class EventDispatcher {
	constructor() {
		this._listenersByEvent = {};
	}

	/**
	 * Registers an event listener function that will receive notification of an event.
	 *
	 * <p>If you no longer need an event listener, remove it by calling the <em>removeEventListener()</em> method, or memory issues could arise.
	 * In fact event listeners are not automatically removed from memory.</p>
	 *
	 * @param	{string} evtType	The type of event to listen to.
	 * @param	{function} callback	The listener function that processes the event. This function should accept an object as its only parameter, which in turn contains the event parameters.
	 * @param	{object} scope		The object that acts as a context for the event listener: it is the object that acts as a "parent scope" for the callback function, thus providing context (i.e. access to variables and other mehtods) to the function itself.
	 */
	addEventListener(evtType, callback, scope)
	{
		if (!this._listenersByEvent[evtType])
			this._listenersByEvent[evtType] = [];

		this._listenersByEvent[evtType].push({callback:callback, scope:scope});
	}

	/**
	 * Removes an event listener.
	 *
	 * @param	{string} evtType	The type of event to remove.
	 * @param	{function} callback	The listener function to be removed.
	 */
	removeEventListener(evtType, callback)
	{
		const listeners = this._listenersByEvent[evtType];

		if (listeners)
		{
			for (let i = 0; i < listeners.length; i++)
			{
				if (listeners[i].callback === callback)
				{
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}

	dispatchEvent(evtType, evtObj)
	{
		const listeners = this._listenersByEvent[evtType];

		if (listeners)
		{
			for (let listener of listeners)
				listener.callback.call(listener.scope, evtObj);
		}
	}
}


/***/ }),

/***/ "./src/utils/events.js":
/*!*****************************!*\
  !*** ./src/utils/events.js ***!
  \*****************************/
/*! exports provided: ConnectionManagerEvent, ModuleManagerEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionManagerEvent", function() { return ConnectionManagerEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleManagerEvent", function() { return ModuleManagerEvent; });
const ConnectionManagerEvent = Object.freeze({
	CONNECTION: 'connection',
	LOGIN: 'login',
	DISCONNECTION: 'disconnection',
	ERROR: 'error',
	SERVER_ERROR: 'serverError',
});

const ModuleManagerEvent = Object.freeze({
	MODULE_LOADED: 'module-loaded',
	MODULE_LOAD_ERROR: 'module-load-error',
});


/***/ }),

/***/ "./src/utils/utilities.js":
/*!********************************!*\
  !*** ./src/utils/utilities.js ***!
  \********************************/
/*! exports provided: toKebabCase, bytesToSize, kBytesToSize, capitalizeFirst, filterClassName, roundToDecimals, scaleBytes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toKebabCase", function() { return toKebabCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToSize", function() { return bytesToSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kBytesToSize", function() { return kBytesToSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirst", function() { return capitalizeFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterClassName", function() { return filterClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundToDecimals", function() { return roundToDecimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleBytes", function() { return scaleBytes; });
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

function bytesToSize(bytes, decimals = 1, zeroUnit = '', suffix = '') {
	if (bytes === 0)
		return '0 ' + zeroUnit + (zeroUnit != '' ? suffix : '');

	if (bytes < 1) // Can happen in chart axis labels!
	 	return `${bytes} Bytes${suffix}`;

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i] + suffix;
}

function kBytesToSize(kBytes, decimals = 1, zeroUnit = '', suffix = '') {
	return bytesToSize(kBytes * 1000, decimals, zeroUnit, suffix);
}

function capitalizeFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterClassName(element, index, array)
{
	if (element.endsWith('.py'))
		return (element.endsWith('Extension.py'));
	else if (element.endsWith('.js'))
		return (element.endsWith('Extension.js'));
	else
		return (element.endsWith('Extension'));
}

function roundToDecimals(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function scaleBytes(bytes, decimals = 1) {
	let obj = {};

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (bytes > 0)
	{
		const k = 1000;
		const dm = decimals < 0 ? 0 : decimals;
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		obj.value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
		obj.unit = sizes[i];
	}
	else
	{
		obj.value = 0;
		obj.unit = sizes[0];
	}

	return obj;
}


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvYXBwbGljYXRpb24uYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvYXBwbGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy92aWV3LXN0YWNrLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL21hbmFnZXJzL2NoYXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tYW5hZ2Vycy9jb25uZWN0aW9uLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbWFuYWdlcnMvbW9kdWxlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9iYXNlLW1vZHVsZS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9zaGVsbC1jb250cm9sbGVyLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL2RvdC1wcm9wZXJ0aWVzLXBhcnNlLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL2V2ZW50LWRpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvdXRpbHMvZXZlbnRzLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL3V0aWxpdGllcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcGxpY2F0aW9uXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJhc3NldHMvanMvY29yZS9tb2R1bGVzL1wiICsgKHtcIm1vZHVsZS0xMFwiOlwibW9kdWxlLTEwXCIsXCJtb2R1bGUtMTN+bW9kdWxlLTE2fm1vZHVsZS0xN35tb2R1bGUtNFwiOlwibW9kdWxlLTEzfm1vZHVsZS0xNn5tb2R1bGUtMTd+bW9kdWxlLTRcIixcIm1vZHVsZS0xNlwiOlwibW9kdWxlLTE2XCIsXCJtb2R1bGUtNFwiOlwibW9kdWxlLTRcIixcIm1vZHVsZS0xNFwiOlwibW9kdWxlLTE0XCIsXCJtb2R1bGUtMTVcIjpcIm1vZHVsZS0xNVwiLFwibW9kdWxlLTNcIjpcIm1vZHVsZS0zXCIsXCJ2ZW5kb3Jzfm1vZHVsZS0wfm1vZHVsZS0xfm1vZHVsZS0xMX5tb2R1bGUtMTJ+bW9kdWxlLTE3fm1vZHVsZS01fm1vZHVsZS02fm1vZHVsZS03fm1vZHVsZS04fm1vZHVsZS05XCI6XCJ2ZW5kb3Jzfm1vZHVsZS0wfm1vZHVsZS0xfm1vZHVsZS0xMX5tb2R1bGUtMTJ+bW9kdWxlLTE3fm1vZHVsZS01fm1vZHVsZS02fm1vZHVsZS03fm1vZHVsZS04fm1vZHVsZS05XCIsXCJtb2R1bGUtMTFcIjpcIm1vZHVsZS0xMVwiLFwibW9kdWxlLTEyXCI6XCJtb2R1bGUtMTJcIixcIm1vZHVsZS0xN1wiOlwibW9kdWxlLTE3XCIsXCJtb2R1bGUtNVwiOlwibW9kdWxlLTVcIixcIm1vZHVsZS02XCI6XCJtb2R1bGUtNlwiLFwibW9kdWxlLTdcIjpcIm1vZHVsZS03XCIsXCJtb2R1bGUtOFwiOlwibW9kdWxlLThcIixcIm1vZHVsZS05XCI6XCJtb2R1bGUtOVwiLFwidmVuZG9yc35tb2R1bGUtMFwiOlwidmVuZG9yc35tb2R1bGUtMFwiLFwibW9kdWxlLTBcIjpcIm1vZHVsZS0wXCIsXCJ2ZW5kb3Jzfm1vZHVsZS0xXCI6XCJ2ZW5kb3Jzfm1vZHVsZS0xXCIsXCJtb2R1bGUtMVwiOlwibW9kdWxlLTFcIixcInZlbmRvcnN+bW9kdWxlLTEzXCI6XCJ2ZW5kb3Jzfm1vZHVsZS0xM1wiLFwibW9kdWxlLTEzXCI6XCJtb2R1bGUtMTNcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuYnVuZGxlLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBhcHBsaWNhdGlvblwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucGFwcGxpY2F0aW9uXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwbGljYXRpb24uanNcIik7XG4iLCJpbXBvcnQge1NoZWxsQ29udHJvbGxlcn0gZnJvbSAnLi9zaGVsbC1jb250cm9sbGVyJztcblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpXG57XG4gICAgY29uc29sZS5pbmZvKFwiU21hcnRGb3hTZXJ2ZXIgMlggQWRtaW5Ub29sIHJlYWR5IVwiKTtcblxuXHQvLyBDcmVhdGUgc2hlbGwgY29udHJvbGxlciBpbnN0YW5jZVxuXHR0aGlzLmNvbnRyb2xsZXIgPSBuZXcgU2hlbGxDb250cm9sbGVyKCk7XG59KTtcbiIsImV4cG9ydCBjbGFzcyBWaWV3U3RhY2sgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHQvLyBBdHRhY2ggYSBzaGFkb3cgcm9vdFxuXHRcdGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG5cdFx0c2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8c3R5bGU+XG5cdFx0XHRcdDpob3N0IHt9XG5cblx0XHRcdFx0OjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0ICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0ICAgIH1cblx0XHRcdDwvc3R5bGU+XG5cdFx0XHQ8c2xvdD48L3Nsb3Q+XG5cdFx0YDtcblxuXHRcdC8vIFNlbGVjdCBmaXJzdCBpdGVtXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcblx0fVxuXG5cdGdldCBzZWxlY3RlZEVsZW1lbnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkRWxlbWVudDtcblx0fVxuXG5cdHNldCBzZWxlY3RlZEVsZW1lbnQoZWxlbWVudClcblx0e1xuXHRcdGlmIChlbGVtZW50ICE9IG51bGwgJiYgZWxlbWVudC5wYXJlbnROb2RlID09IHRoaXMpXG5cdFx0e1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdFx0Zm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLmNoaWxkcmVuKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZWxlbWVudCA9PSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQpXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VsZW1lbnQgaXMgbm90IGEgY2hpbGQgb2YgVmlld1N0YWNrJyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHNlbGVjdGVkSW5kZXgoKVxuXHR7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy5jaGlsZHJlbikuaW5kZXhPZih0aGlzLl9zZWxlY3RlZEVsZW1lbnQpO1xuXHR9XG5cblx0c2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpXG5cdHtcblx0XHRpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLmNoaWxkcmVuW2luZGV4XSA9PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiSW52YWxpZCBWaWV3U3RhY2sgaW5kZXhcIik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2luZGV4XTtcblx0XHRcdHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudDtcblx0XHR9XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCd2aWV3LXN0YWNrJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZpZXctc3RhY2snLCBWaWV3U3RhY2spO1xuIiwiZXhwb3J0IGNsYXNzIENoYXRNYW5hZ2VyXG57XG5cdGNvbnN0cnVjdG9yKHNoZWxsQ3RybClcblx0e1xuXHRcdHRoaXMuVVNFUlZBUl9NT0RVTEUgPSAnbW9kJztcblxuXHRcdHRoaXMuc2hlbGxDdHJsID0gc2hlbGxDdHJsO1xuXG5cdFx0Ly8gVE9ETyBJbXBsZW1lbnQgY2hhdCBtYW5hZ2VyIGFmdGVyIGNyZWF0aW5nIHRoZSBjaGF0IFVJIGluIG1haW4gc2hlbGxcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHNoZWxsIHdoZW4gdGhlIHVzZXIgbG9hZHMgYSBuZXcgbW9kdWxlLCBzbyB0aGF0IHRoaXMgaW5mb1xuXHQgKiBjYW4gYmUgc2F2ZWQgaW4gdGhlIHVzZXIgdmFyaWFibGVzIGFuZCBkaXNwbGF5ZWQgaW4gdGhlIGNoYXQncyB1c2VybGlzdC5cblx0ICovXG5cdHNldEN1cnJlbnRNb2R1bGUobW9kdWxlSWQpXG5cdHtcblx0XHQvLyBTYXZlIG1vZHVsZSBpZCBpbiB1c2VyIHZhcmlhYmxlc1xuXHRcdGxldCB1c2VyVmFyID0gbmV3IFNGUzJYLlNGU1VzZXJWYXJpYWJsZSh0aGlzLlVTRVJWQVJfTU9EVUxFLCBtb2R1bGVJZCk7XG5cdFx0dGhpcy5zaGVsbEN0cmwuc21hcnRGb3guc2VuZChuZXcgU0ZTMlguU2V0VXNlclZhcmlhYmxlc1JlcXVlc3QoW3VzZXJWYXJdKSk7XG5cdH1cbn1cbiIsImltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91dGlscy9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCB7Q29ubmVjdGlvbk1hbmFnZXJFdmVudH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25NYW5hZ2VyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdGNvbnN0cnVjdG9yKHNoZWxsQ3RybClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLkFETUlOX1pPTkVfTkFNRSA9IFwiLS09PXt7eyBBZG1pblpvbmUgfX19PT0tLVwiO1xuXHRcdHRoaXMuRVhURU5TSU9OX0VSUk9SID0gXCJlcnJvclwiO1xuXG5cdFx0dGhpcy5DT01NQU5EU19QUkVGSVggPSBcImFkbWluXCI7XG5cdFx0dGhpcy5DT01NQU5EX1JFU1RBUlQgPSBcInJlc3RhcnRcIjtcblx0XHR0aGlzLkNPTU1BTkRfSEFMVCA9IFwiaGFsdFwiO1xuXG5cdFx0dGhpcy5zaGVsbEN0cmwgPSBzaGVsbEN0cmw7XG5cdH1cblxuXHRnZXQgc21hcnRGb3goKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NmO1xuXHR9XG5cblx0Y29ubmVjdChjb25maWcsIHVzZXJuYW1lLCBwYXNzd29yZClcblx0e1xuXHRcdC8vIFNldCBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuXHRcdGNvbmZpZy56b25lID0gdGhpcy5BRE1JTl9aT05FX05BTUU7XG5cdFx0Y29uZmlnLmRlYnVnID0gZmFsc2U7XG5cblx0XHQvLyBDcmVhdGUgU21hcnRGb3ggaW5zdGFuY2Vcblx0XHR0aGlzLl9zZiA9IG5ldyBTRlMyWC5TbWFydEZveChjb25maWcpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBTbWFydEZveCBldmVudHMgdXNlZnVsIHRvIHRoZSBzaGVsbFxuXHRcdHRoaXMuX2FkZFNGU0V2ZW50TGlzdGVuZXJzKCk7XG5cblx0XHQvLyBTYXZlIHJlZmVyZW5jZSB0byBjb25uZWN0aW9uIGRldGFpbHNcblx0XHR0aGlzLl9jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5fdXNlcm5hbWUgPSB1c2VybmFtZTtcblx0XHR0aGlzLl9wYXNzd29yZCA9IHBhc3N3b3JkO1xuXG5cdFx0Ly8gQ29ubmVjdCB0byBTbWFydEZveFNlcnZlciBpbnN0YW5jZVxuXHRcdHRoaXMuX3NmLmNvbm5lY3QoKTtcblx0fVxuXG5cdGRpc2Nvbm5lY3QoKVxuXHR7XG5cdFx0dGhpcy5fc2YuZGlzY29ubmVjdCgpO1xuXHR9XG5cblx0cmVzdGFydFNlcnZlcigpXG5cdHtcblx0XHRpZiAodGhpcy5fc2YuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aGlzLl9zZi5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KHRoaXMuQ09NTUFORFNfUFJFRklYICsgXCIuXCIgKyB0aGlzLkNPTU1BTkRfUkVTVEFSVCkpO1xuXHR9XG5cblx0aGFsdFNlcnZlcigpXG5cdHtcblx0XHRpZiAodGhpcy5fc2YuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aGlzLl9zZi5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KHRoaXMuQ09NTUFORFNfUFJFRklYICsgXCIuXCIgKyB0aGlzLkNPTU1BTkRfSEFMVCkpO1xuXHR9XG5cblx0LyogLS0tLS0tLS0tIFBSSVZBVEUgVVRJTElUWSBNRVRIT0RTIC0tLS0tLS0tLSAqL1xuXG5cdF9hZGRTRlNFdmVudExpc3RlbmVycygpXG5cdHtcblx0XHR0aGlzLl9zZi5hZGRFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkNPTk5FQ1RJT04sIHRoaXMuX29uQ29ubmVjdGlvbiwgdGhpcyk7XG5cdFx0dGhpcy5fc2YuYWRkRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5DT05ORUNUSU9OX0xPU1QsIHRoaXMuX29uQ29ubmVjdGlvbkxvc3QsIHRoaXMpO1xuXHRcdHRoaXMuX3NmLmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuTE9HSU4sIHRoaXMuX29uTG9naW4sIHRoaXMpO1xuXHRcdHRoaXMuX3NmLmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuTE9HSU5fRVJST1IsIHRoaXMuX29uTG9naW5FcnJvciwgdGhpcyk7XG5cdFx0dGhpcy5fc2YuYWRkRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5FWFRFTlNJT05fUkVTUE9OU0UsIHRoaXMuX29uRXh0ZW5zaW9uUmVzcG9uc2UsIHRoaXMpO1xuXHR9XG5cblx0X3Jlc2V0KClcblx0e1xuXHRcdC8vIFJlbW92ZSBTRlMgZXZlbnQgbGlzdGVuZXJzXG5cdFx0dGhpcy5fc2YucmVtb3ZlRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5DT05ORUNUSU9OLCB0aGlzLl9vbkNvbm5lY3Rpb24pO1xuXHRcdHRoaXMuX3NmLnJlbW92ZUV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuQ09OTkVDVElPTl9MT1NULCB0aGlzLl9vbkNvbm5lY3Rpb25Mb3N0KTtcblx0XHR0aGlzLl9zZi5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkxPR0lOLCB0aGlzLl9vbkxvZ2luKTtcblx0XHR0aGlzLl9zZi5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkxPR0lOX0VSUk9SLCB0aGlzLl9vbkxvZ2luRXJyb3IpO1xuXHRcdHRoaXMuX3NmLnJlbW92ZUV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuRVhURU5TSU9OX1JFU1BPTlNFLCB0aGlzLl9vbkV4dGVuc2lvblJlc3BvbnNlKTtcblxuXHRcdC8vIERlbGV0ZSBTbWFydEZveCBjbGFzcyBpbnN0YW5jZVxuXHRcdHRoaXMuX3NmID0gbnVsbDtcblxuXHRcdC8vIERlbGV0ZSBjb25uZWN0aW9uIGRldGFpbHNcblx0XHR0aGlzLl9jb25maWcgPSBudWxsO1xuXHRcdHRoaXMuX3VzZXJuYW1lID0gbnVsbDtcblx0XHR0aGlzLl9wYXNzd29yZCA9IG51bGw7XG5cdH1cblxuXHRfbG9naW4oKVxuXHR7XG5cdFx0Ly8gVGhlIGN1cnJlbnQgQWRtaW5Ub29sIHZlcnNpb24gbXVzdCBiZSBzZW50IHRvIHRoZSBzZXJ2ZXIgZHVyaW5nIGxvZ2luLCB0byBjaGVjayBpZiBpdCBpcyB1cC10by1kYXRlXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0SW50KCdjbGllbnRWZXInLCB0aGlzLnNoZWxsQ3RybC5pbnRWZXJzaW9uKTtcblxuXHRcdC8vIExvZ2luXG5cdFx0dGhpcy5fc2Yuc2VuZCggbmV3IFNGUzJYLkxvZ2luUmVxdWVzdCh0aGlzLl91c2VybmFtZSwgdGhpcy5fcGFzc3dvcmQsIHBhcmFtcywgdGhpcy5fY29uZmlnLnpvbmUpICk7XG5cdH1cblxuXHQvKiAtLS0tLS0tLS0gU01BUlRGT1ggRVZFTlQgTElTVEVORVJTIC0tLS0tLS0tLSAqL1xuXG5cdF9vbkNvbm5lY3Rpb24oZXZ0UGFyYW1zKVxuXHR7XG5cdFx0aWYgKGV2dFBhcmFtcy5zdWNjZXNzKVxuXHRcdHtcblx0XHRcdC8vIERpc3BhdGNoIGNvbm5lY3Rpb24gZXZlbnRcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDb25uZWN0aW9uTWFuYWdlckV2ZW50LkNPTk5FQ1RJT04pO1xuXG5cdFx0XHQvLyBTZW5kIGxvZ2luIHJlcXVlc3Rcblx0XHRcdHRoaXMuX2xvZ2luKCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBEaXNwYXRjaCBlcnJvciBldmVudFxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENvbm5lY3Rpb25NYW5hZ2VyRXZlbnQuRVJST1IsIHttZXNzYWdlOiBgVW5hYmxlIHRvIGNvbm5lY3QgdG8gJHt0aGlzLl9jb25maWcuaG9zdH06JHt0aGlzLl9jb25maWcucG9ydH1gfSk7XG5cblx0XHRcdC8vIFJlc2V0IHN0YXR1c1xuXHRcdFx0dGhpcy5fcmVzZXQoKTtcblx0XHR9XG5cdH1cblxuXHRfb25Db25uZWN0aW9uTG9zdChldnRQYXJhbXMpXG5cdHtcblx0XHRsZXQgcmVhc29uID0gZXZ0UGFyYW1zLnJlYXNvbjtcblxuXHRcdGlmIChyZWFzb24gIT0gU0ZTMlguQ2xpZW50RGlzY29ubmVjdGlvblJlYXNvbi5NQU5VQUwpXG5cdFx0e1xuXHRcdFx0dmFyIG1zZztcblxuXHRcdFx0Ly8gTG9nIGRpc2Nvbm5lY3Rpb24gbWVzc2FnZSBzdGF0aW5nIHRoZSByZWFzb25cblx0XHRcdGlmIChyZWFzb24gPT0gU0ZTMlguQ2xpZW50RGlzY29ubmVjdGlvblJlYXNvbi5JRExFKVxuXHRcdFx0XHRtc2cgPSAnaW5hY3Rpdml0eSc7XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG1zZyA9ICd1bmtub3duIHJlYXNvbic7XG5cblx0XHRcdFx0aWYgKHJlYXNvbiAhPSBTRlMyWC5DbGllbnREaXNjb25uZWN0aW9uUmVhc29uLlVOS05PV04pXG5cdFx0XHRcdFx0bXNnICs9IGAgKHNlcnZlciByZXBvcnRlZDogJHtyZWFzb259KWA7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERpc3BhdGNoIGVycm9yIGV2ZW50XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5FUlJPUiwge21lc3NhZ2U6IGBBIGRpc2Nvbm5lY3Rpb24gb2NjdXJyZWQgZHVlIHRvICR7bXNnfTsgcGxlYXNlIHJlY29ubmVjdGB9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIERpc3BhdGNoIGRpc2Nvbm5lY3Rpb24gZXZlbnRcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDb25uZWN0aW9uTWFuYWdlckV2ZW50LkRJU0NPTk5FQ1RJT04pO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0XG5cdFx0dGhpcy5fcmVzZXQoKTtcblx0fVxuXG5cdF9vbkxvZ2luKGV2dFBhcmFtcylcblx0e1xuXHRcdGxldCBkYXRhID0gZXZ0UGFyYW1zLmRhdGE7XG5cblx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0c2VydmVyVmVyc2lvbjogZGF0YS5nZXRVdGZTdHJpbmcoJ3NlcnZlclZlcicpLFxuXHRcdFx0c2VydmVyTmFtZTogZGF0YS5nZXRVdGZTdHJpbmcoJ3NlcnZlck5hbWUnKSxcblx0XHRcdHNlcnZlclVwdGltZTogZGF0YS5nZXRJbnRBcnJheSgndXB0aW1lJyksXG5cdFx0XHRwcm9jQ29udHJvbEVuYWJsZWQ6IGRhdGEuZ2V0Qm9vbCgncHJvY0N0cmwnKSxcblx0XHRcdGFsbG93SGFsdDogZGF0YS5nZXRCb29sKCdhbGxvd0hhbHQnKSxcblx0XHRcdG1vZHVsZXM6IGRhdGEuZ2V0U0ZTQXJyYXkoJ21vZHVsZXMnKSxcblx0XHRcdGRpc2FibGVWZXJDaGVjazogZGF0YS5nZXRCb29sKCdkaXNWZXJDaGsnKSxcblx0XHR9O1xuXG5cdFx0Ly8gRGlzcGF0Y2ggbG9naW4gZXZlbnRcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5MT0dJTiwgcGFyYW1zKTtcblx0fVxuXG5cdF9vbkxvZ2luRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gRGlzY29ubmVjdCBmcm9tIHNlcnZlclxuXHRcdHRoaXMuX3NmLmRpc2Nvbm5lY3QoKTtcblxuXHRcdC8vIERpc3BhdGNoIGVycm9yIGV2ZW50XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENvbm5lY3Rpb25NYW5hZ2VyRXZlbnQuRVJST1IsIHttZXNzYWdlOiBldnRQYXJhbXMuZXJyb3JNZXNzYWdlfSk7XG5cdH1cblxuXHRfb25FeHRlbnNpb25SZXNwb25zZShldnRQYXJhbXMpXG5cdHtcblx0XHRpZiAoZXZ0UGFyYW1zLmNtZCA9PSB0aGlzLkVYVEVOU0lPTl9FUlJPUilcblx0XHR7XG5cdFx0XHRsZXQgZGF0YSA9IGV2dFBhcmFtcy5wYXJhbXM7XG5cblx0XHRcdC8vIEFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJyZWQgaW4gdGhlIEFkbWluIFRvb2wgc2VydmVyLXNpZGUgZXh0ZW5zaW9uXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5TRVJWRVJfRVJST1IsIHttZXNzYWdlOiAnQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCBpbiB0aGUgQWRtaW4gVG9vbCBzZXJ2ZXItc2lkZSBleHRlbnNpb24sIHBsZWFzZSBjaGVjayB0aGUgc2VydmVyLXNpZGUgbG9nczsgdGhlIGV4dGVuc2lvbiByZXBvcnRlZDogJyArIGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpfSk7XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi4vdXRpbHMvZXZlbnQtZGlzcGF0Y2hlcic7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJFdmVudH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCB7dG9LZWJhYkNhc2V9IGZyb20gJy4uL3V0aWxzL3V0aWxpdGllcyc7XG5pbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gJy4uL21vZHVsZXMvYmFzZS1tb2R1bGUnO1xuXG5leHBvcnQgY2xhc3MgTW9kdWxlTWFuYWdlciBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlclxue1xuXHRjb25zdHJ1Y3RvcihzaGVsbEN0cmwsIGNvbnRhaW5lcilcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHQvLyBNYWtlIEJhc2VNb2R1bGUgY2xhc3MgZ2xvYmFsbHkgYXZhaWxhYmxlLCBzbyBpdCBjYW4gYmUgZXh0ZW5kZWQgYnkgY3VzdG9tIG1vZHVsZXNcblx0XHR3aW5kb3cuQmFzZU1vZHVsZSA9IEJhc2VNb2R1bGVcblxuXHRcdHRoaXMuX3NoZWxsQ3RybCA9IHNoZWxsQ3RybDtcblx0XHR0aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XG5cdFx0dGhpcy5fY3VycmVudE1vZHVsZUlkID0gbnVsbDtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciBmb3IgbmF2aWdhdGlvbiBpdGVtcyBjbGlja1xuXHRcdHRoaXMuX2NvbnRhaW5lci5vbignY2xpY2snLCAnLm5hdi1pdGVtJywgJC5wcm94eShmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0bGV0IG1vZHVsZUlkID0gZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuXHRcdFx0bGV0IG1vZHVsZURhdGEgPSB0aGlzLl9tb2R1bGVDb25maWdCeUlkW21vZHVsZUlkXTtcblxuXHRcdFx0aWYgKG1vZHVsZUlkICE9IHRoaXMuX2N1cnJlbnRNb2R1bGVJZClcblx0XHRcdHtcblx0XHRcdFx0Ly8gTG9hZCBzZWxlY3RlZCBtb2R1bGVcblx0XHRcdFx0dGhpcy5fbG9hZE1vZHVsZShtb2R1bGVEYXRhKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2xvc2UgbmF2aWdhdGlvblxuXHRcdFx0dGhpcy5fc2hlbGxDdHJsLl90b2dnbGVOYXYoZmFsc2UpO1xuXHRcdH0sIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBzaG93IHRvb2x0aXBcblx0XHR0aGlzLl9jb250YWluZXIua2VuZG9Ub29sdGlwKHtcblx0XHRcdGZpbHRlcjogJ2xpW2RhdGEtaWRdJyxcblx0XHRcdGNvbnRlbnQ6ICQucHJveHkoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0bGV0IG1vZHVsZUlkID0gZXZlbnQudGFyZ2V0WzBdLmRhdGFzZXQuaWQ7XG5cdFx0XHRcdGxldCBtb2R1bGVEYXRhID0gdGhpcy5fbW9kdWxlQ29uZmlnQnlJZFttb2R1bGVJZF07XG5cdFx0ICAgICAgICByZXR1cm4gYDxzdHJvbmc+JHttb2R1bGVEYXRhLm5hbWV9PC9zdHJvbmc+PGJyPjxzcGFuPiR7bW9kdWxlRGF0YS5kZXNjcmlwdGlvbn08L3NwYW4+YDtcblx0XHQgICAgfSwgdGhpcylcblx0XHR9KTtcblxuXHRcdC8qIFRFU1RJTkcgTUVNT1JZIExFQUtTIElOIE1PRFVMRVMgTE9BRElOR1xuXHRcdEFERCBUSElTIElOIFRIRSBNQUlOIFZJRVcgVE8gU1RBUlQgVEhFIFRFU1Q6IDxkaXY+PGJ1dHRvbiBpZD1cInRlbXBcIj50ZXN0PC9idXR0b24+PHNwYW4gaWQ9XCJjbnRcIj48L3NwYW4+PC9kaXY+XG5cdFx0JCgnI3RlbXAnKS5jbGljayhcblx0XHRcdCQucHJveHkoZnVuY3Rpb24oZXZlbnQpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMuY250ID0gMDtcblx0XHRcdFx0aWYgKHRoaXMudGltZXIgPT0gbnVsbClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMudGltZXIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoJC5wcm94eShmdW5jdGlvbigpIHtcblxuXHRcdFx0XHRcdFx0JCgnI2NudCcpLnRleHQodGhpcy5jbnQrKylcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9jdXJyZW50TW9kdWxlSWQgPT0gJ0Rhc2hib2FyZCcpXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvYWRNb2R1bGUodGhpcy5fbW9kdWxlQ29uZmlnQnlJZFsnU2VydmVyQ29uZmlndXJhdG9yJ10pO1xuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2FkTW9kdWxlKHRoaXMuX21vZHVsZUNvbmZpZ0J5SWRbJ0Rhc2hib2FyZCddKTtcblx0XHRcdFx0XHR9LCB0aGlzKSwgNTAwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcblx0XHRcdFx0XHR0aGlzLnRpbWVyID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fSwgdGhpcylcblx0XHQpO1xuXHRcdCovXG5cdH1cblxuXHRpbml0TW9kdWxlc0xpc3QobW9kdWxlc0RhdGEsIGxvYWRNb2R1bGVJZCA9IG51bGwpXG5cdHtcblx0XHQvLyBTRVRVUCBNT0RVTEVTIExJU1RcblxuXHRcdC8vIEVtcHR5IGNvbnRhaW5lciBvZiBtb2R1bGUgc2VsZWN0aW9uIGJ1dHRvbnNcblx0XHR0aGlzLl9jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdHRoaXMuX21vZHVsZUNvbmZpZ0J5SWQgPSB7fTtcblx0XHR2YXIgZmlyc3RNb2R1bGUgPSBudWxsO1xuXHRcdHZhciBsb2FkTW9kdWxlID0gbnVsbDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbW9kdWxlc0RhdGEuc2l6ZSgpOyBpKyspXG5cdFx0e1xuXHRcdFx0bGV0IG1vZHVsZURhdGEgPSB0aGlzLl9nZXRNb2R1bGVPYmplY3QobW9kdWxlc0RhdGEuZ2V0U0ZTT2JqZWN0KGkpKTtcblxuXHRcdFx0dGhpcy5fbW9kdWxlQ29uZmlnQnlJZFttb2R1bGVEYXRhLmlkXSA9IG1vZHVsZURhdGE7XG5cblx0XHRcdC8vIEdldCBmaXJzdCBtb2R1bGVcblx0XHRcdGlmIChpID09IDApXG5cdFx0XHRcdGZpcnN0TW9kdWxlID0gbW9kdWxlRGF0YTtcblxuXHRcdFx0Ly8gR2V0IHBhc3NlZCBtb2R1bGVcblx0XHRcdGlmIChtb2R1bGVEYXRhLmlkID09IGxvYWRNb2R1bGVJZClcblx0XHRcdFx0bG9hZE1vZHVsZSA9IG1vZHVsZURhdGE7XG5cblx0XHRcdC8vIERpc3BsYXkgbW9kdWxlIGJ1dHRvblxuXHRcdFx0bGV0IG1vZHVsZUJ1dHRvbiA9IHRoaXMuX2NyZWF0ZU1vZHVsZUJ1dHRvbihtb2R1bGVEYXRhKTtcblx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy5fY29udGFpbmVyLmFwcGVuZChtb2R1bGVCdXR0b24pO1xuXHRcdH1cblxuXHRcdC8vIExPQUQgSU5JVElBTCBNT0RVTEVcblxuXHRcdC8vIElmIG1vZHVsZSBpcyBub3QgcGFzc2VkLCBsb2FkIHRoZSBmaXJzdCBvbmUgb2YgdGhlIG1vZHVsZXMgbGlzdFxuXHRcdGlmIChsb2FkTW9kdWxlID09IG51bGwpXG5cdFx0XHRsb2FkTW9kdWxlID0gZmlyc3RNb2R1bGU7XG5cblx0XHR0aGlzLl9sb2FkTW9kdWxlKGxvYWRNb2R1bGUpO1xuXHR9XG5cblx0dW5sb2FkTW9kdWxlKClcblx0e1xuXHRcdHRoaXMuX2Rlc3Ryb3lDdXJyZW50TW9kdWxlKCk7XG5cdH1cblxuXHRnZXQgY3VycmVudE1vZHVsZUlkKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jdXJyZW50TW9kdWxlSWQ7XG5cdH1cblxuXHRnZXQgY3VycmVudE1vZHVsZSgpXG5cdHtcblx0XHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZHVsZScpO1xuXHR9XG5cblx0X2dldE1vZHVsZU9iamVjdChzZnNPYmopXG5cdHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IHNmc09iai5nZXRVdGZTdHJpbmcoJ2lkJyksXG5cdFx0XHRuYW1lOiBzZnNPYmouZ2V0VXRmU3RyaW5nKCduYW1lJyksXG5cdFx0XHRkZXNjcmlwdGlvbjogc2ZzT2JqLmdldFV0ZlN0cmluZygnZGVzY3JpcHRpb24nKSxcblx0XHRcdHNwYWNpbmc6IHNmc09iai5nZXRCb29sKCdzcGFjaW5nJyksXG5cdFx0XHRpY29uOiBzZnNPYmouY29udGFpbnNLZXkoJ2ljb25TdmcnKSA/IHNmc09iai5nZXRVdGZTdHJpbmcoJ2ljb25TdmcnKSA6ICcnLFxuXHRcdFx0dGFnOiB0b0tlYmFiQ2FzZShzZnNPYmouZ2V0VXRmU3RyaW5nKCdpZCcpKSxcblx0XHRcdGlzQ3VzdG9tOiBzZnNPYmouZ2V0Qm9vbCgnaXNDdXN0b20nKVxuXHRcdH1cblx0fVxuXG5cdF9jcmVhdGVNb2R1bGVCdXR0b24obW9kdWxlRGF0YSlcblx0e1xuXHRcdHJldHVybiBgXG5cdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSAke21vZHVsZURhdGEuc3BhY2luZyA/ICdtci1sZy0zJyA6ICcnfVwiIGRhdGEtaWQ9XCIke21vZHVsZURhdGEuaWR9XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2R1bGUtaWNvblwiPiR7bW9kdWxlRGF0YS5pY29ufTwvZGl2PlxuXHRcdFx0XHQ8bGFiZWw+JHttb2R1bGVEYXRhLm5hbWV9PC9sYWJlbD5cblx0XHRcdDwvbGk+XG5cdFx0YDtcblx0fVxuXG5cdF9sb2FkTW9kdWxlKG1vZHVsZURhdGEpXG5cdHtcblx0XHRpZiAobW9kdWxlRGF0YSA9PSBudWxsKVxuXHRcdFx0cmV0dXJuO1xuXHRcdFxuXHRcdC8vIExvYWQgdGhlIEhUTUwgZmlsZSBvZiBhIG1vZHVsZVxuXHRcdCQoJzxtb2R1bGUvPicpLmxvYWQoYG1vZHVsZXMvJHttb2R1bGVEYXRhLnRhZ30uaHRtbGAsICQucHJveHkoZnVuY3Rpb24oaHRtbCwgc3RhdHVzKSB7XG5cblx0XHRcdGlmIChzdGF0dXMgIT0gJ2Vycm9yJylcblx0XHRcdHtcblx0XHRcdFx0aWYgKCFtb2R1bGVEYXRhLmlzQ3VzdG9tKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gTG9hZCB0aGUgSlMgZmlsZSBvZiBhIHN0YW5kYXJkIG1vZHVsZVxuXHRcdFx0XHRcdGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIm1vZHVsZS1cIiAqLyBgLi4vbW9kdWxlcy8ke21vZHVsZURhdGEudGFnfS5qc2ApLnRoZW4obW9kdWxlID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuX29uTW9kdWxlQ29udHJvbGxlckxvYWRTdWNjZXNzKG1vZHVsZURhdGEsIGh0bWwsIG1vZHVsZSk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fb25Nb2R1bGVDb250cm9sbGVyTG9hZEVycm9yKG1vZHVsZURhdGEsIGVycm9yKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBMb2FkIHRoZSBKUyBmaWxlIG9mIGEgY3VzdG9tIG1vZHVsZVxuXHRcdFx0XHRcdGltcG9ydCgvKiB3ZWJwYWNrSWdub3JlOiB0cnVlICovYC4uL2N1c3RvbS1tb2R1bGVzLyR7bW9kdWxlRGF0YS50YWd9LmpzYCkudGhlbihtb2R1bGUgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5fb25Nb2R1bGVDb250cm9sbGVyTG9hZFN1Y2Nlc3MobW9kdWxlRGF0YSwgaHRtbCwgbW9kdWxlKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChlcnJvciA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLl9vbk1vZHVsZUNvbnRyb2xsZXJMb2FkRXJyb3IobW9kdWxlRGF0YSwgZXJyb3IpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIERpc3BhdGNoIGVycm9yIGV2ZW50XG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChNb2R1bGVNYW5hZ2VyRXZlbnQuTU9EVUxFX0xPQURfRVJST1IsIHttZXNzYWdlOiBgJHttb2R1bGVEYXRhLm5hbWV9IG1vZHVsZSdzIHZpZXcgKGh0bWwpIG5vdCBmb3VuZC5gfSk7XG5cdFx0XHR9XG5cdFx0fSwgdGhpcykpO1xuXHR9XG5cblx0X29uTW9kdWxlQ29udHJvbGxlckxvYWRTdWNjZXNzKG1vZHVsZURhdGEsIGh0bWwsIG1vZHVsZSlcblx0e1xuXHRcdC8vIERlc3Ryb3kgY3VycmVudCBtb2R1bGVcblx0XHR0aGlzLl9kZXN0cm95Q3VycmVudE1vZHVsZSgpO1xuXG5cdFx0Ly8gRGVmaW5lIGxvYWRlZCBtb2R1bGUgKGlmIG5lY2Vzc2FyeSlcblx0XHRpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQobW9kdWxlRGF0YS50YWcgKyAnLW1vZHVsZScpKVxuXHRcdFx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShtb2R1bGVEYXRhLnRhZyArICctbW9kdWxlJywgbW9kdWxlLmRlZmF1bHQpO1xuXG5cdFx0Ly8gQXBwZW5kIG5ldyBtb2R1bGVcblx0XHQkKCdkaXYubW9kdWxlLWxvYWRlcicpLmFwcGVuZChodG1sKTtcblxuXHRcdC8vIEluaXRpYWxpemUgbW9kdWxlXG5cdFx0dGhpcy5jdXJyZW50TW9kdWxlLmluaXRpYWxpemUobW9kdWxlRGF0YSwgdGhpcy5fc2hlbGxDdHJsKTtcblxuXHRcdC8vIFNhdmUgY3VycmVudCBtb2R1bGUgaWRcblx0XHR0aGlzLl9jdXJyZW50TW9kdWxlSWQgPSBtb2R1bGVEYXRhLmlkO1xuXG5cdFx0Ly8gRGlzcGF0Y2ggZXZlbnRcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoTW9kdWxlTWFuYWdlckV2ZW50Lk1PRFVMRV9MT0FERUQsIHttb2R1bGVEYXRhOiBtb2R1bGVEYXRhfSk7XG5cdH1cblxuXHRfb25Nb2R1bGVDb250cm9sbGVyTG9hZEVycm9yKG1vZHVsZURhdGEsIGVycm9yKVxuXHR7XG5cdFx0Ly8gTG9nIGVycm9yIGRldGFpbHNcblx0XHR0aGlzLl9zaGVsbEN0cmwubG9nTWVzc2FnZShlcnJvciwgJ3dhcm4nKTtcblxuXHRcdC8vIERpc3BhdGNoIGVycm9yIGV2ZW50XG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BRF9FUlJPUiwge21lc3NhZ2U6IGAke21vZHVsZURhdGEubmFtZX0gY3VzdG9tIG1vZHVsZSdzIGNvbnRyb2xsZXIgKGpzKSBjb3VsZG4ndCBiZSBsb2FkZWQuYH0pO1xuXHR9XG5cblx0X2Rlc3Ryb3lDdXJyZW50TW9kdWxlKClcblx0e1xuXHRcdC8vIEdldCBhIHJlZmVyZW5jZSB0byBjdXJyZW50IG1vZHVsZVxuXHRcdGNvbnN0IG1vZCA9IHRoaXMuY3VycmVudE1vZHVsZTtcblxuXHRcdC8vIENhbGwgZGVzdHJveSBtZXRob2Qgb24gbW9kdWxlJ3MgY2xhc3Ncblx0XHRpZiAobW9kICE9IG51bGwpXG5cdFx0XHRtb2QuZGVzdHJveSgpO1xuXG5cdFx0Ly8gRW1wdHkgbW9kdWxlIGNvbnRhaW5lclxuXHRcdCQoJ2Rpdi5tb2R1bGUtbG9hZGVyJykuZW1wdHkoKTtcblxuXHRcdHRoaXMuX2N1cnJlbnRNb2R1bGVJZCA9IG51bGw7XG5cdH1cbn1cbiIsImV4cG9ydCBjbGFzcyBCYXNlTW9kdWxlIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoY29tbWFuZHNQcmVmaXgpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLl9jb21tYW5kc1ByZWZpeCA9IGNvbW1hbmRzUHJlZml4O1xuXHR9XG5cblx0Z2V0IHNoZWxsQ3RybCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hlbGxDdHJsO1xuXHR9XG5cblx0Z2V0IHNtYXJ0Rm94KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGVsbEN0cmwuc21hcnRGb3g7XG5cdH1cblxuXHRnZXQgaWREYXRhKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pZERhdGE7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBPVkVSUklEQUJMRSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgbW9kdWxlcyBtYW5hZ2VyIGFmdGVyIGxvYWRpbmcgdGhlIG1vZHVsZS5cblx0ICogSW4gY2FzZSBpdCBpcyBvdmVycmlkZGVuLCBzdXBlciBtdXN0IGFsd2F5cyBiZSBjYWxsZWQhXG5cdCAqL1xuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0dGhpcy5faWREYXRhID0gaWREYXRhO1xuXHRcdHRoaXMuX3NoZWxsQ3RybCA9IHNoZWxsQ29udHJvbGxlcjtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBBZG1pbiBleHRlbnNpb24gbWVzc2FnZXNcblx0XHR0aGlzLnNtYXJ0Rm94LmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuRVhURU5TSU9OX1JFU1BPTlNFLCB0aGlzLl9vbkV4dGVuc2lvblJlc3BvbnNlLCB0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1vZHVsZXMgbWFuYWdlciBiZWZvcmUgdW5sb2FkaW5nIHRoZSBtb2R1bGUuXG5cdCAqIEluIGNhc2UgaXQgaXMgb3ZlcnJpZGRlbiwgc3VwZXIgbXVzdCBhbHdheXMgYmUgY2FsbGVkIVxuXHQgKi9cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBSZW1vdmUgbGlzdGVuZXIgdG8gQWRtaW4gZXh0ZW5zaW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5zbWFydEZveC5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkVYVEVOU0lPTl9SRVNQT05TRSwgdGhpcy5fb25FeHRlbnNpb25SZXNwb25zZSk7XG5cblx0XHQvLyBEZXN0cm95IGFsbCBLZW5kbyB3aWRnZXRzXG5cdFx0a2VuZG8uZGVzdHJveSgkKCcubW9kdWxlJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgb25FeHRlbnNpb25SZXNwb25zZSBsaXN0ZW5lciBiZWxvdy5cblx0ICogTXVzdCBiZSBvdmVycmlkZGVuLlxuXHQgKi9cblx0b25FeHRlbnNpb25Db21tYW5kKGNtZCwgZGF0YSlcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG9cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1haW4gc2hlbGwgd2hlbmV2ZXIgdGhlIHNlcnZlciB1cHRpbWUgY2hhbmdlcy5cblx0ICogQ2FuIGJlIG92ZXJyaWRkZW4gdG8gZGlzcGxheSB0aGUgdXB0aW1lIGluc2lkZSBhIG1vZHVsZSBvciBtYWtlIGNhbGN1bGF0aW9ucyBvbiB0aGUgc2VydmVyIHVwdGltZS5cblx0ICovXG5cdG9uVXB0aW1lVXBkYXRlZCh2YWx1ZXMpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvXG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQVUJMSUMgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgcmVxdWVzdCB0byBBZG1pbiBleHRlbnNpb24uXG5cdCAqL1xuXHRzZW5kRXh0ZW5zaW9uUmVxdWVzdChjb21tYW5kLCBkYXRhID0gbnVsbClcblx0e1xuXHRcdGlmIChkYXRhID09IG51bGwpXG5cdFx0XHRkYXRhID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXG5cdFx0dGhpcy5zbWFydEZveC5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KGAke3RoaXMuX2NvbW1hbmRzUHJlZml4fS4ke2NvbW1hbmR9YCwgZGF0YSkpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uRXh0ZW5zaW9uUmVzcG9uc2UoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gRmlsdGVyIHNlcnZlciByZXNwb25zZXNcblx0XHRsZXQgY29tbWFuZHMgPSBldnRQYXJhbXMuY21kLnNwbGl0KCcuJyk7XG5cdFx0bGV0IGRhdGEgPSBldnRQYXJhbXMucGFyYW1zO1xuXG5cdFx0aWYgKGNvbW1hbmRzWzBdID09IHRoaXMuX2NvbW1hbmRzUHJlZml4KVxuXHRcdHtcblx0XHRcdGlmIChjb21tYW5kcy5sZW5ndGggPiAxKVxuXHRcdFx0XHR0aGlzLm9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kc1sxXSwgZGF0YSlcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7Vmlld1N0YWNrfSBmcm9tICcuL2NvbXBvbmVudHMvdmlldy1zdGFjayc7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJ9IGZyb20gJy4vbWFuYWdlcnMvbW9kdWxlLW1hbmFnZXInO1xuaW1wb3J0IHtNb2R1bGVNYW5hZ2VyRXZlbnR9IGZyb20gJy4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCB7Q29ubmVjdGlvbk1hbmFnZXJ9IGZyb20gJy4vbWFuYWdlcnMvY29ubmVjdGlvbi1tYW5hZ2VyJztcbmltcG9ydCB7Q29ubmVjdGlvbk1hbmFnZXJFdmVudH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IHtDaGF0TWFuYWdlcn0gZnJvbSAnLi9tYW5hZ2Vycy9jaGF0LW1hbmFnZXInO1xuaW1wb3J0IHtwYXJzZX0gZnJvbSAnLi91dGlscy9kb3QtcHJvcGVydGllcy1wYXJzZSc7XG5cbmV4cG9ydCBjbGFzcyBTaGVsbENvbnRyb2xsZXJcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0Ly8gU2V0IGNvbnN0YW50cyBhbmQgdmFyaWFibGVzXG5cblx0XHR0aGlzLlZFUlNJT05fTUFKT1IgPSAzO1xuXHRcdHRoaXMuVkVSU0lPTl9NSU5PUiA9IDI7XG5cdFx0dGhpcy5WRVJTSU9OX1NVQiA9IDk7XG5cblx0XHR0aGlzLkRFRkFVTFRfV1NfUE9SVCA9IDgwODA7XG5cdFx0dGhpcy5ERUZBVUxUX1dTU19QT1JUID0gODQ0MztcblxuXHRcdHRoaXMuREVGQVVMVF9VU0VSTkFNRSA9ICdzZnNhZG1pbic7XG5cdFx0dGhpcy5ERUZBVUxUX1BBU1NXT1JEID0gJ3Nmc2FkbWluJztcblxuXHRcdHRoaXMuX2xvZ2luVmFsaWRhdG9yID0gbnVsbDtcblxuXHRcdC8vIERpc3BsYXkgdmVyc2lvblxuXHRcdCQoJy5hZG1pbi12ZXJzaW9uJykudGV4dCgndicgKyB0aGlzLnN0cmluZ1ZlcnNpb24pO1xuXG5cdFx0Ly8gQ3JlYXRlIG1vZHVsZXMgbWFuYWdlciBpbnN0YW5jZSBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHRoaXMuX21vZE1hbmFnZXIgPSBuZXcgTW9kdWxlTWFuYWdlcih0aGlzLCAkKCcubmF2LW1haW4nKSk7XG5cdFx0dGhpcy5fbW9kTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BREVELCB0aGlzLl9vbk1vZHVsZUxvYWRlZCwgdGhpcyk7XG5cdFx0dGhpcy5fbW9kTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BRF9FUlJPUiwgdGhpcy5fb25Nb2R1bGVMb2FkRXJyb3IsIHRoaXMpO1xuXG5cdFx0Ly8gQ3JlYXRlIGNvbm5lY3Rpb24gbWFuYWdlciBpbnN0YW5jZSBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyID0gbmV3IENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMpO1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5DT05ORUNUSU9OLCB0aGlzLl9vbkNvbm5lY3Rpb24sIHRoaXMpO1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5MT0dJTiwgdGhpcy5fb25Mb2dpbiwgdGhpcyk7XG5cdFx0dGhpcy5fY29ubk1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihDb25uZWN0aW9uTWFuYWdlckV2ZW50LkRJU0NPTk5FQ1RJT04sIHRoaXMuX29uRGlzY29ubmVjdGlvbiwgdGhpcyk7XG5cdFx0dGhpcy5fY29ubk1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihDb25uZWN0aW9uTWFuYWdlckV2ZW50LkVSUk9SLCB0aGlzLl9vbkNvbm5NYW5hZ2VyRXJyb3IsIHRoaXMpO1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5TRVJWRVJfRVJST1IsIHRoaXMuX29uU2VydmVyRXJyb3IsIHRoaXMpO1xuXG5cdFx0Ly8gQ3JlYXRlIGFkbWluIGNoYXQgbWFuYWdlclxuXHRcdHRoaXMuX2NoYXRNYW5hZ2VyID0gbmV3IENoYXRNYW5hZ2VyKHRoaXMpO1xuXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0XHQvLyBJbml0aWFsaXplIHZpZXdzXG5cdFx0dGhpcy5faW5pdFZpZXdzKCk7XG5cblx0XHQvLyBTaG93IGxvZ2luIHZpZXdcblx0XHR0aGlzLl9zd2l0Y2hTaGVsbFZpZXcoJ2xvZ2luLXZpZXcnKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFZJRVcgSU5JVElBTElaRVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgbG9naW4gdmlldy5cblx0ICovXG5cdF9pbml0TG9naW5WaWV3KClcblx0e1xuXHRcdC8vIFNldCBkZWZhdWx0IGlucHV0IHZhbHVlcyAocGFzc3dvcmQgbmV2ZXIgc2F2ZWQpXG5cdFx0bGV0IGhvc3QgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cdFx0bGV0IHBvcnQgPSB3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wgPT0gJ2h0dHBzOicgPyB0aGlzLkRFRkFVTFRfV1NTX1BPUlQgOiB0aGlzLkRFRkFVTFRfV1NfUE9SVDtcblx0XHRsZXQgZW5jcnlwdCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PSAnaHR0cHM6Jztcblx0XHRsZXQgdXNlciA9ICdzZnNhZG1pbic7XG5cdFx0bGV0IHJlbWVtYmVyID0gZmFsc2U7XG5cblx0XHQvLyBMb2FkIFwibGFzdC1zZXJ2ZXJcIiBjb29raWVcblx0XHRsZXQgZGF0YSA9IENvb2tpZXMuZ2V0SlNPTignbGFzdC1zZXJ2ZXInKVxuICAgICAgICBpZiAoZGF0YSlcblx0XHR7XG5cdFx0XHRob3N0ID0gZGF0YS5ob3N0O1xuICAgICAgICAgICAgcG9ydCA9IGRhdGEucG9ydDtcblx0XHRcdGVuY3J5cHQgPSBkYXRhLmVuY3J5cHQ7XG5cdFx0XHR1c2VyID0gZGF0YS51c2VyO1xuXHRcdFx0cmVtZW1iZXIgPSB0cnVlO1xuICAgICAgICB9XG5cblx0XHQvLyBSZXRyaWV2ZSBob3N0IGZyb20gR0VUIHBhcmFtZXRlclxuXHRcdGxldCBnZXRIb3N0ID0gdGhpcy5fZ2V0VXJsUGFyYW1ldGVyKCdob3N0Jyk7XG5cdFx0aWYgKGdldEhvc3QpXG5cdFx0XHRob3N0ID0gZ2V0SG9zdDtcblxuXHRcdC8vIFNldCBpbnB1dCB2YWx1ZXNcblx0XHQkKCcjbG9naW5Ib3N0JykudmFsKGhvc3QpO1xuXHRcdCQoJyNsb2dpblVzZXJuYW1lJykudmFsKHVzZXIpO1xuXHRcdCQoJyNsb2dpbkVuY3J5cHQnKS5wcm9wKCdjaGVja2VkJywgZW5jcnlwdCk7XG5cdFx0JCgnI3JlbWVtYmVyTG9naW4nKS5wcm9wKCdjaGVja2VkJywgcmVtZW1iZXIpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBudW1lcmljIGlucHV0XG5cdFx0JCgnI2xvZ2luUG9ydCcpLmtlbmRvTnVtZXJpY1RleHRCb3goe1xuXHRcdFx0Zm9ybWF0OiAnIyMjIyMnLFxuXHRcdFx0dmFsdWU6IHBvcnRcblx0XHR9KTtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIEtlbmRvIFVJIFZhbGlkYXRvciBvbiB0aGUgXCJmb3JtXCIgY29udGFpbmVyXG5cdFx0Ly8gKE5PVEU6IGRvZXMgTk9UIGhhdmUgdG8gYmUgYW4gYWN0dWFsIDxmb3JtPiB0YWcpXG5cdFx0dGhpcy5fbG9naW5WYWxpZGF0b3IgPSAkKCcjbG9naW5Gb3JtJykua2VuZG9WYWxpZGF0b3Ioe1xuXHRcdFx0dmFsaWRhdGVPbkJsdXI6IHRydWVcblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIHZhbGlkYXRlIHRoZSBmb3JtIHdoZW4gdGhlIENvbm5lY3QgYnV0dG9uIGlzIGNsaWNrZWRcblx0XHQkKCcjbG9naW5CdXR0b24nKS5jbGljaygkLnByb3h5KHRoaXMuX29uQ29ubmVjdENsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gc3VibWl0IGZvcm0gb24gRW50ZXIga2V5IHByZXNzXG5cdFx0JCgnI2xvZ2luRm9ybScpLmtleXVwKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRpZiAoZXZlbnQua2V5ICE9PSAnRW50ZXInKSByZXR1cm47XG5cblx0XHRcdCQoJyNsb2dpbkJ1dHRvbicpLmNsaWNrKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGVuY3J5cHQgY2hlY2tib3hcblx0XHQkKCcjbG9naW5FbmNyeXB0JykuY2hhbmdlKCQucHJveHkoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGxldCBwb3J0ID0gdGhpcy5ERUZBVUxUX1dTX1BPUlQ7XG5cblx0XHRcdGlmICgkKCcjbG9naW5FbmNyeXB0JykucHJvcCgnY2hlY2tlZCcpKVxuXHRcdFx0XHRwb3J0ID0gdGhpcy5ERUZBVUxUX1dTU19QT1JUO1xuXG5cdFx0XHQkKCcjbG9naW5Qb3J0JykuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpLnZhbHVlKHBvcnQpO1xuXHRcdH0sIHRoaXMpKTtcblxuXHRcdC8vIEhpZGUgZXJyb3IgbWVzc2FnZSBjb250YWluZXJcblx0XHQkKCcjbG9naW4tZXJyb3InKS5oaWRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSBtb2R1bGUgdmlldy5cblx0ICovXG5cdF9pbml0TW9kdWxlVmlldygpXG5cdHtcblx0XHQvLyBBZGQgbGlzdGVuZXJzIHRvIG9wZW4vY2xvc2UgbWVudSBidXR0b25zXG5cdFx0JCgnLm5hdi1vcGVuJykuY2xpY2soJC5wcm94eShmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuX3RvZ2dsZU5hdih0cnVlKTtcblx0XHR9LCB0aGlzKSk7XG5cblx0XHQkKCcubmF2LWNsb3NlLCAubmF2LW92ZXJsYXknKS5jbGljaygkLnByb3h5KGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5fdG9nZ2xlTmF2KGZhbHNlKTtcblx0XHR9LCB0aGlzKSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXJzIHRvIHNlcnZpY2UgYnV0dG9uc1xuXHRcdCQoJyNyZXN0YXJ0LWJ1dHRvbicpLmNsaWNrKCQucHJveHkodGhpcy5fb25SZXN0YXJ0Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjaGFsdC1idXR0b24nKS5jbGljaygkLnByb3h5KHRoaXMuX29uSGFsdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2hlbHAtYnV0dG9uJykuY2xpY2soJC5wcm94eSh0aGlzLl9vbkhlbHBDbGljaywgdGhpcykpO1xuXHRcdCQoJyNkaXNjb25uZWN0LWJ1dHRvbicpLmNsaWNrKCQucHJveHkodGhpcy5fb25EaXNjb25uZWN0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBzaG93IHRvb2x0aXAgb24gc2VydmljZSBidXR0b25zIGhvdmVyXG5cdFx0JCgnLm5hdi1zZXJ2aWNlJykua2VuZG9Ub29sdGlwKHtcblx0XHRcdGZpbHRlcjogJ2xpW3RpdGxlXSdcblx0XHR9KTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBzY3JvbGwgbWFpbiB2aWV3IHRvIHRvcCBpZiBzdGF0dXMgYmFyIGlzIGNsaWNrZWRcblx0XHQkKCcjc3RhdHVzLWJhcicpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0JCgnbWFpbicpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDAgfSwgJ2Zhc3QnKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFVJIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBWYWxpZGF0ZSBsb2dpbiBmb3JtIGFuZCBjb25uZWN0K2xvZ2luIHRvIFNtYXJ0Rm94U2VydmVyLlxuXHQgKi9cblx0X29uQ29ubmVjdENsaWNrKGV2ZW50KVxuXHR7XG5cdFx0Ly8gSGlkZSBhbnkgcHJldmlvdXMgZXJyb3IgbWVzc2FnZVxuXHRcdCQoJyNsb2dpbi1lcnJvcicpLmhpZGUoKTtcblx0XHQkKCcjbG9naW4tZXJyb3InKS50ZXh0KCcnKTtcblxuXHRcdC8vIFZhbGlkYXRlIGxvZ2luIGZvcm1cblx0XHRpZiAodGhpcy5fbG9naW5WYWxpZGF0b3IudmFsaWRhdGUoKSlcblx0XHR7XG5cdFx0XHQvLyBEaXNhYmxlIGxvZ2luIGZvcm1cblx0XHRcdHRoaXMuX2VuYWJsZUxvZ2luRm9ybShmYWxzZSk7XG5cblx0XHRcdC8vIFJldHJpZXZlIGNvbm5lY3Rpb24gZGV0YWlsc1xuXHRcdFx0bGV0IGNvbmZpZyA9IHt9O1xuXHRcdFx0Y29uZmlnLmhvc3QgPSAkKCcjbG9naW5Ib3N0JykudmFsKCkudHJpbSgpO1xuXHRcdFx0Y29uZmlnLnBvcnQgPSAkKCcjbG9naW5Qb3J0JykuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpLnZhbHVlKCk7XG5cdFx0XHRjb25maWcudXNlU1NMID0gJCgnI2xvZ2luRW5jcnlwdCcpLnByb3AoJ2NoZWNrZWQnKTtcblxuXHRcdFx0bGV0IHVzZXJuYW1lID0gJCgnI2xvZ2luVXNlcm5hbWUnKS52YWwoKS50cmltKCk7XG5cdFx0XHRsZXQgcGFzc3dvcmQgPSAkKCcjbG9naW5QYXNzd29yZCcpLnZhbCgpO1xuXG5cdFx0XHQvLyBTYXZlIGlucHV0IHZhbHVlcyB0byBjb29raWUgKGV4Y2VwdCBwYXNzd29yZCkuLi5cblx0XHRcdC8vIC4uLm9yIGNsZWFyIHByZXZpb3VzbHkgc2F2ZWQgY29va2llXG5cdFx0XHRpZiAoJCgnI3JlbWVtYmVyTG9naW4nKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0XHR7XG5cdFx0XHRcdENvb2tpZXMuc2V0KCdsYXN0LXNlcnZlcicsIHtcblx0XHRcdFx0XHRob3N0OiBjb25maWcuaG9zdCxcblx0XHRcdFx0XHRwb3J0OiBjb25maWcucG9ydCxcblx0XHRcdFx0XHRlbmNyeXB0OiBjb25maWcudXNlU1NMLFxuXHRcdFx0XHRcdHVzZXI6IHVzZXJuYW1lXG5cblx0XHRcdFx0fSwge2V4cGlyZXM6IDMwfSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdENvb2tpZXMucmVtb3ZlKCdsYXN0LXNlcnZlcicpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb25uZWN0IHRvIFNGUzJYICYgbG9naW5cblx0XHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmNvbm5lY3QoY29uZmlnLCB1c2VybmFtZSwgcGFzc3dvcmQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXN0YXJ0IFNtYXJ0Rm94U2VydmVyLlxuXHQgKi9cblx0X29uUmVzdGFydENsaWNrKGV2ZW50KVxuXHR7XG5cdFx0bGV0IG1lc3NhZ2UgPSAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN0b3AgYW5kIHJlc3RhcnQgdGhpcyBpbnN0YW5jZSBvZiBTbWFydEZveFNlcnZlciAyWD8nO1xuXHRcdHRoaXMuc2hvd0NvbmZpcm1XYXJuaW5nKG1lc3NhZ2UsICQucHJveHkodGhpcy5fb25SZXN0YXJ0Q29uZmlybURpYWxvZ0NvbmZpcm0sIHRoaXMpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBIYWx0IFNtYXJ0Rm94U2VydmVyLlxuXHQgKi9cblx0X29uSGFsdENsaWNrKGV2ZW50KVxuXHR7XG5cdFx0bGV0IG1lc3NhZ2UgPSAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHN0b3AgdGhpcyBpbnN0YW5jZSBvZiBTbWFydEZveFNlcnZlciAyWD88YnI+WW91IHdvblxcJ3QgYmUgYWJsZSB0byByZXN0YXJ0IGl0IHVzaW5nIHRoZSBBZG1pbmlzdHJhdGlvbiBUb29sLic7XG5cdFx0dGhpcy5zaG93Q29uZmlybVdhcm5pbmcobWVzc2FnZSwgJC5wcm94eSh0aGlzLl9vbkhhbHRDb25maXJtRGlhbG9nQ29uZmlybSwgdGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gb25saW5lIGRvY3VtZW50YXRpb24uXG5cdCAqL1xuXHRfb25IZWxwQ2xpY2soZXZlbnQpXG5cdHtcblx0XHQvLyBPcGVuIG9ubGluZSBkb2Ncblx0XHR3aW5kb3cub3BlbihgaHR0cDovL2RvY3MyeC5zbWFydGZveHNlcnZlci5jb20vR2V0dGluZ1N0YXJ0ZWQvYWRtaW50b29sLSR7dGhpcy5fbW9kTWFuYWdlci5jdXJyZW50TW9kdWxlSWR9YCwgJ19ibGFuaycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIERpc2Nvbm5lY3QgZnJvbSBzZXJ2ZXIuXG5cdCAqL1xuXHRfb25EaXNjb25uZWN0Q2xpY2soZXZlbnQpXG5cdHtcblx0XHR0aGlzLl9jb25uTWFuYWdlci5kaXNjb25uZWN0KCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDT05ORUNUSU9OIE1BTkFHRVIgRVZFTlQgTElTVEVORVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uQ29ubmVjdGlvbihldnRQYXJhbXMpXG5cdHtcblx0XHQvLyBMb2cgbWVzc2FnZVxuXHRcdHRoaXMubG9nTWVzc2FnZShgQ29ubmVjdGlvbiB0byAke3RoaXMuX2Nvbm5NYW5hZ2VyLnNtYXJ0Rm94LmNvbmZpZy5ob3N0fToke3RoaXMuX2Nvbm5NYW5hZ2VyLnNtYXJ0Rm94LmNvbmZpZy5wb3J0fSBlc3RhYmxpc2hlZGApO1xuXHR9XG5cblx0X29uTG9naW4oZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gTG9nIG1lc3NhZ2Vcblx0XHR0aGlzLmxvZ01lc3NhZ2UoYFN1Y2Nlc3NmdWwgbG9naW4gdG8gJHt0aGlzLl9jb25uTWFuYWdlci5zbWFydEZveC5jb25maWcuaG9zdH06JHt0aGlzLl9jb25uTWFuYWdlci5zbWFydEZveC5jb25maWcucG9ydH0gcGVyZm9ybWVkYCk7XG5cblx0XHQvLyBHZXQgbGFzdCBsb2FkZWQgbW9kdWxlIGZyb20gY29va2llc1xuXHRcdGxldCBsb2FkTW9kdWxlSWQgPSBudWxsO1xuXHRcdGxldCBkYXRhID0gQ29va2llcy5nZXRKU09OKCdsYXN0LW1vZHVsZScpXG4gICAgICAgIGlmIChkYXRhKVxuXHRcdFx0bG9hZE1vZHVsZUlkID0gZGF0YS5pZDtcblxuXHRcdC8vIEluaXQgdGhlIG1vZHVsZXMgbGlzdCB3aXRoIHRoZSBjb25maWd1cmF0aW9uIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXIgYW5kOiBsb2FkIGxhc3Qgc2F2ZWQgbW9kdWxlLCBvciBmaXJzdCBtb2R1bGUgaW4gdGhlIGxpc3QsIG9yIHBhc3NlZCBtb2R1bGUgaWRcblx0XHR0aGlzLl9tb2RNYW5hZ2VyLmluaXRNb2R1bGVzTGlzdChldnRQYXJhbXMubW9kdWxlcywgbG9hZE1vZHVsZUlkKTtcblxuXHRcdC8vIFNhdmUgY3VycmVudCB1cHRpbWUgYW5kIHRpbWVzdGFtcFxuXHRcdHRoaXMuX3VwdGltZVNlY3MgPSB0aGlzLl91cHRpbWVUb1NlY3MoZXZ0UGFyYW1zLnNlcnZlclVwdGltZSk7XG5cdFx0dGhpcy5fbGFzdFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cblx0XHQvLyBTaG93L2hpZGUgSGFsdCBhbmQgUmVzdGFydCBidXR0b25zIGRlcGVuZGluZyBpZjpcblx0XHQvLyAxKSB0aGlzIGZlYXR1cmUgaXMgc3VwcG9ydGVkIGZvciB0aGUgc2VydmVyIG9wZXJhdGluZyBzeXN0ZW1cblx0XHQvLyAyKSB0aGUgYWRtaW5pc3RyYXRvciB3aG8ganVzdCBsb2dnZWQgaW4gaGFzIHRoZSBwZXJtaXNzaW9uIHRvIGV4ZWN1dGUgdGhlc2UgYWN0aW9uc1xuXHRcdHRoaXMuX3Nob3dIYWx0UmVzdGFydEJ1dHRvbnMoZXZ0UGFyYW1zLnByb2NDb250cm9sRW5hYmxlZCAmJiBldnRQYXJhbXMuYWxsb3dIYWx0KTtcblxuXHRcdC8vIFN3aXRjaCB0byBtb2R1bGVzIHZpZXdcblx0XHR0aGlzLl9nb1RvTW9kdWxlc1ZpZXcoZXZ0UGFyYW1zLnNlcnZlclZlcnNpb24sIGV2dFBhcmFtcy5zZXJ2ZXJOYW1lLCBldnRQYXJhbXMuZGlzYWJsZVZlckNoZWNrKTtcblxuXHRcdC8vIElmIGRlZmF1bHQgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIGhhdmUgYmVlbiB1c2VkLi4uXG5cdFx0aWYgKCQoJyNsb2dpblVzZXJuYW1lJykudmFsKCkgPT0gdGhpcy5ERUZBVUxUX1VTRVJOQU1FICYmICQoJyNsb2dpblBhc3N3b3JkJykudmFsKCkgPT0gdGhpcy5ERUZBVUxUX1BBU1NXT1JEKVxuXHRcdHtcblx0XHRcdC8vIC4uLnNob3cgYWxlcnRcblx0XHRcdHRoaXMuc2hvd1NpbXBsZUFsZXJ0KCdZb3UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGFkbWluaXN0cmF0aW9uIHByb2ZpbGUgd2hpY2ggaXMgaGlnaGx5IGluc2VjdXJlLCBwbGVhc2UgbWFrZSBzdXJlIHRvIGltbWVkaWF0ZWx5IGNoYW5nZSB0aGUgcGFzc3dvcmQuJyk7XG5cblx0XHRcdC8vIC4uLnNob3cgbm9uLXJlbW92YWJsZSBtZXNzYWdlIGluIGFsZXJ0IGJhclxuXHRcdFx0JCgnI2FsZXJ0LWJhcicpLnNob3coKTtcblx0XHRcdCQoJyNhbGVydC1iYXInKS50ZXh0KCdZb3UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGFkbWluaXN0cmF0aW9uIHByb2ZpbGUgd2hpY2ggaXMgaGlnaGx5IGluc2VjdXJlLCBwbGVhc2UgY2hhbmdlIHRoZSBwYXNzd29yZC4nKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTGlzdGVuZXIgY2FsbGVkIHdoZW4gdGhlIHVzZXIgZGlzY29ubmVjdGVkIHZvbHVudGFyaWx5LlxuXHQgKi9cblx0X29uRGlzY29ubmVjdGlvbihldnRQYXJhbXMpXG5cdHtcblx0XHQvLyBSZW1vdmUgYW55IHBvcHVwIG9yIGFsZXJ0XG5cdFx0dGhpcy5yZW1vdmVEaWFsb2coKTtcblxuXHRcdC8vIFN3aXRjaCBiYWNrIHRvIGxvZ2luIHZpZXdcblx0XHR0aGlzLl9nb1RvTG9naW5WaWV3KCk7XG5cblx0XHQvLyBIaWRlIG5hdmlnYXRpb24gaWYgb3BlblxuXHRcdHRoaXMuX3RvZ2dsZU5hdihmYWxzZSk7XG5cdH1cblxuXHQvKipcblx0ICogTGlzdGVuZXIgY2FsbGVkIHdoZW4gYW4gZXJyb3IgY2F1c2VkIGEgZGlzY29ubmVjdGlvbi5cblx0ICovXG5cdF9vbkNvbm5NYW5hZ2VyRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gUmVtb3ZlIGFueSBwb3B1cCBvciBhbGVydFxuXHRcdHRoaXMucmVtb3ZlRGlhbG9nKCk7XG5cblx0XHQvLyBMb2cgc3lzdGVtIG1lc3NhZ2Vcblx0XHR0aGlzLmxvZ01lc3NhZ2UoZXZ0UGFyYW1zLm1lc3NhZ2UsICd3YXJuJyk7XG5cblx0XHQvLyBTd2l0Y2ggYmFjayB0byBsb2dpbiB2aWV3XG5cdFx0dGhpcy5fZ29Ub0xvZ2luVmlldygpO1xuXG5cdFx0Ly8gRGlzcGxheSBlcnJvciBpbiBsb2dpbiB2aWV3XG5cdFx0JCgnI2xvZ2luLWVycm9yJykudGV4dChldnRQYXJhbXMubWVzc2FnZSk7XG5cdFx0JCgnI2xvZ2luLWVycm9yJykuc2hvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3RlbmVyIGNhbGxlZCB3aGVuIGFuIHVuZXhwZWN0ZWQgc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJzLlxuXHQgKi9cblx0X29uU2VydmVyRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdHRoaXMuc2hvd1NpbXBsZUFsZXJ0KGV2dFBhcmFtcy5tZXNzYWdlKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIE9USEVSIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9vbk1vZHVsZUxvYWRlZChldnRQYXJhbXMpXG5cdHtcblx0XHRjb25zdCBtb2R1bGVEYXRhID0gZXZ0UGFyYW1zLm1vZHVsZURhdGE7XG5cblx0XHQvLyBTYXZlIGxhc3QgbG9hZGVkIG1vZHVsZSB0byBjb29raWVzXG5cdFx0Q29va2llcy5zZXQoJ2xhc3QtbW9kdWxlJywge1xuXHRcdFx0aWQ6IG1vZHVsZURhdGEuaWRcblx0XHR9LCB7ZXhwaXJlczogMzB9KTtcblxuXHRcdC8vIERpc3BsYXkgbW9kdWxlIHRpdGxlXG5cdFx0JCgnI21vZHVsZS10aXRsZScpLnNob3coKTtcblx0XHQkKCcjbW9kdWxlLXRpdGxlLWxhYmVsJykudGV4dChtb2R1bGVEYXRhLm5hbWUpO1xuXG5cdFx0Ly8gVGVsbCB0aGUgY2hhdCBtYW5hZ2VyIHdoaWNoIG1vZHVsZSBoYXMgYmVlbiBsb2FkZWRcblx0XHR0aGlzLl9jaGF0TWFuYWdlci5zZXRDdXJyZW50TW9kdWxlKG1vZHVsZURhdGEuaWQpO1xuXG5cdFx0Ly8gQXNzaWduIHRoZSAuc2VsZWN0ZWQgY2xhc3MgdG8gdGhlIHNlbGVjdGVkIG5hdmlnYXRpb24gaXRlbVxuXHRcdCQoJy5uYXYtbWFpbicpLmZpbmQoYFtkYXRhLWlkPScke21vZHVsZURhdGEuaWR9J11gKS5hZGRDbGFzcygnc2VsZWN0ZWQnKS5zaWJsaW5ncygnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdH1cblxuXHRfb25Nb2R1bGVMb2FkRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdHRoaXMuc2hvd1NpbXBsZUFsZXJ0KGV2dFBhcmFtcy5tZXNzYWdlKTtcblx0fVxuXG5cdF9vblJlc3RhcnRDb25maXJtRGlhbG9nQ29uZmlybSgpXG5cdHtcblx0XHQvLyBTZW5kIHJlc3RhcnQgc2VydmVyIHJlcXVlc3Rcblx0XHR0aGlzLl9jb25uTWFuYWdlci5yZXN0YXJ0U2VydmVyKCk7XG5cdH1cblxuXHRfb25IYWx0Q29uZmlybURpYWxvZ0NvbmZpcm0oKVxuXHR7XG5cdFx0Ly8gU2VuZCBoYWx0IHNlcnZlciByZXF1ZXN0XG5cdFx0dGhpcy5fY29ubk1hbmFnZXIuaGFsdFNlcnZlcigpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFVCTElDIE1FVEhPRFNcblx0Ly8gVGhpcyBtZW1iZXJzIGFyZSB1c2VkIGJ5IHRoZSBzdWItbWFuYWdlcnMgKGkuZS4gQ29ubmVjdGlvbk1hbmFnZXIpXG5cdC8vIG9yIHRoZSBtb2R1bGVzIHRvIGNvbW11bmljYXRlIHdpdGggdGhpcyBzaGVsbCBjb250cm9sbGVyLlxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGdldCBzbWFydEZveCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY29ubk1hbmFnZXIuc21hcnRGb3g7XG5cdH1cblxuXHRnZXQgaW50VmVyc2lvbigpXG5cdHtcblx0XHR2YXIgdmVyc2lvbiA9IHRoaXMuVkVSU0lPTl9NQUpPUjtcblx0XHR2ZXJzaW9uICs9ICh0aGlzLlZFUlNJT05fTUlOT1IgPCAxMCA/ICcwJyA6ICcnKSArIHRoaXMuVkVSU0lPTl9NSU5PUjtcblx0XHR2ZXJzaW9uICs9ICh0aGlzLlZFUlNJT05fU1VCIDwgMTAgPyAnMCcgOiAnJykgKyB0aGlzLlZFUlNJT05fU1VCO1xuXG5cdFx0cmV0dXJuIE51bWJlcih2ZXJzaW9uKTtcblx0fVxuXG5cdGdldCBzdHJpbmdWZXJzaW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLlZFUlNJT05fTUFKT1IgKyAnLicgKyB0aGlzLlZFUlNJT05fTUlOT1IgKyAnLicgKyB0aGlzLlZFUlNJT05fU1VCO1xuXHR9XG5cblx0Z2V0U2ZzVmVyc2lvbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY3VycmVudFNmc1ZlcnNpb247XG5cdH1cblxuXHRsb2dNZXNzYWdlKG1lc3NhZ2UsIHR5cGUgPSAnbG9nJylcblx0e1xuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSAnaW5mbyc6XG5cdFx0XHRcdGNvbnNvbGUuaW5mbygnWyBBRE1JTlRPT0wgfCBJTkZPIF0gJyArIG1lc3NhZ2UpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3dhcm4nOlxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1sgQURNSU5UT09MIHwgV0FSTiBdICcgKyBtZXNzYWdlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdlcnJvcic6XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1sgQURNSU5UT09MIHwgRVJST1IgXSAnICsgbWVzc2FnZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Y29uc29sZS5sb2coJ1sgQURNSU5UT09MIHwgSU5GTyBdICcgKyBtZXNzYWdlKTtcblx0XHR9XG5cdH1cblxuXHRyZW1vdmVEaWFsb2coKVxuXHR7XG5cdFx0Ly8gSGlkZSBhbnkgc2hvd2luZyBtb2RhbFxuXHRcdCQoJy5tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG5cblx0XHQvLyBIaWRlIGFueSBzaG93aW5nIHRvYXN0XG5cdFx0JCgnLnRvYXN0JykudG9hc3QoJ2hpZGUnKTtcblxuXHRcdC8vIFJlbW92ZSBzaGVsbCdzIGRpYWxvZ1xuXHRcdGlmICh0aGlzLl9kaWFsb2cgIT0gbnVsbClcblx0XHR7XG5cdFx0XHR0aGlzLl9kaWFsb2cuY2xvc2UoKTtcblx0XHRcdHRoaXMuX2RpYWxvZy5kZXN0cm95KCk7XG5cdFx0XHR0aGlzLl9kaWFsb2cgPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIEVuYWJsZSB0aGUgZm9sbG93aW5nIGlmIG90aGVyIEtlbmRvIGRpYWxvZ3MgYXJlIHVzZWQgaW4gbW9kdWxlc1xuXHRcdC8qXG5cdFx0Ly8gUmVtb3ZlIGFueSBvdGhlciBkaWFsb2cgKGlubmVyIHRvIG1vZHVsZSlcblx0XHQkKCcuay1kaWFsb2ctY29udGVudCcpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcblx0XHRcdC8vIENvbmZpcm0gZGlhbG9nXG5cdFx0XHRsZXQgY29uZmlybSA9ICQodGhpcykuZGF0YSgna2VuZG9Db25maXJtJyk7XG5cdFx0XHRpZiAoY29uZmlybSlcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlybS5jbG9zZSgpO1xuXHRcdFx0XHRjb25maXJtLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQqL1xuXHR9XG5cblx0LyoqXG5cdCAqIFNob3cgc2ltcGxlIGFsZXJ0LlxuXHQgKi9cblx0c2hvd1NpbXBsZUFsZXJ0KHRleHQsIGlzV2FybmluZyA9IHRydWUpXG5cdHtcblx0XHQvLyBDcmVhdGUgYW5kIHNob3cgZGlhbG9nXG5cdFx0dGhpcy5fZGlhbG9nID0ga2VuZG8uYWxlcnQodGV4dCk7XG5cdFx0dGhpcy5fZGlhbG9nLnRpdGxlKGlzV2FybmluZyA/ICdXYXJuaW5nJyA6ICdJbmZvcm1hdGlvbicpO1xuXG5cdFx0Ly8gU2V0IGN1c3RvbSBjbGFzcyBmb3Igc3R5bGluZ1xuXHRcdHRoaXMuX2RpYWxvZy53cmFwcGVyLmFkZENsYXNzKGlzV2FybmluZyA/ICdpcy13YXJuaW5nJyA6ICdpcy1pbmZvJyk7XG5cblx0XHQvLyBMb2cgbWVzc2FnZSB0b29cblx0XHQvLyAod2UgZW5jYXBzdWxlIHRoZSB0ZXh0IGluIGEgc3BhbiBhbmQgZXh0cmFjdCB0aGUgdGV4dCBhZ2FpbiB0byByZW1vdmUgaW5uZXIgaHRtbCB0YWdzKVxuXHRcdGxldCBodG1sID0gJCgnPHNwYW4+JyArIHRleHQgKyAnPC9zcGFuPicpO1xuXHRcdHRoaXMubG9nTWVzc2FnZShodG1sLnRleHQoKSwgaXNXYXJuaW5nID8gJ3dhcm4nIDogJ2luZm8nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93IGNvbmZpcm0gYWxlcnQuXG5cdCAqL1xuXHRzaG93Q29uZmlybVdhcm5pbmcodGV4dCwgY29uZmlybUhhbmRsZXIpXG5cdHtcblx0XHQvLyBDcmVhdGUgZGlhbG9nXG5cdFx0dGhpcy5fZGlhbG9nID0gJCgnPGRpdj48L2Rpdj4nKS5rZW5kb0NvbmZpcm0oe1xuXHQgICAgICB0aXRsZTogJ1dhcm5pbmcnLFxuXHQgICAgICBjb250ZW50OiB0ZXh0LFxuXHRcdCAgYWN0aW9uczogW1xuXHQgICAgICAgICAge1xuXHQgICAgICAgICAgICAgIHRleHQ6ICdPSycsXG5cdCAgICAgICAgICAgICAgcHJpbWFyeTogdHJ1ZSxcblx0ICAgICAgICAgICAgICBhY3Rpb246IGNvbmZpcm1IYW5kbGVyXG5cdCAgICAgICAgICB9LFxuXHQgICAgICBdXG5cdCAgXHR9KS5kYXRhKCdrZW5kb0NvbmZpcm0nKTtcblxuXHRcdC8vIFNldCBjdXN0b20gY2xhc3MgZm9yIHN0eWxpbmdcblx0XHR0aGlzLl9kaWFsb2cud3JhcHBlci5hZGRDbGFzcygnaXMtd2FybmluZycpO1xuXG5cdFx0Ly8gU2hvdyBkaWFsb2dcblx0XHR0aGlzLl9kaWFsb2cub3BlbigpO1xuXHR9XG5cblx0c2hvd05vdGlmaWNhdGlvbih0aXRsZSwgbWVzc2FnZSlcblx0e1xuXHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0bGV0IHRvYXN0ID0gJChgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidG9hc3RcIiByb2xlPVwiYWxlcnRcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiBhcmlhLWF0b21pYz1cInRydWVcIiBkYXRhLWRlbGF5PVwiNDAwMFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidG9hc3QtaGVhZGVyXCI+XG5cdFx0XHRcdFx0PHN0cm9uZyBjbGFzcz1cIm1yLWF1dG9cIj4ke3RpdGxlfTwvc3Ryb25nPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibWwtMiBtYi0xIGNsb3NlXCIgZGF0YS1kaXNtaXNzPVwidG9hc3RcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidG9hc3QtYm9keVwiPiR7bWVzc2FnZX08L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdGApO1xuXG5cdFx0JCgnLnRvYXN0LWNvbnRhaW5lcicpLmFwcGVuZCh0b2FzdCk7XG5cdFx0dG9hc3QudG9hc3QoJ3Nob3cnKTtcblxuXHRcdC8vIExvZyBtZXNzYWdlIHRvb1xuXHRcdC8vICh3ZSBlbmNhcHN1bGUgdGhlIHRleHQgaW4gYSBzcGFuIGFuZCBleHRyYWN0IHRoZSB0ZXh0IGFnYWluIHRvIHJlbW92ZSBpbm5lciBodG1sIHRhZ3MpXG5cdFx0bGV0IGh0bWwgPSAkKCc8c3Bhbj4nICsgdGl0bGUgKyAnIC0gJyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuXHRcdHRoaXMubG9nTWVzc2FnZShodG1sLnRleHQoKSwgJ2luZm8nKTtcblx0fVxuXG5cdHVwZGF0ZU1vZHVsZVRpdGxlKHRpdGxlLCBhc1N1ZmZpeCA9IGZhbHNlKVxuXHR7XG5cdFx0JCgnI21vZHVsZS10aXRsZS1sYWJlbCcpLnRleHQoIChhc1N1ZmZpeCA/ICQoJyNtb2R1bGUtdGl0bGUtbGFiZWwnKS50ZXh0KCkgOiAnJykgKyB0aXRsZSApO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X2luaXRWaWV3cygpXG5cdHtcblx0XHQvLyBJbml0aWFsaXplIGxvZ2luIHZpZXdcblx0XHR0aGlzLl9pbml0TG9naW5WaWV3KCk7XG5cblx0XHQvLyBJbml0aWFsaXplIG1vZHVsZSB2aWV3XG5cdFx0dGhpcy5faW5pdE1vZHVsZVZpZXcoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTd2l0Y2ggdmlldyBpbiB0b3AgdmlldyBzdGFjay5cblx0ICogQHBhcmFtICB7c3RyaW5nfSB2aWV3SWQgSWRlbnRpZmllciBvZiB0aGUgdmlld3N0YXNrIGNoaWxkIHRvIGRpc3BsYXkuXG5cdCAqL1xuXHRfc3dpdGNoU2hlbGxWaWV3KHZpZXdJZClcblx0e1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGVsbCcpLnNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdJZCk7XG5cblx0XHQvLyAoalF1ZXJ5IGFsdGVybmF0aXZlKVxuXHRcdC8vICQoJyNzaGVsbCcpWzBdLnNlbGVjdGVkRWxlbWVudCA9ICQoJyNzaGVsbCcpLmNoaWxkcmVuKCcjJyArIHZpZXdJZClbMF07XG5cdH1cblxuXHQvKipcblx0ICogRW5hYmxlL2Rpc2FibGUgbG9naW4gZm9ybS5cblx0ICovXG5cdF9lbmFibGVMb2dpbkZvcm0oZW5hYmxlKVxuXHR7XG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgZmllbGRzZXQgKHdvcmtzIGZvciBhbGwgbm9uLWtlbmRvIGlucHV0cylcblx0XHQkKCcjbG9naW5Gb3JtIGZpZWxkc2V0JykucHJvcCgnZGlzYWJsZWQnLCAhZW5hYmxlKTtcblxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIG51bWVyaWMgdGV4dGJveFxuXHRcdCQoJyNsb2dpblBvcnQnKS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94JykuZW5hYmxlKGVuYWJsZSk7XG5cdH1cblxuXHRfdG9nZ2xlTmF2KGJvb2wpXG5cdHtcblx0XHQkKCcubmF2LWNvbnRhaW5lciwgLm5hdi1vdmVybGF5JykudG9nZ2xlQ2xhc3MoJ2lzLXZpc2libGUnLCBib29sKTtcblx0XHQkKCcubW9kdWxlLWNvbnRhaW5lcicpLnRvZ2dsZUNsYXNzKCdzY2FsZS1kb3duJywgYm9vbCk7XG5cdH1cblxuXHRfZ2V0VXJsUGFyYW1ldGVyKHBhcmFtKVxuXHR7XG5cdFx0bGV0IHBhZ2VVUkwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKTtcblx0XHRsZXQgdXJsVmFyaWFibGVzID0gcGFnZVVSTC5zcGxpdCgnJicpO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB1cmxWYXJpYWJsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXJhbU5hbWUgPSB1cmxWYXJpYWJsZXNbaV0uc3BsaXQoJz0nKTtcblx0XHRcdGlmIChwYXJhbU5hbWVbMF0gPT0gcGFyYW0gJiYgcGFyYW1OYW1lWzFdICE9ICcnKVxuXHRcdFx0XHRyZXR1cm4gcGFyYW1OYW1lWzFdO1xuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0X2dvVG9Mb2dpblZpZXcoKVxuXHR7XG5cdFx0Ly8gQ2xlYXIgcGFzc3dvcmQgZmllbGRcblx0XHQkKCcjbG9naW5QYXNzd29yZCcpLnZhbCgnJyk7XG5cblx0XHQvLyBTd2l0Y2ggdG8gbG9naW4gdmlld1xuXHRcdHRoaXMuX3N3aXRjaFNoZWxsVmlldygnbG9naW4tdmlldycpO1xuXG5cdFx0Ly8gVW5sb2FkIGN1cnJlbnQgbW9kdWxlXG5cdFx0dGhpcy5fbW9kTWFuYWdlci51bmxvYWRNb2R1bGUoKTtcblxuXHRcdC8vIEVuYWJsZSBsb2dpbiBmb3JtXG5cdFx0dGhpcy5fZW5hYmxlTG9naW5Gb3JtKHRydWUpO1xuXG5cdFx0Ly8gUmVtb3ZlIHVwdGltZSB1cGRhdGVyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLl91cHRpbWVUaW1lcik7XG5cdH1cblxuXHRfZ29Ub01vZHVsZXNWaWV3KHNlcnZlclZlcnNpb24sIHNlcnZlck5hbWUsIGRpc2FibGVWZXJDaGVjaylcblx0e1xuXHRcdC8vIEhpZGUgbW9kdWxlIHRpdGxlXG5cdFx0JCgnI21vZHVsZS10aXRsZScpLmhpZGUoKTtcblx0XHQkKCcjbW9kdWxlLXRpdGxlLWxhYmVsJykudGV4dCgnJyk7XG5cblx0XHQvLyBIaWRlIGFsZXJ0IGJhclxuXHRcdCQoJyNhbGVydC1iYXInKS5oaWRlKCk7XG5cblx0XHQvLyBTaG93IHNlcnZlciB2ZXJzaW9uIGluIHRoZSBoZWFkZXJcblx0XHQkKCcjc2ZzLXZlcnNpb24tdmFsdWUnKS50ZXh0KHNlcnZlclZlcnNpb24pO1xuXG5cdFx0Ly8gU2V0IHNlcnZlciBuYW1lLCBJUCBhbmQgcG9ydCBpbiBtb2R1bGUncyB0aXRsZSBiYXJcblx0XHRsZXQgaG9zdCA9IGAke3RoaXMuX2Nvbm5NYW5hZ2VyLnNtYXJ0Rm94LmNvbmZpZy5ob3N0fToke3RoaXMuX2Nvbm5NYW5hZ2VyLnNtYXJ0Rm94LmNvbmZpZy5wb3J0fWAgKyAoc2VydmVyTmFtZSAhPSAnJyA/IGAgWyR7c2VydmVyTmFtZX1dYCA6ICcnKTtcblx0XHQkKCcjaG9zdC1sYWJlbCcpLnRleHQoaG9zdCk7XG5cblx0XHQvLyBTYXZlIGN1cnJlbnQgU0ZTIHZlcnNpb25cblx0XHR0aGlzLl9jdXJyZW50U2ZzVmVyc2lvbiA9IHNlcnZlclZlcnNpb247XG5cblx0XHQvLyBDaGVjayBuZXcgU0ZTIHZlcnNpb24gYXZhaWxhYmlsaXR5ICh1bmxlc3MgZGlzYWJsZWQgaW4gdGhlIHNlcnZlci1zaWRlIGNvbmZpZ3VyYXRpb24geG1sKVxuXHRcdGlmICghZGlzYWJsZVZlckNoZWNrKVxuXHRcdFx0dGhpcy5fY2hlY2tBdmFpbGFibGVTZnNWZXJzaW9uKCk7XG5cblx0XHQvLyBTdGFydCB1cHRpbWUgdXBkYXRlclxuXHRcdHRoaXMuX3VwdGltZVRpbWVyID0gc2V0SW50ZXJ2YWwoJC5wcm94eSh0aGlzLl91cGRhdGVVcHRpbWUsIHRoaXMpLCAxMDAwKTtcblxuXHRcdC8vIFN3aXRjaCB0byBtb2R1bGVzIHZpZXdcblx0XHR0aGlzLl9zd2l0Y2hTaGVsbFZpZXcoJ21vZHVsZS12aWV3Jyk7XG5cdH1cblxuXHRfc2hvd0hhbHRSZXN0YXJ0QnV0dG9ucyhzaG93KVxuXHR7XG5cdFx0aWYgKHNob3cpXG5cdFx0e1xuXHRcdFx0JCgnI3Jlc3RhcnQtYnV0dG9uJykuc2hvdygpO1xuXHRcdFx0JCgnI2hhbHQtYnV0dG9uJykuc2hvdygpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0JCgnI3Jlc3RhcnQtYnV0dG9uJykuaGlkZSgpO1xuXHRcdFx0JCgnI2hhbHQtYnV0dG9uJykuaGlkZSgpO1xuXHRcdH1cblx0fVxuXG5cdF9jaGVja0F2YWlsYWJsZVNmc1ZlcnNpb24oKVxuXHR7XG5cdFx0Ly8gUmVtb3ZlIGNsYXNzIHRvIGhpZGUgdXBkYXRlIGJ1dHRvbiBzdHlsZSBhbmQgbm90aWZpY2F0aW9uIGljb25cblx0XHQkKCcjc2ZzLXZlcnNpb24nKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG5cblx0XHQvLyBSZW1vdmUgdXBkYXRlIGJ1dHRvbiBjbGljayBsaXN0ZW5lcnNcblx0XHQkKCcjc2ZzLXZlcnNpb24tYnV0dG9uJykub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gTG9hZCBmaWxlIGNvbnRhaW5pbmcgbGF0ZXN0IFNGUyB2ZXJzaW9uIGluZm9cblx0XHQkLmFqYXgoe1xuXHRcdFx0dHlwZTogJ0dFVCcsXG5cdFx0XHR1cmw6ICdodHRwczovL3d3dy5zbWFydGZveHNlcnZlci5jb20vZG93bmxvYWRzL3NmczJ4L2xhdGVzdFZlcnNpb24udHh0JyxcbiAgICAgICAgXHRkYXRhVHlwZTogJ3RleHQnLFxuXHRcdFx0c3VjY2VzczogJC5wcm94eSh0aGlzLl9vbkxhdGVzdFNmc1ZlcnNpb25JbmZvTG9hZGVkLCB0aGlzKSxcblx0XHRcdGVycm9yOiAkLnByb3h5KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR0aGlzLmxvZ01lc3NhZ2UoJ1VuYWJsZSB0byBjaGVjayBuZXcgc2VydmVyIHZlcnNpb24gYXZhaWxhYmlsaXR5IG9uIFNtYXJ0Rm94U2VydmVyIHdlYnNpdGUnLCAnd2FybicpO1xuXHRcdFx0fSwgdGhpcylcblx0XHR9KTtcblx0fVxuXG5cdF9vbkxhdGVzdFNmc1ZlcnNpb25JbmZvTG9hZGVkKGRhdGEpXG5cdHtcblx0XHQvLyBQYXJzZSByZXR1cm5lZCBkYXRhXG5cdFx0Y29uc3QgdiA9IHBhcnNlKGRhdGEpO1xuXG5cdFx0aWYgKHYudmVyc2lvbiAhPSBudWxsICYmIHRoaXMuX2lzU2ZzVmVyc2lvbk5ld2VyKHYudmVyc2lvbiwgdGhpcy5fY3VycmVudFNmc1ZlcnNpb24pKVxuXHRcdHtcblx0XHRcdHRoaXMudGVtcGZsYWcgPSB0cnVlO1xuXHRcdFx0dGhpcy5sb2dNZXNzYWdlKCdBbiB1cGRhdGVkIHZlcnNpb24gb2YgU21hcnRGb3hTZXJ2ZXIgMlggaXMgYXZhaWxhYmxlIGZvciBkb3dubG9hZCcsICdpbmZvJyk7XG5cblx0XHRcdC8vIFNldCB1cGdyYWRlIGRpYWxvZyBkZXRhaWxzXG5cdFx0XHR0aGlzLl9zZnNVcGRhdGVEZXRhaWxzID0gdjtcblxuXHRcdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIHNob3cgU0ZTIHZlcnNpb24gdXBkYXRlIG1vZGFsXG5cdFx0XHQkKCcjc2ZzLXZlcnNpb24tYnV0dG9uJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdCQoJyNzZXJ2ZXJVcGRhdGVNb2RhbCcpLm1vZGFsKHtcblx0XHRcdFx0XHRiYWNrZHJvcDogJ3N0YXRpYycsXG5cdFx0XHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBTZXQgY2xhc3MgdG8gc2hvdyB1cGRhdGUgYnV0dG9uIHN0eWxlIGFuZCBub3RpZmljYXRpb24gaWNvblxuXHRcdFx0JCgnI3Nmcy12ZXJzaW9uJykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG5cdFx0XHQvLyBVcGRhdGUgbW9kYWwgY29udGVudFxuXHRcdFx0Y29uc3QgbmV3VmVyID0gdGhpcy5fc2ZzVXBkYXRlRGV0YWlscztcblx0XHRcdGNvbnN0IGN1cnJWZXIgPSB0aGlzLl9jdXJyZW50U2ZzVmVyc2lvbjtcblxuXHRcdFx0bGV0IG1vZGFsID0gJCgnI3NlcnZlclVwZGF0ZU1vZGFsJyk7XG5cblx0XHRcdC8vIFVwZGF0ZSBtb2RhbCBjb250ZW50XG5cdFx0XHQkKCcjbmV3VmVyc0xiJywgbW9kYWwpLnRleHQobmV3VmVyLnZlcnNpb24pO1xuXHRcdFx0JCgnI3VwZFR5cGVMYicsIG1vZGFsKS50ZXh0KG5ld1Zlci5pc1BhdGNoID8gJ3BhdGNoJyA6ICdmdWxsIGluc3RhbGxlcicpO1xuXHRcdFx0JCgnI3JlcVZlcnNMYicsIG1vZGFsKS50ZXh0KG5ld1Zlci5pc1BhdGNoID8gJyAocmVxdWlyZXMgdmVyc2lvbiAnICsgbmV3VmVyLnJlcXVpcmVzICsgJyBvciBsYXRlciknIDogJycpO1xuXHRcdFx0JCgnI2N1cnJWZXJzTGInLCBtb2RhbCkudGV4dChjdXJyVmVyKTtcblx0XHRcdCQoJyNzZXJ2ZXJVcGRhdGVNb2RhbExpbmsnLCBtb2RhbCkuYXR0cignaHJlZicsIG5ld1Zlci51cmwpO1xuXHRcdH1cblx0fVxuXG5cdF9pc1Nmc1ZlcnNpb25OZXdlcihhdmFpbGFibGVWZXIsIGN1cnJlbnRWZXIpXG5cdHtcblx0XHRjb25zdCBNQUogPSAwO1xuXHRcdGNvbnN0IE1JTiA9IDE7XG5cdFx0Y29uc3QgU1VCID0gMjtcblxuXHRcdGNvbnN0IGF2YWlsYWJsZSA9IGF2YWlsYWJsZVZlci5zcGxpdCgnLicpO1xuXHRcdGNvbnN0IGN1cnJlbnQgPSBjdXJyZW50VmVyLnNwbGl0KCcuJyk7XG5cblx0XHQvLyBDaGVjayBtYWpvciB2ZXJzaW9uXG5cdFx0aWYgKGF2YWlsYWJsZVtNQUpdID4gY3VycmVudFtNQUpdKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZWxzZSBpZiAoYXZhaWxhYmxlW01BSl0gPT0gY3VycmVudFtNQUpdKVxuXHRcdHtcblx0XHRcdC8vIENoZWNrIG1pbm9yIHZlcnNpb25cblx0XHRcdGlmIChhdmFpbGFibGVbTUlOXSA+IGN1cnJlbnRbTUlOXSlcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRlbHNlIGlmIChhdmFpbGFibGVbTUlOXSA9PSBjdXJyZW50W01JTl0pXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENoZWNrIHN1YiB2ZXJzaW9uXG5cdFx0XHRcdGlmIChhdmFpbGFibGVbU1VCXSA+IGN1cnJlbnRbU1VCXSlcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRfdXBkYXRlVXB0aW1lKClcblx0e1xuXHRcdGNvbnN0IGN1cnJUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXHRcdGNvbnN0IGVsYXBzZWRTZWMgPSBNYXRoLnJvdW5kKChjdXJyVGltZXN0YW1wIC0gdGhpcy5fbGFzdFRpbWVzdGFtcCkgLyAxMDAwKTtcblxuXHRcdHRoaXMuX3VwdGltZVNlY3MgKz0gZWxhcHNlZFNlYztcblx0XHR0aGlzLl9sYXN0VGltZXN0YW1wID0gY3VyclRpbWVzdGFtcDtcblxuXHRcdC8vIFNlbmQgdXBkYXRlZCB1cHRpbWUgdG8gY3VycmVudCBtb2R1bGUgKGlmIGxvYWRlZClcblx0XHRsZXQgbW9kdWxlID0gdGhpcy5fbW9kTWFuYWdlci5jdXJyZW50TW9kdWxlO1xuXHRcdGlmIChtb2R1bGUgIT0gbnVsbClcblx0XHR7XG5cdFx0XHRsZXQgY291bnRlciA9IHRoaXMuX3VwdGltZVNlY3M7XG5cdFx0XHRsZXQgdXB0aW1lQXJyID0gW107XG5cblx0XHRcdHVwdGltZUFyclswXSA9IE1hdGguZmxvb3IoY291bnRlciAvICgyNCAqIDYwICogNjApKTtcdC8vIGRheXNcblx0XHRcdGNvdW50ZXIgLT0gdXB0aW1lQXJyWzBdICogMjQgKiA2MCAqIDYwO1xuXG5cdFx0XHR1cHRpbWVBcnJbMV0gPSBNYXRoLmZsb29yKGNvdW50ZXIgLyAoNjAgKiA2MCkpO1x0XHRcdC8vIGhvdXJzXG5cdFx0XHRjb3VudGVyIC09IHVwdGltZUFyclsxXSAqIDYwICogNjA7XG5cblx0XHRcdHVwdGltZUFyclsyXSA9IE1hdGguZmxvb3IoY291bnRlciAvIDYwKTtcdFx0XHRcdC8vIG1pbnV0ZXNcblx0XHRcdGNvdW50ZXIgLT0gdXB0aW1lQXJyWzJdICogNjA7XG5cblx0XHRcdHVwdGltZUFyclszXSA9IGNvdW50ZXI7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gc2Vjb25kc1xuXG5cdFx0XHRtb2R1bGUub25VcHRpbWVVcGRhdGVkKHVwdGltZUFycik7XG5cdFx0fVxuXHR9XG5cblx0X3VwdGltZVRvU2Vjcyh1cHRpbWVBcnIpXG5cdHtcblx0XHRsZXQgdXB0aW1lID0gMDtcblxuXHRcdHVwdGltZSArPSB1cHRpbWVBcnJbMF0gKiAyNCAqIDYwICogNjA7XHQvLyBkYXlzXG5cdFx0dXB0aW1lICs9IHVwdGltZUFyclsxXSAqIDYwICogNjA7IFx0XHQvLyBob3Vyc1xuXHRcdHVwdGltZSArPSB1cHRpbWVBcnJbMl0gKiA2MDsgXHRcdFx0Ly8gbWludXRlc1xuXHRcdHVwdGltZSArPSB1cHRpbWVBcnJbM107XHRcdFx0XHRcdC8vIHNlY29uZHNcblxuXHRcdHJldHVybiB1cHRpbWU7XG5cdH1cbn1cbiIsImNvbnN0IGF0Q29tbWVudCA9IChzcmMsIG9mZnNldCkgPT4ge1xuICBjb25zdCBjaCA9IHNyY1tvZmZzZXRdXG4gIHJldHVybiBjaCA9PT0gJyMnIHx8IGNoID09PSAnISdcbn1cblxuY29uc3QgYXRMaW5lRW5kID0gKHNyYywgb2Zmc2V0KSA9PiB7XG4gIGNvbnN0IGNoID0gc3JjW29mZnNldF1cbiAgcmV0dXJuICFjaCB8fCBjaCA9PT0gJ1xccicgfHwgY2ggPT09ICdcXG4nXG59XG5cbmNvbnN0IGVuZE9mSW5kZW50ID0gKHNyYywgb2Zmc2V0KSA9PiB7XG4gIGxldCBjaCA9IHNyY1tvZmZzZXRdXG4gIHdoaWxlIChjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICdcXGYnIHx8IGNoID09PSAnICcpIHtcbiAgICBvZmZzZXQgKz0gMVxuICAgIGNoID0gc3JjW29mZnNldF1cbiAgfVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmNvbnN0IGVuZE9mQ29tbWVudCA9IChzcmMsIG9mZnNldCkgPT4ge1xuICBsZXQgY2ggPSBzcmNbb2Zmc2V0XVxuICB3aGlsZSAoY2ggJiYgY2ggIT09ICdcXHInICYmIGNoICE9PSAnXFxuJykge1xuICAgIG9mZnNldCArPSAxXG4gICAgY2ggPSBzcmNbb2Zmc2V0XVxuICB9XG4gIHJldHVybiBvZmZzZXRcbn1cblxuY29uc3QgZW5kT2ZLZXkgPSAoc3JjLCBvZmZzZXQpID0+IHtcbiAgbGV0IGNoID0gc3JjW29mZnNldF1cbiAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxyJyAmJiBjaCAhPT0gJ1xcbicgJiYgY2ggIT09ICdcXHQnICYmIGNoICE9PSAnXFxmJyAmJiBjaCAhPT0gJyAnICYmIGNoICE9PSAnOicgJiYgY2ggIT09ICc9Jykge1xuICAgIGlmIChjaCA9PT0gJ1xcXFwnKSB7XG4gICAgICBpZiAoc3JjW29mZnNldCArIDFdID09PSAnXFxuJykge1xuICAgICAgICBvZmZzZXQgPSBlbmRPZkluZGVudChzcmMsIG9mZnNldCArIDIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvZmZzZXQgKz0gMlxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgKz0gMVxuICAgIH1cbiAgICBjaCA9IHNyY1tvZmZzZXRdXG4gIH1cbiAgcmV0dXJuIG9mZnNldFxufVxuXG5jb25zdCBlbmRPZlNlcGFyYXRvciA9IChzcmMsIG9mZnNldCkgPT4ge1xuICBsZXQgY2ggPSBzcmNbb2Zmc2V0XVxuICBsZXQgaGFzRXFTaWduID0gZmFsc2VcbiAgbG9vcDogd2hpbGUgKGNoID09PSAnXFx0JyB8fCBjaCA9PT0gJ1xcZicgfHwgY2ggPT09ICcgJyB8fCBjaCA9PT0gJz0nIHx8IGNoID09PSAnOicgfHwgY2ggPT09ICdcXFxcJykge1xuICAgIHN3aXRjaCAoY2gpIHtcbiAgICAgIGNhc2UgJ1xcXFwnOlxuICAgICAgICBpZiAoc3JjW29mZnNldCArIDFdICE9PSAnXFxuJykgYnJlYWsgbG9vcFxuICAgICAgICBvZmZzZXQgPSBlbmRPZkluZGVudChzcmMsIG9mZnNldCArIDIpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICc9JzpcbiAgICAgIGNhc2UgJzonOlxuICAgICAgICBpZiAoaGFzRXFTaWduKSBicmVhayBsb29wXG4gICAgICAgIGhhc0VxU2lnbiA9IHRydWVcbiAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgfVxuICAgIGNoID0gc3JjW29mZnNldF1cbiAgfVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmNvbnN0IGVuZE9mVmFsdWUgPSAoc3JjLCBvZmZzZXQpID0+IHtcbiAgbGV0IGNoID0gc3JjW29mZnNldF1cbiAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxyJyAmJiBjaCAhPT0gJ1xcbicpIHtcbiAgICBvZmZzZXQgKz0gY2ggPT09ICdcXFxcJyA/IDIgOiAxXG4gICAgY2ggPSBzcmNbb2Zmc2V0XVxuICB9XG4gIHJldHVybiBvZmZzZXRcbn1cblxuY29uc3QgdW5lc2NhcGUgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvXFxcXCh1WzAtOWEtZkEtRl17NH18XFxyP1xcblsgXFx0XFxmXSp8Lik/L2csIChtYXRjaCwgY29kZSkgPT4ge1xuICBzd2l0Y2ggKGNvZGUgJiYgY29kZVswXSkge1xuICAgIGNhc2UgJ2YnOiByZXR1cm4gJ1xcZidcbiAgICBjYXNlICduJzogcmV0dXJuICdcXG4nXG4gICAgY2FzZSAncic6IHJldHVybiAnXFxyJ1xuICAgIGNhc2UgJ3QnOiByZXR1cm4gJ1xcdCdcbiAgICBjYXNlICd1JzpcbiAgICAgIGNvbnN0IGMgPSBwYXJzZUludChjb2RlLnN1YnN0cigxKSwgMTYpXG4gICAgICByZXR1cm4gaXNOYU4oYykgPyBjb2RlIDogU3RyaW5nLmZyb21DaGFyQ29kZShjKVxuICAgIGNhc2UgJ1xccic6XG4gICAgY2FzZSAnXFxuJzpcbiAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgIHJldHVybiAnJ1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gY29kZVxuICB9XG59KVxuXG4vKipcbiAqIFNwbGl0cyB0aGUgaW5wdXQgc3RyaW5nIGludG8gYW4gYXJyYXkgb2YgbG9naWNhbCBsaW5lc1xuICpcbiAqIEtleS12YWx1ZSBwYWlycyBhcmUgW2tleSwgdmFsdWVdIGFycmF5cyB3aXRoIHN0cmluZyB2YWx1ZXMuIEVzY2FwZSBzZXF1ZW5jZXNcbiAqIGluIGtleXMgYW5kIHZhbHVlcyBhcmUgcGFyc2VkLiBFbXB0eSBsaW5lcyBhcmUgaW5jbHVkZWQgYXMgZW1wdHkgc3RyaW5ncywgYW5kXG4gKiBjb21tZW50cyBhcyBzdHJpbmdzIHRoYXQgc3RhcnQgd2l0aCAnIycgb3IgJyEgY2hhcmFjdGVycy4gTGVhZGluZyB3aGl0ZXNwYWNlXG4gKiBpcyBub3QgaW5jbHVkZWQuXG4gKlxuICogQHNlZSBodHRwczovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvOS9kb2NzL2FwaS9qYXZhL3V0aWwvUHJvcGVydGllcy5odG1sI2xvYWQoamF2YS5pby5SZWFkZXIpXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICogQHJldHVybnMgQXJyYXk8c3RyaW5nIHwgc3RyaW5nW11dPlxuICovXG5mdW5jdGlvbiBwYXJzZUxpbmVzIChzcmMpIHtcbiAgY29uc3QgbGluZXMgPSBbXVxuICBmb3IgKGkgPSAwOyBpIDwgc3JjLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHNyY1tpXSA9PT0gJ1xcbicgJiYgc3JjW2kgLSAxXSA9PT0gJ1xccicpIGkgKz0gMVxuICAgIGlmICghc3JjW2ldKSBicmVha1xuICAgIGNvbnN0IGtleVN0YXJ0ID0gZW5kT2ZJbmRlbnQoc3JjLCBpKVxuICAgIGlmIChhdExpbmVFbmQoc3JjLCBrZXlTdGFydCkpIHtcbiAgICAgIGxpbmVzLnB1c2goJycpXG4gICAgICBpID0ga2V5U3RhcnRcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIGlmIChhdENvbW1lbnQoc3JjLCBrZXlTdGFydCkpIHtcbiAgICAgIGNvbnN0IGNvbW1lbnRFbmQgPSBlbmRPZkNvbW1lbnQoc3JjLCBrZXlTdGFydClcbiAgICAgIGxpbmVzLnB1c2goc3JjLnNsaWNlKGtleVN0YXJ0LCBjb21tZW50RW5kKSlcbiAgICAgIGkgPSBjb21tZW50RW5kXG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCBrZXlFbmQgPSBlbmRPZktleShzcmMsIGtleVN0YXJ0KVxuICAgIGNvbnN0IGtleSA9IHVuZXNjYXBlKHNyYy5zbGljZShrZXlTdGFydCwga2V5RW5kKSlcbiAgICBjb25zdCB2YWx1ZVN0YXJ0ID0gZW5kT2ZTZXBhcmF0b3Ioc3JjLCBrZXlFbmQpXG4gICAgaWYgKGF0TGluZUVuZChzcmMsIHZhbHVlU3RhcnQpKSB7XG4gICAgICBsaW5lcy5wdXNoKFtrZXksICcnXSlcbiAgICAgIGkgPSB2YWx1ZVN0YXJ0XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBjb25zdCB2YWx1ZUVuZCA9IGVuZE9mVmFsdWUoc3JjLCB2YWx1ZVN0YXJ0KVxuICAgIGNvbnN0IHZhbHVlID0gdW5lc2NhcGUoc3JjLnNsaWNlKHZhbHVlU3RhcnQsIHZhbHVlRW5kKSlcbiAgICBsaW5lcy5wdXNoKFtrZXksIHZhbHVlXSlcbiAgICBpID0gdmFsdWVFbmRcbiAgfVxuICByZXR1cm4gbGluZXNcbn1cblxuLyoqXG4gKiBQYXJzZXMgYW4gaW5wdXQgc3RyaW5nIHJlYWQgZnJvbSBhIC5wcm9wZXJ0aWVzIGZpbGUgaW50byBhIEphdmFTY3JpcHQgT2JqZWN0XG4gKlxuICogSWYgdGhlIHNlY29uZCBgcGF0aGAgcGFyYW1ldGVyIGlzIHRydWUsIGRvdHMgJy4nIGluIGtleXMgd2lsbCByZXN1bHQgaW4gYVxuICogbXVsdGktbGV2ZWwgb2JqZWN0ICh1c2UgYSBzdHJpbmcgdmFsdWUgdG8gY3VzdG9taXNlKS4gSWYgYSBwYXJlbnQgbGV2ZWwgaXNcbiAqIGRpcmVjdGx5IGFzc2lnbmVkIGEgdmFsdWUgd2hpbGUgaXQgYWxzbyBoYXMgYSBjaGlsZCB3aXRoIGFuIGFzc2lnbmVkIHZhbHVlLFxuICogdGhlIHBhcmVudCB2YWx1ZSB3aWxsIGJlIGFzc2lnbmVkIHRvIGl0cyBlbXB0eSBzdHJpbmcgJycga2V5LiBSZXBlYXRlZCBrZXlzXG4gKiB3aWxsIHRha2UgdGhlIGxhc3QgYXNzaWduZWQgdmFsdWUuIEtleSBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCwgYnV0IGlzIGxpa2VseVxuICogdG8gbWF0Y2ggdGhlIG9yZGVyIG9mIHRoZSBpbnB1dCBsaW5lcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gKiBAcGFyYW0ge2Jvb2xlYW4gfCBzdHJpbmd9IFtwYXRoPWZhbHNlXVxuICovXG5mdW5jdGlvbiBwYXJzZSAoc3JjLCBwYXRoKSB7XG4gIGNvbnN0IHBhdGhTZXAgPSB0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycgPyBwYXRoIDogJy4nXG4gIHJldHVybiBwYXJzZUxpbmVzKHNyYykucmVkdWNlKChyZXMsIGxpbmUpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShsaW5lKSkge1xuICAgICAgY29uc3QgW2tleSwgdmFsdWVdID0gbGluZVxuICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgY29uc3Qga2V5UGF0aCA9IGtleS5zcGxpdChwYXRoU2VwKVxuICAgICAgICBsZXQgcGFyZW50ID0gcmVzXG4gICAgICAgIHdoaWxlIChrZXlQYXRoLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgY29uc3QgcCA9IGtleVBhdGguc2hpZnQoKVxuICAgICAgICAgIGlmICghcGFyZW50W3BdKSB7XG4gICAgICAgICAgICBwYXJlbnRbcF0gPSB7fVxuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmVudFtwXSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHBhcmVudFtwXSA9IHsgJyc6IHBhcmVudFtwXSB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBhcmVudCA9IHBhcmVudFtwXVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxlYWYgPSBrZXlQYXRoWzBdXG4gICAgICAgIGlmICh0eXBlb2YgcGFyZW50W2xlYWZdID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHBhcmVudFtsZWFmXVsnJ10gPSB2YWx1ZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudFtsZWFmXSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc1trZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9LCB7fSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHBhcnNlLCBwYXJzZUxpbmVzIH1cbiIsImV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9saXN0ZW5lcnNCeUV2ZW50ID0ge307XG5cdH1cblxuXHQvKipcblx0ICogUmVnaXN0ZXJzIGFuIGV2ZW50IGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgd2lsbCByZWNlaXZlIG5vdGlmaWNhdGlvbiBvZiBhbiBldmVudC5cblx0ICpcblx0ICogPHA+SWYgeW91IG5vIGxvbmdlciBuZWVkIGFuIGV2ZW50IGxpc3RlbmVyLCByZW1vdmUgaXQgYnkgY2FsbGluZyB0aGUgPGVtPnJlbW92ZUV2ZW50TGlzdGVuZXIoKTwvZW0+IG1ldGhvZCwgb3IgbWVtb3J5IGlzc3VlcyBjb3VsZCBhcmlzZS5cblx0ICogSW4gZmFjdCBldmVudCBsaXN0ZW5lcnMgYXJlIG5vdCBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgZnJvbSBtZW1vcnkuPC9wPlxuXHQgKlxuXHQgKiBAcGFyYW1cdHtzdHJpbmd9IGV2dFR5cGVcdFRoZSB0eXBlIG9mIGV2ZW50IHRvIGxpc3RlbiB0by5cblx0ICogQHBhcmFtXHR7ZnVuY3Rpb259IGNhbGxiYWNrXHRUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdGhhdCBwcm9jZXNzZXMgdGhlIGV2ZW50LiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBhY2NlcHQgYW4gb2JqZWN0IGFzIGl0cyBvbmx5IHBhcmFtZXRlciwgd2hpY2ggaW4gdHVybiBjb250YWlucyB0aGUgZXZlbnQgcGFyYW1ldGVycy5cblx0ICogQHBhcmFtXHR7b2JqZWN0fSBzY29wZVx0XHRUaGUgb2JqZWN0IHRoYXQgYWN0cyBhcyBhIGNvbnRleHQgZm9yIHRoZSBldmVudCBsaXN0ZW5lcjogaXQgaXMgdGhlIG9iamVjdCB0aGF0IGFjdHMgYXMgYSBcInBhcmVudCBzY29wZVwiIGZvciB0aGUgY2FsbGJhY2sgZnVuY3Rpb24sIHRodXMgcHJvdmlkaW5nIGNvbnRleHQgKGkuZS4gYWNjZXNzIHRvIHZhcmlhYmxlcyBhbmQgb3RoZXIgbWVodG9kcykgdG8gdGhlIGZ1bmN0aW9uIGl0c2VsZi5cblx0ICovXG5cdGFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgY2FsbGJhY2ssIHNjb3BlKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9saXN0ZW5lcnNCeUV2ZW50W2V2dFR5cGVdKVxuXHRcdFx0dGhpcy5fbGlzdGVuZXJzQnlFdmVudFtldnRUeXBlXSA9IFtdO1xuXG5cdFx0dGhpcy5fbGlzdGVuZXJzQnlFdmVudFtldnRUeXBlXS5wdXNoKHtjYWxsYmFjazpjYWxsYmFjaywgc2NvcGU6c2NvcGV9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZW1vdmVzIGFuIGV2ZW50IGxpc3RlbmVyLlxuXHQgKlxuXHQgKiBAcGFyYW1cdHtzdHJpbmd9IGV2dFR5cGVcdFRoZSB0eXBlIG9mIGV2ZW50IHRvIHJlbW92ZS5cblx0ICogQHBhcmFtXHR7ZnVuY3Rpb259IGNhbGxiYWNrXHRUaGUgbGlzdGVuZXIgZnVuY3Rpb24gdG8gYmUgcmVtb3ZlZC5cblx0ICovXG5cdHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgY2FsbGJhY2spXG5cdHtcblx0XHRjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNCeUV2ZW50W2V2dFR5cGVdO1xuXG5cdFx0aWYgKGxpc3RlbmVycylcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKylcblx0XHRcdHtcblx0XHRcdFx0aWYgKGxpc3RlbmVyc1tpXS5jYWxsYmFjayA9PT0gY2FsbGJhY2spXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZGlzcGF0Y2hFdmVudChldnRUeXBlLCBldnRPYmopXG5cdHtcblx0XHRjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9saXN0ZW5lcnNCeUV2ZW50W2V2dFR5cGVdO1xuXG5cdFx0aWYgKGxpc3RlbmVycylcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpXG5cdFx0XHRcdGxpc3RlbmVyLmNhbGxiYWNrLmNhbGwobGlzdGVuZXIuc2NvcGUsIGV2dE9iaik7XG5cdFx0fVxuXHR9XG59XG4iLCJleHBvcnQgY29uc3QgQ29ubmVjdGlvbk1hbmFnZXJFdmVudCA9IE9iamVjdC5mcmVlemUoe1xuXHRDT05ORUNUSU9OOiAnY29ubmVjdGlvbicsXG5cdExPR0lOOiAnbG9naW4nLFxuXHRESVNDT05ORUNUSU9OOiAnZGlzY29ubmVjdGlvbicsXG5cdEVSUk9SOiAnZXJyb3InLFxuXHRTRVJWRVJfRVJST1I6ICdzZXJ2ZXJFcnJvcicsXG59KTtcblxuZXhwb3J0IGNvbnN0IE1vZHVsZU1hbmFnZXJFdmVudCA9IE9iamVjdC5mcmVlemUoe1xuXHRNT0RVTEVfTE9BREVEOiAnbW9kdWxlLWxvYWRlZCcsXG5cdE1PRFVMRV9MT0FEX0VSUk9SOiAnbW9kdWxlLWxvYWQtZXJyb3InLFxufSk7XG4iLCJleHBvcnQgY29uc3QgdG9LZWJhYkNhc2UgPSAoc3RyKSA9PlxuICBzdHIgJiZcbiAgc3RyXG4gICAgLm1hdGNoKC9bQS1aXXsyLH0oPz1bQS1aXVthLXpdK1swLTldKnxcXGIpfFtBLVpdP1thLXpdK1swLTldKnxbQS1aXXxbMC05XSsvZylcbiAgICAubWFwKHggPT4geC50b0xvd2VyQ2FzZSgpKVxuICAgIC5qb2luKCctJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBieXRlc1RvU2l6ZShieXRlcywgZGVjaW1hbHMgPSAxLCB6ZXJvVW5pdCA9ICcnLCBzdWZmaXggPSAnJykge1xuXHRpZiAoYnl0ZXMgPT09IDApXG5cdFx0cmV0dXJuICcwICcgKyB6ZXJvVW5pdCArICh6ZXJvVW5pdCAhPSAnJyA/IHN1ZmZpeCA6ICcnKTtcblxuXHRpZiAoYnl0ZXMgPCAxKSAvLyBDYW4gaGFwcGVuIGluIGNoYXJ0IGF4aXMgbGFiZWxzIVxuXHQgXHRyZXR1cm4gYCR7Ynl0ZXN9IEJ5dGVzJHtzdWZmaXh9YDtcblxuICAgIGNvbnN0IGsgPSAxMDAwO1xuICAgIGNvbnN0IGRtID0gZGVjaW1hbHMgPCAwID8gMCA6IGRlY2ltYWxzO1xuICAgIGNvbnN0IHNpemVzID0gWydCeXRlcycsICdLQicsICdNQicsICdHQicsICdUQicsICdQQicsICdFQicsICdaQicsICdZQiddO1xuXG4gICAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coaykpO1xuXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvRml4ZWQoZG0pKSArICcgJyArIHNpemVzW2ldICsgc3VmZml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga0J5dGVzVG9TaXplKGtCeXRlcywgZGVjaW1hbHMgPSAxLCB6ZXJvVW5pdCA9ICcnLCBzdWZmaXggPSAnJykge1xuXHRyZXR1cm4gYnl0ZXNUb1NpemUoa0J5dGVzICogMTAwMCwgZGVjaW1hbHMsIHplcm9Vbml0LCBzdWZmaXgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FwaXRhbGl6ZUZpcnN0KHN0cmluZykge1xuXHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQ2xhc3NOYW1lKGVsZW1lbnQsIGluZGV4LCBhcnJheSlcbntcblx0aWYgKGVsZW1lbnQuZW5kc1dpdGgoJy5weScpKVxuXHRcdHJldHVybiAoZWxlbWVudC5lbmRzV2l0aCgnRXh0ZW5zaW9uLnB5JykpO1xuXHRlbHNlIGlmIChlbGVtZW50LmVuZHNXaXRoKCcuanMnKSlcblx0XHRyZXR1cm4gKGVsZW1lbnQuZW5kc1dpdGgoJ0V4dGVuc2lvbi5qcycpKTtcblx0ZWxzZVxuXHRcdHJldHVybiAoZWxlbWVudC5lbmRzV2l0aCgnRXh0ZW5zaW9uJykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmRUb0RlY2ltYWxzKHZhbHVlLCBkZWNpbWFscykge1xuICByZXR1cm4gTnVtYmVyKE1hdGgucm91bmQodmFsdWUgKyAnZScgKyBkZWNpbWFscykgKyAnZS0nICsgZGVjaW1hbHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2NhbGVCeXRlcyhieXRlcywgZGVjaW1hbHMgPSAxKSB7XG5cdGxldCBvYmogPSB7fTtcblxuXHRjb25zdCBzaXplcyA9IFsnQnl0ZXMnLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInLCAnWkInLCAnWUInXTtcblxuXHRpZiAoYnl0ZXMgPiAwKVxuXHR7XG5cdFx0Y29uc3QgayA9IDEwMDA7XG5cdFx0Y29uc3QgZG0gPSBkZWNpbWFscyA8IDAgPyAwIDogZGVjaW1hbHM7XG5cdFx0Y29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coaykpO1xuXG5cdFx0b2JqLnZhbHVlID0gcGFyc2VGbG9hdCgoYnl0ZXMgLyBNYXRoLnBvdyhrLCBpKSkudG9GaXhlZChkbSkpO1xuXHRcdG9iai51bml0ID0gc2l6ZXNbaV07XG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0b2JqLnZhbHVlID0gMDtcblx0XHRvYmoudW5pdCA9IHNpemVzWzBdO1xuXHR9XG5cblx0cmV0dXJuIG9iajtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDck1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2hNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6T0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdkdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4TEE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==