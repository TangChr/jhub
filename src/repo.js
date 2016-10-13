// Repositories
// ------------
jhub.userRepos = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/repos', function(result) {
        var tmp = [];
        for(var i in result.data) {
      		var r = __repo(result.data[i]);
          tmp.push(r);
      	}
        callback(tmp);
    });
    return this;
};

jhub.starredRepos = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/starred', function(result) {
        var tmp = [];
        for(var i in result.data) {
      		var r = __repo(result.data[i]);
          tmp.push(r);
      	}
        callback(tmp);
    });
    return this; 
};

// Repository Information
// ----------------------
jhub.userRepo = function (repoName) {
    if (!(this instanceof jhub.userRepo)) {
      return new jhub.userRepo(repoName);
    }
    this.githubUser = githubUser;
    this.repoName  = repoName;
};

jhub.userRepo = function (userName, repoName) {
    if (!(this instanceof jhub.userRepo)) {
      return new jhub.userRepo(userName, repoName);
    }
    this.githubUser = userName;
    this.repoName  = repoName;
};

jhub.userRepo.prototype.commits = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/commits', function(result) {
            var tmp = [];
            
            for(var i in result.data) {
                tmp.push({
                    author: {
                        name:  result.data[i].author.name,
                        email: result.data[i].author.email,
                        date:  result.data[i].author.date
                    },
                    committer: {
                        name:  result.data[i].committer.name,
                        email: result.data[i].committer.email,
                        date:  result.data[i].committer.date
                    },
                    message:   result.data[i].message
                });
            }
            callback(tmp);
    });
    return this;
};

jhub.userRepo.prototype.releases = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/releases', function(result) {
            var tmp = [];
            for(var i in result.data) {
                tmp.push({
                    id:         result.data[i].id,
                    tagName:    result.data[i].tag_name,
                    name:       result.data[i].name,
                    author:     { login: result.data[i].author.login, url: result.data[i].author.url },
                    branch:     result.data[i].target_commitish,
                    draft:      result.data[i].draft,
                    htmlUrl:    result.data[i].html_url,
                    zipballUrl: result.data[i].zipball_url,
                    tarballUrl: result.data[i].tarball_url,
                });
            }
            callback(tmp);
    });
    return this;
};

jhub.userRepo.prototype.tags = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/tags', function(result) {
            var tmp = [];
            for(var i in result.data) {
                tmp.push({
                    name:       result.data[i].name,
                    zipballUrl: result.data[i].zipball_url,
                    tarballUrl: result.data[i].tarball_url,
                    commit:     { sha: result.data[i].commit.sha, url: result.data[i].commit.url }
                });
            }
            callback(tmp);
    });
    return this;
};

jhub.userRepo.prototype.stargazers = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/stargazers', function(result) {
            var tmp = [];
            for(var i in result.data) {
                tmp.push({
                    id:      result.data[i].id,
                    login:   result.data[i].login,
                    htmlUrl: result.data[i].html_url,
                    type:    result.data[i].type,
                });
            }
            callback(tmp);
    });
    return this;
};