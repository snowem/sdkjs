window.snowAsyncInit = function() {
   var config = {
      'wss_ip': "127.0.0.1",
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
   var isPublisher = 0;
   var channelid = 0;
   var publishingPeer = null;
   var playingPeer = null;
   var config = {
      'video_codec': "h264",
   };

   function onSuccess(resp) {
     console.log("resp: " + resp);
     var joinChannelId = resp.channelid;
     console.log("join channel: ", joinChannelId);
     $("#joinRoomSectionId").hide();
     $("#joinedRoomSectionId").show();
     $("#conferenceSectionId").show();
     $("#joinedChannelId").text(""+joinChannelId);

     publishingPeer = SnowSDK.createPeer(config);
     publishingPeer.onAddPeerStream = function(info) {
       var name = "playRemoteVideo" + info.peerid;
       createVideoBox(info.peerid);
       var remote_video_elm = document.getElementById(name);

       console.log("new stream added: ",name);
       remote_video_elm.autoPlay = true;
       remote_video_elm.srcObject = info.stream;
     }
     publishingPeer.onRemovePeerStream = function(info) {
       var name = "videoBoxId" + info.peerid;
       console.log("removing video: " + name);
       $("#"+name).remove();
     }

     var settings = {
        'channelid': parseInt(joinChannelId),
        'local_video_elm': document.getElementById('localVideo'),
        'remote_video_elm': null
     };
     publishingPeer.publish(settings);
   }

   function onError(resp) {
     console.log("resp: " + resp);
   }

   $("#joinedRoomSectionId").hide();
   $("#conferenceSectionId").hide();
   $("#templateVideoBoxId").hide();
   $("#joinRoomBtn").click(function() {
     var data = {
       'name': $("#joinRoomChannelId").val(),
       'type': 'conference',
       'token': 'tbd'
     }
     SnowSDK.createChannel(data, onSuccess, onError);
   });
}

