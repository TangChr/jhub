var jhub = require('./jhub.js');

jhub.init('TangChr');
jhub.userRepos(function(repos) {
	for (var r in repos) {
	   console.log(repos[r].name);
	}
});

var repo = jhub.userRepo('jhub');
repo.commits(function(commits) {
    for(var c in commits) {
        console.log(commits[c].author);
        console.log(commits[c].comitter);
        console.log(commits[c].message);
    }
});

jhub.userGists(function(gists) {
    for(var g in gists) {
        console.log(gists[g].description);
    }
});