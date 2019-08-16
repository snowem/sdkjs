function createVideoBox(channelid) {
     var a = $('#templateVideoBoxId').html()
         .replace("videoBoxId", "videoBoxId" + channelid)
         .replace("playDiv", "playDiv" + channelid)
         .replace("playRemoteVideo", "playRemoteVideo" + channelid);
     $('#confRoomId').append(a);
}

$("#joinRoomBtn").click(function() {
  var streamid = parseInt($("#joinRoomChannelId").val())
  console.log('play stream: ' + streamid)
  var config = {
    'streamid': streamid,
    'remoteNode':  document.getElementById("remoteVideo"),
    'media': {
      'audio': true,
      'video': true,
      'data': true,
    },
    'mediaConstraints': {
      'audio': true,
      'video': true,
    },
    'pcConfig': {
      'iceServers':[{'urls':'stun:stun3.l.google.com:19302'}],
      'iceTransports': 'all'
    },
    //TODO: chrome and firefox do differently here
    'sdpConstraints': {
      'mandatory': {
        'OfferToReceiveAudio':true,
        'OfferToReceiveVideo':true,
      }
    },
  }

  var playStream = new snowem.Stream("192.168.1.110", 8443)
  playStream.play(config)
});

$("#publishCameraBtn").click(function() {
  var stream = new snowem.Stream("192.168.1.110", 8443)
  stream.listen("onIceConnected", function(msg) {
    console.log('ice connected')
    $("#joinRoomChannelId").val(stream.getStreamID())
  });
  var config = {
    'type': 'camera',
    'localNode': document.getElementById('localVideo'),
    'remoteNode':  document.getElementById("remoteVideo"),
    'media': {
      'audio': true,
      'video': true,
      'data': true,
    },
    'mediaConstraints': {
      'audio': true,
      'video': true,
    },
    'pcConfig': {
      'iceServers':[{'urls':'stun:stun3.l.google.com:19302'}],
      'iceTransports': 'all'
    },
    //TODO: chrome and firefox do differently here
    'sdpConstraints': {
      'mandatory': {
        'OfferToReceiveAudio':true,
        'OfferToReceiveVideo':true,
      }
    },
  }
  stream.publish(config)
})


