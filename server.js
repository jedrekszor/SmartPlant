const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const db_manager = require('./dbManager');
const py_exporter = require('./exporter');
const str_resolver = require('./strResolver');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// GET ALL FLOWERS
app.get('/flowers', function (request, response) {
    console.log('GET request recieved at /flowers');

    db_manager.getAllFlowers(response);
});

app.get('/current', function(request, response){
    console.log('GET request recieved at /current');

    db_manager.getCurrentFlower(response);
});

// ADD FLOWER
app.post('/flowers_add', function (request, response) {
    console.log('POST request recieved at /flowers_add');

    db_manager.addFlower(response, request.body.name, request.body.temperature, request.body.humidity)
});

// REMOVE FLOWER
app.post('/flowers_remove', function (request, response) {
    console.log('POST request recieved at /flowers_remove');

    db_manager.deleteFlower(response, request.body.selectpicker_remove)
});

// EXPORT VALUE TO PYTHON FILE 
app.post('/export', function (request, response) {
    console.log('POST request recieved at /export');

    var v_humidity = parseInt(request.body.humidity);

    if (py_exporter.exportToPythonInt(v_humidity)) {
        console.log('exported successfully');
    }
    else {
        console.log('export error');
    }

    response.status(200).redirect('index.html');
});

// SETTING CURRENT FLOWER FROM DATABASE
app.post('/export_set', function (request, response) {
    console.log('POST request recieved at /export_set');

    var sp_value = request.body.selectpicker_set;

    var data = str_resolver.resolveString(sp_value);
    var v_flower_name = data[0];
    var v_humidity = parseInt(data[1]);

    //spawn python file and pass variable to it
    if (py_exporter.exportToPythonInt(v_humidity)) {
        console.log('exported successfully');

        db_manager.setCurrentToNone();
        db_manager.setOccupiedFlower(v_flower_name);
    }
    else {
        console.log('cannot execute exportToPython properly');
    }

    response.status(200).redirect('index.html');
});

// LOOP THE SERVER
app.listen(3000, function () {
    console.log("server is running on port 3000");
});