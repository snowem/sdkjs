import * as c from './constants.js'

//TODO: use promise
function sendPostRequest (url, data, onSuccess, onError) {
  // Sending and receiving data in JSON format using POST method
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      onSuccess(JSON.parse(xhr.responseText));
    }
    //TODO: when call onError!
    //onError(xhr.responseText);
  };
  xhr.send(JSON.stringify(data));
}

function sendGetRequest (url, data, onSuccess, onError) {
  // Sending a receiving data in JSON format using GET method
  var xhr = new XMLHttpRequest();
  var reqUrl = url + "/?data=" + JSON.stringify(data);
  xhr.open("GET", reqUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
    }
  };
  xhr.send();
}

function createStreamID(server, port = 8868) {
  var url = 'https://' + server + ':' + port

  var msg = {
    'msgtype': c.SNW_MSGTYPE_CHANNEL,
    'api': 1,
    'name': 'test',
    'type': 0,
    'key': 'key',
  }

  sendPostRequest(url, msg,
    function(msg) {
      console.log('got msg: ' + msg.channelid)

    },
    function(err) {
      console.log('got err: ' + err)

    });
}

export default createStreamID
