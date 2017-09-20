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

      /*$("#publishBtn").click(function() {
         isPublisher = 1;
         $("#floatDiv").hide();
         $("#publishDiv").append('<div class="text-center"> Your webcam\'s channel id: <span style="color:#FF0000" id="yourId"></span></div>');
         peer = SnowSDK.createPeer(config);
         peer.createChannel({name: "demo"},onPublishChannelCreated);
      });
      */ 
      function onPlayChannelCreated(peer) {
         console.log("onCreate: peer=" + JSON.stringify(peer));
         $("#playDiv").append('<div class="text-center"> Your webcam\'s channel id: <span style="color:#FF0000" id="channelId"></span></div>');
         document.getElementById("channelId").innerHTML = peer.channelId;
         channelid = peer.channelId;
      }

      $("#playBtn").click(function() {
         console.log("onCreate: peer=" + JSON.stringify(peer));
         var settings = {
            'video': "off",
            'recvonly': "on",
            'channelid': channelid,
            'localVideoId': null,
            'remoteVideoId': document.getElementById('playRemoteVideo')
         };
         peer.play(settings);
 
      });

      function getId(url) {
          var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          var match = url.match(regExp);

          if (match && match[2].length == 11) {
              return match[2];
          } else {
              return 'error';
          }
      }

      $("#singBtn").click(function() {
         var link = document.getElementById("youtubeLinkId").value;
         var videoId = "https://www.youtube.com/embed/" + getId(link);
         console.log("youtube link: " + videoId);
         document.getElementById('iframeId').src = videoId;
         //document.getElementById('iframeId').src += "&autoplay=1";
      });
      //$("#playBtn").click(function() {
         //channelid = parseInt(document.getElementById("playChannelId").value);
         //$("#playBtnDiv").hide();
      isPublisher = 0;
      peer = SnowSDK.createPeer(config);
      peer.createChannel({name: "demo"},onPlayChannelCreated);
      //});
   })
}

