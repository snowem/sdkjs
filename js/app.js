(function(d){
  var js, id = 'snowsdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "https://snowem.io/js/snowsdk.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

window.snowAsyncInit = function() {
 
   var isPublisher = 0;
   var channelid = 0;
   var publishingPeer = null;
   var playingPeer = null;
   var config = {
      'wss_ip': "wss.snowem.io",
      'wss_port': 8443
   };

   function onPublishChannelCreated(peer) {
      console.log("onCreate: publishing peer=" + JSON.stringify(peer));
      document.getElementById("yourId").innerHTML = peer.channelId;
      var settings = {
         'h264': 1,
         'channelid': peer.channelId,
         'localVideoId': document.getElementById('localVideo'),
         'remoteVideoId': null
      };

      peer.publish(settings);
   }

   $("#publishBtn").click(function() {
      console.log("publishing 1");
      isPublisher = 1;
      $("#floatDiv").hide();
      $("#publishDiv").append('<div class="text-center"> Your webcam\'s channel id: <span style="color:#FF0000" id="yourId"></span></div>');
      publishingPeer = SnowSDK.createPeer(config);
      publishingPeer.onReady = function() {
         publishingPeer.createChannel({name: "demo"},onPublishChannelCreated);
         publishingPeer.listen('onPeerJoined',function(msg) {
            console.log("onPeerJoined: msg=", msg);
            publishingPeer.call(msg.remoteid);
         });
      };
   });

   $("#playBtn").click(function() {
      channelid = parseInt(document.getElementById("playChannelId").value);
      isPublisher = 0;
      $("#playBtnDiv").hide();
      playingPeer = SnowSDK.createPeer(config);
      playingPeer.onReady = function() {
         var settings = {
            'h264': 1,
            'channelid': channelid,
            'localVideoId': null,
            'remoteVideoId': document.getElementById('playRemoteVideo')
         };
         playingPeer.play(settings);
      }

   });
}

