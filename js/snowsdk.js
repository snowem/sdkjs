// SDK global constants
(function (window) {
  var SnowSDK = {};
  if (window.SnowSDK) {
     return;
  }
  SnowSDK.init = function(callback) {
    console.log("deprecated version");
  }
  window.SnowSDK = SnowSDK;
 
})(this);

(function (window) {
   'use strict';
   function Globals() {
      this.SNW_ICE = 1;
      this.SNW_CORE = 2;
      this.SNW_EVENT = 3;
      this.SNW_SIG = 4;

      // ICE PUBLIC API
      this.SNW_ICE_CREATE = 1;
      this.SNW_ICE_CONNECT = 2;
      this.SNW_ICE_PUBLISH = 3;
      this.SNW_ICE_PLAY = 4;
      this.SNW_ICE_STOP = 5;
      this.SNW_ICE_CONTROL = 6;
      this.SNW_ICE_AUTH = 7;
      this.SNW_ICE_CALL = 8;

      // ICE INTERNAL API
      this.SNW_ICE_SDP = 128; 
      this.SNW_ICE_CANDIDATE = 129;
      this.SNW_ICE_FIR = 130;

      // EVENT API
      this.SNW_EVENT_ICE_CONNECTED = 1;
      this.SNW_EVENT_PEER_JOINED = 2;

      // SIG API
      this.SNW_SIG_AUTH = 1;
      this.SNW_SIG_CREATE = 2;
      this.SNW_SIG_CONNECT = 3;
      this.SNW_SIG_CALL = 4;
      this.SNW_SIG_SDP = 128; 
      this.SNW_SIG_CANDIDATE = 129;
      this.SNW_SIG_FIR = 130;

      function get_browser_info() {
         var unknown = '-';
         var screenSize = '';
         if (screen.width) {
             var width = (screen.width) ? screen.width : '';
             var height = (screen.height) ? screen.height : '';
             screenSize += '' + width + " x " + height;
         }

         var nVer = navigator.appVersion;
         var nAgt = navigator.userAgent;
         var browser = navigator.appName;
         var version = '' + parseFloat(navigator.appVersion);
         var majorVersion = parseInt(navigator.appVersion, 10);
         var nameOffset, verOffset, ix;

         if ((verOffset = nAgt.indexOf('Opera')) != -1) {
             browser = 'Opera';
             version = nAgt.substring(verOffset + 6);
             if ((verOffset = nAgt.indexOf('Version')) != -1) {
                 version = nAgt.substring(verOffset + 8);
             }
         }
         else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
             browser = 'Microsoft Internet Explorer';
             version = nAgt.substring(verOffset + 5);
         }
         else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
             browser = 'Chrome';
             version = nAgt.substring(verOffset + 7);
         }
         else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
             browser = 'Safari';
             version = nAgt.substring(verOffset + 7);
             if ((verOffset = nAgt.indexOf('Version')) != -1) {
                 version = nAgt.substring(verOffset + 8);
             }
         }
         else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
             browser = 'Firefox';
             version = nAgt.substring(verOffset + 8);
         }
         else if (nAgt.indexOf('Trident/') != -1) {
             browser = 'Microsoft Internet Explorer';
             version = nAgt.substring(nAgt.indexOf('rv:') + 3);
         }
         else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
             browser = nAgt.substring(nameOffset, verOffset);
             version = nAgt.substring(verOffset + 1);
             if (browser.toLowerCase() == browser.toUpperCase()) {
                 browser = navigator.appName;
             }
         }
         // trim the version string
         if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
         if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
         if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

         majorVersion = parseInt('' + version, 10);
         if (isNaN(majorVersion)) {
             version = '' + parseFloat(navigator.appVersion);
             majorVersion = parseInt(navigator.appVersion, 10);
         }

         // mobile version
         var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
         // cookie
         var cookieEnabled = (navigator.cookieEnabled) ? true : false;
         if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
             document.cookie = 'testcookie';
             cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
         }

         // system
         var os = unknown;
         var clientStrings = [
             {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
             {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
             {s:'Windows Vista', r:/Windows NT 6.0/},
             {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
             {s:'Android', r:/Android/},
             {s:'OpenBSD', r:/OpenBSD/},
             {s:'SunOS', r:/SunOS/},
             {s:'Linux', r:/(Linux|X11)/},
             {s:'iOS', r:/(iPhone|iPad|iPod)/},
             {s:'MacOS', r:/Mac OS X/},
             {s:'QNX', r:/QNX/},
             {s:'UNIX', r:/UNIX/},
         ];
         for (var id in clientStrings) {
             var cs = clientStrings[id];
             if (cs.r.test(nAgt)) {
                 os = cs.s;
                 break;
             }
         }

         var osVersion = unknown;
         if (/Windows/.test(os)) {
             osVersion = /Windows (.*)/.exec(os)[1];
             os = 'Windows';
         }

         switch (os) {
             case 'Mac OS X':
                 osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                 break;

             case 'Android':
                 osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                 break;

             case 'iOS':
                 osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                 osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                 break;
         }

         return {
             screen: screenSize,
             browser: browser,
             browserVersion: version,
             browserMajorVersion: majorVersion,
             mobile: mobile,
             os: os,
             osVersion: osVersion,
             cookies: cookieEnabled
         };
      }

      this.mBrowserInfo = get_browser_info();
      this.getBrowserInfo = function() {
         return this.mBrowserInfo;
      }

      return this;
   }

   var SnowSDK = window.SnowSDK;
   SnowSDK.Globals = Globals;
})(this);

// SDK Utitlities
(function(window, undefined) {
   function uuid() {
     function s4() {
       return Math.floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1);
     }
     return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
       s4() + '-' + s4() + s4() + s4();
   }

   var SnowSDK = window.SnowSDK;
   SnowSDK.Utils = {};
   SnowSDK.Utils.uuid = uuid;
})(this);

// SDK configurations
(function(window, undefined) {
   function Config() {
      // wss settings
      this.wss_ip = "";
      this.wss_port = 443;

      // webrtc settings
      this.media_constraints = { audio: true, 
                                video: {
                                  mandatory:{
                                     maxWidth: 480,
                                     maxHeight: 270,
                                     minWidth: 480,
                                     minHeight: 270
                              }}};
      this.peerconnection_config = {'iceServers':[{'urls':'stun:stun.l.google.com:19302',
                                                   'urls':'stun:stun1.l.google.com:19302',
                                                   'urls':'stun:stun2.l.google.com:19302',
                                                   'urls':'stun:stun3.l.google.com:19302',
                                                   'urls':'stun:stun4.l.google.com:19302'}],
                                    'iceTransports': 'all'};
      this.sdp_constraints = {'mandatory': {
         'OfferToReceiveAudio':true,
         'OfferToReceiveVideo':true }}; 
   }

   Config.prototype.init= function(config) {
      if (typeof config === 'undefined') {
         console.error("no config found");
         return false;
      }

      if (typeof config.wss_ip === 'undefined') {
         console.error("no websocket server ip found");
         return false;
      } else {
         this.wss_ip = config.wss_ip;
      }

      if (typeof config.wss_port !== 'undefined') {
         this.wss_port = config.wss_port;
      }

      return true;
   };
    
   var SnowSDK = window.SnowSDK;
   SnowSDK.Config = Config;
})(this);

// ws client
(function(window, undefined) {
   function WsClient(){
      this.ipaddr = null;
      this.port = 0;
      this.websocket = null;
      this.onmessage = null;
      this.isReady = false;
      this.msgs = [];
   }

   WsClient.prototype.connect = function(ipaddr, port, onsuccess) {
      var self = this;
      self.ipaddr = ipaddr;
      self.port = port;
      if ("WebSocket" in window) {
         self.websocket = new WebSocket("wss://"+ipaddr+":"+port,"default");
         self.websocket.binaryType = 'blob';
         self.websocket.onopen = function(e) {
            self.isReady = true;
            for (var i = 0; i < self.msgs.length; i++) {
               var msg = JSON.stringify(self.msgs[i]);
               self.websocket.send(msg);
            }
            self.msgs = []; //reset it.
            if (onsuccess) onsuccess();
         };
         self.websocket.onmessage = function (evt) {
           if (self.onmessage != null) {
              self.onmessage(evt);
           } else {
              var msg = JSON.parse(evt.data);
              console.log("have not defined onmessage: ", evt.data);
           }
         };
      } else {
         console.warn("WebSocket is not supported by your browser!");
      }
   }

   WsClient.prototype.setOnMessageCB = function(callback) {
      this.onmessage = callback;
   }

   WsClient.prototype.send = function(message) {
      if (!this.isReady) {
         this.msgs.push(message);
         return;
      }
      if (this.websocket) {
         if (typeof message === 'object') {
            message = JSON.stringify(message);
         }
         console.log("sending msg, msg=", message);
         this.websocket.send(message);
      } else {
         console.warn("websocket not ready");
      }
   }

   SnowSDK.WsClient = WsClient;
})(this);
// end of ws client

// peer agent
(function(window, undefined) {
   var SnowSDK = window.SnowSDK;
   var globals = SnowSDK.Globals();


   function PeerAgent(config){
      this.isReady = 0;
      this.peerId = 0; 
      this.remoteId = 0; 
      this.channelId = 0; 
      this.name = "";
      this.isVideo = "on";
      this.isH264 = 1;
      this.localStream = null;
      this.remoteStream = null;
      this.localVideoElm = null;
      this.remoteVideoElm = null;
      this.pc = null;
      this.ice_state = "disconnected";
      this.peerType = "none";

      // websocket info
      this.ws_client = null;
      this.ws_connected = 0;
      this.ws_msg_queue = [];

      this.listeners = [];
      this.config = new SnowSDK.Config();
      if (this.config.init(config)) {
        this.init();
      }
   }

   PeerAgent.prototype.init = function() {
      var self = this;

      if (typeof this.config.wss_ip === 'undefined') {
         console.error("undefined websocket server ip");
         return;
      }

      //set up network
      function onmessage(evt) {
         var msg = JSON.parse(evt.data);
         console.log("onmessage: ", evt.data);
         self.receive(msg);
         return;
      };
      this.ws_client = new SnowSDK.WsClient();
      this.ws_client.setOnMessageCB(onmessage);
      this.ws_client.connect(this.config.wss_ip,this.config.wss_port, function() {
         console.log("websocket is connected");
         self.ws_connected = 1;
         for (var i = 0; i < self.ws_msg_queue.length; i++) {
            self.ws_client.send(self.ws_msg_queue[i]);
         }
         self.ws_msg_queue = [];
      });

      //FIXME: handle auth_data
      if (this.config.auth_data == null) 
         this.config.auth_data = "none";
      this.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_AUTH,
                 'auth_data':this.config.auth_data});
   }
   
   PeerAgent.prototype.listen = function(eventName, handler) {
      if (typeof this.listeners[eventName] === 'undefined') {
         this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(handler);
   }
   
   PeerAgent.prototype.unlisten = function(eventName, handler) {
      if (!this.listeners[eventName]) {
         return; 
      }
      for (var i = 0; i < this.listeners[eventName].length; i++) {
         if (this.listeners[eventName][i] === handler) {
            this.listeners[eventName].splice(i, 1);
            break; 
         }
      }
   };

   PeerAgent.prototype.broadcast = function(eventName,msg) {
      console.log("broadcast, event=" + eventName + ", msg=" + JSON.stringify(msg));
      if (!this.listeners[eventName]) {
         console.log("no handler for event, name=" + JSON.stringify(eventName));
         return; 
      }
      for (var i = 0; i < this.listeners[eventName].length; i++) {
         this.listeners[eventName][i](msg);
      } 
   }

   PeerAgent.prototype.do_offer = function() {
      var self = this;
      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        if (self.peerType === 'p2p') {
           self.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_SDP,
                   'id': self.peerId, 'remoteid': self.remoteId, 
                   'sdp':sessionDescription});
        } else {
           self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_SDP,
                   'id': self.peerId, 'sdp':sessionDescription});
        }
      }   
      function onError(e) {
         console.log("failed to create sdp answer: " + e);
      }
      this.pc.createOffer(setLocalAndSendMessage, onError, this.config.sdp_constraints);
   }

   PeerAgent.prototype.do_answer = function(msg) {
      var self = this;
      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        if (self.peerType === 'p2p') {
           self.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_SDP,
                   'id': self.peerId, 'remoteid': self.remoteId, 
                   'sdp':sessionDescription});
        } else {
           self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_SDP,
                   'id': self.peerId, 'sdp':sessionDescription});
        }
      }   
      function onError(e) {
         console.log("failed to create sdp answer: " + e);
      }
      this.pc.setRemoteDescription(new RTCSessionDescription(msg));
      this.pc.createAnswer(setLocalAndSendMessage, onError, this.config.sdp_constraints);
   }

   PeerAgent.prototype.on_remote_sdp = function(msg) {
      if (msg.type === 'offer') {
         this.do_answer(msg);
      } else if (msg.type === 'answer') { //p2p mode: answer from our offer
         if (this.peerType === 'p2p') { 
            this.pc.setRemoteDescription(new RTCSessionDescription(msg));
         } else {
            console.error("received answer, not handled");
         }
      } else {
         console.error("unknown msg: " + JSON.stringify(msg));
      }
   }

   PeerAgent.prototype.on_remote_candidate = function(msg) {
      if (msg.type === 'candidate') {
         var candidate = new RTCIceCandidate({sdpMLineIndex:msg.label, candidate:msg.candidate});
         console.log("received candidate, candidate=" + JSON.stringify(candidate));
         this.pc.addIceCandidate(candidate);
      } else {
         //console.error("unknown candidate: " + JSON.stringify(msg));
      }
   }

   PeerAgent.prototype.on_call = function(msg) {
      //TODO: do real accept from callee's perspective
      this.remoteId = msg.id;
      msg.rc = 0;
      msg.id = this.peerId
      msg.remoteid = this.remoteId
      this.send(msg);
      //FIXME: set it as parameter
      this.isVideo = "off";
      getusermedia(this,function(agent) {
         //do nothing, wait for response from other peer.
      });
   }

   PeerAgent.prototype.send = function(msg) {
     if (this.ws_connected) {
       if ( this.ws_msg_queue.length > 0) {
         for (var i = 0; i < this.ws_msg_queue.length; i++) {
           this.ws_client.send(self.ws_msg_queue[i]);
         }
         this.ws_msg_queue = [];
       }
       this.ws_client.send(msg);
     } else {
       this.ws_msg_queue.push(msg);
     }
   }

   PeerAgent.prototype.receive = function(msg) {
      if (msg.rc != null) {
         console.log("response from server: " + JSON.stringify(msg));
         if (msg.msgtype == globals.SNW_ICE ) {
            //handle ice api
         }

         if (msg.msgtype == globals.SNW_SIG ) {
            if (msg.api == globals.SNW_SIG_AUTH) {
               this.peerId = msg.id;
               this.isReady = 1;
               if (typeof this.onReady === "function") this.onReady();
               return;
            }
            if (msg.api == globals.SNW_SIG_CREATE) {
               if (msg.rc === 0) {
                  this.channelId = msg.channelid;
                  this.broadcast('onCreate',this);
                  return;
               }
            }

            if (msg.api == globals.SNW_SIG_CALL) {
               if (msg.rc === 0) {
                  getusermedia(this,function(agent) {
                     //start ice connetion when receiving 
                     // the response from other peer.
                     agent.do_offer();
                  });
               }
               return;
            }
         }
         return;
      }

      if (msg.msgtype == globals.SNW_SIG ) {
         if (msg.api == globals.SNW_SIG_CALL) {
            this.on_call(msg);
            return;
         }
         if (msg.api == globals.SNW_SIG_CANDIDATE) {
            this.on_remote_candidate(msg.candidate);
            return;
         }
         if (msg.api == globals.SNW_SIG_SDP) {
            this.on_remote_sdp(msg.sdp);
            return;
         }
         return;
      }

      if (msg.msgtype == globals.SNW_EVENT) {
         if (msg.api == globals.SNW_EVENT_ICE_CONNECTED) {
            console.log("ice connected (depracated version)");
            return;
         }
         if (msg.api == globals.SNW_EVENT_PEER_JOINED) {
            this.broadcast('onPeerJoined',msg);
            this.onPeerJoined(msg);
            return;
         }

         return;
      }

      if (msg.msgtype == globals.SNW_ICE ) {
         if (msg.api == globals.SNW_ICE_CANDIDATE) {
            this.on_remote_candidate(msg.candidate);
            return;
         }
         if (msg.api == globals.SNW_ICE_SDP) {
            this.on_remote_sdp(msg.sdp);
            return;
         }

         return;
      }

      console.error("unknown msg: " + JSON.stringify(msg));
      return;
   }

   PeerAgent.prototype.start_stream = function(stream) {
      var self = this;

      this.pc = new RTCPeerConnection(this.config.peerconnection_config, this.config.sdp_constraints)

      function onicecandidate(event) {
        //console.log('onicecandidate event: ', event);
        if (event.candidate) {
           var candidate = event.candidate.candidate;

           if (self.peerType === 'p2p') {
              self.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_CANDIDATE, 'id': self.peerId, 
                      'remoteid': self.remoteId,
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           } else {
              self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CANDIDATE, 'id': self.peerId, 
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           }
        } else {
           console.log('No more candidates.');
           if (self.peerType === 'p2p') {
              self.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_CANDIDATE,
                       'id': self.peerId, 'remoteid': self.remoteId, 'candidate':{ done: true }});
           } else {
              self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CANDIDATE,
                       'id': self.peerId, 'candidate':{ done: true }});
           }
        }
      }   

      function onaddstream(event) {
         console.log('Remote stream added, src:' + self.remoteVideoElm);
         if (self.remoteVideoElm === null) {
            console.warn("No video element for remote stream");
            return;
         }
         self.remoteVideoElm.srcObject = event.stream;
         self.remoteStream = event.stream;
      }   

      function onremovestream(event) {
         console.log('Remote stream removed. Event: ', event);
      }

      function oniceconnectionstatechange(event) {
         console.log("ICE connection status changed : " + event.target.iceConnectionState)
         if (event.target.iceConnectionState === "connected") {
            self.state = 'connected';
            self.broadcast('onIceConnected',this);
            self.onIceConnected();
         }
      }

      this.pc.onicecandidate = onicecandidate;
      this.pc.onaddstream = onaddstream;
      this.pc.onremovestream = onremovestream;
      this.pc.oniceconnectionstatechange = oniceconnectionstatechange;
      this.pc.addStream(stream); //FIXME
   }

   function getusermedia(agent, onsuccess) {
      if (agent.isVideo === "off") {
         agent.config.media_constraints.video = false;
      }
      navigator.getUserMedia(agent.config.media_constraints, function(stream) {
         if (!stream) return;
         agent.start_stream(stream);
         agent.localStream = stream;
         if (agent.localVideoElm !== null ) {
            agent.localVideoElm.srcObject = stream;
         } else {
            console.warn("No video element for local stream");
         }

         //XXX: temporarily mute
         //agent.localVideoElm.muted = false;
         //agent.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CONNECT,
         //            'channelid': agent.channelId, 'peer_type': agent.peerType, 
         //            'name': agent.name, 'id': agent.peerId});
         console.log("get media sucessfully, id=" + agent.peerId);
         onsuccess(agent);
      }, function(info) {
         console.error("failed to get media sucessfully");
      });
   } 

   PeerAgent.prototype.createChannel =function(config,onsuccess) {
      this.name = config.name;
      //this.send({'msgtype':globals.SNW_ICE,
      //           'api':globals.SNW_ICE_CREATE, 
      //           'uuid': SnowSDK.Utils.uuid()});//TODO: store it in PeerAgent obj.
      console.log("create channel, peerid=" + this.peerId);
      this.send({'msgtype':globals.SNW_SIG,
                 'api':globals.SNW_SIG_CREATE, 'id': this.peerId,
                 'uuid': SnowSDK.Utils.uuid()});//TODO: store it in PeerAgent obj.
      this.listen('onCreate',onsuccess);
   }

   PeerAgent.prototype.connect = function(config) {
      if (config.video) 
        this.isVideo = config.video;
      else
        this.isVideo = "on";

      if (config.h264) 
         this.isH264 = config.h264

      this.channelId = config.channelid;
      if (config.peerType !== undefined)
         this.peerType = config.peerType;

      this.localVideoElm = config.localVideoId;
      this.remoteVideoElm = config.remoteVideoId;

      if (this.peerType === "p2p") {//for p2p, delay calling getUserMedia()
         this.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_CONNECT,
                     'channelid': this.channelId, 'peer_type': this.peerType, 'h264': this.isH264,
                     'name': this.name, 'id': this.peerId});
      } else {
         if (config.localStream) {
            //get media source directly
            console.log("start local media source directly, stream=", config.localStream);
            this.start_stream(config.localStream);
            this.localStream = config.localStream;
            if (this.localVideoElm !== null ) {
               this.localVideoElm.srcObject = this.localStream;
            } else {
               console.warn("No video element for local stream");
            }
            this.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CONNECT,
                     'channelid': this.channelId, 'peer_type': this.peerType, 'h264': this.isH264,
                     'name': this.name, 'id': this.peerId});
         } else {
            getusermedia(this, function(agent) {
               agent.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CONNECT,
                     'channelid': agent.channelId, 'peer_type': agent.peerType, 'h264': agent.isH264,
                     'name': agent.name, 'id': agent.peerId});
            });
         }
      }
   }

   PeerAgent.prototype.onIceConnected = function() {
      if (this.peerType === "pub") {
         console.log("publishing a stream, channelId=" + this.channelId);
         this.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_PUBLISH, 
                 'channelid': this.channelId, 'id': this.peerId});
      } else if (this.peerType === "pla") {
         console.log("playing a stream, channelId=" + this.channelId);
         this.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_PLAY, 
                 'channelid': this.channelId, 'id': this.peerId});
      } else {
         //console.log("p2p mode (nothing to do), channelId=" + this.channelId);
      }
   }

   PeerAgent.prototype.onPeerJoined = function(msg) {
      console.log("onPeerJoined: msg=" + JSON.stringify(msg));
   }

   PeerAgent.prototype.publish = function(config) {
      this.peerType = "pub";
      this.connect(config);
   }

   PeerAgent.prototype.play = function(config) {
      this.peerType = "pla";
      this.connect(config);
   }

   PeerAgent.prototype.call = function(remoteid) {
      this.remoteId = remoteid;
      //FIXME: set it as parameters
      this.isVideo = "off";
      this.send({'msgtype':globals.SNW_SIG,'api':globals.SNW_SIG_CALL, 
              'channelid': this.channelId, 'id': this.peerId, 'remoteid': remoteid});
   }

   SnowSDK.PeerAgent = PeerAgent;
})(this);
// end of peer agent

// SDK API implementation
(function(window, undefined) {
   var SnowSDK = window.SnowSDK;
   var globals = SnowSDK.Globals();
   //var config = SnowSDK.Config();

   /* ---------------- SnowSDK events ---------------------------------------*/
   var listeners = {};
   SnowSDK.listen = function(eventName, handler) {
      if (typeof listeners[eventName] === 'undefined') {
         listeners[eventName] = [];
      }
      listeners[eventName].push(handler);
   }

   SnowSDK.unlisten = function(eventName, handler) {
      if (!listeners[eventName]) {
         return; 
      }
      for (var i = 0; i < listeners[eventName].length; i++) {
         if (listeners[eventName][i] === handler) {
            listeners[eventName].splice(i, 1);
            break; 
         }
      }
   };

   SnowSDK.broadcast = function(eventName,msg) {
      //console.log("broadcast, event=" + eventName + ", msg=" + JSON.stringify(msg));
      if (!listeners[eventName]) {
         console.warn("no handler for event, name=" + JSON.stringify(eventName));
         return; 
      }
      for (var i = 0; i < listeners[eventName].length; i++) {
         listeners[eventName][i](msg);
      } 
   }
   /* ----------------  end of SnowSDK events ---------------------------------*/

   /* ----------------  SnowSDK API --------------------------------------------*/
   SnowSDK.createPeer = function(conf) {
      var agent = new SnowSDK.PeerAgent(conf);
      return agent;
   }
   /* ----------------  end of SnowSDK API --------------------------------------*/

   // sdk initiatlized
   //console.log("sdk initialized");

})(this);

/* loading other stuff */
(function (window) {
  function loadScript(url, callback) {
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);

    console.log("loading script: " + url);
    script.onload = script.onreadystatechange = function() {
      var rdyState = script.readyState;
      if (!rdyState || /complete|loaded/.test(script.readyState)) {
        console.log("script loaded: " + url);
        callback();
        script.onload = null;
        script.onreadystatechange = null;
      }
    }
  }

  function getBaseUrl(filename) {
    var scriptElements = document.getElementsByTagName('script');
    for (var i = 0; i < scriptElements.length; i++) {
      var source = scriptElements[i].src;
      if (source.indexOf(filename) > -1) {
        var location = source.substring(0, source.indexOf(filename)) + filename;
        return location;
      }
    }
    return false;
  }      

  function loadCallback() {
    console.log("initializing asyn snowsdk");
    if (typeof window.snowAsyncInit === 'function') {
      window.snowAsyncInit();
    }
  }

  var url = getBaseUrl("snowsdk.js").replace("snowsdk.js","adapter.js");
  loadScript(url,loadCallback);
})(this);
