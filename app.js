const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT ||3000;
const bodyParser = require('body-parser');

//console.log('all fine till here')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.urlencoded());
app.use(express.static(__dirname+'/images'));
//console.log('running')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +'/index.html'));
    
});

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));