var jhub = require('./jhub.js');

jhub.init('TangChr');
jhub.userRepos(function(repos) {
	for (var r = 0; r < repos.length; r++) {
	   console.log(repos[r].name);
	}
});

var repo = jhub.userRepo('jhub');
repo.commits(function(commits) {
    for(var c = 0; c < commits.length; c++) {
        console.log(commits[c].author);
        console.log(commits[c].comitter);
        console.log(commits[c].message);
    }
});

jhub.userOrgs(function(orgs) {
    for(var o = 0; o < orgs.length; o++) {
        var org = jhub.org(orgs[o].login);
        org.get(function(info) {
            console.log(info.login+': '+info.name);
        });
    }
});

jhub.userGists(function(gists) {
    for(var g = 0; g < gists.length; g++) {
        var gist = jhub.gist(gists[g].id);
        gist.get(function(info) {
            console.log('Gist: '+info.description);
                for(var f = 0; f < info.files.length; f++)
                    console.log('- '+info.files[f].name);
        });
    }
});