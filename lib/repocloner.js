var git = require('simple-git')(__dirname + '/repositories');
var fs = require('fs');


var clone = function (project_id, repo, name, cb) {

    git.clone(repo, name, function (err) {
        // Work with the repository object here.
        console.log("Successfully cloned repository " + repo + " into " + name);
        cb(err);
    });
};


var _repoPath = function (name) {
    return __dirname + '/repositories/' + name;
};

var check_repository = function (project_id, repo, name) {

    try {
        // Query the entry
        stats = fs.lstatSync(_repoPath(name));

        // Is it a directory?
        if (stats.isDirectory()) {
            // Yes it is
            return true;
        }
    }
    catch (e) {
        // ...
    }

    return false;
};


var pull = function (project_id, repo, name) {

    var mygit = require('simple-git')(_repoPath(name));
    mygit.pull('origin', 'master', function (err, update) {
        cb(err, update);
    });

};

var clone_or_pull = function (project_id, repo, name, cb) {
    if (check_repository(project_id, repo, name)) {
        pull(project_id, repo, name, cb);
    } else {
        clone(project_id, repo, name, cb);
    }
};


module.exports = {
    clone: clone,
    check: check_repository,
    pull: pull,
    clone_or_pull: clone_or_pull
};