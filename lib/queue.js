var kue = require('kue');
var gitlab = require('./gitlab');
var database = require('./db');
var myqueue=  kue.createQueue();
var repocloner = require('./repocloner');
var path = require("path");


myqueue.process("push", function(job, done){

    console.log("Received push job");
    //console.log(job);

    var project_id = data.project_id;
    var repo = job.data.repository.git_http_url;
    var name = job.data.repository.name;

    var destname = path.resolve('./repository/' + name);

    repocloner.clone(project_id, repo, destname, function(){

        done();

    });


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