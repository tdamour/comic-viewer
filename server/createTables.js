let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createPracticeComicDb = `create table if not exists comic(
                          id int primary key auto_increment,
                          title varchar(255)not null
                      )`;

  connection.query(createPracticeComicDb, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});