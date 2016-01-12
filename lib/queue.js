var kue = require('kue');
var gitlab = require('./gitlab');
var database = require('./db');
var myqueue=  kue.createQueue();
var repocloner = require('./repocloner');
var path = require("path");
var fs=require("fs");
var regexp = require('node-regexp');

myqueue.process("push", function(job, done){

    console.log("Received push job");
    //console.log(job);
    var data = job.data;
    var project_id = data.project_id;
    var repo = job.data.repository.git_http_url;
    var name = job.data.repository.name;


    var generator=function( project_id, repo, name){
        var repo_path = repocloner.repository(project_id,name);
        var build_file  = name + './BUILD.txt';

        try {
            fs.accessSync(build_file, fs.F_OK);
            // Do something
            var contents = fs.readFileSync(build_file, 'utf8');

            if (contents.startsWith('jekyll') )){

                return generators.jekyll;

            } else if (contents.startsWith('gitbook')) {
                return generators.gitbook;

            } else {
                return generators.filecopy;
            }
        } catch (e) {
            // It isn't accessible
            return null;
        }
    };


    repocloner.clone_or_pull(project_id, repo, name, function (err) {
    	if (err) console.log('Failed ' + err);

        // Check if we need to start a generator
        // Or start the standard copy

        // myqueue..create('generator', name).save( function(err){
            // if( !err ) console.log( updateRequest.id );
        // });
        done(err);

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


myqueue.process("generator", function(job, done){


});


module.exports = myqueue;
