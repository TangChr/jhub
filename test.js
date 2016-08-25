require('jhub.js');

jhub.init('TangChr');
jhub.userGists(function(gists) {
	var gList = '';
	for (var g = 0; g < gists.length; g++) {
	   console.log(gists[g].description);
	}
});