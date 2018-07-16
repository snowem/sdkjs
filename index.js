var express = require('express')
var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./example.key'),
    cert: fs.readFileSync('./example.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

var app = express()

//app.use('/',express.static('.'))
//app.listen(8000, function () {
//  console.log('Snowem demo app listening on port 8000!')
//})

app.use('/',express.static('.'))
var server = https.createServer(options, app).listen(8000, function(){
  console.log('Snowem demo app listening on port 8000!')
});
