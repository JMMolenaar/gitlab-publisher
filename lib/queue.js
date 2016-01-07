var kue = require('kue');
var gitlab = require('./gitlab');
var database = require('./db');
var myqueue=  kue.createQueue();


myqueue.process("push", function(job, done){

    console.log("Received push job");
    console.log(job);
    done();


});
myqueue.process("project", function(job,done){

    console.log("Received project job");

    console.log("Adding project to our db");

    database.insert(job.data);

    console.log("Updating project hook");

    gitlab.update(job.data.project_id);

    //console.log(job);
    done();


});


module.exports = myqueue;