(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("snowem", [], factory);
	else if(typeof exports === 'object')
		exports["snowem"] = factory();
	else
		root["snowem"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: SNW_MSGTYPE_ICE, SNW_MSGTYPE_CORE, SNW_MSGTYPE_EVENT, SNW_MSGTYPE_SIG, SNW_MSGTYPE_CHANNEL, SNW_ICE_CREATE, SNW_ICE_CONNECT, SNW_ICE_PUBLISH, SNW_ICE_PLAY, SNW_ICE_STOP, SNW_ICE_CONTROL, SNW_ICE_AUTH, SNW_ICE_CALL, SNW_ICE_SDP, SNW_ICE_CANDIDATE, SNW_ICE_FIR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_MSGTYPE_ICE", function() { return SNW_MSGTYPE_ICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_MSGTYPE_CORE", function() { return SNW_MSGTYPE_CORE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_MSGTYPE_EVENT", function() { return SNW_MSGTYPE_EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_MSGTYPE_SIG", function() { return SNW_MSGTYPE_SIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_MSGTYPE_CHANNEL", function() { return SNW_MSGTYPE_CHANNEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_CREATE", function() { return SNW_ICE_CREATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_CONNECT", function() { return SNW_ICE_CONNECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_PUBLISH", function() { return SNW_ICE_PUBLISH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_PLAY", function() { return SNW_ICE_PLAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_STOP", function() { return SNW_ICE_STOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_CONTROL", function() { return SNW_ICE_CONTROL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_AUTH", function() { return SNW_ICE_AUTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_CALL", function() { return SNW_ICE_CALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_SDP", function() { return SNW_ICE_SDP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_CANDIDATE", function() { return SNW_ICE_CANDIDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNW_ICE_FIR", function() { return SNW_ICE_FIR; });
// MSGTYPE
var SNW_MSGTYPE_ICE = 1;
var SNW_MSGTYPE_CORE = 2;
var SNW_MSGTYPE_EVENT = 3;
var SNW_MSGTYPE_SIG = 4;
var SNW_MSGTYPE_CHANNEL = 5; // ICE PUBLIC API

var SNW_ICE_CREATE = 1;
var SNW_ICE_CONNECT = 2;
var SNW_ICE_PUBLISH = 3;
var SNW_ICE_PLAY = 4;
var SNW_ICE_STOP = 5;
var SNW_ICE_CONTROL = 6;
var SNW_ICE_AUTH = 7;
var SNW_ICE_CALL = 8; // ICE INTERNAL API

var SNW_ICE_SDP = 128;
var SNW_ICE_CANDIDATE = 129;
var SNW_ICE_FIR = 130;

/***/ }),

/***/ "./src/http.js":
/*!*********************!*\
  !*** ./src/http.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
 //TODO: use promise

function sendPostRequest(url, data, onSuccess, onError) {
  // Sending and receiving data in JSON format using POST method
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      onSuccess(JSON.parse(xhr.responseText));
    } //TODO: when call onError!
    //onError(xhr.responseText);

  };

  xhr.send(JSON.stringify(data));
}

function sendGetRequest(url, data, onSuccess, onError) {
  // Sending a receiving data in JSON format using GET method
  var xhr = new XMLHttpRequest();
  var reqUrl = url + "/?data=" + JSON.stringify(data);
  xhr.open("GET", reqUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
    }
  };

  xhr.send();
}

function createStreamID(server) {
  var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8868;
  var url = 'https://' + server + ':' + port;
  var msg = {
    'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_CHANNEL"],
    'api': 1,
    'name': 'test',
    'type': 0,
    'key': 'key'
  };
  sendPostRequest(url, msg, function (msg) {
    console.log('got msg: ' + msg.channelid);
  }, function (err) {
    console.log('got err: ' + err);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (createStreamID);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Stream, createStreamID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stream.js */ "./src/stream.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stream", function() { return _stream_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./http.js */ "./src/http.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createStreamID", function() { return _http_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });





/***/ }),

/***/ "./src/stream.js":
/*!***********************!*\
  !*** ./src/stream.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stream; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return !!pattern.test(str);
}

var Stream =
/*#__PURE__*/
function () {
  function Stream(host) {
    var _this = this;

    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8443;

    _classCallCheck(this, Stream);

    this.host = host;
    this.port = port;
    this.url = 'wss://' + host + ':' + port + '/ws';
    this.isConnected = false;
    this.listeners = [];
    console.log("wss: " + this.url);
    this.socket = new WebSocket(this.url);

    this.socket.onopen = function () {
      _this.triggerEvent('onConnected');

      _this.isConnected = true;
    };

    this.socket.onmessage = function (event) {
      console.log('receive message: ' + event.data);
    };
  }

  _createClass(Stream, [{
    key: "sendMessage",
    value: function sendMessage(message) {
      console.log("sending msg, msg=", message);

      if (!this.isConnected) {
        this.msgs.push(message);
        return;
      }

      if (this.socket) {
        if (_typeof(message) === 'object') {
          message = JSON.stringify(message);
        }

        this.socket.send(message);
      } else {
        console.warn("websocket not initialized!");
      }
    }
  }, {
    key: "handleMessaage",
    value: function handleMessaage(msg) {
      /*const data = JSON.parse(event.data)
      switch (data.cmd) {
        case ADD_SONG:
          this.dispatch(addSong(data.payload.songid, data.payload.name))
          break
        case GET_ROOM:
          //end of the testing code
          this.dispatch(getRoom(data.payload.roomid))
          break
        case TAKE_MICRO:
          this.handleTakeMicro(data)
          break
        case SDP_OFFER:
          this.handleSDPOffer(data)
          break
        case REMOTE_CANDIDATE:
          this.handleRemoteCandidate(data)
          break
        default:
          console.log("unknown action: " + data.cmd)
          break
      }*/
    }
  }, {
    key: "listen",
    value: function listen(eventName, handler) {
      if (typeof this.listeners[eventName] === 'undefined') {
        this.listeners[eventName] = [];
      }

      this.listeners[eventName].push(handler);
    }
  }, {
    key: "unlisten",
    value: function unlisten(eventName, handler) {
      if (!this.listeners[eventName]) {
        return;
      }

      for (var i = 0; i < this.listeners[eventName].length; i++) {
        if (this.listeners[eventName][i] === handler) {
          this.listeners[eventName].splice(i, 1);
          break;
        }
      }
    }
  }, {
    key: "triggerEvent",
    value: function triggerEvent(eventName, data) {
      if (!this.listeners[eventName]) {
        console.log("no handler for event, name=" + JSON.stringify(eventName));
        return;
      }

      for (var i = 0; i < this.listeners[eventName].length; i++) {
        this.listeners[eventName][i](data);
      }
    }
  }]);

  return Stream;
}();



/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbm93ZW0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Nub3dlbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbm93ZW0vLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3Nub3dlbS8uL3NyYy9odHRwLmpzIiwid2VicGFjazovL3Nub3dlbS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zbm93ZW0vLi9zcmMvc3RyZWFtLmpzIl0sIm5hbWVzIjpbIlNOV19NU0dUWVBFX0lDRSIsIlNOV19NU0dUWVBFX0NPUkUiLCJTTldfTVNHVFlQRV9FVkVOVCIsIlNOV19NU0dUWVBFX1NJRyIsIlNOV19NU0dUWVBFX0NIQU5ORUwiLCJTTldfSUNFX0NSRUFURSIsIlNOV19JQ0VfQ09OTkVDVCIsIlNOV19JQ0VfUFVCTElTSCIsIlNOV19JQ0VfUExBWSIsIlNOV19JQ0VfU1RPUCIsIlNOV19JQ0VfQ09OVFJPTCIsIlNOV19JQ0VfQVVUSCIsIlNOV19JQ0VfQ0FMTCIsIlNOV19JQ0VfU0RQIiwiU05XX0lDRV9DQU5ESURBVEUiLCJTTldfSUNFX0ZJUiIsInNlbmRQb3N0UmVxdWVzdCIsInVybCIsImRhdGEiLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJzZW5kIiwic3RyaW5naWZ5Iiwic2VuZEdldFJlcXVlc3QiLCJyZXFVcmwiLCJqc29uIiwiY3JlYXRlU3RyZWFtSUQiLCJzZXJ2ZXIiLCJwb3J0IiwibXNnIiwiYyIsImNvbnNvbGUiLCJsb2ciLCJjaGFubmVsaWQiLCJlcnIiLCJ2YWxpZFVSTCIsInN0ciIsInBhdHRlcm4iLCJSZWdFeHAiLCJ0ZXN0IiwiU3RyZWFtIiwiaG9zdCIsImlzQ29ubmVjdGVkIiwibGlzdGVuZXJzIiwic29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwidHJpZ2dlckV2ZW50Iiwib25tZXNzYWdlIiwiZXZlbnQiLCJtZXNzYWdlIiwibXNncyIsInB1c2giLCJ3YXJuIiwiZXZlbnROYW1lIiwiaGFuZGxlciIsImkiLCJsZW5ndGgiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDakZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNPLElBQU1BLGVBQWUsR0FBRyxDQUF4QjtBQUNBLElBQU1DLGdCQUFnQixHQUFHLENBQXpCO0FBQ0EsSUFBTUMsaUJBQWlCLEdB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LEVBQXZELEVBQTJEO0FBQ3pELFlBQUksS0FBS2IsU0FBTCxDQUFlVyxTQUFmLEVBQTBCRSxDQUExQixNQUFpQ0QsT0FBckMsRUFBOEM7QUFDNUMsZUFBS1osU0FBTCxDQUFlVyxTQUFmLEVBQTBCSSxNQUExQixDQUFpQ0YsQ0FBakMsRUFBb0MsQ0FBcEM7QUFDQTtBQUNEO0FBQ0Y7QUFDSDs7O2lDQUVZRixTLEVBQVc5QyxJLEVBQU07QUFDNUIsVUFBSSxDQUFDLEtBQUttQyxTQUFMLENBQWVXLFNBQWYsQ0FBTCxFQUFnQztBQUM5QnZCLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLGdDQUFnQ2QsSUFBSSxDQUFDSSxTQUFMLENBQWVnQyxTQUFmLENBQTVDO0FBQ0E7QUFDRDs7QUFDRCxXQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2IsU0FBTCxDQUFlVyxTQUFmLEVBQTBCRyxNQUE5QyxFQUFzREQsQ0FBQyxFQUF2RCxFQUEyRDtBQUN6RCxhQUFLYixTQUFMLENBQWVXLFNBQWYsRUFBMEJFLENBQTFCLEVBQTZCaEQsSUFBN0I7QUFDRDtBQUNGIiwiZmlsZSI6InNub3dlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic25vd2VtXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInNub3dlbVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzbm93ZW1cIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJcbi8vIE1TR1RZUEVcbmV4cG9ydCBjb25zdCBTTldfTVNHVFlQRV9JQ0UgPSAxO1xuZXhwb3J0IGNvbnN0IFNOV19NU0dUWVBFX0NPUkUgPSAyO1xuZXhwb3J0IGNvbnN0IFNOV19NU0dUWVBFX0VWRU5UID0gMztcbmV4cG9ydCBjb25zdCBTTldfTVNHVFlQRV9TSUcgPSA0O1xuZXhwb3J0IGNvbnN0IFNOV19NU0dUWVBFX0NIQU5ORUwgPSA1O1xuXG4vLyBJQ0UgUFVCTElDIEFQSVxuZXhwb3J0IGNvbnN0IFNOV19JQ0VfQ1JFQVRFID0gMTtcbmV4cG9ydCBjb25zdCBTTldfSUNFX0NPTk5FQ1QgPSAyO1xuZXhwb3J0IGNvbnN0IFNOV19JQ0VfUFVCTElTSCA9IDM7XG5leHBvcnQgY29uc3QgU05XX0lDRV9QTEFZID0gNDtcbmV4cG9ydCBjb25zdCBTTldfSUNFX1NUT1AgPSA1O1xuZXhwb3J0IGNvbnN0IFNOV19JQ0VfQ09OVFJPTCA9IDY7XG5leHBvcnQgY29uc3QgU05XX0lDRV9BVVRIID0gNztcbmV4cG9ydCBjb25zdCBTTldfSUNFX0NBTEwgPSA4O1xuXG4vLyBJQ0UgSU5URVJOQUwgQVBJXG5leHBvcnQgY29uc3QgU05XX0lDRV9TRFAgPSAxMjg7XG5leHBvcnQgY29uc3QgU05XX0lDRV9DQU5ESURBVEUgPSAxMjk7XG5leHBvcnQgY29uc3QgU05XX0lDRV9GSVIgPSAxMzA7XG4iLCJpbXBvcnQgKiBhcyBjIGZyb20gJy4vY29uc3RhbnRzLmpzJ1xuXG4vL1RPRE86IHVzZSBwcm9taXNlXG5mdW5jdGlvbiBzZW5kUG9zdFJlcXVlc3QgKHVybCwgZGF0YSwgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gIC8vIFNlbmRpbmcgYW5kIHJlY2VpdmluZyBkYXRhIGluIEpTT04gZm9ybWF0IHVzaW5nIFBPU1QgbWV0aG9kXG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCwgdHJ1ZSk7XG4gIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBvblN1Y2Nlc3MoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSk7XG4gICAgfVxuICAgIC8vVE9ETzogd2hlbiBjYWxsIG9uRXJyb3IhXG4gICAgLy9vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICB9O1xuICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG59XG5cbmZ1bmN0aW9uIHNlbmRHZXRSZXF1ZXN0ICh1cmwsIGRhdGEsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAvLyBTZW5kaW5nIGEgcmVjZWl2aW5nIGRhdGEgaW4gSlNPTiBmb3JtYXQgdXNpbmcgR0VUIG1ldGhvZFxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHZhciByZXFVcmwgPSB1cmwgKyBcIi8/ZGF0YT1cIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICB4aHIub3BlbihcIkdFVFwiLCByZXFVcmwsIHRydWUpO1xuICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgdmFyIGpzb24gPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgfTtcbiAgeGhyLnNlbmQoKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3RyZWFtSUQoc2VydmVyLCBwb3J0ID0gODg2OCkge1xuICB2YXIgdXJsID0gJ2h0dHBzOi8vJyArIHNlcnZlciArICc6JyArIHBvcnRcblxuICB2YXIgbXNnID0ge1xuICAgICdtc2d0eXBlJzogYy5TTldfTVNHVFlQRV9DSEFOTkVMLFxuICAgICdhcGknOiAxLFxuICAgICduYW1lJzogJ3Rlc3QnLFxuICAgICd0eXBlJzogMCxcbiAgICAna2V5JzogJ2tleScsXG4gIH1cblxuICBzZW5kUG9zdFJlcXVlc3QodXJsLCBtc2csXG4gICAgZnVuY3Rpb24obXNnKSB7XG4gICAgICBjb25zb2xlLmxvZygnZ290IG1zZzogJyArIG1zZy5jaGFubmVsaWQpXG5cbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coJ2dvdCBlcnI6ICcgKyBlcnIpXG5cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RyZWFtSURcbiIsImltcG9ydCBTdHJlYW0gZnJvbSAnLi9zdHJlYW0uanMnXG5pbXBvcnQgY3JlYXRlU3RyZWFtSUQgZnJvbSAnLi9odHRwLmpzJ1xuXG5leHBvcnQge1xuICBTdHJlYW0sIGNyZWF0ZVN0cmVhbUlEXG59XG5cbiIsImZ1bmN0aW9uIHZhbGlkVVJMKHN0cikge1xuICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoJ14oaHR0cHM/OlxcXFwvXFxcXC8pPycrIC8vIHByb3RvY29sXG4gICAgJygoKFthLXpcXFxcZF0oW2EtelxcXFxkLV0qW2EtelxcXFxkXSkqKVxcXFwuKStbYS16XXsyLH18JysgLy8gZG9tYWluIG5hbWVcbiAgICAnKChcXFxcZHsxLDN9XFxcXC4pezN9XFxcXGR7MSwzfSkpJysgLy8gT1IgaXAgKHY0KSBhZGRyZXNzXG4gICAgJyhcXFxcOlxcXFxkKyk/KFxcXFwvWy1hLXpcXFxcZCVfLn4rXSopKicrIC8vIHBvcnQgYW5kIHBhdGhcbiAgICAnKFxcXFw/WzsmYS16XFxcXGQlXy5+Kz0tXSopPycrIC8vIHF1ZXJ5IHN0cmluZ1xuICAgICcoXFxcXCNbLWEtelxcXFxkX10qKT8kJywnaScpOyAvLyBmcmFnbWVudCBsb2NhdG9yXG4gIHJldHVybiAhIXBhdHRlcm4udGVzdChzdHIpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJlYW0ge1xuICBjb25zdHJ1Y3Rvcihob3N0LCBwb3J0ID0gODQ0Mykge1xuICAgIHRoaXMuaG9zdCA9IGhvc3RcbiAgICB0aGlzLnBvcnQgPSBwb3J0XG4gICAgdGhpcy51cmwgPSAnd3NzOi8vJyArIGhvc3QgKyAnOicgKyBwb3J0ICsgJy93cydcbiAgICB0aGlzLmlzQ29ubmVjdGVkID0gZmFsc2VcbiAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuXG4gICAgY29uc29sZS5sb2coXCJ3c3M6IFwiICsgdGhpcy51cmwpXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMudXJsKVxuICAgIHRoaXMuc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdvbkNvbm5lY3RlZCcpXG4gICAgICB0aGlzLmlzQ29ubmVjdGVkID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlIG1lc3NhZ2U6ICcgKyBldmVudC5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgbXNnLCBtc2c9XCIsIG1lc3NhZ2UpO1xuICAgIGlmICghdGhpcy5pc0Nvbm5lY3RlZCkge1xuICAgICAgdGhpcy5tc2dzLnB1c2gobWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5zb2NrZXQuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFwid2Vic29ja2V0IG5vdCBpbml0aWFsaXplZCFcIik7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWVzc2FhZ2UobXNnKSB7XG4gICAgLypjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5kYXRhKVxuICAgIHN3aXRjaCAoZGF0YS5jbWQpIHtcbiAgICAgIGNhc2UgQUREX1NPTkc6XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goYWRkU29uZyhkYXRhLnBheWxvYWQuc29uZ2lkLCBkYXRhLnBheWxvYWQubmFtZSkpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIEdFVF9ST09NOlxuICAgICAgICAvL2VuZCBvZiB0aGUgdGVzdGluZyBjb2RlXG4gICAgICAgIHRoaXMuZGlzcGF0Y2goZ2V0Um9vbShkYXRhLnBheWxvYWQucm9vbWlkKSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgVEFLRV9NSUNSTzpcbiAgICAgICAgdGhpcy5oYW5kbGVUYWtlTWljcm8oZGF0YSlcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgU0RQX09GRkVSOlxuICAgICAgICB0aGlzLmhhbmRsZVNEUE9mZmVyKGRhdGEpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFJFTU9URV9DQU5ESURBVEU6XG4gICAgICAgIHRoaXMuaGFuZGxlUmVtb3RlQ2FuZGlkYXRlKGRhdGEpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcInVua25vd24gYWN0aW9uOiBcIiArIGRhdGEuY21kKVxuICAgICAgICBicmVha1xuICAgIH0qL1xuICB9XG5cbiAgbGlzdGVuKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICBpZiAodHlwZW9mIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICB9XG4gICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIHVubGlzdGVuKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICByZXR1cm47XG4gICAgIH1cbiAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV1baV0gPT09IGhhbmRsZXIpIHtcbiAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgYnJlYWs7XG4gICAgICAgfVxuICAgICB9XG4gIH1cblxuICB0cmlnZ2VyRXZlbnQoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm5vIGhhbmRsZXIgZm9yIGV2ZW50LCBuYW1lPVwiICsgSlNPTi5zdHJpbmdpZnkoZXZlbnROYW1lKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXVtpXShkYXRhKTtcbiAgICB9XG4gIH1cblxufVxuXG4iXSwic291cmNlUm9vdCI6IiJ9