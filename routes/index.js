var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var app = req.app;
  res.send(app.locals);
  //res.render('index', { title: 'GitLab Publisher' });
});

module.exports = router;
