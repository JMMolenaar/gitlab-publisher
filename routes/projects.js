var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var event_type = req.body.event_name;
    console.log(event_type + ' event received.');
    res.render('index', { title: 'Express' });
});

module.exports = router;
