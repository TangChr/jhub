// [ghub.js](https://github.com/ChrTang/ghub) 1.0.0
// (c) 2015 Christian Tang
// Freely distributable under the MIT license.

(function (root) {
    var user = '';
    
    var previousGhub = root.ghub;
    var ghub = {};
    ghub.VERSION = '1.0.0';
    
    ghub.init = function (userName) {
        user = userName;
        return this;
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          JSONP
    ///////////////////////////////////////////////////////////////////////
    function jsonp(url, callback) {
        ghub.__jsonp_callback = function(result) {
            callback(result);
        }
        var head   = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('src', url+"?callback=ghub.__jsonp_callback");
        head.appendChild(script);
        head.removeChild(script);
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          User Repositories
    ///////////////////////////////////////////////////////////////////////
    ghub.repos = function (callback) {
        
        jsonp("https://api.github.com/users/"+user+"/repos", function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({
                    name: result.data[i].name,
                    fullName: result.data[i].full_name,
                    description: result.data[i].description,
                    url: result.data[i].url,
                    html_url: result.data[i].html_url,
                    default_branch: result.data[i].default_branch,
                    stars: result.data[i].stargazers_count,
                    forks: result.data[i].forks_count,
                    homepage: result.data[i].homepage,
                    has_pages: result.data[i].has_pages
                });
            callback(tmp);
        });
        return this;
    }
    
    ghub.starred = function (callback) {
        
        jsonp("https://api.github.com/users/"+user+"/starred", function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({
                    name: result.data[i].name,
                    fullName: result.data[i].full_name,
                    url: result.data[i].url
                });
            callback(tmp);
        });
        return this; 
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          User Repository Info
    ///////////////////////////////////////////////////////////////////////
    ghub.repo = function (name) {
        if (!(this instanceof ghub.repo)) return new ghub.repo(name);
        this.name = name;
        this.user = user;
    };
    
    ghub.repo.prototype.commits = function (callback) {
        jsonp("https://api.github.com/repos/"+this.user+"/"+this.name+"/commits", function(result) {
                var tmp = [];
                
                for(i in result.data)
                    tmp.push({
                        author: {
                            name: result.data[i].author.name,
                            email: result.data[i].author.email,
                            date: result.data[i].author.date
                        },
                        committer: {
                            name: result.data[i].committer.name,
                            email: result.data[i].committer.email,
                            date: result.data[i].committer.date
                        },
                        message: result.data[i].message
                    });
                callback(tmp);
        });
    }
    ghub.repo.prototype.releases = function (callback) {
        jsonp("https://api.github.com/repos/"+this.user+"/"+this.name+"/releases", function(result) {
                var tmp = [];
                console.log(result.data);
                for(i in result.data)
                    tmp.push({
                        tagName: result.data[i].tag_name,
                        name: result.data[i].name,
                        branch: result.data[i].target_commitish,
                        draft: result.data[i].draft,
                        author: { login: result.data[i].author.login, url: result.data[i].author.url },
                        url: result.data[i].html_url,
                        
                    });
                callback(tmp);
        });
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          Gists
    ///////////////////////////////////////////////////////////////////////
    ghub.gists = function (callback) {
        
        jsonp("https://api.github.com/users/"+user+"/gists", function(result) {
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
    
    ghub.gist = function (gistId) {
        if (!(this instanceof ghub.gist)) return new ghub.gist(gistId);
        this.gistId = gistId;
    };
    
    ghub.gist.prototype.files = function (callback) {
        jsonp("https://api.github.com/gists/"+this.gistId, function(result) {
                var tmp = [];
                for(i in result.data.files)
                    tmp.push({
                       name: result.data.files[i].filename,
                       language: result.data.files[i].language,
                       url: result.data.files[i].raw_url,
                       size: result.data.files[i].size,
                       type: result.data.files[i].type 
                    });
                callback(tmp);
        });
    }
    
    ghub.gist.prototype.get = function (callback) {
        jsonp("https://api.github.com/gists/"+this.gistId, function(result) {
                var gist = {};
                gist.description = result.data.description;
                gist.url = result.data.html_url;
                var files = [];
                for(i in result.data.files)
                    files.push({
                       name: result.data.files[i].filename,
                       language: result.data.files[i].language,
                       url: result.data.files[i].raw_url,
                       size: result.data.files[i].size,
                       type: result.data.files[i].type 
                    });
                gist.files = files;
                callback(gist);
        });
    }
    
    // Utility functions
    // -----------------
    
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