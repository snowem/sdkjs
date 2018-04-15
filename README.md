This is javascript sdk for snowem streaming server. You can use it to create a channel and to publish/play a media stream on a channel.

### Setup A Demo Webapp

Prerequisite: install nodejs and express framework.
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Install demo webapp. Open sdkjs/js/app.js, change wss_ip to your snowem server's ip address. If you run snowem on your local machine, then just put "127.0.0.1".
```
git clone https://github.com/snowem/sdkjs.git
cd sdkjs
npm install
node index.js
```
Open your browser, paste the url "http://localhost:8000", start testing the demo. 

### SDK Usage

Define your init function _snowAsyncInit_:
```
<script type="text/javascript" src="js/adapter.js"></script>
<script type="text/javascript" src="js/snowsdk.js"></script>

window.snowAsyncInit = function() {
   var config = { 
      'wss_ip': "<your-wss-ip>",
      'wss_port': 8443 
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
     var channel = {
        'name': 'snowem-example',
        'type': 'conference'
     }
     SnowSDK.createChannel(channel, onSuccess, onError);
   });
}
```

When SnowSDK is loaded, it invokes _snowAsyncInit_ if it is defined. Once it is called, you can initlialize SnowSDK with _init_ function. 
The _init_ function requires domain name or ip address of Snowem Websocket Service. 

Check [here](https://github.com/snowem/sdkjs/blob/master/js/app.js) for more details on example code.


