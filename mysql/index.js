var mysql = require('mysql')

var connection = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'root',
    database:'peiwan',
})
var db = connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
module.exports = connection