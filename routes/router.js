const sql = require("../db");
const express = require("express");
const router = express.Router();


// return all comic 
router.get("/api/comic/", async (req, res, next) => {
  sql.query("SELECT id FROM episode", function (err, data, fields) {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
 });


// return a specific episode 
 router.get("/api/comic/episode/:id", async(req, res) => {

  sql.query(
    "SELECT * FROM episode where id = ?",
    [req.params.id],
    function (err, data, fields) {

      // console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
     
    }
  );
 });

// return all pages from episode 
router.get("/api/comic/episode/pages/:id", async(req, res) => {

  sql.query(
    "SELECT * FROM episodePage WHERE episodeId = ?",
    [req.params.id],
    function (err, data, fields) {

      // console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
     
    }
  );
 });

// return latest episode 
router.get("/api/comic/episode/latest", async(req, res) => {

  sql.query(
    "SELECT * FROM episode ORDER BY issueId DESC LIMIT 1",
    function (err, data, fields) {

      // console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });

    }
  );
 });


 module.exports = router; 