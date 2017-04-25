//load dependcies
var express = require('express');//Express.js
var fs = require('fs');//Node.js file system
var bodyParser = require('body-parser');//this library helps parse html
var path = require('path');//Node.js utility



//create express app
var app = express();

//add static assest: images, icons, stylesheets
app.use('/static', express.static(path.join(__dirname, 'assets/images')));
app.use('/static', express.static(path.join(__dirname, 'assets/images/icons')));
app.use('/static', express.static(path.join(__dirname, 'assets/images/icons/logo')));
app.use('/static', express.static(path.join(__dirname, 'assets/images/web_samples')));

//for better optimization I split up images from stylesheets
app.use('/styles', express.static(path.join(__dirname, 'assets/style')));

//intialize bodyParser to allow express to
// serve html files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//this function handles when a request
//is made to this project directory
app.get('/', function(req,res){

    //sends main html as response
    res.sendFile(__dirname +'/index.html');


});


//this function handles specfic post requests
//from the contact form on index.html
app.post('/myMessages', function(req,res){
  //get parameters from form and create message
    var message = req.body.name + "\n"
            + req.body.email +"\n"
            + req.body.message;

    //initialize date object
    var date = new Date();
    //get unique milliseconds and name as a unique filename,
    //as to not allow any conflicts
    var filename = req.body.name + date.getUTCMilliseconds().toString() + ".txt";


    //write file to message directory
    fs.writeFile(  '../message_center/messages/'+filename, message, function (err, data) {

        //handle errors reading
        if(err) return console.log(err);


    });


    //return user back to main page
    res.sendFile(__dirname +'/index.html');


});

//tell node app listen to port 8080
app.listen(8080);