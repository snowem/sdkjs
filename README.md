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

When SnowSDK is loaded, it invokes _snowAsyncInit_ if it is defined. Once it is called, you can initlialize SnowSDK with _init_ function. 
The _init_ function requires domain name or ip address of Snowem Websocket Service. 

For more details, check an example [here](https://github.com/snowem/sdkjs/blob/master/js/app.js).


