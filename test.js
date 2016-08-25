require('jhub.js');

jhub.init('TangChr');
jhub.userRepos(function(repos) {
	for (var r = 0; r < repos.length; r++) {
	   console.log(repos[r].name);
	}
});