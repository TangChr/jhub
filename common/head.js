// [jhub](https://github.com/TangChr/jhub) 2.3.2
// (c) 2016 Christian Tang
// Freely distributable under the MIT license.

(function () {
var githubUser = '';

var jhub = {};
jhub.VERSION = '2.3.2';

jhub.init = function (githubUser) {
    this.githubUser = githubUser;
    return this;
}