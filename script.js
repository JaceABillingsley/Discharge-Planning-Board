var patient = [];
var minGrid = 1;
var maxGrid = 21;
var savedData = [];

var testvar = 'Green'

var provider = [];
var patient = [];
var los = [];
var elos = [];
var admit = [];
var target = [];



order1()



var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function cellOpen() {
  modal.style.display = "block";
}

function saveJson(data2) {
  savedData = data2
} 

function setJson(data) {
  saveJson(data)
}


function order1() {
fetch("./files/test.json")
  .then(res => res.json())
  .then(data => printIt(data))

let printIt = (data) => {
  setJson(data);
}
}

function runCell(args){
  var jsondata = args;
  var x = jsondata[3]._cells[0].data;
  y = `r${x-1}`
  var rygoptions = ''
  if(savedData[0][y].ryg == '🔴') {rygoptions = 'r'}
  if(savedData[0][y].ryg == '🟡') {rygoptions = 'y'}
  if(savedData[0][y].ryg == '🟢') {rygoptions = 'g'}
  if(savedData[0][y].ryg == '⚪') {rygoptions = '-'}
  var dcby11options = ''
  if(savedData[0][y].dcby11 == '✔️') {dcby11options = 'dcby11yes'}
  if(savedData[0][y].dcby11 == '❌') {dcby11options = 'dcby11no'}
  if(savedData[0][y].dcby11 == '-') {dcby11options = 'dcby11unsure'}
  var readmissionriskoptions = ''
  if(savedData[0][y].readmissionrisk == '✔️') {readmissionriskoptions = 'readmissionriskyes'}
  if(savedData[0][y].readmissionrisk == '❌') {readmissionriskoptions = 'readmissionriskno'}
  if(savedData[0][y].readmissionrisk == '❗️') {readmissionriskoptions = 'readmissionriskhigh'}
  if(savedData[0][y].readmissionrisk == '-') {readmissionriskoptions = 'readmissionriskunsure'}
  var teleoptions = ''
  if(savedData[0][y].tele == '✔️') {teleoptions = 'teleyes'}
  if(savedData[0][y].tele == '❌') {teleoptions = 'teleno'}
  if(savedData[0][y].tele == '-') {teleoptions = 'teleunsure'}
  document.getElementById("roomNumber").setAttribute("value", jsondata[3]._cells[0].data);
  document.getElementById("patient").setAttribute("value", savedData[0][y].patient);
  document.getElementById("provider").setAttribute("value", savedData[0][y].provider);
  document.getElementById("rn").setAttribute("value", savedData[0][y].rn);
  document.getElementById("status").setAttribute("value", savedData[0][y].status);
  document.getElementById("admit").setAttribute("value", savedData[0][y].admit);
  document.getElementById("target").setAttribute("value", savedData[0][y].target);
  document.getElementById("los").setAttribute("value", savedData[0][y].los);
  document.getElementById("elos").setAttribute("value", savedData[0][y].elos);
  document.getElementById("dcplan").setAttribute("value", savedData[0][y].dcplan);
  document.getElementById("barrier1").setAttribute("value", savedData[0][y].barrier1);
  document.getElementById("barrier2").setAttribute("value", savedData[0][y].barrier2);
  document.getElementById(rygoptions).setAttribute("checked", "True");
  document.getElementById(dcby11options).setAttribute("checked", "True");
  document.getElementById(readmissionriskoptions).setAttribute("checked", "True");
  document.getElementById(teleoptions).setAttribute("checked", "True");
  cellOpen();
}

function createvars(v1) {
  switch(v1) {
  case "patient":
    for (var i = 0; i<20; i++) {
      var temp = Object.keys(savedData[0]);
      var r = temp[i];
      patient.push(savedData[0][r][v1]);
    }
    break;
  case "provider":
    for (var i = 0; i<20; i++) {
      var temp = Object.keys(savedData[0]);
      var r = temp[i];
      provider.push(savedData[0][r][v1]);
    }
    break;
  case "los":
    for (var i = 0; i<20; i++) {
      var temp = Object.keys(savedData[0]);
      var r = temp[i];
      los.push(savedData[0][r][v1]);
    }
    break;
  case "elos":
    for (var i = 0; i<20; i++) {
      var temp = Object.keys(savedData[0])
      var r = temp[i]
      elos.push(savedData[0][r][v1])
    }
    break;
  case "admit":
    for (var i = 0; i<20; i++) {
      var temp = Object.keys(savedData[0])
      var r = temp[i]
      admit.push(savedData[0][r][v1])
    }
    break;
  case "target":
    for (var i = 0; i<20; i++) {
      var temp = Object.keys(savedData[0])
      var r = temp[i]
      target.push(savedData[0][r][v1])
    }
    break;
  default:
}

}

var temp5 = getryg("Green");
var dataroom0 = [];

function createrooms() {
    var i = 0;
    dataroom0.push(i);
    dataroom0.push(patient[i]);
    dataroom0.push(provider[i]);
    dataroom0.push(los[i]);
    dataroom0.push(elos[i]);
    dataroom0.push(admit[i]);
    dataroom0.push(target[i]);
  }


function getryg(varcolor) {
  var temp1 = gridjs.html("<div>" + `<img src='/images/${varcolor}.png', style='height: 30px;'>` + "</div>")
  return temp1
}

function rowJSON(data){
  var jsondata = JSON.parse(data)
  var data = [];
  data.push(jsondata[3]._cells[0].data)
  data.push(jsondata[3]._cells[1].data)
  data.push(jsondata[3]._cells[2].data)
  data.push(jsondata[3]._cells[3].data)
  data.push(jsondata[3]._cells[4].data)
  data.push(jsondata[3]._cells[5].data)
  data.push(jsondata[3]._cells[6].data)
  data.push(jsondata[3]._cells[7].data)
  data.push(jsondata[3]._cells[8].data)
  data.push(jsondata[3]._cells[9].data)
  data.push(jsondata[3]._cells[10].data)
  data.push(jsondata[3]._cells[11].data)
  data.push(jsondata[3]._cells[12].data)
  data.push(jsondata[3]._cells[13].data)
  data.push(jsondata[3]._cells[14].data)
  data.push(jsondata[3]._cells[15].data)

  return data
}

setTimeout(() => {mainData()}, 200);

function mainData() {
  createvars("patient")
  createvars("provider")
  createvars("los")
  createvars("elos")
  createvars("admit")
  createvars("target")
  createrooms()
function creategrid(roomMin, roomMax) {
  var rooms = [];
  for (i = 0; i < roomMax+1-roomMin; i++) {
    var roomNumber = i + roomMin;
    rooms.push(roomNumber);
  }
  const grid = new gridjs.Grid({
  columns: [{name:"Bed #", }, {name:"Patient", width:"20px"}, {name:"Provider", width:"10px"},{name:"RN", width:"10px"}, {name:"Status", width:"10px"}, {name:"Admit", width:"10px"}, {name:"Target", width:"10px"}, {name:"LOS", width:"10px"}, {name:"ELOS", width:"10px"}, {name:"R/Y/G", width:"10px"}, {name:"D/C By 11", width:"10px"}, {name:"D/C Plan", width:"10px"}, {name:"Barrier 1", width:"10px"}, {name:"Barrier 2", width:"10px"}, {name:"Readmission Risk", width:"10px"}, {name:"Tele", width:"10px"}],
  search: true,
  style: {
    table: {
      border: '3px solid #ccc'
    },
    th: {
      color: '#000',
      'border-bottom': '3px solid #ccc',
      'border': '3px solid #ccc',
      'text-align': 'center'
    },
    td: {
      color: '#000',
      'border-bottom': '3px solid #ccc',
      'border': '3px solid #ccc',
      'text-align': 'center'
    },
    
  },
  className: {
    td: 'td',
    tr: 'tr'
  },
  rows: ['1'],
  data: [
    ["1", savedData[0].r0.patient, savedData[0].r0.provider, savedData[0].r0.rn, savedData[0].r0.status, savedData[0].r0.admit, savedData[0].r0.target, savedData[0].r0.los, savedData[0].r0.elos, savedData[0].r0.ryg, savedData[0].r0.dcby11, savedData[0].r0.dcplan, savedData[0].r0.barrier1, savedData[0].r0.barrier2, savedData[0].r0.readmissionrisk, savedData[0].r0.tele],
    ["2", savedData[0].r1.patient, savedData[0].r1.provider, savedData[0].r1.rn, savedData[0].r1.status, savedData[0].r1.admit, savedData[0].r1.target, savedData[0].r1.los, savedData[0].r1.elos, savedData[0].r1.ryg, savedData[0].r1.dcby11, savedData[0].r1.dcplan, savedData[0].r1.barrier1, savedData[0].r1.barrier2, savedData[0].r1.readmissionrisk, savedData[0].r1.tele],
    ["3", savedData[0].r2.patient, savedData[0].r2.provider, savedData[0].r2.rn, savedData[0].r2.status, savedData[0].r2.admit, savedData[0].r2.target, savedData[0].r2.los, savedData[0].r2.elos, savedData[0].r2.ryg, savedData[0].r2.dcby11, savedData[0].r2.dcplan, savedData[0].r2.barrier1, savedData[0].r2.barrier2, savedData[0].r2.readmissionrisk, savedData[0].r2.tele],
    ["4", savedData[0].r3.patient, savedData[0].r3.provider, savedData[0].r3.rn, savedData[0].r3.status, savedData[0].r3.admit, savedData[0].r3.target, savedData[0].r3.los, savedData[0].r3.elos, savedData[0].r3.ryg, savedData[0].r3.dcby11, savedData[0].r3.dcplan, savedData[0].r3.barrier1, savedData[0].r3.barrier2, savedData[0].r3.readmissionrisk, savedData[0].r3.tele],
    ["5", savedData[0].r4.patient, savedData[0].r4.provider, savedData[0].r4.rn, savedData[0].r4.status, savedData[0].r4.admit, savedData[0].r4.target, savedData[0].r4.los, savedData[0].r4.elos, savedData[0].r4.ryg, savedData[0].r4.dcby11, savedData[0].r4.dcplan, savedData[0].r4.barrier1, savedData[0].r4.barrier2, savedData[0].r4.readmissionrisk, savedData[0].r4.tele],
    ["6", savedData[0].r5.patient, savedData[0].r5.provider, savedData[0].r5.rn, savedData[0].r5.status, savedData[0].r5.admit, savedData[0].r5.target, savedData[0].r5.los, savedData[0].r5.elos, savedData[0].r5.ryg, savedData[0].r5.dcby11, savedData[0].r5.dcplan, savedData[0].r5.barrier1, savedData[0].r5.barrier2, savedData[0].r5.readmissionrisk, savedData[0].r5.tele],
    ["7", savedData[0].r6.patient, savedData[0].r6.provider, savedData[0].r6.rn, savedData[0].r6.status, savedData[0].r6.admit, savedData[0].r6.target, savedData[0].r6.los, savedData[0].r6.elos, savedData[0].r6.ryg, savedData[0].r6.dcby11, savedData[0].r6.dcplan, savedData[0].r6.barrier1, savedData[0].r6.barrier2, savedData[0].r6.readmissionrisk, savedData[0].r6.tele],
    ["8", savedData[0].r7.patient, savedData[0].r7.provider, savedData[0].r7.rn, savedData[0].r7.status, savedData[0].r7.admit, savedData[0].r7.target, savedData[0].r7.los, savedData[0].r7.elos, savedData[0].r7.ryg, savedData[0].r7.dcby11, savedData[0].r7.dcplan, savedData[0].r7.barrier1, savedData[0].r7.barrier2, savedData[0].r7.readmissionrisk, savedData[0].r7.tele],
    ["9", savedData[0].r8.patient, savedData[0].r8.provider, savedData[0].r8.rn, savedData[0].r8.status, savedData[0].r8.admit, savedData[0].r8.target, savedData[0].r8.los, savedData[0].r8.elos, savedData[0].r8.ryg, savedData[0].r8.dcby11, savedData[0].r8.dcplan, savedData[0].r8.barrier1, savedData[0].r8.barrier2, savedData[0].r8.readmissionrisk, savedData[0].r8.tele],
    ["10", savedData[0].r9.patient, savedData[0].r9.provider, savedData[0].r9.rn, savedData[0].r9.status, savedData[0].r8.admit, savedData[0].r9.target, savedData[0].r9.los, savedData[0].r9.elos, savedData[0].r9.ryg, savedData[0].r9.dcby11, savedData[0].r9.dcplan, savedData[0].r9.barrier1, savedData[0].r9.barrier2, savedData[0].r9.readmissionrisk, savedData[0].r9.tele],
    ["11", savedData[0].r10.patient, savedData[0].r10.provider, savedData[0].r10.rn, savedData[0].r10.status, savedData[0].r10.admit, savedData[0].r10.target, savedData[0].r10.los, savedData[0].r10.elos, savedData[0].r10.ryg, savedData[0].r10.dcby11, savedData[0].r10.dcplan, savedData[0].r10.barrier1, savedData[0].r10.barrier2, savedData[0].r10.readmissionrisk, savedData[0].r10.tele],
    ["12", savedData[0].r11.patient, savedData[0].r11.provider, savedData[0].r11.rn, savedData[0].r11.status, savedData[0].r11.admit, savedData[0].r11.target, savedData[0].r11.los, savedData[0].r11.elos, savedData[0].r11.ryg, savedData[0].r11.dcby11, savedData[0].r11.dcplan, savedData[0].r11.barrier1, savedData[0].r11.barrier2, savedData[0].r11.readmissionrisk, savedData[0].r11.tele],
    ["13", savedData[0].r12.patient, savedData[0].r12.provider, savedData[0].r12.rn, savedData[0].r12.status, savedData[0].r12.admit, savedData[0].r12.target, savedData[0].r12.los, savedData[0].r12.elos, savedData[0].r12.ryg, savedData[0].r12.dcby11, savedData[0].r12.dcplan, savedData[0].r12.barrier1, savedData[0].r12.barrier2, savedData[0].r12.readmissionrisk, savedData[0].r12.tele],
    ["14", savedData[0].r13.patient, savedData[0].r13.provider, savedData[0].r13.rn, savedData[0].r13.status, savedData[0].r13.admit, savedData[0].r13.target, savedData[0].r13.los, savedData[0].r13.elos, savedData[0].r13.ryg, savedData[0].r13.dcby11, savedData[0].r13.dcplan, savedData[0].r13.barrier1, savedData[0].r13.barrier2, savedData[0].r13.readmissionrisk, savedData[0].r13.tele],
    ["15", savedData[0].r14.patient, savedData[0].r14.provider, savedData[0].r14.rn, savedData[0].r14.status, savedData[0].r14.admit, savedData[0].r14.target, savedData[0].r14.los, savedData[0].r14.elos, savedData[0].r14.ryg, savedData[0].r14.dcby11, savedData[0].r14.dcplan, savedData[0].r14.barrier1, savedData[0].r14.barrier2, savedData[0].r14.readmissionrisk, savedData[0].r14.tele],
    ["16", savedData[0].r15.patient, savedData[0].r15.provider, savedData[0].r15.rn, savedData[0].r15.status, savedData[0].r15.admit, savedData[0].r15.target, savedData[0].r15.los, savedData[0].r15.elos, savedData[0].r15.ryg, savedData[0].r15.dcby11, savedData[0].r15.dcplan, savedData[0].r15.barrier1, savedData[0].r15.barrier2, savedData[0].r15.readmissionrisk, savedData[0].r15.tele],
    ["17", savedData[0].r16.patient, savedData[0].r16.provider, savedData[0].r16.rn, savedData[0].r16.status, savedData[0].r16.admit, savedData[0].r16.target, savedData[0].r16.los, savedData[0].r16.elos, savedData[0].r16.ryg, savedData[0].r16.dcby11, savedData[0].r16.dcplan, savedData[0].r16.barrier1, savedData[0].r16.barrier2, savedData[0].r16.readmissionrisk, savedData[0].r16.tele],
    ["18", savedData[0].r17.patient, savedData[0].r17.provider, savedData[0].r17.rn, savedData[0].r17.status, savedData[0].r17.admit, savedData[0].r17.target, savedData[0].r17.los, savedData[0].r17.elos, savedData[0].r17.ryg, savedData[0].r17.dcby11, savedData[0].r17.dcplan, savedData[0].r17.barrier1, savedData[0].r17.barrier2, savedData[0].r17.readmissionrisk, savedData[0].r17.tele],
    ["19", savedData[0].r18.patient, savedData[0].r18.provider, savedData[0].r18.rn, savedData[0].r18.status, savedData[0].r18.admit, savedData[0].r18.target, savedData[0].r18.los, savedData[0].r18.elos, savedData[0].r18.ryg, savedData[0].r18.dcby11, savedData[0].r18.dcplan, savedData[0].r18.barrier1, savedData[0].r18.barrier2, savedData[0].r18.readmissionrisk, savedData[0].r18.tele],
    ["20", savedData[0].r19.patient, savedData[0].r19.provider, savedData[0].r19.rn, savedData[0].r19.status, savedData[0].r19.admit, savedData[0].r19.target, savedData[0].r19.los, savedData[0].r19.elos, savedData[0].r19.ryg, savedData[0].r19.dcby11, savedData[0].r19.dcplan, savedData[0].r19.barrier1, savedData[0].r19.barrier2, savedData[0].r19.readmissionrisk, savedData[0].r19.tele],
  ]
})
grid.on('cellClick', (...args) => runCell(args));
grid.render(document.getElementById("wrapper"));
}
creategrid(1,21)

}