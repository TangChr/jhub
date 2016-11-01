(function () {
var githubUser = '',
    jhub = {};

jhub.init = function (githubUser) {
    this.githubUser = githubUser;
    return this;
};