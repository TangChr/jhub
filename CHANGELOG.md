Change log
==========

## 2.3.6 (2016-10-14)

JavaScript Coding Conventions

## 2.3.5 (2016-10-13)

**Fixed**

* Fixed bad JavaScript code
* Updated the way Gulp tests jhub

## 2.3.4 (2016-10-08)

**Fixed**

* Fixed some typos

## 2.3.3 (2016-09-22)

In one word: _gulp_

## 2.3.2 (2016-09-17)

**Improved**

Various improvements

## 2.3.1 (2016-08-26)

**Features**

* Added location, bio, following and followers to User Information
* Updated test script (test.js)

## 2.3.0 (2016-08-25)

**Fixed**

* Fixed support for node.js

## 2.2.0 (2015-09-09)

**Features**

* Added gitUrl, sshUrl, cloneUrl to repos.
* Added createdAt, updatedAt and pushedAt to repositories.
* Added id, pullUrl and pushUrl to gist.get().

## 2.1.1 (2015-09-05)

**Features**

* Added owner to repository info

## 2.1.0 (2015-09-01)

**Features**

* Added "stargazers" to repository info
* Added tags to rpository info
* Ability to initialize jhub without passing username


## 2.0.0 (2015-08-24)

**Features**

* Organization-support
* Users support

```javascript
/* List a users organizations */
var github = jhub.init('TangChr');
github.userOrgs(function(orgsRes) {
    for(o in orgsRes) {
        var org = github.org(orgsRes[o].login);
        org.get(function(orgRes) {
            console.log(orgRes.login+': '+orgRes.name);
        });
    }
});
```

```javascript
/* List members of a specific organization */
var github = jhub.init();
var org = github.org('TangDev');
org.members(function(members) {
    for(m in members) {
        var user = github.user(members[m].login);
        user.get(function(userRes) {
            console.log(userRes.name);
        });
    }
});
```

**Other**

Added to npm
```
npm install jhub
```