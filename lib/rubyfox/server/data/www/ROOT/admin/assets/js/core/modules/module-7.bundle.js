/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-7"],{

/***/ "./node_modules/file-saver/dist/FileSaver.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/file-saver/dist/FileSaver.min.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(a,b){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a, true&&(module.exports=a)});

//# sourceMappingURL=FileSaver.min.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/data/command-history.js":
/*!*************************************!*\
  !*** ./src/data/command-history.js ***!
  \*************************************/
/*! exports provided: CommandHistory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandHistory", function() { return CommandHistory; });
class CommandHistory
{
	constructor(size = 50)
	{
		this._size = size;

		// TODO
		// As the history is saved in cookies, and they are now limited to 4 KB size,
		// this class should be updated to remove entries based on the total size,
		// and not on the total number of items anymore

		this.clear();
		this._loadState();
	}

	addCommand(cmd)
	{
		if (this._history.length >= this._size)
			this._history.splice(0, 1);

		this._history.push(cmd);
		this._pos = this._history.length;
		this._tempCmd = '';

		this._saveState();
	}

	addTempCommand(cmd)
	{
		this._tempCmd = cmd;
		this._pos = this._history.length;
	}

	rewind()
	{
		if (this._pos > 0)
			this._pos--;

		return this._history[this._pos];
	}

	forward()
	{
		if (this._pos < this._history.length)
			this._pos++;

		if (this._pos <= this._history.length - 1)
			return this._history[this._pos];
		else
			return this._tempCmd;
	}

	getList()
	{
		return this._history;
	}

	getSize()
	{
		return this._history.length
	}

	clear()
	{
		this._history = [];
		this._pos = 0;
		this._tempCmd = '';
	}

	_saveState()
	{
		Cookies.set('console-history', {
			history: this._history
		}, {expires: 36000});
	}

	_loadState()
	{
		let data = Cookies.getJSON('console-history')

		if (data)
		{
			this._history = data.history;
			this._pos = this._history.length;
		}
	}
}


/***/ }),

/***/ "./src/modules/console.js":
/*!********************************!*\
  !*** ./src/modules/console.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Console; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _data_command_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/command-history */ "./src/data/command-history.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");






class Console extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('console');

		// Outgoing requests
		this.REQ_CMD = 'cmd';
		this.REQ_HINT = 'hint';
		this.REQ_SCRIPT = 'script';

		// Incoming responses
		this.RES_CMD = 'cmd';
		this.RES_HINT = 'hint';
		this.RES_SCRIPT = 'script';
		this.RES_ERROR_LOCKED = 'locked';

		this.VERSION = '3.0.0';
		this.TOKENS = ['=', 'from ', 'import '];

		this.TRANSCRIPT_TEMPLATE = `
		<html>
		<head>
			<title>SFS2X ADMIN CONSOLE Session Transcript</title>
			<style type='text/css' media='screen'>
				body, pre {
					background-color: #333;
					font-size: .8rem;
					font-family: Monaco,'Courier New', monospace;
				}

				h3 {
					color: #f8f9fa;
				}

				pre {
					white-space: pre-wrap;
					-moz-tab-size: 5;
					tab-size: 5;
				}

				.text-console {
					color: #28F32D;
				}

				.text-error {
					color: #dc3545;
				}

				.text-highlight {
					color: #ffc107;
				}

				.text-command {
					color: #f8f9fa;
				}
			</style>
		</head>
		<body>
			<h3><!--HEADER--></h3>
			<pre><!--TRANSCRIPT--></pre>
		</body>
		</html>
		`;

		this._cmdHistory = new _data_command_history__WEBPACK_IMPORTED_MODULE_1__["CommandHistory"]();
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

		$('#cns-input').on('keyup', $.proxy(this.onInputKeyUp, this));
		$('#cns-input').on('keydown', $.proxy(this.onInputKeyDown, this));

		// Show welcome message
		this._showWelcomeMessage();

		// Focus on prompt input
		$('#cns-input').focus();

		// Add global click listener to close hint panel
		$(this).on('click', $.proxy(this._onGenericClick, this));

		// Add global window resize listener to close hint panel
		$(window).on('resize', $.proxy(this._onGenericClick, this));

		// Add buttons click listeners
		$('#cns-clearButton').on('click', $.proxy(this._onClearConsoleClick, this));
		$('#cns-runButton').on('click', $.proxy(this._onRunScriptClick, this));
		$('#cns-exportButton').on('click', $.proxy(this._onExportSessionClick, this));

		// Initialize "upload script" modal
		this._uploadScriptModal = $('#cns-uploadModal');
		this._uploadScriptModal.modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});

		// Initialize kendo uploader
		this._uploader = $('#cns-uploader').kendoUpload({
			allowedExtensions: ['.py'],
			multiple: false,
			template: function(dataItem) {
				dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_4__["bytesToSize"]; // Pass bytesToSize utility function to template
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

		// Add listener to modal hide event
		this._uploadScriptModal.on('hidden.bs.modal', $.proxy(this._onUploadScriptrModalHidden, this));

		// Add listener to modal button
		$('#cns-uploadScriptButton').on('click', $.proxy(this._onUploadScriptrButtonCLick, this));
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#cns-clearButton').off('click');
		$('#cns-runButton').off('click');
		$('#cns-exportButton').off('click');
		$('#cns-uploadScriptButton').off('click');

		$(this).off('click');
		$(window).off('resize');

		this._uploadScriptModal.off('hidden.bs.modal');
		this._uploadScriptModal.modal('dispose');
	}

	onExtensionCommand(command, data)
	{
		if (command == this.RES_CMD || command == this.RES_SCRIPT)
		{
			const result = data.getUtfString('r');
			const error = data.getUtfString('e');

			if (result != null)
				this._writeConsole(result);
			else if (error != null)
				this._writeConsole(`<span class="text-error">ERROR</span> ${this._parseHtml(error)}`);
		}

		else if (command == this.RES_HINT)
		{
			this._lastHints = data.getUtfStringArray('h');

			this._showHintPanel();
		}

		else if (command == this.RES_ERROR_LOCKED)
		{
			this._writeConsole(`<span class="text-error">ERROR</span> <span class="text-highlight">Console module is locked from server side. Please follow the instructions you were given to unlock it.</span>`);
		}
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	onInputKeyDown(e)
	{
		// Save previous input value
		this._prevInput = $('#cns-input').val();

		const keyName = e.key;

		if (keyName == 'ArrowUp' || keyName == 'ArrowDown' || keyName == 'Tab')
		{
			e.preventDefault();
		}
	}

	onInputKeyUp(e)
	{
		const keyName = e.key;
		const input = $('#cns-input').val();

		// Copy input to dummy
		$('#cns-input-dummy').html(input);

		//--- DOT (CODE HINTING) -----------------------------------------------
		if (keyName == '.')
		{
			// Close hint panel if open
			if (this._isHintPanelOpen)
				this._closeHintPanel();

			// Request code hints
			this._requestHints(input);
		}

		//--- ENTER ------------------------------------------------------------
		else if	(keyName == 'Enter' && input.length > 0)
		{
			// Get selected hint
			if (this._isHintPanelOpen)
			{
				if (this._hintPanel.find('.hint-item.selected').length > 0)
					this._setInputOnHintSelected();
			}
			else
			{
				// Send command to server
				let sfso = new SFS2X.SFSObject();
				sfso.putUtfString('c', input);
				this.sendExtensionRequest(this.REQ_CMD, sfso);

				// Write command to console
				this._writeConsole(input, true);

				// Clear hints
				this._lastHints = null;

				// Clear input
				this._clearInput();

				// Add command to history
				this._cmdHistory.addCommand(input);
			}
		}

		//--- ENTER ------------------------------------------------------------
		else if	(keyName == 'Tab')
		{
			// Get selected hint
			if (this._isHintPanelOpen)
			{
				if (this._hintPanel.find('.hint-item.selected').length > 0)
					this._setInputOnHintSelected();
			}
		}

		//--- CTRL+BACKSPACE (CLEAR CONSOLE) -----------------------------------
		else if (e.ctrlKey && keyName == 'Backspace')
		{
			this._onClearConsoleClick();
		}

		//--- BACKSPACE ------------------------------------------------------
		else if (keyName == 'Backspace')
		{
			// Check the deleted char
			if (this._prevInput.substring(this._prevInput.length - 1) == '.')
			{
				// Reset hinting
				this._resetHinting(input);
			}

			// Update hint panel if open
			if (this._isHintPanelOpen)
				this._updateHintPanel();
		}

		//--- ESC (CLEAR) ------------------------------------------------------
		else if (keyName == 'Escape')
		{
			// Close hint panel if open
			if (this._isHintPanelOpen)
				this._closeHintPanel();

			else
			{
				// Clear hints
				this._lastHints = null;

				// Clear input
				this._clearInput();
			}
		}

		//--- ARROW UP ---------------------------------------------------------
		else if (keyName == 'ArrowUp')
		{
			// If hint panel is open, set selection
			if (this._isHintPanelOpen)
			{
				this._currHintFocus--;

				this._setHintItemSelected();
			}

			// Browse history
			else
			{
				this._setInputOnHistorySelected(this._cmdHistory.rewind());
			}
		}

		//--- ARROW DOWN -------------------------------------------------------
		else if (keyName == 'ArrowDown')
		{
			// If hint panel is open, set selection
			if (this._isHintPanelOpen)
			{
				this._currHintFocus++;

				this._setHintItemSelected();
			}

			// Browse history
			else
			{
				this._setInputOnHistorySelected(this._cmdHistory.forward());
			}
		}

		//--- ARROW LEFT & RIGHT -----------------------------------------------
		else if (keyName == 'ArrowLeft' || keyName == 'ArrowRight')
		{
			// Close hint panel if open
			if (this._isHintPanelOpen)
				this._closeHintPanel();
		}

		//--- ANY OTHER KEY ----------------------------------------------------
		else
		{
			// Update temp in command history
			this._cmdHistory.addTempCommand(input);

			if (input.length == $('#cns-input')[0].selectionEnd)
			{
				// Update hint panel if open
				if (this._isHintPanelOpen)
					this._updateHintPanel();

				// Show hint panel
				else
					this._showHintPanel();
			}
			else
			{
				// Reset hinting
				this._resetHinting(input);
			}
		}
	}

	_onClearConsoleClick()
	{
		$('#cns-console').empty();
	}

	_onHintItemClick(e)
	{
		e.preventDefault();

		// Set clicked item as selected
		e.currentTarget.classList.add('selected');

		// Set input value
		this._setInputOnHintSelected();

		// Focus on prompt input
		$('#cns-input').focus();
	}

	_onGenericClick()
	{
		// Close hint panel if open
		if (this._isHintPanelOpen)
			this._closeHintPanel();
	}

	_onExportSessionClick()
	{
		let date = moment__WEBPACK_IMPORTED_MODULE_3__();

		let transcript = this.TRANSCRIPT_TEMPLATE.replace('<!--HEADER-->', `Saved on ${date.format('dddd, MMMM Do YYYY, HH:mm:ss')}`);
		transcript = transcript.replace('<!--TRANSCRIPT-->', $('#cns-console').html());

		let blob = new Blob([transcript], {type: 'text/html;charset=utf-8'});

		file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, `ConsoleSession_${date.format('YYYYMMDD_HHmmss')}.html`);
	}

	_onRunScriptClick()
	{
		// Open modal
		this._uploadScriptModal.modal('show');
	}

	_onUploadScriptrModalHidden()
	{
		// Clear uploader
		this._uploader.clearAllFiles();
	}

	_onUploadScriptrButtonCLick()
	{
		if (this._uploader.getFiles().length > 0)
		{
			let file = this._uploader.getFiles()[0].rawFile;

			file.arrayBuffer().then(buffer => {
				this._writeConsole(`EXEC: ${file.name}`, true);

				let sfso = new SFS2X.SFSObject();
				sfso.putByteArray('script', new Uint8Array(buffer));

				this.sendExtensionRequest(this.REQ_SCRIPT, sfso);
			});

			// Close modal
			this._uploadScriptModal.modal('hide');
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_showWelcomeMessage()
	{
		this._writeConsole(`--------------------------------------\nADMIN_CONSOLE, version ${this.VERSION}\n--------------------------------------\nType help() for assistance.\n`, false, false);
	}

	_clearInput()
	{
		$('#cns-input').val('');
		$('#cns-input-dummy').html('');
	}

	_setInputOnHintSelected()
	{
		if (this._hintPanel)
		{
			const input = $('#cns-input').val();
			const selectedVal = this._hintPanel.find('.hint-item.selected input').val();
			const newInput = input.substring(0, input.lastIndexOf('.')) + '.' + selectedVal;

			$('#cns-input').val(newInput);
			$('#cns-input-dummy').html(newInput);

			this._closeHintPanel();
		}
	}

	_setInputOnHistorySelected(command)
	{
		$('#cns-input').val(command);
		$('#cns-input-dummy').html(command);
	}

	_writeConsole(txt, isInput = false, linebreak = true)
	{
		let msg;

		if (isInput)
			msg = `<span class="text-command">&gt; ${txt}</span>`;
		else
			msg = `<span class="text-console">${txt}</span>`;

		if (linebreak)
			msg = `\n${msg}`;

		// Append text to console
		$('#cns-console').append(msg);

		// scroll console to bottom
		$('#cns-console').scrollTop(function() { return this.scrollHeight; });
	}

	_parseHtml(ss)
	{
		ss = ss.replace('<', '&lt;');
		ss = ss.replace('>', '&gt;');

		return ss;
	}

	_showHintPanel()
	{
		if (this._lastHints != null && this._lastHints.length > 0)
		{
			this._currHintFocus = -1;

			// Create panel
			this._hintPanel = $('<div>', {'class': 'hint-panel'});
			$(this).append(this._hintPanel);

			// Show hints
			this._updateHintPanel();
		}
	}

	_closeHintPanel()
	{
		this._hintPanel.remove();
		this._hintPanel = null;
	}

	_updateHintPanel()
	{
		if (this._lastHints != null && this._lastHints.length > 0)
		{
			// Clear hints panel
			this._hintPanel.empty();

			const dotIndex = $('#cns-input').val().lastIndexOf('.');
			let lastWord = '';

			if (dotIndex > -1)
				lastWord = $('#cns-input').val().substr(dotIndex + 1, $('#cns-input').val().length);

			let isEmpty = true;

			for (let word of this._lastHints)
			{
				// Check if the item starts with the same letters as the input's last word
				if (lastWord == '' || word.substr(0, lastWord.length).toUpperCase() == lastWord.toUpperCase())
				{
					// Create div
					let item = $('<div>', {'class': 'hint-item'});

					// Show value, and make the matching letters bold
					item.append(`<strong>${word.substr(0, lastWord.length)}</strong>${word.substr(lastWord.length)}`);

					// Insert an input field that will hold the current item's value
					item.append(`<input type="hidden" value="${word}">`);

					// Add click listener
					item.on('click', $.proxy(this._onHintItemClick, this));

					this._hintPanel.append(item);

					isEmpty = false;
				}
			}

			// If panel is empty, remove it
			if (isEmpty)
				this._closeHintPanel();

			// Else set panel position
			else
			{
				const extContPos = $('#cns-input-container-2').position();
				const intContPos = $('#cns-input-container-1').position();

				let left = extContPos.left + intContPos.left + $('#cns-input-dummy').outerWidth();
				let top = extContPos.top + intContPos.top - this._hintPanel.outerHeight();

				if (left > window.innerWidth - this._hintPanel.outerWidth())
					left = window.innerWidth - this._hintPanel.outerWidth();

				this._hintPanel.css({top: top, left: left, position: 'absolute'});

				// Select first item
				this._currHintFocus = 0;
				this._setHintItemSelected();
			}
		}
	}

	_requestHints(input)
	{
		// Clear previous hints
		this._lastHints = null;

		// Parse input
		let hintParent = this._extractHintParent(input);

		// Request code hint
		let params = new SFS2X.SFSObject();
		params.putUtfString('c', hintParent);

		this.sendExtensionRequest(this.REQ_HINT, params);
	}

	_extractHintParent(inVal)
	{
		let outVal = null;

		for (let tok of this.TOKENS)
		{
			const p = inVal.indexOf(tok);

			if (p > -1)
			{
				outVal = inVal.substring(p + tok.length, inVal.length).trim();
				break;
			}
		}

		if (outVal == null)
			outVal = inVal;

		// Remove dot at the end if needed
		if (outVal.endsWith('.'))
			outVal = outVal.substr(0, outVal.length - 1);

		return outVal;
	}

	_setHintItemSelected()
	{
		let items = this._hintPanel.find('.hint-item');
		items.removeClass('selected');

		if (this._currHintFocus >= items.length)
			this._currHintFocus = 0;

    	if (this._currHintFocus < 0)
			this._currHintFocus = items.length - 1;

		let item = items.eq(this._currHintFocus);
		item.addClass('selected');

		// Scroll to item
		this._hintPanel.scrollTop(this._hintPanel.scrollTop() + item.position().top);
	}

	_resetHinting(input)
	{
		// Close hint panel
		if (this._isHintPanelOpen)
			this._closeHintPanel();

		// Clear hints
		this._lastHints = null;

		// Get previous word
		const dotIndex = input.lastIndexOf('.');

		if (dotIndex > -1)
		{
			let value = input.substring(0, dotIndex);

			// Request code hints
			this._requestHints(value);
		}
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------

	get _isHintPanelOpen()
	{
		return this._hintPanel != null;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtNy5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL25vZGVfbW9kdWxlcy9maWxlLXNhdmVyL2Rpc3QvRmlsZVNhdmVyLm1pbi5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvZGF0YS9jb21tYW5kLWhpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9jb25zb2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhiLGMsZCl7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2Uub3BlbihcIkdFVFwiLGIpLGUucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGUub25sb2FkPWZ1bmN0aW9uKCl7YShlLnJlc3BvbnNlLGMsZCl9LGUub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZS5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYSxiLGQsZSl7aWYoZT1lfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZSYmKGUuZG9jdW1lbnQudGl0bGU9ZS5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBhKXJldHVybiBjKGEsYixkKTt2YXIgZz1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09YS50eXBlLGg9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaT0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGl8fGcmJmgpJiZcIm9iamVjdFwiPT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGo9bmV3IEZpbGVSZWFkZXI7ai5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1qLnJlc3VsdDthPWk/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZT9lLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGU9bnVsbH0sai5yZWFkQXNEYXRhVVJMKGEpfWVsc2V7dmFyIGs9Zi5VUkx8fGYud2Via2l0VVJMLGw9ay5jcmVhdGVPYmplY3RVUkwoYSk7ZT9lLmxvY2F0aW9uPWw6bG9jYXRpb24uaHJlZj1sLGU9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ay5yZXZva2VPYmplY3RVUkwobCl9LDRFNCl9fSk7Zi5zYXZlQXM9YS5zYXZlQXM9YSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9YSl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJleHBvcnQgY2xhc3MgQ29tbWFuZEhpc3Rvcnlcbntcblx0Y29uc3RydWN0b3Ioc2l6ZSA9IDUwKVxuXHR7XG5cdFx0dGhpcy5fc2l6ZSA9IHNpemU7XG5cblx0XHQvLyBUT0RPXG5cdFx0Ly8gQXMgdGhlIGhpc3RvcnkgaXMgc2F2ZWQgaW4gY29va2llcywgYW5kIHRoZXkgYXJlIG5vdyBsaW1pdGVkIHRvIDQgS0Igc2l6ZSxcblx0XHQvLyB0aGlzIGNsYXNzIHNob3VsZCBiZSB1cGRhdGVkIHRvIHJlbW92ZSBlbnRyaWVzIGJhc2VkIG9uIHRoZSB0b3RhbCBzaXplLFxuXHRcdC8vIGFuZCBub3Qgb24gdGhlIHRvdGFsIG51bWJlciBvZiBpdGVtcyBhbnltb3JlXG5cblx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0dGhpcy5fbG9hZFN0YXRlKCk7XG5cdH1cblxuXHRhZGRDb21tYW5kKGNtZClcblx0e1xuXHRcdGlmICh0aGlzLl9oaXN0b3J5Lmxlbmd0aCA+PSB0aGlzLl9zaXplKVxuXHRcdFx0dGhpcy5faGlzdG9yeS5zcGxpY2UoMCwgMSk7XG5cblx0XHR0aGlzLl9oaXN0b3J5LnB1c2goY21kKTtcblx0XHR0aGlzLl9wb3MgPSB0aGlzLl9oaXN0b3J5Lmxlbmd0aDtcblx0XHR0aGlzLl90ZW1wQ21kID0gJyc7XG5cblx0XHR0aGlzLl9zYXZlU3RhdGUoKTtcblx0fVxuXG5cdGFkZFRlbXBDb21tYW5kKGNtZClcblx0e1xuXHRcdHRoaXMuX3RlbXBDbWQgPSBjbWQ7XG5cdFx0dGhpcy5fcG9zID0gdGhpcy5faGlzdG9yeS5sZW5ndGg7XG5cdH1cblxuXHRyZXdpbmQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3BvcyA+IDApXG5cdFx0XHR0aGlzLl9wb3MtLTtcblxuXHRcdHJldHVybiB0aGlzLl9oaXN0b3J5W3RoaXMuX3Bvc107XG5cdH1cblxuXHRmb3J3YXJkKClcblx0e1xuXHRcdGlmICh0aGlzLl9wb3MgPCB0aGlzLl9oaXN0b3J5Lmxlbmd0aClcblx0XHRcdHRoaXMuX3BvcysrO1xuXG5cdFx0aWYgKHRoaXMuX3BvcyA8PSB0aGlzLl9oaXN0b3J5Lmxlbmd0aCAtIDEpXG5cdFx0XHRyZXR1cm4gdGhpcy5faGlzdG9yeVt0aGlzLl9wb3NdO1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiB0aGlzLl90ZW1wQ21kO1xuXHR9XG5cblx0Z2V0TGlzdCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGlzdG9yeTtcblx0fVxuXG5cdGdldFNpemUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2hpc3RvcnkubGVuZ3RoXG5cdH1cblxuXHRjbGVhcigpXG5cdHtcblx0XHR0aGlzLl9oaXN0b3J5ID0gW107XG5cdFx0dGhpcy5fcG9zID0gMDtcblx0XHR0aGlzLl90ZW1wQ21kID0gJyc7XG5cdH1cblxuXHRfc2F2ZVN0YXRlKClcblx0e1xuXHRcdENvb2tpZXMuc2V0KCdjb25zb2xlLWhpc3RvcnknLCB7XG5cdFx0XHRoaXN0b3J5OiB0aGlzLl9oaXN0b3J5XG5cdFx0fSwge2V4cGlyZXM6IDM2MDAwfSk7XG5cdH1cblxuXHRfbG9hZFN0YXRlKClcblx0e1xuXHRcdGxldCBkYXRhID0gQ29va2llcy5nZXRKU09OKCdjb25zb2xlLWhpc3RvcnknKVxuXG5cdFx0aWYgKGRhdGEpXG5cdFx0e1xuXHRcdFx0dGhpcy5faGlzdG9yeSA9IGRhdGEuaGlzdG9yeTtcblx0XHRcdHRoaXMuX3BvcyA9IHRoaXMuX2hpc3RvcnkubGVuZ3RoO1xuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcbmltcG9ydCB7Q29tbWFuZEhpc3Rvcnl9IGZyb20gJy4uL2RhdGEvY29tbWFuZC1oaXN0b3J5JztcbmltcG9ydCAqIGFzIEZpbGVTYXZlciBmcm9tICdmaWxlLXNhdmVyJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHtieXRlc1RvU2l6ZX0gZnJvbSAnLi4vdXRpbHMvdXRpbGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uc29sZSBleHRlbmRzIEJhc2VNb2R1bGVcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcignY29uc29sZScpO1xuXG5cdFx0Ly8gT3V0Z29pbmcgcmVxdWVzdHNcblx0XHR0aGlzLlJFUV9DTUQgPSAnY21kJztcblx0XHR0aGlzLlJFUV9ISU5UID0gJ2hpbnQnO1xuXHRcdHRoaXMuUkVRX1NDUklQVCA9ICdzY3JpcHQnO1xuXG5cdFx0Ly8gSW5jb21pbmcgcmVzcG9uc2VzXG5cdFx0dGhpcy5SRVNfQ01EID0gJ2NtZCc7XG5cdFx0dGhpcy5SRVNfSElOVCA9ICdoaW50Jztcblx0XHR0aGlzLlJFU19TQ1JJUFQgPSAnc2NyaXB0Jztcblx0XHR0aGlzLlJFU19FUlJPUl9MT0NLRUQgPSAnbG9ja2VkJztcblxuXHRcdHRoaXMuVkVSU0lPTiA9ICczLjAuMCc7XG5cdFx0dGhpcy5UT0tFTlMgPSBbJz0nLCAnZnJvbSAnLCAnaW1wb3J0ICddO1xuXG5cdFx0dGhpcy5UUkFOU0NSSVBUX1RFTVBMQVRFID0gYFxuXHRcdDxodG1sPlxuXHRcdDxoZWFkPlxuXHRcdFx0PHRpdGxlPlNGUzJYIEFETUlOIENPTlNPTEUgU2Vzc2lvbiBUcmFuc2NyaXB0PC90aXRsZT5cblx0XHRcdDxzdHlsZSB0eXBlPSd0ZXh0L2NzcycgbWVkaWE9J3NjcmVlbic+XG5cdFx0XHRcdGJvZHksIHByZSB7XG5cdFx0XHRcdFx0YmFja2dyb3VuZC1jb2xvcjogIzMzMztcblx0XHRcdFx0XHRmb250LXNpemU6IC44cmVtO1xuXHRcdFx0XHRcdGZvbnQtZmFtaWx5OiBNb25hY28sJ0NvdXJpZXIgTmV3JywgbW9ub3NwYWNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aDMge1xuXHRcdFx0XHRcdGNvbG9yOiAjZjhmOWZhO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cHJlIHtcblx0XHRcdFx0XHR3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG5cdFx0XHRcdFx0LW1vei10YWItc2l6ZTogNTtcblx0XHRcdFx0XHR0YWItc2l6ZTogNTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC50ZXh0LWNvbnNvbGUge1xuXHRcdFx0XHRcdGNvbG9yOiAjMjhGMzJEO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LnRleHQtZXJyb3Ige1xuXHRcdFx0XHRcdGNvbG9yOiAjZGMzNTQ1O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0LnRleHQtaGlnaGxpZ2h0IHtcblx0XHRcdFx0XHRjb2xvcjogI2ZmYzEwNztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC50ZXh0LWNvbW1hbmQge1xuXHRcdFx0XHRcdGNvbG9yOiAjZjhmOWZhO1xuXHRcdFx0XHR9XG5cdFx0XHQ8L3N0eWxlPlxuXHRcdDwvaGVhZD5cblx0XHQ8Ym9keT5cblx0XHRcdDxoMz48IS0tSEVBREVSLS0+PC9oMz5cblx0XHRcdDxwcmU+PCEtLVRSQU5TQ1JJUFQtLT48L3ByZT5cblx0XHQ8L2JvZHk+XG5cdFx0PC9odG1sPlxuXHRcdGA7XG5cblx0XHR0aGlzLl9jbWRIaXN0b3J5ID0gbmV3IENvbW1hbmRIaXN0b3J5KCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDT01NT04gTU9EVUxFIElOVEVSRkFDRSBNRVRIT0RTXG5cdC8vIFRoaXMgbWVtYmVycyBhcmUgdXNlZCBieSB0aGUgbWFpbiBjb250cm9sbGVyXG5cdC8vIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIG1vZHVsZSdzIGNvbnRyb2xsZXIuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0aW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcilcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcik7XG5cblx0XHQkKCcjY25zLWlucHV0Jykub24oJ2tleXVwJywgJC5wcm94eSh0aGlzLm9uSW5wdXRLZXlVcCwgdGhpcykpO1xuXHRcdCQoJyNjbnMtaW5wdXQnKS5vbigna2V5ZG93bicsICQucHJveHkodGhpcy5vbklucHV0S2V5RG93biwgdGhpcykpO1xuXG5cdFx0Ly8gU2hvdyB3ZWxjb21lIG1lc3NhZ2Vcblx0XHR0aGlzLl9zaG93V2VsY29tZU1lc3NhZ2UoKTtcblxuXHRcdC8vIEZvY3VzIG9uIHByb21wdCBpbnB1dFxuXHRcdCQoJyNjbnMtaW5wdXQnKS5mb2N1cygpO1xuXG5cdFx0Ly8gQWRkIGdsb2JhbCBjbGljayBsaXN0ZW5lciB0byBjbG9zZSBoaW50IHBhbmVsXG5cdFx0JCh0aGlzKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uR2VuZXJpY0NsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBBZGQgZ2xvYmFsIHdpbmRvdyByZXNpemUgbGlzdGVuZXIgdG8gY2xvc2UgaGludCBwYW5lbFxuXHRcdCQod2luZG93KS5vbigncmVzaXplJywgJC5wcm94eSh0aGlzLl9vbkdlbmVyaWNDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGJ1dHRvbnMgY2xpY2sgbGlzdGVuZXJzXG5cdFx0JCgnI2Nucy1jbGVhckJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25DbGVhckNvbnNvbGVDbGljaywgdGhpcykpO1xuXHRcdCQoJyNjbnMtcnVuQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblJ1blNjcmlwdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2Nucy1leHBvcnRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRXhwb3J0U2Vzc2lvbkNsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIFwidXBsb2FkIHNjcmlwdFwiIG1vZGFsXG5cdFx0dGhpcy5fdXBsb2FkU2NyaXB0TW9kYWwgPSAkKCcjY25zLXVwbG9hZE1vZGFsJyk7XG5cdFx0dGhpcy5fdXBsb2FkU2NyaXB0TW9kYWwubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdFx0c2hvdzogZmFsc2Vcblx0XHR9KTtcblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdXBsb2FkZXJcblx0XHR0aGlzLl91cGxvYWRlciA9ICQoJyNjbnMtdXBsb2FkZXInKS5rZW5kb1VwbG9hZCh7XG5cdFx0XHRhbGxvd2VkRXh0ZW5zaW9uczogWycucHknXSxcblx0XHRcdG11bHRpcGxlOiBmYWxzZSxcblx0XHRcdHRlbXBsYXRlOiBmdW5jdGlvbihkYXRhSXRlbSkge1xuXHRcdFx0XHRkYXRhSXRlbS5ieXRlc1RvU2l6ZSA9IGJ5dGVzVG9TaXplOyAvLyBQYXNzIGJ5dGVzVG9TaXplIHV0aWxpdHkgZnVuY3Rpb24gdG8gdGVtcGxhdGVcblx0XHRcdFx0cmV0dXJuIGtlbmRvLnRlbXBsYXRlKGBcblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz0nay1wcm9ncmVzcyB3LTEwMCc+PC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiXCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstZmlsZS1uYW1lXCIgdGl0bGU9XCIjPW5hbWUjXCI+Iz1uYW1lIzwvc3Bhbj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1maWxlLXNpemVcIj5TaXplOiAjPWJ5dGVzVG9TaXplKHNpemUsIDEsICdCeXRlcycpIzwvc3Bhbj5cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdGApKGRhdGFJdGVtKTtcblx0XHRcdH0sXG5cdCAgICAgICAgbG9jYWxpemF0aW9uOiB7XG5cdCAgICAgICAgICAgIHNlbGVjdDogJ1NlbGVjdCBmaWxlLi4uJ1xuXHQgICAgICAgIH1cblx0XHR9KS5kYXRhKCdrZW5kb1VwbG9hZCcpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIG1vZGFsIGhpZGUgZXZlbnRcblx0XHR0aGlzLl91cGxvYWRTY3JpcHRNb2RhbC5vbignaGlkZGVuLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLl9vblVwbG9hZFNjcmlwdHJNb2RhbEhpZGRlbiwgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIG1vZGFsIGJ1dHRvblxuXHRcdCQoJyNjbnMtdXBsb2FkU2NyaXB0QnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vblVwbG9hZFNjcmlwdHJCdXR0b25DTGljaywgdGhpcykpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdCQoJyNjbnMtY2xlYXJCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nucy1ydW5CdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nucy1leHBvcnRCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2Nucy11cGxvYWRTY3JpcHRCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHQkKHRoaXMpLm9mZignY2xpY2snKTtcblx0XHQkKHdpbmRvdykub2ZmKCdyZXNpemUnKTtcblxuXHRcdHRoaXMuX3VwbG9hZFNjcmlwdE1vZGFsLm9mZignaGlkZGVuLmJzLm1vZGFsJyk7XG5cdFx0dGhpcy5fdXBsb2FkU2NyaXB0TW9kYWwubW9kYWwoJ2Rpc3Bvc2UnKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNfQ01EIHx8IGNvbW1hbmQgPT0gdGhpcy5SRVNfU0NSSVBUKVxuXHRcdHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdyJyk7XG5cdFx0XHRjb25zdCBlcnJvciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdlJyk7XG5cblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fd3JpdGVDb25zb2xlKHJlc3VsdCk7XG5cdFx0XHRlbHNlIGlmIChlcnJvciAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl93cml0ZUNvbnNvbGUoYDxzcGFuIGNsYXNzPVwidGV4dC1lcnJvclwiPkVSUk9SPC9zcGFuPiAke3RoaXMuX3BhcnNlSHRtbChlcnJvcil9YCk7XG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU19ISU5UKVxuXHRcdHtcblx0XHRcdHRoaXMuX2xhc3RIaW50cyA9IGRhdGEuZ2V0VXRmU3RyaW5nQXJyYXkoJ2gnKTtcblxuXHRcdFx0dGhpcy5fc2hvd0hpbnRQYW5lbCgpO1xuXHRcdH1cblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNfRVJST1JfTE9DS0VEKVxuXHRcdHtcblx0XHRcdHRoaXMuX3dyaXRlQ29uc29sZShgPHNwYW4gY2xhc3M9XCJ0ZXh0LWVycm9yXCI+RVJST1I8L3NwYW4+IDxzcGFuIGNsYXNzPVwidGV4dC1oaWdobGlnaHRcIj5Db25zb2xlIG1vZHVsZSBpcyBsb2NrZWQgZnJvbSBzZXJ2ZXIgc2lkZS4gUGxlYXNlIGZvbGxvdyB0aGUgaW5zdHJ1Y3Rpb25zIHlvdSB3ZXJlIGdpdmVuIHRvIHVubG9jayBpdC48L3NwYW4+YCk7XG5cdFx0fVxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVUkgRVZFTlQgTElTVEVORVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0b25JbnB1dEtleURvd24oZSlcblx0e1xuXHRcdC8vIFNhdmUgcHJldmlvdXMgaW5wdXQgdmFsdWVcblx0XHR0aGlzLl9wcmV2SW5wdXQgPSAkKCcjY25zLWlucHV0JykudmFsKCk7XG5cblx0XHRjb25zdCBrZXlOYW1lID0gZS5rZXk7XG5cblx0XHRpZiAoa2V5TmFtZSA9PSAnQXJyb3dVcCcgfHwga2V5TmFtZSA9PSAnQXJyb3dEb3duJyB8fCBrZXlOYW1lID09ICdUYWInKVxuXHRcdHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblxuXHRvbklucHV0S2V5VXAoZSlcblx0e1xuXHRcdGNvbnN0IGtleU5hbWUgPSBlLmtleTtcblx0XHRjb25zdCBpbnB1dCA9ICQoJyNjbnMtaW5wdXQnKS52YWwoKTtcblxuXHRcdC8vIENvcHkgaW5wdXQgdG8gZHVtbXlcblx0XHQkKCcjY25zLWlucHV0LWR1bW15JykuaHRtbChpbnB1dCk7XG5cblx0XHQvLy0tLSBET1QgKENPREUgSElOVElORykgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRpZiAoa2V5TmFtZSA9PSAnLicpXG5cdFx0e1xuXHRcdFx0Ly8gQ2xvc2UgaGludCBwYW5lbCBpZiBvcGVuXG5cdFx0XHRpZiAodGhpcy5faXNIaW50UGFuZWxPcGVuKVxuXHRcdFx0XHR0aGlzLl9jbG9zZUhpbnRQYW5lbCgpO1xuXG5cdFx0XHQvLyBSZXF1ZXN0IGNvZGUgaGludHNcblx0XHRcdHRoaXMuX3JlcXVlc3RIaW50cyhpbnB1dCk7XG5cdFx0fVxuXG5cdFx0Ly8tLS0gRU5URVIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZlx0KGtleU5hbWUgPT0gJ0VudGVyJyAmJiBpbnB1dC5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdC8vIEdldCBzZWxlY3RlZCBoaW50XG5cdFx0XHRpZiAodGhpcy5faXNIaW50UGFuZWxPcGVuKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAodGhpcy5faGludFBhbmVsLmZpbmQoJy5oaW50LWl0ZW0uc2VsZWN0ZWQnKS5sZW5ndGggPiAwKVxuXHRcdFx0XHRcdHRoaXMuX3NldElucHV0T25IaW50U2VsZWN0ZWQoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gU2VuZCBjb21tYW5kIHRvIHNlcnZlclxuXHRcdFx0XHRsZXQgc2ZzbyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdFx0c2Zzby5wdXRVdGZTdHJpbmcoJ2MnLCBpbnB1dCk7XG5cdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfQ01ELCBzZnNvKTtcblxuXHRcdFx0XHQvLyBXcml0ZSBjb21tYW5kIHRvIGNvbnNvbGVcblx0XHRcdFx0dGhpcy5fd3JpdGVDb25zb2xlKGlucHV0LCB0cnVlKTtcblxuXHRcdFx0XHQvLyBDbGVhciBoaW50c1xuXHRcdFx0XHR0aGlzLl9sYXN0SGludHMgPSBudWxsO1xuXG5cdFx0XHRcdC8vIENsZWFyIGlucHV0XG5cdFx0XHRcdHRoaXMuX2NsZWFySW5wdXQoKTtcblxuXHRcdFx0XHQvLyBBZGQgY29tbWFuZCB0byBoaXN0b3J5XG5cdFx0XHRcdHRoaXMuX2NtZEhpc3RvcnkuYWRkQ29tbWFuZChpbnB1dCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8tLS0gRU5URVIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZlx0KGtleU5hbWUgPT0gJ1RhYicpXG5cdFx0e1xuXHRcdFx0Ly8gR2V0IHNlbGVjdGVkIGhpbnRcblx0XHRcdGlmICh0aGlzLl9pc0hpbnRQYW5lbE9wZW4pXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh0aGlzLl9oaW50UGFuZWwuZmluZCgnLmhpbnQtaXRlbS5zZWxlY3RlZCcpLmxlbmd0aCA+IDApXG5cdFx0XHRcdFx0dGhpcy5fc2V0SW5wdXRPbkhpbnRTZWxlY3RlZCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vLS0tIENUUkwrQkFDS1NQQUNFIChDTEVBUiBDT05TT0xFKSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdGVsc2UgaWYgKGUuY3RybEtleSAmJiBrZXlOYW1lID09ICdCYWNrc3BhY2UnKVxuXHRcdHtcblx0XHRcdHRoaXMuX29uQ2xlYXJDb25zb2xlQ2xpY2soKTtcblx0XHR9XG5cblx0XHQvLy0tLSBCQUNLU1BBQ0UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZiAoa2V5TmFtZSA9PSAnQmFja3NwYWNlJylcblx0XHR7XG5cdFx0XHQvLyBDaGVjayB0aGUgZGVsZXRlZCBjaGFyXG5cdFx0XHRpZiAodGhpcy5fcHJldklucHV0LnN1YnN0cmluZyh0aGlzLl9wcmV2SW5wdXQubGVuZ3RoIC0gMSkgPT0gJy4nKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBSZXNldCBoaW50aW5nXG5cdFx0XHRcdHRoaXMuX3Jlc2V0SGludGluZyhpbnB1dCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFVwZGF0ZSBoaW50IHBhbmVsIGlmIG9wZW5cblx0XHRcdGlmICh0aGlzLl9pc0hpbnRQYW5lbE9wZW4pXG5cdFx0XHRcdHRoaXMuX3VwZGF0ZUhpbnRQYW5lbCgpO1xuXHRcdH1cblxuXHRcdC8vLS0tIEVTQyAoQ0xFQVIpIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdGVsc2UgaWYgKGtleU5hbWUgPT0gJ0VzY2FwZScpXG5cdFx0e1xuXHRcdFx0Ly8gQ2xvc2UgaGludCBwYW5lbCBpZiBvcGVuXG5cdFx0XHRpZiAodGhpcy5faXNIaW50UGFuZWxPcGVuKVxuXHRcdFx0XHR0aGlzLl9jbG9zZUhpbnRQYW5lbCgpO1xuXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENsZWFyIGhpbnRzXG5cdFx0XHRcdHRoaXMuX2xhc3RIaW50cyA9IG51bGw7XG5cblx0XHRcdFx0Ly8gQ2xlYXIgaW5wdXRcblx0XHRcdFx0dGhpcy5fY2xlYXJJbnB1dCgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vLS0tIEFSUk9XIFVQIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdGVsc2UgaWYgKGtleU5hbWUgPT0gJ0Fycm93VXAnKVxuXHRcdHtcblx0XHRcdC8vIElmIGhpbnQgcGFuZWwgaXMgb3Blbiwgc2V0IHNlbGVjdGlvblxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fY3VyckhpbnRGb2N1cy0tO1xuXG5cdFx0XHRcdHRoaXMuX3NldEhpbnRJdGVtU2VsZWN0ZWQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnJvd3NlIGhpc3Rvcnlcblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2V0SW5wdXRPbkhpc3RvcnlTZWxlY3RlZCh0aGlzLl9jbWRIaXN0b3J5LnJld2luZCgpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLy0tLSBBUlJPVyBET1dOIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRlbHNlIGlmIChrZXlOYW1lID09ICdBcnJvd0Rvd24nKVxuXHRcdHtcblx0XHRcdC8vIElmIGhpbnQgcGFuZWwgaXMgb3Blbiwgc2V0IHNlbGVjdGlvblxuXHRcdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fY3VyckhpbnRGb2N1cysrO1xuXG5cdFx0XHRcdHRoaXMuX3NldEhpbnRJdGVtU2VsZWN0ZWQoKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQnJvd3NlIGhpc3Rvcnlcblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5fc2V0SW5wdXRPbkhpc3RvcnlTZWxlY3RlZCh0aGlzLl9jbWRIaXN0b3J5LmZvcndhcmQoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8tLS0gQVJST1cgTEVGVCAmIFJJR0hUIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZSBpZiAoa2V5TmFtZSA9PSAnQXJyb3dMZWZ0JyB8fCBrZXlOYW1lID09ICdBcnJvd1JpZ2h0Jylcblx0XHR7XG5cdFx0XHQvLyBDbG9zZSBoaW50IHBhbmVsIGlmIG9wZW5cblx0XHRcdGlmICh0aGlzLl9pc0hpbnRQYW5lbE9wZW4pXG5cdFx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cdFx0fVxuXG5cdFx0Ly8tLS0gQU5ZIE9USEVSIEtFWSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIFVwZGF0ZSB0ZW1wIGluIGNvbW1hbmQgaGlzdG9yeVxuXHRcdFx0dGhpcy5fY21kSGlzdG9yeS5hZGRUZW1wQ29tbWFuZChpbnB1dCk7XG5cblx0XHRcdGlmIChpbnB1dC5sZW5ndGggPT0gJCgnI2Nucy1pbnB1dCcpWzBdLnNlbGVjdGlvbkVuZClcblx0XHRcdHtcblx0XHRcdFx0Ly8gVXBkYXRlIGhpbnQgcGFuZWwgaWYgb3BlblxuXHRcdFx0XHRpZiAodGhpcy5faXNIaW50UGFuZWxPcGVuKVxuXHRcdFx0XHRcdHRoaXMuX3VwZGF0ZUhpbnRQYW5lbCgpO1xuXG5cdFx0XHRcdC8vIFNob3cgaGludCBwYW5lbFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5fc2hvd0hpbnRQYW5lbCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBSZXNldCBoaW50aW5nXG5cdFx0XHRcdHRoaXMuX3Jlc2V0SGludGluZyhpbnB1dCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0X29uQ2xlYXJDb25zb2xlQ2xpY2soKVxuXHR7XG5cdFx0JCgnI2Nucy1jb25zb2xlJykuZW1wdHkoKTtcblx0fVxuXG5cdF9vbkhpbnRJdGVtQ2xpY2soZSlcblx0e1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdC8vIFNldCBjbGlja2VkIGl0ZW0gYXMgc2VsZWN0ZWRcblx0XHRlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcblxuXHRcdC8vIFNldCBpbnB1dCB2YWx1ZVxuXHRcdHRoaXMuX3NldElucHV0T25IaW50U2VsZWN0ZWQoKTtcblxuXHRcdC8vIEZvY3VzIG9uIHByb21wdCBpbnB1dFxuXHRcdCQoJyNjbnMtaW5wdXQnKS5mb2N1cygpO1xuXHR9XG5cblx0X29uR2VuZXJpY0NsaWNrKClcblx0e1xuXHRcdC8vIENsb3NlIGhpbnQgcGFuZWwgaWYgb3BlblxuXHRcdGlmICh0aGlzLl9pc0hpbnRQYW5lbE9wZW4pXG5cdFx0XHR0aGlzLl9jbG9zZUhpbnRQYW5lbCgpO1xuXHR9XG5cblx0X29uRXhwb3J0U2Vzc2lvbkNsaWNrKClcblx0e1xuXHRcdGxldCBkYXRlID0gbW9tZW50KCk7XG5cblx0XHRsZXQgdHJhbnNjcmlwdCA9IHRoaXMuVFJBTlNDUklQVF9URU1QTEFURS5yZXBsYWNlKCc8IS0tSEVBREVSLS0+JywgYFNhdmVkIG9uICR7ZGF0ZS5mb3JtYXQoJ2RkZGQsIE1NTU0gRG8gWVlZWSwgSEg6bW06c3MnKX1gKTtcblx0XHR0cmFuc2NyaXB0ID0gdHJhbnNjcmlwdC5yZXBsYWNlKCc8IS0tVFJBTlNDUklQVC0tPicsICQoJyNjbnMtY29uc29sZScpLmh0bWwoKSk7XG5cblx0XHRsZXQgYmxvYiA9IG5ldyBCbG9iKFt0cmFuc2NyaXB0XSwge3R5cGU6ICd0ZXh0L2h0bWw7Y2hhcnNldD11dGYtOCd9KTtcblxuXHRcdEZpbGVTYXZlci5zYXZlQXMoYmxvYiwgYENvbnNvbGVTZXNzaW9uXyR7ZGF0ZS5mb3JtYXQoJ1lZWVlNTUREX0hIbW1zcycpfS5odG1sYCk7XG5cdH1cblxuXHRfb25SdW5TY3JpcHRDbGljaygpXG5cdHtcblx0XHQvLyBPcGVuIG1vZGFsXG5cdFx0dGhpcy5fdXBsb2FkU2NyaXB0TW9kYWwubW9kYWwoJ3Nob3cnKTtcblx0fVxuXG5cdF9vblVwbG9hZFNjcmlwdHJNb2RhbEhpZGRlbigpXG5cdHtcblx0XHQvLyBDbGVhciB1cGxvYWRlclxuXHRcdHRoaXMuX3VwbG9hZGVyLmNsZWFyQWxsRmlsZXMoKTtcblx0fVxuXG5cdF9vblVwbG9hZFNjcmlwdHJCdXR0b25DTGljaygpXG5cdHtcblx0XHRpZiAodGhpcy5fdXBsb2FkZXIuZ2V0RmlsZXMoKS5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGxldCBmaWxlID0gdGhpcy5fdXBsb2FkZXIuZ2V0RmlsZXMoKVswXS5yYXdGaWxlO1xuXG5cdFx0XHRmaWxlLmFycmF5QnVmZmVyKCkudGhlbihidWZmZXIgPT4ge1xuXHRcdFx0XHR0aGlzLl93cml0ZUNvbnNvbGUoYEVYRUM6ICR7ZmlsZS5uYW1lfWAsIHRydWUpO1xuXG5cdFx0XHRcdGxldCBzZnNvID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdFx0XHRzZnNvLnB1dEJ5dGVBcnJheSgnc2NyaXB0JywgbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSk7XG5cblx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9TQ1JJUFQsIHNmc28pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIENsb3NlIG1vZGFsXG5cdFx0XHR0aGlzLl91cGxvYWRTY3JpcHRNb2RhbC5tb2RhbCgnaGlkZScpO1xuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9zaG93V2VsY29tZU1lc3NhZ2UoKVxuXHR7XG5cdFx0dGhpcy5fd3JpdGVDb25zb2xlKGAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcbkFETUlOX0NPTlNPTEUsIHZlcnNpb24gJHt0aGlzLlZFUlNJT059XFxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXG5UeXBlIGhlbHAoKSBmb3IgYXNzaXN0YW5jZS5cXG5gLCBmYWxzZSwgZmFsc2UpO1xuXHR9XG5cblx0X2NsZWFySW5wdXQoKVxuXHR7XG5cdFx0JCgnI2Nucy1pbnB1dCcpLnZhbCgnJyk7XG5cdFx0JCgnI2Nucy1pbnB1dC1kdW1teScpLmh0bWwoJycpO1xuXHR9XG5cblx0X3NldElucHV0T25IaW50U2VsZWN0ZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2hpbnRQYW5lbClcblx0XHR7XG5cdFx0XHRjb25zdCBpbnB1dCA9ICQoJyNjbnMtaW5wdXQnKS52YWwoKTtcblx0XHRcdGNvbnN0IHNlbGVjdGVkVmFsID0gdGhpcy5faGludFBhbmVsLmZpbmQoJy5oaW50LWl0ZW0uc2VsZWN0ZWQgaW5wdXQnKS52YWwoKTtcblx0XHRcdGNvbnN0IG5ld0lucHV0ID0gaW5wdXQuc3Vic3RyaW5nKDAsIGlucHV0Lmxhc3RJbmRleE9mKCcuJykpICsgJy4nICsgc2VsZWN0ZWRWYWw7XG5cblx0XHRcdCQoJyNjbnMtaW5wdXQnKS52YWwobmV3SW5wdXQpO1xuXHRcdFx0JCgnI2Nucy1pbnB1dC1kdW1teScpLmh0bWwobmV3SW5wdXQpO1xuXG5cdFx0XHR0aGlzLl9jbG9zZUhpbnRQYW5lbCgpO1xuXHRcdH1cblx0fVxuXG5cdF9zZXRJbnB1dE9uSGlzdG9yeVNlbGVjdGVkKGNvbW1hbmQpXG5cdHtcblx0XHQkKCcjY25zLWlucHV0JykudmFsKGNvbW1hbmQpO1xuXHRcdCQoJyNjbnMtaW5wdXQtZHVtbXknKS5odG1sKGNvbW1hbmQpO1xuXHR9XG5cblx0X3dyaXRlQ29uc29sZSh0eHQsIGlzSW5wdXQgPSBmYWxzZSwgbGluZWJyZWFrID0gdHJ1ZSlcblx0e1xuXHRcdGxldCBtc2c7XG5cblx0XHRpZiAoaXNJbnB1dClcblx0XHRcdG1zZyA9IGA8c3BhbiBjbGFzcz1cInRleHQtY29tbWFuZFwiPiZndDsgJHt0eHR9PC9zcGFuPmA7XG5cdFx0ZWxzZVxuXHRcdFx0bXNnID0gYDxzcGFuIGNsYXNzPVwidGV4dC1jb25zb2xlXCI+JHt0eHR9PC9zcGFuPmA7XG5cblx0XHRpZiAobGluZWJyZWFrKVxuXHRcdFx0bXNnID0gYFxcbiR7bXNnfWA7XG5cblx0XHQvLyBBcHBlbmQgdGV4dCB0byBjb25zb2xlXG5cdFx0JCgnI2Nucy1jb25zb2xlJykuYXBwZW5kKG1zZyk7XG5cblx0XHQvLyBzY3JvbGwgY29uc29sZSB0byBib3R0b21cblx0XHQkKCcjY25zLWNvbnNvbGUnKS5zY3JvbGxUb3AoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLnNjcm9sbEhlaWdodDsgfSk7XG5cdH1cblxuXHRfcGFyc2VIdG1sKHNzKVxuXHR7XG5cdFx0c3MgPSBzcy5yZXBsYWNlKCc8JywgJyZsdDsnKTtcblx0XHRzcyA9IHNzLnJlcGxhY2UoJz4nLCAnJmd0OycpO1xuXG5cdFx0cmV0dXJuIHNzO1xuXHR9XG5cblx0X3Nob3dIaW50UGFuZWwoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2xhc3RIaW50cyAhPSBudWxsICYmIHRoaXMuX2xhc3RIaW50cy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdHRoaXMuX2N1cnJIaW50Rm9jdXMgPSAtMTtcblxuXHRcdFx0Ly8gQ3JlYXRlIHBhbmVsXG5cdFx0XHR0aGlzLl9oaW50UGFuZWwgPSAkKCc8ZGl2PicsIHsnY2xhc3MnOiAnaGludC1wYW5lbCd9KTtcblx0XHRcdCQodGhpcykuYXBwZW5kKHRoaXMuX2hpbnRQYW5lbCk7XG5cblx0XHRcdC8vIFNob3cgaGludHNcblx0XHRcdHRoaXMuX3VwZGF0ZUhpbnRQYW5lbCgpO1xuXHRcdH1cblx0fVxuXG5cdF9jbG9zZUhpbnRQYW5lbCgpXG5cdHtcblx0XHR0aGlzLl9oaW50UGFuZWwucmVtb3ZlKCk7XG5cdFx0dGhpcy5faGludFBhbmVsID0gbnVsbDtcblx0fVxuXG5cdF91cGRhdGVIaW50UGFuZWwoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2xhc3RIaW50cyAhPSBudWxsICYmIHRoaXMuX2xhc3RIaW50cy5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdC8vIENsZWFyIGhpbnRzIHBhbmVsXG5cdFx0XHR0aGlzLl9oaW50UGFuZWwuZW1wdHkoKTtcblxuXHRcdFx0Y29uc3QgZG90SW5kZXggPSAkKCcjY25zLWlucHV0JykudmFsKCkubGFzdEluZGV4T2YoJy4nKTtcblx0XHRcdGxldCBsYXN0V29yZCA9ICcnO1xuXG5cdFx0XHRpZiAoZG90SW5kZXggPiAtMSlcblx0XHRcdFx0bGFzdFdvcmQgPSAkKCcjY25zLWlucHV0JykudmFsKCkuc3Vic3RyKGRvdEluZGV4ICsgMSwgJCgnI2Nucy1pbnB1dCcpLnZhbCgpLmxlbmd0aCk7XG5cblx0XHRcdGxldCBpc0VtcHR5ID0gdHJ1ZTtcblxuXHRcdFx0Zm9yIChsZXQgd29yZCBvZiB0aGlzLl9sYXN0SGludHMpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIENoZWNrIGlmIHRoZSBpdGVtIHN0YXJ0cyB3aXRoIHRoZSBzYW1lIGxldHRlcnMgYXMgdGhlIGlucHV0J3MgbGFzdCB3b3JkXG5cdFx0XHRcdGlmIChsYXN0V29yZCA9PSAnJyB8fCB3b3JkLnN1YnN0cigwLCBsYXN0V29yZC5sZW5ndGgpLnRvVXBwZXJDYXNlKCkgPT0gbGFzdFdvcmQudG9VcHBlckNhc2UoKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIENyZWF0ZSBkaXZcblx0XHRcdFx0XHRsZXQgaXRlbSA9ICQoJzxkaXY+JywgeydjbGFzcyc6ICdoaW50LWl0ZW0nfSk7XG5cblx0XHRcdFx0XHQvLyBTaG93IHZhbHVlLCBhbmQgbWFrZSB0aGUgbWF0Y2hpbmcgbGV0dGVycyBib2xkXG5cdFx0XHRcdFx0aXRlbS5hcHBlbmQoYDxzdHJvbmc+JHt3b3JkLnN1YnN0cigwLCBsYXN0V29yZC5sZW5ndGgpfTwvc3Ryb25nPiR7d29yZC5zdWJzdHIobGFzdFdvcmQubGVuZ3RoKX1gKTtcblxuXHRcdFx0XHRcdC8vIEluc2VydCBhbiBpbnB1dCBmaWVsZCB0aGF0IHdpbGwgaG9sZCB0aGUgY3VycmVudCBpdGVtJ3MgdmFsdWVcblx0XHRcdFx0XHRpdGVtLmFwcGVuZChgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIiR7d29yZH1cIj5gKTtcblxuXHRcdFx0XHRcdC8vIEFkZCBjbGljayBsaXN0ZW5lclxuXHRcdFx0XHRcdGl0ZW0ub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkhpbnRJdGVtQ2xpY2ssIHRoaXMpKTtcblxuXHRcdFx0XHRcdHRoaXMuX2hpbnRQYW5lbC5hcHBlbmQoaXRlbSk7XG5cblx0XHRcdFx0XHRpc0VtcHR5ID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgcGFuZWwgaXMgZW1wdHksIHJlbW92ZSBpdFxuXHRcdFx0aWYgKGlzRW1wdHkpXG5cdFx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cblx0XHRcdC8vIEVsc2Ugc2V0IHBhbmVsIHBvc2l0aW9uXG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IGV4dENvbnRQb3MgPSAkKCcjY25zLWlucHV0LWNvbnRhaW5lci0yJykucG9zaXRpb24oKTtcblx0XHRcdFx0Y29uc3QgaW50Q29udFBvcyA9ICQoJyNjbnMtaW5wdXQtY29udGFpbmVyLTEnKS5wb3NpdGlvbigpO1xuXG5cdFx0XHRcdGxldCBsZWZ0ID0gZXh0Q29udFBvcy5sZWZ0ICsgaW50Q29udFBvcy5sZWZ0ICsgJCgnI2Nucy1pbnB1dC1kdW1teScpLm91dGVyV2lkdGgoKTtcblx0XHRcdFx0bGV0IHRvcCA9IGV4dENvbnRQb3MudG9wICsgaW50Q29udFBvcy50b3AgLSB0aGlzLl9oaW50UGFuZWwub3V0ZXJIZWlnaHQoKTtcblxuXHRcdFx0XHRpZiAobGVmdCA+IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5faGludFBhbmVsLm91dGVyV2lkdGgoKSlcblx0XHRcdFx0XHRsZWZ0ID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLl9oaW50UGFuZWwub3V0ZXJXaWR0aCgpO1xuXG5cdFx0XHRcdHRoaXMuX2hpbnRQYW5lbC5jc3Moe3RvcDogdG9wLCBsZWZ0OiBsZWZ0LCBwb3NpdGlvbjogJ2Fic29sdXRlJ30pO1xuXG5cdFx0XHRcdC8vIFNlbGVjdCBmaXJzdCBpdGVtXG5cdFx0XHRcdHRoaXMuX2N1cnJIaW50Rm9jdXMgPSAwO1xuXHRcdFx0XHR0aGlzLl9zZXRIaW50SXRlbVNlbGVjdGVkKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0X3JlcXVlc3RIaW50cyhpbnB1dClcblx0e1xuXHRcdC8vIENsZWFyIHByZXZpb3VzIGhpbnRzXG5cdFx0dGhpcy5fbGFzdEhpbnRzID0gbnVsbDtcblxuXHRcdC8vIFBhcnNlIGlucHV0XG5cdFx0bGV0IGhpbnRQYXJlbnQgPSB0aGlzLl9leHRyYWN0SGludFBhcmVudChpbnB1dCk7XG5cblx0XHQvLyBSZXF1ZXN0IGNvZGUgaGludFxuXHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0cGFyYW1zLnB1dFV0ZlN0cmluZygnYycsIGhpbnRQYXJlbnQpO1xuXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ISU5ULCBwYXJhbXMpO1xuXHR9XG5cblx0X2V4dHJhY3RIaW50UGFyZW50KGluVmFsKVxuXHR7XG5cdFx0bGV0IG91dFZhbCA9IG51bGw7XG5cblx0XHRmb3IgKGxldCB0b2sgb2YgdGhpcy5UT0tFTlMpXG5cdFx0e1xuXHRcdFx0Y29uc3QgcCA9IGluVmFsLmluZGV4T2YodG9rKTtcblxuXHRcdFx0aWYgKHAgPiAtMSlcblx0XHRcdHtcblx0XHRcdFx0b3V0VmFsID0gaW5WYWwuc3Vic3RyaW5nKHAgKyB0b2subGVuZ3RoLCBpblZhbC5sZW5ndGgpLnRyaW0oKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKG91dFZhbCA9PSBudWxsKVxuXHRcdFx0b3V0VmFsID0gaW5WYWw7XG5cblx0XHQvLyBSZW1vdmUgZG90IGF0IHRoZSBlbmQgaWYgbmVlZGVkXG5cdFx0aWYgKG91dFZhbC5lbmRzV2l0aCgnLicpKVxuXHRcdFx0b3V0VmFsID0gb3V0VmFsLnN1YnN0cigwLCBvdXRWYWwubGVuZ3RoIC0gMSk7XG5cblx0XHRyZXR1cm4gb3V0VmFsO1xuXHR9XG5cblx0X3NldEhpbnRJdGVtU2VsZWN0ZWQoKVxuXHR7XG5cdFx0bGV0IGl0ZW1zID0gdGhpcy5faGludFBhbmVsLmZpbmQoJy5oaW50LWl0ZW0nKTtcblx0XHRpdGVtcy5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcblxuXHRcdGlmICh0aGlzLl9jdXJySGludEZvY3VzID49IGl0ZW1zLmxlbmd0aClcblx0XHRcdHRoaXMuX2N1cnJIaW50Rm9jdXMgPSAwO1xuXG4gICAgXHRpZiAodGhpcy5fY3VyckhpbnRGb2N1cyA8IDApXG5cdFx0XHR0aGlzLl9jdXJySGludEZvY3VzID0gaXRlbXMubGVuZ3RoIC0gMTtcblxuXHRcdGxldCBpdGVtID0gaXRlbXMuZXEodGhpcy5fY3VyckhpbnRGb2N1cyk7XG5cdFx0aXRlbS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblxuXHRcdC8vIFNjcm9sbCB0byBpdGVtXG5cdFx0dGhpcy5faGludFBhbmVsLnNjcm9sbFRvcCh0aGlzLl9oaW50UGFuZWwuc2Nyb2xsVG9wKCkgKyBpdGVtLnBvc2l0aW9uKCkudG9wKTtcblx0fVxuXG5cdF9yZXNldEhpbnRpbmcoaW5wdXQpXG5cdHtcblx0XHQvLyBDbG9zZSBoaW50IHBhbmVsXG5cdFx0aWYgKHRoaXMuX2lzSGludFBhbmVsT3Blbilcblx0XHRcdHRoaXMuX2Nsb3NlSGludFBhbmVsKCk7XG5cblx0XHQvLyBDbGVhciBoaW50c1xuXHRcdHRoaXMuX2xhc3RIaW50cyA9IG51bGw7XG5cblx0XHQvLyBHZXQgcHJldmlvdXMgd29yZFxuXHRcdGNvbnN0IGRvdEluZGV4ID0gaW5wdXQubGFzdEluZGV4T2YoJy4nKTtcblxuXHRcdGlmIChkb3RJbmRleCA+IC0xKVxuXHRcdHtcblx0XHRcdGxldCB2YWx1ZSA9IGlucHV0LnN1YnN0cmluZygwLCBkb3RJbmRleCk7XG5cblx0XHRcdC8vIFJlcXVlc3QgY29kZSBoaW50c1xuXHRcdFx0dGhpcy5fcmVxdWVzdEhpbnRzKHZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRnZXQgX2lzSGludFBhbmVsT3BlbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faGludFBhbmVsICE9IG51bGw7XG5cdH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=