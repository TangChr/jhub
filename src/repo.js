// Repositories
// ------------
jhub.repos = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/repos', function(result) {
        var repos = [];
        for(var i in result.data) {
            var r = __repo(result.data[i]);
            repos.push(r);
        }
        callback(repos);
    });
    return this;
};

jhub.starredRepos = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/starred', function(result) {
        var repos = [];
        for(var i in result.data) {
            var r = __repo(result.data[i]);
            repos.push(r);
        }
        callback(repos);
    });
    return this;
};

// Repository Information
// ----------------------
jhub.repo = function (repoName) {
    if (!(this instanceof jhub.repo)) {
      return new jhub.repo(repoName);
    }
    this.githubUser = githubUser;
    this.repoName  = repoName;
};

jhub.repo = function (userName, repoName) {
    if (!(this instanceof jhub.repo)) {
      return new jhub.repo(userName, repoName);
    }
    this.githubUser = userName;
    this.repoName  = repoName;
};

jhub.repo.prototype.commits = function (callback) {
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
                    message: result.data[i].message
                });
            }
            callback(tmp);
    });
    return this;
};

jhub.repo.prototype.releases = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/releases', function(result) {
            var releases = [];
            for(var i in result.data) {
                var release = {
                    id: result.data[i].id,
                    tagName: result.data[i].tag_name,
                    name: result.data[i].name,
                    author: {
                        login: result.data[i].author.login,
                        url: result.data[i].author.url
                    },
                    branch: result.data[i].target_commitish,
                    draft: result.data[i].draft,
                    htmlUrl: result.data[i].html_url,
                    zipballUrl: result.data[i].zipball_url,
                    tarballUrl: result.data[i].tarball_url,
                };
                releases.push(release);
            }
            callback(releases);
    });
    return this;
};

jhub.repo.prototype.tags = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/tags', function(result) {
        var tags = [];
        for(var i in result.data) {
            var tag = {
                name: result.data[i].name,
                zipballUrl: result.data[i].zipball_url,
                tarballUrl: result.data[i].tarball_url,
                commit: {
                    sha: result.data[i].commit.sha,
                    url: result.data[i].commit.url
                }
            };
            tags.push(tag);
        }
        callback(tags);
    });
    return this;
};

jhub.repo.prototype.stargazers = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/stargazers', function(result) {
            var users = [];
            for(var i in result.data) {
                var user = {
                    id: result.data[i].id,
                    login: result.data[i].login,
                    htmlUrl: result.data[i].html_url,
                    type: result.data[i].type,
                };
                users.push(user);
            }
            callback(users);
    });
    return this;
};