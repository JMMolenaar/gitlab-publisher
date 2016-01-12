var gitlab = require('gitlab')({
  url:   'http://git2.fabcloud.io',
  token: 'YmTbDyomfSWvc1LzUnk9'
});

var update_hook = function(project_id){

    gitlab.projects.hooks.list(project_id, function(data){

        console.log(data);
	    // TODO find out if we already put a webhook on this repo, and update accordingly

        if (data.length == 0){

            gitlab.projects.hooks.add(project_id, {
                "url": 'http://pages.fabcloud.io:8000/projects/update/' + project_id,
                "enable_ssl_verification": "false"
        	});

        }
    });

};


var update_all = function(){

	gitlab.projects.all(function(projects){
	 for (var i = 0; i < projects.length; i++) {
	console.log("#" + projects[i].id + ": " + projects[i].name + ", path: " + projects[i].path + ", default_branch: " + projects[i].default_branch + ", private: " + projects[i]["private"] + ", owner: " + projects[i].owner.name + " (" + projects[i].owner.email + "), date: " + projects[i].created_at);

	    var project_id = projects[i].id;
	    update_hook(project_id);
	}
	});

};

module.exports = {

	update: update_hook,
    update_all: update_all

};
