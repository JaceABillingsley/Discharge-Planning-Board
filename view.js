var savedData;
var listofrooms = [];
var listvar = ["patient", "provider", "rn", "status", "admit", "target", "los", "elos", "ryg", "dcby11", "dcplan", "barrier1", "barrier2", "readmissionrisk", "tele"];
const params = new URLSearchParams(location.search);
var id = params.get('id')
function toEdit() {
  window.location.replace(`https://app.dc.jacebapps.com/edit?id=${id}`);
}

function setRoom(value, savedData) {
  var list1 = [String(value)];
  for (var b = 0; b<18; b++) {
    list1.push(savedData[0][`r${value-1}`][listvar[b]])
  }
  return(list1)
};

fetch(`./JSON/${id}.json`).then(res => res.json()).then(data => printIt(data))
let printIt = (data) => {mainData(data)}
function mainData(savedData) {
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
  })
  grid.render(document.getElementById("wrapper"));
};