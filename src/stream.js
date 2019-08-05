import * as globals_ from './constants.js'
import createStreamID from './http.js'
import adapter from 'webrtc-adapter';

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

export default class Stream {
  constructor(host, port = 8443) {
    this.streamid = null
    this.host = host
    this.port = port
    this.url = 'wss://' + host + ':' + port + '/ws'
    this.isConnected = false
    this.listeners = [];

    // websocket init
    console.log("wss: " + this.url)
    this.msgs = []
    this.socket = new WebSocket(this.url)
    this.socket.onopen = () => {
      this.triggerEvent('onConnected')
      this.isConnected = true
      for (var i = 0; i < this.msgs.length; i++) {
        console.log(this.msgs[i]);
        var message = this.msgs[i];
        if (typeof message === 'object') {
           message = JSON.stringify(message);
        }
        this.socket.send(message);
      }
      this.msgs = []
    }
    this.socket.onmessage = (event) => {
      console.log('receive message: ' + event.data)
      this.handleMessage(event)
    }

    // peer connection init
    // TODO: get config from caller and set default values
    var config = {
      mediaConstraints : {
        audio: true,
        video: true,
      },
      pcConfig : {
        'iceServers':[{'urls':'stun:stun3.l.google.com:19302'}],
        'iceTransports': 'all'
      },
      //TODO: chrome and firefox do differently here
      sdpConstraints : {
        'mandatory': {
          'OfferToReceiveAudio':true,
          'OfferToReceiveVideo':true,
        }
      },
    }
    this.type = globals_.UNKNOWN_STREAM_TYPE
    this.acodec = globals_.ACODEC_OPUS
    this.vcodec = globals_.VCODEC_VP8
    this.config = config
    this.state = "disconnected"
    this.localStream = null
    this.localNode = null // dom element to host a stream
    this.remoteStream = null
    this.remoteVideoElm = document.getElementById("remoteVideo");
  }

  listen(eventName, handler) {
     if (typeof this.listeners[eventName] === 'undefined') {
       this.listeners[eventName] = [];
     }
     this.listeners[eventName].push(handler);
  }

  unlisten(eventName, handler) {
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

  broadcast(eventName, msg) {
    if (!this.listeners[eventName]) {
      console.log("no handler for event, name=" + JSON.stringify(eventName));
      return;
    }
    for (var i = 0; i < this.listeners[eventName].length; i++) {
      this.listeners[eventName][i](msg);
    }
  }


  triggerEvent(eventName, data) {
    if (!this.listeners[eventName]) {
      console.log("no handler for event, name=" + JSON.stringify(eventName));
      return;
    }
    for (var i = 0; i < this.listeners[eventName].length; i++) {
      this.listeners[eventName][i](data);
    }
  }

  sendMessage(message) {
    console.log("sending msg, msg=", message);
    if (!this.isConnected) {
      this.msgs.push(message);
      return;
    }
    if (this.socket) {
      if (typeof message === 'object') {
         message = JSON.stringify(message);
      }
      this.socket.send(message);
    } else {
      console.warn("websocket not initialized!");
    }
  }

  doAnswer(msg) {
    var self = this;
    function setLocalAndSendMessage(sessionDescription) {
      self.pc.setLocalDescription(sessionDescription);
      /*if (self.type === globals_.P2P_STREAM_TYPE) {
         self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_SDP,
                 'id': self.id,
                 'remoteid': self.remoteId,
                 'sdp':sessionDescription});
      } else {*/
         self.sendMessage({'msgtype':globals_.SNW_MSGTYPE_ICE,'api':globals_.SNW_ICE_SDP,
                 'streamid': self.streamid,
                 'channelid': self.streamid,
                 'sdp':sessionDescription});
      //}
    }
    function onError(e) {
       console.log("failed to create sdp answer: " + e);
    }
    this.pc.setRemoteDescription(new RTCSessionDescription(msg));
    this.pc.createAnswer(setLocalAndSendMessage, onError, this.config.sdpConstraints);
  }


  onRemoteSdp(msg) {
     console.log("handle sdp: ", msg);
     if (msg.type === 'offer') {
       this.doAnswer(msg);
     } else if (msg.type === 'answer') { //p2p mode: answer from our offer
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

   onRemoteCandidate(msg) {
     if (msg.type === 'candidate') {
       var candidate = new RTCIceCandidate({sdpMid: msg.sdpMid,
             sdpMLineIndex:msg.sdpMLineIndex, candidate:msg.candidate});
       console.log("remote candidate " + JSON.stringify(candidate));
       this.pc.addIceCandidate(candidate);
     } else {
       //console.error("unknown candidate: " + JSON.stringify(msg));
     }
   }

   handleRequest(msg) {

     if (msg.msgtype == globals_.SNW_MSGTYPE_ICE ) {
       /*var streamid = msg.streamid;
       console.warn("streamid=" + streamid);
       var stream = this.getStreamById(streamid);
       if (stream) {
          stream.receiveMessage(msg);
       } else {
         console.warn("stream not found, id=" + streamid);
       }*/
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

  handleResponse(msg) {
    if (msg.rc < 0) {
      console.error("error msg: ", msg.rc);
      return;
    }
    console.log("response: " + JSON.stringify(msg));
  }

  handleMessage(evt) {
    var msg = JSON.parse(evt.data);
    if (msg.rc != null) {
      this.handleResponse(msg);
    } else {
      this.handleRequest(msg);
    }
  }

  onIceConnected() {
    if (this.state === 'connected') return; //already send request

    if (this.type === globals_.PUBLISHER_STREAM_TYPE) {
       this.sendMessage({'msgtype':globals_.SNW_MSGTYPE_ICE,'api':globals_.SNW_ICE_PUBLISH,
               'channelid': this.streamid,
               'streamid': this.streamid});
    } else if (this.type === globals_.SUBSCRIBER_STREAM_TYPE) {
       this.sendMessage({'msgtype':globals_.SNW_MSGTYPE_ICE,'api':globals_.SNW_ICE_PLAY,
               'channelid': this.streamid,
               'publishid': this.streamid,
               'streamid': this.streamid});
    }/* else if (this.type === globals_.P2P_STREAM_TYPE) {
       console.log("p2p mode (nothing to do), channelId=" + this.channelId);
    }*/ else {
       // error
    }
    this.state = 'connected';
    this.broadcast('onIceConnected',null);
  }


  createPeerConnection(stream) {
    var self = this;

    this.pc = new RTCPeerConnection(this.config.pcConfig, this.config.sdpConstraints)

    function onicecandidate(event) {
      if (event.candidate) {
         var candidate = event.candidate.candidate;
         //TODO: allow only private or specific IP?
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
            self.sendMessage({'msgtype':globals_.SNW_MSGTYPE_ICE,'api':globals_.SNW_ICE_CANDIDATE,
                    'streamid': self.streamid,
                    'channelid': self.streamidd,
                    'candidate':{
                         type: 'candidate',
                         sdpMLineIndex: event.candidate.sdpMLineIndex,
                         sdpMid: event.candidate.sdpMid,
                         candidate: event.candidate.candidate}});
         //}
      } else {
         /*if (self.type === globals_.P2P_STREAM_TYPE) {
            console.log('no more local candidate');
            self.sendMessage({'msgtype':globals_.SNW_SIG,'api':globals_.SNW_SIG_CANDIDATE,
                     'id': self.id, 'remoteid': self.remoteId, 'candidate':{ done: true }});
         } else {*/
            self.sendMessage({'msgtype':globals_.SNW_MSGTYPE_ICE,'api':globals_.SNW_ICE_CANDIDATE,
                     'streamid': self.streamid,
                     'channelid': self.streamid,
                     'candidate':{ done: true }});
         //}
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


  parseConfig(config) {
    if (config.hasOwnProperty('localNode')) {
      this.localNode = config.localNode
    }

  }

  publish(config) {
    var self = this
    //handle config
    console.log("publish config: " + JSON.stringify(config))
    this.parseConfig(config)

    if (config.type === 'camera') {
       navigator.getUserMedia(this.config.mediaConstraints, function(stream) {
         if (!stream) return
         self.localStream = stream
         console.log('got camera stream')
         self.localNode.srcObject = stream
         //self.broadcast("onMediaReady", stream);

         //create stream id and publish
         createStreamID(self.host, 8868)
         .then(function(data) {
           var streamid = JSON.parse(data.responseText).channelid;
           console.log('result: ' + streamid)
           self.streamid = streamid
           self.type = globals_.PUBLISHER_STREAM_TYPE
           console.log('create peer connection: ' + self.localStream)
           self.createPeerConnection(self.localStream);
           self.sendMessage({'msgtype':globals_.SNW_MSGTYPE_ICE,'api':globals_.SNW_ICE_CONNECT,
                      'channelid': self.streamid, 'stream_type': self.type, 'video_codec': self.vcodec,
                      'name': 'test', 'streamid': self.streamid});
         })
         .catch(function(error) {
           console.error('internal error: ' + error)
         })
       }, function(info) {
         console.error("failed to get media")
       });

    }

  }

}

