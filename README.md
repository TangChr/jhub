github-api
==========

JavaScript implementation of the GitHub API
Examples
--------
```javascript
/* Get repositories */
var git = github.init("ChrTang");
git.repos(function(result) {
  for(i in result) {
    console.log(result[i].name);
  }
});
```
```javascript
/* Get starred repositories */
var git = github.init("ChrTang");
git.starred(function(result) {
  for(i in result) {
    console.log(result[i].name);
  }
});
```
```javascript
/* Get releases */
var git = github.init("ChrTang");
var gh = git.repo("github-api");
gh.releases(function(result) {
  for(i in result)
    console.log(result[i].tagName + ": " + result[i].name);
});
```
```javascript
/* Get commits */
var git = github.init("ChrTang");
var gh = git.repo("github-api");
gh.commits(function(result) {
  for(i in result)
    console.log(result[i].author);
    console.log(result[i].comitter);
    console.log(result[i].message);
});
```
