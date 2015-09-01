// [jhub](https://github.com/TangChr/jhub) 2.1.0
// (c) 2015 Christian Tang
// Freely distributable under the MIT license.

(function (root) {
    var loginName = '';
    
    var previous = root.jhub;
    var jhub = {};
    jhub.VERSION = '2.1.0';
    
    jhub.init = function (loginName) {
        this.loginName = loginName;
        return this;
    }
    
    // Repositories
    // ------------
    jhub.userRepos = function (callback) {
        jsonp('https://api.github.com/users/'+this.loginName+'/repos', function(result) {
            var tmp = [];
            for(i in result.data) {
				var r = __repo(result.data[i]);
                tmp.push(r);
			}
            callback(tmp);
        });
        return this;
    }
    
    jhub.starredRepos = function (callback) {
        
        jsonp('https://api.github.com/users/'+this.loginName+'/starred', function(result) {
            var tmp = [];
            for(i in result.data) {
				var r = __repo(result.data[i]);
                tmp.push(r);
			}
            callback(tmp);
        });
        return this; 
    }
    
    // Repository
    // ----------
    jhub.userRepo = function (repoName) {
        if (!(this instanceof jhub.userRepo)) return new jhub.userRepo(repoName);
        this.loginName = loginName;
        this.repoName  = repoName;
    };
    
    jhub.userRepo = function (userName, repoName) {
        if (!(this instanceof jhub.userRepo)) return new jhub.userRepo(userName, repoName);
        this.loginName = userName;
        this.repoName  = repoName;
    };
    
    jhub.userRepo.prototype.commits = function (callback) {
        jsonp('https://api.github.com/repos/'+this.loginName+'/'+this.repoName+'/commits', function(result) {
                var tmp = [];
                
                for(i in result.data)
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
                callback(tmp);
        });
        return this;
    }
    jhub.userRepo.prototype.releases = function (callback) {
        jsonp('https://api.github.com/repos/'+this.loginName+'/'+this.repoName+'/releases', function(result) {
                var tmp = [];
                for(i in result.data)
                    tmp.push({
                        id:         result.data[i].id,
                        tagName:    result.data[i].tag_name,
                        name:       result.data[i].name,
                        author:     { login: result.data[i].author.login, url: result.data[i].author.url },
                        branch:     result.data[i].target_commitish,
                        draft:      result.data[i].draft,
                        url:        result.data[i].html_url,
                        zipballUrl: result.data[i].zipball_url,
                        tarballUrl: result.data[i].tarball_url,
                    });
                callback(tmp);
        });
        return this;
    }
    
    jhub.userRepo.prototype.tags = function (callback) {
        jsonp('https://api.github.com/repos/'+this.loginName+'/'+this.repoName+'/tags', function(result) {
                var tmp = [];
                for(i in result.data)
                    tmp.push({
                        name:       result.data[i].name,
                        zipballUrl: result.data[i].zipball_url,
                        tarballUrl: result.data[i].tarball_url,
                                    commit: {
                                        sha: result.data[i].commit.sha,
                                        url: result.data[i].commit.url
                        }
                    });
                callback(tmp);
        });
        return this;
    }
    
    jhub.userRepo.prototype.stargazers = function (callback) {
        jsonp('https://api.github.com/repos/'+this.loginName+'/'+this.repoName+'/stargazers', function(result) {
                var tmp = [];
                for(i in result.data)
                    tmp.push({
                        id:      result.data[i].id,
                        login:   result.data[i].login,
                        htmlUrl: result.data[i].html_url,
                        type:    result.data[i].type,
                    });
                callback(tmp);
        });
        return this;
    }
    
    // Organizations
    // -------------
    jhub.userOrgs = function (callback) {
        
        jsonp('https://api.github.com/users/'+this.loginName+'/orgs', function(result) {
            var tmp = [];
            for(i in result.data) {
                tmp.push({
                   id:    result.data[i].id,
                   login: result.data[i].login
                });
			}
            callback(tmp);
        });
        return this;
    }
    
    // Organization
    // ------------
    jhub.org = function (orgLogin) {
        if (!(this instanceof jhub.org)) return new jhub.org(orgLogin);
        this.orgLogin = orgLogin;
    };
    
    jhub.org.prototype.get = function (callback) {
        jsonp('https://api.github.com/orgs/'+this.orgLogin, function(result) {
            var org = {
                id:           result.data.id,
                login:        result.data.login,
                name:         result.data.name,
                description:  result.data.description,
                blog:         result.data.blog,
                htmlUrl:     result.data.html_url,
                publicRepos: result.data.public_repos
            };
            callback(org);
        });
        return this;
    }
    
    jhub.org.prototype.members = function (callback) {
        jsonp('https://api.github.com/orgs/'+this.orgLogin+'/public_members', function(result) {
            var tmp = [];
            for(i in result.data)
            {
                tmp.push({ login: result.data[i].login});
            }
            callback(tmp);
        });
        return this;
    }
    
    jhub.org.prototype.repos = function (callback) {
        jsonp("https://api.github.com/orgs/"+this.orgLogin+"/repos", function(result) {
            var tmp = []
            for(i in result.data)
            {
                var r = __repo(result.data[i]);
                tmp.push(r);
            }
            callback(tmp);
        });
        return this;
    }
    
    // User
    // ----
    jhub.user = function (userLogin) {
        if (!(this instanceof jhub.user)) return new jhub.user(userLogin);
        this.userLogin = userLogin;
    };
    
    jhub.user.prototype.get = function (callback) {
        jsonp("https://api.github.com/users/"+this.userLogin, function(result) {
            var user = {
                id:          result.data.id,
                login:       result.data.login,
                name:        result.data.name,
                blog:        result.data.blog,
                company:     result.data.company,
                publicRepos: result.data.public_repos,
                publicGists: result.data.public_gists,
                type:        result.data.type
            };
            callback(user);
        });
        return this;
    }
    
    
    // Gists
    // -----
    jhub.userGists = function (callback) {
        
        jsonp('https://api.github.com/users/'+this.loginName+'/gists', function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({
                    id:          result.data[i].id,
                    description: result.data[i].description,
                    url:         result.data[i].html_url
                });
            callback(tmp);
        });
        return this;
    }
    
    // Gist
    // ----
    jhub.gist = function (gistId) {
        if (!(this instanceof jhub.gist)) return new jhub.gist(gistId);
        this.gistId = gistId;
    };
    
    jhub.gist.prototype.files = function (callback) {
        jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
                var files = [];
                for(i in result.data.files)
                    files.push(__gistFile(result.data.files[i]));
                callback(files);
        });
        return this;
    }
    
    jhub.gist.prototype.get = function (callback) {
        jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
            var files = [];
            for(i in result.data.files) files.push(__gistFile(result.data.files[i]));
            var gist = {
                description: result.data.description,
                url:         result.data.html_url,
                files:       files
            };
            callback(gist);
        });
        return this;
    }
    
    // Object builders
    // ---------------
    function __repo(info) {
		var repo = {
		    id:            info.id,
    		name:          info.name,
    		fullName:      info.full_name,
            language:      info.language,
    		url:           info.url,
    		htmlUrl:       info.html_url,
            description:   info.description,
            fork:          info.fork,
    		defaultBranch: info.default_branch,
    		stars:         info.stargazers_count,
    		forks:         info.forks_count,
    		homepage:      info.homepage,
    		hasHages:      info.has_pages
		};
		return repo;
	}
    
    function __gistFile(info) {
        var file = {
            name:     info.filename,
            language: info.language,
            url:      info.raw_url,
            size:     info.size,
            type:     info.type
        }
        return file;
    }
    
    // Utility functions
    // -----------------
    function jsonp(url, callback) {
        jhub.__jsonp_callback = function(result) {
            callback(result);
        }
        var head   = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('src', url+'?callback=jhub.__jsonp_callback');
        head.appendChild(script);
        head.removeChild(script);
    }
    
    // Run jhub in *noConflict* mode, returning the `jhub` variable to its
    // previous owner.  
    // Returns a reference to `jhub`.
    jhub.noConflict = function () {
        root.jhub = previous;
        return this;
    }

  // Export `jhub` for CommonJS.
  if (typeof define === 'function' && define.amd) {
    define('jhub', function () {
        return jhub;
    });
  }
  else {
    root.jhub = jhub;
  }
}(this));