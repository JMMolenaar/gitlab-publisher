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
    if (event.event_name == 'project_created') {
        app.locals.database.insert({
            project_id: event.project_id,
            name: event.name,
            path: event.path_with_namespace,
            owner_name: event.owner_name,
            owner_email: event.owner_email,
            created_at: event.created_at

        });
    }
    res.render('index', { title: 'OK' });
});

router.post('/update/:project_id', function(req,res,next){

    var app = req.app;
    var event = req.body;
    event.project_id = req.params.project_id;
    // post an update request for this project_id
    var updateRequest= queue.create('push', event).save( function(err){
        if( !err ) console.log( updateRequest.id );
    });

    //app.locals.queue.push(event);
    res.render('index', { title: 'OK' });
});

module.exports = router;
