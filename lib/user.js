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
}