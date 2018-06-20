(function (window) {
   'use strict';
   window.SnowSDK = {};
   var SnowSDK = window.SnowSDK || {};

   function Globals() {
      this.SNW_ICE = 1;
      this.SNW_CORE = 2;
      this.SNW_EVENT = 3;
      this.SNW_SIG = 4;
      this.SNW_CHANNEL = 5;

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
      this.SNW_EVENT_ADD_STREAM = 2;
      this.SNW_EVENT_REMOVE_STREAM = 3;
      this.SNW_EVENT_JOINED_STREAM = 4;

      //TODO: remove these events
      this.SNW_EVENT_ADD_SUBCHANNEL = 4;
      this.SNW_EVENT_DEL_SUBCHANNEL = 5;

      // SIG API
      this.SNW_SIG_AUTH = 1;
      this.SNW_SIG_CREATE = 2;
      this.SNW_SIG_CONNECT = 3;
      this.SNW_SIG_CALL = 4;
      this.SNW_SIG_PUBLISH = 5;
      this.SNW_SIG_PLAY = 6;
      this.SNW_SIG_SDP = 128;
      this.SNW_SIG_CANDIDATE = 129;
      this.SNW_SIG_FIR = 130;

      this.SNW_CHANNEL_CREATE = 1;
      this.SNW_CHANNEL_DELETE = 2;
      this.SNW_CHANNEL_QUERY = 3;
      this.SNW_CHANNEL_CONNECT = 4;
      this.SNW_CHANNEL_DISCONNECT = 5;
      this.SNW_CHANNEL_CREATE_STREAM = 6;

      this.ACODEC_OPUS = "opus";
      this.ACODEC_PMCU = "pmcu";
      this.VCODEC_H264 = "h264";
      this.VCODEC_VP8 = "vp8";
      this.VCODEC_VP9 = "vp9";

      this.CONF_CHANNEL_TYPE = 0; //"conference";
      this.P2P_CHANNEL_TYPE = 1;  //"p2p";
      this.LIVE_CHANNEL_TYPE = 2; //"broadcast";

      this.UNKNOWN_STREAM_TYPE = 0;
      this.PUBLISHER_STREAM_TYPE = 1;
      this.SUBSCRIBER_STREAM_TYPE = 2;
      this.P2P_STREAM_TYPE = 3;
   }

   SnowSDK.Globals = Globals;
   SnowSDK.globals_ = new SnowSDK.Globals();

})(this);

// Stream object
(function(window, undefined) {
   'use strict';
   var SnowSDK = window.SnowSDK || {};
   var globals_ = SnowSDK.globals_ || {};

   function Stream(config) {

     this.id = 0;
     this.remoteId = 0;
     this.audio = false;
     this.video = false;
     this.data = false;
     this.name = "LocalCamera";
     this.channelId = 0;
     this.type = globals_.PUBLISHER_STREAM_TYPE;
     this.acodec = "opus";
     this.vcodec = "vp8";
     this.localStream = null;
     this.remoteStream = null;
     this.localVideoElm = null;
     this.remoteVideoElm = null;
     this.makecall = 0;
     this.config = {};
     this.config.mediaConstraints = { audio: true, 
                                video: {
                                  mandatory:{
                                     maxWidth: 480,
                                     maxHeight: 270,
                                     minWidth: 480,
                                     minHeight: 270
                              }}};
     this.config.pcConfig = {'iceServers':[{'urls':'stun:stun.l.google.com:19302',
                                            'urls':'stun:stun1.l.google.com:19302',
                                            'urls':'stun:stun2.l.google.com:19302',
                                            'urls':'stun:stun3.l.google.com:19302',
                                            'urls':'stun:stun4.l.google.com:19302'}],
                                    'iceTransports': 'all'};

     //TODO: chrome and firefox do differently here
     this.config.sdpConstraints = {'mandatory': {
         'OfferToReceiveAudio':true,
         'OfferToReceiveVideo':true }}; 
 
     this.listeners = [];
     this.channelObj = null;
     this.pc = null;
     this.state = "disconnected";

     if (typeof config.sdpConstraints !== 'undefined') {
       this.config.sdpConstraints = config.sdpConstraints;
     }

     if (typeof config.id !== 'undefined') {
       this.id = config.id;
     }
     if (typeof config.remoteId !== 'undefined') {
       this.remoteId = config.remoteId;
     }
     if (typeof config.channelId !== 'undefined') {
       this.channelId = config.channelId;
     }
     if (typeof config.audio !== 'undefined') {
       this.audio = config.audio;
       this.config.mediaConstraints.audio = config.audio;
     }
     if (typeof config.video !== 'undefined') {
       this.video = config.video;
       this.config.mediaConstraints.video = config.video;
     }
     if (typeof config.data !== 'undefined') {
       this.data = config.data;
     }

     if (typeof config.type !== 'undefined') {
       if ( config.type === "publisher") {
         this.type = globals_.PUBLISHER_STREAM_TYPE;
       } else if (config.type === "subscriber") {
         this.type = globals_.SUBSCRIBER_STREAM_TYPE;
       } else if (config.type === "p2p") {
         this.type = globals_.P2P_STREAM_TYPE;
       }
     }
   }

   Stream.prototype.setId = function(id) {
     this.id = id;
   }

   Stream.prototype.getId = function() {
     return this.id;
   }

   Stream.prototype.setChannelId = function(id) {
     this.channelId = id;
   }

   Stream.prototype.getChannelId = function() {
     return this.channelId;
   }

   Stream.prototype.setLocalVideoElm = function(elm) {
     this.localVideoElm = elm;
     if (this.localStream)
       this.localVideoElm.srcObject = this.localStream;
   }

   Stream.prototype.getLocalVideoElm = function() {
     return this.localVideoElm;
   }

   Stream.prototype.setRemoteVideoElm = function(elm) {
     this.remoteVideoElm = elm;
     if (this.remoteStream)
       this.remoteVideoElm.srcObject = this.remoteStream;
   }

   Stream.prototype.getRemoteVideoElm = function() {
     return this.remoteVideoElm;
   }

   Stream.prototype.createPeerConnection = function(stream) {
      var self = this;

      this.pc = new RTCPeerConnection(this.config.pcConfig, this.config.sdpConstraints)

      function onicecandidate(event) {
        if (event.candidate) {
           var candidate = event.candidate.candidate;
           //TODO: allow only private or specific IP?
           //if (candidate.indexOf("192.168") === -1) return;
           var candidate = event.candidate.candidate;

           if (self.type === globals_.P2P_STREAM_TYPE) {
              console.log('send local candidate: ' + JSON.stringify(event.candidate));
              self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                      'id': self.id, 
                      'remoteid': self.remoteId,
                      'candidate':{
                           type: 'candidate',
                           sdpMLineIndex: event.candidate.sdpMLineIndex,
                           sdpMid: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           } else {
              self.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CANDIDATE, 
                      'streamid': self.id, 
                      'channelid': self.channelId, 
                      'candidate':{
                           type: 'candidate',
                           sdpMLineIndex: event.candidate.sdpMLineIndex,
                           sdpMid: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           }
        } else {
           if (self.type === globals_.P2P_STREAM_TYPE) {
              console.log('no more local candidate');
              self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                       'id': self.id, 'remoteid': self.remoteId, 'candidate':{ done: true }});
           } else {
              self.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CANDIDATE,
                       'streamid': self.id, 
                       'channelid': self.channelId, 
                       'candidate':{ done: true }});
           }
        }
      }   

      function onaddstream(event) {
        console.log('Remote stream added, src:' + self.remoteVideoElm);
        self.remoteStream = event.stream;
        if (self.remoteVideoElm)
          self.remoteVideoElm.srcObject = event.stream;
      }   

      function onremovestream(event) {
         console.log('Remote stream removed. Event: ', event);
      }

      function oniceconnectionstatechange(event) {
         console.log("ICE connection status changed : streamid=" 
             + self.id + " " + event.target.iceConnectionState);
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

   Stream.prototype.onIceConnected = function() {
      if (this.state === 'connected') return; //already send request

      if (this.type === globals_.PUBLISHER_STREAM_TYPE) {
         this.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_PUBLISH, 
                 'channelid': this.channelId,
                 'streamid': this.id});
      } else if (this.type === globals_.SUBSCRIBER_STREAM_TYPE) {
         this.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_PLAY, 
                 'channelid': this.channelId,
                 'publishid': this.remoteId,
                 'streamid': this.id});
      } else if (this.type === globals_.P2P_STREAM_TYPE) {
         console.log("p2p mode (nothing to do), channelId=" + this.channelId);
      } else {
         // error
      }
      this.state = 'connected';
      this.broadcast('onIceConnected',null);

   }

   Stream.prototype.onCall = function(msg) {
      var self = this;
      self.createPeerConnection(null);
      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        if (self.type === globals_.P2P_STREAM_TYPE) {
          self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                   'id': self.id, 'remoteid': self.remoteId, 
                   'sdp':sessionDescription});
        } else {
          console.warn("stream must be p2p-type");
        }
      }   
      function onError(e) {
         console.log("failed to create sdp offer: " + e);
      }
      this.pc.createOffer(setLocalAndSendMessage, onError, this.config.sdpConstraints);
   }
    
   Stream.prototype.doAnswer = function(msg) {
      var self = this;
      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        if (self.type === globals_.P2P_STREAM_TYPE) {
           self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                   'id': self.id, 
                   'remoteid': self.remoteId, 
                   'sdp':sessionDescription});
        } else {
           self.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_SDP,
                   'streamid': self.id, 
                   'channelid': self.chanelId, 
                   'sdp':sessionDescription});
        }
      }   
      function onError(e) {
         console.log("failed to create sdp answer: " + e);
      }
      this.pc.setRemoteDescription(new RTCSessionDescription(msg));
      this.pc.createAnswer(setLocalAndSendMessage, onError, this.config.sdpConstraints);
   }

   Stream.prototype.onRemoteSdp = function(msg) {
     console.log("handle sdp: ", msg);
     if (msg.type === 'offer') {
       this.doAnswer(msg);
     } else if (msg.type === 'answer') { //p2p mode: answer from our offer
       if (this.type === globals_.P2P_STREAM_TYPE) { 
         this.pc.setRemoteDescription(new RTCSessionDescription(msg));
       } else {
         console.error("received answer, not handled");
       }
     } else {
       console.error("unknown msg: " + JSON.stringify(msg));
     }
   }

   Stream.prototype.onRemoteCandidate = function(msg) {
     if (msg.type === 'candidate') {
       var candidate = new RTCIceCandidate({sdpMid: msg.sdpMid, 
             sdpMLineIndex:msg.sdpMLineIndex, candidate:msg.candidate});
       console.log("remote candidate " + JSON.stringify(candidate));
       this.pc.addIceCandidate(candidate);
     } else {
       //console.error("unknown candidate: " + JSON.stringify(msg));
     }
   }

   Stream.prototype.connect = function() {
     if (this.type === globals_.PUBLISHER_STREAM_TYPE
         || this.type === globals_.SUBSCRIBER_STREAM_TYPE) {
       this.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CONNECT,
                'channelid': this.channelId, 'stream_type': this.type, 'video_codec': this.vcodec,
                'name': this.name, 'streamid': this.id});
     } else if (this.type === globals_.P2P_STREAM_TYPE) {
       this.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CONNECT,
                'channelid': this.channelId, 'stream_type': this.type, 'video_codec': this.vcodec,
                'name': this.name, 'streamid': this.id});
     } else {
       //error
     }
   }

   Stream.prototype.call = function() {
     if (this.type !== globals_.P2P_STREAM_TYPE) {
       console.warn("stream must be p2p-type");
       return;
     }
     if (this.makecall) {
       this.createPeerConnection(null);
       console.warn("send call: " + this.makecall);
       this.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CALL,
              'channelid': this.channelId, 'localid': this.id, 'remoteid': this.remoteId});
     }
   }

   Stream.prototype.play = function() {
     if (this.type === globals_.SUBSCRIBER_STREAM_TYPE) {
       if (!this.remoteVideoElm) {
         console.warn("no remote video element");
         return;
       }
       this.createPeerConnection(null);
       this.connect();
     } else {
         console.warn("not subscribe stream");
     }
   }

   Stream.prototype.publish = function() {
     //console.log("publish stream: ", this.id);
     if (this.type === globals_.PUBLISHER_STREAM_TYPE) {
       //TODO: check if localStream exists or what?
       if (!this.localVideoElm) {
         console.warn("no local video element");
         return;
       }
       this.localVideoElm.srcObject = this.localStream;
       this.createPeerConnection(this.localStream);
       this.connect();
     } else {
       console.warn("Try to publish a non-publishing stream")
     }
   }

   Stream.prototype.stop = function() {
      if (this.state === 'connected') {
        console.log("stop stream: "+ this.id);
        this.pc.close();
      }
   }


   Stream.prototype.getUserMedia = function(config) {
     var self = this;
     if ( typeof config === "undefined" || config.type === "camera") {
       navigator.getUserMedia(this.config.mediaConstraints, function(stream) {
         if (!stream) return;
         self.localStream = stream;
         self.broadcast("onMediaReady", stream);
       }, function(info) {
         console.error("failed to get media");
       });
     } else {
       if (config.type === "video" && config.tag !== null) {
         console.log("get video stream: " + config.tag);
         self.localStream = document.getElementById(config.tag).captureStream();
         self.broadcast("onMediaReady", self.localStream);
       }
     }
   }

   Stream.prototype.listen = function(eventName, handler) {
     if (typeof this.listeners[eventName] === 'undefined') {
       this.listeners[eventName] = [];
     }
     this.listeners[eventName].push(handler);
   }

   Stream.prototype.unlisten = function(eventName, handler) {
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

   Stream.prototype.broadcast = function(eventName,msg) {
     if (!this.listeners[eventName]) {
       console.log("no handler for event, name=" + JSON.stringify(eventName));
       return; 
     }
     for (var i = 0; i < this.listeners[eventName].length; i++) {
       this.listeners[eventName][i](msg);
     } 
   }

   Stream.prototype.setChannelObj = function(obj) {
     this.channelObj = obj;
   }

   Stream.prototype.sendMessage = function(msg) {
     if (this.channelObj) this.channelObj.sendMessage(msg);
   }

   Stream.prototype.receiveMessage = function(msg) {
     if (msg.rc != null) {
       //handle response
       return;
     }

     if (msg.msgtype == globals_.SNW_ICE ) {
       switch(msg.api) {
         case globals_.SNW_ICE_SDP:
           this.onRemoteSdp(msg.sdp);
           break;
         case globals_.SNW_ICE_CANDIDATE:
           this.onRemoteCandidate(msg.candidate);
           break;
         default:
           console.error("unknown ice msg: ", msg);
           break;
       }
       return;
     }

     if (msg.msgtype == globals_.SNW_SIG ) {
       switch(msg.api) {
         case globals_.SNW_SIG_CALL:
           this.onCall(msg);
           break;
         case globals_.SNW_SIG_SDP:
           this.onRemoteSdp(msg.sdp);
           break;
         case globals_.SNW_SIG_CANDIDATE:
           this.onRemoteCandidate(msg.candidate);
           break;
         default:
           console.error("unknown ice msg: ", msg);
           break;
       }

       return;
     }
   }

   SnowSDK.Stream = Stream;
})(this);


// Channel object
(function(window, undefined) {
   'use strict';
   var SnowSDK = window.SnowSDK || {};
   var globals_ = SnowSDK.globals_ || {};

   function Channel(data) {
     this.id = 0;
     this.flowid = 0;
     this.ipaddr = SnowSDK.wss_ip;
     this.port = SnowSDK.wss_port;
     this.isReady = false;
     this.websocket = null;
     this.publishStreams = [];
     this.playStreams = [];
     this.pendingStreams = [];
     this.listeners = [];
     this.msgs = [];

     if (typeof data.channelid !== 'undefined') {
       this.id = data.channelid;
     } else {
       console.error("channel id not found");
       return null;
     }

     if (typeof data.name === 'undefined') {
       console.error("channel name not found");
       return null;
     }

     if (typeof data.type === 'undefined') {
       console.error("channel type not found");
       return null;
     } else {
       this.type = data.type;
     }

     if (typeof data.name !== 'undefined') {
       this.name = data.name;
     }

     if (typeof data.key !== 'undefined') {
       this.key = data.key;
     }

   }

   Channel.prototype.connect = function() {
      var self = this;
      self.ipaddr = SnowSDK.wss_ip;
      self.port = SnowSDK.wss_port;
      if ("WebSocket" in window) {
         self.websocket = new WebSocket("wss://"+self.ipaddr+
                                        ":"+self.port,"default");
         self.websocket.binaryType = 'blob';
         self.websocket.onopen = function(e) {
            self.isReady = true;
            for (var i = 0; i < self.msgs.length; i++) {
               var msg = JSON.stringify(self.msgs[i]);
               self.websocket.send(msg);
            }
            self.msgs = []; //reset it.
            self.isReady = true;
            //send channel.connect msg
            self.sendMessage({'msgtype':globals_.SNW_CHANNEL,
                              'api':globals_.SNW_CHANNEL_CONNECT,
                              'channelid': self.id, 'key':self.key});
         };
         self.websocket.onmessage = function (evt) {
           if (self.onMessage != null) {
              self.onMessage(evt);
           } else {
              var msg = JSON.parse(evt.data);
              console.log("have not defined onmessage: ", evt.data);
           }
         };
      } else {
         console.warn("WebSocket is not supported by your browser!");
      }
   }

   Channel.prototype.publish = function(stream) {
     var randomid = Math.floor(Math.random() * 10000);
     this.pendingStreams.push({'id':randomid,'stream':stream});
     var msg = {
       'msgtype': globals_.SNW_CHANNEL,
       'api': globals_.SNW_CHANNEL_CREATE_STREAM,
       'channelid': this.id,
       'flowid': this.flowid,
       'reqid': randomid
     };
     this.sendMessage(msg);
   }

   Channel.prototype.play = function(stream) {
     stream.play();
   }

   Channel.prototype.handleEvent = function(msg) {
     switch(msg.api) {
       case globals_.SNW_EVENT_ADD_STREAM:
         if (msg.type == globals_.P2P_CHANNEL_TYPE) {
           this.handleJoinedStreams(msg);
         } else {
           this.handleAddStreams(msg.streams);
         }
         break;
       case globals_.SNW_EVENT_REMOVE_STREAM:
         this.handleRemoveStreams(msg.streams);
         break;
       default:
         console.error("unknown event msg: ", msg);
         break;
     }
   }

   Channel.prototype.handleSigReq = function(msg) {
     var stream = this.getStreamById(msg.remoteid);
     if (stream) {
       stream.receiveMessage(msg);
     } else {
       console.warn("stream not found, id=" + msg.remoteid);
     }
   }

   Channel.prototype.handleRequest = function(msg) {

     if (msg.msgtype == globals_.SNW_ICE ) {
       var streamid = msg.streamid;
       var stream = this.getStreamById(streamid);
       if (stream) {
          stream.receiveMessage(msg);
       } else {
         console.warn("stream not found, id=" + streamid);
       }
       return;
     }
     
     if (msg.msgtype == globals_.SNW_EVENT ) {
       this.handleEvent(msg);
       return;
     }

     if (msg.msgtype == globals_.SNW_SIG ) {
       this.handleSigReq(msg);
       return;
     }

     console.log("unknown request: " + JSON.stringify(msg));
   }

   Channel.prototype.handleAddStreams = function(streams) {

     console.log("add stream: " + JSON.stringify(streams));

     for (var i in streams) {
       //got published stream
       if (this.getStreamById(streams[i].streamid)) {
         // stream already exists
         return;
       }
       //create new stream
       var config = {
         'remoteId'   : streams[i].streamid,
         'audio': true,
         'video': true,
         'data':  false,
         'type': "subscriber"
       }
       var stream = new SnowSDK.Stream(config);

       var randomid = Math.floor(Math.random() * 10000);
       this.pendingStreams.push({'id':randomid,'stream':stream});
       var msg = {
         'msgtype': globals_.SNW_CHANNEL,
         'api': globals_.SNW_CHANNEL_CREATE_STREAM,
         'channelid': this.id,
         'flowid': this.flowid,
         'reqid': randomid
       };
       this.sendMessage(msg);
     }
   }

   Channel.prototype.stopStream = function(stream) {
      stream.stop();
       var msg = {
         'msgtype': globals_.SNW_ICE,
         'api': globals_.SNW_ICE_STOP,
         'channelid': this.id,
         'streamid': stream.id
       };
       this.sendMessage(msg);
       this.broadcast("onRemoveStream", stream);
   }

   Channel.prototype.handleRemoveStreams = function(streams) {
     console.log("got removed streams: " + JSON.stringify(streams));
     for (var i in streams) {
       var id = streams[i].streamid;
       for (var k = 0; k < this.playStreams.length; k++) {
         var stream = this.playStreams[k].stream;
         console.log("check stream: " + stream.remoteId);
         if (stream.remoteId == id) {
           console.log("remove playing stream " + stream.id);
           this.playStreams.splice(i, 1);
           this.stopStream(stream);
         }
       }
     }
   }

   Channel.prototype.handleJoinedStreams = function(msg) {
     console.log("got joined stream: type=" + this.type);
     console.log("got joined stream: " + JSON.stringify(msg));
     var config = {
         'id': this.flowid,
         'remoteId'   : msg.flowid,
         'channelId': this.id,
         'audio': true,
         'video': true,
         'data':  false,
         'type': "p2p"
     }
     var stream = new SnowSDK.Stream(config);
     stream.setChannelObj(this);
     stream.makecall = msg.action;
     this.publishStreams.push({'id':stream.id, 'stream': stream});
     this.broadcast("onAddStream",stream);
   }

   Channel.prototype.handleConnectResp = function(msg) {
     this.flowid = msg.flowid;
     if (msg.streams) {
       this.handleAddStreams(msg.streams);
     } else {
       //no published stream
     }
     this.broadcast("onConnected",null);
   }

   Channel.prototype.handleCreateStreamResp = function(msg) {
     var stream = null;
     for (var i = 0; i < this.pendingStreams.length; i++) {
       var item = this.pendingStreams[i];
       if (msg.reqid == item.id) {
         stream = item.stream
         break;
       }
     }

     if (!stream) { 
       console.warn("stream not found");
       return;
     }
     this.pendingStreams.splice(i, 1);
     
     //TODO: verify if streamid exists?
     if (stream.type === globals_.PUBLISHER_STREAM_TYPE) {
       this.publishStreams.push({'id':msg.streamid, 'stream': stream});
       stream.setId(msg.streamid);
       stream.setChannelId(this.id);
       stream.setChannelObj(this);
       stream.publish();
     }

     if (stream.type === globals_.SUBSCRIBER_STREAM_TYPE) {
       this.playStreams.push({'id':msg.streamid, 'stream': stream});
       stream.setId(msg.streamid);
       stream.setChannelId(this.id);
       stream.setChannelObj(this);
       this.broadcast("onAddStream",stream);
     }
   }

   Channel.prototype.getStreamById = function(id) {
     var stream = null;

     for (var i = 0; i < this.publishStreams.length; i++) {
       var item = this.publishStreams[i];
       if (item.id == id) {
         stream = item.stream
         return stream;
       }
     }
     for (var i = 0; i < this.playStreams.length; i++) {
       var item = this.playStreams[i];
       if (item.id == id) {
         stream = item.stream
         return stream;
       }
     }

     return stream;
   }

   Channel.prototype.handleResponse = function(msg) {
     if (msg.rc < 0) {
       console.error("error msg: ", msg.errmsg);
       return;
     }
     if (msg.msgtype == globals_.SNW_CHANNEL ) {
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
     }

   }

   Channel.prototype.onMessage = function(evt) {
      var msg = JSON.parse(evt.data);
      if (msg.rc != null) {
        this.handleResponse(msg);
      } else {
        this.handleRequest(msg);
      }
   }

   Channel.prototype.sendMessage = function(message) {
     //console.log("sending msg, msg=", message);
     if (!this.isReady) {
       this.msgs.push(message);
       return;
     }
     if (this.websocket) {
       if (typeof message === 'object') {
          message = JSON.stringify(message);
       }
       this.websocket.send(message);
     } else {
       console.warn("websocket not initialized!");
     }
   }

   Channel.prototype.listen = function(eventName, handler) {
      if (typeof this.listeners[eventName] === 'undefined') {
         this.listeners[eventName] = [];
      }
      this.listeners[eventName].push(handler);
   }

   Channel.prototype.unlisten = function(eventName, handler) {
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

   Channel.prototype.broadcast = function(eventName,msg) {
      if (!this.listeners[eventName]) {
         console.log("no handler for event, name=" + JSON.stringify(eventName));
         return; 
      }
      for (var i = 0; i < this.listeners[eventName].length; i++) {
         this.listeners[eventName][i](msg);
      } 
   }

   SnowSDK.Channel = Channel;

})(this);

(function (window) {
  'use strict';
  var SnowSDK = window.SnowSDK || {};
  var globals_ = SnowSDK.globals_ || {};

  SnowSDK.init = function(config) {
    if (typeof config === 'undefined') {
       console.error("no config found");
       return false;
    }

    if (typeof config.wss_ip !== 'undefined') {
       SnowSDK.wss_ip = config.wss_ip;
    } else {
       if (SnowSDK.wss_ip === "") {
         console.warn("websocket server ip not set");
       }
    }

    if (typeof config.wss_port !== 'undefined') {
       SnowSDK.wss_port = config.wss_port;
    } else {
       SnowSDK.wss_port = 8443;
    }

    if (typeof config.rest_ip !== 'undefined') {
       SnowSDK.rest_ip = config.rest_ip;
    } else {
       if (SnowSDK.rest_ip === "") {
         console.warn("websocket server ip not set");
       }
       SnowSDK.rest_ip = config.wss_ip;
    } 

    if (typeof config.rest_port !== 'undefined') {
       SnowSDK.rest_port = config.rest_port;
    } else {
       SnowSDK.rest_port = 8868;
    }

  }

  SnowSDK.sendPostRequest = function(data,onSuccess,onError) {
    // Sending and receiving data in JSON format using POST method
    var xhr = new XMLHttpRequest();
    var url = "https://" + this.rest_ip + ":" + this.rest_port + "/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        onSuccess(JSON.parse(xhr.responseText));
      }
      //TODO: when call onError!
      //onError(xhr.responseText);
    };
    xhr.send(JSON.stringify(data));
  }

  SnowSDK.sendGetRequest = function(data,onSuccess,onError) {
    // Sending a receiving data in JSON format using GET method
    var xhr = new XMLHttpRequest();
    var url = "https://" + this.rest_ip + ":" + this.rest_port + "/?data=" + JSON.stringify(data);
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.email + ", " + json.password);
      }
    };
    xhr.send();
  }

  SnowSDK.createChannel = function(data,onSuccess,onError) {
    var type;
    if (typeof data.type === 'undefined') {
      type = globals_.CONF_CHANNEL_TYPE;
    } else {
       if (data.type === "conference") {
         type = globals_.CONF_CHANNEL_TYPE;
       }
       else if (data.type === "p2p") {
         type = globals_.P2P_CHANNEL_TYPE;
       }
       else if (data.type === "live") {
         type = globals_.LIVE_CHANNEL_TYPE;
       }
       else {
         console.error("channel type must be 'conference' or 'p2p' or 'live'");
       }
    }

    if (typeof data.name === 'undefined'
        || typeof data.key === 'undefined') {
      console.error("undefined channel name or key");
      return;
    }
    var msg = {
      'msgtype': 5,
      'api': 1,
      'name': data.name,
      'type': type,
      'key': data.key,
    }
    function onReqSuccess(resp) {
      var channel = new SnowSDK.Channel(resp);
      if (onSuccess) onSuccess(channel);
    }
    function onReqError(resp) {
      if (onError) onError(resp);
    }
    SnowSDK.sendPostRequest(msg,onReqSuccess,onReqError);
  }

  SnowSDK.deleteChannel = function(data,onSuccess,onError) {
    if (typeof data.channelid === 'undefined'
        || typeof data.token === 'undefined') {
      console.error("undefined channel id or token");
      return;
    }
    var msg = {
      'msgtype': 5,
      'api': 2,
      'channelid': data.channelid,
      'token': data.token
    }
    SnowSDK.sendPostRequest(msg,onSuccess,onError);
  }

  SnowSDK.queryChannel = function(data,onSuccess,onError) {
    var is_valid = false;
    if (typeof data.token === 'undefined') {
      console.error("undefined channel id or token");
      return;
    }
    var msg = {
      'msgtype': 5,
      'api': 3,
      'token': data.token
    }
    console.log("query data: ", data);
    if (typeof data.channelid !== 'undefined') {
      msg.channelid = data.channelid;
      is_valid = true;
    }
    if (typeof data.name !== 'undefined') {
      msg.name = data.name;
      is_valid = true;
    }
    if (is_valid) {
      SnowSDK.sendPostRequest(msg,onSuccess,onError);
    } else {
      console.error("invalid message: channelid or name not found");
    }
  }

})(this);

// SDK Utitlities
(function(window, undefined) {
  'use strict';
  var SnowSDK = window.SnowSDK || {};

  function uuid() {
    function s4() {
       return Math.floor((1 + Math.random()) * 0x10000)
         .toString(16)
         .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  SnowSDK.Utils = {};
  SnowSDK.Utils.uuid = uuid;
})(this);

/* loading other stuff */
(function (window) {
  'use strict';
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
    console.log("initializing async snowsdk");
    if (typeof window.snowAsyncInit === 'function') {
      window.snowAsyncInit();
    }
  }

  //var url = getBaseUrl("snowsdk.js").replace("snowsdk.js","adapter.js");
  //loadScript(url,loadCallback);
  loadCallback();
})(this);
