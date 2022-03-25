const params = new URLSearchParams(location.search);
var username = params.get('uname');
var password = params.get('password');
const Http = new XMLHttpRequest();
const url=`https://app.dc.jacebapps.com/getjson?uname=${username}&psw=${password}`;
Http.open("GET", url);
Http.send();
var savedData
Http.onreadystatechange = function() {
  if (Http.readyState == XMLHttpRequest.DONE) {
    savedData = JSON.parse(Http.responseText);
  }
}

setTimeout(main, 100);

function main() {
  document.getElementById("uname").setAttribute("value", username)
  document.getElementById("psw").setAttribute("value", password)
  document.getElementById("hName").setAttribute("value", savedData.name)
  document.getElementById("id").setAttribute("value", savedData.id)
  document.getElementById("sUsername").setAttribute("value", savedData.username)
  document.getElementById("sPassword").setAttribute("value", savedData.staffpassword)
  document.getElementById("rCount").setAttribute("value", savedData.roomcount)
  document.getElementById("ePassword").setAttribute("value", savedData.editpassword)
  if (savedData.editpasswordenabled) {
    document.getElementById("ePasswordEnabled").setAttribute("checked", savedData.editpasswordenabled)
  }
}