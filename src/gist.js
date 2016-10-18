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
jhub.gists = function (callback) {
    jsonp('https://api.github.com/users/'+this.githubUser+'/gists', function(result) {
        var gists = [];
        for(var i in result.data) {
            var gist = {
                id: result.data[i].id,
                description: result.data[i].description,
                url: result.data[i].html_url
            };
            gists.push(gist);
        }
        callback(gists);
    });
    return this;
};
jhub.gist = function (gistId) {
    if (!(this instanceof jhub.gist)) {
        return new jhub.gist(gistId);
    }
    this.gistId = gistId;
};
jhub.gist.prototype.files = function (callback) {
    jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
            var files = [];
            for(var i in result.data.files) {
                files.push(__gistFile(result.data.files[i]));
            }
            callback(files);
    });
    return this;
};
jhub.gist.prototype.get = function (callback) {
    jsonp('https://api.github.com/gists/'+this.gistId, function(result) {
        var files = [];
        for(var i in result.data.files) {
          files.push(__gistFile(result.data.files[i]));
        }
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