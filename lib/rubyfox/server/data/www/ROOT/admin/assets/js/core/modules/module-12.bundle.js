/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-12"],{

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

/***/ "./src/data/runtime-log-entry.js":
/*!***************************************!*\
  !*** ./src/data/runtime-log-entry.js ***!
  \***************************************/
/*! exports provided: RuntimeLogEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuntimeLogEntry", function() { return RuntimeLogEntry; });
class RuntimeLogEntry
{
	constructor(separator)
	{
		this.sep = separator
	}

	static fromArray(separator, logEntryData)
	{
		let rle = new RuntimeLogEntry(separator);

		rle.date = logEntryData[0];
		rle.time = logEntryData[1];
		rle.dateTime = rle._getDateTime();
		rle.level = logEntryData[2].trim();
		rle.thread = logEntryData[3];
		rle.clazz = logEntryData[4];
		rle.message = logEntryData[6];

		return rle;
	}

	_getDateTime()
	{
		return this.date + '\n' + this.time;
	}
}


/***/ }),

/***/ "./src/modules/log-viewer.js":
/*!***********************************!*\
  !*** ./src/modules/log-viewer.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogViewer; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _data_runtime_log_entry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/runtime-log-entry */ "./src/data/runtime-log-entry.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! file-saver */ "./node_modules/file-saver/dist/FileSaver.min.js");
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");






class LogViewer extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('logViewer');

		this.COMMANDS_PREFIX = 'logViewer';
		this.HELP_URL = '/admintool-LogViewer';

		this.ANY_LEVEL = '[any]';
		this.LEVELS = ['TRACE','DEBUG','INFO','WARN','ERROR'];
		this.ANY_CLASS = '[any]';

		this.LOG_DATA_LABEL = 'lines';

		this.BOOT_LOG_BACKUP_ID = 'SFS2X_BootLog';
		this.RUNTIME_LOG_BACKUP_ID = 'SFS2X_RuntimeLog';
		this.FULL_BACKUP_ID = 'SFS2X_Logs';

		// Outgoing requests
		this.REQ_GET_RUNTIME_LOG = 'getRunLog';
		this.REQ_GET_BOOT_LOG = 'getBootLog';
		this.REQ_GET_BACKUPS_STATUS = 'getBakStatus';
		this.REQ_BACKUP_BOOT_LOG = 'bakBootLog';
		this.REQ_BACKUP_RUNTIME_LOG = 'bakRunLog';
		this.REQ_BACKUP_FULL_LOGS = 'bakFullLogs';
		this.REQ_DELETE_BACKUP = 'delBackup';

		// Incoming responses
		this.RESP_INIT_ERROR = 'initErr';
		this.RESP_RUNTIME_LOG_ERROR = 'runLogErr';
		this.RESP_RUNTIME_LOG_INVALID = 'runLogInv';
		this.RESP_RUNTIME_LOG = 'runLog';
		this.RESP_BOOT_LOG_ERROR = 'bootLogErr';
		this.RESP_BOOT_LOG = 'bootLog';
		this.RESP_BACKUPS_STATUS = 'bakStatus';
		this.RESP_DELETE_BACKUP_FAILED = 'delBakFail';
		this.RESP_BACKUP_ERROR = 'bakError';
		this.RESP_BACKUP_WARNING = 'bakWarn';
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

		// Initialize scrolling tabs
		$('#lgv-tabNavigator > #tabs').scrollingTabs({
			bootstrapVersion: 4,
			scrollToTabEdge: true,
			enableSwiping: true,
			disableScrollArrowsOnFullyScrolled: true,
			cssClassLeftArrow: 'fa fa-chevron-left',
			cssClassRightArrow: 'fa fa-chevron-right'
		});

		// Add listener to tab shown event
		$('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(this._onTabShown, this));

		// Initialize log lines dropdown
		this._logLinesDD = $('#lgv-logLinesDD').kendoDropDownList({
			valueTemplate: '<span class="text-muted pr-1">Log entries:</span><span>#:data.text#</span>',
		}).data('kendoDropDownList');

		// Initialize load button
		$('#lgv-loadBt').on('click', $.proxy(this._onRuntimeLogLoadBtClick, this));

		// Initialize progress bars
		$('.progress-bar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Initialize level filter dropdown
		this._levelFilterDD = $('#lgv-levelDD').kendoDropDownList({
			dataSource: [this.ANY_LEVEL].concat(this.LEVELS),
			change: $.proxy(this._onFilterChange, this)
		}).data('kendoDropDownList');

		// Initialize class filter dropdown
		this._classFilterDD = $('#lgv-classDD').kendoDropDownList({
			change: $.proxy(this._onFilterChange, this)
		}).data('kendoDropDownList');

		// Initialize message filter input
		$('#lgv-messageIn').on('input', $.proxy(this._onFilterChange, this));

		// Initialize clear button
		$('#lgv-clearFilterBt').on('click', $.proxy(this._onClearFilterClick, this));

		// Initialize export button
		$('#lgv-exportRuntimeLogBt').on('click', $.proxy(this._onExportRuntimeLogBtClick, this));

		// Initialize runtime log grid
		this._runtimeLogGrid = $('#lgv-runtimeLogGrid').kendoGrid({
			scrollable: true,
            sortable: false,
			//resizable: true,
			selectable: false,
            columns:
            [
				{
	                field: 'dateTime',
	                width: 150,
					title: 'Date/Time',
	            },
	            {
	                field: 'level',
	                width: 100,
	                title: 'Level',
	            },
	            {
	                field: 'thread',
	                width: 150,
	                title: 'Thread',
	            },
	            {
	                field: 'clazz',
	                width: 250,
	                title: 'Class',
	            },
				{
	                field: 'message',
	                width: 1000,
					title: 'Message',
	            },
			],
			noRecords: {
				template: 'No log entries to display.'
			},
			dataSource: []
        }).data('kendoGrid');

		// Initialize boot log view buttons
		$('#lgv-exportBootLogBt').on('click', $.proxy(this._onExportBootLogBtClick, this));
		$('#lgv-switchBootLogColorBt').on('click', $.proxy(this._onSwitchBootLogColorBtClick, this));

		// Initialize generate backup buttons
		$('#lgv-bootLogBackupCard .backup-button').on('click', $.proxy(this._onBootLogGenerateBtClick, this));
		$('#lgv-runtimeLogBackupCard .backup-button').on('click', $.proxy(this._onRuntimeLogGenerateBtClick, this));
		$('#lgv-fullLogBackupCard .backup-button').on('click', $.proxy(this._onFullLogsGenerateBtClick, this));

		this._initBackupCard('#lgv-bootLogBackupCard');
		this._initBackupCard('#lgv-runtimeLogBackupCard');
		this._initBackupCard('#lgv-fullLogBackupCard');

		// Initialize download grid
		this._downloadGrid = $('#lgv-downloadGrid').kendoGrid({
			scrollable: true,
            sortable: true,
			//resizable: true,
			selectable: 'row',
            columns:
            [
				{
	                field: 'date',
	                width: 100,
					title: 'Date',
	            },
	            {
	                field: 'time',
	                width: 100,
	                title: 'Time',
	            },
	            {
	                field: 'name',
	                width: 300,
	                title: 'Filename',
	            },
	            {
	                field: 'size',
	                width: 100,
	                title: 'Size',
	            },
			],
			noRecords: {
				template: 'No backups available.'
			},
			change: $.proxy(this._onDownloadGridSelectionChange, this),
			dataSource: []
        }).data('kendoGrid');

		// Initialize delete button
		$('#lgv-deleteBt').on('click', $.proxy(this._onDeleteBtClick, this));
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Remove listener to tab shown event
		$('a[data-toggle="tab"]').off('shown.bs.tab');

		// Destroy scrolling tabs
		$('#lgv-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove click listeners
		$('#lgv-loadBt').off('click');
		$('#lgv-exportBootLogBt').off('click');
		$('#lgv-switchBootLogColorBt').off('click');
		$('#lgv-bootLogBackupCard .backup-button').off('click');
		$('#lgv-runtimeLogBackupCard .backup-button').off('click');
		$('#lgv-clearFilterBt').off('click');
		$('#lgv-deleteBt').off('click');

		$('#lgv-messageIn').off('input');
	}

	onExtensionCommand(command, data)
	{
		// Error during initialization (unable to access log4j configuration file)
		if (command == this.RESP_INIT_ERROR)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);

			// Set all tabs to show errors
			this._switchBootViewStack('lgv-bootLogErrorView');
			this._switchRuntimeViewStack('lgv-runtimeLogErrorView');
			this._switchDownloadViewStack('lgv-downloadErrorView');

			// Disable runtime log controls
			this._enableRuntimeLogControls(false);

			this._initFailed = true;
		}

		// Error responses
		else if (command == this.RESP_BOOT_LOG_ERROR || command == this.RESP_RUNTIME_LOG_ERROR)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);

			if (command == this.RESP_BOOT_LOG_ERROR)
			{
				// Set tab to show error
				this._switchBootViewStack('lgv-bootLogErrorView');

				// Disable boot log backup generation
				this._bootLogBackupUnavailable = true;
				this._disableBackupInterface(false);

				this._bootLogRequested = true;
			}

			if (command == this.RESP_RUNTIME_LOG_ERROR)
			{
				// Disable controls
				this._enableRuntimeLogControls(false);

				// Remove loading bar (runtime log)
				this._switchRuntimeViewStack('lgv-runtimeLogErrorView');

				// Disable runtime log backup download
				this._runtimeLogBackupUnavailable = true;
				this._disableBackupInterface(false);
			}
		}

		// Modified conversion pattern in the log4j properties file: unable to parse the log
		else if (command == this.RESP_RUNTIME_LOG_INVALID)
		{
			// Disable controls
			this._enableRuntimeLogControls(false);

			// Fill in error message
			$('#lgv-convPattName').text(data.getUtfString('param'));
			$('#lgv-convPattVal').text(data.getUtfString('value'));

			// Remove loading bar (runtime log)
			this._switchRuntimeViewStack('lgv-invConvPattView');
		}

		// Runtime log received
		else if (command == this.RESP_RUNTIME_LOG)
		{
			let classes = [];
			classes.push(this.ANY_CLASS);

			let logEntries = data.getUtfStringArray(this.LOG_DATA_LABEL);
			let separator = data.getUtfString('sep');
			let columns = data.getInt('cols');
			let dsArr = [];

			this._totalRuntimeLogEntries = logEntries.length;

			// Parse log entries
			// We can't use the split method because there could be instances of the separator in the log message too
			for (let e = 0; e < logEntries.length; e++)
			{
				const logEntry = logEntries[e];

				let logEntryData = [];
				let startIndex = 0;

				for (let c = 0; c < columns - 1; c++)
				{
					let endIndex = logEntry.indexOf(separator, startIndex);
					logEntryData.push(logEntry.substring(startIndex, endIndex));
					startIndex = endIndex + separator.length;
				}

				if (startIndex < logEntry.length)
					logEntryData.push(logEntry.substring(startIndex));

				// Fill datagrid's dataprovider
				let rle = _data_runtime_log_entry__WEBPACK_IMPORTED_MODULE_1__["RuntimeLogEntry"].fromArray(separator, logEntryData);
				dsArr.push(rle);

				// Add class to filtering dropdown
				if (classes.indexOf(rle.clazz) < 0)
					classes.push(rle.clazz);
			}

			// Show classes list
			classes.sort(function (a, b) {
				return a.localeCompare(b);
			});

			this._classFilterDD.setDataSource(classes);
			this._classFilterDD.select(0);

			// Assign data source to grid
			let ds = new kendo.data.DataSource({
				data: dsArr
			})

			this._setRuntimeLogDataSource(ds);

			// Re-enable log loading controls
			this._enableRuntimeLogControls(true);

			// Remove loading bar
			this._switchRuntimeViewStack('lgv-runtimeLogView');
		}

		// Boot log received
		else if (command == this.RESP_BOOT_LOG)
		{
			const bootLogEntries = data.getSFSArray(this.LOG_DATA_LABEL);
			let text = '';

			for (let i = 0; i < bootLogEntries.size(); i++)
				text += bootLogEntries.getUtfString(i) + '\n';

			$('#lgv-bootLogText').text(text);

			// Remove loading bar
			this._switchBootViewStack('lgv-bootLogView');
		}

		// Logs backups status received
		else if (command == this.RESP_BACKUPS_STATUS)
		{
			// Show/hide operation in progress message
			this._disableBackupInterface(data.getBool('running'), data.getUtfString('type'));

			// Backup files list
			if (data.containsKey('files'))
			{
				let files = data.getSFSArray('files');

				let lastBootLogBackupFound = false;
				let lastRuntimeLogBackupFound = false;
				let lastFullBackupFound = false;

				let backupsList = [];

				const webServerProtocol = (data.containsKey('protocol') ? data.getUtfString('protocol') : 'http') + '://';
				const webServerPort = (data.containsKey('port') ? ':' + data.getInt('port') : '');

				let totalSize = 0;

				for (let f = 0; f < files.size(); f++)
				{
					const file = files.getSFSObject(f);

					const filePath = file.getUtfString('path');

					const fileObj = {};
					fileObj.path = filePath;
					fileObj.url = webServerProtocol + this.smartFox.config.host + webServerPort + '/' + filePath;
					fileObj.name = filePath.substr(filePath.lastIndexOf('/') + 1);
					fileObj.date = file.getUtfString('date');
					fileObj.time = file.getUtfString('time');
					fileObj.size = Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["bytesToSize"])(file.getLong('size'), 2);

					totalSize += file.getLong('size');

					// Check if this is a boot log backup
					if (!lastBootLogBackupFound)
					{
						if (fileObj.name.startsWith(this.BOOT_LOG_BACKUP_ID))
						{
							this._fillBackupCard('#lgv-bootLogBackupCard', fileObj);

							lastBootLogBackupFound = true;
						}
					}

					// Check if this is a runtime log backup
					if (!lastRuntimeLogBackupFound)
					{
						if (fileObj.name.startsWith(this.RUNTIME_LOG_BACKUP_ID))
						{
							this._fillBackupCard('#lgv-runtimeLogBackupCard', fileObj);

							lastRuntimeLogBackupFound = true;
						}
					}

					// Check if this is a full backup
					if (!lastFullBackupFound)
					{
						if (fileObj.name.startsWith(this.FULL_BACKUP_ID))
						{
							this._fillBackupCard('#lgv-fullLogBackupCard', fileObj);

							lastFullBackupFound = true;
						}
					}

					// Populate logs list
					backupsList.push(fileObj);
				}

				// Show total backups size
				$('#lgv-logSizeLb').html(`Total size: <strong>${Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["bytesToSize"])(totalSize, 2, 'KB')}</strong>`);

		   		// Assign data source to grid
				this._setDownloadGridDataSource(backupsList);
				this._onDownloadGridSelectionChange();

				// Hide links to latest files if not available
				if (!lastBootLogBackupFound)
					this._fillBackupCard('#lgv-bootLogBackupCard', null);

				if (!lastRuntimeLogBackupFound)
					this._fillBackupCard('#lgv-runtimeLogBackupCard', null);

				if (!lastFullBackupFound)
					this._fillBackupCard('#lgv-fullLogBackupCard', null);

				if (data.containsKey('message'))
				{
					// Display notification
					this.shellCtrl.showNotification(`Log backup warning`, data.getUtfString('message'));
				}
			}

			// Set download view to main
			this._switchDownloadViewStack('lgv-downloadView');
		}

		// Logs backup deletion failed
		else if (command == this.RESP_DELETE_BACKUP_FAILED)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);
		}

		// A blocking error occurred during backup operation
		else if (command == this.RESP_BACKUP_ERROR)
		{
			const error = data.getUtfString('error');

			// Show an alert
			this.shellCtrl.showSimpleAlert(error, true);
		}

		// An non-blocking error occurred during backup operation
		else if (command == this.RESP_BACKUP_WARNING)
		{
			let warn = data.getUtfString('warn');

			// Display notification
			this.shellCtrl.showNotification(`Log backup warning`, warn);
		}
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onTabShown(e)
	{
		if (!this._initFailed)
		{
			// If boot log view was displayed...
			if (e.target.id == 'lgv-bootLog-tab')
			{
				// Load boot log the first time the tab is selected
				if (!this._bootLogRequested)
				{
					this.sendExtensionRequest(this.REQ_GET_BOOT_LOG);
					this._bootLogRequested = true;
				}
			}

			// If backup&dowload view was displayed...
			else if (e.target.id == 'lgv-logsDownload-tab')
			{
				// Request logs backup status the first time the tab is selected
				if (!this._backupStatusRequested)
				{
					this.sendExtensionRequest(this.REQ_GET_BACKUPS_STATUS);
					this._backupStatusRequested = true;
				}
			}
		}
	}

	_onRuntimeLogLoadBtClick()
	{
		// Request log
		this._loadRuntimeLog();
	}

	_onExportBootLogBtClick()
	{
		// Export log to file
		this._exportLog($('#lgv-bootLogText').text(), this.BOOT_LOG_BACKUP_ID);
	}

	_onSwitchBootLogColorBtClick()
	{
		if ($('#lgv-bootLogText').hasClass('invert'))
			$('#lgv-bootLogText').removeClass('invert');
		else
			$('#lgv-bootLogText').addClass('invert');
	}

	_onBootLogGenerateBtClick()
	{
		// Show/hide operation in progress message
		this._disableBackupInterface(true, this.BOOT_LOG_BACKUP_ID);

		// Request backup generation
		this.sendExtensionRequest(this.REQ_BACKUP_BOOT_LOG);
	}

	_onRuntimeLogGenerateBtClick()
	{
		// Show/hide operation in progress message
		this._disableBackupInterface(true, this.RUNTIME_LOG_BACKUP_ID);

		// Request backup generation
		this.sendExtensionRequest(this.REQ_BACKUP_RUNTIME_LOG);
	}

	_onFullLogsGenerateBtClick()
	{
		// Show/hide operation in progress message
		this._disableBackupInterface(true, this.FULL_BACKUP_ID);

		// Request backup generation
		this.sendExtensionRequest(this.REQ_BACKUP_FULL_LOGS);
	}

	_onFilterChange()
	{
		// Set filters
		this._setRuntimeLogDataSource(this._runtimeLogGrid.dataSource);
	}

	_onClearFilterClick()
	{
		this._clearRuntimeLogFilters();
		this._setRuntimeLogDataSource(this._runtimeLogGrid.dataSource);
	}

	_onExportRuntimeLogBtClick()
	{
		let log = '';
		const entries = this._runtimeLogGrid.dataSource.view();

		for (let i = 0; i < entries.length; i++)
		{
			const item = entries[i];
			log += [item.date, item.time, item.level, item.thread, item.clazz, item.message].join(item.sep) + '\n';
		}

		// Export log to file
		this._exportLog(log, this.RUNTIME_LOG_BACKUP_ID);
	}

	_onDownloadGridSelectionChange()
	{
		// Enable/disable buttons
		const selectedRows = this._downloadGrid.select();
		$('#lgv-downloadBt').attr('disabled', selectedRows.length == 0);
		$('#lgv-deleteBt').attr('disabled', selectedRows.length == 0);

		if (selectedRows.length > 0)
		{
			let dataItem = this._downloadGrid.dataItem(selectedRows[0]);
			$('#lgv-downloadBt').attr('href', dataItem.url);
		}
		else
			$('#lgv-downloadBt').attr('href', '#');
	}

	_onDeleteBtClick()
	{
		let selectedRows = this._downloadGrid.select();

		if (selectedRows.length > 0)
		{
			let dataItem = this._downloadGrid.dataItem(selectedRows[0]);

			// Request backup deletion
			let params = new SFS2X.SFSObject();
			params.putUtfString('file', dataItem.name);

			this.sendExtensionRequest(this.REQ_DELETE_BACKUP, params);
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_switchRuntimeViewStack(viewId)
	{
		document.getElementById('lgv-runtime-viewstack').selectedElement = document.getElementById(viewId);
	}

	_switchBootViewStack(viewId)
	{
		document.getElementById('lgv-boot-viewstack').selectedElement = document.getElementById(viewId);
	}

	_switchDownloadViewStack(viewId)
	{
		document.getElementById('lgv-download-viewstack').selectedElement = document.getElementById(viewId);
	}

	_enableRuntimeLogControls(enable)
	{
		$('#lgv-loadBt').attr('disabled', !enable);
		$('#lgv-exportRuntimeLogBt').attr('disabled', !enable);
		$('#lgv-filterBt').attr('disabled', !enable);
	}

	_loadRuntimeLog()
	{
		// Disable controls to load log, so that impatient users can't send multiple requests
		// (it will be enabled again when a response is received)
		this._enableRuntimeLogControls(false);

		// Clear filters
		this._clearRuntimeLogFilters();

		// Show loading bar
		this._switchRuntimeViewStack('lgv-runtimeLogLoadingView');

		// Send request
		// (the number of lines to be retrieved is sent)
		let params = new SFS2X.SFSObject();
		params.putInt('numEntries', Number(this._logLinesDD.value()));

		this.sendExtensionRequest(this.REQ_GET_RUNTIME_LOG, params);
	}

	_clearRuntimeLogFilters()
	{
		this._levelFilterDD.select(0);
		this._classFilterDD.select(0);
		$('#lgv-messageIn').val('');
	}

	_exportLog(log, name)
	{
		let blob = new Blob([log], {type: "text/plain;charset=utf-8"});
		let date = moment__WEBPACK_IMPORTED_MODULE_3__().format('YYYYMMDD_HHmmss');

		file_saver__WEBPACK_IMPORTED_MODULE_2__["saveAs"](blob, `${name}_${date}.log`);
	}

	_setRuntimeLogDataSource(ds)
	{
		// Read current horizontal scroll value
		const scrollLeft = $('#lgv-runtimeLogGrid .k-grid-content', this._runtimeLogGrid.wrapper).scrollLeft();

		// Assign data source to grid
		this._runtimeLogGrid.setDataSource(ds);

		// Set filters
		this._setFilters(ds);

		// Set horizontal scroll
		$('#lgv-runtimeLogGrid .k-grid-content', this._runtimeLogGrid.wrapper).scrollLeft(scrollLeft);

		// Update counter
		$('#lgv-runtimeLogEntriesLb').text(`Log entries: ${this._totalRuntimeLogEntries} (${ds.total()} displayed)`);
	}

	_setFilters(ds)
	{
		let filters = [];

		// Level filtering
		if (this._levelFilterDD.select() > 0)
			filters.push({
				field: 'level', operator: 'eq', value: this._levelFilterDD.value()
			});

		// Class filtering
		if (this._classFilterDD.select() > 0)
			filters.push({
				field: 'clazz', operator: 'eq', value: this._classFilterDD.value()
			});

		// Message filtering
		if ($('#lgv-messageIn').val() != '')
			filters.push({
				field: 'message', operator: 'contains', value: $('#lgv-messageIn').val()
			});

		// Set filters
		ds.filter(filters);
	}

	_disableBackupInterface(disable, backupId = null)
	{
		if (disable)
		{
			// Show proper progress bar
			if (backupId == this.BOOT_LOG_BACKUP_ID)
				$('#lgv-bootLogBackupCard .progress-bar').show();
			else if (backupId == this.RUNTIME_LOG_BACKUP_ID)
				$('#lgv-runtimeLogBackupCard .progress-bar').show();
			else if (backupId == this.FULL_BACKUP_ID)
				$('#lgv-fullLogBackupCard .progress-bar').show();

			// Disable buttons
			$('#lgv-bootLogBackupCard .backup-button').attr('disabled', true);
			$('#lgv-runtimeLogBackupCard .backup-button').attr('disabled', true);
			$('#lgv-fullLogBackupCard .backup-button').attr('disabled', true);
		}
		else
		{
			// Hide all progress bar
			$('.card-body .progress-bar').hide();

			// Enable buttons
			$('#lgv-fullLogBackupCard .backup-button').attr('disabled', false);

			if (!this._bootLogBackupUnavailable)
				$('#lgv-bootLogBackupCard .backup-button').attr('disabled', false);

			if (!this._runtimeLogBackupUnavailable)
				$('#lgv-runtimeLogBackupCard .backup-button').attr('disabled', false);
		}
	}

	_initBackupCard(idSelector)
	{
		$(idSelector + ' .backup-details').hide();
		$(idSelector + ' .progress-bar').hide();
	}

	_fillBackupCard(idSelector, detailsObj = null)
	{
		if (detailsObj == null)
			$(idSelector + ' .backup-details').hide();
		else
		{
			$(idSelector + ' .backup-details').show();

			$(idSelector + ' .backup-link').attr('href', detailsObj.url);
			$(idSelector + ' .backup-date').text(detailsObj.date);
			$(idSelector + ' .backup-time').text(detailsObj.time);
			$(idSelector + ' .backup-size').text(detailsObj.size);
		}
	}

	_setDownloadGridDataSource(ds)
	{
		// Read current horizontal scroll value
	   const scrollLeft = $('#lgv-downloadGrid .k-grid-content', this._downloadGrid.wrapper).scrollLeft();

	   // Assign data source to grid
	   this._downloadGrid.setDataSource(ds);

	   // Set horizontal scroll
	   $('#lgv-downloadGrid .k-grid-content', this._downloadGrid.wrapper).scrollLeft(scrollLeft);
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTIuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9ub2RlX21vZHVsZXMvZmlsZS1zYXZlci9kaXN0L0ZpbGVTYXZlci5taW4uanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2RhdGEvcnVudGltZS1sb2ctZW50cnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9sb2ctdmlld2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihhLGIpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyliKCk7ZWxzZXtiKCksYS5GaWxlU2F2ZXI9e2V4cG9ydHM6e319LmV4cG9ydHN9fSkodGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGIoYSxiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT10eXBlb2YgYj9iPXthdXRvQm9tOiExfTpcIm9iamVjdFwiIT10eXBlb2YgYiYmKGNvbnNvbGUud2FybihcIkRlcHJlY2F0ZWQ6IEV4cGVjdGVkIHRoaXJkIGFyZ3VtZW50IHRvIGJlIGEgb2JqZWN0XCIpLGI9e2F1dG9Cb206IWJ9KSxiLmF1dG9Cb20mJi9eXFxzKig/OnRleHRcXC9cXFMqfGFwcGxpY2F0aW9uXFwveG1sfFxcUypcXC9cXFMqXFwreG1sKVxccyo7LipjaGFyc2V0XFxzKj1cXHMqdXRmLTgvaS50ZXN0KGEudHlwZSk/bmV3IEJsb2IoW1wiXFx1RkVGRlwiLGFdLHt0eXBlOmEudHlwZX0pOmF9ZnVuY3Rpb24gYyhiLGMsZCl7dmFyIGU9bmV3IFhNTEh0dHBSZXF1ZXN0O2Uub3BlbihcIkdFVFwiLGIpLGUucmVzcG9uc2VUeXBlPVwiYmxvYlwiLGUub25sb2FkPWZ1bmN0aW9uKCl7YShlLnJlc3BvbnNlLGMsZCl9LGUub25lcnJvcj1mdW5jdGlvbigpe2NvbnNvbGUuZXJyb3IoXCJjb3VsZCBub3QgZG93bmxvYWQgZmlsZVwiKX0sZS5zZW5kKCl9ZnVuY3Rpb24gZChhKXt2YXIgYj1uZXcgWE1MSHR0cFJlcXVlc3Q7Yi5vcGVuKFwiSEVBRFwiLGEsITEpO3RyeXtiLnNlbmQoKX1jYXRjaChhKXt9cmV0dXJuIDIwMDw9Yi5zdGF0dXMmJjI5OT49Yi5zdGF0dXN9ZnVuY3Rpb24gZShhKXt0cnl7YS5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIikpfWNhdGNoKGMpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTW91c2VFdmVudHNcIik7Yi5pbml0TW91c2VFdmVudChcImNsaWNrXCIsITAsITAsd2luZG93LDAsMCwwLDgwLDIwLCExLCExLCExLCExLDAsbnVsbCksYS5kaXNwYXRjaEV2ZW50KGIpfX12YXIgZj1cIm9iamVjdFwiPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cud2luZG93PT09d2luZG93P3dpbmRvdzpcIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZj9zZWxmOlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWw/Z2xvYmFsOnZvaWQgMCxhPWYuc2F2ZUFzfHwoXCJvYmplY3RcIiE9dHlwZW9mIHdpbmRvd3x8d2luZG93IT09Zj9mdW5jdGlvbigpe306XCJkb3dubG9hZFwiaW4gSFRNTEFuY2hvckVsZW1lbnQucHJvdG90eXBlP2Z1bmN0aW9uKGIsZyxoKXt2YXIgaT1mLlVSTHx8Zi53ZWJraXRVUkwsaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtnPWd8fGIubmFtZXx8XCJkb3dubG9hZFwiLGouZG93bmxvYWQ9ZyxqLnJlbD1cIm5vb3BlbmVyXCIsXCJzdHJpbmdcIj09dHlwZW9mIGI/KGouaHJlZj1iLGoub3JpZ2luPT09bG9jYXRpb24ub3JpZ2luP2Uoaik6ZChqLmhyZWYpP2MoYixnLGgpOmUoaixqLnRhcmdldD1cIl9ibGFua1wiKSk6KGouaHJlZj1pLmNyZWF0ZU9iamVjdFVSTChiKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aS5yZXZva2VPYmplY3RVUkwoai5ocmVmKX0sNEU0KSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShqKX0sMCkpfTpcIm1zU2F2ZU9yT3BlbkJsb2JcImluIG5hdmlnYXRvcj9mdW5jdGlvbihmLGcsaCl7aWYoZz1nfHxmLm5hbWV8fFwiZG93bmxvYWRcIixcInN0cmluZ1wiIT10eXBlb2YgZiluYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihiKGYsaCksZyk7ZWxzZSBpZihkKGYpKWMoZixnLGgpO2Vsc2V7dmFyIGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7aS5ocmVmPWYsaS50YXJnZXQ9XCJfYmxhbmtcIixzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZShpKX0pfX06ZnVuY3Rpb24oYSxiLGQsZSl7aWYoZT1lfHxvcGVuKFwiXCIsXCJfYmxhbmtcIiksZSYmKGUuZG9jdW1lbnQudGl0bGU9ZS5kb2N1bWVudC5ib2R5LmlubmVyVGV4dD1cImRvd25sb2FkaW5nLi4uXCIpLFwic3RyaW5nXCI9PXR5cGVvZiBhKXJldHVybiBjKGEsYixkKTt2YXIgZz1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiPT09YS50eXBlLGg9L2NvbnN0cnVjdG9yL2kudGVzdChmLkhUTUxFbGVtZW50KXx8Zi5zYWZhcmksaT0vQ3JpT1NcXC9bXFxkXSsvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7aWYoKGl8fGcmJmgpJiZcIm9iamVjdFwiPT10eXBlb2YgRmlsZVJlYWRlcil7dmFyIGo9bmV3IEZpbGVSZWFkZXI7ai5vbmxvYWRlbmQ9ZnVuY3Rpb24oKXt2YXIgYT1qLnJlc3VsdDthPWk/YTphLnJlcGxhY2UoL15kYXRhOlteO10qOy8sXCJkYXRhOmF0dGFjaG1lbnQvZmlsZTtcIiksZT9lLmxvY2F0aW9uLmhyZWY9YTpsb2NhdGlvbj1hLGU9bnVsbH0sai5yZWFkQXNEYXRhVVJMKGEpfWVsc2V7dmFyIGs9Zi5VUkx8fGYud2Via2l0VVJMLGw9ay5jcmVhdGVPYmplY3RVUkwoYSk7ZT9lLmxvY2F0aW9uPWw6bG9jYXRpb24uaHJlZj1sLGU9bnVsbCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ay5yZXZva2VPYmplY3RVUkwobCl9LDRFNCl9fSk7Zi5zYXZlQXM9YS5zYXZlQXM9YSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYobW9kdWxlLmV4cG9ydHM9YSl9KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsZVNhdmVyLm1pbi5qcy5tYXAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJleHBvcnQgY2xhc3MgUnVudGltZUxvZ0VudHJ5XG57XG5cdGNvbnN0cnVjdG9yKHNlcGFyYXRvcilcblx0e1xuXHRcdHRoaXMuc2VwID0gc2VwYXJhdG9yXG5cdH1cblxuXHRzdGF0aWMgZnJvbUFycmF5KHNlcGFyYXRvciwgbG9nRW50cnlEYXRhKVxuXHR7XG5cdFx0bGV0IHJsZSA9IG5ldyBSdW50aW1lTG9nRW50cnkoc2VwYXJhdG9yKTtcblxuXHRcdHJsZS5kYXRlID0gbG9nRW50cnlEYXRhWzBdO1xuXHRcdHJsZS50aW1lID0gbG9nRW50cnlEYXRhWzFdO1xuXHRcdHJsZS5kYXRlVGltZSA9IHJsZS5fZ2V0RGF0ZVRpbWUoKTtcblx0XHRybGUubGV2ZWwgPSBsb2dFbnRyeURhdGFbMl0udHJpbSgpO1xuXHRcdHJsZS50aHJlYWQgPSBsb2dFbnRyeURhdGFbM107XG5cdFx0cmxlLmNsYXp6ID0gbG9nRW50cnlEYXRhWzRdO1xuXHRcdHJsZS5tZXNzYWdlID0gbG9nRW50cnlEYXRhWzZdO1xuXG5cdFx0cmV0dXJuIHJsZTtcblx0fVxuXG5cdF9nZXREYXRlVGltZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5kYXRlICsgJ1xcbicgKyB0aGlzLnRpbWU7XG5cdH1cbn1cbiIsImltcG9ydCB7QmFzZU1vZHVsZX0gZnJvbSAnLi9iYXNlLW1vZHVsZSc7XG5pbXBvcnQge1J1bnRpbWVMb2dFbnRyeX0gZnJvbSAnLi4vZGF0YS9ydW50aW1lLWxvZy1lbnRyeSc7XG5pbXBvcnQgKiBhcyBGaWxlU2F2ZXIgZnJvbSAnZmlsZS1zYXZlcic7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7Ynl0ZXNUb1NpemV9IGZyb20gJy4uL3V0aWxzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ1ZpZXdlciBleHRlbmRzIEJhc2VNb2R1bGVcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcignbG9nVmlld2VyJyk7XG5cblx0XHR0aGlzLkNPTU1BTkRTX1BSRUZJWCA9ICdsb2dWaWV3ZXInO1xuXHRcdHRoaXMuSEVMUF9VUkwgPSAnL2FkbWludG9vbC1Mb2dWaWV3ZXInO1xuXG5cdFx0dGhpcy5BTllfTEVWRUwgPSAnW2FueV0nO1xuXHRcdHRoaXMuTEVWRUxTID0gWydUUkFDRScsJ0RFQlVHJywnSU5GTycsJ1dBUk4nLCdFUlJPUiddO1xuXHRcdHRoaXMuQU5ZX0NMQVNTID0gJ1thbnldJztcblxuXHRcdHRoaXMuTE9HX0RBVEFfTEFCRUwgPSAnbGluZXMnO1xuXG5cdFx0dGhpcy5CT09UX0xPR19CQUNLVVBfSUQgPSAnU0ZTMlhfQm9vdExvZyc7XG5cdFx0dGhpcy5SVU5USU1FX0xPR19CQUNLVVBfSUQgPSAnU0ZTMlhfUnVudGltZUxvZyc7XG5cdFx0dGhpcy5GVUxMX0JBQ0tVUF9JRCA9ICdTRlMyWF9Mb2dzJztcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfR0VUX1JVTlRJTUVfTE9HID0gJ2dldFJ1bkxvZyc7XG5cdFx0dGhpcy5SRVFfR0VUX0JPT1RfTE9HID0gJ2dldEJvb3RMb2cnO1xuXHRcdHRoaXMuUkVRX0dFVF9CQUNLVVBTX1NUQVRVUyA9ICdnZXRCYWtTdGF0dXMnO1xuXHRcdHRoaXMuUkVRX0JBQ0tVUF9CT09UX0xPRyA9ICdiYWtCb290TG9nJztcblx0XHR0aGlzLlJFUV9CQUNLVVBfUlVOVElNRV9MT0cgPSAnYmFrUnVuTG9nJztcblx0XHR0aGlzLlJFUV9CQUNLVVBfRlVMTF9MT0dTID0gJ2Jha0Z1bGxMb2dzJztcblx0XHR0aGlzLlJFUV9ERUxFVEVfQkFDS1VQID0gJ2RlbEJhY2t1cCc7XG5cblx0XHQvLyBJbmNvbWluZyByZXNwb25zZXNcblx0XHR0aGlzLlJFU1BfSU5JVF9FUlJPUiA9ICdpbml0RXJyJztcblx0XHR0aGlzLlJFU1BfUlVOVElNRV9MT0dfRVJST1IgPSAncnVuTG9nRXJyJztcblx0XHR0aGlzLlJFU1BfUlVOVElNRV9MT0dfSU5WQUxJRCA9ICdydW5Mb2dJbnYnO1xuXHRcdHRoaXMuUkVTUF9SVU5USU1FX0xPRyA9ICdydW5Mb2cnO1xuXHRcdHRoaXMuUkVTUF9CT09UX0xPR19FUlJPUiA9ICdib290TG9nRXJyJztcblx0XHR0aGlzLlJFU1BfQk9PVF9MT0cgPSAnYm9vdExvZyc7XG5cdFx0dGhpcy5SRVNQX0JBQ0tVUFNfU1RBVFVTID0gJ2Jha1N0YXR1cyc7XG5cdFx0dGhpcy5SRVNQX0RFTEVURV9CQUNLVVBfRkFJTEVEID0gJ2RlbEJha0ZhaWwnO1xuXHRcdHRoaXMuUkVTUF9CQUNLVVBfRVJST1IgPSAnYmFrRXJyb3InO1xuXHRcdHRoaXMuUkVTUF9CQUNLVVBfV0FSTklORyA9ICdiYWtXYXJuJztcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIENPTU1PTiBNT0RVTEUgSU5URVJGQUNFIE1FVEhPRFNcblx0Ly8gVGhpcyBtZW1iZXJzIGFyZSB1c2VkIGJ5IHRoZSBtYWluIGNvbnRyb2xsZXJcblx0Ly8gdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgbW9kdWxlJ3MgY29udHJvbGxlci5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIEluaXRpYWxpemUgc2Nyb2xsaW5nIHRhYnNcblx0XHQkKCcjbGd2LXRhYk5hdmlnYXRvciA+ICN0YWJzJykuc2Nyb2xsaW5nVGFicyh7XG5cdFx0XHRib290c3RyYXBWZXJzaW9uOiA0LFxuXHRcdFx0c2Nyb2xsVG9UYWJFZGdlOiB0cnVlLFxuXHRcdFx0ZW5hYmxlU3dpcGluZzogdHJ1ZSxcblx0XHRcdGRpc2FibGVTY3JvbGxBcnJvd3NPbkZ1bGx5U2Nyb2xsZWQ6IHRydWUsXG5cdFx0XHRjc3NDbGFzc0xlZnRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tbGVmdCcsXG5cdFx0XHRjc3NDbGFzc1JpZ2h0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLXJpZ2h0J1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIHRhYiBzaG93biBldmVudFxuXHRcdCQoJ2FbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKS5vbignc2hvd24uYnMudGFiJywgJC5wcm94eSh0aGlzLl9vblRhYlNob3duLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGxvZyBsaW5lcyBkcm9wZG93blxuXHRcdHRoaXMuX2xvZ0xpbmVzREQgPSAkKCcjbGd2LWxvZ0xpbmVzREQnKS5rZW5kb0Ryb3BEb3duTGlzdCh7XG5cdFx0XHR2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJ0ZXh0LW11dGVkIHByLTFcIj5Mb2cgZW50cmllczo8L3NwYW4+PHNwYW4+IzpkYXRhLnRleHQjPC9zcGFuPicsXG5cdFx0fSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgbG9hZCBidXR0b25cblx0XHQkKCcjbGd2LWxvYWRCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SdW50aW1lTG9nTG9hZEJ0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyc1xuXHRcdCQoJy5wcm9ncmVzcy1iYXInKS5rZW5kb1Byb2dyZXNzQmFyKHtcblx0XHRcdG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMTAwLFxuXHRcdFx0dmFsdWU6IGZhbHNlLFxuICAgICAgICAgICAgdHlwZTogJ3ZhbHVlJyxcbiAgICAgICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGxldmVsIGZpbHRlciBkcm9wZG93blxuXHRcdHRoaXMuX2xldmVsRmlsdGVyREQgPSAkKCcjbGd2LWxldmVsREQnKS5rZW5kb0Ryb3BEb3duTGlzdCh7XG5cdFx0XHRkYXRhU291cmNlOiBbdGhpcy5BTllfTEVWRUxdLmNvbmNhdCh0aGlzLkxFVkVMUyksXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25GaWx0ZXJDaGFuZ2UsIHRoaXMpXG5cdFx0fSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgY2xhc3MgZmlsdGVyIGRyb3Bkb3duXG5cdFx0dGhpcy5fY2xhc3NGaWx0ZXJERCA9ICQoJyNsZ3YtY2xhc3NERCcpLmtlbmRvRHJvcERvd25MaXN0KHtcblx0XHRcdGNoYW5nZTogJC5wcm94eSh0aGlzLl9vbkZpbHRlckNoYW5nZSwgdGhpcylcblx0XHR9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBtZXNzYWdlIGZpbHRlciBpbnB1dFxuXHRcdCQoJyNsZ3YtbWVzc2FnZUluJykub24oJ2lucHV0JywgJC5wcm94eSh0aGlzLl9vbkZpbHRlckNoYW5nZSwgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBjbGVhciBidXR0b25cblx0XHQkKCcjbGd2LWNsZWFyRmlsdGVyQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uQ2xlYXJGaWx0ZXJDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBleHBvcnQgYnV0dG9uXG5cdFx0JCgnI2xndi1leHBvcnRSdW50aW1lTG9nQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRXhwb3J0UnVudGltZUxvZ0J0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcnVudGltZSBsb2cgZ3JpZFxuXHRcdHRoaXMuX3J1bnRpbWVMb2dHcmlkID0gJCgnI2xndi1ydW50aW1lTG9nR3JpZCcpLmtlbmRvR3JpZCh7XG5cdFx0XHRzY3JvbGxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgc29ydGFibGU6IGZhbHNlLFxuXHRcdFx0Ly9yZXNpemFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbHVtbnM6XG4gICAgICAgICAgICBbXG5cdFx0XHRcdHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnZGF0ZVRpbWUnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDE1MCxcblx0XHRcdFx0XHR0aXRsZTogJ0RhdGUvVGltZScsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnbGV2ZWwnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcblx0ICAgICAgICAgICAgICAgIHRpdGxlOiAnTGV2ZWwnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3RocmVhZCcsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxuXHQgICAgICAgICAgICAgICAgdGl0bGU6ICdUaHJlYWQnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ2NsYXp6Jyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAyNTAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ0NsYXNzJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdFx0e1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdtZXNzYWdlJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAwLFxuXHRcdFx0XHRcdHRpdGxlOiAnTWVzc2FnZScsXG5cdCAgICAgICAgICAgIH0sXG5cdFx0XHRdLFxuXHRcdFx0bm9SZWNvcmRzOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiAnTm8gbG9nIGVudHJpZXMgdG8gZGlzcGxheS4nXG5cdFx0XHR9LFxuXHRcdFx0ZGF0YVNvdXJjZTogW11cbiAgICAgICAgfSkuZGF0YSgna2VuZG9HcmlkJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGJvb3QgbG9nIHZpZXcgYnV0dG9uc1xuXHRcdCQoJyNsZ3YtZXhwb3J0Qm9vdExvZ0J0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkV4cG9ydEJvb3RMb2dCdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2xndi1zd2l0Y2hCb290TG9nQ29sb3JCdCcpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25Td2l0Y2hCb290TG9nQ29sb3JCdENsaWNrLCB0aGlzKSk7XG5cblx0XHQvLyBJbml0aWFsaXplIGdlbmVyYXRlIGJhY2t1cCBidXR0b25zXG5cdFx0JCgnI2xndi1ib290TG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25Cb290TG9nR2VuZXJhdGVCdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25SdW50aW1lTG9nR2VuZXJhdGVCdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2xndi1mdWxsTG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25GdWxsTG9nc0dlbmVyYXRlQnRDbGljaywgdGhpcykpO1xuXG5cdFx0dGhpcy5faW5pdEJhY2t1cENhcmQoJyNsZ3YtYm9vdExvZ0JhY2t1cENhcmQnKTtcblx0XHR0aGlzLl9pbml0QmFja3VwQ2FyZCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCcpO1xuXHRcdHRoaXMuX2luaXRCYWNrdXBDYXJkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGRvd25sb2FkIGdyaWRcblx0XHR0aGlzLl9kb3dubG9hZEdyaWQgPSAkKCcjbGd2LWRvd25sb2FkR3JpZCcpLmtlbmRvR3JpZCh7XG5cdFx0XHRzY3JvbGxhYmxlOiB0cnVlLFxuICAgICAgICAgICAgc29ydGFibGU6IHRydWUsXG5cdFx0XHQvL3Jlc2l6YWJsZTogdHJ1ZSxcblx0XHRcdHNlbGVjdGFibGU6ICdyb3cnLFxuICAgICAgICAgICAgY29sdW1uczpcbiAgICAgICAgICAgIFtcblx0XHRcdFx0e1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdkYXRlJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdFx0XHRcdFx0dGl0bGU6ICdEYXRlJyxcblx0ICAgICAgICAgICAgfSxcblx0ICAgICAgICAgICAge1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICd0aW1lJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ1RpbWUnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ25hbWUnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDMwMCxcblx0ICAgICAgICAgICAgICAgIHRpdGxlOiAnRmlsZW5hbWUnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3NpemUnLFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcblx0ICAgICAgICAgICAgICAgIHRpdGxlOiAnU2l6ZScsXG5cdCAgICAgICAgICAgIH0sXG5cdFx0XHRdLFxuXHRcdFx0bm9SZWNvcmRzOiB7XG5cdFx0XHRcdHRlbXBsYXRlOiAnTm8gYmFja3VwcyBhdmFpbGFibGUuJ1xuXHRcdFx0fSxcblx0XHRcdGNoYW5nZTogJC5wcm94eSh0aGlzLl9vbkRvd25sb2FkR3JpZFNlbGVjdGlvbkNoYW5nZSwgdGhpcyksXG5cdFx0XHRkYXRhU291cmNlOiBbXVxuICAgICAgICB9KS5kYXRhKCdrZW5kb0dyaWQnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZGVsZXRlIGJ1dHRvblxuXHRcdCQoJyNsZ3YtZGVsZXRlQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRGVsZXRlQnRDbGljaywgdGhpcykpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdC8vIFJlbW92ZSBsaXN0ZW5lciB0byB0YWIgc2hvd24gZXZlbnRcblx0XHQkKCdhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJykub2ZmKCdzaG93bi5icy50YWInKTtcblxuXHRcdC8vIERlc3Ryb3kgc2Nyb2xsaW5nIHRhYnNcblx0XHQkKCcjbGd2LXRhYk5hdmlnYXRvciAjdGFicycpLnNjcm9sbGluZ1RhYnMoJ2Rlc3Ryb3knKTtcblxuXHRcdC8vIFJlbW92ZSBjbGljayBsaXN0ZW5lcnNcblx0XHQkKCcjbGd2LWxvYWRCdCcpLm9mZignY2xpY2snKTtcblx0XHQkKCcjbGd2LWV4cG9ydEJvb3RMb2dCdCcpLm9mZignY2xpY2snKTtcblx0XHQkKCcjbGd2LXN3aXRjaEJvb3RMb2dDb2xvckJ0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNsZ3YtYm9vdExvZ0JhY2t1cENhcmQgLmJhY2t1cC1idXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjbGd2LWNsZWFyRmlsdGVyQnQnKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI2xndi1kZWxldGVCdCcpLm9mZignY2xpY2snKTtcblxuXHRcdCQoJyNsZ3YtbWVzc2FnZUluJykub2ZmKCdpbnB1dCcpO1xuXHR9XG5cblx0b25FeHRlbnNpb25Db21tYW5kKGNvbW1hbmQsIGRhdGEpXG5cdHtcblx0XHQvLyBFcnJvciBkdXJpbmcgaW5pdGlhbGl6YXRpb24gKHVuYWJsZSB0byBhY2Nlc3MgbG9nNGogY29uZmlndXJhdGlvbiBmaWxlKVxuXHRcdGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9JTklUX0VSUk9SKVxuXHRcdHtcblx0XHRcdGNvbnN0IGVycm9yID0gZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyk7XG5cblx0XHRcdC8vIFNob3cgYW4gYWxlcnRcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChlcnJvciwgdHJ1ZSk7XG5cblx0XHRcdC8vIFNldCBhbGwgdGFicyB0byBzaG93IGVycm9yc1xuXHRcdFx0dGhpcy5fc3dpdGNoQm9vdFZpZXdTdGFjaygnbGd2LWJvb3RMb2dFcnJvclZpZXcnKTtcblx0XHRcdHRoaXMuX3N3aXRjaFJ1bnRpbWVWaWV3U3RhY2soJ2xndi1ydW50aW1lTG9nRXJyb3JWaWV3Jyk7XG5cdFx0XHR0aGlzLl9zd2l0Y2hEb3dubG9hZFZpZXdTdGFjaygnbGd2LWRvd25sb2FkRXJyb3JWaWV3Jyk7XG5cblx0XHRcdC8vIERpc2FibGUgcnVudGltZSBsb2cgY29udHJvbHNcblx0XHRcdHRoaXMuX2VuYWJsZVJ1bnRpbWVMb2dDb250cm9scyhmYWxzZSk7XG5cblx0XHRcdHRoaXMuX2luaXRGYWlsZWQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIEVycm9yIHJlc3BvbnNlc1xuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0JPT1RfTE9HX0VSUk9SIHx8IGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JVTlRJTUVfTE9HX0VSUk9SKVxuXHRcdHtcblx0XHRcdGNvbnN0IGVycm9yID0gZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyk7XG5cblx0XHRcdC8vIFNob3cgYW4gYWxlcnRcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChlcnJvciwgdHJ1ZSk7XG5cblx0XHRcdGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9CT09UX0xPR19FUlJPUilcblx0XHRcdHtcblx0XHRcdFx0Ly8gU2V0IHRhYiB0byBzaG93IGVycm9yXG5cdFx0XHRcdHRoaXMuX3N3aXRjaEJvb3RWaWV3U3RhY2soJ2xndi1ib290TG9nRXJyb3JWaWV3Jyk7XG5cblx0XHRcdFx0Ly8gRGlzYWJsZSBib290IGxvZyBiYWNrdXAgZ2VuZXJhdGlvblxuXHRcdFx0XHR0aGlzLl9ib290TG9nQmFja3VwVW5hdmFpbGFibGUgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9kaXNhYmxlQmFja3VwSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdFx0XHR0aGlzLl9ib290TG9nUmVxdWVzdGVkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JVTlRJTUVfTE9HX0VSUk9SKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNhYmxlIGNvbnRyb2xzXG5cdFx0XHRcdHRoaXMuX2VuYWJsZVJ1bnRpbWVMb2dDb250cm9scyhmYWxzZSk7XG5cblx0XHRcdFx0Ly8gUmVtb3ZlIGxvYWRpbmcgYmFyIChydW50aW1lIGxvZylcblx0XHRcdFx0dGhpcy5fc3dpdGNoUnVudGltZVZpZXdTdGFjaygnbGd2LXJ1bnRpbWVMb2dFcnJvclZpZXcnKTtcblxuXHRcdFx0XHQvLyBEaXNhYmxlIHJ1bnRpbWUgbG9nIGJhY2t1cCBkb3dubG9hZFxuXHRcdFx0XHR0aGlzLl9ydW50aW1lTG9nQmFja3VwVW5hdmFpbGFibGUgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9kaXNhYmxlQmFja3VwSW50ZXJmYWNlKGZhbHNlKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBNb2RpZmllZCBjb252ZXJzaW9uIHBhdHRlcm4gaW4gdGhlIGxvZzRqIHByb3BlcnRpZXMgZmlsZTogdW5hYmxlIHRvIHBhcnNlIHRoZSBsb2dcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9SVU5USU1FX0xPR19JTlZBTElEKVxuXHRcdHtcblx0XHRcdC8vIERpc2FibGUgY29udHJvbHNcblx0XHRcdHRoaXMuX2VuYWJsZVJ1bnRpbWVMb2dDb250cm9scyhmYWxzZSk7XG5cblx0XHRcdC8vIEZpbGwgaW4gZXJyb3IgbWVzc2FnZVxuXHRcdFx0JCgnI2xndi1jb252UGF0dE5hbWUnKS50ZXh0KGRhdGEuZ2V0VXRmU3RyaW5nKCdwYXJhbScpKTtcblx0XHRcdCQoJyNsZ3YtY29udlBhdHRWYWwnKS50ZXh0KGRhdGEuZ2V0VXRmU3RyaW5nKCd2YWx1ZScpKTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGxvYWRpbmcgYmFyIChydW50aW1lIGxvZylcblx0XHRcdHRoaXMuX3N3aXRjaFJ1bnRpbWVWaWV3U3RhY2soJ2xndi1pbnZDb252UGF0dFZpZXcnKTtcblx0XHR9XG5cblx0XHQvLyBSdW50aW1lIGxvZyByZWNlaXZlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JVTlRJTUVfTE9HKVxuXHRcdHtcblx0XHRcdGxldCBjbGFzc2VzID0gW107XG5cdFx0XHRjbGFzc2VzLnB1c2godGhpcy5BTllfQ0xBU1MpO1xuXG5cdFx0XHRsZXQgbG9nRW50cmllcyA9IGRhdGEuZ2V0VXRmU3RyaW5nQXJyYXkodGhpcy5MT0dfREFUQV9MQUJFTCk7XG5cdFx0XHRsZXQgc2VwYXJhdG9yID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3NlcCcpO1xuXHRcdFx0bGV0IGNvbHVtbnMgPSBkYXRhLmdldEludCgnY29scycpO1xuXHRcdFx0bGV0IGRzQXJyID0gW107XG5cblx0XHRcdHRoaXMuX3RvdGFsUnVudGltZUxvZ0VudHJpZXMgPSBsb2dFbnRyaWVzLmxlbmd0aDtcblxuXHRcdFx0Ly8gUGFyc2UgbG9nIGVudHJpZXNcblx0XHRcdC8vIFdlIGNhbid0IHVzZSB0aGUgc3BsaXQgbWV0aG9kIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgaW5zdGFuY2VzIG9mIHRoZSBzZXBhcmF0b3IgaW4gdGhlIGxvZyBtZXNzYWdlIHRvb1xuXHRcdFx0Zm9yIChsZXQgZSA9IDA7IGUgPCBsb2dFbnRyaWVzLmxlbmd0aDsgZSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBsb2dFbnRyeSA9IGxvZ0VudHJpZXNbZV07XG5cblx0XHRcdFx0bGV0IGxvZ0VudHJ5RGF0YSA9IFtdO1xuXHRcdFx0XHRsZXQgc3RhcnRJbmRleCA9IDA7XG5cblx0XHRcdFx0Zm9yIChsZXQgYyA9IDA7IGMgPCBjb2x1bW5zIC0gMTsgYysrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGVuZEluZGV4ID0gbG9nRW50cnkuaW5kZXhPZihzZXBhcmF0b3IsIHN0YXJ0SW5kZXgpO1xuXHRcdFx0XHRcdGxvZ0VudHJ5RGF0YS5wdXNoKGxvZ0VudHJ5LnN1YnN0cmluZyhzdGFydEluZGV4LCBlbmRJbmRleCkpO1xuXHRcdFx0XHRcdHN0YXJ0SW5kZXggPSBlbmRJbmRleCArIHNlcGFyYXRvci5sZW5ndGg7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3RhcnRJbmRleCA8IGxvZ0VudHJ5Lmxlbmd0aClcblx0XHRcdFx0XHRsb2dFbnRyeURhdGEucHVzaChsb2dFbnRyeS5zdWJzdHJpbmcoc3RhcnRJbmRleCkpO1xuXG5cdFx0XHRcdC8vIEZpbGwgZGF0YWdyaWQncyBkYXRhcHJvdmlkZXJcblx0XHRcdFx0bGV0IHJsZSA9IFJ1bnRpbWVMb2dFbnRyeS5mcm9tQXJyYXkoc2VwYXJhdG9yLCBsb2dFbnRyeURhdGEpO1xuXHRcdFx0XHRkc0Fyci5wdXNoKHJsZSk7XG5cblx0XHRcdFx0Ly8gQWRkIGNsYXNzIHRvIGZpbHRlcmluZyBkcm9wZG93blxuXHRcdFx0XHRpZiAoY2xhc3Nlcy5pbmRleE9mKHJsZS5jbGF6eikgPCAwKVxuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChybGUuY2xhenopO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTaG93IGNsYXNzZXMgbGlzdFxuXHRcdFx0Y2xhc3Nlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRcdHJldHVybiBhLmxvY2FsZUNvbXBhcmUoYik7XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fY2xhc3NGaWx0ZXJERC5zZXREYXRhU291cmNlKGNsYXNzZXMpO1xuXHRcdFx0dGhpcy5fY2xhc3NGaWx0ZXJERC5zZWxlY3QoMCk7XG5cblx0XHRcdC8vIEFzc2lnbiBkYXRhIHNvdXJjZSB0byBncmlkXG5cdFx0XHRsZXQgZHMgPSBuZXcga2VuZG8uZGF0YS5EYXRhU291cmNlKHtcblx0XHRcdFx0ZGF0YTogZHNBcnJcblx0XHRcdH0pXG5cblx0XHRcdHRoaXMuX3NldFJ1bnRpbWVMb2dEYXRhU291cmNlKGRzKTtcblxuXHRcdFx0Ly8gUmUtZW5hYmxlIGxvZyBsb2FkaW5nIGNvbnRyb2xzXG5cdFx0XHR0aGlzLl9lbmFibGVSdW50aW1lTG9nQ29udHJvbHModHJ1ZSk7XG5cblx0XHRcdC8vIFJlbW92ZSBsb2FkaW5nIGJhclxuXHRcdFx0dGhpcy5fc3dpdGNoUnVudGltZVZpZXdTdGFjaygnbGd2LXJ1bnRpbWVMb2dWaWV3Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gQm9vdCBsb2cgcmVjZWl2ZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9CT09UX0xPRylcblx0XHR7XG5cdFx0XHRjb25zdCBib290TG9nRW50cmllcyA9IGRhdGEuZ2V0U0ZTQXJyYXkodGhpcy5MT0dfREFUQV9MQUJFTCk7XG5cdFx0XHRsZXQgdGV4dCA9ICcnO1xuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGJvb3RMb2dFbnRyaWVzLnNpemUoKTsgaSsrKVxuXHRcdFx0XHR0ZXh0ICs9IGJvb3RMb2dFbnRyaWVzLmdldFV0ZlN0cmluZyhpKSArICdcXG4nO1xuXG5cdFx0XHQkKCcjbGd2LWJvb3RMb2dUZXh0JykudGV4dCh0ZXh0KTtcblxuXHRcdFx0Ly8gUmVtb3ZlIGxvYWRpbmcgYmFyXG5cdFx0XHR0aGlzLl9zd2l0Y2hCb290Vmlld1N0YWNrKCdsZ3YtYm9vdExvZ1ZpZXcnKTtcblx0XHR9XG5cblx0XHQvLyBMb2dzIGJhY2t1cHMgc3RhdHVzIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfQkFDS1VQU19TVEFUVVMpXG5cdFx0e1xuXHRcdFx0Ly8gU2hvdy9oaWRlIG9wZXJhdGlvbiBpbiBwcm9ncmVzcyBtZXNzYWdlXG5cdFx0XHR0aGlzLl9kaXNhYmxlQmFja3VwSW50ZXJmYWNlKGRhdGEuZ2V0Qm9vbCgncnVubmluZycpLCBkYXRhLmdldFV0ZlN0cmluZygndHlwZScpKTtcblxuXHRcdFx0Ly8gQmFja3VwIGZpbGVzIGxpc3Rcblx0XHRcdGlmIChkYXRhLmNvbnRhaW5zS2V5KCdmaWxlcycpKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgZmlsZXMgPSBkYXRhLmdldFNGU0FycmF5KCdmaWxlcycpO1xuXG5cdFx0XHRcdGxldCBsYXN0Qm9vdExvZ0JhY2t1cEZvdW5kID0gZmFsc2U7XG5cdFx0XHRcdGxldCBsYXN0UnVudGltZUxvZ0JhY2t1cEZvdW5kID0gZmFsc2U7XG5cdFx0XHRcdGxldCBsYXN0RnVsbEJhY2t1cEZvdW5kID0gZmFsc2U7XG5cblx0XHRcdFx0bGV0IGJhY2t1cHNMaXN0ID0gW107XG5cblx0XHRcdFx0Y29uc3Qgd2ViU2VydmVyUHJvdG9jb2wgPSAoZGF0YS5jb250YWluc0tleSgncHJvdG9jb2wnKSA/IGRhdGEuZ2V0VXRmU3RyaW5nKCdwcm90b2NvbCcpIDogJ2h0dHAnKSArICc6Ly8nO1xuXHRcdFx0XHRjb25zdCB3ZWJTZXJ2ZXJQb3J0ID0gKGRhdGEuY29udGFpbnNLZXkoJ3BvcnQnKSA/ICc6JyArIGRhdGEuZ2V0SW50KCdwb3J0JykgOiAnJyk7XG5cblx0XHRcdFx0bGV0IHRvdGFsU2l6ZSA9IDA7XG5cblx0XHRcdFx0Zm9yIChsZXQgZiA9IDA7IGYgPCBmaWxlcy5zaXplKCk7IGYrKylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGZpbGUgPSBmaWxlcy5nZXRTRlNPYmplY3QoZik7XG5cblx0XHRcdFx0XHRjb25zdCBmaWxlUGF0aCA9IGZpbGUuZ2V0VXRmU3RyaW5nKCdwYXRoJyk7XG5cblx0XHRcdFx0XHRjb25zdCBmaWxlT2JqID0ge307XG5cdFx0XHRcdFx0ZmlsZU9iai5wYXRoID0gZmlsZVBhdGg7XG5cdFx0XHRcdFx0ZmlsZU9iai51cmwgPSB3ZWJTZXJ2ZXJQcm90b2NvbCArIHRoaXMuc21hcnRGb3guY29uZmlnLmhvc3QgKyB3ZWJTZXJ2ZXJQb3J0ICsgJy8nICsgZmlsZVBhdGg7XG5cdFx0XHRcdFx0ZmlsZU9iai5uYW1lID0gZmlsZVBhdGguc3Vic3RyKGZpbGVQYXRoLmxhc3RJbmRleE9mKCcvJykgKyAxKTtcblx0XHRcdFx0XHRmaWxlT2JqLmRhdGUgPSBmaWxlLmdldFV0ZlN0cmluZygnZGF0ZScpO1xuXHRcdFx0XHRcdGZpbGVPYmoudGltZSA9IGZpbGUuZ2V0VXRmU3RyaW5nKCd0aW1lJyk7XG5cdFx0XHRcdFx0ZmlsZU9iai5zaXplID0gYnl0ZXNUb1NpemUoZmlsZS5nZXRMb25nKCdzaXplJyksIDIpO1xuXG5cdFx0XHRcdFx0dG90YWxTaXplICs9IGZpbGUuZ2V0TG9uZygnc2l6ZScpO1xuXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhpcyBpcyBhIGJvb3QgbG9nIGJhY2t1cFxuXHRcdFx0XHRcdGlmICghbGFzdEJvb3RMb2dCYWNrdXBGb3VuZClcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoZmlsZU9iai5uYW1lLnN0YXJ0c1dpdGgodGhpcy5CT09UX0xPR19CQUNLVVBfSUQpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9maWxsQmFja3VwQ2FyZCgnI2xndi1ib290TG9nQmFja3VwQ2FyZCcsIGZpbGVPYmopO1xuXG5cdFx0XHRcdFx0XHRcdGxhc3RCb290TG9nQmFja3VwRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoaXMgaXMgYSBydW50aW1lIGxvZyBiYWNrdXBcblx0XHRcdFx0XHRpZiAoIWxhc3RSdW50aW1lTG9nQmFja3VwRm91bmQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGZpbGVPYmoubmFtZS5zdGFydHNXaXRoKHRoaXMuUlVOVElNRV9MT0dfQkFDS1VQX0lEKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZmlsbEJhY2t1cENhcmQoJyNsZ3YtcnVudGltZUxvZ0JhY2t1cENhcmQnLCBmaWxlT2JqKTtcblxuXHRcdFx0XHRcdFx0XHRsYXN0UnVudGltZUxvZ0JhY2t1cEZvdW5kID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBDaGVjayBpZiB0aGlzIGlzIGEgZnVsbCBiYWNrdXBcblx0XHRcdFx0XHRpZiAoIWxhc3RGdWxsQmFja3VwRm91bmQpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGZpbGVPYmoubmFtZS5zdGFydHNXaXRoKHRoaXMuRlVMTF9CQUNLVVBfSUQpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9maWxsQmFja3VwQ2FyZCgnI2xndi1mdWxsTG9nQmFja3VwQ2FyZCcsIGZpbGVPYmopO1xuXG5cdFx0XHRcdFx0XHRcdGxhc3RGdWxsQmFja3VwRm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFBvcHVsYXRlIGxvZ3MgbGlzdFxuXHRcdFx0XHRcdGJhY2t1cHNMaXN0LnB1c2goZmlsZU9iaik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBTaG93IHRvdGFsIGJhY2t1cHMgc2l6ZVxuXHRcdFx0XHQkKCcjbGd2LWxvZ1NpemVMYicpLmh0bWwoYFRvdGFsIHNpemU6IDxzdHJvbmc+JHtieXRlc1RvU2l6ZSh0b3RhbFNpemUsIDIsICdLQicpfTwvc3Ryb25nPmApO1xuXG5cdFx0ICAgXHRcdC8vIEFzc2lnbiBkYXRhIHNvdXJjZSB0byBncmlkXG5cdFx0XHRcdHRoaXMuX3NldERvd25sb2FkR3JpZERhdGFTb3VyY2UoYmFja3Vwc0xpc3QpO1xuXHRcdFx0XHR0aGlzLl9vbkRvd25sb2FkR3JpZFNlbGVjdGlvbkNoYW5nZSgpO1xuXG5cdFx0XHRcdC8vIEhpZGUgbGlua3MgdG8gbGF0ZXN0IGZpbGVzIGlmIG5vdCBhdmFpbGFibGVcblx0XHRcdFx0aWYgKCFsYXN0Qm9vdExvZ0JhY2t1cEZvdW5kKVxuXHRcdFx0XHRcdHRoaXMuX2ZpbGxCYWNrdXBDYXJkKCcjbGd2LWJvb3RMb2dCYWNrdXBDYXJkJywgbnVsbCk7XG5cblx0XHRcdFx0aWYgKCFsYXN0UnVudGltZUxvZ0JhY2t1cEZvdW5kKVxuXHRcdFx0XHRcdHRoaXMuX2ZpbGxCYWNrdXBDYXJkKCcjbGd2LXJ1bnRpbWVMb2dCYWNrdXBDYXJkJywgbnVsbCk7XG5cblx0XHRcdFx0aWYgKCFsYXN0RnVsbEJhY2t1cEZvdW5kKVxuXHRcdFx0XHRcdHRoaXMuX2ZpbGxCYWNrdXBDYXJkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkJywgbnVsbCk7XG5cblx0XHRcdFx0aWYgKGRhdGEuY29udGFpbnNLZXkoJ21lc3NhZ2UnKSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbihgTG9nIGJhY2t1cCB3YXJuaW5nYCwgZGF0YS5nZXRVdGZTdHJpbmcoJ21lc3NhZ2UnKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gU2V0IGRvd25sb2FkIHZpZXcgdG8gbWFpblxuXHRcdFx0dGhpcy5fc3dpdGNoRG93bmxvYWRWaWV3U3RhY2soJ2xndi1kb3dubG9hZFZpZXcnKTtcblx0XHR9XG5cblx0XHQvLyBMb2dzIGJhY2t1cCBkZWxldGlvbiBmYWlsZWRcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9ERUxFVEVfQkFDS1VQX0ZBSUxFRClcblx0XHR7XG5cdFx0XHRjb25zdCBlcnJvciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpO1xuXG5cdFx0XHQvLyBTaG93IGFuIGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZXJyb3IsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEEgYmxvY2tpbmcgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIGJhY2t1cCBvcGVyYXRpb25cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9CQUNLVVBfRVJST1IpXG5cdFx0e1xuXHRcdFx0Y29uc3QgZXJyb3IgPSBkYXRhLmdldFV0ZlN0cmluZygnZXJyb3InKTtcblxuXHRcdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGVycm9yLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBBbiBub24tYmxvY2tpbmcgZXJyb3Igb2NjdXJyZWQgZHVyaW5nIGJhY2t1cCBvcGVyYXRpb25cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9CQUNLVVBfV0FSTklORylcblx0XHR7XG5cdFx0XHRsZXQgd2FybiA9IGRhdGEuZ2V0VXRmU3RyaW5nKCd3YXJuJyk7XG5cblx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKGBMb2cgYmFja3VwIHdhcm5pbmdgLCB3YXJuKTtcblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBVSSBFVkVOVCBMSVNURU5FUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfb25UYWJTaG93bihlKVxuXHR7XG5cdFx0aWYgKCF0aGlzLl9pbml0RmFpbGVkKVxuXHRcdHtcblx0XHRcdC8vIElmIGJvb3QgbG9nIHZpZXcgd2FzIGRpc3BsYXllZC4uLlxuXHRcdFx0aWYgKGUudGFyZ2V0LmlkID09ICdsZ3YtYm9vdExvZy10YWInKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBMb2FkIGJvb3QgbG9nIHRoZSBmaXJzdCB0aW1lIHRoZSB0YWIgaXMgc2VsZWN0ZWRcblx0XHRcdFx0aWYgKCF0aGlzLl9ib290TG9nUmVxdWVzdGVkKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfQk9PVF9MT0cpO1xuXHRcdFx0XHRcdHRoaXMuX2Jvb3RMb2dSZXF1ZXN0ZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIGJhY2t1cCZkb3dsb2FkIHZpZXcgd2FzIGRpc3BsYXllZC4uLlxuXHRcdFx0ZWxzZSBpZiAoZS50YXJnZXQuaWQgPT0gJ2xndi1sb2dzRG93bmxvYWQtdGFiJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVxdWVzdCBsb2dzIGJhY2t1cCBzdGF0dXMgdGhlIGZpcnN0IHRpbWUgdGhlIHRhYiBpcyBzZWxlY3RlZFxuXHRcdFx0XHRpZiAoIXRoaXMuX2JhY2t1cFN0YXR1c1JlcXVlc3RlZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX0JBQ0tVUFNfU1RBVFVTKTtcblx0XHRcdFx0XHR0aGlzLl9iYWNrdXBTdGF0dXNSZXF1ZXN0ZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0X29uUnVudGltZUxvZ0xvYWRCdENsaWNrKClcblx0e1xuXHRcdC8vIFJlcXVlc3QgbG9nXG5cdFx0dGhpcy5fbG9hZFJ1bnRpbWVMb2coKTtcblx0fVxuXG5cdF9vbkV4cG9ydEJvb3RMb2dCdENsaWNrKClcblx0e1xuXHRcdC8vIEV4cG9ydCBsb2cgdG8gZmlsZVxuXHRcdHRoaXMuX2V4cG9ydExvZygkKCcjbGd2LWJvb3RMb2dUZXh0JykudGV4dCgpLCB0aGlzLkJPT1RfTE9HX0JBQ0tVUF9JRCk7XG5cdH1cblxuXHRfb25Td2l0Y2hCb290TG9nQ29sb3JCdENsaWNrKClcblx0e1xuXHRcdGlmICgkKCcjbGd2LWJvb3RMb2dUZXh0JykuaGFzQ2xhc3MoJ2ludmVydCcpKVxuXHRcdFx0JCgnI2xndi1ib290TG9nVGV4dCcpLnJlbW92ZUNsYXNzKCdpbnZlcnQnKTtcblx0XHRlbHNlXG5cdFx0XHQkKCcjbGd2LWJvb3RMb2dUZXh0JykuYWRkQ2xhc3MoJ2ludmVydCcpO1xuXHR9XG5cblx0X29uQm9vdExvZ0dlbmVyYXRlQnRDbGljaygpXG5cdHtcblx0XHQvLyBTaG93L2hpZGUgb3BlcmF0aW9uIGluIHByb2dyZXNzIG1lc3NhZ2Vcblx0XHR0aGlzLl9kaXNhYmxlQmFja3VwSW50ZXJmYWNlKHRydWUsIHRoaXMuQk9PVF9MT0dfQkFDS1VQX0lEKTtcblxuXHRcdC8vIFJlcXVlc3QgYmFja3VwIGdlbmVyYXRpb25cblx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0JBQ0tVUF9CT09UX0xPRyk7XG5cdH1cblxuXHRfb25SdW50aW1lTG9nR2VuZXJhdGVCdENsaWNrKClcblx0e1xuXHRcdC8vIFNob3cvaGlkZSBvcGVyYXRpb24gaW4gcHJvZ3Jlc3MgbWVzc2FnZVxuXHRcdHRoaXMuX2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UodHJ1ZSwgdGhpcy5SVU5USU1FX0xPR19CQUNLVVBfSUQpO1xuXG5cdFx0Ly8gUmVxdWVzdCBiYWNrdXAgZ2VuZXJhdGlvblxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfQkFDS1VQX1JVTlRJTUVfTE9HKTtcblx0fVxuXG5cdF9vbkZ1bGxMb2dzR2VuZXJhdGVCdENsaWNrKClcblx0e1xuXHRcdC8vIFNob3cvaGlkZSBvcGVyYXRpb24gaW4gcHJvZ3Jlc3MgbWVzc2FnZVxuXHRcdHRoaXMuX2Rpc2FibGVCYWNrdXBJbnRlcmZhY2UodHJ1ZSwgdGhpcy5GVUxMX0JBQ0tVUF9JRCk7XG5cblx0XHQvLyBSZXF1ZXN0IGJhY2t1cCBnZW5lcmF0aW9uXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9CQUNLVVBfRlVMTF9MT0dTKTtcblx0fVxuXG5cdF9vbkZpbHRlckNoYW5nZSgpXG5cdHtcblx0XHQvLyBTZXQgZmlsdGVyc1xuXHRcdHRoaXMuX3NldFJ1bnRpbWVMb2dEYXRhU291cmNlKHRoaXMuX3J1bnRpbWVMb2dHcmlkLmRhdGFTb3VyY2UpO1xuXHR9XG5cblx0X29uQ2xlYXJGaWx0ZXJDbGljaygpXG5cdHtcblx0XHR0aGlzLl9jbGVhclJ1bnRpbWVMb2dGaWx0ZXJzKCk7XG5cdFx0dGhpcy5fc2V0UnVudGltZUxvZ0RhdGFTb3VyY2UodGhpcy5fcnVudGltZUxvZ0dyaWQuZGF0YVNvdXJjZSk7XG5cdH1cblxuXHRfb25FeHBvcnRSdW50aW1lTG9nQnRDbGljaygpXG5cdHtcblx0XHRsZXQgbG9nID0gJyc7XG5cdFx0Y29uc3QgZW50cmllcyA9IHRoaXMuX3J1bnRpbWVMb2dHcmlkLmRhdGFTb3VyY2UudmlldygpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdGNvbnN0IGl0ZW0gPSBlbnRyaWVzW2ldO1xuXHRcdFx0bG9nICs9IFtpdGVtLmRhdGUsIGl0ZW0udGltZSwgaXRlbS5sZXZlbCwgaXRlbS50aHJlYWQsIGl0ZW0uY2xhenosIGl0ZW0ubWVzc2FnZV0uam9pbihpdGVtLnNlcCkgKyAnXFxuJztcblx0XHR9XG5cblx0XHQvLyBFeHBvcnQgbG9nIHRvIGZpbGVcblx0XHR0aGlzLl9leHBvcnRMb2cobG9nLCB0aGlzLlJVTlRJTUVfTE9HX0JBQ0tVUF9JRCk7XG5cdH1cblxuXHRfb25Eb3dubG9hZEdyaWRTZWxlY3Rpb25DaGFuZ2UoKVxuXHR7XG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgYnV0dG9uc1xuXHRcdGNvbnN0IHNlbGVjdGVkUm93cyA9IHRoaXMuX2Rvd25sb2FkR3JpZC5zZWxlY3QoKTtcblx0XHQkKCcjbGd2LWRvd25sb2FkQnQnKS5hdHRyKCdkaXNhYmxlZCcsIHNlbGVjdGVkUm93cy5sZW5ndGggPT0gMCk7XG5cdFx0JCgnI2xndi1kZWxldGVCdCcpLmF0dHIoJ2Rpc2FibGVkJywgc2VsZWN0ZWRSb3dzLmxlbmd0aCA9PSAwKTtcblxuXHRcdGlmIChzZWxlY3RlZFJvd3MubGVuZ3RoID4gMClcblx0XHR7XG5cdFx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl9kb3dubG9hZEdyaWQuZGF0YUl0ZW0oc2VsZWN0ZWRSb3dzWzBdKTtcblx0XHRcdCQoJyNsZ3YtZG93bmxvYWRCdCcpLmF0dHIoJ2hyZWYnLCBkYXRhSXRlbS51cmwpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHQkKCcjbGd2LWRvd25sb2FkQnQnKS5hdHRyKCdocmVmJywgJyMnKTtcblx0fVxuXG5cdF9vbkRlbGV0ZUJ0Q2xpY2soKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkUm93cyA9IHRoaXMuX2Rvd25sb2FkR3JpZC5zZWxlY3QoKTtcblxuXHRcdGlmIChzZWxlY3RlZFJvd3MubGVuZ3RoID4gMClcblx0XHR7XG5cdFx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl9kb3dubG9hZEdyaWQuZGF0YUl0ZW0oc2VsZWN0ZWRSb3dzWzBdKTtcblxuXHRcdFx0Ly8gUmVxdWVzdCBiYWNrdXAgZGVsZXRpb25cblx0XHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRwYXJhbXMucHV0VXRmU3RyaW5nKCdmaWxlJywgZGF0YUl0ZW0ubmFtZSk7XG5cblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfREVMRVRFX0JBQ0tVUCwgcGFyYW1zKTtcblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfc3dpdGNoUnVudGltZVZpZXdTdGFjayh2aWV3SWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGd2LXJ1bnRpbWUtdmlld3N0YWNrJykuc2VsZWN0ZWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlld0lkKTtcblx0fVxuXG5cdF9zd2l0Y2hCb290Vmlld1N0YWNrKHZpZXdJZClcblx0e1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZ3YtYm9vdC12aWV3c3RhY2snKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXHR9XG5cblx0X3N3aXRjaERvd25sb2FkVmlld1N0YWNrKHZpZXdJZClcblx0e1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZ3YtZG93bmxvYWQtdmlld3N0YWNrJykuc2VsZWN0ZWRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodmlld0lkKTtcblx0fVxuXG5cdF9lbmFibGVSdW50aW1lTG9nQ29udHJvbHMoZW5hYmxlKVxuXHR7XG5cdFx0JCgnI2xndi1sb2FkQnQnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGUpO1xuXHRcdCQoJyNsZ3YtZXhwb3J0UnVudGltZUxvZ0J0JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblx0XHQkKCcjbGd2LWZpbHRlckJ0JykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlKTtcblx0fVxuXG5cdF9sb2FkUnVudGltZUxvZygpXG5cdHtcblx0XHQvLyBEaXNhYmxlIGNvbnRyb2xzIHRvIGxvYWQgbG9nLCBzbyB0aGF0IGltcGF0aWVudCB1c2VycyBjYW4ndCBzZW5kIG11bHRpcGxlIHJlcXVlc3RzXG5cdFx0Ly8gKGl0IHdpbGwgYmUgZW5hYmxlZCBhZ2FpbiB3aGVuIGEgcmVzcG9uc2UgaXMgcmVjZWl2ZWQpXG5cdFx0dGhpcy5fZW5hYmxlUnVudGltZUxvZ0NvbnRyb2xzKGZhbHNlKTtcblxuXHRcdC8vIENsZWFyIGZpbHRlcnNcblx0XHR0aGlzLl9jbGVhclJ1bnRpbWVMb2dGaWx0ZXJzKCk7XG5cblx0XHQvLyBTaG93IGxvYWRpbmcgYmFyXG5cdFx0dGhpcy5fc3dpdGNoUnVudGltZVZpZXdTdGFjaygnbGd2LXJ1bnRpbWVMb2dMb2FkaW5nVmlldycpO1xuXG5cdFx0Ly8gU2VuZCByZXF1ZXN0XG5cdFx0Ly8gKHRoZSBudW1iZXIgb2YgbGluZXMgdG8gYmUgcmV0cmlldmVkIGlzIHNlbnQpXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0SW50KCdudW1FbnRyaWVzJywgTnVtYmVyKHRoaXMuX2xvZ0xpbmVzREQudmFsdWUoKSkpO1xuXG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfUlVOVElNRV9MT0csIHBhcmFtcyk7XG5cdH1cblxuXHRfY2xlYXJSdW50aW1lTG9nRmlsdGVycygpXG5cdHtcblx0XHR0aGlzLl9sZXZlbEZpbHRlckRELnNlbGVjdCgwKTtcblx0XHR0aGlzLl9jbGFzc0ZpbHRlckRELnNlbGVjdCgwKTtcblx0XHQkKCcjbGd2LW1lc3NhZ2VJbicpLnZhbCgnJyk7XG5cdH1cblxuXHRfZXhwb3J0TG9nKGxvZywgbmFtZSlcblx0e1xuXHRcdGxldCBibG9iID0gbmV3IEJsb2IoW2xvZ10sIHt0eXBlOiBcInRleHQvcGxhaW47Y2hhcnNldD11dGYtOFwifSk7XG5cdFx0bGV0IGRhdGUgPSBtb21lbnQoKS5mb3JtYXQoJ1lZWVlNTUREX0hIbW1zcycpO1xuXG5cdFx0RmlsZVNhdmVyLnNhdmVBcyhibG9iLCBgJHtuYW1lfV8ke2RhdGV9LmxvZ2ApO1xuXHR9XG5cblx0X3NldFJ1bnRpbWVMb2dEYXRhU291cmNlKGRzKVxuXHR7XG5cdFx0Ly8gUmVhZCBjdXJyZW50IGhvcml6b250YWwgc2Nyb2xsIHZhbHVlXG5cdFx0Y29uc3Qgc2Nyb2xsTGVmdCA9ICQoJyNsZ3YtcnVudGltZUxvZ0dyaWQgLmstZ3JpZC1jb250ZW50JywgdGhpcy5fcnVudGltZUxvZ0dyaWQud3JhcHBlcikuc2Nyb2xsTGVmdCgpO1xuXG5cdFx0Ly8gQXNzaWduIGRhdGEgc291cmNlIHRvIGdyaWRcblx0XHR0aGlzLl9ydW50aW1lTG9nR3JpZC5zZXREYXRhU291cmNlKGRzKTtcblxuXHRcdC8vIFNldCBmaWx0ZXJzXG5cdFx0dGhpcy5fc2V0RmlsdGVycyhkcyk7XG5cblx0XHQvLyBTZXQgaG9yaXpvbnRhbCBzY3JvbGxcblx0XHQkKCcjbGd2LXJ1bnRpbWVMb2dHcmlkIC5rLWdyaWQtY29udGVudCcsIHRoaXMuX3J1bnRpbWVMb2dHcmlkLndyYXBwZXIpLnNjcm9sbExlZnQoc2Nyb2xsTGVmdCk7XG5cblx0XHQvLyBVcGRhdGUgY291bnRlclxuXHRcdCQoJyNsZ3YtcnVudGltZUxvZ0VudHJpZXNMYicpLnRleHQoYExvZyBlbnRyaWVzOiAke3RoaXMuX3RvdGFsUnVudGltZUxvZ0VudHJpZXN9ICgke2RzLnRvdGFsKCl9IGRpc3BsYXllZClgKTtcblx0fVxuXG5cdF9zZXRGaWx0ZXJzKGRzKVxuXHR7XG5cdFx0bGV0IGZpbHRlcnMgPSBbXTtcblxuXHRcdC8vIExldmVsIGZpbHRlcmluZ1xuXHRcdGlmICh0aGlzLl9sZXZlbEZpbHRlckRELnNlbGVjdCgpID4gMClcblx0XHRcdGZpbHRlcnMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOiAnbGV2ZWwnLCBvcGVyYXRvcjogJ2VxJywgdmFsdWU6IHRoaXMuX2xldmVsRmlsdGVyREQudmFsdWUoKVxuXHRcdFx0fSk7XG5cblx0XHQvLyBDbGFzcyBmaWx0ZXJpbmdcblx0XHRpZiAodGhpcy5fY2xhc3NGaWx0ZXJERC5zZWxlY3QoKSA+IDApXG5cdFx0XHRmaWx0ZXJzLnB1c2goe1xuXHRcdFx0XHRmaWVsZDogJ2NsYXp6Jywgb3BlcmF0b3I6ICdlcScsIHZhbHVlOiB0aGlzLl9jbGFzc0ZpbHRlckRELnZhbHVlKClcblx0XHRcdH0pO1xuXG5cdFx0Ly8gTWVzc2FnZSBmaWx0ZXJpbmdcblx0XHRpZiAoJCgnI2xndi1tZXNzYWdlSW4nKS52YWwoKSAhPSAnJylcblx0XHRcdGZpbHRlcnMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOiAnbWVzc2FnZScsIG9wZXJhdG9yOiAnY29udGFpbnMnLCB2YWx1ZTogJCgnI2xndi1tZXNzYWdlSW4nKS52YWwoKVxuXHRcdFx0fSk7XG5cblx0XHQvLyBTZXQgZmlsdGVyc1xuXHRcdGRzLmZpbHRlcihmaWx0ZXJzKTtcblx0fVxuXG5cdF9kaXNhYmxlQmFja3VwSW50ZXJmYWNlKGRpc2FibGUsIGJhY2t1cElkID0gbnVsbClcblx0e1xuXHRcdGlmIChkaXNhYmxlKVxuXHRcdHtcblx0XHRcdC8vIFNob3cgcHJvcGVyIHByb2dyZXNzIGJhclxuXHRcdFx0aWYgKGJhY2t1cElkID09IHRoaXMuQk9PVF9MT0dfQkFDS1VQX0lEKVxuXHRcdFx0XHQkKCcjbGd2LWJvb3RMb2dCYWNrdXBDYXJkIC5wcm9ncmVzcy1iYXInKS5zaG93KCk7XG5cdFx0XHRlbHNlIGlmIChiYWNrdXBJZCA9PSB0aGlzLlJVTlRJTUVfTE9HX0JBQ0tVUF9JRClcblx0XHRcdFx0JCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCAucHJvZ3Jlc3MtYmFyJykuc2hvdygpO1xuXHRcdFx0ZWxzZSBpZiAoYmFja3VwSWQgPT0gdGhpcy5GVUxMX0JBQ0tVUF9JRClcblx0XHRcdFx0JCgnI2xndi1mdWxsTG9nQmFja3VwQ2FyZCAucHJvZ3Jlc3MtYmFyJykuc2hvdygpO1xuXG5cdFx0XHQvLyBEaXNhYmxlIGJ1dHRvbnNcblx0XHRcdCQoJyNsZ3YtYm9vdExvZ0JhY2t1cENhcmQgLmJhY2t1cC1idXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0JCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHQkKCcjbGd2LWZ1bGxMb2dCYWNrdXBDYXJkIC5iYWNrdXAtYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIEhpZGUgYWxsIHByb2dyZXNzIGJhclxuXHRcdFx0JCgnLmNhcmQtYm9keSAucHJvZ3Jlc3MtYmFyJykuaGlkZSgpO1xuXG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uc1xuXHRcdFx0JCgnI2xndi1mdWxsTG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG5cdFx0XHRpZiAoIXRoaXMuX2Jvb3RMb2dCYWNrdXBVbmF2YWlsYWJsZSlcblx0XHRcdFx0JCgnI2xndi1ib290TG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXG5cdFx0XHRpZiAoIXRoaXMuX3J1bnRpbWVMb2dCYWNrdXBVbmF2YWlsYWJsZSlcblx0XHRcdFx0JCgnI2xndi1ydW50aW1lTG9nQmFja3VwQ2FyZCAuYmFja3VwLWJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuXHRcdH1cblx0fVxuXG5cdF9pbml0QmFja3VwQ2FyZChpZFNlbGVjdG9yKVxuXHR7XG5cdFx0JChpZFNlbGVjdG9yICsgJyAuYmFja3VwLWRldGFpbHMnKS5oaWRlKCk7XG5cdFx0JChpZFNlbGVjdG9yICsgJyAucHJvZ3Jlc3MtYmFyJykuaGlkZSgpO1xuXHR9XG5cblx0X2ZpbGxCYWNrdXBDYXJkKGlkU2VsZWN0b3IsIGRldGFpbHNPYmogPSBudWxsKVxuXHR7XG5cdFx0aWYgKGRldGFpbHNPYmogPT0gbnVsbClcblx0XHRcdCQoaWRTZWxlY3RvciArICcgLmJhY2t1cC1kZXRhaWxzJykuaGlkZSgpO1xuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKGlkU2VsZWN0b3IgKyAnIC5iYWNrdXAtZGV0YWlscycpLnNob3coKTtcblxuXHRcdFx0JChpZFNlbGVjdG9yICsgJyAuYmFja3VwLWxpbmsnKS5hdHRyKCdocmVmJywgZGV0YWlsc09iai51cmwpO1xuXHRcdFx0JChpZFNlbGVjdG9yICsgJyAuYmFja3VwLWRhdGUnKS50ZXh0KGRldGFpbHNPYmouZGF0ZSk7XG5cdFx0XHQkKGlkU2VsZWN0b3IgKyAnIC5iYWNrdXAtdGltZScpLnRleHQoZGV0YWlsc09iai50aW1lKTtcblx0XHRcdCQoaWRTZWxlY3RvciArICcgLmJhY2t1cC1zaXplJykudGV4dChkZXRhaWxzT2JqLnNpemUpO1xuXHRcdH1cblx0fVxuXG5cdF9zZXREb3dubG9hZEdyaWREYXRhU291cmNlKGRzKVxuXHR7XG5cdFx0Ly8gUmVhZCBjdXJyZW50IGhvcml6b250YWwgc2Nyb2xsIHZhbHVlXG5cdCAgIGNvbnN0IHNjcm9sbExlZnQgPSAkKCcjbGd2LWRvd25sb2FkR3JpZCAuay1ncmlkLWNvbnRlbnQnLCB0aGlzLl9kb3dubG9hZEdyaWQud3JhcHBlcikuc2Nyb2xsTGVmdCgpO1xuXG5cdCAgIC8vIEFzc2lnbiBkYXRhIHNvdXJjZSB0byBncmlkXG5cdCAgIHRoaXMuX2Rvd25sb2FkR3JpZC5zZXREYXRhU291cmNlKGRzKTtcblxuXHQgICAvLyBTZXQgaG9yaXpvbnRhbCBzY3JvbGxcblx0ICAgJCgnI2xndi1kb3dubG9hZEdyaWQgLmstZ3JpZC1jb250ZW50JywgdGhpcy5fZG93bmxvYWRHcmlkLndyYXBwZXIpLnNjcm9sbExlZnQoc2Nyb2xsTGVmdCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==