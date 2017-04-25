var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

//var ws = fs.createWriteStream('/Messsages/text');


var app = express();


app.use('/static', express.static(path.join(__dirname, 'assets/images')));
app.use('/static', express.static(path.join(__dirname, 'assets/images/icons')));
app.use('/static', express.static(path.join(__dirname, 'assets/images/icons/logo')));
app.use('/static', express.static(path.join(__dirname, 'assets/images/web_samples')));
app.use('/styles', express.static(path.join(__dirname, 'assets/style')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', function(req,res){

    res.sendFile(__dirname +'/index.html');


});



app.post('/myMessages', function(req,res){
  var message = req.body.name + "\n" + req.body.email +"\n" + req.body.message;
    var date = new Date();
    var filename = req.body.name + date.getUTCMilliseconds().toString() + ".txt";

    res.sendFile(__dirname +'/index.html');
fs.writeFile(  '../message_center/messages/'+filename, message, function (err, data) {

if(err) return console.log(err);


});

});

app.listen(8080);