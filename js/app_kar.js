window.snowAsyncInit = function() {
   SnowSDK.init(function (){
      var isPublisher = 0;
      var channelid = 0;
      var peer = null;
      var config = {
         'servername': "wss.snowem.io",
         'port': 8443
      };

      function onPlayChannelCreated(peer) {
         console.log("onCreate: peer=" + JSON.stringify(peer));
         $("#playDiv").append('<div class="text-center"> Your webcam\'s channel id: <span style="color:#FF0000" id="channelId"></span></div>');
         document.getElementById("channelId").innerHTML = peer.channelId;
         channelid = peer.channelId;
         var settings = {
            'peerType': "p2p",
            'video': "off",
            'recvonly': "on",
            'channelid': channelid,
            'localVideoId': null,
            'remoteVideoId': document.getElementById('playRemoteVideo')
         };
         console.log("connecting to server");
         peer.connect(settings);
      }

      isPublisher = 0;
      peer = SnowSDK.createPeer(config);
      peer.createChannel({name: "demo"},onPlayChannelCreated);
      peer.listen('onPeerJoined',function(msg) {
            console.log("onPeerJoined: msg=", msg);
            peer.call(msg.remoteid);
      });
      peer.listen('onIceConnected',function() {
         console.log("onIceConnected: mute micro");
         peer.localStream.getAudioTracks()[0].enabled = false;
      });

   })
}

