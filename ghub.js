// [ghub](https://github.com/ChrTang/ghub) 2.0.0
// (c) 2015 Christian Tang
// Freely distributable under the MIT license.

(function (root) {
    var loginName = '';
    
    var previousGhub = root.ghub;
    var ghub = {};
    ghub.VERSION = '2.0.0';
    
    ghub.init = function (loginName) {
        this.loginName = loginName;
        return this;
    }
    
    // Repositories
    // ------------
    ghub.userRepos = function (callback) {
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
    
    ghub.starredRepos = function (callback) {
        
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
    ghub.userRepo = function (repoName) {
        if (!(this instanceof ghub.userRepo)) return new ghub.userRepo(repoName);
        this.repoName  = repoName;
        this.loginName = loginName;
    };
    
    ghub.userRepo.prototype.commits = function (callback) {
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
    ghub.userRepo.prototype.releases = function (callback) {
        jsonp('https://api.github.com/repos/'+this.loginName+'/'+this.repoName+'/releases', function(result) {
                var tmp = [];
                for(i in result.data)
                    tmp.push({
                        tagName: result.data[i].tag_name,
                        name:    result.data[i].name,
                        branch:  result.data[i].target_commitish,
                        draft:   result.data[i].draft,
                        author:  { login: result.data[i].author.login, url: result.data[i].author.url },
                        url:     result.data[i].html_url,
                        
                    });
                callback(tmp);
        });
        return this;
    }
    
    // Organizations
    // -------------
    ghub.userOrgs = function (callback) {
        
        jsonp('https://api.github.com/users/'+this.loginName+'/orgs', function(result) {
            var tmp = [];
            for(i in result.data) {
                tmp.push({
                   id: result.data[i].id,
                   login: result.data[i].login
                });
			}
            callback(tmp);
        });
        return this;
    }
    
    // Organization
    // ------------
    ghub.org = function (orgLogin) {
        if (!(this instanceof ghub.org)) return new ghub.org(orgLogin);
        this.orgLogin = orgLogin;
    };
    
    ghub.org.prototype.get = function (callback) {
        jsonp('https://api.github.com/orgs/'+this.orgLogin, function(result) {
            var org = {
                id:           result.data.id,
                login:        result.data.login,
                name:         result.data.name,
                description:  result.data.description,
                blog:         result.data.blog,
                html_url:     result.data.html_url,
                public_repos: result.data.public_repos
            };
            callback(org);
        });
        return this;
    }
    
    ghub.org.prototype.members = function (callback) {
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
    
    ghub.org.prototype.repos = function (callback) {
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
    ghub.user = function (userLogin) {
        if (!(this instanceof ghub.user)) return new ghub.user(userLogin);
        this.userLogin = userLogin;
    };
    
    ghub.user.prototype.get = function (callback) {
        jsonp("https://api.github.com/users/"+this.userLogin, function(result) {
            var user = {};
            user.login = result.data.login;
            user.id = result.data.id;
            user.name = result.data.name;
            user.blog = result.data.blog;
            user.company = result.data.company;
            user.publicRepos = result.data.public_repos;
            user.publicGists = result.data.public_gists;
            callback(user);
        });
        return this;
    }
    
    
    // Gists
    // -----
    ghub.userGists = function (callback) {
        
        jsonp('https://api.github.com/users/'+this.loginName+'/gists', function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({
                    id: result.data[i].id,
                    description: result.data[i].description,
                    url: result.data[i].html_url
                });
            callback(tmp);
        });
        return this;
    }
    
    // Gist
    // ----
    ghub.gist = function (gistId) {
        if (!(this instanceof ghub.gist)) return new ghub.gist(gistId);
        this.gistId = gistId;
    };
    
    ghub.gist.prototype.files = function (callback) {
        jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
                var files = [];
                for(i in result.data.files)
                    files.push(__gistFile(result.data.files[i]));
                callback(files);
        });
        return this;
    }
    
    ghub.gist.prototype.get = function (callback) {
        jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
            var files = [];
            for(i in result.data.files) files.push(__gistFile(result.data.files[i]));
            var gist = {
                description: result.data.description,
                url: result.data.html_url,
                files: files
            };
            callback(gist);
        });
        return this;
    }
    
    // Object builders
    // ---------------
    function __repo(info) {
		var repo = {
		    id:             info.id,
    		name:           info.name,
    		fullName:       info.full_name,
            language:       info.language,
    		url:            info.url,
    		html_url:       info.html_url,
            description:    info.description,
            fork:           info.fork,
    		default_branch: info.default_branch,
    		stars:          info.stargazers_count,
    		forks:          info.forks_count,
    		homepage:       info.homepage,
    		has_pages:      info.has_pages
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
        ghub.__jsonp_callback = function(result) {
            callback(result);
        }
        var head   = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('src', url+'?callback=ghub.__jsonp_callback');
        head.appendChild(script);
        head.removeChild(script);
    }
    
    // Run ghub in *noConflict* mode, returning the `ghub` variable to its
    // previous owner.  
    // Returns a reference to `ghub`.
    ghub.noConflict = function () {
        root.ghub = previousGhub;
        return this;
    }

  // Export `ghub` for CommonJS.
  if (typeof define === 'function' && define.amd) {
    define('ghub', function () {
        return ghub;
    });
  }
  else {
    root.ghub = ghub;
  }
}(this));