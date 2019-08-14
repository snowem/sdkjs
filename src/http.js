import * as c from './constants.js'

//TODO: use promise
function sendPostRequest (url, data, onSuccess, onError) {
  // Sending and receiving data in JSON format using POST method
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (typeof onSuccess === 'function')
        onSuccess(JSON.parse(xhr.responseText));
    } else {
      //TODO: why is it called on success?
      //if (typeof onError === 'function')
      //  onError(xhr.responseText);
    }
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
      if (typeof onSuccess === 'function')
        onSuccess(JSON.parse(xhr.responseText));
    } else {
      //TODO: why is it called on success?
      //if (typeof onError === 'function')
      //  onError(xhr.responseText);
    }
  };
  xhr.send();
}

function makeRequest(url, method, data) {
  var request = new XMLHttpRequest();
  return new Promise(function (resolve, reject) {
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status >= 200 && request.status < 300) {
        resolve(request);
      } else {
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };
    if (method === 'POST') {
      request.open(method, url, true);
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify(data));
    } else {
      var reqUrl = url + "/?data=" + JSON.stringify(data);
      request.open(method || 'GET', url, true);
      request.setRequestHeader("Content-type", "application/json");
      request.send();
    }
  });
}

function generateRandomString(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function createStreamIDOld(server, port = 8868, onSuccess, onError) {
  var url = 'https://' + server + ':' + port
  var msg = {
    'msgtype': c.SNW_MSGTYPE_CHANNEL,
    'api': 1,
    'name': generateRandomString(8),
    'type': 0,
    'key': 'key',
  }
  sendPostRequest(url, msg, onSuccess, onError);
}

function createStreamID(server, port = 8868, room = 'test') {
  var url = 'https://' + server + ':' + port
  var msg = {
    'msgtype': c.SNW_MSGTYPE_ICE,
    'api': 1,
    'name': generateRandomString(8),
    'type': 0,
    'key': 'key',
  }
  console.log('room name:' + msg.name)
  return makeRequest(url, 'POST', msg)
}


export default createStreamID
