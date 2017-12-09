window.snowAsyncInit = function() {
   SnowSDK.init(function (){
      var isPublisher = 0;
      var channelid = 0;
      var peer = null;
      var fbpeer = null;
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
            'video': "on",
            'h264': 1,
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
      peer.onReady = function() {
         peer.createChannel({name: "demo"},onPlayChannelCreated);
         peer.listen('onPeerJoined',function(msg) {
            console.log("onPeerJoined: msg=", msg);
            peer.call(msg.remoteid);
         });
         peer.listen('onIceConnected',function() {
            console.log("onIceConnected: mute micro");
            peer.localStream.getAudioTracks()[0].enabled = false;
         });
      }

      /*var vid = document.getElementById("videoTag");
      vid.onplay = function() {
         fbpeer = SnowSDK.createPeer(config);
         function onPublishChannelCreated(fbpeer) {
           console.log("onCreate: publishing peer=" + JSON.stringify(fbpeer));
           $("#playFBDiv").append('<div class="text-center"> facebook channel id: <span style="color:#FF0000" id="channelId1"></span></div>');
           document.getElementById("channelId1").innerHTML = fbpeer.channelId;
           console.log("captureStream: ", document.getElementById("videoTag"));
           var settings = {
              'h264': 1,
              'channelid': fbpeer.channelId,
              'localStream': document.getElementById("videoTag").captureStream(),
              'localVideoId': null,
              'remoteVideoId': null
           };
           fbpeer.publish(settings);
         }
         fbpeer.onReady = function() {
            fbpeer.createChannel({name: "demo"},onPublishChannelCreated);
            fbpeer.listen('onIceConnected',function() {
               console.log("onIceConnected: mute micro");
               fbpeer.localStream.getAudioTracks()[0].enabled = false;
            });
         }
      };*/
   })
}

