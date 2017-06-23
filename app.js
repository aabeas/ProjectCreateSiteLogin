const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')

var http = require('http')
var path = require('path')
var os = require('os')
var fs = require('fs-extra')

var parseurl = require('parseurl')
var session = require('express-session')

var Busboy = require('busboy');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// <-------------------- log in -------------------->

app.post("/login",function(req,res){

    var username = req.body.username
    var password = req.body.password

    console.log(username)

    if(username === "john" && password === "password") {
        console.log("hey")
        req.session.userData = {username :username}
        res.render("home")
    } else {
      res.render("login",{error:"Invalid Credentials"})
    }

})

app.get("/login",function(req,res){
  res.render('login')
})

// app.post('/login',function(req,res){
//     console.log(req.body.username)  // THIS IS ALWAYS undefined
//     res.send("hello world")
// })



// <-------------------- log in -------------------->

var names = []

app.get('/', function(req, res){
  console.log(req.body.fName)
  res.render('index', {name: "Aaron"})
});

app.post('/save', function(req, res){
  console.log(req.body.fName)
  console.log(req.body.level)
  names.push({name:req.body.fName,level:req.body.level})
  console.log(names)
  res.render('index', {people: names})
});

app.listen(3000, function(){
  console.log("ok cool, listening!")
});
