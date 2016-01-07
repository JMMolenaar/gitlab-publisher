var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    var app = req.app;
    var event = req.body;
    console.log(event.event_name + ' event received.');
    /** { event_name: 'project_create',
      path: 'ruby',
      name: 'Ruby',
      project_id: 1,
      owner_email: 'example@gitlabhq.com' }
      owner_name: 'Someone'} **/
    app.locals.queue.push(event);
    res.render('index', { title: 'OK' });
});

router.post('/update/:project_id', function(req,res,next){

    var app = req.app;
    var event = req.body;
    event.project_id = req.params.project_id;
    app.locals.queue.push(event);
    res.render('index', { title: 'OK' });
});

module.exports = router;
