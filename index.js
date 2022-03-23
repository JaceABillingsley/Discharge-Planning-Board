const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/',function(req, res){res.sendFile(path.join(__dirname+'/view.html'));});
router.get('/edit',function(req, res){res.sendFile(path.join(__dirname+'/edit.html'));});

app.post('/pushdata', function (req, res) {
  var j = req.body;
  var data = [j.roomNumber, j.patient, j.provider, j.rn, j.status, j.admit, j.target, j.los, j.elos, j.ryg, j.dcby11, j.dcplan, j.barrier1, j.barrier2, j.readmissionrisk, j.tele];
  fs.readFile('JSON/DCPB.json', (err, data) => {if (err) throw err;
    var jsondata = JSON.parse(data);
    var y = `r${j.roomNumber-1}`
    function replaceEmptySpace(value) {
      for (var i = 0; i < 15; i++) {
        if (j[value[i]] == '') {jsondata[0][y][value[i]] = '-';}
        else {jsondata[0][y][value[i]] = j[value[i]];}
    }}
    replaceEmptySpace(["patient", 'provider', 'rn', 'status', 'admit', 'target', 'los', 'elos', 'dcplan', 'barrier1', 'barrier2']);
    var rygoptions = j.ryg.toLowerCase();
    var dcby11options = j.dcby11.toLowerCase();
    var readmissionrisk = j.readmissionrisk.toLowerCase();
    var teleoptions = j.tele.toLowerCase();
    if (rygoptions == 'r') {jsondata[0][y].ryg = '🔴'}
    else if (rygoptions == 'y') {jsondata[0][y].ryg = '🟡'}
    else if (rygoptions == 'g') {jsondata[0][y].ryg = '🟢'}
    else if (rygoptions == '-') {jsondata[0][y].ryg = '⚪'}
    if (dcby11options == 'n') {jsondata[0][y].dcby11 = '❌'}
    else if (dcby11options == 'y') {jsondata[0][y].dcby11 = '✔️'}
    else if (dcby11options == '-') {jsondata[0][y].dcby11 = '-'}
    if (readmissionrisk == 'n') {jsondata[0][y].readmissionrisk = '❌'}
    else if (readmissionrisk == 'y') {jsondata[0][y].readmissionrisk = '✔️'}
    else if (readmissionrisk == 'h') {jsondata[0][y].readmissionrisk = '❗️'}
    else if (readmissionrisk == '-') {jsondata[0][y].readmissionrisk = '-'}
    if (teleoptions == 'n') {jsondata[0][y].tele = '❌'}
    else if (teleoptions == 'y') {jsondata[0][y].tele = '✔️'}
    else if (teleoptions == '-') {jsondata[0][y].tele = '-'}
    fs.writeFile('JSON/DCPB.json', JSON.stringify(jsondata), (err) => {if (err) throw err; res.redirect('/edit')});
})});

app.use('/', router);
app.listen(process.env.port || 3000);
app.use(express.static(__dirname + '/'));
console.log('Running at Port 3000');  