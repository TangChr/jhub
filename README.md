# jhub

[![Release](https://img.shields.io/github/release/TangChr/jhub.svg?style=flat-square&label=Release)](https://github.com/TangChr/jhub/releases/latest)
[![npm package](http://img.shields.io/npm/v/jhub.svg?style=flat-square&label=npm%20package)](https://www.npmjs.com/package/jhub)
[![License](https://img.shields.io/github/license/TangChr/jhub.svg?style=flat-square&label=License)](https://raw.githubusercontent.com/TangChr/jhub/master/LICENSE)
[![Join the chat at https://gitter.im/TangChr/jhub](https://img.shields.io/badge/chat-on%20gitter-yellow.svg?style=flat-square&label=Chat)](https://gitter.im/TangChr/jhub)

[![Build Status](https://img.shields.io/travis/TangChr/jhub.svg?style=flat-square&label=Build%20Status)](https://travis-ci.org/TangChr/jhub)
[![Downloads](http://img.shields.io/npm/dt/jhub.svg?style=flat-square&label=Downloads)](https://www.npmjs.com/package/jhub)
[![Dependencies](https://img.shields.io/david/TangChr/jhub.svg?style=flat-square&label=Dependencies)](https://david-dm.org/TangChr/jhub)
[![devDependencies](https://img.shields.io/david/dev/TangChr/jhub.svg?style=flat-square)](https://david-dm.org/TangChr/jhub?type=dev)

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
jhub.repos(function(repos) {
    for(var r in repos) {
        var repo = repos[r];
        console.log(repo.name + ': ' + repo.htmlUrl);
    }
});

// List all releases for repository TangChr/jhub. jhub must be initialized before this.
// In this case, jhub.userRepo('TangChr', 'jhub') can also be used.
var repo = jhub.repo('jhub');
repo.releases(function(releases) {
    for(var r in releases) {
        var release = releases[r];
        console.log(release.tagName + ': ' + release.name);
    }
});
```
