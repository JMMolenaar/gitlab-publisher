var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var app = req.app;
    var db  = app.locals.database;
    console.log(db);
    db.list( function(err,rows){
        res.send(rows);
    });

  //res.send(app.locals);
  //res.render('index', { title: 'GitLab Publisher' });
});

module.exports = router;
