// SDK global constants
(function (window) {
   'use strict';
   function Globals() {
      this.SNW_ICE = 1;
      this.SNW_CORE = 2;
      this.SNW_EVENT = 3;

      // ICE PUBLIC API
      this.SNW_ICE_CREATE = 1;
      this.SNW_ICE_CONNECT = 2;
      this.SNW_ICE_PUBLISH = 3;
      this.SNW_ICE_PLAY = 4;
      this.SNW_ICE_STOP = 5;
      this.SNW_ICE_CONTROL = 6;
      this.SNW_ICE_AUTH = 7;

      // ICE INTERNAL API
      this.SNW_ICE_SDP = 128; 
      this.SNW_ICE_CANDIDATE = 129;
      this.SNW_ICE_FIR = 130;

      // EVENT API
      this.SNW_EVENT_ICE_CONNECTED = 1;

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
      this.servername = "";
      this.port = 0;
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
      this.servername = config.servername;
      this.port = config.port;
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
         //console.log("WebSocket is supported by your Browser!");
         // Let us open a web socket
         self.websocket = new WebSocket("wss://"+ipaddr+":"+port,"default");
         self.websocket.binaryType = 'blob';
         self.websocket.onopen = function(e) {
            console.log("onopen: web socket is opened");
            self.isReady = true;
            for (var i = 0; i < self.msgs.length; i++) {
               var msg = JSON.stringify(self.msgs[i]);
               console.log("sending queued msg, msg=" + msg);
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
      }
   }

   WsClient.prototype.setOnMessageCB = function(callback) {
      this.onmessage = callback;
   }

   WsClient.prototype.send = function(message) {
      if (!this.isReady) {
         console.log('[wss] store message: ', message);
         this.msgs.push(message);
         return;
      }
      if (this.websocket) {
         console.log('[wss] sending message: ', message);
         if (typeof message === 'object') {
            message = JSON.stringify(message);
         }
         this.websocket.send(message);
      } else {
         console.log("websocket not ready");
      }
   }

   SnowSDK.WsClient = WsClient;
})(this);
// end of ws client

// peer agent
(function(window, undefined) {
   var SnowSDK = window.SnowSDK;
   var globals = SnowSDK.Globals();


   function PeerAgent(){
      this.peerId = 0; 
      this.channelId = 0; 
      this.name = "";
      this.isVideo = "on";
      this.localStream = {};
      this.remoteStream = {};
      this.localVideoEl = null;
      this.remoteVideoEl = null;
      this.pc = null;
      this.state = "disconnected";
      this.isPublisher = 0;
      this.wsClient = null;
      this.listeners = [];
      this.config = new SnowSDK.Config();
   }

   PeerAgent.prototype.init = function(config) {
      var self = this;

      // set config
      console.log("set config: " + JSON.stringify(config.servername));
      if (typeof config.servername === 'undefined') {
         console.error("undefined servername");
         return;
      }
      this.config.init(config);

      //set up network
      function onmessage(evt) {
         var msg = JSON.parse(evt.data);
         console.log("onmessage: ", evt.data);
         self.receive(msg);
         return;
      };
      this.wsClient = new SnowSDK.WsClient();
      this.wsClient.setOnMessageCB(onmessage);
      this.wsClient.connect(this.config.servername,this.config.port, function() {
         console.log("websocket is connected");
      });
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

   PeerAgent.prototype.do_answer = function(msg) {
      var self = this;
      function setLocalAndSendMessage(sessionDescription) {
        //sessionDescription.sdp = preferOpus(sessionDescription.sdp);
        console.log("setLocalAndSendMessage: " + self.pc);
        self.pc.setLocalDescription(sessionDescription);
        self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_SDP,
                   'sdp':sessionDescription});
      }   
      function onError(e) {
         console.log("failed to create sdp answer: " + e);
      }
      //console.log("remote sdp: " + JSON.stringify(msg));
      this.pc.setRemoteDescription(new RTCSessionDescription(msg));
      this.pc.createAnswer(setLocalAndSendMessage, onError, this.config.sdp_constraints);
   }

   PeerAgent.prototype.on_remote_sdp = function(msg) {
      if (msg.type === 'offer') {
         //console.log("received offer: " + JSON.stringify(msg));
         this.do_answer(msg);
      } else if (msg.type === 'answer') {
         console.log("[ERROR] received answer, not handled");
      } else {
         console.log("[ERROR] unknown msg: " + JSON.stringify(msg));
      }
   }

   PeerAgent.prototype.on_remote_candidate = function(msg) {
      //console.log("received candidate: " + JSON.stringify(msg));
      if (msg.type === 'candidate') {
         var candidate = new RTCIceCandidate({sdpMLineIndex:msg.label, candidate:msg.candidate});
         console.log("received candidate, label=" + msg.label);
         this.pc.addIceCandidate(candidate);
      } else {
         console.log("[ERROR] unknown candidate: " + JSON.stringify(msg));
      }
   }

   PeerAgent.prototype.send = function(msg) {
      this.wsClient.send(msg);
   }

   PeerAgent.prototype.receive = function(msg) {
      if (msg.rc != null) {
         console.log("response from server: " + JSON.stringify(msg));
         if (msg.msgtype == globals.SNW_ICE ) {
            if (msg.api == globals.SNW_ICE_CREATE) {
               this.peerId = msg.id;
               this.channelId = msg.channelid;
               this.broadcast('onCreate',this);
               return;
            }
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
      if (msg.msgtype == globals.SNW_EVENT) {
         if (msg.api == globals.SNW_EVENT_ICE_CONNECTED) {
            this.state = 'connected';
            this.broadcast('onIceConnected',this);
            this.onIceConnected();
            return;
         }
         return;
      }

      console.log("[ERROR] unknown msg: " + JSON.stringify(msg));
      return;
   }

   PeerAgent.prototype.start_stream = function(stream) {
      var self = this;

      this.pc = new RTCPeerConnection(this.config.peerconnection_config, this.config.sdp_constraints)

      function onicecandidate(event) {
        console.log('onicecandidate event: ', event);
        if (event.candidate) {
           var candidate = event.candidate.candidate;
           //console.log("send relay address, sdpMid=", event.candidate.sdpMid);
           //console.log("send relay address, sdpMlineIndex=", event.candidate.sdpMLineIndex);

           self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CANDIDATE, 'id': this.peerId, 
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
        } else {
           console.log('End of candidates.');
           self.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CANDIDATE,
                       'id': this.peerId, 'candidate':{ done: true }});
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

      this.pc.onicecandidate = onicecandidate;
      this.pc.onaddstream = onaddstream;
      this.pc.onremovestream = onremovestream;
      this.pc.addStream(stream); //FIXME
   }

   function getusermedia(agent) {
      if (agent.isVideo === "off") 
         agent.config.media_constraints.video = false;
      console.log("set media constraint, info=" + JSON.stringify(agent.config.media_constraints));
      navigator.getUserMedia(agent.config.media_constraints, function(stream) {
         console.log("get media sucessfully, id=" + agent.peerId);
         if (!stream) {
            return;
         }
         agent.start_stream(stream);
         agent.localStream = stream;
         if (agent.localVideoElm !== null ) {
            agent.localVideoElm.srcObject = stream;
         } else {
            console.warn("No video element for local stream");
         }
         //XXX: temporarily mute
         //agent.localVideoElm.muted = false;
         agent.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_CONNECT, 
                     'channelid': agent.channelId, 'publish': agent.isPublisher, 
                     'name': agent.name, 'id': agent.peerId});
      }, function(info) {
         console.log("failed to get media sucessfully");
      });
   } 

   PeerAgent.prototype.createChannel =function(config,onsuccess) {
      this.name = config.name;
      this.send({'msgtype':globals.SNW_ICE,
                 'api':globals.SNW_ICE_CREATE, 
                 'uuid': SnowSDK.Utils.uuid()});//TODO: store it in PeerAgent obj.
      this.listen('onCreate',onsuccess);
   }

   PeerAgent.prototype.connect = function(config) {
      console.log("connect config info, config="+JSON.stringify(config));
      if (config.video) 
        this.isVideo = config.video;
      else
        this.isVideo = "on";

      this.remoteChannelId = config.channelid;

      this.localVideoElm = config.localVideoId;
      this.remoteVideoElm = config.remoteVideoId;

      getusermedia(this);
   }

   PeerAgent.prototype.onIceConnected = function() {
      console.log("onIceConnected: stream mode, isPublisher=" + this.isPublisher);
      if (this.isPublisher == 1) {
         console.log("publishing a stream");
         this.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_PUBLISH, 
                 'channelid': this.channelId, 'id': this.peerId});
      } else {
         console.log("playing a stream");
         this.send({'msgtype':globals.SNW_ICE,'api':globals.SNW_ICE_PLAY, 
                 'channelid': this.remoteChannelId, 'id': this.peerId});
      }
   }

   PeerAgent.prototype.publish = function(config) {
      console.log("publishing, config="+JSON.stringify(config));
      this.isPublisher = 1; 
      this.connect(config);
   }

   PeerAgent.prototype.play = function(config) {
      console.log("playing, config="+JSON.stringify(config));
      this.isPublisher = 0; 
      this.connect(config);
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
      console.log("broadcast, event=" + eventName + ", msg=" + JSON.stringify(msg));
      if (!listeners[eventName]) {
         console.log("no handler for event, name=" + JSON.stringify(eventName));
         return; 
      }
      for (var i = 0; i < listeners[eventName].length; i++) {
         listeners[eventName][i](msg);
      } 
   }
   /* ----------------  end of SnowSDK events ---------------------------------*/

   /* ----------------  SnowSDK API --------------------------------------------*/
   SnowSDK.createPeer = function(config) {
      var agent = new SnowSDK.PeerAgent();
      console.log("agent config: " + JSON.stringify(config));
      agent.init(config);
      return agent;
   }
   /* ----------------  end of SnowSDK API --------------------------------------*/

   // sdk initiatlized
   //console.log("sdk initialized");

})(this);


