(function(d){
  var js, id = 'snowsdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "https://snowem.io/js/snowsdk.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

window.snowAsyncInit = function() {

   //start your code here
   console.log("start your app here");
   start_app();
}

function createVideoBox(channelid) {
     var a = $('#templateVideoBoxId').html()
         .replace("videoBoxId", "videoBoxId" + channelid)
         .replace("playDiv", "playDiv" + channelid)
         .replace("playRemoteVideo", "playRemoteVideo" + channelid);
     //console.log("html: ", a);
     $('#confRoomId').append(a);
}

function start_app() { 
   var isPublisher = 0;
   var channelid = 0;
   var publishingPeer = null;
   var playingPeer = null;
   var config = {
      'wss_ip': "wss.snowem.io",
      'wss_port': 8443,
      'video_codec': "h264",
   };

   publishingPeer = SnowSDK.createPeer(config);
   publishingPeer.createChannel({name: "demo", "channel_type": "conference"}, function(peer){
     console.log("channelid: ", peer.channelId);
     channelid = peer.channelId;
     $("#joinRoomChannelId").val(channelid);
   });
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

   $("#joinedRoomSectionId").hide();
   $("#conferenceSectionId").hide();
   $("#templateVideoBoxId").hide();
   $("#joinRoomBtn").click(function() {
     var joinChannelId = $("#joinRoomChannelId").val();
     console.log("join channel: ", joinChannelId);
     $("#joinRoomSectionId").hide();
     $("#joinedRoomSectionId").show();
     $("#conferenceSectionId").show();
     $("#joinedChannelId").text(""+joinChannelId);
     var settings = {
        'channelid': parseInt(joinChannelId),
        'local_video_elm': document.getElementById('localVideo'),
        'remote_video_elm': null
     };
     publishingPeer.publish(settings);
   });

   $("#addBtn").click(function() {
     createVideoBox(1000);
   });

}

