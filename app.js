const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT ||3000;
let num = 10
let num2 = 10
// const admin = require("firebase-admin");
const Firebase = require('firebase');
const firebase = require("firebase/app");

const morgan = require('morgan');
const bodyParser = require('body-parser');


const { removeListener } = require('process');
const e = require('method-override');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname+'/images'));
app.use(express.static(__dirname+'/scripts'));
app.use(express.static(__dirname+'/bootstrap-4.0.0-dist/js'));
app.use(morgan('dev'));
app.use(function(req, res, next){
res.setHeader("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
res.header("Access-Control-Max-Age", "3600");
res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
next();
});

require("firebase/auth");
require("firebase/firestore");

  const config = {
    apiKey: "AIzaSyCrmsXIMrZ64aqBOy8qPDK4SwmgrcnzvhA",
    authDomain: "wedding-invitation-b1ce3.firebaseapp.com",
    databaseURL: "https://wedding-invitation-b1ce3-default-rtdb.europe-west1.firebasedatabase.app",
    
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  const database = firebase.database();
  const dbref = firebase.database().ref('guests');
const guests=[];
app.get('/', function(req, res) {
    
    dbref.on("value", function(snapshot) {
        
        guests.push(snapshot.val());
        console.log(guests[0])
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    
    
    
    res.sendFile(path.join(__dirname +'/index.html'));
    
});

app.post('/', function(req, res) {
    let change = false;
    let data = req.body;
    let dataToSend = JSON.stringify(data);
    let fullName = data.FirstName + data.LastName;
    console.log(fullName)
    dbref.orderByValue().on("value", function(snapshot) {
        snapshot.forEach(function(data){
          let fullN = (JSON.parse(data.val()).FirstName + JSON.parse(data.val()).LastName).toLowerCase();
          console.log(fullN)
            if(fullName===fullN.toLowerCase()){
            database.ref('guests/'+data.key).set(dataToSend).then(function(){console.log(dataToSend);num++;num2++}).catch()
            change=true;
            res.sendFile(path.join(__dirname +'/confirmation.html'));
        }
          
        });
    });
    
    if(change!=true){
    database.ref('guests/'+(num*num2)).set(dataToSend).then(function(){num++; num++}).catch()
    }
    res.sendFile(path.join(__dirname +'/confirmation.html'));
        
    console.log(dataToSend);
    
});

app.listen(port, () => console.log(`wedding-invitation showing on port ${port}!`));