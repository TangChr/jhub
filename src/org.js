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
    if (!(this instanceof jhub.org)) {
      return new jhub.org(orgName);
    }
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
        for(var i in result.data) {
            tmp.push({ login: result.data[i].login});
        }
        callback(tmp);
    });
    return this;
};

jhub.org.prototype.repos = function (callback) {
    jsonp('https://api.github.com/orgs/'+this.orgName+'/repos', function(result) {
        var tmp = [];
        for(var i in result.data) {
            var r = __repo(result.data[i]);
            tmp.push(r);
        }
        callback(tmp);
    });
    return this;
};