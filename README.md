This is javascript sdk for snowem media server.

### SDK Usage

To publish a stream:
```
var host = "localhost"
var config = {
  'type': 'camera',
  'localNode': document.getElementById('localVideo'),
  'mediaConstraints': {
    'audio': true,
    'video': true,
  },
}
var publishStream = new snowem.Stream(host, 8443)
publishStream.publish(config)
```
To play a stream:
```
var streamid = publishedStream.getStreamID()
var config = {
  'streamid': streamId,
  'remoteNode':  document.getElementById('remoteVideo'),
  'mediaConstraints': {
    'audio': true,
    'video': true
  }
};
var playStream = new snowem.Stream(host, 8443)
playStream.play(config)
```
Check [here](https://github.com/snowem/sdkjs/tree/master/example) for more details on example code.
Documentation at [here](https://snowem.io/#docs)



