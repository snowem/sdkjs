window.snowAsyncInit = function() {
   SnowSDK.init(function (){
      var isPublisher = 0;
      var channelid = 0;
      var peer = null;
      var config = {
         'servername': "wss.snowem.io",
         'port': 8443
      };

      function onCall(msg) {
         console.log("onCall: peer=" + JSON.stringify(msg));
      }

      peer = SnowSDK.createPeer(config);
      peer.onReady = function() {
         $("#connectBtn").click(function() {
            channelid = parseInt(document.getElementById("playChannelId").value);
            var settings = {
               'peerType': "p2p",
               'video': "on",
               'channelid': channelid,
               'localVideoId': null,
               'remoteVideoId': document.getElementById('playRemoteVideo')
            };
            console.log("connecting to server");
            peer.connect(settings);
         });
      }
   })
}

