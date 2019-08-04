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
/*! exports provided: SNW_MSGTYPE_ICE, SNW_MSGTYPE_CORE, SNW_MSGTYPE_EVENT, SNW_MSGTYPE_SIG, SNW_MSGTYPE_CHANNEL, SNW_ICE_CREATE, SNW_ICE_CONNECT, SNW_ICE_PUBLISH, SNW_ICE_PLAY, SNW_ICE_STOP, SNW_ICE_CONTROL, SNW_ICE_AUTH, SNW_ICE_CALL, SNW_ICE_SDP, SNW_ICE_CANDIDATE, SNW_ICE_FIR, UNKNOWN_STREAM_TYPE, PUBLISHER_STREAM_TYPE, SUBSCRIBER_STREAM_TYPE, P2P_STREAM_TYPE, ACODEC_OPUS, ACODEC_PMCU, VCODEC_H264, VCODEC_VP8, VCODEC_VP9 */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNKNOWN_STREAM_TYPE", function() { return UNKNOWN_STREAM_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PUBLISHER_STREAM_TYPE", function() { return PUBLISHER_STREAM_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUBSCRIBER_STREAM_TYPE", function() { return SUBSCRIBER_STREAM_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "P2P_STREAM_TYPE", function() { return P2P_STREAM_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACODEC_OPUS", function() { return ACODEC_OPUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACODEC_PMCU", function() { return ACODEC_PMCU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCODEC_H264", function() { return VCODEC_H264; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCODEC_VP8", function() { return VCODEC_VP8; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VCODEC_VP9", function() { return VCODEC_VP9; });
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
var SNW_ICE_FIR = 130; // STREAM TYPE

var UNKNOWN_STREAM_TYPE = 0;
var PUBLISHER_STREAM_TYPE = 1;
var SUBSCRIBER_STREAM_TYPE = 2;
var P2P_STREAM_TYPE = 3; // MEDIA CODEC

var ACODEC_OPUS = "opus";
var ACODEC_PMCU = "pmcu";
var VCODEC_H264 = "h264";
var VCODEC_VP8 = "vp8";
var VCODEC_VP9 = "vp9";

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
      if (typeof onSuccess === 'function') onSuccess(JSON.parse(xhr.responseText));
    } else {//TODO: why is it called on success?
      //if (typeof onError === 'function')
      //  onError(xhr.responseText);
    }
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
  var onSuccess = arguments.length > 2 ? arguments[2] : undefined;
  var onError = arguments.length > 3 ? arguments[3] : undefined;
  var url = 'https://' + server + ':' + port;
  var msg = {
    'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_CHANNEL"],
    'api': 1,
    'name': 'test',
    'type': 0,
    'key': 'key'
  };
  sendPostRequest(url, msg, onSuccess, onError);
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
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/constants.js");
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
  function Stream(streamid, host) {
    var _this = this;

    var port = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8443;

    _classCallCheck(this, Stream);

    this.streamid = streamid;
    this.host = host;
    this.port = port;
    this.url = 'wss://' + host + ':' + port + '/ws';
    this.isConnected = false;
    this.listeners = []; // websocket init

    console.log("wss: " + this.url);
    this.msgs = [];
    this.socket = new WebSocket(this.url);

    this.socket.onopen = function () {
      _this.triggerEvent('onConnected');

      _this.isConnected = true;

      for (var i = 0; i < _this.msgs.length; i++) {
        console.log(_this.msgs[i]);
        var message = _this.msgs[i];

        if (_typeof(message) === 'object') {
          message = JSON.stringify(message);
        }

        _this.socket.send(message);
      }

      _this.msgs = [];
    };

    this.socket.onmessage = function (event) {
      console.log('receive message: ' + event.data);

      _this.handleMessage(event);
    }; // peer connection init
    // TODO: get config from caller and set default values


    var config = {
      mediaConstraints: {
        audio: true,
        video: false
      },
      pcConfig: {
        'iceServers': [{
          'urls': 'stun:stun3.l.google.com:19302'
        }],
        'iceTransports': 'all'
      },
      //TODO: chrome and firefox do differently here
      sdpConstraints: {
        'mandatory': {
          'OfferToReceiveAudio': true,
          'OfferToReceiveVideo': false
        }
      }
    };
    this.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__["UNKNOWN_STREAM_TYPE"];
    this.acodec = _constants_js__WEBPACK_IMPORTED_MODULE_0__["ACODEC_OPUS"];
    this.vcodec = _constants_js__WEBPACK_IMPORTED_MODULE_0__["VCODEC_VP8"];
    this.config = config;
    this.state = "disconnected";
    this.localStream = null;
    this.localVideoElm = document.getElementById("localVideo");
    this.remoteStream = null;
    this.remoteVideoElm = document.getElementById("remoteVideo");
  }

  _createClass(Stream, [{
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
    key: "broadcast",
    value: function broadcast(eventName, msg) {
      if (!this.listeners[eventName]) {
        console.log("no handler for event, name=" + JSON.stringify(eventName));
        return;
      }

      for (var i = 0; i < this.listeners[eventName].length; i++) {
        this.listeners[eventName][i](msg);
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
  }, {
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
    key: "doAnswer",
    value: function doAnswer(msg) {
      var self = this;

      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        /*if (self.type === globals_.P2P_STREAM_TYPE) {
           self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                   'id': self.id,
                   'remoteid': self.remoteId,
                   'sdp':sessionDescription});
        } else {*/

        self.sendMessage({
          'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"],
          'api': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_SDP"],
          'streamid': self.streamid,
          'channelid': self.streamid,
          'sdp': sessionDescription
        }); //}
      }

      function onError(e) {
        console.log("failed to create sdp answer: " + e);
      }

      this.pc.setRemoteDescription(new RTCSessionDescription(msg));
      this.pc.createAnswer(setLocalAndSendMessage, onError, this.config.sdpConstraints);
    }
  }, {
    key: "onRemoteSdp",
    value: function onRemoteSdp(msg) {
      console.log("handle sdp: ", msg);

      if (msg.type === 'offer') {
        this.doAnswer(msg);
      } else if (msg.type === 'answer') {
        //p2p mode: answer from our offer

        /*if (this.type === globals_.P2P_STREAM_TYPE) {
          this.pc.setRemoteDescription(new RTCSessionDescription(msg));
        } else {
          console.error("received answer, not handled");
        }*/
        console.error("not handle answer: " + JSON.stringify(msg));
      } else {
        console.error("unknown msg: " + JSON.stringify(msg));
      }
    }
  }, {
    key: "onRemoteCandidate",
    value: function onRemoteCandidate(msg) {
      if (msg.type === 'candidate') {
        var candidate = new RTCIceCandidate({
          sdpMid: msg.sdpMid,
          sdpMLineIndex: msg.sdpMLineIndex,
          candidate: msg.candidate
        });
        console.log("remote candidate " + JSON.stringify(candidate));
        this.pc.addIceCandidate(candidate);
      } else {//console.error("unknown candidate: " + JSON.stringify(msg));
      }
    }
  }, {
    key: "handleRequest",
    value: function handleRequest(msg) {
      if (msg.msgtype == _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"]) {
        var streamid = msg.streamid;
        console.warn("stream not found, id=" + streamid);
        /*var stream = this.getStreamById(streamid);
        if (stream) {
           stream.receiveMessage(msg);
        } else {
          console.warn("stream not found, id=" + streamid);
        }*/

        switch (msg.api) {
          case _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_SDP"]:
            this.onRemoteSdp(msg.sdp);
            break;

          case _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_CANDIDATE"]:
            this.onRemoteCandidate(msg.candidate);
            break;

          default:
            console.error("unknown ice msg: ", msg);
            break;
        }

        return;
      }
      /*if (msg.msgtype == globals_.SNW_EVENT ) {
        this.handleEvent(msg);
        return;
      }
       if (msg.msgtype == globals_.SNW_SIG ) {
        this.handleSigReq(msg);
        return;
      }*/


      console.log("unknown request: " + JSON.stringify(msg));
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(msg) {
      if (msg.rc < 0) {
        console.error("error msg: ", msg.errmsg);
        return;
      }

      console.log("response: " + JSON.stringify(msg));
      /*if (msg.msgtype == globals_.SNW_CHANNEL ) {
        switch(msg.api) {
          case globals_.SNW_CHANNEL_CONNECT:
            this.handleConnectResp(msg);
            break;
          case globals_.SNW_CHANNEL_CREATE_STREAM:
            this.handleCreateStreamResp(msg);
            break;
          default:
            console.error("unknown channel msg: ", msg);
            break;
        }
      }
      if (msg.msgtype == globals_.SNW_ICE) {
        var streamid = msg.streamid;
        var stream = this.getStreamById(streamid);
        if (stream) {
           stream.receiveMessage(msg);
        } else {
          console.warn("stream not found, id=" + streamid);
        }
      }*/
    }
  }, {
    key: "handleMessage",
    value: function handleMessage(evt) {
      var msg = JSON.parse(evt.data);

      if (msg.rc != null) {
        this.handleResponse(msg);
      } else {
        this.handleRequest(msg);
      }
    }
  }, {
    key: "onIceConnected",
    value: function onIceConnected() {
      if (this.state === 'connected') return; //already send request

      if (this.type === _constants_js__WEBPACK_IMPORTED_MODULE_0__["PUBLISHER_STREAM_TYPE"]) {
        this.sendMessage({
          'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"],
          'api': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_PUBLISH"],
          'channelid': this.streamid,
          'streamid': this.streamid
        });
      } else if (this.type === _constants_js__WEBPACK_IMPORTED_MODULE_0__["SUBSCRIBER_STREAM_TYPE"]) {
        this.sendMessage({
          'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"],
          'api': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_PLAY"],
          'channelid': this.streamid,
          'publishid': this.streamid,
          'streamid': this.streamid
        });
      }
      /* else if (this.type === globals_.P2P_STREAM_TYPE) {
        console.log("p2p mode (nothing to do), channelId=" + this.channelId);
      }*/
      else {// error
        }

      this.state = 'connected';
      this.broadcast('onIceConnected', null);
    }
  }, {
    key: "createPeerConnection",
    value: function createPeerConnection(stream) {
      var self = this;
      this.pc = new RTCPeerConnection(this.config.pcConfig, this.config.sdpConstraints);

      function onicecandidate(event) {
        if (event.candidate) {
          var candidate = event.candidate.candidate; //TODO: allow only private or specific IP?
          //if (candidate.indexOf("192.168") === -1) return;

          var candidate = event.candidate.candidate;
          /*if (self.type === globals_.P2P_STREAM_TYPE) {
             console.log('send local candidate: ' + JSON.stringify(event.candidate));
             self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                     'id': self.id,
                     'remoteid': self.remoteId,
                     'candidate':{
                          type: 'candidate',
                          sdpMLineIndex: event.candidate.sdpMLineIndex,
                          sdpMid: event.candidate.sdpMid,
                          candidate: event.candidate.candidate}});
          } else {*/

          self.sendMessage({
            'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"],
            'api': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_CANDIDATE"],
            'streamid': self.streamid,
            'channelid': self.streamidd,
            'candidate': {
              type: 'candidate',
              sdpMLineIndex: event.candidate.sdpMLineIndex,
              sdpMid: event.candidate.sdpMid,
              candidate: event.candidate.candidate
            }
          }); //}
        } else {
          /*if (self.type === globals_.P2P_STREAM_TYPE) {
             console.log('no more local candidate');
             self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                      'id': self.id, 'remoteid': self.remoteId, 'candidate':{ done: true }});
          } else {*/
          self.sendMessage({
            'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"],
            'api': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_CANDIDATE"],
            'streamid': self.streamid,
            'channelid': self.streamid,
            'candidate': {
              done: true
            }
          }); //}
        }
      }

      function onaddstream(event) {
        console.log('Remote stream added, src:' + self.remoteVideoElm);
        self.remoteStream = event.stream;
        if (self.remoteVideoElm) self.remoteVideoElm.srcObject = event.stream;
      }

      function onremovestream(event) {
        console.log('Remote stream removed. Event: ', event);
      }

      function oniceconnectionstatechange(event) {
        console.log("ICE connection status changed : streamid=" + self.id + " " + event.target.iceConnectionState);

        if (event.target.iceConnectionState === "connected") {
          self.onIceConnected();
        }
      }

      this.pc.onicecandidate = onicecandidate;
      this.pc.onaddstream = onaddstream;
      this.pc.onremovestream = onremovestream;
      this.pc.oniceconnectionstatechange = oniceconnectionstatechange;

      if (stream) {
        this.pc.addStream(stream);
      } else if (this.localStream) {
        this.pc.addStream(this.localStream);
      } else {
        console.warn("no local stream");
      }
    }
  }, {
    key: "publish",
    value: function publish() {
      this.type = _constants_js__WEBPACK_IMPORTED_MODULE_0__["PUBLISHER_STREAM_TYPE"];
      this.createPeerConnection(this.localStream);
      this.sendMessage({
        'msgtype': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_MSGTYPE_ICE"],
        'api': _constants_js__WEBPACK_IMPORTED_MODULE_0__["SNW_ICE_CONNECT"],
        'channelid': this.streamid,
        'stream_type': this.type,
        'video_codec': this.vcodec,
        'name': 'test',
        'streamid': this.streamid
      });
    }
  }]);

  return Stream;
}();



/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zbm93ZW0vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Nub3dlbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zbm93ZW0vLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovL3Nub3dlbS8uL3NyYy9odHRwLmpzIiwid2VicGFjazovL3Nub3dlbS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9zbm93ZW0vLi9zcmMvc3RyZWFtLmpzIl0sIm5hbWVzIjpbIlNOV19NU0dUWVBFX0lDRSIsIlNOV19NU0dUWVBFX0NPUkUiLCJTTldfTVNHVFlQRV9FVkVOVCIsIlNOV19NU0dUWVBFX1NJRyIsIlNOV19NU0dUWVBFX0NIQU5ORUwiLCJTTldfSUNFX0NSRUFURSIsIlNOV19JQ0VfQ09OTkVDVCIsIlNOV19JQ0VfUFVCTElTSCIsIlNOV19JQ0VfUExBWSIsIlNOV19JQ0VfU1RPUCIsIlNOV19JQ0VfQ09OVFJPTCIsIlNOV19JQ0VfQVVUSCIsIlNOV19JQ0VfQ0FMTCIsIlNOV19JQ0VfU0RQIiwiU05XX0lDRV9DQU5ESURBVEUiLCJTTldfSUNFX0ZJUiIsIlVOS05PV05fU1RSRUFNX1RZUEUiLCJQVUJMSVNIRVJfU1RSRUFNX1RZUEUiLCJTVUJTQ1JJQkVSX1NUUkVBTV9UWVBFIiwiUDJQX1NUUkVBTV9UWVBFIiwiQUNPREVDX09QVVMiLCJBQ09ERUNfUE1DVSIsIlZDT0RFQ19IMjY0IiwiVkNPREVDX1ZQOCIsIlZDT0RFQ19WUDkiLCJzZW5kUG9zdFJlcXVlc3QiLCJ1cmwiLCJkYXRhIiwib25TdWNjZXNzIiwib25FcnJvciIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsInN0cmluZ2lmeSIsInNlbmRHZXRSZXF1ZXN0IiwicmVxVXJsIiwianNvbiIsImNyZWF0ZVN0cmVhbUlEIiwic2VydmVyIiwicG9ydCIsIm1zZyIsImMiLCJ2YWxpZFVSTCIsInN0ciIsInBhdHRlcm4iLCJSZWdFeHAiLCJ0ZXN0IiwiU3RyZWFtIiwic3RyZWFtaWQiLCJob3N0IiwiaXNDb25uZWN0ZWQiLCJsaXN0ZW5lcnMiLCJjb25zb2xlIiwibG9nIiwibXNncyIsInNvY2tldCIsIldlYlNvY2tldCIsIm9ub3BlbiIsInRyaWdnZXJFdmVudCIsImkiLCJsZW5ndGgiLCJtZXNzYWdlIiwib25tZXNzYWdlIiwiZXZlbnQiLCJoYW5kbGVNZXNzYWdlIiwiY29uZmlnIiwibWVkaWFDb25zdHJhaW50cyIsImF1ZGlvIiwidmlkZW8iLCJwY0NvbmZpZyIsInNkcENvbnN0cmFpbnRzIiwidHlwZSIsImdsb2JhbHNfIiwiYWNvZGVjIiwidmNvZGVjIiwic3RhdGUiLCJsb2NhbFN0cmVhbSIsImxvY2FsVmlkZW9FbG0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3RlU3RyZWFtIiwicmVtb3RlVmlkZW9FbG0iLCJldmVudE5hbWUiLCJoYW5kbGVyIiwicHVzaCIsInNwbGljZSIsIndhcm4iLCJzZWxmIiwic2V0TG9jYWxBbmRTZW5kTWVzc2FnZSIsInNlc3Npb25EZXNjcmlwdGlvbiIsInBjIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsInNlbmRNZXNzYWdlIiwiZSIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZG9BbnN3ZXIiLCJlcnJvciIsImNhbmRpZGF0ZSIsIlJUQ0ljZUNhbmRpZGF0ZSIsInNkcE1pZCIsInNkcE1MaW5lSW5kZXgiLCJhZGRJY2VDYW5kaWRhdGUiLCJtc2d0eXBlIiwiYXBpIiwib25SZW1vdGVTZHAiLCJzZHAiLCJvblJlbW90ZUNhbmRpZGF0ZSIsInJjIiwiZXJybXNnIiwiZXZ0IiwiaGFuZGxlUmVzcG9uc2UiLCJoYW5kbGVSZXF1ZXN0IiwiYnJvYWRjYXN0Iiwic3RyZWFtIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJvbmljZWNhbmRpZGF0ZSIsInN0cmVhbWlkZCIsImRvbmUiLCJvbmFkZHN0cmVhbSIsInNyY09iamVjdCIsIm9ucmVtb3Zlc3RyZWFtIiwib25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJpZCIsInRhcmdldCIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIm9uSWNlQ29ubmVjdGVkIiwiYWRkU3RyZWFtIiwiY3JlYXRlUGVlckNvbm5lY3Rpb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FB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QyxHQUNJLEdBREosR0FDVTdELEtBQUssQ0FBQzhELE1BQU4sQ0FBYUMsa0JBRG5DOztBQUVBLFlBQUkvRCxLQUFLLENBQUM4RCxNQUFOLENBQWFDLGtCQUFiLEtBQW9DLFdBQXhDLEVBQXFEO0FBQ2xEdkMsY0FBSSxDQUFDd0MsY0FBTDtBQUNGO0FBQ0g7O0FBRUQsV0FBS3JDLEVBQUwsQ0FBUTJCLGNBQVIsR0FBeUJBLGNBQXpCO0FBQ0EsV0FBSzNCLEVBQUwsQ0FBUThCLFdBQVIsR0FBc0JBLFdBQXRCO0FBQ0EsV0FBSzlCLEVBQUwsQ0FBUWdDLGNBQVIsR0FBeUJBLGNBQXpCO0FBQ0EsV0FBS2hDLEVBQUwsQ0FBUWlDLDBCQUFSLEdBQXFDQSwwQkFBckM7O0FBQ0EsVUFBSVIsTUFBSixFQUFZO0FBQ1YsYUFBS3pCLEVBQUwsQ0FBUXNDLFNBQVIsQ0FBa0JiLE1BQWxCO0FBQ0QsT0FGRCxNQUVPLElBQUksS0FBS3ZDLFdBQVQsRUFBc0I7QUFDM0IsYUFBS2MsRUFBTCxDQUFRc0MsU0FBUixDQUFrQixLQUFLcEQsV0FBdkI7QUFDRCxPQUZNLE1BRUE7QUFDTHhCLGVBQU8sQ0FBQ2tDLElBQVIsQ0FBYSxpQkFBYjtBQUNEO0FBQ0g7Ozs4QkFHUTtBQUNQLFdBQUtmLElBQUwsR0FBWUMsbUVBQVo7QUFDQSxXQUFLeUQsb0JBQUwsQ0FBMEIsS0FBS3JELFdBQS9CO0FBQ0EsV0FBS2dCLFdBQUwsQ0FBaUI7QUFBQyxtQkFBVXBCLDZEQUFYO0FBQW9DLGVBQU1BLDZEQUExQztBQUNSLHFCQUFhLEtBQUt4QixRQURWO0FBQ29CLHVCQUFlLEtBQUt1QixJQUR4QztBQUM4Qyx1QkFBZSxLQUFLRyxNQURsRTtBQUVSLGdCQUFRLE1BRkE7QUFFUSxvQkFBWSxLQUFLMUI7QUFGekIsT0FBakI7QUFHRiIsImZpbGUiOiJzbm93ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInNub3dlbVwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzbm93ZW1cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic25vd2VtXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiLy8gTVNHVFlQRVxuZXhwb3J0IGNvbnN0IFNOV19NU0dUWVBFX0lDRSA9IDE7XG5leHBvcnQgY29uc3QgU05XX01TR1RZUEVfQ09SRSA9IDI7XG5leHBvcnQgY29uc3QgU05XX01TR1RZUEVfRVZFTlQgPSAzO1xuZXhwb3J0IGNvbnN0IFNOV19NU0dUWVBFX1NJRyA9IDQ7XG5leHBvcnQgY29uc3QgU05XX01TR1RZUEVfQ0hBTk5FTCA9IDU7XG5cbi8vIElDRSBQVUJMSUMgQVBJXG5leHBvcnQgY29uc3QgU05XX0lDRV9DUkVBVEUgPSAxO1xuZXhwb3J0IGNvbnN0IFNOV19JQ0VfQ09OTkVDVCA9IDI7XG5leHBvcnQgY29uc3QgU05XX0lDRV9QVUJMSVNIID0gMztcbmV4cG9ydCBjb25zdCBTTldfSUNFX1BMQVkgPSA0O1xuZXhwb3J0IGNvbnN0IFNOV19JQ0VfU1RPUCA9IDU7XG5leHBvcnQgY29uc3QgU05XX0lDRV9DT05UUk9MID0gNjtcbmV4cG9ydCBjb25zdCBTTldfSUNFX0FVVEggPSA3O1xuZXhwb3J0IGNvbnN0IFNOV19JQ0VfQ0FMTCA9IDg7XG5cbi8vIElDRSBJTlRFUk5BTCBBUElcbmV4cG9ydCBjb25zdCBTTldfSUNFX1NEUCA9IDEyODtcbmV4cG9ydCBjb25zdCBTTldfSUNFX0NBTkRJREFURSA9IDEyOTtcbmV4cG9ydCBjb25zdCBTTldfSUNFX0ZJUiA9IDEzMDtcblxuLy8gU1RSRUFNIFRZUEVcbmV4cG9ydCBjb25zdCBVTktOT1dOX1NUUkVBTV9UWVBFID0gMDtcbmV4cG9ydCBjb25zdCBQVUJMSVNIRVJfU1RSRUFNX1RZUEUgPSAxO1xuZXhwb3J0IGNvbnN0IFNVQlNDUklCRVJfU1RSRUFNX1RZUEUgPSAyO1xuZXhwb3J0IGNvbnN0IFAyUF9TVFJFQU1fVFlQRSA9IDM7XG5cbi8vIE1FRElBIENPREVDXG5leHBvcnQgY29uc3QgQUNPREVDX09QVVMgPSBcIm9wdXNcIjtcbmV4cG9ydCBjb25zdCBBQ09ERUNfUE1DVSA9IFwicG1jdVwiO1xuZXhwb3J0IGNvbnN0IFZDT0RFQ19IMjY0ID0gXCJoMjY0XCI7XG5leHBvcnQgY29uc3QgVkNPREVDX1ZQOCA9IFwidnA4XCI7XG5leHBvcnQgY29uc3QgVkNPREVDX1ZQOSA9IFwidnA5XCI7XG5cblxuIiwiaW1wb3J0ICogYXMgYyBmcm9tICcuL2NvbnN0YW50cy5qcydcblxuLy9UT0RPOiB1c2UgcHJvbWlzZVxuZnVuY3Rpb24gc2VuZFBvc3RSZXF1ZXN0ICh1cmwsIGRhdGEsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAvLyBTZW5kaW5nIGFuZCByZWNlaXZpbmcgZGF0YSBpbiBKU09OIGZvcm1hdCB1c2luZyBQT1NUIG1ldGhvZFxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgaWYgKHR5cGVvZiBvblN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIG9uU3VjY2VzcyhKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9UT0RPOiB3aHkgaXMgaXQgY2FsbGVkIG9uIHN1Y2Nlc3M/XG4gICAgICAvL2lmICh0eXBlb2Ygb25FcnJvciA9PT0gJ2Z1bmN0aW9uJylcbiAgICAgIC8vICBvbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgfTtcbiAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xufVxuXG5mdW5jdGlvbiBzZW5kR2V0UmVxdWVzdCAodXJsLCBkYXRhLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgLy8gU2VuZGluZyBhIHJlY2VpdmluZyBkYXRhIGluIEpTT04gZm9ybWF0IHVzaW5nIEdFVCBtZXRob2RcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB2YXIgcmVxVXJsID0gdXJsICsgXCIvP2RhdGE9XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgeGhyLm9wZW4oXCJHRVRcIiwgcmVxVXJsLCB0cnVlKTtcbiAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICB9XG4gIH07XG4gIHhoci5zZW5kKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0cmVhbUlEKHNlcnZlciwgcG9ydCA9IDg4NjgsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICB2YXIgdXJsID0gJ2h0dHBzOi8vJyArIHNlcnZlciArICc6JyArIHBvcnRcbiAgdmFyIG1zZyA9IHtcbiAgICAnbXNndHlwZSc6IGMuU05XX01TR1RZUEVfQ0hBTk5FTCxcbiAgICAnYXBpJzogMSxcbiAgICAnbmFtZSc6ICd0ZXN0JyxcbiAgICAndHlwZSc6IDAsXG4gICAgJ2tleSc6ICdrZXknLFxuICB9XG4gIHNlbmRQb3N0UmVxdWVzdCh1cmwsIG1zZywgb25TdWNjZXNzLCBvbkVycm9yKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3RyZWFtSURcbiIsImltcG9ydCBTdHJlYW0gZnJvbSAnLi9zdHJlYW0uanMnXG5pbXBvcnQgY3JlYXRlU3RyZWFtSUQgZnJvbSAnLi9odHRwLmpzJ1xuXG5leHBvcnQge1xuICBTdHJlYW0sIGNyZWF0ZVN0cmVhbUlEXG59XG5cbiIsImltcG9ydCAqIGFzIGdsb2JhbHNfIGZyb20gJy4vY29uc3RhbnRzLmpzJ1xuXG5mdW5jdGlvbiB2YWxpZFVSTChzdHIpIHtcbiAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKCdeKGh0dHBzPzpcXFxcL1xcXFwvKT8nKyAvLyBwcm90b2NvbFxuICAgICcoKChbYS16XFxcXGRdKFthLXpcXFxcZC1dKlthLXpcXFxcZF0pKilcXFxcLikrW2Etel17Mix9fCcrIC8vIGRvbWFpbiBuYW1lXG4gICAgJygoXFxcXGR7MSwzfVxcXFwuKXszfVxcXFxkezEsM30pKScrIC8vIE9SIGlwICh2NCkgYWRkcmVzc1xuICAgICcoXFxcXDpcXFxcZCspPyhcXFxcL1stYS16XFxcXGQlXy5+K10qKSonKyAvLyBwb3J0IGFuZCBwYXRoXG4gICAgJyhcXFxcP1s7JmEtelxcXFxkJV8ufis9LV0qKT8nKyAvLyBxdWVyeSBzdHJpbmdcbiAgICAnKFxcXFwjWy1hLXpcXFxcZF9dKik/JCcsJ2knKTsgLy8gZnJhZ21lbnQgbG9jYXRvclxuICByZXR1cm4gISFwYXR0ZXJuLnRlc3Qoc3RyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyZWFtIHtcbiAgY29uc3RydWN0b3Ioc3RyZWFtaWQsIGhvc3QsIHBvcnQgPSA4NDQzKSB7XG4gICAgdGhpcy5zdHJlYW1pZCA9IHN0cmVhbWlkXG4gICAgdGhpcy5ob3N0ID0gaG9zdFxuICAgIHRoaXMucG9ydCA9IHBvcnRcbiAgICB0aGlzLnVybCA9ICd3c3M6Ly8nICsgaG9zdCArICc6JyArIHBvcnQgKyAnL3dzJ1xuICAgIHRoaXMuaXNDb25uZWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMubGlzdGVuZXJzID0gW107XG5cbiAgICAvLyB3ZWJzb2NrZXQgaW5pdFxuICAgIGNvbnNvbGUubG9nKFwid3NzOiBcIiArIHRoaXMudXJsKVxuICAgIHRoaXMubXNncyA9IFtdXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMudXJsKVxuICAgIHRoaXMuc29ja2V0Lm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdvbkNvbm5lY3RlZCcpXG4gICAgICB0aGlzLmlzQ29ubmVjdGVkID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1zZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5tc2dzW2ldKTtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLm1zZ3NbaV07XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc29ja2V0LnNlbmQobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1zZ3MgPSBbXVxuICAgIH1cbiAgICB0aGlzLnNvY2tldC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlIG1lc3NhZ2U6ICcgKyBldmVudC5kYXRhKVxuICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKGV2ZW50KVxuICAgIH1cblxuICAgIC8vIHBlZXIgY29ubmVjdGlvbiBpbml0XG4gICAgLy8gVE9ETzogZ2V0IGNvbmZpZyBmcm9tIGNhbGxlciBhbmQgc2V0IGRlZmF1bHQgdmFsdWVzXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgIG1lZGlhQ29uc3RyYWludHMgOiB7XG4gICAgICAgIGF1ZGlvOiB0cnVlLFxuICAgICAgICB2aWRlbzogZmFsc2UsXG4gICAgICB9LFxuICAgICAgcGNDb25maWcgOiB7XG4gICAgICAgICdpY2VTZXJ2ZXJzJzpbeyd1cmxzJzonc3R1bjpzdHVuMy5sLmdvb2dsZS5jb206MTkzMDInfV0sXG4gICAgICAgICdpY2VUcmFuc3BvcnRzJzogJ2FsbCdcbiAgICAgIH0sXG4gICAgICAvL1RPRE86IGNocm9tZSBhbmQgZmlyZWZveCBkbyBkaWZmZXJlbnRseSBoZXJlXG4gICAgICBzZHBDb25zdHJhaW50cyA6IHtcbiAgICAgICAgJ21hbmRhdG9yeSc6IHtcbiAgICAgICAgICAnT2ZmZXJUb1JlY2VpdmVBdWRpbyc6dHJ1ZSxcbiAgICAgICAgICAnT2ZmZXJUb1JlY2VpdmVWaWRlbyc6ZmFsc2UsXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICAgIHRoaXMudHlwZSA9IGdsb2JhbHNfLlVOS05PV05fU1RSRUFNX1RZUEVcbiAgICB0aGlzLmFjb2RlYyA9IGdsb2JhbHNfLkFDT0RFQ19PUFVTXG4gICAgdGhpcy52Y29kZWMgPSBnbG9iYWxzXy5WQ09ERUNfVlA4XG4gICAgdGhpcy5jb25maWcgPSBjb25maWdcbiAgICB0aGlzLnN0YXRlID0gXCJkaXNjb25uZWN0ZWRcIlxuICAgIHRoaXMubG9jYWxTdHJlYW0gPSBudWxsXG4gICAgdGhpcy5sb2NhbFZpZGVvRWxtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhbFZpZGVvXCIpO1xuICAgIHRoaXMucmVtb3RlU3RyZWFtID0gbnVsbFxuICAgIHRoaXMucmVtb3RlVmlkZW9FbG0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbW90ZVZpZGVvXCIpO1xuICB9XG5cbiAgbGlzdGVuKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICBpZiAodHlwZW9mIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICB9XG4gICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIHVubGlzdGVuKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICByZXR1cm47XG4gICAgIH1cbiAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV1baV0gPT09IGhhbmRsZXIpIHtcbiAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgYnJlYWs7XG4gICAgICAgfVxuICAgICB9XG4gIH1cblxuICBicm9hZGNhc3QoZXZlbnROYW1lLG1zZykge1xuICAgIGlmICghdGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXSkge1xuICAgICAgY29uc29sZS5sb2coXCJubyBoYW5kbGVyIGZvciBldmVudCwgbmFtZT1cIiArIEpTT04uc3RyaW5naWZ5KGV2ZW50TmFtZSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV1baV0obXNnKTtcbiAgICB9XG4gIH1cblxuXG4gIHRyaWdnZXJFdmVudChldmVudE5hbWUsIGRhdGEpIHtcbiAgICBpZiAoIXRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibm8gaGFuZGxlciBmb3IgZXZlbnQsIG5hbWU9XCIgKyBKU09OLnN0cmluZ2lmeShldmVudE5hbWUpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdW2ldKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhcInNlbmRpbmcgbXNnLCBtc2c9XCIsIG1lc3NhZ2UpO1xuICAgIGlmICghdGhpcy5pc0Nvbm5lY3RlZCkge1xuICAgICAgdGhpcy5tc2dzLnB1c2gobWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5zb2NrZXQuc2VuZChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS53YXJuKFwid2Vic29ja2V0IG5vdCBpbml0aWFsaXplZCFcIik7XG4gICAgfVxuICB9XG5cbiAgZG9BbnN3ZXIobXNnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIHNldExvY2FsQW5kU2VuZE1lc3NhZ2Uoc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XG4gICAgICBzZWxmLnBjLnNldExvY2FsRGVzY3JpcHRpb24oc2Vzc2lvbkRlc2NyaXB0aW9uKTtcbiAgICAgIC8qaWYgKHNlbGYudHlwZSA9PT0gZ2xvYmFsc18uUDJQX1NUUkVBTV9UWVBFKSB7XG4gICAgICAgICBzZWxmLnNlbmRNZXNzYWdlKHsnbXNndHlwZSc6Z2xvYmFsc18uU05XX1NJRywnYXBpJzpnbG9iYWxzXy5TTldfU0lHX1NEUCxcbiAgICAgICAgICAgICAgICAgJ2lkJzogc2VsZi5pZCxcbiAgICAgICAgICAgICAgICAgJ3JlbW90ZWlkJzogc2VsZi5yZW1vdGVJZCxcbiAgICAgICAgICAgICAgICAgJ3NkcCc6c2Vzc2lvbkRlc2NyaXB0aW9ufSk7XG4gICAgICB9IGVsc2UgeyovXG4gICAgICAgICBzZWxmLnNlbmRNZXNzYWdlKHsnbXNndHlwZSc6Z2xvYmFsc18uU05XX01TR1RZUEVfSUNFLCdhcGknOmdsb2JhbHNfLlNOV19JQ0VfU0RQLFxuICAgICAgICAgICAgICAgICAnc3RyZWFtaWQnOiBzZWxmLnN0cmVhbWlkLFxuICAgICAgICAgICAgICAgICAnY2hhbm5lbGlkJzogc2VsZi5zdHJlYW1pZCxcbiAgICAgICAgICAgICAgICAgJ3NkcCc6c2Vzc2lvbkRlc2NyaXB0aW9ufSk7XG4gICAgICAvL31cbiAgICB9XG4gICAgZnVuY3Rpb24gb25FcnJvcihlKSB7XG4gICAgICAgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gY3JlYXRlIHNkcCBhbnN3ZXI6IFwiICsgZSk7XG4gICAgfVxuICAgIHRoaXMucGMuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtc2cpKTtcbiAgICB0aGlzLnBjLmNyZWF0ZUFuc3dlcihzZXRMb2NhbEFuZFNlbmRNZXNzYWdlLCBvbkVycm9yLCB0aGlzLmNvbmZpZy5zZHBDb25zdHJhaW50cyk7XG4gIH1cblxuXG4gIG9uUmVtb3RlU2RwKG1zZykge1xuICAgICBjb25zb2xlLmxvZyhcImhhbmRsZSBzZHA6IFwiLCBtc2cpO1xuICAgICBpZiAobXNnLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgICB0aGlzLmRvQW5zd2VyKG1zZyk7XG4gICAgIH0gZWxzZSBpZiAobXNnLnR5cGUgPT09ICdhbnN3ZXInKSB7IC8vcDJwIG1vZGU6IGFuc3dlciBmcm9tIG91ciBvZmZlclxuICAgICAgIC8qaWYgKHRoaXMudHlwZSA9PT0gZ2xvYmFsc18uUDJQX1NUUkVBTV9UWVBFKSB7XG4gICAgICAgICB0aGlzLnBjLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obXNnKSk7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWNlaXZlZCBhbnN3ZXIsIG5vdCBoYW5kbGVkXCIpO1xuICAgICAgIH0qL1xuICAgICAgIGNvbnNvbGUuZXJyb3IoXCJub3QgaGFuZGxlIGFuc3dlcjogXCIgKyBKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBjb25zb2xlLmVycm9yKFwidW5rbm93biBtc2c6IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgIH1cbiAgIH1cblxuICAgb25SZW1vdGVDYW5kaWRhdGUobXNnKSB7XG4gICAgIGlmIChtc2cudHlwZSA9PT0gJ2NhbmRpZGF0ZScpIHtcbiAgICAgICB2YXIgY2FuZGlkYXRlID0gbmV3IFJUQ0ljZUNhbmRpZGF0ZSh7c2RwTWlkOiBtc2cuc2RwTWlkLFxuICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6bXNnLnNkcE1MaW5lSW5kZXgsIGNhbmRpZGF0ZTptc2cuY2FuZGlkYXRlfSk7XG4gICAgICAgY29uc29sZS5sb2coXCJyZW1vdGUgY2FuZGlkYXRlIFwiICsgSlNPTi5zdHJpbmdpZnkoY2FuZGlkYXRlKSk7XG4gICAgICAgdGhpcy5wYy5hZGRJY2VDYW5kaWRhdGUoY2FuZGlkYXRlKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICAvL2NvbnNvbGUuZXJyb3IoXCJ1bmtub3duIGNhbmRpZGF0ZTogXCIgKyBKU09OLnN0cmluZ2lmeShtc2cpKTtcbiAgICAgfVxuICAgfVxuXG4gICBoYW5kbGVSZXF1ZXN0KG1zZykge1xuXG4gICAgIGlmIChtc2cubXNndHlwZSA9PSBnbG9iYWxzXy5TTldfTVNHVFlQRV9JQ0UgKSB7XG4gICAgICAgdmFyIHN0cmVhbWlkID0gbXNnLnN0cmVhbWlkO1xuICAgICAgIGNvbnNvbGUud2FybihcInN0cmVhbSBub3QgZm91bmQsIGlkPVwiICsgc3RyZWFtaWQpO1xuICAgICAgIC8qdmFyIHN0cmVhbSA9IHRoaXMuZ2V0U3RyZWFtQnlJZChzdHJlYW1pZCk7XG4gICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgIHN0cmVhbS5yZWNlaXZlTWVzc2FnZShtc2cpO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBjb25zb2xlLndhcm4oXCJzdHJlYW0gbm90IGZvdW5kLCBpZD1cIiArIHN0cmVhbWlkKTtcbiAgICAgICB9Ki9cbiAgICAgICBzd2l0Y2gobXNnLmFwaSkge1xuICAgICAgICAgY2FzZSBnbG9iYWxzXy5TTldfSUNFX1NEUDpcbiAgICAgICAgICAgdGhpcy5vblJlbW90ZVNkcChtc2cuc2RwKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlIGdsb2JhbHNfLlNOV19JQ0VfQ0FORElEQVRFOlxuICAgICAgICAgICB0aGlzLm9uUmVtb3RlQ2FuZGlkYXRlKG1zZy5jYW5kaWRhdGUpO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1bmtub3duIGljZSBtc2c6IFwiLCBtc2cpO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICB9XG4gICAgICAgcmV0dXJuO1xuICAgICB9XG5cbiAgICAgLyppZiAobXNnLm1zZ3R5cGUgPT0gZ2xvYmFsc18uU05XX0VWRU5UICkge1xuICAgICAgIHRoaXMuaGFuZGxlRXZlbnQobXNnKTtcbiAgICAgICByZXR1cm47XG4gICAgIH1cblxuICAgICBpZiAobXNnLm1zZ3R5cGUgPT0gZ2xvYmFsc18uU05XX1NJRyApIHtcbiAgICAgICB0aGlzLmhhbmRsZVNpZ1JlcShtc2cpO1xuICAgICAgIHJldHVybjtcbiAgICAgfSovXG5cbiAgICAgY29uc29sZS5sb2coXCJ1bmtub3duIHJlcXVlc3Q6IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gIH1cblxuICBoYW5kbGVSZXNwb25zZShtc2cpIHtcbiAgICAgaWYgKG1zZy5yYyA8IDApIHtcbiAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3IgbXNnOiBcIiwgbXNnLmVycm1zZyk7XG4gICAgICAgcmV0dXJuO1xuICAgICB9XG4gICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6IFwiICsgSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgIC8qaWYgKG1zZy5tc2d0eXBlID09IGdsb2JhbHNfLlNOV19DSEFOTkVMICkge1xuICAgICAgIHN3aXRjaChtc2cuYXBpKSB7XG4gICAgICAgICBjYXNlIGdsb2JhbHNfLlNOV19DSEFOTkVMX0NPTk5FQ1Q6XG4gICAgICAgICAgIHRoaXMuaGFuZGxlQ29ubmVjdFJlc3AobXNnKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICBjYXNlIGdsb2JhbHNfLlNOV19DSEFOTkVMX0NSRUFURV9TVFJFQU06XG4gICAgICAgICAgIHRoaXMuaGFuZGxlQ3JlYXRlU3RyZWFtUmVzcChtc2cpO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1bmtub3duIGNoYW5uZWwgbXNnOiBcIiwgbXNnKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgfVxuICAgICB9XG4gICAgIGlmIChtc2cubXNndHlwZSA9PSBnbG9iYWxzXy5TTldfSUNFKSB7XG4gICAgICAgdmFyIHN0cmVhbWlkID0gbXNnLnN0cmVhbWlkO1xuICAgICAgIHZhciBzdHJlYW0gPSB0aGlzLmdldFN0cmVhbUJ5SWQoc3RyZWFtaWQpO1xuICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICBzdHJlYW0ucmVjZWl2ZU1lc3NhZ2UobXNnKTtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgY29uc29sZS53YXJuKFwic3RyZWFtIG5vdCBmb3VuZCwgaWQ9XCIgKyBzdHJlYW1pZCk7XG4gICAgICAgfVxuICAgICB9Ki9cblxuICAgfVxuXG4gIGhhbmRsZU1lc3NhZ2UoZXZ0KSB7XG4gICAgICB2YXIgbXNnID0gSlNPTi5wYXJzZShldnQuZGF0YSk7XG4gICAgICBpZiAobXNnLnJjICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXNwb25zZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVSZXF1ZXN0KG1zZyk7XG4gICAgICB9XG4gIH1cblxuICBvbkljZUNvbm5lY3RlZCgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2Nvbm5lY3RlZCcpIHJldHVybjsgLy9hbHJlYWR5IHNlbmQgcmVxdWVzdFxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gZ2xvYmFsc18uUFVCTElTSEVSX1NUUkVBTV9UWVBFKSB7XG4gICAgICAgdGhpcy5zZW5kTWVzc2FnZSh7J21zZ3R5cGUnOmdsb2JhbHNfLlNOV19NU0dUWVBFX0lDRSwnYXBpJzpnbG9iYWxzXy5TTldfSUNFX1BVQkxJU0gsXG4gICAgICAgICAgICAgICAnY2hhbm5lbGlkJzogdGhpcy5zdHJlYW1pZCxcbiAgICAgICAgICAgICAgICdzdHJlYW1pZCc6IHRoaXMuc3RyZWFtaWR9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gZ2xvYmFsc18uU1VCU0NSSUJFUl9TVFJFQU1fVFlQRSkge1xuICAgICAgIHRoaXMuc2VuZE1lc3NhZ2Uoeydtc2d0eXBlJzpnbG9iYWxzXy5TTldfTVNHVFlQRV9JQ0UsJ2FwaSc6Z2xvYmFsc18uU05XX0lDRV9QTEFZLFxuICAgICAgICAgICAgICAgJ2NoYW5uZWxpZCc6IHRoaXMuc3RyZWFtaWQsXG4gICAgICAgICAgICAgICAncHVibGlzaGlkJzogdGhpcy5zdHJlYW1pZCxcbiAgICAgICAgICAgICAgICdzdHJlYW1pZCc6IHRoaXMuc3RyZWFtaWR9KTtcbiAgICB9LyogZWxzZSBpZiAodGhpcy50eXBlID09PSBnbG9iYWxzXy5QMlBfU1RSRUFNX1RZUEUpIHtcbiAgICAgICBjb25zb2xlLmxvZyhcInAycCBtb2RlIChub3RoaW5nIHRvIGRvKSwgY2hhbm5lbElkPVwiICsgdGhpcy5jaGFubmVsSWQpO1xuICAgIH0qLyBlbHNlIHtcbiAgICAgICAvLyBlcnJvclxuICAgIH1cbiAgICB0aGlzLnN0YXRlID0gJ2Nvbm5lY3RlZCc7XG4gICAgdGhpcy5icm9hZGNhc3QoJ29uSWNlQ29ubmVjdGVkJyxudWxsKTtcbiAgfVxuXG5cbiAgY3JlYXRlUGVlckNvbm5lY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIHRoaXMucGMgPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24odGhpcy5jb25maWcucGNDb25maWcsIHRoaXMuY29uZmlnLnNkcENvbnN0cmFpbnRzKVxuXG4gICAgICBmdW5jdGlvbiBvbmljZWNhbmRpZGF0ZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICAgICAgIHZhciBjYW5kaWRhdGUgPSBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlO1xuICAgICAgICAgICAvL1RPRE86IGFsbG93IG9ubHkgcHJpdmF0ZSBvciBzcGVjaWZpYyBJUD9cbiAgICAgICAgICAgLy9pZiAoY2FuZGlkYXRlLmluZGV4T2YoXCIxOTIuMTY4XCIpID09PSAtMSkgcmV0dXJuO1xuICAgICAgICAgICB2YXIgY2FuZGlkYXRlID0gZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZTtcblxuICAgICAgICAgICAvKmlmIChzZWxmLnR5cGUgPT09IGdsb2JhbHNfLlAyUF9TVFJFQU1fVFlQRSkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZCBsb2NhbCBjYW5kaWRhdGU6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5jYW5kaWRhdGUpKTtcbiAgICAgICAgICAgICAgc2VsZi5zZW5kTWVzc2FnZSh7J21zZ3R5cGUnOmdsb2JhbHNfLlNOV19TSUcsJ2FwaSc6Z2xvYmFsc18uU05XX1NJR19DQU5ESURBVEUsXG4gICAgICAgICAgICAgICAgICAgICAgJ2lkJzogc2VsZi5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAncmVtb3RlaWQnOiBzZWxmLnJlbW90ZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICdjYW5kaWRhdGUnOntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjYW5kaWRhdGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGV9fSk7XG4gICAgICAgICAgIH0gZWxzZSB7Ki9cbiAgICAgICAgICAgICAgc2VsZi5zZW5kTWVzc2FnZSh7J21zZ3R5cGUnOmdsb2JhbHNfLlNOV19NU0dUWVBFX0lDRSwnYXBpJzpnbG9iYWxzXy5TTldfSUNFX0NBTkRJREFURSxcbiAgICAgICAgICAgICAgICAgICAgICAnc3RyZWFtaWQnOiBzZWxmLnN0cmVhbWlkLFxuICAgICAgICAgICAgICAgICAgICAgICdjaGFubmVsaWQnOiBzZWxmLnN0cmVhbWlkZCxcbiAgICAgICAgICAgICAgICAgICAgICAnY2FuZGlkYXRlJzp7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2FuZGlkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwTWlkOiBldmVudC5jYW5kaWRhdGUuc2RwTWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlfX0pO1xuICAgICAgICAgICAvL31cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgLyppZiAoc2VsZi50eXBlID09PSBnbG9iYWxzXy5QMlBfU1RSRUFNX1RZUEUpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG1vcmUgbG9jYWwgY2FuZGlkYXRlJyk7XG4gICAgICAgICAgICAgIHNlbGYuc2VuZE1lc3NhZ2Uoeydtc2d0eXBlJzpnbG9iYWxzXy5TTldfU0lHLCdhcGknOmdsb2JhbHNfLlNOV19TSUdfQ0FORElEQVRFLFxuICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiBzZWxmLmlkLCAncmVtb3RlaWQnOiBzZWxmLnJlbW90ZUlkLCAnY2FuZGlkYXRlJzp7IGRvbmU6IHRydWUgfX0pO1xuICAgICAgICAgICB9IGVsc2UgeyovXG4gICAgICAgICAgICAgIHNlbGYuc2VuZE1lc3NhZ2Uoeydtc2d0eXBlJzpnbG9iYWxzXy5TTldfTVNHVFlQRV9JQ0UsJ2FwaSc6Z2xvYmFsc18uU05XX0lDRV9DQU5ESURBVEUsXG4gICAgICAgICAgICAgICAgICAgICAgICdzdHJlYW1pZCc6IHNlbGYuc3RyZWFtaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICdjaGFubmVsaWQnOiBzZWxmLnN0cmVhbWlkLFxuICAgICAgICAgICAgICAgICAgICAgICAnY2FuZGlkYXRlJzp7IGRvbmU6IHRydWUgfX0pO1xuICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbmFkZHN0cmVhbShldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnUmVtb3RlIHN0cmVhbSBhZGRlZCwgc3JjOicgKyBzZWxmLnJlbW90ZVZpZGVvRWxtKTtcbiAgICAgICAgc2VsZi5yZW1vdGVTdHJlYW0gPSBldmVudC5zdHJlYW07XG4gICAgICAgIGlmIChzZWxmLnJlbW90ZVZpZGVvRWxtKVxuICAgICAgICAgIHNlbGYucmVtb3RlVmlkZW9FbG0uc3JjT2JqZWN0ID0gZXZlbnQuc3RyZWFtO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBvbnJlbW92ZXN0cmVhbShldmVudCkge1xuICAgICAgICAgY29uc29sZS5sb2coJ1JlbW90ZSBzdHJlYW0gcmVtb3ZlZC4gRXZlbnQ6ICcsIGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgIGNvbnNvbGUubG9nKFwiSUNFIGNvbm5lY3Rpb24gc3RhdHVzIGNoYW5nZWQgOiBzdHJlYW1pZD1cIlxuICAgICAgICAgICAgICsgc2VsZi5pZCArIFwiIFwiICsgZXZlbnQudGFyZ2V0LmljZUNvbm5lY3Rpb25TdGF0ZSk7XG4gICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gXCJjb25uZWN0ZWRcIikge1xuICAgICAgICAgICAgc2VsZi5vbkljZUNvbm5lY3RlZCgpO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLnBjLm9uaWNlY2FuZGlkYXRlID0gb25pY2VjYW5kaWRhdGU7XG4gICAgICB0aGlzLnBjLm9uYWRkc3RyZWFtID0gb25hZGRzdHJlYW07XG4gICAgICB0aGlzLnBjLm9ucmVtb3Zlc3RyZWFtID0gb25yZW1vdmVzdHJlYW07XG4gICAgICB0aGlzLnBjLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gb25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2U7XG4gICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIHRoaXMucGMuYWRkU3RyZWFtKHN0cmVhbSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubG9jYWxTdHJlYW0pIHtcbiAgICAgICAgdGhpcy5wYy5hZGRTdHJlYW0odGhpcy5sb2NhbFN0cmVhbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJubyBsb2NhbCBzdHJlYW1cIik7XG4gICAgICB9XG4gICB9XG5cblxuICBwdWJsaXNoKCkge1xuICAgICB0aGlzLnR5cGUgPSBnbG9iYWxzXy5QVUJMSVNIRVJfU1RSRUFNX1RZUEVcbiAgICAgdGhpcy5jcmVhdGVQZWVyQ29ubmVjdGlvbih0aGlzLmxvY2FsU3RyZWFtKTtcbiAgICAgdGhpcy5zZW5kTWVzc2FnZSh7J21zZ3R5cGUnOmdsb2JhbHNfLlNOV19NU0dUWVBFX0lDRSwnYXBpJzpnbG9iYWxzXy5TTldfSUNFX0NPTk5FQ1QsXG4gICAgICAgICAgICAgICdjaGFubmVsaWQnOiB0aGlzLnN0cmVhbWlkLCAnc3RyZWFtX3R5cGUnOiB0aGlzLnR5cGUsICd2aWRlb19jb2RlYyc6IHRoaXMudmNvZGVjLFxuICAgICAgICAgICAgICAnbmFtZSc6ICd0ZXN0JywgJ3N0cmVhbWlkJzogdGhpcy5zdHJlYW1pZH0pO1xuICB9XG5cbn1cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==