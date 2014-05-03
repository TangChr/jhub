/*!
 * github-api v1.0 (https://github.com/ChrTang/github-api)
 * Copyright 2014 Christian Tang
 * Licensed under MIT (https://github.com/ChrTang/github-api/master/LICENSE)
 */
 
(function (root) {
    var user = '';
    
    var previousGithub = root.github;
    var github = {};
    github.VERSION = '1.0';
    
    github.init = function (userName) {
        user = userName;
        return this;
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          JSONP
    ///////////////////////////////////////////////////////////////////////
    function jsonp(url, callback) {
        github.__jsonp_callback = function(result) {
            callback(result);
        }
        var head   = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('src', url+"?callback=github.__jsonp_callback");
        head.appendChild(script);
        head.removeChild(script);
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          User Repositories
    ///////////////////////////////////////////////////////////////////////
    github.repos = function (callback) {
        
        jsonp("https://api.github.com/users/"+user+"/repos", function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({ name: result.data[i].name, fullName: result.data[i].full_name, url: result.data[i].url });
            callback(tmp);
        });
        return this;
    }
    
    github.starred = function (callback) {
        
        jsonp("https://api.github.com/users/"+user+"/starred", function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({ name: result.data[i].name, fullName: result.data[i].full_name, url: result.data[i].url });
            callback(tmp);
        });
        return this; 
    }
    
    ///////////////////////////////////////////////////////////////////////
    //                          User Repository Info
    ///////////////////////////////////////////////////////////////////////
    github.repo = function (name) {
        if (!(this instanceof github.repo)) return new github.repo(name);
        this.name = name;
        this.user = user;
    };
    
    github.repo.prototype.commits = function (callback) {
        jsonp("https://api.github.com/repos/"+this.user+"/"+this.name+"/commits", function(result) {
                var tmp = [];
                
                for(i in result.data)
                    tmp.push({
                        author: { name: result.data[i].author.name, email: result.data[i].author.email, date: result.data[i].author.date },
                        committer: { name: result.data[i].committer.name, email: result.data[i].committer.email, date: result.data[i].committer.date },
                        message: result.data[i].message
                    });
                callback(tmp);
        });
    }
    github.repo.prototype.releases = function (callback) {
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
    github.gists = function (callback) {
        
        jsonp("https://api.github.com/users/"+user+"/gists", function(result) {
            var tmp = [];
            for(i in result.data)
                tmp.push({
                    id: result.data[i].id,
                    description: result.data[i].description,
                    url: result.data[i].url 
                    });
            callback(tmp);
        });
        return this;
    }
    
    github.gist = function (gistId) {
        if (!(this instanceof github.gist)) return new github.gist(gistId);
        this.gistId = gistId;
    };
    
    github.gist.prototype.files = function (callback) {
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
    
    // Utility functions
    // -----------------
    
    // Run github.js in *noConflict* mode, returning the `github` variable to its
  // previous owner.  
  // Returns a reference to `github`.
    github.noConflict = function () {
        root.github = previousGithub;
        return this;
    }

  // Export `github` for CommonJS.
  if (typeof define === 'function' && define.amd) {
    define('github', function () {
        return github;
    });
  }
  else {
    root.github = github;
  }
}(this));