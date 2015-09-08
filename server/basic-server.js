/* Import node's http module: */
var http = require("http");
var express = require("express");
var app = express();
var ip = "127.0.0.1";
var port = 3000;
var fs = require('fs');
var url = require('url');
var path = require('path');
var bodyparser = require('body-parser');

app.get('/', function(req, res){
  res.set(defaultCorsHeaders);
  res.set('Content-Type','application/json');
  res.status(200);
  fs.readFile(path.join(__dirname, './', 'data.json'), function(err, data){
    if(err){throw err; } 
    res.send(data);  
  });
});

var writeData = function(messages){
  fs.writeFile(path.join(__dirname, './', 'data.json'), JSON.stringify(messages), function(err){
    if (err) console.log(err);
  });
};

app.use(bodyparser.json());

app.options('/', function(req, res) {
  res.set(defaultCorsHeaders);
  res.status(200);
  res.send();
})

app.post('/', function(req, res){
  console.log("post request");
  res.set(defaultCorsHeaders);
  res.set('Content-Type','application/json');
  res.status(201);
  var mssgData = req.body;
  console.log(mssgData);
  res.send();
  fs.readFile(path.join(__dirname, './', 'data.json'), function(err, data){
    if(err){throw err}
    var messages = JSON.parse(data);
    //var message = JSON.parse(mssgData);
    mssgData.objectId = +messages.id + 1;
    messages.id = +messages.id + 1;  
    messages.results.unshift(mssgData);
    writeData(messages);  
  });
});



app.listen(port, ip);


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};


/*
var mssgData = '';
    request.on('data', function(chunk) {
      mssgData += chunk;
    });
    request.on('end', function(){
      response.writeHead(201, headers);
      response.end();
      fs.readFile(path.join(__dirname, './', 'data.json'), function(err, data){
        if(err){throw err}
        var messages = JSON.parse(data);
        var message = JSON.parse(mssgData);
        message.objectId = +messages.id + 1;
        messages.id = +messages.id + 1;  
        messages.results.unshift(message);
        writeData(messages);  
      });
    })
*/
// var handleRequest = require('./request-handler.js');

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
// var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
// var ip = "127.0.0.1";



// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest.requestHandler);
//console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

