var express = require('express')
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./js/example.key'),
    cert: fs.readFileSync('./js/example.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = express()
app.use('/',express.static('.'))
var server = https.createServer(options, app).listen(8000, function(){
  console.log('Snowem demo app listening on port 8000!')
});
