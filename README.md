# jhub

[![Join the chat at https://gitter.im/TangChr/jhub](https://img.shields.io/badge/chat-on%20gitter-yellow.svg)](https://gitter.im/TangChr/jhub)

[![Release](https://img.shields.io/github/release/TangChr/jhub.svg)](https://github.com/TangChr/jhub/releases/latest)
[![npm](http://img.shields.io/npm/v/jhub.svg)](https://www.npmjs.com/package/jhub)
[![License](https://img.shields.io/github/license/TangChr/jhub.svg)](https://raw.githubusercontent.com/TangChr/jhub/master/LICENSE)
[![Dependencies](https://david-dm.org/TangChr/jhub.svg)](https://david-dm.org/TangChr/jhub)
[![Dependencies](https://david-dm.org/TangChr/jhub/dev-status.svg)](https://david-dm.org/TangChr/jhub?type=dev)
[![Build Status](https://travis-ci.org/TangChr/jhub.svg?branch=master)](https://travis-ci.org/TangChr/jhub)
[![npm](http://img.shields.io/npm/dt/jhub.svg)](https://www.npmjs.com/package/jhub)
[![Documentation](http://inch-ci.org/github/TangChr/jhub.svg)](http://inch-ci.org/github/TangChr/jhub)

JavaScript bindings for the GitHub API.

* Get information from the GitHub API (Read-only).
* Runs in [Node.js](https://nodejs.org) apps and the browser.
* No authentication required.
* "Minified" version available.

```
npm install jhub
```

```javascript
var jhub = require('jhub');

jhub.init('TangChr');

// List all repositories for user TangChr
jhub.userRepos(function(repos) {
    for(var r in repos) {
        var repo = repos[r];
        console.log(repo.name + ': ' + repo.htmlUrl);
    }
});

// List all releases for repository TangChr/jhub. jhub must be initialized before this.
// In this case, jhub.userRepo('TangChr', 'jhub') can also be used.
var repo = jhub.userRepo('jhub');
repo.releases(function(releases) {
    for(var r in releases) {
        var release = releases[r];
        console.log(release.tagName + ': ' + release.name);
    }
});
```
