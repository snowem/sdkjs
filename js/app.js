window.snowAsyncInit = function() {
   SnowSDK.init(function (){
      var isPublisher = 0;
      var channelid = 0;
      var peer = null;
      var config = {
         'servername': "wss.snowem.io",
         'port': 8443
      };

      function onPublishChannelCreated(peer) {
         console.log("onPublishChannelCreate: peer=" + JSON.stringify(peer));
         document.getElementById("yourId").innerHTML = peer.peerId;
         var settings = {
            'channelid': channelid,
            'localVideoId': document.getElementById('localVideo'),
            'remoteVideoId': null
         };

         peer.publish(settings);
      }

      $("#publishBtn").click(function() {
         isPublisher = 1;
         $("#floatDiv").hide();
         $("#publishDiv").append('<div class="text-center"> Your webcam\'s channel id: <span style="color:#FF0000" id="yourId"></span></div>');
         peer = SnowSDK.createPeer(config);
         peer.createChannel({name: "demo"},onPublishChannelCreated);
      });

      function onPlayChannelCreated(peer) {
         console.log("onCreate: peer=" + JSON.stringify(peer));
         var settings = {
            'channelid': channelid,
            'localVideoId': null,
            'remoteVideoId': document.getElementById('playRemoteVideo')
         };
         peer.play(settings);
      }
      $("#playBtn").click(function() {
         channelid = parseInt(document.getElementById("playChannelId").value);
         isPublisher = 0;
         $("#playBtnDiv").hide();
         peer = SnowSDK.createPeer(config);
         peer.createChannel({name: "demo"},onPlayChannelCreated);
      });
   })
}

