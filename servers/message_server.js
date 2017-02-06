var http = require('http');
var express = require('express');
var socket = require('socket.io');


var app = express();

app.get('/', function (req, res) {

    res.send('GET request to homepage');
    console.log("hello world");
});


app.listen(3000);