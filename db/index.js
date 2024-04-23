const mysql = require('mysql'); 
require('dotenv').config(); 

const pool = mysql.createPool({
  password: process.env.VUE_APP_DB_PASSWORD,
  user: process.env.VUE_APP_DB_USER,
  database: process.env.VUE_APP_DB_BASE_DATABASE, 
  host: process.env.VUE_APP_DB_HOST,
  port: process.env.VUE_APP_DB_PORT
});

let comicDb = {}; 

comicDb.all = () => {
  return new Promise((resolve,reject) => 
  {
    pool.query(`SELECT id FROM episode`, (err, results) => 
    {
      if(err)
      { return reject(err);}
      return resolve(results); 
    })
  });
};

comicDb.one = (id) => {
  return new Promise((resolve, reject) => 
  {
    pool.query(`SELECT * FROM episode where id = ?`, [id], (err, results) => 
    {
      if(err)
      { return reject(err); }
      return resolve(results[0]); 
    })
  }); 
};

comicDb.some = (id) => {
  return new Promise((resolve, reject) => 
  {
    pool.query(`SELECT * FROM episodePage WHERE episodeId = ?`, [id], (err, results) =>
    {
      if(err)
      { return reject(err); }
      return resolve(results); 
    })
  }); 
};

// get latest episode 
comicDb.latest = () => {
  return new Promise((resolve,reject) => 
  {
    pool.query(`SELECT * FROM episode WHERE episodeId = 3`, (err, results) => 
    {
      if(err)
      { return reject(err); }
      return resolve(results); 
    })
  });
};

module.exports = comicDb