'use strict';

(function () {
var githubUser = '';
var jhub = {};

jhub.init = function (githubUser) {
    this.githubUser = githubUser;
    return this;
};