function createAccount() {
  username = document.getElementById('uname').value
  password = document.getElementById('psw').value
  fs.readFile(`JSON/accounts.json`, (err, data) => {if (err) throw err;
    var jsondata = JSON.parse(data);
    jsondata[0][username].password = password
    jsondata[0][username].id = Math.random().toString(36).slice(2);
    fs.writeFile(`JSON/accounts.json`, JSON.stringify(jsondata), (err) => {if (err) throw err;});
}