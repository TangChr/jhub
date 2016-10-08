/**
 * jhub - JavaScript bindings for the GitHub API
 * @version 2.3.4
 * @link http://willitcompile.net/projects/jhub
 * @license MIT
 */
(function () {
var githubUser = '';
var jhub = {};

jhub.init = function (githubUser) {
    this.githubUser = githubUser;
    return this;
};
// JSONP
// ----
function jsonp(url, callback) {
    jhub.__jsonp_callback = function(result) {
        callback(result);
    };
    var head   = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('src', url+'?callback=jhub.__jsonp_callback');
    head.appendChild(script);
    head.removeChild(script);
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
        gitUrl:        info.git_url,
        sshUrl:        info.ssh_url,
        cloneUrl:      info.clone_url,
        created:       info.created_at,
        updated:       info.updated_at,
        pushedAt:      info.pushed_at,
        description:   info.description,
        fork:          info.fork,
        defaultBranch: info.default_branch,
        stars:         info.stargazers_count,
        forks:         info.forks_count,
        homepage:      info.homepage,
        hasPages:      info.has_pages,
        owner:         { id: info.owner.id, login: info.owner.login, htmlUrl: info.owner.html_url }
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
    };
    return file;
}
// Gists
// -----
jhub.userGists = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/gists', function(result) {
        var tmp = [];
        for(var i in result.data)
            tmp.push({
                id:          result.data[i].id,
                description: result.data[i].description,
                url:         result.data[i].html_url
            });
        callback(tmp);
    });
    return this;
};

// Gist Information
// ----------------
jhub.gist = function (gistId) {
    if (!(this instanceof jhub.gist)) return new jhub.gist(gistId);
    this.gistId = gistId;
};

jhub.gist.prototype.files = function (callback) {
    jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
            var files = [];
            for(var i in result.data.files)
                files.push(__gistFile(result.data.files[i]));
            callback(files);
    });
    return this;
};

jhub.gist.prototype.get = function (callback) {
    jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
        var files = [];
        for(var i in result.data.files) files.push(__gistFile(result.data.files[i]));
        var gist = {
            id:          result.data.id,
            description: result.data.description,
            url:         result.data.html_url,
            pullUrl:     result.data.git_pull_url,
            pushUrl:     result.data.git_push_url,
            files:       files
        };
        callback(gist);
    });
    return this;
};
// Organizations
// -------------
jhub.userOrgs = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/orgs', function(result) {
        var tmp = [];
        for(var i in result.data) {
            tmp.push({
               id:    result.data[i].id,
               login: result.data[i].login
            });
  }
        callback(tmp);
    });
    return this;
};

// Organization Information
// ------------------------
jhub.org = function (orgName) {
    if (!(this instanceof jhub.org)) return new jhub.org(orgName);
    this.orgName = orgName;
};

jhub.org.prototype.get = function (callback) {
    jsonp('https://api.github.com/orgs/'+this.orgLogin, function(result) {
        var org = {
            id:          result.data.id,
            login:       result.data.login,
            name:        result.data.name,
            description: result.data.description,
            blog:        result.data.blog,
            htmlUrl:     result.data.html_url,
            publicRepos: result.data.public_repos
        };
        callback(org);
    });
    return this;
};

jhub.org.prototype.members = function (callback) {
    jsonp('https://api.github.com/orgs/'+this.orgName+'/public_members', function(result) {
        var tmp = [];
        for(var i in result.data)
        {
            tmp.push({ login: result.data[i].login});
        }
        callback(tmp);
    });
    return this;
};

jhub.org.prototype.repos = function (callback) {
    jsonp("https://api.github.com/orgs/"+this.orgName+"/repos", function(result) {
        var tmp = [];
        for(var i in result.data)
        {
            var r = __repo(result.data[i]);
            tmp.push(r);
        }
        callback(tmp);
    });
    return this;
};
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
    if (!(this instanceof jhub.userRepo)) return new jhub.userRepo(repoName);
    this.githubUser = githubUser;
    this.repoName  = repoName;
};

jhub.userRepo = function (userName, repoName) {
    if (!(this instanceof jhub.userRepo)) return new jhub.userRepo(userName, repoName);
    this.githubUser = userName;
    this.repoName  = repoName;
};

jhub.userRepo.prototype.commits = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/commits', function(result) {
            var tmp = [];
            
            for(var i in result.data)
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
};

jhub.userRepo.prototype.releases = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/releases', function(result) {
            var tmp = [];
            for(var i in result.data)
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
            callback(tmp);
    });
    return this;
};

jhub.userRepo.prototype.tags = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/tags', function(result) {
            var tmp = [];
            for(var i in result.data)
                tmp.push({
                    name:       result.data[i].name,
                    zipballUrl: result.data[i].zipball_url,
                    tarballUrl: result.data[i].tarball_url,
                    commit:     { sha: result.data[i].commit.sha, url: result.data[i].commit.url }
                });
            callback(tmp);
    });
    return this;
};

jhub.userRepo.prototype.stargazers = function (callback) {
    jsonp('https://api.github.com/repos/'+this.githubUser+'/'+this.repoName+'/stargazers', function(result) {
            var tmp = [];
            for(var i in result.data)
                tmp.push({
                    id:      result.data[i].id,
                    login:   result.data[i].login,
                    htmlUrl: result.data[i].html_url,
                    type:    result.data[i].type,
                });
            callback(tmp);
    });
    return this;
};
// User Information
// ----------------
jhub.user = function (name) {
    if (!(this instanceof jhub.user)) return new jhub.user(name);
    this.name = name;
};

jhub.user.prototype.get = function (callback) {
    jsonp("https://api.github.com/users/"+this.name, function(result) {
        var user = {
            id:          result.data.id,
            login:       result.data.login,
            name:        result.data.name,
            company:     result.data.company,
            blog:        result.data.blog,
            location:    result.data.location,
            bio:         result.data.bio,
            publicRepos: result.data.public_repos,
            publicGists: result.data.public_gists,
            followers:   result.data.followers,
            following:   result.data.following
        };
        callback(user);
    });
    return this;
};
// node.js
// -------
if("undefined" != typeof exports)
  module.exports = jhub;
else
  window.jhub = jhub;
})();