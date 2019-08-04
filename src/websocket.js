import { addSong, getRoom } from '../actions'
import {
  ADD_SONG,
  GET_ROOM,
  TAKE_MICRO,
  SDP_OFFER,
  REMOTE_CANDIDATE,
} from '../constants'

class Websocket {
  constructor(dispatch, username, remoteVideoRef) {
    this.listeners = [];
    this.roomName = this.getRandomName(16);
    this.dispatch = dispatch;
    this.username = username;
    this.remoteVideoRef = remoteVideoRef;
    this.isConnected = false;
    this.msgs = [];
    this.socket = null;
    this.listeners = [];
    this.initPeerConnection();
    this.init();
  }

  getRandomName(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
    //console.log("sending msg, msg=", message);
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

  initPeerConnection() {
    var config = {
      mediaConstraints : {
        audio: true,
        video: false,
      },
      pcConfig : {
        'iceServers':[{'urls':'stun:stun3.l.google.com:19302'}],
        'iceTransports': 'all'
      },
      //TODO: chrome and firefox do differently here
      sdpConstraints : {
        'mandatory': {
          'OfferToReceiveAudio':true,
          'OfferToReceiveVideo':false,
        }
      },
    }
    this.config = config
    this.state = "disconnected"
    this.localStream = null
    this.localVideoElm = document.getElementById("localVideo");
    this.remoteStream = null
    this.remoteVideoElm = document.getElementById("remoteVideo");
  }

  init() {
    this.socket = new WebSocket('wss://karaoke.snowem.io:3333/ws')
    this.socket.onopen = () => {
      this.triggerEvent("onConnected")
      this.isConnected = true
      this.sendMessage({
        'cmd': 'get_room',
        'type': 'web',
        'key': 'jwt'
      })
    }
    this.socket.onmessage = (event) => {
      //console.log('receive message: ' + event.data)
      const data = JSON.parse(event.data)
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
      }
    }

  }

  handleTakeMicro(msg) {
    //console.log("handle take_micro")
  }

  handleSDPOffer(data) {
    //console.log("handle sdp_offer  " + data.payload)
    this.onRemoteSdp(data.payload.sdp)
  }

  handleRemoteCandidate(data) {
    //console.log("handle remote_candidate  " + data.payload)
    this.onRemoteCandidate(data.payload.candidate)
  }

  onIceConnected(pc, stream) {
    if (this.state === 'connected') return;
    this.state = 'connected'
    this.triggerEvent('onIceConnected',{pc, stream});
  }

  onIceDisconnected() {
    this.state = 'disconnected'
    var eventName = 'onIceDisconnected';
    if (!this.listeners[eventName]) {
      console.log("no handler for event, name=" + JSON.stringify(eventName));
      return;
    }
    for (var i = 0; i < this.listeners[eventName].length; i++) {
      this.listeners[eventName][i]();
    }
  }


  createPeerConnection(stream) {
    var self = this;

    this.pc = new RTCPeerConnection(this.config.pcConfig, this.config.sdpConstraints)

    function onicecandidate(event) {
      if (event.candidate) {
         //var candidate = event.candidate.candidate;
         //TODO: allow only private or specific IP?
         //if (candidate.indexOf("192.168") === -1) return;

         //console.log('send local candidate: ' + JSON.stringify(event.candidate));
         self.sendMessage({
           'cmd':'local_candidate',
           'payload': {
             'roomid': 8509,
             'key': "webkey",
             'candidate':{
                type: 'candidate',
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
                candidate: event.candidate.candidate},
           }
         });
      } else {
         console.log('no more local candidate');
      }
    }

    function onaddstream(event) {
      //console.log('Remote stream added, src:' + self.remoteVideoElm);
      self.remoteStream = event.stream;
      if (self.remoteVideoElm) {
        self.remoteVideoElm.srcObject = event.stream;
      }
    }

    function onremovestream(event) {
      //console.log('Remote stream removed. Event: ', event);
    }

    function oniceconnectionstatechange(event) {
      console.log("ICE connection status changed : state=" + event.target.iceConnectionState);
      if (event.target.iceConnectionState === "connected") {
        self.onIceConnected(self.pc, self.remoteStream);
      }
      if (event.target.iceConnectionState === "disconnected") {
        self.onIceDisconnected();
      }
    }

    function ondatachannel(event) {
      self.datachannel = event.channel || event; // Chrome sends event, FF sends raw channel
      self.datachannel.onopen = function(event) {
        console.log("datachannel opended");
      }
      self.datachannel.onmessage = function(event) {
        console.log("received msg: " + event);
      }
    }

    this.datachannel = this.pc.createDataChannel('sendDatachannel', null);
    function onDatachannelStateChange() {
      var readyState = self.datachannel.readyState
      console.log("datachannel state change: " + readyState);
      if (readyState === 'open') {
        console.log("send data over datachannel");
        self.datachannel.send("hello dc");
      }
    }

    function onDatachannelMessage(event) {
      console.log("received msg: ", event);
    }
    this.datachannel.onopen = onDatachannelStateChange;
    this.datachannel.onclose = onDatachannelStateChange;
    this.datachannel.onmessage = onDatachannelMessage;

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
    this.pc.ondatachannel = ondatachannel;
  }

  doAnswer(msg) {
    var self = this;
    function setLocalAndSendMessage(sessionDescription) {
      self.pc.setLocalDescription(sessionDescription);
      self.sendMessage({
        'cmd':'sdp_answer',
        'payload': {
          'roomid': 8509,
          'key': "webkey",
          'sdp':sessionDescription
        }
      });
    }
    function onError(e) {
       console.log("failed to create sdp answer: " + e);
    }

    this.localStream = document.getElementById("localVideo").captureStream();
    this.createPeerConnection();
    this.pc.setRemoteDescription(new RTCSessionDescription(msg));
    this.pc.createAnswer(setLocalAndSendMessage, onError, this.config.sdpConstraints);
  }

  onRemoteSdp(msg) {
    //console.log("handle sdp: ", msg);
    if (msg.type === 'offer') {
      this.doAnswer(msg);
    } else if (msg.type === 'answer') {
        this.pc.setRemoteDescription(new RTCSessionDescription(msg));
    } else {
      console.error("unknown msg: " + JSON.stringify(msg));
    }
  }

  onRemoteCandidate(msg) {
     if (msg.type === 'candidate') {
       var candidate = new RTCIceCandidate({sdpMid: msg.sdpMid,
             sdpMLineIndex:msg.sdpMLineIndex, candidate:msg.candidate});
       //console.log("remote candidate " + JSON.stringify(candidate));
       this.pc.addIceCandidate(candidate);
     } else {
       console.error("unknown candidate: " + JSON.stringify(msg));
     }
  }


}

export default Websocket
