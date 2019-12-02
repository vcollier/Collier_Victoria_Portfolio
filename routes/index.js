var express = require('express');
var router = express.Router();
var path = require('path');

const sql = require('../utils/sql');

router.get('/', function(req, res, next) {

  console.log('sent back a static file');
  res.sendFile((path.join(__dirname, "../views/index.html")));
});

router.get('/svgdata/:target', (req, res) => {

  let query = `SELECT * FROM tbl_projects WHERE id="${req.params.target}"`;

  sql.query(query, (err, result) => {
    if (err) { console.log(err); }

    console.log(result);

    res.json(result[0]);
  })
})

module.exports = router;
