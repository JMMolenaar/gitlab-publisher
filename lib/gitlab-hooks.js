var gitlab = require('gitlab')({
  url:   'http://git2.fabcloud.io',
  token: 'YmTbDyomfSWvc1LzUnk9'
});




gitlab.projects.all(function(projects){
 for (var i = 0; i < projects.length; i++) {
    //console.log("#" + projects[i].id + ": " + projects[i].name + ", path: " + projects[i].path + ", default_branch: " + projects[i].default_branch + ", private: " + projects[i]["private"] + ", owner: " + projects[i].owner.name + " (" + projects[i].owner.email + "), date: " + projects[i].created_at);
  }

    var project = projects[0];

    gitlab.projects.hooks.list(project.id, function(data){

        console.log(data);

        if (data.length == 0){

            gitlab.projects.hooks.add(project.id, 'http://gitlab-publisher.herokuapp.com/projects/update/' + project.id);

        }
    });


});



