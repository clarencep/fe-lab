/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.html = html;
exports.raw = raw;
exports.escape = escape;
/**
 * 一个简单的html模版
 * 使用方法参见 www\fill-user-info-dlg\template.js
 * 注意：
 * 1. 默认所有值都将被编码以防XSS/CSRF
 * 2. 如果你确信不需要转义，则请使用raw()函数将值包装一下
 * @param strings
 * @param args
 * @returns {raw} HTML字符串
 */
function html(strings) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (args.length === 0 && !Array.isArray(strings)) {
        return raw(strings);
    }

    var ret = [];
    strings.forEach(function (s, i) {
        ret.push(s);

        var arg = args[i];

        if (Array.isArray(arg)) {
            arg.forEach(function (a) {
                return void ret.push(escape(a));
            });
        } else if (!arg) {
            // ignored falsy values
        } else {
            ret.push(escape(arg));
        }
    });

    return raw(ret.join(''));
}

/**
 * 转换为真正的字符串，并移除首尾的空白
 * @param strings
 * @param args
 * @returns {string}
 */
html.trim = function (strings) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    return (html.apply(undefined, [strings].concat(args)) + '').trim();
};

/**
 * 原始对象，不会被escape所转义
 * @constructor
 * @param value  字符串值
 * @returns {raw}
 */
function raw(value) {
    if (this instanceof raw) {
        // 原始对象的值
        this.v = value + '';
        return this;
    } else {
        // 默认创建一个raw对象
        return new raw(value);
    }
}

/**
 * 重载toString返回当前的值
 * @returns {string|*}
 */
raw.prototype.toString = function () {
    return this.v;
};

/**
 * 转义模版
 * @param str
 * @returns {*}
 */
function escape(str) {
    if (str instanceof raw) {
        return str + '';
    }

    return (str + '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&#34;').replace(/'/g, '&#39;');
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_string_html_template__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_es6_string_html_template___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_es6_string_html_template__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_less__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_less__);
var _templateObject = _taggedTemplateLiteral(['<div>\n    <div>\n        <label>Expected Strength: <input type=number id="expected_strength" value="64" />bits</label>\n    </div>\n    <div>\n        <label>Test Password: <input type=password id="passwd" ime-mode="disabled"/></label>\n        <div id="actual_strength" ></div>\n    </div>\n    <div>\n        <label>\n            <input type=checkbox id=show_password />\n            Show Password\n        </label>\n    </div>\n    <div>\n        <label>Password Length: <span id="password_length">0</span> bits</label>\n    </div>\n    <div>\n        <label>Shannon Entropy: <span id="shannon_entropy">0</span> bits</label>\n    </div>\n</div>'], ['<div>\n    <div>\n        <label>Expected Strength: <input type=number id="expected_strength" value="64" />bits</label>\n    </div>\n    <div>\n        <label>Test Password: <input type=password id="passwd" ime-mode="disabled"/></label>\n        <div id="actual_strength" ></div>\n    </div>\n    <div>\n        <label>\n            <input type=checkbox id=show_password />\n            Show Password\n        </label>\n    </div>\n    <div>\n        <label>Password Length: <span id="password_length">0</span> bits</label>\n    </div>\n    <div>\n        <label>Shannon Entropy: <span id="shannon_entropy">0</span> bits</label>\n    </div>\n</div>']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function calcShannonEntropy(data) {
    var dataLen = data.length;

    // H(X) = E[I(X)] = E[-ln(P(X))]
    // H(X) = SUM(P(x) * I(x)) = - SUM(P(x) * log(P(x), 2))        (in bits)


    // the count of each byte
    var bytesCount = new Array(256);

    for (var i = 0; i < 256; i++) {
        bytesCount[i] = 0;
    }

    for (var _i = 0; _i < dataLen; _i++) {
        var b = data.charCodeAt(_i);
        bytesCount[b]++;
    }

    // calc P(x)
    var bytesPossibilities = [];
    for (var _b = 0; _b < 256; _b++) {
        bytesPossibilities[_b] = bytesCount[_b] * 1.0 / dataLen;
    }

    var h = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = bytesPossibilities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var px = _step.value;

            if (px > 0) {
                h += px * Math.log2(px);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return -h * dataLen;
}

document.write(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_es6_string_html_template__["html"])(_templateObject));

var $ = document.querySelector.bind(document);

var $expected_strength = $('#expected_strength');
var $passwd = $('#passwd');
var $password_length = $('#password_length');
var $actual_strength = $('#actual_strength');
var $shannon_entropy = $('#shannon_entropy');

var refresh = function refresh() {
    var expected_strength = +$expected_strength.value;
    var passwd = $passwd.value + '';

    var shannon_entropy = calcShannonEntropy(passwd);

    var strength = shannon_entropy * 1.0 / expected_strength;
    if (strength < 0.6) {
        strength = 'weak';
    } else if (strength < 1.0) {
        strength = 'middle';
    } else {
        strength = 'strong';
    }

    $actual_strength.className = strength;

    $password_length.innerText = passwd.length * 8;
    $shannon_entropy.innerText = shannon_entropy.toFixed(3);
};

$expected_strength.addEventListener('input', refresh);
$passwd.addEventListener('input', refresh);

refresh();

$('#show_password').addEventListener('change', function (e) {
    if (e.currentTarget.checked) {
        $passwd.type = 'text';
    } else {
        $passwd.type = 'password';
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);