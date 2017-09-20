Get Started
================

### Introduction
Snowem is a lightweight live streaming server, based on webrtc technology. Basically, a video stream is identified by a channel id - an integer.

Snowem has two built-in subsystems, which are designed for developers to easily integrate video streams into their applictions. 

 * Websocket Sever is used to exchanges messages between client and media server before establishing video stream connection.
 * Media Sever is used to establish video stream connection by handling ICE protocol and other related stuff. 

Let's to start to setup Snowem:

 * Compile Snowem.
 * Setup Snowem.
 * Quick start.

### Compilation

Snowem depends on the following libraries to build:  
 - libopenssl.  
 - libevent with openssl support.  
 - libnettle.  
 - libjansson.  
 - libsofia-sip-ua.  
 - libsrtp.  
 - libconfig.

Notes: on Ubuntu system, one may install the following packages:
<pre><code class="language-shell">
apt-get install libssl1.0.0 libssl-dev libevent-2.0-5 libevent-openssl-2.0-5 libevent-dev libsofia-sip-ua-dev libsofia-sip-ua0 libsrtp0 libsrtp0-dev libjansson-dev libjansson4 libnettle6 nettle-dev libconfig9 libconfig-dev
</code></pre>

To build Snowem, execute the following commands: 
<pre><code class="language-shell">
git clone https://github.com/jackiedinh8/snowem.git
cd snowem
mkdir build
cd build
cmake ..
make
make install
</code></pre>

### Setup
The configuration file is written in format of libconfig. To properly configure Snowem, one needs to provide certificates for both built-in websocket server and media server to establishing secure video streams. Basically, it looks like this:
<pre><code class="language-shell">
//certificate used by built-in websocket server.
wss_cert_file = "<path-to>/wss_fullchain.pem"
wss_key_file = "<path-to>/wss_privkey.pem"
wss_bind_ip = "<ip_of_websocket_server>"
wss_bind_port = 443
//certificate used by media server.
ice_cert_file = "<path-to>/ice_fullchain.pem"
ice_key_file = "<path-to>/ice_privkey.pem"
// TRACE: 0, INFO: 1, DEBUG: 2, WARN: 3, ERROR: 4, FATAL: 5
log_level = 0
</code></pre>

Note: one may find configuration sample file at [snowem.conf](https://github.com/jackiedinh8/snowem/blob/master/sample/snowem.conf).

To run Snowem, simple execute:
<pre><code class="language-shell">
snowem <path-to>/snowem.conf
</code></pre>

### Quick Start

Check out web application [here](https://github.com/jackiedinh8/snowem/tree/master/html), put it in your prefer web server.  
Steps to integrate video streams:
#### Step 1: Integrate javascript SnowSDK into your web application
``` javascript
<script type="text/javascript" src="js/adapter.js"></script>
<script type="text/javascript" src="js/snowsdk.js"></script>
```
Note: snowsdk.js is available [here](https://github.com/jackiedinh8/snowem/blob/master/sdk/js);
#### Step 2: Define Window.asynSnowInit

When SnowSDK is loaded, it invokes window.snowAsyncInit. Once it is called, you can initlialize SnowSDK with a callback. The callback will be called when 
SnowSDK is initialized.

``` javascript
window.snowAsyncInit = function() {
   SnowSDK.init(function() {
      // this function will be called when SnowSDk is initialized.
      // do your stuff
   })
}
```
Note: window.snowAsyncInit must be defined before SnowSDK is loaded.

#### Step 3: Create Peer object
A Peer object is used to establish connection to built-in websocket server and media server. To connect to the websocket socket, one must provide its server name and port. 
``` javascript
var config = {
   'servername': "media.snowem.io",
   'port': 443
}
var peer = SnowSDK.createPeer(config);
```

#### Step 4: Create a channel
To publish a video stream, one need to get a channel id from Snowem sever. 
``` javascript
function onChannelCreated(peer) {
   // do stuff here.
}
peer.createChannel({name: "demo"},onChannelCreated);
```
On success, a provided callback will be called. The callback accepts Peer object, which invoked createChannel(), as the first argument.

#### Step 5: Publish a video stream
After successful creating a channel, one can publish a video stream.
``` javascript
function onChannelCreated(peer) {
  document.getElementById("yourId").innerHTML = peer.peerId;
  var settings = { 
     'channelid': channelid,
     'localVideoId': document.getElementById('localVideo'),
  };  
  peer.publish(settings);   
}
peer.createChannel({name: "demo"},onChannelCreated);
```

#### Step 6: Play a video stream
One can play a video stream, give its channel id.
``` javascript
function onChannelCreated(peer) {
  var settings = { 
     'channelid': remote_channelid,
     'remoteVideoId': document.getElementById('localVideo'),
  };  
  peer.publish(settings);   
}
peer.createChannel({name: "demo"},onChannelCreated);
```
Note: even Peer object does not publish a video stream, it still needs a channel id to establish connection to media server.

#### Step 7: Complete source code of the sample
Check complete source code of the sample [here](https://github.com/jackiedinh8/snowem/blob/master/html/js/app.js).

### Further Resource

For full documentation, check [here](https://snowem.io/docs.html).  
For feedback and comments, check [here](#).  
For reporting bugs, check [here](#).

