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
    this.host = host
    this.port = port
    this.url = 'wss://' + host + ':' + port + '/ws'
    this.isConnected = false
    this.listeners = [];

    console.log("wss: " + this.url)
    this.socket = new WebSocket(this.url)
    this.socket.onopen = () => {
      this.triggerEvent('onConnected')
      this.isConnected = true
    }
    this.socket.onmessage = (event) => {
      console.log('receive message: ' + event.data)
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

  handleMessaage(msg) {
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

}

