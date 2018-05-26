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
      this.SNW_EVENT_NEW_STREAM = 2;
      this.SNW_EVENT_ADD_SUBCHANNEL = 3;
      this.SNW_EVENT_DEL_SUBCHANNEL = 4;

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

      //FIXME: p2p and group
      this.BCAST_CHANNEL_TYPE = "broadcast";
      this.CALL_CHANNEL_TYPE = "call";
      this.CONF_CHANNEL_TYPE = "conference";
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
     this.type = "pub"; //TODO: default value, set "pla" when it is remote
     this.acodec = "opus";
     this.vcodec = "vp8";
     this.localStream = null;
     this.remoteStream = null;
     this.localVideoElm = null;
     this.remoteVideoElm = null;
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
     this.config.sdpConstraints = {'mandatory': {
         'OfferToReceiveAudio':true,
         'OfferToReceiveVideo':true }}; 
 
     this.listeners = [];
     this.channelObj = null;
     this.pc = null;
     this.state = "disconnected";

     if (typeof config.id !== 'undefined') {
       this.id = config.id;
     }
     if (typeof config.remoteId !== 'undefined') {
       this.remoteId = config.remoteId;
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
       this.type = config.type;
     }


     console.log("create a stream: " + JSON.stringify(this));

   }

   Stream.prototype.createPeerConnection = function(stream) {
      var self = this;

      console.log('create peer connection: ' + this.config.pcConfig);
      this.pc = new RTCPeerConnection(this.config.pcConfig, this.config.sdpConstraints)

      function onicecandidate(event) {
        console.log('onicecandidate event: ', event);
        if (event.candidate) {
           var candidate = event.candidate.candidate;

           if (self.type === 'p2p') {
              //FIXME: modify id and remoteid
              self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                      'id': self.peerId, 
                      'remoteid': self.remoteId,
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           } else {
              //FIXME: modify id and remoteid
              self.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CANDIDATE, 
                      'streamid': self.id, 
                      'channelid': self.channelId, 
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           }
        } else {
           console.log('No more candidates.');
           if (self.type === 'p2p') {
              //FIXME: modify id and remoteid
              self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                       'id': self.peerId, 'remoteid': self.remoteId, 'candidate':{ done: true }});
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
         console.log("ICE connection status changed : streamid=" + self.id + " " + event.target.iceConnectionState)
         if (event.target.iceConnectionState === "connected") {
            self.onIceConnected();
         }
      }

      this.pc.onicecandidate = onicecandidate;
      this.pc.onaddstream = onaddstream;
      this.pc.onremovestream = onremovestream;
      this.pc.oniceconnectionstatechange = oniceconnectionstatechange;
      if (stream) {
        console.log("add stream");
        this.pc.addStream(stream); //FIXME
      }
   }

   Stream.prototype.onIceConnected = function() {
      if (this.state === 'connected') return; //already send request

      if (this.type === "pub") {
         console.warn("publishing a stream, channelId=" + this.channelId);
         this.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_PUBLISH, 
                 'channelid': this.channelId,
                 'streamid': this.id});
      } else if (this.type === "pla") {
         console.warn("playing a stream, channelId=" + this.channelId);
         this.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_PLAY, 
                 'channelid': this.channelId,
                 'publishid': this.remoteId,
                 'streamid': this.id});
      } else {
         console.log("p2p mode (nothing to do), channelId=" + this.channelId);
      }
      this.state = 'connected';
      this.broadcast('onIceConnected',null);

   }

   Stream.prototype.doAnswer = function(msg) {
      var self = this;
      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        if (self.type === 'p2p') {
           self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                   'id': self.peerId, 
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
       if (this.type === 'p2p') { 
         this.pc.setRemoteDescription(new RTCSessionDescription(msg));
       } else {
         console.error("received answer, not handled");
       }
     } else {
       console.error("unknown msg: " + JSON.stringify(msg));
     }
   }

   Stream.prototype.onRemoteCandidate = function(msg) {
     console.log("handle candidate: ", msg);
     if (msg.type === 'candidate') {
       var candidate = new RTCIceCandidate({sdpMLineIndex:msg.label, candidate:msg.candidate});
       console.log("received candidate, candidate=" + JSON.stringify(candidate));
       this.pc.addIceCandidate(candidate);
     } else {
       //console.error("unknown candidate: " + JSON.stringify(msg));
     }
   }

   Stream.prototype.connect = function() {
     console.log("connect stream: ", this.id);
     this.sendMessage({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CONNECT,
                'channelid': this.channelId, 'peer_type': this.type, 'video_codec': this.vcodec,
                'name': this.name, 'streamid': this.id});
   }

   Stream.prototype.play = function(video_elm) {
     if (this.type === "pub") {
       if (!video_elm) return;
       this.localVideoElm = video_elm;
       this.localVideoElm.srcObject = this.localStream;
     }
     if (this.type === "pla") {
       this.remoteVideoElm = video_elm;
       this.createPeerConnection(null);
       this.connect();
     }
   }

   Stream.prototype.publish = function() {
     console.log("publish stream: ", this.id);
     if (this.type === "pub") {
       //TODO: check if localStream exists or what?
       this.createPeerConnection(this.localStream);
       this.connect();
     } else {
       console.warn("Try to publish a non-publishing stream")
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


   Stream.prototype.getUserMedia = function() {
     var self = this;
     navigator.getUserMedia(this.config.mediaConstraints, function(stream) {
       if (!stream) return;
       self.localStream = stream;
       console.log("get media sucessfully, id=" + self.id);
       self.broadcast("onMediaReady", stream);
     }, function(info) {
       console.error("failed to get media");
     });
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
     console.log("stream broadcast, event=" + eventName + ", msg=" + JSON.stringify(msg));
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
       console.warn("unknown response: ", msg);
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
     console.log("create a channel: " + JSON.stringify(data));
     if (typeof data.name === 'undefined') {
       console.error("channel name not found");
       return null;
     }

     if (typeof data.channelid === 'undefined') {
       console.error("channel id not found");
       return null;
     }

     if (typeof data.type === 'undefined') {
       console.error("channel type not found");
       return null;
     }

     this.name = data.name;
     this.id = data.channelid;
     this.flowid = 0;
     this.key = data.key;
     this.ipaddr = SnowSDK.wss_ip;
     this.port = SnowSDK.wss_port;
     this.type = data.type;
     this.isReady = false;
     this.websocket = null;
     this.publishStreams = [];
     this.playStreams = [];
     this.pendingStreams = [];
     this.listeners = [];
     this.msgs = [];
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
     console.log("publish a stream");
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
     console.log("play a stream");
     var msg = {
       'msgtype': globals_.SNW_SIG,
       'api': globals_.SNW_SIG_CONNECT,
       'channelid': this.id,
       'streamid': stream.getId()
     };
     this.sendMessage(msg);
   }

   Channel.prototype.handleEvent = function(msg) {
     console.log("handle event: " + JSON.stringify(msg));
     switch(msg.api) {
       case globals_.SNW_EVENT_NEW_STREAM:
         this.handleRemoteStreams(msg.streams);
         break;
       default:
         console.error("unknown event msg: ", msg);
         break;
     }
 
   }

   Channel.prototype.handleRequest = function(msg) {
     console.log("handle request: " + JSON.stringify(msg));

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

     console.log("unknown request: " + JSON.stringify(msg));
   }

   Channel.prototype.handleRemoteStreams = function(streams) {
     console.log("got published streams: " + JSON.stringify(streams));
     for (var i in streams) {
       console.log("got published streamid=" + streams[i].streamid);
       
       if (this.getStreamById(streams[i].streamid)) {
         // stream already exists
         console.log("stream exists, streamid=" + streams[i].streamid);
         return;
       }
       //create Stream
       var config = {
         'remoteId'   : streams[i].streamid,
         'audio': true,
         'video': true,
         'data':  false,
         'type': "pla"
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

   Channel.prototype.handleConnectResp = function(msg) {
     this.flowid = msg.flowid;
     if (msg.streams) {
       console.log("got published streams: " + JSON.stringify(msg.streams));
       this.handleRemoteStreams(msg.streams);

       /*for(var i in msg.streams) {
         console.log("got published streamid=" + msg.streams[i].streamid);
         //create Stream
         var config = {
           'remoteId'   : msg.streams[i].streamid,
           'audio': true,
           'video': true,
           'data':  false,
           'type': "pla"
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
       }*/
     } else {
       console.log("no published stream");
     }
     this.broadcast("onConnected",null);
   }

   Channel.prototype.handleCreateStreamResp = function(msg) {
     console.log("handle request: ", this.pendingStreams);
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
     if (stream.type === "pub") {
       console.warn("got stream id for publisher");
       this.publishStreams.push({'id':msg.streamid, 'stream': stream});
       stream.setId(msg.streamid);
       stream.setChannelId(this.id);
       stream.setChannelObj(this);
       stream.publish();
     }

     if (stream.type === "pla") {
       console.warn("got stream id for player");
       this.playStreams.push({'id':msg.streamid, 'stream': stream});
       stream.setId(msg.streamid);
       stream.setChannelId(this.id);
       stream.setChannelObj(this);
       //stream.play();
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
     console.log("handle response: ", msg);
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
     if (msg.msgtype == globals_.SNW_ICE ) {
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
     console.log("sending msg, msg=", message);
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
      console.log("channel broadcast, event=" + eventName);
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

  SnowSDK.init = function(config) {
    if (typeof config === 'undefined') {
       console.error("no config found");
       return false;
    }

    if (typeof config.wss_ip !== 'undefined') {
       SnowSDK.wss_ip = config.wss_ip;
       console.warn("websocket server ip: " + SnowSDK.wss_ip);
    } else {
       if (SnowSDK.wss_ip === "") {
         console.warn("websocket server ip not set");
       }
    }

    if (typeof config.wss_port !== 'undefined') {
       SnowSDK.wss_port = config.wss_port;
       console.warn("websocket server port: " + SnowSDK.wss_port);
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
    //
    var xhr = new XMLHttpRequest();
    var url = "https://" + this.rest_ip + ":" + this.rest_port + "/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("response: " + xhr.responseText);
        onSuccess(JSON.parse(xhr.responseText));
      }
      //TODO: when call onError!
      //onError(xhr.responseText);
    };
    console.log("req: " + JSON.stringify(data));
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
    if (typeof data.type === 'undefined')
      data.type = "conference";

    if (typeof data.name === 'undefined'
        || typeof data.key === 'undefined') {
      console.error("undefined channel name or key");
      return;
    }
    var msg = {
      'msgtype': 5,
      'api': 1,
      'name': data.name,
      'type': data.type,
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

// SDK configurations
(function(window, undefined) {
   'use strict';
   var SnowSDK = window.SnowSDK || {};
   var globals_ = SnowSDK.globals_ || {};

   function Config() {
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

      // channel info
      this.name = "default";
      this.channel_type = globals_.BCAST_CHANNEL_TYPE;
      this.enable_video = 1; //: 0 disbale, 1: enable
      this.audio_codec = globals_.VAUDIO_OPUS;
      this.video_codec = globals_.VCODEC_H264;

      this.local_stream = null;
      this.remote_stream = null;
      this.local_video_elm = null;
      this.remote_video_elm = null;

      // others
      this.auth_data = "none";

      this.wss_ip = SnowSDK.wss_ip;
      this.wss_port = SnowSDK.wss_port;
   }

   Config.prototype.init= function(config) {
      if (typeof config === 'undefined') {
         console.error("no config found");
         return false;
      }

      if (typeof config.wss_ip !== 'undefined') {
         this.wss_ip = config.wss_ip;
      } else {
         if (this.wss_ip === "") {
            console.warn("websocket server ip not set");
         }
      }

      if (typeof config.wss_port !== 'undefined') {
         this.wss_port = config.wss_port
      } else {
         this.wss_port = 8443;
      }

      if (typeof config.name !== 'undefined') {
         this.name = config.name;
      }

      if (typeof config.channel_type !== 'undefined') {
         this.channel_type = config.channel_type;
      }

      if (typeof config.enbale_video !== 'undefined') {
         if (config.enbale_video === 0 || config.enbale_video === 1) {
           this.enable_video = config.enable_video;
         } else {
           console.error("enable_video must be 0 or 1");
           return false;
         }
      }

      if (typeof config.video_codec !== 'undefined') {
        if ((config.video_codec !== globals_.VCODEC_H264) &&
            (config.video_codec !== globals_.VCODEC_VP8) &&
            (config.video_codec !== globals_.VCODEC_VP9)) {
          console.error("not correct video codec, choose 'h264', 'vp8' or 'vp9'");
          return false;
        }
        this.video_codec = config.video_codec;
      }

      if (typeof config.auth_data !== 'undefined') 
         this.auth_data = "none";

      return true;
   };
    
   var SnowSDK = window.SnowSDK;
   SnowSDK.Config = Config;
})(this);

// ws client
(function(window, undefined) {
   'use strict';
   var SnowSDK = window.SnowSDK || {};
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
   'use strict';
   var SnowSDK = window.SnowSDK || {};
   var globals_ = SnowSDK.globals_ || {};

   function PeerAgent(config){
     this.isReady = 0;
     this.peerId = 0; 
     this.remoteId = 0; 
     this.channelId = 0; 
     this.name = "";
     this.is_visible = true;

     this.pc = null; //TODO
     this.ice_state = "disconnected";
     this.peerType = "none";
     this.started = false;

     this.local_stream = null;
     this.remote_stream = null;
     this.local_video_elm = null;
     this.remote_video_elm = null;
     this.reset_stream(config);
     this.onAddStream = null;

     //peers of subchannels
     this.peers = new Object();

     // websocket info
     this.ws_client = null;
     this.ws_connected = 0;
     this.ws_msg_queue = [];

     this.listeners = [];
     this.config = new SnowSDK.Config();
     this.config.init(config);
   }

   PeerAgent.prototype.reset_stream = function(config) {

     if (typeof config.local_stream !== 'undefined') {
       this.local_stream = config.local_stream;
     }

     if (typeof config.remote_stream !== 'undefined') {
       this.remote_stream = config.remote_stream;
     }

     if (typeof config.local_video_elm !== 'undefined') {
       this.local_video_elm = config.local_video_elm;
     }

     if (typeof config.remote_video_elm !== 'undefined') {
       this.remote_video_elm = config.remote_video_elm;
     }
   }

   PeerAgent.prototype.send_msg_in_queue = function(fix_id) {
      var self = this;
      for (var i = 0; i < self.ws_msg_queue.length; i++) {
         if (fix_id) self.ws_msg_queue[i].id = self.peerId;
         self.ws_client.send(self.ws_msg_queue[i]);
      }
      self.ws_msg_queue = [];
   }

   PeerAgent.prototype.init = function() {
      var self = this;

      if (this.isReady === 1) return;

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
         self.ws_client.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_AUTH,
                              'auth_data':self.config.auth_data});
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

   PeerAgent.prototype.do_offer = function() {
      var self = this;
      function setLocalAndSendMessage(sessionDescription) {
        self.pc.setLocalDescription(sessionDescription);
        if (self.peerType === 'p2p') {
           self.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                   'id': self.peerId, 'remoteid': self.remoteId, 
                   'sdp':sessionDescription});
        } else {
           self.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_SDP,
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
           self.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                   'id': self.peerId, 'remoteid': self.remoteId, 
                   'sdp':sessionDescription});
        } else {
           self.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_SDP,
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
      console.log("on call");
      getusermedia(this,function(agent) {
         //do nothing, wait for response from other peer.
      });
   }

   PeerAgent.prototype.send = function(msg) {
     if (this.isReady) {
       if (this.ws_msg_queue.length > 0) {
         for (var i = 0; i < this.ws_msg_queue.length; i++) {
           this.ws_client.send(this.ws_msg_queue[i]);
         }
         this.ws_msg_queue = [];
       }
       this.ws_client.send(msg);
     } else {
       this.ws_msg_queue.push(msg);
     }
   }

   PeerAgent.prototype.handle_add_subchannel = function(msg) {
     var self = this;
     if (msg.peerid === this.peerId) {
       console.log("self-msg: do nothing");
       return;
     }

     var config = this.config;
     var new_peer = SnowSDK.createPeer(config);
     new_peer.is_visible = false;

     var settings = {
        'channelid': msg.subchannelid,
        'local_video_elm': document.createElement('video'),//just empty video
        'remote_video_elm': null,
     };
     new_peer.onAddPeerStream = function(msg) {
       self.onAddPeerStream(msg);
     }
     new_peer.onRemovePeerStream = function(msg) {
       self.onRemovePeerStream(msg);
     }
     new_peer.play(settings);
     this.peers[msg.subchannelid] = new_peer;

   }

   PeerAgent.prototype.handle_del_subchannel = function(msg) {
     console.log("del subchannel from peerid=" + this.peerId);
     var info = {
       peerid: this.peerId
     }
     this.onRemovePeerStream(info);
   }


   PeerAgent.prototype.receive = function(msg) {
      if (msg.rc != null) {
         console.log("response from server: " + JSON.stringify(msg));
         if (msg.msgtype == globals_.SNW_ICE ) {
            //handle ice api
         }

         if (msg.msgtype == globals_.SNW_SIG ) {
            if (msg.api == globals_.SNW_SIG_AUTH) {
               this.peerId = msg.id;
               this.isReady = 1;
               this.send_msg_in_queue(true);
               if (typeof this.onReady === "function") this.onReady();
               return;
            }
            if (msg.api == globals_.SNW_SIG_CREATE) {
               if (msg.rc === 0) {
                  this.channelId = msg.channelid;
                  this.broadcast('onCreate',this);
                  return;
               }
            }

            if (msg.api == globals_.SNW_SIG_CALL) {
               if (msg.rc === 0) {
                  if (this.local_stream) {
                     //get media source directly
                     this.start_stream(this.local_stream);
                     if (this.local_video_elm !== null ) {
                        this.local_video_elm.srcObject = this.local_stream;
                     } else {
                        console.warn("No video element for local stream");
                     }
                     this.do_offer();
                  } else {
                     getusermedia(this,function(agent) {
                        //start ice connetion when receiving
                        // the response from other peer.
                        agent.do_offer();
                     });
                  }
               }
               return;
            }

            if (msg.api == globals_.SNW_SIG_PUBLISH) {
              if (msg.rc === 0 && msg.subchannels instanceof Array) {
                var i, len;
                len = msg.subchannels.length;
                for (i=0; i<len; ++i) {
                  if (i in msg.subchannels) {
                    var s = msg.subchannels[i];
                    this.handle_add_subchannel(s);
                  }
                }

              }
            }
         }
         return;
      }

      if (msg.msgtype == globals_.SNW_SIG ) {
         if (msg.api == globals_.SNW_SIG_CALL) {
            this.on_call(msg);
            return;
         }
         if (msg.api == globals_.SNW_SIG_CANDIDATE) {
            this.on_remote_candidate(msg.candidate);
            return;
         }
         if (msg.api == globals_.SNW_SIG_SDP) {
            this.on_remote_sdp(msg.sdp);
            return;
         }
         return;
      }

      if (msg.msgtype == globals_.SNW_EVENT) {
         if (msg.api == globals_.SNW_EVENT_ICE_CONNECTED) {
            console.log("ice connected (depracated version)");
            return;
         }
         if (msg.api == globals_.SNW_EVENT_NEW_STREAM) {
            this.broadcast('onPeerJoined',msg);
            this.onPeerJoined(msg);
            return;
         }
         if (msg.api == globals_.SNW_EVENT_ADD_SUBCHANNEL) {
            this.handle_add_subchannel(msg);
            return;
         }
         if (msg.api == globals_.SNW_EVENT_DEL_SUBCHANNEL) {
            this.handle_del_subchannel(msg);
            return;
         }

         return;
      }

      if (msg.msgtype == globals_.SNW_ICE ) {
         if (msg.api == globals_.SNW_ICE_CANDIDATE) {
            this.on_remote_candidate(msg.candidate);
            return;
         }
         if (msg.api == globals_.SNW_ICE_SDP) {
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
              self.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE, 'id': self.peerId, 
                      'remoteid': self.remoteId,
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           } else {
              self.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CANDIDATE, 'id': self.peerId, 
                      'candidate':{
                           type: 'candidate',
                           label: event.candidate.sdpMLineIndex,
                           id: event.candidate.sdpMid,
                           candidate: event.candidate.candidate}});
           }
        } else {
           console.log('No more candidates.');
           if (self.peerType === 'p2p') {
              self.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                       'id': self.peerId, 'remoteid': self.remoteId, 'candidate':{ done: true }});
           } else {
              self.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CANDIDATE,
                       'id': self.peerId, 'candidate':{ done: true }});
           }
        }
      }   

      function onaddstream(event) {
        console.log('Remote stream added, src:' + self.remote_video_elm);
        if (self.remote_video_elm === null) {
          console.warn("No video element for remote stream");
          if (self.is_visible === false
              && typeof self.onAddPeerStream === "function") {
            var msg = {
              "peerid": self.peerId,
              "stream": event.stream
            };
            self.onAddPeerStream(msg);
          }
        } else {
          self.remote_video_elm.srcObject = event.stream;
          self.remote_stream = event.stream;
        }
      }   

      function onremovestream(event) {
         console.log('Remote stream removed. Event: ', event);
      }

      function oniceconnectionstatechange(event) {
         console.log("ICE connection status changed : peerid=" + self.peerId + " " + event.target.iceConnectionState)
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
      if (agent.enbale_video === 0) {
         agent.config.media_constraints.video = false;
      }
      navigator.getUserMedia(agent.config.media_constraints, function(stream) {
         if (!stream) return;
         agent.start_stream(stream);
         agent.local_stream = stream;
         if (agent.local_video_elm !== null ) {
            agent.local_video_elm.srcObject = stream;
         } else {
            console.warn("No video element for local stream");
         }

         //XXX: temporarily mute
         //agent.localVideoElm.muted = false;
         //agent.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CONNECT,
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
      //reset config
      this.config.init(config);
      this.init();

      //this.send({'msgtype':globals_.SNW_ICE,
      //           'api':globals_.SNW_ICE_CREATE, 
      //           'uuid': SnowSDK.Utils.uuid()});//TODO: store it in PeerAgent obj.
      console.log("create channel, peerid=" + this.peerId);
      this.send({'msgtype':globals_.SNW_SIG,
                 'api':globals_.SNW_SIG_CREATE, 'id': this.peerId,
                 'type': this.config.channel_type,
                 'uuid': SnowSDK.Utils.uuid()});//TODO: store it in PeerAgent obj.
      this.listen('onCreate',onsuccess);
   }

   PeerAgent.prototype.connect = function(config) {
      this.config.init(config);//TODO: move into this.init
      this.init(config);
      this.reset_stream(config);
      this.channelId = config.channelid;

      if (config.peerType !== undefined)
         this.peerType = config.peerType;

      if (this.peerType === "p2p") {//for p2p, delay calling getUserMedia()
         this.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CONNECT,
                     'channelid': this.channelId, 'peer_type': this.peerType, 'video_codec': this.config.video_codec,
                     'name': this.name, 'id': this.peerId});
      } else {
         if (this.local_stream) {
            //get media source directly
            console.log("start local media source directly, stream=", this.local_stream);
            this.start_stream(this.local_stream);
            this.local_stream = this.local_stream;
            if (this.local_video_elm !== null ) {
               this.local_video_elm.srcObject = this.local_stream;
            } else {
               console.warn("No video element for local stream");
            }
            this.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CONNECT,
                     'channelid': this.channelId, 'peer_type': this.peerType, 'video_codec': this.config.video_codec,
                     'name': this.name, 'id': this.peerId});
         } else {
            getusermedia(this, function(agent) {
               agent.send({'msgtype':globals_.SNW_ICE,'api':globals_.SNW_ICE_CONNECT,
                     'channelid': agent.channelId, 'peer_type': agent.peerType, 'video_codec': agent.config.video_codec,
                     'name': agent.name, 'id': agent.peerId});
            });
         }
      }
   }

   PeerAgent.prototype.onIceConnected = function() {
      if (this.started) return; //already send request

      if (this.peerType === "pub") {
         console.log("publishing a stream, channelId=" + this.channelId);
         this.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_PUBLISH, 
                 'channelid': this.channelId, 'id': this.peerId});
      } else if (this.peerType === "pla") {
         console.log("playing a stream, channelId=" + this.channelId);
         this.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_PLAY, 
                 'channelid': this.channelId, 'id': this.peerId});
      } else {
         //console.log("p2p mode (nothing to do), channelId=" + this.channelId);
      }
      this.ice_state = "connected";
      this.started = true;
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
      this.send({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CALL, 
              'channelid': this.channelId, 'id': this.peerId, 'remoteid': remoteid});
   }

   SnowSDK.PeerAgent = PeerAgent;
})(this);
// end of peer agent

// SDK API implementation
(function(window, undefined) {
   'use strict';
   var SnowSDK = window.SnowSDK;

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
