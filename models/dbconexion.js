var mysql = require('mysql');
var conn = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"tienda"
});
conn.connect();
module.exports = conn;

