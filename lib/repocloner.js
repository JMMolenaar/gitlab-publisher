var repo_path = __dirname + '/../repositories';
var fs = require('fs');

//git.customBinary('/usr/bin/git');

var clone = function (project_id, repo, name,  cb) {
    var git = require('simple-git')(repo_path);
    console.log('cloning repository '+ repo + ' to ' + name);
    try {
    git.silent(false);
    git.clone(repo, project_id , function (err) {
        // Work with the repository object here.
        console.log("Successfully cloned repository " + repo + " into " + name);
        cb(err);
    });
    } catch (e) {
	console.log("Failed to clone repository : " + e);
    }
};


var _repoPath = function (project_id, name) {
    return repo_path  + '/' + project_id ;
};

var check_repository = function (project_id, repo, name) {
    console.log('Checking ' + _repoPath(project_id, name)); 
    try {
        // Query the entry
        stats = fs.lstatSync(_repoPath(project_id ,name));

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


var pull = function (project_id, repo, name,cb) {
   console.log('Pulling ' + repo + ' into ' + name);
   try {
    var mygit = require('simple-git')(_repoPath(project_id, name));
    //mygit.customBinary('/usr/bin/git');
    mygit.pull('origin', 'master', function (err, update) {
        console.log('Pulled ' + repo + ' into ' + name);
        cb(err, update);
    });
	} catch (e) {
		console.log('Failed to pull repository: ' + e);
	}

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
    clone_or_pull: clone_or_pull,
    repository: _repoPath
};
