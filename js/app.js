window.snowAsyncInit = function() {
   var config = {
      'wss_ip': "192.168.1.187",
      'wss_port': 8443
   };
   SnowSDK.init(config);

   console.log("start your app here");
   start_app();
}

function createVideoBox(channelid) {
     var a = $('#templateVideoBoxId').html()
         .replace("videoBoxId", "videoBoxId" + channelid)
         .replace("playDiv", "playDiv" + channelid)
         .replace("playRemoteVideo", "playRemoteVideo" + channelid);
     $('#confRoomId').append(a);
}

function start_app() { 
  var channel = null;
  var config = {
    'audio': true,
    'video': true,
    'data' : true
  };
  var stream = new SnowSDK.Stream(config);

  function onSuccess(data) {
     channel = data;
     channel.listen("onConnected", function() {
       stream.listen("onMediaReady", function(info) {
         stream.setLocalVideoElm(document.getElementById('localVideo'));
         channel.publish(stream);
       });
       stream.getUserMedia();
     });

     channel.listen("onAddStream", function(stream) {
       var name = "playRemoteVideo" + stream.getId();
       createVideoBox(stream.getId());
       var remote_video_elm = document.getElementById(name);

       console.log("onAddStream: got remote stream " + JSON.stringify(stream.getId()));
       stream.setRemoteVideoElm(remote_video_elm);
       channel.play(stream);
     });

     channel.listen("onRemoveStream", function(stream) {
       var name = "videoBoxId" + stream.getId();
       $("#"+name).remove();
     });

     channel.connect();
  }

  function onError(resp) {
     console.log("resp: " + resp);
  }

  $("#joinedRoomSectionId").hide();
  $("#conferenceSectionId").hide();
  $("#templateVideoBoxId").hide();
  $("#joinRoomBtn").click(function() {
    var info = {
      'name': $("#joinRoomChannelId").val(),
      'type': 'conference',
      'key': 'none'
    }
    SnowSDK.createChannel(info, onSuccess, onError);
  });

}

