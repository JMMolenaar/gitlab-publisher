var kue = require('kue');


var myqueue=  kue.createQueue();


myqueue.process("push", function(job, done){

    console.log("Received push job");
    console.log(job);
    done();


});
myqueue.process("project", function(job,done){

    console.log("Received project job");
    console.log(job);
    done();


});


module.exports = myqueue;