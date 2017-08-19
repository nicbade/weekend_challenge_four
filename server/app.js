var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var employee = require('./routes/employee');
app.use(express.static('./server/public'));


var port = 5000;

app.use(express.static('./server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/employee', employee);

app.listen(port, function() {
    console.log('listening on port', port);
})