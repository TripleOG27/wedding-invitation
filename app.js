const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT ||3000;
const Firebase = require('firebase');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const firebase = require("firebase/app");


// require("firebase/auth");
// require("firebase/firestore");
// const firebaseConfig = {
//     apiKey: "AIzaSyCrmsXIMrZ64aqBOy8qPDK4SwmgrcnzvhA",
//     authDomain: "wedding-invitation-b1ce3.firebaseapp.com",
//     databaseURL: "https://wedding-invitation-b1ce3-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "wedding-invitation-b1ce3",
//     storageBucket: "wedding-invitation-b1ce3.appspot.com",
//     messagingSenderId: "603995052886",
//     appId: "1:603995052886:web:a2d92fa603b824797654f7",
//     measurementId: "G-896KJ9QZ01"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// const serviceAccount = require("wedding-invitation-b1ce3-firebase-adminsdk-g57q7-99e82e8fe9.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


//console.log('all fine till here')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(express.urlencoded());
app.use(express.static(__dirname+'/images'));
app.use(express.static(__dirname+'/scripts'));
app.use(morgan('dev'));
app.use(function(req, res, next){
res.setHeader("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
res.header("Access-Control-Max-Age", "3600");
res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
next();
});

// Firebase.initializeApp({
//     databaseURL: "https://console.firebase.google.com/project/wedding-invitation-b1ce3/firestore/data~2Fguests~2F0",
//     serviceAccount: './wedding-invitation-b1ce3-firebase-adminsdk-g57q7-99e82e8fe9.json', //this is file that I downloaded from Firebase Console
//     });
//console.log('running')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +'/index.html'));
    
});
require("firebase/auth");
require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyCrmsXIMrZ64aqBOy8qPDK4SwmgrcnzvhA",
    authDomain: "wedding-invitation-b1ce3.firebaseapp.com",
    databaseURL: "https://wedding-invitation-b1ce3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wedding-invitation-b1ce3",
    storageBucket: "wedding-invitation-b1ce3.appspot.com",
    messagingSenderId: "603995052886",
    appId: "1:603995052886:web:a2d92fa603b824797654f7",
    measurementId: "G-896KJ9QZ01"
};
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

app.post('/', function(req, res) {
    let data = req.body;
    console.log(data);
    //res.send(url);
});

app.listen(port, () => console.log(`wedding-invitation showing on port ${port}!`));