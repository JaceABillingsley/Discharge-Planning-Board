const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

var userAmount = 2

app.post('/login', function (req, res) {
  fs.readFile('JSON/accounts.json', (err, data) => {
    try {
    if (err) throw err;
    var jsondata = JSON.parse(data);
    if (req.body.psw == jsondata[0][req.body.uname].password) {
      var id = jsondata[0][req.body.uname].id
      res.redirect(`/view?id=${id}`)
    }
    else {res.redirect('/errorlogin')}
  } 
     catch(error) {
      console.log(error)
      res.redirect('/errorlogin')
  }})
});

app.post('/dashboard', function (req, res) {
  fs.readFile('JSON/accounts.json', (err, data) => {
    try {
    if (err) throw err;
    var jsondata = JSON.parse(data);
    if (req.body.psw == jsondata[0][req.body.uname].password) {
      var id = jsondata[0][req.body.uname].id
      res.redirect(`/dashboard?id=${id}`)
    }
    else {res.redirect('/errorlogin')}
  } 
     catch(error) {
      console.log(error)
      try {res.redirect('/errorlogin')}
      catch{var i = 0}
  }})
});

app.post('/createaccount', function (req, res) {
  username = req.body.uname
  password = req.body.psw
  fs.readFile(`JSON/accounts.json`, (err, data) => {if (err) throw err;
    var jsondata = JSON.parse(data);
    var id = Math.random().toString(36).slice(18);
    if (jsondata[0][req.body.uname] != null) {res.redirect('/accountexists')}
    else {
    jsondata[0][username] = {}
    jsondata[0][username].password = password
    jsondata[0][username].id = id
    fs.readFile(`JSON/ids.json`, (err, data) => {if (err) throw err;
      var jsondata2 = JSON.parse(data);
      var i = userAmount
      userAmount += 1
      jsondata2[0][`id${i}`] = id
      fs.writeFile(`JSON/ids.json`, JSON.stringify(jsondata2), (err) => {if (err) throw err;});
    fs.writeFile(`JSON/accounts.json`, JSON.stringify(jsondata), (err) => {if (err) throw err;});
    try {
      res.redirect(`/dashboard?id=${id}`)
    }
    catch {
      var a1 = 0;
    }
})
}
});
});


router.get('/signup',function(req, res){
  res.sendFile(path.join(__dirname+'/signup.html'))
})
router.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/login.html'))
})
router.get('/logindashboard',function(req, res){
  res.sendFile(path.join(__dirname+'/logindashboard.html'))
})
router.get('/errorlogin',function(req, res){
  res.sendFile(path.join(__dirname+'/errorlogin.html'))
})
router.get('/accountexists',function(req, res){
  res.sendFile(path.join(__dirname+'/accountexists.html'))
})
router.get('/edit',function(req, res){
  var json_data = []
  fs.readFile(`JSON/ids.json`, (err, data) => {
    if (err) throw err; 
    json_data = JSON.parse(data)
    var result = [];
    for(var i in json_data) {result.push(json_data[i])}
    for (var i = 1; i < userAmount; i++) {
      if (result[0][`id${i}`] == req.query.id) {
        res.sendFile(path.join(__dirname+'/edit.html'))
      }
    }
  })
})

router.get('/dashboard',function(req, res){
  var json_data = []
  fs.readFile(`JSON/ids.json`, (err, data) => {
    if (err) throw err; 
    json_data = JSON.parse(data)
    var result = [];
    for(var i in json_data) {result.push(json_data[i])}
    for (var i = 1; i < userAmount; i++) {
      if (result[0][`id${i}`] == req.query.id) {
        res.sendFile(path.join(__dirname+'/dashboard.html'))
      }
    }
  res.sendFile(path.join(__dirname+'/errorlogin.html'))
  })
})

router.get('/view',function(req, res){
  var json_data = []
  fs.readFile(`JSON/ids.json`, (err, data) => {
    if (err) throw err; 
    json_data = JSON.parse(data)
    var result = [];
    for(var i in json_data) {result.push(json_data[i])}
    for (var i = 1; i < userAmount; i++) {
      if (result[0][`id${i}`] == req.query.id) {
        res.sendFile(path.join(__dirname+'/view.html'))
      }
    }
  })
})

app.post('/pushdata', function (req, res) {
  var j = req.body;
  var id = j.id;
  var data = [j.roomNumber, j.patient, j.provider, j.rn, j.status, j.admit, j.target, j.los, j.elos, j.ryg, j.dcby11, j.dcplan, j.barrier1, j.barrier2, j.readmissionrisk, j.tele];
  fs.readFile(`JSON/${id}.json`, (err, data) => {if (err) throw err;
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
    fs.writeFile(`JSON/${id}.json`, JSON.stringify(jsondata), (err) => {if (err) throw err; res.redirect(`/edit?id=${id}`)});
})});

app.use('/', router);
app.listen(process.env.port || 3000);
app.use(express.static(__dirname + '/'));
console.log('Running at Port 3000');  