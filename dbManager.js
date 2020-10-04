const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/flowers.db');

//GET ALL FLOWERS
function getAllFlowers(response) {
    db.all('SELECT * FROM flowers', function (err, rows) {
        if (err) {
            console.log('get flowers error: ' + err);
        }
        else {
            response.send(rows);
        }
    });
}

function getCurrentFlower(response) {
    db.all('SELECT DISTINCT * FROM flowers WHERE current = 1', function (err, row) {
        if (err) {
            console.log('get flowers error: ' + err);
        }
        else {
            response.send(row);
        }
    });
}

function addFlower(response, fname, ftemp, fhumi) {
    db.run('INSERT INTO flowers VALUES (?, ?, ?, ?)', [fname, ftemp, fhumi, 0], function (err) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.status(200).redirect('index.html');
        }
    });
}

function deleteFlower(response, selectpickValue) {
    db.run('DELETE FROM flowers WHERE name = ?', [selectpickValue], function (err) {
        if (err) {
            console.log('error: ' + err);
        }
        else {
            response.status(200).redirect('index.html');
        }
    });
}

function setCurrentToNone(){
    db.run('UPDATE flowers SET current = 0', function (err) {
        if (err) {
            console.log('error: ' + err);
        }
    });
}

function setOccupiedFlower(flowerName){
    db.run('UPDATE flowers SET current = 1 WHERE name = ?', [flowerName], function (err) {

        if (err) {
            console.log('error: ' + err);
        }
    });
}

module.exports.getAllFlowers = getAllFlowers;
module.exports.getCurrentFlower = getCurrentFlower;
module.exports.addFlower = addFlower;
module.exports.deleteFlower = deleteFlower;
module.exports.setCurrentToNone = setCurrentToNone;
module.exports.setOccupiedFlower = setOccupiedFlower;