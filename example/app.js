var host = '192.168.1.110'
var fileVideo = document.getElementById('fileVideo');
var hasWebcam = false
var stream = null

$('#templateVideoBoxId').hide();
$('#publishVideoDiv').hide();
$('#localStreamId').hide();
$('#fileVideoId').hide();

function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight )
            callback(newHeight);
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

onElementHeightChange(document.body, function(h){
  if(h < window.screen.width){
    $('#footer').removeClass('fixed-bottom')
  } else  {
    $('#footer').addClass('fixed-bottom')
  }
});

function maybeCreateStream() {
  if (stream) {
    return;
  }
  if (fileVideo.captureStream) {
    stream = fileVideo.captureStream();
    console.log('Captured stream from fileVideo with captureStream',
      stream);
  } else if (fileVideo.mozCaptureStream) {
    stream = fileVideo.mozCaptureStream();
    console.log('Captured stream from fileVideo with mozCaptureStream()',
      stream);
  } else {
    console.log('captureStream() not supported');
  }
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

function createVideoBox(name) {
     var a = $('#templateVideoBoxId').html()
         .replace('videoBoxId', 'videoBoxId' + name)
         .replace('playDiv', 'playDiv' + name)
         .replace('remoteVideo', 'remoteVideo' + name);
     $('#streamBoxId').append(a);
}


$('#playStreamBtn').click(function() {
  var playStream = new snowem.Stream(host, 8443)
  playStream.listen('onIceConnected', function(msg) {
    console.log('ice connected')
  });
  playStream.listen('onIceDisonnected', function(msg) {
    console.log('ice disconnected')
  });

  var streamid = parseInt($('#playStreamId').val())
  var streamname = playStream.getStreamName()
  console.log('play stream: ' + streamname)
  createVideoBox(streamname)
  var config = {
    'streamid': streamid,
    'remoteNode':  document.getElementById('remoteVideo' + streamname),
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
});

$('#publishCameraBtn').click(function() {
  var type = 'camera'
  var localStream = null
  if (!hasWebcam) {
    type = 'video'
    localStream = stream
    var playPromise = fileVideo.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        console.log('start playing video file')
      })
      .catch(error => {
        console.log('video playing error')
      });
    }

  }
  var config = {
    'type': type,
    'localStream': localStream,
    'localNode': document.getElementById('localVideo'),
    'remoteNode':  document.getElementById('remoteVideo'),
    'media': {
      'audio': true,
      'video': true,
      'data': true,
    },
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
    //TODO: chrome and firefox do differently here
    'sdpConstraints': {
      'mandatory': {
        'OfferToReceiveAudio':false,
        'OfferToReceiveVideo':false,
      }
    },
  }
  var publishStream = new snowem.Stream(host, 8443)
  publishStream.listen('onIceConnected', function(msg) {
    console.log('ice connected')
    $('#publishVideoDiv').show();
    $('#localStreamId').text('Local Stream - ' + publishStream.getStreamID())
    $('#localStreamId').show();
    $('#playStreamId').val(publishStream.getStreamID())
  });

  publishStream.publish(config)
})


