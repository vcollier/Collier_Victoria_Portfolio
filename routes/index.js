var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require('../config/mailcreds');
var mailer = require('nodemailer');

const sql = require('../utils/sql');

router.get('/', function(req, res, next) {

  console.log('sent back a static file');
  res.sendFile((path.join(__dirname, "../views/index.html")));
});

const transporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: auth.user,
		pass: auth.pass
	}
});

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/mail', (req, res) => {
	console.log('hit mail route');
	console.log('body: ', req.body);

const mailOptions = {
  from: req.body.usermail,
  to: auth.user,
  replyTo: req.body.usermail,
  subject: `From portfolio site: Subject = ${req.body.subject || 'none'}`,
  text: req.body.message
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log("failed... ", err);
    res.json(err);
  } else {
    console.log("success! ", info);
    res.json(info);
  }
});
})

router.get('/svgdata/:target', (req, res) => {

  let query = `SELECT * FROM tbl_projects WHERE id="${req.params.target}"`;

  sql.query(query, (err, result) => {
    if (err) { console.log(err); }

    console.log(result);

    res.json(result[0]);
  })
})

module.exports = router;
