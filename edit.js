var listofrooms = []
var savedData2;
const params = new URLSearchParams(location.search);
var id = params.get('id');
function toView() {
  window.location.replace(`https://app.dc.jacebapps.com/view?id=${id}`);
}
function setElements(elements, y) {
  for (var i=0; i<11; i++) {document.getElementById(elements[i]).setAttribute("value", savedData2[0][y][elements[i]])}
};
function clearElements(elements) {
  for (var i=0; i<11; i++) {document.getElementById(elements[i]).setAttribute("value", '')}
};
function setChecked(elements) {
  for (var i=0;i<4; i++) {document.getElementById(elements[i]).setAttribute("checked", "True")}
};
function clearChecked(elements) {
  for (var i=0;i<4; i++) {document.getElementById(elements[i]).setAttribute("checked", "True")}
};
function runCell(args){
  document.getElementById("id").setAttribute("value", id)
  var y = `r${args[3]._cells[0].data-1}`
  if (savedData2[0][y].ryg == '🔴') {var rygoptions = 'r'}
  else if (savedData2[0][y].ryg == '🟡') {var rygoptions = 'y'}
  else if (savedData2[0][y].ryg == '🟢') {var rygoptions = 'g'}
  else if (savedData2[0][y].ryg == '⚪') {var rygoptions = '-'}
  if (savedData2[0][y].dcby11 == '✔️') {var dcby11options = 'dcby11yes'}
  else if (savedData2[0][y].dcby11 == '❌') {var dcby11options = 'dcby11no'}
  else if (savedData2[0][y].dcby11 == '-') {var dcby11options = 'dcby11unsure'}
  if (savedData2[0][y].readmissionrisk == '✔️') {var readmissionriskoptions = 'readmissionriskyes'}
  else if (savedData2[0][y].readmissionrisk == '❌') {var readmissionriskoptions = 'readmissionriskno'}
  else if (savedData2[0][y].readmissionrisk == '❗️') {var readmissionriskoptions = 'readmissionriskhigh'}
  else if (savedData2[0][y].readmissionrisk == '-') {var readmissionriskoptions = 'readmissionriskunsure'}
  if (savedData2[0][y].tele == '✔️') {var teleoptions = 'teleyes'}
  else if (savedData2[0][y].tele == '❌') {var teleoptions = 'teleno'}
  else if (savedData2[0][y].tele == '-') {var teleoptions = 'teleunsure'}
  setChecked([rygoptions, dcby11options, readmissionriskoptions, teleoptions])
  setElements(["patient", "provider", "rn", "status", "admit", "target", "los", "elos", "dcplan", "barrier1", "barrier2"], y)
  document.getElementById("roomNumber").setAttribute("value", args[3]._cells[0].data);
  document.getElementById('id01').style.display = "block"
  document.getElementById("body").style.overflowY = "hidden";
  $('#id01').animate({scrollTop : 0}, 'slow');
};
function clearData() {
  clearElements(["patient", "provider", "rn", "status", "admit", "target", "los", "elos", "dcplan", "barrier1", "barrier2"]);
  clearChecked(["-", "dcby11unsure", "teleunsure", "readmissionriskunsure"]);
  document.getElementById('cleardataconfirm').style.display='none';
  $('#id01').animate({scrollTop : 0}, 'slow');
}
function setRoom(value, savedData) {
  var list1 = [String(value)];
  for (var b = 0; b<18; b++) {list1.push(savedData[0][`r${value-1}`][["patient", "provider", "rn", "status", "admit", "target", "los", "elos", "ryg", "dcby11", "dcplan", "barrier1", "barrier2", "readmissionrisk", "tele"][b]])}
  return list1
};
fetch(`./JSON/${id}.env`).then(res => res.json()).then(data => printIt(data))
let printIt = (data) => {mainData(data)}
function mainData(savedData) {
  savedData2 = savedData
  result = [];
  for(var i in savedData[0]) {
    result.push(savedData[0][i]);
  }
  for (i=1; i<result.length+1; i++) {
    listofrooms.push(setRoom(i, savedData))
  }
  const grid = new gridjs.Grid({
  columns: [{name:"Bed #", }, {name:"Patient", width:"20px"}, {name:"Provider", width:"10px"},{name:"RN", width:"10px"}, {name:"Status", width:"10px"}, {name:"Admit", width:"10px"}, {name:"Target", width:"10px"}, {name:"LOS", width:"10px"}, {name:"ELOS", width:"10px"}, {name:"R/Y/G", width:"10px"}, {name:"D/C By 11", width:"10px"}, {name:"D/C Plan", width:"10px"}, {name:"Barrier 1", width:"10px"}, {name:"Barrier 2", width:"10px"}, {name:"Readmission Risk", width:"10px"}, {name:"Tele", width:"10px"}],
  search: true,
  style: {
    table: {border: '3px solid #ccc'},
    th: {color: '#000', 'border-bottom': '3px solid #ccc', 'border': '3px solid #ccc', 'text-align': 'center'},
    td: {color: '#000', 'border-bottom': '3px solid #ccc', 'border': '3px solid #ccc', 'text-align': 'center'}},
  data: listofrooms
  });
  grid.on('cellClick', (...args) => runCell(args));
  grid.render(document.getElementById("wrapper"));
};