This is javascript sdk for snowem streaming server. You can use it to create a channel and to publish/play a media stream on a channel.

### SDK Usage

Define your init function _snowAsyncInit_:
```
<script type="text/javascript" src="js/adapter.js"></script>
<script type="text/javascript" src="js/snowsdk.js"></script>

window.snowAsyncInit = function() {
   var config = { 
      'ip': "your-wss-ip",
      'port': 443 
   };  
   SnowSDK.init(config);

   //start your code here
   console.log("start your app here");
   start_app();
}

function start_app() {
   function onSuccess(resp) {
     console.log("resp: " + resp);
     var joinChannelId = resp.channelid;

     // create a peer
     peer = SnowSDK.createPeer(config);
     peer.onAddPeerStream = function(info) {
       var name = "playRemoteVideo" + info.peerid;
       var remote_video_elm = document.getElementById(name);
       remote_video_elm.autoPlay = true;
       remote_video_elm.srcObject = info.stream;
     }   
     publishingPeer.onRemovePeerStream = function(info) {
       var name = "videoBoxId" + info.peerid;
       console.log("removing video: " + name);
       //todo:
     }   

     //publish camera to channelid
     var settings = { 
        'channelid': parseInt(joinChannelId),
        'local_video_elm': document.getElementById('localVideo'),
        'remote_video_elm': null
     };
     peer.publish(settings);
   }   

   function onError(resp) {
     console.log("resp: " + resp);
   }

   $("#joinRoomBtn").click(function() {
     //create a channel
     var channelinfo = {
        'name': 'snowem-example',
        'type': 'conference'
     }
     SnowSDK.getGroupChannel($("#joinRoomChannelId").val(), onSuccess, onError);
   });
}
```

When SnowSDK is loaded, it invokes _snowAsyncInit_ if it is defined. Once it is called, you can initlialize SnowSDK with _init_ function. 
The _init_ function requires domain name or ip address of Snowem Websocket Service. 

Check [here](https://github.com/snowem/sdkjs/blob/master/js/app.js) for more details on example code.


