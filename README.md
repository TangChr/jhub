ghub
==========
JavaScript bindings for the GitHub API
Examples
--------
```javascript
/* Get repositories */
var git = ghub.init('TangChr');
git.userRepos(function(result) {
  for(i in result) {
    console.log(result[i].name);
  }
});
```
```javascript
/* Get starred repositories */
var git = ghub.init('TangChr');
git.starredRepos(function(result) {
  for(i in result) {
    console.log(result[i].name);
  }
});
```
```javascript
/* Get releases */
var git = ghub.init('TangChr');
var gh = git.userRepo('ghub');
gh.releases(function(result) {
  for(i in result)
    console.log(result[i].tagName + ': ' + result[i].name);
});
```
```javascript
/* Get commits */
var git = ghub.init('TangChr');
var gh = git.userRepo('ghub');
gh.commits(function(result) {
  for(i in result)
    console.log(result[i].author);
    console.log(result[i].comitter);
    console.log(result[i].message);
});
```
