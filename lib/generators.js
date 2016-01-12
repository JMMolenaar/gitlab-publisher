var generators = {};

generators AbstractGenerator = function(){

    return {
        generate: function(source, dest){
            console.log('nop')
        }
    };
};


generators.JekyllGenerator = function(){

    return {
        generate: function(source,dest){

            // Delete workingDir
            rmdir(dest, function() {
                // jekyll build --safe --source .tmp/Glavin001/gitlab-pages-example/ --destination pages/Glavin001/gitlab-pages-example
                var cmd = "jekyll build --safe --source \""+source+"\" --destination \""+dest+"\"";
                exec(cmd, function (error, stdout, stderr) {
                    debug(error, stdout, stderr);
                    // output is in stdout
                    debug('Done deploying ' + source + ' using jekyll');
                });
            });

    };

};


generators.GitBookGenerator = function(source, dest){

    return {
        generate: function(source,dest){

            // Delete workingDir
            rmdir(dest, function() {
                // jekyll build --safe --source .tmp/Glavin001/gitlab-pages-example/ --destination pages/Glavin001/gitlab-pages-example
                var cmd = "gitbook build \""+source+"\" \""+dest+"\"";
                exec(cmd, function (error, stdout, stderr) {
                    debug(error, stdout, stderr);
                    // output is in stdout
                    debug('Done deploying ' + source + ' using gitbook');
                });
            });

        };

};


generators.GruntGenerator = function(source,dest){


};

generators.FileCopy = function(source,dest) {

};


module.exports = {
    'jekyll' : generators.JekyllGenerator,
    'gitbook' : generators.GitBookGenerator,
    'filecopy' : generators.FileCopy
};