var host = 'localhost';
var fileVideo = document.getElementById('fileVideo');
var hasWebcam = false
var stream = null

$('#templateVideoBoxId').hide();
$('#publishVideoDiv').hide();
$('#localStreamId').hide();
$('#fileVideoId').hide();

function maybeCreateStream() {
  if (stream) {
    return;
  }
  if (fileVideo.captureStream) {
    stream = fileVideo.captureStream();
  } else if (fileVideo.mozCaptureStream) {
    stream = fileVideo.mozCaptureStream();
  } else {
    console.error('captureStream() not supported');
    return
  }
  //console.log('Captured stream from fileVideo with captureStream', stream);
}

DetectRTC.load(function() {
  hasWebcam = DetectRTC.hasWebcam
  if (!hasWebcam) {
    fileVideo.oncanplay = maybeCreateStream;
    if (fileVideo.readyState >= 3) {
      maybeCreateStream();
    }
  }
})

function createVideoBox(name, streamid) {
  $('#remoteStreamId').text('Remote stream - ' + streamid)
  var a = $('#templateVideoBoxId').html()
    .replace('videoBoxId', 'videoBoxId' + name)
    .replace('playDiv', 'playDiv' + name)
    .replace('remoteVideo', 'remoteVideo' + name)
    .replace('remoteStreamId', 'remoteStreamId' + name)
    .replace('closeRemoteStreamId', 'closeRemoteStreamId' + name);
  $('#streamBoxId').append(a);
}

$('#playStreamBtn').click(function() {

  var streamId = parseInt($('#playStreamId').val())
  if (isNaN(streamId)) {
    console.error("invalid stream id")
    return
  }

  var playStream = new snowem.Stream(host, 8443)
  playStream.listen('onIceConnected', function(msg) {
    //ice connection established
  });
  playStream.listen('onIceDisonnected', function(msg) {
    //ice connection closed
  });

  var streamName = playStream.getStreamName()
  createVideoBox(streamName, streamId)
  var config = {
    'streamid': streamId,
    'remoteNode':  document.getElementById('remoteVideo' + streamName),
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
    'sdpConstraints': {
      'mandatory': {
        'OfferToReceiveAudio':true,
        'OfferToReceiveVideo':true,
      }
    },
  }
  playStream.play(config)

  var btn = '#closeRemoteStreamId' + streamName
  $(btn).click(function()  {
    console.log('close stream: ' + streamName)
    var elmId = '#videoBoxId' + streamName
    $(elmId).remove()
    playStream.close()
  });

});

$('#publishCameraBtn').click(function() {
  document.getElementById('localBoxId').style.display = 'block';
  var type = 'camera'
  var localStream = null
  if (!hasWebcam) {
    type = 'video'
    localStream = stream
    var playPromise = fileVideo.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        //console.log('start playing video file')
      })
      .catch(error => {
        console.error('failed to play video')
      });
    }
  }
  var config = {
    'type': type,
    'localStream': localStream,
    'localNode': document.getElementById('localVideo'),
    'remoteNode':  document.getElementById('remoteVideo'),
    'mediaConstraints': {
      'audio': true,
      'video': {
        width: {min: 480, max: 480},
        height: {min: 270, max: 270}
      }
    },
    'pcConfig': {
      'iceServers':[{'urls':'stun:stun3.l.google.com:19302'}],
      'iceTransports': 'all'
    },
    'sdpConstraints': {
      'mandatory': {
        'OfferToReceiveAudio':false,
        'OfferToReceiveVideo':false,
      }
    },
  }
  var publishStream = new snowem.Stream(host, 8443)
  publishStream.listen('onIceConnected', function(msg) {
    $('#publishVideoDiv').show();
    $('#localStreamId').text('Local Stream - ' + publishStream.getStreamID())
    $('#localStreamId').show();
    $('#playStreamId').val(publishStream.getStreamID())
  });
  publishStream.publish(config)

  $('#closeLocalStreamId').click(function()  {
    console.log('close published stream')
    document.getElementById('localBoxId').style.display = 'none';
    publishStream.close()
    $('#publishVideoDiv').hide();
  });

})


