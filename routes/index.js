var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

const sql = require('../utils/sql');

router.get('/', function(req, res, next) {

  console.log('sent back a static file');
  res.sendFile((path.join(__dirname, "../views/index.html")));
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'vcollier09@gmail.com',
         pass: 'Ashby123'
     }
 });

 const mailOptions = {
  from: 'sender@email.com', // sender address
  to: 'to@email.com', // list of receivers
  subject: 'Subject of your email', // Subject line
  html: '<p>Your html here</p>'// plain text body
};

transporter.sendMail(mailOptions, function (err, info) {
  if(err)
    console.log(err)
  else
    console.log(info);
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
