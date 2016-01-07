var Git = require('nodegit');


var zap = function(repo){



};

var clone = function( project_id, repo, name) {

    Git.Clone(repo, "name").then(function(repository) {
        // Work with the repository object here.
        console.log("Successfully cloned repository " + repo + " into " + name);
    }).catch(function (reasonForFailure) {
        // failure is handled here
        console.log("Failed to clone repo");
    });

};







module.exports = {
    clone: clone
};